import React, { useState, useEffect, useRef } from 'react';
import {
  Volume2,
  Square,
  Mic,
  RotateCcw,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import {
  SWIMMING_INTERACTIONS,
  swimmingWomenImg,
  SWIMMING_DIALOGUE_LINES,
} from '../../data/swimmingData';
import { SwimmingReversibleCard } from './SwimmingReversibleCard';
import { speakEnglish, stopSpeaking, playFeedbackSound } from '../../utils/audio';
import { useTheme } from '../../context/ThemeContext';
import { SpeedSelectorButton } from '../SpeedSelectorButton';

interface SwimmingActivity7InteractionProps {
  accent?: 'US' | 'UK';
  speechRate?: number;
  onComplete?: () => void;
}

export const SwimmingActivity7Interaction: React.FC<
  SwimmingActivity7InteractionProps
> = ({ accent = 'US', speechRate = 1.0, onComplete }) => {
  const { isDark } = useTheme();

  // 3 Parts: 0 (Interacción 1 de 3), 1 (Interacción 2 de 3), 2 (Interacción 3 de 3)
  const [currentPartIdx, setCurrentPartIdx] = useState<number>(0);
  const [selectedRole, setSelectedRole] = useState<'speaker1' | 'speaker2'>('speaker2');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSuccess, setRecordingSuccess] = useState<boolean[]>([false, false, false]);
  const [currentRate, setCurrentRate] = useState<number>(speechRate);
  const [box1Flipped, setBox1Flipped] = useState(false);
  const [box2Flipped, setBox2Flipped] = useState(false);

  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    setCurrentRate(speechRate);
  }, [speechRate]);

  useEffect(() => {
    setBox1Flipped(false);
    setBox2Flipped(false);
    setIsSpeaking(false);
    setIsRecording(false);
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
  }, [currentPartIdx]);

  const currentInteraction = SWIMMING_INTERACTIONS[currentPartIdx];

  const handlePlayLine = (text: string, speakerGender: 'female' | 'male' = 'female') => {
    stopSpeaking();
    setIsSpeaking(true);
    speakEnglish(
      text,
      currentRate,
      accent as 'US' | 'UK',
      () => setIsSpeaking(true),
      () => setIsSpeaking(false),
      speakerGender
    );
  };

  // Start button triggers dialogue flow
  const handleStartTurn = () => {
    playFeedbackSound('click');
    stopSpeaking();

    // 1. First speak Speaker 1's line
    setIsSpeaking(true);
    speakEnglish(
      currentInteraction.turnSpeaker1.textEn,
      currentRate,
      accent as 'US' | 'UK',
      () => setIsSpeaking(true),
      () => {
        setIsSpeaking(false);
        // 2. Now prompt user to speak Speaker 2's line
        startUserRecording();
      },
      'female'
    );
  };

  const startUserRecording = () => {
    setIsRecording(true);

    const SpeechRec =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (SpeechRec) {
      try {
        const rec = new SpeechRec();
        rec.lang = accent === 'UK' ? 'en-GB' : 'en-US';
        rec.continuous = false;
        rec.interimResults = false;

        rec.onresult = () => {
          setIsRecording(false);
          markPartComplete();
        };

        rec.onend = () => {
          setIsRecording(false);
          markPartComplete();
        };

        rec.onerror = () => {
          setIsRecording(false);
          markPartComplete();
        };

        recognitionRef.current = rec;
        rec.start();
      } catch {
        // Fallback simulation timer
        setTimeout(() => {
          setIsRecording(false);
          markPartComplete();
        }, 2500);
      }
    } else {
      setTimeout(() => {
        setIsRecording(false);
        markPartComplete();
      }, 2500);
    }
  };

  const markPartComplete = () => {
    playFeedbackSound('correct');
    setRecordingSuccess((prev) => {
      const next = [...prev];
      next[currentPartIdx] = true;
      return next;
    });

    if (currentPartIdx === 2 && onComplete) {
      onComplete();
    }
  };

  const handleReset = () => {
    playFeedbackSound('click');
    stopSpeaking();
    setIsSpeaking(false);
    setIsRecording(false);
    setBox1Flipped(false);
    setBox2Flipped(false);
  };

  const goToPart = (idx: number) => {
    playFeedbackSound('click');
    stopSpeaking();
    setCurrentPartIdx(idx);
  };

  const isAllComplete = recordingSuccess.every(Boolean);

  return (
    <div className="w-full flex flex-col items-center gap-6 py-2">
      {/* Top Part Stepper Navigation (Interacción 1 de 3, 2 de 3, 3 de 3) */}
      <div className="w-full flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-inherit/20">
        <div className="flex items-center gap-2">
          {SWIMMING_INTERACTIONS.map((part, idx) => {
            const isActive = currentPartIdx === idx;
            const isDone = recordingSuccess[idx];

            return (
              <button
                key={part.partNumber}
                type="button"
                onClick={() => goToPart(idx)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-sky-600 text-white shadow-xs ring-2 ring-sky-400/40'
                    : isDone
                    ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30'
                    : isDark
                    ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    : 'bg-stone-100 text-slate-700 hover:bg-stone-200'
                }`}
              >
                <span>Interacción {idx + 1} de 3</span>
                {isDone && <CheckCircle2 className="w-3 h-3 text-emerald-500" />}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <SpeedSelectorButton
            currentRate={currentRate}
            onRateChange={setCurrentRate}
            size="sm"
          />
        </div>
      </div>

      {/* Main Grid: Left Column (Character Selector & Reversible Dialogue Reference) */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-5 flex flex-col gap-4">
          {/* Character Selector Card (matching screenshot with arrow on blue banner) */}
          <div
            className={`w-full rounded-2xl sm:rounded-3xl border overflow-hidden shadow-xs transition-colors p-3.5 flex flex-col gap-3 ${
              isDark
                ? 'bg-slate-900 border-slate-800'
                : 'bg-white border-slate-200'
            }`}
          >
            <div className="relative aspect-4/3 w-full rounded-xl overflow-hidden bg-slate-950 flex items-center justify-center">
              <img
                src={swimmingWomenImg}
                alt="Two women practice roleplay"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />

              {/* Character Left Arrow Indicator */}
              <button
                type="button"
                onClick={() => setSelectedRole('speaker1')}
                className={`absolute left-0 top-0 bottom-0 w-9 sm:w-11 flex items-center justify-center transition-all cursor-pointer ${
                  selectedRole === 'speaker1'
                    ? 'bg-sky-600/90 text-white shadow-lg'
                    : 'bg-slate-900/40 hover:bg-slate-900/70 text-white/80'
                }`}
                title="Practicar Hablante 1"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Character Right Arrow Indicator */}
              <button
                type="button"
                onClick={() => setSelectedRole('speaker2')}
                className={`absolute right-0 top-0 bottom-0 w-9 sm:w-11 flex items-center justify-center transition-all cursor-pointer ${
                  selectedRole === 'speaker2'
                    ? 'bg-sky-600/90 text-white shadow-lg'
                    : 'bg-slate-900/40 hover:bg-slate-900/70 text-white/80'
                }`}
                title="Practicar Hablante 2"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            <div className="flex items-center justify-between text-xs px-1">
              <span className="font-semibold text-slate-500">
                Rol seleccionado:
              </span>
              <span className="font-bold text-sky-600 dark:text-sky-400 uppercase">
                {selectedRole === 'speaker1'
                  ? 'Speaker 1 (Izquierda)'
                  : 'Speaker 2 (Derecha)'}
              </span>
            </div>
          </div>

          {/* Full Dialogue Reference: Reversible Card (Click to flip, NO gradients, NO flip buttons) */}
          <SwimmingReversibleCard
            lines={SWIMMING_DIALOGUE_LINES}
            activeLineIdx={currentPartIdx * 2}
            accent={accent}
            speechRate={currentRate}
            onSpeechRateChange={setCurrentRate}
            compact
          />
        </div>

        {/* Right Column: Interactive Turn Exchange */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div
            className={`w-full p-5 sm:p-7 rounded-2xl sm:rounded-3xl border shadow-xs transition-colors flex flex-col gap-5 ${
              isDark
                ? 'bg-slate-900 border-slate-800'
                : 'bg-white border-slate-200'
            }`}
          >
            {/* Top Prompt Instruction & Start Button */}
            <div className="flex items-center justify-between gap-4 pb-3 border-b border-inherit/20">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  {currentInteraction.instruction}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {currentInteraction.instructionEs}
                </p>
              </div>

              {/* Start Button */}
              <button
                type="button"
                onClick={handleStartTurn}
                disabled={isSpeaking || isRecording}
                className={`px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 shadow-xs ${
                  isSpeaking || isRecording
                    ? 'bg-slate-300 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                    : 'bg-sky-600 hover:bg-sky-500 text-white hover:scale-105 active:scale-95'
                }`}
              >
                <Mic className="w-3.5 h-3.5" />
                <span>Start</span>
              </button>
            </div>

            {/* Turn 1 Card: Speaker 1 (Reversible on click, NO gradients, NO flip buttons) */}
            <div
              onClick={() => setBox1Flipped((prev) => !prev)}
              className="w-full perspective-1000 cursor-pointer select-none"
            >
              <div
                className={`grid grid-cols-1 grid-rows-1 transition-transform duration-500 transform-style-3d ${
                  box1Flipped ? 'rotate-y-180' : ''
                }`}
              >
                {/* Front: English */}
                <div
                  className={`col-start-1 row-start-1 backface-hidden p-4 rounded-2xl border transition-all flex items-start justify-between gap-3 ${
                    isSpeaking
                      ? 'bg-sky-50 dark:bg-sky-950/40 border-sky-400 shadow-xs ring-2 ring-sky-400/20'
                      : isDark
                      ? 'bg-slate-800/80 border-slate-700'
                      : 'bg-stone-50 border-stone-200'
                  }`}
                >
                  <div className="flex-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-500 dark:text-amber-400">
                      {currentInteraction.turnSpeaker1.speaker}
                    </span>
                    <p className="text-base sm:text-lg font-medium text-slate-900 dark:text-white mt-1">
                      "{currentInteraction.turnSpeaker1.textEn}"
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePlayLine(currentInteraction.turnSpeaker1.textEn, 'female');
                      }}
                      className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                        isSpeaking
                          ? 'bg-sky-500 text-white ring-2 ring-sky-400'
                          : isDark
                          ? 'bg-slate-700 hover:bg-slate-600 text-sky-400'
                          : 'bg-white hover:bg-stone-200 text-sky-600 border border-stone-200'
                      }`}
                      aria-label="Speaker"
                    >
                      {isSpeaking ? (
                        <Square className="w-3.5 h-3.5 fill-current" />
                      ) : (
                        <Volume2 className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Back: Spanish Translation */}
                <div
                  className={`col-start-1 row-start-1 backface-hidden rotate-y-180 p-4 rounded-2xl border transition-all flex items-start justify-between gap-3 ${
                    isDark
                      ? 'bg-slate-800/80 border-emerald-500/40'
                      : 'bg-white border-emerald-300'
                  }`}
                >
                  <div className="flex-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                      {currentInteraction.turnSpeaker1.speakerEs} (Traducción)
                    </span>
                    <p className="text-base sm:text-lg font-medium italic text-slate-800 dark:text-emerald-100 mt-1">
                      "{currentInteraction.turnSpeaker1.textEs}"
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePlayLine(currentInteraction.turnSpeaker1.textEn, 'female');
                      }}
                      className="w-9 h-9 rounded-full flex items-center justify-center text-emerald-600 bg-emerald-50 dark:bg-slate-700 border border-emerald-200"
                      aria-label="Speaker"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Turn 2 Card: Speaker 2 (Reversible on click, NO gradients, NO flip buttons) */}
            <div
              onClick={() => setBox2Flipped((prev) => !prev)}
              className="w-full perspective-1000 cursor-pointer select-none"
            >
              <div
                className={`grid grid-cols-1 grid-rows-1 transition-transform duration-500 transform-style-3d ${
                  box2Flipped ? 'rotate-y-180' : ''
                }`}
              >
                {/* Front: English */}
                <div
                  className={`col-start-1 row-start-1 backface-hidden p-4 rounded-2xl border transition-all flex items-start justify-between gap-3 ${
                    isRecording
                      ? 'bg-sky-50 dark:bg-sky-950/40 border-sky-400 shadow-xs ring-2 ring-sky-400/20'
                      : recordingSuccess[currentPartIdx]
                      ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-950 dark:text-emerald-100'
                      : isDark
                      ? 'bg-slate-800/80 border-slate-700'
                      : 'bg-stone-50 border-stone-200'
                  }`}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-sky-500 dark:text-sky-400">
                        {currentInteraction.turnSpeaker2.speaker}
                      </span>
                      {isRecording && (
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                      )}
                    </div>
                    <p className="text-base sm:text-lg font-medium text-slate-900 dark:text-white mt-1">
                      "{currentInteraction.turnSpeaker2.textEn}"
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePlayLine(currentInteraction.turnSpeaker2.textEn, 'female');
                      }}
                      className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                        recordingSuccess[currentPartIdx]
                          ? 'bg-emerald-500 text-white'
                          : isDark
                          ? 'bg-slate-700 hover:bg-slate-600 text-sky-400'
                          : 'bg-white hover:bg-stone-200 text-sky-600 border border-stone-200'
                      }`}
                      aria-label="Speaker"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Back: Spanish Translation */}
                <div
                  className={`col-start-1 row-start-1 backface-hidden rotate-y-180 p-4 rounded-2xl border transition-all flex items-start justify-between gap-3 ${
                    isDark
                      ? 'bg-slate-800/80 border-emerald-500/40'
                      : 'bg-white border-emerald-300'
                  }`}
                >
                  <div className="flex-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                      {currentInteraction.turnSpeaker2.speakerEs} (Traducción)
                    </span>
                    <p className="text-base sm:text-lg font-medium italic text-slate-800 dark:text-emerald-100 mt-1">
                      "{currentInteraction.turnSpeaker2.textEs}"
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePlayLine(currentInteraction.turnSpeaker2.textEn, 'female');
                      }}
                      className="w-9 h-9 rounded-full flex items-center justify-center text-emerald-600 bg-emerald-50 dark:bg-slate-700 border border-emerald-200"
                      aria-label="Speaker"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions: Reload/Reset & Next Part Navigation */}
            <div className="pt-3 border-t border-inherit/20 flex items-center justify-between">
              <button
                type="button"
                onClick={handleReset}
                className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                  isDark
                    ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                    : 'bg-stone-50 border-stone-200 text-slate-700 hover:bg-stone-100'
                }`}
                title="Reiniciar esta parte"
                aria-label="Reiniciar"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2">
                {currentPartIdx < 2 ? (
                  <button
                    type="button"
                    onClick={() => goToPart(currentPartIdx + 1)}
                    className="px-5 py-2 rounded-xl text-xs font-bold bg-sky-600 hover:bg-sky-500 text-white transition-all cursor-pointer flex items-center gap-1.5 shadow-xs"
                  >
                    <span>Siguiente Interacción</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      markPartComplete();
                      if (onComplete) onComplete();
                    }}
                    className="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-all cursor-pointer flex items-center gap-1.5 shadow-xs"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Finalizar Sección</span>
                  </button>
                )}
              </div>
            </div>

            {/* Completed badge banner if all 3 parts completed */}
            {isAllComplete && (
              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-950 dark:text-emerald-100 text-xs sm:text-sm font-semibold flex items-center gap-2 animate-in fade-in duration-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>
                  ¡Excelente trabajo! Has completado con éxito las 3 partes de la interacción de "Let's Go Swimming".
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
