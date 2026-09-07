import React, { useState, useEffect, useRef } from 'react';
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  Gauge,
  Mic,
  MicOff,
  CheckCircle,
  XCircle,
  RotateCcw,
  Sparkles,
  Headphones,
  Check,
  ChevronRight,
  HelpCircle,
} from 'lucide-react';
import { SpeechResponseExercise as SpeechResponseExerciseType, LessonSentence } from '../types';
import { useTheme } from '../context/ThemeContext';
import { speakEnglish, playFeedbackSound } from '../utils/audio';
import dressFromParisImg from '../assets/images/dress_from_paris_1788711801436.jpg';

interface SpeechResponseExerciseProps {
  exercise: SpeechResponseExerciseType;
  accent?: 'US' | 'UK';
  speechRate?: number;
  onSuccess?: () => void;
}

const PLAYBACK_SPEEDS = [
  { value: 0.5, label: '0.50x' },
  { value: 0.65, label: '0.65x' },
  { value: 0.85, label: '0.85x' },
  { value: 1.0, label: '1x' },
  { value: 1.15, label: '1.15x' },
  { value: 1.3, label: '1.30x' },
];

const formatSpeedLabel = (rate: number): string => {
  const found = PLAYBACK_SPEEDS.find((s) => Math.abs(s.value - rate) < 0.01);
  if (found) return found.label;
  return `${rate}x`;
};

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

