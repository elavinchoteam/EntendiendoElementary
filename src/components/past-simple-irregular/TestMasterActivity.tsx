import React, { useState, useRef } from 'react';
import {
  Play,
  Pause,
  Check,
  RotateCcw,
  Award,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Volume2,
  VolumeX,
} from 'lucide-react';
import {
  PAST_SIMPLE_IRREGULAR_TESTS,
  PastSimpleIrregularTestItem,
  PAST_SIMPLE_IRREGULAR_REFERENCE,
  pastIrregularOfficeImg,
  DragDropOption,
} from '../../data/pastSimpleIrregularData';
import { speakEnglish, stopSpeaking, playFeedbackSound } from '../../utils/audio';
import { useTheme } from '../../context/ThemeContext';
import { SpeedSelector } from './SpeedSelector';
import { ReversibleTextCard } from './ReversibleTextCard';

interface TestMasterActivityProps {
  speed: number;
  onSpeedChange: (speed: number) => void;
  accent?: 'US' | 'UK';
  onCompleteSection?: () => void;
}

export const TestMasterActivity: React.FC<TestMasterActivityProps> = ({
  speed,
  onSpeedChange,
  accent = 'US',
  onCompleteSection,
}) => {
  const { isDark } = useTheme();

  // testStep: 0 = "Iniciar Test" card; 1..5 = tests 1..5; 6 = Results card
  const [testStep, setTestStep] = useState<number>(0);

  // User answers map: { [testId]: optionId }
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  // Checked questions map: { [testId]: boolean }
  const [checkedQuestions, setCheckedQuestions] = useState<Record<string, boolean>>({});
  // Is test submitted
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Media player state for test questions
  const [isPlayingMedia, setIsPlayingMedia] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const duration = PAST_SIMPLE_IRREGULAR_REFERENCE.durationSeconds;
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const clearTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleTogglePlayMedia = () => {
    if (isPlayingMedia) {
      stopSpeaking();
      setIsPlayingMedia(false);
      clearTimer();
      return;
    }

    stopSpeaking();
    clearTimer();
    playFeedbackSound('click');
    setIsPlayingMedia(true);
    setElapsedSeconds(0);

    const stepMs = Math.round(1000 / speed);
    let currentSec = 0;
    timerRef.current = setInterval(() => {
      currentSec += 1;
      setElapsedSeconds(currentSec);
      if (currentSec >= duration) {
        clearTimer();
      }
    }, stepMs);

    if (!isMuted) {
      speakEnglish(
        PAST_SIMPLE_IRREGULAR_REFERENCE.audioText,
        speed,
        accent,
        () => setIsPlayingMedia(true),
        () => {
          setIsPlayingMedia(false);
          clearTimer();
          setElapsedSeconds(duration);
        }
      );
    } else {
      setTimeout(() => {
        setIsPlayingMedia(false);
        clearTimer();
      }, (duration * 1000) / speed);
    }
  };

  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const pct = Math.max(0, Math.min(1, clickX / rect.width));
    const newSec = Math.round(pct * duration);
    setElapsedSeconds(newSec);
  };

  // Start the test from Step 0
  const handleStartTest = () => {
    playFeedbackSound('click');
    stopSpeaking();
    setTestStep(1);
  };

  // Select an option for current question
  const currentTestIndex = testStep - 1; // 0..4
  const currentTest: PastSimpleIrregularTestItem | undefined =
    PAST_SIMPLE_IRREGULAR_TESTS[currentTestIndex];

  const handleSelectOption = (optId: string) => {
    if (!currentTest) return;
    if (checkedQuestions[currentTest.id]) return; // locked once checked
    playFeedbackSound('click');
    setUserAnswers((prev) => ({ ...prev, [currentTest.id]: optId }));
  };

  const handleRemoveOption = () => {
    if (!currentTest) return;
    if (checkedQuestions[currentTest.id]) return;
    playFeedbackSound('click');
    setUserAnswers((prev) => {
      const copy = { ...prev };
      delete copy[currentTest.id];
      return copy;
    });
  };

  // Check current question
  const handleCheckCurrent = () => {
    if (!currentTest) return;
    const chosen = userAnswers[currentTest.id];
    if (!chosen) return;

    const isCorrect = chosen === currentTest.correctAnswerId;
    setCheckedQuestions((prev) => ({ ...prev, [currentTest.id]: true }));
    if (isCorrect) {
      playFeedbackSound('correct');
    } else {
      playFeedbackSound('wrong');
    }
  };

  // Navigation between questions
  const handleNextQuestion = () => {
    playFeedbackSound('click');
    stopSpeaking();
    clearTimer();
    setIsPlayingMedia(false);
    setElapsedSeconds(0);

    if (testStep < 5) {
      setTestStep((prev) => prev + 1);
    } else {
      // Go to results step (6)
      setIsSubmitted(true);
      setTestStep(6);
      if (onCompleteSection) onCompleteSection();
    }
  };

  const handlePrevQuestion = () => {
    if (testStep > 1) {
      playFeedbackSound('click');
      stopSpeaking();
      clearTimer();
      setIsPlayingMedia(false);
      setElapsedSeconds(0);
      setTestStep((prev) => prev - 1);
    }
  };

  const handleRestartTest = () => {
    playFeedbackSound('click');
    stopSpeaking();
    clearTimer();
    setUserAnswers({});
    setCheckedQuestions({});
    setIsSubmitted(false);
    setTestStep(0);
  };

  // Calculate score
  const correctCount = PAST_SIMPLE_IRREGULAR_TESTS.filter(
    (t) => userAnswers[t.id] === t.correctAnswerId
  ).length;
  const scorePercent = Math.round((correctCount / PAST_SIMPLE_IRREGULAR_TESTS.length) * 100);

  /* -------------------------------------------------------------
   * STEP 0: Iniciar Test Card
   * ------------------------------------------------------------- */
  if (testStep === 0) {
    return (
      <div className="w-full flex flex-col items-center gap-6 animate-in fade-in duration-300">
        <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden p-6 sm:p-10 text-center flex flex-col items-center gap-6">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-sky-500/25">
            <Award className="w-10 h-10" />
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
              Evaluación Final · Sección 6
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Test de Pasado Simple: Verbos Irregulares
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-lg mt-1">
              Pon a prueba tus conocimientos sobre los verbos irregulares en pasado simple (formas afirmativas y negativas como bought, forgot, didn't find, didn't leave).
            </p>
          </div>

          <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
            <div className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
              <span className="text-[10px] font-semibold text-slate-400 uppercase">Preguntas</span>
              <p className="text-base font-bold text-slate-800 dark:text-slate-200">5 Ejercicios</p>
            </div>
            <div className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
              <span className="text-[10px] font-semibold text-slate-400 uppercase">Modalidad</span>
              <p className="text-base font-bold text-slate-800 dark:text-slate-200">Arrastre y Opción</p>
            </div>
            <div className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
              <span className="text-[10px] font-semibold text-slate-400 uppercase">Traducciones</span>
              <p className="text-base font-bold text-slate-800 dark:text-slate-200">Bilingüe EN / ES</p>
            </div>
          </div>

          <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={handleStartTest}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-bold text-sm sm:text-base shadow-lg shadow-sky-600/30 hover:scale-[1.02] active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Iniciar Test</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* -------------------------------------------------------------
   * STEP 6: Results Card
   * ------------------------------------------------------------- */
  if (testStep === 6) {
    const isPerfect = correctCount === 5;
    const isPassing = correctCount >= 4;

    return (
      <div className="w-full flex flex-col items-center gap-6 animate-in fade-in duration-300">
        <div className="w-full max-w-3xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden p-6 sm:p-10 flex flex-col items-center gap-6">
          <div
            className={`w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg ${
              isPassing
                ? 'bg-gradient-to-tr from-emerald-500 to-teal-600 text-white shadow-emerald-500/25'
                : 'bg-gradient-to-tr from-amber-500 to-rose-600 text-white shadow-rose-500/25'
            }`}
          >
            <Award className="w-10 h-10" />
          </div>

          <div className="text-center flex flex-col gap-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Resultados de la Evaluación
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {isPerfect
                ? '¡Puntuación Perfecta!'
                : isPassing
                ? '¡Gran Trabajo!'
                : '¡Sigue Practicando!'}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Has completado los 5 tests de la Sección 6: Past Simple: Irregular Verbs.
            </p>
          </div>

          {/* Score Circle / Badge */}
          <div className="flex items-center gap-6 py-4 px-8 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
            <div className="text-center">
              <span className="text-3xl sm:text-4xl font-extrabold text-sky-600 dark:text-sky-400">
                {correctCount} / 5
              </span>
              <p className="text-[11px] font-semibold text-slate-400 uppercase mt-0.5">Aciertos</p>
            </div>
            <div className="w-px h-10 bg-slate-200 dark:bg-slate-700" />
            <div className="text-center">
              <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
                {scorePercent}%
              </span>
              <p className="text-[11px] font-semibold text-slate-400 uppercase mt-0.5">Precisión</p>
            </div>
          </div>

          {/* Question Breakdown List */}
          <div className="w-full flex flex-col gap-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 text-left">
              Desglose de Preguntas:
            </h3>
            {PAST_SIMPLE_IRREGULAR_TESTS.map((test, idx) => {
              const selectedOptId = userAnswers[test.id];
              const isCorrect = selectedOptId === test.correctAnswerId;
              const selectedOpt = test.options.find((o) => o.id === selectedOptId);
              const correctOpt = test.options.find((o) => o.id === test.correctAnswerId);

              return (
                <div
                  key={test.id}
                  className={`p-3.5 rounded-xl border text-left flex flex-col gap-2 ${
                    isCorrect
                      ? 'bg-emerald-500/5 border-emerald-500/30 text-emerald-950 dark:text-emerald-200'
                      : 'bg-rose-500/5 border-rose-500/30 text-rose-950 dark:text-rose-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold">
                      Pregunta {idx + 1}: {test.titleEs}
                    </span>
                    {isCorrect ? (
                      <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Correcta
                      </span>
                    ) : (
                      <span className="text-xs font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1">
                        <XCircle className="w-3.5 h-3.5" /> Incorrecta
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-300">
                    Tu respuesta:{' '}
                    <strong className={isCorrect ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}>
                      {selectedOpt ? selectedOpt.text : 'Ninguna'}
                    </strong>
                    {!isCorrect && (
                      <span className="ml-2">
                        (Correcta: <strong className="text-emerald-600 dark:text-emerald-400">{correctOpt?.text}</strong>)
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] opacity-80">{test.explanationEs}</p>
                </div>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={handleRestartTest}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-sm transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reiniciar Test</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* -------------------------------------------------------------
   * STEPS 1..5: Active Test Question
   * ------------------------------------------------------------- */
  if (!currentTest) return null;

  const currentAnswerId = userAnswers[currentTest.id];
  const isQuestionChecked = checkedQuestions[currentTest.id] || false;
  const isQuestionCorrect = currentAnswerId === currentTest.correctAnswerId;
  const chosenOption = currentTest.options.find((o) => o.id === currentAnswerId);

  // Reversible target sentence for this question
  const blankLine = currentTest.dialogueLines.find((l) => l.hasBlank);
  const fullSentenceEn = blankLine?.textEn || '';
  const fullSentenceEs = blankLine?.textEs || '';

  return (
    <div className="w-full flex flex-col gap-6 animate-in fade-in duration-300">
      {/* Test Header & Step Indicator */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-sky-500 text-white font-mono font-bold text-xs flex items-center justify-center">
            {testStep}/5
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              {currentTest.title}: {currentTest.titleEs}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Drag the correct answer/s into place.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="text-xs font-medium text-slate-400 dark:text-slate-500">
            Velocidad:
          </span>
          <SpeedSelector currentSpeed={speed} onSpeedChange={onSpeedChange} />
        </div>
      </div>

      {/* 2-Column Main Test Layout */}
      <div className="flex flex-col lg:flex-row items-stretch gap-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
        {/* LEFT COLUMN: Video Player & Reference Dialogue */}
        <div className="w-full lg:w-1/2 p-4 sm:p-6 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40">
          <div className="flex flex-col gap-4">
            {/* Video Container */}
            <div className="relative w-full rounded-xl overflow-hidden bg-slate-800 shadow-md border border-slate-700/80 flex flex-col">
              <div className="relative aspect-video w-full bg-[#00A896] overflow-hidden flex items-center justify-center">
                <img
                  src={pastIrregularOfficeImg}
                  alt="David at work"
                  className="w-full h-full object-cover"
                />

                {!isPlayingMedia && (
                  <button
                    type="button"
                    onClick={handleTogglePlayMedia}
                    className="absolute inset-0 flex items-center justify-center bg-black/25 hover:bg-black/35 transition-all cursor-pointer group"
                    aria-label="Reproducir video de referencia"
                  >
                    <div className="w-14 h-14 rounded-full bg-white/90 text-slate-900 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 fill-current ml-0.5 text-sky-600" />
                    </div>
                  </button>
                )}
              </div>

              {/* Video Controls Bar */}
              <div className="p-2.5 bg-slate-800 border-t border-slate-700 flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleTogglePlayMedia}
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label={isPlayingMedia ? 'Pausar' : 'Reproducir'}
                >
                  {isPlayingMedia ? (
                    <Pause className="w-4 h-4 fill-current text-sky-400" />
                  ) : (
                    <Play className="w-4 h-4 fill-current text-slate-200" />
                  )}
                </button>

                <div
                  onClick={handleTimelineClick}
                  className="relative flex-1 h-3 flex items-center cursor-pointer group py-1"
                >
                  <div className="w-full h-1.5 bg-slate-600 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-sky-500 rounded-full transition-all duration-150"
                      style={{
                        width: `${Math.min(100, (elapsedSeconds / duration) * 100)}%`,
                      }}
                    />
                  </div>
                </div>

                <div className="text-[11px] font-mono font-medium text-slate-300 shrink-0">
                  {formatTime(elapsedSeconds)} / {formatTime(duration)}
                </div>

                <button
                  type="button"
                  onClick={() => setIsMuted((prev) => !prev)}
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label={isMuted ? 'Activar sonido' : 'Silenciar'}
                >
                  {isMuted ? (
                    <VolumeX className="w-3.5 h-3.5 text-rose-400" />
                  ) : (
                    <Volume2 className="w-3.5 h-3.5 text-slate-300" />
                  )}
                </button>

                <SpeedSelector currentSpeed={speed} onSpeedChange={onSpeedChange} />
              </div>
            </div>

            {/* Reference Highlight Dialogue Box */}
            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-black/20 flex flex-col gap-1.5">
              <div className="text-sm leading-relaxed space-y-1">
                <p>
                  - Hey, Where{' '}
                  <span className="inline-block bg-sky-200 dark:bg-sky-500/30 text-sky-950 dark:text-sky-200 px-1 py-0.5 rounded font-bold border border-sky-300/40">
                    did
                  </span>{' '}
                  David{' '}
                  <span className="inline-block bg-amber-200 dark:bg-amber-500/30 text-amber-950 dark:text-amber-200 px-1 py-0.5 rounded font-bold border border-amber-300/40">
                    go
                  </span>
                  ?
                </p>
                <p>
                  - Oh, he{' '}
                  <span className="inline-block bg-sky-200 dark:bg-sky-500/30 text-sky-950 dark:text-sky-200 px-1 py-0.5 rounded font-bold border border-sky-300/40">
                    left
                  </span>{' '}
                  early because he{' '}
                  <span className="inline-block bg-sky-200 dark:bg-sky-500/30 text-sky-950 dark:text-sky-200 px-1 py-0.5 rounded font-bold border border-sky-300/40">
                    had
                  </span>{' '}
                  a headache and he{' '}
                  <span className="inline-block bg-sky-200 dark:bg-sky-500/30 text-sky-950 dark:text-sky-200 px-1 py-0.5 rounded font-bold border border-sky-300/40">
                    gave
                  </span>{' '}
                  me all his work!
                </p>
              </div>
            </div>
          </div>

          <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-3 flex items-center justify-between">
            <span>Modelo de referencia en video</span>
            <span className="font-mono">Pregunta {testStep} de 5</span>
          </div>
        </div>

        {/* RIGHT COLUMN: Question Blank, Options, Check & Navigation */}
        <div className="w-full lg:w-1/2 p-4 sm:p-6 flex flex-col justify-between gap-6">
          <div className="flex flex-col gap-5">
            {/* Optional Illustration */}
            {currentTest.illustrationUrl && (
              <div className="w-full flex justify-center py-1">
                <img
                  src={currentTest.illustrationUrl}
                  alt="Context illustration"
                  className="max-h-36 rounded-lg object-contain shadow-xs border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                />
              </div>
            )}

            {/* Test Dialogue with Blank */}
            <div className="flex flex-col gap-3 font-medium text-slate-800 dark:text-slate-100 text-sm sm:text-base leading-relaxed">
              {currentTest.dialogueLines.map((line, idx) => {
                if (line.hasBlank) {
                  return (
                    <div key={idx} className="flex flex-wrap items-center gap-x-2 gap-y-2.5">
                      {line.prefix && <span>{line.prefix}</span>}

                      {/* Drop / Selected Blank */}
                      <div
                        onClick={chosenOption ? handleRemoveOption : undefined}
                        className={`inline-flex items-center justify-center min-w-[130px] sm:min-w-[150px] h-10 px-4 rounded-xl border-2 transition-all select-none cursor-pointer ${
                          chosenOption
                            ? isQuestionChecked
                              ? isQuestionCorrect
                                ? 'bg-emerald-500/15 border-emerald-500 text-emerald-700 dark:text-emerald-300 font-bold'
                                : 'bg-rose-500/15 border-rose-500 text-rose-700 dark:text-rose-300 font-bold animate-shake'
                              : 'bg-sky-50 dark:bg-sky-950/40 border-sky-500 text-sky-900 dark:text-sky-200 font-semibold shadow-xs'
                            : 'bg-slate-100/70 dark:bg-slate-800/60 border-slate-300 dark:border-slate-700 border-dashed hover:border-slate-400'
                        }`}
                        title={chosenOption ? 'Haz clic para quitar' : 'Selecciona una opción abajo'}
                      >
                        {chosenOption ? (
                          <span className="flex items-center gap-1.5 text-sm sm:text-base">
                            {chosenOption.text}
                            {isQuestionChecked && (
                              isQuestionCorrect ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                              ) : (
                                <XCircle className="w-4 h-4 text-rose-500" />
                              )
                            )}
                          </span>
                        ) : (
                          <span className="text-xs text-slate-400 font-mono">
                            [ colocar respuesta ]
                          </span>
                        )}
                      </div>

                      {line.suffix && <span>{line.suffix}</span>}
                    </div>
                  );
                }

                return (
                  <p key={idx} className="text-slate-700 dark:text-slate-300">
                    {line.textEn}
                  </p>
                );
              })}
            </div>

            {/* Separator */}
            <div className="w-full border-t border-slate-200 dark:border-slate-800 my-1" />

            {/* Option Chips */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Opciones disponibles:
              </span>
              <div className="flex flex-wrap gap-2.5">
                {currentTest.options.map((opt) => {
                  const isSelected = currentAnswerId === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => handleSelectOption(opt.id)}
                      disabled={isQuestionChecked}
                      className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all cursor-pointer select-none active:scale-95 ${
                        isSelected
                          ? isQuestionChecked
                            ? isQuestionCorrect
                              ? 'bg-emerald-600 text-white border-emerald-600'
                              : 'bg-rose-600 text-white border-rose-600'
                            : 'bg-sky-600 text-white border-sky-600 shadow-md scale-105'
                          : isDark
                          ? 'bg-slate-800 hover:bg-slate-700 text-slate-100 border-slate-700'
                          : 'bg-white hover:bg-sky-50 text-slate-800 border-slate-300'
                      }`}
                    >
                      {opt.text}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Full Reversible Card of the question */}
            <div className="mt-2">
              <ReversibleTextCard
                textEn={fullSentenceEn}
                textEs={fullSentenceEs}
                speed={speed}
                accent={accent}
                minHeightClass="min-h-[64px]"
              />
            </div>

            {/* Feedback / Explanation Box */}
            {isQuestionChecked && (
              <div
                className={`p-4 rounded-xl border animate-in fade-in zoom-in-95 duration-200 ${
                  isQuestionCorrect
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-950 dark:text-emerald-200'
                    : 'bg-rose-500/10 border-rose-500/30 text-rose-950 dark:text-rose-200'
                }`}
              >
                <div className="flex items-start gap-3">
                  {isQuestionCorrect ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1 flex flex-col gap-1 text-xs sm:text-sm">
                    <p className="font-bold">
                      {isQuestionCorrect ? '¡Correcto!' : 'Respuesta Incorrecta.'}
                    </p>
                    <p className="opacity-90 leading-relaxed">{currentTest.explanationEs}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action & Nav Buttons */}
          <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              {testStep > 1 && (
                <button
                  type="button"
                  onClick={handlePrevQuestion}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-semibold transition-colors cursor-pointer ${
                    isDark
                      ? 'border-slate-700 hover:bg-slate-800 text-slate-300'
                      : 'border-slate-300 hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Anterior</span>
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              {!isQuestionChecked ? (
                <button
                  type="button"
                  onClick={handleCheckCurrent}
                  disabled={!currentAnswerId}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer ${
                    !currentAnswerId
                      ? 'opacity-40 cursor-not-allowed bg-slate-300 text-slate-500 dark:bg-slate-800 dark:text-slate-600'
                      : 'bg-sky-600 hover:bg-sky-700 text-white shadow-sky-600/30 hover:scale-[1.02] active:scale-98'
                  }`}
                >
                  <Check className="w-4 h-4" />
                  <span>Comprobar</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNextQuestion}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white shadow-md shadow-sky-600/30 hover:scale-[1.02] active:scale-98 transition-all cursor-pointer"
                >
                  <span>{testStep < 5 ? 'Siguiente Pregunta' : 'Ver Resultados'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
