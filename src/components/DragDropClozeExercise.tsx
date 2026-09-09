import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  XCircle,
  RotateCcw,
  Volume2,
  X,
} from 'lucide-react';
import { DragDropClozeExercise as ClozeExerciseType } from '../types';
import { playFeedbackSound, speakEnglish, stopSpeaking } from '../utils/audio';
import { useTheme } from '../context/ThemeContext';
import { VocabularyHelperCard } from './VocabularyHelperCard';
import { ReversibleInstructionCard } from './ReversibleInstructionCard';
import { ReadingStoryCard } from './ReadingStoryCard';
import { SpeedSelectorButton } from './SpeedSelectorButton';

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
  // Spanish translation toggle (flip card)
  const [isFlipped, setIsFlipped] = useState(false);
  // Dragged word
  const [draggedWord, setDraggedWord] = useState<string | null>(null);
  const [dragOverBlankId, setDragOverBlankId] = useState<string | null>(null);

  // Audio playback state
  const [currentRate, setCurrentRate] = useState(speechRate);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    return () => {
      stopSpeaking();
    };
  }, []);

  const safeAccent = accent === 'UK' ? 'UK' : 'US';

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
    setPlacedAnswers((prev) => ({
      ...prev,
      [blankId]: word,
    }));
    setDraggedWord(null);
  };

  // Place word by clicking chip into the first empty blank
  const handleChipClick = (word: string) => {
    if (hasChecked) return;
    playFeedbackSound('click');

    // Find the first unfilled blank
    const emptyBlank = exercise.blanks.find((b) => !placedAnswers[b.id]);
    if (emptyBlank) {
      setPlacedAnswers((prev) => ({
        ...prev,
        [emptyBlank.id]: word,
      }));
    }
  };

  // Remove a placed word from a blank
  const handleRemovePlaced = (blankId: string) => {
    if (hasChecked) return;
    playFeedbackSound('pop');
    setPlacedAnswers((prev) => {
      const next = { ...prev };
      delete next[blankId];
      return next;
    });
  };

  const handleCheck = () => {
    setHasChecked(true);

    const allCorrect = exercise.blanks.every(
      (b) => placedAnswers[b.id] === b.correctAnswer
    );

    if (allCorrect) {
      playFeedbackSound('correct');
      if (onSuccess) onSuccess();
    } else {
      playFeedbackSound('incorrect');
    }
  };

  const handleReset = () => {
    playFeedbackSound('click');
    setPlacedAnswers({});
    setHasChecked(false);
  };

  const handleToggleAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPlaying) {
      stopSpeaking();
      setIsPlaying(false);
      return;
    }

    const completedText = exercise.template.replace(
      /(\[b\d+\]|\{\d+\}|\{b\d+\})/g,
      (match) => {
        const m = match.match(/(?:\[|\{)b?(\d+)(?:\]|\})/);
        if (m) {
          const num = parseInt(m[1], 10);
          const found = exercise.blanks.find(
            (b) => b.id === 'b' + num || b.id === m[1]
          );
          const blankId = found ? found.id : (exercise.blanks[num]?.id || ('b' + num));
          return placedAnswers[blankId] || '...';
        }
        return '...';
      }
    );

    const textToSpeak = isFlipped
      ? exercise.translationEs || completedText
      : completedText;

    setIsPlaying(true);
    speakEnglish(
      textToSpeak,
      currentRate,
      safeAccent,
      () => setIsPlaying(true),
      () => setIsPlaying(false)
    );
  };

  const handleSpeedChange = (newRate: number) => {
    setCurrentRate(newRate);
    if (isPlaying) {
      stopSpeaking();
      const completedText = exercise.template.replace(
        /(\[b\d+\]|\{\d+\}|\{b\d+\})/g,
        (match) => {
          const m = match.match(/(?:\[|\{)b?(\d+)(?:\]|\})/);
          if (m) {
            const num = parseInt(m[1], 10);
            const found = exercise.blanks.find(
              (b) => b.id === 'b' + num || b.id === m[1]
            );
            const blankId = found ? found.id : (exercise.blanks[num]?.id || ('b' + num));
            return placedAnswers[blankId] || '...';
          }
          return '...';
        }
      );
      const textToSpeak = isFlipped
        ? exercise.translationEs || completedText
        : completedText;

      speakEnglish(
        textToSpeak,
        newRate,
        safeAccent,
        () => setIsPlaying(true),
        () => setIsPlaying(false)
      );
    }
  };

  // Parse template into text parts and blank targets
  // Blanks are formatted as [b1], {0}, {b1}, etc.
  const renderTemplateWithBlanks = () => {
    const parts = exercise.template.split(/(\[b\d+\]|\{\d+\}|\{b\d+\})/g);

    return (
      <div className="text-base sm:text-lg leading-loose font-normal text-slate-800 dark:text-slate-200">
        {parts.map((part, index) => {
          const match = part.match(/(?:\[|\{)b?(\d+)(?:\]|\})/);
          if (match) {
            const num = parseInt(match[1], 10);
            const foundBlank = exercise.blanks.find(
              (b) => b.id === 'b' + num || b.id === match[1]
            );
            const blankDef = foundBlank || exercise.blanks[num] || {
              id: 'b' + num,
              correctAnswer: '',
            };
            const blankId = blankDef.id;

            const placedWord = placedAnswers[blankId];
            const isCorrect =
              placedWord && blankDef && placedWord === blankDef.correctAnswer;
            const isDragTarget = dragOverBlankId === blankId;

            return (
              <span
                key={index}
                onDragOver={(e) => handleDragOver(e, blankId)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, blankId)}
                onClick={(e) => {
                  e.stopPropagation();
                  if (placedWord) handleRemovePlaced(blankId);
                }}
                className={`inline-flex items-center justify-center min-w-[120px] sm:min-w-[140px] px-3 py-1 mx-1.5 align-middle rounded-xl border-2 transition-all select-none text-sm font-semibold cursor-pointer ${
                  hasChecked
                    ? isCorrect
                      ? 'border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-bold'
                      : 'border-rose-500 bg-rose-500/10 text-rose-700 dark:text-rose-300 font-bold'
                    : isDragTarget
                    ? 'border-sky-500 bg-sky-500/20 scale-105 ring-2 ring-sky-400'
                    : placedWord
                    ? isDark
                      ? 'border-sky-500 bg-sky-950/60 text-sky-300 shadow-xs'
                      : 'border-sky-500 bg-sky-50 text-sky-800 shadow-xs'
                    : isDark
                    ? 'border-dashed border-slate-600 bg-slate-800/60 text-slate-300 hover:border-slate-400'
                    : 'border-dashed border-slate-400 bg-slate-100/80 text-slate-600 hover:border-slate-500'
                }`}
                title={placedWord ? 'Quitar palabra' : 'Arrastra aquí una palabra'}
              >
                {placedWord ? (
                  <span className="flex items-center gap-1.5">
                    <span>{placedWord}</span>
                    {!hasChecked && (
                      <X className="w-3.5 h-3.5 text-slate-500 hover:text-rose-500" />
                    )}
                  </span>
                ) : (
                  <span className="text-xs text-slate-500 dark:text-slate-400 italic">
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
    <div className="w-full flex flex-col gap-6 max-w-6xl mx-auto">
      {/* Reversible Instructions Header */}
      <ReversibleInstructionCard
        id="cloze-instruction-card"
        instructions={exercise.instructions || 'Drag the correct answers into place.'}
        instructionsEs={
          exercise.instructionsEs || 'Arrastra las respuestas correctas a su lugar.'
        }
        speechRate={speechRate}
        accent={accent}
      />

      {/* Main Layout: Two Columns if story or vocabulary is present */}
      <div className="w-full flex flex-col lg:flex-row items-start gap-8">
        {/* Left Column: Story Card or Vocabulary */}
        {exercise.story && (
          <div className="w-full lg:w-1/2 shrink-0">
            <ReadingStoryCard
              story={exercise.story}
              accent={accent}
              speechRate={speechRate}
            />
          </div>
        )}

        {exercise.vocabularyWords && !exercise.story && (
          <div className="w-full lg:w-auto shrink-0 flex justify-center lg:justify-start">
            <VocabularyHelperCard
              words={exercise.vocabularyWords}
              accent={accent}
              speechRate={speechRate}
            />
          </div>
        )}

        {/* Right Column: Cloze Text & Word Bank */}
        <div
          className={`flex-1 w-full rounded-3xl p-6 sm:p-8 border shadow-sm flex flex-col gap-6 ${
            isDark
              ? 'bg-slate-900 border-white/10 text-white'
              : 'bg-white border-slate-200 text-slate-900'
          }`}
        >
          {/* Card Title & Audio Control */}
          <div className="flex items-center justify-between border-b border-inherit/30 pb-3">
            <h4 className="text-xl sm:text-2xl font-bold tracking-tight text-sky-500 dark:text-sky-400 font-sans">
              {exercise.storyTitle || 'Fill in the blanks'}
            </h4>
            <div className="flex items-center gap-2">
              <SpeedSelectorButton
                currentRate={currentRate}
                onRateChange={handleSpeedChange}
                size="sm"
              />
              <button
                type="button"
                id="cloze-audio-speak-btn"
                onClick={handleToggleAudio}
                className={`p-2 rounded-xl border transition-all cursor-pointer shadow-2xs ${
                  isPlaying
                    ? 'bg-sky-500 text-white border-sky-600 ring-2 ring-sky-400/30'
                    : isDark
                    ? 'bg-slate-800 hover:bg-slate-700 text-sky-400 border-white/10'
                    : 'bg-white hover:bg-stone-100 text-sky-600 border-slate-200'
                }`}
                title="Escuchar texto"
                aria-label="Escuchar texto"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Story Card with 3D Reversible Flip on Click (No flip buttons or text) */}
          <div className="perspective-1000 w-full min-h-[160px]">
            <div
              onClick={() => {
                if (exercise.translationEs) {
                  playFeedbackSound('flip');
                  setIsFlipped((prev) => !prev);
                }
              }}
              className={`relative w-full min-h-[160px] rounded-2xl cursor-pointer select-none transition-transform duration-500 transform-style-3d border shadow-xs ${
                isFlipped ? 'rotate-y-180' : ''
              } ${
                isFlipped
                  ? isDark
                    ? 'bg-slate-900 border-emerald-500/40 text-white'
                    : 'bg-white border-emerald-300 text-slate-900'
                  : isDark
                  ? 'bg-slate-900 border-white/10 text-white'
                  : 'bg-white border-slate-200 text-slate-900'
              }`}
            >
              {/* Front: Story with blanks */}
              <div className="w-full h-full p-4 sm:p-6 backface-hidden">
                {renderTemplateWithBlanks()}
              </div>

              {/* Back: Spanish Translation */}
              <div className="absolute inset-0 w-full h-full p-4 sm:p-6 backface-hidden rotate-y-180 flex items-center justify-center overflow-y-auto">
                <p className="text-base sm:text-lg leading-relaxed italic text-emerald-950 dark:text-emerald-100 whitespace-pre-line font-serif">
                  {exercise.translationEs}
                </p>
              </div>
            </div>
          </div>

          {/* Word Bank Area */}
          <div className="flex flex-col gap-2.5 pt-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Banco de palabras
            </span>

            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 p-4 rounded-2xl bg-stone-50 dark:bg-slate-800/60 border border-inherit/40 min-h-[64px]">
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
                        ? 'opacity-30 pointer-events-none bg-slate-200 dark:bg-slate-800 text-slate-500'
                        : isDark
                        ? 'bg-slate-800 hover:bg-sky-600 text-white border border-white/10 hover:shadow-md'
                        : 'bg-white hover:bg-sky-50 text-slate-800 hover:text-sky-700 border border-slate-300 hover:border-sky-400 hover:shadow-md'
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
                  {(exercise.blanks || []).every(
                    (b) => placedAnswers[b.id] === b.correctAnswer
                  ) ? (
                    <span className="flex items-center gap-1.5 text-sm font-bold text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="w-5 h-5" />
                      ¡Perfecto! Todas las respuestas son correctas.
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

            <div className="flex items-center gap-3">
              <button
                type="button"
                id="reset-cloze-btn"
                onClick={handleReset}
                className={`p-2.5 rounded-xl border transition-all cursor-pointer shadow-xs ${
                  isDark
                    ? 'border-white/10 hover:bg-slate-800 text-slate-300'
                    : 'border-slate-200 hover:bg-stone-100 text-slate-600'
                }`}
                title="Reiniciar respuestas"
                aria-label="Reiniciar respuestas"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                id="check-cloze-btn"
                onClick={handleCheck}
                className="px-6 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                Comprobar Respuestas
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
