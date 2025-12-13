import { AnimatedSection } from './common/AnimatedSection';
import '../index.css';


const Footer = () => {
  return (
    <footer className="py-12 px-6 md:px-12 lg:px-24 border-t border-cyan-500/20">
      <AnimatedSection>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <img src="/assets/footermark.png" width={180} height={180} alt="Assistext Logo " />
                </div>
                <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 drop-shadow-[0_0_8px_rgba(139,92,246,0.8)] mb-4">Assistext</span>
              </div>
              <p className="text-slate-300 mb-6">
                Transform how you manage your telecom operations with AI-powered insights and automation.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Product</h4>
              <ul className="list-none p-0 m-0 flex flex-col gap-2">
                <li><a href="#" className="text-slate-300 transition-colors duration-200 hover:text-cyan-400 no-underline">Features</a></li>
                <li><a href="#" className="text-slate-300 transition-colors duration-200 hover:text-cyan-400 no-underline">Pricing</a></li>
                <li><a href="#" className="text-slate-300 transition-colors duration-200 hover:text-cyan-400 no-underline">Security</a></li>
                <li><a href="#" className="text-slate-300 transition-colors duration-200 hover:text-cyan-400 no-underline">Roadmap</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="list-none p-0 m-0 flex flex-col gap-2">
                <li><a href="#" className="text-slate-300 transition-colors duration-200 hover:text-cyan-400 no-underline">About</a></li>
                <li><a href="#" className="text-slate-300 transition-colors duration-200 hover:text-cyan-400 no-underline">Blog</a></li>
                <li><a href="#" className="text-slate-300 transition-colors duration-200 hover:text-cyan-400 no-underline">Careers</a></li>
                <li><a href="#" className="text-slate-300 transition-colors duration-200 hover:text-cyan-400 no-underline">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="list-none p-0 m-0 flex flex-col gap-2">
                <li><a href="#" className="text-slate-300 transition-colors duration-200 hover:text-cyan-400 no-underline">Privacy</a></li>
                <li><a href="#" className="text-slate-300 transition-colors duration-200 hover:text-cyan-400 no-underline">Terms</a></li>
                <li><a href="#" className="text-slate-300 transition-colors duration-200 hover:text-cyan-400 no-underline">Cookie Policy</a></li>
                <li><a href="#" className="text-slate-300 transition-colors duration-200 hover:text-cyan-400 no-underline">Licenses</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-cyan-500/20 flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-300 text-sm mb-4 md:mb-0">&copy; 2025 YourBrand. All rights reserved.</p>
            <div className="flex gap-6">
              {/* Added social links placeholders if needed based on CSS, but sticking to original content structure for now, just applying classes */}
            </div>
          </div>
        </div>
      </AnimatedSection>
    </footer>
  );
};

export default Footer;