import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "../styles/Dashboard.css";
import RecentActivity from "./RecentActivity";

const Dashboard: React.FC = () => {
  const { user, subscription } = useAuth();

  const getTrialDaysRemaining = () => {
    if (!user?.trial_expires_at) return 0;
    const diff = new Date(user.trial_expires_at).getTime() - new Date().getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  };

  const trialDaysRemaining = getTrialDaysRemaining();

  const getMessageLimit = (plan: string | null) => {
    if (plan === "trial") return 10;
    if (plan === "basic") return 100;
    if (plan === "pro") return 1000;
    return 0;
  };

  if (!user) {
    return <div className="dashboard_loadingContainer">Loading...</div>;
  }

  const currentPlan: any = subscription?.find(
    (plan: any) => plan.nickname === user.subscription_plan
  );

  return (
    <div className="dashboard_mainContainer">
      <main className="dashboard_mainContent">
        {trialDaysRemaining > 0 && (
          <div className="dashboard_trialBannerPrimary">
            <p>You have {trialDaysRemaining} days left in your trial.</p>
          </div>
        )}
        {trialDaysRemaining === 0 && user.subscription_plan === 'trial' && (
          <div className="dashboard_trialBannerWarning">
            <p>
              Your trial has expired. Please <Link to="/subscription">subscribe</Link> to continue using the service.
            </p>
          </div>
        )}

        {!user.phone_number ? (
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
                <p className="dashboard_ghostNumberDisplay">{user.phone_number}</p>
              </div>
            </div>
            <div className="dashboard_ghostNumberCol2">
              <div className="dashboard_ghostNumberCard">
                <h3 className="dashboard_ghostNumberTitle">Message Usage</h3>
                <p className="dashboard_ghostNumberDisplay">
                  {user.message_count} / {getMessageLimit(user.subscription_plan)}
                </p>
              </div>
            </div>
            {currentPlan && (
              <div className="dashboard_ghostNumberCol1">
                <div className="dashboard_ghostNumberCard">
                  <h3 className="dashboard_ghostNumberTitle">Subscription</h3>
                  <p className="dashboard_ghostNumberDisplay">
                    {currentPlan.product.name} - ${currentPlan.amount / 100} / {currentPlan.interval}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
        <RecentActivity />
      </main>
    </div>
  );
};

export default Dashboard;
