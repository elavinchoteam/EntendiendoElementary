import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  BookOpen,
  MessageSquare,
  Sparkles,
  Award,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { playFeedbackSound, stopSpeaking } from '../../utils/audio';
import { SpeedSelector } from './SpeedSelector';
import { Activity1Explore } from './Activity1Explore';
import { ActivityRadioQuestion } from './ActivityRadioQuestion';
import { ActivityBestResponse } from './ActivityBestResponse';
import { DontDoThatInteraction } from './DontDoThatInteraction';
import {
  ACTIVIDAD_2_DATA,
  ACTIVIDAD_3_DATA,
  ACTIVIDAD_4_DATA,
  ACTIVIDAD_5_DATA,
  ACTIVIDAD_6_DATA,
  ACTIVIDAD_7_DATA,
  INTERACCION_1_DATA,
  INTERACCION_2_DATA,
  INTERACCION_3_DATA,
} from '../../data/dontDoThatData';

interface DontDoThatActivityProps {
  accent?: 'US' | 'UK';
  speechRate?: number;
  onSuccess?: () => void;
}

const TABS = [
  { id: 0, label: 'Act 1: Diálogo' },
  { id: 1, label: 'Act 2: Lugar' },
  { id: 2, label: 'Act 3: Relación' },
  { id: 3, label: 'Act 4: Vestimenta' },
  { id: 4, label: 'Act 5: Disculpa' },
  { id: 5, label: 'Act 6: Respuesta 1' },
  { id: 6, label: 'Act 7: Respuesta 2' },
  { id: 7, label: 'Interacción 1', isInteraction: true },
  { id: 8, label: 'Interacción 2', isInteraction: true },
  { id: 9, label: 'Interacción 3', isInteraction: true },
];

