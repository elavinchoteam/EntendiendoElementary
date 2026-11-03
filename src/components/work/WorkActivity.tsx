import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  BookOpen,
  Award,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { playFeedbackSound, stopSpeaking } from '../../utils/audio';
import { Activity1ExploreWork } from './Activity1ExploreWork';
import { Activity2CollocationsWork } from './Activity2CollocationsWork';
import { Activity3DictationWork } from './Activity3DictationWork';
import { Activity4DictationWork } from './Activity4DictationWork';
import { Activity5ClozeWork } from './Activity5ClozeWork';
import { Activity6DialogueWork } from './Activity6DialogueWork';
import { Activity7LetterClozeWork } from './Activity7LetterClozeWork';
import { WorkTestMaster } from './WorkTestMaster';
import { SpeedSelector } from './SpeedSelector';

interface WorkActivityProps {
  accent?: 'US' | 'UK';
  speechRate?: number;
  onSuccess?: () => void;
}

export const WorkActivity: React.FC<WorkActivityProps> = ({
  accent = 'US',
  speechRate = 1.0,
  onSuccess,
}) => {
  const { isDark } = useTheme();

  // Tabs: 0..6 = Actividades 1..7, 7 = Actividad 8: Test (con 10 preguntas)
  const [activeTabIdx, setActiveTabIdx] = useState(0);
  const [speed, setSpeed] = useState(speechRate);

  const totalTabs = 8; // 7 Activities + 1 Test

  const handleSelectTab = (idx: number) => {
    stopSpeaking();
    playFeedbackSound('click');
    setActiveTabIdx(idx);
  };

  const handleNext = () => {
    if (activeTabIdx < totalTabs - 1) {
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
      if (activeTag === 'input' || activeTag === 'textarea' || activeTag === 'select') return;

      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeTabIdx]);

  return (
    <div className="relative w-full flex flex-col items-center select-none pb-14">
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
      {activeTabIdx < totalTabs - 1 && (
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

      {/* Top Header: Navigation Tabs + Speed Selector */}
      <div className="w-full max-w-5xl mb-5 flex flex-col sm:flex-row items-center justify-between gap-3 px-2">
        {/* Tabs Bar */}
        <div className="w-full sm:w-auto overflow-x-auto py-1 scrollbar-none flex items-center gap-1.5">
          {Array.from({ length: totalTabs }).map((_, idx) => {
            const isTest = idx === 7;
            const isCurrent = activeTabIdx === idx;
            const label = isTest ? 'Actividad 8: Test' : `Actividad ${idx + 1}`;

            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectTab(idx)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer ${
                  isCurrent
                    ? isTest
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md shadow-amber-500/25'
                      : 'bg-sky-500 text-white shadow-md shadow-sky-500/25'
                    : isTest
                    ? isDark
                      ? 'bg-amber-950/40 text-amber-300 hover:bg-amber-900/60 border border-amber-800/60'
                      : 'bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200'
                    : isDark
                    ? 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700'
                    : 'bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200'
                }`}
              >
                {isTest ? <Award className="w-3.5 h-3.5" /> : <BookOpen className="w-3.5 h-3.5" />}
                <span>{label}</span>
              </button>
            );
          })}
        </div>

        {/* Speed Selector */}
        <div className="shrink-0">
          <SpeedSelector currentSpeed={speed} onSpeedChange={setSpeed} />
        </div>
      </div>

      {/* Active Tab View */}
      <div className="w-full max-w-5xl px-2">
        {activeTabIdx === 0 && (
          <Activity1ExploreWork speed={speed} accent={accent} />
        )}
        {activeTabIdx === 1 && (
          <Activity2CollocationsWork
            speed={speed}
            accent={accent}
            onNext={handleNext}
          />
        )}
        {activeTabIdx === 2 && (
          <Activity3DictationWork
            speed={speed}
            accent={accent}
            onNext={handleNext}
          />
        )}
        {activeTabIdx === 3 && (
          <Activity4DictationWork
            speed={speed}
            accent={accent}
            onNext={handleNext}
          />
        )}
        {activeTabIdx === 4 && (
          <Activity5ClozeWork
            speed={speed}
            accent={accent}
            onNext={handleNext}
          />
        )}
        {activeTabIdx === 5 && (
          <Activity6DialogueWork
            speed={speed}
            accent={accent}
            onNext={handleNext}
          />
        )}
        {activeTabIdx === 6 && (
          <Activity7LetterClozeWork
            speed={speed}
            accent={accent}
            onNext={handleNext}
          />
        )}
        {activeTabIdx === 7 && (
          <WorkTestMaster
            speed={speed}
            accent={accent}
            onCompleteSection={onSuccess}
          />
        )}
      </div>
    </div>
  );
};
