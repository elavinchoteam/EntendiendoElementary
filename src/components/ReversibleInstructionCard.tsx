import React, { useState } from 'react';
import { Volume2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { playFeedbackSound, speakEnglish, stopSpeaking } from '../utils/audio';
import { SpeedSelectorButton } from './SpeedSelectorButton';

interface ReversibleInstructionCardProps {
  title?: string;
  titleEs?: string;
  instructions: string;
  instructionsEs?: string;
  icon?: React.ReactNode;
  id?: string;
  speechRate?: number;
  accent?: 'US' | 'UK';
}

export const ReversibleInstructionCard: React.FC<ReversibleInstructionCardProps> = ({
  title,
  titleEs,
  instructions,
  instructionsEs,
  icon,
  id = 'reversible-instruction-card',
  speechRate = 1.0,
  accent = 'US',
}) => {
  const { isDark } = useTheme();
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentRate, setCurrentRate] = useState(speechRate);
  const [isPlaying, setIsPlaying] = useState(false);

  const safeAccent = accent === 'UK' ? 'UK' : 'US';

  const handleFlip = () => {
    playFeedbackSound('flip');
    setIsFlipped((prev) => !prev);
  };

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPlaying) {
      stopSpeaking();
      setIsPlaying(false);
      return;
    }
    const textToSpeak = isFlipped
      ? instructionsEs || instructions
      : `${title ? title + '. ' : ''}${instructions}`;
    setIsPlaying(true);
    speakEnglish(
      textToSpeak,
      currentRate,
      safeAccent,
      () => setIsPlaying(true),
      () => setIsPlaying(false)
    );
  };

  const handleSpeedChange = (newRate: number) => {
    setCurrentRate(newRate);
    if (isPlaying) {
      stopSpeaking();
      const textToSpeak = isFlipped
        ? instructionsEs || instructions
        : `${title ? title + '. ' : ''}${instructions}`;
      speakEnglish(
        textToSpeak,
        newRate,
        safeAccent,
        () => setIsPlaying(true),
        () => setIsPlaying(false)
      );
    }
  };

  return (
    <div className="w-full perspective-1000 min-h-[72px] sm:min-h-[78px]">
      <div
        id={id}
        onClick={handleFlip}
        className={`relative w-full min-h-[72px] sm:min-h-[78px] rounded-2xl cursor-pointer select-none transition-transform duration-500 transform-style-3d border shadow-xs ${
          isFlipped ? 'rotate-y-180' : ''
        } ${
          isFlipped
            ? isDark
              ? 'bg-slate-900 border-emerald-500/40 text-white'
              : 'bg-white border-emerald-300 text-slate-900'
            : isDark
            ? 'bg-slate-900 border-white/10 text-white hover:border-white/20'
            : 'bg-white border-slate-200 text-slate-800 hover:border-slate-300'
        }`}
      >
        {/* Cara Frontal: Inglés */}
        <div className="w-full h-full p-4 sm:p-5 flex items-center justify-between gap-4 backface-hidden">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            {icon && <div className="shrink-0">{icon}</div>}
            <div className="flex flex-col gap-0.5">
              {title && (
                <h3 className="text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                  {title}
                </h3>
              )}
              <p
                className={`${
                  title
                    ? 'text-xs sm:text-sm text-slate-600 dark:text-slate-300'
                    : 'text-base sm:text-lg font-bold text-slate-900 dark:text-white'
                } leading-snug`}
              >
                {instructions}
              </p>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-2">
            <SpeedSelectorButton
              currentRate={currentRate}
              onRateChange={handleSpeedChange}
              size="sm"
            />
            <button
              type="button"
              onClick={handleSpeak}
              className={`p-2 rounded-xl border transition-all cursor-pointer shadow-2xs ${
                isPlaying
                  ? 'bg-sky-500 text-white border-sky-600 ring-2 ring-sky-400/30'
                  : isDark
                  ? 'bg-slate-800 hover:bg-slate-700 text-sky-400 border-white/10'
                  : 'bg-white hover:bg-stone-100 text-sky-600 border-slate-200'
              }`}
              title="Escuchar instrucción"
              aria-label="Escuchar instrucción"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Cara Trasera: Español */}
        <div className="absolute inset-0 w-full h-full p-4 sm:p-5 flex items-center justify-between gap-4 backface-hidden rotate-y-180">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            {icon && <div className="shrink-0">{icon}</div>}
            <div className="flex flex-col gap-0.5">
              {titleEs && (
                <h3 className="text-base sm:text-lg font-bold tracking-tight text-emerald-700 dark:text-emerald-400">
                  {titleEs}
                </h3>
              )}
              <p
                className={`${
                  titleEs
                    ? 'text-xs sm:text-sm text-slate-700 dark:text-slate-200'
                    : 'text-base sm:text-lg font-bold text-slate-900 dark:text-white'
                } italic leading-snug`}
              >
                {instructionsEs || instructions}
              </p>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-2">
            <SpeedSelectorButton
              currentRate={currentRate}
              onRateChange={handleSpeedChange}
              size="sm"
            />
            <button
              type="button"
              onClick={handleSpeak}
              className={`p-2 rounded-xl border transition-all cursor-pointer shadow-2xs ${
                isPlaying
                  ? 'bg-emerald-600 text-white border-emerald-700 ring-2 ring-emerald-400/30'
                  : isDark
                  ? 'bg-slate-800 hover:bg-slate-700 text-emerald-400 border-white/10'
                  : 'bg-white hover:bg-emerald-50 text-emerald-600 border-emerald-200'
              }`}
              title="Escuchar instrucción"
              aria-label="Escuchar instrucción"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
