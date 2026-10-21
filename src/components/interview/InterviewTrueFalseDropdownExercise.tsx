import React, { useState } from 'react';
import { ChevronDown, Check, RotateCcw, CheckCircle2, XCircle, RotateCw, Volume2 } from 'lucide-react';
import { speakEnglish, stopSpeaking, playFeedbackSound } from '../../utils/audio';
import { useTheme } from '../../context/ThemeContext';
import { AudioPlayerCard } from '../AudioPlayerCard';
import { CardSpeechControl } from '../CardSpeechControl';
import larrySandraImg from '../../assets/images/larry_sandra_interview.jpg';
import { LessonSentence } from '../../types';

interface TrueFalseItem {
  id: string;
  statement: string;
  statementEs: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  explanationEs: string;
}

interface InterviewTrueFalseDropdownExerciseProps {
  exercise: {
    instructions: string;
    instructionsEs: string;
    imageUrl?: string;
    audioText: string;
    sentences: LessonSentence[];
    items: TrueFalseItem[];
  };
  accent?: 'US' | 'UK';
  speechRate?: number;
  onSuccess?: () => void;
}

const OPTION_TRANSLATIONS: Record<string, string> = {
  True: 'Verdadero',
  False: 'Falso',
  "We don't know.": 'No lo sabemos',
  "We don't know": 'No lo sabemos',
};

