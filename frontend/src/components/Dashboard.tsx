/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../App";

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
        if (!auth?.session) {
          throw new Error("User not authenticated.");
        }

        const response = await fetch("/api/v1/users/profile", {
          headers: {
            Authorization: `Bearer ${auth.session.token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data.");
        }

        const data = await response.json();
        setGhostNumber(data.user.phone_number);
        setTrialExpiresAt(data.user.trial_expires_at);

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
    <div className="min-h-screen bg-bg text-text">
      <header className="flex items-center justify-between p-4 bg-surface shadow-md">
        <h2 className="text-2xl font-bold gradient-text-brand">Dashboard</h2>
        <nav className="flex items-center space-x-4">
          <Link to="/settings" className="btn btn-ghost">Settings</Link>
          <button onClick={handleLogout} className="btn btn-outline">Logout</button>
        </nav>
      </header>

      <main className="p-8">
        {trialDaysRemaining > 0 && (
          <div className="p-4 mb-8 text-center rounded-lg bg-info-100 text-info-800 dark:bg-info-900/50 dark:text-info-200">
            <p>You have {trialDaysRemaining} days left in your trial.</p>
          </div>
        )}
        {trialDaysRemaining === 0 && (
          <div className="p-4 mb-8 text-center bg-warning-100 text-warning-800 rounded-lg dark:bg-warning-900/50 dark:text-warning-200">
            <p>
              Your trial has expired. Please <Link to="/subscription" className="font-bold underline">subscribe</Link> to continue using the service.
            </p>
          </div>
        )}

        {!ghostNumber ? (
          <Onboarding onNumberProvisioned={setGhostNumber} />
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="md:col-span-1">
              <div className="p-6 rounded-lg card">
                <h3 className="text-lg font-bold text-text">Your Ghost Number</h3>
                <p className="mt-2 text-2xl font-mono gradient-text-secondary">{ghostNumber}</p>
              </div>
            </div>
            <div className="md:col-span-2">
              <ConversationList />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
