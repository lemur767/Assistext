### **Assistext Product Requirements Document (PRD)**

#### **Goals and Background Context**

*   **Goals**
    *   Provide a secure and private communication channel for service professionals.
    *   Reduce the stress and anxiety associated with managing high volumes of text messages.
    *   Increase the efficiency and booking rates for users.
    *   Provide a simple and affordable solution for solo entrepreneurs and small businesses.
*   **Background Context**
    *   Assistext is an AI-powered SMS agent designed to help service professionals and busy businesses manage high volumes of incoming text messages. The application provides a "ghost" phone number to protect users' privacy and uses AI to automatically respond to messages in the user's style. The primary goal is to alleviate the stress and disorganization caused by a flooded inbox, allowing users to focus on their core business and improve their customer service.
*   **Change Log**
    | Date | Version | Description | Author |
    | :--- | :--- | :--- | :--- |
    | 2025-09-01 | 1.0 | Initial draft | John (PM) |

---

### **Requirements**

#### **Functional Requirements**

*   **FR1:** Users must be able to create an account and sign up for the service.
*   **FR2:** The system must provision a new, unique phone number ("ghost number") for each user upon signup.
*   **FR3:** The system must be able to receive incoming SMS messages sent to the ghost number.
*   **FR4:** The system must use an AI model to generate and send automated responses to incoming SMS messages.
*   **FR5:** The AI model must be able to learn from a user's provided text message examples to influence its response style.
    *   **FR5.1:** The system must provide a clear and simple way for users to upload their past text message examples (e.g., by uploading a text file or pasting content into a text box).
*   **FR6:** Users must be able to view the conversations their AI agent is having through a web interface.
*   **FR7:** The system must integrate with Stripe to handle monthly subscriptions.
*   **FR8:** The system must have two subscription tiers (Basic and Pro) with different restrictions and overage charges.
    *   **FR8.1 (Basic Tier):** Includes the core AI auto-response functionality with a limited number of messages per month.
    *   **FR8.2 (Pro Tier):** Includes all Basic features, a higher message limit, and advanced AI features such as more in-depth style training and the ability to change the AI's personality.
*   **FR9:** The system must offer a 14-day free trial for new users.

#### **Non-Functional Requirements**

*   **NFR1:** AI responses should be generated and sent in under 2 seconds to maintain a conversational flow.
*   **NFR2:** The system must be hosted in a secure VPC, with the LLM service only accessible from the backend.
*   **NFR3:** All user data, especially personal phone numbers and message content, must be encrypted at rest and in transit.
*   **NFR4:** The application must be built with standard web application security best practices (OWASP Top 10).
*   **NFR5:** The production infrastructure should be cost-effective, aligning with the "as cheap as possible" budget constraint.
*   **NFR6:** The user interface should be intuitive and easy to use for non-technical users.
    *   **NFR6.1:** A new user should be able to complete the onboarding process and have their AI agent active in under 5 minutes.

---

### **User Interface Design Goals**

#### **Overall UX Vision**
A clean, minimalist, and discreet user interface that feels safe, private, and empowering. The design will be geared towards a female audience, avoiding overly "techy" or cluttered layouts. **"Discreet"** means the UI will use the defined dark theme and will not be intrusive, with notifications kept to a minimum. **"Empowering"** means giving the user clear visibility and simple, direct control over the AI's settings and behavior.

#### **Key Interaction Paradigms**
*   **Onboarding Wizard:** A simple, step-by-step guide to get a new user set up with their ghost number and initial AI training.
*   **Conversation Feed:** A familiar, chat-style interface (like iMessage or WhatsApp) for monitoring the AI's conversations.
*   **"Set it and forget it" model:** The primary interaction should be the initial setup. To balance this with the need for oversight, the system will include a **"smart" notification system** that only alerts the user to conversations that might require their attention (e.g., based on keywords or sentiment).

