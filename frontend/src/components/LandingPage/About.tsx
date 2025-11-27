import React from 'react';
import { AnimatedSection } from '../common/AnimatedSection';
import { GlassCard } from '../common/GlassCard';

const About: React.FC = () => {
  return (
    <section id="about" style={{ maxWidth: '80rem', margin: '0 auto', padding: '4rem 1rem', paddingTop: '7rem', paddingBottom: '7rem' }}>
      <div style={{ maxWidth: '64rem', margin: '0 auto' }}>
        <AnimatedSection>
          <GlassCard variant="solid">
            <div style={{ textAlign: 'center' }}>
              <h2 className="gradient-text-brand" style={{ fontSize: 'clamp(2.25rem, 5vw, 3rem)', marginBottom: '1.5rem', fontWeight: 600 }}>
                About Assistext
              </h2>
              <p style={{ fontSize: 'clamp(1rem, 2vw, 1.125rem)', color: 'var(--muted-foreground)', maxWidth: '48rem', margin: '0 auto 2rem', lineHeight: 1.7 }}>
                Assistext is your AI-powered text message assistant that works around the clock to manage your communications.
                We understand that staying on top of every text message can be overwhelming, especially when you're focused on what matters most.
              </p>
              <p style={{ fontSize: 'clamp(1rem, 2vw, 1.125rem)', color: 'var(--muted-foreground)', maxWidth: '48rem', margin: '0 auto 2rem', lineHeight: 1.7 }}>
                Our advanced AI learns your unique communication style to create authentic, personalized responses that sound just like you.
                With enterprise-grade security and privacy protection, you can rest assured that your conversations and personal information remain safe.
              </p>
              <p style={{ fontSize: 'clamp(1rem, 2vw, 1.125rem)', color: 'var(--muted-foreground)', maxWidth: '48rem', margin: '0 auto', lineHeight: 1.7 }}>
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
