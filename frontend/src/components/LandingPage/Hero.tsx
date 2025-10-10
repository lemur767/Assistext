import React from 'react';
import { SparklesIcon, MessageSquareTextIcon } from 'lucide-react';
import './Hero.css';

const Hero: React.FC = () => {
  return (
    <>
    <div className="hero">
      <div className="hero__grid"></div>
      
      <div className="hero__particles">
        <div className="hero__particle"></div>
        <div className="hero__particle"></div>
        <div className="hero__particle"></div>
        <div className="hero__particle"></div>
        <div className="hero__particle"></div>
        <div className="hero__particle"></div>
        <div className="hero__particle"></div>
        <div className="hero__particle"></div>
        <div className="hero__particle"></div>
      </div>
<div className="hero__title-content">
  
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
      <div className="hero__content-wrapper">
        <div className="hero__content">
          <h1 className="hero__title">
            Assist Text
            <br />
          Text Message Assistant
          </h1>

          <p className="hero__subtitle">
                 Our AI automatically responds to your incoming texts with
              personalized, context-aware replies while you focus on what
              matters.
          </p>

          <div className="hero__cta-container">
            <button className="hero__cta-button">
              <span className="hero__backdrop"></span>
              <span className="hero__spark"></span>
              <svg className="hero__sparkle" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M12 3l1.2 3.6A4 4 0 0 0 17.4 11l3.6 1-3.6 1a4 4 0 0 0-4.2 4.4L12 21l-1.2-3.6A4 4 0 0 0 6.6 13l-3.6-1 3.6-1a4 4 0 0 0 4.2-4.4L12 3z" stroke="currentColor" strokeWidth="1.5" fill="currentColor"></path>
                <path d="M7.5 4.5l.6 1.8a2 2 0 0 0 1.5 1.3l1.8.4-1.8.4a2 2 0 0 0-1.5 1.3l-.6 1.8-.6-1.8A2 2 0 0 0 5.4 8l-1.8-.4L5.4 7a2 2 0 0 0 1.5-1.3l.6-1.2z" stroke="currentColor" strokeWidth="1.5" fill="currentColor"></path>
                <path d="M17.5 5.5l.6 1.6a2 2 0 0 0 1.2 1.2l1.6.6-1.6.6a2 2 0 0 0-1.2 1.2l-.6 1.6-.6-1.6A2 2 0 0 0 15.7 9l-1.6-.6 1.6-.6a2 2 0 0 0 1.2-1.2l.6-1.1z" stroke="currentColor" strokeWidth="1.5" fill="currentColor"></path>
              </svg>
              <span className="hero__button-text">Start building</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
    </>
  );
};

export default Hero;