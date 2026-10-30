import React, { useState } from 'react';
import { Volume2, RefreshCw, BookOpen, Pause } from 'lucide-react';
import {
  FAMILY_PICNIC_STORY_PARAGRAPHS,
  FAMILY_PICNIC_FULL_TEXT_EN,
  FAMILY_PICNIC_FULL_TEXT_ES,
} from '../../data/familyPicnicData';
import { useTheme } from '../../context/ThemeContext';
import { speakEnglish, stopSpeaking, playFeedbackSound } from '../../utils/audio';

interface FamilyPicnicStoryCardProps {
  speed: number;
  accent?: 'US' | 'UK';
  highlightedWords?: string[];
  className?: string;
}

export const FamilyPicnicStoryCard: React.FC<FamilyPicnicStoryCardProps> = ({
  speed = 1.0,
  accent = 'US',
  highlightedWords = [],
  className = '',
}) => {
  const { isDark } = useTheme();
  const [isFlipped, setIsFlipped] = useState(false);
  const [isPlayingAll, setIsPlayingAll] = useState(false);
  const [activeParagraphId, setActiveParagraphId] = useState<string | null>(null);

  const handleToggleFlip = () => {
    playFeedbackSound('click');
    setIsFlipped((prev) => !prev);
  };

  const handlePlayAll = () => {
    if (isPlayingAll) {
      stopSpeaking();
      setIsPlayingAll(false);
      setActiveParagraphId(null);
      return;
    }

    playFeedbackSound('click');
    setIsPlayingAll(true);
    speakEnglish(
      FAMILY_PICNIC_FULL_TEXT_EN,
      speed,
      accent,
      () => setIsPlayingAll(true),
      () => {
        setIsPlayingAll(false);
        setActiveParagraphId(null);
      }
    );
  };

  const handlePlayParagraph = (en: string, id: string) => {
    stopSpeaking();
    playFeedbackSound('click');
    setActiveParagraphId(id);
    setIsPlayingAll(true);
    speakEnglish(
      en,
      speed,
      accent,
      () => setIsPlayingAll(true),
      () => {
        setIsPlayingAll(false);
        setActiveParagraphId(null);
      }
    );
  };

  // Helper to render text with highlighted words if needed
  const renderHighlightedText = (text: string) => {
    if (!highlightedWords || highlightedWords.length === 0) {
      return text;
    }

    // Create a regex to match any of the highlighted words
    const regex = new RegExp(`\\b(${highlightedWords.join('|')})\\b`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, i) => {
      const isMatch = highlightedWords.some(
        (hw) => hw.toLowerCase() === part.toLowerCase()
      );
      if (isMatch) {
        return (
          <span
            key={i}
            className="bg-yellow-300 dark:bg-yellow-500/40 text-slate-900 dark:text-yellow-100 font-bold px-1 rounded"
          >
            {part}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <div className={`w-full perspective-1000 ${className}`}>
      <div
        className={`relative w-full min-h-[480px] transition-transform duration-500 transform-style-3d select-none rounded-2xl border shadow-md ${
          isDark
            ? 'bg-gradient-to-b from-[#1E293B] to-[#0F172A] border-slate-700 text-slate-100'
            : 'bg-gradient-to-b from-[#FAF8F5] to-[#F4EFEA] border-amber-200/80 text-slate-900'
        } ${isFlipped ? 'rotate-y-180' : ''}`}
      >
        {/* FRONT FACE: ENGLISH STORY */}
        <div className="w-full h-full backface-hidden p-5 sm:p-6 flex flex-col justify-between rounded-2xl">
          <div>
            {/* Header: Title + Flip & Audio Buttons */}
            <div className="flex items-center justify-between pb-4 border-b border-amber-200/60 dark:border-slate-700/80 mb-4">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-sky-600 dark:text-sky-400 tracking-tight">
                  The Family Picnic
                </h2>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={handleToggleFlip}
                  className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-all cursor-pointer ${
                    isDark
                      ? 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
                      : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100 shadow-xs'
                  }`}
                  title="Voltear para ver traducción en español"
                  aria-label="Voltear a español"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={handlePlayAll}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
                    isPlayingAll
                      ? 'bg-sky-500 text-white border-sky-600 shadow-sm animate-pulse'
                      : isDark
                      ? 'bg-slate-800 border-slate-700 text-sky-400 hover:bg-slate-700'
                      : 'bg-white border-slate-300 text-sky-600 hover:bg-slate-100 shadow-xs'
                  }`}
                  title={isPlayingAll ? 'Pausar audio' : 'Escuchar historia completa'}
                >
                  {isPlayingAll ? (
                    <>
                      <Pause className="w-3.5 h-3.5" />
                      <span>Pausar</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Audio ({speed}x)</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Story Paragraphs */}
            <div className="space-y-3.5 text-xs sm:text-sm leading-relaxed font-serif text-slate-800 dark:text-slate-200">
              {FAMILY_PICNIC_STORY_PARAGRAPHS.map((p, idx) => {
                const isActive = activeParagraphId === p.id;
                return (
                  <p
                    key={p.id}
                    onClick={() => handlePlayParagraph(p.en, p.id)}
                    className={`transition-all rounded-md px-1.5 py-0.5 cursor-pointer hover:bg-amber-100/60 dark:hover:bg-slate-800/60 ${
                      isActive ? 'bg-sky-500/20 text-sky-700 dark:text-sky-300 font-medium' : ''
                    }`}
                    title="Toca para escuchar este párrafo"
                  >
                    {idx === 0 && (
                      <span className="text-xl sm:text-2xl font-serif font-black text-sky-700 dark:text-sky-400 mr-1 float-left leading-none">
                        I
                      </span>
                    )}
                    {idx === 0 ? renderHighlightedText(p.en.slice(1)) : renderHighlightedText(p.en)}
                  </p>
                );
              })}
            </div>
          </div>

          <div className="pt-4 mt-3 border-t border-amber-200/40 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 font-mono">
            <span>Toca cualquier párrafo para escuchar</span>
            <span>8 párrafos</span>
          </div>
        </div>

        {/* BACK FACE: SPANISH TRANSLATION */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 p-5 sm:p-6 flex flex-col justify-between rounded-2xl bg-gradient-to-b from-emerald-50 to-teal-50 dark:from-slate-900 dark:to-emerald-950/40 border border-emerald-300 dark:border-emerald-700 text-emerald-950 dark:text-emerald-100">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-emerald-300/60 dark:border-emerald-700/60 mb-4">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-emerald-800 dark:text-emerald-300 tracking-tight">
                  El Picnic Familiar (Traducción)
                </h2>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={handleToggleFlip}
                  className="w-8 h-8 rounded-lg border border-emerald-400 bg-white dark:bg-slate-800 text-emerald-700 dark:text-emerald-300 flex items-center justify-center cursor-pointer hover:scale-105 transition-all shadow-xs"
                  title="Voltear al frente (inglés)"
                  aria-label="Voltear al frente"
                >
                  <RefreshCw className="w-3.5 h-3.5 rotate-180" />
                </button>
              </div>
            </div>

            <div className="space-y-3 text-xs sm:text-sm leading-relaxed font-serif text-emerald-950 dark:text-emerald-100 italic">
              {FAMILY_PICNIC_STORY_PARAGRAPHS.map((p, idx) => (
                <p key={p.id}>
                  {idx === 0 && (
                    <span className="text-lg sm:text-xl font-serif font-black text-emerald-700 dark:text-emerald-400 mr-1 float-left leading-none not-italic">
                      E
                    </span>
                  )}
                  {idx === 0 ? p.es.slice(1) : p.es}
                </p>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-emerald-200 dark:border-emerald-800/60 text-[11px] text-emerald-700 dark:text-emerald-400 font-mono text-center">
            Traducción completa &bull; Toca el botón 🔄 para regresar al texto original en inglés
          </div>
        </div>
      </div>
    </div>
  );
};
