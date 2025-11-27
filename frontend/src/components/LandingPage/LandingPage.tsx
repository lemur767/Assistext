import React from 'react';
import LandingHeader from './LandingHeader';
import Hero from './Hero';
import Features from './Features';
import Pricing from './Pricing';
import Footer from '../Footer'
import About from './About';
import ContactUs from './ContactUs';

const LandingPage: React.FC = () => {
  return (
    <div style={{
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      position: 'relative',
      minHeight: '100vh',
      width: '100%',
      backgroundColor: 'var(--background)',
      color: 'var(--foreground)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {/* Background gradient overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        background: 'radial-gradient(circle at 50% 0%, rgba(232, 100, 124, 0.08), transparent 60%)'
      }} />

      <div style={{ position: 'relative', zIndex: 10, width: '100%' }}>
        <LandingHeader />
        <Hero />
        <Features />
        <Pricing />
        <About />
        <ContactUs />
        <Footer />
      </div>
    </div>
  );
};

export default LandingPage;
