import React, { useState } from 'react';
import { ChevronDownIcon } from 'lucide-react';
import styles from './FAQSection.module.css';

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const faqs = [{
    question: 'How does the AI know how to respond like me?',
    answer: 'Our AI analyzes your previous conversations and communication style to understand your typical responses, tone, and vocabulary. You can also provide specific guidelines and review AI responses to help it learn faster.'
  }, {
    question: 'Is my data secure?',
    answer: 'Absolutely. We use end-to-end encryption and strict data policies. Your conversations are never used to train general AI models, and you can delete your data at any time. We comply with GDPR, CCPA, and other privacy regulations.'
  }, {
    question: 'What messaging platforms are supported?',
    answer: "We currently support SMS, WhatsApp, Telegram, Facebook Messenger, Slack, and Instagram DMs. We're constantly adding more platforms based on user feedback."
  }, {
    question: "Can I review messages before they're sent?",
    answer: 'Yes! You can set your preferences to have the AI suggest responses for your approval before sending, or allow it to respond automatically to certain types of messages while requiring approval for others.'
  }, {
    question: 'How accurate is the calendar integration?',
    answer: "Our calendar integration connects with Google Calendar, Outlook, and Apple Calendar to check your real-time availability. The AI will only suggest times you're actually free and can automatically schedule meetings based on your preferences."
  }, {
    question: 'What if the AI makes a mistake?',
    answer: "While our AI is highly accurate, it can occasionally misinterpret context. You'll receive notifications of all AI interactions, allowing you to quickly step in if needed. The system also learns from corrections to improve future responses."
  }];
  return (
    <section id="faq" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            Frequently Asked{' '}
            <span className={styles.titleHighlight}>
              Questions
            </span>
          </h2>
          <p className={styles.description}>
            Everything you need to know about TextAI.
          </p>
        </div>
        <div className={styles.faqList}>
          {faqs.map((faq, index) => (
            <div key={index} className={styles.faqItem}>
              <button className={styles.faqButton} onClick={() => setOpenIndex(openIndex === index ? -1 : index)}>
                <span className={styles.faqQuestion}>{faq.question}</span>
                <ChevronDownIcon size={20} className={`${styles.chevronIcon} ${openIndex === index ? styles.chevronIconRotate : ''}`} />
              </button>
              <div className={`${styles.faqContent} ${openIndex === index ? styles.faqContentOpen : ''}`}>
                <p className={styles.faqAnswer}>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.footerText}>
          <p>
            Still have questions?{' '}
            <a href="#" className={styles.footerLink}>
              Contact our support team
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};
export default FAQSection;