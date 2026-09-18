import React from 'react';
import { SuperlativesMediaPlayerCard } from './SuperlativesMediaPlayerCard';
import { SuperlativesReversibleCard } from './SuperlativesReversibleCard';
import { SUPERLATIVES_ACTIVITY_1 } from '../../data/comparisonSuperlativesData';

export interface SuperlativesActivity1ExploreProps {
  accent?: 'US' | 'UK';
  speechRate?: number;
}

export const SuperlativesActivity1Explore: React.FC<SuperlativesActivity1ExploreProps> = ({
  accent = 'US',
  speechRate = 1.0,
}) => {
  return (
    <div className="w-full flex flex-col gap-6 items-center">
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Column: Media Player (Mad Mo's store, 00:00 / 00:07) */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <SuperlativesMediaPlayerCard
            audioText={SUPERLATIVES_ACTIVITY_1.audioText}
            accent={accent}
            speechRate={speechRate}
            durationSeconds={SUPERLATIVES_ACTIVITY_1.durationSeconds}
            imageUrl={SUPERLATIVES_ACTIVITY_1.imageUrl}
          />
        </div>

        {/* Right Column: Reversible Card (solid background, speaker icon button only, no flip hint) */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <SuperlativesReversibleCard
            id="explore-card-superlatives-1"
            textEn={SUPERLATIVES_ACTIVITY_1.textEn}
            textEs={SUPERLATIVES_ACTIVITY_1.textEs}
            highlights={SUPERLATIVES_ACTIVITY_1.highlights}
            speechRate={speechRate}
            accent={accent}
            minHeightClass="min-h-[140px] sm:min-h-[160px]"
          />
        </div>
      </div>
    </div>
  );
};
