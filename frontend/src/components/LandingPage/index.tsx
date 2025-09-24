import React from 'react';
import Navbar from '../Navbar';
import CTASection from './CTASection';
import HeroSection from './HeroSection';
import FeaturesSection from './FeaturesSection';
import Footer from '../Footer';

const LandingPage = () => { 
    return (
        <div>
            <Navbar/>
            <main>
                <HeroSection/>
                <CTASection/>
                <FeaturesSection/>


            </main>
            <Footer/>
            
        </div>
    )
}
export default LandingPage;

