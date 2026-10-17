import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  Volume2,
  Gauge,
  BookOpen,
  ArrowRight,
  RotateCcw,
} from 'lucide-react';
import {
  madMosImg,
  MAD_MOS_FLYER,
  MAD_MOS_REFERENCE_AUDIO,
  MAD_MOS_REFERENCE_SENTENCES,
} from '../../data/madMosDepartmentStoreData';
import { speakEnglish, stopSpeaking, playFeedbackSound } from '../../utils/audio';
import { useTheme } from '../../context/ThemeContext';

interface MadMosExploreSlideProps {
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

export const MadMosExploreSlide: React.FC<MadMosExploreSlideProps> = ({
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
  const totalDurationSeconds = 20; // flyer audio length

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
      MAD_MOS_REFERENCE_AUDIO,
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

  const handleResetActivity = () => {
    playFeedbackSound('click');
    setIsFlipped(false);
    setIsPlayingAudio(false);
    setPlayingSentenceIdx(null);
    setElapsedSeconds(0);
    stopSpeaking();
  };

  const renderSentenceHighlights = (text: string, highlights: string[]) => {
    let result: React.ReactNode[] = [text];

    highlights.forEach((h) => {
      const nextResult: React.ReactNode[] = [];
      result.forEach((item, itemIdx) => {
        if (typeof item !== 'string') {
          nextResult.push(item);
          return;
        }

        const lowerItem = item.toLowerCase();
        const lowerH = h.toLowerCase();
        const foundIdx = lowerItem.indexOf(lowerH);

        if (foundIdx === -1) {
          nextResult.push(item);
          return;
        }

        const before = item.slice(0, foundIdx);
        const match = item.slice(foundIdx, foundIdx + h.length);
        const after = item.slice(foundIdx + h.length);

        if (before) nextResult.push(before);
        nextResult.push(
          <span
            key={`${itemIdx}-${h}`}
            className="font-bold px-1.5 py-0.5 rounded bg-amber-300/80 text-amber-950 dark:bg-amber-400/30 dark:text-amber-200"
          >
            {match}
          </span>
        );
        if (after) nextResult.push(after);
      });
      result = nextResult;
    });

    return <>{result}</>;
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
            <span className="text-xs font-mono opacity-60">Mad Mo's: Review</span>
          </div>

          {/* Illustration image */}
          <div className="w-full h-48 sm:h-52 rounded-2xl overflow-hidden border border-inherit/20 relative shadow-sm">
            <img
              src={madMosImg}
              alt="Mad Mo's Department Store"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent flex items-end p-3">
              <span className="text-white text-xs font-medium drop-shadow-sm">
                Mad Mo's Department Store · 3 Floors of Bargains
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
                Audio Text · Ad Announcement
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
            <div className="space-y-1.5 max-h-[190px] overflow-y-auto pr-1">
              {MAD_MOS_REFERENCE_SENTENCES.map((item, idx) => (
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

        {/* RIGHT COLUMN: Reversible Pinned Notice Card + Vocabulary Helper */}
        <div className="w-full lg:w-[54%] p-6 sm:p-8 flex flex-col justify-between gap-6">
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between pb-3 border-b border-inherit/15">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                  Step 1: Explore
                </span>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight mt-0.5">
                  Mad Mo's Store Advertisement
                </h3>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-mono bg-sky-500/15 text-sky-600 dark:text-sky-400">
                Lectura & Anuncio
              </span>
            </div>

            {/* Reversible 3D Card with Pinned Flyer style - Full content auto-height grid */}
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
                    ? 'bg-[#2b2720] border-[#554a3a] text-[#f2e9dc]'
                    : 'bg-[#f4efe4] border-[#d8cdb8] text-[#3e3428]'
                } ${isFlipped ? 'rotate-y-180' : ''}`}
                title="Haz clic para voltear entre inglés y castellano"
              >
                {/* FRONT: English flyer with pinned pushpins */}
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
                    <span className="text-xs font-mono font-bold uppercase text-sky-600 dark:text-sky-400">
                      Ad Notice · English
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

                  <div className="space-y-2.5 px-2 py-1 text-sm sm:text-base leading-relaxed">
                    <h4 className="text-xl sm:text-2xl font-serif font-extrabold text-sky-600 dark:text-sky-400 text-center">
                      {MAD_MOS_FLYER.titleEn}
                    </h4>
                    <p className="font-semibold text-center text-sky-700 dark:text-sky-300">
                      {MAD_MOS_FLYER.taglineEn}
                    </p>
                    <p className="opacity-90">{MAD_MOS_FLYER.introEn}</p>
                    <ul className="space-y-1.5 pl-4 font-medium">
                      {MAD_MOS_FLYER.bargains.map((b, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="font-bold text-sky-500">•</span>
                          <span>
                            <strong>{b.itemEn}:</strong> {b.discountEn}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <div className="pt-1.5 border-t border-inherit/15 space-y-1">
                      <p className="opacity-90 text-xs sm:text-sm">{MAD_MOS_FLYER.hoursEn}</p>
                      <p className="font-bold text-sky-700 dark:text-sky-300 text-xs sm:text-sm">
                        {MAD_MOS_FLYER.callToActionEn}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 mt-2 border-t border-inherit/20 flex items-center justify-between text-[10px] font-mono opacity-60 px-3">
                    <span>Anuncio de Grandes Almacenes</span>
                    <span>Clic para traducir ↻</span>
                  </div>
                </div>

                {/* BACK: Spanish translation with pinned pushpins */}
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
                    <span className="text-xs font-mono font-bold uppercase text-emerald-600 dark:text-emerald-400">
                      Traducción al Castellano
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFlipCard();
                      }}
                      className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/25 flex items-center gap-1.5 transition-all cursor-pointer"
                      title="Volver al anuncio en inglés"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Inglés</span>
                    </button>
                  </div>

                  <div className="space-y-2.5 px-2 py-1 text-sm sm:text-base leading-relaxed font-serif">
                    <h4 className="text-xl sm:text-2xl font-serif font-extrabold text-emerald-600 dark:text-emerald-400 text-center">
                      {MAD_MOS_FLYER.titleEs}
                    </h4>
                    <p className="font-semibold text-center text-emerald-700 dark:text-emerald-300">
                      {MAD_MOS_FLYER.taglineEs}
                    </p>
                    <p className="opacity-90">{MAD_MOS_FLYER.introEs}</p>
                    <ul className="space-y-1.5 pl-4 font-medium not-italic">
                      {MAD_MOS_FLYER.bargains.map((b, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="font-bold text-emerald-500">•</span>
                          <span>
                            <strong>{b.itemEs}:</strong> {b.discountEs}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <div className="pt-1.5 border-t border-inherit/15 space-y-1">
                      <p className="opacity-90 text-xs sm:text-sm">{MAD_MOS_FLYER.hoursEs}</p>
                      <p className="font-bold text-emerald-700 dark:text-emerald-300 text-xs sm:text-sm not-italic">
                        {MAD_MOS_FLYER.callToActionEs}
                      </p>
                    </div>
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
                <span>Vocabulario Clave del Anuncio:</span>
              </div>
              <ul className="space-y-1 list-disc list-inside text-xs opacity-90 leading-relaxed font-mono">
                <li>
                  <strong>Bargains:</strong> Ofertas / gangas (<em>three floors of bargains</em>)
                </li>
                <li>
                  <strong>1/2 price:</strong> Mitad de precio (<em>half price</em>)
                </li>
                <li>
                  <strong>25% off:</strong> 25% de descuento (<em>twenty-five percent off</em>)
                </li>
                <li>
                  <strong>Cash or credit:</strong> Efectivo o tarjeta de crédito (<em>to charge = cargar en cuenta</em>)
                </li>
              </ul>
            </div>
          </div>

          {/* Action buttons: Reintentar Actividad / Siguiente Actividad */}
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
