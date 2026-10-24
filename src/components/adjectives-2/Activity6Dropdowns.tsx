import React, { useState } from 'react';
import {
  Volume2,
  Check,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ArrowRight,
  RefreshCw,
  ChevronDown,
} from 'lucide-react';
import {
  ACTIVITY_6_DIALOGUE,
  ADJECTIVES_VOCABULARY,
} from '../../data/adjectives2Data';
import { speakEnglish, stopSpeaking, playFeedbackSound } from '../../utils/audio';
import { useTheme } from '../../context/ThemeContext';
import { ReversibleTextCard } from './ReversibleTextCard';

interface Activity6DropdownsProps {
  speed: number;
  accent?: 'US' | 'UK';
  onNextActivity?: () => void;
}

export const Activity6Dropdowns: React.FC<Activity6DropdownsProps> = ({
  speed,
  accent = 'US',
  onNextActivity,
}) => {
  const { isDark } = useTheme();

  // Selected values: { 'a6-b1': 'angry', ... }
  const [selectedValues, setSelectedValues] = useState<Record<string, string>>({
    'a6-b1': '',
    'a6-b2': '',
    'a6-b3': '',
    'a6-b4': '',
    'a6-b5': '',
  });

  const correctAnswers: Record<string, string> = {
    'a6-b1': 'angry',
    'a6-b2': 'worst',
    'a6-b3': 'strong',
    'a6-b4': 'alone',
    'a6-b5': 'wonderful',
  };

  const [isChecked, setIsChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [flippedLines, setFlippedLines] = useState<Record<string, boolean>>({});

  const handleSelectChange = (blankId: string, val: string) => {
    if (isChecked) return;
    playFeedbackSound('click');
    setSelectedValues((prev) => ({ ...prev, [blankId]: val }));
  };

  const handleCheck = () => {
    playFeedbackSound('click');
    let allRight = true;
    for (const [bId, correctVal] of Object.entries(correctAnswers)) {
      if (selectedValues[bId] !== correctVal) {
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
    setSelectedValues({
      'a6-b1': '',
      'a6-b2': '',
      'a6-b3': '',
      'a6-b4': '',
      'a6-b5': '',
    });
    setIsChecked(false);
    setIsCorrect(false);
    setFlippedLines({});
  };

  const toggleFlipLine = (lineId: string) => {
    playFeedbackSound('click');
    setFlippedLines((prev) => ({ ...prev, [lineId]: !prev[lineId] }));
  };

  const allFilled = Object.keys(correctAnswers).every((k) => Boolean(selectedValues[k]));

  const renderDropdown = (blankId: string, options: string[]) => {
    const val = selectedValues[blankId];
    const isSlotCorrect = isChecked && val === correctAnswers[blankId];
    const isSlotWrong = isChecked && val && val !== correctAnswers[blankId];

    return (
      <div className="inline-block mx-1 my-0.5 align-middle relative">
        <select
          value={val}
          disabled={isChecked}
          onChange={(e) => handleSelectChange(blankId, e.target.value)}
          className={`appearance-none text-xs sm:text-sm font-semibold pl-3 pr-7 py-1.5 rounded-lg border cursor-pointer outline-hidden transition-all ${
            val
              ? isSlotCorrect
                ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-300'
                : isSlotWrong
                ? 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-300'
                : 'border-sky-500 bg-sky-50 dark:bg-sky-950/40 text-sky-900 dark:text-sky-200'
              : isDark
              ? 'border-slate-600 bg-slate-800 text-slate-300'
              : 'border-slate-300 bg-white text-slate-700 shadow-xs'
          }`}
        >
          <option value="">Selecciona...</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <ChevronDown className="w-3.5 h-3.5 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none opacity-60" />
      </div>
    );
  };

  const subsetVocab = ADJECTIVES_VOCABULARY.slice(0, 5);

  return (
    <div className="w-full flex flex-col gap-6 animate-in fade-in duration-200">
      {/* 1. Instruction Card */}
      <ReversibleTextCard
        textEn={ACTIVITY_6_DIALOGUE.instructions}
        textEs={ACTIVITY_6_DIALOGUE.instructionsEs}
        speed={speed}
        accent={accent}
      />

      {/* 2. Main Area: Left Sidebar + Right Dialogue */}
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

        {/* Right Area: Dialogue Lines */}
        <div className="flex-1 w-full flex flex-col gap-3.5">
          {ACTIVITY_6_DIALOGUE.lines.map((l) => {
            const isLineFlipped = Boolean(flippedLines[l.id]);

            return (
              <div
                key={l.id}
                className="w-full perspective-1000 select-none"
              >
                <div
                  className={`relative w-full min-h-[54px] transition-transform duration-500 transform-style-3d rounded-xl border ${
                    isDark
                      ? 'bg-slate-800/40 border-slate-700/70'
                      : 'bg-slate-50 border-slate-200'
                  } ${isLineFlipped ? 'rotate-y-180' : ''}`}
                >
                  {/* Front: English with Dropdown Selectors */}
                  <div className="w-full h-full backface-hidden p-3 flex items-center justify-between gap-3">
                    <div className="flex-1 flex flex-wrap items-center text-sm sm:text-base leading-relaxed">
                      <strong className="mr-2 font-bold text-sky-600 dark:text-sky-400">
                        {l.speaker}:
                      </strong>

                      {l.id === 'a6-l1' && (
                        <>
                          <span>{l.prefix}</span>
                          {renderSlotDropdown(l.blankId!, l.options!)}
                          <span>{l.suffix}</span>
                        </>
                      )}

                      {l.id === 'a6-l2' && (
                        <>
                          <span>{l.prefix}</span>
                          {renderSlotDropdown(l.blankId!, l.options!)}
                          <span>{l.suffix}</span>
                        </>
                      )}

                      {l.id === 'a6-l3' && (
                        <>
                          <span>{l.prefix}</span>
                          {renderSlotDropdown(l.blankId!, l.options!)}
                          <span>{l.middle}</span>
                          {renderSlotDropdown(l.blankId2!, l.options2!)}
                          <span>{l.suffix}</span>
                        </>
                      )}

                      {l.id === 'a6-l4' && (
                        <>
                          <span>{l.prefix}</span>
                          {renderSlotDropdown(l.blankId!, l.options!)}
                          <span>{l.suffix}</span>
                        </>
                      )}
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
                    Revisa las selecciones incorrectas
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

  function renderSlotDropdown(blankId: string, options: string[]) {
    return renderDropdown(blankId, options);
  }
};
