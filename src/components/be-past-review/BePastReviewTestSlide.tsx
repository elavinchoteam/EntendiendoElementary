import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Check,
  Volume2,
  CheckCircle2,
  XCircle,
  Award,
  ArrowRight,
  Sparkles,
  Gauge,
  HelpCircle,
} from 'lucide-react';
import { BePastTestItem } from '../../data/bePastReviewData';
import { BePastReferenceCard } from './BePastReferenceCard';
import { speakEnglish, stopSpeaking, playFeedbackSound } from '../../utils/audio';
import { useTheme } from '../../context/ThemeContext';
import { policeAlibiImg } from '../../data/bePastReviewData';

interface BePastReviewTestSlideProps {
  tests: BePastTestItem[];
  accent?: 'US' | 'UK';
  speechRate?: number;
  onSuccess?: () => void;
}

const PLAYBACK_SPEEDS = [
  { value: 0.5, label: '0.50x' },
  { value: 0.75, label: '0.75x' },
  { value: 1.0, label: '1x' },
  { value: 1.25, label: '1.25x' },
];

export const BePastReviewTestSlide: React.FC<BePastReviewTestSlideProps> = ({
  tests,
  accent = 'US',
  speechRate = 1.0,
  onSuccess,
}) => {
  const { isDark } = useTheme();

  // Test session state
  const [isTestStarted, setIsTestStarted] = useState<boolean>(false);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [isTestCompleted, setIsTestCompleted] = useState<boolean>(false);

  // Answers map: questionId -> { slotId: selectedWord }
  const [answersMap, setAnswersMap] = useState<Record<string, Record<string, string>>>({});
  // Submitted status per question: questionId -> boolean
  const [submittedMap, setSubmittedMap] = useState<Record<string, boolean>>({});
  // Score per question: questionId -> boolean
  const [correctMap, setCorrectMap] = useState<Record<string, boolean>>({});

  // Audio / Media Player state
  const [isPlayingMedia, setIsPlayingMedia] = useState<boolean>(false);
  const [playerSpeed, setPlayerSpeed] = useState<number>(speechRate);
  const [isSpeedMenuOpen, setIsSpeedMenuOpen] = useState<boolean>(false);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const totalDurationSeconds = 8;

  // Reversible cards states
  const [isInstructionFlipped, setIsInstructionFlipped] = useState<boolean>(false);
  const [isDialogueFlipped, setIsDialogueFlipped] = useState<boolean>(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const speedMenuRef = useRef<HTMLDivElement>(null);

  const currentTest = tests[currentIdx];

  // Collect all slot items in the current test question
  const currentSlots: { id: string; expectedWord: string; dropdownOptions?: string[] }[] = [];
  if (currentTest) {
    currentTest.dialogueLines.forEach((line) => {
      if (line.slot) currentSlots.push(line.slot);
      if (line.slot2) currentSlots.push(line.slot2);
      if (line.slot3) currentSlots.push(line.slot3);
    });
  }

  const currentSlotAnswers = currentTest ? answersMap[currentTest.id] || {} : {};
  const isCurrentChecked = currentTest ? submittedMap[currentTest.id] : false;
  const isCurrentCorrect = currentTest ? correctMap[currentTest.id] : false;

  // Handle outside click for speed menu
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (speedMenuRef.current && !speedMenuRef.current.contains(e.target as Node)) {
        setIsSpeedMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Timer for media player simulation
  useEffect(() => {
    if (isPlayingMedia) {
      timerRef.current = setInterval(() => {
        setElapsedSeconds((prev) => {
          if (prev >= totalDurationSeconds) {
            setIsPlayingMedia(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000 / playerSpeed);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlayingMedia, playerSpeed, totalDurationSeconds]);

  // Reset audio on question change
  useEffect(() => {
    setIsPlayingMedia(false);
    setElapsedSeconds(0);
    setIsInstructionFlipped(false);
    setIsDialogueFlipped(false);
    stopSpeaking();
  }, [currentIdx, isTestStarted]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleTogglePlayMedia = () => {
    if (!currentTest) return;
    if (isPlayingMedia) {
      stopSpeaking();
      setIsPlayingMedia(false);
      setElapsedSeconds(0);
      return;
    }
    stopSpeaking();
    playFeedbackSound('click');
    setIsPlayingMedia(true);
    setElapsedSeconds(0);
    speakEnglish(
      currentTest.audioPrompt,
      playerSpeed,
      accent,
      () => setIsPlayingMedia(true),
      () => {
        setIsPlayingMedia(false);
        setElapsedSeconds(0);
      }
    );
  };

  const handlePlaceWord = (slotId: string, word: string) => {
    if (!currentTest || isCurrentChecked) return;
    playFeedbackSound('click');
    setAnswersMap((prev) => ({
      ...prev,
      [currentTest.id]: {
        ...(prev[currentTest.id] || {}),
        [slotId]: word,
      },
    }));
  };

  const handleRemoveWord = (slotId: string) => {
    if (!currentTest || isCurrentChecked) return;
    playFeedbackSound('click');
    setAnswersMap((prev) => {
      const qAnswers = { ...(prev[currentTest.id] || {}) };
      delete qAnswers[slotId];
      return {
        ...prev,
        [currentTest.id]: qAnswers,
      };
    });
  };

  const handleOptionClick = (word: string) => {
    if (!currentTest || isCurrentChecked) return;
    const firstEmpty = currentSlots.find((s) => !currentSlotAnswers[s.id]);
    if (firstEmpty) {
      handlePlaceWord(firstEmpty.id, word);
    }
  };

  const handleCheckCurrent = () => {
    if (!currentTest || isCurrentChecked) return;
    const allFilled = currentSlots.every((s) => Boolean(currentSlotAnswers[s.id]));
    if (!allFilled) {
      playFeedbackSound('wrong');
      return;
    }

    const allMatch = currentSlots.every((s) => {
      const userWord = (currentSlotAnswers[s.id] || '').trim().toLowerCase();
      const expected = s.expectedWord.trim().toLowerCase();
      return userWord === expected;
    });

    setSubmittedMap((prev) => ({ ...prev, [currentTest.id]: true }));
    setCorrectMap((prev) => ({ ...prev, [currentTest.id]: allMatch }));

    if (allMatch) {
      playFeedbackSound('correct');
    } else {
      playFeedbackSound('wrong');
    }
  };

  const handleNextQuestion = () => {
    playFeedbackSound('click');
    if (currentIdx < tests.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      setIsTestCompleted(true);
      playFeedbackSound('complete');
      if (onSuccess) onSuccess();
    }
  };

  const handleRestartTest = () => {
    playFeedbackSound('click');
    setAnswersMap({});
    setSubmittedMap({});
    setCorrectMap({});
    setCurrentIdx(0);
    setIsTestCompleted(false);
    setIsTestStarted(true);
  };

  const totalScore = Object.values(correctMap).filter(Boolean).length;
  const percentage = Math.round((totalScore / tests.length) * 100);

  // -------------------------------------------------------------------------
  // VIEW 1: START SCREEN
  // -------------------------------------------------------------------------
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
            Unit 6 · Review 1 Test
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Be-Past: Review · Mastery Test
          </h2>
          <p className="text-sm sm:text-base opacity-80 leading-relaxed font-sans">
            Evalúa tu conocimiento del verbo <strong className="font-mono">Be en pasado</strong> (was, were, wasn't, weren't) con 10 preguntas interactivas seleccionadas en orden exacto.
          </p>
        </div>

        <div className="w-full max-w-md p-4 rounded-2xl border border-inherit/20 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-around text-xs font-mono">
          <div className="text-center">
            <span className="opacity-60 block">Preguntas</span>
            <span className="text-lg font-bold text-sky-500">10 Tests</span>
          </div>
          <div className="w-px h-8 bg-inherit/20" />
          <div className="text-center">
            <span className="opacity-60 block">Tipo</span>
            <span className="text-lg font-bold text-emerald-500">Drag & Drop / Dropdown</span>
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
          <span>Comenzar Test (10 Preguntas)</span>
        </button>
      </div>
    );
  }

  // -------------------------------------------------------------------------
  // VIEW 3: COMPLETED SCREEN
  // -------------------------------------------------------------------------
  if (isTestCompleted) {
    return (
      <div
        className={`w-full max-w-4xl mx-auto rounded-3xl border shadow-xl p-8 sm:p-12 flex flex-col items-center gap-6 transition-colors text-center ${
          isDark ? 'bg-slate-900 border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        <div className="w-24 h-24 rounded-3xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-500 animate-bounce">
          <Award className="w-12 h-12" />
        </div>

        <div className="space-y-2">
          <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400">
            Test Finalizado
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Resultado del Test de Be-Past: Review
          </h2>
          <p className="text-sm opacity-80 max-w-md mx-auto">
            {percentage >= 80
              ? '¡Excelente trabajo! Has demostrado un dominio sobresaliente del verbo Be en pasado.'
              : 'Buen esfuerzo. Repasa las preguntas donde tuviste dificultad y vuelve a intentarlo.'}
          </p>
        </div>

        {/* Score Card */}
        <div className="w-full max-w-md p-6 rounded-3xl border border-inherit/20 bg-slate-50 dark:bg-slate-800/60 flex items-center justify-around">
          <div>
            <span className="text-xs font-mono opacity-60 block">Puntaje</span>
            <span className="text-3xl font-extrabold font-mono text-sky-500">
              {totalScore} / {tests.length}
            </span>
          </div>
          <div className="w-px h-12 bg-inherit/20" />
          <div>
            <span className="text-xs font-mono opacity-60 block">Porcentaje</span>
            <span className="text-3xl font-extrabold font-mono text-emerald-500">
              {percentage}%
            </span>
          </div>
        </div>

        {/* Breakdown of each test */}
        <div className="w-full max-w-md grid grid-cols-5 gap-2 pt-2">
          {tests.map((t, idx) => {
            const isQCorrect = correctMap[t.id];
            return (
              <div
                key={t.id}
                className={`p-2.5 rounded-xl border text-center font-mono text-xs font-bold ${
                  isQCorrect
                    ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
                    : 'bg-rose-500/15 border-rose-500/30 text-rose-600 dark:text-rose-400'
                }`}
              >
                Test {idx + 1}
              </div>
            );
          })}
        </div>

        <div className="flex items-center gap-3 pt-4">
          <button
            type="button"
            onClick={handleRestartTest}
            className="px-6 py-3 rounded-2xl border border-inherit/20 font-bold text-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reintentar Test</span>
          </button>

          {onSuccess && (
            <button
              type="button"
              onClick={onSuccess}
              className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md transition-all cursor-pointer flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              <span>Finalizar Sección</span>
            </button>
          )}
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------------------
  // VIEW 2: ACTIVE TEST QUESTION
  // -------------------------------------------------------------------------
  const displayImage = currentTest.illustrationImg || policeAlibiImg;
  const placedWordsCount = Object.values(currentSlotAnswers);

  return (
    <div
      className={`w-full max-w-5xl mx-auto rounded-3xl border shadow-xl overflow-hidden transition-all duration-300 ${
        isDark ? 'bg-slate-900 border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'
      }`}
    >
      <div className="flex flex-col lg:flex-row items-stretch">
        {/* LEFT COLUMN: Media Player + Reference Card + Image */}
        <div
          className={`w-full lg:w-[46%] p-5 sm:p-7 flex flex-col gap-5 border-b lg:border-b-0 lg:border-r ${
            isDark ? 'bg-slate-900/80 border-white/10' : 'bg-slate-50/80 border-slate-200'
          }`}
        >
          {/* Header Progress */}
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-sky-500/15 border border-sky-500/30 text-sky-600 dark:text-sky-400">
              Test {currentIdx + 1} de {tests.length}
            </span>
            <span className="text-xs font-mono opacity-60">Be-Past: Review</span>
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

          {/* Illustration image */}
          <div className="w-full h-40 sm:h-44 rounded-2xl overflow-hidden border border-inherit/20 relative shadow-sm">
            <img
              src={displayImage}
              alt="Test Scene"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-3">
              <span className="text-white text-xs font-medium drop-shadow-sm">
                Test Question {currentIdx + 1}
              </span>
            </div>
          </div>

          {/* Media Player Card (Placed below the image) */}
          <div
            className={`p-4 rounded-2xl border shadow-sm flex flex-col gap-3 transition-colors ${
              isDark ? 'bg-slate-800/90 border-white/10' : 'bg-white border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-semibold uppercase text-sky-600 dark:text-sky-400 flex items-center gap-1.5">
                <Volume2 className="w-4 h-4" />
                Audio Prompt
              </span>
              <span className="text-xs font-mono opacity-60">
                {formatTime(elapsedSeconds)} / {formatTime(totalDurationSeconds)}
              </span>
            </div>

            <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
              <div
                className="bg-sky-500 h-full transition-all duration-300"
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
                  <Gauge className="w-3.5 h-3.5 text-sky-500" />
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
                            ? 'bg-sky-500 text-white font-bold'
                            : 'hover:bg-sky-50 dark:hover:bg-slate-700'
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
                className="w-10 h-10 rounded-full bg-sky-600 hover:bg-sky-500 text-white flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
                aria-label={isPlayingMedia ? 'Pausar audio' : 'Reproducir audio'}
              >
                {isPlayingMedia ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
              </button>
            </div>
          </div>

          {/* Reversible Reference Card */}
          <BePastReferenceCard speed={playerSpeed} accent={accent} />
        </div>

        {/* RIGHT COLUMN: Question, Dialogue, Options, Check & Next */}
        <div className="w-full lg:w-[54%] p-6 sm:p-8 flex flex-col justify-between gap-6">
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between pb-3 border-b border-inherit/15">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  Test Question {currentIdx + 1} of {tests.length}
                </span>
                <h3 className="text-lg font-bold tracking-tight mt-0.5">
                  {currentTest.type === 'dropdown'
                    ? 'Selecciona la opción correcta'
                    : 'Arrastra las palabras a su lugar'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => speakEnglish(currentTest.audioPrompt, playerSpeed, accent)}
                className="p-2 rounded-xl border border-inherit/20 hover:bg-sky-50 dark:hover:bg-slate-800 text-sky-600 dark:text-sky-400 transition-colors"
                title="Escuchar audio del diálogo"
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
                <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase bg-sky-500/20 text-sky-600 dark:text-sky-400">
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
                <Volume2 className="w-3.5 h-3.5 text-sky-500" />
              </button>
            </div>

            {/* 3D Reversible Dialogue Card */}
            <div className="w-full perspective-1000 min-h-[170px]">
              <div
                role="button"
                tabIndex={0}
                onClick={(e) => {
                  const target = e.target as HTMLElement;
                  if (
                    target.closest('button[id^="test-slot-"]') ||
                    target.closest('select') ||
                    target.closest('option')
                  ) {
                    return;
                  }
                  playFeedbackSound('flip');
                  setIsDialogueFlipped((prev) => !prev);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    const target = e.target as HTMLElement;
                    if (target.closest('select') || target.closest('button')) return;
                    e.preventDefault();
                    playFeedbackSound('flip');
                    setIsDialogueFlipped((prev) => !prev);
                  }
                }}
                className={`relative w-full min-h-[170px] rounded-2xl border transition-transform duration-500 transform-style-3d cursor-pointer select-none shadow-sm ${
                  isDark
                    ? 'bg-slate-800/50 border-white/10 text-white'
                    : 'bg-slate-50/90 border-slate-200 text-slate-900'
                } ${isDialogueFlipped ? 'rotate-y-180' : ''}`}
                title="Haz clic para voltear y ver la traducción al castellano"
              >
                {/* ANVERSO / FRONT: Diálogo interactivo en inglés */}
                <div
                  className={`w-full h-full rounded-2xl p-5 sm:p-6 flex flex-col justify-between backface-hidden transition-opacity ${
                    isDialogueFlipped ? 'invisible pointer-events-none' : ''
                  }`}
                >
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-inherit/20">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                      Test Dialogue · English
                    </span>
                    <span className="text-[10px] font-mono opacity-60 flex items-center gap-1 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                      Clic para traducir al castellano ↻
                    </span>
                  </div>

                  <div className="space-y-4 text-base sm:text-lg leading-relaxed font-medium my-auto">
                    {currentTest.dialogueLines.map((line, idx) => (
                      <div
                        key={idx}
                        className="flex flex-wrap items-baseline gap-x-2 gap-y-2 font-medium"
                      >
                        {line.prefix && <span>{line.prefix}</span>}
                        {line.slot && renderSlot(line.slot)}
                        {line.middleText && <span>{line.middleText}</span>}
                        {line.slot2 && renderSlot(line.slot2)}
                        {line.middleText2 && <span>{line.middleText2}</span>}
                        {line.slot3 && renderSlot(line.slot3)}
                        {line.suffix && <span>{line.suffix}</span>}
                        {!line.slot && !line.prefix && line.fullEn && <span>{line.fullEn}</span>}
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 mt-3 border-t border-inherit/15 flex items-center justify-between text-[10px] font-mono opacity-60">
                    <span>Completa los espacios en inglés</span>
                    <span>Clic tarjeta para traducir ↻</span>
                  </div>
                </div>

                {/* REVERSO / BACK: Traducción al castellano */}
                <div
                  className={`absolute inset-0 w-full h-full rounded-2xl p-5 sm:p-6 flex flex-col justify-between backface-hidden rotate-y-180 transition-opacity ${
                    isDark ? 'bg-slate-800 text-emerald-200' : 'bg-emerald-50/90 text-emerald-950 border border-emerald-200'
                  } ${!isDialogueFlipped ? 'invisible pointer-events-none' : ''}`}
                >
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-inherit/20">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                      Traducción al Castellano
                    </span>
                    <span className="text-[10px] font-mono opacity-60 flex items-center gap-1 hover:text-emerald-500 transition-colors">
                      Clic para volver al test ↻
                    </span>
                  </div>

                  <div className="space-y-3 font-serif italic text-base sm:text-lg leading-relaxed text-slate-800 dark:text-emerald-100 my-auto py-1">
                    {currentTest.dialogueLines.map((line, idx) => (
                      <p key={idx} className="flex items-baseline gap-2">
                        <span>{line.fullEs || line.prefixEs || line.fullEn}</span>
                      </p>
                    ))}
                  </div>

                  <div className="pt-2 mt-3 border-t border-inherit/15 flex items-center justify-between text-[10px] font-mono opacity-60">
                    <span>Traducción contextual</span>
                    <span>Castellano</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Drag-Drop Options Pool */}
            {currentTest.type === 'drag-drop' && currentTest.optionsPool && currentTest.optionsPool.length > 0 && (
              <div className="flex flex-col gap-2 pt-2">
                <span className="text-xs font-mono uppercase font-bold opacity-60">
                  Opciones disponibles (haz clic para colocar):
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {currentTest.optionsPool.map((opt, optIdx) => {
                    const timesUsed = placedWordsCount.filter((w) => w === opt).length;
                    const maxAllowed = currentTest.optionsPool.filter((w) => w === opt).length;
                    const isExhausted = timesUsed >= maxAllowed;

                    return (
                      <button
                        key={`${opt}-${optIdx}`}
                        type="button"
                        onClick={() => !isExhausted && handleOptionClick(opt)}
                        disabled={isCurrentChecked || isExhausted}
                        className={`px-3.5 py-2 rounded-xl font-mono text-sm sm:text-base font-semibold border-2 transition-all select-none shadow-xs ${
                          isExhausted
                            ? 'opacity-30 line-through cursor-not-allowed border-dashed border-inherit'
                            : isDark
                            ? 'bg-slate-800 hover:bg-slate-700 text-white border-white/20 hover:border-sky-400 active:scale-95 cursor-pointer'
                            : 'bg-white hover:bg-sky-50 text-slate-800 border-slate-300 hover:border-sky-500 active:scale-95 cursor-pointer'
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Bottom Area: Check / Next / Explanation */}
          <div className="flex flex-col gap-4 pt-4 border-t border-inherit/15">
            {isCurrentChecked && (
              <div
                className={`p-4 rounded-2xl border text-sm animate-in fade-in slide-in-from-top-2 duration-300 ${
                  isCurrentCorrect
                    ? isDark
                      ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300'
                      : 'bg-emerald-50 border-emerald-300 text-emerald-900'
                    : isDark
                    ? 'bg-rose-950/40 border-rose-500/30 text-rose-300'
                    : 'bg-rose-50 border-rose-300 text-rose-900'
                }`}
              >
                <div className="flex items-center gap-2 mb-1.5 font-bold">
                  {isCurrentCorrect ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                      <span>¡Respuesta correcta!</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                      <span>Respuesta incorrecta</span>
                    </>
                  )}
                </div>
                <p className="text-xs sm:text-sm opacity-90 leading-relaxed font-sans">
                  {currentTest.explanationEs || currentTest.explanationEn}
                </p>
              </div>
            )}

            <div className="flex items-center justify-between gap-3 flex-wrap">
              {!isCurrentChecked ? (
                <button
                  type="button"
                  onClick={handleCheckCurrent}
                  disabled={currentSlots.some((s) => !currentSlotAnswers[s.id])}
                  className={`px-6 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all shadow-md ${
                    currentSlots.some((s) => !currentSlotAnswers[s.id])
                      ? 'opacity-40 cursor-not-allowed bg-slate-300 dark:bg-slate-700 text-slate-500'
                      : 'bg-sky-600 hover:bg-sky-500 text-white cursor-pointer active:scale-95'
                  }`}
                >
                  <Check className="w-4 h-4" />
                  <span>Comprobar Respuesta</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNextQuestion}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center gap-2 shadow-md cursor-pointer active:scale-95 transition-all ml-auto"
                >
                  <span>{currentIdx < tests.length - 1 ? 'Siguiente Pregunta' : 'Ver Resultados'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  function renderSlot(slot: { id: string; expectedWord: string; dropdownOptions?: string[] }) {
    const placedValue = currentSlotAnswers[slot.id];
    const isSlotCorrect =
      isCurrentChecked &&
      (placedValue || '').trim().toLowerCase() === slot.expectedWord.trim().toLowerCase();

    if (slot.dropdownOptions && slot.dropdownOptions.length > 0) {
      return (
        <select
          id={`test-slot-${slot.id}`}
          value={placedValue || ''}
          onChange={(e) => handlePlaceWord(slot.id, e.target.value)}
          disabled={isCurrentChecked}
          className={`px-3 py-1.5 rounded-xl border-2 font-mono text-sm sm:text-base font-semibold transition-all outline-none cursor-pointer ${
            isCurrentChecked
              ? isSlotCorrect
                ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                : 'border-rose-500 bg-rose-500/10 text-rose-600 dark:text-rose-400'
              : placedValue
              ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300'
              : isDark
              ? 'border-slate-600 bg-slate-800 text-slate-200 hover:border-slate-500'
              : 'border-slate-300 bg-white text-slate-800 hover:border-slate-400'
          }`}
        >
          <option value="" disabled>
            -- select --
          </option>
          {slot.dropdownOptions.map((opt) => (
            <option key={opt} value={opt} className="text-slate-900 bg-white dark:bg-slate-800 dark:text-white">
              {opt}
            </option>
          ))}
        </select>
      );
    }

    return (
      <button
        type="button"
        id={`test-slot-${slot.id}`}
        onClick={() => placedValue && handleRemoveWord(slot.id)}
        disabled={isCurrentChecked}
        className={`min-w-[100px] sm:min-w-[120px] h-10 px-3 rounded-xl border-2 inline-flex items-center justify-center transition-all select-none ${
          isCurrentChecked
            ? isSlotCorrect
              ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono font-bold'
              : 'border-rose-500 bg-rose-500/10 text-rose-600 dark:text-rose-400 font-mono font-bold'
            : placedValue
            ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300 font-mono font-bold shadow-xs cursor-pointer hover:bg-rose-50 dark:hover:bg-rose-950/30'
            : isDark
            ? 'border-dashed border-slate-600 bg-slate-800/40 text-slate-400'
            : 'border-dashed border-slate-400 bg-slate-100/70 text-slate-400'
        }`}
        title={placedValue ? 'Haz clic para quitar' : 'Haz clic en una opción abajo para colocar'}
      >
        {placedValue ? (
          <span className="flex items-center gap-1.5">
            <span>{placedValue}</span>
            {!isCurrentChecked && <span className="text-xs opacity-60">×</span>}
          </span>
        ) : (
          <span className="text-xs italic opacity-50">________</span>
        )}
      </button>
    );
  }
};
