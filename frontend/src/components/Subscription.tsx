import React, { useState, useEffect } from "react";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./PaymentForm";
import { useAuth } from "../contexts/AuthContext";
import { api } from "../services/api";
import "../styles/Subscription_dashboard.css";


const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
if (!stripePublishableKey) {
  throw new Error("VITE_STRIPE_PUBLISHABLE_KEY is not set. Please check your .env file.");
}
const stripePromise = loadStripe(stripePublishableKey);

interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  price_id: string;
}

const Subscription: React.FC = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentSubscription, setCurrentSubscription] = useState<any | null>(null);
  const { session, isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchPlans = async () => {
      setLoading(true);
      setError(null);
      try {
        if (!isAuthenticated || !session) {
          throw new Error("User not authenticated.");
        }

        const data = await api.get("/subscriptions/plans", { token: session?.token });
        setPlans(data);
      } catch (err: unknown) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    const fetchSubscription = async () => {
      try {
        if (!isAuthenticated || !session) {
          throw new Error("User not authenticated.");
        }

        const data = await api.get("/subscriptions", { token: session?.token });
        setCurrentSubscription(data);
      } catch (err: unknown) {
        // Don't set error for this, as it's not critical
        console.error((err as Error).message);
      }
    };

    if (isAuthenticated && session?.token) {
      fetchPlans();
      fetchSubscription();
    }
  }, [isAuthenticated, session?.token]);

  const handleSelectPlan = async (plan: Plan) => {
    setLoading(true);
    setError(null);
    setSelectedPlan(plan);
    try {
      if (!isAuthenticated || !session?.token) {
        throw new Error("User not authenticated.");
      }

      const data = await api.post("/subscriptions/create-payment-intent", { price_id: plan.price_id }, { token: session?.token });
      setClientSecret(data.client_secret);
    } catch (err: unknown) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: "night",
      variables: {
        colorPrimary: '#61e2ff',
        colorBackground: '#0f172a',
        colorText: '#f1f5f9',
        colorDanger: '#EF4444',
        fontFamily: 'Space Grotesk, sans-serif',
        spacingUnit: '4px',
        borderRadius: '8px',
      }
    },
  };

  if (loading) {
    return <div className="loading-container">Loading...</div>;
  }

  if (error) {
    return <div className="error-container">Error: {error}</div>;
  }

  return (
    <div className="subscription-container">
      {currentSubscription && (
        <div className="subscription-current-plan">
          <h3 className="current-plan-title">Your Current Plan</h3>
          <p className="current-plan-text">
            You are currently on the{" "}
            <strong>{currentSubscription.plan.product.name}</strong> plan.
          </p>
        </div>
      )}
      <div className="subscription-header">
        <h2 className="subscription-title gradient-text-brand">Subscription Plans</h2>
        {!selectedPlan ? (
          <div className="plans-grid">
            {plans.map((plan, index) => (
              <div
                key={plan.id}
                className={`plan-card ${index === 1 ? 'highlighted' : 'glass'}`}
              >
                {index === 1 && (
                  <div className="popular-badge">
                    <div>Most Popular</div>
                  </div>
                )}
                <div className="plan-details">
                  <h3 className="plan-name">{plan.name}</h3>
                  <p className={`plan-description ${index === 1 ? 'highlighted' : 'muted'}`}>
                    {plan.description}
                  </p>
                  <div className="plan-price-container">
                    <span className="plan-price">${plan.price}</span>
                    <span className={`plan-currency ${index === 1 ? 'highlighted' : 'muted'}`}>
                      /{plan.currency}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handleSelectPlan(plan)}
                  className={`plan-select-btn ${index === 1 ? 'highlighted' : 'outline'}`}
                >
                  Select {plan.name}
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="payment-form-container">
            <h3 className="payment-header-title">Complete Payment for {selectedPlan.name} plan</h3>
            {clientSecret && (
              <Elements options={options} stripe={stripePromise}>
                <PaymentForm clientSecret={clientSecret} selectedPlan={selectedPlan} />
              </Elements>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Subscription;