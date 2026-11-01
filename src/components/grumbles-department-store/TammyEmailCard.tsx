import React, { useState } from 'react';
import { Volume2, RefreshCw, Mail, Sparkles } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { speakEnglish, stopSpeaking, playFeedbackSound } from '../../utils/audio';
import {
  TAMMY_EMAIL_HEADER,
  TAMMY_EMAIL_SENTENCES,
  TAMMY_EMAIL_FULL_EN,
  TAMMY_EMAIL_FULL_ES,
} from '../../data/grumblesDepartmentStoreData';

interface TammyEmailCardProps {
  speed?: number;
  accent?: 'US' | 'UK';
  className?: string;
  onSentenceClick?: (sentenceEn: string) => void;
}

export const TammyEmailCard: React.FC<TammyEmailCardProps> = ({
  speed = 1.0,
  accent = 'US',
  className = '',
  onSentenceClick,
}) => {
  const { isDark } = useTheme();

  // Flip state: whole email translation
  const [isFlipped, setIsFlipped] = useState(false);
  const [activeSentenceId, setActiveSentenceId] = useState<string | null>(null);
  const [isPlayingFull, setIsPlayingFull] = useState(false);

  const handleToggleFlip = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    playFeedbackSound('click');
    setIsFlipped((prev) => !prev);
  };

  const handlePlayFullAudio = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (isPlayingFull && window.speechSynthesis?.speaking) {
      stopSpeaking();
      setIsPlayingFull(false);
      return;
    }

    stopSpeaking();
    playFeedbackSound('click');
    setIsPlayingFull(true);
    setActiveSentenceId(null);

    speakEnglish(
      TAMMY_EMAIL_FULL_EN,
      speed,
      accent,
      () => setIsPlayingFull(true),
      () => setIsPlayingFull(false),
      'female'
    );
  };

  const handlePlaySentence = (sentenceId: string, textEn: string, e: React.MouseEvent) => {
    e.stopPropagation();
    stopSpeaking();
    playFeedbackSound('click');
    setActiveSentenceId(sentenceId);
    setIsPlayingFull(false);

    if (onSentenceClick) {
      onSentenceClick(textEn);
    }

    speakEnglish(
      textEn,
      speed,
      accent,
      () => setActiveSentenceId(sentenceId),
      () => setActiveSentenceId(null),
      'female'
    );
  };

  return (
    <div
      className={`rounded-2xl border overflow-hidden shadow-sm transition-all select-none ${
        isDark ? 'bg-slate-900 border-slate-700/80 text-slate-100' : 'bg-white border-slate-300 text-slate-900'
      } ${className}`}
    >
      {/* Email Header Controls Bar */}
      <div
        className={`px-3.5 py-2 border-b flex items-center justify-between gap-2 ${
          isDark
            ? 'bg-slate-800/80 border-slate-700 text-slate-300'
            : 'bg-sky-50/80 border-sky-100 text-slate-700'
        }`}
      >
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4 text-sky-500" />
          <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
            E-mail de Tammy
          </span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 font-medium">
            {isFlipped ? 'Español' : 'English'}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={handleToggleFlip}
            className={`px-2.5 py-1 rounded-lg border text-[11px] font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              isFlipped
                ? 'bg-emerald-500 text-white border-emerald-600 shadow-xs'
                : isDark
                ? 'bg-slate-700 border-slate-600 text-slate-200 hover:text-white'
                : 'bg-white border-slate-300 text-slate-700 hover:text-slate-900'
            }`}
            title="Voltear para ver traducción en español"
          >
            <RefreshCw className={`w-3 h-3 ${isFlipped ? 'rotate-180' : ''}`} />
            <span>{isFlipped ? 'Ver Inglés' : 'Traducir E-mail'}</span>
          </button>

          <button
            type="button"
            onClick={handlePlayFullAudio}
            className={`w-7 h-7 rounded-lg border flex items-center justify-center transition-all cursor-pointer ${
              isPlayingFull
                ? 'bg-sky-500 text-white border-sky-600 animate-pulse'
                : isDark
                ? 'bg-slate-700 border-slate-600 text-sky-400 hover:text-white'
                : 'bg-white border-slate-300 text-sky-600 hover:text-sky-800'
            }`}
            title="Escuchar todo el correo en inglés"
          >
            <Volume2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Email Metadata Header Table (matches the exact UI in the screenshots) */}
      <div
        className={`p-3 border-b space-y-1.5 text-xs ${
          isDark
            ? 'bg-slate-900/60 border-slate-800'
            : 'bg-slate-50/90 border-slate-200'
        }`}
      >
        <div className="flex items-center gap-3">
          <span className="w-14 text-slate-500 dark:text-slate-400 font-semibold text-right">
            {!isFlipped ? 'From:' : 'De:'}
          </span>
          <div className="flex-1 px-2.5 py-1 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-medium">
            {TAMMY_EMAIL_HEADER.from}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="w-14 text-slate-500 dark:text-slate-400 font-semibold text-right">
            {!isFlipped ? 'To:' : 'Para:'}
          </span>
          <div className="flex-1 px-2.5 py-1 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-medium">
            {TAMMY_EMAIL_HEADER.to}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="w-14 text-slate-500 dark:text-slate-400 font-semibold text-right">
            {!isFlipped ? 'Subject:' : 'Asunto:'}
          </span>
          <div className="flex-1 px-2.5 py-1 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-medium text-sky-700 dark:text-sky-300 font-semibold">
            {!isFlipped ? TAMMY_EMAIL_HEADER.subject : TAMMY_EMAIL_HEADER.subjectEs}
          </div>
        </div>
      </div>

      {/* Email Body */}
      <div className="p-4 sm:p-5 text-xs sm:text-sm leading-relaxed">
        {!isFlipped ? (
          <div className="space-y-3 font-sans">
            <p className="font-semibold text-slate-700 dark:text-slate-300">
              Dear Susan,
            </p>

            <div className="space-y-2">
              {TAMMY_EMAIL_SENTENCES.slice(1, 8).map((sent) => {
                const isActive = activeSentenceId === sent.id;
                return (
                  <span
                    key={sent.id}
                    onClick={(e) => handlePlaySentence(sent.id, sent.en, e)}
                    className={`inline cursor-pointer rounded px-1 py-0.5 transition-colors mr-1 ${
                      isActive
                        ? 'bg-yellow-200 dark:bg-amber-900/60 text-slate-900 dark:text-amber-100 font-medium ring-1 ring-amber-400'
                        : 'hover:bg-sky-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200'
                    }`}
                    title="Haz clic para escuchar esta frase"
                  >
                    {sent.en}{' '}
                  </span>
                );
              })}
            </div>

            <p className="pt-2 font-semibold text-slate-700 dark:text-slate-300">
              Tammy
            </p>
          </div>
        ) : (
          /* Spanish translation */
          <div className="space-y-3 font-serif italic text-emerald-950 dark:text-emerald-100 bg-emerald-50/50 dark:bg-emerald-950/30 p-3 rounded-xl border border-emerald-200 dark:border-emerald-800">
            <p className="font-sans font-bold text-emerald-800 dark:text-emerald-300 not-italic">
              Querida Susan,
            </p>

            <p className="leading-relaxed whitespace-pre-line">
              ¡Hola! Tengo un trabajo de verano en la Tienda por Departamentos Grumble's. Trabajo en el quinto piso, en el departamento de ropa femenina. La tienda siempre está abarrotada con muchos clientes. Tengo que sonreír y decir: "¿Le puedo ayudar?" Realmente tengo ganas de decir: "¡Váyanse a casa!" Por lo general tengo que estar de pie todo el día, y no tengo ningún descanso. ¡Necesito unas vacaciones!
            </p>

            <p className="pt-2 font-sans font-bold text-emerald-800 dark:text-emerald-300 not-italic">
              Tammy
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
