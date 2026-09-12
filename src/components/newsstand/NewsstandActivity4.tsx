import React from 'react';
import { NewsstandRadioExercise } from './NewsstandRadioExercise';
import { ACTIVITY_4_DATA } from '../../data/newsstandData';

interface NewsstandActivity4Props {
  currentRate: number;
  onRateChange?: (rate: number) => void;
  accent?: 'US' | 'UK';
  onPlayAudio: (text: string, id: string, e?: React.MouseEvent) => void;
  playingSentenceId: string | null;
  onSuccess?: () => void;
}

export const NewsstandActivity4: React.FC<NewsstandActivity4Props> = (props) => {
  return (
    <NewsstandRadioExercise
      activityNumber={4}
      questionData={ACTIVITY_4_DATA}
      {...props}
    />
  );
};
