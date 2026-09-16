import React, { useState, useRef, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Gauge,
  Check,
  Trophy,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { stopSpeaking, playFeedbackSound } from '../utils/audio';

import { SportsActivity1 } from './sports/SportsActivity1';
import { SportsActivity2 } from './sports/SportsActivity2';
import { SportsActivity3 } from './sports/SportsActivity3';
import { SportsActivity4 } from './sports/SportsActivity4';
import { SportsActivity5 } from './sports/SportsActivity5';
import { SportsActivity6Test } from './sports/SportsActivity6Test';

export interface SportsSection1ActivityProps {
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

export const SportsSection1Activity: React.FC<SportsSection1ActivityProps> = ({
  accent = 'US',
  speechRate = 1.0,
  onSuccess,
}) => {
  const { isDark } = useTheme();

  // Active activity: 0 = Actividad 1, 1 = Actividad 2, 2 = Actividad 3, 3 = Actividad 4, 4 = Actividad 5, 5 = Actividad 6: Test
  const [currentActivityIdx, setCurrentActivityIdx] = useState<number>(0);
  const [currentRate, setCurrentRate] = useState<number>(speechRate);
  const [isRateMenuOpen, setIsRateMenuOpen] = useState(false);
  const [completedActivities, setCompletedActivities] = useState<number[]>([]);

  const rateMenuRef = useRef<HTMLDivElement | null>(null);

  // Close rate dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (rateMenuRef.current && !rateMenuRef.current.contains(e.target as Node)) {
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
    if (currentActivityIdx < 5) {
      playFeedbackSound('click');
      setCurrentActivityIdx((prev) => prev + 1);
    }
  };

  const handleActivityComplete = (idx: number) => {
    setCompletedActivities((prev) => (prev.includes(idx) ? prev : [...prev, idx]));
    if (idx === 5 && onSuccess) {
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
    { label: 'Actividad 6: Test' },
  ];

  return (
    <div className="relative w-full flex flex-col items-center">
      {/* Floating Previous Activity Button (<) */}
      <button
        id="sports1-floating-prev-activity-btn"
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
        id="sports1-floating-next-activity-btn"
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

      {/* Main Content Area */}
      <div className="w-full max-w-5xl px-2 sm:px-6 md:px-8 py-4 flex flex-col gap-6">
        {/* Top Header Bar: Navigation Pills & Speed Selector */}
        <div
          className={`p-3 sm:p-4 rounded-2xl border flex flex-wrap items-center justify-between gap-3 ${
            isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
        {/* Navigation Pills (Actividad 1 to Actividad 5 and Actividad 6: Test) */}
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
                  : 'bg-white border-slate-200 text-slate-800 shadow-lg'
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

      {/* Floating Desktop Prev/Next Buttons */}
      <div className="hidden lg:block">
        {currentActivityIdx > 0 && (
          <button
            type="button"
            onClick={handlePrev}
            className={`fixed left-4 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full border shadow-xl transition-all hover:scale-110 active:scale-95 cursor-pointer ${
              isDark
                ? 'bg-slate-800/90 text-white border-slate-700 hover:bg-slate-700'
                : 'bg-white/95 text-slate-800 border-slate-200 hover:bg-slate-100'
            }`}
            aria-label="Actividad anterior"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {currentActivityIdx < 5 && (
          <button
            type="button"
            onClick={handleNext}
            className={`fixed right-4 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full border shadow-xl transition-all hover:scale-110 active:scale-95 cursor-pointer ${
              isDark
                ? 'bg-slate-800/90 text-white border-slate-700 hover:bg-slate-700'
                : 'bg-white/95 text-slate-800 border-slate-200 hover:bg-slate-100'
            }`}
            aria-label="Siguiente actividad"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Main Activity Content by Index (1 to 5, and 6: Test) */}
      <div className="w-full min-h-[460px]">
        {currentActivityIdx === 0 && (
          <SportsActivity1
            currentRate={currentRate}
            onRateChange={setCurrentRate}
            accent={accent}
            onNext={() => {
              handleActivityComplete(0);
              setCurrentActivityIdx(1);
            }}
          />
        )}

        {currentActivityIdx === 1 && (
          <SportsActivity2
            currentRate={currentRate}
            accent={accent}
            onComplete={() => handleActivityComplete(1)}
            onNext={() => setCurrentActivityIdx(2)}
          />
        )}

        {currentActivityIdx === 2 && (
          <SportsActivity3
            currentRate={currentRate}
            accent={accent}
            onComplete={() => handleActivityComplete(2)}
            onNext={() => setCurrentActivityIdx(3)}
          />
        )}

        {currentActivityIdx === 3 && (
          <SportsActivity4
            currentRate={currentRate}
            accent={accent}
            onComplete={() => handleActivityComplete(3)}
            onNext={() => setCurrentActivityIdx(4)}
          />
        )}

        {currentActivityIdx === 4 && (
          <SportsActivity5
            currentRate={currentRate}
            accent={accent}
            onComplete={() => handleActivityComplete(4)}
            onNext={() => setCurrentActivityIdx(5)}
          />
        )}

        {currentActivityIdx === 5 && (
          <SportsActivity6Test
            currentRate={currentRate}
            accent={accent}
            onSuccess={() => handleActivityComplete(5)}
          />
        )}
      </div>

      {/* Bottom Bar: Prev / Next Navigation Controls */}
      <div
        className={`p-3 sm:p-4 rounded-2xl border flex items-center justify-between gap-3 ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <button
          type="button"
          onClick={handlePrev}
          disabled={currentActivityIdx === 0}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold border flex items-center gap-1.5 transition-colors cursor-pointer ${
            currentActivityIdx === 0
              ? 'opacity-30 cursor-not-allowed border-transparent'
              : isDark
              ? 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-750'
              : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Anterior</span>
        </button>

        <div className="text-xs font-semibold text-slate-400">
          {activityPills[currentActivityIdx].label} (
          {currentActivityIdx + 1} de {activityPills.length})
        </div>

        <button
          type="button"
          onClick={handleNext}
          disabled={currentActivityIdx === 5}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold border flex items-center gap-1.5 transition-colors cursor-pointer ${
            currentActivityIdx === 5
              ? 'opacity-30 cursor-not-allowed border-transparent'
              : isDark
              ? 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-750'
              : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
          }`}
        >
          <span>Siguiente</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
  );
};
