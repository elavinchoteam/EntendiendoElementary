import React, { useState } from 'react';
import {
  Award,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Volume2,
  RefreshCw,
  RotateCcw,
  Check,
  RotateCw,
  Sparkles,
  HelpCircle,
} from 'lucide-react';
import { WORK_TEST_QUESTIONS, TestDropdownItem } from '../../data/workData';
import { speakEnglish, stopSpeaking, playFeedbackSound } from '../../utils/audio';
import { useTheme } from '../../context/ThemeContext';

interface WorkTestMasterProps {
  speed: number;
  accent?: 'US' | 'UK';
  onCompleteSection?: () => void;
}

export const WorkTestMaster: React.FC<WorkTestMasterProps> = ({
  speed,
  accent = 'US',
  onCompleteSection,
}) => {
  const { isDark } = useTheme();

  // testStep: 0 = "Iniciar Test" landing card, 1..10 = questions 1..10, 11 = results card
  const [testStep, setTestStep] = useState<number>(0);

  // User answers map: { [testId]: selectedOption }
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  // Checked questions map: { [testId]: boolean }
  const [checkedQuestions, setCheckedQuestions] = useState<Record<string, boolean>>({});
  // Card flip state for current question
  const [isQuestionCardFlipped, setIsQuestionCardFlipped] = useState(false);
  // Audio playing state
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  // Flipped options map
  const [flippedOptions, setFlippedOptions] = useState<Record<string, boolean>>({});

  const totalQuestions = WORK_TEST_QUESTIONS.length; // 10 questions
  const currentTestIndex = testStep - 1;
  const currentTest: TestDropdownItem | undefined =
    testStep >= 1 && testStep <= totalQuestions
      ? WORK_TEST_QUESTIONS[currentTestIndex]
      : undefined;

  const currentSelectedOption = currentTest ? userAnswers[currentTest.id] : undefined;
  const isQuestionChecked = currentTest ? Boolean(checkedQuestions[currentTest.id]) : false;
  const isCorrect = currentTest && currentSelectedOption === currentTest.correctAnswer;

  const handleStartTest = () => {
    playFeedbackSound('click');
    setTestStep(1);
    setIsQuestionCardFlipped(false);
  };

  const handleSelectOption = (testId: string, opt: string) => {
    if (checkedQuestions[testId]) return;
    playFeedbackSound('click');
    setUserAnswers((prev) => ({ ...prev, [testId]: opt }));
  };

  const handleCheckCurrent = () => {
    if (!currentTest || !currentSelectedOption || isQuestionChecked) return;
    const correct = currentSelectedOption === currentTest.correctAnswer;
    playFeedbackSound(correct ? 'correct' : 'wrong');
    setCheckedQuestions((prev) => ({ ...prev, [currentTest.id]: true }));
  };

  const handleNextTest = () => {
    playFeedbackSound('click');
    setIsQuestionCardFlipped(false);
    if (testStep < totalQuestions) {
      setTestStep((prev) => prev + 1);
    } else {
      setTestStep(totalQuestions + 1);
      playFeedbackSound('complete');
      if (onCompleteSection) {
        onCompleteSection();
      }
    }
  };

  const handlePrevTest = () => {
    playFeedbackSound('click');
    setIsQuestionCardFlipped(false);
    if (testStep > 1) {
      setTestStep((prev) => prev - 1);
    }
  };

  const handleRestartTest = () => {
    playFeedbackSound('click');
    setUserAnswers({});
    setCheckedQuestions({});
    setIsQuestionCardFlipped(false);
    setFlippedOptions({});
    setTestStep(0);
  };

  const handleSpeakQuestion = (text: string) => {
    if (isPlayingAudio) {
      stopSpeaking();
      setIsPlayingAudio(false);
      return;
    }
    playFeedbackSound('click');
    speakEnglish(
      text,
      speed,
      accent,
      () => setIsPlayingAudio(true),
      () => setIsPlayingAudio(false)
    );
  };

  const toggleOptionFlip = (opt: string, e: React.MouseEvent) => {
    e.stopPropagation();
    playFeedbackSound('click');
    setFlippedOptions((prev) => ({ ...prev, [opt]: !prev[opt] }));
  };

  // Spanish translation dictionary for options
  const optionTranslations: Record<string, string> = {
    'a break': 'un descanso / pausa',
    'a meeting': 'una reunión',
    'a summer job': 'un trabajo de verano',
    desk: 'escritorio',
    factory: 'fábrica',
    office: 'oficina',
    break: 'descanso',
    'high salary': 'sueldo alto',
    'a high salary': 'un sueldo alto',
    'a suit': 'un traje',
    'a factory': 'una fábrica',
    suit: 'traje',
    'wrote a report': 'escribió un informe',
    'started a business': 'comenzó un negocio',
    'wore a suit': 'vistió un traje',
    breaks: 'descansos',
    'high salaries': 'sueldos altos',
    suits: 'trajes',
    'summer job': 'trabajo de verano',
    'had a break': 'tomó un descanso',
  };

  // Calculate score
  const score = WORK_TEST_QUESTIONS.reduce((acc, t) => {
    return userAnswers[t.id] === t.correctAnswer ? acc + 1 : acc;
  }, 0);

  /* =========================================================================
     CASE 1: LANDING CARD "INICIAR TEST"
     ========================================================================= */
  if (testStep === 0) {
    return (
      <div className="w-full flex flex-col items-center gap-6 animate-in fade-in duration-200 py-4 max-w-3xl mx-auto">
        {/* Reversible "Iniciar Test" Card */}
        <div className="w-full bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-md flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-sky-200 dark:shadow-sky-950 mb-4">
            <Award className="w-9 h-9" />
          </div>

          <span className="text-xs font-mono text-sky-600 dark:text-sky-400 font-bold uppercase tracking-widest px-3 py-1 bg-sky-50 dark:bg-sky-950/70 rounded-full border border-sky-100 dark:border-sky-900 mb-2">
            Unidad 9 · Sección 7
          </span>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 dark:text-slate-100 font-serif mb-3">
            Test Final: Work
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-lg mb-6 leading-relaxed">
            Pon a prueba tu dominio sobre el vocabulario y expresiones de trabajo con 10 preguntas interactivas. Cada pregunta cuenta con tarjeta reversible con la traducción completa al español y explicación gramatical.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-xl mb-8 text-left">
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wide block">Preguntas</span>
              <span className="text-lg font-extrabold text-slate-800 dark:text-slate-100">10 ejercicios</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wide block">Formato</span>
              <span className="text-lg font-extrabold text-slate-800 dark:text-slate-100">Menú desplegable</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wide block">Traducción</span>
              <span className="text-lg font-extrabold text-emerald-600 dark:text-emerald-400">100% Reversible</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleStartTest}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white font-bold text-base shadow-lg shadow-sky-500/25 hover:shadow-xl hover:shadow-sky-500/30 transition-all flex items-center justify-center gap-2.5 active:scale-98 cursor-pointer"
          >
            <span>Iniciar Test</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  /* =========================================================================
     CASE 2: RESULTS CARD (testStep === 11)
     ========================================================================= */
  if (testStep > totalQuestions) {
    const percentage = Math.round((score / totalQuestions) * 100);
    const passed = percentage >= 70;

    return (
      <div className="w-full flex flex-col items-center gap-6 animate-in fade-in duration-200 py-4 max-w-3xl mx-auto">
        <div className="w-full bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-md flex flex-col items-center text-center">
          <div
            className={`w-20 h-20 rounded-3xl flex items-center justify-center mb-4 ${
              passed
                ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400'
                : 'bg-amber-100 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400'
            }`}
          >
            <Award className="w-10 h-10" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 dark:text-slate-100 font-serif mb-2">
            {passed ? '¡Excelente trabajo!' : '¡Buen intento!'}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
            Has completado el examen de la Sección 7: Work.
          </p>

          {/* Score display */}
          <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 w-full max-w-md mb-8">
            <div className="text-4xl font-extrabold text-slate-800 dark:text-slate-100 mb-1">
              {score} / {totalQuestions}
            </div>
            <div className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-4">
              Puntuación final: {percentage}%
            </div>

            <div className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ${
                  passed ? 'bg-emerald-500' : 'bg-amber-500'
                }`}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>

          {/* Review of all 10 items */}
          <div className="w-full space-y-3 mb-8 text-left">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 px-1">
              Revisión de respuestas
            </h4>
            {WORK_TEST_QUESTIONS.map((t, idx) => {
              const userAns = userAnswers[t.id];
              const isAnsCorrect = userAns === t.correctAnswer;

              return (
                <div
                  key={t.id}
                  className={`p-3.5 rounded-2xl border text-sm flex items-start justify-between gap-3 ${
                    isAnsCorrect
                      ? 'border-emerald-300 dark:border-emerald-800/60 bg-emerald-50/40 dark:bg-emerald-950/20'
                      : 'border-rose-300 dark:border-rose-800/60 bg-rose-50/40 dark:bg-rose-950/20'
                  }`}
                >
                  <div className="flex-1 space-y-1">
                    <div className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                      <span className="font-mono text-xs text-slate-400">#{idx + 1}</span>
                      <span>{t.fullSentence}</span>
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 italic">
                      {t.translation}
                    </div>
                    {!isAnsCorrect && (
                      <div className="text-xs text-rose-600 dark:text-rose-400">
                        Tu respuesta: <span className="font-bold">{userAns || '(sin responder)'}</span> | Correcta:{' '}
                        <span className="font-bold">{t.correctAnswer}</span>
                      </div>
                    )}
                  </div>
                  <div>
                    {isAnsCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                    ) : (
                      <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <button
            type="button"
            onClick={handleRestartTest}
            className="px-6 py-3 rounded-2xl bg-slate-800 hover:bg-slate-900 text-white dark:bg-slate-700 dark:hover:bg-slate-600 font-bold text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Repetir examen</span>
          </button>
        </div>
      </div>
    );
  }

  /* =========================================================================
     CASE 3: QUESTION STEP 1..10
     ========================================================================= */
  if (!currentTest) return null;

  return (
    <div className="w-full flex flex-col items-center gap-6 animate-in fade-in duration-200 py-2 max-w-5xl mx-auto">
      {/* Top Header: Question index & Progress bar */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 px-2">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide bg-sky-100 text-sky-700 dark:bg-sky-950/70 dark:text-sky-300">
            Unidad 9 · Sección 7
          </span>
          <span className="text-xs text-slate-400 font-medium">
            Pregunta {testStep} de {totalQuestions}
          </span>
        </div>

        {/* Progress pill indicator */}
        <div className="flex items-center gap-1.5">
          {WORK_TEST_QUESTIONS.map((_, idx) => {
            const stepNum = idx + 1;
            const isDone = checkedQuestions[WORK_TEST_QUESTIONS[idx].id];
            const isCurrent = stepNum === testStep;

            return (
              <div
                key={idx}
                className={`h-2 rounded-full transition-all ${
                  isCurrent
                    ? 'w-6 bg-sky-500'
                    : isDone
                    ? 'w-2 bg-emerald-500'
                    : 'w-2 bg-slate-300 dark:bg-slate-700'
                }`}
              />
            );
          })}
        </div>
      </div>

      {/* Main 2-Column Layout */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Stacked Polaroid Photo */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="relative w-full max-w-sm rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl bg-white dark:bg-slate-900 p-3">
            <img
              src="/assets/aistudio/test_1_17e1989f.png"
              alt="Work test illustration"
              className="w-full h-auto object-cover rounded-2xl"
            />
            <div className="mt-3 px-2 flex items-center justify-between text-xs text-slate-400">
              <span className="font-mono">Foto de referencia</span>
              <span className="font-semibold text-sky-600 dark:text-sky-400">Work Scene</span>
            </div>
          </div>
        </div>

        {/* Right Column: Reversible Exercise Card */}
        <div className="lg:col-span-7 space-y-4">
          <div
            className={`w-full rounded-3xl border transition-all duration-300 shadow-md ${
              !isQuestionCardFlipped
                ? isDark
                  ? 'bg-slate-900/90 border-slate-700'
                  : 'bg-white border-slate-200'
                : isDark
                ? 'bg-emerald-950/40 border-emerald-700/80'
                : 'bg-emerald-50/80 border-emerald-300'
            } p-6 sm:p-7`}
          >
            {!isQuestionCardFlipped ? (
              /* FRONT FACE: Question & Dropdown (NO overflow) */
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      Pregunta #{testStep}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleSpeakQuestion(currentTest.fullSentence)}
                      className={`p-2 rounded-xl transition-colors ${
                        isPlayingAudio
                          ? 'bg-sky-500 text-white animate-pulse'
                          : isDark
                          ? 'bg-slate-800 text-sky-400 hover:bg-slate-700'
                          : 'bg-sky-50 text-sky-600 hover:bg-sky-100'
                      }`}
                      title="Escuchar oración completa"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsQuestionCardFlipped(true)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors ${
                        isDark
                          ? 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                      }`}
                      title="Voltear tarjeta para ver traducción"
                    >
                      <RotateCw className="w-3.5 h-3.5" />
                      <span>Voltear tarjeta</span>
                    </button>
                  </div>
                </div>

                {/* Instruction */}
                <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                  Select the correct answer from the drop-down list.
                </p>

                {/* Sentence with Dropdown */}
                <div className="p-5 rounded-2xl bg-sky-50/50 dark:bg-slate-800/60 border border-sky-100 dark:border-slate-700/60 text-base sm:text-lg text-slate-800 dark:text-slate-100 leading-relaxed">
                  <span>{currentTest.sentenceBefore} </span>

                  <span className="inline-block mx-1.5 align-middle">
                    <select
                      value={currentSelectedOption || ''}
                      onChange={(e) => handleSelectOption(currentTest.id, e.target.value)}
                      disabled={isQuestionChecked}
                      className={`px-3.5 py-1.5 rounded-xl border text-sm sm:text-base font-bold transition-all outline-hidden cursor-pointer ${
                        isQuestionChecked
                          ? isCorrect
                            ? 'border-emerald-500 bg-emerald-50 text-emerald-900 dark:bg-emerald-950/70 dark:text-emerald-200'
                            : 'border-rose-400 bg-rose-50 text-rose-900 dark:bg-rose-950/70 dark:text-rose-200'
                          : isDark
                          ? 'bg-slate-800 border-slate-600 text-slate-100 hover:border-sky-400'
                          : 'bg-white border-sky-300 text-slate-800 hover:border-sky-500 shadow-xs'
                      }`}
                    >
                      <option value="">Selecciona...</option>
                      {currentTest.options.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </span>

                  <span> {currentTest.sentenceAfter}</span>
                </div>

                {/* Options List with individual reversible cards */}
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
                    Opciones disponibles (haz clic en 🔄 en cada opción para ver su traducción):
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {currentTest.options.map((opt) => {
                      const isOptionFlipped = flippedOptions[opt];
                      const isSelected = currentSelectedOption === opt;
                      const optTranslation = optionTranslations[opt] || opt;

                      return (
                        <div
                          key={opt}
                          onClick={() => !isQuestionChecked && handleSelectOption(currentTest.id, opt)}
                          className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-between gap-1.5 cursor-pointer transition-all ${
                            isSelected
                              ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/60 text-sky-800 dark:text-sky-200 ring-2 ring-sky-300 shadow-xs'
                              : isDark
                              ? 'border-slate-800 bg-slate-800/80 text-slate-300 hover:border-slate-600'
                              : 'border-slate-200 bg-slate-50/80 text-slate-700 hover:border-slate-300'
                          }`}
                        >
                          <span className="truncate">
                            {!isOptionFlipped ? opt : optTranslation}
                          </span>
                          <button
                            type="button"
                            onClick={(e) => toggleOptionFlip(opt, e)}
                            className="p-1 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 shrink-0"
                            title="Voltear opción"
                          >
                            <RotateCw className="w-3 h-3" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Feedback message if checked */}
                {isQuestionChecked && (
                  <div
                    className={`p-3.5 rounded-2xl border flex items-center gap-3 ${
                      isCorrect
                        ? 'border-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-200'
                        : 'border-rose-300 bg-rose-50 dark:bg-rose-950/30 text-rose-800 dark:text-rose-200'
                    }`}
                  >
                    {isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                    ) : (
                      <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                    )}
                    <div className="text-xs sm:text-sm">
                      <span className="font-bold">
                        {isCorrect ? '¡Correcto!' : 'Respuesta incorrecta.'}
                      </span>{' '}
                      {isCorrect
                        ? 'Excelente elección gramatical.'
                        : `La respuesta correcta es "${currentTest.correctAnswer}". Voltea la tarjeta para ver la explicación.`}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={handlePrevTest}
                    disabled={testStep === 1}
                    className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Anterior</span>
                  </button>

                  <div className="flex items-center gap-2">
                    {!isQuestionChecked ? (
                      <button
                        type="button"
                        onClick={handleCheckCurrent}
                        disabled={!currentSelectedOption}
                        className="px-6 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-sm shadow-md transition-all cursor-pointer"
                      >
                        Comprobar
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleNextTest}
                        className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <span>{testStep === totalQuestions ? 'Finalizar Test' : 'Siguiente'}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              /* BACK FACE: Translations and Explanations (Natural height, NO overflow clipping) */
              <div className="space-y-5 animate-in fade-in duration-200">
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-emerald-200/60 dark:border-emerald-800/60">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Reverso · Oración Completa y Traducción
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleSpeakQuestion(currentTest.fullSentence)}
                      className={`p-2 rounded-xl transition-colors ${
                        isPlayingAudio
                          ? 'bg-sky-500 text-white animate-pulse'
                          : 'bg-white dark:bg-slate-800 text-emerald-700 dark:text-emerald-300 shadow-xs'
                      }`}
                      title="Escuchar en inglés"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsQuestionCardFlipped(false)}
                      className="px-3 py-1.5 rounded-xl bg-emerald-100 hover:bg-emerald-200 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200 text-xs font-bold flex items-center gap-1.5 transition-colors"
                      title="Regresar al ejercicio"
                    >
                      <RotateCw className="w-3.5 h-3.5" />
                      <span>Volver al Ejercicio</span>
                    </button>
                  </div>
                </div>

                {/* English sentence with highlight */}
                <div className="space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Inglés:
                  </span>
                  <p className="text-lg font-bold text-slate-900 dark:text-white leading-relaxed">
                    {currentTest.sentenceBefore}{' '}
                    <span className="px-2 py-0.5 rounded-lg bg-sky-200 dark:bg-sky-900 text-sky-900 dark:text-sky-100 font-extrabold">
                      {currentTest.correctAnswer}
                    </span>{' '}
                    {currentTest.sentenceAfter}
                  </p>
                </div>

                {/* Spanish translation card */}
                <div className="p-4 rounded-2xl bg-emerald-100/60 dark:bg-emerald-950/60 border border-emerald-300/70 dark:border-emerald-800/70 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 block">
                    Traducción al Español:
                  </span>
                  <p className="text-base font-semibold text-emerald-950 dark:text-emerald-100 italic leading-relaxed">
                    {currentTest.translation}
                  </p>
                </div>

                {/* Grammar note */}
                <div className="p-4 rounded-2xl bg-sky-50/80 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800/60 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-sky-800 dark:text-sky-300 block flex items-center gap-1">
                    <HelpCircle className="w-3.5 h-3.5" />
                    Explicación y Justificación:
                  </span>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                    {currentTest.grammarNote}
                  </p>
                </div>

                {/* Options translations table */}
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400 block">
                    Traducción de todas las opciones del ejercicio:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {currentTest.options.map((opt) => (
                      <div
                        key={opt}
                        className={`p-2.5 rounded-xl border text-xs ${
                          opt === currentTest.correctAnswer
                            ? 'border-emerald-400 bg-emerald-100/50 dark:bg-emerald-950/50 font-bold text-emerald-900 dark:text-emerald-200'
                            : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <div className="font-bold">{opt}</div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 italic">
                          {optionTranslations[opt] || opt}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Return button */}
                <div className="pt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setIsQuestionCardFlipped(false)}
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Continuar respondiendo</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
