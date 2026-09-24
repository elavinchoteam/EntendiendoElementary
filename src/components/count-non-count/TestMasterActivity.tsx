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
  Sparkles,
} from 'lucide-react';
import {
  COUNT_NON_COUNT_TESTS,
  CountNonCountTestItem,
  DragDropOption,
} from '../../data/countNonCountData';
import { speakEnglish, stopSpeaking, playFeedbackSound } from '../../utils/audio';
import { useTheme } from '../../context/ThemeContext';
import { ReversibleTextCard } from './ReversibleTextCard';

interface TestMasterActivityProps {
  speed: number;
  onSpeedChange: (speed: number) => void;
  accent?: 'US' | 'UK';
  onCompleteSection?: () => void;
}

export const TestMasterActivity: React.FC<TestMasterActivityProps> = ({
  speed,
  accent = 'US',
  onCompleteSection,
}) => {
  const { isDark } = useTheme();

  // testStep: 0 = "Iniciar Test" card; 1..5 = tests 1..5; 6 = Results card
  const [testStep, setTestStep] = useState<number>(0);

  // User answers map: { [testId]: optionId }
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  // Is test submitted
  const [isSubmitted, setIsSubmitted] = useState(false);

  const currentTestIndex = testStep - 1;
  const currentTest: CountNonCountTestItem | undefined =
    testStep >= 1 && testStep <= 5 ? COUNT_NON_COUNT_TESTS[currentTestIndex] : undefined;

  const handleStartTest = () => {
    playFeedbackSound('click');
    setTestStep(1);
  };

  const handleSelectOption = (testId: string, optionId: string) => {
    if (isSubmitted) return;
    playFeedbackSound('click');
    setUserAnswers((prev) => ({ ...prev, [testId]: optionId }));
  };

  const handleNextTest = () => {
    playFeedbackSound('click');
    if (testStep < 5) {
      setTestStep((prev) => prev + 1);
    } else {
      // Submit test
      setIsSubmitted(true);
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
    setIsSubmitted(false);
    setTestStep(0);
  };

  // Calculate score
  const score = COUNT_NON_COUNT_TESTS.reduce((acc, t) => {
    return userAnswers[t.id] === t.correctAnswerId ? acc + 1 : acc;
  }, 0);

  /* CASE 1: LANDING CARD "INICIAR TEST" (Exact pattern from Section 5 Be-Past Statements) */
  if (testStep === 0) {
    return (
      <div className="w-full flex flex-col items-center gap-6 animate-in fade-in duration-200 py-4">
        {/* Reversible "Iniciar Test" Card */}
        <div className="w-full max-w-2xl">
          <ReversibleTextCard
            textEn="Unit Test: Nouns: Count and Non-Count\nThis test contains 5 questions. Press Start Test to begin."
            textEs="Test de la Unidad: Sustantivos contables e incontables\nEste test contiene 5 preguntas. Presiona Iniciar Test para comenzar."
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
                    Test: Nouns: Count and Non-Count
                  </h3>
                  <span className="text-xs sm:text-sm font-mono text-sky-600 dark:text-sky-400 font-bold uppercase tracking-wider">
                    5 Test Questions
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md leading-relaxed">
                  Test your understanding of countable and uncountable nouns. Check your answers at the end.
                </p>
              </div>
            }
            childrenBack={
              <div className="w-full flex flex-col items-center justify-center text-center p-4 gap-3">
                <span className="w-12 h-12 rounded-2xl bg-sky-600 text-white flex items-center justify-center shadow-md">
                  <Award className="w-6 h-6" />
                </span>
                <div className="flex flex-col gap-1">
                  <h3 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                    Test: Sustantivos contables e incontables
                  </h3>
                  <span className="text-xs sm:text-sm font-mono text-sky-600 dark:text-sky-400 font-bold uppercase tracking-wider">
                    5 Preguntas de Examen
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-sky-900 dark:text-sky-200 max-w-md leading-relaxed font-serif italic">
                  Pon a prueba tu conocimiento sobre sustantivos contables e incontables. Consulta tus resultados al finalizar.
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

  /* CASE 2: RESULTS SUMMARY CARD */
  if (testStep === 6) {
    return (
      <div className="w-full flex flex-col items-center gap-6 animate-in fade-in duration-200 py-4">
        <div
          className={`w-full max-w-2xl rounded-2xl border p-6 sm:p-8 flex flex-col items-center text-center gap-5 shadow-xl ${
            isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}
        >
          <span className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg">
            <Award className="w-8 h-8" />
          </span>

          <div className="flex flex-col gap-1">
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight">Test Completado</h3>
            <p className="text-xs sm:text-sm font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Nouns: Count and Non-Count
            </p>
          </div>

          {/* Score Badge */}
          <div className="px-6 py-3 rounded-2xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 flex items-center gap-3">
            <span className="text-3xl font-black font-mono text-sky-600 dark:text-sky-400">
              {score} / 5
            </span>
            <span className="text-xs sm:text-sm font-bold text-sky-900 dark:text-sky-200">
              ({Math.round((score / 5) * 100)}%)
            </span>
          </div>

          {/* Breakdown per question */}
          <div className="w-full flex flex-col gap-2.5 pt-2">
            {COUNT_NON_COUNT_TESTS.map((t) => {
              const userOptId = userAnswers[t.id];
              const isCorrect = userOptId === t.correctAnswerId;
              const correctOpt = t.options.find((o) => o.id === t.correctAnswerId);
              return (
                <div
                  key={t.id}
                  className={`w-full p-3 rounded-xl border flex items-center justify-between text-left text-xs sm:text-sm ${
                    isCorrect
                      ? isDark
                        ? 'bg-emerald-950/30 border-emerald-800 text-emerald-300'
                        : 'bg-emerald-50 border-emerald-200 text-emerald-900'
                      : isDark
                      ? 'bg-rose-950/30 border-rose-800 text-rose-300'
                      : 'bg-rose-50 border-rose-200 text-rose-900'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {isCorrect ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    ) : (
                      <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                    )}
                    <span className="font-bold">Test {t.testNumber}:</span>
                    <span className="font-semibold">{correctOpt?.text}</span>
                  </div>
                  <span className="text-xs opacity-75 font-mono">
                    {isCorrect ? 'Correcto' : 'Incorrecto'}
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

  /* CASE 3: INDIVIDUAL TEST QUESTIONS (Test 1 de 5, Test 2 de 5, ..., Test 5 de 5) */
  if (!currentTest) return null;

  const currentSelectedOptionId = userAnswers[currentTest.id];
  const selectedOpt = currentTest.options.find((o) => o.id === currentSelectedOptionId);

  const fullTextEn = currentTest.dialogueLines
    .map((l) => {
      if (l.hasBlank) {
        return `${l.prefix || ''}${selectedOpt ? selectedOpt.text : '________'}${l.suffix || ''}`;
      }
      return l.textEn;
    })
    .join('\n');

  const fullTextEs = currentTest.dialogueLines.map((l) => l.textEs).join('\n');

  return (
    <div className="w-full flex flex-col gap-5 animate-in fade-in duration-200">
      {/* 1. Reversible Instruction Card (No gradients, Speaker button only, No flip text) */}
      <ReversibleTextCard
        textEn={currentTest.instructions}
        textEs={currentTest.instructionsEs}
        speed={speed}
        accent={accent}
        className="shadow-sm"
      />

      {/* 2. Main Question Card Container */}
      <div
        className={`w-full rounded-2xl border p-5 sm:p-7 flex flex-col gap-6 shadow-lg transition-colors ${
          isDark ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Header with Test Step Indicator */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
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

        {/* Reversible Sentence / Dialogue Card with the Blank */}
        <ReversibleTextCard
          textEn={fullTextEn}
          textEs={fullTextEs}
          speed={speed}
          accent={accent}
          minHeightClass="min-h-[140px]"
          childrenFront={
            <div className="w-full flex flex-col gap-2.5 py-1">
              {currentTest.dialogueLines.map((line, idx) => {
                if (line.hasBlank) {
                  return (
                    <div
                      key={idx}
                      className="flex flex-wrap items-center gap-1.5 text-sm sm:text-base leading-relaxed"
                    >
                      {line.prefix && <span>{line.prefix}</span>}

                      {/* Drop / Selected Slot */}
                      <div
                        className={`inline-flex items-center justify-center min-w-[130px] h-8 sm:h-9 px-3 rounded-lg border-2 border-dashed transition-all ${
                          selectedOpt
                            ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/40 text-sky-900 dark:text-sky-200 font-bold'
                            : 'border-slate-300 dark:border-slate-600 bg-slate-100/60 dark:bg-slate-800/60'
                        }`}
                      >
                        {selectedOpt ? (
                          <span className="font-semibold">{selectedOpt.text}</span>
                        ) : (
                          <span className="text-xs text-slate-400 font-mono select-none">
                            [ Selecciona ]
                          </span>
                        )}
                      </div>

                      {line.suffix && <span>{line.suffix}</span>}
                    </div>
                  );
                }
                return (
                  <p key={idx} className="text-sm sm:text-base leading-relaxed">
                    {line.textEn}
                  </p>
                );
              })}
            </div>
          }
          childrenBack={
            <div className="w-full flex flex-col gap-2.5 py-1">
              {currentTest.dialogueLines.map((line, idx) => (
                <p
                  key={idx}
                  className="text-sm sm:text-base leading-relaxed font-serif italic text-sky-900 dark:text-sky-300"
                >
                  {line.textEs}
                </p>
              ))}
            </div>
          }
        />

        {/* Options */}
        <div className="flex flex-col gap-2.5">
          <div className="flex flex-wrap items-center gap-3">
            {currentTest.options.map((opt: DragDropOption) => {
              const isSelected = currentSelectedOptionId === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleSelectOption(currentTest.id, opt.id)}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border transition-all cursor-pointer select-none active:scale-95 ${
                    isSelected
                      ? 'bg-sky-600 text-white border-sky-600 shadow-md ring-2 ring-sky-400'
                      : isDark
                      ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                      : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-300 shadow-xs'
                  }`}
                >
                  {opt.text}
                </button>
              );
            })}
          </div>
        </div>

        {/* Navigation between Test Questions */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <button
            type="button"
            onClick={handlePrevTest}
            disabled={testStep <= 1}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors cursor-pointer ${
              testStep <= 1
                ? 'opacity-40 cursor-not-allowed border-transparent'
                : isDark
                ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300 shadow-xs'
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Anterior</span>
          </button>

          {/* Question Step Pills */}
          <div className="flex items-center gap-1.5">
            {COUNT_NON_COUNT_TESTS.map((t, idx) => {
              const stepNum = idx + 1;
              const isAnswered = Boolean(userAnswers[t.id]);
              const isCurrent = stepNum === testStep;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => {
                    playFeedbackSound('click');
                    setTestStep(stepNum);
                  }}
                  className={`w-7 h-7 rounded-lg text-xs font-mono font-bold flex items-center justify-center transition-all cursor-pointer ${
                    isCurrent
                      ? 'bg-sky-600 text-white ring-2 ring-sky-400'
                      : isAnswered
                      ? isDark
                        ? 'bg-emerald-950/70 text-emerald-400 border border-emerald-800'
                        : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : isDark
                      ? 'bg-slate-800 text-slate-400 border border-slate-700'
                      : 'bg-slate-100 text-slate-600 border border-slate-200'
                  }`}
                  title={`Ir al Test ${stepNum}`}
                >
                  {stepNum}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={handleNextTest}
            disabled={!currentSelectedOptionId}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md cursor-pointer ${
              currentSelectedOptionId
                ? 'bg-sky-600 hover:bg-sky-500 text-white active:scale-95'
                : 'bg-slate-300 dark:bg-slate-800 text-slate-500 dark:text-slate-600 cursor-not-allowed shadow-none'
            }`}
          >
            <span>{testStep === 5 ? 'Finalizar' : 'Siguiente'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
