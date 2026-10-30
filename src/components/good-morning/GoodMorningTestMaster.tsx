import React, { useState } from 'react';
import {
  Play,
  Check,
  RotateCcw,
  Award,
  ArrowRight,
  ArrowLeft,
  Volume2,
  RefreshCw,
  CheckCircle2,
  XCircle,
  Sparkles,
} from 'lucide-react';
import {
  GOOD_MORNING_TESTS,
  GoodMorningTestQuestion,
} from '../../data/goodMorningData';
import { useTheme } from '../../context/ThemeContext';
import { playFeedbackSound, speakEnglish, stopSpeaking } from '../../utils/audio';
import { GoodMorningVideoPlayer } from './GoodMorningVideoPlayer';
import { ReversibleTextCard } from './ReversibleTextCard';

interface GoodMorningTestMasterProps {
  speed: number;
  accent?: 'US' | 'UK';
  onCompleteSection?: () => void;
}

export const GoodMorningTestMaster: React.FC<GoodMorningTestMasterProps> = ({
  speed,
  accent = 'US',
  onCompleteSection,
}) => {
  const { isDark } = useTheme();

  // testStep: 0 = "Iniciar Test" card; 1..5 = tests 1..5; 6 = Results card
  const [testStep, setTestStep] = useState<number>(0);

  // User answers map: { [testId]: optionId }
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});

  // Checked questions map: { [testId]: boolean }
  const [checkedQuestions, setCheckedQuestions] = useState<Record<string, boolean>>({});

  // Flipped options map: { [optionId]: boolean }
  const [flippedOptions, setFlippedOptions] = useState<Record<string, boolean>>({});

  const currentTestIndex = testStep - 1;
  const currentTest: GoodMorningTestQuestion | undefined =
    testStep >= 1 && testStep <= 5 ? GOOD_MORNING_TESTS[currentTestIndex] : undefined;

  const currentSelectedOptionId = currentTest ? userAnswers[currentTest.id] : undefined;
  const isQuestionChecked = currentTest ? Boolean(checkedQuestions[currentTest.id]) : false;

  const handleStartTest = () => {
    playFeedbackSound('click');
    setTestStep(1);
  };

  const handleSelectOption = (testId: string, optionId: string) => {
    if (checkedQuestions[testId]) return;
    playFeedbackSound('click');
    setUserAnswers((prev) => ({ ...prev, [testId]: optionId }));
  };

  const handleToggleOptionFlip = (optionId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    playFeedbackSound('click');
    setFlippedOptions((prev) => ({
      ...prev,
      [optionId]: !prev[optionId],
    }));
  };

  const handlePlayOptionAudio = (textEn: string, e: React.MouseEvent) => {
    e.stopPropagation();
    stopSpeaking();
    playFeedbackSound('click');
    speakEnglish(textEn, speed, accent);
  };

  const handleCheckCurrent = () => {
    if (!currentTest || !currentSelectedOptionId || isQuestionChecked) return;
    const correct = currentSelectedOptionId === currentTest.correctOptionId;
    playFeedbackSound(correct ? 'correct' : 'wrong');
    setCheckedQuestions((prev) => ({ ...prev, [currentTest.id]: true }));
  };

  const handleNextTest = () => {
    playFeedbackSound('click');
    if (testStep < 5) {
      setTestStep((prev) => prev + 1);
    } else {
      // Complete test
      setTestStep(6);
      playFeedbackSound('correct');
      if (onCompleteSection) {
        onCompleteSection();
      }
    }
  };

  const handlePrevTest = () => {
    playFeedbackSound('click');
    if (testStep > 1) {
      setTestStep((prev) => prev - 1);
    }
  };

  const handleRestartTest = () => {
    playFeedbackSound('click');
    setUserAnswers({});
    setCheckedQuestions({});
    setFlippedOptions({});
    setTestStep(0);
  };

  /* =========================================================================
     CASE 1: INICIAR TEST CARD (Step 0)
     ========================================================================= */
  if (testStep === 0) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-6 px-4 animate-in fade-in duration-300">
        <div
          className={`w-full max-w-2xl rounded-3xl border p-8 sm:p-10 text-center flex flex-col items-center gap-6 shadow-xl transition-all ${
            isDark
              ? 'bg-slate-900 border-slate-700 text-slate-100 shadow-slate-950/50'
              : 'bg-white border-slate-200 text-slate-900 shadow-slate-200/80'
          }`}
        >
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-sky-600 to-indigo-500 text-white flex items-center justify-center shadow-lg shadow-sky-500/30">
            <Award className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-mono font-bold tracking-widest text-sky-500 uppercase">
              Evaluación de Sección 1
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Test: Good Morning!
            </h2>
            <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-md mx-auto">
              Demuestra lo que has aprendido. Este test consta de 5 preguntas
              basadas en el video y la conversación matutina.
            </p>
          </div>

          <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className={`p-4 rounded-xl border text-center ${
              isDark ? 'bg-slate-800/60 border-slate-700' : 'bg-slate-50 border-slate-200'
            }`}>
              <span className="block text-xl font-bold text-sky-500 font-mono">5</span>
              <span className="text-xs text-slate-500 font-medium">Preguntas</span>
            </div>
            <div className={`p-4 rounded-xl border text-center ${
              isDark ? 'bg-slate-800/60 border-slate-700' : 'bg-slate-50 border-slate-200'
            }`}>
              <span className="block text-xl font-bold text-emerald-500 font-mono">100%</span>
              <span className="text-xs text-slate-500 font-medium">Con Video</span>
            </div>
            <div className={`p-4 rounded-xl border text-center ${
              isDark ? 'bg-slate-800/60 border-slate-700' : 'bg-slate-50 border-slate-200'
            }`}>
              <span className="block text-xl font-bold text-purple-500 font-mono">3D</span>
              <span className="text-xs text-slate-500 font-medium">Traducción Reversible</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleStartTest}
            className="w-full sm:w-auto min-w-[220px] px-8 py-3.5 rounded-xl font-bold text-base bg-sky-600 hover:bg-sky-500 text-white shadow-lg shadow-sky-600/30 transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Play className="w-5 h-5 fill-white" />
            <span>Iniciar Test</span>
          </button>
        </div>
      </div>
    );
  }

  /* =========================================================================
     CASE 2: TEST RESULTS / SUMMARY (Step 6)
     ========================================================================= */
  if (testStep === 6) {
    const totalQuestions = GOOD_MORNING_TESTS.length;
    let correctCount = 0;
    GOOD_MORNING_TESTS.forEach((test) => {
      if (userAnswers[test.id] === test.correctOptionId) {
        correctCount += 1;
      }
    });

    const scorePercent = Math.round((correctCount / totalQuestions) * 100);
    const isPerfect = correctCount === totalQuestions;

    return (
      <div className="w-full flex flex-col items-center justify-center py-6 px-4 animate-in fade-in duration-300">
        <div
          className={`w-full max-w-2xl rounded-3xl border p-8 sm:p-10 text-center flex flex-col items-center gap-6 shadow-xl ${
            isDark
              ? 'bg-slate-900 border-slate-700 text-slate-100 shadow-slate-950/50'
              : 'bg-white border-slate-200 text-slate-900 shadow-slate-200/80'
          }`}
        >
          <div
            className={`w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg ${
              isPerfect
                ? 'bg-gradient-to-tr from-amber-400 to-yellow-500 text-white shadow-amber-500/30'
                : scorePercent >= 60
                ? 'bg-gradient-to-tr from-emerald-500 to-teal-600 text-white shadow-emerald-500/30'
                : 'bg-gradient-to-tr from-rose-500 to-red-600 text-white shadow-rose-500/30'
            }`}
          >
            <Award className="w-10 h-10" />
          </div>

          <div className="space-y-1">
            <span className="text-xs font-mono font-bold tracking-widest text-sky-500 uppercase">
              Resultado Final
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {isPerfect
                ? '¡Excelente! Puntuación Perfecta'
                : scorePercent >= 60
                ? '¡Buen Trabajo!'
                : 'Sigue Practicando'}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Has completado el test de la sección &ldquo;Good Morning!&rdquo;.
            </p>
          </div>

          {/* Score Badge */}
          <div className="flex items-baseline gap-2">
            <span className="text-5xl sm:text-6xl font-black font-mono text-sky-600 dark:text-sky-400">
              {scorePercent}%
            </span>
            <span className="text-base sm:text-lg font-mono text-slate-400">
              ({correctCount} de {totalQuestions})
            </span>
          </div>

          {/* Breakdown List */}
          <div className="w-full flex flex-col gap-2.5 text-left pt-2">
            {GOOD_MORNING_TESTS.map((test) => {
              const userOptId = userAnswers[test.id];
              const isCorrect = userOptId === test.correctOptionId;
              const userOpt = test.options.find((o) => o.id === userOptId);
              const correctOpt = test.options.find((o) => o.id === test.correctOptionId);

              return (
                <div
                  key={test.id}
                  className={`p-3.5 rounded-xl border flex items-start justify-between gap-3 ${
                    isCorrect
                      ? 'border-emerald-300 dark:border-emerald-800 bg-emerald-50/60 dark:bg-emerald-950/20'
                      : 'border-rose-300 dark:border-rose-800 bg-rose-50/60 dark:bg-rose-950/20'
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-slate-500">
                        Test {test.testNumber}:
                      </span>
                      <p className="text-xs sm:text-sm font-semibold truncate">
                        {test.questionEn}
                      </p>
                    </div>
                    <div className="mt-1 text-xs space-y-0.5">
                      <p className="text-slate-600 dark:text-slate-300">
                        Tu respuesta:{' '}
                        <span className={isCorrect ? 'text-emerald-600 dark:text-emerald-400 font-bold' : 'text-rose-600 dark:text-rose-400 font-bold'}>
                          {userOpt?.textEn || 'Sin responder'}
                        </span>
                      </p>
                      {!isCorrect && (
                        <p className="text-emerald-600 dark:text-emerald-400">
                          Respuesta correcta:{' '}
                          <span className="font-bold">{correctOpt?.textEn}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="shrink-0 pt-0.5">
                    {isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    ) : (
                      <XCircle className="w-5 h-5 text-rose-500" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <button
            type="button"
            onClick={handleRestartTest}
            className="px-6 py-3 rounded-xl font-bold text-sm border flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs hover:scale-105 active:scale-95 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border-slate-300 dark:border-slate-700"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reiniciar Test</span>
          </button>
        </div>
      </div>
    );
  }

  /* =========================================================================
     CASE 3: INDIVIDUAL TEST QUESTIONS (Test 1 de 5 ... Test 5 de 5)
     ========================================================================= */
  if (!currentTest) return null;

  const isCurrentCorrect = currentSelectedOptionId === currentTest.correctOptionId;

  return (
    <div className="w-full flex flex-col gap-5 animate-in fade-in duration-200">
      {/* 1. Instruction Card: Reversible */}
      <ReversibleTextCard
        textEn="Choose the correct answer."
        textEs="Elige la respuesta correcta."
        speed={speed}
        accent={accent}
      />

      {/* 2. Main Two-Column Layout (Video Player on left, Question & Options on right) */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Video Player without transcript */}
        <div className="lg:col-span-6 flex flex-col gap-3">
          <GoodMorningVideoPlayer
            speed={speed}
            accent={accent}
            showTranscript={false}
          />
        </div>

        {/* Right Column: Question + Options */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          {/* Header indicator */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-sky-600 text-white font-mono font-bold flex items-center justify-center text-xs">
                {currentTest.testNumber}
              </span>
              <span className="text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Test {currentTest.testNumber} de 5
              </span>
            </div>

            <span className="text-xs font-mono text-slate-400">
              {Object.keys(userAnswers).length} de 5 respondidas
            </span>
          </div>

          {/* Question Card: Reversible */}
          <ReversibleTextCard
            textEn={currentTest.questionEn}
            textEs={currentTest.questionEs}
            speed={speed}
            accent={accent}
            minHeightClass="min-h-[70px]"
            className="shadow-xs"
          />

          {/* Options with radio buttons */}
          <div className="flex flex-col gap-2.5">
            {currentTest.options.map((opt) => {
              const isSelected = currentSelectedOptionId === opt.id;
              const isOptCorrect = opt.id === currentTest.correctOptionId;
              const isFlipped = Boolean(flippedOptions[opt.id]);

              return (
                <div
                  key={opt.id}
                  onClick={() => handleSelectOption(currentTest.id, opt.id)}
                  className={`p-3.5 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isQuestionChecked
                      ? isOptCorrect
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-200'
                        : isSelected
                        ? 'border-rose-500 bg-rose-50 dark:bg-rose-950/30 text-rose-900 dark:text-rose-200'
                        : isDark
                        ? 'bg-slate-900/60 border-slate-800 text-slate-400 opacity-60'
                        : 'bg-slate-50 border-slate-200 text-slate-400 opacity-60'
                      : isSelected
                      ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/40 text-sky-900 dark:text-sky-100 shadow-sm'
                      : isDark
                      ? 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-200'
                      : 'bg-white border-slate-200 hover:border-slate-300 text-slate-800 shadow-xs'
                  }`}
                >
                  {/* Radio circle + text */}
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                        isSelected
                          ? isQuestionChecked
                            ? isOptCorrect
                              ? 'border-emerald-500 bg-emerald-500'
                              : 'border-rose-500 bg-rose-500'
                            : 'border-sky-500 bg-sky-500'
                          : 'border-slate-400 dark:border-slate-600 bg-transparent'
                      }`}
                    >
                      {isSelected && (
                        <div className="w-2 h-2 rounded-full bg-white" />
                      )}
                    </div>

                    <span className="text-sm sm:text-base font-medium leading-relaxed truncate">
                      {isFlipped ? (
                        <span className="italic text-emerald-700 dark:text-emerald-300">
                          {opt.textEs}
                        </span>
                      ) : (
                        opt.textEn
                      )}
                    </span>
                  </div>

                  {/* Buttons: Flip + Audio */}
                  <div className="shrink-0 flex items-center gap-1">
                    <button
                      type="button"
                      onClick={(e) => handleToggleOptionFlip(opt.id, e)}
                      className="p-1.5 rounded-lg border border-transparent hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
                      title="Ver traducción en español"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => handlePlayOptionAudio(opt.textEn, e)}
                      className="p-1.5 rounded-lg border border-transparent hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-sky-500 hover:text-sky-600 transition-colors"
                      title="Escuchar audio"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Question Controls & Navigation */}
          <div className="w-full flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={handlePrevTest}
              disabled={testStep <= 1}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold border transition-all cursor-pointer ${
                testStep <= 1
                  ? 'opacity-40 cursor-not-allowed border-transparent text-slate-400'
                  : isDark
                  ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'
                  : 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Anterior</span>
            </button>

            {!isQuestionChecked ? (
              <button
                type="button"
                onClick={handleCheckCurrent}
                disabled={!currentSelectedOptionId}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold shadow-md transition-all cursor-pointer ${
                  !currentSelectedOptionId
                    ? 'opacity-50 cursor-not-allowed bg-slate-300 dark:bg-slate-700 text-slate-500'
                    : 'bg-sky-600 hover:bg-sky-500 text-white shadow-sky-600/30 hover:scale-105 active:scale-95'
                }`}
              >
                <Check className="w-4 h-4" />
                <span>Comprobar</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNextTest}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold bg-sky-600 hover:bg-sky-500 text-white shadow-md shadow-sky-600/30 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>{testStep === 5 ? 'Ver Resultados' : 'Siguiente'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
