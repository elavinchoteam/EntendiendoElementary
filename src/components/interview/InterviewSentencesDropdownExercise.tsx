import React, { useState } from 'react';
import { ChevronDown, Check, RotateCcw, CheckCircle2, XCircle, RotateCw, Volume2 } from 'lucide-react';
import { speakEnglish, stopSpeaking, playFeedbackSound } from '../../utils/audio';
import { useTheme } from '../../context/ThemeContext';
import { AudioPlayerCard } from '../AudioPlayerCard';
import { CardSpeechControl } from '../CardSpeechControl';
import larrySandraImg from '../../assets/images/larry_sandra_interview.jpg';
import { LessonSentence } from '../../types';

interface DropdownItem {
  id: string;
  prefix: string;
  prefixEs: string;
  suffix: string;
  suffixEs: string;
  options: string[];
  optionsEs: string[];
  correctAnswer: string;
  translationEs: string;
}

interface InterviewSentencesDropdownExerciseProps {
  exercise: {
    instructions: string;
    instructionsEs: string;
    imageUrl?: string;
    audioText: string;
    sentences: LessonSentence[];
    items: DropdownItem[];
  };
  accent?: 'US' | 'UK';
  speechRate?: number;
  onSuccess?: () => void;
}

export const InterviewSentencesDropdownExercise: React.FC<InterviewSentencesDropdownExerciseProps> = ({
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

  // Translation flip state for each sentence
  const [flippedSentences, setFlippedSentences] = useState<Record<string, boolean>>({});

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

  const handleToggleSentenceFlip = (itemId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    playFeedbackSound('click');
    setFlippedSentences((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const handlePlaySentence = (item: DropdownItem, e: React.MouseEvent) => {
    e.stopPropagation();
    stopSpeaking();
    playFeedbackSound('click');
    const chosen = selectedValues[item.id] || item.correctAnswer;
    const fullText = [item.prefix, chosen, item.suffix].filter(Boolean).join(' ');
    speakEnglish(fullText, speechRate, accent);
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
        id="interview-act-5-instructions"
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
                ? exercise.instructionsEs || 'Elige las mejores respuestas para las oraciones.'
                : exercise.instructions || 'Choose the best answers for the sentences.'}
            </p>
          </div>

          <CardSpeechControl
            textToSpeak={exercise.instructions || 'Choose the best answers for the sentences.'}
            accent={accent}
            initialSpeed={speechRate}
            gender="female"
            size="md"
          />
        </div>
      </div>

      {/* 2. TWO-COLUMN: AUDIO PLAYER + SENTENCES WITH DROPDOWNS */}
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

        {/* Right: Sentences List */}
        <div className="w-full flex-1 flex flex-col gap-4">
          {items.map((item, idx) => {
            const selectedVal = selectedValues[item.id];
            const isSentenceFlipped = !!flippedSentences[item.id];
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
                {/* Sentence Header with Audio & Flip */}
                <div className="flex items-center justify-between gap-3 mb-2 pb-2 border-b border-inherit/30 text-xs text-slate-400">
                  <span className="font-mono font-bold text-sky-600 dark:text-sky-400">
                    Sentence {idx + 1}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => handlePlaySentence(item, e)}
                      className="p-1 rounded text-slate-400 hover:text-sky-500 transition-colors"
                      title="Listen sentence"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => handleToggleSentenceFlip(item.id, e)}
                      className="flex items-center gap-1 text-[11px] hover:text-sky-500 transition-colors cursor-pointer"
                    >
                      <RotateCw className="w-3 h-3" />
                      <span>{isSentenceFlipped ? 'Inglés' : 'Traducir'}</span>
                    </button>
                  </div>
                </div>

                {/* Sentence with Dropdown Inline */}
                {isSentenceFlipped ? (
                  <p className="text-base sm:text-lg font-serif italic text-slate-800 dark:text-slate-200 leading-relaxed">
                    {item.translationEs}
                  </p>
                ) : (
                  <div className="text-base sm:text-lg leading-loose text-slate-800 dark:text-slate-100 flex flex-wrap items-center gap-2">
                    {item.prefix && <span>{item.prefix}</span>}

                    {/* Dropdown Container */}
                    <div className="relative inline-block">
                      <button
                        type="button"
                        onClick={() => setOpenDropdownId((prev) => (prev === item.id ? null : item.id))}
                        className={`min-w-[140px] px-3.5 py-1.5 rounded-xl border font-semibold text-sm transition-all flex items-center justify-between gap-2 shadow-xs cursor-pointer ${
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

                      {/* Dropdown Menu */}
                      {isOpen && (
                        <div
                          className={`absolute z-30 mt-1.5 min-w-[180px] rounded-xl border shadow-xl overflow-hidden py-1 ${
                            isDark
                              ? 'bg-slate-800 border-slate-700 text-white'
                              : 'bg-white border-slate-200 text-slate-900'
                          }`}
                        >
                          {item.options.map((opt, optIdx) => (
                            <div
                              key={opt}
                              onClick={() => handleSelectOption(item.id, opt)}
                              className={`px-3.5 py-2 text-sm cursor-pointer transition-colors flex items-center justify-between ${
                                selectedVal === opt
                                  ? 'bg-sky-600/20 text-sky-500 font-bold'
                                  : isDark
                                  ? 'hover:bg-slate-700'
                                  : 'hover:bg-sky-50'
                              }`}
                            >
                              <span>{opt}</span>
                              <span className="text-[11px] text-slate-400 italic font-serif">
                                {item.optionsEs[optIdx]}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {item.suffix && <span>{item.suffix}</span>}
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
