import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Sparkles } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { ThemeToggle } from '../common/ThemeToggle';

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
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        transition: 'all 0.3s ease',
        paddingTop: scrolled ? '1rem' : '1.5rem',
        paddingBottom: scrolled ? '1rem' : '1.5rem'
      }}
    >
      <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 1rem' }}>
        <div
          className="glass"
          style={{
            borderRadius: '1rem',
            padding: '1rem 1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: scrolled ? '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)' : ''
          }}
        >
          {/* Logo */}
          <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
            <div style={{
              width: '2.5rem',
              height: '2.5rem',
              borderRadius: '0.75rem',
              background: 'linear-gradient(135deg, var(--primary), var(--accent))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Sparkles style={{ width: '1.5rem', height: '1.5rem', color: 'white' }} />
            </div>
            <span style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--foreground)' }}>Assistext</span>
          </a>

          {/* Desktop Navigation */}
          <div style={{ display: 'none', alignItems: 'center', gap: '2rem' }} className="desktop-nav">
            {isAuthenticated ? (
              <>
                <a href="/dashboard" style={{ color: 'var(--foreground)', fontSize: '15px', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--foreground)'}>Dashboard</a>
                <a href="/conversations" style={{ color: 'var(--foreground)', fontSize: '15px', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--foreground)'}>Conversations</a>
                <a href="/contacts" style={{ color: 'var(--foreground)', fontSize: '15px', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--foreground)'}>Contacts</a>
                <a href="/settings" style={{ color: 'var(--foreground)', fontSize: '15px', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--foreground)'}>Settings</a>
                <a href="/subscription" style={{ color: 'var(--foreground)', fontSize: '15px', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--foreground)'}>Subscription</a>
              </>
            ) : (
              <>
                <a href="#features" style={{ color: 'var(--foreground)', fontSize: '15px', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--foreground)'}>Features</a>
                <a href="#pricing" style={{ color: 'var(--foreground)', fontSize: '15px', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--foreground)'}>Pricing</a>
                <a href="#about" style={{ color: 'var(--foreground)', fontSize: '15px', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--foreground)'}>About</a>
                <a href="#contact" style={{ color: 'var(--foreground)', fontSize: '15px', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--foreground)'}>Contact</a>
              </>
            )}
            <ThemeToggle />
            {!isAuthenticated && (
              <>
                <a
                  href="/login"
                  style={{
                    color: 'var(--foreground)',
                    fontSize: '15px',
                    fontWeight: 500,
                    textDecoration: 'none',
                    transition: 'color 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'var(--foreground)'}
                >
                  Sign In
                </a>
                <a
                  href="/signup"
                  className="btn-primary"
                  style={{
                    padding: '0.75rem 1.5rem',
                    borderRadius: '0.75rem',
                    fontSize: '15px',
                    fontWeight: 500,
                    textDecoration: 'none'
                  }}
                >
                  Get Started
                </a>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }} className="mobile-nav">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                padding: '0.5rem',
                borderRadius: '0.5rem',
                transition: 'background-color 0.2s',
                backgroundColor: 'transparent'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--muted)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
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
            style={{ marginTop: '1rem' }}
            className="mobile-menu"
          >
            <div
              style={{
                backgroundColor: 'var(--card)',
                border: '1px solid var(--border)',
                borderRadius: '1rem',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)'
              }}
            >
              {isAuthenticated ? (
                <>
                  <a href="/dashboard" style={{ padding: '0.5rem 0', color: 'var(--foreground)', transition: 'color 0.2s' }} onClick={() => setMobileMenuOpen(false)} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--foreground)'}>Dashboard</a>
                  <a href="/conversations" style={{ padding: '0.5rem 0', color: 'var(--foreground)', transition: 'color 0.2s' }} onClick={() => setMobileMenuOpen(false)} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--foreground)'}>Conversations</a>
                  <a href="/contacts" style={{ padding: '0.5rem 0', color: 'var(--foreground)', transition: 'color 0.2s' }} onClick={() => setMobileMenuOpen(false)} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--foreground)'}>Contacts</a>
                  <a href="/settings" style={{ padding: '0.5rem 0', color: 'var(--foreground)', transition: 'color 0.2s' }} onClick={() => setMobileMenuOpen(false)} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--foreground)'}>Settings</a>
                  <a href="/subscription" style={{ padding: '0.5rem 0', color: 'var(--foreground)', transition: 'color 0.2s' }} onClick={() => setMobileMenuOpen(false)} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--foreground)'}>Subscription</a>
                </>
              ) : (
                <>
                  <a href="#features" style={{ padding: '0.5rem 0', color: 'var(--foreground)', transition: 'color 0.2s' }} onClick={() => setMobileMenuOpen(false)} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--foreground)'}>Features</a>
                  <a href="#pricing" style={{ padding: '0.5rem 0', color: 'var(--foreground)', transition: 'color 0.2s' }} onClick={() => setMobileMenuOpen(false)} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--foreground)'}>Pricing</a>
                  <a href="#about" style={{ padding: '0.5rem 0', color: 'var(--foreground)', transition: 'color 0.2s' }} onClick={() => setMobileMenuOpen(false)} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--foreground)'}>About</a>
                  <a href="#contact" style={{ padding: '0.5rem 0', color: 'var(--foreground)', transition: 'color 0.2s' }} onClick={() => setMobileMenuOpen(false)} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--foreground)'}>Contact</a>
                  <div style={{ borderTop: '1px solid var(--border)', margin: '0.5rem 0', paddingTop: '0.5rem' }} />
                  <a
                    href="/login"
                    style={{
                      padding: '0.5rem 0',
                      color: 'var(--foreground)',
                      textAlign: 'center',
                      display: 'block',
                      textDecoration: 'none',
                      transition: 'color 0.2s'
                    }}
                    onClick={() => setMobileMenuOpen(false)}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--foreground)'}
                  >
                    Sign In
                  </a>
                  <a
                    href="/signup"
                    className="btn-primary"
                    style={{
                      padding: '0.75rem 1.5rem',
                      borderRadius: '0.75rem',
                      fontWeight: 500,
                      textAlign: 'center',
                      marginTop: '0.5rem',
                      textDecoration: 'none',
                      display: 'block'
                    }}
                  >
                    Get Started
                  </a>
                </>
              )}
            </div>
          </motion.div>
        )}
      </div>

      <style>{`
        @media (min-width: 768px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-nav {
            display: none !important;
          }
        }
        @media (max-width: 767px) {
          .mobile-menu {
            display: block;
          }
        }
      `}</style>
    </motion.nav>
  );
};

export default LandingHeader;
