import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  RotateCcw,
  Gauge,
  CheckCircle2,
} from 'lucide-react';
import { DialogueExploreExercise as DialogueExploreExerciseType } from '../types';
import { speakEnglish, stopSpeaking, playFeedbackSound } from '../utils/audio';
import { useTheme } from '../context/ThemeContext';
import { PLAYBACK_SPEEDS, formatSpeedLabel } from './AudioPlayerCard';

interface DialogueExploreExerciseProps {
  exercise: DialogueExploreExerciseType;
  accent?: 'US' | 'UK';
  speechRate?: number;
  onSuccess?: () => void;
}

export const DialogueExploreExercise: React.FC<DialogueExploreExerciseProps> = ({
  exercise,
  accent = 'US',
  speechRate = 1.0,
  onSuccess,
}) => {
  const { isDark } = useTheme();
  const safeAccent: 'US' | 'UK' = accent === 'UK' ? 'UK' : 'US';

  const durationSeconds = exercise.durationSeconds || 18;
  const sentences = exercise.sentences || [];

  // 3D Reversible Card state (strictly no flip buttons, no flip hint text, no gradients)
  const [isFlipped, setIsFlipped] = useState(false);

  // Media Player State
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentPlaybackRate, setCurrentPlaybackRate] = useState<number>(speechRate);
  const [isSpeedMenuOpen, setIsSpeedMenuOpen] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [currentSentenceIdx, setCurrentSentenceIdx] = useState<number | null>(null);

  // Card Audio State
  const [isSpeakingCard, setIsSpeakingCard] = useState(false);
  const [cardSpeed, setCardSpeed] = useState<number>(speechRate);
  const [isCardSpeedOpen, setIsCardSpeedOpen] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const speedMenuRef = useRef<HTMLDivElement>(null);
  const cardSpeedMenuRef = useRef<HTMLDivElement>(null);

  // Close menus on outside click
  useEffect(() => {
    const handleDocClick = (e: MouseEvent) => {
      if (speedMenuRef.current && !speedMenuRef.current.contains(e.target as Node)) {
        setIsSpeedMenuOpen(false);
      }
      if (cardSpeedMenuRef.current && !cardSpeedMenuRef.current.contains(e.target as Node)) {
        setIsCardSpeedOpen(false);
      }
    };
    document.addEventListener('mousedown', handleDocClick);
    return () => document.removeEventListener('mousedown', handleDocClick);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      stopSpeaking();
    };
  }, []);

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleTogglePlayMedia = () => {
    if (isPlaying) {
      stopSpeaking();
      setIsPlaying(false);
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    stopSpeaking();
    setIsPlaying(true);
    setIsSpeakingCard(false);

    // Audio text
    const fullText = exercise.audioText || sentences.map((s) => s.en).join(' ');

    speakEnglish(
      fullText,
      currentPlaybackRate,
      safeAccent,
      () => {
        setIsPlaying(true);
        if (timerRef.current) clearInterval(timerRef.current);
        const intervalTime = (durationSeconds * 1000) / (durationSeconds * 10 * currentPlaybackRate);
        timerRef.current = setInterval(() => {
          setElapsedSeconds((prev) => {
            if (prev >= durationSeconds) {
              if (timerRef.current) clearInterval(timerRef.current);
              setIsPlaying(false);
              setCurrentSentenceIdx(null);
              if (onSuccess) onSuccess();
              return durationSeconds;
            }
            const nextSec = prev + 0.5;
            // Map time to sentence
            const ratio = nextSec / durationSeconds;
            const targetIdx = Math.min(sentences.length - 1, Math.floor(ratio * sentences.length));
            setCurrentSentenceIdx(targetIdx);
            return nextSec;
          });
        }, 500);
      },
      () => {
        setIsPlaying(false);
        setElapsedSeconds(0);
        setCurrentSentenceIdx(null);
        if (timerRef.current) clearInterval(timerRef.current);
        if (onSuccess) onSuccess();
      },
      exercise.speakerGender || 'male'
    );
  };

  const handleSpeakCard = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSpeakingCard) {
      stopSpeaking();
      setIsSpeakingCard(false);
      return;
    }

    stopSpeaking();
    setIsPlaying(false);
    if (timerRef.current) clearInterval(timerRef.current);
    setIsSpeakingCard(true);

    const textToSpeak = isFlipped
      ? sentences.map((s) => s.es).join('. ')
      : sentences.map((s) => s.en).join(' ');

    speakEnglish(
      textToSpeak,
      cardSpeed,
      safeAccent,
      () => setIsSpeakingCard(true),
      () => setIsSpeakingCard(false),
      exercise.speakerGender || 'male'
    );
  };

  const handleFlipCard = () => {
    playFeedbackSound('flip');
    setIsFlipped((prev) => !prev);
  };

  return (
    <div className="w-full flex flex-col items-center gap-6 animate-in fade-in duration-200 py-2 select-none">
      <div className="w-full flex flex-col lg:flex-row gap-6 items-stretch justify-center">
        {/* Left: Media Player Card */}
        <div className="w-full max-w-[340px] sm:max-w-[380px] mx-auto lg:mx-0 shrink-0 flex flex-col">
          <div
            className={`w-full rounded-2xl border overflow-hidden shadow-md flex flex-col ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}
          >
            {/* Image display */}
            <div className="relative aspect-4/3 w-full bg-slate-950 overflow-hidden">
              <img
                src={exercise.imageUrl}
                alt="Piece of Cake dialogue"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Media controls bar */}
            <div
              className={`p-4 flex flex-col gap-3 border-t ${
                isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                {/* Play / Pause button */}
                <button
                  type="button"
                  onClick={handleTogglePlayMedia}
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-sky-500 hover:bg-sky-600 text-white shadow-sm transition-all transform active:scale-95 cursor-pointer"
                  title={isPlaying ? 'Pausar' : 'Reproducir audio'}
                >
                  {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
                </button>

                {/* Progress bar */}
                <div className="flex-1 flex flex-col gap-1">
                  <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-sky-500 h-full transition-all duration-200"
                      style={{ width: `${Math.min(100, (elapsedSeconds / durationSeconds) * 100)}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs font-mono text-slate-500 dark:text-slate-400">
                    <span>{formatTime(elapsedSeconds)}</span>
                    <span>{formatTime(durationSeconds)}</span>
                  </div>
                </div>

                {/* Speed selector menu */}
                <div className="relative" ref={speedMenuRef}>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsSpeedMenuOpen(!isSpeedMenuOpen);
                    }}
                    className={`px-2 py-1 rounded-lg border text-xs font-medium flex items-center gap-1 cursor-pointer transition-colors ${
                      isDark
                        ? 'border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700'
                        : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100'
                    }`}
                    title="Velocidad de reproducción"
                  >
                    <Gauge className="w-3.5 h-3.5 text-sky-500" />
                    <span>{formatSpeedLabel(currentPlaybackRate)}</span>
                  </button>

                  {isSpeedMenuOpen && (
                    <div
                      className={`absolute right-0 bottom-full mb-2 w-28 rounded-xl shadow-xl border py-1.5 z-50 animate-in fade-in zoom-in-95 ${
                        isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
                      }`}
                    >
                      <div className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 text-slate-400">
                        Velocidad
                      </div>
                      {PLAYBACK_SPEEDS.map((sp) => (
                        <button
                          key={sp.value}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentPlaybackRate(sp.value);
                            setIsSpeedMenuOpen(false);
                            if (isPlaying) {
                              stopSpeaking();
                              handleTogglePlayMedia();
                            }
                          }}
                          className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between transition-colors ${
                            Math.abs(currentPlaybackRate - sp.value) < 0.01
                              ? 'bg-sky-50 dark:bg-sky-950/50 text-sky-600 dark:text-sky-400 font-bold'
                              : isDark
                              ? 'text-slate-300 hover:bg-slate-700'
                              : 'text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          <span>{sp.label}</span>
                          {Math.abs(currentPlaybackRate - sp.value) < 0.01 && (
                            <CheckCircle2 className="w-3 h-3 text-sky-500" />
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Mute button */}
                <button
                  type="button"
                  onClick={() => {
                    setIsMuted(!isMuted);
                    if (!isMuted) stopSpeaking();
                  }}
                  className={`p-2 rounded-lg transition-colors cursor-pointer ${
                    isMuted
                      ? 'text-red-500 bg-red-50 dark:bg-red-950/30'
                      : isDark
                      ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                  title={isMuted ? 'Silenciado' : 'Silenciar'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Reversible Card (Pure solid background, NO gradients, NO flip buttons, NO flip text) */}
        <div className="w-full flex-1 perspective-1000 min-h-[460px] flex flex-col">
          <div
            id="piece-of-cake-dialogue-card"
            onClick={handleFlipCard}
            className={`relative w-full h-full min-h-[460px] rounded-2xl cursor-pointer shadow-md transition-transform duration-500 transform-style-3d select-none ${
              isFlipped ? 'rotate-y-180' : ''
            }`}
          >
            {/* FRONT / ANVERSO: English Dialogue Lines */}
            <div
              className={`absolute inset-0 w-full h-full rounded-2xl p-6 sm:p-8 flex flex-col justify-between border backface-hidden transition-colors duration-200 overflow-hidden ${
                isDark ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
              }`}
            >
              {/* Dialogue Header with Card Audio Control & 6 Speeds */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
                <span className="text-xs uppercase tracking-wider font-bold text-sky-600 dark:text-sky-400">
                  Dialogue
                </span>

                <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                  {/* Card Audio Button */}
                  <button
                    type="button"
                    onClick={handleSpeakCard}
                    className={`p-2 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                      isSpeakingCard
                        ? 'bg-sky-500 text-white animate-pulse'
                        : isDark
                        ? 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900'
                    }`}
                    title="Escuchar diálogo"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>

                  {/* Card Speed Menu */}
                  <div className="relative" ref={cardSpeedMenuRef}>
                    <button
                      type="button"
                      onClick={() => setIsCardSpeedOpen(!isCardSpeedOpen)}
                      className={`px-2 py-1 rounded-lg border text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors ${
                        isDark
                          ? 'border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700'
                          : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100'
                      }`}
                      title="Velocidad de lectura de la tarjeta"
                    >
                      <Gauge className="w-3.5 h-3.5 text-sky-500" />
                      <span>{formatSpeedLabel(cardSpeed)}</span>
                    </button>

                    {isCardSpeedOpen && (
                      <div
                        className={`absolute right-0 top-full mt-1 w-28 rounded-xl shadow-xl border py-1.5 z-50 animate-in fade-in zoom-in-95 ${
                          isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
                        }`}
                      >
                        <div className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 text-slate-400">
                          Velocidad
                        </div>
                        {PLAYBACK_SPEEDS.map((sp) => (
                          <button
                            key={sp.value}
                            type="button"
                            onClick={() => {
                              setCardSpeed(sp.value);
                              setIsCardSpeedOpen(false);
                              if (isSpeakingCard) {
                                stopSpeaking();
                                setIsSpeakingCard(false);
                              }
                            }}
                            className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between transition-colors ${
                              Math.abs(cardSpeed - sp.value) < 0.01
                                ? 'bg-sky-50 dark:bg-sky-950/50 text-sky-600 dark:text-sky-400 font-bold'
                                : isDark
                                ? 'text-slate-300 hover:bg-slate-700'
                                : 'text-slate-700 hover:bg-slate-100'
                            }`}
                          >
                            <span>{sp.label}</span>
                            {Math.abs(cardSpeed - sp.value) < 0.01 && (
                              <CheckCircle2 className="w-3 h-3 text-sky-500" />
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Dialogue Lines */}
              <div className="flex-1 py-6 flex flex-col justify-center gap-4 overflow-y-auto">
                {sentences.map((sent, idx) => {
                  const isCurrent = currentSentenceIdx === idx;
                  return (
                    <div
                      key={idx}
                      className={`text-base sm:text-lg md:text-xl leading-relaxed transition-all duration-200 px-3 py-2 rounded-xl ${
                        isCurrent
                          ? 'bg-amber-300 dark:bg-amber-400 text-slate-950 font-bold shadow-sm'
                          : isDark
                          ? 'text-slate-100 hover:bg-slate-800/60'
                          : 'text-slate-800 hover:bg-slate-50'
                      }`}
                    >
                      {sent.en}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* BACK / REVERSO: Spanish Translation Lines (Solid background, NO gradients, NO indicators) */}
            <div
              className={`absolute inset-0 w-full h-full rounded-2xl p-6 sm:p-8 flex flex-col justify-between border backface-hidden rotate-y-180 transition-colors duration-200 overflow-hidden ${
                isDark ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
              }`}
            >
              {/* Dialogue Header in Spanish */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
                <span className="text-xs uppercase tracking-wider font-bold text-sky-600 dark:text-sky-400">
                  Traducción
                </span>

                <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                  {/* Card Audio Button */}
                  <button
                    type="button"
                    onClick={handleSpeakCard}
                    className={`p-2 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                      isSpeakingCard
                        ? 'bg-sky-500 text-white animate-pulse'
                        : isDark
                        ? 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900'
                    }`}
                    title="Escuchar lectura"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>

                  {/* Card Speed Menu */}
                  <div className="relative" ref={cardSpeedMenuRef}>
                    <button
                      type="button"
                      onClick={() => setIsCardSpeedOpen(!isCardSpeedOpen)}
                      className={`px-2 py-1 rounded-lg border text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors ${
                        isDark
                          ? 'border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700'
                          : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100'
                      }`}
                      title="Velocidad de lectura de la tarjeta"
                    >
                      <Gauge className="w-3.5 h-3.5 text-sky-500" />
                      <span>{formatSpeedLabel(cardSpeed)}</span>
                    </button>

                    {isCardSpeedOpen && (
                      <div
                        className={`absolute right-0 top-full mt-1 w-28 rounded-xl shadow-xl border py-1.5 z-50 animate-in fade-in zoom-in-95 ${
                          isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
                        }`}
                      >
                        <div className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 text-slate-400">
                          Velocidad
                        </div>
                        {PLAYBACK_SPEEDS.map((sp) => (
                          <button
                            key={sp.value}
                            type="button"
                            onClick={() => {
                              setCardSpeed(sp.value);
                              setIsCardSpeedOpen(false);
                              if (isSpeakingCard) {
                                stopSpeaking();
                                setIsSpeakingCard(false);
                              }
                            }}
                            className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between transition-colors ${
                              Math.abs(cardSpeed - sp.value) < 0.01
                                ? 'bg-sky-50 dark:bg-sky-950/50 text-sky-600 dark:text-sky-400 font-bold'
                                : isDark
                                ? 'text-slate-300 hover:bg-slate-700'
                                : 'text-slate-700 hover:bg-slate-100'
                            }`}
                          >
                            <span>{sp.label}</span>
                            {Math.abs(cardSpeed - sp.value) < 0.01 && (
                              <CheckCircle2 className="w-3 h-3 text-sky-500" />
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Spanish Translation Lines */}
              <div className="flex-1 py-6 flex flex-col justify-center gap-4 overflow-y-auto">
                {sentences.map((sent, idx) => (
                  <div
                    key={idx}
                    className={`text-base sm:text-lg md:text-xl leading-relaxed px-3 py-2 rounded-xl font-serif italic ${
                      isDark ? 'text-slate-200' : 'text-slate-800'
                    }`}
                  >
                    {sent.es}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
