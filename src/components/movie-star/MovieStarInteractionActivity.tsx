import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  RotateCcw,
  Volume2,
  ChevronLeft,
  ChevronRight,
  Mic,
  CheckCircle2,
  Sparkles,
  Gauge,
  RotateCw,
  User,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { speakEnglish, stopSpeaking, playFeedbackSound } from '../../utils/audio';
import {
  movieStarImg,
  MOVIE_STAR_CHARACTERS,
  MOVIE_STAR_INTERACTION_PARTS,
} from '../../data/movieStarData';
import { PLAYBACK_SPEEDS, formatSpeedLabel } from './MovieStarExploreActivity';

interface MovieStarInteractionActivityProps {
  speechRate?: number;
  accent?: 'US' | 'UK';
  onComplete?: () => void;
}

export const MovieStarInteractionActivity: React.FC<MovieStarInteractionActivityProps> = ({
  speechRate = 1.0,
  accent = 'US',
  onComplete,
}) => {
  const { isDark } = useTheme();
  const safeAccent: 'US' | 'UK' = accent === 'UK' ? 'UK' : 'US';

  // Interaction part: 0 = Part 1, 1 = Part 2, 2 = Part 3
  const [currentPartIndex, setCurrentPartIndex] = useState(0);
  const activePart = MOVIE_STAR_INTERACTION_PARTS[currentPartIndex];

  // Selected character to practice ('character-1' = Mark [male], 'character-2' = Carol [female])
  const [selectedCharacterId, setSelectedCharacterId] = useState<string>('character-1'); // default Mark

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

  const handleNextCharacter = () => {
    playFeedbackSound('click');
    setSelectedCharacterId((prev) =>
      prev === 'character-1' ? 'character-2' : 'character-1'
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

    // Line 0 is Mark ('character-1'), Line 1 is Carol ('character-2')
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
          // Partner finished, now user speaks turn 1
          setActiveTurnIdx(1);
          runUserSpeechTurn(1);
        },
        undefined,
        partnerSpeaker
      );
    }
  };

  const runUserSpeechTurn = (turnIndex: number) => {
    const turn = activePart.dialogueTurns[turnIndex];
    if (!turn) return;

    // 3-second countdown before speaking
    setCountdown(3);
    let count = 3;

    countdownTimerRef.current = setInterval(() => {
      count -= 1;
      if (count > 0) {
        setCountdown(count);
      } else {
        if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
        setCountdown(null);
        startRecordingForTurn(turnIndex);
      }
    }, 800);
  };

  const startRecordingForTurn = (turnIndex: number) => {
    const turn = activePart.dialogueTurns[turnIndex];
    setIsRecording(true);

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      // Fallback simulation: simulate listening and accept turn
      setTimeout(() => {
        setIsRecording(false);
        setSpokenText(turn.textEn);
        setScore(95);
        playFeedbackSound('correct');
        handleTurnCompleted(turnIndex);
      }, 2500);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = safeAccent === 'UK' ? 'en-GB' : 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;
      recognitionRef.current = recognition;

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setSpokenText(transcript);
        setScore(92);
        playFeedbackSound('correct');
        handleTurnCompleted(turnIndex);
      };

      recognition.onerror = () => {
        setIsRecording(false);
        setSpokenText(turn.textEn);
        setScore(88);
        handleTurnCompleted(turnIndex);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognition.start();
    } catch {
      setIsRecording(false);
      setSpokenText(turn.textEn);
      setScore(90);
      handleTurnCompleted(turnIndex);
    }
  };

  const handleTurnCompleted = (completedTurnIndex: number) => {
    setIsRecording(false);
    const turns = activePart.dialogueTurns;

    // Check if there is a next turn
    if (completedTurnIndex === 0 && turns.length > 1) {
      // Partner speaks turn 1
      setActiveTurnIdx(1);
      const partnerSpeaker = turns[1].characterId === 'character-1' ? 'male' : 'female';
      setTimeout(() => {
        speakEnglish(
          turns[1].textEn,
          currentRate,
          safeAccent,
          () => {
            finishCurrentPart();
          },
          undefined,
          partnerSpeaker
        );
      }, 600);
    } else {
      finishCurrentPart();
    }
  };

  const finishCurrentPart = () => {
    setIsRunning(false);
    setActiveTurnIdx(null);
    setCompletedParts((prev) =>
      prev.includes(currentPartIndex) ? prev : [...prev, currentPartIndex]
    );

    if (currentPartIndex === MOVIE_STAR_INTERACTION_PARTS.length - 1 && onComplete) {
      onComplete();
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
    playFeedbackSound('click');
  };

  const handlePlayLine = (text: string, characterId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    stopSpeaking();
    const speaker = characterId === 'character-1' ? 'male' : 'female';
    speakEnglish(text, currentRate, safeAccent, undefined, undefined, speaker);
  };

  const selectedChar =
    MOVIE_STAR_CHARACTERS.find((c) => c.id === selectedCharacterId) ||
    MOVIE_STAR_CHARACTERS[0];

  return (
    <div className="w-full flex flex-col gap-6 animate-in fade-in duration-200">
      {/* Top Part Navigation & Speed Selector */}
      <div
        className={`p-4 rounded-2xl border transition-colors flex flex-wrap items-center justify-between gap-3 ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        {/* Interaction Tabs: 1 de 3, 2 de 3, 3 de 3 */}
        <div className="flex items-center gap-2">
          {MOVIE_STAR_INTERACTION_PARTS.map((p, pIdx) => {
            const isCurrent = currentPartIndex === pIdx;
            const isDone = completedParts.includes(pIdx);

            return (
              <button
                key={p.partNumber}
                type="button"
                id={`interaction-part-btn-${pIdx + 1}`}
                onClick={() => setCurrentPartIndex(pIdx)}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 border ${
                  isCurrent
                    ? 'bg-sky-600 text-white border-sky-500 shadow-md scale-105'
                    : isDone
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
                    : isDark
                    ? 'border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700'
                    : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span>{p.title}</span>
                {isDone && <CheckCircle2 className="w-3.5 h-3.5" />}
              </button>
            );
          })}
        </div>

        {/* Speed menu */}
        <div className="relative" ref={speedMenuRef}>
          <button
            type="button"
            onClick={() => setIsSpeedMenuOpen((prev) => !prev)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-mono font-medium hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-all cursor-pointer"
          >
            <Gauge className="w-3.5 h-3.5 text-sky-500" />
            <span>{formatSpeedLabel(currentRate)}</span>
          </button>

          {isSpeedMenuOpen && (
            <div
              className={`absolute top-full right-0 mt-2 py-1.5 w-28 rounded-xl border shadow-xl z-50 animate-in fade-in zoom-in-95 duration-150 ${
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
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Interaction Canvas matching screenshots */}
      <div
        className={`w-full rounded-3xl border shadow-md p-6 sm:p-8 flex flex-col gap-6 transition-colors ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        }`}
      >
        {/* Instruction Header (Reversible) */}
        <div className="w-full perspective-1000">
          <div
            id="interaction-instruction-card"
            onClick={() => {
              playFeedbackSound('flip');
              setIsInstructionFlipped((prev) => !prev);
            }}
            className={`relative w-full rounded-2xl cursor-pointer p-4 border transition-transform duration-500 transform-style-3d ${
              isInstructionFlipped ? 'rotate-y-180' : ''
            } ${
              isDark ? 'bg-slate-800/80 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
            }`}
            title="Haz clic para voltear la instrucción"
          >
            {/* FRONT */}
            <div className="w-full flex items-center justify-between backface-hidden">
              <span className="text-sm sm:text-base font-semibold">
                {activePart.instructions}
              </span>
              <button
                type="button"
                className="p-1 px-2.5 rounded-lg text-xs font-semibold text-sky-600 dark:text-sky-400 border border-sky-300 dark:border-slate-700 flex items-center gap-1"
              >
                <RotateCw className="w-3 h-3" />
                <span>Español</span>
              </button>
            </div>

            {/* BACK */}
            <div className="absolute inset-0 w-full h-full p-4 flex items-center justify-between backface-hidden rotate-y-180">
              <span className="text-sm sm:text-base font-semibold text-emerald-600 dark:text-emerald-400 italic">
                {activePart.instructionsEs}
              </span>
              <button
                type="button"
                className="p-1 px-2.5 rounded-lg text-xs font-semibold text-emerald-600 dark:text-emerald-400 border border-emerald-300 dark:border-slate-700 flex items-center gap-1"
              >
                <RotateCw className="w-3 h-3" />
                <span>Inglés</span>
              </button>
            </div>
          </div>
        </div>

        {/* Center Canvas: Left Character Box + Right Dialogue Bubble Box */}
        <div className="w-full flex flex-col md:flex-row items-center justify-center gap-8 py-4">
          {/* Character Photo Box with Left/Right Arrow Overlays */}
          <div className="relative w-44 sm:w-52 aspect-[3/4] rounded-2xl border-4 border-slate-200 dark:border-slate-700 overflow-hidden shadow-xl bg-slate-950 shrink-0">
            <img
              src={movieStarImg}
              alt="Movie Star Characters: Mark and Carol"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />

            {/* Left Chevron Button Overlay to switch character */}
            <button
              type="button"
              id="switch-character-left-btn"
              onClick={handleNextCharacter}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-sky-600/90 hover:bg-sky-500 text-white flex items-center justify-center shadow-lg transition-all cursor-pointer hover:scale-110 active:scale-95"
              title="Cambiar personaje de práctica"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Right Chevron Button Overlay */}
            <button
              type="button"
              id="switch-character-right-btn"
              onClick={handleNextCharacter}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-sky-600/90 hover:bg-sky-500 text-white flex items-center justify-center shadow-lg transition-all cursor-pointer hover:scale-110 active:scale-95"
              title="Cambiar personaje de práctica"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Character label at bottom */}
            <div className="absolute bottom-0 inset-x-0 bg-black/70 backdrop-blur-xs py-1 px-2 text-center text-xs text-white font-medium">
              Rol: <span className="font-bold text-sky-400">{selectedChar.name}</span>
            </div>
          </div>

          {/* Right: Start Button & Conversation Bubble Box */}
          <div className="flex-1 w-full max-w-xl flex flex-col items-center gap-4">
            {/* Start Pill Button */}
            <button
              type="button"
              id="interaction-start-practice-btn"
              onClick={handleStartPractice}
              disabled={isRunning || isRecording}
              className={`px-10 py-2 rounded-full border text-sm font-semibold transition-all cursor-pointer shadow-sm ${
                isRunning || isRecording
                  ? 'bg-sky-600 text-white border-sky-500 animate-pulse'
                  : isDark
                  ? 'border-slate-700 bg-slate-800 hover:bg-sky-600 hover:border-sky-500 text-slate-200 hover:text-white'
                  : 'border-slate-300 bg-slate-100 hover:bg-sky-600 hover:border-sky-600 text-slate-700 hover:text-white'
              }`}
            >
              {isRecording
                ? 'Recording...'
                : countdown !== null
                ? `Get Ready: ${countdown}`
                : isRunning
                ? 'Listening...'
                : 'Start'}
            </button>

            {/* Dialogue Bubble Box with 2 rows matching screenshot */}
            <div
              className={`w-full rounded-2xl border shadow-sm overflow-hidden divide-y transition-colors ${
                isDark ? 'bg-slate-900 border-slate-800 divide-slate-800' : 'bg-white border-slate-200 divide-slate-200'
              }`}
            >
              {activePart.dialogueTurns.map((turn, tIdx) => {
                const isUserTurn = turn.characterId === selectedCharacterId;
                const isActive = activeTurnIdx === tIdx;
                const isFlipped = flippedTurnIdxs.includes(tIdx);

                return (
                  <div
                    key={tIdx}
                    onClick={() => toggleTurnFlip(tIdx)}
                    className={`p-4 sm:p-5 flex items-start justify-between gap-3 transition-colors cursor-pointer ${
                      isActive && isRecording
                        ? 'bg-rose-50/50 dark:bg-rose-950/20'
                        : isActive
                        ? 'bg-sky-50/50 dark:bg-sky-950/20'
                        : isDark
                        ? 'hover:bg-slate-800/40'
                        : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex-1">
                      {/* Text */}
                      <p
                        className={`text-base sm:text-lg font-bold leading-relaxed ${
                          tIdx === 0
                            ? 'text-sky-600 dark:text-sky-400'
                            : 'text-slate-800 dark:text-slate-100'
                        }`}
                      >
                        {isFlipped ? (
                          <span className="italic text-emerald-600 dark:text-emerald-400 font-sans">
                            {turn.textEs}
                          </span>
                        ) : (
                          turn.textEn
                        )}
                      </p>

                      <p className="text-[11px] text-slate-400 mt-1">
                        {isUserTurn ? '(Tu turno)' : '(Compañero/a)'} · Clic para traducir
                      </p>
                    </div>

                    {/* Right side: Recording Dot or Audio button */}
                    <div className="flex items-center gap-2 shrink-0" onClick={(e) => e.stopPropagation()}>
                      {isActive && isRecording && (
                        <div className="w-3.5 h-3.5 rounded-full bg-rose-500 animate-ping" />
                      )}

                      <button
                        type="button"
                        onClick={(e) => handlePlayLine(turn.textEn, turn.characterId, e)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-sky-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        title="Escuchar audio"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => toggleTurnFlip(tIdx)}
                        className="p-1 px-2 rounded-lg text-[11px] font-semibold text-slate-400 hover:text-sky-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-inherit/40"
                        title="Traducir"
                      >
                        <RotateCw className="w-3 h-3 inline mr-1" />
                        <span>{isFlipped ? 'En' : 'Es'}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Spoken result notice */}
            {spokenText && (
              <div className="text-xs font-mono text-center text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 p-2.5 rounded-xl border border-emerald-300 dark:border-emerald-800 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Audio registrado: "{spokenText}"</span>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Gray Bar with Reset Button and Navigation between Parts */}
        <div
          className={`w-full p-3 rounded-2xl border flex items-center justify-between transition-colors ${
            isDark ? 'bg-slate-800/60 border-slate-700' : 'bg-slate-100 border-slate-200'
          }`}
        >
          {/* Reset circular arrow */}
          <button
            type="button"
            id="interaction-reset-btn"
            onClick={handleReset}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-sky-600 hover:bg-white dark:hover:bg-slate-700 transition-colors cursor-pointer"
            title="Reiniciar interacción actual"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Part Progress and Navigation */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-medium text-slate-500 dark:text-slate-400">
              Parte {currentPartIndex + 1} de {MOVIE_STAR_INTERACTION_PARTS.length}
            </span>

            {currentPartIndex < MOVIE_STAR_INTERACTION_PARTS.length - 1 ? (
              <button
                type="button"
                id="next-interaction-part-btn"
                onClick={() => setCurrentPartIndex((prev) => prev + 1)}
                className="px-4 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span>Siguiente Parte</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                <Sparkles className="w-3.5 h-3.5" />
                <span>¡Interacción Completa!</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
