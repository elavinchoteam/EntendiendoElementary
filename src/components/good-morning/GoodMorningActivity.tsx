import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Film,
  Award,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { playFeedbackSound, stopSpeaking } from '../../utils/audio';
import { Activity1Explore } from './Activity1Explore';
import { Activity2Matching } from './Activity2Matching';
import { Activity3Cloze } from './Activity3Cloze';
import { ActivityRadioChoice } from './ActivityRadioChoice';
import { Activity5ClassificationTable } from './Activity5ClassificationTable';
import { GoodMorningTestMaster } from './GoodMorningTestMaster';
import { SpeedSelector } from './SpeedSelector';

interface GoodMorningActivityProps {
  accent?: 'US' | 'UK';
  speechRate?: number;
  onSuccess?: () => void;
}

const TABS = [
  { id: 0, label: 'Act 1: Diálogo' },
  { id: 1, label: 'Act 2: Imágenes' },
  { id: 2, label: 'Act 3: Conversación' },
  { id: 3, label: 'Act 4: "Come on"' },
  { id: 4, label: 'Act 5: Tabla V/F' },
  { id: 5, label: 'Act 6: Título' },
  { id: 6, label: 'Act 7: Ropa' },
  { id: 7, label: 'Act 8: Desayuno' },
  { id: 8, label: 'Act 9: Bebida' },
  { id: 9, label: 'Act 10: Acción' },
  { id: 10, label: 'Act 11: Mamá' },
  { id: 11, label: 'Act 12: Destino' },
  { id: 12, label: 'Test: 5 Preguntas', isTest: true },
];

export const GoodMorningActivity: React.FC<GoodMorningActivityProps> = ({
  accent = 'US',
  speechRate = 1.0,
  onSuccess,
}) => {
  const { isDark } = useTheme();

  // Active tab index: 0..11 are activities 1..12, 12 is the Test
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
    switch (activeTabIdx) {
      case 0:
        return <Activity1Explore speed={speed} accent={accent} />;
      case 1:
        return <Activity2Matching speed={speed} accent={accent} onNext={handleNext} />;
      case 2:
        return <Activity3Cloze speed={speed} accent={accent} />;
      case 3:
        return <ActivityRadioChoice activityNumber={4} speed={speed} accent={accent} />;
      case 4:
        return <Activity5ClassificationTable speed={speed} accent={accent} />;
      case 5:
        return <ActivityRadioChoice activityNumber={6} speed={speed} accent={accent} />;
      case 6:
        return <ActivityRadioChoice activityNumber={7} speed={speed} accent={accent} />;
      case 7:
        return <ActivityRadioChoice activityNumber={8} speed={speed} accent={accent} />;
      case 8:
        return <ActivityRadioChoice activityNumber={9} speed={speed} accent={accent} />;
      case 9:
        return <ActivityRadioChoice activityNumber={10} speed={speed} accent={accent} />;
      case 10:
        return <ActivityRadioChoice activityNumber={11} speed={speed} accent={accent} />;
      case 11:
        return <ActivityRadioChoice activityNumber={12} speed={speed} accent={accent} />;
      case 12:
        return (
          <GoodMorningTestMaster
            speed={speed}
            accent={accent}
            onCompleteSection={onSuccess}
          />
        );
      default:
        return null;
    }
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
              <Film className="w-5 h-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                  Unidad 8 &bull; Sección 1
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300">
                  Video Lesson
                </span>
              </div>
              <h1 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                Good Morning!
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

        {/* Tab Strip */}
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
                        ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-xs'
                        : 'bg-sky-600 text-white shadow-xs'
                      : tab.isTest
                      ? 'text-amber-600 dark:text-amber-400 hover:bg-slate-200/60 dark:hover:bg-slate-700/60'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-700/60'
                  }`}
                >
                  {tab.isTest && <Award className="w-3.5 h-3.5" />}
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
