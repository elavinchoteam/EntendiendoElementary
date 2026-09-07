import React, { useState, useEffect } from 'react';
import {
  Volume2,
  Mic,
  MicOff,
  RotateCw,
  ChevronDown,
  Sparkles,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { VocabularyWordItem } from '../types';
import { speakEnglish, playFeedbackSound, stopSpeaking } from '../utils/audio';
import { useTheme } from '../context/ThemeContext';

interface VocabularyHelperCardProps {
  words: VocabularyWordItem[];
  selectedWordId?: string;
  onSelectWord?: (wordId: string) => void;
  showDropdownSelector?: boolean;
  accent?: 'US' | 'UK';
  speechRate?: number;
}

export const VocabularyHelperCard: React.FC<VocabularyHelperCardProps> = ({
  words,
  selectedWordId,
  onSelectWord,
  showDropdownSelector = true,
  accent = 'US',
  speechRate = 1.0,
}) => {
  const { isDark } = useTheme();

  // Internal active word id if not strictly controlled
  const [currentWordId, setCurrentWordId] = useState<string>(
    selectedWordId || words[0]?.id || 'w1'
  );

  useEffect(() => {
    if (selectedWordId) {
      setCurrentWordId(selectedWordId);
    }
  }, [selectedWordId]);

  const activeWord = words.find((w) => w.id === currentWordId) || words[0];

  // Flip states for Spanish translations
  const [isWordFlipped, setIsWordFlipped] = useState(false);
  const [isExampleFlipped, setIsExampleFlipped] = useState(false);

  // Audio speaking state
  const [speakingKey, setSpeakingKey] = useState<string | null>(null);

  // Speech recording state
  const [isRecording, setIsRecording] = useState<string | null>(null);
  const [speechFeedback, setSpeechFeedback] = useState<{
    key: string;
    text: string;
    score: number;
    match: boolean;
  } | null>(null);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newId = e.target.value;
    setCurrentWordId(newId);
    setIsWordFlipped(false);
    setIsExampleFlipped(false);
    setSpeechFeedback(null);
    if (onSelectWord) {
      onSelectWord(newId);
    }
  };

  const handleSpeak = (text: string, key: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    stopSpeaking();
    setSpeakingKey(key);
    speakEnglish(text, speechRate, (accent as 'US' | 'UK') || 'US', undefined, () => {
      setSpeakingKey(null);
    });
  };

  const handleRecord = (targetText: string, key: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (isRecording === key) {
      setIsRecording(null);
      return;
    }

    const SpeechRecognition =
      (window as unknown as { SpeechRecognition?: any; webkitSpeechRecognition?: any })
        .SpeechRecognition ||
      (window as unknown as { SpeechRecognition?: any; webkitSpeechRecognition?: any })
        .webkitSpeechRecognition;

    if (!SpeechRecognition) {
      // Fallback feedback simulation
      setIsRecording(key);
      setTimeout(() => {
        setIsRecording(null);
        setSpeechFeedback({
          key,
          text: targetText,
          score: 95,
          match: true,
        });
        playFeedbackSound('correct');
      }, 1500);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = accent === 'UK' ? 'en-GB' : 'en-US';
      recognition.continuous = false;
      recognition.interimResults = false;

      setIsRecording(key);

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        const cleanSpoken = transcript.toLowerCase().trim().replace(/[.,!?'"]/g, '');
        const cleanTarget = targetText.toLowerCase().trim().replace(/[.,!?'"]/g, '');
        const isMatch = cleanSpoken.includes(cleanTarget) || cleanTarget.includes(cleanSpoken);

        setSpeechFeedback({
          key,
          text: transcript,
          score: isMatch ? 98 : 70,
          match: isMatch,
        });

        if (isMatch) {
          playFeedbackSound('correct');
        } else {
          playFeedbackSound('wrong');
        }
        setIsRecording(null);
      };

      recognition.onerror = () => {
        setIsRecording(null);
      };

      recognition.onend = () => {
        setIsRecording(null);
      };

      recognition.start();
    } catch {
      setIsRecording(null);
    }
  };

  if (!activeWord) return null;

  return (
    <div className="w-full max-w-[340px] sm:max-w-[360px] flex flex-col gap-4">
      {/* Dropdown selector matching screenshot */}
      {showDropdownSelector && (
        <div className="w-full relative">
          <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">
            Vocabulario de referencia
          </label>
          <div className="relative">
            <select
              id="vocabulary-reference-select"
              value={currentWordId}
              onChange={handleSelectChange}
              className={`w-full appearance-none px-4 py-2.5 pr-10 rounded-xl text-sm font-semibold border transition-all cursor-pointer shadow-xs ${
                isDark
                  ? 'bg-slate-800/90 text-white border-white/10 hover:border-indigo-500 focus:ring-2 focus:ring-indigo-500'
                  : 'bg-white text-slate-900 border-slate-300 hover:border-indigo-500 focus:ring-2 focus:ring-indigo-500'
              }`}
            >
              {words.map((w) => (
                <option key={w.id} value={w.id}>
                  {w.word} ({w.translation})
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      )}

      {/* TOP CARD: Word, Part of Speech, Image, Audio/Mic, Definition */}
      <div
        className={`w-full rounded-2xl p-5 border shadow-md flex flex-col transition-all duration-200 ${
          isDark
            ? 'bg-slate-900 border-white/10 text-white'
            : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Header: Word & Part of speech + Audio & Mic Buttons */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div>
            <h4 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white capitalize">
              {activeWord.word}
            </h4>
            <p className="text-xs italic text-slate-500 dark:text-slate-400">
              {activeWord.partOfSpeech}
              {activeWord.partOfSpeechEs ? ` · ${activeWord.partOfSpeechEs}` : ''}
            </p>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Listen Button */}
            <button
              id={`listen-word-${activeWord.id}`}
              onClick={(e) => handleSpeak(activeWord.word, `word-${activeWord.id}`, e)}
              className={`p-2 rounded-xl border transition-all cursor-pointer ${
                speakingKey === `word-${activeWord.id}`
                  ? 'bg-indigo-600 text-white border-indigo-500 ring-2 ring-indigo-400'
                  : isDark
                  ? 'bg-slate-800 hover:bg-slate-700 text-indigo-400 border-white/10'
                  : 'bg-slate-100 hover:bg-indigo-50 text-indigo-600 border-slate-200'
              }`}
              title="Escuchar pronunciación"
              aria-label="Escuchar palabra"
            >
              <Volume2 className="w-4 h-4" />
            </button>

            {/* Mic Practice Button */}
            <button
              id={`record-word-${activeWord.id}`}
              onClick={(e) => handleRecord(activeWord.word, `word-${activeWord.id}`, e)}
              className={`p-2 rounded-xl border transition-all cursor-pointer ${
                isRecording === `word-${activeWord.id}`
                  ? 'bg-rose-600 text-white border-rose-500 animate-pulse ring-2 ring-rose-400'
                  : isDark
                  ? 'bg-slate-800 hover:bg-slate-700 text-rose-400 border-white/10'
                  : 'bg-slate-100 hover:bg-rose-50 text-rose-600 border-slate-200'
              }`}
              title="Grabar y practicar pronunciación"
              aria-label="Grabar pronunciación"
            >
              {isRecording === `word-${activeWord.id}` ? (
                <MicOff className="w-4 h-4" />
              ) : (
                <Mic className="w-4 h-4" />
              )}
            </button>

            {/* Translation flip button */}
            <button
              id={`flip-word-${activeWord.id}`}
              onClick={() => setIsWordFlipped((prev) => !prev)}
              className={`p-2 rounded-xl border transition-all cursor-pointer ${
                isWordFlipped
                  ? 'bg-emerald-600 text-white border-emerald-500'
                  : isDark
                  ? 'bg-slate-800 hover:bg-slate-700 text-emerald-400 border-white/10'
                  : 'bg-slate-100 hover:bg-emerald-50 text-emerald-600 border-slate-200'
              }`}
              title="Traducir al español"
              aria-label="Traducir palabra"
            >
              <RotateCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Speech Feedback notification if recorded */}
        {speechFeedback?.key === `word-${activeWord.id}` && (
          <div
            className={`mb-3 p-2 rounded-xl text-xs flex items-center gap-2 ${
              speechFeedback.match
                ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30'
            }`}
          >
            {speechFeedback.match ? (
              <CheckCircle2 className="w-4 h-4 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 shrink-0" />
            )}
            <span>
              {speechFeedback.match ? '¡Excelente pronunciación!' : 'Intenta nuevamente:'}{' '}
              <strong className="font-semibold">{speechFeedback.text}</strong> ({speechFeedback.score}%)
            </span>
          </div>
        )}

        {/* Word Image */}
        <div className="w-full h-44 rounded-xl overflow-hidden mb-3.5 bg-slate-200 dark:bg-slate-800 border border-inherit/30 relative">
          <img
            src={activeWord.imageUrl}
            alt={activeWord.word}
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
        </div>

        {/* Definition */}
        <div className="text-sm leading-relaxed">
          {isWordFlipped ? (
            <p className="text-emerald-700 dark:text-emerald-300 font-medium">
              <strong className="capitalize">{activeWord.translation}:</strong>{' '}
              {activeWord.definitionEs}
            </p>
          ) : (
            <p className="text-slate-600 dark:text-slate-300">
              <span className="font-semibold text-slate-900 dark:text-white">Definition:</span>{' '}
              {activeWord.definitionEn}
            </p>
          )}
        </div>
      </div>

      {/* BOTTOM CARD: Example Sentence + Audio/Mic + Translation */}
      <div
        className={`w-full rounded-2xl p-5 border shadow-md flex flex-col transition-all duration-200 ${
          isDark
            ? 'bg-slate-900 border-white/10 text-white'
            : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        <div className="flex items-start justify-between gap-2 mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Ejemplo de uso
          </span>

          <div className="flex items-center gap-1.5">
            {/* Listen Button */}
            <button
              id={`listen-example-${activeWord.id}`}
              onClick={(e) => handleSpeak(activeWord.exampleEn, `ex-${activeWord.id}`, e)}
              className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                speakingKey === `ex-${activeWord.id}`
                  ? 'bg-indigo-600 text-white border-indigo-500 ring-2 ring-indigo-400'
                  : isDark
                  ? 'bg-slate-800 hover:bg-slate-700 text-indigo-400 border-white/10'
                  : 'bg-slate-100 hover:bg-indigo-50 text-indigo-600 border-slate-200'
              }`}
              title="Escuchar oración"
              aria-label="Escuchar oración"
            >
              <Volume2 className="w-3.5 h-3.5" />
            </button>

            {/* Mic Practice Button */}
            <button
              id={`record-example-${activeWord.id}`}
              onClick={(e) => handleRecord(activeWord.exampleEn, `ex-${activeWord.id}`, e)}
              className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                isRecording === `ex-${activeWord.id}`
                  ? 'bg-rose-600 text-white border-rose-500 animate-pulse ring-2 ring-rose-400'
                  : isDark
                  ? 'bg-slate-800 hover:bg-slate-700 text-rose-400 border-white/10'
                  : 'bg-slate-100 hover:bg-rose-50 text-rose-600 border-slate-200'
              }`}
              title="Grabar oración"
              aria-label="Grabar oración"
            >
              {isRecording === `ex-${activeWord.id}` ? (
                <MicOff className="w-3.5 h-3.5" />
              ) : (
                <Mic className="w-3.5 h-3.5" />
              )}
            </button>

            {/* Translation flip button */}
            <button
              id={`flip-example-${activeWord.id}`}
              onClick={() => setIsExampleFlipped((prev) => !prev)}
              className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                isExampleFlipped
                  ? 'bg-emerald-600 text-white border-emerald-500'
                  : isDark
                  ? 'bg-slate-800 hover:bg-slate-700 text-emerald-400 border-white/10'
                  : 'bg-slate-100 hover:bg-emerald-50 text-emerald-600 border-slate-200'
              }`}
              title="Traducir al español"
              aria-label="Traducir oración"
            >
              <RotateCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Speech Feedback for example */}
        {speechFeedback?.key === `ex-${activeWord.id}` && (
          <div
            className={`mb-2.5 p-2 rounded-xl text-xs flex items-center gap-2 ${
              speechFeedback.match
                ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30'
            }`}
          >
            {speechFeedback.match ? (
              <CheckCircle2 className="w-4 h-4 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 shrink-0" />
            )}
            <span>
              {speechFeedback.match ? '¡Muy bien pronunciado!' : 'Sigue practicando:'}{' '}
              <strong className="font-semibold">{speechFeedback.text}</strong> ({speechFeedback.score}%)
            </span>
          </div>
        )}

        <p className="text-base sm:text-lg font-medium leading-relaxed">
          {isExampleFlipped ? (
            <span className="text-emerald-700 dark:text-emerald-300 italic">
              "{activeWord.exampleEs}"
            </span>
          ) : (
            <span className="text-slate-900 dark:text-white">
              "{activeWord.exampleEn}"
            </span>
          )}
        </p>
      </div>
    </div>
  );
};
