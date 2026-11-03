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
import { HaveToDragExercise } from './HaveToDragExercise';
import { HaveToTestMaster } from './HaveToTestMaster';
import { MODALS_HAVE_TO_ACTIVITIES } from '../../data/modalsHaveToData';

interface ModalsHaveToActivityProps {
  accent?: 'US' | 'UK';
  speechRate?: number;
  onSuccess?: () => void;
}

const TABS = [
  { id: 0, label: 'Act 1: Diálogo' },
  { id: 1, label: 'Act 2: have to' },
  { id: 2, label: 'Act 3: has to type' },
  { id: 3, label: "Act 4: doesn't have to" },
  { id: 4, label: 'Act 5: have to write' },
  { id: 5, label: 'Act 6: has to' },
  { id: 6, label: 'Act 7: has to help' },
  { id: 7, label: "Act 8: doesn't have to" },
  { id: 8, label: 'Act 9: to use' },
  { id: 9, label: 'Act 10: to work' },
  { id: 10, label: "Act 11: don't have to" },
  { id: 11, label: 'Test: 5 Preguntas', isTest: true },
];

export const ModalsHaveToActivity: React.FC<ModalsHaveToActivityProps> = ({
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
      const activityData = MODALS_HAVE_TO_ACTIVITIES[activeTabIdx - 1];
      return (
        <HaveToDragExercise
          key={activityData.id}
          activity={activityData}
          speed={speed}
          accent={accent}
          onNext={handleNext}
          isLast={activeTabIdx === 10}
        />
      );
    }

    if (activeTabIdx === 11) {
      return (
        <HaveToTestMaster
          speed={speed}
          accent={accent}
          onSuccess={onSuccess}
        />
      );
    }

    return null;
  };

  return (
    <div className="relative min-h-[600px] pb-16">
      {/* FLOATING PREVIOUS BUTTON (<) */}
      {activeTabIdx > 0 && (
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Pestaña anterior"
          className="fixed left-2 sm:left-4 top-1/2 -translate-y-1/2 z-40 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white/95 dark:bg-slate-800/95 border-2 border-sky-500/40 hover:border-sky-500 text-sky-600 dark:text-sky-400 shadow-xl hover:shadow-2xl hover:scale-110 active:scale-95 transition-all flex items-center justify-center backdrop-blur-md cursor-pointer group"
          title="Ir a la actividad anterior (Flecha Izquierda)"
        >
          <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.5] group-hover:-translate-x-0.5 transition-transform" />
        </button>
      )}

      {/* FLOATING NEXT BUTTON (>) */}
      {activeTabIdx < totalTabs - 1 && (
        <button
          type="button"
          onClick={handleNext}
          aria-label="Pestaña siguiente"
          className="fixed right-2 sm:right-4 top-1/2 -translate-y-1/2 z-40 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white/95 dark:bg-slate-800/95 border-2 border-sky-500/40 hover:border-sky-500 text-sky-600 dark:text-sky-400 shadow-xl hover:shadow-2xl hover:scale-110 active:scale-95 transition-all flex items-center justify-center backdrop-blur-md cursor-pointer group"
          title="Ir a la siguiente actividad (Flecha Derecha)"
        >
          <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.5] group-hover:translate-x-0.5 transition-transform" />
        </button>
      )}

      {/* HEADER SECTION: Title + Speed Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide bg-sky-100 text-sky-700 dark:bg-sky-950/70 dark:text-sky-300">
              Unidad 9 · Sección 5
            </span>
            <span className="text-xs text-slate-400 font-medium">
              11 Actividades + Test
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span>Modals: Have To</span>
            <span className="text-sm font-normal text-slate-500 dark:text-slate-400">
              (Obligaciones, necesidad y ausencia de obligación)
            </span>
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <SpeedSelector speed={speed} onSpeedChange={setSpeed} />
        </div>
      </div>

      {/* TAB NAVIGATION BAR */}
      <div className="mb-6 overflow-x-auto pb-2 scrollbar-thin">
        <div className="flex items-center gap-1.5 min-w-max">
          {TABS.map((tab) => {
            const isActive = activeTabIdx === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleSelectTab(tab.id)}
                className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? tab.isTest
                      ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20'
                      : 'bg-sky-600 text-white shadow-md shadow-sky-500/20'
                    : tab.isTest
                    ? isDark
                      ? 'bg-purple-950/40 text-purple-300 hover:bg-purple-900/60 border border-purple-800/40'
                      : 'bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200'
                    : isDark
                    ? 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700/60'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200 shadow-xs'
                }`}
              >
                {tab.isTest ? (
                  <Award className="w-3.5 h-3.5" />
                ) : (
                  <BookOpen className="w-3.5 h-3.5" />
                )}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ACTIVE TAB CONTENT */}
      <div className="animate-in fade-in duration-200">
        {renderActiveTabContent()}
      </div>
    </div>
  );
};
