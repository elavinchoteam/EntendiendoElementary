import React, { useState, useEffect } from 'react';
import { Volume2, Square, Pause } from 'lucide-react';
import { ReadingStory } from '../types';
import { speakEnglish, stopSpeaking, playFeedbackSound } from '../utils/audio';
import { useTheme } from '../context/ThemeContext';
import { SpeedSelectorButton } from './SpeedSelectorButton';

interface ReadingStoryCardProps {
  story: ReadingStory;
  accent?: 'US' | 'UK';
  speechRate?: number;
}

export const ReadingStoryCard: React.FC<ReadingStoryCardProps> = ({
  story,
  accent = 'US',
  speechRate = 1.0,
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
      const fullText = story.audioText || story.paragraphsEn.join(' ');
      speakEnglish(
        fullText,
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

    const fullText = story.audioText || story.paragraphsEn.join(' ');
    setIsPlaying(true);

    speakEnglish(
      fullText,
      currentRate,
      accent === 'UK' ? 'UK' : 'US',
      () => {
        setIsPlaying(true);
      },
      () => {
        setIsPlaying(false);
      },
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
      {/* 3D Reversible Story Card */}
      <div
        id="reading-story-reversible-card"
        onClick={handleToggleFlip}
        className="w-full max-w-3xl perspective-1000 cursor-pointer select-none"
      >
        <div
          className={`grid grid-cols-1 grid-rows-1 transition-transform duration-500 transform-style-3d ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
        >
          {/* Front Face: English Story */}
          <div
            className={`col-start-1 row-start-1 backface-hidden w-full rounded-2xl sm:rounded-3xl border p-6 sm:p-10 shadow-lg transition-colors flex flex-col relative ${
              isDark
                ? 'bg-[#151C33] border-slate-700/80 text-slate-100'
                : 'bg-[#FCFBF8] border-stone-200/90 text-stone-900 shadow-stone-200/50'
            }`}
          >
            {/* Audio Button and Speed Selector */}
            <div className="absolute top-5 right-5 sm:top-6 sm:right-6 z-20 flex items-center gap-2">
              <SpeedSelectorButton
                currentRate={currentRate}
                onRateChange={handleSpeedChange}
              />
              <button
                id="reading-story-audio-btn-front"
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggleAudio();
                }}
                className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-md ${
                  isPlaying
                    ? 'bg-sky-500 text-white ring-4 ring-sky-500/25 scale-105'
                    : isDark
                    ? 'bg-slate-800/90 hover:bg-slate-700 text-sky-400 border border-slate-600 hover:scale-105'
                    : 'bg-white hover:bg-stone-100 text-sky-600 border border-stone-300 hover:scale-105'
                }`}
                aria-label="Audio"
                title={isPlaying ? 'Detener lectura' : 'Escuchar historia'}
              >
                {isPlaying ? (
                  <Square className="w-4 h-4 fill-current" />
                ) : (
                  <Volume2 className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Story Title */}
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-center text-sky-500 dark:text-sky-400 mb-6 sm:mb-8 font-sans pr-24 sm:pr-28">
              {story.title}
            </h1>

            {/* Story Paragraphs */}
            <div className="space-y-4 sm:space-y-5 text-left font-serif leading-relaxed text-base sm:text-lg">
              {story.paragraphsEn.map((para, idx) => {
                if (idx === 0) {
                  const firstLetter = para.charAt(0);
                  const restOfPara = para.slice(1);
                  return (
                    <p
                      key={idx}
                      onClick={(e) => handleSpeakParagraph(para, e)}
                      className="leading-relaxed hover:text-sky-600 dark:hover:text-sky-300 transition-colors cursor-pointer"
                      title="Haz clic para pronunciar este párrafo"
                    >
                      <span className="float-left text-4xl sm:text-5xl font-serif font-bold mr-2 leading-none text-slate-900 dark:text-white">
                        {firstLetter}
                      </span>
                      {restOfPara}
                    </p>
                  );
                }

                return (
                  <p
                    key={idx}
                    onClick={(e) => handleSpeakParagraph(para, e)}
                    className="leading-relaxed hover:text-sky-600 dark:hover:text-sky-300 transition-colors cursor-pointer"
                    title="Haz clic para pronunciar este párrafo"
                  >
                    {para}
                  </p>
                );
              })}
            </div>
          </div>

          {/* Back Face: Spanish Translation */}
          <div
            className={`col-start-1 row-start-1 backface-hidden rotate-y-180 w-full rounded-2xl sm:rounded-3xl border p-6 sm:p-10 shadow-lg transition-colors flex flex-col relative ${
              isDark
                ? 'bg-slate-900 border-emerald-500/40 text-white'
                : 'bg-white border-slate-200 text-slate-900 shadow-md'
            }`}
          >
            {/* Audio Button and Speed Selector */}
            <div className="absolute top-5 right-5 sm:top-6 sm:right-6 z-20 flex items-center gap-2">
              <SpeedSelectorButton
                currentRate={currentRate}
                onRateChange={handleSpeedChange}
              />
              <button
                id="reading-story-audio-btn-back"
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggleAudio();
                }}
                className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-md ${
                  isPlaying
                    ? 'bg-sky-500 text-white ring-4 ring-sky-500/25 scale-105'
                    : isDark
                    ? 'bg-slate-800/90 hover:bg-slate-700 text-sky-400 border border-slate-600 hover:scale-105'
                    : 'bg-white hover:bg-stone-100 text-sky-600 border border-stone-300 hover:scale-105'
                }`}
                aria-label="Audio"
                title={isPlaying ? 'Detener lectura' : 'Escuchar historia'}
              >
                {isPlaying ? (
                  <Square className="w-4 h-4 fill-current" />
                ) : (
                  <Volume2 className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Translation Title */}
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-center text-sky-600 dark:text-sky-400 mb-6 sm:mb-8 font-sans">
              {story.titleEs}
            </h1>

            {/* Spanish Paragraphs */}
            <div className="space-y-4 sm:space-y-5 text-left font-serif leading-relaxed text-base sm:text-lg italic">
              {story.paragraphsEs.map((para, idx) => {
                if (idx === 0) {
                  const firstLetter = para.charAt(0);
                  const restOfPara = para.slice(1);
                  return (
                    <p key={idx} className="leading-relaxed">
                      <span className="float-left text-4xl sm:text-5xl font-serif font-bold mr-2 leading-none text-emerald-600 dark:text-emerald-400 not-italic">
                        {firstLetter}
                      </span>
                      {restOfPara}
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
