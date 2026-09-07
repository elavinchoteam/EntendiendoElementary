import React from 'react';
import { Clock, Flag, Activity, Hourglass } from 'lucide-react';
import { UserStats, UnitProgress } from '../types';
import { useTheme } from '../context/ThemeContext';

interface StatsBarProps {
  stats: UserStats;
  totalUnits: number;
}

export const StatsBar: React.FC<StatsBarProps> = ({ stats, totalUnits }) => {
  const { isDark } = useTheme();
  const progressList = Object.values(stats.progress) as UnitProgress[];

  // Calculate completion percentage
  const completedCount = progressList.filter((p) => p.completed).length;
  const completionPercentage = Math.round((completedCount / totalUnits) * 100);

  // Calculate average test score across units that have a score
  const scoredUnits = progressList.filter((p) => p.score > 0);
  const averageScore = scoredUnits.length > 0
    ? Math.round(scoredUnits.reduce((acc, curr) => acc + curr.score, 0) / scoredUnits.length)
    : 100;

  // Format time on task (e.g. 00 : 45)
  const hours = Math.floor(stats.totalStudySeconds / 3600);
  const minutes = Math.floor((stats.totalStudySeconds % 3600) / 60);
  const formattedHours = String(hours).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');

  return (
    <div
      id="stats-ribbon"
      className={`w-full border-b transition-colors duration-200 ${
        isDark ? 'bg-[#111827] border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900 shadow-2xs'
      }`}
    >
      <div className={`max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x ${
        isDark ? 'divide-white/10' : 'divide-slate-200'
      }`}>
        
        {/* Metric 1: Student Status / Expiration */}
        <div className="flex items-center px-4 py-3.5 sm:px-6 sm:py-4 gap-3">
          <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${
            isDark ? 'bg-white/5 border-white/10 text-indigo-400' : 'bg-white border-slate-200 text-indigo-600 shadow-2xs'
          }`}>
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm sm:text-base font-bold tracking-tight">
              Aug 07, 2027
            </div>
            <div className={`text-[11px] font-mono uppercase tracking-wider ${
              isDark ? 'text-slate-300 font-medium' : 'text-slate-600 font-medium'
            }`}>
              Course Access
            </div>
          </div>
        </div>

        {/* Metric 2: Course Completion */}
        <div className="flex items-center px-4 py-3.5 sm:px-6 sm:py-4 gap-3">
          <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${
            isDark ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-emerald-50 border-emerald-200 text-emerald-600 shadow-2xs'
          }`}>
            <Flag className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm sm:text-base font-bold tracking-tight flex items-baseline gap-1.5">
              <span className={isDark ? 'text-emerald-400' : 'text-emerald-600'}>{completionPercentage}%</span>
              <span className={`text-xs ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>({completedCount}/{totalUnits})</span>
            </div>
            <div className={`text-[11px] font-mono uppercase tracking-wider ${
              isDark ? 'text-slate-300 font-medium' : 'text-slate-600 font-medium'
            }`}>
              Completion
            </div>
          </div>
        </div>

        {/* Metric 3: Average Test Score */}
        <div className="flex items-center px-4 py-3.5 sm:px-6 sm:py-4 gap-3">
          <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${
            isDark ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400' : 'bg-indigo-50 border-indigo-200 text-indigo-600 shadow-2xs'
          }`}>
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <div className={`text-sm sm:text-base font-bold tracking-tight ${
              isDark ? 'text-indigo-300' : 'text-indigo-700'
            }`}>
              {averageScore}%
            </div>
            <div className={`text-[11px] font-mono uppercase tracking-wider ${
              isDark ? 'text-slate-300 font-medium' : 'text-slate-600 font-medium'
            }`}>
              Average Score
            </div>
          </div>
        </div>

        {/* Metric 4: Time on Task */}
        <div className="flex items-center px-4 py-3.5 sm:px-6 sm:py-4 gap-3">
          <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${
            isDark ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' : 'bg-amber-50 border-amber-200 text-amber-600 shadow-2xs'
          }`}>
            <Hourglass className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm sm:text-base font-bold font-mono tracking-tight">
              {formattedHours} : {formattedMinutes}
            </div>
            <div className={`text-[11px] font-mono uppercase tracking-wider ${
              isDark ? 'text-slate-300 font-medium' : 'text-slate-600 font-medium'
            }`}>
              Time on Task
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
