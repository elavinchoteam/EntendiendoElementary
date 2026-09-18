import React, { useState } from 'react';
import {
  Volume2,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ChevronRight,
} from 'lucide-react';
import {
  ACTIVITY_8_CHARACTERS,
  CharacterMatchItem,
  RestaurantActivityData,
} from '../../data/inTheRestaurantData';
import { useTheme } from '../../context/ThemeContext';
import { speakEnglish, stopSpeaking, playFeedbackSound } from '../../utils/audio';

export interface Activity8CharacterMatchProps {
  activity: RestaurantActivityData;
  accent?: 'US' | 'UK';
  speechRate?: number;
  onNext?: () => void;
}

export const Activity8CharacterMatch: React.FC<Activity8CharacterMatchProps> = ({
  activity,
  accent = 'US',
  speechRate = 1.0,
  onNext,
}) => {
  const { isDark } = useTheme();

  // assignments: key = charId (e.g. 'char-waiter'), value = assignedCharId (e.g. 'char-waiter')
  const [assignments, setAssignments] = useState<Record<string, string | null>>({});
  const [selectedCharId, setSelectedCharId] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isInstructionFlipped, setIsInstructionFlipped] = useState(false);
  const [flippedCharIds, setFlippedCharIds] = useState<string[]>([]);
  const [playingKey, setPlayingKey] = useState<string | null>(null);

  const handlePlayText = (text: string, key: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (playingKey === key && window.speechSynthesis?.speaking) {
      stopSpeaking();
      setPlayingKey(null);
      return;
    }
    stopSpeaking();
    setPlayingKey(key);
    speakEnglish(
      text,
      speechRate,
      accent === 'UK' ? 'UK' : 'US',
      () => setPlayingKey(key),
      () => setPlayingKey(null)
    );
  };

  const toggleFlip = (charId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    playFeedbackSound('flip');
    setFlippedCharIds((prev) =>
      prev.includes(charId) ? prev.filter((id) => id !== charId) : [...prev, charId]
    );
  };

  const handleSelectPoolName = (charId: string) => {
    if (isSubmitted) return;
    playFeedbackSound('click');
    setSelectedCharId(selectedCharId === charId ? null : charId);
  };

  const handleAssignToImage = (targetCharId: string) => {
    if (isSubmitted || !selectedCharId) return;
    playFeedbackSound('click');
    setAssignments((prev) => ({
      ...prev,
      [targetCharId]: selectedCharId,
    }));
    setSelectedCharId(null);
  };

  const handleRemoveAssignment = (targetCharId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSubmitted) return;
    playFeedbackSound('click');
    setAssignments((prev) => ({
      ...prev,
      [targetCharId]: null,
    }));
  };

  const handleDragStart = (e: React.DragEvent, charId: string) => {
    if (isSubmitted) return;
    e.dataTransfer.setData('text/plain', charId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetCharId: string) => {
    e.preventDefault();
    if (isSubmitted) return;
    const charId = e.dataTransfer.getData('text/plain');
    if (charId) {
      playFeedbackSound('click');
      setAssignments((prev) => ({
        ...prev,
        [targetCharId]: charId,
      }));
    }
  };

  // Used characters
  const assignedValues = Object.values(assignments).filter(Boolean);
  const unassignedPool = ACTIVITY_8_CHARACTERS.filter(
    (c) => !assignedValues.includes(c.id)
  );

  const allAssigned = ACTIVITY_8_CHARACTERS.every((c) => !!assignments[c.id]);
  const allCorrect = ACTIVITY_8_CHARACTERS.every(
    (c) => assignments[c.id] === c.id
  );

  const handleCheck = () => {
    setIsSubmitted(true);
    if (allCorrect) {
      playFeedbackSound('correct');
    } else {
      playFeedbackSound('wrong');
    }
  };

  const handleReset = () => {
    setAssignments({});
    setSelectedCharId(null);
    setIsSubmitted(false);
    setFlippedCharIds([]);
  };

  return (
    <div className="w-full flex flex-col gap-5">
      {/* Top Reversible Instruction Card */}
      <div className="w-full perspective-1000">
        <div
          onClick={() => {
            playFeedbackSound('flip');
            setIsInstructionFlipped(!isInstructionFlipped);
          }}
          className={`relative w-full min-h-[58px] rounded-2xl cursor-pointer select-none transition-transform duration-500 transform-style-3d border shadow-xs ${
            isInstructionFlipped ? 'rotate-y-180' : ''
          } ${
            isDark
              ? 'bg-slate-900 border-slate-700 text-white'
              : 'bg-white border-slate-200 text-slate-900'
          }`}
        >
          <div className="absolute inset-0 px-5 py-3 flex items-center justify-between backface-hidden">
            <span className="font-semibold text-sm sm:text-base">{activity.instructions}</span>
            <button
              type="button"
              onClick={(e) => handlePlayText(activity.instructions, 'instructions', e)}
              className={`p-1.5 rounded-lg border transition-all shrink-0 ${
                isDark
                  ? 'bg-slate-800 hover:bg-slate-700 text-sky-300 border-slate-700'
                  : 'bg-sky-50 hover:bg-sky-100 text-sky-600 border-sky-200'
              }`}
              aria-label="Audio"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>
          <div className="absolute inset-0 px-5 py-3 flex items-center justify-between backface-hidden rotate-y-180">
            <span className="font-semibold text-sm sm:text-base italic text-slate-700 dark:text-slate-200">
              {activity.instructionsEs}
            </span>
          </div>
        </div>
      </div>

      {/* 3 Character Image Cards */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-5">
        {ACTIVITY_8_CHARACTERS.map((char) => {
          const assignedId = assignments[char.id];
          const assignedChar = ACTIVITY_8_CHARACTERS.find((c) => c.id === assignedId);
          const isCorrect = isSubmitted && assignedId === char.id;
          const isWrong = isSubmitted && assignedId !== char.id;
          const isCardFlipped = flippedCharIds.includes(char.id);

          return (
            <div
              key={char.id}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, char.id)}
              onClick={() => handleAssignToImage(char.id)}
              className={`rounded-2xl border-2 p-3 sm:p-4 flex flex-col items-center gap-3 transition-all ${
                selectedCharId
                  ? 'border-dashed border-sky-400 cursor-pointer bg-sky-50/20'
                  : isDark
                  ? 'bg-slate-900 border-slate-700'
                  : 'bg-white border-slate-200 shadow-xs'
              }`}
            >
              {/* Character Photo */}
              <div className="relative w-full aspect-square max-w-[220px] rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-xs">
                <img
                  src={char.image}
                  alt={char.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Assignment Slot */}
              <div className="w-full">
                {assignedChar ? (
                  <div className="w-full perspective-1000">
                    <div
                      onClick={(e) => toggleFlip(assignedChar.id, e)}
                      className={`relative w-full min-h-[50px] rounded-xl cursor-pointer select-none transition-transform duration-500 transform-style-3d border shadow-xs ${
                        flippedCharIds.includes(assignedChar.id) ? 'rotate-y-180' : ''
                      } ${
                        isCorrect
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 ring-2 ring-emerald-400'
                          : isWrong
                          ? 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 ring-2 ring-rose-400'
                          : isDark
                          ? 'bg-slate-800 border-slate-700 text-white'
                          : 'bg-slate-100 border-slate-300 text-slate-900'
                      }`}
                    >
                      {/* Front: English */}
                      <div className="absolute inset-0 px-3 py-2 flex items-center justify-between backface-hidden">
                        <span className="font-bold text-sm sm:text-base">
                          {assignedChar.name}
                        </span>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={(e) => handlePlayText(assignedChar.name, assignedChar.id, e)}
                            className={`p-1.5 rounded-lg border shrink-0 ${
                              isDark
                                ? 'bg-slate-700 text-sky-300 border-slate-600'
                                : 'bg-white text-sky-600 border-slate-200'
                            }`}
                            aria-label="Audio"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                          {!isSubmitted && (
                            <button
                              type="button"
                              onClick={(e) => handleRemoveAssignment(char.id, e)}
                              className="p-1 text-slate-400 hover:text-rose-500 rounded-md"
                              title="Quitar"
                            >
                              ✕
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Back: Spanish */}
                      <div className="absolute inset-0 px-3 py-2 flex items-center justify-between backface-hidden rotate-y-180">
                        <span className="font-bold text-sm sm:text-base italic text-slate-700 dark:text-slate-200">
                          {assignedChar.nameEs}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    className={`w-full py-3 px-4 rounded-xl border border-dashed text-center text-xs font-medium cursor-pointer transition-all ${
                      selectedCharId
                        ? 'border-sky-400 bg-sky-50 dark:bg-sky-950/30 text-sky-600 dark:text-sky-300 animate-pulse'
                        : isDark
                        ? 'border-slate-700 text-slate-500 bg-slate-800/50'
                        : 'border-slate-300 text-slate-400 bg-slate-50'
                    }`}
                  >
                    Haz clic o arrastra el nombre aquí
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Available Names Pool */}
      {unassignedPool.length > 0 && !isSubmitted && (
        <div
          className={`p-4 rounded-2xl border flex flex-col gap-3 ${
            isDark ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'
          }`}
        >
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Nombres de personajes ({unassignedPool.length})
          </div>

          <div className="flex flex-wrap gap-3">
            {unassignedPool.map((c) => {
              const isSelected = selectedCharId === c.id;
              const isFlipped = flippedCharIds.includes(c.id);

              return (
                <div
                  key={c.id}
                  draggable={!isSubmitted}
                  onDragStart={(e) => handleDragStart(e, c.id)}
                  onClick={() => handleSelectPoolName(c.id)}
                  className={`perspective-1000 cursor-pointer min-w-[140px] flex-1 sm:flex-initial ${
                    isSelected ? 'ring-2 ring-sky-400 rounded-xl' : ''
                  }`}
                >
                  <div
                    onClick={(e) => toggleFlip(c.id, e)}
                    className={`relative w-full min-h-[48px] rounded-xl cursor-pointer select-none transition-transform duration-500 transform-style-3d border shadow-xs ${
                      isFlipped ? 'rotate-y-180' : ''
                    } ${
                      isSelected
                        ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-200'
                        : isDark
                        ? 'bg-slate-800 border-slate-700 text-slate-100'
                        : 'bg-white border-slate-200 text-slate-800'
                    }`}
                  >
                    {/* Front */}
                    <div className="absolute inset-0 px-3.5 py-2 flex items-center justify-between backface-hidden">
                      <span className="font-bold text-sm">{c.name}</span>
                      <button
                        type="button"
                        onClick={(e) => handlePlayText(c.name, c.id, e)}
                        className={`p-1 rounded-md border shrink-0 ${
                          isDark
                            ? 'bg-slate-700 text-sky-300 border-slate-600'
                            : 'bg-sky-50 text-sky-600 border-sky-200'
                        }`}
                        aria-label="Audio"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Back */}
                    <div className="absolute inset-0 px-3.5 py-2 flex items-center justify-between backface-hidden rotate-y-180">
                      <span className="font-bold text-sm italic text-slate-700 dark:text-slate-200">
                        {c.nameEs}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex items-center justify-between gap-3 mt-1">
        {isSubmitted ? (
          <button
            type="button"
            onClick={handleReset}
            className={`px-4 py-2 rounded-xl border text-xs sm:text-sm font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
              isDark
                ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
            }`}
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reintentar</span>
          </button>
        ) : (
          <div />
        )}

        {!isSubmitted ? (
          <button
            type="button"
            disabled={!allAssigned}
            onClick={handleCheck}
            className={`px-6 py-2.5 rounded-xl font-bold text-sm shadow-md transition-all cursor-pointer ${
              allAssigned
                ? 'bg-sky-600 hover:bg-sky-700 text-white active:scale-95'
                : 'bg-slate-300 dark:bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            Comprobar
          </button>
        ) : (
          <button
            type="button"
            onClick={onNext}
            className="px-6 py-2.5 rounded-xl font-bold text-sm bg-indigo-600 hover:bg-indigo-700 text-white shadow-md transition-all cursor-pointer active:scale-95 flex items-center gap-2"
          >
            <span>Siguiente</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Explanation Box */}
      {isSubmitted && (
        <div
          className={`p-4 rounded-2xl border animate-in fade-in duration-200 flex flex-col gap-2 ${
            allCorrect
              ? isDark
                ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                : 'bg-emerald-50 border-emerald-200 text-emerald-950'
              : isDark
              ? 'bg-rose-950/40 border-rose-500/40 text-rose-200'
              : 'bg-rose-50 border-rose-200 text-rose-950'
          }`}
        >
          <div className="flex items-center gap-2 font-bold text-sm">
            {allCorrect ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            ) : (
              <XCircle className="w-4 h-4 text-rose-500" />
            )}
            <span>{allCorrect ? '¡Correcto!' : 'Algunos nombres están mal asociados'}</span>
          </div>
          <p className="text-xs sm:text-sm leading-relaxed">{activity.explanationEn}</p>
          <p className="text-xs sm:text-sm leading-relaxed italic text-slate-600 dark:text-slate-300">
            {activity.explanationEs}
          </p>
        </div>
      )}
    </div>
  );
};
