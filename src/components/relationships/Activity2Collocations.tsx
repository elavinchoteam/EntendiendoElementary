import React, { useState } from 'react';
import { CheckCircle, XCircle, RotateCcw, Volume2, Sparkles, ArrowRight } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { speakEnglish, playFeedbackSound, stopSpeaking } from '../../utils/audio';
import { COLLOCATION_MATCHES, CollocationMatchItem } from '../../data/relationshipsData';
import { ReversibleTextCard } from './ReversibleTextCard';

interface Activity2CollocationsProps {
  speed?: number;
  accent?: 'US' | 'UK';
  onNext?: () => void;
}

export const Activity2Collocations: React.FC<Activity2CollocationsProps> = ({
  speed = 1.0,
  accent = 'US',
  onNext,
}) => {
  const { isDark } = useTheme();

  // Matched answers: index (0..4) -> string (chip)
  const [matches, setMatches] = useState<Record<number, string>>({});
  const [selectedBankChip, setSelectedBankChip] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [results, setResults] = useState<Record<number, boolean>>({});
  const [draggingOverRow, setDraggingOverRow] = useState<number | null>(null);

  const chipsBank = ['and old', 'picnic', 'home', 'fun', 'a fight'];

  const usedChips = Object.values(matches);
  const availableChips = chipsBank.filter((c) => !usedChips.includes(c));

  const handleSelectChipFromBank = (chip: string) => {
    if (isSubmitted && Object.values(results).every(Boolean)) return;
    playFeedbackSound('click');
    setSelectedBankChip(chip);
  };

  const handleAssignToRow = (rowIdx: number, chipToAssign?: string) => {
    if (isSubmitted && results[rowIdx]) return;
    const chip = chipToAssign || selectedBankChip;
    if (!chip) return;

    playFeedbackSound('click');
    setMatches((prev) => ({
      ...prev,
      [rowIdx]: chip,
    }));
    setSelectedBankChip(null);
    setIsSubmitted(false);
  };

  const handleRemoveMatch = (rowIdx: number) => {
    if (isSubmitted && results[rowIdx]) return;
    playFeedbackSound('click');
    setMatches((prev) => {
      const copy = { ...prev };
      delete copy[rowIdx];
      return copy;
    });
    setIsSubmitted(false);
  };

  const handleCheckAnswers = () => {
    playFeedbackSound('click');
    const newResults: Record<number, boolean> = {};
    let allCorrect = true;

    COLLOCATION_MATCHES.forEach((item, idx) => {
      const isCorrect = matches[idx]?.trim().toLowerCase() === item.target.trim().toLowerCase();
      newResults[idx] = isCorrect;
      if (!isCorrect) allCorrect = false;
    });

    setResults(newResults);
    setIsSubmitted(true);

    if (allCorrect) {
      playFeedbackSound('correct');
      stopSpeaking();
      speakEnglish('family picnic, phone home, young and old, have fun, start a fight', speed, accent);
    } else {
      playFeedbackSound('wrong');
    }
  };

  const handleReset = () => {
    playFeedbackSound('click');
    setMatches({});
    setSelectedBankChip(null);
    setIsSubmitted(false);
    setResults({});
  };

  const isAllAnswered = Object.keys(matches).length === COLLOCATION_MATCHES.length;
  const isAllCorrect = isSubmitted && Object.values(results).length === COLLOCATION_MATCHES.length && Object.values(results).every(Boolean);

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
              <span className="text-xs text-slate-400 font-medium">Actividad 2 de 7</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              Complete the phrases by dragging the correct word from the bank to column B.
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Completa las frases arrastrando la palabra correcta o haciendo clic en una opción y luego en la casilla B correspondiente.
            </p>
          </div>
        </div>
      </div>

      {/* Main Matching Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Table of Column A and Column B */}
        <div className="lg:col-span-8 space-y-4">
          <div
            className={`p-6 sm:p-8 rounded-3xl border shadow-sm ${
              isDark ? 'bg-slate-900/90 border-slate-700' : 'bg-white border-slate-200'
            }`}
          >
            {/* Table Header */}
            <div className="grid grid-cols-12 pb-3 mb-4 border-b-2 border-sky-500/30 text-xs font-black uppercase tracking-wider text-sky-700 dark:text-sky-300">
              <div className="col-span-5 flex items-center gap-2">
                <span>A</span>
                <span className="text-[11px] font-normal text-slate-400">(Parte 1)</span>
              </div>
              <div className="col-span-7 flex items-center gap-2">
                <span>B</span>
                <span className="text-[11px] font-normal text-slate-400">(Arrastra o coloca aquí)</span>
              </div>
            </div>

            {/* Rows */}
            <div className="space-y-3.5">
              {COLLOCATION_MATCHES.map((item, idx) => {
                const matchedVal = matches[idx];
                const isRowEvaluated = isSubmitted;
                const isRowCorrect = results[idx];
                const isRowHover = draggingOverRow === idx;

                return (
                  <div
                    key={idx}
                    className={`grid grid-cols-12 items-center p-3 sm:p-4 rounded-2xl border-2 transition-all ${
                      isRowEvaluated
                        ? isRowCorrect
                          ? 'border-emerald-500/80 bg-emerald-50/40 dark:bg-emerald-950/20'
                          : 'border-rose-400/80 bg-rose-50/40 dark:bg-rose-950/20'
                        : isDark
                        ? 'border-slate-800 bg-slate-800/50 hover:border-slate-700'
                        : 'border-slate-100 bg-slate-50/70 hover:border-slate-200'
                    }`}
                  >
                    {/* Column A */}
                    <div className="col-span-5 flex items-center gap-2 font-bold text-base sm:text-lg text-slate-800 dark:text-slate-100">
                      <span className="w-6 text-xs text-slate-400 font-mono">{idx + 1}.</span>
                      <span>{item.prefix}</span>
                    </div>

                    {/* Column B (Drop target) */}
                    <div className="col-span-7 flex items-center justify-between gap-2">
                      <div
                        onDrop={(e) => {
                          e.preventDefault();
                          setDraggingOverRow(null);
                          const chip = e.dataTransfer.getData('text/plain');
                          if (chip) handleAssignToRow(idx, chip);
                        }}
                        onDragOver={(e) => {
                          e.preventDefault();
                          setDraggingOverRow(idx);
                        }}
                        onDragLeave={() => setDraggingOverRow(null)}
                        onClick={() => {
                          if (selectedBankChip) {
                            handleAssignToRow(idx);
                          } else if (matchedVal) {
                            handleRemoveMatch(idx);
                          }
                        }}
                        className={`flex-1 min-h-[46px] px-4 py-2 rounded-xl border-2 border-dashed flex items-center justify-center font-bold text-sm sm:text-base cursor-pointer transition-all select-none ${
                          matchedVal
                            ? isRowEvaluated
                              ? isRowCorrect
                                ? 'bg-emerald-500 text-white border-emerald-600 shadow-sm'
                                : 'bg-rose-500 text-white border-rose-600 shadow-sm'
                              : 'bg-sky-500 text-white border-sky-600 shadow-sm'
                            : isRowHover
                            ? 'bg-sky-100 dark:bg-sky-950/80 border-sky-500 scale-102'
                            : selectedBankChip
                            ? 'bg-sky-50 dark:bg-sky-950/40 border-sky-400 text-sky-600 animate-pulse'
                            : isDark
                            ? 'bg-slate-800/80 border-slate-700 text-slate-400 hover:border-slate-600'
                            : 'bg-white border-slate-300 text-slate-400 hover:border-slate-400'
                        }`}
                      >
                        {matchedVal ? (
                          <span>{matchedVal}</span>
                        ) : (
                          <span className="text-xs font-normal italic tracking-wide text-slate-400">
                            Drag Here
                          </span>
                        )}
                      </div>

                      {/* Row status icon */}
                      {isRowEvaluated && (
                        <div className="shrink-0">
                          {isRowCorrect ? (
                            <CheckCircle className="w-5 h-5 text-emerald-500" />
                          ) : (
                            <XCircle className="w-5 h-5 text-rose-500" />
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Check & Reset Actions */}
            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1.5 transition-colors self-start"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Restablecer todo</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={!isAllAnswered || isAllCorrect}
                  onClick={handleCheckAnswers}
                  className={`px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-sm transition-all flex items-center gap-2 ${
                    !isAllAnswered || isAllCorrect
                      ? 'opacity-40 cursor-not-allowed bg-slate-300 dark:bg-slate-700 text-slate-500'
                      : 'bg-sky-500 hover:bg-sky-600 active:scale-95 text-white'
                  }`}
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Comprobar Respuestas</span>
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
        </div>

        {/* Right Column: Bank of Chips */}
        <div className="lg:col-span-4 space-y-4">
          <div
            className={`p-6 rounded-3xl border shadow-sm ${
              isDark ? 'bg-slate-900/90 border-slate-700' : 'bg-white border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-slate-800">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Banco de Respuestas:
              </span>
              <span className="text-[11px] text-slate-400 font-mono">
                {availableChips.length} disponibles
              </span>
            </div>

            <div className="flex flex-col gap-2.5">
              {chipsBank.map((chip, idx) => {
                const isUsed = usedChips.includes(chip);
                const isSelected = selectedBankChip === chip;

                return (
                  <div
                    key={idx}
                    draggable={!isUsed}
                    onDragStart={(e) => {
                      e.dataTransfer.setData('text/plain', chip);
                    }}
                    onClick={() => !isUsed && handleSelectChipFromBank(chip)}
                    className={`px-5 py-3 rounded-2xl border text-sm sm:text-base font-bold shadow-xs cursor-pointer select-none transition-all flex items-center justify-between ${
                      isUsed
                        ? 'opacity-30 border-dashed border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800/40 text-slate-400 line-through cursor-not-allowed'
                        : isSelected
                        ? 'bg-sky-500 text-white border-sky-600 ring-2 ring-sky-300 dark:ring-sky-800 scale-102 shadow-md'
                        : isDark
                        ? 'bg-slate-800 border-slate-700 text-slate-100 hover:border-sky-500 hover:bg-slate-750'
                        : 'bg-white border-slate-200 text-slate-800 hover:border-sky-400 hover:bg-sky-50/50 hover:shadow-xs'
                    }`}
                  >
                    <span>{chip}</span>
                    <span className="text-[10px] uppercase font-mono text-slate-400">
                      {isUsed ? 'Usado' : 'Colocar'}
                    </span>
                  </div>
                );
              })}
            </div>

            <p className="mt-4 text-[11px] text-slate-400 italic text-center">
              Arrastra una ficha a la columna B o haz clic para seleccionarla y luego toca la casilla de destino.
            </p>
          </div>

          {/* 3D Reversible Flip Card for Phrases & Translations */}
          <ReversibleTextCard
            englishText="family picnic (picnic familiar)\nphone home (llamar a casa)\nyoung and old (jóvenes y ancianos)\nhave fun (divertirse)\nstart a fight (empezar una pelea)"
            spanishText="Colocaciones y frases hechas de la unidad:\n• family picnic = un almuerzo al aire libre en familia\n• phone home = telefonear a la casa familiar\n• young and old = personas de todas las edades\n• have fun = pasarlo en grande, disfrutar\n• start a fight = iniciar una disputa o discusión"
            speechRate={speed}
            accent={accent}
            size="md"
          />
        </div>
      </div>
    </div>
  );
};
