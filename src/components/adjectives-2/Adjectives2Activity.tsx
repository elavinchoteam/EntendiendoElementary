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
  DICTATION_ITEMS_PART_1,
  DICTATION_ITEMS_PART_2,
} from '../../data/adjectives2Data';
import { useTheme } from '../../context/ThemeContext';
import { playFeedbackSound, stopSpeaking } from '../../utils/audio';
import { Activity1Explore } from './Activity1Explore';
import { Activity2Matching } from './Activity2Matching';
import { ActivityDictation } from './ActivityDictation';
import { Activity5Cloze } from './Activity5Cloze';
import { Activity6Dropdowns } from './Activity6Dropdowns';
import { Activity7Story } from './Activity7Story';
import { TestMasterActivity } from './TestMasterActivity';
import { SpeedSelector } from './SpeedSelector';

interface Adjectives2ActivityProps {
  accent?: 'US' | 'UK';
  speechRate?: number;
  onSuccess?: () => void;
}

export const Adjectives2Activity: React.FC<Adjectives2ActivityProps> = ({
  accent = 'US',
  speechRate = 1.0,
  onSuccess,
}) => {
  const { isDark } = useTheme();

  // Tabs: 0..6 = Actividades 1..7, 7 = Actividad 8: Test
  const [activeTabIdx, setActiveTabIdx] = useState(0);
  const [speed, setSpeed] = useState(speechRate);

  const totalTabs = 8; // 7 Activities + 1 Test
  const isTestTab = activeTabIdx === 7;

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
            const isCurrent = idx === activeTabIdx;
            const label = isTest ? 'Actividad 8: Test' : `Actividad ${idx + 1}`;

            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectTab(idx)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all cursor-pointer border ${
                  isCurrent
                    ? 'bg-sky-600 text-white border-sky-500 shadow-md scale-102'
                    : isDark
                    ? 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700/80'
                    : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100 shadow-xs'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Speed Selector */}
        <div className="shrink-0 flex items-center gap-2">
          <SpeedSelector currentSpeed={speed} onSpeedChange={setSpeed} />
        </div>
      </div>

      {/* Main Container */}
      <main className="w-full max-w-5xl px-2 sm:px-4">
        {activeTabIdx === 0 && (
          <Activity1Explore speed={speed} accent={accent} />
        )}

        {activeTabIdx === 1 && (
          <Activity2Matching
            speed={speed}
            accent={accent}
            onNextActivity={handleNext}
          />
        )}

        {activeTabIdx === 2 && (
          <ActivityDictation
            activityNumber={3}
            items={DICTATION_ITEMS_PART_1}
            vocabularySubset={['alone', 'angry', 'best', 'easy', 'pretty']}
            speed={speed}
            accent={accent}
            onNextActivity={handleNext}
          />
        )}

        {activeTabIdx === 3 && (
          <ActivityDictation
            activityNumber={4}
            items={DICTATION_ITEMS_PART_2}
            vocabularySubset={['quick', 'special', 'strong', 'wonderful', 'worst']}
            speed={speed}
            accent={accent}
            onNextActivity={handleNext}
          />
        )}

        {activeTabIdx === 4 && (
          <Activity5Cloze
            speed={speed}
            accent={accent}
            onNextActivity={handleNext}
          />
        )}

        {activeTabIdx === 5 && (
          <Activity6Dropdowns
            speed={speed}
            accent={accent}
            onNextActivity={handleNext}
          />
        )}

        {activeTabIdx === 6 && (
          <Activity7Story
            speed={speed}
            accent={accent}
            onNextActivity={handleNext}
          />
        )}

        {activeTabIdx === 7 && (
          <TestMasterActivity
            speed={speed}
            accent={accent}
            onCompleteSection={onSuccess}
          />
        )}
      </main>
    </div>
  );
};
