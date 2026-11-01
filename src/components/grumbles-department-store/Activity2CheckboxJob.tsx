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
import { ACTIVITY_2_OPTIONS, CheckboxOption } from '../../data/grumblesDepartmentStoreData';

interface Activity2CheckboxJobProps {
  speed?: number;
  accent?: 'US' | 'UK';
}

export const Activity2CheckboxJob: React.FC<Activity2CheckboxJobProps> = ({
  speed = 1.0,
  accent = 'US',
}) => {
  const { isDark } = useTheme();

  // Instruction flip
  const [isHeaderFlipped, setIsHeaderFlipped] = useState(false);
  const instructionEn =
    "Read Tammy's e-mail, and select the sentences that describe her job.";
  const instructionEs =
    'Lee el correo de Tammy y selecciona las oraciones que describen su trabajo.';

  // Selected checkbox options: optionId -> boolean
  const [selectedOptions, setSelectedOptions] = useState<Record<string, boolean>>({});

  // Flipped options: optionId -> boolean
  const [flippedOptions, setFlippedOptions] = useState<Record<string, boolean>>({});

  // Check state
  const [hasChecked, setHasChecked] = useState(false);
  const [isAllCorrect, setIsAllCorrect] = useState(false);

  const handleToggleSelect = (optId: string) => {
    playFeedbackSound('click');
    setSelectedOptions((prev) => ({
      ...prev,
      [optId]: !prev[optId],
    }));
    setHasChecked(false);
  };

  const handleToggleOptionFlip = (optId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    playFeedbackSound('click');
    setFlippedOptions((prev) => ({
      ...prev,
      [optId]: !prev[optId],
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

    const allCorrect = ACTIVITY_2_OPTIONS.every((opt) => {
      const isSelected = !!selectedOptions[opt.id];
      return isSelected === opt.isCorrect;
    });

    setIsAllCorrect(allCorrect);
    if (allCorrect) {
      playFeedbackSound('correct');
    } else {
      playFeedbackSound('wrong');
    }
  };

  const handleReset = () => {
    playFeedbackSound('click');
    setSelectedOptions({});
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
                Actividad 2 · Select sentences that describe her job
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
        {/* Left: Email card */}
        <div className="lg:col-span-6">
          <TammyEmailCard speed={speed} accent={accent} />
        </div>

        {/* Right: 7 Checkbox Options */}
        <div className="lg:col-span-6 space-y-4">
          <div
            className={`p-4 sm:p-5 rounded-2xl border ${
              isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}
          >
            <h3 className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 mb-3 pb-2 border-b border-slate-200 dark:border-slate-800">
              Selecciona las oraciones verdaderas sobre su empleo:
            </h3>

            <div className="space-y-2.5">
              {ACTIVITY_2_OPTIONS.map((opt) => {
                const isSelected = !!selectedOptions[opt.id];
                const isFlipped = !!flippedOptions[opt.id];

                let borderClasses = isDark
                  ? 'border-slate-800 bg-slate-900/60 hover:bg-slate-800/60'
                  : 'border-slate-200 bg-white hover:bg-slate-50';

                if (isSelected) {
                  borderClasses = isDark
                    ? 'border-sky-500 bg-sky-950/40 text-sky-100 ring-1 ring-sky-500/40'
                    : 'border-sky-400 bg-sky-50 text-sky-900 ring-1 ring-sky-400/40';
                }

                if (hasChecked) {
                  const wasCorrectChoice = isSelected === opt.isCorrect;
                  if (wasCorrectChoice && opt.isCorrect) {
                    borderClasses =
                      'border-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-100';
                  } else if (!wasCorrectChoice) {
                    borderClasses =
                      'border-rose-400 bg-rose-50 dark:bg-rose-950/40 text-rose-950 dark:text-rose-100';
                  }
                }

                return (
                  <div
                    key={opt.id}
                    onClick={() => handleToggleSelect(opt.id)}
                    className={`p-3 rounded-xl border flex items-start justify-between gap-3 transition-all cursor-pointer select-none ${borderClasses}`}
                  >
                    {/* Checkbox box + Text */}
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <div
                        className={`w-5 h-5 rounded-md border-2 mt-0.5 flex items-center justify-center shrink-0 transition-colors ${
                          isSelected
                            ? 'border-sky-500 bg-sky-500 text-white'
                            : isDark
                            ? 'border-slate-500 bg-slate-800'
                            : 'border-slate-400 bg-white'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>

                      <div className="flex-1 min-w-0">
                        {!isFlipped ? (
                          <p className="text-xs sm:text-sm font-medium leading-relaxed">
                            {opt.text}
                          </p>
                        ) : (
                          <p className="text-xs sm:text-sm font-medium italic text-emerald-800 dark:text-emerald-300 leading-relaxed font-serif">
                            {opt.textEs}
                          </p>
                        )}

                        {/* Post-check explanation */}
                        {hasChecked && (
                          <p
                            className={`text-[11px] font-semibold mt-1 flex items-center gap-1 ${
                              opt.isCorrect
                                ? 'text-emerald-600 dark:text-emerald-400'
                                : 'text-slate-500 dark:text-slate-400'
                            }`}
                          >
                            {opt.isCorrect ? (
                              <>
                                <CheckCircle2 className="w-3 h-3 shrink-0" />
                                Debe seleccionarse: {opt.explanationEs}
                              </>
                            ) : (
                              isSelected && (
                                <>
                                  <XCircle className="w-3 h-3 text-rose-500 shrink-0" />
                                  No corresponde: {opt.explanationEs}
                                </>
                              )
                            )}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Action buttons: Flip & Audio */}
                    <div className="flex items-center gap-1 shrink-0 mt-0.5">
                      <button
                        type="button"
                        onClick={(e) => handleToggleOptionFlip(opt.id, e)}
                        className={`w-6 h-6 rounded-md border flex items-center justify-center transition-all cursor-pointer ${
                          isFlipped
                            ? 'bg-emerald-500 text-white border-emerald-600'
                            : isDark
                            ? 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
                            : 'bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900'
                        }`}
                        title={isFlipped ? 'Ver en inglés' : 'Ver traducción en español'}
                      >
                        <RefreshCw className={`w-3 h-3 ${isFlipped ? 'rotate-180' : ''}`} />
                      </button>

                      <button
                        type="button"
                        onClick={(e) => handlePlayAudio(opt.text, e)}
                        className={`w-6 h-6 rounded-md border flex items-center justify-center transition-all cursor-pointer ${
                          isDark
                            ? 'bg-slate-800 border-slate-700 text-sky-400 hover:text-white'
                            : 'bg-slate-100 border-slate-200 text-sky-600 hover:text-sky-800'
                        }`}
                        title="Escuchar audio"
                      >
                        <Volume2 className="w-3 h-3" />
                      </button>
                    </div>
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
