# Feature Specification: Inbound Message Webhook

**Feature Branch**: `004-inbound-message-webhook`  
**Created**: 2025-09-09  
**Status**: Final  
**Input**: User description: "Inbound Message Webhook, as per Story 2.1 in PRD"

---

## User Scenarios & Testing *(mandatory)*

### Primary User Story
As a developer, I want to create a secure webhook endpoint to receive incoming SMS messages from Signalwire, so that the application is aware of new messages sent to the user's ghost number.

### Acceptance Scenarios
1. **Given** a user's ghost number is configured with a webhook URL, **When** Signalwire receives an SMS to that number, **Then** Signalwire sends a POST request to the configured webhook endpoint.
2. **Given** the webhook endpoint receives a valid request from Signalwire, **When** the request is processed, **Then** the message content (from, to, body) is parsed and saved to the database, associated with the correct user account.
3. **Given** the webhook endpoint receives an invalid or unauthenticated request, **When** the request is processed, **Then** the system rejects the request with an appropriate error code and logs the event.

### Edge Cases
- What happens if the database is unavailable when a webhook is received? The system will return an error to Signalwire, relying on Signalwire's built-in retry mechanism to re-send the webhook.
- How does the system handle a high volume of concurrent webhook requests? The system will be designed for a baseline throughput, with performance monitoring in place to identify and address bottlenecks as they arise.

## Requirements *(mandatory)*

### Functional Requirements
- **FR-001**: System MUST expose a secure webhook endpoint to receive incoming SMS messages from Signalwire.
- **FR-002**: The endpoint MUST be configurable in the Signalwire subproject for each ghost number.
- **FR-003**: The endpoint MUST parse the message data (from, to, body) from the Signalwire webhook payload.
- **FR-004**: The endpoint MUST identify the correct user account based on the "to" number (the ghost number).
- **FR-005**: The endpoint MUST save the incoming message content to the database.
- **FR-006**: The endpoint MUST implement cryptographic signature verification using the subproject's assigned auth token to verify that incoming webhooks are genuinely from Signalwire.

### Key Entities *(include if feature involves data)*
- **Message**: Represents an SMS message received by the system. Attributes include the sender's number, the recipient's number (ghost number), the message content, and a timestamp.

---