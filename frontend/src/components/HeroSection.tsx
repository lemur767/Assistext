import React from 'react';
import { MessageSquareTextIcon, SparklesIcon } from 'lucide-react';
const HeroSection = () => {
  return <section className="py-16 md:py-28 px-6 md:px-12 lg:px-24 relative">
      {/* Neon grid background effect */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80')] bg-cover opacity-20"></div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-black/40 border border-cyan-500/50 mb-6 shadow-[0_0_15px_rgba(6,182,212,0.5)]">
              <SparklesIcon size={16} className="text-cyan-400 mr-2" />
              <span className="text-sm text-cyan-100">
                AI-Powered Text Automation
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Never Miss a{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 drop-shadow-[0_0_8px_rgba(139,92,246,0.8)]">
                Message
              </span>{' '}
              Again
            </h1>
            <p className="text-lg md:text-xl text-slate-200 mb-8 max-w-lg">
              Our AI automatically responds to your incoming texts with
              personalized, context-aware replies while you focus on what
              matters.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-medium text-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all shadow-[0_0_15px_rgba(139,92,246,0.5)]">
                Start Free Trial
              </button>
              <button className="px-6 py-3 rounded-full bg-black/40 border border-cyan-500/50 font-medium text-lg hover:bg-black/60 transition-all flex items-center justify-center text-white shadow-[0_0_10px_rgba(6,182,212,0.3)]">
                <MessageSquareTextIcon size={20} className="mr-2 text-cyan-400" />
                See Demo
              </button>
            </div>
            <div className="mt-8 flex items-center">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map(i => <img key={i} src={`https://randomuser.me/api/portraits/men/${i + 20}.jpg`} alt="User" className="w-8 h-8 rounded-full border-2 border-cyan-900" />)}
              </div>
              <div className="ml-4">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map(star => <svg key={star} className="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>)}
                </div>
                <p className="text-sm text-cyan-100">Trusted by 5000+ users</p>
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2 flex justify-center">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-3xl blur-xl opacity-70"></div>
              <div className="relative backdrop-blur-lg bg-black/60 border border-white/10 rounded-3xl p-6 shadow-xl">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-[0_0_10px_rgba(139,92,246,0.5)]">
                      J
                    </div>
                    <div className="ml-3">
                      <p className="font-medium">John Smith</p>
                      <p className="text-xs text-cyan-200">Online</p>
                    </div>
                  </div>
                  <div className="text-cyan-400 text-sm">AI Responding</div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-start">
                    <div className="bg-slate-800/80 backdrop-blur-md rounded-2xl rounded-tl-none px-4 py-2 max-w-xs border border-slate-700">
                      <p className="text-sm">
                        Hey, are you available for that meeting today?
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="bg-gradient-to-r from-cyan-500/10 to-purple-600/10 backdrop-blur-md border border-purple-500/30 rounded-2xl rounded-tr-none px-4 py-2 max-w-xs shadow-[0_0_15px_rgba(139,92,246,0.2)]">
                      <p className="text-sm">
                        I'm in a client meeting until 3pm. I can join after that
                        or we can reschedule for tomorrow morning.
                      </p>
                      <div className="mt-1 flex items-center justify-end">
                        <SparklesIcon size={12} className="text-cyan-400 mr-1" />
                        <p className="text-xs text-cyan-400">AI Reply</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="bg-slate-800/80 backdrop-blur-md rounded-2xl rounded-tl-none px-4 py-2 max-w-xs border border-slate-700">
                      <p className="text-sm">
                        Perfect, let's do 3:30pm then. I'll send a calendar
                        invite.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="flex-1 h-px bg-slate-700"></div>
                    <span className="px-2 text-xs text-cyan-300">
                      AI is typing...
                    </span>
                    <div className="flex-1 h-px bg-slate-700"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default HeroSection;