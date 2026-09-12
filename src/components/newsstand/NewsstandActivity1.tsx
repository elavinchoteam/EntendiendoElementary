import React, { useState } from 'react';
import { Volume2, Sparkles, MessageSquare } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { NewsstandMediaCard } from './NewsstandMediaCard';
import {
  NEWSSTAND_SENTENCES,
  NEWSSTAND_AUDIO_TEXT,
  NEWSSTAND_FULL_ES,
} from '../../data/newsstandData';
import { speakEnglish, stopSpeaking } from '../../utils/audio';

interface NewsstandActivity1Props {
  currentRate: number;
  onRateChange?: (rate: number) => void;
  accent?: 'US' | 'UK';
  onPlayAudio: (text: string, id: string, e?: React.MouseEvent) => void;
  playingSentenceId: string | null;
}

export const NewsstandActivity1: React.FC<NewsstandActivity1Props> = ({
  currentRate,
  onRateChange,
  accent = 'US',
  onPlayAudio,
  playingSentenceId,
}) => {
  const { isDark } = useTheme();

  // Instruction card flip state
  const [isInstructionFlipped, setIsInstructionFlipped] = useState(false);
  // Full dialogue card flip state
  const [isDialogueCardFlipped, setIsDialogueCardFlipped] = useState(false);

  const handlePlayFull = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    stopSpeaking();
    onPlayAudio(NEWSSTAND_AUDIO_TEXT, 'act1-full-audio', e);
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Reversible Instruction Header Card */}
      <div className="w-full perspective-1000 select-none">
        <div
          onClick={() => setIsInstructionFlipped(!isInstructionFlipped)}
          className={`relative w-full rounded-2xl border p-4 sm:p-5 transition-transform duration-500 transform-style-3d cursor-pointer ${
            isInstructionFlipped ? 'rotate-y-180' : ''
          } ${
            isDark
              ? 'bg-slate-900 border-slate-700 text-slate-100'
              : 'bg-white border-slate-200 text-slate-900 shadow-xs'
          }`}
        >
          {/* Front: English */}
          <div className="w-full flex items-center justify-between gap-3 backface-hidden">
            <div className="flex items-center gap-3">
              <span className="p-2 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
                <MessageSquare className="w-5 h-5" />
              </span>
              <div>
                <span className="text-xs uppercase tracking-wider font-bold text-sky-600 dark:text-sky-400 block">
                  Actividad 1 · Diálogo
                </span>
                <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  Watch and listen to the dialogue.
                </h2>
              </div>
            </div>

            <button
              type="button"
              onClick={(e) =>
                onPlayAudio('Watch and listen to the dialogue.', 'act1-instruction-en', e)
              }
              className={`p-2 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                playingSentenceId === 'act1-instruction-en'
                  ? 'bg-sky-500 text-white animate-pulse border-sky-400'
                  : isDark
                  ? 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white'
                  : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200 hover:text-slate-900'
              }`}
              aria-label="Listen audio"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>

          {/* Back: Spanish */}
          <div className="absolute inset-0 w-full h-full p-4 sm:p-5 rounded-2xl flex items-center justify-between gap-3 backface-hidden rotate-y-180 bg-inherit">
            <div className="flex items-center gap-3">
              <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                <Sparkles className="w-5 h-5" />
              </span>
              <div>
                <span className="text-xs uppercase tracking-wider font-bold text-emerald-600 dark:text-emerald-400 block">
                  Actividad 1 · Traducción
                </span>
                <h2 className="text-base sm:text-lg font-bold italic text-slate-800 dark:text-slate-100">
                  Mira y escucha el diálogo.
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main 2-Column Responsive Layout */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Media Player & Synchronized Transcript */}
        <div className="lg:col-span-6 w-full">
          <NewsstandMediaCard
            currentRate={currentRate}
            onRateChange={onRateChange}
            accent={accent}
            highlightCurrentSentence={true}
          />
        </div>

        {/* Right Column: Full Reversible Dialogue Interactive Study Card */}
        <div className="lg:col-span-6 w-full perspective-1000 select-none min-h-[440px] flex flex-col">
          <div
            onClick={() => setIsDialogueCardFlipped(!isDialogueCardFlipped)}
            className={`relative w-full h-full min-h-[440px] rounded-2xl border p-5 sm:p-6 transition-transform duration-500 transform-style-3d cursor-pointer flex flex-col justify-between ${
              isDialogueCardFlipped ? 'rotate-y-180' : ''
            } ${
              isDark
                ? 'bg-slate-900 border-slate-700 text-slate-100'
                : 'bg-white border-slate-200 text-slate-900 shadow-xs'
            }`}
          >
            {/* FRONT: Complete English Dialogue */}
            <div className="w-full flex flex-col justify-between h-full backface-hidden space-y-4">
              <div className="flex items-center justify-between border-b border-inherit/20 pb-3">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
                    <MessageSquare className="w-4 h-4" />
                  </span>
                  <h3 className="text-base font-bold text-sky-600 dark:text-sky-400">
                    Newsstand Dialogue
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={handlePlayFull}
                  className={`p-2 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                    playingSentenceId === 'act1-full-audio'
                      ? 'bg-sky-500 text-white animate-pulse border-sky-400'
                      : isDark
                      ? 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white'
                      : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200 hover:text-slate-900'
                  }`}
                  aria-label="Listen full dialogue"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              {/* Sentences List */}
              <div className="space-y-2.5 my-auto">
                {NEWSSTAND_SENTENCES.map((s) => (
                  <div
                    key={s.id}
                    className={`p-2.5 sm:p-3 rounded-xl border flex items-center justify-between gap-3 transition-colors ${
                      isDark
                        ? 'bg-slate-800/60 hover:bg-slate-800 border-slate-700'
                        : 'bg-slate-50 hover:bg-slate-100/80 border-slate-200'
                    }`}
                  >
                    <div className="text-xs sm:text-sm font-medium">
                      <span
                        className={`font-bold mr-1.5 ${
                          s.speaker === 'Man'
                            ? 'text-sky-600 dark:text-sky-400'
                            : 'text-amber-600 dark:text-amber-400'
                        }`}
                      >
                        {s.speaker}:
                      </span>
                      <span>"{s.en}"</span>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => onPlayAudio(s.en, s.id, e)}
                      className={`p-1.5 rounded-lg border flex items-center justify-center transition-all cursor-pointer shrink-0 ${
                        playingSentenceId === s.id
                          ? 'bg-sky-500 text-white animate-pulse border-sky-400'
                          : isDark
                          ? 'bg-slate-700 text-slate-300 border-slate-600 hover:bg-slate-600 hover:text-white'
                          : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-200'
                      }`}
                      aria-label="Listen sentence"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* BACK: Complete Spanish Dialogue */}
            <div className="absolute inset-0 w-full h-full p-5 sm:p-6 rounded-2xl flex flex-col justify-between backface-hidden rotate-y-180 bg-inherit space-y-4">
              <div className="flex items-center justify-between border-b border-inherit/20 pb-3">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    <Sparkles className="w-4 h-4" />
                  </span>
                  <h3 className="text-base font-bold text-emerald-600 dark:text-emerald-400 italic">
                    Diálogo en Español
                  </h3>
                </div>
              </div>

              {/* Sentences List in Spanish */}
              <div className="space-y-2.5 my-auto">
                {NEWSSTAND_SENTENCES.map((s) => (
                  <div
                    key={`es-${s.id}`}
                    className={`p-2.5 sm:p-3 rounded-xl border flex items-center justify-between gap-3 ${
                      isDark
                        ? 'bg-slate-800/60 border-slate-700'
                        : 'bg-emerald-50/40 border-emerald-200'
                    }`}
                  >
                    <div className="text-xs sm:text-sm italic">
                      <span
                        className={`font-bold mr-1.5 not-italic ${
                          s.speaker === 'Man'
                            ? 'text-sky-600 dark:text-sky-400'
                            : 'text-amber-600 dark:text-amber-400'
                        }`}
                      >
                        {s.speakerEs}:
                      </span>
                      <span className="text-slate-700 dark:text-slate-300">"{s.es}"</span>
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
