import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Check,
  Volume2,
  VolumeX,
  CheckCircle2,
  XCircle,
  Gauge,
  Sparkles,
  GripVertical,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { DialogueOrderingExercise as DialogueOrderingExerciseType, DialogueOrderItem, LessonSentence } from '../types';
import { speakEnglish, stopSpeaking, playFeedbackSound } from '../utils/audio';
import { useTheme } from '../context/ThemeContext';
import { PLAYBACK_SPEEDS, formatSpeedLabel } from './AudioPlayerCard';

interface DialogueOrderingExerciseProps {
  exercise: DialogueOrderingExerciseType;
  accent?: 'US' | 'UK';
  speechRate?: number;
  onSuccess?: () => void;
}

export const DialogueOrderingExercise: React.FC<DialogueOrderingExerciseProps> = ({
  exercise,
  accent = 'US',
  speechRate = 1.0,
  onSuccess,
}) => {
  const { isDark } = useTheme();
  const safeAccent: 'US' | 'UK' = accent === 'UK' ? 'UK' : 'US';

  const durationSeconds = exercise.durationSeconds || 18;
  const originalSentences: LessonSentence[] = exercise.sentences || [];

  // Items mapped by ID
  const itemMap = React.useMemo(() => {
    const map = new Map<string, DialogueOrderItem>();
    exercise.items.forEach((it) => map.set(it.id, it));
    return map;
  }, [exercise.items]);

  // Current slot assignments: array of item IDs in slots 0..5
  const [slotItemIds, setSlotItemIds] = useState<string[]>(() => {
    if (exercise.initialOrder && exercise.initialOrder.length === exercise.items.length) {
      // Find item matching text
      return exercise.initialOrder.map((txt) => {
        const found = exercise.items.find((it) => it.textEn === txt);
        return found ? found.id : exercise.items[0].id;
      });
    }
    return exercise.items.map((it) => it.id);
  });

  // Selected slot for click-to-swap
  const [selectedSlotIdx, setSelectedSlotIdx] = useState<number | null>(null);

  // Drag and drop state
  const [draggedSlotIdx, setDraggedSlotIdx] = useState<number | null>(null);
  const [dragOverSlotIdx, setDragOverSlotIdx] = useState<number | null>(null);

  // Reversible cards state (strictly no flip buttons, no flip hint text, no gradients)
  const [isInstructionFlipped, setIsInstructionFlipped] = useState(false);
  const [isTranscriptFlipped, setIsTranscriptFlipped] = useState(false);
  const [flippedItemIds, setFlippedItemIds] = useState<string[]>([]);

  // Media Player State
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentPlaybackRate, setCurrentPlaybackRate] = useState<number>(speechRate);
  const [isSpeedMenuOpen, setIsSpeedMenuOpen] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [currentSentenceIdx, setCurrentSentenceIdx] = useState<number | null>(null);

  // Verification & Feedback State
  const [isChecked, setIsChecked] = useState(false);
  const [isAllCorrect, setIsAllCorrect] = useState(false);
  const [speakingTarget, setSpeakingTarget] = useState<string | null>(null);

  // Speed controls for reversible cards
  const [instructionSpeed, setInstructionSpeed] = useState<number>(speechRate);
  const [isInstructionSpeedOpen, setIsInstructionSpeedOpen] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const speedMenuRef = useRef<HTMLDivElement>(null);
  const instructionSpeedMenuRef = useRef<HTMLDivElement>(null);

  // Reset when exercise changes
  useEffect(() => {
    if (exercise.initialOrder && exercise.initialOrder.length === exercise.items.length) {
      setSlotItemIds(
        exercise.initialOrder.map((txt) => {
          const found = exercise.items.find((it) => it.textEn === txt);
          return found ? found.id : exercise.items[0].id;
        })
      );
    } else {
      setSlotItemIds(exercise.items.map((it) => it.id));
    }
    setSelectedSlotIdx(null);
    setIsInstructionFlipped(false);
    setIsTranscriptFlipped(false);
    setFlippedItemIds([]);
    setIsChecked(false);
    setIsAllCorrect(false);
    setIsPlaying(false);
    setElapsedSeconds(0);
    setCurrentSentenceIdx(null);
    stopSpeaking();
    setSpeakingTarget(null);
  }, [exercise.id]);

  // Close menus on outside click
  useEffect(() => {
    const handleDocClick = (e: MouseEvent) => {
      if (speedMenuRef.current && !speedMenuRef.current.contains(e.target as Node)) {
        setIsSpeedMenuOpen(false);
      }
      if (instructionSpeedMenuRef.current && !instructionSpeedMenuRef.current.contains(e.target as Node)) {
        setIsInstructionSpeedOpen(false);
      }
    };
    document.addEventListener('mousedown', handleDocClick);
    return () => document.removeEventListener('mousedown', handleDocClick);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      stopSpeaking();
    };
  }, []);

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleTogglePlayMedia = () => {
    if (isPlaying) {
      stopSpeaking();
      setIsPlaying(false);
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    stopSpeaking();
    setIsPlaying(true);
    setSpeakingTarget(null);

    const fullText = exercise.audioPrompt || originalSentences.map((s) => s.en).join(' ');

    speakEnglish(
      fullText,
      currentPlaybackRate,
      safeAccent,
      () => {
        setIsPlaying(true);
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
          setElapsedSeconds((prev) => {
            if (prev >= durationSeconds) {
              if (timerRef.current) clearInterval(timerRef.current);
              setIsPlaying(false);
              setCurrentSentenceIdx(null);
              return durationSeconds;
            }
            const nextSec = prev + 0.5;
            const ratio = nextSec / durationSeconds;
            const targetIdx = Math.min(originalSentences.length - 1, Math.floor(ratio * originalSentences.length));
            setCurrentSentenceIdx(targetIdx);
            return nextSec;
          });
        }, 500);
      },
      () => {
        setIsPlaying(false);
        setElapsedSeconds(0);
        setCurrentSentenceIdx(null);
        if (timerRef.current) clearInterval(timerRef.current);
      },
      exercise.speakerGender || 'male'
    );
  };

  const handleSpeakText = (text: string, targetId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (speakingTarget === targetId) {
      stopSpeaking();
      setSpeakingTarget(null);
      return;
    }

    stopSpeaking();
    setIsPlaying(false);
    if (timerRef.current) clearInterval(timerRef.current);
    setSpeakingTarget(targetId);

    speakEnglish(
      text,
      instructionSpeed,
      safeAccent,
      () => setSpeakingTarget(targetId),
      () => setSpeakingTarget(null),
      exercise.speakerGender || 'male'
    );
  };

  // Swap slots
  const swapSlots = (idxA: number, idxB: number) => {
    if (idxA === idxB) return;
    setSlotItemIds((prev) => {
      const next = [...prev];
      const temp = next[idxA];
      next[idxA] = next[idxB];
      next[idxB] = temp;
      return next;
    });
    setIsChecked(false);
    setIsAllCorrect(false);
    playFeedbackSound('click');
  };

  // Handle slot click (click-to-swap)
  const handleSlotClick = (idx: number) => {
    if (selectedSlotIdx === null) {
      setSelectedSlotIdx(idx);
    } else {
      swapSlots(selectedSlotIdx, idx);
      setSelectedSlotIdx(null);
    }
  };

  // Drag and drop handlers
  const handleDragStart = (idx: number) => {
    setDraggedSlotIdx(idx);
  };

  const handleDragOver = (e: React.DragEvent, idx: number) => {
    e.preventDefault();
    setDragOverSlotIdx(idx);
  };

  const handleDrop = (idx: number) => {
    if (draggedSlotIdx !== null) {
      swapSlots(draggedSlotIdx, idx);
    }
    setDraggedSlotIdx(null);
    setDragOverSlotIdx(null);
  };

  // Flip individual item card
  const toggleItemFlip = (itemId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    playFeedbackSound('flip');
    setFlippedItemIds((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
    );
  };

  // Verification
  const handleCheck = () => {
    let allRight = true;
    slotItemIds.forEach((itemId, idx) => {
      const it = itemMap.get(itemId);
      if (!it || it.order !== idx + 1) {
        allRight = false;
      }
    });

    setIsChecked(true);
    setIsAllCorrect(allRight);

    if (allRight) {
      playFeedbackSound('click');
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
      });
      if (onSuccess) onSuccess();
    } else {
      playFeedbackSound('wrong');
    }
  };

  // Reset order to initial scrambled order
  const handleReset = () => {
    if (exercise.initialOrder && exercise.initialOrder.length === exercise.items.length) {
      setSlotItemIds(
        exercise.initialOrder.map((txt) => {
          const found = exercise.items.find((it) => it.textEn === txt);
          return found ? found.id : exercise.items[0].id;
        })
      );
    } else {
      setSlotItemIds(exercise.items.map((it) => it.id));
    }
    setSelectedSlotIdx(null);
    setIsChecked(false);
    setIsAllCorrect(false);
    playFeedbackSound('click');
  };

  return (
    <div className="w-full flex flex-col items-center gap-6 animate-in fade-in duration-200 py-2 select-none">
      <div className="w-full flex flex-col lg:flex-row gap-6 items-start justify-center">
        {/* Left: Media Player + Dialogue Transcript */}
        <div className="w-full max-w-[340px] sm:max-w-[380px] mx-auto lg:mx-0 shrink-0 flex flex-col gap-4">
          <div
            className={`w-full rounded-2xl border overflow-hidden shadow-md flex flex-col ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}
          >
            {/* Image */}
            <div className="relative aspect-4/3 w-full bg-slate-950 overflow-hidden">
              <img
                src={exercise.imageUrl}
                alt="Piece of Cake dialogue"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Media controls */}
            <div
              className={`p-3.5 flex items-center justify-between gap-3 border-t ${
                isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <button
                type="button"
                onClick={handleTogglePlayMedia}
                className="w-9 h-9 rounded-full flex items-center justify-center bg-sky-500 hover:bg-sky-600 text-white shadow-sm transition-all transform active:scale-95 cursor-pointer"
                title={isPlaying ? 'Pausar' : 'Reproducir'}
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
              </button>

              <div className="flex-1 flex flex-col gap-1">
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-sky-500 h-full transition-all duration-200"
                    style={{ width: `${Math.min(100, (elapsedSeconds / durationSeconds) * 100)}%` }}
                  />
                </div>
                <div className="flex justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400">
                  <span>{formatTime(elapsedSeconds)}</span>
                  <span>{formatTime(durationSeconds)}</span>
                </div>
              </div>

              {/* Speed menu */}
              <div className="relative" ref={speedMenuRef}>
                <button
                  type="button"
                  onClick={() => setIsSpeedMenuOpen(!isSpeedMenuOpen)}
                  className={`px-2 py-1 rounded-lg border text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors ${
                    isDark
                      ? 'border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700'
                      : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100'
                  }`}
                  title="Velocidad"
                >
                  <Gauge className="w-3 h-3 text-sky-500" />
                  <span>{formatSpeedLabel(currentPlaybackRate)}</span>
                </button>

                {isSpeedMenuOpen && (
                  <div
                    className={`absolute right-0 bottom-full mb-2 w-28 rounded-xl shadow-xl border py-1.5 z-50 animate-in fade-in zoom-in-95 ${
                      isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
                    }`}
                  >
                    <div className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 text-slate-400">
                      Velocidad
                    </div>
                    {PLAYBACK_SPEEDS.map((sp) => (
                      <button
                        key={sp.value}
                        type="button"
                        onClick={() => {
                          setCurrentPlaybackRate(sp.value);
                          setIsSpeedMenuOpen(false);
                          if (isPlaying) {
                            stopSpeaking();
                            handleTogglePlayMedia();
                          }
                        }}
                        className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between transition-colors ${
                          Math.abs(currentPlaybackRate - sp.value) < 0.01
                            ? 'bg-sky-50 dark:bg-sky-950/50 text-sky-600 dark:text-sky-400 font-bold'
                            : isDark
                            ? 'text-slate-300 hover:bg-slate-700'
                            : 'text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <span>{sp.label}</span>
                        {Math.abs(currentPlaybackRate - sp.value) < 0.01 && (
                          <CheckCircle2 className="w-3 h-3 text-sky-500" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Mute */}
              <button
                type="button"
                onClick={() => {
                  setIsMuted(!isMuted);
                  if (!isMuted) stopSpeaking();
                }}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  isMuted ? 'text-red-500 bg-red-50' : isDark ? 'text-slate-400 hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Transcript card below player (Reversible, pure solid background, no flip buttons/text) */}
          <div
            onClick={() => {
              playFeedbackSound('flip');
              setIsTranscriptFlipped(!isTranscriptFlipped);
            }}
            className={`w-full rounded-2xl border p-4 shadow-sm cursor-pointer transition-colors duration-200 select-none ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800 mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                {isTranscriptFlipped ? 'Traducción del diálogo original' : 'Original Dialogue'}
              </span>
              <button
                type="button"
                onClick={(e) =>
                  handleSpeakText(
                    isTranscriptFlipped
                      ? originalSentences.map((s) => s.es).join('. ')
                      : originalSentences.map((s) => s.en).join(' '),
                    'transcript-audio',
                    e
                  )
                }
                className={`p-1.5 rounded-lg cursor-pointer ${
                  speakingTarget === 'transcript-audio'
                    ? 'bg-sky-500 text-white animate-pulse'
                    : isDark
                    ? 'text-slate-400 hover:text-white'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Escuchar"
              >
                <Volume2 className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex flex-col gap-1 text-xs sm:text-sm">
              {originalSentences.map((s, idx) => (
                <div
                  key={idx}
                  className={`py-0.5 px-1 rounded transition-colors ${
                    currentSentenceIdx === idx ? 'bg-amber-300 dark:bg-amber-400 text-slate-950 font-bold' : ''
                  } ${isTranscriptFlipped ? 'italic font-serif text-slate-600 dark:text-slate-300' : 'text-slate-800 dark:text-slate-200'}`}
                >
                  {isTranscriptFlipped ? s.es : s.en}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Activity 8 - Put sentences in order */}
        <div className="flex-1 w-full flex flex-col gap-4">
          {/* Reversible Instruction Card (No buttons, no indicators, pure solid background, with audio) */}
          <div
            onClick={() => {
              playFeedbackSound('flip');
              setIsInstructionFlipped(!isInstructionFlipped);
            }}
            className={`w-full rounded-2xl border p-4 sm:p-5 shadow-sm cursor-pointer transition-colors duration-200 select-none ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between gap-4">
              <div className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
                {isInstructionFlipped ? exercise.instructionsEs : exercise.instructions}
              </div>

              <div className="flex items-center gap-2 shrink-0" onClick={(e) => e.stopPropagation()}>
                <button
                  type="button"
                  onClick={(e) =>
                    handleSpeakText(
                      isInstructionFlipped ? (exercise.instructionsEs || '') : exercise.instructions,
                      'instruction-audio',
                      e
                    )
                  }
                  className={`p-2 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                    speakingTarget === 'instruction-audio'
                      ? 'bg-sky-500 text-white animate-pulse'
                      : isDark
                      ? 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900'
                  }`}
                  title="Escuchar instrucción"
                >
                  <Volume2 className="w-4 h-4" />
                </button>

                {/* Speed selector menu */}
                <div className="relative" ref={instructionSpeedMenuRef}>
                  <button
                    type="button"
                    onClick={() => setIsInstructionSpeedOpen(!isInstructionSpeedOpen)}
                    className={`px-2 py-1 rounded-lg border text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors ${
                      isDark
                        ? 'border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700'
                        : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100'
                    }`}
                    title="Velocidad"
                  >
                    <Gauge className="w-3 h-3 text-sky-500" />
                    <span>{formatSpeedLabel(instructionSpeed)}</span>
                  </button>

                  {isInstructionSpeedOpen && (
                    <div
                      className={`absolute right-0 top-full mt-1 w-28 rounded-xl shadow-xl border py-1.5 z-50 animate-in fade-in zoom-in-95 ${
                        isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
                      }`}
                    >
                      <div className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 text-slate-400">
                        Velocidad
                      </div>
                      {PLAYBACK_SPEEDS.map((sp) => (
                        <button
                          key={sp.value}
                          type="button"
                          onClick={() => {
                            setInstructionSpeed(sp.value);
                            setIsInstructionSpeedOpen(false);
                            if (speakingTarget === 'instruction-audio') {
                              stopSpeaking();
                              setSpeakingTarget(null);
                            }
                          }}
                          className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between transition-colors ${
                            Math.abs(instructionSpeed - sp.value) < 0.01
                              ? 'bg-sky-50 dark:bg-sky-950/50 text-sky-600 dark:text-sky-400 font-bold'
                              : isDark
                              ? 'text-slate-300 hover:bg-slate-700'
                              : 'text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          <span>{sp.label}</span>
                          {Math.abs(instructionSpeed - sp.value) < 0.01 && (
                            <CheckCircle2 className="w-3 h-3 text-sky-500" />
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* 6 Numbered Rows with Draggable / Click-to-swap Sentence Cards */}
          <div className="w-full flex flex-col gap-2.5">
            {slotItemIds.map((itemId, idx) => {
              const item = itemMap.get(itemId);
              if (!item) return null;

              const isFlipped = flippedItemIds.includes(item.id);
              const isSelected = selectedSlotIdx === idx;
              const isDragged = draggedSlotIdx === idx;
              const isDragOver = dragOverSlotIdx === idx;

              // Check state
              const isItemCorrect = isChecked && item.order === idx + 1;
              const isItemWrong = isChecked && item.order !== idx + 1;

              return (
                <div
                  key={`${item.id}-${idx}`}
                  draggable
                  onDragStart={() => handleDragStart(idx)}
                  onDragOver={(e) => handleDragOver(e, idx)}
                  onDrop={() => handleDrop(idx)}
                  onClick={() => handleSlotClick(idx)}
                  className={`w-full rounded-xl border transition-all duration-200 flex items-center gap-3 px-3 py-2.5 sm:px-4 sm:py-3 cursor-pointer select-none ${
                    isSelected
                      ? 'ring-2 ring-sky-500 border-sky-500 bg-sky-50/50 dark:bg-sky-950/40'
                      : isDragOver
                      ? 'border-sky-400 bg-sky-50/70 dark:bg-sky-950/60 scale-[1.01]'
                      : isItemCorrect
                      ? 'border-emerald-500 bg-emerald-50/40 dark:bg-emerald-950/30'
                      : isItemWrong
                      ? 'border-rose-400 bg-rose-50/40 dark:bg-rose-950/30'
                      : isDark
                      ? 'bg-slate-900 border-slate-800 hover:border-slate-700'
                      : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
                  } ${isDragged ? 'opacity-40' : 'opacity-100'}`}
                >
                  {/* Grip / Drag icon */}
                  <GripVertical className="w-4 h-4 text-slate-400 shrink-0 cursor-grab active:cursor-grabbing" />

                  {/* Slot Number (1..6) */}
                  <span
                    className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                      isItemCorrect
                        ? 'bg-emerald-500 text-white'
                        : isItemWrong
                        ? 'bg-rose-500 text-white'
                        : isSelected
                        ? 'bg-sky-500 text-white'
                        : isDark
                        ? 'bg-slate-800 text-slate-300'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {idx + 1}
                  </span>

                  {/* Sentence text (clickable to flip translation, strictly solid background, no buttons/text) */}
                  <div
                    onClick={(e) => toggleItemFlip(item.id, e)}
                    className="flex-1 flex flex-col justify-center cursor-pointer"
                    title="Clic para ver traducción"
                  >
                    <div
                      className={`text-sm sm:text-base font-medium transition-colors ${
                        isFlipped
                          ? 'font-serif italic text-slate-700 dark:text-slate-300'
                          : 'text-slate-900 dark:text-slate-100'
                      }`}
                    >
                      {isFlipped ? item.textEs : item.textEn}
                    </div>
                  </div>

                  {/* Audio button for sentence */}
                  <button
                    type="button"
                    onClick={(e) => handleSpeakText(isFlipped ? item.textEs : item.textEn, `item-${item.id}`, e)}
                    className={`p-2 rounded-lg cursor-pointer transition-colors shrink-0 ${
                      speakingTarget === `item-${item.id}`
                        ? 'bg-sky-500 text-white animate-pulse'
                        : isDark
                        ? 'text-slate-400 hover:text-white hover:bg-slate-800'
                        : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                    title="Escuchar oración"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>

                  {/* Correct / Incorrect indicator */}
                  {isChecked && (
                    <div className="shrink-0">
                      {isItemCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      ) : (
                        <XCircle className="w-5 h-5 text-rose-500" />
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Action buttons bar: Check / Reset */}
          <div className="w-full flex items-center justify-between gap-4 mt-2">
            <button
              type="button"
              onClick={handleReset}
              className={`px-4 py-2 rounded-xl border text-sm font-semibold flex items-center gap-2 cursor-pointer transition-colors ${
                isDark
                  ? 'border-slate-700 text-slate-300 hover:bg-slate-800'
                  : 'border-slate-300 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reiniciar</span>
            </button>

            <button
              type="button"
              onClick={handleCheck}
              className="px-6 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 active:scale-95 text-white font-bold text-sm flex items-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Comprobar</span>
            </button>
          </div>

          {/* Feedback Explanation */}
          {isChecked && (
            <div
              className={`p-4 rounded-xl border animate-in fade-in select-none ${
                isAllCorrect
                  ? 'bg-emerald-50/60 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                  : 'bg-amber-50/60 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200'
              }`}
            >
              <div className="font-bold mb-1 flex items-center gap-2">
                {isAllCorrect ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    <span>¡Excelente trabajo! Diálogo ordenado correctamente.</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                    <span>Algunas oraciones no están en la posición correcta. Inténtalo de nuevo.</span>
                  </>
                )}
              </div>
              <p className="text-xs sm:text-sm leading-relaxed mt-1">
                {exercise.explanationEs || exercise.explanation}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
