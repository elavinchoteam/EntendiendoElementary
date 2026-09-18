import React, { useState } from 'react';
import { Volume2, CheckCircle2, XCircle, RotateCcw } from 'lucide-react';
import {
  SHOPRIGHT_PRICE_TABLE,
  SHOPRIGHT_PRICE_OPTIONS,
  SHOPRIGHT_PRICE_OPTIONS_ES,
} from '../../data/saleAtShoprightData';
import { ShoprightPinnedAd } from './ShoprightPinnedAd';
import { useTheme } from '../../context/ThemeContext';
import { speakEnglish, stopSpeaking, playFeedbackSound } from '../../utils/audio';

interface Activity3FoodPriceTableProps {
  speechRate?: number;
  accent?: 'US' | 'UK';
  onNext?: () => void;
}

export const Activity3FoodPriceTable: React.FC<Activity3FoodPriceTableProps> = ({
  speechRate = 1.0,
  accent = 'US',
  onNext,
}) => {
  const { isDark } = useTheme();

  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [rowAssignments, setRowAssignments] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [flippedRows, setFlippedRows] = useState<Record<string, boolean>>({});
  const [playingId, setPlayingId] = useState<string | null>(null);

  const assignedOptions = Object.values(rowAssignments);

  const handlePlay = (text: string, id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (playingId === id && window.speechSynthesis?.speaking) {
      stopSpeaking();
      setPlayingId(null);
      return;
    }
    stopSpeaking();
    setPlayingId(id);
    speakEnglish(
      text,
      speechRate,
      accent || 'US',
      () => setPlayingId(id),
      () => setPlayingId(null)
    );
  };

  const toggleFlipRow = (rowId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFlippedRows((prev) => ({ ...prev, [rowId]: !prev[rowId] }));
  };

  const handleSlotClick = (rowId: string) => {
    if (isSubmitted) return;
    if (selectedOption) {
      playFeedbackSound('click');
      setRowAssignments((prev) => ({ ...prev, [rowId]: selectedOption }));
      setSelectedOption(null);
    } else if (rowAssignments[rowId]) {
      playFeedbackSound('click');
      const copy = { ...rowAssignments };
      delete copy[rowId];
      setRowAssignments(copy);
    }
  };

  const handleCheck = () => {
    setIsSubmitted(true);
    const allCorrect = SHOPRIGHT_PRICE_TABLE.every(
      (item) => rowAssignments[item.id] === item.correctPriceEn
    );
    if (allCorrect) {
      playFeedbackSound('correct');
    } else {
      playFeedbackSound('wrong');
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setRowAssignments({});
    setSelectedOption(null);
  };

  const isAllFilled = SHOPRIGHT_PRICE_TABLE.every((item) => rowAssignments[item.id]);

  return (
    <div className="w-full flex flex-col gap-6 max-w-6xl mx-auto">
      {/* Header */}
      <div
        className={`p-4 sm:p-5 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
          isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            Actividad 3: Food & Sale Price Table
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Read the ad for Shopright, and then fill in the table.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {isSubmitted && (
            <button
              type="button"
              onClick={handleReset}
              className="px-3.5 py-2 rounded-xl text-xs font-bold border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reiniciar</span>
            </button>
          )}

          {!isSubmitted ? (
            <button
              type="button"
              onClick={handleCheck}
              disabled={!isAllFilled}
              className={`px-5 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-1.5 ${
                isAllFilled
                  ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md'
                  : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Comprobar</span>
            </button>
          ) : (
            onNext && (
              <button
                type="button"
                onClick={onNext}
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span>Siguiente</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            )
          )}
        </div>
      </div>

      {/* Main 2-Column Split: Ad on Left, Table on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Authentic Pinned Ad */}
        <div className="lg:col-span-5">
          <ShoprightPinnedAd
            speechRate={speechRate}
            accent={accent}
            compact
          />
        </div>

        {/* Right Column: Interactive Table & Options */}
        <div className="lg:col-span-7 flex flex-col gap-5">
          {/* Options Pool */}
          <div
            className={`p-4 rounded-2xl border ${
              isDark ? 'bg-slate-900 border-slate-700' : 'bg-indigo-50/60 border-indigo-200'
            }`}
          >
            <div className="text-xs font-mono font-bold text-slate-500 uppercase mb-2">
              Sale Price Options
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {SHOPRIGHT_PRICE_OPTIONS.map((opt) => {
                const isUsed = assignedOptions.includes(opt);
                const isSelected = selectedOption === opt;

                return (
                  <button
                    key={opt}
                    type="button"
                    disabled={isUsed || isSubmitted}
                    onClick={() => setSelectedOption(isSelected ? null : opt)}
                    className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold border transition-all cursor-pointer ${
                      isUsed
                        ? 'opacity-30 line-through bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 cursor-not-allowed'
                        : isSelected
                        ? 'bg-indigo-600 text-white border-indigo-500 shadow-md ring-2 ring-indigo-400 scale-105'
                        : isDark
                        ? 'bg-slate-800 hover:bg-slate-700 text-slate-100 border-slate-700'
                        : 'bg-white hover:bg-indigo-100 text-slate-800 border-indigo-300 shadow-xs'
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Table Container */}
          <div
            className={`rounded-2xl border overflow-hidden ${
              isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200 shadow-xs'
            }`}
          >
            {/* Table Header */}
            <div className="grid grid-cols-12 bg-slate-100 dark:bg-slate-800/80 p-3 sm:p-4 border-b border-inherit font-bold text-xs sm:text-sm text-slate-700 dark:text-slate-200">
              <div className="col-span-6 flex items-center gap-2">
                <span>Food</span>
              </div>
              <div className="col-span-6 flex items-center gap-2">
                <span>Sale Price</span>
              </div>
            </div>

            {/* Table Rows */}
            <div className="divide-y divide-inherit">
              {SHOPRIGHT_PRICE_TABLE.map((row) => {
                const placedPrice = rowAssignments[row.id];
                const isFlipped = !!flippedRows[row.id];
                const isCorrect = placedPrice === row.correctPriceEn;

                return (
                  <div
                    key={row.id}
                    className="cursor-pointer perspective select-none min-h-[72px]"
                    onClick={(e) => toggleFlipRow(row.id, e)}
                  >
                    <div
                      className={`w-full transition-transform duration-500 transform-style-3d relative ${
                        isFlipped ? 'rotate-y-180' : ''
                      }`}
                    >
                      {/* FRONT: English */}
                      <div
                        className={`w-full p-3 sm:p-4 grid grid-cols-12 items-center gap-2 backface-hidden ${
                          isDark ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'
                        }`}
                      >
                        {/* Food column */}
                        <div className="col-span-6 flex items-center justify-between pr-2">
                          <span className="font-semibold text-sm sm:text-base">
                            {row.foodEn}
                          </span>

                          <button
                            type="button"
                            onClick={(e) => handlePlay(row.foodEn, row.id, e)}
                            className={`p-1 rounded-lg border transition-all cursor-pointer ${
                              playingId === row.id
                                ? 'bg-indigo-600 text-white border-indigo-500'
                                : isDark
                                ? 'bg-slate-800 hover:bg-slate-700 text-indigo-300 border-slate-700'
                                : 'bg-slate-50 hover:bg-indigo-50 text-indigo-900 border-slate-200'
                            }`}
                            aria-label="Audio"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Price drop slot */}
                        <div
                          className="col-span-6"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSlotClick(row.id);
                          }}
                        >
                          <div
                            className={`p-2 rounded-xl border-2 border-dashed font-bold text-xs sm:text-sm text-center min-h-[44px] flex items-center justify-center transition-all cursor-pointer ${
                              isSubmitted
                                ? isCorrect
                                  ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
                                  : 'border-red-500 bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300'
                                : placedPrice
                                ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-900 dark:text-indigo-300'
                                : 'border-slate-300 dark:border-slate-700 hover:border-indigo-400 text-slate-400'
                            }`}
                          >
                            {placedPrice ? (
                              <div className="flex items-center gap-1.5">
                                <span>{placedPrice}</span>
                                {isSubmitted &&
                                  (isCorrect ? (
                                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                  ) : (
                                    <XCircle className="w-4 h-4 text-red-500" />
                                  ))}
                              </div>
                            ) : (
                              <span className="text-xs font-normal">
                                {selectedOption ? 'Click to place' : 'Select option'}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* BACK: Spanish Translation */}
                      <div
                        className={`absolute inset-0 w-full h-full p-3 sm:p-4 grid grid-cols-12 items-center gap-2 backface-hidden rotate-y-180 border-t border-b border-indigo-300/40 ${
                          isDark ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'
                        }`}
                      >
                        <div className="col-span-6 flex items-center justify-between pr-2">
                          <span className="font-semibold text-sm sm:text-base text-indigo-800 dark:text-indigo-300">
                            {row.foodEs}
                          </span>
                          <button
                            type="button"
                            onClick={(e) => handlePlay(row.foodEn, row.id, e)}
                            className="p-1 rounded-lg border border-slate-300 dark:border-slate-700 text-indigo-600 dark:text-indigo-400"
                            aria-label="Audio"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="col-span-6 text-center text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300">
                          {row.correctPriceEs}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
