import React from 'react';
import { MessageSquareTextIcon, SparklesIcon } from 'lucide-react';
import styles from './HeroSection.module.css';

const HeroSection = () => {
  return (
    <section className={styles.section}>
      {/* Neon grid background effect */}
      <div className={styles.backgroundGrid}></div>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.textColumn}>
            <div className={styles.aiTag}>
              <SparklesIcon size={16} className={styles.aiTagIcon} />
              <span className={styles.aiTagText}>
                AI-Powered Text Automation
              </span>
            </div>
            <h1 className={styles.heading}>
              Never Miss a{' '}
              <span className={styles.headingHighlight}>
                Message
              </span>{' '}
              Again
            </h1>
            <p className={styles.description}>
              Our AI automatically responds to your incoming texts with
              personalized, context-aware replies while you focus on what
              matters.
            </p>
            <div className={styles.buttonsContainer}>
              <button className={styles.primaryButton}>
                Start Free Trial
              </button>
              <button className={styles.secondaryButton}>
                <MessageSquareTextIcon size={20} className={styles.secondaryButtonIcon} />
                See Demo
              </button>
            </div>
            <div className={styles.socialProof}>
              <div className={styles.avatars}>
                {[1, 2, 3, 4].map(i => (
                  <img key={i} src={`https://randomuser.me/api/portraits/men/${i + 20}.jpg`} alt="User" className={styles.avatar} />
                ))}
              </div>
              <div className={styles.rating}>
                <div className={styles.stars}>
                  {[1, 2, 3, 4, 5].map(star => (
                    <svg key={star} className={styles.starIcon} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className={styles.usersText}>Trusted by 5000+ users</p>
              </div>
            </div>
          </div>
          <div className={styles.chatColumn}>
            <div className={styles.chatCardWrapper}>
              <div className={styles.chatCardBlur}></div>
              <div className={styles.chatCard}>
                <div className={styles.chatHeader}>
                  <div className={styles.chatAvatarContainer}>
                    <div className={styles.chatAvatar}>
                      J
                    </div>
                    <div className={styles.chatUserName}>
                      <p>John Smith</p>
                      <p className={styles.chatUserStatus}>Online</p>
                    </div>
                  </div>
                  <div className={styles.chatAiStatus}>AI Responding</div>
                </div>
                <div className={styles.chatMessages}>
                  <div className={styles.messageFlexStart}>
                    <div className={styles.incomingMessage}>
                      <p className={styles.messageText}>
                        Hey, are you available for that meeting today?
                      </p>
                    </div>
                  </div>
                  <div className={styles.messageFlexEnd}>
                    <div className={styles.outgoingMessage}>
                      <p className={styles.messageText}>
                        I'm in a client meeting until 3pm. I can join after that
                        or we can reschedule for tomorrow morning.
                      </p>
                      <div className={styles.aiReplyInfo}>
                        <SparklesIcon size={12} className={styles.aiReplyIcon} />
                        <p className={styles.aiReplyText}>AI Reply</p>
                      </div>
                    </div>
                  </div>
                  <div className={styles.messageFlexStart}>
                    <div className={styles.incomingMessage}>
                      <p className={styles.messageText}>
                        Perfect, let's do 3:30pm then. I'll send a calendar
                        invite.
                      </p>
                    </div>
                  </div>
                  <div className={styles.typingIndicatorContainer}>
                    <div className={styles.typingIndicatorLine}></div>
                    <span className={styles.typingIndicatorText}>
                      AI is typing...
                    </span>
                    <div className={styles.typingIndicatorLine}></div>
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