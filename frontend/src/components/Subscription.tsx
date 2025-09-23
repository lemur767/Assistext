import React, { useState, useEffect } from "react";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./PaymentForm";
import { useAuth } from "../App";

// Fixed: Use import.meta.env instead of process.env for Vite
const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || "",
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
  const auth = useAuth();

  useEffect(() => {
    const fetchPlans = async () => {
        setLoading(true);
        setError(null);
        try {
            if (!auth?.session) {
                throw new Error("User not authenticated.");
            }

            const response = await fetch("/api/v1/subscriptions/plans", {
                headers: {
                    Authorization: `Bearer ${auth.session.token}`,
                },
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error);
            setPlans(data);
        } catch (err: unknown) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };
    fetchPlans();
  }, [auth?.session]);

  const handleSelectPlan = async (plan: Plan) => {
    setLoading(true);
    setError(null);
    setSelectedPlan(plan);
    try {
      if (!auth?.session) {
        throw new Error("User not authenticated.");
      }

      const response = await fetch("/api/v1/subscriptions/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.session.token}`,
        },
        body: JSON.stringify({ price_id: plan.price_id }),
      });
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
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center min-h-screen">Error: {error}</div>;
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="mb-8 text-4xl font-bold text-center gradient-text-brand">Subscription Plans</h2>
        {!selectedPlan ? (
          <div className="grid gap-8 md:grid-cols-3">
            {plans.map((plan, index) => (
              <div 
                key={plan.id} 
                className={`p-8 rounded-3xl shadow-xl border transition-all duration-300 hover:scale-105 ${
                  index === 1 // Highlight the middle plan
                    ? 'bg-gradient-to-b from-primary/20 to-secondary/20 border-primary/50 scale-105' 
                    : 'glass-morphism'
                }`}>
                {index === 1 && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="px-4 py-2 text-sm font-semibold text-neutral-bg rounded-full bg-gradient-to-r from-accent to-secondary">
                      Most Popular
                    </div>
                  </div>
                )}
                <div className="text-center">
                  <h3 className="mb-2 text-2xl font-bold">{plan.name}</h3>
                  <p className={`mb-4 text-sm ${index === 1 ? 'text-primary/80' : 'text-neutral-text/60'}`}>
                    {plan.description}
                  </p>
                  <div className="flex items-end justify-center">
                    <span className="text-5xl font-bold">${plan.price}</span>
                    <span className={`ml-1 text-lg ${index === 1 ? 'text-primary/80' : 'text-neutral-text/60'}`}>
                      /{plan.currency}
                    </span>
                  </div>
                </div>
                <button 
                  onClick={() => handleSelectPlan(plan)} 
                  className={`w-full py-3 mt-8 font-semibold rounded-2xl transition-all duration-200 ${
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
          <div className="p-8 mx-auto mt-8 max-w-lg rounded-lg glass-morphism">
            <h3 className="mb-6 text-2xl font-bold text-center text-neutral-text">Complete Payment for {selectedPlan.name} plan</h3>
            {clientSecret && (
              <Elements options={options} stripe={stripePromise}>
                <PaymentForm clientSecret={clientSecret} />
              </Elements>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Subscription;