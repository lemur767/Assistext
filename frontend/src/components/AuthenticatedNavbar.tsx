import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Sparkles, LayoutDashboard, MessageSquare, Users, Settings, CreditCard, LogOut, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { ThemeToggle } from './common/ThemeToggle';

const AuthenticatedNavbar: React.FC = () => {
  const { setSession } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await fetch('/api/v1/auth/logout', { method: 'POST' });
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setSession(null);
      navigate('/login');
    }
  };

  const navLinks = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/conversations', label: 'Conversations', icon: MessageSquare },
    { to: '/contacts', label: 'Contacts', icon: Users },
    { to: '/settings', label: 'Settings', icon: Settings },
    { to: '/subscription', label: 'Subscription', icon: CreditCard },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      padding: '1rem 1rem 0'
    }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
        <div
          className="glass"
          style={{
            borderRadius: '1rem',
            padding: '1rem 1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)'
          }}
        >
          {/* Logo */}
          <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
            <img src="/assets/logo3333.png" width={120} height={120} alt="Assistext Logo " />
          </a>

          {/* Desktop Navigation */}
          <div style={{ display: 'none', alignItems: 'center', gap: '0.5rem' }} className="desktop-nav">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.to);
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.625rem 1rem',
                    borderRadius: '0.625rem',
                    fontSize: '0.938rem',
                    fontWeight: 500,
                    textDecoration: 'none',
                    color: active ? 'var(--primary)' : 'var(--foreground)',
                    backgroundColor: active ? 'color-mix(in srgb, var(--primary), transparent 90%)' : 'transparent',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    if (!active) e.currentTarget.style.backgroundColor = 'color-mix(in srgb, var(--accent), transparent 90%)';
                  }}
                  onMouseLeave={(e) => {
                    if (!active) e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <Icon style={{ width: '1.125rem', height: '1.125rem' }} />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Right Section */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div className="desktop-nav" style={{ display: 'none', alignItems: 'center', gap: '0.75rem' }}>
              <ThemeToggle />
              <button
                onClick={handleLogout}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.625rem 1rem',
                  borderRadius: '0.625rem',
                  fontSize: '0.938rem',
                  fontWeight: 500,
                  color: 'var(--foreground)',
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'color-mix(in srgb, var(--destructive), transparent 90%)';
                  e.currentTarget.style.color = 'var(--destructive)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'var(--foreground)';
                }}
              >
                <LogOut style={{ width: '1.125rem', height: '1.125rem' }} />
                Logout
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="mobile-nav" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <ThemeToggle />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                style={{
                  padding: '0.5rem',
                  borderRadius: '0.5rem',
                  border: 'none',
                  backgroundColor: 'transparent',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--muted)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                {isMobileMenuOpen ? <X style={{ width: '1.5rem', height: '1.5rem' }} /> : <Menu style={{ width: '1.5rem', height: '1.5rem' }} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              style={{ marginTop: '1rem' }}
              className="mobile-menu"
            >
              <div
                style={{
                  backgroundColor: 'var(--card)',
                  border: '1px solid var(--border)',
                  borderRadius: '1rem',
                  padding: '1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)'
                }}
              >
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const active = isActive(link.to);
                  return (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={() => setIsMobileMenuOpen(false)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        padding: '0.75rem 1rem',
                        borderRadius: '0.625rem',
                        fontSize: '0.938rem',
                        fontWeight: 500,
                        textDecoration: 'none',
                        color: active ? 'var(--primary)' : 'var(--foreground)',
                        backgroundColor: active ? 'color-mix(in srgb, var(--primary), transparent 90%)' : 'transparent',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        if (!active) e.currentTarget.style.backgroundColor = 'color-mix(in srgb, var(--accent), transparent 90%)';
                      }}
                      onMouseLeave={(e) => {
                        if (!active) e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      <Icon style={{ width: '1.25rem', height: '1.25rem' }} />
                      {link.label}
                    </Link>
                  );
                })}
                <div style={{ borderTop: '1px solid var(--border)', margin: '0.5rem 0' }} />
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleLogout();
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.75rem 1rem',
                    borderRadius: '0.625rem',
                    fontSize: '0.938rem',
                    fontWeight: 500,
                    color: 'var(--destructive)',
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    textAlign: 'left',
                    width: '100%'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'color-mix(in srgb, var(--destructive), transparent 90%)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <LogOut style={{ width: '1.25rem', height: '1.25rem' }} />
                  Logout
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-nav {
            display: none !important;
          }
          .mobile-menu {
            display: none;
          }
        }
      `}</style>
    </nav>
  );
};

export default AuthenticatedNavbar;