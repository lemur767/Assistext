import React from "react";
import { Link } from "react-router-dom";
import { Phone, MessageSquare, CreditCard, AlertTriangle, Clock } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { GlassCard } from "./common/GlassCard";
import { AnimatedSection } from "./common/AnimatedSection";
import RecentActivity from "./RecentActivity";
import "../styles/Dashboard_dashboard.css";

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
    return (
      <div className="dashboard-loading-container">
        <div style={{ textAlign: 'center' }}>
          <div className="dashboard-spinner" />
          <p style={{ color: 'var(--muted-foreground)' }}>Loading...</p>
        </div>
      </div>
    );
  }

  const currentPlan: any = subscription?.find(
    (plan: any) => plan.nickname === user.subscription_plan
  );

  const messageLimit = getMessageLimit(user.subscription_plan);
  const usagePercentage = messageLimit > 0 ? (user.message_count / messageLimit) * 100 : 0;

  return (
    <div>
      {/* Trial Banner */}
      {trialDaysRemaining > 0 && (
        <AnimatedSection>
          <div className="dashboard-trial-banner">
            <Clock className="dashboard-banner-icon" style={{ color: 'var(--accent)' }} />
            <p className="dashboard-banner-text">
              You have <strong>{trialDaysRemaining} days</strong> left in your trial.
            </p>
          </div>
        </AnimatedSection>
      )}

      {trialDaysRemaining === 0 && user.subscription_plan === 'trial' && (
        <AnimatedSection>
          <div className="dashboard-expired-banner">
            <AlertTriangle className="dashboard-banner-icon" style={{ color: '#EF4444' }} />
            <p className="dashboard-banner-text">
              Your trial has expired. Please{" "}
              <Link
                to="/subscription"
                className="dashboard-link"
              >
                subscribe
              </Link>
              {" "}to continue using the service.
            </p>
          </div>
        </AnimatedSection>
      )}

      {/* No Phone Number Warning */}
      {!user.phone_number ? (
        <AnimatedSection>
          <GlassCard variant="solid">
            <div className="dashboard-no-phone-content">
              <div className="dashboard-no-phone-icon-wrapper">
                <Phone className="dashboard-stat-icon" style={{ color: 'var(--primary)' }} />
              </div>
              <h3 className="dashboard-no-phone-title">
                No Ghost Number Assigned
              </h3>
              <p className="dashboard-no-phone-text">
                It looks like you don't have a Ghost Number yet. Please visit the Settings page to set one up.
              </p>
              <Link
                to="/settings"
                className="btn-primary dashboard-no-phone-btn"
              >
                Go to Settings
              </Link>
            </div>
          </GlassCard>
        </AnimatedSection>
      ) : (
        <>
          {/* Stats Grid */}
          <div className="dashboard-stats-grid">
            <AnimatedSection delay={0.1}>
              <GlassCard variant="solid">
                <div className="dashboard-stat-header">
                  <div className="dashboard-stat-info">
                    <p className="dashboard-stat-label">
                      Ghost Number
                    </p>
                    <p className="dashboard-stat-value">
                      {user.phone_number}
                    </p>
                  </div>
                  <div className="dashboard-stat-icon-wrapper dashboard-icon-primary">
                    <Phone className="dashboard-stat-icon" style={{ color: 'var(--primary)' }} />
                  </div>
                </div>
              </GlassCard>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <GlassCard variant="solid">
                <div className="dashboard-stat-header">
                  <div className="dashboard-stat-info">
                    <p className="dashboard-stat-label">
                      Message Usage
                    </p>
                    <p className="dashboard-stat-value">
                      {user.message_count} <span className="dashboard-stat-subtext">/ {messageLimit}</span>
                    </p>
                    {/* Progress Bar */}
                    <div className="dashboard-progress-container">
                      <div
                        className={`dashboard-progress-fill ${usagePercentage > 90 ? 'warning' : 'normal'}`}
                        style={{
                          width: `${Math.min(usagePercentage, 100)}%`
                        }}
                      />
                    </div>
                  </div>
                  <div className="dashboard-stat-icon-wrapper dashboard-icon-secondary">
                    <MessageSquare className="dashboard-stat-icon" style={{ color: 'var(--secondary)' }} />
                  </div>
                </div>
              </GlassCard>
            </AnimatedSection>

            {currentPlan && (
              <AnimatedSection delay={0.3}>
                <GlassCard variant="solid">
                  <div className="dashboard-stat-header">
                    <div className="dashboard-stat-info">
                      <p className="dashboard-stat-label">
                        Subscription
                      </p>
                      <p className="dashboard-stat-value" style={{ fontSize: '1.125rem', fontWeight: 600 }}>
                        {currentPlan.product.name}
                      </p>
                      <p className="dashboard-stat-subtext-sm">
                        ${currentPlan.amount / 100} / {currentPlan.interval}
                      </p>
                    </div>
                    <div className="dashboard-stat-icon-wrapper dashboard-icon-accent">
                      <CreditCard className="dashboard-stat-icon" style={{ color: 'var(--accent)' }} />
                    </div>
                  </div>
                </GlassCard>
              </AnimatedSection>
            )}
          </div>

          {/* Recent Activity */}
          <AnimatedSection delay={0.4}>
            <RecentActivity />
          </AnimatedSection>
        </>
      )}
    </div>
  );
};

export default Dashboard;
