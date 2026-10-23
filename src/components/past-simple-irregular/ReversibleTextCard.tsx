import React, { useState } from 'react';
import { Volume2 } from 'lucide-react';
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
}

export const ReversibleTextCard: React.FC<ReversibleTextCardProps> = ({
  textEn,
  textEs,
  speaker,
  speed = 1.0,
  accent = 'US',
  className = '',
  minHeightClass = 'min-h-[58px]',
  childrenFront,
  childrenBack,
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
        role="button"
        tabIndex={0}
        onClick={handleToggleFlip}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleToggleFlip();
          }
        }}
        className={`relative w-full ${minHeightClass} transition-transform duration-500 transform-style-3d cursor-pointer select-none rounded-xl border ${
          isDark
            ? 'bg-slate-900 border-slate-700 text-slate-100 shadow-md'
            : 'bg-white border-slate-200 text-slate-900 shadow-sm'
        } ${isFlipped ? 'rotate-y-180' : ''}`}
      >
        {/* Front Face: English */}
        <div className="absolute inset-0 w-full h-full backface-hidden p-3.5 sm:p-4 flex items-center justify-between gap-3 overflow-hidden rounded-xl">
          <div className="flex-1 pr-2 flex items-center">
            {childrenFront ? (
              childrenFront
            ) : (
              <p className="text-sm sm:text-base font-medium leading-relaxed">
                {speaker && (
                  <span className="font-bold text-sky-600 dark:text-sky-400 mr-2">
                    {speaker}:
                  </span>
                )}
                {textEn}
              </p>
            )}
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={handleSpeak}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                isPlaying
                  ? 'bg-sky-500 text-white animate-pulse'
                  : isDark
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
              }`}
              title="Escuchar pronunciación"
              aria-label="Escuchar pronunciación"
            >
              <Volume2 className="w-4 h-4" />
            </button>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">
              EN
            </span>
          </div>
        </div>

        {/* Back Face: Spanish Translation */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 p-3.5 sm:p-4 flex items-center justify-between gap-3 overflow-hidden rounded-xl bg-gradient-to-r from-sky-500/10 via-emerald-500/10 to-transparent">
          <div className="flex-1 pr-2 flex items-center">
            {childrenBack ? (
              childrenBack
            ) : (
              <p className="text-sm sm:text-base font-medium leading-relaxed text-sky-950 dark:text-sky-200">
                {speaker && (
                  <span className="font-bold text-sky-700 dark:text-sky-300 mr-2">
                    {speaker}:
                  </span>
                )}
                {textEs}
              </p>
            )}
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 bg-sky-100 dark:bg-sky-950/60 px-2 py-0.5 rounded border border-sky-300/40 shrink-0">
            ES
          </span>
        </div>
      </div>
    </div>
  );
};
