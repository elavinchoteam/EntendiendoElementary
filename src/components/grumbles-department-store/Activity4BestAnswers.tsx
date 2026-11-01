import React, { useState } from 'react';
import {
  Check,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Volume2,
  RefreshCw,
  Sparkles,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { speakEnglish, stopSpeaking, playFeedbackSound } from '../../utils/audio';
import { TammyEmailCard } from './TammyEmailCard';
import { ACTIVITY_4_QUESTIONS, BestAnswerQuestion } from '../../data/grumblesDepartmentStoreData';

interface Activity4BestAnswersProps {
  speed?: number;
  accent?: 'US' | 'UK';
}

export const Activity4BestAnswers: React.FC<Activity4BestAnswersProps> = ({
  speed = 1.0,
  accent = 'US',
}) => {
  const { isDark } = useTheme();

  // Instruction flip
  const [isHeaderFlipped, setIsHeaderFlipped] = useState(false);
  const instructionEn = 'Choose the best answers for the questions below.';
  const instructionEs = 'Elige las mejores respuestas para las siguientes preguntas.';

  // Question 1 (single choice): selected optId
  const [selectedQ1, setSelectedQ1] = useState<string | null>(null);

  // Question 2 (multi-select checkboxes): optId -> boolean
  const [selectedQ2, setSelectedQ2] = useState<Record<string, boolean>>({});

  // Flipped states
  const [flippedQuestions, setFlippedQuestions] = useState<Record<string, boolean>>({});
  const [flippedOptions, setFlippedOptions] = useState<Record<string, boolean>>({});

  // Check state
  const [hasChecked, setHasChecked] = useState(false);
  const [isAllCorrect, setIsAllCorrect] = useState(false);

  const handleSelectQ1 = (optId: string) => {
    playFeedbackSound('click');
    setSelectedQ1(optId);
    setHasChecked(false);
  };

  const handleToggleQ2 = (optId: string) => {
    playFeedbackSound('click');
    setSelectedQ2((prev) => ({
      ...prev,
      [optId]: !prev[optId],
    }));
    setHasChecked(false);
  };

  const handleToggleQuestionFlip = (qId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    playFeedbackSound('click');
    setFlippedQuestions((prev) => ({
      ...prev,
      [qId]: !prev[qId],
    }));
  };

  const handleToggleOptionFlip = (optKey: string, e: React.MouseEvent) => {
    e.stopPropagation();
    playFeedbackSound('click');
    setFlippedOptions((prev) => ({
      ...prev,
      [optKey]: !prev[optKey],
    }));
  };

  const handlePlayAudio = (textEn: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    stopSpeaking();
    playFeedbackSound('click');
    speakEnglish(textEn, speed, accent);
  };

  const handleCheck = () => {
    playFeedbackSound('click');
    setHasChecked(true);

    const q1Correct = selectedQ1 === 'c';
    const q2Options = ACTIVITY_4_QUESTIONS[1].options;
    const q2Correct = q2Options.every((opt) => {
      const isSelected = !!selectedQ2[opt.id];
      return isSelected === opt.isCorrect;
    });

    const allCorrect = q1Correct && q2Correct;
    setIsAllCorrect(allCorrect);

    if (allCorrect) {
      playFeedbackSound('correct');
    } else {
      playFeedbackSound('wrong');
    }
  };

  const handleReset = () => {
    playFeedbackSound('click');
    setSelectedQ1(null);
    setSelectedQ2({});
    setHasChecked(false);
    setIsAllCorrect(false);
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-4">
      {/* Reversible Instruction Header Card */}
      <div
        className={`p-3.5 sm:p-4 rounded-2xl border transition-all shadow-xs ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        }`}
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 text-[11px] font-bold rounded-md bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 uppercase tracking-wider font-mono">
                Actividad 4 · Choose the best answers
              </span>
              <span className="text-xs text-slate-400 font-medium hidden sm:inline">
                {isHeaderFlipped ? 'Español' : 'English'}
              </span>
            </div>
            {!isHeaderFlipped ? (
              <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 leading-relaxed">
                {instructionEn}
              </p>
            ) : (
              <p className="text-xs sm:text-sm font-medium italic text-emerald-800 dark:text-emerald-300 leading-relaxed font-serif">
                {instructionEs}
              </p>
            )}
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => {
                playFeedbackSound('click');
                setIsHeaderFlipped((prev) => !prev);
              }}
              className={`w-8 h-8 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                isHeaderFlipped
                  ? 'bg-emerald-500 text-white border-emerald-600'
                  : isDark
                  ? 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
                  : 'bg-slate-100 border-slate-200 text-slate-700 hover:text-slate-900'
              }`}
              title="Voltear instrucción al español"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isHeaderFlipped ? 'rotate-180' : ''}`} />
            </button>
            <button
              type="button"
              onClick={(e) => handlePlayAudio(instructionEn, e)}
              className={`w-8 h-8 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                isDark
                  ? 'bg-slate-800 border-slate-700 text-sky-400 hover:text-white'
                  : 'bg-slate-100 border-slate-200 text-sky-600 hover:text-sky-800'
              }`}
              title="Escuchar instrucción"
            >
              <Volume2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main 2-column layout matching screenshot */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left: Email card */}
        <div className="lg:col-span-6">
          <TammyEmailCard speed={speed} accent={accent} />
        </div>

        {/* Right: 2 Questions */}
        <div className="lg:col-span-6 space-y-4">
          <div
            className={`p-4 sm:p-5 rounded-2xl border ${
              isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}
          >
            {/* Question 1: Tammy has a summer job. This means... */}
            <div className="mb-6 pb-5 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 block mb-0.5">
                    Pregunta 1
                  </span>
                  {!flippedQuestions['q1'] ? (
                    <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                      Tammy has a summer job. This means...
                    </p>
                  ) : (
                    <p className="text-xs sm:text-sm font-medium italic text-emerald-800 dark:text-emerald-300 font-serif">
                      Tammy tiene un trabajo de verano. Esto significa que...
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={(e) => handleToggleQuestionFlip('q1', e)}
                    className="w-6 h-6 rounded-md border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer"
                    title="Traducir pregunta"
                  >
                    <RefreshCw className={`w-3 h-3 ${flippedQuestions['q1'] ? 'rotate-180' : ''}`} />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => handlePlayAudio('Tammy has a summer job. This means...', e)}
                    className="w-6 h-6 rounded-md border border-slate-200 dark:border-slate-700 flex items-center justify-center text-sky-500 hover:text-sky-700 cursor-pointer"
                    title="Escuchar"
                  >
                    <Volume2 className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Q1 options (checkbox style matching screenshot) */}
              <div className="space-y-2">
                {ACTIVITY_4_QUESTIONS[0].options.map((opt) => {
                  const isSelected = selectedQ1 === opt.id;
                  const isFlipped = !!flippedOptions[`q1-${opt.id}`];
                  const isThisCorrect = opt.isCorrect;

                  let optClass = isDark
                    ? 'border-slate-800 bg-slate-900/60 hover:bg-slate-800/60'
                    : 'border-slate-200 bg-white hover:bg-slate-50';

                  if (isSelected) {
                    optClass = isDark
                      ? 'border-sky-500 bg-sky-950/40 text-sky-200 ring-1 ring-sky-500/40'
                      : 'border-sky-400 bg-sky-50 text-sky-900 ring-1 ring-sky-400/40';
                  }

                  if (hasChecked) {
                    if (isThisCorrect) {
                      optClass =
                        'border-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-100';
                    } else if (isSelected && !isThisCorrect) {
                      optClass =
                        'border-rose-400 bg-rose-50 dark:bg-rose-950/40 text-rose-950 dark:text-rose-100';
                    }
                  }

                  return (
                    <div
                      key={opt.id}
                      onClick={() => handleSelectQ1(opt.id)}
                      className={`p-2.5 rounded-lg border flex items-center justify-between gap-2 transition-all cursor-pointer select-none ${optClass}`}
                    >
                      <div className="flex items-center gap-2.5 flex-1 min-w-0">
                        <div
                          className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 ${
                            isSelected
                              ? 'border-sky-500 bg-sky-500 text-white'
                              : isDark
                              ? 'border-slate-500 bg-slate-800'
                              : 'border-slate-400 bg-white'
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>

                        <div className="flex-1 min-w-0">
                          {!isFlipped ? (
                            <span className="text-xs sm:text-sm font-medium">{opt.text}</span>
                          ) : (
                            <span className="text-xs sm:text-sm font-medium italic text-emerald-800 dark:text-emerald-300 font-serif">
                              {opt.textEs}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          type="button"
                          onClick={(e) => handleToggleOptionFlip(`q1-${opt.id}`, e)}
                          className="w-5 h-5 rounded flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer"
                          title="Traducir"
                        >
                          <RefreshCw className={`w-2.5 h-2.5 ${isFlipped ? 'rotate-180' : ''}`} />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => handlePlayAudio(opt.text, e)}
                          className="w-5 h-5 rounded flex items-center justify-center text-sky-500 hover:text-sky-700 cursor-pointer"
                          title="Escuchar"
                        >
                          <Volume2 className="w-2.5 h-2.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Question 2: Which things can you buy in a department store? */}
            <div>
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 block mb-0.5">
                    Pregunta 2 (Selección Múltiple)
                  </span>
                  {!flippedQuestions['q2'] ? (
                    <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                      Which things can you buy in a department store?
                    </p>
                  ) : (
                    <p className="text-xs sm:text-sm font-medium italic text-emerald-800 dark:text-emerald-300 font-serif">
                      ¿Qué cosas puedes comprar en una tienda por departamentos?
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={(e) => handleToggleQuestionFlip('q2', e)}
                    className="w-6 h-6 rounded-md border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer"
                    title="Traducir pregunta"
                  >
                    <RefreshCw className={`w-3 h-3 ${flippedQuestions['q2'] ? 'rotate-180' : ''}`} />
                  </button>
                  <button
                    type="button"
                    onClick={(e) =>
                      handlePlayAudio('Which things can you buy in a department store?', e)
                    }
                    className="w-6 h-6 rounded-md border border-slate-200 dark:border-slate-700 flex items-center justify-center text-sky-500 hover:text-sky-700 cursor-pointer"
                    title="Escuchar"
                  >
                    <Volume2 className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Q2 options */}
              <div className="space-y-2">
                {ACTIVITY_4_QUESTIONS[1].options.map((opt) => {
                  const isSelected = !!selectedQ2[opt.id];
                  const isFlipped = !!flippedOptions[`q2-${opt.id}`];
                  const isThisCorrect = opt.isCorrect;

                  let optClass = isDark
                    ? 'border-slate-800 bg-slate-900/60 hover:bg-slate-800/60'
                    : 'border-slate-200 bg-white hover:bg-slate-50';

                  if (isSelected) {
                    optClass = isDark
                      ? 'border-sky-500 bg-sky-950/40 text-sky-200 ring-1 ring-sky-500/40'
                      : 'border-sky-400 bg-sky-50 text-sky-900 ring-1 ring-sky-400/40';
                  }

                  if (hasChecked) {
                    const wasCorrectChoice = isSelected === isThisCorrect;
                    if (wasCorrectChoice && isThisCorrect) {
                      optClass =
                        'border-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-100';
                    } else if (!wasCorrectChoice) {
                      optClass =
                        'border-rose-400 bg-rose-50 dark:bg-rose-950/40 text-rose-950 dark:text-rose-100';
                    }
                  }

                  return (
                    <div
                      key={opt.id}
                      onClick={() => handleToggleQ2(opt.id)}
                      className={`p-2.5 rounded-lg border flex items-center justify-between gap-2 transition-all cursor-pointer select-none ${optClass}`}
                    >
                      <div className="flex items-center gap-2.5 flex-1 min-w-0">
                        <div
                          className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 ${
                            isSelected
                              ? 'border-sky-500 bg-sky-500 text-white'
                              : isDark
                              ? 'border-slate-500 bg-slate-800'
                              : 'border-slate-400 bg-white'
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>

                        <div className="flex-1 min-w-0">
                          {!isFlipped ? (
                            <span className="text-xs sm:text-sm font-medium">{opt.text}</span>
                          ) : (
                            <span className="text-xs sm:text-sm font-medium italic text-emerald-800 dark:text-emerald-300 font-serif">
                              {opt.textEs}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          type="button"
                          onClick={(e) => handleToggleOptionFlip(`q2-${opt.id}`, e)}
                          className="w-5 h-5 rounded flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer"
                          title="Traducir"
                        >
                          <RefreshCw className={`w-2.5 h-2.5 ${isFlipped ? 'rotate-180' : ''}`} />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => handlePlayAudio(opt.text, e)}
                          className="w-5 h-5 rounded flex items-center justify-center text-sky-500 hover:text-sky-700 cursor-pointer"
                          title="Escuchar"
                        >
                          <Volume2 className="w-2.5 h-2.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Check / Reset Buttons */}
            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleReset}
                className={`px-3.5 py-2 rounded-xl border text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  isDark
                    ? 'border-slate-700 bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700'
                    : 'border-slate-200 bg-slate-100 text-slate-700 hover:text-slate-900 hover:bg-slate-200'
                }`}
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reiniciar</span>
              </button>

              <button
                type="button"
                onClick={handleCheck}
                className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>Comprobar Respuestas</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
