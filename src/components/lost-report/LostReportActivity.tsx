import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Award,
  Sparkles,
  Volume2,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { playFeedbackSound, stopSpeaking } from '../../utils/audio';
import { SpeedSelector } from '../tag-questions/SpeedSelector';

// Section 2 Activity Components
import { Activity1Explore } from './Activity1Explore';
import { Activity2BlanksDropdown } from './Activity2BlanksDropdown';
import { ActivityRadioChoice } from './ActivityRadioChoice';
import { Activity4TrueFalseTable } from './Activity4TrueFalseTable';
import { Activity7MatchWordsImages } from './Activity7MatchWordsImages';
import { LostReportTestMaster } from './LostReportTestMaster';

// Data
import {
  ACTIVITY_3_DATA,
  ACTIVITY_5_DATA,
  ACTIVITY_6_DATA,
  ACTIVITY_8_DATA,
  ACTIVITY_9_DATA,
  ACTIVITY_10_DATA,
} from '../../data/lostReportData';

interface LostReportActivityProps {
  accent?: 'US' | 'UK';
  speechRate?: number;
  onSuccess?: () => void;
}

const TABS = [
  { id: 0, label: 'Act 1: Diálogo & Video' },
  { id: 1, label: 'Act 2: Fill blanks' },
  { id: 2, label: "Act 3: Adam's visit" },
  { id: 3, label: 'Act 4: True / False' },
  { id: 4, label: 'Act 5: "This is impossible"' },
  { id: 5, label: "Act 6: Karen's vacation" },
  { id: 6, label: 'Act 7: Match words' },
  { id: 7, label: 'Act 8: Where are they?' },
  { id: 8, label: 'Act 9: Adam is...' },
  { id: 9, label: 'Act 10: End of video' },
  { id: 10, label: 'Test: Lost Report', isTest: true },
];

export const LostReportActivity: React.FC<LostReportActivityProps> = ({
  accent = 'US',
  speechRate = 1.0,
  onSuccess,
}) => {
  const { isDark } = useTheme();

  // Active tab index: 0..9 are activities 1..10, 10 is the Test
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
        return <Activity2BlanksDropdown speed={speed} accent={accent} />;
      case 2:
        return (
          <ActivityRadioChoice
            activityNumber={3}
            data={ACTIVITY_3_DATA}
            speed={speed}
            accent={accent}
          />
        );
      case 3:
        return <Activity4TrueFalseTable speed={speed} accent={accent} />;
      case 4:
        return (
          <ActivityRadioChoice
            activityNumber={5}
            data={ACTIVITY_5_DATA}
            speed={speed}
            accent={accent}
          />
        );
      case 5:
        return (
          <ActivityRadioChoice
            activityNumber={6}
            data={ACTIVITY_6_DATA}
            speed={speed}
            accent={accent}
          />
        );
      case 6:
        return <Activity7MatchWordsImages speed={speed} accent={accent} />;
      case 7:
        return (
          <ActivityRadioChoice
            activityNumber={8}
            data={ACTIVITY_8_DATA}
            speed={speed}
            accent={accent}
          />
        );
      case 8:
        return (
          <ActivityRadioChoice
            activityNumber={9}
            data={ACTIVITY_9_DATA}
            speed={speed}
            accent={accent}
          />
        );
      case 9:
        return (
          <ActivityRadioChoice
            activityNumber={10}
            data={ACTIVITY_10_DATA}
            speed={speed}
            accent={accent}
          />
        );
      case 10:
        return (
          <LostReportTestMaster
            speed={speed}
            accent={accent}
            onSuccess={onSuccess}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative min-h-screen pb-20">
      {/* Floating navigation buttons on the screen borders */}
      {activeTabIdx > 0 && (
        <button
          type="button"
          onClick={handlePrev}
          className="fixed left-2 sm:left-4 top-1/2 -translate-y-1/2 z-40 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-slate-700 shadow-xl flex items-center justify-center text-slate-700 dark:text-slate-200 hover:text-sky-600 dark:hover:text-sky-400 hover:scale-110 active:scale-95 transition-all cursor-pointer group"
          title="Actividad anterior (← Flecha izquierda)"
          aria-label="Actividad anterior"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:-translate-x-0.5" />
        </button>
      )}

      {activeTabIdx < totalTabs - 1 && (
        <button
          type="button"
          onClick={handleNext}
          className="fixed right-2 sm:right-4 top-1/2 -translate-y-1/2 z-40 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-slate-700 shadow-xl flex items-center justify-center text-slate-700 dark:text-slate-200 hover:text-sky-600 dark:hover:text-sky-400 hover:scale-110 active:scale-95 transition-all cursor-pointer group"
          title="Siguiente actividad (→ Flecha derecha)"
          aria-label="Siguiente actividad"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:translate-x-0.5" />
        </button>
      )}

      {/* Main Section Header Banner */}
      <div className="max-w-6xl mx-auto px-3 sm:px-4 pt-2 mb-4">
        <div
          className={`p-4 sm:p-5 rounded-3xl border transition-all ${
            isDark
              ? 'bg-gradient-to-r from-slate-900 via-sky-950/40 to-slate-900 border-slate-800'
              : 'bg-gradient-to-r from-sky-50/80 via-white to-indigo-50/80 border-sky-100 shadow-xs'
          }`}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full bg-sky-600 text-white text-[11px] font-bold tracking-wide uppercase font-mono">
                  Unit 9 · A Bad Day
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 text-[11px] font-semibold">
                  Section 2 · Lost Report
                </span>
                <span className="px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/70 text-amber-700 dark:text-amber-300 text-[11px] font-medium hidden md:inline">
                  10 Actividades + 5 Test
                </span>
              </div>

              <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                Lost Report · Comprensión en Video & Actividades
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
                Aprende con el video de Adam y Karen, completa las 10 actividades prácticas y rinde el examen final con tarjetas reversibles en español.
              </p>
            </div>

            {/* Speech Rate Control */}
            <div className="shrink-0 flex items-center gap-2">
              <SpeedSelector currentSpeed={speed} onSpeedChange={setSpeed} />
            </div>
          </div>

          {/* Navigation Tabs Bar */}
          <div className="mt-4 pt-3 border-t border-slate-200/80 dark:border-slate-800 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {TABS.map((tab, idx) => {
              const isActive = activeTabIdx === idx;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleSelectTab(idx)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? tab.isTest
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                        : 'bg-sky-600 text-white shadow-md shadow-sky-600/30'
                      : tab.isTest
                      ? isDark
                        ? 'bg-indigo-950/40 text-indigo-300 border border-indigo-900/60 hover:bg-indigo-900/40'
                        : 'bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100'
                      : isDark
                      ? 'bg-slate-800/80 text-slate-300 border border-slate-700/80 hover:bg-slate-700'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100 shadow-2xs'
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
      </div>

      {/* Active Tab Content Area */}
      <div className="max-w-6xl mx-auto px-3 sm:px-4">
        {renderActiveTabContent()}
      </div>
    </div>
  );
};
