import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Gauge,
  FileText,
  Check,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import {
  NEWSSTAND_SENTENCES,
  NEWSSTAND_AUDIO_TEXT,
  newsstandImg,
  NewsstandSentence,
} from '../../data/newsstandData';
import { speakEnglish, stopSpeaking } from '../../utils/audio';

interface NewsstandMediaCardProps {
  currentRate: number;
  onRateChange?: (rate: number) => void;
  accent?: 'US' | 'UK';
  highlightCurrentSentence?: boolean;
}

const PLAYBACK_SPEEDS = [
  { value: 0.5, label: '0.50x' },
  { value: 0.65, label: '0.65x' },
  { value: 0.85, label: '0.85x' },
  { value: 1.0, label: '1x' },
  { value: 1.15, label: '1.15x' },
  { value: 1.3, label: '1.30x' },
];

export const NewsstandMediaCard: React.FC<NewsstandMediaCardProps> = ({
  currentRate,
  onRateChange,
  accent = 'US',
  highlightCurrentSentence = true,
}) => {
  const { isDark } = useTheme();

  // Media Player State
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [activeSentenceIndex, setActiveSentenceIndex] = useState<number | null>(0);
  const [showTranscript, setShowTranscript] = useState(true);
  const [isSpeedOpen, setIsSpeedOpen] = useState(false);

  // Reversible flipped sentence IDs
  const [flippedSentenceIds, setFlippedSentenceIds] = useState<string[]>([]);
  const [playingSingleId, setPlayingSingleId] = useState<string | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const speedMenuRef = useRef<HTMLDivElement | null>(null);
  const TOTAL_DURATION = 17;

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

  // Cleanup audio & timer
  useEffect(() => {
    return () => {
      stopSpeaking();
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Handle Play/Pause
  const handleTogglePlay = () => {
    if (isPlaying) {
      stopSpeaking();
      setIsPlaying(false);
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    stopSpeaking();
    setIsPlaying(true);
    setPlayingSingleId(null);

    // If starting from end, reset to 0
    let currentSec = elapsedTime >= TOTAL_DURATION ? 0 : elapsedTime;
    setElapsedTime(currentSec);

    const fullDialogueText = NEWSSTAND_AUDIO_TEXT;

    if (!isMuted) {
      speakEnglish(
        fullDialogueText,
        currentRate,
        accent === 'UK' ? 'UK' : 'US',
        undefined,
        () => {
          setIsPlaying(false);
          setElapsedTime(TOTAL_DURATION);
          if (timerRef.current) clearInterval(timerRef.current);
        }
      );
    }

    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setElapsedTime((prev) => {
        const next = prev + 0.25 * currentRate;
        if (next >= TOTAL_DURATION) {
          if (timerRef.current) clearInterval(timerRef.current);
          setIsPlaying(false);
          return TOTAL_DURATION;
        }

        // Determine current active sentence based on timestamps
        if (highlightCurrentSentence) {
          const currentSentence = NEWSSTAND_SENTENCES.findIndex(
            (s) => next >= s.startTime && next < s.endTime
          );
          if (currentSentence !== -1) {
            setActiveSentenceIndex(currentSentence);
          }
        }
        return next;
      });
    }, 250);
  };

  // Handle individual sentence audio
  const handlePlaySentence = (sentence: NewsstandSentence, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (isPlaying) {
      setIsPlaying(false);
      if (timerRef.current) clearInterval(timerRef.current);
    }
    stopSpeaking();
    setPlayingSingleId(sentence.id);

    const voiceGender = sentence.speaker === 'Man' ? 'male' : 'female';
    speakEnglish(
      sentence.en,
      currentRate,
      accent === 'UK' ? 'UK' : 'US',
      undefined,
      () => {
        setPlayingSingleId(null);
      },
      voiceGender
    );
  };

  // Toggle card flip
  const handleToggleCardFlip = (id: string) => {
    setFlippedSentenceIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const progressPercent = Math.min(100, (elapsedTime / TOTAL_DURATION) * 100);

  return (
    <div
      className={`w-full rounded-2xl border flex flex-col overflow-hidden transition-all ${
        isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
      }`}
    >
      {/* Video / Player Stage */}
      <div className="relative w-full aspect-4/3 sm:aspect-16/10 bg-slate-950 overflow-hidden group">
        <img
          src={newsstandImg}
          alt="Newsstand dialogue"
          className="w-full h-full object-cover object-center"
        />

        {/* Top Floating Transcript Toggle Button */}
        <button
          type="button"
          onClick={() => setShowTranscript(!showTranscript)}
          className={`absolute top-3 right-3 p-2 rounded-xl transition-all cursor-pointer z-20 border ${
            showTranscript
              ? 'bg-sky-500 text-white border-sky-400 shadow-md'
              : 'bg-black/60 hover:bg-black/80 text-white/80 border-white/20'
          }`}
          aria-label="Toggle transcript"
        >
          <FileText className="w-4 h-4" />
        </button>

        {/* Center Big Play Button Overlay when Paused */}
        {!isPlaying && (
          <button
            type="button"
            onClick={handleTogglePlay}
            className="absolute inset-0 m-auto w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-sky-600/90 hover:bg-sky-500 text-white flex items-center justify-center shadow-xl backdrop-blur-xs transition-transform hover:scale-105 active:scale-95 cursor-pointer z-10"
            aria-label="Play dialogue"
          >
            <Play className="w-6 h-6 ml-0.5" />
          </button>
        )}

        {/* Bottom Media Bar Overlay */}
        <div className="absolute bottom-0 inset-x-0 bg-slate-950/90 backdrop-blur-xs p-2.5 sm:p-3 flex items-center gap-2.5 sm:gap-3 text-white z-20 border-t border-white/10">
          {/* Play/Pause Button */}
          <button
            type="button"
            onClick={handleTogglePlay}
            className="p-1.5 sm:p-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-white transition-colors cursor-pointer"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
          </button>

          {/* Progress timeline */}
          <div
            className="flex-1 h-2 bg-slate-700/80 rounded-full cursor-pointer relative overflow-hidden group/bar"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickX = e.clientX - rect.left;
              const ratio = Math.max(0, Math.min(1, clickX / rect.width));
              const newTime = ratio * TOTAL_DURATION;
              setElapsedTime(newTime);
            }}
          >
            <div
              className="h-full bg-sky-400 rounded-full transition-all duration-100"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Speed Selector Menu */}
          <div className="relative" ref={speedMenuRef}>
            <button
              type="button"
              onClick={() => setIsSpeedOpen(!isSpeedOpen)}
              className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1"
              aria-label="Playback speed"
            >
              <Gauge className="w-4 h-4" />
            </button>

            {isSpeedOpen && (
              <div
                className={`absolute bottom-full right-0 mb-2 w-28 rounded-xl shadow-xl border py-1 z-50 animate-in fade-in zoom-in-95 ${
                  isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-800'
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

          {/* Mute Button */}
          <button
            type="button"
            onClick={() => {
              setIsMuted(!isMuted);
              if (!isMuted && isPlaying) stopSpeaking();
            }}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              isMuted
                ? 'text-red-400 bg-red-950/40'
                : 'hover:bg-slate-800 text-slate-300 hover:text-white'
            }`}
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Time text */}
          <span className="text-xs font-mono font-medium text-slate-300 min-w-18 text-right">
            {formatTime(elapsedTime)} / 00:{TOTAL_DURATION}
          </span>
        </div>
      </div>

      {/* Transcript with Reversible Cards for Every Line */}
      {showTranscript && (
        <div
          className={`p-3 sm:p-4 border-t flex flex-col gap-2 ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50/70 border-slate-200'
          }`}
        >
          {NEWSSTAND_SENTENCES.map((sentence, idx) => {
            const isFlipped = flippedSentenceIds.includes(sentence.id);
            const isSentenceActive = isPlaying && activeSentenceIndex === idx;
            const isSinglePlaying = playingSingleId === sentence.id;

            return (
              <div
                key={sentence.id}
                className="w-full perspective-1000 select-none min-h-[44px]"
              >
                <div
                  onClick={() => handleToggleCardFlip(sentence.id)}
                  className={`relative w-full rounded-xl border transition-all duration-300 transform-style-3d cursor-pointer ${
                    isFlipped ? 'rotate-y-180' : ''
                  } ${
                    isSentenceActive
                      ? 'ring-2 ring-amber-400 bg-amber-50/90 dark:bg-amber-950/40 border-amber-300 dark:border-amber-700'
                      : isDark
                      ? 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-200'
                      : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800 shadow-2xs'
                  }`}
                >
                  {/* FRONT: English text + Speaker icon button ONLY */}
                  <div className="w-full p-2.5 sm:p-3 flex items-center justify-between gap-3 backface-hidden">
                    <div className="flex items-center gap-2 text-xs sm:text-sm">
                      <span
                        className={`font-semibold ${
                          isSentenceActive
                            ? 'text-amber-900 dark:text-amber-200 bg-amber-200/70 dark:bg-amber-900/50 px-1.5 py-0.5 rounded'
                            : ''
                        }`}
                      >
                        - {sentence.en}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => handlePlaySentence(sentence, e)}
                      className={`p-1.5 rounded-lg flex items-center justify-center transition-all cursor-pointer shrink-0 ${
                        isSinglePlaying
                          ? 'bg-sky-500 text-white animate-pulse'
                          : isDark
                          ? 'bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900'
                      }`}
                      aria-label="Listen audio"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* BACK: Spanish text only */}
                  <div className="absolute inset-0 w-full h-full p-2.5 sm:p-3 rounded-xl flex items-center justify-between gap-3 backface-hidden rotate-y-180 bg-inherit">
                    <div className="flex items-center gap-2 text-xs sm:text-sm italic text-sky-700 dark:text-sky-300 font-medium">
                      <span>- {sentence.es}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
