import React, { useState } from 'react';
import { Volume2, CheckCircle, XCircle, Eye, EyeOff, RotateCcw, ArrowRight, Sparkles } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { speakEnglish, playFeedbackSound, stopSpeaking } from '../../utils/audio';
import { DictationItem } from '../../data/relationshipsData';
import { VocabularySidebar } from './VocabularySidebar';
import { ReversibleTextCard } from './ReversibleTextCard';

interface DictationExerciseViewProps {
  activityNumber: number;
  items: DictationItem[];
  speed?: number;
  accent?: 'US' | 'UK';
  onNext?: () => void;
  isLast?: boolean;
}

export const DictationExerciseView: React.FC<DictationExerciseViewProps> = ({
  activityNumber,
  items,
  speed = 1.0,
  accent = 'US',
  onNext,
  isLast = false,
}) => {
  const { isDark } = useTheme();

  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [evaluated, setEvaluated] = useState<Record<string, boolean>>({});
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [playingKey, setPlayingKey] = useState<string | null>(null);

  const handlePlay = (item: DictationItem) => {
    stopSpeaking();
    setPlayingKey(item.id);
    speakEnglish(
      item.sentence,
      speed,
      accent,
      undefined,
      () => setPlayingKey(null),
      'female'
    );
  };

  const handleInputChange = (id: string, value: string) => {
    setInputs((prev) => ({ ...prev, [id]: value }));
    if (evaluated[id] !== undefined) {
      setEvaluated((prev) => {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      });
    }
  };

  const cleanText = (str: string) => {
    return str
      .trim()
      .toLowerCase()
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '')
      .replace(/\s+/g, ' ');
  };

  const handleCheck = (item: DictationItem) => {
    const val = inputs[item.id] || '';
    const isCorrect = cleanText(val) === cleanText(item.sentence);

    setEvaluated((prev) => ({ ...prev, [item.id]: isCorrect }));

    if (isCorrect) {
      playFeedbackSound('correct');
    } else {
      playFeedbackSound('wrong');
    }
  };

  const handleToggleReveal = (id: string) => {
    playFeedbackSound('click');
    setRevealed((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAutoFill = (item: DictationItem) => {
    setInputs((prev) => ({ ...prev, [item.id]: item.sentence }));
    setEvaluated((prev) => ({ ...prev, [item.id]: true }));
    playFeedbackSound('correct');
  };

  const handleCheckAll = () => {
    playFeedbackSound('click');
    const newEval: Record<string, boolean> = {};
    let allOk = true;

    items.forEach((it) => {
      const val = inputs[it.id] || '';
      const ok = cleanText(val) === cleanText(it.sentence);
      newEval[it.id] = ok;
      if (!ok) allOk = false;
    });

    setEvaluated(newEval);

    if (allOk) {
      playFeedbackSound('correct');
    } else {
      playFeedbackSound('wrong');
    }
  };

  const handleResetAll = () => {
    playFeedbackSound('click');
    setInputs({});
    setEvaluated({});
    setRevealed({});
  };

  const totalAnswered = Object.keys(evaluated).length;
  const allCorrect = totalAnswered === items.length && Object.values(evaluated).every(Boolean);

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div
        className={`p-5 rounded-3xl border shadow-sm ${
          isDark
            ? 'bg-slate-800/80 border-slate-700 text-slate-100'
            : 'bg-white border-slate-200 text-slate-800'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide bg-sky-100 text-sky-700 dark:bg-sky-950/70 dark:text-sky-300">
                Unidad 8 · Sección 6
              </span>
              <span className="text-xs text-slate-400 font-medium">
                Actividad {activityNumber} de 7
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              Type the sentences that you hear in the dictation. Pay attention to punctuation.
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Escribe las oraciones que escuches en el dictado. Presta atención a la puntuación o presiona el botón para verificar.
            </p>
          </div>
        </div>
      </div>

      {/* Main 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Vocabulary Sidebar */}
        <div className="lg:col-span-5 space-y-4">
          <VocabularySidebar speed={speed} accent={accent} limit={5} />
        </div>

        {/* Right Column: Dictation Sentences */}
        <div className="lg:col-span-7 space-y-4">
          <div
            className={`p-6 rounded-3xl border shadow-sm space-y-4 ${
              isDark ? 'bg-slate-900/90 border-slate-700' : 'bg-white border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-sky-500" />
                Oraciones del Dictado (5 ítems)
              </span>
              <span className="text-[11px] text-slate-400">
                Toca 🔊 para escuchar cada frase
              </span>
            </div>

            <div className="space-y-3.5">
              {items.map((item, idx) => {
                const isPlaying = playingKey === item.id;
                const isItemEvaluated = evaluated[item.id] !== undefined;
                const isItemCorrect = evaluated[item.id];
                const isItemRevealed = revealed[item.id];
                const userVal = inputs[item.id] || '';

                return (
                  <div
                    key={item.id}
                    className={`p-3.5 rounded-2xl border transition-all ${
                      isItemEvaluated
                        ? isItemCorrect
                          ? 'border-emerald-500 bg-emerald-50/40 dark:bg-emerald-950/20'
                          : 'border-rose-400 bg-rose-50/40 dark:bg-rose-950/20'
                        : isDark
                        ? 'border-slate-800 bg-slate-800/60'
                        : 'border-slate-200 bg-sky-50/30'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {/* Play Audio Button */}
                      <button
                        type="button"
                        onClick={() => handlePlay(item)}
                        className={`p-2.5 rounded-xl shrink-0 transition-all ${
                          isPlaying
                            ? 'bg-sky-500 text-white animate-pulse'
                            : isDark
                            ? 'bg-slate-700 text-sky-400 hover:bg-slate-600'
                            : 'bg-white text-sky-600 border border-slate-200 hover:bg-sky-50 shadow-xs'
                        }`}
                        title="Escuchar audio del dictado"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>

                      {/* Input & Display */}
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={userVal}
                            onChange={(e) => handleInputChange(item.id, e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') handleCheck(item);
                            }}
                            placeholder="Escribe lo que escuchas aquí..."
                            className={`w-full px-3.5 py-2 rounded-xl border text-sm font-medium transition-all outline-hidden ${
                              isItemEvaluated
                                ? isItemCorrect
                                  ? 'border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-100'
                                  : 'border-rose-400 bg-rose-50/60 dark:bg-rose-950/40 text-rose-900 dark:text-rose-100'
                                : isDark
                                ? 'bg-slate-800 border-slate-700 text-slate-100 focus:border-sky-500 focus:ring-1 focus:ring-sky-500'
                                : 'bg-white border-slate-300 text-slate-800 focus:border-sky-500 focus:ring-1 focus:ring-sky-500'
                            }`}
                          />

                          {/* Quick check button */}
                          <button
                            type="button"
                            onClick={() => handleCheck(item)}
                            className="px-3 py-2 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold shrink-0 transition-colors shadow-xs"
                          >
                            Verificar
                          </button>
                        </div>

                        {/* Revealed / Helper sentence */}
                        {(isItemRevealed || isItemCorrect) && (
                          <div className="p-2 rounded-lg bg-sky-100/70 dark:bg-sky-950/40 text-xs font-medium text-sky-800 dark:text-sky-200 flex items-center justify-between">
                            <span>{item.sentence}</span>
                            <span className="text-[10px] uppercase font-mono text-slate-400">
                              (Original)
                            </span>
                          </div>
                        )}

                        <div className="flex items-center justify-between text-xs pt-1">
                          <button
                            type="button"
                            onClick={() => handleToggleReveal(item.id)}
                            className="text-slate-400 hover:text-sky-500 transition-colors flex items-center gap-1 text-[11px]"
                          >
                            {isItemRevealed ? (
                              <>
                                <EyeOff className="w-3 h-3" />
                                <span>Ocultar texto</span>
                              </>
                            ) : (
                              <>
                                <Eye className="w-3 h-3" />
                                <span>Ver texto original</span>
                              </>
                            )}
                          </button>

                          <button
                            type="button"
                            onClick={() => handleAutoFill(item)}
                            className="text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors text-[11px]"
                          >
                            Rellenar respuesta
                          </button>
                        </div>
                      </div>

                      {/* Status icon */}
                      {isItemEvaluated && (
                        <div className="shrink-0 pt-2">
                          {isItemCorrect ? (
                            <CheckCircle className="w-5 h-5 text-emerald-500" />
                          ) : (
                            <XCircle className="w-5 h-5 text-rose-500" />
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleResetAll}
                className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Limpiar todo</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCheckAll}
                  className="px-6 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs sm:text-sm shadow-sm transition-all"
                >
                  Comprobar todo
                </button>

                {allCorrect && onNext && !isLast && (
                  <button
                    type="button"
                    onClick={onNext}
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-1.5"
                  >
                    <span>Siguiente</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* 3D Reversible Flip Card for Spanish Translations */}
          <ReversibleTextCard
            englishText={items.map((it) => `• ${it.sentence}`).join('\n')}
            spanishText={items.map((it) => `• ${it.translation}`).join('\n')}
            speechRate={speed}
            accent={accent}
            size="md"
          />
        </div>
      </div>
    </div>
  );
};
