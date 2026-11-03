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
import { Activity1ExploreMay } from './Activity1ExploreMay';
import { MayDragExercise } from './MayDragExercise';
import { MayTestMaster } from './MayTestMaster';
import { MODALS_MAY_ACTIVITIES } from '../../data/modalsMayData';

interface ModalsMayActivityProps {
  accent?: 'US' | 'UK';
  speechRate?: number;
  onSuccess?: () => void;
}

const TABS = [
  { id: 0, label: 'Act 1: Diálogo' },
  { id: 1, label: 'Act 2: may rain' },
  { id: 2, label: 'Act 3: may arrive' },
  { id: 3, label: 'Act 4: may' },
  { id: 4, label: 'Act 5: May' },
  { id: 5, label: 'Act 6: May I sit here' },
  { id: 6, label: 'Act 7: may' },
  { id: 7, label: 'Act 8: may' },
  { id: 8, label: 'Act 9: may not take' },
  { id: 9, label: 'Act 10: need' },
  { id: 10, label: 'Act 11: go' },
  { id: 11, label: 'Test: 5 Preguntas', isTest: true },
];

export const ModalsMayActivity: React.FC<ModalsMayActivityProps> = ({
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
      return <Activity1ExploreMay speed={speed} accent={accent} />;
    }

    if (activeTabIdx >= 1 && activeTabIdx <= 10) {
      const activityData = MODALS_MAY_ACTIVITIES[activeTabIdx - 1];
      return (
        <MayDragExercise
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
        <MayTestMaster
          speed={speed}
          accent={accent}
          onSuccess={onSuccess}
        />
      );
    }

    return null;
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto space-y-6 pb-16">
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

      {/* Top Section Header */}
      <div
        className={`p-4 sm:p-6 rounded-3xl border ${
          isDark
            ? 'bg-slate-900/90 border-slate-800 text-white'
            : 'bg-white border-slate-200 text-slate-900'
        } shadow-sm`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-7 h-7 rounded-lg bg-sky-600 text-white font-mono font-bold text-xs flex items-center justify-center shadow-xs">
                9.6
              </span>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                Unidad 9 · Sección 6
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                11 Actividades + 5 Test
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Modals: May
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
              Aprende el modal <strong>may</strong> para pedir permiso formal (<em>May I have a cookie?</em>) y para expresar posibilidad (<em>It may rain today</em>). Todas las tarjetas y opciones son 100% reversibles con traducciones en español y audio nativo.
            </p>
          </div>

          {/* Speed Selector Control */}
          <div className="flex items-center gap-3 shrink-0">
            <SpeedSelector speed={speed} onSpeedChange={(newSpeed) => setSpeed(newSpeed)} />
          </div>
        </div>

        {/* Tab Navigation Scrollbar */}
        <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between mb-2 text-xs font-mono font-bold uppercase text-slate-400">
            <span>Ruta de Aprendizaje</span>
            <span>
              {activeTabIdx + 1} de {totalTabs}
            </span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-sky-500/30">
            {TABS.map((tab, idx) => {
              const isActive = activeTabIdx === idx;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleSelectTab(idx)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? tab.isTest
                        ? 'bg-amber-500 text-white font-bold ring-2 ring-amber-300 dark:ring-amber-700 shadow-sm'
                        : 'bg-sky-600 text-white font-bold ring-2 ring-sky-300 dark:ring-sky-700 shadow-sm'
                      : tab.isTest
                      ? isDark
                        ? 'bg-amber-950/40 text-amber-300 hover:bg-amber-900/50 border border-amber-800/40'
                        : 'bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200'
                      : isDark
                      ? 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200'
                  }`}
                >
                  {tab.isTest ? (
                    <Award className="w-3.5 h-3.5" />
                  ) : (
                    <span className="w-4 h-4 rounded-full bg-black/20 text-[10px] font-mono flex items-center justify-center">
                      {idx + 1}
                    </span>
                  )}
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Workspace Body for Active Tab */}
      <div className="transition-all duration-200">{renderActiveTabContent()}</div>
    </div>
  );
};
