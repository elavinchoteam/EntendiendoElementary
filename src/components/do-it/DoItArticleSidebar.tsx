import React, { useState } from 'react';
import { Volume2, RotateCw, BookOpen } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { CardSpeechControl } from '../CardSpeechControl';
import { DO_IT_FULL_TEXT, DO_IT_SENTENCES, DO_IT_FULL_TEXT_ES } from '../../data/doItSectionData';

interface DoItArticleSidebarProps {
  highlightSentenceIdx?: number[];
  accent?: 'US' | 'UK';
  speechRate?: number;
}

export const DoItArticleSidebar: React.FC<DoItArticleSidebarProps> = ({
  highlightSentenceIdx = [],
  accent = 'US',
  speechRate = 1.0,
}) => {
  const { isDark } = useTheme();
  const [isFlipped, setIsFlipped] = useState(false);

  // Group sentences into paragraphs matching the reading article layout
  const paragraphs = [
    { indices: [0, 1] },
    { indices: [2, 3, 4, 5, 6, 7, 8] },
    { indices: [9, 10, 11] },
    { indices: [12, 13, 14] },
  ];

  return (
    <div className="w-full lg:max-w-[390px] xl:max-w-[420px] shrink-0 perspective-1000 select-none">
      <div
        onClick={() => setIsFlipped((prev) => !prev)}
        className={`relative w-full min-h-[690px] sm:min-h-[730px] lg:min-h-[770px] rounded-3xl cursor-pointer shadow-xl transition-transform duration-500 transform-style-3d ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
        title="Click to flip translation"
      >
        {/* FRONT: ENGLISH */}
        <div
          className={`absolute inset-0 w-full h-full rounded-3xl p-5 sm:p-6 flex flex-col justify-between border backface-hidden shadow-md overflow-hidden ${
            isDark
              ? 'bg-slate-900 border-sky-500/30 text-slate-100'
              : 'bg-white border-slate-200 text-slate-900'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-inherit/30 shrink-0">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-sky-500/10 text-sky-500 flex items-center justify-center font-bold text-xs">
                <BookOpen className="w-3.5 h-3.5" />
              </span>
              <span className="text-xs font-bold tracking-wider uppercase text-sky-600 dark:text-sky-400">
                Article · Do It!
              </span>
            </div>

            <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
              <CardSpeechControl
                textToSpeak={DO_IT_FULL_TEXT}
                accent={accent}
                initialSpeed={speechRate}
              />
              <button
                type="button"
                onClick={() => setIsFlipped((prev) => !prev)}
                className="p-1.5 rounded-lg text-xs font-medium text-sky-600 dark:text-sky-400 hover:bg-sky-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-1"
                title="Traducir al español"
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline text-[11px]">Traducción</span>
              </button>
            </div>
          </div>

          {/* Article Text - All 4 paragraphs visible without scrolling */}
          <div className="flex-1 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pr-1 py-3.5 flex flex-col gap-3 font-serif text-[13px] sm:text-[13.5px] leading-relaxed text-slate-800 dark:text-slate-200">
            <h4 className="text-base sm:text-lg font-bold font-sans text-sky-600 dark:text-sky-400">
              Do It!
            </h4>

            {paragraphs.map((para, pIdx) => (
              <p key={pIdx}>
                {para.indices.map((sIdx) => {
                  const sent = DO_IT_SENTENCES[sIdx];
                  if (!sent) return null;
                  const isHighlighted = highlightSentenceIdx.includes(sIdx);
                  return (
                    <span
                      key={sIdx}
                      className={
                        isHighlighted
                          ? 'bg-amber-200 dark:bg-amber-400/30 text-amber-950 dark:text-amber-100 font-semibold px-0.5 rounded-sm'
                          : ''
                      }
                    >
                      {sent.en}{' '}
                    </span>
                  );
                })}
              </p>
            ))}
          </div>

          {/* Footer note */}
          <div className="pt-2 border-t border-inherit/20 text-[11px] text-slate-400 dark:text-slate-500 flex items-center justify-between font-sans shrink-0">
            <span>Haz clic para voltear y leer en español</span>
            <RotateCw className="w-3 h-3 text-sky-500" />
          </div>
        </div>

        {/* BACK: SPANISH */}
        <div
          className={`absolute inset-0 w-full h-full rounded-3xl p-5 sm:p-6 flex flex-col justify-between border backface-hidden rotate-y-180 shadow-md overflow-hidden ${
            isDark
              ? 'bg-slate-900 border-emerald-500/30 text-slate-100'
              : 'bg-white border-emerald-200 text-slate-900'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-inherit/30 shrink-0">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold text-xs">
                <BookOpen className="w-3.5 h-3.5" />
              </span>
              <span className="text-xs font-bold tracking-wider uppercase text-emerald-600 dark:text-emerald-400">
                Traducción · ¡Hazlo!
              </span>
            </div>

            <button
              type="button"
              onClick={() => setIsFlipped((prev) => !prev)}
              className="p-1.5 rounded-lg text-xs font-medium text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-1"
              title="Volver a inglés"
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span className="text-[11px]">Inglés</span>
            </button>
          </div>

          {/* Spanish Text - All 4 paragraphs visible without scrolling */}
          <div className="flex-1 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pr-1 py-3.5 flex flex-col gap-3 font-serif italic text-[13px] sm:text-[13.5px] leading-relaxed text-slate-800 dark:text-slate-200">
            <h4 className="text-base sm:text-lg font-bold font-sans not-italic text-emerald-600 dark:text-emerald-400">
              ¡Hazlo!
            </h4>

            {paragraphs.map((para, pIdx) => (
              <p key={pIdx}>
                {para.indices.map((sIdx) => {
                  const sent = DO_IT_SENTENCES[sIdx];
                  if (!sent) return null;
                  return <span key={sIdx}>{sent.es} </span>;
                })}
              </p>
            ))}
          </div>

          {/* Footer note */}
          <div className="pt-2 border-t border-inherit/20 text-[11px] text-slate-400 dark:text-slate-500 flex items-center justify-between font-sans not-italic shrink-0">
            <span>Traducción pedagógica al español</span>
            <span>Haz clic para volver</span>
          </div>
        </div>
      </div>
    </div>
  );
};
