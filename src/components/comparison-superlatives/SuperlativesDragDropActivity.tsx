import React, { useState, useEffect } from 'react';
import { Volume2, CheckCircle2, XCircle, RotateCcw, Check } from 'lucide-react';
import { ComparisonActivityData } from '../../data/comparisonSuperlativesData';
import { SuperlativesMediaPlayerCard } from './SuperlativesMediaPlayerCard';
import { SuperlativesReversibleCard } from './SuperlativesReversibleCard';
import { speakEnglish, stopSpeaking, playFeedbackSound } from '../../utils/audio';
import { useTheme } from '../../context/ThemeContext';

export interface SuperlativesDragDropActivityProps {
  activity: ComparisonActivityData;
  accent?: 'US' | 'UK';
  speechRate?: number;
  onComplete?: () => void;
}

export const SuperlativesDragDropActivity: React.FC<SuperlativesDragDropActivityProps> = ({
  activity,
  accent = 'US',
  speechRate = 1.0,
  onComplete,
}) => {
  const { isDark } = useTheme();

  const [placedOptionId, setPlacedOptionId] = useState<string | null>(null);
  const [isChecked, setIsChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isDialogueFlipped, setIsDialogueFlipped] = useState(false);
  const [isDialoguePlaying, setIsDialoguePlaying] = useState(false);

  // Reset states when switching activity
  useEffect(() => {
    setPlacedOptionId(null);
    setIsChecked(false);
    setIsCorrect(false);
    setIsDragOver(false);
    setIsDialogueFlipped(false);
    setIsDialoguePlaying(false);
    stopSpeaking();
  }, [activity.id]);

  const placedOption = activity.options.find((o) => o.id === placedOptionId);

  // Handle Drag & Drop
  const handleDragStart = (e: React.DragEvent, optionId: string) => {
    e.dataTransfer.setData('text/plain', optionId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const optionId = e.dataTransfer.getData('text/plain');
    if (optionId && activity.options.some((o) => o.id === optionId)) {
      setPlacedOptionId(optionId);
      setIsChecked(false);
      playFeedbackSound('click');
    }
  };

  // Click to place
  const handleOptionClick = (optionId: string) => {
    if (isChecked && isCorrect) return;
    if (placedOptionId === optionId) {
      setPlacedOptionId(null);
    } else {
      setPlacedOptionId(optionId);
    }
    setIsChecked(false);
    playFeedbackSound('click');
  };

  const handleRemovePlaced = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isChecked && isCorrect) return;
    setPlacedOptionId(null);
    setIsChecked(false);
    playFeedbackSound('click');
  };

  // Check answer
  const handleCheck = () => {
    if (!placedOptionId) return;
    const correct = placedOptionId === activity.correctAnswerId;
    setIsCorrect(correct);
    setIsChecked(true);

    if (correct) {
      playFeedbackSound('correct');
      if (onComplete) onComplete();
    } else {
      playFeedbackSound('wrong');
    }
  };

  // Reset / Clear
  const handleReset = () => {
    setPlacedOptionId(null);
    setIsChecked(false);
    setIsCorrect(false);
    playFeedbackSound('click');
  };

  // Speak full dialogue
  const handleSpeakDialogue = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isDialoguePlaying) {
      stopSpeaking();
      setIsDialoguePlaying(false);
      return;
    }
    stopSpeaking();
    setIsDialoguePlaying(true);
    speakEnglish(
      activity.audioPrompt,
      speechRate,
      accent as 'US' | 'UK',
      () => setIsDialoguePlaying(true),
      () => setIsDialoguePlaying(false)
    );
  };

  return (
    <div className="w-full flex flex-col gap-5">
      {/* 1. Reversible Instruction Card ("Drag the correct answer/s into place.") */}
      <SuperlativesReversibleCard
        id={`instruction-card-${activity.id}`}
        textEn={activity.instructions}
        textEs={activity.instructionsEs}
        speechRate={speechRate}
        accent={accent}
        minHeightClass="min-h-[64px]"
      />

      {/* 2. Main 2-Column Grid */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (5 cols): Media Player + Reference Dialogue Card */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <SuperlativesMediaPlayerCard
            audioText={activity.referenceText}
            accent={accent}
            speechRate={speechRate}
            durationSeconds={7}
            imageUrl={activity.imageUrl}
          />

          {/* Reference Dialogue Card (Reversible, Solid, Speaker icon only) */}
          <SuperlativesReversibleCard
            id={`reference-card-${activity.id}`}
            textEn={activity.referenceText}
            textEs={activity.referenceTextEs}
            highlights={activity.referenceHighlights}
            speechRate={speechRate}
            accent={accent}
            minHeightClass="min-h-[110px]"
          />
        </div>

        {/* Right Column (7 cols): Dialogue Card with Drop Slot + Options */}
        <div className="lg:col-span-7 flex flex-col gap-5">
          {/* Dialogue Interactive Reversible Card */}
          <div className="w-full perspective-1000">
            <div
              role="button"
              tabIndex={0}
              onClick={() => setIsDialogueFlipped((prev) => !prev)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setIsDialogueFlipped((prev) => !prev);
                }
              }}
              className={`grid grid-cols-1 grid-rows-1 w-full rounded-2xl transition-transform duration-500 transform-style-3d cursor-pointer shadow-md select-none ${
                isDialogueFlipped ? 'rotate-y-180' : ''
              }`}
            >
              {/* FRONT: Dialogue with blank target (Solid background, NO gradients) */}
              <div
                className={`col-start-1 row-start-1 backface-hidden w-full min-h-[160px] rounded-2xl p-5 flex flex-col justify-between border ${
                  isDark
                    ? 'bg-slate-900 border-slate-700 text-white'
                    : 'bg-white border-slate-200 text-slate-900'
                } ${
                  isChecked
                    ? isCorrect
                      ? 'ring-2 ring-emerald-500 border-emerald-500'
                      : 'ring-2 ring-rose-500 border-rose-500'
                    : ''
                }`}
              >
                <div className="space-y-3 pr-2">
                  {activity.dialogueLines.map((line, idx) => {
                    if (line.hasBlank) {
                      return (
                        <div
                          key={idx}
                          className="text-base sm:text-lg leading-relaxed flex flex-wrap items-baseline gap-1.5"
                        >
                          {line.prefix && <span>{line.prefix}</span>}

                          {/* Drop / Click Target Slot */}
                          <span
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                            className={`inline-flex items-center min-w-[130px] sm:min-w-[160px] px-3 py-1 rounded-xl border-2 border-dashed font-semibold transition-all select-none ${
                              isDragOver
                                ? 'bg-indigo-500/20 border-indigo-400 scale-105'
                                : placedOption
                                ? isChecked
                                  ? isCorrect
                                    ? 'bg-emerald-500/15 border-emerald-500 text-emerald-600 dark:text-emerald-300 font-bold'
                                    : 'bg-rose-500/15 border-rose-500 text-rose-600 dark:text-rose-300 font-bold'
                                  : 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-400 text-indigo-700 dark:text-indigo-300 font-bold shadow-xs'
                                : isDark
                                ? 'bg-slate-800/80 border-slate-600 text-slate-400'
                                : 'bg-slate-100 border-slate-300 text-slate-400'
                            }`}
                          >
                            {placedOption ? (
                              <span className="flex items-center justify-between w-full gap-2">
                                <span>{placedOption.text}</span>
                                {!isChecked && (
                                  <button
                                    type="button"
                                    onClick={handleRemovePlaced}
                                    className="text-slate-400 hover:text-rose-500 text-xs px-1 cursor-pointer"
                                    title="Quitar"
                                  >
                                    ×
                                  </button>
                                )}
                              </span>
                            ) : (
                              <span className="text-xs uppercase tracking-wider font-mono mx-auto opacity-75">
                                [ respuesta ]
                              </span>
                            )}
                          </span>

                          {line.suffix && <span>{line.suffix}</span>}
                        </div>
                      );
                    }

                    return (
                      <p
                        key={idx}
                        className="text-base sm:text-lg leading-relaxed text-slate-700 dark:text-slate-200"
                      >
                        {line.textEn}
                      </p>
                    );
                  })}
                </div>

                {/* Footer of Card with Speaker Button */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800/80 mt-3">
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                    {isChecked ? (
                      isCorrect ? (
                        <span className="text-emerald-500 font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" /> Correcto
                        </span>
                      ) : (
                        <span className="text-rose-500 font-bold flex items-center gap-1">
                          <XCircle className="w-4 h-4" /> Inténtalo de nuevo
                        </span>
                      )
                    ) : null}
                  </div>

                  <button
                    type="button"
                    onClick={handleSpeakDialogue}
                    className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                      isDialoguePlaying
                        ? 'bg-indigo-600 text-white border-indigo-500 ring-2 ring-indigo-400'
                        : isDark
                        ? 'bg-slate-800 hover:bg-slate-700 text-indigo-400 border-slate-700'
                        : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border-indigo-200'
                    }`}
                    aria-label="Audio"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* BACK: Complete Spanish Translation (Solid background, NO gradients) */}
              <div
                className={`col-start-1 row-start-1 backface-hidden rotate-y-180 w-full min-h-[160px] rounded-2xl p-5 flex flex-col justify-between border ${
                  isDark
                    ? 'bg-slate-900 border-slate-700 text-slate-100'
                    : 'bg-white border-slate-200 text-slate-800'
                }`}
              >
                <div className="space-y-3 pr-2 italic">
                  {activity.dialogueLines.map((line, idx) => (
                    <p key={idx} className="text-base sm:text-lg leading-relaxed">
                      {line.textEs}
                    </p>
                  ))}
                </div>

                <div className="flex items-center justify-end pt-3 border-t border-slate-100 dark:border-slate-800/80 mt-3">
                  <button
                    type="button"
                    onClick={handleSpeakDialogue}
                    className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                      isDialoguePlaying
                        ? 'bg-indigo-600 text-white border-indigo-500 ring-2 ring-indigo-400'
                        : isDark
                        ? 'bg-slate-800 hover:bg-slate-700 text-indigo-400 border-slate-700'
                        : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border-indigo-200'
                    }`}
                    aria-label="Audio"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Draggable / Clickable Options */}
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Opciones
              </span>
              {placedOptionId && !isChecked && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-xs font-mono text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" /> Limpiar selección
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-2.5">
              {activity.options.map((opt) => {
                const isSelected = placedOptionId === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    draggable={!isChecked || !isCorrect}
                    onDragStart={(e) => handleDragStart(e, opt.id)}
                    onClick={() => handleOptionClick(opt.id)}
                    className={`px-4 py-2 rounded-xl font-medium text-sm sm:text-base border transition-all cursor-pointer select-none ${
                      isSelected
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-md scale-102 ring-2 ring-indigo-300'
                        : isDark
                        ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700 hover:border-slate-600'
                        : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-300 hover:border-slate-400 shadow-xs'
                    }`}
                  >
                    {opt.text}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action Check Buttons & Explanation */}
          <div className="flex flex-col gap-3 pt-1">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleCheck}
                disabled={!placedOptionId || (isChecked && isCorrect)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-bold text-sm uppercase tracking-wider transition-all cursor-pointer ${
                  !placedOptionId || (isChecked && isCorrect)
                    ? 'opacity-40 cursor-not-allowed bg-slate-300 dark:bg-slate-800 text-slate-500'
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md hover:shadow-lg'
                }`}
              >
                <Check className="w-4 h-4" />
                <span>Comprobar respuesta</span>
              </button>

              {isChecked && !isCorrect && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-4 py-3 rounded-xl border font-bold text-sm font-mono uppercase tracking-wider text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Reintentar
                </button>
              )}
            </div>

            {/* Explanation box after check */}
            {isChecked && (
              <div
                className={`p-4 rounded-xl border text-sm transition-all ${
                  isCorrect
                    ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800/60 text-emerald-900 dark:text-emerald-200'
                    : 'bg-rose-50 dark:bg-rose-950/30 border-rose-300 dark:border-rose-800/60 text-rose-900 dark:text-rose-200'
                }`}
              >
                <p className="font-semibold">{activity.explanationEs}</p>
                <p className="mt-1 text-xs opacity-90 italic">{activity.explanationEn}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
