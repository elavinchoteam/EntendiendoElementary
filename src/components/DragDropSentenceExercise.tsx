import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Check,
  Volume2,
  VolumeX,
  CheckCircle2,
  XCircle,
  Gauge,
  RotateCw,
  Sparkles,
} from 'lucide-react';
import { DragDropSentenceExercise as DragDropSentenceExerciseType } from '../types';
import { speakEnglish, stopSpeaking, playFeedbackSound } from '../utils/audio';
import { useTheme } from '../context/ThemeContext';
import rockConcertImg from '../assets/images/rock_concert_be_past_1788714966666.jpg';
import { PLAYBACK_SPEEDS } from './AudioPlayerCard';

interface DragDropSentenceExerciseProps {
  exercise: DragDropSentenceExerciseType;
  accent?: 'US' | 'UK';
  speechRate?: number;
  onSuccess?: () => void;
}

export const DragDropSentenceExercise: React.FC<DragDropSentenceExerciseProps> = ({
  exercise,
  accent = 'US',
  speechRate = 1.0,
  onSuccess,
}) => {
  const { isDark } = useTheme();
  const safeAccent: 'US' | 'UK' = accent === 'UK' ? 'UK' : 'US';

  const totalDurationSeconds = exercise.durationSeconds || 5;
  const displayImage = exercise.imageUrl || rockConcertImg;

  // Exercise selection & verification state
  const [placedOptionId, setPlacedOptionId] = useState<string | null>(null);
  const [isChecked, setIsChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  // Reversible cards states
  const [isInstructionFlipped, setIsInstructionFlipped] = useState(false);
  const [isDialogueFlipped, setIsDialogueFlipped] = useState(false);
  const [isReferenceFlipped, setIsReferenceFlipped] = useState(false);

  // Media Player State
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [playerSpeed, setPlayerSpeed] = useState(speechRate);
  const [isSpeedMenuOpen, setIsSpeedMenuOpen] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  // Audio speaking target tracker
  const [speakingTarget, setSpeakingTarget] = useState<string | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const speedMenuRef = useRef<HTMLDivElement>(null);

  // Reset state when exercise changes
  useEffect(() => {
    setPlacedOptionId(null);
    setIsChecked(false);
    setIsCorrect(false);
    setIsDragOver(false);
    setIsInstructionFlipped(false);
    setIsDialogueFlipped(false);
    setIsReferenceFlipped(false);
    setIsPlaying(false);
    setElapsedSeconds(0);
    stopSpeaking();
    setSpeakingTarget(null);
  }, [exercise.id]);

  // Handle outside click for speed menu
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (speedMenuRef.current && !speedMenuRef.current.contains(e.target as Node)) {
        setIsSpeedMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Format MM:SS
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Play / Pause media audio
  const handleTogglePlayMedia = () => {
    if (isPlaying) {
      stopSpeaking();
      setIsPlaying(false);
      if (timerRef.current) clearInterval(timerRef.current);
      setSpeakingTarget(null);
      return;
    }

    stopSpeaking();
    setIsPlaying(true);
    setSpeakingTarget('media-player');

    const promptText =
      exercise.referenceText ||
      "- I was at a rock concert last night. All my friends were there, but it wasn't very good.";

    if (!isMuted) {
      speakEnglish(
        promptText,
        playerSpeed,
        safeAccent,
        () => setIsPlaying(true),
        () => {
          setIsPlaying(false);
          setSpeakingTarget(null);
          setElapsedSeconds(totalDurationSeconds);
          if (timerRef.current) clearInterval(timerRef.current);
        }
      );
    }

    // Step-timer for scrubber simulation (5s duration)
    const intervalMs = 100;
    const increment = (intervalMs / 1000) * playerSpeed;

    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setElapsedSeconds((prev) => {
        const next = prev + increment;
        if (next >= totalDurationSeconds) {
          if (timerRef.current) clearInterval(timerRef.current);
          setIsPlaying(false);
          setSpeakingTarget(null);
          return totalDurationSeconds;
        }
        return next;
      });
    }, intervalMs);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      stopSpeaking();
    };
  }, []);

  // Timeline click scrubber
  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, clickX / rect.width));
    const newSeconds = percentage * totalDurationSeconds;
    setElapsedSeconds(newSeconds);
  };

  const handleSelectSpeed = (speedVal: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setPlayerSpeed(speedVal);
    setIsSpeedMenuOpen(false);
    playFeedbackSound('click');
  };

  // Drag & Drop handlers
  const handleDragStart = (e: React.DragEvent, optId: string) => {
    if (isChecked) return;
    e.dataTransfer.setData('text/plain', optId);
    playFeedbackSound('click');
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!isChecked && !isDragOver) {
      setIsDragOver(true);
    }
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (isChecked) return;

    const optId = e.dataTransfer.getData('text/plain');
    if (optId) {
      setPlacedOptionId(optId);
      playFeedbackSound('click');
    }
  };

  const handleSelectOptionClick = (optId: string) => {
    if (isChecked) return;
    setPlacedOptionId(optId);
    playFeedbackSound('click');
  };

  const handleRemovePlacedOption = () => {
    if (isChecked) return;
    setPlacedOptionId(null);
    playFeedbackSound('click');
  };

  // Check answer
  const handleCheckAnswer = () => {
    if (!placedOptionId) return;

    const correct = placedOptionId === exercise.correctAnswerId;
    setIsChecked(true);
    setIsCorrect(correct);

    if (correct) {
      playFeedbackSound('correct');
      if (onSuccess) onSuccess();
    } else {
      playFeedbackSound('wrong');
    }
  };

  // Reset attempt
  const handleRetry = () => {
    setPlacedOptionId(null);
    setIsChecked(false);
    setIsCorrect(false);
    playFeedbackSound('click');
  };

  // Speak dialogue text
  const handleListenDialogue = () => {
    const fullDialogueText = exercise.dialogueLines
      .map((line) => {
        if (line.hasBlank) {
          const opt = exercise.options.find((o) => o.id === placedOptionId);
          const chosenText = opt ? opt.text : 'blank';
          return `${line.prefix || ''}${chosenText}${line.suffix || ''}`;
        }
        return line.textEn;
      })
      .join(' ');

    if (speakingTarget === 'dialogue') {
      stopSpeaking();
      setSpeakingTarget(null);
      return;
    }

    stopSpeaking();
    setSpeakingTarget('dialogue');
    speakEnglish(
      fullDialogueText,
      playerSpeed,
      safeAccent,
      () => setSpeakingTarget('dialogue'),
      () => setSpeakingTarget(null)
    );
  };

  // Speak reference sentence
  const handleListenReference = () => {
    const textToSpeak = exercise.referenceText || BE_PAST_DEFAULT_REFERENCE;

    if (speakingTarget === 'reference') {
      stopSpeaking();
      setSpeakingTarget(null);
      return;
    }

    stopSpeaking();
    setSpeakingTarget('reference');
    speakEnglish(
      textToSpeak,
      playerSpeed,
      safeAccent,
      () => setSpeakingTarget('reference'),
      () => setSpeakingTarget(null)
    );
  };

  const BE_PAST_DEFAULT_REFERENCE =
    "- I was at a rock concert last night. All my friends were there, but it wasn't very good.";

  const placedOption = exercise.options.find((o) => o.id === placedOptionId);

  // Helper to render highlights in reference text
  const renderHighlightedReference = (text: string, highlights: string[] = ['was', 'were', "wasn't"]) => {
    // Regex matching any of the highlight words as whole words
    const pattern = new RegExp(`\\b(${highlights.join('|')})\\b`, 'gi');
    const parts = text.split(pattern);

    return parts.map((part, i) => {
      const isMatch = highlights.some((h) => h.toLowerCase() === part.toLowerCase());
      if (isMatch) {
        return (
          <span
            key={i}
            className="inline-block bg-cyan-300 dark:bg-cyan-500/30 text-cyan-950 dark:text-cyan-200 px-1 py-0.5 rounded font-bold border border-cyan-400/40"
          >
            {part}
          </span>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <div className="w-full flex flex-col gap-5">
      {/* 1. Tarjeta Reversible de Instrucción: "Drag the correct answer/s into place." */}
      <div className="w-full perspective-1000">
        <div
          id={`instruction-card-${exercise.id}`}
          onClick={() => setIsInstructionFlipped((prev) => !prev)}
          className={`relative w-full min-h-[64px] sm:min-h-[72px] rounded-2xl transition-transform duration-500 transform-style-3d cursor-pointer shadow-md select-none ${
            isInstructionFlipped ? 'rotate-y-180' : ''
          }`}
          title="Haz clic para ver la traducción al español"
        >
          {/* Frente: Inglés */}
          <div
            className={`absolute inset-0 backface-hidden rounded-2xl p-4 sm:px-6 flex items-center justify-between border ${
              isDark
                ? 'bg-slate-900/90 border-slate-700/80 text-white shadow-inner'
                : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse" />
              <h2 className="text-base sm:text-lg font-bold tracking-tight">
                {exercise.instructions || 'Drag the correct answer/s into place.'}
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                id={`listen-instruction-${exercise.id}`}
                onClick={(e) => {
                  e.stopPropagation();
                  speakEnglish(
                    exercise.instructions || 'Drag the correct answer into place.',
                    playerSpeed,
                    safeAccent
                  );
                }}
                className={`p-2 rounded-xl border transition-all cursor-pointer ${
                  isDark
                    ? 'bg-slate-800 hover:bg-slate-700 text-indigo-400 border-slate-700'
                    : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border-indigo-200'
                }`}
                title="Escuchar instrucción"
                aria-label="Escuchar instrucción"
              >
                <Volume2 className="w-4 h-4" />
              </button>
              <span className="text-xs text-slate-400 hidden sm:inline-flex items-center gap-1 font-medium bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">
                <RotateCw className="w-3.5 h-3.5" />
                <span>Español</span>
              </span>
            </div>
          </div>

          {/* Reverso: Español */}
          <div
            className={`absolute inset-0 backface-hidden rotate-y-180 rounded-2xl p-4 sm:px-6 flex items-center justify-between border ${
              isDark
                ? 'bg-indigo-950/90 border-indigo-800 text-indigo-100 shadow-inner'
                : 'bg-indigo-50 border-indigo-200 text-indigo-900'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <h2 className="text-base sm:text-lg font-bold tracking-tight">
                {exercise.instructionsEs || 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.'}
              </h2>
            </div>
            <span className="text-xs text-indigo-500 dark:text-indigo-400 flex items-center gap-1 font-medium bg-white/70 dark:bg-indigo-900/50 px-2.5 py-1 rounded-lg">
              <RotateCw className="w-3.5 h-3.5" />
              <span>Inglés</span>
            </span>
          </div>
        </div>
      </div>

      {/* 2. Contenedor Principal: 2 Columnas (Player + Reference Sentence a la izquierda, Dialogue & Drag Drop a la derecha) */}
      <div
        className={`w-full rounded-3xl border overflow-hidden shadow-xl flex flex-col lg:flex-row transition-colors ${
          isDark ? 'bg-[#0B132B] border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* PANEL IZQUIERDO: Video / Media Player + Oración de referencia con palabras resaltadas */}
        <div className="w-full lg:w-[48%] p-4 sm:p-6 flex flex-col justify-between bg-slate-900/5 dark:bg-black/30 border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-slate-800">
          <div className="w-full rounded-2xl overflow-hidden border border-slate-700/60 bg-[#1E293B] shadow-lg relative flex flex-col">
            {/* Imagen del reproductor (hombre al teléfono + guitarrista de rock inset) */}
            <div className="relative w-full aspect-[4/3] bg-[#1a2332] overflow-hidden flex items-center justify-center">
              <img
                src={displayImage}
                alt="Rock concert - Be past statements"
                className="w-full h-full object-cover object-center"
              />

              {/* Botón play overlay cuando está pausado */}
              {!isPlaying && (
                <button
                  type="button"
                  id={`media-play-overlay-btn-${exercise.id}`}
                  onClick={handleTogglePlayMedia}
                  className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-black/60 hover:bg-indigo-600 text-white flex items-center justify-center transition-transform hover:scale-110 active:scale-95 shadow-xl border border-white/20 cursor-pointer"
                  title="Reproducir audio"
                  aria-label="Reproducir audio"
                >
                  <Play className="w-6 h-6 fill-current translate-x-0.5" />
                </button>
              )}
            </div>

            {/* Barra de Controles de Audio exactamente como la captura (Play, Scrubber, Gauge, Volume, 00:00/00:05) */}
            <div className="w-full px-3 py-2.5 bg-[#1F2937] border-t border-slate-700 flex items-center gap-3 select-none">
              {/* Play / Pause Toggle */}
              <button
                type="button"
                id={`media-play-pause-btn-${exercise.id}`}
                onClick={handleTogglePlayMedia}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                title={isPlaying ? 'Pausar' : 'Reproducir'}
                aria-label={isPlaying ? 'Detener' : 'Reproducir'}
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 fill-current text-indigo-400" />
                ) : (
                  <Play className="w-4 h-4 fill-current text-slate-200" />
                )}
              </button>

              {/* Timeline Scrubber Bar con indicador circular */}
              <div
                onClick={handleTimelineClick}
                className="relative flex-1 h-3 flex items-center cursor-pointer group py-1"
                title="Avanzar/Retroceder"
              >
                <div className="w-full h-1.5 bg-slate-600 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-cyan-400 rounded-full transition-all duration-100"
                    style={{
                      width: `${(elapsedSeconds / totalDurationSeconds) * 100}%`,
                    }}
                  />
                </div>
                {/* Círculo indicador del timeline */}
                <div
                  className="absolute w-3.5 h-3.5 bg-white rounded-full border-2 border-cyan-500 shadow-md transform -translate-x-1/2 group-hover:scale-125 transition-transform pointer-events-none"
                  style={{
                    left: `${(elapsedSeconds / totalDurationSeconds) * 100}%`,
                  }}
                />
              </div>

              {/* Speed Dial Menu Button (Gauge) */}
              <div className="relative" ref={speedMenuRef}>
                <button
                  type="button"
                  id={`media-speed-btn-${exercise.id}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsSpeedMenuOpen((prev) => !prev);
                  }}
                  className={`w-7 h-7 rounded-lg flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer ${
                    isSpeedMenuOpen ? 'text-indigo-400 bg-white/10' : ''
                  }`}
                  title="Velocidad de reproducción"
                  aria-label="Velocidad"
                >
                  <Gauge className="w-4 h-4" />
                </button>

                {/* Speed Selector Popup */}
                {isSpeedMenuOpen && (
                  <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 z-50 bg-[#111827] border border-slate-700 rounded-xl shadow-2xl p-1.5 flex flex-col gap-1 min-w-[70px]">
                    {PLAYBACK_SPEEDS.map((sp) => (
                      <button
                        type="button"
                        key={sp.value}
                        onClick={(e) => handleSelectSpeed(sp.value, e)}
                        className={`px-2 py-1 text-xs font-mono rounded-md text-left transition-colors cursor-pointer ${
                          Math.abs(playerSpeed - sp.value) < 0.01
                            ? 'bg-indigo-600 text-white font-bold'
                            : 'text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        {sp.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Volume Button */}
              <button
                type="button"
                id={`media-volume-btn-${exercise.id}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMuted((prev) => !prev);
                  playFeedbackSound('click');
                }}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                title={isMuted ? 'Activar sonido' : 'Silenciar'}
                aria-label="Volumen"
              >
                {isMuted ? (
                  <VolumeX className="w-4 h-4 text-rose-400" />
                ) : (
                  <Volume2 className="w-4 h-4 text-slate-300" />
                )}
              </button>

              {/* Timestamp 00:00 / 00:05 */}
              <div className="text-xs font-mono font-medium text-cyan-400 tracking-tight shrink-0 select-none">
                {formatTime(elapsedSeconds)}/{formatTime(totalDurationSeconds)}
              </div>
            </div>
          </div>

          {/* Caja con la oración de referencia y palabras destacadas en cian (reversible al hacer clic) */}
          <div
            id={`reference-sentence-card-${exercise.id}`}
            onClick={() => {
              playFeedbackSound('flip');
              setIsReferenceFlipped((prev) => !prev);
            }}
            className={`mt-4 p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer select-none ${
              isDark
                ? 'bg-slate-800/80 border-slate-700 text-slate-200'
                : 'bg-white border-slate-200 text-slate-800 shadow-xs'
            }`}
          >
            <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-slate-200/50 dark:border-slate-700/50">
              <span className="text-[11px] font-mono uppercase font-bold tracking-wider text-cyan-600 dark:text-cyan-400 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3" />
                Key Reference Example
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  id={`listen-reference-btn-${exercise.id}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleListenReference();
                  }}
                  className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                    speakingTarget === 'reference'
                      ? 'bg-cyan-500 text-white border-cyan-400'
                      : isDark
                      ? 'bg-slate-700/60 hover:bg-slate-700 text-cyan-300 border-slate-600'
                      : 'bg-white hover:bg-slate-100 text-cyan-700 border-slate-300'
                  }`}
                  aria-label="Audio"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <p className="text-sm sm:text-base leading-relaxed font-medium">
              {isReferenceFlipped
                ? exercise.referenceTextEs || '- Estuve en un concierto de rock anoche. Todos mis amigos estaban allí, pero no estuvo muy bueno.'
                : renderHighlightedReference(
                    exercise.referenceText || BE_PAST_DEFAULT_REFERENCE,
                    exercise.referenceHighlights || ['was', 'were', "wasn't"]
                  )}
            </p>
          </div>
        </div>

        {/* PANEL DERECHO: Diálogo con casilla Drag & Drop / Dropdown y Opciones abajo */}
        <div className="w-full lg:w-[52%] p-6 sm:p-8 flex flex-col justify-between">
          <div className="flex flex-col gap-6">
            {/* Cabecera del diálogo con botón de audio parlante (solo icono) */}
            <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
              <span className="text-xs font-mono uppercase font-bold text-indigo-600 dark:text-indigo-400">
                Complete the Dialogue
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  id={`listen-dialogue-btn-${exercise.id}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleListenDialogue();
                  }}
                  className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                    speakingTarget === 'dialogue'
                      ? 'bg-indigo-600 text-white border-indigo-500 ring-2 ring-indigo-400'
                      : isDark
                      ? 'bg-slate-800 hover:bg-slate-700 text-indigo-300 border-white/10'
                      : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border-indigo-200'
                  }`}
                  aria-label="Audio"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Diálogo con líneas y espacio para soltar o dropdown (clic en el área de texto voltea al español) */}
            <div
              onClick={(e) => {
                const target = e.target as HTMLElement;
                if (target.closest('button') || target.closest('select') || target.closest(`#drag-drop-slot-${exercise.id}`)) {
                  return;
                }
                playFeedbackSound('flip');
                setIsDialogueFlipped((prev) => !prev);
              }}
              className="space-y-4 text-base sm:text-lg font-medium leading-relaxed cursor-pointer select-none"
            >
              {exercise.dialogueLines.map((line, idx) => {
                if (line.hasBlank) {
                  return (
                    <div
                      key={idx}
                      className="flex flex-wrap items-center gap-2.5 pt-1 text-slate-900 dark:text-white"
                    >
                      <span>{isDialogueFlipped ? line.prefixEs || line.prefix : line.prefix}</span>

                      {/* Dropdown o Casilla interactiva Drag & Drop */}
                      {exercise.isDropdown ? (
                        <select
                          id={`dropdown-slot-${exercise.id}`}
                          value={placedOptionId || ''}
                          onChange={(e) => {
                            if (isChecked) return;
                            setPlacedOptionId(e.target.value || null);
                            playFeedbackSound('click');
                          }}
                          disabled={isChecked}
                          className={`px-3.5 py-2 rounded-xl border-2 font-mono text-sm sm:text-base font-semibold transition-all outline-none cursor-pointer ${
                            isChecked
                              ? isCorrect
                                ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                                : 'border-rose-500 bg-rose-500/10 text-rose-600 dark:text-rose-400'
                              : placedOptionId
                              ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300'
                              : isDark
                              ? 'border-slate-600 bg-slate-800 text-slate-200 hover:border-slate-500'
                              : 'border-slate-300 bg-white text-slate-800 hover:border-slate-400'
                          }`}
                        >
                          <option value="" disabled>
                            -- select --
                          </option>
                          {exercise.options.map((opt) => (
                            <option
                              key={opt.id}
                              value={opt.id}
                              className="text-slate-900 bg-white dark:bg-slate-800 dark:text-white"
                            >
                              {opt.text}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <div
                          id={`drag-drop-slot-${exercise.id}`}
                          onDragOver={handleDragOver}
                          onDragLeave={handleDragLeave}
                          onDrop={handleDrop}
                          onClick={() => {
                            if (placedOptionId && !isChecked) {
                              handleRemovePlacedOption();
                            }
                          }}
                          className={`min-w-[120px] sm:min-w-[140px] h-11 px-3.5 rounded-xl border-2 flex items-center justify-center transition-all select-none ${
                            isChecked
                              ? isCorrect
                                ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono font-bold'
                                : 'border-rose-500 bg-rose-500/10 text-rose-600 dark:text-rose-400 font-mono font-bold'
                              : isDragOver
                              ? 'border-indigo-500 bg-indigo-500/20 scale-105 shadow-md ring-2 ring-indigo-400'
                              : placedOptionId
                              ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 font-mono font-bold shadow-xs'
                              : isDark
                              ? 'border-dashed border-slate-600 bg-slate-800/40 text-slate-400 hover:border-slate-500'
                              : 'border-dashed border-slate-400 bg-slate-100/70 text-slate-400 hover:border-slate-500'
                          } ${placedOptionId && !isChecked ? 'cursor-pointer hover:bg-rose-50 dark:hover:bg-rose-950/30' : ''}`}
                          title={
                            placedOptionId
                              ? 'Haz clic para quitar de la casilla'
                              : 'Arrastra aquí o haz clic en una opción de abajo'
                          }
                        >
                          {placedOption ? (
                            <div className="flex items-center gap-2">
                              <span>{placedOption.text}</span>
                              {!isChecked && (
                                <XCircle className="w-4 h-4 text-slate-400 hover:text-rose-500 transition-colors" />
                              )}
                            </div>
                          ) : (
                            <span className="text-xs sm:text-sm text-slate-400 italic">
                              ________
                            </span>
                          )}
                        </div>
                      )}

                      <span>{isDialogueFlipped ? line.suffixEs || line.suffix : line.suffix}</span>
                    </div>
                  );
                }

                return (
                  <p
                    key={idx}
                    className="text-slate-700 dark:text-slate-300 whitespace-pre-line"
                  >
                    {isDialogueFlipped ? line.textEs || line.textEn : line.textEn}
                  </p>
                );
              })}
            </div>
          </div>

          {/* ZONA INFERIOR: Banco de opciones (solo para drag & drop) + Botones de acción y Feedback */}
          <div className="pt-6 border-t border-slate-200 dark:border-slate-800 mt-6">
            {!exercise.isDropdown && (
              <>
                <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">
                  Opciones disponibles (arrastra o haz clic)
                </div>

                {/* Pastillas de opciones exactamente como la captura */}
                <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-6">
                  {exercise.options.map((opt) => {
                    const isPlaced = placedOptionId === opt.id;

                    return (
                      <button
                        type="button"
                        key={opt.id}
                        id={`drag-option-${exercise.id}-${opt.id}`}
                        draggable={!isChecked}
                        onDragStart={(e) => handleDragStart(e, opt.id)}
                        onClick={() => handleSelectOptionClick(opt.id)}
                        disabled={isChecked || isPlaced}
                        className={`px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl border text-sm sm:text-base font-mono font-semibold transition-all select-none shadow-xs ${
                          isPlaced
                            ? 'opacity-30 border-dashed border-slate-400 bg-slate-200/50 dark:bg-slate-800/40 text-slate-400 pointer-events-none scale-95'
                            : isDark
                            ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-600 hover:border-indigo-400 hover:scale-105 active:scale-95 cursor-grab active:cursor-grabbing'
                            : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-300 hover:border-indigo-500 hover:scale-105 active:scale-95 cursor-grab active:cursor-grabbing'
                        }`}
                        title={`Haz clic o arrastra: ${opt.text}`}
                      >
                        {opt.text}
                      </button>
                    );
                  })}
                </div>
              </>
            )}

            {/* Mensaje de retroalimentación si ya comprobó */}
            {isChecked && (
              <div
                id={`feedback-message-${exercise.id}`}
                className={`p-4 rounded-2xl border mb-5 animate-in fade-in slide-in-from-bottom-2 duration-300 ${
                  isCorrect
                    ? isDark
                      ? 'bg-emerald-950/30 border-emerald-500/50 text-emerald-200'
                      : 'bg-emerald-50 border-emerald-300 text-emerald-900'
                    : isDark
                    ? 'bg-rose-950/30 border-rose-500/50 text-rose-200'
                    : 'bg-rose-50 border-rose-300 text-rose-900'
                }`}
              >
                <div className="flex items-start gap-3">
                  {isCorrect ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <h4 className="font-bold text-sm sm:text-base">
                      {isCorrect ? '¡Excelente trabajo! Respuesta correcta' : 'Respuesta incorrecta. Inténtalo de nuevo'}
                    </h4>
                    <p className="text-xs sm:text-sm mt-1 leading-relaxed opacity-90">
                      {exercise.explanationEs || exercise.explanation}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Botón de Comprobar / Reintentar */}
            <div className="flex items-center gap-3">
              {!isChecked ? (
                <button
                  type="button"
                  id={`check-answer-btn-${exercise.id}`}
                  onClick={handleCheckAnswer}
                  disabled={!placedOptionId}
                  className={`px-6 py-3 rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer ${
                    placedOptionId
                      ? 'bg-indigo-600 hover:bg-indigo-500 text-white hover:scale-[1.02] active:scale-[0.98]'
                      : 'bg-slate-300 dark:bg-slate-800 text-slate-500 cursor-not-allowed opacity-60'
                  }`}
                >
                  <Check className="w-4 h-4" />
                  <span>Comprobar respuesta</span>
                </button>
              ) : (
                <button
                  type="button"
                  id={`retry-btn-${exercise.id}`}
                  onClick={handleRetry}
                  className={`px-6 py-3 rounded-xl border font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    isDark
                      ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
                  }`}
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>{isCorrect ? 'Practicar de nuevo' : 'Intentar de nuevo'}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
