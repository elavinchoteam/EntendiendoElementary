import React, { useState } from 'react';
import { RotateCcw, Check, Sparkles, CheckCircle2, XCircle } from 'lucide-react';
import { DragWordToImageExercise as DragExerciseType, DragWordToImageItem } from '../types';
import { playFeedbackSound } from '../utils/audio';
import { useTheme } from '../context/ThemeContext';
import { CardSpeechControl } from './CardSpeechControl';

interface DragWordToImageExerciseProps {
  exercise: DragExerciseType;
  accent?: 'US' | 'UK';
  speechRate?: number;
  onSuccess?: () => void;
}

export const DragWordToImageExercise: React.FC<DragWordToImageExerciseProps> = ({
  exercise,
  accent = 'US',
  speechRate = 1.0,
  onSuccess,
}) => {
  const { isDark } = useTheme();

  // Reversible instruction card state
  const [isInstructionFlipped, setIsInstructionFlipped] = useState(false);

  // Placed words map: itemId -> placed word string
  const [placedWords, setPlacedWords] = useState<Record<string, string>>({});
  // Selected word from bank (for click-to-place on mobile/touch)
  const [selectedWord, setSelectedWord] = useState<string | null>(null);

  // Reversible state for each item card: itemId -> boolean
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  // Check state
  const [hasChecked, setHasChecked] = useState(false);
  const [isAllCorrect, setIsAllCorrect] = useState(false);

  const wordBank = exercise.wordBank || ['a cucumber', 'meat', 'dessert', 'a plate', 'lettuce'];
  const items = exercise.items || [];

  // Used words set
  const usedWords = new Set(Object.values(placedWords));

  // Toggle card flip (no button, container click)
  const handleToggleCardFlip = (itemId: string) => {
    playFeedbackSound('click');
    setFlippedCards((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, word: string) => {
    e.dataTransfer.setData('text/plain', word);
    setSelectedWord(word);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, itemId: string) => {
    e.preventDefault();
    const word = e.dataTransfer.getData('text/plain') || selectedWord;
    if (word) {
      playFeedbackSound('click');
      setPlacedWords((prev) => {
        const next = { ...prev };
        // Remove word from any other slot
        Object.keys(next).forEach((k) => {
          if (next[k] === word) delete next[k];
        });
        next[itemId] = word;
        return next;
      });
      setSelectedWord(null);
      setHasChecked(false);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  // Click slot handler
  const handleSlotClick = (itemId: string) => {
    if (selectedWord) {
      playFeedbackSound('click');
      setPlacedWords((prev) => {
        const next = { ...prev };
        Object.keys(next).forEach((k) => {
          if (next[k] === selectedWord) delete next[k];
        });
        next[itemId] = selectedWord;
        return next;
      });
      setSelectedWord(null);
      setHasChecked(false);
    } else if (placedWords[itemId]) {
      // Remove word back to bank
      playFeedbackSound('click');
      setPlacedWords((prev) => {
        const next = { ...prev };
        delete next[itemId];
        return next;
      });
      setHasChecked(false);
    }
  };

  // Check answers
  const handleCheck = () => {
    playFeedbackSound('click');
    setHasChecked(true);

    let allOk = true;
    for (const item of items) {
      if (placedWords[item.id] !== item.wordEn) {
        allOk = false;
        break;
      }
    }

    setIsAllCorrect(allOk);
    if (allOk) {
      playFeedbackSound('correct');
      if (onSuccess) onSuccess();
    } else {
      playFeedbackSound('wrong');
    }
  };

  // Clear answers
  const handleClear = () => {
    playFeedbackSound('click');
    setPlacedWords({});
    setSelectedWord(null);
    setHasChecked(false);
    setIsAllCorrect(false);
  };

  return (
    <div className="w-full flex flex-col gap-6 select-none">
      {/* 1. REVERSIBLE INSTRUCTION CARD (NO FLIP BUTTONS, NO GRADIENTS, WITH AUDIO & SPEED) */}
      <div
        id="act-1-instruction-card"
        onClick={() => {
          playFeedbackSound('click');
          setIsInstructionFlipped((prev) => !prev);
        }}
        className={`w-full p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer shadow-sm relative ${
          isDark
            ? 'bg-slate-900 border-slate-700 hover:border-emerald-500/50 text-slate-100'
            : 'bg-white border-slate-200 hover:border-emerald-400 text-slate-800'
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            <span className="text-[11px] font-mono uppercase font-bold tracking-wider text-emerald-500 block mb-1">
              {isInstructionFlipped ? 'Instrucción (Español)' : 'Instructions (English)'}
            </span>
            <p className="text-base sm:text-lg font-medium leading-snug">
              {isInstructionFlipped
                ? exercise.instructionsEs || 'Arrastra la(s) palabra(s) a la imagen correcta.'
                : exercise.instructions || 'Drag the word/s to the correct image.'}
            </p>
          </div>

          {/* Audio Speech Control with Speeds (Does not flip card on click) */}
          <CardSpeechControl
            textToSpeak={exercise.instructions || 'Drag the words to the correct image.'}
            accent={accent}
            initialSpeed={speechRate}
            gender="female"
            size="md"
          />
        </div>
      </div>

      {/* 2. WORD BANK CHIPS */}
      <div
        id="act-1-word-bank"
        className={`w-full p-4 sm:p-5 rounded-2xl border shadow-sm flex flex-col gap-3 ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
            Banco de palabras
          </span>
          <span className="text-xs text-slate-400">
            {Object.keys(placedWords).length} de {items.length} colocadas
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {wordBank.map((word) => {
            const isUsed = usedWords.has(word);
            const isSelected = selectedWord === word;

            return (
              <div
                key={word}
                draggable={!isUsed}
                onDragStart={(e) => handleDragStart(e, word)}
                onClick={() => {
                  if (!isUsed) {
                    playFeedbackSound('click');
                    setSelectedWord((prev) => (prev === word ? null : word));
                  }
                }}
                className={`group px-4 py-2.5 rounded-xl border text-sm sm:text-base font-semibold transition-all flex items-center gap-2 select-none ${
                  isUsed
                    ? 'opacity-40 bg-slate-200/50 dark:bg-slate-800/40 border-slate-300 dark:border-slate-700 line-through text-slate-400 cursor-not-allowed'
                    : isSelected
                    ? 'bg-emerald-600 text-white border-emerald-500 shadow-md ring-2 ring-emerald-400 scale-105 cursor-pointer'
                    : isDark
                    ? 'bg-slate-800 hover:bg-slate-700 text-slate-100 border-slate-700 hover:border-emerald-500 cursor-grab'
                    : 'bg-white hover:bg-emerald-50 text-slate-800 border-slate-200 hover:border-emerald-300 shadow-xs cursor-grab'
                }`}
              >
                <span>{word}</span>

                {/* Audio button for individual word */}
                {!isUsed && (
                  <CardSpeechControl
                    textToSpeak={word}
                    accent={accent}
                    initialSpeed={speechRate}
                    gender="female"
                    size="sm"
                    className="ml-1"
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. GRID OF IMAGES WITH REVERSIBLE CARDS & DROP ZONES */}
      <div
        className={`grid gap-4 sm:gap-5 ${
          items.length === 6
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
            : items.length <= 4
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
            : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5'
        }`}
      >
        {items.map((item, idx) => {
          const placedWord = placedWords[item.id];
          const isFlipped = !!flippedCards[item.id];
          const isCorrect = hasChecked && placedWord === item.wordEn;
          const isIncorrect = hasChecked && placedWord && placedWord !== item.wordEn;

          return (
            <div
              key={item.id}
              id={`food-image-card-${idx + 1}`}
              onClick={() => handleToggleCardFlip(item.id)}
              className={`rounded-2xl border transition-all cursor-pointer shadow-sm overflow-hidden flex flex-col ${
                isFlipped
                  ? isDark
                    ? 'bg-slate-900 border-emerald-500/60'
                    : 'bg-white border-emerald-400 ring-2 ring-emerald-300/30'
                  : isDark
                  ? 'bg-slate-900 border-slate-800 hover:border-slate-700'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              {/* Top Bar with Number & Card Audio Control */}
              <div
                className={`px-3.5 py-2.5 border-b flex items-center justify-between ${
                  isDark ? 'border-slate-800 bg-slate-900/80' : 'border-slate-100 bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-md bg-emerald-500/10 text-emerald-500 font-mono font-bold text-xs flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <span
                    className={`text-xs font-mono font-medium ${
                      isDark ? 'text-slate-300' : 'text-slate-600'
                    }`}
                  >
                    {isFlipped ? 'Traducción' : 'Item'}
                  </span>
                </div>

                {/* Speaker Control with Speeds (0.5x to 1.30x) */}
                <CardSpeechControl
                  textToSpeak={item.wordEn}
                  accent={accent}
                  initialSpeed={speechRate}
                  gender="female"
                  size="sm"
                />
              </div>

              {/* Card Body: Front = Image & Drop Slot, Back = Clean Translation */}
              {isFlipped ? (
                /* REVERSIBLE BACK: Clean Solid Background, No Gradient, Full Contrast */
                <div className="p-5 flex-1 flex flex-col items-center justify-center text-center min-h-[220px]">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-500 mb-2">
                    Español
                  </span>
                  <p
                    className={`text-2xl font-bold mb-2 capitalize ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    {item.wordEs}
                  </p>
                  <p
                    className={`text-sm font-medium ${
                      isDark ? 'text-slate-300' : 'text-slate-600'
                    }`}
                  >
                    Inglés: <span className="font-semibold text-emerald-400">{item.wordEn}</span>
                  </p>
                </div>
              ) : (
                /* REVERSIBLE FRONT: Image + Drop Zone */
                <div className="p-3.5 flex flex-col gap-3 flex-1">
                  {/* Image Container */}
                  <div className="w-full aspect-4/3 rounded-xl overflow-hidden bg-slate-950/40 relative border border-slate-700/40">
                    <img
                      src={item.imageUrl}
                      alt={item.imageAlt}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Drop Slot Target */}
                  <div
                    onDrop={(e) => handleDrop(e, item.id)}
                    onDragOver={handleDragOver}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSlotClick(item.id);
                    }}
                    className={`min-h-[46px] px-3 py-2 rounded-xl border-2 border-dashed flex items-center justify-center text-center transition-all cursor-pointer ${
                      placedWord
                        ? isCorrect
                          ? 'border-emerald-500 bg-emerald-500/10 text-emerald-500 font-bold'
                          : isIncorrect
                          ? 'border-rose-500 bg-rose-500/10 text-rose-500 font-bold'
                          : isDark
                          ? 'border-emerald-500/60 bg-emerald-950/20 text-emerald-300 font-semibold'
                          : 'border-emerald-500 bg-emerald-50 text-emerald-900 font-semibold'
                        : isDark
                        ? 'border-slate-700 hover:border-emerald-500/50 bg-slate-800/50 text-slate-400'
                        : 'border-slate-300 hover:border-emerald-400 bg-slate-50 text-slate-400'
                    }`}
                  >
                    {placedWord ? (
                      <div className="flex items-center justify-between w-full gap-2">
                        <span className="truncate">{placedWord}</span>
                        {isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />}
                        {isIncorrect && <XCircle className="w-4 h-4 text-rose-500 shrink-0" />}
                      </div>
                    ) : (
                      <span className="text-xs">
                        {selectedWord ? 'Toca para colocar' : 'Arrastra o toca aquí'}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 4. ACTIONS: CHECK & CLEAR */}
      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={handleClear}
          className={`px-4 py-2.5 rounded-xl border font-semibold text-sm transition-all cursor-pointer flex items-center gap-2 ${
            isDark
              ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
              : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300'
          }`}
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reiniciar</span>
        </button>

        <button
          type="button"
          onClick={handleCheck}
          disabled={Object.keys(placedWords).length === 0}
          className={`px-6 py-2.5 rounded-xl font-bold text-sm shadow-md transition-all cursor-pointer flex items-center gap-2 ${
            isAllCorrect
              ? 'bg-emerald-600 text-white shadow-emerald-500/25'
              : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed'
          }`}
        >
          {isAllCorrect ? <Sparkles className="w-4 h-4" /> : <Check className="w-4 h-4" />}
          <span>{isAllCorrect ? '¡Completado con Éxito!' : 'Comprobar Respuestas'}</span>
        </button>
      </div>
    </div>
  );
};
