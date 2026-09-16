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
import { useTheme } from '../../context/ThemeContext';
import {
  SPORTS_TEST_QUESTIONS,
  SportsTestQuestion,
} from '../../data/sports1Data';
import { SportsMediaCard } from './SportsMediaCard';
import { speakEnglish, playFeedbackSound } from '../../utils/audio';

interface SportsActivity6TestProps {
  currentRate: number;
  accent?: 'US' | 'UK';
  onSuccess?: () => void;
}

export const SportsActivity6Test: React.FC<SportsActivity6TestProps> = ({
  currentRate,
  accent = 'US',
  onSuccess,
}) => {
  const { isDark } = useTheme();

  // Test start state: starts on initial "Comenzar Test" card (like Activity 10 of Unit 3)
  const [isTestStarted, setIsTestStarted] = useState(false);
  const [isStartCardFlipped, setIsStartCardFlipped] = useState(false);

  // Current test index: 0 = Test 1, 1 = Test 2, 2 = Test 3, 3 = Test 4, 4 = Test 5
  const [currentTestIdx, setCurrentTestIdx] = useState(0);

  // User selections: { [questionId]: selectedOptionId }
  const [answers, setAnswers] = useState<Record<string, string>>({});
  // Selected option for drag/drop slot placement in Test 4
  const [selectedForSlot, setSelectedForSlot] = useState<string | null>(null);

  // Card flips
  const [isInstructionFlipped, setIsInstructionFlipped] = useState(false);
  const [isQuestionCardFlipped, setIsQuestionCardFlipped] = useState(false);

  // Per-test verification states: { [questionId]: boolean }
  const [verifiedTests, setVerifiedTests] = useState<Record<string, boolean>>({});

  // Summary submission state
  const [isSubmitted, setIsSubmitted] = useState(false);

  const currentQ = SPORTS_TEST_QUESTIONS[currentTestIdx];

  const handlePlayInstruction = (e: React.MouseEvent) => {
    e.stopPropagation();
    speakEnglish(currentQ.instructionsEn, currentRate, accent === 'UK' ? 'UK' : 'US');
  };

  const handlePlayQuestion = (e: React.MouseEvent) => {
    e.stopPropagation();
    speakEnglish(currentQ.question, currentRate, accent === 'UK' ? 'UK' : 'US');
  };

  const handlePlayOption = (text: string, e: React.MouseEvent) => {
    e.stopPropagation();
    speakEnglish(text, currentRate, accent === 'UK' ? 'UK' : 'US');
  };

  // Radio selection
  const handleSelectRadio = (optId: string) => {
    if (verifiedTests[currentQ.id]) return;
    playFeedbackSound('click');
    setAnswers((prev) => ({ ...prev, [currentQ.id]: optId }));
  };

  // Slot placement for Test 4 (drag drop style)
  const handleSlotClick = () => {
    if (verifiedTests[currentQ.id]) return;
    if (selectedForSlot) {
      setAnswers((prev) => ({ ...prev, [currentQ.id]: selectedForSlot }));
      setSelectedForSlot(null);
      playFeedbackSound('click');
    } else if (answers[currentQ.id]) {
      // Clear placed item
      setAnswers((prev) => {
        const updated = { ...prev };
        delete updated[currentQ.id];
        return updated;
      });
      playFeedbackSound('click');
    }
  };

  // Check single test question
  const handleVerifyCurrentTest = () => {
    const selectedOptId = answers[currentQ.id];
    if (!selectedOptId) return;

    const correctOpt = currentQ.options.find((o) => o.isCorrect);
    const isCorrect = selectedOptId === correctOpt?.id;

    setVerifiedTests((prev) => ({ ...prev, [currentQ.id]: true }));

    if (isCorrect) {
      playFeedbackSound('correct');
    } else {
      playFeedbackSound('wrong');
    }

    // If on last test and all answered, offer final submit
    const allAnswered = SPORTS_TEST_QUESTIONS.every((q) => answers[q.id]);
    if (currentTestIdx === SPORTS_TEST_QUESTIONS.length - 1 && allAnswered) {
      setIsSubmitted(true);
      if (onSuccess) onSuccess();
    }
  };

  // Reset current question
  const handleResetCurrent = () => {
    setAnswers((prev) => {
      const updated = { ...prev };
      delete updated[currentQ.id];
      return updated;
    });
    setVerifiedTests((prev) => {
      const updated = { ...prev };
      delete updated[currentQ.id];
      return updated;
    });
    setSelectedForSlot(null);
  };

  // Reset entire test back to beginning
  const handleResetEntireTest = () => {
    setAnswers({});
    setVerifiedTests({});
    setSelectedForSlot(null);
    setCurrentTestIdx(0);
    setIsSubmitted(false);
    setIsQuestionCardFlipped(false);
    setIsTestStarted(false);
    setIsStartCardFlipped(false);
    playFeedbackSound('click');
  };

  // Calculate score
  const score = SPORTS_TEST_QUESTIONS.reduce((acc, q) => {
    const userOptId = answers[q.id];
    const correctOpt = q.options.find((o) => o.isCorrect);
    return userOptId === correctOpt?.id ? acc + 1 : acc;
  }, 0);

  const selectedOptId = answers[currentQ.id];
  const isVerified = verifiedTests[currentQ.id];
  const correctOpt = currentQ.options.find((o) => o.isCorrect);
  const isCurrentCorrect = isVerified && selectedOptId === correctOpt?.id;
  const isCurrentWrong = isVerified && selectedOptId !== correctOpt?.id;

  // INITIAL VIEW: Reversible "Comenzar Test" card (identical format to Activity 10 of Unit 3)
  if (!isTestStarted) {
    return (
      <div className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center py-4">
        <div className="w-full perspective-1000">
          <div
            id="start-sports-test-card"
            onClick={() => {
              playFeedbackSound('flip');
              setIsStartCardFlipped((prev) => !prev);
            }}
            className={`relative w-full min-h-[380px] sm:min-h-[420px] rounded-3xl transition-transform duration-700 transform-style-3d cursor-pointer shadow-xl select-none ${
              isStartCardFlipped ? 'rotate-y-180' : ''
            }`}
          >
            {/* FRONT: ENGLISH */}
            <div
              className={`absolute inset-0 w-full h-full rounded-3xl p-6 sm:p-8 flex flex-col justify-between border backface-hidden shadow-xl transition-colors duration-200 overflow-hidden ${
                isDark
                  ? 'bg-slate-900 border-sky-500/30 text-white'
                  : 'bg-white border-sky-200 text-slate-900 shadow-md'
              }`}
            >
              {/* Header */}
              <div className="flex items-center justify-between gap-3 pb-3 border-b border-inherit/40 shrink-0">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                      isDark
                        ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                        : 'bg-sky-100 text-sky-800 border border-sky-200'
                    }`}
                  >
                    <Award className="w-3.5 h-3.5" />
                    Unit Test · {SPORTS_TEST_QUESTIONS.length} Tests
                  </span>
                </div>

                {/* Speaker pronunciation icon button (Speaker icon only, no text) */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    speakEnglish(
                      "Sports Mastery Test. Test your comprehension of Jack Hill's sports report on baseball, soccer, cycling, Olympics, and tennis. Answer all 5 tests.",
                      currentRate,
                      accent === 'UK' ? 'UK' : 'US'
                    );
                  }}
                  className={`p-2 rounded-xl border transition-all cursor-pointer ${
                    isDark
                      ? 'bg-slate-800/80 hover:bg-slate-700 text-sky-300 border-white/10'
                      : 'bg-white hover:bg-sky-50 text-sky-700 border-slate-200 shadow-xs'
                  }`}
                  aria-label="Audio"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              {/* Body */}
              <div className="flex-1 my-4 flex flex-col justify-center items-center text-center px-2">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-sky-600/10 dark:bg-sky-500/20 border border-sky-500/30 flex items-center justify-center text-sky-600 dark:text-sky-400 mb-4 shadow-inner">
                  <Award className="w-8 h-8 sm:w-9 sm:h-9" />
                </div>

                <h3 className="text-xl sm:text-2xl font-bold tracking-tight mb-2">
                  Sports · Mastery Test
                </h3>

                <p className="text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300 max-w-lg mb-4">
                  Test your comprehension of Jack Hill's radio sports report on baseball, soccer, cycling, the Children's Olympics, and tennis. This test contains {SPORTS_TEST_QUESTIONS.length} sequential assessments: Test 1 to Test 5.
                </p>

                <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> {SPORTS_TEST_QUESTIONS.length} Tests
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <Play className="w-4 h-4 text-sky-500" /> Authentic Radio Report
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-500" /> Instant Feedback
                  </span>
                </div>
              </div>

              {/* Footer with "Start Test" button */}
              <div className="pt-4 border-t border-inherit/30 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
                <span className="text-xs text-slate-400 dark:text-slate-500">
                  Press Start Test to begin Test 1
                </span>

                <button
                  type="button"
                  id="start-sports-test-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    playFeedbackSound('click');
                    setIsTestStarted(true);
                  }}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-base shadow-lg shadow-sky-600/30 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Play className="w-5 h-5 fill-current" />
                  <span>Start Test</span>
                </button>
              </div>
            </div>

            {/* BACK: ESPAÑOL */}
            <div
              className={`absolute inset-0 w-full h-full rounded-3xl p-6 sm:p-8 flex flex-col justify-between border backface-hidden rotate-y-180 shadow-xl transition-colors duration-200 overflow-hidden ${
                isDark
                  ? 'bg-slate-900 border-emerald-500/40 text-white'
                  : 'bg-white border-emerald-300 text-slate-900 shadow-md'
              }`}
            >
              {/* Header Back */}
              <div className="flex items-center justify-between gap-3 pb-3 border-b border-inherit/40 shrink-0">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                      isDark
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                    }`}
                  >
                    <Award className="w-3.5 h-3.5" />
                    Evaluación de la Unidad · {SPORTS_TEST_QUESTIONS.length} Tests
                  </span>
                </div>

                {/* Speaker pronunciation icon button (Speaker icon only, no text) */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    speakEnglish(
                      "Sports Mastery Test. Test your comprehension of Jack Hill's sports report on the radio. Answer all 5 tests.",
                      currentRate,
                      accent === 'UK' ? 'UK' : 'US'
                    );
                  }}
                  className={`p-2 rounded-xl border transition-all cursor-pointer ${
                    isDark
                      ? 'bg-slate-800/80 hover:bg-slate-700 text-emerald-300 border-white/10'
                      : 'bg-white hover:bg-emerald-50 text-emerald-700 border-slate-200 shadow-xs'
                  }`}
                  aria-label="Audio"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              {/* Body Back */}
              <div className="flex-1 my-4 flex flex-col justify-center items-center text-center px-2">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-emerald-600/10 dark:bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-4 shadow-inner">
                  <Award className="w-8 h-8 sm:w-9 sm:h-9" />
                </div>

                <h3 className="text-xl sm:text-2xl font-bold tracking-tight mb-2">
                  Deportes · Test de Dominio
                </h3>

                <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-emerald-100/90 max-w-lg mb-4">
                  Evalúa tu comprensión del informe radial de deportes de Jack Hill sobre béisbol, fútbol, ciclismo, Olimpiadas Infantiles y tenis. Esta evaluación contiene {SPORTS_TEST_QUESTIONS.length} pruebas secuenciales: Test 1 a Test 5.
                </p>

                <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> {SPORTS_TEST_QUESTIONS.length} Tests
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <Play className="w-4 h-4 text-emerald-500" /> Informe Radial Auténtico
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-500" /> Retroalimentación Inmediata
                  </span>
                </div>
              </div>

              {/* Footer Back with "Comenzar Test" button */}
              <div className="pt-4 border-t border-inherit/30 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
                <span className="text-xs text-slate-400 dark:text-slate-500">
                  Presiona Comenzar Test para iniciar el Test 1
                </span>

                <button
                  type="button"
                  id="start-sports-test-btn-back"
                  onClick={(e) => {
                    e.stopPropagation();
                    playFeedbackSound('click');
                    setIsTestStarted(true);
                  }}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base shadow-lg shadow-emerald-600/30 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Play className="w-5 h-5 fill-current" />
                  <span>Comenzar Test</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Sub-Test Navigation Pills: Test 1, Test 2, Test 3, Test 4, Test 5 (in exact order) */}
      <div
        className={`p-3 sm:p-4 rounded-2xl border flex items-center justify-between gap-3 ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none">
          {SPORTS_TEST_QUESTIONS.map((q, idx) => {
            const isActive = currentTestIdx === idx;
            const isAnswered = Boolean(answers[q.id]);
            const isChecked = verifiedTests[q.id];
            const isRight = isChecked && answers[q.id] === q.options.find((o) => o.isCorrect)?.id;

            return (
              <button
                key={q.id}
                type="button"
                onClick={() => {
                  playFeedbackSound('click');
                  setCurrentTestIdx(idx);
                  setIsQuestionCardFlipped(false);
                  setIsInstructionFlipped(false);
                }}
                className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                  isActive
                    ? 'bg-sky-600 text-white shadow-sm ring-2 ring-sky-400/30'
                    : isDark
                    ? 'bg-slate-800 text-slate-300 hover:bg-slate-750'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span>Test {q.testNumber}</span>
                {isChecked && (
                  <span>
                    {isRight ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <XCircle className="w-3.5 h-3.5 text-rose-400" />
                    )}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Live Progress Tag */}
        <div className="text-xs font-mono font-bold text-slate-400 shrink-0">
          {currentTestIdx + 1} / {SPORTS_TEST_QUESTIONS.length}
        </div>
      </div>

      {/* Reversible Instruction Header Card */}
      <div
        id="sports-act6-instruction-card"
        onClick={() => setIsInstructionFlipped(!isInstructionFlipped)}
        className={`w-full rounded-2xl border p-4 sm:p-5 transition-all cursor-pointer select-none ${
          isDark
            ? 'bg-slate-900 border-slate-700 text-slate-100'
            : 'bg-white border-slate-200 text-slate-900 shadow-xs'
        }`}
      >
        <div className="w-full flex items-center justify-between gap-3">
          <div>
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 mb-0.5">
              {isInstructionFlipped ? 'Instrucciones' : 'Instructions'}
            </div>
            <p className="text-sm sm:text-base font-medium">
              {isInstructionFlipped ? currentQ.instructionsEs : currentQ.instructionsEn}
            </p>
          </div>

          <button
            type="button"
            onClick={handlePlayInstruction}
            className={`p-2.5 rounded-xl border shrink-0 transition-colors cursor-pointer ${
              isDark
                ? 'bg-slate-800 hover:bg-slate-700 text-sky-300 border-slate-700'
                : 'bg-slate-50 hover:bg-slate-100 text-sky-700 border-slate-200 shadow-xs'
            }`}
            aria-label="Audio"
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Media Player with Jack Hill */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <SportsMediaCard
            currentRate={currentRate}
            accent={accent}
            highlightCurrentSentence={true}
            showTranscript={true}
          />
        </div>

        {/* Right Column: Question Card */}
        <div className="lg:col-span-7 flex flex-col gap-5">
          {/* Main Reversible Test Question Card */}
          <div
            id={`sports-test-card-${currentQ.id}`}
            onClick={() => setIsQuestionCardFlipped(!isQuestionCardFlipped)}
            className={`rounded-2xl border p-4 sm:p-6 transition-all cursor-pointer select-none flex flex-col gap-4 ${
              isVerified
                ? isCurrentCorrect
                  ? 'border-emerald-500 bg-emerald-50/20 dark:bg-emerald-950/20'
                  : 'border-rose-500 bg-rose-50/20 dark:bg-rose-950/20'
                : isDark
                ? 'bg-slate-900 border-slate-700 hover:border-slate-600'
                : 'bg-white border-slate-200 shadow-xs hover:border-slate-300'
            }`}
          >
            {/* Question Title Bar */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3 flex-1">
                <span className="w-8 h-8 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 font-bold text-sm flex items-center justify-center border border-sky-500/20 shrink-0">
                  {currentQ.testNumber}
                </span>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-100 leading-snug">
                    {isQuestionCardFlipped ? currentQ.questionEs : currentQ.question}
                  </h3>
                  {isQuestionCardFlipped && (
                    <div className="text-xs text-amber-600 dark:text-amber-400 mt-1 font-mono">
                      Test {currentQ.testNumber} (Español)
                    </div>
                  )}
                </div>
              </div>

              {/* Question Speaker Button (icon only) */}
              <button
                type="button"
                onClick={handlePlayQuestion}
                className={`p-2.5 rounded-xl border shrink-0 transition-colors cursor-pointer ${
                  isDark
                    ? 'bg-slate-800 hover:bg-slate-700 text-sky-300 border-slate-700'
                    : 'bg-slate-50 hover:bg-slate-100 text-sky-700 border-slate-200 shadow-xs'
                }`}
                aria-label="Audio"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            {/* Test 4 Type: Drag-and-drop / Slot completion */}
            {currentQ.type === 'drag-drop' ? (
              <div className="space-y-4" onClick={(e) => e.stopPropagation()}>
                {/* Sentence with Slot */}
                <div
                  className={`p-4 rounded-xl border flex flex-wrap items-center gap-2 text-sm sm:text-base font-medium leading-loose ${
                    isDark ? 'bg-slate-800/80 border-slate-750' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <span>{currentQ.sentencePrefix}</span>

                  {/* Drop Slot Target */}
                  <span
                    onClick={handleSlotClick}
                    className={`inline-flex items-center justify-center min-w-[180px] min-h-[38px] px-3 py-1 rounded-lg border-2 border-dashed text-xs sm:text-sm font-bold cursor-pointer transition-all ${
                      selectedOptId
                        ? isVerified
                          ? isCurrentCorrect
                            ? 'border-emerald-500 bg-emerald-500 text-white'
                            : 'border-rose-500 bg-rose-500 text-white'
                          : isDark
                          ? 'border-sky-500 bg-sky-950/70 text-sky-200 border-solid'
                          : 'border-sky-500 bg-sky-100 text-sky-900 border-solid'
                        : selectedForSlot
                        ? 'border-sky-400 bg-sky-50/50 dark:bg-sky-950/20 text-sky-500 animate-pulse'
                        : isDark
                        ? 'border-slate-600 bg-slate-800 text-slate-400'
                        : 'border-slate-300 bg-white text-slate-400'
                    }`}
                  >
                    {selectedOptId
                      ? currentQ.options.find((o) => o.id === selectedOptId)?.text
                      : 'Haz clic para colocar aquí'}
                  </span>

                  <span>{currentQ.sentenceSuffix}</span>
                </div>

                {/* Draggable/Selectable Options Pool */}
                <div className="space-y-2">
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Opciones para colocar en el espacio:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {currentQ.options.map((opt) => {
                      const isPlaced = selectedOptId === opt.id;
                      const isSelected = selectedForSlot === opt.id;

                      return (
                        <div
                          key={opt.id}
                          onClick={() => {
                            if (isVerified) return;
                            playFeedbackSound('click');
                            // If directly clicked and no item is in slot, place it directly!
                            if (!selectedOptId) {
                              setAnswers((prev) => ({ ...prev, [currentQ.id]: opt.id }));
                            } else {
                              setSelectedForSlot(isSelected ? null : opt.id);
                            }
                          }}
                          className={`p-3 rounded-xl border flex items-center justify-between gap-2 text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                            isPlaced
                              ? 'opacity-40 border-dashed border-slate-400 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 cursor-not-allowed'
                              : isSelected
                              ? 'bg-sky-600 text-white border-sky-500 ring-2 ring-sky-400/40 shadow-sm'
                              : isDark
                              ? 'bg-slate-800 text-slate-200 border-slate-700 hover:border-slate-500 hover:bg-slate-750'
                              : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100 shadow-xs'
                          }`}
                        >
                          <span>{opt.text}</span>
                          <button
                            type="button"
                            onClick={(e) => handlePlayOption(opt.text, e)}
                            className="p-1 hover:text-sky-300 rounded-full"
                            aria-label="Audio"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              /* Radio Options (Tests 1, 2, 3, 5) */
              <div
                className="space-y-2.5 mt-1"
                onClick={(e) => e.stopPropagation()}
              >
                {currentQ.options.map((opt) => {
                  const isSelected = selectedOptId === opt.id;
                  const isRightOpt = isVerified && opt.isCorrect;
                  const isWrongOpt = isVerified && isSelected && !opt.isCorrect;

                  return (
                    <div
                      key={opt.id}
                      onClick={() => handleSelectRadio(opt.id)}
                      className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                        isRightOpt
                          ? 'border-emerald-500 bg-emerald-500 text-white font-semibold shadow-sm'
                          : isWrongOpt
                          ? 'border-rose-500 bg-rose-500 text-white font-semibold shadow-sm'
                          : isSelected
                          ? isDark
                            ? 'border-sky-500 bg-sky-950/60 text-sky-200 ring-1 ring-sky-500/40'
                            : 'border-sky-500 bg-sky-50 text-sky-900 ring-1 ring-sky-500/40'
                          : isDark
                          ? 'border-slate-750 bg-slate-800/60 text-slate-300 hover:bg-slate-750'
                          : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                            isRightOpt || isWrongOpt
                              ? 'border-white'
                              : isSelected
                              ? 'border-sky-500'
                              : 'border-slate-400 dark:border-slate-600'
                          }`}
                        >
                          {isSelected && (
                            <span
                              className={`w-2 h-2 rounded-full ${
                                isRightOpt || isWrongOpt ? 'bg-white' : 'bg-sky-500'
                              }`}
                            />
                          )}
                        </span>
                        <span>{opt.text}</span>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => handlePlayOption(opt.text, e)}
                        className={`p-1 rounded-md transition-colors shrink-0 ${
                          isRightOpt || isWrongOpt
                            ? 'hover:bg-white/20 text-white'
                            : 'hover:text-sky-400 text-slate-400'
                        }`}
                        aria-label="Audio"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Explanation on Verify */}
            {isVerified && (
              <div
                className={`mt-2 p-3 rounded-xl text-xs leading-relaxed border ${
                  isCurrentCorrect
                    ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
                    : 'border-rose-500/30 bg-rose-500/10 text-rose-700 dark:text-rose-300'
                }`}
              >
                {isQuestionCardFlipped ? currentQ.explanationEs : currentQ.explanation}
              </div>
            )}
          </div>

          {/* Test Question Bottom Action Controls */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={currentTestIdx === 0}
                onClick={() => {
                  playFeedbackSound('click');
                  setCurrentTestIdx((prev) => Math.max(0, prev - 1));
                  setIsQuestionCardFlipped(false);
                }}
                className={`p-2.5 rounded-xl border font-semibold text-xs transition-colors flex items-center gap-1 cursor-pointer ${
                  currentTestIdx === 0
                    ? 'opacity-30 cursor-not-allowed border-transparent'
                    : isDark
                    ? 'border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 shadow-xs'
                }`}
                aria-label="Test anterior"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Anterior</span>
              </button>

              <button
                type="button"
                onClick={handleResetCurrent}
                className={`p-2.5 rounded-xl border font-semibold text-xs transition-colors flex items-center gap-1 cursor-pointer ${
                  isDark
                    ? 'border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 shadow-xs'
                }`}
                aria-label="Reiniciar test"
              >
                <RotateCcw className="w-4 h-4" />
                <span className="hidden sm:inline">Reiniciar</span>
              </button>
            </div>

            <div className="flex items-center gap-3">
              {!isVerified ? (
                <button
                  type="button"
                  onClick={handleVerifyCurrentTest}
                  disabled={!selectedOptId}
                  className={`px-6 py-2.5 rounded-xl font-semibold text-xs shadow-md transition-all cursor-pointer ${
                    !selectedOptId
                      ? 'opacity-40 cursor-not-allowed bg-slate-400 text-white'
                      : 'bg-sky-600 hover:bg-sky-500 text-white active:scale-95'
                  }`}
                >
                  Comprobar Test {currentQ.testNumber}
                </button>
              ) : currentTestIdx < SPORTS_TEST_QUESTIONS.length - 1 ? (
                <button
                  type="button"
                  onClick={() => {
                    playFeedbackSound('click');
                    setCurrentTestIdx((prev) => prev + 1);
                    setIsQuestionCardFlipped(false);
                  }}
                  className="px-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
                >
                  <span>Siguiente: Test {currentTestIdx + 2}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Test finalizado ({score}/{SPORTS_TEST_QUESTIONS.length})</span>
                </div>
              )}
            </div>
          </div>

          {/* Test Completion Banner */}
          {isSubmitted && (
            <div
              className={`p-5 rounded-2xl border flex items-center justify-between gap-4 animate-in fade-in zoom-in-95 ${
                score >= 4
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-800 dark:text-emerald-200'
                  : 'bg-sky-500/10 border-sky-500/30 text-sky-800 dark:text-sky-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-300">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-sm sm:text-base">
                    ¡Felicidades! Has completado el Test de Sports
                  </h4>
                  <p className="text-xs opacity-90">
                    Puntuación obtenida: {score} de {SPORTS_TEST_QUESTIONS.length} aciertos ({Math.round((score / SPORTS_TEST_QUESTIONS.length) * 100)}%)
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleResetEntireTest}
                className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold shrink-0 flex items-center gap-1.5 transition-all active:scale-95 shadow-xs cursor-pointer"
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
