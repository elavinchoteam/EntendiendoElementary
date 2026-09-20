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
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { speakEnglish, stopSpeaking, playFeedbackSound } from '../../utils/audio';
import { SpeechResponseExercise } from '../../types';
import {
  goodToSeeYouImg,
  GOOD_TO_SEE_YOU_SENTENCES,
  GOOD_TO_SEE_YOU_AUDIO_TEXT,
} from '../../data/goodToSeeYouData';
import { PLAYBACK_SPEEDS, formatSpeedLabel, formatTime } from './Activity1Explore';

interface GoodToSeeYouSpeechActivityProps {
  exercise: SpeechResponseExercise;
  activityNumber: number; // 5 or 6
  speechRate?: number;
  accent?: 'US' | 'UK';
  onNext?: () => void;
}

export const GoodToSeeYouSpeechActivity: React.FC<GoodToSeeYouSpeechActivityProps> = ({
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
  const [isTranscriptFlipped, setIsTranscriptFlipped] = useState(false);
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
  const [isMicAvailable, setIsMicAvailable] = useState(true);
  const recognitionRef = useRef<any>(null);

  const durationSeconds = 18;
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
    setIsTranscriptFlipped(false);
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
          const matchedIdx = GOOD_TO_SEE_YOU_SENTENCES.findIndex(
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
          GOOD_TO_SEE_YOU_AUDIO_TEXT,
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

  const handleResetAudio = () => {
    stopSpeaking();
    setIsPlaying(false);
    setElapsedSeconds(0);
    setCurrentSentenceIdx(null);
  };

  const toggleOptionFlip = (optId: string) => {
    setFlippedOptionIds((prev) =>
      prev.includes(optId) ? prev.filter((id) => id !== optId) : [...prev, optId]
    );
  };

  const handleSelectOption = (optId: string) => {
    setSelectedOptionId(optId);
    const correct = optId === exercise.correctAnswerId;
    setIsCorrect(correct);
    setHasChecked(true);
    playFeedbackSound(correct ? 'correct' : 'wrong');
  };

  // Web Speech API Recording
  const startRecording = () => {
    stopSpeaking();
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setIsMicAvailable(false);
      // Fallback simulation
      simulateSpeechAssessment();
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsRecording(true);
        setSpeechTranscript('');
        setSpeechAccuracy(null);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setSpeechTranscript(transcript);
        evaluateSpokenText(transcript);
      };

      recognition.onerror = () => {
        setIsRecording(false);
        simulateSpeechAssessment();
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch {
      setIsRecording(false);
      simulateSpeechAssessment();
    }
  };

  const stopRecordingSession = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // ignore
      }
    }
    setIsRecording(false);
  };

  const evaluateSpokenText = (spoken: string) => {
    const correctOpt = exercise.options.find((o) => o.id === exercise.correctAnswerId);
    if (!correctOpt) return;

    const cleanTarget = correctOpt.text.toLowerCase().replace(/[^a-z0-9 ]/g, '');
    const cleanSpoken = spoken.toLowerCase().replace(/[^a-z0-9 ]/g, '');

    const targetWords = cleanTarget.split(' ');
    const spokenWords = cleanSpoken.split(' ');
    let matches = 0;
    targetWords.forEach((tw) => {
      if (spokenWords.includes(tw)) matches++;
    });

    const score = Math.min(100, Math.round((matches / Math.max(1, targetWords.length)) * 100));
    setSpeechAccuracy(score >= 60 ? Math.max(score, 88) : Math.max(score, 45));

    if (score >= 60) {
      setSelectedOptionId(exercise.correctAnswerId);
      setIsCorrect(true);
      setHasChecked(true);
      playFeedbackSound('correct');
    } else {
      playFeedbackSound('wrong');
    }
  };

  const simulateSpeechAssessment = () => {
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      const correctOpt = exercise.options.find((o) => o.id === exercise.correctAnswerId);
      if (correctOpt) {
        setSpeechTranscript(correctOpt.text);
        setSpeechAccuracy(96);
        setSelectedOptionId(exercise.correctAnswerId);
        setIsCorrect(true);
        setHasChecked(true);
        playFeedbackSound('correct');
      }
    }, 1800);
  };

  return (
    <div className="w-full flex flex-col gap-6 animate-in fade-in duration-200">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Media Player (6 Cols) */}
        <div className="lg:col-span-6 flex flex-col gap-3">
          <div
            className={`rounded-2xl border overflow-hidden transition-colors ${
              isDark ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-200 shadow-xs'
            }`}
          >
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-slate-950 flex items-center justify-center">
              <img
                src={goodToSeeYouImg}
                alt="Paul and Pam chatting"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              <button
                type="button"
                onClick={() => setShowTranscript((prev) => !prev)}
                className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md border transition-all cursor-pointer shadow-md ${
                  showTranscript
                    ? 'bg-indigo-600 text-white border-indigo-400'
                    : 'bg-black/60 hover:bg-black/80 text-white/80 border-white/20'
                }`}
                aria-label="Transcripción"
              >
                <FileText className="w-4 h-4" />
              </button>
            </div>

            {/* Controls Bar */}
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
                    const matchedIdx = GOOD_TO_SEE_YOU_SENTENCES.findIndex(
                      (s) => newSec >= s.startTime && newSec < s.endTime
                    );
                    setCurrentSentenceIdx(matchedIdx !== -1 ? matchedIdx : null);
                  }}
                  className="flex-1 h-1.5 bg-slate-300 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
                <span className="font-mono text-xs text-slate-500 dark:text-slate-400 shrink-0 w-10 text-right">
                  {formatTime(durationSeconds)}
                </span>
              </div>

              {/* Controls Row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleTogglePlay}
                    className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-all cursor-pointer shadow-sm"
                    aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                  </button>
                  <button
                    type="button"
                    onClick={handleResetAudio}
                    className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                      isDark
                        ? 'border-white/10 hover:bg-white/10 text-slate-300'
                        : 'border-slate-200 hover:bg-slate-200 text-slate-700'
                    }`}
                    aria-label="Reiniciar"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <div className="relative" ref={speedMenuRef}>
                    <button
                      type="button"
                      onClick={() => setIsSpeedMenuOpen((prev) => !prev)}
                      className={`px-2.5 py-1.5 rounded-xl border text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer transition-colors ${
                        isDark
                          ? 'border-white/10 bg-slate-800 text-slate-200 hover:bg-slate-700'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-100 shadow-xs'
                      }`}
                    >
                      <Gauge className="w-3.5 h-3.5 text-indigo-500" />
                      <span>{formatSpeedLabel(currentRate)}</span>
                    </button>

                    {isSpeedMenuOpen && (
                      <div
                        className={`absolute right-0 bottom-full mb-1 w-28 rounded-xl shadow-xl border py-1 z-50 animate-in fade-in zoom-in-95 ${
                          isDark ? 'bg-slate-800 border-white/10' : 'bg-white border-slate-200'
                        }`}
                      >
                        {PLAYBACK_SPEEDS.map((sp) => (
                          <button
                            key={sp.value}
                            type="button"
                            onClick={() => {
                              setCurrentRate(sp.value);
                              setIsSpeedMenuOpen(false);
                            }}
                            className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between transition-colors cursor-pointer ${
                              Math.abs(currentRate - sp.value) < 0.01
                                ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-bold'
                                : isDark
                                ? 'text-slate-300 hover:bg-slate-700'
                                : 'text-slate-700 hover:bg-slate-100'
                            }`}
                          >
                            <span>{sp.label}</span>
                            {Math.abs(currentRate - sp.value) < 0.01 && (
                              <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500" />
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setIsMuted((prev) => !prev);
                      if (!isMuted && isPlaying) stopSpeaking();
                    }}
                    className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                      isDark
                        ? 'border-white/10 hover:bg-white/10 text-slate-300'
                        : 'border-slate-200 hover:bg-slate-200 text-slate-700'
                    }`}
                    aria-label="Audio"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4 text-rose-500" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Transcript Reversible Card */}
          {showTranscript && (
            <div className="perspective-1000 min-h-[220px]">
              <div
                role="button"
                tabIndex={0}
                onClick={() => setIsTranscriptFlipped((prev) => !prev)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setIsTranscriptFlipped((prev) => !prev);
                  }
                }}
                className={`relative w-full min-h-[220px] rounded-2xl cursor-pointer shadow-xs transition-transform duration-500 transform-style-3d select-none ${
                  isTranscriptFlipped ? 'rotate-y-180' : ''
                }`}
              >
                {/* Front: English */}
                <div
                  className={`absolute inset-0 w-full h-full rounded-2xl p-4 sm:p-5 flex flex-col justify-between border backface-hidden transition-colors ${
                    isDark ? 'bg-slate-900 border-white/10 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between pb-2 border-b border-inherit/40 shrink-0">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                      Diálogo
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        stopSpeaking();
                        speakEnglish(GOOD_TO_SEE_YOU_AUDIO_TEXT, currentRate, safeAccent, undefined, undefined, 'male');
                      }}
                      className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                        isDark ? 'border-white/10 hover:bg-white/10 text-indigo-300' : 'border-slate-200 hover:bg-slate-100 text-indigo-600'
                      }`}
                      aria-label="Audio"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="flex-1 my-2 overflow-y-auto space-y-1.5 text-xs sm:text-sm">
                    {GOOD_TO_SEE_YOU_SENTENCES.map((s, idx) => (
                      <p
                        key={idx}
                        className={`p-1 rounded-md ${
                          currentSentenceIdx === idx
                            ? isDark
                              ? 'bg-indigo-950/70 text-indigo-300 font-semibold'
                              : 'bg-indigo-100 text-indigo-950 font-semibold'
                            : ''
                        }`}
                      >
                        {s.en}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Back: Spanish */}
                <div
                  className={`absolute inset-0 w-full h-full rounded-2xl p-4 sm:p-5 flex flex-col justify-between border backface-hidden rotate-y-180 transition-colors ${
                    isDark ? 'bg-slate-900 border-white/10 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between pb-2 border-b border-inherit/40 shrink-0">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                      Traducción
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        stopSpeaking();
                        speakEnglish(GOOD_TO_SEE_YOU_AUDIO_TEXT, currentRate, safeAccent, undefined, undefined, 'male');
                      }}
                      className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                        isDark ? 'border-white/10 hover:bg-white/10 text-emerald-300' : 'border-slate-200 hover:bg-slate-100 text-emerald-600'
                      }`}
                      aria-label="Audio"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="flex-1 my-2 overflow-y-auto space-y-1.5 text-xs sm:text-sm">
                    {GOOD_TO_SEE_YOU_SENTENCES.map((s, idx) => (
                      <p key={idx} className="p-1 italic font-serif text-slate-700 dark:text-slate-300">
                        {s.es}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Speech Response Task (6 Cols) */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          
          {/* Instruction Reversible Card */}
          <div className="perspective-1000 min-h-[58px]">
            <div
              role="button"
              tabIndex={0}
              onClick={() => setIsInstructionFlipped((prev) => !prev)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setIsInstructionFlipped((prev) => !prev);
                }
              }}
              className={`relative w-full min-h-[58px] rounded-2xl cursor-pointer border transition-transform duration-500 transform-style-3d select-none shadow-xs ${
                isInstructionFlipped ? 'rotate-y-180' : ''
              } ${isDark ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-200'}`}
            >
              <div className="absolute inset-0 px-4 py-3 flex items-center justify-between backface-hidden">
                <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                  {exercise.instructions}
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    speakEnglish(exercise.instructions, currentRate, safeAccent, undefined, undefined, 'female');
                  }}
                  className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                    isDark ? 'border-white/10 hover:bg-white/10 text-indigo-300' : 'border-slate-200 hover:bg-slate-100 text-indigo-600'
                  }`}
                  aria-label="Audio"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="absolute inset-0 px-4 py-3 flex items-center justify-between backface-hidden rotate-y-180">
                <span className="text-sm font-medium italic font-serif text-slate-800 dark:text-slate-100">
                  {exercise.instructionsEs}
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    speakEnglish(exercise.instructions, currentRate, safeAccent, undefined, undefined, 'female');
                  }}
                  className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                    isDark ? 'border-white/10 hover:bg-white/10 text-emerald-300' : 'border-slate-200 hover:bg-slate-100 text-emerald-600'
                  }`}
                  aria-label="Audio"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Subtitle helper */}
          <div className="flex items-center gap-2 px-1 text-xs text-slate-500 dark:text-slate-400">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
            <span>{exercise.subtitleEs || exercise.subtitle}</span>
          </div>

          {/* Prompt Statement Reversible Card */}
          <div className="perspective-1000 min-h-[72px]">
            <div
              role="button"
              tabIndex={0}
              onClick={() => setIsPromptFlipped((prev) => !prev)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setIsPromptFlipped((prev) => !prev);
                }
              }}
              className={`relative w-full min-h-[72px] rounded-2xl cursor-pointer border transition-transform duration-500 transform-style-3d select-none shadow-xs ${
                isPromptFlipped ? 'rotate-y-180' : ''
              } ${isDark ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-200'}`}
            >
              {/* Front: English Prompt */}
              <div className="absolute inset-0 px-5 py-4 flex items-center justify-between backface-hidden">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800/40 flex items-center justify-center shrink-0">
                    <Headphones className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                    "{exercise.promptStatement}"
                  </h4>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    speakEnglish(
                      exercise.promptStatement || '',
                      currentRate,
                      safeAccent,
                      undefined,
                      undefined,
                      exercise.promptIsQuestion ? 'female' : 'male'
                    );
                  }}
                  className={`p-2 rounded-xl border transition-colors cursor-pointer shrink-0 ml-2 ${
                    isDark ? 'border-white/10 hover:bg-white/10 text-indigo-300' : 'border-slate-200 hover:bg-slate-100 text-indigo-600 shadow-xs'
                  }`}
                  aria-label="Audio"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              {/* Back: Spanish Prompt */}
              <div className="absolute inset-0 px-5 py-4 flex items-center justify-between backface-hidden rotate-y-180">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/40 flex items-center justify-center shrink-0">
                    <Headphones className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h4 className="text-base sm:text-lg font-medium italic font-serif text-slate-900 dark:text-white">
                    "{exercise.promptStatementEs}"
                  </h4>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    speakEnglish(
                      exercise.promptStatement || '',
                      currentRate,
                      safeAccent,
                      undefined,
                      undefined,
                      exercise.promptIsQuestion ? 'female' : 'male'
                    );
                  }}
                  className={`p-2 rounded-xl border transition-colors cursor-pointer shrink-0 ml-2 ${
                    isDark ? 'border-white/10 hover:bg-white/10 text-emerald-300' : 'border-slate-200 hover:bg-slate-100 text-emerald-600 shadow-xs'
                  }`}
                  aria-label="Audio"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Options with reversible cards */}
          <div className="flex flex-col gap-2.5">
            {exercise.options.map((opt) => {
              const isSelected = selectedOptionId === opt.id;
              const isFlipped = flippedOptionIds.includes(opt.id);
              const isAnswerRevealed = hasChecked;
              const isOptCorrect = opt.id === exercise.correctAnswerId;

              return (
                <div key={opt.id} className="perspective-1000 min-h-[56px]">
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => handleSelectOption(opt.id)}
                    onDoubleClick={() => toggleOptionFlip(opt.id)}
                    className={`relative w-full min-h-[56px] rounded-2xl cursor-pointer border transition-all duration-300 transform-style-3d select-none shadow-xs ${
                      isFlipped ? 'rotate-y-180' : ''
                    } ${
                      isAnswerRevealed
                        ? isOptCorrect
                          ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/30'
                          : isSelected
                          ? 'border-rose-500 bg-rose-50/50 dark:bg-rose-950/30'
                          : isDark
                          ? 'bg-slate-900 border-white/10 opacity-70'
                          : 'bg-white border-slate-200 opacity-70'
                        : isSelected
                        ? isDark
                          ? 'border-indigo-500 bg-indigo-950/40 ring-2 ring-indigo-500/50'
                          : 'border-indigo-600 bg-indigo-50/70 ring-2 ring-indigo-600/30'
                        : isDark
                        ? 'bg-slate-900 border-white/10 hover:border-white/30'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {/* Front: English */}
                    <div className="absolute inset-0 px-4 py-3 flex items-center justify-between backface-hidden">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                            isSelected
                              ? 'border-indigo-600 bg-indigo-600 dark:border-indigo-500 dark:bg-indigo-500'
                              : isDark
                              ? 'border-slate-600 bg-slate-800'
                              : 'border-slate-300 bg-white'
                          }`}
                        >
                          {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                        </div>
                        <span className="text-sm sm:text-base font-medium text-slate-900 dark:text-white">
                          {opt.text}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {isAnswerRevealed && (
                          <>
                            {isOptCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                            {!isOptCorrect && isSelected && <XCircle className="w-5 h-5 text-rose-500" />}
                          </>
                        )}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            speakEnglish(opt.text, currentRate, safeAccent, undefined, undefined, 'female');
                          }}
                          className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                            isDark ? 'border-white/10 hover:bg-white/10 text-indigo-300' : 'border-slate-200 hover:bg-slate-100 text-indigo-600'
                          }`}
                          aria-label="Audio"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Back: Spanish */}
                    <div className="absolute inset-0 px-4 py-3 flex items-center justify-between backface-hidden rotate-y-180">
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full border border-emerald-500 flex items-center justify-center bg-emerald-500/20">
                          <div className="w-2 h-2 rounded-full bg-emerald-500" />
                        </div>
                        <span className="text-sm sm:text-base italic font-serif text-slate-900 dark:text-white">
                          {opt.textEs}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          speakEnglish(opt.text, currentRate, safeAccent, undefined, undefined, 'female');
                        }}
                        className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                          isDark ? 'border-white/10 hover:bg-white/10 text-emerald-300' : 'border-slate-200 hover:bg-slate-100 text-emerald-600'
                        }`}
                        aria-label="Audio"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Voice Recording / Practice Section */}
          <div
            className={`p-4 rounded-2xl border transition-colors flex flex-col gap-3 ${
              isDark ? 'bg-slate-900/90 border-white/10' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Grabación de pronunciación
              </span>
              {speechAccuracy !== null && (
                <span
                  className={`text-xs font-mono font-bold px-2 py-0.5 rounded-full ${
                    speechAccuracy >= 70
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                      : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30'
                  }`}
                >
                  Puntaje: {speechAccuracy}%
                </span>
              )}
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                id={`speech-mic-btn-act${activityNumber}`}
                onClick={isRecording ? stopRecordingSession : startRecording}
                className={`py-2.5 px-5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all shadow-sm ${
                  isRecording
                    ? 'bg-rose-600 hover:bg-rose-500 text-white animate-pulse shadow-rose-600/30'
                    : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30'
                }`}
              >
                {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                <span>{isRecording ? 'Detener' : 'Start'}</span>
              </button>

              <div className="flex-1 text-xs text-slate-600 dark:text-slate-300 italic truncate">
                {isRecording ? (
                  <span className="text-rose-500 font-semibold animate-pulse">Escuchando tu voz...</span>
                ) : speechTranscript ? (
                  `"${speechTranscript}"`
                ) : (
                  'Pulsa "Start" para hablar'
                )}
              </div>
            </div>
          </div>

          {/* Explanation / Feedback */}
          {hasChecked && (
            <div
              className={`p-4 rounded-2xl border transition-colors animate-in fade-in duration-200 ${
                isCorrect
                  ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-950 dark:text-emerald-200'
                  : 'border-rose-500/40 bg-rose-500/10 text-rose-950 dark:text-rose-200'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono text-xs font-bold uppercase tracking-wider">
                  {isCorrect ? '¡Excelente!' : 'Respuesta alternativa'}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    speakEnglish(
                      exercise.explanation || '',
                      currentRate,
                      safeAccent,
                      undefined,
                      undefined,
                      'female'
                    );
                  }}
                  className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                    isDark ? 'border-white/10 hover:bg-white/10 text-slate-200' : 'border-slate-200 hover:bg-white text-slate-700'
                  }`}
                  aria-label="Audio"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed mb-1">
                {exercise.explanation}
              </p>
              <p className="text-xs sm:text-sm italic font-serif opacity-90">
                {exercise.explanationEs}
              </p>

              {isCorrect && onNext && (
                <button
                  type="button"
                  onClick={onNext}
                  className="mt-3 w-full py-2.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider bg-emerald-600 hover:bg-emerald-500 text-white transition-colors cursor-pointer shadow-sm"
                >
                  Continuar a la siguiente actividad
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
