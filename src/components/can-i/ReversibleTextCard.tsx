import React, { useState } from 'react';
import { Volume2, RefreshCw } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { speakEnglish, stopSpeaking, playFeedbackSound } from '../../utils/audio';

interface ReversibleTextCardProps {
  speaker?: string;
  speakerGender?: 'male' | 'female';
  textEn: string;
  textEs: string;
  speed: number;
  accent?: 'US' | 'UK';
  className?: string;
  minHeightClass?: string;
  childrenFront?: React.ReactNode;
  childrenBack?: React.ReactNode;
  onPlayOverride?: () => void;
}

export const ReversibleTextCard: React.FC<ReversibleTextCardProps> = ({
  speaker,
  speakerGender = 'female',
  textEn,
  textEs,
  speed,
  accent = 'US',
  className = '',
  minHeightClass = 'min-h-[58px]',
  childrenFront,
  childrenBack,
  onPlayOverride,
}) => {
  const { isDark } = useTheme();
  const [isFlipped, setIsFlipped] = useState(false);

  const handleToggleFlip = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    playFeedbackSound('click');
    setIsFlipped((prev) => !prev);
  };

  const handlePlayAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    stopSpeaking();
    playFeedbackSound('click');
    if (onPlayOverride) {
      onPlayOverride();
    } else {
      speakEnglish(
        textEn,
        speed,
        accent,
        undefined,
        undefined,
        speakerGender === 'male' ? 'male' : 'female'
      );
    }
  };

  return (
    <div className={`w-full perspective-1000 ${minHeightClass} ${className}`}>
      <div
        className={`relative w-full h-full ${minHeightClass} transition-transform duration-500 transform-style-3d select-none rounded-2xl border ${
          isDark
            ? 'bg-slate-900 border-slate-700/80 text-slate-100 shadow-xs'
            : 'bg-white border-slate-200 text-slate-900 shadow-xs'
        } ${isFlipped ? 'rotate-y-180' : ''}`}
      >
        {/* FRONT: English */}
        <div className="w-full h-full backface-hidden p-3.5 sm:p-4 flex items-center justify-between gap-3 rounded-2xl">
          <div className="flex-1 min-w-0 pr-1">
            {speaker && (
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 block mb-0.5">
                {speaker}
              </span>
            )}
            {childrenFront || (
              <p className="text-xs sm:text-sm font-semibold leading-relaxed">
                {textEn}
              </p>
            )}
          </div>

          <div className="shrink-0 flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleToggleFlip}
              className={`w-8 h-8 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                isDark
                  ? 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700'
                  : 'bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
              }`}
              title="Voltear para ver traducción en español"
              aria-label="Voltear para ver traducción en español"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={handlePlayAudio}
              className={`w-8 h-8 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                isDark
                  ? 'bg-slate-800 border-slate-700 text-sky-400 hover:bg-slate-700 hover:text-sky-300'
                  : 'bg-slate-100 border-slate-200 text-sky-600 hover:bg-slate-200 hover:text-sky-700'
              }`}
              title="Escuchar pronunciación"
              aria-label="Escuchar pronunciación"
            >
              <Volume2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* BACK: Spanish */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 p-3.5 sm:p-4 flex items-center justify-between gap-3 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/40 border border-emerald-300 dark:border-emerald-700">
          <div className="flex-1 min-w-0 pr-1">
            {speaker && (
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300 block mb-0.5">
                {speaker} (Traducción)
              </span>
            )}
            {childrenBack || (
              <p className="text-xs sm:text-sm font-medium italic text-emerald-950 dark:text-emerald-100 leading-relaxed font-serif">
                {textEs}
              </p>
            )}
          </div>

          <div className="shrink-0 flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleToggleFlip}
              className="w-8 h-8 rounded-xl border border-emerald-400 bg-white dark:bg-slate-800 text-emerald-700 dark:text-emerald-300 flex items-center justify-center cursor-pointer hover:scale-105 transition-all shadow-xs"
              title="Voltear al frente"
              aria-label="Voltear al frente"
            >
              <RefreshCw className="w-3.5 h-3.5 rotate-180" />
            </button>

            <button
              type="button"
              onClick={handlePlayAudio}
              className="w-8 h-8 rounded-xl border border-emerald-400 bg-white dark:bg-slate-800 text-sky-600 dark:text-sky-400 flex items-center justify-center cursor-pointer hover:scale-105 transition-all shadow-xs"
              title="Escuchar inglés"
              aria-label="Escuchar inglés"
            >
              <Volume2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
