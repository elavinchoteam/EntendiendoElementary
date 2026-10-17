import React, { useState, useEffect, useRef } from 'react';
import {
  Volume2,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Gauge,
  Award,
  Sparkles,
  HelpCircle,
} from 'lucide-react';
import {
  FamilyTestItem,
  ellenImg,
  ELLEN_MESSAGE_FULL_AUDIO,
} from '../../data/familyReviewData';
import { FamilyReferenceCard } from './FamilyReferenceCard';
import { speakEnglish, stopSpeaking, playFeedbackSound } from '../../utils/audio';
import { useTheme } from '../../context/ThemeContext';

interface FamilyTestSlideProps {
  tests: FamilyTestItem[];
  accent?: 'US' | 'UK';
  speechRate?: number;
  onSuccess?: () => void;
}

const PLAYBACK_SPEEDS = [
  { label: '0.8x', value: 0.8 },
  { label: '1.0x', value: 1.0 },
  { label: '1.2x', value: 1.2 },
];

export const FamilyTestSlide: React.FC<FamilyTestSlideProps> = ({
  tests,
  accent = 'US',
  speechRate = 1.0,
  onSuccess,
}) => {
  const { isDark } = useTheme();

  // Navigation & test progress
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [checkedState, setCheckedState] = useState<Record<number, boolean>>({});
  const [correctState, setCorrectState] = useState<Record<number, boolean>>({});
  const [isTestComplete, setIsTestComplete] = useState(false);
  const [isTestStarted, setIsTestStarted] = useState(false);

  // Audio player state
  const [isPlayingMedia, setIsPlayingMedia] = useState(false);
  const [playerSpeed, setPlayerSpeed] = useState(speechRate);
  const [isSpeedMenuOpen, setIsSpeedMenuOpen] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const totalDurationSeconds = 31;
  const speedMenuRef = useRef<HTMLDivElement>(null);

  // Reversible cards state
  const [isInstructionFlipped, setIsInstructionFlipped] = useState(false);
  const [isQuestionFlipped, setIsQuestionFlipped] = useState(false);

  const currentTest = tests[currentIdx] || tests[0];
  const currentAnswer = selectedAnswers[currentIdx] || '';
  const isCurrentChecked = Boolean(checkedState[currentIdx]);
  const isCurrentCorrect = Boolean(correctState[currentIdx]);

  // Click outside speed menu
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (speedMenuRef.current && !speedMenuRef.current.contains(e.target as Node)) {
        setIsSpeedMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Timer simulation for media bar
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlayingMedia) {
      interval = setInterval(() => {
        setElapsedSeconds((prev) => {
          if (prev >= totalDurationSeconds) {
            setIsPlayingMedia(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000 / playerSpeed);
    }
    return () => clearInterval(interval);
  }, [isPlayingMedia, playerSpeed]);

  const handleTogglePlayMedia = () => {
    if (isPlayingMedia) {
      stopSpeaking();
      setIsPlayingMedia(false);
      return;
    }
    playFeedbackSound('click');
    setElapsedSeconds(0);
    speakEnglish(
      ELLEN_MESSAGE_FULL_AUDIO,
      playerSpeed,
      accent,
      () => setIsPlayingMedia(true),
      () => {
        setIsPlayingMedia(false);
        setElapsedSeconds(totalDurationSeconds);
      }
    );
  };

  const handleSelectOption = (opt: string) => {
    playFeedbackSound('click');
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentIdx]: opt,
    }));
    if (isCurrentChecked) {
      setCheckedState((prev) => ({ ...prev, [currentIdx]: false }));
    }
  };

  const handleRemoveSlotAnswer = () => {
    if (isCurrentChecked) return;
    playFeedbackSound('click');
    setSelectedAnswers((prev) => {
      const copy = { ...prev };
      delete copy[currentIdx];
      return copy;
    });
  };

  const handleCheckCurrent = () => {
    if (!currentAnswer) return;
    playFeedbackSound('click');

    const isRight =
      currentAnswer.trim().toLowerCase() === currentTest.correctAnswer.trim().toLowerCase();

    setCheckedState((prev) => ({ ...prev, [currentIdx]: true }));
    setCorrectState((prev) => ({ ...prev, [currentIdx]: isRight }));

    if (isRight) {
      playFeedbackSound('correct');
    } else {
      playFeedbackSound('wrong');
    }
  };

  const handleNextQuestion = () => {
    playFeedbackSound('click');
    setIsQuestionFlipped(false);
    setIsInstructionFlipped(false);

    if (currentIdx < tests.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      setIsTestComplete(true);
      const totalCorrect = Object.values(correctState).filter(Boolean).length;
      if (totalCorrect === tests.length) {
        onSuccess?.();
      }
    }
  };

  // Reintentar test completo
  const handleResetTest = (returnToCover = false) => {
    playFeedbackSound('click');
    setCurrentIdx(0);
    setSelectedAnswers({});
    setCheckedState({});
    setCorrectState({});
    setIsTestComplete(false);
    setIsTestStarted(!returnToCover);
    setIsQuestionFlipped(false);
    setIsInstructionFlipped(false);
    stopSpeaking();
    setIsPlayingMedia(false);
    setElapsedSeconds(0);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const totalScore = Object.values(correctState).filter(Boolean).length;

  // ---------------------------------------------------------------------------
  // VIEW 1: START SCREEN (Tarjeta Comenzar Test)
  // ---------------------------------------------------------------------------
  if (!isTestStarted) {
    return (
      <div
        className={`w-full max-w-4xl mx-auto rounded-3xl border shadow-xl p-8 sm:p-12 text-center flex flex-col items-center gap-6 transition-colors ${
          isDark ? 'bg-slate-900 border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        <div className="w-20 h-20 rounded-3xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-500">
          <Award className="w-10 h-10" />
        </div>

        <div className="max-w-xl space-y-2">
          <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-sky-500/15 border border-sky-500/30 text-sky-600 dark:text-sky-400">
            Unit 6 · Review 1 · Sección 4
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Family · Test Evaluativo
          </h2>
          <p className="text-sm sm:text-base opacity-80 leading-relaxed font-sans">
            Comprueba tu comprensión del mensaje de voz de Ellen con <strong>5 preguntas evaluativas</strong> en su orden exacto.
          </p>
        </div>

        <div className="w-full max-w-md p-4 rounded-2xl border border-inherit/20 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-around text-xs font-mono">
          <div className="text-center">
            <span className="opacity-60 block">Preguntas</span>
            <span className="text-lg font-bold text-sky-500">5 Tests</span>
          </div>
          <div className="w-px h-8 bg-inherit/20" />
          <div className="text-center">
            <span className="opacity-60 block">Tipo</span>
            <span className="text-lg font-bold text-emerald-500">Opción Múltiple</span>
          </div>
          <div className="w-px h-8 bg-inherit/20" />
          <div className="text-center">
            <span className="opacity-60 block">Aprobación</span>
            <span className="text-lg font-bold text-sky-500">70%</span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            playFeedbackSound('click');
            setIsTestStarted(true);
          }}
          className="px-8 py-3.5 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-base shadow-lg hover:shadow-sky-500/25 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
        >
          <Sparkles className="w-5 h-5" />
          <span>Comenzar Test (5 Preguntas)</span>
        </button>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // VIEW 2: COMPLETED SCREEN IF ALL 5 QUESTIONS FINISHED
  // ---------------------------------------------------------------------------
  if (isTestComplete) {
    const percentage = Math.round((totalScore / tests.length) * 100);
    const isPassing = percentage >= 80;

    return (
      <div
        className={`w-full max-w-4xl mx-auto rounded-3xl border shadow-xl p-8 sm:p-12 text-center transition-all ${
          isDark ? 'bg-slate-900 border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        <div className="w-20 h-20 mx-auto rounded-full bg-emerald-500/15 border-2 border-emerald-500 flex items-center justify-center text-emerald-500 mb-6">
          <Award className="w-10 h-10" />
        </div>

        <h3 className="text-2xl sm:text-3xl font-extrabold mb-2">
          {isPassing ? '¡Felicitaciones! Has completado el Test de Family' : 'Test Finalizado'}
        </h3>
        <p className="text-sm opacity-80 mb-6">
          Has respondido {totalScore} de {tests.length} preguntas correctamente ({percentage}%).
        </p>

        <div className="max-w-md mx-auto grid grid-cols-2 gap-4 mb-8">
          <div
            className={`p-4 rounded-2xl border ${
              isDark ? 'bg-slate-800/60 border-white/10' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <span className="text-xs font-mono opacity-60">Aciertos</span>
            <p className="text-2xl font-bold text-emerald-500">
              {totalScore} / {tests.length}
            </p>
          </div>
          <div
            className={`p-4 rounded-2xl border ${
              isDark ? 'bg-slate-800/60 border-white/10' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <span className="text-xs font-mono opacity-60">Puntaje</span>
            <p className="text-2xl font-bold text-sky-500">{percentage}%</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => handleResetTest(false)}
            className="px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold transition-all cursor-pointer flex items-center gap-2 active:scale-95 shadow-md hover:shadow-sky-500/25"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reintentar Test</span>
          </button>
          <button
            type="button"
            onClick={() => handleResetTest(true)}
            className="px-6 py-3 rounded-xl border border-inherit/20 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer flex items-center gap-2 active:scale-95"
          >
            <Award className="w-4 h-4 text-sky-500" />
            <span>Volver a la Portada del Test</span>
          </button>
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // ACTIVE QUESTION SCREEN
  // ---------------------------------------------------------------------------
  return (
    <div
      className={`w-full max-w-5xl mx-auto rounded-3xl border shadow-xl overflow-hidden transition-all duration-300 ${
        isDark ? 'bg-slate-900 border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'
      }`}
    >
      <div className="flex flex-col lg:flex-row items-stretch">
        {/* LEFT COLUMN: Progress + Image + Player + Reference Card */}
        <div
          className={`w-full lg:w-[46%] p-5 sm:p-7 flex flex-col gap-4 border-b lg:border-b-0 lg:border-r ${
            isDark ? 'bg-slate-900/80 border-white/10' : 'bg-slate-50/80 border-slate-200'
          }`}
        >
          {/* Header Badge */}
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400">
              Unit 6 · Test ({currentIdx + 1} de {tests.length})
            </span>
            <span className="text-xs font-mono opacity-60">Family: Review</span>
          </div>

          {/* Test progress bar */}
          <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
            <div
              className="bg-emerald-500 h-full transition-all duration-300"
              style={{
                width: `${((currentIdx + 1) / tests.length) * 100}%`,
              }}
            />
          </div>

          {/* Illustration image - compact h-32 sm:h-36 */}
          <div className="w-full h-32 sm:h-36 rounded-2xl overflow-hidden border border-inherit/20 relative shadow-sm">
            <img
              src={ellenImg}
              alt="Ellen calling in the car"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-3">
              <span className="text-white text-xs font-medium drop-shadow-sm">
                Ellen's Voicemail · Situación de Audio
              </span>
            </div>
          </div>

          {/* Media Player Card (Placed below the image) */}
          <div
            className={`p-3.5 sm:p-4 rounded-2xl border shadow-sm flex flex-col gap-2.5 transition-colors ${
              isDark ? 'bg-slate-800/90 border-white/10' : 'bg-white border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-semibold uppercase text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                <Volume2 className="w-4 h-4" />
                Audio Voicemail
              </span>
              <span className="text-xs font-mono opacity-60">
                {formatTime(elapsedSeconds)} / {formatTime(totalDurationSeconds)}
              </span>
            </div>

            <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
              <div
                className="bg-emerald-500 h-full transition-all duration-300"
                style={{
                  width: `${(elapsedSeconds / totalDurationSeconds) * 100}%`,
                }}
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              <div className="relative" ref={speedMenuRef}>
                <button
                  type="button"
                  onClick={() => setIsSpeedMenuOpen((prev) => !prev)}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono font-medium border border-inherit/20 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                >
                  <Gauge className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{playerSpeed}x</span>
                </button>
                {isSpeedMenuOpen && (
                  <div
                    className={`absolute bottom-full left-0 mb-2 py-1.5 rounded-xl border shadow-xl z-30 min-w-[90px] ${
                      isDark ? 'bg-slate-800 border-white/10' : 'bg-white border-slate-200'
                    }`}
                  >
                    {PLAYBACK_SPEEDS.map((sp) => (
                      <button
                        key={sp.value}
                        type="button"
                        onClick={() => {
                          setPlayerSpeed(sp.value);
                          setIsSpeedMenuOpen(false);
                        }}
                        className={`w-full px-3 py-1 text-left text-xs font-mono transition-colors ${
                          playerSpeed === sp.value
                            ? 'bg-emerald-500 text-white font-bold'
                            : 'hover:bg-emerald-50 dark:hover:bg-slate-700'
                        }`}
                      >
                        {sp.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={handleTogglePlayMedia}
                className="w-10 h-10 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
                aria-label={isPlayingMedia ? 'Pausar audio' : 'Reproducir audio'}
              >
                {isPlayingMedia ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
              </button>
            </div>
          </div>

          {/* Reversible Reference Card (Pinned voicemail memo) */}
          <FamilyReferenceCard speed={playerSpeed} accent={accent} />
        </div>

        {/* RIGHT COLUMN: Question, Reversible Card, Radio/Slots, Feedback, Action bar */}
        <div className="w-full lg:w-[54%] p-6 sm:p-8 flex flex-col justify-between gap-6">
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between pb-3 border-b border-inherit/15">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  Test Question {currentIdx + 1} of {tests.length}
                </span>
                <h3 className="text-lg font-bold tracking-tight mt-0.5">
                  {currentTest.type === 'fill-blank-choice'
                    ? 'Arrastra o selecciona la opción correcta'
                    : 'Elige la respuesta correcta'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => speakEnglish(currentTest.audioPrompt, playerSpeed, accent)}
                className="p-2 rounded-xl border border-inherit/20 hover:bg-emerald-50 dark:hover:bg-slate-800 text-emerald-600 dark:text-emerald-400 transition-colors"
                title="Escuchar audio de la pregunta"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            {/* Instructions box */}
            <div
              role="button"
              tabIndex={0}
              onClick={() => {
                playFeedbackSound('flip');
                setIsInstructionFlipped((prev) => !prev);
              }}
              className={`p-3.5 rounded-2xl border text-xs sm:text-sm font-medium transition-all cursor-pointer flex items-center justify-between gap-3 ${
                isDark
                  ? 'bg-slate-800/60 border-white/10 hover:bg-slate-800'
                  : 'bg-slate-100/80 border-slate-200 hover:bg-slate-100'
              }`}
              title="Haz clic para traducir las instrucciones"
            >
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                  {isInstructionFlipped ? 'ES' : 'EN'}
                </span>
                <span>
                  {isInstructionFlipped ? currentTest.instructionsEs : currentTest.instructions}
                </span>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  playFeedbackSound('click');
                  speakEnglish(currentTest.instructions, playerSpeed, accent);
                }}
                className="p-1.5 rounded-lg border border-inherit/20 hover:bg-white dark:hover:bg-slate-700 shrink-0"
              >
                <Volume2 className="w-3.5 h-3.5 text-emerald-500" />
              </button>
            </div>

            {/* 3D Reversible Question Card with CSS Grid Auto-Height */}
            <div className="w-full perspective-1000">
              <div
                role="button"
                tabIndex={0}
                onClick={(e) => {
                  const target = e.target as HTMLElement;
                  if (
                    target.closest('input') ||
                    target.closest('label') ||
                    target.closest('button[data-slot-btn]') ||
                    target.closest('button[data-option-btn]')
                  ) {
                    return;
                  }
                  playFeedbackSound('flip');
                  setIsQuestionFlipped((prev) => !prev);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    const target = e.target as HTMLElement;
                    if (target.closest('input') || target.closest('label') || target.closest('button')) return;
                    e.preventDefault();
                    playFeedbackSound('flip');
                    setIsQuestionFlipped((prev) => !prev);
                  }
                }}
                className={`grid grid-cols-1 grid-rows-1 w-full rounded-2xl border transition-transform duration-500 transform-style-3d cursor-pointer select-none shadow-sm ${
                  isDark
                    ? 'bg-slate-800/50 border-white/10 text-white'
                    : 'bg-slate-50/90 border-slate-200 text-slate-900'
                } ${isQuestionFlipped ? 'rotate-y-180' : ''}`}
                title="Haz clic para voltear y ver la traducción al castellano"
              >
                {/* FRONT: English question and options / slot */}
                <div
                  className={`col-start-1 row-start-1 w-full rounded-2xl p-5 sm:p-6 flex flex-col justify-between backface-hidden ${
                    isQuestionFlipped ? 'invisible pointer-events-none' : ''
                  }`}
                >
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-inherit/20">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                      Test Question · English
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        playFeedbackSound('flip');
                        setIsQuestionFlipped((prev) => !prev);
                      }}
                      className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/25 flex items-center gap-1.5 transition-all cursor-pointer"
                      title="Ver traducción al castellano"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Castellano</span>
                    </button>
                  </div>

                  {/* Test 1 to 4: Fill blank with options bank */}
                  {currentTest.type === 'fill-blank-choice' && (
                    <div className="my-auto space-y-5">
                      <div className="flex flex-wrap items-baseline gap-2 text-base sm:text-lg font-medium leading-relaxed">
                        <span>{currentTest.prefix}</span>
                        <button
                          type="button"
                          data-slot-btn="true"
                          onClick={handleRemoveSlotAnswer}
                          disabled={isCurrentChecked}
                          className={`min-w-[120px] max-w-full min-h-[36px] px-3.5 py-1 rounded-xl border-2 inline-flex items-center justify-center transition-all align-middle font-mono font-bold ${
                            isCurrentChecked
                              ? isCurrentCorrect
                                ? 'border-emerald-500 bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                                : 'border-rose-500 bg-rose-500/15 text-rose-600 dark:text-rose-400'
                              : currentAnswer
                              ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 shadow-xs cursor-pointer'
                              : isDark
                              ? 'border-dashed border-slate-600 bg-slate-800/40 text-slate-400'
                              : 'border-dashed border-slate-400 bg-slate-100/70 text-slate-400'
                          }`}
                          title={currentAnswer ? 'Haz clic para quitar' : 'Selecciona una opción de abajo'}
                        >
                          {currentAnswer ? (
                            <span className="flex items-center gap-1.5">
                              <span>{currentAnswer}</span>
                              {!isCurrentChecked && <span className="text-xs opacity-60">×</span>}
                            </span>
                          ) : (
                            <span className="opacity-40 italic">_________</span>
                          )}
                        </button>
                        <span>{currentTest.suffix}</span>
                      </div>

                      {/* Options Bank */}
                      <div className="pt-3 border-t border-inherit/15">
                        <span className="text-xs font-mono uppercase font-bold opacity-60 block mb-2">
                          Opciones disponibles (haz clic para colocar):
                        </span>
                        <div className="flex flex-wrap gap-2.5">
                          {currentTest.options.map((opt, optIdx) => {
                            const isChosen = currentAnswer === opt;

                            return (
                              <button
                                key={optIdx}
                                type="button"
                                data-option-btn="true"
                                onClick={() => handleSelectOption(opt)}
                                disabled={isCurrentChecked}
                                className={`px-3.5 py-2 rounded-xl font-mono text-xs sm:text-sm font-semibold border-2 transition-all select-none shadow-xs ${
                                  isChosen
                                    ? 'border-emerald-500 bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 scale-102 ring-2 ring-emerald-500/30'
                                    : isDark
                                    ? 'bg-slate-800 hover:bg-slate-700 text-white border-white/20 hover:border-emerald-400 active:scale-95 cursor-pointer'
                                    : 'bg-white hover:bg-emerald-50 text-slate-800 border-slate-300 hover:border-emerald-500 active:scale-95 cursor-pointer'
                                }`}
                              >
                                {opt}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Test 5: Radio Multiple Choice */}
                  {currentTest.type === 'multiple-choice' && (
                    <div className="my-auto space-y-4">
                      <h4 className="text-base sm:text-lg font-bold leading-snug">
                        {currentTest.question}
                      </h4>

                      {/* Radio Options */}
                      <div className="space-y-2">
                        {currentTest.options.map((opt, optIdx) => {
                          const isSelected = currentAnswer === opt;
                          const isThisCorrect = opt === currentTest.correctAnswer;

                          return (
                            <label
                              key={optIdx}
                              onClick={(e) => e.stopPropagation()}
                              className={`flex items-center gap-3 p-3 rounded-xl border text-xs sm:text-sm cursor-pointer transition-all ${
                                isCurrentChecked
                                  ? isThisCorrect
                                    ? 'border-emerald-500 bg-emerald-500/15 text-emerald-800 dark:text-emerald-200 font-bold'
                                    : isSelected
                                    ? 'border-rose-500 bg-rose-500/15 text-rose-800 dark:text-rose-200 font-semibold'
                                    : 'opacity-50 border-inherit/20'
                                  : isSelected
                                  ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200 font-semibold shadow-xs'
                                  : isDark
                                  ? 'border-white/10 hover:bg-slate-800'
                                  : 'border-slate-200 hover:bg-slate-100'
                              }`}
                            >
                              <input
                                type="radio"
                                name={`test-q-${currentTest.id}`}
                                value={opt}
                                checked={isSelected}
                                onChange={() => handleSelectOption(opt)}
                                disabled={isCurrentChecked}
                                className="w-4 h-4 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                              />
                              <span className="leading-snug">{opt}</span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  <div className="pt-2 mt-3 border-t border-inherit/15 flex items-center justify-between text-[10px] font-mono opacity-60">
                    <span>
                      {currentTest.type === 'fill-blank-choice'
                        ? 'Completa el espacio en blanco'
                        : 'Selecciona una opción'}
                    </span>
                    <span>Clic tarjeta para traducir ↻</span>
                  </div>
                </div>

                {/* BACK: Spanish Translation of Question / Slot and Options */}
                <div
                  className={`col-start-1 row-start-1 w-full rounded-2xl p-5 sm:p-6 flex flex-col justify-between backface-hidden rotate-y-180 ${
                    isDark
                      ? 'bg-slate-800 text-emerald-200'
                      : 'bg-emerald-50/95 text-emerald-950 border border-emerald-300'
                  } ${!isQuestionFlipped ? 'invisible pointer-events-none' : ''}`}
                >
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-inherit/20">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                      Traducción al Castellano
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        playFeedbackSound('flip');
                        setIsQuestionFlipped((prev) => !prev);
                      }}
                      className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/25 flex items-center gap-1.5 transition-all cursor-pointer"
                      title="Volver a la pregunta en inglés"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Inglés</span>
                    </button>
                  </div>

                  <div className="my-auto space-y-4 font-serif text-sm sm:text-base leading-relaxed text-slate-800 dark:text-emerald-100 py-1">
                    <p className="font-bold text-base sm:text-lg">{currentTest.fullEs}</p>

                    <div className="space-y-1.5 pt-2 border-t border-inherit/20">
                      <span className="font-sans not-italic text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300 block mb-1">
                        Opciones en Castellano:
                      </span>
                      {currentTest.optionsEs.map((optEs, idx) => {
                        const isThisCorrect = currentTest.options[idx] === currentTest.correctAnswer;
                        return (
                          <p key={idx} className="flex items-baseline gap-2 text-xs sm:text-sm">
                            <span className="font-sans font-bold text-emerald-600 dark:text-emerald-400 select-none">
                              {isThisCorrect ? '✓' : '•'}
                            </span>
                            <span className={isThisCorrect ? 'font-bold text-emerald-700 dark:text-emerald-300 not-italic' : ''}>
                              {optEs} {isThisCorrect && '(Correcta)'}
                            </span>
                          </p>
                        );
                      })}
                    </div>
                  </div>

                  <div className="pt-2 mt-3 border-t border-inherit/15 flex items-center justify-between text-[10px] font-mono opacity-60">
                    <span>Traducción contextual</span>
                    <span>Castellano</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Results / Feedback Explanation Card */}
            {isCurrentChecked && (
              <div
                className={`p-4 rounded-2xl border transition-all animate-in fade-in duration-300 ${
                  isCurrentCorrect
                    ? isDark
                      ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                      : 'bg-emerald-50 border-emerald-300 text-emerald-900'
                    : isDark
                    ? 'bg-rose-950/40 border-rose-500/40 text-rose-300'
                    : 'bg-rose-50 border-rose-300 text-rose-900'
                }`}
              >
                <div className="flex items-start gap-3">
                  {isCurrentCorrect ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                  )}
                  <div className="space-y-1 text-xs sm:text-sm">
                    <p className="font-bold">
                      {isCurrentCorrect ? '¡Correcto!' : 'Respuesta incorrecta. Revisa la explicación:'}
                    </p>
                    <p className="opacity-90">{currentTest.explanationEs}</p>
                    <p className="text-[11px] font-mono opacity-70 border-t border-inherit/20 pt-1 mt-1">
                      {currentTest.explanationEn}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action Bar: Reintentar Test, Comprobar / Siguiente */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-inherit/15">
            <button
              type="button"
              onClick={handleResetTest}
              className="px-4 py-2.5 rounded-xl border border-inherit/20 text-xs sm:text-sm font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer flex items-center gap-1.5 active:scale-95"
              title="Reiniciar el test desde la pregunta 1"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reintentar Test</span>
            </button>

            <div className="flex items-center gap-3">
              {!isCurrentChecked ? (
                <button
                  type="button"
                  onClick={handleCheckCurrent}
                  disabled={!currentAnswer}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 disabled:hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-emerald-500/25 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Comprobar Respuesta</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNextQuestion}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-emerald-500/25 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
                >
                  <span>
                    {currentIdx < tests.length - 1 ? 'Siguiente Pregunta' : 'Ver Resultados del Test'}
                  </span>
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
