import React, { useState } from 'react';
import { MenuIcon, XIcon } from 'lucide-react';
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return <nav className="w-full py-4 px-6 md:px-12 lg:px-24">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 drop-shadow-[0_0_8px_rgba(139,92,246,0.8)]">
            TextAI
          </span>
        </div>
        <div className="hidden md:flex space-x-8">
          <a href="#features" className="hover:text-cyan-400 transition-colors">
            Features
          </a>
          <a href="#how-it-works" className="hover:text-cyan-400 transition-colors">
            How it Works
          </a>
          <a href="#pricing" className="hover:text-cyan-400 transition-colors">
            Pricing
          </a>
          <a href="#testimonials" className="hover:text-cyan-400 transition-colors">
            Testimonials
          </a>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <button className="px-4 py-2 rounded-full backdrop-blur-md bg-black/40 border border-cyan-500/30 hover:bg-black/60 transition-all shadow-[0_0_10px_rgba(6,182,212,0.2)]">
            Login
          </button>
          <button className="px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all shadow-[0_0_10px_rgba(139,92,246,0.5)]">
            Get Started
          </button>
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <XIcon size={24} className="text-cyan-400" /> : <MenuIcon size={24} className="text-cyan-400" />}
          </button>
        </div>
      </div>
      {isMenuOpen && <div className="md:hidden absolute left-0 right-0 top-16 p-4 backdrop-blur-xl bg-black/80 border-y border-cyan-500/20 z-50">
          <div className="flex flex-col space-y-4 py-4">
            <a href="#features" className="hover:text-cyan-400 transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="hover:text-cyan-400 transition-colors">
              How it Works
            </a>
            <a href="#pricing" className="hover:text-cyan-400 transition-colors">
              Pricing
            </a>
            <a href="#testimonials" className="hover:text-cyan-400 transition-colors">
              Testimonials
            </a>
            <div className="flex flex-col space-y-3 pt-4 border-t border-cyan-500/20">
              <button className="px-4 py-2 rounded-full backdrop-blur-md bg-black/40 border border-cyan-500/30 hover:bg-black/60 transition-all shadow-[0_0_10px_rgba(6,182,212,0.2)]">
                Login
              </button>
              <button className="px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all shadow-[0_0_10px_rgba(139,92,246,0.5)]">
                Get Started
              </button>
            </div>
          </div>
        </div>}
    </nav>;
};
export default Navbar;