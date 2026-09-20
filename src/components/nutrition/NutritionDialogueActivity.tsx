import React, { useState } from 'react';
import { Volume2, VolumeX, Check, RotateCcw, ArrowRight } from 'lucide-react';
import {
  NUTRITION_DIALOGUE_LINES,
  DialogueLineDropdown,
  NutritionWordItem,
} from '../../data/nutritionData';
import { ReversibleCard } from './ReversibleCard';
import { speakEnglish, stopSpeaking, playFeedbackSound } from '../../utils/audio';
import { useTheme } from '../../context/ThemeContext';

interface NutritionDialogueActivityProps {
  vocabularyList: NutritionWordItem[];
  speed: number;
  accent?: 'US' | 'UK';
  onNextActivity?: () => void;
}

export const NutritionDialogueActivity: React.FC<NutritionDialogueActivityProps> = ({
  vocabularyList,
  speed,
  accent = 'US',
  onNextActivity,
}) => {
  const { isDark } = useTheme();

  // BlankId -> selected string
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [activeAudioLine, setActiveAudioLine] = useState<number | null>(null);
  const [activeVocabAudio, setActiveVocabAudio] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Extract all blanks
  const allBlanks = NUTRITION_DIALOGUE_LINES.flatMap((line) => line.blanks || []);

  const handleSelectChange = (blankId: string, value: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [blankId]: value,
    }));
  };

  const playLineAudio = (lineIndex: number, textToSpeak: string) => {
    if (activeAudioLine === lineIndex) {
      stopSpeaking();
      setActiveAudioLine(null);
    } else {
      setActiveAudioLine(lineIndex);
      speakEnglish(textToSpeak, speed, accent, () => {
        setActiveAudioLine(null);
      });
    }
  };

  const playVocabAudio = (word: string, id: string) => {
    if (activeVocabAudio === id) {
      stopSpeaking();
      setActiveVocabAudio(null);
    } else {
      setActiveVocabAudio(id);
      speakEnglish(word, speed, accent, () => {
        setActiveVocabAudio(null);
      });
    }
  };

  const handleCheck = () => {
    playFeedbackSound('click');
    setIsSubmitted(true);
    const allCorrect = allBlanks.every(
      (b) => selectedAnswers[b.id]?.toLowerCase() === b.correctAnswer.toLowerCase()
    );
    if (allCorrect) {
      playFeedbackSound('correct');
    }
  };

  const handleReset = () => {
    playFeedbackSound('click');
    setSelectedAnswers({});
    setIsSubmitted(false);
  };

  const allFilled = allBlanks.every((b) => Boolean(selectedAnswers[b.id]));
  const isAllCorrect =
    isSubmitted &&
    allBlanks.every((b) => selectedAnswers[b.id]?.toLowerCase() === b.correctAnswer.toLowerCase());

  return (
    <div className="w-full flex flex-col gap-6 animate-in fade-in duration-200">
      {/* Reversible Instruction Header Card */}
      <ReversibleCard
        textEn="Dinner Discussion\nSelect the correct answer from the drop-down list."
        textEs="Conversación sobre la Dieta\nSelecciona la respuesta correcta de la lista desplegable."
        speed={speed}
        accent={accent}
        className="shadow-sm"
        childrenFront={
          <div className="flex flex-col gap-1">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-emerald-800 dark:text-emerald-400">
              Diet Discussion
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              Select the correct answer from the drop-down list.
            </p>
          </div>
        }
        childrenBack={
          <div className="flex flex-col gap-1">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-emerald-900 dark:text-emerald-300">
              Conversación sobre la Dieta
            </h2>
            <p className="text-xs sm:text-sm font-serif italic text-emerald-900 dark:text-emerald-200">
              Selecciona la respuesta correcta de la lista desplegable.
            </p>
          </div>
        }
      />

      {/* Main Dialogue Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Vocabulary Reference Cards */}
        <div
          className={`lg:col-span-4 rounded-2xl border p-5 flex flex-col gap-3 shadow-sm ${
            isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
          }`}
        >
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
            Vocabulario
          </span>

          <div className="flex flex-col gap-2">
            {vocabularyList.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40"
              >
                <div className="flex flex-col text-left">
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-200 capitalize">
                    {item.word}
                  </span>
                  <span className="text-[11px] font-serif italic text-emerald-600 dark:text-emerald-400">
                    {item.translation}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => playVocabAudio(item.word, item.id)}
                  className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 cursor-pointer"
                  title="Listen"
                >
                  {activeVocabAudio === item.id ? (
                    <VolumeX className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
                  ) : (
                    <Volume2 className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Dialogue Conversation */}
        <div
          className={`lg:col-span-8 rounded-2xl border p-6 sm:p-8 flex flex-col gap-6 shadow-sm ${
            isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
          }`}
        >
          <div className="flex flex-col gap-4">
            {NUTRITION_DIALOGUE_LINES.map((line: DialogueLineDropdown, lineIndex) => {
              // Compute full text for this line with correct answers for speech
              let fullEnLine = line.textEn;
              line.blanks?.forEach((b) => {
                const filled = selectedAnswers[b.id] || b.correctAnswer;
                fullEnLine = fullEnLine.replace(`[${b.id}]`, filled);
              });

              return (
                <div
                  key={lineIndex}
                  className={`p-4 rounded-xl border flex flex-col gap-3 transition-colors ${
                    line.speaker === 'Clara'
                      ? isDark
                        ? 'bg-emerald-950/20 border-emerald-800/40'
                        : 'bg-emerald-50/50 border-emerald-200/80'
                      : isDark
                      ? 'bg-slate-800/40 border-slate-700'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                      {line.speaker}
                    </span>

                    <button
                      type="button"
                      onClick={() => playLineAudio(lineIndex, fullEnLine)}
                      className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                        activeAudioLine === lineIndex
                          ? 'bg-emerald-500 text-white border-emerald-500 shadow-sm animate-pulse'
                          : isDark
                          ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                          : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200 shadow-xs'
                      }`}
                      title="Listen"
                      aria-label="Listen"
                    >
                      {activeAudioLine === lineIndex ? (
                        <VolumeX className="w-3.5 h-3.5" />
                      ) : (
                        <Volume2 className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>

                  {/* Dialogue text with inline dropdowns */}
                  <div className="text-base sm:text-lg leading-relaxed text-slate-800 dark:text-slate-200">
                    {(() => {
                      if (!line.blanks || line.blanks.length === 0) {
                        return <span>{line.textEn}</span>;
                      }

                      // Split by blank tokens like [b1], [b2], etc.
                      const parts = line.textEn.split(/(\[b\d+\])/g);

                      return parts.map((part, pIdx) => {
                        const match = part.match(/\[(b\d+)\]/);
                        if (!match) {
                          return <span key={pIdx}>{part}</span>;
                        }

                        const blankId = match[1];
                        const blankDef = line.blanks?.find((b) => b.id === blankId);
                        if (!blankDef) return <span key={pIdx}>{part}</span>;

                        const userChoice = selectedAnswers[blankId] || '';
                        const isCorrect =
                          isSubmitted &&
                          userChoice.toLowerCase() === blankDef.correctAnswer.toLowerCase();
                        const isWrong = isSubmitted && userChoice && !isCorrect;

                        return (
                          <select
                            key={pIdx}
                            value={userChoice}
                            onChange={(e) => handleSelectChange(blankId, e.target.value)}
                            disabled={isSubmitted && isAllCorrect}
                            className={`inline-block mx-1.5 px-3 py-1 text-sm font-semibold rounded-lg border transition-all align-middle cursor-pointer ${
                              isSubmitted
                                ? isCorrect
                                  ? 'bg-emerald-100 dark:bg-emerald-950/40 border-emerald-500 text-emerald-900 dark:text-emerald-200'
                                  : 'bg-rose-100 dark:bg-rose-950/40 border-rose-500 text-rose-900 dark:text-rose-200'
                                : userChoice
                                ? 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-500 text-indigo-900 dark:text-indigo-200'
                                : isDark
                                ? 'bg-slate-900 border-slate-700 text-slate-300'
                                : 'bg-white border-slate-300 text-slate-800 shadow-2xs'
                            }`}
                          >
                            <option value="">-- select --</option>
                            {blankDef.options.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                        );
                      });
                    })()}
                  </div>

                  {/* Reversible card with translation if submitted */}
                  {isSubmitted && (
                    <div className="mt-1">
                      <ReversibleCard
                        textEn={fullEnLine}
                        textEs={line.textEs}
                        speed={speed}
                        accent={accent}
                        minHeightClass="min-h-[50px]"
                        childrenFront={
                          <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                            {fullEnLine}
                          </span>
                        }
                        childrenBack={
                          <span className="text-xs sm:text-sm font-serif italic text-emerald-950 dark:text-emerald-300">
                            {line.textEs}
                          </span>
                        }
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Action buttons */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <button
              type="button"
              onClick={handleReset}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold border transition-all cursor-pointer ${
                isDark
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200 shadow-xs'
              }`}
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reiniciar</span>
            </button>

            <div className="flex items-center gap-3">
              {!isSubmitted ? (
                <button
                  type="button"
                  onClick={handleCheck}
                  disabled={!allFilled}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md cursor-pointer ${
                    allFilled
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white active:scale-95'
                      : 'bg-slate-300 dark:bg-slate-800 text-slate-500 dark:text-slate-600 cursor-not-allowed shadow-none'
                  }`}
                >
                  <Check className="w-4 h-4" />
                  <span>Comprobar</span>
                </button>
              ) : isAllCorrect && onNextActivity ? (
                <button
                  type="button"
                  onClick={onNextActivity}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  <span>Siguiente Actividad</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs sm:text-sm font-bold shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  <span>Intentar de nuevo</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
