import React, { useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import "../styles/PaymentForm.css";
import { api } from "../services/api";

interface Plan {
    id: string;
    name: string;
    description: string;
    price: number;
    currency: string;
    price_id: string;
}

const PaymentForm: React.FC<{ clientSecret: string, selectedPlan: Plan | null }> = ({ clientSecret, selectedPlan }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements || !selectedPlan) {
      return;
    }

    setLoading(true);

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setErrorMessage(submitError.message || "An unexpected error occurred.");
      setLoading(false);
      return;
    }

    // Create the PaymentMethod
    const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
        elements,
    });

    if (paymentMethodError) {
        setErrorMessage(paymentMethodError.message || "An unexpected error occurred.");
        setLoading(false);
        return;
    }

    // Create the subscription
    try {
        const subscription = await api.post("/subscriptions", {
            price_id: selectedPlan.price_id,
            payment_method_id: paymentMethod.id,
        });

        // Handle success
        window.location.href = "/dashboard";

    } catch (err: unknown) {
        setErrorMessage((err as Error).message);
    }


    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="paymentForm_form">
      <div className="paymentForm_paymentElementContainer bg-surface border-border">
        <PaymentElement />
      </div>
      <button 
        disabled={!stripe || loading} 
        className="paymentForm_button btn btn-primary"      >
        {loading ? "Processing..." : "Pay"}
      </button>
      {errorMessage && <div className="paymentForm_errorMessage text-error-500">{errorMessage}</div>}
    </form>
  );
};

export default PaymentForm;