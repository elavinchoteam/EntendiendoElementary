import React, { useState } from 'react';
import { Volume2, CheckCircle2, XCircle, RotateCcw } from 'lucide-react';
import {
  SHOPRIGHT_TRUE_FALSE_STATEMENTS,
  TrueFalseStatement,
} from '../../data/saleAtShoprightData';
import { ShoprightPinnedAd } from './ShoprightPinnedAd';
import { useTheme } from '../../context/ThemeContext';
import { speakEnglish, stopSpeaking, playFeedbackSound } from '../../utils/audio';

interface Activity4TrueFalseTableProps {
  speechRate?: number;
  accent?: 'US' | 'UK';
  onNext?: () => void;
}

export const Activity4TrueFalseTable: React.FC<Activity4TrueFalseTableProps> = ({
  speechRate = 1.0,
  accent = 'US',
  onNext,
}) => {
  const { isDark } = useTheme();

  const [userAnswers, setUserAnswers] = useState<Record<string, 'True' | 'False' | "We don't know">>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
  const [playingId, setPlayingId] = useState<string | null>(null);

  const OPTIONS: Array<'True' | 'False' | "We don't know"> = ['True', 'False', "We don't know"];

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

  const toggleFlip = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFlippedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSelectOption = (statementId: string, choice: 'True' | 'False' | "We don't know") => {
    if (isSubmitted) return;
    playFeedbackSound('click');
    setUserAnswers((prev) => ({ ...prev, [statementId]: choice }));
  };

  const handleCheck = () => {
    setIsSubmitted(true);
    const allCorrect = SHOPRIGHT_TRUE_FALSE_STATEMENTS.every(
      (st) => userAnswers[st.id] === st.correctAnswer
    );
    if (allCorrect) {
      playFeedbackSound('correct');
    } else {
      playFeedbackSound('wrong');
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setUserAnswers({});
  };

  const isAllAnswered = SHOPRIGHT_TRUE_FALSE_STATEMENTS.every(
    (st) => !!userAnswers[st.id]
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
            Actividad 4: True, False, We Don't Know
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Choose the best answers for the questions below.
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

      {/* Main 2-Column Split: Ad on Left, Statements on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Authentic Pinned Ad */}
        <div className="lg:col-span-5">
          <ShoprightPinnedAd
            speechRate={speechRate}
            accent={accent}
            compact
          />
        </div>

        {/* Right Column: Statements */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {SHOPRIGHT_TRUE_FALSE_STATEMENTS.map((st, idx) => {
            const isFlipped = !!flippedCards[st.id];
            const chosen = userAnswers[st.id];
            const isPlaying = playingId === st.id;
            const isCorrect = chosen === st.correctAnswer;

            return (
              <div
                key={st.id}
                className="cursor-pointer perspective select-none"
                onClick={(e) => toggleFlip(st.id, e)}
              >
                <div
                  className={`w-full transition-transform duration-500 transform-style-3d relative ${
                    isFlipped ? 'rotate-y-180' : ''
                  }`}
                >
                  {/* FRONT: English Statement & Choices */}
                  <div
                    className={`w-full rounded-2xl border p-4 sm:p-5 flex flex-col gap-3 backface-hidden shadow-xs transition-colors ${
                      isDark
                        ? 'bg-slate-900 border-slate-700 text-white'
                        : 'bg-white border-slate-200 text-slate-900'
                    }`}
                  >
                    {/* Header with Statement Number & Audio Button */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start gap-2.5">
                        <span className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-indigo-800 dark:text-indigo-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <p className="font-semibold text-sm sm:text-base leading-snug">
                          {st.statementEn}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => handlePlay(st.statementEn, st.id, e)}
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

                    {/* Options Row */}
                    <div className="grid grid-cols-3 gap-2 pt-1">
                      {OPTIONS.map((opt) => {
                        const isSelected = chosen === opt;
                        const isCorrectOption = opt === st.correctAnswer;

                        let btnStyle =
                          isDark
                            ? 'bg-slate-800 border-slate-700 hover:bg-slate-750 text-slate-300'
                            : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700';

                        if (isSubmitted) {
                          if (isSelected) {
                            btnStyle = isCorrect
                              ? 'bg-emerald-600 text-white border-emerald-500 ring-2 ring-emerald-400'
                              : 'bg-red-600 text-white border-red-500 ring-2 ring-red-400';
                          } else if (isCorrectOption) {
                            btnStyle =
                              'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-400';
                          }
                        } else if (isSelected) {
                          btnStyle =
                            'bg-indigo-600 text-white border-indigo-500 shadow-md ring-2 ring-indigo-400';
                        }

                        return (
                          <button
                            key={opt}
                            type="button"
                            disabled={isSubmitted}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSelectOption(st.id, opt);
                            }}
                            className={`py-2 px-2 sm:px-3 rounded-xl text-xs sm:text-sm font-bold border transition-all cursor-pointer text-center ${btnStyle}`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* BACK: Spanish Translation & Explanation */}
                  <div
                    className={`absolute inset-0 w-full h-full rounded-2xl border p-4 sm:p-5 flex flex-col justify-between backface-hidden rotate-y-180 shadow-xs transition-colors ${
                      isDark
                        ? 'bg-slate-900 border-indigo-500/40 text-white'
                        : 'bg-white border-indigo-300 text-slate-900'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 border-b border-inherit/40 pb-2">
                      <div className="flex items-start gap-2.5">
                        <span className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-indigo-800 dark:text-indigo-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <p className="font-semibold text-sm sm:text-base leading-snug text-indigo-900 dark:text-indigo-300">
                          {st.statementEs}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => handlePlay(st.statementEn, st.id, e)}
                        className="p-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-indigo-600 dark:text-indigo-400"
                        aria-label="Audio"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="py-2 text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                      <span className="font-bold text-indigo-800 dark:text-indigo-400">
                        Respuesta correcta: {st.correctAnswer}
                      </span>
                      <p className="mt-1">{st.explanationEs}</p>
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
