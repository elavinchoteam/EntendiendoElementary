import React, { useState } from 'react';
import {
  Volume2,
  Mic,
  RotateCw,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  BookOpen,
} from 'lucide-react';
import { VocabularyExploreExercise, VocabularyWordItem } from '../types';
import { useTheme } from '../context/ThemeContext';
import { VocabularyHelperCard } from './VocabularyHelperCard';
import { ReversibleInstructionCard } from './ReversibleInstructionCard';

interface VocabularyExploreActivityProps {
  exercise: VocabularyExploreExercise;
  accent?: 'US' | 'UK';
  speechRate?: number;
  onSuccess?: () => void;
}

export const VocabularyExploreActivity: React.FC<VocabularyExploreActivityProps> = ({
  exercise,
  accent = 'US',
  speechRate = 1.0,
  onSuccess,
}) => {
  const { isDark } = useTheme();
  const words = exercise.words || [];
  const [selectedWordId, setSelectedWordId] = useState<string>(words[0]?.id || 'w1');
  const [reviewedWords, setReviewedWords] = useState<Set<string>>(new Set([words[0]?.id || 'w1']));

  const activeWord = words.find((w) => w.id === selectedWordId) || words[0];

  const handleSelectWord = (id: string) => {
    setSelectedWordId(id);
    setReviewedWords((prev) => {
      const next = new Set(prev);
      next.add(id);
      if (next.size === words.length && onSuccess) {
        onSuccess();
      }
      return next;
    });
  };

  const handleNextWord = () => {
    const currentIndex = words.findIndex((w) => w.id === selectedWordId);
    if (currentIndex < words.length - 1) {
      const nextWord = words[currentIndex + 1];
      handleSelectWord(nextWord.id);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col items-center gap-6 animate-in fade-in duration-200 py-2">
      {/* Reversible Instructions Header */}
      <ReversibleInstructionCard
        id="explore-instruction-card"
        title={exercise.title || 'Explore: Vocabulary'}
        titleEs={exercise.titleEs || 'Explorar: Vocabulario'}
        instructions={
          exercise.instructions ||
          'Click on the words to learn their meaning, listen to pronunciation, and practice speaking.'
        }
        instructionsEs={
          exercise.instructionsEs ||
          'Haz clic en las palabras para aprender su significado, escuchar la pronunciación y practicar el habla.'
        }
        icon={
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 flex items-center justify-center shrink-0">
            <BookOpen className="w-5 h-5" />
          </div>
        }
      />

      {/* Main Layout: Left Column (Word List) & Right Column (Word Details Card) */}
      <div className="w-full flex flex-col md:flex-row items-start justify-center gap-6 sm:gap-8">
        {/* Left Column: 10 Words List */}
        <div
          className={`w-full md:w-64 shrink-0 rounded-2xl p-3 border shadow-md flex flex-col gap-1.5 ${
            isDark ? 'bg-slate-900/90 border-white/10' : 'bg-white border-slate-200'
          }`}
        >
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-3 py-2 border-b border-inherit/40">
            Lista de Vocabulario
          </div>

          <div className="flex flex-col gap-1 max-h-[500px] overflow-y-auto pr-1">
            {words.map((item, idx) => {
              const isSelected = item.id === selectedWordId;
              const isReviewed = reviewedWords.has(item.id);

              return (
                <button
                  key={item.id}
                  id={`vocab-item-${item.id}`}
                  onClick={() => handleSelectWord(item.id)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-150 flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? isDark
                        ? 'bg-indigo-600 text-white shadow-md font-semibold'
                        : 'bg-indigo-100 text-indigo-900 font-semibold shadow-xs ring-1 ring-indigo-300'
                      : isDark
                      ? 'hover:bg-white/5 text-slate-300 hover:text-white'
                      : 'hover:bg-slate-100 text-slate-700 hover:text-slate-900'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <span className="text-xs font-mono opacity-60 w-4">{idx + 1}.</span>
                    <span className="capitalize">{item.word}</span>
                  </span>

                  {isReviewed && (
                    <CheckCircle2
                      className={`w-3.5 h-3.5 ${
                        isSelected ? 'text-white' : 'text-emerald-500'
                      }`}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Cards (Word Card + Example Card) */}
        <div className="flex-1 w-full flex flex-col items-center">
          <VocabularyHelperCard
            words={words}
            selectedWordId={selectedWordId}
            onSelectWord={handleSelectWord}
            showDropdownSelector={false}
            accent={accent}
            speechRate={speechRate}
          />

          {/* Quick next word button */}
          <div className="w-full max-w-[340px] sm:max-w-[360px] flex justify-end mt-4">
            <button
              id="next-vocab-word-btn"
              onClick={handleNextWord}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                isDark
                  ? 'bg-slate-800 hover:bg-slate-700 text-indigo-300 border border-white/10'
                  : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200'
              }`}
            >
              <span>Siguiente palabra</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
