import React, { useState } from 'react';
import { Volume2, RotateCw } from 'lucide-react';
import { speakEnglish, stopSpeaking } from '../../utils/audio';
import { useTheme } from '../../context/ThemeContext';

interface ReversibleOptionChipProps {
  en: string;
  es: string;
  isSelected: boolean;
  onSelect: (value: string) => void;
  speed?: number;
  accent?: 'US' | 'UK';
  disabled?: boolean;
}

export const ReversibleOptionChip: React.FC<ReversibleOptionChipProps> = ({
  en,
  es,
  isSelected,
  onSelect,
  speed = 1.0,
  accent = 'US',
  disabled = false,
}) => {
  const { isDark } = useTheme();
  const [isFlipped, setIsFlipped] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    stopSpeaking();
    setIsPlaying(true);
    speakEnglish(en, speed, accent, undefined, () => setIsPlaying(false));
  };

  const handleFlip = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFlipped((prev) => !prev);
  };

  return (
    <div
      draggable={!disabled}
      onDragStart={(e) => {
        if (!disabled) {
          e.dataTransfer.setData('text/plain', en);
        }
      }}
      onClick={() => {
        if (!disabled) {
          onSelect(en);
        }
      }}
      className={`group relative inline-flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl border-2 transition-all cursor-pointer select-none shadow-xs active:scale-95 ${
        isSelected
          ? 'bg-sky-500 border-sky-600 text-white font-bold ring-2 ring-sky-300 dark:ring-sky-700 shadow-md scale-105'
          : isDark
          ? 'bg-slate-800 hover:bg-slate-700/80 border-slate-700 text-slate-100 hover:border-sky-500/60'
          : 'bg-white hover:bg-sky-50/70 border-slate-200 text-slate-800 hover:border-sky-300'
      } ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
      title={isFlipped ? `Español: ${es} (clic en 🔄 para ver inglés)` : `Inglés: ${en} (clic en 🔄 para traducir)`}
    >
      {/* Text display with flip indicator */}
      <span className="font-semibold text-sm sm:text-base tracking-tight">
        {isFlipped ? es : en}
      </span>

      {/* Tiny language indicator badge */}
      <span
        className={`text-[9px] font-mono uppercase px-1 py-0.5 rounded font-bold ${
          isSelected
            ? 'bg-white/20 text-white'
            : isFlipped
            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300'
            : 'bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-300'
        }`}
      >
        {isFlipped ? 'ES' : 'EN'}
      </span>

      {/* Audio Button */}
      <button
        type="button"
        onClick={handleAudio}
        className={`p-1 rounded-md transition-colors ${
          isSelected
            ? 'hover:bg-white/20 text-white'
            : isPlaying
            ? 'text-sky-500 animate-pulse'
            : isDark
            ? 'text-slate-400 hover:text-sky-400 hover:bg-slate-700'
            : 'text-slate-400 hover:text-sky-600 hover:bg-slate-100'
        }`}
        title="Escuchar pronunciación"
      >
        <Volume2 className="w-3.5 h-3.5" />
      </button>

      {/* Flip Button */}
      <button
        type="button"
        onClick={handleFlip}
        className={`p-1 rounded-md transition-all ${
          isSelected
            ? 'hover:bg-white/20 text-white'
            : isDark
            ? 'text-slate-400 hover:text-emerald-400 hover:bg-slate-700'
            : 'text-slate-400 hover:text-emerald-600 hover:bg-slate-100'
        }`}
        title={isFlipped ? 'Ver en inglés' : 'Traducir al español'}
      >
        <RotateCw className={`w-3.5 h-3.5 transition-transform ${isFlipped ? 'rotate-180 text-emerald-500' : ''}`} />
      </button>
    </div>
  );
};
