import React, { useState } from 'react';
import {
  Play,
  Check,
  RotateCcw,
  Award,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Volume2,
  RefreshCw,
  ChevronDown,
} from 'lucide-react';
import {
  ADJECTIVES_2_TESTS,
  Adjectives2TestItem,
  adjectives2ContextImg,
} from '../../data/adjectives2Data';
import { speakEnglish, stopSpeaking, playFeedbackSound } from '../../utils/audio';
import { useTheme } from '../../context/ThemeContext';
import { ReversibleTextCard } from './ReversibleTextCard';

interface TestMasterActivityProps {
  speed: number;
  accent?: 'US' | 'UK';
  onCompleteSection?: () => void;
}

export const TestMasterActivity: React.FC<TestMasterActivityProps> = ({
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

  const totalQuestions = ADJECTIVES_2_TESTS.length; // 10
  const currentTestIndex = testStep - 1;
  const currentTest: Adjectives2TestItem | undefined =
    testStep >= 1 && testStep <= totalQuestions
      ? ADJECTIVES_2_TESTS[currentTestIndex]
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
      playFeedbackSound('correct');
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

  // Calculate score
  const score = ADJECTIVES_2_TESTS.reduce((acc, t) => {
    return userAnswers[t.id] === t.correctAnswer ? acc + 1 : acc;
  }, 0);

  /* =========================================================================
     CASE 1: LANDING CARD "INICIAR TEST"
     ========================================================================= */
  if (testStep === 0) {
    return (
      <div className="w-full flex flex-col items-center gap-6 animate-in fade-in duration-200 py-4">
        {/* Reversible "Iniciar Test" Card */}
        <div className="w-full max-w-2xl">
          <ReversibleTextCard
            textEn="Unit Test: Adjectives 2\nThis test contains 10 questions. Press Start Test to begin."
            textEs="Test de la Unidad: Adjetivos 2\nEste test contiene 10 preguntas. Presiona Iniciar Test para comenzar."
            speed={speed}
            accent={accent}
            minHeightClass="min-h-[220px]"
            childrenFront={
              <div className="w-full flex flex-col items-center justify-center text-center p-4 gap-3">
                <span className="w-12 h-12 rounded-2xl bg-sky-600 text-white flex items-center justify-center shadow-md">
                  <Award className="w-6 h-6" />
                </span>
                <div className="flex flex-col gap-1">
                  <h3 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                    Test: Adjectives 2
                  </h3>
                  <span className="text-xs sm:text-sm font-mono text-sky-600 dark:text-sky-400 font-bold uppercase tracking-wider">
                    10 Preguntas de Evaluación
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md leading-relaxed">
                  Pon a prueba tu conocimiento de los 10 adjetivos en inglés: alone, angry, best, easy, pretty, quick, special, strong, wonderful y worst.
                </p>
              </div>
            }
            childrenBack={
              <div className="w-full flex flex-col items-center justify-center text-center p-4 gap-3">
                <span className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
                  <Award className="w-6 h-6" />
                </span>
                <div className="flex flex-col gap-1">
                  <h3 className="text-xl sm:text-2xl font-black tracking-tight text-emerald-950 dark:text-emerald-200">
                    Test: Adjetivos 2
                  </h3>
                  <span className="text-xs sm:text-sm font-mono text-emerald-700 dark:text-emerald-400 font-bold uppercase tracking-wider">
                    10 Preguntas de Evaluación
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-emerald-900 dark:text-emerald-300 max-w-md leading-relaxed font-serif italic">
                  Comprueba tu comprensión completando cada oración con la opción correcta según el contexto.
                </p>
              </div>
            }
          />
        </div>

        {/* Start Test Action Button */}
        <button
          type="button"
          onClick={handleStartTest}
          className="flex items-center gap-2.5 px-8 py-3.5 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white text-base font-bold shadow-xl hover:shadow-sky-500/25 transition-all hover:scale-105 active:scale-95 cursor-pointer"
        >
          <Play className="w-5 h-5 fill-current" />
          <span>Iniciar Test</span>
        </button>
      </div>
    );
  }

  /* =========================================================================
     CASE 2: RESULTS SUMMARY CARD
     ========================================================================= */
  if (testStep === totalQuestions + 1) {
    return (
      <div className="w-full flex flex-col items-center gap-6 animate-in fade-in duration-200 py-4">
        <div
          className={`w-full max-w-2xl rounded-2xl border p-6 sm:p-8 flex flex-col items-center text-center gap-5 shadow-xl ${
            isDark
              ? 'bg-slate-900 border-slate-800 text-white'
              : 'bg-white border-slate-200 text-slate-900'
          }`}
        >
          <span className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg">
            <Award className="w-8 h-8" />
          </span>

          <div className="flex flex-col gap-1">
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
              Test Completado
            </h3>
            <p className="text-xs sm:text-sm font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Adjectives 2
            </p>
          </div>

          {/* Score Badge */}
          <div className="px-6 py-3 rounded-2xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 flex items-center gap-3">
            <span className="text-3xl font-black font-mono text-sky-600 dark:text-sky-400">
              {score} / {totalQuestions}
            </span>
            <span className="text-xs sm:text-sm font-bold text-sky-900 dark:text-sky-200">
              ({Math.round((score / totalQuestions) * 100)}%)
            </span>
          </div>

          {/* Breakdown per question */}
          <div className="w-full flex flex-col gap-2.5 pt-2 max-h-96 overflow-y-auto pr-1">
            {ADJECTIVES_2_TESTS.map((t) => {
              const userAns = userAnswers[t.id];
              const isAnsCorrect = userAns === t.correctAnswer;

              return (
                <div
                  key={t.id}
                  className={`w-full p-3 rounded-xl border flex items-center justify-between text-left text-xs sm:text-sm ${
                    isAnsCorrect
                      ? isDark
                        ? 'bg-emerald-950/30 border-emerald-800 text-emerald-300'
                        : 'bg-emerald-50 border-emerald-200 text-emerald-900'
                      : isDark
                      ? 'bg-rose-950/30 border-rose-800 text-rose-300'
                      : 'bg-rose-50 border-rose-200 text-rose-900'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    {isAnsCorrect ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    ) : (
                      <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                    )}
                    <span className="font-bold shrink-0">Test {t.testNumber}:</span>
                    <span className="truncate">{t.fullSentenceEn}</span>
                  </div>
                  <span className="text-xs font-mono font-bold shrink-0 ml-2">
                    {t.correctAnswer}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Action buttons */}
          <div className="w-full pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={handleRestartTest}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs sm:text-sm font-bold shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reiniciar Test</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* =========================================================================
     CASE 3: INDIVIDUAL TEST QUESTIONS (1 to 10)
     ========================================================================= */
  if (!currentTest) return null;

  const currentSentenceWithSelection = `${currentTest.prefix}${
    currentSelectedOption || '_______'
  }${currentTest.suffix}`;

  return (
    <div className="w-full flex flex-col gap-5 animate-in fade-in duration-200">
      {/* 1. Reversible Instruction Card */}
      <ReversibleTextCard
        textEn={currentTest.instructions}
        textEs={currentTest.instructionsEs}
        speed={speed}
        accent={accent}
      />

      {/* 2. Main Question Container */}
      <div
        className={`w-full rounded-2xl border p-5 sm:p-7 shadow-lg flex flex-col gap-6 ${
          isDark
            ? 'bg-slate-900 border-slate-800 text-slate-100'
            : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Header with Test Step Indicator */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-sky-600 text-white font-mono font-bold flex items-center justify-center text-xs">
              {currentTest.testNumber}
            </span>
            <span className="text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Test {currentTest.testNumber} de {totalQuestions}
            </span>
          </div>

          <span className="text-xs font-mono text-slate-400">
            {Object.keys(userAnswers).length} de {totalQuestions} respondidas
          </span>
        </div>

        {/* Content: Left Photo & Right Question Card */}
        <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
          {/* Left: Context Image (pilot & sunglasses woman) */}
          <div className="w-full md:w-64 shrink-0 flex flex-col items-center">
            <div className="p-2 sm:p-3 bg-white dark:bg-slate-800 rounded-2xl shadow-md border border-slate-200 dark:border-slate-700 -rotate-1 hover:rotate-0 transition-transform duration-300">
              <img
                src={adjectives2ContextImg}
                alt="Context: Woman and pilot"
                className="w-full h-auto rounded-xl object-contain max-h-56"
              />
            </div>
          </div>

          {/* Right: Reversible Question Card with Dropdown */}
          <div className="flex-1 w-full perspective-1000 select-none">
            <div
              className={`relative w-full min-h-[140px] transition-transform duration-500 transform-style-3d rounded-xl border p-4 sm:p-5 ${
                isDark
                  ? 'bg-slate-800/40 border-slate-700'
                  : 'bg-slate-50 border-slate-200 shadow-xs'
              } ${isQuestionCardFlipped ? 'rotate-y-180' : ''}`}
            >
              {/* FRONT: English Sentence with Dropdown */}
              <div className="w-full h-full backface-hidden flex flex-col justify-between gap-4">
                <div className="flex flex-wrap items-center text-base sm:text-lg font-medium leading-relaxed">
                  <span>{currentTest.prefix}</span>

                  {/* Dropdown Selector */}
                  <div className="inline-block mx-1.5 my-1 relative align-middle">
                    <select
                      value={currentSelectedOption || ''}
                      disabled={isQuestionChecked}
                      onChange={(e) =>
                        handleSelectOption(currentTest.id, e.target.value)
                      }
                      className={`appearance-none text-sm sm:text-base font-bold pl-3 pr-8 py-1.5 rounded-xl border-2 transition-all cursor-pointer outline-hidden ${
                        currentSelectedOption
                          ? isQuestionChecked
                            ? isCorrect
                              ? 'border-emerald-500 bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                              : 'border-rose-500 bg-rose-500/15 text-rose-600 dark:text-rose-400'
                            : isDark
                            ? 'border-sky-500 bg-sky-950/40 text-sky-300'
                            : 'border-sky-500 bg-sky-50 text-sky-800'
                          : isDark
                          ? 'border-slate-600 bg-slate-900 text-slate-300'
                          : 'border-slate-300 bg-white text-slate-700 shadow-xs'
                      }`}
                    >
                      <option value="">Selecciona...</option>
                      {currentTest.options.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none opacity-60" />
                  </div>

                  <span>{currentTest.suffix}</span>
                </div>

                {/* Question Controls: Audio + Flip Card */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        handleSpeakQuestion(
                          currentSelectedOption
                            ? currentSentenceWithSelection
                            : currentTest.fullSentenceEn
                        )
                      }
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all cursor-pointer ${
                        isPlayingAudio
                          ? 'bg-sky-600 border-sky-600 text-white animate-pulse'
                          : isDark
                          ? 'bg-slate-800 border-slate-700 text-sky-400 hover:bg-slate-700'
                          : 'bg-white border-slate-300 text-sky-700 hover:bg-sky-50 shadow-xs'
                      }`}
                      title="Escuchar oración completa"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Audio</span>
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      playFeedbackSound('click');
                      setIsQuestionCardFlipped(true);
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all cursor-pointer ${
                      isDark
                        ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                        : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100 shadow-xs'
                    }`}
                    title="Ver traducción en español"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Ver traducción</span>
                  </button>
                </div>
              </div>

              {/* BACK: Spanish Translation */}
              <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 p-4 sm:p-5 flex flex-col justify-between gap-4 bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 rounded-xl">
                <div className="flex-1 flex items-center">
                  <p className="text-base sm:text-lg font-serif italic text-emerald-950 dark:text-emerald-300 leading-relaxed">
                    {currentTest.fullSentenceEs}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-emerald-200 dark:border-emerald-800/80">
                  <button
                    type="button"
                    onClick={() =>
                      handleSpeakQuestion(currentTest.fullSentenceEn)
                    }
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-emerald-300 dark:border-emerald-700 bg-white dark:bg-slate-800 text-xs font-medium text-emerald-800 dark:text-emerald-300 transition-all cursor-pointer hover:bg-emerald-50"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Escuchar inglés</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      playFeedbackSound('click');
                      setIsQuestionCardFlipped(false);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-emerald-300 dark:border-emerald-700 bg-emerald-100 dark:bg-emerald-900/50 text-xs font-bold text-emerald-800 dark:text-emerald-300 transition-all cursor-pointer hover:bg-emerald-200"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Volver al Test</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Question Footer & Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
          {/* Previous question button */}
          <button
            type="button"
            disabled={testStep <= 1}
            onClick={handlePrevTest}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl border text-xs sm:text-sm font-bold transition-all ${
              testStep > 1
                ? 'cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800'
                : 'opacity-40 cursor-not-allowed'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Anterior</span>
          </button>

          {/* Check / Next Question */}
          <div className="flex items-center gap-3">
            {!isQuestionChecked ? (
              <button
                type="button"
                disabled={!currentSelectedOption}
                onClick={handleCheckCurrent}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white shadow-md transition-all ${
                  currentSelectedOption
                    ? 'bg-sky-600 hover:bg-sky-500 hover:scale-102 active:scale-95 cursor-pointer'
                    : 'bg-slate-400 dark:bg-slate-700 opacity-60 cursor-not-allowed'
                }`}
              >
                <Check className="w-4 h-4" />
                <span>Comprobar</span>
              </button>
            ) : (
              <div className="flex items-center gap-3">
                <span
                  className={`text-xs sm:text-sm font-bold flex items-center gap-1.5 ${
                    isCorrect
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : 'text-rose-600 dark:text-rose-400'
                  }`}
                >
                  {isCorrect ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      Correcto
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4" />
                      Respuesta correcta: {currentTest.correctAnswer}
                    </>
                  )}
                </span>

                <button
                  type="button"
                  onClick={handleNextTest}
                  className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs sm:text-sm font-bold shadow-md transition-all cursor-pointer"
                >
                  <span>
                    {testStep === totalQuestions ? 'Ver Resultados' : 'Siguiente'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
