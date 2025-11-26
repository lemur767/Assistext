import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import Markdown from 'react-native-markdown-display';

const markdownContent = `
# Privacy Policy

**Last Updated: October 9, 2025**

This Privacy Policy describes how Assistext ("we," "us," or "our") collects, uses, and discloses your personal information when you use our website, services, and applications (collectively, the "Service").

## 1. Information We Collect

We may collect the following types of information:

*   **Personal Information:** When you register for an account, we may collect your name, email address, and other contact information.
*   **Message Content:** To provide the Service, we need to process the content of the messages you send and receive. For Pro users who opt-in to the style mimicking feature, we will analyze your sent messages to train our AI.
*   **Usage Information:** We may collect information about how you use the Service, such as the features you use and the time and date of your use.

## 2. How We Use Your Information

We may use your information for the following purposes:

*   To provide and maintain the Service.
*   To improve the Service and to develop new features.
*   To communicate with you about the Service.
*   To enforce our Terms of Service.

## 3. AI and Your Data

Our Service uses artificial intelligence to generate messages. If you are a Pro user and you opt-in to the style mimicking feature, we will use the content of your sent messages to train our AI to mimic your writing style. We will not use your message content for any other purpose without your consent.

## 4. Data Security

We take reasonable measures to protect your personal information from unauthorized access, use, or disclosure. However, no method of transmission over the Internet or method of electronic storage is 100% secure.

## 5. Data Retention

We will retain your personal information for as long as is necessary to provide the Service and to comply with our legal obligations.

## 6. Your Choices

You may have certain rights regarding your personal information, such as the right to access, correct, or delete your information. Please contact us to exercise these rights.

## 7. Changes to This Privacy Policy

We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.

## 8. Contact Us

If you have any questions about this Privacy Policy, please contact us at [Your Contact Information].
`;

const PrivacyPolicy: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <Markdown style={markdownStyles}>
        {markdownContent}
      </Markdown>
    </ScrollView>
  );
};

const markdownStyles = {
  heading1: {
    fontSize: 24,
    fontWeight: 'bold' as 'bold',
    marginBottom: 10,
  },
  heading2: {
    fontSize: 20,
    fontWeight: 'bold' as 'bold',
    marginTop: 15,
    marginBottom: 10,
  },
  strong: {
    fontWeight: 'bold' as 'bold',
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
});

export default PrivacyPolicy;
