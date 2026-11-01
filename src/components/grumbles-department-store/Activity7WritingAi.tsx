import React, { useState } from 'react';
import {
  Volume2,
  RefreshCw,
  Sparkles,
  Save,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  BookOpen,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { speakEnglish, stopSpeaking, playFeedbackSound } from '../../utils/audio';
import { TammyEmailCard } from './TammyEmailCard';
import { ACTIVITY_7_PROMPT } from '../../data/grumblesDepartmentStoreData';

interface Activity7WritingAiProps {
  speed?: number;
  accent?: 'US' | 'UK';
}

export const Activity7WritingAi: React.FC<Activity7WritingAiProps> = ({
  speed = 1.0,
  accent = 'US',
}) => {
  const { isDark } = useTheme();

  // Instruction and task flip
  const [isHeaderFlipped, setIsHeaderFlipped] = useState(false);
  const [isTaskFlipped, setIsTaskFlipped] = useState(false);

  // Editor text
  const [text, setText] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  // AI Feedback state
  const [feedbackCountLeft, setFeedbackCountLeft] = useState(2);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiFeedback, setAiFeedback] = useState<{
    strengths: string[];
    suggestions: string[];
    score: number;
    feedbackMessage: string;
    feedbackMessageEs: string;
  } | null>(null);

  // Sample email view toggle
  const [showSample, setShowSample] = useState(false);
  const [isSampleFlipped, setIsSampleFlipped] = useState(false);

  // Word count
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;

  const handleToggleHeaderFlip = () => {
    playFeedbackSound('click');
    setIsHeaderFlipped((prev) => !prev);
  };

  const handleToggleTaskFlip = () => {
    playFeedbackSound('click');
    setIsTaskFlipped((prev) => !prev);
  };

  const handlePlayAudio = (textEn: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    stopSpeaking();
    playFeedbackSound('click');
    speakEnglish(textEn, speed, accent);
  };

  const handleSave = () => {
    playFeedbackSound('click');
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleRequestAiFeedback = () => {
    if (words < 10) {
      alert('Por favor escribe al menos 10 palabras antes de solicitar revisión.');
      return;
    }

    if (feedbackCountLeft <= 0) return;

    playFeedbackSound('click');
    setIsAnalyzing(true);

    setTimeout(() => {
      setIsAnalyzing(false);
      setFeedbackCountLeft((prev) => Math.max(0, prev - 1));
      playFeedbackSound('correct');

      const lower = text.toLowerCase();
      const hasGreeting = lower.includes('dear') || lower.includes('hi') || lower.includes('hello');
      const hasShoe = lower.includes('shoe') || lower.includes('shoes') || lower.includes('store');
      const hasLike = lower.includes('like') || lower.includes('love') || lower.includes('enjoy');
      const hasDislike = lower.includes("don't like") || lower.includes('hate') || lower.includes('stand') || lower.includes('tiring');
      const hasCrowd = lower.includes('crowded') || lower.includes('customers') || lower.includes('busy') || lower.includes('people');
      const hasBreaks = lower.includes('break') || lower.includes('breaks') || lower.includes('rest');

      const strengths: string[] = [];
      const suggestions: string[] = [];

      if (hasGreeting) {
        strengths.push('Excelente formato de apertura (saludo inicial)');
      } else {
        suggestions.push('Agrega un saludo amigable como "Dear [Amigo/a]" o "Hi [Name],"');
      }

      if (hasShoe) {
        strengths.push('Mencionas adecuadamente el trabajo en la zapatería (shoe store)');
      } else {
        suggestions.push('Asegúrate de especificar que tu trabajo es en una tienda de zapatos (shoe store)');
      }

      if (hasLike && hasDislike) {
        strengths.push('Expresas con claridad lo que te gusta y lo que te disgusta de tus funciones');
      } else {
        suggestions.push('Describe qué aspectos te gustan y cuáles no te gustan de estar allí');
      }

      if (hasCrowd) {
        strengths.push('Mencionas si la tienda está concurrida o llena de clientes (crowded)');
      } else {
        suggestions.push('Incluye si la tienda suele estar concurrida (is the store crowded?)');
      }

      if (hasBreaks) {
        strengths.push('Respondes sobre los descansos durante tu turno (breaks)');
      } else {
        suggestions.push('Menciona si tienes suficientes descansos o pausas (breaks)');
      }

      let score = 70;
      if (words >= 35) score += 10;
      if (hasGreeting) score += 5;
      if (hasLike && hasDislike) score += 5;
      if (hasCrowd && hasBreaks) score += 10;
      score = Math.min(100, score);

      setAiFeedback({
        strengths,
        suggestions,
        score,
        feedbackMessage:
          score >= 90
            ? 'Fantastic writing! You covered all points with natural vocabulary and proper email structure.'
            : 'Good effort! Follow the suggestions to polish your summer job email even further.',
        feedbackMessageEs:
          score >= 90
            ? '¡Excelente redacción! Cubriste todos los puntos con vocabulario natural y buena estructura epistolar.'
            : '¡Buen intento! Sigue las sugerencias para perfeccionar tu correo sobre el trabajo de verano.',
      });
    }, 900);
  };

  const handleInsertSample = () => {
    playFeedbackSound('click');
    setText(ACTIVITY_7_PROMPT.sampleEmailEn);
    setShowSample(false);
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-4">
      {/* Reversible Instruction Header Card */}
      <div
        className={`p-3.5 sm:p-4 rounded-2xl border transition-all shadow-xs ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        }`}
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 text-[11px] font-bold rounded-md bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 uppercase tracking-wider font-mono">
                Actividad 7 · Redacción & AI Feedback
              </span>
              <span className="text-xs text-slate-400 font-medium hidden sm:inline">
                {isHeaderFlipped ? 'Español' : 'English'}
              </span>
            </div>
            {!isHeaderFlipped ? (
              <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 leading-relaxed">
                {ACTIVITY_7_PROMPT.instructionEn}
              </p>
            ) : (
              <p className="text-xs sm:text-sm font-medium italic text-emerald-800 dark:text-emerald-300 leading-relaxed font-serif">
                {ACTIVITY_7_PROMPT.instructionEs}
              </p>
            )}
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={handleToggleHeaderFlip}
              className={`w-8 h-8 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                isHeaderFlipped
                  ? 'bg-emerald-500 text-white border-emerald-600'
                  : isDark
                  ? 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
                  : 'bg-slate-100 border-slate-200 text-slate-700 hover:text-slate-900'
              }`}
              title="Voltear instrucción al español"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isHeaderFlipped ? 'rotate-180' : ''}`} />
            </button>
            <button
              type="button"
              onClick={(e) => handlePlayAudio(ACTIVITY_7_PROMPT.instructionEn, e)}
              className={`w-8 h-8 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                isDark
                  ? 'bg-slate-800 border-slate-700 text-sky-400 hover:text-white'
                  : 'bg-slate-100 border-slate-200 text-sky-600 hover:text-sky-800'
              }`}
              title="Escuchar instrucción"
            >
              <Volume2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main 2-column layout matching screenshot */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left: Email card */}
        <div className="lg:col-span-5">
          <TammyEmailCard speed={speed} accent={accent} />
        </div>

        {/* Right: Writing Prompt & Editor Box */}
        <div className="lg:col-span-7 space-y-4">
          {/* Prompt card */}
          <div
            className={`p-3.5 sm:p-4 rounded-2xl border transition-all ${
              isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
            }`}
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                Consigna de Escritura:
              </span>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleToggleTaskFlip}
                  className="px-2 py-0.5 rounded-lg border border-slate-200 dark:border-slate-700 text-[11px] font-semibold flex items-center gap-1 text-slate-600 dark:text-slate-300 hover:text-sky-600 cursor-pointer"
                  title="Traducir consigna"
                >
                  <RefreshCw className={`w-3 h-3 ${isTaskFlipped ? 'rotate-180' : ''}`} />
                  <span>{isTaskFlipped ? 'Inglés' : 'Español'}</span>
                </button>

                <button
                  type="button"
                  onClick={(e) => handlePlayAudio(ACTIVITY_7_PROMPT.taskEn, e)}
                  className="w-6 h-6 rounded-md border border-slate-200 dark:border-slate-700 flex items-center justify-center text-sky-500 hover:text-sky-700 cursor-pointer"
                  title="Escuchar consigna"
                >
                  <Volume2 className="w-3 h-3" />
                </button>
              </div>
            </div>

            {!isTaskFlipped ? (
              <p className="text-xs sm:text-sm font-normal text-slate-800 dark:text-slate-200 leading-relaxed">
                {ACTIVITY_7_PROMPT.taskEn}
              </p>
            ) : (
              <p className="text-xs sm:text-sm font-medium italic text-emerald-800 dark:text-emerald-300 leading-relaxed font-serif">
                {ACTIVITY_7_PROMPT.taskEs}
              </p>
            )}
          </div>

          {/* Editor Box matching screenshot style */}
          <div
            className={`rounded-2xl border transition-all overflow-hidden ${
              isDark ? 'bg-slate-900 border-sky-600/50' : 'bg-white border-sky-400 shadow-sm'
            }`}
          >
            {/* Editor top status bar */}
            <div
              className={`px-4 py-2 border-b flex items-center justify-between text-xs font-medium ${
                isDark ? 'bg-slate-800/80 border-slate-700 text-slate-400' : 'bg-sky-50/60 border-sky-100 text-slate-600'
              }`}
            >
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleSave}
                  className="hover:text-sky-600 flex items-center gap-1 cursor-pointer font-semibold"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{isSaved ? '¡Guardado!' : 'Save'}</span>
                </button>
                <span className="text-slate-300 dark:text-slate-700">|</span>
                <span>Edit text</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="font-mono text-slate-500 dark:text-slate-400">
                  Words: <strong className="text-sky-600 dark:text-sky-400">{words}</strong>
                </span>

                <button
                  type="button"
                  onClick={() => setShowSample((prev) => !prev)}
                  className="text-[11px] underline text-sky-600 dark:text-sky-400 cursor-pointer"
                >
                  {showSample ? 'Ocultar modelo' : 'Ver modelo de ejemplo'}
                </button>
              </div>
            </div>

            {/* Model sample popover if opened */}
            {showSample && (
              <div className="p-3 bg-amber-50/90 dark:bg-amber-950/40 border-b border-amber-200 dark:border-amber-900 text-xs">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5" />
                    Ejemplo de Correo sobre Shoe Store:
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIsSampleFlipped((prev) => !prev)}
                      className="text-[11px] underline text-amber-700 dark:text-amber-400 cursor-pointer"
                    >
                      {isSampleFlipped ? 'Ver inglés' : 'Traducir'}
                    </button>
                    <button
                      type="button"
                      onClick={handleInsertSample}
                      className="px-2 py-0.5 rounded bg-amber-600 text-white font-semibold text-[10px] cursor-pointer"
                    >
                      Usar este texto
                    </button>
                  </div>
                </div>
                <p className="whitespace-pre-line font-mono text-[11px] text-slate-700 dark:text-slate-300">
                  {!isSampleFlipped ? ACTIVITY_7_PROMPT.sampleEmailEn : ACTIVITY_7_PROMPT.sampleEmailEs}
                </p>
              </div>
            )}

            {/* Textarea */}
            <div className="p-3 sm:p-4">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Dear [Friend's Name],&#10;&#10;Hi! I have a summer job at a shoe store...&#10;&#10;[Your Name]"
                rows={9}
                className="w-full bg-transparent resize-y outline-none text-xs sm:text-sm leading-relaxed text-slate-900 dark:text-slate-100 placeholder:text-slate-400 font-sans"
              />
            </div>

            {/* Bottom Bar matching screenshot */}
            <div
              className={`px-4 py-2.5 border-t flex flex-wrap items-center justify-between gap-3 ${
                isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="text-[11px] text-slate-500 dark:text-slate-400">
                <span>{feedbackCountLeft} AI feedback requests left</span>
              </div>

              <button
                type="button"
                disabled={isAnalyzing || feedbackCountLeft <= 0}
                onClick={handleRequestAiFeedback}
                className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isAnalyzing ? 'Analizando...' : 'AI Feedback'}</span>
              </button>
            </div>
          </div>

          {/* AI Feedback card */}
          {aiFeedback && (
            <div
              className={`p-4 rounded-2xl border animate-in fade-in duration-200 ${
                aiFeedback.score >= 80
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-700'
                  : 'bg-sky-50 dark:bg-sky-950/40 border-sky-300 dark:border-sky-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-sky-500" />
                  Retroalimentación Inteligente
                </span>
                <span className="text-xs font-black px-2 py-0.5 rounded-full bg-white dark:bg-slate-800 border font-mono">
                  Puntaje: {aiFeedback.score}/100
                </span>
              </div>

              <p className="text-xs text-slate-700 dark:text-slate-300 mb-1">
                {aiFeedback.feedbackMessage}
              </p>
              <p className="text-xs italic text-slate-500 dark:text-slate-400 font-serif mb-3">
                {aiFeedback.feedbackMessageEs}
              </p>

              {aiFeedback.strengths.length > 0 && (
                <div className="mb-2">
                  <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 block mb-1">
                    ✓ Aspectos logrados:
                  </span>
                  <ul className="text-xs space-y-1 text-slate-700 dark:text-slate-300 pl-4 list-disc">
                    {aiFeedback.strengths.map((s, idx) => (
                      <li key={idx}>{s}</li>
                    ))}
                  </ul>
                </div>
              )}

              {aiFeedback.suggestions.length > 0 && (
                <div>
                  <span className="text-[11px] font-bold text-amber-700 dark:text-amber-400 block mb-1">
                    💡 Recomendaciones de mejora:
                  </span>
                  <ul className="text-xs space-y-1 text-slate-700 dark:text-slate-300 pl-4 list-disc">
                    {aiFeedback.suggestions.map((s, idx) => (
                      <li key={idx}>{s}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
