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
  DictationItem,
  ADJECTIVES_VOCABULARY,
} from '../../data/adjectives2Data';
import { speakEnglish, stopSpeaking, playFeedbackSound } from '../../utils/audio';
import { useTheme } from '../../context/ThemeContext';
import { ReversibleTextCard } from './ReversibleTextCard';

interface ActivityDictationProps {
  activityNumber: number;
  items: DictationItem[];
  vocabularySubset: string[]; // e.g. ['alone', 'angry', 'best', 'easy', 'pretty']
  speed: number;
  accent?: 'US' | 'UK';
  onNextActivity?: () => void;
}

export const ActivityDictation: React.FC<ActivityDictationProps> = ({
  activityNumber,
  items,
  vocabularySubset,
  speed,
  accent = 'US',
  onNextActivity,
}) => {
  const { isDark } = useTheme();

  // User inputs: { [id]: string }
  const [inputs, setInputs] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    items.forEach((it) => {
      init[it.id] = '';
    });
    return init;
  });

  // Flipped cards: { [id]: boolean }
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  // Audio playing id
  const [playingId, setPlayingId] = useState<string | null>(null);

  // Check state
  const [isChecked, setIsChecked] = useState(false);

  // Normalization for comparing dictation (ignoring subtle punctuation & extra spaces)
  const cleanStr = (s: string) =>
    s
      .toLowerCase()
      .replace(/[.,/#!$%^&*;:{}=\-_`~()?'"!]/g, '')
      .replace(/\s+/g, ' ')
      .trim();

  const handleInputChange = (id: string, val: string) => {
    setInputs((prev) => ({ ...prev, [id]: val }));
  };

  const handleToggleFlip = (id: string) => {
    playFeedbackSound('click');
    setFlippedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSpeak = (text: string, id: string) => {
    if (playingId === id) {
      stopSpeaking();
      setPlayingId(null);
      return;
    }
    playFeedbackSound('click');
    speakEnglish(
      text,
      speed,
      accent,
      () => setPlayingId(id),
      () => setPlayingId(null)
    );
  };

  const handleCheck = () => {
    playFeedbackSound('click');
    setIsChecked(true);

    const allCorrect = items.every(
      (it) => cleanStr(inputs[it.id] || '') === cleanStr(it.sentenceEn)
    );
    playFeedbackSound(allCorrect ? 'correct' : 'wrong');
  };

  const handleReset = () => {
    playFeedbackSound('click');
    const init: Record<string, string> = {};
    items.forEach((it) => {
      init[it.id] = '';
    });
    setInputs(init);
    setFlippedCards({});
    setIsChecked(false);
  };

  const allFilled = items.every((it) => (inputs[it.id] || '').trim().length > 0);
  const subsetVocab = ADJECTIVES_VOCABULARY.filter((v) =>
    vocabularySubset.includes(v.id)
  );

  return (
    <div className="w-full flex flex-col gap-6 animate-in fade-in duration-200">
      {/* 1. Instruction Card (Reversible) */}
      <ReversibleTextCard
        textEn="Type the sentences that you hear in the dictation. Pay attention to punctuation."
        textEs="Escribe las oraciones que escuches en el dictado. Presta atención a la puntuación."
        speed={speed}
        accent={accent}
      />

      {/* 2. Main Area: Left Sidebar with Adjectives + Right Dictation Rows */}
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
                  onClick={() => handleSpeak(adj.word, `side-${adj.id}`)}
                  className="w-7 h-7 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center text-sky-600 dark:text-sky-400 hover:bg-white dark:hover:bg-slate-700 transition-colors cursor-pointer"
                  title={`Escuchar "${adj.word}"`}
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right Area: Dictation Items */}
        <div className="flex-1 w-full flex flex-col gap-3.5">
          {items.map((item, idx) => {
            const userText = inputs[item.id] || '';
            const isItemCorrect = cleanStr(userText) === cleanStr(item.sentenceEn);
            const isFlipped = Boolean(flippedCards[item.id]);

            return (
              <div
                key={item.id}
                className="w-full perspective-1000 select-none"
              >
                <div
                  className={`relative w-full min-h-[58px] transition-transform duration-500 transform-style-3d rounded-xl border ${
                    isDark
                      ? 'bg-slate-800/50 border-slate-700'
                      : 'bg-slate-50 border-slate-200'
                  } ${isFlipped ? 'rotate-y-180' : ''}`}
                >
                  {/* FRONT: Input & Audio Button */}
                  <div className="w-full h-full backface-hidden p-3 flex items-center gap-3">
                    {/* Audio Player Button */}
                    <button
                      type="button"
                      onClick={() => handleSpeak(item.sentenceEn, item.id)}
                      className={`shrink-0 w-9 h-9 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                        playingId === item.id
                          ? 'bg-sky-600 border-sky-600 text-white animate-pulse'
                          : isDark
                          ? 'bg-slate-800 border-slate-700 text-sky-400 hover:bg-slate-700'
                          : 'bg-white border-slate-300 text-sky-700 hover:bg-sky-50 shadow-xs'
                      }`}
                      title="Escuchar audio"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>

                    {/* Input Field */}
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        value={userText}
                        onChange={(e) => handleInputChange(item.id, e.target.value)}
                        placeholder={`Escucha y escribe la oración ${idx + 1}...`}
                        className={`w-full px-3.5 py-2 rounded-xl text-sm border font-medium transition-all outline-hidden ${
                          isChecked
                            ? isItemCorrect
                              ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-200'
                              : 'border-rose-500 bg-rose-50 dark:bg-rose-950/30 text-rose-900 dark:text-rose-200'
                            : isDark
                            ? 'bg-slate-900 border-slate-700 text-white focus:border-sky-500'
                            : 'bg-white border-slate-300 text-slate-900 focus:border-sky-500 shadow-xs'
                        }`}
                      />
                    </div>

                    {/* Feedback Icon if checked */}
                    {isChecked && (
                      <div className="shrink-0">
                        {isItemCorrect ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                        ) : (
                          <XCircle className="w-5 h-5 text-rose-500" />
                        )}
                      </div>
                    )}

                    {/* Flip Button to see Translation */}
                    <button
                      type="button"
                      onClick={() => handleToggleFlip(item.id)}
                      className={`shrink-0 w-8 h-8 rounded-lg border flex items-center justify-center transition-all cursor-pointer ${
                        isDark
                          ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100 shadow-xs'
                      }`}
                      title="Voltear para ver traducción en español"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* BACK: Spanish Translation */}
                  <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 p-3 flex items-center justify-between gap-3 bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-300 dark:border-emerald-800 rounded-xl">
                    <div className="flex-1 px-2 flex items-center min-w-0">
                      <p className="text-sm font-serif italic text-emerald-950 dark:text-emerald-300">
                        {item.sentenceEs}
                      </p>
                    </div>

                    <div className="shrink-0 flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleToggleFlip(item.id)}
                        className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-all cursor-pointer ${
                          isDark
                            ? 'bg-slate-800 border-emerald-700 text-emerald-300 hover:bg-slate-700'
                            : 'bg-white border-emerald-300 text-emerald-800 hover:bg-emerald-50'
                        }`}
                        title="Voltear a dictado"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleSpeak(item.sentenceEn, item.id)}
                        className="w-8 h-8 rounded-lg border border-emerald-300 dark:border-emerald-700 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300 flex items-center justify-center hover:scale-105 transition-all cursor-pointer"
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
