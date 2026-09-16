import React from 'react';
import { Sports2StoryCard } from './Sports2StoryCard';
import { PEOPLE_CRAZY_ABOUT_SPORTS_STORY } from '../../data/peopleCrazyAboutSportsData';

interface Sports2Activity1StoryProps {
  accent?: 'US' | 'UK';
  speechRate?: number;
  onComplete?: () => void;
}

export const Sports2Activity1Story: React.FC<Sports2Activity1StoryProps> = ({
  accent = 'US',
  speechRate = 1.0,
}) => {
  return (
    <div className="w-full flex flex-col items-center gap-6 py-2">
      <Sports2StoryCard
        story={PEOPLE_CRAZY_ABOUT_SPORTS_STORY}
        accent={accent}
        speechRate={speechRate}
        compact={false}
      />
    </div>
  );
};
