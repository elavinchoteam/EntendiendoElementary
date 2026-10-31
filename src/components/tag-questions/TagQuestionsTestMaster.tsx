import React, { useState } from 'react';
import {
  Award,
  Play,
  RotateCcw,
  Check,
  CheckCircle2,
  XCircle,
  Volume2,
  RefreshCw,
  Sparkles,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { playFeedbackSound, speakEnglish, stopSpeaking } from '../../utils/audio';
import { TAG_QUESTIONS_TESTS, TagQuestionsTestItem } from '../../data/tagQuestionsData';
import { TagQuestionsScenePlayer } from './TagQuestionsScenePlayer';
import { ReversibleTextCard } from './ReversibleTextCard';

interface TagQuestionsTestMasterProps {
  speed: number;
  accent?: 'US' | 'UK';
  onSuccess?: () => void;
}

export const TagQuestionsTestMaster: React.FC<TagQuestionsTestMasterProps> = ({
  speed,
  accent = 'US',
  onSuccess,
}) => {
  const { isDark } = useTheme();

  // Test state: 'intro' | 'testing' | 'finished'
  const [testState, setTestState] = useState<'intro' | 'testing' | 'finished'>('intro');
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);

  // User answers: { [questionId]: selectedOptionId }
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [isQuestionChecked, setIsQuestionChecked] = useState(false);

  // Flipped state
  const [isFlipped, setIsFlipped] = useState(false);
  const [flippedOptions, setFlippedOptions] = useState<Record<string, boolean>>({});

  const totalQuestions = TAG_QUESTIONS_TESTS.length;
  const currentQ = TAG_QUESTIONS_TESTS[currentQuestionIdx];

  const handleStartTest = () => {
    stopSpeaking();
    playFeedbackSound('click');
    setUserAnswers({});
    setCurrentQuestionIdx(0);
    setIsQuestionChecked(false);
    setIsFlipped(false);
    setTestState('testing');
  };

  const handleSelectOption = (optId: string) => {
    if (isQuestionChecked) return;
    playFeedbackSound('click');
    setUserAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optId,
    }));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (isQuestionChecked) return;
    const optId = e.dataTransfer.getData('text/plain');
    if (optId) {
      playFeedbackSound('click');
      setUserAnswers((prev) => ({
        ...prev,
        [currentQ.id]: optId,
      }));
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDragStart = (e: React.DragEvent, optId: string) => {
    e.dataTransfer.setData('text/plain', optId);
  };

  const handleToggleOptionFlip = (optId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    playFeedbackSound('click');
    setFlippedOptions((prev) => ({
      ...prev,
      [optId]: !prev[optId],
    }));
  };

  const handlePlayAudio = (textEn: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    stopSpeaking();
    playFeedbackSound('click');
    speakEnglish(textEn, speed, accent, undefined, undefined, 'female');
  };

  const handleCheckQuestion = () => {
    const selected = userAnswers[currentQ.id];
    if (!selected) return;

    const isCorrect = selected === currentQ.correctOptionId;
    playFeedbackSound(isCorrect ? 'correct' : 'wrong');
    setIsQuestionChecked(true);
  };

  const handleNextQuestion = () => {
    stopSpeaking();
    playFeedbackSound('click');
    setIsQuestionChecked(false);
    setIsFlipped(false);

    if (currentQuestionIdx < totalQuestions - 1) {
      setCurrentQuestionIdx((prev) => prev + 1);
    } else {
      setTestState('finished');
      if (onSuccess) onSuccess();
    }
  };

  const handleRestartTest = () => {
    stopSpeaking();
    playFeedbackSound('click');
    setUserAnswers({});
    setCurrentQuestionIdx(0);
    setIsQuestionChecked(false);
    setIsFlipped(false);
    setTestState('intro');
  };

  // Calculate score
  const correctCount = TAG_QUESTIONS_TESTS.reduce((acc, q) => {
    return acc + (userAnswers[q.id] === q.correctOptionId ? 1 : 0);
  }, 0);
  const scorePercent = Math.round((correctCount / totalQuestions) * 100);
  const isPassed = scorePercent >= 70;

  /* =========================================================================
     1. INTRO SCREEN: Tarjeta "Iniciar Test"
     ========================================================================= */
  if (testState === 'intro') {
    return (
      <div className="w-full flex flex-col items-center gap-6 animate-in fade-in duration-200 py-6">
        <ReversibleTextCard
          textEn="Test your understanding of Present Simple Tag Questions. 5 questions with drag and drop options."
          textEs="Evalúa tu comprensión de Tag Questions en Present Simple. 5 preguntas con opciones para arrastrar o hacer clic."
          speed={speed}
          accent={accent}
        />

        <div
          className={`w-full max-w-2xl rounded-3xl border p-6 sm:p-8 flex flex-col items-center text-center shadow-xl transition-all ${
            isDark
              ? 'bg-gradient-to-b from-slate-900 to-slate-950 border-slate-700/80'
              : 'bg-gradient-to-b from-white to-sky-50/40 border-slate-200'
          }`}
        >
          {/* Badge Icon */}
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-sky-500 to-teal-400 text-white flex items-center justify-center shadow-lg shadow-sky-500/25 mb-4 transform hover:scale-110 transition-transform">
            <Award className="w-8 h-8" />
          </div>

          <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 mb-3">
            Evaluación Final &bull; Sección 4
          </span>

          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 mb-2">
            Test: Present Simple &bull; Task Questions
          </h2>

          <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md leading-relaxed mb-6 font-serif">
            Completa las 5 conversaciones seleccionando la <span className="font-semibold text-sky-600 dark:text-sky-400">Tag Question</span> correcta. Cada pregunta cuenta con tarjeta reversible en 3D para ver su traducción completa al español.
          </p>

          {/* Test Stats Grid */}
          <div className="grid grid-cols-3 gap-3 w-full max-w-md mb-8">
            <div className="p-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60">
              <span className="text-[10px] font-mono uppercase text-slate-400 block">Preguntas</span>
              <strong className="text-lg font-bold text-slate-800 dark:text-slate-100">5</strong>
            </div>
            <div className="p-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60">
              <span className="text-[10px] font-mono uppercase text-slate-400 block">Para aprobar</span>
              <strong className="text-lg font-bold text-teal-600 dark:text-teal-400">70%</strong>
            </div>
            <div className="p-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60">
              <span className="text-[10px] font-mono uppercase text-slate-400 block">Traducción</span>
              <strong className="text-lg font-bold text-sky-600 dark:text-sky-400">3D Flip</strong>
            </div>
          </div>

          {/* Start Test Button */}
          <button
            type="button"
            onClick={handleStartTest}
            className="w-full sm:w-auto px-10 py-3.5 rounded-2xl bg-gradient-to-r from-sky-600 to-teal-500 hover:from-sky-500 hover:to-teal-400 text-white font-bold text-base shadow-xl shadow-sky-600/30 hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2.5"
          >
            <Play className="w-5 h-5 fill-current" />
            <span>Iniciar Test</span>
          </button>
        </div>
      </div>
    );
  }

  /* =========================================================================
     2. FINISHED SCREEN: Resultado del Test
     ========================================================================= */
  if (testState === 'finished') {
    return (
      <div className="w-full flex flex-col items-center gap-6 animate-in fade-in duration-200 py-6">
        <div
          className={`w-full max-w-2xl rounded-3xl border p-6 sm:p-8 flex flex-col items-center text-center shadow-xl ${
            isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'
          }`}
        >
          <div
            className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg mb-4 ${
              isPassed
                ? 'bg-emerald-500 text-white shadow-emerald-500/30'
                : 'bg-rose-500 text-white shadow-rose-500/30'
            }`}
          >
            {isPassed ? <CheckCircle2 className="w-9 h-9" /> : <XCircle className="w-9 h-9" />}
          </div>

          <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100 mb-1">
            {isPassed ? '¡Felicitaciones! Has aprobado el Test' : 'Test no superado'}
          </h2>

          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 font-serif">
            {isPassed
              ? 'Has demostrado un excelente dominio de las Tag Questions en Present Simple.'
              : 'Puedes volver a intentar el test para reforzar las reglas de afirmativo y negativo.'}
          </p>

          {/* Score Circle / Box */}
          <div className="flex items-center gap-6 mb-8">
            <div className="flex flex-col items-center p-4 rounded-2xl border border-slate-200 dark:border-slate-800 min-w-[120px]">
              <span className="text-xs font-mono uppercase text-slate-400">Puntaje</span>
              <strong className="text-3xl font-black text-sky-600 dark:text-sky-400">
                {scorePercent}%
              </strong>
            </div>
            <div className="flex flex-col items-center p-4 rounded-2xl border border-slate-200 dark:border-slate-800 min-w-[120px]">
              <span className="text-xs font-mono uppercase text-slate-400">Aciertos</span>
              <strong className="text-3xl font-black text-slate-800 dark:text-slate-100">
                {correctCount} / {totalQuestions}
              </strong>
            </div>
          </div>

          {/* Questions review breakdown */}
          <div className="w-full flex flex-col gap-2 mb-8 text-left">
            <span className="text-xs font-mono font-bold uppercase text-slate-400 px-1">
              Desglose de Preguntas:
            </span>
            {TAG_QUESTIONS_TESTS.map((q, idx) => {
              const isQCorrect = userAnswers[q.id] === q.correctOptionId;
              return (
                <div
                  key={q.id}
                  className={`p-3 rounded-xl border flex items-center justify-between gap-3 text-xs ${
                    isQCorrect
                      ? 'border-emerald-300 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-900 dark:text-emerald-200'
                      : 'border-rose-300 dark:border-rose-800 bg-rose-50/50 dark:bg-rose-950/20 text-rose-900 dark:text-rose-200'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <span className="font-bold">Test {idx + 1}:</span>
                    <span className="truncate">{q.contextLines[0].textEn}</span>
                  </div>
                  <span className="font-bold shrink-0">
                    {isQCorrect ? 'Correcta (+20%)' : `Correcta: "${q.correctAnswerText}"`}
                  </span>
                </div>
              );
            })}
          </div>

          <button
            type="button"
            onClick={handleRestartTest}
            className="px-8 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm shadow-md transition-all cursor-pointer flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reiniciar Test</span>
          </button>
        </div>
      </div>
    );
  }

  /* =========================================================================
     3. TESTING SCREEN: Pregunta activa (1 de 5 a 5 de 5)
     ========================================================================= */
  const selectedOptId = userAnswers[currentQ.id];
  const selectedOpt = currentQ.options.find((o) => o.id === selectedOptId);
  const isCorrect = isQuestionChecked && selectedOptId === currentQ.correctOptionId;
  const isWrong = isQuestionChecked && selectedOptId !== currentQ.correctOptionId;

  return (
    <div className="w-full flex flex-col gap-5 animate-in fade-in duration-200">
      {/* 1. Reversible Instruction Card */}
      <ReversibleTextCard
        textEn={currentQ.instructionEn}
        textEs={currentQ.instructionEs}
        speed={speed}
        accent={accent}
      />

      {/* 2. Main Two-Column Layout */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Scene Player */}
        <div className="lg:col-span-6">
          <TagQuestionsScenePlayer
            speed={speed}
            accent={accent}
            highlightedLineId="turn-1"
            showTranscriptInitially={true}
          />
        </div>

        {/* Right Column: Test Question & Options */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          {/* Header Bar with Step Indicator */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-sky-500/10 text-sky-600 dark:text-sky-400">
                Pregunta {currentQuestionIdx + 1} de {totalQuestions}
              </span>
              <span className="text-xs font-mono font-bold text-slate-500">
                Test {currentQ.testNumber}
              </span>
            </div>

            <button
              type="button"
              onClick={() => {
                playFeedbackSound('click');
                setIsFlipped((prev) => !prev);
              }}
              className="flex items-center gap-1.5 text-xs text-sky-600 dark:text-sky-400 hover:underline cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{isFlipped ? 'Ver en Inglés' : 'Ver Traducción'}</span>
            </button>
          </div>

          {/* Question Card (Reversible 3D) */}
          <div className="w-full perspective-1000 min-h-[160px]">
            <div
              className={`relative w-full h-full min-h-[160px] transition-transform duration-500 transform-style-3d select-none rounded-2xl border ${
                isDark
                  ? 'bg-slate-900 border-slate-700/80 text-slate-100 shadow-md'
                  : 'bg-white border-slate-200 text-slate-900 shadow-md'
              } ${isFlipped ? 'rotate-y-180' : ''}`}
            >
              {/* FRONT: English with Drop Zone Blank */}
              <div className="w-full h-full backface-hidden p-5 flex flex-col justify-between gap-3 rounded-2xl">
                <div className="flex flex-col gap-3">
                  {currentQ.contextLines.map((line, idx) => {
                    if (line.hasBlank) {
                      return (
                        <div
                          key={idx}
                          className="flex items-center flex-wrap gap-2 text-sm sm:text-base font-semibold leading-relaxed"
                        >
                          <span className="text-slate-400">-</span>
                          <span>{line.prefixEn}</span>

                          {/* Drop Zone */}
                          <div
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}
                            onClick={() => {
                              if (!isQuestionChecked && selectedOptId) {
                                setUserAnswers((prev) => {
                                  const updated = { ...prev };
                                  delete updated[currentQ.id];
                                  return updated;
                                });
                              }
                            }}
                            className={`inline-flex items-center justify-center min-w-[120px] sm:min-w-[140px] px-3 py-1 rounded-xl border-2 border-dashed transition-all cursor-pointer ${
                              isQuestionChecked
                                ? isCorrect
                                  ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200 font-bold'
                                  : 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-200 font-bold'
                                : selectedOptId
                                ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/40 text-sky-800 dark:text-sky-200 font-bold shadow-xs'
                                : isDark
                                ? 'border-slate-600 bg-slate-800/60 text-slate-400 hover:border-sky-400'
                                : 'border-slate-300 bg-slate-100/80 text-slate-400 hover:border-sky-400'
                            }`}
                            title={
                              selectedOptId
                                ? 'Haz clic para remover la opción'
                                : 'Arrastra o haz clic en una opción abajo'
                            }
                          >
                            {selectedOpt ? (
                              <span className="animate-in fade-in zoom-in-95">
                                {selectedOpt.textEn}
                              </span>
                            ) : (
                              <span className="text-xs font-mono text-slate-400 tracking-wider">
                                [ ________ ]
                              </span>
                            )}
                          </div>

                          <span>{line.suffixEn}</span>
                        </div>
                      );
                    }

                    return (
                      <div
                        key={idx}
                        className="flex items-baseline gap-2 text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300"
                      >
                        <span className="text-slate-400 font-bold">-</span>
                        <span>{line.textEn}</span>
                      </div>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-inherit/40 text-xs text-slate-400">
                  <span>Selecciona una opción o arrástrala al espacio</span>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() =>
                        handlePlayAudio(
                          currentQ.contextLines.map((l) => l.textEn).join(' ')
                        )
                      }
                      className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-sky-500 hover:text-sky-600 cursor-pointer"
                      title="Escuchar diálogo completo"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        playFeedbackSound('click');
                        setIsFlipped(true);
                      }}
                      className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer"
                      title="Ver traducción completa"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* BACK: Spanish Translation */}
              <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 p-5 flex flex-col justify-between gap-3 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/40 border border-emerald-300 dark:border-emerald-700">
                <div className="flex flex-col gap-3 font-serif">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300 block">
                    Traducción del Test al Español:
                  </span>
                  {currentQ.contextLines.map((line, idx) => (
                    <div
                      key={idx}
                      className="flex items-baseline gap-2 text-sm sm:text-base italic text-emerald-950 dark:text-emerald-100 leading-relaxed"
                    >
                      <span className="text-emerald-500 font-bold">-</span>
                      <span>{line.textEs}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-emerald-300 dark:border-emerald-700/60 text-xs">
                  <span className="text-emerald-700 dark:text-emerald-300">
                    Traducción sin revelar respuesta
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      playFeedbackSound('click');
                      setIsFlipped(false);
                    }}
                    className="p-1.5 rounded-lg border border-emerald-400 bg-white dark:bg-slate-800 text-emerald-700 dark:text-emerald-300 hover:scale-105 cursor-pointer shadow-xs"
                    title="Voltear al frente"
                  >
                    <RefreshCw className="w-3.5 h-3.5 rotate-180" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Options Row */}
          <div
            className={`p-4 rounded-2xl border transition-all ${
              isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-2.5">
              Opciones:
            </span>

            <div className="flex flex-wrap items-center gap-2.5">
              {currentQ.options.map((opt) => {
                const isSelected = selectedOptId === opt.id;
                const isOptFlipped = Boolean(flippedOptions[opt.id]);

                return (
                  <div
                    key={opt.id}
                    draggable={!isQuestionChecked}
                    onDragStart={(e) => handleDragStart(e, opt.id)}
                    onClick={() => handleSelectOption(opt.id)}
                    className={`group px-3.5 py-2 rounded-xl border-2 transition-all cursor-pointer flex items-center gap-2 shadow-xs select-none ${
                      isSelected
                        ? 'border-sky-500 bg-sky-500 text-white shadow-md scale-105 font-bold'
                        : isDark
                        ? 'bg-slate-800 border-slate-700 hover:border-slate-500 text-slate-200 hover:bg-slate-750'
                        : 'bg-white border-slate-300 hover:border-sky-400 text-slate-800 hover:bg-slate-50'
                    }`}
                  >
                    <span className="text-xs sm:text-sm font-medium">
                      {isOptFlipped ? (
                        <span className="italic font-serif text-emerald-200 dark:text-emerald-300">
                          {opt.textEs}
                        </span>
                      ) : (
                        opt.textEn
                      )}
                    </span>

                    <div className="flex items-center gap-0.5 opacity-60 group-hover:opacity-100">
                      <button
                        type="button"
                        onClick={(e) => handleToggleOptionFlip(opt.id, e)}
                        className={`p-1 rounded hover:bg-black/10 ${
                          isSelected ? 'text-white' : 'text-slate-400'
                        }`}
                        title="Ver traducción"
                      >
                        <RefreshCw className="w-3 h-3" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => handlePlayAudio(opt.textEn, e)}
                        className={`p-1 rounded hover:bg-black/10 ${
                          isSelected ? 'text-white' : 'text-sky-500'
                        }`}
                        title="Escuchar audio"
                      >
                        <Volume2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Feedback after checking */}
          {isQuestionChecked && (
            <div
              className={`p-3.5 rounded-2xl border text-xs leading-relaxed animate-in fade-in duration-200 ${
                isCorrect
                  ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-700 text-emerald-900 dark:text-emerald-200'
                  : 'bg-rose-50 dark:bg-rose-950/30 border-rose-300 dark:border-rose-700 text-rose-900 dark:text-rose-200'
              }`}
            >
              <div className="flex items-center gap-2 font-bold mb-1">
                {isCorrect ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>¡Correcto! &ldquo;{currentQ.correctAnswerText}&rdquo;</span>
                  </>
                ) : (
                  <>
                    <span>Respuesta correcta: &ldquo;{currentQ.correctAnswerText}&rdquo;</span>
                  </>
                )}
              </div>
              <p className="font-serif">{currentQ.explanationEs}</p>
            </div>
          )}

          {/* Action Buttons: Comprobar / Siguiente */}
          <div className="w-full flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={() => {
                if (currentQuestionIdx > 0) {
                  stopSpeaking();
                  playFeedbackSound('click');
                  setCurrentQuestionIdx((prev) => prev - 1);
                  setIsQuestionChecked(false);
                  setIsFlipped(false);
                }
              }}
              disabled={currentQuestionIdx === 0}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                currentQuestionIdx === 0
                  ? 'opacity-40 cursor-not-allowed border-transparent text-slate-400'
                  : isDark
                  ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                  : 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Anterior</span>
            </button>

            {!isQuestionChecked ? (
              <button
                type="button"
                onClick={handleCheckQuestion}
                disabled={!selectedOptId}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold shadow-md transition-all cursor-pointer ${
                  !selectedOptId
                    ? 'opacity-50 cursor-not-allowed bg-slate-300 dark:bg-slate-700 text-slate-500'
                    : 'bg-sky-600 hover:bg-sky-500 text-white shadow-sky-600/30 hover:scale-105 active:scale-95'
                }`}
              >
                <Check className="w-4 h-4" />
                <span>Comprobar</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNextQuestion}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold shadow-md bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/30 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <span>{currentQuestionIdx < totalQuestions - 1 ? 'Siguiente Pregunta' : 'Ver Resultados'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
