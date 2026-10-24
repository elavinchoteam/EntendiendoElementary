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
} from 'lucide-react';
import {
  PastSimpleIrregularExerciseItem,
  PAST_SIMPLE_IRREGULAR_REFERENCE,
  pastIrregularOfficeImg,
  DragDropOption,
} from '../../data/pastSimpleIrregularData';
import { speakEnglish, stopSpeaking, playFeedbackSound } from '../../utils/audio';
import { useTheme } from '../../context/ThemeContext';
import { SpeedSelector } from './SpeedSelector';
import { ReversibleTextCard } from './ReversibleTextCard';

interface DragDropClozeActivityProps {
  exercise: PastSimpleIrregularExerciseItem;
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

  // Selected / placed option
  const [placedOptionId, setPlacedOptionId] = useState<string | null>(null);
  const [isChecked, setIsChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  // Media player state
  const [isPlayingMedia, setIsPlayingMedia] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const duration = PAST_SIMPLE_IRREGULAR_REFERENCE.durationSeconds;
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Reset when exercise changes
  useEffect(() => {
    setPlacedOptionId(null);
    setIsChecked(false);
    setIsCorrect(false);
    setIsDragOver(false);
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
        PAST_SIMPLE_IRREGULAR_REFERENCE.audioText,
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

  const handleSelectOption = (opt: DragDropOption) => {
    if (isChecked && isCorrect) return;
    playFeedbackSound('click');
    setIsChecked(false);
    setPlacedOptionId(opt.id);
  };

  const handleRemovePlaced = () => {
    if (isChecked && isCorrect) return;
    playFeedbackSound('click');
    setPlacedOptionId(null);
    setIsChecked(false);
  };

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent, optId: string) => {
    if (isChecked && isCorrect) return;
    e.dataTransfer.setData('text/plain', optId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!isDragOver) setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (isChecked && isCorrect) return;
    const optId = e.dataTransfer.getData('text/plain');
    if (optId) {
      playFeedbackSound('click');
      setPlacedOptionId(optId);
      setIsChecked(false);
    }
  };

  const handleCheck = () => {
    if (!placedOptionId) return;
    const correct = placedOptionId === exercise.correctAnswerId;
    setIsChecked(true);
    setIsCorrect(correct);
    if (correct) {
      playFeedbackSound('correct');
    } else {
      playFeedbackSound('wrong');
    }
  };

  const handleReset = () => {
    playFeedbackSound('click');
    setPlacedOptionId(null);
    setIsChecked(false);
    setIsCorrect(false);
  };

  const placedOption = exercise.options?.find((o) => o.id === placedOptionId);

  // Text for speaker in reversible card:
  // If an option is placed, read the dialogue with that placed word;
  // otherwise, read the full dialogue with a slight pause/beep for the blank
  const dialogueAudioText = exercise.dialogueLines
    .map((l) => {
      if (l.hasBlank) {
        return `${l.prefix || ''} ${placedOption ? placedOption.text : 'something'} ${l.suffix || ''}`;
      }
      return l.textEn;
    })
    .join('. ');

  const dialogueSpanishText = exercise.dialogueLines.map((l) => l.textEs).join('\n');

  return (
    <div className="w-full flex flex-col gap-6 animate-in fade-in duration-300">
      {/* Title & Instructions Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            {exercise.title}: Drag the correct answer/s into place.
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            {exercise.instructionsEs}
          </p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="text-xs font-medium text-slate-400 dark:text-slate-500">
            Velocidad:
          </span>
          <SpeedSelector currentSpeed={speed} onSpeedChange={onSpeedChange} />
        </div>
      </div>

      {/* 2-COLUMN MAIN CONTAINER */}
      <div className="flex flex-col lg:flex-row items-stretch gap-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
        {/* LEFT COLUMN: Video Player & Reference Dialogue */}
        <div className="w-full lg:w-1/2 p-4 sm:p-6 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40">
          <div className="flex flex-col gap-4">
            {/* Video Container */}
            <div className="relative w-full rounded-xl overflow-hidden bg-slate-800 shadow-md border border-slate-700/80 flex flex-col">
              <div className="relative aspect-video w-full bg-[#00A896] overflow-hidden flex items-center justify-center">
                <img
                  src={pastIrregularOfficeImg}
                  alt="David at work"
                  className="w-full h-full object-cover"
                />

                {!isPlayingMedia && (
                  <button
                    type="button"
                    onClick={handleTogglePlayMedia}
                    className="absolute inset-0 flex items-center justify-center bg-black/25 hover:bg-black/35 transition-all cursor-pointer group"
                    aria-label="Reproducir video de referencia"
                  >
                    <div className="w-14 h-14 rounded-full bg-white/90 text-slate-900 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 fill-current ml-0.5 text-sky-600" />
                    </div>
                  </button>
                )}
              </div>

              {/* Video Controls Bar */}
              <div className="p-2.5 bg-slate-800 border-t border-slate-700 flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleTogglePlayMedia}
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label={isPlayingMedia ? 'Pausar' : 'Reproducir'}
                >
                  {isPlayingMedia ? (
                    <Pause className="w-4 h-4 fill-current text-sky-400" />
                  ) : (
                    <Play className="w-4 h-4 fill-current text-slate-200" />
                  )}
                </button>

                <div
                  onClick={handleTimelineClick}
                  className="relative flex-1 h-3 flex items-center cursor-pointer group py-1"
                >
                  <div className="w-full h-1.5 bg-slate-600 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-sky-500 rounded-full transition-all duration-150"
                      style={{
                        width: `${Math.min(100, (elapsedSeconds / duration) * 100)}%`,
                      }}
                    />
                  </div>
                </div>

                <div className="text-[11px] font-mono font-medium text-slate-300 shrink-0">
                  {formatTime(elapsedSeconds)} / {formatTime(duration)}
                </div>

                <button
                  type="button"
                  onClick={() => setIsMuted((prev) => !prev)}
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label={isMuted ? 'Activar sonido' : 'Silenciar'}
                >
                  {isMuted ? (
                    <VolumeX className="w-3.5 h-3.5 text-rose-400" />
                  ) : (
                    <Volume2 className="w-3.5 h-3.5 text-slate-300" />
                  )}
                </button>

                <SpeedSelector currentSpeed={speed} onSpeedChange={onSpeedChange} />
              </div>
            </div>

            {/* Reference Highlight Dialogue Box */}
            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-black/20 flex flex-col gap-1.5">
              <div className="text-sm leading-relaxed space-y-1">
                <p>
                  - Hey, Where{' '}
                  <span className="inline-block bg-sky-200 dark:bg-sky-500/30 text-sky-950 dark:text-sky-200 px-1 py-0.5 rounded font-bold border border-sky-300/40">
                    did
                  </span>{' '}
                  David{' '}
                  <span className="inline-block bg-amber-200 dark:bg-amber-500/30 text-amber-950 dark:text-amber-200 px-1 py-0.5 rounded font-bold border border-amber-300/40">
                    go
                  </span>
                  ?
                </p>
                <p>
                  - Oh, he{' '}
                  <span className="inline-block bg-sky-200 dark:bg-sky-500/30 text-sky-950 dark:text-sky-200 px-1 py-0.5 rounded font-bold border border-sky-300/40">
                    left
                  </span>{' '}
                  early because he{' '}
                  <span className="inline-block bg-sky-200 dark:bg-sky-500/30 text-sky-950 dark:text-sky-200 px-1 py-0.5 rounded font-bold border border-sky-300/40">
                    had
                  </span>{' '}
                  a headache and he{' '}
                  <span className="inline-block bg-sky-200 dark:bg-sky-500/30 text-sky-950 dark:text-sky-200 px-1 py-0.5 rounded font-bold border border-sky-300/40">
                    gave
                  </span>{' '}
                  me all his work!
                </p>
              </div>
            </div>
          </div>

          <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-3 flex items-center gap-1.5">
            <span>Modelo de referencia de conversación en video</span>
          </div>
        </div>

        {/* RIGHT COLUMN: Reversible Activity Card & Draggable/Clickable Options */}
        <div className="w-full lg:w-1/2 p-4 sm:p-6 flex flex-col justify-between gap-6">
          <div className="flex flex-col gap-5">
            {/* Optional Illustration if present */}
            {exercise.illustrationUrl && (
              <div className="w-full flex justify-center py-1">
                <img
                  src={exercise.illustrationUrl}
                  alt="Context illustration"
                  className="max-h-36 rounded-lg object-contain shadow-xs border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
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
                minHeightClass="min-h-[150px] sm:min-h-[170px]"
                childrenFront={
                  <div className="w-full flex flex-col gap-3 font-medium text-slate-800 dark:text-slate-100 text-sm sm:text-base leading-relaxed py-1">
                    {exercise.dialogueLines.map((line, idx) => {
                      if (line.hasBlank) {
                        return (
                          <div
                            key={idx}
                            className="flex flex-wrap items-center gap-x-2 gap-y-2.5"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {line.prefix && <span>{line.prefix}</span>}

                            {/* Drop Target Zone */}
                            <div
                              onDragOver={handleDragOver}
                              onDragLeave={handleDragLeave}
                              onDrop={handleDrop}
                              onClick={(e) => {
                                e.stopPropagation();
                                if (placedOption) handleRemovePlaced();
                              }}
                              className={`inline-flex items-center justify-center min-w-[130px] sm:min-w-[150px] h-10 px-4 rounded-xl border-2 transition-all select-none cursor-pointer ${
                                placedOption
                                  ? isChecked
                                    ? isCorrect
                                      ? 'bg-emerald-500/15 border-emerald-500 text-emerald-700 dark:text-emerald-300 font-bold'
                                      : 'bg-rose-500/15 border-rose-500 text-rose-700 dark:text-rose-300 font-bold animate-shake'
                                    : 'bg-sky-50 dark:bg-sky-950/40 border-sky-500 text-sky-900 dark:text-sky-200 font-semibold shadow-xs'
                                  : isDragOver
                                  ? 'bg-sky-100/50 dark:bg-sky-900/30 border-sky-400 border-dashed scale-105'
                                  : 'bg-slate-100/70 dark:bg-slate-800/60 border-slate-300 dark:border-slate-700 border-dashed hover:border-slate-400'
                              }`}
                              title={placedOption ? 'Haz clic para quitar' : 'Arrastra o haz clic en una palabra'}
                            >
                              {placedOption ? (
                                <span className="flex items-center gap-1.5 text-sm sm:text-base">
                                  {placedOption.text}
                                  {isChecked && (
                                    isCorrect ? (
                                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                    ) : (
                                      <XCircle className="w-4 h-4 text-rose-500" />
                                    )
                                  )}
                                </span>
                              ) : (
                                <span className="text-xs text-slate-400 font-mono">
                                  [ colocar respuesta ]
                                </span>
                              )}
                            </div>

                            {line.suffix && <span>{line.suffix}</span>}
                          </div>
                        );
                      }

                      return (
                        <p key={idx} className="text-slate-700 dark:text-slate-300">
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

            {/* Separator */}
            <div className="w-full border-t border-slate-200 dark:border-slate-800 my-0.5" />

            {/* Option Chips (Drag or Click) */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Opciones (haz clic o arrastra):
              </span>
              <div className="flex flex-wrap gap-2.5">
                {exercise.options?.map((opt) => {
                  const isPlaced = placedOptionId === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      draggable={!isPlaced}
                      onDragStart={(e) => handleDragStart(e, opt.id)}
                      onClick={() => handleSelectOption(opt)}
                      disabled={isPlaced}
                      className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all cursor-pointer select-none active:scale-95 ${
                        isPlaced
                          ? 'opacity-40 border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800/40 text-slate-400 cursor-not-allowed scale-95'
                          : isDark
                          ? 'bg-slate-800 hover:bg-slate-700 text-slate-100 border-slate-700 hover:border-sky-500 shadow-xs hover:shadow-md'
                          : 'bg-white hover:bg-sky-50 text-slate-800 border-slate-300 hover:border-sky-500 shadow-xs hover:shadow-md'
                      }`}
                    >
                      {opt.text}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Feedback / Explanation Box */}
            {isChecked && (
              <div
                className={`p-4 rounded-xl border animate-in fade-in zoom-in-95 duration-200 ${
                  isCorrect
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-950 dark:text-emerald-200'
                    : 'bg-rose-500/10 border-rose-500/30 text-rose-950 dark:text-rose-200'
                }`}
              >
                <div className="flex items-start gap-3">
                  {isCorrect ? (
                    <Sparkles className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1 flex flex-col gap-1 text-xs sm:text-sm">
                    <p className="font-bold">
                      {isCorrect ? '¡Excelente! Respuesta correcta.' : 'Respuesta incorrecta. Inténtalo de nuevo.'}
                    </p>
                    {exercise.explanationEs && (
                      <p className="opacity-90 leading-relaxed">{exercise.explanationEs}</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons: Comprobar & Reiniciar */}
          <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={handleReset}
              disabled={!placedOptionId}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                placedOptionId
                  ? isDark
                    ? 'border-slate-700 hover:bg-slate-800 text-slate-300'
                    : 'border-slate-300 hover:bg-slate-100 text-slate-700'
                  : 'opacity-40 cursor-not-allowed border-slate-200 dark:border-slate-800 text-slate-400'
              }`}
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reiniciar</span>
            </button>

            <button
              type="button"
              onClick={handleCheck}
              disabled={!placedOptionId}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer ${
                !placedOptionId
                  ? 'opacity-40 cursor-not-allowed bg-slate-300 text-slate-500 dark:bg-slate-800 dark:text-slate-600'
                  : isChecked && isCorrect
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/30'
                  : 'bg-sky-600 hover:bg-sky-700 text-white shadow-sky-600/30 hover:scale-[1.02] active:scale-98'
              }`}
            >
              <Check className="w-4 h-4" />
              <span>{isChecked && isCorrect ? '¡Correcto!' : 'Comprobar'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
