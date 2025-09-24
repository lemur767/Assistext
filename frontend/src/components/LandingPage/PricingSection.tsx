import React from 'react';
import { CheckIcon } from 'lucide-react';
import styles from './PricingSection.module.css';

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
    <section id="pricing" className={styles.section}>
      <div className={styles.blurBackground}></div>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            Simple{' '}
            <span className={styles.titleHighlight}>
              Pricing
            </span>
          </h2>
          <p className={styles.description}>
            Choose the plan that fits your needs. All plans include a 14-day
            free trial.
          </p>
        </div>
        <div className={styles.grid}>
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`${styles.card} ${plan.popular ? styles.cardPopularBorder : styles.cardDefaultBorder}`}
            >
              {plan.popular && (
                <div className={styles.popularTag}>
                  <div className={styles.popularTagContent}>
                    Most Popular
                  </div>
                </div>
              )}
              <div className={styles.planHeader}>
                <h3 className={styles.planName}>{plan.name}</h3>
                <div className={styles.priceContainer}>
                  <span className={styles.priceCurrency}>$</span>
                  <span className={styles.priceValue}>{plan.price}</span>
                  <span className={styles.pricePeriod}>/mo</span>
                </div>
                <p className={styles.planDescription}>{plan.description}</p>
              </div>
              <ul className={styles.featuresList}>
                {plan.features.map((feature, i) => (
                  <li key={i} className={styles.featureItem}>
                    <CheckIcon size={20} className={styles.checkIcon} />
                    <span className={styles.featureText}>{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                className={`${styles.button} ${plan.popular ? styles.buttonPopular : styles.buttonDefault}`}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>
        <div className={styles.footerText}>
          <p>
            Need a custom plan?{' '}
            <a href="#" className={styles.footerLink}>
              Contact our sales team
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};
export default PricingSection;