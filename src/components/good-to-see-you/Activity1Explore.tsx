import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  FileText,
  Gauge,
  CheckCircle2,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { speakEnglish, stopSpeaking } from '../../utils/audio';
import {
  goodToSeeYouImg,
  GOOD_TO_SEE_YOU_SENTENCES,
  GOOD_TO_SEE_YOU_AUDIO_TEXT,
  GOOD_TO_SEE_YOU_TEXT_ES,
} from '../../data/goodToSeeYouData';

export const PLAYBACK_SPEEDS = [
  { value: 0.5, label: '0.5x' },
  { value: 0.65, label: '0.65x' },
  { value: 0.85, label: '0.85x' },
  { value: 1.0, label: '1x' },
  { value: 1.15, label: '1.15x' },
  { value: 1.3, label: '1.30x' },
];

export const formatSpeedLabel = (rate: number): string => {
  const found = PLAYBACK_SPEEDS.find((s) => Math.abs(s.value - rate) < 0.01);
  return found ? found.label : `${rate}x`;
};

export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

interface Activity1ExploreProps {
  speechRate?: number;
  accent?: 'US' | 'UK';
  onNext?: () => void;
}

export const Activity1Explore: React.FC<Activity1ExploreProps> = ({
  speechRate = 1.0,
  accent = 'US',
  onNext,
}) => {
  const { isDark } = useTheme();
  const safeAccent: 'US' | 'UK' = accent === 'UK' ? 'UK' : 'US';

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [currentSentenceIdx, setCurrentSentenceIdx] = useState<number | null>(null);
  const [showTranscript, setShowTranscript] = useState(true);
  const [isCardFlipped, setIsCardFlipped] = useState(false);

  // Speed state
  const [currentRate, setCurrentRate] = useState<number>(speechRate);
  const [isSpeedMenuOpen, setIsSpeedMenuOpen] = useState(false);
  const speedMenuRef = useRef<HTMLDivElement | null>(null);

  const durationSeconds = 18;
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setCurrentRate(speechRate);
  }, [speechRate]);

  // Close speed menu when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (speedMenuRef.current && !speedMenuRef.current.contains(e.target as Node)) {
        setIsSpeedMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopSpeaking();
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Sync timer
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setElapsedSeconds((prev) => {
          if (prev >= durationSeconds) {
            setIsPlaying(false);
            setCurrentSentenceIdx(null);
            return 0;
          }
          const nextSec = prev + 1;
          const matchedIdx = GOOD_TO_SEE_YOU_SENTENCES.findIndex(
            (s) => nextSec >= s.startTime && nextSec < s.endTime
          );
          if (matchedIdx !== -1) {
            setCurrentSentenceIdx(matchedIdx);
          }
          return nextSec;
        });
      }, 1000 / currentRate);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, durationSeconds, currentRate]);

  const handleTogglePlay = () => {
    if (isPlaying) {
      stopSpeaking();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      setCurrentSentenceIdx(0);
      if (!isMuted) {
        speakEnglish(
          GOOD_TO_SEE_YOU_AUDIO_TEXT,
          currentRate,
          safeAccent,
          () => {
            setIsPlaying(false);
            setCurrentSentenceIdx(null);
            setElapsedSeconds(0);
          },
          undefined,
          'male'
        );
      }
    }
  };

  const handleReset = () => {
    stopSpeaking();
    setIsPlaying(false);
    setElapsedSeconds(0);
    setCurrentSentenceIdx(null);
  };

  const handlePlaySentence = (text: string, idx: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    stopSpeaking();
    setIsPlaying(false);
    setCurrentSentenceIdx(idx);
    const targetSpeaker = GOOD_TO_SEE_YOU_SENTENCES[idx]?.speaker === 'Pam' ? 'female' : 'male';
    speakEnglish(
      text,
      currentRate,
      safeAccent,
      () => setCurrentSentenceIdx(null),
      undefined,
      targetSpeaker
    );
  };

  const handleCardClick = () => {
    setIsCardFlipped((prev) => !prev);
  };

  return (
    <div className="w-full flex flex-col gap-6 animate-in fade-in duration-200">
      {/* 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Media Player (6 cols) */}
        <div className="lg:col-span-6 flex flex-col gap-3">
          <div
            id="good-to-see-you-player-container"
            className={`relative rounded-2xl border overflow-hidden transition-colors ${
              isDark ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-200 shadow-xs'
            }`}
          >
            {/* Image / Video Display */}
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-slate-950 flex items-center justify-center">
              <img
                src={goodToSeeYouImg}
                alt="Paul and Pam chatting in the park"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />

              {/* Note Icon for Transcript Toggle (Top Right) */}
              <button
                type="button"
                id="toggle-transcript-btn"
                onClick={() => setShowTranscript((prev) => !prev)}
                className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md border transition-all cursor-pointer shadow-md ${
                  showTranscript
                    ? 'bg-indigo-600 text-white border-indigo-400'
                    : 'bg-black/60 hover:bg-black/80 text-white/80 border-white/20'
                }`}
                aria-label="Transcripción"
              >
                <FileText className="w-4 h-4" />
              </button>
            </div>

            {/* Media Player Controls Bar */}
            <div
              className={`px-4 py-3 border-t flex flex-col gap-2.5 ${
                isDark ? 'bg-slate-900 border-white/10' : 'bg-slate-50 border-slate-200'
              }`}
            >
              {/* Progress Slider */}
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-slate-500 dark:text-slate-400 shrink-0 w-10">
                  {formatTime(elapsedSeconds)}
                </span>
                <input
                  type="range"
                  min={0}
                  max={durationSeconds}
                  value={elapsedSeconds}
                  onChange={(e) => {
                    const newSec = Number(e.target.value);
                    setElapsedSeconds(newSec);
                    const matchedIdx = GOOD_TO_SEE_YOU_SENTENCES.findIndex(
                      (s) => newSec >= s.startTime && newSec < s.endTime
                    );
                    setCurrentSentenceIdx(matchedIdx !== -1 ? matchedIdx : null);
                  }}
                  className="flex-1 h-1.5 bg-slate-300 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
                <span className="font-mono text-xs text-slate-500 dark:text-slate-400 shrink-0 w-10 text-right">
                  {formatTime(durationSeconds)}
                </span>
              </div>

              {/* Control Buttons Row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {/* Play / Pause */}
                  <button
                    type="button"
                    id="player-play-btn"
                    onClick={handleTogglePlay}
                    className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-all cursor-pointer shadow-sm"
                    aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                  </button>

                  {/* Reset */}
                  <button
                    type="button"
                    id="player-reset-btn"
                    onClick={handleReset}
                    className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                      isDark
                        ? 'border-white/10 hover:bg-white/10 text-slate-300'
                        : 'border-slate-200 hover:bg-slate-200 text-slate-700'
                    }`}
                    aria-label="Reiniciar"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  {/* Speed Selector (0.5x, 0.65x, 0.85x, 1x, 1.15x, 1.30x) */}
                  <div className="relative" ref={speedMenuRef}>
                    <button
                      type="button"
                      id="speed-selector-btn"
                      onClick={() => setIsSpeedMenuOpen((prev) => !prev)}
                      className={`px-2.5 py-1.5 rounded-xl border text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer transition-colors ${
                        isDark
                          ? 'border-white/10 bg-slate-800 text-slate-200 hover:bg-slate-700'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-100 shadow-xs'
                      }`}
                    >
                      <Gauge className="w-3.5 h-3.5 text-indigo-500" />
                      <span>{formatSpeedLabel(currentRate)}</span>
                    </button>

                    {isSpeedMenuOpen && (
                      <div
                        className={`absolute right-0 bottom-full mb-1 w-28 rounded-xl shadow-xl border py-1 z-50 animate-in fade-in zoom-in-95 ${
                          isDark ? 'bg-slate-800 border-white/10' : 'bg-white border-slate-200'
                        }`}
                      >
                        {PLAYBACK_SPEEDS.map((sp) => (
                          <button
                            key={sp.value}
                            type="button"
                            onClick={() => {
                              setCurrentRate(sp.value);
                              setIsSpeedMenuOpen(false);
                            }}
                            className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between transition-colors cursor-pointer ${
                              Math.abs(currentRate - sp.value) < 0.01
                                ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-bold'
                                : isDark
                                ? 'text-slate-300 hover:bg-slate-700'
                                : 'text-slate-700 hover:bg-slate-100'
                            }`}
                          >
                            <span>{sp.label}</span>
                            {Math.abs(currentRate - sp.value) < 0.01 && (
                              <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500" />
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Mute / Unmute */}
                  <button
                    type="button"
                    id="player-mute-btn"
                    onClick={() => {
                      setIsMuted((prev) => !prev);
                      if (!isMuted && isPlaying) {
                        stopSpeaking();
                      }
                    }}
                    className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                      isDark
                        ? 'border-white/10 hover:bg-white/10 text-slate-300'
                        : 'border-slate-200 hover:bg-slate-200 text-slate-700'
                    }`}
                    aria-label="Audio"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4 text-rose-500" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Reversible Transcript Card (6 cols) */}
        {showTranscript && (
          <div className="lg:col-span-6 flex flex-col perspective-1000 min-h-[460px]">
            <div
              id="dialogue-reversible-card"
              role="button"
              tabIndex={0}
              onClick={handleCardClick}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleCardClick();
                }
              }}
              className={`relative w-full min-h-[460px] rounded-2xl cursor-pointer shadow-md transition-transform duration-500 transform-style-3d select-none ${
                isCardFlipped ? 'rotate-y-180' : ''
              }`}
            >
              {/* FRONT FACE: English Dialogue */}
              <div
                className={`absolute inset-0 w-full h-full rounded-2xl p-5 sm:p-6 flex flex-col justify-between border backface-hidden transition-colors overflow-hidden ${
                  isDark
                    ? 'bg-slate-900 border-white/10 text-slate-100'
                    : 'bg-white border-slate-200 text-slate-900'
                }`}
              >
                {/* Header: Speaker button only */}
                <div className="flex items-center justify-between pb-3 border-b border-inherit/40 shrink-0">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                    Inglés
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      stopSpeaking();
                      speakEnglish(GOOD_TO_SEE_YOU_AUDIO_TEXT, currentRate, safeAccent, undefined, undefined, 'male');
                    }}
                    className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                      isDark
                        ? 'border-white/10 hover:bg-white/10 text-indigo-300'
                        : 'border-slate-200 hover:bg-slate-100 text-indigo-600 shadow-xs'
                    }`}
                    aria-label="Audio"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Sentences List */}
                <div className="flex-1 my-3 py-1 overflow-y-auto space-y-2.5">
                  {GOOD_TO_SEE_YOU_SENTENCES.map((sent, idx) => {
                    const isCurrent = currentSentenceIdx === idx;
                    return (
                      <div
                        key={idx}
                        onClick={(e) => handlePlaySentence(sent.en, idx, e)}
                        className={`p-2.5 rounded-xl transition-all cursor-pointer border ${
                          isCurrent
                            ? isDark
                              ? 'bg-indigo-950/70 border-indigo-500 text-white shadow-xs'
                              : 'bg-indigo-50 border-indigo-400 text-indigo-950 shadow-xs'
                            : isDark
                            ? 'border-transparent hover:bg-white/5 text-slate-200'
                            : 'border-transparent hover:bg-slate-100 text-slate-800'
                        }`}
                      >
                        <p className="text-sm sm:text-base font-medium leading-snug">
                          {sent.en}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* Footer */}
                <div className="pt-3 border-t border-inherit/30 flex items-center justify-end text-xs text-slate-500 dark:text-slate-400 shrink-0">
                  <span className="font-mono text-[11px]">
                    {GOOD_TO_SEE_YOU_SENTENCES.length} oraciones
                  </span>
                </div>
              </div>

              {/* BACK FACE: Spanish Translation */}
              <div
                className={`absolute inset-0 w-full h-full rounded-2xl p-5 sm:p-6 flex flex-col justify-between border backface-hidden rotate-y-180 transition-colors overflow-hidden ${
                  isDark
                    ? 'bg-slate-900 border-white/10 text-slate-100'
                    : 'bg-white border-slate-200 text-slate-900'
                }`}
              >
                {/* Header: Speaker button only */}
                <div className="flex items-center justify-between pb-3 border-b border-inherit/40 shrink-0">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                    Español
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      stopSpeaking();
                      speakEnglish(GOOD_TO_SEE_YOU_AUDIO_TEXT, currentRate, safeAccent, undefined, undefined, 'male');
                    }}
                    className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                      isDark
                        ? 'border-white/10 hover:bg-white/10 text-emerald-300'
                        : 'border-slate-200 hover:bg-slate-100 text-emerald-600 shadow-xs'
                    }`}
                    aria-label="Audio"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Translation List */}
                <div className="flex-1 my-3 py-1 overflow-y-auto space-y-2.5">
                  {GOOD_TO_SEE_YOU_SENTENCES.map((sent, idx) => (
                    <div
                      key={idx}
                      className={`p-2.5 rounded-xl border transition-colors ${
                        isDark ? 'border-white/5 bg-white/5 text-slate-200' : 'border-slate-100 bg-slate-50 text-slate-800'
                      }`}
                    >
                      <p className="text-sm sm:text-base italic font-serif leading-snug">
                        {sent.es}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="pt-3 border-t border-inherit/30 flex items-center justify-end text-xs text-slate-500 dark:text-slate-400 shrink-0">
                  <span className="font-mono text-[11px]">
                    {GOOD_TO_SEE_YOU_SENTENCES.length} oraciones
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
