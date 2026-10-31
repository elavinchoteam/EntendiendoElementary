import React, { useState } from 'react';
import { Volume2, VolumeX, Check, Bookmark, BookmarkCheck } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { speakEnglish, stopSpeaking } from '../../utils/audio';
import { RELATIONSHIPS_VOCABULARY, RelationshipVocabItem } from '../../data/relationshipsData';

interface VocabularySidebarProps {
  speed?: number;
  accent?: 'US' | 'UK';
  limit?: number; // if only first 5 are shown or all 10
  onSelectWord?: (item: RelationshipVocabItem) => void;
}

export const VocabularySidebar: React.FC<VocabularySidebarProps> = ({
  speed = 1.0,
  accent = 'US',
  limit = 5,
  onSelectWord,
}) => {
  const { isDark } = useTheme();
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [bookmarkedIds, setBookmarkedIds] = useState<Record<string, boolean>>({});
  const [isMuted, setIsMuted] = useState(false);

  const displayedList = limit ? RELATIONSHIPS_VOCABULARY.slice(0, limit) : RELATIONSHIPS_VOCABULARY;

  const handlePlayWord = (item: RelationshipVocabItem, e: React.MouseEvent) => {
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
        <h3 className="text-xl font-bold tracking-tight text-sky-800 dark:text-sky-300 font-serif">
          Relationships
        </h3>

        <div className="flex items-center gap-1">
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
            <Volume2 className="w-3.5 h-3.5" />
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
            <VolumeX className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Vocabulary Cards List */}
      <div className="space-y-2.5">
        {displayedList.map((item) => {
          const isPlaying = playingId === item.id;
          const isBookmarked = Boolean(bookmarkedIds[item.id]);

          return (
            <div
              key={item.id}
              onClick={(e) => {
                if (onSelectWord) onSelectWord(item);
                handlePlayWord(item, e);
              }}
              className={`p-2.5 rounded-xl border flex items-center justify-between gap-3 cursor-pointer select-none transition-all ${
                isPlaying
                  ? isDark
                    ? 'bg-sky-950/60 border-sky-500 shadow-sm'
                    : 'bg-sky-50 border-sky-400 shadow-sm'
                  : isDark
                  ? 'bg-slate-800/80 border-slate-700/60 hover:bg-slate-800 hover:border-slate-600'
                  : 'bg-white border-slate-200 hover:bg-slate-50 hover:border-slate-300 hover:shadow-xs'
              }`}
            >
              {/* Left: Thumbnail & Word Title */}
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-12 h-10 rounded-lg overflow-hidden shrink-0 bg-slate-200 dark:bg-slate-700 border border-slate-200 dark:border-slate-600">
                  <img
                    src={item.imageUrl}
                    alt={item.word}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <span className="font-semibold text-sm text-slate-800 dark:text-slate-100 truncate block">
                    {item.word}
                  </span>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 capitalize">
                    {item.partOfSpeech}
                  </span>
                </div>
              </div>

              {/* Right: Actions */}
              <div className="flex flex-col items-center justify-between self-stretch shrink-0 gap-1">
                <div className="text-emerald-500 dark:text-emerald-400" title="Aprendido">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <button
                  type="button"
                  onClick={(e) => toggleBookmark(item.id, e)}
                  className="text-slate-400 hover:text-amber-500 transition-colors"
                  title="Marcar para repasar"
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
