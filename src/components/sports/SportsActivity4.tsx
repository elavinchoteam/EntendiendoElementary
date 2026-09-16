import React, { useState } from 'react';
import { Volume2, CheckCircle2, XCircle, RotateCcw, ArrowRight } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import {
  ACTIVITY_4_QUESTIONS,
  SportsClipQuestion,
} from '../../data/sports1Data';
import { SportsMediaCard } from './SportsMediaCard';
import { speakEnglish, stopSpeaking, playFeedbackSound } from '../../utils/audio';

interface SportsActivity4Props {
  currentRate: number;
  accent?: 'US' | 'UK';
  onComplete?: () => void;
  onNext?: () => void;
}

export const SportsActivity4: React.FC<SportsActivity4Props> = ({
  currentRate,
  accent = 'US',
  onComplete,
  onNext,
}) => {
  const { isDark } = useTheme();

  const [isInstructionFlipped, setIsInstructionFlipped] = useState(false);
  // User selected option ids: { [questionId]: optionId }
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [flippedCards, setFlippedCards] = useState<string[]>([]);
  const [playingClipId, setPlayingClipId] = useState<string | null>(null);
  const [hasChecked, setHasChecked] = useState(false);
  const [isAllCorrect, setIsAllCorrect] = useState(false);

  const instructionEn =
    "Listen to the clips of the sports show, and answer the questions.";
  const instructionEs =
    "Escucha los fragmentos del programa deportivo y responde a las preguntas.";

  const handlePlayInstruction = (e: React.MouseEvent) => {
    e.stopPropagation();
    speakEnglish(instructionEn, currentRate, accent === 'UK' ? 'UK' : 'US');
  };

  const handlePlayClip = (q: SportsClipQuestion, e: React.MouseEvent) => {
    e.stopPropagation();
    stopSpeaking();
    setPlayingClipId(q.id);

    speakEnglish(
      q.audioClipText,
      currentRate,
      accent === 'UK' ? 'UK' : 'US',
      undefined,
      () => setPlayingClipId(null)
    );
  };

  const handlePlayText = (text: string, e: React.MouseEvent) => {
    e.stopPropagation();
    speakEnglish(text, currentRate, accent === 'UK' ? 'UK' : 'US');
  };

  const toggleCardFlip = (id: string) => {
    setFlippedCards((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSelectOption = (qId: string, optId: string) => {
    playFeedbackSound('click');
    setSelectedAnswers((prev) => ({
      ...prev,
      [qId]: optId,
    }));
    setHasChecked(false);
  };

  const handleCheck = () => {
    let allRight = true;
    for (const q of ACTIVITY_4_QUESTIONS) {
      const selectedId = selectedAnswers[q.id];
      const correctOpt = q.options.find((o) => o.isCorrect);
      if (selectedId !== correctOpt?.id) {
        allRight = false;
        break;
      }
    }

    setHasChecked(true);
    setIsAllCorrect(allRight);

    if (allRight) {
      playFeedbackSound('correct');
      if (onComplete) onComplete();
    } else {
      playFeedbackSound('wrong');
    }
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setHasChecked(false);
    setIsAllCorrect(false);
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Reversible Instruction Header Card */}
      <div
        id="sports-act4-instruction-card"
        onClick={() => setIsInstructionFlipped(!isInstructionFlipped)}
        className={`w-full rounded-2xl border p-4 sm:p-5 transition-all cursor-pointer select-none ${
          isDark
            ? 'bg-slate-900 border-slate-700 text-slate-100'
            : 'bg-white border-slate-200 text-slate-900 shadow-xs'
        }`}
      >
        <div className="w-full flex items-center justify-between gap-3">
          <div>
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 mb-0.5">
              {isInstructionFlipped ? 'Instrucciones' : 'Instructions'}
            </div>
            <p className="text-sm sm:text-base font-medium">
              {isInstructionFlipped ? instructionEs : instructionEn}
            </p>
          </div>

          <button
            type="button"
            onClick={handlePlayInstruction}
            className={`p-2.5 rounded-xl border shrink-0 transition-colors cursor-pointer ${
              isDark
                ? 'bg-slate-800 hover:bg-slate-700 text-sky-300 border-slate-700'
                : 'bg-slate-50 hover:bg-slate-100 text-sky-700 border-slate-200 shadow-xs'
            }`}
            aria-label="Audio"
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Media Player */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <SportsMediaCard
            currentRate={currentRate}
            accent={accent}
            highlightCurrentSentence={true}
            showTranscript={true}
          />
        </div>

        {/* Right Column: 3 Clip-based Questions */}
        <div className="lg:col-span-7 flex flex-col gap-5">
          {ACTIVITY_4_QUESTIONS.map((q, qIndex) => {
            const isFlipped = flippedCards.includes(q.id);
            const selectedOptId = selectedAnswers[q.id];
            const correctOpt = q.options.find((o) => o.isCorrect);
            const isItemCorrect = hasChecked && selectedOptId === correctOpt?.id;
            const isItemWrong = hasChecked && selectedOptId && selectedOptId !== correctOpt?.id;

            return (
              <div
                key={q.id}
                id={`sports-clip-q-${q.id}`}
                onClick={() => toggleCardFlip(q.id)}
                className={`rounded-2xl border p-4 sm:p-5 transition-all cursor-pointer select-none flex flex-col gap-3 ${
                  hasChecked
                    ? isItemCorrect
                      ? 'border-emerald-500 bg-emerald-50/20 dark:bg-emerald-950/20'
                      : isItemWrong
                      ? 'border-rose-500 bg-rose-50/20 dark:bg-rose-950/20'
                      : isDark
                      ? 'bg-slate-900 border-slate-700'
                      : 'bg-white border-slate-200 shadow-xs'
                    : isDark
                    ? 'bg-slate-900 border-slate-700 hover:border-slate-600'
                    : 'bg-white border-slate-200 shadow-xs hover:border-slate-300'
                }`}
              >
                {/* Question Header with Audio Clip Trigger */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 flex-1">
                    <span className="w-7 h-7 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 font-bold text-xs flex items-center justify-center border border-sky-500/20 shrink-0 mt-0.5">
                      {qIndex + 1}
                    </span>
                    <div>
                      <div className="text-sm sm:text-base font-semibold text-slate-900 dark:text-slate-100 leading-snug">
                        {isFlipped ? q.questionEs : q.question}
                      </div>
                      {isFlipped && (
                        <div className="text-xs text-amber-600 dark:text-amber-400 mt-0.5">
                          Pregunta {qIndex + 1} (Español)
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Clip Speaker Audio Button (Icon only) */}
                  <button
                    type="button"
                    onClick={(e) => handlePlayClip(q, e)}
                    className={`p-2.5 rounded-xl border shrink-0 transition-colors cursor-pointer ${
                      playingClipId === q.id
                        ? 'bg-sky-600 text-white border-sky-500 ring-2 ring-sky-400/30'
                        : isDark
                        ? 'bg-slate-800 hover:bg-slate-700 text-sky-300 border-slate-700'
                        : 'bg-slate-50 hover:bg-slate-100 text-sky-700 border-slate-200 shadow-xs'
                    }`}
                    aria-label="Audio"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Radio Options List */}
                <div
                  className="space-y-2 mt-1"
                  onClick={(e) => e.stopPropagation()}
                >
                  {q.options.map((opt) => {
                    const isSelected = selectedOptId === opt.id;
                    const isRightOpt = hasChecked && opt.isCorrect;
                    const isWrongOpt = hasChecked && isSelected && !opt.isCorrect;

                    return (
                      <div
                        key={opt.id}
                        onClick={() => handleSelectOption(q.id, opt.id)}
                        className={`p-3 rounded-xl border flex items-center justify-between gap-3 text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                          isRightOpt
                            ? 'border-emerald-500 bg-emerald-500 text-white font-semibold'
                            : isWrongOpt
                            ? 'border-rose-500 bg-rose-500 text-white font-semibold'
                            : isSelected
                            ? isDark
                              ? 'border-sky-500 bg-sky-950/60 text-sky-200 ring-1 ring-sky-500/40'
                              : 'border-sky-500 bg-sky-50 text-sky-900 ring-1 ring-sky-500/40'
                            : isDark
                            ? 'border-slate-750 bg-slate-800/60 text-slate-300 hover:bg-slate-750'
                            : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span
                            className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                              isRightOpt || isWrongOpt
                                ? 'border-white'
                                : isSelected
                                ? 'border-sky-500'
                                : 'border-slate-400 dark:border-slate-600'
                            }`}
                          >
                            {isSelected && (
                              <span
                                className={`w-2 h-2 rounded-full ${
                                  isRightOpt || isWrongOpt ? 'bg-white' : 'bg-sky-500'
                                }`}
                              />
                            )}
                          </span>
                          <span>{opt.text}</span>
                        </div>

                        <button
                          type="button"
                          onClick={(e) => handlePlayText(opt.text, e)}
                          className={`p-1 rounded-md transition-colors shrink-0 ${
                            isRightOpt || isWrongOpt
                              ? 'hover:bg-white/20 text-white'
                              : 'hover:text-sky-400 text-slate-400'
                          }`}
                          aria-label="Audio"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* Explanation on Check */}
                {hasChecked && (
                  <div
                    className={`mt-2 p-3 rounded-xl text-xs leading-relaxed border ${
                      isItemCorrect
                        ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
                        : 'border-rose-500/30 bg-rose-500/10 text-rose-700 dark:text-rose-300'
                    }`}
                  >
                    {isFlipped ? q.explanationEs : q.explanation}
                  </div>
                )}
              </div>
            );
          })}

          {/* Action Footer */}
          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={handleReset}
              className={`px-4 py-2.5 rounded-xl border font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer ${
                isDark
                  ? 'border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 shadow-xs'
              }`}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reiniciar</span>
            </button>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleCheck}
                disabled={Object.keys(selectedAnswers).length === 0}
                className={`px-6 py-2.5 rounded-xl font-semibold text-xs shadow-md transition-all cursor-pointer ${
                  Object.keys(selectedAnswers).length === 0
                    ? 'opacity-40 cursor-not-allowed bg-slate-400 text-white'
                    : 'bg-sky-600 hover:bg-sky-500 text-white active:scale-95'
                }`}
              >
                Comprobar respuestas
              </button>

              {isAllCorrect && onNext && (
                <button
                  type="button"
                  onClick={onNext}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 animate-in fade-in"
                >
                  <span>Continuar a Actividad 5</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
