import React, { useRef, useState, useEffect } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  FileText,
  RotateCcw,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { playFeedbackSound } from '../../utils/audio';

interface LostReportVideoPlayerProps {
  currentTime?: number;
  onTimeUpdate?: (timeSec: number) => void;
  isTranscriptVisible?: boolean;
  onToggleTranscript?: () => void;
  className?: string;
  autoPlay?: boolean;
}

export const LostReportVideoPlayer: React.FC<LostReportVideoPlayerProps> = ({
  onTimeUpdate,
  isTranscriptVisible = true,
  onToggleTranscript,
  className = '',
  autoPlay = false,
}) => {
  const { isDark } = useTheme();
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTimeSec, setCurrentTimeSec] = useState(0);
  const [durationSec, setDurationSec] = useState(55); // video is 55 seconds
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);

  const videoSrc = '/assets/video_lost_report.mp4';

  const formatTime = (timeInSeconds: number) => {
    if (isNaN(timeInSeconds) || timeInSeconds < 0) return '00:00';
    const mins = Math.floor(timeInSeconds / 60);
    const secs = Math.floor(timeInSeconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleTogglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    playFeedbackSound('click');
    if (video.paused || video.ended) {
      video.play().catch(() => {});
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const handleVideoTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;
    const current = video.currentTime;
    setCurrentTimeSec(current);
    if (onTimeUpdate) {
      onTimeUpdate(current);
    }
  };

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (video && video.duration) {
      setDurationSec(video.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;
    const seekTime = parseFloat(e.target.value);
    video.currentTime = seekTime;
    setCurrentTimeSec(seekTime);
  };

  const handleToggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const handleCycleSpeed = () => {
    const video = videoRef.current;
    if (!video) return;
    const rates = [0.75, 1.0, 1.25];
    const nextIdx = (rates.indexOf(playbackRate) + 1) % rates.length;
    const nextRate = rates[nextIdx];
    video.playbackRate = nextRate;
    setPlaybackRate(nextRate);
    playFeedbackSound('click');
  };

  const handleFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.requestFullscreen) {
      video.requestFullscreen().catch(() => {});
    }
  };

  const handleRestart = () => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    video.play().catch(() => {});
    setIsPlaying(true);
    playFeedbackSound('click');
  };

  return (
    <div
      className={`relative w-full rounded-2xl overflow-hidden shadow-lg border ${
        isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-900 border-slate-700'
      } ${className}`}
    >
      {/* Video element */}
      <div className="relative aspect-video w-full bg-black flex items-center justify-center">
        <video
          ref={videoRef}
          src={videoSrc}
          className="w-full h-full object-cover"
          playsInline
          autoPlay={autoPlay}
          onTimeUpdate={handleVideoTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
          onClick={handleTogglePlay}
        />

        {/* Big center play icon when paused */}
        {!isPlaying && (
          <button
            type="button"
            onClick={handleTogglePlay}
            className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white hover:scale-110 hover:bg-white/30 transition-all cursor-pointer shadow-xl z-10"
            aria-label="Reproducir video"
          >
            <Play className="w-8 h-8 fill-white translate-x-0.5" />
          </button>
        )}

        {/* Top-Right Transcript Toggle Icon (matching screenshot icon) */}
        {onToggleTranscript && (
          <button
            type="button"
            onClick={onToggleTranscript}
            className={`absolute top-2 right-2 p-2 rounded-lg backdrop-blur-md transition-all cursor-pointer z-20 ${
              isTranscriptVisible
                ? 'bg-sky-500/80 text-white shadow-md'
                : 'bg-black/50 text-slate-300 hover:text-white hover:bg-black/70'
            }`}
            title={isTranscriptVisible ? 'Ocultar transcripción' : 'Ver transcripción'}
            aria-label="Alternar transcripción"
          >
            <FileText className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Video Controls Bar (Matches the sleek dark player in the screenshots) */}
      <div className="px-3.5 py-2.5 bg-slate-950/95 border-t border-slate-800 flex items-center gap-2 sm:gap-3 text-slate-200 select-none">
        {/* Play/Pause */}
        <button
          type="button"
          onClick={handleTogglePlay}
          className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-slate-800 text-sky-400 hover:text-sky-300 transition-colors cursor-pointer"
          title={isPlaying ? 'Pausar' : 'Reproducir'}
        >
          {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current translate-x-0.5" />}
        </button>

        {/* Restart button */}
        <button
          type="button"
          onClick={handleRestart}
          className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
          title="Reiniciar desde el inicio"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>

        {/* Current Time / Duration (e.g. 00:00 / 00:55) */}
        <div className="text-[11px] font-mono text-slate-400 shrink-0 font-medium">
          <span className="text-white font-semibold">{formatTime(currentTimeSec)}</span>
          <span className="mx-1 text-slate-600">/</span>
          <span>{formatTime(durationSec)}</span>
        </div>

        {/* Timeline Scrubber */}
        <div className="flex-1 min-w-[60px] flex items-center">
          <input
            type="range"
            min={0}
            max={durationSec || 55}
            step={0.1}
            value={currentTimeSec}
            onChange={handleSeek}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-400"
            aria-label="Línea de tiempo del video"
          />
        </div>

        {/* Volume */}
        <button
          type="button"
          onClick={handleToggleMute}
          className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
          title={isMuted ? 'Activar sonido' : 'Silenciar'}
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
        </button>

        {/* Speed toggle */}
        <button
          type="button"
          onClick={handleCycleSpeed}
          className="px-1.5 py-0.5 rounded text-[11px] font-mono font-semibold bg-slate-800 hover:bg-slate-700 text-sky-300 hover:text-sky-200 cursor-pointer"
          title="Velocidad de reproducción"
        >
          {playbackRate}x
        </button>

        {/* Fullscreen */}
        <button
          type="button"
          onClick={handleFullscreen}
          className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
          title="Pantalla completa"
        >
          <Maximize2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
