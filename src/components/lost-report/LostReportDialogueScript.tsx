import React, { useState } from 'react';
import { Volume2, RefreshCw, Sparkles } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { speakEnglish, stopSpeaking, playFeedbackSound } from '../../utils/audio';
import { LOST_REPORT_DIALOGUE, LostReportDialogueLine } from '../../data/lostReportData';

interface LostReportDialogueScriptProps {
  currentTimeSec?: number;
  speed?: number;
  accent?: 'US' | 'UK';
  className?: string;
  onSelectLine?: (line: LostReportDialogueLine) => void;
}

export const LostReportDialogueScript: React.FC<LostReportDialogueScriptProps> = ({
  currentTimeSec = 0,
  speed = 1.0,
  accent = 'US',
  className = '',
  onSelectLine,
}) => {
  const { isDark } = useTheme();

  // Active line can be determined by currentTimeSec or clicked line
  const [selectedLineId, setSelectedLineId] = useState<string | null>(null);
  const [playingLineId, setPlayingLineId] = useState<string | null>(null);

  // Translation flip state per line: lineId -> boolean
  const [flippedLines, setFlippedLines] = useState<Record<string, boolean>>({});

  // Global flip mode: all translated
  const [allFlipped, setAllFlipped] = useState(false);

  // Determine active line from video time if not manually selected
  const activeLine =
    selectedLineId !== null
      ? LOST_REPORT_DIALOGUE.find((l) => l.id === selectedLineId)
      : LOST_REPORT_DIALOGUE.find(
          (l) => currentTimeSec >= l.startSec && currentTimeSec < l.endSec
        ) || LOST_REPORT_DIALOGUE[0];

  const handleToggleFlipLine = (lineId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    playFeedbackSound('click');
    setFlippedLines((prev) => ({
      ...prev,
      [lineId]: !prev[lineId],
    }));
  };

  const handleToggleAll = () => {
    playFeedbackSound('click');
    setAllFlipped((prev) => !prev);
  };

  const handlePlayLineAudio = (line: LostReportDialogueLine, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    if (playingLineId === line.id && window.speechSynthesis?.speaking) {
      stopSpeaking();
      setPlayingLineId(null);
      return;
    }

    stopSpeaking();
    playFeedbackSound('click');
    setPlayingLineId(line.id);
    setSelectedLineId(line.id);

    if (onSelectLine) {
      onSelectLine(line);
    }

    speakEnglish(
      line.textEn,
      speed,
      accent,
      () => setPlayingLineId(line.id),
      () => setPlayingLineId(null),
      line.speakerGender
    );
  };

  return (
    <div
      className={`rounded-2xl border p-3.5 sm:p-4 transition-all ${
        isDark
          ? 'bg-slate-900/90 border-slate-800 text-slate-200'
          : 'bg-white border-slate-200 text-slate-800 shadow-sm'
      } ${className}`}
    >
      {/* Header with Global Translate Button */}
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold tracking-wide uppercase text-sky-600 dark:text-sky-400">
            Diálogo de la Escena
          </span>
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-sky-100 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300 font-medium">
            Adam & Karen
          </span>
        </div>

        <button
          type="button"
          onClick={handleToggleAll}
          className={`flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-semibold rounded-lg border transition-all cursor-pointer ${
            allFlipped
              ? 'bg-emerald-100 dark:bg-emerald-900/40 border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-300'
              : isDark
              ? 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
              : 'bg-slate-100 border-slate-300 text-slate-700 hover:text-slate-900'
          }`}
          title="Alternar traducción de todo el diálogo"
        >
          <RefreshCw className={`w-3 h-3 ${allFlipped ? 'rotate-180' : ''} transition-transform`} />
          <span>{allFlipped ? 'Ver en Inglés' : 'Traducir Diálogo'}</span>
        </button>
      </div>

      {/* Dialogue Lines */}
      <div className="space-y-2">
        {LOST_REPORT_DIALOGUE.map((line) => {
          const isActive = activeLine?.id === line.id;
          const isFlipped = allFlipped || !!flippedLines[line.id];
          const isPlaying = playingLineId === line.id;

          return (
            <div
              key={line.id}
              onClick={() => {
                setSelectedLineId(line.id);
                if (onSelectLine) onSelectLine(line);
              }}
              className={`p-2.5 rounded-xl border text-xs sm:text-sm transition-all cursor-pointer select-none flex items-start justify-between gap-2.5 ${
                isActive
                  ? isDark
                    ? 'bg-amber-950/40 border-amber-500/60 shadow-xs ring-1 ring-amber-500/30'
                    : 'bg-yellow-50 border-amber-300 shadow-xs ring-1 ring-amber-300/40'
                  : isDark
                  ? 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-800/50'
                  : 'bg-slate-50/80 border-slate-200/80 hover:bg-slate-100/70'
              }`}
            >
              <div className="flex-1 min-w-0">
                {/* Speaker tag matching screenshot sky-blue styling */}
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`font-bold font-mono text-[11px] uppercase tracking-wide ${
                      line.speaker === 'Adam'
                        ? 'text-sky-600 dark:text-sky-400'
                        : 'text-indigo-600 dark:text-indigo-400'
                    }`}
                  >
                    {line.speaker}:
                  </span>

                  {isActive && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-amber-700 dark:text-amber-400 bg-amber-100/80 dark:bg-amber-950/80 px-1.5 py-0.2 rounded">
                      <Sparkles className="w-2.5 h-2.5" />
                      Línea activa
                    </span>
                  )}
                </div>

                {/* Text: English or Spanish translation */}
                {!isFlipped ? (
                  <p
                    className={`leading-relaxed font-normal ${
                      isActive
                        ? 'font-medium text-slate-900 dark:text-amber-100 bg-yellow-200/70 dark:bg-amber-900/40 px-1 py-0.5 rounded'
                        : 'text-slate-800 dark:text-slate-200'
                    }`}
                  >
                    {line.textEn}
                  </p>
                ) : (
                  <p className="leading-relaxed font-medium italic text-emerald-800 dark:text-emerald-300 bg-emerald-50/70 dark:bg-emerald-950/50 px-1 py-0.5 rounded font-serif">
                    {line.textEs}
                  </p>
                )}
              </div>

              {/* Action buttons: Play Audio & Flip Translation */}
              <div className="shrink-0 flex items-center gap-1 mt-0.5">
                <button
                  type="button"
                  onClick={(e) => handleToggleFlipLine(line.id, e)}
                  className={`w-7 h-7 rounded-lg border flex items-center justify-center transition-all cursor-pointer ${
                    isFlipped
                      ? 'bg-emerald-500 text-white border-emerald-600 shadow-xs'
                      : isDark
                      ? 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
                      : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900'
                  }`}
                  title={isFlipped ? 'Ver inglés' : 'Ver traducción en español'}
                  aria-label="Ver traducción"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isFlipped ? 'rotate-180' : ''}`} />
                </button>

                <button
                  type="button"
                  onClick={(e) => handlePlayLineAudio(line, e)}
                  className={`w-7 h-7 rounded-lg border flex items-center justify-center transition-all cursor-pointer ${
                    isPlaying
                      ? 'bg-sky-500 text-white border-sky-600 animate-pulse'
                      : isDark
                      ? 'bg-slate-800 border-slate-700 text-sky-400 hover:text-white'
                      : 'bg-white border-slate-200 text-sky-600 hover:text-sky-800'
                  }`}
                  title="Escuchar audio"
                  aria-label="Escuchar audio de la frase"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
