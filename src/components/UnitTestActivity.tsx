import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Gauge,
  RotateCw,
  CheckCircle2,
  XCircle,
  Award,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Sparkles,
  HelpCircle,
  Clock,
  BookOpen,
  ChevronDown,
} from 'lucide-react';
import { UnitTestExercise, UnitTestQuestion } from '../types';
import { speakEnglish, playFeedbackSound, stopSpeaking } from '../utils/audio';
import { useTheme } from '../context/ThemeContext';
import chuckWoodImg from '../assets/images/chuck_wood_player_1788552205408.jpg';
import { VocabularyHelperCard } from './VocabularyHelperCard';

interface UnitTestActivityProps {
  exercise: UnitTestExercise;
  accent: 'US' | 'UK';
  speechRate: number;
  onSuccess?: () => void;
}

const PLAYBACK_SPEEDS = [
  { value: 0.5, label: '0.50x' },
  { value: 0.65, label: '0.65x' },
  { value: 0.85, label: '0.85x' },
  { value: 1.0, label: '1x' },
  { value: 1.15, label: '1.15x' },
  { value: 1.3, label: '1.30x' },
];

export const UnitTestActivity: React.FC<UnitTestActivityProps> = ({
  exercise,
  accent,
  speechRate,
  onSuccess,
}) => {
  const { isDark } = useTheme();

  // Test session state: whether the user clicked "Start Test"
  const [isTestStarted, setIsTestStarted] = useState<boolean>(false);
  const [isCardFlipped, setIsCardFlipped] = useState<boolean>(false);
  const [isInstructionFlipped, setIsInstructionFlipped] = useState<boolean>(false);
  const [isQuestionFlipped, setIsQuestionFlipped] = useState<boolean>(false);
  const [isReferenceFlipped, setIsReferenceFlipped] = useState<boolean>(false);
  const [isTestCompleted, setIsTestCompleted] = useState<boolean>(false);

  // Active question index (0 for Test 1, up to 5 for Test 6)
  const [activeQuestionIdx, setActiveQuestionIdx] = useState<number>(0);

  // Total questions
  const totalQuestions = exercise.totalQuestions || exercise.questions.length || 5;

  // User answers state: questionId -> selectedOptionId
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  // Submitted status: questionId -> true
  const [submittedAnswers, setSubmittedAnswers] = useState<Record<string, boolean>>({});
  const [multiSlotAnswers, setMultiSlotAnswers] = useState<Record<string, string[]>>({});

  // Audio speech status for instructions & question
  const [speakingTarget, setSpeakingTarget] = useState<string | null>(null);

  // Media player state for the test question
  const [isPlayingMedia, setIsPlayingMedia] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [playerSpeed, setPlayerSpeed] = useState<number>(speechRate || 1.0);
  const [isSpeedMenuOpen, setIsSpeedMenuOpen] = useState<boolean>(false);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const totalDurationSeconds = exercise.questions[activeQuestionIdx]?.durationSeconds || 41;

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const speedMenuRef = useRef<HTMLDivElement | null>(null);

  const currentQuestion: UnitTestQuestion | undefined = exercise.questions[activeQuestionIdx];
  const isAnswerChecked = currentQuestion ? submittedAnswers[currentQuestion.id] : false;
  const currentSelectedOptionId = currentQuestion ? selectedAnswers[currentQuestion.id] : undefined;

  const isMultiSlotQuestion = Boolean(
    (currentQuestion?.slotsCount && currentQuestion.slotsCount > 1) ||
    (currentQuestion?.correctWords && currentQuestion.correctWords.length > 1)
  );
  const currentMultiSlotPlaced = currentQuestion ? multiSlotAnswers[currentQuestion.id] || [] : [];

  const isMultiSlotCorrect =
    isMultiSlotQuestion &&
    currentQuestion?.correctWords &&
    currentMultiSlotPlaced.length === currentQuestion.correctWords.length &&
    currentMultiSlotPlaced.every((optId, idx) => {
      const opt = currentQuestion.options.find((o) => o.id === optId);
      return opt && opt.text === currentQuestion.correctWords![idx];
    });

  const isAnswerCorrect = currentQuestion && isAnswerChecked && (
    isMultiSlotQuestion ? isMultiSlotCorrect : currentSelectedOptionId === currentQuestion.correctAnswerId
  );

  const hasAnswerSelected = isMultiSlotQuestion
    ? currentMultiSlotPlaced.length > 0
    : Boolean(currentSelectedOptionId || (currentMultiSlotPlaced.length > 0));

  // Reading story if available on the exercise or current question
  const readingStory = exercise.readingStory || currentQuestion?.readingStory;

  // Total correct and completion percentage for test summary
  const totalCorrect = exercise.questions.reduce((acc, q) => {
    const isMulti = Boolean(
      (q.slotsCount && q.slotsCount > 1) ||
      (q.correctWords && q.correctWords.length > 1)
    );
    if (isMulti && q.correctWords && q.correctWords.length > 0) {
      const placed = multiSlotAnswers[q.id] || [];
      const correct =
        placed.length === q.correctWords.length &&
        placed.every((optId, idx) => {
          const opt = q.options.find((o) => o.id === optId);
          return opt && opt.text === q.correctWords![idx];
        });
      return acc + (correct ? 1 : 0);
    }
    return acc + (selectedAnswers[q.id] === q.correctAnswerId ? 1 : 0);
  }, 0);
  const completionPercentage = Math.round((totalCorrect / totalQuestions) * 100);

  // Sync speed when prop changes
  useEffect(() => {
    if (speechRate) setPlayerSpeed(speechRate);
  }, [speechRate]);

  // Close speed popup on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (speedMenuRef.current && !speedMenuRef.current.contains(e.target as Node)) {
        setIsSpeedMenuOpen(false);
      }
    };
    if (isSpeedMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSpeedMenuOpen]);

  // Clean up audio and reset question-level states on unmount or question change
  useEffect(() => {
    setIsQuestionFlipped(false);
    setIsReferenceFlipped(false);
    setIsInstructionFlipped(false);
    setIsPlayingMedia(false);
    setElapsedSeconds(0);
    setIsDragOver(false);
    return () => {
      stopSpeaking();
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [activeQuestionIdx]);

  // Sync media player timer
  useEffect(() => {
    if (isPlayingMedia) {
      timerRef.current = setInterval(() => {
        setElapsedSeconds((prev) => {
          if (prev >= totalDurationSeconds) {
            setIsPlayingMedia(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000 / playerSpeed);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlayingMedia, playerSpeed, totalDurationSeconds]);

  // Media Player Toggle (stopping playback if clicked while active)
  const handleTogglePlayMedia = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const audioTextToPlay =
      currentQuestion?.audioPrompt ||
      exercise.audioPrompt ||
      readingStory?.audioText ||
      readingStory?.paragraphsEn?.join(' ') ||
      readingStory?.textEn ||
      '';

    if (isPlayingMedia) {
      stopSpeaking();
      setIsPlayingMedia(false);
      return;
    }

    stopSpeaking();
    playFeedbackSound('click');
    setIsPlayingMedia(true);
    setSpeakingTarget('media-player');

    const speakerGender = currentQuestion?.speakerGender || exercise.speakerGender || 'male';

    speakEnglish(
      audioTextToPlay,
      playerSpeed,
      accent,
      () => {
        setIsPlayingMedia(true);
      },
      () => {
        setIsPlayingMedia(false);
        setSpeakingTarget(null);
        setElapsedSeconds(totalDurationSeconds);
      },
      speakerGender
    );
  };

  // Seeker scrubber click
  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const targetSec = Math.floor(ratio * totalDurationSeconds);
    setElapsedSeconds(targetSec);
  };

  // Speed selection
  const handleSelectSpeed = (speedValue: number, e: React.MouseEvent) => {
    e.stopPropagation();
    playFeedbackSound('click');
    setPlayerSpeed(speedValue);
    setIsSpeedMenuOpen(false);

    if (isPlayingMedia) {
      stopSpeaking();
      const audioTextToPlay =
        currentQuestion?.audioPrompt ||
        exercise.audioPrompt ||
        readingStory?.audioText ||
        readingStory?.paragraphsEn?.join(' ') ||
        readingStory?.textEn ||
        '';
      const speakerGender = currentQuestion?.speakerGender || exercise.speakerGender || 'male';
      speakEnglish(
        audioTextToPlay,
        speedValue,
        accent,
        undefined,
        () => {
          setIsPlayingMedia(false);
          setSpeakingTarget(null);
          setElapsedSeconds(totalDurationSeconds);
        },
        speakerGender
      );
    }
  };

  // Formatter for media player timestamp mm:ss
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Audio speech for prompt / instructions / question
  const handleListenSpeech = (text: string, targetKey: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (speakingTarget === targetKey) {
      stopSpeaking();
      setSpeakingTarget(null);
      return;
    }

    stopSpeaking();
    setIsPlayingMedia(false);
    setSpeakingTarget(targetKey);

    speakEnglish(
      text,
      playerSpeed,
      accent,
      () => setSpeakingTarget(targetKey),
      () => setSpeakingTarget(null),
      'female'
    );
  };

  // Start the test handler
  const handleStartTest = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    stopSpeaking();
    playFeedbackSound('click');
    setIsTestStarted(true);
    setIsCardFlipped(false);
    setActiveQuestionIdx(0);
  };

  // Check answer handler
  const handleCheckAnswer = () => {
    if (!currentQuestion) return;

    if (isMultiSlotQuestion) {
      if (currentMultiSlotPlaced.length === 0) return;
      setSubmittedAnswers((prev) => ({ ...prev, [currentQuestion.id]: true }));
      if (isMultiSlotCorrect) {
        playFeedbackSound('correct');
        if (onSuccess) onSuccess();
      } else {
        playFeedbackSound('wrong');
      }
      return;
    }

    if (!currentSelectedOptionId) return;
    const isCorrect = currentSelectedOptionId === currentQuestion.correctAnswerId;
    setSubmittedAnswers((prev) => ({ ...prev, [currentQuestion.id]: true }));

    if (isCorrect) {
      playFeedbackSound('correct');
      if (onSuccess) onSuccess();
    } else {
      playFeedbackSound('wrong');
    }
  };

  // Clear answer
  const handleClearAnswer = () => {
    if (!currentQuestion) return;
    playFeedbackSound('click');
    if (isMultiSlotQuestion) {
      setMultiSlotAnswers((prev) => {
        const next = { ...prev };
        delete next[currentQuestion.id];
        return next;
      });
    } else {
      setSelectedAnswers((prev) => {
        const next = { ...prev };
        delete next[currentQuestion.id];
        return next;
      });
    }
    setSubmittedAnswers((prev) => {
      const next = { ...prev };
      delete next[currentQuestion.id];
      return next;
    });
  };

  // Drag and drop handlers for drag-drop test questions
  const handleDragStart = (e: React.DragEvent, optId: string) => {
    if (isAnswerChecked) return;
    e.dataTransfer.setData('text/plain', optId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    if (isAnswerChecked) return;
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    if (isAnswerChecked || !currentQuestion) return;
    e.preventDefault();
    setIsDragOver(false);
    const optId = e.dataTransfer.getData('text/plain');
    if (!optId) return;

    if (isMultiSlotQuestion) {
      handleSelectMultiOption(optId);
      return;
    }

    playFeedbackSound('click');
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optId,
    }));
  };

  const handleSelectOption = (optId: string) => {
    if (isAnswerChecked || !currentQuestion) return;
    if (isMultiSlotQuestion) {
      handleSelectMultiOption(optId);
      return;
    }
    playFeedbackSound('click');
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optId,
    }));
  };

  const handleSelectMultiOption = (optId: string) => {
    if (isAnswerChecked || !currentQuestion) return;
    const currentPlaced = multiSlotAnswers[currentQuestion.id] || [];
    if (currentPlaced.includes(optId)) return;
    const maxSlots = currentQuestion.slotsCount || currentQuestion.correctWords?.length || 8;
    if (currentPlaced.length >= maxSlots) return;

    playFeedbackSound('click');
    setMultiSlotAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: [...currentPlaced, optId],
    }));
  };

  const handleRemoveMultiSlot = (index: number) => {
    if (isAnswerChecked || !currentQuestion) return;
    playFeedbackSound('click');
    setMultiSlotAnswers((prev) => {
      const current = prev[currentQuestion.id] || [];
      const updated = current.filter((_, idx) => idx !== index);
      return {
        ...prev,
        [currentQuestion.id]: updated,
      };
    });
  };

  const handleRemovePlacedOption = () => {
    if (isAnswerChecked || !currentQuestion) return;
    playFeedbackSound('click');
    setSelectedAnswers((prev) => {
      const next = { ...prev };
      delete next[currentQuestion.id];
      return next;
    });
  };

  // ---------------------------------------------------------------------------
  // VISTA 1: TARJETA INICIAL CON BOTÓN "Start Test" (Antes de iniciar)
  // ---------------------------------------------------------------------------
  if (!isTestStarted) {
    return (
      <div className="w-full flex flex-col items-center gap-6 animate-in fade-in duration-300 py-2">
        <div className="w-full max-w-2xl perspective-1000">
          <div
            id="start-test-reversible-card"
            onClick={() => setIsCardFlipped((prev) => !prev)}
            className={`relative w-full min-h-[380px] sm:min-h-[420px] rounded-3xl transition-transform duration-700 transform-style-3d cursor-pointer shadow-2xl select-none ${
              isCardFlipped ? 'rotate-y-180' : ''
            }`}
          >
            {/* FRENTE / FRONT: INGLÉS */}
            <div
              className={`absolute inset-0 w-full h-full rounded-3xl p-6 sm:p-8 flex flex-col justify-between border backface-hidden shadow-xl transition-colors duration-200 overflow-hidden ${
                isDark
                  ? 'bg-slate-900 border-indigo-500/30 text-white'
                  : 'bg-white border-indigo-200 text-slate-900 shadow-md'
              }`}
            >
              {/* Card Header */}
              <div className="flex items-center justify-between gap-3 pb-3 border-b border-inherit/40 shrink-0">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                      isDark
                        ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                        : 'bg-indigo-100 text-indigo-800 border border-indigo-200'
                    }`}
                  >
                    <Award className="w-3.5 h-3.5" />
                    Unit Test · {totalQuestions} Questions
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    id="listen-test-intro-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleListenSpeech(
                        `${exercise.title}. ${exercise.description || `Answer all ${totalQuestions} questions to test your comprehension.`}`,
                        'test-intro'
                      );
                    }}
                    className={`p-2 rounded-xl border transition-all cursor-pointer ${
                      speakingTarget === 'test-intro'
                        ? 'bg-indigo-600 text-white border-indigo-500 ring-2 ring-indigo-400'
                        : isDark
                        ? 'bg-slate-800/80 hover:bg-slate-700 text-indigo-300 border-white/10'
                        : 'bg-white hover:bg-indigo-50 text-indigo-700 border-slate-200 shadow-xs'
                    }`}
                    title="Listen / Stop"
                    aria-label="Escuchar presentación del test"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>

                  <div className="flex items-center gap-1.5 text-xs text-indigo-600/80 dark:text-indigo-400/80 font-medium">
                    <RotateCw className="w-3.5 h-3.5 text-indigo-500" />
                    <span className="hidden sm:inline">Click to flip</span>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="flex-1 my-4 flex flex-col justify-center items-center text-center px-2">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-indigo-600/10 dark:bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-4 shadow-inner">
                  <Award className="w-8 h-8 sm:w-9 sm:h-9" />
                </div>

                <h3 className="text-xl sm:text-2xl font-bold tracking-tight mb-2">
                  {exercise.title || 'Lesson 1: Phone Sales · Mastery Test'}
                </h3>

                <p className="text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300 max-w-lg mb-4">
                  {exercise.description ||
                    `Test your reading comprehension and vocabulary. This test contains ${totalQuestions} questions.`}
                </p>

                <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> {totalQuestions} Questions
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-indigo-500" /> {readingStory ? 'Story Reading' : 'Authentic Audio'}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-500" /> Instant Feedback
                  </span>
                </div>
              </div>

              {/* Card Footer with prominent "Start Test" Button */}
              <div className="pt-4 border-t border-inherit/30 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
                <span className="text-xs text-slate-400 dark:text-slate-500">
                  Press Start Test to begin Test 1
                </span>

                <button
                  id="start-test-btn"
                  onClick={handleStartTest}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-base shadow-lg shadow-indigo-600/30 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Play className="w-5 h-5 fill-current" />
                  <span>Start Test</span>
                </button>
              </div>
            </div>

            {/* REVERSO / BACK: ESPAÑOL */}
            <div
              className={`absolute inset-0 w-full h-full rounded-3xl p-6 sm:p-8 flex flex-col justify-between border backface-hidden rotate-y-180 shadow-xl transition-colors duration-200 overflow-hidden ${
                isDark
                  ? 'bg-slate-900 border-emerald-500/40 text-white'
                  : 'bg-white border-emerald-300 text-slate-900 shadow-md'
              }`}
            >
              {/* Card Header Back */}
              <div className="flex items-center justify-between gap-3 pb-3 border-b border-inherit/40 shrink-0">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                      isDark
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                    }`}
                  >
                    <Award className="w-3.5 h-3.5" />
                    Evaluación de la Unidad · {totalQuestions} Tests
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-emerald-600/80 dark:text-emerald-400/80 font-medium">
                  <RotateCw className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="hidden sm:inline">Haz clic para volver al inglés</span>
                  <span className="sm:hidden">Volver</span>
                </div>
              </div>

              {/* Card Body Back */}
              <div className="flex-1 my-4 flex flex-col justify-center items-center text-center px-2">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-emerald-600/10 dark:bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-4 shadow-inner">
                  <Award className="w-8 h-8 sm:w-9 sm:h-9" />
                </div>

                <h3 className="text-xl sm:text-2xl font-bold tracking-tight mb-2">
                  {exercise.titleEs || 'Lección 1: Ventas por Teléfono · Test'}
                </h3>

                <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-emerald-100/90 max-w-lg mb-4">
                  {exercise.descriptionEs ||
                    `Pon a prueba tu comprensión y vocabulario. Este test consta de ${totalQuestions} preguntas.`}
                </p>

                <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> {totalQuestions} Preguntas
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-emerald-500" /> {readingStory ? 'Lectura' : 'Audio Real'}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-500" /> Corrección Inmediata
                  </span>
                </div>
              </div>

              {/* Card Footer Back with "Start Test" Button */}
              <div className="pt-4 border-t border-inherit/30 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
                <span className="text-xs text-slate-400 dark:text-slate-500">
                  Presiona Comenzar Test para iniciar el Test 1
                </span>

                <button
                  id="start-test-btn-back"
                  onClick={handleStartTest}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base shadow-lg shadow-emerald-600/30 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Play className="w-5 h-5 fill-current" />
                  <span>Comenzar Test</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // VISTA 2: SESIÓN DE TEST ACTIVA (Test 1 a Test 5/6)
  // ---------------------------------------------------------------------------
  return (
    <div className="w-full flex flex-col gap-6 animate-in fade-in duration-300">
      {/* Test Top Navigation Bar: Indicator, Tabs and Exit */}
      <div
        className={`w-full p-3 sm:p-4 rounded-2xl border flex flex-wrap items-center justify-between gap-3 ${
          isDark ? 'bg-[#0F172A] border-slate-700/80' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex items-center gap-2">
          <span
            className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider ${
              isDark
                ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                : 'bg-indigo-100 text-indigo-700 border border-indigo-200'
            }`}
          >
            Test {activeQuestionIdx + 1} of {totalQuestions}
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300">
            {exercise.subtitle || exercise.title || 'Unit Test'}
          </span>
        </div>

        {/* Question Selector Tabs (1, 2, 3, 4, 5, 6) */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {Array.from({ length: totalQuestions }).map((_, idx) => {
            const q = exercise.questions[idx];
            const isAnswered = q && submittedAnswers[q.id];
            const isCorrect = q && isAnswered && selectedAnswers[q.id] === q.correctAnswerId;
            const isActive = activeQuestionIdx === idx;

            return (
              <button
                key={idx}
                id={`test-tab-btn-${idx + 1}`}
                onClick={() => {
                  stopSpeaking();
                  playFeedbackSound('click');
                  setActiveQuestionIdx(idx);
                }}
                className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-center border ${
                  isActive
                    ? 'bg-indigo-600 text-white border-indigo-500 shadow-md scale-105 ring-2 ring-indigo-400'
                    : isCorrect
                    ? 'bg-emerald-600/20 text-emerald-500 border-emerald-500/40 hover:bg-emerald-600/30'
                    : isAnswered
                    ? 'bg-rose-600/20 text-rose-500 border-rose-500/40 hover:bg-rose-600/30'
                    : isDark
                    ? 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                    : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                }`}
                title={`Ir al Test ${idx + 1}`}
                aria-label={`Test ${idx + 1}`}
              >
                {idx + 1}
              </button>
            );
          })}

          {/* Reset / Exit Test button */}
          <button
            id="exit-test-overview-btn"
            onClick={() => {
              stopSpeaking();
              playFeedbackSound('click');
              setIsTestStarted(false);
            }}
            className={`ml-2 px-2.5 py-1.5 rounded-xl border text-xs font-medium transition-all cursor-pointer flex items-center gap-1 ${
              isDark
                ? 'bg-slate-800/80 hover:bg-slate-700 text-slate-300 border-slate-700'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
            }`}
            title="Volver a la portada del Test"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Portada</span>
          </button>
        </div>
      </div>

      {isTestCompleted ? (
        /* VISTA DE RESULTADOS DEL UNIT TEST */
        <div
          id="unit-test-results-container"
          className={`w-full rounded-3xl border p-6 sm:p-10 flex flex-col items-center text-center shadow-xl animate-in zoom-in-95 duration-300 ${
            isDark ? 'bg-[#0F172A] border-slate-700/80 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}
        >
          {/* Trophy badge */}
          <div className="w-20 h-20 rounded-3xl bg-amber-500/10 dark:bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-500 mb-5 shadow-inner">
            <Award className="w-10 h-10" />
          </div>

          <span
            className={`px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider mb-3 ${
              isDark
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'bg-emerald-100 text-emerald-700 border border-emerald-200'
            }`}
          >
            Unit Test Completed
          </span>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
            ¡Felicitaciones! Has completado los {totalQuestions} Tests
          </h2>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-lg mb-6">
            {readingStory
              ? `Puntuación final obtenida en el test de lectura de ${readingStory.title}:`
              : 'Puntuación final obtenida en los ejercicios de comprensión auditiva de Working People Magazine:'}
          </p>

          {/* Score display */}
          <div className="flex items-center justify-center gap-6 mb-8">
            <div className="p-4 sm:p-5 rounded-2xl border border-indigo-500/30 bg-indigo-50/50 dark:bg-indigo-950/30 flex flex-col items-center min-w-[120px]">
              <span className="text-3xl sm:text-4xl font-black text-indigo-600 dark:text-indigo-400">
                {totalCorrect} / {totalQuestions}
              </span>
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-1">
                Aciertos
              </span>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl border border-emerald-500/30 bg-emerald-50/50 dark:bg-emerald-950/30 flex flex-col items-center min-w-[120px]">
              <span className="text-3xl sm:text-4xl font-black text-emerald-600 dark:text-emerald-400">
                {completionPercentage}%
              </span>
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-1">
                Precisión
              </span>
            </div>
          </div>

          {/* Grid of 6 questions summary */}
          <div className="w-full max-w-2xl grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 text-left">
            {exercise.questions.map((q, idx) => {
              const userAns = selectedAnswers[q.id];
              const isCorrect = userAns === q.correctAnswerId;
              return (
                <button
                  key={q.id}
                  onClick={() => {
                    setIsTestCompleted(false);
                    setActiveQuestionIdx(idx);
                  }}
                  className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 transition-all cursor-pointer hover:scale-[1.01] ${
                    isCorrect
                      ? isDark
                        ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-300'
                        : 'bg-emerald-50/70 border-emerald-300 text-emerald-900'
                      : isDark
                      ? 'bg-rose-950/20 border-rose-500/40 text-rose-300'
                      : 'bg-rose-50/70 border-rose-300 text-rose-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="w-6 h-6 rounded-lg bg-inherit font-mono font-bold text-xs flex items-center justify-center shrink-0 border border-current/30">
                      {idx + 1}
                    </span>
                    <span className="text-xs sm:text-sm font-medium truncate">
                      {q.question}
                    </span>
                  </div>
                  {isCorrect ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  ) : (
                    <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              id="review-unit-test-btn"
              onClick={() => {
                setIsTestCompleted(false);
                setActiveQuestionIdx(0);
              }}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-md transition-all cursor-pointer flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Revisar Preguntas</span>
            </button>

            <button
              id="retake-unit-test-btn"
              onClick={() => {
                setSelectedAnswers({});
                setSubmittedAnswers({});
                setIsTestCompleted(false);
                setActiveQuestionIdx(0);
              }}
              className={`px-6 py-2.5 rounded-xl border font-bold text-sm transition-all cursor-pointer flex items-center gap-2 ${
                isDark
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Hacer el Test de Nuevo</span>
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Tarjeta Reversible de Instrucción Superior: "Choose the correct answer." */}
          <div className="w-full perspective-1000">
        <div
          id="test-instruction-reversible-card"
          onClick={() => setIsInstructionFlipped((prev) => !prev)}
          className={`relative w-full min-h-[72px] sm:min-h-[80px] rounded-2xl transition-transform duration-500 transform-style-3d cursor-pointer shadow-md select-none ${
            isInstructionFlipped ? 'rotate-y-180' : ''
          }`}
        >
          {/* FRENTE: INGLÉS */}
          <div
            className={`absolute inset-0 w-full h-full rounded-2xl px-5 py-3.5 flex items-center justify-between border backface-hidden transition-colors ${
              isDark
                ? 'bg-[#131E32] border-slate-700 text-white'
                : 'bg-white border-slate-200 text-slate-900 shadow-xs'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 shrink-0" />
              <h2 className="text-base sm:text-lg font-semibold tracking-tight text-slate-800 dark:text-slate-100">
                {currentQuestion?.instructions || 'Choose the correct answer.'}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                id="listen-test-instruction-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleListenSpeech(
                    currentQuestion?.instructions || 'Choose the correct answer.',
                    'test-instruction'
                  );
                }}
                className={`p-2 rounded-xl border transition-all cursor-pointer ${
                  speakingTarget === 'test-instruction'
                    ? 'bg-indigo-600 text-white border-indigo-500 ring-2 ring-indigo-400'
                    : isDark
                    ? 'bg-slate-800 hover:bg-slate-700 text-indigo-300 border-white/10'
                    : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border-indigo-200'
                }`}
                title="Listen / Stop"
                aria-label="Escuchar instrucción"
              >
                <Volume2 className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-1 text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                <RotateCw className="w-3.5 h-3.5 text-indigo-500" />
                <span className="hidden sm:inline">Traducir</span>
              </div>
            </div>
          </div>

          {/* REVERSO: ESPAÑOL */}
          <div
            className={`absolute inset-0 w-full h-full rounded-2xl px-5 py-3.5 flex items-center justify-between border backface-hidden rotate-y-180 transition-colors ${
              isDark
                ? 'bg-slate-900 border-emerald-500/30 text-white'
                : 'bg-white border-emerald-200 text-slate-900 shadow-xs'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
              <h2 className="text-base sm:text-lg font-semibold tracking-tight text-slate-900 dark:text-emerald-100">
                {currentQuestion?.instructionsEs || 'Elige la respuesta correcta.'}
              </h2>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
              <RotateCw className="w-3.5 h-3.5 text-emerald-500" />
              <span className="hidden sm:inline">Volver al inglés</span>
              <span className="sm:hidden">Volver</span>
            </div>
          </div>
        </div>
      </div>

      {/* CONTENIDO PRINCIPAL: O BIEN TEST 1 (DISPONIBLE) O BIEN PLACEHOLDER (TESTS 2 AL 6) */}
      {currentQuestion ? (
        /* Test 1 Layout exactamente idéntico a la captura del usuario */
        <div
          id="test-question-container"
          className={`w-full rounded-3xl border shadow-xl overflow-hidden transition-all ${
            isDark ? 'bg-[#0F172A] border-slate-700/80' : 'bg-white border-slate-200'
          }`}
        >
          <div className="flex flex-col lg:flex-row items-stretch">
            {/* LADO IZQUIERDO: HISTORIA DE LECTURA (WRONG COLOR) O REPRODUCTOR MULTIMEDIA (PHONE SALES) */}
            {readingStory ? (
              <div className="w-full lg:w-[48%] p-5 sm:p-7 flex flex-col justify-start bg-[#FAF9F5] dark:bg-[#141B2D] border-b lg:border-b-0 lg:border-r border-stone-200 dark:border-slate-800 text-stone-900 dark:text-slate-100 overflow-y-auto max-h-[580px] lg:max-h-[720px] select-text">
                {/* Story Header */}
                <div className="flex items-center justify-between gap-3 mb-5 pb-3 border-b border-stone-200 dark:border-slate-700/80 shrink-0">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#2ba4cc] dark:text-[#38bdf8]">
                      {readingStory.title}
                    </h2>
                    {readingStory.titleEs && (
                      <span className="text-xs text-stone-500 dark:text-slate-400 font-medium">
                        {readingStory.titleEs}
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    id="test-story-audio-btn"
                    onClick={() => {
                      const fullStoryText =
                        readingStory.audioText ||
                        readingStory.paragraphsEn.join(' ') ||
                        readingStory.textEn ||
                        '';
                      handleListenSpeech(fullStoryText, 'test-reading-story');
                    }}
                    className={`px-3.5 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs ${
                      speakingTarget === 'test-reading-story'
                        ? 'bg-sky-500 text-white border-sky-400 ring-2 ring-sky-400/40'
                        : isDark
                        ? 'bg-slate-800 hover:bg-slate-700 text-sky-400 border-slate-700'
                        : 'bg-white hover:bg-stone-100 text-sky-600 border-stone-300'
                    }`}
                    title={speakingTarget === 'test-reading-story' ? 'Detener lectura' : 'Escuchar historia'}
                    aria-label="Escuchar historia"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>{speakingTarget === 'test-reading-story' ? 'Detener' : 'Escuchar'}</span>
                  </button>
                </div>

                {/* Story Paragraphs exactly as in test1.png - test5.png */}
                <div className="space-y-4 text-left font-serif leading-relaxed text-stone-800 dark:text-slate-200 text-sm sm:text-base">
                  {readingStory.paragraphsEn.map((para, pIdx) => {
                    if (pIdx === 0) {
                      const firstLetter = para.charAt(0);
                      const restOfPara = para.slice(1);
                      return (
                        <p key={pIdx} className="leading-relaxed">
                          <span className="float-left text-3xl sm:text-4xl font-serif font-bold mr-1.5 leading-none text-stone-900 dark:text-white">
                            {firstLetter}
                          </span>
                          {restOfPara}
                        </p>
                      );
                    }
                    return (
                      <p key={pIdx} className="leading-relaxed">
                        {para}
                      </p>
                    );
                  })}
                </div>
              </div>
            ) : (exercise.vocabularyWords || currentQuestion.vocabularyWords) ? (
              <div className="w-full lg:w-[45%] p-5 sm:p-7 flex flex-col justify-start items-center bg-[#FAF9F5] dark:bg-[#141B2D] border-b lg:border-b-0 lg:border-r border-stone-200 dark:border-slate-800 overflow-y-auto max-h-[580px] lg:max-h-[720px]">
                <VocabularyHelperCard
                  words={(exercise.vocabularyWords || currentQuestion.vocabularyWords)!}
                  accent={accent}
                  speechRate={playerSpeed}
                />
              </div>
            ) : (
              <div className="w-full lg:w-[48%] p-4 sm:p-6 flex flex-col justify-between bg-slate-900/5 dark:bg-black/30 border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-slate-800">
                <div className="w-full rounded-2xl overflow-hidden border border-slate-700/60 bg-[#1E293B] shadow-lg relative flex flex-col">
                  {/* Imagen del hombre mostrando la revista Working People Magazine */}
                  <div className="relative w-full aspect-[4/3] bg-[#263238] overflow-hidden flex items-center justify-center">
                    <img
                      src={currentQuestion.imageUrl || chuckWoodImg}
                      alt="Chuck Wood - Working People Magazine"
                      className="w-full h-full object-cover object-top"
                    />

                    {/* Overlay play button central si no está reproduciendo */}
                    {!isPlayingMedia && (
                      <button
                        onClick={handleTogglePlayMedia}
                        className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-black/60 hover:bg-indigo-600 text-white flex items-center justify-center transition-transform hover:scale-110 active:scale-95 shadow-xl border border-white/20 cursor-pointer"
                        title="Play"
                        aria-label="Reproducir audio"
                      >
                        <Play className="w-6 h-6 fill-current translate-x-0.5" />
                      </button>
                    )}
                  </div>

                  {/* Barra de Controles de Audio exactamente como la captura */}
                  <div className="w-full px-3 py-2.5 bg-[#1F2937] border-t border-slate-700 flex items-center gap-3 select-none">
                    {/* Play / Pause Toggle (al volver a presionar detiene la reproducción) */}
                    <button
                      id="test-media-play-pause-btn"
                      onClick={handleTogglePlayMedia}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                      title={isPlayingMedia ? 'Pause' : 'Play'}
                      aria-label={isPlayingMedia ? 'Detener reproducción' : 'Reproducir'}
                    >
                      {isPlayingMedia ? (
                        <Pause className="w-4 h-4 fill-current text-indigo-400" />
                      ) : (
                        <Play className="w-4 h-4 fill-current text-slate-200" />
                      )}
                    </button>

                    {/* Timeline Scrubber Bar con indicador circular */}
                    <div
                      onClick={handleTimelineClick}
                      className="relative flex-1 h-3 flex items-center cursor-pointer group py-1"
                      title="Seek"
                    >
                      <div className="w-full h-1.5 bg-slate-600 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-cyan-400 rounded-full transition-all duration-100"
                          style={{
                            width: `${(elapsedSeconds / totalDurationSeconds) * 100}%`,
                          }}
                        />
                      </div>
                      {/* Circle Thumb */}
                      <div
                        className="absolute w-3.5 h-3.5 bg-white rounded-full border-2 border-cyan-500 shadow-md transform -translate-x-1/2 group-hover:scale-125 transition-transform pointer-events-none"
                        style={{
                          left: `${(elapsedSeconds / totalDurationSeconds) * 100}%`,
                        }}
                      />
                    </div>

                    {/* Speed Dial Menu Button (Gauge) */}
                    <div className="relative" ref={speedMenuRef}>
                      <button
                        id="test-speed-menu-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsSpeedMenuOpen((prev) => !prev);
                        }}
                        className={`w-7 h-7 rounded-lg flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer ${
                          isSpeedMenuOpen ? 'text-indigo-400 bg-white/10' : ''
                        }`}
                        title="Playback speed"
                        aria-label="Velocidad de reproducción"
                      >
                        <Gauge className="w-4 h-4" />
                      </button>

                      {/* Speed Selector Popup */}
                      {isSpeedMenuOpen && (
                        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 z-50 bg-[#111827] border border-slate-700 rounded-xl shadow-2xl p-1.5 flex flex-col gap-1 min-w-[70px]">
                          {PLAYBACK_SPEEDS.map((sp) => (
                            <button
                              key={sp.value}
                              onClick={(e) => handleSelectSpeed(sp.value, e)}
                              className={`px-2 py-1 text-xs font-mono rounded-md text-left transition-colors ${
                                Math.abs(playerSpeed - sp.value) < 0.01
                                  ? 'bg-indigo-600 text-white font-bold'
                                  : 'text-slate-300 hover:bg-slate-800'
                              }`}
                            >
                              {sp.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Volume Icon Button */}
                    <button
                      id="test-volume-mute-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsMuted((prev) => !prev);
                        playFeedbackSound('click');
                      }}
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                      title={isMuted ? 'Unmute' : 'Mute'}
                      aria-label="Volumen"
                    >
                      {isMuted ? (
                        <VolumeX className="w-4 h-4 text-rose-400" />
                      ) : (
                        <Volume2 className="w-4 h-4 text-slate-300" />
                      )}
                    </button>

                    {/* Timestamp 00:00 / 00:41 */}
                    <div className="text-xs font-mono font-medium text-cyan-400 tracking-tight shrink-0 select-none">
                      {formatTime(elapsedSeconds)}/{formatTime(totalDurationSeconds)}
                    </div>
                  </div>
                </div>

                {/* Informative footer or Reference sentence box (reversible al hacer clic) */}
                {(currentQuestion.referenceText || exercise.referenceText) ? (
                  <div
                    id={`test-reference-box-${currentQuestion.id}`}
                    onClick={() => {
                      setIsReferenceFlipped((prev) => !prev);
                    }}
                    className={`mt-3.5 p-3.5 sm:p-4 rounded-2xl border text-left transition-all cursor-pointer select-none ${
                      isDark
                        ? 'bg-slate-800/80 border-slate-700 text-slate-200 shadow-sm'
                        : 'bg-white border-slate-200 text-slate-800 shadow-xs'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 pb-1.5 mb-1.5 border-b border-inherit/40 text-[11px] font-mono uppercase font-bold text-cyan-600 dark:text-cyan-400">
                      <span>Key Reference Example</span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleListenSpeech(
                            currentQuestion.referenceText || exercise.referenceText || '',
                            'test-reference-audio'
                          );
                        }}
                        className={`p-1 rounded-md transition-all cursor-pointer ${
                          speakingTarget === 'test-reference-audio'
                            ? 'bg-cyan-500 text-white'
                            : 'bg-white/60 dark:bg-slate-700 text-cyan-600 dark:text-cyan-300 hover:bg-white dark:hover:bg-slate-600'
                        }`}
                        aria-label="Audio"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-xs sm:text-sm font-medium leading-relaxed">
                      {isReferenceFlipped ? (
                        currentQuestion.referenceTextEs || exercise.referenceTextEs || '- En el concierto de rock anoche.'
                      ) : (
                        (() => {
                          const refText = currentQuestion.referenceText || exercise.referenceText || '';
                          const highlights =
                            currentQuestion.referenceHighlights ||
                            exercise.referenceHighlights || ['was', 'were', "wasn't"];
                          const pattern = new RegExp(`\\b(${highlights.join('|')})\\b`, 'gi');
                          const parts = refText.split(pattern);
                          return parts.map((part, pIdx) => {
                            const isMatch = highlights.some(
                              (h) => h.toLowerCase() === part.toLowerCase()
                            );
                            if (isMatch) {
                              return (
                                <span
                                  key={pIdx}
                                  className="inline-block bg-cyan-300 dark:bg-cyan-500/30 text-cyan-950 dark:text-cyan-200 px-1 py-0.5 rounded font-bold border border-cyan-400/40"
                                >
                                  {part}
                                </span>
                              );
                            }
                            return <span key={pIdx}>{part}</span>;
                          });
                        })()
                      )}
                    </p>
                  </div>
                ) : (
                  <div className="mt-3 text-center text-xs text-slate-400">
                    Working People Magazine · Voice Mail Recording
                  </div>
                )}
              </div>
            )}

            {/* LADO DERECHO: PREGUNTA Y OPCIONES DE SELECCIÓN */}
            <div className="w-full lg:w-[52%] p-6 sm:p-8 flex flex-col justify-between">
              <div>
                {currentQuestion.type === 'drag-drop' ? (
                  /* VISTA DRAG & DROP PARA TEST 3 (Y SIMILARES) */
                  <div className="flex flex-col justify-between flex-1 my-2 gap-8">
                    {/* Sentence with Drop Slot */}
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center justify-between gap-3 pb-2 border-b border-inherit">
                        <span className="text-xs font-mono uppercase font-bold text-indigo-600 dark:text-indigo-400">
                          Complete the Sentence
                        </span>

                        <div className="flex items-center gap-2">
                          <button
                            id="listen-drag-sentence-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (isMultiSlotQuestion) {
                                const placedWords = currentMultiSlotPlaced
                                  .map((id) => currentQuestion.options.find((o) => o.id === id)?.text)
                                  .filter(Boolean)
                                  .join(' ');
                                const textToSpeak = placedWords || currentQuestion.audioPrompt || '';
                                handleListenSpeech(textToSpeak, 'test-drag-sentence');
                                return;
                              }
                              const selectedText = currentQuestion.options.find(
                                (o) => o.id === currentSelectedOptionId
                              )?.text;
                              const prefix = currentQuestion.sentencePrefix || currentQuestion.question || '';
                              const suffix = currentQuestion.sentenceSuffix || '';
                              const textToSpeak = `${prefix} ${selectedText || 'blank'} ${suffix}`.trim();
                              handleListenSpeech(textToSpeak, 'test-drag-sentence');
                            }}
                            className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                              speakingTarget === 'test-drag-sentence'
                                ? 'bg-indigo-600 text-white border-indigo-500 ring-2 ring-indigo-400'
                                : isDark
                                ? 'bg-slate-800 hover:bg-slate-700 text-indigo-300 border-white/10'
                                : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border-indigo-200'
                            }`}
                            aria-label="Audio"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Oración con Drop Target Slot (soporta dialogueLines) */}
                      {currentQuestion.dialogueLines && currentQuestion.dialogueLines.length > 0 ? (
                        <div className="space-y-3.5 pt-2 text-base sm:text-lg font-medium leading-relaxed">
                          {currentQuestion.dialogueLines.map((line, lIdx) => {
                            if (line.hasBlank) {
                              if (isMultiSlotQuestion) {
                                const totalSlots = currentQuestion.slotsCount || currentQuestion.correctWords?.length || 6;
                                return (
                                  <div
                                    key={lIdx}
                                    className="flex flex-wrap items-center gap-2 text-slate-900 dark:text-white"
                                  >
                                    <span>
                                      {isQuestionFlipped ? line.prefixEs || line.prefix : line.prefix}
                                    </span>

                                    {/* Multi Drop Slots */}
                                    <div className="flex flex-wrap items-center gap-2 my-1">
                                      {Array.from({ length: totalSlots }).map((_, sIdx) => {
                                        const placedOptId = currentMultiSlotPlaced[sIdx];
                                        const placedOpt = currentQuestion.options.find((o) => o.id === placedOptId);
                                        const isCorrectWord =
                                          isAnswerChecked &&
                                          placedOpt &&
                                          placedOpt.text === currentQuestion.correctWords?.[sIdx];

                                        return (
                                          <div
                                            key={sIdx}
                                            id={`multi-slot-${sIdx}`}
                                            onDragOver={handleDragOver}
                                            onDragLeave={handleDragLeave}
                                            onDrop={handleDrop}
                                            onClick={() => {
                                              if (placedOptId && !isAnswerChecked) {
                                                handleRemoveMultiSlot(sIdx);
                                              }
                                            }}
                                            className={`min-w-[60px] sm:min-w-[76px] h-11 px-2.5 rounded-xl border-2 flex items-center justify-center transition-all select-none ${
                                              isAnswerChecked
                                                ? isCorrectWord
                                                  ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono font-bold'
                                                  : 'border-rose-500 bg-rose-500/10 text-rose-600 dark:text-rose-400 font-mono font-bold'
                                                : isDragOver
                                                ? 'border-indigo-500 bg-indigo-500/20 ring-2 ring-indigo-400 scale-105'
                                                : placedOpt
                                                ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 font-mono font-bold shadow-xs cursor-pointer hover:bg-rose-50 dark:hover:bg-rose-950/30'
                                                : isDark
                                                ? 'border-dashed border-slate-600 bg-slate-800/40 text-slate-400 hover:border-slate-500'
                                                : 'border-dashed border-slate-400 bg-slate-100/70 text-slate-400 hover:border-slate-500'
                                            }`}
                                            title={
                                              placedOpt
                                                ? 'Haz clic para quitar de la casilla'
                                                : `Arrastra una palabra o haz clic en las opciones`
                                            }
                                          >
                                            {placedOpt ? (
                                              <div className="flex items-center gap-1.5">
                                                <span>{placedOpt.text}</span>
                                                {!isAnswerChecked && (
                                                  <XCircle className="w-3.5 h-3.5 text-slate-400 hover:text-rose-500 transition-colors" />
                                                )}
                                              </div>
                                            ) : (
                                              <span className="text-xs text-slate-400 italic font-mono">_</span>
                                            )}
                                          </div>
                                        );
                                      })}
                                    </div>

                                    <span>
                                      {isQuestionFlipped ? line.suffixEs || line.suffix : line.suffix}
                                    </span>
                                  </div>
                                );
                              }

                              return (
                                <div
                                  key={lIdx}
                                  className="flex flex-wrap items-center gap-2.5 text-slate-900 dark:text-white"
                                >
                                  <span>
                                    {isQuestionFlipped ? line.prefixEs || line.prefix : line.prefix}
                                  </span>

                                  {/* Drop Slot Target */}
                                  <div
                                    id="drag-drop-target-slot"
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                    onClick={() => {
                                      if (currentSelectedOptionId && !isAnswerChecked) {
                                        handleRemovePlacedOption();
                                      }
                                    }}
                                    className={`min-w-[120px] sm:min-w-[140px] h-11 px-3.5 rounded-xl border-2 flex items-center justify-center transition-all select-none ${
                                      isAnswerChecked
                                        ? isAnswerCorrect
                                          ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono font-bold'
                                          : 'border-rose-500 bg-rose-500/10 text-rose-600 dark:text-rose-400 font-mono font-bold'
                                        : isDragOver
                                        ? 'border-indigo-500 bg-indigo-500/20 scale-105 shadow-md ring-2 ring-indigo-400'
                                        : currentSelectedOptionId
                                        ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 font-mono font-bold shadow-xs'
                                        : isDark
                                        ? 'border-dashed border-slate-600 bg-slate-800/40 text-slate-400 hover:border-slate-500'
                                        : 'border-dashed border-slate-400 bg-slate-100/70 text-slate-400 hover:border-slate-500'
                                    } ${
                                      currentSelectedOptionId && !isAnswerChecked
                                        ? 'cursor-pointer hover:bg-rose-50 dark:hover:bg-rose-950/30'
                                        : ''
                                    }`}
                                    title={
                                      currentSelectedOptionId
                                        ? 'Haz clic para quitar de la casilla'
                                        : 'Arrastra aquí o haz clic en una opción abajo'
                                    }
                                  >
                                    {currentSelectedOptionId ? (
                                      <div className="flex items-center gap-2">
                                        <span>
                                          {
                                            currentQuestion.options.find(
                                              (o) => o.id === currentSelectedOptionId
                                            )?.text
                                          }
                                        </span>
                                        {!isAnswerChecked && (
                                          <XCircle className="w-4 h-4 text-slate-400 hover:text-rose-500 transition-colors" />
                                        )}
                                      </div>
                                    ) : (
                                      <span className="text-xs sm:text-sm text-slate-400 italic">
                                        ________
                                      </span>
                                    )}
                                  </div>

                                  <span>
                                    {isQuestionFlipped ? line.suffixEs || line.suffix : line.suffix}
                                  </span>
                                </div>
                              );
                            }

                            return (
                              <p
                                key={lIdx}
                                className="text-slate-700 dark:text-slate-300 whitespace-pre-line"
                              >
                                {isQuestionFlipped ? line.textEs || line.textEn : line.textEn}
                              </p>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="flex flex-wrap items-center gap-3 text-lg sm:text-xl font-medium text-slate-900 dark:text-white pt-4 leading-relaxed">
                          <span>
                            {isQuestionFlipped
                              ? currentQuestion.sentencePrefixEs || currentQuestion.questionEs || ''
                              : currentQuestion.sentencePrefix || currentQuestion.question || ''}
                          </span>

                          {/* Drop Slot Target */}
                          <div
                            id="drag-drop-target-slot"
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            onClick={() => {
                              if (currentSelectedOptionId && !isAnswerChecked) {
                                handleRemovePlacedOption();
                              }
                            }}
                            className={`min-w-[140px] sm:min-w-[160px] h-12 px-4 rounded-xl border-2 flex items-center justify-center transition-all select-none ${
                              isAnswerChecked
                                ? isAnswerCorrect
                                  ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono font-bold'
                                  : 'border-rose-500 bg-rose-500/10 text-rose-600 dark:text-rose-400 font-mono font-bold'
                                : isDragOver
                                ? 'border-indigo-500 bg-indigo-500/20 scale-105 shadow-md ring-2 ring-indigo-400'
                                : currentSelectedOptionId
                                ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 font-mono font-bold shadow-xs'
                                : isDark
                                ? 'border-dashed border-slate-600 bg-slate-800/40 text-slate-400 hover:border-slate-500'
                                : 'border-dashed border-slate-400 bg-slate-100/70 text-slate-400 hover:border-slate-500'
                            } ${
                              currentSelectedOptionId && !isAnswerChecked
                                ? 'cursor-pointer hover:bg-rose-50 dark:hover:bg-rose-950/30'
                                : ''
                            }`}
                            title={
                              currentSelectedOptionId
                                ? 'Haz clic para quitar de la casilla'
                                : 'Arrastra aquí o haz clic en una opción abajo'
                            }
                          >
                            {currentSelectedOptionId ? (
                              <div className="flex items-center gap-2">
                                <span>
                                  {
                                    currentQuestion.options.find(
                                      (o) => o.id === currentSelectedOptionId
                                    )?.text
                                  }
                                </span>
                                {!isAnswerChecked && (
                                  <XCircle className="w-4 h-4 text-slate-400 hover:text-rose-500 transition-colors" />
                                )}
                              </div>
                            ) : (
                              <span className="text-xs sm:text-sm text-slate-400 italic">
                                ________
                              </span>
                            )}
                          </div>

                          <span>
                            {isQuestionFlipped
                              ? currentQuestion.sentenceSuffixEs || '.'
                              : currentQuestion.sentenceSuffix || '.'}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Options Pool Area at the bottom of the right panel, matching screenshot */}
                    <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
                      <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">
                        Opciones disponibles (arrastra o haz clic)
                      </div>

                      <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                        {currentQuestion.options.map((opt) => {
                          const isPlaced = isMultiSlotQuestion
                            ? currentMultiSlotPlaced.includes(opt.id)
                            : currentSelectedOptionId === opt.id;

                          return (
                            <div
                              key={opt.id}
                              id={`drag-option-${opt.id}`}
                              draggable={!isAnswerChecked}
                              onDragStart={(e) => handleDragStart(e, opt.id)}
                              onClick={() => handleSelectOption(opt.id)}
                              className={`px-4 py-2.5 rounded-xl border text-sm sm:text-base font-mono font-semibold transition-all select-none shadow-xs ${
                                isPlaced
                                  ? 'opacity-30 border-dashed border-slate-400 bg-slate-200/50 dark:bg-slate-800/40 text-slate-400 pointer-events-none scale-95'
                                  : isDark
                                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-600 hover:border-indigo-400 hover:scale-105 active:scale-95 cursor-grab active:cursor-grabbing'
                                  : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-300 hover:border-indigo-500 hover:scale-105 active:scale-95 cursor-grab active:cursor-grabbing'
                              }`}
                              title={`Haz clic o arrastra: ${opt.text}`}
                            >
                              {opt.text}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ) : currentQuestion.type === 'dropdown' ? (
                  /* VISTA DROPDOWN PARA TEST 1-10 (SHOPPING 2 Y SIMILARES) */
                  <div className="flex flex-col justify-between flex-1 my-2 gap-8">
                    <div className="flex flex-col gap-6">
                      <div className="flex items-center justify-between gap-3 pb-2 border-b border-inherit">
                        <span className="text-xs font-mono uppercase font-bold text-indigo-600 dark:text-indigo-400">
                          Complete the Sentence
                        </span>

                        <div className="flex items-center gap-2">
                          <button
                            id="listen-dropdown-sentence-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              const selectedOpt = currentQuestion.options.find(
                                (o) => o.id === currentSelectedOptionId
                              );
                              const selectedText = selectedOpt?.text || '';
                              const prefix = currentQuestion.sentencePrefix || '';
                              const suffix = currentQuestion.sentenceSuffix || '';
                              const textToSpeak = `${prefix} ${selectedText} ${suffix}`.trim() || currentQuestion.question;
                              handleListenSpeech(textToSpeak, 'test-dropdown-sentence');
                            }}
                            className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                              speakingTarget === 'test-dropdown-sentence'
                                ? 'bg-indigo-600 text-white border-indigo-500 ring-2 ring-indigo-400'
                                : isDark
                                ? 'bg-slate-800 hover:bg-slate-700 text-indigo-300 border-white/10'
                                : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border-indigo-200'
                            }`}
                            aria-label="Audio"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Sentence with Dropdown Select (clic para voltear) */}
                      {currentQuestion.dialogueLines && currentQuestion.dialogueLines.length > 0 ? (
                        <div
                          onClick={() => setIsQuestionFlipped((prev) => !prev)}
                          className="space-y-4 pt-2 text-base sm:text-xl font-medium leading-relaxed cursor-pointer select-none"
                        >
                          {currentQuestion.dialogueLines.map((line, lIdx) => {
                            if (line.hasBlank) {
                              return (
                                <div
                                  key={lIdx}
                                  className="flex flex-wrap items-center gap-3 text-slate-900 dark:text-white"
                                >
                                  <span>{isQuestionFlipped ? line.prefixEs || line.prefix : line.prefix}</span>
                                  <div
                                    className="relative inline-flex items-center my-1"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <select
                                      id={`test-dropdown-select-${currentQuestion.id}`}
                                      value={currentSelectedOptionId || ''}
                                      disabled={isAnswerChecked}
                                      onChange={(e) => {
                                        playFeedbackSound('click');
                                        setSelectedAnswers((prev) => ({
                                          ...prev,
                                          [currentQuestion.id]: e.target.value,
                                        }));
                                      }}
                                      className={`appearance-none px-4 py-2 pr-9 rounded-xl font-semibold text-base sm:text-lg border-2 transition-all cursor-pointer shadow-xs ${
                                        isAnswerChecked
                                          ? isAnswerCorrect
                                            ? 'border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-bold ring-2 ring-emerald-400/40'
                                            : 'border-rose-500 bg-rose-500/10 text-rose-700 dark:text-rose-300 font-bold ring-2 ring-rose-400/40'
                                          : currentSelectedOptionId
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
                                      {currentQuestion.options.map((opt) => (
                                        <option key={opt.id} value={opt.id}>
                                          {opt.text}
                                        </option>
                                      ))}
                                    </select>
                                    <ChevronDown className="w-5 h-5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                  </div>
                                  <span>{isQuestionFlipped ? line.suffixEs || line.suffix : line.suffix}</span>
                                </div>
                              );
                            }
                            return (
                              <div key={lIdx} className="text-slate-800 dark:text-slate-200">
                                {isQuestionFlipped ? line.textEs || line.textEn : line.textEn}
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div
                          onClick={() => setIsQuestionFlipped((prev) => !prev)}
                          className="flex flex-wrap items-center gap-3 text-lg sm:text-2xl font-medium text-slate-900 dark:text-white pt-2 leading-relaxed cursor-pointer select-none"
                        >
                          <span>
                            {isQuestionFlipped
                              ? currentQuestion.sentencePrefixEs || currentQuestion.sentencePrefix
                              : currentQuestion.sentencePrefix}
                          </span>

                          <div
                            className="relative inline-flex items-center my-1"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <select
                              id={`test-dropdown-select-${currentQuestion.id}`}
                              value={currentSelectedOptionId || ''}
                              disabled={isAnswerChecked}
                              onChange={(e) => {
                                playFeedbackSound('click');
                                setSelectedAnswers((prev) => ({
                                  ...prev,
                                  [currentQuestion.id]: e.target.value,
                                }));
                              }}
                              className={`appearance-none px-4 py-2 pr-9 rounded-xl font-semibold text-base sm:text-lg border-2 transition-all cursor-pointer shadow-xs ${
                                isAnswerChecked
                                  ? isAnswerCorrect
                                    ? 'border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-bold ring-2 ring-emerald-400/40'
                                    : 'border-rose-500 bg-rose-500/10 text-rose-700 dark:text-rose-300 font-bold ring-2 ring-rose-400/40'
                                  : currentSelectedOptionId
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
                              {currentQuestion.options.map((opt) => (
                                <option key={opt.id} value={opt.id}>
                                  {opt.text}
                                </option>
                              ))}
                            </select>
                            <ChevronDown className="w-5 h-5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                          </div>

                          <span>
                            {isQuestionFlipped
                              ? currentQuestion.sentenceSuffixEs || currentQuestion.sentenceSuffix
                              : currentQuestion.sentenceSuffix}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  /* VISTA RADIO CHOICES (TEST 1, TEST 2, ETC.) */
                  <div>
                    <div className="mb-6">
                      <div className="flex items-center justify-between gap-3 pb-2 border-b border-inherit">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono uppercase font-bold text-indigo-600 dark:text-indigo-400">
                            Question
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            id="listen-test-question-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleListenSpeech(currentQuestion.question, 'test-question');
                            }}
                            className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                              speakingTarget === 'test-question'
                                ? 'bg-indigo-600 text-white border-indigo-500 ring-2 ring-indigo-400'
                                : isDark
                                ? 'bg-slate-800 hover:bg-slate-700 text-indigo-300 border-white/10'
                                : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border-indigo-200'
                            }`}
                            aria-label="Audio"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <h3
                        onClick={() => setIsQuestionFlipped((prev) => !prev)}
                        className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white mt-3 cursor-pointer select-none"
                      >
                        {isQuestionFlipped
                          ? currentQuestion.questionEs || '¿Quién es la persona que llama?'
                          : currentQuestion.question}
                      </h3>
                    </div>

                    {/* Opciones con Radio buttons grandes y espaciados */}
                    <div className="flex flex-col gap-3 sm:gap-4 my-6">
                      {currentQuestion.options.map((opt) => {
                        const isSelected = currentSelectedOptionId === opt.id;
                        const isCorrectAnswer = opt.id === currentQuestion.correctAnswerId;

                        let optionBorder = isDark ? 'border-slate-700' : 'border-slate-200';
                        let optionBg = isDark ? 'bg-slate-800/60' : 'bg-slate-50/70';

                        if (isSelected) {
                          optionBorder = 'border-indigo-600 dark:border-indigo-400 ring-2 ring-indigo-500/20';
                          optionBg = isDark ? 'bg-indigo-950/40' : 'bg-indigo-50/80';
                        }

                        if (isAnswerChecked) {
                          if (isCorrectAnswer) {
                            optionBorder = 'border-emerald-500 ring-2 ring-emerald-500/30';
                            optionBg = isDark ? 'bg-emerald-950/40' : 'bg-emerald-50';
                          } else if (isSelected && !opt.isCorrect) {
                            optionBorder = 'border-rose-500 ring-2 ring-rose-500/30';
                            optionBg = isDark ? 'bg-rose-950/40' : 'bg-rose-50';
                          }
                        }

                        return (
                          <label
                            key={opt.id}
                            id={`test-option-${opt.id}`}
                            onClick={() => {
                              if (isAnswerChecked) return;
                              playFeedbackSound('click');
                              setSelectedAnswers((prev) => ({
                                ...prev,
                                [currentQuestion.id]: opt.id,
                              }));
                            }}
                            className={`w-full p-4 rounded-2xl border transition-all cursor-pointer flex items-center gap-4 select-none ${optionBorder} ${optionBg} hover:scale-[1.01]`}
                          >
                            {/* Radio input circle */}
                            <div
                              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                                isSelected
                                  ? 'border-indigo-600 bg-indigo-600 text-white dark:border-indigo-400 dark:bg-indigo-500'
                                  : isDark
                                  ? 'border-slate-600 bg-slate-900'
                                  : 'border-slate-400 bg-white'
                              }`}
                            >
                              {isSelected && (
                                <div className="w-2.5 h-2.5 rounded-full bg-white shrink-0" />
                              )}
                            </div>

                            {/* Option label text */}
                            <div className="flex-1 flex items-center justify-between gap-2">
                              <span className="text-base sm:text-lg font-medium text-slate-800 dark:text-slate-100">
                                {opt.text}
                              </span>

                              {/* Sound button for option */}
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleListenSpeech(opt.text, `opt-${opt.id}`);
                                }}
                                className={`p-1.5 rounded-lg opacity-0 hover:opacity-100 group-hover:opacity-100 transition-opacity ${
                                  speakingTarget === `opt-${opt.id}`
                                    ? 'opacity-100 bg-indigo-600 text-white'
                                    : 'text-slate-400 hover:text-indigo-600'
                                }`}
                                title="Listen"
                                aria-label={`Escuchar ${opt.text}`}
                              >
                                <Volume2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons & Feedback Container */}
              <div className="pt-4 border-t border-inherit/40 flex flex-col gap-4">
                {/* Feedback Message if checked */}
                {isAnswerChecked && (
                  <div
                    className={`p-4 rounded-2xl border flex items-start gap-3 animate-in fade-in duration-200 ${
                      isAnswerCorrect
                        ? isDark
                          ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
                          : 'bg-emerald-50 border-emerald-300 text-emerald-900'
                        : isDark
                        ? 'bg-rose-950/40 border-rose-500/50 text-rose-200'
                        : 'bg-rose-50 border-rose-300 text-rose-900'
                    }`}
                  >
                    {isAnswerCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                    )}

                    <div className="flex-1 text-sm leading-relaxed">
                      <div className="font-bold mb-1">
                        {isAnswerCorrect ? '¡Correcto! / Correct!' : 'Incorrecto / Not quite'}
                      </div>
                      <p>
                        {isQuestionFlipped && currentQuestion.explanationEs
                          ? currentQuestion.explanationEs
                          : currentQuestion.explanation ||
                            (isAnswerCorrect ? 'Great job! That is the correct answer.' : 'Review the story and try again.')}
                      </p>
                    </div>
                  </div>
                )}

                {/* Button Bar */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    {activeQuestionIdx > 0 && (
                      <button
                        id="prev-test-question-btn"
                        onClick={() => {
                          stopSpeaking();
                          playFeedbackSound('click');
                          setActiveQuestionIdx((prev) => prev - 1);
                        }}
                        className={`px-3.5 py-2.5 rounded-xl border text-sm font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                          isDark
                            ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
                        }`}
                        title="Ir a la pregunta anterior"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span className="hidden sm:inline">Test {activeQuestionIdx}</span>
                      </button>
                    )}

                    <button
                      id="clear-test-answer-btn"
                      onClick={handleClearAnswer}
                      disabled={!hasAnswerSelected}
                      className={`px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                        !hasAnswerSelected
                          ? 'opacity-40 pointer-events-none'
                          : isDark
                          ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700 cursor-pointer'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300 cursor-pointer'
                      }`}
                    >
                      Clear
                    </button>
                  </div>

                  <div className="flex items-center gap-3">
                    {!isAnswerChecked ? (
                      <button
                        id="check-test-answer-btn"
                        onClick={handleCheckAnswer}
                        disabled={!hasAnswerSelected}
                        className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all shadow-md ${
                          !hasAnswerSelected
                            ? 'opacity-40 pointer-events-none bg-slate-400 text-white'
                            : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30 hover:scale-[1.02] active:scale-95 cursor-pointer'
                        }`}
                      >
                        Check Answer
                      </button>
                    ) : (
                      <button
                        id="next-test-question-btn"
                        onClick={() => {
                          stopSpeaking();
                          playFeedbackSound('click');
                          if (activeQuestionIdx < totalQuestions - 1) {
                            setActiveQuestionIdx((prev) => prev + 1);
                          } else {
                            setIsTestCompleted(true);
                            playFeedbackSound('correct');
                            if (onSuccess) {
                              onSuccess();
                            }
                          }
                        }}
                        className="px-6 py-2.5 rounded-xl font-bold text-sm bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/30 hover:scale-[1.02] active:scale-95 cursor-pointer flex items-center gap-2"
                      >
                        <span>
                          {activeQuestionIdx < totalQuestions - 1
                            ? `Next: Test ${activeQuestionIdx + 2}`
                            : 'Finish Unit Test'}
                        </span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* VISTA PREVIA / ESPACIO PREPARADO PARA TESTS 2 AL 6 (A la espera de contenido del usuario) */
        <div
          id="upcoming-test-container"
          className={`w-full min-h-[340px] rounded-3xl border p-8 flex flex-col items-center justify-center text-center shadow-lg transition-all ${
            isDark ? 'bg-[#0F172A] border-slate-700/80 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}
        >
          <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 dark:bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-4 shadow-inner">
            <Clock className="w-8 h-8" />
          </div>

          <span
            className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider mb-3 ${
              isDark
                ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                : 'bg-indigo-100 text-indigo-700 border border-indigo-200'
            }`}
          >
            Test {activeQuestionIdx + 1} of {totalQuestions}
          </span>

          <h3 className="text-xl sm:text-2xl font-bold tracking-tight mb-2">
            Test {activeQuestionIdx + 1}: Próximamente
          </h3>

          <p className="text-sm sm:text-base leading-relaxed text-slate-500 dark:text-slate-400 max-w-md mb-6">
            Espacio preparado para el Test {activeQuestionIdx + 1}. Envía la imagen o el contenido correspondiente para activarlo.
          </p>

          <button
            id="back-to-test-1-btn"
            onClick={() => {
              stopSpeaking();
              playFeedbackSound('click');
              setActiveQuestionIdx(0);
            }}
            className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-md transition-all cursor-pointer flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver al Test 1</span>
          </button>
        </div>
      )}
        </>
      )}
    </div>
  );
};
