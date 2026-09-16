import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Gauge, Check } from 'lucide-react';
import { speakEnglish, stopSpeaking, playFeedbackSound } from '../../utils/audio';
import { useTheme } from '../../context/ThemeContext';
import { mickStarlightCarImg } from '../../data/comparisonEqualityData';

export const COMPARISON_PLAYBACK_SPEEDS = [
  { value: 0.5, label: '0.50x' },
  { value: 0.65, label: '0.65x' },
  { value: 0.85, label: '0.85x' },
  { value: 1.0, label: '1x' },
  { value: 1.15, label: '1.15x' },
  { value: 1.3, label: '1.30x' },
];

export interface ComparisonMediaPlayerCardProps {
  audioText: string;
  accent?: 'US' | 'UK';
  speechRate?: number;
  durationSeconds?: number;
  imageUrl?: string;
  onRateChange?: (rate: number) => void;
}

export const ComparisonMediaPlayerCard: React.FC<ComparisonMediaPlayerCardProps> = ({
  audioText,
  accent = 'US',
  speechRate = 1.0,
  durationSeconds = 5,
  imageUrl = mickStarlightCarImg,
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

    if (!isMuted) {
      speakEnglish(
        audioText,
        currentRate,
        accent as 'US' | 'UK',
        () => setIsPlaying(true),
        () => {
          setIsPlaying(false);
          setElapsedSeconds(durationSeconds);
          if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
          }
        }
      );
    } else {
      setTimeout(() => {
        setIsPlaying(false);
        setElapsedSeconds(durationSeconds);
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
      }, (durationSeconds * 1000) / currentRate);
    }
  };

  const handleSelectSpeed = (val: number) => {
    setCurrentRate(val);
    setIsSpeedMenuOpen(false);
    playFeedbackSound('click');
    if (onRateChange) onRateChange(val);
  };

  const progressPercent = Math.min(100, (elapsedSeconds / durationSeconds) * 100);

  return (
    <div
      className={`w-full rounded-2xl border overflow-hidden shadow-md flex flex-col ${
        isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'
      }`}
    >
      {/* Visual Image container */}
      <div className="relative w-full aspect-4/3 sm:aspect-16/10 bg-slate-950 overflow-hidden flex items-center justify-center">
        <img
          src={imageUrl}
          alt="Mick Starlight's car"
          className="w-full h-full object-cover select-none"
        />

        {/* Floating play overlay if not playing */}
        {!isPlaying && (
          <button
            type="button"
            onClick={handleTogglePlay}
            className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-black/40 hover:bg-indigo-600/80 text-white flex items-center justify-center backdrop-blur-xs transition-all cursor-pointer border border-white/30 shadow-lg hover:scale-105"
            aria-label="Play audio"
          >
            <Play className="w-7 h-7 fill-white ml-0.5" />
          </button>
        )}
      </div>

      {/* Control bar */}
      <div className="p-3 sm:p-4 flex flex-col gap-2.5">
        {/* Progress bar */}
        <div className="w-full flex items-center gap-2">
          <div className="flex-1 h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
            <div
              className="h-full bg-indigo-600 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="text-xs font-mono font-medium text-slate-500 dark:text-slate-400 shrink-0">
            {formatTime(elapsedSeconds)} / {formatTime(durationSeconds)}
          </span>
        </div>

        {/* Buttons row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleTogglePlay}
              className={`p-2 rounded-xl transition-all cursor-pointer border ${
                isPlaying
                  ? 'bg-indigo-600 text-white border-indigo-500 ring-2 ring-indigo-400'
                  : isDark
                  ? 'bg-slate-800 hover:bg-slate-700 text-white border-slate-700'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
              }`}
              aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 fill-current" />
              ) : (
                <Play className="w-4 h-4 fill-current ml-0.5" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setIsMuted((prev) => !prev)}
              className={`p-2 rounded-xl border transition-all cursor-pointer ${
                isDark
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
              }`}
              aria-label={isMuted ? 'Activar sonido' : 'Silenciar'}
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 text-rose-500" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Speed Selector */}
          <div className="relative" ref={speedMenuRef}>
            <button
              type="button"
              onClick={() => setIsSpeedMenuOpen((prev) => !prev)}
              className={`px-2.5 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                isDark
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
              }`}
            >
              <Gauge className="w-3.5 h-3.5 text-indigo-500" />
              <span>{COMPARISON_PLAYBACK_SPEEDS.find((s) => s.value === currentRate)?.label || `${currentRate}x`}</span>
            </button>

            {isSpeedMenuOpen && (
              <div
                className={`absolute bottom-full right-0 mb-2 w-32 rounded-xl border shadow-xl z-50 p-1.5 flex flex-col gap-1 ${
                  isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
                }`}
              >
                {COMPARISON_PLAYBACK_SPEEDS.map((spd) => (
                  <button
                    key={spd.value}
                    type="button"
                    onClick={() => handleSelectSpeed(spd.value)}
                    className={`w-full px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between transition-all cursor-pointer ${
                      currentRate === spd.value
                        ? 'bg-indigo-600 text-white'
                        : isDark
                        ? 'hover:bg-slate-700 text-slate-300'
                        : 'hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <span>{spd.label}</span>
                    {currentRate === spd.value && <Check className="w-3.5 h-3.5" />}
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
