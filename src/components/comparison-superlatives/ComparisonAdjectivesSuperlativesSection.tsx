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
  SUPERLATIVES_ACTIVITIES,
  SUPERLATIVES_TESTS,
} from '../../data/comparisonSuperlativesData';
import { SuperlativesActivity1Explore } from './SuperlativesActivity1Explore';
import { SuperlativesDragDropActivity } from './SuperlativesDragDropActivity';
import { SuperlativesTestActivity } from './SuperlativesTestActivity';

export interface ComparisonAdjectivesSuperlativesSectionProps {
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

export const ComparisonAdjectivesSuperlativesSection: React.FC<ComparisonAdjectivesSuperlativesSectionProps> = ({
  accent = 'US',
  speechRate = 1.0,
  onSuccess,
}) => {
  const { isDark } = useTheme();

  // Active activity index: 0 to 11 (Actividad 1 to Actividad 11, and Actividad 12: Test)
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

  // Tab labels list: Actividad 1 to 11, and Actividad 12 (Test)
  const activitiesList = [
    { idx: 0, label: 'Actividad 1', isTest: false },
    { idx: 1, label: 'Actividad 2', isTest: false },
    { idx: 2, label: 'Actividad 3', isTest: false },
    { idx: 3, label: 'Actividad 4', isTest: false },
    { idx: 4, label: 'Actividad 5', isTest: false },
    { idx: 5, label: 'Actividad 6', isTest: false },
    { idx: 6, label: 'Actividad 7', isTest: false },
    { idx: 7, label: 'Actividad 8', isTest: false },
    { idx: 8, label: 'Actividad 9', isTest: false },
    { idx: 9, label: 'Actividad 10', isTest: false },
    { idx: 10, label: 'Actividad 11', isTest: false },
    { idx: 11, label: 'Actividad 12 (Test)', isTest: true },
  ];

  return (
    <div className="relative w-full flex flex-col items-center">
      {/* Floating Previous Activity Button (<) */}
      <button
        id="superlatives-floating-prev-btn"
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
        title={
          currentActivityIdx > 0
            ? `Actividad anterior: ${activitiesList[currentActivityIdx - 1]?.label}`
            : 'Inicio'
        }
        aria-label="Actividad anterior"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Floating Next Activity Button (>) */}
      <button
        id="superlatives-floating-next-btn"
        type="button"
        onClick={handleNext}
        disabled={currentActivityIdx >= activitiesList.length - 1}
        className={`fixed sm:absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 z-40 w-11 h-11 sm:w-13 sm:h-13 rounded-full flex items-center justify-center border shadow-2xl transition-all cursor-pointer select-none ${
          currentActivityIdx >= activitiesList.length - 1
            ? 'opacity-0 pointer-events-none scale-75'
            : isDark
            ? 'bg-[#1E293B]/95 hover:bg-indigo-600 text-white border-white/20 hover:border-indigo-400 shadow-indigo-950/70 hover:scale-110 active:scale-95'
            : 'bg-white/95 hover:bg-indigo-600 text-slate-800 hover:text-white border-slate-300 hover:border-indigo-600 shadow-slate-400/60 hover:scale-110 active:scale-95'
        }`}
        title={
          currentActivityIdx < activitiesList.length - 1
            ? `Siguiente actividad: ${activitiesList[currentActivityIdx + 1]?.label}`
            : 'Fin'
        }
        aria-label="Siguiente actividad"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Inner Container */}
      <div className="w-full max-w-7xl px-3 sm:px-8 py-2 flex flex-col gap-5">
        {/* Top Section Navigation Header */}
        <div
          className={`w-full rounded-2xl border p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-xs transition-colors ${
            isDark
              ? 'bg-slate-900 border-white/10 text-white'
              : 'bg-white border-slate-200 text-slate-900'
          }`}
        >
          {/* Title / Activity Indicator */}
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-xl bg-indigo-600 text-white font-mono font-black text-sm flex items-center justify-center shadow-xs shrink-0">
              {currentActivityIdx + 1}
            </span>
            <div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-indigo-500">
                Sección 6 · Comparison of Adjectives: Superlatives
              </span>
              <h2 className="text-base sm:text-lg font-bold tracking-tight">
                {currentActivityIdx === 11
                  ? 'Actividad 12: Test Final (5 Tests)'
                  : currentActivityIdx === 0
                  ? 'Actividad 1: Explore'
                  : `Actividad ${currentActivityIdx + 1}`}
              </h2>
            </div>
          </div>

