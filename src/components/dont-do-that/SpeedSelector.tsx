import React, { useState, useRef, useEffect } from 'react';
import { Gauge, Check } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { playFeedbackSound } from '../../utils/audio';

interface SpeedSelectorProps {
  currentSpeed: number;
  onSpeedChange: (speed: number) => void;
}

const SPEEDS = [
  { value: 0.5, label: '0.50x' },
  { value: 0.75, label: '0.75x' },
  { value: 0.9, label: '0.90x' },
  { value: 1.0, label: '1.00x' },
  { value: 1.15, label: '1.15x' },
  { value: 1.3, label: '1.30x' },
];

export const SpeedSelector: React.FC<SpeedSelectorProps> = ({
  currentSpeed,
  onSpeedChange,
}) => {
  const { isDark } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (speed: number) => {
    playFeedbackSound('click');
    onSpeedChange(speed);
    setIsOpen(false);
  };

  const currentLabel =
    SPEEDS.find((s) => Math.abs(s.value - currentSpeed) < 0.05)?.label ||
    `${currentSpeed.toFixed(2)}x`;

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => {
          playFeedbackSound('click');
          setIsOpen((prev) => !prev);
        }}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono font-bold transition-all cursor-pointer shadow-xs ${
          isDark
            ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'
            : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
        }`}
        title="Velocidad de reproducción de voz"
        aria-label="Seleccionar velocidad de voz"
      >
        <Gauge className="w-3.5 h-3.5 text-sky-500" />
        <span>{currentLabel}</span>
      </button>

      {isOpen && (
        <div
          className={`absolute right-0 mt-1 w-32 rounded-xl shadow-lg border py-1 z-50 ${
            isDark
              ? 'bg-slate-800 border-slate-700 text-slate-200'
              : 'bg-white border-slate-200 text-slate-800'
          }`}
        >
          <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-200 dark:border-slate-700">
            Velocidad
          </div>
          {SPEEDS.map((s) => {
            const isSelected = Math.abs(s.value - currentSpeed) < 0.05;
            return (
              <button
                key={s.value}
                type="button"
                onClick={() => handleSelect(s.value)}
                className={`w-full flex items-center justify-between px-3 py-1.5 text-xs font-mono transition-colors ${
                  isSelected
                    ? 'bg-sky-50 dark:bg-sky-950/50 text-sky-600 dark:text-sky-400 font-bold'
                    : 'hover:bg-slate-100 dark:hover:bg-slate-700/60'
                }`}
              >
                <span>{s.label}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-sky-500" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
