import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import {
  PAST_SIMPLE_REGULAR_REFERENCE,
  pastSimpleRegularTennisImg,
} from '../../data/pastSimpleRegularData';
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

  const duration = PAST_SIMPLE_REGULAR_REFERENCE.durationSeconds;
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
        PAST_SIMPLE_REGULAR_REFERENCE.audioText,
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
    <div className="w-full flex flex-col gap-5">
      {/* Reversible Instruction Card */}
      <ReversibleTextCard
        textEn="Explore the conversation and video. Click to see the translation."
        textEs="Explora la conversación y el video. Haz clic para ver la traducción."
        speed={speed}
        accent={accent}
        className="shadow-sm"
      />

      {/* Main 2-column Container */}
      <div
        className={`w-full rounded-2xl border overflow-hidden shadow-lg flex flex-col lg:flex-row transition-colors ${
          isDark ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* LEFT COLUMN: Video Player & Reference Transcript */}
        <div className="w-full lg:w-1/2 p-4 sm:p-5 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-slate-800">
          <div className="w-full rounded-xl overflow-hidden border border-slate-700/60 bg-[#1E293B] shadow-md relative flex flex-col">
            {/* Image / Video Screen */}
            <div className="relative w-full aspect-[4/3] bg-[#1a2332] overflow-hidden flex items-center justify-center">
              <img
                src={pastSimpleRegularTennisImg}
                alt="Tennis players"
                className="w-full h-full object-cover object-center"
              />

              {!isPlaying && (
                <button
                  type="button"
                  onClick={handleTogglePlay}
                  className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-black/60 hover:bg-sky-600 text-white flex items-center justify-center transition-transform hover:scale-110 active:scale-95 shadow-xl border border-white/20 cursor-pointer"
                  aria-label="Reproducir video"
                >
                  <Play className="w-6 h-6 fill-current translate-x-0.5" />
                </button>
              )}
            </div>

            {/* Video Controls Bar (00:00 / 00:08) */}
            <div className="w-full px-3 py-2.5 bg-[#1F2937] border-t border-slate-700 flex items-center gap-3 select-none">
              <button
                type="button"
                onClick={handleTogglePlay}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
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
            <div className="p-2 rounded-lg text-sm sm:text-base leading-relaxed">
              <p>
                - We{' '}
                <span className="inline-block bg-sky-200 dark:bg-sky-500/30 text-sky-950 dark:text-sky-200 px-1.5 py-0.5 rounded font-bold border border-sky-300/40">
                  didn't work
                </span>{' '}
                yesterday. We had the day off. We{' '}
                <span className="inline-block bg-sky-200 dark:bg-sky-500/30 text-sky-950 dark:text-sky-200 px-1.5 py-0.5 rounded font-bold border border-sky-300/40">
                  played
                </span>{' '}
                tennis all day.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Interactive Reversible Cards for Dialogue Lines */}
        <div className="w-full lg:w-1/2 p-4 sm:p-6 flex flex-col justify-between gap-4">
          <div className="flex flex-col gap-3.5">
            {PAST_SIMPLE_REGULAR_REFERENCE.dialogue.map((line, idx) => (
              <ReversibleTextCard
                key={idx}
                textEn={line.textEn}
                textEs={line.textEs}
                speed={speed}
                accent={accent}
                minHeightClass="min-h-[90px]"
              />
            ))}

            {/* Grammar Insight Card */}
            <ReversibleTextCard
              textEn="Rule: Regular verbs form the past simple by adding -ed (play -> played). Negative statements use didn't + base verb (didn't work)."
              textEs="Regla: Los verbos regulares forman el pasado simple añadiendo -ed (play -> played). Las oraciones negativas usan didn't + verbo base (didn't work)."
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
