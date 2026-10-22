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
  RotateCw,
  Sparkles,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { speakEnglish, stopSpeaking, playFeedbackSound } from '../../utils/audio';
import {
  movieStarImg,
  MOVIE_STAR_SENTENCES,
  MOVIE_STAR_AUDIO_TEXT,
  MOVIE_STAR_TEXT_ES,
} from '../../data/movieStarData';

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

interface MovieStarExploreActivityProps {
  speechRate?: number;
  accent?: 'US' | 'UK';
  onNext?: () => void;
}

export const MovieStarExploreActivity: React.FC<MovieStarExploreActivityProps> = ({
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

  const durationSeconds = 19;
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
          const matchedIdx = MOVIE_STAR_SENTENCES.findIndex(
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
          MOVIE_STAR_AUDIO_TEXT,
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
    const targetSpeaker = MOVIE_STAR_SENTENCES[idx]?.speakerGender || 'male';
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
    playFeedbackSound('flip');
    setIsCardFlipped((prev) => !prev);
  };

  return (
    <div className="w-full flex flex-col gap-6 animate-in fade-in duration-200">
      {/* 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Media Player (6 cols) */}
        <div className="lg:col-span-6 flex flex-col gap-3">
          <div
            id="movie-star-player-container"
            className={`relative rounded-2xl border overflow-hidden transition-colors ${
              isDark ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-200 shadow-xs'
            }`}
          >
            {/* Image / Video Display */}
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-slate-950 flex items-center justify-center">
              <img
                src={movieStarImg}
                alt="Mark and Carol discussing movie star Robert Richman"
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
                    ? 'bg-sky-600 text-white border-sky-400'
                    : 'bg-black/60 hover:bg-black/80 text-white/80 border-white/20'
                }`}
                aria-label="Transcripción"
                title="Mostrar/Ocultar Transcripción"
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
                    const matchedIdx = MOVIE_STAR_SENTENCES.findIndex(
                      (s) => newSec >= s.startTime && newSec < s.endTime
                    );
                    setCurrentSentenceIdx(matchedIdx !== -1 ? matchedIdx : null);
                  }}
                  className="flex-1 h-1.5 bg-slate-300 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-sky-600"
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
                    className="p-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white transition-all cursor-pointer shadow-sm"
                    aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>

                  {/* Reset */}
                  <button
                    type="button"
                    id="player-reset-btn"
                    onClick={handleReset}
                    className="p-2 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-all cursor-pointer"
                    aria-label="Reiniciar"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>

                  {/* Mute */}
                  <button
                    type="button"
                    id="player-mute-btn"
                    onClick={() => {
                      setIsMuted((prev) => !prev);
                      if (!isMuted && isPlaying) stopSpeaking();
                    }}
                    className={`p-2 rounded-xl border transition-all cursor-pointer ${
                      isMuted
                        ? 'bg-rose-500/10 border-rose-500/30 text-rose-500'
                        : 'border-slate-300 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                    aria-label={isMuted ? 'Activar sonido' : 'Silenciar'}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                </div>

                {/* Speed Dial Menu */}
                <div className="relative" ref={speedMenuRef}>
                  <button
                    type="button"
                    id="player-speed-btn"
                    onClick={() => setIsSpeedMenuOpen((prev) => !prev)}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-mono font-medium hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-all cursor-pointer"
                    aria-label="Velocidad de reproducción"
                  >
                    <Gauge className="w-3.5 h-3.5 text-sky-500" />
                    <span>{formatSpeedLabel(currentRate)}</span>
                  </button>

                  {isSpeedMenuOpen && (
                    <div
                      className={`absolute bottom-full right-0 mb-2 py-1.5 w-28 rounded-xl border shadow-xl z-50 animate-in fade-in zoom-in-95 duration-150 ${
                        isDark ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
                      }`}
                    >
                      <div className="px-3 py-1 text-[10px] font-mono uppercase tracking-wider text-slate-400 border-b border-inherit/20 font-bold">
                        Velocidad
                      </div>
                      {PLAYBACK_SPEEDS.map((speed) => (
                        <button
                          key={speed.value}
                          type="button"
                          onClick={() => {
                            setCurrentRate(speed.value);
                            setIsSpeedMenuOpen(false);
                          }}
                          className={`w-full px-3 py-1.5 text-xs font-mono text-left flex items-center justify-between hover:bg-sky-50 dark:hover:bg-slate-800 cursor-pointer ${
                            Math.abs(speed.value - currentRate) < 0.01
                              ? 'text-sky-600 font-bold bg-sky-50/50 dark:bg-sky-950/30'
                              : ''
                          }`}
                        >
                          <span>{speed.label}</span>
                          {Math.abs(speed.value - currentRate) < 0.01 && (
                            <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Transcript Box Below Video (Syncs with audio highlight) */}
          {showTranscript && (
            <div
              className={`p-4 rounded-2xl border transition-all ${
                isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
              }`}
            >
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-inherit/20">
                <span className="text-xs font-mono font-bold tracking-wider uppercase text-sky-600 dark:text-sky-400">
                  Dialogue Transcript · Movie Star
                </span>
                <span className="text-[11px] text-slate-400">Click line to listen</span>
              </div>

              <div className="space-y-2 text-sm leading-relaxed font-sans">
                {MOVIE_STAR_SENTENCES.map((sent, idx) => {
                  const isCurrent = currentSentenceIdx === idx;
                  return (
                    <div
                      key={idx}
                      onClick={(e) => handlePlaySentence(sent.en, idx, e)}
                      className={`p-2 rounded-xl transition-all cursor-pointer flex items-start gap-2.5 ${
                        isCurrent
                          ? 'bg-amber-300 text-slate-950 font-semibold shadow-xs'
                          : isDark
                          ? 'hover:bg-slate-800/60 text-slate-200'
                          : 'hover:bg-sky-50/60 text-slate-800'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={(e) => handlePlaySentence(sent.en, idx, e)}
                        className={`p-1 rounded-lg shrink-0 mt-0.5 transition-colors ${
                          isCurrent
                            ? 'bg-slate-950 text-amber-300'
                            : 'text-slate-400 hover:text-sky-500 hover:bg-inherit'
                        }`}
                        title="Escuchar oración"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                      <div className="flex-1">
                        <span className="text-xs font-mono font-bold uppercase opacity-60 mr-1.5">
                          {sent.speaker}:
                        </span>
                        <span>{sent.en}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Reversible Dialogue Study Card with Full Spanish Translation */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          <div className="perspective-1000 w-full min-h-[460px] sm:min-h-[500px]">
            <div
              id="movie-star-dialogue-flip-card"
              onClick={handleCardClick}
              className={`relative w-full h-full min-h-[460px] sm:min-h-[500px] rounded-3xl cursor-pointer shadow-xl transition-transform duration-500 transform-style-3d select-none ${
                isCardFlipped ? 'rotate-y-180' : ''
              }`}
              title="Haz clic para voltear la tarjeta y ver la traducción"
            >
              {/* FRONT: English Study View */}
              <div
                className={`absolute inset-0 w-full h-full rounded-3xl p-6 sm:p-7 flex flex-col justify-between border backface-hidden shadow-md transition-colors ${
                  isDark
                    ? 'bg-slate-900 border-sky-500/30 text-slate-100'
                    : 'bg-white border-slate-200 text-slate-900'
                }`}
              >
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-inherit/30 shrink-0">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center font-bold text-xs">
                      1
                    </span>
                    <div>
                      <h3 className="font-bold text-base sm:text-lg text-sky-600 dark:text-sky-400">
                        Movie Star · Dialogue Study
                      </h3>
                      <p className="text-[11px] text-slate-400">
                        Listen to the conversation between Mark and Carol
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCardClick();
                    }}
                    className="p-1.5 px-2.5 rounded-xl text-xs font-semibold text-sky-600 dark:text-sky-400 hover:bg-sky-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-1 border border-sky-200 dark:border-slate-700"
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                    <span>Traducción</span>
                  </button>
                </div>

                {/* Sentences with line-by-line audio */}
                <div className="flex-1 py-4 flex flex-col justify-center gap-3">
                  {MOVIE_STAR_SENTENCES.map((sent, idx) => {
                    const isCurrent = currentSentenceIdx === idx;
                    return (
                      <div
                        key={idx}
                        onClick={(e) => handlePlaySentence(sent.en, idx, e)}
                        className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                          isCurrent
                            ? 'bg-amber-100 dark:bg-amber-400/20 border-amber-400 text-slate-950 dark:text-amber-100 font-semibold shadow-xs'
                            : isDark
                            ? 'bg-slate-800/40 border-slate-800 hover:bg-slate-800 text-slate-200'
                            : 'bg-slate-50 border-slate-200/80 hover:bg-sky-50/60 text-slate-800'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span
                            className={`w-6 h-6 rounded-lg text-xs font-bold font-mono flex items-center justify-center shrink-0 ${
                              sent.speaker === 'Mark'
                                ? 'bg-sky-500/10 text-sky-600 dark:text-sky-400'
                                : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
                            }`}
                          >
                            {sent.speaker[0]}
                          </span>
                          <span className="text-sm font-medium">{sent.en}</span>
                        </div>

                        <button
                          type="button"
                          onClick={(e) => handlePlaySentence(sent.en, idx, e)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-sky-600 hover:bg-white/60 dark:hover:bg-slate-700 transition-colors shrink-0"
                          title="Escuchar"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* Footer instructions */}
                <div className="pt-3 border-t border-inherit/20 text-xs text-slate-400 flex items-center justify-between shrink-0">
                  <span>Haz clic en la tarjeta para voltear y ver la traducción</span>
                  <RotateCw className="w-3.5 h-3.5 text-sky-500" />
                </div>
              </div>

              {/* BACK: Spanish Translation Study View */}
              <div
                className={`absolute inset-0 w-full h-full rounded-3xl p-6 sm:p-7 flex flex-col justify-between border backface-hidden rotate-y-180 shadow-md transition-colors ${
                  isDark
                    ? 'bg-slate-900 border-emerald-500/30 text-slate-100'
                    : 'bg-white border-emerald-200 text-slate-900'
                }`}
              >
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-inherit/30 shrink-0">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-xs">
                      1
                    </span>
                    <div>
                      <h3 className="font-bold text-base sm:text-lg text-emerald-600 dark:text-emerald-400">
                        Estrella de Cine · Traducción
                      </h3>
                      <p className="text-[11px] text-slate-400">
                        Traducción completa del diálogo en español
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCardClick();
                    }}
                    className="p-1.5 px-2.5 rounded-xl text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-1 border border-emerald-200 dark:border-slate-700"
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                    <span>Inglés</span>
                  </button>
                </div>

                {/* Spanish lines */}
                <div className="flex-1 py-4 flex flex-col justify-center gap-3 italic">
                  {MOVIE_STAR_SENTENCES.map((sent, idx) => (
                    <div
                      key={idx}
                      className={`p-2.5 rounded-xl border transition-all flex items-center gap-2.5 ${
                        isDark
                          ? 'bg-slate-800/40 border-slate-800 text-slate-200'
                          : 'bg-emerald-50/40 border-emerald-100 text-slate-800'
                      }`}
                    >
                      <span
                        className={`w-6 h-6 rounded-lg text-xs font-bold font-mono not-italic flex items-center justify-center shrink-0 ${
                          sent.speaker === 'Mark'
                            ? 'bg-sky-500/10 text-sky-600 dark:text-sky-400'
                            : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
                        }`}
                      >
                        {sent.speaker[0]}
                      </span>
                      <span className="text-sm">{sent.es}</span>
                    </div>
                  ))}
                </div>

                {/* Footer instructions */}
                <div className="pt-3 border-t border-inherit/20 text-xs text-slate-400 not-italic flex items-center justify-between shrink-0">
                  <span>Traducción pedagógica al español · Clic para volver</span>
                  <RotateCw className="w-3.5 h-3.5 text-emerald-500" />
                </div>
              </div>
            </div>
          </div>

          {/* Next Button */}
          {onNext && (
            <div className="flex justify-end pt-2">
              <button
                type="button"
                id="movie-star-explore-next-btn"
                onClick={onNext}
                className="px-6 py-3 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm shadow-md transition-all cursor-pointer flex items-center gap-2 hover:scale-[1.02] active:scale-95"
              >
                <span>Continuar a la Actividad 2</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
