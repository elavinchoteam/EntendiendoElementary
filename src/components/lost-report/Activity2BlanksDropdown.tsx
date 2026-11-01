import React, { useState } from 'react';
import {
  ChevronDown,
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
import { ACTIVITY_2_DATA, DropdownBlankItem } from '../../data/lostReportData';

interface Activity2BlanksDropdownProps {
  speed?: number;
  accent?: 'US' | 'UK';
}

export const Activity2BlanksDropdown: React.FC<Activity2BlanksDropdownProps> = ({
  speed = 1.0,
  accent = 'US',
}) => {
  const { isDark } = useTheme();

  // Video time & transcript
  const [currentTimeSec, setCurrentTimeSec] = useState(0);
  const [isTranscriptVisible, setIsTranscriptVisible] = useState(true);

  // Reversible instructions
  const [isHeaderFlipped, setIsHeaderFlipped] = useState(false);
  const instructionEn = 'Fill in the blanks with the correct answers.';
  const instructionEs = 'Completa los espacios en blanco con las respuestas correctas.';

  // Selected values: itemId -> selectedOption
  const [selectedValues, setSelectedValues] = useState<Record<string, string>>({});
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  // Translation flip state per item
  const [flippedItems, setFlippedItems] = useState<Record<string, boolean>>({});

  // Check state
  const [hasChecked, setHasChecked] = useState(false);
  const [isAllCorrect, setIsAllCorrect] = useState(false);

  const handleSelect = (itemId: string, opt: string) => {
    playFeedbackSound('click');
    setSelectedValues((prev) => ({
      ...prev,
      [itemId]: opt,
    }));
    setOpenDropdownId(null);
    setHasChecked(false);
  };

  const handleToggleItemFlip = (itemId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    playFeedbackSound('click');
    setFlippedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const handlePlaySentence = (item: DropdownBlankItem, e: React.MouseEvent) => {
    e.stopPropagation();
    stopSpeaking();
    playFeedbackSound('click');
    const selected = selectedValues[item.id] || item.correctAnswer;
    const fullText = `${item.before} ${selected} ${item.after}`;
    speakEnglish(fullText, speed, accent);
  };

  const handleCheckAnswers = () => {
    playFeedbackSound('click');
    setHasChecked(true);

    const allCorrect = ACTIVITY_2_DATA.every(
      (item) => selectedValues[item.id] === item.correctAnswer
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
    setSelectedValues({});
    setOpenDropdownId(null);
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
                Actividad 2 · Fill in the blanks
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
              onClick={(e) => {
                e.stopPropagation();
                stopSpeaking();
                playFeedbackSound('click');
                speakEnglish(instructionEn, speed, accent);
              }}
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
        {/* Left Column: Video Player + Transcript */}
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

        {/* Right Column: 3 Dropdown Sentences */}
        <div className="lg:col-span-6 space-y-4">
          <div
            className={`p-4 sm:p-5 rounded-2xl border ${
              isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}
          >
            <h3 className="text-sm font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 mb-4 pb-2 border-b border-slate-200 dark:border-slate-800">
              Completa las Oraciones
            </h3>

            <div className="space-y-6">
              {ACTIVITY_2_DATA.map((item, index) => {
                const selected = selectedValues[item.id] || '';
                const isItemCorrect = selected === item.correctAnswer;
                const isFlipped = !!flippedItems[item.id];
                const isOpen = openDropdownId === item.id;

                return (
                  <div
                    key={item.id}
                    className={`p-3.5 rounded-xl border transition-all ${
                      hasChecked
                        ? isItemCorrect
                          ? 'border-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20'
                          : 'border-rose-400 bg-rose-50/50 dark:bg-rose-950/20'
                        : isDark
                        ? 'border-slate-800 bg-slate-900/60'
                        : 'border-slate-200 bg-slate-50/60'
                    }`}
                  >
                    {/* Sentence with Dropdown */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="w-5 h-5 rounded-full bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 text-xs font-bold flex items-center justify-center shrink-0">
                        {index + 1}
                      </span>

                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={(e) => handleToggleItemFlip(item.id, e)}
                          className={`w-7 h-7 rounded-lg border flex items-center justify-center transition-all cursor-pointer ${
                            isFlipped
                              ? 'bg-emerald-500 text-white border-emerald-600'
                              : isDark
                              ? 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
                              : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900'
                          }`}
                          title={isFlipped ? 'Ver en inglés' : 'Ver traducción en español'}
                        >
                          <RefreshCw className={`w-3.5 h-3.5 ${isFlipped ? 'rotate-180' : ''}`} />
                        </button>

                        <button
                          type="button"
                          onClick={(e) => handlePlaySentence(item, e)}
                          className={`w-7 h-7 rounded-lg border flex items-center justify-center transition-all cursor-pointer ${
                            isDark
                              ? 'bg-slate-800 border-slate-700 text-sky-400 hover:text-white'
                              : 'bg-white border-slate-200 text-sky-600 hover:text-sky-800'
                          }`}
                          title="Escuchar oración completa"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {!isFlipped ? (
                      <div className="text-sm sm:text-base font-medium leading-loose text-slate-800 dark:text-slate-100 flex flex-wrap items-center gap-1.5">
                        <span>{item.before}</span>

                        {/* Interactive Dropdown Button matching screenshot */}
                        <div className="relative inline-block">
                          <button
                            type="button"
                            onClick={() => setOpenDropdownId(isOpen ? null : item.id)}
                            className={`min-w-[130px] px-3 py-1.5 rounded-lg border text-sm font-semibold flex items-center justify-between gap-2 transition-all cursor-pointer shadow-xs ${
                              selected
                                ? 'bg-sky-50 dark:bg-sky-950/60 border-sky-400 dark:border-sky-600 text-sky-700 dark:text-sky-300'
                                : isDark
                                ? 'bg-slate-800 border-slate-700 text-slate-400 hover:border-sky-500'
                                : 'bg-white border-sky-300 text-slate-500 hover:border-sky-500'
                            }`}
                          >
                            <span>{selected || 'Select...'}</span>
                            <ChevronDown
                              className={`w-4 h-4 text-sky-500 transition-transform ${
                                isOpen ? 'rotate-180' : ''
                              }`}
                            />
                          </button>

                          {/* Dropdown Menu (cyan border like screenshot) */}
                          {isOpen && (
                            <div className="absolute left-0 mt-1 z-30 w-44 rounded-xl border border-sky-400 bg-white dark:bg-slate-900 shadow-xl py-1 text-sm overflow-hidden animate-in fade-in zoom-in-95 duration-100">
                              {item.options.map((opt) => (
                                <button
                                  key={opt}
                                  type="button"
                                  onClick={() => handleSelect(item.id, opt)}
                                  className={`w-full px-3 py-2 text-left flex items-center justify-between text-xs sm:text-sm hover:bg-sky-50 dark:hover:bg-slate-800 transition-colors cursor-pointer ${
                                    selected === opt
                                      ? 'bg-sky-100/70 dark:bg-sky-950/70 font-bold text-sky-700 dark:text-sky-300'
                                      : 'text-slate-700 dark:text-slate-300'
                                  }`}
                                >
                                  <span>{opt}</span>
                                  <span className="text-[10px] text-slate-400 italic">
                                    {item.optionsEs[opt]}
                                  </span>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>

                        <span>{item.after}</span>
                      </div>
                    ) : (
                      /* Translation view */
                      <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-700 text-xs sm:text-sm font-serif italic text-emerald-900 dark:text-emerald-200 leading-relaxed">
                        <span className="font-sans font-bold text-emerald-700 dark:text-emerald-400 block text-[11px] mb-0.5">
                          Traducción:
                        </span>
                        {item.fullSentenceEs}
                      </div>
                    )}

                    {/* Feedback after checking */}
                    {hasChecked && (
                      <div
                        className={`mt-2.5 pt-2 border-t flex items-center gap-1.5 text-xs font-semibold ${
                          isItemCorrect
                            ? 'border-emerald-200 dark:border-emerald-900 text-emerald-700 dark:text-emerald-400'
                            : 'border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400'
                        }`}
                      >
                        {isItemCorrect ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 shrink-0" />
                            <span>¡Correcto! Respuesta: "{item.correctAnswer}"</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-4 h-4 shrink-0" />
                            <span>Respuesta correcta: "{item.correctAnswer}" ({item.optionsEs[item.correctAnswer]})</span>
                          </>
                        )}
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
                onClick={handleCheckAnswers}
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
