
import React from 'react';

interface SentimentIndicatorProps {
  sentiment: number | null;
}

const SentimentIndicator: React.FC<SentimentIndicatorProps> = ({ sentiment }) => {
  const getSentimentColor = () => {
    if (sentiment === null) return 'bg-gray-400';
    if (sentiment < -0.2) return 'bg-red-500';
    if (sentiment > 0.2) return 'bg-green-500';
    return 'bg-gray-400';
  };

  return (
    <span
      className={`h-2.5 w-2.5 rounded-full inline-block mr-2 ${getSentimentColor()}`}
    ></span>
  );
};

export default SentimentIndicator;
