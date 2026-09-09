import React, { useState } from 'react';
import { ChevronDown, RotateCcw, Check, Sparkles, CheckCircle2, XCircle } from 'lucide-react';
import { DropdownCompletionExercise as DropdownExerciseType } from '../types';
import { playFeedbackSound } from '../utils/audio';
import { useTheme } from '../context/ThemeContext';
import { AudioPlayerCard } from './AudioPlayerCard';
import { CardSpeechControl } from './CardSpeechControl';
import sheilaKitchenImg from '../assets/images/sheila_kitchen_salad_1788913662919.jpg';

interface FoodDropdownExerciseProps {
  exercise: DropdownExerciseType;
  accent?: 'US' | 'UK';
  speechRate?: number;
  onSuccess?: () => void;
}

interface QuestionItem {
  id: string;
  prefix: string;
  suffix: string;
  prefixEs: string;
  suffixEs: string;
  options: string[];
  correctAnswer: string;
  translationEs: string;
  fullSentenceEn: string;
}

const QUESTIONS: QuestionItem[] = [
  {
    id: 'blank-1',
    prefix: '"Sheila\'s Kitchen" is a',
    suffix: '.',
    prefixEs: '"La Cocina de Sheila" es un',
    suffixEs: '.',
    options: ['radio program', 'television program', 'restaurant', 'store'],
    correctAnswer: 'radio program',
    translationEs: '"La Cocina de Sheila" es un programa de radio.',
    fullSentenceEn: '"Sheila\'s Kitchen" is a radio program.',
  },
  {
    id: 'blank-2',
    prefix: 'A dessert is something you eat',
    suffix: '.',
    prefixEs: 'Un postre es algo que comes',
    suffixEs: '.',
    options: ['at the end of a meal', 'at the beginning of a meal', 'for breakfast'],
    correctAnswer: 'at the end of a meal',
    translationEs: 'Un postre es algo que comes al final de una comida.',
    fullSentenceEn: 'A dessert is something you eat at the end of a meal.',
  },
  {
    id: 'blank-3',
    prefix: 'Listeners',
    suffix: 'the program.',
    prefixEs: 'Los oyentes',
    suffixEs: 'el programa.',
    options: ['hear', 'watch', 'cook', 'read'],
    correctAnswer: 'hear',
    translationEs: 'Los oyentes escuchan el programa.',
    fullSentenceEn: 'Listeners hear the program.',
  },
  {
    id: 'blank-4',
    prefix: 'People who come to your house for lunch or dinner are called',
    suffix: '.',
    prefixEs: 'Las personas que vienen a tu casa a almorzar o cenar se llaman',
    suffixEs: '.',
    options: ['guests', 'cooks', 'listeners', 'sellers'],
    correctAnswer: 'guests',
    translationEs: 'Las personas que vienen a tu casa a almorzar o cenar se llaman invitados.',
    fullSentenceEn: 'People who come to your house for lunch or dinner are called guests.',
  },
  {
    id: 'blank-5',
    prefix: 'Durelle plates and dishes can be used in',
    suffix: 'ways.',
    prefixEs: 'Los platos y vajillas Durelle se pueden usar de',
    suffixEs: 'maneras.',
    options: ['many', 'two', 'one', 'no'],
    correctAnswer: 'many',
    translationEs: 'Los platos y vajillas Durelle se pueden usar de muchas maneras.',
    fullSentenceEn: 'Durelle plates and dishes can be used in many ways.',
  },
];

