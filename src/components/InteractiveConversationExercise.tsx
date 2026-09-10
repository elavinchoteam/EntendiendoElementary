import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  RotateCcw,
  Volume2,
  Mic,
  MicOff,
  CheckCircle2,
  Gauge,
  Sparkles,
  MessageSquare,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { InteractiveConversationExercise as InteractiveConversationExerciseType, ConversationTurnOption } from '../types';
import { speakEnglish, stopSpeaking, playFeedbackSound } from '../utils/audio';
import { useTheme } from '../context/ThemeContext';
import { PLAYBACK_SPEEDS, formatSpeedLabel } from './AudioPlayerCard';

interface InteractiveConversationExerciseProps {
  exercise: InteractiveConversationExerciseType;
  accent?: 'US' | 'UK';
  speechRate?: number;
  onSuccess?: () => void;
}

export const InteractiveConversationExercise: React.FC<InteractiveConversationExerciseProps> = ({
  exercise,
  accent = 'US',
  speechRate = 1.0,
  onSuccess,
}) => {
  const { isDark } = useTheme();
  const safeAccent: 'US' | 'UK' = accent === 'UK' ? 'UK' : 'US';

  // Interaction Flow States
  const [hasStarted, setHasStarted] = useState(false);
  const [currentPromptEn, setCurrentPromptEn] = useState(exercise.initialPromptEn);
  const [currentPromptEs, setCurrentPromptEs] = useState(exercise.initialPromptEs);
  const [isPromptFlipped, setIsPromptFlipped] = useState(false);

  // Current options pool displayed to user
  const [activeOptions, setActiveOptions] = useState<ConversationTurnOption[]>(exercise.options);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);

  // History of conversation turns
  const [history, setHistory] = useState<
    { speaker: 'partner' | 'user'; textEn: string; textEs: string }[]
  >([]);
  const [isFinished, setIsFinished] = useState(false);

  // Reversible instruction card state
  const [isInstructionFlipped, setIsInstructionFlipped] = useState(false);
  const [flippedOptionIds, setFlippedOptionIds] = useState<string[]>([]);

  // Audio / Speech State
  const [isSpeakingPartner, setIsSpeakingPartner] = useState(false);
  const [activeAudioTarget, setActiveAudioTarget] = useState<string | null>(null);

  // Speed controls
  const [instructionSpeed, setInstructionSpeed] = useState<number>(speechRate);
  const [isInstructionSpeedOpen, setIsInstructionSpeedOpen] = useState(false);

  // Mic recognition state
  const [isListeningMic, setIsListeningMic] = useState(false);
  const recognitionRef = useRef<any>(null);

  const speedMenuRef = useRef<HTMLDivElement>(null);

  // Reset when exercise changes
  useEffect(() => {
    handleReset();
  }, [exercise.id]);

  // Close speed menu on outside click
  useEffect(() => {
    const handleDocClick = (e: MouseEvent) => {
      if (speedMenuRef.current && !speedMenuRef.current.contains(e.target as Node)) {
        setIsInstructionSpeedOpen(false);
      }
    };
    document.addEventListener('mousedown', handleDocClick);
    return () => document.removeEventListener('mousedown', handleDocClick);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopSpeaking();
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []);

  const handleReset = () => {
    stopSpeaking();
    if (recognitionRef.current) {
      recognitionRef.current.abort();
    }
    setHasStarted(false);
    setCurrentPromptEn(exercise.initialPromptEn);
    setCurrentPromptEs(exercise.initialPromptEs);
    setIsPromptFlipped(false);
    setActiveOptions(exercise.options);
    setSelectedOptionId(null);
    setHistory([]);
    setIsFinished(false);
    setIsInstructionFlipped(false);
    setFlippedOptionIds([]);
    setIsSpeakingPartner(false);
    setActiveAudioTarget(null);
    setIsListeningMic(false);
    playFeedbackSound('click');
  };

  // Start conversation
  const handleStart = () => {
    setHasStarted(true);
    setIsSpeakingPartner(true);
    playFeedbackSound('click');

    speakEnglish(
      currentPromptEn,
      speechRate,
      safeAccent,
      () => setIsSpeakingPartner(true),
      () => setIsSpeakingPartner(false),
      'male'
    );
  };

  const handleSpeakText = (text: string, targetId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (activeAudioTarget === targetId) {
      stopSpeaking();
      setActiveAudioTarget(null);
      return;
    }

    stopSpeaking();
    setActiveAudioTarget(targetId);

    speakEnglish(
      text,
      instructionSpeed,
      safeAccent,
      () => setActiveAudioTarget(targetId),
      () => setActiveAudioTarget(null),
      'female'
    );
  };

  // User chooses an option
  const handleSelectOption = (opt: ConversationTurnOption) => {
    if (isSpeakingPartner) return;
    setSelectedOptionId(opt.id);
    playFeedbackSound('click');

    // 1. Speak user choice line
    speakEnglish(
      opt.textEn,
      speechRate,
      safeAccent,
      () => {},
      () => {
        // 2. Add to history
        setHistory((prev) => [
          ...prev,
          { speaker: 'user', textEn: opt.textEn, textEs: opt.textEs },
        ]);

        // 3. Partner answers back
        if (opt.partnerResponseEn) {
          setTimeout(() => {
            setCurrentPromptEn(opt.partnerResponseEn);
            setCurrentPromptEs(opt.partnerResponseEs);
            setIsPromptFlipped(false);
            setIsSpeakingPartner(true);

            speakEnglish(
              opt.partnerResponseEn,
              speechRate,
              safeAccent,
              () => setIsSpeakingPartner(true),
              () => {
                setIsSpeakingPartner(false);
                setHistory((prev) => [
                  ...prev,
                  { speaker: 'partner', textEn: opt.partnerResponseEn, textEs: opt.partnerResponseEs },
                ]);

                if (opt.nextOptions && opt.nextOptions.length > 0) {
                  setActiveOptions(opt.nextOptions);
                  setSelectedOptionId(null);
                } else {
                  // Conversation finished!
                  setIsFinished(true);
                  confetti({
                    particleCount: 50,
                    spread: 60,
                    origin: { y: 0.7 },
                  });
                  if (onSuccess) onSuccess();
                }
              },
              'male'
            );
          }, 400);
        }
      },
      'female'
    );
  };

  // Speech Recognition (Mic)
  const handleToggleMic = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Tu navegador no soporta reconocimiento de voz nativo.');
      return;
    }

    if (isListeningMic) {
      if (recognitionRef.current) recognitionRef.current.stop();
      setIsListeningMic(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 3;

      recognition.onstart = () => {
        setIsListeningMic(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        setIsListeningMic(false);

        // Find best match among activeOptions
        const matched = activeOptions.find((opt) => {
          const cleanEn = opt.textEn.replace(/^[-–—\s]+/, '').toLowerCase();
          return transcript.includes(cleanEn) || cleanEn.includes(transcript);
        });

        if (matched) {
          handleSelectOption(matched);
        } else {
          // Fallback to first option if something was spoken
          if (activeOptions.length > 0) {
            handleSelectOption(activeOptions[0]);
          }
        }
      };

      recognition.onerror = () => {
        setIsListeningMic(false);
      };

      recognition.onend = () => {
        setIsListeningMic(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (e) {
      setIsListeningMic(false);
    }
  };

  const toggleOptionFlip = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    playFeedbackSound('flip');
    setFlippedOptionIds((prev) =>
      prev.includes(id) ? prev.filter((it) => it !== id) : [...prev, id]
    );
  };

  return (
    <div className="w-full flex flex-col items-center gap-6 animate-in fade-in duration-200 py-2 select-none">
      <div className="w-full flex flex-col lg:flex-row gap-6 items-start justify-center">
        {/* Left: Image with Speech Bubble */}
        <div className="w-full max-w-[340px] sm:max-w-[400px] mx-auto lg:mx-0 shrink-0 flex flex-col gap-4">
          <div
            className={`w-full rounded-2xl border overflow-hidden shadow-md flex flex-col relative ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}
          >
            {/* Image */}
            <div className="relative aspect-4/3 w-full bg-slate-950 overflow-hidden">
              <img
                src={exercise.imageUrl}
                alt="Piece of Cake dialogue"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />

              {/* Speech bubble pointing to the man */}
              <div
                onClick={() => {
                  playFeedbackSound('flip');
                  setIsPromptFlipped(!isPromptFlipped);
                }}
                className={`absolute top-4 left-4 right-4 p-3.5 sm:p-4 rounded-2xl border shadow-lg cursor-pointer transition-all duration-300 z-10 ${
                  isSpeakingPartner
                    ? 'ring-2 ring-sky-500 scale-[1.02]'
                    : ''
                } ${
                  isDark
                    ? 'bg-slate-900/95 border-slate-700 text-slate-100 backdrop-blur-md'
                    : 'bg-white/95 border-slate-200 text-slate-900 backdrop-blur-md'
                }`}
                title="Clic para ver traducción"
              >
                <div className="flex items-center justify-between gap-2">
                  <div
                    className={`text-sm sm:text-base font-bold leading-relaxed ${
                      isPromptFlipped ? 'font-serif italic text-slate-700 dark:text-slate-300' : 'text-slate-900 dark:text-slate-100'
                    }`}
                  >
                    {isPromptFlipped ? currentPromptEs : currentPromptEn}
                  </div>

                  <button
                    type="button"
                    onClick={(e) =>
                      handleSpeakText(
                        isPromptFlipped ? currentPromptEs : currentPromptEn,
                        'prompt-audio',
                        e
                      )
                    }
                    className={`p-1.5 rounded-lg shrink-0 cursor-pointer ${
                      activeAudioTarget === 'prompt-audio'
                        ? 'bg-sky-500 text-white animate-pulse'
                        : isDark
                        ? 'text-slate-400 hover:text-white'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                    title="Escuchar"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Speech Bubble Arrow pointing downward to the man */}
                <div
                  className={`absolute -bottom-2 left-10 w-4 h-4 rotate-45 border-r border-b ${
                    isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'
                  }`}
                />
              </div>
            </div>

            {/* Character identity badge */}
            <div
              className={`p-3 text-xs font-semibold flex items-center justify-between border-t ${
                isDark ? 'bg-slate-950/60 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600'
              }`}
            >
              <span>Speaker: Host (Offering cake)</span>
              {isSpeakingPartner && (
                <span className="text-sky-500 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-sky-500 animate-ping" />
                  Speaking...
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right: Controls, Instructions & Options List */}
        <div className="flex-1 w-full flex flex-col gap-4">
          {/* Reversible Instruction Card (No flip buttons/text, solid background, audio + 6 speeds) */}
          <div
            onClick={() => {
              playFeedbackSound('flip');
              setIsInstructionFlipped(!isInstructionFlipped);
            }}
            className={`w-full rounded-2xl border p-4 sm:p-5 shadow-sm cursor-pointer transition-colors duration-200 select-none ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between gap-4">
              <div className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
                {isInstructionFlipped ? exercise.instructionsEs : exercise.instructions}
              </div>

              <div className="flex items-center gap-2 shrink-0" onClick={(e) => e.stopPropagation()}>
                {/* Instruction Audio */}
                <button
                  type="button"
                  onClick={(e) =>
                    handleSpeakText(
                      isInstructionFlipped ? (exercise.instructionsEs || '') : exercise.instructions,
                      'instruction-audio',
                      e
                    )
                  }
                  className={`p-2 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                    activeAudioTarget === 'instruction-audio'
                      ? 'bg-sky-500 text-white animate-pulse'
                      : isDark
                      ? 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900'
                  }`}
                  title="Escuchar instrucción"
                >
                  <Volume2 className="w-4 h-4" />
                </button>

                {/* Speed selector menu */}
                <div className="relative" ref={speedMenuRef}>
                  <button
                    type="button"
                    onClick={() => setIsInstructionSpeedOpen(!isInstructionSpeedOpen)}
                    className={`px-2 py-1 rounded-lg border text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors ${
                      isDark
                        ? 'border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700'
                        : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100'
                    }`}
                    title="Velocidad"
                  >
                    <Gauge className="w-3 h-3 text-sky-500" />
                    <span>{formatSpeedLabel(instructionSpeed)}</span>
                  </button>

                  {isInstructionSpeedOpen && (
                    <div
                      className={`absolute right-0 top-full mt-1 w-28 rounded-xl shadow-xl border py-1.5 z-50 animate-in fade-in zoom-in-95 ${
                        isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
                      }`}
                    >
                      <div className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 text-slate-400">
                        Velocidad
                      </div>
                      {PLAYBACK_SPEEDS.map((sp) => (
                        <button
                          key={sp.value}
                          type="button"
                          onClick={() => {
                            setInstructionSpeed(sp.value);
                            setIsInstructionSpeedOpen(false);
                            if (activeAudioTarget === 'instruction-audio') {
                              stopSpeaking();
                              setActiveAudioTarget(null);
                            }
                          }}
                          className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between transition-colors ${
                            Math.abs(instructionSpeed - sp.value) < 0.01
                              ? 'bg-sky-50 dark:bg-sky-950/50 text-sky-600 dark:text-sky-400 font-bold'
                              : isDark
                              ? 'text-slate-300 hover:bg-slate-700'
                              : 'text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          <span>{sp.label}</span>
                          {Math.abs(instructionSpeed - sp.value) < 0.01 && (
                            <CheckCircle2 className="w-3 h-3 text-sky-500" />
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Top Start Bar */}
          <div className="w-full flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleToggleMic}
                className={`px-3 py-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  isListeningMic
                    ? 'bg-rose-500 text-white border-rose-600 animate-pulse'
                    : isDark
                    ? 'border-slate-700 bg-slate-900 text-slate-300 hover:bg-slate-800'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
                title="Hablar por micrófono"
              >
                {isListeningMic ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4 text-sky-500" />}
                <span>{isListeningMic ? 'Escuchando...' : 'Hablar'}</span>
              </button>
            </div>

            {/* Start Button (as shown in interact 2.png) */}
            <button
              type="button"
              onClick={handleStart}
              className={`px-6 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 shadow-sm transition-all cursor-pointer ${
                hasStarted
                  ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
                  : 'bg-sky-500 hover:bg-sky-600 active:scale-95 text-white'
              }`}
            >
              <Play className="w-4 h-4 fill-current" />
              <span>{hasStarted ? 'Comenzar de nuevo' : 'Start'}</span>
            </button>
          </div>

          {/* Conversation Choices List */}
          <div className="w-full flex flex-col gap-3">
            {activeOptions.map((opt) => {
              const isFlipped = flippedOptionIds.includes(opt.id);
              const isSelected = selectedOptionId === opt.id;

              return (
                <div
                  key={opt.id}
                  onClick={() => handleSelectOption(opt)}
                  className={`w-full rounded-xl border transition-all duration-200 flex items-center justify-between gap-3 p-4 cursor-pointer select-none ${
                    isSelected
                      ? 'ring-2 ring-sky-500 border-sky-500 bg-sky-50/60 dark:bg-sky-950/40'
                      : isDark
                      ? 'bg-slate-900 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50 shadow-xs'
                  }`}
                >
                  {/* Option Text (clickable to flip translation, strictly solid background, no buttons/text) */}
                  <div
                    onClick={(e) => toggleOptionFlip(opt.id, e)}
                    className="flex-1 flex flex-col justify-center cursor-pointer"
                    title="Clic para ver traducción"
                  >
                    <div
                      className={`text-base font-medium leading-relaxed transition-colors ${
                        isFlipped
                          ? 'font-serif italic text-slate-700 dark:text-slate-300'
                          : 'text-slate-900 dark:text-slate-100'
                      }`}
                    >
                      {isFlipped ? opt.textEs : opt.textEn}
                    </div>
                  </div>

                  {/* Audio button for option */}
                  <button
                    type="button"
                    onClick={(e) => handleSpeakText(isFlipped ? opt.textEs : opt.textEn, `opt-${opt.id}`, e)}
                    className={`p-2 rounded-lg cursor-pointer transition-colors shrink-0 ${
                      activeAudioTarget === `opt-${opt.id}`
                        ? 'bg-sky-500 text-white animate-pulse'
                        : isDark
                        ? 'text-slate-400 hover:text-white hover:bg-slate-800'
                        : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                    title="Escuchar opción"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Bottom Bar with Reset Icon Button (as shown at the bottom of interact 2.png) */}
          <div className="w-full flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={handleReset}
              className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
                isDark
                  ? 'border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
                  : 'border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
              title="Reiniciar conversación"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {isFinished && (
              <div className="text-sm font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4" />
                <span>¡Conversación completada exitosamente!</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
