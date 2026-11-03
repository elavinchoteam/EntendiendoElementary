import React, { useState } from 'react';
import { Volume2, VolumeX, Check, Bookmark, BookmarkCheck } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { speakEnglish, stopSpeaking } from '../../utils/audio';
import { WORK_VOCABULARY, WorkVocabItem } from '../../data/workData';

interface VocabularySidebarProps {
  speed?: number;
  accent?: 'US' | 'UK';
  startIndex?: number;
  limit?: number;
  onSelectWord?: (item: WorkVocabItem) => void;
}

export const VocabularySidebar: React.FC<VocabularySidebarProps> = ({
  speed = 1.0,
  accent = 'US',
  startIndex = 0,
  limit = 5,
  onSelectWord,
}) => {
  const { isDark } = useTheme();
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [bookmarkedIds, setBookmarkedIds] = useState<Record<string, boolean>>({});
  const [isMuted, setIsMuted] = useState(false);

  const displayedList = limit
    ? WORK_VOCABULARY.slice(startIndex, startIndex + limit)
    : WORK_VOCABULARY.slice(startIndex);

  const handlePlayWord = (item: WorkVocabItem, e: React.MouseEvent) => {
    e.stopPropagation();
    if (isMuted) return;
    stopSpeaking();
    setPlayingId(item.id);
    speakEnglish(
      item.word,
      speed,
      accent,
      undefined,
      () => setPlayingId(null),
      'female'
    );
  };

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div
      className={`p-4 rounded-2xl border shadow-sm ${
        isDark ? 'bg-slate-900/90 border-slate-700/80' : 'bg-slate-50 border-slate-200'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200/80 dark:border-slate-800">
        <h3 className="text-2xl font-bold tracking-tight text-[#1e617d] dark:text-sky-300 font-serif">
          Work
        </h3>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setIsMuted(false)}
            className={`p-1.5 rounded-lg transition-colors ${
              !isMuted
                ? 'bg-emerald-600 text-white shadow-xs'
                : isDark
                ? 'bg-slate-800 text-slate-400 hover:text-white'
                : 'bg-white text-slate-500 hover:text-slate-800'
            }`}
            title="Sonido activado"
          >
            <Volume2 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => {
              stopSpeaking();
              setIsMuted(true);
            }}
            className={`p-1.5 rounded-lg transition-colors ${
              isMuted
                ? 'bg-rose-500 text-white shadow-xs'
                : isDark
                ? 'bg-slate-800 text-slate-400 hover:text-white'
                : 'bg-white text-slate-500 hover:text-slate-800'
            }`}
            title="Silenciar"
          >
            <VolumeX className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Vocabulary Cards List */}
      <div className="space-y-2.5">
        {displayedList.map((item) => {
          const isPlaying = playingId === item.id;
          const isBookmarked = bookmarkedIds[item.id];

          return (
            <div
              key={item.id}
              onClick={() => onSelectWord && onSelectWord(item)}
              className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                isPlaying
                  ? 'border-sky-500 ring-2 ring-sky-300 dark:ring-sky-700 bg-sky-50/50 dark:bg-sky-950/40'
                  : isDark
                  ? 'bg-slate-800/80 border-slate-700 hover:border-slate-600'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-xs'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={item.imageUrl}
                  alt={item.word}
                  className="w-12 h-12 rounded-lg object-cover border border-slate-200 dark:border-slate-700 shrink-0"
                />
                <div className="truncate">
                  <span className="font-semibold text-sm capitalize text-slate-800 dark:text-slate-100 block truncate">
                    {item.word}
                  </span>
                  <span className="text-[11px] text-slate-400 dark:text-slate-500 capitalize">
                    {item.partOfSpeech}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={(e) => handlePlayWord(item, e)}
                  className={`p-1.5 rounded-lg transition-colors ${
                    isPlaying
                      ? 'bg-sky-500 text-white animate-pulse'
                      : isDark
                      ? 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                  title="Escuchar pronunciación"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={(e) => toggleBookmark(item.id, e)}
                  className={`p-1.5 rounded-lg transition-colors ${
                    isBookmarked
                      ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400'
                      : isDark
                      ? 'bg-slate-700 text-slate-400 hover:text-slate-200'
                      : 'bg-slate-100 text-slate-400 hover:text-slate-600'
                  }`}
                  title={isBookmarked ? 'Marcado para repasar' : 'Marcar para repasar'}
                >
                  {isBookmarked ? (
                    <BookmarkCheck className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  ) : (
                    <Bookmark className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
