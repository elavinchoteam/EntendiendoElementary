import React, { useState } from 'react';
import { Check, RotateCcw, Volume2, RefreshCw } from 'lucide-react';
import { GOOD_MORNING_CLOZE_DATA } from '../../data/goodMorningData';
import { useTheme } from '../../context/ThemeContext';
import { playFeedbackSound, speakEnglish, stopSpeaking } from '../../utils/audio';
import { GoodMorningVideoPlayer } from './GoodMorningVideoPlayer';
import { ReversibleTextCard } from './ReversibleTextCard';

interface Activity3ClozeProps {
  speed: number;
  accent?: 'US' | 'UK';
}

export const Activity3Cloze: React.FC<Activity3ClozeProps> = ({
  speed,
  accent = 'US',
}) => {
  const { isDark } = useTheme();

  // Active word token for click-to-place
  const [selectedToken, setSelectedToken] = useState<string | null>(null);

  // Placed values: { [blankId]: tokenString }
  const [placedAnswers, setPlacedAnswers] = useState<Record<string, string>>({});

  // Check state
  const [isChecked, setIsChecked] = useState(false);

  // Active line translation flip state: { [lineId]: boolean }
  const [flippedLines, setFlippedLines] = useState<Record<string, boolean>>({});

  const tokens = GOOD_MORNING_CLOZE_DATA.tokens;

  // Track which tokens are already used
  const usedTokens = Object.values(placedAnswers);

  const handleSelectToken = (token: string) => {
    if (isChecked) return;
    playFeedbackSound('click');
    setSelectedToken((prev) => (prev === token ? null : token));
  };

  const handlePlaceToken = (blankId: string) => {
    if (isChecked) return;
    if (!selectedToken) {
      // If clicking already filled blank, remove it
      if (placedAnswers[blankId]) {
        playFeedbackSound('click');
        setPlacedAnswers((prev) => {
          const next = { ...prev };
          delete next[blankId];
          return next;
        });
      }
      return;
    }

    playFeedbackSound('click');
    setPlacedAnswers((prev) => ({
      ...prev,
      [blankId]: selectedToken,
    }));
    setSelectedToken(null);
  };

  const handleDragStart = (e: React.DragEvent, token: string) => {
    if (isChecked) return;
    e.dataTransfer.setData('text/plain', token);
  };

  const handleDrop = (e: React.DragEvent, blankId: string) => {
    e.preventDefault();
    if (isChecked) return;
    const token = e.dataTransfer.getData('text/plain');
    if (token) {
      playFeedbackSound('click');
      setPlacedAnswers((prev) => ({
        ...prev,
        [blankId]: token,
      }));
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  // Check all blanks
  const totalBlanks = 9; // office, usually, factory, a lift, school, time, seven, on, late
  const filledCount = Object.keys(placedAnswers).length;

  const handleCheck = () => {
    let allCorrect = true;
    GOOD_MORNING_CLOZE_DATA.lines.forEach((line) => {
      if (placedAnswers[line.blankId] !== line.correctAnswer) {
        allCorrect = false;
      }
      if (line.blankId2 && placedAnswers[line.blankId2] !== line.correctAnswer2) {
        allCorrect = false;
      }
    });

    playFeedbackSound(allCorrect ? 'correct' : 'wrong');
    setIsChecked(true);
  };

  const handleReset = () => {
    playFeedbackSound('click');
    setPlacedAnswers({});
    setSelectedToken(null);
    setIsChecked(false);
  };

  const toggleLineFlip = (lineId: string) => {
    playFeedbackSound('click');
    setFlippedLines((prev) => ({
      ...prev,
      [lineId]: !prev[lineId],
    }));
  };

  const handlePlayLineAudio = (textEn: string, e: React.MouseEvent) => {
    e.stopPropagation();
    stopSpeaking();
    playFeedbackSound('click');
    speakEnglish(textEn, speed, accent);
  };

  return (
    <div className="w-full flex flex-col gap-5 animate-in fade-in duration-200">
      {/* 1. Instruction Card: Reversible */}
      <ReversibleTextCard
        textEn={GOOD_MORNING_CLOZE_DATA.instructions}
        textEs={GOOD_MORNING_CLOZE_DATA.instructionsEs}
        speed={speed}
        accent={accent}
      />

      {/* 2. Main Two-Column Layout */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Video Player */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          <GoodMorningVideoPlayer
            speed={speed}
            accent={accent}
            showTranscript={false}
          />
        </div>

        {/* Right Column: Word Bank + Dialogue Lines with Blanks */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {/* Word Bank */}
          <div
            className={`w-full p-4 rounded-xl border flex flex-wrap items-center justify-center gap-2 shadow-xs ${
              isDark ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider mr-2">
              Palabras:
            </span>
            {tokens.map((token, idx) => {
              const isUsed = usedTokens.includes(token);
              const isSelected = selectedToken === token;

              return (
                <button
                  key={`${token}-${idx}`}
                  type="button"
                  draggable={!isUsed && !isChecked}
                  onDragStart={(e) => handleDragStart(e, token)}
                  onClick={() => !isUsed && handleSelectToken(token)}
                  disabled={isUsed || isChecked}
                  className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold border-2 transition-all cursor-grab active:cursor-grabbing select-none ${
                    isUsed
                      ? 'opacity-30 border-dashed border-slate-300 dark:border-slate-700 bg-transparent text-slate-400 cursor-not-allowed'
                      : isSelected
                      ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-300 shadow-md scale-105'
                      : isDark
                      ? 'bg-slate-800 border-slate-600 text-slate-200 hover:border-sky-400 hover:bg-slate-700 shadow-xs'
                      : 'bg-white border-slate-300 text-slate-800 hover:border-sky-400 hover:bg-sky-50/50 shadow-xs'
                  }`}
                >
                  {token}
                </button>
              );
            })}
          </div>

          {/* Dialogue Lines */}
          <div className="flex flex-col gap-3">
            {GOOD_MORNING_CLOZE_DATA.lines.map((line) => {
              const isFlipped = Boolean(flippedLines[line.id]);
              const val1 = placedAnswers[line.blankId];
              const isCorr1 = val1 === line.correctAnswer;

              const val2 = line.blankId2 ? placedAnswers[line.blankId2] : undefined;
              const isCorr2 = val2 === line.correctAnswer2;

              return (
                <div
                  key={line.id}
                  className="w-full perspective-1000"
                >
                  <div
                    className={`relative w-full min-h-[64px] transition-transform duration-500 transform-style-3d select-none rounded-xl border ${
                      isDark
                        ? 'bg-slate-900 border-slate-700 text-slate-100 shadow-xs'
                        : 'bg-white border-slate-200 text-slate-900 shadow-xs'
                    } ${isFlipped ? 'rotate-y-180' : ''}`}
                  >
                    {/* Front Face: Fill-in-the-blank dialogue */}
                    <div className="w-full h-full backface-hidden p-3.5 flex items-center justify-between gap-3 rounded-xl">
                      <div className="flex-1 flex flex-wrap items-center gap-1.5 text-xs sm:text-sm leading-relaxed">
                        <strong className="text-sky-600 dark:text-sky-400 font-bold shrink-0">
                          {line.speaker}:
                        </strong>
                        {line.prefix && <span>{line.prefix}</span>}

                        {/* Blank 1 */}
                        <div
                          onDragOver={handleDragOver}
                          onDrop={(e) => handleDrop(e, line.blankId)}
                          onClick={() => handlePlaceToken(line.blankId)}
                          className={`inline-flex items-center justify-center min-w-[80px] sm:min-w-[95px] h-7 sm:h-8 px-2 rounded-md border-2 border-dashed transition-all cursor-pointer ${
                            val1
                              ? isChecked
                                ? isCorr1
                                  ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200 font-bold'
                                  : 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-200 font-bold'
                                : 'border-sky-500 bg-sky-50 dark:bg-sky-950/40 text-sky-800 dark:text-sky-200 font-bold'
                              : selectedToken
                              ? 'border-sky-400 bg-sky-50/50 animate-pulse text-sky-400'
                              : 'border-slate-300 dark:border-slate-600 bg-slate-100/50 dark:bg-slate-800/50 text-slate-400'
                          }`}
                        >
                          {val1 || (
                            <span className="text-[10px] text-slate-400 font-mono select-none">
                              [ vacio ]
                            </span>
                          )}
                        </div>

                        {line.middle && <span>{line.middle}</span>}

                        {/* Blank 2 (if present) */}
                        {line.blankId2 && (
                          <div
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, line.blankId2!)}
                            onClick={() => handlePlaceToken(line.blankId2!)}
                            className={`inline-flex items-center justify-center min-w-[80px] sm:min-w-[95px] h-7 sm:h-8 px-2 rounded-md border-2 border-dashed transition-all cursor-pointer ${
                              val2
                                ? isChecked
                                  ? isCorr2
                                    ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200 font-bold'
                                    : 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-200 font-bold'
                                  : 'border-sky-500 bg-sky-50 dark:bg-sky-950/40 text-sky-800 dark:text-sky-200 font-bold'
                                : selectedToken
                                ? 'border-sky-400 bg-sky-50/50 animate-pulse text-sky-400'
                                : 'border-slate-300 dark:border-slate-600 bg-slate-100/50 dark:bg-slate-800/50 text-slate-400'
                            }`}
                          >
                            {val2 || (
                              <span className="text-[10px] text-slate-400 font-mono select-none">
                                [ vacio ]
                              </span>
                            )}
                          </div>
                        )}

                        {line.suffix && <span>{line.suffix}</span>}
                      </div>

                      {/* Flip and Audio Buttons */}
                      <div className="shrink-0 flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => toggleLineFlip(line.id)}
                          className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-all cursor-pointer ${
                            isDark
                              ? 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
                              : 'bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900'
                          }`}
                          title="Voltear para ver traducción en español"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => handlePlayLineAudio(line.fullEn, e)}
                          className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-all cursor-pointer ${
                            isDark
                              ? 'bg-slate-800 border-slate-700 text-sky-400 hover:bg-slate-700'
                              : 'bg-slate-100 border-slate-200 text-sky-600 hover:bg-slate-200'
                          }`}
                          title="Escuchar audio"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Back Face: Spanish Translation */}
                    <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 p-3.5 flex items-center justify-between gap-3 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/40 border border-emerald-300 dark:border-emerald-700">
                      <div className="flex-1 pr-2">
                        <p className="text-xs sm:text-sm font-medium text-emerald-950 dark:text-emerald-100 italic">
                          <strong className="mr-1.5 not-italic font-bold text-emerald-800 dark:text-emerald-300">
                            {line.speaker}:
                          </strong>
                          {line.fullEs}
                        </p>
                      </div>

                      <div className="shrink-0 flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => toggleLineFlip(line.id)}
                          className="w-8 h-8 rounded-lg border border-emerald-400 dark:border-emerald-600 bg-white dark:bg-slate-800 text-emerald-700 dark:text-emerald-300 flex items-center justify-center cursor-pointer hover:scale-105 transition-all shadow-xs"
                          title="Voltear al frente"
                        >
                          <RefreshCw className="w-3.5 h-3.5 rotate-180" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="w-full flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={handleReset}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border transition-all cursor-pointer ${
                isDark
                  ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                  : 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reiniciar</span>
            </button>

            <button
              type="button"
              onClick={handleCheck}
              disabled={filledCount < totalBlanks || isChecked}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold shadow-md transition-all cursor-pointer ${
                filledCount < totalBlanks || isChecked
                  ? 'opacity-50 cursor-not-allowed bg-slate-300 dark:bg-slate-700 text-slate-500'
                  : 'bg-sky-600 hover:bg-sky-500 text-white shadow-sky-600/30 hover:scale-105 active:scale-95'
              }`}
            >
              <Check className="w-4 h-4" />
              <span>Comprobar ({filledCount}/{totalBlanks})</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
