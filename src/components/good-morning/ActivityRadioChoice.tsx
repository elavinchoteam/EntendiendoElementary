import React, { useState } from 'react';
import { Check, RotateCcw, Volume2, RefreshCw } from 'lucide-react';
import {
  GOOD_MORNING_RADIO_ACTIVITIES,
  RadioChoiceActivityData,
} from '../../data/goodMorningData';
import { useTheme } from '../../context/ThemeContext';
import { playFeedbackSound, speakEnglish, stopSpeaking } from '../../utils/audio';
import { GoodMorningVideoPlayer } from './GoodMorningVideoPlayer';
import { ReversibleTextCard } from './ReversibleTextCard';

interface ActivityRadioChoiceProps {
  activityNumber: number;
  speed: number;
  accent?: 'US' | 'UK';
}

export const ActivityRadioChoice: React.FC<ActivityRadioChoiceProps> = ({
  activityNumber,
  speed,
  accent = 'US',
}) => {
  const { isDark } = useTheme();

  const data: RadioChoiceActivityData | undefined =
    GOOD_MORNING_RADIO_ACTIVITIES[activityNumber];

  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isChecked, setIsChecked] = useState(false);
  const [showTranscript, setShowTranscript] = useState(true);

  // Flipped state for option translations: { [optId]: boolean }
  const [flippedOptions, setFlippedOptions] = useState<Record<string, boolean>>({});

  if (!data) {
    return <div className="p-4 text-center">Actividad no encontrada.</div>;
  }

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

  const isCorrect = selectedOptionId === data.correctOptionId;

  return (
    <div className="w-full flex flex-col gap-5 animate-in fade-in duration-200">
      {/* 1. Reversible Instruction Card */}
      <ReversibleTextCard
        textEn="Choose the correct answer."
        textEs="Elige la respuesta correcta."
        speed={speed}
        accent={accent}
      />

      {/* 2. Main Two-Column Layout */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Video Player with transcript */}
        <div className="lg:col-span-6 flex flex-col gap-3">
          <GoodMorningVideoPlayer
            speed={speed}
            accent={accent}
            showTranscript={showTranscript}
            onToggleTranscript={() => setShowTranscript((prev) => !prev)}
            highlightedLineId={
              activityNumber === 4
                ? 's11'
                : activityNumber === 10
                ? 's10'
                : undefined
            }
          />
        </div>

        {/* Right Column: Question + Options */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          {/* Question Card: Reversible */}
          <ReversibleTextCard
            textEn={data.questionEn}
            textEs={data.questionEs}
            speed={speed}
            accent={accent}
            minHeightClass="min-h-[70px]"
            className="shadow-xs"
          />

          {/* Radio Options List */}
          <div className="flex flex-col gap-2.5">
            {data.options.map((opt) => {
              const isSelected = selectedOptionId === opt.id;
              const isOptCorrect = opt.id === data.correctOptionId;
              const isFlipped = Boolean(flippedOptions[opt.id]);

              return (
                <div
                  key={opt.id}
                  onClick={() => handleSelectOption(opt.id)}
                  className={`p-3.5 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isChecked
                      ? isOptCorrect
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-200'
                        : isSelected
                        ? 'border-rose-500 bg-rose-50 dark:bg-rose-950/30 text-rose-900 dark:text-rose-200'
                        : isDark
                        ? 'bg-slate-900/60 border-slate-800 text-slate-400 opacity-60'
                        : 'bg-slate-50 border-slate-200 text-slate-400 opacity-60'
                      : isSelected
                      ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/40 text-sky-900 dark:text-sky-100 shadow-sm'
                      : isDark
                      ? 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-200'
                      : 'bg-white border-slate-200 hover:border-slate-300 text-slate-800 shadow-xs'
                  }`}
                >
                  {/* Left: Radio Circle + Option text */}
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                        isSelected
                          ? isChecked
                            ? isOptCorrect
                              ? 'border-emerald-500 bg-emerald-500'
                              : 'border-rose-500 bg-rose-500'
                            : 'border-sky-500 bg-sky-500'
                          : 'border-slate-400 dark:border-slate-600 bg-transparent'
                      }`}
                    >
                      {isSelected && (
                        <div className="w-2 h-2 rounded-full bg-white" />
                      )}
                    </div>

                    <span className="text-sm sm:text-base font-medium leading-relaxed truncate">
                      {isFlipped ? (
                        <span className="italic text-emerald-700 dark:text-emerald-300">
                          {opt.textEs}
                        </span>
                      ) : (
                        opt.textEn
                      )}
                    </span>
                  </div>

                  {/* Right: Audio and Flip Translation Buttons */}
                  <div className="shrink-0 flex items-center gap-1">
                    <button
                      type="button"
                      onClick={(e) => handleToggleOptionFlip(opt.id, e)}
                      className="p-1.5 rounded-lg border border-transparent hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
                      title="Ver traducción en español"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => handlePlayOptionAudio(opt.textEn, e)}
                      className="p-1.5 rounded-lg border border-transparent hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-sky-500 hover:text-sky-600 transition-colors"
                      title="Escuchar audio"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="w-full flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-800">
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
              disabled={!selectedOptionId || isChecked}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold shadow-md transition-all cursor-pointer ${
                !selectedOptionId || isChecked
                  ? 'opacity-50 cursor-not-allowed bg-slate-300 dark:bg-slate-700 text-slate-500'
                  : 'bg-sky-600 hover:bg-sky-500 text-white shadow-sky-600/30 hover:scale-105 active:scale-95'
              }`}
            >
              <Check className="w-4 h-4" />
              <span>Comprobar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
