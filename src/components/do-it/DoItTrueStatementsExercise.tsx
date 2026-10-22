import React, { useState } from 'react';
import { Volume2, Check, RotateCcw, CheckCircle2, XCircle, RotateCw } from 'lucide-react';
import { speakEnglish, stopSpeaking, playFeedbackSound } from '../../utils/audio';
import { useTheme } from '../../context/ThemeContext';
import { CardSpeechControl } from '../CardSpeechControl';
import { DoItArticleSidebar } from './DoItArticleSidebar';

interface StatementItem {
  id: string;
  statementEn: string;
  statementEs: string;
  isTrue: boolean;
  feedbackEn: string;
  feedbackEs: string;
}

interface DoItTrueStatementsExerciseProps {
  exercise: {
    instructions: string;
    instructionsEs: string;
    statements: StatementItem[];
  };
  accent?: 'US' | 'UK';
  speechRate?: number;
  onSuccess?: () => void;
}

export const DoItTrueStatementsExercise: React.FC<DoItTrueStatementsExerciseProps> = ({
  exercise,
  accent = 'US',
  speechRate = 1.0,
  onSuccess,
}) => {
  const { isDark } = useTheme();

  // Reversible instruction card state
  const [isInstructionFlipped, setIsInstructionFlipped] = useState(false);

  // Selected checkbox IDs: statementId -> boolean
  const [selectedIds, setSelectedIds] = useState<Record<string, boolean>>({});

  // Translation flip state: statementId -> boolean
  const [flippedStatements, setFlippedStatements] = useState<Record<string, boolean>>({});

  // Check state
  const [hasChecked, setHasChecked] = useState(false);
  const [isAllCorrect, setIsAllCorrect] = useState(false);

  const statements = exercise.statements || [];

  const handleToggleCheck = (id: string) => {
    playFeedbackSound('click');
    setSelectedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
    setHasChecked(false);
  };

  const handleToggleFlip = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    playFeedbackSound('click');
    setFlippedStatements((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handlePlayAudio = (text: string, e: React.MouseEvent) => {
    e.stopPropagation();
    stopSpeaking();
    speakEnglish(text, speechRate, accent === 'UK' ? 'UK' : 'US');
  };

  const handleCheck = () => {
    let allRight = true;
    statements.forEach((st) => {
      const isSelected = Boolean(selectedIds[st.id]);
      if (isSelected !== st.isTrue) {
        allRight = false;
      }
    });

    setIsAllCorrect(allRight);
    setHasChecked(true);

    if (allRight) {
      playFeedbackSound('correct');
      if (onSuccess) onSuccess();
    } else {
      playFeedbackSound('wrong');
    }
  };

  const handleReset = () => {
    playFeedbackSound('click');
    setSelectedIds({});
    setHasChecked(false);
    setIsAllCorrect(false);
    setFlippedStatements({});
  };

  return (
    <div className="w-full flex flex-col items-center gap-6 animate-in fade-in duration-200 py-2 select-none">
      {/* Reversible Instruction Header Card */}
      <div className="w-full max-w-4xl perspective-1000">
        <div
          onClick={() => setIsInstructionFlipped((prev) => !prev)}
          className={`relative w-full rounded-2xl cursor-pointer transition-transform duration-500 transform-style-3d shadow-md ${
            isInstructionFlipped ? 'rotate-y-180' : ''
          }`}
          title="Click to flip translation"
        >
          {/* Front: English */}
          <div
            className={`w-full rounded-2xl p-4 sm:p-5 flex items-center justify-between border backface-hidden transition-colors ${
              isDark
                ? 'bg-slate-900 border-sky-500/30 text-white'
                : 'bg-white border-slate-200 text-slate-800'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-sky-500/10 text-sky-500 flex items-center justify-center font-bold text-sm">
                4
              </span>
              <div>
                <h3 className="font-bold text-base sm:text-lg">{exercise.instructions}</h3>
                <p className="text-xs text-slate-400 dark:text-slate-500">
                  Select only the statements that are true according to the text · Click to translate
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
              <CardSpeechControl
                textToSpeak={exercise.instructions}
                accent={accent}
                initialSpeed={speechRate}
              />
              <button
                type="button"
                onClick={() => setIsInstructionFlipped((prev) => !prev)}
                className="p-2 rounded-xl text-xs font-semibold text-sky-600 dark:text-sky-400 hover:bg-sky-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-1"
              >
                <RotateCw className="w-4 h-4" />
                <span className="hidden sm:inline">Español</span>
              </button>
            </div>
          </div>

          {/* Back: Spanish */}
          <div
            className={`absolute inset-0 w-full h-full rounded-2xl p-4 sm:p-5 flex items-center justify-between border backface-hidden rotate-y-180 transition-colors ${
              isDark
                ? 'bg-slate-900 border-emerald-500/40 text-white'
                : 'bg-white border-emerald-300 text-slate-800'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold text-sm">
                4
              </span>
              <div>
                <h3 className="font-bold text-base sm:text-lg font-serif italic text-emerald-600 dark:text-emerald-400">
                  {exercise.instructionsEs}
                </h3>
                <p className="text-xs text-slate-400 dark:text-slate-500 font-sans not-italic">
                  Marca solo las afirmaciones que son verdaderas según el texto · Clic para volver a inglés
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsInstructionFlipped((prev) => !prev)}
              className="p-2 rounded-xl text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-1"
            >
              <RotateCw className="w-4 h-4" />
              <span>Inglés</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Container: Left Article + Right Checkboxes */}
      <div className="w-full max-w-5xl flex flex-col lg:flex-row gap-6 items-start justify-center">
        {/* Left: Article Sidebar */}
        <DoItArticleSidebar accent={accent} speechRate={speechRate} />

        {/* Right: Checkboxes List */}
        <div className="flex-1 w-full flex flex-col gap-3">
          <div className="text-xs text-slate-400 dark:text-slate-500 px-1">
            Check the boxes next to true statements:
          </div>

          <div className="space-y-2.5">
            {statements.map((st) => {
              const isChecked = Boolean(selectedIds[st.id]);
              const isFlipped = Boolean(flippedStatements[st.id]);
              const isCorrectSelection = isChecked === st.isTrue;

              return (
                <div
                  key={st.id}
                  onClick={() => handleToggleCheck(st.id)}
                  className={`w-full p-4 rounded-2xl border transition-all duration-150 flex items-start gap-3.5 cursor-pointer select-none ${
                    isChecked
                      ? isDark
                        ? 'bg-sky-950/30 border-sky-500 shadow-xs'
                        : 'bg-sky-50/70 border-sky-400 shadow-xs'
                      : isDark
                      ? 'bg-slate-900 border-slate-800 text-slate-200 hover:bg-slate-800/80'
                      : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50 shadow-xs'
                  } ${
                    hasChecked
                      ? isCorrectSelection
                        ? 'border-emerald-500 ring-1 ring-emerald-500/30'
                        : 'border-rose-500 ring-1 ring-rose-500/30'
                      : ''
                  }`}
                >
                  {/* Styled Checkbox box */}
                  <div
                    className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                      isChecked
                        ? hasChecked
                          ? isCorrectSelection
                            ? 'bg-emerald-500 border-emerald-500 text-white'
                            : 'bg-rose-500 border-rose-500 text-white'
                          : 'bg-sky-600 border-sky-600 text-white'
                        : 'border-slate-400 dark:border-slate-600 bg-transparent'
                    }`}
                  >
                    {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>

                  {/* Statement Text & Translation */}
                  <div className="flex-1 min-w-0 pr-1">
                    <p className="text-sm sm:text-base font-medium leading-snug">
                      {isFlipped ? (
                        <span className="font-serif italic text-emerald-600 dark:text-emerald-400">
                          {st.statementEs}
                        </span>
                      ) : (
                        st.statementEn
                      )}
                    </p>

                    {/* Feedback when checked */}
                    {hasChecked && (
                      <p
                        className={`text-xs mt-1.5 font-medium ${
                          isCorrectSelection
                            ? 'text-emerald-600 dark:text-emerald-400'
                            : 'text-rose-600 dark:text-rose-400'
                        }`}
                      >
                        {isCorrectSelection ? '✓ ' : '✗ '}
                        {st.feedbackEs}
                      </p>
                    )}
                  </div>

                  {/* Audio & Flip buttons */}
                  <div className="flex items-center gap-1 shrink-0 mt-0.5" onClick={(e) => e.stopPropagation()}>
                    <button
                      type="button"
                      onClick={(e) => handleToggleFlip(st.id, e)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-sky-500 transition-colors"
                      title="Traducir"
                    >
                      <RotateCw className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={(e) => handlePlayAudio(st.statementEn, e)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-sky-500 transition-colors"
                      title="Escuchar"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Feedback & Action Buttons */}
          {hasChecked && (
            <div
              className={`mt-2 p-3.5 rounded-2xl text-xs sm:text-sm flex items-center gap-2.5 animate-in fade-in duration-200 ${
                isAllCorrect
                  ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300'
                  : 'bg-rose-500/10 border border-rose-500/30 text-rose-700 dark:text-rose-300'
              }`}
            >
              {isAllCorrect ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
              ) : (
                <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
              )}
              <p className="font-semibold">
                {isAllCorrect
                  ? '¡Excelente! Has identificado todas las afirmaciones verdaderas correctamente.'
                  : 'Algunas selecciones son incorrectas. Recuerda marcar solo las afirmaciones verdaderas según el texto.'}
              </p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={handleReset}
              className={`w-full sm:w-auto px-5 py-3 rounded-2xl border font-semibold text-sm transition-all cursor-pointer flex items-center justify-center gap-2 ${
                isDark
                  ? 'border-slate-700 hover:bg-slate-800 text-slate-300'
                  : 'border-slate-300 hover:bg-slate-100 text-slate-700 shadow-xs'
              }`}
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reiniciar</span>
            </button>

            <button
              type="button"
              onClick={handleCheck}
              className="w-full sm:w-auto px-7 py-3 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm shadow-md shadow-sky-600/30 transition-all cursor-pointer flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95"
            >
              <Check className="w-4 h-4" />
              <span>Comprobar Respuestas</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
