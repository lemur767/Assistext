import React from 'react';
import '../../styles/HowItWorksSection.css';

const HowItWorksSection = () => {
  const steps = [{
    number: '01',
    title: 'Connect Your Accounts',
    description: 'Link your messaging platforms in minutes with our secure authentication process.'
  }, {
    number: '02',
    title: 'Train Your AI Assistant',
    description: 'Upload previous conversations or start from scratch with our pre-built personality templates.'
  }, {
    number: '03',
    title: 'Set Your Preferences',
    description: 'Define when and how your AI should respond, including tone, length, and response triggers.'
  }, {
    number: '04',
    title: 'Let AI Handle Your Texts',
    description: 'Relax while our AI responds to messages, learning and improving with each interaction.'
  }];
  return (
    <section id="how-it-works" className="section">
      <div className="divider"></div>
      <div className="container">
        <div className="header">
          <h2 className="title">
            How It{' '}
            <span className="titleHighlight">
              Works
            </span>
          </h2>
          <p className="description">
            Getting started is simple. Follow these steps to automate your
            messaging with AI.
          </p>
        </div>
        <div className="grid">
          {steps.map((step, index) => (
            <div key={index} className="stepCard">
              <div className="stepCardInner">
                <div className="stepNumber">
                  {step.number}
                </div>
                <h3 className="stepTitle">{step.title}</h3>
                <p className="stepDescription">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="arrowIndicator">
                  <div className="arrowCircle">
                    <svg className="arrowIcon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="buttonContainer">
          <button className="button">
            Watch Setup Tutorial
          </button>
        </div>
      </div>
    </section>
  );
};
export default HowItWorksSection;