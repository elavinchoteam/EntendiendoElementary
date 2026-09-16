import React, { useState } from 'react';
import { Volume2, CheckCircle2, XCircle, RotateCcw, ArrowRight } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import {
  ACTIVITY_2_PICTURES,
  ACTIVITY_2_OPTIONS,
  SportsPictureMatchItem,
} from '../../data/sports1Data';
import { speakEnglish, playFeedbackSound } from '../../utils/audio';

interface SportsActivity2Props {
  currentRate: number;
  accent?: 'US' | 'UK';
  onComplete?: () => void;
  onNext?: () => void;
}

export const SportsActivity2: React.FC<SportsActivity2Props> = ({
  currentRate,
  accent = 'US',
  onComplete,
  onNext,
}) => {
  const { isDark } = useTheme();

  // Instruction flip
  const [isInstructionFlipped, setIsInstructionFlipped] = useState(false);

  // User assignments: { [pictureId]: selectedText }
  const [matches, setMatches] = useState<Record<string, string>>({});
  // Selected option from pool for click-to-place
  const [selectedWord, setSelectedWord] = useState<string | null>(null);

  // Flip status for individual cards
  const [flippedCards, setFlippedCards] = useState<string[]>([]);

  // Validation state
  const [hasChecked, setHasChecked] = useState(false);
  const [isAllCorrect, setIsAllCorrect] = useState(false);

  const instructionEn = "Match the pictures with the text.";
  const instructionEs = "Une las imágenes con el texto.";

  const handlePlayInstruction = (e: React.MouseEvent) => {
    e.stopPropagation();
    speakEnglish(instructionEn, currentRate, accent === 'UK' ? 'UK' : 'US');
  };

  const handlePlayWord = (word: string, e: React.MouseEvent) => {
    e.stopPropagation();
    speakEnglish(word, currentRate, accent === 'UK' ? 'UK' : 'US');
  };

  const toggleCardFlip = (id: string) => {
    setFlippedCards((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  // Assign word to picture
  const handleAssignWord = (picId: string) => {
    if (!selectedWord) {
      // If already assigned, clear it
      if (matches[picId]) {
        setMatches((prev) => {
          const updated = { ...prev };
          delete updated[picId];
          return updated;
        });
        setHasChecked(false);
      }
      return;
    }

    setMatches((prev) => ({
      ...prev,
      [picId]: selectedWord,
    }));
    setSelectedWord(null);
    setHasChecked(false);
    playFeedbackSound('click');
  };

  // Check answers
  const handleCheck = () => {
    let allRight = true;
    for (const item of ACTIVITY_2_PICTURES) {
      if (matches[item.id] !== item.text) {
        allRight = false;
        break;
      }
    }

    setHasChecked(true);
    setIsAllCorrect(allRight);

    if (allRight) {
      playFeedbackSound('correct');
      if (onComplete) onComplete();
    } else {
      playFeedbackSound('wrong');
    }
  };

  // Reset
  const handleReset = () => {
    setMatches({});
    setSelectedWord(null);
    setHasChecked(false);
    setIsAllCorrect(false);
  };

  // Available options (not yet placed)
  const placedWords = Object.values(matches);
  const availableOptions = ACTIVITY_2_OPTIONS.filter(
    (opt) => !placedWords.includes(opt)
  );

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Reversible Instruction Header Card */}
      <div
        id="sports-act2-instruction-card"
        onClick={() => setIsInstructionFlipped(!isInstructionFlipped)}
        className={`w-full rounded-2xl border p-4 sm:p-5 transition-all cursor-pointer select-none ${
          isDark
            ? 'bg-slate-900 border-slate-700 text-slate-100'
            : 'bg-white border-slate-200 text-slate-900 shadow-xs'
        }`}
      >
        <div className="w-full flex items-center justify-between gap-3">
          <div>
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 mb-0.5">
              {isInstructionFlipped ? 'Instrucciones' : 'Instructions'}
            </div>
            <p className="text-sm sm:text-base font-medium">
              {isInstructionFlipped ? instructionEs : instructionEn}
            </p>
          </div>

          <button
            type="button"
            onClick={handlePlayInstruction}
            className={`p-2.5 rounded-xl border shrink-0 transition-colors cursor-pointer ${
              isDark
                ? 'bg-slate-800 hover:bg-slate-700 text-sky-300 border-slate-700'
                : 'bg-slate-50 hover:bg-slate-100 text-sky-700 border-slate-200 shadow-xs'
            }`}
            aria-label="Audio"
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Word Options Pool (Badge Buttons) */}
      <div
        className={`p-4 rounded-2xl border flex flex-wrap items-center justify-center gap-3 ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="w-full text-xs font-semibold text-slate-400 uppercase tracking-wider text-center mb-1">
          Palabras disponibles
        </div>
        {ACTIVITY_2_OPTIONS.map((option) => {
          const isPlaced = placedWords.includes(option);
          const isSelected = selectedWord === option;

          return (
            <button
              key={option}
              type="button"
              disabled={isPlaced}
              onClick={() => {
                playFeedbackSound('click');
                setSelectedWord(isSelected ? null : option);
              }}
              className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all cursor-pointer select-none flex items-center gap-2 ${
                isPlaced
                  ? 'opacity-30 border-dashed border-slate-400 dark:border-slate-700 cursor-not-allowed'
                  : isSelected
                  ? 'bg-sky-600 text-white border-sky-500 ring-2 ring-sky-400/40 scale-105 shadow-sm'
                  : isDark
                  ? 'bg-slate-800 text-slate-200 border-slate-700 hover:border-slate-500 hover:bg-slate-750'
                  : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100 shadow-xs'
              }`}
            >
              <span>{option}</span>
              <span
                onClick={(e) => handlePlayWord(option, e)}
                className="p-1 hover:text-sky-300 rounded-full"
              >
                <Volume2 className="w-3.5 h-3.5" />
              </span>
            </button>
          );
        })}
      </div>

      {/* Picture Match Grid (5 Pictures as in Screenshot) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {ACTIVITY_2_PICTURES.map((item) => {
          const isFlipped = flippedCards.includes(item.id);
          const assigned = matches[item.id];
          const isCorrect = hasChecked && assigned === item.text;
          const isWrong = hasChecked && assigned && assigned !== item.text;

          return (
            <div
              key={item.id}
              id={`sports-pic-${item.id}`}
              onClick={() => toggleCardFlip(item.id)}
              className={`rounded-2xl border p-3 flex flex-col items-center justify-between gap-3 transition-all cursor-pointer select-none ${
                hasChecked
                  ? isCorrect
                    ? 'border-emerald-500 bg-emerald-50/20 dark:bg-emerald-950/20'
                    : isWrong
                    ? 'border-rose-500 bg-rose-50/20 dark:bg-rose-950/20'
                    : isDark
                    ? 'bg-slate-900 border-slate-700'
                    : 'bg-white border-slate-200 shadow-xs'
                  : isDark
                  ? 'bg-slate-900 border-slate-700 hover:border-slate-600'
                  : 'bg-white border-slate-200 shadow-xs hover:border-slate-300'
              }`}
            >
              {/* Image Frame */}
              <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-slate-950">
                <img
                  src={item.image}
                  alt={item.alt}
                  className="w-full h-full object-cover"
                />

                {/* Speaker icon on picture card */}
                <button
                  type="button"
                  onClick={(e) => handlePlayWord(item.text, e)}
                  className="absolute bottom-2 right-2 p-1.5 rounded-lg bg-black/60 hover:bg-black/80 text-white backdrop-blur-xs border border-white/20 transition-colors cursor-pointer"
                  aria-label="Audio"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Translation reveal on flip (pure neutral, no gradients) */}
              {isFlipped && (
                <div className="w-full text-center py-1 border-t border-slate-200 dark:border-slate-700">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 block">
                    Español
                  </span>
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    {item.textEs}
                  </span>
                </div>
              )}

              {/* Drop / Selection Target Zone */}
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  handleAssignWord(item.id);
                }}
                className={`w-full min-h-[44px] rounded-xl border-2 border-dashed flex items-center justify-center px-3 py-2 text-center text-xs font-bold transition-colors cursor-pointer ${
                  assigned
                    ? hasChecked
                      ? isCorrect
                        ? 'border-emerald-500 bg-emerald-500 text-white'
                        : 'border-rose-500 bg-rose-500 text-white'
                      : isDark
                      ? 'border-sky-500 bg-sky-950/60 text-sky-200 border-solid'
                      : 'border-sky-500 bg-sky-50 text-sky-900 border-solid'
                    : selectedWord
                    ? 'border-sky-400 bg-sky-50/50 dark:bg-sky-950/20 text-sky-600 dark:text-sky-300 animate-pulse'
                    : isDark
                    ? 'border-slate-700 bg-slate-800/60 text-slate-400 hover:border-slate-500'
                    : 'border-slate-300 bg-slate-50 text-slate-500 hover:border-slate-400'
                }`}
              >
                {assigned ? (
                  <div className="flex items-center justify-between w-full">
                    <span className="truncate">{assigned}</span>
                    {hasChecked && (
                      <span>
                        {isCorrect ? (
                          <CheckCircle2 className="w-4 h-4 ml-1" />
                        ) : (
                          <XCircle className="w-4 h-4 ml-1" />
                        )}
                      </span>
                    )}
                  </div>
                ) : (
                  <span>Haz clic para asignar</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Footer: Check & Reset buttons */}
      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={handleReset}
          className={`px-4 py-2.5 rounded-xl border font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer ${
            isDark
              ? 'border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700'
              : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 shadow-xs'
          }`}
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reiniciar</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleCheck}
            disabled={Object.keys(matches).length === 0}
            className={`px-6 py-2.5 rounded-xl font-semibold text-xs shadow-md transition-all cursor-pointer ${
              Object.keys(matches).length === 0
                ? 'opacity-40 cursor-not-allowed bg-slate-400 text-white'
                : 'bg-sky-600 hover:bg-sky-500 text-white active:scale-95'
            }`}
          >
            Comprobar respuestas
          </button>

          {isAllCorrect && onNext && (
            <button
              type="button"
              onClick={onNext}
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 animate-in fade-in"
            >
              <span>Continuar a Actividad 3</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
