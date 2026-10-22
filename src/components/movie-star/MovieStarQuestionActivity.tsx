import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  FileText,
  Gauge,
  Check,
  CheckCircle2,
  XCircle,
  RotateCw,
  Sparkles,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { speakEnglish, stopSpeaking, playFeedbackSound } from '../../utils/audio';
import { RadioChoiceExercise } from '../../types';
import {
  movieStarImg,
  MOVIE_STAR_SENTENCES,
  MOVIE_STAR_AUDIO_TEXT,
} from '../../data/movieStarData';
import { PLAYBACK_SPEEDS, formatSpeedLabel, formatTime } from './MovieStarExploreActivity';

interface MovieStarQuestionActivityProps {
  exercise: RadioChoiceExercise;
  activityNumber: number; // 2, 3, 4, 5
  speechRate?: number;
  accent?: 'US' | 'UK';
  onNext?: () => void;
}

export const MovieStarQuestionActivity: React.FC<MovieStarQuestionActivityProps> = ({
  exercise,
  activityNumber,
  speechRate = 1.0,
  accent = 'US',
  onNext,
}) => {
  const { isDark } = useTheme();
  const safeAccent: 'US' | 'UK' = accent === 'UK' ? 'UK' : 'US';

  // Selection & verification
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [hasChecked, setHasChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // Flip states
  const [isInstructionFlipped, setIsInstructionFlipped] = useState(false);
  const [isQuestionFlipped, setIsQuestionFlipped] = useState(false);
  const [flippedOptionIds, setFlippedOptionIds] = useState<string[]>([]);

  // Media Player states
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [currentSentenceIdx, setCurrentSentenceIdx] = useState<number | null>(null);
  const [showTranscript, setShowTranscript] = useState(true);

  // Speed controls
  const [currentRate, setCurrentRate] = useState(speechRate);
  const [isSpeedMenuOpen, setIsSpeedMenuOpen] = useState(false);
  const speedMenuRef = useRef<HTMLDivElement | null>(null);

  const durationSeconds = 19;
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setCurrentRate(speechRate);
  }, [speechRate]);

  // Reset states on question switch
  useEffect(() => {
    setSelectedOptionId(null);
    setHasChecked(false);
    setIsCorrect(false);
    setIsInstructionFlipped(false);
    setIsQuestionFlipped(false);
    setFlippedOptionIds([]);
    setIsPlaying(false);
    setElapsedSeconds(0);
    setCurrentSentenceIdx(null);
    stopSpeaking();
  }, [exercise.id]);

  // Outside click for speed menu
  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (speedMenuRef.current && !speedMenuRef.current.contains(e.target as Node)) {
        setIsSpeedMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  // Cleanup
  useEffect(() => {
    return () => {
      stopSpeaking();
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Audio timer
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
    setSelectedOptionId(null);
    setHasChecked(false);
    setIsCorrect(false);
    setFlippedOptionIds([]);
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

  const handleSpeakText = (text: string, e: React.MouseEvent) => {
    e.stopPropagation();
    stopSpeaking();
    speakEnglish(text, currentRate, safeAccent);
  };

  const handleOptionSelect = (optionId: string) => {
    playFeedbackSound('click');
    setSelectedOptionId(optionId);
    setHasChecked(false);
  };

  const toggleOptionFlip = (optionId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    playFeedbackSound('flip');
    setFlippedOptionIds((prev) =>
      prev.includes(optionId) ? prev.filter((id) => id !== optionId) : [...prev, optionId]
    );
  };

  const handleCheck = () => {
    if (!selectedOptionId) return;
    const right = selectedOptionId === exercise.correctAnswerId;
    setIsCorrect(right);
    setHasChecked(true);
    if (right) {
      playFeedbackSound('correct');
    } else {
      playFeedbackSound('wrong');
    }
  };

  return (
    <div className="w-full flex flex-col gap-6 animate-in fade-in duration-200">
      {/* 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Media Player & Synchronized Transcript (5.5 cols) */}
        <div className="lg:col-span-5 xl:col-span-5 flex flex-col gap-3">
          <div
            id={`movie-star-player-act-${activityNumber}`}
            className={`relative rounded-2xl border overflow-hidden transition-colors ${
              isDark ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-200 shadow-xs'
            }`}
          >
            {/* Image / Video Display */}
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-slate-950 flex items-center justify-center">
              <img
                src={movieStarImg}
                alt="Mark and Carol talking about movie star Robert Richman"
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
                  Dialogue Transcript
                </span>
                <span className="text-[11px] text-slate-400">Click line to listen</span>
              </div>

              <div className="space-y-1.5 text-xs sm:text-sm leading-relaxed font-sans">
                {MOVIE_STAR_SENTENCES.map((sent, idx) => {
                  const isCurrent = currentSentenceIdx === idx;
                  return (
                    <div
                      key={idx}
                      onClick={(e) => handlePlaySentence(sent.en, idx, e)}
                      className={`p-1.5 sm:p-2 rounded-xl transition-all cursor-pointer flex items-start gap-2 ${
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
                        <span className="text-[11px] font-mono font-bold uppercase opacity-60 mr-1.5">
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

        {/* Right Column: Radio Choice Exercise (6.5 - 7 cols) */}
        <div className="lg:col-span-7 xl:col-span-7 flex flex-col gap-4">
          {/* Reversible Instruction Header Card */}
          <div className="w-full perspective-1000">
            <div
              id={`instruction-card-act-${activityNumber}`}
              onClick={() => {
                playFeedbackSound('flip');
                setIsInstructionFlipped((prev) => !prev);
              }}
              className={`relative w-full rounded-2xl cursor-pointer shadow-sm transition-transform duration-500 transform-style-3d border ${
                isInstructionFlipped ? 'rotate-y-180' : ''
              } ${
                isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
              }`}
              title="Haz clic para voltear la instrucción y ver su traducción"
            >
              {/* FRONT: English Instruction */}
              <div className="w-full p-4 sm:p-4.5 flex items-center justify-between backface-hidden">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center font-bold text-xs">
                    {activityNumber}
                  </span>
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                      {exercise.instructions}
                    </h2>
                    <p className="text-xs text-slate-400">
                      Select the best answer · Clic para traducir
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                  <button
                    type="button"
                    onClick={(e) => handleSpeakText(exercise.instructions, e)}
                    className="p-2 rounded-xl text-slate-400 hover:text-sky-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    title="Escuchar instrucción"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      playFeedbackSound('flip');
                      setIsInstructionFlipped((prev) => !prev);
                    }}
                    className="p-1.5 px-2 rounded-xl text-xs font-semibold text-sky-600 dark:text-sky-400 hover:bg-sky-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-1 border border-sky-200 dark:border-slate-700"
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                    <span>Español</span>
                  </button>
                </div>
              </div>

              {/* BACK: Spanish Instruction */}
              <div className="absolute inset-0 w-full h-full p-4 sm:p-4.5 flex items-center justify-between backface-hidden rotate-y-180">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-xs">
                    {activityNumber}
                  </span>
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-emerald-600 dark:text-emerald-400 italic">
                      {exercise.instructionsEs}
                    </h2>
                    <p className="text-xs text-slate-400 not-italic">
                      Traducción pedagógica · Clic para volver a inglés
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    playFeedbackSound('flip');
                    setIsInstructionFlipped((prev) => !prev);
                  }}
                  className="p-1.5 px-2 rounded-xl text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-1 border border-emerald-200 dark:border-slate-700"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>Inglés</span>
                </button>
              </div>
            </div>
          </div>

          {/* Question & Radio Options Card */}
          <div
            className={`w-full p-5 sm:p-7 rounded-3xl border shadow-sm transition-all flex flex-col gap-6 ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}
          >
            {/* Reversible Question Prompt Card */}
            <div className="w-full perspective-1000">
              <div
                id={`question-prompt-card-act-${activityNumber}`}
                onClick={() => {
                  playFeedbackSound('flip');
                  setIsQuestionFlipped((prev) => !prev);
                }}
                className={`relative w-full rounded-2xl cursor-pointer shadow-xs transition-transform duration-500 transform-style-3d border p-4 sm:p-5 ${
                  isQuestionFlipped ? 'rotate-y-180' : ''
                } ${
                  isDark
                    ? 'bg-slate-800/80 border-slate-700 text-slate-100'
                    : 'bg-sky-50/60 border-sky-100 text-slate-900'
                }`}
                title="Haz clic para ver la pregunta en español"
              >
                {/* FRONT: English Question */}
                <div className="w-full flex items-center justify-between backface-hidden gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-sky-500 shrink-0" />
                    <h3 className="text-base sm:text-lg font-bold">
                      {exercise.question}
                    </h3>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0" onClick={(e) => e.stopPropagation()}>
                    <button
                      type="button"
                      onClick={(e) => handleSpeakText(exercise.question, e)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-sky-600 hover:bg-white/80 dark:hover:bg-slate-700 transition-colors"
                      title="Escuchar pregunta"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        playFeedbackSound('flip');
                        setIsQuestionFlipped((prev) => !prev);
                      }}
                      className="p-1.5 px-2 rounded-xl text-xs font-semibold text-sky-600 dark:text-sky-400 hover:bg-white/80 dark:hover:bg-slate-700 transition-colors flex items-center gap-1 border border-sky-200 dark:border-slate-700"
                    >
                      <RotateCw className="w-3.5 h-3.5" />
                      <span>Traducir</span>
                    </button>
                  </div>
                </div>

                {/* BACK: Spanish Question */}
                <div className="absolute inset-0 w-full h-full p-4 sm:p-5 flex items-center justify-between backface-hidden rotate-y-180 gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                    <h3 className="text-base sm:text-lg font-bold text-emerald-600 dark:text-emerald-400 italic">
                      {exercise.questionEs}
                    </h3>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      playFeedbackSound('flip');
                      setIsQuestionFlipped((prev) => !prev);
                    }}
                    className="p-1.5 px-2 rounded-xl text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:bg-white/80 dark:hover:bg-slate-700 transition-colors flex items-center gap-1 border border-emerald-200 dark:border-slate-700 shrink-0"
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                    <span>Inglés</span>
                  </button>
                </div>
              </div>
            </div>

            {/* 4 Radio Options List exactly as in screenshots */}
            <div className="space-y-3">
              {exercise.options.map((opt) => {
                const isSelected = selectedOptionId === opt.id;
                const isOptFlipped = flippedOptionIds.includes(opt.id);

                return (
                  <div
                    key={opt.id}
                    onClick={() => handleOptionSelect(opt.id)}
                    className={`w-full p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'border-sky-500 bg-sky-50/80 dark:bg-sky-950/40 shadow-xs ring-2 ring-sky-500/20'
                        : isDark
                        ? 'border-slate-800 hover:border-slate-700 hover:bg-slate-800/40 bg-slate-900/60'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/80 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3.5 min-w-0 flex-1">
                      {/* Radio Circle */}
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                          isSelected
                            ? 'border-sky-600 bg-sky-600 dark:border-sky-500 dark:bg-sky-500'
                            : isDark
                            ? 'border-slate-600'
                            : 'border-slate-300'
                        }`}
                      >
                        {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                      </div>

                      {/* Option Text with toggle flip to Spanish */}
                      <span className="text-sm sm:text-base font-medium text-slate-800 dark:text-slate-100">
                        {isOptFlipped ? (
                          <span className="italic text-emerald-600 dark:text-emerald-400 font-sans">
                            {opt.textEs}
                          </span>
                        ) : (
                          opt.text
                        )}
                      </span>
                    </div>

                    {/* Action buttons on option: Speaker & Translation */}
                    <div className="flex items-center gap-1.5 shrink-0" onClick={(e) => e.stopPropagation()}>
                      <button
                        type="button"
                        onClick={(e) => handleSpeakText(opt.text, e)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-sky-600 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
                        title="Escuchar opción"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => toggleOptionFlip(opt.id, e)}
                        className={`p-1 px-2 rounded-lg text-[11px] font-medium transition-colors border ${
                          isOptFlipped
                            ? 'border-emerald-300 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400'
                            : 'border-slate-200 dark:border-slate-700 text-slate-500 hover:text-sky-600 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                        title="Traducir opción"
                      >
                        <RotateCw className="w-3 h-3 inline mr-1" />
                        <span>{isOptFlipped ? 'En' : 'Es'}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Check Feedback & Explanation Box */}
            {hasChecked && (
              <div
                className={`p-4 sm:p-5 rounded-2xl border transition-all animate-in fade-in duration-200 flex flex-col gap-2 ${
                  isCorrect
                    ? 'bg-emerald-50/80 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800/60 text-emerald-950 dark:text-emerald-200'
                    : 'bg-rose-50/80 dark:bg-rose-950/30 border-rose-300 dark:border-rose-800/60 text-rose-950 dark:text-rose-200'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-sm sm:text-base">
                  {isCorrect ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span>¡Correcto! Excelente respuesta.</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" />
                      <span>Respuesta incorrecta. Revisa el diálogo de la izquierda.</span>
                    </>
                  )}
                </div>

                <div className="text-xs sm:text-sm leading-relaxed space-y-1 opacity-90 pl-7">
                  <p className="font-sans font-medium">{exercise.explanation}</p>
                  <p className="italic text-xs font-serif opacity-80">{exercise.explanationEs}</p>
                </div>
              </div>
            )}

            {/* Footer Buttons: Check, Reset & Next */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-inherit/20">
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reiniciar</span>
              </button>

              <div className="flex items-center gap-2">
                {!hasChecked ? (
                  <button
                    type="button"
                    id={`check-btn-act-${activityNumber}`}
                    onClick={handleCheck}
                    disabled={!selectedOptionId}
                    className={`px-6 py-2.5 rounded-xl font-bold text-sm shadow-md transition-all cursor-pointer flex items-center gap-2 ${
                      selectedOptionId
                        ? 'bg-sky-600 hover:bg-sky-500 text-white shadow-sky-600/30 hover:scale-[1.02] active:scale-95'
                        : 'bg-slate-300 dark:bg-slate-800 text-slate-500 cursor-not-allowed shadow-none'
                    }`}
                  >
                    <Check className="w-4 h-4" />
                    <span>Comprobar</span>
                  </button>
                ) : (
                  onNext && (
                    <button
                      type="button"
                      id={`next-btn-act-${activityNumber}`}
                      onClick={onNext}
                      className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md transition-all cursor-pointer flex items-center gap-2 hover:scale-[1.02] active:scale-95"
                    >
                      <span>Siguiente Actividad</span>
                      <CheckCircle2 className="w-4 h-4" />
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
