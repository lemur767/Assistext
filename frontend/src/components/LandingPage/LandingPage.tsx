import React from 'react';
import LandingHeader from './LandingHeader';
import Hero from './Hero';
import Features from './Features';
import Pricing from './Pricing';
import Footer from '../Footer'
  
const LandingPage: React.FC = () => {
  return (
    <div className="font-sans antialiased selection:bg-fuchsia-500/30 selection:text-white text-white">
      <LandingHeader />
      <Hero />
      <Features />
      <Pricing />
      <Footer/>
    </div>
  );
};

export default LandingPage;
