import React, { useState } from 'react';
import { Volume2, CheckCircle2, XCircle, RotateCcw, Check, Sparkles, HelpCircle, FileText, ChevronDown } from 'lucide-react';
import { MatchingPair, LessonMainText } from '../types';
import { speakEnglish, playFeedbackSound } from '../utils/audio';
import { useTheme } from '../context/ThemeContext';

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
};

export const MatchingTableExercise: React.FC<MatchingTableExerciseProps> = ({
  instructionText = 'Listen to the voice message, and fill the correct information.',
  instructionTextEs = 'Escucha el mensaje de voz, y llena la información correcta.',
  audioPrompt,
  lessonText,
  pairs,
  optionsPool,
  optionsPoolEs,
  accent = 'US',
  speechRate = 1.0,
  onSuccess,
}) => {
  const { isDark } = useTheme();
  const activeLesson = lessonText || defaultLessonTextFallback;

  // Mapping of pair.id -> selected option string (or undefined if empty)
  const [slotValues, setSlotValues] = useState<Record<string, string>>({});
  const [selectedPoolItem, setSelectedPoolItem] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  // Reversible Cards state (individual flip tracking without any indicator text/buttons)
  const [flippedFieldIds, setFlippedFieldIds] = useState<string[]>([]);
  const [flippedOptionIds, setFlippedOptionIds] = useState<string[]>([]);
  const [flippedSlotIds, setFlippedSlotIds] = useState<string[]>([]);

  // Flip card states for instruction and header
  const [isInstructionFlipped, setIsInstructionFlipped] = useState(false);
  const [isColBFlipped, setIsColBFlipped] = useState(false);

  // Activity 1 Reversible Card state
  const [showLessonCard, setShowLessonCard] = useState(false);
  const [isLessonCardFlipped, setIsLessonCardFlipped] = useState(false);
  const [isPlayingLessonAudio, setIsPlayingLessonAudio] = useState(false);
  const [playingSentenceIdx, setPlayingSentenceIdx] = useState<number | null>(null);

  // Determine which options from the pool are currently used
  const usedValues = Object.values(slotValues);
  const availablePool = optionsPool.filter((opt) => !usedValues.includes(opt));

  const handlePlayAudio = () => {
    if (!audioPrompt) return;
    if (isSpeaking) {
      window.speechSynthesis?.cancel();
      setIsSpeaking(false);
      return;
    }
    setIsSpeaking(true);
    speakEnglish(
      audioPrompt,
      speechRate,
      (accent as 'US' | 'UK') || 'US',
      () => setIsSpeaking(true),
      () => setIsSpeaking(false)
    );
  };

  const handleToggleLessonAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPlayingLessonAudio) {
      window.speechSynthesis?.cancel();
      setIsPlayingLessonAudio(false);
      setPlayingSentenceIdx(null);
      return;
    }
    const textToPlay = activeLesson.audioText || activeLesson.textEn;
    setIsPlayingLessonAudio(true);
    speakEnglish(
      textToPlay,
      speechRate,
      (accent as 'US' | 'UK') || 'US',
      () => setIsPlayingLessonAudio(true),
      () => {
        setIsPlayingLessonAudio(false);
        setPlayingSentenceIdx(null);
      }
    );
  };

  const handlePlaySentence = (sentence: string, idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    window.speechSynthesis?.cancel();
    setPlayingSentenceIdx(idx);
    setIsPlayingLessonAudio(false);
    speakEnglish(
      sentence,
      speechRate,
      (accent as 'US' | 'UK') || 'US',
      () => setPlayingSentenceIdx(idx),
      () => setPlayingSentenceIdx(null)
    );
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

    // Place item in this slot
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
    // If a pool item is selected, assign it
    if (selectedPoolItem) {
      playFeedbackSound('click');
      assignItemToSlot(pairId, selectedPoolItem);
      setSelectedPoolItem(null);
    } else if (slotValues[pairId]) {
      // If clicking an already filled slot with no pool item selected, remove it
      playFeedbackSound('click');
      removeSlotValue(pairId);
    }
  };

  const assignItemToSlot = (pairId: string, item: string) => {
    setSlotValues((prev) => {
      const next = { ...prev };
      // If this item was already in another slot, remove it from that slot
      Object.keys(next).forEach((k) => {
        if (next[k] === item) delete next[k];
      });
      next[pairId] = item;
      return next;
    });
  };

  const removeSlotValue = (pairId: string) => {
    setSlotValues((prev) => {
      const next = { ...prev };
      delete next[pairId];
      return next;
    });
  };

  const handleToggleFlipField = (id: string) => {
    playFeedbackSound('flip');
    setFlippedFieldIds((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const handleToggleFlipOption = (option: string) => {
    playFeedbackSound('flip');
    setFlippedOptionIds((prev) =>
      prev.includes(option) ? prev.filter((item) => item !== option) : [...prev, option]
    );
    if (!isSubmitted) {
      setSelectedPoolItem((prev) => (prev === option ? null : option));
    }
  };

  const handleToggleFlipSlot = (pairId: string) => {
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

  // Calculate score
  const correctCount = pairs.filter((p) => slotValues[p.id] === p.correctValue).length;
  const isAllCorrect = correctCount === pairs.length;

  return (
    <div className={`w-full rounded-2xl border transition-colors duration-200 ${
      isDark ? 'bg-[#111827] border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-sm'
    }`}>
      
      {/* Exercise Header Banner with Reversible Instruction Card */}
      <div className={`p-4 sm:p-5 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
        isDark ? 'border-white/10 bg-white/5' : 'border-slate-100 bg-slate-50/70'
      }`}>
        {/* Reversible Instruction Card (Click anywhere to flip) */}
        <div className="flex-1 perspective-1000 min-h-[68px]">
          <div
            id="matching-instruction-card"
            onClick={() => {
              playFeedbackSound('flip');
              setIsInstructionFlipped((prev) => !prev);
            }}
            className={`relative w-full min-h-[68px] rounded-2xl cursor-pointer select-none transition-transform duration-500 transform-style-3d border shadow-xs ${
              isInstructionFlipped ? 'rotate-y-180' : ''
            } ${
              isInstructionFlipped
                ? isDark
                  ? 'bg-gradient-to-r from-emerald-950/50 via-[#0F291E] to-emerald-950/40 border-emerald-500/30 text-emerald-200'
                  : 'bg-gradient-to-r from-emerald-50 via-white to-emerald-50/80 border-emerald-200 text-emerald-900'
                : isDark
                ? 'bg-white/5 border-white/10 hover:border-white/20 text-white'
                : 'bg-white border-slate-200 hover:border-slate-300 text-slate-800'
            }`}
          >
            {/* Front: English Instruction */}
            <div className="absolute inset-0 p-3.5 sm:p-4 flex items-center gap-3 backface-hidden">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                isDark ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30' : 'bg-indigo-100 text-indigo-600'
              }`}>
                <Volume2 className="w-4 h-4" />
              </div>
              <h4 className={`text-xs sm:text-sm md:text-base font-semibold leading-snug ${
                isDark ? 'text-white' : 'text-slate-800'
              }`}>
                {instructionText}
              </h4>
            </div>

            {/* Back: Spanish Exact Translation */}
            <div className="absolute inset-0 p-3.5 sm:p-4 flex items-center gap-3 backface-hidden rotate-y-180">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                isDark ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-emerald-100 text-emerald-700'
              }`}>
                <Volume2 className="w-4 h-4" />
              </div>
              <p className={`text-xs sm:text-sm md:text-base font-medium leading-snug italic ${
                isDark ? 'text-emerald-200' : 'text-emerald-900'
              }`}>
                {instructionTextEs}
              </p>
            </div>
          </div>
        </div>

        {/* Audio control button - only image icon, no text */}
        {audioPrompt && (
          <button
            id="matching-audio-play-btn"
            onClick={(e) => {
              e.stopPropagation();
              handlePlayAudio();
            }}
            className={`p-3 rounded-xl transition-all cursor-pointer shrink-0 shadow-xs flex items-center justify-center ${
              isSpeaking
                ? 'bg-rose-600 hover:bg-rose-700 text-white animate-pulse'
                : isDark
                ? 'bg-indigo-600 hover:bg-indigo-500 text-white border border-indigo-400'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white'
            }`}
            title={isSpeaking ? 'Detener audio' : 'Escuchar mensaje'}
            aria-label={isSpeaking ? 'Detener audio' : 'Escuchar mensaje'}
          >
            <Volume2 className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Activity 1 Card Toggle Button & Reversible Card (Positioned at green line) */}
      <div className={`px-5 py-3 border-b flex flex-col gap-3 transition-colors ${
        isDark ? 'border-white/10 bg-white/[0.02]' : 'border-slate-100 bg-slate-50/40'
      }`}>
        <div className="flex items-center justify-between">
          <button
            id="toggle-activity1-card-btn"
            type="button"
            onClick={() => {
              playFeedbackSound('click');
              setShowLessonCard((prev) => !prev);
            }}
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-bold tracking-wide transition-all cursor-pointer border shadow-xs ${
              showLessonCard
                ? isDark
                  ? 'bg-indigo-600/30 text-indigo-300 border-indigo-500/40'
                  : 'bg-indigo-50 text-indigo-700 border-indigo-200'
                : isDark
                ? 'bg-white/5 hover:bg-white/10 text-white/80 hover:text-white border-white/15 hover:border-white/25'
                : 'bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 border-slate-200 hover:border-slate-300'
            }`}
            title={showLessonCard ? 'Ocultar tarjeta de texto' : 'Ver tarjeta de texto de la Actividad 1'}
          >
            <FileText className="w-3.5 h-3.5 text-indigo-500" />
            <span>{showLessonCard ? 'Ocultar Texto de la Tarjeta' : 'Ver Texto de la Tarjeta'}</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${showLessonCard ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* When expanded: The exact reversible card from Activity 1 */}
        {showLessonCard && (
          <div className="w-full perspective-1000 my-2 animate-in fade-in slide-in-from-top-2 duration-300">
            <div
              id="activity1-embedded-card"
              onClick={() => {
                playFeedbackSound('flip');
                setIsLessonCardFlipped((prev) => !prev);
              }}
              className={`relative w-full min-h-[340px] rounded-2xl sm:rounded-3xl cursor-pointer select-none transition-transform duration-500 transform-style-3d border shadow-xl ${
                isLessonCardFlipped ? 'rotate-y-180' : ''
              } ${
                isLessonCardFlipped
                  ? isDark
                    ? 'bg-gradient-to-br from-[#0F291E] via-[#0F172A] to-[#0D1F17] border-emerald-500/30 text-white'
                    : 'bg-gradient-to-br from-emerald-50/70 via-white to-emerald-50/40 border-emerald-200 text-slate-900 shadow-md'
                  : isDark
                  ? 'bg-gradient-to-br from-[#1A1F36] via-[#0F172A] to-[#16192E] border-white/10 text-white'
                  : 'bg-gradient-to-br from-indigo-50/70 via-white to-indigo-50/40 border-indigo-200 text-slate-900 shadow-md'
              }`}
            >
              {/* Front Face: English text with clickable sentences and audio button */}
              <div className="absolute inset-0 w-full h-full p-6 sm:p-8 flex flex-col justify-between backface-hidden">
                {/* Header with audio button */}
                <div className="flex items-center justify-between gap-3 pb-3 border-b border-inherit">
                  <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider ${
                    isDark ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' : 'bg-indigo-100 text-indigo-800 border border-indigo-200'
                  }`}>
                    English
                  </span>

                  <button
                    id="embedded-card-audio-btn-front"
                    type="button"
                    onClick={handleToggleLessonAudio}
                    className={`p-2.5 rounded-xl transition-all cursor-pointer shadow-xs ${
                      isPlayingLessonAudio
                        ? 'bg-rose-600 hover:bg-rose-700 text-white animate-pulse'
                        : isDark
                        ? 'bg-indigo-600 hover:bg-indigo-500 text-white border border-indigo-400'
                        : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                    }`}
                    title={isPlayingLessonAudio ? 'Detener pronunciación' : 'Escuchar pronunciación'}
                    aria-label={isPlayingLessonAudio ? 'Detener pronunciación' : 'Pronunciación'}
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Sentences with individual pronunciation */}
                <div className="my-auto py-4">
                  <p className="text-base sm:text-lg md:text-xl leading-relaxed sm:leading-loose font-sans font-medium tracking-tight">
                    {activeLesson.sentences.map((sent, idx) => {
                      const isCurrent = playingSentenceIdx === idx;
                      return (
                        <span
                          key={idx}
                          onClick={(e) => handlePlaySentence(sent.en, idx, e)}
                          className={`inline cursor-pointer rounded-lg px-1.5 py-0.5 transition-all duration-150 mx-0.5 ${
                            isCurrent
                              ? isDark
                                ? 'bg-indigo-500 text-white font-bold ring-2 ring-indigo-400'
                                : 'bg-indigo-600 text-white font-bold ring-2 ring-indigo-300'
                              : isDark
                              ? 'hover:bg-indigo-500/20 text-slate-100 hover:text-white'
                              : 'hover:bg-indigo-100 text-slate-800 hover:text-indigo-950'
                          }`}
                          title="Toca para escuchar esta oración"
                        >
                          {sent.en}{' '}
                        </span>
                      );
                    })}
                  </p>
                </div>
              </div>

              {/* Back Face: Spanish Translation */}
              <div className="absolute inset-0 w-full h-full p-6 sm:p-8 flex flex-col justify-between backface-hidden rotate-y-180">
                {/* Header with audio button */}
                <div className="flex items-center justify-between gap-3 pb-3 border-b border-inherit">
                  <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider ${
                    isDark ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                  }`}>
                    Español
                  </span>

                  <button
                    id="embedded-card-audio-btn-back"
                    type="button"
                    onClick={handleToggleLessonAudio}
                    className={`p-2.5 rounded-xl transition-all cursor-pointer shadow-xs ${
                      isPlayingLessonAudio
                        ? 'bg-rose-600 hover:bg-rose-700 text-white animate-pulse'
                        : isDark
                        ? 'bg-emerald-600 hover:bg-emerald-500 text-white border border-emerald-400'
                        : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                    }`}
                    title={isPlayingLessonAudio ? 'Detener pronunciación' : 'Escuchar pronunciación en inglés'}
                    aria-label={isPlayingLessonAudio ? 'Detener pronunciación' : 'Pronunciación'}
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Spanish translation text */}
                <div className="my-auto py-4">
                  <p className="text-base sm:text-lg md:text-xl leading-relaxed sm:leading-loose font-serif italic text-emerald-950 dark:text-emerald-100">
                    "{activeLesson.textEs}"
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Grid: Column A & Column B (Left) + Available Options Pool (Right) */}
      <div className="p-5 sm:p-7 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
        
        {/* Table Columns A and B */}
        <div className="lg:col-span-7 flex flex-col">
          
          {/* Table Header row */}
          <div className="grid grid-cols-12 gap-3 pb-2.5 border-b border-dashed font-mono font-bold text-xs uppercase tracking-wider mb-2 items-center">
            <div className={`col-span-5 font-mono font-bold text-xs uppercase tracking-wider ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`}>
              A
            </div>
            <div className="col-span-7 perspective-1000">
              {/* Column B Reversible Header Card */}
              <div
                id="header-col-b-flip-card"
                onClick={() => {
                  playFeedbackSound('flip');
                  setIsColBFlipped((prev) => !prev);
                }}
                className={`relative inline-flex items-center justify-center cursor-pointer select-none transition-transform duration-500 transform-style-3d min-w-[170px] h-7 ${
                  isColBFlipped ? 'rotate-y-180' : ''
                }`}
              >
                {/* Front: English */}
                <span className={`absolute inset-0 px-3 py-1 rounded-lg border font-mono font-bold text-xs uppercase tracking-wider whitespace-nowrap backface-hidden flex items-center justify-center transition-colors ${
                  isDark
                    ? 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30 hover:border-indigo-400'
                    : 'bg-indigo-50 text-indigo-600 border-indigo-200 hover:border-indigo-300'
                }`}>
                  B (DRAG HERE)
                </span>

                {/* Back: Spanish Translation */}
                <span className={`absolute inset-0 px-3 py-1 rounded-lg border font-mono font-bold text-xs uppercase tracking-wider whitespace-nowrap backface-hidden rotate-y-180 flex items-center justify-center transition-colors ${
                  isDark
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                    : 'bg-emerald-100 text-emerald-800 border-emerald-300'
                }`}>
                  B (ARRASTRA AQUÍ)
                </span>
              </div>
            </div>
          </div>

          {/* Rows */}
          <div className="space-y-3">
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

              return (
                <div
                  key={pair.id}
                  className={`grid grid-cols-12 gap-3 items-center py-2 border-b border-dashed transition-colors ${
                    isDark ? 'border-white/10' : 'border-slate-200'
                  }`}
                >
                  {/* Column A: Reversible Field Label Card */}
                  <div className="col-span-5 perspective-1000 min-h-[48px] sm:min-h-[52px]">
                    <div
                      id={`field-card-${pair.id}`}
                      onClick={() => handleToggleFlipField(pair.id)}
                      className={`relative w-full h-full min-h-[48px] sm:min-h-[52px] rounded-xl cursor-pointer select-none transition-transform duration-500 transform-style-3d border shadow-xs ${
                        isFieldFlipped ? 'rotate-y-180' : ''
                      } ${
                        isFieldFlipped
                          ? isDark
                            ? 'bg-[#0F241A] border-emerald-500/40 text-emerald-200'
                            : 'bg-emerald-50/90 border-emerald-300 text-emerald-950 shadow-xs'
                          : isDark
                          ? 'bg-slate-900/50 border-white/10 hover:border-white/20 text-slate-100'
                          : 'bg-white border-slate-200 hover:border-slate-300 text-slate-800'
                      }`}
                    >
                      {/* Front Face: English */}
                      <div className="absolute inset-0 px-3 py-2 flex items-center backface-hidden">
                        <span className="font-medium text-xs sm:text-sm leading-tight select-none">
                          {pair.field}
                        </span>
                      </div>

                      {/* Back Face: Spanish Translation */}
                      <div className="absolute inset-0 px-3 py-2 flex items-center backface-hidden rotate-y-180">
                        <span className="font-medium text-xs sm:text-sm leading-tight italic select-none">
                          {pair.fieldEs || DEFAULT_FIELD_TRANSLATIONS[pair.field] || pair.field}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Column B: Drop / Slot Target */}
                  <div className="col-span-7">
                    {placedValue ? (
                      <div className="perspective-1000 min-h-[48px] sm:min-h-[52px]">
                        <div
                          id={`slot-card-${pair.id}`}
                          onClick={() => handleToggleFlipSlot(pair.id)}
                          className={`relative w-full h-full min-h-[48px] sm:min-h-[52px] rounded-xl cursor-pointer select-none transition-transform duration-500 transform-style-3d border-2 shadow-xs ${
                            isSlotFlipped ? 'rotate-y-180' : ''
                          } ${
                            isSubmitted
                              ? isCorrect
                                ? isDark
                                  ? 'border-emerald-500 bg-emerald-500/15 text-emerald-300 font-medium'
                                  : 'border-emerald-500 bg-emerald-50 text-emerald-900 font-medium'
                                : isDark
                                ? 'border-rose-500 bg-rose-500/15 text-rose-300 font-medium'
                                : 'border-rose-400 bg-rose-50 text-rose-900 font-medium'
                              : isDark
                              ? 'border-indigo-500/60 bg-indigo-500/10 text-white font-medium'
                              : 'border-indigo-400 bg-indigo-50/70 text-indigo-950 font-medium'
                          }`}
                        >
                          {/* Front Face: Placed text in English */}
                          <div className="absolute inset-0 px-3 py-2 flex items-center justify-between backface-hidden">
                            <span className="text-xs sm:text-sm font-sans truncate select-none">
                              {placedValue}
                            </span>
                            <div className="flex items-center gap-1.5 shrink-0 ml-2">
                              {isSubmitted ? (
                                isCorrect ? (
                                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                ) : (
                                  <XCircle className="w-4 h-4 text-rose-500" />
                                )
                              ) : (
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    playFeedbackSound('click');
                                    removeSlotValue(pair.id);
                                  }}
                                  className={`text-[10px] uppercase font-mono px-1.5 py-0.5 rounded cursor-pointer ${
                                    isDark
                                      ? 'bg-white/10 text-white/60 hover:text-white hover:bg-white/20'
                                      : 'bg-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-300'
                                  }`}
                                  aria-label="Quitar"
                                >
                                  ✕
                                </button>
                              )}
                            </div>
                          </div>

                          {/* Back Face: Placed text in Spanish */}
                          <div className="absolute inset-0 px-3 py-2 flex items-center justify-between backface-hidden rotate-y-180">
                            <span className="text-xs sm:text-sm font-sans italic truncate select-none">
                              {placedTranslation}
                            </span>
                            <div className="flex items-center gap-1.5 shrink-0 ml-2">
                              {isSubmitted ? (
                                isCorrect ? (
                                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                ) : (
                                  <XCircle className="w-4 h-4 text-rose-500" />
                                )
                              ) : (
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    playFeedbackSound('click');
                                    removeSlotValue(pair.id);
                                  }}
                                  className={`text-[10px] uppercase font-mono px-1.5 py-0.5 rounded cursor-pointer ${
                                    isDark
                                      ? 'bg-white/10 text-white/60 hover:text-white hover:bg-white/20'
                                      : 'bg-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-300'
                                  }`}
                                  aria-label="Quitar"
                                >
                                  ✕
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, pair.id)}
                        onClick={() => handleSlotClick(pair.id)}
                        className={`min-h-[48px] sm:min-h-[52px] px-3 py-2 rounded-xl border-2 transition-all flex items-center justify-center cursor-pointer ${
                          selectedPoolItem
                            ? isDark
                              ? 'border-dashed border-indigo-400 bg-indigo-500/10 animate-pulse text-indigo-300 text-xs font-mono'
                              : 'border-dashed border-indigo-400 bg-indigo-50 animate-pulse text-indigo-600 text-xs font-mono'
                            : isDark
                            ? 'border-dashed border-white/15 bg-white/5 text-white/30 text-xs font-mono hover:border-white/30'
                            : 'border-dashed border-slate-300 bg-slate-50 text-slate-400 text-xs font-mono hover:border-slate-400'
                        }`}
                      >
                        <span className="select-none tracking-wide text-center w-full">
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

        {/* Options Pool (Right Column) */}
        <div className={`lg:col-span-5 p-4 sm:p-5 rounded-2xl border flex flex-col justify-between ${
          isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'
        }`}>
          <div>
            <div className="flex flex-col gap-2.5">
              {optionsPool.map((option) => {
                const isUsed = usedValues.includes(option);
                const isSelected = selectedPoolItem === option;
                const isOptionFlipped = flippedOptionIds.includes(option);
                const optionTranslation =
                  optionsPoolEs?.[option] ||
                  DEFAULT_OPTION_TRANSLATIONS[option] ||
                  pairs.find((p) => p.correctValue === option)?.correctValueEs ||
                  option;

                return (
                  <div
                    key={option}
                    className="perspective-1000 w-full min-h-[48px] sm:min-h-[52px]"
                  >
                    <div
                      id={`option-card-${option.replace(/[^a-zA-Z0-9]/g, '-')}`}
                      draggable={!isUsed && !isSubmitted}
                      onDragStart={(e) => handleDragStart(e, option)}
                      onClick={() => !isUsed && handleToggleFlipOption(option)}
                      className={`relative w-full h-full min-h-[48px] sm:min-h-[52px] rounded-xl cursor-pointer select-none transition-transform duration-500 transform-style-3d border shadow-xs ${
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
                    >
                      {/* Front Face: English Option */}
                      <div className="absolute inset-0 px-4 py-2.5 flex items-center backface-hidden">
                        <span className="text-xs sm:text-sm font-medium leading-snug select-none">
                          {option}
                        </span>
                      </div>

                      {/* Back Face: Spanish Translation */}
                      <div className="absolute inset-0 px-4 py-2.5 flex items-center backface-hidden rotate-y-180">
                        <span className="text-xs sm:text-sm font-medium leading-snug italic select-none">
                          {optionTranslation}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Feedback banner if submitted */}
          {isSubmitted && (
            <div className={`mt-4 p-3.5 rounded-xl border text-xs leading-relaxed animate-in fade-in duration-200 ${
              isAllCorrect
                ? isDark
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                  : 'bg-emerald-50 border-emerald-200 text-emerald-900'
                : isDark
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                : 'bg-amber-50 border-amber-200 text-amber-900'
            }`}>
              <div className="flex items-start gap-2">
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
                      ? 'Has completado toda la información del buzón de voz correctamente (5/5 aciertos).'
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
