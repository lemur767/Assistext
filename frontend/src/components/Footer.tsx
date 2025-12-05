import { AnimatedSection } from './common/AnimatedSection';
import '../index.css';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer_footer">
      <AnimatedSection>
        <div className="footer_container">
          <div className="footer_grid">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <img src="/assets/footermark.png" width={180} height={180} alt="Assistext Logo " />
                </div>
                <span className="footer_logo">Assistext</span>
              </div>
              <p className="footer_description">
                Transform how you manage your telecom operations with AI-powered insights and automation.
              </p>
            </div>

            <div>
              <h4 className="footer_columnTitle">Product</h4>
              <ul className="footer_navList">
                <li><a href="#" className="footer_navLink">Features</a></li>
                <li><a href="#" className="footer_navLink">Pricing</a></li>
                <li><a href="#" className="footer_navLink">Security</a></li>
                <li><a href="#" className="footer_navLink">Roadmap</a></li>
              </ul>
            </div>

            <div>
              <h4 className="footer_columnTitle">Company</h4>
              <ul className="footer_navList">
                <li><a href="#" className="footer_navLink">About</a></li>
                <li><a href="#" className="footer_navLink">Blog</a></li>
                <li><a href="#" className="footer_navLink">Careers</a></li>
                <li><a href="#" className="footer_navLink">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="footer_columnTitle">Legal</h4>
              <ul className="footer_navList">
                <li><a href="#" className="footer_navLink">Privacy</a></li>
                <li><a href="#" className="footer_navLink">Terms</a></li>
                <li><a href="#" className="footer_navLink">Cookie Policy</a></li>
                <li><a href="#" className="footer_navLink">Licenses</a></li>
              </ul>
            </div>
          </div>

          <div className="footer_bottomSection">
            <p className="footer_copyright">&copy; 2025 YourBrand. All rights reserved.</p>
            <div className="footer_legalLinks">
              {/* Added social links placeholders if needed based on CSS, but sticking to original content structure for now, just applying classes */}
            </div>
          </div>
        </div>
      </AnimatedSection>
    </footer>
  );
};

export default Footer;