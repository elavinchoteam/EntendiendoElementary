import React, { useState } from 'react';
import { Volume2, Check, RotateCcw, CheckCircle2, XCircle, RotateCw } from 'lucide-react';
import { speakEnglish, stopSpeaking, playFeedbackSound } from '../../utils/audio';
import { useTheme } from '../../context/ThemeContext';
import { AudioPlayerCard } from '../AudioPlayerCard';
import { CardSpeechControl } from '../CardSpeechControl';
import larrySandraImg from '../../assets/images/larry_sandra_interview.jpg';
import { LessonSentence } from '../../types';

interface RadioOption {
  id: string;
  text: string;
  textEs: string;
}

interface RadioQuestion {
  id: string;
  number: number;
  question: string;
  questionEs: string;
  options: RadioOption[];
  correctAnswerId: string;
  explanation: string;
  explanationEs: string;
}

interface InterviewRadioChoiceExerciseProps {
  exercise: {
    instructions: string;
    instructionsEs: string;
    imageUrl?: string;
    audioText: string;
    sentences: LessonSentence[];
    questions: RadioQuestion[];
  };
  accent?: 'US' | 'UK';
  speechRate?: number;
  onSuccess?: () => void;
}

export const InterviewRadioChoiceExercise: React.FC<InterviewRadioChoiceExerciseProps> = ({
  exercise,
  accent = 'US',
  speechRate = 1.0,
  onSuccess,
}) => {
  const { isDark } = useTheme();

  // Reversible instruction card state
  const [isInstructionFlipped, setIsInstructionFlipped] = useState(false);

  // Selected option: questionId -> optionId
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});

  // Flip states: questionId / optionId -> boolean
  const [flippedQuestions, setFlippedQuestions] = useState<Record<string, boolean>>({});
  const [flippedOptions, setFlippedOptions] = useState<Record<string, boolean>>({});

  // Check state
  const [hasChecked, setHasChecked] = useState(false);
  const [isAllCorrect, setIsAllCorrect] = useState(false);

  // Transcript visibility in audio card
  const [isTranscriptVisible, setIsTranscriptVisible] = useState(false);
  const [currentSentenceIdx, setCurrentSentenceIdx] = useState<number | null>(null);

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
    playFeedbackSound('click');
    speakEnglish(text, speechRate, accent);
  };

  const handleCheck = () => {
    playFeedbackSound('click');
    setHasChecked(true);

    let allOk = true;
    for (const q of questions) {
      if (selectedAnswers[q.id] !== q.correctAnswerId) {
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
    setSelectedAnswers({});
    setHasChecked(false);
    setIsAllCorrect(false);
  };

  return (
    <div className="w-full flex flex-col gap-6 select-none animate-in fade-in duration-200">
      {/* 1. REVERSIBLE INSTRUCTION CARD */}
      <div
        id="interview-radio-instructions"
        onClick={() => {
          playFeedbackSound('click');
          setIsInstructionFlipped((prev) => !prev);
        }}
        className={`w-full p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer shadow-sm relative ${
          isDark
            ? 'bg-slate-900 border-slate-700 hover:border-sky-500/50 text-slate-100'
            : 'bg-white border-slate-200 hover:border-sky-400 text-slate-800'
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            <span className="text-[11px] font-mono uppercase font-bold tracking-wider text-sky-500 block mb-1">
              {isInstructionFlipped ? 'Instrucción (Español) · Clic para alternar' : 'Instructions (English) · Click to translate'}
            </span>
            <p className="text-base sm:text-lg font-medium leading-snug">
              {isInstructionFlipped
                ? exercise.instructionsEs || 'Elige la respuesta correcta.'
                : exercise.instructions || 'Choose the correct answer.'}
            </p>
          </div>

          <CardSpeechControl
            textToSpeak={exercise.instructions || 'Choose the correct answer.'}
            accent={accent}
            initialSpeed={speechRate}
            gender="female"
            size="md"
          />
        </div>
      </div>

      {/* 2. TWO-COLUMN: AUDIO PLAYER + QUESTIONS */}
      <div className="w-full flex flex-col lg:flex-row gap-6 items-start">
        {/* Left: Audio Player Card */}
        <div className="w-full max-w-[340px] mx-auto lg:mx-0 shrink-0 flex flex-col">
          <AudioPlayerCard
            audioText={exercise.audioText}
            sentences={exercise.sentences}
            accent={accent}
            initialPlaybackRate={speechRate}
            currentSentenceIdx={currentSentenceIdx}
            onSentenceChange={(idx) => setCurrentSentenceIdx(idx)}
            onToggleTranscript={() => setIsTranscriptVisible((prev) => !prev)}
            isTranscriptVisible={isTranscriptVisible}
            totalDurationSeconds={70}
            imageSrc={exercise.imageUrl || larrySandraImg}
            altText="Sandra Waters interviews inventor Larry Patel"
            speakerGender="female"
          />
        </div>

        {/* Right: Questions List */}
        <div className="w-full flex-1 flex flex-col gap-5">
          {questions.map((q) => {
            const isFlipped = !!flippedQuestions[q.id];
            const selectedOptId = selectedAnswers[q.id];
            const isQuestionChecked = hasChecked;
            const isQuestionCorrect = isQuestionChecked && selectedOptId === q.correctAnswerId;
            const isQuestionIncorrect = isQuestionChecked && selectedOptId && selectedOptId !== q.correctAnswerId;

            return (
              <div
                key={q.id}
                className={`p-5 rounded-2xl border transition-all shadow-sm ${
                  isQuestionCorrect
                    ? isDark
                      ? 'bg-emerald-950/20 border-emerald-500/40'
                      : 'bg-emerald-50/60 border-emerald-300'
                    : isQuestionIncorrect
                    ? isDark
                      ? 'bg-rose-950/20 border-rose-500/40'
                      : 'bg-rose-50/60 border-rose-300'
                    : isDark
                    ? 'bg-slate-900 border-slate-800'
                    : 'bg-white border-slate-200'
                }`}
              >
                {/* Question Header */}
                <div className="flex items-center justify-between gap-3 mb-3 pb-2 border-b border-inherit/40">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => handlePlayAudio(q.question, e)}
                      className={`p-2 rounded-xl border transition-all cursor-pointer ${
                        isDark
                          ? 'bg-slate-800 hover:bg-slate-700 text-sky-400 border-slate-700'
                          : 'bg-sky-50 hover:bg-sky-100 text-sky-700 border-sky-200'
                      }`}
                      title="Listen"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                    <span className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400">
                      Question {q.number}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => handleToggleQuestionFlip(q.id, e)}
                    className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-sky-500 transition-colors cursor-pointer"
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                    <span>{isFlipped ? 'Inglés' : 'Traducir'}</span>
                  </button>
                </div>

                {/* Question Title */}
                <h4 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
                  {isFlipped ? q.questionEs : q.question}
                </h4>

                {/* Options List */}
                <div className="flex flex-col gap-2.5">
                  {q.options.map((opt) => {
                    const isSelected = selectedOptId === opt.id;
                    const isOptFlipped = !!flippedOptions[opt.id];
                    const isCorrectAnswer = isQuestionChecked && opt.id === q.correctAnswerId;
                    const isWrongSelection = isQuestionChecked && isSelected && opt.id !== q.correctAnswerId;

                    return (
                      <div
                        key={opt.id}
                        onClick={() => handleSelectOption(q.id, opt.id)}
                        className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 select-none ${
                          isCorrectAnswer
                            ? 'bg-emerald-500/15 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-semibold'
                            : isWrongSelection
                            ? 'bg-rose-500/15 border-rose-500 text-rose-900 dark:text-rose-200 line-through'
                            : isSelected
                            ? isDark
                              ? 'bg-sky-600/20 border-sky-500 text-white shadow-xs'
                              : 'bg-sky-50 border-sky-400 text-slate-900 shadow-xs'
                            : isDark
                            ? 'bg-slate-800/60 hover:bg-slate-800 text-slate-200 border-slate-700/80 hover:border-slate-600'
                            : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          {/* Radio circle */}
                          <div
                            className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                              isSelected
                                ? 'border-sky-500 bg-sky-500'
                                : isDark
                                ? 'border-slate-600'
                                : 'border-slate-300'
                            }`}
                          >
                            {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </div>

                          <span className="text-sm sm:text-base leading-snug">
                            {isOptFlipped ? opt.textEs : opt.text}
                          </span>
                        </div>

                        {/* Speech & translate buttons */}
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            type="button"
                            onClick={(e) => handlePlayAudio(opt.text, e)}
                            className="p-1 text-slate-400 hover:text-sky-500 transition-colors"
                            title="Listen"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={(e) => handleToggleOptionFlip(opt.id, e)}
                            className="p-1 text-slate-400 hover:text-emerald-500 transition-colors text-[10px] font-mono uppercase"
                            title="Translate"
                          >
                            {isOptFlipped ? 'EN' : 'ES'}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Explanation feedback */}
                {isQuestionChecked && (
                  <div
                    className={`mt-4 p-3 rounded-xl text-xs sm:text-sm flex items-start gap-2 ${
                      isQuestionCorrect
                        ? 'bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-500/20'
                        : 'bg-rose-500/10 text-rose-800 dark:text-rose-300 border border-rose-500/20'
                    }`}
                  >
                    {isQuestionCorrect ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <p className="font-semibold mb-0.5">{isQuestionCorrect ? '¡Correcto!' : 'Respuesta incorrecta'}</p>
                      <p className="opacity-90">{q.explanationEs}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* Action buttons */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={handleClear}
              className={`px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                isDark
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 shadow-xs'
              }`}
            >
              <RotateCcw className="w-4 h-4" />
              <span>Limpiar</span>
            </button>

            <button
              onClick={handleCheck}
              disabled={Object.keys(selectedAnswers).length === 0}
              className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 cursor-pointer shadow-md ${
                Object.keys(selectedAnswers).length === 0
                  ? 'opacity-40 cursor-not-allowed bg-slate-300 text-slate-500 dark:bg-slate-800 dark:text-slate-600'
                  : 'bg-sky-600 hover:bg-sky-500 text-white shadow-sky-600/30'
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
