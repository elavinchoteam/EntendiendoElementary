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
  PRESENT_SIMPLE_QUESTIONS_ACTIVITIES,
} from '../data/presentSimpleQuestionsData';
import { PresentSimpleQuestionsActivitySlide } from './presentSimpleQuestions/PresentSimpleQuestionsActivitySlide';
import { PresentSimpleQuestionsTest } from './presentSimpleQuestions/PresentSimpleQuestionsTest';

export interface PresentSimpleQuestionsActivityProps {
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

export const PresentSimpleQuestionsActivity: React.FC<PresentSimpleQuestionsActivityProps> = ({
  accent = 'US',
  speechRate = 1.0,
  onSuccess,
}) => {
  const { isDark } = useTheme();

  // Current activity: 0 to 10
  // 0 to 9: Actividad 1 to Actividad 10
  // 10: Actividad 11: Test (with Test 1 to Test 5)
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
    if (currentActivityIdx < 10) {
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
    { label: 'Actividad 11: Test' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col gap-6">
      {/* Top Header Card */}
      <div
        className={`p-6 rounded-2xl border transition-all ${
          isDark
            ? 'bg-slate-900/90 border-slate-800 text-white'
            : 'bg-white border-slate-200 text-slate-900 shadow-sm'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1">
              Unit 3: Getting Help · Section 5
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Present Simple: Yes/No Questions
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              {currentActivityIdx < 10
                ? `Actividad ${currentActivityIdx + 1} de 10 — Diálogo, preguntas y respuestas breves`
                : 'Actividad 11: Test de Evaluación (5 Tests)'}
            </p>
          </div>

          {/* Speed & Audio controls */}
          <div className="flex items-center gap-2">
            {/* Speed Selector */}
            <div className="relative" ref={rateMenuRef}>
              <button
                type="button"
                onClick={() => setIsRateMenuOpen((prev) => !prev)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold border transition-all cursor-pointer ${
                  isDark
                    ? 'bg-slate-800 border-slate-700 hover:border-slate-600 text-slate-200'
                    : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700 shadow-2xs'
                }`}
                aria-label="Audio Speed"
              >
                <Gauge className="w-4 h-4 text-blue-500" />
                <span>{currentRate}x</span>
              </button>

              {isRateMenuOpen && (
                <div
                  className={`absolute right-0 mt-2 w-32 rounded-xl border py-1 shadow-lg z-50 ${
                    isDark
                      ? 'bg-slate-800 border-slate-700 text-slate-200'
                      : 'bg-white border-slate-200 text-slate-700'
                  }`}
                >
                  <div className="px-3 py-1 text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-200 dark:border-slate-700">
                    Velocidad
                  </div>
                  {SPEED_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => {
                        setCurrentRate(opt.value);
                        setIsRateMenuOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs font-semibold flex items-center justify-between hover:bg-blue-50 dark:hover:bg-slate-700 cursor-pointer ${
                        currentRate === opt.value
                          ? 'text-blue-600 dark:text-blue-400 font-bold'
                          : ''
                      }`}
                    >
                      <span>{opt.label}</span>
                      {currentRate === opt.value && <Check className="w-3.5 h-3.5" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Activity Pills Navigation (1 to 10, plus Test 11) */}
        <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {activityPills.map((pill, idx) => {
              const isActive = idx === currentActivityIdx;
              const isCompleted = completedActivities.includes(idx);
              const isTest = idx === 10;

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    playFeedbackSound('click');
                    setCurrentActivityIdx(idx);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? isTest
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-blue-600 text-white shadow-xs'
                      : isCompleted
                      ? 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700'
                      : isDark
                      ? 'bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                  }`}
                >
                  {isTest && <Award className="w-3.5 h-3.5" />}
                  <span>{pill.label}</span>
                  {isCompleted && <Check className="w-3.5 h-3.5" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content: Activities 1-10 or Test 11 */}
      {currentActivityIdx < 10 ? (
        <PresentSimpleQuestionsActivitySlide
          key={currentActivityIdx}
          activity={PRESENT_SIMPLE_QUESTIONS_ACTIVITIES[currentActivityIdx]}
          speechRate={currentRate}
          accent={accent}
          onNext={handleNext}
          onComplete={() => handleActivityComplete(currentActivityIdx)}
        />
      ) : (
        <PresentSimpleQuestionsTest
          speechRate={currentRate}
          accent={accent}
          onSuccess={() => {
            handleActivityComplete(10);
            if (onSuccess) onSuccess();
          }}
        />
      )}

      {/* Bottom Sticky-friendly Navigation Footer */}
      <div
        className={`p-4 rounded-2xl border flex items-center justify-between transition-all ${
          isDark
            ? 'bg-slate-900/90 border-slate-800 text-slate-300'
            : 'bg-white border-slate-200 text-slate-700 shadow-sm'
        }`}
      >
        <button
          type="button"
          onClick={handlePrev}
          disabled={currentActivityIdx === 0}
          className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold text-sm transition-all flex items-center gap-1 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Anterior</span>
        </button>

        <div className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400">
          Paso {currentActivityIdx + 1} de 11
        </div>

        <button
          type="button"
          onClick={handleNext}
          disabled={currentActivityIdx === 10}
          className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-all flex items-center gap-1 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer shadow-xs"
        >
          <span>Siguiente</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
