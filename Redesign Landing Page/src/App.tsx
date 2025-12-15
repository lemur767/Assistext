import { ThemeToggle } from "./components/ThemeToggle";
import { GlassCard } from "./components/GlassCard";
import { FeatureCard } from "./components/FeatureCard";
import { StatCard } from "./components/StatCard";
import { AnimatedSection } from "./components/AnimatedSection";
import { 
  Sparkles, 
  Zap, 
  Shield, 
  Rocket, 
  Users, 
  TrendingUp,
  ArrowRight,
  Menu,
  X
} from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "motion/react";

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Background with gradient overlay */}
      <div className="fixed inset-0 z-0 bg-background">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Navigation */}
        <motion.nav 
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'py-4' : 'py-6'}`}
        >
          <div className="container mx-auto px-4">
            <div className={`glass rounded-2xl px-6 py-4 flex items-center justify-between transition-all duration-300 ${scrolled ? 'shadow-lg' : ''}`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl">YourBrand</span>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-8">
                <a href="#features" className="hover:text-primary transition-colors text-[15px]">Features</a>
                <a href="#about" className="hover:text-primary transition-colors text-[15px]">About</a>
                <a href="#contact" className="hover:text-primary transition-colors text-[15px]">Contact</a>
                <ThemeToggle />
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden flex items-center gap-4">
                <ThemeToggle />
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                >
                  {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="md:hidden mt-4"
              >
                <div className="bg-card border border-border rounded-2xl p-6 flex flex-col gap-4 shadow-lg">
                  <a 
                    href="#features" 
                    className="hover:text-primary transition-colors py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Features
                  </a>
                  <a 
                    href="#about" 
                    className="hover:text-primary transition-colors py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    About
                  </a>
                  <a 
                    href="#contact" 
                    className="hover:text-primary transition-colors py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Contact
                  </a>
                </div>
              </motion.div>
            )}
          </div>
        </motion.nav>

        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 md:py-28">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <GlassCard variant="solid" className="mb-10 bg-card">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary/10 rounded-full mb-8"
                >
                  <Zap className="w-4 h-4 text-primary" />
                  <span className="text-sm text-primary">Powered by Innovation</span>
                </motion.div>
                
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="text-5xl md:text-6xl lg:text-7xl mb-8 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent leading-tight"
                >
                  Transform Your Vision Into Reality
                </motion.h1>
                
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="text-lg md:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed"
                >
                  Experience the next generation of digital solutions with our cutting-edge platform. 
                  Built for creators, designers, and innovators who demand excellence.
                </motion.p>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground px-9 py-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl text-[15px]"
                  >
                    Get Started
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-card border-2 border-border hover:border-primary px-9 py-4 rounded-xl transition-all duration-300 text-[15px]"
                  >
                    Learn More
                  </motion.button>
                </motion.div>
              </GlassCard>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
              <AnimatedSection delay={0.2}>
                <StatCard value="50K+" label="Active Users" color="primary" />
              </AnimatedSection>
              <AnimatedSection delay={0.3}>
                <StatCard value="99.9%" label="Uptime" color="secondary" />
              </AnimatedSection>
              <AnimatedSection delay={0.4}>
                <StatCard value="24/7" label="Support" color="accent" />
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="container mx-auto px-4 py-16 md:py-28">
          <div className="max-w-6xl mx-auto">
            <AnimatedSection className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl mb-6">
                Powerful Features
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Everything you need to succeed, all in one beautiful platform
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              <AnimatedSection delay={0.1}>
                <FeatureCard
                  icon={Rocket}
                  title="Lightning Fast"
                  description="Experience blazing fast performance with our optimized infrastructure and cutting-edge technology."
                  color="primary"
                />
              </AnimatedSection>
              <AnimatedSection delay={0.2}>
                <FeatureCard
                  icon={Shield}
                  title="Secure & Private"
                  description="Your data is protected with enterprise-grade security and end-to-end encryption."
                  color="secondary"
                />
              </AnimatedSection>
              <AnimatedSection delay={0.3}>
                <FeatureCard
                  icon={Zap}
                  title="Real-time Updates"
                  description="Stay synchronized across all devices with instant updates and seamless collaboration."
                  color="accent"
                />
              </AnimatedSection>
              <AnimatedSection delay={0.1}>
                <FeatureCard
                  icon={Users}
                  title="Team Collaboration"
                  description="Work together effortlessly with powerful tools designed for modern teams."
                  color="secondary"
                />
              </AnimatedSection>
              <AnimatedSection delay={0.2}>
                <FeatureCard
                  icon={TrendingUp}
                  title="Analytics Dashboard"
                  description="Track your progress with comprehensive analytics and actionable insights."
                  color="accent"
                />
              </AnimatedSection>
              <AnimatedSection delay={0.3}>
                <FeatureCard
                  icon={Sparkles}
                  title="AI-Powered"
                  description="Leverage artificial intelligence to automate tasks and enhance productivity."
                  color="primary"
                />
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-16 md:py-28">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection>
              <div className="bg-card border border-border rounded-2xl p-10 md:p-16 text-center shadow-lg">
                <div className="bg-gradient-to-r from-primary via-accent to-secondary p-1 rounded-2xl mb-10 inline-block">
                  <div className="bg-card rounded-2xl px-7 py-3.5">
                    <span className="text-lg bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                      Ready to get started?
                    </span>
                  </div>
                </div>
                
                <h2 className="text-4xl md:text-5xl mb-6">
                  Join thousands of satisfied users
                </h2>
                
                <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
                  Start your journey today and discover why teams around the world trust our platform.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-gradient-to-r from-primary via-accent to-secondary text-white px-9 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl text-[15px]"
                  >
                    Start Free Trial
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-secondary text-secondary-foreground px-9 py-4 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg text-[15px]"
                  >
                    Schedule Demo
                  </motion.button>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Footer */}
        <footer className="container mx-auto px-4 py-16">
          <AnimatedSection>
            <div className="bg-card border border-border rounded-2xl p-10 md:p-12 shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-lg">YourBrand</span>
                  </div>
                  <p className="text-[15px] text-muted-foreground leading-relaxed">
                    Building the future, one pixel at a time.
                  </p>
                </div>

                <div>
                  <h4 className="mb-5 text-[15px]">Product</h4>
                  <ul className="space-y-3 text-[15px] text-muted-foreground">
                    <li><a href="#" className="hover:text-primary transition-colors inline-block hover:translate-x-1 duration-200">Features</a></li>
                    <li><a href="#" className="hover:text-primary transition-colors inline-block hover:translate-x-1 duration-200">Pricing</a></li>
                    <li><a href="#" className="hover:text-primary transition-colors inline-block hover:translate-x-1 duration-200">Security</a></li>
                    <li><a href="#" className="hover:text-primary transition-colors inline-block hover:translate-x-1 duration-200">Roadmap</a></li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-5 text-[15px]">Company</h4>
                  <ul className="space-y-3 text-[15px] text-muted-foreground">
                    <li><a href="#" className="hover:text-primary transition-colors inline-block hover:translate-x-1 duration-200">About</a></li>
                    <li><a href="#" className="hover:text-primary transition-colors inline-block hover:translate-x-1 duration-200">Blog</a></li>
                    <li><a href="#" className="hover:text-primary transition-colors inline-block hover:translate-x-1 duration-200">Careers</a></li>
                    <li><a href="#" className="hover:text-primary transition-colors inline-block hover:translate-x-1 duration-200">Contact</a></li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-5 text-[15px]">Legal</h4>
                  <ul className="space-y-3 text-[15px] text-muted-foreground">
                    <li><a href="#" className="hover:text-primary transition-colors inline-block hover:translate-x-1 duration-200">Privacy</a></li>
                    <li><a href="#" className="hover:text-primary transition-colors inline-block hover:translate-x-1 duration-200">Terms</a></li>
                    <li><a href="#" className="hover:text-primary transition-colors inline-block hover:translate-x-1 duration-200">Cookie Policy</a></li>
                    <li><a href="#" className="hover:text-primary transition-colors inline-block hover:translate-x-1 duration-200">Licenses</a></li>
                  </ul>
                </div>
              </div>

              <div className="border-t border-border pt-8 text-center text-[15px] text-muted-foreground">
                <p>&copy; 2025 YourBrand. All rights reserved.</p>
              </div>
            </div>
          </AnimatedSection>
        </footer>
      </div>
    </div>
  );
}
