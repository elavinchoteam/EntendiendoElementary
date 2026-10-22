import React, { useState } from 'react';
import { BookOpen, RotateCw } from 'lucide-react';
import { LessonSentence } from '../../types';
import { speakEnglish, stopSpeaking, playFeedbackSound } from '../../utils/audio';
import { useTheme } from '../../context/ThemeContext';
import { CardSpeechControl } from '../CardSpeechControl';

interface DoItExploreExerciseProps {
  audioText: string;
  sentences: LessonSentence[];
  accent?: 'US' | 'UK';
  speechRate?: number;
  onSuccess?: () => void;
}

export const DoItExploreExercise: React.FC<DoItExploreExerciseProps> = ({
  audioText,
  sentences = [],
  accent = 'US',
  speechRate = 1.0,
}) => {
  const { isDark } = useTheme();

  // 3D Reversible Flip Card state
  const [isFlipped, setIsFlipped] = useState(false);

  // Individual sentence playing state
  const [individualSentenceIdx, setIndividualSentenceIdx] = useState<number | null>(null);

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

  // Group sentences into paragraphs matching the reading article layout
  // Paragraph 1: Sentences 0, 1 ("I always remember my mother saying...", "I always thought...")
  // Paragraph 2: Sentences 2, 3, 4, 5, 6, 7, 8 (Clean-House Agency)
  // Paragraph 3: Sentences 9, 10, 11 (Making a cake)
  // Paragraph 4: Sentences 12, 13, 14 (Cookbooks idea)
  const paragraphs = [
    { indices: [0, 1] },
    { indices: [2, 3, 4, 5, 6, 7, 8] },
    { indices: [9, 10, 11] },
    { indices: [12, 13, 14] },
  ];

  return (
    <div className="w-full flex flex-col items-center gap-6 animate-in fade-in duration-200 py-2 select-none">
      {/* Centered Standalone Reading Article Card (without media player) */}
      <div className="w-full max-w-3xl mx-auto perspective-1000 min-h-[580px] sm:min-h-[620px] flex flex-col">
        <div
          id="do-it-lesson-flip-card"
          onClick={handleFlipCard}
          className={`relative w-full h-full min-h-[580px] sm:min-h-[620px] rounded-3xl cursor-pointer shadow-xl transition-transform duration-500 transform-style-3d select-none ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
          title="Click to flip translation"
        >
          {/* ANVERSO / FRONT: English Article Text */}
          <div
            className={`absolute inset-0 w-full h-full rounded-3xl p-6 sm:p-8 flex flex-col justify-between border backface-hidden shadow-xl transition-colors duration-200 overflow-hidden ${
              isDark
                ? 'bg-slate-900 border-sky-500/30 text-slate-100'
                : 'bg-white border-slate-200 text-slate-900 shadow-md'
            }`}
          >
            {/* Header info with Speaker, Speed Selector and Flip buttons */}
            <div className="flex items-center justify-between pb-4 border-b border-inherit/40 shrink-0">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center font-bold">
                  <BookOpen className="w-4.5 h-4.5" />
                </span>
                <div>
                  <h2 className="text-sm sm:text-base font-bold tracking-wide uppercase text-sky-600 dark:text-sky-400">
                    Reading Article · Do It!
                  </h2>
                  <p className="text-[11px] text-slate-400 dark:text-slate-500">
                    Click any sentence to listen · Haz clic para voltear
                  </p>
                </div>
              </div>

              {/* Speaker button and Speed selector button in header */}
              <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                <CardSpeechControl
                  textToSpeak={audioText}
                  accent={accent}
                  initialSpeed={speechRate}
                  gender="female"
                />
                <button
                  type="button"
                  onClick={handleFlipCard}
                  className="px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold text-sky-600 dark:text-sky-400 hover:bg-sky-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5 border border-sky-200 dark:border-slate-700 cursor-pointer shadow-xs"
                  title="Traducir al español"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Traducción</span>
                </button>
              </div>
            </div>

            {/* Article Content - All 4 paragraphs cleanly displayed */}
            <div className="flex-1 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pr-2 flex flex-col gap-4 py-4">
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-sky-600 dark:text-sky-400 tracking-tight">
                Do It!
              </h3>

              {paragraphs.map((para, pIdx) => (
                <p key={pIdx} className="text-sm sm:text-base leading-relaxed sm:leading-loose text-slate-800 dark:text-slate-200">
                  {para.indices.map((sIdx) => {
                    const sent = sentences[sIdx];
                    if (!sent) return null;
                    const isCurrent = individualSentenceIdx === sIdx;
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
                </p>
              ))}
            </div>

            {/* Footer hint */}
            <div className="pt-3 border-t border-inherit/30 text-xs text-slate-400 dark:text-slate-500 flex items-center justify-between shrink-0">
              <span>Haz clic en una oración para escuchar</span>
              <div className="flex items-center gap-1 text-sky-600 dark:text-sky-400">
                <span>Voltear para ver traducción</span>
                <RotateCw className="w-3 h-3" />
              </div>
            </div>
          </div>

          {/* REVERSO / BACK: Spanish Translation */}
          <div
            className={`absolute inset-0 w-full h-full rounded-3xl p-6 sm:p-8 flex flex-col justify-between border backface-hidden rotate-y-180 shadow-xl transition-colors duration-200 overflow-hidden ${
              isDark
                ? 'bg-slate-900 border-emerald-500/30 text-slate-100'
                : 'bg-white border-emerald-200 text-slate-900 shadow-md'
            }`}
          >
            {/* Header info */}
            <div className="flex items-center justify-between pb-4 border-b border-inherit/40 shrink-0">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                  <BookOpen className="w-4.5 h-4.5" />
                </span>
                <div>
                  <h2 className="text-sm sm:text-base font-bold tracking-wide uppercase text-emerald-600 dark:text-emerald-400">
                    Traducción en Español · ¡Hazlo!
                  </h2>
                  <p className="text-[11px] text-slate-400 dark:text-slate-500">
                    Traducción completa del artículo
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleFlipCard}
                className="px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5 border border-emerald-200 dark:border-slate-700 cursor-pointer shadow-xs"
                title="Volver a inglés"
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span>Inglés</span>
              </button>
            </div>

            {/* Article Translation Content */}
            <div className="flex-1 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pr-2 flex flex-col gap-4 py-4 font-serif italic text-slate-800 dark:text-slate-200">
              <h3 className="text-xl sm:text-2xl font-sans not-italic font-bold text-emerald-600 dark:text-emerald-400 tracking-tight">
                ¡Hazlo!
              </h3>

              {paragraphs.map((para, pIdx) => (
                <p key={pIdx} className="text-sm sm:text-base leading-relaxed sm:leading-loose">
                  {para.indices.map((sIdx) => {
                    const sent = sentences[sIdx];
                    if (!sent) return null;
                    return (
                      <span key={sIdx} className="inline mr-1">
                        {sent.es}{' '}
                      </span>
                    );
                  })}
                </p>
              ))}
            </div>

            {/* Footer hint */}
            <div className="pt-3 border-t border-inherit/30 text-xs text-slate-400 dark:text-slate-500 flex items-center justify-between font-sans not-italic shrink-0">
              <span>Traducción pedagógica al español</span>
              <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                <span>Haz clic para volver al anverso</span>
                <RotateCw className="w-3 h-3" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
