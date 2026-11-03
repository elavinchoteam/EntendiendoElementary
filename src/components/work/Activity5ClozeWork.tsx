import React, { useState } from 'react';
import { CheckCircle, XCircle, RotateCcw, Volume2, ArrowRight, Sparkles } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { speakEnglish, playFeedbackSound, stopSpeaking } from '../../utils/audio';
import { VocabularySidebar } from './VocabularySidebar';
import { ReversibleTextCard } from './ReversibleTextCard';

interface Activity5ClozeWorkProps {
  speed?: number;
  accent?: 'US' | 'UK';
  onNext?: () => void;
}

export const Activity5ClozeWork: React.FC<Activity5ClozeWorkProps> = ({
  speed = 1.0,
  accent = 'US',
  onNext,
}) => {
  const { isDark } = useTheme();

  // 5 blanks:
  // 0: My friend, Kevin, has a [summer job] in a frozen food factory.
  // 1: The factory doesn't pay [high salaries] .
  // 2: You have to work hard and you can't take long [breaks] .
  // 3: Kevin wants to [start] a business.
  // 4: "In my [factory] the workers will get long breaks and high salaries," he says.
  const correctAnswers = ['summer job', 'high salaries', 'breaks', 'start', 'factory'];
  const allChips = ['summer job', 'start', 'breaks', 'factory', 'high salaries'];

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

  const fullText =
    "My friend, Kevin, has a summer job in a frozen food factory. The factory doesn't pay high salaries. You have to work hard and you can't take long breaks. Kevin wants to start a business. 'In my factory the workers will get long breaks and high salaries,' he says.";

  const fullTextSpanish =
    "Mi amigo, Kevin, tiene un trabajo de verano en una fábrica de alimentos congelados. La fábrica no paga salarios altos. Tienes que trabajar duro y no puedes tomar descansos largos. Kevin quiere comenzar un negocio. 'En mi fábrica los trabajadores tendrán descansos largos y salarios altos', dice.";

  const handleSpeakAll = () => {
    if (isPlayingAudio) {
      stopSpeaking();
      setIsPlayingAudio(false);
      return;
    }
    stopSpeaking();
    setIsPlayingAudio(true);
    speakEnglish(
      fullText,
      speed,
      accent,
      undefined,
      () => setIsPlayingAudio(false),
      'female'
    );
  };

  const isAllFilled = Object.keys(filledBlanks).length === correctAnswers.length;
  const isAllCorrect = isSubmitted && isAllFilled && Object.values(results).every(Boolean);

  const renderDropZone = (blankIdx: number, placeholderText = '__________') => {
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
        className={`inline-block min-w-32 px-3 py-1 mx-1.5 text-center text-xs font-semibold rounded-xl border-2 border-dashed transition-all cursor-pointer select-none ${
          isDragHover || selectedChip
            ? 'border-sky-400 bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-300 animate-pulse'
            : isDark
            ? 'border-slate-600 bg-slate-800/60 text-slate-400 hover:border-slate-500'
            : 'border-slate-300 bg-slate-50 text-slate-400 hover:border-slate-400'
        }`}
      >
        {placeholderText}
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
              <span className="text-xs text-slate-400 font-medium">Actividad 5 de 7</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              Drag the correct answer/s into place.
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Arrastra o haz clic en las palabras del banco inferior para completar la historia sobre el trabajo de Kevin en la fábrica.
            </p>
          </div>

          <button
            type="button"
            onClick={handleSpeakAll}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
              isPlayingAudio
                ? 'bg-rose-500 text-white animate-pulse'
                : 'bg-sky-500 hover:bg-sky-600 text-white shadow-xs'
            }`}
          >
            <Volume2 className="w-4 h-4" />
            <span>{isPlayingAudio ? 'Detener lectura' : 'Escuchar texto'}</span>
          </button>
        </div>
      </div>

      {/* Main 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Vocabulary Sidebar */}
        <div className="lg:col-span-5 space-y-4">
          <VocabularySidebar speed={speed} accent={accent} limit={5} />
        </div>

        {/* Right Column: Paragraph and Chips */}
        <div className="lg:col-span-7 space-y-4">
          <div
            className={`p-6 sm:p-8 rounded-3xl border shadow-sm space-y-6 ${
              isDark ? 'bg-slate-900/90 border-slate-700' : 'bg-white border-slate-200'
            }`}
          >
            {/* Paragraph Text */}
            <div className="leading-loose text-base sm:text-lg text-slate-800 dark:text-slate-100 font-sans space-y-4">
              <p>
                My friend, Kevin, has a {renderDropZone(0)} in a frozen food factory. The factory
                doesn't pay {renderDropZone(1)}. You have to work hard and you can't take
                long {renderDropZone(2)}.
              </p>
              <p>
                Kevin wants to {renderDropZone(3)} a business. "In my {renderDropZone(4)} the
                workers will get long breaks and high salaries," he says.
              </p>
            </div>

            {/* Chips Bank */}
            <div className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-sky-500" />
                  Banco de Palabras
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
                    <span>Siguiente</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Reversible Card for Paragraph Translation */}
          <ReversibleTextCard
            englishText={fullText}
            spanishText={fullTextSpanish}
            grammarTip="Nota: 'have to' expresa obligación en el trabajo ('you have to work hard'), 'can't take long breaks' expresa imposibilidad o prohibición, y 'start a business' es una colocación fija."
            speechRate={speed}
            accent={accent}
            size="md"
            frontLabel="Texto en Inglés (Kevin's Summer Job)"
            backLabel="Traducción al Español y Claves Gramaticales"
          />
        </div>
      </div>
    </div>
  );
};
