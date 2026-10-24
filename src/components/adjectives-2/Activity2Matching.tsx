import React, { useState } from 'react';
import {
  RotateCcw,
  Check,
  CheckCircle2,
  XCircle,
  Volume2,
  ArrowRight,
} from 'lucide-react';
import {
  ADJECTIVES_OPPOSITES,
  OppositeMatchItem,
} from '../../data/adjectives2Data';
import { speakEnglish, stopSpeaking, playFeedbackSound } from '../../utils/audio';
import { useTheme } from '../../context/ThemeContext';
import { ReversibleTextCard } from './ReversibleTextCard';

interface Activity2MatchingProps {
  speed: number;
  accent?: 'US' | 'UK';
  onNextActivity?: () => void;
}

export const Activity2Matching: React.FC<Activity2MatchingProps> = ({
  speed,
  accent = 'US',
  onNextActivity,
}) => {
  const { isDark } = useTheme();

  // Matched state: { [itemAId]: wordB | null }
  const [matches, setMatches] = useState<Record<string, string | null>>(() => {
    const init: Record<string, string | null> = {};
    ADJECTIVES_OPPOSITES.forEach((item) => {
      init[item.id] = null;
    });
    return init;
  });

  // Selected item from bank (for click-to-place support)
  const [selectedBankWord, setSelectedBankWord] = useState<string | null>(null);

  // Drag over target slot id
  const [dragOverSlotId, setDragOverSlotId] = useState<string | null>(null);

  // Check state
  const [isChecked, setIsChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // Available bank items
  const placedWords = Object.values(matches).filter(Boolean) as string[];
  const allOpposites = ADJECTIVES_OPPOSITES.map((item) => item.oppositeB);
  // Initial order as seen in screenshot: best, angry, quick, easy, wonderful, strong, pretty
  const bankWordsOrder = [
    'best',
    'angry',
    'quick',
    'easy',
    'wonderful',
    'strong',
    'pretty',
  ];

  const handleDragStart = (e: React.DragEvent, word: string) => {
    e.dataTransfer.setData('text/plain', word);
  };

  const handleDrop = (e: React.DragEvent, pairId: string) => {
    e.preventDefault();
    setDragOverSlotId(null);
    if (isChecked) return;
    const word = e.dataTransfer.getData('text/plain');
    if (!word) return;

    playFeedbackSound('click');
    setMatches((prev) => {
      const next = { ...prev };
      // If this word was already placed elsewhere, clear that slot
      Object.keys(next).forEach((k) => {
        if (next[k] === word) next[k] = null;
      });
      next[pairId] = word;
      return next;
    });
    setSelectedBankWord(null);
  };

  const handleSlotClick = (pairId: string) => {
    if (isChecked) return;

    if (selectedBankWord) {
      // Place selected bank word
      playFeedbackSound('click');
      setMatches((prev) => {
        const next = { ...prev };
        Object.keys(next).forEach((k) => {
          if (next[k] === selectedBankWord) next[k] = null;
        });
        next[pairId] = selectedBankWord;
        return next;
      });
      setSelectedBankWord(null);
    } else if (matches[pairId]) {
      // Remove placed word
      playFeedbackSound('click');
      setMatches((prev) => ({ ...prev, [pairId]: null }));
    }
  };

  const handleBankWordClick = (word: string) => {
    if (isChecked) return;
    playFeedbackSound('click');
    if (selectedBankWord === word) {
      setSelectedBankWord(null);
    } else {
      setSelectedBankWord(word);
    }
  };

  const handleCheck = () => {
    playFeedbackSound('click');
    let allRight = true;
    for (const item of ADJECTIVES_OPPOSITES) {
      if (matches[item.id] !== item.oppositeB) {
        allRight = false;
        break;
      }
    }
    setIsChecked(true);
    setIsCorrect(allRight);
    playFeedbackSound(allRight ? 'correct' : 'wrong');
  };

  const handleReset = () => {
    playFeedbackSound('click');
    const init: Record<string, string | null> = {};
    ADJECTIVES_OPPOSITES.forEach((item) => {
      init[item.id] = null;
    });
    setMatches(init);
    setIsChecked(false);
    setIsCorrect(false);
    setSelectedBankWord(null);
  };

  const allFilled = ADJECTIVES_OPPOSITES.every((item) => Boolean(matches[item.id]));

  return (
    <div className="w-full flex flex-col gap-6 animate-in fade-in duration-200">
      {/* 1. Instruction Card */}
      <ReversibleTextCard
        textEn="Match the words to their opposites."
        textEs="Une las palabras con sus opuestos."
        speed={speed}
        accent={accent}
      />

      {/* 2. Main Matching Area */}
      <div
        className={`w-full rounded-2xl border p-5 sm:p-7 shadow-lg flex flex-col lg:flex-row gap-6 items-start ${
          isDark
            ? 'bg-slate-900 border-slate-800 text-slate-100'
            : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Left Column: Column A vs Column B Table */}
        <div className="flex-1 w-full flex flex-col gap-3">
          {/* Table Headers */}
          <div className="flex items-center text-xs font-mono font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 border-b border-slate-200 dark:border-slate-800 pb-2 px-3">
            <span className="w-1/2">A</span>
            <span className="w-1/2">B</span>
          </div>

          {/* Rows */}
          <div className="flex flex-col gap-2.5">
            {ADJECTIVES_OPPOSITES.map((item) => {
              const placedWord = matches[item.id];
              const isSlotCorrect = isChecked && placedWord === item.oppositeB;
              const isSlotWrong = isChecked && placedWord && placedWord !== item.oppositeB;
              const isDragOver = dragOverSlotId === item.id;

              return (
                <div
                  key={item.id}
                  className={`flex items-center gap-3 p-2.5 rounded-xl border transition-all ${
                    isDark
                      ? 'bg-slate-800/40 border-slate-700/60'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  {/* Column A: Word A */}
                  <div className="w-1/2 flex items-center justify-between pr-3 border-r border-slate-200 dark:border-slate-700">
                    <div className="flex flex-col">
                      <span className="text-sm sm:text-base font-bold capitalize">
                        {item.wordA}
                      </span>
                      <span className="text-xs font-serif italic text-slate-400">
                        {item.wordATranslation}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => speakEnglish(item.wordA, speed, accent)}
                      className="w-7 h-7 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center text-sky-600 dark:text-sky-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                      title={`Escuchar "${item.wordA}"`}
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Column B: Drop / Target Slot */}
                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDragOverSlotId(item.id);
                    }}
                    onDragLeave={() => setDragOverSlotId(null)}
                    onDrop={(e) => handleDrop(e, item.id)}
                    onClick={() => handleSlotClick(item.id)}
                    className={`w-1/2 min-h-[46px] rounded-xl border-2 border-dashed flex items-center justify-between px-3 transition-all cursor-pointer ${
                      placedWord
                        ? isSlotCorrect
                          ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold'
                          : isSlotWrong
                          ? 'border-rose-500 bg-rose-500/10 text-rose-600 dark:text-rose-400 font-bold'
                          : isDark
                          ? 'border-sky-500 bg-sky-950/30 text-sky-300 font-bold'
                          : 'border-sky-500 bg-sky-50 text-sky-800 font-bold'
                        : isDragOver
                        ? 'border-sky-400 bg-sky-100 dark:bg-sky-900/40'
                        : isDark
                        ? 'border-slate-700 bg-slate-800/30 text-slate-500 hover:border-slate-500'
                        : 'border-slate-300 bg-white text-slate-400 hover:border-slate-400'
                    }`}
                  >
                    {placedWord ? (
                      <>
                        <span className="text-sm font-bold capitalize">
                          {placedWord}
                        </span>
                        {isChecked && (
                          <span>
                            {isSlotCorrect ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                            ) : (
                              <XCircle className="w-4 h-4 text-rose-500" />
                            )}
                          </span>
                        )}
                      </>
                    ) : (
                      <span className="text-xs font-mono select-none">
                        Drag Here
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Bank of Opposites to Drag/Click */}
        <div className="w-full lg:w-56 shrink-0 flex flex-col gap-2.5">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Opciones
          </span>

          <div className="flex flex-wrap lg:flex-col gap-2">
            {bankWordsOrder.map((word) => {
              const isPlaced = placedWords.includes(word);
              const isSelected = selectedBankWord === word;

              return (
                <div
                  key={word}
                  draggable={!isPlaced && !isChecked}
                  onDragStart={(e) => handleDragStart(e, word)}
                  onClick={() => !isPlaced && handleBankWordClick(word)}
                  className={`w-full py-2.5 px-4 rounded-xl border text-center font-bold text-sm select-none transition-all cursor-pointer ${
                    isPlaced
                      ? 'opacity-30 border-transparent bg-slate-200 dark:bg-slate-800 pointer-events-none'
                      : isSelected
                      ? 'border-sky-500 bg-sky-500 text-white shadow-md scale-102'
                      : isDark
                      ? 'bg-slate-800 border-slate-700 text-slate-100 hover:border-sky-400 hover:bg-slate-750 shadow-xs'
                      : 'bg-white border-slate-200 text-slate-800 hover:border-sky-400 hover:bg-sky-50/50 shadow-xs'
                  }`}
                >
                  {word}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. Action Buttons & Feedback */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={handleReset}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            isDark
              ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
              : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300 shadow-xs'
          }`}
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reiniciar</span>
        </button>

        <div className="flex items-center gap-2">
          {!isChecked ? (
            <button
              type="button"
              disabled={!allFilled}
              onClick={handleCheck}
              className={`flex items-center gap-2 px-7 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white shadow-md transition-all ${
                allFilled
                  ? 'bg-sky-600 hover:bg-sky-500 hover:scale-102 active:scale-95 cursor-pointer'
                  : 'bg-slate-400 dark:bg-slate-700 opacity-60 cursor-not-allowed'
              }`}
            >
              <Check className="w-4 h-4" />
              <span>Comprobar</span>
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <span
                className={`text-xs sm:text-sm font-bold flex items-center gap-1.5 ${
                  isCorrect
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : 'text-rose-600 dark:text-rose-400'
                }`}
              >
                {isCorrect ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    ¡Excelente trabajo!
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4" />
                    Algunos opuestos son incorrectos
                  </>
                )}
              </span>

              {onNextActivity && (
                <button
                  type="button"
                  onClick={onNextActivity}
                  className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs sm:text-sm font-bold shadow-md transition-all cursor-pointer"
                >
                  <span>Siguiente Actividad</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
