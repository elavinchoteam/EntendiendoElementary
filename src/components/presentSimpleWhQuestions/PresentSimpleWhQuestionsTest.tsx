import React, { useState } from 'react';
import {
  Volume2,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Award,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import {
  PRESENT_SIMPLE_WH_TESTS,
  PresentSimpleWhQuestionsTestItem,
  shoppingWomenImg,
} from '../../data/presentSimpleWhQuestionsData';
import { useTheme } from '../../context/ThemeContext';
import { playFeedbackSound, speakEnglish, stopSpeaking } from '../../utils/audio';
import { PresentSimpleWhQuestionsCard } from './PresentSimpleWhQuestionsCard';

export interface PresentSimpleWhQuestionsTestProps {
  speechRate: number;
  accent: 'US' | 'UK';
  onSuccess?: () => void;
}

export const PresentSimpleWhQuestionsTest: React.FC<PresentSimpleWhQuestionsTestProps> = ({
  speechRate,
  accent,
  onSuccess,
}) => {
  const { isDark } = useTheme();

  const [activeTestSubIndex, setActiveTestSubIndex] = useState<number>(0);
  const tests: PresentSimpleWhQuestionsTestItem[] = PRESENT_SIMPLE_WH_TESTS;
  const currentTest: PresentSimpleWhQuestionsTestItem = tests[activeTestSubIndex];

  // Store selected words for each test: { [testId]: (string | null)[] }
  const [userSelections, setUserSelections] = useState<{ [testId: number]: (string | null)[] }>({
    1: Array(tests[0].blankTargetWords.length).fill(null),
    2: Array(tests[1].blankTargetWords.length).fill(null),
    3: Array(tests[2].blankTargetWords.length).fill(null),
    4: Array(tests[3].blankTargetWords.length).fill(null),
    5: Array(tests[4].blankTargetWords.length).fill(null),
  });

  // Track submission state for each test
  const [submittedMap, setSubmittedMap] = useState<{ [testId: number]: boolean }>({});
  const [isCorrectMap, setIsCorrectMap] = useState<{ [testId: number]: boolean }>({});
  const [isPromptFlipped, setIsPromptFlipped] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isTestCompleted, setIsTestCompleted] = useState(false);

  const currentSlots = userSelections[currentTest.id] || Array(currentTest.blankTargetWords.length).fill(null);
  const isCurrentSubmitted = !!submittedMap[currentTest.id];
  const isCurrentCorrect = !!isCorrectMap[currentTest.id];

  const totalAnswered = Object.keys(submittedMap).length;
  const totalCorrect = Object.values(isCorrectMap).filter(Boolean).length;

  const handleSelectOption = (word: string) => {
    if (isCurrentSubmitted && isCurrentCorrect) return;

    const slots = [...currentSlots];
    const emptyIndex = slots.findIndex((w) => w === null);
    if (emptyIndex !== -1) {
      playFeedbackSound('click');
      slots[emptyIndex] = word;
      setUserSelections((prev) => ({ ...prev, [currentTest.id]: slots }));
      setSubmittedMap((prev) => ({ ...prev, [currentTest.id]: false }));
    }
  };

  const handleRemoveSlotWord = (slotIdx: number) => {
    if (isCurrentSubmitted && isCurrentCorrect) return;
    playFeedbackSound('click');
    const slots = [...currentSlots];
    slots[slotIdx] = null;
    setUserSelections((prev) => ({ ...prev, [currentTest.id]: slots }));
    setSubmittedMap((prev) => ({ ...prev, [currentTest.id]: false }));
  };

  const handleCheckAnswer = () => {
    if (currentSlots.some((w) => !w)) return;

    const correct = currentSlots.every(
      (w, idx) =>
        w?.trim().toLowerCase() === currentTest.correctAnswer[idx]?.trim().toLowerCase()
    );

    setSubmittedMap((prev) => ({ ...prev, [currentTest.id]: true }));
    setIsCorrectMap((prev) => ({ ...prev, [currentTest.id]: correct }));

    if (correct) {
      playFeedbackSound('correct');
    } else {
      playFeedbackSound('wrong');
    }

    // Check if all 5 tests are submitted and correct
    const newCorrectMap = { ...isCorrectMap, [currentTest.id]: correct };
    const newSubmittedMap = { ...submittedMap, [currentTest.id]: true };
    if (
      Object.keys(newSubmittedMap).length === tests.length &&
      tests.every((t) => newCorrectMap[t.id])
    ) {
      setIsTestCompleted(true);
      if (onSuccess) onSuccess();
    }
  };

  const handleResetCurrent = () => {
    setUserSelections((prev) => ({
      ...prev,
      [currentTest.id]: Array(currentTest.blankTargetWords.length).fill(null),
    }));
    setSubmittedMap((prev) => ({ ...prev, [currentTest.id]: false }));
    setIsCorrectMap((prev) => ({ ...prev, [currentTest.id]: false }));
  };

  const handleNextSubTest = () => {
    if (activeTestSubIndex < tests.length - 1) {
      playFeedbackSound('click');
      setActiveTestSubIndex((prev) => prev + 1);
      setIsPromptFlipped(false);
      stopSpeaking();
    } else {
      setIsTestCompleted(true);
      if (onSuccess) onSuccess();
    }
  };

  const handlePlayPromptAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    stopSpeaking();
    setIsAudioPlaying(true);
    speakEnglish(
      currentTest.fullSentenceEn,
      speechRate,
      accent === 'UK' ? 'UK' : 'US',
      undefined,
      () => setIsAudioPlaying(false)
    );
  };

  const handleRestartFullTest = () => {
    setUserSelections({
      1: Array(tests[0].blankTargetWords.length).fill(null),
      2: Array(tests[1].blankTargetWords.length).fill(null),
      3: Array(tests[2].blankTargetWords.length).fill(null),
      4: Array(tests[3].blankTargetWords.length).fill(null),
      5: Array(tests[4].blankTargetWords.length).fill(null),
    });
    setSubmittedMap({});
    setIsCorrectMap({});
    setActiveTestSubIndex(0);
    setIsTestCompleted(false);
    setIsPromptFlipped(false);
    stopSpeaking();
  };

  // Completed Test Summary View
  if (isTestCompleted) {
    return (
      <div
        className={`p-8 rounded-2xl border text-center flex flex-col items-center gap-6 animate-in zoom-in-95 duration-300 ${
          isDark ? 'bg-slate-800/90 border-slate-700' : 'bg-white border-slate-200 shadow-md'
        }`}
      >
        <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
          <Award className="w-10 h-10" />
        </div>

        <div>
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
            ¡Evaluación Final Completada!
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold mt-2 text-slate-900 dark:text-white">
            Puntuación: {totalCorrect} / {tests.length}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mt-2 max-w-md mx-auto">
            {totalCorrect === 5
              ? '¡Excelente! Has dominado la formación de preguntas con Wh- en Presente Simple.'
              : 'Buen trabajo. Puedes reiniciar el test para obtener una puntuación perfecta.'}
          </p>
        </div>

        <div className="flex gap-4">
          <button
            type="button"
            onClick={handleRestartFullTest}
            className="px-6 py-3 rounded-xl border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2 transition"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reiniciar Test</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Top Test Navigation Header */}
      <div
        className={`p-4 rounded-xl border ${
          isDark ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-200'
        }`}
      >
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 text-xs font-bold uppercase tracking-wider rounded-md bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300">
              Actividad 12 · Test
            </span>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              {currentTest.instruction}
            </h2>
          </div>

          {/* Sub-test tabs: Test 1, Test 2, Test 3, Test 4, Test 5 */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {tests.map((t, idx) => {
              const isDone = submittedMap[t.id];
              const isTCorrect = isCorrectMap[t.id];
              const isCurrent = activeTestSubIndex === idx;

              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => {
                    playFeedbackSound('click');
                    setActiveTestSubIndex(idx);
                    setIsPromptFlipped(false);
                    stopSpeaking();
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                    isCurrent
                      ? 'bg-blue-600 text-white shadow-xs'
                      : isDone
                      ? isTCorrect
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                        : 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300'
                      : isDark
                      ? 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <span>Test {t.testNumber}</span>
                  {isDone && (
                    isTCorrect ? (
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    ) : (
                      <XCircle className="w-3.5 h-3.5" />
                    )
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Reference Column */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div
            className={`rounded-xl border overflow-hidden ${
              isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'
            }`}
          >
            <div className="relative aspect-video w-full bg-slate-950 flex items-center justify-center overflow-hidden">
              <img
                src={shoppingWomenImg}
                alt="Context reference"
                className="w-full h-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30 pointer-events-none" />
              <div className="absolute bottom-2 left-3 right-3 z-10 pointer-events-none">
                <div className="bg-black/75 backdrop-blur-xs text-white px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium">
                  <p>- <span className="text-cyan-300 font-bold">Where</span> do you buy your clothes?</p>
                  <p>- <span className="text-cyan-300 font-bold">Why</span> do you want to know?</p>
                </div>
              </div>
            </div>
            <div className="p-3">
              <PresentSimpleWhQuestionsCard
                textEn="- Where do you buy your clothes? - Why do you want to know?"
                textEs="- ¿Dónde compras tu ropa? - ¿Por qué quieres saberlo?"
                highlightWords={["Where", "Why"]}
                speechRate={speechRate}
                accent={accent}
              />
            </div>
          </div>
        </div>

        {/* Right Test Question Column */}
        <div className="lg:col-span-7 flex flex-col gap-5">
          {/* Question Card (Reversible, strictly speaker button only) */}
          <div
            onClick={() => setIsPromptFlipped((prev) => !prev)}
            className={`cursor-pointer transition-all duration-200 p-5 rounded-2xl border ${
              isDark
                ? 'bg-slate-800 border-slate-700 text-slate-100 hover:border-slate-600'
                : 'bg-white border-slate-200 text-slate-800 hover:border-slate-300 shadow-xs'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 space-y-3">
                {!isPromptFlipped ? (
                  // Front side: English with interactive blanks
                  <div className="space-y-3 text-base sm:text-lg leading-relaxed font-medium">
                    {currentTest.promptLinesEn.map((line, lIdx) => {
                      if (line.includes('_____')) {
                        const parts = line.split('_____');
                        let slotCounter = 0;

                        return (
                          <div key={lIdx} className="flex flex-wrap items-center gap-2 py-1">
                            {parts.map((part, pIdx) => {
                              const isLast = pIdx === parts.length - 1;
                              const slotIdx = slotCounter;
                              if (!isLast) slotCounter++;

                              return (
                                <React.Fragment key={pIdx}>
                                  {part && <span>{part}</span>}
                                  {!isLast && (
                                    <span
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        if (currentSlots[slotIdx]) {
                                          handleRemoveSlotWord(slotIdx);
                                        }
                                      }}
                                      className={`inline-flex items-center justify-center min-w-[76px] px-3 py-1 text-base font-bold rounded-lg border-2 border-dashed transition-all ${
                                        currentSlots[slotIdx]
                                          ? isCurrentSubmitted
                                            ? currentSlots[slotIdx]?.trim().toLowerCase() ===
                                              currentTest.correctAnswer[slotIdx]?.trim().toLowerCase()
                                              ? 'bg-emerald-100 border-emerald-500 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                                              : 'bg-rose-100 border-rose-500 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300'
                                            : 'bg-blue-100 border-blue-500 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300'
                                          : isDark
                                          ? 'border-slate-600 bg-slate-700/50 text-slate-400'
                                          : 'border-slate-300 bg-slate-100 text-slate-400'
                                      }`}
                                    >
                                      {currentSlots[slotIdx] || '____'}
                                    </span>
                                  )}
                                </React.Fragment>
                              );
                            })}
                          </div>
                        );
                      }

                      return (
                        <p key={lIdx} className="text-slate-800 dark:text-slate-200">
                          {line}
                        </p>
                      );
                    })}
                  </div>
                ) : (
                  // Back side: Spanish Translation
                  <div
                    className={`space-y-2 text-base sm:text-lg leading-relaxed font-medium ${
                      isDark ? 'text-amber-300' : 'text-amber-800'
                    }`}
                  >
                    {currentTest.promptLinesEs.map((line, lIdx) => (
                      <p key={lIdx}>{line}</p>
                    ))}
                  </div>
                )}
              </div>

              {/* ONLY speaker icon button */}
              <button
                type="button"
                onClick={handlePlayPromptAudio}
                aria-label="Play audio"
                className={`shrink-0 p-2.5 rounded-full transition-all duration-150 ${
                  isAudioPlaying
                    ? 'bg-blue-600 text-white animate-pulse'
                    : isDark
                    ? 'bg-slate-700 hover:bg-slate-600 text-slate-200'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Word Bank Options */}
          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-slate-800/60 border-slate-700' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex flex-wrap gap-2.5 items-center">
              {currentTest.options.map((option, idx) => {
                const isUsed = currentSlots.some((w) => w === option);

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectOption(option)}
                    disabled={isCurrentSubmitted && isCurrentCorrect}
                    className={`px-4 py-2.5 rounded-xl font-semibold text-base transition-all select-none shadow-xs active:scale-95 ${
                      isUsed
                        ? isDark
                          ? 'bg-slate-700/60 text-slate-400 border border-slate-600 opacity-60 cursor-not-allowed'
                          : 'bg-slate-200 text-slate-400 border border-slate-300 opacity-60 cursor-not-allowed'
                        : isDark
                        ? 'bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-600 hover:border-blue-500'
                        : 'bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 hover:border-blue-500'
                    }`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Feedback Section */}
          {isCurrentSubmitted && (
            <div
              className={`p-4 rounded-xl border flex items-start gap-3 animate-in fade-in duration-200 ${
                isCurrentCorrect
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-900 dark:bg-emerald-950/40 dark:border-emerald-800 dark:text-emerald-200'
                  : 'bg-rose-50 border-rose-300 text-rose-900 dark:bg-rose-950/40 dark:border-rose-800 dark:text-rose-200'
              }`}
            >
              {isCurrentCorrect ? (
                <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-6 h-6 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
              )}
              <div className="flex-1 text-sm sm:text-base">
                <p className="font-bold">
                  {isCurrentCorrect ? '¡Respuesta correcta!' : 'Respuesta incorrecta'}
                </p>
                <p className="mt-1 leading-relaxed opacity-95">
                  {isCurrentCorrect ? currentTest.explanationEs : 'Verifica el orden o las palabras seleccionadas.'}
                </p>
              </div>
            </div>
          )}

          {/* Buttons: Reset / Check / Next */}
          <div className="flex items-center justify-between gap-3 pt-2">
            <button
              type="button"
              onClick={handleResetCurrent}
              className={`px-4 py-2.5 rounded-xl border text-sm font-semibold flex items-center gap-2 transition ${
                isDark
                  ? 'border-slate-700 hover:bg-slate-800 text-slate-300'
                  : 'border-slate-300 hover:bg-slate-100 text-slate-700'
              }`}
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reintentar</span>
            </button>

            <div className="flex items-center gap-3">
              {!isCurrentCorrect ? (
                <button
                  type="button"
                  onClick={handleCheckAnswer}
                  disabled={currentSlots.some((w) => !w)}
                  className={`px-6 py-2.5 rounded-xl font-semibold text-white shadow-sm transition-all active:scale-95 flex items-center gap-2 ${
                    currentSlots.some((w) => !w)
                      ? 'bg-slate-400 dark:bg-slate-700 cursor-not-allowed opacity-60'
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Comprobar</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNextSubTest}
                  className="px-6 py-2.5 rounded-xl font-semibold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md transition-all active:scale-95 flex items-center gap-2"
                >
                  <span>
                    {activeTestSubIndex < tests.length - 1
                      ? `Ir a Test ${activeTestSubIndex + 2}`
                      : 'Finalizar Test'}
                  </span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
