import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Gauge, Check } from 'lucide-react';
import { speakEnglish, stopSpeaking, playFeedbackSound } from '../../utils/audio';
import { useTheme } from '../../context/ThemeContext';
import { samuraiSamBoxingImg } from '../../data/comparisonComparativesData';

export const COMPARATIVES_PLAYBACK_SPEEDS = [
  { value: 0.5, label: '0.50x' },
  { value: 0.65, label: '0.65x' },
  { value: 0.85, label: '0.85x' },
  { value: 1.0, label: '1x' },
  { value: 1.15, label: '1.15x' },
  { value: 1.3, label: '1.30x' },
];

export interface ComparativesMediaPlayerCardProps {
  audioText: string;
  accent?: 'US' | 'UK';
  speechRate?: number;
  durationSeconds?: number;
  imageUrl?: string;
  onRateChange?: (rate: number) => void;
}

export const ComparativesMediaPlayerCard: React.FC<ComparativesMediaPlayerCardProps> = ({
  audioText,
  accent = 'US',
  speechRate = 1.0,
  durationSeconds = 6,
  imageUrl = samuraiSamBoxingImg,
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
    }
  };

  const handleToggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isMuted) {
      stopSpeaking();
      setIsMuted(true);
    } else {
      setIsMuted(false);
      if (isPlaying) {
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
      }
    }
  };

  const handleSelectRate = (rate: number, e: React.MouseEvent) => {
    e.stopPropagation();
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

  const progressPercent = Math.min(100, (elapsedSeconds / durationSeconds) * 100);

  return (
    <div
      className={`w-full rounded-2xl overflow-hidden border shadow-lg flex flex-col transition-colors ${
        isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'
      }`}
    >
      {/* Video Container */}
      <div className="relative aspect-4/3 w-full bg-slate-950 overflow-hidden group">
        <img
          src={imageUrl}
          alt="Samurai Sam & Viking Vick - Boxing Match Commentators"
          className="w-full h-full object-cover select-none"
        />

        {/* Center Big Play Button Overlay */}
        {!isPlaying && (
          <button
            type="button"
            onClick={handleTogglePlay}
            className="absolute inset-0 m-auto w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-xs text-white flex items-center justify-center transition-transform hover:scale-105 shadow-xl border border-white/20 cursor-pointer"
            aria-label="Play"
          >
            <Play className="w-7 h-7 sm:w-8 sm:h-8 ml-1 fill-white" />
          </button>
        )}
      </div>

      {/* Media Controller Bar */}
      <div
        className={`px-3 py-2.5 flex flex-col gap-1.5 border-t ${
          isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
        }`}
      >
        {/* Progress Bar */}
        <div
          role="progressbar"
          aria-valuenow={Math.round(progressPercent)}
          aria-valuemin={0}
          aria-valuemax={100}
          className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden cursor-pointer"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const clickPos = (e.clientX - rect.left) / rect.width;
            setElapsedSeconds(Math.round(clickPos * durationSeconds));
          }}
        >
          <div
            className="bg-indigo-600 h-full rounded-full transition-all duration-150"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            {/* Play / Pause */}
            <button
              type="button"
              onClick={handleTogglePlay}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                isDark ? 'hover:bg-slate-800 text-white' : 'hover:bg-slate-200 text-slate-800'
              }`}
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
            </button>

            {/* Time Indicator */}
            <span className="text-xs font-mono font-medium text-slate-500 dark:text-slate-400 select-none">
              {formatTime(elapsedSeconds)} / {formatTime(durationSeconds)}
            </span>
          </div>

          <div className="flex items-center gap-1.5 relative" ref={speedMenuRef}>
            {/* Speed Control Button */}
            <button
              type="button"
              onClick={() => setIsSpeedMenuOpen((prev) => !prev)}
              className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-mono font-semibold border transition-colors cursor-pointer ${
                isDark
                  ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
              title="Velocidad de reproducción"
            >
              <Gauge className="w-3.5 h-3.5" />
              <span>{currentRate}x</span>
            </button>

            {/* Speed Dropdown Menu */}
            {isSpeedMenuOpen && (
              <div
                className={`absolute bottom-full right-0 mb-2 w-32 rounded-xl shadow-xl border py-1.5 z-30 transition-all ${
                  isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
                }`}
              >
                <div className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                  Velocidad
                </div>
                {COMPARATIVES_PLAYBACK_SPEEDS.map((sp) => (
                  <button
                    key={sp.value}
                    type="button"
                    onClick={(e) => handleSelectRate(sp.value, e)}
                    className={`w-full flex items-center justify-between px-3 py-1 text-xs font-mono transition-colors cursor-pointer ${
                      currentRate === sp.value
                        ? 'bg-indigo-600 text-white font-bold'
                        : isDark
                        ? 'hover:bg-slate-800 text-slate-300'
                        : 'hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <span>{sp.label}</span>
                    {currentRate === sp.value && <Check className="w-3.5 h-3.5 ml-1" />}
                  </button>
                ))}
              </div>
            )}

            {/* Mute Button */}
            <button
              type="button"
              onClick={handleToggleMute}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                isDark ? 'hover:bg-slate-800 text-slate-300' : 'hover:bg-slate-200 text-slate-700'
              }`}
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-rose-500" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
