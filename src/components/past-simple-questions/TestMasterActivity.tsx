import React, { useState, useEffect } from 'react';
import {
  Award,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  HelpCircle,
  FileQuestion,
  Volume2,
  Check,
} from 'lucide-react';
import {
  PAST_SIMPLE_QUESTIONS_TESTS,
  pastQuestionsOfficeImg,
  pastQuestionsCarImg,
  PastSimpleQuestionsTestItem,
  DragDropOption,
} from '../../data/pastSimpleQuestionsData';
import { speakEnglish, stopSpeaking, playFeedbackSound } from '../../utils/audio';
import { useTheme } from '../../context/ThemeContext';
import { SpeedSelector } from './SpeedSelector';
import { ReversibleTextCard } from './ReversibleTextCard';

interface TestMasterActivityProps {
  speed: number;
  onSpeedChange: (speed: number) => void;
  accent?: 'US' | 'UK';
  onComplete?: (score: number) => void;
}

export const TestMasterActivity: React.FC<TestMasterActivityProps> = ({
  speed,
  onSpeedChange,
  accent = 'US',
  onComplete,
}) => {
  const { isDark } = useTheme();

  // Test states: 'intro' | 'testing' | 'finished'
  const [testState, setTestState] = useState<'intro' | 'testing' | 'finished'>('intro');
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);

  // Per-question slot placements: questionIdx -> (string | null)[]
  const [userAnswers, setUserAnswers] = useState<Record<number, (string | null)[]>>({});
  // Per-question check status
  const [checkedQuestions, setCheckedQuestions] = useState<Record<number, boolean>>({});

  const totalQuestions = PAST_SIMPLE_QUESTIONS_TESTS.length;
  const currentTest = PAST_SIMPLE_QUESTIONS_TESTS[currentQuestionIdx];
  const slotCount = currentTest?.slotsCount || 1;
  const isMulti = slotCount > 1;

  const currentSlots = userAnswers[currentQuestionIdx] || Array(slotCount).fill(null);
  const isCurrentChecked = checkedQuestions[currentQuestionIdx] || false;

  const handleStartTest = () => {
    playFeedbackSound('click');
    setUserAnswers({});
    setCheckedQuestions({});
    setCurrentQuestionIdx(0);
    setTestState('testing');
  };

  const handleRestart = () => {
    playFeedbackSound('click');
    setUserAnswers({});
    setCheckedQuestions({});
    setCurrentQuestionIdx(0);
    setTestState('intro');
  };

  // Option selection
  const handleOptionClick = (optId: string) => {
    if (isCurrentChecked) return;
    playFeedbackSound('click');

    const next = [...currentSlots];
    const existingIdx = next.indexOf(optId);

    if (existingIdx !== -1) {
      next[existingIdx] = null;
    } else {
      const firstEmpty = next.findIndex((s) => s === null);
      if (firstEmpty !== -1) {
        next[firstEmpty] = optId;
      } else {
        next[next.length - 1] = optId;
      }
    }

    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestionIdx]: next,
    }));
  };

  const handleRemoveSlot = (slotIdx: number) => {
    if (isCurrentChecked) return;
    playFeedbackSound('click');
    const next = [...currentSlots];
    next[slotIdx] = null;
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestionIdx]: next,
    }));
  };

  const isCurrentCorrect = (): boolean => {
    if (isMulti && currentTest.correctSlotOptionIds) {
      return currentSlots.every(
        (id, idx) => id === currentTest.correctSlotOptionIds![idx]
      );
    }
    return currentSlots[0] === currentTest.correctAnswerId;
  };

  const handleCheckCurrent = () => {
    if (currentSlots.some((s) => s === null)) return;

    const correct = isCurrentCorrect();
    setCheckedQuestions((prev) => ({
      ...prev,
      [currentQuestionIdx]: true,
    }));

    if (correct) {
      playFeedbackSound('correct');
      const fullText = currentTest.dialogueLines.map((l) => l.textEn).join(' ');
      speakEnglish(fullText, speed, accent);
    } else {
      playFeedbackSound('wrong');
    }
  };

  const handleNextQuestion = () => {
    playFeedbackSound('click');
    stopSpeaking();
    if (currentQuestionIdx < totalQuestions - 1) {
      setCurrentQuestionIdx((prev) => prev + 1);
    } else {
      // Finished all questions
      setTestState('finished');
      let scoreCount = 0;
      PAST_SIMPLE_QUESTIONS_TESTS.forEach((t, idx) => {
        const slots = userAnswers[idx] || [];
        if (t.slotsCount && t.slotsCount > 1 && t.correctSlotOptionIds) {
          const pass = slots.every((id, sIdx) => id === t.correctSlotOptionIds![sIdx]);
          if (pass) scoreCount++;
        } else if (slots[0] === t.correctAnswerId) {
          scoreCount++;
        }
      });
      const finalScorePct = Math.round((scoreCount / totalQuestions) * 100);
      if (onComplete) onComplete(finalScorePct);
    }
  };

  const handlePrevQuestion = () => {
    playFeedbackSound('click');
    stopSpeaking();
    if (currentQuestionIdx > 0) {
      setCurrentQuestionIdx((prev) => prev - 1);
    }
  };

  // Calculate results for finished screen
  const calculateScore = () => {
    let score = 0;
    PAST_SIMPLE_QUESTIONS_TESTS.forEach((t, idx) => {
      const slots = userAnswers[idx] || [];
      if (t.slotsCount && t.slotsCount > 1 && t.correctSlotOptionIds) {
        if (slots.every((id, sIdx) => id === t.correctSlotOptionIds![sIdx])) score++;
      } else if (slots[0] === t.correctAnswerId) {
        score++;
      }
    });
    return score;
  };

  const allCurrentSlotsFilled = currentSlots.every((s) => s !== null);

  // Helper to find option by id
  const getOption = (optId: string | null): DragDropOption | undefined => {
    if (!optId) return undefined;
    return currentTest?.options?.find((o) => o.id === optId);
  };

  // 1. INTRO / START CARD
  if (testState === 'intro') {
    return (
      <div className="w-full max-w-2xl mx-auto flex flex-col items-center gap-6 py-8 px-4 animate-in fade-in duration-300">
        <div
          className={`w-full p-6 sm:p-8 rounded-3xl border text-center flex flex-col items-center gap-6 shadow-xl ${
            isDark
              ? 'bg-gradient-to-b from-slate-900 to-slate-950 border-slate-700/80 text-white'
              : 'bg-gradient-to-b from-white to-sky-50/50 border-slate-200 text-slate-800'
          }`}
        >
          <div className="w-20 h-20 rounded-2xl bg-sky-600/10 dark:bg-sky-500/20 text-sky-600 dark:text-sky-400 border border-sky-500/30 flex items-center justify-center shadow-inner">
            <Award className="w-10 h-10 animate-bounce" />
          </div>

          <div className="flex flex-col gap-2">
            <span className="px-3 py-1 rounded-full bg-sky-100 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border border-sky-300 dark:border-sky-800 text-xs font-mono font-bold uppercase tracking-wider mx-auto">
              Evaluación de Sección
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Test: Past Simple Questions
            </h2>
            <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
              Demuestra tu dominio de las preguntas en pasado simple: preguntas con Did, preguntas de sujeto con Who, respuestas cortas y tag questions en 5 ejercicios prácticos.
            </p>
          </div>

          <div className="w-full max-w-sm grid grid-cols-2 gap-3 py-2 text-xs font-mono">
            <div
              className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1 ${
                isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <FileQuestion className="w-4 h-4 text-sky-500" />
              <span className="font-bold text-sm">5 Preguntas</span>
              <span className="opacity-70">Ejercicios de selección</span>
            </div>
            <div
              className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1 ${
                isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <Sparkles className="w-4 h-4 text-emerald-500" />
              <span className="font-bold text-sm">Traducciones</span>
              <span className="opacity-70">Tarjetas reversibles</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleStartTest}
            className="w-full max-w-xs py-3.5 px-6 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white font-extrabold text-base shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Iniciar Test</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  // 2. FINISHED CARD
  if (testState === 'finished') {
    const finalScore = calculateScore();
    const pct = Math.round((finalScore / totalQuestions) * 100);
    const passed = pct >= 70;

    return (
      <div className="w-full max-w-2xl mx-auto flex flex-col items-center gap-6 py-8 px-4 animate-in zoom-in-95 duration-300">
        <div
          className={`w-full p-6 sm:p-8 rounded-3xl border text-center flex flex-col items-center gap-6 shadow-xl ${
            isDark
              ? 'bg-slate-900/90 border-slate-700 text-white'
              : 'bg-white border-slate-200 text-slate-800'
          }`}
        >
          <div
            className={`w-20 h-20 rounded-2xl flex items-center justify-center shadow-inner ${
              passed
                ? 'bg-emerald-500/20 text-emerald-500 border border-emerald-500/40'
                : 'bg-amber-500/20 text-amber-500 border border-amber-500/40'
            }`}
          >
            {passed ? <CheckCircle2 className="w-10 h-10" /> : <HelpCircle className="w-10 h-10" />}
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {passed ? '¡Felicitaciones!' : 'Test Completado'}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Has completado las 5 preguntas del test de Past Simple Questions.
            </p>
          </div>

          <div className="flex items-baseline gap-2 text-4xl sm:text-5xl font-black font-mono">
            <span className={passed ? 'text-emerald-500' : 'text-amber-500'}>{pct}%</span>
            <span className="text-base sm:text-lg font-sans font-medium text-slate-400">
              ({finalScore}/{totalQuestions} correctas)
            </span>
          </div>

          {/* Question Breakdown list */}
          <div className="w-full flex flex-col gap-2.5 max-w-md pt-2">
            {PAST_SIMPLE_QUESTIONS_TESTS.map((t, idx) => {
              const slots = userAnswers[idx] || [];
              let isPass = false;
              if (t.slotsCount && t.slotsCount > 1 && t.correctSlotOptionIds) {
                isPass = slots.every((id, sIdx) => id === t.correctSlotOptionIds![sIdx]);
              } else {
                isPass = slots[0] === t.correctAnswerId;
              }

              return (
                <div
                  key={t.id}
                  className={`p-3 rounded-xl border flex items-center justify-between text-xs font-mono ${
                    isPass
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-800 dark:text-emerald-300'
                      : 'bg-rose-500/10 border-rose-500/30 text-rose-800 dark:text-rose-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-bold">Test {idx + 1}:</span>
                    <span className="font-sans truncate max-w-[200px] sm:max-w-xs">{t.titleEs}</span>
                  </div>
                  {isPass ? (
                    <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Correcto
                    </span>
                  ) : (
                    <span className="font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1">
                      <XCircle className="w-3.5 h-3.5" /> Revisar
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          <button
            type="button"
            onClick={handleRestart}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border font-bold text-sm transition-all cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Repetir Test</span>
          </button>
        </div>
      </div>
    );
  }

  // 3. TESTING MODE (Active Question)
  const dialogueSpanishText = currentTest.dialogueLines.map((l) => l.textEs).join('\n');
  const dialogueAudioText = currentTest.dialogueLines.map((l) => l.textEn).join(' ');

  return (
    <div className="w-full flex flex-col gap-6 animate-in fade-in duration-200">
      {/* Test Top Navigation Bar */}
      <div
        className={`w-full p-4 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
          isDark
            ? 'bg-slate-900/60 border-slate-800 text-white'
            : 'bg-white border-slate-200 text-slate-800 shadow-xs'
        }`}
      >
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-xl bg-amber-500 text-white font-mono font-bold flex items-center justify-center text-sm shadow-xs">
            T
          </span>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold tracking-tight">
                {currentTest.titleEs}
              </h3>
              <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold">
                {currentQuestionIdx + 1} de {totalQuestions}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Arrastra o haz clic en la respuesta correcta. Voltea la tarjeta para ver la traducción.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <SpeedSelector speed={speed} onSpeedChange={onSpeedChange} />
        </div>
      </div>

      {/* Main Grid: Left Video / Reference Image & Right Reversible Question Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (5 cols): Office Scene or Illustration */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div
            className={`rounded-2xl border overflow-hidden shadow-md ${
              isDark ? 'bg-slate-900/90 border-slate-700' : 'bg-slate-900 border-slate-800'
            }`}
          >
            <div className="relative aspect-4/3 w-full bg-slate-950 flex items-center justify-center overflow-hidden">
              <img
                src={currentTest.illustrationUrl || pastQuestionsOfficeImg}
                alt="Context visual"
                className="w-full h-full object-cover select-none"
              />
            </div>

            <div className="p-3 bg-slate-900 text-white flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">Pregunta {currentQuestionIdx + 1} de {totalQuestions}</span>
              <span className="text-sky-400 font-bold">Past Simple: Questions</span>
            </div>
          </div>
        </div>

        {/* Right Column (7 cols): The Reversible Test Question Card */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold uppercase tracking-wider font-mono text-slate-500 dark:text-slate-400">
              Pregunta del Test (Voltea para traducir)
            </h4>
            <span className="text-xs text-slate-400 font-sans">
              {isMulti ? 'Coloca las 3 palabras' : 'Selecciona una opción'}
            </span>
          </div>

          {/* THE TEST QUESTION IS THE REVERSIBLE CARD */}
          <div className="w-full">
            <ReversibleTextCard
              textEn={dialogueAudioText}
              textEs={dialogueSpanishText}
              speed={speed}
              accent={accent}
              minHeightClass="min-h-[160px] sm:min-h-[180px]"
              childrenFront={
                <div className="w-full flex flex-col gap-3 font-medium text-slate-800 dark:text-slate-100 text-sm sm:text-base leading-relaxed py-1">
                  {currentTest.dialogueLines.map((line, lIdx) => {
                    if (line.hasBlank) {
                      return (
                        <div
                          key={lIdx}
                          className="flex flex-wrap items-center gap-x-2 gap-y-2.5"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {line.prefix && <span>{line.prefix}</span>}

                          {/* Render Slot(s) */}
                          {Array.from({ length: slotCount }).map((_, slotIdx) => {
                            const optId = currentSlots[slotIdx];
                            const opt = getOption(optId);
                            const separator = line.slotSeparators
                              ? line.slotSeparators[slotIdx] || ''
                              : '';

                            return (
                              <React.Fragment key={slotIdx}>
                                <div
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    if (opt) handleRemoveSlot(slotIdx);
                                  }}
                                  className={`inline-flex items-center justify-center min-w-[90px] sm:min-w-[120px] h-10 px-3.5 rounded-xl border-2 transition-all select-none cursor-pointer ${
                                    opt
                                      ? isCurrentChecked
                                        ? isCurrentCorrect()
                                          ? 'bg-emerald-500/15 border-emerald-500 text-emerald-700 dark:text-emerald-300 font-bold'
                                          : 'bg-rose-500/15 border-rose-500 text-rose-700 dark:text-rose-300 font-bold'
                                        : 'bg-sky-50 dark:bg-sky-950/40 border-sky-500 text-sky-900 dark:text-sky-200 font-semibold shadow-xs'
                                      : 'bg-slate-100/70 dark:bg-slate-800/60 border-slate-300 dark:border-slate-700 border-dashed hover:border-slate-400'
                                  }`}
                                  title={
                                    opt
                                      ? 'Haz clic para quitar'
                                      : 'Haz clic en una opción abajo'
                                  }
                                >
                                  {opt ? (
                                    <span className="flex items-center gap-1.5 text-sm sm:text-base">
                                      {opt.text}
                                      {isCurrentChecked &&
                                        (isCurrentCorrect() ? (
                                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                                        ) : (
                                          <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                                        ))}
                                    </span>
                                  ) : (
                                    <span className="text-xs text-slate-400 font-mono">
                                      {isMulti
                                        ? `[ espacio ${slotIdx + 1} ]`
                                        : '[ colocar respuesta ]'}
                                    </span>
                                  )}
                                </div>
                                {separator && <span>{separator}</span>}
                              </React.Fragment>
                            );
                          })}

                          {line.suffix && <span>{line.suffix}</span>}
                        </div>
                      );
                    }

                    return (
                      <p key={lIdx} className="text-slate-700 dark:text-slate-300">
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
                      className="text-sm sm:text-base leading-relaxed font-serif italic text-emerald-950 dark:text-emerald-300"
                    >
                      {line.textEs}
                    </p>
                  ))}
                </div>
              }
            />
          </div>

          {/* Option Chips Area */}
          <div
            className={`w-full p-4 rounded-2xl border flex flex-col gap-3 ${
              isDark
                ? 'bg-slate-900/70 border-slate-800'
                : 'bg-white border-slate-200 shadow-xs'
            }`}
          >
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span>Opciones:</span>
              <span>Haz clic para responder</span>
            </div>

            <div className="flex flex-wrap gap-2.5 sm:gap-3">
              {currentTest.options.map((opt) => {
                const isPlaced = currentSlots.includes(opt.id);

                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleOptionClick(opt.id)}
                    disabled={isCurrentChecked}
                    className={`px-4 py-2 rounded-xl text-sm sm:text-base font-semibold border transition-all cursor-pointer select-none ${
                      isPlaced
                        ? 'opacity-40 border-dashed border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800/40 text-slate-400 cursor-not-allowed scale-95'
                        : isDark
                        ? 'bg-slate-800 hover:bg-slate-700 text-white border-slate-700 hover:border-sky-500 hover:shadow-xs active:scale-95'
                        : 'bg-slate-50 hover:bg-sky-50 text-slate-800 border-slate-200 hover:border-sky-300 hover:shadow-xs active:scale-95'
                    }`}
                  >
                    <span>{opt.text}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Actions Bar */}
          <div className="flex items-center justify-between pt-1">
            <button
              type="button"
              onClick={handlePrevQuestion}
              disabled={currentQuestionIdx === 0}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-xs font-mono font-medium transition-colors cursor-pointer ${
                currentQuestionIdx === 0
                  ? 'opacity-40 cursor-not-allowed border-transparent'
                  : isDark
                  ? 'border-slate-700 text-slate-300 hover:bg-slate-800'
                  : 'border-slate-300 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Anterior</span>
            </button>

            <div className="flex items-center gap-2">
              {!isCurrentChecked ? (
                <button
                  type="button"
                  onClick={handleCheckCurrent}
                  disabled={!allCurrentSlotsFilled}
                  className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm shadow-md transition-all cursor-pointer ${
                    allCurrentSlotsFilled
                      ? 'bg-sky-600 hover:bg-sky-500 text-white hover:shadow-lg hover:-translate-y-0.5'
                      : 'bg-slate-300 dark:bg-slate-800 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  <Check className="w-4 h-4" />
                  <span>Comprobar</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNextQuestion}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm shadow-md transition-all cursor-pointer hover:shadow-lg hover:-translate-y-0.5"
                >
                  <span>
                    {currentQuestionIdx < totalQuestions - 1
                      ? 'Siguiente Pregunta'
                      : 'Ver Resultados'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Feedback & Explanation */}
          {isCurrentChecked && (
            <div
              className={`p-4 rounded-xl border flex items-start gap-3 animate-in fade-in duration-200 ${
                isCurrentCorrect()
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-700 text-emerald-900 dark:text-emerald-200'
                  : 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-700 text-rose-900 dark:text-rose-200'
              }`}
            >
              {isCurrentCorrect() ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
              )}
              <div className="flex flex-col gap-1 text-xs sm:text-sm">
                <p className="font-bold">
                  {isCurrentCorrect()
                    ? '¡Correcto!'
                    : 'Incorrecto.'}
                </p>
                <p className="opacity-90">{currentTest.explanationEs}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
