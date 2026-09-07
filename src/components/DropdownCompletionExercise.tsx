import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Check, Sparkles, Volume2, VolumeX, FileText, ChevronDown, ChevronUp, CheckCircle2, XCircle, Gauge } from 'lucide-react';
import { DropdownCompletionExercise as DropdownExerciseType, LessonSentence } from '../types';
import { speakEnglish, playFeedbackSound } from '../utils/audio';
import { useTheme } from '../context/ThemeContext';
import chuckWoodImg from '../assets/images/chuck_wood_player_1788552205408.jpg';
import { PLAYBACK_SPEEDS, formatSpeedLabel } from './AudioPlayerCard';

interface DropdownCompletionExerciseProps {
  exercise: DropdownExerciseType;
  accent?: 'US' | 'UK';
  speechRate?: number;
  onSuccess?: () => void;
}

const TOTAL_AUDIO_DURATION_SEC = 41; // 00:41 as shown in screenshot

const defaultSentences: LessonSentence[] = [
  { en: 'Hi, there!', es: '¡Hola!' },
  { en: 'This is Chuck Wood calling from "Working People Magazine."', es: 'Habla Chuck Wood de "Working People Magazine".' },
  { en: 'We have something good for you today: our biggest sale of the year!', es: 'Hoy tenemos algo bueno para ti: ¡nuestra mayor venta del año!' },
  { en: 'The price of our magazine was $2.50 each.', es: 'El precio de nuestra revista era de $2.50 cada una.' },
  { en: "Now it's only $10 for ten magazines.", es: 'Ahora cuesta solo $10 por diez revistas.' },
  { en: "That's $1 each.", es: 'Eso es $1 cada una.' },
  { en: 'Call now!', es: '¡Llama ya!' },
  { en: 'The number is 555-9663.', es: 'El número es 555-9663.' },
  { en: "Don't forget!", es: '¡No lo olvides!' },
  { en: 'That number was 555-9663.', es: 'Ese número era 555-9663.' },
  { en: 'Remember: "Working People Magazine" works for you!', es: 'Recuerda: ¡"Working People Magazine" trabaja para ti!' },
];

