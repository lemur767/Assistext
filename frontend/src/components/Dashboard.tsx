/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

import ConversationList from "./ConversationList";
import "../styles/Dashboard.css";


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
            Authorization: `Bearer ${auth?.session?.token}`,
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
    return <div className="dashboard_loadingContainer">Loading...</div>;
  }

  return (
    <div className="dashboard_mainContainer">
      <header className="dashboard_header">
        <h2 className="dashboard_headerTitle">Dashboard</h2>
        <nav className="dashboard_navbarNav">
          <Link to="/settings" className="dashboard_settingsButton">Settings</Link>
          <button onClick={handleLogout} className="dashboard_logoutButton">Logout</button>
        </nav>
      </header>

      <main className="dashboard_mainContent">
        {trialDaysRemaining > 0 && (
          <div className="dashboard_trialBannerPrimary">
            <p>You have {trialDaysRemaining} days left in your trial.</p>
          </div>
        )}
        {trialDaysRemaining === 0 && (
          <div className="dashboard_trialBannerWarning">
            <p>
              Your trial has expired. Please <Link to="/subscription">subscribe</Link> to continue using the service.
            </p>
          </div>
        )}

        {!ghostNumber ? (
          <div className="dashboard_noGhostNumberCard">
            <h3 className="dashboard_noGhostNumberTitle">No Ghost Number Assigned</h3>
            <p className="dashboard_noGhostNumberText">
              It looks like you don't have a Ghost Number yet. Please visit the{" "}
              <Link to="/settings" className="dashboard_settingsLink">Settings</Link> page to set one up.
            </p>
          </div>
        ) : (
          <div className="dashboard_ghostNumberGrid">
            <div className="dashboard_ghostNumberCol1">
              <div className="dashboard_ghostNumberCard">
                <h3 className="dashboard_ghostNumberTitle">Your Ghost Number</h3>
                <p className="dashboard_ghostNumberDisplay">{ghostNumber}</p>
              </div>
            </div>
            <div className="dashboard_conversationListCol">
              <ConversationList />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;