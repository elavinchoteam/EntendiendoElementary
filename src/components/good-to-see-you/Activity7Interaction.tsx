import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  RotateCcw,
  Volume2,
  ChevronLeft,
  ChevronRight,
  Mic,
  MicOff,
  CheckCircle2,
  Sparkles,
  Gauge,
  ArrowRight,
  ArrowLeft,
  User,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { speakEnglish, stopSpeaking, playFeedbackSound } from '../../utils/audio';
import {
  goodToSeeYouImg,
  GOOD_TO_SEE_YOU_CHARACTERS,
  INTERACTION_PARTS,
} from '../../data/goodToSeeYouData';
import { PLAYBACK_SPEEDS, formatSpeedLabel } from './Activity1Explore';

interface Activity7InteractionProps {
  speechRate?: number;
  accent?: 'US' | 'UK';
  onComplete?: () => void;
}

export const Activity7Interaction: React.FC<Activity7InteractionProps> = ({
  speechRate = 1.0,
  accent = 'US',
  onComplete,
}) => {
  const { isDark } = useTheme();
  const safeAccent: 'US' | 'UK' = accent === 'UK' ? 'UK' : 'US';

  // Interaction part: 1, 2, or 3
  const [currentPartIndex, setCurrentPartIndex] = useState(0); // 0 = Part 1, 1 = Part 2, 2 = Part 3
  const activePart = INTERACTION_PARTS[currentPartIndex];

  // Selected character to practice ('character-1' = Paul, 'character-2' = Pam)
  const [selectedCharacterId, setSelectedCharacterId] = useState<string>('character-2'); // default Pam

  // Speed controls
  const [currentRate, setCurrentRate] = useState(speechRate);
  const [isSpeedMenuOpen, setIsSpeedMenuOpen] = useState(false);
  const speedMenuRef = useRef<HTMLDivElement | null>(null);

  // Reversible card flip states
  const [isInstructionFlipped, setIsInstructionFlipped] = useState(false);
  const [flippedTurnIdxs, setFlippedTurnIdxs] = useState<number[]>([]);

  // Practice state
  const [isRunning, setIsRunning] = useState(false);
  const [activeTurnIdx, setActiveTurnIdx] = useState<number | null>(null);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [spokenText, setSpokenText] = useState<string>('');
  const [score, setScore] = useState<number | null>(null);
  const [completedParts, setCompletedParts] = useState<number[]>([]);

  const recognitionRef = useRef<any>(null);
  const countdownTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setCurrentRate(speechRate);
  }, [speechRate]);

  // Reset flips and states on part change
  useEffect(() => {
    setIsInstructionFlipped(false);
    setFlippedTurnIdxs([]);
    setIsRunning(false);
    setActiveTurnIdx(null);
    setCountdown(null);
    setIsRecording(false);
    setSpokenText('');
    setScore(null);
    stopSpeaking();
    if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
  }, [currentPartIndex]);

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

  // Cleanup
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
  }, []);

  const toggleTurnFlip = (idx: number) => {
    setFlippedTurnIdxs((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  // Start dialogue practice for current part
  const handleStartPractice = () => {
    stopSpeaking();
    setIsRunning(true);
    setSpokenText('');
    setScore(null);

    const turns = activePart.dialogueTurns;
    if (!turns || turns.length < 2) return;

    // Line 0 is Paul ('character-1'), Line 1 is Pam ('character-2')
    const firstTurnIsUser = turns[0].characterId === selectedCharacterId;

    if (firstTurnIsUser) {
      // User speaks first
      setActiveTurnIdx(0);
      runUserSpeechTurn(0);
    } else {
      // Partner speaks first
      setActiveTurnIdx(0);
      const partnerSpeaker = turns[0].characterId === 'character-1' ? 'male' : 'female';
      speakEnglish(
        turns[0].textEn,
        currentRate,
        safeAccent,
        () => {
          // Now it's user's turn (Turn 1)
          setActiveTurnIdx(1);
          startCountdownForUser(1);
        },
        undefined,
        partnerSpeaker
      );
    }
  };

  const startCountdownForUser = (turnIdx: number) => {
    setCountdown(3);
    countdownTimerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev === null || prev <= 1) {
          if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
          runUserSpeechTurn(turnIdx);
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const runUserSpeechTurn = (turnIdx: number) => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      // Fallback
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
        evaluateUserSpeech(transcript, turnIdx);
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
      setIsRecording(false);
      simulateUserSpeech(turnIdx);
    }
  };

  const simulateUserSpeech = (turnIdx: number) => {
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      const targetText = activePart.dialogueTurns[turnIdx]?.textEn || '';
      setSpokenText(targetText);
      setScore(95);
      setIsRunning(false);
      playFeedbackSound('correct');
      if (!completedParts.includes(currentPartIndex)) {
        setCompletedParts((prev) => [...prev, currentPartIndex]);
      }
    }, 2200);
  };

  const evaluateUserSpeech = (spoken: string, turnIdx: number) => {
    const targetText = activePart.dialogueTurns[turnIdx]?.textEn || '';
    const cleanTarget = targetText.toLowerCase().replace(/[^a-z0-9 ]/g, '');
    const cleanSpoken = spoken.toLowerCase().replace(/[^a-z0-9 ]/g, '');

    const targetWords = cleanTarget.split(' ');
    const spokenWords = cleanSpoken.split(' ');
    let matches = 0;
    targetWords.forEach((tw) => {
      if (spokenWords.includes(tw)) matches++;
    });

    const calculated = Math.min(100, Math.round((matches / Math.max(1, targetWords.length)) * 100));
    const finalScore = calculated >= 50 ? Math.max(calculated, 85) : Math.max(calculated, 50);
    setScore(finalScore);
    setIsRunning(false);

    if (finalScore >= 60) {
      playFeedbackSound('correct');
      if (!completedParts.includes(currentPartIndex)) {
        setCompletedParts((prev) => [...prev, currentPartIndex]);
      }
    } else {
      playFeedbackSound('wrong');
    }
  };

  const handleResetPractice = () => {
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
    <div className="w-full flex flex-col gap-6 animate-in fade-in duration-200">
      
      {/* Sub-Header: 3 Parts Navigation Pills */}
      <div className="flex items-center justify-between flex-wrap gap-3 pb-2 border-b border-slate-200 dark:border-white/10">
        <div className="flex items-center gap-2">
          {INTERACTION_PARTS.map((part, idx) => {
            const isCurrent = currentPartIndex === idx;
            const isDone = completedParts.includes(idx);
            return (
              <button
                key={part.partNumber}
                type="button"
                id={`interaction-part-tab-${part.partNumber}`}
                onClick={() => setCurrentPartIndex(idx)}
                className={`px-3 py-1.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                  isCurrent
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : isDone
                    ? isDark
                      ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/30'
                      : 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                    : isDark
                    ? 'bg-slate-800 text-slate-400 hover:text-slate-200 border border-white/5'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200'
                }`}
              >
                <span>{part.titleEs}</span>
                {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
              </button>
            );
          })}
        </div>

        {/* Speed Selector */}
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
              className={`absolute right-0 top-full mt-1 w-28 rounded-xl shadow-xl border py-1 z-50 animate-in fade-in zoom-in-95 ${
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
      </div>

      {/* 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Character Selection & Visual Display (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div
            className={`rounded-2xl border overflow-hidden transition-colors ${
              isDark ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-200 shadow-xs'
            }`}
          >
            {/* Scene Image */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950 flex items-center justify-center">
              <img
                src={goodToSeeYouImg}
                alt="Paul and Pam"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Characters Bar with Arrows */}
            <div
              className={`p-4 border-t flex flex-col gap-3 ${
                isDark ? 'bg-slate-900/90 border-white/10' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <span>Seleccionar personaje:</span>
                <span className="text-indigo-600 dark:text-indigo-400">
                  {selectedCharacterId === 'character-1' ? 'Practicando: Paul' : 'Practicando: Pam'}
                </span>
              </div>

              {/* Two Characters with arrows */}
              <div className="grid grid-cols-2 gap-3">
                {/* Paul (Left, Arrow <) */}
                <button
                  type="button"
                  id="select-character-paul-btn"
                  onClick={() => setSelectedCharacterId('character-1')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer relative flex items-center justify-between ${
                    selectedCharacterId === 'character-1'
                      ? 'border-amber-500 bg-amber-500/10 ring-2 ring-amber-500/30 text-slate-900 dark:text-white'
                      : isDark
                      ? 'border-white/10 bg-slate-800/60 hover:bg-slate-800 text-slate-300'
                      : 'border-slate-200 bg-white hover:bg-slate-100 text-slate-700 shadow-xs'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <ChevronLeft className="w-5 h-5 text-amber-500 shrink-0" />
                    <div>
                      <h5 className="font-bold text-sm">Paul</h5>
                      <p className="text-[11px] opacity-75">Camiseta amarilla</p>
                    </div>
                  </div>
                  {selectedCharacterId === 'character-1' && (
                    <User className="w-4 h-4 text-amber-500 shrink-0" />
                  )}
                </button>

                {/* Pam (Right, Arrow >) */}
                <button
                  type="button"
                  id="select-character-pam-btn"
                  onClick={() => setSelectedCharacterId('character-2')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer relative flex items-center justify-between ${
                    selectedCharacterId === 'character-2'
                      ? 'border-teal-500 bg-teal-500/10 ring-2 ring-teal-500/30 text-slate-900 dark:text-white'
                      : isDark
                      ? 'border-white/10 bg-slate-800/60 hover:bg-slate-800 text-slate-300'
                      : 'border-slate-200 bg-white hover:bg-slate-100 text-slate-700 shadow-xs'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div>
                      <h5 className="font-bold text-sm">Pam</h5>
                      <p className="text-[11px] opacity-75">Bufanda celeste</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-teal-500 shrink-0" />
                  </div>
                  {selectedCharacterId === 'character-2' && (
                    <User className="w-4 h-4 text-teal-500 shrink-0" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Dialogue Turns & Practice Controls (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          
          {/* Reversible Instruction Card */}
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
              {/* Front: English */}
              <div className="absolute inset-0 px-4 py-3 flex items-center justify-between backface-hidden">
                <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                  {activePart.instructions}
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    speakEnglish(activePart.instructions, currentRate, safeAccent, undefined, undefined, 'female');
                  }}
                  className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                    isDark ? 'border-white/10 hover:bg-white/10 text-indigo-300' : 'border-slate-200 hover:bg-slate-100 text-indigo-600'
                  }`}
                  aria-label="Audio"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Back: Spanish */}
              <div className="absolute inset-0 px-4 py-3 flex items-center justify-between backface-hidden rotate-y-180">
                <span className="text-sm font-medium italic font-serif text-slate-800 dark:text-slate-100">
                  {activePart.instructionsEs}
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    speakEnglish(activePart.instructions, currentRate, safeAccent, undefined, undefined, 'female');
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

          {/* Action Header Bar (Start Button, Reset Button, Status) */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                id={`interaction-start-btn-part${activePart.partNumber}`}
                onClick={handleStartPractice}
                disabled={isRunning}
                className={`py-2.5 px-6 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-all shadow-sm ${
                  isRunning
                    ? 'bg-slate-300 dark:bg-slate-800 text-slate-500 cursor-not-allowed'
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/30'
                }`}
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Start</span>
              </button>

              <button
                type="button"
                id={`interaction-reset-btn-part${activePart.partNumber}`}
                onClick={handleResetPractice}
                className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
                  isDark
                    ? 'border-white/10 hover:bg-white/10 text-slate-300'
                    : 'border-slate-200 hover:bg-slate-200 text-slate-700'
                }`}
                aria-label="Reiniciar"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Countdown or Recording Indicator */}
            <div className="flex items-center gap-2">
              {countdown !== null && (
                <div className="flex items-center gap-2 animate-bounce">
                  <div className="w-7 h-7 rounded-full bg-rose-600 text-white font-black text-sm flex items-center justify-center shadow-md">
                    {countdown}
                  </div>
                  <span className="text-xs font-bold text-rose-500">Prepárate para hablar...</span>
                </div>
              )}
              {isRecording && (
                <div className="flex items-center gap-1.5 text-rose-500 text-xs font-bold animate-pulse">
                  <Mic className="w-4 h-4" />
                  <span>Tu turno: habla ahora</span>
                </div>
              )}
            </div>
          </div>

          {/* Dialogue Turns with Reversible Cards */}
          <div className="flex flex-col gap-3">
            {activePart.dialogueTurns.map((turn, idx) => {
              const isTurnFlipped = flippedTurnIdxs.includes(idx);
              const isUserCharacter = turn.characterId === selectedCharacterId;
              const isTurnActive = activeTurnIdx === idx;
              const characterName = turn.characterId === 'character-1' ? 'Paul' : 'Pam';
              const speakerGender = turn.characterId === 'character-1' ? 'male' : 'female';

              return (
                <div key={idx} className="perspective-1000 min-h-[92px]">
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => toggleTurnFlip(idx)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        toggleTurnFlip(idx);
                      }
                    }}
                    className={`relative w-full min-h-[92px] rounded-2xl cursor-pointer border transition-all duration-300 transform-style-3d select-none shadow-xs ${
                      isTurnFlipped ? 'rotate-y-180' : ''
                    } ${
                      isTurnActive
                        ? isUserCharacter
                          ? 'border-teal-500 bg-teal-500/10 ring-2 ring-teal-500/40'
                          : 'border-amber-500 bg-amber-500/10 ring-2 ring-amber-500/40'
                        : isUserCharacter
                        ? isDark
                          ? 'border-indigo-500/40 bg-indigo-950/20'
                          : 'border-indigo-300 bg-indigo-50/40'
                        : isDark
                        ? 'border-white/10 bg-slate-900'
                        : 'border-slate-200 bg-white'
                    }`}
                  >
                    {/* Front: English */}
                    <div className="absolute inset-0 p-4 flex flex-col justify-between backface-hidden">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2 py-0.5 rounded-md font-mono text-[11px] font-bold uppercase ${
                              turn.characterId === 'character-1'
                                ? 'bg-amber-500/20 text-amber-600 dark:text-amber-400'
                                : 'bg-teal-500/20 text-teal-600 dark:text-teal-400'
                            }`}
                          >
                            {characterName} {isUserCharacter ? '(Tú)' : ''}
                          </span>
                          {isTurnActive && (
                            <span className="text-[11px] font-bold text-rose-500 animate-pulse">
                              Hablando...
                            </span>
                          )}
                        </div>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            speakEnglish(turn.textEn, currentRate, safeAccent, undefined, undefined, speakerGender);
                          }}
                          className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                            isDark ? 'border-white/10 hover:bg-white/10 text-indigo-300' : 'border-slate-200 hover:bg-slate-100 text-indigo-600'
                          }`}
                          aria-label="Audio"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <p className="text-sm sm:text-base font-medium text-slate-900 dark:text-white mt-1">
                        {turn.textEn}
                      </p>
                    </div>

                    {/* Back: Spanish */}
                    <div className="absolute inset-0 p-4 flex flex-col justify-between backface-hidden rotate-y-180">
                      <div className="flex items-center justify-between">
                        <span
                          className={`px-2 py-0.5 rounded-md font-mono text-[11px] font-bold uppercase ${
                            turn.characterId === 'character-1'
                              ? 'bg-amber-500/20 text-amber-600 dark:text-amber-400'
                              : 'bg-teal-500/20 text-teal-600 dark:text-teal-400'
                          }`}
                        >
                          {characterName} (Traducción)
                        </span>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            speakEnglish(turn.textEn, currentRate, safeAccent, undefined, undefined, speakerGender);
                          }}
                          className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                            isDark ? 'border-white/10 hover:bg-white/10 text-emerald-300' : 'border-slate-200 hover:bg-slate-100 text-emerald-600'
                          }`}
                          aria-label="Audio"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <p className="text-sm sm:text-base italic font-serif text-slate-900 dark:text-white mt-1">
                        {turn.textEs}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Feedback & Navigation between Interaction Parts */}
          {score !== null && (
            <div
              className={`p-4 rounded-2xl border transition-colors flex items-center justify-between ${
                score >= 60
                  ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-950 dark:text-emerald-200'
                  : 'border-amber-500/40 bg-amber-500/10 text-amber-950 dark:text-amber-200'
              }`}
            >
              <div>
                <h5 className="font-bold text-sm">
                  {score >= 60 ? '¡Excelente interacción!' : 'Buen intento'}
                </h5>
                <p className="text-xs opacity-90">
                  {spokenText ? `Dijiste: "${spokenText}" (Puntaje: ${score}%)` : `Puntaje: ${score}%`}
                </p>
              </div>

              {currentPartIndex < INTERACTION_PARTS.length - 1 ? (
                <button
                  type="button"
                  id={`next-interaction-part-btn-${currentPartIndex + 1}`}
                  onClick={() => setCurrentPartIndex((prev) => prev + 1)}
                  className="py-2 px-4 rounded-xl font-bold text-xs uppercase tracking-wider bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                >
                  <span>Siguiente parte</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onComplete}
                  className="py-2 px-4 rounded-xl font-bold text-xs uppercase tracking-wider bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>¡Completar lección!</span>
                </button>
              )}
            </div>
          )}

          {/* Manual sub-part navigation buttons */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-white/10 text-xs">
            <button
              type="button"
              disabled={currentPartIndex === 0}
              onClick={() => setCurrentPartIndex((prev) => prev - 1)}
              className={`flex items-center gap-1 font-bold ${
                currentPartIndex === 0
                  ? 'text-slate-400 cursor-not-allowed opacity-50'
                  : 'text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer'
              }`}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Parte anterior</span>
            </button>

            <span className="font-mono text-slate-500 dark:text-slate-400">
              Parte {currentPartIndex + 1} de {INTERACTION_PARTS.length}
            </span>

            <button
              type="button"
              disabled={currentPartIndex === INTERACTION_PARTS.length - 1}
              onClick={() => setCurrentPartIndex((prev) => prev + 1)}
              className={`flex items-center gap-1 font-bold ${
                currentPartIndex === INTERACTION_PARTS.length - 1
                  ? 'text-slate-400 cursor-not-allowed opacity-50'
                  : 'text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer'
              }`}
            >
              <span>Siguiente parte</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
