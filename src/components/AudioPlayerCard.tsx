import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, FileText, Gauge, ChevronUp, Check } from 'lucide-react';
import { LessonSentence } from '../types';
import { speakEnglish, playFeedbackSound } from '../utils/audio';
import chuckWoodImg from '../assets/images/chuck_wood_player_1788552205408.jpg';

export interface AudioPlayerCardProps {
  audioText: string;
  sentences?: LessonSentence[];
  accent?: 'US' | 'UK';
  initialPlaybackRate?: number;
  currentSentenceIdx?: number | null;
  onSentenceChange?: (idx: number | null) => void;
  onToggleTranscript?: () => void;
  isTranscriptVisible?: boolean;
  className?: string;
  totalDurationSeconds?: number;
  imageSrc?: string;
  altText?: string;
  speakerGender?: 'male' | 'female';
}

const DEFAULT_DURATION = 41; // 00:41 as shown in course screenshot

export const PLAYBACK_SPEEDS = [
  { value: 0.5, label: '0.50x' },
  { value: 0.65, label: '0.65x' },
  { value: 0.85, label: '0.85x' },
  { value: 1.0, label: '1x' },
  { value: 1.15, label: '1.15x' },
  { value: 1.3, label: '1.30x' },
];

export const formatSpeedLabel = (rate: number): string => {
  const found = PLAYBACK_SPEEDS.find((s) => Math.abs(s.value - rate) < 0.01);
  if (found) return found.label;
  return `${rate}x`;
};

