import React, { useState } from 'react';
import { Volume2, Check, RotateCcw, CheckCircle2, XCircle, RotateCw } from 'lucide-react';
import { speakEnglish, stopSpeaking, playFeedbackSound } from '../../utils/audio';
import { useTheme } from '../../context/ThemeContext';
import { CardSpeechControl } from '../CardSpeechControl';
import { DoItArticleSidebar } from './DoItArticleSidebar';

interface TableRowItem {
  id: string;
  personEn: string;
  personEs: string;
  correctAnswer: string;
  correctAnswerEs: string;
}

interface DoItWhoSaysWhatExerciseProps {
  exercise: {
    instructions: string;
    instructionsEs: string;
    optionsPool: string[];
    optionsPoolEs: Record<string, string>;
    rows: TableRowItem[];
  };
  accent?: 'US' | 'UK';
  speechRate?: number;
  onSuccess?: () => void;
}

export const DoItWhoSaysWhatExercise: React.FC<DoItWhoSaysWhatExerciseProps> = ({
  exercise,
  accent = 'US',
  speechRate = 1.0,
  onSuccess,
}) => {
  const { isDark } = useTheme();

  // Reversible instruction card state
  const [isInstructionFlipped, setIsInstructionFlipped] = useState(false);

  // Placed answers: rowId -> optionText
  const [placedAnswers, setPlacedAnswers] = useState<Record<string, string>>({});
  // Selected option from bank (for click-to-place)
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  // Flip states for table persons and bank options
  const [flippedPersons, setFlippedPersons] = useState<Record<string, boolean>>({});
  const [flippedOptions, setFlippedOptions] = useState<Record<string, boolean>>({});

  // Check state
  const [hasChecked, setHasChecked] = useState(false);
  const [isAllCorrect, setIsAllCorrect] = useState(false);

  const optionsPool = exercise.optionsPool || [];
  const rows = exercise.rows || [];
  const optionsPoolEs = exercise.optionsPoolEs || {};

  const usedOptions = new Set(Object.values(placedAnswers));

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, opt: string) => {
    e.dataTransfer.setData('text/plain', opt);
    setSelectedOption(opt);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, rowId: string) => {
    e.preventDefault();
    const opt = e.dataTransfer.getData('text/plain') || selectedOption;
    if (opt) {
      playFeedbackSound('click');
      setPlacedAnswers((prev) => {
        const next = { ...prev };
        Object.keys(next).forEach((k) => {
          if (next[k] === opt) delete next[k];
        });
        next[rowId] = opt;
        return next;
      });
      setSelectedOption(null);
      setHasChecked(false);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleSlotClick = (rowId: string) => {
    if (selectedOption) {
      playFeedbackSound('click');
      setPlacedAnswers((prev) => {
        const next = { ...prev };
        Object.keys(next).forEach((k) => {
          if (next[k] === selectedOption) delete next[k];
        });
        next[rowId] = selectedOption;
        return next;
      });
      setSelectedOption(null);
      setHasChecked(false);
    } else if (placedAnswers[rowId]) {
      // Remove placed item
      playFeedbackSound('click');
      setPlacedAnswers((prev) => {
        const next = { ...prev };
        delete next[rowId];
        return next;
      });
      setHasChecked(false);
    }
  };

  const handleBankOptionClick = (opt: string) => {
    playFeedbackSound('click');
    if (selectedOption === opt) {
      setSelectedOption(null);
    } else {
      setSelectedOption(opt);
    }
  };

  const handleTogglePersonFlip = (rowId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    playFeedbackSound('click');
    setFlippedPersons((prev) => ({
      ...prev,
      [rowId]: !prev[rowId],
    }));
  };

  const handleToggleOptionFlip = (opt: string, e: React.MouseEvent) => {
    e.stopPropagation();
    playFeedbackSound('click');
    setFlippedOptions((prev) => ({
      ...prev,
      [opt]: !prev[opt],
    }));
  };

  const handlePlayAudio = (text: string, e: React.MouseEvent) => {
    e.stopPropagation();
    stopSpeaking();
    speakEnglish(text, speechRate, accent === 'UK' ? 'UK' : 'US');
  };

  const handleCheck = () => {
    const allPlaced = rows.every((r) => placedAnswers[r.id]);
    if (!allPlaced) {
      playFeedbackSound('wrong');
      setHasChecked(true);
      return;
    }

    const allRight = rows.every((r) => placedAnswers[r.id] === r.correctAnswer);
    setIsAllCorrect(allRight);
    setHasChecked(true);

    if (allRight) {
      playFeedbackSound('correct');
      if (onSuccess) onSuccess();
    } else {
      playFeedbackSound('wrong');
    }
  };

  const handleReset = () => {
    playFeedbackSound('click');
    setPlacedAnswers({});
    setSelectedOption(null);
    setHasChecked(false);
    setIsAllCorrect(false);
    setFlippedPersons({});
    setFlippedOptions({});
  };

  return (
    <div className="w-full flex flex-col items-center gap-6 animate-in fade-in duration-200 py-2 select-none">
      {/* Reversible Instruction Header Card */}
      <div className="w-full max-w-4xl perspective-1000">
        <div
          onClick={() => setIsInstructionFlipped((prev) => !prev)}
          className={`relative w-full rounded-2xl cursor-pointer transition-transform duration-500 transform-style-3d shadow-md ${
            isInstructionFlipped ? 'rotate-y-180' : ''
          }`}
          title="Click to flip translation"
        >
          {/* Front: English */}
          <div
            className={`w-full rounded-2xl p-4 sm:p-5 flex items-center justify-between border backface-hidden transition-colors ${
              isDark
                ? 'bg-slate-900 border-sky-500/30 text-white'
                : 'bg-white border-slate-200 text-slate-800'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-sky-500/10 text-sky-500 flex items-center justify-center font-bold text-sm">
                6
              </span>
              <div>
                <h3 className="font-bold text-base sm:text-lg">{exercise.instructions}</h3>
                <p className="text-xs text-slate-400 dark:text-slate-500">
                  Drag or click to place what each person said · Click to translate
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
              <CardSpeechControl
                textToSpeak={exercise.instructions}
                accent={accent}
                initialSpeed={speechRate}
              />
              <button
                type="button"
                onClick={() => setIsInstructionFlipped((prev) => !prev)}
                className="p-2 rounded-xl text-xs font-semibold text-sky-600 dark:text-sky-400 hover:bg-sky-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-1"
              >
                <RotateCw className="w-4 h-4" />
                <span className="hidden sm:inline">Español</span>
              </button>
            </div>
          </div>

          {/* Back: Spanish */}
          <div
            className={`absolute inset-0 w-full h-full rounded-2xl p-4 sm:p-5 flex items-center justify-between border backface-hidden rotate-y-180 transition-colors ${
              isDark
                ? 'bg-slate-900 border-emerald-500/40 text-white'
                : 'bg-white border-emerald-300 text-slate-800'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold text-sm">
                6
              </span>
              <div>
                <h3 className="font-bold text-base sm:text-lg font-serif italic text-emerald-600 dark:text-emerald-400">
                  {exercise.instructionsEs}
                </h3>
                <p className="text-xs text-slate-400 dark:text-slate-500 font-sans not-italic">
                  Arrastra o haz clic para colocar lo que dijo cada persona · Clic para volver a inglés
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsInstructionFlipped((prev) => !prev)}
              className="p-2 rounded-xl text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-1"
            >
              <RotateCw className="w-4 h-4" />
              <span>Inglés</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Container: Left Article + Right Table with Options Pool */}
      <div className="w-full max-w-5xl flex flex-col lg:flex-row gap-6 items-start justify-center">
        {/* Left: Article Sidebar */}
        <DoItArticleSidebar accent={accent} speechRate={speechRate} />

        {/* Right: Table + Options Pool */}
        <div className="flex-1 w-full flex flex-col gap-6">
          {/* Table Container */}
          <div
            className={`w-full rounded-3xl border shadow-sm overflow-hidden transition-all duration-200 ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}
          >
            {/* Table Header */}
            <div
              className={`grid grid-cols-1 sm:grid-cols-5 p-4 border-b text-xs font-bold uppercase tracking-wider ${
                isDark ? 'bg-slate-800/80 border-slate-800 text-sky-400' : 'bg-sky-50 border-slate-200 text-sky-700'
              }`}
            >
              <div className="sm:col-span-2">Person</div>
              <div className="sm:col-span-3">Sentence</div>
            </div>

            {/* Table Rows */}
            <div className="divide-y divide-inherit/20">
              {rows.map((row) => {
                const answer = placedAnswers[row.id];
                const isPersonFlipped = Boolean(flippedPersons[row.id]);
                const isCorrect = answer === row.correctAnswer;

                return (
                  <div
                    key={row.id}
                    className="grid grid-cols-1 sm:grid-cols-5 p-4 sm:p-5 items-center gap-3 transition-colors"
                  >
                    {/* Person Column */}
                    <div
                      onClick={(e) => handleTogglePersonFlip(row.id, e)}
                      className="sm:col-span-2 cursor-pointer group pr-2"
                      title="Click to translate person"
                    >
                      <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-0.5">
                        <span className="font-mono">Speaker</span>
                        <RotateCw className="w-2.5 h-2.5 opacity-60 group-hover:opacity-100 text-sky-500" />
                      </div>
                      <p className="font-bold text-sm sm:text-base text-slate-900 dark:text-white leading-snug">
                        {isPersonFlipped ? (
                          <span className="font-serif italic text-emerald-600 dark:text-emerald-400">
                            {row.personEs}
                          </span>
                        ) : (
                          row.personEn
                        )}
                      </p>
                    </div>

                    {/* Sentence Drop Slot Column */}
                    <div className="sm:col-span-3">
                      <div
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, row.id)}
                        onClick={() => handleSlotClick(row.id)}
                        className={`min-h-[50px] p-2.5 rounded-2xl border-2 border-dashed transition-all flex items-center justify-between cursor-pointer ${
                          answer
                            ? hasChecked
                              ? isCorrect
                                ? 'border-emerald-500 bg-emerald-500/10 text-emerald-800 dark:text-emerald-200 border-solid'
                                : 'border-rose-500 bg-rose-500/10 text-rose-800 dark:text-rose-200 border-solid'
                              : 'border-sky-500 bg-sky-500/10 text-slate-900 dark:text-white border-solid'
                            : isDark
                            ? 'border-slate-700 bg-slate-800/40 hover:border-sky-400 text-slate-500'
                            : 'border-slate-300 bg-slate-50 hover:border-sky-400 text-slate-400'
                        }`}
                      >
                        {answer ? (
                          <div className="flex items-center justify-between w-full">
                            <span className="font-semibold text-sm sm:text-base pr-2">{answer}</span>
                            <div className="flex items-center gap-1 shrink-0">
                              <button
                                type="button"
                                onClick={(e) => handlePlayAudio(answer, e)}
                                className="p-1 rounded-lg hover:text-sky-500 transition-colors"
                                title="Listen"
                              >
                                <Volume2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ) : (
                          <span className="text-xs sm:text-sm font-medium tracking-wide mx-auto select-none opacity-60">
                            {selectedOption ? 'Click to place selected sentence' : 'Drag Here'}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Options Pool */}
          <div
            className={`w-full p-5 sm:p-6 rounded-3xl border shadow-sm transition-all duration-200 ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-inherit/20 mb-3 text-xs text-slate-400">
              <span className="font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                Word Bank (Drag or Click to Select):
              </span>
              <span>There are more words than you need</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
              {optionsPool.map((opt) => {
                const isUsed = usedOptions.has(opt);
                const isSelected = selectedOption === opt;
                const isFlipped = Boolean(flippedOptions[opt]);

                return (
                  <div
                    key={opt}
                    draggable={!isUsed}
                    onDragStart={(e) => handleDragStart(e, opt)}
                    onClick={() => !isUsed && handleBankOptionClick(opt)}
                    className={`p-3 rounded-2xl border text-sm font-semibold transition-all duration-150 flex items-center justify-between gap-2 select-none ${
                      isUsed
                        ? 'opacity-30 border-dashed border-inherit/30 cursor-not-allowed bg-slate-100 dark:bg-slate-800'
                        : isSelected
                        ? 'ring-2 ring-sky-500 bg-sky-50 dark:bg-sky-950/40 text-sky-900 dark:text-sky-200 border-sky-500 shadow-sm cursor-pointer scale-[1.02]'
                        : isDark
                        ? 'bg-slate-800 border-slate-700 text-slate-200 hover:border-sky-400 hover:bg-slate-700 cursor-pointer shadow-xs'
                        : 'bg-slate-50 border-slate-200 text-slate-800 hover:border-sky-400 hover:bg-white cursor-pointer shadow-xs'
                    }`}
                  >
                    <span
                      onClick={(e) => handleToggleOptionFlip(opt, e)}
                      className="truncate flex-1"
                      title="Click to toggle translation"
                    >
                      {isFlipped ? (
                        <span className="font-serif italic text-emerald-600 dark:text-emerald-400">
                          {optionsPoolEs[opt] || opt}
                        </span>
                      ) : (
                        opt
                      )}
                    </span>

                    <button
                      type="button"
                      onClick={(e) => handlePlayAudio(opt, e)}
                      className="p-1 rounded text-slate-400 hover:text-sky-500 shrink-0"
                      title="Listen"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Feedback & Action Buttons */}
          {hasChecked && (
            <div
              className={`p-3.5 rounded-2xl text-xs sm:text-sm flex items-center gap-2.5 animate-in fade-in duration-200 ${
                isAllCorrect
                  ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300'
                  : 'bg-rose-500/10 border border-rose-500/30 text-rose-700 dark:text-rose-300'
              }`}
            >
              {isAllCorrect ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
              ) : (
                <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
              )}
              <p className="font-semibold">
                {isAllCorrect
                  ? '¡Excelente! Has emparejado correctamente cada persona con su oración.'
                  : 'Una o más respuestas no son correctas. Consulta el artículo y vuelve a intentarlo.'}
              </p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-end gap-3">
            <button
              type="button"
              onClick={handleReset}
              className={`w-full sm:w-auto px-5 py-3 rounded-2xl border font-semibold text-sm transition-all cursor-pointer flex items-center justify-center gap-2 ${
                isDark
                  ? 'border-slate-700 hover:bg-slate-800 text-slate-300'
                  : 'border-slate-300 hover:bg-slate-100 text-slate-700 shadow-xs'
              }`}
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reiniciar</span>
            </button>

            <button
              type="button"
              onClick={handleCheck}
              className="w-full sm:w-auto px-7 py-3 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm shadow-md shadow-sky-600/30 transition-all cursor-pointer flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95"
            >
              <Check className="w-4 h-4" />
              <span>Comprobar Tabla</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
