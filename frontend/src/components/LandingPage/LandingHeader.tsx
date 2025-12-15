import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { ThemeToggle } from '../common/ThemeToggle';
import '../../styles/LandingHeader_landing_page.css';

const LandingHeader: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`landing-header-nav ${scrolled ? 'scrolled' : ''}`}
    >
      <div className="landing-header-container">
        <div
          className={`glass landing-header-glass ${scrolled ? 'scrolled' : ''}`}
        >
          {/* Logo */}
          <a href="/" className="landing-header-logo-link">
            <img src="/assets/logonew.png" width={120} height={120} alt="Assistext Logo " />
          </a>

          {/* Desktop Navigation */}
          <div className="landing-header-desktop-nav">
            {isAuthenticated ? (
              <>
                <a href="/dashboard" className="landing-header-link">Dashboard</a>
                <a href="/conversations" className="landing-header-link">Conversations</a>
                <a href="/contacts" className="landing-header-link">Contacts</a>
                <a href="/settings" className="landing-header-link">Settings</a>
                <a href="/subscription" className="landing-header-link">Subscription</a>
              </>
            ) : (
              <>
                <a href="#features" className="landing-header-link">Features</a>
                <a href="#pricing" className="landing-header-link">Pricing</a>
                <a href="#about" className="landing-header-link">About</a>
                <a href="#contact" className="landing-header-link">Contact</a>
              </>
            )}
            <ThemeToggle />
            {!isAuthenticated && (
              <>
                <a
                  href="/login"
                  className="landing-header-link"
                >
                  Sign In
                </a>
                <a
                  href="/signup"
                  className="btn-primary landing-header-btn-start"
                >
                  Get Started
                </a>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="landing-header-mobile-wrapper">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="landing-header-mobile-btn"
              type="button"
            >
              {mobileMenuOpen ? <X style={{ width: '1.5rem', height: '1.5rem' }} /> : <Menu style={{ width: '1.5rem', height: '1.5rem' }} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="landing-header-mobile-menu"
          >
            <div className="landing-header-mobile-glass">
              {isAuthenticated ? (
                <>
                  <a href="/dashboard" className="landing-header-mobile-link" onClick={() => setMobileMenuOpen(false)}>Dashboard</a>
                  <a href="/conversations" className="landing-header-mobile-link" onClick={() => setMobileMenuOpen(false)}>Conversations</a>
                  <a href="/contacts" className="landing-header-mobile-link" onClick={() => setMobileMenuOpen(false)}>Contacts</a>
                  <a href="/settings" className="landing-header-mobile-link" onClick={() => setMobileMenuOpen(false)}>Settings</a>
                  <a href="/subscription" className="landing-header-mobile-link" onClick={() => setMobileMenuOpen(false)}>Subscription</a>
                </>
              ) : (
                <>
                  <a href="#features" className="landing-header-mobile-link" onClick={() => setMobileMenuOpen(false)}>Features</a>
                  <a href="#pricing" className="landing-header-mobile-link" onClick={() => setMobileMenuOpen(false)}>Pricing</a>
                  <a href="#about" className="landing-header-mobile-link" onClick={() => setMobileMenuOpen(false)}>About</a>
                  <a href="#contact" className="landing-header-mobile-link" onClick={() => setMobileMenuOpen(false)}>Contact</a>
                  <div className="landing-header-mobile-divider" />
                  <a
                    href="/login"
                    className="landing-header-mobile-signin"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign In
                  </a>
                  <a
                    href="/signup"
                    className="btn-primary landing-header-mobile-start"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Get Started
                  </a>
                </>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default LandingHeader;
