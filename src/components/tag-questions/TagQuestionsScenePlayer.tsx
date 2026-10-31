import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  Volume2,
  FileText,
  RefreshCw,
  Gauge,
  Maximize2,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { speakEnglish, stopSpeaking, playFeedbackSound } from '../../utils/audio';
import { TAG_QUESTIONS_MAIN_DIALOGUE, TagQuestionsTurn } from '../../data/tagQuestionsData';

interface TagQuestionsScenePlayerProps {
  speed: number;
  accent?: 'US' | 'UK';
  highlightedLineId?: string;
  onSentenceClick?: (turn: TagQuestionsTurn) => void;
  showTranscriptInitially?: boolean;
}

export const TagQuestionsScenePlayer: React.FC<TagQuestionsScenePlayerProps> = ({
  speed,
  accent = 'US',
  highlightedLineId = 'turn-1',
  onSentenceClick,
  showTranscriptInitially = true,
}) => {
  const { isDark } = useTheme();

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTimeSec, setCurrentTimeSec] = useState(0);
  const [activeTurnId, setActiveTurnId] = useState<string | null>(highlightedLineId);

  const [showTranscript, setShowTranscript] = useState(showTranscriptInitially);
  const [isFlippedToSpanish, setIsFlippedToSpanish] = useState(false);
  const [flippedLines, setFlippedLines] = useState<Record<string, boolean>>({});

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const totalDuration = 7; // 7 seconds matching 00:00/00:07 in screenshots

  const playSequentialTurns = (startIndex: number) => {
    if (startIndex >= TAG_QUESTIONS_MAIN_DIALOGUE.length) {
      setIsPlaying(false);
      setCurrentTimeSec(totalDuration);
      setActiveTurnId(null);
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    const currentTurn = TAG_QUESTIONS_MAIN_DIALOGUE[startIndex];
    setActiveTurnId(currentTurn.id);
    setCurrentTimeSec(currentTurn.startTime);

    speakEnglish(
      currentTurn.en,
      speed,
      accent,
      () => {},
      () => {
        playSequentialTurns(startIndex + 1);
      },
      'female'
    );
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      stopSpeaking();
      setIsPlaying(false);
      if (timerRef.current) clearInterval(timerRef.current);
    } else {
      playFeedbackSound('click');
      stopSpeaking();
      setIsPlaying(true);
      setCurrentTimeSec(0);

      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setCurrentTimeSec((prev) => {
          if (prev >= totalDuration) {
            if (timerRef.current) clearInterval(timerRef.current);
            return totalDuration;
          }
          return prev + 1;
        });
      }, 1000);

      playSequentialTurns(0);
    }
  };

  const handlePlaySingleLine = (turn: TagQuestionsTurn, e: React.MouseEvent) => {
    e.stopPropagation();
    stopSpeaking();
    if (timerRef.current) clearInterval(timerRef.current);
    setIsPlaying(false);
    setActiveTurnId(turn.id);
    setCurrentTimeSec(turn.startTime);

    playFeedbackSound('click');
    speakEnglish(turn.en, speed, accent, undefined, undefined, 'female');

    if (onSentenceClick) {
      onSentenceClick(turn);
    }
  };

  const handleToggleLineFlip = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    playFeedbackSound('click');
    setFlippedLines((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleToggleGlobalTranscript = () => {
    playFeedbackSound('click');
    setShowTranscript((prev) => !prev);
  };

  const handleToggleAllTranslations = () => {
    playFeedbackSound('click');
    setIsFlippedToSpanish((prev) => !prev);
  };

  useEffect(() => {
    return () => {
      stopSpeaking();
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const rem = Math.floor(secs % 60);
    return `${mins.toString().padStart(2, '0')}:${rem.toString().padStart(2, '0')}`;
  };

  const progressPercent = Math.min(100, (currentTimeSec / totalDuration) * 100);

  return (
    <div
      className={`w-full rounded-2xl border overflow-hidden shadow-md transition-all flex flex-col ${
        isDark ? 'bg-slate-900 border-slate-700/80' : 'bg-white border-slate-200'
      }`}
    >
      {/* 1. Video / Scene Visual Frame */}
      <div className="relative w-full aspect-[16/11] sm:aspect-[16/10] bg-slate-950 flex items-center justify-center overflow-hidden group">
        <img
          src="/assets/tag_questions_scene.png"
          alt="Two women talking in living room"
          className="w-full h-full object-cover object-top select-none"
        />

        {/* Big Center Play Overlay Button */}
        {!isPlaying && (
          <button
            type="button"
            onClick={handlePlayPause}
            className="absolute inset-0 m-auto w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/85 dark:bg-slate-900/85 hover:bg-sky-600 hover:text-white text-slate-800 flex items-center justify-center shadow-2xl transition-all transform hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-xs"
            title="Reproducir conversación completa"
            aria-label="Reproducir conversación completa"
          >
            <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-current translate-x-0.5" />
          </button>
        )}

        {/* Top-Right Script / Notes Icon Button */}
        <button
          type="button"
          onClick={handleToggleGlobalTranscript}
          className={`absolute top-2.5 right-2.5 p-2 rounded-lg border backdrop-blur-md transition-all cursor-pointer ${
            showTranscript
              ? 'bg-sky-500/90 text-white border-sky-400 shadow-md'
              : 'bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-200 border-white/20'
          }`}
          title={showTranscript ? 'Ocultar transcripción' : 'Mostrar transcripción'}
        >
          <FileText className="w-4 h-4" />
        </button>

        {/* Bottom Playback Control Bar matching Screenshot (00:00 / 00:07) */}
        <div className="absolute bottom-0 inset-x-0 h-10 bg-slate-950/90 backdrop-blur-md px-3 flex items-center justify-between gap-3 text-white border-t border-white/10">
          <button
            type="button"
            onClick={handlePlayPause}
            className="text-white hover:text-sky-400 transition-colors cursor-pointer"
            title={isPlaying ? 'Pausar' : 'Reproducir'}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 fill-current" />
            ) : (
              <Play className="w-4 h-4 fill-current" />
            )}
          </button>

          {/* Progress Scrubber */}
          <div className="flex-1 relative flex items-center h-4 cursor-pointer">
            <div className="w-full h-1 bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-sky-500 transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div
              className="absolute w-3 h-3 rounded-full bg-sky-400 border border-white shadow-xs -translate-x-1/2 pointer-events-none"
              style={{ left: `${progressPercent}%` }}
            />
          </div>

          {/* Right Controls: Speed Icon, Speaker, Time (00:00 / 00:07) */}
          <div className="flex items-center gap-2 text-xs font-mono shrink-0">
            <Gauge className="w-3.5 h-3.5 text-slate-400" title={`Velocidad: ${speed}x`} />
            <Volume2 className="w-3.5 h-3.5 text-slate-300" />
            <span className="text-[11px] text-sky-400 font-bold">
              {formatTime(currentTimeSec)} / {formatTime(totalDuration)}
            </span>
            <Maximize2 className="w-3 h-3 text-slate-400 hidden sm:inline" />
          </div>
        </div>
      </div>

      {/* 2. Dialogue Transcript Box (Exact Match to Screenshots) */}
      {showTranscript && (
        <div
          className={`p-4 sm:p-5 flex flex-col gap-2.5 transition-colors border-t ${
            isDark
              ? 'bg-slate-900/90 border-slate-800'
              : 'bg-slate-50 border-slate-200'
          }`}
        >
          <div className="flex items-center justify-between pb-1.5 border-b border-inherit/40 text-[11px] font-mono text-slate-500">
            <span>Diálogo de la Escena (Tag Questions):</span>
            <button
              type="button"
              onClick={handleToggleAllTranslations}
              className="flex items-center gap-1 text-sky-600 dark:text-sky-400 hover:underline cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" />
              <span>{isFlippedToSpanish ? 'Ver en Inglés' : 'Ver Traducción'}</span>
            </button>
          </div>

          <div className="flex flex-col gap-2.5">
            {/* Line 1: You cut your own hair, don't you? */}
            <div
              onClick={(e) => handlePlaySingleLine(TAG_QUESTIONS_MAIN_DIALOGUE[0], e)}
              className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-2.5 select-none ${
                activeTurnId === 'turn-1'
                  ? 'border-sky-500 bg-sky-500/10 shadow-xs'
                  : 'border-transparent hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div className="flex items-baseline gap-1.5 flex-1 min-w-0">
                <span className="text-slate-400 shrink-0 font-bold">-</span>
                <p className="text-xs sm:text-sm font-medium leading-relaxed">
                  {isFlippedToSpanish || flippedLines['turn-1'] ? (
                    <span className="italic font-serif text-emerald-800 dark:text-emerald-300">
                      {TAG_QUESTIONS_MAIN_DIALOGUE[0].es}
                    </span>
                  ) : (
                    <>
                      <span className="bg-yellow-200 dark:bg-yellow-500/30 text-slate-950 dark:text-yellow-100 px-1 py-0.5 rounded font-medium">
                        You cut your own hair,
                      </span>{' '}
                      <span className="bg-cyan-200 dark:bg-cyan-900/60 text-cyan-900 dark:text-cyan-200 px-1.5 py-0.5 rounded font-bold border border-cyan-400/40">
                        don't you?
                      </span>
                    </>
                  )}
                </p>
              </div>

              <div className="shrink-0 flex items-center gap-1 opacity-70 hover:opacity-100 transition-opacity">
                <button
                  type="button"
                  onClick={(e) => handleToggleLineFlip('turn-1', e)}
                  className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-600"
                  title="Voltear línea"
                >
                  <RefreshCw className="w-3 h-3" />
                </button>
                <button
                  type="button"
                  onClick={(e) => handlePlaySingleLine(TAG_QUESTIONS_MAIN_DIALOGUE[0], e)}
                  className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 text-sky-500"
                  title="Escuchar audio"
                >
                  <Volume2 className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Line 2: Yes, I do. It looks nice, doesn't it? */}
            <div
              onClick={(e) => handlePlaySingleLine(TAG_QUESTIONS_MAIN_DIALOGUE[1], e)}
              className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-2.5 select-none ${
                activeTurnId === 'turn-2'
                  ? 'border-sky-500 bg-sky-500/10 shadow-xs'
                  : 'border-transparent hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div className="flex items-baseline gap-1.5 flex-1 min-w-0">
                <span className="text-slate-400 shrink-0 font-bold">-</span>
                <p className="text-xs sm:text-sm font-medium leading-relaxed">
                  {isFlippedToSpanish || flippedLines['turn-2'] ? (
                    <span className="italic font-serif text-emerald-800 dark:text-emerald-300">
                      {TAG_QUESTIONS_MAIN_DIALOGUE[1].es}
                    </span>
                  ) : (
                    <>
                      <span className="text-slate-800 dark:text-slate-200">
                        Yes, I do. It looks nice,
                      </span>{' '}
                      <span className="bg-cyan-200 dark:bg-cyan-900/60 text-cyan-900 dark:text-cyan-200 px-1.5 py-0.5 rounded font-bold border border-cyan-400/40">
                        doesn't it?
                      </span>
                    </>
                  )}
                </p>
              </div>

              <div className="shrink-0 flex items-center gap-1 opacity-70 hover:opacity-100 transition-opacity">
                <button
                  type="button"
                  onClick={(e) => handleToggleLineFlip('turn-2', e)}
                  className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-600"
                  title="Voltear línea"
                >
                  <RefreshCw className="w-3 h-3" />
                </button>
                <button
                  type="button"
                  onClick={(e) => handlePlaySingleLine(TAG_QUESTIONS_MAIN_DIALOGUE[1], e)}
                  className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 text-sky-500"
                  title="Escuchar audio"
                >
                  <Volume2 className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
