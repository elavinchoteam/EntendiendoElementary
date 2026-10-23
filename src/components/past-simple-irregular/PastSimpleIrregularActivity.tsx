import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  PAST_SIMPLE_IRREGULAR_ACTIVITIES,
  PastSimpleIrregularExerciseItem,
} from '../../data/pastSimpleIrregularData';
import { playFeedbackSound, stopSpeaking } from '../../utils/audio';
import { useTheme } from '../../context/ThemeContext';
import { Activity1Explore } from './Activity1Explore';
import { DragDropClozeActivity } from './DragDropClozeActivity';
import { TestMasterActivity } from './TestMasterActivity';
import { SpeedSelector } from './SpeedSelector';

interface PastSimpleIrregularActivityProps {
  accent?: 'US' | 'UK';
  speechRate?: number;
  onSuccess?: () => void;
}

export const PastSimpleIrregularActivity: React.FC<PastSimpleIrregularActivityProps> = ({
  accent = 'US',
  speechRate = 1.0,
  onSuccess,
}) => {
  const { isDark } = useTheme();

  // Active activity index: 0 = Actividad 1 ... 10 = Actividad 11, 11 = Actividad 12 (Test)
  const [currentActivityIndex, setCurrentActivityIndex] = useState<number>(0);
  const [currentSpeed, setCurrentSpeed] = useState<number>(speechRate);

  // Total activities: 11 activities + 1 Test Master = 12
  const totalActivities = 12;

  const goToActivity = (idx: number) => {
    if (idx < 0 || idx >= totalActivities) return;
    playFeedbackSound('click');
    stopSpeaking();
    setCurrentActivityIndex(idx);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
              ? 'bg-[#1E293B]/95 hover:bg-sky-600 text-white border-white/20 hover:border-sky-400 shadow-sky-950/70 hover:scale-110 active:scale-95'
              : 'bg-white/95 hover:bg-sky-600 text-slate-800 hover:text-white border-slate-300 hover:border-sky-600 shadow-slate-400/60 hover:scale-110 active:scale-95'
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
              ? 'bg-[#1E293B]/95 hover:bg-sky-600 text-white border-white/20 hover:border-sky-400 shadow-sky-950/70 hover:scale-110 active:scale-95'
              : 'bg-white/95 hover:bg-sky-600 text-slate-800 hover:text-white border-slate-300 hover:border-sky-600 shadow-slate-400/60 hover:scale-110 active:scale-95'
          }`}
          title="Siguiente actividad"
          aria-label="Siguiente actividad"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Main Container */}
      <div className="w-full max-w-6xl flex flex-col gap-5 px-3 sm:px-6">
        {/* Navigation Tabs Bar for 12 activities */}
        <div className="w-full flex items-center justify-start sm:justify-center overflow-x-auto no-scrollbar py-2 px-1">
          <div className="inline-flex items-center gap-1.5 p-1.5 rounded-2xl bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 backdrop-blur-md shadow-xs">
            {Array.from({ length: totalActivities }).map((_, idx) => {
              const isCurrent = currentActivityIndex === idx;
              const isTest = idx === 11;

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => goToActivity(idx)}
                  className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer select-none ${
                    isCurrent
                      ? isTest
                        ? 'bg-gradient-to-r from-indigo-600 to-sky-600 text-white shadow-md shadow-indigo-600/30 scale-105'
                        : 'bg-sky-600 text-white shadow-md shadow-sky-600/30 scale-105'
                      : isDark
                      ? 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white'
                  }`}
                >
                  {isTest ? 'Test' : `Actividad ${idx + 1}`}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Render based on currentActivityIndex */}
        <div className="w-full">
          {currentActivityIndex === 0 && (
            <Activity1Explore
              speed={currentSpeed}
              onSpeedChange={setCurrentSpeed}
              accent={accent}
            />
          )}

          {currentActivityIndex >= 1 && currentActivityIndex <= 10 && (
            <DragDropClozeActivity
              key={currentActivityIndex}
              exercise={PAST_SIMPLE_IRREGULAR_ACTIVITIES[currentActivityIndex]}
              speed={currentSpeed}
              onSpeedChange={setCurrentSpeed}
              accent={accent}
              onNextActivity={handleNext}
            />
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
    </div>
  );
};
