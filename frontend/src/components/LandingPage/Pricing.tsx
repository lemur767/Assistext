import React from 'react';
import { Check } from 'lucide-react';
import { AnimatedSection } from '../common/AnimatedSection';

const Pricing: React.FC = () => {
  return (
    <section id="pricing" style={{ maxWidth: '80rem', margin: '0 auto', padding: '4rem 1rem', paddingTop: '7rem', paddingBottom: '7rem', position: 'relative' }}>
      {/* Background gradient */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: -10,
        background: 'radial-gradient(circle at 50% 0%, rgba(71, 228, 187, 0.08), transparent 60%)'
      }} />

      <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
        <AnimatedSection>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: 'clamp(2.25rem, 5vw, 3rem)', marginBottom: '1.5rem', fontWeight: 600 }}>
              Simple, Transparent Pricing
            </h2>
            <p style={{ fontSize: 'clamp(1.125rem, 2vw, 1.25rem)', color: 'var(--muted-foreground)', maxWidth: '42rem', margin: '0 auto' }}>
              Choose a plan that scales with you. No hidden fees.
            </p>
          </div>
        </AnimatedSection>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', maxWidth: '64rem', margin: '0 auto' }}>
          {/* Starter Plan */}
          <AnimatedSection delay={0.1}>
            <div style={{
              backgroundColor: 'var(--card)',
              border: '1px solid var(--border)',
              borderRadius: '1rem',
              padding: '2rem',
              position: 'relative',
              overflow: 'hidden',
              transition: 'all 0.3s ease'
            }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)';
                e.currentTarget.style.borderColor = 'var(--primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = 'var(--border)';
              }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(to right, transparent, rgba(232, 100, 124, 0.4), transparent)' }} />

              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', fontWeight: 600 }}>Starter</h3>
                <span style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)' }}>Get your feet wet</span>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <span style={{ fontSize: '3rem', fontWeight: 700, color: 'var(--foreground)' }}>$9</span>
                <span style={{ fontSize: '1.125rem', color: 'var(--muted-foreground)' }}> / month</span>
              </div>

              <p style={{ color: 'var(--muted-foreground)', marginBottom: '2rem', fontSize: '0.938rem' }}>
                Everything you need to get started.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
                {['Basic functions', 'One phone number', 'Up to 100 AI responses', 'No trainability'].map((feature, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Check style={{ width: '1.25rem', height: '1.25rem', color: 'var(--primary)', flexShrink: 0 }} />
                    <span style={{ fontSize: '0.938rem', color: 'var(--foreground)' }}>{feature}</span>
                  </div>
                ))}
              </div>

              <a
                href="/signup"
                className="btn-ghost"
                style={{
                  width: '100%',
                  display: 'block',
                  textAlign: 'center',
                  padding: '0.875rem 1.5rem',
                  borderRadius: '0.75rem',
                  fontSize: '0.938rem',
                  fontWeight: 500,
                  textDecoration: 'none'
                }}
              >
                Get Started
              </a>
            </div>
          </AnimatedSection>

          {/* Pro Plan */}
          <AnimatedSection delay={0.2}>
            <div style={{
              backgroundColor: 'var(--card)',
              border: '2px solid var(--primary)',
              borderRadius: '1rem',
              padding: '2rem',
              position: 'relative',
              overflow: 'hidden',
              transition: 'all 0.3s ease',
              boxShadow: '0 10px 15px -3px rgba(232, 100, 124, 0.1), 0 4px 6px -4px rgba(232, 100, 124, 0.1)'
            }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(232, 100, 124, 0.2), 0 8px 10px -6px rgba(232, 100, 124, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(232, 100, 124, 0.1), 0 4px 6px -4px rgba(232, 100, 124, 0.1)';
              }}
            >
              <div style={{
                position: 'absolute',
                top: '-1px',
                right: '2rem',
                background: 'linear-gradient(135deg, var(--primary), var(--accent))',
                color: 'white',
                padding: '0.375rem 1rem',
                borderRadius: '0 0 0.5rem 0.5rem',
                fontSize: '0.75rem',
                fontWeight: 600,
                letterSpacing: '0.025em'
              }}>
                MOST POPULAR
              </div>

              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(to right, var(--primary), var(--accent), var(--secondary))' }} />

              <div style={{ marginBottom: '1.5rem', marginTop: '1rem' }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', fontWeight: 600 }}>Pro</h3>
                <span style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)' }}>For the busiest phone lines</span>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <span style={{ fontSize: '3rem', fontWeight: 700, background: 'linear-gradient(135deg, var(--primary), var(--accent))', backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent' }}>$19</span>
                <span style={{ fontSize: '1.125rem', color: 'var(--muted-foreground)' }}> / month</span>
              </div>

              <p style={{ color: 'var(--muted-foreground)', marginBottom: '2rem', fontSize: '0.938rem' }}>
                Advanced features and higher limits.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
                {['Everything in Starter', 'Trainable AI to mimic you', 'Priority support', 'Up to 1000 AI responses'].map((feature, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Check style={{ width: '1.25rem', height: '1.25rem', color: 'var(--primary)', flexShrink: 0 }} />
                    <span style={{ fontSize: '0.938rem', color: 'var(--foreground)' }}>{feature}</span>
                  </div>
                ))}
              </div>

              <a
                href="/signup"
                className="btn-primary"
                style={{
                  width: '100%',
                  display: 'block',
                  textAlign: 'center',
                  padding: '0.875rem 1.5rem',
                  borderRadius: '0.75rem',
                  fontSize: '0.938rem',
                  fontWeight: 500,
                  textDecoration: 'none'
                }}
              >
                Choose Pro
              </a>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default Pricing;