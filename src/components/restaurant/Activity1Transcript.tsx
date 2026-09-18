import React, { useState } from 'react';
import { Volume2 } from 'lucide-react';
import {
  RESTAURANT_DIALOGUE_TURNS,
  RESTAURANT_FULL_AUDIO_TEXT,
  RestaurantDialogueTurn,
} from '../../data/inTheRestaurantData';
import { RestaurantVideoPlayer } from '../RestaurantVideoPlayer';
import { useTheme } from '../../context/ThemeContext';
import { speakEnglish, stopSpeaking, playFeedbackSound } from '../../utils/audio';

export interface Activity1TranscriptProps {
  accent?: 'US' | 'UK';
  speechRate?: number;
}

export const Activity1Transcript: React.FC<Activity1TranscriptProps> = ({
  accent = 'US',
  speechRate = 1.0,
}) => {
  const { isDark } = useTheme();
  const [isFlipped, setIsFlipped] = useState(false);
  const [playingTurnId, setPlayingTurnId] = useState<string | null>(null);

  const handlePlayFull = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (playingTurnId === 'all' && window.speechSynthesis?.speaking) {
      stopSpeaking();
      setPlayingTurnId(null);
      return;
    }
    stopSpeaking();
    setPlayingTurnId('all');
    speakEnglish(
      RESTAURANT_FULL_AUDIO_TEXT,
      speechRate,
      accent === 'UK' ? 'UK' : 'US',
      () => setPlayingTurnId('all'),
      () => setPlayingTurnId(null)
    );
  };

  const handlePlayTurn = (turn: RestaurantDialogueTurn, e: React.MouseEvent) => {
    e.stopPropagation();
    if (playingTurnId === turn.id && window.speechSynthesis?.speaking) {
      stopSpeaking();
      setPlayingTurnId(null);
      return;
    }
    stopSpeaking();
    setPlayingTurnId(turn.id);
    const gender = turn.speaker === 'Waiter' ? 'male' : 'female';
    speakEnglish(
      turn.en,
      speechRate,
      accent === 'UK' ? 'UK' : 'US',
      () => setPlayingTurnId(turn.id),
      () => setPlayingTurnId(null),
      gender
    );
  };

  return (
    <div className="w-full flex flex-col lg:flex-row gap-6 items-start">
      {/* Left Column: Video Player */}
      <div className="w-full lg:w-1/2">
        <RestaurantVideoPlayer
          highlightedTurnIds={['turn-1']}
          showTranscriptByDefault={false}
          accent={accent}
          speechRate={speechRate}
        />
      </div>

      {/* Right Column: Reversible Transcript Card */}
      <div className="w-full lg:w-1/2 perspective-1000">
        <div
          onClick={() => {
            playFeedbackSound('flip');
            setIsFlipped(!isFlipped);
          }}
          className={`relative w-full min-h-[580px] rounded-2xl cursor-pointer select-none transition-transform duration-500 transform-style-3d border shadow-xs ${
            isFlipped ? 'rotate-y-180' : ''
          } ${isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'}`}
        >
          {/* Front: English Transcript */}
          <div className="absolute inset-0 p-5 sm:p-6 flex flex-col justify-between backface-hidden overflow-hidden">
            {/* Header with speaker button */}
            <div className="flex items-center justify-between pb-3 border-b border-inherit/40 shrink-0">
              <span className="font-semibold text-sm sm:text-base text-slate-900 dark:text-white">
                In the Restaurant
              </span>

              <button
                type="button"
                onClick={handlePlayFull}
                className={`p-2 rounded-xl border transition-all cursor-pointer ${
                  playingTurnId === 'all'
                    ? 'bg-sky-500 text-white border-sky-400 ring-2 ring-sky-300'
                    : isDark
                    ? 'bg-slate-800 hover:bg-slate-700 text-sky-300 border-slate-700'
                    : 'bg-sky-50 hover:bg-sky-100 text-sky-600 border-sky-200'
                }`}
                aria-label="Audio"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            {/* Dialogue turns list */}
            <div className="flex-1 my-3 overflow-y-auto space-y-2.5 pr-1 text-sm sm:text-base">
              {RESTAURANT_DIALOGUE_TURNS.map((turn) => {
                const isCurrent = playingTurnId === turn.id;
                return (
                  <div
                    key={turn.id}
                    onClick={(e) => handlePlayTurn(turn, e)}
                    className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-start gap-2.5 ${
                      isCurrent
                        ? isDark
                          ? 'bg-sky-950/60 border-sky-500 text-white ring-1 ring-sky-400'
                          : 'bg-sky-50 border-sky-400 text-slate-900 ring-1 ring-sky-300'
                        : isDark
                        ? 'bg-slate-800/40 border-slate-700 hover:bg-slate-800/80 text-slate-200'
                        : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-800'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={(e) => handlePlayTurn(turn, e)}
                      className={`p-1 rounded-lg border shrink-0 ${
                        isCurrent
                          ? 'bg-sky-500 text-white border-sky-400'
                          : isDark
                          ? 'bg-slate-700 text-sky-300 border-slate-600'
                          : 'bg-white text-sky-600 border-slate-300'
                      }`}
                      aria-label="Audio"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                    <p className="leading-relaxed">
                      <span
                        className={`font-bold mr-1.5 ${
                          turn.speaker === 'Waiter'
                            ? 'text-sky-600 dark:text-sky-400'
                            : turn.speaker === 'Sara'
                            ? 'text-amber-600 dark:text-amber-400'
                            : 'text-emerald-600 dark:text-emerald-400'
                        }`}
                      >
                        {turn.speaker}:
                      </span>
                      {turn.en}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="pt-2 border-t border-inherit/30 flex justify-end text-xs text-slate-500 dark:text-slate-400 shrink-0">
              <span>{RESTAURANT_DIALOGUE_TURNS.length} intervenciones</span>
            </div>
          </div>

          {/* Back: Spanish Translation */}
          <div className="absolute inset-0 p-5 sm:p-6 flex flex-col justify-between backface-hidden rotate-y-180 overflow-hidden">
            <div className="flex items-center justify-between pb-3 border-b border-inherit/40 shrink-0">
              <span className="font-semibold text-sm sm:text-base text-slate-900 dark:text-white">
                En el Restaurante (Español)
              </span>
            </div>

            <div className="flex-1 my-3 overflow-y-auto space-y-2.5 pr-1 text-sm sm:text-base">
              {RESTAURANT_DIALOGUE_TURNS.map((turn) => (
                <div
                  key={turn.id}
                  className={`p-2.5 rounded-xl border text-sm ${
                    isDark
                      ? 'bg-slate-800/40 border-slate-700 text-slate-200'
                      : 'bg-slate-50 border-slate-200 text-slate-800'
                  }`}
                >
                  <p className="leading-relaxed">
                    <span
                      className={`font-bold mr-1.5 ${
                        turn.speaker === 'Waiter'
                          ? 'text-sky-600 dark:text-sky-400'
                          : turn.speaker === 'Sara'
                          ? 'text-amber-600 dark:text-amber-400'
                          : 'text-emerald-600 dark:text-emerald-400'
                      }`}
                    >
                      {turn.speakerEs}:
                    </span>
                    {turn.es}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-inherit/30 flex justify-end text-xs text-slate-500 dark:text-slate-400 shrink-0">
              <span>Traducción contextual</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
