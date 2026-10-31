import React, { useState, useEffect } from 'react';
import {
  Volume2,
  CheckCircle,
  XCircle,
  RotateCcw,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { speakEnglish, playFeedbackSound, stopSpeaking } from '../../utils/audio';
import { ModalsCanActivityItem } from '../../data/modalsCanData';
import { ModalsCanScenePlayer } from './ModalsCanScenePlayer';
import { ReversibleTextCard } from './ReversibleTextCard';

interface ModalsCanDragExerciseProps {
  activity: ModalsCanActivityItem;
  speed?: number;
  accent?: 'US' | 'UK';
  onNext?: () => void;
  isLast?: boolean;
}

export const ModalsCanDragExercise: React.FC<ModalsCanDragExerciseProps> = ({
  activity,
  speed = 1.0,
  accent = 'US',
  onNext,
  isLast = false,
}) => {
  const { isDark } = useTheme();

  const [selectedChip, setSelectedChip] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isDraggingOver, setIsDraggingOver] = useState<boolean>(false);

  // Reset state when activity changes
  useEffect(() => {
    setSelectedChip(null);
    setIsSubmitted(false);
    setIsCorrect(null);
    setIsDraggingOver(false);
  }, [activity.id]);

  const handleSelectChip = (chip: string) => {
    if (isSubmitted && isCorrect) return;
    playFeedbackSound('click');
    setSelectedChip(chip);
    setIsSubmitted(false);
    setIsCorrect(null);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(false);
    if (isSubmitted && isCorrect) return;
    const chip = e.dataTransfer.getData('text/plain');
    if (chip && activity.chips.includes(chip)) {
      playFeedbackSound('click');
      setSelectedChip(chip);
      setIsSubmitted(false);
      setIsCorrect(null);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!isDraggingOver) setIsDraggingOver(true);
  };

  const handleDragLeave = () => {
    setIsDraggingOver(false);
  };

  const handleCheckAnswer = () => {
    if (!selectedChip) return;

    const correct = selectedChip.trim().toLowerCase() === activity.correctAnswer.trim().toLowerCase();
    setIsSubmitted(true);
    setIsCorrect(correct);

    if (correct) {
      playFeedbackSound('correct');
      // Speak the completed sentence
      stopSpeaking();
      speakEnglish(activity.fullSentence, speed, accent, undefined, undefined, 'male');
    } else {
      playFeedbackSound('wrong');
    }
  };

  const handleReset = () => {
    playFeedbackSound('click');
    setSelectedChip(null);
    setIsSubmitted(false);
    setIsCorrect(null);
  };

  const handleSpeakFull = (e: React.MouseEvent) => {
    e.stopPropagation();
    stopSpeaking();
    speakEnglish(activity.fullSentence, speed, accent, undefined, undefined, 'male');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner with Instruction */}
      <div
        className={`p-4 sm:p-5 rounded-2xl border ${
          isDark
            ? 'bg-slate-800/80 border-slate-700 text-slate-100'
            : 'bg-white border-slate-200 text-slate-800'
        } shadow-sm`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide bg-sky-100 text-sky-700 dark:bg-sky-950/70 dark:text-sky-300">
                Unidad 8 · Sección 5
              </span>
              <span className="text-xs text-slate-400 font-medium">
                Actividad {activity.number} de 11
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              {activity.instruction}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              {activity.instructionEs} (Arrastra la ficha o haz clic en ella)
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleSpeakFull}
              className={`px-3 py-1.5 rounded-xl border flex items-center gap-1.5 text-xs font-semibold shadow-xs transition-colors ${
                isDark
                  ? 'bg-slate-700 border-slate-600 text-sky-400 hover:bg-slate-600'
                  : 'bg-sky-50 border-sky-200 text-sky-700 hover:bg-sky-100'
              }`}
              title="Escuchar oración completa"
            >
              <Volume2 className="w-4 h-4" />
              <span>Escuchar</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main 2-Column Exercise Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Scene Preview & Dialogue */}
        <div className="lg:col-span-5 space-y-4">
          <ModalsCanScenePlayer speed={speed} accent={accent} compact />
        </div>

        {/* Right Column: Sentence & Chips */}
        <div className="lg:col-span-7 space-y-5">
          {/* Sentence Container */}
          <div
            className={`p-6 sm:p-7 rounded-2xl border min-h-[220px] flex flex-col justify-between shadow-sm transition-all ${
              isDark ? 'bg-slate-800/90 border-slate-700' : 'bg-white border-slate-200'
            }`}
          >
            {/* The Text Lines */}
            <div className="space-y-4 text-base sm:text-lg leading-relaxed text-slate-800 dark:text-slate-100 font-medium">
              {activity.dialogueLines ? (
                activity.dialogueLines.map((line, idx) => (
                  <div key={idx} className="flex flex-wrap items-center gap-2">
                    {line.text ? (
                      <span>— {line.text}</span>
                    ) : (
                      <>
                        <span>— {line.beforeBlank}</span>

                        {/* Blank / Drop Target */}
                        <div
                          onDrop={handleDrop}
                          onDragOver={handleDragOver}
                          onDragLeave={handleDragLeave}
                          onClick={() => selectedChip && !isCorrect && setSelectedChip(null)}
                          className={`inline-flex items-center justify-center min-w-[120px] sm:min-w-[140px] px-3 py-1.5 rounded-xl border-2 border-dashed transition-all cursor-pointer font-bold ${
                            selectedChip
                              ? isCorrect === true
                                ? 'bg-emerald-500 text-white border-emerald-600 shadow-sm'
                                : isCorrect === false
                                ? 'bg-rose-500 text-white border-rose-600 shadow-sm animate-shake'
                                : 'bg-sky-500 text-white border-sky-600 shadow-sm'
                              : isDraggingOver
                              ? 'bg-sky-100 dark:bg-sky-950/60 border-sky-500 scale-105'
                              : isDark
                              ? 'bg-slate-700/60 border-slate-600 text-slate-400 hover:border-slate-500'
                              : 'bg-slate-100 border-slate-300 text-slate-400 hover:border-slate-400'
                          }`}
                        >
                          {selectedChip ? (
                            <span>{selectedChip}</span>
                          ) : (
                            <span className="text-xs font-normal italic">suelta aquí</span>
                          )}
                        </div>

                        <span>{line.afterBlank}</span>
                      </>
                    )}
                  </div>
                ))
              ) : (
                <div className="flex flex-wrap items-center gap-2">
                  <span>{activity.sentenceBefore}</span>

                  {/* Blank / Drop Target */}
                  <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onClick={() => selectedChip && !isCorrect && setSelectedChip(null)}
                    className={`inline-flex items-center justify-center min-w-[120px] sm:min-w-[140px] px-3 py-1.5 rounded-xl border-2 border-dashed transition-all cursor-pointer font-bold ${
                      selectedChip
                        ? isCorrect === true
                          ? 'bg-emerald-500 text-white border-emerald-600 shadow-sm'
                          : isCorrect === false
                          ? 'bg-rose-500 text-white border-rose-600 shadow-sm animate-shake'
                          : 'bg-sky-500 text-white border-sky-600 shadow-sm'
                        : isDraggingOver
                        ? 'bg-sky-100 dark:bg-sky-950/60 border-sky-500 scale-105'
                        : isDark
                        ? 'bg-slate-700/60 border-slate-600 text-slate-400 hover:border-slate-500'
                        : 'bg-slate-100 border-slate-300 text-slate-400 hover:border-slate-400'
                    }`}
                  >
                    {selectedChip ? (
                      <span>{selectedChip}</span>
                    ) : (
                      <span className="text-xs font-normal italic">suelta aquí</span>
                    )}
                  </div>

                  <span>{activity.sentenceAfter}</span>
                </div>
              )}
            </div>

            {/* Status Feedback bar */}
            {isSubmitted && (
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-700/80">
                {isCorrect ? (
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-emerald-600 dark:text-emerald-400">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 shrink-0" />
                      <span className="font-bold text-sm">¡Excelente! Respuesta correcta.</span>
                    </div>
                    {onNext && !isLast && (
                      <button
                        type="button"
                        onClick={onNext}
                        className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-colors"
                      >
                        <span>Siguiente actividad</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-rose-600 dark:text-rose-400">
                    <div className="flex items-center gap-2">
                      <XCircle className="w-5 h-5 shrink-0" />
                      <span className="font-bold text-sm">Inténtalo de nuevo. Puedes elegir otra opción.</span>
                    </div>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="px-3.5 py-1.5 rounded-xl border border-rose-200 dark:border-rose-800 text-xs font-bold hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors flex items-center justify-center gap-1.5"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Limpiar</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Chips Section */}
          <div
            className={`p-5 rounded-2xl border ${
              isDark ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-200'
            } shadow-sm`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Opciones disponibles:
              </span>
              {selectedChip && !isCorrect && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Restablecer</span>
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {activity.chips.map((chip, idx) => {
                const isChipSelected = selectedChip === chip;
                return (
                  <div
                    key={idx}
                    draggable
                    onDragStart={(e) => {
                      e.dataTransfer.setData('text/plain', chip);
                    }}
                    onClick={() => handleSelectChip(chip)}
                    className={`px-5 py-2.5 rounded-xl border text-sm sm:text-base font-bold shadow-xs cursor-pointer select-none transition-all transform active:scale-95 ${
                      isChipSelected
                        ? 'bg-sky-500 text-white border-sky-600 ring-2 ring-sky-300 dark:ring-sky-800'
                        : isDark
                        ? 'bg-slate-700/80 text-slate-100 border-slate-600 hover:bg-slate-700 hover:border-slate-500'
                        : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-50 hover:border-slate-300 hover:shadow-sm'
                    }`}
                  >
                    {chip}
                  </div>
                );
              })}
            </div>

            {/* Check button */}
            <div className="mt-5 flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-700/60">
              <button
                type="button"
                disabled={!selectedChip || (isSubmitted && isCorrect === true)}
                onClick={handleCheckAnswer}
                className={`px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-all flex items-center gap-2 ${
                  !selectedChip || (isSubmitted && isCorrect === true)
                    ? 'opacity-40 cursor-not-allowed bg-slate-300 dark:bg-slate-700 text-slate-500'
                    : 'bg-sky-500 hover:bg-sky-600 text-white active:scale-95'
                }`}
              >
                <CheckCircle className="w-4 h-4" />
                <span>Comprobar respuesta</span>
              </button>
            </div>
          </div>

          {/* 3D Reversible Flip Card for Spanish Translation */}
          <div className="space-y-2">
            <ReversibleTextCard
              englishText={activity.fullSentence}
              spanishText={activity.fullTranslation}
              grammarTip={activity.grammarNote}
              speechRate={speed}
              accent={accent}
              speakerGender="male"
              size="md"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
