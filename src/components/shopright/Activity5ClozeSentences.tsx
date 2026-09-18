import React, { useState } from 'react';
import { Volume2, CheckCircle2, XCircle, RotateCcw } from 'lucide-react';
import { SHOPRIGHT_CLOZE_DATA } from '../../data/saleAtShoprightData';
import { ShoprightPinnedAd } from './ShoprightPinnedAd';
import { useTheme } from '../../context/ThemeContext';
import { speakEnglish, stopSpeaking, playFeedbackSound } from '../../utils/audio';

interface Activity5ClozeSentencesProps {
  speechRate?: number;
  accent?: 'US' | 'UK';
  onNext?: () => void;
}

export const Activity5ClozeSentences: React.FC<Activity5ClozeSentencesProps> = ({
  speechRate = 1.0,
  accent = 'US',
  onNext,
}) => {
  const { isDark } = useTheme();

  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [filledBlanks, setFilledBlanks] = useState<Record<number, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const assignedWords = Object.values(filledBlanks);

  const fullEnglishText = `Shopping at Shopright Supermarket saves you money. In the sale, you can buy food to make a fat-free dinner. Another word for fat-free food is light food. The salt-free turkey is on sale.`;

  const handlePlay = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (isPlaying && window.speechSynthesis?.speaking) {
      stopSpeaking();
      setIsPlaying(false);
      return;
    }
    stopSpeaking();
    setIsPlaying(true);
    speakEnglish(
      fullEnglishText,
      speechRate,
      accent || 'US',
      () => setIsPlaying(true),
      () => setIsPlaying(false)
    );
  };

  const handleBlankClick = (blankIdx: number) => {
    if (isSubmitted) return;
    if (selectedWord) {
      playFeedbackSound('click');
      setFilledBlanks((prev) => ({ ...prev, [blankIdx]: selectedWord }));
      setSelectedWord(null);
    } else if (filledBlanks[blankIdx]) {
      playFeedbackSound('click');
      const copy = { ...filledBlanks };
      delete copy[blankIdx];
      setFilledBlanks(copy);
    }
  };

  const handleCheck = () => {
    setIsSubmitted(true);
    const allCorrect = SHOPRIGHT_CLOZE_DATA.blanks.every(
      (b) => filledBlanks[b.index] === b.correctWord
    );
    if (allCorrect) {
      playFeedbackSound('correct');
    } else {
      playFeedbackSound('wrong');
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFilledBlanks({});
    setSelectedWord(null);
  };

  const isAllFilled = SHOPRIGHT_CLOZE_DATA.blanks.every(
    (b) => !!filledBlanks[b.index]
  );

  return (
    <div className="w-full flex flex-col gap-6 max-w-6xl mx-auto">
      {/* Header */}
      <div
        className={`p-4 sm:p-5 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
          isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            Actividad 5: Sentence Completion
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Choose the best answers from the bank to complete the sentences. There are more words than you need.
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
              disabled={!isAllFilled}
              className={`px-5 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-1.5 ${
                isAllFilled
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

      {/* Main 2-Column Split: Ad on Left, Cloze on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Authentic Pinned Ad */}
        <div className="lg:col-span-5">
          <ShoprightPinnedAd
            speechRate={speechRate}
            accent={accent}
            compact
          />
        </div>

        {/* Right Column: Interactive Cloze Passage & Word Bank */}
        <div className="lg:col-span-7 flex flex-col gap-5">
          {/* Word Bank */}
          <div
            className={`p-4 rounded-2xl border ${
              isDark ? 'bg-slate-900 border-slate-700' : 'bg-indigo-50/60 border-indigo-200'
            }`}
          >
            <div className="text-xs font-mono font-bold text-slate-500 uppercase mb-2">
              Word Bank (Choose a word, then click the blank)
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {SHOPRIGHT_CLOZE_DATA.wordBank.map((word) => {
                const isUsed = assignedWords.includes(word);
                const isSelected = selectedWord === word;

                return (
                  <button
                    key={word}
                    type="button"
                    disabled={isUsed || isSubmitted}
                    onClick={() => setSelectedWord(isSelected ? null : word)}
                    className={`px-3.5 py-1.5 rounded-xl font-bold text-sm border transition-all cursor-pointer ${
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

          {/* Reversible Cloze Passage Card */}
          <div
            className="cursor-pointer perspective select-none"
            onClick={() => setIsFlipped(!isFlipped)}
          >
            <div
              className={`w-full min-h-[220px] transition-transform duration-500 transform-style-3d relative ${
                isFlipped ? 'rotate-y-180' : ''
              }`}
            >
              {/* FRONT: English with Drop Slots */}
              <div
                className={`w-full min-h-[220px] rounded-2xl border p-5 sm:p-6 flex flex-col justify-between backface-hidden shadow-xs transition-colors ${
                  isDark
                    ? 'bg-slate-900 border-slate-700 text-white'
                    : 'bg-white border-slate-200 text-slate-900'
                }`}
              >
                <div className="flex items-center justify-between gap-2 pb-3 border-b border-inherit/40">
                  <span className="text-xs font-mono font-semibold text-indigo-600 dark:text-indigo-400 uppercase">
                    Passage
                  </span>

                  <button
                    type="button"
                    onClick={handlePlay}
                    className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                      isPlaying
                        ? 'bg-indigo-600 text-white border-indigo-500 ring-2 ring-indigo-400'
                        : isDark
                        ? 'bg-slate-800 hover:bg-slate-700 text-indigo-300 border-slate-700'
                        : 'bg-slate-50 hover:bg-indigo-50 text-indigo-900 border-slate-200'
                    }`}
                    aria-label="Audio"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Inline Cloze Text */}
                <div className="py-4 text-base sm:text-lg leading-loose font-serif">
                  {SHOPRIGHT_CLOZE_DATA.sentenceParts.map((part, idx) => {
                    const blank = SHOPRIGHT_CLOZE_DATA.blanks.find((b) => b.index === idx);
                    if (!blank) {
                      return <span key={idx}>{part}</span>;
                    }

                    const placedWord = filledBlanks[idx];
                    const isCorrect = placedWord === blank.correctWord;

                    return (
                      <React.Fragment key={idx}>
                        <span>{part}</span>
                        <span
                          onClick={(e) => {
                            e.stopPropagation();
                            handleBlankClick(idx);
                          }}
                          className={`inline-flex items-center justify-center px-3 py-1 mx-1.5 rounded-xl border-2 font-bold text-sm min-w-[90px] cursor-pointer transition-all ${
                            isSubmitted
                              ? isCorrect
                                ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
                                : 'border-red-500 bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300'
                              : placedWord
                              ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-900 dark:text-indigo-300'
                              : 'border-dashed border-slate-400 dark:border-slate-600 hover:border-indigo-500 text-slate-400 bg-slate-50 dark:bg-slate-800'
                          }`}
                        >
                          {placedWord || (
                            <span className="text-xs font-normal">
                              {selectedWord ? 'Click' : '[ ___ ]'}
                            </span>
                          )}
                          {isSubmitted &&
                            (isCorrect ? (
                              <CheckCircle2 className="w-3.5 h-3.5 ml-1 text-emerald-500 shrink-0" />
                            ) : (
                              <XCircle className="w-3.5 h-3.5 ml-1 text-red-500 shrink-0" />
                            ))}
                        </span>
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>

              {/* BACK: Spanish Translation */}
              <div
                className={`absolute inset-0 w-full h-full rounded-2xl border p-5 sm:p-6 flex flex-col justify-between backface-hidden rotate-y-180 shadow-xs transition-colors ${
                  isDark
                    ? 'bg-slate-900 border-indigo-500/40 text-white'
                    : 'bg-white border-indigo-300 text-slate-900'
                }`}
              >
                <div className="flex items-center justify-between gap-2 pb-3 border-b border-inherit/40">
                  <span className="text-xs font-mono font-semibold text-indigo-600 dark:text-indigo-400 uppercase">
                    Traducción
                  </span>

                  <button
                    type="button"
                    onClick={handlePlay}
                    className="p-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-indigo-600 dark:text-indigo-400"
                    aria-label="Audio"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="py-4 text-base sm:text-lg leading-loose font-serif text-slate-800 dark:text-slate-200">
                  Comprar en el Supermercado Shopright te{' '}
                  <strong className="text-indigo-700 dark:text-indigo-400 underline">ahorra</strong>{' '}
                  dinero. En la oferta, puedes comprar comida para hacer una{' '}
                  <strong className="text-indigo-700 dark:text-indigo-400 underline">cena</strong> sin
                  grasa. Otra palabra para comida sin grasa es comida{' '}
                  <strong className="text-indigo-700 dark:text-indigo-400 underline">ligera</strong>. El{' '}
                  <strong className="text-indigo-700 dark:text-indigo-400 underline">pavo</strong> sin
                  sal está en oferta.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
