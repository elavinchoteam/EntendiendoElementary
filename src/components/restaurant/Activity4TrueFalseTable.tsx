import React, { useState } from 'react';
import {
  Volume2,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ChevronRight,
} from 'lucide-react';
import {
  ACTIVITY_4_ITEMS,
  TrueFalseItem,
  RestaurantActivityData,
} from '../../data/inTheRestaurantData';
import { RestaurantVideoPlayer } from '../RestaurantVideoPlayer';
import { useTheme } from '../../context/ThemeContext';
import { speakEnglish, stopSpeaking, playFeedbackSound } from '../../utils/audio';

export interface Activity4TrueFalseTableProps {
  activity: RestaurantActivityData;
  accent?: 'US' | 'UK';
  speechRate?: number;
  onNext?: () => void;
}

export const Activity4TrueFalseTable: React.FC<Activity4TrueFalseTableProps> = ({
  activity,
  accent = 'US',
  speechRate = 1.0,
  onNext,
}) => {
  const { isDark } = useTheme();

  // Placements: key = itemId, value = 'true' | 'false' | null
  const [placements, setPlacements] = useState<Record<string, 'true' | 'false' | null>>({});
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isInstructionFlipped, setIsInstructionFlipped] = useState(false);
  const [flippedItemIds, setFlippedItemIds] = useState<string[]>([]);
  const [playingKey, setPlayingKey] = useState<string | null>(null);

  const handlePlayText = (text: string, key: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (playingKey === key && window.speechSynthesis?.speaking) {
      stopSpeaking();
      setPlayingKey(null);
      return;
    }
    stopSpeaking();
    setPlayingKey(key);
    speakEnglish(
      text,
      speechRate,
      accent === 'UK' ? 'UK' : 'US',
      () => setPlayingKey(key),
      () => setPlayingKey(null)
    );
  };

  const toggleItemFlip = (itemId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    playFeedbackSound('flip');
    setFlippedItemIds((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
    );
  };

  const handleSelectPoolItem = (itemId: string) => {
    if (isSubmitted) return;
    playFeedbackSound('click');
    setSelectedItemId(selectedItemId === itemId ? null : itemId);
  };

  const handlePlaceIntoCategory = (cat: 'true' | 'false') => {
    if (isSubmitted || !selectedItemId) return;
    playFeedbackSound('click');
    setPlacements((prev) => ({
      ...prev,
      [selectedItemId]: cat,
    }));
    setSelectedItemId(null);
  };

  const handleRemoveFromCategory = (itemId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSubmitted) return;
    playFeedbackSound('click');
    setPlacements((prev) => ({
      ...prev,
      [itemId]: null,
    }));
  };

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent, itemId: string) => {
    if (isSubmitted) return;
    e.dataTransfer.setData('text/plain', itemId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, cat: 'true' | 'false') => {
    e.preventDefault();
    if (isSubmitted) return;
    const itemId = e.dataTransfer.getData('text/plain');
    if (itemId) {
      playFeedbackSound('click');
      setPlacements((prev) => ({
        ...prev,
        [itemId]: cat,
      }));
    }
  };

  // Check all items
  const unplacedCount = ACTIVITY_4_ITEMS.filter((item) => !placements[item.id]).length;
  const allCorrect = ACTIVITY_4_ITEMS.every(
    (item) => placements[item.id] === item.correctCategory
  );

  const handleCheck = () => {
    setIsSubmitted(true);
    if (allCorrect) {
      playFeedbackSound('correct');
    } else {
      playFeedbackSound('wrong');
    }
  };

  const handleReset = () => {
    setPlacements({});
    setSelectedItemId(null);
    setIsSubmitted(false);
    setFlippedItemIds([]);
  };

  const trueItems = ACTIVITY_4_ITEMS.filter((item) => placements[item.id] === 'true');
  const falseItems = ACTIVITY_4_ITEMS.filter((item) => placements[item.id] === 'false');
  const poolItems = ACTIVITY_4_ITEMS.filter((item) => !placements[item.id]);

  return (
    <div className="w-full flex flex-col gap-5">
      {/* Top Reversible Instruction Card */}
      <div className="w-full perspective-1000">
        <div
          onClick={() => {
            playFeedbackSound('flip');
            setIsInstructionFlipped(!isInstructionFlipped);
          }}
          className={`relative w-full min-h-[58px] rounded-2xl cursor-pointer select-none transition-transform duration-500 transform-style-3d border shadow-xs ${
            isInstructionFlipped ? 'rotate-y-180' : ''
          } ${
            isDark
              ? 'bg-slate-900 border-slate-700 text-white'
              : 'bg-white border-slate-200 text-slate-900'
          }`}
        >
          <div className="absolute inset-0 px-5 py-3 flex items-center justify-between backface-hidden">
            <span className="font-semibold text-sm sm:text-base">{activity.instructions}</span>
            <button
              type="button"
              onClick={(e) => handlePlayText(activity.instructions, 'instruction', e)}
              className={`p-1.5 rounded-lg border transition-all shrink-0 ${
                isDark
                  ? 'bg-slate-800 hover:bg-slate-700 text-sky-300 border-slate-700'
                  : 'bg-sky-50 hover:bg-sky-100 text-sky-600 border-sky-200'
              }`}
              aria-label="Audio"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>
          <div className="absolute inset-0 px-5 py-3 flex items-center justify-between backface-hidden rotate-y-180">
            <span className="font-semibold text-sm sm:text-base italic text-slate-700 dark:text-slate-200">
              {activity.instructionsEs}
            </span>
          </div>
        </div>
      </div>

      {/* Grid: Left Column Video + Right Column Table */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (5 Cols) */}
        <div className="lg:col-span-5 w-full">
          <RestaurantVideoPlayer
            highlightedTurnIds={activity.highlightedTurnIds || []}
            showTranscriptByDefault={true}
            accent={accent}
            speechRate={speechRate}
          />
        </div>

        {/* Right Column (7 Cols): The Table & Word Bank */}
        <div className="lg:col-span-7 w-full flex flex-col gap-4">
          {/* Table with Two Columns: True / False */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Column 1: True */}
            <div
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, 'true')}
              onClick={() => handlePlaceIntoCategory('true')}
              className={`min-h-[220px] rounded-2xl border-2 p-3.5 flex flex-col gap-2 transition-all ${
                selectedItemId
                  ? 'border-dashed border-sky-400 cursor-pointer bg-sky-50/20'
                  : isDark
                  ? 'border-slate-700 bg-slate-900/60'
                  : 'border-slate-200 bg-white shadow-xs'
              }`}
            >
              <div className="pb-2 border-b border-inherit/40 font-bold text-sm sm:text-base text-emerald-600 dark:text-emerald-400 flex items-center justify-between">
                <span>True</span>
                <span className="text-xs font-normal text-slate-500">
                  {trueItems.length} oraciones
                </span>
              </div>

              <div className="flex-1 flex flex-col gap-2">
                {trueItems.length === 0 && (
                  <div className="h-full min-h-[80px] flex items-center justify-center text-xs text-slate-400 italic">
                    Arrastra o haz clic aquí
                  </div>
                )}
                {trueItems.map((item) => (
                  <ReversibleTableItem
                    key={item.id}
                    item={item}
                    isFlipped={flippedItemIds.includes(item.id)}
                    isSubmitted={isSubmitted}
                    isCorrect={item.correctCategory === 'true'}
                    onFlip={(e) => toggleItemFlip(item.id, e)}
                    onPlay={(e) => handlePlayText(item.text, item.id, e)}
                    onRemove={(e) => handleRemoveFromCategory(item.id, e)}
                    isDark={isDark}
                  />
                ))}
              </div>
            </div>

            {/* Column 2: False */}
            <div
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, 'false')}
              onClick={() => handlePlaceIntoCategory('false')}
              className={`min-h-[220px] rounded-2xl border-2 p-3.5 flex flex-col gap-2 transition-all ${
                selectedItemId
                  ? 'border-dashed border-sky-400 cursor-pointer bg-sky-50/20'
                  : isDark
                  ? 'border-slate-700 bg-slate-900/60'
                  : 'border-slate-200 bg-white shadow-xs'
              }`}
            >
              <div className="pb-2 border-b border-inherit/40 font-bold text-sm sm:text-base text-rose-600 dark:text-rose-400 flex items-center justify-between">
                <span>False</span>
                <span className="text-xs font-normal text-slate-500">
                  {falseItems.length} oraciones
                </span>
              </div>

              <div className="flex-1 flex flex-col gap-2">
                {falseItems.length === 0 && (
                  <div className="h-full min-h-[80px] flex items-center justify-center text-xs text-slate-400 italic">
                    Arrastra o haz clic aquí
                  </div>
                )}
                {falseItems.map((item) => (
                  <ReversibleTableItem
                    key={item.id}
                    item={item}
                    isFlipped={flippedItemIds.includes(item.id)}
                    isSubmitted={isSubmitted}
                    isCorrect={item.correctCategory === 'false'}
                    onFlip={(e) => toggleItemFlip(item.id, e)}
                    onPlay={(e) => handlePlayText(item.text, item.id, e)}
                    onRemove={(e) => handleRemoveFromCategory(item.id, e)}
                    isDark={isDark}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Available Sentences Pool */}
          {poolItems.length > 0 && !isSubmitted && (
            <div
              className={`p-3 sm:p-4 rounded-2xl border flex flex-col gap-2.5 ${
                isDark ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Oraciones disponibles ({poolItems.length})
              </div>

              <div className="flex flex-col gap-2">
                {poolItems.map((item) => {
                  const isSelected = selectedItemId === item.id;
                  const isFlipped = flippedItemIds.includes(item.id);

                  return (
                    <div
                      key={item.id}
                      draggable={!isSubmitted}
                      onDragStart={(e) => handleDragStart(e, item.id)}
                      onClick={() => handleSelectPoolItem(item.id)}
                      className={`perspective-1000 cursor-pointer ${
                        isSelected ? 'ring-2 ring-sky-400 rounded-xl' : ''
                      }`}
                    >
                      <div
                        onClick={(e) => toggleItemFlip(item.id, e)}
                        className={`relative w-full min-h-[48px] rounded-xl cursor-pointer select-none transition-transform duration-500 transform-style-3d border shadow-xs ${
                          isFlipped ? 'rotate-y-180' : ''
                        } ${
                          isSelected
                            ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/40'
                            : isDark
                            ? 'bg-slate-800 border-slate-700 text-slate-100'
                            : 'bg-white border-slate-200 text-slate-800'
                        }`}
                      >
                        {/* Front: English */}
                        <div className="absolute inset-0 px-3 py-2 flex items-center justify-between backface-hidden">
                          <span className="text-xs sm:text-sm font-medium pr-2">
                            {item.text}
                          </span>
                          <button
                            type="button"
                            onClick={(e) => handlePlayText(item.text, item.id, e)}
                            className={`p-1.5 rounded-lg border shrink-0 ${
                              isDark
                                ? 'bg-slate-700 text-sky-300 border-slate-600'
                                : 'bg-sky-50 text-sky-600 border-sky-200'
                            }`}
                            aria-label="Audio"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Back: Spanish */}
                        <div className="absolute inset-0 px-3 py-2 flex items-center justify-between backface-hidden rotate-y-180">
                          <span className="text-xs sm:text-sm font-medium italic text-slate-700 dark:text-slate-200">
                            {item.textEs}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-between gap-3 mt-1">
            {isSubmitted ? (
              <button
                type="button"
                onClick={handleReset}
                className={`px-4 py-2 rounded-xl border text-xs sm:text-sm font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                  isDark
                    ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
                }`}
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reintentar</span>
              </button>
            ) : (
              <div />
            )}

            {!isSubmitted ? (
              <button
                type="button"
                disabled={unplacedCount > 0}
                onClick={handleCheck}
                className={`px-6 py-2.5 rounded-xl font-bold text-sm shadow-md transition-all cursor-pointer ${
                  unplacedCount === 0
                    ? 'bg-sky-600 hover:bg-sky-700 text-white active:scale-95'
                    : 'bg-slate-300 dark:bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                Comprobar
              </button>
            ) : (
              <button
                type="button"
                onClick={onNext}
                className="px-6 py-2.5 rounded-xl font-bold text-sm bg-indigo-600 hover:bg-indigo-700 text-white shadow-md transition-all cursor-pointer active:scale-95 flex items-center gap-2"
              >
                <span>Siguiente</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Explanation Box after Submit */}
          {isSubmitted && (
            <div
              className={`p-4 rounded-2xl border animate-in fade-in duration-200 flex flex-col gap-2 ${
                allCorrect
                  ? isDark
                    ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                    : 'bg-emerald-50 border-emerald-200 text-emerald-950'
                  : isDark
                  ? 'bg-rose-950/40 border-rose-500/40 text-rose-200'
                  : 'bg-rose-50 border-rose-200 text-rose-950'
              }`}
            >
              <div className="flex items-center gap-2 font-bold text-sm">
                {allCorrect ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                ) : (
                  <XCircle className="w-4 h-4 text-rose-500" />
                )}
                <span>{allCorrect ? '¡Todo correcto!' : 'Algunas respuestas son incorrectas'}</span>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed">{activity.explanationEn}</p>
              <p className="text-xs sm:text-sm leading-relaxed italic text-slate-600 dark:text-slate-300">
                {activity.explanationEs}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Reversible Table Item helper component
interface ReversibleTableItemProps {
  item: TrueFalseItem;
  isFlipped: boolean;
  isSubmitted: boolean;
  isCorrect: boolean;
  onFlip: (e: React.MouseEvent) => void;
  onPlay: (e: React.MouseEvent) => void;
  onRemove: (e: React.MouseEvent) => void;
  isDark: boolean;
}

const ReversibleTableItem: React.FC<ReversibleTableItemProps> = ({
  item,
  isFlipped,
  isSubmitted,
  isCorrect,
  onFlip,
  onPlay,
  onRemove,
  isDark,
}) => {
  let borderClass = isDark ? 'border-slate-700' : 'border-slate-200';
  let bgClass = isDark ? 'bg-slate-800' : 'bg-slate-50';

  if (isSubmitted) {
    if (isCorrect) {
      borderClass = 'border-emerald-500 ring-1 ring-emerald-400';
      bgClass = isDark ? 'bg-emerald-950/40' : 'bg-emerald-50';
    } else {
      borderClass = 'border-rose-500 ring-1 ring-rose-400';
      bgClass = isDark ? 'bg-rose-950/40' : 'bg-rose-50';
    }
  }

  return (
    <div className="w-full perspective-1000">
      <div
        onClick={onFlip}
        className={`relative w-full min-h-[52px] rounded-xl cursor-pointer select-none transition-transform duration-500 transform-style-3d border shadow-xs ${
          isFlipped ? 'rotate-y-180' : ''
        } ${borderClass} ${bgClass}`}
      >
        {/* Front: English */}
        <div className="absolute inset-0 px-3 py-2 flex items-center justify-between backface-hidden">
          <span className="text-xs font-medium pr-1 text-slate-900 dark:text-slate-100">
            {item.text}
          </span>
          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              onClick={onPlay}
              className={`p-1 rounded-md border ${
                isDark
                  ? 'bg-slate-700 text-sky-300 border-slate-600'
                  : 'bg-white text-sky-600 border-slate-200'
              }`}
              aria-label="Audio"
            >
              <Volume2 className="w-3 h-3" />
            </button>
            {!isSubmitted && (
              <button
                type="button"
                onClick={onRemove}
                className="p-1 rounded-md text-slate-400 hover:text-rose-500"
                title="Quitar de la columna"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Back: Spanish */}
        <div className="absolute inset-0 px-3 py-2 flex items-center justify-between backface-hidden rotate-y-180">
          <span className="text-xs font-medium italic text-slate-700 dark:text-slate-200">
            {item.textEs}
          </span>
        </div>
      </div>
    </div>
  );
};