#### **Core Screens and Views**
*   **Login/Signup Screen:** Simple and secure account creation.
*   **Onboarding/Setup Wizard:** To get the ghost number and provide initial training data.
*   **Dashboard/Conversation Feed:** The main screen to monitor ongoing conversations.
*   **Settings Page:** To manage subscription, upload new training data, and adjust AI personality (for Pro users).

#### **Accessibility**
*   **Accessibility:** WCAG AA

#### **Branding**
*   **Font:** Space Grotesk.
*   **Color Palette:** The UI will feature a dark theme with a modern and vibrant color palette:
    *   Text: `#f1f5f9`
    *   Background: `#0f172a`
    *   Border: `#1e3a8a`
    *   Primary: `#61e2ff` (cyan)
    *   Secondary: `#FF61E2` (pink)
    *   Accent: `#E2FF61` (lime green)
*   **Gradients:** The UI will make use of linear and radial gradients to create a dynamic and visually interesting experience.

#### **Target Device and Platforms**
*   **Target Device and Platforms:** Mobile-first Web Responsive

---

### **Technical Assumptions**

*   **Repository Structure:** Polyrepo (separate repositories for frontend and backend).
*   **Service Architecture:** To be determined during the architecture phase. The initial approach will likely be a **monolith** for the MVP to maintain simplicity, with the potential for evolving into microservices as the platform grows.
*   **Languages & Frameworks:**
    *   **Frontend:** React with TypeScript and CSS Modules.
    *   **Backend:** Python with the Flask framework.
*   **Database:** Supabase (PostgreSQL).
*   **Infrastructure & Deployment:**
    *   **Hosting:** Three Virtual Private Servers (VPS) within a Virtual Private Cloud (VPC) for production (Frontend, Backend, LLM).
    *   **LLM Serving:** Ollama will be used to serve the self-hosted Large Language Model.
*   **Key APIs & Integrations:**
    *   **Telephony/SMS:** Signalwire.
    *   **Payments:** Stripe.
*   **Testing Requirements:** The testing strategy for the MVP will focus on **Unit Tests only** to ensure individual components and functions work as expected, aligning with the goal of a lean and fast development cycle.

---

### **Epic List**

*   **Epic 1: Foundation & User Onboarding:** Establish the core project infrastructure, user authentication, and the complete user onboarding flow to get a ghost number.
*   **Epic 2: Core AI Messaging:** Implement the core AI-powered messaging functionality, including receiving messages, generating responses with style mimicking, and sending them.
*   **Epic 3: Conversation Monitoring & Subscriptions:** Build the user-facing dashboard to monitor conversations and integrate the Stripe subscription and payment system.

---

### **Epic Details**

#### **Epic 1: Foundation & User Onboarding**
**Goal:** This epic focuses on establishing the foundational infrastructure for the Assistext application. This includes setting up the project repositories, creating a secure user authentication system, and building the complete onboarding flow that allows a new user to sign up and successfully provision their first ghost phone number. By the end of this epic, the core user-facing shell of the application will be in place, ready for the AI messaging features.

*   **Story 1.1: Project Setup & "Hello World"**
    *   As a developer, I want to set up the initial frontend and backend repositories with basic CI/CD, so that we have a stable foundation for future development and a "hello world" page is deployed.
    *   **Acceptance Criteria:**
        1.  A public-facing "hello world" or landing page is deployed and accessible.
        2.  Frontend and backend repositories are created with basic linting and testing configurations.
        3.  A basic CI/CD pipeline is in place to automatically deploy changes to a staging environment.
*   **Story 1.2 (Revised): User Account & Stripe Customer Creation**
    *   As a new user, I want to sign up for an account and have a customer profile created in the payment system, so that I can access the service and easily manage my subscription later.
    *   **Acceptance Criteria:**
        1.  A user can navigate to a signup page.
        2.  A user can enter their email and a password to create an account.
        3.  The system securely stores the user's credentials.
        4.  Upon successful account creation, the system interacts with the **Stripe API to create a new Customer object**.
        5.  The returned **Stripe Customer ID is saved** and associated with the user's account in our database.
        6.  The user is logged in and redirected to the dashboard after successful signup.
