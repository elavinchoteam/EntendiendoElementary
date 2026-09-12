import React, { useState } from 'react';
import { Volume2, Sparkles, Send, Edit3, Bookmark, RotateCcw } from 'lucide-react';
import { ACTIVITY_6_DATA } from '../../data/cleanHouseAgencyData';
import { useTheme } from '../../context/ThemeContext';
import { playFeedbackSound } from '../../utils/audio';

interface CleanHouseActivity6Props {
  onPlayAudio: (text: string, id: string, e?: React.MouseEvent) => void;
  playingSentenceId: string | null;
}

export const CleanHouseActivity6: React.FC<CleanHouseActivity6Props> = ({
  onPlayAudio,
  playingSentenceId,
}) => {
  const { isDark } = useTheme();
  const [isInstructionFlipped, setIsInstructionFlipped] = useState(false);
  const [isPromptCardFlipped, setIsPromptCardFlipped] = useState(false);
  const [writingText, setWritingText] = useState(
    'Sparkle Domestic Agency. Do you need help with housework? Call Sparkle today. We clean kitchens, bathrooms, and living rooms. Fast, reliable, and friendly service! Call 555-4321 for a free quote.'
  );
  const [isSaved, setIsSaved] = useState(false);
  const [feedback, setFeedback] = useState<{
    score: number;
    positives: string[];
    improvements: string[];
    grammarNote: string;
  } | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const wordCount = writingText.trim() ? writingText.trim().split(/\s+/).length : 0;

  const handleRequestFeedback = () => {
    if (!writingText.trim()) return;
    setIsAnalyzing(true);
    playFeedbackSound('click');

    setTimeout(() => {
      const words = writingText.toLowerCase();
      const hasAgencyName = words.includes('agency') || words.includes('service') || words.includes('company');
      const hasQuestion = writingText.includes('?');
      const hasPhone = /\d{3,}/.test(writingText) || words.includes('call');
      const hasAction = words.includes('clean') || words.includes('help') || words.includes('do');

      let score = 75;
      if (hasAgencyName) score += 8;
      if (hasQuestion) score += 7;
      if (hasPhone) score += 5;
      if (hasAction) score += 5;
      score = Math.min(100, score);

      setFeedback({
        score,
        positives: [
          'Great use of imperative calls to action ("Call today", "Call for a quote").',
          'Good advertising tone tailored to residential cleaning services.',
          hasQuestion ? 'Effective rhetorical question engaging potential clients directly.' : 'Clear description of agency capabilities.',
        ],
        improvements: [
          'Remember to clearly state operating hours or emergency availability.',
          'Consider emphasizing key advantages like licensed cleaners or affordable rates.',
        ],
        grammarNote: 'Solid sentence structures and appropriate commercial vocabulary!',
      });
      setIsAnalyzing(false);
      playFeedbackSound('correct');
    }, 900);
  };

  const handleLoadSample = () => {
    setWritingText(
      'Spotless Home Services. Tired of sweeping and scrubbing? Let Spotless Home handle the chores! We vacuum carpets, polish furniture, and wash windows. Call 555-8899 and ask for David. Fast and friendly service!'
    );
    setIsSaved(false);
    playFeedbackSound('click');
  };

  return (
    <div className="w-full flex flex-col gap-6 animate-in fade-in duration-300">
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
            isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}
        >
          <div className="absolute inset-0 px-5 py-3 flex items-center justify-between backface-hidden">
            <span className="font-semibold text-sm sm:text-base">{ACTIVITY_6_DATA.instructionsEn}</span>
            <button
              type="button"
              onClick={(e) => onPlayAudio(ACTIVITY_6_DATA.instructionsEn, 'act6-instr', e)}
              className={`p-1.5 rounded-lg border transition-all shrink-0 cursor-pointer ${
                playingSentenceId === 'act6-instr'
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
          <div className="absolute inset-0 px-5 py-3 flex items-center justify-between backface-hidden rotate-y-180">
            <span className="font-semibold text-sm sm:text-base italic text-slate-700 dark:text-slate-200">
              {ACTIVITY_6_DATA.instructionsEs}
            </span>
          </div>
        </div>
      </div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Reversible Prompt & Example */}
        <div className="lg:col-span-5 w-full perspective-1000">
          <div
            role="button"
            tabIndex={0}
            onClick={() => {
              playFeedbackSound('flip');
              setIsPromptCardFlipped((prev) => !prev);
            }}
            className={`relative w-full rounded-2xl cursor-pointer select-none transition-transform duration-500 transform-style-3d border shadow-xs ${
              isPromptCardFlipped ? 'rotate-y-180' : ''
            } ${
              isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            {/* Front: English */}
            <div className="w-full p-5 sm:p-6 flex flex-col justify-between backface-hidden space-y-4">
              <div className="flex items-center justify-between border-b border-inherit/20 pb-3">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
                    <Edit3 className="w-4 h-4" />
                  </span>
                  <h3 className="text-base font-bold">Writing Guidelines</h3>
                </div>
                <button
                  type="button"
                  onClick={(e) => onPlayAudio(ACTIVITY_6_DATA.promptEn, 'act6-prompt', e)}
                  className={`p-1.5 rounded-lg border transition-all shrink-0 cursor-pointer ${
                    playingSentenceId === 'act6-prompt'
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

              <div className="space-y-3 text-sm leading-relaxed">
                <p className="font-semibold">{ACTIVITY_6_DATA.promptEn}</p>
                <div
                  className={`p-3.5 rounded-xl border ${
                    isDark ? 'bg-slate-800/60 border-slate-700' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <p className="font-bold text-xs uppercase tracking-wider text-sky-600 dark:text-sky-400 mb-1">
                    Sample Ad:
                  </p>
                  <p className="italic text-xs sm:text-sm">{ACTIVITY_6_DATA.sampleAnswer}</p>
                </div>
              </div>
            </div>

            {/* Back: Spanish */}
            <div className="absolute inset-0 w-full h-full p-5 sm:p-6 flex flex-col justify-between backface-hidden rotate-y-180 space-y-4">
              <div className="flex items-center justify-between border-b border-inherit/20 pb-3">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    <Sparkles className="w-4 h-4" />
                  </span>
                  <h3 className="text-base font-bold text-emerald-600 dark:text-emerald-400 italic">
                    Pautas de Redacción
                  </h3>
                </div>
              </div>

              <div className="space-y-3 text-sm leading-relaxed italic text-slate-700 dark:text-slate-300">
                <p className="font-semibold">{ACTIVITY_6_DATA.promptEs}</p>
                <div
                  className={`p-3.5 rounded-xl border ${
                    isDark ? 'bg-slate-800/40 border-slate-700' : 'bg-emerald-50/50 border-emerald-200'
                  }`}
                >
                  <p className="font-bold text-xs uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1 not-italic">
                    Anuncio de Ejemplo:
                  </p>
                  <p className="text-xs sm:text-sm">{ACTIVITY_6_DATA.sampleAnswerEs}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Text Area & Feedback */}
        <div className="lg:col-span-7 w-full flex flex-col gap-5">
          <div
            className={`p-5 rounded-2xl border space-y-4 ${
              isDark ? 'bg-slate-900/90 border-slate-700' : 'bg-white border-slate-200 shadow-xs'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-semibold text-slate-500">
                {wordCount} palabras | {writingText.length} caracteres
              </span>
              <button
                type="button"
                onClick={handleLoadSample}
                className="text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Cargar ejemplo alternativo</span>
              </button>
            </div>

            <textarea
              value={writingText}
              onChange={(e) => {
                setWritingText(e.target.value);
                setIsSaved(false);
              }}
              rows={6}
              placeholder="Write your domestic agency advertisement here..."
              className={`w-full p-4 rounded-xl border text-sm sm:text-base leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all ${
                isDark
                  ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500'
                  : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
              }`}
            />

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setIsSaved(true);
                  playFeedbackSound('click');
                }}
                className={`px-4 py-2 rounded-xl border text-xs sm:text-sm font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                  isSaved
                    ? 'bg-emerald-500 text-white border-emerald-500'
                    : isDark
                    ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
                }`}
              >
                <Bookmark className="w-4 h-4" />
                <span>{isSaved ? '¡Guardado!' : 'Guardar borrador'}</span>
              </button>

              <button
                type="button"
                disabled={isAnalyzing || !writingText.trim()}
                onClick={handleRequestFeedback}
                className={`px-6 py-2.5 rounded-xl font-bold text-sm shadow-md transition-all cursor-pointer flex items-center gap-2 ${
                  writingText.trim()
                    ? 'bg-sky-600 hover:bg-sky-700 text-white active:scale-95'
                    : 'bg-slate-300 dark:bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span>{isAnalyzing ? 'Analizando con IA...' : 'Solicitar Retroalimentación'}</span>
              </button>
            </div>
          </div>

          {/* Feedback Card */}
          {feedback && (
            <div
              className={`p-5 rounded-2xl border space-y-3 animate-in fade-in duration-300 ${
                isDark ? 'bg-slate-900 border-emerald-500/40' : 'bg-emerald-50/50 border-emerald-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="p-1 rounded-md bg-emerald-500 text-white font-bold text-xs">
                    {feedback.score}/100
                  </span>
                  <h4 className="font-bold text-sm sm:text-base text-emerald-800 dark:text-emerald-300">
                    Retroalimentación IA
                  </h4>
                </div>
              </div>

              <div className="space-y-2 text-xs sm:text-sm">
                <div>
                  <p className="font-semibold text-emerald-700 dark:text-emerald-400">Puntos Fuertes:</p>
                  <ul className="list-disc list-inside space-y-1 text-slate-700 dark:text-slate-300">
                    {feedback.positives.map((p, idx) => (
                      <li key={idx}>{p}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="font-semibold text-amber-700 dark:text-amber-400">Sugerencias de Mejora:</p>
                  <ul className="list-disc list-inside space-y-1 text-slate-700 dark:text-slate-300">
                    {feedback.improvements.map((imp, idx) => (
                      <li key={idx}>{imp}</li>
                    ))}
                  </ul>
                </div>

                <p className="italic text-slate-600 dark:text-slate-400 pt-1 border-t border-inherit/20">
                  {feedback.grammarNote}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
