import React from 'react';
import { WORK_DICTATION_1_ITEMS } from '../../data/workData';
import { DictationExerciseView } from './DictationExerciseView';

interface Activity3DictationWorkProps {
  speed?: number;
  accent?: 'US' | 'UK';
  onNext?: () => void;
}

export const Activity3DictationWork: React.FC<Activity3DictationWorkProps> = ({
  speed = 1.0,
  accent = 'US',
  onNext,
}) => {
  return (
    <DictationExerciseView
      activityNumber={3}
      items={WORK_DICTATION_1_ITEMS}
      speed={speed}
      accent={accent}
      sidebarStartIndex={0}
      onNext={onNext}
    />
  );
};
