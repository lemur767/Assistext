import React, { useEffect, useRef } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Features: React.FC = () => {
  const featureCardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute('data-visible', 'true');
          }
        });
      },
      { threshold: 0.5 }
    );

    featureCardsRef.current.forEach((card) => {
      if (card) {
        observer.observe(card);
      }
    });

    return () => {
      featureCardsRef.current.forEach((card) => {
        if (card) {
          observer.unobserve(card);
        }
      });
    };
  }, []);

  return (
    <section id="features" className="py-20 md:py-28 px-4 relative">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(50%_50%_at_50%_0%,rgba(79,70,229,0.08),transparent_60%)]"></div>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-semibold tracking-tighter text-4xl md:text-5xl leading-9 md:leading-10 text-[var(--foreground)]">
            Features Designed for Your Success
          </h2>
          <p className="mt-3 text-sm md:text-base text-[var(--muted-foreground)]">
            We can handle the phones so you don't have to.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 md:gap-8 auto-rows-[minmax(120px,auto)]">
          {/* 1. Your Always-On Assistant (large) */}
          <div ref={(el) => { if (el) featureCardsRef.current[0] = el; }} className="relative col-span-1 md:col-span-4 row-span-2 rounded-2xl border border-white/10 backdrop-blur-2xl p-8 transition-all duration-150 bg-[var(--glass-bg)] overflow-hidden hover:border-[var(--primary)] opacity-0 data-[visible=true]:animate-fly-in-left shadow-sm">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent opacity-40"></div>
            <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8 h-full">
              <div className="flex flex-col items-center md:items-start text-center md:text-left flex-1">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl border border-white/10 bg-white/5 mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--primary)]" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="7" height="7" rx="1.5"></rect>
                    <rect x="14" y="14" width="7" height="7" rx="1.5"></rect>
                    <path d="M10 6h4a3 3 0 0 1 3 3v2"></path>
                    <path d="M14 18H9a3 3 0 0 1-3-3v-2"></path>
                  </svg>
                </div>
                <h3 className="font-semibold text-2xl leading-none text-[var(--foreground)] tracking-tight mb-4">1. Your Always-On Assistant</h3>
                <p className="text-base text-[var(--muted-foreground)] mb-6">
                  Never miss a serious inquiry again. Assistext works around the clock to instantly engage with every message, filtering out
                  the noise and ensuring your best clients get the attention they deserve. Reclaim your time and your peace of mind.
                </p>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  <span className="text-xs px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-[var(--foreground)]">Schedules</span>
                  <span className="text-xs px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-[var(--foreground)]">Webhooks</span>
                  <span className="text-xs px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-[var(--foreground)]">Retries</span>
                </div>
              </div>
              <div className="hidden md:block w-full md:w-1/2 h-full">
                <div className="rounded-xl border border-white/10 bg-gradient-to-b from-white/5 to-[var(--glass-bg)] p-4 h-full">
                  <div className="text-xs text-[var(--muted-foreground)] font-mono mb-3">workflow.yaml</div>
                  <div className="rounded-lg border border-white/10 bg-black/80 p-4">
                    <pre className="text-xs leading-6 text-gray-200 font-mono whitespace-pre-wrap">on: schedule
                      steps:
                      - fetch: GET /api/users
                      - map: transform(user)
                      - notify: post(#ops)</pre>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -right-16 -bottom-16 h-64 w-64 rounded-full blur-3xl bg-[var(--primary)]/15 pointer-events-none"></div>
          </div>

          {/* 2. Authentically You, Automatically (tall) */}
          <div ref={(el) => { if (el) featureCardsRef.current[1] = el; }} className="relative col-span-1 md:col-span-2 row-span-2 rounded-2xl border border-white/10 backdrop-blur-2xl p-8 transition-all duration-150 bg-[var(--glass-bg)] overflow-hidden hover:border-[var(--primary)] opacity-0 data-[visible=true]:animate-fly-in-right shadow-sm flex flex-col items-center text-center">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--secondary)] to-transparent opacity-50"></div>
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl border border-white/10 bg-white/5 mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--secondary)]" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <h3 className="font-semibold text-xl leading-none text-[var(--foreground)] tracking-tight mb-4">2. Authentically You, Automatically</h3>
            <p className="text-base text-[var(--muted-foreground)] mb-8">
              Your clients want to connect with you, not a robot. Assistext learns your unique communication style—from phrasing to
              emojis—to create responses so authentic, no one will know it’s not you. Maintain your personal brand, effortlessly.
            </p>
            <div className="flex justify-center -space-x-3">
              <div className="h-10 w-10 rounded-full border-2 border-[var(--card)] bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] opacity-80"></div>
              <div className="h-10 w-10 rounded-full border-2 border-[var(--card)] bg-gradient-to-br from-[var(--secondary)] to-[var(--accent)] opacity-80"></div>
              <div className="h-10 w-10 rounded-full border-2 border-[var(--card)] bg-gradient-to-br from-[var(--accent)] to-[var(--primary)] opacity-80"></div>
              <div className="h-10 w-10 rounded-full border-2 border-[var(--card)] bg-white/5 flex items-center justify-center text-xs font-bold text-[var(--foreground)]">+5</div>
            </div>
          </div>

          {/* 5. Automate Your Workflow */}
          <div ref={(el) => { if (el) featureCardsRef.current[2] = el; }} className="relative col-span-1 md:col-span-2 row-span-1 rounded-2xl border border-white/10 backdrop-blur-2xl p-8 transition-all duration-150 bg-[var(--glass-bg)] overflow-hidden hover:border-[var(--primary)] opacity-0 data-[visible=true]:animate-fly-in-left shadow-sm flex flex-col items-center text-center">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent opacity-40"></div>
            <div className="w-full flex items-center justify-between mb-6">
              <div className="inline-flex items-center justify-center h-10 w-10 rounded-xl border border-white/10 bg-white/5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--accent)]" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4.5 16.5S5 14 7 12s6-3 6-3 1-4 5-5c0 0 1 4-1 7s-5 5-5 5-1 4-4 5c0 0-1-3 1-6s6-6 6-6"></path>
                </svg>
              </div>
              <span className="text-xs px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[var(--foreground)] font-mono">P95 &lt; 120ms</span>
            </div>
            <h3 className="self-start font-semibold text-lg text-[var(--foreground)] tracking-tight mb-4">5. Automate Your Workflow</h3>
            <div className="w-full space-y-3">
              <div className="h-3 rounded-full bg-white/5 overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--primary)] w-[80%]"></div>
              </div>
              <div className="h-3 rounded-full bg-white/5 overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-[var(--secondary)] to-[var(--accent)] w-[60%]"></div>
              </div>
            </div>
          </div>

          {/* 3. Protect Your Privacy */}
          <div ref={(el) => { if (el) featureCardsRef.current[3] = el; }} className="relative col-span-1 md:col-span-2 row-span-1 rounded-2xl border border-white/10 backdrop-blur-2xl p-8 transition-all duration-150 bg-[var(--glass-bg)] overflow-hidden hover:border-[var(--primary)] opacity-0 data-[visible=true]:animate-fly-in-right shadow-sm flex flex-col items-center text-center">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--secondary)] to-transparent opacity-50"></div>
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl border border-white/10 bg-white/5 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--primary)]" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
            <h3 className="font-semibold text-lg text-[var(--foreground)] tracking-tight mb-2">3. Protect Your Privacy</h3>
            <p className="text-sm text-[var(--muted-foreground)]">Your safety and privacy are non-negotiable.</p>
          </div>

          {/* Integrations */}
          <div ref={(el) => { if (el) featureCardsRef.current[4] = el; }} className="relative col-span-1 md:col-span-2 row-span-2 rounded-2xl border border-white/10 backdrop-blur-2xl p-8 transition-all duration-150 bg-[var(--glass-bg)] overflow-hidden hover:border-[var(--primary)] opacity-0 data-[visible=true]:animate-fly-in-left shadow-sm flex flex-col items-center text-center">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent opacity-40"></div>
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl border border-white/10 bg-white/5 mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--accent)]" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22v-5"></path>
                <path d="M9 8V2"></path>
                <path d="M15 8V2"></path>
                <rect x="7" y="8" width="10" height="8" rx="2"></rect>
              </svg>
            </div>
            <h3 className="font-semibold text-xl text-[var(--foreground)] tracking-tight mb-4">Integrations</h3>
            <p className="text-base text-[var(--muted-foreground)] mb-8">Connect your favorite tools with native adapters and webhooks.</p>
            <div className="grid grid-cols-4 gap-4 w-full">
              <div className="h-12 rounded-xl border border-white/10 bg-[url('assets/signalwire.png')] bg-cover opacity-80 hover:opacity-100 transition-opacity"></div>
              {[...Array(7)].map((_, i) => (
                <div key={i} className="h-12 rounded-xl border border-white/10 bg-white/5 opacity-50"></div>
              ))}
            </div>
          </div>

          {/* 4. You're Always in Control (wide) */}
          <div ref={(el) => { if (el) featureCardsRef.current[5] = el; }} className="relative col-span-1 md:col-span-3 row-span-2 rounded-2xl border border-white/10 backdrop-blur-2xl p-8 transition-all duration-150 bg-[var(--glass-bg)] overflow-hidden hover:border-[var(--primary)] opacity-0 data-[visible=true]:animate-fly-in-right shadow-sm">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--secondary)] to-transparent opacity-50"></div>
            <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8 h-full">
              <div className="flex flex-col items-center md:items-start text-center md:text-left flex-1">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl border border-white/10 bg-white/5 mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--secondary)]" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z"></path>
                    <path d="M19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16z"></path>
                    <path d="M5 16l.8 2.2L8 19l-2.2.8L5 22l-.8-2.2L2 19l2.2-.8L5 16z"></path>
                  </svg>
                </div>
                <h3 className="font-semibold text-2xl leading-none text-[var(--foreground)] tracking-tight mb-4">4. You’re Always in Control</h3>
                <p className="text-base text-[var(--muted-foreground)] mb-6">Automation doesn’t mean giving up control. Our clean, intuitive dashboard gives you a bird’s-eye view of all conversations.</p>
                <span className="text-xs px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-[var(--foreground)] font-bold">Beta</span>
              </div>
              <div className="w-full md:w-2/3 h-full">
                <div className="rounded-xl border border-white/10 bg-gradient-to-b from-white/5 to-[var(--glass-bg)] p-4 h-full">
                  <div className="text-xs text-[var(--muted-foreground)] font-mono mb-3">assistant.ts</div>
                  <div className="rounded-lg border border-white/10 bg-black/80 p-4">
                    <pre className="text-xs leading-6 text-gray-200 font-mono whitespace-pre-wrap">suggest("convert card to grid");
                      apply("optimize re-render");
                      doc("explain automation step");</pre>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -left-20 -bottom-16 h-64 w-64 rounded-full blur-3xl bg-[var(--accent)]/15 pointer-events-none"></div>
          </div>

          {/* 6. Find Your Focus, Risk-Free */}
          <div ref={(el) => { if (el) featureCardsRef.current[6] = el; }} className="relative col-span-1 md:col-span-3 row-span-1 rounded-2xl border border-white/10 backdrop-blur-2xl p-8 transition-all duration-150 bg-[var(--glass-bg)] overflow-hidden hover:border-[var(--primary)] opacity-0 data-[visible=true]:animate-fly-in-left shadow-sm flex flex-col items-center text-center">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent opacity-40"></div>
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl border border-white/10 bg-white/5 mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--accent)]" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
              </svg>
            </div>
            <h3 className="font-semibold text-xl text-[var(--foreground)] tracking-tight mb-4">6. Find Your Focus, Risk-Free</h3>
            <p className="text-base text-[var(--muted-foreground)] mb-6">Experience the peace of mind that comes from an organized inbox. Try every feature of Assistext free for 14 days. No commitment, no hassle.</p>
            <div className="grid grid-cols-3 gap-4 w-full max-w-sm">
              <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-center">
                <div className="text-[10px] text-[var(--muted-foreground)] uppercase tracking-wider">Regions</div>
                <div className="mt-1 text-sm font-bold text-[var(--foreground)]">16</div>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-center">
                <div className="text-[10px] text-[var(--muted-foreground)] uppercase tracking-wider">Uptime</div>
                <div className="mt-1 text-sm font-bold text-[var(--foreground)]">99.99%</div>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-center">
                <div className="text-[10px] text-[var(--muted-foreground)] uppercase tracking-wider">SLA</div>
                <div className="mt-1 text-sm font-bold text-[var(--foreground)]">Enterprise</div>
              </div>
            </div>
          </div>
        </div>
    </section>
  );
};

export default Features;