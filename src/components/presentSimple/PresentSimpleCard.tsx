import React, { useState } from 'react';
import { Volume2 } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { speakEnglish, stopSpeaking } from '../../utils/audio';

export interface PresentSimpleCardProps {
  textEn: string;
  textEs: string;
  highlightWords?: string[];
  speechRate?: number;
  accent?: 'US' | 'UK';
  className?: string;
  renderCustomContent?: (isFlipped: boolean) => React.ReactNode;
}

export const PresentSimpleCard: React.FC<PresentSimpleCardProps> = ({
  textEn,
  textEs,
  highlightWords = [],
  speechRate = 1.0,
  accent = 'US',
  className = '',
  renderCustomContent,
}) => {
  const { isDark } = useTheme();
  const [isFlipped, setIsFlipped] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleAudioPlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    stopSpeaking();
    setIsPlaying(true);
    speakEnglish(
      textEn,
      speechRate,
      accent === 'UK' ? 'UK' : 'US',
      undefined,
      () => setIsPlaying(false)
    );
  };

  const handleCardClick = () => {
    setIsFlipped((prev) => !prev);
  };

  // Format highlighted words if needed
  const renderHighlightedText = (content: string) => {
    if (!highlightWords || highlightWords.length === 0) return content;
    const parts = content.split(
      new RegExp(`(${highlightWords.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi')
    );
    return parts.map((part, i) => {
      const isMatch = highlightWords.some(
        (w) => w.toLowerCase() === part.toLowerCase()
      );
      if (isMatch) {
        return (
          <span
            key={i}
            className="bg-cyan-300 text-cyan-950 font-semibold px-1 rounded-sm mx-0.5"
          >
            {part}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <div
      onClick={handleCardClick}
      className={`cursor-pointer transition-all duration-200 select-none p-4 rounded-xl border ${
        isDark
          ? 'bg-slate-800 border-slate-700 text-slate-100 hover:border-slate-600'
          : 'bg-white border-slate-200 text-slate-800 hover:border-slate-300 shadow-xs'
      } ${className}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          {renderCustomContent ? (
            renderCustomContent(isFlipped)
          ) : !isFlipped ? (
            <div className="text-base sm:text-lg font-medium leading-relaxed">
              {renderHighlightedText(textEn)}
            </div>
          ) : (
            <div
              className={`text-base sm:text-lg font-medium leading-relaxed ${
                isDark ? 'text-amber-300' : 'text-amber-800'
              }`}
            >
              {textEs}
            </div>
          )}
        </div>

        {/* ONLY speaker icon button */}
        <button
          type="button"
          onClick={handleAudioPlay}
          className={`shrink-0 p-2 rounded-lg transition-colors ${
            isPlaying
              ? 'bg-blue-600 text-white animate-pulse'
              : isDark
              ? 'bg-slate-700 hover:bg-slate-600 text-slate-200'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
          }`}
          aria-label="Audio"
        >
          <Volume2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
