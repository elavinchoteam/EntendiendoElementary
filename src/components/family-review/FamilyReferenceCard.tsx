import React, { useState } from 'react';
import { Volume2, RotateCcw, PhoneCall } from 'lucide-react';
import {
  ELLEN_MESSAGE_FULL_AUDIO,
  ELLEN_MESSAGE_FULL_ES,
} from '../../data/familyReviewData';
import { speakEnglish, stopSpeaking, playFeedbackSound } from '../../utils/audio';
import { useTheme } from '../../context/ThemeContext';

interface FamilyReferenceCardProps {
  speed?: number;
  accent?: 'US' | 'UK';
  className?: string;
}

export const FamilyReferenceCard: React.FC<FamilyReferenceCardProps> = ({
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
      ELLEN_MESSAGE_FULL_AUDIO,
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
            : 'bg-[#f4efe4] border-[#d8cdb8] text-[#3e3428]'
        } ${isFlipped ? 'rotate-y-180' : ''}`}
        title="Haz clic para alternar entre inglés y castellano"
      >
        {/* FRONT: English voicemail memo */}
        <div
          className={`col-start-1 row-start-1 w-full rounded-3xl p-4 sm:p-5 flex flex-col justify-between backface-hidden relative ${
            isFlipped ? 'invisible pointer-events-none' : ''
          }`}
        >
          {/* Decorative Pushpin / Memo Pin */}
          <div className="absolute top-3 left-3 w-3.5 h-3.5 rounded-full bg-slate-400 border border-slate-600 shadow-sm flex items-center justify-center opacity-80 pointer-events-none">
            <div className="w-1 h-1 rounded-full bg-slate-700" />
          </div>
          <div className="absolute top-3 right-3 w-3.5 h-3.5 rounded-full bg-slate-400 border border-slate-600 shadow-sm flex items-center justify-center opacity-80 pointer-events-none">
            <div className="w-1 h-1 rounded-full bg-slate-700" />
          </div>

          <div>
            {/* Header / Title */}
            <div className="flex items-start justify-between gap-2 mb-2 pb-2 border-b border-inherit/20 pl-4 pr-1">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 flex items-center gap-1">
                  <PhoneCall className="w-3 h-3" />
                  Voicemail Memo · Ellen's Message
                </span>
                <h4 className="text-base sm:text-lg font-serif font-extrabold text-sky-600 dark:text-sky-400 tracking-tight leading-tight">
                  Message for Dad
                </h4>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggleFlip();
                  }}
                  className="px-2 py-0.5 rounded-lg text-[10px] font-mono font-bold bg-sky-500/15 border border-sky-500/30 text-sky-600 dark:text-sky-400 hover:bg-sky-500/25 flex items-center gap-1 transition-all cursor-pointer"
                  title="Ver traducción al castellano"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Castellano</span>
                </button>
                <button
                  type="button"
                  onClick={handleSpeak}
                  className="p-1 rounded-lg border border-inherit/20 hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                  aria-label="Escuchar mensaje de voz"
                  title="Escuchar mensaje de voz"
                >
                  <Volume2
                    className={`w-3.5 h-3.5 ${
                      isPlaying ? 'text-emerald-500 animate-pulse' : 'text-sky-500'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Message Body */}
            <div className="space-y-1.5 text-xs sm:text-sm font-sans leading-relaxed py-1 max-h-[210px] sm:max-h-[230px] overflow-y-auto pr-1">
              <p className="font-bold text-sky-700 dark:text-sky-300">
                "Hi, Dad! It's Ellen."
              </p>
              <p className="opacity-90">
                I called last night, but I didn't get an answer. Where were you?
              </p>
              <p className="opacity-90">
                <strong>Aunt Minnie and Uncle Joe</strong> are taking me to the <strong>airport</strong> now.
              </p>
              <p className="opacity-90">
                The plane leaves at <strong>3:00 p.m.</strong> I arrive at <strong>5:00 p.m.</strong> Please be there.
              </p>
              <p className="opacity-90">
                They gave me <strong>lots of presents</strong> for everyone and I need help with my <strong>luggage</strong>. See you soon!
              </p>
            </div>
          </div>

          <div className="pt-2 mt-2 border-t border-inherit/15 flex items-center justify-between text-[10px] font-mono opacity-60">
            <span>Mensaje de voz · Ellen</span>
            <span>Clic para traducir ↻</span>
          </div>
        </div>

        {/* BACK: Spanish translation with memo aesthetic */}
        <div
          className={`col-start-1 row-start-1 w-full rounded-3xl p-4 sm:p-5 flex flex-col justify-between backface-hidden rotate-y-180 relative ${
            !isFlipped ? 'invisible pointer-events-none' : ''
          }`}
        >
          {/* Decorative Pushpin */}
          <div className="absolute top-3 left-3 w-3.5 h-3.5 rounded-full bg-emerald-400 border border-emerald-600 shadow-sm flex items-center justify-center opacity-80 pointer-events-none">
            <div className="w-1 h-1 rounded-full bg-emerald-700" />
          </div>
          <div className="absolute top-3 right-3 w-3.5 h-3.5 rounded-full bg-emerald-400 border border-emerald-600 shadow-sm flex items-center justify-center opacity-80 pointer-events-none">
            <div className="w-1 h-1 rounded-full bg-emerald-700" />
          </div>

          <div>
            {/* Header / Title */}
            <div className="flex items-start justify-between gap-2 mb-2 pb-2 border-b border-inherit/20 pl-4 pr-1">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <PhoneCall className="w-3 h-3" />
                  Traducción · Mensaje de Voz
                </span>
                <h4 className="text-base sm:text-lg font-serif font-extrabold text-emerald-600 dark:text-emerald-400 tracking-tight leading-tight">
                  Mensaje para Papá
                </h4>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggleFlip();
                }}
                className="px-2 py-0.5 rounded-lg text-[10px] font-mono font-bold bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/25 flex items-center gap-1 transition-all cursor-pointer shrink-0"
                title="Volver al mensaje en inglés"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Inglés</span>
              </button>
            </div>

            {/* Message Body ES */}
            <div className="space-y-1.5 text-xs sm:text-sm font-sans leading-relaxed py-1 font-serif max-h-[210px] sm:max-h-[230px] overflow-y-auto pr-1">
              <p className="font-bold text-emerald-700 dark:text-emerald-300 not-italic">
                "¡Hola, papá! Soy Ellen."
              </p>
              <p className="opacity-90 leading-normal">
                {ELLEN_MESSAGE_FULL_ES}
              </p>
            </div>
          </div>

          <div className="pt-2 mt-2 border-t border-inherit/15 flex items-center justify-between text-[10px] font-mono opacity-60">
            <span>Traducción contextual</span>
            <span>Castellano</span>
          </div>
        </div>
      </div>
    </div>
  );
};
