import React from 'react';
import { SwimmingSpeechResponseCard } from './SwimmingSpeechResponseCard';
import { SWIMMING_ACT5_DATA } from '../../data/swimmingData';

interface SwimmingActivity5SpeechProps {
  accent?: 'US' | 'UK';
  speechRate?: number;
  onComplete?: () => void;
}

export const SwimmingActivity5Speech: React.FC<
  SwimmingActivity5SpeechProps
> = ({ accent = 'US', speechRate = 1.0, onComplete }) => {
  return (
    <SwimmingSpeechResponseCard
      data={SWIMMING_ACT5_DATA}
      accent={accent}
      speechRate={speechRate}
      onComplete={onComplete}
    />
  );
};
