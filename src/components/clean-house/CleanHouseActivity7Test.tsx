import React, { useState } from 'react';
import {
  Volume2,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Award,
  ChevronRight,
} from 'lucide-react';
import {
  CLEAN_HOUSE_UNIT_TEST_QUESTIONS,
  CleanHouseTestQuestion,
} from '../../data/cleanHouseAgencyData';
import { useTheme } from '../../context/ThemeContext';
import { playFeedbackSound } from '../../utils/audio';
import { CleanHouseAdCard } from './CleanHouseAdCard';

interface CleanHouseActivity7TestProps {
  onPlayAudio: (text: string, id: string, e?: React.MouseEvent) => void;
  playingSentenceId: string | null;
  onSuccess?: () => void;
}

export const CleanHouseActivity7Test: React.FC<CleanHouseActivity7TestProps> = ({
  onPlayAudio,
  playingSentenceId,
  onSuccess,
}) => {
  const { isDark } = useTheme();

  const [isTestStarted, setIsTestStarted] = useState(false);
  const [isStartCardFlipped, setIsStartCardFlipped] = useState(false);
  const [activeTestSubIndex, setActiveTestSubIndex] = useState<number>(0);
  const [testUserAnswers, setTestUserAnswers] = useState<{ [key: string]: string }>({});
  const [isSubmittedMap, setIsSubmittedMap] = useState<{ [key: string]: boolean }>({});
  const [flippedOptions, setFlippedOptions] = useState<{ [key: string]: boolean }>({});
  const [isQuestionFlipped, setIsQuestionFlipped] = useState<{ [key: string]: boolean }>({});
  const [isInstructionFlipped, setIsInstructionFlipped] = useState<{ [key: string]: boolean }>({});
  const [isTestCompleted, setIsTestCompleted] = useState(false);

  const questions: CleanHouseTestQuestion[] = CLEAN_HOUSE_UNIT_TEST_QUESTIONS;
  const currentQ: CleanHouseTestQuestion = questions[activeTestSubIndex];

  const totalAnswered = Object.keys(isSubmittedMap).length;
  const totalCorrect = questions.filter((q) => {
    const selectedOpt = q.options.find((opt) => opt.id === testUserAnswers[q.id]);
    return selectedOpt?.isCorrect;
  }).length;

  const handleStartTest = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    playFeedbackSound('click');
    setIsTestStarted(true);
  };

  const handleSelectOption = (optId: string) => {
    if (isSubmittedMap[currentQ.id]) return;
    playFeedbackSound('click');
    setTestUserAnswers((prev) => ({ ...prev, [currentQ.id]: optId }));
  };

  const handleCheckQuestion = () => {
    const selectedOptId = testUserAnswers[currentQ.id];
    if (!selectedOptId) return;

    const selectedOpt = currentQ.options.find((opt) => opt.id === selectedOptId);
    const isCorrect = !!selectedOpt?.isCorrect;

    if (isCorrect) {
      playFeedbackSound('correct');
    } else {
      playFeedbackSound('wrong');
    }

    setIsSubmittedMap((prev) => ({ ...prev, [currentQ.id]: true }));

    // Check if this was the last question submitted
    const newSubmittedMap = { ...isSubmittedMap, [currentQ.id]: true };
    if (Object.keys(newSubmittedMap).length === questions.length) {
      const allCorrect = questions.every((q) => {
        const sel = q.options.find((opt) => opt.id === (testUserAnswers[q.id] || selectedOptId));
        return sel?.isCorrect;
      });
      if (allCorrect && onSuccess) {
        onSuccess();
      }
    }
  };

  const handleNextSubTest = () => {
    playFeedbackSound('click');
    if (activeTestSubIndex < questions.length - 1) {
      setActiveTestSubIndex(activeTestSubIndex + 1);
    } else {
      setIsTestCompleted(true);
    }
  };

  const handleResetEntireTest = () => {
    playFeedbackSound('click');
    setTestUserAnswers({});
    setIsSubmittedMap({});
    setActiveTestSubIndex(0);
    setIsTestCompleted(false);
    setIsTestStarted(false);
  };

  const toggleOptionFlip = (optId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    playFeedbackSound('flip');
    setFlippedOptions((prev) => ({ ...prev, [optId]: !prev[optId] }));
  };

  const toggleQuestionFlip = (e: React.MouseEvent) => {
    e.stopPropagation();
    playFeedbackSound('flip');
    setIsQuestionFlipped((prev) => ({ ...prev, [currentQ.id]: !prev[currentQ.id] }));
  };

  const toggleInstructionFlip = () => {
    playFeedbackSound('flip');
    setIsInstructionFlipped((prev) => ({ ...prev, [currentQ.id]: !prev[currentQ.id] }));
  };

  // 1. Initial Presentation / Start Screen
  if (!isTestStarted) {
    return (
      <div className="w-full max-w-2xl mx-auto my-6 perspective-1000 animate-in fade-in duration-300">
        <div
          role="button"
          tabIndex={0}
          onClick={() => {
            playFeedbackSound('flip');
            setIsStartCardFlipped((prev) => !prev);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              playFeedbackSound('flip');
              setIsStartCardFlipped((prev) => !prev);
            }
          }}
          className={`relative w-full rounded-2xl cursor-pointer select-none transition-transform duration-500 transform-style-3d border shadow-lg ${
            isStartCardFlipped ? 'rotate-y-180' : ''
          } ${
            isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}
        >
          {/* FRONT: ENGLISH */}
          <div className="w-full p-8 sm:p-10 flex flex-col items-center text-center backface-hidden space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-sky-500/10 border border-sky-500/30 text-sky-600 dark:text-sky-400 flex items-center justify-center">
              <Award className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
                Clean-House Agency · Mastery Test
              </h3>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-lg leading-relaxed">
                Test your knowledge with 5 comprehensive assessment questions covering the Clean-House Agency advertisement and services.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-semibold text-slate-500">
              <span className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800">5 Unit Tests</span>
              <span className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800">Strict Sequential Order</span>
              <span className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800">Bilingual Audio & Cards</span>
            </div>

            <button
              type="button"
              onClick={handleStartTest}
              className="px-8 py-3.5 rounded-2xl font-bold text-base bg-sky-600 hover:bg-sky-700 text-white shadow-lg transition-all cursor-pointer hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <span>Start Test</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* BACK: SPANISH */}
          <div className="absolute inset-0 w-full h-full p-8 sm:p-10 flex flex-col items-center justify-between text-center backface-hidden rotate-y-180 space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Award className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-emerald-600 dark:text-emerald-400 italic">
                Agencia Clean-House · Test de Dominio
              </h3>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-lg leading-relaxed italic">
                Pon a prueba tus conocimientos con 5 preguntas de evaluación integral sobre el anuncio y los servicios de la Agencia Clean-House.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-semibold text-slate-500 not-italic">
              <span className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800">5 Tests Unitarios</span>
              <span className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800">Orden Secuencial Estricto</span>
              <span className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800">Audio y Tarjetas Bilingües</span>
            </div>

            <button
              type="button"
              onClick={handleStartTest}
              className="px-8 py-3.5 rounded-2xl font-bold text-base bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg transition-all cursor-pointer hover:scale-105 active:scale-95 flex items-center gap-2 not-italic"
            >
              <span>Iniciar Test</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 2. Completed Test Summary Screen
  if (isTestCompleted) {
    const percentage = Math.round((totalCorrect / questions.length) * 100);
    return (
      <div className="w-full max-w-xl mx-auto my-8 p-8 rounded-2xl border shadow-xl flex flex-col items-center text-center space-y-6 animate-in fade-in duration-300 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700">
        <div className="w-20 h-20 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 flex items-center justify-center">
          <Award className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <h3 className="text-2xl sm:text-3xl font-black">
            {percentage >= 80 ? '¡Felicitaciones!' : 'Test Finalizado'}
          </h3>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
            Has completado los 5 tests de la sección Clean-House Agency.
          </p>
        </div>

        <div className="flex items-center justify-center gap-4 py-3">
          <div className="text-center px-6 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800">
            <span className="text-xs uppercase font-mono text-slate-500 font-bold block">Aciertos</span>
            <span className="text-2xl sm:text-3xl font-black text-sky-600 dark:text-sky-400">
              {totalCorrect} / {questions.length}
            </span>
          </div>
          <div className="text-center px-6 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800">
            <span className="text-xs uppercase font-mono text-slate-500 font-bold block">Calificación</span>
            <span
              className={`text-2xl sm:text-3xl font-black ${
                percentage >= 80 ? 'text-emerald-500' : 'text-amber-500'
              }`}
            >
              {percentage}%
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleResetEntireTest}
          className="px-6 py-3 rounded-xl font-bold text-sm bg-sky-600 hover:bg-sky-700 text-white shadow-md transition-all cursor-pointer flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Repetir Test</span>
        </button>
      </div>
    );
  }

  // 3. Active Test Question Screen
  const selectedOptId = testUserAnswers[currentQ.id];
  const isSubmitted = !!isSubmittedMap[currentQ.id];
  const selectedOpt = currentQ.options.find((opt) => opt.id === selectedOptId);
  const isCorrect = isSubmitted && selectedOpt?.isCorrect;
  const isInstrFlipped = !!isInstructionFlipped[currentQ.id];
  const isQFlipped = !!isQuestionFlipped[currentQ.id];

  return (
    <div className="w-full flex flex-col gap-6 animate-in fade-in duration-300">
      {/* Sub-Test Navigation Pills [1] [2] [3] [4] [5] */}
      <div
        className={`w-full p-3 sm:p-4 rounded-2xl border flex flex-wrap items-center justify-between gap-3 ${
          isDark ? 'bg-slate-900/90 border-slate-700' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl font-mono text-xs font-bold bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
            Test {activeTestSubIndex + 1} de {questions.length}
          </span>
          <span className="text-xs text-slate-500 font-medium hidden sm:inline">
            (Orden estricto)
          </span>
        </div>

        <div className="flex items-center gap-2">
          {questions.map((q, idx) => {
            const isCurrent = activeTestSubIndex === idx;
            const isSub = !!isSubmittedMap[q.id];
            const sel = q.options.find((opt) => opt.id === testUserAnswers[q.id]);
            const isOk = isSub && sel?.isCorrect;

            let pillColor = isDark
              ? 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
              : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200';

            if (isCurrent) {
              pillColor = 'bg-sky-600 text-white border-sky-500 shadow-md ring-2 ring-sky-400 scale-105';
            } else if (isSub) {
              if (isOk) {
                pillColor = 'bg-emerald-600/20 text-emerald-500 border-emerald-500/40';
              } else {
                pillColor = 'bg-rose-600/20 text-rose-500 border-rose-500/40';
              }
            }

            return (
              <button
                key={q.id}
                type="button"
                onClick={() => {
                  playFeedbackSound('click');
                  setActiveTestSubIndex(idx);
                }}
                className={`w-8 h-8 rounded-xl font-bold font-mono text-xs border flex items-center justify-center transition-all cursor-pointer ${pillColor}`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* Top Reversible Instruction Card */}
      <div className="w-full perspective-1000">
        <div
          onClick={toggleInstructionFlip}
          className={`relative w-full min-h-[58px] rounded-2xl cursor-pointer select-none transition-transform duration-500 transform-style-3d border shadow-xs ${
            isInstrFlipped ? 'rotate-y-180' : ''
          } ${
            isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}
        >
          <div className="absolute inset-0 px-5 py-3 flex items-center justify-between backface-hidden">
            <span className="font-semibold text-sm sm:text-base">{currentQ.instructionsEn}</span>
            <button
              type="button"
              onClick={(e) => onPlayAudio(currentQ.instructionsEn, `test-instr-${currentQ.id}`, e)}
              className={`p-1.5 rounded-lg border transition-all shrink-0 cursor-pointer ${
                playingSentenceId === `test-instr-${currentQ.id}`
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
              {currentQ.instructionsEs}
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Reference Ad Left, Question & Options Right */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Reference Ad */}
        <div className="lg:col-span-5 w-full">
          <CleanHouseAdCard
            onPlayAudio={onPlayAudio}
            playingSentenceId={playingSentenceId}
            compact
          />
        </div>

        {/* Right Column: Question & Options */}
        <div className="lg:col-span-7 w-full flex flex-col gap-5">
          {/* Question Card (Reversible) */}
          <div className="w-full perspective-1000">
            <div
              onClick={toggleQuestionFlip}
              className={`relative w-full min-h-[58px] rounded-2xl cursor-pointer select-none transition-transform duration-500 transform-style-3d border shadow-xs ${
                isQFlipped ? 'rotate-y-180' : ''
              } ${
                isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
              }`}
            >
              <div className="w-full p-4 flex items-center justify-between backface-hidden">
                <h4 className="text-base sm:text-lg font-bold flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-sky-600 text-white text-xs font-mono flex items-center justify-center shrink-0">
                    {activeTestSubIndex + 1}
                  </span>
                  <span>{currentQ.question}</span>
                </h4>
                <button
                  type="button"
                  onClick={(e) => onPlayAudio(currentQ.question, `test-q-${currentQ.id}`, e)}
                  className={`p-1.5 rounded-lg border transition-all shrink-0 ml-2 cursor-pointer ${
                    playingSentenceId === `test-q-${currentQ.id}`
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

              <div className="absolute inset-0 w-full h-full p-4 flex items-center justify-between backface-hidden rotate-y-180">
                <h4 className="text-base sm:text-lg font-bold italic text-slate-700 dark:text-slate-200 flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-emerald-600 text-white text-xs font-mono flex items-center justify-center shrink-0 not-italic">
                    {activeTestSubIndex + 1}
                  </span>
                  <span>{currentQ.questionEs}</span>
                </h4>
                <button
                  type="button"
                  onClick={(e) => onPlayAudio(currentQ.question, `test-q-back-${currentQ.id}`, e)}
                  className={`p-1.5 rounded-lg border transition-all shrink-0 ml-2 cursor-pointer ${
                    playingSentenceId === `test-q-back-${currentQ.id}`
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

          {/* Radio Options (Each option is a reversible card with radio circle + speaker button) */}
          <div className="space-y-3">
            {currentQ.options.map((opt) => {
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
                    className={`relative w-full min-h-[58px] rounded-2xl cursor-pointer select-none transition-transform duration-500 transform-style-3d border shadow-xs ${
                      isFlipped ? 'rotate-y-180' : ''
                    } ${cardStyle}`}
                  >
                    {/* Front */}
                    <div className="w-full p-3.5 flex items-center justify-between backface-hidden">
                      <div
                        className="flex items-center gap-3 flex-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectOption(opt.id);
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
                        <span className="text-sm sm:text-base font-medium">{opt.text}</span>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => onPlayAudio(opt.text, `test-opt-${opt.id}`, e)}
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
                      <span className="text-sm sm:text-base font-medium italic text-slate-700 dark:text-slate-200">
                        {opt.textEs}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => onPlayAudio(opt.text, `test-opt-back-${opt.id}`, e)}
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

          {/* Bottom Actions */}
          <div className="mt-2 flex items-center justify-between gap-3">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              {totalAnswered} de {questions.length} respondidas ({totalCorrect} correctas)
            </span>

            {!isSubmitted ? (
              <button
                type="button"
                disabled={!selectedOptId}
                onClick={handleCheckQuestion}
                className={`px-6 py-2.5 rounded-xl font-bold text-sm shadow-md transition-all cursor-pointer ${
                  selectedOptId
                    ? 'bg-sky-600 hover:bg-sky-700 text-white active:scale-95'
                    : 'bg-slate-300 dark:bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                Comprobar
              </button>
            ) : activeTestSubIndex < questions.length - 1 ? (
              <button
                type="button"
                onClick={handleNextSubTest}
                className="px-6 py-2.5 rounded-xl font-bold text-sm bg-sky-600 hover:bg-sky-700 text-white shadow-md transition-all cursor-pointer active:scale-95 flex items-center gap-2"
              >
                <span>Siguiente Test ({activeTestSubIndex + 2})</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNextSubTest}
                className="px-6 py-2.5 rounded-xl font-bold text-sm bg-emerald-600 hover:bg-emerald-700 text-white shadow-md transition-all cursor-pointer active:scale-95 flex items-center gap-2"
              >
                <span>Finalizar y Ver Resultados</span>
                <Award className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Explanation box after submit */}
          {isSubmitted && (
            <div
              className={`p-4 rounded-2xl border animate-in fade-in duration-200 flex flex-col gap-2 ${
                isCorrect
                  ? isDark
                    ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                    : 'bg-emerald-50 border-emerald-200 text-emerald-950'
                  : isDark
                  ? 'bg-rose-950/40 border-rose-500/40 text-rose-200'
                  : 'bg-rose-50 border-rose-200 text-rose-950'
              }`}
            >
              <div className="flex items-center gap-2 font-bold text-sm">
                {isCorrect ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                ) : (
                  <XCircle className="w-4 h-4 text-rose-500" />
                )}
                <span>{isCorrect ? '¡Correcto!' : 'Respuesta Incorrecta'}</span>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed">{currentQ.explanation}</p>
              <p className="text-xs sm:text-sm leading-relaxed italic text-slate-600 dark:text-slate-300">
                {currentQ.explanationEs}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
