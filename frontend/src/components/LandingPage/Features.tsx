import React, { useEffect, useRef } from 'react';
import './Features.css';

const Features: React.FC = () => {
  const featureCardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.5 }
    );

    featureCardsRef.current.forEach((card) => {
      if (card) {
        observer.observe(card);
      }
    });

    return () => {
      featureCardsRef.current.forEach((card) => {
        if (card) {
          observer.unobserve(card);
        }
      });
    };
  }, []);

  return (
    <section id="features" className="features">
      <div className="features__background"></div>
      <div className="features__container">
        <div className="features__header">
          <h2 className="features__title">
            Features that help you ship faster
          </h2>
          <p className="features__subtitle">
            Modular building blocks, real-time collaboration, and secure-by-default foundations.
          </p>
        </div>

        <div className="features__grid">
          {/* 1. Your Always-On Assistant (large) */}
          <div ref={(el) => (featureCardsRef.current[0] = el!)} className="features__card features__card--large fly-in-left">
            <div className="features__card-header-line features__card-header-line--fuchsia"></div>
            <div className="features__card-content">
              <div>
                <div className="features__card-icon-container">
                  <svg xmlns="http://www.w3.org/2000/svg" className="features__card-icon features__card-icon--fuchsia" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="7" height="7" rx="1.5"></rect>
                    <rect x="14" y="14" width="7" height="7" rx="1.5"></rect>
                    <path d="M10 6h4a3 3 0 0 1 3 3v2"></path>
                    <path d="M14 18H9a3 3 0 0 1-3-3v-2"></path>
                  </svg>
                </div>
                <h3 className="features__card-title">1. Your Always-On Assistant</h3>
                <p className="features__card-description">
                  Never miss a serious inquiry again. Assistext works around the clock to instantly engage with every message, filtering out 
                  the noise and ensuring your best clients get the attention they deserve. Reclaim your time and your peace of mind.
                </p>
                <div className="features__card-tags">
                  <span className="features__card-tag">Schedules</span>
                  <span className="features__card-tag">Webhooks</span>
                  <span className="features__card-tag">Retries</span>
                </div>
              </div>
              <div className="features__card-code-block-wrapper">
                <div className="features__card-code-block">
                  <div className="features__card-code-block-header">workflow.yaml</div>
                  <div className="features__card-code-block-content">
                    <pre className="features__card-code">on: schedule
steps:
  - fetch: GET /api/users
  - map: transform(user)
  - notify: post(#ops)</pre>
                  </div>
                </div>
              </div>
            </div>
            <div className="features__card-glow features__card-glow--fuchsia"></div>
          </div>

          {/* 2. Authentically You, Automatically (tall) */}
          <div ref={(el) => (featureCardsRef.current[1] = el!)} className="features__card features__card--tall fly-in-right">
            <div className="features__card-header-line features__card-header-line--indigo"></div>
            <div className="features__card-icon-container">
              <svg xmlns="http://www.w3.org/2000/svg" className="features__card-icon features__card-icon--indigo" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <h3 className="features__card-title">2. Authentically You, Automatically</h3>
            <p className="features__card-description">
              Your clients want to connect with you, not a robot. Assistext learns your unique communication style—from phrasing to 
              emojis—to create responses so authentic, no one will know it’s not you. Maintain your personal brand, effortlessly.
            </p>
            <div className="features__card-avatars">
              <div className="features__card-avatar features__card-avatar--1"></div>
              <div className="features__card-avatar features__card-avatar--2"></div>
              <div className="features__card-avatar features__card-avatar--3"></div>
              <div className="features__card-avatar features__card-avatar--more">+5</div>
            </div>
          </div>

          {/* 5. Automate Your Workflow */}
          <div ref={(el) => (featureCardsRef.current[2] = el!)} className="features__card features__card--small fly-in-left">
            <div className="features__card-header-line features__card-header-line--fuchsia"></div>
            <div className="features__card-content">
              <div className="features__card-icon-container">
                <svg xmlns="http://www.w3.org/2000/svg" className="features__card-icon features__card-icon--emerald" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4.5 16.5S5 14 7 12s6-3 6-3 1-4 5-5c0 0 1 4-1 7s-5 5-5 5-1 4-4 5c0 0-1-3 1-6s6-6 6-6"></path>
                </svg>
              </div>
              <span className="features__card-badge">P95 &lt; 120ms</span>
            </div>
            <h3 className="features__card-title">5. Automate Your Workflow</h3>
            <div className="features__card-progress-bar-container">
              <div className="features__card-progress-bar">
                <div className="features__card-progress-bar-inner features__card-progress-bar-inner--1"></div>
              </div>
              <div className="features__card-progress-bar">
                <div className="features__card-progress-bar-inner features__card-progress-bar-inner--2"></div>
              </div>
            </div>
          </div>

          {/* 3. Protect Your Privacy */}
          <div ref={(el) => (featureCardsRef.current[3] = el!)} className="features__card features__card--small fly-in-right">
            <div className="features__card-header-line features__card-header-line--indigo"></div>
            <div className="features__card-icon-container">
              <svg xmlns="http://www.w3.org/2000/svg" className="features__card-icon features__card-icon--sky" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
            <h3 className="features__card-title">3. Protect Your Privacy</h3>
            <p className="features__card-description">Your safety and privacy are non-negotiable. Sign up and instantly receive a secure, private "ghost" number for all your 
              business communications. Keep your personal life separate and interact with confidence.</p>
          </div>

          {/* Integrations */}
          <div ref={(el) => (featureCardsRef.current[4] = el!)} className="features__card features__card--tall fly-in-left">
            <div className="features__card-header-line features__card-header-line--fuchsia"></div>
            <div className="features__card-icon-container">
              <svg xmlns="http://www.w3.org/2000/svg" className="features__card-icon features__card-icon--amber" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22v-5"></path>
                <path d="M9 8V2"></path>
                <path d="M15 8V2"></path>
                <rect x="7" y="8" width="10" height="8" rx="2"></rect>
              </svg>
            </div>
            <h3 className="features__card-title">Integrations</h3>
            <p className="features__card-description">Connect your favorite tools with native adapters and webhooks.</p>
            <div className="features__card-integrations">
              <div className="features__card-integration-item"></div>
              <div className="features__card-integration-item"></div>
              <div className="features__card-integration-item"></div>
              <div className="features__card-integration-item"></div>
              <div className="features__card-integration-item"></div>
              <div className="features__card-integration-item"></div>
              <div className="features__card-integration-item"></div>
              <div className="features__card-integration-item"></div>
            </div>
          </div>

          {/* 4. You're Always in Control (wide) */}
          <div ref={(el) => (featureCardsRef.current[5] = el!)} className="features__card features__card--wide fly-in-right">
            <div className="features__card-header-line features__card-header-line--indigo"></div>
            <div className="features__card-content">
              <div>
                <div className="features__card-icon-container">
                  <svg xmlns="http://www.w3.org/2000/svg" className="features__card-icon features__card-icon--fuchsia" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z"></path>
                    <path d="M19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16z"></path>
                    <path d="M5 16l.8 2.2L8 19l-2.2.8L5 22l-.8-2.2L2 19l2.2-.8L5 16z"></path>
                  </svg>
                </div>
                <h3 className="features__card-title">4. You’re Always in Control</h3>
                <p className="features__card-description max-w-sm">Automation doesn’t mean giving up control. Our clean, intuitive dashboard gives you a bird’s-eye view of all conversations. 
                  Monitor your AI’s performance, review interactions, and rest easy knowing you’re always in the loop.</p>
              </div>
              <span className="features__card-badge">Beta</span>
            </div>
            <div className="features__card-code-block">
              <div className="features__card-code-block-header">assistant.ts</div>
              <div className="features__card-code-block-content">
                <pre className="features__card-code">suggest("convert card to grid");
apply("optimize re-render");
doc("explain automation step");</pre>
              </div>
            </div>
            <div className="features__card-glow features__card-glow--indigo"></div>
          </div>

          {/* 6. Find Your Focus, Risk-Free */}
          <div ref={(el) => (featureCardsRef.current[6] = el!)} className="features__card features__card--wide fly-in-left">
            <div className="features__card-header-line features__card-header-line--fuchsia"></div>
            <div className="features__card-icon-container">
              <svg xmlns="http://www.w3.org/2000/svg" className="features__card-icon features__card-icon--violet" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
              </svg>
            </div>
            <h3 className="features__card-title">6. Find Your Focus, Risk-Free</h3>
            <p className="features__card-description">Experience the peace of mind that comes from an organized inbox. Try every feature of Assistext free for 14 days. No 
              commitment, no hassle. Just simple, transparent pricing when you’re ready.</p>
            <div className="features__card-stats">
              <div className="features__card-stat-item">
                <div className="features__card-stat-label">Regions</div>
                <div className="features__card-stat-value">16</div>
              </div>
              <div className="features__card-stat-item">
                <div className="features__card-stat-label">Uptime</div>
                <div className="features__card-stat-value">99.99%</div>
              </div>
              <div className="features__card-stat-item">
                <div className="features__card-stat-label">SLA</div>
                <div className="features__card-stat-value">Enterprise</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;