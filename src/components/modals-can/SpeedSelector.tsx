import React from 'react';
import { Gauge } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface SpeedSelectorProps {
  currentRate: number;
  onRateChange: (rate: number) => void;
}

const SPEED_OPTIONS = [
  { label: '0.50x', value: 0.5 },
  { label: '0.75x', value: 0.75 },
  { label: '0.85x', value: 0.85 },
  { label: '1.00x', value: 1.0 },
  { label: '1.15x', value: 1.15 },
  { label: '1.30x', value: 1.3 },
];

export const SpeedSelector: React.FC<SpeedSelectorProps> = ({ currentRate, onRateChange }) => {
  const { isDark } = useTheme();

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold shadow-sm transition-all ${
        isDark ? 'bg-slate-800/90 border-slate-700 text-slate-200' : 'bg-white border-slate-200 text-slate-700'
      }`}
    >
      <Gauge className="w-3.5 h-3.5 text-sky-500 shrink-0" />
      <span className="text-[11px] font-medium text-slate-400 mr-1 hidden sm:inline">Velocidad:</span>
      <div className="flex items-center gap-1">
        {SPEED_OPTIONS.map((opt) => {
          const isSelected = Math.abs(currentRate - opt.value) < 0.05;
          return (
            <button
              key={opt.label}
              onClick={() => onRateChange(opt.value)}
              className={`px-1.5 py-0.5 rounded text-[11px] transition-colors ${
                isSelected
                  ? 'bg-sky-500 text-white font-bold shadow-xs'
                  : isDark
                  ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-700'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
              title={`Velocidad de reproducción ${opt.label}`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
