import React, { useState } from 'react';
import { Volume2, RotateCcw } from 'lucide-react';
import {
  COMPARISON_REVIEW_REFERENCE_SENTENCES,
  COMPARISON_REVIEW_REFERENCE_AUDIO,
} from '../../data/comparisonAdjectivesReviewData';
import { speakEnglish, stopSpeaking, playFeedbackSound } from '../../utils/audio';
import { useTheme } from '../../context/ThemeContext';

interface ComparisonReferenceCardProps {
  speed?: number;
  accent?: 'US' | 'UK';
  className?: string;
}

export const ComparisonReferenceCard: React.FC<ComparisonReferenceCardProps> = ({
  speed = 1.0,
  accent = 'US',
  className = '',
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
      COMPARISON_REVIEW_REFERENCE_AUDIO,
      speed,
      accent,
      () => setIsPlaying(true),
      () => setIsPlaying(false)
    );
  };

  const renderHighlightedSentence = (text: string, highlights: string[]) => {
    let result: React.ReactNode[] = [text];

    highlights.forEach((h) => {
      const nextResult: React.ReactNode[] = [];
      result.forEach((item, itemIdx) => {
        if (typeof item !== 'string') {
          nextResult.push(item);
          return;
        }

        const lowerItem = item.toLowerCase();
        const lowerH = h.toLowerCase();
        const foundIdx = lowerItem.indexOf(lowerH);

        if (foundIdx === -1) {
          nextResult.push(item);
          return;
        }

        const before = item.slice(0, foundIdx);
        const match = item.slice(foundIdx, foundIdx + h.length);
        const after = item.slice(foundIdx + h.length);

        if (before) nextResult.push(before);
        const isEquality = lowerH.includes('as');
        nextResult.push(
          <span
            key={`${itemIdx}-${h}`}
            className={`font-bold px-1.5 py-0.5 rounded ${
              isEquality
                ? 'bg-yellow-300/80 text-yellow-950 dark:bg-yellow-400/25 dark:text-yellow-300'
                : 'bg-cyan-300/80 text-cyan-950 dark:bg-cyan-400/25 dark:text-cyan-300'
            }`}
          >
            {match}
          </span>
        );
        if (after) nextResult.push(after);
      });
      result = nextResult;
    });

    return <>{result}</>;
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
        className={`relative w-full min-h-[160px] transition-transform duration-500 transform-style-3d cursor-pointer select-none rounded-2xl border ${
          isDark
            ? 'bg-slate-900 border-white/10 text-white shadow-md'
            : 'bg-white border-slate-200 text-slate-900 shadow-sm'
        } ${isFlipped ? 'rotate-y-180' : ''}`}
        title="Haz clic para alternar entre inglés y castellano"
      >
        {/* Front: English with Yellow and Cyan Highlights */}
        <div
          className={`absolute inset-0 backface-hidden rounded-2xl p-4 sm:p-5 flex flex-col justify-between ${
            isDark ? 'bg-slate-900' : 'bg-slate-50/70'
          }`}
        >
          <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-inherit/20">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
              Reference Dialogue · Comparison
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggleFlip();
                }}
                className="px-2 py-0.5 rounded-lg text-[10px] font-mono font-bold bg-sky-500/15 border border-sky-500/30 text-sky-600 dark:text-sky-400 hover:bg-sky-500/25 flex items-center gap-1 transition-all cursor-pointer"
                title="Ver traducción al castellano"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Castellano</span>
              </button>
              <button
                type="button"
                onClick={handleSpeak}
                className="p-1.5 rounded-lg border border-inherit/20 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Escuchar diálogo"
                title="Escuchar diálogo"
              >
                <Volume2
                  className={`w-4 h-4 ${
                    isPlaying ? 'text-emerald-500 animate-pulse' : 'text-sky-500'
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="space-y-1.5 text-xs sm:text-sm font-medium leading-relaxed">
            {COMPARISON_REVIEW_REFERENCE_SENTENCES.map((item, idx) => (
              <p key={idx} className="flex items-baseline gap-1">
                <span>{renderHighlightedSentence(item.textEn, item.highlights)}</span>
              </p>
            ))}
          </div>

          <div className="pt-2 border-t border-inherit/15 flex items-center justify-between text-[10px] font-mono opacity-60">
            <span>Formas clave: as... as, -er, -est</span>
            <span>English</span>
          </div>
        </div>

        {/* Back: Spanish Translation */}
        <div
          className={`absolute inset-0 backface-hidden rotate-y-180 rounded-2xl p-4 sm:p-5 flex flex-col justify-between ${
            isDark ? 'bg-slate-900 border-emerald-500/30 text-emerald-100' : 'bg-emerald-50/90 text-emerald-950 border border-emerald-300'
          }`}
        >
          <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-inherit/20">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Traducción al Castellano · Diálogo
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleToggleFlip();
              }}
              className="px-2 py-0.5 rounded-lg text-[10px] font-mono font-bold bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/25 flex items-center gap-1 transition-all cursor-pointer"
              title="Volver al inglés"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Inglés</span>
            </button>
          </div>

          <div className="space-y-1.5 text-xs sm:text-sm font-serif italic leading-relaxed text-slate-800 dark:text-emerald-100">
            {COMPARISON_REVIEW_REFERENCE_SENTENCES.map((item, idx) => (
              <p key={idx}>
                {item.textEs}
              </p>
            ))}
          </div>

          <div className="pt-2 border-t border-inherit/15 flex items-center justify-between text-[10px] font-mono opacity-60">
            <span>Traducción contextual</span>
            <span>Castellano</span>
          </div>
        </div>
      </div>
    </div>
  );
};
