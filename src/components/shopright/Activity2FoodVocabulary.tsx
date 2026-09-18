import React, { useState } from 'react';
import { Volume2, CheckCircle2, XCircle, RotateCcw } from 'lucide-react';
import { SHOPRIGHT_VOCAB_ITEMS, FoodVocabItem } from '../../data/saleAtShoprightData';
import { useTheme } from '../../context/ThemeContext';
import { speakEnglish, stopSpeaking, playFeedbackSound } from '../../utils/audio';

interface Activity2FoodVocabularyProps {
  speechRate?: number;
  accent?: 'US' | 'UK';
  onNext?: () => void;
}

export const Activity2FoodVocabulary: React.FC<Activity2FoodVocabularyProps> = ({
  speechRate = 1.0,
  accent = 'US',
  onNext,
}) => {
  const { isDark } = useTheme();

  // Selected word from bank to place
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  // Assignments: itemId -> placed word
  const [assignments, setAssignments] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
  const [playingId, setPlayingId] = useState<string | null>(null);

  // Available words in bank (words not yet assigned, or click to replace)
  const allWords = SHOPRIGHT_VOCAB_ITEMS.map((item) => item.word);
  const assignedWords = Object.values(assignments);
  const unassignedWords = allWords.filter((w) => !assignedWords.includes(w));

  const handlePlay = (text: string, id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (playingId === id && window.speechSynthesis?.speaking) {
      stopSpeaking();
      setPlayingId(null);
      return;
    }
    stopSpeaking();
    setPlayingId(id);
    speakEnglish(
      text,
      speechRate,
      accent || 'US',
      () => setPlayingId(id),
      () => setPlayingId(null)
    );
  };

  const toggleFlip = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFlippedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSlotClick = (itemId: string) => {
    if (isSubmitted) return;
    if (selectedWord) {
      playFeedbackSound('click');
      setAssignments((prev) => ({ ...prev, [itemId]: selectedWord }));
      setSelectedWord(null);
    } else if (assignments[itemId]) {
      // Remove assignment on click
      playFeedbackSound('click');
      const updated = { ...assignments };
      delete updated[itemId];
      setAssignments(updated);
    }
  };

  const handleCheck = () => {
    setIsSubmitted(true);
    const allCorrect = SHOPRIGHT_VOCAB_ITEMS.every(
      (item) => assignments[item.id] === item.word
    );
    if (allCorrect) {
      playFeedbackSound('correct');
    } else {
      playFeedbackSound('wrong');
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setAssignments({});
    setSelectedWord(null);
  };

  const isComplete = SHOPRIGHT_VOCAB_ITEMS.every((item) => assignments[item.id]);

  return (
    <div className="w-full flex flex-col gap-6 max-w-5xl mx-auto">
      {/* Header */}
      <div
        className={`p-4 sm:p-5 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
          isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            Actividad 2: Food Vocabulary
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Drag or click the words to match the food pictures.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {isSubmitted && (
            <button
              type="button"
              onClick={handleReset}
              className="px-3.5 py-2 rounded-xl text-xs font-bold border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reiniciar</span>
            </button>
          )}

          {!isSubmitted ? (
            <button
              type="button"
              onClick={handleCheck}
              disabled={!isComplete}
              className={`px-5 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-1.5 ${
                isComplete
                  ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md'
                  : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Comprobar</span>
            </button>
          ) : (
            onNext && (
              <button
                type="button"
                onClick={onNext}
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span>Siguiente</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            )
          )}
        </div>
      </div>

      {/* Word Bank */}
      <div
        className={`p-4 rounded-2xl border ${
          isDark ? 'bg-slate-900/80 border-slate-700' : 'bg-indigo-50/60 border-indigo-200'
        }`}
      >
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 justify-center">
          {allWords.map((word) => {
            const isUsed = assignedWords.includes(word);
            const isSelected = selectedWord === word;

            return (
              <button
                key={word}
                type="button"
                disabled={isUsed || isSubmitted}
                onClick={() => setSelectedWord(isSelected ? null : word)}
                className={`px-4 py-2 rounded-xl font-medium text-sm transition-all cursor-pointer border ${
                  isUsed
                    ? 'opacity-30 line-through bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 cursor-not-allowed'
                    : isSelected
                    ? 'bg-indigo-600 text-white border-indigo-500 shadow-md ring-2 ring-indigo-400 scale-105'
                    : isDark
                    ? 'bg-slate-800 hover:bg-slate-700 text-slate-100 border-slate-700'
                    : 'bg-white hover:bg-indigo-100 text-slate-800 border-indigo-300 shadow-xs'
                }`}
              >
                {word}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of 6 Image Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {SHOPRIGHT_VOCAB_ITEMS.map((item) => {
          const placedWord = assignments[item.id];
          const isFlipped = !!flippedCards[item.id];
          const isPlaying = playingId === item.id;
          const isCorrect = placedWord === item.word;

          return (
            <div
              key={item.id}
              className="h-72 cursor-pointer perspective select-none"
              onClick={(e) => toggleFlip(item.id, e)}
            >
              <div
                className={`w-full h-full transition-transform duration-500 transform-style-3d relative ${
                  isFlipped ? 'rotate-y-180' : ''
                }`}
              >
                {/* FRONT: English Image & Word Slot */}
                <div
                  className={`absolute inset-0 w-full h-full rounded-2xl border p-3 flex flex-col justify-between backface-hidden shadow-xs transition-colors ${
                    isDark
                      ? 'bg-slate-900 border-slate-700 text-slate-100'
                      : 'bg-white border-slate-200 text-slate-900'
                  }`}
                >
                  {/* Card Header with Audio Button (Speaker only) */}
                  <div className="flex items-center justify-between gap-2 pb-1.5">
                    <span className="text-xs font-mono font-semibold text-slate-400 uppercase">
                      {item.id.replace('vocab-', '')}
                    </span>

                    <button
                      type="button"
                      onClick={(e) => handlePlay(item.word, item.id, e)}
                      className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                        isPlaying
                          ? 'bg-indigo-600 text-white border-indigo-500'
                          : isDark
                          ? 'bg-slate-800 hover:bg-slate-700 text-indigo-300 border-slate-700'
                          : 'bg-slate-50 hover:bg-indigo-50 text-indigo-900 border-slate-200'
                      }`}
                      aria-label="Audio"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Image */}
                  <div className="w-full h-36 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 flex items-center justify-center border border-inherit/40">
                    <img
                      src={item.imageUrl}
                      alt={item.word}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* Word Drop Slot */}
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSlotClick(item.id);
                    }}
                    className={`mt-2 p-2 rounded-xl border-2 border-dashed text-center font-bold text-sm transition-all min-h-[42px] flex items-center justify-center cursor-pointer ${
                      isSubmitted
                        ? isCorrect
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
                          : 'border-red-500 bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300'
                        : placedWord
                        ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-900 dark:text-indigo-300'
                        : 'border-slate-300 dark:border-slate-700 hover:border-indigo-400 text-slate-400'
                    }`}
                  >
                    {placedWord ? (
                      <div className="flex items-center gap-1.5">
                        <span>{placedWord}</span>
                        {isSubmitted &&
                          (isCorrect ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                          ) : (
                            <XCircle className="w-4 h-4 text-red-500" />
                          ))}
                      </div>
                    ) : (
                      <span className="text-xs font-normal">
                        {selectedWord ? 'Click here to place' : 'Drop word here'}
                      </span>
                    )}
                  </div>
                </div>

                {/* BACK: Spanish Translation */}
                <div
                  className={`absolute inset-0 w-full h-full rounded-2xl border p-4 flex flex-col justify-between backface-hidden rotate-y-180 shadow-xs transition-colors ${
                    isDark
                      ? 'bg-slate-900 border-indigo-500/40 text-slate-100'
                      : 'bg-white border-indigo-300 text-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 border-b border-inherit/40 pb-2">
                    <span className="text-xs font-mono font-semibold text-indigo-600 dark:text-indigo-400 uppercase">
                      Traducción
                    </span>

                    <button
                      type="button"
                      onClick={(e) => handlePlay(item.word, item.id, e)}
                      className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                        isPlaying
                          ? 'bg-indigo-600 text-white border-indigo-500'
                          : isDark
                          ? 'bg-slate-800 hover:bg-slate-700 text-indigo-300 border-slate-700'
                          : 'bg-slate-50 hover:bg-indigo-50 text-indigo-900 border-slate-200'
                      }`}
                      aria-label="Audio"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="my-auto flex flex-col items-center justify-center text-center gap-2">
                    <span className="text-2xl font-black text-indigo-900 dark:text-indigo-300">
                      {item.wordEs}
                    </span>
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      ({item.word})
                    </span>
                    <p className="text-xs text-slate-600 dark:text-slate-300 italic max-w-[200px]">
                      "{item.exampleEs}"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
