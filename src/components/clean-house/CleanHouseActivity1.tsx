import React, { useState } from 'react';
import { Volume2, Sparkles, BookOpen } from 'lucide-react';
import { CLEAN_HOUSE_AD_TEXT } from '../../data/cleanHouseAgencyData';
import { useTheme } from '../../context/ThemeContext';
import { playFeedbackSound } from '../../utils/audio';
import { CleanHouseAdCard } from './CleanHouseAdCard';

interface CleanHouseActivity1Props {
  onPlayAudio: (text: string, id: string, e?: React.MouseEvent) => void;
  playingSentenceId: string | null;
}

export const CleanHouseActivity1: React.FC<CleanHouseActivity1Props> = ({
  onPlayAudio,
  playingSentenceId,
}) => {
  const { isDark } = useTheme();
  const [isInstructionFlipped, setIsInstructionFlipped] = useState(false);
  const [isSentencesCardFlipped, setIsSentencesCardFlipped] = useState(false);

  const instructionEn = 'Read the advertisement for the Clean-House Agency.';
  const instructionEs = 'Lee el anuncio publicitario de la Agencia Clean-House.';

  return (
    <div className="w-full flex flex-col gap-6 animate-in fade-in duration-300">
      {/* Top Reversible Instruction Card */}
      <div className="w-full perspective-1000">
        <div
          onClick={() => {
            playFeedbackSound('flip');
            setIsInstructionFlipped(!isInstructionFlipped);
          }}
          className={`relative w-full min-h-[58px] rounded-2xl cursor-pointer select-none transition-transform duration-500 transform-style-3d border shadow-xs ${
            isInstructionFlipped ? 'rotate-y-180' : ''
          } ${
            isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}
        >
          {/* Front */}
          <div className="absolute inset-0 px-5 py-3 flex items-center justify-between backface-hidden">
            <span className="font-semibold text-sm sm:text-base">{instructionEn}</span>
            <button
              type="button"
              onClick={(e) => onPlayAudio(instructionEn, 'act1-instr', e)}
              className={`p-1.5 rounded-lg border transition-all shrink-0 cursor-pointer ${
                playingSentenceId === 'act1-instr'
                  ? 'bg-sky-500 text-white border-sky-400 ring-2 ring-sky-300'
                  : isDark
                  ? 'bg-slate-800 hover:bg-slate-700 text-sky-300 border-slate-700'
                  : 'bg-sky-50 hover:bg-sky-100 text-sky-600 border-sky-200'
              }`}
              aria-label="Audio"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>

          {/* Back */}
          <div className="absolute inset-0 px-5 py-3 flex items-center justify-between backface-hidden rotate-y-180">
            <span className="font-semibold text-sm sm:text-base italic text-slate-700 dark:text-slate-200">
              {instructionEs}
            </span>
          </div>
        </div>
      </div>

      {/* Main 2-Column Content Layout */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Announcement Card */}
        <div className="lg:col-span-6 w-full flex flex-col gap-4">
          <CleanHouseAdCard
            onPlayAudio={onPlayAudio}
            playingSentenceId={playingSentenceId}
          />
        </div>

        {/* Right Column: Reversible Interactive Sentences Card */}
        <div className="lg:col-span-6 w-full perspective-1000">
          <div
            role="button"
            tabIndex={0}
            onClick={() => {
              playFeedbackSound('flip');
              setIsSentencesCardFlipped((prev) => !prev);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                playFeedbackSound('flip');
                setIsSentencesCardFlipped((prev) => !prev);
              }
            }}
            className={`relative w-full min-h-[440px] rounded-2xl cursor-pointer select-none transition-transform duration-500 transform-style-3d border shadow-xs ${
              isSentencesCardFlipped ? 'rotate-y-180' : ''
            } ${
              isDark
                ? 'bg-slate-900 border-slate-700 text-white'
                : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            {/* FRONT: ENGLISH SENTENCES LIST */}
            <div className="w-full h-full p-5 sm:p-6 flex flex-col justify-between backface-hidden">
              <div className="flex items-center justify-between border-b border-inherit/20 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
                    <BookOpen className="w-4 h-4" />
                  </span>
                  <h3 className="text-base sm:text-lg font-bold">
                    Key Sentences & Audio
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={(e) =>
                    onPlayAudio(CLEAN_HOUSE_AD_TEXT.fullAudioText, 'act1-all-sentences', e)
                  }
                  className={`p-1.5 rounded-lg border transition-all shrink-0 cursor-pointer ${
                    playingSentenceId === 'act1-all-sentences'
                      ? 'bg-sky-500 text-white border-sky-400 ring-2 ring-sky-300'
                      : isDark
                      ? 'bg-slate-800 hover:bg-slate-700 text-sky-300 border-slate-700'
                      : 'bg-sky-50 hover:bg-sky-100 text-sky-600 border-sky-200'
                  }`}
                  aria-label="Audio"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2.5 overflow-y-auto max-h-[360px] pr-1">
                {CLEAN_HOUSE_AD_TEXT.sentences.map((sent, idx) => {
                  const isCurrent = playingSentenceId === sent.id;
                  return (
                    <div
                      key={sent.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        onPlayAudio(sent.en, sent.id);
                      }}
                      className={`p-3 rounded-xl border transition-all flex items-center justify-between gap-3 cursor-pointer ${
                        isCurrent
                          ? 'bg-sky-500/10 border-sky-500 ring-1 ring-sky-400'
                          : isDark
                          ? 'bg-slate-800/60 hover:bg-slate-800 border-slate-700/80 text-slate-200'
                          : 'bg-slate-50 hover:bg-slate-100 border-slate-200/80 text-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 text-xs font-bold font-mono flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <span className="text-sm sm:text-base font-medium leading-snug">
                          {sent.en}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => onPlayAudio(sent.en, sent.id, e)}
                        className={`p-1.5 rounded-lg border transition-all shrink-0 cursor-pointer ${
                          isCurrent
                            ? 'bg-sky-500 text-white border-sky-400 ring-2 ring-sky-300'
                            : isDark
                            ? 'bg-slate-800 hover:bg-slate-700 text-sky-300 border-slate-700'
                            : 'bg-sky-50 hover:bg-sky-100 text-sky-600 border-sky-200'
                        }`}
                        aria-label="Audio"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* BACK: SPANISH TRANSLATION */}
            <div className="absolute inset-0 w-full h-full p-5 sm:p-6 flex flex-col justify-between backface-hidden rotate-y-180">
              <div className="flex items-center justify-between border-b border-inherit/20 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    <Sparkles className="w-4 h-4" />
                  </span>
                  <h3 className="text-base sm:text-lg font-bold italic text-emerald-600 dark:text-emerald-400">
                    Oraciones Clave (Español)
                  </h3>
                </div>
              </div>

              <div className="space-y-2.5 overflow-y-auto max-h-[360px] pr-1 italic text-slate-700 dark:text-slate-300">
                {CLEAN_HOUSE_AD_TEXT.sentences.map((sent, idx) => (
                  <div
                    key={sent.id}
                    className={`p-3 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                      isDark
                        ? 'bg-slate-800/40 border-slate-700/80 text-slate-200'
                        : 'bg-emerald-50/50 border-emerald-200/60 text-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 text-xs font-bold font-mono flex items-center justify-center shrink-0 not-italic">
                        {idx + 1}
                      </span>
                      <span className="text-sm sm:text-base font-medium leading-snug">
                        {sent.es}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
