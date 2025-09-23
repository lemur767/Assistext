import React, { useState } from 'react';
import { ChevronDownIcon } from 'lucide-react';
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
  return <section id="faq" className="py-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Frequently Asked{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 drop-shadow-[0_0_8px_rgba(139,92,246,0.8)]">
              Questions
            </span>
          </h2>
          <p className="text-lg text-slate-200">
            Everything you need to know about TextAI.
          </p>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, index) => <div key={index} className="backdrop-blur-lg bg-black/40 border border-white/10 rounded-xl overflow-hidden transition-all shadow-[0_0_15px_rgba(0,0,0,0.5)]">
              <button className="w-full px-6 py-4 text-left flex items-center justify-between focus:outline-none" onClick={() => setOpenIndex(openIndex === index ? -1 : index)}>
                <span className="font-medium text-lg">{faq.question}</span>
                <ChevronDownIcon size={20} className={`text-cyan-400 transition-transform ${openIndex === index ? 'rotate-180' : ''}`} />
              </button>
              <div className={`px-6 overflow-hidden transition-all ${openIndex === index ? 'max-h-96 pb-6' : 'max-h-0'}`}>
                <p className="text-slate-300">{faq.answer}</p>
              </div>
            </div>)}
        </div>
        <div className="mt-12 text-center">
          <p className="text-slate-300">
            Still have questions?{' '}
            <a href="#" className="text-cyan-400 hover:underline">
              Contact our support team
            </a>
          </p>
        </div>
      </div>
    </section>;
};
export default FAQSection;