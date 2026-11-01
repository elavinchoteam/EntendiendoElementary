import React, { useState } from 'react';
import {
  Award,
  Play,
  RotateCcw,
  Check,
  CheckCircle2,
  XCircle,
  Volume2,
  RefreshCw,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  FileQuestion,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { playFeedbackSound, speakEnglish, stopSpeaking } from '../../utils/audio';
import { TammyEmailCard } from './TammyEmailCard';
import { GRUMBLES_TESTS, GrumblesTestQuestion } from '../../data/grumblesDepartmentStoreData';

interface GrumblesTestMasterProps {
  speed: number;
  accent?: 'US' | 'UK';
  onSuccess?: () => void;
}

export const GrumblesTestMaster: React.FC<GrumblesTestMasterProps> = ({
  speed,
  accent = 'US',
  onSuccess,
}) => {
  const { isDark } = useTheme();

  // Test state: 'intro' | 'testing' | 'finished'
  const [testState, setTestState] = useState<'intro' | 'testing' | 'finished'>('intro');
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);

  // User answers: questionId -> selectedOptionId
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [isQuestionChecked, setIsQuestionChecked] = useState(false);

  // Flipped state: questionId -> boolean, optionId -> boolean
  const [flippedQuestions, setFlippedQuestions] = useState<Record<string, boolean>>({});
  const [flippedOptions, setFlippedOptions] = useState<Record<string, boolean>>({});

  const totalQuestions = GRUMBLES_TESTS.length;
  const currentQ = GRUMBLES_TESTS[currentQuestionIdx];

  const handleStartTest = () => {
    stopSpeaking();
    playFeedbackSound('click');
    setUserAnswers({});
    setCurrentQuestionIdx(0);
    setIsQuestionChecked(false);
    setFlippedQuestions({});
    setFlippedOptions({});
    setTestState('testing');
  };

  const handleSelectOption = (optId: string) => {
    if (isQuestionChecked) return;
    playFeedbackSound('click');
    setUserAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optId,
    }));
  };

  const handleToggleQuestionFlip = (qId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    playFeedbackSound('click');
    setFlippedQuestions((prev) => ({
      ...prev,
      [qId]: !prev[qId],
    }));
  };

  const handleToggleOptionFlip = (optId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    playFeedbackSound('click');
    setFlippedOptions((prev) => ({
      ...prev,
      [optId]: !prev[optId],
    }));
  };

  const handlePlayAudio = (textEn: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    stopSpeaking();
    playFeedbackSound('click');
    speakEnglish(textEn, speed, accent);
  };

  const handleCheckAnswer = () => {
    if (!userAnswers[currentQ.id]) return;
    playFeedbackSound('click');
    setIsQuestionChecked(true);

    if (userAnswers[currentQ.id] === currentQ.correctAnswerId) {
      playFeedbackSound('correct');
    } else {
      playFeedbackSound('wrong');
    }
  };

  const handleNextQuestion = () => {
    stopSpeaking();
    playFeedbackSound('click');
    setIsQuestionChecked(false);

    if (currentQuestionIdx < totalQuestions - 1) {
      setCurrentQuestionIdx((prev) => prev + 1);
    } else {
      setTestState('finished');
      if (onSuccess) {
        onSuccess();
      }
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIdx > 0) {
      stopSpeaking();
      playFeedbackSound('click');
      setIsQuestionChecked(false);
      setCurrentQuestionIdx((prev) => prev - 1);
    }
  };

  // Calculate score
  const correctCount = GRUMBLES_TESTS.filter(
    (q) => userAnswers[q.id] === q.correctAnswerId
  ).length;
  const scorePercent = Math.round((correctCount / totalQuestions) * 100);

  // ==========================================
  // VIEW 1: INTRO CARD ("Iniciar Test")
  // ==========================================
  if (testState === 'intro') {
    return (
      <div className="w-full max-w-4xl mx-auto space-y-6">
        <div
          className={`p-6 sm:p-8 rounded-3xl border text-center shadow-lg transition-all ${
            isDark
              ? 'bg-slate-900/90 border-slate-800'
              : 'bg-white border-slate-200 shadow-sky-500/5'
          }`}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 dark:bg-sky-950/80 border border-sky-300 dark:border-sky-800 text-sky-700 dark:text-sky-300 text-xs font-bold uppercase tracking-wider mb-4">
            <Award className="w-4 h-4 text-sky-500" />
            <span>Test Oficial · Sección 3</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
            Test: Grumble's Department Store
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed mb-6">
            Demuestra tu comprensión lectora del correo de Tammy Gomez. Este examen consta de{' '}
            <strong className="text-sky-600 dark:text-sky-400">5 preguntas</strong> de opción múltiple
            y verdadero/falso. Cada pregunta y opción cuenta con tarjeta reversible y pronunciación en audio.
          </p>

          {/* Test Features Pill Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto mb-8 text-left">
            <div
              className={`p-3 rounded-2xl border ${
                isDark ? 'bg-slate-800/60 border-slate-700' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400 font-bold text-xs mb-1">
                <FileQuestion className="w-4 h-4" />
                <span>5 Preguntas</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Basadas 100% en el correo de Tammy a Susan.
              </p>
            </div>

            <div
              className={`p-3 rounded-2xl border ${
                isDark ? 'bg-slate-800/60 border-slate-700' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-xs mb-1">
                <RefreshCw className="w-4 h-4" />
                <span>Traducciones 3D</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Voltea cualquier tarjeta u opción con el botón de giro.
              </p>
            </div>

            <div
              className={`p-3 rounded-2xl border ${
                isDark ? 'bg-slate-800/60 border-slate-700' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-xs mb-1">
                <Volume2 className="w-4 h-4" />
                <span>Audio Integrado</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Escucha la pronunciación en cada pregunta y opción.
              </p>
            </div>
          </div>

          {/* Start Test Button */}
          <button
            type="button"
            onClick={handleStartTest}
            className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-bold text-base shadow-lg hover:shadow-xl hover:scale-102 transition-all cursor-pointer inline-flex items-center gap-2.5"
          >
            <Play className="w-5 h-5 fill-white" />
            <span>Iniciar Test</span>
          </button>
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW 2: FINISHED (Results summary card)
  // ==========================================
  if (testState === 'finished') {
    const isPassed = scorePercent >= 70;

    return (
      <div className="w-full max-w-3xl mx-auto space-y-6">
        <div
          className={`p-6 sm:p-8 rounded-3xl border text-center shadow-xl transition-all ${
            isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
          }`}
        >
          {/* Trophy badge */}
          <div
            className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg ${
              isPassed
                ? 'bg-emerald-100 text-emerald-600 border border-emerald-300 dark:bg-emerald-950 dark:border-emerald-700 dark:text-emerald-400'
                : 'bg-amber-100 text-amber-600 border border-amber-300 dark:bg-amber-950 dark:border-amber-700 dark:text-amber-400'
            }`}
          >
            <Award className="w-8 h-8" />
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-2">
            {isPassed ? '¡Excelente Trabajo!' : 'Buen intento'}
          </h3>

          <p className="text-sm text-slate-600 dark:text-slate-300 mb-6">
            Has completado las 5 preguntas del examen "Grumble's Department Store".
          </p>

          {/* Score Display */}
          <div className="inline-flex items-baseline gap-2 px-6 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 mb-6">
            <span className="text-4xl sm:text-5xl font-black text-sky-600 dark:text-sky-400 font-mono">
              {correctCount}
            </span>
            <span className="text-xl sm:text-2xl font-bold text-slate-400">/ {totalQuestions}</span>
            <span className="text-sm font-semibold text-slate-500 ml-2">({scorePercent}%)</span>
          </div>

          {/* Review Question by Question */}
          <div className="space-y-3 max-w-xl mx-auto text-left mb-8">
            {GRUMBLES_TESTS.map((q, idx) => {
              const selectedOptId = userAnswers[q.id];
              const isCorrectQ = selectedOptId === q.correctAnswerId;
              const correctOpt = q.options.find((o) => o.id === q.correctAnswerId);

              return (
                <div
                  key={q.id}
                  className={`p-3 rounded-xl border flex items-start justify-between gap-3 text-xs sm:text-sm ${
                    isCorrectQ
                      ? 'bg-emerald-50/60 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800'
                      : 'bg-rose-50/60 dark:bg-rose-950/30 border-rose-300 dark:border-rose-800'
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-slate-800 dark:text-slate-200 mb-0.5">
                      {idx + 1}. {q.question}
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 italic font-serif">
                      {q.questionEs}
                    </p>
                    {!isCorrectQ && correctOpt && (
                      <p className="mt-1 text-[11px] font-semibold text-rose-700 dark:text-rose-300">
                        Respuesta correcta: {correctOpt.text} ({correctOpt.textEs})
                      </p>
                    )}
                  </div>

                  <div className="shrink-0 mt-0.5">
                    {isCorrectQ ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <XCircle className="w-5 h-5 text-rose-500 dark:text-rose-400" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={handleStartTest}
              className="px-6 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-sm flex items-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reiniciar Test</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW 3: ACTIVE TEST QUESTIONS
  // ==========================================
  const selectedOptId = userAnswers[currentQ.id];
  const isQuestionFlipped = !!flippedQuestions[currentQ.id];
  const isAnswerCorrect = selectedOptId === currentQ.correctAnswerId;

  return (
    <div className="w-full max-w-6xl mx-auto space-y-4">
      {/* Test Progress & Header Bar */}
      <div
        className={`p-3.5 sm:p-4 rounded-2xl border transition-all shadow-xs ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        }`}
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="px-2.5 py-1 rounded-lg bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 text-xs font-bold uppercase tracking-wider font-mono">
              Test {currentQ.number} de {totalQuestions}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium hidden sm:inline">
              Choose the correct answer
            </span>
          </div>

          {/* Question Dots indicator */}
          <div className="flex items-center gap-1.5">
            {GRUMBLES_TESTS.map((q, idx) => {
              const isAnswered = !!userAnswers[q.id];
              const isCurrent = idx === currentQuestionIdx;

              return (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => {
                    playFeedbackSound('click');
                    setCurrentQuestionIdx(idx);
                    setIsQuestionChecked(false);
                  }}
                  className={`w-6 h-6 rounded-full text-[11px] font-bold flex items-center justify-center transition-all cursor-pointer ${
                    isCurrent
                      ? 'bg-sky-500 text-white ring-2 ring-sky-300 dark:ring-sky-700 scale-110'
                      : isAnswered
                      ? 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300'
                      : isDark
                      ? 'bg-slate-800 text-slate-400 hover:text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                  title={`Ir a pregunta ${idx + 1}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main 2-column layout matching screenshot: Email on left, Question and options on right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left: Email Card */}
        <div className="lg:col-span-6 space-y-3">
          <TammyEmailCard speed={speed} accent={accent} />
        </div>

        {/* Right: Question and Radio Options */}
        <div className="lg:col-span-6 space-y-4">
          <div
            className={`p-4 sm:p-5 rounded-2xl border ${
              isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}
          >
            {/* Question Card with Reversible Flip */}
            <div
              className={`p-3.5 sm:p-4 rounded-xl border mb-5 transition-all ${
                isQuestionFlipped
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-700'
                  : isDark
                  ? 'bg-slate-800/80 border-slate-700'
                  : 'bg-sky-50/70 border-sky-200'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 block mb-1">
                    Pregunta {currentQ.number}
                  </span>
                  {!isQuestionFlipped ? (
                    <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-relaxed">
                      {currentQ.question}
                    </p>
                  ) : (
                    <p className="text-sm sm:text-base font-medium italic text-emerald-900 dark:text-emerald-200 leading-relaxed font-serif">
                      {currentQ.questionEs}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={(e) => handleToggleQuestionFlip(currentQ.id, e)}
                    className={`w-7 h-7 rounded-lg border flex items-center justify-center transition-all cursor-pointer ${
                      isQuestionFlipped
                        ? 'bg-emerald-500 text-white border-emerald-600'
                        : isDark
                        ? 'bg-slate-700 border-slate-600 text-slate-300 hover:text-white'
                        : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900'
                    }`}
                    title={isQuestionFlipped ? 'Ver en inglés' : 'Ver traducción en español'}
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isQuestionFlipped ? 'rotate-180' : ''}`} />
                  </button>

                  <button
                    type="button"
                    onClick={(e) => handlePlayAudio(currentQ.question, e)}
                    className={`w-7 h-7 rounded-lg border flex items-center justify-center transition-all cursor-pointer ${
                      isDark
                        ? 'bg-slate-700 border-slate-600 text-sky-400 hover:text-white'
                        : 'bg-white border-slate-200 text-sky-600 hover:text-sky-800'
                    }`}
                    title="Escuchar pregunta"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Radio Options List matching screenshot */}
            <div className="space-y-3">
              {currentQ.options.map((opt) => {
                const isSelected = selectedOptId === opt.id;
                const isOptionFlipped = !!flippedOptions[opt.id];
                const isThisCorrect = opt.id === currentQ.correctAnswerId;

                let stateClasses = isDark
                  ? 'bg-slate-800/60 border-slate-700/80 hover:bg-slate-800 hover:border-slate-600'
                  : 'bg-white border-slate-200 hover:bg-slate-50 hover:border-slate-300';

                if (isSelected) {
                  stateClasses = isDark
                    ? 'bg-sky-950/60 border-sky-500 text-sky-100 ring-1 ring-sky-500/50'
                    : 'bg-sky-50 border-sky-400 text-sky-900 ring-1 ring-sky-400/40';
                }

                if (isQuestionChecked) {
                  if (isThisCorrect) {
                    stateClasses =
                      'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-400 dark:border-emerald-600 text-emerald-950 dark:text-emerald-100';
                  } else if (isSelected && !isThisCorrect) {
                    stateClasses =
                      'bg-rose-50 dark:bg-rose-950/50 border-rose-400 dark:border-rose-600 text-rose-950 dark:text-rose-100';
                  }
                }

                return (
                  <div
                    key={opt.id}
                    onClick={() => handleSelectOption(opt.id)}
                    className={`p-3 sm:p-3.5 rounded-xl border flex items-center justify-between gap-3 transition-all cursor-pointer select-none ${stateClasses}`}
                  >
                    {/* Left: Radio circle + text */}
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                          isSelected
                            ? 'border-sky-500 bg-sky-500'
                            : isDark
                            ? 'border-slate-500 bg-slate-800'
                            : 'border-slate-400 bg-white'
                        }`}
                      >
                        {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                      </div>

                      <div className="flex-1 min-w-0">
                        {!isOptionFlipped ? (
                          <p className="text-xs sm:text-sm font-medium leading-relaxed">
                            {opt.text}
                          </p>
                        ) : (
                          <p className="text-xs sm:text-sm font-medium italic text-emerald-800 dark:text-emerald-300 leading-relaxed font-serif">
                            {opt.textEs}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Right: Flip and audio buttons */}
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={(e) => handleToggleOptionFlip(opt.id, e)}
                        className={`w-7 h-7 rounded-lg border flex items-center justify-center transition-all cursor-pointer ${
                          isOptionFlipped
                            ? 'bg-emerald-500 text-white border-emerald-600'
                            : isDark
                            ? 'bg-slate-700/80 border-slate-600 text-slate-300 hover:text-white'
                            : 'bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900'
                        }`}
                        title={isOptionFlipped ? 'Ver inglés' : 'Ver traducción en español'}
                      >
                        <RefreshCw className={`w-3.5 h-3.5 ${isOptionFlipped ? 'rotate-180' : ''}`} />
                      </button>

                      <button
                        type="button"
                        onClick={(e) => handlePlayAudio(opt.text, e)}
                        className={`w-7 h-7 rounded-lg border flex items-center justify-center transition-all cursor-pointer ${
                          isDark
                            ? 'bg-slate-700/80 border-slate-600 text-sky-400 hover:text-white'
                            : 'bg-slate-100 border-slate-200 text-sky-600 hover:text-sky-800'
                        }`}
                        title="Escuchar audio"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Explanation Feedback after checking */}
            {isQuestionChecked && (
              <div
                className={`mt-5 p-3.5 rounded-xl border animate-in fade-in duration-200 ${
                  isAnswerCorrect
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-700 text-emerald-900 dark:text-emerald-200'
                    : 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-700 text-amber-950 dark:text-amber-200'
                }`}
              >
                <div className="flex items-center gap-2 mb-1 font-bold text-xs sm:text-sm">
                  {isAnswerCorrect ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      <span>¡Respuesta Correcta!</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4 text-rose-500 dark:text-rose-400" />
                      <span>Respuesta incorrecta. Explicación:</span>
                    </>
                  )}
                </div>
                <p className="text-xs sm:text-sm leading-relaxed">{currentQ.explanation}</p>
                <p className="text-xs sm:text-sm italic font-serif text-slate-600 dark:text-slate-300 mt-1">
                  {currentQ.explanationEs}
                </p>
              </div>
            )}

            {/* Navigation & Check Actions */}
            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={handlePrevQuestion}
                disabled={currentQuestionIdx === 0}
                className={`px-3 py-2 rounded-xl border text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  currentQuestionIdx > 0
                    ? isDark
                      ? 'border-slate-700 bg-slate-800 text-slate-300 hover:text-white'
                      : 'border-slate-200 bg-slate-100 text-slate-700 hover:text-slate-900'
                    : 'opacity-40 cursor-not-allowed border-transparent text-slate-400'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Anterior</span>
              </button>

              <div className="flex items-center gap-2">
                {!isQuestionChecked ? (
                  <button
                    type="button"
                    disabled={!selectedOptId}
                    onClick={handleCheckAnswer}
                    className={`px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm flex items-center gap-1.5 shadow-md transition-all cursor-pointer ${
                      selectedOptId
                        ? 'bg-sky-600 hover:bg-sky-500 text-white'
                        : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    <Check className="w-4 h-4" />
                    <span>Comprobar</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleNextQuestion}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
                  >
                    <span>{currentQuestionIdx < totalQuestions - 1 ? 'Siguiente Pregunta' : 'Ver Resultados'}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
