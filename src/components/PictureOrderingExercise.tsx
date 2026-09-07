import React, { useState, useEffect, useRef } from 'react';
import {
  Volume2,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Sparkles,
  FileText,
  ChevronDown,
  RotateCw,
  Maximize2,
  X,
  GripVertical,
  Check,
  ArrowLeftRight,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PictureOrderItem, ReadingStory } from '../types';
import { speakEnglish, stopSpeaking, playFeedbackSound } from '../utils/audio';
import { useTheme } from '../context/ThemeContext';
import { SpeedSelectorButton } from './SpeedSelectorButton';

interface PictureOrderingExerciseProps {
  instructionText?: string;
  instructionTextEs?: string;
  audioPrompt?: string;
  story?: ReadingStory;
  items: PictureOrderItem[];
  initialOrder?: string[];
  accent?: 'US' | 'UK';
  speechRate?: number;
  onSuccess?: () => void;
}

export const PictureOrderingExercise: React.FC<PictureOrderingExerciseProps> = ({
  instructionText = 'Read the story "Wrong Color," and then put the pictures into the right order.',
  instructionTextEs = 'Lee la historia "Color Equivocado", y luego coloca las imágenes en el orden correcto.',
  audioPrompt,
  story,
  items,
  initialOrder,
  accent = 'US',
  speechRate = 1.0,
  onSuccess,
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const safeAccent: 'US' | 'UK' = accent === 'UK' ? 'UK' : 'US';

  // Active user speech rate
  const [currentRate, setCurrentRate] = useState<number>(speechRate);
  useEffect(() => {
    setCurrentRate(speechRate);
  }, [speechRate]);

  // Instruction 3D Flip Card state
  const [isInstructionFlipped, setIsInstructionFlipped] = useState(false);
  const [isSpeakingInstruction, setIsSpeakingInstruction] = useState(false);

  // Story text drawer toggle & 3D Flip state
  const [showStoryDrawer, setShowStoryDrawer] = useState(false);
  const [isStoryFlipped, setIsStoryFlipped] = useState(false);
  const [activeStoryParagraph, setActiveStoryParagraph] = useState<number | null>(null);

  // Items mapped by ID
  const itemMap = React.useMemo(() => {
    const map = new Map<string, PictureOrderItem>();
    items.forEach((item) => map.set(item.id, item));
    return map;
  }, [items]);

  // Current slot assignments: array of 6 item IDs corresponding to slots 1 to 6 (0-indexed: index 0 = slot 1)
  const [slots, setSlots] = useState<string[]>(() => {
    if (initialOrder && initialOrder.length === items.length) {
      return [...initialOrder];
    }
    // Default shuffled or preset order
    return items.map((it) => it.id);
  });

  // Selected slot for click-to-swap (0 to 5)
  const [selectedSlotIndex, setSelectedSlotIndex] = useState<number | null>(null);

  // Flipped card state for individual picture cards (set of item IDs)
  const [flippedItemIds, setFlippedItemIds] = useState<string[]>([]);

  // Drag and drop state
  const [draggedSlotIndex, setDraggedSlotIndex] = useState<number | null>(null);
  const [dragOverSlotIndex, setDragOverSlotIndex] = useState<number | null>(null);

  // Verification & feedback state
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [speakingItemId, setSpeakingItemId] = useState<string | null>(null);

  // Modal image preview
  const [zoomImageItem, setZoomImageItem] = useState<PictureOrderItem | null>(null);

  // Stop audio on unmount
  useEffect(() => {
    return () => {
      stopSpeaking();
    };
  }, []);

  // Play instruction speech
  const handlePlayInstructionAudio = () => {
    if (isSpeakingInstruction) {
      stopSpeaking();
      setIsSpeakingInstruction(false);
      return;
    }
    stopSpeaking();
    setIsSpeakingInstruction(true);
    const textToSpeak = audioPrompt || instructionText;
    speakEnglish(textToSpeak, currentRate, safeAccent, undefined, () => {
      setIsSpeakingInstruction(false);
    });
  };

  // Play sentence for an item
  const handlePlayItemSentence = (item: PictureOrderItem, e: React.MouseEvent) => {
    e.stopPropagation();
    if (speakingItemId === item.id) {
      stopSpeaking();
      setSpeakingItemId(null);
      return;
    }
    stopSpeaking();
    setSpeakingItemId(item.id);
    speakEnglish(item.captionEn, currentRate, safeAccent, undefined, () => {
      setSpeakingItemId(null);
    });
  };

  // Toggle individual card 3D flip
  const handleToggleCardFlip = (itemId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    playFeedbackSound('flip');
    setFlippedItemIds((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
    );
  };

  // Swap two slots
  const swapSlots = (indexA: number, indexB: number) => {
    if (indexA === indexB) return;
    playFeedbackSound('click');
    setSlots((prev) => {
      const next = [...prev];
      const temp = next[indexA];
      next[indexA] = next[indexB];
      next[indexB] = temp;
      return next;
    });
    setIsSubmitted(false);
  };

  // Handle clicking a slot or card
  const handleSlotClick = (slotIndex: number) => {
    if (selectedSlotIndex === null) {
      // First click: select this slot
      playFeedbackSound('click');
      setSelectedSlotIndex(slotIndex);
    } else if (selectedSlotIndex === slotIndex) {
      // Clicked same slot: deselect
      playFeedbackSound('click');
      setSelectedSlotIndex(null);
    } else {
      // Second click on a different slot: swap!
      swapSlots(selectedSlotIndex, slotIndex);
      setSelectedSlotIndex(null);
    }
  };

  // HTML5 Drag & Drop handlers
  const handleDragStart = (e: React.DragEvent, slotIndex: number) => {
    setDraggedSlotIndex(slotIndex);
    e.dataTransfer.setData('text/plain', slotIndex.toString());
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, slotIndex: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverSlotIndex !== slotIndex) {
      setDragOverSlotIndex(slotIndex);
    }
  };

  const handleDragLeave = (e: React.DragEvent, slotIndex: number) => {
    e.preventDefault();
    if (dragOverSlotIndex === slotIndex) {
      setDragOverSlotIndex(null);
    }
  };

  const handleDrop = (e: React.DragEvent, targetSlotIndex: number) => {
    e.preventDefault();
    setDragOverSlotIndex(null);
    const sourceIndexStr = e.dataTransfer.getData('text/plain');
    const sourceIndex = sourceIndexStr ? parseInt(sourceIndexStr, 10) : draggedSlotIndex;
    if (sourceIndex !== null && !isNaN(sourceIndex) && sourceIndex !== targetSlotIndex) {
      swapSlots(sourceIndex, targetSlotIndex);
    }
    setDraggedSlotIndex(null);
    setSelectedSlotIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedSlotIndex(null);
    setDragOverSlotIndex(null);
  };

  // Check answers
  const handleCheckAnswers = () => {
    setIsSubmitted(true);
    let allCorrect = true;

    // Slot at index i (0 to 5) corresponds to chronological order (i + 1)
    slots.forEach((itemId, index) => {
      const item = itemMap.get(itemId);
      if (!item || item.correctPosition !== index + 1) {
        allCorrect = false;
      }
    });

    if (allCorrect) {
      playFeedbackSound('complete');
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {
        // ignore
      }
      if (onSuccess) onSuccess();
    } else {
      playFeedbackSound('wrong');
    }
  };

  // Reset to initial order
  const handleReset = () => {
    playFeedbackSound('click');
    if (initialOrder && initialOrder.length === items.length) {
      setSlots([...initialOrder]);
    } else {
      setSlots(items.map((it) => it.id));
    }
    setSelectedSlotIndex(null);
    setIsSubmitted(false);
    setFlippedItemIds([]);
  };

  // Calculate score
  const correctCount = slots.reduce((count, itemId, index) => {
    const item = itemMap.get(itemId);
    return item && item.correctPosition === index + 1 ? count + 1 : count;
  }, 0);
  const isAllCorrect = isSubmitted && correctCount === items.length;

  return (
    <div
      id="picture-ordering-exercise"
      className={`w-full rounded-2xl sm:rounded-3xl border transition-all duration-300 overflow-hidden ${
        isDark ? 'bg-[#111827] border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-sm'
      }`}
    >
      {/* Exercise Header Banner with Reversible Instruction Card & Speed Selector */}
      <div
        className={`p-4 sm:p-5 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
          isDark ? 'border-white/10 bg-white/5' : 'border-slate-100 bg-slate-50/70'
        }`}
      >
        {/* Reversible Instruction Card (Click anywhere to flip) */}
        <div className="flex-1 perspective-1000 min-h-[68px]">
          <div
            id="picture-ordering-instruction-card"
            onClick={() => {
              playFeedbackSound('flip');
              setIsInstructionFlipped((prev) => !prev);
            }}
            className={`relative w-full h-full min-h-[68px] rounded-xl sm:rounded-2xl p-3 sm:p-4 cursor-pointer select-none transition-transform duration-500 transform-style-3d border shadow-xs ${
              isInstructionFlipped ? 'rotate-y-180' : ''
            } ${
              isInstructionFlipped
                ? isDark
                  ? 'bg-[#0F241A] border-emerald-500/40 text-emerald-200'
                  : 'bg-emerald-50/90 border-emerald-300 text-emerald-950 shadow-xs'
                : isDark
                ? 'bg-[#1A1F36] border-white/15 text-white hover:border-white/25'
                : 'bg-white border-slate-200 text-slate-800 hover:border-slate-300'
            }`}
            title="Haz clic para voltear entre inglés y español"
          >
            {/* Front Face: English */}
            <div className="absolute inset-0 p-3.5 sm:p-4 flex flex-col justify-center backface-hidden">
              <p className="text-xs sm:text-sm font-medium leading-relaxed select-none">
                {instructionText}
              </p>
            </div>

            {/* Back Face: Spanish */}
            <div className="absolute inset-0 p-3.5 sm:p-4 flex flex-col justify-center backface-hidden rotate-y-180">
              <p className="text-xs sm:text-sm font-medium leading-relaxed italic select-none">
                {instructionTextEs}
              </p>
            </div>
          </div>
        </div>

        {/* Speed Selector and Audio control button */}
        <div className="flex items-center gap-2.5 shrink-0 self-end sm:self-center">
          <SpeedSelectorButton
            currentRate={currentRate}
            onRateChange={(newRate) => setCurrentRate(newRate)}
            size="md"
          />

          <button
            id="picture-ordering-audio-play-btn"
            onClick={(e) => {
              e.stopPropagation();
              handlePlayInstructionAudio();
            }}
            className={`p-3 rounded-xl transition-all cursor-pointer shrink-0 shadow-xs flex items-center justify-center ${
              isSpeakingInstruction
                ? 'bg-rose-600 hover:bg-rose-700 text-white animate-pulse'
                : isDark
                ? 'bg-indigo-600 hover:bg-indigo-500 text-white border border-indigo-400'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white'
            }`}
            title={isSpeakingInstruction ? 'Detener audio' : 'Escuchar instrucción'}
            aria-label={isSpeakingInstruction ? 'Detener audio' : 'Escuchar instrucción'}
          >
            <Volume2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Story / Reading Text Drawer Reversible Card Toggle */}
      {story && (
        <div
          className={`px-5 py-3 border-b flex flex-col gap-3 transition-colors ${
            isDark ? 'border-white/10 bg-white/[0.02]' : 'border-slate-100 bg-slate-50/40'
          }`}
        >
          <div className="flex items-center justify-between">
            <button
              id="toggle-story-drawer-btn"
              type="button"
              onClick={() => {
                playFeedbackSound('click');
                setShowStoryDrawer((prev) => !prev);
              }}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-bold tracking-wide transition-all cursor-pointer border shadow-xs ${
                showStoryDrawer
                  ? isDark
                    ? 'bg-indigo-950/70 border-indigo-500/50 text-indigo-300'
                    : 'bg-indigo-50 border-indigo-300 text-indigo-700'
                  : isDark
                  ? 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <FileText className="w-4 h-4 text-indigo-500" />
              <span>
                {showStoryDrawer
                  ? `Ocultar Texto: "${story?.title || ''}"`
                  : `Ver Texto: "${story?.title || ''}" (Ayuda)`}
              </span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  showStoryDrawer ? 'rotate-180' : ''
                }`}
              />
            </button>

            {showStoryDrawer && (
              <span className="text-[11px] font-medium text-slate-400 italic hidden sm:inline">
                Haz clic en el cuadro de la historia para voltearlo entre inglés y español
              </span>
            )}
          </div>

          {/* Collapsible Story Reversible Card */}
          {showStoryDrawer && (
            <div className="perspective-1000 w-full animate-in fade-in slide-in-from-top-2 duration-300">
              <div
                id="story-drawer-flip-card"
                onClick={() => {
                  playFeedbackSound('flip');
                  setIsStoryFlipped((prev) => !prev);
                }}
                className={`relative w-full rounded-2xl p-5 cursor-pointer select-none transition-transform duration-500 transform-style-3d border shadow-sm ${
                  isStoryFlipped ? 'rotate-y-180' : ''
                } ${
                  isStoryFlipped
                    ? isDark
                      ? 'bg-[#0E2218] border-emerald-500/40 text-emerald-100'
                      : 'bg-emerald-50/95 border-emerald-300 text-emerald-950'
                    : isDark
                    ? 'bg-[#181D33] border-indigo-500/30 text-slate-100'
                    : 'bg-white border-indigo-100 text-slate-800'
                }`}
                title="Haz clic para voltear la historia entre inglés y español"
              >
                {/* Front: English Story with paragraph audio buttons */}
                <div className={`${isStoryFlipped ? 'invisible' : 'visible'} backface-hidden flex flex-col gap-3`}>
                  <div className="flex items-center justify-between border-b border-indigo-500/20 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                        English Story
                      </span>
                      <span className="text-[11px] px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300">
                        {story?.title || ''}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400">Clic para voltear a Español ↺</span>
                  </div>

                  <div className="flex flex-col gap-2.5 text-xs sm:text-sm leading-relaxed">
                    {story.paragraphsEn.map((para, idx) => (
                      <div
                        key={idx}
                        className={`p-2 rounded-lg transition-colors flex items-start justify-between gap-2 group ${
                          activeStoryParagraph === idx
                            ? isDark
                              ? 'bg-indigo-500/20 text-indigo-200 ring-1 ring-indigo-400'
                              : 'bg-indigo-50 text-indigo-900 ring-1 ring-indigo-300'
                            : 'hover:bg-indigo-500/5'
                        }`}
                      >
                        <p className="flex-1 select-none">{para}</p>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (activeStoryParagraph === idx) {
                              stopSpeaking();
                              setActiveStoryParagraph(null);
                            } else {
                              stopSpeaking();
                              setActiveStoryParagraph(idx);
                              speakEnglish(para, currentRate, safeAccent, undefined, () => {
                                setActiveStoryParagraph(null);
                              });
                            }
                          }}
                          className={`p-1.5 rounded-md shrink-0 transition-colors ${
                            activeStoryParagraph === idx
                              ? 'bg-indigo-600 text-white animate-pulse'
                              : 'text-indigo-400 hover:text-indigo-300 hover:bg-indigo-500/20'
                          }`}
                          title="Escuchar este párrafo"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Back: Spanish Translation */}
                <div
                  className={`${
                    isStoryFlipped ? 'visible' : 'invisible'
                  } backface-hidden rotate-y-180 flex flex-col gap-3`}
                >
                  <div className="flex items-center justify-between border-b border-emerald-500/20 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                        Traducción en Español
                      </span>
                      <span className="text-[11px] px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300">
                        {story?.titleEs || ''}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400">Clic para voltear a Inglés ↺</span>
                  </div>

                  <div className="flex flex-col gap-2.5 text-xs sm:text-sm leading-relaxed italic">
                    {story.paragraphsEs.map((para, idx) => (
                      <p key={idx} className="p-1.5 rounded-lg select-none">
                        {para}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Instructions & Interaction Guide bar */}
      <div
        className={`px-5 py-2.5 border-b flex items-center justify-between flex-wrap gap-2 text-xs ${
          isDark ? 'border-white/10 bg-white/[0.01] text-slate-400' : 'border-slate-100 bg-slate-50/30 text-slate-600'
        }`}
      >
        <div className="flex items-center gap-2">
          <ArrowLeftRight className="w-3.5 h-3.5 text-cyan-500" />
          <span>
            Haz clic en una imagen para seleccionarla y luego haz clic en otra para intercambiar su lugar, o arrástrala directamente.
          </span>
        </div>
        <div className="flex items-center gap-3 text-[11px]">
          <span className="flex items-center gap-1">
            <RotateCw className="w-3 h-3 text-indigo-400" /> Voltear tarjeta para leer el texto
          </span>
          <span className="flex items-center gap-1">
            <Volume2 className="w-3 h-3 text-indigo-400" /> Escuchar oración
          </span>
        </div>
      </div>

      {/* Main Picture Ordering Grid (6 Slots: 2 rows of 3 columns) */}
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6 max-w-5xl mx-auto">
          {slots.map((itemId, slotIndex) => {
            const item = itemMap.get(itemId);
            if (!item) return null;

            const slotNumber = slotIndex + 1;
            const isSelected = selectedSlotIndex === slotIndex;
            const isFlipped = flippedItemIds.includes(itemId);
            const isBeingDragged = draggedSlotIndex === slotIndex;
            const isDragOver = dragOverSlotIndex === slotIndex;
            const isSpeaking = speakingItemId === itemId;

            // Feedback status when submitted
            const isCorrect = isSubmitted && item.correctPosition === slotNumber;
            const isIncorrect = isSubmitted && item.correctPosition !== slotNumber;

            return (
              <div
                key={slotIndex}
                id={`picture-slot-${slotNumber}`}
                className="flex flex-col items-center gap-2 group"
                onDragOver={(e) => handleDragOver(e, slotIndex)}
                onDragLeave={(e) => handleDragLeave(e, slotIndex)}
                onDrop={(e) => handleDrop(e, slotIndex)}
              >
                {/* Slot Number centered above (1 to 6) */}
                <span
                  className={`text-sm font-semibold tracking-wide transition-colors ${
                    isSelected
                      ? 'text-cyan-500 font-bold'
                      : isCorrect
                      ? 'text-emerald-500 font-bold'
                      : isIncorrect
                      ? 'text-rose-500 font-bold'
                      : isDark
                      ? 'text-slate-400'
                      : 'text-slate-500'
                  }`}
                >
                  {slotNumber}
                </span>

                {/* Outer Slot Frame with Dashed Border (matches the user's reference image) */}
                <div
                  onClick={() => handleSlotClick(slotIndex)}
                  draggable
                  onDragStart={(e) => handleDragStart(e, slotIndex)}
                  onDragEnd={handleDragEnd}
                  className={`w-full aspect-[4/3] rounded-2xl p-2 sm:p-2.5 transition-all duration-200 border-2 border-dashed relative cursor-pointer select-none flex items-center justify-center ${
                    isSelected
                      ? 'border-cyan-400 ring-4 ring-cyan-400/30 bg-cyan-500/10 scale-[1.02] shadow-md'
                      : isDragOver
                      ? 'border-indigo-400 bg-indigo-500/10 scale-[1.02]'
                      : isCorrect
                      ? 'border-emerald-500 bg-emerald-500/5 ring-2 ring-emerald-400/30'
                      : isIncorrect
                      ? 'border-rose-500 bg-rose-500/5 ring-2 ring-rose-400/30'
                      : isDark
                      ? 'border-white/20 bg-white/[0.02] hover:border-cyan-400/60 hover:bg-white/[0.04]'
                      : 'border-slate-300 bg-slate-50/70 hover:border-cyan-400/70 hover:bg-slate-100/70'
                  } ${isBeingDragged ? 'opacity-40 scale-95' : 'opacity-100'}`}
                >
                  {/* Status Badges on Check */}
                  {isSubmitted && (
                    <div className="absolute -top-3 -right-3 z-30 pointer-events-none">
                      {isCorrect ? (
                        <div className="p-1 rounded-full bg-emerald-500 text-white shadow-md">
                          <Check className="w-4 h-4" />
                        </div>
                      ) : (
                        <div className="p-1 rounded-full bg-rose-500 text-white shadow-md">
                          <X className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                  )}

                  {/* 3D Reversible Picture Card */}
                  <div className="w-full h-full perspective-1000">
                    <div
                      className={`relative w-full h-full rounded-xl transition-transform duration-500 transform-style-3d shadow-sm ${
                        isFlipped ? 'rotate-y-180' : ''
                      }`}
                    >
                      {/* FRONT FACE: Picture Scene */}
                      <div className="absolute inset-0 backface-hidden rounded-xl overflow-hidden bg-slate-900 flex items-center justify-center">
                        <img
                          src={item.imageUrl}
                          alt={`Scene ${slotNumber}`}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover select-none pointer-events-none transition-transform duration-300 group-hover:scale-[1.03]"
                        />

                        {/* Card Floating Action Overlay: Flip & Sound Controls */}
                        <div
                          className="absolute inset-x-0 bottom-0 p-2 bg-black/75 flex items-center justify-between opacity-95 transition-opacity"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="flex items-center gap-1.5">
                            {/* Flip Button */}
                            <button
                              type="button"
                              onClick={(e) => handleToggleCardFlip(itemId, e)}
                              className="p-1.5 rounded-lg bg-black/60 hover:bg-black/90 text-white text-[11px] font-medium transition-colors border border-white/20 flex items-center gap-1 cursor-pointer"
                              title="Voltear para ver la oración en inglés y español"
                            >
                              <RotateCw className="w-3.5 h-3.5 text-cyan-300" />
                              <span className="hidden sm:inline">Texto</span>
                            </button>

                            {/* Audio Play Button */}
                            <button
                              type="button"
                              onClick={(e) => handlePlayItemSentence(item, e)}
                              className={`p-1.5 rounded-lg transition-colors border border-white/20 flex items-center gap-1 cursor-pointer ${
                                isSpeaking
                                  ? 'bg-rose-600 text-white animate-pulse'
                                  : 'bg-black/60 hover:bg-black/90 text-white'
                              }`}
                              title="Escuchar la oración correspondiente"
                            >
                              <Volume2 className="w-3.5 h-3.5 text-amber-300" />
                            </button>
                          </div>

                          {/* Zoom Image Preview */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              playFeedbackSound('click');
                              setZoomImageItem(item);
                            }}
                            className="p-1.5 rounded-lg bg-black/60 hover:bg-black/90 text-white border border-white/20 cursor-pointer"
                            title="Ampliar imagen"
                          >
                            <Maximize2 className="w-3.5 h-3.5 text-slate-200" />
                          </button>
                        </div>
                      </div>

                      {/* BACK FACE: Reversible Story Sentence (English & Spanish) */}
                      <div
                        className={`absolute inset-0 backface-hidden rotate-y-180 rounded-xl p-3 sm:p-4 flex flex-col justify-between border shadow-inner ${
                          isDark
                            ? 'bg-[#181D33] border-indigo-500/40 text-slate-100'
                            : 'bg-slate-900 border-indigo-400 text-white'
                        }`}
                      >
                        <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
                          <span className="text-[11px] font-semibold tracking-wider text-cyan-300 uppercase">
                            Scene Text
                          </span>
                          <button
                            type="button"
                            onClick={(e) => handleToggleCardFlip(itemId, e)}
                            className="text-[11px] text-slate-300 hover:text-white flex items-center gap-1 cursor-pointer"
                          >
                            <span>Imagen</span>
                            <RotateCw className="w-3 h-3 text-cyan-300" />
                          </button>
                        </div>

                        {/* Sentences */}
                        <div className="my-auto flex flex-col gap-2">
                          <p className="text-xs sm:text-sm font-medium leading-snug text-white">
                            {item.captionEn}
                          </p>
                          <p className="text-[11px] sm:text-xs leading-snug text-slate-300 italic border-t border-white/10 pt-1.5">
                            {item.captionEs}
                          </p>
                        </div>

                        {/* Back Face Audio & Controls */}
                        <div className="flex items-center justify-between pt-1 border-t border-white/10">
                          <button
                            type="button"
                            onClick={(e) => handlePlayItemSentence(item, e)}
                            className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 cursor-pointer ${
                              isSpeaking
                                ? 'bg-rose-600 text-white animate-pulse'
                                : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                            }`}
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                            <span>Escuchar</span>
                          </button>

                          <span className="text-[10px] text-slate-400 font-mono">
                            {item.correctPosition}° de 6
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Verification & Action Bar */}
        <div className="mt-8 pt-6 border-t border-dashed border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-5xl mx-auto">
          {/* Status summary */}
          <div className="flex items-center gap-3">
            {isSubmitted ? (
              isAllCorrect ? (
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold text-sm animate-in fade-in">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  <span>¡Excelente! Las 6 imágenes están en el orden cronológico correcto (6/6).</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-semibold text-sm animate-in fade-in">
                  <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                  <span>
                    Tienes {correctCount} de {items.length} imágenes en la posición correcta. ¡Revisa las resaltadas en rojo y ajústalas!
                  </span>
                </div>
              )
            ) : (
              <span className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Selecciona una imagen y luego otra para cambiar su orden cronológico del 1 al 6.
              </span>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3 shrink-0 self-stretch sm:self-auto justify-end">
            <button
              id="picture-ordering-reset-btn"
              type="button"
              onClick={handleReset}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold tracking-wide transition-all cursor-pointer border flex items-center justify-center gap-2 ${
                isDark
                  ? 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reiniciar</span>
            </button>

            <button
              id="picture-ordering-check-btn"
              type="button"
              onClick={handleCheckAnswers}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all cursor-pointer shadow-md flex items-center justify-center gap-2 ${
                isAllCorrect
                  ? 'bg-emerald-600 text-white cursor-default'
                  : 'bg-cyan-600 hover:bg-cyan-500 text-white hover:shadow-lg active:scale-95'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>{isAllCorrect ? '¡Completado!' : 'Comprobar Respuestas'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Modal image zoom */}
      {zoomImageItem && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setZoomImageItem(null)}
        >
          <div
            className="relative max-w-2xl w-full bg-slate-900 border border-white/20 rounded-2xl overflow-hidden shadow-2xl p-4 flex flex-col gap-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-white">Detalle de la escena</span>
              <button
                type="button"
                onClick={() => setZoomImageItem(null)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-black flex items-center justify-center">
              <img
                src={zoomImageItem.imageUrl}
                alt="Zoom scene"
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain"
              />
            </div>

            <div className="p-3 bg-white/5 rounded-xl flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <p className="text-xs sm:text-sm font-medium text-white">{zoomImageItem.captionEn}</p>
                <button
                  type="button"
                  onClick={(e) => handlePlayItemSentence(zoomImageItem, e)}
                  className="p-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white shrink-0 ml-2"
                  title="Escuchar"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-slate-300 italic">{zoomImageItem.captionEs}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
