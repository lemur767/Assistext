import React from 'react';
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
  return <section id="how-it-works" className="py-20 px-6 md:px-12 lg:px-24 relative">
      <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"></div>
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            How It{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 drop-shadow-[0_0_8px_rgba(139,92,246,0.8)]">
              Works
            </span>
          </h2>
          <p className="text-lg text-slate-200 max-w-2xl mx-auto">
            Getting started is simple. Follow these steps to automate your
            messaging with AI.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => <div key={index} className="relative">
              <div className="backdrop-blur-lg bg-black/40 border border-white/10 rounded-2xl p-6 h-full shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 drop-shadow-[0_0_8px_rgba(139,92,246,0.8)] mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-slate-300">{step.description}</p>
              </div>
              {index < steps.length - 1 && <div className="hidden lg:block absolute top-1/2 -right-4 transform translate-x-1/2 z-10">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 flex items-center justify-center shadow-[0_0_10px_rgba(139,92,246,0.5)]">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>}
            </div>)}
        </div>
        <div className="mt-16 text-center">
          <button className="px-6 py-3 rounded-full backdrop-blur-md bg-black/40 border border-cyan-500/30 font-medium hover:bg-black/60 transition-all shadow-[0_0_10px_rgba(6,182,212,0.3)]">
            Watch Setup Tutorial
          </button>
        </div>
      </div>
    </section>;
};
export default HowItWorksSection;