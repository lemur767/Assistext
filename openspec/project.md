# Project Context

## Purpose
Assistext is an AI-powered assistant designed to help small businesses and individuals with high incoming SMS volume manage and reply to their clients efficiently.

## Tech Stack
- **Backend:** Python, Flask, PostgreSQL, SQLAlchemy, Gunicorn
- **Frontend:** TypeScript, React, Vite, Tailwind CSS
- **Key Libraries:** Flask-Limiter (Rate Limiting), PyJWT (Authentication)
- **External Services:** Stripe (Payments), SignalWire (SMS/Telephony)

## Project Conventions

### Code Style
- **Backend (Python):** Follows PEP 8 standards.
- **Frontend (TypeScript/React):** Follows standard modern React practices, enforced by ESLint and associated plugins for security and best practices.

### Architecture Patterns
- **Backend:** Monolithic Flask application featuring a distinct service layer for business logic and API blueprints for routing. It uses a PostgreSQL database via the SQLAlchemy ORM.
- **Frontend:** A modern Single-Page Application (SPA) built with Vite and React.

### Testing Strategy
- **Backend:** Testing is done using `pytest`.
- **Frontend:** Component and unit testing is done using `vitest` and React Testing Library.

### Git Workflow
- A simple feature-branch workflow is used, where branches are created for new features and merged into the main branch upon completion.
- CI/CD and other automations are handled via GitHub Actions.

## Domain Context
The core of the project is providing users with a dedicated phone number through which they can receive SMS messages. An AI assistant reads these incoming messages and generates replies. Users can customize the AI's tone and system prompt. The system is designed to handle conversations, manage contacts, and integrate with payment subscriptions.

## Important Constraints
- **Data Portability:** Users must have a setting or feature that allows them to download their complete conversation history from the database at any time.
- **Encryption:** The system must enforce end-to-end encryption for messages.
- **AI Transparency:** It must be made clear to the end-users of the SMS service that they are interacting with an AI. The application provides a user-configurable toggle for an "AI signature" on outbound messages, and this is outlined in the terms of service during signup.

## External Dependencies
- **Stripe:** Used for handling all customer subscriptions and payment processing.
- **SignalWire:** Used for provisioning phone numbers and sending/receiving SMS messages.
- **AI/LLM Provider:** The AI service is designed to be pluggable, supporting a local Ollama instance for development and a configurable production LLM provider.