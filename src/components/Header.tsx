import React from 'react';
import { Play, Volume2, Sparkles, BookOpen, Sun, Moon } from 'lucide-react';
import { Unit } from '../types';
import { useTheme } from '../context/ThemeContext';

interface HeaderProps {
  activeUnit: Unit;
  onContinue: () => void;
  accent: 'US' | 'UK';
  onToggleAccent: () => void;
  speechRate: number;
  onChangeSpeechRate: (rate: number) => void;
  completedCount?: number;
  totalUnits?: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeUnit,
  onContinue,
  accent,
  onToggleAccent,
  speechRate,
  onChangeSpeechRate,
}) => {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <header className={`relative w-full border-b shrink-0 transition-colors duration-200 ${
      isDark ? 'bg-[#0F172A] text-white border-white/10' : 'bg-white text-slate-900 border-slate-200 shadow-xs'
    }`}>
      {/* Top Editorial Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Left Branding */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center font-bold text-xs text-white shadow-sm shadow-indigo-600/30 shrink-0">
            EN
          </div>
          <h1 className="text-lg sm:text-xl font-bold tracking-tight flex items-baseline gap-2">
            <span>English at Work</span>
            <span className={`font-serif italic font-normal text-sm sm:text-base ${
              isDark ? 'text-indigo-400' : 'text-indigo-600'
            }`}>
              Interactive Classes
            </span>
          </h1>
        </div>

        {/* Right Status & Controls */}
        <div className="flex items-center gap-2.5 sm:gap-4">
          
          {/* Theme Toggle Button (Light / Dark mode) */}
          <button
            id="theme-toggle-btn"
            onClick={toggleTheme}
            className={`p-2 rounded-xl border transition-all cursor-pointer shadow-xs flex items-center justify-center ${
              isDark
                ? 'border-white/10 bg-white/5 hover:bg-white/10 text-white'
                : 'border-slate-200 bg-slate-100 hover:bg-slate-200/70 text-slate-800'
            }`}
            title={`Cambiar a modo ${isDark ? 'claro' : 'oscuro'}`}
            aria-label={`Cambiar a modo ${isDark ? 'claro' : 'oscuro'}`}
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-600" />
            )}
          </button>

          {/* Pronunciation & Speed Controls */}
          <div className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs ${
            isDark ? 'bg-white/5 border-white/10 text-white/80' : 'bg-slate-100 border-slate-200 text-slate-800'
          }`}>
            <Volume2 className={`w-3.5 h-3.5 ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`} />
            <button
              onClick={onToggleAccent}
              title="Alternar acento de voz"
              className="hover:text-indigo-600 dark:hover:text-indigo-300 font-mono font-medium transition-colors cursor-pointer"
            >
              {accent === 'US' ? 'US 🇺🇸' : 'UK 🇬🇧'}
            </button>
            <span className={isDark ? 'text-white/20' : 'text-slate-300'}>|</span>
            <button
              onClick={() => onChangeSpeechRate(speechRate === 1.0 ? 0.75 : 1.0)}
              title="Velocidad de pronunciación"
              className="hover:text-indigo-600 dark:hover:text-indigo-300 font-mono font-medium transition-colors cursor-pointer"
            >
              {speechRate}x
            </button>
          </div>

          {/* Mobile accent trigger */}
          <button
            onClick={onToggleAccent}
            className={`sm:hidden p-2 rounded-xl border text-xs font-mono ${
              isDark ? 'bg-white/5 border-white/10 text-indigo-300' : 'bg-slate-100 border-slate-200 text-indigo-700'
            }`}
            title="Acento"
          >
            {accent}
          </button>
        </div>
      </div>
    </header>
  );
};
