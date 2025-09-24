import React from 'react';
import { SparklesIcon } from 'lucide-react';
import styles from './CTASection.module.css';

const CTASection = () => {
  return (
    <section className={styles.section}>
      <div className={styles.backgroundOverlay}></div>
      <div className={styles.backgroundImage}></div>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.offerTag}>
            <SparklesIcon size={16} className={styles.offerIcon} />
            <span className={styles.offerText}>Limited Time Offer</span>
          </div>
          <h2 className={styles.title}>
            Get{' '}
            <span className={styles.titleHighlight}>
              50% Off
            </span>{' '}
            Your First 3 Months
          </h2>
          <p className={styles.description}>
            Join thousands of professionals who have reclaimed their time with
            TextAI. Start your free trial today.
          </p>
          <div className={styles.buttonsContainer}>
            <button className={styles.primaryButton}>
              Start Free Trial
            </button>
            <button className={styles.secondaryButton}>
              Schedule Demo
            </button>
          </div>
          <p className={styles.smallText}>
            No credit card required. 14-day free trial.
          </p>
        </div>
      </div>
    </section>
  );
};
export default CTASection;