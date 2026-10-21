import React, { useState } from 'react';
import { Volume2, Check, RotateCcw, CheckCircle2, XCircle, RotateCw } from 'lucide-react';
import { speakEnglish, stopSpeaking, playFeedbackSound } from '../../utils/audio';
import { useTheme } from '../../context/ThemeContext';
import { CardSpeechControl } from '../CardSpeechControl';

interface TableRowItem {
  id: string;
  questionEn: string;
  questionEs: string;
  correctAnswer: string;
  correctAnswerEs: string;
}

interface InterviewFillTableExerciseProps {
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

export const InterviewFillTableExercise: React.FC<InterviewFillTableExerciseProps> = ({
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
  // Selected option from bank (for click-to-place on mobile)
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  // Flip states for table questions and bank options
  const [flippedQuestions, setFlippedQuestions] = useState<Record<string, boolean>>({});
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
      playFeedbackSound('click');
      setPlacedAnswers((prev) => {
        const next = { ...prev };
        delete next[rowId];
        return next;
      });
      setHasChecked(false);
    }
  };

  const handleSelectOptionChip = (opt: string) => {
    if (usedOptions.has(opt)) return;
    playFeedbackSound('click');
    setSelectedOption((prev) => (prev === opt ? null : opt));
  };

  const handlePlayAudio = (text: string, e: React.MouseEvent) => {
    e.stopPropagation();
    stopSpeaking();
    playFeedbackSound('click');
    speakEnglish(text, speechRate, accent);
  };

