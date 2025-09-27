import React from 'react';
import { BrainIcon, MessageSquareTextIcon, ClockIcon, SparklesIcon, ZapIcon, ShieldIcon } from 'lucide-react';
import '../../styles/FeaturesSection.css';

const FeaturesSection = () => {
  const features = [{
    icon: <BrainIcon size={24} className="featuresSection_iconCyan" />,
    title: 'Smart Context Awareness',
    description: 'Our AI learns from your communication style and history to provide context-appropriate responses.'
  }, {
    icon: <MessageSquareTextIcon size={24} className="featuresSection_iconCyan" />,
    title: 'Multi-Platform Support',
    description: 'Works across SMS, WhatsApp, Telegram, and other popular messaging platforms.'
  }, {
    icon: <ClockIcon size={24} className="featuresSection_iconCyan" />,
    title: 'Schedule Management',
    description: 'Automatically suggests meeting times based on your calendar availability.'
  }, {
    icon: <SparklesIcon size={24} className="featuresSection_iconPurple" />,
    title: 'Tone Customization',
    description: 'Adjust response style from professional to casual based on your preferences.'
  }, {
    icon: <ZapIcon size={24} className="featuresSection_iconPurple" />,
    title: 'Quick Setup',
    description: 'Get started in minutes with our easy onboarding process and templates.'
  }, {
    icon: <ShieldIcon size={24} className="featuresSection_iconPurple" />,
    title: 'Privacy Focused',
    description: 'End-to-end encryption and strict data policies keep your conversations secure.'
  }];
  return (
    <section id="features" className="featuresSection_section">
      <div className="featuresSection_blurBackgroundCyan"></div>
      <div className="featuresSection_blurBackgroundPurple"></div>
      <div className="featuresSection_container">
        <div className="featuresSection_header">
          <h2 className="featuresSection_title">
            Powerful{' '}
            <span className="featuresSection_titleHighlight">
              Features
            </span>
          </h2>
          <p className="featuresSection_description">
            Our AI-powered platform offers everything you need to automate your
            messaging without losing the personal touch.
          </p>
        </div>
        <div className="featuresSection_grid">
          {features.map((feature, index) => (
            <div key={index} className="featuresSection_featureCard">
              <div className="featuresSection_iconContainer">
                {feature.icon}
              </div>
              <h3 className="featuresSection_featureTitle">{feature.title}</h3>
              <p className="featuresSection_featureDescription">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default FeaturesSection;