export const SpeechResponseExercise: React.FC<SpeechResponseExerciseProps> = ({
  exercise,
  accent = 'US',
  speechRate = 1.0,
  onSuccess,
}) => {
  const { isDark } = useTheme();
  const safeAccent: 'US' | 'UK' = accent === 'UK' ? 'UK' : 'US';

  const durationSeconds = exercise.durationSeconds || 19;
  const displayImage = exercise.imageUrl || dressFromParisImg;
  const speakerVoice = exercise.speakerGender || 'female';

  // Selection & Feedback state
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [hasChecked, setHasChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // Flip cards
  const [isInstructionFlipped, setIsInstructionFlipped] = useState(false);
  const [isPromptFlipped, setIsPromptFlipped] = useState(false);
  const [isTranscriptFlipped, setIsTranscriptFlipped] = useState(false);
  const [flippedOptionIds, setFlippedOptionIds] = useState<string[]>([]);
  const [showTranscript, setShowTranscript] = useState(true);

  // Audio player state
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentPlaybackRate, setCurrentPlaybackRate] = useState<number>(speechRate);
  const [isSpeedMenuOpen, setIsSpeedMenuOpen] = useState<boolean>(false);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [currentSentenceIdx, setCurrentSentenceIdx] = useState<number | null>(null);

  // Voice recording state
  const [isRecording, setIsRecording] = useState(false);
  const [spokenTranscript, setSpokenTranscript] = useState<string>('');
  const [speechRecognitionSupported, setSpeechRecognitionSupported] = useState(true);
  const [micFeedbackMessage, setMicFeedbackMessage] = useState<string | null>(null);

  const recognitionRef = useRef<any>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const speedMenuRef = useRef<HTMLDivElement | null>(null);

  const sentences: LessonSentence[] = exercise.sentences || [
    { en: '- What a lovely dress.', es: '- ¡Qué vestido tan lindo!' },
    { en: '- Really? Do you like it?', es: '- ¿En serio? ¿Te gusta?' },
    { en: "- Of course. It's beautiful. Is it new?", es: '- Por supuesto. Es hermoso. ¿Es nuevo?' },
    { en: '- Yes. I bought it in Paris last week.', es: '- Sí. Lo compré en París la semana pasada.' },
    { en: "- Well, it's really nice.", es: '- Bueno, es muy bonito.' },
    { en: '- Thank you.', es: '- Gracias.' },
  ];

  // Reset state when exercise changes
  useEffect(() => {
    setSelectedOptionId(null);
    setHasChecked(false);
    setIsCorrect(false);
    setIsInstructionFlipped(false);
    setIsPromptFlipped(false);
    setIsTranscriptFlipped(false);
    setFlippedOptionIds([]);
    setIsPlaying(false);
    setElapsedSeconds(0);
    setCurrentSentenceIdx(null);
    setIsSpeedMenuOpen(false);
    setIsRecording(false);
    setSpokenTranscript('');
    setMicFeedbackMessage(null);

    if (timerRef.current) clearInterval(timerRef.current);
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        // ignore
      }
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }, [exercise.id]);

  // Outside click for speed menu
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

  // Sync audio progress timer
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

  // Initialize Web Speech Recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (!SpeechRecognition) {
        setSpeechRecognitionSupported(false);
      }
    }
  }, []);

  // Toggle full audio playback
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
      sentences.map((s) => s.en.replace(/^-\s*/, '')).join(' ');

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

  // Play single sentence from transcript
  const handlePlaySingleSentence = (sentenceEn: string, idx: number) => {
    window.speechSynthesis?.cancel();
    setIsPlaying(true);
    setCurrentSentenceIdx(idx);

    const cleanText = sentenceEn.replace(/^-\s*/, '');
    const targetElapsed = Math.floor((idx / sentences.length) * durationSeconds);
    setElapsedSeconds(targetElapsed);

    speakEnglish(
      cleanText,
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

  // Play single line (prompt statement or option)
  const handlePlayLine = (text: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    playFeedbackSound('click');
    window.speechSynthesis?.cancel();
    speakEnglish(text, currentPlaybackRate, safeAccent, undefined, undefined, speakerVoice);
  };

  // Toggle recording session
  const handleToggleRecord = () => {
    playFeedbackSound('click');

    if (isRecording) {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          // ignore
        }
      }
      setIsRecording(false);
      return;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setMicFeedbackMessage('Reconocimiento por voz no disponible en este navegador. Puedes hacer clic en la opción.');
      // Auto-select correct answer as friendly practice fallback
      setSelectedOptionId(exercise.correctAnswerId);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;
      recognition.lang = safeAccent === 'UK' ? 'en-GB' : 'en-US';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsRecording(true);
        setMicFeedbackMessage('Escuchando... Di tu respuesta ahora.');
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        setSpokenTranscript(transcript);
        setMicFeedbackMessage(`Dijiste: "${transcript}"`);

        // Check if spoken words match any option
        const matched = exercise.options.find((opt) => {
          const optText = opt.text.toLowerCase().replace(/[^a-z0-9\s]/g, '');
          const cleanTranscript = transcript.replace(/[^a-z0-9\s]/g, '');
          return cleanTranscript.includes(optText) || optText.includes(cleanTranscript);
        });

        if (matched) {
          setSelectedOptionId(matched.id);
          playFeedbackSound('click');
        } else {
          // If close or partially matched
          const best = exercise.options.find((opt) =>
            opt.text.toLowerCase().split(' ').some((w) => w.length > 2 && transcript.includes(w))
          );
          if (best) {
            setSelectedOptionId(best.id);
          }
        }
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition error:', event.error);
        setIsRecording(false);
        setMicFeedbackMessage('No pudimos escuchar con claridad. Puedes tocar la opción directamente.');
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognition.start();
    } catch (err) {
      console.warn('Error starting speech recognition:', err);
      setIsRecording(false);
      setMicFeedbackMessage('Micrófono ocupado. Selecciona la opción con un clic.');
    }
  };

  // Option selection
  const handleSelectOption = (optId: string) => {
    if (hasChecked && isCorrect) return;
    playFeedbackSound('click');
    setSelectedOptionId(optId);
  };

  // Flip option for Spanish translation
  const handleToggleFlipOption = (optId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    playFeedbackSound('flip');
    setFlippedOptionIds((prev) =>
      prev.includes(optId) ? prev.filter((id) => id !== optId) : [...prev, optId]
    );
  };

  // Check answer
  const handleCheckAnswer = () => {
    if (!selectedOptionId) {
      playFeedbackSound('wrong');
      return;
    }

    setHasChecked(true);
    const correct = selectedOptionId === exercise.correctAnswerId;
    setIsCorrect(correct);

    if (correct) {
      playFeedbackSound('correct');
      if (onSuccess) onSuccess();
    } else {
      playFeedbackSound('wrong');
    }
  };

  // Clear / Reset
  const handleClear = () => {
    playFeedbackSound('click');
    setSelectedOptionId(null);
    setHasChecked(false);
    setIsCorrect(false);
    setSpokenTranscript('');
    setMicFeedbackMessage(null);
  };

  return (
    <div
      id={`speech-response-exercise-${exercise.id}`}
      className="w-full mx-auto flex flex-col gap-6"
    >
      {/* Top Banner: Reversible Instruction Card matching exact screenshot style */}
      <div className="flex items-center justify-between gap-3">
        <div className="perspective-1000 flex-1">
          <div
            id={`instruction-card-${exercise.id}`}
            onClick={() => {
              playFeedbackSound('flip');
              setIsInstructionFlipped((prev) => !prev);
            }}
            className={`relative w-full min-h-[56px] rounded-2xl border transition-transform duration-500 transform-style-3d cursor-pointer select-none shadow-xs ${
              isInstructionFlipped ? 'rotate-y-180' : ''
            } ${
              isDark
                ? 'bg-slate-900 border-sky-500/30 hover:border-sky-500/50'
                : 'bg-white border-sky-200 hover:border-sky-300'
            }`}
            title="Haz clic para traducir la instrucción"
          >
            {/* Front: English Instruction */}
            <div className="px-4 py-3 flex items-center gap-3 backface-hidden">
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                  isDark ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30' : 'bg-sky-100 text-sky-700'
                }`}
              >
                <HelpCircle className="w-4 h-4" />
              </div>
              <h4 className={`text-sm sm:text-base font-semibold leading-snug ${isDark ? 'text-slate-100' : 'text-slate-800'}`}>
                {exercise.instructions}
              </h4>
            </div>

            {/* Back: Spanish Translation */}
            <div className="absolute inset-0 px-4 py-3 flex items-center gap-3 backface-hidden rotate-y-180">
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                  isDark ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-emerald-100 text-emerald-700'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <p className={`text-sm sm:text-base font-medium leading-snug italic ${isDark ? 'text-emerald-200' : 'text-emerald-900'}`}>
                {exercise.instructionsEs || '¿Cuál es la mejor respuesta?'}
              </p>
            </div>
          </div>
        </div>

        {/* Audio button for instruction */}
        <button
          type="button"
          onClick={() => {
            speakEnglish(
              exercise.instructions,
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

      {/* Main Two-Column Grid: Left Column (Media Player + Transcript) & Right Column (Prompt + Speech Options) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Media Player with 2 Friends in Paris dress + Transcript (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div
            id={`media-player-container-${exercise.id}`}
            className={`rounded-2xl border overflow-hidden shadow-sm transition-all ${
              isDark ? 'bg-[#151C33] border-white/10' : 'bg-white border-slate-200'
            }`}
          >
            {/* Image Preview with 2 women */}
            <div className="relative aspect-[16/11] bg-slate-900 overflow-hidden flex items-center justify-center">
              <img
                src={displayImage}
                alt="Two friends discussing the lovely dress from Paris"
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
              >
                <div className="w-5 h-5 flex flex-col justify-center gap-1 items-center">
                  <div className="w-3.5 h-0.5 bg-[#009bd6] rounded-full" />
                  <div className="w-3.5 h-0.5 bg-[#009bd6] rounded-full" />
                  <div className="w-2.5 h-0.5 bg-[#009bd6] rounded-full" />
                </div>
              </button>
            </div>

            {/* Bottom Controls Bar (Play/Pause, Slider, Gauge/Speed, Mute, Timer) */}
            <div
              className={`px-3 sm:px-4 py-2.5 flex items-center gap-2 sm:gap-3 text-xs ${
                isDark ? 'bg-slate-900/90 text-slate-200' : 'bg-slate-100 text-slate-700'
              }`}
            >
              {/* Play / Pause Button */}
              <button
                type="button"
                id={`media-play-btn-${exercise.id}`}
                onClick={handleTogglePlay}
                className="w-8 h-8 rounded-full bg-sky-500 hover:bg-sky-400 text-white flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-90 shrink-0"
                title={isPlaying ? 'Pausar diálogo' : 'Reproducir diálogo'}
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

              {/* Time display (00:xx / 00:19) */}
              <span className="font-mono text-[11px] font-semibold text-slate-700 dark:text-slate-300 shrink-0">
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
                  isDark
                    ? 'bg-[#121829] border-white/10 hover:border-sky-500/40 text-slate-200'
                    : 'bg-white border-slate-200 hover:border-sky-300 text-slate-800'
                }`}
                title="Haz clic para traducir el diálogo"
              >
                {/* Front: English Transcript */}
                <div className="space-y-1.5 backface-hidden">
                  <div className="flex items-center justify-between pb-1 mb-1 border-b border-slate-200 dark:border-white/10 text-[11px] font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                    <span>Dialogue Transcript</span>
                    <span className="text-[10px] text-sky-500">Tap line to listen</span>
                  </div>
                  {sentences.map((line, idx) => {
                    const isActive = currentSentenceIdx === idx;
                    return (
                      <p
                        key={idx}
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePlaySingleSentence(line.en, idx);
                        }}
                        className={`p-1.5 rounded-lg transition-all cursor-pointer flex items-center justify-between ${
                          isActive
                            ? 'bg-amber-300 dark:bg-amber-400/90 text-slate-950 font-semibold shadow-xs'
                            : isDark
                            ? 'hover:bg-white/5 text-slate-300'
                            : 'hover:bg-slate-100 text-slate-700'
                        }`}
                      >
                        <span>{line.en}</span>
                        <Volume2 className="w-3.5 h-3.5 opacity-60 ml-2 shrink-0" />
                      </p>
                    );
                  })}
                </div>

                {/* Back: Spanish Transcript */}
                <div className="absolute inset-0 p-4 sm:p-5 space-y-1.5 backface-hidden rotate-y-180 bg-inherit rounded-2xl overflow-y-auto">
                  <div className="flex items-center justify-between pb-1 mb-1 border-b border-slate-200 dark:border-white/10 text-[11px] font-semibold uppercase tracking-wider text-emerald-500">
                    <span>Traducción al Español</span>
                    <span className="text-[10px]">Toca para volver</span>
                  </div>
                  {sentences.map((line, idx) => (
                    <p
                      key={idx}
                      className={`p-1.5 rounded-lg text-xs leading-relaxed italic ${
                        isDark ? 'text-emerald-200' : 'text-emerald-900'
                      }`}
                    >
                      {line.es}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Statement Prompt + 3 Options + Large Mic & Start Button (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col gap-5">
          {/* Subtitle bar matching exact screenshot: "Click 'Start' to record the correct answer." */}
          <div
            className={`px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-medium flex items-center justify-between ${
              isDark
                ? 'bg-slate-900/60 border-white/10 text-slate-300'
                : 'bg-slate-50 border-slate-200 text-slate-700'
            }`}
          >
            <span>{exercise.subtitle || "Click 'Start' to record the correct answer."}</span>
            <span className="text-[11px] text-slate-600 dark:text-slate-300 hidden sm:inline italic">
              {exercise.subtitleEs || "Haz clic en 'Start' para grabar la respuesta"}
            </span>
          </div>

          {/* Main Prompt Card (Reversible Statement with Headphone Audio icon) */}
          <div className="perspective-1000 w-full">
            <div
              id={`prompt-statement-${exercise.id}`}
              onClick={() => {
                playFeedbackSound('flip');
                setIsPromptFlipped((prev) => !prev);
              }}
              className={`relative w-full rounded-2xl border p-4 sm:p-5 transition-transform duration-500 transform-style-3d cursor-pointer shadow-xs ${
                isPromptFlipped ? 'rotate-y-180' : ''
              } ${
                isDark
                  ? 'bg-[#151C33] border-white/10 hover:border-sky-500/40'
                  : 'bg-white border-slate-200 hover:border-sky-300'
              }`}
              title="Haz clic para ver la traducción del enunciado"
            >
              {/* Front: English Prompt */}
              <div className="flex items-center gap-3.5 backface-hidden">
                <button
                  type="button"
                  onClick={(e) => handlePlayLine(exercise.promptStatement, e)}
                  className="w-10 h-10 rounded-xl bg-sky-500 hover:bg-sky-400 text-white flex items-center justify-center shrink-0 shadow-xs transition-all active:scale-95 cursor-pointer"
                  title="Escuchar enunciado"
                >
                  <Headphones className="w-5 h-5" />
                </button>
                <div className="flex-1">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-sky-500 block">
                    {exercise.promptIsQuestion ? 'Question' : 'Statement'}
                  </span>
                  <p className={`text-base sm:text-lg font-bold leading-snug ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    "{exercise.promptStatement}"
                  </p>
                </div>
              </div>

              {/* Back: Spanish Prompt */}
              <div className="absolute inset-0 px-4 sm:px-5 flex items-center gap-3.5 backface-hidden rotate-y-180 bg-inherit rounded-2xl">
                <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-500 block">
                    Traducción
                  </span>
                  <p className={`text-base sm:text-lg font-bold italic ${isDark ? 'text-emerald-200' : 'text-emerald-900'}`}>
                    "{exercise.promptStatementEs || exercise.promptStatement}"
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Options List with Headphone icons + Recording Column on right */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
            {/* Options (8 Cols on sm+) */}
            <div className="sm:col-span-8 flex flex-col gap-3">
              {exercise.options.map((option) => {
                const isSelected = selectedOptionId === option.id;
                const isFlipped = flippedOptionIds.includes(option.id);

                let cardStatusClass = isDark
                  ? 'bg-[#151C33] border-white/10 hover:border-sky-500/40 text-slate-200'
                  : 'bg-white border-slate-200 hover:border-sky-300 text-slate-800';

                if (isSelected && !hasChecked) {
                  cardStatusClass = isDark
                    ? 'bg-sky-500/20 border-sky-400 ring-2 ring-sky-500/40 text-white'
                    : 'bg-sky-50 border-sky-400 ring-2 ring-sky-300 text-sky-950';
                }

                if (hasChecked) {
                  if (option.isCorrect) {
                    cardStatusClass = isDark
                      ? 'bg-emerald-500/20 border-emerald-400 ring-2 ring-emerald-500/50 text-emerald-100'
                      : 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-400 text-emerald-950';
                  } else if (isSelected && !option.isCorrect) {
                    cardStatusClass = isDark
                      ? 'bg-rose-500/20 border-rose-400 ring-2 ring-rose-500/50 text-rose-100'
                      : 'bg-rose-50 border-rose-500 ring-2 ring-rose-300 text-rose-950';
                  }
                }

                return (
                  <div
                    key={option.id}
                    id={`speech-option-${option.id}`}
                    onClick={() => handleSelectOption(option.id)}
                    className={`perspective-1000 w-full rounded-xl border p-3 sm:p-3.5 transition-all cursor-pointer shadow-xs select-none ${cardStatusClass}`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        {/* Headphone Audio Icon Button */}
                        <button
                          type="button"
                          onClick={(e) => handlePlayLine(option.text, e)}
                          className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all cursor-pointer ${
                            isDark
                              ? 'bg-white/10 hover:bg-sky-500 hover:text-white text-slate-300'
                              : 'bg-slate-100 hover:bg-sky-500 hover:text-white text-slate-600'
                          }`}
                          title="Escuchar opción"
                        >
                          <Headphones className="w-4 h-4" />
                        </button>

                        {/* Option Text / Spanish translation */}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm sm:text-base font-medium leading-snug truncate">
                            {isFlipped ? option.textEs || option.text : option.text}
                          </p>
                        </div>
                      </div>

                      {/* Right Indicator: Radio / Translation Toggle / Check-X */}
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={(e) => handleToggleFlipOption(option.id, e)}
                          className="px-1.5 py-0.5 rounded text-[10px] font-mono uppercase bg-slate-200 dark:bg-white/10 hover:bg-sky-200 text-slate-600 dark:text-slate-300 cursor-pointer"
                          title="Traducir opción"
                        >
                          {isFlipped ? 'EN' : 'ES'}
                        </button>

                        {hasChecked ? (
                          option.isCorrect ? (
                            <CheckCircle className="w-5 h-5 text-emerald-500" />
                          ) : isSelected ? (
                            <XCircle className="w-5 h-5 text-rose-500" />
                          ) : null
                        ) : (
                          <div
                            className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                              isSelected
                                ? 'border-sky-500 bg-sky-500 text-white'
                                : 'border-slate-400 dark:border-white/30'
                            }`}
                          >
                            {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Speaking / Recording Column (4 Cols on sm+) - Large Mic Icon & Start Button */}
            <div className="sm:col-span-4 flex flex-col items-center justify-center gap-3 p-4 rounded-2xl border border-dashed border-sky-400/40 bg-sky-50/40 dark:bg-sky-950/20 text-center">
              {/* Large Microphone Circle Button */}
              <div className="relative">
                {isRecording && (
                  <div className="absolute inset-0 rounded-full animate-ping bg-sky-400/40" />
                )}
                <button
                  type="button"
                  id={`mic-record-btn-${exercise.id}`}
                  onClick={handleToggleRecord}
                  className={`relative w-20 h-20 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-lg active:scale-95 ${
                    isRecording
                      ? 'bg-rose-500 text-white ring-4 ring-rose-300 shadow-rose-500/30'
                      : 'bg-sky-600 hover:bg-sky-700 text-white shadow-sky-500/30'
                  }`}
                  title={isRecording ? 'Detener grabación' : 'Comenzar a hablar'}
                  aria-label="Grabar respuesta"
                >
                  {isRecording ? (
                    <MicOff className="w-9 h-9 animate-pulse" />
                  ) : (
                    <Mic className="w-9 h-9" />
                  )}
                </button>
              </div>

              {/* Start Pill Button (Matching exact screenshot) */}
              <button
                type="button"
                id={`start-record-btn-${exercise.id}`}
                onClick={handleToggleRecord}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all shadow-sm cursor-pointer active:scale-95 ${
                  isRecording
                    ? 'bg-rose-500 hover:bg-rose-600 text-white shadow-rose-500/20 animate-pulse'
                    : 'bg-slate-200 hover:bg-slate-300 text-slate-800 dark:bg-white/20 dark:hover:bg-white/30 dark:text-white'
                }`}
              >
                {isRecording ? 'Stop' : 'Start'}
              </button>

              {/* Feedback text */}
              <p className="text-[11px] font-medium text-slate-600 dark:text-slate-300 max-w-[160px] leading-tight">
                {micFeedbackMessage || 'Click "Start" to speak your answer.'}
              </p>
            </div>
          </div>

          {/* Spoken transcription indicator if captured */}
          {spokenTranscript && (
            <div
              className={`p-3 rounded-xl border text-xs flex items-center justify-between ${
                isDark ? 'bg-sky-950/40 border-sky-500/30 text-sky-200' : 'bg-sky-50 border-sky-200 text-sky-900'
              }`}
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-sky-400" />
                <span>
                  Audio reconocido: <strong className="font-semibold">"{spokenTranscript}"</strong>
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSpokenTranscript('')}
                className="text-[11px] underline opacity-70 hover:opacity-100"
              >
                Ocultar
              </button>
            </div>
          )}

          {/* Action Buttons: Check Answer & Clear */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              id={`check-speech-btn-${exercise.id}`}
              onClick={handleCheckAnswer}
              disabled={!selectedOptionId}
              className={`flex-1 py-3 px-5 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-sm ${
                selectedOptionId
                  ? 'bg-sky-500 hover:bg-sky-600 text-white cursor-pointer active:scale-98 shadow-sky-500/20'
                  : 'bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400 cursor-not-allowed'
              }`}
            >
              <Check className="w-4 h-4" />
              <span>Comprobar respuesta</span>
            </button>

            <button
              type="button"
              id={`clear-speech-btn-${exercise.id}`}
              onClick={handleClear}
              className={`p-3 rounded-xl border transition-all cursor-pointer ${
                isDark
                  ? 'border-white/10 hover:bg-white/10 text-white/70 hover:text-white'
                  : 'border-slate-200 hover:bg-slate-100 text-slate-600 hover:text-slate-900'
              }`}
              title="Limpiar selección"
              aria-label="Limpiar selección"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Explanation Banner when checked */}
          {hasChecked && (
            <div
              className={`p-4 sm:p-5 rounded-2xl border transition-all animate-fadeIn ${
                isCorrect
                  ? isDark
                    ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                    : 'bg-emerald-50 border-emerald-300 text-emerald-950'
                  : isDark
                  ? 'bg-rose-950/40 border-rose-500/40 text-rose-200'
                  : 'bg-rose-50 border-rose-300 text-rose-950'
              }`}
            >
              <div className="flex items-start gap-3">
                {isCorrect ? (
                  <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                )}
                <div className="space-y-1 text-xs sm:text-sm">
                  <p className="font-bold">
                    {isCorrect ? '¡Correcto! Excelente respuesta.' : 'Respuesta incorrecta. Revisa el diálogo:'}
                  </p>
                  <p className="leading-relaxed">{exercise.explanation}</p>
                  {exercise.explanationEs && (
                    <p className="italic opacity-90 text-[11px] sm:text-xs pt-1 border-t border-current/20">
                      {exercise.explanationEs}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
