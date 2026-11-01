import React, { useState } from 'react';
import { Check, RotateCcw, Volume2, RefreshCw, CheckCircle2, XCircle, Sparkles } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { playFeedbackSound, speakEnglish, stopSpeaking } from '../../utils/audio';
import { RadioQuestionData } from '../../data/dontDoThatData';
import { DontDoThatScenePlayer } from './DontDoThatScenePlayer';
import { ReversibleTextCard } from './ReversibleTextCard';

interface ActivityRadioQuestionProps {
  data: RadioQuestionData;
  speed: number;
  accent?: 'US' | 'UK';
}

export const ActivityRadioQuestion: React.FC<ActivityRadioQuestionProps> = ({
  data,
  speed,
  accent = 'US',
}) => {
  const { isDark } = useTheme();

  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isChecked, setIsChecked] = useState(false);
  const [flippedOptions, setFlippedOptions] = useState<Record<string, boolean>>({});
  const [isQuestionFlipped, setIsQuestionFlipped] = useState(false);

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

  const handlePlayOptionAudio = (textEn: string, e: React.MouseEvent) => {
    e.stopPropagation();
    stopSpeaking();
    playFeedbackSound('click');
    speakEnglish(textEn, speed, accent);
  };

  const handleToggleQuestionFlip = (e: React.MouseEvent) => {
    e.stopPropagation();
    playFeedbackSound('click');
    setIsQuestionFlipped(!isQuestionFlipped);
  };

  const handlePlayQuestionAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    stopSpeaking();
    playFeedbackSound('click');
    speakEnglish(data.questionEn, speed, accent);
  };

  const handleCheck = () => {
    if (!selectedOptionId) return;
    const isCorrect = selectedOptionId === data.correctOptionId;
    playFeedbackSound(isCorrect ? 'correct' : 'wrong');
    setIsChecked(true);
  };

  const handleReset = () => {
    playFeedbackSound('click');
    setSelectedOptionId(null);
    setIsChecked(false);
  };

  const isCurrentSelectionCorrect = selectedOptionId === data.correctOptionId;

  return (
    <div className="w-full flex flex-col gap-6 animate-in fade-in duration-200">
      {/* 1. Reversible Instruction Banner */}
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
          <DontDoThatScenePlayer
            speed={speed}
            accent={accent}
            highlightedLineId={data.highlightedLineId}
            showTranscriptInitially={true}
          />
        </div>

        {/* Right Column: Question & Radio Options */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          <div
            className={`p-5 rounded-2xl border shadow-sm ${
              isDark ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-200'
            }`}
          >
            {/* Question Header Card with Flip and Audio */}
            <div
              onClick={handleToggleQuestionFlip}
              className={`p-4 rounded-xl border mb-5 cursor-pointer transition-all ${
                isDark
                  ? 'bg-slate-900/60 border-slate-700 hover:border-sky-500/50'
                  : 'bg-slate-50 border-slate-200 hover:border-sky-400'
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex-1">
                  {!isQuestionFlipped ? (
                    <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-100">
                      {data.questionEn}
                    </h3>
                  ) : (
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                        Español
                      </span>
                      <h3 className="text-base sm:text-lg font-semibold text-emerald-800 dark:text-emerald-200">
                        {data.questionEs}
                      </h3>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                  {!isQuestionFlipped && (
                    <button
                      type="button"
                      onClick={handlePlayQuestionAudio}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-sky-600 hover:bg-sky-50 dark:hover:bg-sky-950/40 transition-colors"
                      title="Escuchar pregunta"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={handleToggleQuestionFlip}
                    className={`p-1.5 rounded-lg transition-colors ${
                      isQuestionFlipped
                        ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40'
                        : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700'
                    }`}
                    title={isQuestionFlipped ? 'Ver inglés' : 'Traducir al español'}
                  >
                    <RefreshCw className={`w-4 h-4 transition-transform duration-300 ${isQuestionFlipped ? 'rotate-180' : ''}`} />
                  </button>
                </div>
              </div>
            </div>

            {/* Radio Options List */}
            <div className="flex flex-col gap-3">
              {data.options.map((opt) => {
                const isSelected = selectedOptionId === opt.id;
                const isOptionFlipped = flippedOptions[opt.id];
                const isCorrectOption = opt.id === data.correctOptionId;

                let stateClasses = '';
                if (isChecked) {
                  if (isCorrectOption) {
                    stateClasses = 'border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-100 ring-1 ring-emerald-500';
                  } else if (isSelected && !isCorrectOption) {
                    stateClasses = 'border-rose-400 bg-rose-50/70 dark:bg-rose-950/40 text-rose-900 dark:text-rose-100 ring-1 ring-rose-400';
                  } else {
                    stateClasses = 'opacity-60 border-slate-200 dark:border-slate-700';
                  }
                } else if (isSelected) {
                  stateClasses = isDark
                    ? 'border-sky-500 bg-sky-950/40 text-slate-100 ring-1 ring-sky-500'
                    : 'border-sky-500 bg-sky-50/70 text-slate-900 ring-1 ring-sky-500';
                } else {
                  stateClasses = isDark
                    ? 'border-slate-700 bg-slate-900/40 hover:bg-slate-800/80 hover:border-slate-600 text-slate-200'
                    : 'border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 text-slate-700';
                }

                return (
                  <div
                    key={opt.id}
                    onClick={() => handleSelectOption(opt.id)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${stateClasses}`}
                  >
                    {/* Radio Indicator + Label */}
                    <div className="flex items-center gap-3.5 flex-1 min-w-0">
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-all ${
                          isSelected
                            ? 'border-sky-500 bg-sky-500 text-white'
                            : 'border-slate-400 dark:border-slate-600 bg-transparent'
                        }`}
                      >
                        {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                      </div>

                      <div className="flex-1 min-w-0">
                        {!isOptionFlipped ? (
                          <span className="text-sm sm:text-base font-medium leading-relaxed block">
                            {opt.textEn}
                          </span>
                        ) : (
                          <div className="flex flex-col">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                              Español
                            </span>
                            <span className="text-sm sm:text-base font-medium text-emerald-800 dark:text-emerald-200 leading-relaxed block">
                              {opt.textEs}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Audio & Flip Buttons */}
                    <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                      {!isOptionFlipped && (
                        <button
                          type="button"
                          onClick={(e) => handlePlayOptionAudio(opt.textEn, e)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-sky-600 hover:bg-sky-50 dark:hover:bg-sky-950/40 transition-colors"
                          title="Escuchar opción"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={(e) => handleToggleOptionFlip(opt.id, e)}
                        className={`p-1.5 rounded-lg transition-colors ${
                          isOptionFlipped
                            ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40'
                            : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700'
                        }`}
                        title={isOptionFlipped ? 'Ver inglés' : 'Traducir al español'}
                      >
                        <RefreshCw className={`w-4 h-4 transition-transform duration-300 ${isOptionFlipped ? 'rotate-180' : ''}`} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Check / Reset Buttons */}
            <div className="mt-5 flex items-center justify-between gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
              <button
                type="button"
                onClick={handleReset}
                disabled={!selectedOptionId}
                className="px-4 py-2 rounded-xl text-xs sm:text-sm font-medium border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5"
              >
                <RotateCcw className="w-4 h-4" />
                Reiniciar
              </button>

              <button
                type="button"
                onClick={handleCheck}
                disabled={!selectedOptionId || isChecked}
                className="px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-sky-600 hover:bg-sky-500 text-white shadow-md shadow-sky-600/20 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Check className="w-4 h-4" />
                Comprobar
              </button>
            </div>

            {/* Feedback & Explanation Card */}
            {isChecked && (
              <div
                className={`mt-4 p-4 rounded-xl border animate-in fade-in duration-200 flex flex-col gap-2 ${
                  isCurrentSelectionCorrect
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-700 text-emerald-900 dark:text-emerald-100'
                    : 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-700 text-rose-900 dark:text-rose-100'
                }`}
              >
                <div className="flex items-center gap-2 font-semibold text-sm">
                  {isCurrentSelectionCorrect ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                      <span>¡Correcto! Excelente deducción.</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                      <span>Respuesta incorrecta. Revisa la justificación:</span>
                    </>
                  )}
                </div>

                <div className="text-xs sm:text-sm leading-relaxed flex flex-col gap-1 mt-1 pl-7">
                  <p className="font-medium text-slate-800 dark:text-slate-200">
                    {data.explanationEn}
                  </p>
                  <p className="text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700 pt-1 mt-1 italic">
                    {data.explanationEs}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
