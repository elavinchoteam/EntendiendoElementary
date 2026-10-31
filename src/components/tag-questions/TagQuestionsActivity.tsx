import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Award,
  Sparkles,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { playFeedbackSound, stopSpeaking } from '../../utils/audio';
import { SpeedSelector } from './SpeedSelector';
import { Activity1Explore } from './Activity1Explore';
import { TagQuestionDragExercise } from './TagQuestionDragExercise';
import { TagQuestionsTestMaster } from './TagQuestionsTestMaster';
import { TAG_QUESTIONS_ACTIVITIES } from '../../data/tagQuestionsData';

interface TagQuestionsActivityProps {
  accent?: 'US' | 'UK';
  speechRate?: number;
  onSuccess?: () => void;
}

const TABS = [
  { id: 0, label: 'Act 1: Diálogo' },
  { id: 1, label: 'Act 2: do they?' },
  { id: 2, label: 'Act 3: do they?' },
  { id: 3, label: 'Act 4: don\'t you?' },
  { id: 4, label: 'Act 5: don\'t you?' },
  { id: 5, label: 'Act 6: doesn\'t she?' },
  { id: 6, label: 'Act 7: doesn\'t he?' },
  { id: 7, label: 'Act 8: don\'t you?' },
  { id: 8, label: 'Act 9: don\'t I?' },
  { id: 9, label: 'Act 10: do you?' },
  { id: 10, label: 'Act 11: don\'t you?' },
  { id: 11, label: 'Test: 5 Preguntas', isTest: true },
];

export const TagQuestionsActivity: React.FC<TagQuestionsActivityProps> = ({
  accent = 'US',
  speechRate = 1.0,
  onSuccess,
}) => {
  const { isDark } = useTheme();

  // Active tab index: 0..10 are activities 1..11, 11 is the Test
  const [activeTabIdx, setActiveTabIdx] = useState(0);
  const [speed, setSpeed] = useState(speechRate);

  const totalTabs = TABS.length;

  const handleSelectTab = (idx: number) => {
    stopSpeaking();
    playFeedbackSound('click');
    setActiveTabIdx(idx);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNext = () => {
    if (activeTabIdx < totalTabs - 1) {
      stopSpeaking();
      playFeedbackSound('click');
      setActiveTabIdx((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (activeTabIdx > 0) {
      stopSpeaking();
      playFeedbackSound('click');
      setActiveTabIdx((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
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

  const renderActiveTabContent = () => {
    if (activeTabIdx === 0) {
      return <Activity1Explore speed={speed} accent={accent} />;
    }

    if (activeTabIdx >= 1 && activeTabIdx <= 10) {
      const activityData = TAG_QUESTIONS_ACTIVITIES[activeTabIdx - 1];
      return (
        <TagQuestionDragExercise
          key={activityData.id}
          data={activityData}
          speed={speed}
          accent={accent}
        />
      );
    }

    if (activeTabIdx === 11) {
      return (
        <TagQuestionsTestMaster
          speed={speed}
          accent={accent}
          onSuccess={onSuccess}
        />
      );
    }

    return null;
  };

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

      {/* Top Header: Title + Speed Selector + Navigation Tabs */}
      <div className="w-full px-2 sm:px-6 md:px-8 flex flex-col gap-4">
        {/* Unit Info & Speed */}
        <div className="w-full flex items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400">
              <BookOpen className="w-5 h-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                  Unidad 8 &bull; Sección 4
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-100 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300">
                  11 Actividades + 5 Tests
                </span>
              </div>
              <h1 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                Present Simple: Task Questions
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <SpeedSelector
              currentSpeed={speed}
              onSpeedChange={(newSpeed) => setSpeed(newSpeed)}
            />
          </div>
        </div>

        {/* Tab Strip (11 Actividades + 1 Test) */}
        <div className="w-full overflow-x-auto pb-1 scrollbar-thin">
          <div className="flex items-center gap-1.5 min-w-max p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700">
            {TABS.map((tab) => {
              const isActive = activeTabIdx === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleSelectTab(tab.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? tab.isTest
                        ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-xs'
                        : 'bg-sky-600 text-white shadow-xs'
                      : tab.isTest
                      ? 'text-amber-600 dark:text-amber-400 hover:bg-slate-200/60 dark:hover:bg-slate-700/60'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-700/60'
                  }`}
                >
                  {tab.isTest ? <Award className="w-3.5 h-3.5" /> : null}
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="w-full pt-2">
          {renderActiveTabContent()}
        </div>
      </div>
    </div>
  );
};
