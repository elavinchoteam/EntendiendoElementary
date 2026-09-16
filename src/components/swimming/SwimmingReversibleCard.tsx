import React, { useState, useEffect } from 'react';
import { Volume2, Square } from 'lucide-react';
import { SwimmingDialogueLine, SWIMMING_AUDIO_FULL } from '../../data/swimmingData';
import { speakEnglish, stopSpeaking, playFeedbackSound } from '../../utils/audio';
import { useTheme } from '../../context/ThemeContext';
import { SpeedSelectorButton } from '../SpeedSelectorButton';

interface SwimmingReversibleCardProps {
  lines: SwimmingDialogueLine[];
  activeLineIdx?: number | null;
  accent?: 'US' | 'UK';
  speechRate?: number;
  onSpeechRateChange?: (newRate: number) => void;
  compact?: boolean;
  className?: string;
}

export const SwimmingReversibleCard: React.FC<SwimmingReversibleCardProps> = ({
  lines,
  activeLineIdx = null,
  accent = 'US',
  speechRate = 1.0,
  onSpeechRateChange,
  compact = false,
  className = '',
}) => {
  const { isDark } = useTheme();
  const [isFlipped, setIsFlipped] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playingLineIdx, setPlayingLineIdx] = useState<number | null>(null);
  const [currentRate, setCurrentRate] = useState<number>(speechRate);

  useEffect(() => {
    setCurrentRate(speechRate);
  }, [speechRate]);

  useEffect(() => {
    return () => {
      stopSpeaking();
    };
  }, []);

  const handleCardClick = () => {
    playFeedbackSound('flip');
    setIsFlipped((prev) => !prev);
  };

  const handleRateChange = (newRate: number) => {
    setCurrentRate(newRate);
    if (onSpeechRateChange) {
      onSpeechRateChange(newRate);
    }
    if (isPlaying) {
      stopSpeaking();
      setIsPlaying(false);
      setPlayingLineIdx(null);
    }
  };

  const handleToggleFullAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPlaying) {
      stopSpeaking();
      setIsPlaying(false);
      setPlayingLineIdx(null);
      return;
    }

    setIsPlaying(true);
    setPlayingLineIdx(null);
    speakEnglish(
      SWIMMING_AUDIO_FULL,
      currentRate,
      accent as 'US' | 'UK',
      () => setIsPlaying(true),
      () => {
        setIsPlaying(false);
        setPlayingLineIdx(null);
      },
      'female'
    );
  };

  const handlePlayLine = (text: string, idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    stopSpeaking();
    setIsPlaying(false);
    setPlayingLineIdx(idx);
    speakEnglish(
      text,
      currentRate,
      accent as 'US' | 'UK',
      () => setPlayingLineIdx(idx),
      () => setPlayingLineIdx(null),
      idx % 2 === 0 ? 'female' : 'male'
    );
  };

  return (
    <div className={`w-full flex flex-col items-center ${className}`}>
      <div
        id="swimming-reversible-card"
        onClick={handleCardClick}
        className={`w-full ${
          compact ? 'max-w-xl' : 'max-w-2xl'
        } perspective-1000 cursor-pointer select-none`}
      >
        <div
          className={`grid grid-cols-1 grid-rows-1 transition-transform duration-500 transform-style-3d ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
        >
          {/* FRONT FACE: English Dialogue */}
          <div
            className={`col-start-1 row-start-1 backface-hidden w-full rounded-2xl sm:rounded-3xl border ${
              compact ? 'p-4 sm:p-5' : 'p-5 sm:p-7'
            } shadow-xs transition-colors flex flex-col relative ${
              isDark
                ? 'bg-slate-900 border-slate-800 text-slate-100'
                : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            {/* Top Bar: Speed & Audio buttons (icon only) */}
            <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-inherit/20">
              <span className={`text-xs font-mono font-bold uppercase tracking-wider ${
                isDark ? 'text-sky-400' : 'text-sky-600'
              }`}>
                Dialogue
              </span>

              <div
                className="flex items-center gap-2"
                onClick={(e) => e.stopPropagation()}
              >
                <SpeedSelectorButton
                  currentRate={currentRate}
                  onRateChange={handleRateChange}
                  size="sm"
                />
                <button
                  id="swimming-card-audio-front-btn"
                  type="button"
                  onClick={handleToggleFullAudio}
                  className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-xs ${
                    isPlaying
                      ? 'bg-sky-500 text-white ring-4 ring-sky-500/25 scale-105'
                      : isDark
                      ? 'bg-slate-800 hover:bg-slate-700 text-sky-400 border border-slate-700 hover:scale-105'
                      : 'bg-stone-50 hover:bg-stone-100 text-sky-600 border border-stone-200 hover:scale-105'
                  }`}
                  aria-label="Speaker"
                >
                  {isPlaying ? (
                    <Square className="w-3.5 h-3.5 fill-current" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Dialogue Lines */}
            <div className="space-y-2.5">
              {lines.map((line, idx) => {
                const isTarget = activeLineIdx === idx;
                const isLinePlaying = playingLineIdx === idx;

                return (
                  <div
                    key={line.id}
                    onClick={(e) => handlePlayLine(line.textEn, idx, e)}
                    className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-start gap-2.5 ${
                      isTarget
                        ? isDark
                          ? 'bg-sky-950/40 border-sky-500/70 shadow-xs'
                          : 'bg-sky-50 border-sky-300 shadow-xs'
                        : isLinePlaying
                        ? isDark
                          ? 'bg-sky-900/30 border-sky-500'
                          : 'bg-sky-50 border-sky-400'
                        : isDark
                        ? 'bg-slate-800/60 hover:bg-slate-800 border-slate-700/60'
                        : 'bg-stone-50 hover:bg-stone-100 border-stone-200/80'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={(e) => handlePlayLine(line.textEn, idx, e)}
                      className={`w-7 h-7 rounded-lg shrink-0 flex items-center justify-center transition-all cursor-pointer mt-0.5 ${
                        isLinePlaying
                          ? 'bg-sky-500 text-white'
                          : isDark
                          ? 'bg-slate-700 hover:bg-slate-600 text-sky-400'
                          : 'bg-white hover:bg-stone-200 text-sky-600 border border-stone-200'
                      }`}
                      aria-label="Speaker"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[11px] font-bold uppercase tracking-wider ${
                            line.speakerSide === 'left'
                              ? isDark
                                ? 'text-amber-400'
                                : 'text-amber-600'
                              : isDark
                              ? 'text-sky-400'
                              : 'text-sky-600'
                          }`}
                        >
                          {line.speaker}
                        </span>
                      </div>
                      <p
                        className={`text-sm sm:text-base leading-snug mt-0.5 font-medium ${
                          isTarget
                            ? isDark
                              ? 'text-sky-200 font-bold'
                              : 'text-sky-900 font-bold'
                            : isDark
                            ? 'text-slate-200'
                            : 'text-slate-800'
                        }`}
                      >
                        {line.textEn}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* BACK FACE: Spanish Translation */}
          <div
            className={`col-start-1 row-start-1 backface-hidden rotate-y-180 w-full rounded-2xl sm:rounded-3xl border ${
              compact ? 'p-4 sm:p-5' : 'p-5 sm:p-7'
            } shadow-xs transition-colors flex flex-col relative ${
              isDark
                ? 'bg-slate-900 border-slate-800 text-slate-100'
                : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            {/* Top Bar: Speed & Audio buttons (icon only) */}
            <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-inherit/20">
              <span className={`text-xs font-mono font-bold uppercase tracking-wider ${
                isDark ? 'text-emerald-400' : 'text-emerald-600'
              }`}>
                Traducción (Español)
              </span>

              <div
                className="flex items-center gap-2"
                onClick={(e) => e.stopPropagation()}
              >
                <SpeedSelectorButton
                  currentRate={currentRate}
                  onRateChange={handleRateChange}
                  size="sm"
                />
                <button
                  id="swimming-card-audio-back-btn"
                  type="button"
                  onClick={handleToggleFullAudio}
                  className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-xs ${
                    isPlaying
                      ? 'bg-sky-500 text-white ring-4 ring-sky-500/25 scale-105'
                      : isDark
                      ? 'bg-slate-800 hover:bg-slate-700 text-sky-400 border border-slate-700 hover:scale-105'
                      : 'bg-stone-50 hover:bg-stone-100 text-sky-600 border border-stone-200 hover:scale-105'
                  }`}
                  aria-label="Speaker"
                >
                  {isPlaying ? (
                    <Square className="w-3.5 h-3.5 fill-current" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Translation Lines */}
            <div className="space-y-2.5">
              {lines.map((line, idx) => {
                const isTarget = activeLineIdx === idx;

                return (
                  <div
                    key={line.id}
                    className={`p-2.5 rounded-xl border transition-all flex items-start gap-2.5 ${
                      isTarget
                        ? isDark
                          ? 'bg-emerald-950/40 border-emerald-500/70 shadow-xs'
                          : 'bg-emerald-50 border-emerald-300 shadow-xs'
                        : isDark
                        ? 'bg-slate-800/60 border-slate-700/60'
                        : 'bg-stone-50 border-stone-200/80'
                    }`}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[11px] font-bold uppercase tracking-wider ${
                            line.speakerSide === 'left'
                              ? isDark
                                ? 'text-amber-400'
                                : 'text-amber-600'
                              : isDark
                              ? 'text-sky-400'
                              : 'text-sky-600'
                          }`}
                        >
                          {line.speakerEs}
                        </span>
                      </div>
                      <p
                        className={`text-sm sm:text-base leading-snug mt-0.5 italic ${
                          isTarget
                            ? isDark
                              ? 'text-emerald-200 font-bold'
                              : 'text-emerald-900 font-bold'
                            : isDark
                            ? 'text-slate-300'
                            : 'text-slate-800'
                        }`}
                      >
                        {line.textEs}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
