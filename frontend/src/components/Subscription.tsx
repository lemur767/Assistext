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
    <div>
      <h2>Subscription Plans</h2>
      {!selectedPlan ? (
        <div>
          {plans.map(plan => (
            <div key={plan.id}>
              <h3>{plan.name}</h3>
              <p>{plan.description}</p>
              <p>${plan.price}/{plan.currency}</p>
              <button onClick={() => handleSelectPlan(plan)}>
                Select {plan.name}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <h3>Complete Payment for {selectedPlan.name} plan</h3>
          {clientSecret && (
            <Elements options={options} stripe={stripePromise}>
              <PaymentForm clientSecret={clientSecret} />
            </Elements>
          )}
        </div>
      )}
    </div>
  );
};

export default Subscription;