import React, { useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import "../styles/PaymentForm.css";

const PaymentForm: React.FC<{ clientSecret: string }> = ({ clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      return;
    }

    setLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/dashboard`,
      },
    });

    if (error) {
      setErrorMessage(error.message || "An unexpected error occurred.");
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
