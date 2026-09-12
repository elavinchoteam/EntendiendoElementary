import React from 'react';
import { NewsstandRadioExercise } from './NewsstandRadioExercise';
import { ACTIVITY_5_DATA } from '../../data/newsstandData';

interface NewsstandActivity5Props {
  currentRate: number;
  onRateChange?: (rate: number) => void;
  accent?: 'US' | 'UK';
  onPlayAudio: (text: string, id: string, e?: React.MouseEvent) => void;
  playingSentenceId: string | null;
  onSuccess?: () => void;
}

export const NewsstandActivity5: React.FC<NewsstandActivity5Props> = (props) => {
  return (
    <NewsstandRadioExercise
      activityNumber={5}
      questionData={ACTIVITY_5_DATA}
      {...props}
    />
  );
};
