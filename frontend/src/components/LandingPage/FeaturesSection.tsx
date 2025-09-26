import React from 'react';
import { BrainIcon, MessageSquareTextIcon, ClockIcon, SparklesIcon, ZapIcon, ShieldIcon } from 'lucide-react';
import '../../styles/FeaturesSection.css';

const FeaturesSection = () => {
  const features = [{
    icon: <BrainIcon size={24} className="iconCyan" />,
    title: 'Smart Context Awareness',
    description: 'Our AI learns from your communication style and history to provide context-appropriate responses.'
  }, {
    icon: <MessageSquareTextIcon size={24} className="iconCyan" />,
    title: 'Multi-Platform Support',
    description: 'Works across SMS, WhatsApp, Telegram, and other popular messaging platforms.'
  }, {
    icon: <ClockIcon size={24} className="iconCyan" />,
    title: 'Schedule Management',
    description: 'Automatically suggests meeting times based on your calendar availability.'
  }, {
    icon: <SparklesIcon size={24} className="iconPurple" />,
    title: 'Tone Customization',
    description: 'Adjust response style from professional to casual based on your preferences.'
  }, {
    icon: <ZapIcon size={24} className="iconPurple" />,
    title: 'Quick Setup',
    description: 'Get started in minutes with our easy onboarding process and templates.'
  }, {
    icon: <ShieldIcon size={24} className="iconPurple" />,
    title: 'Privacy Focused',
    description: 'End-to-end encryption and strict data policies keep your conversations secure.'
  }];
  return (
    <section id="features" className="section">
      <div className="blurBackgroundCyan"></div>
      <div className="blurBackgroundPurple"></div>
      <div className="container">
        <div className="header">
          <h2 className="title">
            Powerful{' '}
            <span className="titleHighlight">
              Features
            </span>
          </h2>
          <p className="description">
            Our AI-powered platform offers everything you need to automate your
            messaging without losing the personal touch.
          </p>
        </div>
        <div className="grid">
          {features.map((feature, index) => (
            <div key={index} className="featureCard">
              <div className="iconContainer">
                {feature.icon}
              </div>
              <h3 className="featureTitle">{feature.title}</h3>
              <p className="featureDescription">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default FeaturesSection;