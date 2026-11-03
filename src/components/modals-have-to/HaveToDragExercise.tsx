import React, { useState, useEffect } from 'react';
import {
  Volume2,
  CheckCircle,
  XCircle,
  RotateCcw,
  RotateCw,
  Sparkles,
  ArrowRight,
  HelpCircle,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { speakEnglish, playFeedbackSound, stopSpeaking } from '../../utils/audio';
import { ModalsHaveToActivityItem } from '../../data/modalsHaveToData';
import { HaveToScenePlayer } from './HaveToScenePlayer';
import { ReversibleOptionChip } from './ReversibleOptionChip';

interface HaveToDragExerciseProps {
  activity: ModalsHaveToActivityItem;
  speed?: number;
  accent?: 'US' | 'UK';
  onNext?: () => void;
  isLast?: boolean;
}

export const HaveToDragExercise: React.FC<HaveToDragExerciseProps> = ({
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
  const [isCardFlipped, setIsCardFlipped] = useState<boolean>(false);

  // Reset state when activity changes
  useEffect(() => {
    setSelectedChip(null);
    setIsSubmitted(false);
    setIsCorrect(null);
    setIsDraggingOver(false);
    setIsCardFlipped(false);
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

    const correct =
      selectedChip.trim().toLowerCase() === activity.correctAnswer.trim().toLowerCase();
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
                Unidad 9 · Sección 5
              </span>
              <span className="text-xs text-slate-400 font-medium">
                Actividad {activity.number} de 11
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              {activity.instruction}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              {activity.instructionEs} (Arrastra la ficha al espacio en blanco o haz clic en ella)
            </p>
          </div>

          <button
            type="button"
            onClick={handleSpeakFull}
            className={`self-start sm:self-center px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 border transition-all cursor-pointer ${
              isDark
                ? 'bg-slate-700/80 hover:bg-slate-700 text-sky-400 border-slate-600'
                : 'bg-sky-50 hover:bg-sky-100 text-sky-700 border-sky-200'
            }`}
            title="Escuchar oración completa"
          >
            <Volume2 className="w-4 h-4" />
            <span>Escuchar todo</span>
          </button>
        </div>
      </div>

      {/* Main Two-Column Layout identical to original screenshots */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: HaveToScenePlayer (5 cols on lg) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <HaveToScenePlayer speed={speed} accent={accent} />
        </div>

        {/* Right Column: Interactive Drop Target Area (7 cols on lg) */}
        <div className="lg:col-span-7 flex flex-col gap-5">
          {/* Main Reversible Exercise Card */}
          <div
            className={`p-5 sm:p-7 rounded-2xl border ${
              isDark ? 'bg-slate-800/90 border-slate-700' : 'bg-white border-slate-200'
            } shadow-sm min-h-[240px] flex flex-col justify-between transition-all`}
          >
            {/* Card Header with Side Indicator & Flip Button */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 dark:border-slate-700/60">
              <div className="flex items-center gap-2">
                <span
                  className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                    isCardFlipped
                      ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                      : 'bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300'
                  }`}
                >
                  {isCardFlipped ? 'Reverso · Oración Completa' : 'Frente · Ejercicio'}
                </span>
                <span className="text-xs text-slate-400 font-medium hidden sm:inline">
                  {isCardFlipped ? 'Traducción & Regla' : 'Completa el espacio'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {isCardFlipped && (
                  <button
                    type="button"
                    onClick={handleSpeakFull}
                    className="p-1.5 rounded-xl border border-sky-200 dark:border-sky-800 text-sky-600 dark:text-sky-400 hover:bg-sky-50 dark:hover:bg-slate-700 text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
                    title="Escuchar oración completa"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Escuchar</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => {
                    playFeedbackSound('click');
                    setIsCardFlipped((prev) => !prev);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border ${
                    isDark
                      ? 'bg-slate-700/80 hover:bg-slate-700 text-slate-200 border-slate-600'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                  title={isCardFlipped ? 'Volver al ejercicio' : 'Voltear para ver oración completa y traducción'}
                >
                  <RotateCw className="w-3.5 h-3.5 text-sky-500" />
                  <span>{isCardFlipped ? 'Volver al ejercicio' : 'Ver reverso (Oración completa)'}</span>
                </button>
              </div>
            </div>

            {/* FRONT FACE: Interactive Sentence with Dropzone */}
            {!isCardFlipped ? (
              <div className="flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                  {/* If dialogue lines exist */}
                  {activity.dialogueLines ? (
                    <div className="space-y-3">
                      {activity.dialogueLines.map((line, idx) => {
                        if (line.hasBlank) {
                          return (
                            <div
                              key={idx}
                              className="flex flex-wrap items-center gap-2 text-base sm:text-lg font-medium text-slate-800 dark:text-slate-100 leading-relaxed"
                            >
                              <span>{line.beforeBlank}</span>

                              {/* DROP ZONE */}
                              <div
                                onDrop={handleDrop}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onClick={() => {
                                  if (selectedChip && !isCorrect) handleReset();
                                }}
                                className={`min-w-[130px] sm:min-w-[170px] min-h-[44px] px-3 py-1.5 rounded-xl border-2 border-dashed flex items-center justify-center transition-all cursor-pointer select-none ${
                                  isDraggingOver
                                    ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/40 scale-105'
                                    : selectedChip
                                    ? isSubmitted
                                      ? isCorrect
                                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-bold'
                                        : 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 font-bold'
                                      : 'border-sky-500 bg-sky-50/80 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300 font-bold'
                                    : 'border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900/50 text-slate-400'
                                }`}
                                title={selectedChip ? 'Haz clic para remover la ficha' : 'Arrastra o selecciona una opción aquí'}
                              >
                                {selectedChip ? (
                                  <span className="font-bold text-sm sm:text-base">
                                    {selectedChip}
                                  </span>
                                ) : (
                                  <span className="text-xs text-slate-400 italic">
                                    [espacio aquí]
                                  </span>
                                )}
                              </div>

                              <span>{line.afterBlank}</span>
                            </div>
                          );
                        }

                        return (
                          <div
                            key={idx}
                            className="text-base sm:text-lg font-medium text-slate-800 dark:text-slate-100 leading-relaxed"
                          >
                            {line.text}
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    /* Single sentence with blank */
                    <div className="flex flex-wrap items-center gap-2 text-base sm:text-lg font-medium text-slate-800 dark:text-slate-100 leading-relaxed">
                      <span>{activity.sentenceBefore}</span>

                      {/* DROP ZONE */}
                      <div
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onClick={() => {
                          if (selectedChip && !isCorrect) handleReset();
                        }}
                        className={`min-w-[130px] sm:min-w-[170px] min-h-[44px] px-3 py-1.5 rounded-xl border-2 border-dashed flex items-center justify-center transition-all cursor-pointer select-none ${
                          isDraggingOver
                            ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/40 scale-105'
                            : selectedChip
                            ? isSubmitted
                              ? isCorrect
                                ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-bold'
                                : 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 font-bold'
                              : 'border-sky-500 bg-sky-50/80 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300 font-bold'
                            : 'border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900/50 text-slate-400'
                        }`}
                        title={selectedChip ? 'Haz clic para remover la ficha' : 'Arrastra o selecciona una opción aquí'}
                      >
                        {selectedChip ? (
                          <span className="font-bold text-sm sm:text-base">
                            {selectedChip}
                          </span>
                        ) : (
                          <span className="text-xs text-slate-400 italic">
                            [espacio aquí]
                          </span>
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
                            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-colors cursor-pointer"
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
                          className="px-3.5 py-1.5 rounded-xl border border-rose-200 dark:border-rose-800 text-xs font-bold hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Limpiar</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              /* BACK FACE: Completed Sentence, Translation & Grammar Note */
              <div className="flex-1 flex flex-col justify-between space-y-4 animate-in fade-in duration-200">
                <div className="space-y-4">
                  {/* Full Completed English Sentence */}
                  <div className="p-4 rounded-xl bg-sky-50/70 dark:bg-sky-950/30 border border-sky-100 dark:border-sky-900/40">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-sky-700 dark:text-sky-300 block mb-1.5">
                      Oración Completa (Inglés):
                    </span>
                    <p className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-relaxed">
                      {activity.sentenceBefore ? (
                        <>
                          <span>{activity.sentenceBefore} </span>
                          <span className="px-2.5 py-0.5 rounded-lg bg-emerald-500 text-white font-extrabold shadow-xs">
                            {activity.correctAnswer}
                          </span>
                          <span> {activity.sentenceAfter}</span>
                        </>
                      ) : (
                        activity.fullSentence
                      )}
                    </p>
                  </div>

                  {/* Spanish Translation */}
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700/60">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
                      Traducción al Español:
                    </span>
                    <p className="text-base font-semibold text-sky-700 dark:text-sky-300 leading-relaxed">
                      {activity.fullTranslation}
                    </p>
                  </div>

                  {/* Grammar Note */}
                  {activity.grammarNote && (
                    <div className="p-3.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/70 dark:border-amber-800/40 text-xs sm:text-sm text-slate-700 dark:text-slate-300 flex items-start gap-2.5">
                      <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-amber-800 dark:text-amber-300 block mb-0.5">
                          Regla gramatical:
                        </span>
                        <span>{activity.grammarNote}</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-slate-100 dark:border-slate-700/60">
                  <span className="text-xs text-slate-400">
                    Puedes voltear la tarjeta en cualquier momento para seguir respondiendo.
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      playFeedbackSound('click');
                      setIsCardFlipped(false);
                    }}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-sky-600 hover:bg-sky-700 text-white flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                    <span>Volver al ejercicio</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Chips Section with Reversible Option Chips */}
          <div
            className={`p-5 rounded-2xl border ${
              isDark ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-200'
            } shadow-sm`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Opciones disponibles (arrastra, haz clic o toca 🔄 para traducir):
              </span>
              {selectedChip && !isCorrect && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Restablecer</span>
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {activity.chipsData.map((chipObj, idx) => (
                <ReversibleOptionChip
                  key={idx}
                  en={chipObj.en}
                  es={chipObj.es}
                  isSelected={selectedChip === chipObj.en}
                  onSelect={handleSelectChip}
                  speed={speed}
                  accent={accent}
                  disabled={isSubmitted && isCorrect === true}
                />
              ))}
            </div>

            {/* Check Answer Button */}
            <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
              <span className="text-xs text-slate-400">
                {selectedChip ? 'Opción colocada. Haz clic en comprobar.' : 'Selecciona una ficha para responder.'}
              </span>

              <div className="flex items-center gap-2">
                {selectedChip && !isCorrect && (
                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    Borrar
                  </button>
                )}

                <button
                  type="button"
                  disabled={!selectedChip || (isSubmitted && isCorrect === true)}
                  onClick={handleCheckAnswer}
                  className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer shadow-sm ${
                    !selectedChip || (isSubmitted && isCorrect === true)
                      ? 'opacity-50 cursor-not-allowed bg-slate-300 dark:bg-slate-700 text-slate-500'
                      : 'bg-sky-600 hover:bg-sky-700 text-white active:scale-95'
                  }`}
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Comprobar respuesta</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
