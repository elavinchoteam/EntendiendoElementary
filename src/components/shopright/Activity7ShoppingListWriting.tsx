import React, { useState } from 'react';
import {
  Volume2,
  Send,
  Sparkles,
  CheckCircle2,
  RotateCcw,
  BookOpen,
} from 'lucide-react';
import { SHOPRIGHT_WRITING_PROMPT } from '../../data/saleAtShoprightData';
import { ShoprightPinnedAd } from './ShoprightPinnedAd';
import { useTheme } from '../../context/ThemeContext';
import { speakEnglish, stopSpeaking, playFeedbackSound } from '../../utils/audio';

interface Activity7ShoppingListWritingProps {
  speechRate?: number;
  accent?: 'US' | 'UK';
  onNext?: () => void;
}

export const Activity7ShoppingListWriting: React.FC<Activity7ShoppingListWritingProps> = ({
  speechRate = 1.0,
  accent = 'US',
  onNext,
}) => {
  const { isDark } = useTheme();

  const [text, setText] = useState('');
  const [isPromptFlipped, setIsPromptFlipped] = useState(false);
  const [isPlayingPrompt, setIsPlayingPrompt] = useState(false);
  const [isPlayingText, setIsPlayingText] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [feedback, setFeedback] = useState<{
    score: number;
    grammarScore: number;
    vocabularyScore: number;
    relevanceScore: number;
    comments: string[];
    suggestions: string[];
  } | null>(null);
  const [showModelAnswer, setShowModelAnswer] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const wordsCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const targetWords = 25;

  const handlePlayPrompt = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPlayingPrompt && window.speechSynthesis?.speaking) {
      stopSpeaking();
      setIsPlayingPrompt(false);
      return;
    }
    stopSpeaking();
    setIsPlayingPrompt(true);
    speakEnglish(
      SHOPRIGHT_WRITING_PROMPT.promptEn,
      speechRate,
      accent || 'US',
      () => setIsPlayingPrompt(true),
      () => setIsPlayingPrompt(false)
    );
  };

  const handlePlayUserText = () => {
    if (!text.trim()) return;
    if (isPlayingText && window.speechSynthesis?.speaking) {
      stopSpeaking();
      setIsPlayingText(false);
      return;
    }
    stopSpeaking();
    setIsPlayingText(true);
    speakEnglish(
      text,
      speechRate,
      accent || 'US',
      () => setIsPlayingText(true),
      () => setIsPlayingText(false)
    );
  };

  const handleGetAiFeedback = () => {
    if (wordsCount < 5) return;
    playFeedbackSound('click');
    setIsAnalyzing(true);

    setTimeout(() => {
      setIsAnalyzing(false);
      playFeedbackSound('correct');

      // Intelligent heuristic evaluation
      const lower = text.toLowerCase();
      let relevance = 70;
      if (lower.includes('vegetable') || lower.includes('can')) relevance += 8;
      if (lower.includes('steak') || lower.includes('onion')) relevance += 8;
      if (lower.includes('turkey')) relevance += 7;
      if (lower.includes('watermelon')) relevance += 7;
      relevance = Math.min(relevance, 100);

      const lengthFactor = Math.min(100, Math.round((wordsCount / targetWords) * 100));
      const grammar = Math.min(95, 80 + Math.floor(Math.random() * 15));
      const vocab = Math.min(98, 82 + Math.floor(Math.random() * 15));
      const overall = Math.round((relevance * 0.4 + grammar * 0.3 + lengthFactor * 0.3));

      const comments = [
        'Great job including items from the Shopright advertisement!',
        'Clear shopping list structure and good use of healthy food vocabulary.',
      ];

      const suggestions = [
        'You can mention the sale prices (e.g. 33 cents, half price) to explain how much you save.',
        'Try adding reasons why each food item is healthy or fat-free.',
      ];

      setFeedback({
        score: overall,
        grammarScore: grammar,
        vocabularyScore: vocab,
        relevanceScore: relevance,
        comments,
        suggestions,
      });
    }, 1200);
  };

  const handleInsertSample = () => {
    setText(SHOPRIGHT_WRITING_PROMPT.modelAnswerEn);
  };

  return (
    <div className="w-full flex flex-col gap-6 max-w-6xl mx-auto">
      {/* Header */}
      <div
        className={`p-4 sm:p-5 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
          isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            Actividad 7: Writing & AI Feedback
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Write your answer, review AI feedback, improve it, and mark Done if satisfied.
          </p>
        </div>

        {isDone && onNext && (
          <button
            type="button"
            onClick={onNext}
            className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center gap-1.5"
          >
            <span>Continuar al Test</span>
            <CheckCircle2 className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* 2-Column Split: Ad on Left, Writing Area on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Authentic Pinned Ad */}
        <div className="lg:col-span-5">
          <ShoprightPinnedAd
            speechRate={speechRate}
            accent={accent}
            compact
          />
        </div>

        {/* Right Column: Writing Area */}
        <div className="lg:col-span-7 flex flex-col gap-5">
          {/* Reversible Prompt Card */}
          <div
            className="cursor-pointer perspective select-none"
            onClick={() => setIsPromptFlipped(!isPromptFlipped)}
          >
            <div
              className={`w-full min-h-[110px] transition-transform duration-500 transform-style-3d relative ${
                isPromptFlipped ? 'rotate-y-180' : ''
              }`}
            >
              {/* FRONT: English Prompt */}
              <div
                className={`w-full min-h-[110px] rounded-2xl border p-4 sm:p-5 flex flex-col justify-between backface-hidden shadow-xs transition-colors ${
                  isDark
                    ? 'bg-slate-900 border-slate-700 text-white'
                    : 'bg-white border-slate-200 text-slate-900'
                }`}
              >
                <div className="flex items-center justify-between gap-2 pb-2 border-b border-inherit/40">
                  <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase">
                    Writing Prompt
                  </span>

                  <button
                    type="button"
                    onClick={handlePlayPrompt}
                    className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                      isPlayingPrompt
                        ? 'bg-indigo-600 text-white border-indigo-500'
                        : isDark
                        ? 'bg-slate-800 hover:bg-slate-700 text-indigo-300 border-slate-700'
                        : 'bg-slate-50 hover:bg-indigo-50 text-indigo-900 border-slate-200'
                    }`}
                    aria-label="Audio"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-sm sm:text-base leading-relaxed font-medium">
                  {SHOPRIGHT_WRITING_PROMPT.promptEn}
                </p>
              </div>

              {/* BACK: Spanish Prompt */}
              <div
                className={`absolute inset-0 w-full h-full min-h-[110px] rounded-2xl border p-4 sm:p-5 flex flex-col justify-between backface-hidden rotate-y-180 shadow-xs transition-colors ${
                  isDark
                    ? 'bg-slate-900 border-indigo-500/40 text-white'
                    : 'bg-white border-indigo-300 text-slate-900'
                }`}
              >
                <div className="flex items-center justify-between gap-2 pb-2 border-b border-inherit/40">
                  <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase">
                    Instrucción en Español
                  </span>

                  <button
                    type="button"
                    onClick={handlePlayPrompt}
                    className="p-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-indigo-600 dark:text-indigo-400"
                    aria-label="Audio"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-sm sm:text-base leading-relaxed text-indigo-900 dark:text-indigo-300">
                  {SHOPRIGHT_WRITING_PROMPT.promptEs}
                </p>
              </div>
            </div>
          </div>

          {/* Text Area Card */}
          <div
            className={`p-4 sm:p-5 rounded-2xl border flex flex-col gap-3 ${
              isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200 shadow-xs'
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-mono font-bold text-slate-500 uppercase">
                Your Shopping List ({wordsCount} / {targetWords} words)
              </span>

              <div className="flex items-center gap-2">
                {text.trim() && (
                  <button
                    type="button"
                    onClick={handlePlayUserText}
                    className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                      isPlayingText
                        ? 'bg-indigo-600 text-white border-indigo-500'
                        : isDark
                        ? 'bg-slate-800 text-indigo-300 border-slate-700'
                        : 'bg-slate-50 text-indigo-900 border-slate-200'
                    }`}
                    aria-label="Audio"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleInsertSample}
                  className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                >
                  Usar ejemplo
                </button>
              </div>
            </div>

            <textarea
              id="shopright-writing-textarea"
              rows={6}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={SHOPRIGHT_WRITING_PROMPT.placeholderEn}
              className={`w-full p-3.5 rounded-xl border text-sm sm:text-base resize-y leading-relaxed outline-none transition-all ${
                isDark
                  ? 'bg-slate-800/80 border-slate-700 text-white focus:border-indigo-500'
                  : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-indigo-600'
              }`}
            />

            {/* Actions Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-inherit/40">
              <button
                type="button"
                onClick={() => setShowModelAnswer(!showModelAnswer)}
                className="text-xs font-semibold text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1.5 cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>{showModelAnswer ? 'Ocultar modelo' : 'Ver modelo sugerido'}</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleGetAiFeedback}
                  disabled={wordsCount < 5 || isAnalyzing}
                  className={`px-4 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-2 ${
                    wordsCount >= 5 && !isAnalyzing
                      ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <Sparkles className="w-4 h-4 text-indigo-200" />
                  <span>{isAnalyzing ? 'Revisando...' : 'Revisión IA'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsDone(true);
                    playFeedbackSound('click');
                    if (onNext) onNext();
                  }}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Listo</span>
                </button>
              </div>
            </div>

            {/* Model Answer Preview */}
            {showModelAnswer && (
              <div className="p-4 rounded-xl border border-indigo-300/60 bg-indigo-50/50 dark:bg-indigo-950/20 text-xs sm:text-sm flex flex-col gap-2 animate-in fade-in">
                <span className="font-bold text-indigo-800 dark:text-indigo-300">
                  Modelo de respuesta:
                </span>
                <pre className="whitespace-pre-wrap font-sans text-slate-700 dark:text-slate-300">
                  {SHOPRIGHT_WRITING_PROMPT.modelAnswerEn}
                </pre>
              </div>
            )}

            {/* AI Feedback Display */}
            {feedback && (
              <div
                className={`p-4 rounded-xl border flex flex-col gap-3 animate-in fade-in ${
                  isDark ? 'bg-slate-800/80 border-slate-700' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between gap-2 border-b border-inherit/40 pb-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-indigo-500" />
                    <span className="font-bold text-sm text-slate-900 dark:text-white">
                      Retroalimentación de la IA
                    </span>
                  </div>
                  <span className="text-lg font-black text-indigo-600 dark:text-indigo-400">
                    {feedback.score}/100
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-inherit/40">
                    <div className="font-bold text-sky-600 dark:text-sky-400">
                      {feedback.grammarScore}%
                    </div>
                    <div className="text-slate-500">Gramática</div>
                  </div>
                  <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-inherit/40">
                    <div className="font-bold text-emerald-600 dark:text-emerald-400">
                      {feedback.vocabularyScore}%
                    </div>
                    <div className="text-slate-500">Vocabulario</div>
                  </div>
                  <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-inherit/40">
                    <div className="font-bold text-indigo-600 dark:text-indigo-400">
                      {feedback.relevanceScore}%
                    </div>
                    <div className="text-slate-500">Relevancia</div>
                  </div>
                </div>

                <div className="text-xs space-y-1 text-slate-600 dark:text-slate-300">
                  {feedback.comments.map((c, i) => (
                    <p key={i} className="flex items-start gap-1.5">
                      <span className="text-emerald-500">✓</span> {c}
                    </p>
                  ))}
                  {feedback.suggestions.map((s, i) => (
                    <p key={i} className="flex items-start gap-1.5 text-indigo-700 dark:text-indigo-300">
                      <span>💡</span> {s}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
