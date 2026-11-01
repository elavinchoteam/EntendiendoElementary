import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  RotateCcw,
  Volume2,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  User,
  Mic,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { speakEnglish, stopSpeaking, playFeedbackSound } from '../../utils/audio';
import { DontDoThatInteractionData } from '../../data/dontDoThatData';
import { ReversibleTextCard } from './ReversibleTextCard';

interface DontDoThatInteractionProps {
  data: DontDoThatInteractionData;
  speed: number;
  accent?: 'US' | 'UK';
  onNavigatePrevInteraction?: () => void;
  onNavigateNextInteraction?: () => void;
  hasPrevInteraction?: boolean;
  hasNextInteraction?: boolean;
}

export const DontDoThatInteraction: React.FC<DontDoThatInteractionProps> = ({
  data,
  speed,
  accent = 'US',
  onNavigatePrevInteraction,
  onNavigateNextInteraction,
  hasPrevInteraction = true,
  hasNextInteraction = true,
}) => {
  const { isDark } = useTheme();

  // Role selection: 'Peterson' or 'Boss'
  const [selectedSpeaker, setSelectedSpeaker] = useState<'Peterson' | 'Boss'>('Peterson');

  // Interactive conversation state
  const [isRunning, setIsRunning] = useState(false);
  const [activeTurnIdx, setActiveTurnIdx] = useState<number | null>(null);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [spokenText, setSpokenText] = useState<string>('');
  const [score, setScore] = useState<number | null>(null);

  // Flipped lines
  const [flippedTurns, setFlippedTurns] = useState<Record<number, boolean>>({});

  const recognitionRef = useRef<any>(null);
  const countdownTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      stopSpeaking();
      if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {
          // ignore
        }
      }
    };
  }, [data.id]);

  const handleToggleTurnFlip = (idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    playFeedbackSound('click');
    setFlippedTurns((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const handlePlayAudio = (textEn: string, e: React.MouseEvent) => {
    e.stopPropagation();
    stopSpeaking();
    playFeedbackSound('click');
    speakEnglish(textEn, speed, accent, undefined, undefined, 'male');
  };

  const handleStartConversation = () => {
    stopSpeaking();
    playFeedbackSound('click');
    setIsRunning(true);
    setSpokenText('');
    setScore(null);

    const turns = data.dialogueTurns;
    if (turns.length < 2) return;

    // Line 0 is Boss, Line 1 is Peterson
    const userSpeaksFirst = turns[0].speaker === selectedSpeaker;

    if (userSpeaksFirst) {
      setActiveTurnIdx(0);
      startCountdownForTurn(0);
    } else {
      setActiveTurnIdx(0);
      speakEnglish(
        turns[0].textEn,
        speed,
        accent,
        undefined,
        () => {
          setActiveTurnIdx(1);
          startCountdownForTurn(1);
        },
        'male'
      );
    }
  };

  const startCountdownForTurn = (turnIdx: number) => {
    setCountdown(3);
    let c = 3;
    countdownTimerRef.current = setInterval(() => {
      c -= 1;
      if (c > 0) {
        setCountdown(c);
      } else {
        if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
        setCountdown(null);
        startRecordingForTurn(turnIdx);
      }
    }, 800);
  };

  const startRecordingForTurn = (turnIdx: number) => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setIsRecording(false);
      setSpokenText(data.dialogueTurns[turnIdx].textEn);
      setScore(100);
      playFeedbackSound('correct');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = accent === 'UK' ? 'en-GB' : 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsRecording(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setSpokenText(transcript);
        evaluateRecording(transcript, turnIdx);
      };

      recognition.onerror = () => {
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch {
      setIsRecording(false);
    }
  };

  const evaluateRecording = (transcript: string, turnIdx: number) => {
    const target = data.dialogueTurns[turnIdx].textEn.toLowerCase().replace(/[^a-z0-9 ]/g, '');
    const cleanSpoken = transcript.toLowerCase().replace(/[^a-z0-9 ]/g, '');

    const targetWords = target.split(' ');
    const spokenWords = cleanSpoken.split(' ');
    let matches = 0;
    targetWords.forEach((tw) => {
      if (spokenWords.includes(tw)) matches++;
    });

    const calculatedScore = Math.min(
      100,
      Math.max(60, Math.round((matches / targetWords.length) * 100))
    );
    setScore(calculatedScore);
    playFeedbackSound('correct');

    // If user spoke first, now play partner line
    if (turnIdx === 0 && data.dialogueTurns.length > 1) {
      setTimeout(() => {
        setActiveTurnIdx(1);
        speakEnglish(data.dialogueTurns[1].textEn, speed, accent, undefined, undefined, 'male');
      }, 1000);
    }
  };

  const handleReset = () => {
    stopSpeaking();
    playFeedbackSound('click');
    setIsRunning(false);
    setActiveTurnIdx(null);
    setCountdown(null);
    setIsRecording(false);
    setSpokenText('');
    setScore(null);
    if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // ignore
      }
    }
  };

  const currentInstructionEn = isRunning && countdown !== null
    ? 'Prepare to speak...'
    : data.instructionEn;

  const currentInstructionEs = isRunning && countdown !== null
    ? 'Prepárate para hablar...'
    : data.instructionEs;

  return (
    <div className="w-full flex flex-col gap-6 animate-in fade-in duration-200">
      {/* 1. Instruction Card */}
      <ReversibleTextCard
        textEn={currentInstructionEn}
        textEs={currentInstructionEs}
        speed={speed}
        accent={accent}
      />

      {/* 2. Main Two-Column Layout */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Photo Card with Navigation Arrows */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div
            className={`w-full max-w-sm rounded-2xl border-2 p-2 shadow-md relative overflow-hidden ${
              isDark
                ? 'bg-slate-900 border-slate-700 shadow-slate-950/60'
                : 'bg-white border-slate-300 shadow-slate-200'
            }`}
          >
            {/* The Image */}
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-900">
              <img
                src="/assets/dont_do_that_scene.png"
                alt="Don't Do That Scene"
                className="w-full h-full object-cover select-none"
              />

              {/* Prev Arrow Overlay */}
              {hasPrevInteraction && onNavigatePrevInteraction && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    playFeedbackSound('click');
                    onNavigatePrevInteraction();
                  }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-sky-600/80 hover:bg-sky-500 text-white flex items-center justify-center backdrop-blur-sm shadow-md transition-all"
                  title="Interacción anterior"
                  aria-label="Interacción anterior"
                >
                  <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
                </button>
              )}

              {/* Next Arrow Overlay */}
              {hasNextInteraction && onNavigateNextInteraction && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    playFeedbackSound('click');
                    onNavigateNextInteraction();
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-700/80 hover:bg-slate-600 text-white flex items-center justify-center backdrop-blur-sm shadow-md transition-all"
                  title="Siguiente interacción"
                  aria-label="Siguiente interacción"
                >
                  <ChevronRight className="w-5 h-5 stroke-[2.5]" />
                </button>
              )}
            </div>

            {/* Interaction Title / Step Badge */}
            <div className="mt-2.5 px-2 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span className="font-semibold text-sky-600 dark:text-sky-400">
                {data.titleEs}
              </span>
              <span>Diálogo Guiado</span>
            </div>
          </div>
        </div>

        {/* Right Column: Interaction Conversation Card */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div
            className={`p-6 rounded-2xl border shadow-sm flex flex-col gap-5 ${
              isDark ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-200'
            }`}
          >
            {/* Top Bar: Start Button & Character Selector */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-700">
              {/* Role Toggle */}
              <div className="flex items-center gap-1.5 text-xs bg-slate-100 dark:bg-slate-900/60 p-1 rounded-xl">
                <span className="px-2 text-slate-500 font-medium">Tu Rol:</span>
                <button
                  type="button"
                  onClick={() => {
                    playFeedbackSound('click');
                    setSelectedSpeaker('Peterson');
                  }}
                  className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                    selectedSpeaker === 'Peterson'
                      ? 'bg-sky-600 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  Peterson (Empleado)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    playFeedbackSound('click');
                    setSelectedSpeaker('Boss');
                  }}
                  className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                    selectedSpeaker === 'Boss'
                      ? 'bg-sky-600 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  Boss (Jefe)
                </button>
              </div>

              {/* Start Button */}
              <button
                type="button"
                onClick={handleStartConversation}
                disabled={isRunning}
                className="px-6 py-2 rounded-full font-semibold text-sm border transition-all shadow-sm flex items-center gap-2 bg-slate-100 dark:bg-slate-700/60 hover:bg-sky-50 dark:hover:bg-sky-950/40 hover:text-sky-600 border-slate-300 dark:border-slate-600 disabled:opacity-50"
              >
                <Play className="w-4 h-4 fill-current text-sky-600" />
                Start
              </button>
            </div>

            {/* Conversation Card */}
            <div
              className={`rounded-2xl border-2 p-5 flex flex-col gap-4 shadow-sm relative ${
                isDark ? 'bg-slate-900/60 border-slate-700' : 'bg-slate-50/60 border-slate-300'
              }`}
            >
              {/* Turn 1 (Line 1: Usually in blue) */}
              {data.dialogueTurns[0] && (
                <div
                  className={`p-3.5 rounded-xl border transition-all flex items-start justify-between gap-3 ${
                    activeTurnIdx === 0
                      ? 'border-sky-500 bg-sky-50/80 dark:bg-sky-950/40 shadow-sm ring-1 ring-sky-500'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/60'
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 block mb-0.5">
                      {data.dialogueTurns[0].speakerLabel}
                    </span>

                    {!flippedTurns[0] ? (
                      <p className="text-base sm:text-lg font-bold text-sky-600 dark:text-sky-400 leading-snug">
                        {data.dialogueTurns[0].textEn}
                      </p>
                    ) : (
                      <p className="text-base sm:text-lg font-medium text-emerald-700 dark:text-emerald-300 leading-snug">
                        {data.dialogueTurns[0].textEs}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {/* Badge Number (e.g. 2 or 1) */}
                    {data.badgeNumber && (
                      <span className="font-mono text-base font-bold text-rose-600 dark:text-rose-400 px-2">
                        {data.badgeNumber}
                      </span>
                    )}

                    <button
                      type="button"
                      onClick={(e) => handlePlayAudio(data.dialogueTurns[0].textEn, e)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-sky-600 hover:bg-sky-50 dark:hover:bg-sky-950/40 transition-colors"
                      title="Escuchar audio"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={(e) => handleToggleTurnFlip(0, e)}
                      className={`p-1.5 rounded-lg transition-colors ${
                        flippedTurns[0]
                          ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40'
                          : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700'
                      }`}
                      title={flippedTurns[0] ? 'Ver inglés' : 'Traducir al español'}
                    >
                      <RefreshCw className={`w-4 h-4 transition-transform duration-300 ${flippedTurns[0] ? 'rotate-180' : ''}`} />
                    </button>
                  </div>
                </div>
              )}

              {/* Divider */}
              <div className="border-t border-slate-200 dark:border-slate-700" />

              {/* Turn 2 (Line 2: Peterson reply) */}
              {data.dialogueTurns[1] && (
                <div
                  className={`p-3.5 rounded-xl border transition-all flex items-start justify-between gap-3 ${
                    activeTurnIdx === 1
                      ? 'border-indigo-500 bg-indigo-50/80 dark:bg-indigo-950/40 shadow-sm ring-1 ring-indigo-500'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/60'
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block mb-0.5">
                      {data.dialogueTurns[1].speakerLabel}
                    </span>

                    {!flippedTurns[1] ? (
                      <p className="text-base sm:text-lg font-medium text-slate-900 dark:text-slate-100 leading-snug">
                        {data.dialogueTurns[1].textEn}
                      </p>
                    ) : (
                      <p className="text-base sm:text-lg font-medium text-emerald-700 dark:text-emerald-300 leading-snug">
                        {data.dialogueTurns[1].textEs}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={(e) => handlePlayAudio(data.dialogueTurns[1].textEn, e)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 transition-colors"
                      title="Escuchar audio"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={(e) => handleToggleTurnFlip(1, e)}
                      className={`p-1.5 rounded-lg transition-colors ${
                        flippedTurns[1]
                          ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40'
                          : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700'
                      }`}
                      title={flippedTurns[1] ? 'Ver inglés' : 'Traducir al español'}
                    >
                      <RefreshCw className={`w-4 h-4 transition-transform duration-300 ${flippedTurns[1] ? 'rotate-180' : ''}`} />
                    </button>
                  </div>
                </div>
              )}

              {/* Countdown or Active Recording Badge */}
              {countdown !== null && (
                <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700 flex items-center justify-center gap-3 animate-pulse">
                  <span className="text-sm font-semibold text-amber-800 dark:text-amber-200">
                    Prepárate para hablar en:
                  </span>
                  <span className="text-xl font-bold font-mono text-amber-600 dark:text-amber-400">
                    {countdown}
                  </span>
                </div>
              )}

              {isRecording && (
                <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-700 flex items-center justify-center gap-3 animate-pulse">
                  <Mic className="w-5 h-5 text-rose-500 animate-bounce" />
                  <span className="text-sm font-semibold text-rose-800 dark:text-rose-200">
                    ¡Habla ahora! Di tu línea en inglés...
                  </span>
                </div>
              )}

              {score !== null && (
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-700 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-sm font-semibold text-emerald-800 dark:text-emerald-200">
                      ¡Excelente pronunciación!
                    </span>
                  </div>
                  <span className="font-mono text-sm font-bold text-emerald-600 dark:text-emerald-400">
                    {score}%
                  </span>
                </div>
              )}
            </div>

            {/* Bottom Bar with Refresh Icon */}
            <div
              className={`px-4 py-2.5 rounded-xl border flex items-center justify-between text-xs ${
                isDark ? 'bg-slate-900/60 border-slate-700' : 'bg-slate-100/70 border-slate-200'
              }`}
            >
              <button
                type="button"
                onClick={handleReset}
                className="p-1.5 rounded-lg text-slate-500 hover:text-sky-600 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center gap-1.5"
                title="Reiniciar conversación"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reiniciar</span>
              </button>

              <span className="text-slate-400">
                Paso {data.interactionNumber} de 3
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
