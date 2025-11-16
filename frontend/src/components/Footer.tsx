import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer_footer">
      <div className="footer_container">
        <div className="footer_grid">
          <div>
            <div className="footer_logo">
             <img src="assets/logo3333.png" alt="Assistext Logo" className="footer_logoImage" width="80px" height="80px" />
            </div>
            <p className="footer_description">
              AI-powered text automation that saves you time while maintaining
              your personal touch.
            </p>
            <div className="footer_socialLinks">
              {['twitter', 'facebook', 'instagram', 'linkedin'].map(social => (
                <a key={social} href="#" className="footer_socialLink">
                  <span className="footer_srOnly">{social}</span>
                  <svg className="footer_socialIcon" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" clipRule="evenodd" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="footer_columnTitle">Product</h3>
            <ul className="footer_navList">
              {['Features', 'Pricing', 'Integrations', 'FAQ', 'Roadmap'].map(item => (
                <li key={item}>
                  <a href="#" className="footer_navLink">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
         
          <div>
            <h3 className="footer_columnTitle">Legal</h3>
            <ul className="footer_navList">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'GDPR', 'Security'].map(item => (
                <li key={item}>
                  <a href="#" className="footer_navLink">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="footer_bottomSection">
          <p className="footer_copyright">
            © {new Date().getFullYear()} TextAI. All rights reserved.
          </p>
          <div className="footer_legalLinks">
            <a href="#" className="footer_legalLink">
              Privacy Policy
            </a>
            <a href="#" className="footer_legalLink">
              Terms of Service
            </a>
            <a href="#" className="footer_legalLink">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;