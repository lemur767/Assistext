import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const TermsOfService: React.FC = () => {
  const [markdown, setMarkdown] = useState('');

  useEffect(() => {
    fetch('/terms_of_service.md')
      .then((response) => response.text())
      .then((text) => setMarkdown(text));
  }, []);

  return (
    <div className="prose lg:prose-xl mx-auto my-8">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
    </div>
  );
};

export default TermsOfService;
