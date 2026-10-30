import React, { useRef, useState, useEffect } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Gauge,
  FileText,
} from 'lucide-react';
import { goodMorningVideo, GOOD_MORNING_TRANSCRIPT } from '../../data/goodMorningData';
import { useTheme } from '../../context/ThemeContext';
import { speakEnglish, stopSpeaking } from '../../utils/audio';

interface GoodMorningVideoPlayerProps {
  speed?: number;
  accent?: 'US' | 'UK';
  showTranscript?: boolean;
  onToggleTranscript?: () => void;
  highlightedLineId?: string;
  className?: string;
}

export const GoodMorningVideoPlayer: React.FC<GoodMorningVideoPlayerProps> = ({
  speed = 1.0,
  accent = 'US',
  showTranscript = true,
  onToggleTranscript,
  highlightedLineId,
  className = '',
}) => {
  const { isDark } = useTheme();
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(49);
  const [isMuted, setIsMuted] = useState(false);
  const [activeSentenceId, setActiveSentenceId] = useState<string | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
  }, [speed]);

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const cur = videoRef.current.currentTime;
    setCurrentTime(cur);

    // Find active transcript item by timestamp
    const active = GOOD_MORNING_TRANSCRIPT.find(
      (s) =>
        s.startSec !== undefined &&
        s.endSec !== undefined &&
        cur >= s.startSec &&
        cur <= s.endSec
    );
    if (active) {
      setActiveSentenceId(active.id);
    } else {
      setActiveSentenceId(null);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration || 49);
    }
  };

  const togglePlay = () => {
    stopSpeaking();
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = val;
      setCurrentTime(val);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleJumpToSentence = (startSec?: number) => {
    if (startSec !== undefined && videoRef.current) {
      videoRef.current.currentTime = startSec;
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  return (
    <div className={`w-full flex flex-col rounded-xl overflow-hidden border shadow-sm ${
      isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'
    } ${className}`}>
      {/* Video Container */}
      <div className="relative w-full aspect-video bg-black flex items-center justify-center group">
        <video
          ref={videoRef}
          src={goodMorningVideo}
          playsInline
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => setIsPlaying(false)}
          className="w-full h-full object-cover cursor-pointer"
          onClick={togglePlay}
        />

        {/* Big Center Play Button when paused */}
        {!isPlaying && (
          <button
            type="button"
            onClick={togglePlay}
            className="absolute z-20 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-all transform hover:scale-110 active:scale-95 shadow-2xl backdrop-blur-xs cursor-pointer"
            aria-label="Reproducir video"
          >
            <Play className="w-8 h-8 sm:w-10 sm:h-10 ml-1 fill-white" />
          </button>
        )}

        {/* Transcript Toggle Button in top right */}
        {onToggleTranscript && (
          <button
            type="button"
            onClick={onToggleTranscript}
            className={`absolute top-2.5 right-2.5 z-20 w-8 h-8 rounded-lg flex items-center justify-center border transition-all cursor-pointer ${
              showTranscript
                ? 'bg-sky-500 text-white border-sky-400 shadow-md'
                : 'bg-white/90 hover:bg-white text-slate-700 border-slate-300 shadow-sm'
            }`}
            title={showTranscript ? 'Ocultar transcripción' : 'Ver transcripción'}
            aria-label="Alternar transcripción"
          >
            <FileText className="w-4 h-4" />
          </button>
        )}

        {/* Bottom Bar: Exact custom styling matching the screenshots */}
        <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/90 via-black/60 to-transparent px-3 py-2 flex items-center gap-2 sm:gap-3 text-white">
          <button
            type="button"
            onClick={togglePlay}
            className="text-white hover:text-sky-400 transition-colors cursor-pointer shrink-0"
            aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 sm:w-5 sm:h-5 fill-white" />
            ) : (
              <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-white" />
            )}
          </button>

          {/* Time: 00:00 / 00:49 */}
          <span className="font-mono text-[11px] sm:text-xs text-slate-200 shrink-0 select-none">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>

          {/* Scrubber */}
          <input
            type="range"
            min={0}
            max={duration || 49}
            step={0.1}
            value={currentTime}
            onChange={handleSeek}
            className="flex-1 h-1.5 accent-sky-400 bg-white/30 rounded-lg cursor-pointer"
            aria-label="Línea de tiempo del video"
          />

          {/* Volume */}
          <button
            type="button"
            onClick={toggleMute}
            className="text-white hover:text-sky-400 transition-colors cursor-pointer shrink-0"
            aria-label={isMuted ? 'Activar sonido' : 'Silenciar'}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" />
            ) : (
              <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />
            )}
          </button>

          {/* Speed Indicator */}
          <span className="font-mono text-[10px] sm:text-[11px] px-1.5 py-0.5 rounded bg-white/20 text-slate-200 shrink-0">
            {speed}x
          </span>

          {/* Fullscreen */}
          <button
            type="button"
            onClick={handleFullscreen}
            className="text-white hover:text-sky-400 transition-colors cursor-pointer shrink-0"
            aria-label="Pantalla completa"
          >
            <Maximize className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>

      {/* Transcript Area (When enabled) */}
      {showTranscript && (
        <div className={`p-4 max-h-[300px] overflow-y-auto space-y-2 border-t ${
          isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}>
          {GOOD_MORNING_TRANSCRIPT.map((line) => {
            const isActive = activeSentenceId === line.id;
            const isHighlighted = highlightedLineId === line.id;

            return (
              <div
                key={line.id}
                onClick={() => handleJumpToSentence(line.startSec)}
                className={`text-xs sm:text-sm font-sans transition-all rounded-md px-2 py-1 cursor-pointer flex items-baseline gap-1.5 ${
                  isActive
                    ? 'bg-sky-500/20 text-sky-700 dark:text-sky-300 font-semibold'
                    : isHighlighted
                    ? 'bg-amber-100 dark:bg-amber-950/40 text-slate-800 dark:text-slate-200'
                    : 'hover:bg-slate-200/50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300'
                }`}
              >
                <span className="font-bold text-sky-600 dark:text-sky-400 shrink-0">
                  {line.speaker}:
                </span>
                <span className={line.id === 's1' ? 'bg-yellow-200 dark:bg-yellow-500/30 px-1 rounded' : ''}>
                  {line.en}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
