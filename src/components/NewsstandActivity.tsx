import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Gauge,
  Check,
  Award,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { speakEnglish, stopSpeaking, playFeedbackSound } from '../utils/audio';
import { NewsstandActivity1 } from './newsstand/NewsstandActivity1';
import { NewsstandActivity2 } from './newsstand/NewsstandActivity2';
import { NewsstandActivity3 } from './newsstand/NewsstandActivity3';
import { NewsstandActivity4 } from './newsstand/NewsstandActivity4';
import { NewsstandActivity5 } from './newsstand/NewsstandActivity5';
import { NewsstandActivity6 } from './newsstand/NewsstandActivity6';
import { NewsstandActivity7 } from './newsstand/NewsstandActivity7';
import { NewsstandActivity8Interaction } from './newsstand/NewsstandActivity8Interaction';

export interface NewsstandActivityProps {
  accent?: 'US' | 'UK';
  speechRate?: number;
  onSuccess?: () => void;
}

const SPEED_OPTIONS = [
  { value: 0.5, label: '0.50x' },
  { value: 0.65, label: '0.65x' },
  { value: 0.85, label: '0.85x' },
  { value: 1.0, label: '1x' },
  { value: 1.15, label: '1.15x' },
  { value: 1.3, label: '1.30x' },
];

