import React, { useState, useEffect, useRef } from 'react';
import {
  Volume2,
  Play,
  Pause,
  RotateCcw,
  BookOpen,
  ArrowRight,
  Gauge,
  Store,
  Clock,
} from 'lucide-react';
import {
  storeClosedImg,
  WERE_CLOSED_FULL_AUDIO,
  WERE_CLOSED_FULL_ES,
  WERE_CLOSED_DIALOGUE,
} from '../../data/wereClosedData';
import { speakEnglish, stopSpeaking, playFeedbackSound } from '../../utils/audio';
import { useTheme } from '../../context/ThemeContext';

interface WereClosedExploreSlideProps {
  speechRate?: number;
  accent?: 'US' | 'UK';
  onNext?: () => void;
}

const PLAYBACK_SPEEDS = [
  { label: '0.8x', value: 0.8 },
  { label: '1.0x', value: 1.0 },
  { label: '1.2x', value: 1.2 },
];

export const WereClosedExploreSlide: React.FC<WereClosedExploreSlideProps> = ({
  speechRate = 1.0,
  accent = 'US',
  onNext,
}) => {
  const { isDark } = useTheme();
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [playerSpeed, setPlayerSpeed] = useState(speechRate);
  const [isSpeedMenuOpen, setIsSpeedMenuOpen] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [activeLineIdx, setActiveLineIdx] = useState<number | null>(null);

  const speedMenuRef = useRef<HTMLDivElement>(null);
  const totalDurationSeconds = 13; // 00:13 as shown in screenshot

  // Click outside speed selector
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (speedMenuRef.current && !speedMenuRef.current.contains(e.target as Node)) {
        setIsSpeedMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Timer simulation for playback bar
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlayingAudio) {
      interval = setInterval(() => {
        setElapsedSeconds((prev) => {
          if (prev >= totalDurationSeconds) {
            setIsPlayingAudio(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000 / playerSpeed);
    }
    return () => clearInterval(interval);
  }, [isPlayingAudio, playerSpeed]);

  const handleTogglePlay = () => {
    if (isPlayingAudio) {
      stopSpeaking();
      setIsPlayingAudio(false);
      return;
    }

    playFeedbackSound('click');
    setElapsedSeconds(0);
    setActiveLineIdx(null);
    speakEnglish(
      WERE_CLOSED_FULL_AUDIO,
      playerSpeed,
      accent,
      () => setIsPlayingAudio(true),
      () => {
        setIsPlayingAudio(false);
        setElapsedSeconds(totalDurationSeconds);
      }
    );
  };

  const handlePlayLine = (text: string, idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    stopSpeaking();
    setIsPlayingAudio(false);
    playFeedbackSound('click');
    setActiveLineIdx(idx);
    speakEnglish(
      text,
      playerSpeed,
      accent,
      () => {},
      () => setActiveLineIdx(null)
    );
  };

  const handleFlipCard = () => {
    playFeedbackSound('flip');
    setIsFlipped((prev) => !prev);
  };

  const handleResetActivity = () => {
    playFeedbackSound('click');
    stopSpeaking();
    setIsPlayingAudio(false);
    setElapsedSeconds(0);
    setIsFlipped(false);
    setActiveLineIdx(null);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div
      className={`w-full max-w-5xl mx-auto rounded-3xl border shadow-xl overflow-hidden transition-all duration-300 ${
        isDark ? 'bg-slate-900 border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'
      }`}
    >
      <div className="flex flex-col lg:flex-row items-stretch">
        {/* LEFT COLUMN: Image + Audio Player below image + Audio sentences */}
        <div
          className={`w-full lg:w-[46%] p-5 sm:p-7 flex flex-col gap-5 border-b lg:border-b-0 lg:border-r ${
            isDark ? 'bg-slate-900/80 border-white/10' : 'bg-slate-50/80 border-slate-200'
          }`}
        >
          {/* Header Badge */}
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-sky-500/15 border border-sky-500/30 text-sky-600 dark:text-sky-400">
              Unit 6 · Actividad 1: Explore
            </span>
            <span className="text-xs font-mono opacity-60">We're Closed: Review</span>
          </div>

          {/* Illustration image (Matching screenshot actividad 1.png) */}
          <div className="w-full h-44 sm:h-48 rounded-2xl overflow-hidden border border-inherit/20 relative shadow-sm">
            <img
              src={storeClosedImg}
              alt="Two men inside the store with Sorry We Are Closed sign"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent flex items-end p-3">
              <span className="text-white text-xs font-medium drop-shadow-sm flex items-center gap-1.5">
                <Store className="w-3.5 h-3.5 text-amber-400" />
                Storefront · Sorry We Are Closed
              </span>
            </div>
          </div>

          {/* Media Player Card (Placed below the image, duration 00:13) */}
          <div
            className={`p-4 rounded-2xl border shadow-sm flex flex-col gap-3 transition-colors ${
              isDark ? 'bg-slate-800/90 border-white/10' : 'bg-white border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-semibold uppercase text-sky-600 dark:text-sky-400 flex items-center gap-1.5">
                <Volume2 className="w-4 h-4" />
                Audio Conversation (00:13)
              </span>
              <span className="text-xs font-mono opacity-60">
                {formatTime(elapsedSeconds)} / {formatTime(totalDurationSeconds)}
              </span>
            </div>

            {/* Timeline Bar */}
            <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
              <div
                className="bg-sky-500 h-full transition-all duration-300"
                style={{
                  width: `${(elapsedSeconds / totalDurationSeconds) * 100}%`,
                }}
              />
            </div>

            {/* Controls */}
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
              Escucha línea por línea:
            </span>
            <div className="space-y-1.5 max-h-[180px] overflow-y-auto pr-1">
              {WERE_CLOSED_DIALOGUE.map((item, idx) => (
                <div
                  key={item.id}
                  onClick={(e) => handlePlayLine(item.textEn, idx, e)}
                  className={`p-2.5 rounded-xl border text-xs flex items-center justify-between gap-2 cursor-pointer transition-colors ${
                    activeLineIdx === idx
                      ? 'bg-sky-500/15 border-sky-500/40 text-sky-600 dark:text-sky-300'
                      : isDark
                      ? 'bg-slate-800/60 border-white/10 hover:bg-slate-800'
                      : 'bg-white border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2 overflow-hidden">
                    <span
                      className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded shrink-0 ${
                        item.speaker === 'Clerk'
                          ? 'bg-sky-500/20 text-sky-600 dark:text-sky-400'
                          : 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                      }`}
                    >
                      {item.speaker}
                    </span>
                    <span className="font-medium truncate">{item.textEn}</span>
                  </div>
                  <Volume2
                    className={`w-3.5 h-3.5 shrink-0 ${
                      activeLineIdx === idx ? 'text-sky-500 animate-pulse' : 'opacity-40'
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Reversible Dialogue Card + Vocabulary Helper */}
        <div className="w-full lg:w-[54%] p-6 sm:p-8 flex flex-col justify-between gap-6">
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between pb-3 border-b border-inherit/15">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                  Step 1: Explore
                </span>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight mt-0.5">
                  Dialogue: We're Closed
                </h3>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-mono bg-sky-500/15 text-sky-600 dark:text-sky-400">
                Conversación en Tienda
              </span>
            </div>

            {/* Reversible 3D Card with CSS Grid Auto-Height - No clipping */}
            <div className="w-full perspective-1000">
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
                className={`grid grid-cols-1 grid-rows-1 w-full transition-transform duration-500 transform-style-3d cursor-pointer select-none rounded-3xl border shadow-md ${
                  isDark
                    ? 'bg-slate-900 border-white/10 text-[#f2e9dc]'
                    : 'bg-[#fbf7ee] border-[#dfd6c5] text-[#3e3428]'
                } ${isFlipped ? 'rotate-y-180' : ''}`}
                title="Haz clic para voltear entre inglés y castellano"
              >
                {/* FRONT: English Transcript matching screenshot actividad 1.png */}
                <div
                  className={`col-start-1 row-start-1 w-full rounded-3xl p-5 sm:p-6 flex flex-col justify-between backface-hidden relative ${
                    isFlipped ? 'invisible pointer-events-none' : ''
                  }`}
                >
                  <div className="absolute top-3 left-3 w-4 h-4 rounded-full bg-amber-400 border border-amber-600 shadow-sm flex items-center justify-center opacity-85 pointer-events-none">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-700" />
                  </div>
                  <div className="absolute top-3 right-3 w-4 h-4 rounded-full bg-amber-400 border border-amber-600 shadow-sm flex items-center justify-center opacity-85 pointer-events-none">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-700" />
                  </div>

                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-inherit/20 shrink-0 px-3">
                    <span className="text-xs font-mono font-bold uppercase text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
                      <Store className="w-3.5 h-3.5" />
                      Transcript · English
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFlipCard();
                      }}
                      className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-amber-500/15 border border-amber-500/30 text-amber-700 dark:text-amber-400 hover:bg-amber-500/25 flex items-center gap-1.5 transition-all cursor-pointer"
                      title="Ver traducción al castellano"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Castellano</span>
                    </button>
                  </div>

                  <div className="space-y-2.5 px-2 py-1 text-sm sm:text-base leading-relaxed">
                    <p className="font-semibold text-sky-700 dark:text-sky-300">
                      - Sorry, sir. We're closed.
                    </p>
                    <p className="opacity-90">
                      - Closed? But it's only one o'clock.
                    </p>
                    <p className="font-semibold text-sky-700 dark:text-sky-300">
                      - That's right. We usually close for lunch.
                    </p>
                    <p className="opacity-90">
                      - Oh. What are your hours?
                    </p>
                    <p className="font-semibold text-sky-700 dark:text-sky-300">
                      - Nine to one, and two-thirty to six.
                    </p>
                    <p className="opacity-90">
                      - I see. Well, thanks.
                    </p>
                  </div>

                  <div className="pt-2 mt-2 border-t border-inherit/20 flex items-center justify-between text-[10px] font-mono opacity-60 px-3">
                    <span>Diálogo de atención en tienda</span>
                    <span>Clic para traducir ↻</span>
                  </div>
                </div>

                {/* BACK: Spanish translation */}
                <div
                  className={`col-start-1 row-start-1 w-full rounded-3xl p-5 sm:p-6 flex flex-col justify-between backface-hidden rotate-y-180 relative ${
                    !isFlipped ? 'invisible pointer-events-none' : ''
                  }`}
                >
                  <div className="absolute top-3 left-3 w-4 h-4 rounded-full bg-emerald-400 border border-emerald-600 shadow-sm flex items-center justify-center opacity-85 pointer-events-none">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-700" />
                  </div>
                  <div className="absolute top-3 right-3 w-4 h-4 rounded-full bg-emerald-400 border border-emerald-600 shadow-sm flex items-center justify-center opacity-85 pointer-events-none">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-700" />
                  </div>

                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-inherit/20 shrink-0 px-3">
                    <span className="text-xs font-mono font-bold uppercase text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                      <Store className="w-3.5 h-3.5" />
                      Traducción al Castellano
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFlipCard();
                      }}
                      className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/25 flex items-center gap-1.5 transition-all cursor-pointer"
                      title="Volver al diálogo en inglés"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Inglés</span>
                    </button>
                  </div>

                  <div className="space-y-2.5 px-2 py-1 text-sm sm:text-base leading-relaxed font-serif">
                    <p className="font-semibold text-emerald-700 dark:text-emerald-300 not-italic">
                      - Lo siento, señor. Estamos cerrados.
                    </p>
                    <p className="opacity-90">
                      - ¿Cerrados? Pero si es solo la una en punto.
                    </p>
                    <p className="font-semibold text-emerald-700 dark:text-emerald-300 not-italic">
                      - Así es. Usualmente cerramos para almorzar.
                    </p>
                    <p className="opacity-90">
                      - Oh. ¿Cuál es su horario?
                    </p>
                    <p className="font-semibold text-emerald-700 dark:text-emerald-300 not-italic">
                      - De nueve a una, y de dos y media a seis.
                    </p>
                    <p className="opacity-90">
                      - Ya veo. Bueno, gracias.
                    </p>
                  </div>

                  <div className="pt-2 mt-2 border-t border-inherit/20 flex items-center justify-between text-[10px] font-mono opacity-60 px-3">
                    <span>Traducción contextual en castellano</span>
                    <span>Castellano</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Vocabulary & Expressions Helper Card */}
            <div
              className={`p-4 rounded-2xl border text-xs sm:text-sm space-y-2 ${
                isDark ? 'bg-slate-800/40 border-white/10' : 'bg-sky-50/60 border-sky-200'
              }`}
            >
              <div className="flex items-center gap-2 font-bold text-sky-600 dark:text-sky-400">
                <BookOpen className="w-4 h-4" />
                <span>Vocabulario Clave del Diálogo:</span>
              </div>
              <ul className="space-y-1 list-disc list-inside text-xs opacity-90 leading-relaxed font-mono">
                <li>
                  <strong>We're closed:</strong> Estamos cerrados (<em>horario no disponible</em>)
                </li>
                <li>
                  <strong>Only one o'clock:</strong> Apenas la una en punto (<em>one o'clock = 1:00 p.m.</em>)
                </li>
                <li>
                  <strong>Close for lunch:</strong> Cerrar para el almuerzo
                </li>
                <li>
                  <strong>What are your hours?:</strong> ¿Cuál es su horario de atención?
                </li>
                <li>
                  <strong>Nine to one, and two-thirty to six:</strong> De 9:00 a 1:00 y de 2:30 a 6:00
                </li>
              </ul>
            </div>
          </div>

          {/* Action buttons: Reintentar Actividad / Comenzar Interacciones */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-inherit/15">
            <button
              type="button"
              onClick={handleResetActivity}
              className="px-4 py-2.5 rounded-xl border border-inherit/20 text-xs sm:text-sm font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer flex items-center gap-1.5 active:scale-95"
              title="Reiniciar esta actividad"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reintentar Actividad</span>
            </button>

            {onNext && (
              <button
                type="button"
                onClick={() => {
                  playFeedbackSound('click');
                  onNext();
                }}
                className="px-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-sky-500/25 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
              >
                <span>Comenzar Interacciones</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
