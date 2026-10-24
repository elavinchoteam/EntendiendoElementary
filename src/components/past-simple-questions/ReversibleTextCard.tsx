import React, { useState } from 'react';
import { Volume2, RotateCcw, Languages } from 'lucide-react';
import { speakEnglish, stopSpeaking, playFeedbackSound } from '../../utils/audio';
import { useTheme } from '../../context/ThemeContext';

interface ReversibleTextCardProps {
  textEn: string;
  textEs: string;
  speed: number;
  accent?: 'US' | 'UK';
  childrenFront?: React.ReactNode;
  childrenBack?: React.ReactNode;
  className?: string;
  minHeightClass?: string;
  initialFlipped?: boolean;
}

export const ReversibleTextCard: React.FC<ReversibleTextCardProps> = ({
  textEn,
  textEs,
  speed,
  accent = 'US',
  childrenFront,
  childrenBack,
  className = '',
  minHeightClass = 'min-h-[140px]',
  initialFlipped = false,
}) => {
  const { isDark } = useTheme();
  const [isFlipped, setIsFlipped] = useState(initialFlipped);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleFlip = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    playFeedbackSound('click');
    setIsFlipped((prev) => !prev);
  };

  const handlePlayAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    stopSpeaking();
    playFeedbackSound('click');
    setIsPlaying(true);
    speakEnglish(
      textEn,
      speed,
      accent,
      () => setIsPlaying(true),
      () => setIsPlaying(false)
    );
  };

  return (
    <div
      className={`relative w-full perspective-1000 select-none group cursor-pointer ${className}`}
      onClick={() => handleFlip()}
    >
      <div
        className={`relative w-full rounded-2xl border transition-all duration-500 transform-style-3d shadow-sm hover:shadow-md ${minHeightClass} ${
          isFlipped ? 'rotate-y-180' : ''
        } ${
          isDark
            ? isFlipped
              ? 'bg-gradient-to-br from-emerald-950/60 to-slate-900 border-emerald-500/40 text-emerald-100'
              : 'bg-slate-900/90 border-slate-700/80 text-white hover:border-slate-600'
            : isFlipped
            ? 'bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-300 text-emerald-950 shadow-emerald-100/50'
            : 'bg-white border-slate-200 text-slate-900 hover:border-sky-300 shadow-slate-100'
        }`}
      >
        {/* FRONT FACE (English) */}
        <div
          className={`w-full h-full min-h-inherit p-3.5 sm:p-5 flex flex-col justify-between backface-hidden ${
            isFlipped ? 'pointer-events-none' : ''
          }`}
        >
          <div className="w-full flex-1 flex items-center justify-start">
            {childrenFront ? (
              childrenFront
            ) : (
              <p className="text-base sm:text-lg font-medium leading-relaxed tracking-wide text-slate-800 dark:text-slate-100">
                {textEn}
              </p>
            )}
          </div>

          <div
            className="w-full pt-3 mt-2 border-t border-slate-200/60 dark:border-slate-800/80 flex items-center justify-between text-xs font-mono"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={handlePlayAudio}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border font-semibold transition-all cursor-pointer ${
                isPlaying
                  ? 'bg-sky-600 text-white border-sky-600 animate-pulse'
                  : isDark
                  ? 'bg-slate-800 hover:bg-slate-700 text-sky-400 border-slate-700'
                  : 'bg-sky-50 hover:bg-sky-100 text-sky-700 border-sky-200'
              }`}
              title="Escuchar pronunciación"
            >
              <Volume2 className="w-4 h-4" />
              <span>Escuchar</span>
            </button>

            <button
              type="button"
              onClick={handleFlip}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                isDark
                  ? 'bg-slate-800/80 hover:bg-slate-700 text-slate-300 border-slate-700'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
              }`}
              title="Voltear para ver traducción en español"
            >
              <RotateCcw className="w-3.5 h-3.5 text-emerald-500" />
              <span className="font-sans font-medium text-xs">Traducción</span>
            </button>
          </div>
        </div>

        {/* BACK FACE (Spanish) */}
        <div
          className={`absolute inset-0 w-full h-full p-3.5 sm:p-5 flex flex-col justify-between backface-hidden rotate-y-180 overflow-y-auto no-scrollbar ${
            !isFlipped ? 'pointer-events-none' : ''
          }`}
        >
          <div className="w-full flex-1 flex items-center justify-start">
            {childrenBack ? (
              childrenBack
            ) : (
              <p className="text-base sm:text-lg font-serif italic leading-relaxed tracking-wide text-emerald-950 dark:text-emerald-200">
                {textEs}
              </p>
            )}
          </div>

          <div
            className="w-full pt-3 mt-2 border-t border-emerald-300/40 dark:border-emerald-700/40 flex items-center justify-between text-xs font-mono"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="inline-flex items-center gap-1.5 text-emerald-700 dark:text-emerald-300 font-serif italic text-xs">
              <Languages className="w-3.5 h-3.5" />
              <span>Español</span>
            </div>

            <button
              type="button"
              onClick={handleFlip}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                isDark
                  ? 'bg-emerald-900/40 hover:bg-emerald-800/50 text-emerald-200 border-emerald-700/50'
                  : 'bg-emerald-100/70 hover:bg-emerald-200 text-emerald-900 border-emerald-300'
              }`}
              title="Voltear para volver al ejercicio en inglés"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="font-sans font-medium text-xs">Volver a inglés</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
