import React, { useState } from 'react';
import { ChevronDown, RotateCcw, Check, Sparkles, CheckCircle2, XCircle } from 'lucide-react';
import { AudioClipsDropdownExercise as ClipsExerciseType } from '../types';
import { playFeedbackSound } from '../utils/audio';
import { useTheme } from '../context/ThemeContext';
import { AudioPlayerCard } from './AudioPlayerCard';
import { CardSpeechControl } from './CardSpeechControl';
import sheilaKitchenImg from '../assets/images/sheila_kitchen_salad_1788913662919.jpg';

interface FoodClipsDropdownExerciseProps {
  exercise: ClipsExerciseType;
  accent?: 'US' | 'UK';
  speechRate?: number;
  onSuccess?: () => void;
}

export const FoodClipsDropdownExercise: React.FC<FoodClipsDropdownExerciseProps> = ({
  exercise,
  accent = 'US',
  speechRate = 1.0,
  onSuccess,
}) => {
  const { isDark } = useTheme();

  // Reversible instruction card state
  const [isInstructionFlipped, setIsInstructionFlipped] = useState(false);

  // Selected values for each blank: blankId -> string
  const [selectedValues, setSelectedValues] = useState<Record<string, string>>({});
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  // Reversible clip cards: clipId -> isFlipped
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  // Check state
  const [hasChecked, setHasChecked] = useState(false);
  const [isAllCorrect, setIsAllCorrect] = useState(false);

  const clips = exercise.clips || [];

  const handleToggleCardFlip = (clipId: string) => {
    playFeedbackSound('click');
    setFlippedCards((prev) => ({
      ...prev,
      [clipId]: !prev[clipId],
    }));
  };

  const handleSelectOption = (blankId: string, val: string) => {
    playFeedbackSound('click');
    setSelectedValues((prev) => ({
      ...prev,
      [blankId]: val,
    }));
    setOpenDropdownId(null);
    setHasChecked(false);
  };

  const handleCheck = () => {
    playFeedbackSound('click');
    setHasChecked(true);

    let allOk = true;
    for (const clip of clips) {
      for (const blank of clip.blanks) {
        if (selectedValues[blank.id] !== blank.correctAnswer) {
          allOk = false;
          break;
        }
      }
      if (!allOk) break;
    }

    setIsAllCorrect(allOk);
    if (allOk) {
      playFeedbackSound('correct');
      if (onSuccess) onSuccess();
    } else {
      playFeedbackSound('wrong');
    }
  };

  const handleClear = () => {
    playFeedbackSound('click');
    setSelectedValues({});
    setHasChecked(false);
    setIsAllCorrect(false);
    setOpenDropdownId(null);
  };

  return (
    <div className="w-full flex flex-col gap-6 select-none">
      {/* 1. REVERSIBLE INSTRUCTION CARD (NO FLIP BUTTONS, NO GRADIENTS, WITH AUDIO & SPEED) */}
      <div
        id="clips-instruction-card"
        onClick={() => {
          playFeedbackSound('click');
          setIsInstructionFlipped((prev) => !prev);
        }}
        className={`w-full p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer shadow-sm relative ${
          isDark
            ? 'bg-slate-900 border-slate-700 hover:border-emerald-500/50 text-slate-100'
            : 'bg-white border-slate-200 hover:border-emerald-400 text-slate-800'
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            <span className="text-[11px] font-mono uppercase font-bold tracking-wider text-emerald-500 block mb-1">
              {isInstructionFlipped ? 'Instrucción (Español)' : 'Instructions (English)'}
            </span>
            <p className="text-base sm:text-lg font-medium leading-snug">
              {isInstructionFlipped
                ? 'Escucha estos fragmentos de "La Cocina de Sheila" y completa las oraciones.'
                : 'Listen to these clips from "Sheila\'s Kitchen," and complete the sentences.'}
            </p>
          </div>

          <CardSpeechControl
            textToSpeak={"Listen to these clips from \"Sheila's Kitchen,\" and complete the sentences."}
            accent={accent}
            initialSpeed={speechRate}
            gender="female"
            size="md"
          />
        </div>
      </div>

      {/* 2. MAIN 2-COLUMN SECTION: PLAYER (LEFT) + 2 CLIPS WITH DROPDOWNS (RIGHT) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        {/* Left Column: Media Player (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <AudioPlayerCard
            audioText={exercise.transcript || ''}
            sentences={exercise.sentences || []}
            accent={accent}
            initialPlaybackRate={speechRate}
            totalDurationSeconds={65}
            imageSrc={sheilaKitchenImg}
            altText="Sheila in the kitchen"
            speakerGender="female"
          />
        </div>

        {/* Right Column: 2 Audio Clips with Dropdowns (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-5">
          {/* CLIP 1 */}
          {clips[0] && (
            <div
              id="food-clip-card-1"
              onClick={() => handleToggleCardFlip(clips[0].id)}
              className={`p-5 sm:p-6 rounded-2xl border transition-all cursor-pointer shadow-xs relative flex flex-col gap-4 ${
                flippedCards[clips[0].id]
                  ? isDark
                    ? 'bg-slate-900 border-emerald-500/60'
                    : 'bg-white border-emerald-400'
                  : isDark
                  ? 'bg-slate-900 border-slate-800 hover:border-slate-700'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              {/* Header with Clip label & Speaker Control */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-500 font-mono font-bold text-xs">
                    Clip 1
                  </span>
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
                    {flippedCards[clips[0].id] ? 'Traducción' : 'Listen & Complete'}
                  </span>
                </div>

                <CardSpeechControl
                  textToSpeak={clips[0].fullSentenceEn}
                  accent={accent}
                  initialSpeed={speechRate}
                  gender="female"
                  size="sm"
                />
              </div>

              {/* Body */}
              {flippedCards[clips[0].id] ? (
                <div className="py-2 text-sm sm:text-base font-medium leading-relaxed">
                  <p className={isDark ? 'text-slate-100' : 'text-slate-800'}>
                    {clips[0].fullSentenceEs}
                  </p>
                </div>
              ) : (
                <div
                  className="flex flex-wrap items-center gap-2 text-sm sm:text-base font-medium leading-relaxed"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span className={isDark ? 'text-slate-200' : 'text-slate-800'}>
                    And now, a few words about Durelle plates and
                  </span>

                  {/* Blank 1: dishes */}
                  {renderDropdown(
                    clips[0].blanks[0],
                    'c1-b1',
                    selectedValues,
                    openDropdownId,
                    hasChecked,
                    isDark,
                    setOpenDropdownId,
                    handleSelectOption
                  )}

                  <span className={isDark ? 'text-slate-200' : 'text-slate-800'}>
                    . You can cook in them,
                  </span>

                  {/* Blank 2: bake */}
                  {renderDropdown(
                    clips[0].blanks[1],
                    'c1-b2',
                    selectedValues,
                    openDropdownId,
                    hasChecked,
                    isDark,
                    setOpenDropdownId,
                    handleSelectOption
                  )}

                  <span className={isDark ? 'text-slate-200' : 'text-slate-800'}>
                    in them, and freeze
                  </span>

                  {/* Blank 3: food */}
                  {renderDropdown(
                    clips[0].blanks[2],
                    'c1-b3',
                    selectedValues,
                    openDropdownId,
                    hasChecked,
                    isDark,
                    setOpenDropdownId,
                    handleSelectOption
                  )}

                  <span className={isDark ? 'text-slate-200' : 'text-slate-800'}>
                    in them, too.
                  </span>
                </div>
              )}
            </div>
          )}

          {/* CLIP 2 */}
          {clips[1] && (
            <div
              id="food-clip-card-2"
              onClick={() => handleToggleCardFlip(clips[1].id)}
              className={`p-5 sm:p-6 rounded-2xl border transition-all cursor-pointer shadow-xs relative flex flex-col gap-4 ${
                flippedCards[clips[1].id]
                  ? isDark
                    ? 'bg-slate-900 border-emerald-500/60'
                    : 'bg-white border-emerald-400'
                  : isDark
                  ? 'bg-slate-900 border-slate-800 hover:border-slate-700'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              {/* Header with Clip label & Speaker Control */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-500 font-mono font-bold text-xs">
                    Clip 2
                  </span>
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
                    {flippedCards[clips[1].id] ? 'Traducción' : 'Listen & Complete'}
                  </span>
                </div>

                <CardSpeechControl
                  textToSpeak={clips[1].fullSentenceEn}
                  accent={accent}
                  initialSpeed={speechRate}
                  gender="female"
                  size="sm"
                />
              </div>

              {/* Body */}
              {flippedCards[clips[1].id] ? (
                <div className="py-2 text-sm sm:text-base font-medium leading-relaxed">
                  <p className={isDark ? 'text-slate-100' : 'text-slate-800'}>
                    {clips[1].fullSentenceEs}
                  </p>
                </div>
              ) : (
                <div
                  className="flex flex-wrap items-center gap-2 text-sm sm:text-base font-medium leading-relaxed"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span className={isDark ? 'text-slate-200' : 'text-slate-800'}>
                    Buy Durelle products and enjoy them in the
                  </span>

                  {/* Blank 4: kitchen */}
                  {renderDropdown(
                    clips[1].blanks[0],
                    'c2-b1',
                    selectedValues,
                    openDropdownId,
                    hasChecked,
                    isDark,
                    setOpenDropdownId,
                    handleSelectOption
                  )}

                  <span className={isDark ? 'text-slate-200' : 'text-slate-800'}>
                    and on your table. They are strong enough for
                  </span>

                  {/* Blank 5: cooking */}
                  {renderDropdown(
                    clips[1].blanks[1],
                    'c2-b2',
                    selectedValues,
                    openDropdownId,
                    hasChecked,
                    isDark,
                    setOpenDropdownId,
                    handleSelectOption
                  )}

                  <span className={isDark ? 'text-slate-200' : 'text-slate-800'}>
                    . They are pretty enough for
                  </span>

                  {/* Blank 6: guests */}
                  {renderDropdown(
                    clips[1].blanks[2],
                    'c2-b3',
                    selectedValues,
                    openDropdownId,
                    hasChecked,
                    isDark,
                    setOpenDropdownId,
                    handleSelectOption
                  )}

                  <span className={isDark ? 'text-slate-200' : 'text-slate-800'}>
                    .
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={handleClear}
              className={`px-4 py-2.5 rounded-xl border font-semibold text-sm transition-all cursor-pointer flex items-center gap-2 ${
                isDark
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300'
              }`}
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reiniciar</span>
            </button>

            <button
              type="button"
              onClick={handleCheck}
              disabled={Object.keys(selectedValues).length === 0}
              className={`px-6 py-2.5 rounded-xl font-bold text-sm shadow-md transition-all cursor-pointer flex items-center gap-2 ${
                isAllCorrect
                  ? 'bg-emerald-600 text-white shadow-emerald-500/25'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed'
              }`}
            >
              {isAllCorrect ? <Sparkles className="w-4 h-4" /> : <Check className="w-4 h-4" />}
              <span>{isAllCorrect ? '¡Completado con Éxito!' : 'Comprobar Respuestas'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

function renderDropdown(
  blank: { id: string; options: string[]; correctAnswer: string },
  key: string,
  selectedValues: Record<string, string>,
  openDropdownId: string | null,
  hasChecked: boolean,
  isDark: boolean,
  setOpenDropdownId: React.Dispatch<React.SetStateAction<string | null>>,
  handleSelectOption: (id: string, val: string) => void
) {
  const currentVal = selectedValues[blank.id];
  const isCorrect = hasChecked && currentVal === blank.correctAnswer;
  const isIncorrect = hasChecked && currentVal && currentVal !== blank.correctAnswer;
  const isOpen = openDropdownId === blank.id;

  return (
    <div key={key} className="relative inline-block align-middle">
      <button
        type="button"
        id={`dropdown-btn-${blank.id}`}
        onClick={(e) => {
          e.stopPropagation();
          setOpenDropdownId((prev) => (prev === blank.id ? null : blank.id));
        }}
        className={`inline-flex items-center justify-between gap-1.5 px-3 py-1 rounded-xl border font-sans text-sm font-semibold transition-all cursor-pointer min-w-[105px] ${
          isOpen
            ? 'border-emerald-500 ring-2 ring-emerald-300/40 bg-white dark:bg-slate-900 text-emerald-500'
            : hasChecked
            ? isCorrect
              ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold'
              : 'border-rose-500 bg-rose-500/10 text-rose-600 dark:text-rose-400'
            : isDark
            ? 'bg-slate-800 border-slate-700 hover:border-slate-500 text-white'
            : 'bg-slate-50 border-slate-300 hover:border-slate-400 text-slate-800'
        }`}
      >
        <span className="truncate">{currentVal || '...'}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-emerald-500 shrink-0 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Dropdown Popup */}
      {isOpen && (
        <div
          onClick={(e) => e.stopPropagation()}
          className={`absolute z-40 top-full left-0 mt-1 min-w-[130px] rounded-xl border shadow-xl py-1 overflow-hidden animate-in fade-in duration-150 ${
            isDark
              ? 'bg-slate-900 border-emerald-500/50 text-white'
              : 'bg-white border-emerald-400 text-slate-800'
          }`}
        >
          {blank.options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleSelectOption(blank.id, opt);
              }}
              className={`w-full text-left px-3 py-1.5 text-xs sm:text-sm font-medium transition-colors cursor-pointer flex items-center justify-between ${
                currentVal === opt
                  ? 'bg-emerald-600 text-white font-bold'
                  : isDark
                  ? 'hover:bg-slate-800 text-slate-200'
                  : 'hover:bg-emerald-50 text-slate-800'
              }`}
            >
              <span>{opt}</span>
              {currentVal === opt && <Check className="w-3.5 h-3.5" />}
            </button>
          ))}
        </div>
      )}

      {hasChecked && (
        <span className="inline-flex items-center ml-1">
          {isCorrect && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
          {isIncorrect && <XCircle className="w-3.5 h-3.5 text-rose-500" />}
        </span>
      )}
    </div>
  );
}
