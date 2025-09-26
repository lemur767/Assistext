import React from 'react';
import { SparklesIcon } from 'lucide-react';
import '../../styles/CTASection.css';

const CTASection = () => {
  return (
    <section className="section">
      <div className="backgroundOverlay"></div>
      <div className="backgroundImage"></div>
      <div className="container">
        <div className="card">
          <div className="offerTag">
            <SparklesIcon size={16} className="offerIcon" />
            <span className="offerText">Limited Time Offer</span>
          </div>
          <h2 className="title">
            Get{' '}
            <span className="titleHighlight">
              50% Off
            </span>{' '}
            Your First 3 Months
          </h2>
          <p className="description">
            Join thousands of professionals who have reclaimed their time with
            TextAI. Start your free trial today.
          </p>
          <div className="buttonsContainer">
            <button className="primaryButton">
              Start Free Trial
            </button>
            <button className="secondaryButton">
              Schedule Demo
            </button>
          </div>
          <p className="smallText">
            No credit card required. 14-day free trial.
          </p>
        </div>
      </div>
    </section>
  );
};
export default CTASection;