          {/* Action Controls: Speed + Step Arrows */}
          <div className="flex items-center gap-2 self-end md:self-auto">
            {/* Speed Selector (0.50x, 0.65x, 0.85x, 1x, 1.15x, 1.30x) */}
            <div className="relative" ref={rateMenuRef}>
              <button
                type="button"
                onClick={() => setIsRateMenuOpen((prev) => !prev)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border font-mono text-xs font-bold transition-all cursor-pointer ${
                  isDark
                    ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 shadow-xs'
                }`}
                title="Velocidad del audio en toda la sección"
              >
                <Gauge className="w-3.5 h-3.5 text-indigo-500" />
                <span>{currentRate}x</span>
              </button>

              {isRateMenuOpen && (
                <div
                  className={`absolute right-0 top-full mt-2 w-36 rounded-2xl shadow-xl border py-1.5 z-40 transition-all ${
                    isDark
                      ? 'bg-slate-900 border-slate-700 text-white'
                      : 'bg-white border-slate-200 text-slate-900'
                  }`}
                >
                  <div className="px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                    Velocidad de Audio
                  </div>
                  {SPEED_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => {
                        setCurrentRate(opt.value);
                        setIsRateMenuOpen(false);
                        playFeedbackSound('click');
                      }}
                      className={`w-full flex items-center justify-between px-3.5 py-1.5 text-xs font-mono transition-colors cursor-pointer ${
                        currentRate === opt.value
                          ? 'bg-indigo-600 text-white font-bold'
                          : isDark
                          ? 'hover:bg-slate-800 text-slate-300'
                          : 'hover:bg-slate-100 text-slate-700'
                      }`}
                    >
                      <span>{opt.label}</span>
                      {currentRate === opt.value && (
                        <Check className="w-3.5 h-3.5 ml-1" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Previous Activity Button */}
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentActivityIdx === 0}
              className={`p-2 rounded-xl border transition-all cursor-pointer ${
                currentActivityIdx === 0
                  ? 'opacity-30 cursor-not-allowed border-transparent'
                  : isDark
                  ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 shadow-xs'
              }`}
              aria-label="Actividad anterior"
              title="Actividad anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Next Activity Button */}
            <button
              type="button"
              onClick={handleNext}
              disabled={currentActivityIdx === 11}
              className={`p-2 rounded-xl border transition-all cursor-pointer ${
                currentActivityIdx === 11
                  ? 'opacity-30 cursor-not-allowed border-transparent'
                  : isDark
                  ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 shadow-xs'
              }`}
              aria-label="Siguiente actividad"
              title="Siguiente actividad"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Horizontal Activities Navigation Tabs (Actividad 1 to 11, Actividad 12 Test) */}
        <div className="w-full overflow-x-auto pb-1 scrollbar-none">
          <div className="flex items-center gap-1.5 min-w-max">
            {activitiesList.map((item) => {
              const isCurrent = currentActivityIdx === item.idx;
              const isCompleted = completedActivities.includes(item.idx);

              return (
                <button
                  key={item.idx}
                  type="button"
                  onClick={() => {
                    playFeedbackSound('click');
                    setCurrentActivityIdx(item.idx);
                  }}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl font-mono text-xs font-bold whitespace-nowrap transition-all cursor-pointer border select-none ${
                    isCurrent
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-md scale-102 ring-2 ring-indigo-300'
                      : isCompleted
                      ? isDark
                        ? 'bg-emerald-950/40 text-emerald-400 border-emerald-800/60'
                        : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : item.isTest
                      ? isDark
                        ? 'bg-purple-950/30 text-purple-300 border-purple-800/50 hover:bg-purple-900/40'
                        : 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100'
                      : isDark
                      ? 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  {item.isTest && <Award className="w-3.5 h-3.5 text-purple-400" />}
                  <span>{item.label}</span>
                  {isCompleted && (
                    <Check className="w-3 h-3 text-emerald-500 ml-0.5" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Activity Content Container */}
        <div className="w-full">
          {currentActivityIdx === 0 && (
            <div className="animate-in fade-in duration-200">
              <SuperlativesActivity1Explore
                accent={accent}
                speechRate={currentRate}
              />
            </div>
          )}

          {currentActivityIdx >= 1 && currentActivityIdx <= 10 && (
            <div className="animate-in fade-in duration-200" key={currentActivityIdx}>
              <SuperlativesDragDropActivity
                activity={SUPERLATIVES_ACTIVITIES[currentActivityIdx - 1]}
                accent={accent}
                speechRate={currentRate}
                onComplete={() => handleActivityComplete(currentActivityIdx)}
              />
            </div>
          )}

          {currentActivityIdx === 11 && (
            <div className="animate-in fade-in duration-200">
              <SuperlativesTestActivity
                tests={SUPERLATIVES_TESTS}
                accent={accent}
                speechRate={currentRate}
                onSuccess={() => handleActivityComplete(11)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
