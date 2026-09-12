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
  PRESENT_SIMPLE_QUESTIONS_TESTS,
  PresentSimpleQuestionsTestQuestion,
} from '../../data/presentSimpleQuestionsData';
import { useTheme } from '../../context/ThemeContext';
import { playFeedbackSound, speakEnglish, stopSpeaking } from '../../utils/audio';
import { PresentSimpleQuestionsVideoPlayer } from './PresentSimpleQuestionsVideoPlayer';

export interface PresentSimpleQuestionsTestProps {
  speechRate: number;
  accent: 'US' | 'UK';
  onSuccess?: () => void;
}

export const PresentSimpleQuestionsTest: React.FC<PresentSimpleQuestionsTestProps> = ({
  speechRate,
  accent,
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
  const [playingSentenceId, setPlayingSentenceId] = useState<string | null>(null);

  const questions: PresentSimpleQuestionsTestQuestion[] = PRESENT_SIMPLE_QUESTIONS_TESTS;
  const currentQ: PresentSimpleQuestionsTestQuestion = questions[activeTestSubIndex];

  const totalAnswered = Object.keys(isSubmittedMap).length;
  const totalCorrect = questions.filter((q) => {
    const selectedOpt = q.options.find((opt) => opt.id === testUserAnswers[q.id]);
    return selectedOpt?.isCorrect;
  }).length;

  const handlePlayAudio = (text: string, id: string, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    stopSpeaking();
    setPlayingSentenceId(id);
    speakEnglish(
      text,
      speechRate,
      accent === 'UK' ? 'UK' : 'US',
      undefined,
      () => {
        setPlayingSentenceId(null);
      }
    );
  };

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

    // Check if all questions are submitted
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
    if (activeTestSubIndex < questions.length - 1) {
      setActiveTestSubIndex((prev) => prev + 1);
    } else {
      setIsTestCompleted(true);
    }
  };

  const handleResetTest = () => {
    setIsTestStarted(false);
    setIsStartCardFlipped(false);
    setActiveTestSubIndex(0);
    setTestUserAnswers({});
    setIsSubmittedMap({});
    setFlippedOptions({});
    setIsQuestionFlipped({});
    setIsInstructionFlipped({});
    setIsTestCompleted(false);
    stopSpeaking();
  };

  // Toggle individual option card flip
  const toggleOptionFlip = (optId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFlippedOptions((prev) => ({ ...prev, [optId]: !prev[optId] }));
  };

  const toggleQuestionFlip = () => {
    setIsQuestionFlipped((prev) => ({ ...prev, [currentQ.id]: !prev[currentQ.id] }));
  };

  const toggleInstructionFlip = () => {
    setIsInstructionFlipped((prev) => ({ ...prev, [currentQ.id]: !prev[currentQ.id] }));
  };

  // If completed summary screen
  if (isTestCompleted) {
    const scorePct = Math.round((totalCorrect / questions.length) * 100);
    const isPass = scorePct >= 70;

    return (
      <div className="max-w-2xl mx-auto py-8 px-4 text-center">
        <div
          className={`p-8 rounded-2xl border transition-all ${
            isDark ? 'bg-slate-800/90 border-slate-700' : 'bg-white border-slate-200 shadow-sm'
          }`}
        >
          <div className="inline-flex p-4 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 mb-4">
            <Award className="w-12 h-12" />
          </div>

          <h3 className="text-2xl font-bold mb-2">Test Finalizado</h3>
          <p className="text-slate-600 dark:text-slate-300 mb-6">
            Has completado las 5 evaluaciones de Present Simple: Yes/No Questions.
          </p>

          <div className="flex justify-center items-center gap-6 mb-8">
            <div className="text-center">
              <div className="text-4xl font-extrabold text-blue-600 dark:text-blue-400">
                {totalCorrect} / {questions.length}
              </div>
              <div className="text-xs uppercase tracking-wider text-slate-500 mt-1">
                Respuestas Correctas
              </div>
            </div>

            <div className="h-10 w-px bg-slate-200 dark:bg-slate-700" />

            <div className="text-center">
              <div
                className={`text-4xl font-extrabold ${
                  isPass ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-500'
                }`}
              >
                {scorePct}%
              </div>
              <div className="text-xs uppercase tracking-wider text-slate-500 mt-1">
                Puntaje Final
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <button
              type="button"
              onClick={handleResetTest}
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Repetir Evaluación</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 1. Initial State: Start Test Card
  if (!isTestStarted) {
    const startCardTextEn =
      'Evaluate your mastery of Present Simple Yes/No Questions and short answers with 5 progressive test questions.';
    const startCardTextEs =
      'Evalúa tu dominio del Presente Simple para preguntas de Sí/No y respuestas cortas con 5 preguntas de examen progresivas.';

    return (
      <div className="max-w-2xl mx-auto py-10 px-4">
        <div
          onClick={() => setIsStartCardFlipped((prev) => !prev)}
          className={`cursor-pointer select-none rounded-2xl border p-8 transition-all relative ${
            isDark
              ? 'bg-slate-800/90 border-slate-700 hover:border-slate-600'
              : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Test: Present Simple: Yes/No Questions</h3>
                <p className="text-xs text-slate-500">5 evaluaciones de opción múltiple</p>
              </div>
            </div>

            {/* ONLY speaker icon button */}
            <button
              type="button"
              onClick={(e) => handlePlayAudio(startCardTextEn, 'start-card', e)}
              className={`p-2 rounded-lg transition-colors ${
                playingSentenceId === 'start-card'
                  ? 'text-blue-500 bg-blue-50 dark:bg-blue-900/30'
                  : 'text-slate-500 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
              aria-label="Listen"
            >
              <Volume2
                className={`w-5 h-5 ${playingSentenceId === 'start-card' ? 'animate-pulse' : ''}`}
              />
            </button>
          </div>

          {/* Description Content (Reversible) */}
          <div className="min-h-[90px] flex items-center mb-8">
            {!isStartCardFlipped ? (
              <p className="text-base sm:text-lg text-slate-700 dark:text-slate-200 leading-relaxed">
                {startCardTextEn}
              </p>
            ) : (
              <p className="text-base sm:text-lg italic text-amber-800 dark:text-amber-300 leading-relaxed">
                {startCardTextEs}
              </p>
            )}
          </div>

          {/* Start Test Button */}
          <div className="flex justify-end pt-4 border-t border-slate-100 dark:border-slate-700">
            <button
              type="button"
              onClick={handleStartTest}
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <span>Comenzar Test</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 2. Active Test Question View
  const isQuestionSubmitted = isSubmittedMap[currentQ.id];
  const selectedOptionId = testUserAnswers[currentQ.id];
  const isCorrect = currentQ.options.find((opt) => opt.id === selectedOptionId)?.isCorrect;

  return (
    <div className="space-y-6 w-full">
      {/* Sub-test Navigation Pills [1] [2] [3] [4] [5] */}
      <div className="flex items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3 flex-wrap">
        <div className="flex items-center gap-1.5 sm:gap-2">
          {questions.map((q, idx) => {
            const isAnswered = isSubmittedMap[q.id];
            const selOpt = q.options.find((opt) => opt.id === testUserAnswers[q.id]);
            const isOptCorrect = selOpt?.isCorrect;
            const isActive = idx === activeTestSubIndex;

            return (
              <button
                key={q.id}
                type="button"
                onClick={() => setActiveTestSubIndex(idx)}
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl font-bold text-sm flex items-center justify-center transition-all cursor-pointer ${
                  isActive
                    ? 'ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-slate-900 bg-blue-600 text-white shadow-xs'
                    : isAnswered
                    ? isOptCorrect
                      ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700'
                      : 'bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-700'
                    : isDark
                    ? 'bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 shadow-2xs'
                }`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>

        <div className="text-xs sm:text-sm font-medium text-slate-500">
          Progreso: {totalAnswered} / {questions.length} completados
        </div>
      </div>

      {/* Top Reversible Instruction Card with Speaker Button */}
      <div
        onClick={toggleInstructionFlip}
        className={`cursor-pointer select-none rounded-xl border p-4 transition-all ${
          isDark
            ? 'bg-slate-800/60 border-slate-700 hover:border-slate-600'
            : 'bg-white border-slate-200 hover:border-slate-300 shadow-2xs'
        }`}
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex-1">
            {!isInstructionFlipped[currentQ.id] ? (
              <p className="text-sm sm:text-base font-semibold text-slate-800 dark:text-slate-100">
                {currentQ.instructionsEn}
              </p>
            ) : (
              <p className="text-sm sm:text-base font-semibold italic text-amber-800 dark:text-amber-300">
                {currentQ.instructionsEs}
              </p>
            )}
          </div>

          {/* Speaker icon only */}
          <button
            type="button"
            onClick={(e) => handlePlayAudio(currentQ.instructionsEn, `inst-${currentQ.id}`, e)}
            className={`shrink-0 p-2 rounded-lg transition-colors ${
              playingSentenceId === `inst-${currentQ.id}`
                ? 'text-blue-500 bg-blue-50 dark:bg-blue-900/30'
                : 'text-slate-500 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-700'
            }`}
            aria-label="Listen instruction"
          >
            <Volume2
              className={`w-4 h-4 ${
                playingSentenceId === `inst-${currentQ.id}` ? 'animate-pulse' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {/* Main Grid: Left Video Player (5 cols), Right Question & Options (7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Reference Video Player */}
        <div className="lg:col-span-5 w-full">
          <PresentSimpleQuestionsVideoPlayer speechRate={speechRate} accent={accent} />
        </div>

        {/* Right Column: Question Card, Options Cards, Action Bar */}
        <div className="lg:col-span-7 flex flex-col gap-4 w-full">
          {/* Reversible Question Card with Speaker Button */}
          <div
            onClick={toggleQuestionFlip}
            className={`cursor-pointer select-none rounded-2xl border p-5 transition-all ${
              isDark
                ? 'bg-slate-800/80 border-slate-700 text-slate-100 hover:border-slate-600'
                : 'bg-white border-slate-200 text-slate-800 hover:border-slate-300 shadow-xs'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                  Pregunta {currentQ.testNumber} de 5
                </div>

                {!isQuestionFlipped[currentQ.id] ? (
                  <div className="text-base sm:text-lg font-medium leading-relaxed whitespace-pre-line">
                    {currentQ.question}
                  </div>
                ) : (
                  <div
                    className={`text-base sm:text-lg font-medium leading-relaxed italic whitespace-pre-line ${
                      isDark ? 'text-amber-300' : 'text-amber-800'
                    }`}
                  >
                    {currentQ.questionEs}
                  </div>
                )}
              </div>

              {/* Speaker icon only */}
              <button
                type="button"
                onClick={(e) => handlePlayAudio(currentQ.audioText, `q-${currentQ.id}`, e)}
                className={`shrink-0 p-2 rounded-lg transition-colors ${
                  playingSentenceId === `q-${currentQ.id}`
                    ? 'text-blue-500 bg-blue-50 dark:bg-blue-900/30'
                    : 'text-slate-500 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
                aria-label="Listen question"
              >
                <Volume2
                  className={`w-5 h-5 ${
                    playingSentenceId === `q-${currentQ.id}` ? 'animate-pulse' : ''
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Options: Reversible Cards with Speaker Buttons (only icon, no text) */}
          <div className="space-y-3">
            {currentQ.options.map((opt) => {
              const isSelected = selectedOptionId === opt.id;
              const isFlipped = flippedOptions[opt.id];

              let borderClass = isDark ? 'border-slate-700' : 'border-slate-200';
              let bgClass = isDark ? 'bg-slate-800' : 'bg-white';

              if (isQuestionSubmitted) {
                if (opt.isCorrect) {
                  borderClass = 'border-emerald-500 dark:border-emerald-500';
                  bgClass = isDark ? 'bg-emerald-950/30' : 'bg-emerald-50';
                } else if (isSelected && !opt.isCorrect) {
                  borderClass = 'border-rose-500 dark:border-rose-500';
                  bgClass = isDark ? 'bg-rose-950/30' : 'bg-rose-50';
                }
              } else if (isSelected) {
                borderClass = 'border-blue-500 ring-1 ring-blue-500';
                bgClass = isDark ? 'bg-blue-950/20' : 'bg-blue-50/50';
              }

              return (
                <div
                  key={opt.id}
                  onClick={() => handleSelectOption(opt.id)}
                  className={`relative select-none p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${borderClass} ${bgClass}`}
                >
                  {/* Radio indicator and option content */}
                  <div
                    onClick={(e) => toggleOptionFlip(opt.id, e)}
                    className="flex items-center gap-3 flex-1 cursor-pointer"
                  >
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                        isSelected
                          ? 'border-blue-600 bg-blue-600 dark:border-blue-500 dark:bg-blue-500'
                          : 'border-slate-400 dark:border-slate-600'
                      }`}
                    >
                      {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>

                    <div className="flex-1">
                      {!isFlipped ? (
                        <div className="text-base font-medium text-slate-800 dark:text-slate-100">
                          {opt.text}
                        </div>
                      ) : (
                        <div
                          className={`text-base font-medium italic ${
                            isDark ? 'text-amber-300' : 'text-amber-800'
                          }`}
                        >
                          {opt.textEs}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Speaker icon only (no text) */}
                  <button
                    type="button"
                    onClick={(e) => handlePlayAudio(opt.text, opt.id, e)}
                    className={`shrink-0 p-2 rounded-lg transition-colors ${
                      playingSentenceId === opt.id
                        ? 'text-blue-500 bg-blue-50 dark:bg-blue-900/30'
                        : 'text-slate-500 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-700'
                    }`}
                    aria-label="Listen option"
                  >
                    <Volume2
                      className={`w-4 h-4 ${
                        playingSentenceId === opt.id ? 'animate-pulse' : ''
                      }`}
                    />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Action Bar */}
          <div className="flex items-center justify-between gap-3 pt-3">
            <button
              type="button"
              onClick={() => {
                const newAnswers = { ...testUserAnswers };
                delete newAnswers[currentQ.id];
                setTestUserAnswers(newAnswers);
                const newSubmitted = { ...isSubmittedMap };
                delete newSubmitted[currentQ.id];
                setIsSubmittedMap(newSubmitted);
              }}
              disabled={!selectedOptionId}
              className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium text-sm transition-all flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Limpiar</span>
            </button>

            <div className="flex items-center gap-3">
              {!isQuestionSubmitted ? (
                <button
                  type="button"
                  onClick={handleCheckQuestion}
                  disabled={!selectedOptionId}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-xs"
                >
                  Comprobar
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNextSubTest}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition-all flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  <span>
                    {activeTestSubIndex < questions.length - 1
                      ? 'Siguiente Test'
                      : 'Finalizar y Ver Resultados'}
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Feedback Explanation Card */}
          {isQuestionSubmitted && (
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
                    {isCorrect ? '¡Correcto!' : 'Respuesta Incorrecta'}
                  </div>
                  <div className="text-xs sm:text-sm leading-relaxed opacity-90">
                    {currentQ.explanation}
                  </div>
                  <div className="text-xs sm:text-sm leading-relaxed italic opacity-80 pt-0.5">
                    {currentQ.explanationEs}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
