import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Check,
  Volume2,
  CheckCircle2,
  XCircle,
  Gauge,
  ArrowRight,
} from 'lucide-react';
import {
  madMosImg,
  MadMosActivityItem,
  CheckboxOptionItem,
} from '../../data/madMosDepartmentStoreData';
import { MadMosReferenceCard } from './MadMosReferenceCard';
import { speakEnglish, stopSpeaking, playFeedbackSound } from '../../utils/audio';
import { useTheme } from '../../context/ThemeContext';

interface MadMosExerciseSlideProps {
  activity: MadMosActivityItem;
  accent?: 'US' | 'UK';
  speechRate?: number;
  onSuccess?: () => void;
  onNext?: () => void;
  hasNext?: boolean;
}

const PLAYBACK_SPEEDS = [
  { value: 0.5, label: '0.50x' },
  { value: 0.75, label: '0.75x' },
  { value: 1.0, label: '1x' },
  { value: 1.25, label: '1.25x' },
];

export const MadMosExerciseSlide: React.FC<MadMosExerciseSlideProps> = ({
  activity,
  accent = 'US',
  speechRate = 1.0,
  onSuccess,
  onNext,
  hasNext = true,
}) => {
  const { isDark } = useTheme();

  // Actividad 2 state: slotId -> selectedWord
  const [slotAnswers, setSlotAnswers] = useState<Record<string, string>>({});
  // Actividad 3 state: optionId -> boolean
  const [checkedOptions, setCheckedOptions] = useState<Record<string, boolean>>({});

  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  // Reversible cards states
  const [isInstructionFlipped, setIsInstructionFlipped] = useState<boolean>(false);
  const [isDialogueFlipped, setIsDialogueFlipped] = useState<boolean>(false);

  // Audio / Media Player state
  const [isPlayingMedia, setIsPlayingMedia] = useState<boolean>(false);
  const [playerSpeed, setPlayerSpeed] = useState<number>(speechRate);
  const [isSpeedMenuOpen, setIsSpeedMenuOpen] = useState<boolean>(false);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const totalDurationSeconds = 20;

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const speedMenuRef = useRef<HTMLDivElement>(null);

  // Collect all slots for cloze-dialogue
  const allSlots: { id: string; expectedWord: string }[] = [];
  if (activity.dialogueLines) {
    activity.dialogueLines.forEach((line) => {
      if (line.slot) allSlots.push(line.slot);
      if (line.slot2) allSlots.push(line.slot2);
    });
  }

  // Reset state on activity change
  useEffect(() => {
    setSlotAnswers({});
    setCheckedOptions({});
    setIsChecked(false);
    setIsCorrect(false);
    setIsInstructionFlipped(false);
    setIsDialogueFlipped(false);
    setIsPlayingMedia(false);
    setElapsedSeconds(0);
    stopSpeaking();
  }, [activity.id]);

  // Outside click for speed menu
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (speedMenuRef.current && !speedMenuRef.current.contains(e.target as Node)) {
        setIsSpeedMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Timer for media player simulation
  useEffect(() => {
    if (isPlayingMedia) {
      timerRef.current = setInterval(() => {
        setElapsedSeconds((prev) => {
          if (prev >= totalDurationSeconds) {
            setIsPlayingMedia(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000 / playerSpeed);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlayingMedia, playerSpeed]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleTogglePlayMedia = () => {
    if (isPlayingMedia) {
      stopSpeaking();
      setIsPlayingMedia(false);
      setElapsedSeconds(0);
      return;
    }
    stopSpeaking();
    playFeedbackSound('click');
    setIsPlayingMedia(true);
    setElapsedSeconds(0);
    speakEnglish(
      activity.audioPrompt,
      playerSpeed,
      accent,
      () => setIsPlayingMedia(true),
      () => {
        setIsPlayingMedia(false);
        setElapsedSeconds(0);
      }
    );
  };

  const handleListenDialogue = () => {
    playFeedbackSound('click');
    speakEnglish(activity.audioPrompt, playerSpeed, accent);
  };

  const handleListenInstructions = (e: React.MouseEvent) => {
    e.stopPropagation();
    playFeedbackSound('click');
    speakEnglish(activity.instructions, playerSpeed, accent);
  };

  // Place word in first empty slot or toggle
  const handleOptionClick = (word: string) => {
    if (isChecked) return;
    playFeedbackSound('click');

    const firstEmpty = allSlots.find((s) => !slotAnswers[s.id]);
    if (firstEmpty) {
      setSlotAnswers((prev) => ({ ...prev, [firstEmpty.id]: word }));
    }
  };

  // Remove word from slot
  const handleRemoveWord = (slotId: string) => {
    if (isChecked) return;
    playFeedbackSound('click');
    setSlotAnswers((prev) => {
      const next = { ...prev };
      delete next[slotId];
      return next;
    });
  };

  // Toggle checkbox for Actividad 3
  const handleToggleCheckbox = (optId: string) => {
    if (isChecked) return;
    playFeedbackSound('click');
    setCheckedOptions((prev) => ({
      ...prev,
      [optId]: !prev[optId],
    }));
  };

  // Check answers
  const handleCheck = () => {
    if (isChecked) return;

    if (activity.type === 'cloze-dialogue') {
      const allFilled = allSlots.every((s) => Boolean(slotAnswers[s.id]));
      if (!allFilled) {
        playFeedbackSound('wrong');
        return;
      }

      const allMatch = allSlots.every((s) => {
        const userWord = (slotAnswers[s.id] || '').trim().toLowerCase();
        const expected = s.expectedWord.trim().toLowerCase();
        return userWord === expected;
      });

      setIsChecked(true);
      setIsCorrect(allMatch);

      if (allMatch) {
        playFeedbackSound('correct');
        if (onSuccess) onSuccess();
      } else {
        playFeedbackSound('wrong');
      }
    } else if (activity.type === 'checkbox-multiselect') {
      const options = activity.checkboxOptions || [];
      const anySelected = options.some((o) => checkedOptions[o.id]);
      if (!anySelected) {
        playFeedbackSound('wrong');
        return;
      }

      const allCorrect = options.every((o) => {
        const isSelected = Boolean(checkedOptions[o.id]);
        return isSelected === o.isCorrect;
      });

      setIsChecked(true);
      setIsCorrect(allCorrect);

      if (allCorrect) {
        playFeedbackSound('correct');
        if (onSuccess) onSuccess();
      } else {
        playFeedbackSound('wrong');
      }
    }
  };

  // Reset / Reintentar actividad
  const handleResetActivity = () => {
    playFeedbackSound('click');
    setSlotAnswers({});
    setCheckedOptions({});
    setIsChecked(false);
    setIsCorrect(false);
    setIsInstructionFlipped(false);
    setIsDialogueFlipped(false);
    setIsPlayingMedia(false);
    setElapsedSeconds(0);
    stopSpeaking();
  };

  const placedWords = Object.values(slotAnswers);

  const renderSlot = (slot: { id: string; expectedWord: string }) => {
    const placedValue = slotAnswers[slot.id];
    const isSlotCorrect =
      isChecked &&
      (placedValue || '').trim().toLowerCase() === slot.expectedWord.trim().toLowerCase();

    return (
      <button
        type="button"
        id={`slot-${slot.id}`}
        onClick={() => placedValue && handleRemoveWord(slot.id)}
        disabled={isChecked}
        className={`min-w-[100px] sm:min-w-[120px] max-w-full min-h-[32px] sm:min-h-[36px] px-3 py-1 rounded-xl border-2 inline-flex items-center justify-center transition-all select-none align-middle ${
          isChecked
            ? isSlotCorrect
              ? 'border-emerald-500 bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-mono font-bold'
              : 'border-rose-500 bg-rose-500/15 text-rose-600 dark:text-rose-400 font-mono font-bold'
            : placedValue
            ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300 font-mono font-bold shadow-xs cursor-pointer hover:bg-rose-50 dark:hover:bg-rose-950/30'
            : isDark
            ? 'border-dashed border-slate-600 bg-slate-800/40 text-slate-400 hover:border-slate-500'
            : 'border-dashed border-slate-400 bg-slate-100/70 text-slate-400 hover:border-slate-500'
        }`}
        title={placedValue ? 'Haz clic para quitar' : 'Haz clic en una palabra de la lista para colocar'}
      >
        {placedValue ? (
          <span className="flex items-center gap-1.5 text-xs sm:text-sm">
            <span>{placedValue}</span>
            {!isChecked && <span className="text-xs opacity-60">×</span>}
          </span>
        ) : (
          <span className="text-xs italic opacity-40 font-mono">___________</span>
        )}
      </button>
    );
  };

  return (
    <div
      className={`w-full max-w-5xl mx-auto rounded-3xl border shadow-xl overflow-hidden transition-all duration-300 ${
        isDark ? 'bg-slate-900 border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'
      }`}
    >
      <div className="flex flex-col lg:flex-row items-stretch">
        {/* LEFT COLUMN: Image + Audio Player below image + Reference Card */}
        <div
          className={`w-full lg:w-[46%] p-5 sm:p-7 flex flex-col gap-5 border-b lg:border-b-0 lg:border-r ${
            isDark ? 'bg-slate-900/80 border-white/10' : 'bg-slate-50/80 border-slate-200'
          }`}
        >
          {/* Header Badge */}
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-sky-500/15 border border-sky-500/30 text-sky-600 dark:text-sky-400">
              Unit 6 · {activity.title}
            </span>
            <span className="text-xs font-mono opacity-60">Mad Mo's: Review</span>
          </div>

          {/* Illustration image */}
          <div className="w-full h-32 sm:h-36 rounded-2xl overflow-hidden border border-inherit/20 relative shadow-sm">
            <img
              src={madMosImg}
              alt="Mad Mo's Department Store"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-3">
              <span className="text-white text-xs font-medium drop-shadow-sm">
                Mad Mo's Department Store · Situación Real
              </span>
            </div>
          </div>

          {/* Media Player Card (Placed below the image) */}
          <div
            className={`p-3.5 sm:p-4 rounded-2xl border shadow-sm flex flex-col gap-2.5 transition-colors ${
              isDark ? 'bg-slate-800/90 border-white/10' : 'bg-white border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-semibold uppercase text-sky-600 dark:text-sky-400 flex items-center gap-1.5">
                <Volume2 className="w-4 h-4" />
                Audio Dialogue
              </span>
              <span className="text-xs font-mono opacity-60">
                {formatTime(elapsedSeconds)} / {formatTime(totalDurationSeconds)}
              </span>
            </div>

            {/* Timeline Bar */}
            <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
              <div
                className="bg-sky-500 h-full transition-all duration-300"
                style={{
                  width: `${(elapsedSeconds / totalDurationSeconds) * 100}%`,
                }}
              />
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between pt-1">
              <div className="relative" ref={speedMenuRef}>
                <button
                  type="button"
                  onClick={() => setIsSpeedMenuOpen((prev) => !prev)}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono font-medium border border-inherit/20 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                >
                  <Gauge className="w-3.5 h-3.5 text-sky-500" />
                  <span>{playerSpeed}x</span>
                </button>
                {isSpeedMenuOpen && (
                  <div
                    className={`absolute bottom-full left-0 mb-2 py-1.5 rounded-xl border shadow-xl z-30 min-w-[90px] ${
                      isDark ? 'bg-slate-800 border-white/10' : 'bg-white border-slate-200'
                    }`}
                  >
                    {PLAYBACK_SPEEDS.map((sp) => (
                      <button
                        key={sp.value}
                        type="button"
                        onClick={() => {
                          setPlayerSpeed(sp.value);
                          setIsSpeedMenuOpen(false);
                        }}
                        className={`w-full px-3 py-1 text-left text-xs font-mono transition-colors ${
                          playerSpeed === sp.value
                            ? 'bg-sky-500 text-white font-bold'
                            : 'hover:bg-sky-50 dark:hover:bg-slate-700'
                        }`}
                      >
                        {sp.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={handleTogglePlayMedia}
                className="w-10 h-10 rounded-full bg-sky-600 hover:bg-sky-500 text-white flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
                aria-label={isPlayingMedia ? 'Pausar audio' : 'Reproducir audio'}
              >
                {isPlayingMedia ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
              </button>
            </div>
          </div>

          {/* 3D Reversible Reference Card (Pinned flyer) */}
          <MadMosReferenceCard speed={playerSpeed} accent={accent} />
        </div>

        {/* RIGHT COLUMN: Instructions, Interactive Content, Options, Check & Reset */}
        <div className="w-full lg:w-[54%] p-6 sm:p-8 flex flex-col justify-between gap-6">
          <div className="flex flex-col gap-6">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-inherit/15">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                  {activity.title} · Mad Mo's Department Store
                </span>
                <h3 className="text-lg font-bold tracking-tight mt-0.5">
                  {activity.type === 'cloze-dialogue'
                    ? 'Completa la conversación arrastrando las palabras'
                    : 'Selecciona las oraciones correctas'}
                </h3>
              </div>
              <button
                type="button"
                onClick={handleListenDialogue}
                className="p-2 rounded-xl border border-inherit/20 hover:bg-sky-50 dark:hover:bg-slate-800 text-sky-600 dark:text-sky-400 transition-colors"
                title="Escuchar audio completo"
                aria-label="Escuchar audio completo"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            {/* Instructions box (Reversible flip to Spanish) */}
            <div
              role="button"
              tabIndex={0}
              onClick={() => {
                playFeedbackSound('flip');
                setIsInstructionFlipped((prev) => !prev);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setIsInstructionFlipped((prev) => !prev);
                }
              }}
              className={`p-3.5 rounded-2xl border text-xs sm:text-sm font-medium transition-all cursor-pointer flex items-center justify-between gap-3 ${
                isDark
                  ? 'bg-slate-800/60 border-white/10 hover:bg-slate-800'
                  : 'bg-slate-100/80 border-slate-200 hover:bg-slate-100'
              }`}
              title="Haz clic para traducir las instrucciones"
            >
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase bg-sky-500/20 text-sky-600 dark:text-sky-400">
                  {isInstructionFlipped ? 'ES' : 'EN'}
                </span>
                <span>
                  {isInstructionFlipped ? activity.instructionsEs : activity.instructions}
                </span>
              </div>
              <button
                type="button"
                onClick={handleListenInstructions}
                className="p-1.5 rounded-lg border border-inherit/20 hover:bg-white dark:hover:bg-slate-700 shrink-0"
                title="Escuchar instrucciones"
              >
                <Volume2 className="w-3.5 h-3.5 text-sky-500" />
              </button>
            </div>

            {/* 3D Reversible Activity Card */}
            <div className="w-full perspective-1000">
              <div
                role="button"
                tabIndex={0}
                onClick={(e) => {
                  const target = e.target as HTMLElement;
                  if (
                    target.closest('button[id^="slot-"]') ||
                    target.closest('input[type="checkbox"]') ||
                    target.closest('label')
                  ) {
                    return;
                  }
                  playFeedbackSound('flip');
                  setIsDialogueFlipped((prev) => !prev);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    const target = e.target as HTMLElement;
                    if (target.closest('input') || target.closest('button')) return;
                    e.preventDefault();
                    playFeedbackSound('flip');
                    setIsDialogueFlipped((prev) => !prev);
                  }
                }}
                className={`grid grid-cols-1 grid-rows-1 w-full rounded-2xl border transition-transform duration-500 transform-style-3d cursor-pointer select-none shadow-sm ${
                  isDark
                    ? 'bg-slate-800/50 border-white/10 text-white'
                    : 'bg-slate-50/90 border-slate-200 text-slate-900'
                } ${isDialogueFlipped ? 'rotate-y-180' : ''}`}
                title="Haz clic para voltear y ver la traducción al castellano"
              >
                {/* ANVERSO / FRONT: English Dialogue or Checkbox options */}
                <div
                  className={`col-start-1 row-start-1 w-full rounded-2xl p-5 sm:p-6 flex flex-col justify-between backface-hidden ${
                    isDialogueFlipped ? 'invisible pointer-events-none' : ''
                  }`}
                >
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-inherit/20">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                      {activity.type === 'cloze-dialogue'
                        ? 'Diálogo · English'
                        : 'Pregunta · English'}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        playFeedbackSound('flip');
                        setIsDialogueFlipped((prev) => !prev);
                      }}
                      className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-sky-500/15 border border-sky-500/30 text-sky-600 dark:text-sky-400 hover:bg-sky-500/25 flex items-center gap-1.5 transition-all cursor-pointer"
                      title="Ver traducción al castellano"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Castellano</span>
                    </button>
                  </div>

                  {/* Actividad 2: Dialogue with missing words */}
                  {activity.type === 'cloze-dialogue' && activity.dialogueLines && (
                    <div className="space-y-3 text-sm sm:text-base leading-relaxed font-medium my-auto max-h-[300px] overflow-y-auto pr-1">
                      {activity.dialogueLines.map((line, idx) => (
                        <div key={idx} className="flex flex-wrap items-baseline gap-x-2 gap-y-2">
                          {line.prefix && <span>{line.prefix}</span>}
                          {line.slot && renderSlot(line.slot)}
                          {line.middleText && <span>{line.middleText}</span>}
                          {line.slot2 && renderSlot(line.slot2)}
                          {line.suffix && <span>{line.suffix}</span>}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Actividad 3: Checkbox multi-select list */}
                  {activity.type === 'checkbox-multiselect' && activity.checkboxOptions && (
                    <div className="space-y-2.5 my-auto max-h-[300px] overflow-y-auto pr-1">
                      {activity.checkboxOptions.map((opt) => {
                        const isCheckedOpt = Boolean(checkedOptions[opt.id]);
                        const isOptCorrect = opt.isCorrect;
                        return (
                          <label
                            key={opt.id}
                            onClick={(e) => e.stopPropagation()}
                            className={`flex items-start gap-3 p-3 rounded-xl border text-xs sm:text-sm cursor-pointer transition-all ${
                              isChecked
                                ? isCheckedOpt === isOptCorrect
                                  ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-800 dark:text-emerald-200'
                                  : 'border-rose-500/50 bg-rose-500/10 text-rose-800 dark:text-rose-200'
                                : isCheckedOpt
                                ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/40 text-sky-800 dark:text-sky-200 font-semibold'
                                : isDark
                                ? 'border-white/10 hover:bg-slate-800/80'
                                : 'border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={isCheckedOpt}
                              onChange={() => handleToggleCheckbox(opt.id)}
                              disabled={isChecked}
                              className="mt-0.5 w-4 h-4 rounded text-sky-600 focus:ring-sky-500 cursor-pointer"
                            />
                            <span className="leading-snug">{opt.textEn}</span>
                          </label>
                        );
                      })}
                    </div>
                  )}

                  <div className="pt-2 mt-3 border-t border-inherit/15 flex items-center justify-between text-[10px] font-mono opacity-60">
                    <span>
                      {activity.type === 'cloze-dialogue'
                        ? 'Completa los espacios en blanco'
                        : 'Marca las oraciones correctas'}
                    </span>
                    <span>Clic tarjeta para traducir ↻</span>
                  </div>
                </div>

                {/* REVERSO / BACK: Full Spanish Translation */}
                <div
                  className={`col-start-1 row-start-1 w-full rounded-2xl p-5 sm:p-6 flex flex-col justify-between backface-hidden rotate-y-180 ${
                    isDark
                      ? 'bg-slate-800 text-emerald-200'
                      : 'bg-emerald-50/95 text-emerald-950 border border-emerald-300'
                  } ${!isDialogueFlipped ? 'invisible pointer-events-none' : ''}`}
                >
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-inherit/20">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                      Traducción al Castellano
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        playFeedbackSound('flip');
                        setIsDialogueFlipped((prev) => !prev);
                      }}
                      className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/25 flex items-center gap-1.5 transition-all cursor-pointer"
                      title="Volver al ejercicio en inglés"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Inglés</span>
                    </button>
                  </div>

                  {/* Spanish dialogue or checkbox translation */}
                  <div className="space-y-2.5 font-serif italic text-sm sm:text-base leading-relaxed text-slate-800 dark:text-emerald-100 my-auto py-1 max-h-[300px] overflow-y-auto pr-1">
                    {activity.type === 'cloze-dialogue' &&
                      activity.dialogueLines?.map((line, idx) => (
                        <p key={idx} className="flex items-baseline gap-2">
                          <span className="font-sans not-italic text-emerald-600 dark:text-emerald-400 font-bold select-none">
                            •
                          </span>
                          <span>{line.fullEs}</span>
                        </p>
                      ))}

                    {activity.type === 'checkbox-multiselect' &&
                      activity.checkboxOptions?.map((opt, idx) => (
                        <p key={idx} className="flex items-baseline gap-2">
                          <span className="font-sans not-italic text-emerald-600 dark:text-emerald-400 font-bold select-none">
                            {opt.isCorrect ? '✓' : '•'}
                          </span>
                          <span>
                            <strong>{opt.textEs}</strong>
                            {opt.isCorrect ? ' (Válida)' : ' (No válida)'}
                          </span>
                        </p>
                      ))}
                  </div>

                  <div className="pt-2 mt-3 border-t border-inherit/15 flex items-center justify-between text-[10px] font-mono opacity-60">
                    <span>Traducción contextual</span>
                    <span>Castellano</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Word bank / options pool for Actividad 2 */}
            {activity.type === 'cloze-dialogue' &&
              activity.optionsPool &&
              activity.optionsPool.length > 0 && (
                <div className="flex flex-col gap-2 pt-1">
                  <span className="text-xs font-mono uppercase font-bold opacity-60">
                    Palabras disponibles (haz clic para colocar):
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {activity.optionsPool.map((opt, optIdx) => {
                      const timesUsed = placedWords.filter((w) => w === opt).length;
                      const maxAllowed = activity.optionsPool!.filter((w) => w === opt).length;
                      const isExhausted = timesUsed >= maxAllowed;

                      return (
                        <button
                          key={`${opt}-${optIdx}`}
                          type="button"
                          onClick={() => !isExhausted && handleOptionClick(opt)}
                          disabled={isChecked || isExhausted}
                          className={`px-3 py-1.5 rounded-xl font-mono text-xs sm:text-sm font-semibold border-2 transition-all select-none shadow-xs ${
                            isExhausted
                              ? 'opacity-30 line-through cursor-not-allowed border-dashed border-inherit'
                              : isDark
                              ? 'bg-slate-800 hover:bg-slate-700 text-white border-white/20 hover:border-sky-400 active:scale-95 cursor-pointer'
                              : 'bg-white hover:bg-sky-50 text-slate-800 border-slate-300 hover:border-sky-500 active:scale-95 cursor-pointer'
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

            {/* Results / Feedback Explanation Card */}
            {isChecked && (
              <div
                className={`p-4 rounded-2xl border transition-all animate-in fade-in duration-300 ${
                  isCorrect
                    ? isDark
                      ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                      : 'bg-emerald-50 border-emerald-300 text-emerald-900'
                    : isDark
                    ? 'bg-rose-950/40 border-rose-500/40 text-rose-300'
                    : 'bg-rose-50 border-rose-300 text-rose-900'
                }`}
              >
                <div className="flex items-start gap-3">
                  {isCorrect ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                  )}
                  <div className="space-y-1 text-xs sm:text-sm">
                    <p className="font-bold">
                      {isCorrect ? '¡Excelente! Respuesta correcta.' : 'Respuesta incorrecta. Revisa la explicación:'}
                    </p>
                    <p className="opacity-90">{activity.explanationEs}</p>
                    <p className="text-[11px] font-mono opacity-70 border-t border-inherit/20 pt-1 mt-1">
                      {activity.explanationEn}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons: Reintentar Actividad, Comprobar, and Siguiente Actividad */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-inherit/15">
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={handleResetActivity}
                className="px-4 py-2.5 rounded-xl border border-inherit/20 text-xs sm:text-sm font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer flex items-center gap-1.5 active:scale-95"
                title="Reiniciar esta actividad"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reintentar Actividad</span>
              </button>

              <button
                type="button"
                onClick={handleCheck}
                disabled={
                  isChecked ||
                  (activity.type === 'cloze-dialogue'
                    ? allSlots.some((s) => !slotAnswers[s.id])
                    : !activity.checkboxOptions?.some((o) => checkedOptions[o.id]))
                }
                className="px-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 disabled:bg-slate-300 dark:disabled:bg-slate-800 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-sky-500/25 disabled:cursor-not-allowed transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>Comprobar</span>
              </button>
            </div>

            {onNext && hasNext && (
              <button
                type="button"
                onClick={() => {
                  playFeedbackSound('click');
                  onNext();
                }}
                className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-1.5 ${
                  isCorrect
                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md'
                    : 'border border-inherit/20 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span>Siguiente Actividad</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
