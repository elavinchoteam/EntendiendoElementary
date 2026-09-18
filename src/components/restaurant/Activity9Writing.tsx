import React, { useState } from 'react';
import {
  Volume2,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  RotateCcw,
  Edit3,
} from 'lucide-react';
import { RestaurantActivityData } from '../../data/inTheRestaurantData';
import { RestaurantVideoPlayer } from '../RestaurantVideoPlayer';
import { useTheme } from '../../context/ThemeContext';
import { speakEnglish, stopSpeaking, playFeedbackSound } from '../../utils/audio';

export interface Activity9WritingProps {
  activity: RestaurantActivityData;
  accent?: 'US' | 'UK';
  speechRate?: number;
  onNext?: () => void;
}

export const Activity9Writing: React.FC<Activity9WritingProps> = ({
  activity,
  accent = 'US',
  speechRate = 1.0,
  onNext,
}) => {
  const { isDark } = useTheme();

  const [text, setText] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [feedback, setFeedback] = useState<{
    score: number;
    grammarNotes: string[];
    contentFeedbackEn: string;
    contentFeedbackEs: string;
  } | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isInstructionFlipped, setIsInstructionFlipped] = useState(false);
  const [isPromptFlipped, setIsPromptFlipped] = useState(false);
  const [isModelAnswerFlipped, setIsModelAnswerFlipped] = useState(false);
  const [playingKey, setPlayingKey] = useState<string | null>(null);

  const wordsCount = text.trim() ? text.trim().split(/\s+/).length : 0;

  const handlePlayText = (txt: string, key: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (playingKey === key && window.speechSynthesis?.speaking) {
      stopSpeaking();
      setPlayingKey(null);
      return;
    }
    stopSpeaking();
    setPlayingKey(key);
    speakEnglish(
      txt,
      speechRate,
      accent === 'UK' ? 'UK' : 'US',
      () => setPlayingKey(key),
      () => setPlayingKey(null)
    );
  };

  const handleAnalyze = () => {
    if (!text.trim()) return;
    setIsAnalyzing(true);
    playFeedbackSound('click');

    setTimeout(() => {
      const lower = text.toLowerCase();
      const hasSara = lower.includes('sara') || lower.includes('she') || lower.includes('blond');
      const hasRachel = lower.includes('rachel') || lower.includes('friend') || lower.includes('brunette');
      const hasDrinks = lower.includes('coffee') || lower.includes('water') || lower.includes('sweetener');
      const hasFood = lower.includes('lasagna') || lower.includes('salad') || lower.includes('hamburger');

      let score = 70;
      const notes: string[] = [];

      if (hasSara && hasRachel) {
        score += 15;
        notes.push('✓ Great job describing both customers (Sara and Rachel).');
      } else {
        notes.push('• Consider mentioning both customers by name or appearance.');
      }

      if (hasDrinks) {
        score += 10;
        notes.push('✓ Excellent mention of the drinks served (coffee, water, sweetener).');
      }

      if (hasFood) {
        score += 10;
        notes.push('✓ Good detail on the food orders (lasagna and Mexican salad).');
      }

      score = Math.min(100, score);

      setFeedback({
        score,
        grammarNotes: notes,
        contentFeedbackEn:
          score >= 90
            ? 'Outstanding work! Your writing accurately captures what the waiter would report to a colleague.'
            : 'Good effort! Compare your answer with the model response below to enhance vocabulary and accuracy.',
        contentFeedbackEs:
          score >= 90
            ? '¡Excelente trabajo! Tu texto refleja con gran precisión el relato del camarero.'
            : '¡Buen intento! Compara tu respuesta con la respuesta modelo a continuación para enriquecer tu vocabulario.',
      });
      setIsSaved(true);
      setIsAnalyzing(false);
      playFeedbackSound('correct');
    }, 600);
  };

  const handleReset = () => {
    setText('');
    setIsSaved(false);
    setFeedback(null);
  };

  return (
    <div className="w-full flex flex-col gap-5">
      {/* Top Reversible Instruction Card */}
      <div className="w-full perspective-1000">
        <div
          onClick={() => {
            playFeedbackSound('flip');
            setIsInstructionFlipped(!isInstructionFlipped);
          }}
          className={`relative w-full min-h-[58px] rounded-2xl cursor-pointer select-none transition-transform duration-500 transform-style-3d border shadow-xs ${
            isInstructionFlipped ? 'rotate-y-180' : ''
          } ${
            isDark
              ? 'bg-slate-900 border-slate-700 text-white'
              : 'bg-white border-slate-200 text-slate-900'
          }`}
        >
          <div className="absolute inset-0 px-5 py-3 flex items-center justify-between backface-hidden">
            <span className="font-semibold text-sm sm:text-base">{activity.instructions}</span>
            <button
              type="button"
              onClick={(e) => handlePlayText(activity.instructions, 'instructions', e)}
              className={`p-1.5 rounded-lg border transition-all shrink-0 ${
                isDark
                  ? 'bg-slate-800 hover:bg-slate-700 text-sky-300 border-slate-700'
                  : 'bg-sky-50 hover:bg-sky-100 text-sky-600 border-sky-200'
              }`}
              aria-label="Audio"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>
          <div className="absolute inset-0 px-5 py-3 flex items-center justify-between backface-hidden rotate-y-180">
            <span className="font-semibold text-sm sm:text-base italic text-slate-700 dark:text-slate-200">
              {activity.instructionsEs}
            </span>
          </div>
        </div>
      </div>

      {/* Grid: Left Column Video + Right Column Writing Box */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (5 Cols) */}
        <div className="lg:col-span-5 w-full">
          <RestaurantVideoPlayer
            highlightedTurnIds={activity.highlightedTurnIds || []}
            showTranscriptByDefault={true}
            accent={accent}
            speechRate={speechRate}
          />
        </div>

        {/* Right Column (7 Cols) */}
        <div className="lg:col-span-7 w-full flex flex-col gap-4">
          {/* Prompt Card (Reversible) */}
          <div className="w-full perspective-1000">
            <div
              onClick={() => {
                playFeedbackSound('flip');
                setIsPromptFlipped(!isPromptFlipped);
              }}
              className={`relative w-full min-h-[64px] rounded-2xl cursor-pointer select-none transition-transform duration-500 transform-style-3d border shadow-xs ${
                isPromptFlipped ? 'rotate-y-180' : ''
              } ${
                isDark
                  ? 'bg-slate-900 border-slate-700 text-white'
                  : 'bg-white border-slate-200 text-slate-900'
              }`}
            >
              <div className="absolute inset-0 px-5 py-3.5 flex items-center justify-between backface-hidden">
                <p className="font-bold text-sm sm:text-base">{activity.writingPrompt}</p>
                <button
                  type="button"
                  onClick={(e) => handlePlayText(activity.writingPrompt || '', 'prompt', e)}
                  className={`p-1.5 rounded-lg border transition-all shrink-0 ${
                    isDark
                      ? 'bg-slate-800 hover:bg-slate-700 text-sky-300 border-slate-700'
                      : 'bg-sky-50 hover:bg-sky-100 text-sky-600 border-sky-200'
                  }`}
                  aria-label="Audio"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
              <div className="absolute inset-0 px-5 py-3.5 flex items-center justify-between backface-hidden rotate-y-180">
                <p className="font-bold text-sm sm:text-base italic text-slate-700 dark:text-slate-200">
                  {activity.writingPromptEs}
                </p>
              </div>
            </div>
          </div>

          {/* Text Area */}
          <div
            className={`w-full p-4 rounded-2xl border flex flex-col gap-2 ${
              isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200 shadow-xs'
            }`}
          >
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>Escribe tu respuesta en inglés:</span>
              <span>{wordsCount} palabras</span>
            </div>

            <textarea
              rows={5}
              disabled={isSaved}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Start writing here: e.g. First I brought Sara her coffee and Rachel water..."
              className={`w-full p-3 rounded-xl border text-sm sm:text-base resize-none focus:outline-hidden transition-all ${
                isSaved
                  ? isDark
                    ? 'bg-slate-800/40 border-slate-700 text-slate-300'
                    : 'bg-slate-50 border-slate-200 text-slate-700'
                  : isDark
                  ? 'bg-slate-800 border-slate-700 text-white focus:border-sky-500'
                  : 'bg-white border-slate-300 text-slate-900 focus:border-sky-500'
              }`}
            />

            {/* Controls */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
              <div className="flex items-center gap-2">
                {text.trim() && (
                  <button
                    type="button"
                    onClick={(e) => handlePlayText(text, 'user-text', e)}
                    className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                      isDark
                        ? 'bg-slate-800 text-sky-300 border-slate-700 hover:bg-slate-700'
                        : 'bg-sky-50 text-sky-600 border-sky-200 hover:bg-sky-100'
                    }`}
                    aria-label="Escuchar tu texto"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Escuchar</span>
                  </button>
                )}

                {isSaved && (
                  <button
                    type="button"
                    onClick={() => setIsSaved(false)}
                    className="p-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold flex items-center gap-1.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Editar</span>
                  </button>
                )}

                {text && (
                  <button
                    type="button"
                    onClick={handleReset}
                    className="p-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold flex items-center gap-1.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Limpiar</span>
                  </button>
                )}
              </div>

              <button
                type="button"
                disabled={!text.trim() || isAnalyzing}
                onClick={handleAnalyze}
                className={`px-5 py-2 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all cursor-pointer ${
                  text.trim() && !isAnalyzing
                    ? 'bg-sky-600 hover:bg-sky-700 text-white active:scale-95'
                    : 'bg-slate-300 dark:bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span>{isAnalyzing ? 'Analizando...' : 'Retroalimentación de IA'}</span>
              </button>
            </div>
          </div>

          {/* Feedback Card */}
          {feedback && (
            <div
              className={`p-4 sm:p-5 rounded-2xl border animate-in fade-in duration-200 flex flex-col gap-3 ${
                isDark
                  ? 'bg-slate-900 border-sky-500/40 text-slate-100'
                  : 'bg-white border-sky-300 text-slate-900 shadow-xs'
              }`}
            >
              <div className="flex items-center justify-between pb-2 border-b border-inherit/40">
                <div className="flex items-center gap-2 font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  <span>Análisis de la IA</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-sky-100 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300">
                  Puntaje: {feedback.score}/100
                </span>
              </div>

              <div className="space-y-1.5 text-xs sm:text-sm">
                {feedback.grammarNotes.map((note, i) => (
                  <p key={i} className="text-slate-600 dark:text-slate-300">
                    {note}
                  </p>
                ))}
              </div>

              <p className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200">
                {feedback.contentFeedbackEn}
              </p>
              <p className="text-xs sm:text-sm italic text-slate-500 dark:text-slate-400">
                {feedback.contentFeedbackEs}
              </p>

              {/* Model Answer (Reversible) */}
              <div className="mt-2 w-full perspective-1000">
                <div
                  onClick={() => {
                    playFeedbackSound('flip');
                    setIsModelAnswerFlipped(!isModelAnswerFlipped);
                  }}
                  className={`relative w-full min-h-[90px] rounded-xl cursor-pointer select-none transition-transform duration-500 transform-style-3d border shadow-xs ${
                    isModelAnswerFlipped ? 'rotate-y-180' : ''
                  } ${
                    isDark
                      ? 'bg-slate-800 border-slate-700 text-slate-200'
                      : 'bg-slate-50 border-slate-200 text-slate-800'
                  }`}
                >
                  <div className="absolute inset-0 p-3 flex flex-col justify-between backface-hidden">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs uppercase tracking-wider text-sky-600 dark:text-sky-400">
                        Respuesta Modelo (Inglés)
                      </span>
                      <button
                        type="button"
                        onClick={(e) => handlePlayText(activity.modelAnswer || '', 'model', e)}
                        className={`p-1 rounded-md border shrink-0 ${
                          isDark
                            ? 'bg-slate-700 text-sky-300 border-slate-600'
                            : 'bg-white text-sky-600 border-slate-200'
                        }`}
                        aria-label="Audio"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-xs sm:text-sm">{activity.modelAnswer}</p>
                  </div>

                  <div className="absolute inset-0 p-3 flex flex-col justify-between backface-hidden rotate-y-180">
                    <span className="font-bold text-xs uppercase tracking-wider text-sky-600 dark:text-sky-400">
                      Respuesta Modelo (Español)
                    </span>
                    <p className="text-xs sm:text-sm italic text-slate-700 dark:text-slate-200">
                      Sara tomó café con edulcorante y un vaso de agua. Para comer, pidió una ensalada mexicana sin chile extra porque no quería tomates. Rachel quería pedir una hamburguesa, pero después de que le recomendé nuestros platos, decidió probar nuestra excelente lasaña.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Next Button */}
          {feedback && (
            <div className="flex justify-end mt-1">
              <button
                type="button"
                onClick={onNext}
                className="px-6 py-2.5 rounded-xl font-bold text-sm bg-indigo-600 hover:bg-indigo-700 text-white shadow-md transition-all cursor-pointer active:scale-95 flex items-center gap-2"
              >
                <span>Siguiente a Actividad 10: Test</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
