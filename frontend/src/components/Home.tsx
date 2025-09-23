/* eslint-disable prettier/prettier */

import logo from '../assets/logonotext.png';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Brain, Zap, CheckCircle, Star } from 'lucide-react';
import { GlassGradCard } from '../components/GlassGradientCard';

const data = [
            {
                
                icon: <Brain className="w-8 h-8 text-accent" />,
                title: 'AI-Powered Intelligence',
                glow: 'accent' as const,
                blur: 'light' as const,
                size: 'sm' as const,
                animation:'glow' as const,
                description: 'Advanced AI learns your communication style and responds naturally to customers.',
                
              },
              {
                
                icon: <Shield className="w-8 h-8 text-secondary" />,
                title: 'Privacy & Security',
                description: 'Canadian-hosted with enterprise-grade encryption. PIPEDA compliant by design.',
                blur:'light' as const,
                size:'sm' as const,
                animation:'glow' as const,
                glow:'brand' as const


              },
              {
                icon: <Zap className="w-8 h-8 text-primary" />,
                title: '24/7 Availability',
                description: 'Never miss a message again. Instant responses with customizable business hours.',
                glow: 'secondary' as const,
                blur: 'light' as const,
                size: 'sm' as const,
                animation: 'glow' as const

              }
         ]

const Home: React.FC = () => {
  return (
    <div className="min-h-screen pt-6 overflow-hidden">
      {/* Background orbs - heavily blurred for subtle ambient lighting */}
      <div className="fixed top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse pointer-events-none" />
      <div className="fixed top-40 right-20 w-96 h-96 bg-secondary/15 rounded-full blur-3xl animate-pulse pointer-events-none" style={{ animationDelay: '2s' }} />
      <div className="fixed bottom-20 left-1/3 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-pulse pointer-events-none" style={{ animationDelay: '4s' }} />
      <div className="fixed bottom-40 right-1/4 w-64 h-64 bg-secondary/15 rounded-full blur-3xl animate-pulse pointer-events-none" style={{ animationDelay: '6s' }} />
      
      {/* Subtle overlay for depth */}
      <div className="fixed inset-0 bg-neutral-bg/20 pointer-events-none" />
      
      <div className="relative z-10">
      {/* Hero Section */}
      <section className="overflow-hidden">
      
          <div className="text-center max-w-4xl mx-auto">
            
              <div className="inline-flex items-center space-x-2 glass-morphism rounded-full px-6 py-3 shadow-lg">
                <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
                <span className="text-sm font-medium text-neutral-text">
                  🇨🇦 Proudly Canadian • PIPEDA Compliant
                </span>
              </div>
            </div>
            <div className="flex flex-col text-center justify-center mb-8">
              <div className="align-center justify-center mb-4 p-2">
                <img src={logo} width={280} height={280} alt="logo" className="mx-auto"/>
              </div>
            <div className="justify-center items-center">
            <h1 className="font-bold m-8 items-center leading-tight">
              <span className="justify-items-center text-2xl md:text-5xl text-neutral-text">AI-Powered</span>
              <br />
              <span className="text-5xl md:text-7xl font-bold gradient-text-brand">
                Assist Text
              </span>
            </h1>
            </div>
            </div>
            
            <p className="text-xl text-center items-center justify-center md:text-2xl text-neutral-text/80 mb-12 max-w-3xl mx-auto leading-relaxed">
              Transform your business communications with intelligent SMS automation.
              Never miss a message, always respond professionally, available 24/7.</p>
           
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Link 
                to="/register" 
                className="group btn btn-primary text-lg"
              >
                Start Free Trial
                <ArrowRight className="w-5 h-5 ml-2 inline-block group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to="/login" 
                className="btn btn-outline text-lg"
              >
                Sign In
              </Link>
            </div>
            
            <div className="flex items-center justify-center space-x-8 text-sm text-neutral-text/60">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-success" />
                <span>Free 14-day trial</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-success" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-success" />
                <span>Cancel anytime</span>
              </div>
            </div>
       </section>
         
        
                      
      {/* Features Section */}
      <section id="features" className="py-24 justify-items-center backdrop-blur-sm">
        <div className=" z-12 flex flex-row text-center gap-8 align-center justifty-center p-4"></div>
          <div className="text-center mb-16">
                
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-text mb-6">
              Why Choose AssisText?
            </h2>
            <p className="text-xl text-neutral-text/80 max-w-3xl mx-auto">
              Built specifically for Canadian businesses who value privacy, security, and intelligent automation.
            </p>
          </div>
      <div className="grid md:grid-cols-3 mx-8 max-w-6xl justify-between gap-8 ">
         {data.map((data, index) =>  {
          return (
            <GlassGradCard className="hover:scale-105 transition-transform duration-300"
              key={index}
              glow={data.glow}
              blur={data.blur}
              size={data.size}
              animation={data.animation}>
                
              <div className="text-center flex flex-col items-center m-2 p-2">
                <div className="w-10 h-10 text-accent mb-4">{data.icon}</div> 
                <h3 className="text-2xl font-semibold text-neutral-text mb-2">{data.title}</h3>
                <p className="text-neutral-text/80">{data.description}</p>
              </div>
              
            </GlassGradCard>
          )
         }
        )}
      </div>
                      
       
       
      
    </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-text mb-6">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-neutral-text/80">
              Choose the plan that fits your business needs. All plans include our core AI features.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: 'Starter',
                price: '$19',
                period: '/month',
                description: 'Perfect for small businesses',
                features: ['100 SMS messages', 'Basic AI responses', 'Email support', 'Canadian Number of Your Choice'],
                highlighted: false
              },
              {
                name: 'Professional',
                price: '$34',
                period: '/month',
                description: 'Most popular for growing businesses',
                features: ['2,000 SMS messages', 'Advanced AI training', 'Priority support', 'Analytics dashboard'],
                highlighted: true
              },
              {
                name: 'Enterprise',
                price: '$79',
                period: '/month',
                description: 'For large organizations',
                features: ['10,000 SMS messages', 'Custom AI training', 'Personal Support 24/7', 'Advanced analytics'],
                highlighted: false
              }
            ].map((plan, index) => (
              <div 
                key={index} 
                className={`relative p-8 rounded-3xl shadow-xl border transition-all duration-300 hover:scale-105 ${
                  plan.highlighted 
                    ? 'bg-gradient-to-b from-primary/20 to-secondary/20 border-primary/50 scale-105' 
                    : 'glass-morphism'
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-accent to-secondary text-neutral-bg px-4 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </div>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className={`text-sm ${plan.highlighted ? 'text-primary/80' : 'text-neutral-text/60'} mb-4`}>
                    {plan.description}
                  </p>
                  <div className="flex items-end justify-center">
                    <span className="text-5xl font-bold">{plan.price}</span>
                    <span className={`text-lg ${plan.highlighted ? 'text-primary/80' : 'text-neutral-text/60'} ml-1`}>
                      {plan.period}
                    </span>
                  </div>
                </div>
                
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <CheckCircle className={`w-5 h-5 mr-3 ${plan.highlighted ? 'text-primary' : 'text-success'}`} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link
                  to="/register"
                  className={`block w-full py-4 text-center font-semibold rounded-2xl transition-all duration-200 ${
                    plan.highlighted
                      ? 'btn btn-primary'
                      : 'btn btn-outline'
                  }`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-neutral-bg/25 backdrop-blur-sm">
      
        <div className="container backdrop-blue-lg mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-text mb-6">
              Trusted by Canadian Businesses
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: 'Sarah Chen',
                role: 'Restaurant Owner',
                company: 'Toronto',
                content: 'AssisText has revolutionized how we handle reservations. Our AI assistant handles 80% of inquiries automatically.',
                rating: 5
              },
              {
                name: 'Michael Dubois',
                role: 'Real Estate Agent',
                company: 'Montreal',
                content: 'Never miss a lead again. The AI responds to property inquiries instantly, even when I\'m showing other homes.',
                rating: 5
              },
              {
                name: 'Jennifer Smith',
                role: 'Clinic Manager',
                company: 'Vancouver',
                content: 'Perfect for appointment confirmations and patient communication. PIPEDA compliance was essential for us.',
                rating: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className="p-8 glass-morphism rounded-3xl shadow-xl">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-neutral-text/80 mb-6 italic">{testimonial.content}</p>
                <div>
                  <div className="font-semibold text-neutral-text">{testimonial.name}</div>
                  <div className="text-sm text-neutral-text/60">{testimonial.role}, {testimonial.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-text mb-8">
              Ready to Transform Your Business Communications?
            </h2>
            <p className="text-xl text-neutral-text/80 mb-12">
              Join thousands of Canadian businesses using AI to respond faster, smarter, and more efficiently.
            </p>
            
            <div className= "flex flex-col-2 gap-6 justify-center mb-12">
              <Link 
                to="/register" 
                className="group btn btn-primary text-lg">
                Start Your Free Trial
                <ArrowRight className="w-5 h-5 ml-2 inline-block group-hover:translate-x-1 transition-transform" />
                          
              </Link>
              <Link 
                to="/login" 
                className="btn btn-outline text-lg"
              >Sign In
              </Link>
            </div>
            
            <p className="text-sm text-neutral-text/60">
              No setup fees • Cancel anytime • Canadian hosted & compliant
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-bg text-neutral-text py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Company */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                
                 <img src={logo} width={75} height={75} alt="logo"/>
                
                <span className="text-xl font-bold">AssisText</span>
              </div>
              <p className="text-neutral-text/60 mb-4">
                AI-powered SMS management built in Canada with privacy and security in mind.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-neutral-border/20 rounded-lg flex items-center justify-center hover:bg-neutral-border/40 transition-colors">
                  📧
                </a>
                <a href="#" className="w-10 h-10 bg-neutral-border/20 rounded-lg flex items-center justify-center hover:bg-neutral-border/40 transition-colors">
                  🐦
                </a>
                <a href="#" className="w-10 h-10 bg-neutral-border/20 rounded-lg flex items-center justify-center hover:bg-neutral-border/40 transition-colors">
                  💼
                </a>
              </div>
            </div>

            {/* Product */}
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-neutral-text/60">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-neutral-text/60">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-neutral-text/60">
                <li><a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="/terms" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">PIPEDA Compliance</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-neutral-border pt-8 text-center text-neutral-text/60">
            <p>&copy; 2025 AssisText. All rights reserved. Made in Canada 🇨🇦</p>
          </div>
        </div>
      </footer>
    </div>
    </div>
  );
};

export default Home;