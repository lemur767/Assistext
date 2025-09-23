import React from 'react';
import { BrainIcon, MessageSquareTextIcon, ClockIcon, SparklesIcon, ZapIcon, ShieldIcon } from 'lucide-react';
const FeaturesSection = () => {
  const features = [{
    icon: <BrainIcon size={24} className="text-cyan-400" />,
    title: 'Smart Context Awareness',
    description: 'Our AI learns from your communication style and history to provide context-appropriate responses.'
  }, {
    icon: <MessageSquareTextIcon size={24} className="text-cyan-400" />,
    title: 'Multi-Platform Support',
    description: 'Works across SMS, WhatsApp, Telegram, and other popular messaging platforms.'
  }, {
    icon: <ClockIcon size={24} className="text-cyan-400" />,
    title: 'Schedule Management',
    description: 'Automatically suggests meeting times based on your calendar availability.'
  }, {
    icon: <SparklesIcon size={24} className="text-purple-400" />,
    title: 'Tone Customization',
    description: 'Adjust response style from professional to casual based on your preferences.'
  }, {
    icon: <ZapIcon size={24} className="text-purple-400" />,
    title: 'Quick Setup',
    description: 'Get started in minutes with our easy onboarding process and templates.'
  }, {
    icon: <ShieldIcon size={24} className="text-purple-400" />,
    title: 'Privacy Focused',
    description: 'End-to-end encryption and strict data policies keep your conversations secure.'
  }];
  return <section id="features" className="py-20 px-6 md:px-12 lg:px-24 relative">
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-cyan-500 rounded-full filter blur-[120px] opacity-20"></div>
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-purple-500 rounded-full filter blur-[120px] opacity-20"></div>
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Powerful{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 drop-shadow-[0_0_8px_rgba(139,92,246,0.8)]">
              Features
            </span>
          </h2>
          <p className="text-lg text-slate-200 max-w-2xl mx-auto">
            Our AI-powered platform offers everything you need to automate your
            messaging without losing the personal touch.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => <div key={index} className="backdrop-blur-lg bg-black/40 border border-white/10 rounded-2xl p-6 hover:border-cyan-500/30 transition-all group shadow-[0_0_15px_rgba(0,0,0,0.5)]">
              <div className="w-12 h-12 rounded-xl backdrop-blur-md bg-black/50 border border-white/10 flex items-center justify-center mb-5 group-hover:bg-gradient-to-r group-hover:from-cyan-500/20 group-hover:to-purple-500/20 transition-all shadow-[0_0_10px_rgba(6,182,212,0.3)]">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-slate-300">{feature.description}</p>
            </div>)}
        </div>
      </div>
    </section>;
};
export default FeaturesSection;