import React, { useState, useEffect } from 'react';
import {
  Volume2,
  Bookmark,
  Check,
  X,
  Mic,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import {
  ADJECTIVES_VOCABULARY,
  AdjectiveWordItem,
} from '../../data/adjectives2Data';
import { speakEnglish, stopSpeaking, playFeedbackSound } from '../../utils/audio';
import { useTheme } from '../../context/ThemeContext';
import { ReversibleTextCard } from './ReversibleTextCard';

interface Activity1ExploreProps {
  speed: number;
  accent?: 'US' | 'UK';
}

export const Activity1Explore: React.FC<Activity1ExploreProps> = ({
  speed,
  accent = 'US',
}) => {
  const { isDark } = useTheme();

  // Reviewed words map: { [id]: boolean }
  const [markedForReview, setMarkedForReview] = useState<Record<string, boolean>>({});
  // Selected modal index: null or 0..9
  const [selectedWordIndex, setSelectedWordIndex] = useState<number | null>(null);

  // Audio playing state
  const [playingId, setPlayingId] = useState<string | null>(null);
  // Recording simulation state
  const [isRecording, setIsRecording] = useState(false);
  const [recordedSuccess, setRecordedSuccess] = useState(false);

  const toggleReview = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    playFeedbackSound('click');
    setMarkedForReview((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSpeak = (text: string, id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (playingId === id) {
      stopSpeaking();
      setPlayingId(null);
      return;
    }
    playFeedbackSound('click');
    speakEnglish(
      text,
      speed,
      accent,
      () => setPlayingId(id),
      () => setPlayingId(null)
    );
  };

  const handleOpenModal = (index: number) => {
    playFeedbackSound('click');
    setSelectedWordIndex(index);
    setRecordedSuccess(false);
    setIsRecording(false);
  };

  const handleCloseModal = () => {
    stopSpeaking();
    setSelectedWordIndex(null);
    setIsRecording(false);
    setRecordedSuccess(false);
  };

  const handlePrevWord = () => {
    if (selectedWordIndex === null) return;
    playFeedbackSound('click');
    stopSpeaking();
    setSelectedWordIndex((prev) => (prev! > 0 ? prev! - 1 : ADJECTIVES_VOCABULARY.length - 1));
    setRecordedSuccess(false);
  };

  const handleNextWord = () => {
    if (selectedWordIndex === null) return;
    playFeedbackSound('click');
    stopSpeaking();
    setSelectedWordIndex((prev) => (prev! < ADJECTIVES_VOCABULARY.length - 1 ? prev! + 1 : 0));
    setRecordedSuccess(false);
  };

  // Keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedWordIndex === null) return;
      if (e.key === 'Escape') {
        handleCloseModal();
      } else if (e.key === 'ArrowLeft') {
        handlePrevWord();
      } else if (e.key === 'ArrowRight') {
        handleNextWord();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedWordIndex]);

  const activeWord: AdjectiveWordItem | null =
    selectedWordIndex !== null ? ADJECTIVES_VOCABULARY[selectedWordIndex] : null;

  return (
    <div className="w-full flex flex-col gap-6 animate-in fade-in duration-200">
      {/* 1. Instruction Card (Reversible, no duplicate text) */}
      <ReversibleTextCard
        textEn="Read the list of words and phrases. Read the example sentences. Listen to the recordings and practice saying the words and phrases. Mark any words you would like to review later."
        textEs="Lee la lista de palabras y frases. Lee las oraciones de ejemplo. Escucha las grabaciones y practica diciendo las palabras y frases. Marca las palabras que te gustaría repasar más tarde."
        speed={speed}
        accent={accent}
      />

      {/* 2. Grid of 10 Adjective Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
        {ADJECTIVES_VOCABULARY.map((item, idx) => {
          const isMarked = Boolean(markedForReview[item.id]);
          const isCurrentPlaying = playingId === `word-${item.id}`;

          return (
            <div
              key={item.id}
              onClick={() => handleOpenModal(idx)}
              className={`group relative rounded-2xl border p-3 sm:p-4 flex items-center justify-between gap-3 transition-all duration-200 cursor-pointer shadow-xs hover:shadow-md hover:-translate-y-0.5 select-none ${
                isDark
                  ? 'bg-slate-900 border-slate-800 hover:border-sky-500/50 hover:bg-slate-800/80'
                  : 'bg-white border-slate-200 hover:border-sky-400 hover:bg-sky-50/30'
              }`}
            >
              {/* Left: Thumbnail & Info */}
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800">
                  <img
                    src={item.thumbnailImg}
                    alt={item.word}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>

                <div className="flex flex-col min-w-0">
                  <span className="text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-white capitalize">
                    {item.word}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-serif italic truncate">
                    {item.translation}
                  </span>
                </div>
              </div>

              {/* Right: Actions */}
              <div className="flex items-center gap-1.5 shrink-0">
                {/* Audio Button */}
                <button
                  type="button"
                  onClick={(e) => handleSpeak(item.word, `word-${item.id}`, e)}
                  className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-all cursor-pointer ${
                    isCurrentPlaying
                      ? 'bg-sky-600 border-sky-600 text-white animate-pulse'
                      : isDark
                      ? 'bg-slate-800 border-slate-700 text-sky-400 hover:bg-slate-700'
                      : 'bg-sky-50 border-sky-200 text-sky-700 hover:bg-sky-100'
                  }`}
                  title={`Escuchar "${item.word}"`}
                  aria-label={`Escuchar "${item.word}"`}
                >
                  <Volume2 className="w-4 h-4" />
                </button>

                {/* Bookmark Button */}
                <button
                  type="button"
                  onClick={(e) => toggleReview(item.id, e)}
                  className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-all cursor-pointer ${
                    isMarked
                      ? 'bg-amber-500 border-amber-500 text-white shadow-xs'
                      : isDark
                      ? 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200 hover:bg-slate-700'
                      : 'bg-slate-100 border-slate-200 text-slate-500 hover:text-slate-700 hover:bg-slate-200'
                  }`}
                  title={isMarked ? 'Marcado para repasar' : 'Marcar para repasar'}
                  aria-label="Marcar para repasar"
                >
                  <Bookmark
                    className={`w-4 h-4 ${isMarked ? 'fill-current' : ''}`}
                  />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Detail Modal (When an adjective is clicked) */}
      {activeWord && selectedWordIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={handleCloseModal}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`relative w-full max-w-2xl rounded-2xl border shadow-2xl p-5 sm:p-7 flex flex-col gap-5 overflow-hidden animate-in zoom-in-95 duration-200 ${
              isDark
                ? 'bg-slate-900 border-slate-700 text-white'
                : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            {/* Modal Top Bar */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-black text-sky-600 dark:text-sky-400 capitalize">
                  {activeWord.word}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-md font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  {activeWord.partOfSpeech}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  aria-label="Cerrar ventana"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body: Left Image & Right Definitions */}
            <div className="flex flex-col sm:flex-row gap-5 items-stretch">
              {/* Left Image */}
              <div className="w-full sm:w-48 h-48 sm:h-auto rounded-xl overflow-hidden shrink-0 border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 shadow-inner flex items-center justify-center">
                <img
                  src={activeWord.largeImg || activeWord.thumbnailImg}
                  alt={activeWord.word}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Right Content */}
              <div className="flex-1 flex flex-col gap-4">
                {/* Definition row */}
                <div className="flex flex-col gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                      Definición
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        handleSpeak(
                          `${activeWord.word}. ${activeWord.definitionEn}`,
                          'modal-def'
                        )
                      }
                      className="w-7 h-7 rounded-md bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 flex items-center justify-center text-sky-600 dark:text-sky-400 hover:scale-105 transition-all cursor-pointer"
                      title="Escuchar definición"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-sm font-medium leading-relaxed">
                    {activeWord.definitionEn}
                  </p>
                  <p className="text-xs font-serif italic text-emerald-700 dark:text-emerald-400">
                    {activeWord.definitionEs}
                  </p>
                </div>

                {/* Example sentence row */}
                <div className="flex flex-col gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                      Oración de Ejemplo
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        handleSpeak(activeWord.exampleEn, 'modal-ex')
                      }
                      className="w-7 h-7 rounded-md bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 flex items-center justify-center text-sky-600 dark:text-sky-400 hover:scale-105 transition-all cursor-pointer"
                      title="Escuchar oración de ejemplo"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-sm font-medium leading-relaxed">
                    {activeWord.exampleEn}
                  </p>
                  <p className="text-xs font-serif italic text-emerald-700 dark:text-emerald-400">
                    {activeWord.exampleEs}
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Bottom Controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
              {/* Mark for review toggle */}
              <button
                type="button"
                onClick={() => toggleReview(activeWord.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                  markedForReview[activeWord.id]
                    ? 'bg-amber-500 border-amber-500 text-white'
                    : isDark
                    ? 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
                    : 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5 fill-current" />
                <span>
                  {markedForReview[activeWord.id]
                    ? 'Marcado para repasar'
                    : 'Mark for review'}
                </span>
              </button>

              {/* Pager: < 1/10 > */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrevWord}
                  className="w-8 h-8 rounded-lg border border-slate-300 dark:border-slate-700 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  title="Palabra anterior"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-xs font-mono font-bold px-2">
                  {selectedWordIndex + 1} / {ADJECTIVES_VOCABULARY.length}
                </span>
                <button
                  type="button"
                  onClick={handleNextWord}
                  className="w-8 h-8 rounded-lg border border-slate-300 dark:border-slate-700 bg-sky-600 hover:bg-sky-500 text-white flex items-center justify-center transition-colors cursor-pointer"
                  title="Siguiente palabra"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
