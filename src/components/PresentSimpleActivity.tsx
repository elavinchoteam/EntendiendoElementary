import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Gauge,
  Check,
  Award,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { stopSpeaking, playFeedbackSound } from '../utils/audio';
import {
  PRESENT_SIMPLE_ACTIVITIES,
} from '../data/presentSimpleData';
import { PresentSimpleActivitySlide } from './presentSimple/PresentSimpleActivitySlide';
import { PresentSimpleTest } from './presentSimple/PresentSimpleTest';

export interface PresentSimpleActivityProps {
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

export const PresentSimpleActivity: React.FC<PresentSimpleActivityProps> = ({
  accent = 'US',
  speechRate = 1.0,
  onSuccess,
}) => {
  const { isDark } = useTheme();

  // Current activity: 0 to 11
  // 0 to 10: Actividad 1 to Actividad 11
  // 11: Actividad 12: Test (with Test 1 to Test 5)
  const [currentActivityIdx, setCurrentActivityIdx] = useState<number>(0);

  // Audio speech rate setting (0.5x to 1.30x)
  const [currentRate, setCurrentRate] = useState<number>(speechRate);
  const [isRateMenuOpen, setIsRateMenuOpen] = useState(false);
  const rateMenuRef = useRef<HTMLDivElement | null>(null);

  // Completed activities tracking
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

  // Stop any audio on activity change
  useEffect(() => {
    stopSpeaking();
  }, [currentActivityIdx]);

  const handleNext = () => {
    if (currentActivityIdx < 11) {
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
  };

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
    <div className="relative w-full max-w-6xl mx-auto px-2 sm:px-4 py-4 flex flex-col gap-6">
      {/* Top Header Bar: Navigation Pills & Speed Selector */}
      <div
        className={`p-3 sm:p-4 rounded-2xl border flex flex-wrap items-center justify-between gap-3 ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        {/* Navigation Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-full py-1 scrollbar-none">
          {activityPills.map((pill, idx) => {
            const isCurrent = idx === currentActivityIdx;
            const isCompleted = completedActivities.includes(idx);

            return (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  playFeedbackSound('click');
                  setCurrentActivityIdx(idx);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1 cursor-pointer ${
                  isCurrent
                    ? 'bg-blue-600 text-white shadow-xs'
                    : isCompleted
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                    : isDark
                    ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {isCompleted && !isCurrent && <Check className="w-3 h-3 text-emerald-600" />}
                {idx === 11 && <Award className="w-3 h-3 text-amber-500" />}
                <span>{pill.label}</span>
              </button>
            );
          })}
        </div>

        {/* Speed Selector Dropdown */}
        <div className="relative" ref={rateMenuRef}>
          <button
            type="button"
            onClick={() => setIsRateMenuOpen((prev) => !prev)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
              isDark
                ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'
                : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Gauge className="w-3.5 h-3.5 text-blue-500" />
            <span>{currentRate}x</span>
          </button>

          {isRateMenuOpen && (
            <div
              className={`absolute right-0 mt-1 w-28 py-1 rounded-xl shadow-lg border z-50 animate-in fade-in zoom-in-95 ${
                isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
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
                  className={`w-full px-3 py-1.5 text-left text-xs font-medium transition-colors flex items-center justify-between cursor-pointer ${
                    currentRate === opt.value
                      ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-bold'
                      : isDark
                      ? 'text-slate-200 hover:bg-slate-700'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span>{opt.label}</span>
                  {currentRate === opt.value && <Check className="w-3 h-3" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Activity Screen */}
      <div className="relative min-h-[460px]">
        {/* Floating / edge Prev button */}
        {currentActivityIdx > 0 && (
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous activity"
            className={`hidden xl:flex absolute -left-12 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border items-center justify-center transition-all z-20 shadow-md hover:scale-105 cursor-pointer ${
              isDark
                ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}

        {/* Floating / edge Next button */}
        {currentActivityIdx < 11 && (
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next activity"
            className={`hidden xl:flex absolute -right-12 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border items-center justify-center transition-all z-20 shadow-md hover:scale-105 cursor-pointer ${
              isDark
                ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}

        {/* Activities 1 to 11 */}
        {currentActivityIdx >= 0 && currentActivityIdx <= 10 && (
          <PresentSimpleActivitySlide
            activity={PRESENT_SIMPLE_ACTIVITIES[currentActivityIdx]}
            speechRate={currentRate}
            accent={accent}
            onNext={handleNext}
            onComplete={() => handleActivityComplete(currentActivityIdx)}
          />
        )}

        {/* Actividad 12: Test (5 Tests) */}
        {currentActivityIdx === 11 && (
          <PresentSimpleTest
            speechRate={currentRate}
            accent={accent}
            onSuccess={() => {
              handleActivityComplete(11);
              if (onSuccess) {
                onSuccess();
              }
            }}
          />
        )}
      </div>

      {/* Bottom Step Indicator and Prev/Next Navigation Controls */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-500">
        <button
          type="button"
          onClick={handlePrev}
          disabled={currentActivityIdx === 0}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-colors ${
            currentActivityIdx === 0
              ? 'opacity-40 cursor-not-allowed border-transparent'
              : isDark
              ? 'border-slate-800 hover:bg-slate-800 text-slate-200 cursor-pointer'
              : 'border-slate-200 hover:bg-slate-100 text-slate-700 cursor-pointer'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Anterior</span>
        </button>

        <div className="font-medium">
          Paso {currentActivityIdx + 1} de {activityPills.length}
        </div>

        <button
          type="button"
          onClick={handleNext}
          disabled={currentActivityIdx === 11}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-colors ${
            currentActivityIdx === 11
              ? 'opacity-40 cursor-not-allowed border-transparent'
              : isDark
              ? 'border-slate-800 hover:bg-slate-800 text-slate-200 cursor-pointer'
              : 'border-slate-200 hover:bg-slate-100 text-slate-700 cursor-pointer'
          }`}
        >
          <span>Siguiente</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
