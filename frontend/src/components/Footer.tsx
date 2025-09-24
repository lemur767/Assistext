import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div>
            <div className={styles.logo}>
              TextAI
            </div>
            <p className={styles.description}>
              AI-powered text automation that saves you time while maintaining
              your personal touch.
            </p>
            <div className={styles.socialLinks}>
              {['twitter', 'facebook', 'instagram', 'linkedin'].map(social => (
                <a key={social} href="#" className={styles.socialLink}>
                  <span className={styles.srOnly}>{social}</span>
                  <svg className={styles.socialIcon} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" clipRule="evenodd" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
          <div>
            <h3 className={styles.columnTitle}>Product</h3>
            <ul className={styles.navList}>
              {['Features', 'Pricing', 'Integrations', 'FAQ', 'Roadmap'].map(item => (
                <li key={item}>
                  <a href="#" className={styles.navLink}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className={styles.columnTitle}>Company</h3>
            <ul className={styles.navList}>
              {['About Us', 'Careers', 'Blog', 'Press', 'Contact'].map(item => (
                <li key={item}>
                  <a href="#" className={styles.navLink}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className={styles.columnTitle}>Legal</h3>
            <ul className={styles.navList}>
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'GDPR', 'Security'].map(item => (
                <li key={item}>
                  <a href="#" className={styles.navLink}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className={styles.bottomSection}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} TextAI. All rights reserved.
          </p>
          <div className={styles.legalLinks}>
            <a href="#" className={styles.legalLink}>
              Privacy Policy
            </a>
            <a href="#" className={styles.legalLink}>
              Terms of Service
            </a>
            <a href="#" className={styles.legalLink}>
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;