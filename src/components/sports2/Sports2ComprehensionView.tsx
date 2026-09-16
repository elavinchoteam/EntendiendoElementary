import React, { useState } from 'react';
import { Check, RotateCcw, Volume2, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { SportsComprehensionQuestion } from '../../data/peopleCrazyAboutSportsData';
import { Sports2StoryCard } from './Sports2StoryCard';
import { Sports2QuestionCard } from './Sports2QuestionCard';
import { useTheme } from '../../context/ThemeContext';
import { playFeedbackSound, speakEnglish, stopSpeaking } from '../../utils/audio';
import { SpeedSelectorButton } from '../SpeedSelectorButton';

interface Sports2ComprehensionViewProps {
  questions: SportsComprehensionQuestion[];
  accent?: 'US' | 'UK';
  speechRate?: number;
  onComplete?: () => void;
}

export const Sports2ComprehensionView: React.FC<Sports2ComprehensionViewProps> = ({
  questions,
  accent = 'US',
  speechRate = 1.0,
  onComplete,
}) => {
  const { isDark } = useTheme();
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [isChecked, setIsChecked] = useState(false);
  const [isHeaderFlipped, setIsHeaderFlipped] = useState(false);
  const [currentRate, setCurrentRate] = useState<number>(speechRate);

  const handleSelectOption = (questionId: string, optionId: string) => {
    if (isChecked) return;
    playFeedbackSound('click');
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  const handleCheck = () => {
    if (Object.keys(selectedAnswers).length < questions.length) {
      playFeedbackSound('wrong');
      return;
    }

    setIsChecked(true);

    const allCorrect = questions.every(
      (q) => selectedAnswers[q.id] === q.correctOptionId
    );

    if (allCorrect) {
      playFeedbackSound('correct');
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
      });
      if (onComplete) {
        onComplete();
      }
    } else {
      playFeedbackSound('wrong');
    }
  };

  const handleClear = () => {
    playFeedbackSound('click');
    setSelectedAnswers({});
    setIsChecked(false);
  };

  const handleSpeakInstruction = (e: React.MouseEvent) => {
    e.stopPropagation();
    stopSpeaking();
    speakEnglish(
      'Choose the correct answer.',
      currentRate,
      accent === 'UK' ? 'UK' : 'US',
      () => {},
      () => {},
      'male'
    );
  };

  const allAnswered = Object.keys(selectedAnswers).length === questions.length;
  const allCorrect =
    isChecked &&
    questions.every((q) => selectedAnswers[q.id] === q.correctOptionId);

  return (
    <div className="w-full flex flex-col gap-6">
      {/* 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Story Card */}
        <div className="lg:col-span-6 w-full">
          <Sports2StoryCard
            accent={accent}
            speechRate={speechRate}
            compact={true}
          />
        </div>

        {/* Right Column: Instruction + Questions */}
        <div className="lg:col-span-6 w-full flex flex-col gap-4">
          {/* Reversible Instruction Header */}
          <div
            onClick={() => {
              playFeedbackSound('flip');
              setIsHeaderFlipped((prev) => !prev);
            }}
            className="w-full perspective-1000 cursor-pointer select-none"
          >
            <div
              className={`grid grid-cols-1 grid-rows-1 transition-transform duration-500 transform-style-3d ${
                isHeaderFlipped ? 'rotate-y-180' : ''
              }`}
            >
              {/* Front: English */}
              <div
                className={`col-start-1 row-start-1 backface-hidden w-full p-3.5 sm:p-4 rounded-xl border flex items-center justify-between shadow-xs ${
                  isDark
                    ? 'bg-slate-900 border-slate-800 text-slate-100'
                    : 'bg-white border-slate-200 text-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
                  <h3 className="text-sm sm:text-base font-semibold text-sky-600 dark:text-sky-400">
                    Choose the correct answer.
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <SpeedSelectorButton
                    currentRate={currentRate}
                    onRateChange={(r) => setCurrentRate(r)}
                    size="sm"
                  />
                  <button
                    type="button"
                    onClick={handleSpeakInstruction}
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-xs ${
                      isDark
                        ? 'bg-slate-800 hover:bg-slate-700 text-sky-400 border border-slate-700'
                        : 'bg-stone-50 hover:bg-stone-100 text-sky-600 border border-stone-200'
                    }`}
                    aria-label="Speaker"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Back: Spanish */}
              <div
                className={`col-start-1 row-start-1 backface-hidden rotate-y-180 w-full p-3.5 sm:p-4 rounded-xl border flex items-center justify-between shadow-xs ${
                  isDark
                    ? 'bg-slate-900 border-slate-800 text-slate-100'
                    : 'bg-white border-slate-200 text-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <h3 className="text-sm sm:text-base font-semibold text-emerald-600 dark:text-emerald-400 italic">
                    Elige la respuesta correcta.
                  </h3>
                </div>
              </div>
            </div>
          </div>

          {/* Question Cards */}
          <div className="space-y-4">
            {questions.map((q, idx) => (
              <Sports2QuestionCard
                key={q.id}
                question={q}
                questionNumber={idx + 1}
                selectedOptionId={selectedAnswers[q.id]}
                onSelectOption={(optId) => handleSelectOption(q.id, optId)}
                isChecked={isChecked}
                accent={accent}
                speechRate={speechRate}
              />
            ))}
          </div>

          {/* Actions Bar */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={handleClear}
              disabled={Object.keys(selectedAnswers).length === 0}
              className={`px-4 py-2 rounded-xl text-sm font-medium border flex items-center gap-2 transition-all cursor-pointer ${
                Object.keys(selectedAnswers).length === 0
                  ? 'opacity-40 cursor-not-allowed border-slate-200 dark:border-slate-800 text-slate-400'
                  : isDark
                  ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-stone-50'
              }`}
            >
              <RotateCcw className="w-4 h-4" />
              <span>Clear</span>
            </button>

            <button
              type="button"
              onClick={handleCheck}
              disabled={!allAnswered || isChecked}
              className={`px-5 py-2 rounded-xl text-sm font-medium flex items-center gap-2 transition-all shadow-xs cursor-pointer ${
                !allAnswered || isChecked
                  ? 'opacity-50 cursor-not-allowed bg-slate-300 dark:bg-slate-800 text-slate-500'
                  : 'bg-sky-500 hover:bg-sky-600 text-white active:scale-95'
              }`}
            >
              <Check className="w-4 h-4" />
              <span>Check</span>
            </button>
          </div>

          {/* Correct feedback banner */}
          {allCorrect && (
            <div
              className={`p-3.5 rounded-xl border flex items-center gap-3 animate-in fade-in duration-200 ${
                isDark
                  ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                  : 'bg-emerald-50 border-emerald-200 text-emerald-800'
              }`}
            >
              <Sparkles className="w-5 h-5 text-emerald-500 shrink-0" />
              <p className="text-sm font-medium">
                ¡Excelente! Has respondido correctamente todas las preguntas.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
