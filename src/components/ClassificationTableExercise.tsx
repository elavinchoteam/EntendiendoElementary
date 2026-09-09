import React, { useState } from 'react';
import { CheckCircle2, XCircle, RotateCcw, Volume2, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ClassificationTableExercise as ClassificationExerciseType, ReadingStory } from '../types';
import { speakEnglish, stopSpeaking, playFeedbackSound } from '../utils/audio';
import { useTheme } from '../context/ThemeContext';
import { SpeedSelectorButton } from './SpeedSelectorButton';

interface ClassificationTableExerciseProps {
  exercise: ClassificationExerciseType;
  accent?: 'US' | 'UK';
  speechRate?: number;
  onSuccess?: () => void;
}

export const ClassificationTableExercise: React.FC<ClassificationTableExerciseProps> = ({
  exercise,
  accent = 'US',
  speechRate = 1.0,
  onSuccess,
}) => {
  const { isDark } = useTheme();
  const safeAccent = accent === 'UK' ? 'UK' : 'US';
  const [currentRate, setCurrentRate] = useState(speechRate);
  const [isPlayingStory, setIsPlayingStory] = useState(false);
  const [isStoryFlipped, setIsStoryFlipped] = useState(false);

  // Placed items: itemId -> columnId
  const [assignments, setAssignments] = useState<Record<string, string>>({});
  const [hasChecked, setHasChecked] = useState(false);
  const [draggedItemId, setDraggedItemId] = useState<string | null>(null);
  const [flippedItemIds, setFlippedItemIds] = useState<string[]>([]);
  const [selectedPoolItemId, setSelectedPoolItemId] = useState<string | null>(null);

  const story: ReadingStory | undefined = exercise.story;

  const handleSpeedChange = (newRate: number) => {
    setCurrentRate(newRate);
    if (isPlayingStory && story) {
      stopSpeaking();
      const fullText = story.audioText || story.paragraphsEn.join(' ');
      speakEnglish(
        fullText,
        newRate,
        safeAccent,
        () => setIsPlayingStory(true),
        () => setIsPlayingStory(false),
        'female'
      );
    }
  };

  const handleToggleStoryAudio = () => {
    if (!story) return;
    if (isPlayingStory) {
      stopSpeaking();
      setIsPlayingStory(false);
      return;
    }
    const fullText = story.audioText || story.paragraphsEn.join(' ');
    setIsPlayingStory(true);
    speakEnglish(
      fullText,
      currentRate,
      safeAccent,
      () => setIsPlayingStory(true),
      () => setIsPlayingStory(false),
      'female'
    );
  };

  const handleSpeakText = (text: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    stopSpeaking();
    setIsPlayingStory(false);
    speakEnglish(text, currentRate, safeAccent);
  };

  const handleToggleItemFlip = (itemId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    playFeedbackSound('flip');
    setFlippedItemIds((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
    );
  };

  // Drag & drop handlers
  const handleDragStart = (e: React.DragEvent, itemId: string) => {
    if (hasChecked) return;
    e.dataTransfer.setData('text/plain', itemId);
    setDraggedItemId(itemId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    if (hasChecked) return;
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, colId: string) => {
    if (hasChecked) return;
    e.preventDefault();
    const itemId = e.dataTransfer.getData('text/plain') || draggedItemId;
    if (!itemId) return;

    // Check column capacity (max 4 per column)
    const currentInCol = Object.values(assignments).filter((c) => c === colId).length;
    if (assignments[itemId] !== colId && currentInCol >= 4) {
      playFeedbackSound('wrong');
      return;
    }

    playFeedbackSound('click');
    setAssignments((prev) => ({
      ...prev,
      [itemId]: colId,
    }));
    setDraggedItemId(null);
    setSelectedPoolItemId(null);
  };

  const handleAssignToCol = (colId: string) => {
    if (hasChecked || !selectedPoolItemId) return;
    const currentInCol = Object.values(assignments).filter((c) => c === colId).length;
    if (currentInCol >= 4) {
      playFeedbackSound('wrong');
      return;
    }
    playFeedbackSound('click');
    setAssignments((prev) => ({
      ...prev,
      [selectedPoolItemId]: colId,
    }));
    setSelectedPoolItemId(null);
  };

  const handleRemoveFromCol = (itemId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasChecked) return;
    playFeedbackSound('click');
    setAssignments((prev) => {
      const next = { ...prev };
      delete next[itemId];
      return next;
    });
  };

  const handleReset = () => {
    playFeedbackSound('click');
    setAssignments({});
    setHasChecked(false);
    setSelectedPoolItemId(null);
  };

  // Check answers
  const totalItems = exercise.items.length;
  const placedCount = Object.keys(assignments).length;
  const isComplete = placedCount === totalItems;

  const correctCount = hasChecked
    ? exercise.items.filter((item) => assignments[item.id] === item.columnId).length
    : 0;
  const isAllCorrect = hasChecked && correctCount === totalItems;

  const handleCheck = () => {
    playFeedbackSound('click');
    setHasChecked(true);

    const correct = exercise.items.filter((item) => assignments[item.id] === item.columnId).length;
    if (correct === totalItems) {
      playFeedbackSound('correct');
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
      onSuccess?.();
    } else {
      playFeedbackSound('wrong');
    }
  };

  const unassignedItems = exercise.items.filter((item) => !assignments[item.id]);

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Top Instruction Banner */}
      <div
        className={`w-full rounded-2xl p-4 sm:p-5 border transition-colors flex items-center justify-between gap-4 shadow-xs ${
          isDark ? 'bg-[#151C33] border-white/10 text-white' : 'bg-white border-slate-200 text-slate-800'
        }`}
      >
        <div className="flex flex-col gap-0.5">
          <p className="text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-white leading-snug">
            {exercise.instructions}
          </p>
          {exercise.instructionsEs && (
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 italic">
              {exercise.instructionsEs}
            </p>
          )}
        </div>
        <button
          type="button"
          onClick={() => handleSpeakText(exercise.instructions)}
          className={`p-2.5 rounded-xl border transition-all cursor-pointer shrink-0 ${
            isDark
              ? 'bg-slate-800 hover:bg-slate-700 text-sky-400 border-white/10'
              : 'bg-white hover:bg-stone-100 text-sky-600 border-slate-200'
          }`}
          title="Escuchar instrucción"
          aria-label="Escuchar instrucción"
        >
          <Volume2 className="w-4 h-4" />
        </button>
      </div>

      {/* 2-Column Grid: Left (Story Card) & Right (Classification Table) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Reversible Story Card */}
        {story && (
          <div className="lg:col-span-6 flex flex-col gap-3">
            <div className="perspective-1000 w-full min-h-[520px]">
              <div
                id={`story-card-${exercise.id}`}
                onClick={() => {
                  playFeedbackSound('flip');
                  setIsStoryFlipped((prev) => !prev);
                }}
                className={`relative w-full h-full min-h-[520px] rounded-2xl cursor-pointer select-none transition-transform duration-500 transform-style-3d border shadow-xs ${
                  isStoryFlipped ? 'rotate-y-180' : ''
                } ${
                  isStoryFlipped
                    ? isDark
                      ? 'bg-slate-900 border-emerald-500/40 text-emerald-100'
                      : 'bg-white border-emerald-300 text-emerald-950'
                    : isDark
                    ? 'bg-[#151C33] border-white/10 text-slate-100'
                    : 'bg-[#FCFBF8] border-stone-200/90 text-stone-900 shadow-stone-200/50'
                }`}
              >
                {/* Front Face: English Story */}
                <div className="absolute inset-0 p-5 sm:p-7 flex flex-col justify-between backface-hidden overflow-y-auto">
                  <div>
                    <div className="flex items-center justify-between pb-3 mb-4 border-b border-inherit/30">
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#009bd6] dark:text-sky-400 font-sans">
                          {story.title}
                        </h3>
                        {story.author && (
                          <p className="text-xs text-stone-500 dark:text-slate-400 italic">
                            {story.author}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <SpeedSelectorButton
                          currentRate={currentRate}
                          onRateChange={handleSpeedChange}
                          size="sm"
                        />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleStoryAudio();
                          }}
                          className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shadow-xs transition-all cursor-pointer ${
                            isPlayingStory
                              ? 'bg-sky-500 text-white ring-4 ring-sky-500/25 scale-105'
                              : isDark
                              ? 'bg-slate-800 hover:bg-slate-700 text-sky-400 border border-slate-600'
                              : 'bg-white hover:bg-stone-100 text-sky-600 border border-stone-300'
                          }`}
                          title={isPlayingStory ? 'Detener lectura' : 'Escuchar historia'}
                          aria-label="Audio"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-4 text-left font-serif leading-relaxed text-sm sm:text-base pr-1">
                      {story.paragraphsEn.map((para, idx) => (
                        <p
                          key={idx}
                          onClick={(e) => handleSpeakText(para, e)}
                          className="leading-relaxed hover:text-sky-600 dark:hover:text-sky-300 transition-colors cursor-pointer"
                          title="Haz clic para escuchar este párrafo"
                        >
                          {para}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Back Face: Spanish Translation */}
                <div className="absolute inset-0 p-5 sm:p-7 flex flex-col justify-between backface-hidden rotate-y-180 overflow-y-auto">
                  <div>
                    <div className="flex items-center justify-between pb-3 mb-4 border-b border-inherit/30">
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-emerald-600 dark:text-emerald-400 font-sans">
                          {story.titleEs}
                        </h3>
                        {story.authorEs && (
                          <p className="text-xs text-emerald-700/80 dark:text-emerald-300/80 italic">
                            {story.authorEs}
                          </p>
                        )}
                      </div>
                      <SpeedSelectorButton
                        currentRate={currentRate}
                        onRateChange={handleSpeedChange}
                        size="sm"
                      />
                    </div>

                    <div className="space-y-4 text-left font-serif italic leading-relaxed text-sm sm:text-base text-emerald-950 dark:text-emerald-100 pr-1">
                      {story.paragraphsEs.map((para, idx) => (
                        <p key={idx} className="leading-relaxed">
                          {para}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Right Column: Classification Table & Item Pool */}
        <div className={`${story ? 'lg:col-span-6' : 'lg:col-span-12'} flex flex-col gap-6`}>
          {/* Table with Two Columns: David Meals vs Maxi The Rock Singer */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {exercise.columns.map((col) => {
              const assignedToCol = exercise.items.filter(
                (item) => assignments[item.id] === col.id
              );

              return (
                <div
                  key={col.id}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, col.id)}
                  onClick={() => handleAssignToCol(col.id)}
                  className={`rounded-2xl border p-4 sm:p-5 flex flex-col justify-between min-h-[360px] transition-all ${
                    isDark
                      ? 'bg-[#151C33] border-white/10'
                      : 'bg-white border-slate-200 shadow-xs'
                  } ${selectedPoolItemId ? 'ring-2 ring-indigo-500/40 cursor-pointer' : ''}`}
                >
                  <div>
                    {/* Column Header */}
                    <div className="pb-3 mb-4 border-b border-inherit/20 text-center">
                      <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                        {col.header}
                      </h4>
                      {col.headerEs && (
                        <p className="text-xs text-slate-500 dark:text-slate-400 italic">
                          {col.headerEs}
                        </p>
                      )}
                    </div>

                    {/* Slots for up to 4 items */}
                    <div className="flex flex-col gap-2.5 min-h-[220px]">
                      {assignedToCol.map((item) => {
                        const isFlipped = flippedItemIds.includes(item.id);
                        const isCorrect = item.columnId === col.id;

                        return (
                          <div
                            key={item.id}
                            onClick={(e) => handleToggleItemFlip(item.id, e)}
                            className={`group relative rounded-xl border p-3 text-xs sm:text-sm font-medium transition-all select-none cursor-pointer ${
                              hasChecked
                                ? isCorrect
                                  ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-700 dark:text-emerald-300'
                                  : 'bg-rose-500/10 border-rose-500/50 text-rose-700 dark:text-rose-300'
                                : isDark
                                ? 'bg-slate-800/90 border-slate-700 text-slate-200'
                                : 'bg-slate-50 border-slate-200 text-slate-800'
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2">
                              <span className="flex-1 leading-snug">
                                {isFlipped ? item.textEs || item.text : item.text}
                              </span>

                              <div className="flex items-center gap-1 shrink-0">
                                <button
                                  type="button"
                                  onClick={(e) => handleSpeakText(item.text, e)}
                                  className="p-1 rounded-md text-slate-400 hover:text-sky-500 transition-colors"
                                  title="Pronunciar"
                                >
                                  <Volume2 className="w-3.5 h-3.5" />
                                </button>
                                {!hasChecked && (
                                  <button
                                    type="button"
                                    onClick={(e) => handleRemoveFromCol(item.id, e)}
                                    className="p-1 rounded-md text-slate-400 hover:text-rose-500 transition-colors"
                                    title="Quitar de la columna"
                                  >
                                    ✕
                                  </button>
                                )}
                                {hasChecked && (
                                  <span>
                                    {isCorrect ? (
                                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                    ) : (
                                      <XCircle className="w-4 h-4 text-rose-500" />
                                    )}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}

                      {/* Empty slot indicators (up to 4) */}
                      {Array.from({ length: 4 - assignedToCol.length }).map((_, idx) => (
                        <div
                          key={`empty-${idx}`}
                          className={`rounded-xl border border-dashed p-3 min-h-[44px] flex items-center justify-center text-xs transition-colors ${
                            isDark
                              ? 'border-slate-700/60 text-slate-600'
                              : 'border-slate-200 text-slate-400'
                          }`}
                        >
                          <span className="opacity-60">+</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 4 dots indicator below column matching image */}
                  <div className="pt-3 mt-3 border-t border-inherit/20 flex items-center justify-center gap-1.5">
                    {[0, 1, 2, 3].map((dotIdx) => (
                      <span
                        key={dotIdx}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          dotIdx < assignedToCol.length
                            ? 'bg-sky-500'
                            : isDark
                            ? 'bg-slate-700'
                            : 'bg-slate-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Item Pool */}
          <div
            className={`rounded-2xl border p-4 sm:p-5 transition-colors ${
              isDark ? 'bg-[#151C33] border-white/10' : 'bg-white border-slate-200 shadow-xs'
            }`}
          >
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-inherit/20">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Opciones disponibles ({unassignedItems.length})
              </span>
              <span className="text-xs text-slate-400">
                Arrastra o haz clic para colocar
              </span>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {unassignedItems.length === 0 ? (
                <p className="text-xs sm:text-sm text-slate-400 italic py-2">
                  Todos los elementos han sido asignados a las columnas.
                </p>
              ) : (
                unassignedItems.map((item) => {
                  const isSelected = selectedPoolItemId === item.id;
                  const isFlipped = flippedItemIds.includes(item.id);

                  return (
                    <div
                      key={item.id}
                      draggable={!hasChecked}
                      onDragStart={(e) => handleDragStart(e, item.id)}
                      onClick={() => {
                        if (hasChecked) return;
                        setSelectedPoolItemId(isSelected ? null : item.id);
                      }}
                      className={`group inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs sm:text-sm font-medium transition-all select-none cursor-pointer shadow-2xs ${
                        isSelected
                          ? 'bg-indigo-600 text-white border-indigo-500 ring-2 ring-indigo-500/40'
                          : isDark
                          ? 'bg-slate-800 hover:bg-slate-700/80 text-slate-200 border-slate-700'
                          : 'bg-stone-50 hover:bg-stone-100 text-stone-800 border-stone-200'
                      }`}
                    >
                      <span
                        onClick={(e) => handleToggleItemFlip(item.id, e)}
                        className="cursor-pointer"
                        title="Clic para alternar traducción"
                      >
                        {isFlipped ? item.textEs || item.text : item.text}
                      </span>

                      <button
                        type="button"
                        onClick={(e) => handleSpeakText(item.text, e)}
                        className="p-1 rounded text-slate-400 hover:text-sky-500 transition-colors"
                        title="Pronunciar"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Action Buttons: Check / Reset */}
          <div className="flex items-center justify-between gap-4 pt-2">
            <button
              type="button"
              onClick={handleReset}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                isDark
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200 shadow-xs'
              }`}
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reiniciar</span>
            </button>

            <button
              type="button"
              onClick={handleCheck}
              disabled={!isComplete}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md cursor-pointer ${
                !isComplete
                  ? 'bg-slate-400/50 text-white/70 cursor-not-allowed'
                  : isAllCorrect
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                  : 'bg-sky-600 hover:bg-sky-500 text-white'
              }`}
            >
              <Check className="w-4 h-4" />
              <span>Comprobar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
