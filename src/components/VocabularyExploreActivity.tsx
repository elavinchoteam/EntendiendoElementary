import React, { useState } from 'react';
import {
  CheckCircle2,
  BookOpen,
  Eye,
  Columns2,
  LayoutGrid,
} from 'lucide-react';
import { VocabularyExploreExercise, VocabularyWordItem } from '../types';
import { useTheme } from '../context/ThemeContext';
import { VocabularyHelperCard } from './VocabularyHelperCard';
import { ReversibleInstructionCard } from './ReversibleInstructionCard';
import { CardSpeechControl } from './CardSpeechControl';

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
  const [selectedWordId, setSelectedWordId] = useState<string>(words[0]?.id || 'k-w1');
  const [reviewedWords, setReviewedWords] = useState<Set<string>>(new Set([words[0]?.id || 'k-w1']));
  const [flippedWords, setFlippedWords] = useState<Record<string, boolean>>({});
  const [viewMode, setViewMode] = useState<'grid' | 'split'>('grid');

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

  const handleToggleFlipWord = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setFlippedWords((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
    handleSelectWord(id);
  };

  return (
    <div className="w-full mx-auto flex flex-col items-center gap-6 animate-in fade-in duration-200 py-2">
      {/* Reversible Instructions Header */}
      <ReversibleInstructionCard
        id="explore-instruction-card"
        title={exercise.title || 'In the Kitchen'}
        titleEs={exercise.titleEs || 'En la Cocina'}
        instructions={
          exercise.instructions ||
          'Read the list of words and phrases. Read the example sentences. Listen to the recordings and practice saying the words and phrases. Mark any words you would like to review later.'
        }
        instructionsEs={
          exercise.instructionsEs ||
          'Lee la lista de palabras y frases. Lee las oraciones de ejemplo. Escucha las grabaciones y practica decir las palabras y frases. Marca las palabras que te gustaría repasar más tarde.'
        }
        icon={
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <BookOpen className="w-5 h-5" />
          </div>
        }
      />

      {/* View Switcher Controls */}
      <div className="w-full flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Vocabulario: {reviewedWords.size}/{words.length} exploradas
          </span>
        </div>

        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-white/10">
          <button
            type="button"
            id="view-mode-grid-btn"
            onClick={() => setViewMode('grid')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              viewMode === 'grid'
                ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Tarjetas ({words.length})</span>
          </button>
          <button
            type="button"
            id="view-mode-split-btn"
            onClick={() => setViewMode('split')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              viewMode === 'split'
                ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Columns2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Detalle</span>
          </button>
        </div>
      </div>

      {viewMode === 'grid' ? (
        /* GRID OF 10 REVERSIBLE VOCABULARY CARDS (Matching actividad 1.png) */
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
          {words.map((item, idx) => {
            const isFlipped = !!flippedWords[item.id];
            const isReviewed = reviewedWords.has(item.id);

            return (
              <div
                key={item.id}
                id={`vocab-grid-card-${item.id}`}
                onClick={() => handleToggleFlipWord(item.id)}
                className={`rounded-2xl border p-4 transition-all duration-200 cursor-pointer shadow-xs flex items-center justify-between gap-3 ${
                  isFlipped
                    ? isDark
                      ? 'bg-slate-900 border-emerald-500/50'
                      : 'bg-white border-emerald-400 ring-2 ring-emerald-300/30 shadow-sm'
                    : isDark
                    ? 'bg-slate-900 border-white/10 hover:border-slate-700'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                {/* Left: Thumbnail Image */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 bg-slate-200 dark:bg-slate-800 border border-inherit/20 relative">
                  <img
                    src={item.imageUrl}
                    alt={item.word}
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                  />
                  {isReviewed && (
                    <div className="absolute bottom-1 right-1 bg-white/90 dark:bg-slate-900/90 rounded-full p-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    </div>
                  )}
                </div>

                {/* Center: Reversible Content (Word En or Translation Es) - Clean Solid Background, No Gradient */}
                <div className="flex-1 min-w-0 flex flex-col justify-center gap-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-slate-600 dark:text-slate-300">
                      {idx + 1}.
                    </span>
                    <h4
                      className={`text-lg sm:text-xl font-bold capitalize truncate ${
                        isFlipped
                          ? 'text-emerald-600 dark:text-emerald-400'
                          : isDark
                          ? 'text-white'
                          : 'text-slate-900'
                      }`}
                    >
                      {isFlipped ? item.translation : item.word}
                    </h4>
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400 italic capitalize truncate">
                    {isFlipped
                      ? item.partOfSpeechEs || item.partOfSpeech
                      : item.partOfSpeech}
                  </p>

                  {/* Sentence snippet */}
                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 mt-0.5">
                    {isFlipped ? item.exampleEs : item.exampleEn}
                  </p>
                </div>

                {/* Right: Speaker Audio Button with Speeds (0.5x to 1.30x) */}
                <div
                  className="shrink-0 flex items-center gap-1.5"
                  onClick={(e) => e.stopPropagation()}
                >
                  <CardSpeechControl
                    textToSpeak={item.word}
                    accent={accent}
                    initialSpeed={speechRate}
                    gender="female"
                    size="sm"
                  />
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* SPLIT VIEW: Left Column List & Right Column Detail Card */
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
                          ? 'bg-emerald-600 text-white shadow-md font-semibold'
                          : 'bg-emerald-50 text-emerald-900 font-semibold shadow-xs ring-1 ring-emerald-300'
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

          {/* Right Column: Reversible Cards */}
          <div className="flex-1 w-full flex flex-col items-center">
            <VocabularyHelperCard
              words={words}
              selectedWordId={selectedWordId}
              onSelectWord={handleSelectWord}
              showDropdownSelector={false}
              accent={accent}
              speechRate={speechRate}
            />
          </div>
        </div>
      )}
    </div>
  );
};

