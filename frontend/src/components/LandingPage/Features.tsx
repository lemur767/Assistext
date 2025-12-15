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
                <div className="feature-icon-wrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" className="feature-icon text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="7" height="7" rx="1.5"></rect>
                    <rect x="14" y="14" width="7" height="7" rx="1.5"></rect>
                    <path d="M10 6h4a3 3 0 0 1 3 3v2"></path>
                    <path d="M14 18H9a3 3 0 0 1-3-3v-2"></path>
                  </svg>
                </div>
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
            <div className="feature-icon-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" className="feature-icon text-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <h3 className="feature-title-text">2. Style Mimicking</h3>
            <p className="feature-description-text">
              The AI learns from your provided text message examples to influence its response style. It generates responses so authentic that your clients won't know it's not you.
            </p>
            <div className="feature-avatars">
              <div className="feature-avatar feature-avatar-primary"></div>
              <div className="feature-avatar feature-avatar-secondary"></div>
              <div className="feature-avatar feature-avatar-accent"></div>
              <div className="feature-avatar feature-avatar-more">+5</div>
            </div>
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
              <div className="number-icon-wrapper">
                <svg xmlns="http://www.w3.org/2000/svg" className="feature-icon text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4.5 16.5S5 14 7 12s6-3 6-3 1-4 5-5c0 0 1 4-1 7s-5 5-5 5-1 4-4 5c0 0-1-3 1-6s6-6 6-6"></path>
                </svg>
              </div>
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
            <div className="feature-icon-wrapper mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="feature-icon text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
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
            <div className="feature-icon-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" className="feature-icon text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22v-5"></path>
                <path d="M9 8V2"></path>
                <path d="M15 8V2"></path>
                <rect x="7" y="8" width="10" height="8" rx="2"></rect>
              </svg>
            </div>
            <h3 className="feature-title-text">Seamless Integration</h3>
            <p className="feature-description-text">Built on robust infrastructure with Signalwire for telephony and Stripe for secure payments.</p>
            <div className="feature-integrations-grid">
              <div className="integration-box-active"></div>
              {[...Array(7)].map((_, i) => (
                <div key={i} className="integration-box"></div>
              ))}
            </div>
          </motion.div>

          {/* 4. You're Always in Control (wide) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="feature-card feature-card-wide-half"
          >
            <div className="feature-card-border-top secondary"></div>
            <div className="feature-content-flex">
              <div className="feature-content-left">
                <div className="feature-icon-wrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" className="feature-icon text-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z"></path>
                    <path d="M19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16z"></path>
                    <path d="M5 16l.8 2.2L8 19l-2.2.8L5 22l-.8-2.2L2 19l2.2-.8L5 16z"></path>
                  </svg>
                </div>
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
            <div className="feature-icon-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" className="feature-icon text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
              </svg>
            </div>
            <h3 className="feature-title-text">6. Stress-Free Trial</h3>
            <p className="feature-description-text">Reduce the stress of a flooded inbox. Try the full Pro features with our 14-day free trial. Simple, affordable, and effective.</p>
            <div className="feature-stats-grid">
              <div className="feature-stat-box">
                <div className="feature-stat-label">Regions</div>
                <div className="feature-stat-value">16</div>
              </div>
              <div className="feature-stat-box">
                <div className="feature-stat-label">Uptime</div>
                <div className="feature-stat-value">99.99%</div>
              </div>
              <div className="feature-stat-box">
                <div className="feature-stat-label">SLA</div>
                <div className="feature-stat-value">Enterprise</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>

  );
};

export default Features;
