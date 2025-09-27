import React, { useState } from 'react';
import { MenuIcon, XIcon } from 'lucide-react';
import '../styles/Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <nav className="navbar_navbar">
      <div className="navbar_containerNavbar">
        <div className="navbar_logoContainer">
          <div className="navbar_logoText">
            <img src="logo3333.png" alt="Assistext Logo" className="navbar_logoImage" />
          </div>
        </div>
        <div className="navbar_desktopNav">
          <a href="#features" className="navbar_navLink">
            Features
          </a>
          <a href="#how-it-works" className="navbar_navLink">
            How it Works
          </a>
          <a href="#pricing" className="navbar_navLink">
            Pricing
          </a>
          <a href="#testimonials" className="navbar_navLink">
            Testimonials
          </a>
        </div>
        <div className="navbar_desktopButtons">
          <button className="navbar_loginButton">
            Login
          </button>
          <button className="navbar_getStartedButton">
            Get Started
          </button>
        </div>
        <div className="navbar_mobileMenuButtonContainer">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <XIcon size={24} className="navbar_menuIcon" /> : <MenuIcon size={24} className="navbar_menuIcon" />}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className={`navbar_mobileMenuDropdown ${isMenuOpen ? "open" : ''}`}>
          <div className="navbar_mobileNavLinks">
            <a href="#features" className="navbar_navLink">
              Features
            </a>
            <a href="#how-it-works" className="navbar_navLink">
              How it Works
            </a>
            <a href="#pricing" className="navbar_navLink">
              Pricing
            </a>
            <a href="#testimonials" className="navbar_navLink">
              Testimonials
            </a>
            <div className="navbar_mobileButtonsContainer">
              <a href="http://localhost:3000/login" className="navbar_loginButton">
                Login
              </a>
              <a href="http://localhost:3000/signup" className="navbar_getStartedButton">
                Get Started
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
export default Navbar;