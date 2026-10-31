import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Gauge,
  Sparkles,
  RotateCw,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { speakEnglish, stopSpeaking } from '../../utils/audio';
import { MODALS_CAN_DIALOGUE, DialogueLine } from '../../data/modalsCanData';

interface ModalsCanScenePlayerProps {
  speed?: number;
  accent?: 'US' | 'UK';
  compact?: boolean;
}

export const ModalsCanScenePlayer: React.FC<ModalsCanScenePlayerProps> = ({
  speed = 1.0,
  accent = 'US',
  compact = false,
}) => {
  const { isDark } = useTheme();

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentLineIdx, setCurrentLineIdx] = useState<number>(-1);
  const [currentTimeSec, setCurrentTimeSec] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [activeFlippedLineId, setActiveFlippedLineId] = useState<string | null>(null);

  const durationSec = 7;
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      stopSpeaking();
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const playFullDialogue = () => {
    stopSpeaking();
    if (timerRef.current) clearInterval(timerRef.current);

    setIsPlaying(true);
    setCurrentLineIdx(0);
    setCurrentTimeSec(0);

    const stepInterval = 100;
    const totalSteps = (durationSec * 1000) / stepInterval;
    let stepCount = 0;

    timerRef.current = setInterval(() => {
      stepCount++;
      const currentSeconds = (stepCount * stepInterval) / 1000;
      setCurrentTimeSec(Math.min(currentSeconds, durationSec));

      if (currentSeconds < 2.3) {
        setCurrentLineIdx(0);
      } else if (currentSeconds < 4.8) {
        setCurrentLineIdx(1);
      } else if (currentSeconds <= durationSec) {
        setCurrentLineIdx(2);
      }

      if (stepCount >= totalSteps) {
        if (timerRef.current) clearInterval(timerRef.current);
        setIsPlaying(false);
        setCurrentLineIdx(-1);
        setCurrentTimeSec(0);
      }
    }, stepInterval);

    if (!isMuted) {
      speakEnglish(
        MODALS_CAN_DIALOGUE[0].audioText,
        speed,
        accent,
        undefined,
        () => {
          speakEnglish(
            MODALS_CAN_DIALOGUE[1].audioText,
            speed,
            accent,
            undefined,
            () => {
              speakEnglish(
                MODALS_CAN_DIALOGUE[2].audioText,
                speed,
                accent,
                undefined,
                () => {},
                'male'
              );
            },
            'male'
          );
        },
        'male'
      );
    }
  };

  const stopPlayback = () => {
    stopSpeaking();
    if (timerRef.current) clearInterval(timerRef.current);
    setIsPlaying(false);
    setCurrentLineIdx(-1);
    setCurrentTimeSec(0);
  };

  const handlePlayLine = (line: DialogueLine, idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    stopPlayback();
    setCurrentLineIdx(idx);
    setIsPlaying(true);
    speakEnglish(
      line.audioText,
      speed,
      accent,
      undefined,
      () => {
        setIsPlaying(false);
        setCurrentLineIdx(-1);
      },
      'male'
    );
  };

  const toggleLineFlip = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveFlippedLineId((prev) => (prev === id ? null : id));
  };

  const formatTime = (secs: number) => {
    const s = Math.floor(secs);
    const mm = String(Math.floor(s / 60)).padStart(2, '0');
    const ss = String(s % 60).padStart(2, '0');
    return `${mm}:${ss}`;
  };

  return (
    <div
      className={`w-full rounded-2xl border overflow-hidden shadow-sm transition-all ${
        isDark ? 'bg-slate-900/90 border-slate-700/80' : 'bg-white border-slate-200'
      }`}
    >
      {/* Video Window Preview */}
      <div className="relative w-full aspect-16/10 bg-slate-950 flex items-center justify-center overflow-hidden group">
        <img
          src="/assets/modals_can_scene.png"
          alt="Two men looking at a jar - Modals: Can scene"
          className="w-full h-full object-contain"
        />

        {/* Big Center Play Overlay */}
        {!isPlaying && (
          <button
            type="button"
            onClick={playFullDialogue}
            className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-black/60 hover:bg-sky-600/90 text-white flex items-center justify-center backdrop-blur-xs transition-transform transform hover:scale-110 shadow-xl"
            title="Reproducir Diálogo Completo"
          >
            <Play className="w-8 h-8 fill-current translate-x-0.5" />
          </button>
        )}

        {/* Video Timeline Bar */}
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-2 text-white flex items-center gap-2 text-xs">
          <button
            type="button"
            onClick={isPlaying ? stopPlayback : playFullDialogue}
            className="p-1 rounded-md hover:bg-white/20 transition-colors"
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 fill-current text-sky-400" />
            ) : (
              <Play className="w-4 h-4 fill-current" />
            )}
          </button>

          {/* Progress scrubber */}
          <div className="relative flex-1 h-1.5 bg-white/30 rounded-full overflow-hidden cursor-pointer">
            <div
              className="absolute left-0 top-0 bottom-0 bg-sky-400 transition-all"
              style={{ width: `${(currentTimeSec / durationSec) * 100}%` }}
            />
          </div>

          {/* Controls icons */}
          <button
            type="button"
            onClick={stopPlayback}
            className="p-1 rounded-md hover:bg-white/20 transition-colors text-slate-300 hover:text-white"
            title="Reiniciar"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => setIsMuted((m) => !m)}
            className="p-1 rounded-md hover:bg-white/20 transition-colors text-slate-300 hover:text-white"
            title={isMuted ? 'Activar sonido' : 'Silenciar'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>

          <span className="font-mono text-[11px] text-slate-200 shrink-0">
            {formatTime(currentTimeSec)} / {formatTime(durationSec)}
          </span>
        </div>
      </div>

      {/* Synchronized Transcript Box */}
      <div className={`p-4 ${isDark ? 'bg-slate-900/60' : 'bg-slate-50/70'} border-t border-slate-200 dark:border-slate-800`}>
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200/80 dark:border-slate-800">
          <span className="text-[11px] font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 flex items-center gap-1.5">
            <Sparkles className="w-3 h-3" />
            Diálogo de la Escena (Modals: Can)
          </span>
          <span className="text-[11px] text-slate-400">Toca 🔄 para traducir cada frase</span>
        </div>

        <div className="space-y-2.5">
          {/* Line 1: - Can you open it? */}
          <div
            className={`p-2.5 rounded-xl border transition-all ${
              currentLineIdx === 0
                ? isDark
                  ? 'bg-sky-950/40 border-sky-600 shadow-sm'
                  : 'bg-sky-50 border-sky-300 shadow-sm'
                : isDark
                ? 'bg-slate-800/60 border-slate-700/60'
                : 'bg-white border-slate-200/80'
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex-1 font-medium text-sm leading-relaxed">
                {activeFlippedLineId === 'dlg-1' ? (
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                    — ¿Puedes abrirlo?
                  </span>
                ) : (
                  <span>
                    —{' '}
                    <span className="bg-cyan-200 text-cyan-950 dark:bg-cyan-900 dark:text-cyan-100 px-1 py-0.5 rounded font-bold">
                      Can
                    </span>{' '}
                    <span className="bg-yellow-200 text-yellow-950 dark:bg-yellow-900/60 dark:text-yellow-100 px-1 py-0.5 rounded">
                      you open it?
                    </span>
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={(e) => handlePlayLine(MODALS_CAN_DIALOGUE[0], 0, e)}
                  className={`p-1.5 rounded-lg transition-colors ${
                    currentLineIdx === 0 && isPlaying
                      ? 'bg-sky-500 text-white animate-pulse'
                      : isDark
                      ? 'bg-slate-700 text-slate-200 hover:bg-slate-600'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                  title="Escuchar audio"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={(e) => toggleLineFlip('dlg-1', e)}
                  className={`p-1.5 rounded-lg transition-colors ${
                    activeFlippedLineId === 'dlg-1'
                      ? 'bg-emerald-500 text-white'
                      : isDark
                      ? 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                  title="Traducir frase"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Line 2: - No, I can't. I can't open it. */}
          <div
            className={`p-2.5 rounded-xl border transition-all ${
              currentLineIdx === 1
                ? isDark
                  ? 'bg-sky-950/40 border-sky-600 shadow-sm'
                  : 'bg-sky-50 border-sky-300 shadow-sm'
                : isDark
                ? 'bg-slate-800/60 border-slate-700/60'
                : 'bg-white border-slate-200/80'
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex-1 font-medium text-sm leading-relaxed">
                {activeFlippedLineId === 'dlg-2' ? (
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                    — No, no puedo. No puedo abrirlo.
                  </span>
                ) : (
                  <span>
                    — No, I{' '}
                    <span className="bg-cyan-200 text-cyan-950 dark:bg-cyan-900 dark:text-cyan-100 px-1 py-0.5 rounded font-bold">
                      can't
                    </span>
                    . I{' '}
                    <span className="bg-cyan-200 text-cyan-950 dark:bg-cyan-900 dark:text-cyan-100 px-1 py-0.5 rounded font-bold">
                      can't
                    </span>{' '}
                    open it.
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={(e) => handlePlayLine(MODALS_CAN_DIALOGUE[1], 1, e)}
                  className={`p-1.5 rounded-lg transition-colors ${
                    currentLineIdx === 1 && isPlaying
                      ? 'bg-sky-500 text-white animate-pulse'
                      : isDark
                      ? 'bg-slate-700 text-slate-200 hover:bg-slate-600'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                  title="Escuchar audio"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={(e) => toggleLineFlip('dlg-2', e)}
                  className={`p-1.5 rounded-lg transition-colors ${
                    activeFlippedLineId === 'dlg-2'
                      ? 'bg-emerald-500 text-white'
                      : isDark
                      ? 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                  title="Traducir frase"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Line 3: - Let's ask Butch. He can do it. */}
          <div
            className={`p-2.5 rounded-xl border transition-all ${
              currentLineIdx === 2
                ? isDark
                  ? 'bg-sky-950/40 border-sky-600 shadow-sm'
                  : 'bg-sky-50 border-sky-300 shadow-sm'
                : isDark
                ? 'bg-slate-800/60 border-slate-700/60'
                : 'bg-white border-slate-200/80'
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex-1 font-medium text-sm leading-relaxed">
                {activeFlippedLineId === 'dlg-3' ? (
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                    — Preguntémosle a Butch. Él puede hacerlo.
                  </span>
                ) : (
                  <span>
                    — Let's ask Butch. He{' '}
                    <span className="bg-cyan-200 text-cyan-950 dark:bg-cyan-900 dark:text-cyan-100 px-1 py-0.5 rounded font-bold">
                      can
                    </span>{' '}
                    do it.
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={(e) => handlePlayLine(MODALS_CAN_DIALOGUE[2], 2, e)}
                  className={`p-1.5 rounded-lg transition-colors ${
                    currentLineIdx === 2 && isPlaying
                      ? 'bg-sky-500 text-white animate-pulse'
                      : isDark
                      ? 'bg-slate-700 text-slate-200 hover:bg-slate-600'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                  title="Escuchar audio"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={(e) => toggleLineFlip('dlg-3', e)}
                  className={`p-1.5 rounded-lg transition-colors ${
                    activeFlippedLineId === 'dlg-3'
                      ? 'bg-emerald-500 text-white'
                      : isDark
                      ? 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                  title="Traducir frase"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
