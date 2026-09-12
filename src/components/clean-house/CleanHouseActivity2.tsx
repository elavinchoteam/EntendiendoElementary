import React, { useState } from 'react';
import { Volume2, RotateCcw, Check, CheckCircle2, XCircle } from 'lucide-react';
import { ACTIVITY_2_DATA } from '../../data/cleanHouseAgencyData';
import { useTheme } from '../../context/ThemeContext';
import { playFeedbackSound } from '../../utils/audio';
import { CleanHouseAdCard } from './CleanHouseAdCard';

interface CleanHouseActivity2Props {
  onPlayAudio: (text: string, id: string, e?: React.MouseEvent) => void;
  playingSentenceId: string | null;
  onSuccess?: () => void;
}

export const CleanHouseActivity2: React.FC<CleanHouseActivity2Props> = ({
  onPlayAudio,
  playingSentenceId,
  onSuccess,
}) => {
  const { isDark } = useTheme();
  const [isInstructionFlipped, setIsInstructionFlipped] = useState(false);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [flippedCards, setFlippedCards] = useState<{ [key: string]: boolean }>({});
  const [activeBlankKey, setActiveBlankKey] = useState<string | null>(null);

  const isAllAnswered = ACTIVITY_2_DATA.sentences.every((s) => !!answers[s.blankKey]);
  const isAllCorrect =
    isSubmitted &&
    ACTIVITY_2_DATA.sentences.every(
      (s) => answers[s.blankKey]?.toLowerCase().trim() === s.correctAnswer.toLowerCase().trim()
    );

  const handleSelectWord = (word: string) => {
    if (isSubmitted) return;
    playFeedbackSound('click');

    if (activeBlankKey) {
      setAnswers((prev) => ({ ...prev, [activeBlankKey]: word }));
      const nextEmpty = ACTIVITY_2_DATA.sentences.find(
        (s) => s.blankKey !== activeBlankKey && !answers[s.blankKey]
      );
      setActiveBlankKey(nextEmpty ? nextEmpty.blankKey : null);
    } else {
      const firstEmpty = ACTIVITY_2_DATA.sentences.find((s) => !answers[s.blankKey]);
      if (firstEmpty) {
        setAnswers((prev) => ({ ...prev, [firstEmpty.blankKey]: word }));
      }
    }
  };

  const handleCheck = () => {
    setIsSubmitted(true);
    let allOk = true;
    ACTIVITY_2_DATA.sentences.forEach((s) => {
      if (answers[s.blankKey]?.toLowerCase().trim() !== s.correctAnswer.toLowerCase().trim()) {
        allOk = false;
      }
    });

    if (allOk) {
      playFeedbackSound('correct');
      if (onSuccess) onSuccess();
    } else {
      playFeedbackSound('wrong');
    }
  };

  const handleReset = () => {
    setAnswers({});
    setIsSubmitted(false);
    setActiveBlankKey(null);
    playFeedbackSound('click');
  };

  const toggleCardFlip = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    playFeedbackSound('flip');
    setFlippedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="w-full flex flex-col gap-6 animate-in fade-in duration-300">
      {/* Top Reversible Instruction Card */}
      <div className="w-full perspective-1000">
        <div
          onClick={() => {
            playFeedbackSound('flip');
            setIsInstructionFlipped(!isInstructionFlipped);
          }}
          className={`relative w-full min-h-[58px] rounded-2xl cursor-pointer select-none transition-transform duration-500 transform-style-3d border shadow-xs ${
            isInstructionFlipped ? 'rotate-y-180' : ''
          } ${
            isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}
        >
          <div className="absolute inset-0 px-5 py-3 flex items-center justify-between backface-hidden">
            <span className="font-semibold text-sm sm:text-base">{ACTIVITY_2_DATA.instructionsEn}</span>
            <button
              type="button"
              onClick={(e) => onPlayAudio(ACTIVITY_2_DATA.instructionsEn, 'act2-instr', e)}
              className={`p-1.5 rounded-lg border transition-all shrink-0 cursor-pointer ${
                playingSentenceId === 'act2-instr'
                  ? 'bg-sky-500 text-white border-sky-400 ring-2 ring-sky-300'
                  : isDark
                  ? 'bg-slate-800 hover:bg-slate-700 text-sky-300 border-slate-700'
                  : 'bg-sky-50 hover:bg-sky-100 text-sky-600 border-sky-200'
              }`}
              aria-label="Audio"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>
          <div className="absolute inset-0 px-5 py-3 flex items-center justify-between backface-hidden rotate-y-180">
            <span className="font-semibold text-sm sm:text-base italic text-slate-700 dark:text-slate-200">
              {ACTIVITY_2_DATA.instructionsEs}
            </span>
          </div>
        </div>
      </div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Reference Ad */}
        <div className="lg:col-span-5 w-full">
          <CleanHouseAdCard
            onPlayAudio={onPlayAudio}
            playingSentenceId={playingSentenceId}
            compact
          />
        </div>

        {/* Right Column: Sentences & Word Bank */}
        <div className="lg:col-span-7 w-full flex flex-col gap-5">
          {/* Word Bank */}
          <div
            className={`p-4 rounded-2xl border ${
              isDark ? 'bg-slate-900/90 border-slate-700' : 'bg-white border-slate-200 shadow-xs'
            }`}
          >
            <div className="flex flex-wrap gap-2">
              {ACTIVITY_2_DATA.options.map((opt) => {
                const isUsed = Object.values(answers).includes(opt.textEn);
                return (
                  <button
                    key={opt.id}
                    type="button"
                    disabled={isSubmitted}
                    onClick={() => handleSelectWord(opt.textEn)}
                    className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium border transition-all cursor-pointer ${
                      isUsed
                        ? 'opacity-40 line-through bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 cursor-not-allowed'
                        : isDark
                        ? 'bg-slate-800 text-slate-200 border-slate-700 hover:border-sky-500 hover:text-white'
                        : 'bg-slate-50 text-slate-800 border-slate-200 hover:border-sky-500 hover:bg-sky-50'
                    }`}
                  >
                    {opt.textEn}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sentences List */}
          <div className="space-y-4">
            {ACTIVITY_2_DATA.sentences.map((sent) => {
              const currentVal = answers[sent.blankKey];
              const isCorrect = currentVal?.toLowerCase().trim() === sent.correctAnswer.toLowerCase().trim();
              const isFlipped = !!flippedCards[sent.id];
              const isCurrentBlankActive = activeBlankKey === sent.blankKey;
              const fullAudioText = `${sent.prefixEn} ${currentVal || sent.correctAnswer} ${sent.suffixEn}`;

              return (
                <div key={sent.id} className="w-full perspective-1000">
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={(e) => toggleCardFlip(sent.id, e)}
                    className={`relative w-full rounded-2xl cursor-pointer select-none transition-transform duration-500 transform-style-3d border shadow-xs ${
                      isFlipped ? 'rotate-y-180' : ''
                    } ${
                      isDark
                        ? 'bg-slate-900 border-slate-700 text-white'
                        : 'bg-white border-slate-200 text-slate-900'
                    }`}
                  >
                    {/* Front: English */}
                    <div className="w-full p-4 sm:p-5 flex items-center justify-between gap-3 backface-hidden">
                      <div className="flex-1 text-sm sm:text-base leading-relaxed">
                        <span>{sent.prefixEn} </span>
                        <span
                          onClick={(e) => {
                            e.stopPropagation();
                            if (isSubmitted) return;
                            if (currentVal) {
                              setAnswers((prev) => {
                                const copy = { ...prev };
                                delete copy[sent.blankKey];
                                return copy;
                              });
                            } else {
                              setActiveBlankKey(
                                isCurrentBlankActive ? null : sent.blankKey
                              );
                            }
                          }}
                          className={`inline-flex items-center mx-1 px-3 py-1 rounded-lg text-sm font-semibold border transition-all cursor-pointer ${
                            isSubmitted
                              ? isCorrect
                                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                                : 'bg-rose-500/20 text-rose-400 border-rose-500/40'
                              : isCurrentBlankActive
                              ? 'bg-sky-500 text-white border-sky-400 ring-2 ring-sky-300'
                              : currentVal
                              ? 'bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300 border-sky-300'
                              : 'border-2 border-dashed border-sky-400/60 text-xs text-sky-500 font-mono py-1.5'
                          }`}
                        >
                          {currentVal || '[ _____ ]'}
                        </span>
                        <span> {sent.suffixEn}</span>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => onPlayAudio(fullAudioText, `act2-${sent.id}`, e)}
                        className={`p-1.5 rounded-lg border transition-all shrink-0 cursor-pointer ${
                          playingSentenceId === `act2-${sent.id}`
                            ? 'bg-sky-500 text-white border-sky-400 ring-2 ring-sky-300'
                            : isDark
                            ? 'bg-slate-800 hover:bg-slate-700 text-sky-300 border-slate-700'
                            : 'bg-sky-50 hover:bg-sky-100 text-sky-600 border-sky-200'
                        }`}
                        aria-label="Audio"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Back: Spanish */}
                    <div className="absolute inset-0 w-full h-full p-4 sm:p-5 flex items-center justify-between gap-3 backface-hidden rotate-y-180">
                      <p className="flex-1 text-sm sm:text-base leading-relaxed italic text-slate-700 dark:text-slate-200">
                        {sent.prefixEs} <span className="underline font-semibold">{sent.correctAnswerEs}</span> {sent.suffixEs}
                      </p>
                      <button
                        type="button"
                        onClick={(e) => onPlayAudio(fullAudioText, `act2-back-${sent.id}`, e)}
                        className={`p-1.5 rounded-lg border transition-all shrink-0 cursor-pointer ${
                          playingSentenceId === `act2-back-${sent.id}`
                            ? 'bg-sky-500 text-white border-sky-400 ring-2 ring-sky-300'
                            : isDark
                            ? 'bg-slate-800 hover:bg-slate-700 text-sky-300 border-slate-700'
                            : 'bg-sky-50 hover:bg-sky-100 text-sky-600 border-sky-200'
                        }`}
                        aria-label="Audio"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action buttons */}
          <div className="mt-2 flex items-center justify-between gap-3">
            {isSubmitted ? (
              <button
                type="button"
                onClick={handleReset}
                className={`px-4 py-2 rounded-xl border text-xs sm:text-sm font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                  isDark
                    ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
                }`}
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reiniciar</span>
              </button>
            ) : (
              <div />
            )}

            {!isSubmitted && (
              <button
                type="button"
                disabled={!isAllAnswered}
                onClick={handleCheck}
                className={`px-6 py-2.5 rounded-xl font-bold text-sm shadow-md transition-all cursor-pointer ${
                  isAllAnswered
                    ? 'bg-sky-600 hover:bg-sky-700 text-white active:scale-95'
                    : 'bg-slate-300 dark:bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                Comprobar
              </button>
            )}
          </div>

          {/* Feedback message */}
          {isSubmitted && (
            <div
              className={`p-4 rounded-2xl border flex items-center gap-3 animate-in fade-in duration-200 ${
                isAllCorrect
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
                  : 'bg-rose-500/10 border-rose-500/30 text-rose-600 dark:text-rose-400'
              }`}
            >
              {isAllCorrect ? (
                <CheckCircle2 className="w-5 h-5 shrink-0" />
              ) : (
                <XCircle className="w-5 h-5 shrink-0" />
              )}
              <span className="text-sm font-semibold">
                {isAllCorrect
                  ? '¡Excelente! Todas las oraciones se completaron correctamente.'
                  : 'Algunas respuestas son incorrectas. Presiona "Reiniciar" para intentar de nuevo.'}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
