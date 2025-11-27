import React, { useState } from 'react';
import { AnimatedSection } from '../common/AnimatedSection';
import { GlassCard } from '../common/GlassCard';
import { Mail, MessageSquare, Send } from 'lucide-react';

const ContactUs: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Form submitted:', formData);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <section id="contact" style={{ maxWidth: '80rem', margin: '0 auto', padding: '4rem 1rem', paddingTop: '7rem', paddingBottom: '7rem' }}>
            <div style={{ maxWidth: '56rem', margin: '0 auto' }}>
                <AnimatedSection>
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <h2 className="gradient-text-brand" style={{ fontSize: 'clamp(2.25rem, 5vw, 3rem)', marginBottom: '1.5rem', fontWeight: 600 }}>
                            Get In Touch
                        </h2>
                        <p style={{ fontSize: 'clamp(1rem, 2vw, 1.125rem)', color: 'var(--muted-foreground)', maxWidth: '42rem', margin: '0 auto' }}>
                            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                        </p>
                    </div>
                </AnimatedSection>

                <AnimatedSection delay={0.2}>
                    <GlassCard variant="solid">
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div>
                                <label htmlFor="name" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.938rem', fontWeight: 500, color: 'var(--foreground)' }}>
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="form-input"
                                    style={{ width: '100%' }}
                                    placeholder="Your name"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.938rem', fontWeight: 500, color: 'var(--foreground)' }}>
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="form-input"
                                    style={{ width: '100%' }}
                                    placeholder="your@email.com"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.938rem', fontWeight: 500, color: 'var(--foreground)' }}>
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={5}
                                    className="form-input"
                                    style={{ width: '100%', resize: 'vertical' }}
                                    placeholder="Tell us what's on your mind..."
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn-primary"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.5rem',
                                    padding: '0.875rem 2rem',
                                    borderRadius: '0.75rem',
                                    fontSize: '0.938rem',
                                    fontWeight: 500,
                                    width: '100%'
                                }}
                            >
                                <Send style={{ width: '1.125rem', height: '1.125rem' }} />
                                Send Message
                            </button>
                        </form>

                        <div style={{ marginTop: '2.5rem', paddingTop: '2rem', borderTop: '1px solid var(--border)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{
                                    width: '3rem',
                                    height: '3rem',
                                    margin: '0 auto 0.75rem',
                                    borderRadius: '0.75rem',
                                    background: 'rgba(232, 100, 124, 0.1)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Mail style={{ width: '1.5rem', height: '1.5rem', color: 'var(--primary)' }} />
                                </div>
                                <h3 style={{ fontSize: '0.938rem', fontWeight: 600, marginBottom: '0.25rem' }}>Email</h3>
                                <p style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)' }}>support@assistext.com</p>
                            </div>

                            <div style={{ textAlign: 'center' }}>
                                <div style={{
                                    width: '3rem',
                                    height: '3rem',
                                    margin: '0 auto 0.75rem',
                                    borderRadius: '0.75rem',
                                    background: 'rgba(71, 228, 187, 0.1)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <MessageSquare style={{ width: '1.5rem', height: '1.5rem', color: 'var(--secondary)' }} />
                                </div>
                                <h3 style={{ fontSize: '0.938rem', fontWeight: 600, marginBottom: '0.25rem' }}>Live Chat</h3>
                                <p style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)' }}>Available 24/7</p>
                            </div>
                        </div>
                    </GlassCard>
                </AnimatedSection>
            </div>
        </section>
    );
};

export default ContactUs;