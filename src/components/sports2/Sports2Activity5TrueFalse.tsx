import React, { useState } from 'react';
import {
  Check,
  RotateCcw,
  Volume2,
  CheckCircle2,
  XCircle,
  Sparkles,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  SPORTS2_ACT5_STATEMENTS,
  SportsTrueFalseStatement,
} from '../../data/peopleCrazyAboutSportsData';
import { Sports2StoryCard } from './Sports2StoryCard';
import { useTheme } from '../../context/ThemeContext';
import { playFeedbackSound, speakEnglish, stopSpeaking } from '../../utils/audio';
import { SpeedSelectorButton } from '../SpeedSelectorButton';

interface Sports2Activity5TrueFalseProps {
  accent?: 'US' | 'UK';
  speechRate?: number;
  onComplete?: () => void;
}

export const Sports2Activity5TrueFalse: React.FC<Sports2Activity5TrueFalseProps> = ({
  accent = 'US',
  speechRate = 1.0,
  onComplete,
}) => {
  const { isDark } = useTheme();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isChecked, setIsChecked] = useState(false);
  const [isHeaderFlipped, setIsHeaderFlipped] = useState(false);
  const [flippedItemIds, setFlippedItemIds] = useState<string[]>([]);
  const [currentRate, setCurrentRate] = useState<number>(speechRate);

  const handleToggleItem = (id: string) => {
    if (isChecked) return;
    playFeedbackSound('click');
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleToggleFlipItem = (id: string) => {
    playFeedbackSound('flip');
    setFlippedItemIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleCheck = () => {
    if (selectedIds.length === 0) return;
    setIsChecked(true);

    const trueStatements = SPORTS2_ACT5_STATEMENTS.filter((s) => s.isTrue).map(
      (s) => s.id
    );

    // Correct if all checked are true and no true were missed
    const isSuccess =
      selectedIds.length === trueStatements.length &&
      selectedIds.every((id) => trueStatements.includes(id));

    if (isSuccess) {
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
    setSelectedIds([]);
    setIsChecked(false);
  };

  const handleSpeakInstruction = (e: React.MouseEvent) => {
    e.stopPropagation();
    stopSpeaking();
    speakEnglish(
      'Read "People Are Crazy About Sports," and then select the sentences that are true according to the article.',
      currentRate,
      accent === 'UK' ? 'UK' : 'US',
      () => {},
      () => {},
      'male'
    );
  };

  const handleSpeakStatement = (text: string, e: React.MouseEvent) => {
    e.stopPropagation();
    stopSpeaking();
    speakEnglish(
      text,
      currentRate,
      accent === 'UK' ? 'UK' : 'US',
      () => {},
      () => {},
      'female'
    );
  };

  const trueStatements = SPORTS2_ACT5_STATEMENTS.filter((s) => s.isTrue).map(
    (s) => s.id
  );
  const isAllCorrect =
    isChecked &&
    selectedIds.length === trueStatements.length &&
    selectedIds.every((id) => trueStatements.includes(id));

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Story Card */}
        <div className="lg:col-span-6 w-full">
          <Sports2StoryCard
            accent={accent}
            speechRate={speechRate}
            compact={true}
          />
        </div>

        {/* Right: Checkbox Options */}
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
                <div className="pr-2">
                  <h3 className="text-xs sm:text-sm font-medium text-sky-600 dark:text-sky-400 leading-snug">
                    Read &quot;People Are Crazy About Sports,&quot; and then select the sentences that are true according to the article.
                  </h3>
                </div>
                <div className="flex items-center gap-2 shrink-0">
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
                <h3 className="text-xs sm:text-sm font-medium text-emerald-600 dark:text-emerald-400 leading-snug italic">
                  Lee &quot;La gente está loca por los deportes&quot;, y luego selecciona las oraciones que son verdaderas según el artículo.
                </h3>
              </div>
            </div>
          </div>

          {/* Reversible Checkbox Statements */}
          <div className="space-y-2.5">
            {SPORTS2_ACT5_STATEMENTS.map((stmt) => {
              const isSelected = selectedIds.includes(stmt.id);
              const isFlipped = flippedItemIds.includes(stmt.id);

              let itemStyle = isDark
                ? 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-200'
                : 'bg-white border-slate-200 hover:border-slate-300 text-slate-800';

              if (isSelected) {
                itemStyle = isDark
                  ? 'bg-sky-950/40 border-sky-500 text-sky-100 ring-1 ring-sky-500/20'
                  : 'bg-sky-50/70 border-sky-400 text-sky-900 ring-1 ring-sky-200';
              }

              if (isChecked) {
                if (stmt.isTrue) {
                  itemStyle = isDark
                    ? 'bg-emerald-950/40 border-emerald-500 text-emerald-100 font-medium'
                    : 'bg-emerald-50 border-emerald-500 text-emerald-900 font-medium';
                } else if (isSelected && !stmt.isTrue) {
                  itemStyle = isDark
                    ? 'bg-rose-950/40 border-rose-500 text-rose-100'
                    : 'bg-rose-50 border-rose-400 text-rose-900';
                }
              }

              return (
                <div
                  key={stmt.id}
                  onClick={() => handleToggleFlipItem(stmt.id)}
                  className="w-full perspective-1000 cursor-pointer select-none"
                >
                  <div
                    className={`grid grid-cols-1 grid-rows-1 transition-transform duration-500 transform-style-3d ${
                      isFlipped ? 'rotate-y-180' : ''
                    }`}
                  >
                    {/* Front: English */}
                    <div
                      className={`col-start-1 row-start-1 backface-hidden w-full p-3 sm:p-3.5 rounded-xl border flex items-center justify-between gap-3 shadow-xs ${itemStyle}`}
                    >
                      <div className="flex items-start gap-3">
                        {/* Checkbox */}
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleItem(stmt.id);
                          }}
                          className={`w-5 h-5 mt-0.5 rounded border flex items-center justify-center shrink-0 cursor-pointer transition-colors ${
                            isSelected
                              ? 'bg-sky-500 border-sky-500 text-white'
                              : isDark
                              ? 'border-slate-600 bg-slate-800'
                              : 'border-slate-300 bg-white'
                          }`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5" />}
                        </div>
                        <span className="text-sm sm:text-base leading-snug">
                          {stmt.textEn}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={(e) => handleSpeakStatement(stmt.textEn, e)}
                          className="p-1 rounded-full text-slate-400 hover:text-sky-500 transition-colors cursor-pointer"
                          aria-label="Speaker"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                        {isChecked && stmt.isTrue && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        )}
                        {isChecked && isSelected && !stmt.isTrue && (
                          <XCircle className="w-4 h-4 text-rose-500" />
                        )}
                      </div>
                    </div>

                    {/* Back: Spanish */}
                    <div
                      className={`col-start-1 row-start-1 backface-hidden rotate-y-180 w-full p-3 sm:p-3.5 rounded-xl border flex items-center justify-between gap-3 shadow-xs ${
                        isDark
                          ? 'bg-slate-900 border-slate-800 text-slate-100'
                          : 'bg-white border-slate-200 text-slate-900'
                      }`}
                    >
                      <span className="text-sm sm:text-base leading-snug italic text-emerald-600 dark:text-emerald-400">
                        {stmt.textEs}
                      </span>
                      {isChecked && stmt.isTrue && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={handleClear}
              disabled={selectedIds.length === 0}
              className={`px-4 py-2 rounded-xl text-sm font-medium border flex items-center gap-2 transition-all cursor-pointer ${
                selectedIds.length === 0
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
              disabled={selectedIds.length === 0 || isChecked}
              className={`px-5 py-2 rounded-xl text-sm font-medium flex items-center gap-2 transition-all shadow-xs cursor-pointer ${
                selectedIds.length === 0 || isChecked
                  ? 'opacity-50 cursor-not-allowed bg-slate-300 dark:bg-slate-800 text-slate-500'
                  : 'bg-sky-500 hover:bg-sky-600 text-white active:scale-95'
              }`}
            >
              <Check className="w-4 h-4" />
              <span>Check</span>
            </button>
          </div>

          {/* Correct feedback banner */}
          {isAllCorrect && (
            <div
              className={`p-3.5 rounded-xl border flex items-center gap-3 animate-in fade-in duration-200 ${
                isDark
                  ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                  : 'bg-emerald-50 border-emerald-200 text-emerald-800'
              }`}
            >
              <Sparkles className="w-5 h-5 text-emerald-500 shrink-0" />
              <p className="text-sm font-medium">
                ¡Correcto! Has seleccionado todas las oraciones verdaderas según el artículo.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
