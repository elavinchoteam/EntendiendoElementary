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
import { PresentSimpleActivityItem } from '../../data/presentSimpleData';
import { PresentSimpleVideoPlayer } from './PresentSimpleVideoPlayer';
import { PresentSimpleCard } from './PresentSimpleCard';

export interface PresentSimpleActivitySlideProps {
  activity: PresentSimpleActivityItem;
  speechRate: number;
  accent: 'US' | 'UK';
  onNext: () => void;
  onComplete: () => void;
}

export const PresentSimpleActivitySlide: React.FC<PresentSimpleActivitySlideProps> = ({
  activity,
  speechRate,
  accent,
  onNext,
  onComplete,
}) => {
  const { isDark } = useTheme();

  // Selected word in blank
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [isFlippedPrompt, setIsFlippedPrompt] = useState(false);
  const [isPromptPlaying, setIsPromptPlaying] = useState(false);

  // Reset states whenever activity changes
  useEffect(() => {
    setSelectedWord(null);
    setIsSubmitted(false);
    setIsCorrect(false);
    setIsDraggingOver(false);
    setIsFlippedPrompt(false);
    setIsPromptPlaying(false);
    stopSpeaking();
  }, [activity.id]);

  const handleSelectOption = (word: string) => {
    if (isSubmitted && isCorrect) return;
    setSelectedWord(word);
    setIsSubmitted(false);
  };

  const handleRemovePlacedWord = () => {
    if (isSubmitted && isCorrect) return;
    setSelectedWord(null);
    setIsSubmitted(false);
  };

  const handleCheckAnswer = () => {
    if (!selectedWord) return;

    const correct =
      selectedWord.trim().toLowerCase() ===
      activity.correctAnswer.trim().toLowerCase();

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
    setSelectedWord(null);
    setIsSubmitted(false);
    setIsCorrect(false);
  };

  // Drag & drop handlers
  const handleDragStart = (e: React.DragEvent, word: string) => {
    e.dataTransfer.setData('text/plain', word);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragLeave = () => {
    setIsDraggingOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(false);
    const word = e.dataTransfer.getData('text/plain');
    if (word && activity.options.includes(word)) {
      handleSelectOption(word);
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

  return (
    <div className="flex flex-col gap-5 w-full">
      {/* Instruction Banner at top */}
      <div
        className={`px-4 py-2.5 rounded-xl border flex items-center justify-between text-sm ${
          isDark ? 'bg-slate-900 border-slate-800 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'
        }`}
      >
        <span className="font-semibold text-blue-600 dark:text-blue-400">
          {activity.actNumber === 1
            ? 'Actividad 1 · Introducción Gramatical'
            : `Actividad ${activity.actNumber} · Arrastra o selecciona`}
        </span>
        <span className="text-xs text-slate-500 dark:text-slate-400">
          {activity.instruction}
        </span>
      </div>

      {/* Main 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Video Player & Subtitle (approx 5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <PresentSimpleVideoPlayer speechRate={speechRate} accent={accent} />
        </div>

        {/* Right Column: Interactive Content (approx 7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-5">
          {/* Actividad 1: Statement Showcase Card */}
          {activity.actNumber === 1 ? (
            <div className="flex flex-col gap-4">
              <div
                className={`p-6 rounded-2xl border ${
                  isDark
                    ? 'bg-slate-900 border-slate-800'
                    : 'bg-white border-slate-200 shadow-xs'
                }`}
              >
                <div className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-2 uppercase tracking-wide">
                  Regla de Presente Simple
                </div>

                {/* Big Statement Reversible Card */}
                <PresentSimpleCard
                  textEn={activity.fullSentenceEn}
                  textEs={activity.fullSentenceEs}
                  highlightWords={['swims', "doesn't swim"]}
                  speechRate={speechRate}
                  accent={accent}
                  className="mb-4 text-lg"
                />

                <div
                  className={`p-4 rounded-xl border text-sm space-y-2.5 ${
                    isDark
                      ? 'bg-slate-800/80 border-slate-700 text-slate-200'
                      : 'bg-slate-50 border-slate-200 text-slate-700'
                  }`}
                >
                  <p>
                    <strong className="text-emerald-600 dark:text-emerald-400">
                      1. Oraciones Afirmativas:
                    </strong>{' '}
                    Para <em>he / she / it</em>, agregamos <strong>-s</strong> o{' '}
                    <strong>-es</strong> al verbo (ejemplo:{' '}
                    <span className="underline font-semibold">Peter swims</span>).
                  </p>
                  <p>
                    <strong className="text-blue-600 dark:text-blue-400">
                      2. Oraciones Negativas:
                    </strong>{' '}
                    Para <em>he / she / it</em>, usamos{' '}
                    <strong>doesn't</strong> + el verbo en forma base (ejemplo:{' '}
                    <span className="underline font-semibold">He doesn't swim</span>).
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 pt-1 border-t border-slate-200 dark:border-slate-700">
                    Toca la tarjeta superior para voltearla y ver la traducción, o el
                    parlante para escuchar la pronunciación.
                  </p>
                </div>
              </div>

              {/* Next Button */}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    playFeedbackSound('click');
                    onComplete();
                    onNext();
                  }}
                  className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium flex items-center gap-2 shadow-md transition-all"
                >
                  <span>Comenzar Actividad 2</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          ) : (
            /* Actividades 2 to 11: Drag and Drop Fill in the Blank */
            <div
              className={`p-6 rounded-2xl border flex flex-col gap-6 ${
                isDark
                  ? 'bg-slate-900 border-slate-800'
                  : 'bg-white border-slate-200 shadow-xs'
              }`}
            >
              {/* Optional Header Image (Actividad 10 has the classroom illustration) */}
              {activity.image && (
                <div className="w-full flex justify-center mb-2">
                  <div className="relative max-w-xs sm:max-w-sm rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-xs">
                    <img
                      src={activity.image}
                      alt="Boring meeting classroom"
                      referrerPolicy="no-referrer"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </div>
              )}

              {/* Reversible Prompt Card with Blank Slot */}
              <div
                onClick={() => setIsFlippedPrompt((prev) => !prev)}
                className={`cursor-pointer p-5 rounded-xl border select-none transition-all ${
                  isDark
                    ? 'bg-slate-800 border-slate-700 hover:border-slate-600'
                    : 'bg-slate-50 border-slate-200 hover:border-slate-300 shadow-xs'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 text-base sm:text-lg leading-loose">
                    {!isFlippedPrompt ? (
                      <div className="space-y-3">
                        {activity.promptLinesEn.map((line, lIdx) => {
                          if (line.includes('________')) {
                            const [before, after] = line.split('________');
                            return (
                              <div key={lIdx} className="flex flex-wrap items-center gap-2">
                                <span>{before}</span>

                                {/* The Interactive Blank Target */}
                                <span
                                  onDragOver={handleDragOver}
                                  onDragLeave={handleDragLeave}
                                  onDrop={handleDrop}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    if (selectedWord) handleRemovePlacedWord();
                                  }}
                                  className={`inline-flex items-center justify-center min-w-[120px] px-3 py-1 rounded-lg border-2 text-base font-semibold transition-all ${
                                    isSubmitted
                                      ? isCorrect
                                        ? 'border-emerald-500 bg-emerald-50 text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300'
                                        : 'border-rose-500 bg-rose-50 text-rose-900 dark:bg-rose-950/40 dark:text-rose-300'
                                      : selectedWord
                                      ? 'border-blue-500 bg-blue-50 text-blue-900 dark:bg-blue-950/40 dark:text-blue-300'
                                      : isDraggingOver
                                      ? 'border-blue-400 bg-blue-100 dark:bg-blue-900/50 border-dashed'
                                      : 'border-slate-300 dark:border-slate-600 border-dashed bg-white dark:bg-slate-900 text-slate-400'
                                  }`}
                                >
                                  {selectedWord || '________'}
                                </span>

                                <span>{after}</span>
                              </div>
                            );
                          }
                          return <div key={lIdx}>{line}</div>;
                        })}
                      </div>
                    ) : (
                      <div
                        className={`space-y-3 ${
                          isDark ? 'text-amber-300' : 'text-amber-800'
                        }`}
                      >
                        {activity.promptLinesEs.map((line, lIdx) => (
                          <div key={lIdx}>{line}</div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* ONLY Speaker Icon Button */}
                  <button
                    type="button"
                    onClick={handlePlayPromptAudio}
                    className={`shrink-0 p-2.5 rounded-lg transition-colors ${
                      isPromptPlaying
                        ? 'bg-blue-600 text-white animate-pulse'
                        : isDark
                        ? 'bg-slate-700 hover:bg-slate-600 text-slate-200'
                        : 'bg-white hover:bg-slate-200 text-slate-700 border border-slate-200 shadow-xs'
                    }`}
                    aria-label="Audio"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Draggable and Clickable Options Container */}
              <div className="pt-2">
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">
                  Opciones (arrastra o haz clic)
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  {activity.options.map((opt, oIdx) => {
                    const isSelected = selectedWord === opt;
                    return (
                      <button
                        key={oIdx}
                        type="button"
                        draggable={!isSubmitted || !isCorrect}
                        onDragStart={(e) => handleDragStart(e, opt)}
                        onClick={() => handleSelectOption(opt)}
                        disabled={isSubmitted && isCorrect}
                        className={`px-4 py-2.5 rounded-xl border text-sm sm:text-base font-medium transition-all shadow-xs cursor-pointer select-none ${
                          isSelected
                            ? 'bg-blue-600 text-white border-blue-600 ring-2 ring-blue-400/50'
                            : isDark
                            ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700 hover:border-slate-600'
                            : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50 hover:border-slate-300'
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Feedback and Check / Next Controls */}
              <div className="flex flex-col gap-4 pt-3 border-t border-slate-200 dark:border-slate-800">
                {/* Result Feedback Banner */}
                {isSubmitted && (
                  <div
                    className={`p-4 rounded-xl border flex items-start gap-3 animate-in fade-in ${
                      isCorrect
                        ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                        : 'bg-rose-50 dark:bg-rose-950/30 border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-200'
                    }`}
                  >
                    {isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1 text-sm">
                      <div className="font-semibold mb-1">
                        {isCorrect ? '¡Excelente! Respuesta correcta.' : 'Respuesta incorrecta.'}
                      </div>
                      <div className="opacity-90">{activity.explanationEs}</div>
                    </div>
                  </div>
                )}

                {/* Bottom Action Buttons */}
                <div className="flex items-center justify-between gap-3">
                  {selectedWord && !isCorrect && isSubmitted ? (
                    <button
                      type="button"
                      onClick={handleReset}
                      className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium text-sm flex items-center gap-2 transition-colors"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Intentar de nuevo</span>
                    </button>
                  ) : (
                    <div />
                  )}

                  {!isSubmitted || !isCorrect ? (
                    <button
                      type="button"
                      onClick={handleCheckAnswer}
                      disabled={!selectedWord}
                      className={`px-6 py-2.5 rounded-xl font-medium text-sm transition-all ${
                        selectedWord
                          ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md cursor-pointer'
                          : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      Comprobar
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        playFeedbackSound('click');
                        onNext();
                      }}
                      className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm flex items-center gap-2 shadow-md transition-all cursor-pointer"
                    >
                      <span>Siguiente Actividad</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
