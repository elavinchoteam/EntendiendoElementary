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
import { ModalsCanDragExercise } from './ModalsCanDragExercise';
import { ModalsCanTestMaster } from './ModalsCanTestMaster';
import { MODALS_CAN_ACTIVITIES } from '../../data/modalsCanData';

interface ModalsCanActivityProps {
  accent?: 'US' | 'UK';
  speechRate?: number;
  onSuccess?: () => void;
}

const TABS = [
  { id: 0, label: 'Act 1: Diálogo' },
  { id: 1, label: 'Act 2: see' },
  { id: 2, label: 'Act 3: buy' },
  { id: 3, label: 'Act 4: Can' },
  { id: 4, label: "Act 5: can't" },
  { id: 5, label: 'Act 6: can' },
  { id: 6, label: 'Act 7: can' },
  { id: 7, label: "Act 8: can't hear" },
  { id: 8, label: 'Act 9: Can David' },
  { id: 9, label: "Act 10: can't" },
  { id: 10, label: 'Act 11: work' },
  { id: 11, label: 'Test: 5 Preguntas', isTest: true },
];

export const ModalsCanActivity: React.FC<ModalsCanActivityProps> = ({
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
      const activityData = MODALS_CAN_ACTIVITIES[activeTabIdx - 1];
      return (
        <ModalsCanDragExercise
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
        <ModalsCanTestMaster
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
          aria-label="Siguiente pestaña"
          className="fixed right-2 sm:right-4 top-1/2 -translate-y-1/2 z-40 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white/95 dark:bg-slate-800/95 border-2 border-sky-500/40 hover:border-sky-500 text-sky-600 dark:text-sky-400 shadow-xl hover:shadow-2xl hover:scale-110 active:scale-95 transition-all flex items-center justify-center backdrop-blur-md cursor-pointer group"
          title="Ir a la siguiente actividad (Flecha Derecha)"
        >
          <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.5] group-hover:translate-x-0.5 transition-transform" />
        </button>
      )}

      {/* Top Bar with Speed Selector & Progress Overview */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 px-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" />
            Sección 5: Modals: Can
          </span>
          <span className="text-xs text-slate-400">· 11 Actividades + 5 Tests</span>
        </div>

        <div className="flex items-center gap-3">
          <SpeedSelector currentRate={speed} onRateChange={setSpeed} />
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <div className="mb-6 overflow-x-auto pb-2 scrollbar-thin">
        <div className="flex items-center gap-1.5 min-w-max p-1.5 rounded-2xl bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80">
          {TABS.map((tab) => {
            const isActive = activeTabIdx === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleSelectTab(tab.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  isActive
                    ? tab.isTest
                      ? 'bg-purple-600 text-white shadow-sm'
                      : 'bg-sky-500 text-white shadow-sm'
                    : tab.isTest
                    ? 'text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/40'
                    : isDark
                    ? 'text-slate-300 hover:bg-slate-700 hover:text-white'
                    : 'text-slate-600 hover:bg-white hover:text-slate-900'
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

      {/* Active Tab Content */}
      <div className="animate-in fade-in duration-200">
        {renderActiveTabContent()}
      </div>

      {/* Bottom Floating Bar with Previous/Next Controls */}
      <div className="mt-8 pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <button
          type="button"
          disabled={activeTabIdx === 0}
          onClick={handlePrev}
          className={`px-4 py-2 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTabIdx === 0
              ? 'opacity-40 cursor-not-allowed border-transparent text-slate-400'
              : isDark
              ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'
              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Anterior</span>
        </button>

        <span className="text-xs font-semibold text-slate-400">
          {activeTabIdx < 11
            ? `Pestaña ${activeTabIdx + 1} de ${totalTabs}`
            : 'Evaluación Final'}
        </span>

        <button
          type="button"
          disabled={activeTabIdx === totalTabs - 1}
          onClick={handleNext}
          className={`px-4 py-2 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTabIdx === totalTabs - 1
              ? 'opacity-40 cursor-not-allowed border-transparent text-slate-400'
              : 'bg-sky-500 border-sky-600 text-white hover:bg-sky-600 shadow-xs'
          }`}
        >
          <span>Siguiente</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