export const AudioPlayerCard: React.FC<AudioPlayerCardProps> = ({
  audioText,
  sentences = [],
  accent = 'US',
  initialPlaybackRate = 1.0,
  currentSentenceIdx: externalSentenceIdx,
  onSentenceChange,
  onToggleTranscript,
  isTranscriptVisible = true,
  className = '',
  totalDurationSeconds = DEFAULT_DURATION,
  imageSrc = chuckWoodImg,
  altText = 'Audio player media',
  speakerGender = 'male',
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentRate, setCurrentRate] = useState<number>(initialPlaybackRate);
  const [isSpeedMenuOpen, setIsSpeedMenuOpen] = useState<boolean>(false);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [internalSentenceIdx, setInternalSentenceIdx] = useState<number | null>(null);

  const safeAccent: 'US' | 'UK' = accent === 'UK' ? 'UK' : 'US';
  const safeGender: 'male' | 'female' = speakerGender === 'female' ? 'female' : 'male';
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const speedMenuRef = useRef<HTMLDivElement | null>(null);
  const elapsedRef = useRef<number>(0);
  const onSentenceChangeRef = useRef(onSentenceChange);

  useEffect(() => {
    onSentenceChangeRef.current = onSentenceChange;
  });

  // Sync elapsedRef when elapsedSeconds changes externally (e.g., reset)
  useEffect(() => {
    elapsedRef.current = elapsedSeconds;
  }, [elapsedSeconds]);

  // Clean up timer and speech on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      window.speechSynthesis?.cancel();
    };
  }, []);

  // When audio text changes, reset playback state
  useEffect(() => {
    setIsPlaying(false);
    elapsedRef.current = 0;
    setElapsedSeconds(0);
    setInternalSentenceIdx(null);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, [audioText]);

  // Close speed menu on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (speedMenuRef.current && !speedMenuRef.current.contains(e.target as Node)) {
        setIsSpeedMenuOpen(false);
      }
    };
    if (isSpeedMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSpeedMenuOpen]);

  // Sync timer with playback
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        const next = elapsedRef.current + 1;
        if (next >= totalDurationSeconds) {
          elapsedRef.current = 0;
          setElapsedSeconds(0);
          setIsPlaying(false);
          setInternalSentenceIdx(null);
          onSentenceChangeRef.current?.(null);
        } else {
          elapsedRef.current = next;
          setElapsedSeconds(next);
          if (sentences.length > 0) {
            const sentenceIndex = Math.min(
              sentences.length - 1,
              Math.floor((next / totalDurationSeconds) * sentences.length)
            );
            setInternalSentenceIdx(sentenceIndex);
            onSentenceChangeRef.current?.(sentenceIndex);
          }
        }
      }, 1000 / currentRate);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isPlaying, currentRate, sentences.length, totalDurationSeconds]);

  const handleTogglePlay = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    if (isPlaying) {
      window.speechSynthesis?.cancel();
      setIsPlaying(false);
      return;
    }

    window.speechSynthesis?.cancel();
    playFeedbackSound('click');
    setIsPlaying(true);
    elapsedRef.current = 0;
    setElapsedSeconds(0);
    setInternalSentenceIdx(0);
    onSentenceChangeRef.current?.(0);

    speakEnglish(
      audioText,
      currentRate,
      safeAccent,
      () => {
        setIsPlaying(true);
      },
      () => {
        setIsPlaying(false);
        elapsedRef.current = totalDurationSeconds;
        setElapsedSeconds(totalDurationSeconds);
        setInternalSentenceIdx(null);
        onSentenceChangeRef.current?.(null);
      },
      safeGender
    );
  };

  const handleSelectSpeed = (speedValue: number, e: React.MouseEvent) => {
    e.stopPropagation();
    playFeedbackSound('click');
    setCurrentRate(speedValue);
    setIsSpeedMenuOpen(false);

    // If currently playing, restart speech with the new speed seamlessly
    if (isPlaying) {
      window.speechSynthesis?.cancel();
      speakEnglish(
        audioText,
        speedValue,
        safeAccent,
        undefined,
        () => {
          setIsPlaying(false);
          elapsedRef.current = totalDurationSeconds;
          setElapsedSeconds(totalDurationSeconds);
          setInternalSentenceIdx(null);
          onSentenceChangeRef.current?.(null);
        },
        safeGender
      );
    }
  };

  const handleCycleSpeed = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSpeedMenuOpen((prev) => !prev);
  };

  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const targetSec = Math.floor(ratio * totalDurationSeconds);
    elapsedRef.current = targetSec;
    setElapsedSeconds(targetSec);

    if (sentences.length > 0) {
      const sentenceIndex = Math.min(
        sentences.length - 1,
        Math.floor((targetSec / totalDurationSeconds) * sentences.length)
      );
      setInternalSentenceIdx(sentenceIndex);
      onSentenceChangeRef.current?.(sentenceIndex);
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div
      id="audio-player-card"
      className={`relative w-full rounded-3xl overflow-visible border border-slate-700/60 bg-[#0B1120] shadow-2xl flex flex-col transition-all select-none ${className}`}
    >
      {/* Top Image Container */}
      <div className="relative w-full aspect-[4/3] rounded-t-3xl bg-slate-900 overflow-hidden flex items-center justify-center">
        <img
          src={imageSrc}
          alt={altText}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-top"
        />

        {/* Top Right Blue Document Button (Transcript toggle) */}
        {onToggleTranscript && (
          <button
            type="button"
            id="player-transcript-toggle-btn"
            onClick={(e) => {
              e.stopPropagation();
              playFeedbackSound('click');
              onToggleTranscript();
            }}
            className={`absolute top-3 right-3 sm:top-4 sm:right-4 w-10 h-10 sm:w-11 sm:h-11 rounded-2xl flex items-center justify-center transition-all cursor-pointer shadow-lg shadow-sky-500/20 active:scale-95 ${
              isTranscriptVisible
                ? 'bg-[#00a2ff] hover:bg-[#0090e3] text-white ring-2 ring-sky-300/40'
                : 'bg-black/60 hover:bg-[#00a2ff] text-white border border-white/20'
            }`}
            title={isTranscriptVisible ? 'Ocultar transcripción' : 'Ver transcripción'}
            aria-label="Ver transcripción"
          >
            <FileText className="w-5 h-5 text-white stroke-[2.2]" />
          </button>
        )}
      </div>

      {/* Bottom Media Controls Bar */}
      <div className="relative px-4 py-3 sm:px-5 sm:py-3.5 bg-[#0e1626] rounded-b-3xl border-t border-slate-800/80 flex flex-col gap-2.5">
        {/* Timeline scrubber */}
        <div
          className="w-full h-1.5 bg-slate-700/60 hover:h-2 rounded-full overflow-hidden cursor-pointer relative transition-all"
          onClick={handleTimelineClick}
          title="Buscar en el audio"
        >
          <div
            className="h-full bg-[#00a2ff] rounded-full transition-all duration-150"
            style={{ width: `${(elapsedSeconds / totalDurationSeconds) * 100}%` }}
          />
        </div>

        {/* Controls row */}
        <div className="flex items-center justify-between text-slate-300 font-mono text-xs">
          {/* Left: Play/Pause button + Speed pill */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <button
              type="button"
              id="player-play-pause-btn"
              onClick={handleTogglePlay}
              className="h-9 w-12 sm:h-10 sm:w-14 rounded-xl bg-[#00a2ff] hover:bg-[#38bdf8] text-slate-950 flex items-center justify-center transition-all cursor-pointer shadow-md shadow-sky-500/25 active:scale-95"
              title={isPlaying ? 'Pausar audio' : 'Reproducir audio'}
              aria-label={isPlaying ? 'Pausar audio' : 'Reproducir audio'}
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 fill-slate-950 text-slate-950" />
              ) : (
                <Play className="w-4 h-4 fill-slate-950 text-slate-950 ml-0.5" />
              )}
            </button>

            {/* Speed Selector with requested speeds */}
            <div className="relative" ref={speedMenuRef}>
              <button
                type="button"
                id="player-speed-btn"
                onClick={handleCycleSpeed}
                className="h-8 px-2.5 rounded-lg bg-slate-800/90 hover:bg-slate-700 border border-slate-700/60 text-slate-200 text-xs font-mono font-bold flex items-center gap-1.5 transition-colors cursor-pointer select-none active:scale-95 shadow-sm"
                title="Elegir velocidad de reproducción"
                aria-label="Elegir velocidad de reproducción"
              >
                <Gauge className="w-3.5 h-3.5 text-[#00a2ff]" />
                <span>{formatSpeedLabel(currentRate)}</span>
                <ChevronUp
                  className={`w-3 h-3 text-slate-400 transition-transform ${
                    isSpeedMenuOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Upward speed dropdown */}
              {isSpeedMenuOpen && (
                <div
                  className="absolute bottom-full mb-2 left-0 w-28 bg-[#131d31] border border-slate-700 rounded-xl shadow-2xl py-1.5 z-50 animate-in fade-in slide-in-from-bottom-2 duration-150 backdrop-blur-md"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="px-2.5 py-1 text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800/80 mb-1">
                    Velocidad
                  </div>
                  {PLAYBACK_SPEEDS.map((sp) => {
                    const isSelected = Math.abs(sp.value - currentRate) < 0.01;
                    return (
                      <button
                        key={sp.value}
                        type="button"
                        onClick={(e) => handleSelectSpeed(sp.value, e)}
                        className={`w-full px-2.5 py-1.5 text-xs font-mono font-medium flex items-center justify-between cursor-pointer transition-colors ${
                          isSelected
                            ? 'bg-[#00a2ff]/20 text-[#00a2ff] font-bold'
                            : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                        }`}
                      >
                        <span>{sp.label}</span>
                        {isSelected && <Check className="w-3 h-3 text-[#00a2ff] stroke-[2.5]" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Right: Volume icon + Time format (00:00 / 00:41) */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <button
              type="button"
              id="player-volume-btn"
              onClick={(e) => {
                e.stopPropagation();
                setIsMuted((prev) => !prev);
              }}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
              title={isMuted ? 'Activar sonido' : 'Silenciar'}
              aria-label="Control de volumen"
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 text-rose-400" />
              ) : (
                <Volume2 className="w-4 h-4 text-slate-300" />
              )}
            </button>

            <span className="text-slate-300 font-mono text-xs sm:text-sm tracking-wider select-none font-medium">
              {formatTime(elapsedSeconds)} / {formatTime(totalDurationSeconds)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
