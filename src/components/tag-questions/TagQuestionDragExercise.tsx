import React, { useState } from 'react';
import {
  RotateCcw,
  Check,
  Volume2,
  RefreshCw,
  Sparkles,
  HelpCircle,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { playFeedbackSound, speakEnglish, stopSpeaking } from '../../utils/audio';
import { TagQuestionsExerciseItem } from '../../data/tagQuestionsData';
import { TagQuestionsScenePlayer } from './TagQuestionsScenePlayer';
import { ReversibleTextCard } from './ReversibleTextCard';

interface TagQuestionDragExerciseProps {
  data: TagQuestionsExerciseItem;
  speed: number;
  accent?: 'US' | 'UK';
  onSuccess?: () => void;
}

export const TagQuestionDragExercise: React.FC<TagQuestionDragExerciseProps> = ({
  data,
  speed,
  accent = 'US',
  onSuccess,
}) => {
  const { isDark } = useTheme();

  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isChecked, setIsChecked] = useState(false);
  const [isDialogueFlipped, setIsDialogueFlipped] = useState(false);
  const [flippedOptions, setFlippedOptions] = useState<Record<string, boolean>>({});

  const handleSelectOption = (optId: string) => {
    if (isChecked) return;
    playFeedbackSound('click');
    setSelectedOptionId(optId);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (isChecked) return;
    const optId = e.dataTransfer.getData('text/plain');
    if (optId) {
      playFeedbackSound('click');
      setSelectedOptionId(optId);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDragStart = (e: React.DragEvent, optId: string) => {
    e.dataTransfer.setData('text/plain', optId);
  };

  const handleToggleOptionFlip = (optId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    playFeedbackSound('click');
    setFlippedOptions((prev) => ({
      ...prev,
      [optId]: !prev[optId],
    }));
  };

  const handlePlayAudio = (textEn: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    stopSpeaking();
    playFeedbackSound('click');
    speakEnglish(textEn, speed, accent, undefined, undefined, 'female');
  };

  const handleCheck = () => {
    if (!selectedOptionId) return;
    const isCorrect = selectedOptionId === data.correctOptionId;
    playFeedbackSound(isCorrect ? 'correct' : 'wrong');
    setIsChecked(true);
    if (isCorrect && onSuccess) {
      onSuccess();
    }
  };

  const handleReset = () => {
    stopSpeaking();
    playFeedbackSound('click');
    setSelectedOptionId(null);
    setIsChecked(false);
  };

  const selectedOpt = data.options.find((o) => o.id === selectedOptionId);
  const isCorrect = isChecked && selectedOptionId === data.correctOptionId;
  const isWrong = isChecked && selectedOptionId !== data.correctOptionId;

  // Build full spoken text for the whole dialogue
  const fullDialogueTextEn = data.contextLines.map((l) => l.textEn).join(' ');

  return (
    <div className="w-full flex flex-col gap-5 animate-in fade-in duration-200">
      {/* 1. Reversible Instruction Card */}
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
          <TagQuestionsScenePlayer
            speed={speed}
            accent={accent}
            highlightedLineId="turn-1"
            showTranscriptInitially={true}
          />
        </div>

        {/* Right Column: Dialogue with blank + Drag/Click Chips */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          {/* Header Bar */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
            <span className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400">
              Actividad {data.activityNumber} &bull; Completa con la Tag Question
            </span>
            <button
              type="button"
              onClick={() => {
                playFeedbackSound('click');
                setIsDialogueFlipped((prev) => !prev);
              }}
              className="flex items-center gap-1.5 text-xs text-sky-600 dark:text-sky-400 hover:underline cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{isDialogueFlipped ? 'Ver en Inglés' : 'Ver Traducción'}</span>
            </button>
          </div>

          {/* Dialogue Context Card (Reversible 3D) */}
          <div className="w-full perspective-1000 min-h-[170px]">
            <div
              className={`relative w-full h-full min-h-[170px] transition-transform duration-500 transform-style-3d select-none rounded-2xl border ${
                isDark
                  ? 'bg-slate-900 border-slate-700/80 text-slate-100 shadow-md'
                  : 'bg-white border-slate-200 text-slate-900 shadow-md'
              } ${isDialogueFlipped ? 'rotate-y-180' : ''}`}
            >
              {/* FRONT: English with Drop Zone Blank */}
              <div className="w-full h-full backface-hidden p-5 flex flex-col justify-between gap-3 rounded-2xl">
                <div className="flex flex-col gap-3">
                  {data.contextLines.map((line, idx) => {
                    if (line.hasBlank) {
                      return (
                        <div
                          key={idx}
                          className="flex items-center flex-wrap gap-2 text-sm sm:text-base font-semibold leading-relaxed"
                        >
                          <span className="text-slate-400">-</span>
                          <span>{line.prefixEn}</span>

                          {/* DROP ZONE / BLANK */}
                          <div
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}
                            onClick={() => {
                              if (!isChecked && selectedOptionId) {
                                setSelectedOptionId(null);
                              }
                            }}
                            className={`inline-flex items-center justify-center min-w-[120px] sm:min-w-[140px] px-3 py-1 rounded-xl border-2 border-dashed transition-all cursor-pointer ${
                              isChecked
                                ? isCorrect
                                  ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200 font-bold'
                                  : 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-200 font-bold'
                                : selectedOptionId
                                ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/40 text-sky-800 dark:text-sky-200 font-bold shadow-xs'
                                : isDark
                                ? 'border-slate-600 bg-slate-800/60 text-slate-400 hover:border-sky-400'
                                : 'border-slate-300 bg-slate-100/80 text-slate-400 hover:border-sky-400'
                            }`}
                            title={
                              selectedOptionId
                                ? 'Haz clic para remover la opción'
                                : 'Arrastra o haz clic en una opción abajo'
                            }
                          >
                            {selectedOpt ? (
                              <span className="animate-in fade-in zoom-in-95">
                                {selectedOpt.textEn}
                              </span>
                            ) : (
                              <span className="text-xs font-mono text-slate-400 tracking-wider">
                                [ ________ ]
                              </span>
                            )}
                          </div>

                          <span>{line.suffixEn}</span>
                        </div>
                      );
                    }

                    return (
                      <div
                        key={idx}
                        className="flex items-baseline gap-2 text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300"
                      >
                        <span className="text-slate-400 font-bold">-</span>
                        <span>{line.textEn}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Bottom actions for Front */}
                <div className="flex items-center justify-between pt-2 border-t border-inherit/40 text-xs text-slate-400">
                  <span>Selecciona una ficha abajo o arrástrala al espacio</span>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handlePlayAudio(fullDialogueTextEn)}
                      className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-sky-500 hover:text-sky-600 cursor-pointer"
                      title="Escuchar diálogo completo"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        playFeedbackSound('click');
                        setIsDialogueFlipped(true);
                      }}
                      className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer"
                      title="Voltear para ver traducción completa"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* BACK: Spanish Translation */}
              <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 p-5 flex flex-col justify-between gap-3 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/40 border border-emerald-300 dark:border-emerald-700">
                <div className="flex flex-col gap-3 font-serif">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300 block">
                    Traducción al Español:
                  </span>
                  {data.contextLines.map((line, idx) => (
                    <div
                      key={idx}
                      className="flex items-baseline gap-2 text-sm sm:text-base italic text-emerald-950 dark:text-emerald-100 leading-relaxed"
                    >
                      <span className="text-emerald-500 font-bold">-</span>
                      <span>{line.textEs}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-emerald-300 dark:border-emerald-700/60 text-xs">
                  <span className="text-emerald-700 dark:text-emerald-300">
                    Traducción sin revelar respuestas en inglés
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      playFeedbackSound('click');
                      setIsDialogueFlipped(false);
                    }}
                    className="p-1.5 rounded-lg border border-emerald-400 bg-white dark:bg-slate-800 text-emerald-700 dark:text-emerald-300 hover:scale-105 cursor-pointer shadow-xs"
                    title="Voltear al frente"
                  >
                    <RefreshCw className="w-3.5 h-3.5 rotate-180" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Chips Selection Area (Exact match to options row in screenshots) */}
          <div
            className={`p-4 rounded-2xl border transition-all ${
              isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-2.5">
              Opciones disponibles (arrastra o haz clic):
            </span>

            <div className="flex flex-wrap items-center gap-2.5">
              {data.options.map((opt) => {
                const isSelected = selectedOptionId === opt.id;
                const isFlipped = Boolean(flippedOptions[opt.id]);

                return (
                  <div
                    key={opt.id}
                    draggable={!isChecked}
                    onDragStart={(e) => handleDragStart(e, opt.id)}
                    onClick={() => handleSelectOption(opt.id)}
                    className={`group px-3.5 py-2 rounded-xl border-2 transition-all cursor-pointer flex items-center gap-2 shadow-xs select-none ${
                      isSelected
                        ? 'border-sky-500 bg-sky-500 text-white shadow-md scale-105 font-bold'
                        : isDark
                        ? 'bg-slate-800 border-slate-700 hover:border-slate-500 text-slate-200 hover:bg-slate-750'
                        : 'bg-white border-slate-300 hover:border-sky-400 text-slate-800 hover:bg-slate-50'
                    }`}
                  >
                    <span className="text-xs sm:text-sm font-medium">
                      {isFlipped ? (
                        <span className="italic font-serif text-emerald-200 dark:text-emerald-300">
                          {opt.textEs}
                        </span>
                      ) : (
                        opt.textEn
                      )}
                    </span>

                    {/* Small flip & audio icons */}
                    <div className="flex items-center gap-0.5 opacity-60 group-hover:opacity-100">
                      <button
                        type="button"
                        onClick={(e) => handleToggleOptionFlip(opt.id, e)}
                        className={`p-1 rounded hover:bg-black/10 ${
                          isSelected ? 'text-white' : 'text-slate-400'
                        }`}
                        title="Ver traducción en español"
                      >
                        <RefreshCw className="w-3 h-3" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => handlePlayAudio(opt.textEn, e)}
                        className={`p-1 rounded hover:bg-black/10 ${
                          isSelected ? 'text-white' : 'text-sky-500'
                        }`}
                        title="Escuchar pronunciación"
                      >
                        <Volume2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Grammar Note / Feedback Box */}
          {isChecked && (
            <div
              className={`p-3.5 rounded-2xl border text-xs leading-relaxed animate-in fade-in duration-200 ${
                isCorrect
                  ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-700 text-emerald-900 dark:text-emerald-200'
                  : 'bg-rose-50 dark:bg-rose-950/30 border-rose-300 dark:border-rose-700 text-rose-900 dark:text-rose-200'
              }`}
            >
              <div className="flex items-center gap-2 font-bold mb-1">
                {isCorrect ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>¡Excelente! Respuesta correcta: &ldquo;{data.correctAnswerText}&rdquo;</span>
                  </>
                ) : (
                  <>
                    <span>Respuesta incorrecta. Inténtalo de nuevo o revisa la regla:</span>
                  </>
                )}
              </div>
              <p className="font-serif">
                {data.grammarNoteEs || data.grammarNoteEn}
              </p>
            </div>
          )}

          {/* Action Buttons: Reiniciar / Comprobar */}
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
