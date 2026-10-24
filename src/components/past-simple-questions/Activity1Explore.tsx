import React, { useState, useRef, useEffect } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  RotateCcw,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import {
  PastSimpleQuestionsExerciseItem,
  PAST_SIMPLE_QUESTIONS_REFERENCE,
  pastQuestionsOfficeImg,
} from '../../data/pastSimpleQuestionsData';
import { speakEnglish, stopSpeaking, playFeedbackSound } from '../../utils/audio';
import { useTheme } from '../../context/ThemeContext';
import { SpeedSelector } from './SpeedSelector';
import { ReversibleTextCard } from './ReversibleTextCard';

interface Activity1ExploreProps {
  exercise: PastSimpleQuestionsExerciseItem;
  speed: number;
  onSpeedChange: (speed: number) => void;
  accent?: 'US' | 'UK';
  onNextActivity?: () => void;
}

export const Activity1Explore: React.FC<Activity1ExploreProps> = ({
  exercise,
  speed,
  onSpeedChange,
  accent = 'US',
  onNextActivity,
}) => {
  const { isDark } = useTheme();

  // Media playback state
  const [isPlayingMedia, setIsPlayingMedia] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [activeSentenceIndex, setActiveSentenceIndex] = useState<number | null>(null);

  const duration = PAST_SIMPLE_QUESTIONS_REFERENCE.durationSeconds;
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      stopSpeaking();
    };
  }, []);

  const clearTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleTogglePlayMedia = () => {
    if (isPlayingMedia) {
      stopSpeaking();
      setIsPlayingMedia(false);
      setActiveSentenceIndex(null);
      clearTimer();
      return;
    }

    stopSpeaking();
    clearTimer();
    playFeedbackSound('click');
    setIsPlayingMedia(true);
    setElapsedSeconds(0);
    setActiveSentenceIndex(0);

    const stepMs = Math.round(1000 / speed);
    let currentSec = 0;
    timerRef.current = setInterval(() => {
      currentSec += 1;
      setElapsedSeconds(currentSec);

      // Approximate highlight per line across 8 seconds (2s each)
      const lineIdx = Math.min(3, Math.floor((currentSec / duration) * 4));
      setActiveSentenceIndex(lineIdx);

      if (currentSec >= duration) {
        clearTimer();
      }
    }, stepMs);

    if (!isMuted) {
      speakEnglish(
        PAST_SIMPLE_QUESTIONS_REFERENCE.audioText,
        speed,
        accent,
        () => setIsPlayingMedia(true),
        () => {
          setIsPlayingMedia(false);
          setActiveSentenceIndex(null);
          clearTimer();
          setElapsedSeconds(duration);
        }
      );
    } else {
      setTimeout(() => {
        setIsPlayingMedia(false);
        setActiveSentenceIndex(null);
        clearTimer();
      }, (duration * 1000) / speed);
    }
  };

  const handlePlaySentence = (text: string, idx: number) => {
    stopSpeaking();
    clearTimer();
    setIsPlayingMedia(false);
    setActiveSentenceIndex(idx);
    playFeedbackSound('click');

    speakEnglish(
      text,
      speed,
      accent,
      () => {},
      () => setActiveSentenceIndex(null)
    );
  };

  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const pct = Math.max(0, Math.min(1, clickX / rect.width));
    const newSec = Math.round(pct * duration);
    setElapsedSeconds(newSec);
  };

  const fullSpanishText = exercise.dialogueLines.map((l) => l.textEs).join('\n');
  const fullEnglishText = exercise.dialogueLines.map((l) => l.textEn).join('\n');

  return (
    <div className="w-full flex flex-col gap-6 animate-in fade-in duration-200">
      {/* Exercise Instructions & Speed Bar */}
      <div
        className={`w-full p-4 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
          isDark
            ? 'bg-slate-900/60 border-slate-800 text-white'
            : 'bg-white border-slate-200 text-slate-800 shadow-xs'
        }`}
      >
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-xl bg-sky-600 text-white font-mono font-bold flex items-center justify-center text-sm shadow-xs">
            1
          </span>
          <div>
            <h3 className="text-base font-bold tracking-tight">
              {exercise.titleEs}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {exercise.instructionsEs}
            </p>
          </div>
        </div>

        <SpeedSelector speed={speed} onSpeedChange={onSpeedChange} />
      </div>

      {/* Main Grid: Left Video Player & Subtitles / Right Reversible Dialogue Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (5 cols): Video / Audio Player with Office Scene */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div
            className={`rounded-2xl border overflow-hidden shadow-md ${
              isDark ? 'bg-slate-900/90 border-slate-700' : 'bg-slate-900 border-slate-800'
            }`}
          >
            {/* Visual Frame */}
            <div className="relative aspect-4/3 w-full bg-slate-950 flex items-center justify-center overflow-hidden">
              <img
                src={pastQuestionsOfficeImg}
                alt="Office dialogue: Did you ask the boss about money?"
                className="w-full h-full object-cover select-none"
              />

              {/* Center Play Overlay */}
              {!isPlayingMedia && (
                <button
                  type="button"
                  onClick={handleTogglePlayMedia}
                  className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-sky-600/90 hover:bg-sky-500 text-white flex items-center justify-center shadow-2xl transition-transform hover:scale-110 cursor-pointer backdrop-blur-xs"
                  title="Reproducir video"
                >
                  <Play className="w-7 h-7 ml-1 fill-white" />
                </button>
              )}

              {/* Live Subtitle Banner during playback */}
              {isPlayingMedia && activeSentenceIndex !== null && (
                <div className="absolute bottom-2 inset-x-2 bg-black/85 text-white text-xs sm:text-sm px-3 py-1.5 rounded-lg text-center backdrop-blur-sm border border-white/10 animate-in fade-in">
                  {exercise.dialogueLines[activeSentenceIndex]?.textEn}
                </div>
              )}
            </div>

            {/* Media Player Control Bar */}
            <div className="p-3 bg-slate-900 text-white flex flex-col gap-2 border-t border-slate-800">
              <div
                className="w-full h-2 bg-slate-800 rounded-full cursor-pointer relative overflow-hidden group"
                onClick={handleTimelineClick}
                title="Avanzar / retroceder"
              >
                <div
                  className="h-full bg-sky-500 rounded-full transition-all duration-200"
                  style={{ width: `${(elapsedSeconds / duration) * 100}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-xs font-mono text-slate-300">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleTogglePlayMedia}
                    className="p-1.5 rounded-lg hover:bg-slate-800 text-white transition-colors cursor-pointer"
                    title={isPlayingMedia ? 'Pausar' : 'Reproducir'}
                  >
                    {isPlayingMedia ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsMuted((prev) => !prev)}
                    className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
                    title={isMuted ? 'Activar sonido' : 'Silenciar'}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-sky-400 font-bold">{formatTime(elapsedSeconds)}</span>
                  <span className="opacity-40">/</span>
                  <span className="opacity-70">{formatTime(duration)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Grammar Focus Hint */}
          <div
            className={`p-3.5 rounded-xl border text-xs leading-relaxed ${
              isDark
                ? 'bg-sky-950/30 border-sky-800/40 text-sky-200'
                : 'bg-sky-50 border-sky-200 text-sky-900'
            }`}
          >
            <p className="font-bold flex items-center gap-1.5 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-sky-500" />
              <span>Estructura Clave: Past Simple Questions</span>
            </p>
            <p>
              Usa <span className="font-mono font-bold text-sky-600 dark:text-sky-400">Did + sujeto + verbo base</span> para hacer preguntas en pasado: <span className="italic">"Did you ask the boss?"</span>.
            </p>
          </div>
        </div>

        {/* Right Column (7 cols): Reversible Dialogue Cards with Highlights */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold uppercase tracking-wider font-mono text-slate-500 dark:text-slate-400">
              Diálogo Interactivo (Voltea para traducir)
            </h4>
            <span className="text-xs text-slate-400 font-sans">
              Haz clic en cualquier línea para escucharla
            </span>
          </div>

          {/* Dialogue Lines Display inside Reversible Card */}
          <ReversibleTextCard
            textEn={fullEnglishText}
            textEs={fullSpanishText}
            speed={speed}
            accent={accent}
            minHeightClass="min-h-[220px]"
            childrenFront={
              <div className="w-full flex flex-col gap-3 py-1">
                {exercise.dialogueLines.map((line, idx) => {
                  const isCurrent = activeSentenceIndex === idx;
                  return (
                    <div
                      key={idx}
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePlaySentence(line.textEn, idx);
                      }}
                      className={`p-2.5 rounded-xl transition-all border flex items-center justify-between group/line cursor-pointer ${
                        isCurrent
                          ? 'bg-amber-100 dark:bg-amber-950/50 border-amber-300 dark:border-amber-700 text-amber-900 dark:text-amber-100 font-semibold shadow-xs'
                          : isDark
                          ? 'bg-white/5 border-transparent hover:border-white/10 hover:bg-white/10 text-white'
                          : 'bg-slate-50 border-slate-200/60 hover:border-slate-300 hover:bg-slate-100/80 text-slate-800'
                      }`}
                    >
                      <div className="flex items-baseline gap-2">
                        <span className="text-sm sm:text-base leading-relaxed">
                          {line.textEn}
                        </span>
                      </div>

                      <div className="p-1 rounded-lg opacity-0 group-hover/line:opacity-100 transition-opacity text-sky-600 dark:text-sky-400">
                        <Volume2 className="w-4 h-4" />
                      </div>
                    </div>
                  );
                })}
              </div>
            }
            childrenBack={
              <div className="w-full flex flex-col gap-3 py-1 font-serif italic text-emerald-950 dark:text-emerald-200">
                {exercise.dialogueLines.map((line, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-sm sm:text-base leading-relaxed"
                  >
                    {line.textEs}
                  </div>
                ))}
              </div>
            }
          />

          {/* Next Button */}
          {onNextActivity && (
            <div className="w-full flex justify-end pt-2">
              <button
                type="button"
                onClick={() => {
                  playFeedbackSound('click');
                  onNextActivity();
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm shadow-md transition-all cursor-pointer hover:shadow-lg hover:-translate-y-0.5"
              >
                <span>Siguiente Actividad</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
