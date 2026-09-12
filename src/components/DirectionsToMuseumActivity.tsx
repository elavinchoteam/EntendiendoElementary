import React, { useState, useEffect, useRef } from 'react';
import {
  Volume2,
  CheckCircle2,
  XCircle,
  Play,
  RotateCcw,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Award,
  Check,
  Gauge,
  Clock,
} from 'lucide-react';
import {
  MUSEUM_ACTIVITIES,
  MUSEUM_UNIT_TEST_QUESTIONS,
  MUSEUM_DIALOGUE_TURNS,
  MUSEUM_FULL_AUDIO_TEXT,
  MUSEUM_LESSON_SENTENCES,
  DialogueTurn,
  MuseumActivityData,
} from '../data/directionsToTheMuseumData';
import { MuseumVideoPlayer } from './MuseumVideoPlayer';
import { useTheme } from '../context/ThemeContext';
import { speakEnglish, stopSpeaking, playFeedbackSound } from '../utils/audio';

export interface DirectionsToMuseumActivityProps {
  accent?: 'US' | 'UK';
  speechRate?: number;
  onSuccess?: () => void;
}

const SPEED_OPTIONS = [
  { value: 0.5, label: '0.50x' },
  { value: 0.65, label: '0.65x' },
  { value: 0.85, label: '0.85x' },
  { value: 1.0, label: '1x' },
  { value: 1.15, label: '1.15x' },
  { value: 1.3, label: '1.30x' },
];

