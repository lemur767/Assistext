import React from 'react';
import { motion } from 'framer-motion';
import '../../styles/Features_landing_page.css';

const Features: React.FC = () => {
  return (
    <section id="features" className="features-section">
      <div className="features-bg-gradient"></div>
      <div className="features-container">
        <div className="features-header">
          <h2 className="features-title">
            Features Designed for Your Success
          </h2>
          <p className="features-subtitle">
            Alleviate the stress of a flooded inbox. We handle the messaging so you can focus on your business.
          </p>
        </div>

        <div className="features-grid">
          {/* 1. Your Always-On Assistant (large) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="feature-card feature-card-wide row-span-2"
          >
            <div className="feature-card-border-top"></div>
            <div className="feature-content-flex">
              <div className="feature-content-left">

                <h3 className="feature-title-text">1. AI-Powered SMS Agent</h3>
                <p className="feature-description-text">
                  Manage high volumes of incoming text messages with an AI that works around the clock. Increase your efficiency and booking rates by instantly interacting with every inquiry.
                </p>

              </div>

            </div>
            <div className="feature-blob blob-primary"></div>
          </motion.div>

          {/* 2. Authentically You, Automatically (tall) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="feature-card feature-card-tall feature-content-center"
          >
            <div className="feature-card-border-top secondary"></div>

            <h3 className="feature-title-text">2. Style Mimicking</h3>
            <p className="feature-description-text">
              The AI learns from your provided text message examples to influence its response style. It generates responses so authentic that your clients won't know it's not you.
            </p>

          </motion.div>

          {/* 5. Automate Your Workflow */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="feature-card feature-card-medium feature-content-center"
          >
            <div className="feature-card-border-top"></div>
            <div className="feature-header-flex">

              <span className="feature-badge">Response &lt; 2s</span>
            </div>
            <h3 className="feature-title-text self-start">5. Efficiency & Speed</h3>
            <div className="feature-progress-container">
              <div className="feature-progress-bar">
                <div className="feature-progress-fill"></div>
              </div>
              <div className="feature-progress-bar">
                <div className="feature-progress-fill feature-progress-fill-secondary"></div>
              </div>
            </div>
          </motion.div>

          {/* 3. Protect Your Privacy */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="feature-card feature-card-medium feature-content-center"
          >
            <div className="feature-card-border-top secondary"></div>
            <h3 className="feature-title-text mb-2">3. Private "Ghost" Number</h3>
            <p className="feature-description-text text-sm">We provision a unique "ghost" phone number for you. Keep your personal number private.</p>
          </motion.div>

          {/* Integrations */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="feature-card feature-card-tall feature-content-center"
          >
            <div className="feature-card-border-top"></div>

            <h3 className="feature-title-text">Seamless Integration</h3>
            <p className="feature-description-text">Built on robust infrastructure with Signalwire for telephony and Stripe for secure payments.</p>
            <div className="feature-blob blob-primary"></div>
          </motion.div>

          {/* 4. You're Always in Control (wide) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="feature-card feature-card-wide-half">
            <div className="feature-card-border-top secondary"></div>
            <div className="feature-content-flex">
              <div className="feature-content-left">

                <h3 className="feature-title-text">4. Conversation Monitoring</h3>
                <p className="feature-description-text">Monitor the AI's conversations in real-time through our intuitive dashboard. Step in whenever you need to, but let the AI handle the noise.</p>
                <span className="feature-badge font-bold">Beta</span>
              </div>
            </div>
            <div className="feature-blob blob-accent"></div>
          </motion.div>

          {/* 6. Find Your Focus, Risk-Free */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="feature-card feature-card-wide-half-short feature-content-center"
          >
            <div className="feature-card-border-top"></div>

            <h3 className="feature-title-text">6. Stress-Free Trial</h3>
            <p className="feature-description-text">Reduce the stress of a flooded inbox. Try the full Pro features with our 14-day free trial. Simple, affordable, and effective.</p>

          </motion.div>
        </div>
      </div>
    </section>

  );
};

export default Features;
