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
  PAST_SIMPLE_REGULAR_TESTS,
  PastSimpleRegularTestItem,
  PAST_SIMPLE_REGULAR_REFERENCE,
  pastSimpleRegularTennisImg,
  DragDropOption,
} from '../../data/pastSimpleRegularData';
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
  const duration = PAST_SIMPLE_REGULAR_REFERENCE.durationSeconds;
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
        PAST_SIMPLE_REGULAR_REFERENCE.audioText,
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

  const currentTestIndex = testStep - 1;
  const currentTest: PastSimpleRegularTestItem | undefined =
    testStep >= 1 && testStep <= 5 ? PAST_SIMPLE_REGULAR_TESTS[currentTestIndex] : undefined;

  const currentSelectedOptionId = currentTest ? userAnswers[currentTest.id] : undefined;
  const isQuestionChecked = currentTest ? Boolean(checkedQuestions[currentTest.id]) : false;
  const isCorrect = currentTest && currentSelectedOptionId === currentTest.correctAnswerId;

  const handleStartTest = () => {
    playFeedbackSound('click');
    setTestStep(1);
  };

  const handleSelectOption = (testId: string, optionId: string) => {
    if (checkedQuestions[testId]) return;
    playFeedbackSound('click');
    setUserAnswers((prev) => ({ ...prev, [testId]: optionId }));
  };

  const handleCheckCurrent = () => {
    if (!currentTest || !currentSelectedOptionId || isQuestionChecked) return;
    const correct = currentSelectedOptionId === currentTest.correctAnswerId;
    playFeedbackSound(correct ? 'correct' : 'wrong');
    setCheckedQuestions((prev) => ({ ...prev, [currentTest.id]: true }));

    // Speak sentence
    const fullText = currentTest.dialogueLines
      .map((l) => {
        if (l.hasBlank) {
          const opt = currentTest.options.find((o) => o.id === currentSelectedOptionId);
          return `${l.prefix || ''} ${opt?.text || ''} ${l.suffix || ''}`;
        }
        return l.textEn;
      })
      .join(' ');
    speakEnglish(fullText, speed, accent);
  };

  const handleNextTest = () => {
    playFeedbackSound('click');
    stopSpeaking();
    if (testStep < 5) {
      setTestStep((prev) => prev + 1);
    } else {
      // Submit test
      setIsSubmitted(true);
      setTestStep(6);
      playFeedbackSound('correct');
      if (onCompleteSection) {
        onCompleteSection();
      }
    }
  };

  const handlePrevTest = () => {
    playFeedbackSound('click');
    stopSpeaking();
    if (testStep > 1) {
      setTestStep((prev) => prev - 1);
    }
  };

  const handleRestartTest = () => {
    playFeedbackSound('click');
    setUserAnswers({});
    setCheckedQuestions({});
    setIsSubmitted(false);
    setTestStep(0);
  };

  // Calculate score
  const score = PAST_SIMPLE_REGULAR_TESTS.reduce((acc, t) => {
    return userAnswers[t.id] === t.correctAnswerId ? acc + 1 : acc;
  }, 0);

  /* CASE 1: LANDING CARD "INICIAR TEST" */
  if (testStep === 0) {
    return (
      <div className="w-full flex flex-col items-center gap-6 animate-in fade-in duration-200 py-4">
        {/* Reversible "Iniciar Test" Card */}
        <div className="w-full max-w-2xl">
          <ReversibleTextCard
            textEn="Unit Test: Past Simple: Regular Verbs\nThis test contains 5 questions. Press Start Test to begin."
            textEs="Test de la Unidad: Pasado Simple: Verbos Regulares\nEste test contiene 5 preguntas. Presiona Iniciar Test para comenzar."
            speed={speed}
            accent={accent}
            minHeightClass="min-h-[220px]"
            childrenFront={
              <div className="w-full flex flex-col items-center justify-center text-center p-4 gap-3">
                <span className="w-12 h-12 rounded-2xl bg-sky-600 text-white flex items-center justify-center shadow-md">
                  <Award className="w-6 h-6" />
                </span>
                <div className="flex flex-col gap-1">
                  <h3 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                    Test: Past Simple: Regular Verbs
                  </h3>
                  <span className="text-xs sm:text-sm font-mono text-sky-600 dark:text-sky-400 font-bold uppercase tracking-wider">
                    5 Test Questions
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md leading-relaxed">
                  Test your understanding of regular verbs in the past simple (affirmative, negative, endings in -ed, -d, -ied).
                </p>
              </div>
            }
            childrenBack={
              <div className="w-full flex flex-col items-center justify-center text-center p-4 gap-3">
                <span className="w-12 h-12 rounded-2xl bg-sky-600 text-white flex items-center justify-center shadow-md">
                  <Award className="w-6 h-6" />
                </span>
                <div className="flex flex-col gap-1">
                  <h3 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                    Test: Pasado Simple: Verbos Regulares
                  </h3>
                  <span className="text-xs sm:text-sm font-mono text-sky-600 dark:text-sky-400 font-bold uppercase tracking-wider">
                    5 Preguntas de Examen
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-sky-900 dark:text-sky-200 max-w-md leading-relaxed font-serif italic">
                  Pon a prueba tu comprensión de los verbos regulares en pasado simple (afirmativo, negativo con didn't, terminaciones en -ed, -d, -ied).
                </p>
              </div>
            }
          />
        </div>

        {/* Start Test Action Button */}
        <button
          type="button"
          onClick={handleStartTest}
          className="flex items-center gap-2.5 px-8 py-3.5 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white text-base font-bold shadow-xl hover:shadow-sky-500/25 transition-all hover:scale-105 active:scale-95 cursor-pointer"
        >
          <Play className="w-5 h-5 fill-current" />
          <span>Iniciar Test</span>
        </button>
      </div>
    );
  }

  /* CASE 2: RESULTS SUMMARY CARD */
  if (testStep === 6) {
    return (
      <div className="w-full flex flex-col items-center gap-6 animate-in fade-in duration-200 py-4">
        <div
          className={`w-full max-w-2xl rounded-2xl border p-6 sm:p-8 flex flex-col items-center text-center gap-5 shadow-xl ${
            isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}
        >
          <span className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg">
            <Award className="w-8 h-8" />
          </span>

          <div className="flex flex-col gap-1">
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight">Test Completado</h3>
            <p className="text-xs sm:text-sm font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Past Simple: Regular Verbs
            </p>
          </div>

          {/* Score Badge */}
          <div className="px-6 py-3 rounded-2xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 flex items-center gap-3">
            <span className="text-3xl font-black font-mono text-sky-600 dark:text-sky-400">
              {score} / 5
            </span>
            <span className="text-xs sm:text-sm font-bold text-sky-900 dark:text-sky-200">
              ({Math.round((score / 5) * 100)}%)
            </span>
          </div>

          {/* Breakdown per question */}
          <div className="w-full flex flex-col gap-2.5 pt-2">
            {PAST_SIMPLE_REGULAR_TESTS.map((t) => {
              const userOptId = userAnswers[t.id];
              const isCorrectOpt = userOptId === t.correctAnswerId;
              const correctOpt = t.options.find((o) => o.id === t.correctAnswerId);
              return (
                <div
                  key={t.id}
                  className={`w-full p-3 rounded-xl border flex items-center justify-between text-left text-xs sm:text-sm ${
                    isCorrectOpt
                      ? isDark
                        ? 'bg-emerald-950/30 border-emerald-800 text-emerald-300'
                        : 'bg-emerald-50 border-emerald-200 text-emerald-900'
                      : isDark
                      ? 'bg-rose-950/30 border-rose-800 text-rose-300'
                      : 'bg-rose-50 border-rose-200 text-rose-900'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {isCorrectOpt ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    ) : (
                      <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                    )}
                    <span className="font-bold">Test {t.testNumber}:</span>
                    <span className="font-semibold">{correctOpt?.text}</span>
                  </div>
                  <span className="text-xs opacity-75 font-mono">
                    {isCorrectOpt ? 'Correcto' : 'Incorrecto'}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Action buttons */}
          <div className="w-full pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={handleRestartTest}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs sm:text-sm font-bold shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reiniciar Test</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* CASE 3: INDIVIDUAL TEST QUESTIONS (1 to 5) */
  if (!currentTest) return null;

  const selectedOpt = currentTest.options.find((o) => o.id === currentSelectedOptionId);

  const fullTextEn = currentTest.dialogueLines
    .map((l) => {
      if (l.hasBlank) {
        return `${l.prefix || ''} ${selectedOpt ? selectedOpt.text : '________'} ${l.suffix || ''}`.trim();
      }
      return l.textEn;
    })
    .join('\n');

  const fullTextEs = currentTest.dialogueLines.map((l) => l.textEs).join('\n');

  return (
    <div className="w-full flex flex-col gap-5 animate-in fade-in duration-200">
      {/* 1. Instruction Card */}
      <ReversibleTextCard
        textEn="Drag or select the correct answer into place."
        textEs="Arrastra o selecciona la respuesta correcta en su lugar."
        speed={speed}
        accent={accent}
        className="shadow-sm"
      />

      {/* 2. Main 2-Column Container (Matching Actividad 1-11 and screenshots) */}
      <div
        className={`w-full rounded-2xl border overflow-hidden shadow-lg flex flex-col lg:flex-row transition-colors ${
          isDark ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* LEFT COLUMN: Media Player & Reference Dialogue */}
        <div className="w-full lg:w-1/2 p-4 sm:p-5 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-slate-800">
          <div className="w-full rounded-xl overflow-hidden border border-slate-700/60 bg-[#1E293B] shadow-md relative flex flex-col">
            {/* Screen */}
            <div className="relative w-full aspect-[4/3] bg-[#1a2332] overflow-hidden flex items-center justify-center">
              <img
                src={pastSimpleRegularTennisImg}
                alt="Tennis players"
                className="w-full h-full object-cover object-center"
              />

              {!isPlayingMedia && (
                <button
                  type="button"
                  onClick={handleTogglePlayMedia}
                  className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-black/60 hover:bg-sky-600 text-white flex items-center justify-center transition-transform hover:scale-110 active:scale-95 shadow-xl border border-white/20 cursor-pointer"
                  aria-label="Reproducir video"
                >
                  <Play className="w-6 h-6 fill-current translate-x-0.5" />
                </button>
              )}
            </div>

            {/* Video Controls Bar */}
            <div className="w-full px-3 py-2.5 bg-[#1F2937] border-t border-slate-700 flex items-center gap-3 select-none">
              <button
                type="button"
                onClick={handleTogglePlayMedia}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
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

          {/* Reference Sentence Box below player with highlighted words */}
          <div className="mt-4 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-black/20 flex flex-col gap-2">
            <p className="text-sm sm:text-base leading-relaxed text-slate-800 dark:text-slate-200">
              - We{' '}
              <span className="inline-block bg-sky-200 dark:bg-sky-500/30 text-sky-950 dark:text-sky-200 px-1.5 py-0.5 rounded font-bold border border-sky-300/40">
                didn't work
              </span>{' '}
              yesterday. We had the day off. We{' '}
              <span className="inline-block bg-sky-200 dark:bg-sky-500/30 text-sky-950 dark:text-sky-200 px-1.5 py-0.5 rounded font-bold border border-sky-300/40">
                played
              </span>{' '}
              tennis all day.
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: Dialogue with Blank & Options */}
        <div className="w-full lg:w-1/2 p-4 sm:p-6 flex flex-col justify-between gap-5">
          {/* Header with Test Step Indicator */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-sky-600 text-white font-mono font-bold flex items-center justify-center text-xs">
                {currentTest.testNumber}
              </span>
              <span className="text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Test {currentTest.testNumber} de 5
              </span>
            </div>

            <span className="text-xs font-mono text-slate-400">
              {Object.keys(userAnswers).length} de 5 respondidas
            </span>
          </div>

          {/* Reversible Sentence / Dialogue Card with the Blank */}
          <ReversibleTextCard
            textEn={fullTextEn}
            textEs={fullTextEs}
            speed={speed}
            accent={accent}
            minHeightClass="min-h-[140px]"
            childrenFront={
              <div className="w-full flex flex-col gap-2.5 py-1">
                {currentTest.dialogueLines.map((line, idx) => {
                  if (line.hasBlank) {
                    return (
                      <div
                        key={idx}
                        className="flex flex-wrap items-center gap-1.5 text-sm sm:text-base leading-relaxed"
                      >
                        {line.prefix && <span>{line.prefix}</span>}

                        {/* Drop / Selected Slot */}
                        <div
                          className={`inline-flex items-center justify-center min-w-[130px] h-8 sm:h-9 px-3 rounded-lg border-2 border-dashed transition-all ${
                            selectedOpt
                              ? isQuestionChecked
                                ? isCorrect
                                  ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-bold'
                                  : 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200 font-bold'
                                : 'border-sky-500 bg-sky-50 dark:bg-sky-950/40 text-sky-900 dark:text-sky-200 font-bold'
                              : 'border-slate-300 dark:border-slate-600 bg-slate-100/60 dark:bg-slate-800/60'
                          }`}
                        >
                          {selectedOpt ? (
                            <span className="font-semibold">{selectedOpt.text}</span>
                          ) : (
                            <span className="text-xs text-slate-400 font-mono select-none">
                              [ Selecciona ]
                            </span>
                          )}
                        </div>

                        {line.suffix && <span>{line.suffix}</span>}
                      </div>
                    );
                  }
                  return (
                    <p key={idx} className="text-sm sm:text-base leading-relaxed">
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
                    className="text-sm sm:text-base leading-relaxed font-serif italic text-sky-900 dark:text-sky-300"
                  >
                    {line.textEs}
                  </p>
                ))}
              </div>
            }
          />

          {/* Options */}
          <div className="flex flex-col gap-2.5">
            <div className="flex flex-wrap items-center gap-3">
              {currentTest.options.map((opt: DragDropOption) => {
                const isSelected = currentSelectedOptionId === opt.id;
                const isCorrectOpt = opt.id === currentTest.correctAnswerId;

                let btnStyle = isDark
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                  : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-300 shadow-xs';

                if (isQuestionChecked) {
                  if (isSelected) {
                    btnStyle = isCorrect
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-md ring-2 ring-emerald-400'
                      : 'bg-rose-600 text-white border-rose-600 shadow-md ring-2 ring-rose-400';
                  } else if (isCorrectOpt) {
                    btnStyle = isDark
                      ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300 ring-1 ring-emerald-400'
                      : 'bg-emerald-50 border-emerald-400 text-emerald-800 ring-1 ring-emerald-300';
                  } else {
                    btnStyle = 'opacity-40 cursor-not-allowed border-slate-200 dark:border-slate-700 text-slate-400';
                  }
                } else if (isSelected) {
                  btnStyle = 'bg-sky-600 text-white border-sky-600 shadow-md ring-2 ring-sky-400';
                }

                return (
                  <button
                    key={opt.id}
                    type="button"
                    disabled={isQuestionChecked}
                    onClick={() => handleSelectOption(currentTest.id, opt.id)}
                    className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border transition-all select-none active:scale-95 ${
                      isQuestionChecked ? 'cursor-default' : 'cursor-pointer'
                    } ${btnStyle}`}
                  >
                    {opt.text}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Explanation Box after Check */}
          {isQuestionChecked && (
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
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                ) : (
                  <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                )}
                <span>{isCorrect ? '¡Correcto!' : 'Respuesta Incorrecta'}</span>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed">{currentTest.explanationEn}</p>
              <p className="text-xs sm:text-sm leading-relaxed italic text-slate-600 dark:text-slate-300">
                {currentTest.explanationEs}
              </p>
            </div>
          )}

          {/* Navigation between Test Questions */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <button
              type="button"
              onClick={handlePrevTest}
              disabled={testStep <= 1}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors cursor-pointer ${
                testStep <= 1
                  ? 'opacity-40 cursor-not-allowed border-transparent'
                  : isDark
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300 shadow-xs'
              }`}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Anterior</span>
            </button>

            {/* Question Step Pills */}
            <div className="flex items-center gap-1.5">
              {PAST_SIMPLE_REGULAR_TESTS.map((t, idx) => {
                const stepNum = idx + 1;
                const isItemChecked = Boolean(checkedQuestions[t.id]);
                const isItemCorrect = userAnswers[t.id] === t.correctAnswerId;
                const isCurrent = stepNum === testStep;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => {
                      playFeedbackSound('click');
                      setTestStep(stepNum);
                    }}
                    className={`w-7 h-7 rounded-lg text-xs font-mono font-bold flex items-center justify-center transition-all cursor-pointer ${
                      isCurrent
                        ? 'bg-sky-600 text-white ring-2 ring-sky-400'
                        : isItemChecked
                        ? isItemCorrect
                          ? isDark
                            ? 'bg-emerald-950/70 text-emerald-400 border border-emerald-800'
                            : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : isDark
                          ? 'bg-rose-950/70 text-rose-400 border border-rose-800'
                          : 'bg-rose-100 text-rose-800 border border-rose-300'
                        : Boolean(userAnswers[t.id])
                        ? isDark
                          ? 'bg-slate-700 text-slate-200 border border-slate-600'
                          : 'bg-slate-200 text-slate-800 border border-slate-300'
                        : isDark
                        ? 'bg-slate-800 text-slate-400 border border-slate-700'
                        : 'bg-slate-100 text-slate-600 border border-slate-200'
                    }`}
                    title={`Ir al Test ${stepNum}`}
                  >
                    {stepNum}
                  </button>
                );
              })}
            </div>

            {!isQuestionChecked ? (
              <button
                type="button"
                onClick={handleCheckCurrent}
                disabled={!currentSelectedOptionId}
                className={`flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md cursor-pointer ${
                  currentSelectedOptionId
                    ? 'bg-sky-600 hover:bg-sky-700 text-white active:scale-95'
                    : 'bg-slate-300 dark:bg-slate-800 text-slate-500 dark:text-slate-600 cursor-not-allowed shadow-none'
                }`}
              >
                <Check className="w-4 h-4" />
                <span>Comprobar</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNextTest}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md cursor-pointer bg-sky-600 hover:bg-sky-700 text-white active:scale-95"
              >
                <span>{testStep === 5 ? 'Finalizar' : 'Siguiente'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
