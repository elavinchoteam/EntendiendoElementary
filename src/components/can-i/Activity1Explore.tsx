import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { CAN_I_DIALOGUE } from '../../data/canIData';
import { CanIScenePlayer } from './CanIScenePlayer';
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
        textEn="Watch the scene and listen to the dialogue between Tommy and his mother at the train station."
        textEs="Mira la escena y escucha el diálogo entre Tommy y su madre en la estación de trenes."
        speed={speed}
        accent={accent}
      />

      {/* 2. Main Two-Column Layout */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Scene Player with Image & Timeline Controls & Transcript */}
        <div className="lg:col-span-6">
          <CanIScenePlayer
            speed={speed}
            accent={accent}
            highlightedLineId="turn-1"
            showTranscriptInitially={true}
          />
        </div>

        {/* Right Column: Exploration Cards for each sentence */}
        <div className="lg:col-span-6 flex flex-col gap-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
            <h3 className="text-sm font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 font-mono">
              Líneas del Diálogo (4)
            </h3>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Toca 🔄 para voltear a español
            </span>
          </div>

          <div className="space-y-3">
            {CAN_I_DIALOGUE.map((turn, idx) => {
              const isTommy = turn.speaker === 'Tommy';
              return (
                <ReversibleTextCard
                  key={turn.id}
                  speaker={`${turn.speakerLabel} (${idx + 1}/4)`}
                  speakerGender={isTommy ? 'male' : 'female'}
                  textEn={turn.en}
                  textEs={turn.es}
                  speed={speed}
                  accent={accent}
                  minHeightClass="min-h-[72px]"
                  className="hover:border-sky-300 dark:hover:border-sky-600 transition-colors shadow-xs"
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
