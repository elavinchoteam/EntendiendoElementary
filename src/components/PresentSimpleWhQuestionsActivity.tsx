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
  PRESENT_SIMPLE_WH_ACTIVITIES,
} from '../data/presentSimpleWhQuestionsData';
import { PresentSimpleWhQuestionsActivitySlide } from './presentSimpleWhQuestions/PresentSimpleWhQuestionsActivitySlide';
import { PresentSimpleWhQuestionsTest } from './presentSimpleWhQuestions/PresentSimpleWhQuestionsTest';

export interface PresentSimpleWhQuestionsActivityProps {
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

export const PresentSimpleWhQuestionsActivity: React.FC<PresentSimpleWhQuestionsActivityProps> = ({
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
    <div className="flex flex-col gap-6 max-w-6xl mx-auto w-full pb-12">
      {/* Top Header Bar */}
      <div
        className={`p-4 sm:p-5 rounded-2xl border transition-all ${
          isDark
            ? 'bg-slate-900/90 border-slate-800'
            : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300">
                Unit 3 · Getting Help · Sección 6
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {currentActivityIdx + 1} de 12
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Present Simple: Wh- Questions
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              11 actividades interactivas y test final de 5 preguntas
            </p>
          </div>

          {/* Controls: Audio Speed Selector and Prev/Next */}
          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
            {/* Speed Selector Dropdown */}
            <div className="relative" ref={rateMenuRef}>
              <button
                type="button"
                onClick={() => setIsRateMenuOpen((prev) => !prev)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold border transition ${
                  isDark
                    ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'
                    : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                }`}
                title="Velocidad de reproducción"
              >
                <Gauge className="w-4 h-4 text-blue-500" />
                <span>{currentRate.toFixed(2).replace('.00', '')}x</span>
              </button>

              {isRateMenuOpen && (
                <div
                  className={`absolute right-0 mt-2 w-36 rounded-xl border shadow-lg py-1 z-50 animate-in fade-in zoom-in-95 duration-150 ${
                    isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
                  }`}
                >
                  <div className="px-3 py-1.5 text-xs font-bold text-slate-400 border-b border-slate-200 dark:border-slate-700">
                    Velocidad de audio
                  </div>
                  {SPEED_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => {
                        setCurrentRate(opt.value);
                        setIsRateMenuOpen(false);
                      }}
                      className={`w-full px-3 py-2 text-left text-xs font-semibold flex items-center justify-between transition ${
                        currentRate === opt.value
                          ? 'bg-blue-600 text-white'
                          : isDark
                          ? 'text-slate-300 hover:bg-slate-700'
                          : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <span>{opt.label}</span>
                      {currentRate === opt.value && <Check className="w-3.5 h-3.5" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Navigation Arrows */}
            <div className="flex items-center gap-1 border border-slate-200 dark:border-slate-700 rounded-xl p-1">
              <button
                type="button"
                onClick={handlePrev}
                disabled={currentActivityIdx === 0}
                className={`p-2 rounded-lg transition ${
                  currentActivityIdx === 0
                    ? 'text-slate-400 dark:text-slate-600 cursor-not-allowed'
                    : isDark
                    ? 'text-slate-200 hover:bg-slate-800'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
                aria-label="Actividad anterior"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                disabled={currentActivityIdx === 11}
                className={`p-2 rounded-lg transition ${
                  currentActivityIdx === 11
                    ? 'text-slate-400 dark:text-slate-600 cursor-not-allowed'
                    : isDark
                    ? 'text-slate-200 hover:bg-slate-800'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
                aria-label="Siguiente actividad"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Activity Pills Navigation Bar */}
        <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
          {activityPills.map((pill, idx) => {
            const isCurrent = currentActivityIdx === idx;
            const isCompleted = completedActivities.includes(idx);
            const isTestPill = idx === 11;

            return (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  playFeedbackSound('click');
                  setCurrentActivityIdx(idx);
                }}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 ${
                  isCurrent
                    ? isTestPill
                      ? 'bg-purple-600 text-white shadow-sm ring-2 ring-purple-400'
                      : 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-400'
                    : isCompleted
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300'
                    : isTestPill
                    ? 'bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300 hover:bg-purple-100'
                    : isDark
                    ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span>{pill.label}</span>
                {isCompleted && <Check className="w-3.5 h-3.5" />}
                {isTestPill && !isCompleted && <Award className="w-3.5 h-3.5" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Slide Content */}
      <div className="w-full">
        {currentActivityIdx < 11 ? (
          <PresentSimpleWhQuestionsActivitySlide
            activity={PRESENT_SIMPLE_WH_ACTIVITIES[currentActivityIdx]}
            speechRate={currentRate}
            accent={accent}
            onNext={handleNext}
            onComplete={() => handleActivityComplete(currentActivityIdx)}
          />
        ) : (
          <PresentSimpleWhQuestionsTest
            speechRate={currentRate}
            accent={accent}
            onSuccess={() => {
              handleActivityComplete(11);
              if (onSuccess) onSuccess();
            }}
          />
        )}
      </div>
    </div>
  );
};
