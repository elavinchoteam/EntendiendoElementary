import React, { useState } from 'react';
import { Volume2, RefreshCw, Eye, Sparkles } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { speakEnglish, stopSpeaking, playFeedbackSound } from '../../utils/audio';
import { LostReportVideoPlayer } from './LostReportVideoPlayer';
import { LostReportDialogueScript } from './LostReportDialogueScript';

interface Activity1ExploreProps {
  speed?: number;
  accent?: 'US' | 'UK';
}

export const Activity1Explore: React.FC<Activity1ExploreProps> = ({
  speed = 1.0,
  accent = 'US',
}) => {
  const { isDark } = useTheme();

  // Instruction flip
  const [isHeaderFlipped, setIsHeaderFlipped] = useState(false);
  const [currentTimeSec, setCurrentTimeSec] = useState(0);
  const [isTranscriptVisible, setIsTranscriptVisible] = useState(true);

  const instructionEn = 'Watch the video and listen carefully to the conversation between Adam and Karen. Click on any sentence to hear it or flip to see the Spanish translation.';
  const instructionEs = 'Mira el video y escucha atentamente la conversación entre Adam y Karen. Haz clic en cualquier frase para escucharla o voltéala para ver la traducción al español.';

  const handleToggleHeaderFlip = () => {
    playFeedbackSound('click');
    setIsHeaderFlipped((prev) => !prev);
  };

  const handlePlayInstruction = (e: React.MouseEvent) => {
    e.stopPropagation();
    stopSpeaking();
    playFeedbackSound('click');
    speakEnglish(instructionEn, speed, accent);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-4">
      {/* Reversible Instruction Header Card */}
      <div
        className={`p-3.5 sm:p-4 rounded-2xl border transition-all shadow-xs ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        }`}
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 text-[11px] font-bold rounded-md bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 uppercase tracking-wider font-mono">
                Actividad 1 · Exploración & Video
              </span>
              <span className="text-xs text-slate-400 font-medium hidden sm:inline">
                {isHeaderFlipped ? 'Español' : 'English'}
              </span>
            </div>
            {!isHeaderFlipped ? (
              <p className="text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200 leading-relaxed">
                {instructionEn}
              </p>
            ) : (
              <p className="text-xs sm:text-sm font-medium italic text-emerald-800 dark:text-emerald-300 leading-relaxed font-serif">
                {instructionEs}
              </p>
            )}
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={handleToggleHeaderFlip}
              className={`w-8 h-8 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                isHeaderFlipped
                  ? 'bg-emerald-500 text-white border-emerald-600 shadow-sm'
                  : isDark
                  ? 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
                  : 'bg-slate-100 border-slate-200 text-slate-700 hover:text-slate-900'
              }`}
              title="Voltear instrucción al español"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isHeaderFlipped ? 'rotate-180' : ''}`} />
            </button>
            <button
              type="button"
              onClick={handlePlayInstruction}
              className={`w-8 h-8 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                isDark
                  ? 'bg-slate-800 border-slate-700 text-sky-400 hover:text-white'
                  : 'bg-slate-100 border-slate-200 text-sky-600 hover:text-sky-800'
              }`}
              title="Escuchar instrucción"
            >
              <Volume2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Video on Left, Dialogue Script on Right (as in screenshot) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column: Video Player */}
        <div className="lg:col-span-6 space-y-3">
          <LostReportVideoPlayer
            onTimeUpdate={setCurrentTimeSec}
            isTranscriptVisible={isTranscriptVisible}
            onToggleTranscript={() => setIsTranscriptVisible((prev) => !prev)}
          />
        </div>

        {/* Right Column: Interactive Script with Karaoke & Translation */}
        <div className="lg:col-span-6">
          {isTranscriptVisible && (
            <LostReportDialogueScript
              currentTimeSec={currentTimeSec}
              speed={speed}
              accent={accent}
            />
          )}
        </div>
      </div>
    </div>
  );
};
