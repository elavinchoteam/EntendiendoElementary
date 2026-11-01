import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, RotateCcw, FileText, Gauge, RefreshCw } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { speakEnglish, stopSpeaking, playFeedbackSound } from '../../utils/audio';
import { DONT_DO_THAT_DIALOGUE, DialogueTurn } from '../../data/dontDoThatData';

interface DontDoThatScenePlayerProps {
  speed?: number;
  accent?: 'US' | 'UK';
  highlightedLineId?: string;
  showTranscriptInitially?: boolean;
  onLineChange?: (lineId: string) => void;
}

export const DontDoThatScenePlayer: React.FC<DontDoThatScenePlayerProps> = ({
  speed = 1.0,
  accent = 'US',
  highlightedLineId,
  showTranscriptInitially = true,
  onLineChange,
}) => {
  const { isDark } = useTheme();

  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTurnIdx, setActiveTurnIdx] = useState<number>(0);
  const [currentTimeSec, setCurrentTimeSec] = useState<number>(0);
  const [showTranscript, setShowTranscript] = useState(showTranscriptInitially);
  const [flippedLines, setFlippedLines] = useState<Record<string, boolean>>({});

  const totalDurationSec = 20.0;
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (highlightedLineId) {
      const idx = DONT_DO_THAT_DIALOGUE.findIndex((t) => t.id === highlightedLineId);
      if (idx !== -1) {
        setActiveTurnIdx(idx);
      }
    }
  }, [highlightedLineId]);

  useEffect(() => {
    return () => {
      stopSpeaking();
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handleTogglePlay = () => {
    if (isPlaying) {
      handlePause();
    } else {
      handlePlayAllFrom(activeTurnIdx);
    }
  };

  const handlePause = () => {
    stopSpeaking();
    setIsPlaying(false);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const handlePlayAllFrom = (startIdx: number) => {
    stopSpeaking();
    setIsPlaying(true);
    playTurn(startIdx);
  };

  const playTurn = (idx: number) => {
    if (idx >= DONT_DO_THAT_DIALOGUE.length) {
      setIsPlaying(false);
      setCurrentTimeSec(totalDurationSec);
      return;
    }

    const turn = DONT_DO_THAT_DIALOGUE[idx];
    setActiveTurnIdx(idx);
    setCurrentTimeSec(turn.startTimeSeconds || 0);
    if (onLineChange) onLineChange(turn.id);

    const voiceGender = turn.speaker === 'Boss' ? 'male' : 'male';

    speakEnglish(
      turn.textEn,
      speed,
      accent,
      undefined,
      () => {
        // When speech finishes, move to next turn
        setTimeout(() => {
          playTurn(idx + 1);
        }, 350 / speed);
      },
      voiceGender
    );
  };

  const handlePlaySingleLine = (turn: DialogueTurn, idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    stopSpeaking();
    setIsPlaying(false);
    setActiveTurnIdx(idx);
    setCurrentTimeSec(turn.startTimeSeconds || 0);
    playFeedbackSound('click');
    speakEnglish(turn.textEn, speed, accent, undefined, undefined, 'male');
  };

  const handleToggleLineFlip = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    playFeedbackSound('click');
    setFlippedLines((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div
      className={`rounded-2xl border shadow-sm overflow-hidden transition-all duration-200 ${
        isDark
          ? 'bg-slate-900/90 border-slate-700/80 shadow-slate-950/40'
          : 'bg-white border-slate-200 shadow-slate-100'
      }`}
    >
      {/* Video / Image Screen */}
      <div className="relative bg-slate-900 flex flex-col items-center justify-center overflow-hidden aspect-[16/10] sm:aspect-[16/9]">
        <img
          src="/assets/dont_do_that_scene.png"
          alt="Boss reprimanding Peterson with feet on desk"
          className="w-full h-full object-cover select-none"
        />

        {/* Transcript Toggle Icon Button on Top-Right */}
        <button
          type="button"
          onClick={() => {
            playFeedbackSound('click');
            setShowTranscript(!showTranscript);
          }}
          className={`absolute top-3 right-3 p-2 rounded-lg border backdrop-blur-md transition-all ${
            showTranscript
              ? 'bg-sky-500/90 text-white border-sky-400'
              : 'bg-slate-900/80 text-slate-300 border-slate-700 hover:text-white hover:bg-slate-800'
          }`}
          title={showTranscript ? 'Ocultar transcripción' : 'Ver transcripción'}
          aria-label="Alternar transcripción"
        >
          <FileText className="w-4 h-4" />
        </button>
      </div>

      {/* Video Player Control Bar */}
      <div
        className={`px-4 py-2.5 flex items-center gap-3 border-t text-xs select-none ${
          isDark
            ? 'bg-slate-800/90 border-slate-700 text-slate-300'
            : 'bg-slate-100/90 border-slate-200 text-slate-600'
        }`}
      >
        {/* Play/Pause */}
        <button
          type="button"
          onClick={handleTogglePlay}
          className="p-1.5 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 text-sky-600 dark:text-sky-400 transition-colors"
          title={isPlaying ? 'Pausar' : 'Reproducir video'}
          aria-label="Reproducir o pausar"
        >
          {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
        </button>

        {/* Scrub Track */}
        <div className="flex-1 relative flex items-center h-2 bg-slate-300 dark:bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-sky-500 transition-all duration-300 rounded-full"
            style={{
              width: `${Math.min(100, ((activeTurnIdx + 1) / DONT_DO_THAT_DIALOGUE.length) * 100)}%`,
            }}
          />
        </div>

        {/* Speed Indicator */}
        <div className="flex items-center gap-1 font-mono text-slate-500 dark:text-slate-400" title={`Velocidad: ${speed.toFixed(2)}x`}>
          <Gauge className="w-3.5 h-3.5" />
          <span>{speed.toFixed(2)}x</span>
        </div>

        {/* Audio Speaker Icon */}
        <Volume2 className="w-4 h-4 text-slate-500 dark:text-slate-400" />

        {/* Time Stamp */}
        <span className="font-mono text-[11px] text-slate-500 dark:text-slate-400">
          {formatTime(currentTimeSec)} / {formatTime(totalDurationSec)}
        </span>
      </div>

      {/* Expandable / Collapsible Dialogue Transcript */}
      {showTranscript && (
        <div
          className={`p-4 border-t flex flex-col gap-2 transition-all ${
            isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-slate-50/70 border-slate-200'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold tracking-wider uppercase text-slate-400 dark:text-slate-500">
              Guion de la Conversación
            </span>
            <span className="text-[11px] text-slate-400">
              Haz clic en cualquier línea para escuchar o traducir
            </span>
          </div>

          <div className="flex flex-col gap-2">
            {DONT_DO_THAT_DIALOGUE.map((turn, idx) => {
              const isTurnActive = activeTurnIdx === idx;
              const isFlipped = flippedLines[turn.id];

              return (
                <div
                  key={turn.id}
                  onClick={(e) => handlePlaySingleLine(turn, idx, e)}
                  className={`group rounded-lg p-2.5 border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                    isTurnActive
                      ? isDark
                        ? 'bg-amber-950/30 border-amber-500/50 text-slate-100 shadow-sm'
                        : 'bg-amber-50 border-amber-300 text-slate-900 shadow-sm'
                      : isDark
                      ? 'bg-slate-800/40 border-slate-700/60 hover:bg-slate-800/80 text-slate-300'
                      : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="flex-1 text-sm leading-relaxed">
                    {!isFlipped ? (
                      <p>
                        <strong
                          className={
                            turn.speaker === 'Boss'
                              ? 'text-sky-600 dark:text-sky-400 font-semibold'
                              : 'text-indigo-600 dark:text-indigo-400 font-semibold'
                          }
                        >
                          - {turn.speakerLabel}:{' '}
                        </strong>
                        <span className={isTurnActive ? 'bg-amber-200 dark:bg-amber-900/60 px-1 py-0.5 rounded' : ''}>
                          {turn.textEn}
                        </span>
                      </p>
                    ) : (
                      <p className="text-emerald-700 dark:text-emerald-300 font-medium">
                        <strong className="text-emerald-600 dark:text-emerald-400">
                          - {turn.speakerLabelEs}:{' '}
                        </strong>
                        {turn.textEs}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                    <button
                      type="button"
                      onClick={(e) => handlePlaySingleLine(turn, idx, e)}
                      className="p-1.5 rounded text-slate-400 hover:text-sky-600 hover:bg-sky-50 dark:hover:bg-sky-950/40 transition-colors"
                      title="Escuchar audio"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => handleToggleLineFlip(turn.id, e)}
                      className={`p-1.5 rounded transition-colors ${
                        isFlipped
                          ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40'
                          : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700'
                      }`}
                      title={isFlipped ? 'Ver inglés' : 'Traducir al español'}
                    >
                      <RefreshCw className={`w-3.5 h-3.5 transition-transform duration-300 ${isFlipped ? 'rotate-180' : ''}`} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
