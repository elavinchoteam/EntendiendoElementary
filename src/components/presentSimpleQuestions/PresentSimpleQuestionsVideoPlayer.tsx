import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Gauge } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { speakEnglish, stopSpeaking } from '../../utils/audio';
import {
  brutusDogImg,
  PRESENT_SIMPLE_QUESTIONS_REFERENCE,
} from '../../data/presentSimpleQuestionsData';
import { PresentSimpleQuestionsCard } from './PresentSimpleQuestionsCard';

export interface PresentSimpleQuestionsVideoPlayerProps {
  speechRate: number;
  accent: 'US' | 'UK';
}

export const PresentSimpleQuestionsVideoPlayer: React.FC<PresentSimpleQuestionsVideoPlayerProps> = ({
  speechRate,
  accent,
}) => {
  const { isDark } = useTheme();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0); // 0 to 100
  const [currentTimeSec, setCurrentTimeSec] = useState(0);
  const totalDurationSec = PRESENT_SIMPLE_QUESTIONS_REFERENCE.durationSec; // 13 seconds

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
          PRESENT_SIMPLE_QUESTIONS_REFERENCE.fullTextEn,
          speechRate,
          accent === 'UK' ? 'UK' : 'US',
          undefined,
          () => {
            // Audio complete
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

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setProgress(val);
    setCurrentTimeSec(Math.round((val / 100) * totalDurationSec));
  };

  const formatTime = (seconds: number) => {
    const s = Math.floor(seconds);
    return `00:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      {/* Video Box */}
      <div
        className={`rounded-2xl border overflow-hidden transition-all ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}
      >
        {/* Visual Frame */}
        <div className="relative aspect-4/3 w-full bg-slate-950 overflow-hidden flex items-center justify-center">
          <img
            src={brutusDogImg}
            alt="Charlie, friend and Brutus the dog"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />

          {/* Overlay Play Indicator when stopped */}
          {!isPlaying && (
            <button
              onClick={handlePlayToggle}
              className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-slate-900/60 hover:bg-slate-900/80 text-white flex items-center justify-center backdrop-blur-xs transition-all hover:scale-105"
              aria-label="Play video"
            >
              <Play className="w-7 h-7 ml-1" />
            </button>
          )}
        </div>

        {/* Video Controls Bar */}
        <div
          className={`px-3 py-2 border-t flex items-center gap-2 sm:gap-3 text-xs sm:text-sm ${
            isDark ? 'bg-slate-900 border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-700'
          }`}
        >
          {/* Play/Pause Button */}
          <button
            type="button"
            onClick={handlePlayToggle}
            className={`p-1.5 rounded-lg transition-colors ${
              isPlaying
                ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/30'
                : 'hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>

          {/* Seekbar */}
          <div className="flex-1 flex items-center">
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={handleSeek}
              className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          {/* Speed Indicator */}
          <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400 font-mono text-xs">
            <Gauge className="w-3.5 h-3.5" />
            <span>{speechRate}x</span>
          </div>

          {/* Mute Toggle */}
          <button
            type="button"
            onClick={handleMuteToggle}
            className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-rose-500" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </button>

          {/* Time Display */}
          <div className="font-mono text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">
            {formatTime(currentTimeSec)}/{formatTime(totalDurationSec)}
          </div>
        </div>
      </div>

      {/* Reversible Subtitle Card with full dialogue & highlights */}
      <PresentSimpleQuestionsCard
        textEn={PRESENT_SIMPLE_QUESTIONS_REFERENCE.fullTextEn}
        textEs={PRESENT_SIMPLE_QUESTIONS_REFERENCE.fullTextEs}
        highlightWords={['Do', 'like', 'do', 'Does', 'bite', "doesn't"]}
        speechRate={speechRate}
        accent={accent}
        className="w-full"
        renderCustomContent={(isFlipped) => (
          <div className="space-y-2">
            {!isFlipped ? (
              PRESENT_SIMPLE_QUESTIONS_REFERENCE.dialogueLines.map((line, idx) => {
                const words = line.highlightWords;
                const parts = line.en.split(
                  new RegExp(`(${words.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi')
                );
                return (
                  <div key={idx} className="text-sm sm:text-base font-medium leading-relaxed">
                    {parts.map((part, pIdx) => {
                      const isMatch = words.some((w) => w.toLowerCase() === part.toLowerCase());
                      return isMatch ? (
                        <span
                          key={pIdx}
                          className="bg-cyan-300 text-cyan-950 font-semibold px-1 rounded-sm mx-0.5"
                        >
                          {part}
                        </span>
                      ) : (
                        part
                      );
                    })}
                  </div>
                );
              })
            ) : (
              PRESENT_SIMPLE_QUESTIONS_REFERENCE.dialogueLines.map((line, idx) => (
                <div
                  key={idx}
                  className={`text-sm sm:text-base font-medium leading-relaxed italic ${
                    isDark ? 'text-amber-300' : 'text-amber-800'
                  }`}
                >
                  {line.es}
                </div>
              ))
            )}
          </div>
        )}
      />
    </div>
  );
};
