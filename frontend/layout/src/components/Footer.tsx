import React from 'react';
const Footer = () => {
  return <footer className="py-12 px-6 md:px-12 lg:px-24 border-t border-cyan-500/20">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 drop-shadow-[0_0_8px_rgba(139,92,246,0.8)] mb-4">
              TextAI
            </div>
            <p className="text-slate-300 mb-6">
              AI-powered text automation that saves you time while maintaining
              your personal touch.
            </p>
            <div className="flex space-x-4">
              {['twitter', 'facebook', 'instagram', 'linkedin'].map(social => <a key={social} href="#" className="w-10 h-10 rounded-full backdrop-blur-md bg-black/40 border border-cyan-500/30 flex items-center justify-center hover:bg-black/60 transition-all shadow-[0_0_10px_rgba(6,182,212,0.2)]">
                    <span className="sr-only">{social}</span>
                    <svg className="w-5 h-5 text-cyan-400" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" clipRule="evenodd" />
                    </svg>
                  </a>)}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              {['Features', 'Pricing', 'Integrations', 'FAQ', 'Roadmap'].map(item => <li key={item}>
                    <a href="#" className="text-slate-300 hover:text-cyan-400 transition-colors">
                      {item}
                    </a>
                  </li>)}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {['About Us', 'Careers', 'Blog', 'Press', 'Contact'].map(item => <li key={item}>
                    <a href="#" className="text-slate-300 hover:text-cyan-400 transition-colors">
                      {item}
                    </a>
                  </li>)}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'GDPR', 'Security'].map(item => <li key={item}>
                  <a href="#" className="text-slate-300 hover:text-cyan-400 transition-colors">
                    {item}
                  </a>
                </li>)}
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-cyan-500/20 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-300 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} TextAI. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-slate-300 hover:text-cyan-400 transition-colors text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-slate-300 hover:text-cyan-400 transition-colors text-sm">
              Terms of Service
            </a>
            <a href="#" className="text-slate-300 hover:text-cyan-400 transition-colors text-sm">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;