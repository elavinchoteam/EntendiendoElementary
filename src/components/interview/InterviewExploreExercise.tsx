import React, { useState } from 'react';
import { LessonSentence } from '../../types';
import { speakEnglish, stopSpeaking, playFeedbackSound } from '../../utils/audio';
import { useTheme } from '../../context/ThemeContext';
import { AudioPlayerCard } from '../AudioPlayerCard';
import larrySandraImg from '../../assets/images/larry_sandra_interview.jpg';

interface InterviewExploreExerciseProps {
  audioText: string;
  sentences: LessonSentence[];
  accent?: 'US' | 'UK';
  speechRate?: number;
  onSuccess?: () => void;
}

export const InterviewExploreExercise: React.FC<InterviewExploreExerciseProps> = ({
  audioText,
  sentences = [],
  accent = 'US',
  speechRate = 1.0,
}) => {
  const { isDark } = useTheme();

  // 3D Reversible Flip Card state
  const [isFlipped, setIsFlipped] = useState(false);

  // Active sentence index tracked from AudioPlayerCard
  const [currentSentenceIdx, setCurrentSentenceIdx] = useState<number | null>(null);

  // Individual sentence playing state
  const [individualSentenceIdx, setIndividualSentenceIdx] = useState<number | null>(null);

  // Transcript visibility toggle
  const [isTranscriptVisible, setIsTranscriptVisible] = useState(true);

  const activeIdx = individualSentenceIdx !== null ? individualSentenceIdx : currentSentenceIdx;

  const handleFlipCard = () => {
    playFeedbackSound('flip');
    setIsFlipped((prev) => !prev);
  };

  const handlePlaySentence = (sentenceEn: string, idx: number, e: React.MouseEvent) => {
    e.stopPropagation();

    if (individualSentenceIdx === idx && window.speechSynthesis?.speaking) {
      stopSpeaking();
      setIndividualSentenceIdx(null);
      return;
    }

    stopSpeaking();
    setIndividualSentenceIdx(idx);

    const safeAccent: 'US' | 'UK' = accent === 'UK' ? 'UK' : 'US';
    const isSandra = sentences[idx]?.speaker === 'Sandra';

    speakEnglish(
      sentenceEn,
      speechRate,
      safeAccent,
      () => {
        setIndividualSentenceIdx(idx);
      },
      () => {
        setIndividualSentenceIdx(null);
      },
      isSandra ? 'female' : 'male'
    );
  };

  // Group sentences by dialog turns:
  // Turn 1: Sandra (indices 0, 1, 2, 3, 4, 5)
  // Turn 2: Larry (index 6)
  // Turn 3: Sandra (index 7)
  // Turn 4: Larry (indices 8, 9, 10, 11)
  // Turn 5: Sandra (index 12)
  // Turn 6: Larry (index 13)
  // Turn 7: Sandra (indices 14, 15)
  // Turn 8: Larry (indices 16, 17, 18, 19, 20)

  const dialogTurns = [
    {
      speaker: 'Sandra',
      indices: [0, 1, 2, 3, 4, 5],
    },
    {
      speaker: 'Larry',
      indices: [6],
    },
    {
      speaker: 'Sandra',
      indices: [7],
    },
    {
      speaker: 'Larry',
      indices: [8, 9, 10, 11],
    },
    {
      speaker: 'Sandra',
      indices: [12],
    },
    {
      speaker: 'Larry',
      indices: [13],
    },
    {
      speaker: 'Sandra',
      indices: [14, 15],
    },
    {
      speaker: 'Larry',
      indices: [16, 17, 18, 19, 20],
    },
  ];

  return (
    <div className="w-full flex flex-col items-center gap-6 animate-in fade-in duration-200 py-2 select-none">
      <div className="w-full flex flex-col lg:flex-row gap-6 items-stretch justify-center">
        {/* Left: Audio Player Card (Sandra & Larry with controls & timer 00:00/01:10) */}
        <div className="w-full max-w-[320px] sm:max-w-[340px] mx-auto lg:mx-0 shrink-0 flex flex-col">
          <AudioPlayerCard
            audioText={audioText}
            sentences={sentences}
            accent={accent}
            initialPlaybackRate={speechRate}
            currentSentenceIdx={activeIdx}
            onSentenceChange={(idx) => setCurrentSentenceIdx(idx)}
            onToggleTranscript={() => setIsTranscriptVisible((prev) => !prev)}
            isTranscriptVisible={isTranscriptVisible}
            totalDurationSeconds={70}
            imageSrc={larrySandraImg}
            altText="Sandra Waters interviews inventor Larry Patel"
            speakerGender="female"
          />
        </div>

        {/* Right / Below: 3D Reversible Flip Card containing the Dialogue Text */}
        {isTranscriptVisible && (
          <div className="w-full flex-1 perspective-1000 min-h-[480px] sm:min-h-[520px] flex flex-col">
            <div
              id="interview-lesson-flip-card"
              onClick={handleFlipCard}
              className={`relative w-full h-full min-h-[480px] sm:min-h-[520px] rounded-3xl cursor-pointer shadow-xl transition-transform duration-500 transform-style-3d select-none ${
                isFlipped ? 'rotate-y-180' : ''
              }`}
            >
              {/* ANVERSO / FRONT: English Dialogue Text */}
              <div
                className={`absolute inset-0 w-full h-full rounded-3xl p-6 sm:p-8 flex flex-col justify-between border backface-hidden shadow-xl transition-colors duration-200 overflow-hidden ${
                  isDark
                    ? 'bg-slate-900 border-slate-800 text-slate-100'
                    : 'bg-white border-slate-200 text-slate-900 shadow-md'
                }`}
              >
                {/* Header info */}
                <div className="flex items-center justify-between pb-3 border-b border-inherit/40 text-xs text-sky-600 dark:text-sky-400 font-medium">
                  <span>Interview · Meet the People</span>
                  <span className="text-[11px] opacity-75">Click card to translate</span>
                </div>

                {/* Dialogue Content */}
                <div className="flex-1 overflow-y-auto pr-2 flex flex-col gap-3 py-3">
                  {dialogTurns.map((turn, tIdx) => {
                    const isSandra = turn.speaker === 'Sandra';
                    return (
                      <div key={tIdx} className="text-sm sm:text-base leading-relaxed">
                        <span
                          className={`font-bold mr-2 text-sm sm:text-base ${
                            isSandra
                              ? 'text-sky-600 dark:text-sky-400'
                              : 'text-amber-600 dark:text-amber-400'
                          }`}
                        >
                          {turn.speaker}:
                        </span>
                        {turn.indices.map((sIdx) => {
                          const sent = sentences[sIdx];
                          if (!sent) return null;
                          const isCurrent = activeIdx === sIdx;
                          return (
                            <span
                              key={sIdx}
                              onClick={(e) => handlePlaySentence(sent.en, sIdx, e)}
                              className={`inline cursor-pointer rounded-md px-1 py-0.5 mx-0.5 transition-all duration-150 ${
                                isCurrent
                                  ? 'bg-amber-300 dark:bg-amber-400 text-slate-950 font-bold shadow-xs'
                                  : isDark
                                  ? 'text-slate-100 hover:text-white hover:bg-slate-800'
                                  : 'text-slate-800 hover:text-sky-950 hover:bg-sky-50'
                              }`}
                            >
                              {sent.en}{' '}
                            </span>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* REVERSO / BACK: Spanish Translation */}
              <div
                className={`absolute inset-0 w-full h-full rounded-3xl p-6 sm:p-8 flex flex-col justify-between border backface-hidden rotate-y-180 shadow-xl transition-colors duration-200 overflow-hidden ${
                  isDark
                    ? 'bg-slate-900 border-slate-800 text-slate-100'
                    : 'bg-white border-slate-200 text-slate-900 shadow-md'
                }`}
              >
                {/* Header info */}
                <div className="flex items-center justify-between pb-3 border-b border-inherit/40 text-xs text-sky-600 dark:text-sky-400 font-medium">
                  <span>Traducción en Español · Entrevista</span>
                  <span className="text-[11px] opacity-75">Clic para volver a inglés</span>
                </div>

                {/* Dialogue Translation Content */}
                <div className="flex-1 overflow-y-auto pr-2 flex flex-col gap-3 py-3">
                  {dialogTurns.map((turn, tIdx) => {
                    const isSandra = turn.speaker === 'Sandra';
                    return (
                      <div
                        key={tIdx}
                        className="text-sm sm:text-base leading-relaxed font-serif italic text-slate-800 dark:text-slate-200"
                      >
                        <span
                          className={`font-bold font-sans not-italic mr-2 text-sm sm:text-base ${
                            isSandra
                              ? 'text-sky-600 dark:text-sky-400'
                              : 'text-amber-600 dark:text-amber-400'
                          }`}
                        >
                          {turn.speaker}:
                        </span>
                        {turn.indices.map((sIdx) => {
                          const sent = sentences[sIdx];
                          if (!sent) return null;
                          return (
                            <span key={sIdx} className="inline mr-1">
                              {sent.es}{' '}
                            </span>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
