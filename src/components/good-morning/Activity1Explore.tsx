import React, { useState } from 'react';
import { Volume2, RefreshCw } from 'lucide-react';
import { GOOD_MORNING_TRANSCRIPT, GoodMorningSentence } from '../../data/goodMorningData';
import { useTheme } from '../../context/ThemeContext';
import { GoodMorningVideoPlayer } from './GoodMorningVideoPlayer';
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
  const [showTranscript, setShowTranscript] = useState(true);

  return (
    <div className="w-full flex flex-col gap-5 animate-in fade-in duration-200">
      {/* 1. Instruction Card: Reversible */}
      <ReversibleTextCard
        textEn="Explore the conversation. Watch the video and listen to the dialogue."
        textEs="Explora la conversación. Mira el video y escucha el diálogo."
        speed={speed}
        accent={accent}
      />

      {/* 2. Main Two-Column Layout */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Video Player with optional transcript */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          <GoodMorningVideoPlayer
            speed={speed}
            accent={accent}
            showTranscript={showTranscript}
            onToggleTranscript={() => setShowTranscript((prev) => !prev)}
            highlightedLineId="s1"
          />
        </div>

        {/* Right Column: Reversible Dialogue Lines */}
        <div className="lg:col-span-7 flex flex-col gap-3 max-h-[700px] overflow-y-auto pr-1">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
            <h3 className="text-sm font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 font-mono">
              Diálogo Completo (12 Líneas)
            </h3>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Toca el botón 🔄 para ver la traducción
            </span>
          </div>

          <div className="space-y-3">
            {GOOD_MORNING_TRANSCRIPT.map((sentence, idx) => (
              <div key={sentence.id} className="relative">
                <ReversibleTextCard
                  speaker={sentence.speaker}
                  textEn={sentence.en}
                  textEs={sentence.es}
                  speed={speed}
                  accent={accent}
                  minHeightClass="min-h-[64px]"
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
