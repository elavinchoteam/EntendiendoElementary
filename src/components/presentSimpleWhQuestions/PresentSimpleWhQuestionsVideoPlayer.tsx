import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Gauge } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { speakEnglish, stopSpeaking } from '../../utils/audio';
import {
  shoppingWomenImg,
  PRESENT_SIMPLE_WH_REFERENCE,
} from '../../data/presentSimpleWhQuestionsData';
import { PresentSimpleWhQuestionsCard } from './PresentSimpleWhQuestionsCard';

export interface PresentSimpleWhQuestionsVideoPlayerProps {
  speechRate: number;
  accent: 'US' | 'UK';
}

export const PresentSimpleWhQuestionsVideoPlayer: React.FC<PresentSimpleWhQuestionsVideoPlayerProps> = ({
  speechRate,
  accent,
}) => {
  const { isDark } = useTheme();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0); // 0 to 100
  const [currentTimeSec, setCurrentTimeSec] = useState(0);
  const totalDurationSec = PRESENT_SIMPLE_WH_REFERENCE.durationSec; // 5 seconds

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      stopSpeaking();
    };
  }, []);

  const handlePlayToggle = () => {
    if (isPlaying) {
      stopSpeaking();
      setIsPlaying(false);
      if (timerRef.current) clearInterval(timerRef.current);
    } else {
      setIsPlaying(true);
      setProgress(0);
      setCurrentTimeSec(0);

      const startTime = Date.now();
      const effectiveDuration = (totalDurationSec / speechRate) * 1000;

      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const currentProgress = Math.min(100, (elapsed / effectiveDuration) * 100);
        const currentSec = Math.min(
          totalDurationSec,
          Math.floor((elapsed / effectiveDuration) * totalDurationSec)
        );
        setProgress(currentProgress);
        setCurrentTimeSec(currentSec);

        if (elapsed >= effectiveDuration) {
          if (timerRef.current) clearInterval(timerRef.current);
          setIsPlaying(false);
          setProgress(100);
          setCurrentTimeSec(totalDurationSec);
        }
      }, 50);

      if (!isMuted) {
        speakEnglish(
          "- Where do you buy your clothes? - Why do you want to know?",
          speechRate,
          accent === 'UK' ? 'UK' : 'US',
          undefined,
          () => {
            // Audio finished
          }
        );
      }
    }
  };

  const handleMuteToggle = () => {
    if (!isMuted) {
      stopSpeaking();
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
  };

  const formatTime = (sec: number) => {
    const s = Math.floor(sec);
    return `00:0${Math.min(9, s)}`;
  };

  return (
    <div
      className={`rounded-2xl border overflow-hidden shadow-sm flex flex-col ${
        isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'
      }`}
    >
      {/* Video Screen Simulation */}
      <div className="relative aspect-video w-full bg-slate-950 flex items-center justify-center overflow-hidden group">
        <img
          src={shoppingWomenImg}
          alt="Two women shopping and talking outside boutique"
          className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
        />

        {/* Ambient Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30 pointer-events-none" />

        {/* Center Play/Pause button on canvas */}
        <button
          type="button"
          onClick={handlePlayToggle}
          className="absolute z-10 w-16 h-16 rounded-full bg-blue-600/90 hover:bg-blue-600 text-white flex items-center justify-center shadow-lg transition-transform transform active:scale-95 hover:scale-105"
          aria-label={isPlaying ? 'Pause video' : 'Play video'}
        >
          {isPlaying ? (
            <Pause className="w-8 h-8 fill-current" />
          ) : (
            <Play className="w-8 h-8 fill-current ml-1" />
          )}
        </button>

        {/* Subtitles Overlay synchronized with video */}
        <div className="absolute bottom-3 left-4 right-4 z-10 pointer-events-none">
          <div className="bg-black/75 backdrop-blur-xs text-white px-4 py-2 rounded-lg text-sm sm:text-base font-medium inline-block max-w-full">
            <p className="leading-snug">
              - <span className="text-cyan-300 font-bold">Where</span> do you buy your clothes?
            </p>
            <p className="leading-snug">
              - <span className="text-cyan-300 font-bold">Why</span> do you want to know?
            </p>
          </div>
        </div>
      </div>

      {/* Video Controls Bar */}
      <div
        className={`px-4 py-3 flex items-center gap-3 border-t text-sm ${
          isDark ? 'bg-slate-800/80 border-slate-700 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-700'
        }`}
      >
        <button
          type="button"
          onClick={handlePlayToggle}
          className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? (
            <Pause className="w-5 h-5 text-blue-600" />
          ) : (
            <Play className="w-5 h-5 text-blue-600" />
          )}
        </button>

        {/* Time code */}
        <span className="font-mono text-xs tabular-nums select-none shrink-0">
          {formatTime(currentTimeSec)} / 00:05
        </span>

        {/* Timeline track */}
        <div className="flex-1 h-2 bg-slate-300 dark:bg-slate-700 rounded-full overflow-hidden relative cursor-pointer">
          <div
            className="h-full bg-blue-600 transition-all duration-100 ease-linear rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Speed indicator */}
        <div
          className="flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded bg-slate-200 dark:bg-slate-700 shrink-0"
          title="Speech Rate"
        >
          <Gauge className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
          <span>{speechRate}x</span>
        </div>

        {/* Mute button */}
        <button
          type="button"
          onClick={handleMuteToggle}
          className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition"
          aria-label={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? (
            <VolumeX className="w-5 h-5 text-red-500" />
          ) : (
            <Volume2 className="w-5 h-5 text-slate-600 dark:text-slate-300" />
          )}
        </button>
      </div>

      {/* Reversible Dialogue Card below Video */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-800">
        <PresentSimpleWhQuestionsCard
          textEn={PRESENT_SIMPLE_WH_REFERENCE.sentenceEn}
          textEs={PRESENT_SIMPLE_WH_REFERENCE.sentenceEs}
          highlightWords={["Where", "Why"]}
          speechRate={speechRate}
          accent={accent}
        />
      </div>
    </div>
  );
};
