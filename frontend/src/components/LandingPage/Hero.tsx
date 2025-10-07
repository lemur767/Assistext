import React from 'react';
import './Hero.css';

const Hero: React.FC = () => {
  return (
    <div className="hero">
      <div className="hero__grid"></div>
      
      <div className="hero__particles">
        <div className="hero__particle"></div>
        <div className="hero__particle"></div>
        <div className="hero__particle"></div>
        <div className="hero__particle"></div>
        <div className="hero__particle"></div>
        <div className="hero__particle"></div>
        <div className="hero__particle"></div>
        <div className="hero__particle"></div>
        <div className="hero__particle"></div>
      </div>

      <div className="hero__content-wrapper">
        <div className="hero__content">
          <h1 className="hero__title">
            Build Amazing
            <br />
            Experiences
          </h1>

          <p className="hero__subtitle">
            Create stunning web applications with our cutting-edge platform.
            Powerful tools, seamless integrations, and magical user experiences await.
          </p>

          <div className="hero__cta-container">
            <button className="hero__cta-button">
              <span className="hero__backdrop"></span>
              <span className="hero__spark"></span>
              <svg className="hero__sparkle" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M12 3l1.2 3.6A4 4 0 0 0 17.4 11l3.6 1-3.6 1a4 4 0 0 0-4.2 4.4L12 21l-1.2-3.6A4 4 0 0 0 6.6 13l-3.6-1 3.6-1a4 4 0 0 0 4.2-4.4L12 3z" stroke="currentColor" strokeWidth="1.5" fill="currentColor"></path>
                <path d="M7.5 4.5l.6 1.8a2 2 0 0 0 1.5 1.3l1.8.4-1.8.4a2 2 0 0 0-1.5 1.3l-.6 1.8-.6-1.8A2 2 0 0 0 5.4 8l-1.8-.4L5.4 7a2 2 0 0 0 1.5-1.3l.6-1.2z" stroke="currentColor" strokeWidth="1.5" fill="currentColor"></path>
                <path d="M17.5 5.5l.6 1.6a2 2 0 0 0 1.2 1.2l1.6.6-1.6.6a2 2 0 0 0-1.2 1.2l-.6 1.6-.6-1.6A2 2 0 0 0 15.7 9l-1.6-.6 1.6-.6a2 2 0 0 0 1.2-1.2l.6-1.1z" stroke="currentColor" strokeWidth="1.5" fill="currentColor"></path>
              </svg>
              <span className="hero__button-text">Start building</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;