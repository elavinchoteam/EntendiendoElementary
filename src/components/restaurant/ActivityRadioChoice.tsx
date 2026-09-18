import React, { useState } from 'react';
import {
  Volume2,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ChevronRight,
} from 'lucide-react';
import { RestaurantActivityData } from '../../data/inTheRestaurantData';
import { RestaurantVideoPlayer } from '../RestaurantVideoPlayer';
import { useTheme } from '../../context/ThemeContext';
import { speakEnglish, stopSpeaking, playFeedbackSound } from '../../utils/audio';

export interface ActivityRadioChoiceProps {
  activity: RestaurantActivityData;
  accent?: 'US' | 'UK';
  speechRate?: number;
  onNext?: () => void;
}

export const ActivityRadioChoice: React.FC<ActivityRadioChoiceProps> = ({
  activity,
  accent = 'US',
  speechRate = 1.0,
  onNext,
}) => {
  const { isDark } = useTheme();

  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isInstructionFlipped, setIsInstructionFlipped] = useState(false);
  const [isQuestionFlipped, setIsQuestionFlipped] = useState(false);
  const [flippedOptionIds, setFlippedOptionIds] = useState<string[]>([]);
  const [playingKey, setPlayingKey] = useState<string | null>(null);

  const isCorrect = selectedOptionId === activity.correctOptionId;

  const handlePlayText = (text: string, key: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (playingKey === key && window.speechSynthesis?.speaking) {
      stopSpeaking();
      setPlayingKey(null);
      return;
    }
    stopSpeaking();
    setPlayingKey(key);
    speakEnglish(
      text,
      speechRate,
      accent === 'UK' ? 'UK' : 'US',
      () => setPlayingKey(key),
      () => setPlayingKey(null)
    );
  };

  const toggleOptionFlip = (optId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    playFeedbackSound('flip');
    setFlippedOptionIds((prev) =>
      prev.includes(optId) ? prev.filter((id) => id !== optId) : [...prev, optId]
    );
  };

  const handleSelect = (optId: string) => {
    if (isSubmitted) return;
    playFeedbackSound('click');
    setSelectedOptionId(optId);
  };

  const handleCheck = () => {
    if (!selectedOptionId) return;
    setIsSubmitted(true);
    if (selectedOptionId === activity.correctOptionId) {
      playFeedbackSound('correct');
    } else {
      playFeedbackSound('wrong');
    }
  };

  const handleReset = () => {
    setSelectedOptionId(null);
    setIsSubmitted(false);
    setFlippedOptionIds([]);
  };

  return (
    <div className="w-full flex flex-col gap-5">
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
            isDark
              ? 'bg-slate-900 border-slate-700 text-white'
              : 'bg-white border-slate-200 text-slate-900'
          }`}
        >
          {/* Front: English */}
          <div className="absolute inset-0 px-5 py-3 flex items-center justify-between backface-hidden">
            <span className="font-semibold text-sm sm:text-base">{activity.instructions}</span>
            <button
              type="button"
              onClick={(e) => handlePlayText(activity.instructions, 'instructions', e)}
              className={`p-1.5 rounded-lg border transition-all shrink-0 ${
                isDark
                  ? 'bg-slate-800 hover:bg-slate-700 text-sky-300 border-slate-700'
                  : 'bg-sky-50 hover:bg-sky-100 text-sky-600 border-sky-200'
              }`}
              aria-label="Audio"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>

          {/* Back: Spanish */}
          <div className="absolute inset-0 px-5 py-3 flex items-center justify-between backface-hidden rotate-y-180">
            <span className="font-semibold text-sm sm:text-base italic text-slate-700 dark:text-slate-200">
              {activity.instructionsEs}
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Column (Video + Transcript) & Right Column (Question + Options) */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (6 Cols) */}
        <div className="lg:col-span-6 w-full">
          <RestaurantVideoPlayer
            highlightedTurnIds={activity.highlightedTurnIds || []}
            showTranscriptByDefault={true}
            accent={accent}
            speechRate={speechRate}
          />
        </div>

        {/* Right Column (6 Cols) */}
        <div className="lg:col-span-6 w-full flex flex-col gap-4">
          {/* Question Card (Reversible) */}
          <div className="w-full perspective-1000">
            <div
              onClick={() => {
                playFeedbackSound('flip');
                setIsQuestionFlipped(!isQuestionFlipped);
              }}
              className={`relative w-full min-h-[64px] rounded-2xl cursor-pointer select-none transition-transform duration-500 transform-style-3d border shadow-xs ${
                isQuestionFlipped ? 'rotate-y-180' : ''
              } ${
                isDark
                  ? 'bg-slate-900 border-slate-700 text-white'
                  : 'bg-white border-slate-200 text-slate-900'
              }`}
            >
              {/* Front: English Question */}
              <div className="absolute inset-0 px-5 py-3.5 flex items-center justify-between backface-hidden">
                <h3 className="font-bold text-base sm:text-lg">{activity.question}</h3>
                <button
                  type="button"
                  onClick={(e) => handlePlayText(activity.question || '', 'question', e)}
                  className={`p-1.5 rounded-lg border transition-all shrink-0 ${
                    isDark
                      ? 'bg-slate-800 hover:bg-slate-700 text-sky-300 border-slate-700'
                      : 'bg-sky-50 hover:bg-sky-100 text-sky-600 border-sky-200'
                  }`}
                  aria-label="Audio"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              {/* Back: Spanish Question */}
              <div className="absolute inset-0 px-5 py-3.5 flex items-center justify-between backface-hidden rotate-y-180">
                <h3 className="font-bold text-base sm:text-lg italic text-slate-700 dark:text-slate-200">
                  {activity.questionEs}
                </h3>
              </div>
            </div>
          </div>

          {/* Options List (Each Reversible) */}
          <div className="flex flex-col gap-3">
            {(activity.options || []).map((opt) => {
              const isSelected = selectedOptionId === opt.id;
              const isFlipped = flippedOptionIds.includes(opt.id);
              const isOptionCorrect = opt.id === activity.correctOptionId;

              let borderState = isDark ? 'border-slate-700' : 'border-slate-200';
              let bgState = isDark ? 'bg-slate-900' : 'bg-white';

              if (isSubmitted) {
                if (isOptionCorrect) {
                  borderState = 'border-emerald-500 ring-2 ring-emerald-400';
                  bgState = isDark ? 'bg-emerald-950/30' : 'bg-emerald-50/70';
                } else if (isSelected && !isOptionCorrect) {
                  borderState = 'border-rose-500 ring-2 ring-rose-400';
                  bgState = isDark ? 'bg-rose-950/30' : 'bg-rose-50/70';
                }
              } else if (isSelected) {
                borderState = 'border-sky-500 ring-2 ring-sky-400';
                bgState = isDark ? 'bg-sky-950/30' : 'bg-sky-50/70';
              }

              return (
                <div key={opt.id} className="w-full perspective-1000">
                  <div
                    onClick={(e) => toggleOptionFlip(opt.id, e)}
                    className={`relative w-full min-h-[56px] rounded-2xl cursor-pointer select-none transition-transform duration-500 transform-style-3d border shadow-xs ${
                      isFlipped ? 'rotate-y-180' : ''
                    } ${borderState} ${bgState}`}
                  >
                    {/* Front: English */}
                    <div className="absolute inset-0 px-4 py-3 flex items-center justify-between backface-hidden">
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelect(opt.id);
                        }}
                        className="flex-1 flex items-center gap-3 cursor-pointer"
                      >
                        {/* Radio indicator */}
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                            isSelected
                              ? 'border-sky-500 bg-sky-500'
                              : isDark
                              ? 'border-slate-600'
                              : 'border-slate-300'
                          }`}
                        >
                          {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                        </div>
                        <span className="text-sm sm:text-base font-medium">{opt.text}</span>
                      </div>

                      {/* Speaker Button (Icon only) */}
                      <button
                        type="button"
                        onClick={(e) => handlePlayText(opt.text, opt.id, e)}
                        className={`p-1.5 rounded-lg border transition-all shrink-0 ml-2 cursor-pointer ${
                          isDark
                            ? 'bg-slate-800 hover:bg-slate-700 text-sky-300 border-slate-700'
                            : 'bg-sky-50 hover:bg-sky-100 text-sky-600 border-sky-200'
                        }`}
                        aria-label="Audio"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Back: Spanish Translation */}
                    <div className="absolute inset-0 px-4 py-3 flex items-center justify-between backface-hidden rotate-y-180">
                      <span className="text-sm sm:text-base font-medium italic text-slate-700 dark:text-slate-200">
                        {opt.textEs}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Buttons: Check / Retry / Next */}
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
                <span>Reintentar</span>
              </button>
            ) : (
              <div />
            )}

            {!isSubmitted ? (
              <button
                type="button"
                disabled={!selectedOptionId}
                onClick={handleCheck}
                className={`px-6 py-2.5 rounded-xl font-bold text-sm shadow-md transition-all cursor-pointer ${
                  selectedOptionId
                    ? 'bg-sky-600 hover:bg-sky-700 text-white active:scale-95'
                    : 'bg-slate-300 dark:bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                Comprobar
              </button>
            ) : (
              <button
                type="button"
                onClick={onNext}
                className="px-6 py-2.5 rounded-xl font-bold text-sm bg-indigo-600 hover:bg-indigo-700 text-white shadow-md transition-all cursor-pointer active:scale-95 flex items-center gap-2"
              >
                <span>Siguiente</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Explanation Card after Submit */}
          {isSubmitted && (
            <div
              className={`p-4 rounded-2xl border animate-in fade-in duration-200 flex flex-col gap-2 ${
                isCorrect
                  ? isDark
                    ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                    : 'bg-emerald-50 border-emerald-200 text-emerald-950'
                  : isDark
                  ? 'bg-rose-950/40 border-rose-500/40 text-rose-200'
                  : 'bg-rose-50 border-rose-200 text-rose-950'
              }`}
            >
              <div className="flex items-center gap-2 font-bold text-sm">
                {isCorrect ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                ) : (
                  <XCircle className="w-4 h-4 text-rose-500" />
                )}
                <span>{isCorrect ? '¡Correcto!' : 'Respuesta Incorrecta'}</span>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed">{activity.explanationEn}</p>
              <p className="text-xs sm:text-sm leading-relaxed italic text-slate-600 dark:text-slate-300">
                {activity.explanationEs}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
