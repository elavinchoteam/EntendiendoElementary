import React, { useState } from 'react';
import {
  Play,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Award,
  ChevronRight,
  ChevronLeft,
  Volume2,
  Check,
} from 'lucide-react';
import { NUTRITION_TESTS, NutritionTestItem, nutritionChefImg } from '../../data/nutritionData';
import { ReversibleCard } from './ReversibleCard';
import { playFeedbackSound, speakEnglish, stopSpeaking } from '../../utils/audio';
import { useTheme } from '../../context/ThemeContext';

interface NutritionTestActivityProps {
  speed: number;
  accent?: 'US' | 'UK';
  onTestComplete?: (score: number) => void;
}

export const NutritionTestActivity: React.FC<NutritionTestActivityProps> = ({
  speed,
  accent = 'US',
  onTestComplete,
}) => {
  const { isDark } = useTheme();

  // Test state: 'landing' | 'in-progress' | 'completed'
  const [testState, setTestState] = useState<'landing' | 'in-progress' | 'completed'>('landing');
  const [currentTestIndex, setCurrentTestIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [verifiedAnswers, setVerifiedAnswers] = useState<Record<string, boolean>>({});

  const currentItem: NutritionTestItem = NUTRITION_TESTS[currentTestIndex];
  const totalQuestions = NUTRITION_TESTS.length; // 10

  const handleStartTest = () => {
    playFeedbackSound('click');
    setTestState('in-progress');
    setCurrentTestIndex(0);
    setAnswers({});
    setVerifiedAnswers({});
  };

  const handleSelectOption = (testId: string, option: string) => {
    playFeedbackSound('click');
    setAnswers((prev) => ({
      ...prev,
      [testId]: option,
    }));
    // Reset verified state for this question if user changes selection
    setVerifiedAnswers((prev) => ({
      ...prev,
      [testId]: false,
    }));
  };

  const handleVerify = (testId: string) => {
    const selected = answers[testId];
    if (!selected) return;

    const isCorrect =
      selected.trim().toLowerCase() === currentItem.correctAnswer.trim().toLowerCase();

    if (isCorrect) {
      playFeedbackSound('correct');
    } else {
      playFeedbackSound('wrong');
    }

    setVerifiedAnswers((prev) => ({
      ...prev,
      [testId]: true,
    }));
  };

  const handleNext = () => {
    playFeedbackSound('click');
    stopSpeaking();
    if (currentTestIndex < totalQuestions - 1) {
      setCurrentTestIndex((prev) => prev + 1);
    } else {
      // Complete test
      setTestState('completed');
      let score = 0;
      NUTRITION_TESTS.forEach((t) => {
        if (answers[t.id]?.trim().toLowerCase() === t.correctAnswer.trim().toLowerCase()) {
          score += 1;
        }
      });
      if (onTestComplete) onTestComplete(score);
    }
  };

  const handlePrev = () => {
    playFeedbackSound('click');
    stopSpeaking();
    if (currentTestIndex > 0) {
      setCurrentTestIndex((prev) => prev - 1);
    }
  };

  const handleRestart = () => {
    playFeedbackSound('click');
    stopSpeaking();
    setTestState('landing');
    setCurrentTestIndex(0);
    setAnswers({});
    setVerifiedAnswers({});
  };

  // Calculate score
  const correctCount = NUTRITION_TESTS.filter(
    (t) => answers[t.id]?.trim().toLowerCase() === t.correctAnswer.trim().toLowerCase()
  ).length;

  // -------------------------------------------------------------
  // 1. LANDING VIEW: "Iniciar Test" Card
  // -------------------------------------------------------------
  if (testState === 'landing') {
    return (
      <div className="w-full flex flex-col gap-6 items-center justify-center animate-in fade-in duration-200">
        {/* Reversible Header Instructions */}
        <ReversibleCard
          textEn="Final Test: Nutrition\nComplete the 10 questions to test your knowledge of nutrition and healthy eating vocabulary."
          textEs="Test Final: Nutrición\nCompleta las 10 preguntas para evaluar tu conocimiento del vocabulario sobre nutrición y alimentación saludable."
          speed={speed}
          accent={accent}
          className="shadow-sm"
          childrenFront={
            <div className="flex flex-col gap-1">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-sky-800 dark:text-sky-400">
                Final Test: Nutrition
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                Complete the 10 questions to test your knowledge of nutrition and healthy eating vocabulary.
              </p>
            </div>
          }
          childrenBack={
            <div className="flex flex-col gap-1">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-sky-900 dark:text-sky-300">
                Test Final: Nutrición
              </h2>
              <p className="text-xs sm:text-sm font-serif italic text-sky-900 dark:text-sky-200">
                Completa las 10 preguntas para evaluar tu conocimiento del vocabulario sobre nutrición y alimentación saludable.
              </p>
            </div>
          }
        />

        {/* Tarjeta Iniciar Test */}
        <div
          className={`w-full max-w-2xl rounded-3xl border p-8 sm:p-12 flex flex-col items-center text-center gap-6 shadow-md transition-colors ${
            isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
          }`}
        >
          <div className="relative">
            <img
              src={nutritionChefImg}
              alt="Chef in kitchen"
              className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-sky-500/20 shadow-lg mx-auto"
            />
            <div className="absolute -bottom-2 -right-2 p-2.5 rounded-full bg-emerald-600 text-white shadow-md">
              <Award className="w-6 h-6" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
              Evaluación Final · 10 Preguntas
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              ¿Listo para iniciar el test?
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
              Selecciona la opción correcta en cada pregunta y presiona el botón para verificar tu respuesta antes de continuar.
            </p>
          </div>

          <button
            type="button"
            onClick={handleStartTest}
            className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-base shadow-lg shadow-md transition-all hover:scale-102 active:scale-95 cursor-pointer"
          >
            <Play className="w-5 h-5 fill-current" />
            <span>Iniciar Test</span>
          </button>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // 2. IN-PROGRESS VIEW: Test 1 to Test 10 in exact sequence
  // -------------------------------------------------------------
  if (testState === 'in-progress') {
    const selectedVal = answers[currentItem.id] || '';
    const isVerified = Boolean(verifiedAnswers[currentItem.id]);
    const isCorrect =
      isVerified &&
      selectedVal.trim().toLowerCase() === currentItem.correctAnswer.trim().toLowerCase();

    const spokenQuestionText = `${currentItem.sentenceBefore} ${selectedVal || '...'} ${currentItem.sentenceAfter}`;

    return (
      <div className="relative w-full flex flex-col gap-6 animate-in fade-in duration-200">
        {/* Reversible Instruction Header Card */}
        <ReversibleCard
          textEn={`Test ${currentItem.testNumber} of ${totalQuestions}\n${currentItem.instructions}`}
          textEs={`Test ${currentItem.testNumber} de ${totalQuestions}\n${currentItem.instructionsEs}`}
          speed={speed}
          accent={accent}
          className="shadow-sm"
          childrenFront={
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-0.5">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                  Test {currentItem.testNumber} / {totalQuestions}
                </span>
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                  {currentItem.instructions}
                </p>
              </div>

              {/* Progress pill */}
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-mono font-bold text-slate-600 dark:text-slate-300">
                {currentTestIndex + 1} / {totalQuestions}
              </div>
            </div>
          }
          childrenBack={
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-0.5">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-700 dark:text-sky-400">
                  Test {currentItem.testNumber} / {totalQuestions}
                </span>
                <p className="text-sm font-serif italic text-sky-950 dark:text-sky-200">
                  {currentItem.instructionsEs}
                </p>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-sky-100 dark:bg-sky-950 text-xs font-mono font-bold text-sky-800 dark:text-sky-300">
                {currentTestIndex + 1} / {totalQuestions}
              </div>
            </div>
          }
        />

        {/* Test Card matching test 1.png to test 10.png */}
        <div
          className={`w-full rounded-3xl border p-6 sm:p-10 flex flex-col gap-8 shadow-sm transition-colors ${
            isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left side: Chef Picture from test 1.png - test 10.png */}
            <div className="md:col-span-4 flex justify-center">
              <div className="relative group">
                <img
                  src={nutritionChefImg}
                  alt="Chef decorating dessert"
                  className="w-48 h-48 sm:w-56 sm:h-56 rounded-2xl object-cover border border-slate-200 dark:border-slate-700 shadow-md transition-transform group-hover:scale-102"
                />
              </div>
            </div>

            {/* Right side: Interactive Dropdown Sentence & Verification */}
            <div className="md:col-span-8 flex flex-col gap-6">
              {/* Question Number Badge and Audio button */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400 font-mono font-bold text-xs">
                    Pregunta {currentItem.testNumber}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => speakEnglish(spokenQuestionText, speed, accent)}
                  className="p-2.5 rounded-xl border transition-all text-slate-600 dark:text-slate-300 hover:text-sky-600 border-slate-200 dark:border-slate-700 hover:border-sky-500 shadow-2xs cursor-pointer"
                  aria-label="Escuchar oración"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>

              {/* The Sentence with Dropdown matching screenshots */}
              <div className="text-lg sm:text-xl font-medium leading-loose text-slate-800 dark:text-slate-100">
                <span>{currentItem.sentenceBefore}</span>

                <select
                  value={selectedVal}
                  onChange={(e) => handleSelectOption(currentItem.id, e.target.value)}
                  className={`inline-block mx-2 px-4 py-2 text-base font-bold rounded-xl border-2 transition-all align-middle cursor-pointer shadow-xs ${
                    isVerified
                      ? isCorrect
                        ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-600 text-sky-900 dark:text-sky-200 ring-2 ring-emerald-300'
                        : 'bg-rose-50 dark:bg-rose-950/50 border-rose-500 text-rose-900 dark:text-rose-200 ring-2 ring-rose-300'
                      : selectedVal
                      ? 'bg-sky-50 dark:bg-sky-950/50 border-sky-600 text-sky-900 dark:text-sky-200 ring-2 ring-sky-200 dark:ring-sky-900'
                      : isDark
                      ? 'bg-slate-800 border-slate-700 text-slate-300'
                      : 'bg-white border-slate-300 text-slate-700'
                  }`}
                >
                  <option value="">-- Select --</option>
                  {currentItem.options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>

                <span>{currentItem.sentenceAfter}</span>
              </div>

              {/* Action Button: VERIFICAR RESPUESTA (Only shown when not yet verified, or allows re-verification) */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleVerify(currentItem.id)}
                  disabled={!selectedVal}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-md cursor-pointer ${
                    !selectedVal
                      ? 'opacity-40 cursor-not-allowed bg-slate-200 dark:bg-slate-800 text-slate-400'
                      : isVerified
                      ? 'bg-slate-700 hover:bg-slate-800 text-white'
                      : 'bg-sky-600 hover:bg-sky-500 text-white active:scale-95 shadow-md'
                  }`}
                >
                  <Check className="w-4 h-4" />
                  <span>{isVerified ? 'Volver a Verificar' : 'Verificar Respuesta'}</span>
                </button>
              </div>

              {/* Instant Verification Feedback (ONLY after clicking Verificar) */}
              {isVerified && (
                <div className="flex flex-col gap-4 animate-in fade-in duration-200">
                  {isCorrect ? (
                    <div className="p-4 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-sky-300 dark:border-sky-800 flex items-center gap-3 text-sky-900 dark:text-sky-200">
                      <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                      <div>
                        <p className="text-sm font-bold">¡Respuesta Correcta!</p>
                        <p className="text-xs text-emerald-700 dark:text-emerald-300">
                          Has completado la oración adecuadamente.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 rounded-2xl bg-rose-50/80 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-800 flex items-center gap-3 text-rose-900 dark:text-rose-200">
                      <XCircle className="w-6 h-6 text-rose-600 shrink-0" />
                      <div>
                        <p className="text-sm font-bold">Respuesta Incorrecta</p>
                        <p className="text-xs text-rose-700 dark:text-rose-300">
                          La respuesta correcta es:{' '}
                          <strong className="underline">{currentItem.correctAnswer}</strong>
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Reversible Card for Sentence & Translation — SHOWN ONLY AFTER VERIFYING */}
                  <ReversibleCard
                    textEn={currentItem.fullSentenceEn}
                    textEs={currentItem.fullSentenceEs}
                    speed={speed}
                    accent={accent}
                    minHeightClass="min-h-[80px]"
                    audioTextEn={currentItem.fullSentenceEn}
                    childrenFront={
                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                          Oración completa:
                        </span>
                        <p className="text-base font-medium text-slate-900 dark:text-white">
                          {currentItem.fullSentenceEn}
                        </p>
                      </div>
                    }
                    childrenBack={
                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                          Traducción en español:
                        </span>
                        <p className="text-base font-serif italic text-sky-950 dark:text-sky-200">
                          {currentItem.fullSentenceEs}
                        </p>
                      </div>
                    }
                  />
                </div>
              )}
            </div>
          </div>

          {/* Test Navigation Bar */}
          <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentTestIndex === 0}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border transition-all cursor-pointer ${
                currentTestIndex === 0
                  ? 'opacity-40 cursor-not-allowed border-transparent text-slate-400'
                  : isDark
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200 shadow-xs'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Anterior</span>
            </button>

            {/* Next / Finish Button */}
            <button
              type="button"
              onClick={handleNext}
              disabled={!selectedVal}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md cursor-pointer ${
                selectedVal
                  ? isVerified
                    ? 'bg-sky-600 hover:bg-sky-500 text-white active:scale-95 shadow-md'
                    : 'bg-sky-600 hover:bg-sky-500 text-white active:scale-95'
                  : 'bg-slate-300 dark:bg-slate-800 text-slate-500 dark:text-slate-600 cursor-not-allowed shadow-none'
              }`}
            >
              <span>{currentTestIndex === totalQuestions - 1 ? 'Finalizar Test' : 'Siguiente'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // 3. COMPLETED VIEW: Results Card with Score & Review
  // -------------------------------------------------------------
  const percentage = Math.round((correctCount / totalQuestions) * 100);
  const isPassed = percentage >= 70;

  return (
    <div className="w-full flex flex-col gap-6 animate-in fade-in duration-200">
      {/* Reversible Summary Header */}
      <ReversibleCard
        textEn={`Test Results: ${correctCount}/${totalQuestions} Correct (${percentage}%)\nReview your answers below.`}
        textEs={`Resultados del Test: ${correctCount}/${totalQuestions} Correctas (${percentage}%)\nRevisa tus respuestas a continuación.`}
        speed={speed}
        accent={accent}
        className="shadow-sm"
        childrenFront={
          <div className="flex flex-col gap-1">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-sky-800 dark:text-sky-400">
              Test Results
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              You scored {correctCount} out of {totalQuestions} ({percentage}%).
            </p>
          </div>
        }
        childrenBack={
          <div className="flex flex-col gap-1">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-sky-900 dark:text-sky-300">
              Resultados del Test
            </h2>
            <p className="text-xs sm:text-sm font-serif italic text-sky-900 dark:text-sky-200">
              Obtuviste {correctCount} de {totalQuestions} aciertos ({percentage}%).
            </p>
          </div>
        }
      />

      {/* Score Summary Box */}
      <div
        className={`w-full rounded-3xl border p-8 flex flex-col items-center text-center gap-6 shadow-sm ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        }`}
      >
        <div
          className={`w-20 h-20 rounded-full flex items-center justify-center border-4 shadow-lg ${
            isPassed
              ? 'bg-sky-500/10 border-emerald-500 text-emerald-600'
              : 'bg-amber-500/10 border-amber-500 text-amber-600'
          }`}
        >
          <Award className="w-10 h-10" />
        </div>

        <div className="flex flex-col gap-1">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {isPassed ? '¡Excelente Trabajo!' : '¡Buen Intento!'}
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {isPassed
              ? 'Has superado el test de vocabulario de Nutrición con éxito.'
              : 'Puedes volver a intentarlo para mejorar tu puntuación.'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleRestart}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm shadow-md transition-all active:scale-95 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Volver a Iniciar Test</span>
          </button>
        </div>
      </div>

      {/* Review Questions List (All 10 questions with answers and reversible cards) */}
      <div className="flex flex-col gap-4">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
          Revisión de Preguntas (1 a 10)
        </span>

        {NUTRITION_TESTS.map((t, idx) => {
          const userAns = answers[t.id];
          const isItemCorrect = userAns?.trim().toLowerCase() === t.correctAnswer.trim().toLowerCase();

          return (
            <div
              key={t.id}
              className={`p-5 rounded-2xl border flex flex-col gap-3 ${
                isItemCorrect
                  ? isDark
                    ? 'bg-emerald-950/20 border-emerald-800/40'
                    : 'bg-emerald-50/50 border-emerald-200'
                  : isDark
                  ? 'bg-rose-950/20 border-rose-800/40'
                  : 'bg-rose-50/50 border-rose-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-slate-500">
                    Test {idx + 1}
                  </span>
                  {isItemCorrect ? (
                    <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="w-4 h-4" />
                      Correcta
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-xs font-bold text-rose-600 dark:text-rose-400">
                      <XCircle className="w-4 h-4" />
                      Incorrecta
                    </span>
                  )}
                </div>

                <div className="text-xs text-slate-500">
                  Respuesta correcta:{' '}
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    {t.correctAnswer}
                  </span>
                </div>
              </div>

              {/* Reversible card for question review */}
              <ReversibleCard
                textEn={t.fullSentenceEn}
                textEs={t.fullSentenceEs}
                speed={speed}
                accent={accent}
                minHeightClass="min-h-[70px]"
                childrenFront={
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
                      {t.fullSentenceEn}
                    </span>
                  </div>
                }
                childrenBack={
                  <div className="flex flex-col">
                    <span className="text-sm font-serif italic text-sky-950 dark:text-sky-200">
                      {t.fullSentenceEs}
                    </span>
                  </div>
                }
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
