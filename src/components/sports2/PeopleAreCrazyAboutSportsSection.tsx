import React, { useState, useRef, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Gauge,
  Check,
  Trophy,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { stopSpeaking, playFeedbackSound } from '../../utils/audio';

import { Sports2Activity1Story } from './Sports2Activity1Story';
import { Sports2Activity2Comprehension } from './Sports2Activity2Comprehension';
import { Sports2Activity3Comprehension } from './Sports2Activity3Comprehension';
import { Sports2Activity4Comprehension } from './Sports2Activity4Comprehension';
import { Sports2Activity5TrueFalse } from './Sports2Activity5TrueFalse';
import { Sports2Activity6Vocabulary } from './Sports2Activity6Vocabulary';
import { Sports2Activity7Cloze } from './Sports2Activity7Cloze';
import { Sports2Activity8Test } from './Sports2Activity8Test';

export interface PeopleAreCrazyAboutSportsSectionProps {
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

export const PeopleAreCrazyAboutSportsSection: React.FC<
  PeopleAreCrazyAboutSportsSectionProps
> = ({ accent = 'US', speechRate = 1.0, onSuccess }) => {
  const { isDark } = useTheme();

  // Active activity: 0 to 7 (Actividad 1 to Actividad 7, and Actividad 8: Test)
  const [currentActivityIdx, setCurrentActivityIdx] = useState<number>(0);
  const [currentRate, setCurrentRate] = useState<number>(speechRate);
  const [isRateMenuOpen, setIsRateMenuOpen] = useState(false);
  const [completedActivities, setCompletedActivities] = useState<number[]>([]);

  const rateMenuRef = useRef<HTMLDivElement | null>(null);

  // Close rate dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        rateMenuRef.current &&
        !rateMenuRef.current.contains(e.target as Node)
      ) {
        setIsRateMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Stop audio whenever changing activity
  useEffect(() => {
    stopSpeaking();
  }, [currentActivityIdx]);

  const handlePrev = () => {
    if (currentActivityIdx > 0) {
      playFeedbackSound('click');
      setCurrentActivityIdx((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentActivityIdx < 7) {
      playFeedbackSound('click');
      setCurrentActivityIdx((prev) => prev + 1);
    }
  };

  const handleActivityComplete = (idx: number) => {
    setCompletedActivities((prev) =>
      prev.includes(idx) ? prev : [...prev, idx]
    );
    if (idx === 7 && onSuccess) {
      onSuccess();
    }
  };

  // Keyboard navigation (< and >)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeTag = document.activeElement?.tagName.toLowerCase();
      if (activeTag === 'input' || activeTag === 'textarea') return;

      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentActivityIdx]);

  const activityPills = [
    { label: 'Actividad 1' },
    { label: 'Actividad 2' },
    { label: 'Actividad 3' },
    { label: 'Actividad 4' },
    { label: 'Actividad 5' },
    { label: 'Actividad 6' },
    { label: 'Actividad 7' },
    { label: 'Actividad 8: Test' },
  ];

  return (
    <div className="relative w-full flex flex-col items-center">
      {/* Floating Previous Activity Button (<) */}
      <button
        id="sports2-floating-prev-activity-btn"
        type="button"
        onClick={handlePrev}
        disabled={currentActivityIdx === 0}
        className={`fixed sm:absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 z-40 w-11 h-11 sm:w-13 sm:h-13 rounded-full flex items-center justify-center border shadow-2xl transition-all cursor-pointer select-none ${
          currentActivityIdx === 0
            ? 'opacity-0 pointer-events-none scale-75'
            : isDark
            ? 'bg-[#1E293B]/95 hover:bg-sky-600 text-white border-white/20 hover:border-sky-400 shadow-sky-950/70 hover:scale-110 active:scale-95'
            : 'bg-white/95 hover:bg-sky-600 text-slate-800 hover:text-white border-slate-300 hover:border-sky-600 shadow-slate-400/60 hover:scale-110 active:scale-95'
        }`}
        title={
          currentActivityIdx > 0
            ? `Actividad anterior: ${activityPills[currentActivityIdx - 1]?.label}`
            : 'Inicio'
        }
        aria-label="Actividad anterior"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Floating Next Activity Button (>) */}
      <button
        id="sports2-floating-next-activity-btn"
        type="button"
        onClick={handleNext}
        disabled={currentActivityIdx >= activityPills.length - 1}
        className={`fixed sm:absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 z-40 w-11 h-11 sm:w-13 sm:h-13 rounded-full flex items-center justify-center border shadow-2xl transition-all cursor-pointer select-none ${
          currentActivityIdx >= activityPills.length - 1
            ? 'opacity-0 pointer-events-none scale-75'
            : isDark
            ? 'bg-[#1E293B]/95 hover:bg-sky-600 text-white border-white/20 hover:border-sky-400 shadow-sky-950/70 hover:scale-110 active:scale-95'
            : 'bg-white/95 hover:bg-sky-600 text-slate-800 hover:text-white border-slate-300 hover:border-sky-600 shadow-slate-400/60 hover:scale-110 active:scale-95'
        }`}
        title={
          currentActivityIdx < activityPills.length - 1
            ? `Siguiente actividad: ${activityPills[currentActivityIdx + 1]?.label}`
            : 'Fin'
        }
        aria-label="Siguiente actividad"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Main Content Area framed with padding so floating buttons don't overlap */}
      <div className="w-full max-w-5xl px-2 sm:px-6 md:px-8 py-4 flex flex-col gap-6">
        {/* Top Header Bar: Navigation Pills & Speed Selector */}
        <div
          className={`p-3 sm:p-4 rounded-2xl border flex flex-wrap items-center justify-between gap-3 ${
            isDark
              ? 'bg-slate-900 border-slate-800'
              : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          {/* Navigation Pills (Actividad 1 to Actividad 7 and Actividad 8: Test) */}
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

          {/* Speed Controls & Prev/Next */}
          <div className="flex items-center gap-2">
            {/* Speed Selector Dropdown */}
            <div className="relative" ref={rateMenuRef}>
              <button
                type="button"
                onClick={() => setIsRateMenuOpen((prev) => !prev)}
                className={`h-9 px-2.5 rounded-xl border flex items-center gap-1.5 text-xs font-semibold transition-all cursor-pointer ${
                  isDark
                    ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                    : 'bg-stone-50 border-slate-200 text-slate-700 hover:bg-stone-100'
                }`}
                title="Velocidad de reproducción"
              >
                <Gauge className="w-3.5 h-3.5 text-sky-500" />
                <span>
                  {SPEED_OPTIONS.find((s) => s.value === currentRate)?.label ||
                    `${currentRate}x`}
                </span>
              </button>

              {isRateMenuOpen && (
                <div
                  className={`absolute right-0 top-full mt-1 w-28 rounded-xl border py-1 shadow-lg z-50 animate-in fade-in zoom-in-95 duration-150 ${
                    isDark
                      ? 'bg-slate-900 border-slate-800 text-slate-200'
                      : 'bg-white border-slate-200 text-slate-800'
                  }`}
                >
                  {SPEED_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => {
                        setCurrentRate(opt.value);
                        setIsRateMenuOpen(false);
                      }}
                      className={`w-full px-3 py-1.5 text-xs font-medium text-left flex items-center justify-between transition-colors ${
                        currentRate === opt.value
                          ? 'bg-sky-500/10 text-sky-500 font-bold'
                          : isDark
                          ? 'hover:bg-slate-800 text-slate-300'
                          : 'hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <span>{opt.label}</span>
                      {currentRate === opt.value && (
                        <Check className="w-3 h-3 text-sky-500" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Prev Button */}
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentActivityIdx === 0}
              className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                currentActivityIdx === 0
                  ? 'opacity-30 cursor-not-allowed border-slate-200 dark:border-slate-800 text-slate-400'
                  : isDark
                  ? 'bg-slate-800 border-slate-700 hover:bg-slate-700 text-slate-200'
                  : 'bg-white border-slate-200 hover:bg-stone-50 text-slate-700'
              }`}
              title="Actividad anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Next Button */}
            <button
              type="button"
              onClick={handleNext}
              disabled={currentActivityIdx === 7}
              className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                currentActivityIdx === 7
                  ? 'opacity-30 cursor-not-allowed border-slate-200 dark:border-slate-800 text-slate-400'
                  : isDark
                  ? 'bg-slate-800 border-slate-700 hover:bg-slate-700 text-slate-200'
                  : 'bg-white border-slate-200 hover:bg-stone-50 text-slate-700'
              }`}
              title="Siguiente actividad"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Main Dynamic Activity Content */}
        <div className="w-full">
          {currentActivityIdx === 0 && (
            <Sports2Activity1Story
              accent={accent}
              speechRate={currentRate}
              onComplete={() => handleActivityComplete(0)}
            />
          )}
          {currentActivityIdx === 1 && (
            <Sports2Activity2Comprehension
              accent={accent}
              speechRate={currentRate}
              onComplete={() => handleActivityComplete(1)}
            />
          )}
          {currentActivityIdx === 2 && (
            <Sports2Activity3Comprehension
              accent={accent}
              speechRate={currentRate}
              onComplete={() => handleActivityComplete(2)}
            />
          )}
          {currentActivityIdx === 3 && (
            <Sports2Activity4Comprehension
              accent={accent}
              speechRate={currentRate}
              onComplete={() => handleActivityComplete(3)}
            />
          )}
          {currentActivityIdx === 4 && (
            <Sports2Activity5TrueFalse
              accent={accent}
              speechRate={currentRate}
              onComplete={() => handleActivityComplete(4)}
            />
          )}
          {currentActivityIdx === 5 && (
            <Sports2Activity6Vocabulary
              accent={accent}
              speechRate={currentRate}
              onComplete={() => handleActivityComplete(5)}
            />
          )}
          {currentActivityIdx === 6 && (
            <Sports2Activity7Cloze
              accent={accent}
              speechRate={currentRate}
              onComplete={() => handleActivityComplete(6)}
            />
          )}
          {currentActivityIdx === 7 && (
            <Sports2Activity8Test
              accent={accent}
              speechRate={currentRate}
              onSuccess={() => handleActivityComplete(7)}
            />
          )}
        </div>
      </div>
    </div>
  );
};
