import React, { useState, useEffect, useRef } from 'react';
import {
  Volume2,
  Play,
  Pause,
  RotateCcw,
  BookOpen,
  ArrowRight,
  Gauge,
  PhoneCall,
} from 'lucide-react';
import {
  ellenImg,
  ELLEN_MESSAGE_FULL_AUDIO,
  ELLEN_MESSAGE_FULL_ES,
  ELLEN_MESSAGE_SENTENCES,
} from '../../data/familyReviewData';
import { speakEnglish, stopSpeaking, playFeedbackSound } from '../../utils/audio';
import { useTheme } from '../../context/ThemeContext';

interface FamilyExploreSlideProps {
  speechRate?: number;
  accent?: 'US' | 'UK';
  onNext?: () => void;
}

const PLAYBACK_SPEEDS = [
  { label: '0.8x', value: 0.8 },
  { label: '1.0x', value: 1.0 },
  { label: '1.2x', value: 1.2 },
];

export const FamilyExploreSlide: React.FC<FamilyExploreSlideProps> = ({
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
  const [playingSentenceIdx, setPlayingSentenceIdx] = useState<number | null>(null);

  const speedMenuRef = useRef<HTMLDivElement>(null);
  const totalDurationSeconds = 31; // As seen in screenshot 00:31

  // Handle click outside speed menu
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
    setPlayingSentenceIdx(null);
    speakEnglish(
      ELLEN_MESSAGE_FULL_AUDIO,
      playerSpeed,
      accent,
      () => setIsPlayingAudio(true),
      () => {
        setIsPlayingAudio(false);
        setElapsedSeconds(totalDurationSeconds);
      }
    );
  };

  const handlePlaySentence = (text: string, idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    stopSpeaking();
    setIsPlayingAudio(false);
    playFeedbackSound('click');
    setPlayingSentenceIdx(idx);
    speakEnglish(
      text,
      playerSpeed,
      accent,
      () => {},
      () => setPlayingSentenceIdx(null)
    );
  };

  const handleFlipCard = () => {
    playFeedbackSound('flip');
    setIsFlipped((prev) => !prev);
  };

  // Reintentar Actividad / Reset
  const handleResetActivity = () => {
    playFeedbackSound('click');
    stopSpeaking();
    setIsPlayingAudio(false);
    setElapsedSeconds(0);
    setIsFlipped(false);
    setPlayingSentenceIdx(null);
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
            <span className="text-xs font-mono opacity-60">Family: Review</span>
          </div>

          {/* Illustration image */}
          <div className="w-full h-44 sm:h-48 rounded-2xl overflow-hidden border border-inherit/20 relative shadow-sm">
            <img
              src={ellenImg}
              alt="Ellen calling her dad from the car"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent flex items-end p-3">
              <span className="text-white text-xs font-medium drop-shadow-sm flex items-center gap-1.5">
                <PhoneCall className="w-3.5 h-3.5 text-sky-400" />
                Ellen's Voicemail · On the Way to Airport
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
                Audio Message · Ellen to Dad
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
              {ELLEN_MESSAGE_SENTENCES.map((item, idx) => (
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

        {/* RIGHT COLUMN: Reversible Voicemail Card + Vocabulary Helper */}
        <div className="w-full lg:w-[54%] p-6 sm:p-8 flex flex-col justify-between gap-6">
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between pb-3 border-b border-inherit/15">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                  Step 1: Explore
                </span>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight mt-0.5">
                  Ellen's Voicemail Message
                </h3>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-mono bg-sky-500/15 text-sky-600 dark:text-sky-400">
                Audio & Mensaje
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
                    : 'bg-[#f4efe4] border-[#d8cdb8] text-[#3e3428]'
                } ${isFlipped ? 'rotate-y-180' : ''}`}
                title="Haz clic para voltear entre inglés y castellano"
              >
                {/* FRONT: English Voicemail */}
                <div
                  className={`col-start-1 row-start-1 w-full rounded-3xl p-5 sm:p-6 flex flex-col justify-between backface-hidden relative ${
                    isFlipped ? 'invisible pointer-events-none' : ''
                  }`}
                >
                  <div className="absolute top-3 left-3 w-4 h-4 rounded-full bg-slate-400 border border-slate-600 shadow-sm flex items-center justify-center opacity-80 pointer-events-none">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                  </div>
                  <div className="absolute top-3 right-3 w-4 h-4 rounded-full bg-slate-400 border border-slate-600 shadow-sm flex items-center justify-center opacity-80 pointer-events-none">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                  </div>

                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-inherit/20 shrink-0 px-3">
                    <span className="text-xs font-mono font-bold uppercase text-sky-600 dark:text-sky-400 flex items-center gap-1.5">
                      <PhoneCall className="w-3.5 h-3.5" />
                      Voicemail Transcript · English
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFlipCard();
                      }}
                      className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-sky-500/15 border border-sky-500/30 text-sky-600 dark:text-sky-400 hover:bg-sky-500/25 flex items-center gap-1.5 transition-all cursor-pointer"
                      title="Ver traducción al castellano"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Castellano</span>
                    </button>
                  </div>

                  <div className="space-y-3 px-2 py-1 text-sm sm:text-base leading-relaxed">
                    <p className="font-bold text-sky-700 dark:text-sky-300 text-base sm:text-lg">
                      "Hi, Dad! It's Ellen."
                    </p>
                    <p className="opacity-90">
                      I called last night, but I didn't get an answer. Where were you?
                    </p>
                    <p className="opacity-90">
                      <strong>Aunt Minnie and Uncle Joe</strong> are taking me to the <strong>airport</strong> now.
                    </p>
                    <p className="opacity-90">
                      The plane leaves at <strong>3:00 p.m.</strong> I arrive at <strong>5:00 p.m.</strong> Please be there.
                    </p>
                    <p className="opacity-90">
                      They gave me <strong>lots of presents</strong> for everyone and I need help with my <strong>luggage</strong>. See you soon!
                    </p>
                  </div>

                  <div className="pt-2 mt-2 border-t border-inherit/20 flex items-center justify-between text-[10px] font-mono opacity-60 px-3">
                    <span>Mensaje telefónico de Ellen</span>
                    <span>Clic para traducir ↻</span>
                  </div>
                </div>

                {/* BACK: Spanish translation */}
                <div
                  className={`col-start-1 row-start-1 w-full rounded-3xl p-5 sm:p-6 flex flex-col justify-between backface-hidden rotate-y-180 relative ${
                    !isFlipped ? 'invisible pointer-events-none' : ''
                  }`}
                >
                  <div className="absolute top-3 left-3 w-4 h-4 rounded-full bg-emerald-400 border border-emerald-600 shadow-sm flex items-center justify-center opacity-80 pointer-events-none">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-700" />
                  </div>
                  <div className="absolute top-3 right-3 w-4 h-4 rounded-full bg-emerald-400 border border-emerald-600 shadow-sm flex items-center justify-center opacity-80 pointer-events-none">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-700" />
                  </div>

                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-inherit/20 shrink-0 px-3">
                    <span className="text-xs font-mono font-bold uppercase text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                      <PhoneCall className="w-3.5 h-3.5" />
                      Traducción al Castellano
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFlipCard();
                      }}
                      className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/25 flex items-center gap-1.5 transition-all cursor-pointer"
                      title="Volver al mensaje en inglés"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Inglés</span>
                    </button>
                  </div>

                  <div className="space-y-3 px-2 py-1 text-sm sm:text-base leading-relaxed font-serif">
                    <p className="font-bold text-emerald-700 dark:text-emerald-300 text-base sm:text-lg not-italic">
                      "¡Hola, papá! Soy Ellen."
                    </p>
                    <p className="opacity-90">
                      Llamé anoche, pero no obtuve respuesta. ¿Dónde estabas?
                    </p>
                    <p className="opacity-90">
                      <strong>La tía Minnie y el tío Joe</strong> me están llevando al <strong>aeropuerto</strong> ahora.
                    </p>
                    <p className="opacity-90">
                      El avión sale a las <strong>3:00 p.m.</strong> Llego a las <strong>5:00 p.m.</strong> Por favor, está allí.
                    </p>
                    <p className="opacity-90">
                      Me dieron <strong>muchos regalos</strong> para todos y necesito ayuda con mi <strong>equipaje</strong>. ¡Nos vemos pronto!
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
                <span>Vocabulario Clave del Mensaje:</span>
              </div>
              <ul className="space-y-1 list-disc list-inside text-xs opacity-90 leading-relaxed font-mono">
                <li>
                  <strong>Aunt Minnie & Uncle Joe:</strong> Tía Minnie y Tío Joe (<em>family members</em>)
                </li>
                <li>
                  <strong>Luggage:</strong> Equipaje / maletas (<em>need help with my luggage</em>)
                </li>
                <li>
                  <strong>Airport & Plane:</strong> Aeropuerto y avión (<em>leaves at 3:00 p.m. / arrives at 5:00 p.m.</em>)
                </li>
                <li>
                  <strong>Presents:</strong> Regalos (<em>lots of presents for everyone</em>)
                </li>
              </ul>
            </div>
          </div>

          {/* Action buttons: Reintentar Actividad / Comenzar Actividad 2 */}
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
                <span>Comenzar Actividad 2</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
