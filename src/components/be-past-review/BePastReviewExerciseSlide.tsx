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
  Sparkles,
} from 'lucide-react';
import { BePastActivityItem } from '../../data/bePastReviewData';
import { BePastReferenceCard } from './BePastReferenceCard';
import { speakEnglish, stopSpeaking, playFeedbackSound } from '../../utils/audio';
import { useTheme } from '../../context/ThemeContext';
import { policeAlibiImg } from '../../data/bePastReviewData';

interface BePastReviewExerciseSlideProps {
  activity: BePastActivityItem;
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

export const BePastReviewExerciseSlide: React.FC<BePastReviewExerciseSlideProps> = ({
  activity,
  accent = 'US',
  speechRate = 1.0,
  onSuccess,
  onNext,
  hasNext = true,
}) => {
  const { isDark } = useTheme();

  // Slot answers: slotId -> selectedWord
  const [slotAnswers, setSlotAnswers] = useState<Record<string, string>>({});
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
  const totalDurationSeconds = 8;

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const speedMenuRef = useRef<HTMLDivElement>(null);

  // Collect all slot items in the activity
  const allSlots: { id: string; expectedWord: string; dropdownOptions?: string[] }[] = [];
  activity.dialogueLines.forEach((line) => {
    if (line.slot) allSlots.push(line.slot);
    if (line.slot2) allSlots.push(line.slot2);
    if (line.slot3) allSlots.push(line.slot3);
  });

  // Reset state whenever activity changes
  useEffect(() => {
    setSlotAnswers({});
    setIsChecked(false);
    setIsCorrect(false);
    setIsInstructionFlipped(false);
    setIsDialogueFlipped(false);
    setIsPlayingMedia(false);
    setElapsedSeconds(0);
    stopSpeaking();
  }, [activity.id]);

  // Handle outside click for speed menu
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
  }, [isPlayingMedia, playerSpeed, totalDurationSeconds]);

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

  const handleListenInstructions = (e: React.MouseEvent) => {
    e.stopPropagation();
    playFeedbackSound('click');
    speakEnglish(activity.instructions, playerSpeed, accent);
  };

  const handleListenDialogue = (e: React.MouseEvent) => {
    e.stopPropagation();
    playFeedbackSound('click');
    speakEnglish(activity.audioPrompt, playerSpeed, accent);
  };

  // Place word into a slot
  const handlePlaceWord = (slotId: string, word: string) => {
    if (isChecked) return;
    playFeedbackSound('click');
    setSlotAnswers((prev) => ({
      ...prev,
      [slotId]: word,
    }));
  };

  // Remove word from slot
  const handleRemoveWord = (slotId: string) => {
    if (isChecked) return;
    playFeedbackSound('click');
    setSlotAnswers((prev) => {
      const copy = { ...prev };
      delete copy[slotId];
      return copy;
    });
  };

  // Quick click on an available option pill: places into the first unoccupied slot
  const handleOptionClick = (optionWord: string) => {
    if (isChecked) return;
    const firstEmptySlot = allSlots.find((s) => !slotAnswers[s.id]);
    if (firstEmptySlot) {
      handlePlaceWord(firstEmptySlot.id, optionWord);
    }
  };

  // Check answers
  const handleCheck = () => {
    if (isChecked) return;
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
  };

  // Reset answers
  const handleReset = () => {
    playFeedbackSound('click');
    setSlotAnswers({});
    setIsChecked(false);
    setIsCorrect(false);
  };

  // Count placed occurrences of each option in drag-drop mode
  const placedWordsCount = Object.values(slotAnswers);

  const displayImage = activity.illustrationImg || policeAlibiImg;

  return (
    <div
      className={`w-full max-w-5xl mx-auto rounded-3xl border shadow-xl overflow-hidden transition-all duration-300 ${
        isDark ? 'bg-slate-900 border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'
      }`}
    >
      <div className="flex flex-col lg:flex-row items-stretch">
        {/* LEFT COLUMN: Media Player + Reference Card + Image */}
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
            <span className="text-xs font-mono opacity-60">Be-Past: Review</span>
          </div>

          {/* Illustration image */}
          <div className="w-full h-40 sm:h-44 rounded-2xl overflow-hidden border border-inherit/20 relative shadow-sm">
            <img
              src={displayImage}
              alt="Dialogue Scene"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-3">
              <span className="text-white text-xs font-medium drop-shadow-sm">
                Real Situation · Be-Past Context
              </span>
            </div>
          </div>

          {/* Media Player Card (Placed below the image) */}
          <div
            className={`p-4 rounded-2xl border shadow-sm flex flex-col gap-3 transition-colors ${
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

              {/* Play / Pause button */}
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

          {/* 3D Reversible Reference Card */}
          <BePastReferenceCard speed={playerSpeed} accent={accent} />
        </div>

        {/* RIGHT COLUMN: Instructions, Dialogue with interactive slots, Options, Check */}
        <div className="w-full lg:w-[54%] p-6 sm:p-8 flex flex-col justify-between gap-6">
          <div className="flex flex-col gap-6">
            {/* Header: Complete the Dialogue + Speaker */}
            <div className="flex items-center justify-between pb-3 border-b border-inherit/15">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                  {activity.title} · Complete the Dialogue
                </span>
                <h3 className="text-lg font-bold tracking-tight mt-0.5">
                  {activity.type === 'dropdown'
                    ? 'Selecciona la opción correcta'
                    : 'Arrastra las palabras correctas'}
                </h3>
              </div>
              <button
                type="button"
                onClick={handleListenDialogue}
                className="p-2 rounded-xl border border-inherit/20 hover:bg-sky-50 dark:hover:bg-slate-800 text-sky-600 dark:text-sky-400 transition-colors"
                title="Escuchar diálogo completo"
                aria-label="Escuchar diálogo completo"
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

            {/* 3D Reversible Dialogue Card */}
            <div className="w-full perspective-1000 min-h-[170px]">
              <div
                role="button"
                tabIndex={0}
                onClick={(e) => {
                  const target = e.target as HTMLElement;
                  if (
                    target.closest('button[id^="slot-"]') ||
                    target.closest('select') ||
                    target.closest('option')
                  ) {
                    return;
                  }
                  playFeedbackSound('flip');
                  setIsDialogueFlipped((prev) => !prev);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    const target = e.target as HTMLElement;
                    if (target.closest('select') || target.closest('button')) return;
                    e.preventDefault();
                    playFeedbackSound('flip');
                    setIsDialogueFlipped((prev) => !prev);
                  }
                }}
                className={`relative w-full min-h-[170px] rounded-2xl border transition-transform duration-500 transform-style-3d cursor-pointer select-none shadow-sm ${
                  isDark
                    ? 'bg-slate-800/50 border-white/10 text-white'
                    : 'bg-slate-50/90 border-slate-200 text-slate-900'
                } ${isDialogueFlipped ? 'rotate-y-180' : ''}`}
                title="Haz clic para voltear y ver la traducción al castellano"
              >
                {/* ANVERSO / FRONT: Diálogo interactivo en inglés */}
                <div
                  className={`w-full h-full rounded-2xl p-5 sm:p-6 flex flex-col justify-between backface-hidden transition-opacity ${
                    isDialogueFlipped ? 'invisible pointer-events-none' : ''
                  }`}
                >
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-inherit/20">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                      Diálogo · English
                    </span>
                    <span className="text-[10px] font-mono opacity-60 flex items-center gap-1 hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
                      Clic para traducir al castellano ↻
                    </span>
                  </div>

                  <div className="space-y-4 text-base sm:text-lg leading-relaxed font-medium my-auto">
              {activity.dialogueLines.map((line, idx) => (
                <div
                  key={idx}
                  className="flex flex-wrap items-baseline gap-x-2 gap-y-2 font-medium"
                >
                  {line.prefix && <span>{line.prefix}</span>}

                  {/* Slot 1 */}
                  {line.slot && renderSlot(line.slot)}

                  {line.middleText && <span>{line.middleText}</span>}

                  {/* Slot 2 */}
                  {line.slot2 && renderSlot(line.slot2)}

                  {line.middleText2 && <span>{line.middleText2}</span>}

                  {/* Slot 3 */}
                  {line.slot3 && renderSlot(line.slot3)}

                  {line.suffix && <span>{line.suffix}</span>}

                  {!line.slot && !line.prefix && line.fullEn && <span>{line.fullEn}</span>}
                </div>
              ))}
                  </div>

                  <div className="pt-2 mt-3 border-t border-inherit/15 flex items-center justify-between text-[10px] font-mono opacity-60">
                    <span>Completa los espacios en inglés</span>
                    <span>Clic tarjeta para traducir ↻</span>
                  </div>
                </div>

                {/* REVERSO / BACK: Traducción al castellano */}
                <div
                  className={`absolute inset-0 w-full h-full rounded-2xl p-5 sm:p-6 flex flex-col justify-between backface-hidden rotate-y-180 transition-opacity ${
                    isDark ? 'bg-slate-800 text-emerald-200' : 'bg-emerald-50/90 text-emerald-950 border border-emerald-200'
                  } ${!isDialogueFlipped ? 'invisible pointer-events-none' : ''}`}
                >
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-inherit/20">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                      Traducción al Castellano
                    </span>
                    <span className="text-[10px] font-mono opacity-60 flex items-center gap-1 hover:text-emerald-500 transition-colors">
                      Clic para volver al ejercicio ↻
                    </span>
                  </div>

                  <div className="space-y-3 font-serif italic text-base sm:text-lg leading-relaxed text-slate-800 dark:text-emerald-100 my-auto py-1">
                    {activity.dialogueLines.map((line, idx) => (
                      <p key={idx} className="flex items-baseline gap-2">
                        <span>{line.fullEs || line.prefixEs || line.fullEn}</span>
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

            {/* Drag-Drop Options Pool (when type === 'drag-drop') */}
            {activity.type === 'drag-drop' && activity.optionsPool && activity.optionsPool.length > 0 && (
              <div className="flex flex-col gap-2 pt-2">
                <span className="text-xs font-mono uppercase font-bold opacity-60">
                  Opciones disponibles (haz clic para colocar):
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {activity.optionsPool.map((opt, optIdx) => {
                    const timesUsed = placedWordsCount.filter((w) => w === opt).length;
                    const maxAllowed = activity.optionsPool.filter((w) => w === opt).length;
                    const isExhausted = timesUsed >= maxAllowed;

                    return (
                      <button
                        key={`${opt}-${optIdx}`}
                        type="button"
                        onClick={() => !isExhausted && handleOptionClick(opt)}
                        disabled={isChecked || isExhausted}
                        className={`px-3.5 py-2 rounded-xl font-mono text-sm sm:text-base font-semibold border-2 transition-all select-none shadow-xs ${
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
          </div>

          {/* Bottom Area: Check / Reset + Explanation + Next Button */}
          <div className="flex flex-col gap-4 pt-4 border-t border-inherit/15">
            {/* Feedback & Explanation Card */}
            {isChecked && (
              <div
                className={`p-4 rounded-2xl border text-sm animate-in fade-in slide-in-from-top-2 duration-300 ${
                  isCorrect
                    ? isDark
                      ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300'
                      : 'bg-emerald-50 border-emerald-300 text-emerald-900'
                    : isDark
                    ? 'bg-rose-950/40 border-rose-500/30 text-rose-300'
                    : 'bg-rose-50 border-rose-300 text-rose-900'
                }`}
              >
                <div className="flex items-center gap-2 mb-1.5 font-bold">
                  {isCorrect ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                      <span>¡Excelente! Respuesta correcta</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                      <span>Inténtalo nuevamente</span>
                    </>
                  )}
                </div>
                <p className="text-xs sm:text-sm opacity-90 leading-relaxed font-sans">
                  {activity.explanationEs || activity.explanationEn}
                </p>
              </div>
            )}

            {/* Buttons row */}
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCheck}
                  disabled={isChecked || allSlots.some((s) => !slotAnswers[s.id])}
                  className={`px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all shadow-md ${
                    isChecked || allSlots.some((s) => !slotAnswers[s.id])
                      ? 'opacity-40 cursor-not-allowed bg-slate-300 dark:bg-slate-700 text-slate-500'
                      : 'bg-sky-600 hover:bg-sky-500 text-white cursor-pointer active:scale-95'
                  }`}
                >
                  <Check className="w-4 h-4" />
                  <span>Comprobar</span>
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  disabled={Object.keys(slotAnswers).length === 0}
                  className="px-4 py-2.5 rounded-xl border border-inherit/20 font-medium text-sm flex items-center gap-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reiniciar</span>
                </button>
              </div>

              {isChecked && isCorrect && onNext && hasNext && (
                <button
                  type="button"
                  onClick={onNext}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center gap-2 shadow-md cursor-pointer active:scale-95 transition-all"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Siguiente Actividad</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  function renderSlot(slot: { id: string; expectedWord: string; dropdownOptions?: string[] }) {
    const placedValue = slotAnswers[slot.id];
    const isSlotCorrect =
      isChecked && (placedValue || '').trim().toLowerCase() === slot.expectedWord.trim().toLowerCase();
    const isSlotWrong = isChecked && !isSlotCorrect;

    if (slot.dropdownOptions && slot.dropdownOptions.length > 0) {
      return (
        <select
          id={`slot-${slot.id}`}
          value={placedValue || ''}
          onChange={(e) => handlePlaceWord(slot.id, e.target.value)}
          disabled={isChecked}
          className={`px-3 py-1.5 rounded-xl border-2 font-mono text-sm sm:text-base font-semibold transition-all outline-none cursor-pointer ${
            isChecked
              ? isSlotCorrect
                ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                : 'border-rose-500 bg-rose-500/10 text-rose-600 dark:text-rose-400'
              : placedValue
              ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300'
              : isDark
              ? 'border-slate-600 bg-slate-800 text-slate-200 hover:border-slate-500'
              : 'border-slate-300 bg-white text-slate-800 hover:border-slate-400'
          }`}
        >
          <option value="" disabled>
            -- select --
          </option>
          {slot.dropdownOptions.map((opt) => (
            <option key={opt} value={opt} className="text-slate-900 bg-white dark:bg-slate-800 dark:text-white">
              {opt}
            </option>
          ))}
        </select>
      );
    }

    // Drag-Drop style interactive slot
    return (
      <button
        type="button"
        id={`slot-${slot.id}`}
        onClick={() => placedValue && handleRemoveWord(slot.id)}
        disabled={isChecked}
        className={`min-w-[100px] sm:min-w-[120px] h-10 px-3 rounded-xl border-2 inline-flex items-center justify-center transition-all select-none ${
          isChecked
            ? isSlotCorrect
              ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono font-bold'
              : 'border-rose-500 bg-rose-500/10 text-rose-600 dark:text-rose-400 font-mono font-bold'
            : placedValue
            ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300 font-mono font-bold shadow-xs cursor-pointer hover:bg-rose-50 dark:hover:bg-rose-950/30'
            : isDark
            ? 'border-dashed border-slate-600 bg-slate-800/40 text-slate-400'
            : 'border-dashed border-slate-400 bg-slate-100/70 text-slate-400'
        }`}
        title={placedValue ? 'Haz clic para quitar' : 'Haz clic en una opción abajo para colocar'}
      >
        {placedValue ? (
          <span className="flex items-center gap-1.5">
            <span>{placedValue}</span>
            {!isChecked && <span className="text-xs opacity-60">×</span>}
          </span>
        ) : (
          <span className="text-xs italic opacity-50">________</span>
        )}
      </button>
    );
  }
};
