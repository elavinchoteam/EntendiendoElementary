import React, { useState, useEffect, useRef } from 'react';
import {
  Volume2,
  Play,
  RotateCcw,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Mic,
  MicOff,
  User,
  Store,
  Clock,
  Award,
} from 'lucide-react';
import {
  WereClosedInteractionItem,
  storeClosedImg,
  WERE_CLOSED_INTERACTIONS,
} from '../../data/wereClosedData';
import { WereClosedReferenceCard } from './WereClosedReferenceCard';
import { speakEnglish, stopSpeaking, playFeedbackSound } from '../../utils/audio';
import { useTheme } from '../../context/ThemeContext';

interface WereClosedInteractionSlideProps {
  interaction: WereClosedInteractionItem;
  accent?: 'US' | 'UK';
  speechRate?: number;
  onSuccess?: () => void;
  onNext?: () => void;
  hasNext?: boolean;
}

export const WereClosedInteractionSlide: React.FC<WereClosedInteractionSlideProps> = ({
  interaction,
  accent = 'US',
  speechRate = 1.0,
  onSuccess,
  onNext,
  hasNext = true,
}) => {
  const { isDark } = useTheme();

  // State
  const [isStarted, setIsStarted] = useState(false);
  const [isInstructionFlipped, setIsInstructionFlipped] = useState(false);
  const [isDialogueFlipped, setIsDialogueFlipped] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'customer' | 'clerk'>('customer');
  const [isPracticingLine1, setIsPracticingLine1] = useState(false);
  const [isPracticingLine2, setIsPracticingLine2] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [spokenText, setSpokenText] = useState('');
  const [matchScore, setMatchScore] = useState<number | null>(null);
  const [hasCompletedCurrent, setHasCompletedCurrent] = useState(false);

  const recognitionRef = useRef<any>(null);

  // Reset when interaction changes
  useEffect(() => {
    setIsStarted(false);
    setIsInstructionFlipped(false);
    setIsDialogueFlipped(false);
    setIsPracticingLine1(false);
    setIsPracticingLine2(false);
    setIsRecording(false);
    setSpokenText('');
    setMatchScore(null);
    setHasCompletedCurrent(false);
    stopSpeaking();
  }, [interaction.id]);

  // Clean up recognition
  useEffect(() => {
    return () => {
      stopSpeaking();
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {
          // ignore
        }
      }
    };
  }, []);

  const line1 = interaction.turns[0];
  const line2 = interaction.turns[1];

  // Play dialogue turn audio
  const handlePlayTurn = (text: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    stopSpeaking();
    playFeedbackSound('click');
    speakEnglish(text, speechRate, accent);
  };

  // Start the conversation as prompted in the screenshot ("Click 'Start' to begin the conversation.")
  const handleStartConversation = () => {
    playFeedbackSound('click');
    setIsStarted(true);
    stopSpeaking();

    // Play Line 1 (Clerk) automatically
    setIsPracticingLine1(true);
    setIsPracticingLine2(false);
    speakEnglish(
      line1.textEn,
      speechRate,
      accent,
      () => {},
      () => {
        setIsPracticingLine1(false);
        setIsPracticingLine2(true);
      }
    );
  };

  // Speech Recognition for pronunciation practice
  const handleToggleMic = (expectedText: string) => {
    const SpeechRecognitionClass =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognitionClass) {
      alert('Tu navegador no soporta reconocimiento de voz. Usa Chrome o Edge.');
      return;
    }

    if (isRecording) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsRecording(false);
      return;
    }

    playFeedbackSound('click');
    stopSpeaking();
    setSpokenText('');
    setMatchScore(null);
    setIsRecording(true);

    try {
      const recognition = new SpeechRecognitionClass();
      recognitionRef.current = recognition;
      recognition.lang = accent === 'UK' ? 'en-GB' : 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onresult = (event: any) => {
        const result = event.results[0][0].transcript;
        setSpokenText(result);
        setIsRecording(false);

        // Calculate score
        const expectedWords = expectedText.toLowerCase().replace(/[^a-z0-9 ]/g, '').split(/\s+/);
        const spokenWords = result.toLowerCase().replace(/[^a-z0-9 ]/g, '').split(/\s+/);

        let matches = 0;
        expectedWords.forEach((w) => {
          if (spokenWords.includes(w)) matches++;
        });

        const calculatedScore = Math.min(
          100,
          Math.max(50, Math.round((matches / expectedWords.length) * 100))
        );
        setMatchScore(calculatedScore);

        if (calculatedScore >= 70) {
          playFeedbackSound('correct');
          setHasCompletedCurrent(true);
          onSuccess?.();
        } else {
          playFeedbackSound('wrong');
        }
      };

      recognition.onerror = () => {
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognition.start();
    } catch {
      setIsRecording(false);
    }
  };

  // Mark completed directly if user listens and validates
  const handleMarkComplete = () => {
    playFeedbackSound('correct');
    setHasCompletedCurrent(true);
    setMatchScore(100);
    onSuccess?.();
  };

  // Reset interaction
  const handleResetInteraction = () => {
    playFeedbackSound('click');
    stopSpeaking();
    setIsStarted(false);
    setIsInstructionFlipped(false);
    setIsDialogueFlipped(false);
    setIsPracticingLine1(false);
    setIsPracticingLine2(false);
    setIsRecording(false);
    setSpokenText('');
    setMatchScore(null);
    setHasCompletedCurrent(false);
  };

  return (
    <div
      className={`w-full max-w-5xl mx-auto rounded-3xl border shadow-xl overflow-hidden transition-all duration-300 ${
        isDark ? 'bg-slate-900 border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'
      }`}
    >
      <div className="flex flex-col lg:flex-row items-stretch">
        {/* LEFT COLUMN: Image + Reference Card */}
        <div
          className={`w-full lg:w-[46%] p-5 sm:p-7 flex flex-col gap-4 border-b lg:border-b-0 lg:border-r ${
            isDark ? 'bg-slate-900/80 border-white/10' : 'bg-slate-50/80 border-slate-200'
          }`}
        >
          {/* Header Badge */}
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-sky-500/15 border border-sky-500/30 text-sky-600 dark:text-sky-400">
              Unit 6 · {interaction.title}
            </span>
            <span className="text-xs font-mono opacity-60">We're Closed</span>
          </div>

          {/* Illustration image matching screenshot */}
          <div className="w-full h-36 sm:h-40 rounded-2xl overflow-hidden border border-inherit/20 relative shadow-sm">
            <img
              src={storeClosedImg}
              alt="Store Closed Scene"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-3">
              <span className="text-white text-xs font-medium drop-shadow-sm flex items-center gap-1.5">
                <Store className="w-3.5 h-3.5 text-amber-400" />
                Interacción {interaction.partNumber} de 3 · Diálogo en Vivo
              </span>
            </div>
          </div>

          {/* 3D Reversible Reference Card with full dialogue and hours */}
          <WereClosedReferenceCard speed={speechRate} accent={accent} />
        </div>

        {/* RIGHT COLUMN: Instruction banner + Start Button + Interactive Dialogue Box */}
        <div className="w-full lg:w-[54%] p-6 sm:p-8 flex flex-col justify-between gap-6">
          <div className="flex flex-col gap-5">
            {/* Header with Title */}
            <div className="flex items-center justify-between pb-3 border-b border-inherit/15">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                  {interaction.title} · Práctica de Conversación
                </span>
                <h3 className="text-lg font-bold tracking-tight mt-0.5">
                  We're Closed · Diálogo Guiado
                </h3>
              </div>
              <span className="text-xs font-mono opacity-60 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                Paso {interaction.partNumber} de 3
              </span>
            </div>

            {/* Instruction banner matching screenshot: Click 'Start' to begin the conversation */}
            <div
              role="button"
              tabIndex={0}
              onClick={() => {
                playFeedbackSound('flip');
                setIsInstructionFlipped((prev) => !prev);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setIsInstructionFlipped((prev) => !prev);
                }
              }}
              className={`p-3 rounded-2xl border text-xs sm:text-sm font-medium transition-all cursor-pointer flex items-center justify-between gap-3 ${
                isDark
                  ? 'bg-slate-800/60 border-white/10 hover:bg-slate-800'
                  : 'bg-slate-100/80 border-slate-200 hover:bg-slate-100'
              }`}
              title="Haz clic para traducir las instrucciones"
            >
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase bg-sky-500/20 text-sky-600 dark:text-sky-400">
                  {isInstructionFlipped ? 'ES' : 'EN'}
                </span>
                <span>
                  {isInstructionFlipped
                    ? interaction.instructionsEs
                    : interaction.instructions}
                </span>
              </div>
              <span className="text-[10px] font-mono opacity-60">Traducir ↻</span>
            </div>

            {/* START BUTTON (Centered pill button as seen in screenshots 1, 2, 3) */}
            <div className="flex justify-center">
              <button
                type="button"
                onClick={handleStartConversation}
                className={`px-8 py-2 rounded-full font-mono font-bold text-sm border transition-all cursor-pointer shadow-sm active:scale-95 flex items-center gap-2 ${
                  isStarted
                    ? 'bg-sky-600 text-white border-sky-600 shadow-sky-500/20'
                    : isDark
                    ? 'bg-slate-800 hover:bg-slate-700 text-sky-400 border-white/20'
                    : 'bg-white hover:bg-sky-50 text-sky-600 border-slate-300'
                }`}
                title="Iniciar reproducción del diálogo"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Start</span>
              </button>
            </div>

            {/* 3D REVERSIBLE INTERACTIVE CONVERSATION CARD */}
            <div className="w-full perspective-1000">
              <div
                role="button"
                tabIndex={0}
                onClick={(e) => {
                  const target = e.target as HTMLElement;
                  if (target.closest('button')) return;
                  playFeedbackSound('flip');
                  setIsDialogueFlipped((prev) => !prev);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    const target = e.target as HTMLElement;
                    if (target.closest('button')) return;
                    e.preventDefault();
                    playFeedbackSound('flip');
                    setIsDialogueFlipped((prev) => !prev);
                  }
                }}
                className={`grid grid-cols-1 grid-rows-1 w-full rounded-2xl border transition-transform duration-500 transform-style-3d cursor-pointer select-none shadow-sm ${
                  isDark
                    ? 'bg-slate-800/50 border-white/10 text-white'
                    : 'bg-white border-slate-200 text-slate-900'
                } ${isDialogueFlipped ? 'rotate-y-180' : ''}`}
                title="Haz clic para voltear y ver la traducción al castellano"
              >
                {/* FRONT: Dialogue matching screenshots */}
                <div
                  className={`col-start-1 row-start-1 w-full rounded-2xl p-4 sm:p-5 flex flex-col justify-between backface-hidden ${
                    isDialogueFlipped ? 'invisible pointer-events-none' : ''
                  }`}
                >
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-inherit/15">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                      Interaction · English
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        playFeedbackSound('flip');
                        setIsDialogueFlipped((prev) => !prev);
                      }}
                      className="px-2 py-0.5 rounded-lg text-xs font-mono font-bold bg-sky-500/15 border border-sky-500/30 text-sky-600 dark:text-sky-400 hover:bg-sky-500/25 flex items-center gap-1 transition-all cursor-pointer"
                      title="Ver traducción al castellano"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Castellano</span>
                    </button>
                  </div>

                  {/* Two dialogue rows as shown in screenshots */}
                  <div className="space-y-3 font-sans">
                    {/* Line 1: Clerk (in light-blue background, blue text) */}
                    <div
                      className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 transition-all ${
                        isPracticingLine1
                          ? 'bg-sky-500/20 border-sky-500 ring-2 ring-sky-500/30 text-sky-700 dark:text-sky-300'
                          : isDark
                          ? 'bg-sky-950/30 border-sky-500/30 text-sky-300'
                          : 'bg-sky-50/90 border-sky-200 text-sky-600'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="font-bold text-sm sm:text-base">
                          {line1.textEn}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {interaction.badgeNumber && (
                          <span className="w-5 h-5 rounded-full bg-rose-500 text-white font-mono font-bold text-xs flex items-center justify-center shadow-xs">
                            {interaction.badgeNumber}
                          </span>
                        )}
                        {interaction.hasRedIndicator && (
                          <span className="w-3 h-3 rounded-full bg-rose-500 animate-pulse shadow-xs" />
                        )}
                        <button
                          type="button"
                          onClick={(e) => handlePlayTurn(line1.textEn, e)}
                          className="p-1 rounded-lg border border-sky-500/30 hover:bg-sky-500/20 text-sky-600 dark:text-sky-400 transition-colors"
                          title="Escuchar al dependiente"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Line 2: Customer (in clean box with speech practice controls) */}
                    <div
                      className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 transition-all ${
                        isPracticingLine2
                          ? 'bg-emerald-500/15 border-emerald-500 ring-2 ring-emerald-500/30'
                          : isDark
                          ? 'bg-slate-800/80 border-white/10'
                          : 'bg-slate-50/90 border-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="font-medium text-sm sm:text-base text-slate-800 dark:text-slate-100">
                          {line2.textEn}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={(e) => handlePlayTurn(line2.textEn, e)}
                          className="p-1.5 rounded-lg border border-inherit/20 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
                          title="Escuchar respuesta"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleToggleMic(line2.textEn)}
                          className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                            isRecording
                              ? 'bg-rose-500 text-white border-rose-600 animate-pulse'
                              : 'bg-sky-500/15 border-sky-500/30 text-sky-600 dark:text-sky-400 hover:bg-sky-500/25'
                          }`}
                          title="Practicar pronunciación con micrófono"
                        >
                          {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Recognition live feedback */}
                  {spokenText && (
                    <div className="mt-3 p-3 rounded-xl border border-sky-500/20 bg-sky-50/50 dark:bg-sky-950/20 text-xs font-mono space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="opacity-70">Tu pronunciación:</span>
                        {matchScore !== null && (
                          <span
                            className={`font-bold ${
                              matchScore >= 70 ? 'text-emerald-500' : 'text-amber-500'
                            }`}
                          >
                            {matchScore}% coincidencia
                          </span>
                        )}
                      </div>
                      <p className="font-semibold text-slate-800 dark:text-slate-200">
                        "{spokenText}"
                      </p>
                    </div>
                  )}

                  <div className="pt-2 mt-3 border-t border-inherit/15 flex items-center justify-between text-[10px] font-mono opacity-60">
                    <span>
                      {isRecording ? '🔴 Grabando... Habla ahora' : 'Práctica de pronunciación guiada'}
                    </span>
                    <span>Clic tarjeta para traducir ↻</span>
                  </div>
                </div>

                {/* BACK: Spanish Translation */}
                <div
                  className={`col-start-1 row-start-1 w-full rounded-2xl p-4 sm:p-5 flex flex-col justify-between backface-hidden rotate-y-180 ${
                    isDark
                      ? 'bg-slate-800 text-emerald-200'
                      : 'bg-emerald-50/95 text-emerald-950 border border-emerald-300'
                  } ${!isDialogueFlipped ? 'invisible pointer-events-none' : ''}`}
                >
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-inherit/20">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                      Traducción al Castellano
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        playFeedbackSound('flip');
                        setIsDialogueFlipped((prev) => !prev);
                      }}
                      className="px-2 py-0.5 rounded-lg text-xs font-mono font-bold bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/25 flex items-center gap-1 transition-all cursor-pointer"
                      title="Volver al diálogo en inglés"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Inglés</span>
                    </button>
                  </div>

                  <div className="space-y-3 font-serif py-1">
                    <div className="p-3 rounded-xl border border-emerald-300/40 bg-emerald-500/5">
                      <p className="font-bold text-xs uppercase font-sans text-emerald-700 dark:text-emerald-300 mb-1">
                        Dependiente:
                      </p>
                      <p className="text-sm sm:text-base leading-relaxed">{line1.textEs}</p>
                    </div>

                    <div className="p-3 rounded-xl border border-emerald-300/40 bg-emerald-500/5">
                      <p className="font-bold text-xs uppercase font-sans text-emerald-700 dark:text-emerald-300 mb-1">
                        Cliente:
                      </p>
                      <p className="text-sm sm:text-base leading-relaxed">{line2.textEs}</p>
                    </div>
                  </div>

                  <div className="pt-2 mt-3 border-t border-inherit/15 flex items-center justify-between text-[10px] font-mono opacity-60">
                    <span>Traducción contextual</span>
                    <span>Castellano</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Explanation / prompt card */}
            <div
              className={`p-3.5 rounded-2xl border text-xs sm:text-sm font-sans flex items-start gap-2.5 ${
                isDark ? 'bg-slate-800/40 border-white/10' : 'bg-amber-50/70 border-amber-200'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-bold text-amber-800 dark:text-amber-300">
                  {interaction.practicePromptEs}
                </p>
                <p className="text-xs opacity-80">{interaction.explanationEs}</p>
              </div>
            </div>
          </div>

          {/* Action buttons: Reintentar Actividad, Marcar Completado, Siguiente Interacción */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-inherit/15">
            <button
              type="button"
              onClick={handleResetInteraction}
              className="px-4 py-2.5 rounded-xl border border-inherit/20 text-xs sm:text-sm font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer flex items-center gap-1.5 active:scale-95"
              title="Reiniciar esta interacción"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reintentar Actividad</span>
            </button>

            <div className="flex items-center gap-3">
              {!hasCompletedCurrent ? (
                <button
                  type="button"
                  onClick={handleMarkComplete}
                  className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-sky-500/25 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Validar Interacción</span>
                </button>
              ) : hasNext && onNext ? (
                <button
                  type="button"
                  onClick={() => {
                    playFeedbackSound('click');
                    onNext();
                  }}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-emerald-500/25 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
                >
                  <span>Siguiente Interacción</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    playFeedbackSound('complete');
                    onSuccess?.();
                  }}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-emerald-500/25 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
                >
                  <Award className="w-4 h-4" />
                  <span>Completar Sección</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
