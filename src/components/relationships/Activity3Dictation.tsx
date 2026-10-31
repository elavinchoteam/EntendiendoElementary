import React from 'react';
import { DictationExerciseView } from './DictationExerciseView';
import { DICTATION_PART_1 } from '../../data/relationshipsData';

interface Activity3DictationProps {
  accent: 'US' | 'UK';
  speechRate: number;
  onComplete?: () => void;
}

export const Activity3Dictation: React.FC<Activity3DictationProps> = ({
  accent,
  speechRate,
  onComplete,
}) => {
  return (
    <DictationExerciseView
      title="Dictation - Part 1"
      subtitle="Escucha con atención y escribe exactamente las frases que se reproducen (oraciones 1 a 5)."
      activityNumber={3}
      items={DICTATION_PART_1}
      accent={accent}
      speechRate={speechRate}
      onComplete={onComplete}
    />
  );
};
