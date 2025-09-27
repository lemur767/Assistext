import React from 'react';
import { CheckIcon } from 'lucide-react';
import '../../styles/PricingSection.css';

const PricingSection = () => {
  const plans = [{
    name: 'Basic',
    price: '19',
    description: 'Perfect for individuals',
    features: ['1 connected messaging platform', '100 AI responses per month', 'Basic customization options', '24 hour response time', 'Email support'],
    popular: false,
    buttonText: 'Get Started'
  }, {
    name: 'Pro',
    price: '49',
    description: 'Ideal for professionals',
    features: ['3 connected messaging platforms', '500 AI responses per month', 'Advanced customization options', 'Calendar integration', 'Priority support', 'Analytics dashboard'],
    popular: true,
    buttonText: 'Start Free Trial'
  }, {
    name: 'Business',
    price: '99',
    description: 'For teams and businesses',
    features: ['Unlimited messaging platforms', '2000 AI responses per month', 'Complete customization options', 'Full calendar & CRM integration', '24/7 priority support', 'Advanced analytics', 'Team management'],
    popular: false,
    buttonText: 'Contact Sales'
  }];
  return (
    <section id="pricing" className="pricingSection_section">
      <div className="pricingSection_blurBackground"></div>
      <div className="pricingSection_container">
        <div className="pricingSection_header">
          <h2 className="pricingSection_title">
            Simple{' '}
            <span className="pricingSection_titleHighlight">
              Pricing
            </span>
          </h2>
          <p className="pricingSection_description">
            Choose the plan that fits your needs. All plans include a 14-day
            free trial.
          </p>
        </div>
        <div className="pricingSection_grid">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`pricingSection_card ${plan.popular ? "pricingSection_cardPopularBorder" : "pricingSection_cardDefaultBorder"}`}>
              {plan.popular && (
                <div className="pricingSection_popularTag">
                  <div className="pricingSection_popularTagContent">
                    Most Popular
                  </div>
                </div>
              )}
              <div className="pricingSection_planHeader">
                <h3 className="pricingSection_planName">{plan.name}</h3>
                <div className="pricingSection_priceContainer">
                  <span className="pricingSection_priceCurrency">$</span>
                  <span className="pricingSection_priceValue">{plan.price}</span>
                  <span className="pricingSection_pricePeriod">/mo</span>
                </div>
                <p className="pricingSection_planDescription">{plan.description}</p>
              </div>
              <ul className="pricingSection_featuresList">
                {plan.features.map((feature, i) => (
                  <li key={i} className="pricingSection_featureItem">
                    <CheckIcon size={20} className="pricingSection_checkIcon" />
                    <span className="pricingSection_featureText">{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                className={`pricingSection_button ${plan.popular ? "pricingSection_buttonPopular" : "pricingSection_buttonDefault"}`}>
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>
        <div className="pricingSection_footerText">
          <p>
            Need a custom plan?{' '}
            <a href="#" className="pricingSection_footerLink">
              Contact our sales team
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};
export default PricingSection;