import React, { useState } from 'react';
import { Volume2, CheckCircle2, XCircle, RotateCcw, ArrowRight, Layers } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import {
  ACTIVITY_5_TRUE_FALSE,
  ACTIVITY_5_QUESTIONS,
  SportsTrueFalseItem,
  SportsMultipleChoiceItem,
} from '../../data/sports1Data';
import { SportsMediaCard } from './SportsMediaCard';
import { speakEnglish, playFeedbackSound } from '../../utils/audio';

interface SportsActivity5Props {
  currentRate: number;
  accent?: 'US' | 'UK';
  onComplete?: () => void;
  onNext?: () => void;
}

export const SportsActivity5: React.FC<SportsActivity5Props> = ({
  currentRate,
  accent = 'US',
  onComplete,
  onNext,
}) => {
  const { isDark } = useTheme();

  // Sub-task tab: 0 = True/False, 1 = Multiple Choice
  const [activeTask, setActiveTask] = useState<0 | 1>(0);

  const [isInstructionFlipped, setIsInstructionFlipped] = useState(false);

  // Part 1 answers: { [statementId]: boolean (true / false) }
  const [tfAnswers, setTfAnswers] = useState<Record<string, boolean>>({});
  // Part 2 answers: { [questionId]: optionId }
  const [mcAnswers, setMcAnswers] = useState<Record<string, string>>({});

  // Flipped cards
  const [flippedCards, setFlippedCards] = useState<string[]>([]);

  // Validation
  const [hasCheckedTf, setHasCheckedTf] = useState(false);
  const [isTfAllCorrect, setIsTfAllCorrect] = useState(false);

  const [hasCheckedMc, setHasCheckedMc] = useState(false);
  const [isMcAllCorrect, setIsMcAllCorrect] = useState(false);

  const instructionEn =
    activeTask === 0
      ? "Decide if the sentences are true or false."
      : "Choose the best answers to the questions below.";
  const instructionEs =
    activeTask === 0
      ? "Decide si las oraciones son verdaderas o falsas."
      : "Elige las mejores respuestas a las siguientes preguntas.";

  const handlePlayInstruction = (e: React.MouseEvent) => {
    e.stopPropagation();
    speakEnglish(instructionEn, currentRate, accent === 'UK' ? 'UK' : 'US');
  };

  const handlePlayText = (text: string, e: React.MouseEvent) => {
    e.stopPropagation();
    speakEnglish(text, currentRate, accent === 'UK' ? 'UK' : 'US');
  };

  const toggleCardFlip = (id: string) => {
    setFlippedCards((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  // Part 1 handlers
  const handleSelectTf = (id: string, val: boolean) => {
    playFeedbackSound('click');
    setTfAnswers((prev) => ({ ...prev, [id]: val }));
    setHasCheckedTf(false);
  };

  const handleCheckTf = () => {
    let allRight = true;
    for (const item of ACTIVITY_5_TRUE_FALSE) {
      if (tfAnswers[item.id] !== item.isTrue) {
        allRight = false;
        break;
      }
    }

    setHasCheckedTf(true);
    setIsTfAllCorrect(allRight);

    if (allRight) {
      playFeedbackSound('correct');
      if (isMcAllCorrect && onComplete) onComplete();
    } else {
      playFeedbackSound('wrong');
    }
  };

  const handleResetTf = () => {
    setTfAnswers({});
    setHasCheckedTf(false);
    setIsTfAllCorrect(false);
  };

  // Part 2 handlers
  const handleSelectMc = (qId: string, optId: string) => {
    playFeedbackSound('click');
    setMcAnswers((prev) => ({ ...prev, [qId]: optId }));
    setHasCheckedMc(false);
  };

  const handleCheckMc = () => {
    let allRight = true;
    for (const q of ACTIVITY_5_QUESTIONS) {
      const selected = mcAnswers[q.id];
      const correctOpt = q.options.find((o) => o.isCorrect);
      if (selected !== correctOpt?.id) {
        allRight = false;
        break;
      }
    }

    setHasCheckedMc(true);
    setIsMcAllCorrect(allRight);

    if (allRight) {
      playFeedbackSound('correct');
      if (isTfAllCorrect && onComplete) onComplete();
    } else {
      playFeedbackSound('wrong');
    }
  };

  const handleResetMc = () => {
    setMcAnswers({});
    setHasCheckedMc(false);
    setIsMcAllCorrect(false);
  };

  const isBothCompleted = isTfAllCorrect && isMcAllCorrect;

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Reversible Instruction Header Card */}
      <div
        id="sports-act5-instruction-card"
        onClick={() => setIsInstructionFlipped(!isInstructionFlipped)}
        className={`w-full rounded-2xl border p-4 sm:p-5 transition-all cursor-pointer select-none ${
          isDark
            ? 'bg-slate-900 border-slate-700 text-slate-100'
            : 'bg-white border-slate-200 text-slate-900 shadow-xs'
        }`}
      >
        <div className="w-full flex items-center justify-between gap-3">
          <div>
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 mb-0.5">
              {isInstructionFlipped ? 'Instrucciones' : 'Instructions'}
            </div>
            <p className="text-sm sm:text-base font-medium">
              {isInstructionFlipped ? instructionEs : instructionEn}
            </p>
          </div>

          <button
            type="button"
            onClick={handlePlayInstruction}
            className={`p-2.5 rounded-xl border shrink-0 transition-colors cursor-pointer ${
              isDark
                ? 'bg-slate-800 hover:bg-slate-700 text-sky-300 border-slate-700'
                : 'bg-slate-50 hover:bg-slate-100 text-sky-700 border-slate-200 shadow-xs'
            }`}
            aria-label="Audio"
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Sub-Tabs: Parte 1: True / False vs Parte 2: Best Answers */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          type="button"
          onClick={() => setActiveTask(0)}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
            activeTask === 0
              ? 'bg-sky-600 text-white shadow-sm'
              : isDark
              ? 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <span>Parte 1: True or False</span>
          {isTfAllCorrect && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />}
        </button>

        <button
          type="button"
          onClick={() => setActiveTask(1)}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
            activeTask === 1
              ? 'bg-sky-600 text-white shadow-sm'
              : isDark
              ? 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <span>Parte 2: Best Answers</span>
          {isMcAllCorrect && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />}
        </button>
      </div>

      {/* Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Media Player */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <SportsMediaCard
            currentRate={currentRate}
            accent={accent}
            highlightCurrentSentence={true}
            showTranscript={true}
          />
        </div>

        {/* Right Column: Active Exercise Task */}
        <div className="lg:col-span-7 flex flex-col gap-5">
          {activeTask === 0 ? (
            /* Part 1: True / False */
            <div className="flex flex-col gap-4">
              {ACTIVITY_5_TRUE_FALSE.map((item, idx) => {
                const isFlipped = flippedCards.includes(item.id);
                const selectedVal = tfAnswers[item.id];
                const isCorrect = hasCheckedTf && selectedVal === item.isTrue;
                const isWrong = hasCheckedTf && selectedVal !== undefined && selectedVal !== item.isTrue;

                return (
                  <div
                    key={item.id}
                    id={`sports-tf-${item.id}`}
                    onClick={() => toggleCardFlip(item.id)}
                    className={`rounded-2xl border p-4 sm:p-5 transition-all cursor-pointer select-none flex flex-col gap-3 ${
                      hasCheckedTf
                        ? isCorrect
                          ? 'border-emerald-500 bg-emerald-50/20 dark:bg-emerald-950/20'
                          : isWrong
                          ? 'border-rose-500 bg-rose-50/20 dark:bg-rose-950/20'
                          : isDark
                          ? 'bg-slate-900 border-slate-700'
                          : 'bg-white border-slate-200 shadow-xs'
                        : isDark
                        ? 'bg-slate-900 border-slate-700 hover:border-slate-600'
                        : 'bg-white border-slate-200 shadow-xs hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3 flex-1">
                        <span className="w-6 h-6 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 font-bold text-xs flex items-center justify-center border border-sky-500/20 shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <div>
                          <p className="text-sm sm:text-base font-semibold text-slate-900 dark:text-slate-100 leading-snug">
                            {isFlipped ? item.statementEs : item.statement}
                          </p>
                          {isFlipped && (
                            <div className="text-xs text-amber-600 dark:text-amber-400 mt-0.5">
                              Oración {idx + 1} (Español)
                            </div>
                          )}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => handlePlayText(item.statement, e)}
                        className={`p-2 rounded-lg border shrink-0 transition-colors cursor-pointer ${
                          isDark
                            ? 'bg-slate-800 hover:bg-slate-700 text-sky-300 border-slate-700'
                            : 'bg-slate-50 hover:bg-slate-100 text-sky-700 border-slate-200 shadow-xs'
                        }`}
                        aria-label="Audio"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* True / False Selection Buttons */}
                    <div
                      className="flex items-center gap-3 mt-1"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {/* True Button */}
                      <button
                        type="button"
                        onClick={() => handleSelectTf(item.id, true)}
                        className={`flex-1 py-2 px-4 rounded-xl text-xs sm:text-sm font-bold border transition-all cursor-pointer flex items-center justify-center gap-2 ${
                          selectedVal === true
                            ? hasCheckedTf
                              ? item.isTrue
                                ? 'bg-emerald-500 text-white border-emerald-500 shadow-sm'
                                : 'bg-rose-500 text-white border-rose-500 shadow-sm'
                              : 'bg-sky-600 text-white border-sky-500 shadow-sm ring-1 ring-sky-400/30'
                            : isDark
                            ? 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        <span>True</span>
                        {hasCheckedTf && selectedVal === true && (
                          <span>
                            {item.isTrue ? (
                              <CheckCircle2 className="w-3.5 h-3.5" />
                            ) : (
                              <XCircle className="w-3.5 h-3.5" />
                            )}
                          </span>
                        )}
                      </button>

                      {/* False Button */}
                      <button
                        type="button"
                        onClick={() => handleSelectTf(item.id, false)}
                        className={`flex-1 py-2 px-4 rounded-xl text-xs sm:text-sm font-bold border transition-all cursor-pointer flex items-center justify-center gap-2 ${
                          selectedVal === false
                            ? hasCheckedTf
                              ? !item.isTrue
                                ? 'bg-emerald-500 text-white border-emerald-500 shadow-sm'
                                : 'bg-rose-500 text-white border-rose-500 shadow-sm'
                              : 'bg-sky-600 text-white border-sky-500 shadow-sm ring-1 ring-sky-400/30'
                            : isDark
                            ? 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        <span>False</span>
                        {hasCheckedTf && selectedVal === false && (
                          <span>
                            {!item.isTrue ? (
                              <CheckCircle2 className="w-3.5 h-3.5" />
                            ) : (
                              <XCircle className="w-3.5 h-3.5" />
                            )}
                          </span>
                        )}
                      </button>
                    </div>

                    {/* Explanation */}
                    {hasCheckedTf && (
                      <div
                        className={`mt-1 p-2.5 rounded-xl text-xs leading-relaxed border ${
                          isCorrect
                            ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
                            : 'border-rose-500/30 bg-rose-500/10 text-rose-700 dark:text-rose-300'
                        }`}
                      >
                        {isFlipped ? item.explanationEs : item.explanation}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Part 1 Controls */}
              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={handleResetTf}
                  className={`px-4 py-2.5 rounded-xl border font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer ${
                    isDark
                      ? 'border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 shadow-xs'
                  }`}
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reiniciar</span>
                </button>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleCheckTf}
                    disabled={Object.keys(tfAnswers).length === 0}
                    className={`px-6 py-2.5 rounded-xl font-semibold text-xs shadow-md transition-all cursor-pointer ${
                      Object.keys(tfAnswers).length === 0
                        ? 'opacity-40 cursor-not-allowed bg-slate-400 text-white'
                        : 'bg-sky-600 hover:bg-sky-500 text-white active:scale-95'
                    }`}
                  >
                    Comprobar respuestas
                  </button>

                  {isTfAllCorrect && (
                    <button
                      type="button"
                      onClick={() => setActiveTask(1)}
                      className="px-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 animate-in fade-in"
                    >
                      <span>Ir a Parte 2</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* Part 2: Multiple Choice Questions */
            <div className="flex flex-col gap-5">
              {ACTIVITY_5_QUESTIONS.map((q, qIndex) => {
                const isFlipped = flippedCards.includes(q.id);
                const selectedOptId = mcAnswers[q.id];
                const correctOpt = q.options.find((o) => o.isCorrect);
                const isItemCorrect = hasCheckedMc && selectedOptId === correctOpt?.id;
                const isItemWrong = hasCheckedMc && selectedOptId && selectedOptId !== correctOpt?.id;

                return (
                  <div
                    key={q.id}
                    id={`sports-mc-${q.id}`}
                    onClick={() => toggleCardFlip(q.id)}
                    className={`rounded-2xl border p-4 sm:p-5 transition-all cursor-pointer select-none flex flex-col gap-3 ${
                      hasCheckedMc
                        ? isItemCorrect
                          ? 'border-emerald-500 bg-emerald-50/20 dark:bg-emerald-950/20'
                          : isItemWrong
                          ? 'border-rose-500 bg-rose-50/20 dark:bg-rose-950/20'
                          : isDark
                          ? 'bg-slate-900 border-slate-700'
                          : 'bg-white border-slate-200 shadow-xs'
                        : isDark
                        ? 'bg-slate-900 border-slate-700 hover:border-slate-600'
                        : 'bg-white border-slate-200 shadow-xs hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3 flex-1">
                        <span className="w-7 h-7 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 font-bold text-xs flex items-center justify-center border border-sky-500/20 shrink-0 mt-0.5">
                          {qIndex + 1}
                        </span>
                        <div>
                          <div className="text-sm sm:text-base font-semibold text-slate-900 dark:text-slate-100 leading-snug">
                            {isFlipped ? q.questionEs : q.question}
                          </div>
                          {isFlipped && (
                            <div className="text-xs text-amber-600 dark:text-amber-400 mt-0.5">
                              Pregunta {qIndex + 1} (Español)
                            </div>
                          )}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => handlePlayText(q.question, e)}
                        className={`p-2.5 rounded-xl border shrink-0 transition-colors cursor-pointer ${
                          isDark
                            ? 'bg-slate-800 hover:bg-slate-700 text-sky-300 border-slate-700'
                            : 'bg-slate-50 hover:bg-slate-100 text-sky-700 border-slate-200 shadow-xs'
                        }`}
                        aria-label="Audio"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Radio Options */}
                    <div
                      className="space-y-2 mt-1"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {q.options.map((opt) => {
                        const isSelected = selectedOptId === opt.id;
                        const isRightOpt = hasCheckedMc && opt.isCorrect;
                        const isWrongOpt = hasCheckedMc && isSelected && !opt.isCorrect;

                        return (
                          <div
                            key={opt.id}
                            onClick={() => handleSelectMc(q.id, opt.id)}
                            className={`p-3 rounded-xl border flex items-center justify-between gap-3 text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                              isRightOpt
                                ? 'border-emerald-500 bg-emerald-500 text-white font-semibold'
                                : isWrongOpt
                                ? 'border-rose-500 bg-rose-500 text-white font-semibold'
                                : isSelected
                                ? isDark
                                  ? 'border-sky-500 bg-sky-950/60 text-sky-200 ring-1 ring-sky-500/40'
                                  : 'border-sky-500 bg-sky-50 text-sky-900 ring-1 ring-sky-500/40'
                                : isDark
                                ? 'border-slate-750 bg-slate-800/60 text-slate-300 hover:bg-slate-750'
                                : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <span
                                className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                                  isRightOpt || isWrongOpt
                                    ? 'border-white'
                                    : isSelected
                                    ? 'border-sky-500'
                                    : 'border-slate-400 dark:border-slate-600'
                                }`}
                              >
                                {isSelected && (
                                  <span
                                    className={`w-2 h-2 rounded-full ${
                                      isRightOpt || isWrongOpt ? 'bg-white' : 'bg-sky-500'
                                    }`}
                                  />
                                )}
                              </span>
                              <span>{opt.text}</span>
                            </div>

                            <button
                              type="button"
                              onClick={(e) => handlePlayText(opt.text, e)}
                              className={`p-1 rounded-md transition-colors shrink-0 ${
                                isRightOpt || isWrongOpt
                                  ? 'hover:bg-white/20 text-white'
                                  : 'hover:text-sky-400 text-slate-400'
                              }`}
                              aria-label="Audio"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        );
                      })}
                    </div>

                    {/* Explanation */}
                    {hasCheckedMc && (
                      <div
                        className={`mt-2 p-3 rounded-xl text-xs leading-relaxed border ${
                          isItemCorrect
                            ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
                            : 'border-rose-500/30 bg-rose-500/10 text-rose-700 dark:text-rose-300'
                        }`}
                      >
                        {isFlipped ? q.explanationEs : q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Part 2 Controls */}
              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={handleResetMc}
                  className={`px-4 py-2.5 rounded-xl border font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer ${
                    isDark
                      ? 'border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 shadow-xs'
                  }`}
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reiniciar</span>
                </button>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleCheckMc}
                    disabled={Object.keys(mcAnswers).length === 0}
                    className={`px-6 py-2.5 rounded-xl font-semibold text-xs shadow-md transition-all cursor-pointer ${
                      Object.keys(mcAnswers).length === 0
                        ? 'opacity-40 cursor-not-allowed bg-slate-400 text-white'
                        : 'bg-sky-600 hover:bg-sky-500 text-white active:scale-95'
                    }`}
                  >
                    Comprobar respuestas
                  </button>

                  {isBothCompleted && onNext && (
                    <button
                      type="button"
                      onClick={onNext}
                      className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 animate-in fade-in"
                    >
                      <span>Continuar al Test (Actividad 6)</span>
                      <ArrowRight className="w-3.5 h-3.5" />
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
