## Research Prompt 1: Signalwire and Stripe Terms of Service Compliance

### Research Objective

To identify any clauses in Signalwire and Stripe's terms of service that could impact Assistext's business model or user privacy, inform decisions on whether Assistext can proceed with these providers and if product features need adjustment, and provide a clear summary of all relevant clauses and a risk assessment for each identified issue.

### Background Context

Assistext is an AI-powered SMS agent designed to help service professionals and busy businesses manage high volumes of incoming text messages. The application provides a "ghost" phone number to protect users' privacy and uses AI to automatically respond to messages in the user's style. The primary goal is to alleviate the stress and disorganization caused by a flooded inbox, allowing users to focus on their core business and improve their customer service. This research is critical to ensure compliance and mitigate potential legal or operational risks associated with our chosen third-party providers.

### Research Questions

#### Primary Questions (Must Answer)

1.  What are the key data privacy clauses in Signalwire's Terms of Service and Privacy Policy?
2.  What are the key data privacy clauses in Stripe's Terms of Service and Privacy Policy?
3.  Do Signalwire's and Stripe's terms of service allow for the storage and processing of sensitive user communication data as planned by Assistext?
4.  Are there any clauses that restrict the use of AI for automated responses based on user data?
5.  What are the implications of these terms for Assistext's business model and user privacy?

#### Secondary Questions (Nice to Have)

1.  Are there any specific compliance requirements (e.g., GDPR, CCPA) mentioned in their terms that Assistext needs to adhere to?
2.  What are their data retention policies?
3.  What are their policies regarding data breaches and notifications?

### Research Methodology

#### Information Sources

*   Thorough review of official Signalwire Terms of Service, Privacy Policy, and any relevant developer documentation.
*   Thorough review of official Stripe Terms of Service, Privacy Policy, and any relevant developer documentation.
*   Search for legal analyses or summaries of Signalwire and Stripe terms from reputable legal or industry sources.
*   Review relevant industry regulations and legal precedents related to data privacy and AI in communication (e.g., GDPR, CCPA, specific communication laws).

#### Analysis Frameworks

*   **Comparative Analysis:** Compare relevant clauses across Signalwire and Stripe, and against Assistext's planned data handling practices.
*   **Risk Assessment Matrix:** Identify potential risks (e.g., non-compliance, service interruption, data breach liability) and assess their likelihood and impact on Assistext.
*   **Compliance Checklist:** Develop a checklist of key data privacy regulations and cross-reference it with provider terms to identify gaps or conflicts.

### Data Requirements

*   Quality: Official, up-to-date documents from Signalwire and Stripe.
*   Recency: Latest versions of all terms and policies.
*   Credibility: Information from official sources or reputable legal/industry analysts.

### Expected Deliverables

#### Executive Summary

*   Key findings and insights
*   Critical implications
*   Recommended actions

#### Detailed Analysis

*   Summary of Relevant Clauses: A clear, concise summary of all terms of service and privacy policy clauses relevant to data privacy, AI usage, and data handling for both Signalwire and Stripe.
*   Risk Assessment: A documented assessment of potential legal, compliance, and operational risks identified from the terms, including their likelihood and impact on Assistext.
*   Recommendations: Actionable recommendations for Assistext to ensure compliance and mitigate identified risks (e.g., specific product features, legal counsel review, user consent flows).
*   Decision-Support Elements: Clear answers to the "Key Decisions" identified in the Research Objectives.

### Supporting Materials

*   Data tables comparing clauses.
*   Risk assessment matrices.
*   Links to all source documentation.

### Success Criteria

The research will be successful if it clearly identifies any clauses that could impact Assistext's business model or user privacy, informs decisions on whether Assistext can proceed with these providers and if product features need adjustment, and provides a clear summary of all relevant clauses and a risk assessment for each identified issue.

### Timeline and Priority

This is the first priority research task.

---

## Research Prompt 2: Data Privacy and Security Best Practices

### Research Objective

To identify and document industry-standard data privacy and security measures relevant to Assistext, inform Assistext's security architecture choices, user data handling policies, and compliance strategies, and provide a comprehensive list of applicable best practices and prioritized recommendations for implementation.

### Background Context

Assistext is an AI-powered SMS agent designed to help service professionals and busy businesses manage high volumes of incoming text messages. The application handles sensitive user communication data, including personal phone numbers and message content. This research is crucial to ensure the platform is built with robust data privacy and security measures from the outset, mitigating risks and building user trust. The focus is on SMS communication data, excluding physical security of data centers.

### Research Questions

#### Primary Questions (Must Answer)

1.  What are the industry best practices for securing SMS communication data at rest and in transit?
2.  What are the best practices for anonymizing or pseudonymizing sensitive user communication data?
3.  What are the recommended security measures for protecting AI models and their training data from unauthorized access or manipulation?
4.  What are the best practices for user authentication and authorization in applications handling sensitive communication data?
5.  What are the key considerations for data retention and deletion policies in compliance with privacy regulations?

#### Secondary Questions (Nice to Have)

1.  Are there any specific certifications or standards (e.g., ISO 27001, SOC 2) that are highly recommended for this type of application?
2.  What are the best practices for incident response and breach notification in the context of communication platforms?
3.  How can we ensure the privacy of the "ghost number" and prevent its misuse?

### Research Methodology

#### Information Sources

*   Review industry standards and guidelines (e.g., NIST Cybersecurity Framework, OWASP Top 10, ISO 27001).
*   Consult academic papers and research on data privacy in AI and communication.
*   Examine best practices from similar applications or platforms (e.g., secure messaging apps, AI-driven customer service platforms).
*   Review relevant legal and regulatory guidance on data privacy (e.g., GDPR, CCPA, HIPAA if applicable).

