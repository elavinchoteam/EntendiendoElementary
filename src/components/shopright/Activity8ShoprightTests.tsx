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
import {
  SHOPRIGHT_MASTERY_TESTS,
  ShoprightTestQuestion,
} from '../../data/saleAtShoprightData';
import { ShoprightPinnedAd } from './ShoprightPinnedAd';
import { useTheme } from '../../context/ThemeContext';
import { speakEnglish, stopSpeaking, playFeedbackSound } from '../../utils/audio';

export interface Activity8ShoprightTestsProps {
  accent?: 'US' | 'UK';
  speechRate?: number;
  onComplete?: () => void;
}

export const Activity8ShoprightTests: React.FC<Activity8ShoprightTestsProps> = ({
  accent = 'US',
  speechRate = 1.0,
  onComplete,
}) => {
  const { isDark } = useTheme();

  const [isTestStarted, setIsTestStarted] = useState(false);
  const [isStartCardFlipped, setIsStartCardFlipped] = useState(false);

  const [currentTestIndex, setCurrentTestIndex] = useState(0); // 0 to 4: Test 1 to Test 5
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [submittedTests, setSubmittedTests] = useState<Record<number, boolean>>({});
  const [isTestFinished, setIsTestFinished] = useState(false);

  const [isQuestionFlipped, setIsQuestionFlipped] = useState(false);
  const [playingKey, setPlayingKey] = useState<string | null>(null);

  const currentQ = SHOPRIGHT_MASTERY_TESTS[currentTestIndex];
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
      accent || 'US',
      () => setPlayingKey(key),
      () => setPlayingKey(null)
    );
  };

  const handleSelectOption = (optId: string) => {
    if (isSubmitted) return;
    playFeedbackSound('click');
    setSelectedAnswers((prev) => ({ ...prev, [currentTestIndex]: optId }));
  };

  const handleSubmitCurrentTest = () => {
    if (!selectedOptionId || isSubmitted) return;
    setSubmittedTests((prev) => ({ ...prev, [currentTestIndex]: true }));
    if (isCorrect) {
      playFeedbackSound('correct');
    } else {
      playFeedbackSound('wrong');
    }
  };

  const handleNextTest = () => {
    if (currentTestIndex < SHOPRIGHT_MASTERY_TESTS.length - 1) {
      setCurrentTestIndex((prev) => prev + 1);
      setIsQuestionFlipped(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setIsTestFinished(true);
      if (onComplete) {
        onComplete();
      }
    }
  };

  const handleRestartAll = () => {
    setCurrentTestIndex(0);
    setSelectedAnswers({});
    setSubmittedTests({});
    setIsTestFinished(false);
    setIsTestStarted(false);
    setIsQuestionFlipped(false);
  };

  const totalCorrect = SHOPRIGHT_MASTERY_TESTS.reduce((acc, q, idx) => {
    return acc + (selectedAnswers[idx] === q.correctAnswerId ? 1 : 0);
  }, 0);

  // 1. Initial State: Reversible Start Card ("Iniciar Test")
  if (!isTestStarted) {
    return (
      <div className="w-full max-w-3xl mx-auto py-2">
        <div
          id="shopright-start-test-card"
          className="relative min-h-[500px] sm:min-h-[520px] cursor-pointer group perspective select-none"
          onClick={() => setIsStartCardFlipped(!isStartCardFlipped)}
        >
          <div
            className={`w-full transition-transform duration-500 transform-style-3d ${
              isStartCardFlipped ? 'rotate-y-180' : ''
            }`}
          >
            {/* FRONT: English */}
            <div
              className={`relative w-full min-h-[500px] sm:min-h-[520px] rounded-3xl p-5 sm:p-7 flex flex-col justify-between border backface-hidden shadow-xl transition-colors duration-200 ${
                isDark
                  ? 'bg-slate-900 border-indigo-500/40 text-white'
                  : 'bg-white border-indigo-300 text-slate-900 shadow-md'
              }`}
            >
              {/* Header Front */}
              <div className="flex items-center justify-between gap-3 pb-3 border-b border-inherit/40 shrink-0">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                      isDark
                        ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                        : 'bg-indigo-100 text-indigo-900 border border-indigo-200'
                    }`}
                  >
                    <Award className="w-3.5 h-3.5" />
                    Unit 5 Section 2 · {SHOPRIGHT_MASTERY_TESTS.length} Tests
                  </span>
                </div>

                <button
                  type="button"
                  onClick={(e) =>
                    handlePlayText(
                      'Sale at Shopright Mastery Test. Test your reading comprehension of supermarket advertisements, sale prices, and healthy food vocabulary. Answer all 5 tests.',
                      'start-test-card-en',
                      e
                    )
                  }
                  className={`p-2 rounded-xl border transition-all cursor-pointer ${
                    playingKey === 'start-test-card-en'
                      ? 'bg-indigo-600 text-white border-indigo-500 ring-2 ring-indigo-400'
                      : isDark
                      ? 'bg-slate-800 hover:bg-slate-700 text-indigo-300 border-white/10'
                      : 'bg-white hover:bg-indigo-50 text-indigo-900 border-slate-200 shadow-xs'
                  }`}
                  aria-label="Audio"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              {/* Body Front */}
              <div className="flex-1 my-2 sm:my-3 flex flex-col justify-center items-center text-center px-2">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-indigo-600/10 dark:bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-3 shadow-inner shrink-0">
                  <Award className="w-7 h-7 sm:w-8 sm:h-8" />
                </div>

                <h3 className="text-xl sm:text-2xl font-bold tracking-tight mb-2">
                  Sale at Shopright · Mastery Test
                </h3>

                <p className="text-xs sm:text-sm md:text-base leading-relaxed text-slate-600 dark:text-slate-300 max-w-lg mb-3">
                  Test your reading comprehension of supermarket advertisements, sale prices, and healthy food vocabulary. This test contains {SHOPRIGHT_MASTERY_TESTS.length} sequential assessments: Test 1 to Test 5.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> {SHOPRIGHT_MASTERY_TESTS.length} Tests
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-indigo-500" /> Sequential Mastery
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-sky-500" /> Instant Feedback
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
                  id="shopright-start-test-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    playFeedbackSound('click');
                    setIsTestStarted(true);
                  }}
                  className="w-full sm:w-auto px-7 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm sm:text-base shadow-lg shadow-indigo-600/30 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                  <span>Iniciar Test</span>
                </button>
              </div>
            </div>

            {/* BACK: Spanish */}
            <div
              className={`absolute inset-0 w-full h-full rounded-3xl p-5 sm:p-7 flex flex-col justify-between border backface-hidden rotate-y-180 shadow-xl transition-colors duration-200 ${
                isDark
                  ? 'bg-slate-900 border-indigo-500/40 text-white'
                  : 'bg-white border-indigo-300 text-slate-900 shadow-md'
              }`}
            >
              {/* Header Back */}
              <div className="flex items-center justify-between gap-3 pb-3 border-b border-inherit/40 shrink-0">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                      isDark
                        ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                        : 'bg-indigo-100 text-indigo-900 border border-indigo-200'
                    }`}
                  >
                    <Award className="w-3.5 h-3.5" />
                    Evaluación de la Unidad · {SHOPRIGHT_MASTERY_TESTS.length} Tests
                  </span>
                </div>

                <button
                  type="button"
                  onClick={(e) =>
                    handlePlayText(
                      'Sale at Shopright Mastery Test. Test your reading comprehension of supermarket advertisements, sale prices, and healthy food vocabulary. Answer all 5 tests.',
                      'start-test-card-es',
                      e
                    )
                  }
                  className={`p-2 rounded-xl border transition-all cursor-pointer ${
                    playingKey === 'start-test-card-es'
                      ? 'bg-indigo-600 text-white border-indigo-500 ring-2 ring-indigo-400'
                      : isDark
                      ? 'bg-slate-800 hover:bg-slate-700 text-indigo-300 border-white/10'
                      : 'bg-white hover:bg-indigo-50 text-indigo-900 border-slate-200 shadow-xs'
                  }`}
                  aria-label="Audio"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              {/* Body Back */}
              <div className="flex-1 my-2 sm:my-3 flex flex-col justify-center items-center text-center px-2">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-indigo-600/10 dark:bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-3 shadow-inner shrink-0">
                  <Award className="w-7 h-7 sm:w-8 sm:h-8" />
                </div>

                <h3 className="text-xl sm:text-2xl font-bold tracking-tight mb-2">
                  Ofertas en Shopright · Test de Dominio
                </h3>

                <p className="text-xs sm:text-sm md:text-base leading-relaxed text-slate-700 dark:text-indigo-100/90 max-w-lg mb-3">
                  Evalúa tu comprensión lectora de anuncios de supermercado, precios de oferta y vocabulario de comida saludable. Esta evaluación contiene {SHOPRIGHT_MASTERY_TESTS.length} pruebas secuenciales: Test 1 a Test 5.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> {SHOPRIGHT_MASTERY_TESTS.length} Tests
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-indigo-500" /> Dominio Secuencial
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-sky-500" /> Retroalimentación Inmediata
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
                  id="shopright-start-test-btn-back"
                  onClick={(e) => {
                    e.stopPropagation();
                    playFeedbackSound('click');
                    setIsTestStarted(true);
                  }}
                  className="w-full sm:w-auto px-7 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm sm:text-base shadow-lg shadow-indigo-600/30 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
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

  // 2. Finished State
  if (isTestFinished) {
    const percentage = Math.round((totalCorrect / SHOPRIGHT_MASTERY_TESTS.length) * 100);
    return (
      <div
        className={`w-full p-6 sm:p-8 rounded-2xl border text-center flex flex-col items-center gap-4 animate-in fade-in max-w-2xl mx-auto ${
          isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="w-16 h-16 rounded-full bg-indigo-500/20 text-indigo-500 flex items-center justify-center">
          <Award className="w-8 h-8" />
        </div>
        <h2 className="font-bold text-xl sm:text-2xl text-slate-900 dark:text-white">
          ¡Test de la Sección 2 Finalizado!
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-md">
          Has completado los 5 tests de la sección Sale at Shopright.
        </p>

        <div className="my-2 p-4 rounded-xl border border-inherit/40 bg-slate-50 dark:bg-slate-800/60 flex items-center gap-6">
          <div className="text-center">
            <span className="text-2xl sm:text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">
              {totalCorrect}/{SHOPRIGHT_MASTERY_TESTS.length}
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
          className="px-6 py-2.5 rounded-xl font-bold text-sm bg-indigo-600 hover:bg-indigo-700 text-white shadow-md transition-all cursor-pointer flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Repetir Test</span>
        </button>
      </div>
    );
  }

  // 3. Test Running: Sub-navigation (Test 1, Test 2, Test 3, Test 4, Test 5 in exact order) + Split View
  return (
    <div className="w-full flex flex-col gap-5 max-w-6xl mx-auto">
      {/* Test Sub-Navigation Bar */}
      <div
        className={`w-full p-2.5 sm:p-3 rounded-2xl border flex flex-wrap items-center justify-between gap-2 ${
          isDark ? 'bg-slate-900/80 border-slate-700' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {SHOPRIGHT_MASTERY_TESTS.map((q, idx) => {
            const isActive = currentTestIndex === idx;
            const testSubmitted = !!submittedTests[idx];
            const testCorrect = selectedAnswers[idx] === q.correctAnswerId;

            return (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  stopSpeaking();
                  setCurrentTestIndex(idx);
                  setIsQuestionFlipped(false);
                }}
                className={`px-3 py-1.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-1.5 border ${
                  isActive
                    ? 'bg-indigo-600 text-white border-indigo-500 shadow-md ring-2 ring-indigo-400 scale-105'
                    : isDark
                    ? 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                    : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                }`}
              >
                <span>{q.title}</span>
                {testSubmitted &&
                  (testCorrect ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <XCircle className="w-3.5 h-3.5 text-red-400" />
                  ))}
              </button>
            );
          })}
        </div>

        <span className="text-xs font-mono text-slate-400">
          {currentTestIndex + 1} de {SHOPRIGHT_MASTERY_TESTS.length}
        </span>
      </div>

      {/* 2-Column Split: Ad on Left, Current Test on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Authentic Pinned Ad */}
        <div className="lg:col-span-5">
          <ShoprightPinnedAd
            speechRate={speechRate}
            accent={accent}
            compact
          />
        </div>

        {/* Right Column: Active Test Card */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div
            className="cursor-pointer perspective select-none"
            onClick={() => setIsQuestionFlipped(!isQuestionFlipped)}
          >
            <div
              className={`w-full min-h-[300px] transition-transform duration-500 transform-style-3d relative ${
                isQuestionFlipped ? 'rotate-y-180' : ''
              }`}
            >
              {/* FRONT: English Test */}
              <div
                className={`w-full min-h-[300px] rounded-2xl border p-5 sm:p-6 flex flex-col justify-between backface-hidden shadow-xs transition-colors ${
                  isDark
                    ? 'bg-slate-900 border-slate-700 text-white'
                    : 'bg-white border-slate-200 text-slate-900'
                }`}
              >
                {/* Header with Title & Audio Button */}
                <div className="flex items-start justify-between gap-3 pb-3 border-b border-inherit/40">
                  <div>
                    <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase">
                      {currentQ.title} · Comprehension
                    </span>
                    <h3 className="text-base sm:text-lg font-bold mt-1 leading-snug">
                      {currentQ.questionEn}
                    </h3>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => handlePlayText(currentQ.questionEn, `q-${currentQ.testNumber}`, e)}
                    className={`p-1.5 rounded-lg border transition-all cursor-pointer shrink-0 ${
                      playingKey === `q-${currentQ.testNumber}`
                        ? 'bg-indigo-600 text-white border-indigo-500'
                        : isDark
                        ? 'bg-slate-800 hover:bg-slate-700 text-indigo-300 border-slate-700'
                        : 'bg-slate-50 hover:bg-indigo-50 text-indigo-900 border-slate-200'
                    }`}
                    aria-label="Audio"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Options / Answer choices */}
                <div className="flex flex-col gap-2.5 py-4">
                  {currentQ.options.map((opt) => {
                    const isSelected = selectedOptionId === opt.id;
                    const isCorrectOpt = opt.id === currentQ.correctAnswerId;

                    let optStyle =
                      isDark
                        ? 'bg-slate-800/80 border-slate-700 hover:bg-slate-800 text-slate-200'
                        : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-800';

                    if (isSubmitted) {
                      if (isSelected) {
                        optStyle = isCorrect
                          ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-800 dark:text-emerald-300 ring-1 ring-emerald-400'
                          : 'bg-red-50 dark:bg-red-950/60 border-red-500 text-red-800 dark:text-red-300 ring-1 ring-red-400';
                      } else if (isCorrectOpt) {
                        optStyle =
                          'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400 text-emerald-800 dark:text-emerald-300';
                      }
                    } else if (isSelected) {
                      optStyle =
                        'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-500 text-indigo-900 dark:text-indigo-200 ring-2 ring-indigo-400';
                    }

                    return (
                      <div
                        key={opt.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectOption(opt.id);
                        }}
                        className={`p-3 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition-all ${optStyle}`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                              isSelected
                                ? 'border-indigo-600 bg-indigo-600'
                                : 'border-slate-400 dark:border-slate-500'
                            }`}
                          >
                            {isSelected && (
                              <div className="w-1.5 h-1.5 rounded-full bg-white" />
                            )}
                          </div>
                          <span className="text-sm font-medium">{opt.en}</span>
                        </div>

                        <button
                          type="button"
                          onClick={(e) => handlePlayText(opt.en, `opt-${opt.id}`, e)}
                          className="p-1 rounded-lg text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                          aria-label="Audio"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* Footer with Check or Next */}
                <div className="flex items-center justify-end gap-3 pt-3 border-t border-inherit/40">
                  {!isSubmitted ? (
                    <button
                      type="button"
                      disabled={!selectedOptionId}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSubmitCurrentTest();
                      }}
                      className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer flex items-center gap-2 ${
                        selectedOptionId
                          ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md'
                          : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Comprobar</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNextTest();
                      }}
                      className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md transition-all cursor-pointer flex items-center gap-2"
                    >
                      <span>
                        {currentTestIndex < SHOPRIGHT_MASTERY_TESTS.length - 1
                          ? 'Siguiente Test'
                          : 'Ver Resultados'}
                      </span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* BACK: Spanish Translation */}
              <div
                className={`absolute inset-0 w-full h-full min-h-[300px] rounded-2xl border p-5 sm:p-6 flex flex-col justify-between backface-hidden rotate-y-180 shadow-xs transition-colors ${
                  isDark
                    ? 'bg-slate-900 border-indigo-500/40 text-white'
                    : 'bg-white border-indigo-300 text-slate-900'
                }`}
              >
                <div className="flex items-start justify-between gap-3 pb-3 border-b border-inherit/40">
                  <div>
                    <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase">
                      {currentQ.titleEs} · Traducción
                    </span>
                    <h3 className="text-base sm:text-lg font-bold mt-1 leading-snug text-indigo-900 dark:text-indigo-300">
                      {currentQ.questionEs}
                    </h3>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => handlePlayText(currentQ.questionEn, `q-${currentQ.testNumber}`, e)}
                    className="p-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-indigo-600 dark:text-indigo-400"
                    aria-label="Audio"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex flex-col gap-2 py-4">
                  {currentQ.options.map((opt) => (
                    <div
                      key={opt.id}
                      className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs sm:text-sm font-medium"
                    >
                      {opt.es}
                    </div>
                  ))}
                </div>

                <div className="p-3 rounded-xl border border-indigo-300/60 bg-indigo-50/40 dark:bg-indigo-950/20 text-xs sm:text-sm">
                  <span className="font-bold text-indigo-800 dark:text-indigo-400">
                    Explicación:
                  </span>
                  <p className="mt-0.5 text-slate-700 dark:text-slate-300">
                    {currentQ.explanationEs}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
