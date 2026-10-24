import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  BookOpen,
  Award,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
} from 'lucide-react';
import {
  PAST_SIMPLE_QUESTIONS_ACTIVITIES,
} from '../../data/pastSimpleQuestionsData';
import { useTheme } from '../../context/ThemeContext';
import { playFeedbackSound, stopSpeaking } from '../../utils/audio';
import { Activity1Explore } from './Activity1Explore';
import { DragDropClozeActivity } from './DragDropClozeActivity';
import { TestMasterActivity } from './TestMasterActivity';

interface PastSimpleQuestionsActivityProps {
  accent?: 'US' | 'UK';
  speechRate?: number;
  onSuccess?: () => void;
}

export const PastSimpleQuestionsActivity: React.FC<PastSimpleQuestionsActivityProps> = ({
  accent = 'US',
  speechRate = 1.0,
  onSuccess,
}) => {
  const { isDark } = useTheme();

  // Tab index: 0..10 for Activities 1..11, 11 for Test
  const [activeTabIdx, setActiveTabIdx] = useState(0);
  const [speed, setSpeed] = useState(speechRate);

  const totalActivities = PAST_SIMPLE_QUESTIONS_ACTIVITIES.length; // 11
  const isTestTab = activeTabIdx === totalActivities;

  const handleSelectTab = (idx: number) => {
    stopSpeaking();
    playFeedbackSound('click');
    setActiveTabIdx(idx);
  };

  const handleNext = () => {
    if (activeTabIdx < totalActivities) {
      stopSpeaking();
      playFeedbackSound('click');
      setActiveTabIdx((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (activeTabIdx > 0) {
      stopSpeaking();
      playFeedbackSound('click');
      setActiveTabIdx((prev) => prev - 1);
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
  }, [activeTabIdx]);

  const currentExercise = !isTestTab
    ? PAST_SIMPLE_QUESTIONS_ACTIVITIES[activeTabIdx]
    : null;

  return (
    <div className="relative w-full flex flex-col items-center select-none pb-12">
      {/* Floating Previous Activity Button (<) */}
      {activeTabIdx > 0 && (
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
      {activeTabIdx < totalActivities && (
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

      {/* Main Container with horizontal padding so content does not collide with floating buttons */}
      <div className="w-full max-w-6xl flex flex-col gap-6 px-3 sm:px-6">
        {/* Unit Sub-Navigation Bar */}
        <div
          className={`w-full p-2.5 sm:p-3 rounded-2xl border flex items-center justify-between gap-2 overflow-x-auto no-scrollbar shadow-xs transition-colors ${
            isDark
              ? 'bg-slate-900/90 border-slate-800'
              : 'bg-white border-slate-200 shadow-slate-100'
          }`}
        >
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Activity Tabs 1..11 */}
            {PAST_SIMPLE_QUESTIONS_ACTIVITIES.map((act, idx) => {
              const isSelected = activeTabIdx === idx;
              return (
                <button
                  key={act.id}
                  type="button"
                  onClick={() => handleSelectTab(idx)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1 border ${
                    isSelected
                      ? 'bg-sky-600 text-white border-sky-500 shadow-sm scale-105'
                      : isDark
                      ? 'bg-white/5 text-slate-300 border-white/5 hover:bg-white/10 hover:text-white'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                  title={act.titleEs}
                >
                  <span>Act {act.number}</span>
                </button>
              );
            })}

            {/* Test Tab */}
            <button
              type="button"
              onClick={() => handleSelectTab(totalActivities)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 border ml-1 ${
                isTestTab
                  ? 'bg-amber-500 text-white border-amber-400 shadow-sm scale-105'
                  : isDark
                  ? 'bg-amber-500/10 text-amber-300 border-amber-500/20 hover:bg-amber-500/20'
                  : 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100'
              }`}
              title="Test de Evaluación (5 preguntas)"
            >
              <Award className="w-3.5 h-3.5" />
              <span>Test (5)</span>
            </button>
          </div>

          {/* Quick Counter */}
          <div className="hidden sm:flex items-center gap-2 text-xs font-mono opacity-80 shrink-0">
            <span
              className={`px-2.5 py-1 rounded-lg border ${
                isDark
                  ? 'bg-white/5 border-white/10 text-slate-300'
                  : 'bg-slate-100 border-slate-200 text-slate-700'
              }`}
            >
              {isTestTab ? 'Test (5 preguntas)' : `Actividad ${activeTabIdx + 1} de 11`}
            </span>
          </div>
        </div>

        {/* Main Slide Content */}
        <div className="w-full">
          {activeTabIdx === 0 && currentExercise && (
            <Activity1Explore
              exercise={currentExercise}
              speed={speed}
              onSpeedChange={setSpeed}
              accent={accent}
              onNextActivity={handleNext}
            />
          )}

          {activeTabIdx > 0 && activeTabIdx < totalActivities && currentExercise && (
            <DragDropClozeActivity
              key={currentExercise.id}
              exercise={currentExercise}
              speed={speed}
              onSpeedChange={setSpeed}
              accent={accent}
              onNextActivity={handleNext}
            />
          )}

          {isTestTab && (
            <TestMasterActivity
              speed={speed}
              onSpeedChange={setSpeed}
              accent={accent}
              onComplete={(score) => {
                if (onSuccess) onSuccess();
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};