export const FoodDropdownExercise: React.FC<FoodDropdownExerciseProps> = ({
  exercise,
  accent = 'US',
  speechRate = 1.0,
  onSuccess,
}) => {
  const { isDark } = useTheme();

  // Reversible instruction card state
  const [isInstructionFlipped, setIsInstructionFlipped] = useState(false);

  // Selected values for each blank
  const [selectedValues, setSelectedValues] = useState<Record<string, string>>({});
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  // Reversible sentence cards
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  // Check state
  const [hasChecked, setHasChecked] = useState(false);
  const [isAllCorrect, setIsAllCorrect] = useState(false);

  const handleToggleCardFlip = (qid: string) => {
    playFeedbackSound('click');
    setFlippedCards((prev) => ({
      ...prev,
      [qid]: !prev[qid],
    }));
  };

  const handleSelectOption = (qid: string, val: string) => {
    playFeedbackSound('click');
    setSelectedValues((prev) => ({
      ...prev,
      [qid]: val,
    }));
    setOpenDropdownId(null);
    setHasChecked(false);
  };

  const handleCheck = () => {
    playFeedbackSound('click');
    setHasChecked(true);

    let allOk = true;
    for (const q of QUESTIONS) {
      if (selectedValues[q.id] !== q.correctAnswer) {
        allOk = false;
        break;
      }
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
        id="dropdown-instruction-card"
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
                ? 'Selecciona la respuesta correcta de la lista desplegable.'
                : 'Select the correct answer from the drop-down list.'}
            </p>
          </div>

          <CardSpeechControl
            textToSpeak="Select the correct answer from the drop-down list."
            accent={accent}
            initialSpeed={speechRate}
            gender="female"
            size="md"
          />
        </div>
      </div>

      {/* 2. MAIN 2-COLUMN SECTION: PLAYER (LEFT) + 5 DROPDOWN SENTENCES (RIGHT) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        {/* Left Column: Media Player (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <AudioPlayerCard
            audioText={exercise.audioPrompt || ''}
            sentences={exercise.sentences || []}
            accent={accent}
            initialPlaybackRate={speechRate}
            totalDurationSeconds={65}
            imageSrc={sheilaKitchenImg}
            altText="Sheila in the kitchen"
            speakerGender="female"
          />
        </div>

        {/* Right Column: 5 Dropdown Sentences (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {QUESTIONS.map((q, idx) => {
            const isFlipped = !!flippedCards[q.id];
            const currentSelected = selectedValues[q.id];
            const isCorrect = hasChecked && currentSelected === q.correctAnswer;
            const isIncorrect = hasChecked && currentSelected && currentSelected !== q.correctAnswer;
            const isDropdownOpen = openDropdownId === q.id;

            return (
              <div
                key={q.id}
                id={`dropdown-sentence-card-${idx + 1}`}
                onClick={() => handleToggleCardFlip(q.id)}
                className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer shadow-xs relative flex flex-col gap-3 ${
                  isFlipped
                    ? isDark
                      ? 'bg-slate-900 border-emerald-500/60'
                      : 'bg-white border-emerald-400'
                    : isDark
                    ? 'bg-slate-900 border-slate-800 hover:border-slate-700'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                {/* Header with sentence number and speaker control */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-emerald-500/10 text-emerald-500 font-mono font-bold text-xs flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
                      {isFlipped ? 'Español' : 'Sentence'}
                    </span>
                  </div>

                  {/* Speaker Control with Speeds (0.5x to 1.30x) */}
                  <CardSpeechControl
                    textToSpeak={q.fullSentenceEn}
                    accent={accent}
                    initialSpeed={speechRate}
                    gender="female"
                    size="sm"
                  />
                </div>

                {/* Card Content: Front = Sentence with Dropdown, Back = Translation */}
                {isFlipped ? (
                  <div className="py-2 text-sm sm:text-base font-medium leading-relaxed">
                    <p className={isDark ? 'text-slate-100' : 'text-slate-800'}>
                      {q.translationEs}
                    </p>
                  </div>
                ) : (
                  <div
                    className="flex flex-wrap items-center gap-2 text-sm sm:text-base font-medium leading-relaxed"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span className={isDark ? 'text-slate-200' : 'text-slate-800'}>
                      {q.prefix}
                    </span>

                    {/* Inline Dropdown Trigger */}
                    <div className="relative inline-block align-middle">
                      <button
                        type="button"
                        id={`dropdown-select-btn-${idx + 1}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenDropdownId((prev) => (prev === q.id ? null : q.id));
                        }}
                        className={`inline-flex items-center justify-between gap-2 px-3 py-1.5 rounded-xl border font-sans text-sm font-semibold transition-all cursor-pointer min-w-[130px] ${
                          isDropdownOpen
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
                        <span className="truncate">{currentSelected || 'Seleccionar...'}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-emerald-500 shrink-0 transition-transform ${
                            isDropdownOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      {/* Dropdown Menu Popup */}
                      {isDropdownOpen && (
                        <div
                          onClick={(e) => e.stopPropagation()}
                          className={`absolute z-40 top-full left-0 mt-1 min-w-[170px] rounded-xl border shadow-xl py-1 overflow-hidden animate-in fade-in duration-150 ${
                            isDark
                              ? 'bg-slate-900 border-emerald-500/50 text-white'
                              : 'bg-white border-emerald-400 text-slate-800'
                          }`}
                        >
                          {q.options.map((opt) => (
                            <button
                              key={opt}
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSelectOption(q.id, opt);
                              }}
                              className={`w-full text-left px-3.5 py-2 text-xs sm:text-sm font-medium transition-colors cursor-pointer flex items-center justify-between ${
                                currentSelected === opt
                                  ? 'bg-emerald-600 text-white font-bold'
                                  : isDark
                                  ? 'hover:bg-slate-800 text-slate-200'
                                  : 'hover:bg-emerald-50 text-slate-800'
                              }`}
                            >
                              <span>{opt}</span>
                              {currentSelected === opt && <Check className="w-3.5 h-3.5" />}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    <span className={isDark ? 'text-slate-200' : 'text-slate-800'}>
                      {q.suffix}
                    </span>

                    {/* Result icon */}
                    {hasChecked && (
                      <span className="inline-flex items-center ml-1">
                        {isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                        {isIncorrect && <XCircle className="w-4 h-4 text-rose-500" />}
                      </span>
                    )}
                  </div>
                )}
              </div>
            );
          })}

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
