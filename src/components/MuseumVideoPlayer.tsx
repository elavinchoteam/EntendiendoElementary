import React, { useState, useRef, useEffect } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  FileText,
  Gauge,
  RotateCcw,
  Maximize,
} from 'lucide-react';
import {
  MUSEUM_DIALOGUE_TURNS,
  DialogueTurn,
  museumVideo,
} from '../data/directionsToTheMuseumData';
import { useTheme } from '../context/ThemeContext';
import { speakEnglish, stopSpeaking } from '../utils/audio';

export interface MuseumVideoPlayerProps {
  highlightedTurnIds?: string[];
  showTranscriptByDefault?: boolean;
  accent?: 'US' | 'UK';
  speechRate?: number;
  className?: string;
}

const PLAYBACK_SPEEDS = [
  { value: 0.5, label: '0.50x' },
  { value: 0.65, label: '0.65x' },
  { value: 0.85, label: '0.85x' },
  { value: 1.0, label: '1x' },
  { value: 1.15, label: '1.15x' },
  { value: 1.3, label: '1.30x' },
];

export const MuseumVideoPlayer: React.FC<MuseumVideoPlayerProps> = ({
  highlightedTurnIds = [],
  showTranscriptByDefault = true,
  accent = 'US',
  speechRate = 1.0,
  className = '',
}) => {
  const { isDark } = useTheme();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const speedMenuRef = useRef<HTMLDivElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState<number>(speechRate || 1.0);
  const [isSpeedMenuOpen, setIsSpeedMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(90); // default ~1:30 as in screenshot
  const [showTranscript, setShowTranscript] = useState(showTranscriptByDefault);
  const [playingTurnId, setPlayingTurnId] = useState<string | null>(null);

  // Close speed menu on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (speedMenuRef.current && !speedMenuRef.current.contains(e.target as Node)) {
        setIsSpeedMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Update video playback rate when rate changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  // Clean up speech on unmount
  useEffect(() => {
    return () => {
      stopSpeaking();
    };
  }, []);

  const handleTogglePlay = () => {
    if (!videoRef.current) return;
    stopSpeaking();
    setPlayingTurnId(null);
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch((err) => {
        console.warn('Video play error:', err);
      });
      setIsPlaying(true);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      if (videoRef.current.duration && !isNaN(videoRef.current.duration)) {
        setDuration(videoRef.current.duration);
      }
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
    }
  };

  const handleToggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleSelectSpeed = (speed: number) => {
    setPlaybackRate(speed);
    setIsSpeedMenuOpen(false);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  const handlePlaySingleTurn = (turn: DialogueTurn) => {
    if (videoRef.current && isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    }

    if (playingTurnId === turn.id && window.speechSynthesis?.speaking) {
      stopSpeaking();
      setPlayingTurnId(null);
      return;
    }

    stopSpeaking();
    setPlayingTurnId(turn.id);
    const gender = turn.speaker === 'Andrew' ? 'male' : 'male';
    speakEnglish(
      turn.en,
      playbackRate,
      accent === 'UK' ? 'UK' : 'US',
      () => setPlayingTurnId(turn.id),
      () => setPlayingTurnId(null),
      gender
    );
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div
      className={`w-full rounded-2xl border overflow-hidden transition-all flex flex-col ${
        isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'
      } ${className}`}
    >
      {/* Video Container Area */}
      <div className="relative aspect-[16/10] sm:aspect-[16/9] bg-black overflow-hidden flex items-center justify-center group">
        <video
          ref={videoRef}
          src={museumVideo}
          playsInline
          preload="metadata"
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => setIsPlaying(false)}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          className="w-full h-full object-contain cursor-pointer"
          onClick={handleTogglePlay}
        />

        {/* Big Center Play Button Overlay when paused */}
        {!isPlaying && (
          <button
            type="button"
            onClick={handleTogglePlay}
            className="absolute inset-0 m-auto w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-black/65 hover:bg-sky-600 text-white flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-xl border border-white/25 cursor-pointer z-10"
            aria-label="Play"
          >
            <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-white translate-x-0.5" />
          </button>
        )}

        {/* Note / Transcript Toggle Icon Button (Top-Right, matching screenshot exactly) */}
        <button
          type="button"
          onClick={() => setShowTranscript((prev) => !prev)}
          className={`absolute top-3 right-3 w-9 h-9 sm:w-10 sm:h-10 rounded-lg border shadow-md flex items-center justify-center transition-all cursor-pointer z-20 active:scale-95 ${
            showTranscript
              ? 'bg-sky-50 hover:bg-sky-100 text-sky-600 border-sky-300 dark:bg-sky-950/80 dark:text-sky-300 dark:border-sky-600'
              : 'bg-white/90 hover:bg-white text-slate-700 border-slate-300 dark:bg-slate-800/90 dark:text-slate-200 dark:border-slate-600'
          }`}
          aria-label="Toggle transcript"
        >
          <FileText className="w-5 h-5" />
        </button>
      </div>

      {/* Video Controls Bar */}
      <div
        className={`px-3 py-2.5 sm:px-4 sm:py-3 border-t flex items-center gap-2 sm:gap-3 select-none ${
          isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}
      >
        {/* Play/Pause Button */}
        <button
          type="button"
          onClick={handleTogglePlay}
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-sky-500 hover:bg-sky-600 text-white flex items-center justify-center shadow-xs transition-all cursor-pointer shrink-0 active:scale-95"
          aria-label="Play/Pause"
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 fill-white" />
          ) : (
            <Play className="w-4 h-4 fill-white ml-0.5" />
          )}
        </button>

        {/* Timeline Slider */}
        <div className="flex-1 flex items-center min-w-0">
          <input
            type="range"
            min={0}
            max={duration || 90}
            step={0.1}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-1.5 bg-slate-300 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-sky-500"
            aria-label="Timeline"
          />
        </div>

        {/* Time Display */}
        <span className="font-mono text-xs text-slate-600 dark:text-slate-400 shrink-0 select-none">
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>

        {/* Mute/Unmute */}
        <button
          type="button"
          onClick={handleToggleMute}
          className="p-1.5 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
          aria-label="Mute"
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>

        {/* Speed Dial Menu (Gauge) */}
        <div className="relative" ref={speedMenuRef}>
          <button
            type="button"
            onClick={() => setIsSpeedMenuOpen((prev) => !prev)}
            className={`p-1.5 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer shrink-0 flex items-center gap-1 ${
              isSpeedMenuOpen ? 'bg-sky-100 text-sky-600 dark:bg-sky-900 dark:text-sky-300' : ''
            }`}
            aria-label="Speed"
          >
            <Gauge className="w-4 h-4" />
            <span className="text-[11px] font-mono font-medium hidden sm:inline">
              {playbackRate}x
            </span>
          </button>

          {isSpeedMenuOpen && (
            <div
              className={`absolute bottom-full right-0 mb-2 py-1.5 w-28 rounded-xl shadow-xl border z-50 animate-in fade-in zoom-in-95 duration-150 ${
                isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
              }`}
            >
              {PLAYBACK_SPEEDS.map((s) => (
                <button
                  key={s.value}
                  type="button"
                  onClick={() => handleSelectSpeed(s.value)}
                  className={`w-full px-3 py-1.5 text-xs text-left font-mono font-medium flex items-center justify-between transition-colors cursor-pointer ${
                    Math.abs(playbackRate - s.value) < 0.01
                      ? 'bg-sky-500 text-white font-bold'
                      : isDark
                      ? 'hover:bg-slate-800 text-slate-300'
                      : 'hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <span>{s.label}</span>
                  {Math.abs(playbackRate - s.value) < 0.01 && <span>✓</span>}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Fullscreen Button */}
        <button
          type="button"
          onClick={handleFullscreen}
          className="p-1.5 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
          aria-label="Fullscreen"
        >
          <Maximize className="w-4 h-4" />
        </button>
      </div>

      {/* Transcript Area below the video (collapsible with note toggle button) */}
      {showTranscript && (
        <div
          className={`p-3 sm:p-4 border-t max-h-[320px] overflow-y-auto space-y-2.5 font-sans transition-colors ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50/70 border-slate-200'
          }`}
        >
          {MUSEUM_DIALOGUE_TURNS.map((turn) => {
            const isTurnPlaying = playingTurnId === turn.id;

            return (
              <div
                key={turn.id}
                className={`p-2.5 rounded-xl border transition-all text-xs sm:text-sm flex items-start gap-2.5 ${
                  isTurnPlaying
                    ? isDark
                      ? 'bg-sky-950/60 border-sky-400 text-white ring-2 ring-sky-400/40'
                      : 'bg-sky-50/90 border-sky-400 text-sky-950 ring-2 ring-sky-300'
                    : isDark
                    ? 'bg-slate-800/40 border-slate-700/60 text-slate-200'
                    : 'bg-white border-slate-200 text-slate-800 shadow-xs'
                }`}
              >
                {/* Speaker pronunciation icon button (Speaker icon only, no text) */}
                <button
                  type="button"
                  onClick={() => handlePlaySingleTurn(turn)}
                  className={`p-1.5 rounded-lg border transition-all shrink-0 cursor-pointer ${
                    isTurnPlaying
                      ? 'bg-sky-500 text-white border-sky-400 ring-2 ring-sky-300'
                      : isDark
                      ? 'bg-slate-800 hover:bg-slate-700 text-sky-300 border-slate-700'
                      : 'bg-sky-50 hover:bg-sky-100 text-sky-600 border-sky-200'
                  }`}
                  aria-label="Audio"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>

                <div className="flex-1 min-w-0">
                  <span
                    className={`font-bold mr-1.5 ${
                      turn.speaker === 'Ivan'
                        ? 'text-amber-600 dark:text-amber-400'
                        : 'text-sky-600 dark:text-sky-400'
                    }`}
                  >
                    {turn.speaker}:
                  </span>

                  <span className={isTurnPlaying ? 'font-medium' : ''}>
                    {turn.en}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
