import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Check,
  Sparkles,
  Volume2,
  VolumeX,
  FileText,
  CheckCircle2,
  XCircle,
  X,
  Gauge,
  ChevronDown,
  Eye,
  EyeOff,
  Info,
} from 'lucide-react';
import { TrueFalseSelectionExercise as TrueFalseExerciseType, LessonSentence } from '../types';
import { speakEnglish, playFeedbackSound } from '../utils/audio';
import { useTheme } from '../context/ThemeContext';
import chuckWoodImg from '../assets/images/chuck_wood_player_1788552205408.jpg';
import { PLAYBACK_SPEEDS, formatSpeedLabel } from './AudioPlayerCard';

interface TrueFalseSelectionExerciseProps {
  exercise: TrueFalseExerciseType;
  accent?: 'US' | 'UK';
  speechRate?: number;
  onSuccess?: () => void;
}

const TOTAL_AUDIO_DURATION_SEC = 41; // 00:41 as shown in screenshot

const defaultSentences: LessonSentence[] = [
  { en: 'Hi, there!', es: '¡Hola!' },
  { en: 'This is Chuck Wood calling from "Working People Magazine."', es: 'Habla Chuck Wood de "Working People Magazine".' },
  { en: 'We have something good for you today: our biggest sale of the year!', es: 'Hoy tenemos algo bueno para ti: ¡nuestra mayor venta del año!' },
  { en: 'The price of our magazine was $2.50 each.', es: 'El precio de nuestra revista era de $2.50 cada una.' },
  { en: "Now it's only $10 for ten magazines.", es: 'Ahora cuesta solo $10 por diez revistas.' },
  { en: "That's $1 each.", es: 'Eso es $1 cada una.' },
  { en: 'Call now!', es: '¡Llama ya!' },
  { en: 'The number is 555-9663.', es: 'El número es 555-9663.' },
  { en: "Don't forget!", es: '¡No lo olvides!' },
  { en: 'That number was 555-9663.', es: 'Ese número era 555-9663.' },
  { en: 'Remember: "Working People Magazine" works for you!', es: 'Recuerda: ¡"Working People Magazine" trabaja para ti!' },
];

