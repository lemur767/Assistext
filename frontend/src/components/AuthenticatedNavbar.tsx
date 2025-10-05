import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/AuthenticatedNavbar.css';

const AuthenticatedNavbar: React.FC = () => {
  const { setSession } = useAuth();
  const navigate = useNavigate();
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

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/dashboard" className="navbar-brand">Assistext</Link>
        <div className="navbar-links">
          <Link to="/dashboard" className="navbar-link">Dashboard</Link>
          <Link to="/conversations" className="navbar-link">Conversations</Link>
          <Link to="/contacts" className="navbar-link">Contacts</Link>
          <Link to="/settings" className="navbar-link">Settings</Link>
          <Link to="/subscription" className="navbar-link">Subscription</Link>
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="hamburger-button">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
        <div className="hidden md:block">
          <button onClick={handleLogout} className="navbar-logout">
            Logout
          </button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="mobile-menu">
          <Link to="/dashboard" className="mobile-menu-link">Dashboard</Link>
          <Link to="/conversations" className="mobile-menu-link">Conversations</Link>
          <Link to="/contacts" className="mobile-menu-link">Contacts</Link>
          <Link to="/settings" className="mobile-menu-link">Settings</Link>
          <Link to="/subscription" className="mobile-menu-link">Subscription</Link>
          <button onClick={handleLogout} className="mobile-menu-logout">
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default AuthenticatedNavbar;