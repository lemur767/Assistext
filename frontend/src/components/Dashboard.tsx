import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../App";
import Onboarding from "./Onboarding";
import ConversationList from "./ConversationList";

const Dashboard: React.FC = () => {
  const [ghostNumber, setGhostNumber] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [trialExpiresAt, setTrialExpiresAt] = useState<string | null>(null);
  const auth = useAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        // We would fetch user data from our own backend now
        // For now, we'll just use the session data
        if (auth?.session) {
          setGhostNumber(auth.session.ghost_number);
          setTrialExpiresAt(auth.session.trial_expires_at);
        }
      } catch (err: unknown) {
        console.error("Error fetching user data:", (err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [auth?.session]);

  const handleLogout = async () => {
    try {
      await fetch("/api/v1/logout", { method: "POST" });
      auth?.setSession(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const getTrialDaysRemaining = () => {
    if (!trialExpiresAt) return 0;
    const diff = new Date(trialExpiresAt).getTime() - new Date().getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  };

  const trialDaysRemaining = getTrialDaysRemaining();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Dashboard</h2>
      <nav>
        <Link to="/settings">Settings</Link>
      </nav>

      {trialDaysRemaining > 0 && (
        <p>You have {trialDaysRemaining} days left in your trial.</p>
      )}
      {trialDaysRemaining === 0 && (
        <p>
          Your trial has expired. Please subscribe to continue using the
          service.
        </p>
      )}

      {!ghostNumber ? (
        <Onboarding onNumberProvisioned={setGhostNumber} />
      ) : (
        <div>
          <p>Your ghost number is: {ghostNumber}</p>
          <ConversationList />
        </div>
      )}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
