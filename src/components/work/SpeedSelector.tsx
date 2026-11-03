import React from 'react';
import { Gauge } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { playFeedbackSound } from '../../utils/audio';

interface SpeedSelectorProps {
  currentSpeed: number;
  onSpeedChange: (speed: number) => void;
}

export const SpeedSelector: React.FC<SpeedSelectorProps> = ({
  currentSpeed,
  onSpeedChange,
}) => {
  const { isDark } = useTheme();

  const speeds = [
    { label: '0.75x', value: 0.75 },
    { label: '1.0x', value: 1.0 },
    { label: '1.25x', value: 1.25 },
  ];

  return (
    <div
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border shadow-xs select-none ${
        isDark ? 'bg-slate-800 border-slate-700 text-slate-200' : 'bg-white border-slate-200 text-slate-700'
      }`}
      title="Velocidad de reproducción de audio"
    >
      <Gauge className="w-3.5 h-3.5 text-sky-500" />
      <span className="text-xs font-semibold mr-1">Velocidad:</span>
      <div className="flex items-center gap-1">
        {speeds.map((s) => {
          const isSelected = Math.abs(currentSpeed - s.value) < 0.05;
          return (
            <button
              key={s.value}
              type="button"
              onClick={() => {
                playFeedbackSound('click');
                onSpeedChange(s.value);
              }}
              className={`px-2 py-0.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                isSelected
                  ? 'bg-sky-500 text-white shadow-xs'
                  : isDark
                  ? 'text-slate-400 hover:text-white hover:bg-slate-700'
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
