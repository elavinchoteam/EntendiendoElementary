import React from 'react';
import { BookOpen, CheckCircle, HelpCircle, Sparkles, Volume2 } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { ModalsCanScenePlayer } from './ModalsCanScenePlayer';
import { ReversibleTextCard } from './ReversibleTextCard';
import { speakEnglish, stopSpeaking } from '../../utils/audio';

interface Activity1ExploreProps {
  speed?: number;
  accent?: 'US' | 'UK';
}

export const Activity1Explore: React.FC<Activity1ExploreProps> = ({
  speed = 1.0,
  accent = 'US',
}) => {
  const { isDark } = useTheme();

  const handleSpeak = (text: string) => {
    stopSpeaking();
    speakEnglish(text, speed, accent, undefined, undefined, 'male');
  };

  return (
    <div className="space-y-6">
      {/* Title & Instructions Banner */}
      <div
        className={`p-5 rounded-2xl border ${
          isDark
            ? 'bg-slate-800/80 border-slate-700 text-slate-100'
            : 'bg-white border-slate-200 text-slate-800'
        } shadow-sm`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide bg-sky-100 text-sky-700 dark:bg-sky-950/70 dark:text-sky-300">
                Unidad 8 · Sección 5
              </span>
              <span className="text-xs text-slate-400">Actividad 1 de 11</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white">
              Modals: Can (Habilidad, Permiso y Posibilidad)
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Mira el video, escucha el diálogo sincronizado y explora las reglas de uso del verbo modal <span className="font-bold text-sky-600 dark:text-sky-400">can</span> y su forma negativa <span className="font-bold text-sky-600 dark:text-sky-400">can't</span>.
            </p>
          </div>
        </div>
      </div>

      {/* Main 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Scene Video & Dialogue */}
        <div className="lg:col-span-6 space-y-4">
          <ModalsCanScenePlayer speed={speed} accent={accent} />

          {/* Key dialogue card reversible */}
          <ReversibleTextCard
            englishText="- Can you open it? - No, I can't. I can't open it. - Let's ask Butch. He can do it."
            spanishText="— ¿Puedes abrirlo?\n— No, no puedo. No puedo abrirlo.\n— Preguntémosle a Butch. Él puede hacerlo."
            grammarTip="Observa que después de 'can' y 'can't', el verbo principal siempre va en infinitivo sin 'to' (open, do)."
            speechRate={speed}
            accent={accent}
            speakerGender="male"
            size="md"
          />
        </div>

        {/* Right Column: Grammar Rules & Interactive Cards */}
        <div className="lg:col-span-6 space-y-4">
          {/* Grammar Rule 1: Uses of Can */}
          <div
            className={`p-5 rounded-2xl border ${
              isDark ? 'bg-slate-800/90 border-slate-700' : 'bg-white border-slate-200'
            } shadow-sm space-y-4`}
          >
            <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-700/80 pb-3">
              <BookOpen className="w-5 h-5 text-sky-500" />
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                Usos Principales de "Can"
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div
                className={`p-3 rounded-xl border ${
                  isDark ? 'bg-slate-900/60 border-slate-700/60' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <span className="font-bold text-sky-600 dark:text-sky-400 block mb-1">
                  1. Habilidad Física / Destreza
                </span>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Para expresar lo que alguien sabe o puede hacer físicamente.
                </p>
                <div className="mt-2 text-[11px] font-mono bg-sky-50/70 dark:bg-sky-950/40 p-1.5 rounded text-sky-800 dark:text-sky-300">
                  "Peter can swim better than his brother."
                </div>
              </div>

              <div
                className={`p-3 rounded-xl border ${
                  isDark ? 'bg-slate-900/60 border-slate-700/60' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <span className="font-bold text-amber-600 dark:text-amber-400 block mb-1">
                  2. Incapacidad / Imposibilidad
                </span>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Para indicar impedimentos físicos o restricciones médicas.
                </p>
                <div className="mt-2 text-[11px] font-mono bg-amber-50/70 dark:bg-amber-950/40 p-1.5 rounded text-amber-800 dark:text-amber-300">
                  "She's sick. She can't get out of bed."
                </div>
              </div>

              <div
                className={`p-3 rounded-xl border ${
                  isDark ? 'bg-slate-900/60 border-slate-700/60' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <span className="font-bold text-emerald-600 dark:text-emerald-400 block mb-1">
                  3. Permiso o Petición Amable
                </span>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Para pedir permiso en tiendas, aulas o por teléfono.
                </p>
                <div className="mt-2 text-[11px] font-mono bg-emerald-50/70 dark:bg-emerald-950/40 p-1.5 rounded text-emerald-800 dark:text-emerald-300">
                  "Can I try this dress on?"
                </div>
              </div>

              <div
                className={`p-3 rounded-xl border ${
                  isDark ? 'bg-slate-900/60 border-slate-700/60' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <span className="font-bold text-purple-600 dark:text-purple-400 block mb-1">
                  4. Posibilidad y Horarios
                </span>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Para indicar disponibilidad o posibilidades reales.
                </p>
                <div className="mt-2 text-[11px] font-mono bg-purple-50/70 dark:bg-purple-950/40 p-1.5 rounded text-purple-800 dark:text-purple-300">
                  "She can see you at 3:00 p.m."
                </div>
              </div>
            </div>
          </div>

          {/* Grammar Rule 2: Structure Formula */}
          <div
            className={`p-5 rounded-2xl border ${
              isDark ? 'bg-slate-800/90 border-slate-700' : 'bg-white border-slate-200'
            } shadow-sm space-y-3`}
          >
            <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-700/80 pb-3">
              <Sparkles className="w-5 h-5 text-sky-500" />
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                Estructura Gramatical
              </h3>
            </div>

            <div className="space-y-2 text-xs">
              <div
                className={`p-3 rounded-xl border flex items-center justify-between ${
                  isDark ? 'bg-slate-900/60 border-slate-700/60' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 block">Afirmativo:</span>
                  <span className="font-mono text-slate-800 dark:text-slate-200">
                    Sujeto + <span className="text-sky-500 font-bold">can</span> + Verbo (forma base)
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleSpeak('They can work on them for hours.')}
                  className="p-1.5 rounded bg-sky-50 dark:bg-sky-950 text-sky-600 dark:text-sky-400"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div
                className={`p-3 rounded-xl border flex items-center justify-between ${
                  isDark ? 'bg-slate-900/60 border-slate-700/60' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div>
                  <span className="font-bold text-rose-600 dark:text-rose-400 block">Negativo:</span>
                  <span className="font-mono text-slate-800 dark:text-slate-200">
                    Sujeto + <span className="text-rose-500 font-bold">can't</span> (cannot) + Verbo base
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleSpeak("Colette can't buy a CD.")}
                  className="p-1.5 rounded bg-sky-50 dark:bg-sky-950 text-sky-600 dark:text-sky-400"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div
                className={`p-3 rounded-xl border flex items-center justify-between ${
                  isDark ? 'bg-slate-900/60 border-slate-700/60' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div>
                  <span className="font-bold text-sky-600 dark:text-sky-400 block">Pregunta:</span>
                  <span className="font-mono text-slate-800 dark:text-slate-200">
                    <span className="text-sky-500 font-bold">Can</span> + Sujeto + Verbo base...?
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleSpeak('Can David play the piano?')}
                  className="p-1.5 rounded bg-sky-50 dark:bg-sky-950 text-sky-600 dark:text-sky-400"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-xl text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
              <span className="font-bold">¡Cuidado común! </span>
              Nunca digas <span className="line-through">can to see</span> o <span className="line-through">can seeing</span>. Siempre se utiliza la forma base: <span className="font-bold text-emerald-600 dark:text-emerald-400">can see</span>.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
