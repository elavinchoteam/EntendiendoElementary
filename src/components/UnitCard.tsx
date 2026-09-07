import React from 'react';
import { CheckCircle2, Lock, Sparkles, BookOpen, Volume2, Clock } from 'lucide-react';
import { Unit, UnitProgress } from '../types';
import { useTheme } from '../context/ThemeContext';

interface UnitCardProps {
  unit: Unit;
  progress?: UnitProgress;
  isActive: boolean;
  isUnlocked: boolean;
  onSelect: (unit: Unit) => void;
  onQuickAudio?: (text: string) => void;
}

export const UnitCard: React.FC<UnitCardProps> = ({
  unit,
  progress,
  isActive,
  isUnlocked,
  onSelect,
}) => {
  const { isDark } = useTheme();
  const isCompleted = progress?.completed || false;
  const score = progress?.score || 0;
  const cardsCount = unit.flashcards?.length || 0;
  const exercisesCount = unit.exercises?.length || 0;
  const sectionsCount = unit.sections?.length || 0;
  const hasContent = cardsCount > 0 || Boolean(unit.lessonText) || sectionsCount > 0;

  const formattedNumber = String(unit.number).padStart(2, '0');

  return (
    <div
      id={`unit-card-${unit.number}`}
      onClick={() => isUnlocked && onSelect(unit)}
      className={`group relative flex flex-col rounded-2xl overflow-hidden border transition-all duration-300 ${
        isActive
          ? isDark
            ? 'bg-indigo-600/25 border-2 border-indigo-400 shadow-[0_0_30px_rgba(79,70,229,0.25)] scale-[1.01]'
            : 'bg-white border-2 border-indigo-600 ring-4 ring-indigo-50 shadow-md scale-[1.01]'
          : isCompleted
          ? isDark
            ? 'bg-white/5 border border-white/10 hover:border-emerald-500/70 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] cursor-pointer'
            : 'bg-white border-slate-200 hover:border-emerald-500 hover:shadow-md cursor-pointer'
          : isUnlocked
          ? isDark
            ? 'bg-white/5 border border-white/10 hover:border-indigo-400/70 hover:shadow-[0_0_25px_rgba(99,102,241,0.15)] cursor-pointer'
            : 'bg-white border-slate-200 hover:border-indigo-500 hover:shadow-md cursor-pointer'
          : isDark
          ? 'bg-white/5 border border-white/10 opacity-50 cursor-not-allowed'
          : 'bg-slate-100/70 border-slate-200 opacity-60 cursor-not-allowed'
      }`}
    >
      {/* Thumbnail Image Container */}
      <div className="relative aspect-16/9 w-full overflow-hidden bg-slate-900">
        <img
          src={unit.imageUrl}
          alt={unit.title}
          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
            !isUnlocked ? 'grayscale contrast-75 opacity-60' : 'opacity-85'
          }`}
          loading="lazy"
        />
        
        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Status Badges Overlay */}
        {isCompleted && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex flex-col items-center justify-center text-white animate-in fade-in duration-200">
            <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/90 border border-emerald-400 rounded-full shadow-lg text-[11px] font-bold tracking-wider uppercase font-mono">
              <CheckCircle2 className="w-3.5 h-3.5 text-white" />
              <span>Completed</span>
            </div>
            {score > 0 && (
              <span className="mt-1 text-xs font-mono text-emerald-300 font-semibold">
                Score: {score}%
              </span>
            )}
          </div>
        )}

        {/* Lock Overlay if locked */}
        {!isUnlocked && !isCompleted && (
          <div className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-black/70 backdrop-blur-xs flex items-center justify-center text-white/70 border border-white/10">
            <Lock className="w-3.5 h-3.5" />
          </div>
        )}

        {/* Active badge */}
        {isActive && !isCompleted && (
          <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-md bg-indigo-600 border border-indigo-400 text-white text-[10px] font-bold tracking-widest uppercase font-mono shadow-sm">
            Active Session
          </div>
        )}

        {/* Category & Cards count Pill */}
        <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/60 backdrop-blur-xs text-[10px] font-mono text-white/90 border border-white/10">
          {sectionsCount > 0
            ? `${sectionsCount} Secciones · Phone Sales, Wrong Color...`
            : hasContent
            ? `${cardsCount} cards · ${exercisesCount} exercises`
            : 'Esperando contenido'}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex flex-col flex-1 justify-between text-left">
        <div>
          <div className="flex items-start justify-between gap-2 mb-1.5">
            {/* Unit Number - large editorial numerals */}
            <span className={`text-3xl sm:text-4xl font-black font-sans leading-none ${
              isActive
                ? isDark ? 'text-indigo-400' : 'text-indigo-600'
                : isDark
                ? 'text-white/20 group-hover:text-white/40'
                : 'text-slate-300 group-hover:text-slate-400'
            }`}>
              {formattedNumber}
            </span>

            {/* Status tag */}
            <div className="text-[10px] uppercase font-mono font-bold tracking-wider mt-1">
              {isActive ? (
                <span className={isDark ? 'text-indigo-400' : 'text-indigo-600'}>Active</span>
              ) : isCompleted ? (
                <span className={isDark ? 'text-emerald-400' : 'text-emerald-600'}>Completed</span>
              ) : hasContent ? (
                <span className={isDark ? 'text-white/40 group-hover:text-white/70' : 'text-slate-500 group-hover:text-slate-800'}>Ready</span>
              ) : (
                <span className={isDark ? 'text-white/25' : 'text-slate-400'}>Pendiente</span>
              )}
            </div>
          </div>

          {/* Unit Title */}
          <h2 className={`text-base sm:text-lg font-bold tracking-tight leading-snug transition-colors ${
            isDark ? 'text-white group-hover:text-indigo-200' : 'text-slate-900 group-hover:text-indigo-600'
          }`}>
            {unit.title}
          </h2>

          {/* Spanish subtitle */}
          <p className={`text-xs italic mt-0.5 line-clamp-1 font-serif ${
            isDark ? 'text-white/50' : 'text-slate-500'
          }`}>
            {unit.titleEs}
          </p>
        </div>

        {/* Progress bar line */}
        <div className={`mt-4 pt-3 border-t ${
          isDark ? 'border-white/10' : 'border-slate-200'
        }`}>
          <div className={`w-full h-1.5 rounded-full overflow-hidden ${
            isDark ? 'bg-white/10' : 'bg-slate-100'
          }`}>
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                isCompleted
                  ? 'bg-emerald-500 w-full'
                  : (progress?.exercisesFinished || 0) > 0
                  ? 'bg-indigo-600'
                  : 'bg-transparent'
              }`}
              style={{
                width: isCompleted
                  ? '100%'
                  : `${Math.min(
                      100,
                      ((progress?.exercisesFinished || 0) / (unit.exercises.length || 1)) * 100
                    )}%`,
              }}
            />
          </div>

          <div className="mt-2.5 flex items-center justify-between text-[11px] font-mono">
            <span className={isDark ? 'text-white/40' : 'text-slate-400'}>
              {isCompleted
                ? '100% Finalizado'
                : (progress?.exercisesFinished || 0) > 0
                ? `${progress?.exercisesFinished}/${unit.exercises.length} ejer.`
                : hasContent
                ? 'Sin iniciar'
                : 'Pendiente'}
            </span>
            <span className={`font-semibold transition-colors ${
              isUnlocked
                ? isDark
                  ? 'text-indigo-400 group-hover:text-indigo-300'
                  : 'text-indigo-600 group-hover:text-indigo-700'
                : isDark
                ? 'text-white/20'
                : 'text-slate-400'
            }`}>
              {isUnlocked ? (hasContent ? 'Explorar →' : 'Ver info →') : 'Bloqueado'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
