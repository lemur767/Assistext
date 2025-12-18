import { AnimatedSection } from './common/AnimatedSection';
import '../styles/Footer.css';
import '../index.css';


const Footer = () => {
  return (
    <footer className="footer">
      <AnimatedSection>
        <div className="footer-container">
          <div className="footer-grid">
            <div className="footer-column">
              <div className="footer-brand">

                <span className="footer-brand-name">Assistext</span>
              </div>
              <p className="footer-description">
                Transform how you manage your telecom operations with AI-powered insights and automation.
              </p>
            </div>

            <div className="footer-column">
              <h4 className="footer-heading">Product</h4>
              <ul className="footer-links">
                <li><a href="#" className="footer-link">Features</a></li>
                <li><a href="#" className="footer-link">Pricing</a></li>
                <li><a href="#" className="footer-link">Security</a></li>
                <li><a href="#" className="footer-link">Roadmap</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4 className="footer-heading">Company</h4>
              <ul className="footer-links">
                <li><a href="#" className="footer-link">About</a></li>
                <li><a href="#" className="footer-link">Contact</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4 className="footer-heading">Legal</h4>
              <ul className="footer-links">
                <li><a href="#" className="footer-link">Privacy</a></li>
                <li><a href="#" className="footer-link">Terms</a></li>
                <li><a href="#" className="footer-link">Cookie Policy</a></li>

              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p className="footer-copyright">&copy; 2025 YourBrand. All rights reserved.</p>
            <div className="flex gap-6">
              {/* Added social links placeholders if needed */}
            </div>
          </div>
        </div>
      </AnimatedSection>
    </footer>
  );
};

export default Footer;