import React, { useState, useRef, useEffect } from 'react';
import { Volume2, Gauge, Check, Square } from 'lucide-react';
import { speakEnglish, stopSpeaking, playFeedbackSound } from '../utils/audio';
import { useTheme } from '../context/ThemeContext';
import { PLAYBACK_SPEEDS, formatSpeedLabel } from './AudioPlayerCard';

interface CardSpeechControlProps {
  textToSpeak: string;
  accent?: 'US' | 'UK';
  initialSpeed?: number;
  gender?: 'female' | 'male';
  size?: 'sm' | 'md';
  className?: string;
}

export const CardSpeechControl: React.FC<CardSpeechControlProps> = ({
  textToSpeak,
  accent = 'US',
  initialSpeed = 1.0,
  gender = 'female',
  size = 'md',
  className = '',
}) => {
  const { isDark } = useTheme();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSpeed, setCurrentSpeed] = useState<number>(initialSpeed);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const safeAccent: 'US' | 'UK' = accent === 'UK' ? 'UK' : 'US';
  const safeGender: 'female' | 'male' = gender === 'male' ? 'male' : 'female';

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) {
      window.addEventListener('click', handleClickOutside);
    }
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [isMenuOpen]);

  const handleToggleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPlaying) {
      stopSpeaking();
      setIsPlaying(false);
      return;
    }
    playFeedbackSound('click');
    speakEnglish(
      textToSpeak,
      currentSpeed,
      safeAccent,
      () => setIsPlaying(true),
      () => setIsPlaying(false),
      safeGender
    );
  };

  const handleSelectSpeed = (speedValue: number, e: React.MouseEvent) => {
    e.stopPropagation();
    playFeedbackSound('click');
    setCurrentSpeed(speedValue);
    setIsMenuOpen(false);
    if (isPlaying) {
      stopSpeaking();
      speakEnglish(
        textToSpeak,
        speedValue,
        safeAccent,
        () => setIsPlaying(true),
        () => setIsPlaying(false),
        safeGender
      );
    }
  };

  const isSmall = size === 'sm';

  return (
    <div
      className={`relative inline-flex items-center gap-1.5 ${className}`}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Speaker Button */}
      <button
        type="button"
        onClick={handleToggleSpeak}
        title={isPlaying ? 'Detener lectura' : 'Escuchar en inglés'}
        className={`rounded-xl flex items-center justify-center transition-all cursor-pointer shadow-xs ${
          isSmall ? 'w-8 h-8' : 'w-9 h-9'
        } ${
          isPlaying
            ? 'bg-emerald-600 text-white ring-2 ring-emerald-400'
            : isDark
            ? 'bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-slate-700'
            : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200'
        }`}
      >
        {isPlaying ? (
          <Square className={isSmall ? 'w-3.5 h-3.5 fill-current' : 'w-4 h-4 fill-current'} />
        ) : (
          <Volume2 className={isSmall ? 'w-4 h-4' : 'w-4.5 h-4.5'} />
        )}
      </button>

      {/* Speed Dial Menu Button */}
      <div className="relative" ref={menuRef}>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsMenuOpen((prev) => !prev);
          }}
          title="Cambiar velocidad de audio"
          className={`rounded-xl font-mono font-semibold flex items-center gap-1 transition-all cursor-pointer border ${
            isSmall ? 'h-8 px-2 text-[11px]' : 'h-9 px-2.5 text-xs'
          } ${
            isMenuOpen
              ? 'bg-emerald-600 text-white border-emerald-500'
              : isDark
              ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
          }`}
        >
          <Gauge className={isSmall ? 'w-3 h-3 text-emerald-400' : 'w-3.5 h-3.5 text-emerald-400'} />
          <span>{formatSpeedLabel(currentSpeed)}</span>
        </button>

        {/* Speed Selector Popup */}
        {isMenuOpen && (
          <div
            className={`absolute z-50 top-full mt-1.5 right-0 min-w-[100px] py-1.5 rounded-xl border shadow-xl animate-in fade-in zoom-in-95 duration-150 ${
              isDark
                ? 'bg-slate-900 border-slate-700 text-slate-100'
                : 'bg-white border-slate-200 text-slate-800 shadow-slate-300/50'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className={`px-3 py-1 text-[10px] font-mono font-bold tracking-wider uppercase border-b ${
                isDark ? 'text-slate-400 border-slate-800' : 'text-slate-500 border-slate-100'
              }`}
            >
              Velocidad
            </div>
            {PLAYBACK_SPEEDS.map((sp) => {
              const isSelected = Math.abs(sp.value - currentSpeed) < 0.01;
              return (
                <button
                  key={sp.value}
                  type="button"
                  onClick={(e) => handleSelectSpeed(sp.value, e)}
                  className={`w-full px-3 py-1.5 text-xs font-mono font-medium flex items-center justify-between transition-colors cursor-pointer text-left ${
                    isSelected
                      ? 'bg-emerald-600 text-white font-bold'
                      : isDark
                      ? 'hover:bg-slate-800 text-slate-200'
                      : 'hover:bg-emerald-50 text-slate-700'
                  }`}
                >
                  <span>{sp.label}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
