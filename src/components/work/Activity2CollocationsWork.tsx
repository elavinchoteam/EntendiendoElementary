import React, { useState } from 'react';
import { CheckCircle, XCircle, RotateCcw, Volume2, Sparkles, ArrowRight } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { speakEnglish, playFeedbackSound, stopSpeaking } from '../../utils/audio';
import { WORK_COLLOCATION_MATCHES, CollocationMatchItem } from '../../data/workData';
import { ReversibleTextCard } from './ReversibleTextCard';

interface Activity2CollocationsWorkProps {
  speed?: number;
  accent?: 'US' | 'UK';
  onNext?: () => void;
}

export const Activity2CollocationsWork: React.FC<Activity2CollocationsWorkProps> = ({
  speed = 1.0,
  accent = 'US',
  onNext,
}) => {
  const { isDark } = useTheme();

  // Matched answers: index (0..5) -> string (chip)
  const [matches, setMatches] = useState<Record<number, string>>({});
  const [selectedBankChip, setSelectedBankChip] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [results, setResults] = useState<Record<number, boolean>>({});
  const [draggingOverRow, setDraggingOverRow] = useState<number | null>(null);

  // Bank of chips in the order shown in the screenshot
  const chipsBank = ['a report', 'a high salary', 'a break', 'a suit', 'an office', 'a business'];

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

  const handleCheck = () => {
    playFeedbackSound('click');
    const newResults: Record<number, boolean> = {};
    let allOk = true;

    WORK_COLLOCATION_MATCHES.forEach((item, idx) => {
      const matched = matches[idx];
      const isCorrect = matched === item.target;
      newResults[idx] = isCorrect;
      if (!isCorrect) allOk = false;
    });

    setResults(newResults);
    setIsSubmitted(true);

    if (allOk && Object.keys(matches).length === WORK_COLLOCATION_MATCHES.length) {
      playFeedbackSound('correct');
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

  const handleSpeakPhrase = (phrase: string) => {
    stopSpeaking();
    speakEnglish(phrase, speed, accent, undefined, undefined, 'female');
  };

  const totalAnswered = Object.keys(matches).length;
  const isAllAnswered = totalAnswered === WORK_COLLOCATION_MATCHES.length;
  const isAllCorrect = isSubmitted && isAllAnswered && Object.values(results).every(Boolean);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
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
                Unidad 9 · Sección 7
              </span>
              <span className="text-xs text-slate-400 font-medium">Actividad 2 de 7</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              Complete the phrases by dragging the correct word from the bank to column B.
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Completa las frases arrastrando la palabra correcta del banco a la columna B (o haz clic en la opción y luego en el espacio).
            </p>
          </div>
        </div>
      </div>

      {/* Main Matching Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Matching Table (Column A & B) */}
        <div className="lg:col-span-8 space-y-4">
          <div
            className={`p-6 rounded-3xl border shadow-sm ${
              isDark ? 'bg-slate-900/90 border-slate-700' : 'bg-white border-slate-200'
            }`}
          >
            {/* Table Header */}
            <div className="grid grid-cols-12 pb-3 mb-4 border-b border-slate-200 dark:border-slate-800 text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
              <span className="col-span-5 px-3">A</span>
              <span className="col-span-6 px-3">B</span>
              <span className="col-span-1 text-center">Audio</span>
            </div>

            {/* Rows */}
            <div className="space-y-3">
              {WORK_COLLOCATION_MATCHES.map((item, idx) => {
                const matchedChip = matches[idx];
                const hasResult = isSubmitted && results[idx] !== undefined;
                const isCorrect = hasResult && results[idx];
                const isWrong = hasResult && !results[idx];
                const isDragTarget = draggingOverRow === idx;

                return (
                  <div
                    key={item.prefix}
                    className={`grid grid-cols-12 items-center p-3 rounded-2xl border transition-all duration-200 ${
                      isCorrect
                        ? 'border-emerald-500 bg-emerald-50/40 dark:bg-emerald-950/20'
                        : isWrong
                        ? 'border-rose-400 bg-rose-50/40 dark:bg-rose-950/20'
                        : isDragTarget
                        ? 'border-sky-500 bg-sky-50/50 dark:bg-sky-950/30 ring-2 ring-sky-300'
                        : isDark
                        ? 'border-slate-800 bg-slate-800/60 hover:border-slate-700'
                        : 'border-slate-200 bg-slate-50/70 hover:border-slate-300'
                    }`}
                  >
                    {/* Column A (Prefix) */}
                    <div className="col-span-5 px-3 flex items-center gap-2">
                      <span className="font-bold text-base text-slate-800 dark:text-slate-100">
                        {item.prefix}
                      </span>
                    </div>

                    {/* Column B (Drop Zone) */}
                    <div
                      className="col-span-6 px-2"
                      onDragOver={(e) => {
                        e.preventDefault();
                        setDraggingOverRow(idx);
                      }}
                      onDragLeave={() => setDraggingOverRow(null)}
                      onDrop={(e) => {
                        e.preventDefault();
                        setDraggingOverRow(null);
                        const data = e.dataTransfer.getData('text/plain');
                        if (data) handleAssignToRow(idx, data);
                      }}
                      onClick={() => {
                        if (matchedChip) {
                          handleRemoveMatch(idx);
                        } else if (selectedBankChip) {
                          handleAssignToRow(idx);
                        }
                      }}
                    >
                      {matchedChip ? (
                        <div
                          className={`px-4 py-2 rounded-xl font-semibold text-sm flex items-center justify-between shadow-xs transition-transform cursor-pointer ${
                            isCorrect
                              ? 'bg-emerald-600 text-white'
                              : isWrong
                              ? 'bg-rose-500 text-white'
                              : isDark
                              ? 'bg-sky-600 text-white'
                              : 'bg-sky-500 text-white'
                          }`}
                          title="Haz clic para quitar"
                        >
                          <span>{matchedChip}</span>
                          <span className="text-xs opacity-75 ml-2 hover:opacity-100">✕</span>
                        </div>
                      ) : (
                        <div
                          className={`h-11 rounded-xl border-2 border-dashed flex items-center justify-center text-xs font-semibold transition-colors cursor-pointer ${
                            selectedBankChip
                              ? 'border-sky-400 bg-sky-50/50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-300 animate-pulse'
                              : isDark
                              ? 'border-slate-700 text-slate-500 hover:border-slate-600'
                              : 'border-slate-300 text-slate-400 hover:border-slate-400 hover:bg-white'
                          }`}
                        >
                          Drag Here
                        </div>
                      )}
                    </div>

                    {/* Audio & Status Icon */}
                    <div className="col-span-1 flex items-center justify-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleSpeakPhrase(item.fullPhrase)}
                        className={`p-1.5 rounded-lg transition-colors ${
                          isDark
                            ? 'hover:bg-slate-700 text-slate-400 hover:text-sky-400'
                            : 'hover:bg-slate-200 text-slate-500 hover:text-sky-600'
                        }`}
                        title="Escuchar frase completa"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>

                      {hasResult && (
                        <div>
                          {isCorrect ? (
                            <CheckCircle className="w-4 h-4 text-emerald-500" />
                          ) : (
                            <XCircle className="w-4 h-4 text-rose-500" />
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Actions Bar */}
            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reiniciar</span>
              </button>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleCheck}
                  disabled={!isAllAnswered}
                  className="px-6 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-sm shadow-md transition-all cursor-pointer"
                >
                  Comprobar
                </button>

                {isAllCorrect && onNext && (
                  <button
                    type="button"
                    onClick={onNext}
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Siguiente</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Bank of Options */}
        <div className="lg:col-span-4 space-y-4">
          <div
            className={`p-6 rounded-3xl border shadow-sm space-y-3 ${
              isDark ? 'bg-slate-900/90 border-slate-700' : 'bg-white border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-sky-500" />
                Banco de Respuestas
              </span>
              <span className="text-xs font-mono text-slate-400">
                {availableChips.length} de {chipsBank.length}
              </span>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              Haz clic en una ficha y luego en la fila correspondiente, o arrástrala:
            </p>

            <div className="flex flex-col gap-2.5">
              {chipsBank.map((chip) => {
                const isUsed = usedChips.includes(chip);
                const isSelected = selectedBankChip === chip;

                return (
                  <div
                    key={chip}
                    draggable={!isUsed}
                    onDragStart={(e) => {
                      e.dataTransfer.setData('text/plain', chip);
                    }}
                    onClick={() => !isUsed && handleSelectChipFromBank(chip)}
                    className={`w-full px-4 py-3 rounded-2xl border font-semibold text-sm transition-all duration-150 select-none flex items-center justify-between ${
                      isUsed
                        ? 'opacity-35 cursor-not-allowed border-dashed bg-slate-100 dark:bg-slate-800/40 text-slate-400 line-through'
                        : isSelected
                        ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 ring-2 ring-sky-300 shadow-md cursor-pointer'
                        : isDark
                        ? 'bg-slate-800 border-slate-700 text-slate-200 hover:border-slate-500 hover:bg-slate-750 cursor-grab active:cursor-grabbing shadow-xs'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-sky-400 hover:bg-sky-50/30 cursor-grab active:cursor-grabbing shadow-xs'
                    }`}
                  >
                    <span>{chip}</span>
                    <span className="text-[11px] font-mono text-slate-400">::</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Reversible Card for Collocations Translations */}
          <ReversibleTextCard
            englishText={WORK_COLLOCATION_MATCHES.map(
              (m) => `• ${m.prefix} + ${m.target} = "${m.fullPhrase}"`
            ).join('\n')}
            spanishText={WORK_COLLOCATION_MATCHES.map(
              (m) => `• ${m.fullPhrase.toUpperCase()}: ${m.translation}`
            ).join('\n')}
            grammarTip="Las colocaciones verbales son combinaciones naturales de palabras en inglés (ej: 'take a break' en lugar de 'make a break', 'write a report', 'wear a suit')."
            speechRate={speed}
            accent={accent}
            size="md"
            frontLabel="Colocaciones en Inglés"
            backLabel="Traducciones y Usos en Español"
          />
        </div>
      </div>
    </div>
  );
};
