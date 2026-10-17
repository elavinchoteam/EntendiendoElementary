import React, { useState } from 'react';
import { Volume2, RotateCcw, Store, Clock } from 'lucide-react';
import {
  WERE_CLOSED_FULL_AUDIO,
  WERE_CLOSED_FULL_ES,
  WERE_CLOSED_DIALOGUE,
} from '../../data/wereClosedData';
import { speakEnglish, stopSpeaking, playFeedbackSound } from '../../utils/audio';
import { useTheme } from '../../context/ThemeContext';

interface WereClosedReferenceCardProps {
  speed?: number;
  accent?: 'US' | 'UK';
  className?: string;
}

export const WereClosedReferenceCard: React.FC<WereClosedReferenceCardProps> = ({
  speed = 1.0,
  accent = 'US',
  className = '',
}) => {
  const { isDark } = useTheme();
  const [isFlipped, setIsFlipped] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleToggleFlip = () => {
    playFeedbackSound('click');
    setIsFlipped((prev) => !prev);
  };

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPlaying) {
      stopSpeaking();
      setIsPlaying(false);
      return;
    }
    playFeedbackSound('click');
    speakEnglish(
      WERE_CLOSED_FULL_AUDIO,
      speed,
      accent,
      () => setIsPlaying(true),
      () => setIsPlaying(false)
    );
  };

  return (
    <div className={`w-full perspective-1000 ${className}`}>
      <div
        role="button"
        tabIndex={0}
        onClick={handleToggleFlip}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleToggleFlip();
          }
        }}
        className={`grid grid-cols-1 grid-rows-1 w-full transition-transform duration-500 transform-style-3d cursor-pointer select-none rounded-3xl border shadow-sm ${
          isDark
            ? 'bg-slate-900 border-white/10 text-[#f2e9dc]'
            : 'bg-[#fbf7ee] border-[#dfd6c5] text-[#3e3428]'
        } ${isFlipped ? 'rotate-y-180' : ''}`}
        title="Haz clic para alternar entre inglés y castellano"
      >
        {/* FRONT: English dialogue reference */}
        <div
          className={`col-start-1 row-start-1 w-full rounded-3xl p-4 sm:p-5 flex flex-col justify-between backface-hidden relative ${
            isFlipped ? 'invisible pointer-events-none' : ''
          }`}
        >
          {/* Decorative Pushpins */}
          <div className="absolute top-3 left-3 w-3.5 h-3.5 rounded-full bg-amber-400 border border-amber-600 shadow-sm flex items-center justify-center opacity-85 pointer-events-none">
            <div className="w-1 h-1 rounded-full bg-amber-700" />
          </div>
          <div className="absolute top-3 right-3 w-3.5 h-3.5 rounded-full bg-amber-400 border border-amber-600 shadow-sm flex items-center justify-center opacity-85 pointer-events-none">
            <div className="w-1 h-1 rounded-full bg-amber-700" />
          </div>

          <div>
            {/* Header / Title */}
            <div className="flex items-start justify-between gap-2 mb-2 pb-2 border-b border-inherit/20 pl-4 pr-1">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 flex items-center gap-1">
                  <Store className="w-3 h-3" />
                  Store Notice · We're Closed
                </span>
                <h4 className="text-base sm:text-lg font-serif font-extrabold text-amber-800 dark:text-amber-300 tracking-tight leading-tight">
                  Store Hours Dialogue
                </h4>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggleFlip();
                  }}
                  className="px-2 py-0.5 rounded-lg text-[10px] font-mono font-bold bg-amber-500/15 border border-amber-500/30 text-amber-700 dark:text-amber-400 hover:bg-amber-500/25 flex items-center gap-1 transition-all cursor-pointer"
                  title="Ver traducción al castellano"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Castellano</span>
                </button>
                <button
                  type="button"
                  onClick={handleSpeak}
                  className="p-1 rounded-lg border border-inherit/20 hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                  aria-label="Escuchar diálogo completo"
                  title="Escuchar diálogo completo"
                >
                  <Volume2
                    className={`w-3.5 h-3.5 ${
                      isPlaying ? 'text-emerald-500 animate-pulse' : 'text-amber-600 dark:text-amber-400'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Dialogue Body */}
            <div className="space-y-1.5 text-xs sm:text-sm font-sans leading-relaxed py-1 max-h-[210px] sm:max-h-[230px] overflow-y-auto pr-1">
              {WERE_CLOSED_DIALOGUE.map((line) => (
                <div key={line.id} className="flex items-baseline gap-2">
                  <span
                    className={`font-mono text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      line.speaker === 'Clerk'
                        ? 'bg-sky-500/15 text-sky-700 dark:text-sky-300'
                        : 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300'
                    }`}
                  >
                    {line.speaker}:
                  </span>
                  <span className="opacity-95 font-medium">{line.textEn}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 mt-2 border-t border-inherit/15 flex items-center justify-between text-[10px] font-mono opacity-60">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              Hours: 9-1 & 2:30-6
            </span>
            <span>Clic para traducir ↻</span>
          </div>
        </div>

        {/* BACK: Spanish translation */}
        <div
          className={`col-start-1 row-start-1 w-full rounded-3xl p-4 sm:p-5 flex flex-col justify-between backface-hidden rotate-y-180 relative ${
            !isFlipped ? 'invisible pointer-events-none' : ''
          }`}
        >
          {/* Decorative Pushpins */}
          <div className="absolute top-3 left-3 w-3.5 h-3.5 rounded-full bg-emerald-400 border border-emerald-600 shadow-sm flex items-center justify-center opacity-85 pointer-events-none">
            <div className="w-1 h-1 rounded-full bg-emerald-700" />
          </div>
          <div className="absolute top-3 right-3 w-3.5 h-3.5 rounded-full bg-emerald-400 border border-emerald-600 shadow-sm flex items-center justify-center opacity-85 pointer-events-none">
            <div className="w-1 h-1 rounded-full bg-emerald-700" />
          </div>

          <div>
            {/* Header / Title */}
            <div className="flex items-start justify-between gap-2 mb-2 pb-2 border-b border-inherit/20 pl-4 pr-1">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <Store className="w-3 h-3" />
                  Aviso de la Tienda · Traducción
                </span>
                <h4 className="text-base sm:text-lg font-serif font-extrabold text-emerald-600 dark:text-emerald-400 tracking-tight leading-tight">
                  Horarios de Atención
                </h4>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggleFlip();
                }}
                className="px-2 py-0.5 rounded-lg text-[10px] font-mono font-bold bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/25 flex items-center gap-1 transition-all cursor-pointer shrink-0"
                title="Volver al diálogo en inglés"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Inglés</span>
              </button>
            </div>

            {/* Translation Body */}
            <div className="space-y-1.5 text-xs sm:text-sm font-sans leading-relaxed py-1 max-h-[210px] sm:max-h-[230px] overflow-y-auto pr-1">
              {WERE_CLOSED_DIALOGUE.map((line) => (
                <div key={line.id} className="flex items-baseline gap-2">
                  <span
                    className={`font-mono text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      line.speakerEs === 'Dependiente'
                        ? 'bg-sky-500/15 text-sky-700 dark:text-sky-300'
                        : 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300'
                    }`}
                  >
                    {line.speakerEs}:
                  </span>
                  <span className="opacity-95 font-medium">{line.textEs}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 mt-2 border-t border-inherit/15 flex items-center justify-between text-[10px] font-mono opacity-60">
            <span>Horario: 9 a 1 y 2:30 a 6</span>
            <span>Castellano</span>
          </div>
        </div>
      </div>
    </div>
  );
};
