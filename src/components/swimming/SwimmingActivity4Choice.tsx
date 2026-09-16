import React from 'react';
import { SwimmingChoiceCard } from './SwimmingChoiceCard';
import { SWIMMING_ACT4_DATA } from '../../data/swimmingData';

interface SwimmingActivity4ChoiceProps {
  accent?: 'US' | 'UK';
  speechRate?: number;
  onComplete?: () => void;
}

export const SwimmingActivity4Choice: React.FC<SwimmingActivity4ChoiceProps> = ({
  accent = 'US',
  speechRate = 1.0,
  onComplete,
}) => {
  return (
    <SwimmingChoiceCard
      data={SWIMMING_ACT4_DATA}
      accent={accent}
      speechRate={speechRate}
      onComplete={onComplete}
    />
  );
};
