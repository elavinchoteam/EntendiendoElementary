import React, { useState } from 'react';
import { Volume2, RotateCw, Sparkles } from 'lucide-react';
import { speakEnglish, stopSpeaking } from '../../utils/audio';
import { useTheme } from '../../context/ThemeContext';

interface ReversibleTextCardProps {
  englishText: string;
  spanishText: string;
  grammarTip?: string;
  speechRate?: number;
  accent?: 'US' | 'UK';
  speakerGender?: 'male' | 'female';
  showEnglishOnFront?: boolean;
  frontLabel?: string;
  backLabel?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const ReversibleTextCard: React.FC<ReversibleTextCardProps> = ({
  englishText,
  spanishText,
  grammarTip,
  speechRate = 1.0,
  accent = 'US',
  speakerGender,
  showEnglishOnFront = true,
  frontLabel = 'Inglés (Original)',
  backLabel = 'Traducción al Español',
  size = 'md',
}) => {
  const { isDark } = useTheme();
  const [isFlipped, setIsFlipped] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    stopSpeaking();
    setIsPlaying(true);
    const gender = speakerGender === 'male' || speakerGender === 'female' ? speakerGender : undefined;
    speakEnglish(englishText, speechRate, accent, undefined, () => setIsPlaying(false), gender);
  };

  const handleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  const padClass = size === 'sm' ? 'p-3 text-sm' : size === 'lg' ? 'p-5 text-base' : 'p-4 text-sm';

  return (
    <div className="w-full select-none" style={{ perspective: '1000px' }}>
      <div
        onClick={handleFlip}
        className={`relative w-full rounded-2xl border transition-transform duration-500 cursor-pointer shadow-sm hover:shadow-md ${padClass} ${
          isDark
            ? 'bg-slate-800/90 border-slate-700 hover:border-slate-600'
            : 'bg-white border-slate-200 hover:border-slate-300'
        }`}
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          minHeight: size === 'sm' ? '88px' : '108px',
        }}
      >
        {/* FRONT */}
        <div
          className={`flex flex-col justify-between h-full w-full ${isFlipped ? 'invisible' : 'visible'}`}
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="flex items-center justify-between pb-2 mb-1 border-b border-slate-100 dark:border-slate-700/60">
            <span className="text-[11px] font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3" />
              {showEnglishOnFront ? frontLabel : backLabel}
            </span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handleAudio}
                className={`p-1.5 rounded-lg transition-colors ${
                  isPlaying
                    ? 'bg-sky-500 text-white animate-pulse'
                    : isDark
                    ? 'bg-slate-700 text-sky-400 hover:bg-slate-600'
                    : 'bg-sky-50 text-sky-600 hover:bg-sky-100'
                }`}
                title="Reproducir pronunciación"
              >
                <Volume2 className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleFlip();
                }}
                className={`p-1.5 rounded-lg transition-colors flex items-center gap-1 text-xs font-semibold ${
                  isDark ? 'bg-slate-700 text-slate-300 hover:bg-slate-600' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
                title="Voltear para ver traducción"
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span className="text-[11px] hidden sm:inline">Traducir</span>
              </button>
            </div>
          </div>

          <div className="py-1">
            <p className={`font-medium leading-relaxed ${isDark ? 'text-slate-100' : 'text-slate-800'}`}>
              {showEnglishOnFront ? englishText : spanishText}
            </p>
          </div>

          <div className="pt-2 mt-1 flex items-center justify-between text-[11px] text-slate-400">
            <span className="italic">Toca la tarjeta para ver traducción en español</span>
            <span className="font-mono text-[10px] bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded">
              3D Flip
            </span>
          </div>
        </div>

        {/* BACK (Rotated 180deg) */}
        <div
          className={`absolute inset-0 flex flex-col justify-between ${padClass} ${
            isFlipped ? 'visible' : 'invisible'
          }`}
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <div className="flex items-center justify-between pb-2 mb-1 border-b border-emerald-100 dark:border-emerald-800/60">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3" />
              Traducción en Español
            </span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handleAudio}
                className={`p-1.5 rounded-lg transition-colors ${
                  isPlaying
                    ? 'bg-sky-500 text-white animate-pulse'
                    : isDark
                    ? 'bg-slate-700 text-sky-400 hover:bg-slate-600'
                    : 'bg-sky-50 text-sky-600 hover:bg-sky-100'
                }`}
                title="Reproducir pronunciación en inglés"
              >
                <Volume2 className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleFlip();
                }}
                className={`p-1.5 rounded-lg transition-colors flex items-center gap-1 text-xs font-semibold ${
                  isDark ? 'bg-slate-700 text-emerald-300 hover:bg-slate-600' : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                }`}
                title="Voltear de vuelta al inglés"
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span className="text-[11px] hidden sm:inline">Original</span>
              </button>
            </div>
          </div>

          <div className="py-1">
            <p className={`font-medium leading-relaxed whitespace-pre-line ${isDark ? 'text-emerald-200' : 'text-emerald-950'}`}>
              {spanishText}
            </p>
            {grammarTip && (
              <p className="mt-2 text-xs text-sky-600 dark:text-sky-300 bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 rounded-lg p-2 leading-relaxed">
                <span className="font-bold">Regla: </span>
                {grammarTip}
              </p>
            )}
          </div>

          <div className="pt-2 mt-1 flex items-center justify-between text-[11px] text-slate-400">
            <span className="italic">Toca para regresar al texto en inglés</span>
            <span className="font-mono text-[10px] bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 px-1.5 py-0.5 rounded">
              Español
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
