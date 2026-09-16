import React from 'react';
import { ComparativesMediaPlayerCard } from './ComparativesMediaPlayerCard';
import { ComparativesReversibleCard } from './ComparativesReversibleCard';
import { COMPARATIVES_ACTIVITY_1 } from '../../data/comparisonComparativesData';

export interface ComparativesActivity1ExploreProps {
  accent?: 'US' | 'UK';
  speechRate?: number;
}

export const ComparativesActivity1Explore: React.FC<ComparativesActivity1ExploreProps> = ({
  accent = 'US',
  speechRate = 1.0,
}) => {
  return (
    <div className="w-full flex flex-col gap-6 items-center">
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Column: Media Player (4:3 image, 00:00 / 00:06) */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <ComparativesMediaPlayerCard
            audioText={COMPARATIVES_ACTIVITY_1.audioText}
            accent={accent}
            speechRate={speechRate}
            durationSeconds={COMPARATIVES_ACTIVITY_1.durationSeconds}
            imageUrl={COMPARATIVES_ACTIVITY_1.imageUrl}
          />
        </div>

        {/* Right Column: Reversible Card (solid background, speaker icon button only, no flip hint) */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <ComparativesReversibleCard
            id="explore-card-comparatives-1"
            textEn={COMPARATIVES_ACTIVITY_1.textEn}
            textEs={COMPARATIVES_ACTIVITY_1.textEs}
            highlights={COMPARATIVES_ACTIVITY_1.highlights}
            speechRate={speechRate}
            accent={accent}
            minHeightClass="min-h-[140px] sm:min-h-[160px]"
          />
        </div>
      </div>
    </div>
  );
};
