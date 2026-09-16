import React, { useState, useEffect, useRef } from 'react';
import {
  Volume2,
  Headphones,
  Mic,
  MicOff,
  CheckCircle2,
  XCircle,
  RotateCcw,
} from 'lucide-react';
import {
  SWIMMING_DIALOGUE_LINES,
  swimmingWomenImg,
} from '../../data/swimmingData';
import { SwimmingReversibleCard } from './SwimmingReversibleCard';
import { speakEnglish, stopSpeaking, playFeedbackSound } from '../../utils/audio';
import { useTheme } from '../../context/ThemeContext';

export interface SwimmingSpeechOption {
  id: string;
  text: string;
  textEs: string;
  isCorrect: boolean;
}

export interface SwimmingSpeechData {
  id: string;
  instructions: string;
  instructionsEs: string;
  subtitle: string;
  subtitleEs: string;
  promptStatement: string;
  promptStatementEs: string;
  targetLineIdx: number;
  options: SwimmingSpeechOption[];
  correctAnswerId: string;
  explanation: string;
  explanationEs: string;
}

interface SwimmingSpeechResponseCardProps {
  data: SwimmingSpeechData;
  accent?: 'US' | 'UK';
  speechRate?: number;
  onComplete?: () => void;
}

export const SwimmingSpeechResponseCard: React.FC<
  SwimmingSpeechResponseCardProps