  const handleToggleQuestionFlip = (rowId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    playFeedbackSound('click');
    setFlippedQuestions((prev) => ({
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

  const handleCheck = () => {
    playFeedbackSound('click');
    setHasChecked(true);

    let allOk = true;
    for (const r of rows) {
      if (placedAnswers[r.id] !== r.correctAnswer) {
        allOk = false;
        break;
      }
    }

    setIsAllCorrect(allOk);
    if (allOk) {
      playFeedbackSound('correct');
      if (onSuccess) onSuccess();
    } else {
      playFeedbackSound('wrong');
    }
  };

  const handleClear = () => {
    playFeedbackSound('click');
    setPlacedAnswers({});
    setSelectedOption(null);
    setHasChecked(false);
    setIsAllCorrect(false);
  };

  return (
    <div className="w-full flex flex-col gap-6 select-none animate-in fade-in duration-200">
      {/* 1. REVERSIBLE INSTRUCTION CARD */}
      <div
        id="interview-act-4-instructions"
        onClick={() => {
          playFeedbackSound('click');
          setIsInstructionFlipped((prev) => !prev);
        }}
        className={`w-full p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer shadow-sm relative ${
          isDark
            ? 'bg-slate-900 border-slate-700 hover:border-sky-500/50 text-slate-100'
            : 'bg-white border-slate-200 hover:border-sky-400 text-slate-800'
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            <span className="text-[11px] font-mono uppercase font-bold tracking-wider text-sky-500 block mb-1">
              {isInstructionFlipped ? 'Instrucción (Español) · Clic para alternar' : 'Instructions (English) · Click to translate'}
            </span>
            <p className="text-base sm:text-lg font-medium leading-snug">
              {isInstructionFlipped
                ? exercise.instructionsEs || 'Escucha la entrevista radial y completa la tabla con la respuesta a cada pregunta.'
                : exercise.instructions || 'Listen to the radio interview, and fill in the table with the answer to each question.'}
            </p>
          </div>

          <CardSpeechControl
            textToSpeak={exercise.instructions || 'Listen to the radio interview, and fill in the table with the answer to each question.'}
            accent={accent}
            initialSpeed={speechRate}
            gender="female"
            size="md"
          />
        </div>
      </div>

      {/* 2. TABLE + OPTIONS POOL SIDE BY SIDE */}
      <div className="w-full flex flex-col lg:flex-row gap-6 items-start">
        {/* Table Column */}
        <div className="w-full lg:w-3/5 rounded-2xl border overflow-hidden shadow-sm bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
          {/* Table Header */}
          <div className="grid grid-cols-12 bg-slate-100 dark:bg-slate-800/80 px-4 py-3 border-b border-slate-200 dark:border-slate-700 text-xs font-mono font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
            <div className="col-span-6 sm:col-span-5">Question / Pregunta</div>
            <div className="col-span-6 sm:col-span-7">Answer / Respuesta</div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {rows.map((row) => {
              const placed = placedAnswers[row.id];
              const isQuestionFlipped = !!flippedQuestions[row.id];
              const isRowCorrect = hasChecked && placed === row.correctAnswer;
              const isRowWrong = hasChecked && placed && placed !== row.correctAnswer;

              return (
                <div
                  key={row.id}
                  className={`grid grid-cols-12 px-4 py-3.5 items-center gap-3 transition-colors ${
                    isRowCorrect
                      ? 'bg-emerald-500/10 dark:bg-emerald-950/20'
                      : isRowWrong
                      ? 'bg-rose-500/10 dark:bg-rose-950/20'
                      : 'hover:bg-slate-50/50 dark:hover:bg-slate-800/30'
                  }`}
                >
                  {/* Question cell */}
                  <div className="col-span-6 sm:col-span-5 flex items-start gap-2">
                    <button
                      type="button"
                      onClick={(e) => handlePlayAudio(row.questionEn, e)}
                      className="p-1 rounded text-slate-400 hover:text-sky-500 shrink-0 mt-0.5"
                      title="Listen question"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>

                    <div
                      onClick={(e) => handleToggleQuestionFlip(row.id, e)}
                      className="cursor-pointer group flex-1 min-w-0"
                      title="Clic para traducir"
                    >
                      <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 leading-snug group-hover:text-sky-600 dark:group-hover:text-sky-400">
                        {isQuestionFlipped ? row.questionEs : row.questionEn}
                      </p>
                      <span className="text-[10px] text-slate-400 group-hover:underline">
                        {isQuestionFlipped ? 'inglés' : 'traducir'}
                      </span>
                    </div>
                  </div>

                  {/* Answer Drop Slot */}
                  <div className="col-span-6 sm:col-span-7">
                    <div
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, row.id)}
                      onClick={() => handleSlotClick(row.id)}
                      className={`min-h-[46px] rounded-xl border-2 border-dashed p-2 transition-all flex items-center justify-between gap-2 cursor-pointer ${
                        placed
                          ? isRowCorrect
                            ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 border-solid'
                            : isRowWrong
                            ? 'border-rose-500 bg-rose-50 dark:bg-rose-950/30 border-solid'
                            : isDark
                            ? 'border-sky-500/50 bg-slate-800/90 text-white border-solid'
                            : 'border-sky-400 bg-sky-50 text-slate-900 border-solid shadow-xs'
                          : selectedOption
                          ? 'border-sky-400 bg-sky-50/30 dark:bg-sky-950/20 animate-pulse'
                          : isDark
                          ? 'border-slate-700 bg-slate-800/40 text-slate-500 hover:border-slate-600'
                          : 'border-slate-300 bg-slate-50/70 text-slate-400 hover:border-slate-400'
                      }`}
                    >
                      {placed ? (
                        <>
                          <span className="text-xs sm:text-sm font-medium leading-snug">
                            {placed}
                          </span>
                          <div className="flex items-center gap-1 shrink-0">
                            <button
                              type="button"
                              onClick={(e) => handlePlayAudio(placed, e)}
                              className="p-1 text-slate-400 hover:text-sky-500"
                              title="Listen"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                            {isRowCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                            {isRowWrong && <XCircle className="w-4 h-4 text-rose-500" />}
                          </div>
                        </>
                      ) : (
                        <span className="text-xs sm:text-sm text-slate-400 font-mono italic px-2">
                          {selectedOption ? 'Haz clic para colocar aquí' : 'Drag Here'}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Options Bank Column */}
        <div className="w-full lg:w-2/5 flex flex-col gap-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
              Opciones para arrastrar / hacer clic
            </span>
            <span className="text-xs text-slate-400">
              {Object.keys(placedAnswers).length} de {rows.length}
            </span>
          </div>

          <div className="flex flex-col gap-2.5">
            {optionsPool.map((opt) => {
              const isUsed = usedOptions.has(opt);
              const isSelected = selectedOption === opt;
              const isOptFlipped = !!flippedOptions[opt];
              const optEs = optionsPoolEs[opt] || opt;

              return (
                <div
                  key={opt}
                  draggable={!isUsed}
                  onDragStart={(e) => handleDragStart(e, opt)}
                  onClick={() => handleSelectOptionChip(opt)}
                  className={`p-3.5 rounded-xl border text-xs sm:text-sm font-semibold transition-all flex items-center justify-between gap-3 select-none ${
                    isUsed
                      ? 'opacity-35 bg-slate-200/50 dark:bg-slate-800/40 border-slate-300 dark:border-slate-700 line-through text-slate-400 cursor-not-allowed'
                      : isSelected
                      ? 'bg-sky-600 text-white border-sky-500 shadow-md ring-2 ring-sky-400 scale-[1.02] cursor-pointer'
                      : isDark
                      ? 'bg-slate-900 hover:bg-slate-800 text-slate-100 border-slate-800 hover:border-sky-500 cursor-grab shadow-xs'
                      : 'bg-white hover:bg-sky-50 text-slate-800 border-slate-200 hover:border-sky-300 shadow-xs cursor-grab'
                  }`}
                >
                  <span className="flex-1 min-w-0 leading-snug">
                    {isOptFlipped ? optEs : opt}
                  </span>

                  {!isUsed && (
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={(e) => handlePlayAudio(opt, e)}
                        className="p-1 text-slate-400 hover:text-sky-500"
                        title="Listen"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => handleToggleOptionFlip(opt, e)}
                        className="p-1 text-slate-400 hover:text-emerald-500 text-[10px] font-mono uppercase"
                        title="Translate"
                      >
                        {isOptFlipped ? 'EN' : 'ES'}
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={handleClear}
          className={`px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
            isDark
              ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
              : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 shadow-xs'
          }`}
        >
          <RotateCcw className="w-4 h-4" />
          <span>Limpiar</span>
        </button>

        <button
          onClick={handleCheck}
          disabled={Object.keys(placedAnswers).length === 0}
          className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 cursor-pointer shadow-md ${
            Object.keys(placedAnswers).length === 0
              ? 'opacity-40 cursor-not-allowed bg-slate-300 text-slate-500 dark:bg-slate-800 dark:text-slate-600'
              : 'bg-sky-600 hover:bg-sky-500 text-white shadow-sky-600/30'
          }`}
        >
          <Check className="w-4 h-4" />
          <span>Comprobar</span>
        </button>
      </div>
    </div>
  );
};
