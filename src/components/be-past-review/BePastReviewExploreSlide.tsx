import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  Volume2,
  Gauge,
  BookOpen,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import {
  policeAlibiImg,
  BE_PAST_REVIEW_REFERENCE_AUDIO,
  BE_PAST_REVIEW_REFERENCE_SENTENCES,
} from '../../data/bePastReviewData';
import { speakEnglish, stopSpeaking, playFeedbackSound } from '../../utils/audio';
import { useTheme } from '../../context/ThemeContext';

interface BePastReviewExploreSlideProps {
  accent?: 'US' | 'UK';
  speechRate?: number;
  onNext?: () => void;
}

const PLAYBACK_SPEEDS = [
  { value: 0.5, label: '0.50x' },
  { value: 0.75, label: '0.75x' },
  { value: 1.0, label: '1x' },
  { value: 1.25, label: '1.25x' },
];

export const BePastReviewExploreSlide: React.FC<BePastReviewExploreSlideProps> = ({
  accent = 'US',
  speechRate = 1.0,
  onNext,
}) => {
  const { isDark } = useTheme();

  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [playingSentenceIdx, setPlayingSentenceIdx] = useState<number | null>(null);
  const [playerSpeed, setPlayerSpeed] = useState<number>(speechRate);
  const [isSpeedMenuOpen, setIsSpeedMenuOpen] = useState<boolean>(false);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const totalDurationSeconds = 10;

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const speedMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (speedMenuRef.current && !speedMenuRef.current.contains(e.target as Node)) {
        setIsSpeedMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isPlayingAudio) {
      timerRef.current = setInterval(() => {
        setElapsedSeconds((prev) => {
          if (prev >= totalDurationSeconds) {
            setIsPlayingAudio(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000 / playerSpeed);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlayingAudio, playerSpeed]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleTogglePlay = () => {
    if (isPlayingAudio) {
      stopSpeaking();
      setIsPlayingAudio(false);
      setPlayingSentenceIdx(null);
      setElapsedSeconds(0);
      return;
    }
    stopSpeaking();
    playFeedbackSound('click');
    setIsPlayingAudio(true);
    setElapsedSeconds(0);
    setPlayingSentenceIdx(null);
    speakEnglish(
      BE_PAST_REVIEW_REFERENCE_AUDIO,
      playerSpeed,
      accent,
      () => setIsPlayingAudio(true),
      () => {
        setIsPlayingAudio(false);
        setElapsedSeconds(0);
      }
    );
  };

  const handlePlaySentence = (sentenceEn: string, idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (playingSentenceIdx === idx) {
      stopSpeaking();
      setPlayingSentenceIdx(null);
      return;
    }
    stopSpeaking();
    playFeedbackSound('click');
    setIsPlayingAudio(false);
    setPlayingSentenceIdx(idx);
    speakEnglish(
      sentenceEn,
      playerSpeed,
      accent,
      () => setPlayingSentenceIdx(idx),
      () => setPlayingSentenceIdx(null)
    );
  };

  const handleFlipCard = () => {
    playFeedbackSound('flip');
    setIsFlipped((prev) => !prev);
  };

  return (
    <div
      className={`w-full max-w-5xl mx-auto rounded-3xl border shadow-xl overflow-hidden transition-all duration-300 ${
        isDark ? 'bg-slate-900 border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'
      }`}
    >
      <div className="flex flex-col lg:flex-row items-stretch">
        {/* LEFT COLUMN: Media Player & Image */}
        <div
          className={`w-full lg:w-[46%] p-5 sm:p-7 flex flex-col gap-5 border-b lg:border-b-0 lg:border-r ${
            isDark ? 'bg-slate-900/80 border-white/10' : 'bg-slate-50/80 border-slate-200'
          }`}
        >
          {/* Badge */}
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-sky-500/15 border border-sky-500/30 text-sky-600 dark:text-sky-400">
              Unit 6 · Actividad 1: Explore
            </span>
            <span className="text-xs font-mono opacity-60">Be-Past: Review</span>
          </div>

          {/* Illustration image */}
          <div className="w-full h-48 sm:h-52 rounded-2xl overflow-hidden border border-inherit/20 relative shadow-sm">
            <img
              src={policeAlibiImg}
              alt="Police interrogation scene"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-3">
              <span className="text-white text-xs font-medium drop-shadow-sm">
                Interrogation Scene · The Police Station Alibi
              </span>
            </div>
          </div>

          {/* Media Player Card (Placed below the image) */}
          <div
            className={`p-4 rounded-2xl border shadow-sm flex flex-col gap-3 transition-colors ${
              isDark ? 'bg-slate-800/90 border-white/10' : 'bg-white border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-semibold uppercase text-sky-600 dark:text-sky-400 flex items-center gap-1.5">
                <Volume2 className="w-4 h-4" />
                Audio Dialogue Player
              </span>
              <span className="text-xs font-mono opacity-60">
                {formatTime(elapsedSeconds)} / {formatTime(totalDurationSeconds)}
              </span>
            </div>

            <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
              <div
                className="bg-sky-500 h-full transition-all duration-300"
                style={{
                  width: `${(elapsedSeconds / totalDurationSeconds) * 100}%`,
                }}
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              <div className="relative" ref={speedMenuRef}>
                <button
                  type="button"
                  onClick={() => setIsSpeedMenuOpen((prev) => !prev)}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono font-medium border border-inherit/20 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                >
                  <Gauge className="w-3.5 h-3.5 text-sky-500" />
                  <span>{playerSpeed}x</span>
                </button>
                {isSpeedMenuOpen && (
                  <div
                    className={`absolute bottom-full left-0 mb-2 py-1.5 rounded-xl border shadow-xl z-30 min-w-[90px] ${
                      isDark ? 'bg-slate-800 border-white/10' : 'bg-white border-slate-200'
                    }`}
                  >
                    {PLAYBACK_SPEEDS.map((sp) => (
                      <button
                        key={sp.value}
                        type="button"
                        onClick={() => {
                          setPlayerSpeed(sp.value);
                          setIsSpeedMenuOpen(false);
                        }}
                        className={`w-full px-3 py-1 text-left text-xs font-mono transition-colors ${
                          playerSpeed === sp.value
                            ? 'bg-sky-500 text-white font-bold'
                            : 'hover:bg-sky-50 dark:hover:bg-slate-700'
                        }`}
                      >
                        {sp.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={handleTogglePlay}
                className="w-10 h-10 rounded-full bg-sky-600 hover:bg-sky-500 text-white flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
                aria-label={isPlayingAudio ? 'Pausar audio' : 'Reproducir audio'}
              >
                {isPlayingAudio ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
              </button>
            </div>
          </div>

          {/* Individual sentence audio buttons */}
          <div className="space-y-2">
            <span className="text-[11px] font-mono uppercase font-bold opacity-60">
              Escucha oración por oración:
            </span>
            <div className="space-y-1.5">
              {BE_PAST_REVIEW_REFERENCE_SENTENCES.map((item, idx) => (
                <div
                  key={idx}
                  onClick={(e) => handlePlaySentence(item.textEn, idx, e)}
                  className={`p-2.5 rounded-xl border text-xs flex items-center justify-between gap-2 cursor-pointer transition-colors ${
                    playingSentenceIdx === idx
                      ? 'bg-sky-500/15 border-sky-500/40 text-sky-600 dark:text-sky-300'
                      : isDark
                      ? 'bg-slate-800/60 border-white/10 hover:bg-slate-800'
                      : 'bg-white border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span className="font-medium line-clamp-1">{item.textEn}</span>
                  <Volume2
                    className={`w-3.5 h-3.5 shrink-0 ${
                      playingSentenceIdx === idx ? 'text-sky-500 animate-pulse' : 'opacity-40'
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: 3D Reversible Flip Card & Grammar Guide */}
        <div className="w-full lg:w-[54%] p-6 sm:p-8 flex flex-col justify-between gap-6">
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between pb-3 border-b border-inherit/15">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                  Step 1: Explore
                </span>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight mt-0.5">
                  Dialogue & Reference Script
                </h3>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-mono bg-sky-500/15 text-sky-600 dark:text-sky-400">
                Gramática Clave
              </span>
            </div>

            {/* Reversible 3D Card with sufficient height to prevent text overflow */}
            <div className="w-full perspective-1000 min-h-[290px] sm:min-h-[300px]">
              <div
                role="button"
                tabIndex={0}
                onClick={handleFlipCard}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleFlipCard();
                  }
                }}
                className={`relative w-full min-h-[290px] sm:min-h-[300px] rounded-3xl border shadow-md transition-transform duration-500 transform-style-3d cursor-pointer select-none ${
                  isDark ? 'bg-slate-800/80 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                } ${isFlipped ? 'rotate-y-180' : ''}`}
                title="Haz clic para voltear entre inglés y español"
              >
                {/* FRONT: English with yellow/cyan highlights */}
                <div className="absolute inset-0 backface-hidden rounded-3xl p-5 sm:p-6 flex flex-col justify-between">
                  <div className="flex items-center justify-between pb-2 border-b border-inherit/20 shrink-0">
                    <span className="text-xs font-mono font-bold uppercase text-sky-600 dark:text-sky-400">
                      English Script
                    </span>
                    <span className="text-[11px] font-mono opacity-60">Clic para traducir al español ↻</span>
                  </div>

                  <div className="space-y-2.5 text-sm sm:text-base font-medium leading-relaxed my-auto py-2">
                    {BE_PAST_REVIEW_REFERENCE_SENTENCES.map((item, idx) => (
                      <p key={idx} className="flex items-baseline gap-2">
                        <span className="opacity-50 select-none">-</span>
                        <span>{renderSentenceHighlights(item.textEn, item.highlights)}</span>
                      </p>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-inherit/20 flex flex-wrap items-center justify-between gap-1 text-[11px] font-mono opacity-70 shrink-0">
                    <span>
                      Resaltados: <strong className="text-yellow-500">were</strong> (plural/you),{' '}
                      <strong className="text-cyan-500">was/wasn't</strong> (singular/I/he/she/it)
                    </span>
                  </div>
                </div>

                {/* BACK: Spanish Translation */}
                <div
                  className={`absolute inset-0 backface-hidden rotate-y-180 rounded-3xl p-5 sm:p-6 flex flex-col justify-between ${
                    isDark ? 'bg-slate-800 text-emerald-200' : 'bg-emerald-50 text-emerald-950'
                  }`}
                >
                  <div className="flex items-center justify-between pb-2 border-b border-inherit/20 shrink-0">
                    <span className="text-xs font-mono font-bold uppercase text-emerald-600 dark:text-emerald-400">
                      Traducción al Español
                    </span>
                    <span className="text-[11px] font-mono opacity-60">Clic para volver al inglés ↻</span>
                  </div>

                  <div className="space-y-2.5 text-sm sm:text-base font-serif italic leading-relaxed my-auto py-2">
                    {BE_PAST_REVIEW_REFERENCE_SENTENCES.map((item, idx) => (
                      <p key={idx} className="flex items-baseline gap-2">
                        <span className="opacity-50 select-none">-</span>
                        <span>{item.textEs}</span>
                      </p>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-inherit/20 flex items-center justify-between text-[11px] font-mono opacity-70 shrink-0">
                    <span>Traducción contextual en español</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Grammar Rule Summary Card */}
            <div
              className={`p-4 rounded-2xl border text-xs sm:text-sm space-y-2 ${
                isDark ? 'bg-slate-800/40 border-white/10' : 'bg-sky-50/60 border-sky-200'
              }`}
            >
              <div className="flex items-center gap-2 font-bold text-sky-600 dark:text-sky-400">
                <BookOpen className="w-4 h-4" />
                <span>Reglas Fundamentales de Be en Pasado:</span>
              </div>
              <ul className="space-y-1 list-disc list-inside opacity-90 leading-relaxed font-sans text-xs">
                <li>
                  <strong className="font-mono">WAS</strong> se utiliza con <em>I, he, she, it</em> y sujetos singulares.
                </li>
                <li>
                  <strong className="font-mono">WERE</strong> se utiliza con <em>you, we, they</em> y sujetos plurales.
                </li>
                <li>
                  <strong className="font-mono">WASN'T / WEREN'T</strong> son las formas negativas contraídas.
                </li>
                <li>
                  En preguntas invertimos el orden: <em className="font-mono">Where were you? / Was he with you?</em>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Action: Proceed to Activity 2 */}
          {onNext && (
            <div className="pt-4 border-t border-inherit/15 flex justify-end">
              <button
                type="button"
                onClick={onNext}
                className="px-6 py-3 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm flex items-center gap-2 shadow-md cursor-pointer active:scale-95 transition-all"
              >
                <span>Comenzar Actividades (Actividad 2)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  function renderSentenceHighlights(
    text: string,
    highlights: { word: string; color: 'yellow' | 'cyan' }[]
  ) {
    if (!highlights || highlights.length === 0) return text;

    const words = highlights.map((h) => h.word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    const regex = new RegExp(`\\b(${words.join('|')})\\b`, 'gi');

    const parts = text.split(regex);
    return parts.map((part, i) => {
      const hl = highlights.find((h) => h.word.toLowerCase() === part.toLowerCase());
      if (hl) {
        if (hl.color === 'yellow') {
          return (
            <span
              key={i}
              className="inline-block bg-yellow-300 dark:bg-yellow-400/30 text-yellow-950 dark:text-yellow-200 px-1 py-0.2 rounded font-bold border border-yellow-400/40"
            >
              {part}
            </span>
          );
        }
        return (
          <span
            key={i}
            className="inline-block bg-cyan-300 dark:bg-cyan-500/30 text-cyan-950 dark:text-cyan-200 px-1 py-0.2 rounded font-bold border border-cyan-400/40"
          >
            {part}
          </span>
        );
      }
      return <span key={i}>{part}</span>;
    });
  }
};
