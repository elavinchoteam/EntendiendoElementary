import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  Volume2,
  RotateCw,
  Gauge,
  Sparkles,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { speakEnglish, stopSpeaking, playFeedbackSound } from '../../utils/audio';
import { MODALS_HAVE_TO_DIALOGUE } from '../../data/modalsHaveToData';

interface HaveToScenePlayerProps {
  speed?: number;
  accent?: 'US' | 'UK';
  highlightActiveLine?: number;
}

export const HaveToScenePlayer: React.FC<HaveToScenePlayerProps> = ({
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

  const durationSec = 9; // 00:09 as shown in original software
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
      if (idx >= MODALS_HAVE_TO_DIALOGUE.length) {
        setIsPlayingAll(false);
        setActiveLineIdx(-1);
        setProgressSec(durationSec);
        return;
      }

      setActiveLineIdx(idx);
      const line = MODALS_HAVE_TO_DIALOGUE[idx];
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

    // Progress counter for 9 seconds
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

    const line = MODALS_HAVE_TO_DIALOGUE[idx];
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
      <div className="relative w-full aspect-video bg-slate-900 flex items-center justify-center overflow-hidden">
        <img
          src="/assets/have_to_scene.png"
          alt="Mom and Michael bedroom scene"
          className="w-full h-full object-cover select-none"
        />

        {/* Ambient Overlay Header */}
        <div className="absolute top-2 left-2 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-xs text-white text-xs font-medium">
          <Sparkles className="w-3.5 h-3.5 text-sky-400" />
          <span>Scene: Michael & Mom</span>
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

          {/* Scrub bar */}
          <div className="w-24 sm:w-36 h-1.5 bg-slate-300 dark:bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-sky-500 transition-all duration-200"
              style={{ width: `${(progressSec / durationSec) * 100}%` }}
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 font-mono text-[11px] text-sky-600 dark:text-sky-400">
            <Gauge className="w-3.5 h-3.5" />
            <span>{speed.toFixed(2)}x</span>
          </div>

          <div className="flex items-center gap-1 font-mono text-[11px]">
            <Volume2 className="w-3.5 h-3.5 text-slate-500" />
            <span>
              {formatTime(progressSec)} / {formatTime(durationSec)}
            </span>
          </div>

          <button
            type="button"
            onClick={() => setShowTranslations((prev) => !prev)}
            className={`px-2 py-0.5 rounded text-[11px] font-semibold flex items-center gap-1 border transition-colors cursor-pointer ${
              showTranslations
                ? 'bg-emerald-600 text-white border-emerald-500'
                : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 hover:bg-slate-50'
            }`}
            title="Mostrar/ocultar traducción en español de toda la escena"
          >
            <RotateCw className="w-3 h-3" />
            <span className="hidden sm:inline">Traducción</span>
          </button>
        </div>
      </div>

      {/* Dialogue Box underneath (Original software design) */}
      <div className="p-3.5 sm:p-4 bg-slate-50/80 dark:bg-slate-900/40 space-y-2.5">
        {MODALS_HAVE_TO_DIALOGUE.map((line, idx) => {
          const isLineActive = activeLineIdx === idx;
          const isFlipped = showTranslations || lineTranslationFlipped[line.id];

          return (
            <div
              key={line.id}
              onClick={(e) => handlePlaySingleLine(idx, e)}
              className={`p-2 rounded-xl transition-all cursor-pointer group flex items-start justify-between gap-2 ${
                isLineActive
                  ? 'bg-amber-100/90 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700/60 shadow-xs'
                  : 'hover:bg-slate-100 dark:hover:bg-slate-800/60'
              }`}
            >
              <div className="flex-1">
                <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-semibold mb-0.5">
                  <span className="text-[11px] font-mono uppercase text-sky-600 dark:text-sky-400">
                    {line.speaker}:
                  </span>
                  {isFlipped && (
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 italic">
                      ({line.speakerEs})
                    </span>
                  )}
                </div>

                {/* English text with cyan highlight on 'have to' */}
                <p className="text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-100 leading-relaxed">
                  -{' '}
                  {line.id === 'dlg-1' ? (
                    <span className="bg-yellow-200 dark:bg-yellow-900/60 px-1 py-0.5 rounded text-slate-900 dark:text-yellow-100">
                      {line.text}
                    </span>
                  ) : line.id === 'dlg-2' ? (
                    <>
                      Aw, Mom. Do I{' '}
                      <span className="bg-sky-200 dark:bg-sky-900/80 font-bold px-1 py-0.5 rounded text-sky-900 dark:text-sky-200">
                        have to
                      </span>{' '}
                      go to bed now?
                    </>
                  ) : (
                    <>
                      Yes, you do. It's late and you{' '}
                      <span className="bg-sky-200 dark:bg-sky-900/80 font-bold px-1 py-0.5 rounded text-sky-900 dark:text-sky-200">
                        have to
                      </span>{' '}
                      go to school tomorrow.
                    </>
                  )}
                </p>

                {/* Spanish translation line */}
                {isFlipped && (
                  <p className="text-xs text-emerald-700 dark:text-emerald-300 italic mt-1 font-serif">
                    — {line.translation}
                  </p>
                )}
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity shrink-0">
                <button
                  type="button"
                  onClick={(e) => handlePlaySingleLine(idx, e)}
                  className="p-1 rounded text-sky-600 dark:text-sky-400 hover:bg-sky-100 dark:hover:bg-sky-950/60"
                  title="Escuchar esta oración"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={(e) => toggleLineFlip(line.id, e)}
                  className="p-1 rounded text-slate-400 hover:text-emerald-500 hover:bg-slate-200 dark:hover:bg-slate-700"
                  title="Ver traducción de esta línea"
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
