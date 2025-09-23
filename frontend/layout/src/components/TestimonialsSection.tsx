import React from 'react';
const TestimonialsSection = () => {
  const testimonials = [{
    quote: "TextAI has completely transformed how I manage client communications. The AI responses are so natural that clients can't tell the difference.",
    author: 'Sarah Johnson',
    position: 'Marketing Consultant',
    avatar: 'https://randomuser.me/api/portraits/women/32.jpg'
  }, {
    quote: "As a doctor, I'm constantly bombarded with messages. TextAI helps me prioritize urgent communications while ensuring nothing falls through the cracks.",
    author: 'Dr. Michael Chen',
    position: 'Physician',
    avatar: 'https://randomuser.me/api/portraits/men/52.jpg'
  }, {
    quote: 'The calendar integration is a game-changer. TextAI automatically schedules meetings and sends reminders, saving me hours each week.',
    author: 'Alex Rodriguez',
    position: 'Sales Director',
    avatar: 'https://randomuser.me/api/portraits/men/36.jpg'
  }, {
    quote: 'I was skeptical at first, but the personalization is incredible. It captures my tone perfectly and has made my work-life balance so much better.',
    author: 'Emma Thompson',
    position: 'Startup Founder',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
  }];
  return <section id="testimonials" className="py-20 px-6 md:px-12 lg:px-24 relative">
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-cyan-500 rounded-full filter blur-[120px] opacity-20"></div>
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            What Our{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 drop-shadow-[0_0_8px_rgba(139,92,246,0.8)]">
              Users Say
            </span>
          </h2>
          <p className="text-lg text-slate-200 max-w-2xl mx-auto">
            Thousands of professionals trust TextAI to handle their messaging
            needs.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => <div key={index} className="backdrop-blur-lg bg-black/40 border border-white/10 rounded-2xl p-6 hover:border-cyan-500/30 transition-all shadow-[0_0_15px_rgba(0,0,0,0.5)]">
              <div className="flex items-center mb-4">
                {[1, 2, 3, 4, 5].map(star => <svg key={star} className="w-5 h-5 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>)}
              </div>
              <blockquote className="text-lg mb-6 text-slate-200">
                "{testimonial.quote}"
              </blockquote>
              <div className="flex items-center">
                <img src={testimonial.avatar} alt={testimonial.author} className="w-12 h-12 rounded-full border-2 border-cyan-500/30" />
                <div className="ml-4">
                  <div className="font-medium">{testimonial.author}</div>
                  <div className="text-slate-300 text-sm">
                    {testimonial.position}
                  </div>
                </div>
              </div>
            </div>)}
        </div>
        <div className="mt-16 backdrop-blur-lg bg-black/40 border border-white/10 rounded-2xl p-8 text-center shadow-[0_0_15px_rgba(0,0,0,0.5)]">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {['Forbes', 'TechCrunch', 'Wired', 'Business Insider', 'Product Hunt'].map((brand, index) => <div key={index} className="text-xl md:text-2xl font-bold text-white/40">
                {brand}
              </div>)}
          </div>
        </div>
      </div>
    </section>;
};
export default TestimonialsSection;