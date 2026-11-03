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
import { ModalsMayActivityItem } from '../../data/modalsMayData';
import { MayScenePlayer } from './MayScenePlayer';
import { ReversibleOptionChip } from './ReversibleOptionChip';

interface MayDragExerciseProps {
  activity: ModalsMayActivityItem;
  speed?: number;
  accent?: 'US' | 'UK';
  onNext?: () => void;
  isLast?: boolean;
}

export const MayDragExercise: React.FC<MayDragExerciseProps> = ({
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
      stopSpeaking();
      speakEnglish(activity.fullSentence, speed, accent, undefined, undefined, 'female');
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
    speakEnglish(activity.fullSentence, speed, accent, undefined, undefined, 'female');
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
                Unidad 9 · Sección 6
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
            className={`self-start sm:self-auto px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 border transition-all ${
              isDark
                ? 'bg-slate-800 hover:bg-slate-700 text-sky-300 border-slate-700'
                : 'bg-sky-50 hover:bg-sky-100 text-sky-700 border-sky-200'
            }`}
            title="Escuchar oración completa"
          >
            <Volume2 className="w-4 h-4 text-sky-500" />
            <span>Escuchar oración</span>
          </button>
        </div>
      </div>

      {/* Two Column Grid: Left Scene Player, Right Activity Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: MayScenePlayer */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <MayScenePlayer speed={speed} accent={accent} />

          {/* Educational Note */}
          <div
            className={`p-4 rounded-2xl border ${
              isDark ? 'bg-slate-800/60 border-slate-700' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center gap-2 mb-1 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
              <HelpCircle className="w-3.5 h-3.5 text-sky-500" />
              <span>Regla Aplicada</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {activity.grammarNote}
            </p>
          </div>
        </div>

        {/* Right Column: Interactive Drop Target & Reversible Option Chips */}
        <div className="lg:col-span-7 flex flex-col gap-5">
          {/* Main Reversible Card Container with dynamic height and no overflow */}
          <div
            className={`w-full rounded-2xl border shadow-sm transition-all duration-300 p-5 sm:p-7 min-h-[260px] flex flex-col justify-between ${
              isDark ? 'bg-slate-800/90 border-slate-700' : 'bg-white border-slate-200'
            }`}
          >
            {/* ANVERSO / FRONT: Exercise with Drag/Drop Blank */}
            {!isCardFlipped ? (
              <div className="flex-1 flex flex-col justify-between animate-in fade-in duration-200">
                <div>
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100 dark:border-slate-700">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      Actividad {activity.number} · Completa la oración
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleSpeakFull}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-sky-500 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                        title="Escuchar oración"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          playFeedbackSound('click');
                          setIsCardFlipped(true);
                        }}
                        className={`p-1.5 px-2.5 rounded-lg transition-colors flex items-center gap-1.5 text-xs font-semibold cursor-pointer border ${
                          isDark
                            ? 'bg-slate-700 text-slate-200 border-slate-600 hover:bg-slate-600'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                        title="Voltear para ver la oración completa y traducción en español"
                      >
                        <RotateCw className="w-3.5 h-3.5 text-sky-500" />
                        <span>Ver Reverso / Trad.</span>
                      </button>
                    </div>
                  </div>

                  {/* Dialogue format (if exists) or single sentence */}
                  {activity.dialogueLines ? (
                    <div className="space-y-4 text-base sm:text-lg leading-relaxed font-medium">
                      {activity.dialogueLines.map((line, idx) => (
                        <div key={idx} className="flex flex-wrap items-center gap-2 text-slate-800 dark:text-slate-100">
                          {line.hasBlank ? (
                            <>
                              <span>{line.beforeBlank}</span>
                              <div
                                onDrop={handleDrop}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onClick={() => {
                                  if (selectedChip && !isSubmitted) setSelectedChip(null);
                                }}
                                className={`inline-flex items-center justify-center min-w-[130px] sm:min-w-[150px] px-3.5 py-1.5 rounded-xl border-2 border-dashed transition-all cursor-pointer font-bold text-base ${
                                  isDraggingOver
                                    ? 'border-sky-500 bg-sky-500/20 scale-105'
                                    : selectedChip
                                    ? isSubmitted
                                      ? isCorrect
                                        ? 'border-emerald-500 bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                                        : 'border-rose-500 bg-rose-500/15 text-rose-600 dark:text-rose-400'
                                      : 'border-sky-500 bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300'
                                    : 'border-slate-300 dark:border-slate-600 hover:border-sky-400 bg-slate-50/70 dark:bg-slate-900/50 text-slate-400'
                                }`}
                                title={selectedChip ? 'Haz clic para remover ficha' : 'Arrastra aquí la ficha'}
                              >
                                {selectedChip || '_______'}
                              </div>
                              <span>{line.afterBlank}</span>
                            </>
                          ) : (
                            <span>{line.text}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-wrap items-center gap-2 text-base sm:text-lg leading-relaxed font-medium text-slate-800 dark:text-slate-100">
                      <span>{activity.sentenceBefore}</span>
                      <div
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onClick={() => {
                          if (selectedChip && !isSubmitted) setSelectedChip(null);
                        }}
                        className={`inline-flex items-center justify-center min-w-[130px] sm:min-w-[150px] px-3.5 py-1.5 rounded-xl border-2 border-dashed transition-all cursor-pointer font-bold text-base ${
                          isDraggingOver
                            ? 'border-sky-500 bg-sky-500/20 scale-105'
                            : selectedChip
                            ? isSubmitted
                              ? isCorrect
                                ? 'border-emerald-500 bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                                : 'border-rose-500 bg-rose-500/15 text-rose-600 dark:text-rose-400'
                              : 'border-sky-500 bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300'
                            : 'border-slate-300 dark:border-slate-600 hover:border-sky-400 bg-slate-50/70 dark:bg-slate-900/50 text-slate-400'
                        }`}
                        title={selectedChip ? 'Haz clic para remover ficha' : 'Arrastra aquí la ficha'}
                      >
                        {selectedChip || '_______'}
                      </div>
                      <span>{activity.sentenceAfter}</span>
                    </div>
                  )}
                </div>

                {/* Feedback Badge & Card Flip notice */}
                <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-2">
                    {isSubmitted && isCorrect === true && (
                      <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold">
                        <CheckCircle className="w-4 h-4" />
                        ¡Correcto! Excelente trabajo.
                      </span>
                    )}
                    {isSubmitted && isCorrect === false && (
                      <span className="flex items-center gap-1.5 text-rose-600 dark:text-rose-400 font-bold">
                        <XCircle className="w-4 h-4" />
                        Respuesta incorrecta. Inténtalo de nuevo.
                      </span>
                    )}
                    {!isSubmitted && (
                      <span className="italic">
                        {selectedChip
                          ? 'Presiona "Comprobar" para verificar'
                          : 'Arrastra o haz clic en una de las fichas de abajo'}
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      playFeedbackSound('click');
                      setIsCardFlipped(true);
                    }}
                    className="text-[11px] text-sky-500 hover:text-sky-600 font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCw className="w-3 h-3" />
                    <span>Ver traducción en el reverso</span>
                  </button>
                </div>
              </div>
            ) : (
              /* REVERSO / BACK: Full English Sentence, Highlighted Word, Spanish Translation & Grammar Tip */
              <div className="flex-1 flex flex-col justify-between space-y-4 animate-in fade-in duration-200">
                <div>
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-emerald-100 dark:border-emerald-800/60">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      Reverso · Oración Completa y Traducción
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleSpeakFull}
                        className="p-1.5 rounded-lg text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                        title="Escuchar oración completa"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          playFeedbackSound('click');
                          setIsCardFlipped(false);
                        }}
                        className={`p-1.5 px-2.5 rounded-lg transition-colors flex items-center gap-1.5 text-xs font-semibold cursor-pointer border ${
                          isDark
                            ? 'bg-slate-700 text-emerald-300 border-slate-600 hover:bg-slate-600'
                            : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                        }`}
                        title="Volver al ejercicio interactivo"
                      >
                        <RotateCw className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Volver al Ejercicio</span>
                      </button>
                    </div>
                  </div>

                  {/* English Full Sentence with highlighted answer */}
                  <div className="mb-3 p-3.5 rounded-xl bg-sky-50/70 dark:bg-sky-950/30 border border-sky-100 dark:border-sky-900/40">
                    <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-sky-700 dark:text-sky-300 block mb-1">
                      Inglés:
                    </span>
                    <p className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-relaxed">
                      {activity.sentenceBefore ? (
                        <>
                          <span>{activity.sentenceBefore} </span>
                          <span className="px-2 py-0.5 rounded-lg bg-emerald-500 text-white font-extrabold shadow-xs">
                            {activity.correctAnswer}
                          </span>
                          <span> {activity.sentenceAfter}</span>
                        </>
                      ) : (
                        activity.fullSentence.split(new RegExp(`(${activity.correctAnswer})`, 'gi')).map((part, i) =>
                          part.toLowerCase() === activity.correctAnswer.toLowerCase() ? (
                            <span
                              key={i}
                              className="bg-emerald-500 text-white px-2 py-0.5 rounded-lg font-extrabold shadow-xs"
                            >
                              {part}
                            </span>
                          ) : (
                            <span key={i}>{part}</span>
                          )
                        )
                      )}
                    </p>
                  </div>

                  {/* Spanish Translation */}
                  <div className="mb-3 p-3.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-800/40">
                    <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-emerald-600 dark:text-emerald-400 block mb-1">
                      Traducción al Español:
                    </span>
                    <p className="text-sm sm:text-base font-serif italic text-emerald-950 dark:text-emerald-200 whitespace-pre-line leading-relaxed">
                      {activity.fullTranslation}
                    </p>
                  </div>

                  {/* Grammar Note */}
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      💡 <span className="font-semibold">Explicación:</span> {activity.grammarNote}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs text-slate-400">
                  <span className="italic">Toca "Volver al Ejercicio" para continuar practicando</span>
                  <button
                    type="button"
                    onClick={() => {
                      playFeedbackSound('click');
                      setIsCardFlipped(false);
                    }}
                    className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1.5 hover:underline cursor-pointer"
                  >
                    <span>Volver al ejercicio</span>
                    <RotateCw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Options Pool: 100% Reversible Chips */}
          <div
            className={`p-4 sm:p-5 rounded-2xl border ${
              isDark ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-200'
            } shadow-sm space-y-3`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Opciones (Arrastra o haz clic para seleccionar · 🔄 para traducir)
              </span>
              <span className="text-xs text-sky-500 font-semibold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                Fichas reversibles con audio
              </span>
            </div>

            <div className="flex flex-wrap gap-2.5 sm:gap-3 pt-1">
              {activity.chipsData.map((item) => (
                <ReversibleOptionChip
                  key={item.en}
                  en={item.en}
                  es={item.es}
                  isSelected={selectedChip === item.en}
                  onSelect={handleSelectChip}
                  speed={speed}
                  accent={accent}
                  disabled={isSubmitted && isCorrect === true}
                />
              ))}
            </div>
          </div>

          {/* Action Control Buttons */}
          <div className="flex items-center justify-between gap-3 pt-1">
            <button
              type="button"
              onClick={handleReset}
              disabled={!selectedChip && !isSubmitted}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 border transition-all ${
                !selectedChip && !isSubmitted
                  ? 'opacity-40 cursor-not-allowed border-slate-200 text-slate-400'
                  : isDark
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
              }`}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reiniciar</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCheckAnswer}
                disabled={!selectedChip || (isSubmitted && isCorrect === true)}
                className={`px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-sm ${
                  !selectedChip || (isSubmitted && isCorrect === true)
                    ? 'opacity-40 cursor-not-allowed bg-slate-300 dark:bg-slate-700 text-slate-500'
                    : 'bg-sky-600 hover:bg-sky-500 active:scale-95 text-white'
                }`}
              >
                Comprobar
              </button>

              {isSubmitted && isCorrect && onNext && (
                <button
                  type="button"
                  onClick={onNext}
                  className="px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white flex items-center gap-2 shadow-sm animate-bounce"
                >
                  <span>{isLast ? 'Ir al Test' : 'Siguiente'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
