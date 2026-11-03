import React from 'react';
import { Gauge } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface SpeedSelectorProps {
  speed: number;
  onSpeedChange: (newSpeed: number) => void;
}

const SPEEDS = [0.5, 0.75, 1.0, 1.25];

export const SpeedSelector: React.FC<SpeedSelectorProps> = ({
  speed,
  onSpeedChange,
}) => {
  const { isDark } = useTheme();

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400">
        <Gauge className="w-3.5 h-3.5 text-sky-500" />
        <span className="hidden sm:inline">Velocidad:</span>
      </div>
      <div className="flex items-center rounded-xl bg-slate-100 dark:bg-slate-800 p-0.5 border border-slate-200 dark:border-slate-700">
        {SPEEDS.map((s) => {
          const isActive = Math.abs(speed - s) < 0.05;
          return (
            <button
              key={s}
              type="button"
              onClick={() => onSpeedChange(s)}
              className={`px-2 py-1 rounded-lg text-xs font-bold transition-all ${
                isActive
                  ? 'bg-sky-600 text-white shadow-xs'
                  : isDark
                  ? 'text-slate-300 hover:text-white hover:bg-slate-700/60'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white'
              }`}
            >
              {s.toFixed(2)}x
            </button>
          );
        })}
      </div>
    </div>
  );
};
