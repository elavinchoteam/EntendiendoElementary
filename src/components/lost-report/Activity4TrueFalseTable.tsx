import React, { useState } from 'react';
import {
  Check,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Volume2,
  RefreshCw,
  Sparkles,
  MoveRight,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { speakEnglish, stopSpeaking, playFeedbackSound } from '../../utils/audio';
import { ACTIVITY_4_DATA, TrueFalseStatementItem } from '../../data/lostReportData';

interface Activity4TrueFalseTableProps {
  speed?: number;
  accent?: 'US' | 'UK';
}

export const Activity4TrueFalseTable: React.FC<Activity4TrueFalseTableProps> = ({
  speed = 1.0,
  accent = 'US',
}) => {
  const { isDark } = useTheme();

  // Instruction flip
  const [isHeaderFlipped, setIsHeaderFlipped] = useState(false);
  const instructionEn = 'Are these sentences true or false? Complete the table.';
  const instructionEs = '¿Son estas oraciones verdaderas o falsas? Completa la tabla.';

  // Placements: statementId -> 'true' | 'false' | undefined (in unplaced pool)
  const [placements, setPlacements] = useState<Record<string, 'true' | 'false'>>({});

  // Flipped cards: statementId -> boolean
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  // Active dragged item
  const [draggedId, setDraggedId] = useState<string | null>(null);

  // Check state
  const [hasChecked, setHasChecked] = useState(false);
  const [isAllCorrect, setIsAllCorrect] = useState(false);

  // Items currently in True column
  const trueItems = ACTIVITY_4_DATA.filter((item) => placements[item.id] === 'true');
  // Items currently in False column
  const falseItems = ACTIVITY_4_DATA.filter((item) => placements[item.id] === 'false');
  // Items unplaced
  const poolItems = ACTIVITY_4_DATA.filter((item) => !placements[item.id]);

  const handleToggleCardFlip = (itemId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    playFeedbackSound('click');
    setFlippedCards((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const handlePlayAudio = (textEn: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    stopSpeaking();
    playFeedbackSound('click');
    speakEnglish(textEn, speed, accent);
  };

  const handleDragStart = (e: React.DragEvent, itemId: string) => {
    setDraggedId(itemId);
    e.dataTransfer.setData('text/plain', itemId);
  };

  const handleDropOnCategory = (category: 'true' | 'false') => {
    if (!draggedId) return;
    playFeedbackSound('click');
    setPlacements((prev) => ({
      ...prev,
      [draggedId]: category,
    }));
    setDraggedId(null);
    setHasChecked(false);
  };

  const handleMoveToPool = (itemId: string) => {
    playFeedbackSound('click');
    setPlacements((prev) => {
      const copy = { ...prev };
      delete copy[itemId];
      return copy;
    });
    setHasChecked(false);
  };

  const handleQuickPlace = (itemId: string, targetCategory: 'true' | 'false') => {
    playFeedbackSound('click');
    setPlacements((prev) => ({
      ...prev,
      [itemId]: targetCategory,
    }));
    setHasChecked(false);
  };

  const handleCheck = () => {
    playFeedbackSound('click');
    setHasChecked(true);

    const allPlaced = ACTIVITY_4_DATA.every((item) => placements[item.id] !== undefined);
    const allCorrect =
      allPlaced &&
      ACTIVITY_4_DATA.every((item) => placements[item.id] === item.correctCategory);

    setIsAllCorrect(allCorrect);
    if (allCorrect) {
      playFeedbackSound('correct');
    } else {
      playFeedbackSound('wrong');
    }
  };

  const handleReset = () => {
    playFeedbackSound('click');
    setPlacements({});
    setHasChecked(false);
    setIsAllCorrect(false);
  };

  const renderStatementCard = (
    item: TrueFalseStatementItem,
    inCategory?: 'true' | 'false'
  ) => {
    const isFlipped = !!flippedCards[item.id];
    const isCorrectPlacement = placements[item.id] === item.correctCategory;

    let borderClass = isDark
      ? 'border-slate-700 bg-slate-800 text-slate-100 hover:border-slate-600'
      : 'border-slate-200 bg-white text-slate-800 shadow-xs hover:border-slate-300';

    if (hasChecked && inCategory) {
      borderClass = isCorrectPlacement
        ? 'border-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-100'
        : 'border-rose-400 bg-rose-50 dark:bg-rose-950/40 text-rose-950 dark:text-rose-100';
    }

    return (
      <div
        key={item.id}
        draggable
        onDragStart={(e) => handleDragStart(e, item.id)}
        className={`p-3 rounded-xl border transition-all select-none cursor-grab active:cursor-grabbing ${borderClass}`}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            {!isFlipped ? (
              <p className="text-xs sm:text-sm font-semibold leading-relaxed">
                {item.text}
              </p>
            ) : (
              <p className="text-xs sm:text-sm font-medium italic text-emerald-800 dark:text-emerald-300 leading-relaxed font-serif">
                {item.textEs}
              </p>
            )}
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              onClick={(e) => handleToggleCardFlip(item.id, e)}
              className={`w-6 h-6 rounded-md border flex items-center justify-center transition-all cursor-pointer ${
                isFlipped
                  ? 'bg-emerald-500 text-white border-emerald-600'
                  : isDark
                  ? 'bg-slate-700 border-slate-600 text-slate-300 hover:text-white'
                  : 'bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900'
              }`}
              title={isFlipped ? 'Ver en inglés' : 'Ver traducción'}
            >
              <RefreshCw className={`w-3 h-3 ${isFlipped ? 'rotate-180' : ''}`} />
            </button>

            <button
              type="button"
              onClick={(e) => handlePlayAudio(item.text, e)}
              className={`w-6 h-6 rounded-md border flex items-center justify-center transition-all cursor-pointer ${
                isDark
                  ? 'bg-slate-700 border-slate-600 text-sky-400 hover:text-white'
                  : 'bg-slate-100 border-slate-200 text-sky-600 hover:text-sky-800'
              }`}
              title="Escuchar audio"
            >
              <Volume2 className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Quick move buttons for mobile / touch */}
        {!inCategory ? (
          <div className="mt-2.5 pt-2 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-end gap-1.5 text-[11px]">
            <span className="text-slate-400 text-[10px] mr-auto">Mover a:</span>
            <button
              type="button"
              onClick={() => handleQuickPlace(item.id, 'true')}
              className="px-2 py-0.5 rounded-md bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 font-semibold hover:bg-sky-200 dark:hover:bg-sky-900 cursor-pointer"
            >
              + True
            </button>
            <button
              type="button"
              onClick={() => handleQuickPlace(item.id, 'false')}
              className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-200 dark:hover:bg-slate-600 cursor-pointer"
            >
              + False
            </button>
          </div>
        ) : (
          <div className="mt-2 pt-1.5 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-[11px]">
            <button
              type="button"
              onClick={() => handleMoveToPool(item.id)}
              className="text-[11px] text-slate-500 hover:text-rose-500 underline cursor-pointer"
            >
              Quitar de aquí
            </button>
            {hasChecked && (
              <span
                className={`font-bold flex items-center gap-1 ${
                  isCorrectPlacement
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : 'text-rose-600 dark:text-rose-400'
                }`}
              >
                {isCorrectPlacement ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    ¡Correcto!
                  </>
                ) : (
                  <>
                    <XCircle className="w-3.5 h-3.5" />
                    Era {item.correctCategory === 'true' ? 'True' : 'False'}
                  </>
                )}
              </span>
            )}
          </div>
        )}

        {/* Post-check explanation */}
        {hasChecked && inCategory && !isCorrectPlacement && (
          <p className="mt-1.5 text-[11px] text-rose-700 dark:text-rose-300 italic font-serif">
            {item.explanationEs}
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-4">
      {/* Reversible Instruction Header Card */}
      <div
        className={`p-3.5 sm:p-4 rounded-2xl border transition-all shadow-xs ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        }`}
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 text-[11px] font-bold rounded-md bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 uppercase tracking-wider font-mono">
                Actividad 4 · Complete the table
              </span>
              <span className="text-xs text-slate-400 font-medium hidden sm:inline">
                {isHeaderFlipped ? 'Español' : 'English'}
              </span>
            </div>
            {!isHeaderFlipped ? (
              <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 leading-relaxed">
                {instructionEn}
              </p>
            ) : (
              <p className="text-xs sm:text-sm font-medium italic text-emerald-800 dark:text-emerald-300 leading-relaxed font-serif">
                {instructionEs}
              </p>
            )}
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => {
                playFeedbackSound('click');
                setIsHeaderFlipped((prev) => !prev);
              }}
              className={`w-8 h-8 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                isHeaderFlipped
                  ? 'bg-emerald-500 text-white border-emerald-600'
                  : isDark
                  ? 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
                  : 'bg-slate-100 border-slate-200 text-slate-700 hover:text-slate-900'
              }`}
              title="Voltear instrucción al español"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isHeaderFlipped ? 'rotate-180' : ''}`} />
            </button>
            <button
              type="button"
              onClick={(e) => handlePlayAudio(instructionEn, e)}
              className={`w-8 h-8 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                isDark
                  ? 'bg-slate-800 border-slate-700 text-sky-400 hover:text-white'
                  : 'bg-slate-100 border-slate-200 text-sky-600 hover:text-sky-800'
              }`}
              title="Escuchar instrucción"
            >
              <Volume2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Layout matching screenshot: Table columns on Left, draggable chips on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left: Two Table Columns (True & False) */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Column True */}
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDropOnCategory('true')}
            className={`p-4 rounded-2xl border-2 border-dashed min-h-[360px] flex flex-col transition-all ${
              isDark
                ? 'bg-slate-900/60 border-sky-700/60'
                : 'bg-slate-50/80 border-sky-300'
            }`}
          >
            <div className="text-center pb-3 mb-3 border-b border-sky-200 dark:border-sky-900">
              <h4 className="text-base font-bold text-sky-600 dark:text-sky-400">
                True
              </h4>
              <span className="text-[11px] text-slate-400">Verdadero</span>
            </div>

            {/* Dropped items */}
            <div className="space-y-3 flex-1">
              {trueItems.map((item) => renderStatementCard(item, 'true'))}

              {trueItems.length === 0 && (
                <div className="h-full min-h-[220px] flex items-center justify-center text-slate-300 dark:text-slate-700 text-2xl font-bold tracking-wider select-none">
                  Drag Here
                </div>
              )}
            </div>
          </div>

          {/* Column False */}
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDropOnCategory('false')}
            className={`p-4 rounded-2xl border-2 border-dashed min-h-[360px] flex flex-col transition-all ${
              isDark
                ? 'bg-slate-900/60 border-slate-700'
                : 'bg-slate-50/80 border-slate-300'
            }`}
          >
            <div className="text-center pb-3 mb-3 border-b border-slate-200 dark:border-slate-800">
              <h4 className="text-base font-bold text-slate-700 dark:text-slate-300">
                False
              </h4>
              <span className="text-[11px] text-slate-400">Falso</span>
            </div>

            {/* Dropped items */}
            <div className="space-y-3 flex-1">
              {falseItems.map((item) => renderStatementCard(item, 'false'))}

              {falseItems.length === 0 && (
                <div className="h-full min-h-[220px] flex items-center justify-center text-slate-300 dark:text-slate-700 text-2xl font-bold tracking-wider select-none">
                  Drag Here
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right: Unplaced Statement Items */}
        <div className="lg:col-span-4 space-y-3">
          <div
            className={`p-4 rounded-2xl border ${
              isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}
          >
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-200 dark:border-slate-800">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                Frases ({poolItems.length} restantes)
              </span>
              <span className="text-[11px] text-slate-400">Arrastra a la tabla</span>
            </div>

            <div className="space-y-2.5">
              {poolItems.map((item) => renderStatementCard(item))}

              {poolItems.length === 0 && (
                <div className="p-6 text-center text-xs text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-950/30 rounded-xl border border-emerald-200 dark:border-emerald-800">
                  <CheckCircle2 className="w-6 h-6 mx-auto mb-1.5" />
                  ¡Todas las oraciones fueron ubicadas! Presiona "Comprobar".
                </div>
              )}
            </div>

            {/* Action buttons */}
            <div className="mt-5 pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
              <button
                type="button"
                onClick={handleReset}
                className={`px-3 py-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  isDark
                    ? 'border-slate-700 bg-slate-800 text-slate-300 hover:text-white'
                    : 'border-slate-200 bg-slate-100 text-slate-700 hover:text-slate-900'
                }`}
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reiniciar</span>
              </button>

              <button
                type="button"
                disabled={poolItems.length > 0}
                onClick={handleCheck}
                className={`px-4 py-2 rounded-xl font-semibold text-xs flex items-center gap-1.5 shadow-md transition-all cursor-pointer ${
                  poolItems.length === 0
                    ? 'bg-sky-600 hover:bg-sky-500 text-white'
                    : 'bg-slate-300 dark:bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                <Check className="w-4 h-4" />
                <span>Comprobar</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
