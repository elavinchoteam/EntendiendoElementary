import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import {
  SWIMMING_DIALOGUE_LINES,
  SWIMMING_AUDIO_FULL,
  swimmingWomenImg,
} from '../../data/swimmingData';
import { SwimmingReversibleCard } from './SwimmingReversibleCard';
import { speakEnglish, stopSpeaking } from '../../utils/audio';
import { useTheme } from '../../context/ThemeContext';
import { SpeedSelectorButton } from '../SpeedSelectorButton';

interface SwimmingActivity1ExploreProps {
  accent?: 'US' | 'UK';
  speechRate?: number;
  onComplete?: () => void;
}

export const SwimmingActivity1Explore: React.FC<
  SwimmingActivity1ExploreProps
> = ({ accent = 'US', speechRate = 1.0, onComplete }) => {
  const { isDark } = useTheme();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [currentRate, setCurrentRate] = useState<number>(speechRate);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const TOTAL_DURATION = 22; // 22 seconds as in original screenshot

  useEffect(() => {
    setCurrentRate(speechRate);
  }, [speechRate]);

  useEffect(() => {
    return () => {
      stopSpeaking();
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handleTogglePlay = () => {
    if (isPlaying) {
      stopSpeaking();
      setIsPlaying(false);
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    setIsPlaying(true);
    setCurrentTime(0);

    if (timerRef.current) clearInterval(timerRef.current);
    const intervalTime = 1000 / currentRate;
    timerRef.current = setInterval(() => {
      setCurrentTime((prev) => {
        if (prev >= TOTAL_DURATION) {
          if (timerRef.current) clearInterval(timerRef.current);
          setIsPlaying(false);
          if (onComplete) onComplete();
          return TOTAL_DURATION;
        }
        return prev + 1;
      });
    }, intervalTime);

    speakEnglish(
      SWIMMING_AUDIO_FULL,
      currentRate,
      accent as 'US' | 'UK',
      () => setIsPlaying(true),
      () => {
        setIsPlaying(false);
        if (timerRef.current) clearInterval(timerRef.current);
        setCurrentTime(TOTAL_DURATION);
        if (onComplete) onComplete();
      },
      'female'
    );
  };

  const handleRateChange = (newRate: number) => {
    setCurrentRate(newRate);
    if (isPlaying) {
      stopSpeaking();
      setIsPlaying(false);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full flex flex-col items-center gap-6 py-2">
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: Media Video/Image Player */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div
            className={`w-full rounded-2xl sm:rounded-3xl border overflow-hidden shadow-sm transition-colors ${
              isDark
                ? 'bg-slate-900 border-slate-800'
                : 'bg-white border-slate-200'
            }`}
          >
            {/* Image Frame */}
            <div className="relative aspect-4/3 w-full overflow-hidden bg-slate-950 flex items-center justify-center">
              <img
                src={swimmingWomenImg}
                alt="Two young women friends discussing plans"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />

              {/* Play Overlay when paused */}
              {!isPlaying && (
                <button
                  type="button"
                  onClick={handleTogglePlay}
                  className="absolute inset-0 m-auto w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-sky-600/90 hover:bg-sky-500 text-white flex items-center justify-center shadow-xl hover:scale-110 transition-all cursor-pointer backdrop-blur-xs"
                  aria-label="Play dialogue"
                >
                  <Play className="w-7 h-7 sm:w-8 sm:h-8 ml-1 fill-current" />
                </button>
              )}
            </div>

            {/* Player Controls Bar */}
            <div
              className={`p-3 sm:p-4 border-t flex flex-col gap-2.5 ${
                isDark
                  ? 'bg-slate-950 border-slate-800'
                  : 'bg-stone-50 border-slate-200'
              }`}
            >
              {/* Timeline bar */}
              <div className="w-full flex items-center gap-3">
                <span className="text-[11px] font-mono text-slate-500">
                  {formatTime(currentTime)}
                </span>
                <div className="flex-1 h-2 rounded-full bg-slate-200 dark:bg-slate-800 relative overflow-hidden">
                  <div
                    className="h-full bg-sky-500 rounded-full transition-all duration-300"
                    style={{
                      width: `${(currentTime / TOTAL_DURATION) * 100}%`,
                    }}
                  />
                </div>
                <span className="text-[11px] font-mono text-slate-500">
                  {formatTime(TOTAL_DURATION)}
                </span>
              </div>

              {/* Buttons row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleTogglePlay}
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                      isPlaying
                        ? 'bg-sky-500 text-white'
                        : isDark
                        ? 'bg-slate-800 hover:bg-slate-700 text-sky-400'
                        : 'bg-white hover:bg-stone-100 text-sky-600 border border-slate-200'
                    }`}
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? (
                      <Pause className="w-4 h-4 fill-current" />
                    ) : (
                      <Play className="w-4 h-4 ml-0.5 fill-current" />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsMuted((prev) => !prev)}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all cursor-pointer ${
                      isDark
                        ? 'text-slate-400 hover:text-slate-200'
                        : 'text-slate-600 hover:text-slate-900'
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

                <SpeedSelectorButton
                  currentRate={currentRate}
                  onRateChange={handleRateChange}
                  size="sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Reversible Dialogue Card */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <SwimmingReversibleCard
            lines={SWIMMING_DIALOGUE_LINES}
            accent={accent}
            speechRate={currentRate}
            onSpeechRateChange={setCurrentRate}
          />
        </div>
      </div>
    </div>
  );
};
