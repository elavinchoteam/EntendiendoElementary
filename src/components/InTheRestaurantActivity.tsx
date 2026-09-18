import React, { useState, useRef, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Award,
  Gauge,
  Volume2,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { RESTAURANT_ACTIVITIES } from '../data/inTheRestaurantData';
import { Activity1Transcript } from './restaurant/Activity1Transcript';
import { ActivityRadioChoice } from './restaurant/ActivityRadioChoice';
import { Activity4TrueFalseTable } from './restaurant/Activity4TrueFalseTable';
import { Activity5PersonMatching } from './restaurant/Activity5PersonMatching';
import { Activity8CharacterMatch } from './restaurant/Activity8CharacterMatch';
import { Activity9Writing } from './restaurant/Activity9Writing';
import { Activity10Tests } from './restaurant/Activity10Tests';
import { stopSpeaking } from '../utils/audio';

export interface InTheRestaurantActivityProps {
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

export const InTheRestaurantActivity: React.FC<InTheRestaurantActivityProps> = ({
  accent = 'US',
  speechRate = 1.0,
  onSuccess,
}) => {
  const { isDark } = useTheme();

  // Current activity: 0 to 9 (0 = Actividad 1, ..., 8 = Actividad 9, 9 = Actividad 10: Test)
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
    if (idx < 0 || idx > 9) return;
    stopSpeaking();
    setCurrentActivityIdx(idx);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderActiveActivity = () => {
    // Actividad 10: Test
    if (currentActivityIdx === 9) {
      return (
        <Activity10Tests
          accent={currentAccent}
          speechRate={currentRate}
          onComplete={onSuccess}
        />
      );
    }

    const currentActivity = RESTAURANT_ACTIVITIES[currentActivityIdx];
    if (!currentActivity) return null;

    switch (currentActivity.type) {
      case 'explore':
        return (
          <Activity1Transcript
            accent={currentAccent}
            speechRate={currentRate}
          />
        );

      case 'radio-choice':
        return (
          <ActivityRadioChoice
            key={currentActivity.id}
            activity={currentActivity}
            accent={currentAccent}
            speechRate={currentRate}
            onNext={() => goToSlide(currentActivityIdx + 1)}
          />
        );

      case 'table-true-false':
        return (
          <Activity4TrueFalseTable
            key={currentActivity.id}
            activity={currentActivity}
            accent={currentAccent}
            speechRate={currentRate}
            onNext={() => goToSlide(currentActivityIdx + 1)}
          />
        );

      case 'table-person-order':
        return (
          <Activity5PersonMatching
            key={currentActivity.id}
            activity={currentActivity}
            accent={currentAccent}
            speechRate={currentRate}
            onNext={() => goToSlide(currentActivityIdx + 1)}
          />
        );

      case 'character-match':
        return (
          <Activity8CharacterMatch
            key={currentActivity.id}
            activity={currentActivity}
            accent={currentAccent}
            speechRate={currentRate}
            onNext={() => goToSlide(currentActivityIdx + 1)}
          />
        );

      case 'ai-writing':
        return (
          <Activity9Writing
            key={currentActivity.id}
            activity={currentActivity}
            accent={currentAccent}
            speechRate={currentRate}
            onNext={() => goToSlide(currentActivityIdx + 1)}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="relative w-full flex flex-col items-center">
      {/* Floating Previous Activity Button (<) */}
      <button
        type="button"
        onClick={() => goToSlide(currentActivityIdx - 1)}
        disabled={currentActivityIdx === 0}
        className={`fixed sm:absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 z-40 w-11 h-11 sm:w-13 sm:h-13 rounded-full flex items-center justify-center border shadow-2xl transition-all cursor-pointer select-none ${
          currentActivityIdx === 0
            ? 'opacity-0 pointer-events-none scale-75'
            : isDark
            ? 'bg-[#1E293B]/95 hover:bg-sky-600 text-white border-white/20 hover:border-sky-400 shadow-sky-950/70 hover:scale-110 active:scale-95'
            : 'bg-white/95 hover:bg-sky-600 text-slate-800 hover:text-white border-slate-300 hover:border-sky-600 shadow-slate-400/60 hover:scale-110 active:scale-95'
        }`}
        aria-label="Actividad anterior"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Floating Next Activity Button (>) */}
      <button
        type="button"
        onClick={() => goToSlide(currentActivityIdx + 1)}
        disabled={currentActivityIdx >= 9}
        className={`fixed sm:absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 z-40 w-11 h-11 sm:w-13 sm:h-13 rounded-full flex items-center justify-center border shadow-2xl transition-all cursor-pointer select-none ${
          currentActivityIdx >= 9
            ? 'opacity-0 pointer-events-none scale-75'
            : isDark
            ? 'bg-[#1E293B]/95 hover:bg-sky-600 text-white border-white/20 hover:border-sky-400 shadow-sky-950/70 hover:scale-110 active:scale-95'
            : 'bg-white/95 hover:bg-sky-600 text-slate-800 hover:text-white border-slate-300 hover:border-sky-600 shadow-slate-400/60 hover:scale-110 active:scale-95'
        }`}
        aria-label="Siguiente actividad"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Main Container */}
      <div className="w-full px-2 sm:px-6 md:px-8 flex flex-col">
        {/* Top Header Bar with Activity Navigation Pills & Speed Dial */}
        <div
          className={`w-full p-3 sm:p-4 rounded-2xl border mb-6 flex flex-wrap items-center justify-between gap-3 ${
            isDark ? 'bg-slate-900/90 border-slate-700' : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          {/* Activity Pills Bar: Actividad 1 to 9 + Actividad 10: Test */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {Array.from({ length: 10 }).map((_, idx) => {
              const isActive = currentActivityIdx === idx;
              const isTest = idx === 9;
              const label = isTest ? 'Actividad 10: Test' : `Actividad ${idx + 1}`;

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => goToSlide(idx)}
                  className={`px-3 py-1.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-1.5 border ${
                    isActive
                      ? 'bg-sky-600 text-white border-sky-500 shadow-md ring-2 ring-sky-400 scale-105'
                      : isDark
                      ? 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                      : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                  }`}
                >
                  {isTest && <Award className="w-3.5 h-3.5" />}
                  <span>{label}</span>
                </button>
              );
            })}
          </div>

          {/* Accent & Speed Selector Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Accent Toggle */}
            <div className="flex items-center rounded-xl border p-0.5 border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800">
              <button
                type="button"
                onClick={() => setCurrentAccent('US')}
                className={`px-2 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  currentAccent === 'US'
                    ? 'bg-white dark:bg-slate-900 text-sky-600 dark:text-sky-400 shadow-xs'
                    : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
              >
                US
              </button>
              <button
                type="button"
                onClick={() => setCurrentAccent('UK')}
                className={`px-2 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  currentAccent === 'UK'
                    ? 'bg-white dark:bg-slate-900 text-sky-600 dark:text-sky-400 shadow-xs'
                    : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
              >
                UK
              </button>
            </div>

            {/* Speed Dial Menu */}
            <div className="relative" ref={speedMenuRef}>
              <button
                type="button"
                onClick={() => setIsSpeedMenuOpen((prev) => !prev)}
                className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  isDark
                    ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                }`}
              >
                <Gauge className="w-3.5 h-3.5 text-sky-500" />
                <span>{currentRate}x</span>
              </button>

              {isSpeedMenuOpen && (
                <div
                  className={`absolute right-0 top-full mt-2 w-28 rounded-xl border shadow-xl py-1 z-50 flex flex-col ${
                    isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'
                  }`}
                >
                  {PLAYBACK_SPEEDS.map((s) => (
                    <button
                      key={s.value}
                      type="button"
                      onClick={() => {
                        setCurrentRate(s.value);
                        setIsSpeedMenuOpen(false);
                      }}
                      className={`px-3 py-1.5 text-xs text-left cursor-pointer transition-colors ${
                        currentRate === s.value
                          ? 'bg-sky-600 text-white font-bold'
                          : isDark
                          ? 'text-slate-200 hover:bg-slate-800'
                          : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Active Activity View */}
        <div className="w-full transition-all duration-300">
          {renderActiveActivity()}
        </div>
      </div>
    </div>
  );
};
