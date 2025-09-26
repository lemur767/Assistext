import React from 'react';
import '../../styles/TestimonialsSection.css';

const testimonials = [
  {
    name: 'Alice Johnson',
    title: 'CEO, Tech Innovators',
    quote: 'Assistext has revolutionized our customer communication. The AI-powered responses are indistinguishable from human interaction, saving us countless hours and improving satisfaction.',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
  },
  {
    name: 'Bob Williams',
    title: 'Founder, Creative Solutions',
    quote: 'The ghost number feature is a game-changer for our sales team. We can maintain a local presence without the overhead, and the AI handles initial queries flawlessly.',
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
  },
  {
    name: 'Carol Davis',
    title: 'Marketing Director, Global Brands',
    quote: 'Integrating Assistext was seamless. Our marketing campaigns now benefit from instant, personalized responses, leading to higher engagement and conversion rates.',
    avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
  },
];

const TestimonialsSection: React.FC = () => {
  return (
    <section className="section">
      <div className="container">
        <h2 className="heading">What Our Users Say</h2>
        <div className="grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="card">
              <p className="quote">"{testimonial.quote}"</p>
              <div className="authorInfo">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="avatar"
                />
                <div>
                  <h3 className="authorName">{testimonial.name}</h3>
                  <p className="authorTitle">{testimonial.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;