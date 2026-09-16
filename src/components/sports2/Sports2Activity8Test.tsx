import React, { useState } from 'react';
import {
  Volume2,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Award,
  Play,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useTheme } from '../../context/ThemeContext';
import { SPORTS2_TESTS, SportsTestItem } from '../../data/peopleCrazyAboutSportsData';
import { Sports2StoryCard } from './Sports2StoryCard';
import { speakEnglish, stopSpeaking, playFeedbackSound } from '../../utils/audio';
import { SpeedSelectorButton } from '../SpeedSelectorButton';

interface Sports2Activity8TestProps {
  speechRate?: number;
  accent?: 'US' | 'UK';
  onSuccess?: () => void;
}

export const Sports2Activity8Test: React.FC<Sports2Activity8TestProps> = ({
  speechRate = 1.0,
  accent = 'US',
  onSuccess,
}) => {
  const { isDark } = useTheme();

  // Test start state: starts on initial "Comenzar Test" card (matching Section 1 Activity 6)
  const [isTestStarted, setIsTestStarted] = useState(false);
  const [isStartCardFlipped, setIsStartCardFlipped] = useState(false);

  // Current test index: 0 to 4 (Test 1, Test 2, Test 3, Test 4, Test 5)
  const [currentTestIdx, setCurrentTestIdx] = useState(0);

  // Answers: { [testId]: selectedAnswerText }
  const [answers, setAnswers] = useState<Record<string, string>>({});
  // Selected option for drag/drop slot placement
  const [selectedForSlot, setSelectedForSlot] = useState<string | null>(null);

  // Card flips
  const [isInstructionFlipped, setIsInstructionFlipped] = useState(false);
  const [isQuestionCardFlipped, setIsQuestionCardFlipped] = useState(false);

  // Per-test verification states: { [testId]: boolean }
  const [verifiedTests, setVerifiedTests] = useState<Record<string, boolean>>({});

  // Summary submission state
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentRate, setCurrentRate] = useState<number>(speechRate);

  const currentTest = SPORTS2_TESTS[currentTestIdx];

  const handlePlayInstruction = (e: React.MouseEvent) => {
    e.stopPropagation();
    stopSpeaking();
    speakEnglish(
      currentTest.instructionEn,
      currentRate,
      accent === 'UK' ? 'UK' : 'US',
      () => {},
      () => {},
      'male'
    );
  };

  const handlePlayQuestion = (e: React.MouseEvent) => {
    e.stopPropagation();
    stopSpeaking();
    const textToSpeak =
      currentTest.type === 'drag-blank'
        ? `${currentTest.sentenceBeforeEn} blank ${currentTest.sentenceAfterEn || ''}`
        : currentTest.sentenceBeforeEn;

    speakEnglish(
      textToSpeak,
      currentRate,
      accent === 'UK' ? 'UK' : 'US',
      () => {},
      () => {},
      'female'
    );
  };

  const handlePlayOption = (text: string, e: React.MouseEvent) => {
    e.stopPropagation();
    stopSpeaking();
    speakEnglish(
      text,
      currentRate,
      accent === 'UK' ? 'UK' : 'US',
      () => {},
      () => {},
      'male'
    );
  };

  // Radio selection (Test 2 & Test 4)
  const handleSelectRadio = (answerText: string) => {
    if (verifiedTests[currentTest.id]) return;
    playFeedbackSound('click');
    setAnswers((prev) => ({ ...prev, [currentTest.id]: answerText }));
  };

  // Slot placement (Test 1, Test 3, Test 5)
  const handleOptionClickForSlot = (answerText: string) => {
    if (verifiedTests[currentTest.id]) return;
    playFeedbackSound('click');
    setAnswers((prev) => ({ ...prev, [currentTest.id]: answerText }));
    setSelectedForSlot(null);
  };

  const handleSlotClick = () => {
    if (verifiedTests[currentTest.id]) return;
    if (selectedForSlot) {
      setAnswers((prev) => ({ ...prev, [currentTest.id]: selectedForSlot }));
      setSelectedForSlot(null);
      playFeedbackSound('click');
    } else if (answers[currentTest.id]) {
      // Clear placed item
      setAnswers((prev) => {
        const updated = { ...prev };
        delete updated[currentTest.id];
        return updated;
      });
      playFeedbackSound('click');
    }
  };

  // Check current test question
  const handleVerifyCurrentTest = () => {
    const selectedAnswer = answers[currentTest.id];
    if (!selectedAnswer) return;

    const isCorrect = selectedAnswer === currentTest.correctAnswerEn;

    setVerifiedTests((prev) => ({ ...prev, [currentTest.id]: true }));

    if (isCorrect) {
      playFeedbackSound('correct');
    } else {
      playFeedbackSound('wrong');
    }

    // If on last test and all answered, submit
    const allAnswered = SPORTS2_TESTS.every((t) => answers[t.id]);
    if (currentTestIdx === SPORTS2_TESTS.length - 1 && allAnswered) {
      setIsSubmitted(true);
      confetti({
        particleCount: 70,
        spread: 70,
        origin: { y: 0.6 },
      });
      if (onSuccess) onSuccess();
    }
  };

  const handleClearCurrentTest = () => {
    playFeedbackSound('click');
    setAnswers((prev) => {
      const updated = { ...prev };
      delete updated[currentTest.id];
      return updated;
    });
    setVerifiedTests((prev) => {
      const updated = { ...prev };
      delete updated[currentTest.id];
      return updated;
    });
    setSelectedForSlot(null);
  };

  // Reset entire test
  const handleResetEntireTest = () => {
    playFeedbackSound('click');
    setAnswers({});
    setVerifiedTests({});
    setSelectedForSlot(null);
    setIsSubmitted(false);
    setCurrentTestIdx(0);
    setIsTestStarted(false);
    setIsStartCardFlipped(false);
    setIsInstructionFlipped(false);
    setIsQuestionCardFlipped(false);
  };

  // Score calculation
  const totalCorrect = SPORTS2_TESTS.filter(
    (t) => answers[t.id] === t.correctAnswerEn
  ).length;
  const scorePercentage = Math.round(
    (totalCorrect / SPORTS2_TESTS.length) * 100
  );

  // START SCREEN CARD (Matching Section 1 Activity 6 / Unit 3 Activity 10)
  if (!isTestStarted) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-6">
        <div
          id="sports2-test-start-card"
          onClick={() => {
            playFeedbackSound('flip');
            setIsStartCardFlipped((prev) => !prev);
          }}
          className="w-full max-w-xl perspective-1000 cursor-pointer select-none"
        >
          <div
            className={`grid grid-cols-1 grid-rows-1 transition-transform duration-500 transform-style-3d ${
              isStartCardFlipped ? 'rotate-y-180' : ''
            }`}
          >
            {/* Front: English */}
            <div
              className={`col-start-1 row-start-1 backface-hidden w-full rounded-2xl sm:rounded-3xl border p-6 sm:p-10 shadow-sm flex flex-col items-center text-center ${
                isDark
                  ? 'bg-slate-900 border-slate-800 text-slate-100'
                  : 'bg-white border-slate-200 text-slate-900'
              }`}
            >
              <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-500 border border-amber-500/20 flex items-center justify-center mb-6">
                <Award className="w-8 h-8" />
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">
                Evaluation Test
              </h2>
              <p className="text-sm sm:text-base text-sky-600 dark:text-sky-400 font-medium mb-3">
                People Are Crazy About Sports
              </p>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mb-8 leading-relaxed">
                Test your understanding of the reading story with 5 sequential questions: reading comprehension, true/false statements, and cloze sentences.
              </p>

              <button
                type="button"
                id="sports2-comenzar-test-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  playFeedbackSound('click');
                  setIsTestStarted(true);
                }}
                className="px-8 py-3 rounded-xl font-semibold text-white bg-sky-500 hover:bg-sky-600 shadow-md transition-all flex items-center gap-2.5 active:scale-95 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Comenzar Test</span>
              </button>
            </div>

            {/* Back: Spanish */}
            <div
              className={`col-start-1 row-start-1 backface-hidden rotate-y-180 w-full rounded-2xl sm:rounded-3xl border p-6 sm:p-10 shadow-sm flex flex-col items-center text-center ${
                isDark
                  ? 'bg-slate-900 border-slate-800 text-slate-100'
                  : 'bg-white border-slate-200 text-slate-900'
              }`}
            >
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center justify-center mb-6">
                <Award className="w-8 h-8" />
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-emerald-600 dark:text-emerald-400 mb-2">
                Test de Evaluación
              </h2>
              <p className="text-sm sm:text-base text-emerald-600/80 dark:text-emerald-400/80 font-medium mb-3 italic">
                La gente está loca por los deportes
              </p>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mb-8 leading-relaxed italic">
                Evalúa tu comprensión de la lectura con 5 preguntas secuenciales: comprensión lectora, oraciones de verdadero/falso y completar espacios.
              </p>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  playFeedbackSound('click');
                  setIsTestStarted(true);
                }}
                className="px-8 py-3 rounded-xl font-semibold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md transition-all flex items-center gap-2.5 active:scale-95 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Comenzar Test</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ACTIVE TEST VIEW (5 Tests)
  const isCurrentVerified = !!verifiedTests[currentTest.id];
  const isCurrentCorrect = answers[currentTest.id] === currentTest.correctAnswerEn;

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Test Pills Navigation: Test 1, Test 2, Test 3, Test 4, Test 5 */}
      <div className="flex items-center justify-between flex-wrap gap-3 pb-1 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2 overflow-x-auto py-1">
          {SPORTS2_TESTS.map((t, idx) => {
            const isVerified = verifiedTests[t.id];
            const isCorrect = answers[t.id] === t.correctAnswerEn;
            const isCurrent = idx === currentTestIdx;

            return (
              <button
                key={t.id}
                type="button"
                onClick={() => {
                  playFeedbackSound('click');
                  setCurrentTestIdx(idx);
                  setIsInstructionFlipped(false);
                  setIsQuestionCardFlipped(false);
                }}
                className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                  isCurrent
                    ? 'bg-sky-500 text-white shadow-xs'
                    : isVerified
                    ? isCorrect
                      ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                      : 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30'
                    : answers[t.id]
                    ? isDark
                      ? 'bg-slate-800 text-slate-200'
                      : 'bg-stone-100 text-slate-700'
                    : isDark
                    ? 'text-slate-400 hover:text-slate-200'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <span>Test {idx + 1}</span>
                {isVerified && isCorrect && (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                )}
                {isVerified && !isCorrect && (
                  <XCircle className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Global Test Reset Button */}
        <button
          type="button"
          onClick={handleResetEntireTest}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium border flex items-center gap-1.5 transition-all cursor-pointer ${
            isDark
              ? 'border-slate-700 hover:bg-slate-800 text-slate-300'
              : 'border-slate-200 hover:bg-stone-50 text-slate-600'
          }`}
          title="Reiniciar Test completo"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reiniciar Test</span>
        </button>
      </div>

      {/* 2-Column Layout: Story on left, Test question on right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Reading Story */}
        <div className="lg:col-span-6 w-full">
          <Sports2StoryCard
            accent={accent}
            speechRate={speechRate}
            compact={true}
          />
        </div>

        {/* Right: Sub-test question */}
        <div className="lg:col-span-6 w-full flex flex-col gap-4">
          {/* Reversible Instruction Header */}
          <div
            onClick={() => {
              playFeedbackSound('flip');
              setIsInstructionFlipped((prev) => !prev);
            }}
            className="w-full perspective-1000 cursor-pointer select-none"
          >
            <div
              className={`grid grid-cols-1 grid-rows-1 transition-transform duration-500 transform-style-3d ${
                isInstructionFlipped ? 'rotate-y-180' : ''
              }`}
            >
              {/* Front: English */}
              <div
                className={`col-start-1 row-start-1 backface-hidden w-full p-3.5 sm:p-4 rounded-xl border flex items-center justify-between shadow-xs ${
                  isDark
                    ? 'bg-slate-900 border-slate-800 text-slate-100'
                    : 'bg-white border-slate-200 text-slate-900'
                }`}
              >
                <div className="pr-2">
                  <h3 className="text-sm sm:text-base font-semibold text-sky-600 dark:text-sky-400">
                    {currentTest.instructionEn}
                  </h3>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <SpeedSelectorButton
                    currentRate={currentRate}
                    onRateChange={(r) => setCurrentRate(r)}
                    size="sm"
                  />
                  <button
                    type="button"
                    onClick={handlePlayInstruction}
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-xs ${
                      isDark
                        ? 'bg-slate-800 hover:bg-slate-700 text-sky-400 border border-slate-700'
                        : 'bg-stone-50 hover:bg-stone-100 text-sky-600 border border-stone-200'
                    }`}
                    aria-label="Speaker"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Back: Spanish */}
              <div
                className={`col-start-1 row-start-1 backface-hidden rotate-y-180 w-full p-3.5 sm:p-4 rounded-xl border flex items-center justify-between shadow-xs ${
                  isDark
                    ? 'bg-slate-900 border-slate-800 text-slate-100'
                    : 'bg-white border-slate-200 text-slate-900'
                }`}
              >
                <h3 className="text-sm sm:text-base font-semibold text-emerald-600 dark:text-emerald-400 italic">
                  {currentTest.instructionEs}
                </h3>
              </div>
            </div>
          </div>

          {/* Reversible Question & Options Card */}
          <div
            onClick={() => {
              playFeedbackSound('flip');
              setIsQuestionCardFlipped((prev) => !prev);
            }}
            className="w-full perspective-1000 cursor-pointer select-none"
          >
            <div
              className={`grid grid-cols-1 grid-rows-1 transition-transform duration-500 transform-style-3d ${
                isQuestionCardFlipped ? 'rotate-y-180' : ''
              }`}
            >
              {/* Front: English */}
              <div
                className={`col-start-1 row-start-1 backface-hidden w-full rounded-2xl border p-5 sm:p-6 shadow-xs flex flex-col relative ${
                  isDark
                    ? 'bg-slate-900 border-slate-800 text-slate-100'
                    : 'bg-white border-slate-200 text-slate-900'
                }`}
              >
                {/* Audio controls for question */}
                <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePlayQuestion}
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-xs ${
                      isDark
                        ? 'bg-slate-800 hover:bg-slate-700 text-sky-400 border border-slate-700'
                        : 'bg-stone-50 hover:bg-stone-100 text-sky-600 border border-stone-200'
                    }`}
                    aria-label="Speaker"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Question / Sentence Content */}
                <div className="pr-14 mb-5">
                  {currentTest.type === 'drag-blank' ? (
                    <div className="text-base sm:text-lg font-medium leading-relaxed">
                      <span>{currentTest.sentenceBeforeEn}</span>
                      {/* Blank drop slot */}
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSlotClick();
                        }}
                        className={`inline-flex items-center justify-center min-w-36 h-9 mx-1.5 px-3 rounded-lg border-2 border-dashed align-middle transition-all cursor-pointer ${
                          answers[currentTest.id]
                            ? isCurrentVerified
                              ? isCurrentCorrect
                                ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-semibold border-solid'
                                : 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 font-semibold border-solid'
                              : 'border-sky-500 bg-sky-50/70 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300 font-semibold border-solid'
                            : isDark
                            ? 'border-slate-600 bg-slate-800/40 text-slate-400 hover:border-sky-400'
                            : 'border-slate-300 bg-stone-50 text-slate-400 hover:border-sky-400'
                        }`}
                      >
                        {answers[currentTest.id] || '____________'}
                      </span>
                      <span>{currentTest.sentenceAfterEn}</span>
                    </div>
                  ) : (
                    <h4 className="text-base sm:text-lg font-medium text-slate-900 dark:text-white leading-snug">
                      {currentTest.sentenceBeforeEn}
                    </h4>
                  )}
                </div>

                {/* Options Section */}
                <div
                  className={
                    currentTest.type === 'drag-blank'
                      ? 'grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 border-t border-slate-100 dark:border-slate-800'
                      : 'space-y-2.5 pt-2 border-t border-slate-100 dark:border-slate-800'
                  }
                >
                  {currentTest.options.map((opt) => {
                    const isSelected = answers[currentTest.id] === opt.textEn;
                    const isOptCorrect = opt.textEn === currentTest.correctAnswerEn;

                    if (currentTest.type === 'drag-blank') {
                      return (
                        <div
                          key={opt.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOptionClickForSlot(opt.textEn);
                          }}
                          className={`p-3 rounded-xl border text-sm font-medium transition-all flex items-center justify-between gap-2 cursor-pointer ${
                            isSelected
                              ? 'border-sky-500 bg-sky-500 text-white shadow-xs'
                              : isDark
                              ? 'bg-slate-800/80 border-slate-700 hover:border-sky-500/50 text-slate-200'
                              : 'bg-stone-50 border-slate-200 hover:border-sky-400 text-slate-800'
                          }`}
                        >
                          <span className="leading-snug">{opt.textEn}</span>
                          <button
                            type="button"
                            onClick={(e) => handlePlayOption(opt.textEn, e)}
                            className={`p-1 rounded-full transition-colors shrink-0 ${
                              isSelected
                                ? 'text-white/80 hover:text-white'
                                : 'text-slate-400 hover:text-sky-500'
                            }`}
                            aria-label="Speaker"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      );
                    }

                    // Radio choice layout (Test 2 & Test 4)
                    let radioStyle = isDark
                      ? 'bg-slate-800/60 border-slate-700 hover:border-slate-600 text-slate-200'
                      : 'bg-stone-50/80 border-slate-200 hover:border-slate-300 text-slate-800';

                    if (isSelected) {
                      radioStyle = isDark
                        ? 'bg-sky-950/40 border-sky-500 text-sky-200 ring-2 ring-sky-500/20'
                        : 'bg-sky-50 border-sky-400 text-sky-900 ring-2 ring-sky-200';
                    }

                    if (isCurrentVerified) {
                      if (isOptCorrect) {
                        radioStyle = isDark
                          ? 'bg-emerald-950/40 border-emerald-500 text-emerald-200 font-medium ring-2 ring-emerald-500/20'
                          : 'bg-emerald-50 border-emerald-500 text-emerald-900 font-medium ring-2 ring-emerald-200';
                      } else if (isSelected && !isCurrentCorrect) {
                        radioStyle = isDark
                          ? 'bg-rose-950/40 border-rose-500 text-rose-200 ring-2 ring-rose-500/20'
                          : 'bg-rose-50 border-rose-400 text-rose-900 ring-2 ring-rose-200';
                      }
                    }

                    return (
                      <div
                        key={opt.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectRadio(opt.textEn);
                        }}
                        className={`w-full p-3 sm:p-3.5 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${radioStyle}`}
                      >
                        <div className="flex items-center gap-3 pr-2">
                          <div
                            className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                              isSelected
                                ? 'border-sky-500 bg-sky-500'
                                : isDark
                                ? 'border-slate-600'
                                : 'border-slate-300'
                            }`}
                          >
                            {isSelected && (
                              <div className="w-1.5 h-1.5 rounded-full bg-white" />
                            )}
                          </div>
                          <span className="text-sm sm:text-base leading-snug">
                            {opt.textEn}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            type="button"
                            onClick={(e) => handlePlayOption(opt.textEn, e)}
                            className="p-1 rounded-full text-slate-400 hover:text-sky-500 transition-colors"
                            aria-label="Speaker"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                          {isCurrentVerified && isOptCorrect && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                          )}
                          {isCurrentVerified && isSelected && !isCurrentCorrect && (
                            <XCircle className="w-4 h-4 text-rose-500" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Back: Spanish Translation */}
              <div
                className={`col-start-1 row-start-1 backface-hidden rotate-y-180 w-full rounded-2xl border p-5 sm:p-6 shadow-xs flex flex-col relative ${
                  isDark
                    ? 'bg-slate-900 border-slate-800 text-slate-100'
                    : 'bg-white border-slate-200 text-slate-900'
                }`}
              >
                <div className="pr-4 mb-5">
                  {currentTest.type === 'drag-blank' ? (
                    <div className="text-base sm:text-lg font-medium leading-relaxed italic text-emerald-600 dark:text-emerald-400">
                      <span>{currentTest.sentenceBeforeEs}</span>
                      <span className="inline-block border-b-2 border-emerald-500 px-2 min-w-28 text-center not-italic">
                        {answers[currentTest.id]
                          ? currentTest.options.find(
                              (o) => o.textEn === answers[currentTest.id]
                            )?.textEs || answers[currentTest.id]
                          : '____________'}
                      </span>
                      <span>{currentTest.sentenceAfterEs}</span>
                    </div>
                  ) : (
                    <h4 className="text-base sm:text-lg font-medium text-emerald-600 dark:text-emerald-400 leading-snug italic">
                      {currentTest.sentenceBeforeEs}
                    </h4>
                  )}
                </div>

                {/* Options in Spanish */}
                <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                  {currentTest.options.map((opt) => (
                    <div
                      key={opt.id}
                      className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-700 dark:text-slate-300 italic"
                    >
                      <span className="font-semibold not-italic text-emerald-600 dark:text-emerald-400 mr-2">
                        {opt.textEn}:
                      </span>
                      {opt.textEs}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Test Question Bottom Action Buttons */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={currentTestIdx === 0}
                onClick={() => {
                  playFeedbackSound('click');
                  setCurrentTestIdx((prev) => Math.max(0, prev - 1));
                  setIsInstructionFlipped(false);
                  setIsQuestionCardFlipped(false);
                }}
                className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-medium border flex items-center gap-1.5 transition-all cursor-pointer ${
                  currentTestIdx === 0
                    ? 'opacity-30 cursor-not-allowed border-slate-200 dark:border-slate-800 text-slate-400'
                    : isDark
                    ? 'border-slate-700 hover:bg-slate-800 text-slate-200'
                    : 'border-slate-200 hover:bg-stone-50 text-slate-700'
                }`}
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Anterior</span>
              </button>

              <button
                type="button"
                disabled={currentTestIdx === SPORTS2_TESTS.length - 1}
                onClick={() => {
                  playFeedbackSound('click');
                  setCurrentTestIdx((prev) =>
                    Math.min(SPORTS2_TESTS.length - 1, prev + 1)
                  );
                  setIsInstructionFlipped(false);
                  setIsQuestionCardFlipped(false);
                }}
                className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-medium border flex items-center gap-1.5 transition-all cursor-pointer ${
                  currentTestIdx === SPORTS2_TESTS.length - 1
                    ? 'opacity-30 cursor-not-allowed border-slate-200 dark:border-slate-800 text-slate-400'
                    : isDark
                    ? 'border-slate-700 hover:bg-slate-800 text-slate-200'
                    : 'border-slate-200 hover:bg-stone-50 text-slate-700'
                }`}
              >
                <span>Siguiente</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleClearCurrentTest}
                disabled={!answers[currentTest.id]}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium border flex items-center gap-1.5 transition-all cursor-pointer ${
                  !answers[currentTest.id]
                    ? 'opacity-40 cursor-not-allowed border-slate-200 dark:border-slate-800 text-slate-400'
                    : isDark
                    ? 'border-slate-700 hover:bg-slate-800 text-slate-200'
                    : 'border-slate-200 hover:bg-stone-50 text-slate-700'
                }`}
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Clear</span>
              </button>

              <button
                type="button"
                onClick={handleVerifyCurrentTest}
                disabled={!answers[currentTest.id] || isCurrentVerified}
                className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all shadow-xs cursor-pointer ${
                  !answers[currentTest.id] || isCurrentVerified
                    ? 'opacity-50 cursor-not-allowed bg-slate-300 dark:bg-slate-800 text-slate-500'
                    : 'bg-sky-500 hover:bg-sky-600 text-white active:scale-95'
                }`}
              >
                <span>Check</span>
              </button>
            </div>
          </div>

          {/* Test Completed Final Summary Banner */}
          {isSubmitted && (
            <div
              className={`p-5 rounded-2xl border mt-2 flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in duration-300 ${
                scorePercentage >= 80
                  ? isDark
                    ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
                    : 'bg-emerald-50 border-emerald-300 text-emerald-900'
                  : isDark
                  ? 'bg-amber-950/40 border-amber-500/50 text-amber-200'
                  : 'bg-amber-50 border-amber-300 text-amber-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-amber-500 shrink-0" />
                <div>
                  <h4 className="text-base font-bold">
                    Test completado: {totalCorrect} de {SPORTS2_TESTS.length}{' '}
                    correctas ({scorePercentage}%)
                  </h4>
                  <p className="text-xs sm:text-sm opacity-90">
                    {scorePercentage >= 80
                      ? '¡Excelente trabajo! Has demostrado una comprensión sólida de la lectura.'
                      : 'Buen esfuerzo. Puedes repasar la lectura y volver a intentar el test.'}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleResetEntireTest}
                className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold border border-current hover:bg-white/10 transition-all flex items-center gap-2 shrink-0 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reiniciar Test</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
