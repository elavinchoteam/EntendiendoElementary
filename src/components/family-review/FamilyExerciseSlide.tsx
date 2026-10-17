import React, { useState, useEffect, useRef } from 'react';
import {
  Volume2,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Gauge,
  HelpCircle,
  Sparkles,
} from 'lucide-react';
import {
  FamilyActivityItem,
  FamilyDropdownActivity,
  FamilyMultipleChoiceActivity,
  ellenImg,
  ELLEN_MESSAGE_FULL_AUDIO,
} from '../../data/familyReviewData';
import { FamilyReferenceCard } from './FamilyReferenceCard';
import { speakEnglish, stopSpeaking, playFeedbackSound } from '../../utils/audio';
import { useTheme } from '../../context/ThemeContext';

interface FamilyExerciseSlideProps {
  activity: FamilyActivityItem;
  accent?: 'US' | 'UK';
  speechRate?: number;
  onSuccess?: () => void;
  onNext?: () => void;
  hasNext?: boolean;
}

const PLAYBACK_SPEEDS = [
  { label: '0.8x', value: 0.8 },
  { label: '1.0x', value: 1.0 },
  { label: '1.2x', value: 1.2 },
];

export const FamilyExerciseSlide: React.FC<FamilyExerciseSlideProps> = ({
  activity,
  accent = 'US',
  speechRate = 1.0,
  onSuccess,
  onNext,
  hasNext = true,
}) => {
  const { isDark } = useTheme();

  // Audio player state
  const [isPlayingMedia, setIsPlayingMedia] = useState(false);
  const [playerSpeed, setPlayerSpeed] = useState(speechRate);
  const [isSpeedMenuOpen, setIsSpeedMenuOpen] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const totalDurationSeconds = 31;
  const speedMenuRef = useRef<HTMLDivElement>(null);

  // Reversible cards state
  const [isInstructionFlipped, setIsInstructionFlipped] = useState(false);
  const [isDialogueFlipped, setIsDialogueFlipped] = useState(false);

  // Actividad 2: Dropdown answers { slotId: selectedValue }
  const [dropdownAnswers, setDropdownAnswers] = useState<Record<string, string>>({});

  // Actividad 3: Multiple choice answers { questionId: selectedOption }
  const [mcAnswers, setMcAnswers] = useState<Record<string, string>>({});

  // Check & feedback state
  const [isChecked, setIsChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // Reset state when activity changes
  useEffect(() => {
    setIsChecked(false);
    setIsCorrect(false);
    setIsInstructionFlipped(false);
    setIsDialogueFlipped(false);
    setDropdownAnswers({});
    setMcAnswers({});
    stopSpeaking();
    setIsPlayingMedia(false);
    setElapsedSeconds(0);
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

  // Timer simulation for media bar
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlayingMedia) {
      interval = setInterval(() => {
        setElapsedSeconds((prev) => {
          if (prev >= totalDurationSeconds) {
            setIsPlayingMedia(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000 / playerSpeed);
    }
    return () => clearInterval(interval);
  }, [isPlayingMedia, playerSpeed]);

  const handleTogglePlayMedia = () => {
    if (isPlayingMedia) {
      stopSpeaking();
      setIsPlayingMedia(false);
      return;
    }
    playFeedbackSound('click');
    setElapsedSeconds(0);
    speakEnglish(
      ELLEN_MESSAGE_FULL_AUDIO,
      playerSpeed,
      accent,
      () => setIsPlayingMedia(true),
      () => {
        setIsPlayingMedia(false);
        setElapsedSeconds(totalDurationSeconds);
      }
    );
  };

  const handleListenClip = (clipText: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    stopSpeaking();
    setIsPlayingMedia(false);
    playFeedbackSound('click');
    speakEnglish(clipText, playerSpeed, accent);
  };

  const handleListenInstructions = (e: React.MouseEvent) => {
    e.stopPropagation();
    playFeedbackSound('click');
    speakEnglish(activity.instructions, playerSpeed, accent);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // ---------------------------------------------------------------------------
  // HANDLERS FOR ACTIVIDAD 2: DROPDOWNS
  // ---------------------------------------------------------------------------
  const handleDropdownSelect = (slotId: string, val: string) => {
    playFeedbackSound('click');
    setDropdownAnswers((prev) => ({
      ...prev,
      [slotId]: val,
    }));
    if (isChecked) {
      setIsChecked(false);
    }
  };

  // ---------------------------------------------------------------------------
  // HANDLERS FOR ACTIVIDAD 3: MULTIPLE CHOICE
  // ---------------------------------------------------------------------------
  const handleMcSelect = (qId: string, option: string) => {
    playFeedbackSound('click');
    setMcAnswers((prev) => ({
      ...prev,
      [qId]: option,
    }));
    if (isChecked) {
      setIsChecked(false);
    }
  };

  // ---------------------------------------------------------------------------
  // CHECK ANSWERS
  // ---------------------------------------------------------------------------
  const handleCheck = () => {
    playFeedbackSound('click');

    if (activity.type === 'dropdown-completion') {
      const dropAct = activity as FamilyDropdownActivity;
      const slotKeys = Object.keys(dropAct.slots);
      let allCorrect = true;

      for (const slotKey of slotKeys) {
        const slot = dropAct.slots[slotKey];
        const userVal = (dropdownAnswers[slotKey] || '').trim().toLowerCase();
        const expected = slot.correctAnswer.trim().toLowerCase();
        if (userVal !== expected) {
          allCorrect = false;
          break;
        }
      }

      setIsChecked(true);
      setIsCorrect(allCorrect);
      if (allCorrect) {
        playFeedbackSound('correct');
        onSuccess?.();
      } else {
        playFeedbackSound('wrong');
      }
    } else if (activity.type === 'multiple-choice-trio') {
      const mcAct = activity as FamilyMultipleChoiceActivity;
      let allCorrect = true;

      for (const q of mcAct.questions) {
        const userVal = (mcAnswers[q.id] || '').trim().toLowerCase();
        const expected = q.correctAnswer.trim().toLowerCase();
        if (userVal !== expected) {
          allCorrect = false;
          break;
        }
      }

      setIsChecked(true);
      setIsCorrect(allCorrect);
      if (allCorrect) {
        playFeedbackSound('correct');
        onSuccess?.();
      } else {
        playFeedbackSound('wrong');
      }
    }
  };

  // Reintentar actividad
  const handleResetActivity = () => {
    playFeedbackSound('click');
    setDropdownAnswers({});
    setMcAnswers({});
    setIsChecked(false);
    setIsCorrect(false);
    setIsInstructionFlipped(false);
    setIsDialogueFlipped(false);
    setIsPlayingMedia(false);
    setElapsedSeconds(0);
    stopSpeaking();
  };

  const isCheckDisabled = () => {
    if (isChecked) return true;
    if (activity.type === 'dropdown-completion') {
      const dropAct = activity as FamilyDropdownActivity;
      return Object.keys(dropAct.slots).some((key) => !dropdownAnswers[key]);
    }
    if (activity.type === 'multiple-choice-trio') {
      const mcAct = activity as FamilyMultipleChoiceActivity;
      return mcAct.questions.some((q) => !mcAnswers[q.id]);
    }
    return false;
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
          className={`w-full lg:w-[46%] p-5 sm:p-7 flex flex-col gap-4 border-b lg:border-b-0 lg:border-r ${
            isDark ? 'bg-slate-900/80 border-white/10' : 'bg-slate-50/80 border-slate-200'
          }`}
        >
          {/* Header Badge */}
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-sky-500/15 border border-sky-500/30 text-sky-600 dark:text-sky-400">
              Unit 6 · {activity.title}
            </span>
            <span className="text-xs font-mono opacity-60">Family: Review</span>
          </div>

          {/* Illustration image - compact h-32 sm:h-36 */}
          <div className="w-full h-32 sm:h-36 rounded-2xl overflow-hidden border border-inherit/20 relative shadow-sm">
            <img
              src={ellenImg}
              alt="Ellen calling in the car"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-3">
              <span className="text-white text-xs font-medium drop-shadow-sm">
                Ellen's Voicemail · On the Way to Airport
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
                Audio Message · Voicemail
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

          {/* 3D Reversible Reference Card (Pinned voicemail memo) */}
          <FamilyReferenceCard speed={playerSpeed} accent={accent} />
        </div>

        {/* RIGHT COLUMN: Instructions, Interactive Exercise, Feedback & Action bar */}
        <div className="w-full lg:w-[54%] p-6 sm:p-8 flex flex-col justify-between gap-6">
          <div className="flex flex-col gap-6">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-inherit/15">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                  {activity.title} · Family: Review
                </span>
                <h3 className="text-lg font-bold tracking-tight mt-0.5">
                  {activity.type === 'dropdown-completion'
                    ? 'Completa las oraciones seleccionando la opción correcta'
                    : 'Responde a las preguntas sobre el mensaje'}
                </h3>
              </div>
              <button
                type="button"
                onClick={handleTogglePlayMedia}
                className="p-2 rounded-xl border border-inherit/20 hover:bg-sky-50 dark:hover:bg-slate-800 text-sky-600 dark:text-sky-400 transition-colors"
                title="Escuchar mensaje completo"
                aria-label="Escuchar mensaje completo"
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

            {/* 3D Reversible Activity Card with CSS Grid Auto-Height */}
            <div className="w-full perspective-1000">
              <div
                role="button"
                tabIndex={0}
                onClick={(e) => {
                  const target = e.target as HTMLElement;
                  if (
                    target.closest('select') ||
                    target.closest('input') ||
                    target.closest('label') ||
                    target.closest('button[data-audio-clip]')
                  ) {
                    return;
                  }
                  playFeedbackSound('flip');
                  setIsDialogueFlipped((prev) => !prev);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    const target = e.target as HTMLElement;
                    if (target.closest('select') || target.closest('input')) return;
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
                {/* ANVERSO / FRONT: English Dialogue / Dropdowns / Questions */}
                <div
                  className={`col-start-1 row-start-1 w-full rounded-2xl p-5 sm:p-6 flex flex-col justify-between backface-hidden ${
                    isDialogueFlipped ? 'invisible pointer-events-none' : ''
                  }`}
                >
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-inherit/20">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                      {activity.type === 'dropdown-completion'
                        ? 'Sentences · English'
                        : 'Questions · English'}
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

                  {/* Actividad 2: Dropdown completion */}
                  {activity.type === 'dropdown-completion' && (
                    <div className="space-y-4 text-sm sm:text-base leading-relaxed font-medium my-auto max-h-[340px] overflow-y-auto pr-1">
                      {(activity as FamilyDropdownActivity).sentences.map((sent) => (
                        <div
                          key={sent.id}
                          className="p-3.5 rounded-xl border border-inherit/15 bg-white/40 dark:bg-slate-800/40 flex items-start gap-3"
                        >
                          <button
                            type="button"
                            data-audio-clip="true"
                            onClick={(e) => handleListenClip(sent.audioClipText, e)}
                            className="p-1.5 rounded-lg border border-inherit/20 hover:bg-sky-100 dark:hover:bg-slate-700 text-sky-600 dark:text-sky-400 shrink-0 mt-0.5"
                            title="Escuchar fragmento de audio"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>

                          <div className="flex-1 flex flex-wrap items-center gap-x-2 gap-y-2 leading-relaxed">
                            {sent.parts.map((p, pIdx) => {
                              if (p.type === 'text') {
                                return <span key={pIdx}>{p.contentEn}</span>;
                              }
                              const slot = (activity as FamilyDropdownActivity).slots[p.slotId];
                              if (!slot) return null;
                              const val = dropdownAnswers[p.slotId] || '';
                              const isSlotRight =
                                isChecked &&
                                val.trim().toLowerCase() === slot.correctAnswer.trim().toLowerCase();

                              return (
                                <select
                                  key={p.slotId}
                                  value={val}
                                  disabled={isChecked}
                                  onChange={(e) => handleDropdownSelect(p.slotId, e.target.value)}
                                  className={`px-3 py-1.5 rounded-xl border-2 font-mono text-xs sm:text-sm font-semibold transition-all cursor-pointer outline-none ${
                                    isChecked
                                      ? isSlotRight
                                        ? 'border-emerald-500 bg-emerald-500/15 text-emerald-700 dark:text-emerald-300'
                                        : 'border-rose-500 bg-rose-500/15 text-rose-700 dark:text-rose-300'
                                      : val
                                      ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300'
                                      : isDark
                                      ? 'bg-slate-800 border-white/20 text-white'
                                      : 'bg-white border-slate-300 text-slate-800'
                                  }`}
                                >
                                  <option value="">-- Elige --</option>
                                  {slot.options.map((opt) => (
                                    <option key={opt} value={opt}>
                                      {opt}
                                    </option>
                                  ))}
                                </select>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Actividad 3: Multiple choice trio */}
                  {activity.type === 'multiple-choice-trio' && (
                    <div className="space-y-4 my-auto max-h-[340px] overflow-y-auto pr-1">
                      {(activity as FamilyMultipleChoiceActivity).questions.map((q, qIdx) => {
                        const userAns = mcAnswers[q.id];
                        const isQCorrect =
                          isChecked && userAns?.trim().toLowerCase() === q.correctAnswer.trim().toLowerCase();

                        return (
                          <div
                            key={q.id}
                            className="p-3.5 rounded-xl border border-inherit/15 bg-white/40 dark:bg-slate-800/40 space-y-2.5"
                          >
                            <div className="flex items-start gap-2.5">
                              <button
                                type="button"
                                data-audio-clip="true"
                                onClick={(e) => handleListenClip(q.audioText, e)}
                                className="p-1.5 rounded-lg border border-inherit/20 hover:bg-sky-100 dark:hover:bg-slate-700 text-sky-600 dark:text-sky-400 shrink-0 mt-0.5"
                                title="Escuchar pregunta"
                              >
                                <Volume2 className="w-4 h-4" />
                              </button>
                              <span className="font-bold text-sm sm:text-base leading-snug">
                                {qIdx + 1}. {q.questionEn}
                              </span>
                            </div>

                            <div className="space-y-1.5 pl-8">
                              {q.optionsEn.map((opt) => {
                                const isSelected = userAns === opt;
                                const isOptRight = opt === q.correctAnswer;

                                return (
                                  <label
                                    key={opt}
                                    onClick={(e) => e.stopPropagation()}
                                    className={`flex items-center gap-2.5 p-2 rounded-lg border text-xs sm:text-sm cursor-pointer transition-all ${
                                      isChecked
                                        ? isOptRight
                                          ? 'border-emerald-500 bg-emerald-500/15 text-emerald-800 dark:text-emerald-200 font-bold'
                                          : isSelected
                                          ? 'border-rose-500 bg-rose-500/15 text-rose-800 dark:text-rose-200 font-semibold'
                                          : 'opacity-50 border-inherit/20'
                                        : isSelected
                                        ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/40 text-sky-800 dark:text-sky-200 font-semibold'
                                        : isDark
                                        ? 'border-white/10 hover:bg-slate-800/80'
                                        : 'border-slate-200 hover:bg-slate-100'
                                    }`}
                                  >
                                    <input
                                      type="radio"
                                      name={`mc-q-${q.id}`}
                                      value={opt}
                                      checked={isSelected}
                                      onChange={() => handleMcSelect(q.id, opt)}
                                      disabled={isChecked}
                                      className="w-4 h-4 text-sky-600 focus:ring-sky-500 cursor-pointer"
                                    />
                                    <span>{opt}</span>
                                  </label>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  <div className="pt-2 mt-3 border-t border-inherit/15 flex items-center justify-between text-[10px] font-mono opacity-60">
                    <span>
                      {activity.type === 'dropdown-completion'
                        ? 'Selecciona los desplegables'
                        : 'Elige una opción por pregunta'}
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

                  {/* Spanish translation content */}
                  <div className="space-y-3 font-serif italic text-sm sm:text-base leading-relaxed text-slate-800 dark:text-emerald-100 my-auto py-1 max-h-[340px] overflow-y-auto pr-1">
                    {activity.type === 'dropdown-completion' && (
                      <div className="space-y-3">
                        {(activity as FamilyDropdownActivity).sentences.map((sent, idx) => (
                          <div key={sent.id} className="p-3 rounded-xl border border-emerald-300/40 bg-emerald-500/5">
                            <p className="font-bold font-sans not-italic text-emerald-700 dark:text-emerald-300 text-xs mb-1">
                              Oración {idx + 1}:
                            </p>
                            <p className="leading-relaxed">{sent.fullEs}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {activity.type === 'multiple-choice-trio' && (
                      <div className="space-y-3">
                        {(activity as FamilyMultipleChoiceActivity).questions.map((q, idx) => (
                          <div key={q.id} className="p-3 rounded-xl border border-emerald-300/40 bg-emerald-500/5 space-y-1.5">
                            <p className="font-bold font-sans not-italic text-emerald-700 dark:text-emerald-300 text-xs">
                              Pregunta {idx + 1}: {q.questionEs}
                            </p>
                            <ul className="space-y-1 pl-4 not-italic font-sans text-xs sm:text-sm">
                              {q.optionsEs.map((optEs, optIdx) => {
                                const isRight = q.optionsEn[optIdx] === q.correctAnswer;
                                return (
                                  <li key={optIdx} className="flex items-center gap-2">
                                    <span className="font-bold text-emerald-500">
                                      {isRight ? '✓' : '•'}
                                    </span>
                                    <span className={isRight ? 'font-bold text-emerald-700 dark:text-emerald-300' : 'opacity-80'}>
                                      {optEs} {isRight && '(Respuesta correcta)'}
                                    </span>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="pt-2 mt-3 border-t border-inherit/15 flex items-center justify-between text-[10px] font-mono opacity-60">
                    <span>Traducción contextual</span>
                    <span>Castellano</span>
                  </div>
                </div>
              </div>
            </div>

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
                      {isCorrect ? '¡Excelente! Todo correcto.' : 'Respuestas incorrectas. Revisa la explicación:'}
                    </p>
                    {activity.type === 'dropdown-completion' && (
                      <>
                        <p className="opacity-90">{(activity as FamilyDropdownActivity).explanationEs}</p>
                        <p className="text-[11px] font-mono opacity-70 border-t border-inherit/20 pt-1 mt-1">
                          {(activity as FamilyDropdownActivity).explanationEn}
                        </p>
                      </>
                    )}
                    {activity.type === 'multiple-choice-trio' && (
                      <div className="space-y-1 pt-1">
                        {(activity as FamilyMultipleChoiceActivity).questions.map((q, idx) => (
                          <p key={idx} className="opacity-90">
                            <strong>{idx + 1}:</strong> {q.explanationEs}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons: Reintentar Actividad, Comprobar, and Siguiente Actividad */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-inherit/15">
            <button
              type="button"
              onClick={handleResetActivity}
              className="px-4 py-2.5 rounded-xl border border-inherit/20 text-xs sm:text-sm font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer flex items-center gap-1.5 active:scale-95"
              title="Reiniciar esta actividad"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reintentar Actividad</span>
            </button>

            <div className="flex items-center gap-3">
              {!isChecked ? (
                <button
                  type="button"
                  onClick={handleCheck}
                  disabled={isCheckDisabled()}
                  className="px-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 disabled:opacity-40 disabled:hover:bg-sky-600 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-sky-500/25 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Comprobar Respuestas</span>
                </button>
              ) : isCorrect && hasNext && onNext ? (
                <button
                  type="button"
                  onClick={() => {
                    playFeedbackSound('click');
                    onNext();
                  }}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-emerald-500/25 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
                >
                  <span>Siguiente Actividad</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleCheck}
                  className="px-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-sky-500/25 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Volver a Comprobar</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
