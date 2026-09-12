import React, { useState } from 'react';
import { Volume2, Sparkles } from 'lucide-react';
import { CLEAN_HOUSE_AD_TEXT } from '../../data/cleanHouseAgencyData';
import { useTheme } from '../../context/ThemeContext';
import { playFeedbackSound } from '../../utils/audio';

interface CleanHouseAdCardProps {
  onPlayAudio: (text: string, id: string, e?: React.MouseEvent) => void;
  playingSentenceId: string | null;
  compact?: boolean;
}

export const CleanHouseAdCard: React.FC<CleanHouseAdCardProps> = ({
  onPlayAudio,
  playingSentenceId,
  compact = false,
}) => {
  const { isDark } = useTheme();
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => {
    playFeedbackSound('flip');
    setIsFlipped((prev) => !prev);
  };

  return (
    <div className={`w-full ${compact ? 'max-w-md' : 'max-w-xl'} mx-auto select-none perspective-1000`}>
      <div
        role="button"
        tabIndex={0}
        onClick={handleCardClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleCardClick();
          }
        }}
        className={`relative w-full rounded-2xl cursor-pointer select-none transition-transform duration-500 transform-style-3d border shadow-xs ${
          isFlipped ? 'rotate-y-180' : ''
        } ${
          isDark
            ? 'bg-slate-900 border-slate-700 text-white'
            : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* FRONT: ENGLISH */}
        <div className="w-full p-5 sm:p-6 flex flex-col justify-between backface-hidden">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-inherit/20 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
                <Sparkles className="w-4 h-4" />
              </span>
              <h3 className="text-lg sm:text-xl font-black tracking-tight text-sky-600 dark:text-sky-400">
                {CLEAN_HOUSE_AD_TEXT.title}
              </h3>
            </div>
            <button
              type="button"
              onClick={(e) =>
                onPlayAudio(CLEAN_HOUSE_AD_TEXT.fullAudioText, 'ad-card-full-en', e)
              }
              className={`p-1.5 rounded-lg border transition-all shrink-0 cursor-pointer ${
                playingSentenceId === 'ad-card-full-en'
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

          {/* Body Lines */}
          <div className="space-y-3 text-sm sm:text-base leading-relaxed">
            <div className="space-y-1">
              <p
                onClick={(e) => {
                  e.stopPropagation();
                  onPlayAudio(CLEAN_HOUSE_AD_TEXT.sentences[0].en, 'ad-s1', e);
                }}
                className={`inline-block px-1.5 py-0.5 rounded cursor-pointer transition-colors ${
                  playingSentenceId === 'ad-s1'
                    ? 'bg-sky-600 text-white'
                    : 'hover:text-sky-600 dark:hover:text-sky-400'
                }`}
              >
                {CLEAN_HOUSE_AD_TEXT.sentences[0].en}
              </p>
              <br />
              <p
                onClick={(e) => {
                  e.stopPropagation();
                  onPlayAudio(CLEAN_HOUSE_AD_TEXT.sentences[1].en, 'ad-s2', e);
                }}
                className={`inline-block px-1.5 py-0.5 rounded cursor-pointer transition-colors ${
                  playingSentenceId === 'ad-s2'
                    ? 'bg-sky-600 text-white'
                    : 'hover:text-sky-600 dark:hover:text-sky-400'
                }`}
              >
                {CLEAN_HOUSE_AD_TEXT.sentences[1].en}
              </p>
            </div>

            <div className="space-y-1 pt-1 border-t border-inherit/10">
              <p
                onClick={(e) => {
                  e.stopPropagation();
                  onPlayAudio(
                    'Call the Clean-House Agency. We go everywhere. We do everything! The Clean-House Agency can help you.',
                    'ad-body',
                    e
                  );
                }}
                className={`px-1.5 py-0.5 rounded cursor-pointer transition-colors ${
                  playingSentenceId === 'ad-body'
                    ? 'bg-sky-600 text-white'
                    : 'hover:text-sky-600 dark:hover:text-sky-400'
                }`}
              >
                Call the Clean-House Agency. We go everywhere. We do everything! The Clean-House Agency can help you.
              </p>
              <p className="px-1.5 font-medium">
                Call <span className="font-bold text-sky-600 dark:text-sky-400">{CLEAN_HOUSE_AD_TEXT.phone}</span> and ask for <span className="font-bold text-sky-600 dark:text-sky-400">{CLEAN_HOUSE_AD_TEXT.contactPerson}</span>. Don&apos;t wait!
              </p>
              <p className="px-1.5 font-bold text-sky-600 dark:text-sky-400">Do it now!</p>
            </div>
          </div>
        </div>

        {/* BACK: SPANISH TRANSLATION */}
        <div className="absolute inset-0 w-full h-full p-5 sm:p-6 flex flex-col justify-between backface-hidden rotate-y-180">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-inherit/20 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                <Sparkles className="w-4 h-4" />
              </span>
              <h3 className="text-lg sm:text-xl font-black tracking-tight text-emerald-600 dark:text-emerald-400 italic">
                {CLEAN_HOUSE_AD_TEXT.titleEs}
              </h3>
            </div>
            <button
              type="button"
              onClick={(e) =>
                onPlayAudio(CLEAN_HOUSE_AD_TEXT.fullAudioText, 'ad-card-full-es', e)
              }
              className={`p-1.5 rounded-lg border transition-all shrink-0 cursor-pointer ${
                playingSentenceId === 'ad-card-full-es'
                  ? 'bg-emerald-500 text-white border-emerald-400 ring-2 ring-emerald-300'
                  : isDark
                  ? 'bg-slate-800 hover:bg-slate-700 text-emerald-300 border-slate-700'
                  : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-600 border-emerald-200'
              }`}
              aria-label="Audio"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>

          {/* Body Lines in Spanish */}
          <div className="space-y-3 text-sm sm:text-base leading-relaxed italic text-slate-700 dark:text-slate-300">
            <div className="space-y-1">
              <p>¿Tienes siempre muchas tareas domésticas?</p>
              <p>¿Te sientes cansado/a todo el tiempo?</p>
            </div>

            <div className="space-y-1 pt-1 border-t border-inherit/10">
              <p>
                Llama a la Agencia Clean-House. Vamos a todas partes. ¡Hacemos de todo! La Agencia Clean-House puede ayudarte.
              </p>
              <p>
                Llama al <span className="font-bold text-emerald-600 dark:text-emerald-400">{CLEAN_HOUSE_AD_TEXT.phone}</span> y pregunta por <span className="font-bold text-emerald-600 dark:text-emerald-400">{CLEAN_HOUSE_AD_TEXT.contactPerson}</span>. ¡No esperes!
              </p>
              <p className="font-bold text-emerald-600 dark:text-emerald-400 not-italic">
                ¡Hazlo ahora!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
