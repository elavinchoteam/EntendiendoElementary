import React, { useState } from 'react';
import {
  Check,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Volume2,
  RefreshCw,
  Sparkles,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { speakEnglish, stopSpeaking, playFeedbackSound } from '../../utils/audio';
import { TammyEmailCard } from './TammyEmailCard';
import {
  ACTIVITY_6_DIALOGUE,
  ACTIVITY_6_WORDS,
  ACTIVITY_6_WORDS_ES,
  ACTIVITY_6_CORRECT_ANSWERS,
  InterviewDialogueLine,
} from '../../data/grumblesDepartmentStoreData';

interface Activity6InterviewClozeProps {
  speed?: number;
  accent?: 'US' | 'UK';
}

export const Activity6InterviewCloze: React.FC<Activity6InterviewClozeProps> = ({
  speed = 1.0,
  accent = 'US',
}) => {
  const { isDark } = useTheme();

  // Instruction flip
  const [isHeaderFlipped, setIsHeaderFlipped] = useState(false);
  const instructionEn =
    "Tammy is being interviewed about her summer job for a young people's radio program. Fill in the gaps to complete the interview.";
  const instructionEs =
    'Están entrevistando a Tammy sobre su trabajo de verano para un programa de radio juvenil. Completa los espacios en blanco para terminar la entrevista.';

  // Placed words: gapIndex (0..6) -> word string
  const [gapPlacements, setGapPlacements] = useState<Record<number, string>>({});

  // Flipped state: words or lines
  const [flippedWords, setFlippedWords] = useState<Record<string, boolean>>({});
  const [flippedLines, setFlippedLines] = useState<Record<string, boolean>>({});

  // Drag state
  const [draggedWord, setDraggedWord] = useState<string | null>(null);

  // Active gap targeted by click
  const [activeGapIdx, setActiveGapIdx] = useState<number | null>(null);

  // Check state
  const [hasChecked, setHasChecked] = useState(false);
  const [isAllCorrect, setIsAllCorrect] = useState(false);

  // List of words already used in gaps
  const placedWords = Object.values(gapPlacements);
  const availableWords = ACTIVITY_6_WORDS.filter((w) => !placedWords.includes(w));

  const handleToggleWordFlip = (w: string, e: React.MouseEvent) => {
    e.stopPropagation();
    playFeedbackSound('click');
    setFlippedWords((prev) => ({
      ...prev,
      [w]: !prev[w],
    }));
  };

  const handleToggleLineFlip = (lineId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    playFeedbackSound('click');
    setFlippedLines((prev) => ({
      ...prev,
      [lineId]: !prev[lineId],
    }));
  };

  const handlePlayAudio = (textEn: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    stopSpeaking();
    playFeedbackSound('click');
    speakEnglish(textEn, speed, accent);
  };

  const handleDragStart = (e: React.DragEvent, word: string) => {
    setDraggedWord(word);
    e.dataTransfer.setData('text/plain', word);
  };

  const handleDropOnGap = (gapIdx: number) => {
    if (!draggedWord) return;
    playFeedbackSound('click');
    setGapPlacements((prev) => ({
      ...prev,
      [gapIdx]: draggedWord,
    }));
    setDraggedWord(null);
    setActiveGapIdx(null);
    setHasChecked(false);
  };

  const handleRemoveFromGap = (gapIdx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    playFeedbackSound('click');
    setGapPlacements((prev) => {
      const copy = { ...prev };
      delete copy[gapIdx];
      return copy;
    });
    setHasChecked(false);
  };

  const handleClickWordToPlace = (word: string) => {
    playFeedbackSound('click');
    // If a gap is selected, place it there
    if (activeGapIdx !== null) {
      setGapPlacements((prev) => ({
        ...prev,
        [activeGapIdx]: word,
      }));
      setActiveGapIdx(null);
      setHasChecked(false);
      return;
    }

    // Otherwise find the first empty gap
    for (let i = 0; i < 7; i++) {
      if (!gapPlacements[i]) {
        setGapPlacements((prev) => ({
          ...prev,
          [i]: word,
        }));
        setHasChecked(false);
        break;
      }
    }
  };

  const handleCheck = () => {
    playFeedbackSound('click');
    setHasChecked(true);

    const allCorrect = ACTIVITY_6_CORRECT_ANSWERS.every(
      (correctWord, idx) => gapPlacements[idx] === correctWord
    );

    setIsAllCorrect(allCorrect);
    if (allCorrect) {
      playFeedbackSound('correct');
    } else {
      playFeedbackSound('wrong');
    }
  };

  const handleReset = () => {
    playFeedbackSound('click');
    setGapPlacements({});
    setActiveGapIdx(null);
    setHasChecked(false);
    setIsAllCorrect(false);
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-4">
      {/* Reversible Instruction Header Card */}
      <div
        className={`p-3.5 sm:p-4 rounded-2xl border transition-all shadow-xs ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        }`}
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 text-[11px] font-bold rounded-md bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 uppercase tracking-wider font-mono">
                Actividad 6 · Fill in the gaps to complete the interview
              </span>
              <span className="text-xs text-slate-400 font-medium hidden sm:inline">
                {isHeaderFlipped ? 'Español' : 'English'}
              </span>
            </div>
            {!isHeaderFlipped ? (
              <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 leading-relaxed">
                {instructionEn}
              </p>
            ) : (
              <p className="text-xs sm:text-sm font-medium italic text-emerald-800 dark:text-emerald-300 leading-relaxed font-serif">
                {instructionEs}
              </p>
            )}
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => {
                playFeedbackSound('click');
                setIsHeaderFlipped((prev) => !prev);
              }}
              className={`w-8 h-8 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                isHeaderFlipped
                  ? 'bg-emerald-500 text-white border-emerald-600'
                  : isDark
                  ? 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
                  : 'bg-slate-100 border-slate-200 text-slate-700 hover:text-slate-900'
              }`}
              title="Voltear instrucción al español"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isHeaderFlipped ? 'rotate-180' : ''}`} />
            </button>
            <button
              type="button"
              onClick={(e) => handlePlayAudio(instructionEn, e)}
              className={`w-8 h-8 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                isDark
                  ? 'bg-slate-800 border-slate-700 text-sky-400 hover:text-white'
                  : 'bg-slate-100 border-slate-200 text-sky-600 hover:text-sky-800'
              }`}
              title="Escuchar instrucción"
            >
              <Volume2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main 2-column layout matching screenshot */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left: Email card */}
        <div className="lg:col-span-5">
          <TammyEmailCard speed={speed} accent={accent} />
        </div>

        {/* Right: Interview dialogue with gaps */}
        <div className="lg:col-span-7 space-y-4">
          <div
            className={`p-4 sm:p-5 rounded-2xl border ${
              isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}
          >
            <h3 className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 mb-3 pb-2 border-b border-slate-200 dark:border-slate-800">
              Entrevista Radial · Completa los espacios:
            </h3>

            {/* Dialogue list */}
            <div className="space-y-3.5">
              {ACTIVITY_6_DIALOGUE.map((line) => {
                const isLineFlipped = !!flippedLines[line.id];

                return (
                  <div
                    key={line.id}
                    className={`p-2.5 rounded-xl border text-xs sm:text-sm leading-relaxed transition-all ${
                      isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50/70 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="font-bold text-sky-600 dark:text-sky-400 text-xs font-mono">
                        {line.speaker}:
                      </span>

                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={(e) => handleToggleLineFlip(line.id, e)}
                          className="w-5 h-5 rounded flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer"
                          title="Traducir frase"
                        >
                          <RefreshCw className={`w-3 h-3 ${isLineFlipped ? 'rotate-180' : ''}`} />
                        </button>
                      </div>
                    </div>

                    {!isLineFlipped ? (
                      <div className="flex flex-wrap items-center gap-1.5 text-slate-800 dark:text-slate-200 font-medium">
                        {line.parts.map((part, pIdx) => {
                          if (part.text) {
                            return <span key={pIdx}>{part.text}</span>;
                          }

                          if (part.gapIndex !== undefined) {
                            const gapIdx = part.gapIndex;
                            const placed = gapPlacements[gapIdx];
                            const isCorrect = placed === ACTIVITY_6_CORRECT_ANSWERS[gapIdx];
                            const isSelected = activeGapIdx === gapIdx;

                            return (
                              <span
                                key={pIdx}
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={() => handleDropOnGap(gapIdx)}
                                onClick={() => setActiveGapIdx(gapIdx)}
                                className={`inline-flex items-center justify-center min-w-[130px] px-2.5 py-1 rounded-lg border-b-2 text-xs font-bold transition-all cursor-pointer ${
                                  hasChecked
                                    ? isCorrect
                                      ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-500'
                                      : 'bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border-rose-500'
                                    : placed
                                    ? 'bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border-sky-500 shadow-2xs'
                                    : isSelected
                                    ? 'bg-amber-100 dark:bg-amber-950/60 border-amber-500 text-amber-900 ring-2 ring-amber-400/50'
                                    : isDark
                                    ? 'border-slate-600 bg-slate-800/80 text-slate-400 hover:border-sky-400'
                                    : 'border-slate-400 bg-white text-slate-400 hover:border-sky-500 shadow-2xs'
                                }`}
                              >
                                {placed ? (
                                  <span className="flex items-center gap-1">
                                    <span>{placed}</span>
                                    {!hasChecked && (
                                      <button
                                        type="button"
                                        onClick={(e) => handleRemoveFromGap(gapIdx, e)}
                                        className="text-slate-400 hover:text-rose-500 text-[10px] ml-1 font-mono"
                                      >
                                        ✕
                                      </button>
                                    )}
                                  </span>
                                ) : (
                                  <span className="italic font-normal text-[11px] text-slate-400">
                                    [ arrastra aquí ]
                                  </span>
                                )}
                              </span>
                            );
                          }

                          return null;
                        })}
                      </div>
                    ) : (
                      <p className="text-xs sm:text-sm font-medium italic text-emerald-800 dark:text-emerald-300 font-serif">
                        {line.translationEs}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Word Chips Pool matching screenshot */}
            <div className="mt-5 pt-3 border-t border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                  Palabras disponibles ({availableWords.length}):
                </span>
                <span className="text-[10px] text-slate-400">
                  Arrastra o haz clic para colocar
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {availableWords.map((word) => {
                  const isWordFlipped = !!flippedWords[word];

                  return (
                    <div
                      key={word}
                      draggable
                      onDragStart={(e) => handleDragStart(e, word)}
                      onClick={() => handleClickWordToPlace(word)}
                      className={`px-3 py-1.5 rounded-xl border text-xs sm:text-sm font-semibold select-none cursor-grab active:cursor-grabbing transition-all flex items-center gap-2 shadow-xs ${
                        isDark
                          ? 'bg-slate-800 border-slate-700 hover:border-sky-500 text-slate-100 hover:bg-slate-700'
                          : 'bg-white border-slate-300 hover:border-sky-400 text-slate-800 hover:bg-slate-50'
                      }`}
                    >
                      {!isWordFlipped ? (
                        <span>{word}</span>
                      ) : (
                        <span className="italic text-emerald-700 dark:text-emerald-300 font-serif">
                          {ACTIVITY_6_WORDS_ES[word] || word}
                        </span>
                      )}

                      <button
                        type="button"
                        onClick={(e) => handleToggleWordFlip(word, e)}
                        className="w-4 h-4 rounded flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer"
                        title="Traducir palabra"
                      >
                        <RefreshCw className={`w-2.5 h-2.5 ${isWordFlipped ? 'rotate-180' : ''}`} />
                      </button>

                      <button
                        type="button"
                        onClick={(e) => handlePlayAudio(word, e)}
                        className="w-4 h-4 rounded flex items-center justify-center text-sky-500 hover:text-sky-700 cursor-pointer"
                        title="Escuchar"
                      >
                        <Volume2 className="w-2.5 h-2.5" />
                      </button>
                    </div>
                  );
                })}

                {availableWords.length === 0 && (
                  <div className="w-full p-2.5 text-center text-xs text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-950/30 rounded-xl border border-emerald-200 dark:border-emerald-800">
                    ¡Se colocaron todas las palabras! Presiona "Comprobar".
                  </div>
                )}
              </div>
            </div>

            {/* Check / Reset Buttons */}
            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleReset}
                className={`px-3.5 py-2 rounded-xl border text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  isDark
                    ? 'border-slate-700 bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700'
                    : 'border-slate-200 bg-slate-100 text-slate-700 hover:text-slate-900 hover:bg-slate-200'
                }`}
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reiniciar</span>
              </button>

              <button
                type="button"
                onClick={handleCheck}
                className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>Comprobar Respuestas</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
