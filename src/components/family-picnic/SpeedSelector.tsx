import React, { useState, useRef, useEffect } from 'react';
import { Gauge, Check } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const PLAYBACK_SPEEDS = [
  { value: 0.5, label: '0.50x' },
  { value: 0.65, label: '0.65x' },
  { value: 0.85, label: '0.85x' },
  { value: 1.0, label: '1x' },
  { value: 1.15, label: '1.15x' },
  { value: 1.3, label: '1.30x' },
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
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const activeLabel =
    PLAYBACK_SPEEDS.find((s) => Math.abs(s.value - currentSpeed) < 0.01)?.label || `${currentSpeed}x`;

  return (
    <div ref={containerRef} className={`relative inline-block ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-mono font-medium transition-colors cursor-pointer ${
          isDark
            ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
            : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300 shadow-xs'
        }`}
        title="Velocidad de reproducción de audio"
      >
        <Gauge className="w-3.5 h-3.5 text-sky-500" />
        <span>{activeLabel}</span>
      </button>

      {isOpen && (
        <div
          className={`absolute right-0 mt-1.5 w-32 py-1 rounded-xl shadow-xl border z-50 animate-in fade-in zoom-in-95 duration-150 ${
            isDark
              ? 'bg-slate-900 border-slate-700 text-slate-200 shadow-slate-950/60'
              : 'bg-white border-slate-200 text-slate-700 shadow-slate-300/60'
          }`}
        >
          <div className="px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 border-b border-inherit mb-1">
            Velocidad
          </div>
          {PLAYBACK_SPEEDS.map((s) => {
            const isSelected = Math.abs(s.value - currentSpeed) < 0.01;
            return (
              <button
                key={s.value}
                type="button"
                onClick={() => {
                  onSpeedChange(s.value);
                  setIsOpen(false);
                }}
                className={`w-full px-2.5 py-1.5 text-xs font-mono flex items-center justify-between text-left transition-colors cursor-pointer ${
                  isSelected
                    ? isDark
                      ? 'bg-sky-500/20 text-sky-300 font-bold'
                      : 'bg-sky-50 text-sky-600 font-bold'
                    : isDark
                    ? 'hover:bg-slate-800 text-slate-300'
                    : 'hover:bg-slate-100 text-slate-700'
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
