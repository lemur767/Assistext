
import { motion } from 'framer-motion';
import { Zap, ArrowRight } from 'lucide-react';
import { GlassCard } from '../common/GlassCard';
import { StatCard } from '../common/StatCard';
import { AnimatedSection } from '../common/AnimatedSection';
import { MorphingText } from '../animate-ui/primitives/texts/morphing';
import '../../styles/Hero_landing_page.css';

const texts = [
  'Transform Your',
  'Text Messaging',
  'Into Your Superpower!',
  'Easily with AI',
  'Assist Text! ',
];

interface MorphingTextProps {
  loop?: boolean;
  holdDelay?: number;
  delay?: number;
}

export const Hero = ({ loop = true, holdDelay = 2500, delay = 0 }: MorphingTextProps) => {
  return (
    <section className="hero-section">
      <div className="hero-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <GlassCard variant="solid" className="hero-card">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hero-powered-by"
            >
              <Zap className="hero-powered-icon" />
              <span className="hero-powered-text">Powered by AI</span>
            </motion.div>

            <div className="hero-heading-wrapper">
              <MorphingText
                key={`${loop}-${holdDelay}-${delay}`}
                className="hero-morphing-text"
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
              className="hero-subtext"
            >
              Our AI automatically responds to your incoming texts with personalized,
              context-aware replies while you focus on what matters most.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="hero-buttons"
            >
              <motion.a
                href="/signup"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="btn btn-primary hero-btn-start"
              >
                Get Started
                <ArrowRight className="hero-btn-icon" />
              </motion.a>
              <motion.a
                href="#pricing"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="btn btn-ghost hero-btn-pricing"
              >
                View Pricing
              </motion.a>
            </motion.div>
          </GlassCard>
        </motion.div>

        {/* Stats */}
        <div className="hero-stats-grid">
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
    </section>
  );
};

export default Hero;