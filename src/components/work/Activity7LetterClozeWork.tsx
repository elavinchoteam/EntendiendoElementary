import React, { useState } from 'react';
import { CheckCircle, XCircle, RotateCcw, Volume2, ArrowRight, Sparkles, Mail } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { speakEnglish, playFeedbackSound, stopSpeaking } from '../../utils/audio';
import { VocabularySidebar } from './VocabularySidebar';
import { ReversibleTextCard } from './ReversibleTextCard';

interface Activity7LetterClozeWorkProps {
  speed?: number;
  accent?: 'US' | 'UK';
  onNext?: () => void;
}

export const Activity7LetterClozeWork: React.FC<Activity7LetterClozeWorkProps> = ({
  speed = 1.0,
  accent = 'US',
  onNext,
}) => {
  const { isDark } = useTheme();

  // 7 blanks:
  // 0: I have a new [summer job] in a big office.
  // 1: I have to wear a [suit] for work.
  // 2: I sit at a [desk] all day
  // 3: and I write [reports] for my boss.
  // 4: She goes to lots of [meetings] .
  // 5: but the [office] is right near a big department store
  // 6: so I go shopping on my lunch [break] .
  const correctAnswers = ['summer job', 'suit', 'desk', 'reports', 'meetings', 'office', 'break'];
  const allChips = ['summer job', 'desk', 'meetings', 'suit', 'break', 'office', 'reports'];

  const [filledBlanks, setFilledBlanks] = useState<Record<number, string>>({});
  const [selectedChip, setSelectedChip] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [results, setResults] = useState<Record<number, boolean>>({});
  const [draggingOverBlank, setDraggingOverBlank] = useState<number | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const usedChips = Object.values(filledBlanks);
  const availableChips = allChips.filter((c) => !usedChips.includes(c));

  const handleSelectChip = (chip: string) => {
    if (isSubmitted && Object.values(results).every(Boolean)) return;
    playFeedbackSound('click');
    setSelectedChip(chip);
  };

  const handleFillBlank = (blankIdx: number, chipVal?: string) => {
    if (isSubmitted && results[blankIdx]) return;
    const chipToUse = chipVal || selectedChip;
    if (!chipToUse) return;

    playFeedbackSound('click');
    setFilledBlanks((prev) => ({
      ...prev,
      [blankIdx]: chipToUse,
    }));
    setSelectedChip(null);
    setIsSubmitted(false);
  };

  const handleClearBlank = (blankIdx: number) => {
    if (isSubmitted && results[blankIdx]) return;
    playFeedbackSound('click');
    setFilledBlanks((prev) => {
      const copy = { ...prev };
      delete copy[blankIdx];
      return copy;
    });
    setIsSubmitted(false);
  };

  const handleCheck = () => {
    playFeedbackSound('click');
    const newResults: Record<number, boolean> = {};
    let allOk = true;

    correctAnswers.forEach((ans, idx) => {
      const isCorrect = filledBlanks[idx] === ans;
      newResults[idx] = isCorrect;
      if (!isCorrect) allOk = false;
    });

    setResults(newResults);
    setIsSubmitted(true);

    if (allOk && Object.keys(filledBlanks).length === correctAnswers.length) {
      playFeedbackSound('correct');
    } else {
      playFeedbackSound('wrong');
    }
  };

  const handleReset = () => {
    playFeedbackSound('click');
    setFilledBlanks({});
    setSelectedChip(null);
    setIsSubmitted(false);
    setResults({});
  };

  const fullLetterEnglish = `Dear Mom and Dad,

I have a new summer job in a big office. I don't like the job very much. I have to wear a suit for work. I sit at a desk all day and I write reports for my boss. My boss is very busy. She goes to lots of meetings. The job is boring, but the office is right near a big department store so I go shopping on my lunch break.

Lots of love,
Ellen`;

  const fullLetterSpanish = `Queridos mamá y papá,

Tengo un nuevo trabajo de verano en una oficina grande. No me gusta mucho el trabajo. Tengo que vestir un traje para trabajar. Me siento en un escritorio todo el día y escribo informes para mi jefa. Mi jefa está muy ocupada. Ella va a muchas reuniones. El trabajo es aburrido, pero la oficina está justo al lado de una gran tienda por departamentos, así que voy de compras en mi descanso para almorzar.

Con mucho amor,
Ellen`;

  const handleSpeakLetter = () => {
    if (isPlayingAudio) {
      stopSpeaking();
      setIsPlayingAudio(false);
      return;
    }
    stopSpeaking();
    setIsPlayingAudio(true);
    speakEnglish(
      fullLetterEnglish,
      speed,
      accent,
      undefined,
      () => setIsPlayingAudio(false),
      'female'
    );
  };

  const isAllFilled = Object.keys(filledBlanks).length === correctAnswers.length;
  const isAllCorrect = isSubmitted && isAllFilled && Object.values(results).every(Boolean);

  const renderDropZone = (blankIdx: number) => {
    const val = filledBlanks[blankIdx];
    const evaluated = isSubmitted && results[blankIdx] !== undefined;
    const isCorrect = evaluated && results[blankIdx];
    const isWrong = evaluated && !results[blankIdx];
    const isDragHover = draggingOverBlank === blankIdx;

    if (val) {
      return (
        <span
          onClick={() => handleClearBlank(blankIdx)}
          className={`inline-flex items-center gap-1.5 px-3 py-1 mx-1.5 rounded-xl font-bold text-sm shadow-xs transition-transform cursor-pointer select-none ${
            isCorrect
              ? 'bg-emerald-600 text-white'
              : isWrong
              ? 'bg-rose-500 text-white'
              : 'bg-sky-500 text-white'
          }`}
          title="Haz clic para quitar"
        >
          <span>{val}</span>
          <span className="text-xs opacity-75 hover:opacity-100">✕</span>
        </span>
      );
    }

    return (
      <span
        onDragOver={(e) => {
          e.preventDefault();
          setDraggingOverBlank(blankIdx);
        }}
        onDragLeave={() => setDraggingOverBlank(null)}
        onDrop={(e) => {
          e.preventDefault();
          setDraggingOverBlank(null);
          const data = e.dataTransfer.getData('text/plain');
          if (data) handleFillBlank(blankIdx, data);
        }}
        onClick={() => handleFillBlank(blankIdx)}
        className={`inline-block min-w-28 px-3 py-1 mx-1.5 text-center text-xs font-semibold rounded-xl border-2 border-dashed transition-all cursor-pointer select-none ${
          isDragHover || selectedChip
            ? 'border-sky-400 bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-300 animate-pulse'
            : isDark
            ? 'border-slate-600 bg-slate-800/60 text-slate-400 hover:border-slate-500'
            : 'border-slate-300 bg-slate-50 text-slate-400 hover:border-slate-400'
        }`}
      >
        __________
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
              <span className="text-xs text-slate-400 font-medium">Actividad 7 de 7</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              Drag the correct answer/s into place.
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Completa la carta de Ellen a sus padres arrastrando o haciendo clic en las palabras del banco inferior.
            </p>
          </div>

          <button
            type="button"
            onClick={handleSpeakLetter}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
              isPlayingAudio
                ? 'bg-rose-500 text-white animate-pulse'
                : 'bg-sky-500 hover:bg-sky-600 text-white shadow-xs'
            }`}
          >
            <Volume2 className="w-4 h-4" />
            <span>{isPlayingAudio ? 'Detener lectura' : 'Escuchar carta'}</span>
          </button>
        </div>
      </div>

      {/* Main 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Vocabulary Sidebar */}
        <div className="lg:col-span-5 space-y-4">
          <VocabularySidebar speed={speed} accent={accent} limit={5} />
        </div>

        {/* Right Column: Letter View */}
        <div className="lg:col-span-7 space-y-4">
          <div
            className={`p-6 sm:p-8 rounded-3xl border shadow-sm space-y-6 ${
              isDark ? 'bg-slate-900/90 border-slate-700' : 'bg-white border-slate-200'
            }`}
          >
            {/* Letter Header Stamp */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400">
                <Mail className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">
                  Letter from Ellen to Mom & Dad
                </span>
              </div>
              <span className="text-xs text-slate-400 font-mono">7 espacios</span>
            </div>

            {/* Letter Body */}
            <div className="space-y-4 text-base sm:text-lg leading-loose text-slate-800 dark:text-slate-100 font-serif">
              <p className="font-bold">Dear Mom and Dad,</p>

              <p>
                I have a new {renderDropZone(0)} in a big office. I don't like the job very much. I
                have to wear a {renderDropZone(1)} for work. I sit at a {renderDropZone(2)} all day
                and I write {renderDropZone(3)} for my boss. My boss is very busy. She goes to lots
                of {renderDropZone(4)}. The job is boring, but the {renderDropZone(5)} is right near
                a big department store so I go shopping on my lunch {renderDropZone(6)}.
              </p>

              <div className="pt-2">
                <p>Lots of love,</p>
                <p className="font-bold text-sky-700 dark:text-sky-300">Ellen</p>
              </div>
            </div>

            {/* Chips Bank */}
            <div className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-sky-500" />
                  Banco de Palabras (7 opciones)
                </span>
                <span className="text-xs font-mono text-slate-400">
                  {availableChips.length} disponibles
                </span>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {allChips.map((chip) => {
                  const isUsed = usedChips.includes(chip);
                  const isSelected = selectedChip === chip;

                  return (
                    <div
                      key={chip}
                      draggable={!isUsed}
                      onDragStart={(e) => {
                        e.dataTransfer.setData('text/plain', chip);
                      }}
                      onClick={() => !isUsed && handleSelectChip(chip)}
                      className={`px-4 py-2.5 rounded-2xl border font-semibold text-sm transition-all select-none cursor-pointer ${
                        isUsed
                          ? 'opacity-30 cursor-not-allowed border-dashed bg-slate-100 dark:bg-slate-800 text-slate-400 line-through'
                          : isSelected
                          ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/70 text-sky-700 dark:text-sky-300 ring-2 ring-sky-300 shadow-md scale-105'
                          : isDark
                          ? 'bg-slate-800 border-slate-700 text-slate-200 hover:border-slate-500 hover:bg-slate-750 shadow-xs'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-sky-400 hover:bg-sky-50/40 shadow-xs'
                      }`}
                    >
                      {chip}
                    </div>
                  );
                })}
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
                  disabled={!isAllFilled}
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
                    <span>Ir al Test</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Reversible Card for Letter Translation */}
          <ReversibleTextCard
            englishText={fullLetterEnglish}
            spanishText={fullLetterSpanish}
            grammarTip="Observe el uso del plural en 'write reports' (escribir informes en general) y 'go to meetings' (ir a reuniones), así como las colocaciones 'wear a suit' y 'lunch break' (pausa del almuerzo)."
            speechRate={speed}
            accent={accent}
            size="md"
            frontLabel="Carta de Ellen en Inglés"
            backLabel="Traducción al Español y Notas Lingüísticas"
          />
        </div>
      </div>
    </div>
  );
};
