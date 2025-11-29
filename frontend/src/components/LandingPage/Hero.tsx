import React from 'react';
import { motion } from 'framer-motion';
import { Zap, ArrowRight, Users, TrendingUp } from 'lucide-react';
import { GlassCard } from '../common/GlassCard';
import { StatCard } from '../common/StatCard';
import { AnimatedSection } from '../common/AnimatedSection';
import { MorphingText } from '../animate-ui/primitives/texts/morphing';

const texts = [
  'Transform Your Text Messaging',
  'Into Your Superpower!',
  'Easily with AI',
  'Assist Text! ',
];

interface MorphingTextProps {
  loop: boolean;
  holdDelay?: number;
  delay?: number;
}

export const Hero = ({ loop, holdDelay, delay }: MorphingTextProps) => {
  return (
    <section style={{ maxWidth: '80rem', margin: '0 auto', padding: '4rem 1rem', paddingTop: '7rem', paddingBottom: '7rem' }}>
      <div style={{ maxWidth: '64rem', margin: '0 auto', textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <GlassCard variant="solid" style={{ marginBottom: '2.5rem' }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.625rem 1.25rem',
                backgroundColor: 'rgba(232, 100, 124, 0.1)',
                borderRadius: '9999px',
                marginBottom: '2rem'
              }}
            >
              <Zap style={{ width: '1rem', height: '1rem', color: 'var(--primary)' }} />
              <span style={{ fontSize: '0.875rem', color: 'var(--primary)', fontWeight: 500 }}>Powered by AI</span>
            </motion.div>

            <div
              style={{
                fontSize: 'clamp(2.5rem, 7vw, 4.5rem)',
                marginBottom: '2rem',
                fontWeight: 700,
                lineHeight: 1.1
              }}
            >
              <MorphingText
                key={`${loop}-${holdDelay}-${delay}`}
                className="text-96px font-bold max-w-2xl"
                charClassName="hero-morphing-char"
                text={texts}
                loop={loop}
                holdDelay={holdDelay}
                delay={delay}
              />
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              style={{
                fontSize: 'clamp(1.125rem, 2vw, 1.25rem)',
                color: 'var(--muted-foreground)',
                marginBottom: '2.5rem',
                maxWidth: '48rem',
                margin: '0 auto 2.5rem',
                lineHeight: 1.625
              }}
            >
              Our AI automatically responds to your incoming texts with personalized,
              context-aware replies while you focus on what matters most.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                justifyContent: 'center',
                alignItems: 'center'
              }}
              className="hero-buttons"
            >
              <motion.a
                href="/signup"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="btn-primary"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  padding: '1rem 2.25rem',
                  borderRadius: '0.75rem',
                  fontSize: '15px',
                  fontWeight: 500,
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
                  textDecoration: 'none'
                }}
              >
                Get Started
                <ArrowRight style={{ width: '1.25rem', height: '1.25rem' }} />
              </motion.a>
              <motion.a
                href="#pricing"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="btn-ghost"
                style={{
                  padding: '1rem 2.25rem',
                  borderRadius: '0.75rem',
                  fontSize: '15px',
                  fontWeight: 500,
                  textDecoration: 'none'
                }}
              >
                View Pricing
              </motion.a>
            </motion.div>
          </GlassCard>
        </motion.div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginTop: '2.5rem' }}>
          <AnimatedSection delay={0.2}>
            <StatCard value="24/7" label="AI Availability" color="primary" />
          </AnimatedSection>
          <AnimatedSection delay={0.3}>
            <StatCard value="99.9%" label="Uptime" color="secondary" />
          </AnimatedSection>
          <AnimatedSection delay={0.4}>
            <StatCard value="10K+" label="Messages Handled" color="accent" />
          </AnimatedSection>
        </div>
      </div>

      <style>{`
        @media (min-width: 640px) {
          .hero-buttons {
            flex-direction: row !important;
          }
        }
        
        .hero-morphing-char {
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          background-image: linear-gradient(to right, var(--primary), var(--accent), var(--secondary));
          background-attachment: fixed;
        }
      `}</style>
    </section>
  );
};

export default Hero;