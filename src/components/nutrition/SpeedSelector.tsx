import React from 'react';
import { Gauge } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const NUTRITION_SPEEDS = [
  { label: '0.50x', value: 0.5 },
  { label: '0.65x', value: 0.65 },
  { label: '0.85x', value: 0.85 },
  { label: '1.00x', value: 1.0 },
  { label: '1.15x', value: 1.15 },
  { label: '1.30x', value: 1.3 },
];

interface SpeedSelectorProps {
  currentSpeed: number;
  onSpeedChange: (speed: number) => void;
  className?: string;
}

export const SpeedSelector: React.FC<SpeedSelectorProps> = ({
  currentSpeed,
  onSpeedChange,
  className = '',
}) => {
  const { isDark } = useTheme();

  return (
    <div
      className={`flex items-center gap-1.5 p-1.5 rounded-2xl border ${
        isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white/90 border-slate-200'
      } shadow-xs ${className}`}
    >
      <div className="flex items-center gap-1 pl-2 pr-1 text-slate-400">
        <Gauge className="w-3.5 h-3.5" />
      </div>

      <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
        {NUTRITION_SPEEDS.map((s) => {
          const isSelected = Math.abs(currentSpeed - s.value) < 0.02;
          return (
            <button
              key={s.label}
              type="button"
              onClick={() => onSpeedChange(s.value)}
              className={`px-2 py-1 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer select-none ${
                isSelected
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : isDark
                  ? 'text-slate-400 hover:text-white hover:bg-slate-800'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {s.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
