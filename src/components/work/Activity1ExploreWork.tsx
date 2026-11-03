import React, { useState } from 'react';
import {
  Volume2,
  Mic,
  Bookmark,
  BookmarkCheck,
  ChevronLeft,
  ChevronRight,
  X,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { speakEnglish, stopSpeaking } from '../../utils/audio';
import { WORK_VOCABULARY, WorkVocabItem } from '../../data/workData';
import { ReversibleTextCard } from './ReversibleTextCard';

interface Activity1ExploreWorkProps {
  speed?: number;
  accent?: 'US' | 'UK';
}

export const Activity1ExploreWork: React.FC<Activity1ExploreWorkProps> = ({
  speed = 1.0,
  accent = 'US',
}) => {
  const { isDark } = useTheme();

  const [selectedWordIdx, setSelectedWordIdx] = useState<number | null>(null);
  const [bookmarkedWords, setBookmarkedWords] = useState<Record<string, boolean>>({});
  const [activeAudioPlaying, setActiveAudioPlaying] = useState<string | null>(null);

  const totalWords = WORK_VOCABULARY.length;
  const currentItem = selectedWordIdx !== null ? WORK_VOCABULARY[selectedWordIdx] : null;

  const handleOpenWord = (idx: number) => {
    setSelectedWordIdx(idx);
    handleSpeak(WORK_VOCABULARY[idx].word, 'word');
  };

  const handleCloseModal = () => {
    stopSpeaking();
    setSelectedWordIdx(null);
  };

  const handleNextModal = () => {
    if (selectedWordIdx !== null && selectedWordIdx < totalWords - 1) {
      const nextIdx = selectedWordIdx + 1;
      setSelectedWordIdx(nextIdx);
      handleSpeak(WORK_VOCABULARY[nextIdx].word, 'word');
    }
  };

  const handlePrevModal = () => {
    if (selectedWordIdx !== null && selectedWordIdx > 0) {
      const prevIdx = selectedWordIdx - 1;
      setSelectedWordIdx(prevIdx);
      handleSpeak(WORK_VOCABULARY[prevIdx].word, 'word');
    }
  };

  const handleSpeak = (text: string, key: string) => {
    stopSpeaking();
    setActiveAudioPlaying(key);
    speakEnglish(
      text,
      speed,
      accent,
      undefined,
      () => setActiveAudioPlaying(null),
      'female'
    );
  };

  const toggleBookmark = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setBookmarkedWords((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div
        className={`p-6 rounded-3xl border shadow-sm ${
          isDark
            ? 'bg-slate-800/80 border-slate-700 text-slate-100'
            : 'bg-white border-slate-200 text-slate-800'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide bg-sky-100 text-sky-700 dark:bg-sky-950/70 dark:text-sky-300">
              Unidad 9 · Sección 7
            </span>
            <span className="text-xs text-slate-400">Actividad 1 de 7</span>
          </div>
          <span className="text-xs font-bold text-sky-600 dark:text-sky-400">10 Palabras Clave</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-2 font-serif">
          Work · Vocabulario Clave
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
          Read the list of words and phrases. Read the example sentences. Listen to the recordings and practice saying the words and phrases. Mark any words you would like to review later.
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 italic">
          (Lee la lista de palabras y frases. Escucha las grabaciones y practica. Haz clic en cualquier tarjeta para ver su definición completa y ejemplos con audio).
        </p>
      </div>

      {/* Grid of 10 Vocabulary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {WORK_VOCABULARY.map((item, idx) => {
          const isBookmarked = bookmarkedWords[item.id];
          const isPlaying = activeAudioPlaying === item.id;

          return (
            <div
              key={item.id}
              onClick={() => handleOpenWord(idx)}
              className={`group relative p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center justify-between gap-4 ${
                isDark
                  ? 'bg-slate-800/70 border-slate-700 hover:border-sky-500/80 hover:bg-slate-800 hover:shadow-lg'
                  : 'bg-white border-slate-200 hover:border-sky-400 hover:shadow-md'
              }`}
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-slate-200 dark:border-slate-700 shadow-xs">
                  <img
                    src={item.imageUrl}
                    alt={item.word}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="truncate">
                  <h4 className="font-bold text-base capitalize text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors truncate">
                    {item.word}
                  </h4>
                  <span className="text-xs text-slate-400 dark:text-slate-400 capitalize">
                    {item.partOfSpeech}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSpeak(item.word, item.id);
                  }}
                  className={`p-2 rounded-xl transition-colors ${
                    isPlaying
                      ? 'bg-sky-500 text-white animate-pulse'
                      : isDark
                      ? 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                  title="Escuchar pronunciación"
                >
                  <Volume2 className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={(e) => toggleBookmark(item.id, e)}
                  className={`p-2 rounded-xl transition-colors ${
                    isBookmarked
                      ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400'
                      : isDark
                      ? 'bg-slate-700 text-slate-400 hover:text-slate-200'
                      : 'bg-slate-100 text-slate-400 hover:text-slate-600'
                  }`}
                  title={isBookmarked ? 'Marcado para repasar' : 'Marcar para repasar'}
                >
                  {isBookmarked ? (
                    <BookmarkCheck className="w-4 h-4 text-amber-500 fill-amber-500" />
                  ) : (
                    <Bookmark className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary Reversible Card with all 10 words and Spanish translations */}
      <ReversibleTextCard
        englishText={WORK_VOCABULARY.map(
          (v) => `• ${v.word.toUpperCase()} (${v.partOfSpeech}): "${v.exampleSentence}"`
        ).join('\n')}
        spanishText={WORK_VOCABULARY.map(
          (v) => `• ${v.word.toUpperCase()}: ${v.definitionEs}.\n  Ejemplo: "${v.exampleTranslation}"`
        ).join('\n\n')}
        speechRate={speed}
        accent={accent}
        size="lg"
        frontLabel="Vocabulario de Trabajo (10 Palabras en Inglés)"
        backLabel="Definiciones y Traducciones Completas en Español"
      />

      {/* Modal Popup Viewer */}
      {selectedWordIdx !== null && currentItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div
            className={`relative w-full max-w-2xl rounded-3xl border shadow-2xl overflow-hidden p-6 sm:p-8 ${
              isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            {/* Top Bar inside modal */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100 dark:border-slate-800">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4" />
                Ficha de Vocabulario
              </span>

              <button
                type="button"
                onClick={handleCloseModal}
                className={`p-2 rounded-xl transition-colors ${
                  isDark ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-100 text-slate-500'
                }`}
                title="Cerrar ventana"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-start">
              {/* Photo on left */}
              <div className="sm:col-span-5">
                <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-md aspect-4/3">
                  <img
                    src={currentItem.imageUrl}
                    alt={currentItem.word}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Info on right */}
              <div className="sm:col-span-7 space-y-4">
                <div>
                  <div className="flex items-baseline gap-2 mb-1">
                    <h3 className="text-2xl sm:text-3xl font-extrabold capitalize text-slate-900 dark:text-white font-serif">
                      {currentItem.word}
                    </h3>
                    <span className="text-xs text-slate-500 italic">({currentItem.partOfSpeech})</span>
                  </div>

                  <div className="flex items-center gap-2 mt-2">
                    <button
                      type="button"
                      onClick={() => handleSpeak(currentItem.word, 'modal-word')}
                      className="px-3 py-1.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
                    >
                      <Volume2 className="w-4 h-4" />
                      <span>Pronunciar</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleSpeak(currentItem.word, 'modal-slow')}
                      className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
                    >
                      Lento
                    </button>
                  </div>
                </div>

                {/* Definition */}
                <div className="p-3.5 rounded-2xl bg-sky-50/70 dark:bg-sky-950/40 border border-sky-100 dark:border-sky-900/50 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-sky-700 dark:text-sky-300 block">
                    Definición:
                  </span>
                  <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                    {currentItem.definition}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 italic">
                    {currentItem.definitionEs}
                  </p>
                </div>

                {/* Example sentence */}
                <div className="p-3.5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/50 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300 block">
                      Ejemplo de uso:
                    </span>
                    <button
                      type="button"
                      onClick={() => handleSpeak(currentItem.exampleSentence, 'modal-example')}
                      className="text-emerald-700 dark:text-emerald-400 hover:text-emerald-900 transition-colors"
                      title="Escuchar ejemplo"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                    "{currentItem.exampleSentence}"
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 italic">
                    "{currentItem.exampleTranslation}"
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Actions inside modal */}
            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <button
                type="button"
                onClick={() => toggleBookmark(currentItem.id)}
                className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                  bookmarkedWords[currentItem.id]
                    ? 'border-amber-400 bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {bookmarkedWords[currentItem.id] ? (
                  <>
                    <BookmarkCheck className="w-4 h-4 text-amber-500 fill-amber-500" />
                    <span>Guardado para repasar</span>
                  </>
                ) : (
                  <>
                    <Bookmark className="w-4 h-4 text-slate-400" />
                    <span>Marcar para repasar</span>
                  </>
                )}
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrevModal}
                  disabled={selectedWordIdx === 0}
                  className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  title="Palabra anterior"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <span className="text-xs font-mono font-bold text-slate-400">
                  {selectedWordIdx + 1} / {totalWords}
                </span>

                <button
                  type="button"
                  onClick={handleNextModal}
                  disabled={selectedWordIdx === totalWords - 1}
                  className="p-2 rounded-xl bg-sky-500 hover:bg-sky-600 text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
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
