import React from 'react';
import { BrainIcon, MessageSquareTextIcon, ClockIcon, SparklesIcon, ZapIcon, ShieldIcon } from 'lucide-react';
import styles from './FeaturesSection.module.css';

const FeaturesSection = () => {
  const features = [{
    icon: <BrainIcon size={24} className={styles.iconCyan} />,
    title: 'Smart Context Awareness',
    description: 'Our AI learns from your communication style and history to provide context-appropriate responses.'
  }, {
    icon: <MessageSquareTextIcon size={24} className={styles.iconCyan} />,
    title: 'Multi-Platform Support',
    description: 'Works across SMS, WhatsApp, Telegram, and other popular messaging platforms.'
  }, {
    icon: <ClockIcon size={24} className={styles.iconCyan} />,
    title: 'Schedule Management',
    description: 'Automatically suggests meeting times based on your calendar availability.'
  }, {
    icon: <SparklesIcon size={24} className={styles.iconPurple} />,
    title: 'Tone Customization',
    description: 'Adjust response style from professional to casual based on your preferences.'
  }, {
    icon: <ZapIcon size={24} className={styles.iconPurple} />,
    title: 'Quick Setup',
    description: 'Get started in minutes with our easy onboarding process and templates.'
  }, {
    icon: <ShieldIcon size={24} className={styles.iconPurple} />,
    title: 'Privacy Focused',
    description: 'End-to-end encryption and strict data policies keep your conversations secure.'
  }];
  return (
    <section id="features" className={styles.section}>
      <div className={styles.blurBackgroundCyan}></div>
      <div className={styles.blurBackgroundPurple}></div>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            Powerful{' '}
            <span className={styles.titleHighlight}>
              Features
            </span>
          </h2>
          <p className={styles.description}>
            Our AI-powered platform offers everything you need to automate your
            messaging without losing the personal touch.
          </p>
        </div>
        <div className={styles.grid}>
          {features.map((feature, index) => (
            <div key={index} className={styles.featureCard}>
              <div className={styles.iconContainer}>
                {feature.icon}
              </div>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDescription}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default FeaturesSection;