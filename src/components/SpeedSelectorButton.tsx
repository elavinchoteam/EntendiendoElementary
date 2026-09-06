import React, { useState, useEffect, useRef } from 'react';
import { Gauge, Check, ChevronDown } from 'lucide-react';
import { playFeedbackSound } from '../utils/audio';
import { useTheme } from '../context/ThemeContext';

export const SPEED_OPTIONS = [
  { value: 0.5, label: '0.50x' },
  { value: 0.65, label: '0.65x' },
  { value: 0.85, label: '0.85x' },
  { value: 1.0, label: '1x' },
  { value: 1.15, label: '1.15x' },
  { value: 1.3, label: '1.30x' },
];

export interface SpeedSelectorButtonProps {
  currentRate: number;
  onRateChange: (newRate: number) => void;
  size?: 'sm' | 'md';
  className?: string;
}

export const SpeedSelectorButton: React.FC<SpeedSelectorButtonProps> = ({
  currentRate,
  onRateChange,
  size = 'md',
  className = '',
}) => {
  const { isDark } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const currentOption =
    SPEED_OPTIONS.find((s) => Math.abs(s.value - currentRate) < 0.01) || {
      value: currentRate,
      label: `${currentRate}x`,
    };

  return (
    <div
      ref={containerRef}
      className={`relative inline-flex items-center ${className}`}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Trigger Button */}
      <button
        type="button"
        id="speed-selector-btn"
        onClick={(e) => {
          e.stopPropagation();
          playFeedbackSound('click');
          setIsOpen((prev) => !prev);
        }}
        className={`flex items-center gap-1.5 rounded-xl border font-mono font-bold transition-all cursor-pointer select-none shadow-xs ${
          size === 'sm' ? 'px-2 py-1 text-[11px]' : 'px-2.5 sm:px-3 py-1.5 text-xs'
        } ${
          isDark
            ? 'bg-slate-800/90 hover:bg-slate-700 text-sky-400 hover:text-sky-300 border-slate-600/80 shadow-slate-900/50'
            : 'bg-white hover:bg-stone-50 text-sky-700 hover:text-sky-800 border-stone-300 shadow-stone-200/50'
        }`}
        title="Seleccionar velocidad de lectura"
        aria-label="Seleccionar velocidad de lectura"
        aria-expanded={isOpen}
      >
        <Gauge className={size === 'sm' ? 'w-3 h-3 text-sky-500' : 'w-3.5 h-3.5 text-sky-500'} />
        <span>{currentOption.label}</span>
        <ChevronDown
          className={`w-3 h-3 transition-transform duration-200 opacity-70 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className={`absolute right-0 top-full mt-1.5 z-50 w-28 rounded-xl shadow-2xl border overflow-hidden animate-in fade-in zoom-in-95 duration-150 ${
            isDark
              ? 'bg-[#1E293B] border-slate-700 text-slate-100 shadow-black/60'
              : 'bg-white border-slate-200 text-slate-900 shadow-slate-300/60'
          }`}
        >
          <div
            className={`px-3 py-1.5 text-[10px] font-mono uppercase font-bold tracking-wider border-b ${
              isDark
                ? 'bg-slate-900/80 text-slate-400 border-slate-700/80'
                : 'bg-slate-50 text-slate-500 border-slate-200'
            }`}
          >
            Velocidad
          </div>

          <div className="py-1">
            {SPEED_OPTIONS.map((opt) => {
              const isSelected = Math.abs(opt.value - currentRate) < 0.01;
              return (
                <button
                  key={opt.value}
                  type="button"
                  id={`speed-option-${opt.label.replace('.', '_')}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    playFeedbackSound('click');
                    onRateChange(opt.value);
                    setIsOpen(false);
                  }}
                  className={`w-full px-3 py-1.5 text-xs font-mono font-medium flex items-center justify-between transition-colors cursor-pointer ${
                    isSelected
                      ? isDark
                        ? 'bg-sky-500/20 text-sky-300 font-bold'
                        : 'bg-sky-50 text-sky-700 font-bold'
                      : isDark
                      ? 'hover:bg-white/5 text-slate-300'
                      : 'hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <span>{opt.label}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-sky-500 shrink-0 ml-1" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
