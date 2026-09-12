import React, { useState } from 'react';
import { Volume2, RotateCcw, CheckCircle2, XCircle } from 'lucide-react';
import { ACTIVITY_5_DATA } from '../../data/cleanHouseAgencyData';
import { useTheme } from '../../context/ThemeContext';
import { playFeedbackSound } from '../../utils/audio';
import { CleanHouseAdCard } from './CleanHouseAdCard';

interface CleanHouseActivity5Props {
  onPlayAudio: (text: string, id: string, e?: React.MouseEvent) => void;
  playingSentenceId: string | null;
  onSuccess?: () => void;
}

export const CleanHouseActivity5: React.FC<CleanHouseActivity5Props> = ({
  onPlayAudio,
  playingSentenceId,
  onSuccess,
}) => {
  const { isDark } = useTheme();
  const [isInstructionFlipped, setIsInstructionFlipped] = useState(false);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedBlankId, setSelectedBlankId] = useState<string | null>(null);
  const [flippedCards, setFlippedCards] = useState<{ [key: string]: boolean }>({});

  const totalBlanks = 4;
  const answeredCount = Object.keys(answers).length;
  const isComplete = answeredCount >= totalBlanks;

  const handleSelectWord = (word: string) => {
    if (!selectedBlankId || isSubmitted) return;
    playFeedbackSound('click');
    setAnswers((prev) => ({ ...prev, [selectedBlankId]: word }));
    setSelectedBlankId(null);
  };

  const handleCheck = () => {
    setIsSubmitted(true);
    let allOk = true;
    ACTIVITY_5_DATA.dialogue.forEach((turn) => {
      turn.parts.forEach((part) => {
        if (part.type === 'blank' && part.blankId) {
          if (answers[part.blankId]?.toLowerCase().trim() !== part.correctAnswer.toLowerCase().trim()) {
            allOk = false;
          }
        }
      });
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
    setSelectedBlankId(null);
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
            <span className="font-semibold text-sm sm:text-base">{ACTIVITY_5_DATA.instructionsEn}</span>
            <button
              type="button"
              onClick={(e) => onPlayAudio(ACTIVITY_5_DATA.instructionsEn, 'act5-instr', e)}
              className={`p-1.5 rounded-lg border transition-all shrink-0 cursor-pointer ${
                playingSentenceId === 'act5-instr'
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
              {ACTIVITY_5_DATA.instructionsEs}
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

        {/* Right Column: Dialogue */}
        <div className="lg:col-span-7 w-full flex flex-col gap-5">
          {/* Word Bank */}
          <div
            className={`p-4 rounded-2xl border ${
              isDark ? 'bg-slate-900/90 border-slate-700' : 'bg-white border-slate-200 shadow-xs'
            }`}
          >
            <div className="flex flex-wrap gap-2">
              {ACTIVITY_5_DATA.bank.map((item) => {
                const isUsed = Object.values(answers).includes(item.textEn);
                return (
                  <button
                    key={item.id}
                    type="button"
                    disabled={isSubmitted}
                    onClick={() => handleSelectWord(item.textEn)}
                    className={`px-3.5 py-2 rounded-xl border text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                      isUsed
                        ? 'opacity-40 line-through bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 cursor-not-allowed'
                        : selectedBlankId
                        ? 'bg-sky-600 text-white border-sky-500 hover:bg-sky-700 animate-pulse'
                        : isDark
                        ? 'bg-slate-800 border-slate-700 text-slate-200 hover:border-sky-500'
                        : 'bg-slate-50 border-slate-200 text-slate-800 hover:border-sky-500 hover:bg-sky-50'
                    }`}
                  >
                    {item.textEn}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dialogue Turns */}
          <div className="space-y-4">
            {ACTIVITY_5_DATA.dialogue.map((turn) => {
              const isFlipped = !!flippedCards[turn.id];

              return (
                <div key={turn.id} className="w-full perspective-1000">
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={(e) => toggleCardFlip(turn.id, e)}
                    className={`relative w-full rounded-2xl cursor-pointer select-none transition-transform duration-500 transform-style-3d border shadow-xs ${
                      isFlipped ? 'rotate-y-180' : ''
                    } ${
                      isDark
                        ? 'bg-slate-900 border-slate-700 text-white'
                        : 'bg-white border-slate-200 text-slate-900'
                    }`}
                  >
                    {/* Front: English */}
                    <div className="w-full p-4 sm:p-5 flex items-start justify-between gap-3 backface-hidden">
                      <div className="flex-1 text-sm sm:text-base leading-relaxed">
                        <span
                          className={`font-bold text-xs px-2 py-0.5 rounded-md mr-2 ${
                            turn.speaker === 'Mary'
                              ? 'bg-sky-100 dark:bg-sky-950/50 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800'
                              : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          {turn.speaker}:
                        </span>

                        {turn.parts.map((part, pIdx) => {
                          if (part.type === 'text') {
                            return <span key={pIdx}>{part.textEn}</span>;
                          }
                          const blankId = part.blankId!;
                          const val = answers[blankId];
                          const isCorrect = val?.toLowerCase().trim() === part.correctAnswer.toLowerCase().trim();
                          const isSelected = selectedBlankId === blankId;

                          return (
                            <span
                              key={pIdx}
                              onClick={(e) => {
                                e.stopPropagation();
                                if (isSubmitted) return;
                                if (val) {
                                  setAnswers((prev) => {
                                    const copy = { ...prev };
                                    delete copy[blankId];
                                    return copy;
                                  });
                                } else {
                                  setSelectedBlankId(isSelected ? null : blankId);
                                }
                              }}
                              className={`inline-flex items-center mx-1 my-0.5 px-2.5 py-0.5 rounded-lg text-sm font-semibold border cursor-pointer transition-all ${
                                isSubmitted
                                  ? isCorrect
                                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                                    : 'bg-rose-500/20 text-rose-400 border-rose-500/40'
                                  : isSelected
                                  ? 'bg-sky-500 text-white border-sky-400 ring-2 ring-sky-300'
                                  : val
                                  ? 'bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300 border-sky-300'
                                  : 'border-2 border-dashed border-sky-400/60 text-xs text-sky-500 font-mono'
                              }`}
                            >
                              {val || '[ _____ ]'}
                            </span>
                          );
                        })}
                      </div>

                      <button
                        type="button"
                        onClick={(e) => onPlayAudio(turn.fullEn, `act5-${turn.id}`, e)}
                        className={`p-1.5 rounded-lg border transition-all shrink-0 cursor-pointer ${
                          playingSentenceId === `act5-${turn.id}`
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
                    <div className="absolute inset-0 w-full h-full p-4 sm:p-5 flex items-start justify-between gap-3 backface-hidden rotate-y-180">
                      <div className="flex-1 text-sm sm:text-base leading-relaxed italic text-slate-700 dark:text-slate-200">
                        <span className="font-bold text-emerald-600 dark:text-emerald-400 mr-2 not-italic">
                          {turn.speakerEs}:
                        </span>
                        <span>{turn.fullEs}</span>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => onPlayAudio(turn.fullEn, `act5-back-${turn.id}`, e)}
                        className={`p-1.5 rounded-lg border transition-all shrink-0 cursor-pointer ${
                          playingSentenceId === `act5-back-${turn.id}`
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
                disabled={!isComplete}
                onClick={handleCheck}
                className={`px-6 py-2.5 rounded-xl font-bold text-sm shadow-md transition-all cursor-pointer ${
                  isComplete
                    ? 'bg-sky-600 hover:bg-sky-700 text-white active:scale-95'
                    : 'bg-slate-300 dark:bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                Comprobar
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
