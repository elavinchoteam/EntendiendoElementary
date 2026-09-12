import React, { useState } from 'react';
import { Volume2, RotateCcw, CheckCircle2, XCircle } from 'lucide-react';
import { ACTIVITY_4_DATA } from '../../data/cleanHouseAgencyData';
import { useTheme } from '../../context/ThemeContext';
import { playFeedbackSound } from '../../utils/audio';
import { CleanHouseAdCard } from './CleanHouseAdCard';

interface CleanHouseActivity4Props {
  onPlayAudio: (text: string, id: string, e?: React.MouseEvent) => void;
  playingSentenceId: string | null;
  onSuccess?: () => void;
}

export const CleanHouseActivity4: React.FC<CleanHouseActivity4Props> = ({
  onPlayAudio,
  playingSentenceId,
  onSuccess,
}) => {
  const { isDark } = useTheme();
  const [isInstructionFlipped, setIsInstructionFlipped] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [qId: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [flippedOptions, setFlippedOptions] = useState<{ [optId: string]: boolean }>({});
  const [flippedQuestions, setFlippedQuestions] = useState<{ [qId: string]: boolean }>({});

  const isAllAnswered = ACTIVITY_4_DATA.questions.every((q) => !!selectedAnswers[q.id]);

  const handleSelectOption = (qId: string, optId: string) => {
    if (isSubmitted) return;
    playFeedbackSound('click');
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optId }));
  };

  const toggleOptionFlip = (optId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    playFeedbackSound('flip');
    setFlippedOptions((prev) => ({ ...prev, [optId]: !prev[optId] }));
  };

  const toggleQuestionFlip = (qId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    playFeedbackSound('flip');
    setFlippedQuestions((prev) => ({ ...prev, [qId]: !prev[qId] }));
  };

  const handleCheck = () => {
    setIsSubmitted(true);
    let allOk = true;
    ACTIVITY_4_DATA.questions.forEach((q) => {
      const selected = q.options.find((o) => o.id === selectedAnswers[q.id]);
      if (!selected?.isCorrect) {
        allOk = false;
      }
    });

    if (allOk) {
      playFeedbackSound('correct');
      if (onSuccess) onSuccess();
    } else {
      playFeedbackSound('wrong');
    }
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    playFeedbackSound('click');
  };

  return (
    <div className="w-full flex flex-col gap-6 animate-in fade-in duration-300">
      {/* Top Reversible Instruction Card */}
      <div className="w-full perspective-1000">
        <div
          onClick={() => {
            playFeedbackSound('flip');
            setIsInstructionFlipped(!isInstructionFlipped);
          }}
          className={`relative w-full min-h-[58px] rounded-2xl cursor-pointer select-none transition-transform duration-500 transform-style-3d border shadow-xs ${
            isInstructionFlipped ? 'rotate-y-180' : ''
          } ${
            isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}
        >
          <div className="absolute inset-0 px-5 py-3 flex items-center justify-between backface-hidden">
            <span className="font-semibold text-sm sm:text-base">{ACTIVITY_4_DATA.instructionsEn}</span>
            <button
              type="button"
              onClick={(e) => onPlayAudio(ACTIVITY_4_DATA.instructionsEn, 'act4-instr', e)}
              className={`p-1.5 rounded-lg border transition-all shrink-0 cursor-pointer ${
                playingSentenceId === 'act4-instr'
                  ? 'bg-sky-500 text-white border-sky-400 ring-2 ring-sky-300'
                  : isDark
                  ? 'bg-slate-800 hover:bg-slate-700 text-sky-300 border-slate-700'
                  : 'bg-sky-50 hover:bg-sky-100 text-sky-600 border-sky-200'
              }`}
              aria-label="Audio"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>
          <div className="absolute inset-0 px-5 py-3 flex items-center justify-between backface-hidden rotate-y-180">
            <span className="font-semibold text-sm sm:text-base italic text-slate-700 dark:text-slate-200">
              {ACTIVITY_4_DATA.instructionsEs}
            </span>
          </div>
        </div>
      </div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Reference Ad */}
        <div className="lg:col-span-5 w-full">
          <CleanHouseAdCard
            onPlayAudio={onPlayAudio}
            playingSentenceId={playingSentenceId}
            compact
          />
        </div>

        {/* Right Column: Questions with Reversible Radio Options */}
        <div className="lg:col-span-7 w-full flex flex-col gap-6">
          {ACTIVITY_4_DATA.questions.map((q, qIdx) => {
            const selectedOptId = selectedAnswers[q.id];
            const isQQuestionFlipped = !!flippedQuestions[q.id];
            const selectedOpt = q.options.find((o) => o.id === selectedOptId);
            const isQCorrect = isSubmitted && selectedOpt?.isCorrect;

            return (
              <div
                key={q.id}
                className={`p-5 rounded-2xl border space-y-4 ${
                  isDark ? 'bg-slate-900/90 border-slate-700' : 'bg-white border-slate-200 shadow-xs'
                }`}
              >
                {/* Reversible Question Header */}
                <div className="w-full perspective-1000">
                  <div
                    onClick={(e) => toggleQuestionFlip(q.id, e)}
                    className={`relative w-full min-h-[56px] rounded-xl cursor-pointer select-none transition-transform duration-500 transform-style-3d border shadow-xs ${
                      isQQuestionFlipped ? 'rotate-y-180' : ''
                    } ${
                      isDark
                        ? 'bg-slate-800/80 border-slate-700 text-white'
                        : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  >
                    {/* Front: English */}
                    <div className="w-full p-3.5 flex items-center justify-between gap-3 backface-hidden">
                      <h4 className="text-base font-bold flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-sky-600 text-white text-xs flex items-center justify-center shrink-0">
                          {qIdx + 1}
                        </span>
                        <span>{q.question}</span>
                      </h4>
                      <button
                        type="button"
                        onClick={(e) => onPlayAudio(q.question, `act4-q-${q.id}`, e)}
                        className={`p-1.5 rounded-lg border transition-all shrink-0 cursor-pointer ${
                          playingSentenceId === `act4-q-${q.id}`
                            ? 'bg-sky-500 text-white border-sky-400 ring-2 ring-sky-300'
                            : isDark
                            ? 'bg-slate-800 hover:bg-slate-700 text-sky-300 border-slate-700'
                            : 'bg-sky-50 hover:bg-sky-100 text-sky-600 border-sky-200'
                        }`}
                        aria-label="Audio"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Back: Spanish */}
                    <div className="absolute inset-0 w-full h-full p-3.5 flex items-center justify-between gap-3 backface-hidden rotate-y-180">
                      <h4 className="text-base font-bold italic text-slate-700 dark:text-slate-200 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs flex items-center justify-center shrink-0 not-italic">
                          {qIdx + 1}
                        </span>
                        <span>{q.questionEs}</span>
                      </h4>
                      <button
                        type="button"
                        onClick={(e) => onPlayAudio(q.question, `act4-q-back-${q.id}`, e)}
                        className={`p-1.5 rounded-lg border transition-all shrink-0 cursor-pointer ${
                          playingSentenceId === `act4-q-back-${q.id}`
                            ? 'bg-sky-500 text-white border-sky-400 ring-2 ring-sky-300'
                            : isDark
                            ? 'bg-slate-800 hover:bg-slate-700 text-sky-300 border-slate-700'
                            : 'bg-sky-50 hover:bg-sky-100 text-sky-600 border-sky-200'
                        }`}
                        aria-label="Audio"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Reversible Radio Options */}
                <div className="space-y-2.5">
                  {q.options.map((opt) => {
                    const isSelected = selectedOptId === opt.id;
                    const isFlipped = !!flippedOptions[opt.id];
                    const isOptionCorrect = opt.isCorrect;

                    let cardStyle = isDark
                      ? 'bg-slate-900 border-slate-700 text-white hover:border-slate-500'
                      : 'bg-white border-slate-200 text-slate-900 hover:border-slate-400';

                    if (isSubmitted) {
                      if (isOptionCorrect) {
                        cardStyle = isDark
                          ? 'bg-emerald-950/50 border-emerald-500 text-emerald-200 ring-2 ring-emerald-500'
                          : 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-2 ring-emerald-400';
                      } else if (isSelected && !isOptionCorrect) {
                        cardStyle = isDark
                          ? 'bg-rose-950/50 border-rose-500 text-rose-200 ring-2 ring-rose-500'
                          : 'bg-rose-50 border-rose-500 text-rose-950 ring-2 ring-rose-400';
                      }
                    } else if (isSelected) {
                      cardStyle = isDark
                        ? 'bg-sky-950/50 border-sky-500 text-white ring-2 ring-sky-500'
                        : 'bg-sky-50 border-sky-500 text-slate-900 ring-2 ring-sky-400';
                    }

                    return (
                      <div key={opt.id} className="w-full perspective-1000">
                        <div
                          onClick={(e) => toggleOptionFlip(opt.id, e)}
                          className={`relative w-full min-h-[54px] rounded-xl cursor-pointer select-none transition-transform duration-500 transform-style-3d border shadow-xs ${
                            isFlipped ? 'rotate-y-180' : ''
                          } ${cardStyle}`}
                        >
                          {/* Front */}
                          <div className="w-full p-3 flex items-center justify-between backface-hidden">
                            <div
                              className="flex items-center gap-3 flex-1"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSelectOption(q.id, opt.id);
                              }}
                            >
                              <div
                                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                                  isSelected
                                    ? isSubmitted
                                      ? isOptionCorrect
                                        ? 'border-emerald-500 bg-emerald-500'
                                        : 'border-rose-500 bg-rose-500'
                                      : 'border-sky-500 bg-sky-500'
                                    : 'border-slate-400 dark:border-slate-500'
                                }`}
                              >
                                {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                              </div>
                              <span className="text-sm font-medium">{opt.text}</span>
                            </div>

                            <button
                              type="button"
                              onClick={(e) => onPlayAudio(opt.text, `act4-opt-${opt.id}`, e)}
                              className={`p-1.5 rounded-lg border transition-all shrink-0 ml-2 cursor-pointer ${
                                isDark
                                  ? 'bg-slate-800 hover:bg-slate-700 text-sky-300 border-slate-700'
                                  : 'bg-sky-50 hover:bg-sky-100 text-sky-600 border-sky-200'
                              }`}
                              aria-label="Audio"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {/* Back */}
                          <div className="absolute inset-0 px-4 py-3 flex items-center justify-between backface-hidden rotate-y-180">
                            <span className="text-sm font-medium italic text-slate-700 dark:text-slate-200">
                              {opt.textEs}
                            </span>
                            <button
                              type="button"
                              onClick={(e) => onPlayAudio(opt.text, `act4-opt-back-${opt.id}`, e)}
                              className={`p-1.5 rounded-lg border transition-all shrink-0 ml-2 cursor-pointer ${
                                isDark
                                  ? 'bg-slate-800 hover:bg-slate-700 text-sky-300 border-slate-700'
                                  : 'bg-sky-50 hover:bg-sky-100 text-sky-600 border-sky-200'
                              }`}
                              aria-label="Audio"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Explanation Box */}
                {isSubmitted && (
                  <div
                    className={`p-4 rounded-xl border flex flex-col gap-1.5 animate-in fade-in duration-200 ${
                      isQCorrect
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-800 dark:text-emerald-300'
                        : 'bg-rose-500/10 border-rose-500/30 text-rose-800 dark:text-rose-300'
                    }`}
                  >
                    <div className="flex items-center gap-2 font-bold text-sm">
                      {isQCorrect ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-500" />
                      )}
                      <span>{isQCorrect ? '¡Correcto!' : 'Respuesta Incorrecta'}</span>
                    </div>
                    <p className="text-xs sm:text-sm">{q.explanation}</p>
                    <p className="text-xs sm:text-sm italic">{q.explanationEs}</p>
                  </div>
                )}
              </div>
            );
          })}

          {/* Action buttons */}
          <div className="mt-2 flex items-center justify-between gap-3">
            {isSubmitted ? (
              <button
                type="button"
                onClick={handleReset}
                className={`px-4 py-2 rounded-xl border text-xs sm:text-sm font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                  isDark
                    ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
                }`}
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reintentar</span>
              </button>
            ) : (
              <div />
            )}

            {!isSubmitted && (
              <button
                type="button"
                disabled={!isAllAnswered}
                onClick={handleCheck}
                className={`px-6 py-2.5 rounded-xl font-bold text-sm shadow-md transition-all cursor-pointer ${
                  isAllAnswered
                    ? 'bg-sky-600 hover:bg-sky-700 text-white active:scale-95'
                    : 'bg-slate-300 dark:bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                Comprobar
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
