import React, { useState } from 'react';
import { Volume2, CheckCircle2, XCircle, RotateCcw } from 'lucide-react';
import {
  SHOPRIGHT_READING_QUESTIONS,
  ShoprightQuestion,
} from '../../data/saleAtShoprightData';
import { ShoprightPinnedAd } from './ShoprightPinnedAd';
import { useTheme } from '../../context/ThemeContext';
import { speakEnglish, stopSpeaking, playFeedbackSound } from '../../utils/audio';

interface Activity6ReadingQuestionsProps {
  speechRate?: number;
  accent?: 'US' | 'UK';
  onNext?: () => void;
}

export const Activity6ReadingQuestions: React.FC<Activity6ReadingQuestionsProps> = ({
  speechRate = 1.0,
  accent = 'US',
  onNext,
}) => {
  const { isDark } = useTheme();

  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [flippedQuestions, setFlippedQuestions] = useState<Record<string, boolean>>({});
  const [playingId, setPlayingId] = useState<string | null>(null);

  const handlePlay = (text: string, id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (playingId === id && window.speechSynthesis?.speaking) {
      stopSpeaking();
      setPlayingId(null);
      return;
    }
    stopSpeaking();
    setPlayingId(id);
    speakEnglish(
      text,
      speechRate,
      accent || 'US',
      () => setPlayingId(id),
      () => setPlayingId(null)
    );
  };

  const toggleFlip = (qId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFlippedQuestions((prev) => ({ ...prev, [qId]: !prev[qId] }));
  };

  const handleSelectOption = (qId: string, optId: string) => {
    if (isSubmitted) return;
    playFeedbackSound('click');
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optId }));
  };

  const handleCheck = () => {
    setIsSubmitted(true);
    const allCorrect = SHOPRIGHT_READING_QUESTIONS.every(
      (q) => selectedAnswers[q.id] === q.correctAnswerId
    );
    if (allCorrect) {
      playFeedbackSound('correct');
    } else {
      playFeedbackSound('wrong');
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setSelectedAnswers({});
  };

  const isAllAnswered = SHOPRIGHT_READING_QUESTIONS.every(
    (q) => !!selectedAnswers[q.id]
  );

  return (
    <div className="w-full flex flex-col gap-6 max-w-6xl mx-auto">
      {/* Header */}
      <div
        className={`p-4 sm:p-5 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
          isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            Actividad 6: Reading Comprehension
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Read Shopright's ad, and then answer the questions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {isSubmitted && (
            <button
              type="button"
              onClick={handleReset}
              className="px-3.5 py-2 rounded-xl text-xs font-bold border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reiniciar</span>
            </button>
          )}

          {!isSubmitted ? (
            <button
              type="button"
              onClick={handleCheck}
              disabled={!isAllAnswered}
              className={`px-5 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-1.5 ${
                isAllAnswered
                  ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md'
                  : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Comprobar</span>
            </button>
          ) : (
            onNext && (
              <button
                type="button"
                onClick={onNext}
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span>Siguiente</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            )
          )}
        </div>
      </div>

      {/* Main 2-Column Split: Ad on Left, Questions on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Authentic Pinned Ad */}
        <div className="lg:col-span-5">
          <ShoprightPinnedAd
            speechRate={speechRate}
            accent={accent}
            compact
          />
        </div>

        {/* Right Column: 3 Questions */}
        <div className="lg:col-span-7 flex flex-col gap-5">
          {SHOPRIGHT_READING_QUESTIONS.map((q, idx) => {
            const isFlipped = !!flippedQuestions[q.id];
            const chosenOptId = selectedAnswers[q.id];
            const isPlaying = playingId === q.id;
            const isCorrect = chosenOptId === q.correctAnswerId;

            return (
              <div
                key={q.id}
                className="cursor-pointer perspective select-none"
                onClick={(e) => toggleFlip(q.id, e)}
              >
                <div
                  className={`w-full transition-transform duration-500 transform-style-3d relative ${
                    isFlipped ? 'rotate-y-180' : ''
                  }`}
                >
                  {/* FRONT: English Question & Radio Options */}
                  <div
                    className={`w-full rounded-2xl border p-5 flex flex-col gap-4 backface-hidden shadow-xs transition-colors ${
                      isDark
                        ? 'bg-slate-900 border-slate-700 text-white'
                        : 'bg-white border-slate-200 text-slate-900'
                    }`}
                  >
                    {/* Header with Question Number & Audio Button */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-2.5">
                        <span className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-indigo-800 dark:text-indigo-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <h3 className="font-bold text-base leading-snug">
                          {q.questionEn}
                        </h3>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => handlePlay(q.questionEn, q.id, e)}
                        className={`p-1.5 rounded-lg border transition-all cursor-pointer shrink-0 ${
                          isPlaying
                            ? 'bg-indigo-600 text-white border-indigo-500'
                            : isDark
                            ? 'bg-slate-800 hover:bg-slate-700 text-indigo-300 border-slate-700'
                            : 'bg-slate-50 hover:bg-indigo-50 text-indigo-900 border-slate-200'
                        }`}
                        aria-label="Audio"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Radio Options List */}
                    <div className="flex flex-col gap-2 pt-1">
                      {q.options.map((opt) => {
                        const isSelected = chosenOptId === opt.id;
                        const isCorrectOpt = opt.id === q.correctAnswerId;

                        let rowStyle =
                          isDark
                            ? 'bg-slate-800/80 border-slate-700 hover:bg-slate-800 text-slate-200'
                            : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-800';

                        if (isSubmitted) {
                          if (isSelected) {
                            rowStyle = isCorrect
                              ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-800 dark:text-emerald-300'
                              : 'bg-red-50 dark:bg-red-950/60 border-red-500 text-red-800 dark:text-red-300';
                          } else if (isCorrectOpt) {
                            rowStyle =
                              'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400 text-emerald-800 dark:text-emerald-300';
                          }
                        } else if (isSelected) {
                          rowStyle =
                            'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-500 text-indigo-900 dark:text-indigo-200 ring-1 ring-indigo-400';
                        }

                        return (
                          <div
                            key={opt.id}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSelectOption(q.id, opt.id);
                            }}
                            className={`p-3 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition-all ${rowStyle}`}
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                                  isSelected
                                    ? 'border-indigo-600 bg-indigo-600'
                                    : 'border-slate-400 dark:border-slate-500'
                                }`}
                              >
                                {isSelected && (
                                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                                )}
                              </div>
                              <span className="text-sm font-medium">{opt.en}</span>
                            </div>

                            <button
                              type="button"
                              onClick={(e) => handlePlay(opt.en, `${q.id}-${opt.id}`, e)}
                              className="p-1 rounded-lg text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                              aria-label="Audio"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* BACK: Spanish Translation & Explanation */}
                  <div
                    className={`absolute inset-0 w-full h-full rounded-2xl border p-5 flex flex-col justify-between backface-hidden rotate-y-180 shadow-xs transition-colors ${
                      isDark
                        ? 'bg-slate-900 border-indigo-500/40 text-white'
                        : 'bg-white border-indigo-300 text-slate-900'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3 border-b border-inherit/40 pb-2">
                      <div className="flex items-start gap-2.5">
                        <span className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-indigo-800 dark:text-indigo-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <h3 className="font-bold text-base leading-snug text-indigo-900 dark:text-indigo-300">
                          {q.questionEs}
                        </h3>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => handlePlay(q.questionEn, q.id, e)}
                        className="p-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-indigo-600 dark:text-indigo-400"
                        aria-label="Audio"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="py-2 text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                      <span className="font-bold text-indigo-800 dark:text-indigo-400">
                        Explicación:
                      </span>
                      <p className="mt-1">{q.explanationEs}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
