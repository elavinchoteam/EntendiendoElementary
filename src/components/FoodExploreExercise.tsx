import React, { useState } from 'react';
import { LessonSentence } from '../types';
import { speakEnglish, stopSpeaking, playFeedbackSound } from '../utils/audio';
import { useTheme } from '../context/ThemeContext';
import { AudioPlayerCard } from './AudioPlayerCard';
import sheilaKitchenImg from '../assets/images/sheila_kitchen_salad_1788913662919.jpg';

interface FoodExploreExerciseProps {
  audioText: string;
  sentences: LessonSentence[];
  accent?: 'US' | 'UK';
  speechRate?: number;
  onSuccess?: () => void;
}

export const FoodExploreExercise: React.FC<FoodExploreExerciseProps> = ({
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
      'female'
    );
  };

  // Split sentences by speaker
  // Indices 0, 1, 2 are Announcer
  // Indices 3 to 14 are Sheila
  const announcerSentences = sentences
    .map((s, idx) => ({ ...s, originalIndex: idx }))
    .filter((s) => s.speaker === 'Announcer' || s.originalIndex < 3);

  const sheilaSentences = sentences
    .map((s, idx) => ({ ...s, originalIndex: idx }))
    .filter((s) => s.speaker === 'Sheila' || s.originalIndex >= 3);

  return (
    <div className="w-full flex flex-col items-center gap-6 animate-in fade-in duration-200 py-2 select-none">
      <div className="w-full flex flex-col lg:flex-row gap-6 items-stretch justify-center">
        {/* Left: Audio Player Card (Sheila in the kitchen with controls & timer 00:00/01:05) */}
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
            totalDurationSeconds={65}
            imageSrc={sheilaKitchenImg}
            altText="Sheila in the kitchen preparing healthy salads"
            speakerGender="female"
          />
        </div>

        {/* Right / Below: 3D Reversible Flip Card containing the Dialogue Text */}
        {isTranscriptVisible && (
          <div className="w-full flex-1 perspective-1000 min-h-[480px] sm:min-h-[520px] flex flex-col">
            <div
              id="food-lesson-flip-card"
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
                {/* Dialogue Content */}
                <div className="flex-1 overflow-y-auto pr-1 flex flex-col justify-center gap-6">
                  {/* Announcer Dialogue Block */}
                  <div className="text-base sm:text-lg md:text-[18px] leading-relaxed sm:leading-loose">
                    <span className="font-bold text-sky-600 dark:text-sky-400 mr-2 text-base sm:text-lg">
                      Announcer:
                    </span>
                    {announcerSentences.map((sent) => {
                      const isCurrent = activeIdx === sent.originalIndex;
                      return (
                        <span
                          key={sent.originalIndex}
                          onClick={(e) => handlePlaySentence(sent.en, sent.originalIndex, e)}
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

                  {/* Sheila Dialogue Block */}
                  <div className="text-base sm:text-lg md:text-[18px] leading-relaxed sm:leading-loose">
                    <span className="font-bold text-sky-600 dark:text-sky-400 mr-2 text-base sm:text-lg">
                      Sheila:
                    </span>
                    {sheilaSentences.map((sent) => {
                      const isCurrent = activeIdx === sent.originalIndex;
                      return (
                        <span
                          key={sent.originalIndex}
                          onClick={(e) => handlePlaySentence(sent.en, sent.originalIndex, e)}
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
                {/* Dialogue Translation Content */}
                <div className="flex-1 overflow-y-auto pr-1 flex flex-col justify-center gap-6">
                  {/* Announcer Spanish Block */}
                  <div className="text-base sm:text-lg md:text-[18px] leading-relaxed sm:leading-loose font-serif italic text-slate-800 dark:text-slate-200">
                    <span className="font-bold font-sans not-italic text-sky-600 dark:text-sky-400 mr-2 text-base sm:text-lg">
                      Presentador:
                    </span>
                    <span>
                      Bienvenidos a "La Cocina de Sheila". El programa de hoy trata sobre ensaladas. Buenos días, Sheila.
                    </span>
                  </div>

                  {/* Sheila Spanish Block */}
                  <div className="text-base sm:text-lg md:text-[18px] leading-relaxed sm:leading-loose font-serif italic text-slate-800 dark:text-slate-200">
                    <span className="font-bold font-sans not-italic text-sky-600 dark:text-sky-400 mr-2 text-base sm:text-lg">
                      Sheila:
                    </span>
                    <span>
                      Hola, Mike. Y buenos días a todos nuestros oyentes. Cuando era joven, comíamos ensaladas verdes —lechuga o pepinos— con algo de sal y un poco de jugo de limón. Mi madre servía la ensalada con carne, pollo y pescado. Pero hoy en día, las ensaladas pueden ser tu comida completa. Las ensaladas son alimentos saludables de verano. Y de postre, a algunas personas les gusta una ensalada de frutas frescas. Y ahora, unas palabras sobre los platos y vajillas Durelle. Puedes cocinar en ellos, hornear en ellos y congelar comida en ellos también. Compra productos Durelle y disfrútalos en la cocina y en tu mesa. Son lo suficientemente resistentes para cocinar. Son lo suficientemente bonitos para los invitados. Ahora regresemos a nuestras ensaladas.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
