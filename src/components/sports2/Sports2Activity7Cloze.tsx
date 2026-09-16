import React, { useState, useEffect } from 'react';
import {
  Volume2,
  Square,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Check,
  X,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  SPORTS2_ACT7_CLOZE,
  SportsClozeData,
} from '../../data/peopleCrazyAboutSportsData';
import { Sports2StoryCard } from './Sports2StoryCard';
import { speakEnglish, stopSpeaking, playFeedbackSound } from '../../utils/audio';
import { useTheme } from '../../context/ThemeContext';
import { SpeedSelectorButton } from '../SpeedSelectorButton';

export interface Sports2Activity7ClozeProps {
  accent?: 'US' | 'UK';
  speechRate?: number;
  onComplete?: () => void;
  data?: SportsClozeData;
}

export const Sports2Activity7Cloze: React.FC<Sports2Activity7ClozeProps> = ({
  accent = 'US',
  speechRate = 1.0,
  onComplete,
  data = SPORTS2_ACT7_CLOZE,
}) => {
  const { isDark } = useTheme();

  // Instruction flip
  const [isInstructionFlipped, setIsInstructionFlipped] = useState(false);
  // Exercise card flip
  const [isExerciseFlipped, setIsExerciseFlipped] = useState(false);

  // Placed answers: blankId -> word string
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [activeBlankId, setActiveBlankId] = useState<string | null>(null);
  const [draggedWord, setDraggedWord] = useState<string | null>(null);
  const [dragOverBlankId, setDragOverBlankId] = useState<string | null>(null);

  // Verification state
  const [isChecked, setIsChecked] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Audio playback state
  const [currentRate, setCurrentRate] = useState<number>(speechRate);
  const [isPlayingFullText, setIsPlayingFullText] = useState(false);

  useEffect(() => {
    setCurrentRate(speechRate);
  }, [speechRate]);

  useEffect(() => {
    return () => {
      stopSpeaking();
    };
  }, []);

  const handlePlayInstruction = (e: React.MouseEvent) => {
    e.stopPropagation();
    stopSpeaking();
    setIsPlayingFullText(false);
    speakEnglish(
      data.instructionsEn,
      currentRate,
      accent === 'UK' ? 'UK' : 'US',
      () => {},
      () => {},
      'female'
    );
  };

  const handleToggleFullAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPlayingFullText) {
      stopSpeaking();
      setIsPlayingFullText(false);
      return;
    }
    setIsPlayingFullText(true);
    speakEnglish(
      data.fullParagraphEn,
      currentRate,
      accent === 'UK' ? 'UK' : 'US',
      () => setIsPlayingFullText(true),
      () => setIsPlayingFullText(false),
      'female'
    );
  };

  // Used words list
  const usedWords = Object.values(answers);

  // Drag handlers
  const handleDragStart = (e: React.DragEvent, word: string) => {
    if (isChecked) return;
    e.dataTransfer.setData('text/plain', word);
    setDraggedWord(word);
  };

  const handleDragOver = (e: React.DragEvent, blankId: string) => {
    if (isChecked) return;
    e.preventDefault();
    setDragOverBlankId(blankId);
  };

  const handleDragLeave = () => {
    setDragOverBlankId(null);
  };

  const handleDrop = (e: React.DragEvent, blankId: string) => {
    if (isChecked) return;
    e.preventDefault();
    setDragOverBlankId(null);

    const word = e.dataTransfer.getData('text/plain') || draggedWord;
    if (!word) return;

    playFeedbackSound('click');
    setAnswers((prev) => ({
      ...prev,
      [blankId]: word,
    }));
    setActiveBlankId(null);
    setDraggedWord(null);
  };

  // Click handler for word chip: place into active blank or first empty blank
  const handleSelectWord = (word: string) => {
    if (isChecked) return;
    playFeedbackSound('click');

    let targetBlankId = activeBlankId;
    if (!targetBlankId) {
      const firstEmpty = data.blanks.find((b) => !answers[b.id]);
      if (firstEmpty) {
        targetBlankId = firstEmpty.id;
      }
    }

    if (targetBlankId) {
      setAnswers((prev) => ({
        ...prev,
        [targetBlankId as string]: word,
      }));
      // Advance to next empty blank
      const remainingEmpty = data.blanks.find(
        (b) => b.id !== targetBlankId && !answers[b.id]
      );
      setActiveBlankId(remainingEmpty ? remainingEmpty.id : null);
    }
  };

  // Clear a specific blank
  const handleClearBlank = (blankId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (isChecked) return;
    playFeedbackSound('click');
    setAnswers((prev) => {
      const next = { ...prev };
      delete next[blankId];
      return next;
    });
    setActiveBlankId(blankId);
  };

  // Verify answers
  const handleCheck = () => {
    if (Object.keys(answers).length < data.blanks.length) {
      playFeedbackSound('wrong');
      return;
    }

    setIsChecked(true);

    const allCorrect = data.blanks.every((b) => {
      const selected = answers[b.id];
      return selected && b.correctWords.includes(selected.toLowerCase().trim());
    });

    if (allCorrect) {
      setIsSuccess(true);
      playFeedbackSound('correct');
      confetti({
        particleCount: 70,
        spread: 70,
        origin: { y: 0.7 },
      });
      if (onComplete) {
        onComplete();
      }
    } else {
      setIsSuccess(false);
      playFeedbackSound('wrong');
    }
  };

  // Reset all
  const handleReset = () => {
    playFeedbackSound('click');
    setAnswers({});
    setIsChecked(false);
    setIsSuccess(false);
    setActiveBlankId(null);
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Top Reversible Instruction Card */}
      <div
        id="sports2-act7-instruction-card"
        onClick={() => {
          playFeedbackSound('flip');
          setIsInstructionFlipped((prev) => !prev);
        }}
        className="w-full perspective-1000 cursor-pointer select-none"
      >
        <div
          className={`grid grid-cols-1 grid-rows-1 transition-transform duration-500 transform-style-3d ${
            isInstructionFlipped ? 'rotate-y-180' : ''
          }`}
        >
          {/* Front: English */}
          <div
            className={`col-start-1 row-start-1 backface-hidden w-full rounded-2xl border p-4 sm:p-5 shadow-xs flex items-center justify-between transition-colors ${
              isDark
                ? 'bg-slate-900 border-slate-800 text-slate-100'
                : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-sky-500 shrink-0" />
              <p className="font-semibold text-sm sm:text-base leading-snug">
                {data.instructionsEn}
              </p>
            </div>
            <button
              id="sports2-act7-instruction-audio-btn"
              type="button"
              onClick={handlePlayInstruction}
              className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all cursor-pointer shrink-0 ${
                isDark
                  ? 'bg-slate-800 border-slate-700 text-sky-400 hover:bg-slate-700'
                  : 'bg-stone-50 border-stone-200 text-sky-600 hover:bg-stone-100'
              }`}
              aria-label="Speaker"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>

          {/* Back: Spanish */}
          <div
            className={`col-start-1 row-start-1 backface-hidden rotate-y-180 w-full rounded-2xl border p-4 sm:p-5 shadow-xs flex items-center justify-between transition-colors ${
              isDark
                ? 'bg-slate-900 border-slate-800 text-slate-100'
                : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
              <p className="font-semibold text-sm sm:text-base leading-snug text-emerald-600 dark:text-emerald-400">
                {data.instructionsEs}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2-Column Layout: Story on left, Sentences cloze on right */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Reading Story */}
        <div className="lg:col-span-6 w-full">
          <Sports2StoryCard
            accent={accent}
            speechRate={speechRate}
            compact={true}
          />
        </div>

        {/* Right Column: Sentences with Blanks + Word Bank */}
        <div className="lg:col-span-6 w-full flex flex-col gap-4">
          {/* Reversible Exercise Card */}
          <div className="w-full perspective-1000">
            <div
              className={`grid grid-cols-1 grid-rows-1 transition-transform duration-500 transform-style-3d ${
                isExerciseFlipped ? 'rotate-y-180' : ''
              }`}
            >
              {/* Front: Interactive Cloze Blanks */}
              <div
                onClick={() => {
                  playFeedbackSound('flip');
                  setIsExerciseFlipped(true);
                }}
                className={`col-start-1 row-start-1 backface-hidden w-full rounded-2xl sm:rounded-3xl border p-6 sm:p-8 shadow-xs flex flex-col gap-6 cursor-pointer select-none transition-colors relative ${
                  isDark
                    ? 'bg-slate-900 border-slate-800 text-slate-100'
                    : 'bg-white border-slate-200 text-slate-900'
                }`}
              >
                {/* Audio Controls Bar */}
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center justify-between border-b pb-3 border-slate-100 dark:border-slate-800"
                >
                  <span className="text-xs font-bold uppercase tracking-wider font-mono text-slate-400">
                    Actividad 7
                  </span>

                  <div className="flex items-center gap-2">
                    <SpeedSelectorButton
                      currentRate={currentRate}
                      onRateChange={(r) => setCurrentRate(r)}
                    />
                    <button
                      type="button"
                      id="sports2-act7-full-audio-btn"
                      onClick={handleToggleFullAudio}
                      className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all cursor-pointer shadow-xs ${
                        isPlayingFullText
                          ? 'bg-sky-500 text-white ring-4 ring-sky-500/25 scale-105'
                          : isDark
                          ? 'bg-slate-800 hover:bg-slate-700 text-sky-400 border-slate-700'
                          : 'bg-stone-50 hover:bg-stone-100 text-sky-600 border-stone-200'
                      }`}
                      aria-label="Speaker"
                    >
                      {isPlayingFullText ? (
                        <Square className="w-3.5 h-3.5 fill-current" />
                      ) : (
                        <Volume2 className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Sentences paragraph with drop slots */}
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="text-base sm:text-lg leading-loose font-serif text-slate-800 dark:text-slate-200 space-y-3"
                >
                  {/* Sentence 1 & Sentence 2 & Sentence 3 */}
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-3">
                    {/* Blank 1 */}
                    <span>{data.blanks[0].prefixEn}</span>

                    <div
                      onDragOver={(e) => handleDragOver(e, data.blanks[0].id)}
                      onDragLeave={handleDragLeave}
                      onDrop={(e) => handleDrop(e, data.blanks[0].id)}
                      onClick={() => {
                        if (isChecked) return;
                        setActiveBlankId(
                          activeBlankId === data.blanks[0].id
                            ? null
                            : data.blanks[0].id
                        );
                      }}
                      className={`inline-flex items-center justify-center min-w-[110px] h-9 px-3 rounded-xl border font-sans font-bold text-sm transition-all cursor-pointer select-none ${
                        answers[data.blanks[0].id]
                          ? isChecked
                            ? data.blanks[0].correctWords.includes(
                                answers[data.blanks[0].id]?.toLowerCase()
                              )
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-500 dark:bg-emerald-950/40 dark:text-emerald-300'
                              : 'bg-rose-50 text-rose-700 border-rose-500 dark:bg-rose-950/40 dark:text-rose-300'
                            : 'bg-sky-50 text-sky-800 border-sky-400 dark:bg-sky-950/40 dark:text-sky-200'
                          : dragOverBlankId === data.blanks[0].id
                          ? 'border-2 border-dashed border-sky-500 bg-sky-500/10'
                          : activeBlankId === data.blanks[0].id
                          ? 'border-2 border-dashed border-sky-500 bg-sky-500/10'
                          : 'border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-sky-400 bg-slate-50/50 dark:bg-slate-800/30'
                      }`}
                    >
                      {answers[data.blanks[0].id] ? (
                        <div className="flex items-center gap-1.5">
                          <span>{answers[data.blanks[0].id]}</span>
                          {!isChecked && (
                            <button
                              type="button"
                              onClick={(e) =>
                                handleClearBlank(data.blanks[0].id, e)
                              }
                              className="text-slate-400 hover:text-rose-500 transition-colors"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      ) : (
                        <span className="text-xs text-slate-400 italic">
                          arrastra aquí
                        </span>
                      )}
                    </div>

                    <span>{data.blanks[0].suffixEn}</span>

                    {/* Blank 2 */}
                    <span>{data.blanks[1].prefixEn}</span>

                    <div
                      onDragOver={(e) => handleDragOver(e, data.blanks[1].id)}
                      onDragLeave={handleDragLeave}
                      onDrop={(e) => handleDrop(e, data.blanks[1].id)}
                      onClick={() => {
                        if (isChecked) return;
                        setActiveBlankId(
                          activeBlankId === data.blanks[1].id
                            ? null
                            : data.blanks[1].id
                        );
                      }}
                      className={`inline-flex items-center justify-center min-w-[110px] h-9 px-3 rounded-xl border font-sans font-bold text-sm transition-all cursor-pointer select-none ${
                        answers[data.blanks[1].id]
                          ? isChecked
                            ? data.blanks[1].correctWords.includes(
                                answers[data.blanks[1].id]?.toLowerCase()
                              )
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-500 dark:bg-emerald-950/40 dark:text-emerald-300'
                              : 'bg-rose-50 text-rose-700 border-rose-500 dark:bg-rose-950/40 dark:text-rose-300'
                            : 'bg-sky-50 text-sky-800 border-sky-400 dark:bg-sky-950/40 dark:text-sky-200'
                          : dragOverBlankId === data.blanks[1].id
                          ? 'border-2 border-dashed border-sky-500 bg-sky-500/10'
                          : activeBlankId === data.blanks[1].id
                          ? 'border-2 border-dashed border-sky-500 bg-sky-500/10'
                          : 'border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-sky-400 bg-slate-50/50 dark:bg-slate-800/30'
                      }`}
                    >
                      {answers[data.blanks[1].id] ? (
                        <div className="flex items-center gap-1.5">
                          <span>{answers[data.blanks[1].id]}</span>
                          {!isChecked && (
                            <button
                              type="button"
                              onClick={(e) =>
                                handleClearBlank(data.blanks[1].id, e)
                              }
                              className="text-slate-400 hover:text-rose-500 transition-colors"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      ) : (
                        <span className="text-xs text-slate-400 italic">
                          arrastra aquí
                        </span>
                      )}
                    </div>

                    <span>{data.blanks[1].suffixEn}</span>

                    {/* Blank 3 */}
                    <div
                      onDragOver={(e) => handleDragOver(e, data.blanks[2].id)}
                      onDragLeave={handleDragLeave}
                      onDrop={(e) => handleDrop(e, data.blanks[2].id)}
                      onClick={() => {
                        if (isChecked) return;
                        setActiveBlankId(
                          activeBlankId === data.blanks[2].id
                            ? null
                            : data.blanks[2].id
                        );
                      }}
                      className={`inline-flex items-center justify-center min-w-[110px] h-9 px-3 rounded-xl border font-sans font-bold text-sm transition-all cursor-pointer select-none ${
                        answers[data.blanks[2].id]
                          ? isChecked
                            ? data.blanks[2].correctWords.includes(
                                answers[data.blanks[2].id]?.toLowerCase()
                              )
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-500 dark:bg-emerald-950/40 dark:text-emerald-300'
                              : 'bg-rose-50 text-rose-700 border-rose-500 dark:bg-rose-950/40 dark:text-rose-300'
                            : 'bg-sky-50 text-sky-800 border-sky-400 dark:bg-sky-950/40 dark:text-sky-200'
                          : dragOverBlankId === data.blanks[2].id
                          ? 'border-2 border-dashed border-sky-500 bg-sky-500/10'
                          : activeBlankId === data.blanks[2].id
                          ? 'border-2 border-dashed border-sky-500 bg-sky-500/10'
                          : 'border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-sky-400 bg-slate-50/50 dark:bg-slate-800/30'
                      }`}
                    >
                      {answers[data.blanks[2].id] ? (
                        <div className="flex items-center gap-1.5">
                          <span>{answers[data.blanks[2].id]}</span>
                          {!isChecked && (
                            <button
                              type="button"
                              onClick={(e) =>
                                handleClearBlank(data.blanks[2].id, e)
                              }
                              className="text-slate-400 hover:text-rose-500 transition-colors"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      ) : (
                        <span className="text-xs text-slate-400 italic">
                          arrastra aquí
                        </span>
                      )}
                    </div>

                    <span>{data.blanks[2].suffixEn}</span>
                  </div>
                </div>

                {/* Word Bank Chips (Clean minimal style matching screenshot) */}
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2.5"
                >
                  <div className="flex flex-wrap gap-2.5">
                    {data.wordBank.map((word) => {
                      const isUsed = usedWords.includes(word);

                      return (
                        <button
                          key={word}
                          type="button"
                          draggable={!isChecked && !isUsed}
                          onDragStart={(e) => handleDragStart(e, word)}
                          onClick={() => handleSelectWord(word)}
                          disabled={isChecked || isUsed}
                          className={`px-4 py-2 rounded-xl border text-sm font-semibold transition-all select-none shadow-2xs ${
                            isUsed
                              ? 'opacity-30 border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800/50 text-slate-400 cursor-not-allowed'
                              : isDark
                              ? 'bg-slate-800 hover:bg-sky-600 text-white border-slate-700 hover:border-sky-500 cursor-grab active:cursor-grabbing hover:scale-105'
                              : 'bg-white hover:bg-sky-500 hover:text-white text-slate-800 border-slate-200 hover:border-sky-500 cursor-grab active:cursor-grabbing hover:scale-105'
                          }`}
                        >
                          {word}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Back: Spanish Translation */}
              <div
                onClick={() => {
                  playFeedbackSound('flip');
                  setIsExerciseFlipped(false);
                }}
                className={`col-start-1 row-start-1 backface-hidden rotate-y-180 w-full rounded-2xl sm:rounded-3xl border p-6 sm:p-8 shadow-xs flex flex-col gap-4 cursor-pointer select-none transition-colors ${
                  isDark
                    ? 'bg-slate-900 border-slate-800 text-slate-100'
                    : 'bg-white border-slate-200 text-slate-900'
                }`}
              >
                <div className="border-b pb-3 border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider font-mono text-emerald-600 dark:text-emerald-400">
                    Traducción
                  </span>
                </div>

                <p className="text-base sm:text-lg leading-relaxed font-serif italic text-slate-700 dark:text-slate-300">
                  {data.fullParagraphEs}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons: Check & Reset */}
          <div className="flex items-center justify-between gap-3 pt-1">
            <button
              type="button"
              id="sports2-act7-reset-btn"
              onClick={handleReset}
              className={`px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                isDark
                  ? 'border-slate-700 hover:bg-slate-800 text-slate-300'
                  : 'border-slate-200 hover:bg-stone-50 text-slate-600'
              }`}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Limpiar</span>
            </button>

            <button
              type="button"
              id="sports2-act7-check-btn"
              onClick={handleCheck}
              disabled={Object.keys(answers).length < data.blanks.length}
              className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 shadow-xs cursor-pointer ${
                Object.keys(answers).length < data.blanks.length
                  ? 'opacity-40 cursor-not-allowed bg-slate-300 dark:bg-slate-800 text-slate-500'
                  : isChecked
                  ? isSuccess
                    ? 'bg-emerald-500 text-white'
                    : 'bg-rose-500 text-white'
                  : 'bg-sky-500 hover:bg-sky-600 text-white active:scale-95'
              }`}
            >
              {isChecked ? (
                isSuccess ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>¡Correcto!</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4" />
                    <span>Reintentar</span>
                  </>
                )
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  <span>Verificar</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
