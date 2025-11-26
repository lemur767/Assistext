# Feature Specification: Ghost Number & Subproject Provisioning

**Feature Branch**: `003-ghost-number-provisioning`  
**Created**: 2025-09-09  
**Status**: Final  
**Input**: User description: "Ghost Number & Subproject Provisioning, as per Story 1.4 in PRD"

---

## User Scenarios & Testing *(mandatory)*

### Primary User Story
As a new user who has just signed up, I want the system to automatically provision a private "ghost" phone number for me within its own isolated subproject, so that my messaging activity is secure and correctly tracked.

### Acceptance Scenarios
1. **Given** a new user has just completed the signup process, **When** they land on the dashboard for the first time, **Then** the system initiates the provisioning of a new ghost number.
2. **Given** the provisioning process is initiated, **When** it completes successfully, **Then** the user's new ghost number is displayed on their dashboard, and it is associated with their account in the database.
3. **Given** the provisioning process fails, **When** the user is on the dashboard, **Then** a clear error message is displayed, and the user is given an option to retry the provisioning process.

### Edge Cases
- What happens if there are no phone numbers available from Signalwire to purchase? The system should inform the user and perhaps have a process to notify them when numbers are available.
- What happens if the Signalwire API is down or returns an error during subproject creation or number purchase? The system should handle the error gracefully and allow the user to retry.

## Requirements *(mandatory)*

### Functional Requirements
- **FR-001**: System MUST trigger the ghost number provisioning process for a new user after they sign up.
- **FR-002**: System MUST interact with the Signalwire API to create a new, dedicated subproject for the user.
- **FR-003**: System MUST interact with the Signalwire API to find and purchase a new phone number.
- **FR-004**: System MUST assign the newly purchased phone number to the user's dedicated subproject.
- **FR-005**: System MUST store the new ghost number and the Signalwire subproject ID in the database, associated with the user's account.
- **FR-006**: System MUST display the user's new ghost number on their dashboard.
- **FR-007**: System MUST handle and log any errors from the Signalwire API during this process.
- **FR-008**: System MUST provide a manual button for the user to re-attempt the provisioning process if it fails.

### Key Entities *(include if feature involves data)*
- **Ghost Number**: Represents a phone number provisioned from Signalwire for a user. Attributes include the phone number itself and the associated Signalwire subproject ID.

---