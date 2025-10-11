import React from 'react';
import './LandingHeader.css';
import { useAuth } from '../../contexts/AuthContext';

const LandingHeader: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="landing-header">
      <div className="landing-header__content">
        <div className="landing-header__inner">
          {/* Logo Left */}
          <a href="#" className="landing-header__logo-link">
            <div className="landing-header__logo-icon-container">
              <img src='/assets/logo3333.png' alt="Logo" className="landing-header__logo-icon" width='150px' height='150px' />

            </div>
           
          </a>

          {/* Center Nav */}
          {isAuthenticated ? (
            <nav className="landing-header__nav">
              <a href="/dashboard" className="landing-header__nav-link">Dashboard</a>
              <a href="/conversations" className="landing-header__nav-link">Conversations</a>
              <a href="/contacts" className="landing-header__nav-link">Contacts</a>
              <a href="/settings" className="landing-header__nav-link">Settings</a>
              <a href="/subscription" className="landing-header__nav-link">Subscriptions</a>
            </nav>
          ) : (
            <nav className="landing-header__nav">
              <a href="#features" className="landing-header__nav-link">Features</a>
              <a href="#pricing" className="landing-header__nav-link">Pricing</a>
            </nav>
          )}

            
          {/* Right CTAs */}
          {!isAuthenticated && (
            <div className="landing-header__cta-container">
              <a href="/login" className="landing-header__cta-link">
                <span className="landing-header__cta-content">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="landing-header__cta-icon"><path d="m10 17 5-5-5-5"></path><path d="M15 12H3"></path><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path></svg>
                  <span className="landing-header__cta-text">Sign in</span>
                </span>
              </a>
              <a href="/signup" className="landing-header__get-started-link">
                <span className="landing-header__cta-content">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="landing-header__cta-icon"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                  <span className="landing-header__cta-text">Get started</span>
                </span>
              </a>
            </div>
          )}
          {!isAuthenticated && (
            <div className="landing-header__mobile-cta">
              <a href="#pricing" className="landing-header__mobile-cta-link">
                Get started
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LandingHeader;