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
  Gauge,
} from 'lucide-react';
import { RadioChoiceExercise as RadioChoiceExerciseType, LessonSentence } from '../types';
import { speakEnglish, playFeedbackSound } from '../utils/audio';
import { useTheme } from '../context/ThemeContext';
import chuckWoodImg from '../assets/images/chuck_wood_player_1788552205408.jpg';
import { PLAYBACK_SPEEDS, formatSpeedLabel } from './AudioPlayerCard';

interface RadioChoiceExerciseProps {
  exercise: RadioChoiceExerciseType;
  accent?: 'US' | 'UK';
  speechRate?: number;
  onSuccess?: () => void;
}

const TOTAL_AUDIO_DURATION_SEC = 41; // 00:41 as shown in course screenshot

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

export const RadioChoiceExercise: React.FC<RadioChoiceExerciseProps> = ({
  exercise,
  accent = 'US',
  speechRate = 1.0,
  onSuccess,
}) => {
  const { isDark } = useTheme();
  const safeAccent: 'US' | 'UK' = accent === 'UK' ? 'UK' : 'US';

  const durationSeconds = exercise.durationSeconds || TOTAL_AUDIO_DURATION_SEC;
  const displayImage = exercise.imageUrl || chuckWoodImg;
  const speakerVoice = exercise.speakerGender || 'male';

  // Selected radio option id
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [hasChecked, setHasChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // Reversible card tracking (no buttons, no text indicators)
  const [isInstructionFlipped, setIsInstructionFlipped] = useState(false);
  const [isQuestionFlipped, setIsQuestionFlipped] = useState(false);
  const [isTranscriptFlipped, setIsTranscriptFlipped] = useState(false);
  const [flippedOptionIds, setFlippedOptionIds] = useState<string[]>([]);

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

  // Reset state when exercise changes
  useEffect(() => {
    setSelectedOptionId(null);
    setHasChecked(false);
    setIsCorrect(false);
    setIsInstructionFlipped(false);
    setIsQuestionFlipped(false);
    setIsTranscriptFlipped(false);
    setFlippedOptionIds([]);
    setIsPlaying(false);
    setElapsedSeconds(0);
    setCurrentSentenceIdx(null);
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }, [exercise.id]);

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
          if (prev >= durationSeconds) {
            setIsPlaying(false);
            setCurrentSentenceIdx(null);
            return 0;
          }
          const next = prev + 1;
          const sentenceIndex = Math.min(
            sentences.length - 1,
            Math.floor((next / durationSeconds) * sentences.length)
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
  }, [isPlaying, currentPlaybackRate, sentences.length, durationSeconds]);

  const handleTogglePlay = () => {
    if (isPlaying) {
      window.speechSynthesis?.cancel();
      setIsPlaying(false);
      setCurrentSentenceIdx(null);
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
        setElapsedSeconds(durationSeconds);
      },
      speakerVoice
    );
  };

  const handlePlaySingleSentence = (sentenceEn: string, idx: number) => {
    window.speechSynthesis?.cancel();
    setIsPlaying(true);
    setCurrentSentenceIdx(idx);

    const targetElapsed = Math.floor((idx / sentences.length) * durationSeconds);
    setElapsedSeconds(targetElapsed);

    speakEnglish(
      sentenceEn,
      currentPlaybackRate,
      safeAccent,
      () => {
        setIsPlaying(true);
        setCurrentSentenceIdx(idx);
      },
      () => {
        setIsPlaying(false);
        setCurrentSentenceIdx(null);
      },
      speakerVoice
    );
  };

  const handleToggleFlipOption = (optId: string) => {
    playFeedbackSound('flip');
    setFlippedOptionIds((prev) =>
      prev.includes(optId) ? prev.filter((id) => id !== optId) : [...prev, optId]
    );
  };

  const handleSelectOption = (optId: string) => {
    playFeedbackSound('click');
    setSelectedOptionId(optId);
  };

  const handleCheckAnswer = () => {
    if (!selectedOptionId) {
      playFeedbackSound('wrong');
      return;
    }

    const correct = selectedOptionId === exercise.correctAnswerId;
    setIsCorrect(correct);
    setHasChecked(true);

    if (correct) {
      playFeedbackSound('correct');
      if (onSuccess) onSuccess();
    } else {
      playFeedbackSound('wrong');
    }
  };

  const handleReset = () => {
    playFeedbackSound('click');
    setSelectedOptionId(null);
    setHasChecked(false);
    setIsCorrect(false);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full flex flex-col gap-5 select-none">
      {/* Top Header Card: Reversible Instruction */}
      <div className="flex items-center justify-between gap-3 w-full">
        <div className="flex-1 perspective-1000 min-h-[52px]">
          <div
            id={`radio-instruction-flip-card-${exercise.id}`}
            onClick={() => {
              playFeedbackSound('flip');
              setIsInstructionFlipped((prev) => !prev);
            }}
            className={`relative w-full min-h-[52px] rounded-2xl cursor-pointer select-none transition-transform duration-500 transform-style-3d border shadow-xs ${
              isInstructionFlipped ? 'rotate-y-180' : ''
            } ${
              isInstructionFlipped
                ? isDark
                  ? 'bg-[#0F241A] border-emerald-500/30 text-emerald-100'
                  : 'bg-emerald-50/90 border-emerald-200 text-emerald-950'
                : isDark
                ? 'bg-[#151C33] border-white/10 text-white hover:border-indigo-500/40'
                : 'bg-white border-slate-200 text-slate-800 hover:border-indigo-300'
            }`}
          >
            {/* Front: English */}
            <div className="absolute inset-0 px-4 py-3 flex items-center gap-3 backface-hidden">
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                  isDark ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' : 'bg-indigo-50 text-indigo-600'
                }`}
              >
                <Volume2 className="w-3.5 h-3.5" />
              </div>
              <h4 className="text-sm sm:text-base font-medium leading-snug font-sans tracking-tight">
                {exercise.instructions || 'Choose the best answers to the questions below.'}
              </h4>
            </div>

            {/* Back: Spanish Translation */}
            <div className="absolute inset-0 px-4 py-3 flex items-center gap-3 backface-hidden rotate-y-180">
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                  isDark ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-emerald-100 text-emerald-700'
                }`}
              >
                <Volume2 className="w-3.5 h-3.5" />
              </div>
              <p className={`text-sm sm:text-base font-medium leading-snug italic ${isDark ? 'text-emerald-200' : 'text-emerald-900'}`}>
                {exercise.instructionsEs || 'Elige las mejores respuestas a las siguientes preguntas.'}
              </p>
            </div>
          </div>
        </div>

        {/* Audio button for instruction */}
        <button
          type="button"
          onClick={() => {
            speakEnglish(
              exercise.instructions || 'Choose the best answers to the questions below.',
              currentPlaybackRate,
              safeAccent,
              undefined,
              undefined,
              'male'
            );
          }}
          className={`p-2.5 rounded-xl border transition-all cursor-pointer shrink-0 ${
            isDark
              ? 'border-white/10 hover:bg-white/10 text-white/70 hover:text-white'
              : 'border-slate-200 hover:bg-slate-100 text-slate-600 hover:text-slate-900'
          }`}
          title="Escuchar instrucción"
          aria-label="Escuchar instrucción"
        >
          <Volume2 className="w-4 h-4" />
        </button>
      </div>

      {/* Main Grid: Left Column (Audio Player + Transcript) & Right Column (Question + Radio Cards) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Media Player with Chuck Wood photo + Transcript (6 Cols) */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          <div
            id={`media-player-container-${exercise.id}`}
            className={`rounded-2xl border overflow-hidden shadow-sm transition-all ${
              isDark ? 'bg-[#151C33] border-white/10' : 'bg-white border-slate-200'
            }`}
          >
            {/* Image Preview with Chuck Wood or Section dialogue photo */}
            <div className="relative aspect-[16/11] bg-slate-900 overflow-hidden flex items-center justify-center">
              <img
                src={displayImage}
                alt="Dialogue illustration"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top"
              />

              {/* Note / Transcript Toggle Button (top-right, exactly matching screenshot) */}
              <button
                type="button"
                id={`toggle-transcript-btn-${exercise.id}`}
                onClick={() => setShowTranscript((prev) => !prev)}
                className="absolute top-3 right-3 w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#e6f4fa] hover:bg-[#d6effa] text-[#009bd6] border border-[#a2dff7] shadow-xs flex items-center justify-center transition-all cursor-pointer z-10 active:scale-95"
                title={showTranscript ? 'Ocultar transcripción' : 'Ver transcripción'}
                aria-label="Ver transcripción"
              >
                <FileText className="w-5 h-5" />
              </button>
            </div>

            {/* Audio Player Controls Bar */}
            <div
              className={`p-3 sm:p-3.5 border-t flex items-center justify-between gap-3 ${
                isDark ? 'bg-slate-900/90 border-white/10' : 'bg-slate-50/80 border-slate-200'
              }`}
            >
              {/* Play / Pause button */}
              <button
                type="button"
                id={`media-play-pause-btn-${exercise.id}`}
                onClick={handleTogglePlay}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-sky-500 hover:bg-sky-600 text-white flex items-center justify-center shadow-xs transition-all cursor-pointer shrink-0 active:scale-95"
                title={isPlaying ? 'Pausar audio' : 'Reproducir audio'}
                aria-label="Reproducir o pausar"
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
              </button>

              {/* Progress Bar Slider */}
              <div className="flex-1 flex items-center">
                <input
                  type="range"
                  min={0}
                  max={durationSeconds}
                  value={elapsedSeconds}
                  onChange={(e) => {
                    const newTime = Number(e.target.value);
                    setElapsedSeconds(newTime);
                    const idx = Math.min(
                      sentences.length - 1,
                      Math.floor((newTime / durationSeconds) * sentences.length)
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
                  id={`media-speed-btn-${exercise.id}`}
                  onClick={() => setIsSpeedMenuOpen((prev) => !prev)}
                  className={`p-1.5 rounded-lg border transition-all cursor-pointer flex items-center gap-1 ${
                    isDark
                      ? 'border-white/10 hover:bg-white/10 text-white/80'
                      : 'border-slate-300 hover:bg-slate-200/70 text-slate-700'
                  }`}
                  title="Velocidad de reproducción"
                >
                  <Gauge className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-mono font-bold hidden sm:inline">
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
                id={`media-volume-btn-${exercise.id}`}
                onClick={() => setIsMuted((prev) => !prev)}
                className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                  isDark
                    ? 'border-white/10 hover:bg-white/10 text-white/80'
                    : 'border-slate-300 hover:bg-slate-200/70 text-slate-700'
                }`}
                title={isMuted ? 'Activar sonido' : 'Silenciar'}
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5 text-rose-500" /> : <Volume2 className="w-3.5 h-3.5" />}
              </button>

              {/* Time display (00:xx / 00:xx) */}
              <span className="font-mono text-[11px] text-slate-500 dark:text-slate-400 shrink-0">
                {formatTime(elapsedSeconds)} / {formatTime(durationSeconds)}
              </span>
            </div>
          </div>

          {/* Transcript section (Reversible Card) */}
          {showTranscript && (
            <div className="perspective-1000 w-full">
              <div
                id={`transcript-card-${exercise.id}`}
                onClick={() => {
                  playFeedbackSound('flip');
                  setIsTranscriptFlipped((prev) => !prev);
                }}
                className={`relative w-full rounded-2xl border p-4 sm:p-5 text-xs sm:text-sm leading-relaxed transition-transform duration-500 transform-style-3d cursor-pointer select-none shadow-xs ${
                  isTranscriptFlipped ? 'rotate-y-180' : ''
                } ${
                  isTranscriptFlipped
                    ? isDark
                      ? 'bg-[#0F241A] border-emerald-500/30 text-emerald-100'
                      : 'bg-emerald-50/90 border-emerald-200 text-emerald-950'
                    : isDark
                    ? 'bg-[#151C33] border-white/10 text-slate-200'
                    : 'bg-white border-slate-200 text-slate-800'
                }`}
              >
                {/* Front Face: English sentences with active highlighting */}
                <div className="backface-hidden">
                  <div className="flex flex-wrap gap-1.5 items-baseline">
                    {sentences.map((sent, idx) => {
                      const isHighlighted = isPlaying && currentSentenceIdx === idx;

                      return (
                        <span
                          key={idx}
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePlaySingleSentence(sent.en, idx);
                          }}
                          className={`rounded px-1.5 py-0.5 cursor-pointer transition-all ${
                            isHighlighted
                              ? 'bg-yellow-300 text-slate-950 font-semibold shadow-xs'
                              : isDark
                              ? 'hover:bg-white/10 text-slate-300'
                              : 'hover:bg-slate-100 text-slate-700'
                          }`}
                        >
                          {sent.en}
                        </span>
                      );
                    })}
                  </div>
                </div>

                {/* Back Face: Spanish sentences */}
                <div className="absolute inset-0 p-4 sm:p-5 backface-hidden rotate-y-180 overflow-y-auto">
                  <div className="flex flex-wrap gap-1.5 items-baseline">
                    {sentences.map((sent, idx) => {
                      const isHighlighted = isPlaying && currentSentenceIdx === idx;

                      return (
                        <span
                          key={idx}
                          className={`rounded px-1.5 py-0.5 transition-all italic ${
                            isHighlighted
                              ? isDark
                                ? 'bg-emerald-500/30 text-white font-semibold'
                                : 'bg-emerald-200 text-emerald-950 font-semibold'
                              : isDark
                              ? 'text-emerald-200/90'
                              : 'text-emerald-900'
                          }`}
                        >
                          {sent.es}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Question + Reversible Radio Options Cards (6 Cols) */}
        <div
          className={`lg:col-span-6 rounded-2xl p-5 sm:p-6 border flex flex-col justify-between transition-colors duration-200 shadow-xs ${
            isDark ? 'bg-[#151C33] border-white/10' : 'bg-white border-slate-200'
          }`}
        >
          <div className="flex flex-col gap-4">
            {/* Question Card: Reversible showing translation */}
            <div className="perspective-1000 w-full min-h-[46px]">
              <div
                id={`question-card-${exercise.id}`}
                onClick={() => {
                  playFeedbackSound('flip');
                  setIsQuestionFlipped((prev) => !prev);
                }}
                className={`relative w-full min-h-[46px] rounded-xl cursor-pointer select-none transition-transform duration-500 transform-style-3d border shadow-xs ${
                  isQuestionFlipped ? 'rotate-y-180' : ''
                } ${
                  isQuestionFlipped
                    ? isDark
                      ? 'bg-[#0F241A] border-emerald-500/30 text-emerald-100'
                      : 'bg-emerald-50/90 border-emerald-200 text-emerald-950'
                    : isDark
                    ? 'bg-slate-900/60 border-white/10 text-white hover:border-indigo-400'
                    : 'bg-slate-50 border-slate-200 text-slate-900 hover:border-indigo-300'
                }`}
              >
                {/* Front: English Question */}
                <div className="absolute inset-0 px-4 py-2.5 flex items-center backface-hidden">
                  <span className="font-semibold text-sm sm:text-base leading-snug">
                    {exercise.question || 'Chuck Wood phones people to...'}
                  </span>
                </div>

                {/* Back: Spanish Translation */}
                <div className="absolute inset-0 px-4 py-2.5 flex items-center backface-hidden rotate-y-180">
                  <span className="font-semibold text-sm sm:text-base leading-snug italic">
                    {exercise.questionEs || 'Chuck Wood llama a las personas para...'}
                  </span>
                </div>
              </div>
            </div>

            {/* List of Reversible Radio Cards */}
            <div className="flex flex-col gap-3">
              {exercise.options.map((opt) => {
                const isSelected = selectedOptionId === opt.id;
                const isCardFlipped = flippedOptionIds.includes(opt.id);
                const isOptCorrect = opt.id === exercise.correctAnswerId;

                return (
                  <div
                    key={opt.id}
                    className="perspective-1000 w-full min-h-[60px]"
                  >
                    <div
                      id={`radio-card-${opt.id}`}
                      onClick={() => handleToggleFlipOption(opt.id)}
                      className={`relative w-full h-full min-h-[60px] rounded-xl cursor-pointer select-none transition-transform duration-500 transform-style-3d border shadow-xs ${
                        isCardFlipped ? 'rotate-y-180' : ''
                      } ${
                        hasChecked
                          ? isSelected
                            ? isOptCorrect
                              ? 'border-emerald-500 bg-emerald-500/10 text-emerald-900 dark:text-emerald-200 ring-2 ring-emerald-400'
                              : 'border-rose-500 bg-rose-500/10 text-rose-900 dark:text-rose-200 ring-2 ring-rose-400'
                            : isDark
                            ? 'border-white/10 bg-slate-900/40 text-slate-400'
                            : 'border-slate-200 bg-slate-50 text-slate-400'
                          : isCardFlipped
                          ? isDark
                            ? 'border-emerald-500/40 bg-[#0F241A] text-emerald-100'
                            : 'border-emerald-300 bg-emerald-50/90 text-emerald-950'
                          : isSelected
                          ? isDark
                            ? 'border-indigo-400 bg-indigo-600/20 text-white ring-2 ring-indigo-500'
                            : 'border-indigo-500 bg-indigo-50/80 text-indigo-950 ring-2 ring-indigo-400'
                          : isDark
                          ? 'border-white/10 hover:border-white/20 bg-slate-900/40 text-slate-100'
                          : 'border-slate-200 hover:border-slate-300 bg-white text-slate-800'
                      }`}
                    >
                      {/* ANVERSO / FRONT: English sentence + Radio button */}
                      <div className="absolute inset-0 px-4 py-3 flex items-center justify-between gap-3 backface-hidden">
                        <div className="flex items-center gap-3.5 flex-1 min-w-0">
                          {/* Circular Radio Button */}
                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSelectOption(opt.id);
                            }}
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all cursor-pointer ${
                              isSelected
                                ? 'border-sky-500 bg-white dark:bg-slate-900'
                                : isDark
                                ? 'border-slate-500 bg-slate-800'
                                : 'border-slate-300 bg-white'
                            }`}
                          >
                            {isSelected && (
                              <div className="w-2.5 h-2.5 rounded-full bg-sky-500" />
                            )}
                          </div>

                          {/* Option text in English */}
                          <span className="text-sm sm:text-base font-normal leading-snug flex-1 select-none">
                            {opt.text}
                          </span>
                        </div>

                        {/* Status feedback icon after checking */}
                        {hasChecked && isSelected && (
                          <div className="shrink-0 ml-1">
                            {isOptCorrect ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                            ) : (
                              <XCircle className="w-4 h-4 text-rose-500" />
                            )}
                          </div>
                        )}
                      </div>

                      {/* REVERSO / BACK: Spanish translation + Radio button */}
                      <div className="absolute inset-0 px-4 py-3 flex items-center justify-between gap-3 backface-hidden rotate-y-180">
                        <div className="flex items-center gap-3.5 flex-1 min-w-0">
                          {/* Circular Radio Button on reverse face */}
                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSelectOption(opt.id);
                            }}
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all cursor-pointer ${
                              isSelected
                                ? 'border-emerald-500 bg-white dark:bg-slate-900'
                                : isDark
                                ? 'border-emerald-600 bg-emerald-950'
                                : 'border-emerald-400 bg-white'
                            }`}
                          >
                            {isSelected && (
                              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                            )}
                          </div>

                          {/* Translated text in Spanish */}
                          <span className="text-sm sm:text-base font-medium leading-snug italic flex-1 select-none">
                            {opt.textEs}
                          </span>
                        </div>

                        {/* Status feedback icon after checking */}
                        {hasChecked && isSelected && (
                          <div className="shrink-0 ml-1">
                            {isOptCorrect ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                            ) : (
                              <XCircle className="w-4 h-4 text-rose-500" />
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action buttons and Status Feedback (Feedback placed directly below Comprobar Respuestas) */}
          <div className="mt-6 pt-4 border-t border-inherit/30 flex flex-col gap-3 shrink-0 w-full">
            {/* Buttons row */}
            <div className="flex items-center gap-2.5 shrink-0">
              <button
                type="button"
                id={`check-answer-btn-${exercise.id}`}
                onClick={handleCheckAnswer}
                className="px-4 sm:px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm tracking-normal shadow-xs hover:shadow transition-all cursor-pointer flex items-center gap-2 shrink-0 active:scale-95"
              >
                <Check className="w-4 h-4" />
                <span>Comprobar Respuestas</span>
              </button>

              <button
                type="button"
                id={`reset-answer-btn-${exercise.id}`}
                onClick={handleReset}
                className={`p-2.5 rounded-xl border transition-all cursor-pointer shrink-0 active:scale-95 ${
                  isDark
                    ? 'border-white/10 hover:bg-white/10 text-white/70 hover:text-white'
                    : 'border-slate-200 hover:bg-slate-100 text-slate-600 hover:text-slate-900'
                }`}
                title="Reiniciar respuesta"
                aria-label="Reiniciar respuesta"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Status indicator placed directly below the button */}
            {hasChecked && (
              <div
                className={`w-full flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium animate-in fade-in slide-in-from-top-1 duration-150 ${
                  isCorrect
                    ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                    : 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30'
                }`}
              >
                {isCorrect ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
                    <span className="leading-snug">¡Excelente trabajo! Has seleccionado la respuesta correcta.</span>
                    <Sparkles className="w-3.5 h-3.5 text-emerald-500 animate-bounce shrink-0" />
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 shrink-0 text-rose-500" />
                    <span className="leading-snug">
                      Respuesta incorrecta. Revisa el audio o la transcripción y vuelve a intentarlo.
                    </span>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
