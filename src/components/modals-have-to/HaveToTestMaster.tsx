import React, { useState, useEffect } from 'react';
import {
  Award,
  CheckCircle,
  XCircle,
  RotateCcw,
  RotateCw,
  Sparkles,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Play,
  Volume2,
  BookOpen,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { speakEnglish, playFeedbackSound, stopSpeaking } from '../../utils/audio';
import { MODALS_HAVE_TO_TESTS, ModalsHaveToTestItem } from '../../data/modalsHaveToData';
import { HaveToScenePlayer } from './HaveToScenePlayer';
import { ReversibleTextCard } from './ReversibleTextCard';
import { ReversibleOptionChip } from './ReversibleOptionChip';

interface HaveToTestMasterProps {
  speed?: number;
  accent?: 'US' | 'UK';
  onSuccess?: () => void;
}

export const HaveToTestMaster: React.FC<HaveToTestMasterProps> = ({
  speed = 1.0,
  accent = 'US',
  onSuccess,
}) => {
  const { isDark } = useTheme();

  // Test states: 'intro' | 'in_progress' | 'results'
  const [testState, setTestState] = useState<'intro' | 'in_progress' | 'results'>('intro');
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isDraggingOver, setIsDraggingOver] = useState<boolean>(false);
  const [isQuestionFlipped, setIsQuestionFlipped] = useState<boolean>(false);

  // Reset flip when question changes or test state changes
  useEffect(() => {
    setIsQuestionFlipped(false);
  }, [currentQuestionIdx, testState]);

  const currentTestItem: ModalsHaveToTestItem = MODALS_HAVE_TO_TESTS[currentQuestionIdx];
  const selectedAnswer = userAnswers[currentQuestionIdx] || null;

  const handleSpeakTestSentence = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    stopSpeaking();
    speakEnglish(currentTestItem.fullSentence, speed, accent, undefined, undefined, 'male');
  };

  const handleStartTest = () => {
    playFeedbackSound('click');
    setTestState('in_progress');
    setCurrentQuestionIdx(0);
    setUserAnswers({});
    setIsSubmitted(false);
  };

  const handleSelectOption = (option: string) => {
    if (isSubmitted) return;
    playFeedbackSound('click');
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestionIdx]: option,
    }));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(false);
    if (isSubmitted) return;
    const chip = e.dataTransfer.getData('text/plain');
    if (chip && currentTestItem.chips.includes(chip)) {
      playFeedbackSound('click');
      setUserAnswers((prev) => ({
        ...prev,
        [currentQuestionIdx]: chip,
      }));
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!isDraggingOver) setIsDraggingOver(true);
  };

  const handleDragLeave = () => {
    setIsDraggingOver(false);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIdx < MODALS_HAVE_TO_TESTS.length - 1) {
      playFeedbackSound('click');
      setCurrentQuestionIdx((prev) => prev + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIdx > 0) {
      playFeedbackSound('click');
      setCurrentQuestionIdx((prev) => prev - 1);
    }
  };

  const handleSubmitTest = () => {
    playFeedbackSound('click');
    let correctCount = 0;
    MODALS_HAVE_TO_TESTS.forEach((item, idx) => {
      const ans = userAnswers[idx];
      if (ans && ans.trim().toLowerCase() === item.correctAnswer.trim().toLowerCase()) {
        correctCount++;
      }
    });

    const finalScore = Math.round((correctCount / MODALS_HAVE_TO_TESTS.length) * 100);
    setScore(finalScore);
    setIsSubmitted(true);
    setTestState('results');

    if (finalScore >= 80) {
      playFeedbackSound('correct');
      onSuccess?.();
    } else {
      playFeedbackSound('wrong');
    }
  };

  const handleRetryTest = () => {
    playFeedbackSound('click');
    setTestState('intro');
    setCurrentQuestionIdx(0);
    setUserAnswers({});
    setIsSubmitted(false);
  };

  const handleSpeakFull = (sentence: string) => {
    stopSpeaking();
    speakEnglish(sentence, speed, accent, undefined, undefined, 'male');
  };

  // 1. INTRO CARD: "Iniciar Test"
  if (testState === 'intro') {
    return (
      <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-300">
        <div
          className={`p-6 sm:p-8 rounded-3xl border text-center shadow-lg ${
            isDark
              ? 'bg-slate-800/95 border-sky-500/30 text-white'
              : 'bg-white border-sky-200 text-slate-800'
          }`}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-sky-100 text-sky-700 dark:bg-sky-950/70 dark:text-sky-300 mb-4">
            <Award className="w-4 h-4 text-sky-500" />
            <span>Examen de Evaluación · Unidad 9 Sección 5</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3">
            Test: Modals (Have To)
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-xl mx-auto leading-relaxed mb-6">
            Pon a prueba tu dominio de la expresión de obligaciones con <strong>have to</strong>, <strong>has to</strong>, <strong>doesn't have to</strong> y <strong>don't have</strong>.
          </p>

          {/* Test Specs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-8 max-w-lg mx-auto text-left">
            <div
              className={`p-3.5 rounded-2xl border ${
                isDark ? 'bg-slate-900/60 border-slate-700' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="text-xs text-slate-400 font-semibold">Preguntas</div>
              <div className="text-lg font-bold text-sky-600 dark:text-sky-400">5 ítems</div>
              <div className="text-[11px] text-slate-500">Selección y arrastre</div>
            </div>

            <div
              className={`p-3.5 rounded-2xl border ${
                isDark ? 'bg-slate-900/60 border-slate-700' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="text-xs text-slate-400 font-semibold">Aprobación</div>
              <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400">80% o más</div>
              <div className="text-[11px] text-slate-500">4 de 5 correctas</div>
            </div>

            <div
              className={`p-3.5 rounded-2xl border ${
                isDark ? 'bg-slate-900/60 border-slate-700' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="text-xs text-slate-400 font-semibold">Traducciones</div>
              <div className="text-lg font-bold text-purple-600 dark:text-purple-400">100% 3D</div>
              <div className="text-[11px] text-slate-500">Tarjetas reversibles</div>
            </div>
          </div>

          {/* Reversible Intro Details Card */}
          <div className="mb-8 max-w-xl mx-auto">
            <ReversibleTextCard
              englishText="Instructions: For each question, drag or click the correct answer into the blank space. You can review your answers before submitting."
              spanishText="Instrucciones: Para cada pregunta, arrastra o haz clic en la respuesta correcta en el espacio en blanco. Puedes revisar tus respuestas antes de enviar."
              speechRate={speed}
              accent={accent}
              frontLabel="Instrucciones en Inglés"
              backLabel="Instrucciones en Español"
              size="sm"
            />
          </div>

          {/* Start Test Button */}
          <button
            type="button"
            onClick={handleStartTest}
            className="px-8 py-3.5 rounded-2xl bg-sky-600 hover:bg-sky-700 active:scale-95 text-white font-bold text-base sm:text-lg shadow-lg hover:shadow-xl hover:shadow-sky-500/20 transition-all inline-flex items-center gap-2.5 cursor-pointer"
          >
            <Play className="w-5 h-5 fill-current" />
            <span>Iniciar Test</span>
          </button>
        </div>
      </div>
    );
  }

  // 2. RESULTS CARD
  if (testState === 'results') {
    const passed = score >= 80;

    return (
      <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-300">
        <div
          className={`p-6 sm:p-8 rounded-3xl border text-center shadow-lg ${
            isDark
              ? 'bg-slate-800/95 border-slate-700 text-white'
              : 'bg-white border-slate-200 text-slate-800'
          }`}
        >
          <div
            className={`w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-4 ${
              passed
                ? 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400'
                : 'bg-amber-100 dark:bg-amber-950/70 text-amber-600 dark:text-amber-400'
            }`}
          >
            {passed ? <Award className="w-10 h-10" /> : <RotateCcw className="w-10 h-10" />}
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold mb-1">
            {passed ? '¡Felicitaciones! Has aprobado el test' : 'Sigue practicando'}
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
            {passed
              ? 'Has demostrado un excelente dominio de las formas de "have to".'
              : 'Revisa las respuestas abajo y vuelve a intentar para mejorar tu puntuación.'}
          </p>

          <div className="inline-flex items-baseline gap-2 px-6 py-3 rounded-2xl bg-sky-50 dark:bg-sky-950/50 border border-sky-200 dark:border-sky-800 mb-8">
            <span className="text-4xl sm:text-5xl font-black text-sky-600 dark:text-sky-400">
              {score}%
            </span>
            <span className="text-sm font-semibold text-slate-500">
              ({MODALS_HAVE_TO_TESTS.filter(
                (item, i) =>
                  userAnswers[i]?.trim().toLowerCase() === item.correctAnswer.trim().toLowerCase()
              ).length} de 5 correctas)
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={handleRetryTest}
              className="px-6 py-3 rounded-xl border border-slate-300 dark:border-slate-600 font-bold text-sm hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Volver a intentar</span>
            </button>
          </div>
        </div>

        {/* Detailed Review of All 5 Questions with Reversible Cards */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-sky-500" />
            <span>Revisión detallada de preguntas y respuestas:</span>
          </h3>

          {MODALS_HAVE_TO_TESTS.map((item, idx) => {
            const userAns = userAnswers[idx];
            const isItemCorrect =
              userAns && userAns.trim().toLowerCase() === item.correctAnswer.trim().toLowerCase();

            return (
              <div
                key={item.id}
                className={`p-5 rounded-2xl border ${
                  isDark ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-200'
                } shadow-xs space-y-3`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Pregunta {idx + 1} de 5
                  </span>
                  <div className="flex items-center gap-1.5">
                    {isItemCorrect ? (
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-300 flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>Correcta</span>
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-700 dark:bg-rose-950/70 dark:text-rose-300 flex items-center gap-1">
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Incorrecta</span>
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-sm font-medium text-slate-800 dark:text-slate-100">
                  <span className="text-slate-400 mr-2">Tu respuesta:</span>
                  <strong className={isItemCorrect ? 'text-emerald-600' : 'text-rose-600'}>
                    {userAns || '(Sin responder)'}
                  </strong>
                  {!isItemCorrect && (
                    <span className="ml-3 text-slate-500">
                      Respuesta correcta: <strong className="text-emerald-600">{item.correctAnswer}</strong>
                    </span>
                  )}
                </div>

                {/* 3D Reversible Card for the Question & Grammar Explanation */}
                <ReversibleTextCard
                  englishText={item.fullSentence}
                  spanishText={item.fullTranslation}
                  grammarTip={item.grammarNote}
                  speechRate={speed}
                  accent={accent}
                  size="sm"
                  frontLabel={`Pregunta ${idx + 1} (Inglés)`}
                  backLabel="Traducción & Regla"
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // 3. IN PROGRESS TEST RUNNER
  const allAnswered = Object.keys(userAnswers).length === MODALS_HAVE_TO_TESTS.length;

  return (
    <div className="space-y-6">
      {/* Top Banner with Test Navigation & Progress */}
      <div
        className={`p-4 sm:p-5 rounded-2xl border ${
          isDark
            ? 'bg-slate-800/80 border-slate-700 text-slate-100'
            : 'bg-white border-slate-200 text-slate-800'
        } shadow-sm`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide bg-sky-100 text-sky-700 dark:bg-sky-950/70 dark:text-sky-300">
                Test en Progreso
              </span>
              <span className="text-xs text-slate-400 font-medium">
                Pregunta {currentQuestionIdx + 1} de {MODALS_HAVE_TO_TESTS.length}
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              {currentTestItem.instruction}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              {currentTestItem.instructionEs} (Arrastra la ficha o haz clic en ella)
            </p>
          </div>

          {/* Question Step Indicator Buttons */}
          <div className="flex items-center gap-1.5 shrink-0">
            {MODALS_HAVE_TO_TESTS.map((_, i) => {
              const isAnswered = Boolean(userAnswers[i]);
              const isCurrent = currentQuestionIdx === i;

              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => setCurrentQuestionIdx(i)}
                  className={`w-7 h-7 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    isCurrent
                      ? 'bg-sky-600 text-white shadow-xs'
                      : isAnswered
                      ? 'bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300'
                      : isDark
                      ? 'bg-slate-700 text-slate-400 hover:bg-slate-600'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                  title={`Ir a pregunta ${i + 1}`}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: HaveToScenePlayer (5 cols on lg) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <HaveToScenePlayer speed={speed} accent={accent} />
        </div>

        {/* Right Column: Question & Options (7 cols on lg) */}
        <div className="lg:col-span-7 flex flex-col gap-5">
          {/* Main Reversible Test Question Card */}
          <div
            className={`p-5 sm:p-7 rounded-2xl border ${
              isDark ? 'bg-slate-800/90 border-slate-700' : 'bg-white border-slate-200'
            } shadow-sm min-h-[240px] flex flex-col justify-between transition-all`}
          >
            {/* Card Header with Question Indicator & Flip Button */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 dark:border-slate-700/60">
              <div className="flex items-center gap-2">
                <span
                  className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                    isQuestionFlipped
                      ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                      : 'bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300'
                  }`}
                >
                  {isQuestionFlipped
                    ? 'Reverso · Oración Completa'
                    : `Pregunta ${currentQuestionIdx + 1} de ${MODALS_HAVE_TO_TESTS.length}`}
                </span>
                <span className="text-xs text-slate-400 font-medium hidden sm:inline">
                  {isQuestionFlipped ? 'Traducción & Regla' : 'Arrastra la respuesta'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {isQuestionFlipped && (
                  <button
                    type="button"
                    onClick={handleSpeakTestSentence}
                    className="p-1.5 rounded-xl border border-sky-200 dark:border-sky-800 text-sky-600 dark:text-sky-400 hover:bg-sky-50 dark:hover:bg-slate-700 text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
                    title="Escuchar oración completa"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Escuchar</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => {
                    playFeedbackSound('click');
                    setIsQuestionFlipped((prev) => !prev);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border ${
                    isDark
                      ? 'bg-slate-700/80 hover:bg-slate-700 text-slate-200 border-slate-600'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                  title={isQuestionFlipped ? 'Volver a la pregunta' : 'Ver reverso con oración completa y traducción'}
                >
                  <RotateCw className="w-3.5 h-3.5 text-sky-500" />
                  <span>{isQuestionFlipped ? 'Volver a la pregunta' : 'Ver reverso (Oración completa)'}</span>
                </button>
              </div>
            </div>

            {/* FRONT FACE: Question sentence with dropzone */}
            {!isQuestionFlipped ? (
              <div className="flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                  {/* If dialogue lines exist */}
                  {currentTestItem.dialogueLines ? (
                    <div className="space-y-3">
                      {currentTestItem.dialogueLines.map((line, idx) => {
                        if (line.hasBlank) {
                          return (
                            <div
                              key={idx}
                              className="flex flex-wrap items-center gap-2 text-base sm:text-lg font-medium text-slate-800 dark:text-slate-100 leading-relaxed"
                            >
                              <span>{line.beforeBlank}</span>

                              {/* DROP ZONE */}
                              <div
                                onDrop={handleDrop}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onClick={() => {
                                  if (selectedAnswer) {
                                    setUserAnswers((prev) => {
                                      const copy = { ...prev };
                                      delete copy[currentQuestionIdx];
                                      return copy;
                                    });
                                  }
                                }}
                                className={`min-w-[130px] sm:min-w-[170px] min-h-[44px] px-3 py-1.5 rounded-xl border-2 border-dashed flex items-center justify-center transition-all cursor-pointer select-none ${
                                  isDraggingOver
                                    ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/40 scale-105'
                                    : selectedAnswer
                                    ? 'border-sky-500 bg-sky-50/90 dark:bg-sky-950/50 text-sky-700 dark:text-sky-300 font-bold'
                                    : 'border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900/50 text-slate-400'
                                }`}
                                title={selectedAnswer ? 'Haz clic para remover la ficha' : 'Arrastra o selecciona una opción aquí'}
                              >
                                {selectedAnswer ? (
                                  <span className="font-bold text-sm sm:text-base">
                                    {selectedAnswer}
                                  </span>
                                ) : (
                                  <span className="text-xs text-slate-400 italic">
                                    [espacio aquí]
                                  </span>
                                )}
                              </div>

                              <span>{line.afterBlank}</span>
                            </div>
                          );
                        }

                        return (
                          <div
                            key={idx}
                            className="text-base sm:text-lg font-medium text-slate-800 dark:text-slate-100 leading-relaxed"
                          >
                            {line.text}
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    /* Single sentence with blank */
                    <div className="flex flex-wrap items-center gap-2 text-base sm:text-lg font-medium text-slate-800 dark:text-slate-100 leading-relaxed">
                      <span>{currentTestItem.sentenceBefore}</span>

                      {/* DROP ZONE */}
                      <div
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onClick={() => {
                          if (selectedAnswer) {
                            setUserAnswers((prev) => {
                              const copy = { ...prev };
                              delete copy[currentQuestionIdx];
                              return copy;
                            });
                          }
                        }}
                        className={`min-w-[130px] sm:min-w-[170px] min-h-[44px] px-3 py-1.5 rounded-xl border-2 border-dashed flex items-center justify-center transition-all cursor-pointer select-none ${
                          isDraggingOver
                            ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/40 scale-105'
                            : selectedAnswer
                            ? 'border-sky-500 bg-sky-50/90 dark:bg-sky-950/50 text-sky-700 dark:text-sky-300 font-bold'
                            : 'border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900/50 text-slate-400'
                        }`}
                        title={selectedAnswer ? 'Haz clic para remover la ficha' : 'Arrastra o selecciona una opción aquí'}
                      >
                        {selectedAnswer ? (
                          <span className="font-bold text-sm sm:text-base">
                            {selectedAnswer}
                          </span>
                        ) : (
                          <span className="text-xs text-slate-400 italic">
                            [espacio aquí]
                          </span>
                        )}
                      </div>

                      <span>{currentTestItem.sentenceAfter}</span>
                    </div>
                  )}
                </div>

                {/* Navigation inside card */}
                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-700/80 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={handlePrevQuestion}
                    disabled={currentQuestionIdx === 0}
                    className={`px-3.5 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                      currentQuestionIdx === 0
                        ? 'opacity-30 cursor-not-allowed border-slate-200 dark:border-slate-700 text-slate-400'
                        : 'border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700'
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Anterior</span>
                  </button>

                  <div className="text-xs text-slate-400">
                    Pregunta {currentQuestionIdx + 1} de {MODALS_HAVE_TO_TESTS.length}
                  </div>

                  {currentQuestionIdx < MODALS_HAVE_TO_TESTS.length - 1 ? (
                    <button
                      type="button"
                      onClick={handleNextQuestion}
                      className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-100 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>Siguiente</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSubmitTest}
                      className="px-4 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
                    >
                      <Award className="w-4 h-4" />
                      <span>Finalizar Test</span>
                    </button>
                  )}
                </div>
              </div>
            ) : (
              /* BACK FACE: Completed Sentence, Translation & Grammar Note */
              <div className="flex-1 flex flex-col justify-between space-y-4 animate-in fade-in duration-200">
                <div className="space-y-4">
                  {/* Full Completed English Sentence */}
                  <div className="p-4 rounded-xl bg-sky-50/70 dark:bg-sky-950/30 border border-sky-100 dark:border-sky-900/40">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-sky-700 dark:text-sky-300 block mb-1.5">
                      Oración Completa (Inglés):
                    </span>
                    <p className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-relaxed">
                      {currentTestItem.sentenceBefore ? (
                        <>
                          <span>{currentTestItem.sentenceBefore} </span>
                          <span className="px-2.5 py-0.5 rounded-lg bg-emerald-500 text-white font-extrabold shadow-xs">
                            {currentTestItem.correctAnswer}
                          </span>
                          <span> {currentTestItem.sentenceAfter}</span>
                        </>
                      ) : (
                        currentTestItem.fullSentence
                      )}
                    </p>
                  </div>

                  {/* Spanish Translation */}
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700/60">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
                      Traducción al Español:
                    </span>
                    <p className="text-base font-semibold text-sky-700 dark:text-sky-300 leading-relaxed">
                      {currentTestItem.fullTranslation}
                    </p>
                  </div>

                  {/* Grammar Note */}
                  {currentTestItem.grammarNote && (
                    <div className="p-3.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/70 dark:border-amber-800/40 text-xs sm:text-sm text-slate-700 dark:text-slate-300 flex items-start gap-2.5">
                      <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-amber-800 dark:text-amber-300 block mb-0.5">
                          Regla gramatical:
                        </span>
                        <span>{currentTestItem.grammarNote}</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-slate-100 dark:border-slate-700/60">
                  <span className="text-xs text-slate-400">
                    Puedes volver a la pregunta para cambiar o verificar tu respuesta.
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      playFeedbackSound('click');
                      setIsQuestionFlipped(false);
                    }}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-sky-600 hover:bg-sky-700 text-white flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                    <span>Volver a la pregunta</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Chips Section with Reversible Option Chips */}
          <div
            className={`p-5 rounded-2xl border ${
              isDark ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-200'
            } shadow-sm`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Opciones disponibles (arrastra, haz clic o toca 🔄 para traducir):
              </span>
              {selectedAnswer && (
                <button
                  type="button"
                  onClick={() => {
                    setUserAnswers((prev) => {
                      const copy = { ...prev };
                      delete copy[currentQuestionIdx];
                      return copy;
                    });
                  }}
                  className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Limpiar</span>
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {currentTestItem.chipsData.map((chipObj, idx) => (
                <ReversibleOptionChip
                  key={idx}
                  en={chipObj.en}
                  es={chipObj.es}
                  isSelected={selectedAnswer === chipObj.en}
                  onSelect={handleSelectOption}
                  speed={speed}
                  accent={accent}
                />
              ))}
            </div>
          </div>

          {/* Bottom Action Bar */}
          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-slate-400">
              {allAnswered
                ? '¡Has respondido todas las preguntas!'
                : `${Object.keys(userAnswers).length} de ${MODALS_HAVE_TO_TESTS.length} respondidas`}
            </span>

            <button
              type="button"
              onClick={handleSubmitTest}
              className="px-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 active:scale-95 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <Award className="w-4 h-4" />
              <span>Entregar y Calificar Test</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
