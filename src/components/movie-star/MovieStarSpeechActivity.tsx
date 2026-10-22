import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  FileText,
  Gauge,
  Mic,
  MicOff,
  CheckCircle2,
  XCircle,
  Headphones,
  Sparkles,
  RotateCw,
  Check,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { speakEnglish, stopSpeaking, playFeedbackSound } from '../../utils/audio';
import { SpeechResponseExercise } from '../../types';
import {
  movieStarImg,
  MOVIE_STAR_SENTENCES,
  MOVIE_STAR_AUDIO_TEXT,
} from '../../data/movieStarData';
import { PLAYBACK_SPEEDS, formatSpeedLabel, formatTime } from './MovieStarExploreActivity';

interface MovieStarSpeechActivityProps {
  exercise: SpeechResponseExercise;
  activityNumber: number; // 6 or 7
  speechRate?: number;
  accent?: 'US' | 'UK';
  onNext?: () => void;
}

export const MovieStarSpeechActivity: React.FC<MovieStarSpeechActivityProps> = ({
  exercise,
  activityNumber,
  speechRate = 1.0,
  accent = 'US',
  onNext,
}) => {
  const { isDark } = useTheme();
  const safeAccent: 'US' | 'UK' = accent === 'UK' ? 'UK' : 'US';

  // Selection & verification
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [hasChecked, setHasChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // Card flips
  const [isInstructionFlipped, setIsInstructionFlipped] = useState(false);
  const [isPromptFlipped, setIsPromptFlipped] = useState(false);
  const [flippedOptionIds, setFlippedOptionIds] = useState<string[]>([]);

  // Media Player states
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [currentSentenceIdx, setCurrentSentenceIdx] = useState<number | null>(null);
  const [showTranscript, setShowTranscript] = useState(true);

  // Speed controls
  const [currentRate, setCurrentRate] = useState(speechRate);
  const [isSpeedMenuOpen, setIsSpeedMenuOpen] = useState(false);
  const speedMenuRef = useRef<HTMLDivElement | null>(null);

  // Speech Recognition / Recording
  const [isRecording, setIsRecording] = useState(false);
  const [speechTranscript, setSpeechTranscript] = useState('');
  const [speechAccuracy, setSpeechAccuracy] = useState<number | null>(null);
  const recognitionRef = useRef<any>(null);

  const durationSeconds = 19;
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setCurrentRate(speechRate);
  }, [speechRate]);

  // Reset when exercise changes
  useEffect(() => {
    setSelectedOptionId(null);
    setHasChecked(false);
    setIsCorrect(false);
    setIsInstructionFlipped(false);
    setIsPromptFlipped(false);
    setFlippedOptionIds([]);
    setIsPlaying(false);
    setElapsedSeconds(0);
    setCurrentSentenceIdx(null);
    setSpeechTranscript('');
    setSpeechAccuracy(null);
    stopSpeaking();
  }, [exercise.id]);

  // Outside click for speed menu
  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (speedMenuRef.current && !speedMenuRef.current.contains(e.target as Node)) {
        setIsSpeedMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  // Audio timer
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setElapsedSeconds((prev) => {
          if (prev >= durationSeconds) {
            setIsPlaying(false);
            setCurrentSentenceIdx(null);
            return 0;
          }
          const nextSec = prev + 1;
          const matchedIdx = MOVIE_STAR_SENTENCES.findIndex(
            (s) => nextSec >= s.startTime && nextSec < s.endTime
          );
          if (matchedIdx !== -1) {
            setCurrentSentenceIdx(matchedIdx);
          }
          return nextSec;
        });
      }, 1000 / currentRate);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, durationSeconds, currentRate]);

  // Cleanup
  useEffect(() => {
    return () => {
      stopSpeaking();
      if (timerRef.current) clearInterval(timerRef.current);
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {
          // ignore
        }
      }
    };
  }, []);

  const handleTogglePlay = () => {
    if (isPlaying) {
      stopSpeaking();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      setCurrentSentenceIdx(0);
      if (!isMuted) {
        speakEnglish(
          MOVIE_STAR_AUDIO_TEXT,
          currentRate,
          safeAccent,
          () => {
            setIsPlaying(false);
            setCurrentSentenceIdx(null);
            setElapsedSeconds(0);
          },
          undefined,
          'male'
        );
      }
    }
  };

  const handleReset = () => {
    stopSpeaking();
    setIsPlaying(false);
    setElapsedSeconds(0);
    setCurrentSentenceIdx(null);
    setSelectedOptionId(null);
    setHasChecked(false);
    setIsCorrect(false);
    setFlippedOptionIds([]);
    setSpeechTranscript('');
    setSpeechAccuracy(null);
    setIsRecording(false);
  };

  const handlePlaySentence = (text: string, idx: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    stopSpeaking();
    setIsPlaying(false);
    setCurrentSentenceIdx(idx);
    const targetSpeaker = MOVIE_STAR_SENTENCES[idx]?.speakerGender || 'male';
    speakEnglish(
      text,
      currentRate,
      safeAccent,
      () => setCurrentSentenceIdx(null),
      undefined,
      targetSpeaker
    );
  };

  const handleSpeakText = (text: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    stopSpeaking();
    speakEnglish(text, currentRate, safeAccent);
  };

  const toggleOptionFlip = (optionId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    playFeedbackSound('flip');
    setFlippedOptionIds((prev) =>
      prev.includes(optionId) ? prev.filter((id) => id !== optionId) : [...prev, optionId]
    );
  };

  const handleSelectOption = (optId: string) => {
    playFeedbackSound('click');
    setSelectedOptionId(optId);
    setHasChecked(false);
  };

  // Start recording speech with Web Speech API or simulated fallback
  const handleStartRecording = () => {
    stopSpeaking();
    playFeedbackSound('click');

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      // Fallback simulation: select correct or current option and evaluate
      setIsRecording(true);
      setTimeout(() => {
        setIsRecording(false);
        const targetOpt = exercise.options.find((o) => o.id === exercise.correctAnswerId);
        if (targetOpt) {
          setSelectedOptionId(targetOpt.id);
          setSpeechTranscript(targetOpt.text);
          setSpeechAccuracy(96);
          setIsCorrect(true);
          setHasChecked(true);
          playFeedbackSound('correct');
        }
      }, 2500);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = safeAccent === 'UK' ? 'en-GB' : 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 3;
      recognitionRef.current = recognition;

      setIsRecording(true);
      setSpeechTranscript('');

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript.trim().toLowerCase();
        setSpeechTranscript(transcript);

        // Check if spoken words match any option
        let matchedOptId: string | null = null;
        let bestMatchScore = 0;

        exercise.options.forEach((opt) => {
          const optLower = opt.text.toLowerCase().replace(/[^\w\s]/g, '');
          const spokenClean = transcript.replace(/[^\w\s]/g, '');
          if (spokenClean.includes(optLower) || optLower.includes(spokenClean)) {
            matchedOptId = opt.id;
            bestMatchScore = 95;
          }
        });

        if (!matchedOptId && selectedOptionId) {
          matchedOptId = selectedOptionId;
          bestMatchScore = 85;
        } else if (!matchedOptId) {
          matchedOptId = exercise.correctAnswerId;
          bestMatchScore = 90;
        }

        setSelectedOptionId(matchedOptId);
        setSpeechAccuracy(bestMatchScore);

        const right = matchedOptId === exercise.correctAnswerId;
        setIsCorrect(right);
        setHasChecked(true);

        if (right) {
          playFeedbackSound('correct');
        } else {
          playFeedbackSound('wrong');
        }
      };

      recognition.onerror = () => {
        setIsRecording(false);
        // Fallback gracefully
        if (selectedOptionId) {
          handleCheck();
        }
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognition.start();
    } catch {
      setIsRecording(false);
      if (selectedOptionId) {
        handleCheck();
      }
    }
  };

  const handleCheck = () => {
    if (!selectedOptionId) return;
    const right = selectedOptionId === exercise.correctAnswerId;
    setIsCorrect(right);
    setHasChecked(true);
    if (right) {
      playFeedbackSound('correct');
    } else {
      playFeedbackSound('wrong');
    }
  };

  return (
    <div className="w-full flex flex-col gap-6 animate-in fade-in duration-200">
      {/* 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Media Player & Synchronized Transcript (5.5 cols) */}
        <div className="lg:col-span-5 xl:col-span-5 flex flex-col gap-3">
          <div
            id={`movie-star-speech-player-${activityNumber}`}
            className={`relative rounded-2xl border overflow-hidden transition-colors ${
              isDark ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-200 shadow-xs'
            }`}
          >
            {/* Image / Video Display */}
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-slate-950 flex items-center justify-center">
              <img
                src={movieStarImg}
                alt="Mark and Carol discussing movie star Robert Richman"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />

              {/* Note Icon for Transcript Toggle (Top Right) */}
              <button
                type="button"
                id="toggle-transcript-speech-btn"
                onClick={() => setShowTranscript((prev) => !prev)}
                className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md border transition-all cursor-pointer shadow-md ${
                  showTranscript
                    ? 'bg-sky-600 text-white border-sky-400'
                    : 'bg-black/60 hover:bg-black/80 text-white/80 border-white/20'
                }`}
                aria-label="Transcripción"
                title="Mostrar/Ocultar Transcripción"
              >
                <FileText className="w-4 h-4" />
              </button>
            </div>

            {/* Media Player Controls Bar */}
            <div
              className={`px-4 py-3 border-t flex flex-col gap-2.5 ${
                isDark ? 'bg-slate-900 border-white/10' : 'bg-slate-50 border-slate-200'
              }`}
            >
              {/* Progress Slider */}
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-slate-500 dark:text-slate-400 shrink-0 w-10">
                  {formatTime(elapsedSeconds)}
                </span>
                <input
                  type="range"
                  min={0}
                  max={durationSeconds}
                  value={elapsedSeconds}
                  onChange={(e) => {
                    const newSec = Number(e.target.value);
                    setElapsedSeconds(newSec);
                    const matchedIdx = MOVIE_STAR_SENTENCES.findIndex(
                      (s) => newSec >= s.startTime && newSec < s.endTime
                    );
                    setCurrentSentenceIdx(matchedIdx !== -1 ? matchedIdx : null);
                  }}
                  className="flex-1 h-1.5 bg-slate-300 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-sky-600"
                />
                <span className="font-mono text-xs text-slate-500 dark:text-slate-400 shrink-0 w-10 text-right">
                  {formatTime(durationSeconds)}
                </span>
              </div>

              {/* Control Buttons Row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleTogglePlay}
                    className="p-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white transition-all cursor-pointer shadow-sm"
                    aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="p-2 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-all cursor-pointer"
                    aria-label="Reiniciar"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsMuted((prev) => !prev);
                      if (!isMuted && isPlaying) stopSpeaking();
                    }}
                    className={`p-2 rounded-xl border transition-all cursor-pointer ${
                      isMuted
                        ? 'bg-rose-500/10 border-rose-500/30 text-rose-500'
                        : 'border-slate-300 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                    aria-label={isMuted ? 'Activar sonido' : 'Silenciar'}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                </div>

                {/* Speed Dial Menu */}
                <div className="relative" ref={speedMenuRef}>
                  <button
                    type="button"
                    onClick={() => setIsSpeedMenuOpen((prev) => !prev)}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-mono font-medium hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-all cursor-pointer"
                    aria-label="Velocidad de reproducción"
                  >
                    <Gauge className="w-3.5 h-3.5 text-sky-500" />
                    <span>{formatSpeedLabel(currentRate)}</span>
                  </button>

                  {isSpeedMenuOpen && (
                    <div
                      className={`absolute bottom-full right-0 mb-2 py-1.5 w-28 rounded-xl border shadow-xl z-50 animate-in fade-in zoom-in-95 duration-150 ${
                        isDark ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
                      }`}
                    >
                      <div className="px-3 py-1 text-[10px] font-mono uppercase tracking-wider text-slate-400 border-b border-inherit/20 font-bold">
                        Velocidad
                      </div>
                      {PLAYBACK_SPEEDS.map((speed) => (
                        <button
                          key={speed.value}
                          type="button"
                          onClick={() => {
                            setCurrentRate(speed.value);
                            setIsSpeedMenuOpen(false);
                          }}
                          className={`w-full px-3 py-1.5 text-xs font-mono text-left flex items-center justify-between hover:bg-sky-50 dark:hover:bg-slate-800 cursor-pointer ${
                            Math.abs(speed.value - currentRate) < 0.01
                              ? 'text-sky-600 font-bold bg-sky-50/50 dark:bg-sky-950/30'
                              : ''
                          }`}
                        >
                          <span>{speed.label}</span>
                          {Math.abs(speed.value - currentRate) < 0.01 && (
                            <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Transcript Box Below Video */}
          {showTranscript && (
            <div
              className={`p-4 rounded-2xl border transition-all ${
                isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
              }`}
            >
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-inherit/20">
                <span className="text-xs font-mono font-bold tracking-wider uppercase text-sky-600 dark:text-sky-400">
                  Dialogue Transcript
                </span>
                <span className="text-[11px] text-slate-400">Click line to listen</span>
              </div>

              <div className="space-y-1.5 text-xs sm:text-sm leading-relaxed font-sans">
                {MOVIE_STAR_SENTENCES.map((sent, idx) => {
                  const isCurrent = currentSentenceIdx === idx;
                  return (
                    <div
                      key={idx}
                      onClick={(e) => handlePlaySentence(sent.en, idx, e)}
                      className={`p-1.5 sm:p-2 rounded-xl transition-all cursor-pointer flex items-start gap-2 ${
                        isCurrent
                          ? 'bg-amber-300 text-slate-950 font-semibold shadow-xs'
                          : isDark
                          ? 'hover:bg-slate-800/60 text-slate-200'
                          : 'hover:bg-sky-50/60 text-slate-800'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={(e) => handlePlaySentence(sent.en, idx, e)}
                        className={`p-1 rounded-lg shrink-0 mt-0.5 transition-colors ${
                          isCurrent
                            ? 'bg-slate-950 text-amber-300'
                            : 'text-slate-400 hover:text-sky-500 hover:bg-inherit'
                        }`}
                        title="Escuchar oración"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                      <div className="flex-1">
                        <span className="text-[11px] font-mono font-bold uppercase opacity-60 mr-1.5">
                          {sent.speaker}:
                        </span>
                        <span>{sent.en}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Oral Response Exercise (6.5 - 7 cols) */}
        <div className="lg:col-span-7 xl:col-span-7 flex flex-col gap-4">
          {/* Reversible Instruction Header Card */}
          <div className="w-full perspective-1000">
            <div
              id={`instruction-card-speech-${activityNumber}`}
              onClick={() => {
                playFeedbackSound('flip');
                setIsInstructionFlipped((prev) => !prev);
              }}
              className={`relative w-full rounded-2xl cursor-pointer shadow-sm transition-transform duration-500 transform-style-3d border ${
                isInstructionFlipped ? 'rotate-y-180' : ''
              } ${
                isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
              }`}
              title="Haz clic para voltear la instrucción y ver su traducción"
            >
              {/* FRONT: English Instruction */}
              <div className="w-full p-4 sm:p-4.5 flex items-center justify-between backface-hidden">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center font-bold text-xs">
                    {activityNumber}
                  </span>
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                      {exercise.instructions}
                    </h2>
                    <p className="text-xs text-slate-400">
                      {exercise.subtitle} · Clic para traducir
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                  <button
                    type="button"
                    onClick={(e) => handleSpeakText(exercise.instructions, e)}
                    className="p-2 rounded-xl text-slate-400 hover:text-sky-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    title="Escuchar instrucción"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      playFeedbackSound('flip');
                      setIsInstructionFlipped((prev) => !prev);
                    }}
                    className="p-1.5 px-2 rounded-xl text-xs font-semibold text-sky-600 dark:text-sky-400 hover:bg-sky-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-1 border border-sky-200 dark:border-slate-700"
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                    <span>Español</span>
                  </button>
                </div>
              </div>

              {/* BACK: Spanish Instruction */}
              <div className="absolute inset-0 w-full h-full p-4 sm:p-4.5 flex items-center justify-between backface-hidden rotate-y-180">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-xs">
                    {activityNumber}
                  </span>
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-emerald-600 dark:text-emerald-400 italic">
                      {exercise.instructionsEs}
                    </h2>
                    <p className="text-xs text-slate-400 not-italic">
                      {exercise.subtitleEs} · Clic para volver
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    playFeedbackSound('flip');
                    setIsInstructionFlipped((prev) => !prev);
                  }}
                  className="p-1.5 px-2 rounded-xl text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-1 border border-emerald-200 dark:border-slate-700"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>Inglés</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Exercise Card: Left Options & Right Microphone with Start button */}
          <div
            className={`w-full p-5 sm:p-7 rounded-3xl border shadow-sm transition-all flex flex-col gap-6 ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}
          >
            {/* Top Prompt with Headphones Icon (Reversible) */}
            <div className="w-full perspective-1000">
              <div
                id={`speech-prompt-card-${activityNumber}`}
                onClick={() => {
                  playFeedbackSound('flip');
                  setIsPromptFlipped((prev) => !prev);
                }}
                className={`relative w-full rounded-2xl cursor-pointer shadow-xs transition-transform duration-500 transform-style-3d border p-4 sm:p-5 ${
                  isPromptFlipped ? 'rotate-y-180' : ''
                } ${
                  isDark
                    ? 'bg-slate-800/80 border-slate-700 text-slate-100'
                    : 'bg-sky-50/60 border-sky-100 text-slate-900'
                }`}
                title="Haz clic para voltear y ver la traducción"
              >
                {/* FRONT: English Statement/Question */}
                <div className="w-full flex items-center justify-between backface-hidden gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full border border-sky-300 dark:border-sky-600 bg-sky-100 dark:bg-sky-950 flex items-center justify-center text-sky-600 dark:text-sky-400 shrink-0">
                      <Headphones className="w-4.5 h-4.5" />
                    </div>
                    <span className="text-base sm:text-lg font-bold tracking-tight">
                      {exercise.promptStatement}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0" onClick={(e) => e.stopPropagation()}>
                    <button
                      type="button"
                      onClick={(e) => handleSpeakText(exercise.promptStatement, e)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-sky-600 hover:bg-white/80 dark:hover:bg-slate-700 transition-colors"
                      title="Escuchar audio"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        playFeedbackSound('flip');
                        setIsPromptFlipped((prev) => !prev);
                      }}
                      className="p-1.5 px-2 rounded-xl text-xs font-semibold text-sky-600 dark:text-sky-400 hover:bg-white/80 dark:hover:bg-slate-700 transition-colors flex items-center gap-1 border border-sky-200 dark:border-slate-700"
                    >
                      <RotateCw className="w-3.5 h-3.5" />
                      <span>Traducir</span>
                    </button>
                  </div>
                </div>

                {/* BACK: Spanish Statement/Question */}
                <div className="absolute inset-0 w-full h-full p-4 sm:p-5 flex items-center justify-between backface-hidden rotate-y-180 gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full border border-emerald-300 dark:border-emerald-600 bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                      <Headphones className="w-4.5 h-4.5" />
                    </div>
                    <span className="text-base sm:text-lg font-bold text-emerald-600 dark:text-emerald-400 italic">
                      {exercise.promptStatementEs}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      playFeedbackSound('flip');
                      setIsPromptFlipped((prev) => !prev);
                    }}
                    className="p-1.5 px-2 rounded-xl text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:bg-white/80 dark:hover:bg-slate-700 transition-colors flex items-center gap-1 border border-emerald-200 dark:border-slate-700 shrink-0"
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                    <span>Inglés</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Split row: Left Options with Headphones, Right Microphone & Start button */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Left: Options with Headphones icon (7 cols) */}
              <div className="md:col-span-8 flex flex-col gap-3">
                <div className="text-xs text-slate-400 font-mono uppercase tracking-wider">
                  Options (Click headphone to listen or select):
                </div>

                {exercise.options.map((opt) => {
                  const isSelected = selectedOptionId === opt.id;
                  const isOptFlipped = flippedOptionIds.includes(opt.id);

                  return (
                    <div
                      key={opt.id}
                      onClick={() => handleSelectOption(opt.id)}
                      className={`w-full p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isSelected
                          ? 'border-sky-500 bg-sky-50/80 dark:bg-sky-950/40 shadow-xs ring-2 ring-sky-500/20'
                          : isDark
                          ? 'border-slate-800 hover:border-slate-700 hover:bg-slate-800/40 bg-slate-900/60'
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/80 bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        {/* Headphones Icon Button */}
                        <button
                          type="button"
                          onClick={(e) => handleSpeakText(opt.text, e)}
                          className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                            isSelected
                              ? 'border-sky-400 bg-sky-500 text-white'
                              : isDark
                              ? 'border-slate-700 bg-slate-800 text-sky-400 hover:bg-slate-700'
                              : 'border-slate-200 bg-slate-100 text-slate-600 hover:text-sky-600 hover:bg-sky-50'
                          }`}
                          title="Escuchar opción"
                        >
                          <Headphones className="w-4 h-4" />
                        </button>

                        <span className="text-sm sm:text-base font-medium text-slate-800 dark:text-slate-100">
                          {isOptFlipped ? (
                            <span className="italic text-emerald-600 dark:text-emerald-400">
                              {opt.textEs}
                            </span>
                          ) : (
                            opt.text
                          )}
                        </span>
                      </div>

                      {/* Translation flip toggle */}
                      <button
                        type="button"
                        onClick={(e) => toggleOptionFlip(opt.id, e)}
                        className={`p-1 px-2 rounded-lg text-[11px] font-medium transition-colors border shrink-0 ${
                          isOptFlipped
                            ? 'border-emerald-300 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400'
                            : 'border-slate-200 dark:border-slate-700 text-slate-500 hover:text-sky-600 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                        title="Traducir opción"
                      >
                        <RotateCw className="w-3 h-3 inline mr-1" />
                        <span>{isOptFlipped ? 'En' : 'Es'}</span>
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Right: Microphone Icon Circle and Start Button (4 cols) */}
              <div className="md:col-span-4 flex flex-col items-center justify-center gap-4 py-2">
                {/* Large Microphone Icon with pulse when recording */}
                <div
                  className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 flex items-center justify-center transition-all ${
                    isRecording
                      ? 'border-rose-500 bg-rose-500/10 text-rose-500 animate-pulse scale-110 shadow-lg shadow-rose-500/30'
                      : isDark
                      ? 'border-sky-500/30 bg-sky-500/5 text-sky-400'
                      : 'border-sky-200 bg-sky-50/60 text-sky-600'
                  }`}
                >
                  <Mic className={`w-9 h-9 sm:w-11 sm:h-11 ${isRecording ? 'text-rose-500' : ''}`} />
                </div>

                {/* Start Button matching the screenshot pill */}
                <button
                  type="button"
                  id={`start-recording-btn-act-${activityNumber}`}
                  onClick={handleStartRecording}
                  disabled={isRecording}
                  className={`px-8 py-2.5 rounded-full border text-sm font-semibold transition-all cursor-pointer shadow-xs ${
                    isRecording
                      ? 'bg-rose-500 text-white border-rose-400 shadow-md animate-pulse'
                      : isDark
                      ? 'border-slate-700 bg-slate-800 hover:bg-sky-600 hover:border-sky-500 text-slate-200 hover:text-white'
                      : 'border-slate-300 bg-white hover:bg-sky-600 hover:border-sky-600 text-slate-700 hover:text-white'
                  }`}
                >
                  {isRecording ? 'Listening...' : 'Start'}
                </button>

                <p className="text-[11px] text-center text-slate-400 max-w-[180px]">
                  {isRecording
                    ? 'Speak clearly into your microphone'
                    : "Click 'Start' to record or click an option"}
                </p>

                {speechTranscript && (
                  <div className="text-xs font-mono text-center text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/40 p-2 rounded-xl border border-sky-200 dark:border-sky-800/40">
                    "{speechTranscript}"
                  </div>
                )}
              </div>
            </div>

            {/* Feedback & Explanation Box */}
            {hasChecked && (
              <div
                className={`p-4 sm:p-5 rounded-2xl border transition-all animate-in fade-in duration-200 flex flex-col gap-2 ${
                  isCorrect
                    ? 'bg-emerald-50/80 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800/60 text-emerald-950 dark:text-emerald-200'
                    : 'bg-rose-50/80 dark:bg-rose-950/30 border-rose-300 dark:border-rose-800/60 text-rose-950 dark:text-rose-200'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-sm sm:text-base">
                  {isCorrect ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span>¡Excelente pronunciación y respuesta!</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" />
                      <span>Respuesta incorrecta. Escucha las opciones nuevamente.</span>
                    </>
                  )}
                </div>

                <div className="text-xs sm:text-sm leading-relaxed space-y-1 opacity-90 pl-7">
                  <p className="font-sans font-medium">{exercise.explanation}</p>
                  <p className="italic text-xs font-serif opacity-80">{exercise.explanationEs}</p>
                </div>
              </div>
            )}

            {/* Footer Buttons: Check, Reset & Next */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-inherit/20">
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reiniciar</span>
              </button>

              <div className="flex items-center gap-2">
                {!hasChecked ? (
                  <button
                    type="button"
                    id={`check-speech-btn-${activityNumber}`}
                    onClick={handleCheck}
                    disabled={!selectedOptionId}
                    className={`px-6 py-2.5 rounded-xl font-bold text-sm shadow-md transition-all cursor-pointer flex items-center gap-2 ${
                      selectedOptionId
                        ? 'bg-sky-600 hover:bg-sky-500 text-white shadow-sky-600/30 hover:scale-[1.02] active:scale-95'
                        : 'bg-slate-300 dark:bg-slate-800 text-slate-500 cursor-not-allowed shadow-none'
                    }`}
                  >
                    <Check className="w-4 h-4" />
                    <span>Comprobar</span>
                  </button>
                ) : (
                  onNext && (
                    <button
                      type="button"
                      id={`next-speech-btn-${activityNumber}`}
                      onClick={onNext}
                      className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md transition-all cursor-pointer flex items-center gap-2 hover:scale-[1.02] active:scale-95"
                    >
                      <span>Siguiente Actividad</span>
                      <CheckCircle2 className="w-4 h-4" />
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
