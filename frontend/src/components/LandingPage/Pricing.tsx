import React from 'react';
import { Check } from 'lucide-react';
import { AnimatedSection } from '../common/AnimatedSection';
import '../../styles/Pricing_landing_page.css';

const Pricing: React.FC = () => {
  return (
    <section id="pricing" className="pricing-section">
      {/* Background gradient */}
      <div className="pricing-bg-gradient" />

      <div className="pricing-container">
        <AnimatedSection>
          <div className="pricing-header-wrapper">
            <h2 className="pricing-title">
              Simple, Transparent Pricing
            </h2>
            <p className="pricing-subtitle">
              Choose a plan that scales with you. No hidden fees.
            </p>
          </div>
        </AnimatedSection>

        <div className="pricing-card-grid">
          {/* Starter Plan */}
          <AnimatedSection delay={0.1}>
            <div className="pricing-card starter">
              <div className="pricing-card-divider-gradient" />

              <div className="pricing-card-header">
                <h3 className="pricing-card-plan-name">Starter</h3>
                <span className="pricing-card-plan-desc">Get your feet wet</span>
              </div>

              <div className="pricing-price-wrapper">
                <span className="pricing-price-amount">$9</span>
                <span className="pricing-price-period"> / month</span>
              </div>

              <p className="pricing-card-features-desc">
                Everything you need to get started.
              </p>

              <div className="pricing-features-list">
                {['Basic functions', 'One phone number', 'Up to 100 AI responses', 'No trainability'].map((feature, idx) => (
                  <div key={idx} className="pricing-feature-item">
                    <Check className="pricing-feature-icon" />
                    <span className="pricing-feature-text">{feature}</span>
                  </div>
                ))}
              </div>

              <a
                href="/signup"
                className="btn-ghost pricing-btn"
              >
                Get Started
              </a>
            </div>
          </AnimatedSection>

          {/* Pro Plan */}
          <AnimatedSection delay={0.2}>
            <div className="pricing-card pro">
              <div className="pricing-card-badge">
                MOST POPULAR
              </div>

              <div className="pricing-card-pro-bar" />

              <div className="pricing-card-header">
                <h3 className="pricing-card-plan-name">Pro</h3>
                <span className="pricing-card-plan-desc">For the busiest phone lines</span>
              </div>

              <div className="pricing-price-wrapper">
                <span className="pricing-price-amount gradient">$19</span>
                <span className="pricing-price-period"> / month</span>
              </div>

              <p className="pricing-card-features-desc">
                Advanced features and higher limits.
              </p>

              <div className="pricing-features-list">
                {['Everything in Starter', 'Trainable AI to mimic you', 'Priority support', 'Up to 1000 AI responses'].map((feature, idx) => (
                  <div key={idx} className="pricing-feature-item">
                    <Check className="pricing-feature-icon" />
                    <span className="pricing-feature-text">{feature}</span>
                  </div>
                ))}
              </div>

              <a
                href="/signup"
                className="btn-primary pricing-btn"
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