import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, MessageSquare, Users, Settings, CreditCard, LogOut, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { ThemeToggle } from './common/ThemeToggle';
import { api } from "../services/api";
import '../styles/AuthenticatedNavbar_dashboard.css';

const AuthenticatedNavbar: React.FC = () => {
  const { setSession } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await api.post('/auth/logout', {});
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
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-card glass">
          {/* Logo */}
          <a href="/" className="navbar-logo-link">
            <img src="/assets/logonew.png" alt="Assistext Logo" className="navbar-logo-img" />
          </a>

          {/* Desktop Navigation */}
          <div className="desktop-nav">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.to);
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`nav-link ${active ? 'active' : ''}`}
                >
                  <Icon className="nav-icon" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Right Section */}
          <div className="nav-right-section">
            <div className="desktop-nav">
              <ThemeToggle />
              <button
                onClick={handleLogout}
                className="nav-logout-btn"
              >
                <LogOut className="nav-icon" />
                Logout
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="mobile-nav">
              <ThemeToggle />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="mobile-menu-btn"
              >
                {isMobileMenuOpen ? <X className="mobile-menu-icon" /> : <Menu className="mobile-menu-icon" />}
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
              className="mobile-menu-container"
            >
              <div className="mobile-menu-card">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const active = isActive(link.to);
                  return (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`mobile-nav-link ${active ? 'active' : ''}`}
                    >
                      <Icon className="nav-icon" />
                      {link.label}
                    </Link>
                  );
                })}
                <div className="mobile-menu-divider" />
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleLogout();
                  }}
                  className="mobile-logout-btn"
                >
                  <LogOut className="nav-icon" />
                  Logout
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default AuthenticatedNavbar;