import React from 'react';

interface SentimentIndicatorProps {
  sentiment: number | null;
}

const SentimentIndicator: React.FC<SentimentIndicatorProps> = ({ sentiment }) => {
  const getSentimentColor = () => {
    if (sentiment === null) return 'var(--muted-foreground)';
    if (sentiment < -0.2) return '#EF4444'; // red for negative
    if (sentiment > 0.2) return 'var(--secondary)'; // secondary for positive
    return 'var(--accent)'; // accent for neutral
  };

  return (
    <div style={{
      width: '0.5rem',
      height: '0.5rem',
      borderRadius: '50%',
      backgroundColor: getSentimentColor(),
      flexShrink: 0
    }} />
  );
};

export default SentimentIndicator;
