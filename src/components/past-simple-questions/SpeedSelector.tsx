import React from 'react';
import { Gauge } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { playFeedbackSound } from '../../utils/audio';

interface SpeedSelectorProps {
  speed: number;
  onSpeedChange: (speed: number) => void;
}

const SPEEDS = [
  { value: 0.75, label: '0.75x' },
  { value: 0.9, label: '0.9x' },
  { value: 1.0, label: '1.0x' },
];

export const SpeedSelector: React.FC<SpeedSelectorProps> = ({
  speed,
  onSpeedChange,
}) => {
  const { isDark } = useTheme();

  return (
    <div
      className={`inline-flex items-center gap-1.5 p-1 rounded-xl border transition-colors ${
        isDark
          ? 'bg-slate-900/80 border-slate-700/70 text-slate-300'
          : 'bg-white border-slate-200 text-slate-700 shadow-xs'
      }`}
      title="Velocidad de reproducción de audio"
    >
      <div className="flex items-center gap-1 pl-1.5 pr-0.5 text-xs font-mono font-medium opacity-70">
        <Gauge className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Velocidad:</span>
      </div>
      <div className="flex items-center gap-1">
        {SPEEDS.map((s) => {
          const isSelected = Math.abs(speed - s.value) < 0.05;
          return (
            <button
              key={s.value}
              type="button"
              onClick={() => {
                playFeedbackSound('click');
                onSpeedChange(s.value);
              }}
              className={`px-2 py-0.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                isSelected
                  ? 'bg-sky-600 text-white shadow-xs'
                  : isDark
                  ? 'hover:bg-slate-800 text-slate-400 hover:text-slate-200'
                  : 'hover:bg-slate-100 text-slate-600 hover:text-slate-900'
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
