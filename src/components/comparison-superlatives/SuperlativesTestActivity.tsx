import React, { useState, useEffect } from 'react';
import {
  Volume2,
  CheckCircle2,
  XCircle,
  Award,
  RotateCcw,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Check,
  Play,
} from 'lucide-react';
import { ComparisonTestData } from '../../data/comparisonSuperlativesData';
import { SuperlativesMediaPlayerCard } from './SuperlativesMediaPlayerCard';
import { SuperlativesReversibleCard } from './SuperlativesReversibleCard';
import { speakEnglish, stopSpeaking, playFeedbackSound } from '../../utils/audio';
import { useTheme } from '../../context/ThemeContext';

export interface SuperlativesTestActivityProps {
  tests: ComparisonTestData[];
  accent?: 'US' | 'UK';
  speechRate?: number;
  onSuccess?: () => void;
}

export const SuperlativesTestActivity: React.FC<SuperlativesTestActivityProps> = ({
  tests,
  accent = 'US',
  speechRate = 1.0,
  onSuccess,
}) => {
  const { isDark } = useTheme();

  // Test start state: starts on initial "Comenzar Test" card (like Section 5 Be-Past: Statements of Unit 1)
  const [isTestStarted, setIsTestStarted] = useState<boolean>(false);
  const [isStartCardFlipped, setIsStartCardFlipped] = useState<boolean>(false);
  const [isSpeakingIntro, setIsSpeakingIntro] = useState<boolean>(false);

  const [activeTestIdx, setActiveTestIdx] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [submittedAnswers, setSubmittedAnswers] = useState<Record<string, boolean>>({});
  const [isTestCompleted, setIsTestCompleted] = useState<boolean>(false);

  const [isDragOver, setIsDragOver] = useState(false);
  const [isDialogueFlipped, setIsDialogueFlipped] = useState(false);
  const [isDialoguePlaying, setIsDialoguePlaying] = useState(false);

  const currentTest = tests[activeTestIdx];
  const placedOptionId = currentTest ? selectedAnswers[currentTest.id] : null;
  const isChecked = currentTest ? submittedAnswers[currentTest.id] : false;
  const isCorrect = currentTest && isChecked && placedOptionId === currentTest.correctAnswerId;

  // Reset dialogue flip & audio when changing question
  useEffect(() => {
    setIsDialogueFlipped(false);
    setIsDialoguePlaying(false);
    setIsDragOver(false);
    stopSpeaking();
  }, [activeTestIdx]);

  const placedOption = currentTest?.options.find((o) => o.id === placedOptionId);

  const handleDragStart = (e: React.DragEvent, optionId: string) => {
    e.dataTransfer.setData('text/plain', optionId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (!currentTest || isChecked) return;
    const optionId = e.dataTransfer.getData('text/plain');
    if (optionId && currentTest.options.some((o) => o.id === optionId)) {
      setSelectedAnswers((prev) => ({ ...prev, [currentTest.id]: optionId }));
      playFeedbackSound('click');
    }
  };

  const handleOptionClick = (optionId: string) => {
    if (!currentTest || isChecked) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentTest.id]: prev[currentTest.id] === optionId ? '' : optionId,
    }));
    playFeedbackSound('click');
  };

  const handleRemovePlaced = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!currentTest || isChecked) return;
    setSelectedAnswers((prev) => ({ ...prev, [currentTest.id]: '' }));
    playFeedbackSound('click');
  };

  const handleCheck = () => {
    if (!currentTest || !placedOptionId) return;
    setSubmittedAnswers((prev) => ({ ...prev, [currentTest.id]: true }));

    const correct = placedOptionId === currentTest.correctAnswerId;
    if (correct) {
      playFeedbackSound('correct');
    } else {
      playFeedbackSound('wrong');
    }

    // Check if this was the last test to complete
    const newSubmitted = { ...submittedAnswers, [currentTest.id]: true };
    const allAnswered = tests.every((t) => newSubmitted[t.id]);
    if (allAnswered && activeTestIdx === tests.length - 1) {
      setTimeout(() => {
        setIsTestCompleted(true);
        if (onSuccess) onSuccess();
      }, 1200);
    }
  };

  const handleSpeakDialogue = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!currentTest) return;
    if (isDialoguePlaying) {
      stopSpeaking();
      setIsDialoguePlaying(false);
      return;
    }
    stopSpeaking();
    setIsDialoguePlaying(true);
    speakEnglish(
      currentTest.audioPrompt,
      speechRate,
      accent as 'US' | 'UK',
      () => setIsDialoguePlaying(true),
      () => setIsDialoguePlaying(false)
    );
  };

  const handleSpeakStartCard = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSpeakingIntro) {
      stopSpeaking();
      setIsSpeakingIntro(false);
      return;
    }
    stopSpeaking();
    setIsSpeakingIntro(true);
    speakEnglish(
      'Final Test: Comparison of Adjectives: Superlatives. Five interactive questions to evaluate your understanding of superlative adjectives. Click Start Test to begin.',
      speechRate,
      accent as 'US' | 'UK',
      () => setIsSpeakingIntro(true),
      () => setIsSpeakingIntro(false)
    );
  };

  const handleStartTest = () => {
    stopSpeaking();
    playFeedbackSound('click');
    setIsTestStarted(true);
    setActiveTestIdx(0);
  };

  const handlePrevTest = () => {
    if (activeTestIdx > 0) {
      playFeedbackSound('click');
      setActiveTestIdx((prev) => prev - 1);
    }
  };

  const handleNextTest = () => {
    if (activeTestIdx < tests.length - 1) {
      playFeedbackSound('click');
      setActiveTestIdx((prev) => prev + 1);
    }
  };

  const handleResetCurrentTest = () => {
    if (!currentTest) return;
    setSelectedAnswers((prev) => ({ ...prev, [currentTest.id]: '' }));
    setSubmittedAnswers((prev) => ({ ...prev, [currentTest.id]: false }));
    playFeedbackSound('click');
  };

  const handleResetEntireTest = () => {
    setSelectedAnswers({});
    setSubmittedAnswers({});
    setIsTestCompleted(false);
    setActiveTestIdx(0);
    setIsTestStarted(false);
    setIsStartCardFlipped(false);
    playFeedbackSound('click');
  };

  const correctCount = tests.filter(
    (t) => submittedAnswers[t.id] && selectedAnswers[t.id] === t.correctAnswerId
  ).length;

  /* CASE 1: LANDING CARD "COMENZAR TEST" (Like Section 5 Be-Past: Statements of Unit 1) */
  if (!isTestStarted) {
    return (
      <div className="w-full max-w-4xl mx-auto py-6 px-2 flex flex-col items-center justify-center animate-in fade-in duration-300">
        <div className="w-full perspective-1000">
          <div
            role="button"
            tabIndex={0}
            onClick={() => setIsStartCardFlipped((prev) => !prev)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setIsStartCardFlipped((prev) => !prev);
              }
            }}
            className={`grid grid-cols-1 grid-rows-1 w-full min-h-[300px] rounded-3xl transition-transform duration-500 transform-style-3d cursor-pointer shadow-xl select-none ${
              isStartCardFlipped ? 'rotate-y-180' : ''
            }`}
          >
            {/* FRONT (English) - Clean Solid Background, NO Gradients */}
            <div
              className={`col-start-1 row-start-1 backface-hidden w-full min-h-[300px] rounded-3xl p-6 sm:p-8 flex flex-col justify-between border ${
                isDark
                  ? 'bg-slate-900 border-slate-700 text-white'
                  : 'bg-white border-slate-200 text-slate-900'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-500">
                      Actividad 12 · Test Final
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight mt-0.5">
                      Comparison of Adjectives: Superlatives
                    </h3>
                  </div>
                </div>

                {/* Audio speaker button only */}
                <button
                  type="button"
                  onClick={handleSpeakStartCard}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                    isSpeakingIntro
                      ? 'bg-indigo-600 text-white border-indigo-500 ring-2 ring-indigo-400'
                      : isDark
                      ? 'bg-slate-800 hover:bg-slate-700 text-indigo-400 border-slate-700'
                      : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border-indigo-200'
                  }`}
                  aria-label="Audio"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>

              <div className="my-6">
                <p className="text-base sm:text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                  This final test contains{' '}
                  <span className="font-bold text-indigo-600 dark:text-indigo-400">
                    5 interactive questions
                  </span>{' '}
                  (Test 1 to Test 5) in sequential order. You will test your
                  understanding of superlative adjectives including{' '}
                  <span className="font-semibold">the -est</span>,{' '}
                  <span className="font-semibold">the most</span>,{' '}
                  <span className="font-semibold">the least</span>, and irregular
                  superlatives (<span className="font-semibold">the best</span>,{' '}
                  <span className="font-semibold">the worst</span>,{' '}
                  <span className="font-semibold">the latest</span>).
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                    5 Preguntas
                  </span>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleStartTest();
                  }}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-mono font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Start Test</span>
                </button>
              </div>
            </div>

            {/* BACK (Spanish Translation) - Clean Solid Background, NO Gradients */}
            <div
              className={`col-start-1 row-start-1 backface-hidden rotate-y-180 w-full min-h-[300px] rounded-3xl p-6 sm:p-8 flex flex-col justify-between border ${
                isDark
                  ? 'bg-slate-900 border-slate-700 text-slate-100'
                  : 'bg-white border-slate-200 text-slate-800'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-500">
                      Actividad 12 · Test Final
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight mt-0.5">
                      Comparación de Adjetivos: Superlativos
                    </h3>
                  </div>
                </div>

                {/* Audio speaker button only */}
                <button
                  type="button"
                  onClick={handleSpeakStartCard}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                    isSpeakingIntro
                      ? 'bg-indigo-600 text-white border-indigo-500 ring-2 ring-indigo-400'
                      : isDark
                      ? 'bg-slate-800 hover:bg-slate-700 text-indigo-400 border-slate-700'
                      : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border-indigo-200'
                  }`}
                  aria-label="Audio"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>

              <div className="my-6">
                <p className="text-base sm:text-lg leading-relaxed italic text-slate-700 dark:text-slate-300">
                  Este test final contiene{' '}
                  <span className="font-bold text-indigo-600 dark:text-indigo-400">
                    5 preguntas interactivas
                  </span>{' '}
                  (Test 1 a Test 5) en orden secuencial. Evaluarás tu
                  comprensión de adjetivos superlativos incluyendo{' '}
                  <span className="font-semibold">the -est</span>,{' '}
                  <span className="font-semibold">the most</span>,{' '}
                  <span className="font-semibold">the least</span> y superlativos
                  irregulares (<span className="font-semibold">the best</span>,{' '}
                  <span className="font-semibold">the worst</span>,{' '}
                  <span className="font-semibold">the latest</span>).
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                    5 Preguntas
                  </span>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleStartTest();
                  }}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-mono font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Comenzar Test</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* CASE 2: TEST COMPLETED CONGRATULATIONS VIEW */
  if (isTestCompleted) {
    const isPerfect = correctCount === tests.length;
    return (
      <div className="w-full max-w-xl mx-auto py-10 px-4 text-center flex flex-col items-center justify-center animate-in zoom-in-95 duration-300">
        <div className="w-20 h-20 rounded-3xl bg-indigo-600 text-white flex items-center justify-center mb-6 shadow-xl">
          <Award className="w-10 h-10" />
        </div>

        <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 mb-3">
          Test Final Completado
        </span>

        <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
          {isPerfect ? '¡Excelente Trabajo!' : '¡Test Finalizado!'}
        </h3>

        <p className="text-base text-slate-600 dark:text-slate-300 mt-2 max-w-md">
          Has completado los 5 test de la Sección 6: Comparison of Adjectives:
          Superlatives.
        </p>

        {/* Score Badge */}
        <div className="my-6 px-6 py-4 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-center justify-center gap-4">
          <div className="text-center">
            <span className="block text-3xl font-black font-mono text-indigo-600 dark:text-indigo-400">
              {correctCount} / {tests.length}
            </span>
            <span className="text-xs uppercase tracking-wider text-slate-500 font-mono">
              Puntaje Obtenido
            </span>
          </div>
          {isPerfect && (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold border border-emerald-500/30">
              <Sparkles className="w-3.5 h-3.5" /> 100%
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={handleResetEntireTest}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-mono text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Repetir Test</span>
        </button>
      </div>
    );
  }

  /* CASE 3: ACTIVE TEST VIEW (Test 1 through Test 5 in strict order) */
  return (
    <div className="w-full flex flex-col gap-5 animate-in fade-in duration-200">
      {/* Test Stepper Header (Test 1, Test 2, Test 3, Test 4, Test 5) */}
      <div className="w-full flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2">
          {tests.map((t, idx) => {
            const isSub = submittedAnswers[t.id];
            const isCorr = isSub && selectedAnswers[t.id] === t.correctAnswerId;
            const isCurrent = activeTestIdx === idx;

            return (
              <button
                key={t.id}
                type="button"
                onClick={() => {
                  playFeedbackSound('click');
                  setActiveTestIdx(idx);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-indigo-600 text-white shadow-sm ring-2 ring-indigo-300'
                    : isSub
                    ? isCorr
                      ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                      : 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30'
                    : isDark
                    ? 'bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span>Test {t.testNumber}</span>
                {isSub && <span>{isCorr ? '✓' : '✗'}</span>}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={handlePrevTest}
            disabled={activeTestIdx === 0}
            className="p-2 rounded-xl border disabled:opacity-30 transition-colors cursor-pointer"
            aria-label="Previous test"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-xs font-mono font-bold text-slate-500 px-1">
            {activeTestIdx + 1} / {tests.length}
          </span>
          <button
            type="button"
            onClick={handleNextTest}
            disabled={activeTestIdx === tests.length - 1}
            className="p-2 rounded-xl border disabled:opacity-30 transition-colors cursor-pointer"
            aria-label="Next test"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 1. Reversible Instruction Card ("Drag the correct answer/s into place.") */}
      <SuperlativesReversibleCard
        id={`test-instruction-card-${currentTest.id}`}
        textEn={currentTest.instructions}
        textEs={currentTest.instructionsEs}
        speechRate={speechRate}
        accent={accent}
        minHeightClass="min-h-[64px]"
      />

      {/* 2. Main 2-Column Grid */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (5 cols): Media Player + Reference Dialogue Card */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <SuperlativesMediaPlayerCard
            audioText={currentTest.referenceText}
            accent={accent}
            speechRate={speechRate}
            durationSeconds={7}
            imageUrl={currentTest.imageUrl}
          />

          <SuperlativesReversibleCard
            id={`test-reference-card-${currentTest.id}`}
            textEn={currentTest.referenceText}
            textEs={currentTest.referenceTextEs}
            highlights={currentTest.referenceHighlights}
            speechRate={speechRate}
            accent={accent}
            minHeightClass="min-h-[110px]"
          />
        </div>

        {/* Right Column (7 cols): Dialogue Card with Drop Slot + Options */}
        <div className="lg:col-span-7 flex flex-col gap-5">
          {/* Dialogue Interactive Reversible Card */}
          <div className="w-full perspective-1000">
            <div
              role="button"
              tabIndex={0}
              onClick={() => setIsDialogueFlipped((prev) => !prev)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setIsDialogueFlipped((prev) => !prev);
                }
              }}
              className={`grid grid-cols-1 grid-rows-1 w-full rounded-2xl transition-transform duration-500 transform-style-3d cursor-pointer shadow-md select-none ${
                isDialogueFlipped ? 'rotate-y-180' : ''
              }`}
            >
              {/* FRONT: English with blank target (Solid background, NO gradients) */}
              <div
                className={`col-start-1 row-start-1 backface-hidden w-full min-h-[160px] rounded-2xl p-5 flex flex-col justify-between border ${
                  isDark
                    ? 'bg-slate-900 border-slate-700 text-white'
                    : 'bg-white border-slate-200 text-slate-900'
                } ${
                  isChecked
                    ? isCorrect
                      ? 'ring-2 ring-emerald-500 border-emerald-500'
                      : 'ring-2 ring-rose-500 border-rose-500'
                    : ''
                }`}
              >
                <div className="space-y-3 pr-2">
                  {currentTest.dialogueLines.map((line, idx) => {
                    if (line.hasBlank) {
                      return (
                        <div
                          key={idx}
                          className="text-base sm:text-lg leading-relaxed flex flex-wrap items-baseline gap-1.5"
                        >
                          {line.prefix && <span>{line.prefix}</span>}

                          {/* Drop Slot */}
                          <span
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                            className={`inline-flex items-center min-w-[130px] sm:min-w-[160px] px-3 py-1 rounded-xl border-2 border-dashed font-semibold transition-all select-none ${
                              isDragOver
                                ? 'bg-indigo-500/20 border-indigo-400 scale-105'
                                : placedOption
                                ? isChecked
                                  ? isCorrect
                                    ? 'bg-emerald-500/15 border-emerald-500 text-emerald-600 dark:text-emerald-300 font-bold'
                                    : 'bg-rose-500/15 border-rose-500 text-rose-600 dark:text-rose-300 font-bold'
                                  : 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-400 text-indigo-700 dark:text-indigo-300 font-bold shadow-xs'
                                : isDark
                                ? 'bg-slate-800/80 border-slate-600 text-slate-400'
                                : 'bg-slate-100 border-slate-300 text-slate-400'
                            }`}
                          >
                            {placedOption ? (
                              <span className="flex items-center justify-between w-full gap-2">
                                <span>{placedOption.text}</span>
                                {!isChecked && (
                                  <button
                                    type="button"
                                    onClick={handleRemovePlaced}
                                    className="text-slate-400 hover:text-rose-500 text-xs px-1 cursor-pointer"
                                    title="Quitar"
                                  >
                                    ×
                                  </button>
                                )}
                              </span>
                            ) : (
                              <span className="text-xs uppercase tracking-wider font-mono mx-auto opacity-75">
                                [ respuesta ]
                              </span>
                            )}
                          </span>

                          {line.suffix && <span>{line.suffix}</span>}
                        </div>
                      );
                    }

                    return (
                      <p
                        key={idx}
                        className="text-base sm:text-lg leading-relaxed text-slate-700 dark:text-slate-200"
                      >
                        {line.textEn}
                      </p>
                    );
                  })}
                </div>

                {/* Footer with speaker button only */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800/80 mt-3">
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                    {isChecked ? (
                      isCorrect ? (
                        <span className="text-emerald-500 font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" /> Correcto
                        </span>
                      ) : (
                        <span className="text-rose-500 font-bold flex items-center gap-1">
                          <XCircle className="w-4 h-4" /> Inténtalo de nuevo
                        </span>
                      )
                    ) : null}
                  </div>

                  <button
                    type="button"
                    onClick={handleSpeakDialogue}
                    className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                      isDialoguePlaying
                        ? 'bg-indigo-600 text-white border-indigo-500 ring-2 ring-indigo-400'
                        : isDark
                        ? 'bg-slate-800 hover:bg-slate-700 text-indigo-400 border-slate-700'
                        : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border-indigo-200'
                    }`}
                    aria-label="Audio"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* BACK: Spanish Translation (Solid background, NO gradients) */}
              <div
                className={`col-start-1 row-start-1 backface-hidden rotate-y-180 w-full min-h-[160px] rounded-2xl p-5 flex flex-col justify-between border ${
                  isDark
                    ? 'bg-slate-900 border-slate-700 text-slate-100'
                    : 'bg-white border-slate-200 text-slate-800'
                }`}
              >
                <div className="space-y-3 pr-2 italic">
                  {currentTest.dialogueLines.map((line, idx) => (
                    <p key={idx} className="text-base sm:text-lg leading-relaxed">
                      {line.textEs}
                    </p>
                  ))}
                </div>

                <div className="flex items-center justify-end pt-3 border-t border-slate-100 dark:border-slate-800/80 mt-3">
                  <button
                    type="button"
                    onClick={handleSpeakDialogue}
                    className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                      isDialoguePlaying
                        ? 'bg-indigo-600 text-white border-indigo-500 ring-2 ring-indigo-400'
                        : isDark
                        ? 'bg-slate-800 hover:bg-slate-700 text-indigo-400 border-slate-700'
                        : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border-indigo-200'
                    }`}
                    aria-label="Audio"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Options */}
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Opciones
              </span>
              {placedOptionId && !isChecked && (
                <button
                  type="button"
                  onClick={handleRemovePlaced}
                  className="text-xs font-mono text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" /> Limpiar selección
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-2.5">
              {currentTest.options.map((opt) => {
                const isSelected = placedOptionId === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    draggable={!isChecked}
                    onDragStart={(e) => handleDragStart(e, opt.id)}
                    onClick={() => handleOptionClick(opt.id)}
                    className={`px-4 py-2 rounded-xl font-medium text-sm sm:text-base border transition-all cursor-pointer select-none ${
                      isSelected
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-md scale-102 ring-2 ring-indigo-300'
                        : isDark
                        ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700 hover:border-slate-600'
                        : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-300 hover:border-slate-400 shadow-xs'
                    }`}
                  >
                    {opt.text}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action Check Buttons & Explanation */}
          <div className="flex flex-col gap-3 pt-1">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleCheck}
                disabled={!placedOptionId || isChecked}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-bold text-sm uppercase tracking-wider transition-all cursor-pointer ${
                  !placedOptionId || isChecked
                    ? 'opacity-40 cursor-not-allowed bg-slate-300 dark:bg-slate-800 text-slate-500'
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md hover:shadow-lg'
                }`}
              >
                <Check className="w-4 h-4" />
                <span>Confirmar respuesta</span>
              </button>

              {isChecked && !isCorrect && (
                <button
                  type="button"
                  onClick={handleResetCurrentTest}
                  className="px-4 py-3 rounded-xl border font-bold text-sm font-mono uppercase tracking-wider text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Reintentar
                </button>
              )}
            </div>

            {/* Explanation box */}
            {isChecked && (
              <div
                className={`p-4 rounded-xl border text-sm transition-all ${
                  isCorrect
                    ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800/60 text-emerald-900 dark:text-emerald-200'
                    : 'bg-rose-50 dark:bg-rose-950/30 border-rose-300 dark:border-rose-800/60 text-rose-900 dark:text-rose-200'
                }`}
              >
                <p className="font-semibold">{currentTest.explanationEs}</p>
                <p className="mt-1 text-xs opacity-90 italic">
                  {currentTest.explanationEn}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
