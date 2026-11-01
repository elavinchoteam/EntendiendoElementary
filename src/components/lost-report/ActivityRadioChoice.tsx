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
import { LostReportVideoPlayer } from './LostReportVideoPlayer';
import { LostReportDialogueScript } from './LostReportDialogueScript';
import { RadioActivityQuestion } from '../../data/lostReportData';

interface ActivityRadioChoiceProps {
  activityNumber: number;
  data: RadioActivityQuestion;
  speed?: number;
  accent?: 'US' | 'UK';
}

export const ActivityRadioChoice: React.FC<ActivityRadioChoiceProps> = ({
  activityNumber,
  data,
  speed = 1.0,
  accent = 'US',
}) => {
  const { isDark } = useTheme();

  // Video time & transcript toggle
  const [currentTimeSec, setCurrentTimeSec] = useState(0);
  const [isTranscriptVisible, setIsTranscriptVisible] = useState(true);

  // Reversible Header Instruction
  const [isHeaderFlipped, setIsHeaderFlipped] = useState(false);

  // Question flip state
  const [isQuestionFlipped, setIsQuestionFlipped] = useState(false);

  // Selected option
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);

  // Flip states for individual options: optionId -> boolean
  const [flippedOptions, setFlippedOptions] = useState<Record<string, boolean>>({});

  // Check state
  const [hasChecked, setHasChecked] = useState(false);
  const isCorrect = selectedOptionId === data.correctAnswerId;

  const handleSelect = (id: string) => {
    playFeedbackSound('click');
    setSelectedOptionId(id);
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
    if (!selectedOptionId) return;
    playFeedbackSound('click');
    setHasChecked(true);

    if (selectedOptionId === data.correctAnswerId) {
      playFeedbackSound('correct');
    } else {
      playFeedbackSound('wrong');
    }
  };

  const handleReset = () => {
    playFeedbackSound('click');
    setSelectedOptionId(null);
    setHasChecked(false);
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
                Actividad {activityNumber} · Choose the correct answer
              </span>
              <span className="text-xs text-slate-400 font-medium hidden sm:inline">
                {isHeaderFlipped ? 'Español' : 'English'}
              </span>
            </div>
            {!isHeaderFlipped ? (
              <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 leading-relaxed">
                {data.instruction}
              </p>
            ) : (
              <p className="text-xs sm:text-sm font-medium italic text-emerald-800 dark:text-emerald-300 leading-relaxed font-serif">
                {data.instructionEs}
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
              onClick={(e) => handlePlayAudio(data.instruction, e)}
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
        {/* Left Column: Video Player + Dialogue Script */}
        <div className="lg:col-span-6 space-y-3">
          <LostReportVideoPlayer
            onTimeUpdate={setCurrentTimeSec}
            isTranscriptVisible={isTranscriptVisible}
            onToggleTranscript={() => setIsTranscriptVisible((prev) => !prev)}
          />

          {isTranscriptVisible && (
            <LostReportDialogueScript
              currentTimeSec={currentTimeSec}
              speed={speed}
              accent={accent}
            />
          )}
        </div>

        {/* Right Column: Radio Choice Options */}
        <div className="lg:col-span-6 space-y-4">
          <div
            className={`p-4 sm:p-5 rounded-2xl border ${
              isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}
          >
            {/* Question Card with Reversible Flip */}
            <div
              className={`p-3.5 sm:p-4 rounded-xl border mb-5 transition-all ${
                isQuestionFlipped
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-700'
                  : isDark
                  ? 'bg-slate-800/80 border-slate-700'
                  : 'bg-sky-50/70 border-sky-200'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 block mb-1">
                    Pregunta
                  </span>
                  {!isQuestionFlipped ? (
                    <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-relaxed">
                      {data.question}
                    </p>
                  ) : (
                    <p className="text-sm sm:text-base font-medium italic text-emerald-900 dark:text-emerald-200 leading-relaxed font-serif">
                      {data.questionEs}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      playFeedbackSound('click');
                      setIsQuestionFlipped((prev) => !prev);
                    }}
                    className={`w-7 h-7 rounded-lg border flex items-center justify-center transition-all cursor-pointer ${
                      isQuestionFlipped
                        ? 'bg-emerald-500 text-white border-emerald-600'
                        : isDark
                        ? 'bg-slate-700 border-slate-600 text-slate-300 hover:text-white'
                        : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900'
                    }`}
                    title={isQuestionFlipped ? 'Ver en inglés' : 'Ver traducción en español'}
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isQuestionFlipped ? 'rotate-180' : ''}`} />
                  </button>

                  <button
                    type="button"
                    onClick={(e) => handlePlayAudio(data.question, e)}
                    className={`w-7 h-7 rounded-lg border flex items-center justify-center transition-all cursor-pointer ${
                      isDark
                        ? 'bg-slate-700 border-slate-600 text-sky-400 hover:text-white'
                        : 'bg-white border-slate-200 text-sky-600 hover:text-sky-800'
                    }`}
                    title="Escuchar pronunciación"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Radio Options List matching screenshot radio buttons */}
            <div className="space-y-3">
              {data.options.map((opt) => {
                const isSelected = selectedOptionId === opt.id;
                const isOptionFlipped = !!flippedOptions[opt.id];
                const isThisCorrect = opt.id === data.correctAnswerId;

                let stateClasses = isDark
                  ? 'bg-slate-800/60 border-slate-700/80 hover:bg-slate-800 hover:border-slate-600'
                  : 'bg-white border-slate-200 hover:bg-slate-50 hover:border-slate-300';

                if (isSelected) {
                  stateClasses = isDark
                    ? 'bg-sky-950/60 border-sky-500 text-sky-100 ring-1 ring-sky-500/50'
                    : 'bg-sky-50 border-sky-400 text-sky-900 ring-1 ring-sky-400/40';
                }

                if (hasChecked) {
                  if (isThisCorrect) {
                    stateClasses =
                      'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-400 dark:border-emerald-600 text-emerald-950 dark:text-emerald-100';
                  } else if (isSelected && !isThisCorrect) {
                    stateClasses =
                      'bg-rose-50 dark:bg-rose-950/50 border-rose-400 dark:border-rose-600 text-rose-950 dark:text-rose-100';
                  }
                }

                return (
                  <div
                    key={opt.id}
                    onClick={() => handleSelect(opt.id)}
                    className={`p-3 sm:p-3.5 rounded-xl border flex items-center justify-between gap-3 transition-all cursor-pointer select-none ${stateClasses}`}
                  >
                    {/* Left: Radio circle + Text */}
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      {/* Radio button circle matching screenshot */}
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                          isSelected
                            ? 'border-sky-500 bg-sky-500'
                            : isDark
                            ? 'border-slate-500 bg-slate-800'
                            : 'border-slate-400 bg-white'
                        }`}
                      >
                        {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                      </div>

                      {/* Text / Translation */}
                      <div className="flex-1 min-w-0">
                        {!isOptionFlipped ? (
                          <p className="text-xs sm:text-sm font-medium leading-relaxed">
                            {opt.text}
                          </p>
                        ) : (
                          <p className="text-xs sm:text-sm font-medium italic text-emerald-800 dark:text-emerald-300 leading-relaxed font-serif">
                            {opt.textEs}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Right buttons: Flip & Audio */}
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={(e) => handleToggleOptionFlip(opt.id, e)}
                        className={`w-7 h-7 rounded-lg border flex items-center justify-center transition-all cursor-pointer ${
                          isOptionFlipped
                            ? 'bg-emerald-500 text-white border-emerald-600'
                            : isDark
                            ? 'bg-slate-700/80 border-slate-600 text-slate-300 hover:text-white'
                            : 'bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900'
                        }`}
                        title={isOptionFlipped ? 'Ver inglés' : 'Ver traducción en español'}
                      >
                        <RefreshCw className={`w-3.5 h-3.5 ${isOptionFlipped ? 'rotate-180' : ''}`} />
                      </button>

                      <button
                        type="button"
                        onClick={(e) => handlePlayAudio(opt.text, e)}
                        className={`w-7 h-7 rounded-lg border flex items-center justify-center transition-all cursor-pointer ${
                          isDark
                            ? 'bg-slate-700/80 border-slate-600 text-sky-400 hover:text-white'
                            : 'bg-slate-100 border-slate-200 text-sky-600 hover:text-sky-800'
                        }`}
                        title="Escuchar audio"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Explanation Feedback after checking */}
            {hasChecked && (
              <div
                className={`mt-5 p-3.5 rounded-xl border animate-in fade-in duration-200 ${
                  isCorrect
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-700 text-emerald-900 dark:text-emerald-200'
                    : 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-700 text-amber-950 dark:text-amber-200'
                }`}
              >
                <div className="flex items-center gap-2 mb-1.5 font-bold text-xs sm:text-sm">
                  {isCorrect ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      <span>¡Respuesta Correcta!</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4 text-rose-500 dark:text-rose-400" />
                      <span>Respuesta incorrecta. Revisa la explicación:</span>
                    </>
                  )}
                </div>
                <p className="text-xs sm:text-sm font-normal leading-relaxed">
                  {data.explanation}
                </p>
                <p className="text-xs sm:text-sm font-medium italic mt-1 font-serif text-slate-700 dark:text-slate-300">
                  {data.explanationEs}
                </p>
              </div>
            )}

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
                disabled={!selectedOptionId}
                onClick={handleCheck}
                className={`px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all cursor-pointer ${
                  selectedOptionId
                    ? 'bg-sky-600 hover:bg-sky-500 text-white shadow-sky-500/20'
                    : 'bg-slate-300 dark:bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                <Check className="w-4 h-4" />
                <span>Comprobar Respuesta</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
