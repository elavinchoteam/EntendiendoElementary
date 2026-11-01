import React, { useState } from 'react';
import { Volume2, RefreshCw } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { playFeedbackSound, speakEnglish, stopSpeaking } from '../../utils/audio';

interface ReversibleTextCardProps {
  textEn: string;
  textEs: string;
  speed?: number;
  accent?: 'US' | 'UK';
  className?: string;
  speakerGender?: 'male' | 'female';
}

export const ReversibleTextCard: React.FC<ReversibleTextCardProps> = ({
  textEn,
  textEs,
  speed = 1.0,
  accent = 'US',
  className = '',
  speakerGender = 'male',
}) => {
  const { isDark } = useTheme();
  const [isFlipped, setIsFlipped] = useState(false);

  const handleToggleFlip = (e: React.MouseEvent) => {
    e.stopPropagation();
    playFeedbackSound('click');
    setIsFlipped(!isFlipped);
  };

  const handlePlayAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    stopSpeaking();
    playFeedbackSound('click');
    speakEnglish(textEn, speed, accent, undefined, undefined, speakerGender === 'female' ? 'female' : 'male');
  };

  return (
    <div
      onClick={handleToggleFlip}
      className={`group relative rounded-xl border p-4 shadow-sm transition-all duration-300 hover:shadow-md cursor-pointer select-none ${
        isDark
          ? 'bg-slate-800/80 border-slate-700/80 hover:border-sky-500/50 text-slate-100'
          : 'bg-white border-slate-200/90 hover:border-sky-400 text-slate-800'
      } ${className}`}
    >
      <div className="flex items-center justify-between gap-3">
        {/* Content */}
        <div className="flex-1 pr-2">
          {!isFlipped ? (
            <p className="text-base font-medium leading-relaxed tracking-wide text-slate-900 dark:text-slate-100">
              {textEn}
            </p>
          ) : (
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Español
              </span>
              <p className="text-base font-medium leading-relaxed text-emerald-800 dark:text-emerald-200">
                {textEs}
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1.5 shrink-0" onClick={(e) => e.stopPropagation()}>
          {!isFlipped && (
            <button
              type="button"
              onClick={handlePlayAudio}
              className="p-2 rounded-lg text-slate-500 hover:text-sky-600 dark:text-slate-400 dark:hover:text-sky-400 hover:bg-sky-50 dark:hover:bg-sky-950/40 transition-colors"
              title="Escuchar en inglés"
              aria-label="Escuchar pronunciación"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          )}

          <button
            type="button"
            onClick={handleToggleFlip}
            className={`p-2 rounded-lg transition-colors ${
              isFlipped
                ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-400'
                : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/50'
            }`}
            title={isFlipped ? 'Ver en inglés' : 'Traducir al español'}
            aria-label="Traducir tarjeta"
          >
            <RefreshCw className={`w-4 h-4 transition-transform duration-300 ${isFlipped ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>
    </div>
  );
};
