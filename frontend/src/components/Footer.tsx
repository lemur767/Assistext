import React from 'react';
import { Sparkles } from 'lucide-react';
import { AnimatedSection } from './common/AnimatedSection';

const Footer = () => {
  return (
    <footer style={{ maxWidth: '80rem', margin: '0 auto', padding: '4rem 1rem' }}>
      <AnimatedSection>
        <div className="glass" style={{
          borderRadius: '1rem',
          padding: 'clamp(2.5rem, 5vw, 3rem)',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2.5rem', marginBottom: '2.5rem' }}>
            {/* Brand Column */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <div style={{
                  width: '2.25rem',
                  height: '2.25rem',
                  borderRadius: '0.625rem',
                  background: 'linear-gradient(135deg, var(--primary), var(--accent))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Sparkles style={{ width: '1.25rem', height: '1.25rem', color: 'white' }} />
                </div>
                <span style={{ fontSize: '1.125rem', fontWeight: 600 }}>Assistext</span>
              </div>
              <p style={{ fontSize: '0.938rem', color: 'var(--muted-foreground)', lineHeight: 1.625 }}>
                AI-powered text automation that saves you time while maintaining your personal touch.
              </p>
            </div>

            {/* Product Column */}
            <div>
              <h4 style={{ fontSize: '0.938rem', fontWeight: 600, marginBottom: '1.25rem' }}>Product</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[
                  { label: 'Features', href: '#features' },
                  { label: 'Pricing', href: '#pricing' },
                  { label: 'About', href: '#about' },
                  { label: 'Contact', href: '#contact' }
                ].map(item => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      style={{
                        fontSize: '0.938rem',
                        color: 'var(--muted-foreground)',
                        textDecoration: 'none',
                        transition: 'all 0.2s ease',
                        display: 'inline-block'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = 'var(--primary)';
                        e.currentTarget.style.transform = 'translateX(4px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = 'var(--muted-foreground)';
                        e.currentTarget.style.transform = 'translateX(0)';
                      }}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <h4 style={{ fontSize: '0.938rem', fontWeight: 600, marginBottom: '1.25rem' }}>Company</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {['Dashboard', 'Blog', 'Careers', 'Support'].map(item => (
                  <li key={item}>
                    <a
                      href="#"
                      style={{
                        fontSize: '0.938rem',
                        color: 'var(--muted-foreground)',
                        textDecoration: 'none',
                        transition: 'all 0.2s ease',
                        display: 'inline-block'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = 'var(--primary)';
                        e.currentTarget.style.transform = 'translateX(4px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = 'var(--muted-foreground)';
                        e.currentTarget.style.transform = 'translateX(0)';
                      }}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Column */}
            <div>
              <h4 style={{ fontSize: '0.938rem', fontWeight: 600, marginBottom: '1.25rem' }}>Legal</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[
                  { label: 'Privacy', href: '/privacy' },
                  { label: 'Terms', href: '/terms' },
                  { label: 'Cookie Policy', href: '#' },
                  { label: 'Security', href: '#' }
                ].map(item => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      style={{
                        fontSize: '0.938rem',
                        color: 'var(--muted-foreground)',
                        textDecoration: 'none',
                        transition: 'all 0.2s ease',
                        display: 'inline-block'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = 'var(--primary)';
                        e.currentTarget.style.transform = 'translateX(4px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = 'var(--muted-foreground)';
                        e.currentTarget.style.transform = 'translateX(0)';
                      }}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div style={{
            borderTop: '1px solid var(--border)',
            paddingTop: '2rem',
            textAlign: 'center'
          }}>
            <p style={{ fontSize: '0.938rem', color: 'var(--muted-foreground)' }}>
              © {new Date().getFullYear()} Assistext. All rights reserved.
            </p>
          </div>
        </div>
      </AnimatedSection>
    </footer>
  );
};

export default Footer;