import React from 'react';
import { CheckIcon } from 'lucide-react';
const PricingSection = () => {
  const plans = [{
    name: 'Basic',
    price: '19',
    description: 'Perfect for individuals',
    features: ['1 connected messaging platform', '100 AI responses per month', 'Basic customization options', '24 hour response time', 'Email support'],
    popular: false,
    buttonText: 'Get Started'
  }, {
    name: 'Pro',
    price: '49',
    description: 'Ideal for professionals',
    features: ['3 connected messaging platforms', '500 AI responses per month', 'Advanced customization options', 'Calendar integration', 'Priority support', 'Analytics dashboard'],
    popular: true,
    buttonText: 'Start Free Trial'
  }, {
    name: 'Business',
    price: '99',
    description: 'For teams and businesses',
    features: ['Unlimited messaging platforms', '2000 AI responses per month', 'Complete customization options', 'Full calendar & CRM integration', '24/7 priority support', 'Advanced analytics', 'Team management'],
    popular: false,
    buttonText: 'Contact Sales'
  }];
  return <section id="pricing" className="py-20 px-6 md:px-12 lg:px-24 relative">
      <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-purple-500 rounded-full filter blur-[120px] opacity-20"></div>
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Simple{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 drop-shadow-[0_0_8px_rgba(139,92,246,0.8)]">
              Pricing
            </span>
          </h2>
          <p className="text-lg text-slate-200 max-w-2xl mx-auto">
            Choose the plan that fits your needs. All plans include a 14-day
            free trial.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => <div key={index} className={`relative backdrop-blur-lg bg-black/40 border rounded-2xl p-8 shadow-[0_0_15px_rgba(0,0,0,0.5)] ${plan.popular ? 'border-cyan-500/50 shadow-lg shadow-cyan-500/10' : 'border-white/10 hover:border-white/30'} transition-all`}>
              {plan.popular && <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="px-4 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-sm font-medium shadow-[0_0_10px_rgba(139,92,246,0.5)]">
                    Most Popular
                  </div>
                </div>}
              <div className="text-center mb-8">
                <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                <div className="flex items-center justify-center">
                  <span className="text-xl">$</span>
                  <span className="text-5xl font-bold mx-1">{plan.price}</span>
                  <span className="text-slate-300">/mo</span>
                </div>
                <p className="text-slate-300 mt-2">{plan.description}</p>
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => <li key={i} className="flex items-start">
                    <CheckIcon size={20} className="text-cyan-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-200">{feature}</span>
                  </li>)}
              </ul>
              <button className={`w-full py-3 rounded-full font-medium transition-all ${plan.popular ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:shadow-lg hover:shadow-purple-500/20 shadow-[0_0_10px_rgba(139,92,246,0.5)]' : 'backdrop-blur-md bg-black/40 border border-cyan-500/30 hover:bg-black/60 text-white shadow-[0_0_10px_rgba(6,182,212,0.3)]'}`}>
                {plan.buttonText}
              </button>
            </div>)}
        </div>
        <div className="mt-12 text-center">
          <p className="text-slate-300">
            Need a custom plan?{' '}
            <a href="#" className="text-cyan-400 hover:underline">
              Contact our sales team
            </a>
          </p>
        </div>
      </div>
    </section>;
};
export default PricingSection;