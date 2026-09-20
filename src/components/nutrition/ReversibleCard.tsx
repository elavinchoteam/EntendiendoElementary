import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { speakEnglish, stopSpeaking } from '../../utils/audio';
import { useTheme } from '../../context/ThemeContext';

interface ReversibleCardProps {
  textEn: string;
  textEs: string;
  speed?: number;
  accent?: 'US' | 'UK';
  className?: string;
  minHeightClass?: string;
  childrenFront?: React.ReactNode;
  childrenBack?: React.ReactNode;
  audioTextEn?: string;
}

export const ReversibleCard: React.FC<ReversibleCardProps> = ({
  textEn,
  textEs,
  speed = 1.0,
  accent = 'US',
  className = '',
  minHeightClass = 'min-h-[110px]',
  childrenFront,
  childrenBack,
  audioTextEn,
}) => {
  const { isDark } = useTheme();
  const [isFlipped, setIsFlipped] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleToggleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  const handleAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPlaying) {
      stopSpeaking();
      setIsPlaying(false);
    } else {
      const textToSpeak = audioTextEn || textEn;
      setIsPlaying(true);
      speakEnglish(textToSpeak, speed, accent, () => {
        setIsPlaying(false);
      });
    }
  };

  return (
    <div
      onClick={handleToggleFlip}
      className={`group relative w-full cursor-pointer select-none [perspective:1000px] ${className}`}
    >
      <div
        className={`relative w-full transition-transform duration-500 [transform-style:preserve-3d] ${
          isFlipped ? '[transform:rotateY(180deg)]' : ''
        }`}
      >
        {/* FRONT SIDE (English) */}
        <div
          className={`w-full ${minHeightClass} rounded-2xl border p-5 flex flex-col justify-between [backface-visibility:hidden] transition-colors ${
            isDark
              ? 'bg-slate-900 border-slate-800 text-slate-100 shadow-md'
              : 'bg-white border-slate-200 text-slate-800 shadow-sm hover:border-slate-300'
          }`}
        >
          {/* Top row with Speaker button (ONLY icon, no text, no flip button) */}
          <div className="w-full flex items-center justify-end mb-2">
            <button
              type="button"
              onClick={handleAudio}
              className={`p-2 rounded-xl border transition-all cursor-pointer ${
                isPlaying
                  ? 'bg-emerald-500 text-white border-emerald-500 shadow-sm animate-pulse'
                  : isDark
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
              }`}
              title="Listen"
              aria-label="Listen"
            >
              {isPlaying ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>

          {/* Front Content */}
          <div className="w-full flex-1 flex flex-col justify-center">
            {childrenFront ? (
              childrenFront
            ) : (
              <p className="text-sm sm:text-base font-medium leading-relaxed">{textEn}</p>
            )}
          </div>
        </div>

        {/* BACK SIDE (Spanish Translation) */}
        <div
          className={`absolute inset-0 w-full h-full rounded-2xl border p-5 flex flex-col justify-between [backface-visibility:hidden] [transform:rotateY(180deg)] transition-colors ${
            isDark
              ? 'bg-slate-900 border-emerald-800/80 text-emerald-300 shadow-md'
              : 'bg-white border-emerald-300 text-emerald-950 shadow-sm'
          }`}
        >
          {/* Top row with Speaker button */}
          <div className="w-full flex items-center justify-end mb-2">
            <button
              type="button"
              onClick={handleAudio}
              className={`p-2 rounded-xl border transition-all cursor-pointer ${
                isPlaying
                  ? 'bg-emerald-500 text-white border-emerald-500 shadow-sm animate-pulse'
                  : isDark
                  ? 'bg-slate-800 hover:bg-slate-700 text-emerald-400 border-emerald-800'
                  : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-emerald-200'
              }`}
              title="Listen"
              aria-label="Listen"
            >
              {isPlaying ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>

          {/* Back Content */}
          <div className="w-full flex-1 flex flex-col justify-center">
            {childrenBack ? (
              childrenBack
            ) : (
              <p className="text-sm sm:text-base font-serif italic leading-relaxed text-emerald-900 dark:text-emerald-300">
                {textEs}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
