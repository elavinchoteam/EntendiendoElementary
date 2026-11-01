import React, { useState } from 'react';
import {
  Check,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Volume2,
  RefreshCw,
  Sparkles,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { speakEnglish, stopSpeaking, playFeedbackSound } from '../../utils/audio';
import { TammyEmailCard } from './TammyEmailCard';
import { ACTIVITY_3_QUESTIONS, VocabularyQuestionItem } from '../../data/grumblesDepartmentStoreData';

interface Activity3VocabularySimilarProps {
  speed?: number;
  accent?: 'US' | 'UK';
}

export const Activity3VocabularySimilar: React.FC<Activity3VocabularySimilarProps> = ({
  speed = 1.0,
  accent = 'US',
}) => {
  const { isDark } = useTheme();

  // Instruction flip
  const [isHeaderFlipped, setIsHeaderFlipped] = useState(false);
  const instructionEn =
    "Read about Tammy's summer job. Then find the words that are similar in meaning to the highlighted words in the sentences.";
  const instructionEs =
    'Lee sobre el trabajo de verano de Tammy. Luego encuentra las palabras que tengan un significado similar a las palabras resaltadas en las oraciones.';

  // Selected options: questionId -> optionId
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});

  // Flipped state for questions and options
  const [flippedQuestions, setFlippedQuestions] = useState<Record<string, boolean>>({});
  const [flippedOptions, setFlippedOptions] = useState<Record<string, boolean>>({});

  // Check state
  const [hasChecked, setHasChecked] = useState(false);
  const [isAllCorrect, setIsAllCorrect] = useState(false);

  const handleSelectOption = (qId: string, optId: string) => {
    playFeedbackSound('click');
    setSelectedAnswers((prev) => ({
      ...prev,
      [qId]: optId,
    }));
    setHasChecked(false);
  };

  const handleToggleQuestionFlip = (qId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    playFeedbackSound('click');
    setFlippedQuestions((prev) => ({
      ...prev,
      [qId]: !prev[qId],
    }));
  };

  const handleToggleOptionFlip = (optKey: string, e: React.MouseEvent) => {
    e.stopPropagation();
    playFeedbackSound('click');
    setFlippedOptions((prev) => ({
      ...prev,
      [optKey]: !prev[optKey],
    }));
  };

  const handlePlayAudio = (textEn: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    stopSpeaking();
    playFeedbackSound('click');
    speakEnglish(textEn, speed, accent);
  };

  const handleCheck = () => {
    playFeedbackSound('click');
    setHasChecked(true);

    const allCorrect = ACTIVITY_3_QUESTIONS.every(
      (q) => selectedAnswers[q.id] === q.correctAnswerId
    );

    setIsAllCorrect(allCorrect);
    if (allCorrect) {
      playFeedbackSound('correct');
    } else {
      playFeedbackSound('wrong');
    }
  };

  const handleReset = () => {
    playFeedbackSound('click');
    setSelectedAnswers({});
    setHasChecked(false);
    setIsAllCorrect(false);
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-4">
      {/* Reversible Instruction Header Card */}
      <div
        className={`p-3.5 sm:p-4 rounded-2xl border transition-all shadow-xs ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        }`}
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 text-[11px] font-bold rounded-md bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 uppercase tracking-wider font-mono">
                Actividad 3 · Similar in meaning
              </span>
              <span className="text-xs text-slate-400 font-medium hidden sm:inline">
                {isHeaderFlipped ? 'Español' : 'English'}
              </span>
            </div>
            {!isHeaderFlipped ? (
              <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 leading-relaxed">
                {instructionEn}
              </p>
            ) : (
              <p className="text-xs sm:text-sm font-medium italic text-emerald-800 dark:text-emerald-300 leading-relaxed font-serif">
                {instructionEs}
              </p>
            )}
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => {
                playFeedbackSound('click');
                setIsHeaderFlipped((prev) => !prev);
              }}
              className={`w-8 h-8 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                isHeaderFlipped
                  ? 'bg-emerald-500 text-white border-emerald-600'
                  : isDark
                  ? 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
                  : 'bg-slate-100 border-slate-200 text-slate-700 hover:text-slate-900'
              }`}
              title="Voltear instrucción al español"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isHeaderFlipped ? 'rotate-180' : ''}`} />
            </button>
            <button
              type="button"
              onClick={(e) => handlePlayAudio(instructionEn, e)}
              className={`w-8 h-8 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                isDark
                  ? 'bg-slate-800 border-slate-700 text-sky-400 hover:text-white'
                  : 'bg-slate-100 border-slate-200 text-sky-600 hover:text-sky-800'
              }`}
              title="Escuchar instrucción"
            >
              <Volume2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main 2-column layout matching screenshot */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left: Email Card */}
        <div className="lg:col-span-6">
          <TammyEmailCard speed={speed} accent={accent} />
        </div>

        {/* Right: 3 Vocabulary Questions */}
        <div className="lg:col-span-6 space-y-4">
          <div
            className={`p-4 sm:p-5 rounded-2xl border ${
              isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}
          >
            <div className="space-y-6">
              {ACTIVITY_3_QUESTIONS.map((q, qIndex) => {
                const selectedOptId = selectedAnswers[q.id];
                const isQCorrect = selectedOptId === q.correctAnswerId;
                const isQFlipped = !!flippedQuestions[q.id];

                return (
                  <div
                    key={q.id}
                    className={`p-3.5 rounded-xl border transition-all ${
                      hasChecked
                        ? isQCorrect
                          ? 'border-emerald-400 bg-emerald-50/40 dark:bg-emerald-950/20'
                          : 'border-rose-400 bg-rose-50/40 dark:bg-rose-950/20'
                        : isDark
                        ? 'border-slate-800 bg-slate-900/60'
                        : 'border-slate-200 bg-slate-50/50'
                    }`}
                  >
                    {/* Question Header with sentence & highlighted word */}
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 block mb-1">
                          Pregunta {qIndex + 1}
                        </span>

                        {!isQFlipped ? (
                          <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white leading-relaxed">
                            {q.sentence.split(q.highlightedWord).map((chunk, i, arr) => (
                              <React.Fragment key={i}>
                                {chunk}
                                {i < arr.length - 1 && (
                                  <mark className="bg-yellow-200 dark:bg-amber-400/30 text-amber-950 dark:text-amber-200 px-1 py-0.5 rounded font-bold">
                                    {q.highlightedWord}
                                  </mark>
                                )}
                              </React.Fragment>
                            ))}
                          </p>
                        ) : (
                          <p className="text-xs sm:text-sm font-medium italic text-emerald-800 dark:text-emerald-300 leading-relaxed font-serif">
                            {q.sentenceEs} ({q.highlightedWordEs})
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          type="button"
                          onClick={(e) => handleToggleQuestionFlip(q.id, e)}
                          className={`w-6 h-6 rounded-md border flex items-center justify-center transition-all cursor-pointer ${
                            isQFlipped
                              ? 'bg-emerald-500 text-white border-emerald-600'
                              : isDark
                              ? 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
                              : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900'
                          }`}
                          title={isQFlipped ? 'Ver en inglés' : 'Ver traducción en español'}
                        >
                          <RefreshCw className={`w-3 h-3 ${isQFlipped ? 'rotate-180' : ''}`} />
                        </button>

                        <button
                          type="button"
                          onClick={(e) => handlePlayAudio(q.sentence, e)}
                          className={`w-6 h-6 rounded-md border flex items-center justify-center transition-all cursor-pointer ${
                            isDark
                              ? 'bg-slate-800 border-slate-700 text-sky-400 hover:text-white'
                              : 'bg-white border-slate-200 text-sky-600 hover:text-sky-800'
                          }`}
                          title="Escuchar oración"
                        >
                          <Volume2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    {/* Radio Options */}
                    <div className="space-y-2">
                      {q.options.map((opt) => {
                        const isSelected = selectedOptId === opt.id;
                        const optKey = `${q.id}-${opt.id}`;
                        const isOptFlipped = !!flippedOptions[optKey];
                        const isThisCorrect = opt.id === q.correctAnswerId;

                        let optionClass = isDark
                          ? 'border-slate-800 bg-slate-900/80 hover:bg-slate-800/80'
                          : 'border-slate-200 bg-white hover:bg-slate-50';

                        if (isSelected) {
                          optionClass = isDark
                            ? 'border-sky-500 bg-sky-950/40 text-sky-200 ring-1 ring-sky-500/40'
                            : 'border-sky-400 bg-sky-50 text-sky-900 ring-1 ring-sky-400/40';
                        }

                        if (hasChecked) {
                          if (isThisCorrect) {
                            optionClass =
                              'border-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-100';
                          } else if (isSelected && !isThisCorrect) {
                            optionClass =
                              'border-rose-400 bg-rose-50 dark:bg-rose-950/40 text-rose-950 dark:text-rose-100';
                          }
                        }

                        return (
                          <div
                            key={opt.id}
                            onClick={() => handleSelectOption(q.id, opt.id)}
                            className={`p-2.5 rounded-lg border flex items-center justify-between gap-2 transition-all cursor-pointer select-none ${optionClass}`}
                          >
                            <div className="flex items-center gap-2.5 flex-1 min-w-0">
                              <div
                                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                                  isSelected
                                    ? 'border-sky-500 bg-sky-500'
                                    : isDark
                                    ? 'border-slate-500 bg-slate-800'
                                    : 'border-slate-400 bg-white'
                                }`}
                              >
                                {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                              </div>

                              <div className="flex-1 min-w-0">
                                {!isOptFlipped ? (
                                  <span className="text-xs sm:text-sm font-medium">
                                    {opt.text}
                                  </span>
                                ) : (
                                  <span className="text-xs sm:text-sm font-medium italic text-emerald-800 dark:text-emerald-300 font-serif">
                                    {opt.textEs}
                                  </span>
                                )}
                              </div>
                            </div>

                            <div className="flex items-center gap-1 shrink-0">
                              <button
                                type="button"
                                onClick={(e) => handleToggleOptionFlip(optKey, e)}
                                className="w-5 h-5 rounded flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer"
                                title="Traducir opción"
                              >
                                <RefreshCw className={`w-2.5 h-2.5 ${isOptFlipped ? 'rotate-180' : ''}`} />
                              </button>

                              <button
                                type="button"
                                onClick={(e) => handlePlayAudio(opt.text, e)}
                                className="w-5 h-5 rounded flex items-center justify-center text-sky-500 hover:text-sky-700 cursor-pointer"
                                title="Escuchar opción"
                              >
                                <Volume2 className="w-2.5 h-2.5" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Feedback Explanation */}
                    {hasChecked && (
                      <div className="mt-3 pt-2 border-t border-slate-200/60 dark:border-slate-800/60 text-xs">
                        <div
                          className={`flex items-center gap-1 font-semibold ${
                            isQCorrect
                              ? 'text-emerald-600 dark:text-emerald-400'
                              : 'text-rose-600 dark:text-rose-400'
                          }`}
                        >
                          {isQCorrect ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              ¡Correcto!
                            </>
                          ) : (
                            <>
                              <XCircle className="w-3.5 h-3.5" />
                              Incorrecto.
                            </>
                          )}
                          <span className="font-normal text-slate-600 dark:text-slate-300 ml-1">
                            {q.explanation}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 italic font-serif mt-0.5">
                          {q.explanationEs}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Check / Reset Buttons */}
            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleReset}
                className={`px-3.5 py-2 rounded-xl border text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  isDark
                    ? 'border-slate-700 bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700'
                    : 'border-slate-200 bg-slate-100 text-slate-700 hover:text-slate-900 hover:bg-slate-200'
                }`}
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reiniciar</span>
              </button>

              <button
                type="button"
                onClick={handleCheck}
                className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>Comprobar Respuestas</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
