import React, { useState, useEffect, useRef } from 'react';
import {
  Volume2,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Check,
  Sparkles,
  HelpCircle,
  FileText,
  ChevronDown,
  RotateCw,
  X,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { MatchingPair, LessonMainText, ReadingStory } from '../types';
import { speakEnglish, stopSpeaking, playFeedbackSound } from '../utils/audio';
import { useTheme } from '../context/ThemeContext';
import { SpeedSelectorButton } from './SpeedSelectorButton';

const defaultLessonTextFallback: LessonMainText = {
  title: 'Lesson 1: Phone Sales',
  stepTitle: 'Step 1: Explore',
  audioText:
    'Hi, there! This is Chuck Wood calling from "Working People Magazine." We have something good for you today: our biggest sale of the year! The price of our magazine was $2.50 each. Now it\'s only $10 for ten magazines. That\'s $1 each. Call now! The number is 555-9663. Don\'t forget! That number was 555-9663. Remember: "Working People Magazine" works for you!',
  textEn:
    'Hi, there! This is Chuck Wood calling from "Working People Magazine." We have something good for you today: our biggest sale of the year! The price of our magazine was $2.50 each. Now it\'s only $10 for ten magazines. That\'s $1 each. Call now! The number is 555-9663. Don\'t forget! That number was 555-9663. Remember: "Working People Magazine" works for you!',
  textEs:
    '¡Hola! Habla Chuck Wood de "Working People Magazine". Hoy tenemos algo bueno para ti: ¡nuestra mayor venta del año! El precio de nuestra revista era de $2.50 cada una. Ahora cuesta solo $10 por diez revistas. Eso es $1 cada una. ¡Llama ya! El número es 555-9663. ¡No lo olvides! Ese número era 555-9663. Recuerda: ¡"Working People Magazine" trabaja para ti!',
  caller: 'Chuck Wood',
  company: 'Working People Magazine',
  phone: '555-9663',
  practiceInstructions: '',
  sentences: [
    { en: 'Hi, there!', es: '¡Hola!' },
    { en: 'This is Chuck Wood calling from "Working People Magazine."', es: 'Habla Chuck Wood de "Working People Magazine".' },
    { en: 'We have something good for you today: our biggest sale of the year!', es: 'Hoy tenemos algo bueno para ti: ¡nuestra mayor venta del año!' },
    { en: 'The price of our magazine was $2.50 each.', es: 'El precio de nuestra revista era de $2.50 cada una.' },
    { en: "Now it's only $10 for ten magazines.", es: 'Ahora cuesta solo $10 por diez revistas.' },
    { en: "That's $1 each.", es: 'Eso es $1 cada una.' },
    { en: 'Call now!', es: '¡Llama ya!' },
    { en: 'The number is 555-9663.', es: 'El número es 555-9663.' },
    { en: "Don't forget!", es: '¡No lo olvides!' },
    { en: 'That number was 555-9663.', es: 'Ese número era 555-9663.' },
    { en: 'Remember: "Working People Magazine" works for you!', es: 'Recuerda: ¡"Working People Magazine" trabaja para ti!' },
  ],
};

interface MatchingTableExerciseProps {
  instructionText?: string;
  instructionTextEs?: string;
  audioPrompt?: string;
  lessonText?: LessonMainText;
  story?: ReadingStory;
  columnAHeader?: string;
  columnAHeaderEs?: string;
  columnBHeader?: string;
  columnBHeaderEs?: string;
  pairs: MatchingPair[];
  optionsPool: string[];
  optionsPoolEs?: Record<string, string>;
  accent?: 'US' | 'UK';
  speechRate?: number;
  onSuccess?: () => void;
}

const DEFAULT_FIELD_TRANSLATIONS: Record<string, string> = {
  'Name of caller:': 'Nombre de quien llama:',
  'Name of caller': 'Nombre de quien llama',
  'Name of product:': 'Nombre del producto:',
  'Name of product': 'Nombre del producto',
  'Normal price:': 'Precio normal:',
  'Normal price': 'Precio normal',
  'Sale price:': 'Precio de oferta:',
  'Sale price': 'Precio de oferta',
  'Phone number:': 'Número de teléfono:',
  'Phone number': 'Número de teléfono',
};

const DEFAULT_OPTION_TRANSLATIONS: Record<string, string> = {
  '$2.50 for one magazine': '$2.50 por una revista',
  '555-9663': '555-9663',
  '$10 for ten magazines': '$10 por diez revistas',
  'Chuck Wood': 'Chuck Wood',
  'Working People Magazine': 'Revista Working People',
  'cried': 'lloró',
  'right': 'correcto / correcta',
  'open': 'abierto / abierta',
  'early': 'temprano',
};

export const MatchingTableExercise: React.FC<MatchingTableExerciseProps> = ({
  instructionText = 'Listen to the voice message, and fill the correct information.',
  instructionTextEs = 'Escucha el mensaje de voz, y llena la información correcta.',
  audioPrompt,
  lessonText,
  story,
  columnAHeader,
  columnAHeaderEs,
  columnBHeader,
  columnBHeaderEs,
  pairs,
  optionsPool,
  optionsPoolEs,
  accent = 'US',
  speechRate = 1.0,
  onSuccess,
}) => {
  const { isDark } = useTheme();
  const safeAccent: 'US' | 'UK' = accent === 'UK' ? 'UK' : 'US';

  const [currentRate, setCurrentRate] = useState<number>(speechRate);
  useEffect(() => {
    setCurrentRate(speechRate);
  }, [speechRate]);

  const activeLesson = lessonText || (!story ? defaultLessonTextFallback : undefined);

  // Mapping of pair.id -> selected option string (or undefined if empty)
  const [slotValues, setSlotValues] = useState<Record<string, string>>({});
  const [selectedPoolItem, setSelectedPoolItem] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSpeakingInstruction, setIsSpeakingInstruction] = useState(false);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [playingSentenceId, setPlayingSentenceId] = useState<string | null>(null);

  // 3D Reversible Cards state
  const [flippedFieldIds, setFlippedFieldIds] = useState<string[]>([]);
  const [flippedOptionIds, setFlippedOptionIds] = useState<string[]>([]);
  const [flippedSlotIds, setFlippedSlotIds] = useState<string[]>([]);

  // Flip card states for instruction and headers
  const [isInstructionFlipped, setIsInstructionFlipped] = useState(false);
  const [isColAFlipped, setIsColAFlipped] = useState(false);
  const [isColBFlipped, setIsColBFlipped] = useState(false);

  // Story / Lesson Text Drawer Reversible Card state
  const [showStoryDrawer, setShowStoryDrawer] = useState(false);
  const [isStoryCardFlipped, setIsStoryCardFlipped] = useState(false);
  const [isPlayingStoryAudio, setIsPlayingStoryAudio] = useState(false);
  const [playingSentenceIdx, setPlayingSentenceIdx] = useState<number | null>(null);

  // Determine which options from the pool are currently placed
  const usedValues = Object.values(slotValues);

  const colA = columnAHeader || 'A';
  const colAEs = columnAHeaderEs || (columnAHeader ? 'Oraciones' : 'A');
  const colB = columnBHeader || 'B (DRAG HERE)';
  const colBEs = columnBHeaderEs || (columnBHeader ? 'Opuestos' : 'B (ARRASTRA AQUÍ)');

  const handlePlayInstructionAudio = () => {
    const textToSpeak = audioPrompt || instructionText;
    if (isSpeakingInstruction) {
      stopSpeaking();
      setIsSpeakingInstruction(false);
      return;
    }
    stopSpeaking();
    setIsSpeakingInstruction(true);
    speakEnglish(
      textToSpeak,
      currentRate,
      safeAccent,
      () => setIsSpeakingInstruction(true),
      () => setIsSpeakingInstruction(false)
    );
  };

  const handleToggleStoryAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPlayingStoryAudio) {
      stopSpeaking();
      setIsPlayingStoryAudio(false);
      setPlayingSentenceIdx(null);
      return;
    }

    const textToPlay = story
      ? story.audioText || story.textEn
      : activeLesson?.audioText || activeLesson?.textEn || '';

    if (!textToPlay) return;

    stopSpeaking();
    setIsPlayingStoryAudio(true);
    speakEnglish(
      textToPlay,
      currentRate,
      safeAccent,
      () => setIsPlayingStoryAudio(true),
      () => {
        setIsPlayingStoryAudio(false);
        setPlayingSentenceIdx(null);
      }
    );
  };

  const handlePlaySentenceAudio = (sentence: string, pairId: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (playingSentenceId === pairId) {
      stopSpeaking();
      setPlayingSentenceId(null);
      return;
    }
    stopSpeaking();
    setPlayingSentenceId(pairId);
    speakEnglish(
      sentence,
      currentRate,
      safeAccent,
      () => setPlayingSentenceId(pairId),
      () => setPlayingSentenceId(null)
    );
  };

  const handlePlayOptionAudio = (word: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    stopSpeaking();
    speakEnglish(word, currentRate, safeAccent);
  };

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent, item: string) => {
    e.dataTransfer.setData('text/plain', item);
    setDraggedItem(item);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, pairId: string) => {
    e.preventDefault();
    const item = e.dataTransfer.getData('text/plain') || draggedItem;
    if (!item) return;
    assignItemToSlot(pairId, item);
    setDraggedItem(null);
  };

  // Click to assign
  const handlePoolItemClick = (item: string) => {
    if (isSubmitted) return;
    playFeedbackSound('click');
    if (selectedPoolItem === item) {
      setSelectedPoolItem(null);
    } else {
      setSelectedPoolItem(item);
    }
  };

  const handleSlotClick = (pairId: string) => {
    if (isSubmitted) return;
    if (selectedPoolItem) {
      playFeedbackSound('click');
      assignItemToSlot(pairId, selectedPoolItem);
      setSelectedPoolItem(null);
    }
  };

  const assignItemToSlot = (pairId: string, item: string) => {
    if (isSubmitted) return;
    playFeedbackSound('click');
    setSlotValues((prev) => {
      const next = { ...prev };
      // If item was already used in another slot, remove it from there
      Object.keys(next).forEach((key) => {
        if (next[key] === item) {
          delete next[key];
        }
      });
      next[pairId] = item;
      return next;
    });
  };

  const handleRemoveFromSlot = (pairId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSubmitted) return;
    playFeedbackSound('click');
    setSlotValues((prev) => {
      const next = { ...prev };
      delete next[pairId];
      return next;
    });
  };

  const handleToggleFlipField = (pairId: string) => {
    playFeedbackSound('flip');
    setFlippedFieldIds((prev) =>
      prev.includes(pairId) ? prev.filter((id) => id !== pairId) : [...prev, pairId]
    );
  };

  const handleToggleFlipOption = (option: string, e: React.MouseEvent) => {
    e.stopPropagation();
    playFeedbackSound('flip');
    setFlippedOptionIds((prev) =>
      prev.includes(option) ? prev.filter((opt) => opt !== option) : [...prev, option]
    );
  };

  const handleToggleFlipSlot = (pairId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    playFeedbackSound('flip');
    setFlippedSlotIds((prev) =>
      prev.includes(pairId) ? prev.filter((id) => id !== pairId) : [...prev, pairId]
    );
  };

  const handleCheckAnswers = () => {
    setIsSubmitted(true);

    let allCorrect = true;
    for (const pair of pairs) {
      if (slotValues[pair.id] !== pair.correctValue) {
        allCorrect = false;
        break;
      }
    }

    if (allCorrect) {
      playFeedbackSound('complete');
      try {
        confetti({
          particleCount: 75,
          spread: 65,
          origin: { y: 0.65 },
        });
      } catch {
        // ignore
      }
      if (onSuccess) onSuccess();
    } else {
      playFeedbackSound('wrong');
    }
  };

  const handleReset = () => {
    playFeedbackSound('click');
    setSlotValues({});
    setSelectedPoolItem(null);
    setIsSubmitted(false);
    setFlippedFieldIds([]);
    setFlippedOptionIds([]);
    setFlippedSlotIds([]);
  };

  const isAllFilled = pairs.every((p) => Boolean(slotValues[p.id]));
  const correctCount = pairs.filter((p) => slotValues[p.id] === p.correctValue).length;
  const isAllCorrect = isSubmitted && correctCount === pairs.length;

  // Helper to render sentence with yellow highlighted word
  const renderSentenceWithHighlight = (
    text: string,
    highlight?: string,
    isSpanish = false
  ) => {
    if (!highlight) return <span>{text}</span>;
    const regex = new RegExp(`(${highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    return (
      <span className="leading-snug">
        {parts.map((part, i) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <mark
              key={i}
              className={`font-semibold px-1 py-0.5 rounded shadow-2xs mx-0.5 not-italic inline-block transition-colors ${
                isSpanish
                  ? isDark
                    ? 'bg-yellow-400/30 text-yellow-200 ring-1 ring-yellow-400/40'
                    : 'bg-yellow-200 text-yellow-950 ring-1 ring-yellow-400/50'
                  : isDark
                  ? 'bg-yellow-400/25 text-yellow-200 ring-1 ring-yellow-400/40'
                  : 'bg-yellow-200 text-yellow-950 ring-1 ring-yellow-400/50'
              }`}
            >
              {part}
            </mark>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </span>
    );
  };

  return (
    <div
      className={`w-full rounded-2xl border transition-colors duration-200 ${
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
            id="matching-instruction-card"
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
            id="matching-audio-play-btn"
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

      {/* Story / Lesson Text Drawer Reversible Card Toggle */}
      {(story || activeLesson) && (
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
                    ? 'bg-indigo-600/30 text-indigo-300 border-indigo-500/40'
                    : 'bg-indigo-50 text-indigo-700 border-indigo-200'
                  : isDark
                  ? 'bg-white/5 hover:bg-white/10 text-white/80 hover:text-white border-white/15 hover:border-white/25'
                  : 'bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 border-slate-200 hover:border-slate-300'
              }`}
              title={showStoryDrawer ? 'Ocultar historia' : 'Ver historia'}
            >
              <FileText className="w-3.5 h-3.5 text-indigo-500" />
              <span>
                {showStoryDrawer
                  ? 'Ocultar Texto de la Historia'
                  : `Ver Texto: "${story ? story.title : activeLesson?.title}"`}
              </span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  showStoryDrawer ? 'rotate-180' : ''
                }`}
              />
            </button>
          </div>

          {/* When expanded: Reversible 3D story card */}
          {showStoryDrawer && (
            <div className="w-full perspective-1000 my-2 animate-in fade-in slide-in-from-top-2 duration-300">
              <div
                id="story-drawer-reversible-card"
                onClick={() => {
                  playFeedbackSound('flip');
                  setIsStoryCardFlipped((prev) => !prev);
                }}
                className={`relative w-full min-h-[300px] sm:min-h-[340px] rounded-2xl sm:rounded-3xl cursor-pointer select-none transition-transform duration-500 transform-style-3d border shadow-xl ${
                  isStoryCardFlipped ? 'rotate-y-180' : ''
                } ${
                  isStoryCardFlipped
                    ? isDark
                      ? 'bg-gradient-to-br from-[#0F291E] via-[#0F172A] to-[#0D1F17] border-emerald-500/30 text-white'
                      : 'bg-gradient-to-br from-emerald-50/70 via-white to-emerald-50/40 border-emerald-200 text-slate-900 shadow-md'
                    : isDark
                    ? 'bg-gradient-to-br from-[#1A1F36] via-[#0F172A] to-[#16192E] border-white/10 text-white'
                    : 'bg-gradient-to-br from-indigo-50/70 via-white to-indigo-50/40 border-indigo-200 text-slate-900 shadow-md'
                }`}
              >
                {/* Front Face: English text */}
                <div className="absolute inset-0 w-full h-full p-6 sm:p-8 flex flex-col justify-between backface-hidden overflow-y-auto">
                  <div className="flex items-center justify-between gap-3 pb-3 border-b border-inherit">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider ${
                        isDark
                          ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                          : 'bg-indigo-100 text-indigo-800 border border-indigo-200'
                      }`}
                    >
                      {story ? story.title : 'English'}
                    </span>

                    <button
                      id="story-card-audio-btn-front"
                      type="button"
                      onClick={handleToggleStoryAudio}
                      className={`p-2.5 rounded-xl transition-all cursor-pointer shadow-xs ${
                        isPlayingStoryAudio
                          ? 'bg-rose-600 hover:bg-rose-700 text-white animate-pulse'
                          : isDark
                          ? 'bg-indigo-600 hover:bg-indigo-500 text-white border border-indigo-400'
                          : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                      }`}
                      title={isPlayingStoryAudio ? 'Detener pronunciación' : 'Escuchar pronunciación'}
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="my-auto py-4 space-y-3">
                    {story ? (
                      story.paragraphsEn && story.paragraphsEn.length > 0 ? (
                        story.paragraphsEn.map((p, idx) => (
                          <p
                            key={idx}
                            onClick={(e) => {
                              e.stopPropagation();
                              handlePlaySentenceAudio(p, `story-p-${idx}`);
                            }}
                            className={`text-sm sm:text-base leading-relaxed font-sans transition-colors cursor-pointer rounded px-1.5 py-0.5 hover:bg-white/10 ${
                              playingSentenceId === `story-p-${idx}` ? 'text-indigo-400 font-semibold' : ''
                            }`}
                          >
                            {p}
                          </p>
                        ))
                      ) : (
                        <p className="text-sm sm:text-base leading-relaxed font-sans">
                          {story.textEn}
                        </p>
                      )
                    ) : (
                      activeLesson?.sentences.map((sent, idx) => (
                        <span
                          key={idx}
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePlaySentenceAudio(sent.en, `lesson-s-${idx}`);
                          }}
                          className={`inline-block mr-1.5 text-sm sm:text-base leading-relaxed font-sans transition-colors cursor-pointer rounded px-1 py-0.5 hover:bg-white/10 ${
                            playingSentenceId === `lesson-s-${idx}` ? 'text-indigo-400 font-semibold' : ''
                          }`}
                        >
                          {sent.en}
                        </span>
                      ))
                    )}
                  </div>

                  <div className="pt-3 border-t border-inherit flex items-center justify-between text-xs font-mono opacity-70">
                    <span>Haz clic en el texto para escuchar oraciones individuales</span>
                    <span>Toca la tarjeta para voltear a Español</span>
                  </div>
                </div>

                {/* Back Face: Spanish translation */}
                <div className="absolute inset-0 w-full h-full p-6 sm:p-8 flex flex-col justify-between backface-hidden rotate-y-180 overflow-y-auto">
                  <div className="flex items-center justify-between gap-3 pb-3 border-b border-inherit">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider ${
                        isDark
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                      }`}
                    >
                      {story?.titleEs || 'Español'}
                    </span>

                    <button
                      id="story-card-audio-btn-back"
                      type="button"
                      onClick={handleToggleStoryAudio}
                      className={`p-2.5 rounded-xl transition-all cursor-pointer shadow-xs ${
                        isPlayingStoryAudio
                          ? 'bg-rose-600 hover:bg-rose-700 text-white animate-pulse'
                          : isDark
                          ? 'bg-emerald-600 hover:bg-emerald-500 text-white border border-emerald-400'
                          : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                      }`}
                      title="Escuchar pronunciación en inglés"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="my-auto py-4 space-y-3">
                    {story ? (
                      story.paragraphsEs && story.paragraphsEs.length > 0 ? (
                        story.paragraphsEs.map((p, idx) => (
                          <p
                            key={idx}
                            className="text-sm sm:text-base leading-relaxed font-sans italic opacity-95"
                          >
                            {p}
                          </p>
                        ))
                      ) : (
                        <p className="text-sm sm:text-base leading-relaxed font-sans italic opacity-95">
                          {story.textEs}
                        </p>
                      )
                    ) : (
                      activeLesson?.sentences.map((sent, idx) => (
                        <span
                          key={idx}
                          className="inline-block mr-1.5 text-sm sm:text-base leading-relaxed font-sans italic opacity-95"
                        >
                          {sent.es}
                        </span>
                      ))
                    )}
                  </div>

                  <div className="pt-3 border-t border-inherit flex items-center justify-between text-xs font-mono opacity-70">
                    <span>Traducción en Español</span>
                    <span>Toca la tarjeta para volver a Inglés</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Main Grid: Column A & Column B Table (Left) + Available Options Pool (Right) */}
      <div className="p-5 sm:p-7 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
        
        {/* Table Columns A and B */}
        <div className="lg:col-span-8 flex flex-col">
          
          {/* Table Header row */}
          <div className="grid grid-cols-12 gap-3 pb-3 border-b border-dashed font-bold mb-3 items-center border-inherit">
            
            {/* Column A Reversible Header Card */}
            <div className="col-span-7 sm:col-span-8 perspective-1000">
              <div
                id="header-col-a-flip-card"
                onClick={() => {
                  playFeedbackSound('flip');
                  setIsColAFlipped((prev) => !prev);
                }}
                className={`relative inline-flex items-center cursor-pointer select-none transition-transform duration-500 transform-style-3d min-h-[34px] ${
                  isColAFlipped ? 'rotate-y-180' : ''
                }`}
                title="Haz clic para voltear encabezado"
              >
                {/* Front: English */}
                <div className="backface-hidden flex items-center gap-1.5">
                  <span className="text-sky-500 dark:text-sky-400 font-bold text-base sm:text-lg tracking-tight">
                    {colA}
                  </span>
                </div>

                {/* Back: Spanish */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 flex items-center gap-1.5">
                  <span className="text-emerald-500 dark:text-emerald-400 font-bold text-base sm:text-lg tracking-tight italic">
                    {colAEs}
                  </span>
                </div>
              </div>
            </div>

            {/* Column B Reversible Header Card */}
            <div className="col-span-5 sm:col-span-4 perspective-1000">
              <div
                id="header-col-b-flip-card"
                onClick={() => {
                  playFeedbackSound('flip');
                  setIsColBFlipped((prev) => !prev);
                }}
                className={`relative inline-flex items-center justify-center cursor-pointer select-none transition-transform duration-500 transform-style-3d min-h-[34px] w-full ${
                  isColBFlipped ? 'rotate-y-180' : ''
                }`}
                title="Haz clic para voltear encabezado"
              >
                {/* Front: English */}
                <div className="backface-hidden flex items-center justify-center w-full">
                  <span className="text-sky-500 dark:text-sky-400 font-bold text-base sm:text-lg tracking-tight text-center">
                    {colB}
                  </span>
                </div>

                {/* Back: Spanish */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 flex items-center justify-center w-full">
                  <span className="text-emerald-500 dark:text-emerald-400 font-bold text-base sm:text-lg tracking-tight italic text-center">
                    {colBEs}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Rows */}
          <div className="space-y-4">
            {pairs.map((pair) => {
              const placedValue = slotValues[pair.id];
              const isCorrect = isSubmitted && placedValue === pair.correctValue;
              const isIncorrect = isSubmitted && placedValue && placedValue !== pair.correctValue;
              const isFieldFlipped = flippedFieldIds.includes(pair.id);
              const isSlotFlipped = flippedSlotIds.includes(pair.id);
              const placedTranslation = placedValue
                ? optionsPoolEs?.[placedValue] ||
                  DEFAULT_OPTION_TRANSLATIONS[placedValue] ||
                  pairs.find((p) => p.correctValue === placedValue)?.correctValueEs ||
                  placedValue
                : '';

              const fieldTranslation =
                pair.fieldEs ||
                DEFAULT_FIELD_TRANSLATIONS[pair.field] ||
                pair.field;

              return (
                <div
                  key={pair.id}
                  className={`grid grid-cols-12 gap-3 sm:gap-4 items-stretch py-3 border-b border-dashed transition-colors border-inherit`}
                >
                  {/* Column A: Reversible Sentence / Field Card */}
                  <div className="col-span-7 sm:col-span-8 perspective-1000 flex">
                    <div
                      id={`field-card-${pair.id}`}
                      onClick={() => handleToggleFlipField(pair.id)}
                      className={`group relative w-full rounded-xl sm:rounded-2xl cursor-pointer select-none transition-transform duration-500 transform-style-3d border shadow-xs min-h-[58px] p-3 sm:p-4 flex items-center ${
                        isFieldFlipped ? 'rotate-y-180' : ''
                      } ${
                        isFieldFlipped
                          ? isDark
                            ? 'bg-[#0F241A] border-emerald-500/40 text-emerald-200'
                            : 'bg-emerald-50/90 border-emerald-300 text-emerald-950 shadow-xs'
                          : isDark
                          ? 'bg-slate-900/60 border-white/10 hover:border-white/20 text-slate-100'
                          : 'bg-white border-slate-200 hover:border-slate-300 text-slate-800'
                      }`}
                      title="Haz clic para voltear entre inglés y español"
                    >
                      {/* Front Face: English with yellow highlighted word */}
                      <div className="absolute inset-0 px-3.5 py-3 flex items-center justify-between backface-hidden gap-2">
                        <div className="flex-1 text-xs sm:text-sm md:text-[15px] font-medium leading-relaxed pr-6">
                          {renderSentenceWithHighlight(pair.field, pair.highlightedWord, false)}
                        </div>

                        {/* Speaker button on sentence */}
                        <button
                          type="button"
                          onClick={(e) => handlePlaySentenceAudio(pair.field, pair.id, e)}
                          className={`p-1.5 rounded-lg transition-all shrink-0 cursor-pointer ${
                            playingSentenceId === pair.id
                              ? 'bg-indigo-600 text-white animate-pulse'
                              : isDark
                              ? 'text-slate-400 hover:text-white hover:bg-white/10'
                              : 'text-slate-400 hover:text-slate-900 hover:bg-slate-100'
                          }`}
                          title="Escuchar oración"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Back Face: Spanish Translation */}
                      <div className="absolute inset-0 px-3.5 py-3 flex items-center justify-between backface-hidden rotate-y-180 gap-2">
                        <div className="flex-1 text-xs sm:text-sm md:text-[15px] font-medium leading-relaxed italic pr-6">
                          {renderSentenceWithHighlight(
                            fieldTranslation,
                            pair.highlightedWordEs || pair.highlightedWord,
                            true
                          )}
                        </div>

                        {/* Speaker button on sentence (speaks English) */}
                        <button
                          type="button"
                          onClick={(e) => handlePlaySentenceAudio(pair.field, pair.id, e)}
                          className={`p-1.5 rounded-lg transition-all shrink-0 cursor-pointer ${
                            playingSentenceId === pair.id
                              ? 'bg-emerald-600 text-white animate-pulse'
                              : isDark
                              ? 'text-emerald-400 hover:text-white hover:bg-white/10'
                              : 'text-emerald-600 hover:text-emerald-950 hover:bg-emerald-100'
                          }`}
                          title="Escuchar oración en inglés"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Column B: Opposites Target Drop Slot / Reversible Placed Card */}
                  <div className="col-span-5 sm:col-span-4 flex items-center">
                    {placedValue ? (
                      <div className="perspective-1000 w-full h-full min-h-[58px] flex">
                        <div
                          id={`placed-slot-${pair.id}`}
                          onClick={(e) => handleToggleFlipSlot(pair.id, e)}
                          className={`relative w-full rounded-xl sm:rounded-2xl cursor-pointer select-none transition-transform duration-500 transform-style-3d border shadow-xs min-h-[58px] p-3 flex items-center justify-between ${
                            isSlotFlipped ? 'rotate-y-180' : ''
                          } ${
                            isCorrect
                              ? isDark
                                ? 'border-emerald-500/50 bg-emerald-950/40 text-emerald-200 ring-1 ring-emerald-500/30'
                                : 'border-emerald-400 bg-emerald-50/90 text-emerald-900 ring-1 ring-emerald-300'
                              : isIncorrect
                              ? isDark
                                ? 'border-rose-500/50 bg-rose-950/40 text-rose-200 ring-1 ring-rose-500/30'
                                : 'border-rose-400 bg-rose-50/90 text-rose-900 ring-1 ring-rose-300'
                              : isSlotFlipped
                              ? isDark
                                ? 'bg-[#0F241A] border-emerald-500/40 text-emerald-200'
                                : 'bg-emerald-50/90 border-emerald-300 text-emerald-950 shadow-xs'
                              : isDark
                              ? 'border-indigo-400/40 bg-indigo-950/30 text-white hover:border-indigo-400'
                              : 'border-indigo-300 bg-indigo-50/70 text-indigo-950 hover:border-indigo-400'
                          }`}
                          title="Toca para voltear traducción"
                        >
                          {/* Front Face: English Placed Item */}
                          <div className="absolute inset-0 px-3 py-2 flex items-center justify-between backface-hidden">
                            <span className="font-semibold text-xs sm:text-sm md:text-base capitalize select-none">
                              {placedValue}
                            </span>

                            <div className="flex items-center gap-1">
                              {isCorrect && (
                                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                              )}
                              {isIncorrect && (
                                <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                              )}
                              {!isSubmitted && (
                                <button
                                  type="button"
                                  onClick={(e) => handleRemoveFromSlot(pair.id, e)}
                                  className={`p-1 rounded-md transition-colors ${
                                    isDark
                                      ? 'hover:bg-white/10 text-white/40 hover:text-white'
                                      : 'hover:bg-slate-200 text-slate-400 hover:text-slate-800'
                                  }`}
                                  title="Quitar opción"
                                >
                                  <X className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>
                          </div>

                          {/* Back Face: Spanish Translation */}
                          <div className="absolute inset-0 px-3 py-2 flex items-center justify-between backface-hidden rotate-y-180">
                            <span className="font-semibold text-xs sm:text-sm md:text-base capitalize italic select-none">
                              {placedTranslation}
                            </span>

                            <div className="flex items-center gap-1">
                              {isCorrect && (
                                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                              )}
                              {isIncorrect && (
                                <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                              )}
                              {!isSubmitted && (
                                <button
                                  type="button"
                                  onClick={(e) => handleRemoveFromSlot(pair.id, e)}
                                  className={`p-1 rounded-md transition-colors ${
                                    isDark
                                      ? 'hover:bg-white/10 text-white/40 hover:text-white'
                                      : 'hover:bg-slate-200 text-slate-400 hover:text-slate-800'
                                  }`}
                                  title="Quitar opción"
                                >
                                  <X className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* Empty Target Slot: Drag Here */
                      <div
                        id={`empty-slot-${pair.id}`}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, pair.id)}
                        onClick={() => handleSlotClick(pair.id)}
                        className={`w-full min-h-[58px] rounded-xl sm:rounded-2xl border-2 border-dashed flex items-center justify-center transition-all cursor-pointer select-none ${
                          selectedPoolItem
                            ? isDark
                              ? 'border-indigo-400 bg-indigo-500/10 text-indigo-300 ring-2 ring-indigo-500/40 animate-pulse'
                              : 'border-indigo-500 bg-indigo-50 text-indigo-700 ring-2 ring-indigo-400/40 animate-pulse'
                            : isDark
                            ? 'border-white/15 bg-white/[0.02] text-slate-500 hover:border-indigo-400/60 hover:bg-white/[0.04]'
                            : 'border-slate-200 bg-slate-50/50 text-slate-400 hover:border-indigo-300 hover:bg-slate-50'
                        }`}
                        title={
                          selectedPoolItem
                            ? 'Haz clic para colocar la opción seleccionada aquí'
                            : 'Arrastra una opción aquí o selecciónala'
                        }
                      >
                        <span className="font-bold text-base sm:text-lg md:text-xl tracking-wide select-none text-slate-400 dark:text-slate-500">
                          Drag Here
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Available Options Pool (Right Side) */}
        <div className="lg:col-span-4 flex flex-col">
          <div
            className={`p-4 sm:p-5 rounded-2xl border transition-colors flex-1 flex flex-col justify-between ${
              isDark ? 'bg-slate-900/40 border-white/10' : 'bg-slate-50/80 border-slate-200'
            }`}
          >
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-inherit mb-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Palabras Disponibles
                </span>
                <span className="text-xs font-mono opacity-60">
                  {optionsPool.filter((opt) => !usedValues.includes(opt)).length} libres
                </span>
              </div>

              {/* Draggable Cards Stack */}
              <div className="space-y-3">
                {optionsPool.map((option) => {
                  const isUsed = usedValues.includes(option);
                  const isSelected = selectedPoolItem === option;
                  const isOptionFlipped = flippedOptionIds.includes(option);
                  const optionTranslation =
                    optionsPoolEs?.[option] ||
                    DEFAULT_OPTION_TRANSLATIONS[option] ||
                    option;

                  return (
                    <div
                      key={option}
                      className="perspective-1000 min-h-[50px] sm:min-h-[54px]"
                    >
                      <div
                        id={`option-card-${option}`}
                        draggable={!isUsed && !isSubmitted}
                        onDragStart={(e) => handleDragStart(e, option)}
                        onClick={() => {
                          if (!isUsed && !isSubmitted) {
                            handlePoolItemClick(option);
                          }
                        }}
                        onDoubleClick={(e) => handleToggleFlipOption(option, e)}
                        className={`relative w-full rounded-xl sm:rounded-2xl cursor-pointer select-none transition-all duration-300 transform-style-3d border shadow-xs min-h-[50px] sm:min-h-[54px] flex items-center justify-between px-4 py-2.5 ${
                          isOptionFlipped ? 'rotate-y-180' : ''
                        } ${
                          isUsed
                            ? isDark
                              ? 'opacity-25 border-white/5 bg-white/5 text-white/30 cursor-not-allowed'
                              : 'opacity-30 border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed'
                            : isSelected
                            ? isDark
                              ? 'border-indigo-400 bg-indigo-600/30 text-white ring-2 ring-indigo-500 shadow-md scale-[1.01]'
                              : 'border-indigo-500 bg-indigo-50 text-indigo-900 ring-2 ring-indigo-400 shadow-md scale-[1.01]'
                            : isOptionFlipped
                            ? isDark
                              ? 'border-emerald-500/40 bg-[#0F241A] text-emerald-200'
                              : 'border-emerald-300 bg-emerald-50/90 text-emerald-950'
                            : isDark
                            ? 'border-white/15 bg-white/10 hover:border-indigo-400 hover:bg-white/15 text-white'
                            : 'border-slate-200 bg-white hover:border-indigo-400 hover:bg-indigo-50/50 text-slate-800'
                        }`}
                        title={
                          isUsed
                            ? 'Palabra colocada'
                            : 'Clic para seleccionar, arrastra al espacio vacío, o doble clic para voltear'
                        }
                      >
                        {/* Front Face: English Option */}
                        <div className="absolute inset-0 px-4 py-2.5 flex items-center justify-between backface-hidden">
                          <span className="text-sm sm:text-base font-medium capitalize select-none">
                            {option}
                          </span>

                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={(e) => handlePlayOptionAudio(option, e)}
                              className={`p-1 rounded-md transition-colors ${
                                isDark
                                  ? 'text-slate-400 hover:text-white hover:bg-white/10'
                                  : 'text-slate-400 hover:text-slate-900 hover:bg-slate-100'
                              }`}
                              title="Pronunciación"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>

                            <button
                              type="button"
                              onClick={(e) => handleToggleFlipOption(option, e)}
                              className={`p-1 rounded-md transition-colors ${
                                isDark
                                  ? 'text-slate-400 hover:text-white hover:bg-white/10'
                                  : 'text-slate-400 hover:text-slate-900 hover:bg-slate-100'
                              }`}
                              title="Voltear a español"
                            >
                              <RotateCw className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Back Face: Spanish Translation */}
                        <div className="absolute inset-0 px-4 py-2.5 flex items-center justify-between backface-hidden rotate-y-180">
                          <span className="text-sm sm:text-base font-medium capitalize italic select-none">
                            {optionTranslation}
                          </span>

                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={(e) => handlePlayOptionAudio(option, e)}
                              className={`p-1 rounded-md transition-colors ${
                                isDark
                                  ? 'text-emerald-400 hover:text-white hover:bg-white/10'
                                  : 'text-emerald-600 hover:text-emerald-950 hover:bg-emerald-100'
                              }`}
                              title="Pronunciación en inglés"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>

                            <button
                              type="button"
                              onClick={(e) => handleToggleFlipOption(option, e)}
                              className={`p-1 rounded-md transition-colors ${
                                isDark
                                  ? 'text-emerald-400 hover:text-white hover:bg-white/10'
                                  : 'text-emerald-600 hover:text-emerald-950 hover:bg-emerald-100'
                              }`}
                              title="Voltear a inglés"
                            >
                              <RotateCw className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Instruction footnote */}
            <div className="mt-4 pt-3 border-t border-inherit text-[11px] font-mono opacity-60 flex flex-col gap-1">
              <span>💡 Arrastra o toca una palabra para colocarla en la columna de opuestos.</span>
              <span>🔄 Toca dos veces o el ícono de giro para ver la traducción.</span>
            </div>
          </div>

          {/* Feedback banner if submitted */}
          {isSubmitted && (
            <div
              className={`mt-4 p-4 rounded-xl border text-xs leading-relaxed animate-in fade-in duration-200 ${
                isAllCorrect
                  ? isDark
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                    : 'bg-emerald-50 border-emerald-200 text-emerald-900'
                  : isDark
                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                  : 'bg-amber-50 border-amber-200 text-amber-900'
              }`}
            >
              <div className="flex items-start gap-2.5">
                {isAllCorrect ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                ) : (
                  <HelpCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                )}
                <div>
                  <span className="font-bold">
                    {isAllCorrect ? '¡Excelente trabajo! ' : 'Respuestas parciales. '}
                  </span>
                  <span>
                    {isAllCorrect
                      ? `Has completado todos los opuestos correctamente (${correctCount}/${pairs.length} aciertos).`
                      : `Has acertado ${correctCount} de ${pairs.length}. Revisa las opciones marcadas en rojo.`}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="mt-5 pt-4 border-t border-dashed flex items-center justify-between gap-2 border-inherit">
            <button
              onClick={handleReset}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono transition-colors cursor-pointer ${
                isDark
                  ? 'text-white/60 hover:text-white hover:bg-white/10'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reiniciar</span>
            </button>

            {!isSubmitted ? (
              <button
                onClick={handleCheckAnswers}
                disabled={!isAllFilled}
                className={`px-5 py-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer shadow-sm ${
                  isAllFilled
                    ? isDark
                      ? 'bg-indigo-600 hover:bg-indigo-500 text-white border border-indigo-400 active:scale-95 shadow-indigo-600/30'
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white active:scale-95'
                    : isDark
                    ? 'bg-white/5 border border-white/10 text-white/30 cursor-not-allowed'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                Comprobar Respuestas
              </button>
            ) : (
              <button
                onClick={handleReset}
                className={`px-5 py-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  isAllCorrect
                    ? isDark
                      ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                    : isDark
                    ? 'bg-indigo-600 hover:bg-indigo-500 text-white'
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                }`}
              >
                {isAllCorrect ? '¡Completado con Éxito!' : 'Intentar de Nuevo'}
              </button>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};