#### Analysis Frameworks

*   **Gap Analysis:** Compare Assistext's current or planned security posture against identified best practices and standards.
*   **Threat Modeling:** Identify potential threats to data privacy and security within the application's architecture and data flows.
*   **Privacy by Design Principles:** Evaluate how best practices can be integrated into the product development lifecycle from the outset.

### Data Requirements

*   Quality: Reputable industry standards, academic research, and legal guidance.
*   Recency: Latest versions of standards and up-to-date research.
*   Credibility: Information from official bodies, peer-reviewed sources, or recognized security experts.

### Expected Deliverables

#### Executive Summary

*   Key findings and insights
*   Prioritized best practices
*   Recommended actions

#### Detailed Analysis

*   Comprehensive List of Best Practices: A categorized list of data privacy and security best practices relevant to Assistext, including their rationale and applicability.
*   Prioritized Recommendations: Actionable recommendations for implementing these best practices, prioritized by impact and feasibility.
*   Risk Mitigation Strategies: Specific strategies for mitigating identified data privacy and security risks.
*   Compliance Roadmap (Initial): An initial outline of steps required to achieve compliance with relevant data privacy regulations.

### Supporting Materials

*   Tables comparing security measures.
*   Diagrams illustrating data flows and security controls.
*   Links to all source documentation.

### Success Criteria

The research will be successful if it clearly identifies and documents industry-standard data privacy and security measures relevant to Assistext, informs Assistext's security architecture choices, user data handling policies, and compliance strategies, and provides a comprehensive list of applicable best practices and prioritized recommendations for implementation.

### Timeline and Priority

This is the second priority research task.

---

## Research Prompt 3: Unfiltered LLM Models for Budget VPS

### Research Objective

To identify suitable open-source LLM models that can be self-hosted on a budget VPS for Assistext's AI agent, inform which LLM model to use for the MVP, Assistext's LLM hosting strategy, and budget allocation for LLM infrastructure, and provide a ranked list of viable LLM models with their pros and cons, and cost estimates for hosting each model.

### Background Context

Assistext is an AI-powered SMS agent that requires an LLM to generate responses. To maintain cost-effectiveness and control over the model, the preference is for self-hosting unfiltered, open-source models on a budget Virtual Private Server (VPS) using Ollama. This research aims to identify the most suitable models and hosting strategies that align with these constraints, specifically excluding models requiring dedicated GPUs.

### Research Questions

#### Primary Questions (Must Answer)

1.  What are the leading open-source, unfiltered LLM models compatible with Ollama?
2.  What are the minimum hardware requirements (RAM, CPU, storage) for running these models effectively on a budget VPS?
3.  What are the estimated monthly costs for hosting these models on various budget VPS providers?
4.  How do these models perform in terms of response quality, speed, and style mimicking capabilities relevant to Assistext's needs?
5.  What are the licensing implications for commercial use of these models?

#### Secondary Questions (Nice to Have)

1.  Are there any community benchmarks or real-world performance data available for these models on budget VPS environments?
2.  What are the typical setup and maintenance efforts required for each model on a VPS?
3.  Are there any known limitations or challenges with using these models for conversational AI in a production environment?

### Research Methodology

#### Information Sources

*   Review Ollama documentation and model libraries to identify compatible models.
*   Explore LLM model repositories (e.g., Hugging Face, GitHub) for open-source, unfiltered models.
*   Consult online forums, communities (e.g., Reddit, Discord), and technical blogs for discussions on budget VPS hosting and LLM performance.
*   Research pricing and specifications of various budget VPS providers (e.g., DigitalOcean, Linode, Vultr) for their offerings suitable for LLM hosting.
*   Review academic papers and benchmarks on LLM performance on constrained hardware.

#### Analysis Frameworks

*   **Comparative Matrix:** Create a matrix comparing viable LLM models based on criteria such as model size, performance (qualitative and quantitative), resource requirements, and licensing.
*   **Cost-Benefit Analysis:** Evaluate the trade-offs between model performance, hosting costs, and ease of deployment/maintenance.
*   **Performance Benchmarking (Conceptual):** Outline a plan for conceptual benchmarking of selected models on a budget VPS, if feasible.

### Data Requirements

*   Quality: Official model documentation, reputable community discussions, and VPS provider specifications.
*   Recency: Latest model versions and current VPS pricing.
*   Credibility: Information from official bodies, peer-reviewed sources, and recognized security experts.

### Expected Deliverables

#### Executive Summary

*   Key findings and insights
*   Most suitable LLM models and hosting strategies
*   Key recommendations

#### Detailed Analysis

*   Ranked List of Viable LLM Models: A prioritized list of open-source, unfiltered LLM models compatible with Ollama and suitable for budget VPS hosting, with a summary of their pros, cons, and key characteristics.
*   Estimated Hosting Costs: Detailed cost estimates for running the top recommended models on various budget VPS providers.
*   Performance Expectations: Realistic expectations for model performance (speed, quality) on budget VPS hardware.
*   Licensing Summary: A clear summary of licensing terms for commercial use of the recommended models.
*   Recommendations: Actionable recommendations for the optimal LLM model and hosting strategy for Assistext's MVP.

### Supporting Materials

*   Comparison tables for models and VPS providers.
*   Cost breakdown charts.
*   Links to all source documentation.

### Success Criteria

The research will be successful if it clearly identifies suitable open-source LLM models that can be self-hosted on a budget VPS for Assistext's AI agent, informs which LLM model to use for the MVP, Assistext's LLM hosting strategy, and budget allocation for LLM infrastructure, and provides a ranked list of viable LLM models with their pros and cons, and cost estimates for hosting each model.

### Timeline and Priority

This is the third priority research task.
