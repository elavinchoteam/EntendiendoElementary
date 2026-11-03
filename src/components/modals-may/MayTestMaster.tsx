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
import { MODALS_MAY_TESTS, ModalsMayTestItem } from '../../data/modalsMayData';
import { MayScenePlayer } from './MayScenePlayer';
import { ReversibleTextCard } from './ReversibleTextCard';
import { ReversibleOptionChip } from './ReversibleOptionChip';

interface MayTestMasterProps {
  speed?: number;
  accent?: 'US' | 'UK';
  onSuccess?: () => void;
}

export const MayTestMaster: React.FC<MayTestMasterProps> = ({
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

  const currentTestItem: ModalsMayTestItem = MODALS_MAY_TESTS[currentQuestionIdx];
  const selectedAnswer = userAnswers[currentQuestionIdx] || null;

  const handleSpeakTestSentence = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    stopSpeaking();
    speakEnglish(currentTestItem.fullSentence, speed, accent, undefined, undefined, 'female');
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
    if (currentQuestionIdx < MODALS_MAY_TESTS.length - 1) {
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
    MODALS_MAY_TESTS.forEach((item, idx) => {
      const ans = userAnswers[idx];
      if (ans && ans.trim().toLowerCase() === item.correctAnswer.trim().toLowerCase()) {
        correctCount++;
      }
    });

    const finalScore = Math.round((correctCount / MODALS_MAY_TESTS.length) * 100);
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

  // 1. INTRO STATE: Iniciar Test Card
  if (testState === 'intro') {
    return (
      <div className="space-y-6 max-w-4xl mx-auto py-4">
        {/* Intro Card */}
        <div
          className={`p-6 sm:p-10 rounded-3xl border text-center shadow-lg transition-all ${
            isDark ? 'bg-slate-800/90 border-slate-700' : 'bg-white border-slate-200'
          }`}
        >
          <div className="w-16 h-16 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-sky-500 flex items-center justify-center mx-auto mb-4">
            <Award className="w-8 h-8" />
          </div>

          <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-sky-100 text-sky-700 dark:bg-sky-950/70 dark:text-sky-300 mb-2">
            Unidad 9 · Sección 6 · Evaluación Final
          </span>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-3">
            Test: Modals — May
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-xl mx-auto leading-relaxed mb-6">
            Demuestra tu dominio del verbo modal <strong>may</strong> para pedir y conceder permiso cortés, y para expresar posibilidad real en inglés con 5 preguntas interactivas.
          </p>

          {/* Test Guidelines */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto mb-8 text-left">
            <div className={`p-4 rounded-2xl border ${isDark ? 'bg-slate-900/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
              <div className="font-bold text-xs uppercase text-sky-500 mb-1">5 Preguntas</div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Basadas fielmente en las capturas originales del curso.
              </p>
            </div>
            <div className={`p-4 rounded-2xl border ${isDark ? 'bg-slate-900/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
              <div className="font-bold text-xs uppercase text-emerald-500 mb-1">Tarjetas Reversibles</div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Gira la tarjeta para ver la oración completa y su traducción.
              </p>
            </div>
            <div className={`p-4 rounded-2xl border ${isDark ? 'bg-slate-900/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
              <div className="font-bold text-xs uppercase text-purple-500 mb-1">Pronunciación y Audio</div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Audio nativo con control de velocidad para cada opción.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleStartTest}
            className="px-8 py-3.5 rounded-2xl bg-sky-600 hover:bg-sky-500 active:scale-95 text-white font-bold text-sm uppercase tracking-wider shadow-md hover:shadow-sky-500/20 transition-all inline-flex items-center gap-2 cursor-pointer"
          >
            <Play className="w-5 h-5 fill-current" />
            <span>Iniciar Test</span>
          </button>
        </div>
      </div>
    );
  }

  // 2. IN PROGRESS STATE
  if (testState === 'in_progress') {
    const answeredCount = Object.keys(userAnswers).length;
    const canSubmit = answeredCount === MODALS_MAY_TESTS.length;

    return (
      <div className="space-y-6">
        {/* Test Progress Header */}
        <div
          className={`p-4 sm:p-5 rounded-2xl border ${
            isDark ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-200'
          } shadow-sm`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide bg-sky-100 text-sky-700 dark:bg-sky-950/70 dark:text-sky-300">
                  Test · Pregunta {currentQuestionIdx + 1} de {MODALS_MAY_TESTS.length}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {answeredCount} de {MODALS_MAY_TESTS.length} respondidas
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {currentTestItem.instruction}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {currentTestItem.instructionEs}
              </p>
            </div>

            {/* Question Quick Selector Dots */}
            <div className="flex items-center gap-1.5 self-start sm:self-auto">
              {MODALS_MAY_TESTS.map((_, idx) => {
                const isCurrent = idx === currentQuestionIdx;
                const isAnswered = userAnswers[idx] !== undefined;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      playFeedbackSound('click');
                      setCurrentQuestionIdx(idx);
                    }}
                    className={`w-7 h-7 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                      isCurrent
                        ? 'bg-sky-600 text-white ring-2 ring-sky-300 dark:ring-sky-700 scale-105'
                        : isAnswered
                        ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                        : isDark
                        ? 'bg-slate-700 text-slate-400 hover:text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Two Column Layout: Left Scene Player, Right Test Question */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: MayScenePlayer */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <MayScenePlayer speed={speed} accent={accent} />

            <div
              className={`p-4 rounded-2xl border ${
                isDark ? 'bg-slate-800/60 border-slate-700' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-center gap-2 mb-1 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                <Sparkles className="w-3.5 h-3.5 text-sky-500" />
                <span>Consejo para el Test</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Recuerda que <strong>may</strong> se usa para pedir permiso formal (<em>May I...?</em>) o denegarlo (<em>No, you may not</em>), y para expresar posibilidad real con verbo en forma base (<em>may not have</em>, <em>she may be</em>).
              </p>
            </div>
          </div>

          {/* Right Column: Reversible Question Card & Reversible Options */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            {/* Main Reversible Question Card with dynamic height and no overflow */}
            <div
              className={`w-full rounded-2xl border shadow-sm transition-all duration-300 p-5 sm:p-7 min-h-[240px] flex flex-col justify-between ${
                isDark ? 'bg-slate-800/90 border-slate-700' : 'bg-white border-slate-200'
              }`}
            >
              {/* FRONT: Question Exercise with Drop/Click Blank */}
              {!isQuestionFlipped ? (
                <div className="flex-1 flex flex-col justify-between animate-in fade-in duration-200">
                  <div>
                    <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100 dark:border-slate-700">
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        Pregunta {currentQuestionIdx + 1} de {MODALS_MAY_TESTS.length}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={(e) => handleSpeakTestSentence(e)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-sky-500 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                          title="Escuchar oración completa"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            playFeedbackSound('click');
                            setIsQuestionFlipped(true);
                          }}
                          className={`p-1.5 px-2.5 rounded-lg transition-colors flex items-center gap-1.5 text-xs font-semibold cursor-pointer border ${
                            isDark
                              ? 'bg-slate-700 text-slate-200 border-slate-600 hover:bg-slate-600'
                              : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                          title="Voltear para ver la oración completa y traducción en español"
                        >
                          <RotateCw className="w-3.5 h-3.5 text-sky-500" />
                          <span>Ver Reverso / Trad.</span>
                        </button>
                      </div>
                    </div>

                    {/* Dialogue Lines or Single Sentence */}
                    {currentTestItem.dialogueLines ? (
                      <div className="space-y-4 text-base sm:text-lg leading-relaxed font-medium">
                        {currentTestItem.dialogueLines.map((line, idx) => (
                          <div key={idx} className="flex flex-wrap items-center gap-2 text-slate-800 dark:text-slate-100">
                            {line.hasBlank ? (
                              <>
                                <span>{line.beforeBlank}</span>
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
                                  className={`inline-flex items-center justify-center min-w-[130px] sm:min-w-[160px] px-3.5 py-1.5 rounded-xl border-2 border-dashed transition-all cursor-pointer font-bold text-base ${
                                    isDraggingOver
                                      ? 'border-sky-500 bg-sky-500/20 scale-105'
                                      : selectedAnswer
                                      ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300'
                                      : 'border-slate-300 dark:border-slate-600 hover:border-sky-400 bg-slate-50/70 dark:bg-slate-900/50 text-slate-400'
                                  }`}
                                  title={selectedAnswer ? 'Haz clic para remover respuesta' : 'Arrastra aquí la ficha'}
                                >
                                  {selectedAnswer || '_______'}
                                </div>
                                <span>{line.afterBlank}</span>
                              </>
                            ) : (
                              <span>{line.text}</span>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-wrap items-center gap-2 text-base sm:text-lg leading-relaxed font-medium text-slate-800 dark:text-slate-100">
                        <span>{currentTestItem.sentenceBefore}</span>
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
                          className={`inline-flex items-center justify-center min-w-[130px] sm:min-w-[160px] px-3.5 py-1.5 rounded-xl border-2 border-dashed transition-all cursor-pointer font-bold text-base ${
                            isDraggingOver
                              ? 'border-sky-500 bg-sky-500/20 scale-105'
                              : selectedAnswer
                              ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300'
                              : 'border-slate-300 dark:border-slate-600 hover:border-sky-400 bg-slate-50/70 dark:bg-slate-900/50 text-slate-400'
                          }`}
                          title={selectedAnswer ? 'Haz clic para remover respuesta' : 'Arrastra aquí la ficha'}
                        >
                          {selectedAnswer || '_______'}
                        </div>
                        <span>{currentTestItem.sentenceAfter}</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs text-slate-500">
                    <span className="italic">
                      {selectedAnswer
                        ? 'Respuesta seleccionada. Pasa a la siguiente pregunta.'
                        : 'Elige una ficha de abajo para responder'}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        playFeedbackSound('click');
                        setIsQuestionFlipped(true);
                      }}
                      className="text-[11px] text-sky-500 hover:text-sky-600 font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <RotateCw className="w-3 h-3" />
                      <span>Ver reverso / traducción</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* BACK: Full Sentence, Translation & Grammar Explanation */
                <div className="flex-1 flex flex-col justify-between space-y-4 animate-in fade-in duration-200">
                  <div>
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-emerald-100 dark:border-emerald-800/60">
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        Reverso · Oración Completa y Traducción
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={(e) => handleSpeakTestSentence(e)}
                          className="p-1.5 rounded-lg text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                          title="Escuchar oración completa"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            playFeedbackSound('click');
                            setIsQuestionFlipped(false);
                          }}
                          className={`p-1.5 px-2.5 rounded-lg transition-colors flex items-center gap-1.5 text-xs font-semibold cursor-pointer border ${
                            isDark
                              ? 'bg-slate-700 text-emerald-300 border-slate-600 hover:bg-slate-600'
                              : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                          }`}
                          title="Volver a la pregunta del test"
                        >
                          <RotateCw className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Volver a Pregunta</span>
                        </button>
                      </div>
                    </div>

                    {/* English sentence with highlighted correct answer */}
                    <div className="mb-3 p-3.5 rounded-xl bg-sky-50/70 dark:bg-sky-950/30 border border-sky-100 dark:border-sky-900/40">
                      <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-sky-700 dark:text-sky-300 block mb-1">
                        Inglés:
                      </span>
                      <p className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-relaxed">
                        {currentTestItem.sentenceBefore ? (
                          <>
                            <span>{currentTestItem.sentenceBefore} </span>
                            <span className="px-2 py-0.5 rounded-lg bg-emerald-500 text-white font-extrabold shadow-xs">
                              {currentTestItem.correctAnswer}
                            </span>
                            <span> {currentTestItem.sentenceAfter}</span>
                          </>
                        ) : (
                          currentTestItem.fullSentence.split(new RegExp(`(${currentTestItem.correctAnswer})`, 'gi')).map((part, i) =>
                            part.toLowerCase() === currentTestItem.correctAnswer.toLowerCase() ? (
                              <span
                                key={i}
                                className="bg-emerald-500 text-white px-2 py-0.5 rounded-lg font-extrabold shadow-xs"
                              >
                                {part}
                              </span>
                            ) : (
                              <span key={i}>{part}</span>
                            )
                          )
                        )}
                      </p>
                    </div>

                    {/* Spanish Translation */}
                    <div className="mb-3 p-3.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-800/40">
                      <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-emerald-600 dark:text-emerald-400 block mb-1">
                        Traducción al Español:
                      </span>
                      <p className="text-sm sm:text-base font-serif italic text-emerald-950 dark:text-emerald-200 whitespace-pre-line leading-relaxed">
                        {currentTestItem.fullTranslation}
                      </p>
                    </div>

                    {/* Grammar Explanation */}
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        💡 <span className="font-semibold">Explicación:</span> {currentTestItem.grammarNote}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs text-slate-400">
                    <span className="italic">Toca "Volver a Pregunta" para continuar respondiendo</span>
                    <button
                      type="button"
                      onClick={() => {
                        playFeedbackSound('click');
                        setIsQuestionFlipped(false);
                      }}
                      className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1.5 hover:underline cursor-pointer"
                    >
                      <span>Volver a Pregunta</span>
                      <RotateCw className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Reversible Options Pool */}
            <div
              className={`p-4 sm:p-5 rounded-2xl border ${
                isDark ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-200'
              } shadow-sm space-y-3`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Opciones (Haz clic o arrastra para responder · 🔄 para traducir)
                </span>
                <span className="text-xs text-sky-500 font-semibold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  Fichas reversibles con audio
                </span>
              </div>

              <div className="flex flex-wrap gap-2.5 sm:gap-3 pt-1">
                {currentTestItem.chipsData.map((item) => (
                  <ReversibleOptionChip
                    key={item.en}
                    en={item.en}
                    es={item.es}
                    isSelected={selectedAnswer === item.en}
                    onSelect={handleSelectOption}
                    speed={speed}
                    accent={accent}
                  />
                ))}
              </div>
            </div>

            {/* Navigation and Submit Buttons */}
            <div className="flex items-center justify-between gap-3 pt-1">
              <button
                type="button"
                onClick={handlePrevQuestion}
                disabled={currentQuestionIdx === 0}
                className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-all ${
                  currentQuestionIdx === 0
                    ? 'opacity-40 cursor-not-allowed border-slate-200 text-slate-400'
                    : isDark
                    ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                    : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Anterior</span>
              </button>

              <div className="flex items-center gap-2">
                {currentQuestionIdx < MODALS_MAY_TESTS.length - 1 ? (
                  <button
                    type="button"
                    onClick={handleNextQuestion}
                    className="px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-sky-600 hover:bg-sky-500 active:scale-95 text-white flex items-center gap-1.5 shadow-sm transition-all"
                  >
                    <span>Siguiente</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmitTest}
                    disabled={!canSubmit}
                    className={`px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-sm flex items-center gap-1.5 ${
                      !canSubmit
                        ? 'opacity-50 cursor-not-allowed bg-slate-300 dark:bg-slate-700 text-slate-500'
                        : 'bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white animate-pulse'
                    }`}
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Finalizar Test</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 3. RESULTS STATE: Score, Feedback, Detailed Review with Reversible Cards
  return (
    <div className="space-y-8 max-w-4xl mx-auto py-4">
      {/* Score Summary Card */}
      <div
        className={`p-6 sm:p-10 rounded-3xl border text-center shadow-lg transition-all ${
          isDark ? 'bg-slate-800/90 border-slate-700' : 'bg-white border-slate-200'
        }`}
      >
        <div
          className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-extrabold shadow-inner ${
            score >= 80
              ? 'bg-emerald-500/20 text-emerald-500 border-2 border-emerald-500/40'
              : 'bg-rose-500/20 text-rose-500 border-2 border-rose-500/40'
          }`}
        >
          {score}%
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-2">
          {score >= 80 ? '¡Felicitaciones! Has aprobado el test' : 'Sigue practicando'}
        </h2>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-lg mx-auto mb-6">
          {score >= 80
            ? 'Has demostrado un excelente dominio del verbo modal "may" para permiso formal y posibilidad.'
            : 'Revisa las respuestas detalladas a continuación para reforzar tus conocimientos sobre el uso de "may".'}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={handleRetryTest}
            className="px-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-sm transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reintentar Test</span>
          </button>
        </div>
      </div>

      {/* Detailed Review Section for all 5 questions */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-sky-500" />
            <span>Revisión Detallada (5 Preguntas con Tarjetas Reversibles)</span>
          </h3>
          <span className="text-xs text-slate-400">Toca cada tarjeta para voltear</span>
        </div>

        {MODALS_MAY_TESTS.map((item, idx) => {
          const userAns = userAnswers[idx];
          const isCorrect =
            userAns && userAns.trim().toLowerCase() === item.correctAnswer.trim().toLowerCase();

          return (
            <div
              key={item.id}
              className={`p-5 rounded-2xl border transition-all ${
                isDark ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-200'
              } shadow-sm space-y-3`}
            >
              {/* Question Item Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-slate-100 dark:bg-slate-700 font-mono text-xs font-bold flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <span className="font-bold text-sm text-slate-800 dark:text-slate-200">
                    {item.title}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1 ${
                      isCorrect
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-300'
                        : 'bg-rose-100 text-rose-700 dark:bg-rose-950/70 dark:text-rose-300'
                    }`}
                  >
                    {isCorrect ? (
                      <>
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>Correcto</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Incorrecto</span>
                      </>
                    )}
                  </span>
                </div>
              </div>

              {/* Answers Comparison Badges */}
              <div className="flex flex-wrap items-center gap-3 text-xs bg-slate-50 dark:bg-slate-900/60 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                <div>
                  <span className="text-slate-400 font-medium mr-1.5">Tu respuesta:</span>
                  <span
                    className={`font-bold px-2 py-0.5 rounded ${
                      isCorrect
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-200'
                        : 'bg-rose-100 text-rose-800 dark:bg-rose-900/60 dark:text-rose-200'
                    }`}
                  >
                    {userAns || '(Sin responder)'}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 font-medium mr-1.5">Respuesta correcta:</span>
                  <span className="font-bold px-2 py-0.5 rounded bg-sky-100 text-sky-800 dark:bg-sky-900/60 dark:text-sky-200">
                    {item.correctAnswer}
                  </span>
                </div>
              </div>

              {/* 3D Reversible Text Card for Question Review */}
              <ReversibleTextCard
                englishText={item.fullSentence}
                spanishText={item.fullTranslation}
                grammarTip={item.grammarNote}
                speechRate={speed}
                accent={accent}
                frontLabel={`Pregunta ${idx + 1} · Oración Completa`}
                backLabel={`Traducción de Pregunta ${idx + 1}`}
                size="md"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
