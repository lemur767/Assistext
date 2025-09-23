import React from 'react';
import { SparklesIcon } from 'lucide-react';
const CTASection = () => {
  return <section className="py-20 px-6 md:px-12 lg:px-24 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80 backdrop-blur-sm"></div>
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557682250-27278ae3485a?q=80&w=2830&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
      <div className="max-w-4xl mx-auto relative">
        <div className="backdrop-blur-xl bg-black/50 border border-cyan-500/20 rounded-3xl p-8 md:p-12 text-center shadow-[0_0_30px_rgba(6,182,212,0.3)]">
          <div className="inline-flex items-center px-3 py-1 rounded-full backdrop-blur-md bg-black/40 border border-cyan-500/30 mb-6 shadow-[0_0_10px_rgba(6,182,212,0.3)]">
            <SparklesIcon size={16} className="text-cyan-400 mr-2" />
            <span className="text-sm">Limited Time Offer</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Get{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 drop-shadow-[0_0_8px_rgba(139,92,246,0.8)]">
              50% Off
            </span>{' '}
            Your First 3 Months
          </h2>
          <p className="text-lg text-slate-200 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who have reclaimed their time with
            TextAI. Start your free trial today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-medium text-lg hover:shadow-lg hover:shadow-purple-500/30 transition-all shadow-[0_0_15px_rgba(139,92,246,0.5)]">
              Start Free Trial
            </button>
            <button className="px-6 py-3 rounded-full backdrop-blur-md bg-black/40 border border-cyan-500/30 font-medium text-lg hover:bg-black/60 transition-all text-white shadow-[0_0_10px_rgba(6,182,212,0.3)]">
              Schedule Demo
            </button>
          </div>
          <p className="mt-6 text-sm text-slate-300">
            No credit card required. 14-day free trial.
          </p>
        </div>
      </div>
    </section>;
};
export default CTASection;