export const DontDoThatActivity: React.FC<DontDoThatActivityProps> = ({
  accent = 'US',
  speechRate = 1.0,
  onSuccess,
}) => {
  const { isDark } = useTheme();

  // Active tab index: 0..6 are activities 1..7, 7..9 are interactions 1..3
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
    } else if (onSuccess) {
      onSuccess();
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

  return (
    <div className="w-full max-w-6xl mx-auto px-2 sm:px-4 py-4 flex flex-col gap-6 relative select-none">
      {/* Floating Side Navigation Buttons (Screen Borders) */}
      {activeTabIdx > 0 && (
        <button
          type="button"
          onClick={handlePrev}
          className="fixed left-2 sm:left-4 top-1/2 -translate-y-1/2 z-40 p-2.5 sm:p-3 rounded-full bg-white/90 dark:bg-slate-800/90 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-xl hover:bg-sky-50 dark:hover:bg-slate-700 hover:text-sky-600 transition-all backdrop-blur-md hover:scale-105 active:scale-95"
          title="Actividad anterior (←)"
          aria-label="Actividad anterior"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      )}

      {activeTabIdx < totalTabs - 1 && (
        <button
          type="button"
          onClick={handleNext}
          className="fixed right-2 sm:right-4 top-1/2 -translate-y-1/2 z-40 p-2.5 sm:p-3 rounded-full bg-white/90 dark:bg-slate-800/90 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-xl hover:bg-sky-50 dark:hover:bg-slate-700 hover:text-sky-600 transition-all backdrop-blur-md hover:scale-105 active:scale-95"
          title="Siguiente actividad (→)"
          aria-label="Siguiente actividad"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      )}

      {/* Header Bar with Speed Selector & Navigation State */}
      <div
        className={`p-4 sm:p-5 rounded-2xl border shadow-sm flex flex-wrap items-center justify-between gap-4 transition-all ${
          isDark
            ? 'bg-slate-900/80 border-slate-700 shadow-slate-950/40'
            : 'bg-white border-slate-200 shadow-slate-100'
        }`}
      >
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wider uppercase bg-sky-100 text-sky-700 dark:bg-sky-950/80 dark:text-sky-300">
              Unit 9 · Section 4
            </span>
            <span className="text-xs text-slate-400 font-medium">
              {activeTabIdx < 7 ? '7 Actividades' : '3 Interacciones'}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-slate-100">
            Don't Do That
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Aprende imperativos de conducta y vestimenta en el trabajo, resuelve 7 actividades interactivas y practica 3 interacciones con grabación de voz y tarjetas reversibles.
          </p>
        </div>

        {/* Speed Selector */}
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-end gap-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Voz
            </span>
            <SpeedSelector currentSpeed={speed} onSpeedChange={setSpeed} />
          </div>
        </div>
      </div>

      {/* Tabs Navigation Bar */}
      <div className="w-full overflow-x-auto pb-1 no-scrollbar">
        <div className="flex items-center gap-1.5 min-w-max p-1 bg-slate-100 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700">
          {TABS.map((tab) => {
            const isActive = activeTabIdx === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleSelectTab(tab.id)}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? 'bg-sky-600 text-white shadow-md shadow-sky-600/30'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-slate-700/60'
                }`}
              >
                {tab.isInteraction ? (
                  <MessageSquare className="w-3.5 h-3.5" />
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
      <div className="w-full">
        {activeTabIdx === 0 && (
          <Activity1Explore
            speed={speed}
            accent={accent}
            onNext={handleNext}
          />
        )}

        {activeTabIdx === 1 && (
          <ActivityRadioQuestion
            data={ACTIVIDAD_2_DATA}
            speed={speed}
            accent={accent}
          />
        )}

        {activeTabIdx === 2 && (
          <ActivityRadioQuestion
            data={ACTIVIDAD_3_DATA}
            speed={speed}
            accent={accent}
          />
        )}

        {activeTabIdx === 3 && (
          <ActivityRadioQuestion
            data={ACTIVIDAD_4_DATA}
            speed={speed}
            accent={accent}
          />
        )}

        {activeTabIdx === 4 && (
          <ActivityRadioQuestion
            data={ACTIVIDAD_5_DATA}
            speed={speed}
            accent={accent}
          />
        )}

        {activeTabIdx === 5 && (
          <ActivityBestResponse
            data={ACTIVIDAD_6_DATA}
            speed={speed}
            accent={accent}
          />
        )}

        {activeTabIdx === 6 && (
          <ActivityBestResponse
            data={ACTIVIDAD_7_DATA}
            speed={speed}
            accent={accent}
          />
        )}

        {activeTabIdx === 7 && (
          <DontDoThatInteraction
            data={INTERACCION_1_DATA}
            speed={speed}
            accent={accent}
            hasPrevInteraction={false}
            hasNextInteraction={true}
            onNavigateNextInteraction={() => handleSelectTab(8)}
          />
        )}

        {activeTabIdx === 8 && (
          <DontDoThatInteraction
            data={INTERACCION_2_DATA}
            speed={speed}
            accent={accent}
            hasPrevInteraction={true}
            hasNextInteraction={true}
            onNavigatePrevInteraction={() => handleSelectTab(7)}
            onNavigateNextInteraction={() => handleSelectTab(9)}
          />
        )}

        {activeTabIdx === 9 && (
          <DontDoThatInteraction
            data={INTERACCION_3_DATA}
            speed={speed}
            accent={accent}
            hasPrevInteraction={true}
            hasNextInteraction={false}
            onNavigatePrevInteraction={() => handleSelectTab(8)}
          />
        )}
      </div>

      {/* Bottom Sticky Step Nav Indicator */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-2 pt-2 pb-6">
        <span>
          Paso {activeTabIdx + 1} de {totalTabs}
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrev}
            disabled={activeTabIdx === 0}
            className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 disabled:opacity-40 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            ← Anterior
          </button>
          <button
            type="button"
            onClick={handleNext}
            disabled={activeTabIdx === totalTabs - 1}
            className="px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-medium disabled:opacity-40 transition-colors"
          >
            Siguiente →
          </button>
        </div>
      </div>
    </div>
  );
};
