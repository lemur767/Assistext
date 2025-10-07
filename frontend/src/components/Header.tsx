import React from 'react';
import '../styles/Header.css';

const Header: React.FC = () => {
  return (
    <div className="header-container">
      <div className="header-content">
        <div className="header-inner">
          {/* Logo Left */}
          <a href="#" className="logo-link">
            <div className="logo-icon-container">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="logo-icon">
                <path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"></path>
              </svg>
            </div>
            <span className="logo-text">Assist Texts</span>
          </a>

          {/* Center Nav */}
          <nav className="center-nav">
            <a href="#features" className="nav-link">Features</a>
            <a href="#pricing" className="nav-link">Pricing</a>
          </nav>

          {/* Right CTAs */}
          <div className="right-ctas">
            <a href="#" className="signin-link">
              <span className="signin-content">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="signin-icon">
                  <path d="m10 17 5-5-5-5"></path>
                  <path d="M15 12H3"></path>
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                </svg>
                <span className="font-quicksand font-medium">Sign in</span>
              </span>
            </a>
            <a href="#pricing" className="get-started-link-desktop">
              <span className="get-started-content">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="get-started-icon">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
                <span className="font-quicksand font-medium">Get started</span>
              </span>
            </a>
          </div>
          <div className="mobile-get-started">
            <a href="#pricing" className="get-started-link-mobile">
              Get started
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
