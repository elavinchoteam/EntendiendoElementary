import React, { useState } from 'react';
import { Volume2, CheckCircle2, RotateCcw, HelpCircle } from 'lucide-react';
import { VocabularySidebar } from './VocabularySidebar';
import { ReversibleTextCard } from './ReversibleTextCard';
import { speakEnglish, playFeedbackSound } from '../../utils/audio';

interface Activity7ParagraphClozeProps {
  accent: 'US' | 'UK';
  speechRate: number;
  onComplete?: () => void;
}

const CHIP_OPTIONS = [
  { id: 'opt-uncle', text: 'uncle' },
  { id: 'opt-young', text: 'young and old' },
  { id: 'opt-aunt', text: 'aunt' },
  { id: 'opt-cousin', text: 'cousin' },
  { id: 'opt-phone', text: 'phone home' },
];

export const Activity7ParagraphCloze: React.FC<Activity7ParagraphClozeProps> = ({
  accent,
  speechRate,
  onComplete,
}) => {
  // 5 blanks
  const [slot1, setSlot1] = useState<string | null>(null);
  const [slot2, setSlot2] = useState<string | null>(null);
  const [slot3, setSlot3] = useState<string | null>(null);
  const [slot4, setSlot4] = useState<string | null>(null);
  const [slot5, setSlot5] = useState<string | null>(null);

  const [activeChip, setActiveChip] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);
  const [showTranslations, setShowTranslations] = useState(false);

  const isSlot1Correct = slot1 === 'uncle';
  const isSlot2Correct = slot2 === 'aunt';
  const isSlot3Correct = slot3 === 'cousin';
  const isSlot4Correct = slot4 === 'young and old';
  const isSlot5Correct = slot5 === 'phone home';

  const allFilled = slot1 && slot2 && slot3 && slot4 && slot5;
  const allCorrect =
    isSlot1Correct &&
    isSlot2Correct &&
    isSlot3Correct &&
    isSlot4Correct &&
    isSlot5Correct;

  const usedValues = [slot1, slot2, slot3, slot4, slot5].filter(Boolean) as string[];

  const handleSelectSlot = (slotIdx: number) => {
    if (!activeChip) return;
    if (slotIdx === 1) setSlot1(activeChip);
    if (slotIdx === 2) setSlot2(activeChip);
    if (slotIdx === 3) setSlot3(activeChip);
    if (slotIdx === 4) setSlot4(activeChip);
    if (slotIdx === 5) setSlot5(activeChip);
    setActiveChip(null);
    playFeedbackSound('click');
  };

  const handleRemoveSlot = (slotIdx: number) => {
    if (slotIdx === 1) setSlot1(null);
    if (slotIdx === 2) setSlot2(null);
    if (slotIdx === 3) setSlot3(null);
    if (slotIdx === 4) setSlot4(null);
    if (slotIdx === 5) setSlot5(null);
    setChecked(false);
  };

  const handleCheck = () => {
    setChecked(true);
    if (allCorrect) {
      playFeedbackSound('complete');
      if (onComplete) onComplete();
    } else {
      playFeedbackSound('wrong');
    }
  };

  const handleReset = () => {
    setSlot1(null);
    setSlot2(null);
    setSlot3(null);
    setSlot4(null);
    setSlot5(null);
    setActiveChip(null);
    setChecked(false);
    playFeedbackSound('click');
  };

  const fullParagraphText =
    "My father's younger brother is my favorite uncle. His wife is ok, but she's not my favorite aunt. But they have a very annoying son. I really don't like my cousin at all! He makes everyone angry, young and old! When he comes to stay at our house he calls his parents at least five times a day. How many times can you phone home?";

  const handleListenParagraph = () => {
    speakEnglish(fullParagraphText, speechRate, accent);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header instructions */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-sky-700 bg-sky-100 px-3 py-1 rounded-full uppercase tracking-wider">
            Actividad 7 de 7 · Completar Párrafo
          </span>
          <h2 className="text-xl font-bold text-slate-800 mt-2">
            Drag the correct answer/s into place.
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Arrastra o haz clic en las fichas inferiores para completar los espacios en blanco del párrafo familiar.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleListenParagraph}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold bg-sky-50 text-sky-700 hover:bg-sky-100 border border-sky-200 transition-all"
            title="Escuchar párrafo"
          >
            <Volume2 className="w-4 h-4" />
            <span>Escuchar</span>
          </button>
          <button
            onClick={() => setShowTranslations(!showTranslations)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              showTranslations
                ? 'bg-amber-100 text-amber-800 border border-amber-300 shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <HelpCircle className="w-4 h-4 text-amber-600" />
            <span>{showTranslations ? 'Ocultar Tarjetas 3D' : 'Ver Traducción 3D (🔄)'}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Left Sidebar + Right Paragraph */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Vocabulary Reference Sidebar */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
          <VocabularySidebar
            accent={accent}
            speechRate={speechRate}
            selectedWordId={
              isSlot1Correct ? 'uncle' : isSlot2Correct ? 'aunt' : undefined
            }
          />
        </div>

        {/* Right Column: Paragraph Card with Blanks & Chips */}
        <div className="lg:col-span-8 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-500"></span>
              Family Paragraph
            </h3>
            <span className="text-xs font-semibold text-slate-400">
              5 espacios por rellenar
            </span>
          </div>

          {/* Paragraph body */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-150 text-[16px] leading-[2.4] text-slate-800">
            <span>My father's younger brother is my favorite</span>{' '}
            {/* Blank 1 */}
            <button
              type="button"
              onClick={() => (slot1 ? handleRemoveSlot(1) : handleSelectSlot(1))}
              className={`inline-flex items-center justify-center min-w-[130px] h-9 px-3 mx-1 text-sm font-semibold rounded-lg border-2 transition-all align-middle ${
                slot1
                  ? checked
                    ? isSlot1Correct
                      ? 'bg-emerald-100 border-emerald-500 text-emerald-900'
                      : 'bg-rose-100 border-rose-500 text-rose-900'
                    : 'bg-white border-sky-400 text-sky-900 shadow-sm'
                  : activeChip
                  ? 'border-dashed border-sky-400 bg-sky-50 animate-pulse text-sky-600'
                  : 'border-dashed border-slate-300 bg-white text-slate-400'
              }`}
            >
              {slot1 || '________'}
            </button>
            <span>. His wife is ok, but she's not my favorite</span>{' '}
            {/* Blank 2 */}
            <button
              type="button"
              onClick={() => (slot2 ? handleRemoveSlot(2) : handleSelectSlot(2))}
              className={`inline-flex items-center justify-center min-w-[130px] h-9 px-3 mx-1 text-sm font-semibold rounded-lg border-2 transition-all align-middle ${
                slot2
                  ? checked
                    ? isSlot2Correct
                      ? 'bg-emerald-100 border-emerald-500 text-emerald-900'
                      : 'bg-rose-100 border-rose-500 text-rose-900'
                    : 'bg-white border-sky-400 text-sky-900 shadow-sm'
                  : activeChip
                  ? 'border-dashed border-sky-400 bg-sky-50 animate-pulse text-sky-600'
                  : 'border-dashed border-slate-300 bg-white text-slate-400'
              }`}
            >
              {slot2 || '________'}
            </button>
            <span>. But they have a very annoying son. I really don't like my</span>{' '}
            {/* Blank 3 */}
            <button
              type="button"
              onClick={() => (slot3 ? handleRemoveSlot(3) : handleSelectSlot(3))}
              className={`inline-flex items-center justify-center min-w-[130px] h-9 px-3 mx-1 text-sm font-semibold rounded-lg border-2 transition-all align-middle ${
                slot3
                  ? checked
                    ? isSlot3Correct
                      ? 'bg-emerald-100 border-emerald-500 text-emerald-900'
                      : 'bg-rose-100 border-rose-500 text-rose-900'
                    : 'bg-white border-sky-400 text-sky-900 shadow-sm'
                  : activeChip
                  ? 'border-dashed border-sky-400 bg-sky-50 animate-pulse text-sky-600'
                  : 'border-dashed border-slate-300 bg-white text-slate-400'
              }`}
            >
              {slot3 || '________'}
            </button>
            <span>at all! He makes everyone angry,</span>{' '}
            {/* Blank 4 */}
            <button
              type="button"
              onClick={() => (slot4 ? handleRemoveSlot(4) : handleSelectSlot(4))}
              className={`inline-flex items-center justify-center min-w-[140px] h-9 px-3 mx-1 text-sm font-semibold rounded-lg border-2 transition-all align-middle ${
                slot4
                  ? checked
                    ? isSlot4Correct
                      ? 'bg-emerald-100 border-emerald-500 text-emerald-900'
                      : 'bg-rose-100 border-rose-500 text-rose-900'
                    : 'bg-white border-sky-400 text-sky-900 shadow-sm'
                  : activeChip
                  ? 'border-dashed border-sky-400 bg-sky-50 animate-pulse text-sky-600'
                  : 'border-dashed border-slate-300 bg-white text-slate-400'
              }`}
            >
              {slot4 || '________'}
            </button>
            <span>! When he comes to stay at our house he calls his parents at least five times a day. How many times can you</span>{' '}
            {/* Blank 5 */}
            <button
              type="button"
              onClick={() => (slot5 ? handleRemoveSlot(5) : handleSelectSlot(5))}
              className={`inline-flex items-center justify-center min-w-[140px] h-9 px-3 mx-1 text-sm font-semibold rounded-lg border-2 transition-all align-middle ${
                slot5
                  ? checked
                    ? isSlot5Correct
                      ? 'bg-emerald-100 border-emerald-500 text-emerald-900'
                      : 'bg-rose-100 border-rose-500 text-rose-900'
                    : 'bg-white border-sky-400 text-sky-900 shadow-sm'
                  : activeChip
                  ? 'border-dashed border-sky-400 bg-sky-50 animate-pulse text-sky-600'
                  : 'border-dashed border-slate-300 bg-white text-slate-400'
              }`}
            >
              {slot5 || '________'}
            </button>
            <span>?</span>
          </div>

          {/* Draggable / Clickable Options */}
          <div className="pt-2 border-t border-slate-100">
            <p className="text-xs font-semibold text-slate-500 mb-2.5">
              Haz clic en una palabra para seleccionarla y luego en un espacio en blanco:
            </p>
            <div className="flex flex-wrap gap-2.5">
              {CHIP_OPTIONS.map((chip) => {
                const isUsed = usedValues.includes(chip.text);
                const isSelected = activeChip === chip.text;

                return (
                  <button
                    key={chip.id}
                    type="button"
                    disabled={isUsed}
                    onClick={() => {
                      setActiveChip(isSelected ? null : chip.text);
                      playFeedbackSound('click');
                    }}
                    className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
                      isUsed
                        ? 'opacity-30 bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed line-through'
                        : isSelected
                        ? 'bg-sky-600 text-white border-sky-600 shadow-md ring-2 ring-sky-300 scale-105'
                        : 'bg-white hover:bg-slate-50 border-slate-300 text-slate-800 shadow-sm hover:border-sky-300'
                    }`}
                  >
                    {chip.text}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-slate-100">
            <button
              onClick={handleCheck}
              disabled={!allFilled}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all shadow-sm ${
                !allFilled
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  : allCorrect && checked
                  ? 'bg-emerald-600 text-white shadow-emerald-200'
                  : 'bg-sky-600 hover:bg-sky-700 text-white shadow-sky-200'
              }`}
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>{checked && allCorrect ? '¡Completado con Éxito!' : 'Comprobar'}</span>
            </button>

            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 transition-colors font-semibold"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reiniciar</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3D Reversible Flip Card for Paragraph Translation */}
      {showTranslations && (
        <div className="mt-6 pt-4 border-t border-slate-200">
          <ReversibleTextCard
            title="Traducción y Análisis del Párrafo"
            accent={accent}
            speechRate={speechRate}
            englishLines={[
              {
                text: "My father's younger brother is my favorite uncle. His wife is ok, but she's not my favorite aunt.",
              },
              {
                text: "But they have a very annoying son. I really don't like my cousin at all! He makes everyone angry, young and old!",
              },
              {
                text: 'When he comes to stay at our house he calls his parents at least five times a day. How many times can you phone home?',
              },
            ]}
            spanishLines={[
              {
                text: 'El hermano menor de mi padre es mi tío favorito. Su esposa está bien, pero no es mi tía favorita.',
              },
              {
                text: 'Pero tienen un hijo muy molesto. ¡Realmente no me agrada mi primo en absoluto! ¡Hace enojar a todos, jóvenes y ancianos!',
              },
              {
                text: 'Cuando viene a quedarse en nuestra casa, llama a sus padres al menos cinco veces al día. ¿Cuántas veces puedes llamar a casa?',
              },
            ]}
            grammarNote="Comprueba el uso de parentescos: 'uncle' (tío), 'aunt' (tía), 'cousin' (primo), la locución 'young and old' (tanto jóvenes como adultos/ancianos) y el verbo compuesto 'phone home' (llamar por teléfono a la casa familiar)."
          />
        </div>
      )}
    </div>
  );
};
