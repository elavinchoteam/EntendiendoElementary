import React, { useState } from 'react';
import { CheckCircle, XCircle, RotateCcw, Volume2, ArrowRight, Sparkles } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { speakEnglish, playFeedbackSound, stopSpeaking } from '../../utils/audio';
import { VocabularySidebar } from './VocabularySidebar';
import { ReversibleTextCard } from './ReversibleTextCard';

interface Activity6DialogueWorkProps {
  speed?: number;
  accent?: 'US' | 'UK';
  onNext?: () => void;
}

export const Activity6DialogueWork: React.FC<Activity6DialogueWorkProps> = ({
  speed = 1.0,
  accent = 'US',
  onNext,
}) => {
  const { isDark } = useTheme();

  // 4 dropdowns:
  // 0: Man: Are you going to the [meeting] at two o'clock? (options: report, meeting, summer job)
  // 1: Woman: No. I'm [writing a report] and my boss wants it by two thirty. (options: making a meeting, writing a report, having a break)
  // 2: Woman: I'd love a [break] , but I don't have time. (options: report, meeting, break)
  // 3: Man: I'm [starting a new business] and I want to tell you all about it. (options: doing, starting a new business, making)
  const dropdownConfigs = [
    {
      id: 0,
      options: ['report', 'meeting', 'summer job'],
      correct: 'meeting',
    },
    {
      id: 1,
      options: ['making a meeting', 'writing a report', 'having a break'],
      correct: 'writing a report',
    },
    {
      id: 2,
      options: ['report', 'meeting', 'break'],
      correct: 'break',
    },
    {
      id: 3,
      options: ['doing', 'starting a new business', 'making'],
      correct: 'starting a new business',
    },
  ];

  const [selections, setSelections] = useState<Record<number, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [results, setResults] = useState<Record<number, boolean>>({});

  const handleSelect = (idx: number, val: string) => {
    playFeedbackSound('click');
    setSelections((prev) => ({ ...prev, [idx]: val }));
    setIsSubmitted(false);
  };

  const handleCheck = () => {
    playFeedbackSound('click');
    const newResults: Record<number, boolean> = {};
    let allOk = true;

    dropdownConfigs.forEach((cfg) => {
      const isCorrect = selections[cfg.id] === cfg.correct;
      newResults[cfg.id] = isCorrect;
      if (!isCorrect) allOk = false;
    });

    setResults(newResults);
    setIsSubmitted(true);

    if (allOk && Object.keys(selections).length === dropdownConfigs.length) {
      playFeedbackSound('correct');
    } else {
      playFeedbackSound('wrong');
    }
  };

  const handleReset = () => {
    playFeedbackSound('click');
    setSelections({});
    setIsSubmitted(false);
    setResults({});
  };

  const handleSpeakLine = (text: string, gender: 'male' | 'female' = 'female') => {
    stopSpeaking();
    speakEnglish(text, speed, accent, undefined, undefined, gender);
  };

  const fullDialogueEnglish = `Man: Are you going to the meeting at two o'clock?
Woman: No. I'm writing a report and my boss wants it by two thirty.
Man: Can I come to your office after the meeting?
Woman: I'd love a break, but I don't have time.
Man: I'm starting a new business and I want to tell you all about it.`;

  const fullDialogueSpanish = `Hombre: ¿Vas a ir a la reunión a las dos en punto?
Mujer: No. Estoy escribiendo un informe y mi jefa lo quiere para las dos y media.
Hombre: ¿Puedo pasar por tu oficina después de la reunión?
Mujer: Me encantaría tomar un descanso, pero no tengo tiempo.
Hombre: Estoy comenzando un negocio nuevo y quiero contártelo todo.`;

  const isAllSelected = Object.keys(selections).length === dropdownConfigs.length;
  const isAllCorrect = isSubmitted && isAllSelected && Object.values(results).every(Boolean);

  const renderDropdown = (idx: number) => {
    const config = dropdownConfigs[idx];
    const userVal = selections[idx] || '';
    const evaluated = isSubmitted && results[idx] !== undefined;
    const isCorrect = evaluated && results[idx];
    const isWrong = evaluated && !results[idx];

    return (
      <span className="inline-block mx-1.5 align-middle">
        <select
          value={userVal}
          onChange={(e) => handleSelect(idx, e.target.value)}
          className={`px-3 py-1.5 rounded-xl border text-sm font-semibold transition-all outline-hidden cursor-pointer ${
            isCorrect
              ? 'border-emerald-500 bg-emerald-50 text-emerald-900 dark:bg-emerald-950/70 dark:text-emerald-200'
              : isWrong
              ? 'border-rose-400 bg-rose-50 text-rose-900 dark:bg-rose-950/70 dark:text-rose-200'
              : isDark
              ? 'bg-slate-800 border-slate-600 text-slate-100 hover:border-sky-400'
              : 'bg-white border-sky-300 text-slate-800 hover:border-sky-500 shadow-xs'
          }`}
        >
          <option value="">Selecciona...</option>
          {config.options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        {evaluated && (
          <span className="ml-1 inline-block align-middle">
            {isCorrect ? (
              <CheckCircle className="w-4 h-4 text-emerald-500 inline" />
            ) : (
              <XCircle className="w-4 h-4 text-rose-500 inline" />
            )}
          </span>
        )}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
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
                Unidad 9 · Sección 7
              </span>
              <span className="text-xs text-slate-400 font-medium">Actividad 6 de 7</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              Select the correct answer from the drop-down list.
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Selecciona la opción correcta en cada menú desplegable para completar la conversación de oficina entre el hombre y la mujer.
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

        {/* Right Column: Dialogue View */}
        <div className="lg:col-span-7 space-y-4">
          <div
            className={`p-6 sm:p-8 rounded-3xl border shadow-sm space-y-6 ${
              isDark ? 'bg-slate-900/90 border-slate-700' : 'bg-white border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-sky-500" />
                Diálogo en la Oficina
              </span>
              <span className="text-xs text-slate-400">4 opciones por completar</span>
            </div>

            {/* Conversation Bubbles */}
            <div className="space-y-4 leading-relaxed text-sm sm:text-base">
              {/* Line 1: Man */}
              <div className="flex items-start gap-3">
                <button
                  type="button"
                  onClick={() =>
                    handleSpeakLine("Are you going to the meeting at two o'clock?", 'male')
                  }
                  className="p-2 rounded-xl bg-sky-100 hover:bg-sky-200 dark:bg-sky-950 text-sky-700 dark:text-sky-300 shrink-0 transition-colors"
                  title="Escuchar al hombre"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
                <div className="flex-1 p-3.5 rounded-2xl bg-sky-50/70 dark:bg-slate-800/80 border border-sky-100 dark:border-slate-700">
                  <span className="font-bold text-sky-800 dark:text-sky-300 mr-2">Man:</span>
                  <span>Are you going to the</span>
                  {renderDropdown(0)}
                  <span>at two o'clock?</span>
                </div>
              </div>

              {/* Line 2: Woman */}
              <div className="flex items-start gap-3">
                <button
                  type="button"
                  onClick={() =>
                    handleSpeakLine(
                      "No. I'm writing a report and my boss wants it by two thirty.",
                      'female'
                    )
                  }
                  className="p-2 rounded-xl bg-purple-100 hover:bg-purple-200 dark:bg-purple-950 text-purple-700 dark:text-purple-300 shrink-0 transition-colors"
                  title="Escuchar a la mujer"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
                <div className="flex-1 p-3.5 rounded-2xl bg-purple-50/70 dark:bg-slate-800/80 border border-purple-100 dark:border-slate-700">
                  <span className="font-bold text-purple-800 dark:text-purple-300 mr-2">Woman:</span>
                  <span>No. I'm</span>
                  {renderDropdown(1)}
                  <span>and my boss wants it by two thirty.</span>
                </div>
              </div>

              {/* Line 3: Man */}
              <div className="flex items-start gap-3">
                <button
                  type="button"
                  onClick={() =>
                    handleSpeakLine('Can I come to your office after the meeting?', 'male')
                  }
                  className="p-2 rounded-xl bg-sky-100 hover:bg-sky-200 dark:bg-sky-950 text-sky-700 dark:text-sky-300 shrink-0 transition-colors"
                  title="Escuchar al hombre"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
                <div className="flex-1 p-3.5 rounded-2xl bg-sky-50/70 dark:bg-slate-800/80 border border-sky-100 dark:border-slate-700">
                  <span className="font-bold text-sky-800 dark:text-sky-300 mr-2">Man:</span>
                  <span>Can I come to your office after the meeting?</span>
                </div>
              </div>

              {/* Line 4: Woman */}
              <div className="flex items-start gap-3">
                <button
                  type="button"
                  onClick={() =>
                    handleSpeakLine("I'd love a break, but I don't have time.", 'female')
                  }
                  className="p-2 rounded-xl bg-purple-100 hover:bg-purple-200 dark:bg-purple-950 text-purple-700 dark:text-purple-300 shrink-0 transition-colors"
                  title="Escuchar a la mujer"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
                <div className="flex-1 p-3.5 rounded-2xl bg-purple-50/70 dark:bg-slate-800/80 border border-purple-100 dark:border-slate-700">
                  <span className="font-bold text-purple-800 dark:text-purple-300 mr-2">Woman:</span>
                  <span>I'd love a</span>
                  {renderDropdown(2)}
                  <span>, but I don't have time.</span>
                </div>
              </div>

              {/* Line 5: Man */}
              <div className="flex items-start gap-3">
                <button
                  type="button"
                  onClick={() =>
                    handleSpeakLine(
                      "I'm starting a new business and I want to tell you all about it.",
                      'male'
                    )
                  }
                  className="p-2 rounded-xl bg-sky-100 hover:bg-sky-200 dark:bg-sky-950 text-sky-700 dark:text-sky-300 shrink-0 transition-colors"
                  title="Escuchar al hombre"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
                <div className="flex-1 p-3.5 rounded-2xl bg-sky-50/70 dark:bg-slate-800/80 border border-sky-100 dark:border-slate-700">
                  <span className="font-bold text-sky-800 dark:text-sky-300 mr-2">Man:</span>
                  <span>I'm</span>
                  {renderDropdown(3)}
                  <span>and I want to tell you all about it.</span>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reiniciar</span>
              </button>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleCheck}
                  disabled={!isAllSelected}
                  className="px-6 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-sm shadow-md transition-all cursor-pointer"
                >
                  Comprobar
                </button>

                {isAllCorrect && onNext && (
                  <button
                    type="button"
                    onClick={onNext}
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Siguiente</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Reversible Card for Dialogue Translation */}
          <ReversibleTextCard
            englishText={fullDialogueEnglish}
            spanishText={fullDialogueSpanish}
            grammarTip="Colocaciones clave: 'go to a meeting' (ir a una reunión), 'write a report' (escribir un informe), 'have a break' (tomar un descanso), 'start a business' (empezar un negocio)."
            speechRate={speed}
            accent={accent}
            size="md"
            frontLabel="Diálogo Completo en Inglés"
            backLabel="Traducción Completa al Español"
          />
        </div>
      </div>
    </div>
  );
};
