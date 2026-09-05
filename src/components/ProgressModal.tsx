import React from 'react';
import { X, Trophy, CheckCircle2, RotateCcw, Unlock, BookOpen, Star } from 'lucide-react';
import { Unit, UserStats, UnitProgress } from '../types';
import { useTheme } from '../context/ThemeContext';

interface ProgressModalProps {
  units: Unit[];
  stats: UserStats;
  onClose: () => void;
  onResetProgress: () => void;
  onUnlockAll: () => void;
  isAllUnlocked: boolean;
}

export const ProgressModal: React.FC<ProgressModalProps> = ({
  units,
  stats,
  onClose,
  onResetProgress,
  onUnlockAll,
  isAllUnlocked,
}) => {
  const { isDark } = useTheme();
  const progressList = Object.values(stats.progress) as UnitProgress[];
  const completedCount = progressList.filter((p) => p.completed).length;
  const percentage = Math.round((completedCount / units.length) * 100);
  const totalMasteredCards = progressList.reduce(
    (acc, p) => acc + (p.masteredCards?.length || 0),
    0
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div
        className={`relative w-full max-w-2xl rounded-2xl shadow-2xl border overflow-hidden flex flex-col max-h-[90vh] transition-colors duration-200 ${
          isDark ? 'bg-[#0F172A] text-white border-white/10' : 'bg-white text-slate-900 border-slate-200'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`px-6 py-4 flex items-center justify-between border-b ${
          isDark ? 'bg-[#111827] text-white border-white/10' : 'bg-slate-50 text-slate-900 border-slate-200'
        }`}>
          <div className="flex items-center gap-2.5">
            <Trophy className="w-5 h-5 text-amber-500" />
            <h2 className="text-base sm:text-lg font-bold">Progreso en el Curso</h2>
          </div>
          <button
            onClick={onClose}
            className={`p-1.5 rounded-xl transition-colors cursor-pointer border ${
              isDark
                ? 'text-white/50 hover:text-white hover:bg-white/10 border-transparent'
                : 'text-slate-400 hover:text-slate-700 hover:bg-slate-200 border-transparent'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* Summary Banner */}
          <div className={`grid grid-cols-3 gap-3 p-4 rounded-xl border text-center font-mono ${
            isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'
          }`}>
            <div>
              <div className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${
                isDark ? 'text-indigo-400' : 'text-indigo-600'
              }`}>
                {percentage}%
              </div>
              <div className={`text-[11px] uppercase tracking-wider mt-0.5 ${
                isDark ? 'text-white/50' : 'text-slate-500'
              }`}>Completado</div>
            </div>
            <div>
              <div className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${
                isDark ? 'text-indigo-400' : 'text-indigo-600'
              }`}>
                {completedCount}/{units.length}
              </div>
              <div className={`text-[11px] uppercase tracking-wider mt-0.5 ${
                isDark ? 'text-white/50' : 'text-slate-500'
              }`}>Unidades</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-500 tracking-tight">
                {totalMasteredCards}
              </div>
              <div className={`text-[11px] uppercase tracking-wider mt-0.5 ${
                isDark ? 'text-white/50' : 'text-slate-500'
              }`}>Dominadas</div>
            </div>
          </div>

          {/* Unit by Unit list */}
          <div>
            <h4 className={`text-xs font-mono font-bold uppercase tracking-widest mb-3 ${
              isDark ? 'text-white/40' : 'text-slate-400'
            }`}>
              Desglose de las 12 Unidades
            </h4>
            <div className="space-y-2">
              {units.map((unit) => {
                const prog = stats.progress[unit.id];
                const isCompleted = prog?.completed;
                const isUnlocked = isAllUnlocked || stats.unlockedUnits.includes(unit.id);
                const hasCards = unit.flashcards && unit.flashcards.length > 0;

                return (
                  <div
                    key={unit.id}
                    className={`p-3 rounded-xl border flex items-center justify-between transition-colors ${
                      isCompleted
                        ? isDark
                          ? 'border-emerald-500/40 bg-emerald-500/10'
                          : 'border-emerald-300 bg-emerald-50'
                        : isUnlocked
                        ? isDark
                          ? 'border-white/10 bg-white/5'
                          : 'border-slate-200 bg-white'
                        : isDark
                        ? 'border-white/5 bg-white/5 opacity-50'
                        : 'border-slate-100 bg-slate-50 opacity-60'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono text-xs font-bold ${
                        isCompleted
                          ? 'bg-emerald-500 text-white'
                          : isDark ? 'bg-white/10 text-white/80' : 'bg-slate-200 text-slate-700'
                      }`}>
                        {unit.number}
                      </span>
                      <div>
                        <div className="text-xs sm:text-sm font-semibold flex items-center gap-1.5">
                          <span>{unit.title}</span>
                          {!hasCards && !unit.lessonText && (
                            <span className={`text-[10px] font-mono font-normal ${
                              isDark ? 'text-white/40' : 'text-slate-400'
                            }`}>
                              (Esperando contenido)
                            </span>
                          )}
                        </div>
                        <div className={`text-[11px] italic font-serif ${
                          isDark ? 'text-white/40' : 'text-slate-500'
                        }`}>
                          {unit.titleEs}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {isCompleted ? (
                        <div className="flex items-center gap-1 text-emerald-600 font-mono text-xs font-bold">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>{prog?.score || 100}%</span>
                        </div>
                      ) : (
                        <span className={`text-xs font-mono ${isDark ? 'text-white/40' : 'text-slate-400'}`}>
                          {isUnlocked ? (hasCards ? 'En curso' : 'Listo') : 'Bloqueado'}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action buttons */}
          <div className={`pt-4 border-t flex flex-wrap items-center justify-between gap-3 ${
            isDark ? 'border-white/10' : 'border-slate-200'
          }`}>
            <button
              onClick={onResetProgress}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono transition-colors cursor-pointer ${
                isDark
                  ? 'text-white/50 hover:text-rose-400 hover:bg-rose-500/10'
                  : 'text-slate-500 hover:text-rose-600 hover:bg-rose-50'
              }`}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reiniciar Progreso</span>
            </button>

            <button
              onClick={onUnlockAll}
              disabled={isAllUnlocked}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                isAllUnlocked
                  ? isDark
                    ? 'bg-white/5 text-white/30 border border-white/5 cursor-not-allowed'
                    : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
                  : isDark
                  ? 'bg-indigo-600 hover:bg-indigo-500 text-white border border-indigo-400'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white'
              }`}
            >
              <Unlock className="w-3.5 h-3.5" />
              <span>{isAllUnlocked ? 'Todas Desbloqueadas' : 'Desbloquear Todo'}</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
