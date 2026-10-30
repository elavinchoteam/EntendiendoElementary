import React, { useState } from 'react';
import { Check, RotateCcw, Volume2, RefreshCw } from 'lucide-react';
import {
  ACTIVIDAD_3_FAMILY_ITEMS,
  FamilyClassificationItem,
} from '../../data/familyPicnicData';
import { useTheme } from '../../context/ThemeContext';
import { playFeedbackSound, speakEnglish, stopSpeaking } from '../../utils/audio';
import { ReversibleTextCard } from './ReversibleTextCard';

interface Activity3FamilyTableProps {
  speed: number;
  accent?: 'US' | 'UK';
}

export const Activity3FamilyTable: React.FC<Activity3FamilyTableProps> = ({
  speed,
  accent = 'US',
}) => {
  const { isDark } = useTheme();

  // Selected word token for click-to-place
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  // Placements: { [itemId]: 'family' | 'others' }
  const [placements, setPlacements] = useState<Record<string, 'family' | 'others'>>({});

  // Flipped card translations: { [itemId]: boolean }
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  // Checked state
  const [isChecked, setIsChecked] = useState(false);

  const items = ACTIVIDAD_3_FAMILY_ITEMS;

  const handleToggleFlip = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    playFeedbackSound('click');
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handlePlayAudio = (textEn: string, e: React.MouseEvent) => {
    e.stopPropagation();
    stopSpeaking();
    playFeedbackSound('click');
    speakEnglish(textEn, speed, accent);
  };

  const handleSelectItem = (id: string) => {
    if (isChecked) return;
    playFeedbackSound('click');
    setSelectedItemId((prev) => (prev === id ? null : id));
  };

  const handleAssignToCategory = (target: 'family' | 'others') => {
    if (isChecked || !selectedItemId) return;
    playFeedbackSound('click');
    setPlacements((prev) => ({
      ...prev,
      [selectedItemId]: target,
    }));
    setSelectedItemId(null);
  };

  const handleRemoveFromCategory = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (isChecked) return;
    playFeedbackSound('click');
    setPlacements((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  const handleDragStart = (e: React.DragEvent, id: string) => {
    if (isChecked) return;
    e.dataTransfer.setData('text/plain', id);
  };

  const handleDrop = (e: React.DragEvent, target: 'family' | 'others') => {
    e.preventDefault();
    if (isChecked) return;
    const id = e.dataTransfer.getData('text/plain');
    if (id) {
      playFeedbackSound('click');
      setPlacements((prev) => ({
        ...prev,
        [id]: target,
      }));
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const totalCount = items.length;
  const placedCount = Object.keys(placements).length;

  const handleCheck = () => {
    const isAllPlaced = items.every((item) => placements[item.id]);
    if (!isAllPlaced) return;

    const allCorrect = items.every(
      (item) => placements[item.id] === item.category
    );

    playFeedbackSound(allCorrect ? 'correct' : 'wrong');
    setIsChecked(true);
  };

  const handleReset = () => {
    playFeedbackSound('click');
    setPlacements({});
    setSelectedItemId(null);
    setIsChecked(false);
  };

  const unassignedItems = items.filter((item) => !placements[item.id]);
  const familyItems = items.filter((item) => placements[item.id] === 'family');
  const othersItems = items.filter((item) => placements[item.id] === 'others');

  return (
    <div className="w-full flex flex-col gap-6 animate-in fade-in duration-200">
      {/* 1. Reversible Instruction Card */}
      <ReversibleTextCard
        textEn="Read about the family's picnic in the park. Then fill in the table. Put the family members under Family and the other people under Others."
        textEs="Lee sobre el picnic familiar en el parque. Luego completa la tabla. Coloca los miembros de la familia bajo Family y a las demás personas bajo Others."
        speed={speed}
        accent={accent}
      />

      {/* 2. Main Columns: Family Column, Others Column, and Pool of Items */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left 8 Cols: Two Table Columns */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Family Column */}
          <div
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, 'family')}
            onClick={() => selectedItemId && handleAssignToCategory('family')}
            className={`min-h-[380px] p-4 rounded-2xl border-2 transition-all flex flex-col gap-3 ${
              selectedItemId
                ? 'border-sky-400 bg-sky-50/30 dark:bg-sky-950/20 shadow-md'
                : isDark
                ? 'bg-slate-900 border-slate-700/80'
                : 'bg-white border-slate-300'
            }`}
          >
            <div className="text-center pb-2 border-b border-inherit">
              <h3 className="text-base font-bold text-sky-600 dark:text-sky-400 tracking-wide">
                Family
              </h3>
            </div>

            <div className="flex-1 flex flex-col gap-2.5">
              {familyItems.length === 0 ? (
                <div className="flex-1 flex items-center justify-center border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-4">
                  <span className="text-sm font-semibold text-slate-400 select-none">
                    Drag Here
                  </span>
                </div>
              ) : (
                familyItems.map((item) => {
                  const isCorrect = item.category === 'family';
                  const isFlipped = Boolean(flippedCards[item.id]);

                  return (
                    <div
                      key={item.id}
                      onClick={(e) => handleRemoveFromCategory(item.id, e)}
                      className={`p-3 rounded-xl border text-xs sm:text-sm font-medium transition-all shadow-xs cursor-pointer ${
                        isChecked
                          ? isCorrect
                            ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-400 text-emerald-900 dark:text-emerald-200'
                            : 'bg-rose-50 dark:bg-rose-950/30 border-rose-400 text-rose-900 dark:text-rose-200'
                          : isDark
                          ? 'bg-slate-800 border-slate-700 text-slate-200 hover:border-rose-400'
                          : 'bg-slate-50 border-slate-200 text-slate-800 hover:border-rose-400'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="flex-1 font-semibold leading-relaxed">
                          {isFlipped ? item.wordEs : item.wordEn}
                        </span>
                        <div className="shrink-0 flex items-center gap-1">
                          <button
                            type="button"
                            onClick={(e) => handleToggleFlip(item.id, e)}
                            className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500"
                            title="Voltear traducción"
                          >
                            <RefreshCw className="w-3 h-3" />
                          </button>
                          <button
                            type="button"
                            onClick={(e) => handlePlayAudio(item.wordEn, e)}
                            className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 text-sky-500"
                            title="Escuchar audio"
                          >
                            <Volume2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      {!isChecked && (
                        <span className="text-[10px] text-slate-400 block mt-0.5">
                          (Click para quitar)
                        </span>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Others Column */}
          <div
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, 'others')}
            onClick={() => selectedItemId && handleAssignToCategory('others')}
            className={`min-h-[380px] p-4 rounded-2xl border-2 transition-all flex flex-col gap-3 ${
              selectedItemId
                ? 'border-sky-400 bg-sky-50/30 dark:bg-sky-950/20 shadow-md'
                : isDark
                ? 'bg-slate-900 border-slate-700/80'
                : 'bg-white border-slate-300'
            }`}
          >
            <div className="text-center pb-2 border-b border-inherit">
              <h3 className="text-base font-bold text-sky-600 dark:text-sky-400 tracking-wide">
                Others
              </h3>
            </div>

            <div className="flex-1 flex flex-col gap-2.5">
              {othersItems.length === 0 ? (
                <div className="flex-1 flex items-center justify-center border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-4">
                  <span className="text-sm font-semibold text-slate-400 select-none">
                    Drag Here
                  </span>
                </div>
              ) : (
                othersItems.map((item) => {
                  const isCorrect = item.category === 'others';
                  const isFlipped = Boolean(flippedCards[item.id]);

                  return (
                    <div
                      key={item.id}
                      onClick={(e) => handleRemoveFromCategory(item.id, e)}
                      className={`p-3 rounded-xl border text-xs sm:text-sm font-medium transition-all shadow-xs cursor-pointer ${
                        isChecked
                          ? isCorrect
                            ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-400 text-emerald-900 dark:text-emerald-200'
                            : 'bg-rose-50 dark:bg-rose-950/30 border-rose-400 text-rose-900 dark:text-rose-200'
                          : isDark
                          ? 'bg-slate-800 border-slate-700 text-slate-200 hover:border-rose-400'
                          : 'bg-slate-50 border-slate-200 text-slate-800 hover:border-rose-400'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="flex-1 font-semibold leading-relaxed">
                          {isFlipped ? item.wordEs : item.wordEn}
                        </span>
                        <div className="shrink-0 flex items-center gap-1">
                          <button
                            type="button"
                            onClick={(e) => handleToggleFlip(item.id, e)}
                            className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500"
                            title="Voltear traducción"
                          >
                            <RefreshCw className="w-3 h-3" />
                          </button>
                          <button
                            type="button"
                            onClick={(e) => handlePlayAudio(item.wordEn, e)}
                            className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 text-sky-500"
                            title="Escuchar audio"
                          >
                            <Volume2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      {!isChecked && (
                        <span className="text-[10px] text-slate-400 block mt-0.5">
                          (Click para quitar)
                        </span>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Right 4 Cols: Pool of Items */}
        <div className="lg:col-span-4 flex flex-col gap-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
              Palabras ({unassignedItems.length}):
            </span>
            <span className="text-xs text-sky-600 dark:text-sky-400">
              Arrastra o toca para asignar
            </span>
          </div>

          <div className="flex flex-col gap-2">
            {unassignedItems.map((item) => {
              const isSelected = selectedItemId === item.id;
              const isFlipped = Boolean(flippedCards[item.id]);

              return (
                <div
                  key={item.id}
                  draggable={!isChecked}
                  onDragStart={(e) => handleDragStart(e, item.id)}
                  onClick={() => handleSelectItem(item.id)}
                  className={`p-2.5 sm:p-3 rounded-xl border-2 transition-all cursor-grab active:cursor-grabbing select-none ${
                    isSelected
                      ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300 shadow-md scale-102'
                      : isDark
                      ? 'bg-slate-900 border-slate-700 text-slate-200 hover:border-sky-400'
                      : 'bg-white border-slate-200 text-slate-800 hover:border-sky-400 shadow-xs'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs sm:text-sm font-semibold flex-1">
                      {isFlipped ? item.wordEs : item.wordEn}
                    </span>
                    <div className="shrink-0 flex items-center gap-1">
                      <button
                        type="button"
                        onClick={(e) => handleToggleFlip(item.id, e)}
                        className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500"
                        title="Voltear traducción"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => handlePlayAudio(item.wordEn, e)}
                        className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 text-sky-500"
                        title="Escuchar audio"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. Action Buttons */}
      <div className="w-full flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
        <button
          type="button"
          onClick={handleReset}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border transition-all cursor-pointer ${
            isDark
              ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
              : 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reiniciar</span>
        </button>

        <button
          type="button"
          onClick={handleCheck}
          disabled={placedCount < totalCount || isChecked}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold shadow-md transition-all cursor-pointer ${
            placedCount < totalCount || isChecked
              ? 'opacity-50 cursor-not-allowed bg-slate-300 dark:bg-slate-700 text-slate-500'
              : 'bg-sky-600 hover:bg-sky-500 text-white shadow-sky-600/30 hover:scale-105 active:scale-95'
          }`}
        >
          <Check className="w-4 h-4" />
          <span>Comprobar ({placedCount}/{totalCount})</span>
        </button>
      </div>
    </div>
  );
};
