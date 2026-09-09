import React, { useState } from 'react';
import { RotateCcw, Check, Sparkles, CheckCircle2, XCircle } from 'lucide-react';
import { TrueFalseSelectionExercise as TrueFalseExerciseType } from '../types';
import { playFeedbackSound } from '../utils/audio';
import { useTheme } from '../context/ThemeContext';
import { AudioPlayerCard } from './AudioPlayerCard';
import { CardSpeechControl } from './CardSpeechControl';
import sheilaKitchenImg from '../assets/images/sheila_kitchen_salad_1788913662919.jpg';

interface FoodTrueFalseExerciseProps {
  exercise: TrueFalseExerciseType;
  accent?: 'US' | 'UK';
  speechRate?: number;
  onSuccess?: () => void;
}

export const FoodTrueFalseExercise: React.FC<FoodTrueFalseExerciseProps> = ({
  exercise,
  accent = 'US',
  speechRate = 1.0,
  onSuccess,
}) => {
  const { isDark } = useTheme();

  // Reversible instruction card state
  const [isInstructionFlipped, setIsInstructionFlipped] = useState(false);

  // Selected checkbox states: statementId -> boolean (checked/unchecked)
  const [selectedIds, setSelectedIds] = useState<Record<string, boolean>>({});

  // Reversible statement cards: statementId -> isFlipped
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  // Check state
  const [hasChecked, setHasChecked] = useState(false);
  const [isAllCorrect, setIsAllCorrect] = useState(false);

  const statements = exercise.statements || [];

  const handleToggleCardFlip = (id: string) => {
    playFeedbackSound('click');
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleToggleCheckbox = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    playFeedbackSound('click');
    setSelectedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
    setHasChecked(false);
  };

  const handleCheck = () => {
    playFeedbackSound('click');
    setHasChecked(true);

    let allOk = true;
    for (const stmt of statements) {
      const isChecked = !!selectedIds[stmt.id];
      if (isChecked !== stmt.isTrue) {
        allOk = false;
        break;
      }
    }

    setIsAllCorrect(allOk);
    if (allOk) {
      playFeedbackSound('correct');
      if (onSuccess) onSuccess();
    } else {
      playFeedbackSound('wrong');
    }
  };

  const handleClear = () => {
    playFeedbackSound('click');
    setSelectedIds({});
    setHasChecked(false);
    setIsAllCorrect(false);
  };

  return (
    <div className="w-full flex flex-col gap-6 select-none">
      {/* 1. REVERSIBLE INSTRUCTION CARD (NO FLIP BUTTONS, NO GRADIENTS, WITH AUDIO & SPEED) */}
      <div
        id="tf-instruction-card"
        onClick={() => {
          playFeedbackSound('click');
          setIsInstructionFlipped((prev) => !prev);
        }}
        className={`w-full p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer shadow-sm relative ${
          isDark
            ? 'bg-slate-900 border-slate-700 hover:border-emerald-500/50 text-slate-100'
            : 'bg-white border-slate-200 hover:border-emerald-400 text-slate-800'
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            <span className="text-[11px] font-mono uppercase font-bold tracking-wider text-emerald-500 block mb-1">
              {isInstructionFlipped ? 'Instrucción (Español)' : 'Instructions (English)'}
            </span>
            <p className="text-base sm:text-lg font-medium leading-snug">
              {isInstructionFlipped
                ? '¿Qué dice Sheila sobre las ensaladas? Marca las respuestas verdaderas.'
                : 'What does Sheila say about salads? Mark the true answers.'}
            </p>
          </div>

          <CardSpeechControl
            textToSpeak="What does Sheila say about salads? Mark the true answers."
            accent={accent}
            initialSpeed={speechRate}
            gender="female"
            size="md"
          />
        </div>
      </div>

      {/* 2. MAIN 2-COLUMN SECTION: PLAYER (LEFT) + 6 STATEMENTS WITH CHECKBOXES (RIGHT) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        {/* Left Column: Media Player (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <AudioPlayerCard
            audioText={exercise.audioPrompt || ''}
            sentences={exercise.sentences || []}
            accent={accent}
            initialPlaybackRate={speechRate}
            totalDurationSeconds={65}
            imageSrc={sheilaKitchenImg}
            altText="Sheila in the kitchen"
            speakerGender="female"
          />
        </div>

        {/* Right Column: 6 Statements (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-3.5">
          {statements.map((stmt, idx) => {
            const isFlipped = !!flippedCards[stmt.id];
            const isChecked = !!selectedIds[stmt.id];
            const isCorrect = hasChecked && isChecked === stmt.isTrue;
            const isIncorrect = hasChecked && isChecked !== stmt.isTrue;

            return (
              <div
                key={stmt.id}
                id={`tf-statement-card-${idx + 1}`}
                onClick={() => handleToggleCardFlip(stmt.id)}
                className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer shadow-xs relative flex flex-col gap-2.5 ${
                  isFlipped
                    ? isDark
                      ? 'bg-slate-900 border-emerald-500/60'
                      : 'bg-white border-emerald-400'
                    : isDark
                    ? 'bg-slate-900 border-slate-800 hover:border-slate-700'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                {/* Header with statement number and speaker control */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-emerald-500/10 text-emerald-500 font-mono font-bold text-xs flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
                      {isFlipped ? 'Español' : 'Statement'}
                    </span>
                  </div>

                  {/* Speaker Control with Speeds (0.5x to 1.30x) */}
                  <CardSpeechControl
                    textToSpeak={stmt.text}
                    accent={accent}
                    initialSpeed={speechRate}
                    gender="female"
                    size="sm"
                  />
                </div>

                {/* Card Content: Front = Checkbox + Statement, Back = Translation */}
                {isFlipped ? (
                  <div className="py-1 text-sm sm:text-base font-medium leading-relaxed">
                    <p className={isDark ? 'text-slate-100' : 'text-slate-800'}>
                      {stmt.textEs}
                    </p>
                  </div>
                ) : (
                  <div className="flex items-center gap-3.5 pt-1">
                    {/* Checkbox */}
                    <div
                      onClick={(e) => handleToggleCheckbox(stmt.id, e)}
                      className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all cursor-pointer shrink-0 ${
                        isChecked
                          ? 'bg-emerald-600 border-emerald-500 text-white shadow-xs'
                          : isDark
                          ? 'border-slate-600 hover:border-emerald-400 bg-slate-800'
                          : 'border-slate-300 hover:border-emerald-500 bg-white'
                      }`}
                    >
                      {isChecked && <Check className="w-4 h-4 stroke-[3]" />}
                    </div>

                    {/* Statement Text */}
                    <p
                      className={`text-sm sm:text-base font-medium leading-relaxed flex-1 ${
                        isDark ? 'text-slate-100' : 'text-slate-800'
                      }`}
                    >
                      {stmt.text}
                    </p>

                    {/* Check Result Icon */}
                    {hasChecked && (
                      <div className="shrink-0">
                        {isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                        {isIncorrect && <XCircle className="w-5 h-5 text-rose-500" />}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={handleClear}
              className={`px-4 py-2.5 rounded-xl border font-semibold text-sm transition-all cursor-pointer flex items-center gap-2 ${
                isDark
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300'
              }`}
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reiniciar</span>
            </button>

            <button
              type="button"
              onClick={handleCheck}
              className={`px-6 py-2.5 rounded-xl font-bold text-sm shadow-md transition-all cursor-pointer flex items-center gap-2 ${
                isAllCorrect
                  ? 'bg-emerald-600 text-white shadow-emerald-500/25'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-500/20'
              }`}
            >
              {isAllCorrect ? <Sparkles className="w-4 h-4" /> : <Check className="w-4 h-4" />}
              <span>{isAllCorrect ? '¡Completado con Éxito!' : 'Comprobar Respuestas'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
