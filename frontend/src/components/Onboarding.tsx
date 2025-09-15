import React, { useState } from "react";
import { useAuth } from "../App";

const Onboarding: React.FC<{
  onNumberProvisioned: (number: string) => void;
}> = ({ onNumberProvisioned }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const auth = useAuth();

  const handleProvisionNumber = async () => {
    setLoading(true);
    setError("");
    try {
      if (!auth?.session) {
        throw new Error("User not authenticated.");
      }

      const response = await fetch("/api/v1/ghost-numbers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.session.token}`,
        },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      onNumberProvisioned(data.phone_number);
    } catch (err: unknown) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3>Welcome to Assistext!</h3>
      <p>Get your private ghost number to get started.</p>
      <button onClick={handleProvisionNumber} disabled={loading}>
        {loading ? "Provisioning your number..." : "Get my Ghost Number"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Onboarding;
