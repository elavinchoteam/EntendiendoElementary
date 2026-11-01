import React, { useState } from 'react';
import {
  Check,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Volume2,
  RefreshCw,
  Sparkles,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { speakEnglish, stopSpeaking, playFeedbackSound } from '../../utils/audio';
import { ACTIVITY_7_DATA, MatchWordImageItem } from '../../data/lostReportData';

interface Activity7MatchWordsImagesProps {
  speed?: number;
  accent?: 'US' | 'UK';
}

export const Activity7MatchWordsImages: React.FC<Activity7MatchWordsImagesProps> = ({
  speed = 1.0,
  accent = 'US',
}) => {
  const { isDark } = useTheme();

  // Reversible header instruction
  const [isHeaderFlipped, setIsHeaderFlipped] = useState(false);
  const instructionEn = 'Match the words to the images.';
  const instructionEs = 'Une las palabras con las imágenes correspondientes.';

  // Placements: imageId -> matchedWord
  const [placements, setPlacements] = useState<Record<string, string>>({});

  // Flipped state for words: wordText -> boolean
  const [flippedWords, setFlippedWords] = useState<Record<string, boolean>>({});

  // Drag state
  const [draggedWord, setDraggedWord] = useState<string | null>(null);

  // Check state
  const [hasChecked, setHasChecked] = useState(false);
  const [isAllCorrect, setIsAllCorrect] = useState(false);

  // Placed words list
  const placedWords = Object.values(placements);

  // Unplaced words pool
  const allWordPool = ['an office', 'a chair', 'a report', 'a desk'];
  const availableWords = allWordPool.filter((w) => !placedWords.includes(w));

  const handleToggleWordFlip = (word: string, e: React.MouseEvent) => {
    e.stopPropagation();
    playFeedbackSound('click');
    setFlippedWords((prev) => ({
      ...prev,
      [word]: !prev[word],
    }));
  };

  const handlePlayAudio = (word: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    stopSpeaking();
    playFeedbackSound('click');
    speakEnglish(word, speed, accent);
  };

  const handleDragStart = (e: React.DragEvent, word: string) => {
    setDraggedWord(word);
    e.dataTransfer.setData('text/plain', word);
  };

  const handleDropOnImage = (imageId: string) => {
    if (!draggedWord) return;
    playFeedbackSound('click');
    setPlacements((prev) => ({
      ...prev,
      [imageId]: draggedWord,
    }));
    setDraggedWord(null);
    setHasChecked(false);
  };

  const handleQuickPlace = (imageId: string, word: string) => {
    playFeedbackSound('click');
    setPlacements((prev) => ({
      ...prev,
      [imageId]: word,
    }));
    setHasChecked(false);
  };

  const handleRemoveFromImage = (imageId: string) => {
    playFeedbackSound('click');
    setPlacements((prev) => {
      const copy = { ...prev };
      delete copy[imageId];
      return copy;
    });
    setHasChecked(false);
  };

  const handleCheck = () => {
    playFeedbackSound('click');
    setHasChecked(true);

    const allPlaced = ACTIVITY_7_DATA.every((item) => placements[item.id] !== undefined);
    const allCorrect =
      allPlaced &&
      ACTIVITY_7_DATA.every((item) => placements[item.id] === item.word);

    setIsAllCorrect(allCorrect);
    if (allCorrect) {
      playFeedbackSound('correct');
    } else {
      playFeedbackSound('wrong');
    }
  };

  const handleReset = () => {
    playFeedbackSound('click');
    setPlacements({});
    setHasChecked(false);
    setIsAllCorrect(false);
  };

  const getWordTranslation = (word: string) => {
    switch (word) {
      case 'an office':
        return 'una oficina';
      case 'a chair':
        return 'una silla';
      case 'a report':
        return 'un informe';
      case 'a desk':
        return 'un escritorio';
      default:
        return word;
    }
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
                Actividad 7 · Match words to images
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
              onClick={() => {
                playFeedbackSound('click');
                setIsHeaderFlipped((prev) => !prev);
              }}
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
              onClick={(e) => handlePlayAudio(instructionEn, e)}
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

      {/* Main matching layout matching screenshot: 4 cards in a row + words on the right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left: 4 Image Cards in a row / grid */}
        <div className="lg:col-span-9 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {ACTIVITY_7_DATA.map((item, index) => {
            const placed = placements[item.id];
            const isCorrect = placed === item.word;
            const isWordFlipped = placed ? !!flippedWords[placed] : false;

            return (
              <div
                key={item.id}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDropOnImage(item.id)}
                className={`p-2.5 sm:p-3 rounded-2xl border-2 transition-all flex flex-col items-center ${
                  hasChecked
                    ? isCorrect
                      ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20'
                      : 'border-rose-400 bg-rose-50/50 dark:bg-rose-950/20'
                    : isDark
                    ? 'border-dashed border-slate-700 bg-slate-900/60'
                    : 'border-dashed border-slate-300 bg-white shadow-xs'
                }`}
              >
                {/* Photo container */}
                <div className="w-full aspect-square rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 mb-2.5 relative border border-slate-200 dark:border-slate-700">
                  <img
                    src={item.imageUrl}
                    alt={item.imageAlt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <span className="absolute top-1.5 left-1.5 w-5 h-5 rounded-md bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold flex items-center justify-center">
                    {index + 1}
                  </span>
                </div>

                {/* Drop Slot */}
                <div className="w-full min-h-[50px] flex items-center justify-center">
                  {placed ? (
                    <div
                      className={`w-full p-2 rounded-xl border text-center transition-all ${
                        hasChecked
                          ? isCorrect
                            ? 'bg-emerald-500 text-white border-emerald-600 shadow-xs'
                            : 'bg-rose-500 text-white border-rose-600 shadow-xs'
                          : isDark
                          ? 'bg-slate-800 border-sky-500 text-sky-200'
                          : 'bg-sky-50 border-sky-400 text-sky-900 shadow-xs'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <button
                          type="button"
                          onClick={(e) => handleToggleWordFlip(placed, e)}
                          className="w-5 h-5 rounded flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity cursor-pointer"
                          title="Traducir"
                        >
                          <RefreshCw className={`w-3 h-3 ${isWordFlipped ? 'rotate-180' : ''}`} />
                        </button>

                        <button
                          type="button"
                          onClick={(e) => handlePlayAudio(placed, e)}
                          className="w-5 h-5 rounded flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity cursor-pointer"
                          title="Escuchar"
                        >
                          <Volume2 className="w-3 h-3" />
                        </button>
                      </div>

                      <p className="text-xs sm:text-sm font-bold truncate">
                        {!isWordFlipped ? placed : getWordTranslation(placed)}
                      </p>

                      {!hasChecked && (
                        <button
                          type="button"
                          onClick={() => handleRemoveFromImage(item.id)}
                          className="mt-1 text-[10px] underline opacity-75 hover:opacity-100 cursor-pointer block mx-auto"
                        >
                          Quitar
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="w-full h-10 border border-dashed rounded-xl border-slate-300 dark:border-slate-700 flex items-center justify-center text-[11px] text-slate-400 font-medium">
                      Arrastra aquí
                    </div>
                  )}
                </div>

                {/* Correct answer indicator */}
                {hasChecked && !isCorrect && (
                  <p className="mt-1.5 text-[10px] font-semibold text-rose-600 dark:text-rose-400 text-center">
                    Era: "{item.word}" ({item.wordEs})
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Right: Word Pills Pool matching screenshot */}
        <div className="lg:col-span-3 space-y-3">
          <div
            className={`p-4 rounded-2xl border ${
              isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}
          >
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-200 dark:border-slate-800">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                Palabras ({availableWords.length})
              </span>
              <span className="text-[11px] text-slate-400">Arrastra</span>
            </div>

            <div className="space-y-2">
              {availableWords.map((word) => {
                const isFlipped = !!flippedWords[word];

                return (
                  <div
                    key={word}
                    draggable
                    onDragStart={(e) => handleDragStart(e, word)}
                    className={`p-2.5 rounded-xl border select-none cursor-grab active:cursor-grabbing transition-all flex items-center justify-between gap-2 shadow-xs ${
                      isDark
                        ? 'bg-slate-800 border-slate-700 hover:border-sky-500 text-slate-100'
                        : 'bg-slate-50 border-slate-200 hover:border-sky-400 text-slate-800'
                    }`}
                  >
                    <div className="flex-1 min-w-0">
                      {!isFlipped ? (
                        <span className="text-xs sm:text-sm font-semibold">{word}</span>
                      ) : (
                        <span className="text-xs sm:text-sm font-medium italic text-emerald-700 dark:text-emerald-300 font-serif">
                          {getWordTranslation(word)}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={(e) => handleToggleWordFlip(word, e)}
                        className="w-6 h-6 rounded-md border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer"
                        title="Traducir"
                      >
                        <RefreshCw className={`w-3 h-3 ${isFlipped ? 'rotate-180' : ''}`} />
                      </button>

                      <button
                        type="button"
                        onClick={(e) => handlePlayAudio(word, e)}
                        className="w-6 h-6 rounded-md border border-slate-200 dark:border-slate-700 flex items-center justify-center text-sky-600 hover:text-sky-700 cursor-pointer"
                        title="Escuchar audio"
                      >
                        <Volume2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                );
              })}

              {availableWords.length === 0 && (
                <div className="p-4 text-center text-xs text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-950/30 rounded-xl border border-emerald-200 dark:border-emerald-800">
                  <CheckCircle2 className="w-5 h-5 mx-auto mb-1" />
                  ¡Todas las palabras fueron colocadas!
                </div>
              )}
            </div>

            {/* Quick assignment dropdown for touch users */}
            {availableWords.length > 0 && (
              <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-800">
                <span className="text-[11px] font-semibold text-slate-400 block mb-1.5">
                  Asignar rápido con clic:
                </span>
                <div className="space-y-1.5">
                  {ACTIVITY_7_DATA.filter((item) => !placements[item.id]).map((item) => (
                    <div key={item.id} className="flex items-center justify-between gap-1 text-[11px]">
                      <span className="text-slate-600 dark:text-slate-300 truncate font-medium">
                        Foto {item.id.replace('m', '')}:
                      </span>
                      <select
                        onChange={(e) => {
                          if (e.target.value) handleQuickPlace(item.id, e.target.value);
                        }}
                        defaultValue=""
                        className="px-2 py-1 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-200"
                      >
                        <option value="" disabled>
                          Elegir palabra...
                        </option>
                        {availableWords.map((w) => (
                          <option key={w} value={w}>
                            {w}
                          </option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action buttons */}
            <div className="mt-5 pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
              <button
                type="button"
                onClick={handleReset}
                className={`px-3 py-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  isDark
                    ? 'border-slate-700 bg-slate-800 text-slate-300 hover:text-white'
                    : 'border-slate-200 bg-slate-100 text-slate-700 hover:text-slate-900'
                }`}
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reiniciar</span>
              </button>

              <button
                type="button"
                disabled={availableWords.length > 0}
                onClick={handleCheck}
                className={`px-4 py-2 rounded-xl font-semibold text-xs flex items-center gap-1.5 shadow-md transition-all cursor-pointer ${
                  availableWords.length === 0
                    ? 'bg-sky-600 hover:bg-sky-500 text-white'
                    : 'bg-slate-300 dark:bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                <Check className="w-4 h-4" />
                <span>Comprobar</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
