import React, { useState } from 'react';
import {
  Volume2,
  Sparkles,
  HelpCircle,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Check,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useTheme } from '../../context/ThemeContext';
import { NewsstandMediaCard } from './NewsstandMediaCard';
import { ACTIVITY_6_DATA } from '../../data/newsstandData';
import { playFeedbackSound } from '../../utils/audio';

interface NewsstandActivity6Props {
  currentRate: number;
  onRateChange?: (rate: number) => void;
  accent?: 'US' | 'UK';
  onPlayAudio: (text: string, id: string, e?: React.MouseEvent) => void;
  playingSentenceId: string | null;
  onSuccess?: () => void;
}

export const NewsstandActivity6: React.FC<NewsstandActivity6Props> = ({
  currentRate,
  onRateChange,
  accent = 'US',
  onPlayAudio,
  playingSentenceId,
  onSuccess,
}) => {
  const { isDark } = useTheme();

  // State
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [hasChecked, setHasChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // Reversible cards
  const [isInstructionFlipped, setIsInstructionFlipped] = useState(false);
  const [isPromptFlipped, setIsPromptFlipped] = useState(false);
  const [flippedOptionIds, setFlippedOptionIds] = useState<string[]>([]);

  const handleSelectOption = (optionId: string) => {
    if (hasChecked && isCorrect) return;
    setSelectedOptionId(optionId);
    playFeedbackSound('click');
  };

  const handleCheck = () => {
    if (!selectedOptionId) return;
    const correct = selectedOptionId === ACTIVITY_6_DATA.correctAnswerId;
    setIsCorrect(correct);
    setHasChecked(true);

    if (correct) {
      playFeedbackSound('correct');
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
      });
      if (onSuccess) onSuccess();
    } else {
      playFeedbackSound('wrong');
    }
  };

  const handleReset = () => {
    playFeedbackSound('click');
    setSelectedOptionId(null);
    setHasChecked(false);
    setIsCorrect(false);
  };

  const toggleOptionFlip = (optionId: string, e: React.MouseEvent) => {
    setFlippedOptionIds((prev) =>
      prev.includes(optionId) ? prev.filter((id) => id !== optionId) : [...prev, optionId]
    );
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Reversible Instruction Header Card */}
      <div className="w-full perspective-1000 select-none">
        <div
          onClick={() => setIsInstructionFlipped(!isInstructionFlipped)}
          className={`relative w-full rounded-2xl border p-4 sm:p-5 transition-transform duration-500 transform-style-3d cursor-pointer ${
            isInstructionFlipped ? 'rotate-y-180' : ''
          } ${
            isDark
              ? 'bg-slate-900 border-slate-700 text-slate-100'
              : 'bg-white border-slate-200 text-slate-900 shadow-xs'
          }`}
        >
          {/* Front: English */}
          <div className="w-full flex items-center justify-between gap-3 backface-hidden">
            <div className="flex items-center gap-3">
              <span className="p-2 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
                <HelpCircle className="w-5 h-5" />
              </span>
              <div>
                <span className="text-xs uppercase tracking-wider font-bold text-sky-600 dark:text-sky-400 block">
                  Actividad 6 · Mejor Respuesta
                </span>
                <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  {ACTIVITY_6_DATA.instructionsEn}
                </h2>
              </div>
            </div>

            <button
              type="button"
              onClick={(e) =>
                onPlayAudio(ACTIVITY_6_DATA.instructionsEn, 'act6-instruction-en', e)
              }
              className={`p-2 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                playingSentenceId === 'act6-instruction-en'
                  ? 'bg-sky-500 text-white animate-pulse border-sky-400'
                  : isDark
                  ? 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white'
                  : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200 hover:text-slate-900'
              }`}
              aria-label="Listen audio"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>

          {/* Back: Spanish */}
          <div className="absolute inset-0 w-full h-full p-4 sm:p-5 rounded-2xl flex items-center justify-between gap-3 backface-hidden rotate-y-180 bg-inherit">
            <div className="flex items-center gap-3">
              <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                <Sparkles className="w-5 h-5" />
              </span>
              <div>
                <span className="text-xs uppercase tracking-wider font-bold text-emerald-600 dark:text-emerald-400 block">
                  Actividad 6 · Traducción
                </span>
                <h2 className="text-base sm:text-lg font-bold italic text-slate-800 dark:text-slate-100">
                  {ACTIVITY_6_DATA.instructionsEs}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2-Column Layout */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Media Player & Transcript */}
        <div className="lg:col-span-6 w-full">
          <NewsstandMediaCard
            currentRate={currentRate}
            onRateChange={onRateChange}
            accent={accent}
            highlightCurrentSentence={true}
          />
        </div>

        {/* Right Column: Prompt & Options */}
        <div className="lg:col-span-6 w-full flex flex-col gap-4">
          {/* Reversible Prompt Card with Speaker */}
          <div className="w-full perspective-1000 select-none">
            <div
              onClick={() => setIsPromptFlipped(!isPromptFlipped)}
              className={`relative w-full rounded-2xl border p-4 sm:p-5 transition-transform duration-500 transform-style-3d cursor-pointer ${
                isPromptFlipped ? 'rotate-y-180' : ''
              } ${
                isDark
                  ? 'bg-slate-900 border-slate-700 text-slate-100'
                  : 'bg-white border-slate-200 text-slate-900 shadow-xs'
              }`}
            >
              {/* Front: English Prompt */}
              <div className="w-full flex items-center gap-3 backface-hidden">
                <button
                  type="button"
                  onClick={(e) =>
                    onPlayAudio(
                      ACTIVITY_6_DATA.promptQuestionEn,
                      'act6-prompt-audio',
                      e
                    )
                  }
                  className={`p-2 rounded-xl border flex items-center justify-center transition-all cursor-pointer shrink-0 ${
                    playingSentenceId === 'act6-prompt-audio'
                      ? 'bg-sky-500 text-white animate-pulse border-sky-400'
                      : isDark
                      ? 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white'
                      : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200 hover:text-slate-900'
                  }`}
                  aria-label="Listen audio"
                >
                  <Volume2 className="w-4 h-4" />
                </button>

                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  "{ACTIVITY_6_DATA.promptQuestionEn}"
                </h3>
              </div>

              {/* Back: Spanish Prompt */}
              <div className="absolute inset-0 w-full h-full p-4 sm:p-5 rounded-2xl flex items-center gap-3 backface-hidden rotate-y-180 bg-inherit">
                <h3 className="text-base sm:text-lg font-bold italic text-emerald-600 dark:text-emerald-400">
                  "{ACTIVITY_6_DATA.promptQuestionEs}"
                </h3>
              </div>
            </div>
          </div>

          {/* Options List */}
          <div className="space-y-3">
            {ACTIVITY_6_DATA.options.map((option) => {
              const isSelected = selectedOptionId === option.id;
              const isFlipped = flippedOptionIds.includes(option.id);

              let optionStyle = isDark
                ? 'bg-slate-900 hover:bg-slate-800/90 border-slate-800 text-slate-200'
                : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800 shadow-2xs';

              if (isSelected) {
                optionStyle = isDark
                  ? 'bg-sky-950/50 border-sky-500 text-white ring-2 ring-sky-500/50'
                  : 'bg-sky-50/80 border-sky-500 text-sky-950 ring-2 ring-sky-400/40';
              }

              if (hasChecked) {
                if (option.isCorrect) {
                  optionStyle = isDark
                    ? 'bg-emerald-950/60 border-emerald-500 text-white ring-2 ring-emerald-500/50'
                    : 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-2 ring-emerald-400/50';
                } else if (isSelected && !option.isCorrect) {
                  optionStyle = isDark
                    ? 'bg-rose-950/60 border-rose-500 text-white ring-2 ring-rose-500/50'
                    : 'bg-rose-50 border-rose-500 text-rose-950 ring-2 ring-rose-400/50';
                }
              }

              return (
                <div
                  key={option.id}
                  className="w-full perspective-1000 select-none min-h-[56px]"
                >
                  <div
                    onClick={(e) => toggleOptionFlip(option.id, e)}
                    className={`relative w-full min-h-[56px] rounded-xl border p-3 sm:p-3.5 transition-all duration-300 transform-style-3d cursor-pointer flex items-center justify-between gap-3 ${
                      isFlipped ? 'rotate-y-180' : ''
                    } ${optionStyle}`}
                  >
                    {/* Front: English option */}
                    <div className="w-full flex items-center justify-between gap-3 backface-hidden">
                      <div
                        className="flex items-center gap-3 flex-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectOption(option.id);
                        }}
                      >
                        {/* Radio Circle */}
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all shrink-0 ${
                            isSelected
                              ? 'border-sky-500 bg-sky-500 text-white'
                              : isDark
                              ? 'border-slate-600 bg-slate-800'
                              : 'border-slate-300 bg-white'
                          }`}
                        >
                          {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                        </div>

                        <button
                          type="button"
                          onClick={(e) =>
                            onPlayAudio(option.text, `opt-6-${option.id}`, e)
                          }
                          className={`p-1.5 rounded-lg border flex items-center justify-center transition-all cursor-pointer shrink-0 ${
                            playingSentenceId === `opt-6-${option.id}`
                              ? 'bg-sky-500 text-white animate-pulse border-sky-400'
                              : isDark
                              ? 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                              : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                          }`}
                          aria-label="Listen audio"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>

                        <span className="text-sm sm:text-base font-medium">
                          {option.text}
                        </span>
                      </div>
                    </div>

                    {/* Back: Spanish option */}
                    <div className="absolute inset-0 w-full h-full p-3 sm:p-3.5 rounded-xl flex items-center justify-between gap-3 backface-hidden rotate-y-180 bg-inherit">
                      <div
                        className="flex items-center gap-3 flex-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectOption(option.id);
                        }}
                      >
                        <span className="text-sm sm:text-base font-medium italic text-emerald-600 dark:text-emerald-400">
                          {option.textEs}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Buttons: Check / Reset */}
          <div className="flex items-center gap-3 pt-2">
            {!hasChecked ? (
              <button
                type="button"
                onClick={handleCheck}
                disabled={!selectedOptionId}
                className={`flex-1 py-3 px-6 rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  selectedOptionId
                    ? 'bg-sky-600 hover:bg-sky-500 text-white shadow-md hover:scale-[1.01] active:scale-[0.99]'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                }`}
              >
                <Check className="w-4 h-4" />
                <span>Comprobar</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleReset}
                className={`flex-1 py-3 px-6 rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all cursor-pointer border ${
                  isDark
                    ? 'bg-slate-800 hover:bg-slate-700 text-white border-slate-700'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
                }`}
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reintentar</span>
              </button>
            )}
          </div>

          {/* Explanation / Feedback Box */}
          {hasChecked && (
            <div
              className={`p-4 rounded-xl border flex flex-col gap-2 animate-in fade-in zoom-in-95 duration-200 ${
                isCorrect
                  ? isDark
                    ? 'bg-emerald-950/40 border-emerald-800 text-emerald-200'
                    : 'bg-emerald-50 border-emerald-200 text-emerald-900'
                  : isDark
                  ? 'bg-rose-950/40 border-rose-800 text-rose-200'
                  : 'bg-rose-50 border-rose-200 text-rose-900'
              }`}
            >
              <div className="flex items-center gap-2 font-bold text-sm">
                {isCorrect ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>¡Correcto!</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                    <span>Respuesta incorrecta. Inténtalo de nuevo.</span>
                  </>
                )}
              </div>

              <div className="text-xs sm:text-sm leading-relaxed space-y-1">
                <p className="font-medium">{ACTIVITY_6_DATA.explanation}</p>
                <p className="italic opacity-80">{ACTIVITY_6_DATA.explanationEs}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
