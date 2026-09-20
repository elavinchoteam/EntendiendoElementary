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
                {speaker && <strong className="mr-1.5 font-bold">{speaker}:</strong>}
                {textEn}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={handleSpeak}
            className={`shrink-0 w-8 h-8 rounded-lg border flex items-center justify-center transition-all cursor-pointer ${
              isPlaying
                ? 'bg-indigo-600 border-indigo-600 text-white animate-pulse'
                : isDark
                ? 'bg-slate-800 border-slate-700 text-indigo-400 hover:bg-slate-700'
                : 'bg-indigo-50 border-indigo-200 text-indigo-700 hover:bg-indigo-100'
            }`}
            aria-label="Audio"
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>

        {/* Back Face: Spanish Translation (NO gradients, NO background image, NO flip text) */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 p-3.5 sm:p-4 flex items-center justify-between gap-3 overflow-hidden rounded-xl">
          <div className="flex-1 pr-2 flex items-center">
            {childrenBack ? (
              childrenBack
            ) : (
              <p className="text-sm sm:text-base font-medium leading-relaxed font-serif italic text-emerald-900 dark:text-emerald-300">
                {speaker && <strong className="mr-1.5 font-bold not-italic font-sans">{speaker}:</strong>}
                {textEs}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={handleSpeak}
            className={`shrink-0 w-8 h-8 rounded-lg border flex items-center justify-center transition-all cursor-pointer ${
              isPlaying
                ? 'bg-indigo-600 border-indigo-600 text-white animate-pulse'
                : isDark
                ? 'bg-slate-800 border-slate-700 text-emerald-400 hover:bg-slate-700'
                : 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100'
            }`}
            aria-label="Audio"
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
