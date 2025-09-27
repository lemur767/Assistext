import React from 'react';
import Navbar from '../Navbar';

import HeroSection from './HeroSection';
import FeaturesSection from './FeaturesSection';
import Footer from '../Footer';
import PricingSection from './PricingSection';

const LandingPage = () => { 
    return (
        <div className="landing-page">
            <Navbar/>
            <main>
                <HeroSection/>
                <PricingSection/>
                <FeaturesSection/>


            </main>
            <Footer/>
            
        </div>
    )
}
export default LandingPage;

