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
import { ComparisonTestData } from '../../data/comparisonEqualityData';
import { ComparisonMediaPlayerCard } from './ComparisonMediaPlayerCard';
import { ComparisonReversibleCard } from './ComparisonReversibleCard';
import { speakEnglish, stopSpeaking, playFeedbackSound } from '../../utils/audio';
import { useTheme } from '../../context/ThemeContext';

export interface ComparisonTestActivityProps {
  tests: ComparisonTestData[];
  accent?: 'US' | 'UK';
  speechRate?: number;
  onSuccess?: () => void;
}

export const ComparisonTestActivity: React.FC<ComparisonTestActivityProps> = ({
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

  const handleListenIntro = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSpeakingIntro) {
      stopSpeaking();
      setIsSpeakingIntro(false);
      return;
    }
    stopSpeaking();
    setIsSpeakingIntro(true);
    speakEnglish(
      'Unit Test. Comparison of Adjectives: Equality. Test your knowledge of adjective comparisons of equality with as... as. Answer all 5 test questions.',
      speechRate,
      accent as 'US' | 'UK',
      () => setIsSpeakingIntro(true),
      () => setIsSpeakingIntro(false)
    );
  };

  // Score calculation
  const totalCorrect = tests.filter((t) => submittedAnswers[t.id] && selectedAnswers[t.id] === t.correctAnswerId).length;
  const scorePercent = Math.round((totalCorrect / tests.length) * 100);

  // ---------------------------------------------------------------------------
  // VISTA 1: TARJETA INICIAL CON BOTÓN "Comenzar Test" (Antes de iniciar)
  // Idéntico formato a la sección 5 "Be-Past: Statements" de la Unit 1
  // ---------------------------------------------------------------------------
  if (!isTestStarted) {
    return (
      <div className="w-full max-w-2xl mx-auto flex flex-col items-center gap-6 animate-in fade-in duration-300 py-2">
        <div className="w-full perspective-1000">
          <div
            id="start-test-reversible-card"
            role="button"
            tabIndex={0}
            onClick={() => {
              playFeedbackSound('flip');
              setIsStartCardFlipped((prev) => !prev);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                playFeedbackSound('flip');
                setIsStartCardFlipped((prev) => !prev);
              }
            }}
            className={`grid grid-cols-1 grid-rows-1 w-full rounded-3xl transition-transform duration-700 transform-style-3d cursor-pointer shadow-xl select-none ${
              isStartCardFlipped ? 'rotate-y-180' : ''
            }`}
          >
            {/* FRENTE / FRONT: INGLÉS (Solid background, NO gradients) */}
            <div
              className={`col-start-1 row-start-1 backface-hidden w-full min-h-[380px] sm:min-h-[420px] rounded-3xl p-6 sm:p-8 flex flex-col justify-between border shadow-xl transition-colors duration-200 overflow-hidden ${
                isDark
                  ? 'bg-slate-900 border-indigo-500/30 text-white'
                  : 'bg-white border-indigo-200 text-slate-900 shadow-md'
              }`}
            >
              {/* Card Header */}
              <div className="flex items-center justify-between gap-3 pb-3 border-b border-inherit/40 shrink-0">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                      isDark
                        ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                        : 'bg-indigo-100 text-indigo-800 border border-indigo-200'
                    }`}
                  >
                    <Award className="w-3.5 h-3.5" />
                    Unit Test · {tests.length} Questions
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    id="listen-test-intro-btn"
                    onClick={handleListenIntro}
                    className={`p-2 rounded-xl border transition-all cursor-pointer ${
                      isSpeakingIntro
                        ? 'bg-indigo-600 text-white border-indigo-500 ring-2 ring-indigo-400'
                        : isDark
                        ? 'bg-slate-800/80 hover:bg-slate-700 text-indigo-300 border-white/10'
                        : 'bg-white hover:bg-indigo-50 text-indigo-700 border-slate-200 shadow-xs'
                    }`}
                    aria-label="Audio"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Card Body */}
              <div className="flex-1 my-4 flex flex-col justify-center items-center text-center px-2">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-indigo-600/10 dark:bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-4 shadow-inner">
                  <Award className="w-8 h-8 sm:w-9 sm:h-9" />
                </div>

                <h3 className="text-xl sm:text-2xl font-bold tracking-tight mb-2">
                  Comparison of Adjectives: Equality · Test
                </h3>

                <p className="text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300 max-w-lg mb-4">
                  Test your grammar comprehension and vocabulary with the equality structure "as + adjective + as". Answer all {tests.length} questions.
                </p>

                <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> {tests.length} Questions
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-indigo-500" /> Grammar Mastery
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-500" /> Instant Feedback
                  </span>
                </div>
              </div>

              {/* Card Footer with prominent "Start Test" Button */}
              <div className="pt-4 border-t border-inherit/30 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
                <span className="text-xs text-slate-400 dark:text-slate-500">
                  Press Start Test to begin Test 1
                </span>

                <button
                  type="button"
                  id="start-test-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    stopSpeaking();
                    setIsSpeakingIntro(false);
                    playFeedbackSound('click');
                    setIsTestStarted(true);
                  }}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-base shadow-lg shadow-indigo-600/30 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Play className="w-5 h-5 fill-current" />
                  <span>Start Test</span>
                </button>
              </div>
            </div>

            {/* REVERSO / BACK: ESPAÑOL (Solid background, NO gradients) */}
            <div
              className={`col-start-1 row-start-1 backface-hidden rotate-y-180 w-full min-h-[380px] sm:min-h-[420px] rounded-3xl p-6 sm:p-8 flex flex-col justify-between border shadow-xl transition-colors duration-200 overflow-hidden ${
                isDark
                  ? 'bg-slate-900 border-emerald-500/40 text-white'
                  : 'bg-white border-emerald-300 text-slate-900 shadow-md'
              }`}
            >
              {/* Card Header Back */}
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
                    Evaluación de la Unidad · {tests.length} Tests
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    id="listen-test-intro-btn-back"
                    onClick={handleListenIntro}
                    className={`p-2 rounded-xl border transition-all cursor-pointer ${
                      isSpeakingIntro
                        ? 'bg-indigo-600 text-white border-indigo-500 ring-2 ring-indigo-400'
                        : isDark
                        ? 'bg-slate-800/80 hover:bg-slate-700 text-emerald-300 border-white/10'
                        : 'bg-white hover:bg-emerald-50 text-emerald-700 border-slate-200 shadow-xs'
                    }`}
                    aria-label="Audio"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Card Body Back */}
              <div className="flex-1 my-4 flex flex-col justify-center items-center text-center px-2">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-emerald-600/10 dark:bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-4 shadow-inner">
                  <Award className="w-8 h-8 sm:w-9 sm:h-9" />
                </div>

                <h3 className="text-xl sm:text-2xl font-bold tracking-tight mb-2">
                  Comparación de Adjetivos: Igualdad · Test
                </h3>

                <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-emerald-100/90 max-w-lg mb-4">
                  Pon a prueba tu comprensión gramatical y vocabulario con la estructura de igualdad "as + adjetivo + as" (tan... como). Este test consta de {tests.length} preguntas.
                </p>

                <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> {tests.length} Preguntas
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-emerald-500" /> Dominio Gramatical
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-500" /> Corrección Inmediata
                  </span>
                </div>
              </div>

              {/* Card Footer Back with "Comenzar Test" Button */}
              <div className="pt-4 border-t border-inherit/30 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
                <span className="text-xs text-slate-400 dark:text-slate-500">
                  Presiona Comenzar Test para iniciar el Test 1
                </span>

                <button
                  type="button"
                  id="start-test-btn-back"
                  onClick={(e) => {
                    e.stopPropagation();
                    stopSpeaking();
                    setIsSpeakingIntro(false);
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
    <div className="w-full flex flex-col gap-6 animate-in fade-in duration-300">
      {/* Test Tabs Bar */}
      <div
        className={`w-full p-3 sm:p-4 rounded-2xl border flex flex-wrap items-center justify-between gap-3 ${
          isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex items-center gap-2">
          <span
            className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider ${
              isDark
                ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                : 'bg-indigo-100 text-indigo-700 border border-indigo-200'
            }`}
          >
            Test {activeTestIdx + 1} de {tests.length}
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300">
            Comparison of Adjectives: Equality · Test de Evaluación
          </span>
        </div>

        {/* Question Selector Tabs (1, 2, 3, 4, 5) */}
        <div className="flex items-center gap-2">
          {tests.map((t, idx) => {
            const hasSubmitted = submittedAnswers[t.id];
            const answerIsCorrect = hasSubmitted && selectedAnswers[t.id] === t.correctAnswerId;
            const isActive = activeTestIdx === idx;

            return (
              <button
                key={t.id}
                id={`test-tab-${idx + 1}`}
                type="button"
                onClick={() => {
                  stopSpeaking();
                  playFeedbackSound('click');
                  setActiveTestIdx(idx);
                  setIsTestCompleted(false);
                }}
                className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-center border ${
                  isActive
                    ? 'bg-indigo-600 text-white border-indigo-500 shadow-md ring-2 ring-indigo-400 scale-105'
                    : hasSubmitted
                    ? answerIsCorrect
                      ? 'bg-emerald-600/20 text-emerald-500 border-emerald-500/40 hover:bg-emerald-600/30'
                      : 'bg-rose-600/20 text-rose-500 border-rose-500/40 hover:bg-rose-600/30'
                    : isDark
                    ? 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                    : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                }`}
                title={`Test ${idx + 1}`}
              >
                {idx + 1}
              </button>
            );
          })}

          {Object.keys(submittedAnswers).length > 0 && (
            <button
              type="button"
              onClick={() => setIsTestCompleted(true)}
              className={`ml-2 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                isDark
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
              }`}
            >
              <Award className="w-3.5 h-3.5 text-indigo-500" />
              <span>Resultados</span>
            </button>
          )}
        </div>
      </div>

      {/* COMPLETED RESULTS SCREEN */}
      {isTestCompleted ? (
        <div
          className={`w-full rounded-3xl border p-6 sm:p-10 flex flex-col items-center text-center shadow-xl animate-in zoom-in-95 duration-300 ${
            isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}
        >
          <div className="w-20 h-20 rounded-3xl bg-amber-500/10 dark:bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-500 mb-5 shadow-inner">
            <Award className="w-10 h-10" />
          </div>

          <span
            className={`px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider mb-3 ${
              isDark
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'bg-emerald-100 text-emerald-700 border border-emerald-200'
            }`}
          >
            Test Completado
          </span>

          <h3 className="text-2xl sm:text-3xl font-extrabold mb-2">
            ¡Has completado el Test de Evaluación!
          </h3>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-lg mb-6">
            Puntuación: <span className="font-bold text-indigo-600 dark:text-indigo-400">{totalCorrect} de {tests.length}</span> ({scorePercent}%)
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => {
                setIsTestCompleted(false);
                setActiveTestIdx(0);
              }}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md transition-all cursor-pointer flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Revisar Preguntas</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setSelectedAnswers({});
                setSubmittedAnswers({});
                setIsTestCompleted(false);
                setIsTestStarted(false);
                setIsStartCardFlipped(false);
                setActiveTestIdx(0);
              }}
              className={`px-6 py-2.5 rounded-xl border font-bold text-sm transition-all cursor-pointer flex items-center gap-2 ${
                isDark
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Hacer el Test de Nuevo</span>
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* 1. Reversible Instruction Card (Speaker button only, no flip text, no gradients) */}
          {currentTest && (
            <ComparisonReversibleCard
              id={`test-instruction-card-${currentTest.id}`}
              textEn={currentTest.instructions}
              textEs={currentTest.instructionsEs}
              speechRate={speechRate}
              accent={accent}
              minHeightClass="min-h-[64px]"
            />
          )}

          {/* 2. Main 2-Column Test Layout */}
          {currentTest && (
            <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
              {/* Left: Player + Reference Card */}
              <div className="lg:col-span-5 flex flex-col gap-4">
                <ComparisonMediaPlayerCard
                  audioText={currentTest.referenceText}
                  accent={accent}
                  speechRate={speechRate}
                  durationSeconds={5}
                  imageUrl={currentTest.imageUrl}
                />

                <ComparisonReversibleCard
                  id={`test-ref-card-${currentTest.id}`}
                  textEn={currentTest.referenceText}
                  textEs={currentTest.referenceTextEs}
                  highlights={currentTest.referenceHighlights}
                  speechRate={speechRate}
                  accent={accent}
                  minHeightClass="min-h-[80px]"
                />
              </div>

              {/* Right: Test Question Card */}
              <div className="lg:col-span-7 flex flex-col gap-4">
                <div className="w-full perspective-1000">
                  <div
                    id={`test-dialogue-card-${currentTest.id}`}
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
                    {/* FRONT: Question with blank (Solid card, NO gradients) */}
                    <div
                      className={`col-start-1 row-start-1 backface-hidden w-full min-h-[180px] sm:min-h-[200px] rounded-2xl p-5 sm:p-6 flex flex-col justify-between border ${
                        isDark
                          ? 'bg-slate-900 border-slate-700 text-white'
                          : 'bg-white border-slate-200 text-slate-900'
                      }`}
                    >
                      <div className="flex flex-col gap-3 text-base sm:text-lg leading-relaxed font-medium">
                        {currentTest.dialogueLines.map((line, idx) => {
                          if (!line.hasBlank) {
                            return <p key={idx}>{line.textEn}</p>;
                          }

                          return (
                            <div key={idx} className="flex flex-wrap items-center gap-1.5 py-1">
                              {line.prefix && <span>{line.prefix}</span>}

                              {/* Drop Target Blank */}
                              <div
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                                onClick={(e) => e.stopPropagation()}
                                className={`inline-flex items-center min-w-[130px] sm:min-w-[160px] min-h-[38px] px-3 py-1 rounded-xl border-2 transition-all font-bold ${
                                  placedOption
                                    ? isChecked
                                      ? isCorrect
                                        ? 'bg-emerald-100 dark:bg-emerald-950/60 border-emerald-500 text-emerald-900 dark:text-emerald-200'
                                        : 'bg-rose-100 dark:bg-rose-950/60 border-rose-500 text-rose-900 dark:text-rose-200'
                                      : 'bg-indigo-50 dark:bg-indigo-950/50 border-indigo-500 text-indigo-900 dark:text-indigo-200 shadow-xs'
                                    : isDragOver
                                    ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/30 scale-105'
                                    : isDark
                                    ? 'border-dashed border-slate-600 bg-slate-800/60 text-slate-400'
                                    : 'border-dashed border-slate-300 bg-slate-50 text-slate-400'
                                }`}
                              >
                                {placedOption ? (
                                  <div className="w-full flex items-center justify-between gap-2">
                                    <span>{placedOption.text}</span>
                                    {!isChecked && (
                                      <button
                                        type="button"
                                        onClick={handleRemovePlaced}
                                        className="text-xs opacity-70 hover:opacity-100 font-normal px-1 rounded hover:bg-black/10"
                                      >
                                        ×
                                      </button>
                                    )}
                                  </div>
                                ) : (
                                  <span className="text-xs text-slate-400 italic">___________</span>
                                )}
                              </div>

                              {line.suffix && <span>{line.suffix}</span>}
                            </div>
                          );
                        })}
                      </div>

                      {/* Card Footer: Speaker button only */}
                      <div className="w-full flex items-center justify-end pt-3 border-t border-inherit/40">
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

                    {/* BACK: Spanish Dialogue (Solid card, NO gradients) */}
                    <div
                      className={`col-start-1 row-start-1 backface-hidden rotate-y-180 w-full min-h-[180px] sm:min-h-[200px] rounded-2xl p-5 sm:p-6 flex flex-col justify-between border ${
                        isDark
                          ? 'bg-slate-900 border-slate-700 text-slate-100'
                          : 'bg-white border-slate-200 text-slate-800'
                      }`}
                    >
                      <div className="flex flex-col gap-3 text-base sm:text-lg leading-relaxed font-medium italic">
                        {currentTest.dialogueLines.map((line, idx) => (
                          <p key={idx}>{line.textEs}</p>
                        ))}
                      </div>

                      <div className="w-full flex items-center justify-end pt-3 border-t border-inherit/40">
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

                {/* Options Pills Bank */}
                <div
                  className={`w-full p-4 rounded-2xl border flex flex-wrap items-center justify-center gap-3 shadow-sm ${
                    isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'
                  }`}
                >
                  {currentTest.options.map((opt) => {
                    const isSelected = placedOptionId === opt.id;
                    return (
                      <div
                        key={opt.id}
                        draggable={!isSelected && !isChecked}
                        onDragStart={(e) => handleDragStart(e, opt.id)}
                        onClick={() => handleOptionClick(opt.id)}
                        className={`px-4 py-2.5 rounded-xl font-semibold text-sm sm:text-base transition-all border select-none cursor-pointer shadow-xs ${
                          isSelected
                            ? 'opacity-40 border-dashed border-slate-400 pointer-events-none'
                            : isDark
                            ? 'bg-slate-800 hover:bg-slate-700 text-white border-slate-700 hover:border-indigo-500 hover:scale-105 active:scale-95'
                            : 'bg-slate-50 hover:bg-indigo-50 text-slate-900 border-slate-300 hover:border-indigo-400 hover:scale-105 active:scale-95'
                        }`}
                      >
                        {opt.text}
                      </div>
                    );
                  })}
                </div>

                {/* Test Action Controls */}
                <div className="w-full flex items-center justify-between gap-3 pt-1">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={activeTestIdx === 0}
                      onClick={() => {
                        stopSpeaking();
                        playFeedbackSound('click');
                        setActiveTestIdx((prev) => Math.max(0, prev - 1));
                      }}
                      className={`px-3 py-2 rounded-xl border text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                        activeTestIdx === 0
                          ? 'opacity-40 cursor-not-allowed border-transparent'
                          : isDark
                          ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
                      }`}
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Anterior</span>
                    </button>

                    <button
                      type="button"
                      disabled={activeTestIdx >= tests.length - 1}
                      onClick={() => {
                        stopSpeaking();
                        playFeedbackSound('click');
                        setActiveTestIdx((prev) => Math.min(tests.length - 1, prev + 1));
                      }}
                      className={`px-3 py-2 rounded-xl border text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                        activeTestIdx >= tests.length - 1
                          ? 'opacity-40 cursor-not-allowed border-transparent'
                          : isDark
                          ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
                      }`}
                    >
                      <span>Siguiente</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  {!isChecked ? (
                    <button
                      type="button"
                      disabled={!placedOptionId}
                      onClick={handleCheck}
                      className={`px-6 py-2.5 rounded-xl font-bold text-sm sm:text-base shadow-md transition-all cursor-pointer flex items-center gap-2 ${
                        !placedOptionId
                          ? 'opacity-50 cursor-not-allowed bg-slate-300 dark:bg-slate-800 text-slate-500'
                          : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/30 hover:scale-102 active:scale-98'
                      }`}
                    >
                      <Check className="w-4 h-4" />
                      <span>Comprobar</span>
                    </button>
                  ) : (
                    activeTestIdx < tests.length - 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          stopSpeaking();
                          playFeedbackSound('click');
                          setActiveTestIdx((prev) => prev + 1);
                        }}
                        className="px-6 py-2.5 rounded-xl font-bold text-sm sm:text-base bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/30 transition-all cursor-pointer flex items-center gap-2"
                      >
                        <span>Siguiente Pregunta</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    )
                  )}
                </div>

                {/* Explanation Card */}
                {isChecked && (
                  <div
                    className={`w-full p-4 sm:p-5 rounded-2xl border shadow-md animate-in fade-in duration-300 ${
                      isCorrect
                        ? isDark
                          ? 'bg-slate-900 border-emerald-500/50 text-emerald-100'
                          : 'bg-emerald-50 border-emerald-300 text-emerald-950'
                        : isDark
                        ? 'bg-slate-900 border-rose-500/50 text-rose-100'
                        : 'bg-rose-50 border-rose-300 text-rose-950'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {isCorrect ? (
                        <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="w-6 h-6 text-rose-500 shrink-0 mt-0.5" />
                      )}

                      <div className="flex-1 flex flex-col gap-1.5 text-sm sm:text-base">
                        <span className="font-bold">
                          {isCorrect ? '¡Excelente! Respuesta correcta.' : 'Respuesta incorrecta.'}
                        </span>
                        <p className="text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
                          {currentTest.explanationEs}
                        </p>
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                          {currentTest.explanationEn}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
