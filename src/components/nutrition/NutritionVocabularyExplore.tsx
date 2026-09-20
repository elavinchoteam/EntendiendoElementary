import React, { useState } from 'react';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import { NUTRITION_VOCABULARY, NutritionWordItem } from '../../data/nutritionData';
import { ReversibleCard } from './ReversibleCard';
import { useTheme } from '../../context/ThemeContext';

interface NutritionVocabularyExploreProps {
  speed: number;
  accent?: 'US' | 'UK';
}

export const NutritionVocabularyExplore: React.FC<NutritionVocabularyExploreProps> = ({
  speed,
  accent = 'US',
}) => {
  const { isDark } = useTheme();
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="w-full flex flex-col gap-6 animate-in fade-in duration-200">
      {/* Reversible Instruction Header Card */}
      <ReversibleCard
        textEn="Nutrition\nRead the list of words and phrases. Read the example sentences. Listen to the recordings and practice saying the words and phrases. Mark any words you would like to review later."
        textEs="Nutrición\nLee la lista de palabras y frases. Lee las oraciones de ejemplo. Escucha las grabaciones y practica decir las palabras y frases. Marca las palabras que te gustaría repasar más tarde."
        speed={speed}
        accent={accent}
        className="shadow-sm"
        childrenFront={
          <div className="flex flex-col gap-1.5">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-emerald-800 dark:text-emerald-400">
              Nutrition
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Read the list of words and phrases. Read the example sentences. Listen to the recordings and practice saying the words and phrases. Mark any words you would like to review later.
            </p>
          </div>
        }
        childrenBack={
          <div className="flex flex-col gap-1.5">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-emerald-900 dark:text-emerald-300">
              Nutrición
            </h2>
            <p className="text-xs sm:text-sm font-serif italic text-emerald-900 dark:text-emerald-200 leading-relaxed">
              Lee la lista de palabras y frases. Lee las oraciones de ejemplo. Escucha las grabaciones y practica decir las palabras y frases. Marca las palabras que te gustaría repasar más tarde.
            </p>
          </div>
        }
      />

      {/* 10 Vocabulary Cards in 3-column / 2-column responsive layout (Exact visual from actividad 1.png) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {NUTRITION_VOCABULARY.map((item: NutritionWordItem) => {
          const isBookmarked = bookmarkedIds.has(item.id);

          return (
            <div key={item.id} className="relative">
              <ReversibleCard
                textEn={`${item.word}. ${item.exampleEn}`}
                textEs={`${item.translation}. ${item.exampleEs}`}
                speed={speed}
                accent={accent}
                minHeightClass="min-h-[140px]"
                audioTextEn={`${item.word}. ${item.exampleEn}`}
                childrenFront={
                  <div className="flex items-center gap-3.5 pr-8">
                    <img
                      src={item.imageUrl}
                      alt={item.word}
                      className="w-16 h-16 sm:w-18 sm:h-18 rounded-xl object-cover shrink-0 border border-slate-200 dark:border-slate-700 shadow-xs"
                      loading="lazy"
                    />
                    <div className="flex flex-col gap-1 text-left min-w-0">
                      <span className="text-base sm:text-lg font-bold text-slate-900 dark:text-white capitalize">
                        {item.word}
                      </span>
                      <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-semibold">
                        {item.partOfSpeech}
                      </span>
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-tight">
                        {item.exampleEn}
                      </p>
                    </div>
                  </div>
                }
                childrenBack={
                  <div className="flex items-center gap-3.5 pr-8">
                    <img
                      src={item.imageUrl}
                      alt={item.word}
                      className="w-16 h-16 sm:w-18 sm:h-18 rounded-xl object-cover shrink-0 border border-emerald-300 dark:border-emerald-800 shadow-xs opacity-90"
                      loading="lazy"
                    />
                    <div className="flex flex-col gap-1 text-left min-w-0">
                      <span className="text-base sm:text-lg font-bold text-emerald-950 dark:text-emerald-200 capitalize">
                        {item.translation}
                      </span>
                      <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-700 dark:text-emerald-400 font-semibold">
                        {item.partOfSpeechEs}
                      </span>
                      <p className="text-xs font-serif italic text-emerald-900 dark:text-emerald-300 line-clamp-2 leading-tight">
                        {item.exampleEs}
                      </p>
                    </div>
                  </div>
                }
              />

              {/* Bookmark Toggle Icon Button */}
              <button
                type="button"
                onClick={(e) => toggleBookmark(item.id, e)}
                className={`absolute bottom-4 right-4 z-10 p-1.5 rounded-lg border transition-all cursor-pointer ${
                  isBookmarked
                    ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
                    : isDark
                    ? 'bg-slate-800 hover:bg-slate-700 text-slate-400 border-slate-700'
                    : 'bg-white hover:bg-slate-100 text-slate-400 border-slate-200'
                }`}
                title={isBookmarked ? 'Guardada para repasar' : 'Marcar para repasar'}
              >
                {isBookmarked ? (
                  <BookmarkCheck className="w-4 h-4 fill-current" />
                ) : (
                  <Bookmark className="w-4 h-4" />
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
