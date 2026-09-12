import React, { useState, useEffect, useRef } from 'react';
import {
  Volume2,
  Sparkles,
  Users,
  Play,
  RotateCcw,
  CheckCircle2,
  Mic,
  ChevronLeft,
  ChevronRight,
  Check,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useTheme } from '../../context/ThemeContext';
import {
  NEWSSTAND_SENTENCES,
  NEWSSTAND_CHARACTERS,
  newsstandImg,
  NewsstandSentence,
} from '../../data/newsstandData';
import { speakEnglish, stopSpeaking, playFeedbackSound } from '../../utils/audio';

interface NewsstandActivity8InteractionProps {
  currentRate: number;
  accent?: 'US' | 'UK';
  onPlayAudio: (text: string, id: string, e?: React.MouseEvent) => void;
  playingSentenceId: string | null;
  onSuccess?: () => void;
}

export const NewsstandActivity8Interaction: React.FC<NewsstandActivity8InteractionProps> = ({
  currentRate,
  accent = 'US',
  onPlayAudio,
  playingSentenceId,
  onSuccess,
}) => {
  const { isDark } = useTheme();

  // Character selection: 'man' | 'woman'
  const [selectedCharacter, setSelectedCharacter] = useState<'man' | 'woman'>('man');

  // Interactive roleplay session
  const [isPlayingSession, setIsPlayingSession] = useState(false);
  const [currentTurnIndex, setCurrentTurnIndex] = useState<number>(0);
  const [completedTurns, setCompletedTurns] = useState<number[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  // Speech Recognition state
  const [isListeningMic, setIsListeningMic] = useState(false);
  const recognitionRef = useRef<any>(null);

  // Reversible cards
  const [isInstructionFlipped, setIsInstructionFlipped] = useState(false);
  const [flippedTurnIds, setFlippedTurnIds] = useState<string[]>([]);

  // Setup speech recognition
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = () => {
        setIsListeningMic(false);
        handleAdvanceTurn();
      };

      recognition.onerror = () => {
        setIsListeningMic(false);
      };

      recognition.onend = () => {
        setIsListeningMic(false);
      };

      recognitionRef.current = recognition;
    }
  }, [currentTurnIndex, selectedCharacter]);

  const handleToggleCharacter = (char: 'man' | 'woman') => {
    if (isPlayingSession) return;
    playFeedbackSound('click');
    setSelectedCharacter(char);
    setCurrentTurnIndex(0);
    setCompletedTurns([]);
    setIsFinished(false);
  };

  const handleStartSession = () => {
    playFeedbackSound('click');
    setIsPlayingSession(true);
    setCurrentTurnIndex(0);
    setCompletedTurns([]);
    setIsFinished(false);

    // If turn 0 belongs to the partner, play it
    const firstSentence = NEWSSTAND_SENTENCES[0];
    const userRole = selectedCharacter === 'man' ? 'Man' : 'Woman';

    if (firstSentence.speaker !== userRole) {
      setTimeout(() => {
        speakPartnerLine(0);
      }, 500);
    }
  };

  const speakPartnerLine = (turnIdx: number) => {
    const sentence = NEWSSTAND_SENTENCES[turnIdx];
    if (!sentence) return;

    const partnerVoice = sentence.speaker === 'Man' ? 'male' : 'female';
    speakEnglish(
      sentence.en,
      currentRate,
      accent === 'UK' ? 'UK' : 'US',
      undefined,
      () => {
        setCompletedTurns((prev) => [...prev, turnIdx]);
        const nextTurn = turnIdx + 1;
        if (nextTurn < NEWSSTAND_SENTENCES.length) {
          setCurrentTurnIndex(nextTurn);
          const nextSentence = NEWSSTAND_SENTENCES[nextTurn];
          const userRole = selectedCharacter === 'man' ? 'Man' : 'Woman';
          if (nextSentence.speaker !== userRole) {
            setTimeout(() => speakPartnerLine(nextTurn), 700);
          }
        } else {
          finishSession();
        }
      },
      partnerVoice
    );
  };

  const handleAdvanceTurn = () => {
    playFeedbackSound('correct');
    setCompletedTurns((prev) => [...prev, currentTurnIndex]);
    const nextTurn = currentTurnIndex + 1;

    if (nextTurn < NEWSSTAND_SENTENCES.length) {
      setCurrentTurnIndex(nextTurn);
      const nextSentence = NEWSSTAND_SENTENCES[nextTurn];
      const userRole = selectedCharacter === 'man' ? 'Man' : 'Woman';

      if (nextSentence.speaker !== userRole) {
        setTimeout(() => speakPartnerLine(nextTurn), 600);
      }
    } else {
      finishSession();
    }
  };

  const handleMicClick = () => {
    if (recognitionRef.current) {
      if (isListeningMic) {
        recognitionRef.current.stop();
        setIsListeningMic(false);
      } else {
        try {
          recognitionRef.current.start();
          setIsListeningMic(true);
        } catch (e) {
          handleAdvanceTurn();
        }
      }
    } else {
      handleAdvanceTurn();
    }
  };

  const finishSession = () => {
    setIsPlayingSession(false);
    setIsFinished(true);
    playFeedbackSound('correct');
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });
    if (onSuccess) onSuccess();
  };

  const handleResetSession = () => {
    stopSpeaking();
    playFeedbackSound('click');
    setIsPlayingSession(false);
    setCurrentTurnIndex(0);
    setCompletedTurns([]);
    setIsFinished(false);
  };

  const toggleTurnFlip = (id: string, e: React.MouseEvent) => {
    setFlippedTurnIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const userRole = selectedCharacter === 'man' ? 'Man' : 'Woman';

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Reversible Instruction Header Card */}
      <div className="w-full perspective-1000 select-none">
        <div
          onClick={() => setIsInstructionFlipped(!isInstructionFlipped)}
          className={`relative w-full rounded-2xl border p-4 sm:p-5 transition-transform duration-500 transform-style-3d cursor-pointer ${
            isInstructionFlipped ? 'rotate-y-180' : ''
          } ${
            isDark
              ? 'bg-slate-900 border-slate-700 text-slate-100'
              : 'bg-white border-slate-200 text-slate-900 shadow-xs'
          }`}
        >
          {/* Front: English */}
          <div className="w-full flex items-center justify-between gap-3 backface-hidden">
            <div className="flex items-center gap-3">
              <span className="p-2 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
                <Users className="w-5 h-5" />
              </span>
              <div>
                <span className="text-xs uppercase tracking-wider font-bold text-sky-600 dark:text-sky-400 block">
                  Actividad 8 · Interacción
                </span>
                <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  Click on the arrow next to the character you would like to practice.
                </h2>
              </div>
            </div>

            <button
              type="button"
              onClick={(e) =>
                onPlayAudio(
                  'Click on the arrow next to the character you would like to practice.',
                  'act8-instruction-en',
                  e
                )
              }
              className={`p-2 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                playingSentenceId === 'act8-instruction-en'
                  ? 'bg-sky-500 text-white animate-pulse border-sky-400'
                  : isDark
                  ? 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white'
                  : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200 hover:text-slate-900'
              }`}
              aria-label="Listen audio"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>

          {/* Back: Spanish */}
          <div className="absolute inset-0 w-full h-full p-4 sm:p-5 rounded-2xl flex items-center justify-between gap-3 backface-hidden rotate-y-180 bg-inherit">
            <div className="flex items-center gap-3">
              <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                <Sparkles className="w-5 h-5" />
              </span>
              <div>
                <span className="text-xs uppercase tracking-wider font-bold text-emerald-600 dark:text-emerald-400 block">
                  Actividad 8 · Traducción
                </span>
                <h2 className="text-base sm:text-lg font-bold italic text-slate-800 dark:text-slate-100">
                  Haz clic en la flecha junto al personaje que deseas practicar.
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2-Column Responsive Layout */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Interactive Character Selection on Stage */}
        <div className="lg:col-span-6 w-full flex flex-col gap-3">
          <div className="relative w-full aspect-4/3 sm:aspect-16/10 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm bg-slate-950">
            <img
              src={newsstandImg}
              alt="Characters in Newsstand"
              className="w-full h-full object-cover object-center"
            />

            {/* Cyan Arrow on Man (Left Side) */}
            <button
              type="button"
              onClick={() => handleToggleCharacter('man')}
              className={`absolute top-1/2 left-3 sm:left-6 -translate-y-1/2 p-2.5 sm:p-3 rounded-full border-2 transition-all cursor-pointer z-20 ${
                selectedCharacter === 'man'
                  ? 'bg-cyan-500 text-white border-white scale-110 shadow-lg ring-4 ring-cyan-400/50'
                  : 'bg-black/50 text-cyan-300 hover:bg-cyan-500 hover:text-white border-cyan-400/50'
              }`}
              aria-label="Practice Man character"
            >
              <ChevronLeft className="w-6 h-6 stroke-[3]" />
            </button>

            {/* Cyan Arrow on Woman (Right Side) */}
            <button
              type="button"
              onClick={() => handleToggleCharacter('woman')}
              className={`absolute top-1/2 right-3 sm:right-6 -translate-y-1/2 p-2.5 sm:p-3 rounded-full border-2 transition-all cursor-pointer z-20 ${
                selectedCharacter === 'woman'
                  ? 'bg-cyan-500 text-white border-white scale-110 shadow-lg ring-4 ring-cyan-400/50'
                  : 'bg-black/50 text-cyan-300 hover:bg-cyan-500 hover:text-white border-cyan-400/50'
              }`}
              aria-label="Practice Woman character"
            >
              <ChevronRight className="w-6 h-6 stroke-[3]" />
            </button>

            {/* Bottom active character label */}
            <div className="absolute bottom-3 inset-x-3 py-2 px-3 rounded-xl bg-slate-950/80 backdrop-blur-xs border border-white/10 flex items-center justify-between text-xs text-white">
              <span className="font-semibold">
                Rol seleccionado:{' '}
                <strong className="text-cyan-400">
                  {selectedCharacter === 'man' ? 'Hombre (Cliente)' : 'Mujer (Vendedora)'}
                </strong>
              </span>
              <span className="opacity-80">
                {selectedCharacter === 'man'
                  ? 'Tú preguntas · El sistema responde'
                  : 'El sistema pregunta · Tú respondes'}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Start Button & Dialogue Turn Boxes */}
        <div className="lg:col-span-6 w-full flex flex-col gap-4">
          {/* Start / Reset Session Bar */}
          <div className="flex items-center gap-3">
            {!isPlayingSession && !isFinished ? (
              <button
                type="button"
                onClick={handleStartSession}
                className="w-full py-3 px-6 rounded-xl font-bold text-sm sm:text-base bg-sky-600 hover:bg-sky-500 text-white shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99]"
              >
                <Play className="w-4 h-4 ml-0.5" />
                <span>Start</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleResetSession}
                className={`w-full py-3 px-6 rounded-xl font-bold text-sm sm:text-base border transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  isDark
                    ? 'bg-slate-800 hover:bg-slate-700 text-white border-slate-700'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
                }`}
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reiniciar Interacción</span>
              </button>
            )}
          </div>

          {/* Dialogue Turns List */}
          <div className="space-y-3">
            {NEWSSTAND_SENTENCES.map((sentence, idx) => {
              const isFlipped = flippedTurnIds.includes(sentence.id);
              const isUserTurn = sentence.speaker === userRole;
              const isCurrent = isPlayingSession && currentTurnIndex === idx;
              const isCompleted = completedTurns.includes(idx);

              let turnCardStyle = isDark
                ? 'bg-slate-900 border-slate-800 text-slate-200'
                : 'bg-white border-slate-200 text-slate-800 shadow-2xs';

              if (isCurrent) {
                turnCardStyle = isUserTurn
                  ? 'ring-2 ring-cyan-500 bg-cyan-50/90 dark:bg-cyan-950/40 border-cyan-400'
                  : 'ring-2 ring-amber-500 bg-amber-50/90 dark:bg-amber-950/40 border-amber-400';
              } else if (isCompleted) {
                turnCardStyle = isDark
                  ? 'bg-emerald-950/20 border-emerald-900/50 text-emerald-300'
                  : 'bg-emerald-50/60 border-emerald-200 text-emerald-950';
              }

              return (
                <div
                  key={sentence.id}
                  className="w-full perspective-1000 select-none min-h-[58px]"
                >
                  <div
                    onClick={(e) => toggleTurnFlip(sentence.id, e)}
                    className={`relative w-full min-h-[58px] rounded-xl border p-3 sm:p-3.5 transition-all duration-300 transform-style-3d cursor-pointer flex items-center justify-between gap-3 ${
                      isFlipped ? 'rotate-y-180' : ''
                    } ${turnCardStyle}`}
                  >
                    {/* Front: English line + speaker button */}
                    <div className="w-full flex items-center justify-between gap-3 backface-hidden">
                      <div className="flex items-center gap-2.5 flex-1">
                        <span
                          className={`text-xs font-bold px-2 py-0.5 rounded uppercase tracking-wider shrink-0 ${
                            isUserTurn
                              ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20'
                              : 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border border-slate-500/20'
                          }`}
                        >
                          {isUserTurn ? 'TÚ' : sentence.speaker}
                        </span>

                        <span className="text-xs sm:text-sm font-medium">
                          {sentence.en}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        {/* If it's current user turn, show speak / advance button */}
                        {isCurrent && isUserTurn && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleMicClick();
                            }}
                            className={`p-1.5 rounded-lg border flex items-center justify-center transition-all cursor-pointer ${
                              isListeningMic
                                ? 'bg-rose-500 text-white animate-pulse border-rose-400'
                                : 'bg-cyan-600 text-white border-cyan-500 shadow-xs'
                            }`}
                            aria-label="Record voice or confirm"
                          >
                            <Mic className="w-4 h-4" />
                          </button>
                        )}

                        {/* Speaker audio button */}
                        <button
                          type="button"
                          onClick={(e) => onPlayAudio(sentence.en, `act8-${sentence.id}`, e)}
                          className={`p-1.5 rounded-lg border flex items-center justify-center transition-all cursor-pointer ${
                            playingSentenceId === `act8-${sentence.id}`
                              ? 'bg-sky-500 text-white animate-pulse border-sky-400'
                              : isDark
                              ? 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                              : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                          }`}
                          aria-label="Listen audio"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Back: Spanish line */}
                    <div className="absolute inset-0 w-full h-full p-3 sm:p-3.5 rounded-xl flex items-center justify-between gap-3 backface-hidden rotate-y-180 bg-inherit">
                      <div className="flex items-center gap-2.5 flex-1">
                        <span className="text-xs font-bold px-2 py-0.5 rounded uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shrink-0">
                          {sentence.speakerEs}
                        </span>
                        <span className="text-xs sm:text-sm font-medium italic text-emerald-600 dark:text-emerald-400">
                          {sentence.es}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Finished Congrats Banner */}
          {isFinished && (
            <div
              className={`p-4 rounded-xl border flex items-center gap-3 animate-in fade-in zoom-in-95 duration-200 ${
                isDark
                  ? 'bg-emerald-950/40 border-emerald-800 text-emerald-200'
                  : 'bg-emerald-50 border-emerald-200 text-emerald-900'
              }`}
            >
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
              <div className="text-xs sm:text-sm">
                <p className="font-bold">¡Excelente práctica de conversación completada!</p>
                <p className="opacity-90">
                  Has practicado el rol exitosamente. Puedes cambiar de personaje con las flechas
                  y practicar el otro lado del diálogo.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
