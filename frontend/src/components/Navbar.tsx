import React, { useState } from 'react';
import { MenuIcon, XIcon } from 'lucide-react';
import '../styles/Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <nav className="navbar">
      <div className="containerNavbar">
        <div className="logoContainer">
          <span className="logoText">
            TextAI
          </span>
        </div>
        <div className="desktopNav">
          <a href="#features" className="navLink">
            Features
          </a>
          <a href="#how-it-works" className="navLink">
            How it Works
          </a>
          <a href="#pricing" className="navLink">
            Pricing
          </a>
          <a href="#testimonials" className="navLink">
            Testimonials
          </a>
        </div>
        <div className="desktopButtons">
          <button className="loginButton">
            Login
          </button>
          <button className="getStartedButton">
            Get Started
          </button>
        </div>
        <div className="mobileMenuButtonContainer">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <XIcon size={24} className="menuIcon" /> : <MenuIcon size={24} className="menuIcon" />}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className={`mobileMenuDropdown ${isMenuOpen ? "open" : ''}`}>
          <div className="mobileNavLinks">
            <a href="#features" className="navLink">
              Features
            </a>
            <a href="#how-it-works" className="navLink">
              How it Works
            </a>
            <a href="#pricing" className="navLink">
              Pricing
            </a>
            <a href="#testimonials" className="navLink">
              Testimonials
            </a>
            <div className="mobileButtonsContainer">
              <button className="loginButton">
                Login
              </button>
              <button className="getStartedButton">
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
export default Navbar;