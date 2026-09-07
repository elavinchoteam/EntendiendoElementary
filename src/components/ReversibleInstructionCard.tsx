import React, { useState } from 'react';
import { RotateCw } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { playFeedbackSound } from '../utils/audio';

interface ReversibleInstructionCardProps {
  title?: string;
  titleEs?: string;
  instructions: string;
  instructionsEs?: string;
  icon?: React.ReactNode;
  id?: string;
}

export const ReversibleInstructionCard: React.FC<ReversibleInstructionCardProps> = ({
  title,
  titleEs,
  instructions,
  instructionsEs,
  icon,
  id = 'reversible-instruction-card',
}) => {
  const { isDark } = useTheme();
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    playFeedbackSound('flip');
    setIsFlipped((prev) => !prev);
  };

  return (
    <div className="w-full perspective-1000 min-h-[72px] sm:min-h-[78px]">
      <div
        id={id}
        onClick={handleFlip}
        className={`relative w-full min-h-[72px] sm:min-h-[78px] rounded-2xl cursor-pointer select-none transition-transform duration-500 transform-style-3d border shadow-sm ${
          isFlipped ? 'rotate-y-180' : ''
        } ${
          isFlipped
            ? isDark
              ? 'bg-slate-900 border-emerald-500/40 text-white'
              : 'bg-white border-emerald-300 text-slate-900 shadow-md'
            : isDark
            ? 'bg-slate-900 border-white/10 text-white hover:border-white/20'
            : 'bg-white border-slate-200 text-slate-800 hover:border-slate-300'
        }`}
        title="Haz clic o pulsa el botón para voltear y ver la traducción"
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

          <div className="shrink-0 flex items-center">
            <button
              type="button"
              onClick={handleFlip}
              className={`p-2.5 rounded-xl border transition-all cursor-pointer shadow-2xs ${
                isDark
                  ? 'bg-slate-800 hover:bg-slate-700 text-indigo-400 border-white/10 hover:border-indigo-500/40'
                  : 'bg-white hover:bg-indigo-50 text-indigo-600 border-slate-200 hover:border-indigo-300'
              }`}
              title="Girar para ver traducción"
              aria-label="Girar para ver traducción"
            >
              <RotateCw className="w-4 h-4" />
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

          <div className="shrink-0 flex items-center">
            <button
              type="button"
              onClick={handleFlip}
              className={`p-2.5 rounded-xl border transition-all cursor-pointer shadow-2xs ${
                isDark
                  ? 'bg-emerald-950/60 hover:bg-emerald-900 text-emerald-300 border-emerald-500/40'
                  : 'bg-emerald-100 hover:bg-emerald-200 text-emerald-800 border-emerald-300'
              }`}
              title="Girar para ver en inglés"
              aria-label="Girar para ver en inglés"
            >
              <RotateCw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
