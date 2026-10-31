import React, { useState } from 'react';
import { CheckCircle, XCircle, RotateCcw, Volume2, ArrowRight } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { speakEnglish, playFeedbackSound, stopSpeaking } from '../../utils/audio';
import { VocabularySidebar } from './VocabularySidebar';
import { ReversibleTextCard } from './ReversibleTextCard';

interface Activity5DialogueClozeProps {
  speed?: number;
  accent?: 'US' | 'UK';
  onNext?: () => void;
}

export const Activity5DialogueCloze: React.FC<Activity5DialogueClozeProps> = ({
  speed = 1.0,
  accent = 'US',
  onNext,
}) => {
  const { isDark } = useTheme();

  // 5 blanks:
  // 0: Jane: Are you coming to the [family picnic] on Sunday?
  // 1: Robert: No. I didn't enjoy it last year. I don't want to see all my [relatives] !
  // 2: Jane: It's an opportunity to get together. We don't often have the chance of a [reunion] .
  // 3: Robert: There is always a [fight] . I hate it.
  // 4: Robert: You go along and [have fun] . I'm staying at home.
  const correctAnswers = ['family picnic', 'relatives', 'reunion', 'fight', 'have fun'];
  const allChips = ['reunion', 'relatives', 'family picnic', 'have fun', 'fight'];

  const [filledBlanks, setFilledBlanks] = useState<Record<number, string>>({});
  const [selectedChip, setSelectedChip] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [results, setResults] = useState<Record<number, boolean>>({});
  const [draggingOverBlank, setDraggingOverBlank] = useState<number | null>(null);

  const usedChips = Object.values(filledBlanks);
  const availableChips = allChips.filter((c) => !usedChips.includes(c));

  const handleSelectChip = (chip: string) => {
    if (isSubmitted && Object.values(results).every(Boolean)) return;
    playFeedbackSound('click');
    setSelectedChip(chip);
  };

  const handleFillBlank = (blankIdx: number, chipVal?: string) => {
    if (isSubmitted && results[blankIdx]) return;
    const chipToUse = chipVal || selectedChip;
    if (!chipToUse) return;

    playFeedbackSound('click');
    setFilledBlanks((prev) => ({
      ...prev,
      [blankIdx]: chipToUse,
    }));
    setSelectedChip(null);
    setIsSubmitted(false);
  };

  const handleClearBlank = (blankIdx: number) => {
    if (isSubmitted && results[blankIdx]) return;
    playFeedbackSound('click');
    setFilledBlanks((prev) => {
      const copy = { ...prev };
      delete copy[blankIdx];
      return copy;
    });
    setIsSubmitted(false);
  };

  const handleCheck = () => {
    playFeedbackSound('click');
    const newResults: Record<number, boolean> = {};
    let allOk = true;

    correctAnswers.forEach((ans, idx) => {
      const isCorrect = filledBlanks[idx]?.trim().toLowerCase() === ans.trim().toLowerCase();
      newResults[idx] = isCorrect;
      if (!isCorrect) allOk = false;
    });

    setResults(newResults);
    setIsSubmitted(true);

    if (allOk) {
      playFeedbackSound('correct');
      stopSpeaking();
      speakEnglish(
        "Jane: Are you coming to the family picnic on Sunday? Robert: No. I didn't enjoy it last year. I don't want to see all my relatives! Jane: It's an opportunity to get together. We don't often have the chance of a reunion. Robert: There is always a fight. I hate it. You go along and have fun. I'm staying at home.",
        speed,
        accent
      );
    } else {
      playFeedbackSound('wrong');
    }
  };

  const handleReset = () => {
    playFeedbackSound('click');
    setFilledBlanks({});
    setSelectedChip(null);
    setIsSubmitted(false);
    setResults({});
  };

  const isAllFilled = Object.keys(filledBlanks).length === correctAnswers.length;
  const isAllCorrect = isSubmitted && Object.values(results).length === correctAnswers.length && Object.values(results).every(Boolean);

  const fullEnglishDialogue =
    "Jane: Are you coming to the family picnic on Sunday?\nRobert: No. I didn't enjoy it last year. I don't want to see all my relatives!\nJane: It's an opportunity to get together. We don't often have the chance of a reunion.\nRobert: There is always a fight. I hate it. You go along and have fun. I'm staying at home.";

  const fullSpanishDialogue =
    "Jane: ¿Vienes al picnic familiar el domingo?\nRobert: No. No lo disfruté el año pasado. ¡No quiero ver a todos mis parientes!\nJane: Es una oportunidad para reunirse. No solemos tener la oportunidad de un reencuentro.\nRobert: Siempre hay una pelea. Lo detesto. Ve tú y diviértete. Yo me quedo en casa.";

  const renderSlot = (idx: number) => {
    const val = filledBlanks[idx];
    const evaluated = isSubmitted;
    const ok = results[idx];
    const isHover = draggingOverBlank === idx;

    return (
      <span
        onDrop={(e) => {
          e.preventDefault();
          setDraggingOverBlank(null);
          const chip = e.dataTransfer.getData('text/plain');
          if (chip) handleFillBlank(idx, chip);
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setDraggingOverBlank(idx);
        }}
        onDragLeave={() => setDraggingOverBlank(null)}
        onClick={() => {
          if (selectedChip) handleFillBlank(idx);
          else if (val) handleClearBlank(idx);
        }}
        className={`inline-flex items-center justify-center min-w-[130px] px-3.5 py-1.5 mx-1.5 rounded-xl border-2 border-dashed font-bold text-sm sm:text-base cursor-pointer select-none transition-all ${
          val
            ? evaluated
              ? ok
                ? 'bg-emerald-500 text-white border-emerald-600 shadow-sm'
                : 'bg-rose-500 text-white border-rose-600 shadow-sm'
              : 'bg-sky-500 text-white border-sky-600 shadow-sm'
            : isHover
            ? 'bg-sky-100 dark:bg-sky-950/80 border-sky-500 scale-105'
            : selectedChip
            ? 'bg-sky-50 dark:bg-sky-950/40 border-sky-400 text-sky-600 animate-pulse'
            : isDark
            ? 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500'
            : 'bg-slate-100 border-slate-300 text-slate-400 hover:border-slate-400'
        }`}
      >
        {val ? (
          <span>{val}</span>
        ) : (
          <span className="text-xs font-normal italic">arrastra aquí</span>
        )}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div
        className={`p-5 rounded-3xl border shadow-sm ${
          isDark
            ? 'bg-slate-800/80 border-slate-700 text-slate-100'
            : 'bg-white border-slate-200 text-slate-800'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide bg-sky-100 text-sky-700 dark:bg-sky-950/70 dark:text-sky-300">
                Unidad 8 · Sección 6
              </span>
              <span className="text-xs text-slate-400 font-medium">Actividad 5 de 7</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              Drag the correct answer/s into place.
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Arrastra o haz clic en las fichas para completar el diálogo entre Jane y Robert.
            </p>
          </div>
        </div>
      </div>

      {/* Main 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Vocabulary Sidebar */}
        <div className="lg:col-span-5 space-y-4">
          <VocabularySidebar speed={speed} accent={accent} limit={5} />
        </div>

        {/* Right Column: Dialogue Box & Chips */}
        <div className="lg:col-span-7 space-y-5">
          {/* Dialogue Box */}
          <div
            className={`p-6 sm:p-8 rounded-3xl border shadow-sm space-y-6 ${
              isDark ? 'bg-slate-900/90 border-slate-700' : 'bg-white border-slate-200'
            }`}
          >
            <div className="space-y-5 text-base sm:text-lg leading-relaxed text-slate-800 dark:text-slate-100 font-medium">
              {/* Jane 1 */}
              <div className="flex flex-wrap items-center">
                <span className="font-bold text-sky-700 dark:text-sky-300 mr-2">Jane:</span>
                <span>Are you coming to the</span>
                {renderSlot(0)}
                <span>on Sunday?</span>
              </div>

              {/* Robert 1 */}
              <div className="flex flex-wrap items-center">
                <span className="font-bold text-emerald-700 dark:text-emerald-300 mr-2">Robert:</span>
                <span>No. I didn't enjoy it last year. I don't want to see all my</span>
                {renderSlot(1)}
                <span>!</span>
              </div>

              {/* Jane 2 */}
              <div className="flex flex-wrap items-center">
                <span className="font-bold text-sky-700 dark:text-sky-300 mr-2">Jane:</span>
                <span>It's an opportunity to get together. We don't often have the chance of a</span>
                {renderSlot(2)}
                <span>.</span>
              </div>

              {/* Robert 2 */}
              <div className="flex flex-wrap items-center">
                <span className="font-bold text-emerald-700 dark:text-emerald-300 mr-2">Robert:</span>
                <span>There is always a</span>
                {renderSlot(3)}
                <span>. I hate it. You go along and</span>
                {renderSlot(4)}
                <span>. I'm staying at home.</span>
              </div>
            </div>

            {/* Check & Reset Actions */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1.5 transition-colors self-start"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Restablecer</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={!isAllFilled || isAllCorrect}
                  onClick={handleCheck}
                  className={`px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-sm transition-all flex items-center gap-2 ${
                    !isAllFilled || isAllCorrect
                      ? 'opacity-40 cursor-not-allowed bg-slate-300 dark:bg-slate-700 text-slate-500'
                      : 'bg-sky-500 hover:bg-sky-600 active:scale-95 text-white'
                  }`}
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Comprobar diálogo</span>
                </button>

                {isAllCorrect && onNext && (
                  <button
                    type="button"
                    onClick={onNext}
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2"
                  >
                    <span>Siguiente</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Chips Section */}
          <div
            className={`p-5 rounded-3xl border shadow-sm ${
              isDark ? 'bg-slate-900/90 border-slate-700' : 'bg-white border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Opciones disponibles:
              </span>
              <span className="text-[11px] text-slate-400 font-mono">
                {availableChips.length} restantes
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {allChips.map((chip, idx) => {
                const isUsed = usedChips.includes(chip);
                const isSelected = selectedChip === chip;

                return (
                  <div
                    key={idx}
                    draggable={!isUsed}
                    onDragStart={(e) => {
                      e.dataTransfer.setData('text/plain', chip);
                    }}
                    onClick={() => !isUsed && handleSelectChip(chip)}
                    className={`px-5 py-2.5 rounded-2xl border text-sm sm:text-base font-bold shadow-xs cursor-pointer select-none transition-all ${
                      isUsed
                        ? 'opacity-30 border-dashed border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-400 line-through cursor-not-allowed'
                        : isSelected
                        ? 'bg-sky-500 text-white border-sky-600 ring-2 ring-sky-300 dark:ring-sky-800 scale-102 shadow-md'
                        : isDark
                        ? 'bg-slate-800 border-slate-700 text-slate-100 hover:border-sky-500 hover:bg-slate-750'
                        : 'bg-white border-slate-200 text-slate-800 hover:border-sky-400 hover:bg-sky-50/50 hover:shadow-xs'
                    }`}
                  >
                    {chip}
                  </div>
                );
              })}
            </div>
          </div>

          {/* 3D Reversible Flip Card for Spanish Translation */}
          <ReversibleTextCard
            englishText={fullEnglishDialogue}
            spanishText={fullSpanishDialogue}
            speechRate={speed}
            accent={accent}
            size="md"
          />
        </div>
      </div>
    </div>
  );
};
