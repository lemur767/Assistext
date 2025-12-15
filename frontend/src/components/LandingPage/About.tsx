import React from 'react';
import { AnimatedSection } from '../common/AnimatedSection';
import { GlassCard } from '../common/GlassCard';
import '../../styles/About_landing_page.css';

const About: React.FC = () => {
  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <AnimatedSection>
          <GlassCard variant="solid">
            <div className="about-content-wrapper">
              <h2 className="gradient-text-brand about-title">
                About Assistext
              </h2>
              <p className="about-text">
                Assistext is your AI-powered text message assistant that works around the clock to manage your communications.
                We understand that staying on top of every text message can be overwhelming, especially when you're focused on what matters most.
              </p>
              <p className="about-text">
                Our advanced AI learns your unique communication style to create authentic, personalized responses that sound just like you.
                With enterprise-grade security and privacy protection, you can rest assured that your conversations and personal information remain safe.
              </p>
              <p className="about-text">
                Whether you're a busy professional, entrepreneur, or just someone who wants to stay connected without the constant interruptions,
                Assistext gives you the freedom to focus on your priorities while never missing an important message.
              </p>
            </div>
          </GlassCard>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default About;
