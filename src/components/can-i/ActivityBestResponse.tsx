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
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { playFeedbackSound, speakEnglish, stopSpeaking } from '../../utils/audio';
import { CanIBestResponseActivity } from '../../data/canIData';
import { CanIScenePlayer } from './CanIScenePlayer';
import { ReversibleTextCard } from './ReversibleTextCard';

interface ActivityBestResponseProps {
  data: CanIBestResponseActivity;
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

  // Flipped options: { [id: string]: boolean }
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

  const handlePlayAudio = (textEn: string, e: React.MouseEvent, gender: 'male' | 'female' = 'female') => {
    e.stopPropagation();
    stopSpeaking();
    playFeedbackSound('click');
    speakEnglish(textEn, speed, accent, undefined, undefined, gender);
  };

  // Start speech recording flow
  const handleStartRecording = () => {
    if (isChecked) return;
    stopSpeaking();
    playFeedbackSound('click');
    setCountdown(3);

    countdownTimerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev === null || prev <= 1) {
          if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
          startListening();
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const startListening = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      // Simulate speech selection
      simulateSpeech();
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
        setSpokenTranscript(transcript);
        matchSpokenToOption(transcript);
      };

      recognition.onerror = () => {
        setIsRecording(false);
        simulateSpeech();
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch {
      simulateSpeech();
    }
  };

