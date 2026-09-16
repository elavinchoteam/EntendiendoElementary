import React from 'react';
import { SwimmingChoiceCard } from './SwimmingChoiceCard';
import { SWIMMING_ACT3_DATA } from '../../data/swimmingData';

interface SwimmingActivity3ChoiceProps {
  accent?: 'US' | 'UK';
  speechRate?: number;
  onComplete?: () => void;
}

export const SwimmingActivity3Choice: React.FC<SwimmingActivity3ChoiceProps> = ({
  accent = 'US',
  speechRate = 1.0,
  onComplete,
}) => {
  return (
    <SwimmingChoiceCard
      data={SWIMMING_ACT3_DATA}
      accent={accent}
      speechRate={speechRate}
      onComplete={onComplete}
    />
  );
};
