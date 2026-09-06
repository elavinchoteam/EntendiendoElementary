import React, { useState } from 'react';
import {
  Volume2,
  CheckCircle2,
  XCircle,
  Sparkles,
  HelpCircle,
  Eye,
  EyeOff,
} from 'lucide-react';
import { VocabularyDictationExercise as DictationType } from '../types';
import { speakEnglish, playFeedbackSound, stopSpeaking } from '../utils/audio';
import { useTheme } from '../context/ThemeContext';
import { VocabularyHelperCard } from './VocabularyHelperCard';
import { ReversibleInstructionCard } from './ReversibleInstructionCard';

interface VocabularyDictationExerciseProps {
  exercise: DictationType;
  accent?: 'US' | 'UK';
  speechRate?: number;
  onSuccess?: () => void;
}

export const VocabularyDictationExercise: React.FC<VocabularyDictationExerciseProps> = ({
  exercise,
  accent = 'US',
  speechRate = 1.0,
  onSuccess,
}) => {
  const { isDark } = useTheme();

  // User input text for each sentence item: itemId -> string
  const [inputs, setInputs] = useState<Record<string, string>>({});
  // Submitted status: itemId -> boolean
  const [submitted, setSubmitted] = useState(false);
  // Show answer hints
  const [showAnswers, setShowAnswers] = useState<Record<string, boolean>>({});
  // Currently playing audio item id
  const [playingId, setPlayingId] = useState<string | null>(null);

  const cleanSentence = (str: string) => {
    return str
      .trim()
      .replace(/[-–—]/g, ' ')
      .replace(/\$500/g, '500 dollars')
      .replace(/\s+/g, ' ')
      .replace(/[.,!?'"’$]/g, '')
      .toLowerCase();
  };

  const handlePlayAudio = (text: string, id: string, slow = false) => {
    stopSpeaking();
    setPlayingId(id);
    const rate = slow ? 0.75 : speechRate;
    speakEnglish(text, rate, (accent as 'US' | 'UK') || 'US', undefined, () => {
      setPlayingId(null);
    });
  };

  const handleInputChange = (id: string, val: string) => {
    setInputs((prev) => ({ ...prev, [id]: val }));
    if (submitted) {
      setSubmitted(false);
    }
  };

  const checkItemCorrectness = (item: (typeof exercise.items)[0]) => {
    const userVal = inputs[item.id] || '';
    // Perfect match (including punctuation/case)
    const exactMatch = userVal.trim() === item.sentenceEn.trim();
    // Soft match (ignoring punctuation/case)
    const softMatch = cleanSentence(userVal) === cleanSentence(item.sentenceEn);
    return { exactMatch, softMatch, isFilled: userVal.trim().length > 0 };
  };

  const handleCheck = () => {
    setSubmitted(true);
    const items = exercise.items || [];
    const allCorrect =
      items.length > 0 &&
      items.every((item) => {
        const { softMatch } = checkItemCorrectness(item);
        return softMatch;
      });

    if (allCorrect) {
      playFeedbackSound('correct');
      if (onSuccess) onSuccess();
    } else {
      playFeedbackSound('wrong');
    }
  };

  const toggleShowAnswer = (id: string) => {
    setShowAnswers((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col gap-6 animate-in fade-in duration-200 py-2">
      {/* Reversible Instructions Header */}
      <ReversibleInstructionCard
        id="dictation-instruction-card"
        instructions={
          exercise.instructions ||
          'Type the sentences that you hear in the dictation. Pay attention to punctuation.'
        }
        instructionsEs={
          exercise.instructionsEs ||
          'Escribe las oraciones que escuchas en el dictado. Presta atención a la puntuación.'
        }
      />

      {/* Main Content Layout: Left Sidebar (Vocabulary Helper) & Right (Dictation Inputs) */}
      <div className="w-full flex flex-col lg:flex-row items-start gap-8">
        {/* Left Column: Vocabulary Reference Widget */}
        <div className="w-full lg:w-auto shrink-0 flex justify-center lg:justify-start">
          <VocabularyHelperCard
            words={exercise.vocabularyWords}
            accent={accent}
            speechRate={speechRate}
          />
        </div>

        {/* Right Column: 5 Dictation Sentences */}
        <div
          className={`flex-1 w-full rounded-3xl p-5 sm:p-7 border shadow-md flex flex-col gap-6 ${
            isDark
              ? 'bg-slate-900/90 border-white/10 text-white'
              : 'bg-white border-slate-200 text-slate-900'
          }`}
        >
          <div className="flex flex-col gap-5">
            {exercise.items.map((item, idx) => {
              const { exactMatch, softMatch, isFilled } = checkItemCorrectness(item);
              const isPlaying = playingId === item.id;
              const isRevealed = showAnswers[item.id];

              return (
                <div
                  key={item.id}
                  className={`p-4 rounded-2xl border transition-all duration-200 flex flex-col gap-3 ${
                    submitted && isFilled
                      ? exactMatch
                        ? 'border-emerald-500/50 bg-emerald-500/5'
                        : softMatch
                        ? 'border-amber-500/50 bg-amber-500/5'
                        : 'border-rose-500/50 bg-rose-500/5'
                      : isDark
                      ? 'border-white/10 bg-slate-800/40'
                      : 'border-slate-200 bg-slate-50/50'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    {/* Audio buttons */}
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs font-mono font-bold text-slate-400 w-5">
                        {idx + 1}.
                      </span>

                      {/* Regular speed button */}
                      <button
                        id={`dictation-audio-btn-${item.id}`}
                        onClick={() => handlePlayAudio(item.audioText || item.sentenceEn, item.id, false)}
                        className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 ${
                          isPlaying
                            ? 'bg-indigo-600 text-white border-indigo-500 ring-2 ring-indigo-400'
                            : isDark
                            ? 'bg-slate-800 hover:bg-slate-700 text-indigo-400 border-white/10'
                            : 'bg-white hover:bg-indigo-50 text-indigo-600 border-slate-300 shadow-xs'
                        }`}
                        title="Escuchar audio"
                        aria-label={`Escuchar oración ${idx + 1}`}
                      >
                        <Volume2 className="w-4 h-4" />
                        <span className="text-xs font-semibold">1x</span>
                      </button>

                      {/* Slow speed button */}
                      <button
                        id={`dictation-slow-audio-btn-${item.id}`}
                        onClick={() => handlePlayAudio(item.audioText || item.sentenceEn, item.id, true)}
                        className={`px-2 py-1.5 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
                          isDark
                            ? 'bg-slate-800/80 hover:bg-slate-700 text-slate-300 border-white/10'
                            : 'bg-white hover:bg-slate-100 text-slate-600 border-slate-300'
                        }`}
                        title="Escuchar despacio"
                      >
                        0.75x
                      </button>
                    </div>

                    {/* Text Input */}
                    <div className="flex-1 relative">
                      <input
                        id={`dictation-input-${item.id}`}
                        type="text"
                        value={inputs[item.id] || ''}
                        onChange={(e) => handleInputChange(item.id, e.target.value)}
                        placeholder="Type sentence"
                        className={`w-full px-4 py-2.5 rounded-xl text-sm font-medium border transition-all shadow-xs outline-none ${
                          submitted && isFilled
                            ? exactMatch
                              ? 'border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 ring-1 ring-emerald-400'
                              : softMatch
                              ? 'border-amber-500 bg-amber-500/10 text-amber-700 dark:text-amber-300'
                              : 'border-rose-500 bg-rose-500/10 text-rose-700 dark:text-rose-300'
                            : isDark
                            ? 'bg-slate-800 border-white/10 text-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40'
                            : 'bg-white border-slate-300 text-slate-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30'
                        }`}
                      />
                    </div>

                    {/* Botón para ver la oración que deben escribir */}
                    <button
                      id={`dictation-view-sentence-btn-${item.id}`}
                      type="button"
                      onClick={() => toggleShowAnswer(item.id)}
                      className={`shrink-0 px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer border shadow-2xs ${
                        isRevealed
                          ? isDark
                            ? 'bg-indigo-600/30 text-indigo-300 border-indigo-500/50 hover:bg-indigo-600/40'
                            : 'bg-indigo-100 text-indigo-800 border-indigo-300 hover:bg-indigo-200'
                          : isDark
                          ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-white/15 hover:border-indigo-400'
                          : 'bg-white hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 border-slate-300 hover:border-indigo-300'
                      }`}
                      title={isRevealed ? 'Ocultar oración' : 'Ver la oración que debes escribir'}
                      aria-label={isRevealed ? 'Ocultar oración' : 'Ver la oración que debes escribir'}
                    >
                      {isRevealed ? (
                        <EyeOff className="w-4 h-4 text-indigo-500" />
                      ) : (
                        <Eye className="w-4 h-4 text-indigo-500" />
                      )}
                      <span>{isRevealed ? 'Ocultar oración' : 'Ver oración'}</span>
                    </button>
                  </div>

                  {/* Feedback line */}
                  {submitted && isFilled && (
                    <div className="flex items-center gap-2 text-xs pt-1">
                      {exactMatch ? (
                        <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
                          <CheckCircle2 className="w-4 h-4 shrink-0" />
                          ¡Exacto! Puntuación y texto correctos.
                        </span>
                      ) : softMatch ? (
                        <span className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 font-medium">
                          <Sparkles className="w-4 h-4 shrink-0" />
                          Las palabras son correctas, revisa mayúsculas o puntuación ({item.sentenceEn}).
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5 text-rose-600 dark:text-rose-400 font-medium">
                          <XCircle className="w-4 h-4 shrink-0" />
                          Revisa la oración. Vuelve a escuchar el audio.
                        </span>
                      )}
                    </div>
                  )}

                  {/* Revealed Answer Box */}
                  {isRevealed && (
                    <div className="text-xs sm:text-sm p-3.5 rounded-xl bg-indigo-50/90 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/60 text-indigo-950 dark:text-indigo-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-in fade-in duration-200">
                      <div className="flex flex-col gap-1">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                          Oración a escribir:
                        </span>
                        <p className="font-semibold text-sm sm:text-base text-indigo-950 dark:text-indigo-100 select-all">
                          {item.sentenceEn}
                        </p>
                        {item.sentenceEs && (
                          <p className="text-xs text-slate-500 dark:text-slate-400 italic">
                            {item.sentenceEs}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                        <button
                          type="button"
                          onClick={() => handleInputChange(item.id, item.sentenceEn)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                            isDark
                              ? 'bg-slate-800 hover:bg-slate-700 text-indigo-300 border-indigo-500/30'
                              : 'bg-white hover:bg-indigo-50 text-indigo-700 border-indigo-200 shadow-xs'
                          }`}
                          title="Pegar esta oración en el campo de texto"
                        >
                          Copiar al campo
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Action Check Button */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-inherit/40">
            <button
              id="check-dictation-btn"
              onClick={handleCheck}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              Comprobar Respuestas
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