export const TrueFalseSelectionExercise: React.FC<TrueFalseSelectionExerciseProps> = ({
  exercise,
  accent = 'US',
  speechRate = 1.0,
  onSuccess,
}) => {
  const { isDark } = useTheme();
  const safeAccent: 'US' | 'UK' = accent === 'UK' ? 'UK' : 'US';

  // Instruction flip
  const [isInstructionFlipped, setIsInstructionFlipped] = useState(false);

  // Selected statements (checked ids)
  const [checkedIds, setCheckedIds] = useState<string[]>([]);
  const [hasChecked, setHasChecked] = useState(false);
  const [isAllCorrect, setIsAllCorrect] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  // Flipped statements state
  const [flippedStmtIds, setFlippedStmtIds] = useState<string[]>([]);

  // Media Player State
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentPlaybackRate, setCurrentPlaybackRate] = useState<number>(speechRate);
  const [isSpeedMenuOpen, setIsSpeedMenuOpen] = useState<boolean>(false);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [currentSentenceIdx, setCurrentSentenceIdx] = useState<number | null>(null);
  const [showTranscript, setShowTranscript] = useState<boolean>(true);

  const sentences = exercise.sentences && exercise.sentences.length > 0 ? exercise.sentences : defaultSentences;

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const speedMenuRef = useRef<HTMLDivElement | null>(null);

  // Close speed menu on outside click
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (speedMenuRef.current && !speedMenuRef.current.contains(target)) {
        setIsSpeedMenuOpen(false);
      }
    };
    window.addEventListener('click', handleGlobalClick);
    return () => window.removeEventListener('click', handleGlobalClick);
  }, []);

  // Sync timer with playback
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setElapsedSeconds((prev) => {
          if (prev >= TOTAL_AUDIO_DURATION_SEC) {
            setIsPlaying(false);
            setCurrentSentenceIdx(null);
            return 0;
          }
          const next = prev + 1;
          const sentenceIndex = Math.min(
            sentences.length - 1,
            Math.floor((next / TOTAL_AUDIO_DURATION_SEC) * sentences.length)
          );
          setCurrentSentenceIdx(sentenceIndex);
          return next;
        });
      }, 1000 / currentPlaybackRate);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, currentPlaybackRate, sentences.length]);

  const handleTogglePlay = () => {
    if (isPlaying) {
      window.speechSynthesis?.cancel();
      setIsPlaying(false);
      return;
    }

    window.speechSynthesis?.cancel();
    setIsPlaying(true);
    setCurrentSentenceIdx(0);
    setElapsedSeconds(0);

    const fullText =
      exercise.audioPrompt ||
      sentences.map((s) => s.en).join(' ');

    speakEnglish(
      fullText,
      currentPlaybackRate,
      safeAccent,
      () => {
        setIsPlaying(true);
      },
      () => {
        setIsPlaying(false);
        setCurrentSentenceIdx(null);
        setElapsedSeconds(TOTAL_AUDIO_DURATION_SEC);
      },
      'male'
    );
  };

  const handlePlaySingleSentence = (sentenceEn: string, idx: number) => {
    window.speechSynthesis?.cancel();
    setIsPlaying(false);
    setCurrentSentenceIdx(idx);

    const targetElapsed = Math.floor((idx / sentences.length) * TOTAL_AUDIO_DURATION_SEC);
    setElapsedSeconds(targetElapsed);

    speakEnglish(
      sentenceEn,
      currentPlaybackRate,
      safeAccent,
      () => {
        setCurrentSentenceIdx(idx);
      },
      () => {
        // finished single sentence
      },
      'male'
    );
  };

  const handleToggleCheckbox = (id: string) => {
    playFeedbackSound('click');
    setShowSolution(false);
    setCheckedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
    if (hasChecked) {
      setHasChecked(false);
    }
  };

  const handleCheckAnswers = () => {
    setShowSolution(false);
    // Check whether checkedIds matches exactly the statements where isTrue === true
    const allCorrect = exercise.statements.every((stmt) => {
      const isChecked = checkedIds.includes(stmt.id);
      return stmt.isTrue ? isChecked : !isChecked;
    });

    setIsAllCorrect(allCorrect);
    setHasChecked(true);

    if (allCorrect) {
      playFeedbackSound('correct');
      if (onSuccess) onSuccess();
    } else {
      playFeedbackSound('wrong');
    }
  };

  const handleReset = () => {
    playFeedbackSound('click');
    setCheckedIds([]);
    setHasChecked(false);
    setIsAllCorrect(false);
    setShowSolution(false);
    setFlippedStmtIds([]);
  };

  const handleToggleFlipStmt = (id: string) => {
    playFeedbackSound('flip');
    setFlippedStmtIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Format seconds to mm:ss
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  return (
    <div className="w-full flex flex-col gap-6 animate-in fade-in duration-200">
      {/* Top Banner: Instruction Card (Reversible for Spanish translation) */}
      <div
        className={`px-5 py-4 sm:px-7 sm:py-5 border-b flex items-center justify-between gap-4 transition-colors ${
          isDark ? 'border-white/10 bg-white/5' : 'border-slate-100 bg-slate-50/70'
        }`}
      >
        <div className="flex-1 perspective-1000 min-h-[60px]">
          <div
            id="true-false-instruction-card"
            onClick={() => {
              playFeedbackSound('flip');
              setIsInstructionFlipped((prev) => !prev);
            }}
            className={`relative w-full min-h-[60px] rounded-2xl cursor-pointer select-none transition-transform duration-500 transform-style-3d border shadow-xs ${
              isInstructionFlipped ? 'rotate-y-180' : ''
            } ${
              isInstructionFlipped
                ? isDark
                  ? 'bg-slate-900 border-emerald-500/30 text-emerald-100'
                  : 'bg-white border-emerald-300 text-emerald-950'
                : isDark
                ? 'bg-[#151C33] border-white/10 text-white hover:border-indigo-500/40'
                : 'bg-white border-slate-200 text-slate-800 hover:border-indigo-300'
            }`}
          >
            {/* Front: English */}
            <div className="absolute inset-0 p-3.5 sm:p-4 flex items-center gap-3 backface-hidden">
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                  isDark ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' : 'bg-indigo-50 text-indigo-600'
                }`}
              >
                <Volume2 className="w-4 h-4" />
              </div>
              <h4 className="text-sm sm:text-base font-medium leading-snug font-sans tracking-tight">
                {exercise.instructions || 'Mark the sentences which are true.'}
              </h4>
            </div>

            {/* Back: Spanish Exact Translation */}
            <div className="absolute inset-0 p-3.5 sm:p-4 flex items-center gap-3 backface-hidden rotate-y-180">
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                  isDark ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-emerald-100 text-emerald-700'
                }`}
              >
                <Volume2 className="w-4 h-4" />
              </div>
              <p className={`text-sm sm:text-base font-medium leading-snug italic ${isDark ? 'text-emerald-200' : 'text-emerald-900'}`}>
                {exercise.instructionsEs || 'Marca las oraciones que son verdaderas.'}
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            speakEnglish(
              exercise.instructions || 'Mark the sentences which are true.',
              currentPlaybackRate,
              safeAccent,
              undefined,
              undefined,
              'male'
            );
          }}
          className={`p-3 rounded-xl border transition-all cursor-pointer ${
            isDark
              ? 'border-white/10 hover:bg-white/10 text-white/70 hover:text-white'
              : 'border-slate-200 hover:bg-slate-100 text-slate-600 hover:text-slate-900'
          }`}
          title="Escuchar instrucción"
        >
          <Volume2 className="w-5 h-5" />
        </button>
      </div>

      {/* Main Grid: 2 Columns (Media Player on Left, Checkboxes on Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Video / Audio Player with Transcript (6 Cols) */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          <div
            className={`rounded-2xl border overflow-hidden transition-all shadow-sm ${
              isDark ? 'bg-[#151C33] border-white/10' : 'bg-white border-slate-200'
            }`}
          >
            {/* Video Stage Container */}
            <div className="relative aspect-4/3 w-full bg-slate-900 overflow-hidden flex items-center justify-center group">
              <img
                src={chuckWoodImg}
                alt="Chuck Wood - Working People Magazine"
                className="w-full h-full object-cover object-center"
              />

              {/* Note / Transcript Toggle Button (top-right, exactly matching screenshot) */}
              <button
                type="button"
                id="toggle-transcript-btn"
                onClick={() => setShowTranscript((prev) => !prev)}
                className="absolute top-3 right-3 w-10 h-10 rounded-lg bg-[#e6f4fa] hover:bg-[#d6effa] text-[#009bd6] border border-[#a2dff7] shadow-sm flex items-center justify-center transition-all cursor-pointer z-10 active:scale-95"
                title={showTranscript ? 'Ocultar transcripción' : 'Ver transcripción'}
              >
                <FileText className="w-5 h-5" />
              </button>
            </div>

            {/* Audio Player Controls Bar */}
            <div
              className={`p-3 sm:p-4 border-t flex items-center justify-between gap-3 ${
                isDark ? 'bg-slate-900/90 border-white/10' : 'bg-slate-50/80 border-slate-200'
              }`}
            >
              {/* Play / Pause button */}
              <button
                type="button"
                id="media-play-pause-btn"
                onClick={handleTogglePlay}
                className="w-9 h-9 rounded-full bg-sky-500 hover:bg-sky-600 text-white flex items-center justify-center shadow-sm transition-all cursor-pointer shrink-0 active:scale-95"
                title={isPlaying ? 'Pausar audio' : 'Reproducir audio'}
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
              </button>

              {/* Progress Bar Slider */}
              <div className="flex-1 flex items-center">
                <input
                  type="range"
                  min={0}
                  max={TOTAL_AUDIO_DURATION_SEC}
                  value={elapsedSeconds}
                  onChange={(e) => {
                    const newTime = Number(e.target.value);
                    setElapsedSeconds(newTime);
                    const idx = Math.min(
                      sentences.length - 1,
                      Math.floor((newTime / TOTAL_AUDIO_DURATION_SEC) * sentences.length)
                    );
                    setCurrentSentenceIdx(idx);
                  }}
                  className="w-full h-1.5 bg-slate-300 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-sky-500"
                />
              </div>

              {/* Speed / Gauge Button with Popup Menu */}
              <div className="relative" ref={speedMenuRef}>
                <button
                  type="button"
                  id="media-speed-btn"
                  onClick={() => setIsSpeedMenuOpen((prev) => !prev)}
                  className={`p-1.5 rounded-lg border transition-all cursor-pointer flex items-center gap-1 ${
                    isDark
                      ? 'border-white/10 hover:bg-white/10 text-white/80'
                      : 'border-slate-300 hover:bg-slate-200/70 text-slate-700'
                  }`}
                  title="Velocidad de reproducción"
                >
                  <Gauge className="w-4 h-4" />
                  <span className="text-[11px] font-mono font-bold hidden sm:inline">
                    {formatSpeedLabel(currentPlaybackRate)}
                  </span>
                </button>

                {isSpeedMenuOpen && (
                  <div
                    className={`absolute bottom-full right-0 mb-2 w-28 rounded-xl border shadow-xl py-1 z-30 overflow-hidden ${
                      isDark ? 'bg-slate-900 border-white/10 text-white' : 'bg-white border-slate-200 text-slate-800'
                    }`}
                  >
                    {PLAYBACK_SPEEDS.map((sp) => (
                      <button
                        key={sp.value}
                        type="button"
                        onClick={() => {
                          setCurrentPlaybackRate(sp.value);
                          setIsSpeedMenuOpen(false);
                          if (isPlaying) {
                            handleTogglePlay();
                            setTimeout(handleTogglePlay, 100);
                          }
                        }}
                        className={`w-full text-left px-3 py-1.5 text-xs font-mono flex items-center justify-between transition-colors ${
                          currentPlaybackRate === sp.value
                            ? 'bg-sky-500 text-white font-bold'
                            : isDark
                            ? 'hover:bg-slate-800'
                            : 'hover:bg-sky-50'
                        }`}
                      >
                        <span>{sp.label}</span>
                        {currentPlaybackRate === sp.value && <Check className="w-3.5 h-3.5" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Mute / Unmute Button */}
              <button
                type="button"
                id="media-volume-btn"
                onClick={() => setIsMuted((prev) => !prev)}
                className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                  isDark
                    ? 'border-white/10 hover:bg-white/10 text-white/80'
                    : 'border-slate-300 hover:bg-slate-200/70 text-slate-700'
                }`}
                title={isMuted ? 'Activar sonido' : 'Silenciar'}
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-rose-500" /> : <Volume2 className="w-4 h-4" />}
              </button>

              {/* Time display (00:xx / 00:41) */}
              <span className="font-mono text-xs text-slate-500 dark:text-slate-400 shrink-0">
                {formatTime(elapsedSeconds)} / {formatTime(TOTAL_AUDIO_DURATION_SEC)}
              </span>
            </div>
          </div>

          {/* Transcript section with highlight */}
          {showTranscript && (
            <div
              className={`p-5 rounded-2xl border text-sm sm:text-base leading-relaxed transition-all ${
                isDark ? 'bg-[#151C33] border-white/10 text-slate-200' : 'bg-white border-slate-200 text-slate-800'
              }`}
            >
              {sentences.map((sent, idx) => {
                const isActive = currentSentenceIdx === idx;
                return (
                  <span
                    key={idx}
                    onClick={() => handlePlaySingleSentence(sent.en, idx)}
                    className={`cursor-pointer transition-all duration-150 rounded px-1 py-0.5 inline ${
                      isActive
                        ? 'bg-amber-300 text-slate-900 font-medium shadow-xs ring-2 ring-amber-400/50'
                        : 'hover:bg-slate-100 dark:hover:bg-slate-800/80'
                    }`}
                    title="Haz clic para escuchar esta oración"
                  >
                    {sent.en}{' '}
                  </span>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Column: Statements List of Reversible Select Cards & Controls (6 Cols) */}
        <div
          className={`lg:col-span-6 rounded-2xl p-5 sm:p-7 border flex flex-col justify-between transition-colors duration-200 shadow-sm ${
            isDark ? 'bg-[#151C33] border-white/10' : 'bg-white border-slate-200'
          }`}
        >
          {/* List of Reversible Select Cards */}
          <div className="flex flex-col gap-3 sm:gap-3.5">
            {exercise.statements.map((stmt) => {
              const isChecked = checkedIds.includes(stmt.id);
              const isCardFlipped = flippedStmtIds.includes(stmt.id);

              // Statement correctness logic:
              // - A True statement (stmt.isTrue === true) is a correct option that SHOULD be marked.
              // - A False statement (stmt.isTrue === false) is an incorrect option that should NOT be marked.
              const isTrueMarked = stmt.isTrue && isChecked;
              const isTrueMissed = stmt.isTrue && !isChecked;
              const isFalseMarked = !stmt.isTrue && isChecked;

              // Card border and background styles
              let cardBgBorder = '';
              if (showSolution) {
                if (stmt.isTrue) {
                  cardBgBorder = 'border-emerald-500/50 bg-emerald-500/10 dark:bg-emerald-950/25';
                } else {
                  cardBgBorder = isDark
                    ? 'border-rose-500/30 bg-rose-950/20'
                    : 'border-rose-200 bg-rose-50/60';
                }
              } else if (hasChecked) {
                if (isTrueMarked) {
                  cardBgBorder = 'border-emerald-500/50 bg-emerald-500/10 dark:bg-emerald-950/25';
                } else if (isTrueMissed) {
                  cardBgBorder = 'border-amber-500/50 bg-amber-500/10 dark:bg-amber-950/25';
                } else if (isFalseMarked) {
                  cardBgBorder = 'border-rose-500/50 bg-rose-500/10 dark:bg-rose-950/25';
                } else {
                  // False statement left unmarked:
                  // Clean, neutral - definitely NOT green!
                  cardBgBorder = isDark
                    ? 'border-white/10 bg-slate-900/30'
                    : 'border-slate-200 bg-slate-50/60';
                }
              } else if (isCardFlipped) {
                cardBgBorder = isDark
                  ? 'border-emerald-500/40 bg-[#0F241A]'
                  : 'border-emerald-300/80 bg-emerald-50/70';
              } else if (isChecked) {
                cardBgBorder = isDark
                  ? 'border-sky-500/50 bg-sky-950/25'
                  : 'border-sky-300 bg-sky-50/70';
              } else {
                cardBgBorder = isDark
                  ? 'border-white/10 hover:border-white/20 bg-slate-900/40'
                  : 'border-slate-200 hover:border-slate-300 bg-white';
              }

              // Checkbox styling & checked state
              const isBoxError = hasChecked && isFalseMarked;
              const isBoxMissed = hasChecked && isTrueMissed;
              const isBoxChecked = showSolution ? stmt.isTrue : isChecked;

              const renderCheckbox = () => (
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggleCheckbox(stmt.id);
                  }}
                  className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all cursor-pointer ${
                    isBoxError
                      ? 'bg-rose-500 border-rose-500 text-white'
                      : isBoxMissed
                      ? 'border-amber-500 bg-amber-500/20 text-amber-600 dark:text-amber-400'
                      : isBoxChecked
                      ? showSolution || (hasChecked && stmt.isTrue)
                        ? 'bg-emerald-600 border-emerald-600 text-white'
                        : 'bg-sky-500 border-sky-500 text-white'
                      : isDark
                      ? 'border-slate-500 bg-slate-800'
                      : 'border-slate-300 bg-white'
                  }`}
                  title={isChecked ? 'Desmarcar' : 'Marcar'}
                >
                  {!isBoxError && isBoxChecked && <Check className="w-3.5 h-3.5 stroke-3" />}
                  {isBoxError && <X className="w-3.5 h-3.5 stroke-3" />}
                  {isBoxMissed && <span className="text-[11px] font-bold">!</span>}
                </div>
              );

              // Status badge on the right
              const renderStatusBadge = () => {
                if (!hasChecked && !showSolution) return null;

                if (showSolution) {
                  return stmt.isTrue ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      Verdadera
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30">
                      <XCircle className="w-3.5 h-3.5 shrink-0" />
                      Falsa
                    </span>
                  );
                }

                if (stmt.isTrue) {
                  return isChecked ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      Verdadera
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                      <XCircle className="w-3.5 h-3.5 shrink-0" />
                      Faltó marcar
                    </span>
                  );
                }

                // stmt.isTrue === false (False sentences, like "The magazine is for schoolchildren" and "There will be a bigger sale next week")
                if (isChecked) {
                  return (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30">
                      <XCircle className="w-3.5 h-3.5 shrink-0" />
                      Falsa (incorrecta)
                    </span>
                  );
                }

                // If unchecked, it was correctly left unmarked
                return (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    Falsa (correcto no marcar)
                  </span>
                );
              };

              return (
                <div
                  key={stmt.id}
                  className="perspective-1000 w-full min-h-[70px] sm:min-h-[64px]"
                >
                  <div
                    id={`select-card-${stmt.id}`}
                    onClick={() => handleToggleFlipStmt(stmt.id)}
                    className={`relative w-full h-full min-h-[70px] sm:min-h-[64px] rounded-xl cursor-pointer select-none transition-transform duration-500 transform-style-3d border shadow-xs ${
                      isCardFlipped ? 'rotate-y-180' : ''
                    } ${cardBgBorder}`}
                  >
                    {/* ANVERSO / FRONT: English sentence + Checkbox */}
                    <div className="absolute inset-0 p-3.5 sm:p-4 flex items-center justify-between gap-3.5 backface-hidden">
                      <div className="flex items-center gap-3.5 flex-1 min-w-0">
                        {renderCheckbox()}

                        {/* Statement text */}
                        <span
                          className={`text-sm sm:text-base font-normal leading-snug flex-1 select-none ${
                            isDark ? 'text-slate-100' : 'text-slate-800'
                          }`}
                        >
                          {stmt.text}
                        </span>
                      </div>

                      {/* Status indicator on the right */}
                      {renderStatusBadge()}
                    </div>

                    {/* REVERSO / BACK: Spanish translation + Checkbox */}
                    <div className="absolute inset-0 p-3.5 sm:p-4 flex items-center justify-between gap-3.5 backface-hidden rotate-y-180">
                      <div className="flex items-center gap-3.5 flex-1 min-w-0">
                        {renderCheckbox()}

                        {/* Translated Statement text */}
                        <span
                          className={`text-sm sm:text-base font-medium leading-snug italic flex-1 select-none ${
                            isDark ? 'text-emerald-200' : 'text-emerald-900'
                          }`}
                        >
                          {stmt.textEs || stmt.text}
                        </span>
                      </div>

                      {/* Status indicator on the right */}
                      {renderStatusBadge()}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action buttons and Status Feedback */}
          <div className="mt-6 pt-4 border-t border-inherit/30 flex flex-col gap-3 shrink-0 w-full">
            {/* Buttons line */}
            <div className="flex items-center gap-2.5 flex-wrap shrink-0">
              <button
                type="button"
                id="check-true-false-answers-btn"
                onClick={handleCheckAnswers}
                className="px-4 sm:px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm tracking-normal shadow-sm hover:shadow transition-all cursor-pointer flex items-center gap-2 shrink-0 active:scale-95"
              >
                <Check className="w-4 h-4" />
                <span>Comprobar Respuestas</span>
              </button>

              <button
                type="button"
                id="toggle-true-false-solution-btn"
                onClick={() => {
                  playFeedbackSound('click');
                  setShowSolution((prev) => !prev);
                }}
                className={`px-3.5 sm:px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all cursor-pointer shrink-0 active:scale-95 ${
                  showSolution
                    ? 'bg-amber-500 text-white border-amber-600 shadow-xs'
                    : isDark
                    ? 'border-white/10 hover:bg-white/10 text-white/80 hover:text-white'
                    : 'border-slate-300 hover:bg-slate-100 text-slate-700'
                }`}
                title={showSolution ? 'Ocultar respuestas' : 'Ver respuestas'}
              >
                {showSolution ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                <span>{showSolution ? 'Ocultar Solución' : 'Ver Respuestas'}</span>
              </button>

              <button
                type="button"
                id="reset-true-false-answers-btn"
                onClick={handleReset}
                className={`p-2.5 rounded-xl border transition-all cursor-pointer shrink-0 active:scale-95 ${
                  isDark
                    ? 'border-white/10 hover:bg-white/10 text-white/70 hover:text-white'
                    : 'border-slate-200 hover:bg-slate-100 text-slate-600 hover:text-slate-900'
                }`}
                title="Reiniciar respuestas"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Status indicator placed directly below the buttons */}
            {hasChecked && !showSolution && (
              <div
                className={`w-full flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium animate-in fade-in slide-in-from-top-1 duration-150 ${
                  isAllCorrect
                    ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                    : 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30'
                }`}
              >
                {isAllCorrect ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
                    <span className="leading-snug">¡Excelente! Has identificado correctamente las oraciones verdaderas.</span>
                    <Sparkles className="w-3.5 h-3.5 text-emerald-500 animate-bounce shrink-0" />
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 shrink-0 text-amber-500" />
                    <span className="leading-snug">
                      Revisa las oraciones marcadas. Recuerda que solo debes marcar las oraciones que son verdaderas (&ldquo;The magazine is for schoolchildren&rdquo; y &ldquo;There will be a bigger sale next week&rdquo; son oraciones falsas).
                    </span>
                  </>
                )}
              </div>
            )}

            {/* Detailed Explanation */}
            {(hasChecked || showSolution) && exercise.explanation && (
              <div
                className={`w-full p-3.5 sm:p-4 rounded-xl text-xs sm:text-sm border transition-all ${
                  isDark
                    ? 'bg-slate-900/60 border-indigo-500/20 text-slate-300'
                    : 'bg-indigo-50/50 border-indigo-200 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-2 mb-1.5 font-semibold text-indigo-600 dark:text-indigo-400">
                  <Info className="w-4 h-4 shrink-0" />
                  <span>Explicación:</span>
                </div>
                <p className="leading-relaxed">{exercise.explanation}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
