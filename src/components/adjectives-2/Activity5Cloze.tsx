import React, { useState } from 'react';
import {
  Volume2,
  Check,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ArrowRight,
  RefreshCw,
} from 'lucide-react';
import {
  ACTIVITY_5_DIALOGUE,
  ADJECTIVES_VOCABULARY,
} from '../../data/adjectives2Data';
import { speakEnglish, stopSpeaking, playFeedbackSound } from '../../utils/audio';
import { useTheme } from '../../context/ThemeContext';
import { ReversibleTextCard } from './ReversibleTextCard';

interface Activity5ClozeProps {
  speed: number;
  accent?: 'US' | 'UK';
  onNextActivity?: () => void;
}

export const Activity5Cloze: React.FC<Activity5ClozeProps> = ({
  speed,
  accent = 'US',
  onNextActivity,
}) => {
  const { isDark } = useTheme();

  // Slots: blank-1 (worst), blank-2 (easy), blank-3 (best), blank-4 (angry), blank-5 (alone)
  const [slotValues, setSlotValues] = useState<Record<string, string | null>>({
    'blank-1': null,
    'blank-2': null,
    'blank-3': null,
    'blank-4': null,
    'blank-5': null,
  });

  const correctAnswers: Record<string, string> = {
    'blank-1': 'worst',
    'blank-2': 'easy',
    'blank-3': 'best',
    'blank-4': 'angry',
    'blank-5': 'alone',
  };

  const [selectedToken, setSelectedToken] = useState<string | null>(null);
  const [dragOverBlankId, setDragOverBlankId] = useState<string | null>(null);
  const [isChecked, setIsChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [flippedLines, setFlippedLines] = useState<Record<string, boolean>>({});

  const placedTokens = Object.values(slotValues).filter(Boolean) as string[];

  const handleDragStart = (e: React.DragEvent, token: string) => {
    e.dataTransfer.setData('text/plain', token);
  };

  const handleDrop = (e: React.DragEvent, blankId: string) => {
    e.preventDefault();
    setDragOverBlankId(null);
    if (isChecked) return;
    const token = e.dataTransfer.getData('text/plain');
    if (!token) return;

    playFeedbackSound('click');
    setSlotValues((prev) => {
      const next = { ...prev };
      // Clear from previous slot if placed elsewhere
      Object.keys(next).forEach((k) => {
        if (next[k] === token) next[k] = null;
      });
      next[blankId] = token;
      return next;
    });
    setSelectedToken(null);
  };

  const handleSlotClick = (blankId: string) => {
    if (isChecked) return;
    if (selectedToken) {
      playFeedbackSound('click');
      setSlotValues((prev) => {
        const next = { ...prev };
        Object.keys(next).forEach((k) => {
          if (next[k] === selectedToken) next[k] = null;
        });
        next[blankId] = selectedToken;
        return next;
      });
      setSelectedToken(null);
    } else if (slotValues[blankId]) {
      playFeedbackSound('click');
      setSlotValues((prev) => ({ ...prev, [blankId]: null }));
    }
  };

  const handleTokenClick = (tok: string) => {
    if (isChecked) return;
    playFeedbackSound('click');
    if (selectedToken === tok) {
      setSelectedToken(null);
    } else {
      setSelectedToken(tok);
    }
  };

  const handleCheck = () => {
    playFeedbackSound('click');
    let allRight = true;
    for (const [bId, correctVal] of Object.entries(correctAnswers)) {
      if (slotValues[bId] !== correctVal) {
        allRight = false;
        break;
      }
    }
    setIsChecked(true);
    setIsCorrect(allRight);
    playFeedbackSound(allRight ? 'correct' : 'wrong');
  };

  const handleReset = () => {
    playFeedbackSound('click');
    setSlotValues({
      'blank-1': null,
      'blank-2': null,
      'blank-3': null,
      'blank-4': null,
      'blank-5': null,
    });
    setSelectedToken(null);
    setIsChecked(false);
    setIsCorrect(false);
    setFlippedLines({});
  };

  const toggleFlipLine = (lineId: string) => {
    playFeedbackSound('click');
    setFlippedLines((prev) => ({ ...prev, [lineId]: !prev[lineId] }));
  };

  const allFilled = Object.values(slotValues).every(Boolean);

  const renderSlot = (blankId: string) => {
    const val = slotValues[blankId];
    const isSlotCorrect = isChecked && val === correctAnswers[blankId];
    const isSlotWrong = isChecked && val && val !== correctAnswers[blankId];
    const isDragOver = dragOverBlankId === blankId;

    return (
      <span
        onDragOver={(e) => {
          e.preventDefault();
          setDragOverBlankId(blankId);
        }}
        onDragLeave={() => setDragOverBlankId(null)}
        onDrop={(e) => handleDrop(e, blankId)}
        onClick={() => handleSlotClick(blankId)}
        className={`inline-flex items-center justify-center min-w-[90px] h-7 sm:h-8 px-2.5 mx-1 rounded-lg border-2 border-dashed align-middle transition-all cursor-pointer select-none text-xs sm:text-sm ${
          val
            ? isSlotCorrect
              ? 'border-emerald-500 bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold'
              : isSlotWrong
              ? 'border-rose-500 bg-rose-500/15 text-rose-600 dark:text-rose-400 font-bold'
              : isDark
              ? 'border-sky-500 bg-sky-950/40 text-sky-300 font-bold'
              : 'border-sky-500 bg-sky-50 text-sky-800 font-bold'
            : isDragOver
            ? 'border-sky-400 bg-sky-100 dark:bg-sky-900/40'
            : isDark
            ? 'border-slate-600 bg-slate-800/40 text-slate-500 hover:border-slate-400'
            : 'border-slate-300 bg-slate-100/60 text-slate-400 hover:border-slate-400'
        }`}
      >
        {val ? (
          <span className="font-semibold">{val}</span>
        ) : (
          <span className="text-[11px] opacity-60 font-mono">_______</span>
        )}
      </span>
    );
  };

  const subsetVocab = ADJECTIVES_VOCABULARY.slice(0, 5); // alone, angry, best, easy, pretty

  return (
    <div className="w-full flex flex-col gap-6 animate-in fade-in duration-200">
      {/* 1. Instruction Card */}
      <ReversibleTextCard
        textEn={ACTIVITY_5_DIALOGUE.instructions}
        textEs={ACTIVITY_5_DIALOGUE.instructionsEs}
        speed={speed}
        accent={accent}
      />

      {/* 2. Main Area: Left Sidebar with Adjectives + Right Dialogue & Token Bank */}
      <div
        className={`w-full rounded-2xl border p-4 sm:p-6 shadow-lg flex flex-col md:flex-row gap-6 items-start ${
          isDark
            ? 'bg-slate-900 border-slate-800 text-slate-100'
            : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Left Sidebar: Adjectives List */}
        <div className="w-full md:w-56 shrink-0 flex flex-col gap-3 pb-4 md:pb-0 md:pr-4 md:border-r border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
            <span className="text-base font-bold text-sky-600 dark:text-sky-400">
              Adjectives
            </span>
            <span className="text-xs font-mono text-slate-400">
              {subsetVocab.length} words
            </span>
          </div>

          <div className="flex flex-col gap-2">
            {subsetVocab.map((adj) => (
              <div
                key={adj.id}
                className={`flex items-center justify-between p-2 rounded-xl border transition-colors ${
                  isDark
                    ? 'bg-slate-800/40 border-slate-700 hover:bg-slate-800'
                    : 'bg-slate-50 border-slate-200 hover:bg-slate-100/70'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <img
                    src={adj.thumbnailImg}
                    alt={adj.word}
                    className="w-8 h-8 rounded-lg object-cover border border-slate-300 dark:border-slate-600 shrink-0"
                  />
                  <span className="text-sm font-bold capitalize truncate">
                    {adj.word}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => speakEnglish(adj.word, speed, accent)}
                  className="w-7 h-7 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center text-sky-600 dark:text-sky-400 hover:bg-white dark:hover:bg-slate-700 transition-colors cursor-pointer"
                  title={`Escuchar "${adj.word}"`}
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right Area: Dialogue Lines + Draggable Tokens */}
        <div className="flex-1 w-full flex flex-col gap-5">
          {/* Dialogue Lines */}
          <div className="flex flex-col gap-3">
            {ACTIVITY_5_DIALOGUE.lines.map((l) => {
              const isLineFlipped = Boolean(flippedLines[l.id]);

              return (
                <div
                  key={l.id}
                  className="w-full perspective-1000 select-none"
                >
                  <div
                    className={`relative w-full min-h-[50px] transition-transform duration-500 transform-style-3d rounded-xl border ${
                      isDark
                        ? 'bg-slate-800/40 border-slate-700/70'
                        : 'bg-slate-50 border-slate-200'
                    } ${isLineFlipped ? 'rotate-y-180' : ''}`}
                  >
                    {/* Front Face: English Dialogue with Drop Slots */}
                    <div className="w-full h-full backface-hidden p-3 flex items-center justify-between gap-3">
                      <div className="flex-1 flex flex-wrap items-center text-sm sm:text-base leading-relaxed">
                        <strong className="mr-2 font-bold text-sky-600 dark:text-sky-400">
                          {l.speaker}:
                        </strong>

                        {l.id === 'a5-l1' && (
                          <>
                            <span>{l.prefix}</span>
                            {renderSlot('blank-1')}
                            <span>{l.suffix}</span>
                          </>
                        )}

                        {l.id === 'a5-l2' && <span>{l.fullTextEn}</span>}

                        {l.id === 'a5-l3' && (
                          <>
                            <span>{l.prefix}</span>
                            {renderSlot('blank-2')}
                            <span>{l.middle}</span>
                            {renderSlot('blank-3')}
                            <span>{l.suffix}</span>
                          </>
                        )}

                        {l.id === 'a5-l4' && (
                          <>
                            <span>{l.prefix}</span>
                            {renderSlot('blank-4')}
                            <span>{l.suffix}</span>
                          </>
                        )}

                        {l.id === 'a5-l5' && (
                          <>
                            <span>{l.prefix}</span>
                            {renderSlot('blank-5')}
                            <span>{l.suffix}</span>
                          </>
                        )}

                        {l.id === 'a5-l6' && <span>{l.fullTextEn}</span>}
                      </div>

                      <div className="shrink-0 flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => toggleFlipLine(l.id)}
                          className={`w-7 h-7 rounded-lg border flex items-center justify-center transition-all cursor-pointer ${
                            isDark
                              ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                              : 'bg-white border-slate-300 text-slate-600 hover:bg-slate-100 shadow-xs'
                          }`}
                          title="Voltear para ver traducción en español"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => speakEnglish(l.fullTextEn, speed, accent)}
                          className="w-7 h-7 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center text-sky-600 dark:text-sky-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                          title="Escuchar audio"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Back Face: Spanish Translation */}
                    <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 p-3 flex items-center justify-between gap-3 bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-300 dark:border-emerald-800 rounded-xl">
                      <div className="flex-1 flex items-center min-w-0">
                        <p className="text-sm font-serif italic text-emerald-950 dark:text-emerald-300">
                          <strong className="mr-1.5 font-bold not-italic font-sans text-emerald-900 dark:text-emerald-200">
                            {l.speaker}:
                          </strong>
                          {l.fullTextEs}
                        </p>
                      </div>

                      <div className="shrink-0 flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => toggleFlipLine(l.id)}
                          className={`w-7 h-7 rounded-lg border flex items-center justify-center transition-all cursor-pointer ${
                            isDark
                              ? 'bg-slate-800 border-emerald-700 text-emerald-300 hover:bg-slate-700'
                              : 'bg-white border-emerald-300 text-emerald-800 hover:bg-emerald-50'
                          }`}
                          title="Voltear a inglés"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => speakEnglish(l.fullTextEn, speed, accent)}
                          className="w-7 h-7 rounded-lg border border-emerald-300 dark:border-emerald-700 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300 flex items-center justify-center hover:scale-105 transition-all cursor-pointer"
                          title="Escuchar audio"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Draggable Token Bank */}
          <div className="w-full pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Palabras para arrastrar
            </span>

            <div className="flex flex-wrap items-center gap-2">
              {ACTIVITY_5_DIALOGUE.tokens.map((tok) => {
                const isPlaced = placedTokens.includes(tok);
                const isSelected = selectedToken === tok;

                return (
                  <div
                    key={tok}
                    draggable={!isPlaced && !isChecked}
                    onDragStart={(e) => handleDragStart(e, tok)}
                    onClick={() => !isPlaced && handleTokenClick(tok)}
                    className={`px-4 py-2 rounded-xl border text-sm font-bold select-none transition-all cursor-pointer ${
                      isPlaced
                        ? 'opacity-30 border-transparent bg-slate-200 dark:bg-slate-800 pointer-events-none'
                        : isSelected
                        ? 'border-sky-500 bg-sky-500 text-white shadow-md scale-105'
                        : isDark
                        ? 'bg-slate-800 border-slate-700 text-slate-100 hover:border-sky-400 hover:bg-slate-750 shadow-xs'
                        : 'bg-white border-slate-300 text-slate-800 hover:border-sky-400 hover:bg-sky-50/60 shadow-xs'
                    }`}
                  >
                    {tok}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Bottom Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={handleReset}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            isDark
              ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
              : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300 shadow-xs'
          }`}
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reiniciar</span>
        </button>

        <div className="flex items-center gap-3">
          {!isChecked ? (
            <button
              type="button"
              disabled={!allFilled}
              onClick={handleCheck}
              className={`flex items-center gap-2 px-7 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white shadow-md transition-all ${
                allFilled
                  ? 'bg-sky-600 hover:bg-sky-500 hover:scale-102 active:scale-95 cursor-pointer'
                  : 'bg-slate-400 dark:bg-slate-700 opacity-60 cursor-not-allowed'
              }`}
            >
              <Check className="w-4 h-4" />
              <span>Comprobar</span>
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <span
                className={`text-xs sm:text-sm font-bold flex items-center gap-1.5 ${
                  isCorrect
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : 'text-rose-600 dark:text-rose-400'
                }`}
              >
                {isCorrect ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    ¡Excelente trabajo!
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4" />
                    Revisa las palabras marcadas
                  </>
                )}
              </span>

              {onNextActivity && (
                <button
                  type="button"
                  onClick={onNextActivity}
                  className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs sm:text-sm font-bold shadow-md transition-all cursor-pointer"
                >
                  <span>Siguiente Actividad</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
