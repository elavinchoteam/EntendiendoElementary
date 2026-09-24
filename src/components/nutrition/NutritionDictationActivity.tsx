import React, { useState } from 'react';
import { Volume2, VolumeX, Check, RotateCcw, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { DictationSentenceItem, NutritionWordItem } from '../../data/nutritionData';
import { ReversibleCard } from './ReversibleCard';
import { speakEnglish, stopSpeaking, playFeedbackSound } from '../../utils/audio';
import { useTheme } from '../../context/ThemeContext';

interface NutritionDictationActivityProps {
  title: string;
  sentences: DictationSentenceItem[];
  vocabularyList: NutritionWordItem[];
  speed: number;
  accent?: 'US' | 'UK';
  onNextActivity?: () => void;
}

export const NutritionDictationActivity: React.FC<NutritionDictationActivityProps> = ({
  title,
  sentences,
  vocabularyList,
  speed,
  accent = 'US',
  onNextActivity,
}) => {
  const { isDark } = useTheme();

  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [revealedSentences, setRevealedSentences] = useState<Record<string, boolean>>({});
  const [activeAudioId, setActiveAudioId] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const toggleReveal = (id: string) => {
    playFeedbackSound('click');
    setRevealedSentences((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleInputChange = (id: string, value: string) => {
    setInputs((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const playSentenceAudio = (sentence: DictationSentenceItem) => {
    if (activeAudioId === sentence.id) {
      stopSpeaking();
      setActiveAudioId(null);
    } else {
      setActiveAudioId(sentence.id);
      speakEnglish(sentence.speakerEn, speed, accent, () => {
        setActiveAudioId(null);
      });
    }
  };

  const playWordAudio = (word: NutritionWordItem) => {
    if (activeAudioId === word.id) {
      stopSpeaking();
      setActiveAudioId(null);
    } else {
      setActiveAudioId(word.id);
      speakEnglish(word.word, speed, accent, () => {
        setActiveAudioId(null);
      });
    }
  };

  const cleanText = (str: string) =>
    str
      .toLowerCase()
      .replace(/[.,/#!$%^&*;:{}=\-_`~()?'"¡!¿]/g, '')
      .replace(/\s+/g, ' ')
      .trim();

  const handleCheck = () => {
    playFeedbackSound('click');
    setIsSubmitted(true);
    const allCorrect = sentences.every((s) => {
      const userText = cleanText(inputs[s.id] || '');
      const expectedText = cleanText(s.sentenceEn);
      return userText === expectedText;
    });
    if (allCorrect) {
      playFeedbackSound('correct');
    }
  };

  const handleReset = () => {
    playFeedbackSound('click');
    setInputs({});
    setRevealedSentences({});
    setIsSubmitted(false);
  };

  const allAnswered = sentences.every((s) => Boolean(inputs[s.id]?.trim()));
  const allCorrect =
    isSubmitted &&
    sentences.every((s) => cleanText(inputs[s.id] || '') === cleanText(s.sentenceEn));

  return (
    <div className="w-full flex flex-col gap-6 animate-in fade-in duration-200">
      {/* Reversible Instruction Header Card */}
      <ReversibleCard
        textEn={`${title}\nType the sentences that you hear in the dictation. Pay attention to punctuation.`}
        textEs={`${title}\nEscribe las oraciones que escuchas en el dictado. Presta atención a la puntuación.`}
        speed={speed}
        accent={accent}
        className="shadow-sm"
        childrenFront={
          <div className="flex flex-col gap-1">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-sky-800 dark:text-sky-400">
              {title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              Type the sentences that you hear in the dictation. Pay attention to punctuation.
            </p>
          </div>
        }
        childrenBack={
          <div className="flex flex-col gap-1">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-sky-900 dark:text-sky-300">
              {title}
            </h2>
            <p className="text-xs sm:text-sm font-serif italic text-sky-900 dark:text-sky-200">
              Escribe las oraciones que escuchas en el dictado. Presta atención a la puntuación.
            </p>
          </div>
        }
      />

      {/* Main Dictation Layout matching actividad 3.png and actividad 4.png */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Vocabulary Reference Cards */}
        <div
          className={`lg:col-span-4 rounded-2xl border p-5 flex flex-col gap-3 shadow-sm ${
            isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
          }`}
        >
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
            Vocabulario
          </span>

          <div className="flex flex-col gap-2">
            {vocabularyList.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40"
              >
                <div className="flex flex-col text-left">
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-200 capitalize">
                    {item.word}
                  </span>
                  <span className="text-[11px] font-serif italic text-emerald-600 dark:text-emerald-400">
                    {item.translation}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => playWordAudio(item)}
                  className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 cursor-pointer"
                  title="Listen"
                >
                  {activeAudioId === item.id ? (
                    <VolumeX className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
                  ) : (
                    <Volume2 className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: 5 Dictation Sentences */}
        <div
          className={`lg:col-span-8 rounded-2xl border p-6 sm:p-7 flex flex-col gap-6 shadow-sm ${
            isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
          }`}
        >
          <div className="flex flex-col gap-4">
            {sentences.map((item, index) => {
              const userVal = inputs[item.id] || '';
              const isItemCorrect = isSubmitted && cleanText(userVal) === cleanText(item.sentenceEn);
              const isItemWrong = isSubmitted && !isItemCorrect;

              return (
                <div
                  key={item.id}
                  className="flex flex-col gap-2 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 text-xs font-mono font-bold flex items-center justify-center shrink-0 text-slate-700 dark:text-slate-300">
                      {index + 1}
                    </span>

                    {/* Audio Speaker button (icon only) */}
                    <button
                      type="button"
                      onClick={() => playSentenceAudio(item)}
                      className={`p-2 rounded-xl border transition-all cursor-pointer ${
                        activeAudioId === item.id
                          ? 'bg-emerald-500 text-white border-emerald-500 shadow-sm animate-pulse'
                          : isDark
                          ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                          : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200 shadow-xs'
                      }`}
                      title="Escuchar audio"
                      aria-label="Escuchar audio"
                    >
                      {activeAudioId === item.id ? (
                        <VolumeX className="w-4 h-4" />
                      ) : (
                        <Volume2 className="w-4 h-4" />
                      )}
                    </button>

                    <input
                      type="text"
                      value={userVal}
                      onChange={(e) => handleInputChange(item.id, e.target.value)}
                      placeholder="Type what you hear..."
                      disabled={isSubmitted && allCorrect}
                      className={`flex-1 h-11 px-4 rounded-xl border text-sm transition-all focus:outline-hidden ${
                        isSubmitted
                          ? isItemCorrect
                            ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-500 text-sky-900 dark:text-sky-200'
                            : 'bg-rose-50 dark:bg-rose-950/30 border-rose-500 text-rose-900 dark:text-rose-200'
                          : isDark
                          ? 'bg-slate-900 border-slate-700 text-white focus:border-sky-500'
                          : 'bg-white border-slate-300 text-slate-900 focus:border-sky-500 shadow-2xs'
                      }`}
                    />

                    {/* Eye Button to view/hide sentence matching Section 7 Sports 2 */}
                    <button
                      type="button"
                      onClick={() => toggleReveal(item.id)}
                      className={`shrink-0 p-2.5 rounded-xl text-xs font-semibold flex items-center justify-center transition-all cursor-pointer border shadow-2xs ${
                        revealedSentences[item.id]
                          ? isDark
                            ? 'bg-sky-600/30 text-sky-300 border-sky-500/50 hover:bg-sky-600/40'
                            : 'bg-sky-100 text-sky-800 border-sky-300 hover:bg-sky-200'
                          : isDark
                          ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-white/15 hover:border-sky-400'
                          : 'bg-white hover:bg-sky-50 text-slate-700 hover:text-sky-700 border-slate-300 hover:border-sky-300'
                      }`}
                      title={revealedSentences[item.id] ? 'Ocultar oración' : 'Ver la oración que debes escribir'}
                      aria-label={revealedSentences[item.id] ? 'Ocultar oración' : 'Ver la oración que debes escribir'}
                    >
                      {revealedSentences[item.id] ? (
                        <EyeOff className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                      ) : (
                        <Eye className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                      )}
                    </button>
                  </div>

                  {/* Reversible card for full sentence & translation if revealed OR submitted */}
                  {(revealedSentences[item.id] || isSubmitted) && (
                    <div className="mt-2 animate-in fade-in duration-150">
                      <ReversibleCard
                        textEn={item.sentenceEn}
                        textEs={item.sentenceEs}
                        speed={speed}
                        accent={accent}
                        minHeightClass="min-h-[64px]"
                        childrenFront={
                          <div className="flex items-center justify-between gap-3">
                            <div className="flex flex-col gap-0.5">
                              <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                                {isSubmitted ? 'Oración correcta:' : 'Oración:'}
                              </span>
                              <span className="text-sm font-medium text-slate-900 dark:text-white">
                                {item.sentenceEn}
                              </span>
                            </div>
                            {(!isSubmitted || !allCorrect) && (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleInputChange(item.id, item.sentenceEn);
                                }}
                                className={`px-2.5 py-1 text-xs font-semibold rounded-lg border transition-all cursor-pointer shrink-0 ${
                                  isDark
                                    ? 'bg-slate-800 hover:bg-slate-700 text-emerald-400 border-sky-500/30'
                                    : 'bg-white hover:bg-sky-50 text-emerald-700 border-emerald-300 shadow-2xs'
                                }`}
                                title="Copiar texto al campo de entrada"
                              >
                                Copiar al campo
                              </button>
                            )}
                          </div>
                        }
                        childrenBack={
                          <div className="flex flex-col gap-0.5">
                            <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
                              Traducción:
                            </span>
                            <span className="text-sm font-serif italic text-sky-950 dark:text-sky-200">
                              {item.sentenceEs}
                            </span>
                          </div>
                        }
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Action buttons */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <button
              type="button"
              onClick={handleReset}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold border transition-all cursor-pointer ${
                isDark
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200 shadow-xs'
              }`}
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reiniciar</span>
            </button>

            <div className="flex items-center gap-3">
              {!isSubmitted ? (
                <button
                  type="button"
                  onClick={handleCheck}
                  disabled={!allAnswered}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md cursor-pointer ${
                    allAnswered
                      ? 'bg-sky-600 hover:bg-sky-500 text-white active:scale-95'
                      : 'bg-slate-300 dark:bg-slate-800 text-slate-500 dark:text-slate-600 cursor-not-allowed shadow-none'
                  }`}
                >
                  <Check className="w-4 h-4" />
                  <span>Comprobar</span>
                </button>
              ) : allCorrect && onNextActivity ? (
                <button
                  type="button"
                  onClick={onNextActivity}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs sm:text-sm font-bold shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  <span>Siguiente Actividad</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs sm:text-sm font-bold shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  <span>Intentar de nuevo</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
