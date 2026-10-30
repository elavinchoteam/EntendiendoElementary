import React, { useState } from 'react';
import { Check, RotateCcw, Volume2, RefreshCw } from 'lucide-react';
import {
  ACTIVIDAD_5_VOCAB_ITEMS,
  ACTIVIDAD_5_VOCAB_WORDS,
  VocabClozeItem,
} from '../../data/familyPicnicData';
import { useTheme } from '../../context/ThemeContext';
import { playFeedbackSound, speakEnglish, stopSpeaking } from '../../utils/audio';
import { FamilyPicnicStoryCard } from './FamilyPicnicStoryCard';
import { ReversibleTextCard } from './ReversibleTextCard';

interface Activity5VocabClozeProps {
  speed: number;
  accent?: 'US' | 'UK';
}

export const Activity5VocabCloze: React.FC<Activity5VocabClozeProps> = ({
  speed,
  accent = 'US',
}) => {
  const { isDark } = useTheme();

  // Active word token for click-to-place
  const [selectedWord, setSelectedWord] = useState<string | null>(null);

  // Placed values: { [itemId]: word }
  const [placedWords, setPlacedWords] = useState<Record<string, string>>({});

  // Flipped state for translation: { [itemId]: boolean }
  const [flippedItems, setFlippedItems] = useState<Record<string, boolean>>({});

  // Checked state
  const [isChecked, setIsChecked] = useState(false);

  const usedWords = Object.values(placedWords);

  const handleSelectWord = (word: string) => {
    if (isChecked) return;
    playFeedbackSound('click');
    setSelectedWord((prev) => (prev === word ? null : word));
  };

  const handlePlaceWord = (itemId: string) => {
    if (isChecked) return;
    if (!selectedWord) {
      if (placedWords[itemId]) {
        playFeedbackSound('click');
        setPlacedWords((prev) => {
          const next = { ...prev };
          delete next[itemId];
          return next;
        });
      }
      return;
    }

    playFeedbackSound('click');
    setPlacedWords((prev) => ({
      ...prev,
      [itemId]: selectedWord,
    }));
    setSelectedWord(null);
  };

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
      setPlacedWords((prev) => ({
        ...prev,
        [itemId]: word,
      }));
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleToggleFlip = (itemId: string) => {
    playFeedbackSound('click');
    setFlippedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const handlePlayAudio = (textEn: string, e: React.MouseEvent) => {
    e.stopPropagation();
    stopSpeaking();
    playFeedbackSound('click');
    speakEnglish(textEn, speed, accent);
  };

  const totalItems = ACTIVIDAD_5_VOCAB_ITEMS.length;
  const placedCount = Object.keys(placedWords).length;

  const handleCheck = () => {
    const allCorrect = ACTIVIDAD_5_VOCAB_ITEMS.every(
      (item) => placedWords[item.id] === item.correctWord
    );
    playFeedbackSound(allCorrect ? 'correct' : 'wrong');
    setIsChecked(true);
  };

  const handleReset = () => {
    playFeedbackSound('click');
    setPlacedWords({});
    setSelectedWord(null);
    setIsChecked(false);
  };

  return (
    <div className="w-full flex flex-col gap-5 animate-in fade-in duration-200">
      {/* 1. Reversible Instruction Card */}
      <ReversibleTextCard
        textEn="Complete the sentences to help you understand the vocabulary."
        textEs="Completa las oraciones para ayudarte a comprender el vocabulario."
        speed={speed}
        accent={accent}
      />

      {/* 2. Main Two-Column Layout */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Story Card */}
        <div className="lg:col-span-6">
          <FamilyPicnicStoryCard speed={speed} accent={accent} />
        </div>

        {/* Right Column: Sentences with Blanks + Word Bank */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          {/* Sentences List */}
          <div className="flex flex-col gap-2.5">
            {ACTIVIDAD_5_VOCAB_ITEMS.map((item) => {
              const placed = placedWords[item.id];
              const isCorrect = placed === item.correctWord;
              const isFlipped = Boolean(flippedItems[item.id]);

              return (
                <div
                  key={item.id}
                  className="w-full perspective-1000"
                >
                  <div
                    className={`relative w-full min-h-[56px] transition-transform duration-500 transform-style-3d select-none rounded-xl border ${
                      isDark
                        ? 'bg-slate-900 border-slate-700 text-slate-100 shadow-xs'
                        : 'bg-white border-slate-200 text-slate-900 shadow-xs'
                    } ${isFlipped ? 'rotate-y-180' : ''}`}
                  >
                    {/* Front Face: English sentence with slot */}
                    <div className="w-full h-full backface-hidden p-3 flex items-center justify-between gap-2.5 rounded-xl">
                      <div className="flex-1 flex flex-wrap items-center gap-1.5 text-xs sm:text-sm leading-relaxed">
                        {item.prefix && <span>{item.prefix}</span>}

                        {/* Blank slot */}
                        <div
                          onDragOver={handleDragOver}
                          onDrop={(e) => handleDrop(e, item.id)}
                          onClick={() => handlePlaceWord(item.id)}
                          className={`inline-flex items-center justify-center min-w-[110px] h-7 sm:h-8 px-2.5 rounded-md border-2 border-dashed transition-all cursor-pointer ${
                            placed
                              ? isChecked
                                ? isCorrect
                                  ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200 font-bold'
                                  : 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-200 font-bold'
                                : 'border-sky-500 bg-sky-50 dark:bg-sky-950/40 text-sky-800 dark:text-sky-200 font-bold'
                              : selectedWord
                              ? 'border-sky-400 bg-sky-50/50 animate-pulse text-sky-400'
                              : 'border-slate-300 dark:border-slate-600 bg-slate-100/50 dark:bg-slate-800/50 text-slate-400'
                          }`}
                        >
                          {placed || (
                            <span className="text-[10px] text-slate-400 font-mono select-none">
                              [ arrastra ]
                            </span>
                          )}
                        </div>

                        {item.suffix && <span>{item.suffix}</span>}
                      </div>

                      <div className="shrink-0 flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleToggleFlip(item.id)}
                          className={`w-7 h-7 rounded-lg border flex items-center justify-center transition-all cursor-pointer ${
                            isDark
                              ? 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
                              : 'bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900'
                          }`}
                          title="Voltear para ver traducción en español"
                        >
                          <RefreshCw className="w-3 h-3" />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => handlePlayAudio(item.fullEn, e)}
                          className={`w-7 h-7 rounded-lg border flex items-center justify-center transition-all cursor-pointer ${
                            isDark
                              ? 'bg-slate-800 border-slate-700 text-sky-400 hover:bg-slate-700'
                              : 'bg-slate-100 border-slate-200 text-sky-600 hover:bg-slate-200'
                          }`}
                          title="Escuchar audio"
                        >
                          <Volume2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    {/* Back Face: Spanish Translation */}
                    <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 p-3 flex items-center justify-between gap-2.5 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/40 border border-emerald-300 dark:border-emerald-700">
                      <div className="flex-1 pr-1">
                        <p className="text-xs sm:text-sm font-medium text-emerald-950 dark:text-emerald-100 italic">
                          {item.fullEs}
                        </p>
                      </div>

                      <div className="shrink-0 flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleToggleFlip(item.id)}
                          className="w-7 h-7 rounded-lg border border-emerald-400 bg-white dark:bg-slate-800 text-emerald-700 dark:text-emerald-300 flex items-center justify-center cursor-pointer hover:scale-105 transition-all shadow-xs"
                          title="Voltear al frente"
                        >
                          <RefreshCw className="w-3 h-3 rotate-180" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Word Bank at bottom */}
          <div
            className={`w-full p-3.5 rounded-xl border flex flex-wrap items-center justify-center gap-2 shadow-xs ${
              isDark ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'
            }`}
          >
            {ACTIVIDAD_5_VOCAB_WORDS.map((word) => {
              const isUsed = usedWords.includes(word);
              const isSelected = selectedWord === word;

              return (
                <button
                  key={word}
                  type="button"
                  draggable={!isUsed && !isChecked}
                  onDragStart={(e) => handleDragStart(e, word)}
                  onClick={() => !isUsed && handleSelectWord(word)}
                  disabled={isUsed || isChecked}
                  className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold border transition-all cursor-grab active:cursor-grabbing select-none ${
                    isUsed
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

          {/* Action Buttons */}
          <div className="w-full flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-800">
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
              disabled={placedCount < totalItems || isChecked}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold shadow-md transition-all cursor-pointer ${
                placedCount < totalItems || isChecked
                  ? 'opacity-50 cursor-not-allowed bg-slate-300 dark:bg-slate-700 text-slate-500'
                  : 'bg-sky-600 hover:bg-sky-500 text-white shadow-sky-600/30 hover:scale-105 active:scale-95'
              }`}
            >
              <Check className="w-4 h-4" />
              <span>Comprobar ({placedCount}/{totalItems})</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