*   **Story 1.3: User Login & Logout**
    *   As a registered user, I want to be able to log in and out of my account, so that I can securely access my Assistext dashboard.
    *   **Acceptance Criteria:**
        1.  A user can navigate to a login page.
        2.  A user can enter their email and password to log in.
        3.  The user is redirected to the dashboard after a successful login.
        4.  A logged-in user has a clear way to log out of their session.
*   **Story 1.4 (Revised): Ghost Number & Subproject Provisioning**
    *   As a new user, I want my own private "ghost" phone number to be provisioned within its own Signalwire subproject, so that all my messaging activity is properly isolated and tracked.
    *   **Acceptance Criteria:**
        1.  After signing up, the user is presented with an onboarding flow to get a ghost number.
        2.  The system interacts with the Signalwire API to **create a new, dedicated subproject** for the user.
        3.  The system then finds and purchases a new phone number **and assigns it to that subproject**.
        4.  The new ghost number and subproject ID are associated with the user's account in our database.
        5.  The user is shown their new ghost number on the dashboard.

#### **Epic 2: Core AI Messaging**
**Goal:** This epic is the heart of the Assistext application. It focuses on implementing the end-to-end AI messaging pipeline. This includes receiving incoming SMS messages via Signalwire webhooks, passing them to the AI model for processing, generating a context-aware and stylistically appropriate response, and sending that response back to the end-user. By the end of this epic, the application will be able to have a basic, automated conversation.

*   **Story 2.1 (Revised): Inbound Message Webhook**
    *   As a developer, I want to create a secure webhook endpoint to receive incoming SMS messages from Signalwire, so that the application is aware of new messages sent to the user's ghost number.
    *   **Acceptance Criteria:**
        1.  A webhook endpoint is created in the backend application.
        2.  The endpoint is configured in the Signalwire subproject for the user's ghost number to receive incoming SMS.
        3.  The endpoint can successfully receive and parse the message data (from, to, body) from the Signalwire webhook.
        4.  The incoming message is associated with the correct user account based on the "to" number.
        5.  The message content is saved to the database.
        6.  **Note:** The implementation must follow the specific webhook handling mechanism recommended by the official Signalwire documentation for receiving SMS messages.
*   **Story 2.2: AI Response Generation**
    *   As a backend developer, I want to integrate with the Ollama LLM to generate a response to an incoming message, so that the AI can formulate a reply.
    *   **Acceptance Criteria:**
        1.  The backend can make a request to the Ollama LLM server.
        2.  The request includes the incoming message content and any relevant conversation history.
        3.  The backend can receive and parse the generated text response from the LLM.
        4.  The generated response is saved to the database.
*   **Story 2.3: Outbound Message Sending**
    *   As a backend developer, I want to send the AI-generated response as an SMS message via Signalwire, so that the end-user receives the AI's reply.
    *   **Acceptance Criteria:**
        1.  The backend can make a request to the Signalwire API to send an SMS message.
        2.  The request includes the AI-generated response, the user's ghost number as the "from" number, and the end-user's number as the "to" number.
        3.  The system correctly handles any success or error responses from the Signalwire API.
*   **Story 2.4: Basic Style Mimicking**
    *   As a user, I want to upload a text file of my past conversations, so that the AI can use it to learn my communication style.
    *   **Acceptance Criteria:**
        1.  The user interface has a simple file upload component on the settings page.
        2.  The backend can receive and store the uploaded text file.
        3.  The AI response generation process (Story 2.2) is updated to include the content of this file as context in the prompt to the LLM.
        4.  The AI's responses should qualitatively reflect the style of the uploaded text.

#### **Epic 3: Conversation Monitoring & Subscriptions**
**Goal:** This epic focuses on building the user-facing dashboard to monitor conversations and integrating the Stripe subscription and payment system. By the end of this epic, the MVP will be feature-complete, allowing users to see the value of the service and allowing the business to monetize it.

