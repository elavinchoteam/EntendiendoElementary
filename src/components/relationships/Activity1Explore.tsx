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
import { RELATIONSHIPS_VOCABULARY, RelationshipVocabItem } from '../../data/relationshipsData';
import { ReversibleTextCard } from './ReversibleTextCard';

interface Activity1ExploreProps {
  speed?: number;
  accent?: 'US' | 'UK';
}

export const Activity1Explore: React.FC<Activity1ExploreProps> = ({
  speed = 1.0,
  accent = 'US',
}) => {
  const { isDark } = useTheme();

  const [selectedWordIdx, setSelectedWordIdx] = useState<number | null>(null);
  const [bookmarkedWords, setBookmarkedWords] = useState<Record<string, boolean>>({});
  const [activeAudioPlaying, setActiveAudioPlaying] = useState<string | null>(null);

  const totalWords = RELATIONSHIPS_VOCABULARY.length;
  const currentItem = selectedWordIdx !== null ? RELATIONSHIPS_VOCABULARY[selectedWordIdx] : null;

  const handleOpenWord = (idx: number) => {
    setSelectedWordIdx(idx);
    handleSpeak(RELATIONSHIPS_VOCABULARY[idx].word, 'word');
  };

  const handleCloseModal = () => {
    stopSpeaking();
    setSelectedWordIdx(null);
  };

  const handleNextModal = () => {
    if (selectedWordIdx !== null && selectedWordIdx < totalWords - 1) {
      const nextIdx = selectedWordIdx + 1;
      setSelectedWordIdx(nextIdx);
      handleSpeak(RELATIONSHIPS_VOCABULARY[nextIdx].word, 'word');
    }
  };

  const handlePrevModal = () => {
    if (selectedWordIdx !== null && selectedWordIdx > 0) {
      const prevIdx = selectedWordIdx - 1;
      setSelectedWordIdx(prevIdx);
      handleSpeak(RELATIONSHIPS_VOCABULARY[prevIdx].word, 'word');
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
              Unidad 8 · Sección 6
            </span>
            <span className="text-xs text-slate-400">Actividad 1 de 7</span>
          </div>
          <span className="text-xs font-bold text-sky-600 dark:text-sky-400">10 Palabras Clave</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-sky-800 dark:text-sky-300 mb-2">
          Relationships (Relaciones Familiares)
        </h2>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl">
          Read the list of words and phrases. Read the example sentences. Listen to the recordings and practice saying the words and phrases. Mark any words you would like to review later.
        </p>
        <p className="text-xs text-slate-400 italic mt-1">
          (Lee la lista de palabras y frases. Escucha las grabaciones y haz clic en cualquier tarjeta para ver su ficha interactiva con definición y ejemplos en español.)
        </p>
      </div>

      {/* Grid of 10 Vocabulary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {RELATIONSHIPS_VOCABULARY.map((item, idx) => {
          const isBookmarked = Boolean(bookmarkedWords[item.id]);

          return (
            <div
              key={item.id}
              onClick={() => handleOpenWord(idx)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer select-none flex items-center justify-between gap-4 group ${
                isDark
                  ? 'bg-slate-800/90 border-slate-700 hover:border-sky-500 hover:bg-slate-800'
                  : 'bg-white border-slate-200 hover:border-sky-400 hover:shadow-md'
              }`}
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-16 h-14 rounded-xl overflow-hidden shrink-0 border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800">
                  <img
                    src={item.imageUrl}
                    alt={item.word}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-sky-500 transition-colors truncate">
                    {item.word}
                  </h4>
                  <span className="text-xs text-slate-400 capitalize block">
                    {item.partOfSpeech}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSpeak(item.word, `card-${item.id}`);
                  }}
                  className={`p-2 rounded-xl border transition-colors ${
                    activeAudioPlaying === `card-${item.id}`
                      ? 'bg-sky-500 text-white'
                      : isDark
                      ? 'bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                  title="Pronunciar"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={(e) => toggleBookmark(item.id, e)}
                  className="p-2 rounded-xl text-slate-400 hover:text-amber-500 transition-colors"
                  title="Guardar para repasar"
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

      {/* MODAL: Full Flashcard View on Word Click */}
      {selectedWordIdx !== null && currentItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={handleCloseModal}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`w-full max-w-2xl rounded-3xl border shadow-2xl overflow-hidden p-6 sm:p-8 space-y-6 transition-all ${
              isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-800'
            }`}
          >
            {/* Top Modal Controls */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Ficha de Vocabulario
              </span>

              <button
                type="button"
                onClick={handleCloseModal}
                className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                title="Cerrar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Content 2-Column: Photo left, Details right */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
              {/* Photo */}
              <div className="sm:col-span-5 h-56 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-inner bg-slate-100 dark:bg-slate-800">
                <img
                  src={currentItem.imageUrl}
                  alt={currentItem.word}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Text Information */}
              <div className="sm:col-span-7 space-y-4">
                <div>
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-3xl font-serif font-bold text-sky-700 dark:text-sky-300">
                      {currentItem.word}
                    </h3>
                    <span className="text-xs text-slate-400 italic">
                      {currentItem.partOfSpeech}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mt-2">
                    <button
                      type="button"
                      onClick={() => handleSpeak(currentItem.word, 'modal-word')}
                      className={`p-2 rounded-xl flex items-center gap-1.5 text-xs font-semibold shadow-xs transition-colors ${
                        activeAudioPlaying === 'modal-word'
                          ? 'bg-sky-500 text-white animate-pulse'
                          : isDark
                          ? 'bg-slate-800 text-sky-400 hover:bg-slate-700 border border-slate-700'
                          : 'bg-sky-50 text-sky-700 hover:bg-sky-100 border border-sky-200'
                      }`}
                    >
                      <Volume2 className="w-4 h-4" />
                      <span>Pronunciar</span>
                    </button>
                    <button
                      type="button"
                      className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-400 hover:text-sky-500 transition-colors"
                      title="Grabar para practicar"
                    >
                      <Mic className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Definition */}
                <div className="py-2 border-t border-b border-slate-100 dark:border-slate-800">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                    Definición:
                  </span>
                  <p className="italic text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                    {currentItem.definition}
                  </p>
                </div>

                {/* Example sentence */}
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                    Ejemplo en contexto:
                  </span>
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-medium text-sm sm:text-base text-slate-900 dark:text-white leading-relaxed">
                      {currentItem.exampleSentence}
                    </p>
                    <button
                      type="button"
                      onClick={() => handleSpeak(currentItem.exampleSentence, 'modal-sentence')}
                      className="p-1.5 rounded-lg bg-sky-50 dark:bg-slate-800 text-sky-600 dark:text-sky-400 hover:bg-sky-100 dark:hover:bg-slate-700 shrink-0"
                      title="Escuchar oración"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* 3D Reversible Flip Card for Spanish Translation */}
            <div>
              <ReversibleTextCard
                englishText={`${currentItem.word}: ${currentItem.definition}\nEjemplo: ${currentItem.exampleSentence}`}
                spanishText={`${currentItem.word} (${currentItem.partOfSpeech}): ${currentItem.definitionEs}\nEjemplo: ${currentItem.exampleTranslation}`}
                speechRate={speed}
                accent={accent}
                speakerGender="female"
                size="sm"
              />
            </div>

            {/* Bottom Modal Navigation */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => toggleBookmark(currentItem.id)}
                className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                  bookmarkedWords[currentItem.id]
                    ? 'bg-amber-500 text-white border-amber-600 shadow-xs'
                    : isDark
                    ? 'border-slate-700 text-slate-300 hover:bg-slate-800'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {bookmarkedWords[currentItem.id] ? (
                  <BookmarkCheck className="w-4 h-4" />
                ) : (
                  <Bookmark className="w-4 h-4" />
                )}
                <span>Marcar para repasar</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={selectedWordIdx === 0}
                  onClick={handlePrevModal}
                  className={`p-2 rounded-xl border transition-colors ${
                    selectedWordIdx === 0
                      ? 'opacity-40 cursor-not-allowed border-transparent text-slate-400'
                      : isDark
                      ? 'border-slate-700 text-slate-200 hover:bg-slate-800'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                  title="Palabra anterior"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <span className="font-mono text-xs text-slate-400">
                  {selectedWordIdx + 1} / {totalWords}
                </span>

                <button
                  type="button"
                  disabled={selectedWordIdx === totalWords - 1}
                  onClick={handleNextModal}
                  className={`p-2 rounded-xl transition-colors ${
                    selectedWordIdx === totalWords - 1
                      ? 'opacity-40 cursor-not-allowed bg-slate-200 dark:bg-slate-800 text-slate-400'
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                  }`}
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