> = ({ data, accent = 'US', speechRate = 1.0, onComplete }) => {
  const { isDark } = useTheme();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recognizedTranscript, setRecognizedTranscript] = useState<string>('');
  const [playingOptionId, setPlayingOptionId] = useState<string | null>(null);
  const [currentRate, setCurrentRate] = useState<number>(speechRate);

  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    setCurrentRate(speechRate);
  }, [speechRate]);

  useEffect(() => {
    setSelectedId(null);
    setIsSubmitted(false);
    setIsRecording(false);
    setRecognizedTranscript('');
    setPlayingOptionId(null);
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
  }, [data.id]);

  // Play audio for a single option
  const handlePlayOption = (optId: string, text: string, e: React.MouseEvent) => {
    e.stopPropagation();
    stopSpeaking();
    setPlayingOptionId(optId);
    speakEnglish(
      text,
      currentRate,
      accent as 'US' | 'UK',
      () => setPlayingOptionId(optId),
      () => setPlayingOptionId(null),
      'female'
    );
  };

  const handleSelectOption = (id: string) => {
    if (isSubmitted) return;
    playFeedbackSound('click');
    setSelectedId(id);
  };

  // Web Speech API / Recording simulation
  const handleToggleRecord = () => {
    if (isSubmitted) return;

    if (isRecording) {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {
          // ignore
        }
      }
      setIsRecording(false);
      return;
    }

    playFeedbackSound('click');
    setIsRecording(true);
    setRecognizedTranscript('');

    const SpeechRec =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (SpeechRec) {
      try {
        const recognition = new SpeechRec();
        recognition.lang = accent === 'UK' ? 'en-GB' : 'en-US';
        recognition.continuous = false;
        recognition.interimResults = true;

        recognition.onresult = (event: any) => {
          const transcript = Array.from(event.results)
            .map((result: any) => result[0].transcript)
            .join('')
            .toLowerCase();

          setRecognizedTranscript(transcript);

          // Check against options
          const matched = data.options.find((opt) =>
            transcript.includes(opt.text.toLowerCase().replace(/[^a-z0-9 ]/g, ''))
          );
          if (matched) {
            setSelectedId(matched.id);
          }
        };

        recognition.onend = () => {
          setIsRecording(false);
        };

        recognition.onerror = () => {
          setIsRecording(false);
        };

        recognitionRef.current = recognition;
        recognition.start();
      } catch {
        // Fallback simulation
        setTimeout(() => {
          setIsRecording(false);
        }, 3000);
      }
    } else {
      // Fallback timer
      setTimeout(() => {
        setIsRecording(false);
      }, 3000);
    }
  };

  const handleCheckAnswer = () => {
    if (!selectedId) return;
    setIsSubmitted(true);
    const isCorrect = selectedId === data.correctAnswerId;
    if (isCorrect) {
      playFeedbackSound('correct');
      if (onComplete) onComplete();
    } else {
      playFeedbackSound('wrong');
    }
  };

  const handleReset = () => {
    playFeedbackSound('click');
    setSelectedId(null);
    setIsSubmitted(false);
    setIsRecording(false);
    setRecognizedTranscript('');
  };

  const isCorrect = isSubmitted && selectedId === data.correctAnswerId;

  return (
    <div className="w-full flex flex-col items-center gap-6 py-2">
      {/* Top Banner Header */}
      <div className="w-full text-center sm:text-left">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          {data.instructions}
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          {data.instructionsEs}
        </p>
      </div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: Dialogue Reference with active target line highlighted */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          <div className="w-full aspect-16/9 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xs relative">
            <img
              src={swimmingWomenImg}
              alt="Two women talking"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <SwimmingReversibleCard
            lines={SWIMMING_DIALOGUE_LINES}
            activeLineIdx={data.targetLineIdx}
            accent={accent}
            speechRate={currentRate}
            onSpeechRateChange={setCurrentRate}
            compact
          />
        </div>

        {/* RIGHT COLUMN: Statement Prompt & Options with Mic */}
        <div className="lg:col-span-6 flex flex-col">
          <div
            className={`w-full p-5 sm:p-7 rounded-2xl sm:rounded-3xl border shadow-xs transition-colors flex flex-col gap-5 ${
              isDark
                ? 'bg-slate-900 border-slate-800'
                : 'bg-white border-slate-200'
            }`}
          >
            {/* Top Instruction & Mic Button */}
            <div className="flex items-center justify-between gap-4 pb-3 border-b border-inherit/20">
              <div>
                <p className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
                  {data.subtitle}
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  {data.subtitleEs}
                </p>
              </div>

              {/* Start / Record Button */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleToggleRecord}
                  disabled={isSubmitted}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 shadow-xs ${
                    isRecording
                      ? 'bg-rose-600 text-white animate-pulse ring-4 ring-rose-500/30'
                      : isDark
                      ? 'bg-slate-800 hover:bg-slate-700 text-sky-400 border border-slate-700'
                      : 'bg-stone-50 hover:bg-stone-100 text-sky-700 border border-stone-200'
                  }`}
                >
                  {isRecording ? (
                    <>
                      <MicOff className="w-3.5 h-3.5" />
                      <span>Stop</span>
                    </>
                  ) : (
                    <>
                      <Mic className="w-3.5 h-3.5" />
                      <span>Start</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Prompt Statement Display */}
            <div
              className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 ${
                isDark
                  ? 'bg-sky-950/30 border-sky-500/30 text-sky-200'
                  : 'bg-sky-50 border-sky-200 text-sky-900'
              }`}
            >
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider block opacity-70">
                  Prompt
                </span>
                <p className="text-sm sm:text-base font-bold">
                  "{data.promptStatement}"
                </p>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  stopSpeaking();
                  speakEnglish(data.promptStatement, currentRate, accent as 'US' | 'UK');
                }}
                className={`w-8 h-8 rounded-lg shrink-0 flex items-center justify-center transition-all cursor-pointer ${
                  isDark
                    ? 'bg-sky-900/60 hover:bg-sky-800 text-sky-300'
                    : 'bg-white hover:bg-sky-100 text-sky-700 border border-sky-300'
                }`}
                aria-label="Speaker"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            {/* Live voice feedback if recording */}
            {isRecording && (
              <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2 animate-pulse">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                <span>
                  Listening... {recognizedTranscript ? `"${recognizedTranscript}"` : 'Say an answer or select an option below.'}
                </span>
              </div>
            )}

            {/* Options List with Headphone Audio Buttons */}
            <div className="flex flex-col gap-2.5">
              {data.options.map((opt) => {
                const isSelected = selectedId === opt.id;
                const showSuccess = isSubmitted && opt.isCorrect;
                const showError = isSubmitted && isSelected && !opt.isCorrect;
                const isAudioPlaying = playingOptionId === opt.id;

                return (
                  <div
                    key={opt.id}
                    onClick={() => handleSelectOption(opt.id)}
                    className={`w-full p-3 sm:p-3.5 rounded-xl sm:rounded-2xl border transition-all cursor-pointer flex items-center gap-3 select-none ${
                      showSuccess
                        ? 'bg-emerald-500/10 border-emerald-500 text-emerald-950 dark:text-emerald-200'
                        : showError
                        ? 'bg-rose-500/10 border-rose-500 text-rose-950 dark:text-rose-200'
                        : isSelected
                        ? 'bg-sky-500/10 border-sky-500 text-slate-900 dark:text-white shadow-xs'
                        : isDark
                        ? 'bg-slate-800/60 hover:bg-slate-800 border-slate-700/60 text-slate-200'
                        : 'bg-stone-50 hover:bg-stone-100 border-stone-200 text-slate-800'
                    }`}
                  >
                    {/* Headphone Audio Button */}
                    <button
                      type="button"
                      onClick={(e) => handlePlayOption(opt.id, opt.text, e)}
                      className={`w-8 h-8 rounded-lg shrink-0 flex items-center justify-center transition-all cursor-pointer ${
                        isAudioPlaying
                          ? 'bg-sky-500 text-white'
                          : isDark
                          ? 'bg-slate-700 hover:bg-slate-600 text-sky-400'
                          : 'bg-white hover:bg-stone-200 text-sky-600 border border-stone-200'
                      }`}
                      aria-label="Audio option"
                    >
                      <Headphones className="w-4 h-4" />
                    </button>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm sm:text-base font-medium leading-snug">
                        {opt.text}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 italic">
                        {opt.textEs}
                      </p>
                    </div>

                    {showSuccess && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                    )}
                    {showError && (
                      <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Feedback & Check Actions */}
            <div className="pt-3 border-t border-inherit/20 flex flex-col gap-3">
              {isSubmitted && (
                <div
                  className={`p-3.5 rounded-xl border flex flex-col gap-1.5 animate-in fade-in duration-200 ${
                    isCorrect
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-950 dark:text-emerald-100'
                      : 'bg-rose-500/10 border-rose-500/30 text-rose-950 dark:text-rose-100'
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold text-sm">
                    {isCorrect ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        <span>Correct! / ¡Correcto!</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                        <span>Incorrect / Inténtalo de nuevo</span>
                      </>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed">
                    {data.explanation}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 italic">
                    {data.explanationEs}
                  </p>
                </div>
              )}

              <div className="flex items-center justify-end gap-2.5">
                {isSubmitted && !isCorrect && (
                  <button
                    type="button"
                    onClick={handleReset}
                    className={`h-10 px-4 rounded-xl border flex items-center gap-2 text-xs font-bold transition-all cursor-pointer ${
                      isDark
                        ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'
                        : 'bg-stone-50 border-stone-200 text-slate-700 hover:bg-stone-100'
                    }`}
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reintentar</span>
                  </button>
                )}

                {!isSubmitted && (
                  <button
                    type="button"
                    onClick={handleCheckAnswer}
                    disabled={!selectedId}
                    className={`h-10 px-6 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                      selectedId
                        ? 'bg-sky-600 hover:bg-sky-500 text-white shadow-xs hover:scale-105 active:scale-95'
                        : 'opacity-40 cursor-not-allowed bg-slate-300 dark:bg-slate-800 text-slate-500'
                    }`}
                  >
                    Comprobar
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
