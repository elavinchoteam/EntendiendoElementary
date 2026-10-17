import React, { useState } from 'react';
import { Volume2, RotateCcw } from 'lucide-react';
import {
  MAD_MOS_FLYER,
  MAD_MOS_REFERENCE_AUDIO,
} from '../../data/madMosDepartmentStoreData';
import { speakEnglish, stopSpeaking, playFeedbackSound } from '../../utils/audio';
import { useTheme } from '../../context/ThemeContext';

interface MadMosReferenceCardProps {
  speed?: number;
  accent?: 'US' | 'UK';
  className?: string;
}

export const MadMosReferenceCard: React.FC<MadMosReferenceCardProps> = ({
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
      MAD_MOS_REFERENCE_AUDIO,
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
            ? 'bg-[#2b2720] border-[#554a3a] text-[#f2e9dc]'
            : 'bg-[#f4efe4] border-[#d8cdb8] text-[#3e3428]'
        } ${isFlipped ? 'rotate-y-180' : ''}`}
        title="Haz clic para alternar entre inglés y castellano"
      >
        {/* FRONT: English flyer with pinned aesthetic */}
        <div
          className={`col-start-1 row-start-1 w-full rounded-3xl p-4 sm:p-5 flex flex-col justify-between backface-hidden relative ${
            isFlipped ? 'invisible pointer-events-none' : ''
          }`}
        >
          {/* Decorative Pushpins */}
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
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                  Ad Flyer · Store Notice
                </span>
                <h4 className="text-lg sm:text-xl font-serif font-extrabold text-sky-600 dark:text-sky-400 tracking-tight leading-tight">
                  {MAD_MOS_FLYER.titleEn}
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
                  aria-label="Escuchar anuncio"
                  title="Escuchar anuncio"
                >
                  <Volume2
                    className={`w-3.5 h-3.5 ${
                      isPlaying ? 'text-emerald-500 animate-pulse' : 'text-sky-500'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Flyer Body */}
            <div className="space-y-2 text-xs sm:text-sm font-sans leading-relaxed py-1 max-h-[210px] sm:max-h-[230px] overflow-y-auto pr-1">
              <p className="font-bold text-sky-700 dark:text-sky-300">
                {MAD_MOS_FLYER.taglineEn}
              </p>
              <p className="opacity-90 leading-normal">{MAD_MOS_FLYER.introEn}</p>

              <ul className="space-y-1 pl-2 font-medium">
                {MAD_MOS_FLYER.bargains.map((b, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="font-bold text-sky-500 shrink-0">•</span>
                    <span>
                      <strong>{b.itemEn}:</strong> {b.discountEn}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="pt-1 space-y-1 border-t border-inherit/15">
                <p className="opacity-90 text-[11px] sm:text-xs">{MAD_MOS_FLYER.hoursEn}</p>
                <p className="font-bold text-sky-700 dark:text-sky-300 text-xs sm:text-sm">
                  {MAD_MOS_FLYER.callToActionEn}
                </p>
              </div>
            </div>
          </div>

          <div className="pt-2 mt-2 border-t border-inherit/15 flex items-center justify-between text-[10px] font-mono opacity-60">
            <span>Anuncio Oficial de Mad Mo</span>
            <span>Clic para traducir ↻</span>
          </div>
        </div>

        {/* BACK: Spanish translation with pinned aesthetic */}
        <div
          className={`col-start-1 row-start-1 w-full rounded-3xl p-4 sm:p-5 flex flex-col justify-between backface-hidden rotate-y-180 relative ${
            !isFlipped ? 'invisible pointer-events-none' : ''
          }`}
        >
          {/* Decorative Pushpins */}
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
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  Traducción · Tienda
                </span>
                <h4 className="text-lg sm:text-xl font-serif font-extrabold text-emerald-600 dark:text-emerald-400 tracking-tight leading-tight">
                  {MAD_MOS_FLYER.titleEs}
                </h4>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggleFlip();
                }}
                className="px-2 py-0.5 rounded-lg text-[10px] font-mono font-bold bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/25 flex items-center gap-1 transition-all cursor-pointer shrink-0"
                title="Volver al anuncio en inglés"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Inglés</span>
              </button>
            </div>

            {/* Flyer Body ES */}
            <div className="space-y-2 text-xs sm:text-sm font-sans leading-relaxed py-1 font-serif max-h-[210px] sm:max-h-[230px] overflow-y-auto pr-1">
              <p className="font-bold text-emerald-700 dark:text-emerald-300 not-italic">
                {MAD_MOS_FLYER.taglineEs}
              </p>
              <p className="opacity-90 leading-normal">{MAD_MOS_FLYER.introEs}</p>

              <ul className="space-y-1 pl-2 font-medium not-italic">
                {MAD_MOS_FLYER.bargains.map((b, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="font-bold text-emerald-500 shrink-0">•</span>
                    <span>
                      <strong>{b.itemEs}:</strong> {b.discountEs}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="pt-1 space-y-1 border-t border-inherit/15">
                <p className="opacity-90 text-[11px] sm:text-xs not-italic">{MAD_MOS_FLYER.hoursEs}</p>
                <p className="font-bold text-emerald-700 dark:text-emerald-300 text-xs sm:text-sm not-italic">
                  {MAD_MOS_FLYER.callToActionEs}
                </p>
              </div>
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
