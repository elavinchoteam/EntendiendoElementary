import React, { useState } from 'react';
import { Volume2 } from 'lucide-react';
import {
  BE_PAST_REVIEW_REFERENCE_SENTENCES,
  BE_PAST_REVIEW_REFERENCE_AUDIO,
} from '../../data/bePastReviewData';
import { speakEnglish, stopSpeaking, playFeedbackSound } from '../../utils/audio';
import { useTheme } from '../../context/ThemeContext';

interface BePastReferenceCardProps {
  speed?: number;
  accent?: 'US' | 'UK';
  className?: string;
}

export const BePastReferenceCard: React.FC<BePastReferenceCardProps> = ({
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
      BE_PAST_REVIEW_REFERENCE_AUDIO,
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
        className={`relative w-full min-h-[155px] transition-transform duration-500 transform-style-3d cursor-pointer select-none rounded-2xl border ${
          isDark
            ? 'bg-slate-900 border-white/10 text-white shadow-md'
            : 'bg-white border-slate-200 text-slate-900 shadow-sm'
        } ${isFlipped ? 'rotate-y-180' : ''}`}
        title="Haz clic para alternar entre inglés y español"
      >
        {/* Front: English with Yellow and Cyan Highlights */}
        <div
          className={`absolute inset-0 backface-hidden rounded-2xl p-4 sm:p-5 flex flex-col justify-between ${
            isDark ? 'bg-slate-900' : 'bg-slate-50/70'
          }`}
        >
          <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-inherit/20">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
              Reference Dialogue · Be-Past
            </span>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono opacity-60">Clic para traducir ↻</span>
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
            {BE_PAST_REVIEW_REFERENCE_SENTENCES.map((item, idx) => (
              <p key={idx} className="flex items-baseline gap-1">
                <span className="opacity-60">{item.speaker}</span>
                <span>
                  {renderSentenceWithHighlights(item.textEn, item.highlights)}
                </span>
              </p>
            ))}
          </div>

          <div className="pt-2 border-t border-inherit/15 flex items-center justify-between text-[10px] font-mono opacity-60">
            <span>Formas clave: was, were, wasn't</span>
            <span>English</span>
          </div>
        </div>

        {/* Back: Spanish Translation */}
        <div
          className={`absolute inset-0 backface-hidden rotate-y-180 rounded-2xl p-4 sm:p-5 flex flex-col justify-between ${
            isDark ? 'bg-slate-900 border-emerald-500/30' : 'bg-emerald-50/40 border-emerald-200'
          }`}
        >
          <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-inherit/20">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Traducción al Español · Diálogo
            </span>
            <span className="text-[10px] font-mono opacity-60">Clic para volver ↻</span>
          </div>

          <div className="space-y-1.5 text-xs sm:text-sm font-serif italic leading-relaxed text-slate-800 dark:text-emerald-100">
            {BE_PAST_REVIEW_REFERENCE_SENTENCES.map((item, idx) => (
              <p key={idx}>
                {item.speakerEs}
                {item.textEs}
              </p>
            ))}
          </div>

          <div className="pt-2 border-t border-inherit/15 flex items-center justify-between text-[10px] font-mono opacity-60">
            <span>Traducción contextual</span>
            <span>Español</span>
          </div>
        </div>
      </div>
    </div>
  );
};

function renderSentenceWithHighlights(
  text: string,
  highlights: { word: string; color: 'yellow' | 'cyan' }[]
) {
  if (!highlights || highlights.length === 0) return text;

  // Build regex matching any highlight words
  const words = highlights.map((h) => h.word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const regex = new RegExp(`\\b(${words.join('|')})\\b`, 'gi');

  const parts = text.split(regex);
  return parts.map((part, i) => {
    const hl = highlights.find((h) => h.word.toLowerCase() === part.toLowerCase());
    if (hl) {
      if (hl.color === 'yellow') {
        return (
          <span
            key={i}
            className="inline-block bg-yellow-300 dark:bg-yellow-400/30 text-yellow-950 dark:text-yellow-200 px-1 py-0.2 rounded font-bold border border-yellow-400/40"
          >
            {part}
          </span>
        );
      }
      return (
        <span
          key={i}
          className="inline-block bg-cyan-300 dark:bg-cyan-500/30 text-cyan-950 dark:text-cyan-200 px-1 py-0.2 rounded font-bold border border-cyan-400/40"
        >
          {part}
        </span>
      );
    }
    return <span key={i}>{part}</span>;
  });
}
