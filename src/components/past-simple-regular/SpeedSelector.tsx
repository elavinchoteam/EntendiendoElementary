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
        title="Velocidad de reproducción"
      >
        <Gauge className="w-3.5 h-3.5 text-sky-500" />
        <span>{activeLabel}</span>
      </button>

      {isOpen && (
        <div
          className={`absolute right-0 mt-1.5 w-32 rounded-xl border shadow-xl py-1 z-50 animate-in fade-in zoom-in-95 ${
            isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'
          }`}
        >
          <div className="px-3 py-1 text-[11px] font-mono text-slate-400 uppercase font-bold border-b border-inherit/40">
            Velocidad
          </div>
          {PLAYBACK_SPEEDS.map((sp) => (
            <button
              key={sp.value}
              type="button"
              onClick={() => {
                onSpeedChange(sp.value);
                setIsOpen(false);
              }}
              className={`w-full px-3 py-1.5 text-xs text-left font-semibold flex items-center justify-between cursor-pointer transition-colors ${
                Math.abs(currentSpeed - sp.value) < 0.01
                  ? 'bg-sky-500/20 text-sky-600 dark:text-sky-400'
                  : isDark
                  ? 'hover:bg-slate-800 text-slate-300'
                  : 'hover:bg-slate-50 text-slate-700'
              }`}
            >
              <span>{sp.label}</span>
              {Math.abs(currentSpeed - sp.value) < 0.01 && (
                <Check className="w-3.5 h-3.5 text-sky-500" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