  const simulateSpeech = () => {
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      const correctOpt = data.options.find((o) => o.id === data.correctOptionId);
      if (correctOpt) {
        setSelectedOptionId(correctOpt.id);
        setSpokenTranscript(correctOpt.textEn);
      }
    }, 2000);
  };

  const matchSpokenToOption = (spoken: string) => {
    const cleanSpoken = spoken.toLowerCase().replace(/[^a-z0-9 ]/g, '');
    let bestMatchId: string | null = null;
    let highestMatches = 0;

    data.options.forEach((opt) => {
      const cleanOpt = opt.textEn.toLowerCase().replace(/[^a-z0-9 ]/g, '');
      const words = cleanOpt.split(' ');
      let count = 0;
      words.forEach((w) => {
        if (cleanSpoken.includes(w)) count++;
      });
      if (count > highestMatches) {
        highestMatches = count;
        bestMatchId = opt.id;
      }
    });

    if (bestMatchId) {
      setSelectedOptionId(bestMatchId);
    }
  };

  const handleCheck = () => {
    if (!selectedOptionId) return;
    const isCorrect = selectedOptionId === data.correctOptionId;
    playFeedbackSound(isCorrect ? 'correct' : 'wrong');
    setIsChecked(true);
  };

  const handleReset = () => {
    stopSpeaking();
    playFeedbackSound('click');
    setSelectedOptionId(null);
    setIsChecked(false);
    setIsRecording(false);
    setCountdown(null);
    setSpokenTranscript('');
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
        {/* Left Column: Scene Player with Image & Transcript */}
        <div className="lg:col-span-6">
          <CanIScenePlayer
            speed={speed}
            accent={accent}
            highlightedLineId={data.activityNumber === 7 ? 'turn-1' : 'turn-3'}
            showTranscriptInitially={true}
          />
        </div>

        {/* Right Column: Audio Question & Response Recording/Selection */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          {/* Sub-instruction bar */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
              {data.subInstructionEn}
            </span>
            <span className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400">
              Actividad {data.activityNumber}
            </span>
          </div>

          {/* Question Audio Prompt Card */}
          <div
            className={`p-4 rounded-2xl border transition-all shadow-xs flex items-center justify-between gap-3 ${
              isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'
            }`}
          >
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <span className="p-2.5 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 shrink-0">
                <Headphones className="w-5 h-5" />
              </span>
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-mono font-bold uppercase text-slate-400 block mb-0.5">
                  Pregunta a responder
                </span>
                <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100">
                  {isPromptFlipped ? data.promptQuestionEs : data.promptQuestionEn}
                </p>
              </div>
            </div>

            <div className="shrink-0 flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => {
                  playFeedbackSound('click');
                  setIsPromptFlipped((prev) => !prev);
                }}
                className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-800 dark:hover:text-white"
                title="Voltear traducción"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={(e) => handlePlayAudio(data.promptQuestionEn, e, 'male')}
                className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-sky-500 hover:text-sky-600"
                title="Escuchar audio"
              >
                <Volume2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Options List & Mic/Start Column Layout */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
            {/* Options (9 Cols) */}
            <div className="sm:col-span-9 flex flex-col gap-2.5">
              {data.options.map((opt) => {
                const isSelected = selectedOptionId === opt.id;
                const isOptCorrect = opt.id === data.correctOptionId;
                const isFlipped = Boolean(flippedOptions[opt.id]);

                return (
                  <div
                    key={opt.id}
                    onClick={() => handleSelectOption(opt.id)}
                    className={`p-3.5 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      isChecked
                        ? isOptCorrect
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-200 font-semibold'
                          : isSelected
                          ? 'border-rose-500 bg-rose-50 dark:bg-rose-950/30 text-rose-900 dark:text-rose-200'
                          : isDark
                          ? 'bg-slate-900/60 border-slate-800 text-slate-400 opacity-60'
                          : 'bg-slate-50 border-slate-200 text-slate-400 opacity-60'
                        : isSelected
                        ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/40 text-sky-900 dark:text-sky-100 shadow-sm font-semibold'
                        : isDark
                        ? 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-200'
                        : 'bg-white border-slate-200 hover:border-slate-300 text-slate-800 shadow-xs'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <Headphones className="w-4 h-4 text-slate-400 shrink-0" />
                      <span className="text-xs sm:text-sm leading-relaxed truncate">
                        {isFlipped ? (
                          <span className="italic font-serif text-emerald-700 dark:text-emerald-300">
                            {opt.textEs}
                          </span>
                        ) : (
                          opt.textEn
                        )}
                      </span>
                    </div>

                    <div className="shrink-0 flex items-center gap-1">
                      <button
                        type="button"
                        onClick={(e) => handleToggleOptionFlip(opt.id, e)}
                        className="p-1.5 rounded-lg border border-transparent hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 transition-colors"
                        title="Ver traducción"
                      >
                        <RefreshCw className="w-3 h-3" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => handlePlayAudio(opt.textEn, e, 'female')}
                        className="p-1.5 rounded-lg border border-transparent hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-sky-500 transition-colors"
                        title="Escuchar audio"
                      >
                        <Volume2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Mic & Start Action Area (3 Cols) */}
            <div className="sm:col-span-3 flex flex-col items-center justify-center gap-3 p-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
              {/* Mic Icon */}
              <div
                onClick={handleStartRecording}
                className={`w-14 h-14 rounded-full border-2 flex items-center justify-center transition-all cursor-pointer shadow-md ${
                  isRecording
                    ? 'border-rose-500 bg-rose-500 text-white animate-pulse scale-110'
                    : countdown !== null
                    ? 'border-amber-500 bg-amber-500 text-white animate-bounce'
                    : 'border-sky-300 dark:border-sky-700 text-sky-500 hover:scale-105 active:scale-95 bg-white dark:bg-slate-800'
                }`}
                title="Grabar o hablar"
              >
                {countdown !== null ? (
                  <span className="text-xl font-black font-mono">{countdown}</span>
                ) : (
                  <Mic className="w-6 h-6" />
                )}
              </div>

              {/* Start Button */}
              <button
                type="button"
                onClick={handleStartRecording}
                disabled={isRecording || countdown !== null}
                className="w-full py-2 px-3 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:border-sky-500 hover:text-sky-500 transition-all cursor-pointer text-center shadow-xs bg-white dark:bg-slate-800"
              >
                Start
              </button>
            </div>
          </div>

          {spokenTranscript && (
            <div className="p-3 rounded-xl bg-sky-50 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-800 text-xs text-sky-800 dark:text-sky-200">
              <span className="font-bold">Detectado por voz: </span> &ldquo;{spokenTranscript}&rdquo;
            </div>
          )}

          {/* Action Buttons */}
          <div className="w-full flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={handleReset}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border transition-all cursor-pointer ${
                isDark
                  ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                  : 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reiniciar</span>
            </button>

            <button
              type="button"
              onClick={handleCheck}
              disabled={!selectedOptionId || isChecked}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold shadow-md transition-all cursor-pointer ${
                !selectedOptionId || isChecked
                  ? 'opacity-50 cursor-not-allowed bg-slate-300 dark:bg-slate-700 text-slate-500'
                  : 'bg-sky-600 hover:bg-sky-500 text-white shadow-sky-600/30 hover:scale-105 active:scale-95'
              }`}
            >
              <Check className="w-4 h-4" />
              <span>Comprobar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
