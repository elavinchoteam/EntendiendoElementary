import React, { useState } from 'react';
import { ChevronDown, Check, RotateCcw, CheckCircle2, XCircle, RotateCw, Volume2 } from 'lucide-react';
import { speakEnglish, stopSpeaking, playFeedbackSound } from '../../utils/audio';
import { useTheme } from '../../context/ThemeContext';
import { CardSpeechControl } from '../CardSpeechControl';
import { DoItArticleSidebar } from './DoItArticleSidebar';

interface DropdownItem {
  id: string;
  prefix: string;
  prefixEs: string;
  suffix: string;
  suffixEs: string;
  options: string[];
  optionsEs: string[];
  correctAnswer: string;
  translationEs: string;
}

interface DoItDropdownSentencesExerciseProps {
  exercise: {
    instructions: string;
    instructionsEs: string;
    items: DropdownItem[];
  };
  accent?: 'US' | 'UK';
  speechRate?: number;
  onSuccess?: () => void;
}

export const DoItDropdownSentencesExercise: React.FC<DoItDropdownSentencesExerciseProps> = ({
  exercise,
  accent = 'US',
  speechRate = 1.0,
  onSuccess,
}) => {
  const { isDark } = useTheme();

  // Reversible instruction card state
  const [isInstructionFlipped, setIsInstructionFlipped] = useState(false);

  // Selected values for each blank: itemId -> selectedOption
  const [selectedValues, setSelectedValues] = useState<Record<string, string>>({});
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  // Translation flip state
  const [isParagraphFlipped, setIsParagraphFlipped] = useState(false);

  // Check state
  const [hasChecked, setHasChecked] = useState(false);
  const [isAllCorrect, setIsAllCorrect] = useState(false);

  const items = exercise.items || [];

  const handleSelect = (itemId: string, opt: string) => {
    playFeedbackSound('click');
    setSelectedValues((prev) => ({
      ...prev,
      [itemId]: opt,
    }));
    setOpenDropdownId(null);
    setHasChecked(false);
  };

  const handlePlayAudio = (text: string, e: React.MouseEvent) => {
    e.stopPropagation();
    stopSpeaking();
    speakEnglish(text, speechRate, accent === 'UK' ? 'UK' : 'US');
  };

  const handleCheck = () => {
    const allFilled = items.every((item) => selectedValues[item.id]);
    if (!allFilled) {
      playFeedbackSound('wrong');
      setHasChecked(true);
      return;
    }

    const allRight = items.every((item) => selectedValues[item.id] === item.correctAnswer);
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
    setSelectedValues({});
    setOpenDropdownId(null);
    setHasChecked(false);
    setIsAllCorrect(false);
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
                5
              </span>
              <div>
                <h3 className="font-bold text-base sm:text-lg">{exercise.instructions}</h3>
                <p className="text-xs text-slate-400 dark:text-slate-500">
                  Select the best option from each dropdown to complete the sentences · Click to translate
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
                5
              </span>
              <div>
                <h3 className="font-bold text-base sm:text-lg font-serif italic text-emerald-600 dark:text-emerald-400">
                  {exercise.instructionsEs}
                </h3>
                <p className="text-xs text-slate-400 dark:text-slate-500 font-sans not-italic">
                  Elige la mejor opción de cada menú desplegable para completar las oraciones · Clic para volver a inglés
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

      {/* Main Container: Left Article + Right Dropdown Sentences Card */}
      <div className="w-full max-w-5xl flex flex-col lg:flex-row gap-6 items-start justify-center">
        {/* Left: Article Sidebar */}
        <DoItArticleSidebar accent={accent} speechRate={speechRate} />

        {/* Right: Sentences with Dropdowns */}
        <div className="flex-1 w-full flex flex-col gap-4">
          <div
            className={`w-full p-6 sm:p-8 rounded-3xl border shadow-sm transition-all duration-200 ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}
          >
            {/* Header info */}
            <div className="flex items-center justify-between pb-4 border-b border-inherit/30 mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                Complete the Sentences
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsParagraphFlipped((prev) => !prev)}
                  className="px-2.5 py-1 rounded-lg text-xs font-medium text-sky-600 dark:text-sky-400 hover:bg-sky-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-1"
                  title="Traducir oraciones completas"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>{isParagraphFlipped ? 'Ver en inglés' : 'Traducir al español'}</span>
                </button>

                <button
                  type="button"
                  onClick={(e) =>
                    handlePlayAudio(
                      'The writer started a cleaning business. The writer talks about making a cake with her daughter. The writer wants to write cookbooks because she likes telling people what to do.',
                      e
                    )
                  }
                  className="p-1.5 rounded-lg text-slate-400 hover:text-sky-500 transition-colors"
                  title="Escuchar párrafo completo"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Sentences with Inlined Dropdowns */}
            {!isParagraphFlipped ? (
              <div className="text-base sm:text-lg leading-loose sm:leading-[2.4rem] text-slate-800 dark:text-slate-200 space-y-4">
                {/* Sentence 1 & 2 & 3 flow */}
                <div className="flex flex-wrap items-center gap-y-3 gap-x-1.5">
                  <span>The writer started a</span>

                  {/* Dropdown 1: cleaning */}
                  {(() => {
                    const item = items[0];
                    const selected = selectedValues[item.id];
                    const isOpen = openDropdownId === item.id;
                    const isCorrect = selected === item.correctAnswer;

                    return (
                      <div className="relative inline-block mx-1">
                        <button
                          type="button"
                          onClick={() => setOpenDropdownId(isOpen ? null : item.id)}
                          className={`min-w-[140px] px-3.5 py-1.5 rounded-xl border text-sm font-semibold transition-all flex items-center justify-between gap-2 shadow-xs cursor-pointer ${
                            selected
                              ? hasChecked
                                ? isCorrect
                                  ? 'border-emerald-500 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300'
                                  : 'border-rose-500 bg-rose-50 text-rose-800 dark:bg-rose-950/40 dark:text-rose-300'
                                : 'border-sky-500 bg-sky-50 text-sky-800 dark:bg-sky-950/40 dark:text-sky-300'
                              : isDark
                              ? 'border-slate-700 bg-slate-800 text-slate-400 hover:border-sky-400'
                              : 'border-slate-300 bg-slate-100 text-slate-500 hover:border-sky-400'
                          }`}
                        >
                          <span className="truncate">{selected || 'Select...'}</span>
                          <ChevronDown className="w-4 h-4 shrink-0 text-slate-400" />
                        </button>

                        {isOpen && (
                          <div
                            className={`absolute left-0 top-full mt-1.5 w-44 rounded-xl border shadow-xl z-30 p-1.5 animate-in fade-in duration-150 ${
                              isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'
                            }`}
                          >
                            {item.options.map((opt) => (
                              <button
                                key={opt}
                                type="button"
                                onClick={() => handleSelect(item.id, opt)}
                                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                  selected === opt
                                    ? 'bg-sky-500 text-white'
                                    : isDark
                                    ? 'text-slate-300 hover:bg-slate-800 hover:text-white'
                                    : 'text-slate-700 hover:bg-sky-50 hover:text-sky-900'
                                }`}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })()}

                  <span>business. The writer talks about</span>

                  {/* Dropdown 2: making a cake */}
                  {(() => {
                    const item = items[1];
                    const selected = selectedValues[item.id];
                    const isOpen = openDropdownId === item.id;
                    const isCorrect = selected === item.correctAnswer;

                    return (
                      <div className="relative inline-block mx-1">
                        <button
                          type="button"
                          onClick={() => setOpenDropdownId(isOpen ? null : item.id)}
                          className={`min-w-[160px] px-3.5 py-1.5 rounded-xl border text-sm font-semibold transition-all flex items-center justify-between gap-2 shadow-xs cursor-pointer ${
                            selected
                              ? hasChecked
                                ? isCorrect
                                  ? 'border-emerald-500 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300'
                                  : 'border-rose-500 bg-rose-50 text-rose-800 dark:bg-rose-950/40 dark:text-rose-300'
                                : 'border-sky-500 bg-sky-50 text-sky-800 dark:bg-sky-950/40 dark:text-sky-300'
                              : isDark
                              ? 'border-slate-700 bg-slate-800 text-slate-400 hover:border-sky-400'
                              : 'border-slate-300 bg-slate-100 text-slate-500 hover:border-sky-400'
                          }`}
                        >
                          <span className="truncate">{selected || 'Select...'}</span>
                          <ChevronDown className="w-4 h-4 shrink-0 text-slate-400" />
                        </button>

                        {isOpen && (
                          <div
                            className={`absolute left-0 top-full mt-1.5 w-52 rounded-xl border shadow-xl z-30 p-1.5 animate-in fade-in duration-150 ${
                              isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'
                            }`}
                          >
                            {item.options.map((opt) => (
                              <button
                                key={opt}
                                type="button"
                                onClick={() => handleSelect(item.id, opt)}
                                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                  selected === opt
                                    ? 'bg-sky-500 text-white'
                                    : isDark
                                    ? 'text-slate-300 hover:bg-slate-800 hover:text-white'
                                    : 'text-slate-700 hover:bg-sky-50 hover:text-sky-900'
                                }`}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })()}

                  <span>with her daughter. The writer wants to write cookbooks because she likes</span>

                  {/* Dropdown 3: telling people what to do */}
                  {(() => {
                    const item = items[2];
                    const selected = selectedValues[item.id];
                    const isOpen = openDropdownId === item.id;
                    const isCorrect = selected === item.correctAnswer;

                    return (
                      <div className="relative inline-block mx-1">
                        <button
                          type="button"
                          onClick={() => setOpenDropdownId(isOpen ? null : item.id)}
                          className={`min-w-[190px] px-3.5 py-1.5 rounded-xl border text-sm font-semibold transition-all flex items-center justify-between gap-2 shadow-xs cursor-pointer ${
                            selected
                              ? hasChecked
                                ? isCorrect
                                  ? 'border-emerald-500 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300'
                                  : 'border-rose-500 bg-rose-50 text-rose-800 dark:bg-rose-950/40 dark:text-rose-300'
                                : 'border-sky-500 bg-sky-50 text-sky-800 dark:bg-sky-950/40 dark:text-sky-300'
                              : isDark
                              ? 'border-slate-700 bg-slate-800 text-slate-400 hover:border-sky-400'
                              : 'border-slate-300 bg-slate-100 text-slate-500 hover:border-sky-400'
                          }`}
                        >
                          <span className="truncate">{selected || 'Select...'}</span>
                          <ChevronDown className="w-4 h-4 shrink-0 text-slate-400" />
                        </button>

                        {isOpen && (
                          <div
                            className={`absolute left-0 top-full mt-1.5 w-60 rounded-xl border shadow-xl z-30 p-1.5 animate-in fade-in duration-150 ${
                              isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'
                            }`}
                          >
                            {item.options.map((opt) => (
                              <button
                                key={opt}
                                type="button"
                                onClick={() => handleSelect(item.id, opt)}
                                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                  selected === opt
                                    ? 'bg-sky-500 text-white'
                                    : isDark
                                    ? 'text-slate-300 hover:bg-slate-800 hover:text-white'
                                    : 'text-slate-700 hover:bg-sky-50 hover:text-sky-900'
                                }`}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })()}

                  <span>.</span>
                </div>
              </div>
            ) : (
              /* Spanish Translation View */
              <div className="text-base sm:text-lg leading-relaxed font-serif italic text-emerald-700 dark:text-emerald-300 space-y-3">
                <p>
                  La escritora comenzó un negocio de <span className="font-bold underline">limpieza</span>. La escritora habla sobre <span className="font-bold underline">hacer un pastel</span> con su hija. La escritora quiere escribir libros de cocina porque le gusta <span className="font-bold underline">decirle a la gente qué hacer</span>.
                </p>
              </div>
            )}
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
                  ? '¡Perfecto! Todas las oraciones se han completado correctamente.'
                  : 'Una o más opciones no son correctas. Consulta el texto a la izquierda y vuelve a intentarlo.'}
              </p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
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
              <span>Comprobar Respuestas</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
