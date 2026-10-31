import React, { useState } from 'react';
import { Volume2, CheckCircle2, RotateCcw, HelpCircle } from 'lucide-react';
import { VocabularySidebar } from './VocabularySidebar';
import { ReversibleTextCard } from './ReversibleTextCard';
import { speakEnglish, playFeedbackSound } from '../../utils/audio';

interface Activity6DialogueDropdownProps {
  accent: 'US' | 'UK';
  speechRate: number;
  onComplete?: () => void;
}

export const Activity6DialogueDropdown: React.FC<Activity6DialogueDropdownProps> = ({
  accent,
  speechRate,
  onComplete,
}) => {
  const [selected1, setSelected1] = useState<string>('');
  const [selected2, setSelected2] = useState<string>('');
  const [selected3, setSelected3] = useState<string>('');
  const [selected4, setSelected4] = useState<string>('');
  const [selected5, setSelected5] = useState<string>('');
  const [checked, setChecked] = useState(false);
  const [showTranslations, setShowTranslations] = useState(false);

  const isBlank1Correct = selected1 === 'family picnic';
  const isBlank2Correct = selected2 === 'relatives';
  const isBlank3Correct = selected3 === 'have fun';
  const isBlank4Correct = selected4 === 'aunt';
  const isBlank5Correct = selected5 === 'fight';

  const allCorrect =
    isBlank1Correct &&
    isBlank2Correct &&
    isBlank3Correct &&
    isBlank4Correct &&
    isBlank5Correct;

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
    setSelected1('');
    setSelected2('');
    setSelected3('');
    setSelected4('');
    setSelected5('');
    setChecked(false);
    playFeedbackSound('click');
  };

  const handlePlayLine = (text: string, speakerGender: 'male' | 'female') => {
    speakEnglish(text, speechRate, accent, undefined, undefined, speakerGender);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header instructions */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-sky-700 bg-sky-100 px-3 py-1 rounded-full uppercase tracking-wider">
            Actividad 6 de 7 · Diálogo con Lista Desplegable
          </span>
          <h2 className="text-xl font-bold text-slate-800 mt-2">
            Select the correct answer from the drop-down list.
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Completa la conversación entre Fred y Linda seleccionando la opción correcta en cada menú desplegable.
          </p>
        </div>
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

      {/* Main Grid: Left Sidebar + Right Dialogue */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Vocabulary Reference Sidebar */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
          <VocabularySidebar
            accent={accent}
            speechRate={speechRate}
            selectedWordId={
              isBlank1Correct ? 'family-picnic' : isBlank4Correct ? 'aunt' : undefined
            }
          />
        </div>

        {/* Right Column: Dialogue Card */}
        <div className="lg:col-span-8 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-500"></span>
              Conversation between Fred and Linda
            </h3>
            <span className="text-xs font-semibold text-slate-400">
              5 espacios por completar
            </span>
          </div>

          {/* Dialogue Lines */}
          <div className="space-y-4 text-slate-800 text-[15px] leading-relaxed">
            {/* Line 1: Fred */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-150 flex items-start gap-3">
              <button
                type="button"
                onClick={() =>
                  handlePlayLine(
                    `We had a ${selected1 || 'something'} last week.`,
                    'male'
                  )
                }
                className="p-1.5 mt-0.5 rounded-lg bg-sky-100 hover:bg-sky-200 text-sky-700 transition-colors"
                title="Escuchar a Fred"
              >
                <Volume2 className="w-4 h-4" />
              </button>
              <div className="flex-1 flex flex-wrap items-center gap-1.5">
                <span className="font-bold text-sky-900">Fred:</span>
                <span>We had a</span>
                <select
                  value={selected1}
                  onChange={(e) => setSelected1(e.target.value)}
                  className={`px-3 py-1.5 rounded-lg font-medium text-sm border transition-all ${
                    checked
                      ? isBlank1Correct
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-800 ring-2 ring-emerald-200'
                        : 'bg-rose-50 border-rose-500 text-rose-800 ring-2 ring-rose-200'
                      : 'bg-white border-sky-300 text-slate-800 focus:border-sky-500 focus:ring-2 focus:ring-sky-100'
                  }`}
                >
                  <option value="">-- select --</option>
                  <option value="fight">fight</option>
                  <option value="family picnic">family picnic</option>
                  <option value="cousin">cousin</option>
                </select>
                <span>last week.</span>
              </div>
            </div>

            {/* Line 2: Linda */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-150 flex items-start gap-3">
              <button
                type="button"
                onClick={() =>
                  handlePlayLine(
                    `How wonderful. Were all your ${selected2 || 'relatives'} there?`,
                    'female'
                  )
                }
                className="p-1.5 mt-0.5 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-700 transition-colors"
                title="Escuchar a Linda"
              >
                <Volume2 className="w-4 h-4" />
              </button>
              <div className="flex-1 flex flex-wrap items-center gap-1.5">
                <span className="font-bold text-emerald-900">Linda:</span>
                <span>How wonderful. Were all your</span>
                <select
                  value={selected2}
                  onChange={(e) => setSelected2(e.target.value)}
                  className={`px-3 py-1.5 rounded-lg font-medium text-sm border transition-all ${
                    checked
                      ? isBlank2Correct
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-800 ring-2 ring-emerald-200'
                        : 'bg-rose-50 border-rose-500 text-rose-800 ring-2 ring-rose-200'
                      : 'bg-white border-sky-300 text-slate-800 focus:border-sky-500 focus:ring-2 focus:ring-sky-100'
                  }`}
                >
                  <option value="">-- select --</option>
                  <option value="reunion">reunion</option>
                  <option value="relatives">relatives</option>
                  <option value="fights">fights</option>
                </select>
                <span>there?</span>
              </div>
            </div>

            {/* Line 3: Fred */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-150 flex items-start gap-3">
              <button
                type="button"
                onClick={() =>
                  handlePlayLine(
                    `Yes, they were, but it wasn't wonderful. I didn't ${selected3 || 'have fun'} at all!`,
                    'male'
                  )
                }
                className="p-1.5 mt-0.5 rounded-lg bg-sky-100 hover:bg-sky-200 text-sky-700 transition-colors"
                title="Escuchar a Fred"
              >
                <Volume2 className="w-4 h-4" />
              </button>
              <div className="flex-1 flex flex-wrap items-center gap-1.5">
                <span className="font-bold text-sky-900">Fred:</span>
                <span>Yes, they were, but it wasn't wonderful. I didn't</span>
                <select
                  value={selected3}
                  onChange={(e) => setSelected3(e.target.value)}
                  className={`px-3 py-1.5 rounded-lg font-medium text-sm border transition-all ${
                    checked
                      ? isBlank3Correct
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-800 ring-2 ring-emerald-200'
                        : 'bg-rose-50 border-rose-500 text-rose-800 ring-2 ring-rose-200'
                      : 'bg-white border-sky-300 text-slate-800 focus:border-sky-500 focus:ring-2 focus:ring-sky-100'
                  }`}
                >
                  <option value="">-- select --</option>
                  <option value="have fun">have fun</option>
                  <option value="phone home">phone home</option>
                  <option value="cousins">cousins</option>
                </select>
                <span>at all!</span>
              </div>
            </div>

            {/* Line 4: Linda */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-150 flex items-start gap-3">
              <button
                type="button"
                onClick={() =>
                  handlePlayLine('Why? What happened?', 'female')
                }
                className="p-1.5 mt-0.5 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-700 transition-colors"
                title="Escuchar a Linda"
              >
                <Volume2 className="w-4 h-4" />
              </button>
              <div className="flex-1">
                <span className="font-bold text-emerald-900 mr-2">Linda:</span>
                <span>Why? What happened?</span>
              </div>
            </div>

            {/* Line 5: Fred */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-150 flex items-start gap-3">
              <button
                type="button"
                onClick={() =>
                  handlePlayLine(
                    `My ${selected4 || 'aunt'} and uncle had a terrible ${selected5 || 'fight'}.`,
                    'male'
                  )
                }
                className="p-1.5 mt-0.5 rounded-lg bg-sky-100 hover:bg-sky-200 text-sky-700 transition-colors"
                title="Escuchar a Fred"
              >
                <Volume2 className="w-4 h-4" />
              </button>
              <div className="flex-1 flex flex-wrap items-center gap-1.5">
                <span className="font-bold text-sky-900">Fred:</span>
                <span>My</span>
                <select
                  value={selected4}
                  onChange={(e) => setSelected4(e.target.value)}
                  className={`px-3 py-1.5 rounded-lg font-medium text-sm border transition-all ${
                    checked
                      ? isBlank4Correct
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-800 ring-2 ring-emerald-200'
                        : 'bg-rose-50 border-rose-500 text-rose-800 ring-2 ring-rose-200'
                      : 'bg-white border-sky-300 text-slate-800 focus:border-sky-500 focus:ring-2 focus:ring-sky-100'
                  }`}
                >
                  <option value="">-- select --</option>
                  <option value="aunt">aunt</option>
                  <option value="uncle">uncle</option>
                  <option value="relatives">relatives</option>
                </select>
                <span>and uncle had a terrible</span>
                <select
                  value={selected5}
                  onChange={(e) => setSelected5(e.target.value)}
                  className={`px-3 py-1.5 rounded-lg font-medium text-sm border transition-all ${
                    checked
                      ? isBlank5Correct
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-800 ring-2 ring-emerald-200'
                        : 'bg-rose-50 border-rose-500 text-rose-800 ring-2 ring-rose-200'
                      : 'bg-white border-sky-300 text-slate-800 focus:border-sky-500 focus:ring-2 focus:ring-sky-100'
                  }`}
                >
                  <option value="">-- select --</option>
                  <option value="picnic">picnic</option>
                  <option value="fight">fight</option>
                  <option value="reunion">reunion</option>
                </select>
                <span>.</span>
              </div>
            </div>

            {/* Line 6: Linda */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-150 flex items-start gap-3">
              <button
                type="button"
                onClick={() =>
                  handlePlayLine(
                    "Oh dear. I'm sorry to hear that.",
                    'female'
                  )
                }
                className="p-1.5 mt-0.5 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-700 transition-colors"
                title="Escuchar a Linda"
              >
                <Volume2 className="w-4 h-4" />
              </button>
              <div className="flex-1">
                <span className="font-bold text-emerald-900 mr-2">Linda:</span>
                <span>Oh dear. I'm sorry to hear that.</span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-slate-100">
            <button
              onClick={handleCheck}
              disabled={!selected1 || !selected2 || !selected3 || !selected4 || !selected5}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all shadow-sm ${
                !selected1 || !selected2 || !selected3 || !selected4 || !selected5
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  : allCorrect && checked
                  ? 'bg-emerald-600 text-white shadow-emerald-200'
                  : 'bg-sky-600 hover:bg-sky-700 text-white shadow-sky-200'
              }`}
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>{checked && allCorrect ? '¡Excelente!' : 'Comprobar'}</span>
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

      {/* 3D Reversible Flip Card for Translations */}
      {showTranslations && (
        <div className="mt-6 pt-4 border-t border-slate-200">
          <ReversibleTextCard
            title="Traducción y Análisis del Diálogo (Fred & Linda)"
            accent={accent}
            speechRate={speechRate}
            englishLines={[
              { speaker: 'Fred', text: 'We had a family picnic last week.' },
              { speaker: 'Linda', text: 'How wonderful. Were all your relatives there?' },
              { speaker: 'Fred', text: "Yes, they were, but it wasn't wonderful. I didn't have fun at all!" },
              { speaker: 'Linda', text: 'Why? What happened?' },
              { speaker: 'Fred', text: 'My aunt and uncle had a terrible fight.' },
              { speaker: 'Linda', text: "Oh dear. I'm sorry to hear that." },
            ]}
            spanishLines={[
              { speaker: 'Fred', text: 'Tuvimos un picnic familiar la semana pasada.' },
              { speaker: 'Linda', text: '¡Qué maravilloso! ¿Estuvieron todos tus parientes allí?' },
              { speaker: 'Fred', text: 'Sí, estuvieron, pero no fue maravilloso. ¡No me divertí para nada!' },
              { speaker: 'Linda', text: '¿Por qué? ¿Qué ocurrió?' },
              { speaker: 'Fred', text: 'Mi tía y mi tío tuvieron una pelea terrible.' },
              { speaker: 'Linda', text: '¡Vaya! Siento mucho escuchar eso.' },
            ]}
            grammarNote="Observa las colocaciones usadas en el diálogo: 'family picnic' (comida campestre familiar), 'relatives' (parientes en general), 'have fun' (divertirse), 'aunt and uncle' (tía y tío) y 'had a fight' (tuvieron una pelea)."
          />
        </div>
      )}
    </div>
  );
};
