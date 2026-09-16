import React, { useState, useEffect } from 'react';
import { Volume2, CheckCircle2, XCircle, RotateCcw } from 'lucide-react';
import {
  SWIMMING_DIALOGUE_LINES,
  swimmingWomenImg,
} from '../../data/swimmingData';
import { SwimmingReversibleCard } from './SwimmingReversibleCard';
import { speakEnglish, stopSpeaking, playFeedbackSound } from '../../utils/audio';
import { useTheme } from '../../context/ThemeContext';

export interface SwimmingChoiceOption {
  id: string;
  text: string;
  textEs: string;
  isCorrect: boolean;
}

export interface SwimmingChoiceData {
  id: string;
  question: string;
  questionEs: string;
  options: SwimmingChoiceOption[];
  correctAnswerId: string;
  explanation: string;
  explanationEs: string;
}

interface SwimmingChoiceCardProps {
  data: SwimmingChoiceData;
  accent?: 'US' | 'UK';
  speechRate?: number;
  onComplete?: () => void;
}

export const SwimmingChoiceCard: React.FC<SwimmingChoiceCardProps> = ({
  data,
  accent = 'US',
  speechRate = 1.0,
  onComplete,
}) => {
  const { isDark } = useTheme();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentRate, setCurrentRate] = useState<number>(speechRate);

  useEffect(() => {
    setCurrentRate(speechRate);
  }, [speechRate]);

  useEffect(() => {
    setSelectedId(null);
    setIsSubmitted(false);
    return () => {
      stopSpeaking();
    };
  }, [data.id]);

  const handleSpeak = (text: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    stopSpeaking();
    speakEnglish(text, currentRate, accent as 'US' | 'UK', () => {}, () => {}, 'female');
  };

  const handleSelectOption = (id: string) => {
    if (isSubmitted) return;
    playFeedbackSound('click');
    setSelectedId(id);
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
  };

  const isCorrect = isSubmitted && selectedId === data.correctAnswerId;

  return (
    <div className="w-full flex flex-col items-center gap-6 py-2">
      {/* Subtitle / Instructions banner */}
      <div className="w-full text-center sm:text-left">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Choose the correct answer.
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Elige la respuesta correcta para continuar.
        </p>
      </div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: Dialogue Reference (Reversible Card) */}
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
            accent={accent}
            speechRate={currentRate}
            onSpeechRateChange={setCurrentRate}
            compact
          />
        </div>

        {/* RIGHT COLUMN: Question and Options */}
        <div className="lg:col-span-6 flex flex-col">
          <div
            className={`w-full p-5 sm:p-7 rounded-2xl sm:rounded-3xl border shadow-xs transition-colors flex flex-col gap-5 ${
              isDark
                ? 'bg-slate-900 border-slate-800'
                : 'bg-white border-slate-200'
            }`}
          >
            {/* Question Header */}
            <div className="flex items-start justify-between gap-3 pb-3 border-b border-inherit/20">
              <div className="flex-1">
                <p className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
                  {data.question}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 italic">
                  {data.questionEs}
                </p>
              </div>

              <button
                type="button"
                onClick={(e) => handleSpeak(data.question, e)}
                className={`w-8 h-8 rounded-lg shrink-0 flex items-center justify-center transition-all cursor-pointer ${
                  isDark
                    ? 'bg-slate-800 hover:bg-slate-700 text-sky-400'
                    : 'bg-stone-50 hover:bg-stone-100 text-sky-600 border border-stone-200'
                }`}
                aria-label="Speaker"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            {/* Radio Options */}
            <div className="flex flex-col gap-3">
              {data.options.map((opt) => {
                const isSelected = selectedId === opt.id;
                const showSuccess = isSubmitted && opt.isCorrect;
                const showError = isSubmitted && isSelected && !opt.isCorrect;

                return (
                  <div
                    key={opt.id}
                    role="button"
                    tabIndex={isSubmitted ? -1 : 0}
                    onClick={() => {
                      if (!isSubmitted) handleSelectOption(opt.id);
                    }}
                    onKeyDown={(e) => {
                      if (!isSubmitted && (e.key === 'Enter' || e.key === ' ')) {
                        e.preventDefault();
                        handleSelectOption(opt.id);
                      }
                    }}
                    aria-disabled={isSubmitted}
                    className={`w-full p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border text-left transition-all flex items-center gap-3.5 select-none ${
                      isSubmitted ? 'cursor-default' : 'cursor-pointer'
                    } ${
                      showSuccess
                        ? 'bg-emerald-500/10 border-emerald-500 text-emerald-900 dark:text-emerald-200'
                        : showError
                        ? 'bg-rose-500/10 border-rose-500 text-rose-900 dark:text-rose-200'
                        : isSelected
                        ? 'bg-sky-500/10 border-sky-500 text-slate-900 dark:text-white shadow-xs'
                        : isDark
                        ? 'bg-slate-800/60 hover:bg-slate-800 border-slate-700/60 text-slate-200'
                        : 'bg-stone-50 hover:bg-stone-100 border-stone-200 text-slate-800'
                    }`}
                  >
                    {/* Custom Radio Icon */}
                    <div
                      className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-all ${
                        showSuccess
                          ? 'border-emerald-500 bg-emerald-500 text-white'
                          : showError
                          ? 'border-rose-500 bg-rose-500 text-white'
                          : isSelected
                          ? 'border-sky-500 bg-sky-500'
                          : 'border-slate-400 dark:border-slate-600'
                      }`}
                    >
                      {isSelected && !showSuccess && !showError && (
                        <div className="w-2 h-2 rounded-full bg-white" />
                      )}
                      {showSuccess && (
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      )}
                      {showError && <XCircle className="w-4 h-4 text-white" />}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm sm:text-base font-medium">
                        {opt.text}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 italic">
                        {opt.textEs}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => handleSpeak(opt.text, e)}
                      className={`w-7 h-7 rounded-lg shrink-0 flex items-center justify-center transition-all cursor-pointer opacity-70 hover:opacity-100 ${
                        isDark ? 'text-sky-400' : 'text-sky-600'
                      }`}
                      aria-label="Speaker"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Feedback & Actions */}
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
