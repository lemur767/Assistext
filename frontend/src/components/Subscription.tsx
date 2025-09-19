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
      theme: "stripe",
    },
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="min-h-screen p-8 bg-bg text-text">
      <div className="max-w-4xl mx-auto">
        <h2 className="mb-8 text-4xl font-bold text-center gradient-text-brand">Subscription Plans</h2>
        {!selectedPlan ? (
          <div className="grid gap-8 md:grid-cols-3">
            {plans.map((plan, index) => (
              <div 
                key={plan.id} 
                className={`p-8 rounded-3xl shadow-xl border transition-all duration-300 hover:scale-105 ${
                  index === 1 // Highlight the middle plan
                    ? 'bg-gradient-to-b from-primary-500 to-primary-600 text-white border-primary-500 scale-105'
                    : 'bg-surface border-border'
                }`}>
                {index === 1 && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="px-4 py-2 text-sm font-semibold text-white rounded-full bg-gradient-to-r from-accent-500 to-secondary-500">
                      Most Popular
                    </div>
                  </div>
                )}
                <div className="text-center">
                  <h3 className="mb-2 text-2xl font-bold">{plan.name}</h3>
                  <p className={`mb-4 text-sm ${index === 1 ? 'text-primary-200' : 'text-muted'}`}>
                    {plan.description}
                  </p>
                  <div className="flex items-end justify-center">
                    <span className="text-5xl font-bold">${plan.price}</span>
                    <span className={`ml-1 text-lg ${index === 1 ? 'text-primary-200' : 'text-muted'}`}>
                      /{plan.currency}
                    </span>
                  </div>
                </div>
                <button 
                  onClick={() => handleSelectPlan(plan)} 
                  className={`w-full py-3 mt-8 font-semibold rounded-2xl transition-all duration-200 ${
                    index === 1
                      ? 'bg-white text-primary hover:bg-primary-50'
                      : 'bg-primary text-white hover:bg-primary-dark'
                  }`}>
                  Select {plan.name}
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 mx-auto mt-8 max-w-lg rounded-lg card">
            <h3 className="mb-6 text-2xl font-bold text-center text-text">Complete Payment for {selectedPlan.name} plan</h3>
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