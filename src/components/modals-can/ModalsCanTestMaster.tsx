import React, { useState } from 'react';
import {
  Award,
  Play,
  RotateCcw,
  CheckCircle,
  XCircle,
  ArrowRight,
  Sparkles,
  Trophy,
  Volume2,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { speakEnglish, playFeedbackSound, stopSpeaking } from '../../utils/audio';
import { MODALS_CAN_TEST_QUESTIONS, ModalsCanTestItem } from '../../data/modalsCanData';
import { ModalsCanScenePlayer } from './ModalsCanScenePlayer';
import { ReversibleTextCard } from './ReversibleTextCard';

interface ModalsCanTestMasterProps {
  speed?: number;
  accent?: 'US' | 'UK';
  onSuccess?: () => void;
}

export const ModalsCanTestMaster: React.FC<ModalsCanTestMasterProps> = ({
  speed = 1.0,
  accent = 'US',
  onSuccess,
}) => {
  const { isDark } = useTheme();

  // Test state: 'intro' | 'active' | 'completed'
  const [testPhase, setTestPhase] = useState<'intro' | 'active' | 'completed'>('intro');
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [evaluatedAnswers, setEvaluatedAnswers] = useState<Record<number, boolean>>({});
  const [isQuestionSubmitted, setIsQuestionSubmitted] = useState(false);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const totalQuestions = MODALS_CAN_TEST_QUESTIONS.length;
  const currentQuestion = MODALS_CAN_TEST_QUESTIONS[currentQuestionIdx];

  const handleStartTest = () => {
    playFeedbackSound('click');
    setTestPhase('active');
    setCurrentQuestionIdx(0);
    setUserAnswers({});
    setEvaluatedAnswers({});
    setIsQuestionSubmitted(false);
  };

  const handleSelectChip = (chip: string) => {
    if (isQuestionSubmitted) return;
    playFeedbackSound('click');
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestionIdx]: chip,
    }));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(false);
    if (isQuestionSubmitted) return;
    const chip = e.dataTransfer.getData('text/plain');
    if (chip && currentQuestion.chips.includes(chip)) {
      playFeedbackSound('click');
      setUserAnswers((prev) => ({
        ...prev,
        [currentQuestionIdx]: chip,
      }));
    }
  };

  const handleCheckQuestion = () => {
    const selected = userAnswers[currentQuestionIdx];
    if (!selected) return;

    const isCorrect = selected.trim().toLowerCase() === currentQuestion.correctAnswer.trim().toLowerCase();
    setIsQuestionSubmitted(true);
    setEvaluatedAnswers((prev) => ({
      ...prev,
      [currentQuestionIdx]: isCorrect,
    }));

    if (isCorrect) {
      playFeedbackSound('correct');
      stopSpeaking();
      speakEnglish(currentQuestion.fullSentence, speed, accent, undefined, undefined, 'male');
    } else {
      playFeedbackSound('wrong');
    }
  };

  const handleNextQuestion = () => {
    playFeedbackSound('click');
    stopSpeaking();

    if (currentQuestionIdx < totalQuestions - 1) {
      setCurrentQuestionIdx((prev) => prev + 1);
      setIsQuestionSubmitted(false);
    } else {
      // Completed!
      setTestPhase('completed');
      playFeedbackSound('complete');
      if (onSuccess) onSuccess();
    }
  };

  const handleRestartTest = () => {
    playFeedbackSound('click');
    stopSpeaking();
    setTestPhase('intro');
    setCurrentQuestionIdx(0);
    setUserAnswers({});
    setEvaluatedAnswers({});
    setIsQuestionSubmitted(false);
  };

  const correctCount = Object.values(evaluatedAnswers).filter(Boolean).length;
  const percentage = Math.round((correctCount / totalQuestions) * 100);

  // =====================
  // 1. INTRO / START CARD
  // =====================
  if (testPhase === 'intro') {
    return (
      <div className="space-y-6 max-w-3xl mx-auto">
        <div
          className={`p-8 sm:p-10 rounded-3xl border text-center shadow-lg transition-all ${
            isDark
              ? 'bg-gradient-to-b from-slate-800 to-slate-900 border-slate-700 text-white'
              : 'bg-gradient-to-b from-white to-sky-50/50 border-slate-200 text-slate-800'
          }`}
        >
          <div className="w-20 h-20 mx-auto mb-5 rounded-2xl bg-sky-500/10 border-2 border-sky-500/30 text-sky-500 flex items-center justify-center shadow-inner">
            <Award className="w-10 h-10" />
          </div>

          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-sky-100 text-sky-800 dark:bg-sky-950/70 dark:text-sky-300">
            Evaluación Final · Sección 5
          </span>

          <h2 className="text-2xl sm:text-3xl font-black tracking-tight mt-3 mb-2">
            Test: Modals: Can
          </h2>

          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed mb-6">
            Demuestra tu dominio del verbo modal <span className="font-bold text-sky-600 dark:text-sky-400">can</span> y su forma negativa <span className="font-bold text-sky-600 dark:text-sky-400">can't</span> completando las 5 preguntas del test. Cada pregunta cuenta con tarjeta reversible en 3D para ver su traducción completa al español.
          </p>

          {/* Quick info cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-xl mx-auto mb-8 text-left">
            <div
              className={`p-3.5 rounded-2xl border text-center ${
                isDark ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-200'
              }`}
            >
              <span className="text-xs text-slate-400 block font-medium">Preguntas</span>
              <span className="text-xl font-black text-sky-500">5 ítems</span>
            </div>
            <div
              className={`p-3.5 rounded-2xl border text-center ${
                isDark ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-200'
              }`}
            >
              <span className="text-xs text-slate-400 block font-medium">Formato</span>
              <span className="text-xl font-black text-emerald-500">Drag & Drop</span>
            </div>
            <div
              className={`p-3.5 rounded-2xl border text-center ${
                isDark ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-200'
              }`}
            >
              <span className="text-xs text-slate-400 block font-medium">Traducciones</span>
              <span className="text-xl font-black text-purple-500">3D Flip</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleStartTest}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-sky-500 hover:bg-sky-600 active:scale-95 text-white font-bold text-base shadow-md hover:shadow-lg transition-all inline-flex items-center justify-center gap-2"
          >
            <Play className="w-5 h-5 fill-current" />
            <span>Iniciar Test</span>
          </button>
        </div>
      </div>
    );
  }

  // =====================
  // 2. COMPLETED SUMMARY
  // =====================
  if (testPhase === 'completed') {
    const isPerfect = percentage === 100;
    const isPassed = percentage >= 60;

    return (
      <div className="space-y-6 max-w-2xl mx-auto">
        <div
          className={`p-8 sm:p-10 rounded-3xl border text-center shadow-lg ${
            isDark ? 'bg-slate-800/90 border-slate-700' : 'bg-white border-slate-200'
          }`}
        >
          <div
            className={`w-20 h-20 mx-auto mb-4 rounded-3xl flex items-center justify-center shadow-inner ${
              isPassed
                ? 'bg-emerald-500/10 text-emerald-500 border-2 border-emerald-500/30'
                : 'bg-rose-500/10 text-rose-500 border-2 border-rose-500/30'
            }`}
          >
            {isPassed ? <Trophy className="w-10 h-10" /> : <RotateCcw className="w-10 h-10" />}
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mb-1">
            {isPerfect
              ? '¡Puntuación Perfecta!'
              : isPassed
              ? '¡Excelente Trabajo!'
              : 'Buen intento, practica un poco más'}
          </h2>

          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
            Has completado las 5 preguntas del test de Modals: Can.
          </p>

          {/* Score display */}
          <div className="inline-flex items-baseline gap-2 px-6 py-3 rounded-2xl bg-sky-500/10 border border-sky-500/30 mb-8">
            <span className="text-4xl font-black text-sky-600 dark:text-sky-400">{percentage}%</span>
            <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">
              ({correctCount} de {totalQuestions} correctas)
            </span>
          </div>

          {/* Breakdown summary */}
          <div className="space-y-2 mb-8 text-left">
            {MODALS_CAN_TEST_QUESTIONS.map((q, idx) => {
              const passed = evaluatedAnswers[idx];
              const ans = userAnswers[idx];
              return (
                <div
                  key={idx}
                  className={`p-3 rounded-xl border flex items-center justify-between text-xs font-medium ${
                    passed
                      ? isDark
                        ? 'bg-emerald-950/20 border-emerald-800/60 text-emerald-300'
                        : 'bg-emerald-50 border-emerald-200 text-emerald-800'
                      : isDark
                      ? 'bg-rose-950/20 border-rose-800/60 text-rose-300'
                      : 'bg-rose-50 border-rose-200 text-rose-800'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {passed ? (
                      <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                    ) : (
                      <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                    )}
                    <span>
                      Pregunta {idx + 1}: <span className="font-bold">{ans || 'Sin responder'}</span>
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">
                    Correcta: {q.correctAnswer}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={handleRestartTest}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-600 active:scale-95 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reintentar Test</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // =====================
  // 3. ACTIVE QUESTION
  // =====================
  const selectedChip = userAnswers[currentQuestionIdx];
  const isCorrect = evaluatedAnswers[currentQuestionIdx];

  return (
    <div className="space-y-6">
      {/* Test Header */}
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
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide bg-purple-100 text-purple-700 dark:bg-purple-950/70 dark:text-purple-300">
                Test Evaluativo
              </span>
              <span className="text-xs text-slate-400 font-medium">
                Pregunta {currentQuestionIdx + 1} de {totalQuestions}
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              {currentQuestion.instruction}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              {currentQuestion.instructionEs}
            </p>
          </div>

          {/* Progress dots */}
          <div className="flex items-center gap-1.5">
            {MODALS_CAN_TEST_QUESTIONS.map((_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full transition-all ${
                  i === currentQuestionIdx
                    ? 'bg-sky-500 scale-125'
                    : evaluatedAnswers[i] === true
                    ? 'bg-emerald-500'
                    : evaluatedAnswers[i] === false
                    ? 'bg-rose-500'
                    : isDark
                    ? 'bg-slate-700'
                    : 'bg-slate-200'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main 2-Column Question Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Scene Preview */}
        <div className="lg:col-span-5 space-y-4">
          <ModalsCanScenePlayer speed={speed} accent={accent} compact />
        </div>

        {/* Right Column: Sentence, Chips & 3D Translation */}
        <div className="lg:col-span-7 space-y-5">
          {/* Question Box */}
          <div
            className={`p-6 sm:p-7 rounded-2xl border min-h-[220px] flex flex-col justify-between shadow-sm transition-all ${
              isDark ? 'bg-slate-800/90 border-slate-700' : 'bg-white border-slate-200'
            }`}
          >
            {/* The Text Lines */}
            <div className="space-y-4 text-base sm:text-lg leading-relaxed text-slate-800 dark:text-slate-100 font-medium">
              {currentQuestion.dialogueLines ? (
                currentQuestion.dialogueLines.map((line, idx) => (
                  <div key={idx} className="flex flex-wrap items-center gap-2">
                    {line.text ? (
                      <span>— {line.text}</span>
                    ) : (
                      <>
                        <span>— {line.beforeBlank}</span>

                        {/* Drop Target */}
                        <div
                          onDrop={handleDrop}
                          onDragOver={(e) => {
                            e.preventDefault();
                            setIsDraggingOver(true);
                          }}
                          onDragLeave={() => setIsDraggingOver(false)}
                          onClick={() => selectedChip && !isQuestionSubmitted && setUserAnswers((p) => ({ ...p, [currentQuestionIdx]: '' }))}
                          className={`inline-flex items-center justify-center min-w-[140px] px-3.5 py-1.5 rounded-xl border-2 border-dashed transition-all cursor-pointer font-bold ${
                            selectedChip
                              ? isQuestionSubmitted
                                ? isCorrect
                                  ? 'bg-emerald-500 text-white border-emerald-600 shadow-sm'
                                  : 'bg-rose-500 text-white border-rose-600 shadow-sm animate-shake'
                                : 'bg-sky-500 text-white border-sky-600 shadow-sm'
                              : isDraggingOver
                              ? 'bg-sky-100 dark:bg-sky-950/60 border-sky-500 scale-105'
                              : isDark
                              ? 'bg-slate-700/60 border-slate-600 text-slate-400 hover:border-slate-500'
                              : 'bg-slate-100 border-slate-300 text-slate-400 hover:border-slate-400'
                          }`}
                        >
                          {selectedChip ? (
                            <span>{selectedChip}</span>
                          ) : (
                            <span className="text-xs font-normal italic">suelta aquí</span>
                          )}
                        </div>

                        <span>{line.afterBlank}</span>
                      </>
                    )}
                  </div>
                ))
              ) : (
                <div className="flex flex-wrap items-center gap-2">
                  <span>{currentQuestion.sentenceBefore}</span>

                  {/* Drop Target */}
                  <div
                    onDrop={handleDrop}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDraggingOver(true);
                    }}
                    onDragLeave={() => setIsDraggingOver(false)}
                    onClick={() => selectedChip && !isQuestionSubmitted && setUserAnswers((p) => ({ ...p, [currentQuestionIdx]: '' }))}
                    className={`inline-flex items-center justify-center min-w-[140px] px-3.5 py-1.5 rounded-xl border-2 border-dashed transition-all cursor-pointer font-bold ${
                      selectedChip
                        ? isQuestionSubmitted
                          ? isCorrect
                            ? 'bg-emerald-500 text-white border-emerald-600 shadow-sm'
                            : 'bg-rose-500 text-white border-rose-600 shadow-sm animate-shake'
                          : 'bg-sky-500 text-white border-sky-600 shadow-sm'
                        : isDraggingOver
                        ? 'bg-sky-100 dark:bg-sky-950/60 border-sky-500 scale-105'
                        : isDark
                        ? 'bg-slate-700/60 border-slate-600 text-slate-400 hover:border-slate-500'
                        : 'bg-slate-100 border-slate-300 text-slate-400 hover:border-slate-400'
                    }`}
                  >
                    {selectedChip ? (
                      <span>{selectedChip}</span>
                    ) : (
                      <span className="text-xs font-normal italic">suelta aquí</span>
                    )}
                  </div>

                  <span>{currentQuestion.sentenceAfter}</span>
                </div>
              )}
            </div>

            {/* Evaluation feedback & Next button */}
            {isQuestionSubmitted && (
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-700/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                {isCorrect ? (
                  <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
                    <CheckCircle className="w-5 h-5 shrink-0" />
                    <span>¡Correcto!</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-sm">
                    <XCircle className="w-5 h-5 shrink-0" />
                    <span>Respuesta correcta: {currentQuestion.correctAnswer}</span>
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleNextQuestion}
                  className="px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 active:scale-95 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <span>
                    {currentQuestionIdx < totalQuestions - 1 ? 'Siguiente pregunta' : 'Ver resultados'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Chips Section */}
          <div
            className={`p-5 rounded-2xl border ${
              isDark ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-200'
            } shadow-sm`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Selecciona o arrastra una opción:
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {currentQuestion.chips.map((chip, idx) => {
                const isSelected = selectedChip === chip;
                return (
                  <div
                    key={idx}
                    draggable={!isQuestionSubmitted}
                    onDragStart={(e) => {
                      e.dataTransfer.setData('text/plain', chip);
                    }}
                    onClick={() => handleSelectChip(chip)}
                    className={`px-5 py-2.5 rounded-xl border text-sm sm:text-base font-bold shadow-xs cursor-pointer select-none transition-all transform active:scale-95 ${
                      isSelected
                        ? 'bg-sky-500 text-white border-sky-600 ring-2 ring-sky-300 dark:ring-sky-800'
                        : isDark
                        ? 'bg-slate-700/80 text-slate-100 border-slate-600 hover:bg-slate-700'
                        : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-50 hover:shadow-sm'
                    }`}
                  >
                    {chip}
                  </div>
                );
              })}
            </div>

            {/* Check button */}
            {!isQuestionSubmitted && (
              <div className="mt-5 flex items-center justify-end pt-3 border-t border-slate-100 dark:border-slate-700/60">
                <button
                  type="button"
                  disabled={!selectedChip}
                  onClick={handleCheckQuestion}
                  className={`px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-all flex items-center gap-2 ${
                    !selectedChip
                      ? 'opacity-40 cursor-not-allowed bg-slate-300 dark:bg-slate-700 text-slate-500'
                      : 'bg-sky-500 hover:bg-sky-600 text-white active:scale-95'
                  }`}
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Comprobar respuesta</span>
                </button>
              </div>
            )}
          </div>

          {/* 3D Reversible Flip Card for Test Translation */}
          <div className="space-y-2">
            <ReversibleTextCard
              englishText={currentQuestion.fullSentence}
              spanishText={currentQuestion.fullTranslation}
              grammarTip={currentQuestion.grammarNote}
              speechRate={speed}
              accent={accent}
              speakerGender="male"
              size="md"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