export const DirectionsToMuseumActivity: React.FC<DirectionsToMuseumActivityProps> = ({
  accent = 'US',
  speechRate = 1.0,
  onSuccess,
}) => {
  const { isDark } = useTheme();

  // Current main activity slide: 0 to 9 (0 = Actividad 1, 8 = Actividad 9, 9 = Actividad 10: Test)
  const [currentActivityIdx, setCurrentActivityIdx] = useState<number>(0);

  // Audio speech rate setting (0.5x to 1.30x)
  const [currentRate, setCurrentRate] = useState<number>(speechRate);
  const [isRateMenuOpen, setIsRateMenuOpen] = useState(false);
  const rateMenuRef = useRef<HTMLDivElement | null>(null);

  // Audio playing sentence tracking
  const [playingSentenceIdx, setPlayingSentenceIdx] = useState<number | null>(null);

  // Reversible cards state per slide
  const [isInstructionFlipped, setIsInstructionFlipped] = useState(false);
  const [isQuestionFlipped, setIsQuestionFlipped] = useState(false);
  const [isExploreCardFlipped, setIsExploreCardFlipped] = useState(false);
  const [flippedOptionIds, setFlippedOptionIds] = useState<string[]>([]);

  // State for Multiple Choice Activities (Actividades 2 to 8)
  const [selectedOptions, setSelectedOptions] = useState<Record<number, string>>({});
  const [submittedActivities, setSubmittedActivities] = useState<Record<number, boolean>>({});

  // State for Activity 9 (Fill in the blanks)
  const [blankAnswers, setBlankAnswers] = useState<Record<string, string>>({});
  const [isAct9Submitted, setIsAct9Submitted] = useState(false);
  const [activeBlankId, setActiveBlankId] = useState<string | null>(null);

  // State for Activity 10 (Test with 5 tests: Test 1 to Test 5)
  const [isTestStarted, setIsTestStarted] = useState<boolean>(false);
  const [isStartCardFlipped, setIsStartCardFlipped] = useState<boolean>(false);
  const [activeTestSubIndex, setActiveTestSubIndex] = useState<number>(0);
  const [testSelectedOptions, setTestSelectedOptions] = useState<Record<string, string>>({});
  const [testSubmittedQuestions, setTestSubmittedQuestions] = useState<Record<string, boolean>>({});
  const [isTestFinished, setIsTestFinished] = useState(false);
  const [testFlippedOptions, setTestFlippedOptions] = useState<string[]>([]);
  const [isTestQuestionFlipped, setIsTestQuestionFlipped] = useState(false);

  // Close rate dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (rateMenuRef.current && !rateMenuRef.current.contains(e.target as Node)) {
        setIsRateMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Reset flips when navigating slides
  useEffect(() => {
    setIsInstructionFlipped(false);
    setIsQuestionFlipped(false);
    setIsExploreCardFlipped(false);
    setFlippedOptionIds([]);
    setTestFlippedOptions([]);
    setIsTestQuestionFlipped(false);
    setIsStartCardFlipped(false);
    stopSpeaking();
    setPlayingSentenceIdx(null);
  }, [currentActivityIdx, activeTestSubIndex]);

  const handlePlayText = (
    textEn: string,
    idx: number = -1,
    e?: React.MouseEvent,
    gender: 'male' | 'female' = 'male'
  ) => {
    e?.stopPropagation();
    if (playingSentenceIdx === idx && window.speechSynthesis?.speaking) {
      stopSpeaking();
      setPlayingSentenceIdx(null);
      return;
    }
    stopSpeaking();
    setPlayingSentenceIdx(idx);
    speakEnglish(
      textEn,
      currentRate,
      accent === 'UK' ? 'UK' : 'US',
      () => setPlayingSentenceIdx(idx),
      () => setPlayingSentenceIdx(null),
      gender
    );
  };

  const toggleOptionFlip = (optId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    playFeedbackSound('flip');
    setFlippedOptionIds((prev) =>
      prev.includes(optId) ? prev.filter((id) => id !== optId) : [...prev, optId]
    );
  };

  const toggleTestOptionFlip = (optId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    playFeedbackSound('flip');
    setTestFlippedOptions((prev) =>
      prev.includes(optId) ? prev.filter((id) => id !== optId) : [...prev, optId]
    );
  };

  const goToSlide = (idx: number) => {
    if (idx < 0 || idx > 9) return;
    playFeedbackSound('click');
    stopSpeaking();
    setCurrentActivityIdx(idx);
  };

  const currentActivityData: MuseumActivityData | undefined =
    currentActivityIdx < 9 ? MUSEUM_ACTIVITIES[currentActivityIdx] : undefined;

  // Render Activity 1: Explore Transcript & Video
  const renderActivity1 = () => {
    return (
      <div className="w-full flex flex-col lg:flex-row gap-6 items-start">
        {/* Left Column: Video Player */}
        <div className="w-full lg:w-1/2">
          <MuseumVideoPlayer
            highlightedTurnIds={[]}
            showTranscriptByDefault={false}
            accent={accent}
            speechRate={currentRate}
          />
        </div>

        {/* Right Column: Reversible Transcript Card */}
        <div className="w-full lg:w-1/2 perspective-1000">
          <div
            onClick={() => {
              playFeedbackSound('flip');
              setIsExploreCardFlipped(!isExploreCardFlipped);
            }}
            className={`relative w-full min-h-[580px] rounded-2xl cursor-pointer select-none transition-transform duration-500 transform-style-3d border shadow-sm ${
              isExploreCardFlipped ? 'rotate-y-180' : ''
            } ${
              isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'
            }`}
          >
            {/* Front: English Transcript */}
            <div className="absolute inset-0 p-5 sm:p-6 flex flex-col justify-between backface-hidden overflow-hidden">
              {/* Header with speaker button */}
              <div className="flex items-center justify-between pb-3 border-b border-inherit/40 shrink-0">
                <span className="font-semibold text-sm sm:text-base text-slate-900 dark:text-white">
                  Directions to the Museum
                </span>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => handlePlayText(MUSEUM_FULL_AUDIO_TEXT, 9999, e)}
                    className={`p-2 rounded-xl border transition-all cursor-pointer ${
                      playingSentenceIdx === 9999
                        ? 'bg-sky-500 text-white border-sky-400 ring-2 ring-sky-300'
                        : isDark
                        ? 'bg-slate-800 hover:bg-slate-700 text-sky-300 border-slate-700'
                        : 'bg-sky-50 hover:bg-sky-100 text-sky-600 border-sky-200'
                    }`}
                    aria-label="Audio"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Dialogue turns list with clickable audio */}
              <div className="flex-1 my-3 overflow-y-auto space-y-3 pr-1 text-sm sm:text-base">
                {MUSEUM_DIALOGUE_TURNS.map((turn, idx) => {
                  const isCurrent = playingSentenceIdx === idx;
                  return (
                    <div
                      key={turn.id}
                      onClick={(e) => handlePlayText(turn.en, idx, e)}
                      className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-start gap-2.5 ${
                        isCurrent
                          ? isDark
                            ? 'bg-sky-950/60 border-sky-500 text-white ring-1 ring-sky-400'
                            : 'bg-sky-50 border-sky-400 text-slate-900 ring-1 ring-sky-300'
                          : isDark
                          ? 'bg-slate-800/40 border-slate-700 hover:bg-slate-800/80 text-slate-200'
                          : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-800'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={(e) => handlePlayText(turn.en, idx, e)}
                        className={`p-1 rounded-lg border shrink-0 ${
                          isCurrent
                            ? 'bg-sky-500 text-white border-sky-400'
                            : isDark
                            ? 'bg-slate-700 text-sky-300 border-slate-600'
                            : 'bg-white text-sky-600 border-slate-300'
                        }`}
                        aria-label="Audio"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                      <p className="leading-relaxed">
                        <span
                          className={`font-bold mr-1.5 ${
                            turn.speaker === 'Ivan'
                              ? 'text-amber-600 dark:text-amber-400'
                              : 'text-sky-600 dark:text-sky-400'
                          }`}
                        >
                          {turn.speaker}:
                        </span>
                        {turn.en}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="pt-2 border-t border-inherit/30 flex justify-end text-xs text-slate-500 dark:text-slate-400 shrink-0">
                <span>{MUSEUM_DIALOGUE_TURNS.length} intervenciones</span>
              </div>
            </div>

            {/* Back: Spanish Translation */}
            <div className="absolute inset-0 p-5 sm:p-6 flex flex-col justify-between backface-hidden rotate-y-180 overflow-hidden">
              <div className="flex items-center justify-between pb-3 border-b border-inherit/40 shrink-0">
                <span className="font-semibold text-sm sm:text-base text-slate-900 dark:text-white">
                  Direcciones al Museo (Español)
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">Traducción</span>
              </div>

              <div className="flex-1 my-3 overflow-y-auto space-y-3 pr-1 text-sm sm:text-base">
                {MUSEUM_DIALOGUE_TURNS.map((turn) => (
                  <div
                    key={turn.id}
                    className={`p-2.5 rounded-xl border text-sm ${
                      isDark
                        ? 'bg-slate-800/40 border-slate-700 text-slate-200'
                        : 'bg-slate-50 border-slate-200 text-slate-800'
                    }`}
                  >
                    <p className="leading-relaxed">
                      <span
                        className={`font-bold mr-1.5 ${
                          turn.speaker === 'Ivan'
                            ? 'text-amber-600 dark:text-amber-400'
                            : 'text-sky-600 dark:text-sky-400'
                        }`}
                      >
                        {turn.speakerEs}:
                      </span>
                      {turn.es}
                    </p>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-inherit/30 flex justify-end text-xs text-slate-500 dark:text-slate-400 shrink-0">
                <span>Traducción contextual completa</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render Multiple Choice Activities: Actividades 2 to 8
  const renderRadioChoiceActivity = (act: MuseumActivityData) => {
    const actNumber = act.activityNumber;
    const selectedOptId = selectedOptions[actNumber];
    const isSubmitted = Boolean(submittedActivities[actNumber]);
    const isCorrect = selectedOptId === act.correctOptionId;

    const handleSelect = (optId: string) => {
      if (isSubmitted) return;
      playFeedbackSound('click');
      setSelectedOptions((prev) => ({ ...prev, [actNumber]: optId }));
    };

    const handleCheck = () => {
      if (!selectedOptId) return;
      setSubmittedActivities((prev) => ({ ...prev, [actNumber]: true }));
      if (selectedOptId === act.correctOptionId) {
        playFeedbackSound('correct');
      } else {
        playFeedbackSound('wrong');
      }
    };

    const handleReset = () => {
      setSelectedOptions((prev) => {
        const copy = { ...prev };
        delete copy[actNumber];
        return copy;
      });
      setSubmittedActivities((prev) => {
        const copy = { ...prev };
        delete copy[actNumber];
        return copy;
      });
      setFlippedOptionIds([]);
    };

    return (
      <div className="w-full flex flex-col gap-5">
        {/* Top Reversible Instruction Card: "Choose the correct answer." */}
        <div className="w-full perspective-1000">
          <div
            onClick={() => {
              playFeedbackSound('flip');
              setIsInstructionFlipped(!isInstructionFlipped);
            }}
            className={`relative w-full min-h-[58px] rounded-2xl cursor-pointer select-none transition-transform duration-500 transform-style-3d border shadow-xs ${
              isInstructionFlipped ? 'rotate-y-180' : ''
            } ${
              isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            {/* Front: English */}
            <div className="absolute inset-0 px-5 py-3 flex items-center justify-between backface-hidden">
              <span className="font-semibold text-sm sm:text-base">{act.instructions}</span>
              <button
                type="button"
                onClick={(e) => handlePlayText(act.instructions, -10, e)}
                className={`p-1.5 rounded-lg border transition-all shrink-0 ${
                  isDark
                    ? 'bg-slate-800 hover:bg-slate-700 text-sky-300 border-slate-700'
                    : 'bg-sky-50 hover:bg-sky-100 text-sky-600 border-sky-200'
                }`}
                aria-label="Audio"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            {/* Back: Spanish Translation */}
            <div className="absolute inset-0 px-5 py-3 flex items-center justify-between backface-hidden rotate-y-180">
              <span className="font-semibold text-sm sm:text-base italic text-slate-700 dark:text-slate-200">
                {act.instructionsEs}
              </span>
            </div>
          </div>
        </div>

        {/* Main Grid: Left Column (Video Player + Transcript with highlights) & Right Column (Question + Options) */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column (6 Cols) */}
          <div className="lg:col-span-6 w-full">
            <MuseumVideoPlayer
              highlightedTurnIds={act.highlightedTurnIds || []}
              showTranscriptByDefault={true}
              accent={accent}
              speechRate={currentRate}
            />
          </div>

          {/* Right Column: Question Card & Reversible Options (6 Cols) */}
          <div className="lg:col-span-6 w-full flex flex-col gap-4">
            {/* Question Card (Reversible) */}
            <div className="w-full perspective-1000">
              <div
                onClick={() => {
                  playFeedbackSound('flip');
                  setIsQuestionFlipped(!isQuestionFlipped);
                }}
                className={`relative w-full min-h-[64px] rounded-2xl cursor-pointer select-none transition-transform duration-500 transform-style-3d border shadow-xs ${
                  isQuestionFlipped ? 'rotate-y-180' : ''
                } ${
                  isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
                }`}
              >
                {/* Front: English Question */}
                <div className="absolute inset-0 px-5 py-3.5 flex items-center justify-between backface-hidden">
                  <h3 className="font-bold text-base sm:text-lg">{act.question}</h3>
                  <button
                    type="button"
                    onClick={(e) => handlePlayText(act.question || '', -11, e)}
                    className={`p-1.5 rounded-lg border transition-all shrink-0 ${
                      isDark
                        ? 'bg-slate-800 hover:bg-slate-700 text-sky-300 border-slate-700'
                        : 'bg-sky-50 hover:bg-sky-100 text-sky-600 border-sky-200'
                    }`}
                    aria-label="Audio"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Back: Spanish Question */}
                <div className="absolute inset-0 px-5 py-3.5 flex items-center justify-between backface-hidden rotate-y-180">
                  <h3 className="font-bold text-base sm:text-lg italic text-slate-700 dark:text-slate-200">
                    {act.questionEs}
                  </h3>
                </div>
              </div>
            </div>

            {/* Radio Options List (each reversible) */}
            <div className="flex flex-col gap-3">
              {(act.options || []).map((opt) => {
                const isSelected = selectedOptId === opt.id;
                const isFlipped = flippedOptionIds.includes(opt.id);
                const isOptionCorrect = opt.id === act.correctOptionId;

                let cardStyle = isDark
                  ? 'bg-slate-900 border-slate-700 text-white hover:border-slate-500'
                  : 'bg-white border-slate-200 text-slate-900 hover:border-slate-400';

                if (isSubmitted) {
                  if (isOptionCorrect) {
                    cardStyle = isDark
                      ? 'bg-emerald-950/50 border-emerald-500 text-emerald-200 ring-2 ring-emerald-500'
                      : 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-2 ring-emerald-400';
                  } else if (isSelected && !isOptionCorrect) {
                    cardStyle = isDark
                      ? 'bg-rose-950/50 border-rose-500 text-rose-200 ring-2 ring-rose-500'
                      : 'bg-rose-50 border-rose-500 text-rose-950 ring-2 ring-rose-400';
                  }
                } else if (isSelected) {
                  cardStyle = isDark
                    ? 'bg-sky-950/50 border-sky-500 text-white ring-2 ring-sky-500'
                    : 'bg-sky-50 border-sky-500 text-slate-900 ring-2 ring-sky-400';
                }

                return (
                  <div key={opt.id} className="w-full perspective-1000">
                    <div
                      onClick={(e) => toggleOptionFlip(opt.id, e)}
                      className={`relative w-full min-h-[58px] rounded-2xl cursor-pointer select-none transition-transform duration-500 transform-style-3d border shadow-xs ${
                        isFlipped ? 'rotate-y-180' : ''
                      } ${cardStyle}`}
                    >
                      {/* Front: English Option */}
                      <div className="absolute inset-0 px-4 py-3 flex items-center justify-between backface-hidden">
                        <div
                          className="flex items-center gap-3 flex-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelect(opt.id);
                          }}
                        >
                          {/* Radio circle */}
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                              isSelected
                                ? isSubmitted
                                  ? isOptionCorrect
                                    ? 'border-emerald-500 bg-emerald-500'
                                    : 'border-rose-500 bg-rose-500'
                                  : 'border-sky-500 bg-sky-500'
                                : 'border-slate-400 dark:border-slate-500'
                            }`}
                          >
                            {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                          </div>

                          <span className="text-sm sm:text-base font-medium">{opt.text}</span>
                        </div>

                        {/* Speaker Button (Icon only) */}
                        <button
                          type="button"
                          onClick={(e) => handlePlayText(opt.text, -20, e)}
                          className={`p-1.5 rounded-lg border transition-all shrink-0 ml-2 ${
                            isDark
                              ? 'bg-slate-800 hover:bg-slate-700 text-sky-300 border-slate-700'
                              : 'bg-sky-50 hover:bg-sky-100 text-sky-600 border-sky-200'
                          }`}
                          aria-label="Audio"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Back: Spanish Translation */}
                      <div className="absolute inset-0 px-4 py-3 flex items-center justify-between backface-hidden rotate-y-180">
                        <span className="text-sm sm:text-base font-medium italic text-slate-700 dark:text-slate-200">
                          {opt.textEs}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Action Buttons: Check Answer / Next */}
            <div className="mt-2 flex items-center justify-between gap-3">
              {isSubmitted ? (
                <button
                  type="button"
                  onClick={handleReset}
                  className={`px-4 py-2 rounded-xl border text-xs sm:text-sm font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                    isDark
                      ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
                  }`}
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reintentar</span>
                </button>
              ) : (
                <div />
              )}

              {!isSubmitted ? (
                <button
                  type="button"
                  disabled={!selectedOptId}
                  onClick={handleCheck}
                  className={`px-6 py-2.5 rounded-xl font-bold text-sm shadow-md transition-all cursor-pointer ${
                    selectedOptId
                      ? 'bg-sky-600 hover:bg-sky-700 text-white active:scale-95'
                      : 'bg-slate-300 dark:bg-slate-800 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  Comprobar
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => goToSlide(currentActivityIdx + 1)}
                  className="px-6 py-2.5 rounded-xl font-bold text-sm bg-indigo-600 hover:bg-indigo-700 text-white shadow-md transition-all cursor-pointer active:scale-95 flex items-center gap-2"
                >
                  <span>Siguiente</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Explanation card after submit */}
            {isSubmitted && (
              <div
                className={`p-4 rounded-2xl border animate-in fade-in duration-200 flex flex-col gap-2 ${
                  isCorrect
                    ? isDark
                      ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                      : 'bg-emerald-50 border-emerald-200 text-emerald-950'
                    : isDark
                    ? 'bg-rose-950/40 border-rose-500/40 text-rose-200'
                    : 'bg-rose-50 border-rose-200 text-rose-950'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-sm">
                  {isCorrect ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <XCircle className="w-4 h-4 text-rose-500" />
                  )}
                  <span>{isCorrect ? '¡Correcto!' : 'Respuesta Incorrecta'}</span>
                </div>
                <p className="text-xs sm:text-sm leading-relaxed">{act.explanationEn}</p>
                <p className="text-xs sm:text-sm leading-relaxed italic text-slate-600 dark:text-slate-300">
                  {act.explanationEs}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Render Activity 9: Fill in the Blanks (Cloze)
  const renderActivity9 = (act: MuseumActivityData) => {
    const blanks = act.blanks || [];
    const wordBank = act.wordBank || [];

    const handleSelectWordForActiveBlank = (word: string) => {
      if (isAct9Submitted) return;
      playFeedbackSound('click');

      // If a blank is actively focused, place word there
      if (activeBlankId) {
        const updated = { ...blankAnswers, [activeBlankId]: word };
        setBlankAnswers(updated);
        // Automatically focus next empty blank if available
        const nextBlank = blanks.find((b) => b.id !== activeBlankId && !updated[b.id]);
        if (nextBlank) {
          setActiveBlankId(nextBlank.id);
        } else {
          setActiveBlankId(null);
        }
      } else {
        // Find first empty blank
        const firstEmpty = blanks.find((b) => !blankAnswers[b.id]);
        if (firstEmpty) {
          setBlankAnswers((prev) => ({ ...prev, [firstEmpty.id]: word }));
        }
      }
    };

    const handleClearBlank = (blankId: string, e: React.MouseEvent) => {
      e.stopPropagation();
      if (isAct9Submitted) return;
      playFeedbackSound('click');
      setBlankAnswers((prev) => {
        const copy = { ...prev };
        delete copy[blankId];
        return copy;
      });
    };

    const handleCheckAct9 = () => {
      setIsAct9Submitted(true);
      const allCorrect = blanks.every((b) => blankAnswers[b.id] === b.correctWord);
      if (allCorrect) {
        playFeedbackSound('correct');
      } else {
        playFeedbackSound('wrong');
      }
    };

    const handleResetAct9 = () => {
      setBlankAnswers({});
      setIsAct9Submitted(false);
      setActiveBlankId(null);
    };

    const allBlanksFilled = blanks.every((b) => Boolean(blankAnswers[b.id]));

    return (
      <div className="w-full flex flex-col gap-5">
        {/* Top Reversible Instruction Card: "Fill in the blanks with the correct answers." */}
        <div className="w-full perspective-1000">
          <div
            onClick={() => {
              playFeedbackSound('flip');
              setIsInstructionFlipped(!isInstructionFlipped);
            }}
            className={`relative w-full min-h-[58px] rounded-2xl cursor-pointer select-none transition-transform duration-500 transform-style-3d border shadow-xs ${
              isInstructionFlipped ? 'rotate-y-180' : ''
            } ${
              isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <div className="absolute inset-0 px-5 py-3 flex items-center justify-between backface-hidden">
              <span className="font-semibold text-sm sm:text-base">{act.instructions}</span>
              <button
                type="button"
                onClick={(e) => handlePlayText(act.instructions, -30, e)}
                className={`p-1.5 rounded-lg border transition-all shrink-0 ${
                  isDark
                    ? 'bg-slate-800 hover:bg-slate-700 text-sky-300 border-slate-700'
                    : 'bg-sky-50 hover:bg-sky-100 text-sky-600 border-sky-200'
                }`}
                aria-label="Audio"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
            <div className="absolute inset-0 px-5 py-3 flex items-center justify-between backface-hidden rotate-y-180">
              <span className="font-semibold text-sm sm:text-base italic text-slate-700 dark:text-slate-200">
                {act.instructionsEs}
              </span>
            </div>
          </div>
        </div>

        {/* Grid: Left Column Video & Right Column Fill Blanks Card */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column Video Player */}
          <div className="lg:col-span-6 w-full">
            <MuseumVideoPlayer
              highlightedTurnIds={act.highlightedTurnIds || []}
              showTranscriptByDefault={true}
              accent={accent}
              speechRate={currentRate}
            />
          </div>

          {/* Right Column: Fill in the Blanks Content */}
          <div className="lg:col-span-6 w-full flex flex-col gap-4">
            {/* Cloze Text Card */}
            <div
              className={`p-5 sm:p-6 rounded-2xl border shadow-xs flex flex-col gap-4 ${
                isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
              }`}
            >
              <div className="flex items-center justify-between pb-3 border-b border-inherit/40">
                <span className="text-xs font-bold uppercase tracking-wider font-mono text-sky-600 dark:text-sky-400">
                  Completa los 5 espacios
                </span>
                <button
                  type="button"
                  onClick={(e) =>
                    handlePlayText(
                      'Ivan is asking for directions. Ivan says he is trying to get to the art museum. From McKinley Street, Ivan has to turn right on Grant Street. Ivan has to walk up Jackson until he sees a movie theater. The museum is opposite the movie theater.',
                      -31,
                      e
                    )
                  }
                  className={`p-1.5 rounded-lg border transition-all shrink-0 ${
                    isDark
                      ? 'bg-slate-800 hover:bg-slate-700 text-sky-300 border-slate-700'
                      : 'bg-sky-50 hover:bg-sky-100 text-sky-600 border-sky-200'
                  }`}
                  aria-label="Audio"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Interactive Paragraph with Blanks */}
              <div className="text-base sm:text-lg leading-loose font-sans font-medium space-y-3">
                {blanks.map((blank, bIdx) => {
                  const currentWord = blankAnswers[blank.id];
                  const isBlankActive = activeBlankId === blank.id;
                  const isCorrectWord = currentWord === blank.correctWord;

                  return (
                    <div key={blank.id} className="flex flex-wrap items-center gap-1.5">
                      <span>{blank.prefixText}</span>

                      {/* Drop / Click Slot */}
                      <div
                        onClick={() => {
                          if (isAct9Submitted) return;
                          setActiveBlankId(isBlankActive ? null : blank.id);
                        }}
                        className={`inline-flex items-center min-w-[120px] max-w-full h-9 px-3 rounded-xl border font-bold text-sm transition-all cursor-pointer select-none ${
                          currentWord
                            ? isAct9Submitted
                              ? isCorrectWord
                                ? 'bg-emerald-100 text-emerald-900 border-emerald-500 dark:bg-emerald-950/80 dark:text-emerald-200'
                                : 'bg-rose-100 text-rose-900 border-rose-500 dark:bg-rose-950/80 dark:text-rose-200'
                              : 'bg-sky-50 text-sky-900 border-sky-400 dark:bg-sky-950/80 dark:text-sky-200'
                            : isBlankActive
                            ? 'border-dashed border-2 border-sky-500 bg-sky-50/50 dark:bg-sky-950/30'
                            : 'border-dashed border-2 border-slate-300 dark:border-slate-600 hover:border-sky-400'
                        }`}
                      >
                        {currentWord ? (
                          <div className="w-full flex items-center justify-between gap-1.5">
                            <span>{currentWord}</span>
                            {!isAct9Submitted && (
                              <button
                                type="button"
                                onClick={(e) => handleClearBlank(blank.id, e)}
                                className="text-xs text-slate-400 hover:text-rose-500 ml-1 cursor-pointer"
                              >
                                ×
                              </button>
                            )}
                          </div>
                        ) : (
                          <span className="text-xs text-slate-400 dark:text-slate-500 italic">
                            [{bIdx + 1}]
                          </span>
                        )}
                      </div>

                      <span>{blank.suffixText}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Word Bank Chips */}
            <div
              className={`p-4 rounded-2xl border shadow-xs flex flex-col gap-2.5 ${
                isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider font-mono text-slate-500 dark:text-slate-400">
                  Banco de Palabras
                </span>
                <span className="text-[11px] text-slate-400">Toca para ubicar en el espacio</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {wordBank.map((word, wIdx) => {
                  const isUsed = Object.values(blankAnswers).includes(word);

                  return (
                    <button
                      key={wIdx}
                      type="button"
                      disabled={isAct9Submitted || isUsed}
                      onClick={() => handleSelectWordForActiveBlank(word)}
                      className={`px-3.5 py-1.5 rounded-xl border text-sm font-semibold transition-all cursor-pointer ${
                        isUsed
                          ? 'opacity-40 border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                          : isDark
                          ? 'bg-slate-800 hover:bg-sky-600 text-white border-slate-700 hover:border-sky-500'
                          : 'bg-slate-100 hover:bg-sky-500 hover:text-white text-slate-800 border-slate-200'
                      }`}
                    >
                      {word}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between gap-3">
              {isAct9Submitted ? (
                <button
                  type="button"
                  onClick={handleResetAct9}
                  className={`px-4 py-2 rounded-xl border text-xs sm:text-sm font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                    isDark
                      ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
                  }`}
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reintentar</span>
                </button>
              ) : (
                <div />
              )}

              {!isAct9Submitted ? (
                <button
                  type="button"
                  disabled={!allBlanksFilled}
                  onClick={handleCheckAct9}
                  className={`px-6 py-2.5 rounded-xl font-bold text-sm shadow-md transition-all cursor-pointer ${
                    allBlanksFilled
                      ? 'bg-sky-600 hover:bg-sky-700 text-white active:scale-95'
                      : 'bg-slate-300 dark:bg-slate-800 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  Comprobar
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => goToSlide(9)}
                  className="px-6 py-2.5 rounded-xl font-bold text-sm bg-indigo-600 hover:bg-indigo-700 text-white shadow-md transition-all cursor-pointer active:scale-95 flex items-center gap-2"
                >
                  <span>Ir al Test (Actividad 10)</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Explanation box */}
            {isAct9Submitted && (
              <div
                className={`p-4 rounded-2xl border animate-in fade-in duration-200 flex flex-col gap-2 ${
                  blanks.every((b) => blankAnswers[b.id] === b.correctWord)
                    ? isDark
                      ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                      : 'bg-emerald-50 border-emerald-200 text-emerald-950'
                    : isDark
                    ? 'bg-rose-950/40 border-rose-500/40 text-rose-200'
                    : 'bg-rose-50 border-rose-200 text-rose-950'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-sm">
                  {blanks.every((b) => blankAnswers[b.id] === b.correctWord) ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <XCircle className="w-4 h-4 text-rose-500" />
                  )}
                  <span>
                    {blanks.every((b) => blankAnswers[b.id] === b.correctWord)
                      ? '¡Excelente trabajo! Todas las palabras son correctas.'
                      : 'Revisa las palabras marcadas en rojo.'}
                  </span>
                </div>
                <p className="text-xs sm:text-sm leading-relaxed">{act.explanationEn}</p>
                <p className="text-xs sm:text-sm leading-relaxed italic text-slate-600 dark:text-slate-300">
                  {act.explanationEs}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Render Activity 10: Unit Test (5 sub-tests: Test 1, Test 2, Test 3, Test 4, Test 5)
  const renderActivity10Test = () => {
    const questions = MUSEUM_UNIT_TEST_QUESTIONS;
    const currentQ = questions[activeTestSubIndex];
    const selectedOptId = testSelectedOptions[currentQ.id];
    const isSubmitted = Boolean(testSubmittedQuestions[currentQ.id]);
    const isCorrect = selectedOptId === currentQ.correctAnswerId;

    const totalAnswered = questions.filter((q) => testSubmittedQuestions[q.id]).length;
    const totalCorrect = questions.filter(
      (q) => testSubmittedQuestions[q.id] && testSelectedOptions[q.id] === q.correctAnswerId
    ).length;

    const handleSelectTestOption = (optId: string) => {
      if (isSubmitted) return;
      playFeedbackSound('click');
      setTestSelectedOptions((prev) => ({ ...prev, [currentQ.id]: optId }));
    };

    const handleCheckTestQuestion = () => {
      if (!selectedOptId) return;
      setTestSubmittedQuestions((prev) => ({ ...prev, [currentQ.id]: true }));
      if (selectedOptId === currentQ.correctAnswerId) {
        playFeedbackSound('correct');
      } else {
        playFeedbackSound('wrong');
      }

      // If this was the last question and all answered
      if (activeTestSubIndex === questions.length - 1) {
        setIsTestFinished(true);
        if (onSuccess) onSuccess();
      }
    };

    const handleResetEntireTest = () => {
      setTestSelectedOptions({});
      setTestSubmittedQuestions({});
      setActiveTestSubIndex(0);
      setIsTestFinished(false);
      setTestFlippedOptions([]);
      setIsTestStarted(false);
    };

    // VISTA 1: TARJETA INICIAL CON BOTÓN 'Start Test' (Antes de iniciar)
    if (!isTestStarted) {
      return (
        <div className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center py-4">
          <div className="w-full perspective-1000">
            <div
              id="start-museum-test-card"
              onClick={() => {
                playFeedbackSound('flip');
                setIsStartCardFlipped((prev) => !prev);
              }}
              className={`relative w-full min-h-[380px] sm:min-h-[420px] rounded-3xl transition-transform duration-700 transform-style-3d cursor-pointer shadow-xl select-none ${
                isStartCardFlipped ? 'rotate-y-180' : ''
              }`}
            >
              {/* FRENTE / FRONT: ENGLISH */}
              <div
                className={`absolute inset-0 w-full h-full rounded-3xl p-6 sm:p-8 flex flex-col justify-between border backface-hidden shadow-xl transition-colors duration-200 overflow-hidden ${
                  isDark
                    ? 'bg-slate-900 border-indigo-500/30 text-white'
                    : 'bg-white border-indigo-200 text-slate-900 shadow-md'
                }`}
              >
                {/* Header */}
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
                      Unit Test · {questions.length} Tests
                    </span>
                  </div>

                  {/* Speaker pronunciation icon button (Speaker icon only, no text) */}
                  <button
                    type="button"
                    onClick={(e) =>
                      handlePlayText(
                        'Directions to the Museum Mastery Test. Test your comprehension of asking for and giving directions. Answer all 5 tests.',
                        999,
                        e
                      )
                    }
                    className={`p-2 rounded-xl border transition-all cursor-pointer ${
                      playingSentenceIdx === 999
                        ? 'bg-indigo-600 text-white border-indigo-500 ring-2 ring-indigo-400'
                        : isDark
                        ? 'bg-slate-800/80 hover:bg-slate-700 text-indigo-300 border-white/10'
                        : 'bg-white hover:bg-indigo-50 text-indigo-700 border-slate-200 shadow-xs'
                    }`}
                    aria-label="Audio"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Body */}
                <div className="flex-1 my-4 flex flex-col justify-center items-center text-center px-2">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-indigo-600/10 dark:bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-4 shadow-inner">
                    <Award className="w-8 h-8 sm:w-9 sm:h-9" />
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight mb-2">
                    Directions to the Museum · Mastery Test
                  </h3>

                  <p className="text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300 max-w-lg mb-4">
                    Test your comprehension of asking for and giving directions to the art museum. This test contains {questions.length} sequential assessments: Test 1 to Test 5.
                  </p>

                  <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" /> {questions.length} Tests
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1.5">
                      <Play className="w-4 h-4 text-indigo-500" /> Authentic Video Dialogue
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-500" /> Instant Feedback
                    </span>
                  </div>
                </div>

                {/* Footer with "Start Test" button */}
                <div className="pt-4 border-t border-inherit/30 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
                  <span className="text-xs text-slate-400 dark:text-slate-500">
                    Press Start Test to begin Test 1
                  </span>

                  <button
                    type="button"
                    id="start-test-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      playFeedbackSound('click');
                      setIsTestStarted(true);
                    }}
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
                {/* Header Back */}
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
                      Evaluación de la Unidad · {questions.length} Tests
                    </span>
                  </div>

                  {/* Speaker pronunciation icon button (Speaker icon only, no text) */}
                  <button
                    type="button"
                    onClick={(e) =>
                      handlePlayText(
                        'Directions to the Museum Mastery Test. Test your comprehension of asking for and giving directions. Answer all 5 tests.',
                        999,
                        e
                      )
                    }
                    className={`p-2 rounded-xl border transition-all cursor-pointer ${
                      playingSentenceIdx === 999
                        ? 'bg-emerald-600 text-white border-emerald-500 ring-2 ring-emerald-400'
                        : isDark
                        ? 'bg-slate-800/80 hover:bg-slate-700 text-emerald-300 border-white/10'
                        : 'bg-white hover:bg-emerald-50 text-emerald-700 border-slate-200 shadow-xs'
                    }`}
                    aria-label="Audio"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Body Back */}
                <div className="flex-1 my-4 flex flex-col justify-center items-center text-center px-2">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-emerald-600/10 dark:bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-4 shadow-inner">
                    <Award className="w-8 h-8 sm:w-9 sm:h-9" />
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight mb-2">
                    Indicaciones para llegar al Museo · Test de Dominio
                  </h3>

                  <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-emerald-100/90 max-w-lg mb-4">
                    Evalúa tu comprensión para pedir y dar indicaciones para llegar al museo de arte. Esta evaluación contiene {questions.length} pruebas secuenciales: Test 1 a Test 5.
                  </p>

                  <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" /> {questions.length} Tests
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1.5">
                      <Play className="w-4 h-4 text-emerald-500" /> Diálogo en Video Auténtico
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-500" /> Retroalimentación Inmediata
                    </span>
                  </div>
                </div>

                {/* Footer Back with "Iniciar Test" button */}
                <div className="pt-4 border-t border-inherit/30 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
                  <span className="text-xs text-slate-400 dark:text-slate-500">
                    Presiona Iniciar Test para comenzar el Test 1
                  </span>

                  <button
                    type="button"
                    id="start-test-btn-back"
                    onClick={(e) => {
                      e.stopPropagation();
                      playFeedbackSound('click');
                      setIsTestStarted(true);
                    }}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base shadow-lg shadow-emerald-600/30 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Play className="w-5 h-5 fill-current" />
                    <span>Iniciar Test</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="w-full flex flex-col gap-5">
        {/* Test Sub-navigation Bar */}
        <div
          className={`p-3.5 sm:p-4 rounded-2xl border flex flex-wrap items-center justify-between gap-3 ${
            isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              Test {activeTestSubIndex + 1} of {questions.length}
            </span>
            <span className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
              Actividad 10: Test de Evaluación
            </span>
          </div>

          {/* Test Tabs: 1, 2, 3, 4, 5 */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {questions.map((q, idx) => {
              const isQAnswered = testSubmittedQuestions[q.id];
              const isQCorrect = isQAnswered && testSelectedOptions[q.id] === q.correctAnswerId;
              const isActive = activeTestSubIndex === idx;

              return (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => {
                    stopSpeaking();
                    playFeedbackSound('click');
                    setActiveTestSubIndex(idx);
                  }}
                  className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-center border ${
                    isActive
                      ? 'bg-indigo-600 text-white border-indigo-500 shadow-md scale-105 ring-2 ring-indigo-400'
                      : isQCorrect
                      ? 'bg-emerald-600/20 text-emerald-500 border-emerald-500/40 hover:bg-emerald-600/30'
                      : isQAnswered
                      ? 'bg-rose-600/20 text-rose-500 border-rose-500/40 hover:bg-rose-600/30'
                      : isDark
                      ? 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                      : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                  }`}
                  aria-label={`Test ${idx + 1}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </div>

        {/* Top Reversible Instruction Card: "Choose the correct answer." */}
        <div className="w-full perspective-1000">
          <div
            onClick={() => {
              playFeedbackSound('flip');
              setIsInstructionFlipped(!isInstructionFlipped);
            }}
            className={`relative w-full min-h-[58px] rounded-2xl cursor-pointer select-none transition-transform duration-500 transform-style-3d border shadow-xs ${
              isInstructionFlipped ? 'rotate-y-180' : ''
            } ${
              isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <div className="absolute inset-0 px-5 py-3 flex items-center justify-between backface-hidden">
              <span className="font-semibold text-sm sm:text-base">{currentQ.instructions}</span>
              <button
                type="button"
                onClick={(e) => handlePlayText(currentQ.instructions, -40, e)}
                className={`p-1.5 rounded-lg border transition-all shrink-0 ${
                  isDark
                    ? 'bg-slate-800 hover:bg-slate-700 text-sky-300 border-slate-700'
                    : 'bg-sky-50 hover:bg-sky-100 text-sky-600 border-sky-200'
                }`}
                aria-label="Audio"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
            <div className="absolute inset-0 px-5 py-3 flex items-center justify-between backface-hidden rotate-y-180">
              <span className="font-semibold text-sm sm:text-base italic text-slate-700 dark:text-slate-200">
                {currentQ.instructionsEs}
              </span>
              <button
                type="button"
                onClick={(e) => handlePlayText(currentQ.instructions, -40, e)}
                className={`p-1.5 rounded-lg border transition-all shrink-0 ${
                  isDark
                    ? 'bg-slate-800 hover:bg-slate-700 text-sky-300 border-slate-700'
                    : 'bg-sky-50 hover:bg-sky-100 text-sky-600 border-sky-200'
                }`}
                aria-label="Audio"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Grid: Left Column Video & Right Column Test Question */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column Video Player */}
          <div className="lg:col-span-6 w-full">
            <MuseumVideoPlayer
              highlightedTurnIds={[]}
              showTranscriptByDefault={false}
              accent={accent}
              speechRate={currentRate}
            />
          </div>

          {/* Right Column: Question + Radio Options */}
          <div className="lg:col-span-6 w-full flex flex-col gap-4">
            {/* Reversible Question Card */}
            <div className="w-full perspective-1000">
              <div
                onClick={() => {
                  playFeedbackSound('flip');
                  setIsTestQuestionFlipped(!isTestQuestionFlipped);
                }}
                className={`relative w-full min-h-[64px] rounded-2xl cursor-pointer select-none transition-transform duration-500 transform-style-3d border shadow-xs ${
                  isTestQuestionFlipped ? 'rotate-y-180' : ''
                } ${
                  isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
                }`}
              >
                <div className="absolute inset-0 px-5 py-3.5 flex items-center justify-between backface-hidden">
                  <h3 className="font-bold text-base sm:text-lg">{currentQ.question}</h3>
                  <button
                    type="button"
                    onClick={(e) => handlePlayText(currentQ.question, -41, e)}
                    className={`p-1.5 rounded-lg border transition-all shrink-0 ${
                      isDark
                        ? 'bg-slate-800 hover:bg-slate-700 text-sky-300 border-slate-700'
                        : 'bg-sky-50 hover:bg-sky-100 text-sky-600 border-sky-200'
                    }`}
                    aria-label="Audio"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="absolute inset-0 px-5 py-3.5 flex items-center justify-between backface-hidden rotate-y-180">
                  <h3 className="font-bold text-base sm:text-lg italic text-slate-700 dark:text-slate-200">
                    {currentQ.questionEs}
                  </h3>
                  <button
                    type="button"
                    onClick={(e) => handlePlayText(currentQ.question, -41, e)}
                    className={`p-1.5 rounded-lg border transition-all shrink-0 ${
                      isDark
                        ? 'bg-slate-800 hover:bg-slate-700 text-sky-300 border-slate-700'
                        : 'bg-sky-50 hover:bg-sky-100 text-sky-600 border-sky-200'
                    }`}
                    aria-label="Audio"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Test Radio Options (each reversible) */}
            <div className="flex flex-col gap-3">
              {currentQ.options.map((opt) => {
                const isSelected = selectedOptId === opt.id;
                const isFlipped = testFlippedOptions.includes(opt.id);
                const isOptionCorrect = opt.id === currentQ.correctAnswerId;

                let cardStyle = isDark
                  ? 'bg-slate-900 border-slate-700 text-white hover:border-slate-500'
                  : 'bg-white border-slate-200 text-slate-900 hover:border-slate-400';

                if (isSubmitted) {
                  if (isOptionCorrect) {
                    cardStyle = isDark
                      ? 'bg-emerald-950/50 border-emerald-500 text-emerald-200 ring-2 ring-emerald-500'
                      : 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-2 ring-emerald-400';
                  } else if (isSelected && !isOptionCorrect) {
                    cardStyle = isDark
                      ? 'bg-rose-950/50 border-rose-500 text-rose-200 ring-2 ring-rose-500'
                      : 'bg-rose-50 border-rose-500 text-rose-950 ring-2 ring-rose-400';
                  }
                } else if (isSelected) {
                  cardStyle = isDark
                    ? 'bg-sky-950/50 border-sky-500 text-white ring-2 ring-sky-500'
                    : 'bg-sky-50 border-sky-500 text-slate-900 ring-2 ring-sky-400';
                }

                return (
                  <div key={opt.id} className="w-full perspective-1000">
                    <div
                      onClick={(e) => toggleTestOptionFlip(opt.id, e)}
                      className={`relative w-full min-h-[58px] rounded-2xl cursor-pointer select-none transition-transform duration-500 transform-style-3d border shadow-xs ${
                        isFlipped ? 'rotate-y-180' : ''
                      } ${cardStyle}`}
                    >
                      <div className="absolute inset-0 px-4 py-3 flex items-center justify-between backface-hidden">
                        <div
                          className="flex items-center gap-3 flex-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelectTestOption(opt.id);
                          }}
                        >
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                              isSelected
                                ? isSubmitted
                                  ? isOptionCorrect
                                    ? 'border-emerald-500 bg-emerald-500'
                                    : 'border-rose-500 bg-rose-500'
                                  : 'border-sky-500 bg-sky-500'
                                : 'border-slate-400 dark:border-slate-500'
                            }`}
                          >
                            {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                          </div>

                          <span className="text-sm sm:text-base font-medium">{opt.text}</span>
                        </div>

                        <button
                          type="button"
                          onClick={(e) => handlePlayText(opt.text, -50, e)}
                          className={`p-1.5 rounded-lg border transition-all shrink-0 ml-2 ${
                            isDark
                              ? 'bg-slate-800 hover:bg-slate-700 text-sky-300 border-slate-700'
                              : 'bg-sky-50 hover:bg-sky-100 text-sky-600 border-sky-200'
                          }`}
                          aria-label="Audio"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="absolute inset-0 px-4 py-3 flex items-center justify-between backface-hidden rotate-y-180">
                        <span className="text-sm sm:text-base font-medium italic text-slate-700 dark:text-slate-200">
                          {opt.textEs}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Actions */}
            <div className="mt-2 flex items-center justify-between gap-3">
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {totalAnswered} de {questions.length} respondidas ({totalCorrect} correctas)
              </span>

              {!isSubmitted ? (
                <button
                  type="button"
                  disabled={!selectedOptId}
                  onClick={handleCheckTestQuestion}
                  className={`px-6 py-2.5 rounded-xl font-bold text-sm shadow-md transition-all cursor-pointer ${
                    selectedOptId
                      ? 'bg-sky-600 hover:bg-sky-700 text-white active:scale-95'
                      : 'bg-slate-300 dark:bg-slate-800 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  Comprobar
                </button>
              ) : activeTestSubIndex < questions.length - 1 ? (
                <button
                  type="button"
                  onClick={() => {
                    stopSpeaking();
                    playFeedbackSound('click');
                    setActiveTestSubIndex(activeTestSubIndex + 1);
                  }}
                  className="px-6 py-2.5 rounded-xl font-bold text-sm bg-indigo-600 hover:bg-indigo-700 text-white shadow-md transition-all cursor-pointer active:scale-95 flex items-center gap-2"
                >
                  <span>Siguiente Test ({activeTestSubIndex + 2})</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleResetEntireTest}
                  className="px-6 py-2.5 rounded-xl font-bold text-sm bg-emerald-600 hover:bg-emerald-700 text-white shadow-md transition-all cursor-pointer active:scale-95 flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Repetir Test</span>
                </button>
              )}
            </div>

            {/* Explanation box after submit */}
            {isSubmitted && (
              <div
                className={`p-4 rounded-2xl border animate-in fade-in duration-200 flex flex-col gap-2 ${
                  isCorrect
                    ? isDark
                      ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                      : 'bg-emerald-50 border-emerald-200 text-emerald-950'
                    : isDark
                    ? 'bg-rose-950/40 border-rose-500/40 text-rose-200'
                    : 'bg-rose-50 border-rose-200 text-rose-950'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-sm">
                  {isCorrect ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <XCircle className="w-4 h-4 text-rose-500" />
                  )}
                  <span>{isCorrect ? '¡Correcto!' : 'Respuesta Incorrecta'}</span>
                </div>
                <p className="text-xs sm:text-sm leading-relaxed">{currentQ.explanation}</p>
                <p className="text-xs sm:text-sm leading-relaxed italic text-slate-600 dark:text-slate-300">
                  {currentQ.explanationEs}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="relative w-full flex flex-col items-center">
      {/* Floating Previous Activity Button (<) */}
      <button
        onClick={() => goToSlide(currentActivityIdx - 1)}
        disabled={currentActivityIdx === 0}
        className={`fixed sm:absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 z-40 w-11 h-11 sm:w-13 sm:h-13 rounded-full flex items-center justify-center border shadow-2xl transition-all cursor-pointer select-none ${
          currentActivityIdx === 0
            ? 'opacity-0 pointer-events-none scale-75'
            : isDark
            ? 'bg-[#1E293B]/95 hover:bg-sky-600 text-white border-white/20 hover:border-sky-400 shadow-sky-950/70 hover:scale-110 active:scale-95'
            : 'bg-white/95 hover:bg-sky-600 text-slate-800 hover:text-white border-slate-300 hover:border-sky-600 shadow-slate-400/60 hover:scale-110 active:scale-95'
        }`}
        aria-label="Actividad anterior"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Floating Next Activity Button (>) */}
      <button
        onClick={() => goToSlide(currentActivityIdx + 1)}
        disabled={currentActivityIdx >= 9}
        className={`fixed sm:absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 z-40 w-11 h-11 sm:w-13 sm:h-13 rounded-full flex items-center justify-center border shadow-2xl transition-all cursor-pointer select-none ${
          currentActivityIdx >= 9
            ? 'opacity-0 pointer-events-none scale-75'
            : isDark
            ? 'bg-[#1E293B]/95 hover:bg-sky-600 text-white border-white/20 hover:border-sky-400 shadow-sky-950/70 hover:scale-110 active:scale-95'
            : 'bg-white/95 hover:bg-sky-600 text-slate-800 hover:text-white border-slate-300 hover:border-sky-600 shadow-slate-400/60 hover:scale-110 active:scale-95'
        }`}
        aria-label="Siguiente actividad"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Main Container */}
      <div className="w-full px-2 sm:px-6 md:px-8 flex flex-col">
        {/* Top Header Bar with Activity Navigation Pills & Speed Dial */}
        <div
          className={`w-full p-3 sm:p-4 rounded-2xl border mb-6 flex flex-wrap items-center justify-between gap-3 ${
            isDark ? 'bg-slate-900/90 border-slate-700' : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          {/* Activity Pills Bar: Actividad 1 to 9 + Actividad 10: Test */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {Array.from({ length: 10 }).map((_, idx) => {
              const isActive = currentActivityIdx === idx;
              const isTest = idx === 9;
              const label = isTest ? 'Actividad 10: Test' : `Actividad ${idx + 1}`;

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => goToSlide(idx)}
                  className={`px-3 py-1.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-1.5 border ${
                    isActive
                      ? 'bg-sky-600 text-white border-sky-500 shadow-md ring-2 ring-sky-400 scale-105'
                      : isDark
                      ? 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                      : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                  }`}
                >
                  {isTest && <Award className="w-3.5 h-3.5" />}
                  <span>{label}</span>
                </button>
              );
            })}
          </div>

          {/* Speed Selector Dial (0.5x to 1.30x as required) */}
          <div className="relative" ref={rateMenuRef}>
            <button
              type="button"
              onClick={() => setIsRateMenuOpen((prev) => !prev)}
              className={`px-3 py-1.5 rounded-xl border text-xs sm:text-sm font-mono font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                isRateMenuOpen
                  ? 'bg-sky-600 text-white border-sky-500'
                  : isDark
                  ? 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                  : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
              }`}
              aria-label="Playback speed"
            >
              <Gauge className="w-4 h-4" />
              <span>{currentRate}x</span>
            </button>

            {isRateMenuOpen && (
              <div
                className={`absolute right-0 mt-2 w-32 rounded-xl shadow-xl border z-50 py-1.5 animate-in fade-in zoom-in-95 duration-150 ${
                  isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
                }`}
              >
                {SPEED_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      setCurrentRate(opt.value);
                      setIsRateMenuOpen(false);
                    }}
                    className={`w-full px-3 py-1.5 text-xs text-left font-mono font-medium flex items-center justify-between transition-colors cursor-pointer ${
                      Math.abs(currentRate - opt.value) < 0.01
                        ? 'bg-sky-500 text-white font-bold'
                        : isDark
                        ? 'hover:bg-slate-800 text-slate-300'
                        : 'hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <span>{opt.label}</span>
                    {Math.abs(currentRate - opt.value) < 0.01 && <Check className="w-3.5 h-3.5" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Dynamic Activity Content */}
        <div className="w-full">
          {currentActivityIdx === 0 && renderActivity1()}
          {currentActivityIdx >= 1 &&
            currentActivityIdx <= 7 &&
            currentActivityData &&
            renderRadioChoiceActivity(currentActivityData)}
          {currentActivityIdx === 8 &&
            currentActivityData &&
            renderActivity9(currentActivityData)}
          {currentActivityIdx === 9 && renderActivity10Test()}
        </div>
      </div>
    </div>
  );
};
