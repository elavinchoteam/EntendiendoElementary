import React, { useState } from 'react';
import { Volume2, Trophy, ArrowRight } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { SportsMediaCard } from './SportsMediaCard';
import { speakEnglish } from '../../utils/audio';

interface SportsActivity1Props {
  currentRate: number;
  onRateChange?: (rate: number) => void;
  accent?: 'US' | 'UK';
  onNext?: () => void;
}

export const SportsActivity1: React.FC<SportsActivity1Props> = ({
  currentRate,
  onRateChange,
  accent = 'US',
  onNext,
}) => {
  const { isDark } = useTheme();

  // Instruction card flip state
  const [isInstructionFlipped, setIsInstructionFlipped] = useState(false);

  const instructionEn =
    "Listen to Jack Hill's sports report on the radio. Click any sentence to see its translation. Use the speaker button to hear each sentence.";
  const instructionEs =
    "Escucha el informe deportivo de Jack Hill en la radio. Haz clic en cualquier oración para ver su traducción. Usa el botón del parlante para escuchar cada oración.";

  const handlePlayInstruction = (e: React.MouseEvent) => {
    e.stopPropagation();
    speakEnglish(instructionEn, currentRate, accent === 'UK' ? 'UK' : 'US');
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Reversible Instruction Header Card (Clean neutral, no gradients, no flip text) */}
      <div
        id="sports-act1-instruction-card"
        onClick={() => setIsInstructionFlipped(!isInstructionFlipped)}
        className={`w-full rounded-2xl border p-4 sm:p-5 transition-all duration-300 cursor-pointer select-none ${
          isDark
            ? 'bg-slate-900 border-slate-700 text-slate-100'
            : 'bg-white border-slate-200 text-slate-900 shadow-xs'
        }`}
      >
        <div className="w-full flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 shrink-0">
              <Trophy className="w-5 h-5" />
            </span>
            <div>
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 mb-0.5">
                {isInstructionFlipped ? 'Instrucciones' : 'Instructions'}
              </div>
              <p className="text-sm sm:text-base leading-relaxed">
                {isInstructionFlipped ? instructionEs : instructionEn}
              </p>
            </div>
          </div>

          {/* Speaker button with ONLY speaker icon */}
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

      {/* Main Sports Media & Reversible Transcript Card */}
      <SportsMediaCard
        currentRate={currentRate}
        onRateChange={onRateChange}
        accent={accent}
        highlightCurrentSentence={true}
        showTranscript={true}
      />

      {/* Bottom Continue Action */}
      {onNext && (
        <div className="flex justify-end mt-2">
          <button
            type="button"
            onClick={onNext}
            className="px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer active:scale-95"
          >
            <span>Continuar a Actividad 2</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
