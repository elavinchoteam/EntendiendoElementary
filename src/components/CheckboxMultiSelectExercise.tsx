import React, { useState } from 'react';
import { CheckCircle2, XCircle, RotateCcw, Volume2, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CheckboxMultiSelectExercise as MultiSelectExerciseType, ReadingStory } from '../types';
import { speakEnglish, stopSpeaking, playFeedbackSound } from '../utils/audio';
import { useTheme } from '../context/ThemeContext';
import { SpeedSelectorButton } from './SpeedSelectorButton';

interface CheckboxMultiSelectExerciseProps {
  exercise: MultiSelectExerciseType;
  accent?: 'US' | 'UK';
  speechRate?: number;
  onSuccess?: () => void;
}

export const CheckboxMultiSelectExercise: React.FC<CheckboxMultiSelectExerciseProps> = ({
  exercise,
  accent = 'US',
  speechRate = 1.0,
  onSuccess,
}) => {
  const { isDark } = useTheme();
  const safeAccent = accent === 'UK' ? 'UK' : 'US';
  const [currentRate, setCurrentRate] = useState(speechRate);
  const [isPlayingStory, setIsPlayingStory] = useState(false);
  const [isStoryFlipped, setIsStoryFlipped] = useState(false);

  // Selected option IDs
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [hasChecked, setHasChecked] = useState(false);
  const [flippedOptionIds, setFlippedOptionIds] = useState<string[]>([]);

  const story: ReadingStory | undefined = exercise.story;

  const handleSpeedChange = (newRate: number) => {
    setCurrentRate(newRate);
    if (isPlayingStory && story) {
      stopSpeaking();
      const fullText = story.audioText || story.paragraphsEn.join(' ');
      speakEnglish(
        fullText,
        newRate,
        safeAccent,
        () => setIsPlayingStory(true),
        () => setIsPlayingStory(false),
        'female'
      );
    }
  };

  const handleToggleStoryAudio = () => {
    if (!story) return;
    if (isPlayingStory) {
      stopSpeaking();
      setIsPlayingStory(false);
      return;
    }
    const fullText = story.audioText || story.paragraphsEn.join(' ');
    setIsPlayingStory(true);
    speakEnglish(
      fullText,
      currentRate,
      safeAccent,
      () => setIsPlayingStory(true),
      () => setIsPlayingStory(false),
      'female'
    );
  };

  const handleSpeakText = (text: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    stopSpeaking();
    setIsPlayingStory(false);
    speakEnglish(text, currentRate, safeAccent);
  };

  const handleToggleOptionFlip = (optId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    playFeedbackSound('flip');
    setFlippedOptionIds((prev) =>
      prev.includes(optId) ? prev.filter((id) => id !== optId) : [...prev, optId]
    );
  };

  const handleToggleOption = (optId: string) => {
    if (hasChecked) return;
    playFeedbackSound('click');
    setSelectedIds((prev) =>
      prev.includes(optId) ? prev.filter((id) => id !== optId) : [...prev, optId]
    );
  };

  const handleReset = () => {
    playFeedbackSound('click');
    setSelectedIds([]);
    setHasChecked(false);
  };

  const correctIds = exercise.options.filter((opt) => opt.isCorrect).map((opt) => opt.id);
  const isAllCorrect =
    hasChecked &&
    selectedIds.length === correctIds.length &&
    selectedIds.every((id) => correctIds.includes(id));

  const handleCheck = () => {
    if (selectedIds.length === 0) return;
    playFeedbackSound('click');
    setHasChecked(true);

    const isMatch =
      selectedIds.length === correctIds.length &&
      selectedIds.every((id) => correctIds.includes(id));

    if (isMatch) {
      playFeedbackSound('correct');
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
      onSuccess?.();
    } else {
      playFeedbackSound('wrong');
    }
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Top Instruction Banner */}
      <div
        className={`w-full rounded-2xl p-4 sm:p-5 border transition-colors flex items-center justify-between gap-4 shadow-xs ${
          isDark ? 'bg-[#151C33] border-white/10 text-white' : 'bg-white border-slate-200 text-slate-800'
        }`}
      >
        <div className="flex flex-col gap-0.5">
          <p className="text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-white leading-snug">
            {exercise.instructions}
          </p>
          {exercise.instructionsEs && (
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 italic">
              {exercise.instructionsEs}
            </p>
          )}
        </div>
        <button
          type="button"
          onClick={() => handleSpeakText(exercise.instructions)}
          className={`p-2.5 rounded-xl border transition-all cursor-pointer shrink-0 ${
            isDark
              ? 'bg-slate-800 hover:bg-slate-700 text-sky-400 border-white/10'
              : 'bg-white hover:bg-stone-100 text-sky-600 border-slate-200'
          }`}
          title="Escuchar instrucción"
          aria-label="Escuchar instrucción"
        >
          <Volume2 className="w-4 h-4" />
        </button>
      </div>

      {/* 2-Column Grid: Left (Story Card) & Right (Checkboxes) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Reversible Story Card */}
        {story && (
          <div className="lg:col-span-6 flex flex-col gap-3">
            <div className="perspective-1000 w-full min-h-[500px]">
              <div
                id={`story-card-${exercise.id}`}
                onClick={() => {
                  playFeedbackSound('flip');
                  setIsStoryFlipped((prev) => !prev);
                }}
                className={`relative w-full h-full min-h-[500px] rounded-2xl cursor-pointer select-none transition-transform duration-500 transform-style-3d border shadow-xs ${
                  isStoryFlipped ? 'rotate-y-180' : ''
                } ${
                  isStoryFlipped
                    ? isDark
                      ? 'bg-slate-900 border-emerald-500/40 text-emerald-100'
                      : 'bg-white border-emerald-300 text-emerald-950'
                    : isDark
                    ? 'bg-[#151C33] border-white/10 text-slate-100'
                    : 'bg-[#FCFBF8] border-stone-200/90 text-stone-900 shadow-stone-200/50'
                }`}
              >
                {/* Front Face: English Story */}
                <div className="absolute inset-0 p-5 sm:p-7 flex flex-col justify-between backface-hidden overflow-y-auto">
                  <div>
                    <div className="flex items-center justify-between pb-3 mb-4 border-b border-inherit/30">
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#009bd6] dark:text-sky-400 font-sans">
                          {story.title}
                        </h3>
                        {story.author && (
                          <p className="text-xs text-stone-500 dark:text-slate-400 italic">
                            {story.author}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <SpeedSelectorButton
                          currentRate={currentRate}
                          onRateChange={handleSpeedChange}
                          size="sm"
                        />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleStoryAudio();
                          }}
                          className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shadow-xs transition-all cursor-pointer ${
                            isPlayingStory
                              ? 'bg-sky-500 text-white ring-4 ring-sky-500/25 scale-105'
                              : isDark
                              ? 'bg-slate-800 hover:bg-slate-700 text-sky-400 border border-slate-600'
                              : 'bg-white hover:bg-stone-100 text-sky-600 border border-stone-300'
                          }`}
                          title={isPlayingStory ? 'Detener lectura' : 'Escuchar historia'}
                          aria-label="Audio"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-4 text-left font-serif leading-relaxed text-sm sm:text-base pr-1">
                      {story.paragraphsEn.map((para, idx) => (
                        <p
                          key={idx}
                          onClick={(e) => handleSpeakText(para, e)}
                          className="leading-relaxed hover:text-sky-600 dark:hover:text-sky-300 transition-colors cursor-pointer"
                          title="Haz clic para escuchar este párrafo"
                        >
                          {para}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Back Face: Spanish Translation */}
                <div className="absolute inset-0 p-5 sm:p-7 flex flex-col justify-between backface-hidden rotate-y-180 overflow-y-auto">
                  <div>
                    <div className="flex items-center justify-between pb-3 mb-4 border-b border-inherit/30">
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-emerald-600 dark:text-emerald-400 font-sans">
                          {story.titleEs}
                        </h3>
                        {story.authorEs && (
                          <p className="text-xs text-emerald-700/80 dark:text-emerald-300/80 italic">
                            {story.authorEs}
                          </p>
                        )}
                      </div>
                      <SpeedSelectorButton
                        currentRate={currentRate}
                        onRateChange={handleSpeedChange}
                        size="sm"
                      />
                    </div>

                    <div className="space-y-4 text-left font-serif italic leading-relaxed text-sm sm:text-base text-emerald-950 dark:text-emerald-100 pr-1">
                      {story.paragraphsEs.map((para, idx) => (
                        <p key={idx} className="leading-relaxed">
                          {para}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Right Column: Checkbox Options */}
        <div className={`${story ? 'lg:col-span-6' : 'lg:col-span-12'} flex flex-col gap-4`}>
          <div
            className={`rounded-2xl border p-5 sm:p-6 transition-colors shadow-xs ${
              isDark ? 'bg-[#151C33] border-white/10' : 'bg-white border-slate-200'
            }`}
          >
            <div className="flex flex-col gap-3">
              {exercise.options.map((opt) => {
                const isSelected = selectedIds.includes(opt.id);
                const isFlipped = flippedOptionIds.includes(opt.id);
                const isCorrect = opt.isCorrect;

                let statusBorder = isDark ? 'border-slate-700/80' : 'border-slate-200';
                let statusBg = isDark ? 'bg-slate-800/60' : 'bg-slate-50/60';

                if (hasChecked) {
                  if (isSelected && isCorrect) {
                    statusBorder = 'border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300';
                  } else if (isSelected && !isCorrect) {
                    statusBorder = 'border-rose-500 bg-rose-500/10 text-rose-700 dark:text-rose-300';
                  } else if (!isSelected && isCorrect) {
                    statusBorder = 'border-amber-500/60 bg-amber-500/10 text-amber-700 dark:text-amber-300';
                  }
                } else if (isSelected) {
                  statusBorder = 'border-sky-500 ring-2 ring-sky-500/20';
                  statusBg = isDark ? 'bg-sky-500/10' : 'bg-sky-50/80';
                }

                return (
                  <div
                    key={opt.id}
                    onClick={() => handleToggleOption(opt.id)}
                    className={`rounded-xl border p-4 flex items-center justify-between gap-3 cursor-pointer transition-all select-none ${statusBorder} ${statusBg}`}
                  >
                    <div className="flex items-center gap-3.5 flex-1 min-w-0">
                      {/* Checkbox box */}
                      <div
                        className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors shrink-0 ${
                          isSelected
                            ? 'bg-sky-600 border-sky-600 text-white'
                            : isDark
                            ? 'border-slate-600 bg-slate-800'
                            : 'border-slate-300 bg-white'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>

                      {/* Option Text with flip support */}
                      <span
                        onClick={(e) => handleToggleOptionFlip(opt.id, e)}
                        className={`text-sm sm:text-base font-medium leading-snug cursor-pointer ${
                          isDark ? 'text-slate-200' : 'text-slate-800'
                        }`}
                        title="Haz clic en el texto para alternar traducción"
                      >
                        {isFlipped ? opt.textEs || opt.text : opt.text}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={(e) => handleSpeakText(opt.text, e)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-sky-500 transition-colors"
                        title="Pronunciar"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>

                      {hasChecked && (
                        <span>
                          {isSelected && isCorrect && (
                            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                          )}
                          {isSelected && !isCorrect && (
                            <XCircle className="w-5 h-5 text-rose-500" />
                          )}
                          {!isSelected && isCorrect && (
                            <span className="text-xs font-bold text-amber-500">
                              (Faltó marcar)
                            </span>
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Explanation when checked */}
            {hasChecked && exercise.explanation && (
              <div
                className={`mt-4 p-4 rounded-xl text-xs sm:text-sm leading-relaxed border ${
                  isAllCorrect
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-800 dark:text-emerald-300'
                    : 'bg-amber-500/10 border-amber-500/30 text-amber-800 dark:text-amber-300'
                }`}
              >
                <p className="font-semibold">{exercise.explanation}</p>
                {exercise.explanationEs && (
                  <p className="mt-1 italic opacity-90">{exercise.explanationEs}</p>
                )}
              </div>
            )}
          </div>

          {/* Action Buttons: Check / Reset */}
          <div className="flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={handleReset}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                isDark
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200 shadow-xs'
              }`}
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reiniciar</span>
            </button>

            <button
              type="button"
              onClick={handleCheck}
              disabled={selectedIds.length === 0}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md cursor-pointer ${
                selectedIds.length === 0
                  ? 'bg-slate-400/50 text-white/70 cursor-not-allowed'
                  : isAllCorrect
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                  : 'bg-sky-600 hover:bg-sky-500 text-white'
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
