import React, { useState } from 'react';
import { Volume2, CheckCircle2, XCircle, RotateCcw, ArrowRight } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import {
  ACTIVITY_3_PLAYERS,
  ACTIVITY_3_OPTIONS,
  SportsPlayerMatchItem,
} from '../../data/sports1Data';
import { SportsMediaCard } from './SportsMediaCard';
import { speakEnglish, playFeedbackSound } from '../../utils/audio';

interface SportsActivity3Props {
  currentRate: number;
  accent?: 'US' | 'UK';
  onComplete?: () => void;
  onNext?: () => void;
}

export const SportsActivity3: React.FC<SportsActivity3Props> = ({
  currentRate,
  accent = 'US',
  onComplete,
  onNext,
}) => {
  const { isDark } = useTheme();

  const [isInstructionFlipped, setIsInstructionFlipped] = useState(false);
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [selectedSport, setSelectedSport] = useState<string | null>(null);
  const [flippedRows, setFlippedRows] = useState<string[]>([]);
  const [hasChecked, setHasChecked] = useState(false);
  const [isAllCorrect, setIsAllCorrect] = useState(false);

  const instructionEn =
    "Listen to the sports report on the radio, and then find each player's sport.";
  const instructionEs =
    "Escucha el informe deportivo en la radio y luego encuentra el deporte de cada jugador.";

  const handlePlayInstruction = (e: React.MouseEvent) => {
    e.stopPropagation();
    speakEnglish(instructionEn, currentRate, accent === 'UK' ? 'UK' : 'US');
  };

  const handlePlayText = (text: string, e: React.MouseEvent) => {
    e.stopPropagation();
    speakEnglish(text, currentRate, accent === 'UK' ? 'UK' : 'US');
  };

  const toggleRowFlip = (id: string) => {
    setFlippedRows((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleAssignSport = (playerId: string) => {
    if (!selectedSport) {
      if (matches[playerId]) {
        setMatches((prev) => {
          const updated = { ...prev };
          delete updated[playerId];
          return updated;
        });
        setHasChecked(false);
      }
      return;
    }

    setMatches((prev) => ({
      ...prev,
      [playerId]: selectedSport,
    }));
    setSelectedSport(null);
    setHasChecked(false);
    playFeedbackSound('click');
  };

  const handleCheck = () => {
    let allRight = true;
    for (const p of ACTIVITY_3_PLAYERS) {
      if (matches[p.id] !== p.correctSport) {
        allRight = false;
        break;
      }
    }

    setHasChecked(true);
    setIsAllCorrect(allRight);

    if (allRight) {
      playFeedbackSound('correct');
      if (onComplete) onComplete();
    } else {
      playFeedbackSound('wrong');
    }
  };

  const handleReset = () => {
    setMatches({});
    setSelectedSport(null);
    setHasChecked(false);
    setIsAllCorrect(false);
  };

  const placedSports = Object.values(matches);

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Reversible Instruction Header Card */}
      <div
        id="sports-act3-instruction-card"
        onClick={() => setIsInstructionFlipped(!isInstructionFlipped)}
        className={`w-full rounded-2xl border p-4 sm:p-5 transition-all cursor-pointer select-none ${
          isDark
            ? 'bg-slate-900 border-slate-700 text-slate-100'
            : 'bg-white border-slate-200 text-slate-900 shadow-xs'
        }`}
      >
        <div className="w-full flex items-center justify-between gap-3">
          <div>
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 mb-0.5">
              {isInstructionFlipped ? 'Instrucciones' : 'Instructions'}
            </div>
            <p className="text-sm sm:text-base font-medium">
              {isInstructionFlipped ? instructionEs : instructionEn}
            </p>
          </div>

          <button
            type="button"
            onClick={handlePlayInstruction}
            className={`p-2.5 rounded-xl border shrink-0 transition-colors cursor-pointer ${
              isDark
                ? 'bg-slate-800 hover:bg-slate-700 text-sky-300 border-slate-700'
                : 'bg-slate-50 hover:bg-slate-100 text-sky-700 border-slate-200 shadow-xs'
            }`}
            aria-label="Audio"
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Two-Column Layout: Media on Left, Player Matching Table on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Radio Broadcast Feed */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <SportsMediaCard
            currentRate={currentRate}
            accent={accent}
            highlightCurrentSentence={true}
            showTranscript={true}
          />
        </div>

        {/* Right Column: Player & Sport Matching Area */}
        <div className="lg:col-span-7 flex flex-col gap-5">
          {/* Options Pool */}
          <div
            className={`p-4 rounded-2xl border flex flex-wrap items-center justify-center gap-3 ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
            }`}
          >
            <div className="w-full text-xs font-semibold text-slate-400 uppercase tracking-wider text-center mb-1">
              Deportes para arrastrar o seleccionar
            </div>
            {ACTIVITY_3_OPTIONS.map((sport) => {
              const isPlaced = placedSports.includes(sport);
              const isSelected = selectedSport === sport;

              return (
                <button
                  key={sport}
                  type="button"
                  disabled={isPlaced}
                  onClick={() => {
                    playFeedbackSound('click');
                    setSelectedSport(isSelected ? null : sport);
                  }}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all cursor-pointer select-none flex items-center gap-2 ${
                    isPlaced
                      ? 'opacity-30 border-dashed border-slate-400 dark:border-slate-700 cursor-not-allowed'
                      : isSelected
                      ? 'bg-sky-600 text-white border-sky-500 ring-2 ring-sky-400/40 scale-105 shadow-sm'
                      : isDark
                      ? 'bg-slate-800 text-slate-200 border-slate-700 hover:border-slate-500 hover:bg-slate-750'
                      : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100 shadow-xs'
                  }`}
                >
                  <span>{sport}</span>
                  <span
                    onClick={(e) => handlePlayText(sport, e)}
                    className="p-1 hover:text-sky-300 rounded-full"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </span>
                </button>
              );
            })}
          </div>

          {/* Table Container */}
          <div
            className={`rounded-2xl border overflow-hidden shadow-xs ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}
          >
            {/* Table Header */}
            <div
              className={`grid grid-cols-2 p-3 sm:px-4 font-bold text-xs uppercase tracking-wider border-b ${
                isDark
                  ? 'bg-slate-800/80 text-slate-300 border-slate-700'
                  : 'bg-slate-100 text-slate-700 border-slate-200'
              }`}
            >
              <div>Player</div>
              <div>Sport</div>
            </div>

            {/* Table Rows */}
            <div className="divide-y divide-slate-200 dark:divide-slate-800">
              {ACTIVITY_3_PLAYERS.map((item) => {
                const isFlipped = flippedRows.includes(item.id);
                const assigned = matches[item.id];
                const isCorrect = hasChecked && assigned === item.correctSport;
                const isWrong = hasChecked && assigned && assigned !== item.correctSport;

                return (
                  <div
                    key={item.id}
                    id={`sports-player-row-${item.id}`}
                    onClick={() => toggleRowFlip(item.id)}
                    className={`grid grid-cols-1 sm:grid-cols-2 p-3 sm:p-4 gap-3 items-center transition-colors cursor-pointer select-none ${
                      isDark ? 'hover:bg-slate-850' : 'hover:bg-slate-50'
                    }`}
                  >
                    {/* Left: Player Name & Reversible info */}
                    <div className="flex items-center justify-between gap-2 pr-2">
                      <div>
                        <div className="font-semibold text-sm sm:text-base text-slate-900 dark:text-slate-100">
                          {item.player}
                        </div>
                        {isFlipped && (
                          <div className="text-xs text-amber-600 dark:text-amber-400 mt-0.5">
                            Deporte: {item.sportEs}
                          </div>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={(e) => handlePlayText(item.player, e)}
                        className={`p-2 rounded-lg border transition-colors shrink-0 cursor-pointer ${
                          isDark
                            ? 'bg-slate-800 hover:bg-slate-700 text-sky-300 border-slate-700'
                            : 'bg-white hover:bg-slate-100 text-sky-700 border-slate-200 shadow-xs'
                        }`}
                        aria-label="Audio"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Right: Drop / Selection Target Slot */}
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAssignSport(item.id);
                      }}
                      className={`min-h-[44px] rounded-xl border-2 border-dashed flex items-center justify-between px-3 py-2 text-xs font-bold transition-all cursor-pointer ${
                        assigned
                          ? hasChecked
                            ? isCorrect
                              ? 'border-emerald-500 bg-emerald-500 text-white'
                              : 'border-rose-500 bg-rose-500 text-white'
                            : isDark
                            ? 'border-sky-500 bg-sky-950/60 text-sky-200 border-solid'
                            : 'border-sky-500 bg-sky-50 text-sky-900 border-solid'
                          : selectedSport
                          ? 'border-sky-400 bg-sky-50/50 dark:bg-sky-950/20 text-sky-600 dark:text-sky-300 animate-pulse'
                          : isDark
                          ? 'border-slate-700 bg-slate-800/60 text-slate-400 hover:border-slate-500'
                          : 'border-slate-300 bg-slate-50 text-slate-500 hover:border-slate-400'
                      }`}
                    >
                      <span>{assigned || 'Haz clic para asignar deporte'}</span>
                      {hasChecked && assigned && (
                        <span>
                          {isCorrect ? (
                            <CheckCircle2 className="w-4 h-4 ml-1" />
                          ) : (
                            <XCircle className="w-4 h-4 ml-1" />
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Controls Footer */}
          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={handleReset}
              className={`px-4 py-2.5 rounded-xl border font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer ${
                isDark
                  ? 'border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 shadow-xs'
              }`}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reiniciar</span>
            </button>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleCheck}
                disabled={Object.keys(matches).length === 0}
                className={`px-6 py-2.5 rounded-xl font-semibold text-xs shadow-md transition-all cursor-pointer ${
                  Object.keys(matches).length === 0
                    ? 'opacity-40 cursor-not-allowed bg-slate-400 text-white'
                    : 'bg-sky-600 hover:bg-sky-500 text-white active:scale-95'
                }`}
              >
                Comprobar respuestas
              </button>

              {isAllCorrect && onNext && (
                <button
                  type="button"
                  onClick={onNext}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 animate-in fade-in"
                >
                  <span>Continuar a Actividad 4</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
