import React from 'react';
import styles from './HowItWorksSection.module.css';

const HowItWorksSection = () => {
  const steps = [{
    number: '01',
    title: 'Connect Your Accounts',
    description: 'Link your messaging platforms in minutes with our secure authentication process.'
  }, {
    number: '02',
    title: 'Train Your AI Assistant',
    description: 'Upload previous conversations or start from scratch with our pre-built personality templates.'
  }, {
    number: '03',
    title: 'Set Your Preferences',
    description: 'Define when and how your AI should respond, including tone, length, and response triggers.'
  }, {
    number: '04',
    title: 'Let AI Handle Your Texts',
    description: 'Relax while our AI responds to messages, learning and improving with each interaction.'
  }];
  return (
    <section id="how-it-works" className={styles.section}>
      <div className={styles.divider}></div>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            How It{' '}
            <span className={styles.titleHighlight}>
              Works
            </span>
          </h2>
          <p className={styles.description}>
            Getting started is simple. Follow these steps to automate your
            messaging with AI.
          </p>
        </div>
        <div className={styles.grid}>
          {steps.map((step, index) => (
            <div key={index} className={styles.stepCard}>
              <div className={styles.stepCardInner}>
                <div className={styles.stepNumber}>
                  {step.number}
                </div>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDescription}>{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className={styles.arrowIndicator}>
                  <div className={styles.arrowCircle}>
                    <svg className={styles.arrowIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className={styles.buttonContainer}>
          <button className={styles.button}>
            Watch Setup Tutorial
          </button>
        </div>
      </div>
    </section>
  );
};
export default HowItWorksSection;