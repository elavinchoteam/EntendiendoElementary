import React, { useState } from 'react';
import { CardSpeechControl } from './CardSpeechControl';
import { VocabularyWordItem } from '../types';
import { useTheme } from '../context/ThemeContext';

interface VocabularyHelperCardProps {
  words: VocabularyWordItem[];
  selectedWordId?: string;
  onSelectWord?: (wordId: string) => void;
  showDropdownSelector?: boolean;
  accent?: 'US' | 'UK';
  speechRate?: number;
  title?: string;
}

export const VocabularyHelperCard: React.FC<VocabularyHelperCardProps> = ({
  words,
  accent = 'US',
  speechRate = 1.0,
  title,
}) => {
  const { isDark } = useTheme();
  // Flip states for Spanish translations per word card
  const [flippedWords, setFlippedWords] = useState<Record<string, boolean>>({});

  const handleToggleFlip = (wordId: string) => {
    setFlippedWords((prev) => ({
      ...prev,
      [wordId]: !prev[wordId],
    }));
  };

  if (!words || words.length === 0) return null;

  return (
    <div className="w-full max-w-[420px] lg:max-w-[450px] flex flex-col gap-3.5">
      {/* Header: Title and Count */}
      <div className="flex items-center justify-between px-1">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
          {title || `Vocabulario (${words.length} tarjetas)`}
        </span>
      </div>

      {/* List of Vocabulary Cards matching Actividad 1 criteria (image, reversible on click, speaker control, clean solid background) */}
      <div className="flex flex-col gap-3 max-h-[640px] lg:max-h-[760px] overflow-y-auto pr-1">
        {words.map((item, idx) => {
          const isFlipped = !!flippedWords[item.id];

          return (
            <div
              key={item.id}
              id={`vocab-helper-card-${item.id}`}
              onClick={() => handleToggleFlip(item.id)}
              className={`rounded-2xl border p-3.5 sm:p-4 transition-all duration-200 cursor-pointer shadow-xs flex items-center gap-3.5 ${
                isFlipped
                  ? isDark
                    ? 'bg-slate-900 border-emerald-500/50 text-white'
                    : 'bg-white border-emerald-400 ring-2 ring-emerald-300/30 text-slate-900 shadow-sm'
                  : isDark
                  ? 'bg-slate-900 border-white/10 hover:border-slate-700 text-white'
                  : 'bg-white border-slate-200 hover:border-slate-300 text-slate-900'
              }`}
            >
              {/* Left: Thumbnail Image */}
              <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 bg-slate-100 dark:bg-slate-800 border border-inherit/20 relative">
                <img
                  src={item.imageUrl}
                  alt={item.word}
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
              </div>

              {/* Center: Reversible Content (Word En or Translation Es) */}
              <div className="flex-1 min-w-0 flex flex-col justify-center gap-0.5">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-mono font-bold text-slate-600 dark:text-slate-300">
                    {idx + 1}.
                  </span>
                  <h4
                    className={`text-base sm:text-lg font-bold capitalize truncate ${
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

                {/* Example sentence */}
                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 mt-0.5 leading-snug">
                  {isFlipped
                    ? item.exampleEs || item.definitionEs
                    : item.exampleEn || item.definitionEn}
                </p>
              </div>

              {/* Right: Speaker Audio Button with Speeds (0.5x to 1.30x) */}
              <div
                className="shrink-0 flex items-center gap-1"
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
    </div>
  );
};

