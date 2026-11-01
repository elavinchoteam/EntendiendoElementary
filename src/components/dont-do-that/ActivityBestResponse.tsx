import React, { useState, useRef, useEffect } from 'react';
import {
  Volume2,
  RefreshCw,
  Headphones,
  Mic,
  RotateCcw,
  Check,
  CheckCircle2,
  XCircle,
  Play,
  Sparkles,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { playFeedbackSound, speakEnglish, stopSpeaking } from '../../utils/audio';
import { BestResponseActivityData } from '../../data/dontDoThatData';
import { DontDoThatScenePlayer } from './DontDoThatScenePlayer';
import { ReversibleTextCard } from './ReversibleTextCard';

interface ActivityBestResponseProps {
  data: BestResponseActivityData;
  speed: number;
  accent?: 'US' | 'UK';
}

export const ActivityBestResponse: React.FC<ActivityBestResponseProps> = ({
  data,
  speed,
  accent = 'US',
}) => {
  const { isDark } = useTheme();

  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isChecked, setIsChecked] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [spokenTranscript, setSpokenTranscript] = useState<string>('');

  // Flipped cards
  const [flippedOptions, setFlippedOptions] = useState<Record<string, boolean>>({});
  const [isPromptFlipped, setIsPromptFlipped] = useState(false);

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
  }, []);

  const handleSelectOption = (optId: string) => {
    if (isChecked) return;
    playFeedbackSound('click');
    setSelectedOptionId(optId);
  };

  const handleToggleOptionFlip = (optId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    playFeedbackSound('click');
    setFlippedOptions((prev) => ({
      ...prev,
      [optId]: !prev[optId],
    }));
  };

  const handlePlayAudio = (textEn: string, e: React.MouseEvent) => {
    e.stopPropagation();
    stopSpeaking();
    playFeedbackSound('click');
    speakEnglish(textEn, speed, accent, undefined, undefined, 'male');
  };

  const handleTogglePromptFlip = (e: React.MouseEvent) => {
    e.stopPropagation();
    playFeedbackSound('click');
    setIsPromptFlipped(!isPromptFlipped);
  };

  const handleCheck = () => {
    if (!selectedOptionId) return;
    const isCorrect = selectedOptionId === data.correctOptionId;
    playFeedbackSound(isCorrect ? 'correct' : 'wrong');
    setIsChecked(true);
  };

  const handleReset = () => {
    playFeedbackSound('click');
    setSelectedOptionId(null);
    setIsChecked(false);
    setSpokenTranscript('');
    setIsRecording(false);
    if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // ignore
      }
    }
  };

  // Handle Speech Recognition
  const handleStartSpeaking = () => {
    stopSpeaking();
    playFeedbackSound('click');
    setSpokenTranscript('');
    setCountdown(3);

    // Play prompt first
    speakEnglish(
      data.promptTextEn,
      speed,
      accent,
      undefined,
      () => {
        // Countdown
        let c = 3;
        countdownTimerRef.current = setInterval(() => {
          c -= 1;
          if (c > 0) {
            setCountdown(c);
          } else {
            if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
            setCountdown(null);
            startMicrophoneRecording();
          }
        }, 800);
      },
      'male'
    );
  };

  const startMicrophoneRecording = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Tu navegador no soporta reconocimiento de voz nativo. Por favor selecciona una de las opciones con un clic.');
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
        setSpokenTranscript(transcript);
        evaluateSpokenText(transcript);
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

  const evaluateSpokenText = (transcript: string) => {
    const cleanSpoken = transcript.toLowerCase().replace(/[^a-z0-9 ]/g, '').trim();

    // Check which option is closest
    let matchedOptionId: string | null = null;
    let highestSimilarity = 0;

    data.options.forEach((opt) => {
      const cleanOpt = opt.textEn.toLowerCase().replace(/[^a-z0-9 ]/g, '').trim();
      if (cleanSpoken.includes(cleanOpt) || cleanOpt.includes(cleanSpoken)) {
        matchedOptionId = opt.id;
      }
    });

    if (matchedOptionId) {
      setSelectedOptionId(matchedOptionId);
      const isCorrect = matchedOptionId === data.correctOptionId;
      playFeedbackSound(isCorrect ? 'correct' : 'wrong');
      setIsChecked(true);
    } else {
      // Pick best guess or notify
      playFeedbackSound('click');
    }
  };

  const isCurrentSelectionCorrect = selectedOptionId === data.correctOptionId;

  return (
    <div className="w-full flex flex-col gap-6 animate-in fade-in duration-200">
      {/* 1. Reversible Instruction Banner */}
      <ReversibleTextCard
        textEn={data.instructionEn}
        textEs={data.instructionEs}
        speed={speed}
        accent={accent}
      />

      {/* 2. Main Two-Column Layout */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Scene Player with Image & Transcript */}
        <div className="lg:col-span-6">
          <DontDoThatScenePlayer
            speed={speed}
            accent={accent}
            highlightedLineId={data.highlightedLineId}
            showTranscriptInitially={true}
          />
        </div>

        {/* Right Column: Statement / Question + Options + Microphone */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          <div
            className={`p-5 rounded-2xl border shadow-sm ${
              isDark ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-200'
            }`}
          >
            {/* Header Hint */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200 dark:border-slate-700 text-xs text-slate-500 dark:text-slate-400">
              <span className="font-medium">{data.subInstructionEn}</span>
              <span className="text-[11px] italic text-slate-400">Audio & Voz</span>
            </div>

            {/* Prompt Statement / Question Card */}
            <div
              onClick={handleTogglePromptFlip}
              className={`p-4 rounded-xl border mb-5 cursor-pointer transition-all ${
                isDark
                  ? 'bg-slate-900/60 border-slate-700 hover:border-sky-500/50'
                  : 'bg-slate-50 border-slate-200 hover:border-sky-400'
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-9 h-9 rounded-full bg-sky-100 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0">
                    <Headphones className="w-5 h-5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    {!isPromptFlipped ? (
                      <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-100">
                        "{data.promptTextEn}"
                      </h3>
                    ) : (
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                          Español
                        </span>
                        <h3 className="text-base sm:text-lg font-semibold text-emerald-800 dark:text-emerald-200">
                          "{data.promptTextEs}"
                        </h3>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                  {!isPromptFlipped && (
                    <button
                      type="button"
                      onClick={(e) => handlePlayAudio(data.promptTextEn, e)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-sky-600 hover:bg-sky-50 dark:hover:bg-sky-950/40 transition-colors"
                      title="Escuchar audio"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={handleTogglePromptFlip}
                    className={`p-1.5 rounded-lg transition-colors ${
                      isPromptFlipped
                        ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40'
                        : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700'
                    }`}
                    title={isPromptFlipped ? 'Ver inglés' : 'Traducir al español'}
                  >
                    <RefreshCw className={`w-4 h-4 transition-transform duration-300 ${isPromptFlipped ? 'rotate-180' : ''}`} />
                  </button>
                </div>
              </div>
            </div>

            {/* Options List + Right Side Mic Action */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              {/* Options Column */}
              <div className="md:col-span-8 flex flex-col gap-2.5">
                {data.options.map((opt) => {
                  const isSelected = selectedOptionId === opt.id;
                  const isOptionFlipped = flippedOptions[opt.id];
                  const isCorrectOption = opt.id === data.correctOptionId;

                  let stateClasses = '';
                  if (isChecked) {
                    if (isCorrectOption) {
                      stateClasses = 'border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-100 ring-1 ring-emerald-500';
                    } else if (isSelected && !isCorrectOption) {
                      stateClasses = 'border-rose-400 bg-rose-50/70 dark:bg-rose-950/40 text-rose-900 dark:text-rose-100 ring-1 ring-rose-400';
                    } else {
                      stateClasses = 'opacity-60 border-slate-200 dark:border-slate-700';
                    }
                  } else if (isSelected) {
                    stateClasses = isDark
                      ? 'border-sky-500 bg-sky-950/40 text-slate-100 ring-1 ring-sky-500'
                      : 'border-sky-500 bg-sky-50/70 text-slate-900 ring-1 ring-sky-500';
                  } else {
                    stateClasses = isDark
                      ? 'border-slate-700 bg-slate-900/40 hover:bg-slate-800/80 hover:border-slate-600 text-slate-200'
                      : 'border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 text-slate-700';
                  }

                  return (
                    <div
                      key={opt.id}
                      onClick={() => handleSelectOption(opt.id)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${stateClasses}`}
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <Headphones className="w-4 h-4 text-slate-400 shrink-0" />

                        <div className="flex-1 min-w-0">
                          {!isOptionFlipped ? (
                            <span className="text-sm font-medium leading-relaxed block">
                              {opt.textEn}
                            </span>
                          ) : (
                            <div className="flex flex-col">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                                Español
                              </span>
                              <span className="text-sm font-medium text-emerald-800 dark:text-emerald-200 leading-relaxed block">
                                {opt.textEs}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                        {!isOptionFlipped && (
                          <button
                            type="button"
                            onClick={(e) => handlePlayAudio(opt.textEn, e)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-sky-600 hover:bg-sky-50 dark:hover:bg-sky-950/40 transition-colors"
                            title="Escuchar audio"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={(e) => handleToggleOptionFlip(opt.id, e)}
                          className={`p-1.5 rounded-lg transition-colors ${
                            isOptionFlipped
                              ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40'
                              : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700'
                          }`}
                          title={isOptionFlipped ? 'Ver inglés' : 'Traducir al español'}
                        >
                          <RefreshCw className={`w-4 h-4 transition-transform duration-300 ${isOptionFlipped ? 'rotate-180' : ''}`} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Microphone & Voice Action Column */}
              <div className="md:col-span-4 flex flex-col items-center justify-center p-4 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/30 gap-3">
                <div
                  className={`w-14 h-14 rounded-full border-2 flex items-center justify-center transition-all ${
                    isRecording
                      ? 'border-rose-500 bg-rose-500/20 text-rose-500 animate-pulse scale-110'
                      : countdown !== null
                      ? 'border-amber-500 bg-amber-500/20 text-amber-500 scale-105'
                      : 'border-sky-400 dark:border-sky-500 text-sky-500 bg-sky-50 dark:bg-sky-950/40'
                  }`}
                >
                  {countdown !== null ? (
                    <span className="text-xl font-bold font-mono">{countdown}</span>
                  ) : (
                    <Mic className="w-7 h-7" />
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleStartSpeaking}
                  disabled={isRecording || countdown !== null}
                  className="px-5 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:border-sky-500 hover:text-sky-600 shadow-sm transition-all disabled:opacity-50"
                >
                  {isRecording ? 'Escuchando...' : countdown !== null ? 'Prepárate...' : 'Start'}
                </button>

                {spokenTranscript && (
                  <p className="text-[11px] text-center text-slate-500 dark:text-slate-400 italic">
                    "{spokenTranscript}"
                  </p>
                )}
              </div>
            </div>

            {/* Check / Reset Buttons */}
            <div className="mt-5 flex items-center justify-between gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
              <button
                type="button"
                onClick={handleReset}
                disabled={!selectedOptionId}
                className="px-4 py-2 rounded-xl text-xs sm:text-sm font-medium border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5"
              >
                <RotateCcw className="w-4 h-4" />
                Reiniciar
              </button>

              <button
                type="button"
                onClick={handleCheck}
                disabled={!selectedOptionId || isChecked}
                className="px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-sky-600 hover:bg-sky-500 text-white shadow-md shadow-sky-600/20 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Check className="w-4 h-4" />
                Comprobar
              </button>
            </div>

            {/* Feedback & Explanation Card */}
            {isChecked && (
              <div
                className={`mt-4 p-4 rounded-xl border animate-in fade-in duration-200 flex flex-col gap-2 ${
                  isCurrentSelectionCorrect
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-700 text-emerald-900 dark:text-emerald-100'
                    : 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-700 text-rose-900 dark:text-rose-100'
                }`}
              >
                <div className="flex items-center gap-2 font-semibold text-sm">
                  {isCurrentSelectionCorrect ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                      <span>¡Respuesta acertada!</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                      <span>Respuesta incorrecta. Revisa la explicación:</span>
                    </>
                  )}
                </div>

                <div className="text-xs sm:text-sm leading-relaxed flex flex-col gap-1 mt-1 pl-7">
                  <p className="font-medium text-slate-800 dark:text-slate-200">
                    {data.explanationEn}
                  </p>
                  <p className="text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700 pt-1 mt-1 italic">
                    {data.explanationEs}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
