import React, { useState, useRef, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Gauge,
  Check,
  Award,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { stopSpeaking, playFeedbackSound } from '../../utils/audio';
import {
  COMPARISON_ACTIVITIES,
  COMPARISON_TESTS,
} from '../../data/comparisonEqualityData';
import { ComparisonActivity1Explore } from './ComparisonActivity1Explore';
import { ComparisonDragDropActivity } from './ComparisonDragDropActivity';
import { ComparisonTestActivity } from './ComparisonTestActivity';

export interface ComparisonAdjectivesEqualitySectionProps {
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

export const ComparisonAdjectivesEqualitySection: React.FC<ComparisonAdjectivesEqualitySectionProps> = ({
  accent = 'US',
  speechRate = 1.0,
  onSuccess,
}) => {
  const { isDark } = useTheme();

  // Active activity: 0 to 11 (Actividad 1 to Actividad 11, and Actividad 12: Test)
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
    if (currentActivityIdx < 11) {
      playFeedbackSound('click');
      setCurrentActivityIdx((prev) => prev + 1);
    }
  };

  const handleActivityComplete = (idx: number) => {
    setCompletedActivities((prev) =>
      prev.includes(idx) ? prev : [...prev, idx]
    );
    if (idx === 11 && onSuccess) {
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
    { label: 'Actividad 8' },
    { label: 'Actividad 9' },
    { label: 'Actividad 10' },
    { label: 'Actividad 11' },
    { label: 'Actividad 12: Test' },
  ];

  return (
    <div className="relative w-full flex flex-col items-center">
      {/* Floating Previous Activity Button (<) */}
      <button
        id="floating-prev-btn"
        type="button"
        onClick={handlePrev}
        disabled={currentActivityIdx === 0}
        className={`fixed sm:absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 z-40 w-11 h-11 sm:w-13 sm:h-13 rounded-full flex items-center justify-center border shadow-2xl transition-all cursor-pointer select-none ${
          currentActivityIdx === 0
            ? 'opacity-0 pointer-events-none scale-75'
            : isDark
            ? 'bg-[#1E293B]/95 hover:bg-indigo-600 text-white border-white/20 hover:border-indigo-400 shadow-indigo-950/70 hover:scale-110 active:scale-95'
            : 'bg-white/95 hover:bg-indigo-600 text-slate-800 hover:text-white border-slate-300 hover:border-indigo-600 shadow-slate-400/60 hover:scale-110 active:scale-95'
        }`}
        title="Actividad anterior"
        aria-label="Actividad anterior"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Floating Next Activity Button (>) */}
      <button
        id="floating-next-btn"
        type="button"
        onClick={handleNext}
        disabled={currentActivityIdx >= 11}
        className={`fixed sm:absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 z-40 w-11 h-11 sm:w-13 sm:h-13 rounded-full flex items-center justify-center border shadow-2xl transition-all cursor-pointer select-none ${
          currentActivityIdx >= 11
            ? 'opacity-0 pointer-events-none scale-75'
            : isDark
            ? 'bg-[#1E293B]/95 hover:bg-indigo-600 text-white border-white/20 hover:border-indigo-400 shadow-indigo-950/70 hover:scale-110 active:scale-95'
            : 'bg-white/95 hover:bg-indigo-600 text-slate-800 hover:text-white border-slate-300 hover:border-indigo-600 shadow-slate-400/60 hover:scale-110 active:scale-95'
        }`}
        title="Siguiente actividad"
        aria-label="Siguiente actividad"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Inner Container */}
      <div className="w-full max-w-5xl px-3 sm:px-8 py-2 flex flex-col gap-5">
        {/* Top Control Bar: Progress Pill, Title and Speed Selector */}
        <div className="w-full flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-inherit/40">
          <div className="flex items-center gap-2">
            <span
              className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider ${
                isDark
                  ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                  : 'bg-indigo-100 text-indigo-700 border border-indigo-200'
              }`}
            >
              Actividad {currentActivityIdx + 1} de 12
            </span>
            <span className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200">
              Comparison of Adjectives: Equality
            </span>
          </div>

          {/* Speed Selector (0.5x, 0.65x, 0.85x, 1x, 1.15x, 1.30x) */}
          <div className="relative" ref={rateMenuRef}>
            <button
              type="button"
              id="speed-selector-btn"
              onClick={() => setIsRateMenuOpen((prev) => !prev)}
              className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                isDark
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
              }`}
            >
              <Gauge className="w-3.5 h-3.5 text-indigo-500" />
              <span>{SPEED_OPTIONS.find((s) => s.value === currentRate)?.label || `${currentRate}x`}</span>
            </button>

            {isRateMenuOpen && (
              <div
                className={`absolute right-0 top-full mt-2 w-36 rounded-xl border shadow-xl z-50 p-1.5 flex flex-col gap-1 ${
                  isDark
                    ? 'bg-slate-800 border-slate-700 text-white'
                    : 'bg-white border-slate-200 text-slate-900'
                }`}
              >
                <div className="px-2 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Velocidad
                </div>
                {SPEED_OPTIONS.map((spd) => (
                  <button
                    key={spd.value}
                    type="button"
                    onClick={() => {
                      setCurrentRate(spd.value);
                      setIsRateMenuOpen(false);
                      playFeedbackSound('click');
                    }}
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

        {/* Activity Selector Pills Horizontal Scroll */}
        <div className="w-full flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {activityPills.map((pill, idx) => {
            const isActive = currentActivityIdx === idx;
            const isDone = completedActivities.includes(idx);

            return (
              <button
                key={idx}
                id={`activity-pill-${idx + 1}`}
                type="button"
                onClick={() => {
                  playFeedbackSound('click');
                  setCurrentActivityIdx(idx);
                }}
                className={`shrink-0 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 border select-none ${
                  isActive
                    ? 'bg-indigo-600 text-white border-indigo-500 shadow-md scale-102 ring-2 ring-indigo-400'
                    : isDone
                    ? 'bg-emerald-600/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 hover:bg-emerald-600/25'
                    : isDark
                    ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                }`}
              >
                {idx === 11 ? (
                  <Award className="w-3.5 h-3.5 text-amber-500" />
                ) : isDone ? (
                  <Check className="w-3.5 h-3.5" />
                ) : null}
                <span>{pill.label}</span>
              </button>
            );
          })}
        </div>

        {/* Main Content Render */}
        <div className="w-full animate-in fade-in duration-200">
          {currentActivityIdx === 0 && (
            <ComparisonActivity1Explore
              accent={accent}
              speechRate={currentRate}
            />
          )}

          {currentActivityIdx >= 1 && currentActivityIdx <= 10 && (
            <ComparisonDragDropActivity
              key={COMPARISON_ACTIVITIES[currentActivityIdx - 1].id}
              activity={COMPARISON_ACTIVITIES[currentActivityIdx - 1]}
              accent={accent}
              speechRate={currentRate}
              onComplete={() => handleActivityComplete(currentActivityIdx)}
            />
          )}

          {currentActivityIdx === 11 && (
            <ComparisonTestActivity
              tests={COMPARISON_TESTS}
              accent={accent}
              speechRate={currentRate}
              onSuccess={() => handleActivityComplete(11)}
            />
          )}
        </div>
      </div>
    </div>
  );
};
