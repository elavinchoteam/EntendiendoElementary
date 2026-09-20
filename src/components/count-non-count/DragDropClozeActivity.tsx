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
  CountNonCountExerciseItem,
  COUNT_NON_COUNT_REFERENCE,
  kitchenCakeImg,
  DragDropOption,
} from '../../data/countNonCountData';
import { speakEnglish, stopSpeaking, playFeedbackSound } from '../../utils/audio';
import { useTheme } from '../../context/ThemeContext';
import { SpeedSelector } from './SpeedSelector';
import { ReversibleTextCard } from './ReversibleTextCard';

interface DragDropClozeActivityProps {
  exercise: CountNonCountExerciseItem;
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
  const duration = COUNT_NON_COUNT_REFERENCE.durationSeconds;
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
        COUNT_NON_COUNT_REFERENCE.audioText,
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

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (isChecked) return;
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (isChecked) return;
    const optId = e.dataTransfer.getData('text/plain');
    if (optId) {
      playFeedbackSound('click');
      setPlacedOptionId(optId);
    }
  };

  const handleOptionClick = (optId: string) => {
    if (isChecked) return;
    playFeedbackSound('click');
    if (placedOptionId === optId) {
      setPlacedOptionId(null);
    } else {
      setPlacedOptionId(optId);
    }
  };

  const handleCheck = () => {
    if (!placedOptionId) return;
    const correct = placedOptionId === exercise.correctAnswerId;
    setIsCorrect(correct);
    setIsChecked(true);
    if (correct) {
      playFeedbackSound('correct');
      // Speak the completed line
      const fullText = exercise.dialogueLines
        .map((l) => {
          if (l.hasBlank) {
            const opt = exercise.options?.find((o) => o.id === placedOptionId);
            return `${l.prefix || ''}${opt?.text || ''}${l.suffix || ''}`;
          }
          return l.textEn;
        })
        .join(' ');
      speakEnglish(fullText, speed, accent);
    } else {
      playFeedbackSound('wrong');
    }
  };

  const handleReset = () => {
    playFeedbackSound('click');
    setPlacedOptionId(null);
    setIsChecked(false);
    setIsCorrect(false);
    stopSpeaking();
  };

  const placedOption = exercise.options?.find((o) => o.id === placedOptionId);

  // Assemble full English and Spanish text for the dialogue card
  const fullTextEn = exercise.dialogueLines
    .map((l) => {
      if (l.hasBlank) {
        return `${l.prefix || ''}${placedOption ? placedOption.text : '________'}${l.suffix || ''}`;
      }
      return l.textEn;
    })
    .join('\n');

  const fullTextEs = exercise.dialogueLines.map((l) => l.textEs).join('\n');

  return (
    <div className="w-full flex flex-col gap-5">
      {/* 1. Reversible Instruction Card (No gradients, Speaker button only, No flip text) */}
      <ReversibleTextCard
        textEn={exercise.instructions}
        textEs={exercise.instructionsEs}
        speed={speed}
        accent={accent}
        className="shadow-sm"
      />

      {/* 2. Main 2-Column Container */}
      <div
        className={`w-full rounded-2xl border overflow-hidden shadow-lg flex flex-col lg:flex-row transition-colors ${
          isDark ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* LEFT COLUMN: Media Player & Reference Dialogue */}
        <div className="w-full lg:w-1/2 p-4 sm:p-5 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-slate-800">
          <div className="w-full rounded-xl overflow-hidden border border-slate-700/60 bg-[#1E293B] shadow-md relative flex flex-col">
            {/* Screen */}
            <div className="relative w-full aspect-[4/3] bg-[#1a2332] overflow-hidden flex items-center justify-center">
              <img
                src={kitchenCakeImg}
                alt="Mother and Susan in kitchen"
                className="w-full h-full object-cover object-center"
              />

              {!isPlayingMedia && (
                <button
                  type="button"
                  onClick={handleTogglePlayMedia}
                  className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-black/60 hover:bg-indigo-600 text-white flex items-center justify-center transition-transform hover:scale-110 active:scale-95 shadow-xl border border-white/20 cursor-pointer"
                  aria-label="Reproducir video"
                >
                  <Play className="w-6 h-6 fill-current translate-x-0.5" />
                </button>
              )}
            </div>

            {/* Video Controls Bar */}
            <div className="w-full px-3 py-2.5 bg-[#1F2937] border-t border-slate-700 flex items-center gap-3 select-none">
              <button
                type="button"
                onClick={handleTogglePlayMedia}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label={isPlayingMedia ? 'Pausar' : 'Reproducir'}
              >
                {isPlayingMedia ? (
                  <Pause className="w-4 h-4 fill-current text-indigo-400" />
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
                    className="h-full bg-indigo-500 rounded-full transition-all duration-150"
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

          {/* Reference Sentence Box below player with highlighted words */}
          <div className="mt-4 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-black/20 flex flex-col gap-2">
            <p className="text-sm sm:text-base leading-relaxed text-slate-800 dark:text-slate-200">
              - We can't make the cake, Susan. There is{' '}
              <span className="inline-block bg-sky-200 dark:bg-sky-500/30 text-sky-950 dark:text-sky-200 px-1.5 py-0.5 rounded font-bold border border-sky-300/40">
                some
              </span>{' '}
              sugar and flour but there aren't{' '}
              <span className="inline-block bg-sky-200 dark:bg-sky-500/30 text-sky-950 dark:text-sky-200 px-1.5 py-0.5 rounded font-bold border border-sky-300/40">
                any
              </span>{' '}
              eggs.
            </p>
            <p className="text-sm sm:text-base text-slate-800 dark:text-slate-200">- Aww...</p>
          </div>
        </div>

        {/* RIGHT COLUMN: Dialogue with Blank & Options */}
        <div className="w-full lg:w-1/2 p-4 sm:p-6 flex flex-col justify-between gap-5">
          {/* Reversible Dialogue Box */}
          <div className="flex flex-col gap-3">
            <ReversibleTextCard
              textEn={fullTextEn}
              textEs={fullTextEs}
              speed={speed}
              accent={accent}
              minHeightClass="min-h-[160px]"
              childrenFront={
                <div className="w-full flex flex-col gap-2.5 py-1">
                  {exercise.dialogueLines.map((line, idx) => {
                    if (line.hasBlank) {
                      return (
                        <div
                          key={idx}
                          className="flex flex-wrap items-center gap-1.5 text-sm sm:text-base leading-relaxed"
                        >
                          {line.prefix && <span>{line.prefix}</span>}

                          {/* Drop Target Box */}
                          <div
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            className={`inline-flex items-center justify-center min-w-[120px] h-8 sm:h-9 px-3 rounded-lg border-2 border-dashed transition-all ${
                              isDragOver
                                ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/40 scale-105'
                                : placedOption
                                ? isChecked
                                  ? isCorrect
                                    ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200 font-bold'
                                    : 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-200 font-bold'
                                  : 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/30 text-indigo-900 dark:text-indigo-200 font-bold'
                                : 'border-slate-300 dark:border-slate-600 bg-slate-100/60 dark:bg-slate-800/60'
                            }`}
                          >
                            {placedOption ? (
                              <span className="font-semibold">{placedOption.text}</span>
                            ) : (
                              <span className="text-xs text-slate-400 font-mono select-none">
                                [ Arrastra aquí ]
                              </span>
                            )}
                          </div>

                          {line.suffix && <span>{line.suffix}</span>}
                        </div>
                      );
                    }
                    return (
                      <p key={idx} className="text-sm sm:text-base leading-relaxed">
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
                      className="text-sm sm:text-base leading-relaxed font-serif italic text-emerald-900 dark:text-emerald-300"
                    >
                      {line.textEs}
                    </p>
                  ))}
                </div>
              }
            />
          </div>

          {/* Draggable Option Chips */}
          <div className="flex flex-col gap-2.5">
            <div className="flex flex-wrap items-center gap-2.5">
              {exercise.options?.map((opt: DragDropOption) => {
                const isSelected = placedOptionId === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    draggable={!isChecked}
                    onDragStart={(e) => handleDragStart(e, opt.id)}
                    onClick={() => handleOptionClick(opt.id)}
                    disabled={isChecked}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold border transition-all cursor-pointer select-none active:scale-95 ${
                      isSelected
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-md ring-2 ring-indigo-400'
                        : isDark
                        ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                        : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-300 shadow-xs'
                    }`}
                  >
                    {opt.text}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Feedback message when checked */}
          {isChecked && (
            <div
              className={`p-3.5 rounded-xl border flex items-start gap-2.5 text-xs sm:text-sm animate-in fade-in duration-200 ${
                isCorrect
                  ? isDark
                    ? 'bg-emerald-950/40 border-emerald-800 text-emerald-300'
                    : 'bg-emerald-50 border-emerald-200 text-emerald-900'
                  : isDark
                  ? 'bg-rose-950/40 border-rose-800 text-rose-300'
                  : 'bg-rose-50 border-rose-200 text-rose-900'
              }`}
            >
              {isCorrect ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
              )}
              <div className="flex flex-col gap-1">
                <p className="font-bold">{isCorrect ? '¡Correcto!' : 'Inténtalo de nuevo'}</p>
                <p className="opacity-90">{exercise.explanationEs}</p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <button
              type="button"
              onClick={handleReset}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors cursor-pointer ${
                isDark
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300 shadow-xs'
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
                  disabled={!placedOptionId}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md cursor-pointer ${
                    placedOptionId
                      ? 'bg-indigo-600 hover:bg-indigo-700 text-white active:scale-95'
                      : 'bg-slate-300 dark:bg-slate-800 text-slate-500 dark:text-slate-600 cursor-not-allowed shadow-none'
                  }`}
                >
                  <Check className="w-4 h-4" />
                  <span>Comprobar</span>
                </button>
              ) : (
                onNextActivity && (
                  <button
                    type="button"
                    onClick={onNextActivity}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold shadow-md transition-all active:scale-95 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Siguiente</span>
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
