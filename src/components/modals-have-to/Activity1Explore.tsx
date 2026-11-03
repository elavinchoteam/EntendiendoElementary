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
import { HaveToScenePlayer } from './HaveToScenePlayer';
import { ReversibleTextCard } from './ReversibleTextCard';
import { MODALS_HAVE_TO_DIALOGUE } from '../../data/modalsHaveToData';

interface Activity1ExploreProps {
  speed?: number;
  accent?: 'US' | 'UK';
}

export const Activity1Explore: React.FC<Activity1ExploreProps> = ({
  speed = 1.0,
  accent = 'US',
}) => {
  const { isDark } = useTheme();
  const [activeDialogueIdx, setActiveDialogueIdx] = useState(0);

  const fullDialogueEnglish = MODALS_HAVE_TO_DIALOGUE.map(
    (d) => `${d.speaker}: "${d.text}"`
  ).join('\n');

  const fullDialogueSpanish = MODALS_HAVE_TO_DIALOGUE.map(
    (d) => `${d.speakerEs}: "${d.translation}"`
  ).join('\n');

  const handlePlayLine = (idx: number) => {
    setActiveDialogueIdx(idx);
    playFeedbackSound('click');
    stopSpeaking();
    const line = MODALS_HAVE_TO_DIALOGUE[idx];
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
                Unidad 9 · Sección 5
              </span>
              <span className="text-xs text-slate-400 font-medium">
                Actividad 1 de 11: Exploración
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              Modals: Have To — Exploration & Dialogue
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Escucha la conversación entre Michael y su madre. Observa el uso de "have to" para expresar obligaciones y requisitos.
            </p>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Left side Scene Player, Right side Detailed Reversible Cards & Grammar Rules */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: HaveToScenePlayer (5 cols on lg) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <HaveToScenePlayer
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
              <span>Regla Clave: Have To</span>
            </div>
            <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 leading-relaxed">
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span>
                  <strong>I / You / We / They:</strong> have to + verbo base (ej. <em>I have to study</em>).
                </span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span>
                  <strong>He / She / It / Everyone:</strong> has to + verbo base (ej. <em>She has to help</em>).
                </span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Negativo:</strong> don't have to / doesn't have to (ausencia de obligación).
                </span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Preguntas:</strong> Do you have to...? / Does he have to...?
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
            grammarTip="Usamos 'have to' para obligaciones externas impuestas por normas, horarios o necesidad objetiva."
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
            } shadow-sm space-y-3`}
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-700">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Oraciones individuales con audio y traducción:
              </span>
              <span className="text-xs text-sky-600 dark:text-sky-400 font-medium">
                Toca para escuchar
              </span>
            </div>

            <div className="space-y-3">
              {MODALS_HAVE_TO_DIALOGUE.map((line, idx) => (
                <div
                  key={line.id}
                  onClick={() => handlePlayLine(idx)}
                  className={`cursor-pointer transition-all ${
                    activeDialogueIdx === idx ? 'ring-2 ring-sky-500 rounded-2xl' : ''
                  }`}
                >
                  <ReversibleTextCard
                    englishText={`${line.speaker}: "${line.text}"`}
                    spanishText={`${line.speakerEs}: "${line.translation}"`}
                    speakerGender={line.speakerGender}
                    speechRate={speed}
                    accent={accent}
                    frontLabel={`${line.speaker} (${line.speakerEs})`}
                    backLabel="Español"
                    size="sm"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
