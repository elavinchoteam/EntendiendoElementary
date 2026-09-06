import React, { useState, useEffect, useRef } from 'react';
import {
  Volume2,
  RotateCcw,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Mic,
  MicOff,
  CheckCircle,
  Play,
  Pause,
  Award,
  HelpCircle,
  User,
  Users,
} from 'lucide-react';
import { RoleplayPracticeExercise as RoleplayPracticeExerciseType, RoleplayCharacter } from '../types';
import { useTheme } from '../context/ThemeContext';
import { speakEnglish, playFeedbackSound } from '../utils/audio';
import dressFromParisImg from '../assets/images/dress_from_paris_1788711801436.jpg';

interface RoleplayPracticeExerciseProps {
  exercise: RoleplayPracticeExerciseType;
  accent?: 'US' | 'UK';
  speechRate?: number;
  onSuccess?: () => void;
}

export const RoleplayPracticeExercise: React.FC<RoleplayPracticeExerciseProps> = ({
  exercise,
  accent = 'US',
  speechRate = 1.0,
  onSuccess,
}) => {
  const { isDark } = useTheme();
  const safeAccent: 'US' | 'UK' = accent === 'UK' ? 'UK' : 'US';

  // State: Chosen character (default Character 1 / left)
  const [selectedCharacterId, setSelectedCharacterId] = useState<string>('character-1');
  const [isInstructionFlipped, setIsInstructionFlipped] = useState(false);

  // Practice state
  const [isPracticing, setIsPracticing] = useState(false);
  const [currentTurnIdx, setCurrentTurnIdx] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isListeningUser, setIsListeningUser] = useState(false);
  const [isSpeakingPartner, setIsSpeakingPartner] = useState(false);
  const [spokenLine, setSpokenLine] = useState<string>('');

  const recognitionRef = useRef<any>(null);
  const partnerSpeechTimerRef = useRef<NodeJS.Timeout | null>(null);

  const character1: RoleplayCharacter = exercise.characters[0] || {
    id: 'character-1',
    name: 'Speaker 1',
    nameEs: 'Hablante 1 (Vestido azul)',
    role: 'Friend giving compliment',
    roleEs: 'Amiga que elogia el vestido',
    avatarSide: 'left',
    voicePitch: 1.05,
    voiceGender: 'female',
  };

  const character2: RoleplayCharacter = exercise.characters[1] || {
    id: 'character-2',
    name: 'Speaker 2',
    nameEs: 'Hablante 2 (Vestido de París)',
    role: 'Owner of the Paris dress',
    roleEs: 'Dueña del vestido de París',
    avatarSide: 'right',
    voicePitch: 0.95,
    voiceGender: 'female',
  };

  const activeUserCharacter =
    selectedCharacterId === character1.id ? character1 : character2;
  const partnerCharacter =
    selectedCharacterId === character1.id ? character2 : character1;

  const turns = exercise.dialogueTurns || [
    { characterId: 'character-1', textEn: 'What a lovely dress.', textEs: '¡Qué vestido tan lindo!' },
    { characterId: 'character-2', textEn: 'Really? Do you like it?', textEs: '¿En serio? ¿Te gusta?' },
    { characterId: 'character-1', textEn: "Of course. It's beautiful. Is it new?", textEs: 'Por supuesto. Es hermoso. ¿Es nuevo?' },
    { characterId: 'character-2', textEn: 'Yes. I bought it in Paris last week.', textEs: 'Sí. Lo compré en París la semana pasada.' },
    { characterId: 'character-1', textEn: "Well, it's really nice.", textEs: 'Bueno, es muy bonito.' },
    { characterId: 'character-2', textEn: 'Thank you.', textEs: 'Gracias.' },
  ];

  const currentTurn = turns[currentTurnIdx];
  const isUserTurn = currentTurn && currentTurn.characterId === selectedCharacterId;

  // Cleanup on unmount or exercise switch
  useEffect(() => {
    handleResetPractice();
    return () => {
      if (partnerSpeechTimerRef.current) clearTimeout(partnerSpeechTimerRef.current);
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          // ignore
        }
      }
    };
  }, [exercise.id]);

  // Handle partner turn playback
  useEffect(() => {
    if (!isPracticing || isCompleted) return;

    if (!isUserTurn && currentTurn) {
      setIsSpeakingPartner(true);
      setIsListeningUser(false);

      // Play partner's line with voice synthesis
      speakEnglish(
        currentTurn.textEn,
        speechRate,
        safeAccent,
        () => {
          setIsSpeakingPartner(true);
        },
        () => {
          setIsSpeakingPartner(false);
          // Wait briefly then advance to user's turn
          partnerSpeechTimerRef.current = setTimeout(() => {
            advanceNextTurn();
          }, 600);
        },
        'female'
      );
    } else if (isUserTurn && currentTurn) {
      setIsSpeakingPartner(false);
      // Auto-start speech recognition if supported
      startListeningUser();
    }
  }, [isPracticing, currentTurnIdx, isUserTurn, isCompleted]);

  // Start speech recognition for user's turn
  const startListeningUser = () => {
    if (typeof window === 'undefined') return;
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) return;

    try {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          // ignore
        }
      }

      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;
      recognition.lang = safeAccent === 'UK' ? 'en-GB' : 'en-US';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListeningUser(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setSpokenLine(transcript);
        playFeedbackSound('click');
      };

      recognition.onerror = () => {
        setIsListeningUser(false);
      };

      recognition.onend = () => {
        setIsListeningUser(false);
      };

      recognition.start();
    } catch (err) {
      console.warn('Speech recognition could not start:', err);
      setIsListeningUser(false);
    }
  };

  // Advance to next turn
  const advanceNextTurn = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        // ignore
      }
    }
    setIsListeningUser(false);
    setSpokenLine('');

    if (currentTurnIdx + 1 >= turns.length) {
      setIsCompleted(true);
      setIsPracticing(false);
      playFeedbackSound('complete');
      if (onSuccess) onSuccess();
    } else {
      setCurrentTurnIdx((prev) => prev + 1);
    }
  };

  // Start / Restart practice
  const handleStartPractice = () => {
    playFeedbackSound('click');
    window.speechSynthesis?.cancel();
    setIsPracticing(true);
    setCurrentTurnIdx(0);
    setIsCompleted(false);
    setSpokenLine('');
  };

  // Reset practice
  const handleResetPractice = () => {
    playFeedbackSound('click');
    window.speechSynthesis?.cancel();
    if (partnerSpeechTimerRef.current) clearTimeout(partnerSpeechTimerRef.current);
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        // ignore
      }
    }
    setIsPracticing(false);
    setCurrentTurnIdx(0);
    setIsCompleted(false);
    setIsListeningUser(false);
    setIsSpeakingPartner(false);
    setSpokenLine('');
  };

  // Select character
  const handleSelectCharacter = (charId: string) => {
    if (charId === selectedCharacterId) return;
    playFeedbackSound('click');
    setSelectedCharacterId(charId);
    handleResetPractice();
  };

  // Listen to current line
  const handleListenLine = (text: string) => {
    playFeedbackSound('click');
    window.speechSynthesis?.cancel();
    speakEnglish(text, speechRate, safeAccent, undefined, undefined, 'female');
  };

  return (
    <div
      id={`roleplay-practice-${exercise.id}`}
      className="w-full max-w-6xl mx-auto flex flex-col gap-6"
    >
      {/* Top Banner: Reversible Instruction Card matching exact screenshot */}
      <div className="flex items-center justify-between gap-3">
        <div className="perspective-1000 flex-1">
          <div
            id={`roleplay-instruction-${exercise.id}`}
            onClick={() => {
              playFeedbackSound('flip');
              setIsInstructionFlipped((prev) => !prev);
            }}
            className={`relative w-full min-h-[56px] rounded-2xl border transition-transform duration-500 transform-style-3d cursor-pointer select-none shadow-xs ${
              isInstructionFlipped ? 'rotate-y-180' : ''
            } ${
              isDark
                ? 'bg-gradient-to-r from-cyan-950/40 via-[#151C33] to-sky-950/20 border-cyan-500/20 hover:border-cyan-500/40'
                : 'bg-gradient-to-r from-cyan-50 via-white to-sky-50/50 border-cyan-200 hover:border-cyan-300'
            }`}
            title="Haz clic para traducir la instrucción"
          >
            {/* Front: English Instruction */}
            <div className="px-4 py-3 flex items-center gap-3 backface-hidden">
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                  isDark ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'bg-cyan-100 text-cyan-700'
                }`}
              >
                <Users className="w-4 h-4" />
              </div>
              <h4 className={`text-sm sm:text-base font-semibold leading-snug ${isDark ? 'text-slate-100' : 'text-slate-800'}`}>
                {exercise.instructions || 'Click on the arrow next to the character you would like to practice.'}
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
                {exercise.instructionsEs || 'Haz clic en la flecha junto al personaje que deseas practicar.'}
              </p>
            </div>
          </div>
        </div>

        {/* Audio button for instruction */}
        <button
          type="button"
          onClick={() => {
            speakEnglish(
              exercise.instructions || 'Click on the arrow next to the character you would like to practice.',
              speechRate,
              safeAccent,
              undefined,
              undefined,
              'female'
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

      {/* Main Grid: Left Column (Character Selector Image + Arrows) & Right Column (Dialogue Roleplay Stage) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Picture of the 2 Women with Cyan Arrows next to each character (6 Cols) */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          <div
            id={`character-selector-container-${exercise.id}`}
            className={`relative rounded-3xl border overflow-hidden shadow-lg p-2 transition-all ${
              isDark ? 'bg-[#151C33] border-white/10' : 'bg-white border-slate-200'
            }`}
          >
            {/* Image Container */}
            <div className="relative aspect-[16/11] rounded-2xl overflow-hidden bg-slate-900 flex items-center justify-center">
              <img
                src={exercise.imageUrl || dressFromParisImg}
                alt="Two characters practicing dialogue"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top"
              />

              {/* Left Character Arrow Button: Pointing '<' next to Character 1 (Asian woman in blue dress) */}
              <div className="absolute top-1/2 -translate-y-1/2 left-3 sm:left-5 flex flex-col items-center gap-1 z-20">
                <button
                  type="button"
                  id="select-char-1-btn"
                  onClick={() => handleSelectCharacter('character-1')}
                  className={`w-11 h-11 sm:w-13 sm:h-13 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-xl active:scale-95 ${
                    selectedCharacterId === 'character-1'
                      ? 'bg-cyan-500 text-white ring-4 ring-cyan-300 ring-offset-2 ring-offset-slate-900 shadow-cyan-500/50 scale-110'
                      : 'bg-cyan-600/80 hover:bg-cyan-500 text-white/90 hover:scale-105'
                  }`}
                  title="Practicar como Personaje 1 (Vestido azul)"
                  aria-label="Seleccionar Personaje 1"
                >
                  <ChevronLeft className="w-7 h-7 stroke-[3]" />
                </button>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-black/60 backdrop-blur-xs text-white border border-white/20 uppercase tracking-wider">
                  Speaker 1
                </span>
              </div>

              {/* Right Character Arrow Button: Pointing '>' next to Character 2 (Woman in striped dress) */}
              <div className="absolute top-1/2 -translate-y-1/2 right-3 sm:right-5 flex flex-col items-center gap-1 z-20">
                <button
                  type="button"
                  id="select-char-2-btn"
                  onClick={() => handleSelectCharacter('character-2')}
                  className={`w-11 h-11 sm:w-13 sm:h-13 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-xl active:scale-95 ${
                    selectedCharacterId === 'character-2'
                      ? 'bg-cyan-500 text-white ring-4 ring-cyan-300 ring-offset-2 ring-offset-slate-900 shadow-cyan-500/50 scale-110'
                      : 'bg-cyan-600/80 hover:bg-cyan-500 text-white/90 hover:scale-105'
                  }`}
                  title="Practicar como Personaje 2 (Vestido de París)"
                  aria-label="Seleccionar Personaje 2"
                >
                  <ChevronRight className="w-7 h-7 stroke-[3]" />
                </button>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-black/60 backdrop-blur-xs text-white border border-white/20 uppercase tracking-wider">
                  Speaker 2
                </span>
              </div>

              {/* Status Badge in overlay */}
              <div className="absolute bottom-3 inset-x-3 flex items-center justify-center pointer-events-none">
                <div className="px-3.5 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/20 text-white text-xs font-semibold flex items-center gap-2 shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  <span>
                    Practicing: <strong className="text-cyan-300">{activeUserCharacter.name}</strong>
                  </span>
                </div>
              </div>
            </div>

            {/* Character selection indicator strip underneath */}
            <div className="pt-3 px-2 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-slate-700 dark:text-slate-200">Role:</span>
                <span>{activeUserCharacter.role}</span>
              </div>
              <span className="italic text-[11px]">Click arrows to switch role</span>
            </div>
          </div>
        </div>

        {/* Right Column: Practice Dialogue Stage + Start button + Interactive lines (6 Cols) */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          {/* Top Control Bar with Start Button */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                id="roleplay-start-btn"
                onClick={handleStartPractice}
                className={`px-7 py-2.5 rounded-full font-bold text-sm tracking-wide transition-all shadow-md active:scale-95 cursor-pointer flex items-center gap-2 ${
                  isPracticing
                    ? 'bg-slate-200 hover:bg-slate-300 text-slate-800 dark:bg-white/20 dark:text-white'
                    : 'bg-cyan-500 hover:bg-cyan-400 text-white shadow-cyan-500/30'
                }`}
              >
                {isPracticing ? (
                  <>
                    <RotateCcw className="w-4 h-4" />
                    <span>Restart</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-white" />
                    <span>Start</span>
                  </>
                )}
              </button>

              {isPracticing && (
                <span className="text-xs font-semibold text-cyan-500">
                  Turn {currentTurnIdx + 1} of {turns.length}
                </span>
              )}
            </div>

            {/* Reset Icon Button (bottom left/right matching screenshot ↻ icon) */}
            <button
              type="button"
              id="roleplay-reset-btn"
              onClick={handleResetPractice}
              className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                isDark
                  ? 'border-white/10 hover:bg-white/10 text-slate-300 hover:text-white'
                  : 'border-slate-200 hover:bg-slate-100 text-slate-600 hover:text-slate-900'
              }`}
              title="Reiniciar práctica"
              aria-label="Reiniciar práctica"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Dialogue Box (matching the screenshot) */}
          <div
            className={`rounded-3xl border p-5 min-h-[320px] flex flex-col justify-between shadow-xs transition-all ${
              isDark ? 'bg-[#151C33] border-white/10' : 'bg-white border-slate-200'
            }`}
          >
            {/* Conversation Flow */}
            {!isPracticing && !isCompleted ? (
              /* Idle / Preview State matching screenshot */
              <div className="space-y-4 my-auto">
                <div className="p-4 rounded-2xl bg-cyan-50/50 dark:bg-cyan-950/20 border border-cyan-200/50 dark:border-cyan-500/20">
                  <div className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 mb-1">
                    Preview lines:
                  </div>
                  <p className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100 mb-1.5">
                    "What a lovely dress."
                  </p>
                  <p className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100">
                    "Really? Do you like it?"
                  </p>
                </div>

                <div className="text-center text-xs text-slate-500 dark:text-slate-400 space-y-1">
                  <p>You will practice as: <strong className="text-cyan-500">{activeUserCharacter.name}</strong></p>
                  <p>Click <strong className="text-cyan-500">"Start"</strong> to begin speaking the conversation!</p>
                </div>
              </div>
            ) : isCompleted ? (
              /* Completion Congratulation View */
              <div className="my-auto text-center space-y-4 py-4 animate-fadeIn">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-500 border border-emerald-500/30 flex items-center justify-center mx-auto shadow-lg">
                  <Award className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    Roleplay Completed!
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                    You practiced all lines as <strong className="text-cyan-500">{activeUserCharacter.name}</strong>.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleStartPractice}
                    className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-white font-semibold text-sm shadow-sm cursor-pointer active:scale-95"
                  >
                    Practice Again
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      handleSelectCharacter(
                        selectedCharacterId === 'character-1' ? 'character-2' : 'character-1'
                      )
                    }
                    className="px-5 py-2.5 rounded-xl border border-cyan-500/30 hover:bg-cyan-500/10 text-cyan-600 dark:text-cyan-300 font-semibold text-sm cursor-pointer active:scale-95"
                  >
                    Switch to {partnerCharacter.name}
                  </button>
                </div>
              </div>
            ) : (
              /* Active Practice View */
              <div className="flex flex-col gap-4">
                {/* Previous turns history */}
                <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                  {turns.slice(0, currentTurnIdx).map((t, idx) => {
                    const isUser = t.characterId === selectedCharacterId;
                    return (
                      <div
                        key={idx}
                        className={`p-2.5 rounded-xl text-xs flex items-center justify-between ${
                          isUser
                            ? 'bg-cyan-500/10 border border-cyan-500/20 text-cyan-900 dark:text-cyan-200'
                            : 'bg-slate-100 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300'
                        }`}
                      >
                        <div>
                          <span className="font-bold text-[10px] uppercase block opacity-70">
                            {isUser ? 'You' : partnerCharacter.name}
                          </span>
                          <span className="text-sm font-medium">{t.textEn}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleListenLine(t.textEn)}
                          className="p-1 rounded-md hover:bg-white/20 text-slate-500 cursor-pointer"
                          title="Volver a escuchar"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* Current Active Turn Card */}
                {currentTurn && (
                  <div
                    className={`p-4 rounded-2xl border-2 transition-all shadow-md ${
                      isUserTurn
                        ? 'bg-gradient-to-br from-cyan-500/15 via-sky-500/10 to-transparent border-cyan-400 ring-2 ring-cyan-400/30'
                        : 'bg-slate-100 dark:bg-slate-800/80 border-slate-300 dark:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                            isUserTurn
                              ? 'bg-cyan-500 text-white shadow-xs'
                              : 'bg-slate-600 text-white'
                          }`}
                        >
                          {isUserTurn ? 'Your Turn' : partnerCharacter.name}
                        </span>
                        {isSpeakingPartner && (
                          <span className="text-[11px] font-medium text-sky-500 flex items-center gap-1 animate-pulse">
                            <Volume2 className="w-3 h-3" /> Speaking...
                          </span>
                        )}
                        {isListeningUser && (
                          <span className="text-[11px] font-medium text-emerald-500 flex items-center gap-1 animate-pulse">
                            <Mic className="w-3 h-3" /> Listening...
                          </span>
                        )}
                      </div>

                      {/* Listen to line pronunciation */}
                      <button
                        type="button"
                        onClick={() => handleListenLine(currentTurn.textEn)}
                        className="p-1.5 rounded-lg border border-slate-300 dark:border-white/10 hover:bg-white/20 text-slate-700 dark:text-slate-200 cursor-pointer"
                        title="Escuchar pronunciación"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Dialogue Line Text */}
                    <div className="py-2">
                      <p className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-snug">
                        "{currentTurn.textEn}"
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 italic mt-1">
                        {currentTurn.textEs}
                      </p>
                    </div>

                    {/* Recognized Speech Display */}
                    {spokenLine && (
                      <div className="mt-2 p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs">
                        Heard: "{spokenLine}"
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Bottom Actions for Active Turn */}
            {isPracticing && !isCompleted && isUserTurn && (
              <div className="pt-4 flex items-center gap-3">
                <button
                  type="button"
                  onClick={startListeningUser}
                  className={`flex-1 py-3 px-4 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer active:scale-98 ${
                    isListeningUser
                      ? 'bg-rose-500 text-white animate-pulse'
                      : 'bg-cyan-500 hover:bg-cyan-400 text-white shadow-cyan-500/20'
                  }`}
                >
                  <Mic className="w-4 h-4" />
                  <span>{isListeningUser ? 'Recording... Say the line' : 'Speak Line'}</span>
                </button>

                <button
                  type="button"
                  onClick={advanceNextTurn}
                  className="py-3 px-5 rounded-xl border border-cyan-500/30 hover:bg-cyan-500/10 text-cyan-600 dark:text-cyan-300 font-semibold text-sm transition-all cursor-pointer active:scale-98"
                >
                  Next Line →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
