import React from 'react';
import { SwimmingChoiceCard } from './SwimmingChoiceCard';
import { SWIMMING_ACT2_DATA } from '../../data/swimmingData';

interface SwimmingActivity2ChoiceProps {
  accent?: 'US' | 'UK';
  speechRate?: number;
  onComplete?: () => void;
}

export const SwimmingActivity2Choice: React.FC<SwimmingActivity2ChoiceProps> = ({
  accent = 'US',
  speechRate = 1.0,
  onComplete,
}) => {
  return (
    <SwimmingChoiceCard
      data={SWIMMING_ACT2_DATA}
      accent={accent}
      speechRate={speechRate}
      onComplete={onComplete}
    />
  );
};
