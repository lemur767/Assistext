import React from "react";
import { Link } from "react-router-dom";
import { Phone, MessageSquare, CreditCard, AlertTriangle, Clock } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { GlassCard } from "./common/GlassCard";
import { StatCard } from "./common/StatCard";
import { AnimatedSection } from "./common/AnimatedSection";
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
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '50vh' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '3rem',
            height: '3rem',
            margin: '0 auto 1rem',
            border: '3px solid var(--primary)',
            borderTopColor: 'transparent',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }} />
          <p style={{ color: 'var(--muted-foreground)' }}>Loading...</p>
        </div>
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
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
          <div style={{
            padding: '1rem 1.5rem',
            borderRadius: '0.75rem',
            backgroundColor: 'rgba(236, 155, 59, 0.1)',
            border: '1px solid rgba(236, 155, 59, 0.3)',
            marginBottom: '2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <Clock style={{ width: '1.5rem', height: '1.5rem', color: 'var(--accent)', flexShrink: 0 }} />
            <p style={{ fontSize: '0.938rem', color: 'var(--foreground)', margin: 0 }}>
              You have <strong>{trialDaysRemaining} days</strong> left in your trial.
            </p>
          </div>
        </AnimatedSection>
      )}

      {trialDaysRemaining === 0 && user.subscription_plan === 'trial' && (
        <AnimatedSection>
          <div style={{
            padding: '1rem 1.5rem',
            borderRadius: '0.75rem',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            marginBottom: '2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <AlertTriangle style={{ width: '1.5rem', height: '1.5rem', color: '#EF4444', flexShrink: 0 }} />
            <p style={{ fontSize: '0.938rem', color: 'var(--foreground)', margin: 0 }}>
              Your trial has expired. Please{" "}
              <Link
                to="/subscription"
                style={{ color: 'var(--primary)', fontWeight: 500, textDecoration: 'underline' }}
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
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <div style={{
                width: '4rem',
                height: '4rem',
                margin: '0 auto 1.5rem',
                borderRadius: '1rem',
                backgroundColor: 'rgba(232, 100, 124, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Phone style={{ width: '2rem', height: '2rem', color: 'var(--primary)' }} />
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>
                No Ghost Number Assigned
              </h3>
              <p style={{ color: 'var(--muted-foreground)', marginBottom: '1.5rem', fontSize: '0.938rem' }}>
                It looks like you don't have a Ghost Number yet. Please visit the Settings page to set one up.
              </p>
              <Link
                to="/settings"
                className="btn-primary"
                style={{
                  display: 'inline-block',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.75rem',
                  textDecoration: 'none',
                  fontSize: '0.938rem',
                  fontWeight: 500
                }}
              >
                Go to Settings
              </Link>
            </div>
          </GlassCard>
        </AnimatedSection>
      ) : (
        <>
          {/* Stats Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
            <AnimatedSection delay={0.1}>
              <GlassCard variant="solid">
                <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <div>
                    <p style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)', marginBottom: '0.5rem' }}>
                      Ghost Number
                    </p>
                    <p style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--foreground)' }}>
                      {user.phone_number}
                    </p>
                  </div>
                  <div style={{
                    width: '3rem',
                    height: '3rem',
                    borderRadius: '0.75rem',
                    backgroundColor: 'rgba(232, 100, 124, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Phone style={{ width: '1.5rem', height: '1.5rem', color: 'var(--primary)' }} />
                  </div>
                </div>
              </GlassCard>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <GlassCard variant="solid">
                <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)', marginBottom: '0.5rem' }}>
                      Message Usage
                    </p>
                    <p style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--foreground)' }}>
                      {user.message_count} <span style={{ fontSize: '1rem', color: 'var(--muted-foreground)' }}>/ {messageLimit}</span>
                    </p>
                    {/* Progress Bar */}
                    <div style={{
                      width: '100%',
                      height: '0.5rem',
                      backgroundColor: 'var(--muted)',
                      borderRadius: '9999px',
                      overflow: 'hidden',
                      marginTop: '0.75rem'
                    }}>
                      <div style={{
                        width: `${Math.min(usagePercentage, 100)}%`,
                        height: '100%',
                        background: usagePercentage > 90 ? 'linear-gradient(90deg, #EF4444, #DC2626)' : 'linear-gradient(90deg, var(--secondary), var(--primary))',
                        transition: 'width 0.5s ease'
                      }} />
                    </div>
                  </div>
                  <div style={{
                    width: '3rem',
                    height: '3rem',
                    borderRadius: '0.75rem',
                    backgroundColor: 'rgba(71, 228, 187, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginLeft: '1rem'
                  }}>
                    <MessageSquare style={{ width: '1.5rem', height: '1.5rem', color: 'var(--secondary)' }} />
                  </div>
                </div>
              </GlassCard>
            </AnimatedSection>

            {currentPlan && (
              <AnimatedSection delay={0.3}>
                <GlassCard variant="solid">
                  <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <div>
                      <p style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)', marginBottom: '0.5rem' }}>
                        Subscription
                      </p>
                      <p style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--foreground)' }}>
                        {currentPlan.product.name}
                      </p>
                      <p style={{ fontSize: '0.938rem', color: 'var(--muted-foreground)', marginTop: '0.25rem' }}>
                        ${currentPlan.amount / 100} / {currentPlan.interval}
                      </p>
                    </div>
                    <div style={{
                      width: '3rem',
                      height: '3rem',
                      borderRadius: '0.75rem',
                      backgroundColor: 'rgba(236, 155, 59, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <CreditCard style={{ width: '1.5rem', height: '1.5rem', color: 'var(--accent)' }} />
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
