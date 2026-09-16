import React from 'react';
import { ComparisonMediaPlayerCard } from './ComparisonMediaPlayerCard';
import { ComparisonReversibleCard } from './ComparisonReversibleCard';
import { COMPARISON_ACTIVITY_1 } from '../../data/comparisonEqualityData';

export interface ComparisonActivity1ExploreProps {
  accent?: 'US' | 'UK';
  speechRate?: number;
}

export const ComparisonActivity1Explore: React.FC<ComparisonActivity1ExploreProps> = ({
  accent = 'US',
  speechRate = 1.0,
}) => {
  return (
    <div className="w-full flex flex-col gap-6 items-center">
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Column: Media Player (4:3 image, 00:00 / 00:05) */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <ComparisonMediaPlayerCard
            audioText={COMPARISON_ACTIVITY_1.audioText}
            accent={accent}
            speechRate={speechRate}
            durationSeconds={COMPARISON_ACTIVITY_1.durationSeconds}
            imageUrl={COMPARISON_ACTIVITY_1.imageUrl}
          />
        </div>

        {/* Right Column: Reversible Card (solid background, speaker icon button only) */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <ComparisonReversibleCard
            id="explore-card-1"
            textEn={COMPARISON_ACTIVITY_1.textEn}
            textEs={COMPARISON_ACTIVITY_1.textEs}
            highlights={COMPARISON_ACTIVITY_1.highlights}
            speechRate={speechRate}
            accent={accent}
            minHeightClass="min-h-[140px] sm:min-h-[160px]"
          />
        </div>
      </div>
    </div>
  );
};
