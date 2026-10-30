import React from 'react';
import {
  FAMILY_PICNIC_STORY_PARAGRAPHS,
} from '../../data/familyPicnicData';
import { useTheme } from '../../context/ThemeContext';
import { FamilyPicnicStoryCard } from './FamilyPicnicStoryCard';
import { ReversibleTextCard } from './ReversibleTextCard';

interface Activity1ExploreProps {
  speed: number;
  accent?: 'US' | 'UK';
}

export const Activity1Explore: React.FC<Activity1ExploreProps> = ({
  speed,
  accent = 'US',
}) => {
  const { isDark } = useTheme();

  return (
    <div className="w-full flex flex-col gap-5 animate-in fade-in duration-200">
      {/* 1. Instruction Card: Reversible */}
      <ReversibleTextCard
        textEn="Read the story 'The Family Picnic'. Listen to the audio and click sentences to practice."
        textEs="Lee la historia 'The Family Picnic'. Escucha el audio y toca las oraciones para practicar."
        speed={speed}
        accent={accent}
      />

      {/* 2. Main Layout: Story on left, Paragraph exploration on right */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Story Card */}
        <div className="lg:col-span-6">
          <FamilyPicnicStoryCard speed={speed} accent={accent} />
        </div>

        {/* Right Column: Paragraph Exploration List with Reversible Cards */}
        <div className="lg:col-span-6 flex flex-col gap-3 max-h-[700px] overflow-y-auto pr-1">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
            <h3 className="text-sm font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 font-mono">
              Párrafos de la Historia (8)
            </h3>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Toca 🔄 para ver traducción
            </span>
          </div>

          <div className="space-y-3">
            {FAMILY_PICNIC_STORY_PARAGRAPHS.map((p, idx) => (
              <div key={p.id} className="relative">
                <ReversibleTextCard
                  speaker={`Párrafo ${idx + 1}`}
                  textEn={p.en}
                  textEs={p.es}
                  speed={speed}
                  accent={accent}
                  minHeightClass="min-h-[74px]"
                  className="hover:border-sky-300 dark:hover:border-sky-600 transition-colors"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
