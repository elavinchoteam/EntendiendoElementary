import React from 'react';
import { NewsstandRadioExercise } from './NewsstandRadioExercise';
import { ACTIVITY_3_DATA } from '../../data/newsstandData';

interface NewsstandActivity3Props {
  currentRate: number;
  onRateChange?: (rate: number) => void;
  accent?: 'US' | 'UK';
  onPlayAudio: (text: string, id: string, e?: React.MouseEvent) => void;
  playingSentenceId: string | null;
  onSuccess?: () => void;
}

export const NewsstandActivity3: React.FC<NewsstandActivity3Props> = (props) => {
  return (
    <NewsstandRadioExercise
      activityNumber={3}
      questionData={ACTIVITY_3_DATA}
      {...props}
    />
  );
};
