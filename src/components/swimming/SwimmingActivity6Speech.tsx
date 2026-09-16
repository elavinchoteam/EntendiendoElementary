import React from 'react';
import { SwimmingSpeechResponseCard } from './SwimmingSpeechResponseCard';
import { SWIMMING_ACT6_DATA } from '../../data/swimmingData';

interface SwimmingActivity6SpeechProps {
  accent?: 'US' | 'UK';
  speechRate?: number;
  onComplete?: () => void;
}

export const SwimmingActivity6Speech: React.FC<
  SwimmingActivity6SpeechProps
> = ({ accent = 'US', speechRate = 1.0, onComplete }) => {
  return (
    <SwimmingSpeechResponseCard
      data={SWIMMING_ACT6_DATA}
      accent={accent}
      speechRate={speechRate}
      onComplete={onComplete}
    />
  );
};