export const DropdownCompletionExercise: React.FC<DropdownCompletionExerciseProps> = ({
  exercise,
  accent = 'US',
  speechRate = 1.0,
  onSuccess,
}) => {
  const { isDark } = useTheme();
  const safeAccent: 'US' | 'UK' = accent === 'UK' ? 'UK' : 'US';

  // Instruction flip
  const [isInstructionFlipped, setIsInstructionFlipped] = useState(false);

  // Selected values for each blank: { [blankId]: selectedOption }
  const [selectedValues, setSelectedValues] = useState<Record<string, string>>({});
  // Open dropdown ID
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  // Validation state
  const [hasChecked, setHasChecked] = useState(false);
  const [isAllCorrect, setIsAllCorrect] = useState(false);

  // Reversible Card State
  const [isFlipped, setIsFlipped] = useState(false);

  // Media Player State
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentPlaybackRate, setCurrentPlaybackRate] = useState<number>(speechRate);
  const [isSpeedMenuOpen, setIsSpeedMenuOpen] = useState<boolean>(false);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [currentSentenceIdx, setCurrentSentenceIdx] = useState<number | null>(null);
  const [showTranscript, setShowTranscript] = useState<boolean>(true);

  const sentences = exercise.sentences && exercise.sentences.length > 0 ? exercise.sentences : defaultSentences;

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const speedMenuRef = useRef<HTMLDivElement | null>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.dropdown-trigger-container')) {
        setOpenDropdownId(null);
      }
      if (speedMenuRef.current && !speedMenuRef.current.contains(target)) {
        setIsSpeedMenuOpen(false);
      }
    };
    window.addEventListener('click', handleGlobalClick);
    return () => window.removeEventListener('click', handleGlobalClick);
  }, []);

  // Sync timer with playback
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setElapsedSeconds((prev) => {
          if (prev >= TOTAL_AUDIO_DURATION_SEC) {
            setIsPlaying(false);
            setCurrentSentenceIdx(null);
            return 0;
          }
          const next = prev + 1;
          // Calculate approximate current sentence index across the 41 seconds
          const sentenceIndex = Math.min(
            sentences.length - 1,
            Math.floor((next / TOTAL_AUDIO_DURATION_SEC) * sentences.length)
          );
          setCurrentSentenceIdx(sentenceIndex);
          return next;
        });
      }, 1000 / currentPlaybackRate);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, currentPlaybackRate, sentences.length]);

  const handleTogglePlay = () => {
    if (isPlaying) {
      window.speechSynthesis?.cancel();
      setIsPlaying(false);
      return;
    }

    window.speechSynthesis?.cancel();
    setIsPlaying(true);
    setCurrentSentenceIdx(0);
    setElapsedSeconds(0);

    const fullText =
      exercise.audioPrompt ||
      sentences.map((s) => s.en).join(' ');

    speakEnglish(
      fullText,
      currentPlaybackRate,
      safeAccent,
      () => {
        setIsPlaying(true);
      },
      () => {
        setIsPlaying(false);
        setCurrentSentenceIdx(null);
        setElapsedSeconds(TOTAL_AUDIO_DURATION_SEC);
      },
      'male'
    );
  };

  const handlePlaySingleSentence = (sentenceEn: string, idx: number) => {
    window.speechSynthesis?.cancel();
    setIsPlaying(false);
    setCurrentSentenceIdx(idx);

    // Approximate elapsed time for this sentence
    const targetElapsed = Math.floor((idx / sentences.length) * TOTAL_AUDIO_DURATION_SEC);
    setElapsedSeconds(targetElapsed);

    speakEnglish(
      sentenceEn,
      currentPlaybackRate,
      safeAccent,
      () => {
        setCurrentSentenceIdx(idx);
      },
      () => {
        // Keep active or reset
      },
      'male'
    );
  };

  const handleSelectOption = (blankId: string, option: string) => {
    playFeedbackSound('click');
    setSelectedValues((prev) => ({
      ...prev,
      [blankId]: option,
    }));
    setOpenDropdownId(null);
    if (hasChecked) {
      setHasChecked(false);
    }
  };

  const handleCheckAnswers = () => {
    let allCorrect = true;
    for (const blank of exercise.blanks) {
      const userVal = selectedValues[blank.id];
      if (!userVal || userVal.trim().toLowerCase() !== blank.correctAnswer.trim().toLowerCase()) {
        allCorrect = false;
        break;
      }
    }

    setHasChecked(true);
    setIsAllCorrect(allCorrect);

    if (allCorrect) {
      playFeedbackSound('correct');
      if (onSuccess) {
        onSuccess();
      }
    } else {
      playFeedbackSound('wrong');
    }
  };

  const handleReset = () => {
    playFeedbackSound('click');
    setSelectedValues({});
    setHasChecked(false);
    setIsAllCorrect(false);
    setOpenDropdownId(null);
  };

  const handleFlipCard = () => {
    setOpenDropdownId(null);
    playFeedbackSound('flip');
    setIsFlipped((prev) => !prev);
  };

  const translationText =
    exercise.translationEs ||
    'Esta es la mayor oferta del año. El precio de oferta por una revista es de solo $1.00. Este es el precio si compras diez revistas.';

  // Format seconds to mm:ss
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div
      id="dropdown-completion-container"
      className={`w-full rounded-2xl sm:rounded-3xl border shadow-xl transition-all duration-300 overflow-hidden ${
        isDark ? 'bg-[#0E1322] border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'
      }`}
    >
      {/* Top Header: Instruction Card (Reversible) */}
      <div
        className={`px-5 py-4 sm:px-7 sm:py-5 border-b flex items-center justify-between gap-4 transition-colors ${
          isDark ? 'border-white/10 bg-white/5' : 'border-slate-100 bg-slate-50/70'
        }`}
      >
        <div className="flex-1 perspective-1000 min-h-[60px]">
          <div
            id="dropdown-instruction-card"
            onClick={() => {
              playFeedbackSound('flip');
              setIsInstructionFlipped((prev) => !prev);
            }}
            className={`relative w-full min-h-[60px] rounded-2xl cursor-pointer select-none transition-transform duration-500 transform-style-3d border shadow-xs ${
              isInstructionFlipped ? 'rotate-y-180' : ''
            } ${
              isInstructionFlipped
                ? isDark
                  ? 'bg-slate-900 border-emerald-500/30 text-emerald-100'
                  : 'bg-white border-emerald-300 text-emerald-950'
                : isDark
                ? 'bg-[#151C33] border-white/10 text-white hover:border-indigo-500/40'
                : 'bg-white border-slate-200 text-slate-800 hover:border-indigo-300'
            }`}
          >
            {/* Front: English */}
            <div className="absolute inset-0 p-3.5 sm:p-4 flex items-center gap-3 backface-hidden">
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                  isDark ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' : 'bg-indigo-50 text-indigo-600'
                }`}
              >
                <Volume2 className="w-4 h-4" />
              </div>
              <h4 className="text-sm sm:text-base font-medium leading-snug font-sans tracking-tight">
                {exercise.instructions || "Listen to Chuck Wood's message, and complete the sentences."}
              </h4>
            </div>

            {/* Back: Spanish Exact Translation */}
            <div className="absolute inset-0 p-3.5 sm:p-4 flex items-center gap-3 backface-hidden rotate-y-180">
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                  isDark ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-emerald-100 text-emerald-700'
                }`}
              >
                <Volume2 className="w-4 h-4" />
              </div>
              <p className={`text-sm sm:text-base font-medium leading-snug italic ${isDark ? 'text-emerald-200' : 'text-emerald-900'}`}>
                {exercise.instructionsEs || 'Escucha el mensaje de Chuck Wood y completa las oraciones.'}
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            speakEnglish(
              exercise.instructions || "Listen to Chuck Wood's message, and complete the sentences.",
              currentPlaybackRate,
              safeAccent,
              undefined,
              undefined,
              'male'
            );
          }}
          className="p-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-md transition-all cursor-pointer shrink-0"
          title="Escuchar instrucción"
        >
          <Volume2 className="w-5 h-5" />
        </button>
      </div>

      {/* Main 2-Column Section */}
      <div className="p-5 sm:p-7 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        
        {/* Left Column: Media Player & Synchronized Transcript (5 Cols) */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          <div
            id="chuck-wood-media-player"
            className="w-full rounded-2xl overflow-hidden border border-slate-700/60 bg-slate-950 shadow-lg flex flex-col"
          >
            {/* Player Video / Image Container */}
            <div className="relative w-full aspect-4/3 bg-slate-900 flex items-center justify-center overflow-hidden">
              <img
                src={chuckWoodImg}
                alt="Chuck Wood holding Working People Magazine"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top"
              />

              {/* Transcript toggle button on top right of video */}
              <button
                type="button"
                onClick={() => setShowTranscript((prev) => !prev)}
                className={`absolute top-3 right-3 w-10 h-10 rounded-2xl flex items-center justify-center transition-all cursor-pointer shadow-lg shadow-sky-500/20 active:scale-95 ${
                  showTranscript
                    ? 'bg-[#00a2ff] text-white ring-2 ring-sky-300/40'
                    : 'bg-black/60 hover:bg-[#00a2ff] text-white border border-white/20'
                }`}
                title={showTranscript ? 'Ocultar transcripción' : 'Mostrar transcripción'}
              >
                <FileText className="w-5 h-5 text-white stroke-[2.2]" />
              </button>
            </div>

            {/* Media Player Controls Bar */}
            <div className="px-4 py-3 bg-[#0e1626] border-t border-slate-800 flex flex-col gap-2.5">
              {/* Timeline scrubber bar */}
              <div
                className="w-full h-1.5 bg-slate-700/70 hover:h-2 rounded-full overflow-hidden cursor-pointer relative transition-all"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
                  setElapsedSeconds(Math.floor(ratio * TOTAL_AUDIO_DURATION_SEC));
                }}
              >
                <div
                  className="h-full bg-[#00a2ff] rounded-full transition-all duration-150"
                  style={{ width: `${(elapsedSeconds / TOTAL_AUDIO_DURATION_SEC) * 100}%` }}
                />
              </div>

              {/* Controls row */}
              <div className="flex items-center justify-between text-slate-300 text-xs font-mono">
                <div className="flex items-center gap-2.5 sm:gap-3">
                  {/* Play / Pause button */}
                  <button
                    type="button"
                    onClick={handleTogglePlay}
                    className="h-9 w-12 sm:h-10 sm:w-14 rounded-xl bg-[#00a2ff] hover:bg-[#38bdf8] text-slate-950 flex items-center justify-center transition-all cursor-pointer shadow-md shadow-sky-500/25 active:scale-95"
                    title={isPlaying ? 'Pausar' : 'Reproducir audio'}
                  >
                    {isPlaying ? (
                      <Pause className="w-4 h-4 fill-slate-950 text-slate-950" />
                    ) : (
                      <Play className="w-4 h-4 fill-slate-950 text-slate-950 ml-0.5" />
                    )}
                  </button>

                  {/* Playback speed toggle with requested speeds */}
                  <div className="relative" ref={speedMenuRef}>
                    <button
                      type="button"
                      onClick={() => setIsSpeedMenuOpen((prev) => !prev)}
                      className="h-8 px-2.5 rounded-lg bg-slate-800/90 hover:bg-slate-700 border border-slate-700/60 text-slate-200 text-xs font-mono font-bold flex items-center gap-1.5 transition-colors cursor-pointer select-none active:scale-95"
                      title="Elegir velocidad de reproducción"
                    >
                      <Gauge className="w-3.5 h-3.5 text-[#00a2ff]" />
                      <span>{formatSpeedLabel(currentPlaybackRate)}</span>
                      <ChevronUp
                        className={`w-3 h-3 text-slate-400 transition-transform ${
                          isSpeedMenuOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {isSpeedMenuOpen && (
                      <div
                        className="absolute bottom-full mb-2 left-0 w-28 bg-[#131d31] border border-slate-700 rounded-xl shadow-2xl py-1.5 z-50 animate-in fade-in slide-in-from-bottom-2 duration-150 backdrop-blur-md"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="px-2.5 py-1 text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800/80 mb-1">
                          Velocidad
                        </div>
                        {PLAYBACK_SPEEDS.map((sp) => {
                          const isSelected = Math.abs(sp.value - currentPlaybackRate) < 0.01;
                          return (
                            <button
                              key={sp.value}
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                playFeedbackSound('click');
                                setCurrentPlaybackRate(sp.value);
                                setIsSpeedMenuOpen(false);
                                if (isPlaying) {
                                  window.speechSynthesis?.cancel();
                                  const fullText = sentences.map((s) => s.en).join(' ');
                                  speakEnglish(
                                    fullText,
                                    sp.value,
                                    safeAccent,
                                    undefined,
                                    () => {
                                      setIsPlaying(false);
                                      setElapsedSeconds(TOTAL_AUDIO_DURATION_SEC);
                                      setCurrentSentenceIdx(null);
                                    },
                                    'male'
                                  );
                                }
                              }}
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

                <div className="flex items-center gap-3">
                  {/* Volume toggle */}
                  <button
                    type="button"
                    onClick={() => setIsMuted((prev) => !prev)}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-slate-400" />}
                  </button>

                  {/* Time indicator: 00:xx / 00:41 */}
                  <span className="text-slate-400 select-none">
                    {formatTime(elapsedSeconds)} / {formatTime(TOTAL_AUDIO_DURATION_SEC)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Synchronized Transcript */}
          {showTranscript && (
            <div
              className={`p-4 sm:p-5 rounded-2xl border transition-all duration-200 animate-in fade-in ${
                isDark ? 'bg-[#151C33]/90 border-white/10 text-slate-200' : 'bg-slate-50/90 border-slate-200 text-slate-800'
              }`}
            >
              <div className="flex items-center justify-between mb-2.5 pb-2 border-b border-inherit">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-500 dark:text-indigo-400">
                  Chuck Wood's Message (Transcript)
                </span>
                <span className="text-[11px] font-mono opacity-60">Toca cualquier oración para escucharla</span>
              </div>

              <p className="text-sm sm:text-base leading-relaxed sm:leading-loose">
                {sentences.map((sentence, idx) => {
                  const isHighlighted = currentSentenceIdx === idx;
                  return (
                    <span
                      key={idx}
                      onClick={() => handlePlaySingleSentence(sentence.en, idx)}
                      className={`inline cursor-pointer rounded px-1.5 py-0.5 transition-all duration-150 mx-0.5 ${
                        isHighlighted
                          ? 'bg-amber-200 text-slate-900 font-bold ring-2 ring-amber-400 shadow-xs'
                          : isDark
                          ? 'hover:bg-white/10 hover:text-white'
                          : 'hover:bg-indigo-50 hover:text-indigo-900'
                      }`}
                      title="Clic para escuchar esta frase"
                    >
                      {sentence.en}{' '}
                    </span>
                  );
                })}
              </p>
            </div>
          )}
        </div>

        {/* Right Column: Sentence Completion with Dropdowns as Reversible Card (6 Cols) */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <div className="w-full perspective-1000 min-h-[420px] sm:min-h-[430px]">
            <div
              id="exercise-flip-card"
              onClick={handleFlipCard}
              className={`relative w-full h-full min-h-[420px] sm:min-h-[430px] rounded-2xl cursor-pointer transition-transform duration-500 transform-style-3d select-none shadow-sm ${
                isFlipped ? 'rotate-y-180' : ''
              }`}
            >
              {/* ANVERSO / FRONT: Ejercicio con Dropdowns */}
              <div
                className={`absolute inset-0 w-full h-full rounded-2xl p-5 sm:p-7 flex flex-col justify-between border backface-hidden transition-colors duration-200 overflow-y-auto ${
                  isDark ? 'bg-white/[0.02] border-white/10' : 'bg-white border-slate-200 shadow-sm'
                }`}
              >
                {/* Inline Sentence with Dropdowns */}
                <div className="text-base sm:text-lg font-medium leading-relaxed sm:leading-loose text-slate-800 dark:text-slate-100">
                  <span>This is the biggest sale of the </span>

                  {/* Blank 1: (year, week, month) */}
                  <span className="relative inline-block align-middle mx-1 dropdown-trigger-container">
                    <button
                      type="button"
                      id="dropdown-blank-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenDropdownId((prev) => (prev === 'blank-1' ? null : 'blank-1'));
                      }}
                      className={`inline-flex items-center justify-between gap-2 px-3 py-1.5 rounded-xl border font-sans text-sm sm:text-base transition-all cursor-pointer min-w-[110px] ${
                        openDropdownId === 'blank-1'
                          ? 'border-sky-400 ring-2 ring-sky-300/40 bg-white dark:bg-slate-900'
                          : hasChecked
                          ? selectedValues['blank-1'] === exercise.blanks[0].correctAnswer
                            ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold'
                            : 'border-rose-500 bg-rose-500/10 text-rose-600 dark:text-rose-400'
                          : isDark
                          ? 'bg-slate-900 border-slate-700 hover:border-slate-500 text-white'
                          : 'bg-slate-50 border-slate-300 hover:border-slate-400 text-slate-800'
                      }`}
                    >
                      <span className="font-semibold">{selectedValues['blank-1'] || ''}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-sky-500 transition-transform duration-150 ${
                          openDropdownId === 'blank-1' ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {/* Dropdown Menu Popup */}
                    {openDropdownId === 'blank-1' && (
                      <div
                        onClick={(e) => e.stopPropagation()}
                        className={`absolute z-30 top-full left-0 mt-1 min-w-[120px] rounded-xl border shadow-xl py-1 overflow-hidden animate-in fade-in duration-150 ${
                          isDark ? 'bg-slate-900 border-sky-500/50 text-white' : 'bg-white border-sky-400 text-slate-800'
                        }`}
                      >
                        {exercise.blanks[0].options.map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSelectOption('blank-1', opt);
                            }}
                            className={`w-full text-left px-3.5 py-2 text-sm font-medium transition-colors cursor-pointer flex items-center justify-between ${
                              selectedValues['blank-1'] === opt
                                ? 'bg-sky-500 text-white font-bold'
                                : isDark
                                ? 'hover:bg-slate-800 text-slate-200'
                                : 'hover:bg-sky-50 text-slate-800'
                            }`}
                          >
                            <span>{opt}</span>
                            {selectedValues['blank-1'] === opt && <Check className="w-3.5 h-3.5" />}
                          </button>
                        ))}
                      </div>
                    )}
                  </span>

                  <span>. The sale price for one magazine is only </span>

                  {/* Blank 2: (10.00, $2.50, $1.00) */}
                  <span className="relative inline-block align-middle mx-1 dropdown-trigger-container">
                    <button
                      type="button"
                      id="dropdown-blank-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenDropdownId((prev) => (prev === 'blank-2' ? null : 'blank-2'));
                      }}
                      className={`inline-flex items-center justify-between gap-2 px-3 py-1.5 rounded-xl border font-sans text-sm sm:text-base transition-all cursor-pointer min-w-[110px] ${
                        openDropdownId === 'blank-2'
                          ? 'border-sky-400 ring-2 ring-sky-300/40 bg-white dark:bg-slate-900'
                          : hasChecked
                          ? selectedValues['blank-2'] === exercise.blanks[1].correctAnswer
                            ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold'
                            : 'border-rose-500 bg-rose-500/10 text-rose-600 dark:text-rose-400'
                          : isDark
                          ? 'bg-slate-900 border-slate-700 hover:border-slate-500 text-white'
                          : 'bg-slate-50 border-slate-300 hover:border-slate-400 text-slate-800'
                      }`}
                    >
                      <span className="font-semibold">{selectedValues['blank-2'] || ''}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-sky-500 transition-transform duration-150 ${
                          openDropdownId === 'blank-2' ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {/* Dropdown Menu Popup */}
                    {openDropdownId === 'blank-2' && (
                      <div
                        onClick={(e) => e.stopPropagation()}
                        className={`absolute z-30 top-full left-0 mt-1 min-w-[120px] rounded-xl border shadow-xl py-1 overflow-hidden animate-in fade-in duration-150 ${
                          isDark ? 'bg-slate-900 border-sky-500/50 text-white' : 'bg-white border-sky-400 text-slate-800'
                        }`}
                      >
                        {exercise.blanks[1].options.map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSelectOption('blank-2', opt);
                            }}
                            className={`w-full text-left px-3.5 py-2 text-sm font-medium transition-colors cursor-pointer flex items-center justify-between ${
                              selectedValues['blank-2'] === opt
                                ? 'bg-sky-500 text-white font-bold'
                                : isDark
                                ? 'hover:bg-slate-800 text-slate-200'
                                : 'hover:bg-sky-50 text-slate-800'
                            }`}
                          >
                            <span>{opt}</span>
                            {selectedValues['blank-2'] === opt && <Check className="w-3.5 h-3.5" />}
                          </button>
                        ))}
                      </div>
                    )}
                  </span>

                  <span>. This is the price if you buy </span>

                  {/* Blank 3: (ten, five, two) */}
                  <span className="relative inline-block align-middle mx-1 dropdown-trigger-container">
                    <button
                      type="button"
                      id="dropdown-blank-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenDropdownId((prev) => (prev === 'blank-3' ? null : 'blank-3'));
                      }}
                      className={`inline-flex items-center justify-between gap-2 px-3 py-1.5 rounded-xl border font-sans text-sm sm:text-base transition-all cursor-pointer min-w-[110px] ${
                        openDropdownId === 'blank-3'
                          ? 'border-sky-400 ring-2 ring-sky-300/40 bg-white dark:bg-slate-900'
                          : hasChecked
                          ? selectedValues['blank-3'] === exercise.blanks[2].correctAnswer
                            ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold'
                            : 'border-rose-500 bg-rose-500/10 text-rose-600 dark:text-rose-400'
                          : isDark
                          ? 'bg-slate-900 border-slate-700 hover:border-slate-500 text-white'
                          : 'bg-slate-50 border-slate-300 hover:border-slate-400 text-slate-800'
                      }`}
                    >
                      <span className="font-semibold">{selectedValues['blank-3'] || ''}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-sky-500 transition-transform duration-150 ${
                          openDropdownId === 'blank-3' ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {/* Dropdown Menu Popup */}
                    {openDropdownId === 'blank-3' && (
                      <div
                        onClick={(e) => e.stopPropagation()}
                        className={`absolute z-30 top-full left-0 mt-1 min-w-[120px] rounded-xl border shadow-xl py-1 overflow-hidden animate-in fade-in duration-150 ${
                          isDark ? 'bg-slate-900 border-sky-500/50 text-white' : 'bg-white border-sky-400 text-slate-800'
                        }`}
                      >
                        {exercise.blanks[2].options.map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSelectOption('blank-3', opt);
                            }}
                            className={`w-full text-left px-3.5 py-2 text-sm font-medium transition-colors cursor-pointer flex items-center justify-between ${
                              selectedValues['blank-3'] === opt
                                ? 'bg-sky-500 text-white font-bold'
                                : isDark
                                ? 'hover:bg-slate-800 text-slate-200'
                                : 'hover:bg-sky-50 text-slate-800'
                            }`}
                          >
                            <span>{opt}</span>
                            {selectedValues['blank-3'] === opt && <Check className="w-3.5 h-3.5" />}
                          </button>
                        ))}
                      </div>
                    )}
                  </span>

                  <span> magazines.</span>
                </div>

                {/* Action buttons and Status Feedback */}
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="mt-6 pt-4 border-t border-inherit/30 flex flex-col gap-3 shrink-0 w-full"
                >
                  {/* Buttons line */}
                  <div className="flex items-center gap-2.5 shrink-0">
                    <button
                      type="button"
                      id="check-dropdown-answers-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCheckAnswers();
                      }}
                      className="px-4 sm:px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm tracking-normal shadow-sm hover:shadow transition-all cursor-pointer flex items-center gap-2 shrink-0 active:scale-95"
                    >
                      <Check className="w-4 h-4" />
                      <span>Comprobar Respuestas</span>
                    </button>

                    <button
                      type="button"
                      id="reset-dropdown-answers-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleReset();
                      }}
                      className={`p-2.5 rounded-xl border transition-all cursor-pointer shrink-0 active:scale-95 ${
                        isDark
                          ? 'border-white/10 hover:bg-white/10 text-white/70 hover:text-white'
                          : 'border-slate-200 hover:bg-slate-100 text-slate-600 hover:text-slate-900'
                      }`}
                      title="Reiniciar respuestas"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Status indicator placed directly below the buttons */}
                  {hasChecked && (
                    <div
                      className={`w-full flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium animate-in fade-in slide-in-from-top-1 duration-150 ${
                        isAllCorrect
                          ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                          : 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30'
                      }`}
                    >
                      {isAllCorrect ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 shrink-0" />
                          <span className="leading-snug">¡Excelente! Todas las respuestas son correctas.</span>
                          <Sparkles className="w-3.5 h-3.5 text-emerald-500 animate-bounce shrink-0" />
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4 shrink-0 text-amber-500" />
                          <span className="leading-snug">Revisa las opciones marcadas y vuelve a intentarlo.</span>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* REVERSO / BACK: Traducción al Español */}
              <div
                className={`absolute inset-0 w-full h-full rounded-2xl p-5 sm:p-7 flex flex-col justify-center border backface-hidden rotate-y-180 transition-colors duration-200 ${
                  isDark
                    ? 'bg-slate-900 border-emerald-500/40 text-white'
                    : 'bg-white border-emerald-300 text-slate-900 shadow-md'
                }`}
              >
                <div className="flex-1 flex items-center justify-center my-auto py-6">
                  <p className="text-base sm:text-lg md:text-xl font-medium leading-relaxed sm:leading-loose text-slate-900 dark:text-emerald-100/90 text-center sm:text-left">
                    {translationText}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
