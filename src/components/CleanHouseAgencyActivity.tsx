import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Award,
  Check,
  Gauge,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { speakEnglish, stopSpeaking, playFeedbackSound } from '../utils/audio';

import { CleanHouseActivity1 } from './clean-house/CleanHouseActivity1';
import { CleanHouseActivity2 } from './clean-house/CleanHouseActivity2';
import { CleanHouseActivity3 } from './clean-house/CleanHouseActivity3';
import { CleanHouseActivity4 } from './clean-house/CleanHouseActivity4';
import { CleanHouseActivity5 } from './clean-house/CleanHouseActivity5';
import { CleanHouseActivity6 } from './clean-house/CleanHouseActivity6';
import { CleanHouseActivity7Test } from './clean-house/CleanHouseActivity7Test';

export interface CleanHouseAgencyActivityProps {
  accent?: 'US' | 'UK';
  speechRate?: number;
  onSuccess?: () => void;
}

const SPEED_OPTIONS = [
  { value: 0.5, label: '0.50x' },
  { value: 0.65, label: '0.65x' },
  { value: 0.85, label: '0.85x' },
  { value: 1.0, label: '1x' },
  { value: 1.15, label: '1.15x' },
  { value: 1.3, label: '1.30x' },
];

const ACTIVITIES_INFO = [
  { id: 0, label: 'Actividad 1' },
  { id: 1, label: 'Actividad 2' },
  { id: 2, label: 'Actividad 3' },
  { id: 3, label: 'Actividad 4' },
  { id: 4, label: 'Actividad 5' },
  { id: 5, label: 'Actividad 6' },
  { id: 6, label: 'Actividad 7: Test', isTest: true },
];

export const CleanHouseAgencyActivity: React.FC<CleanHouseAgencyActivityProps> = ({
  accent = 'US',
  speechRate = 1.0,
  onSuccess,
}) => {
  const { isDark } = useTheme();

  // Navigation: Activity 1 to Activity 7 (index 0 to 6)
  const [currentActivityIdx, setCurrentActivityIdx] = useState<number>(0);

  // Speed selector
  const [currentRate, setCurrentRate] = useState<number>(speechRate);
  const [isRateMenuOpen, setIsRateMenuOpen] = useState(false);
  const rateMenuRef = useRef<HTMLDivElement | null>(null);

  // Audio sentence tracker
  const [playingSentenceId, setPlayingSentenceId] = useState<string | null>(null);

  // Close rate popup on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (rateMenuRef.current && !rateMenuRef.current.contains(event.target as Node)) {
        setIsRateMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const goToSlide = (index: number) => {
    if (index < 0 || index >= ACTIVITIES_INFO.length) return;
    stopSpeaking();
    playFeedbackSound('click');
    setPlayingSentenceId(null);
    setCurrentActivityIdx(index);
  };

  // Play audio safely
  const handlePlayAudio = (text: string, id: string, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    stopSpeaking();
    setPlayingSentenceId(id);
    speakEnglish(
      text,
      currentRate,
      accent === 'UK' ? 'UK' : 'US',
      undefined,
      () => {
        setPlayingSentenceId(null);
      }
    );
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
        disabled={currentActivityIdx >= ACTIVITIES_INFO.length - 1}
        className={`fixed sm:absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 z-40 w-11 h-11 sm:w-13 sm:h-13 rounded-full flex items-center justify-center border shadow-2xl transition-all cursor-pointer select-none ${
          currentActivityIdx >= ACTIVITIES_INFO.length - 1
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
          {/* Activity Navigation Pills */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {ACTIVITIES_INFO.map((act) => {
              const isActive = currentActivityIdx === act.id;

              return (
                <button
                  key={act.id}
                  type="button"
                  onClick={() => goToSlide(act.id)}
                  className={`px-3 py-1.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-1.5 border ${
                    isActive
                      ? 'bg-sky-600 text-white border-sky-500 shadow-md ring-2 ring-sky-400 scale-105'
                      : isDark
                      ? 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                      : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                  }`}
                >
                  {act.isTest && <Award className="w-3.5 h-3.5" />}
                  <span>{act.label}</span>
                </button>
              );
            })}
          </div>

          {/* Speed Selector Dial */}
          <div className="relative" ref={rateMenuRef}>
            <button
              type="button"
              onClick={() => setIsRateMenuOpen((prev) => !prev)}
              className={`px-3 py-1.5 rounded-xl border text-xs sm:text-sm font-mono font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                isRateMenuOpen
                  ? 'bg-sky-600 text-white border-sky-500'
                  : isDark
                  ? 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                  : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
              }`}
              aria-label="Playback speed"
            >
              <Gauge className="w-4 h-4" />
              <span>{currentRate}x</span>
            </button>

            {isRateMenuOpen && (
              <div
                className={`absolute right-0 mt-2 w-32 rounded-xl shadow-xl border z-50 py-1.5 animate-in fade-in zoom-in-95 duration-150 ${
                  isDark
                    ? 'bg-slate-900 border-slate-700 text-white'
                    : 'bg-white border-slate-200 text-slate-900'
                }`}
              >
                {SPEED_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      setCurrentRate(opt.value);
                      setIsRateMenuOpen(false);
                    }}
                    className={`w-full px-3 py-1.5 text-xs text-left font-mono font-medium flex items-center justify-between transition-colors cursor-pointer ${
                      Math.abs(currentRate - opt.value) < 0.01
                        ? 'bg-sky-500 text-white font-bold'
                        : isDark
                        ? 'hover:bg-slate-800 text-slate-300'
                        : 'hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <span>{opt.label}</span>
                    {Math.abs(currentRate - opt.value) < 0.01 && (
                      <Check className="w-3.5 h-3.5" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Dynamic Activity Content */}
        <div className="w-full">
          {currentActivityIdx === 0 && (
            <CleanHouseActivity1
              onPlayAudio={handlePlayAudio}
              playingSentenceId={playingSentenceId}
            />
          )}

          {currentActivityIdx === 1 && (
            <CleanHouseActivity2
              onPlayAudio={handlePlayAudio}
              playingSentenceId={playingSentenceId}
              onSuccess={onSuccess}
            />
          )}

          {currentActivityIdx === 2 && (
            <CleanHouseActivity3
              onPlayAudio={handlePlayAudio}
              playingSentenceId={playingSentenceId}
              onSuccess={onSuccess}
            />
          )}

          {currentActivityIdx === 3 && (
            <CleanHouseActivity4
              onPlayAudio={handlePlayAudio}
              playingSentenceId={playingSentenceId}
              onSuccess={onSuccess}
            />
          )}

          {currentActivityIdx === 4 && (
            <CleanHouseActivity5
              onPlayAudio={handlePlayAudio}
              playingSentenceId={playingSentenceId}
              onSuccess={onSuccess}
            />
          )}

          {currentActivityIdx === 5 && (
            <CleanHouseActivity6
              onPlayAudio={handlePlayAudio}
              playingSentenceId={playingSentenceId}
            />
          )}

          {currentActivityIdx === 6 && (
            <CleanHouseActivity7Test
              onPlayAudio={handlePlayAudio}
              playingSentenceId={playingSentenceId}
              onSuccess={onSuccess}
            />
          )}
        </div>
      </div>
    </div>
  );
};
