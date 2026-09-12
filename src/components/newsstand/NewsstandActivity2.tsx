import React from 'react';
import { NewsstandRadioExercise } from './NewsstandRadioExercise';
import { ACTIVITY_2_DATA } from '../../data/newsstandData';

interface NewsstandActivity2Props {
  currentRate: number;
  onRateChange?: (rate: number) => void;
  accent?: 'US' | 'UK';
  onPlayAudio: (text: string, id: string, e?: React.MouseEvent) => void;
  playingSentenceId: string | null;
  onSuccess?: () => void;
}

export const NewsstandActivity2: React.FC<NewsstandActivity2Props> = (props) => {
  return (
    <NewsstandRadioExercise
      activityNumber={2}
      questionData={ACTIVITY_2_DATA}
      {...props}
    />
  );
};
