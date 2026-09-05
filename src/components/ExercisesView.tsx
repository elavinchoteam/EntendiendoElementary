import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  CheckCircle,
  XCircle,
  Volume2,
  HelpCircle,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Trophy,
  Award,
  BookOpen,
} from 'lucide-react';
import {
  Exercise,
  MultipleChoiceExercise,
  FillBlankExercise,
  SentenceBuilderExercise,
  MatchingExercise,
} from '../types';
import { speakEnglish, playFeedbackSound } from '../utils/audio';
import { AudioWaveIndicator } from './AudioWaveIndicator';
import { MatchingTableExercise } from './MatchingTableExercise';
import { useTheme } from '../context/ThemeContext';

interface ExercisesViewProps {
  exercises: Exercise[];
  unitNumber: number;
  unitTitle: string;
  onCompleteUnit: (score: number) => void;
  accent: 'US' | 'UK';
}

export const ExercisesView: React.FC<ExercisesViewProps> = ({
  exercises,
  unitNumber,
  unitTitle,
  onCompleteUnit,
  accent,
}) => {
  const { isDark } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [selectedWords, setSelectedWords] = useState<string[]>([]); // For sentence builder
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const currentExercise = exercises[currentIndex];

  // Reset state when changing exercise
  useEffect(() => {
    setSelectedAnswer(null);
    setSelectedWords([]);
    setIsSubmitted(false);
    setIsCorrect(false);
  }, [currentIndex]);

  const handleSpeak = (text: string) => {
    setIsSpeaking(true);
    speakEnglish(
      text,
      1.0,
      accent,
      () => setIsSpeaking(true),
      () => setIsSpeaking(false)
    );
  };

  // Play audio automatically if exercise has audioPrompt and not submitted yet
  useEffect(() => {
    if (currentExercise && 'audioPrompt' in currentExercise && currentExercise.audioPrompt) {
      handleSpeak(currentExercise.audioPrompt);
    }
  }, [currentIndex]);

  const handleSelectOption = (option: string) => {
    if (isSubmitted) return;
    playFeedbackSound('click');
    setSelectedAnswer(option);
  };

  // Sentence Builder word selection
  const handleToggleWord = (word: string, index: number) => {
    if (isSubmitted) return;
    playFeedbackSound('click');
    setSelectedWords([...selectedWords, word]);
  };

  const handleRemoveWord = (index: number) => {
    if (isSubmitted) return;
    playFeedbackSound('click');
    const newWords = [...selectedWords];
    newWords.splice(index, 1);
    setSelectedWords(newWords);
  };

  const handleCheckAnswer = () => {
    if (isSubmitted || !currentExercise) return;

    let correct = false;

    if (currentExercise.type === 'multiple-choice' || currentExercise.type === 'listen-and-choose') {
      const ex = currentExercise as MultipleChoiceExercise;
      correct = selectedAnswer === ex.correctAnswer;
    } else if (currentExercise.type === 'fill-blank') {
      const ex = currentExercise as FillBlankExercise;
      correct = selectedAnswer === ex.correctAnswer;
    } else if (currentExercise.type === 'sentence-builder') {
      const ex = currentExercise as SentenceBuilderExercise;
      const constructed = selectedWords.join(' ');
      correct = constructed.trim() === ex.correctSentence.trim();
    }

    setIsCorrect(correct);
    setIsSubmitted(true);

    if (correct) {
      playFeedbackSound('correct');
      setCorrectAnswersCount((prev) => prev + 1);
    } else {
      playFeedbackSound('wrong');
    }
  };

  const handleNextExercise = () => {
    if (currentIndex < exercises.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Completed all exercises in unit!
      const finalScore = Math.round(((correctAnswersCount + (isCorrect ? 0 : 0)) / exercises.length) * 100);
      setIsCompleted(true);
      playFeedbackSound('complete');
      onCompleteUnit(finalScore);

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (e) {
        console.warn('Confetti error', e);
      }
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setCorrectAnswersCount(0);
    setIsCompleted(false);
    setSelectedAnswer(null);
    setSelectedWords([]);
    setIsSubmitted(false);
  };

  if (!exercises || exercises.length === 0) {
    return (
      <div className={`p-8 rounded-2xl border text-center font-mono ${
        isDark ? 'bg-white/5 border-white/10 text-white/50' : 'bg-slate-50 border-slate-200 text-slate-500'
      }`}>
        No hay ejercicios cargados para esta unidad aún.
      </div>
    );
  }

  // Summary / Completed Screen
  if (isCompleted) {
    const finalScore = Math.round((correctAnswersCount / exercises.length) * 100);
    return (
      <div className={`flex flex-col items-center justify-center p-6 sm:p-10 text-center max-w-lg mx-auto rounded-2xl border shadow-xl animate-in zoom-in-95 duration-300 ${
        isDark ? 'bg-[#111827] border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 ${
          isDark ? 'bg-indigo-500/20 border border-indigo-500/30 text-indigo-400' : 'bg-indigo-50 border border-indigo-200 text-indigo-600'
        }`}>
          <Trophy className="w-8 h-8" />
        </div>

        <span className={`text-xs font-mono font-bold uppercase tracking-widest ${
          isDark ? 'text-indigo-400' : 'text-indigo-600'
        }`}>
          Unidad {unitNumber} Completada
        </span>

        <h3 className="text-2xl sm:text-3xl font-extrabold mt-1.5 font-serif italic">
          {unitTitle}
        </h3>

        <div className={`my-6 p-5 rounded-xl border w-full ${
          isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="text-4xl font-extrabold text-emerald-500 font-mono tracking-tight">
            {finalScore}%
          </div>
          <div className={`text-xs font-mono mt-1 ${isDark ? 'text-white/50' : 'text-slate-500'}`}>
            Has acertado {correctAnswersCount} de {exercises.length} ejercicios correctamente
          </div>
        </div>

        <p className={`text-sm mb-6 leading-relaxed ${isDark ? 'text-white/70' : 'text-slate-600'}`}>
          {finalScore >= 80
            ? '¡Excelente trabajo! Has asimilado los conceptos y vocabulario de esta lección con gran precisión.'
            : '¡Buen intento! Puedes reiniciar los ejercicios para perfeccionar tu puntuación y comprensión auditiva.'}
        </p>

        <div className="flex flex-wrap gap-3 justify-center w-full">
          <button
            onClick={handleRestart}
            className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border font-mono text-xs uppercase tracking-wider cursor-pointer transition-colors ${
              isDark
                ? 'border-white/15 bg-white/5 hover:bg-white/10 text-white'
                : 'border-slate-200 bg-white hover:bg-slate-100 text-slate-800 shadow-xs'
            }`}
          >
            <RotateCcw className="w-4 h-4" />
            <span>Repetir ejercicios</span>
          </button>
        </div>
      </div>
    );
  }

  // If current exercise is matching-table
  if (currentExercise.type === 'matching-table') {
    const matchingEx = currentExercise as MatchingExercise;
    return (
      <div className="w-full max-w-3xl mx-auto">
        <MatchingTableExercise
          instructionText={matchingEx.instructions}
          audioPrompt={matchingEx.audioPrompt}
          pairs={matchingEx.pairs}
          optionsPool={matchingEx.optionsPool}
          accent={accent}
          onSuccess={() => {
            setCorrectAnswersCount((p) => p + 1);
            handleNextExercise();
          }}
        />
      </div>
    );
  }

  // Active Standard Exercise Screen
  return (
    <div className={`flex flex-col w-full max-w-2xl mx-auto ${isDark ? 'text-white' : 'text-slate-900'}`}>
      
      {/* Progress header */}
      <div className={`mb-3 flex items-center justify-between text-xs font-mono ${
        isDark ? 'text-white/50' : 'text-slate-500'
      }`}>
        <span className={isDark ? 'text-white/80' : 'text-slate-800'}>
          Ejercicio {currentIndex + 1} de {exercises.length}
        </span>
        <div className="flex items-center gap-1.5">
          <span>Aciertos:</span>
          <span className="text-emerald-500 font-bold">{correctAnswersCount}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className={`w-full h-1.5 rounded-full overflow-hidden mb-6 ${
        isDark ? 'bg-white/10' : 'bg-slate-200'
      }`}>
        <div
          className="h-full bg-indigo-600 rounded-full transition-all duration-300"
          style={{ width: `${((currentIndex) / exercises.length) * 100}%` }}
        />
      </div>

      {/* Exercise Card */}
      <div className={`rounded-2xl border p-6 sm:p-8 shadow-xl transition-colors ${
        isDark ? 'bg-[#111827] border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-md'
      }`}>
        
        {/* Exercise Badge & Title */}
        <div className="flex items-center justify-between mb-4">
          <span className={`px-2.5 py-1 rounded-md text-[11px] font-mono font-bold uppercase tracking-wider border ${
            isDark
              ? 'bg-white/5 border-white/10 text-indigo-300'
              : 'bg-indigo-50 border-indigo-200 text-indigo-700'
          }`}>
            {currentExercise.type === 'multiple-choice' && 'Opción Múltiple'}
            {currentExercise.type === 'listen-and-choose' && 'Comprensión Auditiva 🎧'}
            {currentExercise.type === 'fill-blank' && 'Completar Espacio'}
            {currentExercise.type === 'sentence-builder' && 'Construir Oración'}
          </span>

          {currentExercise.audioPrompt && (
            <button
              onClick={() => handleSpeak(currentExercise.audioPrompt!)}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border text-xs font-mono cursor-pointer transition-colors ${
                isDark
                  ? 'bg-white/5 border-white/10 text-indigo-300 hover:text-white hover:bg-white/10'
                  : 'bg-indigo-50 border-indigo-200 text-indigo-700 hover:bg-indigo-100'
              }`}
              title="Escuchar audio de la pregunta"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Escuchar audio</span>
              <AudioWaveIndicator isPlaying={isSpeaking} colorClass={isDark ? 'bg-indigo-400' : 'bg-indigo-600'} size="sm" />
            </button>
          )}
        </div>

        {/* Question Prompt */}
        <div className="my-3">
          <h3 className="text-lg sm:text-xl font-bold leading-snug">
            {currentExercise.question}
          </h3>
          {currentExercise.questionEs && (
            <p className={`text-xs italic mt-1 font-serif ${isDark ? 'text-white/50' : 'text-slate-500'}`}>
              Traducción: {currentExercise.questionEs}
            </p>
          )}
        </div>

        {/* TYPE 1: MULTIPLE CHOICE or LISTEN-AND-CHOOSE */}
        {(currentExercise.type === 'multiple-choice' || currentExercise.type === 'listen-and-choose') && (
          <div className="mt-6 space-y-2.5">
            {(currentExercise as MultipleChoiceExercise).options.map((option, idx) => {
              const isSelected = selectedAnswer === option;
              const isOptionCorrect = option === (currentExercise as MultipleChoiceExercise).correctAnswer;

              let optionClasses = isDark
                ? 'bg-white/5 border-white/10 text-white/90 hover:bg-white/10 hover:border-white/20'
                : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100 hover:border-slate-300';

              if (isSelected && !isSubmitted) {
                optionClasses = isDark
                  ? 'bg-indigo-600/30 border-indigo-400 text-white shadow-sm'
                  : 'bg-indigo-50 border-indigo-600 text-indigo-900 ring-2 ring-indigo-100';
              } else if (isSubmitted) {
                if (isOptionCorrect) {
                  optionClasses = isDark
                    ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 font-bold'
                    : 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold';
                } else if (isSelected && !isCorrect) {
                  optionClasses = isDark
                    ? 'bg-rose-500/20 border-rose-400 text-rose-300 line-through'
                    : 'bg-rose-50 border-rose-500 text-rose-900 line-through';
                } else {
                  optionClasses = isDark ? 'opacity-40 border-white/5 bg-white/5' : 'opacity-40 border-slate-100 bg-slate-50';
                }
              }

              return (
                <div
                  key={idx}
                  role="button"
                  tabIndex={isSubmitted ? -1 : 0}
                  onClick={() => handleSelectOption(option)}
                  onKeyDown={(e) => {
                    if (!isSubmitted && (e.key === 'Enter' || e.key === ' ')) {
                      e.preventDefault();
                      handleSelectOption(option);
                    }
                  }}
                  className={`w-full p-4 rounded-xl border text-left flex items-center justify-between gap-3 transition-all font-sans select-none ${
                    isSubmitted ? 'cursor-default' : 'cursor-pointer'
                  } ${optionClasses}`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-7 h-7 rounded-lg border flex items-center justify-center text-xs font-mono font-bold shrink-0 ${
                      isSelected
                        ? isDark ? 'bg-indigo-600 text-white border-indigo-400' : 'bg-indigo-600 text-white border-indigo-600'
                        : isDark ? 'bg-white/5 border-white/10 text-white/50' : 'bg-white border-slate-200 text-slate-500'
                    }`}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="text-sm sm:text-base font-medium">{option}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSpeak(option);
                      }}
                      className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                        isDark ? 'text-white/30 hover:text-indigo-300 hover:bg-white/10' : 'text-slate-400 hover:text-indigo-600 hover:bg-slate-200'
                      }`}
                      title="Escuchar opción"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                    {isSubmitted && isOptionCorrect && (
                      <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                    )}
                    {isSubmitted && isSelected && !isCorrect && (
                      <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* TYPE 2: FILL IN THE BLANK */}
        {currentExercise.type === 'fill-blank' && (
          <div className="mt-6 space-y-4">
            <div className={`p-4 rounded-xl border text-base sm:text-lg font-medium ${
              isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'
            }`}>
              {((currentExercise as FillBlankExercise).sentenceWithBlank || '').split('___').map((part, i, arr) => (
                <React.Fragment key={i}>
                  <span>{part}</span>
                  {i < arr.length - 1 && (
                    <span className={`inline-block px-3 py-1 mx-1.5 rounded-lg border font-mono text-sm font-bold min-w-[90px] text-center ${
                      selectedAnswer
                        ? isSubmitted
                          ? isCorrect
                            ? isDark ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300' : 'bg-emerald-50 border-emerald-500 text-emerald-800'
                            : isDark ? 'bg-rose-500/20 border-rose-400 text-rose-300' : 'bg-rose-50 border-rose-500 text-rose-800'
                          : isDark ? 'bg-indigo-600/30 border-indigo-400 text-white' : 'bg-indigo-100 border-indigo-400 text-indigo-900'
                        : isDark ? 'border-dashed border-white/30 text-white/40' : 'border-dashed border-slate-300 text-slate-400'
                    }`}>
                      {selectedAnswer || '_______'}
                    </span>
                  )}
                </React.Fragment>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-2.5 pt-2">
              {(currentExercise as FillBlankExercise).options.map((option, idx) => (
                <button
                  key={idx}
                  disabled={isSubmitted}
                  onClick={() => handleSelectOption(option)}
                  className={`p-3 rounded-xl border text-sm font-semibold transition-all cursor-pointer ${
                    selectedAnswer === option
                      ? isDark ? 'bg-indigo-600 border-indigo-400 text-white' : 'bg-indigo-600 border-indigo-600 text-white shadow-xs'
                      : isDark ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-white border-slate-200 hover:bg-slate-100 text-slate-800 shadow-2xs'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* TYPE 3: SENTENCE BUILDER */}
        {currentExercise.type === 'sentence-builder' && (
          <div className="mt-6 space-y-4">
            <div className={`min-h-[70px] p-4 rounded-xl border flex flex-wrap gap-2 items-center ${
              isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'
            }`}>
              {selectedWords.length === 0 ? (
                <span className={`text-xs font-mono italic ${isDark ? 'text-white/30' : 'text-slate-400'}`}>
                  Haz clic en las palabras de abajo para formar la oración...
                </span>
              ) : (
                selectedWords.map((word, idx) => (
                  <button
                    key={idx}
                    disabled={isSubmitted}
                    onClick={() => handleRemoveWord(idx)}
                    className={`px-3 py-1.5 rounded-lg border font-medium text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer transition-all ${
                      isDark ? 'bg-indigo-600/30 border-indigo-400 text-white hover:bg-rose-500/20 hover:border-rose-400' : 'bg-indigo-100 border-indigo-300 text-indigo-900 hover:bg-rose-100 hover:border-rose-300 hover:text-rose-900'
                    }`}
                  >
                    <span>{word}</span>
                    {!isSubmitted && <span className="opacity-60 text-[10px]">✕</span>}
                  </button>
                ))
              )}
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {(currentExercise as SentenceBuilderExercise).scrambledWords.map((word, idx) => (
                <button
                  key={idx}
                  disabled={isSubmitted}
                  onClick={() => handleToggleWord(word, idx)}
                  className={`px-3 py-2 rounded-xl border text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    isDark ? 'bg-white/5 border-white/10 hover:bg-white/10 text-white' : 'bg-white border-slate-200 hover:bg-slate-100 text-slate-800 shadow-2xs'
                  }`}
                >
                  {word}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* FEEDBACK EXPLANATION ACCORDION ON SUBMIT */}
        {isSubmitted && (
          <div
            className={`mt-6 p-4 rounded-xl border animate-in fade-in duration-200 ${
              isCorrect
                ? isDark
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                  : 'bg-emerald-50 border-emerald-300 text-emerald-900'
                : isDark
                ? 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                : 'bg-rose-50 border-rose-300 text-rose-900'
            }`}
          >
            <div className="flex items-start gap-2.5">
              {isCorrect ? (
                <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
              )}
              <div className="text-xs sm:text-sm leading-relaxed">
                <p className="font-bold">
                  {isCorrect ? '¡Respuesta Correcta!' : 'Respuesta Incorrecta'}
                </p>
                {currentExercise.explanation && (
                  <p className={`mt-1 ${isDark ? 'text-white/80' : 'text-slate-700'}`}>
                    {currentExercise.explanation}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ACTION BUTTONS (Comprobar / Siguiente) */}
        <div className={`mt-6 pt-4 border-t flex items-center justify-between gap-3 ${
          isDark ? 'border-white/10' : 'border-slate-200'
        }`}>
          <div>
            {currentExercise.hint && !isSubmitted && (
              <span className={`text-xs inline-flex items-center gap-1 font-serif italic ${
                isDark ? 'text-white/40' : 'text-slate-400'
              }`}>
                <HelpCircle className="w-3.5 h-3.5" /> Pista: {currentExercise.hint}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {!isSubmitted ? (
              <button
                id="check-answer-btn"
                onClick={handleCheckAnswer}
                disabled={
                  (currentExercise.type !== 'sentence-builder' && !selectedAnswer) ||
                  (currentExercise.type === 'sentence-builder' && selectedWords.length === 0)
                }
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-xs"
              >
                Comprobar
              </button>
            ) : (
              <button
                id="next-exercise-btn"
                onClick={handleNextExercise}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-xs"
              >
                <span>{currentIndex < exercises.length - 1 ? 'Siguiente Ejercicio' : 'Finalizar Unidad'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
