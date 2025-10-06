import React, { useState, useEffect } from "react";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./PaymentForm";
import { useAuth } from "../contexts/AuthContext";
import api from "../services/api";


const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || "pk_test_51OeclgDdJI4l0ylPtIxmYakVI9gTP4tg38d2T8FHHspjyHAZH1AIomMM7mw1fmAhvI7JcUOlPgjtZZ3Bl7pYOdId00vnY35MMV",
);

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

            const response = await api.get("/api/v1/subscriptions/plans");
            const data = await response.json();
            if (!response.ok) throw new Error(data.error);
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

            const response = await api.get("/api/v1/subscriptions");
            const data = await response.json();
            if (response.ok) {
                setCurrentSubscription(data);
            }
        } catch (err: unknown) {
            // Don't set error for this, as it's not critical
            console.error((err as Error).message);
        }
    };

    if (isAuthenticated) {
        fetchPlans();
        fetchSubscription();
    }
  }, [isAuthenticated, session]);

  const handleSelectPlan = async (plan: Plan) => {
    setLoading(true);
    setError(null);
    setSelectedPlan(plan);
    try {
      if (!isAuthenticated || !session) {
        throw new Error("User not authenticated.");
      }

      const response = await api.post("/api/v1/subscriptions/create-payment-intent", { price_id: plan.price_id });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
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
    return <div className="subscription_loadingContainer">Loading...</div>;
  }

  if (error) {
    return <div className="subscription_errorContainer">Error: {error}</div>;
  }

  return (
    <div className="subscription_mainContainer">
      {currentSubscription && (
        <div className="subscription_currentPlan glass-morphism mb-8">
          <h3 className="subscription_currentPlanTitle text-neutral-text">Your Current Plan</h3>
          <p className="text-neutral-text/60">
            You are currently on the{" "}
            <strong>{currentSubscription.plan.product.name}</strong> plan.
          </p>
        </div>
      )}
      <div className="subscription_subscriptionSection">
        <h2 className="subscription_headerTitle gradient-text-brand">Subscription Plans</h2>
        {!selectedPlan ? (
          <div className="subscription_plansGrid">
            {plans.map((plan, index) => (
              <div 
                key={plan.id} 
                className={`subscription_planCard ${ 
                  index === 1 // Highlight the middle plan
                    ? 'subscription_planCardHighlighted' 
                    : 'glass-morphism'
                }`}>
                {index === 1 && (
                  <div className="subscription_popularTag">
                    <div className="subscription_popularTagContent">
                      Most Popular
                    </div>
                  </div>
                )}
                <div className="subscription_planHeader">
                  <h3 className="subscription_planName">{plan.name}</h3>
                  <p className={`subscription_planDescription ${index === 1 ? 'subscription_planDescriptionHighlighted' : 'subscription_planDescriptionDefault'}`}>
                    {plan.description}
                  </p>
                  <div className="subscription_priceContainer">
                    <span className="subscription_priceValue">${plan.price}</span>
                    <span className={`subscription_priceCurrency ${index === 1 ? 'subscription_priceCurrencyHighlighted' : 'subscription_priceCurrencyDefault'}`}>
                      /{plan.currency}
                    </span>
                  </div>
                </div>
                <button 
                  onClick={() => handleSelectPlan(plan)} 
                  className={`subscription_selectPlanButton ${ 
                    index === 1
                      ? 'btn btn-primary'
                      : 'btn btn-outline'
                  }`}>
                  Select {plan.name}
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="subscription_paymentFormContainer glass-morphism">
            <h3 className="subscription_paymentFormTitle text-neutral-text">Complete Payment for {selectedPlan.name} plan</h3>
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