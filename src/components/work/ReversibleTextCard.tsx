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
    <div className="w-full select-none transition-all duration-300">
      <div
        onClick={handleFlip}
        className={`relative w-full rounded-2xl border transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md ${padClass} ${
          !isFlipped
            ? isDark
              ? 'bg-slate-800/90 border-slate-700 hover:border-slate-600'
              : 'bg-white border-slate-200 hover:border-slate-300'
            : isDark
            ? 'bg-emerald-950/40 border-emerald-700/70 hover:border-emerald-600 text-emerald-100'
            : 'bg-emerald-50/80 border-emerald-300 hover:border-emerald-400 text-emerald-950'
        }`}
      >
        {!isFlipped ? (
          /* FRONT FACE (Natural height) */
          <div className="flex flex-col justify-between w-full space-y-2">
            <div className="flex items-center justify-between pb-2 mb-1 border-b border-slate-100 dark:border-slate-700/60">
              <span className="text-[11px] font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
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

            <div className="pt-2 mt-1 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-100/60 dark:border-slate-800/60">
              <span className="italic">Toca la tarjeta para ver traducción al español</span>
              <span className="font-mono text-[10px] bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-full font-semibold">
                Español ⇄
              </span>
            </div>
          </div>
        ) : (
          /* BACK FACE (Natural height, NO overflow clipping) */
          <div className="flex flex-col justify-between w-full space-y-2 animate-in fade-in duration-200">
            <div className="flex items-center justify-between pb-2 mb-1 border-b border-emerald-200/60 dark:border-emerald-800/60">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Traducción al Español
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
                      : 'bg-white text-emerald-700 hover:bg-emerald-100 shadow-xs'
                  }`}
                  title="Reproducir audio en inglés"
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
                    isDark ? 'bg-slate-700 text-emerald-300 hover:bg-slate-600' : 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
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
                <div className="mt-2.5 text-xs text-sky-800 dark:text-sky-200 bg-sky-50/90 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800 rounded-xl p-2.5 leading-relaxed">
                  <span className="font-bold text-sky-700 dark:text-sky-300">💡 Nota explicativa: </span>
                  {grammarTip}
                </div>
              )}
            </div>

            <div className="pt-2 mt-1 flex items-center justify-between text-[11px] text-emerald-600/80 dark:text-emerald-400/80 border-t border-emerald-200/50 dark:border-emerald-800/40">
              <span className="italic">Toca para regresar al texto original en inglés</span>
              <span className="font-mono text-[10px] bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded-full font-bold">
                ✓ Reverso
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
