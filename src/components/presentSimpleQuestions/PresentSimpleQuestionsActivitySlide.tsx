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
import { PresentSimpleQuestionsActivityItem } from '../../data/presentSimpleQuestionsData';
import { PresentSimpleQuestionsVideoPlayer } from './PresentSimpleQuestionsVideoPlayer';
import { PresentSimpleQuestionsCard } from './PresentSimpleQuestionsCard';

export interface PresentSimpleQuestionsActivitySlideProps {
  activity: PresentSimpleQuestionsActivityItem;
  speechRate: number;
  accent: 'US' | 'UK';
  onNext: () => void;
  onComplete: () => void;
}

export const PresentSimpleQuestionsActivitySlide: React.FC<PresentSimpleQuestionsActivitySlideProps> = ({
  activity,
  speechRate,
  accent,
  onNext,
  onComplete,
}) => {
  const { isDark } = useTheme();

  // Selected words for blank slots (supports single or multiple blanks)
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
    if (droppedWord && activity.options.includes(droppedWord)) {
      playFeedbackSound('click');
      const updated = [...selectedWords];
      updated[slotIdx] = droppedWord;
      setSelectedWords(updated);
      setIsSubmitted(false);
    }
  };

  const handleAudioPrompt = (e: React.MouseEvent) => {
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

  // Renders dialogue with multiple blanks if needed
  const renderInteractiveDialogue = () => {
    let currentBlankIndex = 0;

    return (
      <div className="space-y-2">
        {activity.promptLinesEn.map((line, lIdx) => {
          const hasBlankInLine = line.includes('________');

          if (!hasBlankInLine) {
            return (
              <div key={lIdx} className="text-base sm:text-lg font-medium leading-relaxed">
                {line}
              </div>
            );
          }

          // Split line by '________'
          const segments = line.split('________');

          return (
            <div
              key={lIdx}
              className="text-base sm:text-lg font-medium leading-relaxed flex flex-wrap items-center gap-2"
            >
              {segments.map((seg, sIdx) => {
                const isLastSegment = sIdx === segments.length - 1;
                const slotIdx = currentBlankIndex;

                if (!isLastSegment) {
                  currentBlankIndex++;
                }

                const placedWord = selectedWords[slotIdx];
                const isThisSlotDragging = isDraggingOverSlot === slotIdx;

                return (
                  <React.Fragment key={sIdx}>
                    <span>{seg}</span>
                    {!isLastSegment && (
                      <span
                        onDragOver={(e) => handleDragOver(e, slotIdx)}
                        onDragLeave={handleDragLeave}
                        onDrop={(e) => handleDrop(e, slotIdx)}
                        onClick={() => placedWord && handleRemoveSlotWord(slotIdx)}
                        className={`inline-flex items-center justify-center min-w-[120px] sm:min-w-[140px] px-3 py-1.5 rounded-lg border-2 border-dashed transition-all cursor-pointer font-bold ${
                          isThisSlotDragging
                            ? 'border-blue-500 bg-blue-100 dark:bg-blue-900/40 scale-105'
                            : placedWord
                            ? isSubmitted
                              ? placedWord.toLowerCase() === activity.correctAnswer[slotIdx]?.toLowerCase()
                                ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
                                : 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300'
                              : 'border-blue-500 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 shadow-xs'
                            : isDark
                            ? 'border-slate-600 bg-slate-900/60 text-slate-400'
                            : 'border-slate-300 bg-slate-100 text-slate-400'
                        }`}
                      >
                        {placedWord || '________'}
                      </span>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  };

  // Determine available options (prevent placing same option multiple times if only 1 occurrence in options pool)
  const remainingOptions = activity.options.filter((opt) => {
    const totalCountInOptions = activity.options.filter((o) => o === opt).length;
    const countUsedInBlanks = selectedWords.filter((w) => w === opt).length;
    return countUsedInBlanks < totalCountInOptions;
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full items-start">
      {/* Left Column: Video Player with Dialogue (5 cols) */}
      <div className="lg:col-span-5 w-full">
        <PresentSimpleQuestionsVideoPlayer speechRate={speechRate} accent={accent} />
      </div>

      {/* Right Column: Activity / Interaction (7 cols) */}
      <div className="lg:col-span-7 flex flex-col gap-4 w-full">
        {/* Actividad 1: Video Explorer Overview */}
        {activity.actNumber === 1 ? (
          <div className="flex flex-col gap-4">
            <PresentSimpleQuestionsCard
              textEn={activity.instruction}
              textEs={activity.instructionEs}
              speechRate={speechRate}
              accent={accent}
              className="border-blue-200 dark:border-blue-900/50 bg-blue-50/40 dark:bg-blue-950/20"
            />

            {/* Grammar breakdown cards */}
            <div className="space-y-3">
              <PresentSimpleQuestionsCard
                textEn="Do you like my dog Brutus? — Yes, I do. / No, I don't."
                textEs="¿Te gusta mi perro Brutus? — Sí, me gusta. / No, no me gusta."
                highlightWords={['Do', 'like', 'do', "don't"]}
                speechRate={speechRate}
                accent={accent}
              />

              <PresentSimpleQuestionsCard
                textEn="Does he bite? — No, he doesn't... not usually. / Yes, he does."
                textEs="¿Muerde él? — No, no muerde... no habitualmente. / Sí, muerde."
                highlightWords={['Does', 'bite', "doesn't", 'does']}
                speechRate={speechRate}
                accent={accent}
              />

              <PresentSimpleQuestionsCard
                textEn="Rule: Do + I / you / we / they + base verb? | Does + he / she / it + base verb?"
                textEs="Regla: Do + I / you / we / they + verbo base? | Does + he / she / it + verbo base?"
                highlightWords={['Do', 'Does']}
                speechRate={speechRate}
                accent={accent}
              />
            </div>

            {/* Next Button */}
            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => {
                  onComplete();
                  onNext();
                }}
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all flex items-center gap-2 shadow-xs cursor-pointer"
              >
                <span>Siguiente Actividad</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        ) : (
          /* Actividades 2 to 10: Interactive Fill Blank */
          <div className="flex flex-col gap-4">
            {/* Instruction Card */}
            <PresentSimpleQuestionsCard
              textEn={activity.instruction}
              textEs={activity.instructionEs}
              speechRate={speechRate}
              accent={accent}
              className="border-slate-200 dark:border-slate-800"
            />

            {/* Exercise Box with optional scene illustration and reversible dialogue */}
            <div
              className={`p-5 rounded-2xl border transition-all ${
                isDark
                  ? 'bg-slate-800/80 border-slate-700 text-slate-100'
                  : 'bg-white border-slate-200 text-slate-800 shadow-xs'
              }`}
            >
              {/* Optional scene illustration */}
              {activity.image && (
                <div className="mb-4 rounded-xl overflow-hidden max-h-48 w-full bg-slate-950 flex items-center justify-center border border-slate-200 dark:border-slate-700">
                  <img
                    src={activity.image}
                    alt="Activity context"
                    referrerPolicy="no-referrer"
                    className="w-full h-48 object-cover"
                  />
                </div>
              )}

              {/* Header with audio prompt */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Completa el Diálogo
                </div>

                {/* Speaker icon only - no text */}
                <button
                  type="button"
                  onClick={handleAudioPrompt}
                  className={`p-2 rounded-lg transition-colors ${
                    isPromptPlaying
                      ? 'text-blue-500 bg-blue-50 dark:bg-blue-900/30'
                      : 'text-slate-500 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                  aria-label="Listen prompt"
                >
                  <Volume2 className={`w-5 h-5 ${isPromptPlaying ? 'animate-pulse' : ''}`} />
                </button>
              </div>

              {/* Dialogue Container */}
              <div
                onClick={() => setIsFlippedPrompt((prev) => !prev)}
                className="cursor-pointer transition-colors p-3 rounded-xl border border-dashed border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
              >
                {!isFlippedPrompt ? (
                  renderInteractiveDialogue()
                ) : (
                  <div className="space-y-2">
                    {activity.promptLinesEs.map((line, idx) => (
                      <div
                        key={idx}
                        className={`text-base sm:text-lg font-medium leading-relaxed italic ${
                          isDark ? 'text-amber-300' : 'text-amber-800'
                        }`}
                      >
                        {line}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Options Pool */}
            <div
              className={`p-4 rounded-2xl border transition-all ${
                isDark ? 'bg-slate-800/60 border-slate-700' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
                Opciones Disponibles
              </div>

              <div className="flex flex-wrap gap-2.5">
                {activity.options.map((opt, idx) => {
                  const isAvailable = remainingOptions.includes(opt);

                  return (
                    <button
                      key={idx}
                      type="button"
                      draggable={isAvailable && (!isSubmitted || !isCorrect)}
                      onDragStart={(e) => isAvailable && handleDragStart(e, opt)}
                      onClick={() => isAvailable && handleSelectOption(opt)}
                      disabled={!isAvailable || (isSubmitted && isCorrect)}
                      className={`px-4 py-2.5 rounded-xl font-medium text-sm sm:text-base transition-all select-none border cursor-pointer ${
                        !isAvailable
                          ? 'opacity-30 border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                          : isDark
                          ? 'bg-slate-800 border-slate-600 text-slate-200 hover:border-blue-500 hover:bg-slate-700 active:scale-95'
                          : 'bg-white border-slate-300 text-slate-800 hover:border-blue-500 hover:bg-blue-50/50 shadow-xs active:scale-95'
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Actions & Verification */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={handleReset}
                disabled={selectedWords.every((w) => w === null)}
                className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium text-sm transition-all flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reiniciar</span>
              </button>

              <div className="flex items-center gap-3">
                {!isSubmitted || !isCorrect ? (
                  <button
                    type="button"
                    onClick={handleCheckAnswer}
                    disabled={selectedWords.some((w) => w === null)}
                    className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2 shadow-xs cursor-pointer"
                  >
                    <span>Comprobar</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={onNext}
                    className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition-all flex items-center gap-2 shadow-xs cursor-pointer"
                  >
                    <span>Siguiente Actividad</span>
                    <ChevronRight className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>

            {/* Feedback Explanation Card */}
            {isSubmitted && (
              <div
                className={`p-4 rounded-xl border transition-all ${
                  isCorrect
                    ? isDark
                      ? 'bg-emerald-950/30 border-emerald-800/60 text-emerald-200'
                      : 'bg-emerald-50 border-emerald-200 text-emerald-900'
                    : isDark
                    ? 'bg-rose-950/30 border-rose-800/60 text-rose-200'
                    : 'bg-rose-50 border-rose-200 text-rose-900'
                }`}
              >
                <div className="flex items-start gap-3">
                  {isCorrect ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1 space-y-1">
                    <div className="font-semibold text-sm sm:text-base">
                      {isCorrect ? '¡Excelente! Respuesta correcta.' : 'Inténtalo de nuevo.'}
                    </div>
                    <div className="text-xs sm:text-sm leading-relaxed opacity-90">
                      {activity.explanationEn}
                    </div>
                    <div className="text-xs sm:text-sm leading-relaxed italic opacity-80 pt-0.5">
                      {activity.explanationEs}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
