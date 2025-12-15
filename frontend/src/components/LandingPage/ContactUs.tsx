import React, { useState } from 'react';
import { AnimatedSection } from '../common/AnimatedSection';
import { GlassCard } from '../common/GlassCard';
import { Mail, MessageSquare, Send } from 'lucide-react';
import '../../styles/ContactUs_landing_page.css';

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
        <section id="contact" className="contact-section">
            <div className="contact-container">
                <AnimatedSection>
                    <div className="contact-header-wrapper">
                        <h2 className="gradient-text-brand contact-title">
                            Get In Touch
                        </h2>
                        <p className="contact-subtitle">
                            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                        </p>
                    </div>
                </AnimatedSection>

                <AnimatedSection delay={0.2}>
                    <GlassCard variant="solid">
                        <form onSubmit={handleSubmit} className="contact-form">
                            <div className="contact-form-field">
                                <label htmlFor="name" className="contact-form-label">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="form-input contact-form-input"
                                    placeholder="Your name"
                                />
                            </div>

                            <div className="contact-form-field">
                                <label htmlFor="email" className="contact-form-label">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="form-input contact-form-input"
                                    placeholder="your@email.com"
                                />
                            </div>

                            <div className="contact-form-field">
                                <label htmlFor="message" className="contact-form-label">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={5}
                                    className="form-input contact-form-textarea"
                                    placeholder="Tell us what's on your mind..."
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn-primary contact-btn-submit"
                            >
                                <Send className="contact-btn-icon" />
                                Send Message
                            </button>
                        </form>

                        <div className="contact-info-grid">
                            <div className="contact-info-item">
                                <div className="contact-icon-wrapper email">
                                    <Mail className="contact-icon primary" />
                                </div>
                                <h3 className="contact-info-title">Email</h3>
                                <p className="contact-info-desc">support@assistext.com</p>
                            </div>

                            <div className="contact-info-item">
                                <div className="contact-icon-wrapper chat">
                                    <MessageSquare className="contact-icon secondary" />
                                </div>
                                <h3 className="contact-info-title">Live Chat</h3>
                                <p className="contact-info-desc">Available 24/7</p>
                            </div>
                        </div>
                    </GlassCard>
                </AnimatedSection>
            </div>
        </section>
    );
};

export default ContactUs;