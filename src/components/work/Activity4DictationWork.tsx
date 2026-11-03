import React from 'react';
import { WORK_DICTATION_2_ITEMS } from '../../data/workData';
import { DictationExerciseView } from './DictationExerciseView';

interface Activity4DictationWorkProps {
  speed?: number;
  accent?: 'US' | 'UK';
  onNext?: () => void;
}

export const Activity4DictationWork: React.FC<Activity4DictationWorkProps> = ({
  speed = 1.0,
  accent = 'US',
  onNext,
}) => {
  return (
    <DictationExerciseView
      activityNumber={4}
      items={WORK_DICTATION_2_ITEMS}
      speed={speed}
      accent={accent}
      sidebarStartIndex={5}
      onNext={onNext}
    />
  );
};
