import React, { useState, useEffect } from 'react';
import { Volume2, CheckCircle2, XCircle, RotateCcw, Check } from 'lucide-react';
import { ComparisonActivityData } from '../../data/comparisonEqualityData';
import { ComparisonMediaPlayerCard } from './ComparisonMediaPlayerCard';
import { ComparisonReversibleCard } from './ComparisonReversibleCard';
import { speakEnglish, stopSpeaking, playFeedbackSound } from '../../utils/audio';
import { useTheme } from '../../context/ThemeContext';

export interface ComparisonDragDropActivityProps {
  activity: ComparisonActivityData;
  accent?: 'US' | 'UK';
  speechRate?: number;
  onComplete?: () => void;
}

export const ComparisonDragDropActivity: React.FC<ComparisonDragDropActivityProps> = ({
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
      <ComparisonReversibleCard
        id={`instruction-card-${activity.id}`}
        textEn={activity.instructions}
        textEs={activity.instructionsEs}
        speechRate={speechRate}
        accent={accent}
        minHeightClass="min-h-[64px]"
      />

      {/* 2. Main 2-Column Layout */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* Left Column: Media Player + Reference Card */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <ComparisonMediaPlayerCard
            audioText={activity.referenceText}
            accent={accent}
            speechRate={speechRate}
            durationSeconds={5}
            imageUrl={activity.imageUrl}
          />

          <ComparisonReversibleCard
            id={`reference-card-${activity.id}`}
            textEn={activity.referenceText}
            textEs={activity.referenceTextEs}
            highlights={activity.referenceHighlights}
            speechRate={speechRate}
            accent={accent}
            minHeightClass="min-h-[80px]"
          />
        </div>

        {/* Right Column: Dialogue Card + Drag/Click Options */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {/* Reversible Dialogue Card */}
          <div className="w-full perspective-1000">
            <div
              id={`dialogue-card-${activity.id}`}
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
              {/* FRONT: Dialogue with blank drop zone (Clean solid card, NO gradients) */}
              <div
                className={`col-start-1 row-start-1 backface-hidden w-full min-h-[180px] sm:min-h-[200px] rounded-2xl p-5 sm:p-6 flex flex-col justify-between border ${
                  isDark
                    ? 'bg-slate-900 border-slate-700 text-white'
                    : 'bg-white border-slate-200 text-slate-900'
                }`}
              >
                <div className="flex flex-col gap-3 text-base sm:text-lg leading-relaxed font-medium">
                  {activity.dialogueLines.map((line, idx) => {
                    if (!line.hasBlank) {
                      return <p key={idx}>{line.textEn}</p>;
                    }

                    return (
                      <div key={idx} className="flex flex-wrap items-center gap-1.5 py-1">
                        {line.prefix && <span>{line.prefix}</span>}

                        {/* Drop Target Blank */}
                        <div
                          onDragOver={handleDragOver}
                          onDragLeave={handleDragLeave}
                          onDrop={handleDrop}
                          onClick={(e) => e.stopPropagation()}
                          className={`inline-flex items-center min-w-[130px] sm:min-w-[160px] min-h-[38px] px-3 py-1 rounded-xl border-2 transition-all font-bold ${
                            placedOption
                              ? isChecked
                                ? isCorrect
                                  ? 'bg-emerald-100 dark:bg-emerald-950/60 border-emerald-500 text-emerald-900 dark:text-emerald-200'
                                  : 'bg-rose-100 dark:bg-rose-950/60 border-rose-500 text-rose-900 dark:text-rose-200'
                                : 'bg-indigo-50 dark:bg-indigo-950/50 border-indigo-500 text-indigo-900 dark:text-indigo-200 shadow-xs'
                              : isDragOver
                              ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/30 scale-105'
                              : isDark
                              ? 'border-dashed border-slate-600 bg-slate-800/60 text-slate-400'
                              : 'border-dashed border-slate-300 bg-slate-50 text-slate-400'
                          }`}
                        >
                          {placedOption ? (
                            <div className="w-full flex items-center justify-between gap-2">
                              <span>{placedOption.text}</span>
                              {(!isChecked || !isCorrect) && (
                                <button
                                  type="button"
                                  onClick={handleRemovePlaced}
                                  className="text-xs opacity-70 hover:opacity-100 font-normal px-1 rounded hover:bg-black/10"
                                >
                                  ×
                                </button>
                              )}
                            </div>
                          ) : (
                            <span className="text-xs text-slate-400 italic">___________</span>
                          )}
                        </div>

                        {line.suffix && <span>{line.suffix}</span>}
                      </div>
                    );
                  })}
                </div>

                {/* Card footer: Speaker button only (no text, no flip button) */}
                <div className="w-full flex items-center justify-end pt-3 border-t border-inherit/40">
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

              {/* BACK: Spanish Dialogue (Solid card, NO gradients) */}
              <div
                className={`col-start-1 row-start-1 backface-hidden rotate-y-180 w-full min-h-[180px] sm:min-h-[200px] rounded-2xl p-5 sm:p-6 flex flex-col justify-between border ${
                  isDark
                    ? 'bg-slate-900 border-slate-700 text-slate-100'
                    : 'bg-white border-slate-200 text-slate-800'
                }`}
              >
                <div className="flex flex-col gap-3 text-base sm:text-lg leading-relaxed font-medium italic">
                  {activity.dialogueLines.map((line, idx) => (
                    <p key={idx}>{line.textEs}</p>
                  ))}
                </div>

                <div className="w-full flex items-center justify-end pt-3 border-t border-inherit/40">
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

          {/* Options Bank (Draggable / Clickable Pills) */}
          <div
            className={`w-full p-4 rounded-2xl border flex flex-wrap items-center justify-center gap-3 shadow-sm ${
              isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'
            }`}
          >
            {activity.options.map((opt) => {
              const isSelected = placedOptionId === opt.id;
              return (
                <div
                  key={opt.id}
                  draggable={!isSelected && (!isChecked || !isCorrect)}
                  onDragStart={(e) => handleDragStart(e, opt.id)}
                  onClick={() => handleOptionClick(opt.id)}
                  className={`px-4 py-2.5 rounded-xl font-semibold text-sm sm:text-base transition-all border select-none cursor-pointer shadow-xs ${
                    isSelected
                      ? 'opacity-40 border-dashed border-slate-400 pointer-events-none'
                      : isDark
                      ? 'bg-slate-800 hover:bg-slate-700 text-white border-slate-700 hover:border-indigo-500 hover:scale-105 active:scale-95'
                      : 'bg-slate-50 hover:bg-indigo-50 text-slate-900 border-slate-300 hover:border-indigo-400 hover:scale-105 active:scale-95'
                  }`}
                >
                  {opt.text}
                </div>
              );
            })}
          </div>

          {/* Action Buttons: Check & Clear */}
          <div className="w-full flex items-center justify-end gap-3 pt-1">
            {placedOptionId && !isChecked && (
              <button
                type="button"
                onClick={handleReset}
                className={`px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  isDark
                    ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
                }`}
              >
                <RotateCcw className="w-4 h-4" />
                <span>Borrar</span>
              </button>
            )}

            <button
              type="button"
              disabled={!placedOptionId}
              onClick={handleCheck}
              className={`px-6 py-2.5 rounded-xl font-bold text-sm sm:text-base shadow-md transition-all cursor-pointer flex items-center gap-2 ${
                !placedOptionId
                  ? 'opacity-50 cursor-not-allowed bg-slate-300 dark:bg-slate-800 text-slate-500'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/30 hover:scale-102 active:scale-98'
              }`}
            >
              <Check className="w-4 h-4" />
              <span>Comprobar</span>
            </button>
          </div>

          {/* Feedback & Explanation Card */}
          {isChecked && (
            <div
              className={`w-full p-4 sm:p-5 rounded-2xl border shadow-md animate-in fade-in duration-300 ${
                isCorrect
                  ? isDark
                    ? 'bg-slate-900 border-emerald-500/50 text-emerald-100'
                    : 'bg-emerald-50 border-emerald-300 text-emerald-950'
                  : isDark
                  ? 'bg-slate-900 border-rose-500/50 text-rose-100'
                  : 'bg-rose-50 border-rose-300 text-rose-950'
              }`}
            >
              <div className="flex items-start gap-3">
                {isCorrect ? (
                  <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-6 h-6 text-rose-500 shrink-0 mt-0.5" />
                )}

                <div className="flex-1 flex flex-col gap-1.5 text-sm sm:text-base">
                  <span className="font-bold">
                    {isCorrect ? '¡Excelente! Respuesta correcta.' : 'Inténtalo de nuevo.'}
                  </span>
                  <p className="text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
                    {activity.explanationEs}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                    {activity.explanationEn}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
