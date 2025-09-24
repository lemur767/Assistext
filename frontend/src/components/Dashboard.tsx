/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../App";

import ConversationList from "./ConversationList";
import styles from "./Dashboard.module.css";

const Onboarding: React.FC<{ onNumberProvisioned: (number: string) => void }> = ({ onNumberProvisioned }) => {
  return (
    <div className={styles.onboardingContainer}>
      <h2 className={styles.onboardingTitle}>Welcome to Assistext!</h2>
      <p className={styles.onboardingText}>Let's get you set up with a ghost number.</p>
      <button className={styles.onboardingButton} onClick={() => onNumberProvisioned('+15551234567')}>Provision Number</button>
    </div>
  );
};


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
    return <div className={styles.loadingContainer}>Loading...</div>;
  }

  return (
    <div className={styles.mainContainer}>
      <header className={styles.header}>
        <h2 className={styles.headerTitle}>Dashboard</h2>
        <nav className={styles.navbarNav}>
          <Link to="/settings" className={styles.settingsButton}>Settings</Link>
          <button onClick={handleLogout} className={styles.logoutButton}>Logout</button>
        </nav>
      </header>

      <main className={styles.mainContent}>
        {trialDaysRemaining > 0 && (
          <div className={styles.trialBannerPrimary}>
            <p>You have {trialDaysRemaining} days left in your trial.</p>
          </div>
        )}
        {trialDaysRemaining === 0 && (
          <div className={styles.trialBannerWarning}>
            <p>
              Your trial has expired. Please <Link to="/subscription">subscribe</Link> to continue using the service.
            </p>
          </div>
        )}

        {!ghostNumber ? (
          <Onboarding onNumberProvisioned={setGhostNumber} />
        ) : (
          <div className={styles.ghostNumberGrid}>
            <div className={styles.ghostNumberCol1}>
              <div className={styles.ghostNumberCard}>
                <h3 className={styles.ghostNumberTitle}>Your Ghost Number</h3>
                <p className={styles.ghostNumberDisplay}>{ghostNumber}</p>
              </div>
            </div>
            <div className={styles.conversationListCol}>
              <ConversationList />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;