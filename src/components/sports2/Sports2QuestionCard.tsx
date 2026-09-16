import React, { useState } from 'react';
import { Volume2, CheckCircle2, XCircle } from 'lucide-react';
import { SportsComprehensionQuestion } from '../../data/peopleCrazyAboutSportsData';
import { speakEnglish, stopSpeaking, playFeedbackSound } from '../../utils/audio';
import { useTheme } from '../../context/ThemeContext';
import { SpeedSelectorButton } from '../SpeedSelectorButton';

interface Sports2QuestionCardProps {
  question: SportsComprehensionQuestion;
  questionNumber: number;
  selectedOptionId?: string;
  onSelectOption: (optionId: string) => void;
  isChecked: boolean;
  accent?: 'US' | 'UK';
  speechRate?: number;
}

export const Sports2QuestionCard: React.FC<Sports2QuestionCardProps> = ({
  question,
  questionNumber,
  selectedOptionId,
  onSelectOption,
  isChecked,
  accent = 'US',
  speechRate = 1.0,
}) => {
  const { isDark } = useTheme();
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentRate, setCurrentRate] = useState<number>(speechRate);

  const isCorrect = selectedOptionId === question.correctOptionId;

  const handleToggleFlip = () => {
    playFeedbackSound('flip');
    setIsFlipped((prev) => !prev);
  };

  const handleSpeakQuestion = (e: React.MouseEvent) => {
    e.stopPropagation();
    stopSpeaking();
    speakEnglish(
      question.questionEn,
      currentRate,
      accent === 'UK' ? 'UK' : 'US',
      () => {},
      () => {},
      'male'
    );
  };

  const handleSpeakOption = (text: string, e: React.MouseEvent) => {
    e.stopPropagation();
    stopSpeaking();
    speakEnglish(
      text,
      currentRate,
      accent === 'UK' ? 'UK' : 'US',
      () => {},
      () => {},
      'female'
    );
  };

  return (
    <div
      onClick={handleToggleFlip}
      className="w-full perspective-1000 cursor-pointer select-none"
    >
      <div
        className={`grid grid-cols-1 grid-rows-1 transition-transform duration-500 transform-style-3d ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* Front: English */}
        <div
          className={`col-start-1 row-start-1 backface-hidden w-full rounded-2xl border p-5 sm:p-6 shadow-xs transition-colors flex flex-col relative ${
            isChecked
              ? isCorrect
                ? isDark
                  ? 'bg-emerald-950/20 border-emerald-500/50'
                  : 'bg-emerald-50/50 border-emerald-300'
                : isDark
                ? 'bg-rose-950/20 border-rose-500/50'
                : 'bg-rose-50/50 border-rose-300'
              : isDark
              ? 'bg-slate-900 border-slate-800 text-slate-100'
              : 'bg-white border-slate-200 text-slate-900'
          }`}
        >
          {/* Audio Controls */}
          <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
            <SpeedSelectorButton
              currentRate={currentRate}
              onRateChange={(r) => setCurrentRate(r)}
              size="sm"
            />
            <button
              type="button"
              onClick={handleSpeakQuestion}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-xs ${
                isDark
                  ? 'bg-slate-800 hover:bg-slate-700 text-sky-400 border border-slate-700'
                  : 'bg-stone-50 hover:bg-stone-100 text-sky-600 border border-stone-200'
              }`}
              aria-label="Speaker"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>

          {/* Question Text */}
          <div className="pr-20 mb-4">
            <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white leading-snug">
              <span className="text-sky-500 dark:text-sky-400 mr-2">
                {questionNumber}.
              </span>
              {question.questionEn}
            </h3>
          </div>

          {/* Options */}
          <div className="space-y-2.5">
            {question.options.map((opt) => {
              const isSelected = selectedOptionId === opt.id;
              const isOptCorrect = opt.id === question.correctOptionId;

              let optionStyle = isDark
                ? 'bg-slate-800/60 border-slate-700 hover:border-slate-600 text-slate-200'
                : 'bg-stone-50/80 border-slate-200 hover:border-slate-300 text-slate-800';

              if (isSelected) {
                optionStyle = isDark
                  ? 'bg-sky-950/40 border-sky-500 text-sky-200 ring-2 ring-sky-500/20'
                  : 'bg-sky-50 border-sky-400 text-sky-900 ring-2 ring-sky-200';
              }

              if (isChecked) {
                if (isOptCorrect) {
                  optionStyle = isDark
                    ? 'bg-emerald-950/40 border-emerald-500 text-emerald-200 font-medium ring-2 ring-emerald-500/20'
                    : 'bg-emerald-50 border-emerald-500 text-emerald-900 font-medium ring-2 ring-emerald-200';
                } else if (isSelected && !isCorrect) {
                  optionStyle = isDark
                    ? 'bg-rose-950/40 border-rose-500 text-rose-200 ring-2 ring-rose-500/20'
                    : 'bg-rose-50 border-rose-400 text-rose-900 ring-2 ring-rose-200';
                }
              }

              return (
                <div
                  key={opt.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectOption(opt.id);
                  }}
                  className={`w-full p-3 sm:p-3.5 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${optionStyle}`}
                >
                  <div className="flex items-center gap-3 pr-2">
                    {/* Radio circle */}
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'border-sky-500 bg-sky-500'
                          : isDark
                          ? 'border-slate-600'
                          : 'border-slate-300'
                      }`}
                    >
                      {isSelected && (
                        <div className="w-1.5 h-1.5 rounded-full bg-white" />
                      )}
                    </div>
                    <span className="text-sm sm:text-base leading-snug">
                      {opt.textEn}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={(e) => handleSpeakOption(opt.textEn, e)}
                      className="p-1 rounded-full text-slate-400 hover:text-sky-500 transition-colors"
                      aria-label="Speaker"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                    {isChecked && isOptCorrect && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    )}
                    {isChecked && isSelected && !isCorrect && (
                      <XCircle className="w-4 h-4 text-rose-500" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Back: Spanish */}
        <div
          className={`col-start-1 row-start-1 backface-hidden rotate-y-180 w-full rounded-2xl border p-5 sm:p-6 shadow-xs transition-colors flex flex-col relative ${
            isDark
              ? 'bg-slate-900 border-slate-800 text-slate-100'
              : 'bg-white border-slate-200 text-slate-900'
          }`}
        >
          {/* Question Text in Spanish */}
          <div className="pr-4 mb-4">
            <h3 className="text-base sm:text-lg font-semibold text-emerald-600 dark:text-emerald-400 leading-snug">
              <span className="mr-2">{questionNumber}.</span>
              {question.questionEs}
            </h3>
          </div>

          {/* Options in Spanish */}
          <div className="space-y-2.5">
            {question.options.map((opt) => {
              const isSelected = selectedOptionId === opt.id;
              const isOptCorrect = opt.id === question.correctOptionId;

              let optionStyle = isDark
                ? 'bg-slate-800/60 border-slate-700 text-slate-200'
                : 'bg-stone-50/80 border-slate-200 text-slate-800';

              if (isSelected) {
                optionStyle = isDark
                  ? 'bg-sky-950/40 border-sky-500 text-sky-200 font-medium'
                  : 'bg-sky-50 border-sky-400 text-sky-900 font-medium';
              }

              if (isChecked && isOptCorrect) {
                optionStyle = isDark
                  ? 'bg-emerald-950/40 border-emerald-500 text-emerald-200 font-medium'
                  : 'bg-emerald-50 border-emerald-500 text-emerald-900 font-medium';
              }

              return (
                <div
                  key={opt.id}
                  className={`w-full p-3 sm:p-3.5 rounded-xl border flex items-center justify-between ${optionStyle}`}
                >
                  <div className="flex items-center gap-3 pr-2">
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'border-sky-500 bg-sky-500'
                          : isDark
                          ? 'border-slate-600'
                          : 'border-slate-300'
                      }`}
                    >
                      {isSelected && (
                        <div className="w-1.5 h-1.5 rounded-full bg-white" />
                      )}
                    </div>
                    <span className="text-sm sm:text-base leading-snug italic">
                      {opt.textEs}
                    </span>
                  </div>
                  {isChecked && isOptCorrect && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
