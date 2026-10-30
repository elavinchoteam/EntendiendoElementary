import React, { useState } from 'react';
import { Check, RotateCcw, Volume2, RefreshCw } from 'lucide-react';
import {
  ACTIVIDAD_4_OPPOSITES,
  OppositeSubQuestion,
} from '../../data/familyPicnicData';
import { useTheme } from '../../context/ThemeContext';
import { playFeedbackSound, speakEnglish, stopSpeaking } from '../../utils/audio';
import { FamilyPicnicStoryCard } from './FamilyPicnicStoryCard';
import { ReversibleTextCard } from './ReversibleTextCard';

interface Activity4OppositesProps {
  speed: number;
  accent?: 'US' | 'UK';
}

export const Activity4Opposites: React.FC<Activity4OppositesProps> = ({
  speed,
  accent = 'US',
}) => {
  const { isDark } = useTheme();

  // Selected options: { [subQId]: optionId }
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [isChecked, setIsChecked] = useState(false);
  const [flippedOptions, setFlippedOptions] = useState<Record<string, boolean>>({});

  const questions = ACTIVIDAD_4_OPPOSITES;
  const highlightedWords = ['stay', 'wonderful', 'yelled'];

  const handleSelectOption = (qId: string, optId: string) => {
    if (isChecked) return;
    playFeedbackSound('click');
    setSelectedOptions((prev) => ({
      ...prev,
      [qId]: optId,
    }));
  };

  const handleToggleOptionFlip = (optId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    playFeedbackSound('click');
    setFlippedOptions((prev) => ({
      ...prev,
      [optId]: !prev[optId],
    }));
  };

  const handlePlayOptionAudio = (textEn: string, e: React.MouseEvent) => {
    e.stopPropagation();
    stopSpeaking();
    playFeedbackSound('click');
    speakEnglish(textEn, speed, accent);
  };

  const totalQuestions = questions.length;
  const answeredCount = Object.keys(selectedOptions).length;

  const handleCheck = () => {
    if (answeredCount < totalQuestions) return;
    const allCorrect = questions.every(
      (q) => selectedOptions[q.id] === q.correctOptionId
    );
    playFeedbackSound(allCorrect ? 'correct' : 'wrong');
    setIsChecked(true);
  };

  const handleReset = () => {
    playFeedbackSound('click');
    setSelectedOptions({});
    setIsChecked(false);
  };

  return (
    <div className="w-full flex flex-col gap-5 animate-in fade-in duration-200">
      {/* 1. Reversible Instruction Card */}
      <ReversibleTextCard
        textEn="Read about the family's picnic. Then find the opposite of each of the highlighted words."
        textEs="Lee sobre el picnic familiar. Luego encuentra el antónimo (opuesto) de cada una de las palabras resaltadas."
        speed={speed}
        accent={accent}
      />

      {/* 2. Main Two-Column Layout */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Story Card with Highlights */}
        <div className="lg:col-span-6">
          <FamilyPicnicStoryCard
            speed={speed}
            accent={accent}
            highlightedWords={highlightedWords}
          />
        </div>

        {/* Right Column: 3 Opposites Sub-Questions */}
        <div className="lg:col-span-6 flex flex-col gap-5">
          {questions.map((q, idx) => {
            const selectedOptId = selectedOptions[q.id];
            const isCorrect = selectedOptId === q.correctOptionId;

            return (
              <div
                key={q.id}
                className={`p-4 rounded-2xl border flex flex-col gap-3 shadow-xs ${
                  isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'
                }`}
              >
                {/* Prompt Card: Reversible */}
                <ReversibleTextCard
                  textEn={q.promptEn}
                  textEs={q.promptEs}
                  speed={speed}
                  accent={accent}
                  minHeightClass="min-h-[50px]"
                  childrenFront={
                    <p className="text-xs sm:text-sm font-semibold">
                      <span className="text-sky-600 font-mono mr-1.5">{idx + 1}.</span>
                      {q.promptEn.split(q.highlightedWord).map((chunk, i, arr) => (
                        <React.Fragment key={i}>
                          {chunk}
                          {i < arr.length - 1 && (
                            <span className="bg-yellow-300 dark:bg-yellow-500/40 text-slate-900 dark:text-yellow-100 font-bold px-1 rounded">
                              {q.highlightedWord}
                            </span>
                          )}
                        </React.Fragment>
                      ))}
                    </p>
                  }
                />

                {/* Options */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {q.options.map((opt) => {
                    const isSelected = selectedOptId === opt.id;
                    const isOptCorrect = opt.id === q.correctOptionId;
                    const isFlipped = Boolean(flippedOptions[opt.id]);

                    return (
                      <div
                        key={opt.id}
                        onClick={() => handleSelectOption(q.id, opt.id)}
                        className={`p-2.5 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between gap-1.5 ${
                          isChecked
                            ? isOptCorrect
                              ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-200 font-bold'
                              : isSelected
                              ? 'border-rose-500 bg-rose-50 dark:bg-rose-950/30 text-rose-900 dark:text-rose-200'
                              : 'opacity-50 border-slate-200 dark:border-slate-700'
                            : isSelected
                            ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/40 text-sky-900 dark:text-sky-100 shadow-sm font-semibold'
                            : isDark
                            ? 'bg-slate-800 border-slate-700 hover:border-slate-600 text-slate-200'
                            : 'bg-white border-slate-200 hover:border-slate-300 text-slate-800'
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0 flex-1">
                          <div
                            className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                              isSelected
                                ? isChecked
                                  ? isOptCorrect
                                    ? 'border-emerald-500 bg-emerald-500'
                                    : 'border-rose-500 bg-rose-500'
                                  : 'border-sky-500 bg-sky-500'
                                : 'border-slate-400 bg-transparent'
                            }`}
                          >
                            {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </div>
                          <span className="text-xs truncate">
                            {isFlipped ? (
                              <span className="italic text-emerald-700 dark:text-emerald-300">
                                {opt.textEs}
                              </span>
                            ) : (
                              opt.textEn
                            )}
                          </span>
                        </div>

                        <div className="shrink-0 flex items-center">
                          <button
                            type="button"
                            onClick={(e) => handleToggleOptionFlip(opt.id, e)}
                            className="p-1 text-slate-400 hover:text-slate-600"
                            title="Voltear traducción"
                          >
                            <RefreshCw className="w-2.5 h-2.5" />
                          </button>
                          <button
                            type="button"
                            onClick={(e) => handlePlayOptionAudio(opt.textEn, e)}
                            className="p-1 text-sky-500 hover:text-sky-600"
                            title="Escuchar"
                          >
                            <Volume2 className="w-2.5 h-2.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {/* Action Buttons */}
          <div className="w-full flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-800">
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
              disabled={answeredCount < totalQuestions || isChecked}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold shadow-md transition-all cursor-pointer ${
                answeredCount < totalQuestions || isChecked
                  ? 'opacity-50 cursor-not-allowed bg-slate-300 dark:bg-slate-700 text-slate-500'
                  : 'bg-sky-600 hover:bg-sky-500 text-white shadow-sky-600/30 hover:scale-105 active:scale-95'
              }`}
            >
              <Check className="w-4 h-4" />
              <span>Comprobar ({answeredCount}/{totalQuestions})</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
