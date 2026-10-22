import React, { useState } from 'react';
import { Volume2, Check, RotateCcw, CheckCircle2, XCircle, RotateCw, GripVertical, ArrowUp, ArrowDown } from 'lucide-react';
import { speakEnglish, stopSpeaking, playFeedbackSound } from '../../utils/audio';
import { useTheme } from '../../context/ThemeContext';
import { CardSpeechControl } from '../CardSpeechControl';
import { DoItArticleSidebar } from './DoItArticleSidebar';

interface EventItem {
  id: string;
  orderNumber: number;
  textEn: string;
  textEs: string;
}

interface DoItOrderEventsExerciseProps {
  exercise: {
    instructions: string;
    instructionsEs: string;
    events: EventItem[];
  };
  accent?: 'US' | 'UK';
  speechRate?: number;
  onSuccess?: () => void;
}

export const DoItOrderEventsExercise: React.FC<DoItOrderEventsExerciseProps> = ({
  exercise,
  accent = 'US',
  speechRate = 1.0,
  onSuccess,
}) => {
  const { isDark } = useTheme();

  // Reversible instruction card state
  const [isInstructionFlipped, setIsInstructionFlipped] = useState(false);

  // Initial shuffled order or initial event list
  // The correct order is orderNumber: 1, 2, 3, 4, 5, 6, 7
  const initialEvents = [...(exercise.events || [])].sort((a, b) => {
    // Arbitrary mix based on screenshot layout
    const initialOrderMap: Record<number, number> = {
      2: 1,
      5: 2,
      1: 3,
      7: 4,
      6: 5,
      3: 6,
      4: 7,
    };
    return (initialOrderMap[a.orderNumber] || 0) - (initialOrderMap[b.orderNumber] || 0);
  });

  // Current list of event IDs in order (index 0 corresponds to position 1)
  const [currentOrder, setCurrentOrder] = useState<string[]>(initialEvents.map((e) => e.id));

  // Translation flip state: eventId -> boolean
  const [flippedEvents, setFlippedEvents] = useState<Record<string, boolean>>({});

  // Drag and drop tracking
  const [draggedId, setDraggedId] = useState<string | null>(null);

  // Selected event for click-to-swap on mobile
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Check state
  const [hasChecked, setHasChecked] = useState(false);
  const [isAllCorrect, setIsAllCorrect] = useState(false);

  const eventsMap = React.useMemo(() => {
    const map = new Map<string, EventItem>();
    (exercise.events || []).forEach((e) => map.set(e.id, e));
    return map;
  }, [exercise.events]);

  const handlePlayAudio = (text: string, e: React.MouseEvent) => {
    e.stopPropagation();
    stopSpeaking();
    speakEnglish(text, speechRate, accent === 'UK' ? 'UK' : 'US');
  };

  const handleToggleFlip = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    playFeedbackSound('click');
    setFlippedEvents((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const moveItem = (fromIdx: number, toIdx: number) => {
    if (toIdx < 0 || toIdx >= currentOrder.length) return;
    playFeedbackSound('click');
    const updated = [...currentOrder];
    const [moved] = updated.splice(fromIdx, 1);
    updated.splice(toIdx, 0, moved);
    setCurrentOrder(updated);
    setHasChecked(false);
    setSelectedId(null);
  };

  const handleCardClick = (id: string, idx: number) => {
    if (!selectedId) {
      playFeedbackSound('click');
      setSelectedId(id);
    } else if (selectedId === id) {
      setSelectedId(null);
    } else {
      // Swap items
      playFeedbackSound('click');
      const fromIdx = currentOrder.indexOf(selectedId);
      const toIdx = idx;
      const updated = [...currentOrder];
      updated[fromIdx] = id;
      updated[toIdx] = selectedId;
      setCurrentOrder(updated);
      setSelectedId(null);
      setHasChecked(false);
    }
  };

  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedId(id);
    e.dataTransfer.setData('text/plain', id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetIdx: number) => {
    e.preventDefault();
    const sourceId = draggedId || e.dataTransfer.getData('text/plain');
    if (!sourceId) return;

    const sourceIdx = currentOrder.indexOf(sourceId);
    if (sourceIdx !== -1 && sourceIdx !== targetIdx) {
      moveItem(sourceIdx, targetIdx);
    }
    setDraggedId(null);
  };

  const handleCheck = () => {
    // Target order is orderNumber: 1, 2, 3, 4, 5, 6, 7
    let allRight = true;
    currentOrder.forEach((id, idx) => {
      const event = eventsMap.get(id);
      if (!event || event.orderNumber !== idx + 1) {
        allRight = false;
      }
    });

    setIsAllCorrect(allRight);
    setHasChecked(true);

    if (allRight) {
      playFeedbackSound('correct');
      if (onSuccess) onSuccess();
    } else {
      playFeedbackSound('wrong');
    }
  };

  const handleReset = () => {
    playFeedbackSound('click');
    setCurrentOrder(initialEvents.map((e) => e.id));
    setHasChecked(false);
    setIsAllCorrect(false);
    setSelectedId(null);
    setFlippedEvents({});
  };

  return (
    <div className="w-full flex flex-col items-center gap-6 animate-in fade-in duration-200 py-2 select-none">
      {/* Instruction Card */}
      <div className="w-full max-w-4xl perspective-1000">
        <div
          onClick={() => setIsInstructionFlipped((prev) => !prev)}
          className={`relative w-full rounded-2xl cursor-pointer transition-transform duration-500 transform-style-3d shadow-md ${
            isInstructionFlipped ? 'rotate-y-180' : ''
          }`}
          title="Click to flip translation"
        >
          {/* Front: English */}
          <div
            className={`w-full rounded-2xl p-4 sm:p-5 flex items-center justify-between border backface-hidden transition-colors ${
              isDark
                ? 'bg-slate-900 border-sky-500/30 text-white'
                : 'bg-white border-slate-200 text-slate-800'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-sky-500/10 text-sky-500 flex items-center justify-center font-bold text-sm">
                3
              </span>
              <div>
                <h3 className="font-bold text-base sm:text-lg">
                  {exercise.instructions}
                </h3>
                <p className="text-xs text-slate-400 dark:text-slate-500">
                  Drag and drop or use arrows / tap to reorder events 1 to 7 · Click to translate
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
              <CardSpeechControl
                textToSpeak={exercise.instructions}
                accent={accent}
                initialSpeed={speechRate}
              />
              <button
                type="button"
                onClick={() => setIsInstructionFlipped((prev) => !prev)}
                className="p-2 rounded-xl text-xs font-semibold text-sky-600 dark:text-sky-400 hover:bg-sky-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-1"
              >
                <RotateCw className="w-4 h-4" />
                <span className="hidden sm:inline">Español</span>
              </button>
            </div>
          </div>

          {/* Back: Spanish */}
          <div
            className={`absolute inset-0 w-full h-full rounded-2xl p-4 sm:p-5 flex items-center justify-between border backface-hidden rotate-y-180 transition-colors ${
              isDark
                ? 'bg-slate-900 border-emerald-500/40 text-white'
                : 'bg-white border-emerald-300 text-slate-800'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold text-sm">
                3
              </span>
              <div>
                <h3 className="font-bold text-base sm:text-lg font-serif italic text-emerald-600 dark:text-emerald-400">
                  {exercise.instructionsEs}
                </h3>
                <p className="text-xs text-slate-400 dark:text-slate-500 font-sans not-italic">
                  Arrastra o usa las flechas para ordenar los eventos del 1 al 7 · Clic para volver a inglés
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsInstructionFlipped((prev) => !prev)}
              className="p-2 rounded-xl text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-1"
            >
              <RotateCw className="w-4 h-4" />
              <span>Inglés</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Layout: Left Article + Right Reporter's Notebook Slots */}
      <div className="w-full max-w-5xl flex flex-col lg:flex-row gap-6 items-start justify-center">
        {/* Left: Article Sidebar */}
        <DoItArticleSidebar accent={accent} speechRate={speechRate} />

        {/* Right: Reporter's Notebook (Slots 1 to 7) */}
        <div className="flex-1 w-full flex flex-col gap-3">
          <div className="text-xs text-slate-400 dark:text-slate-500 px-1 flex items-center justify-between">
            <span>Reporter's Notebook (Order of Events):</span>
            <span>{selectedId ? 'Click another slot to swap' : 'Click to select or drag to position'}</span>
          </div>

          <div className="space-y-2.5">
            {currentOrder.map((id, idx) => {
              const event = eventsMap.get(id);
              if (!event) return null;

              const isFlipped = Boolean(flippedEvents[id]);
              const isSelected = selectedId === id;
              const isCorrectPosition = hasChecked && event.orderNumber === idx + 1;
              const isIncorrectPosition = hasChecked && event.orderNumber !== idx + 1;

              return (
                <div
                  key={id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, id)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, idx)}
                  className={`w-full p-3 sm:p-3.5 rounded-2xl border transition-all duration-150 flex items-center gap-3 select-none ${
                    isSelected
                      ? 'ring-2 ring-sky-500 border-sky-500 shadow-md scale-[1.01]'
                      : ''
                  } ${
                    isCorrectPosition
                      ? 'bg-emerald-500/10 border-emerald-500 text-emerald-700 dark:text-emerald-300'
                      : isIncorrectPosition
                      ? 'bg-rose-500/10 border-rose-500 text-rose-700 dark:text-rose-300'
                      : isDark
                      ? 'bg-slate-900 border-slate-800 text-slate-200 hover:bg-slate-800/80'
                      : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50 shadow-xs'
                  }`}
                >
                  {/* Position number badge */}
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl font-mono font-bold text-xs sm:text-sm flex items-center justify-center shrink-0 border border-inherit/30 bg-slate-100 dark:bg-slate-800 text-sky-600 dark:text-sky-400">
                    {idx + 1}
                  </div>

                  {/* Drag Handle icon */}
                  <div className="cursor-grab active:cursor-grabbing text-slate-400 hover:text-slate-600 shrink-0 hidden sm:block">
                    <GripVertical className="w-4 h-4" />
                  </div>

                  {/* Event Text */}
                  <div
                    onClick={() => handleCardClick(id, idx)}
                    className="flex-1 cursor-pointer min-w-0 pr-1"
                    title="Click to select or click text to toggle translation"
                  >
                    <p className="text-xs sm:text-sm font-medium leading-snug">
                      {isFlipped ? (
                        <span className="font-serif italic text-emerald-600 dark:text-emerald-400">
                          {event.textEs}
                        </span>
                      ) : (
                        event.textEn
                      )}
                    </p>
                  </div>

                  {/* Actions: Translation flip, Audio, Up/Down reorder arrows */}
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={(e) => handleToggleFlip(id, e)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-sky-500 transition-colors"
                      title="Traducir oración"
                    >
                      <RotateCw className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={(e) => handlePlayAudio(event.textEn, e)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-sky-500 transition-colors"
                      title="Escuchar"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex flex-col gap-0.5 ml-1">
                      <button
                        type="button"
                        disabled={idx === 0}
                        onClick={() => moveItem(idx, idx - 1)}
                        className={`p-1 rounded text-slate-400 hover:text-sky-500 disabled:opacity-20 disabled:cursor-not-allowed`}
                        title="Mover arriba"
                      >
                        <ArrowUp className="w-3 h-3" />
                      </button>
                      <button
                        type="button"
                        disabled={idx === currentOrder.length - 1}
                        onClick={() => moveItem(idx, idx + 1)}
                        className={`p-1 rounded text-slate-400 hover:text-sky-500 disabled:opacity-20 disabled:cursor-not-allowed`}
                        title="Mover abajo"
                      >
                        <ArrowDown className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Feedback & Actions */}
          {hasChecked && (
            <div
              className={`mt-2 p-3.5 rounded-2xl text-xs sm:text-sm flex items-center gap-2.5 animate-in fade-in duration-200 ${
                isAllCorrect
                  ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300'
                  : 'bg-rose-500/10 border border-rose-500/30 text-rose-700 dark:text-rose-300'
              }`}
            >
              {isAllCorrect ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
              ) : (
                <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
              )}
              <p className="font-semibold">
                {isAllCorrect
                  ? '¡Excelente! Los eventos están ordenados cronológicamente.'
                  : 'Algunos eventos no están en el orden correcto. Revisa la historia y vuelve a intentarlo.'}
              </p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={handleReset}
              className={`w-full sm:w-auto px-5 py-3 rounded-2xl border font-semibold text-sm transition-all cursor-pointer flex items-center justify-center gap-2 ${
                isDark
                  ? 'border-slate-700 hover:bg-slate-800 text-slate-300'
                  : 'border-slate-300 hover:bg-slate-100 text-slate-700 shadow-xs'
              }`}
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reiniciar Orden</span>
            </button>

            <button
              type="button"
              onClick={handleCheck}
              className="w-full sm:w-auto px-7 py-3 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm shadow-md shadow-sky-600/30 transition-all cursor-pointer flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95"
            >
              <Check className="w-4 h-4" />
              <span>Comprobar Orden</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