export const NewsstandActivity: React.FC<NewsstandActivityProps> = ({
  accent = 'US',
  speechRate = 1.0,
  onSuccess,
}) => {
  const { isDark } = useTheme();

  // Current activity: 0 to 7
  // 0: Actividad 1
  // 1: Actividad 2
  // 2: Actividad 3
  // 3: Actividad 4
  // 4: Actividad 5
  // 5: Actividad 6
  // 6: Actividad 7
  // 7: Actividad 8: Interacción
  const [currentActivityIdx, setCurrentActivityIdx] = useState<number>(0);

  // Audio speech rate setting (0.5x to 1.30x)
  const [currentRate, setCurrentRate] = useState<number>(speechRate);
  const [isRateMenuOpen, setIsRateMenuOpen] = useState(false);
  const rateMenuRef = useRef<HTMLDivElement | null>(null);

  // Audio playing sentence tracking
  const [playingSentenceId, setPlayingSentenceId] = useState<string | null>(null);

  // Completed activities
  const [completedActivities, setCompletedActivities] = useState<number[]>([]);

  // Close rate dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (rateMenuRef.current && !rateMenuRef.current.contains(e.target as Node)) {
        setIsRateMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Stop audio on slide change
  useEffect(() => {
    stopSpeaking();
    setPlayingSentenceId(null);
  }, [currentActivityIdx]);

  // Audio player helper
  const handlePlayAudio = (text: string, id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    stopSpeaking();
    setPlayingSentenceId(id);

    speakEnglish(
      text,
      currentRate,
      accent === 'UK' ? 'UK' : 'US',
      undefined,
      () => {
        setPlayingSentenceId(null);
      }
    );
  };

  const handleNext = () => {
    if (currentActivityIdx < 7) {
      playFeedbackSound('click');
      setCurrentActivityIdx((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentActivityIdx > 0) {
      playFeedbackSound('click');
      setCurrentActivityIdx((prev) => prev - 1);
    }
  };

  const handleActivityComplete = (idx: number) => {
    setCompletedActivities((prev) => (prev.includes(idx) ? prev : [...prev, idx]));
    if (idx === 7 && onSuccess) {
      onSuccess();
    }
  };

  const activityPills = [
    { label: 'Actividad 1' },
    { label: 'Actividad 2' },
    { label: 'Actividad 3' },
    { label: 'Actividad 4' },
    { label: 'Actividad 5' },
    { label: 'Actividad 6' },
    { label: 'Actividad 7' },
    { label: 'Actividad 8: Interacción' },
  ];

  return (
    <div className="relative w-full max-w-5xl mx-auto px-2 sm:px-4 py-4 flex flex-col gap-6">
      {/* Top Header Bar: Navigation Pills & Speed Selector */}
      <div
        className={`p-3 sm:p-4 rounded-2xl border flex flex-wrap items-center justify-between gap-3 ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        {/* Navigation Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-full py-1 scrollbar-none">
          {activityPills.map((pill, idx) => {
            const isActive = currentActivityIdx === idx;
            const isDone = completedActivities.includes(idx);

            return (
              <button
                key={pill.label}
                type="button"
                onClick={() => {
                  playFeedbackSound('click');
                  setCurrentActivityIdx(idx);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-sky-600 text-white shadow-sm ring-2 ring-sky-400/40'
                    : isDark
                    ? 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                <span>{pill.label}</span>
                {isDone && !isActive && (
                  <Check className="w-3 h-3 text-emerald-500" />
                )}
              </button>
            );
          })}
        </div>

        {/* Global Speed Selector Dial */}
        <div className="relative" ref={rateMenuRef}>
          <button
            type="button"
            onClick={() => setIsRateMenuOpen(!isRateMenuOpen)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border flex items-center gap-1.5 transition-colors cursor-pointer ${
              isDark
                ? 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'
                : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
            }`}
            aria-label="Audio playback speed"
          >
            <Gauge className="w-3.5 h-3.5 text-sky-500" />
            <span>{currentRate}x</span>
          </button>

          {isRateMenuOpen && (
            <div
              className={`absolute top-full right-0 mt-2 w-32 rounded-xl shadow-xl border py-1 z-50 animate-in fade-in zoom-in-95 ${
                isDark
                  ? 'bg-slate-800 border-slate-700 text-white'
                  : 'bg-white border-slate-200 text-slate-800'
              }`}
            >
              <div className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 text-slate-400">
                Velocidad
              </div>
              {SPEED_OPTIONS.map((sp) => (
                <button
                  key={sp.value}
                  type="button"
                  onClick={() => {
                    setCurrentRate(sp.value);
                    setIsRateMenuOpen(false);
                  }}
                  className={`w-full text-left px-2.5 py-1 text-xs flex items-center justify-between transition-colors cursor-pointer ${
                    Math.abs(currentRate - sp.value) < 0.01
                      ? 'bg-sky-500 text-white font-bold'
                      : isDark
                      ? 'text-slate-300 hover:bg-slate-700'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span>{sp.label}</span>
                  {Math.abs(currentRate - sp.value) < 0.01 && (
                    <Check className="w-3 h-3 text-white" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Activity Render View */}
      <div className="w-full">
        {currentActivityIdx === 0 && (
          <NewsstandActivity1
            currentRate={currentRate}
            onRateChange={(rate) => setCurrentRate(rate)}
            accent={accent}
            onPlayAudio={handlePlayAudio}
            playingSentenceId={playingSentenceId}
          />
        )}

        {currentActivityIdx === 1 && (
          <NewsstandActivity2
            currentRate={currentRate}
            onRateChange={(rate) => setCurrentRate(rate)}
            accent={accent}
            onPlayAudio={handlePlayAudio}
            playingSentenceId={playingSentenceId}
            onSuccess={() => handleActivityComplete(1)}
          />
        )}

        {currentActivityIdx === 2 && (
          <NewsstandActivity3
            currentRate={currentRate}
            onRateChange={(rate) => setCurrentRate(rate)}
            accent={accent}
            onPlayAudio={handlePlayAudio}
            playingSentenceId={playingSentenceId}
            onSuccess={() => handleActivityComplete(2)}
          />
        )}

        {currentActivityIdx === 3 && (
          <NewsstandActivity4
            currentRate={currentRate}
            onRateChange={(rate) => setCurrentRate(rate)}
            accent={accent}
            onPlayAudio={handlePlayAudio}
            playingSentenceId={playingSentenceId}
            onSuccess={() => handleActivityComplete(3)}
          />
        )}

        {currentActivityIdx === 4 && (
          <NewsstandActivity5
            currentRate={currentRate}
            onRateChange={(rate) => setCurrentRate(rate)}
            accent={accent}
            onPlayAudio={handlePlayAudio}
            playingSentenceId={playingSentenceId}
            onSuccess={() => handleActivityComplete(4)}
          />
        )}

        {currentActivityIdx === 5 && (
          <NewsstandActivity6
            currentRate={currentRate}
            onRateChange={(rate) => setCurrentRate(rate)}
            accent={accent}
            onPlayAudio={handlePlayAudio}
            playingSentenceId={playingSentenceId}
            onSuccess={() => handleActivityComplete(5)}
          />
        )}

        {currentActivityIdx === 6 && (
          <NewsstandActivity7
            currentRate={currentRate}
            onRateChange={(rate) => setCurrentRate(rate)}
            accent={accent}
            onPlayAudio={handlePlayAudio}
            playingSentenceId={playingSentenceId}
            onSuccess={() => handleActivityComplete(6)}
          />
        )}

        {currentActivityIdx === 7 && (
          <NewsstandActivity8Interaction
            currentRate={currentRate}
            accent={accent}
            onPlayAudio={handlePlayAudio}
            playingSentenceId={playingSentenceId}
            onSuccess={() => handleActivityComplete(7)}
          />
        )}
      </div>

      {/* Floating Side Chevron Navigation Buttons */}
      {currentActivityIdx > 0 && (
        <button
          type="button"
          onClick={handlePrev}
          className="fixed left-3 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-sky-600 hover:bg-sky-500 text-white shadow-xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 z-30 cursor-pointer border border-sky-400/40"
          aria-label="Previous activity"
        >
          <ChevronLeft className="w-6 h-6 mr-0.5 stroke-[2.5]" />
        </button>
      )}

      {currentActivityIdx < 7 && (
        <button
          type="button"
          onClick={handleNext}
          className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-sky-600 hover:bg-sky-500 text-white shadow-xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 z-30 cursor-pointer border border-sky-400/40"
          aria-label="Next activity"
        >
          <ChevronRight className="w-6 h-6 ml-0.5 stroke-[2.5]" />
        </button>
      )}
    </div>
  );
};
