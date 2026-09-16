import React, { useState } from 'react';
import { Volume2 } from 'lucide-react';
import { speakEnglish, stopSpeaking } from '../../utils/audio';
import { useTheme } from '../../context/ThemeContext';

export interface ComparativesReversibleCardProps {
  id?: string;
  textEn: string;
  textEs: string;
  speechRate?: number;
  accent?: 'US' | 'UK';
  className?: string;
  highlights?: string[];
  renderCustomEn?: () => React.ReactNode;
  minHeightClass?: string;
}

export const ComparativesReversibleCard: React.FC<ComparativesReversibleCardProps> = ({
  id,
  textEn,
  textEs,
  speechRate = 1.0,
  accent = 'US',
  className = '',
  highlights = [],
  renderCustomEn,
  minHeightClass = 'min-h-[72px]',
}) => {
  const { isDark } = useTheme();
  const [isFlipped, setIsFlipped] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPlaying) {
      stopSpeaking();
      setIsPlaying(false);
      return;
    }
    stopSpeaking();
    setIsPlaying(true);
    speakEnglish(
      textEn,
      speechRate,
      accent as 'US' | 'UK',
      () => setIsPlaying(true),
      () => setIsPlaying(false)
    );
  };

  const renderHighlighted = (text: string) => {
    if (!highlights || highlights.length === 0) return <span>{text}</span>;
    const pattern = new RegExp(`(${highlights.join('|')})`, 'gi');
    const parts = text.split(pattern);
    return parts.map((part, i) => {
      const isMatch = highlights.some((h) => h.toLowerCase() === part.toLowerCase());
      if (isMatch) {
        return (
          <span
            key={i}
            className="inline-block bg-cyan-300 dark:bg-cyan-500/30 text-cyan-950 dark:text-cyan-200 px-1.5 py-0.5 rounded font-bold border border-cyan-400/40 shadow-xs"
          >
            {part}
          </span>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <div className={`w-full perspective-1000 ${className}`}>
      <div
        id={id}
        role="button"
        tabIndex={0}
        onClick={() => setIsFlipped((prev) => !prev)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsFlipped((prev) => !prev);
          }
        }}
        className={`grid grid-cols-1 grid-rows-1 w-full rounded-2xl transition-transform duration-500 transform-style-3d cursor-pointer shadow-md select-none ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* FRONT: English (Solid clean background, NO gradients, NO decorative background) */}
        <div
          className={`col-start-1 row-start-1 backface-hidden w-full ${minHeightClass} rounded-2xl p-4 sm:p-5 flex items-center justify-between border ${
            isDark
              ? 'bg-slate-900 border-slate-700 text-white'
              : 'bg-white border-slate-200 text-slate-900'
          }`}
        >
          <div className="flex-1 pr-3 text-base sm:text-lg font-medium leading-relaxed whitespace-pre-line">
            {renderCustomEn ? renderCustomEn() : renderHighlighted(textEn)}
          </div>

          <div className="shrink-0 flex items-center">
            <button
              type="button"
              id={id ? `${id}-audio-btn` : undefined}
              onClick={handleSpeak}
              className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                isPlaying
                  ? 'bg-indigo-600 text-white border-indigo-500 ring-2 ring-indigo-400'
                  : isDark
                  ? 'bg-slate-800 hover:bg-slate-700 text-indigo-400 border-slate-700'
                  : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border-indigo-200'
              }`}
              aria-label="Audio"
            >
              <Volume2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* BACK: Spanish Translation (Solid clean background, NO gradients, NO decorative background) */}
        <div
          className={`col-start-1 row-start-1 backface-hidden rotate-y-180 w-full ${minHeightClass} rounded-2xl p-4 sm:p-5 flex items-center justify-between border ${
            isDark
              ? 'bg-slate-900 border-slate-700 text-slate-100'
              : 'bg-white border-slate-200 text-slate-800'
          }`}
        >
          <div className="flex-1 pr-3 text-base sm:text-lg font-medium leading-relaxed italic whitespace-pre-line">
            {textEs}
          </div>

          <div className="shrink-0 flex items-center">
            <button
              type="button"
              id={id ? `${id}-audio-btn-back` : undefined}
              onClick={handleSpeak}
              className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                isPlaying
                  ? 'bg-indigo-600 text-white border-indigo-500 ring-2 ring-indigo-400'
                  : isDark
                  ? 'bg-slate-800 hover:bg-slate-700 text-indigo-400 border-slate-700'
                  : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border-indigo-200'
              }`}
              aria-label="Audio"
            >
              <Volume2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
