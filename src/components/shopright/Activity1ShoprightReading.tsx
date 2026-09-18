import React, { useState } from 'react';
import { Volume2, CheckCircle2 } from 'lucide-react';
import {
  SHOPRIGHT_AD_TITLE,
  SHOPRIGHT_AD_LINES,
  SHOPRIGHT_AD_FULL_EN,
} from '../../data/saleAtShoprightData';
import { useTheme } from '../../context/ThemeContext';
import { speakEnglish, stopSpeaking } from '../../utils/audio';

interface Activity1ShoprightReadingProps {
  speechRate?: number;
  accent?: 'US' | 'UK';
  onNext?: () => void;
}

export const Activity1ShoprightReading: React.FC<Activity1ShoprightReadingProps> = ({
  speechRate = 1.0,
  accent = 'US',
  onNext,
}) => {
  const { isDark } = useTheme();
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
  const [playingId, setPlayingId] = useState<string | null>(null);

  const toggleFlip = (id: string) => {
    setFlippedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handlePlay = (text: string, id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (playingId === id && window.speechSynthesis?.speaking) {
      stopSpeaking();
      setPlayingId(null);
      return;
    }
    stopSpeaking();
    setPlayingId(id);
    speakEnglish(
      text,
      speechRate,
      accent || 'US',
      () => setPlayingId(id),
      () => setPlayingId(null)
    );
  };

  return (
    <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
      {/* Header Banner */}
      <div
        className={`p-4 sm:p-5 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
          isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            {SHOPRIGHT_AD_TITLE.en}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Read the ad for Shopright Supermarket.
          </p>
        </div>

        <button
          type="button"
          onClick={(e) => handlePlay(SHOPRIGHT_AD_FULL_EN, 'full-ad', e)}
          className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-center shrink-0 ${
            playingId === 'full-ad'
              ? 'bg-indigo-600 text-white border-indigo-500 ring-2 ring-indigo-400'
              : isDark
              ? 'bg-slate-800 hover:bg-slate-700 text-indigo-300 border-slate-700'
              : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-900 border-indigo-200 shadow-xs'
          }`}
          aria-label="Audio"
        >
          <Volume2 className="w-5 h-5" />
        </button>
      </div>

      {/* Grid of Reversible Sentence Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {SHOPRIGHT_AD_LINES.map((item) => {
          const isFlipped = !!flippedCards[item.id];
          const isPlaying = playingId === item.id;

          return (
            <div
              key={item.id}
              className="h-36 sm:h-40 cursor-pointer perspective select-none"
              onClick={() => toggleFlip(item.id)}
            >
              <div
                className={`w-full h-full transition-transform duration-500 transform-style-3d relative ${
                  isFlipped ? 'rotate-y-180' : ''
                }`}
              >
                {/* FRONT: English */}
                <div
                  className={`absolute inset-0 w-full h-full rounded-2xl p-4 sm:p-5 flex flex-col justify-between border backface-hidden shadow-xs transition-colors ${
                    isDark
                      ? 'bg-slate-900 border-slate-700 text-slate-100'
                      : 'bg-white border-slate-200 text-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 border-b border-inherit/40 pb-2">
                    <span className="text-xs font-mono font-semibold text-indigo-600 dark:text-indigo-400 uppercase">
                      Shopright Ad
                    </span>

                    <button
                      type="button"
                      onClick={(e) => handlePlay(item.en, item.id, e)}
                      className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                        isPlaying
                          ? 'bg-indigo-600 text-white border-indigo-500'
                          : isDark
                          ? 'bg-slate-800 hover:bg-slate-700 text-indigo-300 border-slate-700'
                          : 'bg-slate-50 hover:bg-indigo-50 text-indigo-900 border-slate-200'
                      }`}
                      aria-label="Audio"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="my-auto font-serif text-base sm:text-lg leading-snug">
                    {item.en}
                  </div>
                </div>

                {/* BACK: Spanish */}
                <div
                  className={`absolute inset-0 w-full h-full rounded-2xl p-4 sm:p-5 flex flex-col justify-between border backface-hidden rotate-y-180 shadow-xs transition-colors ${
                    isDark
                      ? 'bg-slate-900 border-indigo-500/40 text-slate-100'
                      : 'bg-white border-indigo-300 text-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 border-b border-inherit/40 pb-2">
                    <span className="text-xs font-mono font-semibold text-indigo-600 dark:text-indigo-400 uppercase">
                      Traducción
                    </span>
                    <button
                      type="button"
                      onClick={(e) => handlePlay(item.en, item.id, e)}
                      className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                        isPlaying
                          ? 'bg-indigo-600 text-white border-indigo-500'
                          : isDark
                          ? 'bg-slate-800 hover:bg-slate-700 text-indigo-300 border-slate-700'
                          : 'bg-slate-50 hover:bg-indigo-50 text-indigo-900 border-slate-200'
                      }`}
                      aria-label="Audio"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="my-auto font-serif text-base sm:text-lg leading-snug text-slate-800 dark:text-slate-200">
                    {item.es}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {onNext && (
        <div className="flex justify-end pt-2">
          <button
            type="button"
            onClick={onNext}
            className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md transition-all cursor-pointer flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Continuar</span>
          </button>
        </div>
      )}
    </div>
  );
};