export const InterviewTrueFalseDropdownExercise: React.FC<InterviewTrueFalseDropdownExerciseProps> = ({
  exercise,
  accent = 'US',
  speechRate = 1.0,
  onSuccess,
}) => {
  const { isDark } = useTheme();

  // Reversible instruction card state
  const [isInstructionFlipped, setIsInstructionFlipped] = useState(false);

  // Selected values for each statement: itemId -> selectedValue
  const [selectedValues, setSelectedValues] = useState<Record<string, string>>({});
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  // Translation flip state for each statement
  const [flippedStatements, setFlippedStatements] = useState<Record<string, boolean>>({});

  // Check state
  const [hasChecked, setHasChecked] = useState(false);
  const [isAllCorrect, setIsAllCorrect] = useState(false);

  // Transcript visibility in audio card
  const [isTranscriptVisible, setIsTranscriptVisible] = useState(false);
  const [currentSentenceIdx, setCurrentSentenceIdx] = useState<number | null>(null);

  const items = exercise.items || [];

  const handleSelectOption = (itemId: string, optionValue: string) => {
    playFeedbackSound('click');
    setSelectedValues((prev) => ({
      ...prev,
      [itemId]: optionValue,
    }));
    setOpenDropdownId(null);
    setHasChecked(false);
  };

  const handleToggleStatementFlip = (itemId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    playFeedbackSound('click');
    setFlippedStatements((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const handlePlayAudio = (text: string, e: React.MouseEvent) => {
    e.stopPropagation();
    stopSpeaking();
    playFeedbackSound('click');
    speakEnglish(text, speechRate, accent);
  };

  const handleCheck = () => {
    playFeedbackSound('click');
    setHasChecked(true);

    let allOk = true;
    for (const it of items) {
      if (selectedValues[it.id] !== it.correctAnswer) {
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
    setOpenDropdownId(null);
    setHasChecked(false);
    setIsAllCorrect(false);
  };

  return (
    <div className="w-full flex flex-col gap-6 select-none animate-in fade-in duration-200">
      {/* 1. REVERSIBLE INSTRUCTION CARD */}
      <div
        id="interview-act-6-instructions"
        onClick={() => {
          playFeedbackSound('click');
          setIsInstructionFlipped((prev) => !prev);
        }}
        className={`w-full p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer shadow-sm relative ${
          isDark
            ? 'bg-slate-900 border-slate-700 hover:border-sky-500/50 text-slate-100'
            : 'bg-white border-slate-200 hover:border-sky-400 text-slate-800'
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            <span className="text-[11px] font-mono uppercase font-bold tracking-wider text-sky-500 block mb-1">
              {isInstructionFlipped ? 'Instrucción (Español) · Clic para alternar' : 'Instructions (English) · Click to translate'}
            </span>
            <p className="text-base sm:text-lg font-medium leading-snug">
              {isInstructionFlipped
                ? exercise.instructionsEs || 'Elige la mejor respuesta para las preguntas a continuación.'
                : exercise.instructions || 'Choose the best answer to the questions below.'}
            </p>
          </div>

          <CardSpeechControl
            textToSpeak={exercise.instructions || 'Choose the best answer to the questions below.'}
            accent={accent}
            initialSpeed={speechRate}
            gender="female"
            size="md"
          />
        </div>
      </div>

      {/* 2. TWO-COLUMN: AUDIO PLAYER + STATEMENTS WITH DROPDOWNS */}
      <div className="w-full flex flex-col lg:flex-row gap-6 items-start">
        {/* Left: Audio Player Card */}
        <div className="w-full max-w-[340px] mx-auto lg:mx-0 shrink-0 flex flex-col">
          <AudioPlayerCard
            audioText={exercise.audioText}
            sentences={exercise.sentences}
            accent={accent}
            initialPlaybackRate={speechRate}
            currentSentenceIdx={currentSentenceIdx}
            onSentenceChange={(idx) => setCurrentSentenceIdx(idx)}
            onToggleTranscript={() => setIsTranscriptVisible((prev) => !prev)}
            isTranscriptVisible={isTranscriptVisible}
            totalDurationSeconds={70}
            imageSrc={exercise.imageUrl || larrySandraImg}
            altText="Sandra Waters interviews inventor Larry Patel"
            speakerGender="female"
          />
        </div>

        {/* Right: Statements List */}
        <div className="w-full flex-1 flex flex-col gap-3.5">
          {items.map((item, idx) => {
            const selectedVal = selectedValues[item.id];
            const isFlipped = !!flippedStatements[item.id];
            const isItemCorrect = hasChecked && selectedVal === item.correctAnswer;
            const isItemWrong = hasChecked && selectedVal && selectedVal !== item.correctAnswer;
            const isOpen = openDropdownId === item.id;

            return (
              <div
                key={item.id}
                className={`p-4 sm:p-5 rounded-2xl border transition-all shadow-sm ${
                  isItemCorrect
                    ? isDark
                      ? 'bg-emerald-950/20 border-emerald-500/40'
                      : 'bg-emerald-50/60 border-emerald-300'
                    : isItemWrong
                    ? isDark
                      ? 'bg-rose-950/20 border-rose-500/40'
                      : 'bg-rose-50/60 border-rose-300'
                    : isDark
                    ? 'bg-slate-900 border-slate-800'
                    : 'bg-white border-slate-200'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  {/* Statement with audio and flip */}
                  <div className="flex items-start gap-2.5 flex-1 min-w-0">
                    <button
                      type="button"
                      onClick={(e) => handlePlayAudio(item.statement, e)}
                      className="p-1 rounded text-slate-400 hover:text-sky-500 shrink-0 mt-0.5"
                      title="Listen"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>

                    <div
                      onClick={(e) => handleToggleStatementFlip(item.id, e)}
                      className="cursor-pointer group flex-1 min-w-0"
                      title="Clic para traducir"
                    >
                      <p className="text-sm sm:text-base font-medium text-slate-900 dark:text-slate-100 leading-snug group-hover:text-sky-600 dark:group-hover:text-sky-400">
                        {isFlipped ? item.statementEs : item.statement}
                      </p>
                      <span className="text-[10px] text-slate-400 group-hover:underline">
                        {isFlipped ? 'inglés' : 'traducir'}
                      </span>
                    </div>
                  </div>

                  {/* Dropdown Menu for True / False / We don't know */}
                  <div className="relative shrink-0 self-end sm:self-center">
                    <button
                      type="button"
                      onClick={() => setOpenDropdownId((prev) => (prev === item.id ? null : item.id))}
                      className={`min-w-[145px] px-3.5 py-2 rounded-xl border font-semibold text-xs sm:text-sm transition-all flex items-center justify-between gap-2 shadow-xs cursor-pointer ${
                        selectedVal
                          ? isItemCorrect
                            ? 'bg-emerald-500 text-white border-emerald-600'
                            : isItemWrong
                            ? 'bg-rose-500 text-white border-rose-600'
                            : 'bg-sky-600 text-white border-sky-500'
                          : isDark
                          ? 'bg-slate-800 text-slate-300 border-slate-700 hover:border-sky-500'
                          : 'bg-slate-100 text-slate-700 border-slate-300 hover:border-sky-400'
                      }`}
                    >
                      <span>{selectedVal || 'Seleccionar...'}</span>
                      <ChevronDown className="w-4 h-4 shrink-0 opacity-70" />
                    </button>

                    {/* Dropdown Options */}
                    {isOpen && (
                      <div
                        className={`absolute right-0 z-30 mt-1.5 min-w-[170px] rounded-xl border shadow-xl overflow-hidden py-1 ${
                          isDark
                            ? 'bg-slate-800 border-slate-700 text-white'
                            : 'bg-white border-slate-200 text-slate-900'
                        }`}
                      >
                        {item.options.map((opt) => (
                          <div
                            key={opt}
                            onClick={() => handleSelectOption(item.id, opt)}
                            className={`px-3.5 py-2 text-xs sm:text-sm cursor-pointer transition-colors flex items-center justify-between ${
                              selectedVal === opt
                                ? 'bg-sky-600/20 text-sky-500 font-bold'
                                : isDark
                                ? 'hover:bg-slate-700'
                                : 'hover:bg-sky-50'
                            }`}
                          >
                            <span>{opt}</span>
                            <span className="text-[10px] text-slate-400 italic">
                              {OPTION_TRANSLATIONS[opt] || ''}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Explanation on check */}
                {hasChecked && (
                  <div
                    className={`mt-3 pt-2.5 border-t border-inherit/40 text-xs flex items-start gap-2 ${
                      isItemCorrect
                        ? 'text-emerald-700 dark:text-emerald-300'
                        : 'text-rose-700 dark:text-rose-300'
                    }`}
                  >
                    {isItemCorrect ? (
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5 text-emerald-500" />
                    ) : (
                      <XCircle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-rose-500" />
                    )}
                    <span>{item.explanationEs}</span>
                  </div>
                )}
              </div>
            );
          })}

          {/* Action buttons */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={handleClear}
              className={`px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                isDark
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 shadow-xs'
              }`}
            >
              <RotateCcw className="w-4 h-4" />
              <span>Limpiar</span>
            </button>

            <button
              onClick={handleCheck}
              disabled={Object.keys(selectedValues).length === 0}
              className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 cursor-pointer shadow-md ${
                Object.keys(selectedValues).length === 0
                  ? 'opacity-40 cursor-not-allowed bg-slate-300 text-slate-500 dark:bg-slate-800 dark:text-slate-600'
                  : 'bg-sky-600 hover:bg-sky-500 text-white shadow-sky-600/30'
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
