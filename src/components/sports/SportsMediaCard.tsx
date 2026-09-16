import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Gauge,
  Check,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import {
  SPORTS_SENTENCES,
  SPORTS_AUDIO_TEXT,
  radioHostImg,
  SportsSentence,
} from '../../data/sports1Data';
import { speakEnglish, stopSpeaking } from '../../utils/audio';

interface SportsMediaCardProps {
  currentRate: number;
  onRateChange?: (rate: number) => void;
  accent?: 'US' | 'UK';
  highlightCurrentSentence?: boolean;
  showTranscript?: boolean;
}

const PLAYBACK_SPEEDS = [
  { value: 0.5, label: '0.50x' },
  { value: 0.65, label: '0.65x' },
  { value: 0.85, label: '0.85x' },
  { value: 1.0, label: '1x' },
  { value: 1.15, label: '1.15x' },
  { value: 1.3, label: '1.30x' },
];

export const SportsMediaCard: React.FC<SportsMediaCardProps> = ({
  currentRate,
  onRateChange,
  accent = 'US',
  highlightCurrentSentence = true,
  showTranscript = true,
}) => {
  const { isDark } = useTheme();

  // Media player state
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [activeSentenceIndex, setActiveSentenceIndex] = useState<number | null>(0);
  const [isSpeedOpen, setIsSpeedOpen] = useState(false);

  // Reversible flipped sentence IDs
  const [flippedSentenceIds, setFlippedSentenceIds] = useState<string[]>([]);
  const [playingSingleId, setPlayingSingleId] = useState<string | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const speedMenuRef = useRef<HTMLDivElement | null>(null);
  const TOTAL_DURATION = 63; // 01:03 as in the screenshots

  // Format mm:ss
  const formatTime = (sec: number) => {
    const s = Math.min(TOTAL_DURATION, Math.floor(sec));
    const mm = String(Math.floor(s / 60)).padStart(2, '0');
    const ss = String(s % 60).padStart(2, '0');
    return `${mm}:${ss}`;
  };

  // Close speed dial on click outside
  useEffect(() => {
    const handleDocClick = (e: MouseEvent) => {
      if (speedMenuRef.current && !speedMenuRef.current.contains(e.target as Node)) {
        setIsSpeedOpen(false);
      }
    };
    document.addEventListener('mousedown', handleDocClick);
    return () => document.removeEventListener('mousedown', handleDocClick);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopSpeaking();
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Handle Play / Pause full story audio
  const handleTogglePlay = () => {
    if (isPlaying) {
      stopSpeaking();
      setIsPlaying(false);
      if (timerRef.current) clearInterval(timerRef.current);
    } else {
      stopSpeaking();
      setIsPlaying(true);
      setPlayingSingleId(null);

      // Start speech from beginning or resume
      speakEnglish(
        SPORTS_AUDIO_TEXT,
        currentRate,
        accent === 'UK' ? 'UK' : 'US',
        undefined,
        () => {
          setIsPlaying(false);
          setElapsedTime(0);
          setActiveSentenceIndex(null);
          if (timerRef.current) clearInterval(timerRef.current);
        }
      );

      // Interval for time tracker
      if (timerRef.current) clearInterval(timerRef.current);
      const intervalMs = 250;
      timerRef.current = setInterval(() => {
        setElapsedTime((prev) => {
          const next = prev + (intervalMs / 1000) * currentRate;
          if (next >= TOTAL_DURATION) {
            if (timerRef.current) clearInterval(timerRef.current);
            setIsPlaying(false);
            return 0;
          }
          // Determine current sentence by time
          const currentSentIdx = SPORTS_SENTENCES.findIndex(
            (s) => next >= s.startTime && next < s.endTime
          );
          if (currentSentIdx !== -1) {
            setActiveSentenceIndex(currentSentIdx);
          }
          return next;
        });
      }, intervalMs);
    }
  };

  // Toggle single sentence flip
  const handleSentenceFlip = (id: string) => {
    setFlippedSentenceIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  // Play individual sentence audio
  const handlePlaySentence = (sentence: SportsSentence, e: React.MouseEvent) => {
    e.stopPropagation();
    stopSpeaking();
    setIsPlaying(false);
    if (timerRef.current) clearInterval(timerRef.current);

    setPlayingSingleId(sentence.id);
    speakEnglish(
      sentence.en,
      currentRate,
      accent === 'UK' ? 'UK' : 'US',
      undefined,
      () => {
        setPlayingSingleId(null);
      }
    );
  };

  const progressPercent = Math.min(100, (elapsedTime / TOTAL_DURATION) * 100);

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Video / Audio Studio Player Card */}
      <div
        className={`rounded-2xl border overflow-hidden shadow-md flex flex-col ${
          isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'
        }`}
      >
        {/* Visual Studio Feed Screen */}
        <div className="relative w-full aspect-16/10 sm:aspect-16/9 bg-slate-950 overflow-hidden flex items-center justify-center">
          <img
            src={radioHostImg}
            alt="Jack Hill radio sports presenter"
            className="w-full h-full object-cover select-none"
          />

          {/* On-Air Live Indicator */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-600/90 text-white text-[11px] font-bold uppercase tracking-wider backdrop-blur-xs shadow-md">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            ON AIR
          </div>

          {/* Large Center Play Overlay (if not playing) */}
          {!isPlaying && (
            <button
              type="button"
              onClick={handleTogglePlay}
              className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-red-600/90 hover:bg-red-500 text-white flex items-center justify-center shadow-xl transition-transform hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-xs"
              aria-label="Play sports broadcast"
            >
              <Play className="w-6 h-6 fill-white ml-0.5" />
            </button>
          )}
        </div>

        {/* Bottom Media Controls Bar (matches Edusoft styling) */}
        <div
          className={`p-3 sm:px-4 flex items-center gap-3 select-none ${
            isDark ? 'bg-slate-800/90 text-slate-200' : 'bg-slate-100 text-slate-800'
          }`}
        >
          {/* Play / Pause button */}
          <button
            type="button"
            onClick={handleTogglePlay}
            className={`p-2 rounded-lg transition-colors cursor-pointer ${
              isPlaying
                ? 'bg-red-600 text-white'
                : isDark
                ? 'hover:bg-slate-700 text-slate-200'
                : 'hover:bg-slate-200 text-slate-800'
            }`}
            aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 fill-current" />
            ) : (
              <Play className="w-4 h-4 fill-current ml-0.5" />
            )}
          </button>

          {/* Scrubber Progress Bar */}
          <div
            className="flex-1 h-2 bg-slate-300 dark:bg-slate-700 rounded-full overflow-hidden relative cursor-pointer"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickX = e.clientX - rect.left;
              const ratio = Math.max(0, Math.min(1, clickX / rect.width));
              setElapsedTime(ratio * TOTAL_DURATION);
            }}
          >
            <div
              className="h-full bg-sky-500 rounded-full transition-all duration-150"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Playback Speed Gauge */}
          <div className="relative" ref={speedMenuRef}>
            <button
              type="button"
              onClick={() => setIsSpeedOpen(!isSpeedOpen)}
              className={`p-1.5 rounded-lg border flex items-center gap-1 text-xs font-bold transition-colors cursor-pointer ${
                isDark
                  ? 'bg-slate-700 border-slate-600 text-slate-200 hover:bg-slate-600'
                  : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
              }`}
              aria-label="Velocidad de reproducción"
            >
              <Gauge className="w-3.5 h-3.5 text-sky-500" />
              <span>{currentRate}x</span>
            </button>

            {isSpeedOpen && (
              <div
                className={`absolute bottom-full right-0 mb-2 w-28 rounded-xl shadow-xl border py-1 z-50 animate-in fade-in zoom-in-95 ${
                  isDark
                    ? 'bg-slate-800 border-slate-700 text-white'
                    : 'bg-white border-slate-200 text-slate-800 shadow-lg'
                }`}
              >
                <div className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 text-slate-400">
                  Velocidad
                </div>
                {PLAYBACK_SPEEDS.map((sp) => (
                  <button
                    key={sp.value}
                    type="button"
                    onClick={() => {
                      if (onRateChange) onRateChange(sp.value);
                      setIsSpeedOpen(false);
                    }}
                    className={`w-full text-left px-2.5 py-1 text-xs flex items-center justify-between transition-colors cursor-pointer ${
                      Math.abs(currentRate - sp.value) < 0.01
                        ? 'bg-sky-500 text-white font-bold'
                        : isDark
                        ? 'text-slate-300 hover:bg-slate-700'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span>{sp.label}</span>
                    {Math.abs(currentRate - sp.value) < 0.01 && (
                      <Check className="w-3 h-3 text-white" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Volume Mute Toggle */}
          <button
            type="button"
            onClick={() => setIsMuted(!isMuted)}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              isDark ? 'hover:bg-slate-700 text-slate-300' : 'hover:bg-slate-200 text-slate-700'
            }`}
            aria-label="Silenciar"
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-rose-500" />
            ) : (
              <Volume2 className="w-4 h-4 text-sky-500" />
            )}
          </button>

          {/* Timestamp Counter */}
          <span className="font-mono text-xs font-semibold text-slate-500 dark:text-slate-400 shrink-0">
            {formatTime(elapsedTime)} / {formatTime(TOTAL_DURATION)}
          </span>
        </div>
      </div>

      {/* Reversible Transcript Card */}
      {showTranscript && (
        <div
          className={`rounded-2xl border p-4 sm:p-5 shadow-xs flex flex-col gap-3 transition-colors ${
            isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'
          }`}
        >
          <div className="space-y-3.5">
            {SPORTS_SENTENCES.map((sent, idx) => {
              const isFlipped = flippedSentenceIds.includes(sent.id);
              const isCurrentPlaying =
                (isPlaying && highlightCurrentSentence && activeSentenceIndex === idx) ||
                playingSingleId === sent.id;

              return (
                <div
                  key={sent.id}
                  id={`sports-sentence-${sent.id}`}
                  onClick={() => handleSentenceFlip(sent.id)}
                  className={`group relative rounded-xl border p-3 transition-all duration-200 cursor-pointer select-none flex items-start justify-between gap-3 ${
                    isCurrentPlaying
                      ? isDark
                        ? 'border-sky-500 bg-sky-950/40 text-sky-200 shadow-sm ring-2 ring-sky-500/30'
                        : 'border-sky-500 bg-sky-50 text-sky-900 shadow-sm ring-2 ring-sky-400/30'
                      : isDark
                      ? 'border-slate-700/80 bg-slate-800/60 hover:bg-slate-800 text-slate-100 hover:border-slate-600'
                      : 'border-slate-200 bg-slate-50/70 hover:bg-slate-100/80 text-slate-900 hover:border-slate-300'
                  }`}
                >
                  {/* Text Content (Flip English / Spanish, purely neutral, NO gradients) */}
                  <div className="flex-1 pr-2">
                    {isFlipped ? (
                      <div className="space-y-1">
                        <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 block">
                          Español
                        </span>
                        <p className="text-sm sm:text-base font-normal leading-relaxed text-slate-800 dark:text-slate-200">
                          {sent.es}
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        {idx === 0 && (
                          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 block">
                            Inglés
                          </span>
                        )}
                        <p className="text-sm sm:text-base font-medium leading-relaxed">
                          {sent.en}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Speaker Button with ONLY speaker icon */}
                  <button
                    type="button"
                    onClick={(e) => handlePlaySentence(sent, e)}
                    className={`p-2 rounded-lg border transition-all shrink-0 cursor-pointer ${
                      playingSingleId === sent.id
                        ? 'bg-sky-600 text-white border-sky-500 ring-2 ring-sky-400/40'
                        : isDark
                        ? 'bg-slate-700 hover:bg-slate-600 text-sky-300 border-slate-600'
                        : 'bg-white hover:bg-slate-100 text-sky-700 border-slate-200 shadow-xs'
                    }`}
                    aria-label="Audio"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
