import React, { useState } from 'react';
import { Check, RotateCcw, ArrowRight } from 'lucide-react';
import {
  NUTRITION_MATCHING_ITEMS,
  NUTRITION_MATCHING_BANK,
  MatchingPhraseItem,
} from '../../data/nutritionData';
import { ReversibleCard } from './ReversibleCard';
import { playFeedbackSound } from '../../utils/audio';
import { useTheme } from '../../context/ThemeContext';

interface NutritionMatchingActivityProps {
  speed: number;
  accent?: 'US' | 'UK';
  onNextActivity?: () => void;
}

export const NutritionMatchingActivity: React.FC<NutritionMatchingActivityProps> = ({
  speed,
  accent = 'US',
  onNextActivity,
}) => {
  const { isDark } = useTheme();

  // Mapping of itemId -> dropped word from bank
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSelectWordFromBank = (word: string) => {
    if (isSubmitted) return;
    playFeedbackSound('click');
    setSelectedWord((prev) => (prev === word ? null : word));
  };

  const handlePlaceWord = (itemId: string) => {
    if (isSubmitted) return;
    if (selectedWord) {
      playFeedbackSound('click');
      setMatches((prev) => ({
        ...prev,
        [itemId]: selectedWord,
      }));
      setSelectedWord(null);
    } else if (matches[itemId]) {
      // Remove word back to bank
      playFeedbackSound('click');
      setMatches((prev) => {
        const next = { ...prev };
        delete next[itemId];
        return next;
      });
    }
  };

  const handleDrop = (e: React.DragEvent, itemId: string) => {
    e.preventDefault();
    if (isSubmitted) return;
    const word = e.dataTransfer.getData('text/plain');
    if (word) {
      playFeedbackSound('click');
      setMatches((prev) => ({
        ...prev,
        [itemId]: word,
      }));
    }
  };

  const handleDragStart = (e: React.DragEvent, word: string) => {
    if (isSubmitted) return;
    e.dataTransfer.setData('text/plain', word);
  };

  const handleCheck = () => {
    playFeedbackSound('click');
    setIsSubmitted(true);
    const isAllCorrect = NUTRITION_MATCHING_ITEMS.every(
      (item) => matches[item.id] === item.colBTarget
    );
    if (isAllCorrect) {
      playFeedbackSound('correct');
    }
  };

  const handleReset = () => {
    playFeedbackSound('click');
    setMatches({});
    setSelectedWord(null);
    setIsSubmitted(false);
  };

  // Check which words are already used
  const usedWords = new Set(Object.values(matches));

  const allFilled = NUTRITION_MATCHING_ITEMS.every((item) => Boolean(matches[item.id]));
  const isAllCorrect =
    isSubmitted &&
    NUTRITION_MATCHING_ITEMS.every((item) => matches[item.id] === item.colBTarget);

  return (
    <div className="w-full flex flex-col gap-6 animate-in fade-in duration-200">
      {/* Reversible Instruction Header Card */}
      <ReversibleCard
        textEn="Complete the phrases by dragging the correct word from the bank to column B."
        textEs="Completa las frases arrastrando la palabra correcta del banco a la columna B."
        speed={speed}
        accent={accent}
        className="shadow-sm"
      />

      {/* Main Matching Layout (actividad 2.png) */}
      <div
        className={`w-full rounded-2xl border p-6 sm:p-8 flex flex-col gap-8 shadow-sm transition-colors ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        }`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Columns A and B Table */}
          <div className="lg:col-span-8 flex flex-col gap-3">
            {/* Table Header */}
            <div className="grid grid-cols-12 pb-2 border-b border-slate-200 dark:border-slate-800 text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
              <span className="col-span-5">A</span>
              <span className="col-span-7">B</span>
            </div>

            {/* Rows */}
            {NUTRITION_MATCHING_ITEMS.map((item: MatchingPhraseItem) => {
              const currentVal = matches[item.id];
              const isRowCorrect = isSubmitted && currentVal === item.colBTarget;
              const isRowWrong = isSubmitted && currentVal && currentVal !== item.colBTarget;

              return (
                <div
                  key={item.id}
                  className="grid grid-cols-12 items-center gap-3 py-3 border-b border-dashed border-slate-200 dark:border-slate-800/80"
                >
                  {/* Column A item */}
                  <div className="col-span-5 flex items-center">
                    <span className="text-sm sm:text-base font-semibold text-slate-800 dark:text-slate-200">
                      {item.colA}
                    </span>
                  </div>

                  {/* Column B Drop slot */}
                  <div className="col-span-7 flex items-center gap-2">
                    <div
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => handleDrop(e, item.id)}
                      onClick={() => handlePlaceWord(item.id)}
                      className={`w-full max-w-[220px] h-11 px-3 rounded-xl border-2 border-dashed flex items-center justify-center transition-all cursor-pointer select-none text-sm font-semibold ${
                        currentVal
                          ? isSubmitted
                            ? isRowCorrect
                              ? 'bg-emerald-500/10 border-emerald-500 text-emerald-700 dark:text-emerald-300'
                              : 'bg-rose-500/10 border-rose-500 text-rose-700 dark:text-rose-300'
                            : 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-500 text-indigo-900 dark:text-indigo-200 shadow-xs'
                          : 'bg-slate-50 dark:bg-slate-800/50 border-slate-300 dark:border-slate-700 text-slate-400 hover:border-indigo-400'
                      }`}
                    >
                      {currentVal ? (
                        <span>{currentVal}</span>
                      ) : (
                        <span className="text-xs text-slate-400 font-mono">Drag Here</span>
                      )}
                    </div>

                    {/* Translation Pill if submitted */}
                    {isSubmitted && (
                      <span className="text-xs font-serif italic text-emerald-600 dark:text-emerald-400">
                        {item.phraseEs}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Word Bank */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
              Banco de Palabras
            </span>

            <div className="flex flex-col gap-2.5">
              {NUTRITION_MATCHING_BANK.map((word) => {
                const isUsed = usedWords.has(word);
                const isSelected = selectedWord === word;

                return (
                  <button
                    key={word}
                    type="button"
                    draggable={!isUsed && !isSubmitted}
                    onDragStart={(e) => handleDragStart(e, word)}
                    onClick={() => handleSelectWordFromBank(word)}
                    disabled={isUsed || isSubmitted}
                    className={`w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold border text-center transition-all cursor-pointer select-none ${
                      isUsed
                        ? 'opacity-30 cursor-not-allowed bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400'
                        : isSelected
                        ? 'bg-indigo-600 text-white border-indigo-600 ring-2 ring-indigo-400 shadow-md scale-102'
                        : isDark
                        ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700 hover:border-slate-600'
                        : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200 shadow-xs'
                    }`}
                  >
                    {word}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <button
            type="button"
            onClick={handleReset}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold border transition-all cursor-pointer ${
              isDark
                ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200 shadow-xs'
            }`}
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reiniciar</span>
          </button>

          <div className="flex items-center gap-3">
            {!isSubmitted ? (
              <button
                type="button"
                onClick={handleCheck}
                disabled={!allFilled}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md cursor-pointer ${
                  allFilled
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white active:scale-95'
                    : 'bg-slate-300 dark:bg-slate-800 text-slate-500 dark:text-slate-600 cursor-not-allowed shadow-none'
                }`}
              >
                <Check className="w-4 h-4" />
                <span>Comprobar</span>
              </button>
            ) : isAllCorrect && onNextActivity ? (
              <button
                type="button"
                onClick={onNextActivity}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold shadow-md transition-all active:scale-95 cursor-pointer"
              >
                <span>Siguiente Actividad</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleReset}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs sm:text-sm font-bold shadow-md transition-all active:scale-95 cursor-pointer"
              >
                <span>Intentar de nuevo</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
