import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import {
  PAST_SIMPLE_IRREGULAR_REFERENCE,
  pastIrregularOfficeImg,
} from '../../data/pastSimpleIrregularData';
import { speakEnglish, stopSpeaking, playFeedbackSound } from '../../utils/audio';
import { useTheme } from '../../context/ThemeContext';
import { SpeedSelector } from './SpeedSelector';
import { ReversibleTextCard } from './ReversibleTextCard';

interface Activity1ExploreProps {
  speed: number;
  onSpeedChange: (speed: number) => void;
  accent?: 'US' | 'UK';
}

export const Activity1Explore: React.FC<Activity1ExploreProps> = ({
  speed,
  onSpeedChange,
  accent = 'US',
}) => {
  const { isDark } = useTheme();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const duration = PAST_SIMPLE_IRREGULAR_REFERENCE.durationSeconds;
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const clearTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      clearTimer();
      stopSpeaking();
    };
  }, []);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleTogglePlay = () => {
    if (isPlaying) {
      stopSpeaking();
      setIsPlaying(false);
      clearTimer();
      return;
    }

    stopSpeaking();
    clearTimer();
    playFeedbackSound('click');
    setIsPlaying(true);
    setElapsedSeconds(0);

    const stepMs = Math.round(1000 / speed);
    let currentSec = 0;
    timerRef.current = setInterval(() => {
      currentSec += 1;
      setElapsedSeconds(currentSec);
      if (currentSec >= duration) {
        clearTimer();
      }
    }, stepMs);

    if (!isMuted) {
      speakEnglish(
        PAST_SIMPLE_IRREGULAR_REFERENCE.audioText,
        speed,
        accent,
        () => setIsPlaying(true),
        () => {
          setIsPlaying(false);
          clearTimer();
          setElapsedSeconds(duration);
        }
      );
    } else {
      setTimeout(() => {
        setIsPlaying(false);
        clearTimer();
      }, (duration * 1000) / speed);
    }
  };

  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const pct = Math.max(0, Math.min(1, clickX / rect.width));
    const newSec = Math.round(pct * duration);
    setElapsedSeconds(newSec);
  };

  return (
    <div className="w-full flex flex-col gap-6 animate-in fade-in duration-300">
      {/* Header bar: Title & Instructions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Actividad 1: Diálogo y Video
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Listen to the dialogue and observe the irregular verbs in past simple.
          </p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="text-xs font-medium text-slate-400 dark:text-slate-500">
            Velocidad:
          </span>
          <SpeedSelector currentSpeed={speed} onSpeedChange={onSpeedChange} />
        </div>
      </div>

      {/* 2-Column Main Layout */}
      <div className="flex flex-col lg:flex-row items-stretch gap-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
        {/* LEFT COLUMN: Video Player & Highlighted Sentence */}
        <div className="w-full lg:w-1/2 p-4 sm:p-6 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40">
          {/* Video Container */}
          <div className="relative w-full rounded-xl overflow-hidden bg-slate-800 shadow-md border border-slate-700/80 flex flex-col">
            <div className="relative aspect-video w-full bg-[#00A896] overflow-hidden flex items-center justify-center">
              <img
                src={pastIrregularOfficeImg}
                alt="David at work"
                className="w-full h-full object-cover"
              />

              {/* Play overlay button if paused */}
              {!isPlaying && (
                <button
                  type="button"
                  onClick={handleTogglePlay}
                  className="absolute inset-0 flex items-center justify-center bg-black/25 hover:bg-black/35 transition-all cursor-pointer group"
                  aria-label="Reproducir video"
                >
                  <div className="w-14 h-14 rounded-full bg-white/90 text-slate-900 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 fill-current ml-0.5 text-sky-600" />
                  </div>
                </button>
              )}
            </div>

            {/* Video Controls Bar */}
            <div className="p-2.5 bg-slate-800 border-t border-slate-700 flex items-center gap-3">
              <button
                type="button"
                onClick={handleTogglePlay}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 fill-current text-sky-400" />
                ) : (
                  <Play className="w-4 h-4 fill-current text-slate-200" />
                )}
              </button>

              <div
                onClick={handleTimelineClick}
                className="relative flex-1 h-3 flex items-center cursor-pointer group py-1"
              >
                <div className="w-full h-1.5 bg-slate-600 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-sky-500 rounded-full transition-all duration-150"
                    style={{
                      width: `${Math.min(100, (elapsedSeconds / duration) * 100)}%`,
                    }}
                  />
                </div>
              </div>

              <div className="text-[11px] font-mono font-medium text-slate-300 shrink-0">
                {formatTime(elapsedSeconds)} / {formatTime(duration)}
              </div>

              <button
                type="button"
                onClick={() => setIsMuted((prev) => !prev)}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label={isMuted ? 'Activar sonido' : 'Silenciar'}
              >
                {isMuted ? (
                  <VolumeX className="w-3.5 h-3.5 text-rose-400" />
                ) : (
                  <Volume2 className="w-3.5 h-3.5 text-slate-300" />
                )}
              </button>

              <SpeedSelector currentSpeed={speed} onSpeedChange={onSpeedChange} />
            </div>
          </div>

          {/* Transcript box with highlighted grammar words */}
          <div className="mt-4 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-black/20 flex flex-col gap-2">
            <div className="p-2 rounded-lg text-sm sm:text-base leading-relaxed space-y-1.5">
              <p>
                - Hey, Where{' '}
                <span className="inline-block bg-sky-200 dark:bg-sky-500/30 text-sky-950 dark:text-sky-200 px-1.5 py-0.5 rounded font-bold border border-sky-300/40">
                  did
                </span>{' '}
                David{' '}
                <span className="inline-block bg-amber-200 dark:bg-amber-500/30 text-amber-950 dark:text-amber-200 px-1.5 py-0.5 rounded font-bold border border-amber-300/40">
                  go
                </span>
                ?
              </p>
              <p>
                - Oh, he{' '}
                <span className="inline-block bg-sky-200 dark:bg-sky-500/30 text-sky-950 dark:text-sky-200 px-1.5 py-0.5 rounded font-bold border border-sky-300/40">
                  left
                </span>{' '}
                early because he{' '}
                <span className="inline-block bg-sky-200 dark:bg-sky-500/30 text-sky-950 dark:text-sky-200 px-1.5 py-0.5 rounded font-bold border border-sky-300/40">
                  had
                </span>{' '}
                a headache and he{' '}
                <span className="inline-block bg-sky-200 dark:bg-sky-500/30 text-sky-950 dark:text-sky-200 px-1.5 py-0.5 rounded font-bold border border-sky-300/40">
                  gave
                </span>{' '}
                me all his work!
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Interactive Reversible Cards for Dialogue Lines */}
        <div className="w-full lg:w-1/2 p-4 sm:p-6 flex flex-col justify-between gap-4">
          <div className="flex flex-col gap-3.5">
            {PAST_SIMPLE_IRREGULAR_REFERENCE.dialogue.map((line, idx) => (
              <ReversibleTextCard
                key={idx}
                textEn={line.textEn}
                textEs={line.textEs}
                speed={speed}
                accent={accent}
                minHeightClass="min-h-[80px]"
              />
            ))}

            {/* Grammar Rule Card */}
            <ReversibleTextCard
              textEn="Rule: Irregular verbs change their spelling in the affirmative past (go -> went, leave -> left, have -> had, give -> gave). In questions and negative sentences, use did/didn't + base verb."
              textEs="Regla: Los verbos irregulares cambian su forma en el pasado afirmativo (leave -> left, have -> had, give -> gave). En preguntas y negaciones, se usa did/didn't + verbo base (did David go?)."
              speed={speed}
              accent={accent}
              minHeightClass="min-h-[100px]"
            />
          </div>

          <div
            className={`p-3.5 rounded-xl border text-xs sm:text-sm font-medium transition-colors ${
              isDark ? 'bg-slate-800/60 border-slate-700 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
            }`}
          >
            <p>
              💡 <strong>Tip:</strong> Haz clic en cualquier tarjeta para voltearla y ver la traducción al español. Usa el botón del parlante para escuchar la pronunciación en cualquier momento.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
