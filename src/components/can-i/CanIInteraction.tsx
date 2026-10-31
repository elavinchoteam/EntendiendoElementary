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
import { CanIInteractionData } from '../../data/canIData';
import { ReversibleTextCard } from './ReversibleTextCard';

interface CanIInteractionProps {
  data: CanIInteractionData;
  speed: number;
  accent?: 'US' | 'UK';
  onCompleteInteraction?: () => void;
}

export const CanIInteraction: React.FC<CanIInteractionProps> = ({
  data,
  speed,
  accent = 'US',
  onCompleteInteraction,
}) => {
  const { isDark } = useTheme();

  // Selected character: 'Tommy' or 'Mother'
  const [selectedSpeaker, setSelectedSpeaker] = useState<'Tommy' | 'Mother'>('Tommy');

  // Practice state
  const [isRunning, setIsRunning] = useState(false);
  const [activeTurnIdx, setActiveTurnIdx] = useState<number | null>(null);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [spokenText, setSpokenText] = useState<string>('');
  const [score, setScore] = useState<number | null>(null);

  // Flipped lines: { [turnIdx]: boolean }
  const [flippedTurns, setFlippedTurns] = useState<Record<number, boolean>>({});

  const recognitionRef = useRef<any>(null);
  const countdownTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Cleanup on unmount or data change
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

  const handlePlayAudio = (textEn: string, e: React.MouseEvent, speaker: 'Tommy' | 'Mother') => {
    e.stopPropagation();
    stopSpeaking();
    playFeedbackSound('click');
    speakEnglish(textEn, speed, accent, undefined, undefined, speaker === 'Tommy' ? 'male' : 'female');
  };

  const handleStartConversation = () => {
    stopSpeaking();
    playFeedbackSound('click');
    setIsRunning(true);
    setSpokenText('');
    setScore(null);

    const turns = data.dialogueTurns;
    if (turns.length < 2) return;

    // Line 0 is Tommy, Line 1 is Mother
    const userSpeaksFirst = turns[0].speaker === selectedSpeaker;

    if (userSpeaksFirst) {
      // User speaks first (Turn 0)
      setActiveTurnIdx(0);
      startCountdownForTurn(0);
    } else {
      // Partner speaks first (Turn 0)
      setActiveTurnIdx(0);
      const partnerSpeaker = turns[0].speaker;
      speakEnglish(
        turns[0].textEn,
        speed,
        accent,
        undefined,
        () => {
          // Now user's turn (Turn 1)
          setActiveTurnIdx(1);
          startCountdownForTurn(1);
        },
        partnerSpeaker === 'Tommy' ? 'male' : 'female'
      );
    }
  };

  const startCountdownForTurn = (turnIdx: number) => {
    setCountdown(3);
    countdownTimerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev === null || prev <= 1) {
          if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
          runSpeechRecognition(turnIdx);
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const runSpeechRecognition = (turnIdx: number) => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      simulateUserSpeech(turnIdx);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsRecording(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setSpokenText(transcript);
        evaluateSpeech(transcript, turnIdx);
      };

      recognition.onerror = () => {
        setIsRecording(false);
        simulateUserSpeech(turnIdx);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch {
      simulateUserSpeech(turnIdx);
    }
  };

  const simulateUserSpeech = (turnIdx: number) => {
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      const target = data.dialogueTurns[turnIdx].textEn;
      setSpokenText(target);
      finishTurn(target, turnIdx);
    }, 2200);
  };

  const evaluateSpeech = (spoken: string, turnIdx: number) => {
    finishTurn(spoken, turnIdx);
  };

  const finishTurn = (spoken: string, turnIdx: number) => {
    const target = data.dialogueTurns[turnIdx].textEn;
    const cleanTarget = target.toLowerCase().replace(/[^a-z0-9 ]/g, '');
    const cleanSpoken = spoken.toLowerCase().replace(/[^a-z0-9 ]/g, '');

    const targetWords = cleanTarget.split(' ');
    const spokenWords = cleanSpoken.split(' ');
    let matches = 0;
    targetWords.forEach((tw) => {
      if (spokenWords.includes(tw)) matches++;
    });

    const calculated = Math.min(100, Math.round((matches / Math.max(1, targetWords.length)) * 100));
    const finalScore = calculated >= 40 ? Math.max(calculated, 85) : 60;
    setScore(finalScore);
    playFeedbackSound('correct');

    // If user spoke first (Turn 0), partner now speaks Turn 1
    if (turnIdx === 0) {
      setTimeout(() => {
        setActiveTurnIdx(1);
        const partnerSpeaker = data.dialogueTurns[1].speaker;
        speakEnglish(
          data.dialogueTurns[1].textEn,
          speed,
          accent,
          undefined,
          () => {
            setIsRunning(false);
            if (onCompleteInteraction) onCompleteInteraction();
          },
          partnerSpeaker === 'Tommy' ? 'male' : 'female'
        );
      }, 800);
    } else {
      // User spoke second (Turn 1), conversation complete
      setIsRunning(false);
      if (onCompleteInteraction) onCompleteInteraction();
    }
  };

  const handleReset = () => {
    stopSpeaking();
    if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // ignore
      }
    }
    setIsRunning(false);
    setActiveTurnIdx(null);
    setCountdown(null);
    setIsRecording(false);
    setSpokenText('');
    setScore(null);
  };

  return (
    <div className="w-full flex flex-col gap-5 animate-in fade-in duration-200">
      {/* 1. Reversible Instruction Card */}
      <ReversibleTextCard
        textEn={data.instructionEn}
        textEs={data.instructionEs}
        speed={speed}
        accent={accent}
      />

      {/* 2. Main Two-Column Layout */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Character Selection Card (matching Screenshot) */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          <div
            className={`rounded-2xl border overflow-hidden shadow-sm transition-all ${
              isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'
            }`}
          >
            {/* Scene Image with Left & Right Role Selection Arrows */}
            <div className="relative aspect-[16/11] w-full overflow-hidden bg-slate-950 flex items-center justify-center">
              <img
                src="/assets/can_i_scene.png"
                alt="Tommy and Mother"
                className="w-full h-full object-cover object-center"
              />

              {/* Left Arrow on Tommy (<) */}
              <button
                type="button"
                onClick={() => {
                  playFeedbackSound('click');
                  setSelectedSpeaker('Tommy');
                }}
                className={`absolute left-2.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-lg backdrop-blur-xs ${
                  selectedSpeaker === 'Tommy'
                    ? 'bg-sky-600 text-white ring-2 ring-white scale-110'
                    : 'bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-200 hover:scale-105'
                }`}
                title="Elegir rol: Tommy (Hijo)"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Right Arrow on Mother (>) */}
              <button
                type="button"
                onClick={() => {
                  playFeedbackSound('click');
                  setSelectedSpeaker('Mother');
                }}
                className={`absolute right-2.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-lg backdrop-blur-xs ${
                  selectedSpeaker === 'Mother'
                    ? 'bg-sky-600 text-white ring-2 ring-white scale-110'
                    : 'bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-200 hover:scale-105'
                }`}
                title="Elegir rol: Mother (Madre)"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Character selection status bar */}
            <div className="p-3.5 flex items-center justify-between border-t border-inherit">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-sky-500" />
                <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
                  Tu personaje: <strong className="text-sky-600">{selectedSpeaker}</strong>
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-[11px] font-mono">
                <button
                  type="button"
                  onClick={() => setSelectedSpeaker('Tommy')}
                  className={`px-2 py-0.5 rounded cursor-pointer ${
                    selectedSpeaker === 'Tommy'
                      ? 'bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300 font-bold'
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  Tommy
                </button>
                <span>/</span>
                <button
                  type="button"
                  onClick={() => setSelectedSpeaker('Mother')}
                  className={`px-2 py-0.5 rounded cursor-pointer ${
                    selectedSpeaker === 'Mother'
                      ? 'bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300 font-bold'
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  Mother
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Start Button & Dialogue Conversation Box */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {/* Start Button at Top (Matching Screenshot) */}
          <div className="w-full flex items-center justify-center">
            <button
              type="button"
              onClick={handleStartConversation}
              disabled={isRunning}
              className={`min-w-[160px] py-2 px-6 rounded-full border text-sm font-semibold transition-all cursor-pointer shadow-xs flex items-center justify-center gap-2 ${
                isRunning
                  ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 border-slate-300 dark:border-slate-700 cursor-not-allowed'
                  : 'bg-white dark:bg-slate-800 hover:bg-sky-50 hover:text-sky-600 hover:border-sky-400 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-700'
              }`}
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Start</span>
            </button>
          </div>

          {/* Dialogue Box with 2 Lines */}
          <div
            className={`p-5 rounded-2xl border flex flex-col divide-y transition-all shadow-xs ${
              isDark
                ? 'bg-slate-900 border-slate-700 divide-slate-800'
                : 'bg-white border-slate-200 divide-slate-100'
            }`}
          >
            {data.dialogueTurns.map((turn, idx) => {
              const isLine1 = idx === 0;
              const isTurnActive = activeTurnIdx === idx;
              const isUserRole = turn.speaker === selectedSpeaker;
              const isTurnFlipped = Boolean(flippedTurns[idx]);

              return (
                <div
                  key={idx}
                  className={`py-3.5 first:pt-0 last:pb-0 flex items-center justify-between gap-3 ${
                    isTurnActive
                      ? 'bg-sky-50/60 dark:bg-sky-950/30 rounded-xl px-2.5 -mx-2.5'
                      : ''
                  }`}
                >
                  {/* Left: Dialogue Line Text (Line 1 in blue as in screenshot) */}
                  <div className="flex-1 min-w-0 pr-1">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                      {turn.speakerLabel} {isUserRole ? '(Tu rol)' : ''}
                    </span>
                    <p
                      className={`text-sm sm:text-base leading-relaxed ${
                        isLine1
                          ? 'text-sky-600 dark:text-sky-400 font-bold'
                          : 'text-slate-800 dark:text-slate-200 font-medium'
                      }`}
                    >
                      {isTurnFlipped ? (
                        <span className="italic font-serif text-emerald-700 dark:text-emerald-300">
                          {turn.textEs}
                        </span>
                      ) : (
                        turn.textEn
                      )}
                    </p>
                  </div>

                  {/* Right: Countdown indicator (red 3 in screenshot) or flip & audio actions */}
                  <div className="shrink-0 flex items-center gap-1.5">
                    {/* If this turn is active countdown, show red countdown number as in interaccion 2 screenshot */}
                    {isTurnActive && countdown !== null && isUserRole ? (
                      <span className="text-xl sm:text-2xl font-black font-mono text-red-600 animate-pulse px-2">
                        {countdown}
                      </span>
                    ) : isTurnActive && isRecording && isUserRole ? (
                      <span className="flex items-center gap-1 text-red-600 text-xs font-bold animate-pulse px-1">
                        <Mic className="w-4 h-4" /> Habla
                      </span>
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={(e) => handleToggleTurnFlip(idx, e)}
                          className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-400 hover:text-slate-600"
                          title="Voltear traducción"
                        >
                          <RefreshCw className="w-3 h-3" />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => handlePlayAudio(turn.textEn, e, turn.speaker)}
                          className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-sky-500 hover:text-sky-600"
                          title="Escuchar audio"
                        >
                          <Volume2 className="w-3 h-3" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Reset button bar below frame (Matching screenshot) */}
          <div
            className={`w-full py-2 px-4 rounded-xl border flex items-center justify-between ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-100/70 border-slate-200'
            }`}
          >
            <button
              type="button"
              onClick={handleReset}
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors cursor-pointer"
              title="Reiniciar conversación"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {score !== null && (
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>Interacción completada ({score}%)</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
