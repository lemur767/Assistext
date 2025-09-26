import React from 'react';
import { MessageSquareTextIcon, SparklesIcon } from 'lucide-react';
import '../../styles/HeroSection.css';

const HeroSection = () => {
  return (
    <section className="section">
      {/* Neon grid background effect */}
      <div className="backgroundGrid"></div>
      <div className="containerHero">
        <div className="grid">
          <div className="textColumn">
            <div className="aiTag">
              <SparklesIcon size={16} className="aiTagIcon" />
              <span className="aiTagText">
                AI-Powered Text Automation
              </span>
            </div>
            <h1 className="heading">
              Never Miss a{' '}
              <span className="headingHighlight">
                Message
              </span>{' '}
              Again
            </h1>
            <p className="description">
              Our AI automatically responds to your incoming texts with
              personalized, context-aware replies while you focus on what
              matters.
            </p>
            <div className="buttonsContainer">
              <button className="primaryButton">
                Start Free Trial
              </button>
              <button className="secondaryButton">
                <MessageSquareTextIcon size={20} className="secondaryButtonIcon" />
                See Demo
              </button>
            </div>
            <div className="socialProof">
              <div className="avatars">
                {[1, 2, 3, 4].map(i => (
                  <img key={i} src={`https://randomuser.me/api/portraits/men/${i + 20}.jpg`} alt="User" className="avatar" />
                ))}
              </div>
              <div className="rating">
                <div className="stars">
                  {[1, 2, 3, 4, 5].map(star => (
                    <svg key={star} className="starIcon" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="usersText">Trusted by 5000+ users</p>
              </div>
            </div>
          </div>
          <div className="chatColumn">
            <div className="chatCardWrapper">
              <div className="chatCardBlur"></div>
              <div className="chatCard">
                <div className="chatHeader">
                  <div className="chatAvatarContainer">
                    <div className="chatAvatar">
                      J
                    </div>
                    <div className="chatUserName">
                      <p>John Smith</p>
                      <p className="chatUserStatus">Online</p>
                    </div>
                  </div>
                  <div className="chatAiStatus">AI Responding</div>
                </div>
                <div className="chatMessages">
                  <div className="messageFlexStart">
                    <div className="incomingMessage">
                      <p className="messageText">
                        Hey, are you available for that meeting today?
                      </p>
                    </div>
                  </div>
                  <div className="messageFlexEnd">
                    <div className="outgoingMessage">
                      <p className="messageText">
                        I'm in a client meeting until 3pm. I can join after that
                        or we can reschedule for tomorrow morning.
                      </p>
                      <div className="aiReplyInfo">
                        <SparklesIcon size={12} className="aiReplyIcon" />
                        <p className="aiReplyText">AI Reply</p>
                      </div>
                    </div>
                  </div>
                  <div className="messageFlexStart">
                    <div className="incomingMessage">
                      <p className="messageText">
                        Perfect, let's do 3:30pm then. I'll send a calendar
                        invite.
                      </p>
                    </div>
                  </div>
                  <div className="typingIndicatorContainer">
                    <div className="typingIndicatorLine"></div>
                    <span className="typingIndicatorText">
                      AI is typing...
                    </span>
                    <div className="typingIndicatorLine"></div>
                  </div>
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