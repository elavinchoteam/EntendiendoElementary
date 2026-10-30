import React, { useState } from 'react';
import { Check, RotateCcw, Sparkles } from 'lucide-react';
import {
  GOOD_MORNING_IMAGE_MATCH_ITEMS,
  ImageMatchItem,
} from '../../data/goodMorningData';
import { useTheme } from '../../context/ThemeContext';
import { playFeedbackSound } from '../../utils/audio';
import { ReversibleTextCard } from './ReversibleTextCard';

interface Activity2MatchingProps {
  speed: number;
  accent?: 'US' | 'UK';
  onNext?: () => void;
}

export const Activity2Matching: React.FC<Activity2MatchingProps> = ({
  speed,
  accent = 'US',
  onNext,
}) => {
  const { isDark } = useTheme();

  // Selected word token for click-to-place
  const [selectedWord, setSelectedWord] = useState<string | null>(null);

  // Placed answers: { [itemId]: assignedWord }
  const [userMatches, setUserMatches] = useState<Record<string, string>>({});

  // Check state
  const [isChecked, setIsChecked] = useState(false);

  // Available words in bank (shuffled or standard)
  const allWords = ['a factory', 'an office', 'a meeting', 'a tie'];

  // Words already assigned to an image
  const usedWords = Object.values(userMatches);

  const handleSelectWord = (word: string) => {
    if (isChecked) return;
    playFeedbackSound('click');
    if (selectedWord === word) {
      setSelectedWord(null);
    } else {
      setSelectedWord(word);
    }
  };

  const handlePlaceWord = (itemId: string) => {
    if (isChecked) return;
    if (!selectedWord) {
      // If clicking already placed word, return it to pool
      if (userMatches[itemId]) {
        playFeedbackSound('click');
        setUserMatches((prev) => {
          const next = { ...prev };
          delete next[itemId];
          return next;
        });
      }
      return;
    }

    playFeedbackSound('click');
    setUserMatches((prev) => ({
      ...prev,
      [itemId]: selectedWord,
    }));
    setSelectedWord(null);
  };

  // Drag and drop support
  const handleDragStart = (e: React.DragEvent, word: string) => {
    if (isChecked) return;
    e.dataTransfer.setData('text/plain', word);
  };

  const handleDrop = (e: React.DragEvent, itemId: string) => {
    e.preventDefault();
    if (isChecked) return;
    const word = e.dataTransfer.getData('text/plain');
    if (word) {
      playFeedbackSound('click');
      setUserMatches((prev) => ({
        ...prev,
        [itemId]: word,
      }));
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleCheck = () => {
    const isAllPlaced = GOOD_MORNING_IMAGE_MATCH_ITEMS.every(
      (item) => userMatches[item.id]
    );
    if (!isAllPlaced) return;

    const allCorrect = GOOD_MORNING_IMAGE_MATCH_ITEMS.every(
      (item) => userMatches[item.id] === item.word
    );

    playFeedbackSound(allCorrect ? 'correct' : 'wrong');
    setIsChecked(true);
  };

  const handleReset = () => {
    playFeedbackSound('click');
    setUserMatches({});
    setSelectedWord(null);
    setIsChecked(false);
  };

  const isAllAnswered = GOOD_MORNING_IMAGE_MATCH_ITEMS.every(
    (item) => Boolean(userMatches[item.id])
  );

  return (
    <div className="w-full flex flex-col gap-6 animate-in fade-in duration-200">
      {/* 1. Instruction Card: Reversible */}
      <ReversibleTextCard
        textEn="Match the words to the images."
        textEs="Une las palabras con las imágenes correspondientes."
        speed={speed}
        accent={accent}
      />

      {/* 2. Word Bank at the top */}
      <div
        className={`w-full p-4 rounded-xl border flex flex-wrap items-center justify-center gap-3 shadow-xs ${
          isDark ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'
        }`}
      >
        <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider mr-2">
          Palabras:
        </span>
        {allWords.map((word) => {
          const isAssigned = usedWords.includes(word);
          const isSelected = selectedWord === word;

          return (
            <button
              key={word}
              type="button"
              draggable={!isAssigned && !isChecked}
              onDragStart={(e) => handleDragStart(e, word)}
              onClick={() => !isAssigned && handleSelectWord(word)}
              disabled={isAssigned || isChecked}
              className={`px-4 py-2 rounded-lg font-medium text-sm border-2 transition-all cursor-grab active:cursor-grabbing select-none ${
                isAssigned
                  ? 'opacity-30 border-dashed border-slate-300 dark:border-slate-700 bg-transparent text-slate-400 cursor-not-allowed'
                  : isSelected
                  ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-300 shadow-md scale-105'
                  : isDark
                  ? 'bg-slate-800 border-slate-600 text-slate-200 hover:border-sky-400 hover:bg-slate-700 shadow-xs'
                  : 'bg-white border-slate-300 text-slate-800 hover:border-sky-400 hover:bg-sky-50/50 shadow-xs'
              }`}
            >
              {word}
            </button>
          );
        })}
      </div>

      {/* 3. 4-Grid Image Cards */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {GOOD_MORNING_IMAGE_MATCH_ITEMS.map((item) => {
          const assignedWord = userMatches[item.id];
          const isCorrect = assignedWord === item.word;

          return (
            <div
              key={item.id}
              className={`flex flex-col rounded-2xl border overflow-hidden shadow-sm transition-all ${
                isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'
              }`}
            >
              {/* Image Container */}
              <div className="relative w-full aspect-square bg-slate-100 dark:bg-slate-800 flex items-center justify-center p-4 overflow-hidden border-b border-inherit">
                <img
                  src={item.imageSrc}
                  alt={item.word}
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>

              {/* Drop / Assignment Slot */}
              <div
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, item.id)}
                onClick={() => handlePlaceWord(item.id)}
                className={`p-3 m-3 min-h-[50px] rounded-xl border-2 border-dashed flex items-center justify-center cursor-pointer transition-all ${
                  assignedWord
                    ? isChecked
                      ? isCorrect
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 font-bold'
                        : 'border-rose-500 bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-300 font-bold'
                      : 'border-sky-400 bg-sky-50/60 dark:bg-sky-950/30 text-sky-800 dark:text-sky-200 font-semibold'
                    : selectedWord
                    ? 'border-sky-400 bg-sky-50/30 animate-pulse'
                    : 'border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800/40 text-slate-400'
                }`}
              >
                {assignedWord ? (
                  <span className="text-sm">{assignedWord}</span>
                ) : (
                  <span className="text-xs font-mono select-none">
                    Arrastra aquí o toca
                  </span>
                )}
              </div>

              {/* Translation & Audio when verified or requested */}
              <div className="px-3 pb-3">
                <ReversibleTextCard
                  textEn={item.word}
                  textEs={item.wordEs}
                  speed={speed}
                  accent={accent}
                  minHeightClass="min-h-[46px]"
                  className="text-xs"
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* 4. Action Buttons */}
      <div className="w-full flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
        <button
          type="button"
          onClick={handleReset}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border transition-all cursor-pointer ${
            isDark
              ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
              : 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reiniciar</span>
        </button>

        <button
          type="button"
          onClick={handleCheck}
          disabled={!isAllAnswered || isChecked}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold shadow-md transition-all cursor-pointer ${
            !isAllAnswered || isChecked
              ? 'opacity-50 cursor-not-allowed bg-slate-300 dark:bg-slate-700 text-slate-500'
              : 'bg-sky-600 hover:bg-sky-500 text-white shadow-sky-600/30 hover:scale-105 active:scale-95'
          }`}
        >
          <Check className="w-4 h-4" />
          <span>Comprobar</span>
        </button>
      </div>
    </div>
  );
};
