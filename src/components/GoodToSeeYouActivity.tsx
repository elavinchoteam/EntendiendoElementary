import React, { useState, useRef, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Gauge,
  Sparkles,
  Award,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { stopSpeaking } from '../utils/audio';
import { Activity1Explore } from './good-to-see-you/Activity1Explore';
import { GoodToSeeYouQuestionActivity } from './good-to-see-you/GoodToSeeYouQuestionActivity';
import { GoodToSeeYouSpeechActivity } from './good-to-see-you/GoodToSeeYouSpeechActivity';
import { Activity7Interaction } from './good-to-see-you/Activity7Interaction';
import {
  GOOD_TO_SEE_YOU_ACT2,
  GOOD_TO_SEE_YOU_ACT3,
  GOOD_TO_SEE_YOU_ACT4,
  GOOD_TO_SEE_YOU_ACT5,
  GOOD_TO_SEE_YOU_ACT6,
} from '../data/goodToSeeYouData';

export interface GoodToSeeYouActivityProps {
  accent?: 'US' | 'UK';
  speechRate?: number;
  onSuccess?: () => void;
}

const PLAYBACK_SPEEDS = [
  { value: 0.5, label: '0.50x' },
  { value: 0.65, label: '0.65x' },
  { value: 0.85, label: '0.85x' },
  { value: 1.0, label: '1x' },
  { value: 1.15, label: '1.15x' },
  { value: 1.3, label: '1.30x' },
];

const ACTIVITIES_META = [
  { id: 1, title: 'Actividad 1', label: 'Diálogo & Video' },
  { id: 2, title: 'Actividad 2', label: 'Comprensión 1' },
  { id: 3, title: 'Actividad 3', label: 'Comprensión 2' },
  { id: 4, title: 'Actividad 4', label: 'Comprensión 3' },
  { id: 5, title: 'Actividad 5', label: 'Respuesta Oral 1' },
  { id: 6, title: 'Actividad 6', label: 'Respuesta Oral 2' },
  { id: 7, title: 'Actividad 7', label: 'Interacción (3 Partes)' },
];

export const GoodToSeeYouActivity: React.FC<GoodToSeeYouActivityProps> = ({
  accent = 'US',
  speechRate = 1.0,
  onSuccess,
}) => {
  const { isDark } = useTheme();

  // Current activity index: 0 to 6 (Actividad 1 to Actividad 7)
  const [currentActivityIdx, setCurrentActivityIdx] = useState<number>(0);
  const [currentRate, setCurrentRate] = useState<number>(speechRate || 1.0);
  const [currentAccent, setCurrentAccent] = useState<'US' | 'UK'>(accent || 'US');
  const [isSpeedMenuOpen, setIsSpeedMenuOpen] = useState(false);
  const speedMenuRef = useRef<HTMLDivElement | null>(null);

  // Close speed menu on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (speedMenuRef.current && !speedMenuRef.current.contains(e.target as Node)) {
        setIsSpeedMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const goToSlide = (idx: number) => {
    if (idx < 0 || idx >= ACTIVITIES_META.length) return;
    stopSpeaking();
    setCurrentActivityIdx(idx);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderActiveActivity = () => {
    switch (currentActivityIdx) {
      case 0:
        return (
          <Activity1Explore
            speechRate={currentRate}
            accent={currentAccent}
            onNext={() => goToSlide(1)}
          />
        );
      case 1:
        return (
          <GoodToSeeYouQuestionActivity
            exercise={GOOD_TO_SEE_YOU_ACT2}
            activityNumber={2}
            speechRate={currentRate}
            accent={currentAccent}
            onNext={() => goToSlide(2)}
          />
        );
      case 2:
        return (
          <GoodToSeeYouQuestionActivity
            exercise={GOOD_TO_SEE_YOU_ACT3}
            activityNumber={3}
            speechRate={currentRate}
            accent={currentAccent}
            onNext={() => goToSlide(3)}
          />
        );
      case 3:
        return (
          <GoodToSeeYouQuestionActivity
            exercise={GOOD_TO_SEE_YOU_ACT4}
            activityNumber={4}
            speechRate={currentRate}
            accent={currentAccent}
            onNext={() => goToSlide(4)}
          />
        );
      case 4:
        return (
          <GoodToSeeYouSpeechActivity
            exercise={GOOD_TO_SEE_YOU_ACT5}
            activityNumber={5}
            speechRate={currentRate}
            accent={currentAccent}
            onNext={() => goToSlide(5)}
          />
        );
      case 5:
        return (
          <GoodToSeeYouSpeechActivity
            exercise={GOOD_TO_SEE_YOU_ACT6}
            activityNumber={6}
            speechRate={currentRate}
            accent={currentAccent}
            onNext={() => goToSlide(6)}
          />
        );
      case 6:
        return (
          <Activity7Interaction
            speechRate={currentRate}
            accent={currentAccent}
            onComplete={() => {
              if (onSuccess) onSuccess();
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      id="good-to-see-you-container"
      className={`relative w-full min-h-screen py-6 px-3 sm:px-8 md:px-12 transition-colors duration-300 flex flex-col items-center ${
        isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
      }`}
    >
      {/* Floating Previous Activity Button (<) */}
      <button
        type="button"
        id="good-to-see-you-floating-prev-btn"
        onClick={() => goToSlide(currentActivityIdx - 1)}
        disabled={currentActivityIdx === 0}
        className={`fixed sm:absolute left-1 sm:left-3 top-1/2 -translate-y-1/2 z-40 w-11 h-11 sm:w-13 sm:h-13 rounded-full flex items-center justify-center border shadow-2xl transition-all cursor-pointer select-none ${
          currentActivityIdx === 0
            ? 'opacity-0 pointer-events-none scale-75'
            : isDark
            ? 'bg-[#1E293B]/95 hover:bg-sky-600 text-white border-white/20 hover:border-sky-400 shadow-sky-950/70 hover:scale-110 active:scale-95'
            : 'bg-white/95 hover:bg-sky-600 text-slate-800 hover:text-white border-slate-300 hover:border-sky-600 shadow-slate-400/60 hover:scale-110 active:scale-95'
        }`}
        aria-label="Actividad anterior"
        title={currentActivityIdx > 0 ? `Actividad anterior: ${ACTIVITIES_META[currentActivityIdx - 1].title}` : 'Inicio'}
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Floating Next Activity Button (>) */}
      <button
        type="button"
        id="good-to-see-you-floating-next-btn"
        onClick={() => goToSlide(currentActivityIdx + 1)}
        disabled={currentActivityIdx >= ACTIVITIES_META.length - 1}
        className={`fixed sm:absolute right-1 sm:right-3 top-1/2 -translate-y-1/2 z-40 w-11 h-11 sm:w-13 sm:h-13 rounded-full flex items-center justify-center border shadow-2xl transition-all cursor-pointer select-none ${
          currentActivityIdx >= ACTIVITIES_META.length - 1
            ? 'opacity-0 pointer-events-none scale-75'
            : isDark
            ? 'bg-[#1E293B]/95 hover:bg-sky-600 text-white border-white/20 hover:border-sky-400 shadow-sky-950/70 hover:scale-110 active:scale-95'
            : 'bg-white/95 hover:bg-sky-600 text-slate-800 hover:text-white border-slate-300 hover:border-sky-600 shadow-slate-400/60 hover:scale-110 active:scale-95'
        }`}
        aria-label="Siguiente actividad"
        title={currentActivityIdx < ACTIVITIES_META.length - 1 ? `Siguiente actividad: ${ACTIVITIES_META[currentActivityIdx + 1].title}` : 'Fin'}
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div className="w-full max-w-6xl mx-auto flex flex-col gap-5">
        {/* Top Control Bar: Activity Navigation, Audio Rate, Accent */}
        <header
          className={`p-3.5 sm:p-4 rounded-2xl border transition-colors shadow-xs flex flex-col md:flex-row items-center justify-between gap-3 ${
            isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
          }`}
        >
          {/* Navigation between Activities */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-start">
            <button
              type="button"
              id="gtsy-prev-activity-btn"
              onClick={() => goToSlide(currentActivityIdx - 1)}
              disabled={currentActivityIdx === 0}
              className={`p-2 rounded-xl border transition-all cursor-pointer ${
                currentActivityIdx === 0
                  ? 'opacity-40 cursor-not-allowed border-transparent text-slate-400'
                  : isDark
                  ? 'border-slate-700 hover:bg-slate-800 text-slate-200'
                  : 'border-slate-200 hover:bg-slate-100 text-slate-800'
              }`}
              aria-label="Anterior actividad"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wide">
                Unit 5 · Sec 3
              </span>
              <span className="text-slate-300 dark:text-slate-700">/</span>
              <span className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                {ACTIVITIES_META[currentActivityIdx].title}
              </span>
              {currentActivityIdx === 6 && (
                <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-sky-500/20 text-sky-600 dark:text-sky-400 border border-sky-500/30">
                  3 Partes
                </span>
              )}
            </div>

            <button
              type="button"
              id="gtsy-next-activity-btn"
              onClick={() => goToSlide(currentActivityIdx + 1)}
              disabled={currentActivityIdx === ACTIVITIES_META.length - 1}
              className={`p-2 rounded-xl border transition-all cursor-pointer ${
                currentActivityIdx === ACTIVITIES_META.length - 1
                  ? 'opacity-40 cursor-not-allowed border-transparent text-slate-400'
                  : isDark
                  ? 'border-slate-700 hover:bg-slate-800 text-slate-200'
                  : 'border-slate-200 hover:bg-slate-100 text-slate-800'
              }`}
              aria-label="Siguiente actividad"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Accent and Playback Speed Controls */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            {/* Accent Toggle */}
            <div className="flex items-center rounded-xl p-1 border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950 text-xs font-bold">
              <button
                type="button"
                onClick={() => {
                  stopSpeaking();
                  setCurrentAccent('US');
                }}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                  currentAccent === 'US'
                    ? 'bg-sky-600 text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                US
              </button>
              <button
                type="button"
                onClick={() => {
                  stopSpeaking();
                  setCurrentAccent('UK');
                }}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                  currentAccent === 'UK'
                    ? 'bg-sky-600 text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                UK
              </button>
            </div>

            {/* Playback Speed Menu */}
            <div className="relative" ref={speedMenuRef}>
              <button
                type="button"
                id="gtsy-speed-menu-btn"
                onClick={() => setIsSpeedMenuOpen(!isSpeedMenuOpen)}
                className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                  isDark
                    ? 'bg-slate-800 hover:bg-slate-700 text-sky-300 border-slate-700'
                    : 'bg-white hover:bg-slate-100 text-sky-900 border-slate-200 shadow-xs'
                }`}
                aria-label="Audio Speed"
              >
                <Gauge className="w-3.5 h-3.5" />
                <span>{currentRate}x</span>
              </button>

              {isSpeedMenuOpen && (
                <div
                  className={`absolute right-0 mt-1.5 w-32 rounded-xl border shadow-xl py-1 z-50 animate-in fade-in zoom-in-95 ${
                    isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'
                  }`}
                >
                  <div className="px-3 py-1 text-[11px] font-mono text-slate-400 uppercase font-bold border-b border-inherit/40">
                    Velocidad
                  </div>
                  {PLAYBACK_SPEEDS.map((sp) => (
                    <button
                      key={sp.value}
                      type="button"
                      onClick={() => {
                        stopSpeaking();
                        setCurrentRate(sp.value);
                        setIsSpeedMenuOpen(false);
                      }}
                      className={`w-full px-3 py-1.5 text-xs text-left font-semibold flex items-center justify-between cursor-pointer transition-colors ${
                        currentRate === sp.value
                          ? 'bg-sky-500/20 text-sky-600 dark:text-sky-400'
                          : isDark
                          ? 'hover:bg-slate-800 text-slate-300'
                          : 'hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <span>{sp.label}</span>
                      {currentRate === sp.value && <span className="text-sky-500">✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Activity Step Pills (Actividad 1 -> Actividad 7) */}
        <div className="w-full overflow-x-auto pb-1 scrollbar-none">
          <div className="flex items-center gap-1.5 min-w-max">
            {ACTIVITIES_META.map((act, idx) => {
              const isActive = currentActivityIdx === idx;
              const isPast = currentActivityIdx > idx;

              return (
                <button
                  key={act.id}
                  type="button"
                  id={`activity-pill-btn-${act.id}`}
                  onClick={() => goToSlide(idx)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 border ${
                    isActive
                      ? 'bg-sky-600 text-white border-sky-500 shadow-md ring-2 ring-sky-400 scale-[1.02]'
                      : isPast
                      ? isDark
                        ? 'bg-slate-900/90 text-sky-400/80 border-slate-800 hover:bg-slate-800'
                        : 'bg-white text-sky-800 border-sky-200 hover:bg-sky-50'
                      : isDark
                      ? 'bg-slate-900/50 text-slate-400 border-slate-800/80 hover:bg-slate-800'
                      : 'bg-white/80 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span>{act.title}</span>
                  {idx === 6 ? <Award className="w-3.5 h-3.5" /> : null}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Content Area */}
        <main className="w-full mt-2">
          {renderActiveActivity()}
        </main>
      </div>
    </div>
  );
};
