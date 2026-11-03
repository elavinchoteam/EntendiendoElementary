import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  Volume2,
  RotateCw,
  Sparkles,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { speakEnglish, stopSpeaking, playFeedbackSound } from '../../utils/audio';
import { MODALS_MAY_DIALOGUE } from '../../data/modalsMayData';

interface MayScenePlayerProps {
  speed?: number;
  accent?: 'US' | 'UK';
  highlightActiveLine?: number;
}

export const MayScenePlayer: React.FC<MayScenePlayerProps> = ({
  speed = 1.0,
  accent = 'US',
  highlightActiveLine = -1,
}) => {
  const { isDark } = useTheme();

  const [isPlayingAll, setIsPlayingAll] = useState(false);
  const [activeLineIdx, setActiveLineIdx] = useState<number>(highlightActiveLine);
  const [progressSec, setProgressSec] = useState<number>(0);
  const [showTranslations, setShowTranslations] = useState<boolean>(false);
  const [lineTranslationFlipped, setLineTranslationFlipped] = useState<{ [key: string]: boolean }>({});

  const durationSec = 7; // 00:07 as shown in original software
  const intervalRef = useRef<any>(null);

  useEffect(() => {
    return () => {
      stopSpeaking();
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const handleTogglePlayAll = () => {
    if (isPlayingAll) {
      stopSpeaking();
      setIsPlayingAll(false);
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    stopSpeaking();
    playFeedbackSound('click');
    setIsPlayingAll(true);
    setProgressSec(0);
    setActiveLineIdx(0);

    // Play lines sequentially
    let currentIdx = 0;

    const playLineAt = (idx: number) => {
      if (idx >= MODALS_MAY_DIALOGUE.length) {
        setIsPlayingAll(false);
        setActiveLineIdx(-1);
        setProgressSec(durationSec);
        return;
      }

      setActiveLineIdx(idx);
      const line = MODALS_MAY_DIALOGUE[idx];
      const gender = line.speakerGender;

      speakEnglish(
        line.text,
        speed,
        accent,
        () => {
          setActiveLineIdx(idx);
        },
        () => {
          currentIdx = idx + 1;
          setTimeout(() => {
            playLineAt(currentIdx);
          }, 350);
        },
        gender
      );
    };

    playLineAt(0);

    // Progress counter for 7 seconds
    const intervalStep = 200;
    const increment = (intervalStep / 1000) * speed;
    intervalRef.current = setInterval(() => {
      setProgressSec((prev) => {
        if (prev >= durationSec) {
          clearInterval(intervalRef.current);
          return durationSec;
        }
        return Math.min(durationSec, prev + increment);
      });
    }, intervalStep);
  };

  const handlePlaySingleLine = (idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    stopSpeaking();
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsPlayingAll(false);
    setActiveLineIdx(idx);

    const line = MODALS_MAY_DIALOGUE[idx];
    speakEnglish(
      line.text,
      speed,
      accent,
      undefined,
      () => {
        // finished
      },
      line.speakerGender
    );
  };

  const toggleLineFlip = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLineTranslationFlipped((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const formatTime = (secs: number) => {
    const s = Math.floor(secs);
    const m = Math.floor(s / 60);
    const rem = s % 60;
    return `${m < 10 ? '0' : ''}${m}:${rem < 10 ? '0' : ''}${rem}`;
  };

  return (
    <div
      className={`w-full rounded-2xl border overflow-hidden shadow-sm flex flex-col ${
        isDark ? 'bg-slate-800/90 border-slate-700' : 'bg-white border-slate-200'
      }`}
    >
      {/* Video Mock Scene Container */}
      <div className="relative w-full aspect-video bg-sky-400 flex items-center justify-center overflow-hidden">
        <img
          src="/assets/modals_may_scene.png"
          alt="Mom and daughter cookie scene"
          className="w-full h-full object-cover select-none"
        />

        {/* Ambient Overlay Header */}
        <div className="absolute top-2 left-2 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-xs text-white text-xs font-medium">
          <Sparkles className="w-3.5 h-3.5 text-sky-400" />
          <span>Scene: Cookies & Mom</span>
        </div>

        {/* Play Overlay if paused */}
        {!isPlayingAll && (
          <button
            type="button"
            onClick={handleTogglePlayAll}
            className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-black/50 hover:bg-sky-600/90 text-white flex items-center justify-center transition-all hover:scale-110 backdrop-blur-xs cursor-pointer shadow-lg"
            title="Reproducir video/audio de la escena"
          >
            <Play className="w-6 h-6 fill-current ml-0.5" />
          </button>
        )}
      </div>

      {/* Video Player Control Bar */}
      <div className="px-3 py-2 bg-slate-100 dark:bg-slate-900/90 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2 select-none text-xs text-slate-600 dark:text-slate-300">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleTogglePlayAll}
            className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-800 text-sky-600 dark:text-sky-400 transition-colors cursor-pointer"
            title={isPlayingAll ? 'Pausar' : 'Reproducir escena completa'}
          >
            {isPlayingAll ? (
              <Pause className="w-4 h-4 fill-current" />
            ) : (
              <Play className="w-4 h-4 fill-current" />
            )}
          </button>

          {/* Time Scrubber / Progress Bar */}
          <div className="w-24 sm:w-36 h-1.5 bg-slate-300 dark:bg-slate-700 rounded-full overflow-hidden relative">
            <div
              className="h-full bg-sky-500 rounded-full transition-all duration-200"
              style={{ width: `${(progressSec / durationSec) * 100}%` }}
            />
          </div>

          <span className="font-mono text-[11px] text-slate-500">
            {formatTime(progressSec)} / {formatTime(durationSec)}
          </span>
        </div>

        {/* Translation Toggle for dialogue */}
        <button
          type="button"
          onClick={() => setShowTranslations((prev) => !prev)}
          className={`px-2 py-0.5 rounded text-[11px] font-medium border flex items-center gap-1 transition-colors ${
            showTranslations
              ? 'bg-emerald-500 text-white border-emerald-600'
              : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-sky-500'
          }`}
          title="Mostrar/ocultar traducción simultánea en español"
        >
          <RotateCw className="w-3 h-3" />
          <span>{showTranslations ? 'Ocultar Trad.' : 'Ver Traducción'}</span>
        </button>
      </div>

      {/* Subtitles / Interactive Lines with Highlights matching original software */}
      <div className="p-3 sm:p-4 bg-slate-50/70 dark:bg-slate-900/50 space-y-2 border-t border-slate-200 dark:border-slate-800">
        {MODALS_MAY_DIALOGUE.map((line, idx) => {
          const isActive = activeLineIdx === idx;
          const isFlipped = lineTranslationFlipped[line.id] || showTranslations;

          return (
            <div
              key={line.id}
              onClick={(e) => handlePlaySingleLine(idx, e)}
              className={`p-2.5 rounded-xl border transition-all cursor-pointer select-none flex items-start justify-between gap-3 ${
                isActive
                  ? 'bg-sky-500/15 border-sky-400 dark:border-sky-500 shadow-xs'
                  : isDark
                  ? 'bg-slate-800/60 hover:bg-slate-800 border-slate-700/60'
                  : 'bg-white hover:bg-slate-50 border-slate-200/80'
              }`}
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    {line.speaker}:
                  </span>
                  {isActive && (
                    <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-sky-500 text-white font-mono font-bold animate-pulse">
                      Reproduciendo
                    </span>
                  )}
                </div>

                {/* English Text with yellow / cyan highlight like in screenshot */}
                <p className="text-sm font-medium text-slate-800 dark:text-slate-100">
                  {idx === 0 ? (
                    <>
                      Mom,{' '}
                      <span className="bg-yellow-200 dark:bg-yellow-500/30 text-yellow-900 dark:text-yellow-200 px-1 py-0.5 rounded font-bold">
                        may
                      </span>{' '}
                      I have a cookie?
                    </>
                  ) : (
                    <>
                      OK, but only one. Your brother{' '}
                      <span className="bg-sky-200 dark:bg-sky-500/30 text-sky-900 dark:text-sky-200 px-1 py-0.5 rounded font-bold">
                        may
                      </span>{' '}
                      want one, too.
                    </>
                  )}
                </p>

                {/* Spanish Translation (reversible or shown) */}
                {isFlipped && (
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1 font-serif italic animate-in fade-in">
                    {line.translation}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1 shrink-0 pt-1">
                <button
                  type="button"
                  onClick={(e) => handlePlaySingleLine(idx, e)}
                  className="p-1 rounded-md text-slate-400 hover:text-sky-500 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                  title="Escuchar esta frase"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={(e) => toggleLineFlip(line.id, e)}
                  className="p-1 rounded-md text-slate-400 hover:text-emerald-500 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                  title="Traducir frase"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
