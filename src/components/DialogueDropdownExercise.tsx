import React, { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  RotateCcw,
  RotateCw,
  ChevronDown,
} from 'lucide-react';
import { DialogueDropdownExercise as DialogueDropdownType } from '../types';
import { playFeedbackSound } from '../utils/audio';
import { useTheme } from '../context/ThemeContext';
import { VocabularyHelperCard } from './VocabularyHelperCard';
import { ReversibleInstructionCard } from './ReversibleInstructionCard';

interface DialogueDropdownExerciseProps {
  exercise: DialogueDropdownType;
  accent?: 'US' | 'UK';
  speechRate?: number;
  onSuccess?: () => void;
}

export const DialogueDropdownExercise: React.FC<DialogueDropdownExerciseProps> = ({
  exercise,
  accent = 'US',
  speechRate = 1.0,
  onSuccess,
}) => {
  const { isDark } = useTheme();

  // Selected values: blankId -> selectedWord
  const [selectedValues, setSelectedValues] = useState<Record<string, string>>({});
  // Submitted status
  const [hasChecked, setHasChecked] = useState(false);
  // Spanish translation toggle
  const [isFlipped, setIsFlipped] = useState(false);

  const handleSelectChange = (blankId: string, val: string) => {
    playFeedbackSound('click');
    setSelectedValues((prev) => ({ ...prev, [blankId]: val }));
    if (hasChecked) {
      setHasChecked(false);
    }
  };

  const handleCheck = () => {
    setHasChecked(true);
    const blanks = exercise.blanks || [];
    const allCorrect =
      blanks.length > 0 &&
      blanks.every((b) => selectedValues[b.id] === b.correctAnswer);

    if (allCorrect) {
      playFeedbackSound('correct');
      if (onSuccess) onSuccess();
    } else {
      playFeedbackSound('wrong');
    }
  };

  const handleClear = () => {
    playFeedbackSound('click');
    setSelectedValues({});
    setHasChecked(false);
  };

  const renderLineContent = (textEn: string) => {
    const parts = textEn.split(/(\[b\d+\])/g);

    return parts.map((part, index) => {
      const match = part.match(/\[(b\d+)\]/);
      if (match) {
        const blankId = match[1];
        const blankDef = exercise.blanks.find((b) => b.id === blankId);
        if (!blankDef) return null;

        const currentVal = selectedValues[blankId] || '';
        const isCorrect = currentVal === blankDef.correctAnswer;

        return (
          <span key={index} className="inline-block mx-1.5 align-middle">
            <span className="relative inline-flex items-center">
              <select
                id={`dropdown-select-${blankId}`}
                value={currentVal}
                onChange={(e) => handleSelectChange(blankId, e.target.value)}
                className={`appearance-none px-3.5 py-1.5 pr-8 rounded-xl font-semibold text-sm border-2 transition-all cursor-pointer shadow-xs ${
                  hasChecked
                    ? isCorrect
                      ? 'border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-bold ring-1 ring-emerald-400'
                      : 'border-rose-500 bg-rose-500/10 text-rose-700 dark:text-rose-300 font-bold ring-1 ring-rose-400'
                    : currentVal
                    ? isDark
                      ? 'border-indigo-500 bg-indigo-950/60 text-indigo-300'
                      : 'border-indigo-500 bg-indigo-50 text-indigo-900'
                    : isDark
                    ? 'border-slate-600 bg-slate-800 text-slate-300 hover:border-indigo-400'
                    : 'border-slate-300 bg-white text-slate-700 hover:border-indigo-400'
                }`}
              >
                <option value="" disabled>
                  -- select --
                </option>
                {blankDef.options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-slate-500 dark:text-slate-300 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </span>
          </span>
        );
      }

      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div className="w-full mx-auto flex flex-col gap-6 animate-in fade-in duration-200 py-2">
      {/* Reversible Instructions Header */}
      <ReversibleInstructionCard
        id="dropdown-instruction-card"
        instructions={
          exercise.instructions || 'Select the correct answer from the drop-down list.'
        }
        instructionsEs={
          exercise.instructionsEs ||
          'Selecciona la respuesta correcta de la lista desplegable.'
        }
      />

      {/* Main Content Layout */}
      <div className="w-full flex flex-col lg:flex-row items-start gap-8">
        {/* Left Column: Vocabulary Helper */}
        {exercise.vocabularyWords && (
          <div className="w-full lg:w-auto shrink-0 flex justify-center lg:justify-start">
            <VocabularyHelperCard
              words={exercise.vocabularyWords}
              accent={accent}
              speechRate={speechRate}
            />
          </div>
        )}

        {/* Right Column: Dialogue Lines */}
        <div
          className={`flex-1 w-full rounded-3xl p-6 sm:p-8 border shadow-md flex flex-col gap-6 ${
            isDark
              ? 'bg-slate-900/90 border-white/10 text-white'
              : 'bg-white border-slate-200 text-slate-900'
          }`}
        >
          {exercise.title && (
            <div className="flex items-center justify-between border-b border-inherit/30 pb-3">
              <h4 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                {exercise.title}
              </h4>
              <button
                type="button"
                id="dialogue-flip-translation-btn"
                onClick={() => setIsFlipped((prev) => !prev)}
                className={`p-2 rounded-xl transition-all cursor-pointer border shadow-2xs ${
                  isFlipped
                    ? 'bg-emerald-600 text-white border-emerald-500'
                    : isDark
                    ? 'bg-slate-800 hover:bg-slate-700 text-emerald-400 border-white/10'
                    : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-emerald-200'
                }`}
                title={isFlipped ? 'Ver diálogo en inglés' : 'Ver traducción del diálogo'}
                aria-label={isFlipped ? 'Ver diálogo en inglés' : 'Ver traducción del diálogo'}
              >
                <RotateCw className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Dialogue Card with 3D Reversible Flip */}
          <div className="perspective-1000 w-full min-h-[220px]">
            <div
              className={`relative w-full rounded-2xl transition-transform duration-500 transform-style-3d ${
                isFlipped ? 'rotate-y-180' : ''
              }`}
            >
              {/* Front: Interactive English Dialogue */}
              <div className="w-full backface-hidden flex flex-col gap-4">
                {exercise.lines.map((line, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-2xl border leading-relaxed text-base sm:text-lg ${
                      line.speaker === 'Customer'
                        ? isDark
                          ? 'bg-indigo-950/20 border-indigo-500/20'
                          : 'bg-indigo-50/50 border-indigo-100'
                        : isDark
                        ? 'bg-slate-800/40 border-white/10'
                        : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    {line.speaker && (
                      <span className="font-bold text-indigo-600 dark:text-indigo-400 block sm:inline mr-2">
                        {line.speaker}:
                      </span>
                    )}
                    {renderLineContent(line.textEn)}
                  </div>
                ))}
              </div>

              {/* Back: Spanish Translated Dialogue */}
              <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 flex flex-col gap-4 overflow-y-auto">
                {exercise.lines.map((line, idx) => (
                  <div
                    key={`es-${idx}`}
                    className={`p-4 rounded-2xl border leading-relaxed text-base sm:text-lg shadow-sm ${
                      isDark
                        ? 'bg-slate-900 border-emerald-500/40 text-white'
                        : 'bg-white border-slate-200 text-slate-900'
                    }`}
                  >
                    {line.speaker && (
                      <span className="font-bold text-emerald-600 dark:text-emerald-400 block sm:inline mr-2">
                        {line.speaker}:
                      </span>
                    )}
                    <span className="italic text-slate-900 dark:text-emerald-100">
                      "{line.textEs || line.textEn}"
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Check & Status */}
          <div className="flex items-center justify-between pt-4 border-t border-inherit/40">
            <div>
              {hasChecked && (
                <div className="flex items-center gap-2">
                  {(exercise.blanks || []).every(
                    (b) => selectedValues[b.id] === b.correctAnswer
                  ) ? (
                    <span className="flex items-center gap-1.5 text-sm font-bold text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="w-5 h-5" />
                      ¡Excelente! Todas las opciones son correctas.
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 text-sm font-semibold text-rose-600 dark:text-rose-400">
                      <XCircle className="w-5 h-5" />
                      Revisa las selecciones resaltadas en rojo.
                    </span>
                  )}
                </div>
              )}
            </div>

            <button
              id="check-dialogue-dropdown-btn"
              onClick={handleCheck}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              Comprobar Respuestas
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
