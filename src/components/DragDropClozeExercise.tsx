import React, { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  RotateCcw,
  Sparkles,
  RotateCw,
  X,
} from 'lucide-react';
import { DragDropClozeExercise as ClozeExerciseType } from '../types';
import { playFeedbackSound } from '../utils/audio';
import { useTheme } from '../context/ThemeContext';
import { VocabularyHelperCard } from './VocabularyHelperCard';
import { ReversibleInstructionCard } from './ReversibleInstructionCard';

interface DragDropClozeExerciseProps {
  exercise: ClozeExerciseType;
  accent?: 'US' | 'UK';
  speechRate?: number;
  onSuccess?: () => void;
}

export const DragDropClozeExercise: React.FC<DragDropClozeExerciseProps> = ({
  exercise,
  accent = 'US',
  speechRate = 1.0,
  onSuccess,
}) => {
  const { isDark } = useTheme();

  // Placed answers: blankId -> wordText
  const [placedAnswers, setPlacedAnswers] = useState<Record<string, string>>({});
  // Submitted status
  const [hasChecked, setHasChecked] = useState(false);
  // Spanish translation toggle
  const [isFlipped, setIsFlipped] = useState(false);
  // Dragged word
  const [draggedWord, setDraggedWord] = useState<string | null>(null);
  const [dragOverBlankId, setDragOverBlankId] = useState<string | null>(null);

  // Remaining available words in wordBank
  const placedWords = Object.values(placedAnswers);
  const availableWords = exercise.wordBank.filter(
    (word) => !placedWords.includes(word)
  );

  const handleDragStart = (e: React.DragEvent, word: string) => {
    if (hasChecked) return;
    e.dataTransfer.setData('text/plain', word);
    setDraggedWord(word);
  };

  const handleDragOver = (e: React.DragEvent, blankId: string) => {
    if (hasChecked) return;
    e.preventDefault();
    setDragOverBlankId(blankId);
  };

  const handleDragLeave = () => {
    setDragOverBlankId(null);
  };

  const handleDrop = (e: React.DragEvent, blankId: string) => {
    if (hasChecked) return;
    e.preventDefault();
    setDragOverBlankId(null);
    const word = e.dataTransfer.getData('text/plain') || draggedWord;
    if (!word) return;

    playFeedbackSound('click');
    setPlacedAnswers((prev) => {
      // If this word was already in another blank, remove it from that blank
      const updated = { ...prev };
      Object.keys(updated).forEach((bId) => {
        if (updated[bId] === word) {
          delete updated[bId];
        }
      });
      updated[blankId] = word;
      return updated;
    });
  };

  // Click on a bank chip to place into the first available blank
  const handleChipClick = (word: string) => {
    if (hasChecked) return;
    // Find first empty blank
    const emptyBlank = exercise.blanks.find((b) => !placedAnswers[b.id]);
    if (!emptyBlank) return;

    playFeedbackSound('click');
    setPlacedAnswers((prev) => ({
      ...prev,
      [emptyBlank.id]: word,
    }));
  };

  // Click on placed word to remove back to wordBank
  const handleRemovePlaced = (blankId: string) => {
    if (hasChecked) return;
    playFeedbackSound('click');
    setPlacedAnswers((prev) => {
      const next = { ...prev };
      delete next[blankId];
      return next;
    });
  };

  const handleCheck = () => {
    setHasChecked(true);
    const blanks = exercise.blanks || [];
    const allCorrect =
      blanks.length > 0 && blanks.every((b) => placedAnswers[b.id] === b.correctAnswer);

    if (allCorrect) {
      playFeedbackSound('correct');
      if (onSuccess) onSuccess();
    } else {
      playFeedbackSound('wrong');
    }
  };

  const handleClear = () => {
    playFeedbackSound('click');
    setPlacedAnswers({});
    setHasChecked(false);
  };

  // Parse template into text parts and blank targets
  // Blanks are formatted as [b1], [b2], etc.
  const renderTemplateWithBlanks = () => {
    const parts = exercise.template.split(/(\[b\d+\])/g);

    return (
      <div className="text-base sm:text-lg leading-loose font-normal text-slate-800 dark:text-slate-200">
        {parts.map((part, index) => {
          const match = part.match(/\[(b\d+)\]/);
          if (match) {
            const blankId = match[1];
            const blankDef = exercise.blanks.find((b) => b.id === blankId);
            const placedWord = placedAnswers[blankId];
            const isCorrect = placedWord && blankDef && placedWord === blankDef.correctAnswer;
            const isDragTarget = dragOverBlankId === blankId;

            return (
              <span
                key={index}
                onDragOver={(e) => handleDragOver(e, blankId)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, blankId)}
                onClick={() => {
                  if (placedWord) handleRemovePlaced(blankId);
                }}
                className={`inline-flex items-center justify-center min-w-[130px] sm:min-w-[150px] px-3.5 py-1 mx-1.5 align-middle rounded-xl border-2 transition-all select-none text-sm font-semibold cursor-pointer ${
                  hasChecked
                    ? isCorrect
                      ? 'border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-bold'
                      : 'border-rose-500 bg-rose-500/10 text-rose-700 dark:text-rose-300 font-bold'
                    : isDragTarget
                    ? 'border-indigo-500 bg-indigo-500/20 scale-105 ring-2 ring-indigo-400'
                    : placedWord
                    ? isDark
                      ? 'border-indigo-500 bg-indigo-950/60 text-indigo-300 shadow-xs'
                      : 'border-indigo-500 bg-indigo-50 text-indigo-800 shadow-xs'
                    : isDark
                    ? 'border-dashed border-slate-600 bg-slate-800/60 text-slate-400 hover:border-slate-400'
                    : 'border-dashed border-slate-300 bg-slate-100/80 text-slate-400 hover:border-slate-400'
                }`}
                title={placedWord ? 'Haz clic para devolver al banco' : 'Arrastra aquí una palabra'}
              >
                {placedWord ? (
                  <span className="flex items-center gap-1.5">
                    <span>{placedWord}</span>
                    {!hasChecked && (
                      <X className="w-3.5 h-3.5 text-slate-400 hover:text-rose-500" />
                    )}
                  </span>
                ) : (
                  <span className="text-xs text-slate-400 italic font-mono">
                    [ arrastra aquí ]
                  </span>
                )}
              </span>
            );
          }

          // Plain text part (handle newlines)
          return (
            <span key={index} className="whitespace-pre-line">
              {part}
            </span>
          );
        })}
      </div>
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col gap-6 animate-in fade-in duration-200 py-2">
      {/* Reversible Instructions Header */}
      <ReversibleInstructionCard
        id="cloze-instruction-card"
        instructions={exercise.instructions || 'Drag the correct answer/s into place.'}
        instructionsEs={
          exercise.instructionsEs || 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.'
        }
      />

      {/* Main Layout: Left Column (Vocabulary Reference) & Right Column (Cloze Text & Word Bank) */}
      <div className="w-full flex flex-col lg:flex-row items-start gap-8">
        {/* Left Column */}
        {exercise.vocabularyWords && (
          <div className="w-full lg:w-auto shrink-0 flex justify-center lg:justify-start">
            <VocabularyHelperCard
              words={exercise.vocabularyWords}
              accent={accent}
              speechRate={speechRate}
            />
          </div>
        )}

        {/* Right Column: Story & Drag Slots */}
        <div
          className={`flex-1 w-full rounded-3xl p-6 sm:p-8 border shadow-md flex flex-col gap-6 ${
            isDark
              ? 'bg-slate-900/90 border-white/10 text-white'
              : 'bg-white border-slate-200 text-slate-900'
          }`}
        >
          {exercise.storyTitle && (
            <div className="flex items-center justify-between border-b border-inherit/30 pb-3">
              <h4 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                {exercise.storyTitle}
              </h4>
              {exercise.translationEs && (
                <button
                  type="button"
                  onClick={() => setIsFlipped((prev) => !prev)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer border ${
                    isFlipped
                      ? 'bg-emerald-600 text-white border-emerald-500'
                      : isDark
                      ? 'bg-slate-800 hover:bg-slate-700 text-emerald-400 border-white/10'
                      : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-emerald-200'
                  }`}
                  title="Traducir texto de la historia"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>{isFlipped ? 'Ver Texto en Inglés' : 'Ver Traducción de la Historia'}</span>
                </button>
              )}
            </div>
          )}

          {/* Text Area */}
          <div className="p-4 sm:p-6 rounded-2xl bg-slate-50/70 dark:bg-slate-800/40 border border-inherit/40 min-h-[160px]">
            {isFlipped && exercise.translationEs ? (
              <p className="text-base sm:text-lg leading-relaxed italic text-emerald-800 dark:text-emerald-200 whitespace-pre-line">
                "{exercise.translationEs}"
              </p>
            ) : (
              renderTemplateWithBlanks()
            )}
          </div>

          {/* Word Bank Area */}
          <div className="flex flex-col gap-2.5 pt-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Banco de palabras (arrastra o haz clic para colocar)
            </span>

            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 p-4 rounded-2xl bg-slate-100/80 dark:bg-slate-800/80 border border-inherit/40 min-h-[64px]">
              {exercise.wordBank.map((word) => {
                const isPlaced = placedWords.includes(word);

                return (
                  <button
                    key={word}
                    id={`word-bank-chip-${word.replace(/\s+/g, '-')}`}
                    draggable={!isPlaced && !hasChecked}
                    onDragStart={(e) => handleDragStart(e, word)}
                    onClick={() => {
                      if (!isPlaced) handleChipClick(word);
                    }}
                    disabled={isPlaced || hasChecked}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer select-none shadow-xs ${
                      isPlaced
                        ? 'opacity-30 pointer-events-none bg-slate-200 dark:bg-slate-800 text-slate-400'
                        : isDark
                        ? 'bg-slate-700 hover:bg-indigo-600 text-white border border-white/10 hover:shadow-md'
                        : 'bg-white hover:bg-indigo-50 text-slate-800 hover:text-indigo-700 border border-slate-300 hover:border-indigo-400 hover:shadow-md'
                    }`}
                  >
                    {word}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Check Button & Summary */}
          <div className="flex items-center justify-between pt-4 border-t border-inherit/40">
            <div>
              {hasChecked && (
                <div className="flex items-center gap-2">
                  {(exercise.blanks || []).every((b) => placedAnswers[b.id] === b.correctAnswer) ? (
                    <span className="flex items-center gap-1.5 text-sm font-bold text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="w-5 h-5" />
                      ¡Perfecto! Todas las palabras están en su lugar.
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 text-sm font-semibold text-rose-600 dark:text-rose-400">
                      <XCircle className="w-5 h-5" />
                      Revisa las casillas en rojo y vuelve a intentar.
                    </span>
                  )}
                </div>
              )}
            </div>

            <button
              id="check-cloze-btn"
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
