import React, { useState } from 'react';
import {
  Volume2,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ChevronRight,
  Award,
  Play,
  Sparkles,
} from 'lucide-react';
import { RESTAURANT_UNIT_TEST_QUESTIONS } from '../../data/inTheRestaurantData';
import { RestaurantVideoPlayer } from '../RestaurantVideoPlayer';
import { useTheme } from '../../context/ThemeContext';
import { speakEnglish, stopSpeaking, playFeedbackSound } from '../../utils/audio';

export interface Activity10TestsProps {
  accent?: 'US' | 'UK';
  speechRate?: number;
  onComplete?: () => void;
}

export const Activity10Tests: React.FC<Activity10TestsProps> = ({
  accent = 'US',
  speechRate = 1.0,
  onComplete,
}) => {
  const { isDark } = useTheme();

  const [isTestStarted, setIsTestStarted] = useState(false);
  const [isStartCardFlipped, setIsStartCardFlipped] = useState(false);
  const [currentTestIndex, setCurrentTestIndex] = useState(0); // 0 to 4 (Test 1 to Test 5)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [submittedTests, setSubmittedTests] = useState<Record<number, boolean>>({});
  const [isTestFinished, setIsTestFinished] = useState(false);

  const [isInstructionFlipped, setIsInstructionFlipped] = useState(false);
  const [isQuestionFlipped, setIsQuestionFlipped] = useState(false);
  const [flippedOptionIds, setFlippedOptionIds] = useState<string[]>([]);
  const [playingKey, setPlayingKey] = useState<string | null>(null);

  const currentQ = RESTAURANT_UNIT_TEST_QUESTIONS[currentTestIndex];
  const selectedOptionId = selectedAnswers[currentTestIndex] || null;
  const isSubmitted = !!submittedTests[currentTestIndex];
  const isCorrect = selectedOptionId === currentQ.correctAnswerId;

  const handlePlayText = (text: string, key: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (playingKey === key && window.speechSynthesis?.speaking) {
      stopSpeaking();
      setPlayingKey(null);
      return;
    }
    stopSpeaking();
    setPlayingKey(key);
    speakEnglish(
      text,
      speechRate,
      accent === 'UK' ? 'UK' : 'US',
      () => setPlayingKey(key),
      () => setPlayingKey(null)
    );
  };

  const toggleOptionFlip = (optId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    playFeedbackSound('flip');
    setFlippedOptionIds((prev) =>
      prev.includes(optId) ? prev.filter((id) => id !== optId) : [...prev, optId]
    );
  };

  const handleSelectOption = (optId: string) => {
    if (isSubmitted) return;
    playFeedbackSound('click');
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentTestIndex]: optId,
    }));
  };

  const handleCheck = () => {
    if (!selectedOptionId) return;
    setSubmittedTests((prev) => ({
      ...prev,
      [currentTestIndex]: true,
    }));
    if (selectedOptionId === currentQ.correctAnswerId) {
      playFeedbackSound('correct');
    } else {
      playFeedbackSound('wrong');
    }
  };

  const handleNextTest = () => {
    if (currentTestIndex < RESTAURANT_UNIT_TEST_QUESTIONS.length - 1) {
      setCurrentTestIndex((prev) => prev + 1);
      setIsInstructionFlipped(false);
      setIsQuestionFlipped(false);
      setFlippedOptionIds([]);
    } else {
      setIsTestFinished(true);
      onComplete?.();
    }
  };

  const handleGoToTest = (idx: number) => {
    setCurrentTestIndex(idx);
    setIsInstructionFlipped(false);
    setIsQuestionFlipped(false);
    setFlippedOptionIds([]);
  };

  const handleRestartAll = () => {
    setCurrentTestIndex(0);
    setSelectedAnswers({});
    setSubmittedTests({});
    setIsTestFinished(false);
    setIsInstructionFlipped(false);
    setIsQuestionFlipped(false);
    setFlippedOptionIds([]);
  };

  // Score calculations
  const totalCorrect = RESTAURANT_UNIT_TEST_QUESTIONS.reduce((acc, q, idx) => {
    return acc + (selectedAnswers[idx] === q.correctAnswerId ? 1 : 0);
  }, 0);

  if (!isTestStarted) {
    return (
      <div className="w-full max-w-3xl mx-auto py-2">
        <div
          id="restaurant-start-test-card"
          className="relative min-h-[500px] sm:min-h-[520px] cursor-pointer group perspective select-none"
          onClick={() => setIsStartCardFlipped(!isStartCardFlipped)}
        >
          <div
            className={`w-full transition-transform duration-500 transform-style-3d ${
              isStartCardFlipped ? 'rotate-y-180' : ''
            }`}
          >
            {/* ANVERSO / FRONT: INGLÉS */}
            <div
              className={`relative w-full min-h-[500px] sm:min-h-[520px] rounded-3xl p-5 sm:p-7 flex flex-col justify-between border backface-hidden shadow-xl transition-colors duration-200 ${
                isDark
                  ? 'bg-slate-900 border-sky-500/40 text-white'
                  : 'bg-white border-sky-300 text-slate-900 shadow-md'
              }`}
            >
              {/* Header Front */}
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
                    Unit 5 Assessment · {RESTAURANT_UNIT_TEST_QUESTIONS.length} Tests
                  </span>
                </div>

                <button
                  type="button"
                  onClick={(e) =>
                    handlePlayText(
                      'In the Restaurant Mastery Test. Test your comprehension of ordering food, requesting changes, and interacting with the waiter. Answer all 5 tests.',
                      'start-card-en',
                      e
                    )
                  }
                  className={`p-2 rounded-xl border transition-all cursor-pointer ${
                    playingKey === 'start-card-en'
                      ? 'bg-sky-600 text-white border-sky-500 ring-2 ring-sky-400'
                      : isDark
                      ? 'bg-slate-800/80 hover:bg-slate-700 text-sky-300 border-white/10'
                      : 'bg-white hover:bg-sky-50 text-sky-700 border-slate-200 shadow-xs'
                  }`}
                  aria-label="Audio"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              {/* Body */}
              <div className="flex-1 my-2 sm:my-3 flex flex-col justify-center items-center text-center px-2">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-sky-600/10 dark:bg-sky-500/20 border border-sky-500/30 flex items-center justify-center text-sky-600 dark:text-sky-400 mb-3 shadow-inner shrink-0">
                  <Award className="w-7 h-7 sm:w-8 sm:h-8" />
                </div>

                <h3 className="text-xl sm:text-2xl font-bold tracking-tight mb-2">
                  In the Restaurant · Mastery Test
                </h3>

                <p className="text-xs sm:text-sm md:text-base leading-relaxed text-slate-600 dark:text-slate-300 max-w-lg mb-3">
                  Test your comprehension of ordering food, requesting changes, and interacting with the waiter. This test contains {RESTAURANT_UNIT_TEST_QUESTIONS.length} sequential assessments: Test 1 to Test 5.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> {RESTAURANT_UNIT_TEST_QUESTIONS.length} Tests
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <Play className="w-4 h-4 text-sky-500" /> Authentic Video Dialogue
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-500" /> Instant Feedback
                  </span>
                </div>
              </div>

              {/* Footer with "Iniciar Test" button */}
              <div className="pt-3 sm:pt-4 border-t border-inherit/30 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0 pb-2">
                <span className="text-xs text-slate-400 dark:text-slate-500">
                  Presiona Iniciar Test para comenzar el Test 1
                </span>

                <button
                  type="button"
                  id="restaurant-start-test-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    playFeedbackSound('click');
                    setIsTestStarted(true);
                  }}
                  className="w-full sm:w-auto px-7 py-3 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm sm:text-base shadow-lg shadow-sky-600/30 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                  <span>Iniciar Test</span>
                </button>
              </div>
            </div>

            {/* REVERSO / BACK: ESPAÑOL */}
            <div
              className={`absolute inset-0 w-full h-full rounded-3xl p-5 sm:p-7 flex flex-col justify-between border backface-hidden rotate-y-180 shadow-xl transition-colors duration-200 ${
                isDark
                  ? 'bg-slate-900 border-sky-500/40 text-white'
                  : 'bg-white border-sky-300 text-slate-900 shadow-md'
              }`}
            >
              {/* Header Back */}
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
                    Evaluación de la Unidad · {RESTAURANT_UNIT_TEST_QUESTIONS.length} Tests
                  </span>
                </div>

                <button
                  type="button"
                  onClick={(e) =>
                    handlePlayText(
                      'In the Restaurant Mastery Test. Test your comprehension of ordering food, requesting changes, and interacting with the waiter. Answer all 5 tests.',
                      'start-card-es',
                      e
                    )
                  }
                  className={`p-2 rounded-xl border transition-all cursor-pointer ${
                    playingKey === 'start-card-es'
                      ? 'bg-sky-600 text-white border-sky-500 ring-2 ring-sky-400'
                      : isDark
                      ? 'bg-slate-800/80 hover:bg-slate-700 text-sky-300 border-white/10'
                      : 'bg-white hover:bg-sky-50 text-sky-700 border-slate-200 shadow-xs'
                  }`}
                  aria-label="Audio"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              {/* Body Back */}
              <div className="flex-1 my-2 sm:my-3 flex flex-col justify-center items-center text-center px-2">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-sky-600/10 dark:bg-sky-500/20 border border-sky-500/30 flex items-center justify-center text-sky-600 dark:text-sky-400 mb-3 shadow-inner shrink-0">
                  <Award className="w-7 h-7 sm:w-8 sm:h-8" />
                </div>

                <h3 className="text-xl sm:text-2xl font-bold tracking-tight mb-2">
                  En el Restaurante · Test de Dominio
                </h3>

                <p className="text-xs sm:text-sm md:text-base leading-relaxed text-slate-700 dark:text-sky-100/90 max-w-lg mb-3">
                  Evalúa tu comprensión para ordenar comida, solicitar cambios e interactuar con el camarero. Esta evaluación contiene {RESTAURANT_UNIT_TEST_QUESTIONS.length} pruebas secuenciales: Test 1 a Test 5.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> {RESTAURANT_UNIT_TEST_QUESTIONS.length} Tests
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <Play className="w-4 h-4 text-sky-500" /> Diálogo en Video Auténtico
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-500" /> Retroalimentación Inmediata
                  </span>
                </div>
              </div>

              {/* Footer Back with "Iniciar Test" button */}
              <div className="pt-3 sm:pt-4 border-t border-inherit/30 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0 pb-2">
                <span className="text-xs text-slate-400 dark:text-slate-500">
                  Presiona Iniciar Test para comenzar el Test 1
                </span>

                <button
                  type="button"
                  id="restaurant-start-test-btn-back"
                  onClick={(e) => {
                    e.stopPropagation();
                    playFeedbackSound('click');
                    setIsTestStarted(true);
                  }}
                  className="w-full sm:w-auto px-7 py-3 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm sm:text-base shadow-lg shadow-sky-600/30 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                  <span>Iniciar Test</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isTestFinished) {
    const percentage = Math.round((totalCorrect / RESTAURANT_UNIT_TEST_QUESTIONS.length) * 100);
    return (
      <div
        className={`w-full p-6 sm:p-8 rounded-2xl border text-center flex flex-col items-center gap-4 animate-in fade-in ${
          isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="w-16 h-16 rounded-full bg-amber-500/20 text-amber-500 flex items-center justify-center">
          <Award className="w-8 h-8" />
        </div>
        <h2 className="font-bold text-xl sm:text-2xl text-slate-900 dark:text-white">
          ¡Test de la Sección 1 Finalizado!
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-md">
          Has completado los 5 tests de la sección In the Restaurant.
        </p>

        <div className="my-2 p-4 rounded-xl border border-inherit/40 bg-slate-50 dark:bg-slate-800/60 flex items-center gap-6">
          <div className="text-center">
            <span className="text-2xl sm:text-3xl font-extrabold text-sky-600 dark:text-sky-400">
              {totalCorrect}/{RESTAURANT_UNIT_TEST_QUESTIONS.length}
            </span>
            <div className="text-xs text-slate-500 uppercase font-semibold">Aciertos</div>
          </div>
          <div className="h-10 w-px bg-slate-300 dark:bg-slate-700" />
          <div className="text-center">
            <span className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
              {percentage}%
            </span>
            <div className="text-xs text-slate-500 uppercase font-semibold">Puntaje</div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleRestartAll}
          className="px-6 py-2.5 rounded-xl font-bold text-sm bg-sky-600 hover:bg-sky-700 text-white shadow-md transition-all cursor-pointer flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Repetir Test</span>
        </button>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-5">
      {/* Test Sub-Navigation: Test 1, Test 2, Test 3, Test 4, Test 5 in exact order */}
      <div
        className={`w-full p-2.5 sm:p-3 rounded-2xl border flex flex-wrap items-center justify-between gap-2 ${
          isDark ? 'bg-slate-900/80 border-slate-700' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {RESTAURANT_UNIT_TEST_QUESTIONS.map((q, idx) => {
            const isActive = currentTestIndex === idx;
            const isAnswered = !!submittedTests[idx];
            const isAnsCorrect = isAnswered && selectedAnswers[idx] === q.correctAnswerId;

            return (
              <button
                key={q.id}
                type="button"
                onClick={() => handleGoToTest(idx)}
                className={`px-3 py-1.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-1.5 border ${
                  isActive
                    ? 'bg-sky-600 text-white border-sky-500 shadow-md ring-2 ring-sky-400'
                    : isAnswered
                    ? isAnsCorrect
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700'
                      : 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-300 border-rose-300 dark:border-rose-700'
                    : isDark
                    ? 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                    : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                }`}
              >
                <span>Test {idx + 1}</span>
                {isAnswered && (
                  <span>{isAnsCorrect ? '✓' : '✗'}</span>
                )}
              </button>
            );
          })}
        </div>

        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
          Pregunta {currentTestIndex + 1} de {RESTAURANT_UNIT_TEST_QUESTIONS.length}
        </span>
      </div>

      {/* Top Reversible Instruction Card */}
      <div className="w-full perspective-1000">
        <div
          onClick={() => {
            playFeedbackSound('flip');
            setIsInstructionFlipped(!isInstructionFlipped);
          }}
          className={`relative w-full min-h-[58px] rounded-2xl cursor-pointer select-none transition-transform duration-500 transform-style-3d border shadow-xs ${
            isInstructionFlipped ? 'rotate-y-180' : ''
          } ${
            isDark
              ? 'bg-slate-900 border-slate-700 text-white'
              : 'bg-white border-slate-200 text-slate-900'
          }`}
        >
          <div className="absolute inset-0 px-5 py-3 flex items-center justify-between backface-hidden">
            <span className="font-semibold text-sm sm:text-base">{currentQ.instructions}</span>
            <button
              type="button"
              onClick={(e) => handlePlayText(currentQ.instructions, 'instruction', e)}
              className={`p-1.5 rounded-lg border transition-all shrink-0 ${
                isDark
                  ? 'bg-slate-800 hover:bg-slate-700 text-sky-300 border-slate-700'
                  : 'bg-sky-50 hover:bg-sky-100 text-sky-600 border-sky-200'
              }`}
              aria-label="Audio"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>
          <div className="absolute inset-0 px-5 py-3 flex items-center justify-between backface-hidden rotate-y-180">
            <span className="font-semibold text-sm sm:text-base italic text-slate-700 dark:text-slate-200">
              {currentQ.instructionsEs}
            </span>
          </div>
        </div>
      </div>

      {/* Grid: Left Column Video + Right Column Test */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (6 Cols): Video Player */}
        <div className="lg:col-span-6 w-full">
          <RestaurantVideoPlayer
            highlightedTurnIds={[]}
            showTranscriptByDefault={false}
            accent={accent}
            speechRate={speechRate}
          />
        </div>

        {/* Right Column (6 Cols): Question + Options */}
        <div className="lg:col-span-6 w-full flex flex-col gap-4">
          {/* Reversible Question Card */}
          <div className="w-full perspective-1000">
            <div
              onClick={() => {
                playFeedbackSound('flip');
                setIsQuestionFlipped(!isQuestionFlipped);
              }}
              className={`relative w-full min-h-[64px] rounded-2xl cursor-pointer select-none transition-transform duration-500 transform-style-3d border shadow-xs ${
                isQuestionFlipped ? 'rotate-y-180' : ''
              } ${
                isDark
                  ? 'bg-slate-900 border-slate-700 text-white'
                  : 'bg-white border-slate-200 text-slate-900'
              }`}
            >
              <div className="absolute inset-0 px-5 py-3.5 flex items-center justify-between backface-hidden">
                <h3 className="font-bold text-base sm:text-lg">{currentQ.question}</h3>
                <button
                  type="button"
                  onClick={(e) => handlePlayText(currentQ.question, 'question', e)}
                  className={`p-1.5 rounded-lg border transition-all shrink-0 ${
                    isDark
                      ? 'bg-slate-800 hover:bg-slate-700 text-sky-300 border-slate-700'
                      : 'bg-sky-50 hover:bg-sky-100 text-sky-600 border-sky-200'
                  }`}
                  aria-label="Audio"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
              <div className="absolute inset-0 px-5 py-3.5 flex items-center justify-between backface-hidden rotate-y-180">
                <h3 className="font-bold text-base sm:text-lg italic text-slate-700 dark:text-slate-200">
                  {currentQ.questionEs}
                </h3>
              </div>
            </div>
          </div>

          {/* Options (Each Reversible) */}
          <div className="flex flex-col gap-3">
            {currentQ.options.map((opt) => {
              const isSelected = selectedOptionId === opt.id;
              const isFlipped = flippedOptionIds.includes(opt.id);
              const isOptionCorrect = opt.id === currentQ.correctAnswerId;

              let borderState = isDark ? 'border-slate-700' : 'border-slate-200';
              let bgState = isDark ? 'bg-slate-900' : 'bg-white';

              if (isSubmitted) {
                if (isOptionCorrect) {
                  borderState = 'border-emerald-500 ring-2 ring-emerald-400';
                  bgState = isDark ? 'bg-emerald-950/30' : 'bg-emerald-50/70';
                } else if (isSelected && !isOptionCorrect) {
                  borderState = 'border-rose-500 ring-2 ring-rose-400';
                  bgState = isDark ? 'bg-rose-950/30' : 'bg-rose-50/70';
                }
              } else if (isSelected) {
                borderState = 'border-sky-500 ring-2 ring-sky-400';
                bgState = isDark ? 'bg-sky-950/30' : 'bg-sky-50/70';
              }

              return (
                <div key={opt.id} className="w-full perspective-1000">
                  <div
                    onClick={(e) => toggleOptionFlip(opt.id, e)}
                    className={`relative w-full min-h-[56px] rounded-2xl cursor-pointer select-none transition-transform duration-500 transform-style-3d border shadow-xs ${
                      isFlipped ? 'rotate-y-180' : ''
                    } ${borderState} ${bgState}`}
                  >
                    {/* Front: English */}
                    <div className="absolute inset-0 px-4 py-3 flex items-center justify-between backface-hidden">
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectOption(opt.id);
                        }}
                        className="flex-1 flex items-center gap-3 cursor-pointer"
                      >
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                            isSelected
                              ? 'border-sky-500 bg-sky-500'
                              : isDark
                              ? 'border-slate-600'
                              : 'border-slate-300'
                          }`}
                        >
                          {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                        </div>
                        <span className="text-sm sm:text-base font-medium">{opt.text}</span>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => handlePlayText(opt.text, opt.id, e)}
                        className={`p-1.5 rounded-lg border transition-all shrink-0 ml-2 cursor-pointer ${
                          isDark
                            ? 'bg-slate-800 hover:bg-slate-700 text-sky-300 border-slate-700'
                            : 'bg-sky-50 hover:bg-sky-100 text-sky-600 border-sky-200'
                        }`}
                        aria-label="Audio"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Back: Spanish */}
                    <div className="absolute inset-0 px-4 py-3 flex items-center justify-between backface-hidden rotate-y-180">
                      <span className="text-sm sm:text-base font-medium italic text-slate-700 dark:text-slate-200">
                        {opt.textEs}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="mt-2 flex items-center justify-between gap-3">
            <div />

            {!isSubmitted ? (
              <button
                type="button"
                disabled={!selectedOptionId}
                onClick={handleCheck}
                className={`px-6 py-2.5 rounded-xl font-bold text-sm shadow-md transition-all cursor-pointer ${
                  selectedOptionId
                    ? 'bg-sky-600 hover:bg-sky-700 text-white active:scale-95'
                    : 'bg-slate-300 dark:bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                Comprobar
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNextTest}
                className="px-6 py-2.5 rounded-xl font-bold text-sm bg-indigo-600 hover:bg-indigo-700 text-white shadow-md transition-all cursor-pointer active:scale-95 flex items-center gap-2"
              >
                <span>
                  {currentTestIndex < RESTAURANT_UNIT_TEST_QUESTIONS.length - 1
                    ? 'Siguiente Test'
                    : 'Ver Resultado Final'}
                </span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Explanation Box after Submit */}
          {isSubmitted && (
            <div
              className={`p-4 rounded-2xl border animate-in fade-in duration-200 flex flex-col gap-2 ${
                isCorrect
                  ? isDark
                    ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                    : 'bg-emerald-50 border-emerald-200 text-emerald-950'
                  : isDark
                  ? 'bg-rose-950/40 border-rose-500/40 text-rose-200'
                  : 'bg-rose-50 border-rose-200 text-rose-950'
              }`}
            >
              <div className="flex items-center gap-2 font-bold text-sm">
                {isCorrect ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                ) : (
                  <XCircle className="w-4 h-4 text-rose-500" />
                )}
                <span>{isCorrect ? '¡Correcto!' : 'Respuesta Incorrecta'}</span>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed">{currentQ.explanation}</p>
              <p className="text-xs sm:text-sm leading-relaxed italic text-slate-600 dark:text-slate-300">
                {currentQ.explanationEs}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
