import React, { useState } from 'react';
import { Volume2 } from 'lucide-react';
import {
  SHOPRIGHT_AD_TITLE,
  SHOPRIGHT_AD_LINES,
  SHOPRIGHT_AD_FULL_EN,
  SHOPRIGHT_AD_FULL_ES,
} from '../../data/saleAtShoprightData';
import { useTheme } from '../../context/ThemeContext';
import { speakEnglish, stopSpeaking } from '../../utils/audio';

interface ShoprightPinnedAdProps {
  speechRate?: number;
  accent?: 'US' | 'UK';
  highlightWord?: string;
  highlightLineId?: string;
  compact?: boolean;
}

export const ShoprightPinnedAd: React.FC<ShoprightPinnedAdProps> = ({
  speechRate = 1.0,
  accent = 'US',
  highlightWord,
  highlightLineId,
  compact = false,
}) => {
  const { isDark } = useTheme();
  const [isFlipped, setIsFlipped] = useState(false);
  const [isPlayingFull, setIsPlayingFull] = useState(false);
  const [playingLineId, setPlayingLineId] = useState<string | null>(null);

  const handlePlayFull = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPlayingFull && window.speechSynthesis?.speaking) {
      stopSpeaking();
      setIsPlayingFull(false);
      setPlayingLineId(null);
      return;
    }
    stopSpeaking();
    setIsPlayingFull(true);
    speakEnglish(
      SHOPRIGHT_AD_FULL_EN,
      speechRate,
      accent || 'US',
      () => setIsPlayingFull(true),
      () => {
        setIsPlayingFull(false);
        setPlayingLineId(null);
      }
    );
  };

  const handlePlayLine = (lineId: string, text: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (playingLineId === lineId && window.speechSynthesis?.speaking) {
      stopSpeaking();
      setPlayingLineId(null);
      return;
    }
    stopSpeaking();
    setIsPlayingFull(false);
    setPlayingLineId(lineId);
    speakEnglish(
      text,
      speechRate,
      accent || 'US',
      () => setPlayingLineId(lineId),
      () => setPlayingLineId(null)
    );
  };

  return (
    <div
      id="shopright-pinned-ad-container"
      className={`w-full cursor-pointer perspective select-none ${
        compact ? 'max-w-md mx-auto' : 'max-w-xl mx-auto'
      }`}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div
        className={`w-full transition-transform duration-500 transform-style-3d relative ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* FRONT: ENGLISH */}
        <div
          className={`w-full rounded-2xl border p-5 sm:p-6 flex flex-col justify-between backface-hidden shadow-md transition-colors ${
            isDark
              ? 'bg-slate-900 border-indigo-500/40 text-slate-100'
              : 'bg-indigo-50/70 border-indigo-200 text-slate-900'
          }`}
        >
          {/* Header with Title & Audio Button (Speaker only, no text) */}
          <div className="flex items-center justify-between gap-3 pb-3 border-b border-indigo-300/40 dark:border-slate-700">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500 shadow-xs inline-block" />
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-indigo-950 dark:text-indigo-300 font-serif">
                {SHOPRIGHT_AD_TITLE.en}
              </h2>
            </div>

            <button
              type="button"
              id="shopright-ad-play-full-en"
              onClick={handlePlayFull}
              className={`p-2 rounded-xl border transition-all cursor-pointer ${
                isPlayingFull
                  ? 'bg-indigo-600 text-white border-indigo-500 ring-2 ring-indigo-400'
                  : isDark
                  ? 'bg-slate-800 hover:bg-slate-700 text-indigo-300 border-slate-700'
                  : 'bg-white hover:bg-indigo-100 text-indigo-900 border-indigo-200 shadow-xs'
              }`}
              aria-label="Audio"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>

          {/* Ad Body Lines */}
          <div className="flex flex-col gap-3 py-4 text-sm sm:text-base font-serif leading-relaxed">
            {SHOPRIGHT_AD_LINES.map((line) => {
              const isLinePlaying = playingLineId === line.id;
              const isHighlighted = highlightLineId === line.id;

              return (
                <div
                  key={line.id}
                  className={`group flex items-start justify-between gap-2 p-2 rounded-xl transition-colors ${
                    isHighlighted
                      ? 'bg-indigo-200/60 dark:bg-indigo-900/40 font-semibold'
                      : isLinePlaying
                      ? 'bg-indigo-100 dark:bg-slate-800'
                      : 'hover:bg-indigo-100/50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <span className="flex-1">
                    {line.en}
                  </span>

                  <button
                    type="button"
                    onClick={(e) => handlePlayLine(line.id, line.en, e)}
                    className={`p-1.5 rounded-lg opacity-80 group-hover:opacity-100 transition-opacity cursor-pointer ${
                      isLinePlaying
                        ? 'bg-indigo-600 text-white'
                        : isDark
                        ? 'hover:bg-slate-700 text-indigo-300'
                        : 'hover:bg-indigo-200 text-indigo-900'
                    }`}
                    aria-label="Audio"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* BACK: SPANISH */}
        <div
          className={`absolute inset-0 w-full h-full rounded-2xl border p-5 sm:p-6 flex flex-col justify-between backface-hidden rotate-y-180 shadow-md transition-colors ${
            isDark
              ? 'bg-slate-900 border-indigo-500/40 text-slate-100'
              : 'bg-white border-indigo-200 text-slate-900'
          }`}
        >
          {/* Header with Title (Spanish) & Audio Button (Speaker only, no text) */}
          <div className="flex items-center justify-between gap-3 pb-3 border-b border-indigo-300/40 dark:border-slate-700">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500 shadow-xs inline-block" />
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-indigo-950 dark:text-indigo-300 font-serif">
                {SHOPRIGHT_AD_TITLE.es}
              </h2>
            </div>

            <button
              type="button"
              id="shopright-ad-play-full-es"
              onClick={handlePlayFull}
              className={`p-2 rounded-xl border transition-all cursor-pointer ${
                isPlayingFull
                  ? 'bg-indigo-600 text-white border-indigo-500 ring-2 ring-indigo-400'
                  : isDark
                  ? 'bg-slate-800 hover:bg-slate-700 text-indigo-300 border-slate-700'
                  : 'bg-slate-50 hover:bg-indigo-50 text-indigo-900 border-slate-200 shadow-xs'
              }`}
              aria-label="Audio"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>

          {/* Ad Body Lines (Spanish) */}
          <div className="flex flex-col gap-3 py-4 text-sm sm:text-base font-serif leading-relaxed">
            {SHOPRIGHT_AD_LINES.map((line) => {
              const isHighlighted = highlightLineId === line.id;

              return (
                <div
                  key={line.id}
                  className={`p-2 rounded-xl transition-colors ${
                    isHighlighted
                      ? 'bg-indigo-100 dark:bg-indigo-900/40 font-semibold'
                      : ''
                  }`}
                >
                  <span>{line.es}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
