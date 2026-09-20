import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  COUNT_NON_COUNT_ACTIVITIES,
  CountNonCountExerciseItem,
} from '../../data/countNonCountData';
import { playFeedbackSound, stopSpeaking } from '../../utils/audio';
import { useTheme } from '../../context/ThemeContext';
import { Activity1Explore } from './Activity1Explore';
import { DragDropClozeActivity } from './DragDropClozeActivity';
import { TestMasterActivity } from './TestMasterActivity';
import { SpeedSelector } from './SpeedSelector';

interface CountNonCountActivityProps {
  accent?: 'US' | 'UK';
  speechRate?: number;
  onSuccess?: () => void;
}

export const CountNonCountActivity: React.FC<CountNonCountActivityProps> = ({
  accent = 'US',
  speechRate = 1.0,
  onSuccess,
}) => {
  const { isDark } = useTheme();

  // Active activity index: 0 = Actividad 1 ... 10 = Actividad 11, 11 = Actividad 12 (Test)
  const [currentActivityIndex, setCurrentActivityIndex] = useState<number>(0);
  const [currentSpeed, setCurrentSpeed] = useState<number>(speechRate);

  // Total activities: 11 activities + 1 Test = 12
  const totalActivities = 12;

  const goToActivity = (idx: number) => {
    if (idx < 0 || idx >= totalActivities) return;
    playFeedbackSound('click');
    stopSpeaking();
    setCurrentActivityIndex(idx);
  };

  const handlePrev = () => {
    if (currentActivityIndex > 0) {
      goToActivity(currentActivityIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentActivityIndex < totalActivities - 1) {
      goToActivity(currentActivityIndex + 1);
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
  }, [currentActivityIndex]);

  return (
    <div className="relative w-full flex flex-col items-center select-none">
      {/* Floating Previous Activity Button (<) */}
      {currentActivityIndex > 0 && (
        <button
          type="button"
          onClick={handlePrev}
          className={`fixed sm:absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 z-40 w-11 h-11 sm:w-13 sm:h-13 rounded-full flex items-center justify-center border shadow-2xl transition-all cursor-pointer select-none ${
            isDark
              ? 'bg-[#1E293B]/95 hover:bg-indigo-600 text-white border-white/20 hover:border-indigo-400 shadow-indigo-950/70 hover:scale-110 active:scale-95'
              : 'bg-white/95 hover:bg-indigo-600 text-slate-800 hover:text-white border-slate-300 hover:border-indigo-600 shadow-slate-400/60 hover:scale-110 active:scale-95'
          }`}
          title="Actividad anterior"
          aria-label="Actividad anterior"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {/* Floating Next Activity Button (>) */}
      {currentActivityIndex < totalActivities - 1 && (
        <button
          type="button"
          onClick={handleNext}
          className={`fixed sm:absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 z-40 w-11 h-11 sm:w-13 sm:h-13 rounded-full flex items-center justify-center border shadow-2xl transition-all cursor-pointer select-none ${
            isDark
              ? 'bg-[#1E293B]/95 hover:bg-indigo-600 text-white border-white/20 hover:border-indigo-400 shadow-indigo-950/70 hover:scale-110 active:scale-95'
              : 'bg-white/95 hover:bg-indigo-600 text-slate-800 hover:text-white border-slate-300 hover:border-indigo-600 shadow-slate-400/60 hover:scale-110 active:scale-95'
          }`}
          title="Siguiente actividad"
          aria-label="Siguiente actividad"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Top Carousel Navigation Tabs (Actividad 1 .. 11, Actividad 12: Test) */}
      <div className="w-full max-w-5xl mb-5 flex flex-col sm:flex-row items-center justify-between gap-3 px-2">
        <div className="w-full sm:w-auto overflow-x-auto py-1 scrollbar-none flex items-center gap-1.5">
          {Array.from({ length: totalActivities }).map((_, idx) => {
            const isTest = idx === 11;
            const isCurrent = idx === currentActivityIndex;
            const label = isTest ? 'Actividad 12: Test' : `Actividad ${idx + 1}`;

            return (
              <button
                key={idx}
                type="button"
                onClick={() => goToActivity(idx)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all cursor-pointer border ${
                  isCurrent
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm ring-2 ring-indigo-400/40'
                    : isDark
                    ? 'bg-slate-800/80 hover:bg-slate-700 text-slate-300 border-slate-700'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200 shadow-2xs'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Global Speed Selector */}
        <div className="shrink-0 self-end sm:self-auto">
          <SpeedSelector
            currentSpeed={currentSpeed}
            onSpeedChange={(s) => setCurrentSpeed(s)}
          />
        </div>
      </div>

      {/* Main Activity Viewport */}
      <div className="w-full max-w-5xl px-2 sm:px-4">
        {currentActivityIndex === 0 && (
          <Activity1Explore
            speed={currentSpeed}
            onSpeedChange={setCurrentSpeed}
            accent={accent}
          />
        )}

        {currentActivityIndex >= 1 && currentActivityIndex <= 10 && (
          (() => {
            const exercise: CountNonCountExerciseItem = COUNT_NON_COUNT_ACTIVITIES[currentActivityIndex];
            return (
              <DragDropClozeActivity
                key={exercise.id}
                exercise={exercise}
                speed={currentSpeed}
                onSpeedChange={setCurrentSpeed}
                accent={accent}
                onNextActivity={() => goToActivity(currentActivityIndex + 1)}
              />
            );
          })()
        )}

        {currentActivityIndex === 11 && (
          <TestMasterActivity
            speed={currentSpeed}
            onSpeedChange={setCurrentSpeed}
            accent={accent}
            onCompleteSection={onSuccess}
          />
        )}
      </div>
    </div>
  );
};
