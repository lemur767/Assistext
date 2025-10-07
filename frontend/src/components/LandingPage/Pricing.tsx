import React from 'react';
import './Pricing.css';

const Pricing: React.FC = () => {
  return (
    <section className="pricing" id="pricing">
      <div className="pricing__background"></div>
      <div className="pricing__container">
        <div className="pricing__header">
          <h2 className="pricing__title">
            Simple, transparent pricing
          </h2>
          <p className="pricing__subtitle">
            Choose a plan that scales with you. No hidden fees.
          </p>
        </div>

        <div className="pricing__grid">
          {/* Starter */}
          <div className="pricing-card">
            <div className="pricing-card__glow-line pricing-card__glow-line--fuchsia"></div>
            <div className="pricing-card__header">
              <h3 className="pricing-card__title">Starter</h3>
              <span className="pricing-card__badge">For individuals</span>
            </div>
            <div className="pricing-card__price-container">
              <span className="pricing-card__price">$0</span>
              <span className="pricing-card__price-period">/ forever</span>
            </div>
            <p className="pricing-card__description">Everything you need to get started.</p>

            <div className="pricing-card__features">
              <div className="pricing-card__feature pricing-card__feature--included">
                <svg xmlns="http://www.w3.org/2000/svg" className="pricing-card__feature-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"></path></svg>
                Basic components and templates
              </div>
              <div className="pricing-card__feature pricing-card__feature--included">
                <svg xmlns="http://www.w3.org/2000/svg" className="pricing-card__feature-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"></path></svg>
                Community support
              </div>
              <div className="pricing-card__feature pricing-card__feature--excluded">
                <svg xmlns="http://www.w3.org/2000/svg" className="pricing-card__feature-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M8 12h8"></path></svg>
                Limited automation runs
              </div>
            </div>

            <div className="pricing-card__cta-section">
              <a href="#" className="pricing-card__cta-link">
                <span className="pricing-card__cta-text">Get started</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="pricing-card__cta-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
              </a>
            </div>
          </div>

          {/* Pro (Most Popular) */}
          <div className="pricing-card pricing-card--popular">
            <div className="pricing-card__glow-line pricing-card__glow-line--indigo"></div>
            <div className="pricing-card__popular-badge">Most popular</div>
            <div className="pricing-card__header">
              <h3 className="pricing-card__title">Pro</h3>
              <span className="pricing-card__badge">For teams</span>
            </div>
            <div className="pricing-card__price-container">
              <span className="pricing-card__price">$19</span>
              <span className="pricing-card__price-period">/ month</span>
            </div>
            <p className="pricing-card__description">Advanced features and higher limits.</p>

            <div className="pricing-card__features">
                <div className="pricing-card__feature pricing-card__feature--included">
                    <svg xmlns="http://www.w3.org/2000/svg" className="pricing-card__feature-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"></path></svg>
                    Everything in Starter
                </div>
                <div className="pricing-card__feature pricing-card__feature--included">
                    <svg xmlns="http://www.w3.org/2000/svg" className="pricing-card__feature-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"></path></svg>
                    Unlimited projects
                </div>
                <div className="pricing-card__feature pricing-card__feature--included">
                    <svg xmlns="http://www.w3.org/2000/svg" className="pricing-card__feature-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"></path></svg>
                    Priority support
                </div>
                <div className="pricing-card__feature pricing-card__feature--included">
                    <svg xmlns="http://www.w3.org/2000/svg" className="pricing-card__feature-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"></path></svg>
                    Team roles &amp; permissions
                </div>
            </div>

            <div className="pricing-card__cta-section">
              <button className="pricing-card__cta-button">
                <span className="pricing-card__backdrop"></span>
                <span className="pricing-card__spark"></span>
                <svg xmlns="http://www.w3.org/2000/svg" className="pricing-card__sparkle" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z"></path>
                  <path d="M19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16z"></path>
                  <path d="M5 16l.8 2.2L8 19l-2.2.8L5 22l-.8-2.2L2 19l2.2-.8L5 16z"></path>
                </svg>
                <span className="pricing-card__button-text">Choose Pro</span>
              </button>
            </div>
          </div>

          {/* Enterprise */}
          <div className="pricing-card">
            <div className="pricing-card__glow-line pricing-card__glow-line--fuchsia"></div>
            <div className="pricing-card__header">
              <h3 className="pricing-card__title">Enterprise</h3>
              <span className="pricing-card__badge">For scale</span>
            </div>
            <div className="pricing-card__price-container">
              <span className="pricing-card__price">Custom</span>
            </div>
            <p className="pricing-card__description">Tailored solutions and dedicated support.</p>

            <div className="pricing-card__features">
                <div className="pricing-card__feature pricing-card__feature--included">
                    <svg xmlns="http://www.w3.org/2000/svg" className="pricing-card__feature-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"></path></svg>
                    SSO &amp; advanced security
                </div>
                <div className="pricing-card__feature pricing-card__feature--included">
                    <svg xmlns="http://www.w3.org/2000/svg" className="pricing-card__feature-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"></path></svg>
                    Dedicated success manager
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;