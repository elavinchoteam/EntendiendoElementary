import React from 'react';
import { DictationExerciseView } from './DictationExerciseView';
import { DICTATION_PART_2 } from '../../data/relationshipsData';

interface Activity4DictationProps {
  accent: 'US' | 'UK';
  speechRate: number;
  onComplete?: () => void;
}

export const Activity4Dictation: React.FC<Activity4DictationProps> = ({
  accent,
  speechRate,
  onComplete,
}) => {
  return (
    <DictationExerciseView
      title="Dictation - Part 2"
      subtitle="Escucha con atención y escribe exactamente las frases que se reproducen (oraciones 6 a 10)."
      activityNumber={4}
      items={DICTATION_PART_2}
      accent={accent}
      speechRate={speechRate}
      onComplete={onComplete}
    />
  );
};
