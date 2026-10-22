import React, { useState } from 'react';
import { Volume2, Check, RotateCcw, CheckCircle2, XCircle, RotateCw } from 'lucide-react';
import { speakEnglish, stopSpeaking, playFeedbackSound } from '../../utils/audio';
import { useTheme } from '../../context/ThemeContext';
import { CardSpeechControl } from '../CardSpeechControl';
import { DoItArticleSidebar } from './DoItArticleSidebar';

interface QuestionOption {
  id: string;
  text: string;
  textEs: string;
}

interface QuestionItem {
  id: string;
  number: number;
  question: string;
  questionEs: string;
  options: QuestionOption[];
  correctAnswerId: string;
  explanation: string;
  explanationEs: string;
}

interface DoItQuestionsExerciseProps {
  exercise: {
    instructions: string;
    instructionsEs: string;
    questions: QuestionItem[];
  };
  accent?: 'US' | 'UK';
  speechRate?: number;
  onSuccess?: () => void;
}

export const DoItQuestionsExercise: React.FC<DoItQuestionsExerciseProps> = ({
  exercise,
  accent = 'US',
  speechRate = 1.0,
  onSuccess,
}) => {
  const { isDark } = useTheme();

  // Reversible instruction card state
  const [isInstructionFlipped, setIsInstructionFlipped] = useState(false);

  // Selected option for each question: questionId -> optionId
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});

  // Question translation flips: questionId -> boolean
  const [flippedQuestions, setFlippedQuestions] = useState<Record<string, boolean>>({});

  // Option translation flips: optionId -> boolean
  const [flippedOptions, setFlippedOptions] = useState<Record<string, boolean>>({});

  // Check state
  const [hasChecked, setHasChecked] = useState(false);
  const [isAllCorrect, setIsAllCorrect] = useState(false);

  const questions = exercise.questions || [];

  const handleSelectOption = (questionId: string, optionId: string) => {
    playFeedbackSound('click');
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
    setHasChecked(false);
  };

  const handleToggleQuestionFlip = (questionId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    playFeedbackSound('click');
    setFlippedQuestions((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  const handleToggleOptionFlip = (optionId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    playFeedbackSound('click');
    setFlippedOptions((prev) => ({
      ...prev,
      [optionId]: !prev[optionId],
    }));
  };

  const handlePlayAudio = (text: string, e: React.MouseEvent) => {
    e.stopPropagation();
    stopSpeaking();
    speakEnglish(text, speechRate, accent === 'UK' ? 'UK' : 'US');
  };

  const handleCheck = () => {
    const allAnswered = questions.every((q) => selectedAnswers[q.id]);
    if (!allAnswered) {
      playFeedbackSound('wrong');
      setHasChecked(true);
      return;
    }

    const correctCount = questions.filter((q) => selectedAnswers[q.id] === q.correctAnswerId).length;
    const allRight = correctCount === questions.length;

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
    setSelectedAnswers({});
    setHasChecked(false);
    setIsAllCorrect(false);
    setFlippedQuestions({});
    setFlippedOptions({});
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
                2
              </span>
              <div>
                <h3 className="font-bold text-base sm:text-lg">
                  {exercise.instructions || 'Read the article "Do It," and then answer the questions.'}
                </h3>
                <p className="text-xs text-slate-400 dark:text-slate-500">
                  Select the best answer for each question · Click to translate
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
                2
              </span>
              <div>
                <h3 className="font-bold text-base sm:text-lg font-serif italic text-emerald-600 dark:text-emerald-400">
                  {exercise.instructionsEs || 'Lee el artículo "¡Hazlo!", y luego responde a las preguntas.'}
                </h3>
                <p className="text-xs text-slate-400 dark:text-slate-500 font-sans not-italic">
                  Selecciona la mejor respuesta para cada pregunta · Clic para volver a inglés
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

      {/* Main Container: Left Article + Right Questions */}
      <div className="w-full max-w-5xl flex flex-col lg:flex-row gap-6 items-start justify-center">
        {/* Left: Article Sidebar with highlighted cake instructions (indices 10 & 11) */}
        <DoItArticleSidebar
          highlightSentenceIdx={[10, 11]}
          accent={accent}
          speechRate={speechRate}
        />

        {/* Right: 3 Questions list */}
        <div className="flex-1 w-full flex flex-col gap-5">
          {questions.map((q, qIdx) => {
            const selectedOptId = selectedAnswers[q.id];
            const isFlippedQ = Boolean(flippedQuestions[q.id]);
            const isCorrect = selectedOptId === q.correctAnswerId;

            return (
              <div
                key={q.id}
                className={`w-full p-5 sm:p-6 rounded-3xl border shadow-sm transition-all duration-200 ${
                  isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                } ${
                  hasChecked
                    ? isCorrect
                      ? 'ring-2 ring-emerald-500/30 border-emerald-500'
                      : 'ring-2 ring-rose-500/30 border-rose-500'
                    : ''
                }`}
              >
                {/* Question Header */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div
                    onClick={(e) => handleToggleQuestionFlip(q.id, e)}
                    className="flex-1 cursor-pointer group"
                    title="Click to translate question"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 rounded-full text-xs font-mono font-bold uppercase bg-sky-500/10 text-sky-600 dark:text-sky-400">
                        Question {qIdx + 1}
                      </span>
                      <span className="text-[11px] text-slate-400 flex items-center gap-1 group-hover:text-sky-500 transition-colors">
                        <RotateCw className="w-3 h-3" />
                        <span>Traducir</span>
                      </span>
                    </div>

                    <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
                      {isFlippedQ ? (
                        <span className="font-serif italic text-emerald-600 dark:text-emerald-400">
                          {q.questionEs}
                        </span>
                      ) : (
                        q.question
                      )}
                    </h4>
                  </div>

                  {/* Speaker Button */}
                  <button
                    type="button"
                    onClick={(e) => handlePlayAudio(q.question, e)}
                    className={`p-2 rounded-xl border transition-all cursor-pointer shrink-0 ${
                      isDark
                        ? 'bg-slate-800/80 hover:bg-slate-700 text-sky-300 border-white/10'
                        : 'bg-white hover:bg-sky-50 text-sky-700 border-slate-200 shadow-xs'
                    }`}
                    title="Listen to question"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Options list (Radio buttons) */}
                <div className="space-y-2.5">
                  {q.options.map((opt) => {
                    const isSelected = selectedOptId === opt.id;
                    const isOptFlipped = Boolean(flippedOptions[opt.id]);
                    const isOptionCorrect = opt.id === q.correctAnswerId;

                    return (
                      <div
                        key={opt.id}
                        onClick={() => handleSelectOption(q.id, opt.id)}
                        className={`w-full p-3.5 rounded-2xl border transition-all duration-150 flex items-center justify-between cursor-pointer select-none ${
                          isSelected
                            ? isDark
                              ? 'bg-sky-950/40 border-sky-500 text-white shadow-xs'
                              : 'bg-sky-50 border-sky-500 text-sky-950 shadow-xs'
                            : isDark
                            ? 'bg-slate-800/50 border-white/5 text-slate-300 hover:bg-slate-800'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                        } ${
                          hasChecked && isSelected
                            ? isOptionCorrect
                              ? 'bg-emerald-500/10 border-emerald-500 text-emerald-600 dark:text-emerald-400'
                              : 'bg-rose-500/10 border-rose-500 text-rose-600 dark:text-rose-400'
                            : ''
                        }`}
                      >
                        <div className="flex items-center gap-3 flex-1 min-w-0 pr-2">
                          {/* Radio circle */}
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                              isSelected
                                ? hasChecked
                                  ? isOptionCorrect
                                    ? 'border-emerald-500 bg-emerald-500 text-white'
                                    : 'border-rose-500 bg-rose-500 text-white'
                                  : 'border-sky-600 bg-sky-600 text-white'
                                : 'border-slate-400 dark:border-slate-600 bg-transparent'
                            }`}
                          >
                            {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                          </div>

                          <div
                            onClick={(e) => handleToggleOptionFlip(opt.id, e)}
                            className="flex-1 cursor-pointer"
                            title="Click option text to toggle translation"
                          >
                            <span className="text-sm sm:text-base font-medium">
                              {isOptFlipped ? (
                                <span className="font-serif italic text-emerald-600 dark:text-emerald-400">
                                  {opt.textEs}
                                </span>
                              ) : (
                                opt.text
                              )}
                            </span>
                          </div>
                        </div>

                        {/* Speaker button */}
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            type="button"
                            onClick={(e) => handlePlayAudio(opt.text, e)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-sky-500 transition-colors"
                            title="Listen"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Explanation on check */}
                {hasChecked && (
                  <div
                    className={`mt-4 p-3.5 rounded-2xl text-xs sm:text-sm flex items-start gap-2.5 animate-in fade-in duration-200 ${
                      isCorrect
                        ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300'
                        : 'bg-rose-500/10 border border-rose-500/30 text-rose-700 dark:text-rose-300'
                    }`}
                  >
                    {isCorrect ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <p className="font-semibold">{isCorrect ? '¡Correcto!' : 'Respuesta incorrecta'}</p>
                      <p className="mt-0.5 text-xs opacity-90">{q.explanationEs}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* Action Buttons: Check & Reset */}
          <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
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
