import React, { useState, useEffect } from 'react';
import { Volume2, Square } from 'lucide-react';
import { PEOPLE_CRAZY_ABOUT_SPORTS_STORY, SportsStoryData } from '../../data/peopleCrazyAboutSportsData';
import { speakEnglish, stopSpeaking, playFeedbackSound } from '../../utils/audio';
import { useTheme } from '../../context/ThemeContext';
import { SpeedSelectorButton } from '../SpeedSelectorButton';

interface Sports2StoryCardProps {
  accent?: 'US' | 'UK';
  speechRate?: number;
  story?: SportsStoryData;
  compact?: boolean;
}

export const Sports2StoryCard: React.FC<Sports2StoryCardProps> = ({
  accent = 'US',
  speechRate = 1.0,
  story = PEOPLE_CRAZY_ABOUT_SPORTS_STORY,
  compact = false,
}) => {
  const { isDark } = useTheme();
  const [isFlipped, setIsFlipped] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentRate, setCurrentRate] = useState<number>(speechRate);

  useEffect(() => {
    setCurrentRate(speechRate);
  }, [speechRate]);

  useEffect(() => {
    return () => {
      stopSpeaking();
    };
  }, []);

  const handleToggleFlip = () => {
    playFeedbackSound('flip');
    setIsFlipped((prev) => !prev);
  };

  const handleSpeedChange = (newRate: number) => {
    setCurrentRate(newRate);
    if (isPlaying) {
      stopSpeaking();
      speakEnglish(
        story.audioText,
        newRate,
        accent === 'UK' ? 'UK' : 'US',
        () => setIsPlaying(true),
        () => setIsPlaying(false),
        'female'
      );
    }
  };

  const handleToggleAudio = () => {
    if (isPlaying) {
      stopSpeaking();
      setIsPlaying(false);
      return;
    }

    setIsPlaying(true);
    speakEnglish(
      story.audioText,
      currentRate,
      accent === 'UK' ? 'UK' : 'US',
      () => setIsPlaying(true),
      () => setIsPlaying(false),
      'female'
    );
  };

  const handleSpeakParagraph = (text: string, e: React.MouseEvent) => {
    e.stopPropagation();
    stopSpeaking();
    setIsPlaying(false);
    speakEnglish(
      text,
      currentRate,
      accent === 'UK' ? 'UK' : 'US',
      () => {},
      () => {},
      'female'
    );
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div
        id="sports2-reversible-story-card"
        onClick={handleToggleFlip}
        className={`w-full ${compact ? 'max-w-xl' : 'max-w-3xl'} perspective-1000 cursor-pointer select-none`}
      >
        <div
          className={`grid grid-cols-1 grid-rows-1 transition-transform duration-500 transform-style-3d ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
        >
          {/* Front Face: English Story */}
          <div
            className={`col-start-1 row-start-1 backface-hidden w-full rounded-2xl sm:rounded-3xl border ${
              compact ? 'p-5 sm:p-6' : 'p-6 sm:p-10'
            } shadow-sm transition-colors flex flex-col relative ${
              isDark
                ? 'bg-slate-900 border-slate-800 text-slate-100'
                : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            {/* Audio Controls (Icon-only speaker + Speed Selector) */}
            <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 flex items-center gap-2">
              <SpeedSelectorButton
                currentRate={currentRate}
                onRateChange={handleSpeedChange}
              />
              <button
                id="sports2-story-audio-front-btn"
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggleAudio();
                }}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-xs ${
                  isPlaying
                    ? 'bg-sky-500 text-white ring-4 ring-sky-500/25 scale-105'
                    : isDark
                    ? 'bg-slate-800 hover:bg-slate-700 text-sky-400 border border-slate-700 hover:scale-105'
                    : 'bg-stone-50 hover:bg-stone-100 text-sky-600 border border-stone-200 hover:scale-105'
                }`}
                aria-label="Speaker"
              >
                {isPlaying ? (
                  <Square className="w-4 h-4 fill-current" />
                ) : (
                  <Volume2 className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Title & Author */}
            <div className={`text-center ${compact ? 'mb-4 pr-20' : 'mb-6 pr-24'}`}>
              <h2
                className={`${
                  compact ? 'text-xl sm:text-2xl' : 'text-2xl sm:text-3xl'
                } font-bold tracking-tight text-sky-500 dark:text-sky-400 font-sans`}
              >
                {story.title}
              </h2>
              {story.author && (
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 italic mt-1 font-serif">
                  {story.author}
                </p>
              )}
            </div>

            {/* Paragraphs */}
            <div
              className={`space-y-4 text-left font-serif leading-relaxed ${
                compact ? 'text-sm sm:text-base' : 'text-base sm:text-lg'
              }`}
            >
              {story.paragraphsEn.map((para, idx) => {
                if (idx === 0) {
                  const firstLetter = para.charAt(0);
                  const rest = para.slice(1);
                  return (
                    <p
                      key={idx}
                      onClick={(e) => handleSpeakParagraph(para, e)}
                      className="leading-relaxed hover:text-sky-600 dark:hover:text-sky-300 transition-colors cursor-pointer"
                    >
                      <span className="float-left text-3xl sm:text-4xl font-serif font-bold mr-2 leading-none text-slate-900 dark:text-white">
                        {firstLetter}
                      </span>
                      {rest}
                    </p>
                  );
                }

                return (
                  <p
                    key={idx}
                    onClick={(e) => handleSpeakParagraph(para, e)}
                    className="leading-relaxed hover:text-sky-600 dark:hover:text-sky-300 transition-colors cursor-pointer"
                  >
                    {para}
                  </p>
                );
              })}
            </div>
          </div>

          {/* Back Face: Spanish Translation */}
          <div
            className={`col-start-1 row-start-1 backface-hidden rotate-y-180 w-full rounded-2xl sm:rounded-3xl border ${
              compact ? 'p-5 sm:p-6' : 'p-6 sm:p-10'
            } shadow-sm transition-colors flex flex-col relative ${
              isDark
                ? 'bg-slate-900 border-slate-800 text-slate-100'
                : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            {/* Audio Controls (Icon-only speaker + Speed Selector) */}
            <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 flex items-center gap-2">
              <SpeedSelectorButton
                currentRate={currentRate}
                onRateChange={handleSpeedChange}
              />
              <button
                id="sports2-story-audio-back-btn"
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggleAudio();
                }}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-xs ${
                  isPlaying
                    ? 'bg-sky-500 text-white ring-4 ring-sky-500/25 scale-105'
                    : isDark
                    ? 'bg-slate-800 hover:bg-slate-700 text-sky-400 border border-slate-700 hover:scale-105'
                    : 'bg-stone-50 hover:bg-stone-100 text-sky-600 border border-stone-200 hover:scale-105'
                }`}
                aria-label="Speaker"
              >
                {isPlaying ? (
                  <Square className="w-4 h-4 fill-current" />
                ) : (
                  <Volume2 className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Translation Title & Author */}
            <div className={`text-center ${compact ? 'mb-4 pr-20' : 'mb-6 pr-24'}`}>
              <h2
                className={`${
                  compact ? 'text-xl sm:text-2xl' : 'text-2xl sm:text-3xl'
                } font-bold tracking-tight text-emerald-600 dark:text-emerald-400 font-sans`}
              >
                {story.titleEs}
              </h2>
              {story.authorEs && (
                <p className="text-xs sm:text-sm text-emerald-700/80 dark:text-emerald-300/80 italic mt-1 font-serif">
                  {story.authorEs}
                </p>
              )}
            </div>

            {/* Spanish Paragraphs */}
            <div
              className={`space-y-4 text-left font-serif leading-relaxed italic ${
                compact ? 'text-sm sm:text-base' : 'text-base sm:text-lg'
              }`}
            >
              {story.paragraphsEs.map((para, idx) => {
                if (idx === 0) {
                  const firstLetter = para.charAt(0);
                  const rest = para.slice(1);
                  return (
                    <p key={idx} className="leading-relaxed">
                      <span className="float-left text-3xl sm:text-4xl font-serif font-bold mr-2 leading-none text-emerald-600 dark:text-emerald-400 not-italic">
                        {firstLetter}
                      </span>
                      {rest}
                    </p>
                  );
                }

                return (
                  <p key={idx} className="leading-relaxed">
                    {para}
                  </p>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
