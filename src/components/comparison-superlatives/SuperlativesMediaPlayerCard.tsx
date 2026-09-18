import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Gauge, Check } from 'lucide-react';
import { speakEnglish, stopSpeaking, playFeedbackSound } from '../../utils/audio';
import { useTheme } from '../../context/ThemeContext';
import { madMosStoreImg } from '../../data/comparisonSuperlativesData';

export const SUPERLATIVES_PLAYBACK_SPEEDS = [
  { value: 0.5, label: '0.50x' },
  { value: 0.65, label: '0.65x' },
  { value: 0.85, label: '0.85x' },
  { value: 1.0, label: '1x' },
  { value: 1.15, label: '1.15x' },
  { value: 1.3, label: '1.30x' },
];

export interface SuperlativesMediaPlayerCardProps {
  audioText: string;
  accent?: 'US' | 'UK';
  speechRate?: number;
  durationSeconds?: number;
  imageUrl?: string;
  onRateChange?: (rate: number) => void;
}

export const SuperlativesMediaPlayerCard: React.FC<SuperlativesMediaPlayerCardProps> = ({
  audioText,
  accent = 'US',
  speechRate = 1.0,
  durationSeconds = 7,
  imageUrl = madMosStoreImg,
  onRateChange,
}) => {
  const { isDark } = useTheme();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentRate, setCurrentRate] = useState(speechRate);
  const [isSpeedMenuOpen, setIsSpeedMenuOpen] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const speedMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setCurrentRate(speechRate);
  }, [speechRate]);

  // Click outside speed menu
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (speedMenuRef.current && !speedMenuRef.current.contains(e.target as Node)) {
        setIsSpeedMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      stopSpeaking();
    };
  }, []);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleTogglePlay = () => {
    if (isPlaying) {
      stopSpeaking();
      setIsPlaying(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    stopSpeaking();
    setIsPlaying(true);
    setElapsedSeconds(0);

    const intervalMs = 1000 / currentRate;
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setElapsedSeconds((prev) => {
        if (prev >= durationSeconds - 1) {
          if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
          }
          return durationSeconds;
        }
        return prev + 1;
      });
    }, intervalMs);

    speakEnglish(
      audioText,
      currentRate,
      accent as 'US' | 'UK',
      () => {
        setIsPlaying(true);
      },
      () => {
        setIsPlaying(false);
        setElapsedSeconds(durationSeconds);
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
      }
    );
  };

  const handleRateSelect = (rate: number) => {
    setCurrentRate(rate);
    setIsSpeedMenuOpen(false);
    playFeedbackSound('click');
    if (onRateChange) onRateChange(rate);

    if (isPlaying) {
      stopSpeaking();
      setIsPlaying(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  };

  const progressPercent = Math.min(
    100,
    Math.round((elapsedSeconds / durationSeconds) * 100)
  );

  return (
    <div
      id="superlatives-media-player"
      className={`w-full overflow-hidden rounded-2xl border shadow-md flex flex-col ${
        isDark
          ? 'bg-slate-900 border-slate-700 text-slate-100'
          : 'bg-white border-slate-200 text-slate-800'
      }`}
    >
      {/* Video / Illustration Canvas */}
      <div className="relative w-full aspect-4/3 sm:aspect-16/10 bg-slate-950 flex items-center justify-center overflow-hidden select-none">
        <img
          src={imageUrl}
          alt="Mad Mo's Store - Comparison of Adjectives: Superlatives"
          className="w-full h-full object-cover"
          loading="lazy"
        />

        {/* Big play overlay button when paused */}
        {!isPlaying && (
          <button
            type="button"
            id="superlatives-overlay-play-btn"
            onClick={handleTogglePlay}
            className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-black/60 hover:bg-black/75 text-white flex items-center justify-center backdrop-blur-xs transition-transform transform hover:scale-105 active:scale-95 shadow-xl cursor-pointer border border-white/20"
            aria-label="Play"
          >
            <Play className="w-8 h-8 ml-1 fill-current" />
          </button>
        )}

        {/* Live indicator badge */}
        <div className="absolute top-3 left-3 bg-black/70 text-white text-xs font-semibold px-2.5 py-1 rounded-md flex items-center gap-1.5 backdrop-blur-xs border border-white/10">
          <span
            className={`w-2 h-2 rounded-full ${
              isPlaying ? 'bg-red-500 animate-pulse' : 'bg-slate-400'
            }`}
          />
          <span>Superlatives</span>
        </div>
      </div>

      {/* Media Controller Bar */}
      <div
        className={`px-4 py-3 flex flex-col gap-2.5 border-t ${
          isDark
            ? 'bg-slate-900/95 border-slate-750'
            : 'bg-slate-50/90 border-slate-200'
        }`}
      >
        {/* Progress Bar scrubber */}
        <div className="w-full flex items-center gap-3">
          <span className="text-xs font-mono tabular-nums text-slate-500 dark:text-slate-400 min-w-[36px]">
            {formatTime(elapsedSeconds)}
          </span>
          <div className="flex-1 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden relative cursor-pointer">
            <div
              className="h-full bg-indigo-600 dark:bg-indigo-500 transition-all duration-300 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="text-xs font-mono tabular-nums text-slate-500 dark:text-slate-400 min-w-[36px] text-right">
            {formatTime(durationSeconds)}
          </span>
        </div>

        {/* Button Controls */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            {/* Play/Pause Button */}
            <button
              type="button"
              id="superlatives-play-pause-btn"
              onClick={handleTogglePlay}
              className={`p-2 rounded-xl transition-all cursor-pointer flex items-center justify-center ${
                isPlaying
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : isDark
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                  : 'bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 shadow-xs'
              }`}
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 fill-current" />
              ) : (
                <Play className="w-4 h-4 fill-current ml-0.5" />
              )}
            </button>

            {/* Mute toggle icon */}
            <button
              type="button"
              id="superlatives-audio-mute-btn"
              onClick={() => setIsMuted((prev) => !prev)}
              className={`p-2 rounded-xl transition-colors cursor-pointer ${
                isDark
                  ? 'hover:bg-slate-800 text-slate-400'
                  : 'hover:bg-slate-200 text-slate-600'
              }`}
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Speed Selector (0.5x, 0.65x, 0.85x, 1x, 1.15x, 1.30x) */}
          <div className="relative" ref={speedMenuRef}>
            <button
              type="button"
              id="superlatives-speed-btn"
              onClick={() => setIsSpeedMenuOpen((prev) => !prev)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                isDark
                  ? 'bg-slate-800 border-slate-700 hover:bg-slate-750 text-slate-200'
                  : 'bg-white border-slate-200 hover:bg-slate-100 text-slate-700 shadow-xs'
              }`}
              aria-label="Playback speed"
            >
              <Gauge className="w-3.5 h-3.5 text-indigo-500" />
              <span className="font-mono">{currentRate}x</span>
            </button>

            {isSpeedMenuOpen && (
              <div
                className={`absolute bottom-full right-0 mb-2 w-32 rounded-xl shadow-xl border py-1.5 z-30 ${
                  isDark
                    ? 'bg-slate-900 border-slate-700 text-slate-200'
                    : 'bg-white border-slate-200 text-slate-800'
                }`}
              >
                <div className="px-3 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Velocidad
                </div>
                {SUPERLATIVES_PLAYBACK_SPEEDS.map((sp) => (
                  <button
                    key={sp.value}
                    type="button"
                    onClick={() => handleRateSelect(sp.value)}
                    className={`w-full px-3 py-1.5 text-left text-xs flex items-center justify-between transition-colors cursor-pointer ${
                      currentRate === sp.value
                        ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-bold'
                        : isDark
                        ? 'hover:bg-slate-800'
                        : 'hover:bg-slate-100'
                    }`}
                  >
                    <span>{sp.label}</span>
                    {currentRate === sp.value && (
                      <Check className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
