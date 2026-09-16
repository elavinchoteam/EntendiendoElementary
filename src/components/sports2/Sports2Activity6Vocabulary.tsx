import React, { useState } from 'react';
import {
  Check,
  RotateCcw,
  Volume2,
  CheckCircle2,
  XCircle,
  Sparkles,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  SPORTS2_ACT6_PAIRS,
  SportsVocabularyPair,
} from '../../data/peopleCrazyAboutSportsData';
import { useTheme } from '../../context/ThemeContext';
import { playFeedbackSound, speakEnglish, stopSpeaking } from '../../utils/audio';
import { SpeedSelectorButton } from '../SpeedSelectorButton';

interface Sports2Activity6VocabularyProps {
  accent?: 'US' | 'UK';
  speechRate?: number;
  onComplete?: () => void;
}

export const Sports2Activity6Vocabulary: React.FC<Sports2Activity6VocabularyProps> = ({
  accent = 'US',
  speechRate = 1.0,
  onComplete,
}) => {
  const { isDark } = useTheme();

  // Matched definition per word ID: { [wordId]: definitionText }
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [selectedDefinition, setSelectedDefinition] = useState<string | null>(null);
  const [isChecked, setIsChecked] = useState(false);
  const [isHeaderFlipped, setIsHeaderFlipped] = useState(false);
  const [flippedWordIds, setFlippedWordIds] = useState<string[]>([]);
  const [currentRate, setCurrentRate] = useState<number>(speechRate);

  // Available definitions to pick from
  const allDefinitions = SPORTS2_ACT6_PAIRS.map((p) => p.definitionEn);
  const assignedDefinitions = Object.values(matches);
  const unassignedDefinitions = allDefinitions.filter(
    (def) => !assignedDefinitions.includes(def)
  );

  const handleSelectDefinitionToPlace = (def: string) => {
    if (isChecked) return;
    playFeedbackSound('click');
    if (selectedDefinition === def) {
      setSelectedDefinition(null);
    } else {
      setSelectedDefinition(def);
    }
  };

  const handleAssignToWord = (wordId: string) => {
    if (isChecked) return;
    if (!selectedDefinition) {
      // If word already had a definition, unassign it
      if (matches[wordId]) {
        playFeedbackSound('click');
        setMatches((prev) => {
          const next = { ...prev };
          delete next[wordId];
          return next;
        });
      }
      return;
    }

    playFeedbackSound('click');
    setMatches((prev) => ({
      ...prev,
      [wordId]: selectedDefinition,
    }));
    setSelectedDefinition(null);
  };

  const handleRemoveAssigned = (wordId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (isChecked) return;
    playFeedbackSound('click');
    setMatches((prev) => {
      const next = { ...prev };
      delete next[wordId];
      return next;
    });
  };

  const handleToggleFlipWord = (wordId: string) => {
    playFeedbackSound('flip');
    setFlippedWordIds((prev) =>
      prev.includes(wordId)
        ? prev.filter((id) => id !== wordId)
        : [...prev, wordId]
    );
  };

  const handleCheck = () => {
    if (Object.keys(matches).length < SPORTS2_ACT6_PAIRS.length) return;
    setIsChecked(true);

    const isAllCorrect = SPORTS2_ACT6_PAIRS.every(
      (pair) => matches[pair.id] === pair.definitionEn
    );

    if (isAllCorrect) {
      playFeedbackSound('correct');
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
      });
      if (onComplete) {
        onComplete();
      }
    } else {
      playFeedbackSound('wrong');
    }
  };

  const handleClear = () => {
    playFeedbackSound('click');
    setMatches({});
    setSelectedDefinition(null);
    setIsChecked(false);
  };

  const handleSpeakText = (text: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    stopSpeaking();
    speakEnglish(
      text,
      currentRate,
      accent === 'UK' ? 'UK' : 'US',
      () => {},
      () => {},
      'female'
    );
  };

  const allAssigned =
    Object.keys(matches).length === SPORTS2_ACT6_PAIRS.length;
  const isAllCorrect =
    isChecked &&
    SPORTS2_ACT6_PAIRS.every((pair) => matches[pair.id] === pair.definitionEn);

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-6">
      {/* Reversible Instruction Header */}
      <div
        onClick={() => {
          playFeedbackSound('flip');
          setIsHeaderFlipped((prev) => !prev);
        }}
        className="w-full perspective-1000 cursor-pointer select-none"
      >
        <div
          className={`grid grid-cols-1 grid-rows-1 transition-transform duration-500 transform-style-3d ${
            isHeaderFlipped ? 'rotate-y-180' : ''
          }`}
        >
          {/* Front: English */}
          <div
            className={`col-start-1 row-start-1 backface-hidden w-full p-4 sm:p-5 rounded-2xl border flex items-center justify-between shadow-xs ${
              isDark
                ? 'bg-slate-900 border-slate-800 text-slate-100'
                : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <div className="pr-4">
              <h3 className="text-sm sm:text-base font-medium text-sky-600 dark:text-sky-400">
                Look at these words from the article. Do you know their meaning? Match up the words and the definitions.
              </h3>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <SpeedSelectorButton
                currentRate={currentRate}
                onRateChange={(r) => setCurrentRate(r)}
                size="sm"
              />
              <button
                type="button"
                onClick={(e) =>
                  handleSpeakText(
                    'Look at these words from the article. Do you know their meaning? Match up the words and the definitions.',
                    e
                  )
                }
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-xs ${
                  isDark
                    ? 'bg-slate-800 hover:bg-slate-700 text-sky-400 border border-slate-700'
                    : 'bg-stone-50 hover:bg-stone-100 text-sky-600 border border-stone-200'
                }`}
                aria-label="Speaker"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Back: Spanish */}
          <div
            className={`col-start-1 row-start-1 backface-hidden rotate-y-180 w-full p-4 sm:p-5 rounded-2xl border flex items-center justify-between shadow-xs ${
              isDark
                ? 'bg-slate-900 border-slate-800 text-slate-100'
                : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <h3 className="text-sm sm:text-base font-medium text-emerald-600 dark:text-emerald-400 italic">
              Observa estas palabras del artículo. ¿Conoces su significado? Une las palabras y las definiciones.
            </h3>
          </div>
        </div>
      </div>

      {/* Matching Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Words and Slots (7 cols) */}
        <div className="md:col-span-7 flex flex-col gap-3">
          {SPORTS2_ACT6_PAIRS.map((pair) => {
            const assigned = matches[pair.id];
            const isFlipped = flippedWordIds.includes(pair.id);
            const isPairCorrect = assigned === pair.definitionEn;

            return (
              <div
                key={pair.id}
                className={`p-3.5 sm:p-4 rounded-xl border transition-all flex flex-col gap-2 ${
                  isDark
                    ? 'bg-slate-900 border-slate-800'
                    : 'bg-white border-slate-200'
                }`}
              >
                {/* Word Row */}
                <div className="flex items-center justify-between">
                  <div
                    onClick={() => handleToggleFlipWord(pair.id)}
                    className="cursor-pointer select-none flex items-center gap-2"
                  >
                    <span className="font-semibold text-base sm:text-lg text-sky-600 dark:text-sky-400">
                      {isFlipped ? pair.wordEs : pair.wordEn}
                    </span>
                    {isFlipped && (
                      <span className="text-xs text-emerald-500 italic">
                        (español)
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => handleSpeakText(pair.wordEn, e)}
                      className="p-1 rounded-full text-slate-400 hover:text-sky-500 transition-colors cursor-pointer"
                      aria-label="Speaker"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                    {isChecked && isPairCorrect && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    )}
                    {isChecked && !isPairCorrect && assigned && (
                      <XCircle className="w-4 h-4 text-rose-500" />
                    )}
                  </div>
                </div>

                {/* Drop / Target Slot for definition */}
                <div
                  onClick={() => handleAssignToWord(pair.id)}
                  className={`min-h-12 p-2.5 rounded-lg border-2 border-dashed flex items-center justify-between transition-all cursor-pointer ${
                    assigned
                      ? isChecked
                        ? isPairCorrect
                          ? 'border-emerald-500/60 bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-900 dark:text-emerald-200 border-solid'
                          : 'border-rose-500/60 bg-rose-50/50 dark:bg-rose-950/20 text-rose-900 dark:text-rose-200 border-solid'
                        : isDark
                        ? 'border-sky-500/50 bg-sky-950/20 text-slate-200 border-solid'
                        : 'border-sky-400 bg-sky-50/60 text-slate-800 border-solid'
                      : selectedDefinition
                      ? 'border-sky-400 hover:bg-sky-50/30 dark:hover:bg-sky-950/20'
                      : isDark
                      ? 'border-slate-700 hover:border-slate-600'
                      : 'border-slate-300 hover:border-slate-400'
                  }`}
                >
                  {assigned ? (
                    <div className="w-full flex items-center justify-between gap-2">
                      <span className="text-xs sm:text-sm font-medium">
                        {assigned}
                      </span>
                      {!isChecked && (
                        <button
                          type="button"
                          onClick={(e) => handleRemoveAssigned(pair.id, e)}
                          className="text-xs text-slate-400 hover:text-rose-500 transition-colors p-1"
                          title="Remover"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  ) : (
                    <span className="text-xs text-slate-400 italic">
                      {selectedDefinition
                        ? 'Haz clic aquí para colocar la definición seleccionada'
                        : 'Haz clic en una definición de la derecha para asignarla'}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Definitions Bank (5 cols) */}
        <div className="md:col-span-5 flex flex-col gap-3">
          <div
            className={`p-3 rounded-xl border ${
              isDark
                ? 'bg-slate-900/60 border-slate-800'
                : 'bg-stone-50 border-slate-200'
            }`}
          >
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
              Definiciones disponibles
            </p>

            <div className="space-y-2.5">
              {allDefinitions.map((def, idx) => {
                const isAssigned = assignedDefinitions.includes(def);
                const isSelected = selectedDefinition === def;

                return (
                  <div
                    key={idx}
                    onClick={() => {
                      if (!isAssigned) {
                        handleSelectDefinitionToPlace(def);
                      }
                    }}
                    className={`p-3 rounded-xl border transition-all text-xs sm:text-sm flex items-center justify-between gap-2 ${
                      isAssigned
                        ? 'opacity-35 pointer-events-none border-dashed border-slate-300 dark:border-slate-700 bg-transparent text-slate-400'
                        : isSelected
                        ? 'border-sky-500 bg-sky-500 text-white shadow-sm ring-2 ring-sky-300 scale-[1.02] cursor-pointer'
                        : isDark
                        ? 'bg-slate-800/80 border-slate-700 hover:border-sky-500/50 text-slate-200 cursor-pointer'
                        : 'bg-white border-slate-200 hover:border-sky-400 text-slate-800 shadow-xs cursor-pointer'
                    }`}
                  >
                    <span>{def}</span>
                    {!isAssigned && (
                      <button
                        type="button"
                        onClick={(e) => handleSpeakText(def, e)}
                        className={`p-1 rounded-full transition-colors shrink-0 ${
                          isSelected
                            ? 'text-white/80 hover:text-white'
                            : 'text-slate-400 hover:text-sky-500'
                        }`}
                        aria-label="Speaker"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={handleClear}
          disabled={Object.keys(matches).length === 0}
          className={`px-4 py-2 rounded-xl text-sm font-medium border flex items-center gap-2 transition-all cursor-pointer ${
            Object.keys(matches).length === 0
              ? 'opacity-40 cursor-not-allowed border-slate-200 dark:border-slate-800 text-slate-400'
              : isDark
              ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'
              : 'bg-white border-slate-200 text-slate-700 hover:bg-stone-50'
          }`}
        >
          <RotateCcw className="w-4 h-4" />
          <span>Clear</span>
        </button>

        <button
          type="button"
          onClick={handleCheck}
          disabled={!allAssigned || isChecked}
          className={`px-5 py-2 rounded-xl text-sm font-medium flex items-center gap-2 transition-all shadow-xs cursor-pointer ${
            !allAssigned || isChecked
              ? 'opacity-50 cursor-not-allowed bg-slate-300 dark:bg-slate-800 text-slate-500'
              : 'bg-sky-500 hover:bg-sky-600 text-white active:scale-95'
          }`}
        >
          <Check className="w-4 h-4" />
          <span>Check</span>
        </button>
      </div>

      {/* Success Banner */}
      {isAllCorrect && (
        <div
          className={`p-4 rounded-xl border flex items-center gap-3 animate-in fade-in duration-200 ${
            isDark
              ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
              : 'bg-emerald-50 border-emerald-200 text-emerald-800'
          }`}
        >
          <Sparkles className="w-5 h-5 text-emerald-500 shrink-0" />
          <p className="text-sm font-medium">
            ¡Felicitaciones! Has emparejado correctamente todas las palabras con sus definiciones.
          </p>
        </div>
      )}
    </div>
  );
};
