import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  RotateCcw,
  Check,
  CheckCircle2,
  XCircle,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import {
  PastSimpleQuestionsExerciseItem,
  PAST_SIMPLE_QUESTIONS_REFERENCE,
  pastQuestionsOfficeImg,
  DragDropOption,
} from '../../data/pastSimpleQuestionsData';
import { speakEnglish, stopSpeaking, playFeedbackSound } from '../../utils/audio';
import { useTheme } from '../../context/ThemeContext';
import { SpeedSelector } from './SpeedSelector';
import { ReversibleTextCard } from './ReversibleTextCard';

interface DragDropClozeActivityProps {
  exercise: PastSimpleQuestionsExerciseItem;
  speed: number;
  onSpeedChange: (speed: number) => void;
  accent?: 'US' | 'UK';
  onNextActivity?: () => void;
}

export const DragDropClozeActivity: React.FC<DragDropClozeActivityProps> = ({
  exercise,
  speed,
  onSpeedChange,
  accent = 'US',
  onNextActivity,
}) => {
  const { isDark } = useTheme();

  const slotCount = exercise.slotsCount || 1;
  const isMulti = slotCount > 1;

  // Array of placed option IDs per slot: [optId1, optId2, ...]
  const [placedSlots, setPlacedSlots] = useState<(string | null)[]>(() =>
    Array(slotCount).fill(null)
  );

  const [isChecked, setIsChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [dragOverSlotIdx, setDragOverSlotIdx] = useState<number | null>(null);

  // Media player state
  const [isPlayingMedia, setIsPlayingMedia] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const duration = PAST_SIMPLE_QUESTIONS_REFERENCE.durationSeconds;
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Reset when exercise changes
  useEffect(() => {
    setPlacedSlots(Array(exercise.slotsCount || 1).fill(null));
    setIsChecked(false);
    setIsCorrect(false);
    setDragOverSlotIdx(null);
    setIsPlayingMedia(false);
    setElapsedSeconds(0);
    if (timerRef.current) clearInterval(timerRef.current);
    stopSpeaking();
  }, [exercise.id]);

  const clearTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleTogglePlayMedia = () => {
    if (isPlayingMedia) {
      stopSpeaking();
      setIsPlayingMedia(false);
      clearTimer();
      return;
    }

    stopSpeaking();
    clearTimer();
    playFeedbackSound('click');
    setIsPlayingMedia(true);
    setElapsedSeconds(0);

    const stepMs = Math.round(1000 / speed);
    let currentSec = 0;
    timerRef.current = setInterval(() => {
      currentSec += 1;
      setElapsedSeconds(currentSec);
      if (currentSec >= duration) {
        clearTimer();
      }
    }, stepMs);

    if (!isMuted) {
      speakEnglish(
        PAST_SIMPLE_QUESTIONS_REFERENCE.audioText,
        speed,
        accent,
        () => setIsPlayingMedia(true),
        () => {
          setIsPlayingMedia(false);
          clearTimer();
          setElapsedSeconds(duration);
        }
      );
    } else {
      setTimeout(() => {
        setIsPlayingMedia(false);
        clearTimer();
      }, (duration * 1000) / speed);
    }
  };

  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const pct = Math.max(0, Math.min(1, clickX / rect.width));
    const newSec = Math.round(pct * duration);
    setElapsedSeconds(newSec);
  };

  // Drag and Drop handlers
  const handleDragStart = (e: React.DragEvent, optId: string) => {
    if (isChecked) return;
    e.dataTransfer.setData('text/plain', optId);
  };

  const handleDragOver = (e: React.DragEvent, slotIdx: number) => {
    e.preventDefault();
    if (isChecked) return;
    setDragOverSlotIdx(slotIdx);
  };

  const handleDragLeave = () => {
    setDragOverSlotIdx(null);
  };

  const handleDrop = (e: React.DragEvent, slotIdx: number) => {
    e.preventDefault();
    setDragOverSlotIdx(null);
    if (isChecked) return;
    const optId = e.dataTransfer.getData('text/plain');
    if (optId) {
      playFeedbackSound('click');
      setPlacedSlots((prev) => {
        const next = [...prev];
        // If this optId was in another slot, remove it
        for (let i = 0; i < next.length; i++) {
          if (next[i] === optId) next[i] = null;
        }
        next[slotIdx] = optId;
        return next;
      });
    }
  };

  // Click on an option chip
  const handleOptionClick = (optId: string) => {
    if (isChecked) return;
    playFeedbackSound('click');

    setPlacedSlots((prev) => {
      const next = [...prev];
      const existingIdx = next.indexOf(optId);

      if (existingIdx !== -1) {
        // Remove from slot
        next[existingIdx] = null;
        return next;
      }

      // Find first empty slot
      const firstEmptyIdx = next.findIndex((s) => s === null);
      if (firstEmptyIdx !== -1) {
        next[firstEmptyIdx] = optId;
      } else {
        // If all slots are full, replace the last one or slot 0
        next[next.length - 1] = optId;
      }
      return next;
    });
  };

  const handleRemoveSlot = (slotIdx: number) => {
    if (isChecked) return;
    playFeedbackSound('click');
    setPlacedSlots((prev) => {
      const next = [...prev];
      next[slotIdx] = null;
      return next;
    });
  };

  const handleReset = () => {
    playFeedbackSound('click');
    setPlacedSlots(Array(slotCount).fill(null));
    setIsChecked(false);
    setIsCorrect(false);
  };

  // Check answers
  const handleCheck = () => {
    // Must fill all slots
    if (placedSlots.some((s) => s === null)) return;

    let correct = false;
    if (isMulti && exercise.correctSlotOptionIds) {
      correct = placedSlots.every(
        (id, idx) => id === exercise.correctSlotOptionIds![idx]
      );
    } else if (exercise.correctAnswerId) {
      correct = placedSlots[0] === exercise.correctAnswerId;
    }

    setIsCorrect(correct);
    setIsChecked(true);

    if (correct) {
      playFeedbackSound('correct');
      // Speak the completed dialogue line
      const fullText = exercise.dialogueLines.map((l) => l.textEn).join(' ');
      speakEnglish(fullText, speed, accent);
    } else {
      playFeedbackSound('wrong');
    }
  };

  const allSlotsFilled = placedSlots.every((s) => s !== null);

  const dialogueSpanishText = exercise.dialogueLines.map((l) => l.textEs).join('\n');
  const dialogueAudioText = exercise.dialogueLines.map((l) => l.textEn).join(' ');

  // Get option by id helper
  const getOption = (optId: string | null): DragDropOption | undefined => {
    if (!optId) return undefined;
    return exercise.options?.find((o) => o.id === optId);
  };

  return (
    <div className="w-full flex flex-col gap-6 animate-in fade-in duration-200">
      {/* Exercise Instructions & Speed Bar */}
      <div
        className={`w-full p-4 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
          isDark
            ? 'bg-slate-900/60 border-slate-800 text-white'
            : 'bg-white border-slate-200 text-slate-800 shadow-xs'
        }`}
      >
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-xl bg-sky-600 text-white font-mono font-bold flex items-center justify-center text-sm shadow-xs">
            {exercise.number}
          </span>
          <div>
            <h3 className="text-base font-bold tracking-tight">
              {exercise.titleEs}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {exercise.instructionsEs}
            </p>
          </div>
        </div>

        <SpeedSelector speed={speed} onSpeedChange={onSpeedChange} />
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (5 cols): Video Player / Subtitles */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div
            className={`rounded-2xl border overflow-hidden shadow-md ${
              isDark ? 'bg-slate-900/90 border-slate-700' : 'bg-slate-900 border-slate-800'
            }`}
          >
            <div className="relative aspect-4/3 w-full bg-slate-950 flex items-center justify-center overflow-hidden">
              <img
                src={pastQuestionsOfficeImg}
                alt="Office dialogue scene"
                className="w-full h-full object-cover select-none"
              />

              {!isPlayingMedia && (
                <button
                  type="button"
                  onClick={handleTogglePlayMedia}
                  className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-sky-600/90 hover:bg-sky-500 text-white flex items-center justify-center shadow-2xl transition-transform hover:scale-110 cursor-pointer backdrop-blur-xs"
                  title="Reproducir audio de referencia"
                >
                  <Play className="w-7 h-7 ml-1 fill-white" />
                </button>
              )}
            </div>

            <div className="p-3 bg-slate-900 text-white flex flex-col gap-2 border-t border-slate-800">
              <div
                className="w-full h-2 bg-slate-800 rounded-full cursor-pointer relative overflow-hidden group"
                onClick={handleTimelineClick}
                title="Avanzar / retroceder"
              >
                <div
                  className="h-full bg-sky-500 rounded-full transition-all duration-200"
                  style={{ width: `${(elapsedSeconds / duration) * 100}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-xs font-mono text-slate-300">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleTogglePlayMedia}
                    className="p-1.5 rounded-lg hover:bg-slate-800 text-white transition-colors cursor-pointer"
                    title={isPlayingMedia ? 'Pausar' : 'Reproducir'}
                  >
                    {isPlayingMedia ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsMuted((prev) => !prev)}
                    className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
                    title={isMuted ? 'Activar sonido' : 'Silenciar'}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-sky-400 font-bold">{formatTime(elapsedSeconds)}</span>
                  <span className="opacity-40">/</span>
                  <span className="opacity-70">{formatTime(duration)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Reference Subtitle Card on Left */}
          <div
            className={`p-3.5 rounded-xl border text-xs leading-relaxed ${
              isDark
                ? 'bg-white/5 border-white/10 text-slate-300'
                : 'bg-white border-slate-200 text-slate-700 shadow-xs'
            }`}
          >
            <p className="font-bold text-[11px] font-mono uppercase tracking-wider text-sky-500 mb-2">
              Diálogo de Referencia:
            </p>
            <div className="flex flex-col gap-1 text-xs">
              <p>- Did you ask the boss about money?</p>
              <p>- Yes, I did.</p>
              <p>- Well, what did she say?</p>
              <p>- She said no.</p>
            </div>
          </div>
        </div>

        {/* Right Column (7 cols): The interactive Reversible Card with drop blanks & options */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold uppercase tracking-wider font-mono text-slate-500 dark:text-slate-400">
              Completa el diálogo (Voltea para traducir)
            </h4>
            <span className="text-xs text-slate-400 font-sans">
              {isMulti
                ? 'Coloca las 3 palabras en orden'
                : 'Arrastra o haz clic en una opción'}
            </span>
          </div>

          {/* Illustration if present (e.g., Actividad 9 concert illustration) */}
          {exercise.illustrationUrl && (
            <div className="w-full flex justify-center py-1">
              <img
                src={exercise.illustrationUrl}
                alt="Context illustration"
                className="max-h-36 rounded-xl object-contain shadow-xs border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-1"
              />
            </div>
          )}

          {/* THE ACTIVITY ITSELF IS THE REVERSIBLE CARD */}
          <div className="w-full">
            <ReversibleTextCard
              textEn={dialogueAudioText}
              textEs={dialogueSpanishText}
              speed={speed}
              accent={accent}
              minHeightClass="min-h-[160px] sm:min-h-[180px]"
              childrenFront={
                <div className="w-full flex flex-col gap-3 font-medium text-slate-800 dark:text-slate-100 text-sm sm:text-base leading-relaxed py-1">
                  {exercise.dialogueLines.map((line, lIdx) => {
                    if (line.hasBlank) {
                      return (
                        <div
                          key={lIdx}
                          className="flex flex-wrap items-center gap-x-2 gap-y-2.5"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {line.prefix && <span>{line.prefix}</span>}

                          {/* Render Slot(s) */}
                          {Array.from({ length: slotCount }).map((_, slotIdx) => {
                            const optId = placedSlots[slotIdx];
                            const opt = getOption(optId);
                            const isOver = dragOverSlotIdx === slotIdx;

                            // Slot separator e.g. comma for Actividad 10 ("Yes, I did.")
                            const separator = line.slotSeparators
                              ? line.slotSeparators[slotIdx] || ''
                              : '';

                            return (
                              <React.Fragment key={slotIdx}>
                                <div
                                  onDragOver={(e) => handleDragOver(e, slotIdx)}
                                  onDragLeave={handleDragLeave}
                                  onDrop={(e) => handleDrop(e, slotIdx)}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    if (opt) handleRemoveSlot(slotIdx);
                                  }}
                                  className={`inline-flex items-center justify-center min-w-[90px] sm:min-w-[120px] h-10 px-3.5 rounded-xl border-2 transition-all select-none cursor-pointer ${
                                    opt
                                      ? isChecked
                                        ? isCorrect
                                          ? 'bg-emerald-500/15 border-emerald-500 text-emerald-700 dark:text-emerald-300 font-bold'
                                          : 'bg-rose-500/15 border-rose-500 text-rose-700 dark:text-rose-300 font-bold animate-shake'
                                        : 'bg-sky-50 dark:bg-sky-950/40 border-sky-500 text-sky-900 dark:text-sky-200 font-semibold shadow-xs'
                                      : isOver
                                      ? 'bg-sky-100/50 dark:bg-sky-900/30 border-sky-400 border-dashed scale-105'
                                      : 'bg-slate-100/70 dark:bg-slate-800/60 border-slate-300 dark:border-slate-700 border-dashed hover:border-slate-400'
                                  }`}
                                  title={
                                    opt
                                      ? 'Haz clic para quitar'
                                      : 'Arrastra o haz clic en una palabra'
                                  }
                                >
                                  {opt ? (
                                    <span className="flex items-center gap-1.5 text-sm sm:text-base">
                                      {opt.text}
                                      {isChecked &&
                                        (isCorrect ? (
                                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                                        ) : (
                                          <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                                        ))}
                                    </span>
                                  ) : (
                                    <span className="text-xs text-slate-400 font-mono">
                                      {isMulti
                                        ? `[ espacio ${slotIdx + 1} ]`
                                        : '[ colocar respuesta ]'}
                                    </span>
                                  )}
                                </div>
                                {separator && <span>{separator}</span>}
                              </React.Fragment>
                            );
                          })}

                          {line.suffix && <span>{line.suffix}</span>}
                        </div>
                      );
                    }

                    return (
                      <p key={lIdx} className="text-slate-700 dark:text-slate-300">
                        {line.textEn}
                      </p>
                    );
                  })}
                </div>
              }
              childrenBack={
                <div className="w-full flex flex-col gap-2.5 py-1">
                  {exercise.dialogueLines.map((line, idx) => (
                    <p
                      key={idx}
                      className="text-sm sm:text-base leading-relaxed font-serif italic text-emerald-950 dark:text-emerald-300"
                    >
                      {line.textEs}
                    </p>
                  ))}
                </div>
              }
            />
          </div>

          {/* Option Chips Area */}
          <div
            className={`w-full p-4 rounded-2xl border flex flex-col gap-3 ${
              isDark
                ? 'bg-slate-900/70 border-slate-800'
                : 'bg-white border-slate-200 shadow-xs'
            }`}
          >
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span>Opciones disponibles:</span>
              <span>Haz clic o arrastra al espacio</span>
            </div>

            <div className="flex flex-wrap gap-2.5 sm:gap-3">
              {exercise.options?.map((opt) => {
                const isPlaced = placedSlots.includes(opt.id);

                return (
                  <button
                    key={opt.id}
                    type="button"
                    draggable={!isChecked && !isPlaced}
                    onDragStart={(e) => handleDragStart(e, opt.id)}
                    onClick={() => handleOptionClick(opt.id)}
                    disabled={isChecked}
                    className={`px-4 py-2 rounded-xl text-sm sm:text-base font-semibold border transition-all cursor-pointer select-none ${
                      isPlaced
                        ? 'opacity-40 border-dashed border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800/40 text-slate-400 cursor-not-allowed scale-95'
                        : isDark
                        ? 'bg-slate-800 hover:bg-slate-700 text-white border-slate-700 hover:border-sky-500 hover:shadow-xs active:scale-95'
                        : 'bg-slate-50 hover:bg-sky-50 text-slate-800 border-slate-200 hover:border-sky-300 hover:shadow-xs active:scale-95'
                    }`}
                  >
                    <span>{opt.text}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action Buttons: Check, Reset, Next */}
          <div className="flex items-center justify-between pt-1">
            <button
              type="button"
              onClick={handleReset}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-xs font-mono font-medium transition-colors cursor-pointer ${
                isDark
                  ? 'border-slate-700 text-slate-300 hover:bg-slate-800'
                  : 'border-slate-300 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reiniciar</span>
            </button>

            <div className="flex items-center gap-2">
              {!isChecked ? (
                <button
                  type="button"
                  onClick={handleCheck}
                  disabled={!allSlotsFilled}
                  className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm shadow-md transition-all cursor-pointer ${
                    allSlotsFilled
                      ? 'bg-sky-600 hover:bg-sky-500 text-white hover:shadow-lg hover:-translate-y-0.5'
                      : 'bg-slate-300 dark:bg-slate-800 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  <Check className="w-4 h-4" />
                  <span>Comprobar</span>
                </button>
              ) : isCorrect ? (
                onNextActivity && (
                  <button
                    type="button"
                    onClick={() => {
                      playFeedbackSound('click');
                      onNextActivity();
                    }}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md transition-all cursor-pointer hover:shadow-lg hover:-translate-y-0.5"
                  >
                    <span>Siguiente Actividad</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )
              ) : (
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
                >
                  <span>Intentar de nuevo</span>
                </button>
              )}
            </div>
          </div>

          {/* Feedback & Grammar Note after check */}
          {isChecked && (
            <div
              className={`p-4 rounded-xl border flex items-start gap-3 animate-in fade-in duration-200 ${
                isCorrect
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-700 text-emerald-900 dark:text-emerald-200'
                  : 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-700 text-rose-900 dark:text-rose-200'
              }`}
            >
              {isCorrect ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
              )}
              <div className="flex flex-col gap-1 text-xs sm:text-sm">
                <p className="font-bold">
                  {isCorrect ? '¡Excelente! Respuesta correcta.' : 'Respuesta incorrecta.'}
                </p>
                {exercise.explanationEs && (
                  <p className="opacity-90">{exercise.explanationEs}</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
