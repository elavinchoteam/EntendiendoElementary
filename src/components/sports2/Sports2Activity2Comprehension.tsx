import React from 'react';
import { SPORTS2_ACT2_QUESTIONS } from '../../data/peopleCrazyAboutSportsData';
import { Sports2ComprehensionView } from './Sports2ComprehensionView';

interface Sports2ActivityProps {
  accent?: 'US' | 'UK';
  speechRate?: number;
  onComplete?: () => void;
}

export const Sports2Activity2Comprehension: React.FC<Sports2ActivityProps> = ({
  accent = 'US',
  speechRate = 1.0,
  onComplete,
}) => {
  return (
    <Sports2ComprehensionView
      questions={SPORTS2_ACT2_QUESTIONS}
      accent={accent}
      speechRate={speechRate}
      onComplete={onComplete}
    />
  );
};
