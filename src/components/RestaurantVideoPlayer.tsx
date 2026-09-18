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
  RESTAURANT_DIALOGUE_TURNS,
  RestaurantDialogueTurn,
  restaurantVideo,
} from '../data/inTheRestaurantData';
import { useTheme } from '../context/ThemeContext';
import { speakEnglish, stopSpeaking } from '../utils/audio';

export interface RestaurantVideoPlayerProps {
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

export const RestaurantVideoPlayer: React.FC<RestaurantVideoPlayerProps> = ({
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
  const [duration, setDuration] = useState(67); // 01:07
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

  const handleLoadedMetadata = () => {
    if (videoRef.current && videoRef.current.duration) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleToggleMute = () => {
    if (!videoRef.current) return;
    const newMuted = !isMuted;
    videoRef.current.muted = newMuted;
    setIsMuted(newMuted);
  };

  const handleSelectSpeed = (speed: number) => {
    setPlaybackRate(speed);
    setIsSpeedMenuOpen(false);
  };

  const handleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handlePlayTurnAudio = (turn: RestaurantDialogueTurn, e: React.MouseEvent) => {
    e.stopPropagation();
    if (playingTurnId === turn.id && window.speechSynthesis?.speaking) {
      stopSpeaking();
      setPlayingTurnId(null);
      return;
    }
    stopSpeaking();
    if (videoRef.current && !videoRef.current.paused) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
    setPlayingTurnId(turn.id);

    const gender = turn.speaker === 'Waiter' ? 'male' : 'female';
    speakEnglish(
      turn.en,
      playbackRate,
      accent === 'UK' ? 'UK' : 'US',
      () => setPlayingTurnId(turn.id),
      () => setPlayingTurnId(null),
      gender
    );
  };

  return (
    <div
      className={`w-full flex flex-col rounded-2xl border overflow-hidden transition-all shadow-xs ${
        isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'
      } ${className}`}
    >
      {/* Video Container */}
      <div className="relative w-full aspect-video bg-black flex items-center justify-center group overflow-hidden">
        <video
          ref={videoRef}
          src={restaurantVideo}
          playsInline
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => setIsPlaying(false)}
          className="w-full h-full object-cover cursor-pointer"
          onClick={handleTogglePlay}
        />

        {/* Big Center Play Button Overlay when paused */}
        {!isPlaying && (
          <button
            type="button"
            onClick={handleTogglePlay}
            className="absolute z-20 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-slate-900/60 hover:bg-slate-900/80 text-white/90 hover:text-white flex items-center justify-center backdrop-blur-xs transition-transform hover:scale-105 active:scale-95 shadow-xl border border-white/20 cursor-pointer"
            aria-label="Play video"
          >
            <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-current ml-1" />
          </button>
        )}

        {/* Top Right Transcript Button Overlay (Matching the blue-tinted button in screenshots) */}
        <button
          type="button"
          onClick={() => setShowTranscript((prev) => !prev)}
          className={`absolute top-2 right-2 sm:top-3 sm:right-3 z-30 p-2 sm:p-2.5 rounded-lg border transition-all cursor-pointer shadow-md ${
            showTranscript
              ? 'bg-sky-500/90 text-white border-sky-400'
              : 'bg-white/85 hover:bg-white text-sky-700 border-sky-300'
          }`}
          aria-label="Toggle transcript"
          title={showTranscript ? 'Ocultar transcripción' : 'Mostrar transcripción'}
        >
          <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Custom Video Control Bar (Exact look & feel as screenshot) */}
        <div className="absolute bottom-0 left-0 right-0 z-30 bg-black/90 px-3 sm:px-4 py-2 flex items-center gap-2 sm:gap-3 text-white text-xs select-none">
          {/* Play/Pause */}
          <button
            type="button"
            onClick={handleTogglePlay}
            className="text-white hover:text-sky-400 transition-colors cursor-pointer shrink-0"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
          </button>

          {/* Time Display */}
          <div className="font-mono text-[11px] sm:text-xs shrink-0 text-slate-300">
            {formatTime(currentTime)}/{formatTime(duration)}
          </div>

          {/* Scrubber Progress Bar */}
          <div className="flex-1 flex items-center">
            <input
              type="range"
              min={0}
              max={duration || 67}
              step={0.1}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-sky-400"
              aria-label="Video scrubber"
            />
          </div>

          {/* Volume Button */}
          <button
            type="button"
            onClick={handleToggleMute}
            className="text-white hover:text-sky-400 transition-colors cursor-pointer shrink-0"
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Speed Selector Dial */}
          <div className="relative" ref={speedMenuRef}>
            <button
              type="button"
              onClick={() => setIsSpeedMenuOpen((prev) => !prev)}
              className="text-white hover:text-sky-400 transition-colors cursor-pointer shrink-0 p-1 rounded-md hover:bg-slate-800"
              aria-label="Speed options"
              title="Velocidad"
            >
              <Gauge className="w-4 h-4" />
            </button>

            {isSpeedMenuOpen && (
              <div className="absolute bottom-8 right-0 z-50 py-1.5 w-24 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl flex flex-col">
                {PLAYBACK_SPEEDS.map((sp) => (
                  <button
                    key={sp.value}
                    type="button"
                    onClick={() => handleSelectSpeed(sp.value)}
                    className={`px-3 py-1 text-xs text-left cursor-pointer transition-colors ${
                      playbackRate === sp.value
                        ? 'bg-sky-600 text-white font-bold'
                        : 'text-slate-200 hover:bg-slate-800'
                    }`}
                  >
                    {sp.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Fullscreen Button */}
          <button
            type="button"
            onClick={handleFullscreen}
            className="text-white hover:text-sky-400 transition-colors cursor-pointer shrink-0"
            aria-label="Fullscreen"
          >
            <Maximize className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Synchronized Transcript (Optional / Toggleable) */}
      {showTranscript && (
        <div
          className={`w-full p-4 sm:p-5 border-t max-h-[380px] overflow-y-auto space-y-2.5 text-sm leading-relaxed ${
            isDark ? 'bg-slate-950/70 border-slate-800 text-slate-200' : 'bg-slate-50/70 border-slate-200 text-slate-800'
          }`}
        >
          {RESTAURANT_DIALOGUE_TURNS.map((turn) => {
            const isHighlighted = highlightedTurnIds.includes(turn.id);
            const isSpeakingThis = playingTurnId === turn.id;

            return (
              <div
                key={turn.id}
                className={`p-2 sm:p-2.5 rounded-xl border transition-all flex items-start gap-2.5 ${
                  isHighlighted
                    ? isDark
                      ? 'bg-amber-950/40 border-amber-500/50 text-amber-200'
                      : 'bg-amber-50 border-amber-300 text-amber-950'
                    : isSpeakingThis
                    ? isDark
                      ? 'bg-sky-950/60 border-sky-500 text-sky-200'
                      : 'bg-sky-50 border-sky-400 text-sky-950'
                    : isDark
                    ? 'bg-slate-900/50 border-slate-800 hover:bg-slate-900 text-slate-300'
                    : 'bg-white border-slate-200 hover:bg-slate-100/70 text-slate-700'
                }`}
              >
                {/* Speaker Audio Button */}
                <button
                  type="button"
                  onClick={(e) => handlePlayTurnAudio(turn, e)}
                  className={`p-1.5 rounded-lg border shrink-0 transition-all cursor-pointer ${
                    isSpeakingThis
                      ? 'bg-sky-500 text-white border-sky-400 ring-2 ring-sky-300'
                      : isDark
                      ? 'bg-slate-800 text-sky-400 border-slate-700 hover:bg-slate-700'
                      : 'bg-slate-100 text-sky-600 border-slate-200 hover:bg-slate-200'
                  }`}
                  aria-label="Audio"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>

                {/* Text Line */}
                <div className="flex-1">
                  <span
                    className={`font-bold mr-1.5 ${
                      turn.speaker === 'Waiter'
                        ? 'text-sky-600 dark:text-sky-400'
                        : turn.speaker === 'Sara'
                        ? 'text-amber-600 dark:text-amber-400'
                        : 'text-emerald-600 dark:text-emerald-400'
                    }`}
                  >
                    {turn.speaker}:
                  </span>
                  <span
                    className={
                      isHighlighted && turn.id === 'turn-1'
                        ? 'bg-yellow-200 dark:bg-yellow-900/60 px-1 py-0.5 rounded text-slate-950 dark:text-yellow-100 font-medium'
                        : ''
                    }
                  >
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
