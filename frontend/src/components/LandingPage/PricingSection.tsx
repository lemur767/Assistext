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
    <section id="pricing" className="section">
      <div className="blurBackground"></div>
      <div className="container">
        <div className="header">
          <h2 className="title">
            Simple{' '}
            <span className="titleHighlight">
              Pricing
            </span>
          </h2>
          <p className="description">
            Choose the plan that fits your needs. All plans include a 14-day
            free trial.
          </p>
        </div>
        <div className="grid">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`card ${plan.popular ? "cardPopularBorder" : "cardDefaultBorder"}`}
            >
              {plan.popular && (
                <div className="popularTag">
                  <div className="popularTagContent">
                    Most Popular
                  </div>
                </div>
              )}
              <div className="planHeader">
                <h3 className="planName">{plan.name}</h3>
                <div className="priceContainer">
                  <span className="priceCurrency">$</span>
                  <span className="priceValue">{plan.price}</span>
                  <span className="pricePeriod">/mo</span>
                </div>
                <p className="planDescription">{plan.description}</p>
              </div>
              <ul className="featuresList">
                {plan.features.map((feature, i) => (
                  <li key={i} className="featureItem">
                    <CheckIcon size={20} className="checkIcon" />
                    <span className="featureText">{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                className={`button ${plan.popular ? "buttonPopular" : "buttonDefault"}`}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>
        <div className="footerText">
          <p>
            Need a custom plan?{' '}
            <a href="#" className="footerLink">
              Contact our sales team
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};
export default PricingSection;