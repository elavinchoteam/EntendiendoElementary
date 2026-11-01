import React, { useState } from 'react';
import { Volume2, RefreshCw, BookOpen, Sparkles, CheckCircle2 } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { speakEnglish, stopSpeaking, playFeedbackSound } from '../../utils/audio';
import { TammyEmailCard } from './TammyEmailCard';

interface Activity1ExploreProps {
  speed?: number;
  accent?: 'US' | 'UK';
}

export const Activity1Explore: React.FC<Activity1ExploreProps> = ({
  speed = 1.0,
  accent = 'US',
}) => {
  const { isDark } = useTheme();

  // Instruction flip
  const [isHeaderFlipped, setIsHeaderFlipped] = useState(false);
  const instructionEn =
    'Read Tammy\'s e-mail carefully. Click on sentences to listen to the pronunciation, or flip to view the complete Spanish translation.';
  const instructionEs =
    'Lee atentamente el correo electrónico de Tammy. Haz clic en las oraciones para escuchar la pronunciación o voltéalo para ver la traducción completa al español.';

  const handleToggleHeaderFlip = () => {
    playFeedbackSound('click');
    setIsHeaderFlipped((prev) => !prev);
  };

  const handlePlayInstruction = (e: React.MouseEvent) => {
    e.stopPropagation();
    stopSpeaking();
    playFeedbackSound('click');
    speakEnglish(instructionEn, speed, accent);
  };

  const VOCAB_HIGHLIGHTS = [
    {
      word: 'summer job',
      wordEs: 'trabajo de verano (temporal)',
      note: 'A temporary job during school/college summer break.',
    },
    {
      word: 'department store',
      wordEs: 'tienda por departamentos',
      note: 'A large retail store divided into departments (clothing, shoes, electronics).',
    },
    {
      word: 'crowded',
      wordEs: 'abarrotado / lleno de gente',
      note: 'Full of customers; busy and packed with people.',
    },
    {
      word: 'have to stand',
      wordEs: 'tener que estar de pie',
      note: 'Obligation to remain on one\'s feet all day without sitting.',
    },
    {
      word: 'breaks',
      wordEs: 'descansos / pausas laborales',
      note: 'Short rest periods during the workday.',
    },
  ];

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
                Actividad 1 · Lectura & Exploración
              </span>
              <span className="text-xs text-slate-400 font-medium hidden sm:inline">
                {isHeaderFlipped ? 'Español' : 'English'}
              </span>
            </div>
            {!isHeaderFlipped ? (
              <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 leading-relaxed">
                {instructionEn}
              </p>
            ) : (
              <p className="text-xs sm:text-sm font-medium italic text-emerald-800 dark:text-emerald-300 leading-relaxed font-serif">
                {instructionEs}
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
              onClick={handlePlayInstruction}
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

      {/* 2-column layout: Email on left, vocabulary highlights on right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left: Email card */}
        <div className="lg:col-span-7">
          <TammyEmailCard speed={speed} accent={accent} />
        </div>

        {/* Right: Vocabulary & Comprehension Guide */}
        <div className="lg:col-span-5 space-y-4">
          <div
            className={`p-4 sm:p-5 rounded-2xl border ${
              isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}
          >
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-200 dark:border-slate-800">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                Vocabulario Clave del Correo
              </span>
              <span className="text-[10px] text-slate-400">Palabras clave</span>
            </div>

            <div className="space-y-2.5">
              {VOCAB_HIGHLIGHTS.map((item) => (
                <div
                  key={item.word}
                  className={`p-2.5 rounded-xl border transition-all ${
                    isDark
                      ? 'bg-slate-800/60 border-slate-700/80'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    <span className="text-xs font-bold text-sky-600 dark:text-sky-400">
                      {item.word}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        stopSpeaking();
                        playFeedbackSound('click');
                        speakEnglish(item.word, speed, accent);
                      }}
                      className="w-5 h-5 rounded flex items-center justify-center text-slate-400 hover:text-sky-500 cursor-pointer"
                      title="Escuchar palabra"
                    >
                      <Volume2 className="w-3 h-3" />
                    </button>
                  </div>
                  <p className="text-[11px] font-medium text-emerald-700 dark:text-emerald-300 italic font-serif">
                    {item.wordEs}
                  </p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                    {item.note}
                  </p>
                </div>
              ))}
            </div>

            {/* Reading tip */}
            <div className="mt-4 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-[11px] text-amber-900 dark:text-amber-200">
              <span className="font-bold block mb-0.5">💡 Consejo de lectura:</span>
              Observa cómo Tammy usa expresiones de obligación como <em>"I have to smile"</em> y <em>"I have to stand all day"</em> para quejarse de su trabajo difícil.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
