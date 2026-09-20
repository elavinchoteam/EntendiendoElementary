import React, { useState } from 'react';
import { Volume2, VolumeX, Check, RotateCcw, ArrowRight } from 'lucide-react';
import { NutritionWordItem } from '../../data/nutritionData';
import { ReversibleCard } from './ReversibleCard';
import { speakEnglish, stopSpeaking, playFeedbackSound } from '../../utils/audio';
import { useTheme } from '../../context/ThemeContext';

interface NutritionClozeActivityProps {
  titleEn: string;
  titleEs: string;
  instructionsEn: string;
  instructionsEs: string;
  templateParts: string[];
  correctAnswers: string[];
  wordBank: string[];
  translationEs: string;
  vocabularyList: NutritionWordItem[];
  speed: number;
  accent?: 'US' | 'UK';
  onNextActivity?: () => void;
}

export const NutritionClozeActivity: React.FC<NutritionClozeActivityProps> = ({
  titleEn,
  titleEs,
  instructionsEn,
  instructionsEs,
  templateParts,
  correctAnswers,
  wordBank,
  translationEs,
  vocabularyList,
  speed,
  accent = 'US',
  onNextActivity,
}) => {
  const { isDark } = useTheme();

  // Index of blank -> selected word from bank
  const [filledBlanks, setFilledBlanks] = useState<Record<number, string>>({});
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isPlayingStory, setIsPlayingStory] = useState(false);
  const [activeVocabAudio, setActiveVocabAudio] = useState<string | null>(null);

  const handleSelectWord = (word: string) => {
    if (isSubmitted) return;
    playFeedbackSound('click');
    setSelectedWord((prev) => (prev === word ? null : word));
  };

  const handleSlotClick = (index: number) => {
    if (isSubmitted) return;
    if (selectedWord) {
      playFeedbackSound('click');
      setFilledBlanks((prev) => ({
        ...prev,
        [index]: selectedWord,
      }));
      setSelectedWord(null);
    } else if (filledBlanks[index]) {
      // Remove word
      playFeedbackSound('click');
      setFilledBlanks((prev) => {
        const next = { ...prev };
        delete next[index];
        return next;
      });
    }
  };

  const handleDrop = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (isSubmitted) return;
    const word = e.dataTransfer.getData('text/plain');
    if (word) {
      playFeedbackSound('click');
      setFilledBlanks((prev) => ({
        ...prev,
        [index]: word,
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
    const allCorrect = correctAnswers.every(
      (ans, i) => filledBlanks[i]?.toLowerCase().trim() === ans.toLowerCase().trim()
    );
    if (allCorrect) {
      playFeedbackSound('correct');
    }
  };

  const handleReset = () => {
    playFeedbackSound('click');
    setFilledBlanks({});
    setSelectedWord(null);
    setIsSubmitted(false);
    if (isPlayingStory) {
      stopSpeaking();
      setIsPlayingStory(false);
    }
  };

  // Build the complete English text for audio
  const fullTextEn = templateParts
    .reduce((acc, part, i) => {
      const inserted = correctAnswers[i] ? correctAnswers[i] : '';
      return acc + part + inserted;
    }, '')
    .replace(/\s+/g, ' ')
    .trim();

  const handlePlayStory = () => {
    if (isPlayingStory) {
      stopSpeaking();
      setIsPlayingStory(false);
    } else {
      setIsPlayingStory(true);
      speakEnglish(fullTextEn, speed, accent, () => {
        setIsPlayingStory(false);
      });
    }
  };

  const playVocabAudio = (word: string, id: string) => {
    if (activeVocabAudio === id) {
      stopSpeaking();
      setActiveVocabAudio(null);
    } else {
      setActiveVocabAudio(id);
      speakEnglish(word, speed, accent, () => {
        setActiveVocabAudio(null);
      });
    }
  };

  const usedWords = new Set(Object.values(filledBlanks));
  const allFilled = correctAnswers.every((_, i) => Boolean(filledBlanks[i]));
  const isAllCorrect =
    isSubmitted &&
    correctAnswers.every(
      (ans, i) => filledBlanks[i]?.toLowerCase().trim() === ans.toLowerCase().trim()
    );

  return (
    <div className="w-full flex flex-col gap-6 animate-in fade-in duration-200">
      {/* Reversible Instruction Header Card */}
      <ReversibleCard
        textEn={`${titleEn}\n${instructionsEn}`}
        textEs={`${titleEs}\n${instructionsEs}`}
        speed={speed}
        accent={accent}
        className="shadow-sm"
        childrenFront={
          <div className="flex flex-col gap-1">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-emerald-800 dark:text-emerald-400">
              {titleEn}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              {instructionsEn}
            </p>
          </div>
        }
        childrenBack={
          <div className="flex flex-col gap-1">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-emerald-900 dark:text-emerald-300">
              {titleEs}
            </h2>
            <p className="text-xs sm:text-sm font-serif italic text-emerald-900 dark:text-emerald-200">
              {instructionsEs}
            </p>
          </div>
        }
      />

      {/* Main Cloze Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Vocabulary Reference Cards */}
        <div
          className={`lg:col-span-4 rounded-2xl border p-5 flex flex-col gap-3 shadow-sm ${
            isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
          }`}
        >
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
            Vocabulario
          </span>

          <div className="flex flex-col gap-2">
            {vocabularyList.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40"
              >
                <div className="flex flex-col text-left">
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-200 capitalize">
                    {item.word}
                  </span>
                  <span className="text-[11px] font-serif italic text-emerald-600 dark:text-emerald-400">
                    {item.translation}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => playVocabAudio(item.word, item.id)}
                  className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 cursor-pointer"
                  title="Listen"
                >
                  {activeVocabAudio === item.id ? (
                    <VolumeX className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
                  ) : (
                    <Volume2 className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Cloze Text and Word Bank */}
        <div
          className={`lg:col-span-8 rounded-2xl border p-6 sm:p-8 flex flex-col gap-6 shadow-sm ${
            isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
          }`}
        >
          {/* Audio button for the full passage */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              {titleEn}
            </span>

            <button
              type="button"
              onClick={handlePlayStory}
              className={`p-2 rounded-xl border transition-all cursor-pointer ${
                isPlayingStory
                  ? 'bg-emerald-500 text-white border-emerald-500 shadow-sm animate-pulse'
                  : isDark
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200 shadow-xs'
              }`}
              title="Listen to story"
            >
              {isPlayingStory ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>

          {/* Interactive Passage */}
          <div className="text-base sm:text-lg leading-loose text-slate-800 dark:text-slate-200 font-normal">
            {templateParts.map((part, index) => {
              if (index >= correctAnswers.length) {
                return <span key={index}>{part}</span>;
              }

              const currentVal = filledBlanks[index];
              const expectedAns = correctAnswers[index];
              const isSlotCorrect =
                isSubmitted &&
                currentVal?.toLowerCase().trim() === expectedAns.toLowerCase().trim();
              const isSlotWrong = isSubmitted && currentVal && !isSlotCorrect;

              return (
                <React.Fragment key={index}>
                  <span>{part}</span>
                  <span
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => handleDrop(e, index)}
                    onClick={() => handleSlotClick(index)}
                    className={`inline-flex items-center justify-center min-w-[130px] h-9 px-3 mx-1.5 align-middle rounded-xl border-2 border-dashed transition-all cursor-pointer select-none text-sm font-semibold ${
                      currentVal
                        ? isSubmitted
                          ? isSlotCorrect
                            ? 'bg-emerald-500/10 border-emerald-500 text-emerald-700 dark:text-emerald-300'
                            : 'bg-rose-500/10 border-rose-500 text-rose-700 dark:text-rose-300'
                          : 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-500 text-indigo-900 dark:text-indigo-200 shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-800/60 border-slate-300 dark:border-slate-700 text-slate-400 hover:border-indigo-400'
                    }`}
                  >
                    {currentVal ? (
                      <span>{currentVal}</span>
                    ) : (
                      <span className="text-xs text-slate-400 font-mono">_______</span>
                    )}
                  </span>
                </React.Fragment>
              );
            })}
          </div>

          {/* Word Bank at Bottom */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2.5">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
              Banco de Palabras
            </span>

            <div className="flex flex-wrap items-center gap-2.5">
              {wordBank.map((word) => {
                const isUsed = usedWords.has(word);
                const isSelected = selectedWord === word;

                return (
                  <button
                    key={word}
                    type="button"
                    draggable={!isUsed && !isSubmitted}
                    onDragStart={(e) => handleDragStart(e, word)}
                    onClick={() => handleSelectWord(word)}
                    disabled={isUsed || isSubmitted}
                    className={`py-2 px-4 rounded-xl text-xs sm:text-sm font-semibold border text-center transition-all cursor-pointer select-none ${
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

          {/* Reversible card for full translation when submitted */}
          {isSubmitted && (
            <div className="mt-2">
              <ReversibleCard
                textEn={fullTextEn}
                textEs={translationEs}
                speed={speed}
                accent={accent}
                minHeightClass="min-h-[90px]"
                childrenFront={
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                      Full Story (English):
                    </span>
                    <p className="text-sm font-normal text-slate-900 dark:text-white leading-relaxed">
                      {fullTextEn}
                    </p>
                  </div>
                }
                childrenBack={
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                      Traducción completa (Español):
                    </span>
                    <p className="text-sm font-serif italic text-emerald-950 dark:text-emerald-200 leading-relaxed">
                      {translationEs}
                    </p>
                  </div>
                }
              />
            </div>
          )}

          {/* Action buttons */}
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
    </div>
  );
};
