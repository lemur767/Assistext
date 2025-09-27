import React from 'react';
import { SparklesIcon } from 'lucide-react';
import '../../styles/CTASection.css';

const CTASection = () => {
  return (
    <section className="ctaSection_section">
      <div className="ctaSection_backgroundOverlay"></div>
      <div className="ctaSection_backgroundImage"></div>
      <div className="ctaSection_container">
        <div className="ctaSection_card">
          <div className="ctaSection_offerTag">
            <SparklesIcon size={16} className="ctaSection_offerIcon" />
            <span className="ctaSection_offerText">Limited Time Offer</span>
          </div>
          <h2 className="ctaSection_title">
            Get{' '}
            <span className="ctaSection_titleHighlight">
              50% Off
            </span>{' '}
            Your First 3 Months
          </h2>
          <p className="ctaSection_description">
            Join thousands of professionals who have reclaimed their time with
            TextAI. Start your free trial today.
          </p>
          <div className="ctaSection_buttonsContainer">
            <button className="ctaSection_primaryButton">
              Start Free Trial
            </button>
            <button className="ctaSection_secondaryButton">
              Schedule Demo
            </button>
          </div>
          <p className="ctaSection_smallText">
            No credit card required. 14-day free trial.
          </p>
        </div>
      </div>
    </section>
  );
};
export default CTASection;