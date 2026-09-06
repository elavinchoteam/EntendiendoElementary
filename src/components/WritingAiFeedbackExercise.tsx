import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  Volume2,
  Check,
  Save,
  RotateCcw,
  ThumbsUp,
  ThumbsDown,
  ChevronDown,
  ChevronUp,
  Languages,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Star,
  FileCheck,
  ShieldAlert,
  PanelRightClose,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { WritingAiFeedbackExercise as WritingExerciseType } from '../types';
import { useTheme } from '../context/ThemeContext';
import { speakEnglish, playFeedbackSound } from '../utils/audio';
import { FeedbackData, requestAiFeedback } from '../utils/aiFeedback';

interface WritingAiFeedbackExerciseProps {
  exercise: WritingExerciseType;
  accent?: 'US' | 'UK';
  speechRate?: number;
  onSuccess?: () => void;
}

export const WritingAiFeedbackExercise: React.FC<WritingAiFeedbackExerciseProps> = ({
  exercise,
  accent = 'US',
  speechRate = 1.0,
  onSuccess,
}) => {
  const { isDark } = useTheme();
  const safeAccent: 'US' | 'UK' = accent === 'UK' ? 'UK' : 'US';

  // Text content & persistence
  const storageKey = `writing_exercise_${exercise.id}`;
  const [studentText, setStudentText] = useState<string>(() => {
    return localStorage.getItem(storageKey) || '';
  });

  const [isSavedRecently, setIsSavedRecently] = useState(false);
  const [pasteBlockedNotice, setPasteBlockedNotice] = useState(false);

  // AI Feedback limit & state (up to 2 times as requested)
  const maxRequests = exercise.maxAiRequests ?? 2;
  const [feedbackHistory, setFeedbackHistory] = useState<FeedbackData[]>([]);
  const [currentFeedbackIndex, setCurrentFeedbackIndex] = useState<number | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showPreviousFeedback, setShowPreviousFeedback] = useState(false);

  // Feedback helpfulness vote
  const [helpfulVote, setHelpfulVote] = useState<'yes' | 'no' | null>(null);

  // Reversible Cards state
  const [isInstructionFlipped, setIsInstructionFlipped] = useState(false);
  const [isPromptFlipped, setIsPromptFlipped] = useState(false);
  const [isFeedbackSpanish, setIsFeedbackSpanish] = useState(false);

  // Completion state
  const [isDone, setIsDone] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Reset/Load when exercise changes
  useEffect(() => {
    const saved = localStorage.getItem(`writing_exercise_${exercise.id}`) || '';
    setStudentText(saved);
    setFeedbackHistory([]);
    setCurrentFeedbackIndex(null);
    setIsDone(false);
    setHelpfulVote(null);
  }, [exercise.id]);

  const wordsCount = studentText.trim() ? studentText.trim().split(/\s+/).length : 0;
  const requestsUsed = feedbackHistory.length;
  const requestsLeft = Math.max(0, maxRequests - requestsUsed);

  // Anti Copy-Paste protection handler
  const handleBlockedPaste = (e: React.ClipboardEvent | React.DragEvent) => {
    e.preventDefault();
    playFeedbackSound('wrong');
    setPasteBlockedNotice(true);
    setTimeout(() => {
      setPasteBlockedNotice(false);
    }, 4000);
  };

  const handleSaveText = () => {
    playFeedbackSound('click');
    localStorage.setItem(storageKey, studentText);
    setIsSavedRecently(true);
    setTimeout(() => setIsSavedRecently(false), 2500);
  };

  const handleRequestFeedback = async () => {
    if (requestsLeft <= 0 || isAnalyzing) return;
    if (wordsCount < 5) {
      playFeedbackSound('wrong');
      alert('Por favor escribe al menos una frase completa antes de solicitar la revisión de la IA.');
      return;
    }

    playFeedbackSound('click');
    setIsAnalyzing(true);
    handleSaveText();

    const attemptNumber = requestsUsed + 1;
    try {
      const feedback = await requestAiFeedback(
        studentText,
        attemptNumber,
        exercise.prompt,
        exercise.id,
        exercise.storyContext
      );
      setFeedbackHistory((prev) => [...prev, feedback]);
      setCurrentFeedbackIndex(attemptNumber - 1);
      setShowPreviousFeedback(false);
      playFeedbackSound('correct');
    } catch (err) {
      console.error('Error getting feedback:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleMarkDone = () => {
    playFeedbackSound('correct');
    setIsDone(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });
    if (onSuccess) {
      onSuccess();
    }
  };

  const currentFeedback =
    currentFeedbackIndex !== null ? feedbackHistory[currentFeedbackIndex] : null;

  return (
    <div className="w-full flex flex-col gap-5 select-none animate-in fade-in duration-200">
      {/* Top Header Card: Reversible Instruction (matching Activity 5 & 6) */}
      <div className="flex items-center justify-between gap-3 w-full">
        <div className="flex-1 perspective-1000 min-h-[52px]">
          <div
            id={`writing-instruction-flip-card-${exercise.id}`}
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
            <div className="absolute inset-0 px-4 py-3 flex items-center gap-3 backface-hidden">
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                  isDark
                    ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                    : 'bg-indigo-50 text-indigo-600'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <h4 className="text-xs sm:text-sm md:text-base font-medium leading-snug font-sans tracking-tight">
                {exercise.instructions ||
                  'Write your answer, review AI feedback, improve it, and mark Done if satisfied or get another AI feedback.'}
              </h4>
            </div>

            {/* Back: Spanish Translation */}
            <div className="absolute inset-0 px-4 py-3 flex items-center gap-3 backface-hidden rotate-y-180">
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                  isDark
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'bg-emerald-100 text-emerald-700'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <p
                className={`text-xs sm:text-sm md:text-base font-medium leading-snug italic ${
                  isDark ? 'text-emerald-200' : 'text-emerald-900'
                }`}
              >
                {exercise.instructionsEs ||
                  'Escribe tu respuesta, revisa los comentarios de la IA, mejórala y marca Listo si estás satisfecho o solicita otra revisión de la IA.'}
              </p>
            </div>
          </div>
        </div>

        {/* Audio Button for Instruction */}
        <button
          type="button"
          onClick={() => {
            speakEnglish(
              exercise.instructions ||
                'Write your answer, review AI feedback, improve it, and mark Done if satisfied or get another AI feedback.',
              speechRate,
              safeAccent,
              undefined,
              undefined,
              'female'
            );
          }}
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

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Prompt Card (Reversible) + Writing Editor (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {/* Reversible Prompt Card */}
          <div className="perspective-1000 w-full min-h-[120px]">
            <div
              id={`writing-prompt-card-${exercise.id}`}
              onClick={() => {
                playFeedbackSound('flip');
                setIsPromptFlipped((prev) => !prev);
              }}
              className={`relative w-full min-h-[120px] rounded-2xl cursor-pointer select-none transition-transform duration-500 transform-style-3d border shadow-xs p-4 sm:p-5 ${
                isPromptFlipped ? 'rotate-y-180' : ''
              } ${
                isPromptFlipped
                  ? isDark
                    ? 'bg-[#0F241A] border-emerald-500/30 text-emerald-100'
                    : 'bg-emerald-50/90 border-emerald-200 text-emerald-950'
                  : isDark
                  ? 'bg-[#151C33] border-white/10 text-slate-200 hover:border-indigo-400'
                  : 'bg-white border-slate-200 text-slate-800 hover:border-indigo-300'
              }`}
            >
              {/* Front: English Prompt */}
              <div className="backface-hidden flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-indigo-500 dark:text-indigo-400 font-bold flex items-center gap-1.5">
                    <FileCheck className="w-3.5 h-3.5" /> Prompt / Consigna (Click para traducir)
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      speakEnglish(exercise.prompt, speechRate, safeAccent);
                    }}
                    className={`p-1.5 rounded-lg border transition-all ${
                      isDark
                        ? 'border-white/10 hover:bg-white/10 text-white/70'
                        : 'border-slate-200 hover:bg-slate-100 text-slate-600'
                    }`}
                    title="Escuchar consigna"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-xs sm:text-sm md:text-base leading-relaxed font-sans text-slate-700 dark:text-slate-200">
                  {exercise.prompt}
                </p>
              </div>

              {/* Back: Spanish Translation */}
              <div className="absolute inset-0 p-4 sm:p-5 backface-hidden rotate-y-180 flex flex-col gap-2 overflow-y-auto">
                <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1.5">
                  <Languages className="w-3.5 h-3.5" /> Traducción al Español (Click para volver)
                </span>
                <p
                  className={`text-xs sm:text-sm md:text-base leading-relaxed italic ${
                    isDark ? 'text-emerald-100' : 'text-emerald-950'
                  }`}
                >
                  {exercise.promptEs}
                </p>
              </div>
            </div>
          </div>

          {/* Textarea Editor Box with Toolbar */}
          <div
            className={`rounded-2xl border transition-all overflow-hidden shadow-xs ${
              isDark ? 'bg-[#151C33] border-white/10' : 'bg-white border-slate-200'
            }`}
          >
            {/* Editor Toolbar (Save, Edit text, Words count) */}
            <div
              className={`px-4 py-2.5 border-b flex items-center justify-between text-xs font-mono ${
                isDark ? 'bg-slate-900/60 border-white/10' : 'bg-slate-50/80 border-slate-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  id={`writing-save-btn-${exercise.id}`}
                  onClick={handleSaveText}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                    isSavedRecently
                      ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold'
                      : isDark
                      ? 'text-slate-400 hover:text-white hover:bg-white/10'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                  title="Guardar borrador"
                >
                  {isSavedRecently ? <Check className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
                  <span>{isSavedRecently ? 'Guardado' : 'Save'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => textareaRef.current?.focus()}
                  className={`flex items-center gap-1 px-2 py-1 rounded-lg transition-all cursor-pointer ${
                    isDark
                      ? 'text-slate-400 hover:text-white hover:bg-white/10'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  <span>Edit text</span>
                </button>
              </div>

              {/* Word counter */}
              <span
                className={`font-semibold ${
                  wordsCount >= (exercise.initialWordsTarget || 25)
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : isDark
                    ? 'text-slate-400'
                    : 'text-slate-500'
                }`}
              >
                Word: {wordsCount}
              </span>
            </div>

            {/* Anti Copy-Paste Protected Textarea */}
            <div className="relative p-4">
              <textarea
                ref={textareaRef}
                id={`writing-textarea-${exercise.id}`}
                value={studentText}
                onChange={(e) => setStudentText(e.target.value)}
                onPaste={handleBlockedPaste}
                onDrop={handleBlockedPaste}
                onCopy={(e) => {
                  // Optional alert
                }}
                rows={9}
                placeholder={
                  exercise.placeholder ||
                  (exercise.id?.includes('wrong-color')
                    ? 'Why is the story called "Wrong Color"? Who ordered a green chair? Who ordered a brown chair? What happened?...'
                    : 'Hi, there! This is [Your Name] calling from "Rock City Magazine." Do you love music? We have our biggest sale of the year...')
                }
                className={`w-full bg-transparent resize-y rounded-xl p-3 outline-none text-xs sm:text-sm md:text-base leading-relaxed font-sans transition-colors ${
                  isDark
                    ? 'text-white placeholder:text-slate-500 focus:ring-2 focus:ring-indigo-500/40'
                    : 'text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500/30'
                }`}
                style={{ minHeight: '180px' }}
              />

              {/* Anti Copy-Paste warning notice popup */}
              {pasteBlockedNotice && (
                <div className="absolute bottom-6 left-6 right-6 p-3 rounded-xl bg-rose-500 text-white text-xs sm:text-sm font-medium shadow-lg flex items-center gap-2.5 animate-in fade-in slide-in-from-bottom-2 duration-150 z-20">
                  <ShieldAlert className="w-5 h-5 shrink-0" />
                  <span>
                    Por motivos pedagógicos, no está permitido copiar y pegar texto. Por favor escribe tu propia
                    respuesta en inglés.
                  </span>
                </div>
              )}
            </div>

            {/* AI Request Action Bar */}
            <div
              className={`p-4 border-t flex flex-col sm:flex-row items-center justify-between gap-3 ${
                isDark ? 'bg-slate-900/40 border-white/10' : 'bg-slate-50/50 border-slate-200'
              }`}
            >
              <div className="flex flex-col items-center sm:items-start gap-0.5">
                <button
                  type="button"
                  id={`ai-feedback-request-btn-${exercise.id}`}
                  onClick={handleRequestFeedback}
                  disabled={requestsLeft <= 0 || isAnalyzing || wordsCount < 4}
                  className={`px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-xs transition-all cursor-pointer ${
                    requestsLeft <= 0
                      ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed border border-transparent'
                      : isAnalyzing
                      ? 'bg-indigo-500 text-white cursor-wait animate-pulse'
                      : wordsCount < 4
                      ? 'bg-indigo-400/40 text-indigo-200 dark:text-indigo-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white hover:shadow-md hover:scale-[1.02] active:scale-95'
                  }`}
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Analizando con IA...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>AI Feedback</span>
                    </>
                  )}
                </button>
                <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                  {requestsLeft} AI feedback requests left
                </span>
              </div>

              {/* Mark Done Button */}
              <button
                type="button"
                id={`writing-mark-done-btn-${exercise.id}`}
                onClick={handleMarkDone}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  isDone
                    ? 'bg-emerald-500 text-white shadow-xs'
                    : isDark
                    ? 'border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10'
                    : 'border border-emerald-600 text-emerald-700 hover:bg-emerald-50'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{isDone ? 'Completado ✓' : 'Mark Done'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: AI Feedback Panel (5 Cols, exactly matching screenshot) */}
        <div
          className={`lg:col-span-5 rounded-2xl p-5 sm:p-6 border flex flex-col justify-between transition-colors duration-200 shadow-xs min-h-[460px] ${
            isDark ? 'bg-[#151C33] border-white/10' : 'bg-white border-slate-200'
          }`}
        >
          <div className="flex flex-col gap-4">
            {/* AI Feedback Header */}
            <div className="flex items-center justify-between pb-3 border-b border-inherit/30">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-sky-500" />
                <h3 className="font-bold text-base sm:text-lg tracking-tight">AI Feedback</h3>
              </div>

              <div className="flex items-center gap-2">
                {/* Attempt indicator */}
                {currentFeedback && (
                  <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-500 dark:text-indigo-300 border border-indigo-500/20">
                    Revisión #{currentFeedback.attemptNumber}
                  </span>
                )}
                <div className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
                  <PanelRightClose className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Star Rating Display */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Your result:
                </span>
                <div className="flex items-center gap-1">
                  {[1, 2, 3].map((starIdx) => {
                    const filled = currentFeedback ? starIdx <= currentFeedback.stars : false;
                    return (
                      <Star
                        key={starIdx}
                        className={`w-4 h-4 ${
                          filled
                            ? 'fill-amber-400 text-amber-400'
                            : isDark
                            ? 'text-slate-600'
                            : 'text-slate-300'
                        }`}
                      />
                    );
                  })}
                </div>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-snug">
                The AI feedback focuses on some mistakes and not all, to help you improve step by step.
              </p>
            </div>

            {/* AI Feedback Body */}
            <div
              className={`w-full min-h-[220px] rounded-xl border p-4 text-xs sm:text-sm leading-relaxed transition-all ${
                currentFeedback
                  ? isFeedbackSpanish
                    ? isDark
                      ? 'bg-[#0F241A]/70 border-emerald-500/30 text-emerald-100'
                      : 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
                    : isDark
                    ? 'bg-slate-900/60 border-white/10 text-slate-200'
                    : 'bg-slate-50 border-slate-200 text-slate-800'
                  : isDark
                  ? 'bg-slate-900/30 border-white/10 text-slate-400 flex flex-col items-center justify-center text-center'
                  : 'bg-slate-50/50 border-slate-200 text-slate-500 flex flex-col items-center justify-center text-center'
              }`}
            >
              {isAnalyzing ? (
                <div className="flex flex-col items-center justify-center gap-3 py-12">
                  <Loader2 className="w-8 h-8 text-sky-500 animate-spin" />
                  <p className="text-xs sm:text-sm font-medium">
                    {exercise.id?.includes('wrong-color')
                      ? 'Evaluando tu respuesta con IA pedagógica...'
                      : 'Evaluando tu anuncio con IA pedagógica...'}
                  </p>
                  <span className="text-[11px] text-slate-400 font-mono">
                    Revisando contenido, gramática y vocabulario
                  </span>
                </div>
              ) : currentFeedback ? (
                <div className="flex flex-col gap-3.5">
                  {/* Summary */}
                  <div>
                    <h4 className="font-bold text-xs uppercase font-mono tracking-wider text-sky-500 dark:text-sky-400 mb-1">
                      {isFeedbackSpanish ? 'Evaluación General' : 'Overall Assessment'}
                    </h4>
                    <p className="font-medium">
                      {isFeedbackSpanish ? currentFeedback.scoreSummaryEs : currentFeedback.scoreSummaryEn}
                    </p>
                  </div>

                  {/* Strengths */}
                  <div>
                    <h4 className="font-bold text-xs uppercase font-mono tracking-wider text-emerald-500 dark:text-emerald-400 mb-1">
                      {isFeedbackSpanish ? 'Puntos Fuertes' : 'Strengths'}
                    </h4>
                    <p>{isFeedbackSpanish ? currentFeedback.strengthsEs : currentFeedback.strengthsEn}</p>
                  </div>

                  {/* Corrections & Grammar */}
                  <div>
                    <h4 className="font-bold text-xs uppercase font-mono tracking-wider text-amber-500 dark:text-amber-400 mb-1">
                      {isFeedbackSpanish ? 'Recomendaciones y Gramática' : 'Corrections & Tips'}
                    </h4>
                    <p>{isFeedbackSpanish ? currentFeedback.correctionsEs : currentFeedback.correctionsEn}</p>
                  </div>

                  {/* Suggested Model Ad */}
                  <div
                    className={`mt-2 p-3 rounded-xl border ${
                      isDark
                        ? 'bg-slate-950/70 border-white/10 text-slate-200'
                        : 'bg-white border-slate-200 text-slate-800'
                    }`}
                  >
                    <h4 className="font-bold text-xs uppercase font-mono tracking-wider text-indigo-500 dark:text-indigo-400 mb-1 flex items-center justify-between">
                      <span>
                        {isFeedbackSpanish
                          ? exercise.id?.includes('wrong-color')
                            ? 'Respuesta Modelo Sugerida'
                            : 'Anuncio Modelo Sugerido'
                          : exercise.id?.includes('wrong-color')
                          ? 'Suggested Model Answer'
                          : 'Suggested Ad Model'}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          speakEnglish(currentFeedback.suggestedAdEn, speechRate, safeAccent)
                        }
                        className="p-1 hover:bg-slate-200 dark:hover:bg-slate-800 rounded transition-all"
                        title="Escuchar modelo sugerido"
                      >
                        <Volume2 className="w-3.5 h-3.5 text-indigo-500" />
                      </button>
                    </h4>
                    <p className="italic text-xs sm:text-sm">
                      "{isFeedbackSpanish ? currentFeedback.suggestedAdEs : currentFeedback.suggestedAdEn}"
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center gap-2 p-6">
                  <div className="w-10 h-10 rounded-full bg-sky-500/10 text-sky-500 flex items-center justify-center">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <p className="font-medium text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                    Tu retroalimentación aparecerá aquí
                  </p>
                  <p className="text-xs text-slate-400 text-center max-w-xs">
                    {exercise.id?.includes('wrong-color')
                      ? 'Escribe tu respuesta a las preguntas en el cuadro de la izquierda y presiona el botón '
                      : 'Escribe tu anuncio telefónico en el cuadro de la izquierda y presiona el botón '}
                    <span className="font-semibold text-sky-500">AI Feedback</span> para recibir tu revisión.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Action Bar (Listen, Translate, Helpful? 👍 👎, Show previous feedback) */}
          <div className="mt-5 pt-3 border-t border-inherit/30 flex flex-col gap-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
              {/* Listen button */}
              <button
                type="button"
                id={`feedback-listen-btn-${exercise.id}`}
                disabled={!currentFeedback}
                onClick={() => {
                  if (!currentFeedback) return;
                  speakEnglish(
                    `${currentFeedback.scoreSummaryEn}. ${currentFeedback.strengthsEn}. ${currentFeedback.suggestedAdEn}`,
                    speechRate,
                    safeAccent
                  );
                }}
                className={`px-2.5 py-1.5 rounded-lg border flex items-center gap-1.5 transition-all cursor-pointer ${
                  !currentFeedback
                    ? 'opacity-40 cursor-not-allowed border-transparent'
                    : isDark
                    ? 'border-white/10 hover:bg-white/10 text-slate-300 hover:text-white'
                    : 'border-slate-200 hover:bg-slate-100 text-slate-700'
                }`}
                title="Escuchar retroalimentación"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Listen</span>
              </button>

              {/* Translate button (Reversible translation) */}
              <button
                type="button"
                id={`feedback-translate-btn-${exercise.id}`}
                disabled={!currentFeedback}
                onClick={() => {
                  if (!currentFeedback) return;
                  playFeedbackSound('flip');
                  setIsFeedbackSpanish((prev) => !prev);
                }}
                className={`px-2.5 py-1.5 rounded-lg border flex items-center gap-1.5 transition-all cursor-pointer ${
                  !currentFeedback
                    ? 'opacity-40 cursor-not-allowed border-transparent'
                    : isFeedbackSpanish
                    ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 border-emerald-500/40'
                    : isDark
                    ? 'border-white/10 hover:bg-white/10 text-slate-300 hover:text-white'
                    : 'border-slate-200 hover:bg-slate-100 text-slate-700'
                }`}
                title="Traducir retroalimentación al español"
              >
                <Languages className="w-3.5 h-3.5" />
                <span>{isFeedbackSpanish ? 'Inglés' : 'Translate'}</span>
              </button>

              {/* Helpful? 👍 👎 */}
              <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                <span className="text-[11px]">Helpful?</span>
                <button
                  type="button"
                  onClick={() => {
                    playFeedbackSound('click');
                    setHelpfulVote('yes');
                  }}
                  className={`p-1 rounded transition-colors cursor-pointer ${
                    helpfulVote === 'yes'
                      ? 'text-emerald-500 bg-emerald-500/10 font-bold'
                      : 'hover:text-slate-900 dark:hover:text-white'
                  }`}
                  title="Útil"
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    playFeedbackSound('click');
                    setHelpfulVote('no');
                  }}
                  className={`p-1 rounded transition-colors cursor-pointer ${
                    helpfulVote === 'no'
                      ? 'text-rose-500 bg-rose-500/10 font-bold'
                      : 'hover:text-slate-900 dark:hover:text-white'
                  }`}
                  title="No útil"
                >
                  <ThumbsDown className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Show Previous Feedback Dropdown */}
            {feedbackHistory.length > 1 && (
              <div className="flex flex-col gap-2 mt-1">
                <button
                  type="button"
                  id={`show-previous-feedback-btn-${exercise.id}`}
                  onClick={() => {
                    playFeedbackSound('click');
                    setShowPreviousFeedback((prev) => !prev);
                  }}
                  className={`w-full py-1.5 px-3 rounded-xl border text-xs font-mono flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    isDark
                      ? 'bg-slate-900/70 border-white/10 text-slate-300 hover:bg-slate-800'
                      : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {showPreviousFeedback ? (
                    <ChevronUp className="w-3.5 h-3.5" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5" />
                  )}
                  <span>
                    {showPreviousFeedback ? 'Ocultar historial' : 'Show previous feedback (Revisión #1)'}
                  </span>
                </button>

                {showPreviousFeedback && (
                  <div className="flex items-center gap-2">
                    {feedbackHistory.map((fb, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          playFeedbackSound('click');
                          setCurrentFeedbackIndex(idx);
                        }}
                        className={`flex-1 py-1 px-2 rounded-lg text-xs font-mono font-bold border transition-all cursor-pointer ${
                          currentFeedbackIndex === idx
                            ? 'bg-sky-500 text-white border-sky-400'
                            : isDark
                            ? 'bg-slate-900 border-white/10 text-slate-400'
                            : 'bg-slate-100 border-slate-300 text-slate-600'
                        }`}
                      >
                        Revisión #{fb.attemptNumber} ({'⭐'.repeat(fb.stars)})
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
