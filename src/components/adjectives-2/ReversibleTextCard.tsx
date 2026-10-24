import React, { useState } from 'react';
import { Volume2, RefreshCw } from 'lucide-react';
import { speakEnglish, stopSpeaking, playFeedbackSound } from '../../utils/audio';
import { useTheme } from '../../context/ThemeContext';

interface ReversibleTextCardProps {
  textEn: string;
  textEs: string;
  speaker?: string;
  speed: number;
  accent?: 'US' | 'UK';
  className?: string;
  minHeightClass?: string;
  childrenFront?: React.ReactNode;
  childrenBack?: React.ReactNode;
  showFlipButton?: boolean;
}

export const ReversibleTextCard: React.FC<ReversibleTextCardProps> = ({
  textEn,
  textEs,
  speaker,
  speed = 1.0,
  accent = 'US',
  className = '',
  minHeightClass = 'min-h-[60px]',
  childrenFront,
  childrenBack,
  showFlipButton = true,
}) => {
  const { isDark } = useTheme();
  const [isFlipped, setIsFlipped] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleToggleFlip = () => {
    playFeedbackSound('click');
    setIsFlipped((prev) => !prev);
  };

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPlaying) {
      stopSpeaking();
      setIsPlaying(false);
      return;
    }
    playFeedbackSound('click');
    speakEnglish(
      textEn,
      speed,
      accent,
      () => setIsPlaying(true),
      () => setIsPlaying(false)
    );
  };

  return (
    <div className={`w-full perspective-1000 ${className}`}>
      <div
        role="region"
        aria-label="Tarjeta reversible de traducción"
        className={`relative w-full ${minHeightClass} transition-transform duration-500 transform-style-3d select-none rounded-xl border ${
          isDark
            ? 'bg-slate-900 border-slate-700 text-slate-100 shadow-md'
            : 'bg-white border-slate-200 text-slate-900 shadow-sm'
        } ${isFlipped ? 'rotate-y-180' : ''}`}
      >
        {/* Front Face: English / Interactive Slot */}
        <div className="w-full h-full backface-hidden p-3.5 sm:p-4 flex items-center justify-between gap-3 overflow-hidden rounded-xl">
          <div className="flex-1 pr-2 flex items-center min-w-0">
            {childrenFront ? (
              childrenFront
            ) : (
              <p className="text-sm sm:text-base font-medium leading-relaxed">
                {speaker && <strong className="mr-1.5 font-bold">{speaker}:</strong>}
                {textEn}
              </p>
            )}
          </div>

          <div className="shrink-0 flex items-center gap-1.5">
            {showFlipButton && (
              <button
                type="button"
                onClick={handleToggleFlip}
                className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-all cursor-pointer ${
                  isDark
                    ? 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700'
                    : 'bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                }`}
                title="Voltear para ver traducción en español"
                aria-label="Voltear tarjeta"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            )}

            <button
              type="button"
              onClick={handleSpeak}
              className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-all cursor-pointer ${
                isPlaying
                  ? 'bg-sky-600 border-sky-600 text-white animate-pulse'
                  : isDark
                  ? 'bg-slate-800 border-slate-700 text-sky-400 hover:bg-slate-700'
                  : 'bg-sky-50 border-sky-200 text-sky-700 hover:bg-sky-100'
              }`}
              aria-label="Escuchar audio"
              title="Escuchar audio"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Back Face: Spanish Translation */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 p-3.5 sm:p-4 flex items-center justify-between gap-3 overflow-hidden rounded-xl bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800">
          <div className="flex-1 pr-2 flex items-center min-w-0">
            {childrenBack ? (
              childrenBack
            ) : (
              <p className="text-sm sm:text-base font-medium leading-relaxed font-serif italic text-emerald-950 dark:text-emerald-300">
                {speaker && (
                  <strong className="mr-1.5 font-bold not-italic font-sans text-emerald-900 dark:text-emerald-200">
                    {speaker}:
                  </strong>
                )}
                {textEs}
              </p>
            )}
          </div>

          <div className="shrink-0 flex items-center gap-1.5">
            {showFlipButton && (
              <button
                type="button"
                onClick={handleToggleFlip}
                className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-all cursor-pointer ${
                  isDark
                    ? 'bg-slate-800 border-emerald-700 text-emerald-300 hover:bg-slate-700'
                    : 'bg-emerald-100 border-emerald-300 text-emerald-800 hover:bg-emerald-200'
                }`}
                title="Voltear a inglés"
                aria-label="Voltear a inglés"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            )}

            <button
              type="button"
              onClick={handleSpeak}
              className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-all cursor-pointer ${
                isPlaying
                  ? 'bg-sky-600 border-sky-600 text-white animate-pulse'
                  : isDark
                  ? 'bg-slate-800 border-slate-700 text-emerald-400 hover:bg-slate-700'
                  : 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100'
              }`}
              aria-label="Escuchar audio"
              title="Escuchar audio"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
