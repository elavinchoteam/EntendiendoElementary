import React, { useState } from 'react';
import { Volume2, RefreshCw, Sparkles, CheckCircle2 } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { playFeedbackSound, speakEnglish, stopSpeaking } from '../../utils/audio';
import { DONT_DO_THAT_DIALOGUE, DialogueTurn } from '../../data/dontDoThatData';
import { DontDoThatScenePlayer } from './DontDoThatScenePlayer';
import { ReversibleTextCard } from './ReversibleTextCard';

interface Activity1ExploreProps {
  speed: number;
  accent?: 'US' | 'UK';
  onNext?: () => void;
}

export const Activity1Explore: React.FC<Activity1ExploreProps> = ({
  speed,
  accent = 'US',
  onNext,
}) => {
  const { isDark } = useTheme();

  const [activeLineId, setActiveLineId] = useState<string>('turn-1');
  const [flippedTurns, setFlippedTurns] = useState<Record<string, boolean>>({});

  const handleToggleTurnFlip = (turnId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    playFeedbackSound('click');
    setFlippedTurns((prev) => ({
      ...prev,
      [turnId]: !prev[turnId],
    }));
  };

  const handlePlayLineAudio = (turn: DialogueTurn, e: React.MouseEvent) => {
    e.stopPropagation();
    stopSpeaking();
    playFeedbackSound('click');
    setActiveLineId(turn.id);
    speakEnglish(turn.textEn, speed, accent, undefined, undefined, 'male');
  };

  return (
    <div className="w-full flex flex-col gap-6 animate-in fade-in duration-200">
      {/* 1. Instruction Banner */}
      <ReversibleTextCard
        textEn="Watch the video and listen carefully to the conversation between Peterson and his employer."
        textEs="Mira el video y escucha atentamente la conversación entre Peterson y su empleador."
        speed={speed}
        accent={accent}
      />

      {/* 2. Main Two-Column Layout */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Video Scene Player */}
        <div className="lg:col-span-6">
          <DontDoThatScenePlayer
            speed={speed}
            accent={accent}
            highlightedLineId={activeLineId}
            showTranscriptInitially={false}
            onLineChange={(id) => setActiveLineId(id)}
          />
        </div>

        {/* Right Column: Line-by-Line Dialogue Explorer */}
        <div className="lg:col-span-6 flex flex-col gap-3">
          <div
            className={`p-4 rounded-2xl border shadow-sm ${
              isDark ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200 dark:border-slate-700">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" /> Diálogo de la Oficina
              </span>
              <span className="text-xs text-slate-400">Toca para reproducir y traducir</span>
            </div>

            <div className="flex flex-col gap-2.5">
              {DONT_DO_THAT_DIALOGUE.map((turn) => {
                const isSelected = activeLineId === turn.id;
                const isFlipped = flippedTurns[turn.id];

                return (
                  <div
                    key={turn.id}
                    onClick={(e) => handlePlayLineAudio(turn, e)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      isSelected
                        ? isDark
                          ? 'bg-sky-950/40 border-sky-500/60 shadow-md ring-1 ring-sky-500/30'
                          : 'bg-sky-50/80 border-sky-400 shadow-md ring-1 ring-sky-400/30'
                        : isDark
                        ? 'bg-slate-900/40 border-slate-700/50 hover:bg-slate-800/70'
                        : 'bg-slate-50 border-slate-200 hover:bg-white'
                    }`}
                  >
                    <div className="flex-1 pr-1">
                      {!isFlipped ? (
                        <p className="text-sm font-medium text-slate-800 dark:text-slate-100 leading-snug">
                          <span
                            className={`font-semibold ${
                              turn.speaker === 'Boss'
                                ? 'text-sky-600 dark:text-sky-400'
                                : 'text-indigo-600 dark:text-indigo-400'
                            }`}
                          >
                            - {turn.speakerLabel}:{' '}
                          </span>
                          <span className={isSelected ? 'bg-amber-200 dark:bg-amber-900/60 px-1 py-0.5 rounded' : ''}>
                            {turn.textEn}
                          </span>
                        </p>
                      ) : (
                        <div className="flex flex-col gap-0.5">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                            Español
                          </span>
                          <p className="text-sm font-medium text-emerald-800 dark:text-emerald-200 leading-snug">
                            <strong className="text-emerald-600 dark:text-emerald-400">
                              - {turn.speakerLabelEs}:{' '}
                            </strong>
                            {turn.textEs}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                      <button
                        type="button"
                        onClick={(e) => handlePlayLineAudio(turn, e)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-sky-600 hover:bg-sky-50 dark:hover:bg-sky-950/40 transition-colors"
                        title="Escuchar audio"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => handleToggleTurnFlip(turn.id, e)}
                        className={`p-1.5 rounded-lg transition-colors ${
                          isFlipped
                            ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40'
                            : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700'
                        }`}
                        title={isFlipped ? 'Ver inglés' : 'Traducir al español'}
                      >
                        <RefreshCw className={`w-4 h-4 transition-transform duration-300 ${isFlipped ? 'rotate-180' : ''}`} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
