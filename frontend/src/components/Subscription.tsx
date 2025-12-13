import React, { useState, useEffect } from "react";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./PaymentForm";
import { useAuth } from "../contexts/AuthContext";
import { api } from "../services/api";


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
    return <div className="text-center p-16 text-xl">Loading...</div>;
  }

  if (error) {
    return <div className="text-center p-16 text-xl">Error: {error}</div>;
  }

  return (
    <div className="w-full max-w-[900px] mx-auto mt-[120px] p-8 text-foreground">
      {currentSubscription && (
        <div className="p-6 rounded-lg bg-card border border-border mb-8 glass-morphism">
          <h3 className="text-xl font-semibold text-foreground mb-2">Your Current Plan</h3>
          <p className="text-muted-foreground">
            You are currently on the{" "}
            <strong>{currentSubscription.plan.product.name}</strong> plan.
          </p>
        </div>
      )}
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-8 gradient-text-brand">Subscription Plans</h2>
        {!selectedPlan ? (
          <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-8">
            {plans.map((plan, index) => (
              <div
                key={plan.id}
                className={`p-8 rounded-lg bg-card border border-border flex flex-col items-center text-center relative transition-all duration-150 ease-in-out hover:-translate-y-1 hover:shadow-lg ${index === 1 // Highlight the middle plan
                  ? 'bg-primary-foreground border-primary scale-105'
                  : 'glass-morphism'
                  }`}>
                {index === 1 && (
                  <div className="absolute -top-[15px] bg-primary text-primary-foreground px-4 py-1 rounded-full font-bold text-sm">
                    <div className="">
                      Most Popular
                    </div>
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-2xl font-semibold mb-2">{plan.name}</h3>
                  <p className={`text-sm min-h-[40px] ${index === 1 ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {plan.description}
                  </p>
                  <div className="mt-4 flex items-baseline justify-center">
                    <span className="text-4xl font-bold">${plan.price}</span>
                    <span className={`text-base ml-1 ${index === 1 ? 'text-foreground' : 'text-muted-foreground'}`}>
                      /{plan.currency}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handleSelectPlan(plan)}
                  className={`mt-auto w-full px-6 py-3 rounded-lg font-semibold transition-colors duration-150 ease-in-out text-center inline-block ${index === 1
                    ? 'bg-primary text-primary-foreground border border-primary hover:bg-accent'
                    : 'bg-transparent text-primary border border-primary hover:bg-primary/10'
                    }`}>
                  Select {plan.name}
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-8 p-8 rounded-lg bg-card border border-border glass-morphism">
            <h3 className="text-xl font-semibold mb-6 text-center text-foreground">Complete Payment for {selectedPlan.name} plan</h3>
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