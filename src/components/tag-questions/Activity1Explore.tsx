import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { TagQuestionsScenePlayer } from './TagQuestionsScenePlayer';
import { ReversibleTextCard } from './ReversibleTextCard';
import { Sparkles, HelpCircle, ArrowRightLeft } from 'lucide-react';

interface Activity1ExploreProps {
  speed: number;
  accent?: 'US' | 'UK';
}

export const Activity1Explore: React.FC<Activity1ExploreProps> = ({
  speed,
  accent = 'US',
}) => {
  const { isDark } = useTheme();

  return (
    <div className="w-full flex flex-col gap-5 animate-in fade-in duration-200">
      {/* 1. Instruction Card: Reversible */}
      <ReversibleTextCard
        textEn="Watch the scene and discover how Tag Questions (Task Questions) are formed in the Present Simple."
        textEs="Mira la escena y descubre cómo se forman las preguntas coletilla (Tag Questions) en Present Simple."
        speed={speed}
        accent={accent}
      />

      {/* 2. Main Two-Column Layout */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Scene Player with Image & Timeline Controls & Transcript */}
        <div className="lg:col-span-6">
          <TagQuestionsScenePlayer
            speed={speed}
            accent={accent}
            highlightedLineId="turn-1"
            showTranscriptInitially={true}
          />
        </div>

        {/* Right Column: Exploration Cards for Tag Questions Rules */}
        <div className="lg:col-span-6 flex flex-col gap-3.5">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400">
                <ArrowRightLeft className="w-4 h-4" />
              </span>
              <h3 className="text-sm font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 font-mono">
                Reglas Gramaticales: Tag Questions
              </h3>
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Toca 🔄 para voltear
            </span>
          </div>

          <div className="space-y-3">
            {/* Rule 1: Positive Statement -> Negative Tag */}
            <ReversibleTextCard
              speaker="Regla 1: Frase (+) &rarr; Tag (-)"
              textEn="You cut your own hair, don't you? It looks nice, doesn't it?"
              textEs="Te cortas tu propio cabello, ¿verdad? Se ve bien, ¿no es así? (Oración afirmativa usa tag negativo con don't/doesn't)."
              speed={speed}
              accent={accent}
              minHeightClass="min-h-[78px]"
              className="hover:border-sky-300 dark:hover:border-sky-600 transition-colors shadow-xs"
            />

            {/* Rule 2: Negative Statement -> Positive Tag */}
            <ReversibleTextCard
              speaker="Regla 2: Frase (-) &rarr; Tag (+)"
              textEn="You don't eat meat, do you? They don't lose luggage, do they?"
              textEs="No comes carne, ¿verdad? Ellos no pierden equipaje, ¿verdad? (Oración negativa con don't usa tag afirmativo con do/does)."
              speed={speed}
              accent={accent}
              minHeightClass="min-h-[78px]"
              className="hover:border-sky-300 dark:hover:border-sky-600 transition-colors shadow-xs"
            />

            {/* Rule 3: 3rd person singular (he/she/it) */}
            <ReversibleTextCard
              speaker="Regla 3: 3ª Persona (he / she / it)"
              textEn="She rents it, doesn't she? Your father smokes, doesn't he?"
              textEs="Ella lo alquila, ¿no es así? Tu padre fuma, ¿verdad? (Con he/she/it usamos doesn't en afirmativas y does en negativas)."
              speed={speed}
              accent={accent}
              minHeightClass="min-h-[78px]"
              className="hover:border-sky-300 dark:hover:border-sky-600 transition-colors shadow-xs"
            />

            {/* Rule 4: Action verbs vs to be */}
            <ReversibleTextCard
              speaker="Regla 4: Verbos de Acción (Auxiliar Do / Does)"
              textEn="I look like her, don't I? You live in L.A., don't you?"
              textEs="Me parezco a ella, ¿verdad? Vives en Los Ángeles, ¿no es así? (Siempre usamos el auxiliar do/does/don't/doesn't para verbos comunes)."
              speed={speed}
              accent={accent}
              minHeightClass="min-h-[78px]"
              className="hover:border-sky-300 dark:hover:border-sky-600 transition-colors shadow-xs"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
