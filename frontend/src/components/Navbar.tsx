import React, { useState } from 'react';
import { MenuIcon, XIcon } from 'lucide-react';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.logoContainer}>
          <span className={styles.logoText}>
            TextAI
          </span>
        </div>
        <div className={styles.desktopNav}>
          <a href="#features" className={styles.navLink}>
            Features
          </a>
          <a href="#how-it-works" className={styles.navLink}>
            How it Works
          </a>
          <a href="#pricing" className={styles.navLink}>
            Pricing
          </a>
          <a href="#testimonials" className={styles.navLink}>
            Testimonials
          </a>
        </div>
        <div className={styles.desktopButtons}>
          <button className={styles.loginButton}>
            Login
          </button>
          <button className={styles.getStartedButton}>
            Get Started
          </button>
        </div>
        <div className={styles.mobileMenuButtonContainer}>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <XIcon size={24} className={styles.menuIcon} /> : <MenuIcon size={24} className={styles.menuIcon} />}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className={`${styles.mobileMenuDropdown} ${isMenuOpen ? styles.open : ''}`}>
          <div className={styles.mobileNavLinks}>
            <a href="#features" className={styles.navLink}>
              Features
            </a>
            <a href="#how-it-works" className={styles.navLink}>
              How it Works
            </a>
            <a href="#pricing" className={styles.navLink}>
              Pricing
            </a>
            <a href="#testimonials" className={styles.navLink}>
              Testimonials
            </a>
            <div className={styles.mobileButtonsContainer}>
              <button className={styles.loginButton}>
                Login
              </button>
              <button className={styles.getStartedButton}>
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