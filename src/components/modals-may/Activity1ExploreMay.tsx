import React, { useState } from 'react';
import {
  Volume2,
  Sparkles,
  RotateCw,
  BookOpen,
  CheckCircle2,
  HelpCircle,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { speakEnglish, stopSpeaking, playFeedbackSound } from '../../utils/audio';
import { MayScenePlayer } from './MayScenePlayer';
import { ReversibleTextCard } from './ReversibleTextCard';
import { MODALS_MAY_DIALOGUE } from '../../data/modalsMayData';

interface Activity1ExploreMayProps {
  speed?: number;
  accent?: 'US' | 'UK';
}

export const Activity1ExploreMay: React.FC<Activity1ExploreMayProps> = ({
  speed = 1.0,
  accent = 'US',
}) => {
  const { isDark } = useTheme();
  const [activeDialogueIdx, setActiveDialogueIdx] = useState(0);

  const fullDialogueEnglish = MODALS_MAY_DIALOGUE.map(
    (d) => `${d.speaker}: "${d.text}"`
  ).join('\n');

  const fullDialogueSpanish = MODALS_MAY_DIALOGUE.map(
    (d) => `${d.speakerEs}: "${d.translation}"`
  ).join('\n');

  const handlePlayLine = (idx: number) => {
    setActiveDialogueIdx(idx);
    playFeedbackSound('click');
    stopSpeaking();
    const line = MODALS_MAY_DIALOGUE[idx];
    speakEnglish(line.text, speed, accent, undefined, undefined, line.speakerGender);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner with Instruction */}
      <div
        className={`p-4 sm:p-5 rounded-2xl border ${
          isDark
            ? 'bg-slate-800/80 border-slate-700 text-slate-100'
            : 'bg-white border-slate-200 text-slate-800'
        } shadow-sm`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide bg-sky-100 text-sky-700 dark:bg-sky-950/70 dark:text-sky-300">
                Unidad 9 · Sección 6
              </span>
              <span className="text-xs text-slate-400 font-medium">
                Actividad 1 de 11: Exploración
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              Modals: May — Exploration & Dialogue
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Escucha la conversación entre la niña y su mamá. Observa el uso de "may" para solicitar permiso formal y expresar posibilidad.
            </p>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Left side Scene Player, Right side Detailed Reversible Cards & Grammar Rules */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: MayScenePlayer (5 cols on lg) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <MayScenePlayer
            speed={speed}
            accent={accent}
            highlightActiveLine={activeDialogueIdx}
          />

          {/* Quick Grammar Pill Card */}
          <div
            className={`p-4 rounded-2xl border ${
              isDark ? 'bg-slate-800/60 border-slate-700' : 'bg-sky-50/60 border-sky-100'
            }`}
          >
            <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Regla Clave: Modals — May</span>
            </div>
            <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 leading-relaxed">
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span>
                  <strong>1. Permiso Formal:</strong> Para pedir permiso con cortesía: <em>May I have a cookie? / May I see your ticket?</em>
                </span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span>
                  <strong>2. Conceder o Denegar:</strong> <em>You may come in</em> (puedes pasar) o <em>No, you may not</em> (no puedes).
                </span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-500 shrink-0 mt-0.5" />
                <span>
                  <strong>3. Posibilidad (50% de probabilidad):</strong> <em>Your brother may want one</em> / <em>It may rain today</em> (puede que llueva).
                </span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-500 shrink-0 mt-0.5" />
                <span>
                  <strong>4. Estructura invariable:</strong> Sujeto + <strong>may / may not</strong> + <strong>verbo en forma base</strong> (sin "to", sin -s, sin -ing).
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Column: Interactive Reversible Cards for each line & Full Dialogue */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {/* Main 3D Reversible Flip Card for Full Dialogue */}
          <ReversibleTextCard
            englishText={fullDialogueEnglish}
            spanishText={fullDialogueSpanish}
            grammarTip="El verbo modal 'may' no cambia con terceras personas (he, she, it) y siempre va seguido de la forma base del verbo sin 'to'."
            speechRate={speed}
            accent={accent}
            frontLabel="Diálogo Completo en Inglés"
            backLabel="Traducción Completa al Español"
            size="lg"
          />

          {/* Interactive Lines List */}
          <div
            className={`p-4 sm:p-5 rounded-2xl border ${
              isDark ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-200'
            } shadow-sm space-y-4`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
                Líneas individuales con traducción 3D
              </span>
              <span className="text-xs text-sky-500 font-medium flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Toca cada tarjeta para voltear
              </span>
            </div>

            {MODALS_MAY_DIALOGUE.map((line, idx) => (
              <div key={line.id} className="space-y-1">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-500 px-1">
                  <span>{line.speaker}:</span>
                  <button
                    type="button"
                    onClick={() => handlePlayLine(idx)}
                    className="text-sky-500 hover:text-sky-600 flex items-center gap-1 text-[11px]"
                  >
                    <Volume2 className="w-3 h-3" />
                    <span>Escuchar</span>
                  </button>
                </div>
                <ReversibleTextCard
                  englishText={line.text}
                  spanishText={line.translation}
                  speechRate={speed}
                  accent={accent}
                  speakerGender={line.speakerGender}
                  frontLabel={`Línea ${idx + 1} (${line.speaker})`}
                  backLabel={`Traducción (${line.speakerEs})`}
                  size="sm"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
