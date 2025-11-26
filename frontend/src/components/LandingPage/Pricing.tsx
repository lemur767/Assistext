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

        <div className="pricing__cards-container">
          {/* Starter */}
          <div className="pricing-card">
            <div className="pricing-card__glow-line pricing-card__glow-line--fuchsia"></div>
            <div className="pricing-card__header">
              <h3 className="pricing-card__title">Starter</h3>
              <span className="pricing-card__badge">Get your feet wet</span>
            </div>
            <div className="pricing-card__price-container">
              <span className="pricing-card__price">$9</span>
              <span className="pricing-card__price-period">/ month</span>
            </div>
            <p className="pricing-card__description">Everything you need to get started.</p>

            <div className="pricing-card__features">
              <div className="pricing-card__feature pricing-card__feature--included">
                <svg xmlns="http://www.w3.org/2000/svg" className="pricing-card__feature-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"></path></svg>
                Basic functions
              </div>
              <div className="pricing-card__feature pricing-card__feature--included">
                <svg xmlns="http://www.w3.org/2000/svg" className="pricing-card__feature-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"></path></svg>
                One phone number
              </div>
             <div className="pricing-card__feature pricing-card__feature--included">
                <svg xmlns="http://www.w3.org/2000/svg" className="pricing-card__feature-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"></path></svg>
                Limit AI Generated response up to 100
              </div>
                   <div className="pricing-card__feature pricing-card__feature--included">
                <svg xmlns="http://www.w3.org/2000/svg" className="pricing-card__feature-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"></path></svg>
                No trainability or customization
              </div>
            </div>

            <div className="pricing-card__cta-section">
              <a href="/subscriptions" className="pricing-card__cta-button">
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
              <span className="pricing-card__badge">For busiest phone lines</span>
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
                    Trainable AI to mimic you
                </div>
                <div className="pricing-card__feature pricing-card__feature--included">
                    <svg xmlns="http://www.w3.org/2000/svg" className="pricing-card__feature-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"></path></svg>
                    Priority support
                </div>
                <div className="pricing-card__feature pricing-card__feature--included">
                    <svg xmlns="http://www.w3.org/2000/svg" className="pricing-card__feature-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"></path></svg>
                    Up to 1000 AI Generated responses
                </div>
            </div>

            <div className="pricing-card__cta-section">
              <button className="pricing-card__cta-button">
               
                <span className="pricing-card__button-text">Choose Pro</span>
              </button>
            </div>
          </div>

        
          </div>
        </div>
      
    </section>
  );
};

export default Pricing;