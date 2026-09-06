import React, { useState, useEffect, useRef } from 'react';
import {
  Volume2,
  VolumeX,
  RotateCcw,
  Check,
  CheckCircle2,
  XCircle,
  Sparkles,
  RotateCw,
  Play,
  Pause,
  HelpCircle,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  ReadingComprehensionExercise as ReadingComprehensionExerciseType,
  RadioChoiceOption,
} from '../types';
import { speakEnglish, stopSpeaking, playFeedbackSound } from '../utils/audio';
import { useTheme } from '../context/ThemeContext';
import { SpeedSelectorButton } from './SpeedSelectorButton';

interface ReadingComprehensionExerciseProps {
  exercise: ReadingComprehensionExerciseType;
  accent?: 'US' | 'UK';
  speechRate?: number;
  onSuccess?: () => void;
}

export const ReadingComprehensionExercise: React.FC<ReadingComprehensionExerciseProps> = ({
  exercise,
  accent = 'US',
  speechRate = 1.0,
  onSuccess,
}) => {
  const { isDark } = useTheme();
  const safeAccent: 'US' | 'UK' = accent === 'UK' ? 'UK' : 'US';

  const [currentRate, setCurrentRate] = useState<number>(speechRate);

  useEffect(() => {
    setCurrentRate(speechRate);
  }, [speechRate]);

  // Selected option per question { [questionId]: optionId }
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [hasChecked, setHasChecked] = useState(false);
  const [isAllCorrect, setIsAllCorrect] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  // 3D Reversible card flips
  const [isInstructionFlipped, setIsInstructionFlipped] = useState(false);
  const [isStoryFlipped, setIsStoryFlipped] = useState(false);
  const [flippedQuestionIds, setFlippedQuestionIds] = useState<string[]>([]);
  const [flippedOptionIds, setFlippedOptionIds] = useState<string[]>([]);

  // Audio playing for story
  const [isPlayingStory, setIsPlayingStory] = useState(false);
  const [activeSentenceIndex, setActiveSentenceIndex] = useState<number | null>(null);

  // Reset when exercise changes
  useEffect(() => {
    setSelectedAnswers({});
    setHasChecked(false);
    setIsAllCorrect(false);
    setValidationError(null);
    setIsInstructionFlipped(false);
    setIsStoryFlipped(false);
    setFlippedQuestionIds([]);
    setFlippedOptionIds([]);
    setIsPlayingStory(false);
    setActiveSentenceIndex(null);
    stopSpeaking();
  }, [exercise.id]);

  useEffect(() => {
    return () => {
      stopSpeaking();
    };
  }, []);

  // Instruction speech
  const handleSpeakInstruction = () => {
    stopSpeaking();
    speakEnglish(
      exercise.instructions || 'Read the story "Wrong Color," and then answer the questions.',
      currentRate,
      safeAccent,
      undefined,
      undefined,
      'male'
    );
  };

  const handleSpeedChange = (newRate: number) => {
    setCurrentRate(newRate);
    if (isPlayingStory) {
      stopSpeaking();
      const fullText = exercise.story.audioText || exercise.story.textEn;
      speakEnglish(
        fullText,
        newRate,
        safeAccent,
        () => setIsPlayingStory(true),
        () => {
          setIsPlayingStory(false);
          setActiveSentenceIndex(null);
        },
        'female'
      );
    }
  };

  // Story speech
  const handleToggleStoryAudio = () => {
    if (isPlayingStory) {
      stopSpeaking();
      setIsPlayingStory(false);
      setActiveSentenceIndex(null);
      return;
    }

    stopSpeaking();
    setIsPlayingStory(true);
    const fullText = exercise.story.audioText || exercise.story.textEn;

    speakEnglish(
      fullText,
      currentRate,
      safeAccent,
      () => setIsPlayingStory(true),
      () => {
        setIsPlayingStory(false);
        setActiveSentenceIndex(null);
      },
      'female'
    );
  };

  // Speak individual sentence or text
  const handleSpeakText = (text: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    stopSpeaking();
    setIsPlayingStory(false);
    speakEnglish(text, currentRate, safeAccent, undefined, undefined, 'male');
  };

  // Toggle option selection
  const handleSelectOption = (questionId: string, optionId: string) => {
    playFeedbackSound('click');
    setValidationError(null);
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  // Toggle 3D flip on question
  const handleToggleFlipQuestion = (questionId: string) => {
    playFeedbackSound('flip');
    setFlippedQuestionIds((prev) =>
      prev.includes(questionId)
        ? prev.filter((id) => id !== questionId)
        : [...prev, questionId]
    );
  };

  // Toggle 3D flip on option
  const handleToggleFlipOption = (optionId: string) => {
    playFeedbackSound('flip');
    setFlippedOptionIds((prev) =>
      prev.includes(optionId)
        ? prev.filter((id) => id !== optionId)
        : [...prev, optionId]
    );
  };

  // Check answers
  const handleCheckAnswers = () => {
    // Verify all questions answered
    const unanswered = exercise.questions.some((q) => !selectedAnswers[q.id]);
    if (unanswered) {
      playFeedbackSound('wrong');
      setValidationError('Por favor responde todas las preguntas antes de comprobar.');
      return;
    }

    setValidationError(null);
    setHasChecked(true);

    const allCorrect = exercise.questions.every(
      (q) => selectedAnswers[q.id] === q.correctAnswerId
    );
    setIsAllCorrect(allCorrect);

    if (allCorrect) {
      playFeedbackSound('correct');
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 },
        });
      } catch (e) {
        console.warn('Confetti error', e);
      }
      if (onSuccess) onSuccess();
    } else {
      playFeedbackSound('wrong');
    }
  };

  // Reset answers
  const handleReset = () => {
    playFeedbackSound('click');
    setSelectedAnswers({});
    setHasChecked(false);
    setIsAllCorrect(false);
    setValidationError(null);
  };

  return (
    <div className="w-full flex flex-col gap-6 select-none animate-in fade-in duration-200">
      {/* Top Header Card: Reversible Instruction */}
      <div className="flex items-center justify-between gap-3 w-full">
        <div className="flex-1 perspective-1000 min-h-[52px]">
          <div
            id={`reading-instruction-flip-card-${exercise.id}`}
            onClick={() => {
              playFeedbackSound('flip');
              setIsInstructionFlipped((prev) => !prev);
            }}
            className={`relative w-full min-h-[52px] rounded-2xl cursor-pointer select-none transition-transform duration-500 transform-style-3d border shadow-xs ${
              isInstructionFlipped ? 'rotate-y-180' : ''
            } ${
              isInstructionFlipped
                ? isDark
                  ? 'bg-[#0F241A] border-emerald-500/30 text-emerald-100'
                  : 'bg-emerald-50/90 border-emerald-200 text-emerald-950'
                : isDark
                ? 'bg-[#151C33] border-white/10 text-white hover:border-indigo-500/40'
                : 'bg-white border-slate-200 text-slate-800 hover:border-indigo-300'
            }`}
          >
            {/* Front: English Instruction */}
            <div className="absolute inset-0 px-4 py-3 flex items-center justify-between gap-3 backface-hidden">
              <div className="flex items-center gap-3">
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                    isDark
                      ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                      : 'bg-indigo-50 text-indigo-600'
                  }`}
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </div>
                <h4 className="text-sm sm:text-base font-semibold leading-snug font-sans tracking-tight">
                  {exercise.instructions ||
                    'Read the story "Wrong Color," and then answer the questions.'}
                </h4>
              </div>
              <div className="hidden sm:flex items-center gap-1 text-[11px] text-slate-400 font-medium">
                <RotateCw className="w-3 h-3 text-indigo-400" />
                <span>Voltear</span>
              </div>
            </div>

            {/* Back: Spanish Translation */}
            <div className="absolute inset-0 px-4 py-3 flex items-center justify-between gap-3 backface-hidden rotate-y-180">
              <div className="flex items-center gap-3">
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                    isDark
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-emerald-100 text-emerald-700'
                  }`}
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </div>
                <p
                  className={`text-sm sm:text-base font-medium leading-snug italic ${
                    isDark ? 'text-emerald-200' : 'text-emerald-900'
                  }`}
                >
                  {exercise.instructionsEs ||
                    'Lee la historia "Color Equivocado", y luego responde las preguntas.'}
                </p>
              </div>
              <div className="hidden sm:flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                <RotateCw className="w-3 h-3" />
                <span>Volver</span>
              </div>
            </div>
          </div>
        </div>

        {/* Audio Button for Instruction */}
        <button
          type="button"
          onClick={handleSpeakInstruction}
          className={`p-2.5 rounded-xl border transition-all cursor-pointer shrink-0 ${
            isDark
              ? 'border-white/10 hover:bg-white/10 text-white/70 hover:text-white'
              : 'border-slate-200 hover:bg-slate-100 text-slate-600 hover:text-slate-900'
          }`}
          title="Escuchar instrucción"
          aria-label="Escuchar instrucción"
        >
          <Volume2 className="w-4 h-4" />
        </button>
      </div>

      {/* Main 2-Column Grid: Left (Story Card) & Right (Questions) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (6 cols): Story Card in Classic Editorial Parchment Style */}
        <div className="lg:col-span-6 flex flex-col gap-3">
          <div className="perspective-1000 w-full min-h-[520px]">
            <div
              id={`story-flip-card-${exercise.id}`}
              onClick={() => {
                playFeedbackSound('flip');
                setIsStoryFlipped((prev) => !prev);
              }}
              className={`relative w-full h-full min-h-[520px] rounded-2xl cursor-pointer select-none transition-transform duration-500 transform-style-3d border shadow-sm ${
                isStoryFlipped ? 'rotate-y-180' : ''
              } ${
                isStoryFlipped
                  ? isDark
                    ? 'bg-[#0E231B] border-emerald-500/30 text-emerald-100'
                    : 'bg-[#F4F9F4] border-emerald-200 text-emerald-950'
                  : isDark
                  ? 'bg-[#151C33] border-white/10 text-slate-100'
                  : 'bg-[#FCFBF8] border-stone-200/90 text-stone-900 shadow-stone-200/50'
              }`}
            >
              {/* Front Face: English Story */}
              <div className="absolute inset-0 p-5 sm:p-7 flex flex-col justify-between backface-hidden overflow-y-auto">
                <div>
                  {/* Top Bar: Title & Controls */}
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-inherit/30">
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#009bd6] dark:text-sky-400 font-sans">
                      {exercise.story.title}
                    </h3>

                    <div className="flex items-center gap-2">
                      <SpeedSelectorButton
                        currentRate={currentRate}
                        onRateChange={handleSpeedChange}
                        size="sm"
                      />

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleStoryAudio();
                        }}
                        className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shadow-xs transition-all cursor-pointer ${
                          isPlayingStory
                            ? 'bg-sky-500 text-white ring-2 ring-sky-400 scale-105'
                            : isDark
                            ? 'bg-slate-800 text-sky-400 hover:bg-slate-700 border border-slate-600'
                            : 'bg-white text-sky-600 hover:bg-stone-100 border border-stone-300'
                        }`}
                        title={isPlayingStory ? 'Pausar audio' : 'Escuchar historia'}
                        aria-label="Audio de la historia"
                      >
                        {isPlayingStory ? (
                          <Pause className="w-4 h-4 fill-current" />
                        ) : (
                          <Volume2 className="w-4 h-4" />
                        )}
                      </button>

                      <span className="text-[11px] text-slate-400 hidden sm:inline flex items-center gap-1">
                        <RotateCw className="w-3 h-3 text-sky-500" />
                        Voltear
                      </span>
                    </div>
                  </div>

                  {/* Story Text Paragraphs with Drop Cap on first letter */}
                  <div className="space-y-3.5 text-left font-serif leading-relaxed text-sm sm:text-base pr-1">
                    {exercise.story.paragraphsEn.map((para, idx) => {
                      if (idx === 0) {
                        const firstLetter = para.charAt(0);
                        const restOfPara = para.slice(1);
                        return (
                          <p key={idx} className="leading-relaxed">
                            <span className="float-left text-3xl sm:text-4xl font-serif font-bold mr-1.5 leading-none text-slate-900 dark:text-white">
                              {firstLetter}
                            </span>
                            <span
                              onClick={(e) => handleSpeakText(para, e)}
                              className="hover:underline cursor-pointer"
                              title="Haz clic para escuchar este párrafo"
                            >
                              {restOfPara}
                            </span>
                          </p>
                        );
                      }

                      return (
                        <p
                          key={idx}
                          onClick={(e) => handleSpeakText(para, e)}
                          className="leading-relaxed hover:underline cursor-pointer"
                          title="Haz clic para escuchar este párrafo"
                        >
                          {para}
                        </p>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-3 mt-4 border-t border-inherit/20 flex items-center justify-between text-[11px] text-slate-400 shrink-0">
                  <span>Haz clic en cualquier párrafo para pronunciar</span>
                  <span className="font-serif italic">Toca para ver traducción</span>
                </div>
              </div>

              {/* Back Face: Spanish Story Translation */}
              <div className="absolute inset-0 p-5 sm:p-7 flex flex-col justify-between backface-hidden rotate-y-180 overflow-y-auto">
                <div>
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-inherit/30">
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-emerald-600 dark:text-emerald-400 font-sans">
                      {exercise.story.titleEs}
                    </h3>
                    <div className="flex items-center gap-2">
                      <SpeedSelectorButton
                        currentRate={currentRate}
                        onRateChange={handleSpeedChange}
                        size="sm"
                      />
                      <span className="text-[11px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                        <RotateCw className="w-3 h-3" />
                        Volver al inglés
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3.5 text-left font-serif italic leading-relaxed text-sm sm:text-base text-emerald-950 dark:text-emerald-100 pr-1">
                    {exercise.story.paragraphsEs.map((para, idx) => (
                      <p key={idx} className="leading-relaxed">
                        {para}
                      </p>
                    ))}
                  </div>
                </div>

                <div className="pt-3 mt-4 border-t border-inherit/20 flex items-center justify-between text-[11px] text-emerald-600/80 dark:text-emerald-400/80 shrink-0">
                  <span>Traducción en español</span>
                  <span>Toca para regresar</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (6 cols): Questions & Radio Choices Panel */}
        <div
          className={`lg:col-span-6 rounded-2xl p-5 sm:p-6 border flex flex-col justify-between transition-colors duration-200 shadow-xs ${
            isDark ? 'bg-[#151C33] border-white/10' : 'bg-white border-slate-200'
          }`}
        >
          <div className="flex flex-col gap-6">
            {exercise.questions.map((q, qIndex) => {
              const selectedOptId = selectedAnswers[q.id];
              const isQuestionFlipped = flippedQuestionIds.includes(q.id);

              return (
                <div key={q.id} className="flex flex-col gap-3.5">
                  {/* Reversible Question Card */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="perspective-1000 flex-1 min-h-[42px]">
                      <div
                        id={`q-card-${q.id}`}
                        onClick={() => handleToggleFlipQuestion(q.id)}
                        className={`relative w-full min-h-[42px] rounded-xl cursor-pointer select-none transition-transform duration-500 transform-style-3d border shadow-2xs ${
                          isQuestionFlipped ? 'rotate-y-180' : ''
                        } ${
                          isQuestionFlipped
                            ? isDark
                              ? 'bg-[#0F241A] border-emerald-500/30 text-emerald-100'
                              : 'bg-emerald-50/90 border-emerald-200 text-emerald-950'
                            : isDark
                            ? 'bg-slate-900/60 border-white/10 text-white hover:border-indigo-400/50'
                            : 'bg-slate-50 border-slate-200 text-slate-900 hover:border-indigo-300'
                        }`}
                      >
                        {/* Front: English Question */}
                        <div className="absolute inset-0 px-3.5 py-2 flex items-center justify-between backface-hidden">
                          <span className="font-semibold text-sm sm:text-base leading-snug">
                            {q.question}
                          </span>
                          <span className="text-[10px] text-slate-400 ml-2 shrink-0 hidden sm:inline">
                            Voltear
                          </span>
                        </div>

                        {/* Back: Spanish Question */}
                        <div className="absolute inset-0 px-3.5 py-2 flex items-center justify-between backface-hidden rotate-y-180">
                          <span className="font-semibold text-sm sm:text-base leading-snug italic">
                            {q.questionEs || q.question}
                          </span>
                          <span className="text-[10px] text-emerald-500 ml-2 shrink-0 hidden sm:inline">
                            Volver
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Audio button for question */}
                    <button
                      type="button"
                      onClick={() => handleSpeakText(q.question)}
                      className={`p-2 rounded-xl border transition-all cursor-pointer shrink-0 ${
                        isDark
                          ? 'border-white/10 hover:bg-white/10 text-white/70 hover:text-white'
                          : 'border-slate-200 hover:bg-slate-100 text-slate-600 hover:text-slate-900'
                      }`}
                      title="Escuchar pregunta"
                      aria-label="Escuchar pregunta"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Options List with Radio Buttons & Reversible Card */}
                  <div className="flex flex-col gap-2.5">
                    {q.options.map((opt) => {
                      const isSelected = selectedOptId === opt.id;
                      const isOptionFlipped = flippedOptionIds.includes(opt.id);
                      const isOptCorrect = opt.id === q.correctAnswerId;

                      return (
                        <div
                          key={opt.id}
                          className="perspective-1000 w-full min-h-[54px]"
                        >
                          <div
                            id={`opt-card-${opt.id}`}
                            onClick={() => handleToggleFlipOption(opt.id)}
                            className={`relative w-full h-full min-h-[54px] rounded-xl cursor-pointer select-none transition-transform duration-500 transform-style-3d border shadow-2xs ${
                              isOptionFlipped ? 'rotate-y-180' : ''
                            } ${
                              hasChecked
                                ? isSelected
                                  ? isOptCorrect
                                    ? 'border-emerald-500 bg-emerald-500/10 text-emerald-900 dark:text-emerald-200 ring-2 ring-emerald-400'
                                    : 'border-rose-500 bg-rose-500/10 text-rose-900 dark:text-rose-200 ring-2 ring-rose-400'
                                  : isOptCorrect
                                  ? 'border-emerald-500/50 bg-emerald-500/5 text-emerald-700 dark:text-emerald-300'
                                  : isDark
                                  ? 'border-white/10 bg-slate-900/30 text-slate-400'
                                  : 'border-slate-200 bg-slate-50 text-slate-400'
                                : isOptionFlipped
                                ? isDark
                                  ? 'border-emerald-500/40 bg-[#0F241A] text-emerald-100'
                                  : 'border-emerald-300 bg-emerald-50/90 text-emerald-950'
                                : isSelected
                                ? isDark
                                  ? 'border-indigo-400 bg-indigo-600/20 text-white ring-2 ring-indigo-500'
                                  : 'border-indigo-500 bg-indigo-50/80 text-indigo-950 ring-2 ring-indigo-400'
                                : isDark
                                ? 'border-white/10 hover:border-white/20 bg-slate-900/40 text-slate-100'
                                : 'border-slate-200 hover:border-slate-300 bg-white text-slate-800'
                            }`}
                          >
                            {/* Front: English text + Radio button */}
                            <div className="absolute inset-0 px-3.5 py-2.5 flex items-center justify-between gap-3 backface-hidden">
                              <div className="flex items-center gap-3 flex-1 min-w-0">
                                {/* Circular Radio button */}
                                <div
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleSelectOption(q.id, opt.id);
                                  }}
                                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all cursor-pointer ${
                                    isSelected
                                      ? 'border-sky-500 bg-white dark:bg-slate-900'
                                      : isDark
                                      ? 'border-slate-500 bg-slate-800'
                                      : 'border-slate-300 bg-white'
                                  }`}
                                >
                                  {isSelected && (
                                    <div className="w-2.5 h-2.5 rounded-full bg-sky-500" />
                                  )}
                                </div>

                                <span className="text-sm font-normal leading-snug flex-1 select-none">
                                  {opt.text}
                                </span>
                              </div>

                              {/* Audio button & status icon */}
                              <div className="flex items-center gap-1 shrink-0 ml-1">
                                <button
                                  type="button"
                                  onClick={(e) => handleSpeakText(opt.text, e)}
                                  className={`p-1 rounded-lg transition-colors ${
                                    isDark
                                      ? 'hover:bg-white/10 text-white/40 hover:text-white'
                                      : 'hover:bg-slate-100 text-slate-400 hover:text-slate-700'
                                  }`}
                                  title="Pronunciar"
                                >
                                  <Volume2 className="w-3.5 h-3.5" />
                                </button>

                                {hasChecked && isSelected && (
                                  <div>
                                    {isOptCorrect ? (
                                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                    ) : (
                                      <XCircle className="w-4 h-4 text-rose-500" />
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Back: Spanish text + Radio button */}
                            <div className="absolute inset-0 px-3.5 py-2.5 flex items-center justify-between gap-3 backface-hidden rotate-y-180">
                              <div className="flex items-center gap-3 flex-1 min-w-0">
                                <div
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleSelectOption(q.id, opt.id);
                                  }}
                                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all cursor-pointer ${
                                    isSelected
                                      ? 'border-emerald-500 bg-white dark:bg-slate-900'
                                      : isDark
                                      ? 'border-emerald-600 bg-emerald-950'
                                      : 'border-emerald-400 bg-white'
                                  }`}
                                >
                                  {isSelected && (
                                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                                  )}
                                </div>

                                <span className="text-sm font-medium leading-snug italic flex-1 select-none">
                                  {opt.textEs}
                                </span>
                              </div>

                              {hasChecked && isSelected && (
                                <div className="shrink-0 ml-1">
                                  {isOptCorrect ? (
                                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                  ) : (
                                    <XCircle className="w-4 h-4 text-rose-500" />
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Divider line between Question 1 and Question 2 */}
                  {qIndex < exercise.questions.length - 1 && (
                    <div
                      className={`my-2 border-t ${
                        isDark ? 'border-white/10' : 'border-slate-200'
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Action Buttons & Status Feedback Banner */}
          <div className="mt-6 pt-4 border-t border-inherit/30 flex flex-col gap-3 shrink-0 w-full">
            <div className="flex items-center gap-2.5 shrink-0">
              <button
                type="button"
                id={`check-answers-btn-${exercise.id}`}
                onClick={handleCheckAnswers}
                className="px-4 sm:px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm tracking-normal shadow-xs hover:shadow transition-all cursor-pointer flex items-center gap-2 shrink-0 active:scale-95"
              >
                <Check className="w-4 h-4" />
                <span>Comprobar Respuestas</span>
              </button>

              <button
                type="button"
                id={`reset-answers-btn-${exercise.id}`}
                onClick={handleReset}
                className={`p-2.5 rounded-xl border transition-all cursor-pointer shrink-0 active:scale-95 ${
                  isDark
                    ? 'border-white/10 hover:bg-white/10 text-white/70 hover:text-white'
                    : 'border-slate-200 hover:bg-slate-100 text-slate-600 hover:text-slate-900'
                }`}
                title="Reiniciar respuestas"
                aria-label="Reiniciar respuestas"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Validation alert if unanswered questions */}
            {validationError && (
              <div className="w-full flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30 animate-in fade-in duration-150">
                <HelpCircle className="w-4 h-4 shrink-0" />
                <span>{validationError}</span>
              </div>
            )}

            {/* Status indicator placed directly below the button */}
            {hasChecked && !validationError && (
              <div
                className={`w-full flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium animate-in fade-in slide-in-from-top-1 duration-150 ${
                  isAllCorrect
                    ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                    : 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30'
                }`}
              >
                {isAllCorrect ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
                    <span className="leading-snug">
                      ¡Excelente trabajo! Has respondido correctamente todas las preguntas de la lectura.
                    </span>
                    <Sparkles className="w-3.5 h-3.5 text-emerald-500 animate-bounce shrink-0" />
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 shrink-0 text-rose-500" />
                    <span className="leading-snug">
                      Una o más respuestas son incorrectas. Revisa la historia en el panel izquierdo y vuelve a intentarlo.
                    </span>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
