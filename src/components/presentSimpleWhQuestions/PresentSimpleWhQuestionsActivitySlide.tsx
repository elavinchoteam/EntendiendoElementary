import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  XCircle,
  RotateCcw,
  ChevronRight,
  Sparkles,
  Volume2,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { playFeedbackSound, speakEnglish, stopSpeaking } from '../../utils/audio';
import {
  PresentSimpleWhQuestionsActivityItem,
  shoppingWomenImg,
} from '../../data/presentSimpleWhQuestionsData';
import { PresentSimpleWhQuestionsVideoPlayer } from './PresentSimpleWhQuestionsVideoPlayer';
import { PresentSimpleWhQuestionsCard } from './PresentSimpleWhQuestionsCard';

export interface PresentSimpleWhQuestionsActivitySlideProps {
  activity: PresentSimpleWhQuestionsActivityItem;
  speechRate: number;
  accent: 'US' | 'UK';
  onNext: () => void;
  onComplete: () => void;
}

export const PresentSimpleWhQuestionsActivitySlide: React.FC<PresentSimpleWhQuestionsActivitySlideProps> = ({
  activity,
  speechRate,
  accent,
  onNext,
  onComplete,
}) => {
  const { isDark } = useTheme();

  // Selected words for blank slots (supports 1, 2, 3, or 4 blanks)
  const slotsCount = activity.blankTargetWords.length;
  const [selectedWords, setSelectedWords] = useState<(string | null)[]>(
    Array(slotsCount).fill(null)
  );
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isDraggingOverSlot, setIsDraggingOverSlot] = useState<number | null>(null);
  const [isFlippedPrompt, setIsFlippedPrompt] = useState(false);
  const [isPromptPlaying, setIsPromptPlaying] = useState(false);

  // Reset state when activity changes
  useEffect(() => {
    setSelectedWords(Array(activity.blankTargetWords.length).fill(null));
    setIsSubmitted(false);
    setIsCorrect(false);
    setIsDraggingOverSlot(null);
    setIsFlippedPrompt(false);
    setIsPromptPlaying(false);
    stopSpeaking();
  }, [activity.id, activity.blankTargetWords.length]);

  const handleSelectOption = (word: string) => {
    if (isSubmitted && isCorrect) return;

    // Find the first empty slot
    const emptyIndex = selectedWords.findIndex((w) => w === null);
    if (emptyIndex !== -1) {
      playFeedbackSound('click');
      const updated = [...selectedWords];
      updated[emptyIndex] = word;
      setSelectedWords(updated);
      setIsSubmitted(false);
    }
  };

  const handleRemoveSlotWord = (slotIdx: number) => {
    if (isSubmitted && isCorrect) return;
    playFeedbackSound('click');
    const updated = [...selectedWords];
    updated[slotIdx] = null;
    setSelectedWords(updated);
    setIsSubmitted(false);
  };

  const handleCheckAnswer = () => {
    // Ensure all blanks are filled
    if (selectedWords.some((w) => !w)) return;

    const correct = selectedWords.every(
      (w, idx) =>
        w?.trim().toLowerCase() === activity.correctAnswer[idx]?.trim().toLowerCase()
    );

    setIsSubmitted(true);
    setIsCorrect(correct);

    if (correct) {
      playFeedbackSound('correct');
      onComplete();
    } else {
      playFeedbackSound('wrong');
    }
  };

  const handleReset = () => {
    setSelectedWords(Array(activity.blankTargetWords.length).fill(null));
    setIsSubmitted(false);
    setIsCorrect(false);
  };

  // Drag & drop handlers
  const handleDragStart = (e: React.DragEvent, word: string) => {
    e.dataTransfer.setData('text/plain', word);
  };

  const handleDragOver = (e: React.DragEvent, slotIdx: number) => {
    e.preventDefault();
    setIsDraggingOverSlot(slotIdx);
  };

  const handleDragLeave = () => {
    setIsDraggingOverSlot(null);
  };

  const handleDrop = (e: React.DragEvent, slotIdx: number) => {
    e.preventDefault();
    setIsDraggingOverSlot(null);
    const droppedWord = e.dataTransfer.getData('text/plain');
    if (droppedWord) {
      playFeedbackSound('click');
      const updated = [...selectedWords];
      updated[slotIdx] = droppedWord;
      setSelectedWords(updated);
      setIsSubmitted(false);
    }
  };

  const handlePlayPromptAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    stopSpeaking();
    setIsPromptPlaying(true);
    speakEnglish(
      activity.fullSentenceEn,
      speechRate,
      accent === 'UK' ? 'UK' : 'US',
      undefined,
      () => setIsPromptPlaying(false)
    );
  };

  // Actividad 1: Video exploration and grammar rules
  if (activity.actNumber === 1) {
    return (
      <div className="flex flex-col gap-6">
        {/* Top Header Card */}
        <div
          className={`p-4 rounded-xl border ${
            isDark ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-200'
          }`}
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 text-xs font-bold uppercase tracking-wider rounded-md bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300">
              Actividad 1 · Video & Gramática
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Present Simple: Wh- Questions
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            {activity.instruction}
          </p>
        </div>

        {/* Video Player on top */}
        <PresentSimpleWhQuestionsVideoPlayer speechRate={speechRate} accent={accent} />

        {/* Grammar Rules Section with Reversible Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <PresentSimpleWhQuestionsCard
            textEn="Wh- Questions: Question Word (What, Where, When, Why, Who, How) + do / does + Subject + Base Verb?"
            textEs="Preguntas Wh-: Palabra interrogativa (What, Where, When, Why, Who, How) + do / does + Sujeto + Verbo Base?"
            highlightWords={["What", "Where", "When", "Why", "Who", "How", "do", "does"]}
            speechRate={speechRate}
            accent={accent}
          />
          <PresentSimpleWhQuestionsCard
            textEn="- Where do you buy your clothes? - Why do you want to know?"
            textEs="- ¿Dónde compras tu ropa? - ¿Por qué quieres saberlo?"
            highlightWords={["Where", "Why"]}
            speechRate={speechRate}
            accent={accent}
          />
          <PresentSimpleWhQuestionsCard
            textEn="Third person (he / she / it): Where does he study? / What sport does Monica play?"
            textEs="Tercera persona (he / she / it): ¿Dónde estudia él? / ¿Qué deporte juega Monica?"
            highlightWords={["Where does he study?", "What sport does Monica play?"]}
            speechRate={speechRate}
            accent={accent}
          />
          <PresentSimpleWhQuestionsCard
            textEn="Subject Questions with 'Who': Who stays with Jimmy? (No auxiliary 'does' is used when 'Who' is the subject)."
            textEs="Preguntas de sujeto con 'Who': ¿Quién se queda con Jimmy? (No se usa el auxiliar 'does' cuando 'Who' es el sujeto)."
            highlightWords={["Who stays with Jimmy?"]}
            speechRate={speechRate}
            accent={accent}
          />
        </div>

        {/* Next Button */}
        <div className="flex justify-end pt-2">
          <button
            type="button"
            onClick={onNext}
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center gap-2 shadow-md transition-all active:scale-95"
          >
            <span>Ir a Actividad 2</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  // Actividades 2 to 11
  return (
    <div className="flex flex-col gap-6">
      {/* Exercise Instruction Header */}
      <div
        className={`p-4 rounded-xl border ${
          isDark ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-200'
        }`}
      >
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 text-xs font-bold uppercase tracking-wider rounded-md bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300">
              Actividad {activity.actNumber}
            </span>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              {activity.instruction}
            </h2>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Video reference thumbnail & dialogue */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div
            className={`rounded-xl border overflow-hidden ${
              isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'
            }`}
          >
            <div className="relative aspect-video w-full bg-slate-950 flex items-center justify-center overflow-hidden">
              <img
                src={activity.image || shoppingWomenImg}
                alt="Context visual"
                className="w-full h-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30 pointer-events-none" />
              <div className="absolute bottom-2 left-3 right-3 z-10 pointer-events-none">
                <div className="bg-black/75 backdrop-blur-xs text-white px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium">
                  <p>- <span className="text-cyan-300 font-bold">Where</span> do you buy your clothes?</p>
                  <p>- <span className="text-cyan-300 font-bold">Why</span> do you want to know?</p>
                </div>
              </div>
            </div>
            <div className="p-3">
              <PresentSimpleWhQuestionsCard
                textEn="- Where do you buy your clothes? - Why do you want to know?"
                textEs="- ¿Dónde compras tu ropa? - ¿Por qué quieres saberlo?"
                highlightWords={["Where", "Why"]}
                speechRate={speechRate}
                accent={accent}
              />
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Drag and Drop Card */}
        <div className="lg:col-span-7 flex flex-col gap-5">
          {/* Main Exercise Card (Reversible on click, strictly speaker button only) */}
          <div
            onClick={() => setIsFlippedPrompt((prev) => !prev)}
            className={`cursor-pointer transition-all duration-200 p-5 rounded-2xl border ${
              isDark
                ? 'bg-slate-800 border-slate-700 text-slate-100 hover:border-slate-600'
                : 'bg-white border-slate-200 text-slate-800 hover:border-slate-300 shadow-xs'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 space-y-3">
                {!isFlippedPrompt ? (
                  // Front side: English conversation prompt with blank slots
                  <div className="space-y-3 text-base sm:text-lg leading-relaxed font-medium">
                    {activity.promptLinesEn.map((line, lIdx) => {
                      if (line.includes('_____')) {
                        // Render line with interactive blank slots
                        const parts = line.split('_____');
                        let currentSlotCounter = 0;

                        return (
                          <div key={lIdx} className="flex flex-wrap items-center gap-2 py-1">
                            {parts.map((part, pIdx) => {
                              const isLast = pIdx === parts.length - 1;
                              const slotIndex = currentSlotCounter;
                              if (!isLast) {
                                currentSlotCounter++;
                              }

                              return (
                                <React.Fragment key={pIdx}>
                                  {part && <span>{part}</span>}
                                  {!isLast && (
                                    <span
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        if (selectedWords[slotIndex]) {
                                          handleRemoveSlotWord(slotIndex);
                                        }
                                      }}
                                      onDragOver={(e) => handleDragOver(e, slotIndex)}
                                      onDragLeave={handleDragLeave}
                                      onDrop={(e) => handleDrop(e, slotIndex)}
                                      className={`inline-flex items-center justify-center min-w-[76px] px-3 py-1 text-base font-bold rounded-lg border-2 border-dashed transition-all ${
                                        selectedWords[slotIndex]
                                          ? isSubmitted
                                            ? selectedWords[slotIndex]?.trim().toLowerCase() ===
                                              activity.correctAnswer[slotIndex]?.trim().toLowerCase()
                                              ? 'bg-emerald-100 border-emerald-500 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                                              : 'bg-rose-100 border-rose-500 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300'
                                            : 'bg-blue-100 border-blue-500 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300'
                                          : isDraggingOverSlot === slotIndex
                                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/40 scale-105'
                                          : isDark
                                          ? 'border-slate-600 bg-slate-700/50 text-slate-400'
                                          : 'border-slate-300 bg-slate-100 text-slate-400'
                                      }`}
                                    >
                                      {selectedWords[slotIndex] || '____'}
                                    </span>
                                  )}
                                </React.Fragment>
                              );
                            })}
                          </div>
                        );
                      }

                      return (
                        <p key={lIdx} className="text-slate-800 dark:text-slate-200">
                          {line}
                        </p>
                      );
                    })}
                  </div>
                ) : (
                  // Back side: Spanish Translation
                  <div
                    className={`space-y-2 text-base sm:text-lg leading-relaxed font-medium ${
                      isDark ? 'text-amber-300' : 'text-amber-800'
                    }`}
                  >
                    {activity.promptLinesEs.map((line, lIdx) => (
                      <p key={lIdx}>{line}</p>
                    ))}
                  </div>
                )}
              </div>

              {/* ONLY speaker icon button */}
              <button
                type="button"
                onClick={handlePlayPromptAudio}
                aria-label="Play audio"
                className={`shrink-0 p-2.5 rounded-full transition-all duration-150 ${
                  isPromptPlaying
                    ? 'bg-blue-600 text-white animate-pulse'
                    : isDark
                    ? 'bg-slate-700 hover:bg-slate-600 text-slate-200'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Options Word Bank */}
          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-slate-800/60 border-slate-700' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex flex-wrap gap-2.5 items-center">
              {activity.options.map((option, idx) => {
                const countInUse = selectedWords.filter((w) => w === option).length;
                const isUsed = countInUse > 0;

                return (
                  <button
                    key={idx}
                    type="button"
                    draggable={!isSubmitted || !isCorrect}
                    onDragStart={(e) => handleDragStart(e, option)}
                    onClick={() => handleSelectOption(option)}
                    disabled={isSubmitted && isCorrect}
                    className={`px-4 py-2.5 rounded-xl font-semibold text-base transition-all select-none shadow-xs active:scale-95 ${
                      isUsed
                        ? isDark
                          ? 'bg-slate-700/60 text-slate-400 border border-slate-600 opacity-60 cursor-not-allowed'
                          : 'bg-slate-200 text-slate-400 border border-slate-300 opacity-60 cursor-not-allowed'
                        : isDark
                        ? 'bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-600 hover:border-blue-500'
                        : 'bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 hover:border-blue-500'
                    }`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Feedback message box */}
          {isSubmitted && (
            <div
              className={`p-4 rounded-xl border flex items-start gap-3 animate-in fade-in duration-200 ${
                isCorrect
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-900 dark:bg-emerald-950/40 dark:border-emerald-800 dark:text-emerald-200'
                  : 'bg-rose-50 border-rose-300 text-rose-900 dark:bg-rose-950/40 dark:border-rose-800 dark:text-rose-200'
              }`}
            >
              {isCorrect ? (
                <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-6 h-6 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
              )}
              <div className="flex-1 text-sm sm:text-base">
                <p className="font-bold">
                  {isCorrect ? '¡Correcto!' : 'Inténtalo de nuevo'}
                </p>
                <p className="mt-1 leading-relaxed opacity-95">
                  {isCorrect ? activity.explanationEs : 'Revisa el orden o la forma gramatical de la pregunta.'}
                </p>
              </div>
            </div>
          )}

          {/* Action Buttons: Check / Reset / Next */}
          <div className="flex items-center justify-between gap-3 pt-2">
            <button
              type="button"
              onClick={handleReset}
              className={`px-4 py-2.5 rounded-xl border text-sm font-semibold flex items-center gap-2 transition ${
                isDark
                  ? 'border-slate-700 hover:bg-slate-800 text-slate-300'
                  : 'border-slate-300 hover:bg-slate-100 text-slate-700'
              }`}
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reintentar</span>
            </button>

            <div className="flex items-center gap-3">
              {!isCorrect ? (
                <button
                  type="button"
                  onClick={handleCheckAnswer}
                  disabled={selectedWords.some((w) => !w)}
                  className={`px-6 py-2.5 rounded-xl font-semibold text-white shadow-sm transition-all active:scale-95 flex items-center gap-2 ${
                    selectedWords.some((w) => !w)
                      ? 'bg-slate-400 dark:bg-slate-700 cursor-not-allowed opacity-60'
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Comprobar</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onNext}
                  className="px-6 py-2.5 rounded-xl font-semibold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md transition-all active:scale-95 flex items-center gap-2"
                >
                  <span>Siguiente</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