*   **Story 3.1: Conversation View**
    *   As a user, I want to see a list of all the conversations my AI agent is having, so that I can monitor the AI's performance and ensure the quality of the interactions.
    *   **Acceptance Criteria:**
        1.  The dashboard displays a list of conversations, showing the contact number and a snippet of the last message.
        2.  Conversations are sorted with the most recent at the top.
        3.  Clicking on a conversation opens a detailed view of all messages in that thread.
        4.  The detailed view clearly distinguishes between incoming messages and AI-generated responses.
*   **Story 3.2: Subscription Plan Selection**
    *   As a new user, I want to be able to choose between the Basic and Pro subscription plans during my trial period, so that I can select the plan that best fits my needs.
    *   **Acceptance Criteria:**
        1.  A "Subscription" or "Billing" page is available in the user settings.
        2.  The page clearly displays the features and pricing of the Basic and Pro tiers.
        3.  The user can select which plan they would like to subscribe to.
*   **Story 3.3: Stripe Payment Integration**
    *   As a user, I want to be able to securely enter my payment information to pay for my subscription, so that I can continue using the service after my trial ends.
    *   **Acceptance Criteria:**
        1.  The application integrates with Stripe to handle payments.
        2.  When a user decides to subscribe, they are presented with a secure Stripe payment form (e.g., Stripe Elements or Checkout).
        3.  The application can successfully process a test payment via Stripe.
        4.  Upon successful payment, the user's account is marked as "active" with the selected subscription plan.
        5.  The system handles payment failures gracefully and provides clear feedback to the user.
*   **Story 3.4: Trial Period Management**
    *   As a developer, I want the system to manage the 14-day trial period for new users, so that users are prompted to subscribe before their trial expires.
    *   **Acceptance Criteria:**
        1.  When a user signs up, their trial expiration date (14 days from signup) is recorded.
        2.  The UI displays how many days are left in the user's trial period.
        3.  If a user's trial expires and they have not subscribed, their access to the service is restricted (e.g., the AI stops responding to messages).
        4.  The user is clearly notified when their trial has expired and prompted to subscribe.

---

### **Checklist Results Report**

*   **Executive Summary:**
    *   **Overall PRD Completeness:** 90%
    *   **MVP Scope Appropriateness:** Just Right
    *   **Readiness for Architecture Phase:** Ready
    *   **Most Critical Gaps or Concerns:** None. The few areas marked as "PARTIAL" (e.g., explicit user flows, detailed data models) are appropriate to be defined during the architecture and design phase.
*   **Category Statuses:**
    | Category | Status | Critical Issues |
    | :--- | :--- | :--- |
    | 1. Problem Definition & Context | PASS | |
    | 2. MVP Scope Definition | PASS | |
    | 3. User Experience Requirements | PARTIAL | User flows are implied but not explicitly documented. This is acceptable for the architect to define. |
    | 4. Functional Requirements | PASS | |
    | 5. Non-Functional Requirements | PARTIAL | Reliability and operational requirements are not explicitly detailed, but are implied. Acceptable for this stage. |
    | 6. Epic & Story Structure | PASS | |
    | 7. Technical Guidance | PASS | |
    | 8. Cross-Functional Requirements | PARTIAL | Data models are not defined. This is an architectural task. |
    | 9. Clarity & Communication | PASS | |
*   **Final Decision:** **READY FOR ARCHITECT**

---

### **Next Steps**

#### **UX Expert Prompt**
"Hello, Sally. We have a complete Product Requirements Document for a new application called Assistext. Please review the 'User Interface Design Goals' section and the overall product vision to create a `front-end-spec.md` that will guide the UI/UX design."

#### **Architect Prompt**
"Hello, Winston. We have a complete Product Requirements Document for a new application called Assistext. Please review it thoroughly, especially the 'Technical Assumptions' and 'Epic Details' sections, to create a comprehensive `architecture.md` document for the MVP."
