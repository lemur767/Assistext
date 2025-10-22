import React from 'react';
import LandingHeader from './LandingHeader';
import Hero from './Hero';
import Features from './Features';
import Pricing from './Pricing';
import Footer from '../Footer'
  
const LandingPage: React.FC = () => {
  return (
    <div className="font-sans antialiased selection:bg-fuchsia-500/30 selection:text-white text-white relative min-h-screen w-full bg-gradient-to-b from-black via-blue-950 to-black overflow-hidden flex flex-col items-center justify-center">
      <div className="absolute inset-0 opacity-5 bg-cover bg-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1557682250-27278ae3485a?q=80&w=2830&auto=format&fit=crop')"}}></div>
      <div className="z-10 w-full">
        <LandingHeader />
        <Hero />
        <Features />
        <Pricing />
        <Footer/>
      </div>
    </div>
  );
};

export default LandingPage;
