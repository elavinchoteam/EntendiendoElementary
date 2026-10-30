import React, { useState } from 'react';
import {
  Check,
  RotateCcw,
  Volume2,
  RefreshCw,
  ArrowUp,
  ArrowDown,
  GripVertical,
} from 'lucide-react';
import {
  ACTIVIDAD_2_ORDER_ITEMS,
  StoryOrderItem,
} from '../../data/familyPicnicData';
import { useTheme } from '../../context/ThemeContext';
import { playFeedbackSound, speakEnglish, stopSpeaking } from '../../utils/audio';
import { FamilyPicnicStoryCard } from './FamilyPicnicStoryCard';
import { ReversibleTextCard } from './ReversibleTextCard';

interface Activity2OrderingProps {
  speed: number;
  accent?: 'US' | 'UK';
}

// Initial scrambled order matching user screenshot actividad 2.png:
const INITIAL_ORDER_IDS = [
  'o-relatives-arrive',
  'o-surprise-sister',
  'o-pack-food',
  'o-potato-salad',
  'o-relatives-invite',
  'o-car-broke',
];

export const Activity2Ordering: React.FC<Activity2OrderingProps> = ({
  speed,
  accent = 'US',
}) => {
  const { isDark } = useTheme();

  // Ordered items list
  const [items, setItems] = useState<StoryOrderItem[]>(() => {
    return INITIAL_ORDER_IDS.map((id) =>
      ACTIVIDAD_2_ORDER_ITEMS.find((item) => item.id === id)!
    );
  });

  // Flipped translation state: { [itemId]: boolean }
  const [flippedItems, setFlippedItems] = useState<Record<string, boolean>>({});

  // Checked state
  const [isChecked, setIsChecked] = useState(false);

  // Dragging index
  const [draggedIdx, setDraggedIdx] = useState<number | null>(null);

  const handleToggleFlip = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    playFeedbackSound('click');
    setFlippedItems((prev) => ({
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

  const handleMoveUp = (index: number) => {
    if (index === 0 || isChecked) return;
    playFeedbackSound('click');
    setItems((prev) => {
      const copy = [...prev];
      const temp = copy[index];
      copy[index] = copy[index - 1];
      copy[index - 1] = temp;
      return copy;
    });
  };

  const handleMoveDown = (index: number) => {
    if (index === items.length - 1 || isChecked) return;
    playFeedbackSound('click');
    setItems((prev) => {
      const copy = [...prev];
      const temp = copy[index];
      copy[index] = copy[index + 1];
      copy[index + 1] = temp;
      return copy;
    });
  };

  // Drag and drop
  const handleDragStart = (e: React.DragEvent, index: number) => {
    if (isChecked) return;
    setDraggedIdx(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetIdx: number) => {
    e.preventDefault();
    if (draggedIdx === null || draggedIdx === targetIdx || isChecked) return;
    playFeedbackSound('click');
    setItems((prev) => {
      const copy = [...prev];
      const [removed] = copy.splice(draggedIdx, 1);
      copy.splice(targetIdx, 0, removed);
      return copy;
    });
    setDraggedIdx(null);
  };

  const handleCheck = () => {
    const allCorrect = items.every((item, idx) => item.correctStep === idx + 1);
    playFeedbackSound(allCorrect ? 'correct' : 'wrong');
    setIsChecked(true);
  };

  const handleReset = () => {
    playFeedbackSound('click');
    setItems(
      INITIAL_ORDER_IDS.map((id) =>
        ACTIVIDAD_2_ORDER_ITEMS.find((item) => item.id === id)!
      )
    );
    setIsChecked(false);
  };

  return (
    <div className="w-full flex flex-col gap-5 animate-in fade-in duration-200">
      {/* 1. Reversible Instruction Card */}
      <ReversibleTextCard
        textEn="Read about the picnic, and then put the sentences into the right order."
        textEs="Lee sobre el picnic y luego ordena las oraciones en la secuencia cronológica correcta."
        speed={speed}
        accent={accent}
      />

      {/* 2. Main Two-Column Layout */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Story Card */}
        <div className="lg:col-span-6">
          <FamilyPicnicStoryCard speed={speed} accent={accent} />
        </div>

        {/* Right Column: Ordered List (1 to 6) */}
        <div className="lg:col-span-6 flex flex-col gap-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
              Orden Cronológico (1 al 6):
            </span>
            <span className="text-xs text-sky-600 dark:text-sky-400">
              Arrastra o usa las flechas
            </span>
          </div>

          <div className="flex flex-col gap-2.5">
            {items.map((item, idx) => {
              const currentStep = idx + 1;
              const isCorrect = item.correctStep === currentStep;
              const isFlipped = Boolean(flippedItems[item.id]);

              return (
                <div
                  key={item.id}
                  draggable={!isChecked}
                  onDragStart={(e) => handleDragStart(e, idx)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, idx)}
                  className={`p-3 rounded-xl border-2 transition-all flex items-center justify-between gap-3 ${
                    isChecked
                      ? isCorrect
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-200'
                        : 'border-rose-500 bg-rose-50 dark:bg-rose-950/30 text-rose-900 dark:text-rose-200'
                      : isDark
                      ? 'bg-slate-900 border-slate-700 text-slate-200 hover:border-slate-600'
                      : 'bg-white border-slate-200 text-slate-800 shadow-xs'
                  }`}
                >
                  {/* Left: Drag Handle + Step Number */}
                  <div className="flex items-center gap-2 shrink-0">
                    <GripVertical className="w-4 h-4 text-slate-400 cursor-grab active:cursor-grabbing" />
                    <span className="w-6 h-6 rounded-md bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono font-bold text-xs flex items-center justify-center">
                      {currentStep}
                    </span>
                  </div>

                  {/* Middle: Text (English or Flipped Spanish) */}
                  <div className="flex-1 min-w-0 pr-1">
                    <p className="text-xs sm:text-sm font-medium leading-relaxed">
                      {isFlipped ? (
                        <span className="italic text-emerald-700 dark:text-emerald-300">
                          {item.textEs}
                        </span>
                      ) : (
                        item.textEn
                      )}
                    </p>
                  </div>

                  {/* Right: Actions (Flip, Audio, Move Up/Down) */}
                  <div className="shrink-0 flex items-center gap-1">
                    <button
                      type="button"
                      onClick={(e) => handleToggleFlip(item.id, e)}
                      className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500"
                      title="Voltear traducción"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => handlePlayAudio(item.textEn, e)}
                      className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-800 text-sky-500"
                      title="Escuchar audio"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>

                    {!isChecked && (
                      <div className="flex flex-col ml-1">
                        <button
                          type="button"
                          onClick={() => handleMoveUp(idx)}
                          disabled={idx === 0}
                          className={`p-0.5 rounded text-slate-500 ${
                            idx === 0
                              ? 'opacity-20 cursor-not-allowed'
                              : 'hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-sky-600'
                          }`}
                          title="Mover arriba"
                        >
                          <ArrowUp className="w-3 h-3" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleMoveDown(idx)}
                          disabled={idx === items.length - 1}
                          className={`p-0.5 rounded text-slate-500 ${
                            idx === items.length - 1
                              ? 'opacity-20 cursor-not-allowed'
                              : 'hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-sky-600'
                          }`}
                          title="Mover abajo"
                        >
                          <ArrowDown className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="w-full flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-800">
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
              disabled={isChecked}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold shadow-md transition-all cursor-pointer ${
                isChecked
                  ? 'opacity-50 cursor-not-allowed bg-slate-300 dark:bg-slate-700 text-slate-500'
                  : 'bg-sky-600 hover:bg-sky-500 text-white shadow-sky-600/30 hover:scale-105 active:scale-95'
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
