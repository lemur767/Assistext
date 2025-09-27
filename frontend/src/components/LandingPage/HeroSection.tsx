import React from 'react';
import { MessageSquareTextIcon, SparklesIcon } from 'lucide-react';
import '../../styles/HeroSection.css';

const HeroSection = () => {
  return (
    <section className="heroSection_section">
      {/* Neon grid background effect */}
      <div className="heroSection_backgroundGrid"></div>
      <div className="heroSection_containerHero">
        <div className="heroSection_grid">
          <div className="heroSection_textColumn">
            <div className="heroSection_aiTag">
              <SparklesIcon size={16} className="heroSection_aiTagIcon" />
              <span className="heroSection_aiTagText">
                AI-Powered Text Automation
              </span>
            </div>
            <h1 className="heroSection_heading">
              Never Miss a{' '}
              <span className="heroSection_headingHighlight">
                Message
              </span>{' '}
              Again
            </h1>
            <p className="heroSection_description">
              Our AI automatically responds to your incoming texts with
              personalized, context-aware replies while you focus on what
              matters.
            </p>
            <div className="heroSection_buttonsContainer">
              <button className="heroSection_primaryButton">
                Start Free Trial
              </button>
              <button className="heroSection_secondaryButton">
                <MessageSquareTextIcon size={20} className="heroSection_secondaryButtonIcon" />
                See Demo
              </button>
            </div>
           
              <div className="heroSection_rating">
                <div className="heroSection_stars">
                  {[1, 2, 3, 4, 5].map(star => (
                    <svg key={star} className="heroSection_starIcon" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
        
              </div>
            </div>
          </div>
          <div className="heroSection_chatColumn">
            <div className="heroSection_chatCardWrapper">
              <div className="heroSection_chatCardBlur"></div>
              <div className="heroSection_chatCard">
                <div className="heroSection_chatHeader">
                  <div className="heroSection_chatAvatarContainer">
                    <div className="heroSection_chatAvatar">
                      J
                    </div>
                    <div className="heroSection_chatUserName">
                      <p>John Smith</p>
                      <p className="heroSection_chatUserStatus">Online</p>
                    </div>
                  </div>
                  <div className="heroSection_chatAiStatus">AI Responding</div>
                </div>
                <div className="heroSection_chatMessages">
                  <div className="heroSection_messageFlexStart">
                    <div className="heroSection_incomingMessage">
                      <p className="heroSection_messageText">
                        Hey, are you available for that meeting today?
                      </p>
                    </div>
                  </div>
                  <div className="heroSection_messageFlexEnd">
                    <div className="heroSection_outgoingMessage">
                      <p className="heroSection_messageText">
                        I'm in a client meeting until 3pm. I can join after that
                        or we can reschedule for tomorrow morning.
                      </p>
                      <div className="heroSection_aiReplyInfo">
                        <SparklesIcon size={12} className="heroSection_aiReplyIcon" />
                        <p className="heroSection_aiReplyText">AI Reply</p>
                      </div>
                    </div>
                  </div>
                  <div className="heroSection_messageFlexStart">
                    <div className="heroSection_incomingMessage">
                      <p className="heroSection_messageText">
                        Perfect, let's do 3:30pm then. I'll send a calendar
                        invite.
                      </p>
                    </div>
                  </div>
                  <div className="heroSection_typingIndicatorContainer">
                    <div className="heroSection_typingIndicatorLine"></div>
                    <span className="heroSection_typingIndicatorText">
                      AI is typing...
                    </span>
                    <div className="heroSection_typingIndicatorLine"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      
    </section>
  );
};
export default HeroSection;