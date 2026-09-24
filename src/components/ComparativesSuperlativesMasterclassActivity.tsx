import React, { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  BookOpen,
  CheckSquare,
  HelpCircle,
  Sparkles,
  Check,
  RotateCcw,
  Trophy,
  Swords,
  Eye,
  EyeOff,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { CardSpeechControl } from './CardSpeechControl';
import {
  COMPARATIVES_SUPERLATIVES_THEORY_TOPICS,
  COMPARATIVES_SUPERLATIVES_EX1_ITEMS,
  COMPARATIVES_SUPERLATIVES_EX2_ITEMS,
  COMPARATIVES_SUPERLATIVES_BATTLES,
  COMPARATIVES_SUPERLATIVES_EX4_ITEMS,
  SPORTS_STARS_COMPARISONS,
} from '../data/comparativesSuperlativesMasterclassData';

interface ComparativesSuperlativesMasterclassActivityProps {
  accent?: 'US' | 'UK';
  speechRate?: number;
  onSuccess?: () => void;
}

type TabType = 'theory' | 'ex1' | 'ex2' | 'ex3' | 'ex4' | 'ex5' | 'answers';

export const ComparativesSuperlativesMasterclassActivity: React.FC<
  ComparativesSuperlativesMasterclassActivityProps
> = ({ accent = 'US', speechRate = 1.0, onSuccess }) => {
  const { isDark } = useTheme();

  // Active navigation tab
  const [activeTab, setActiveTab] = useState<TabType>('theory');

  // Flip states for reversible cards
  const [flippedTheory, setFlippedTheory] = useState<Record<string, boolean>>({});
  const [flippedEx1, setFlippedEx1] = useState<Record<string, boolean>>({});
  const [flippedEx2, setFlippedEx2] = useState<Record<string, boolean>>({});
  const [flippedEx3, setFlippedEx3] = useState<Record<string, boolean>>({});
  const [flippedEx4, setFlippedEx4] = useState<Record<string, boolean>>({});
  const [flippedEx5, setFlippedEx5] = useState<Record<string, boolean>>({});

  // Exercise 1 states
  const [ex1Answers, setEx1Answers] = useState<Record<string, string>>({});

  // Exercise 2 states (Find the mistake)
  const [ex2Inputs, setEx2Inputs] = useState<Record<string, string>>({});
  const [ex2Checked, setEx2Checked] = useState<Record<string, boolean>>({});
  const [ex2Revealed, setEx2Revealed] = useState<Record<string, boolean>>({});

  // Exercise 3 states (The Battle)
  const [battleInputs, setBattleInputs] = useState<Record<string, string>>({});

  // Exercise 4 states (Complete the sentences)
  const [ex4Inputs, setEx4Inputs] = useState<Record<string, string>>({});
  const [ex4Checked, setEx4Checked] = useState<Record<string, boolean>>({});
  const [ex4Revealed, setEx4Revealed] = useState<Record<string, boolean>>({});

  // Exercise 5 states (Sports Battle)
  const [sportsInputs, setSportsInputs] = useState<Record<string, string>>({});

  const toggleFlip = (
    id: string,
    setMap: React.Dispatch<React.SetStateAction<Record<string, boolean>>>
  ) => {
    setMap((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Helper to normalize strings for comparison
  const normalize = (str: string) =>
    str
      .trim()
      .toLowerCase()
      .replace(/[.,/#!$%^&*;:{}=\-_`~()?'"]/g, '')
      .replace(/\s+/g, ' ');

  // Calculate Ex 1 Score
  const ex1Score = COMPARATIVES_SUPERLATIVES_EX1_ITEMS.filter(
    (item) => ex1Answers[item.id] === item.correctAnswer
  ).length;

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Top Header / Unit Title */}
      <div
        className={`p-6 rounded-3xl border shadow-xs transition-colors ${
          isDark
            ? 'bg-slate-900 border-white/10 text-white'
            : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-sky-500/15 border border-sky-500/30 text-sky-600 dark:text-sky-400">
                Unit 4 · Section 1
              </span>
              <span className="text-xs font-mono opacity-60">Grammar Masterclass</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
              COMPARATIVES AND SUPERLATIVES
            </h2>
            <p className="text-sm opacity-80 mt-1 max-w-3xl">
              Domina las reglas de adjetivos cortos, adjetivos terminados en -y, adjetivos largos,
              formas irregulares y comparaciones de igualdad con explicaciones detalladas bilingües,
              tarjetas reversibles con audio interactivo y 5 ejercicios prácticos.
            </p>
          </div>

          {/* Header Audio Controller */}
          <div className="shrink-0 flex items-center gap-2 bg-slate-50 dark:bg-slate-800/80 p-2 rounded-2xl border border-inherit/20">
            <CardSpeechControl
              textToSpeak="Comparatives and superlatives. We use comparatives to compare two people, things or places. We use superlatives to compare three or more people, things or places."
              accent={accent}
              initialSpeed={speechRate}
            />
          </div>
        </div>

        {/* Section Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-5 border-t border-inherit/15 mt-5">
          <button
            type="button"
            onClick={() => setActiveTab('theory')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 border ${
              activeTab === 'theory'
                ? 'bg-sky-600 text-white border-sky-500 shadow-xs'
                : isDark
                ? 'bg-slate-800/70 border-white/10 text-slate-300 hover:bg-slate-800'
                : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200/80'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Explicación y Reglas</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('ex1')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 border ${
              activeTab === 'ex1'
                ? 'bg-sky-600 text-white border-sky-500 shadow-xs'
                : isDark
                ? 'bg-slate-800/70 border-white/10 text-slate-300 hover:bg-slate-800'
                : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200/80'
            }`}
          >
            <CheckSquare className="w-3.5 h-3.5" />
            <span>Ejercicio 1 (Choose Answer)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('ex2')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 border ${
              activeTab === 'ex2'
                ? 'bg-sky-600 text-white border-sky-500 shadow-xs'
                : isDark
                ? 'bg-slate-800/70 border-white/10 text-slate-300 hover:bg-slate-800'
                : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200/80'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ejercicio 2 (Find Mistake)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('ex3')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 border ${
              activeTab === 'ex3'
                ? 'bg-sky-600 text-white border-sky-500 shadow-xs'
                : isDark
                ? 'bg-slate-800/70 border-white/10 text-slate-300 hover:bg-slate-800'
                : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200/80'
            }`}
          >
            <Swords className="w-3.5 h-3.5" />
            <span>Ejercicio 3 (The Battle)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('ex4')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 border ${
              activeTab === 'ex4'
                ? 'bg-sky-600 text-white border-sky-500 shadow-xs'
                : isDark
                ? 'bg-slate-800/70 border-white/10 text-slate-300 hover:bg-slate-800'
                : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200/80'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Ejercicio 4 (Complete)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('ex5')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 border ${
              activeTab === 'ex5'
                ? 'bg-sky-600 text-white border-sky-500 shadow-xs'
                : isDark
                ? 'bg-slate-800/70 border-white/10 text-slate-300 hover:bg-slate-800'
                : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200/80'
            }`}
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>Ejercicio 5 (Sports Stars)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('answers')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 border ${
              activeTab === 'answers'
                ? 'bg-sky-600 text-white border-sky-500 shadow-xs'
                : isDark
                ? 'bg-slate-800/70 border-white/10 text-slate-300 hover:bg-slate-800'
                : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200/80'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Guía Rápida y Respuestas</span>
          </button>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* TAB 1: THEORY TOPICS IN REVERSIBLE CARDS WITH AUDIO */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'theory' && (
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {COMPARATIVES_SUPERLATIVES_THEORY_TOPICS.map((topic) => {
              const isFlipped = !!flippedTheory[topic.id];

              return (
                <div
                  key={topic.id}
                  id={`theory-card-${topic.id}`}
                  onClick={() => toggleFlip(topic.id, setFlippedTheory)}
                  className={`rounded-3xl border p-5 sm:p-6 transition-all duration-200 cursor-pointer shadow-xs flex flex-col justify-between select-none ${
                    isFlipped
                      ? isDark
                        ? 'bg-slate-900 border-sky-500/60 ring-2 ring-sky-500/20 text-white'
                        : 'bg-white border-sky-500 ring-2 ring-sky-400/20 text-slate-900 shadow-md'
                      : isDark
                      ? 'bg-slate-900 border-white/10 hover:border-slate-700 text-white'
                      : 'bg-white border-slate-200 hover:border-slate-300 text-slate-900'
                  }`}
                >
                  <div>
                    {/* Top Row: Category tag and speech control */}
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-sky-600 dark:text-sky-400 border border-slate-200 dark:border-white/10">
                        {isFlipped ? topic.categoryEs : topic.category}
                      </span>

                      <CardSpeechControl
                        textToSpeak={`${topic.titleEn}. ${topic.textEn}. ${topic.examples
                          .map((ex) => ex.en)
                          .join('. ')}`}
                        accent={accent}
                        initialSpeed={speechRate}
                      />
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold tracking-tight mb-2">
                      {isFlipped ? topic.titleEs : topic.titleEn}
                    </h3>

                    {/* Formula Pill if available */}
                    {(topic.formulaEn || topic.formulaEs) && (
                      <div className="inline-block px-3 py-1 rounded-xl text-xs font-mono font-semibold mb-3 bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-900/50">
                        {isFlipped ? topic.formulaEs : topic.formulaEn}
                      </div>
                    )}

                    {/* Detailed explanation */}
                    <p className="text-sm leading-relaxed mb-4 opacity-90">
                      {isFlipped ? topic.textEs : topic.textEn}
                    </p>

                    {/* Examples List */}
                    <div className="flex flex-col gap-2 mb-4">
                      {topic.examples.map((ex, idx) => (
                        <div
                          key={idx}
                          className="p-2.5 rounded-xl border text-xs bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-white/10 flex items-start justify-between gap-2"
                        >
                          <div className="flex-1">
                            <p className="font-semibold text-sm">
                              {isFlipped ? ex.es : ex.en}
                            </p>
                            {(isFlipped ? ex.noteEs : ex.noteEn) && (
                              <p className="opacity-70 mt-0.5 text-[11px]">
                                {isFlipped ? ex.noteEs : ex.noteEn}
                              </p>
                            )}
                          </div>
                          <CardSpeechControl
                            textToSpeak={ex.en}
                            accent={accent}
                            initialSpeed={speechRate}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Grammar Tip at bottom */}
                  <div className="pt-3 border-t border-inherit/15 text-xs">
                    <p className="italic opacity-80">
                      {isFlipped ? topic.grammarTipEs : topic.grammarTipEn}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 2: EXERCISE 1 — CHOOSE THE CORRECT ANSWER (8 Items) */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'ex1' && (
        <div className="flex flex-col gap-5">
          <div
            className={`p-4 rounded-2xl border ${
              isDark ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base">EXERCISE 1 – CHOOSE THE CORRECT ANSWER</h3>
                <p className="text-xs opacity-75 mt-0.5">
                  Aciertos: {ex1Score} / {COMPARATIVES_SUPERLATIVES_EX1_ITEMS.length}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setEx1Answers({})}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 border cursor-pointer ${
                  isDark ? 'bg-white/5 border-white/10' : 'bg-slate-100 border-slate-200'
                }`}
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reiniciar</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {COMPARATIVES_SUPERLATIVES_EX1_ITEMS.map((item) => {
              const isFlipped = !!flippedEx1[item.id];
              const selected = ex1Answers[item.id];
              const isAnswered = selected !== undefined;
              const isCorrect = selected === item.correctAnswer;

              return (
                <div
                  key={item.id}
                  id={`ex1-card-${item.id}`}
                  onClick={() => toggleFlip(item.id, setFlippedEx1)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between select-none ${
                    isFlipped
                      ? isDark
                        ? 'bg-slate-900 border-sky-500/60 ring-2 ring-sky-500/20 text-white'
                        : 'bg-white border-sky-500 ring-2 ring-sky-400/20 text-slate-900 shadow-md'
                      : isDark
                      ? 'bg-slate-900 border-white/10 hover:border-slate-700 text-white'
                      : 'bg-white border-slate-200 hover:border-slate-300 text-slate-900'
                  }`}
                >
                  <div>
                    {/* Top Row: Question number & audio */}
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <span className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400">
                        #{item.number}
                      </span>
                      <CardSpeechControl
                        textToSpeak={item.questionEn.replace('______', item.correctAnswer)}
                        accent={accent}
                        initialSpeed={speechRate}
                      />
                    </div>

                    {/* Question text */}
                    <p className="text-sm font-bold mb-3">
                      {isFlipped ? item.questionEs : item.questionEn}
                    </p>

                    {/* Options */}
                    <div
                      className="grid grid-cols-1 gap-2 mb-3"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {item.options.map((opt) => {
                        const isChosen = selected === opt.text;
                        return (
                          <button
                            key={opt.key}
                            type="button"
                            onClick={() =>
                              setEx1Answers((prev) => ({
                                ...prev,
                                [item.id]: opt.text,
                              }))
                            }
                            className={`p-2.5 rounded-xl border text-xs font-medium text-left flex items-center justify-between transition-all cursor-pointer ${
                              isChosen
                                ? opt.isCorrect
                                  ? 'bg-emerald-500/15 border-emerald-500 text-emerald-700 dark:text-emerald-300 font-bold'
                                  : 'bg-rose-500/15 border-rose-500 text-rose-700 dark:text-rose-300 font-bold'
                                : isDark
                                ? 'bg-slate-800/70 border-white/10 hover:bg-slate-800'
                                : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            <span>
                              <span className="font-mono uppercase mr-2 opacity-70">
                                {opt.key})
                              </span>
                              {opt.text}
                            </span>
                            {isChosen &&
                              (opt.isCorrect ? (
                                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                              ) : (
                                <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                              ))}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Feedback explanation */}
                  {isAnswered && (
                    <div
                      className={`p-2.5 rounded-xl text-xs border ${
                        isCorrect
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300'
                          : 'bg-amber-500/10 border-amber-500/30 text-amber-700 dark:text-amber-300'
                      }`}
                    >
                      <p className="font-semibold">
                        {isFlipped ? item.explanationEs : item.explanationEn}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 3: EXERCISE 2 — FIND THE MISTAKE (8 Items) */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'ex2' && (
        <div className="flex flex-col gap-5">
          <div
            className={`p-4 rounded-2xl border ${
              isDark ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base">EXERCISE 2 – FIND THE MISTAKE</h3>
                <p className="text-xs opacity-75 mt-0.5">
                  Escribe la oración corregida y pulsa "Verificar" o pulsa el ojo para ver la solución.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setEx2Inputs({});
                  setEx2Checked({});
                  setEx2Revealed({});
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 border cursor-pointer ${
                  isDark ? 'bg-white/5 border-white/10' : 'bg-slate-100 border-slate-200'
                }`}
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reiniciar</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {COMPARATIVES_SUPERLATIVES_EX2_ITEMS.map((item) => {
              const isFlipped = !!flippedEx2[item.id];
              const userInput = ex2Inputs[item.id] || '';
              const isChecked = !!ex2Checked[item.id];
              const isRevealed = !!ex2Revealed[item.id];
              const isMatch = normalize(userInput) === normalize(item.correctSentenceEn);

              return (
                <div
                  key={item.id}
                  id={`ex2-card-${item.id}`}
                  onClick={() => toggleFlip(item.id, setFlippedEx2)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between select-none ${
                    isFlipped
                      ? isDark
                        ? 'bg-slate-900 border-sky-500/60 ring-2 ring-sky-500/20 text-white'
                        : 'bg-white border-sky-500 ring-2 ring-sky-400/20 text-slate-900 shadow-md'
                      : isDark
                      ? 'bg-slate-900 border-white/10 hover:border-slate-700 text-white'
                      : 'bg-white border-slate-200 hover:border-slate-300 text-slate-900'
                  }`}
                >
                  <div>
                    {/* Top Row: # and Audio of the correct sentence */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400">
                        #{item.number}
                      </span>
                      <CardSpeechControl
                        textToSpeak={item.correctSentenceEn}
                        accent={accent}
                        initialSpeed={speechRate}
                      />
                    </div>

                    {/* Incorrect Sentence with highlight */}
                    <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 mb-3">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-rose-600 dark:text-rose-400 font-bold block mb-1">
                        {isFlipped ? 'Oración con error:' : 'Sentence with error:'}
                      </span>
                      <p className="text-sm font-semibold line-through decoration-rose-500 text-slate-800 dark:text-slate-100">
                        {isFlipped ? item.incorrectSentenceEs : item.incorrectSentenceEn}
                      </p>
                      <p className="text-xs text-rose-700 dark:text-rose-300 mt-1">
                        {isFlipped ? `Error: ${item.mistakeEs}` : `Mistake: ${item.mistakeEn}`}
                      </p>
                    </div>

                    {/* Interactive Input Form */}
                    <div className="flex flex-col gap-2 mb-3" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={userInput}
                          placeholder="Type the corrected sentence..."
                          onChange={(e) => {
                            const val = e.target.value;
                            setEx2Inputs((prev) => ({ ...prev, [item.id]: val }));
                          }}
                          className={`flex-1 px-3 py-2 rounded-xl text-xs border outline-hidden transition-all ${
                            isChecked
                              ? isMatch
                                ? 'border-emerald-500 bg-emerald-500/10 text-emerald-800 dark:text-emerald-200'
                                : 'border-rose-500 bg-rose-500/10 text-rose-800 dark:text-rose-200'
                              : isDark
                              ? 'bg-slate-800 border-white/10 text-white focus:border-sky-500'
                              : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-sky-500'
                          }`}
                        />

                        {/* Reveal Eye Button */}
                        <button
                          type="button"
                          onClick={() =>
                            setEx2Revealed((prev) => ({ ...prev, [item.id]: !prev[item.id] }))
                          }
                          title={isRevealed ? 'Ocultar solución' : 'Ver solución'}
                          className={`w-9 h-9 rounded-xl flex items-center justify-center border cursor-pointer transition-all ${
                            isRevealed
                              ? 'bg-sky-600 text-white border-sky-600'
                              : isDark
                              ? 'bg-slate-800 border-white/10 text-slate-300 hover:text-white'
                              : 'bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          {isRevealed ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>

                        {/* Check button */}
                        <button
                          type="button"
                          onClick={() => {
                            setEx2Checked((prev) => ({ ...prev, [item.id]: true }));
                          }}
                          className="px-3 py-2 rounded-xl text-xs font-semibold bg-sky-600 hover:bg-sky-500 text-white cursor-pointer transition-all"
                        >
                          Verificar
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Revealed Solution or Checked Feedback */}
                  {(isRevealed || isChecked) && (
                    <div
                      className={`p-3 rounded-xl border text-xs ${
                        isChecked && isMatch
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-800 dark:text-emerald-200'
                          : 'bg-slate-100 dark:bg-slate-800/80 border-slate-200 dark:border-white/10'
                      }`}
                    >
                      <p className="font-bold text-sm text-emerald-600 dark:text-emerald-400 mb-0.5">
                        {isFlipped ? item.correctSentenceEs : item.correctSentenceEn}
                      </p>
                      <p className="opacity-80 text-[11px]">
                        {isFlipped ? item.explanationEs : item.explanationEn}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 4: EXERCISE 3 — THE BATTLE (3 Pairs with Models & Audio) */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'ex3' && (
        <div className="flex flex-col gap-6">
          <div
            className={`p-4 rounded-2xl border ${
              isDark ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-200'
            }`}
          >
            <h3 className="font-bold text-base">EXERCISE 3 – THE BATTLE</h3>
            <p className="text-xs opacity-75 mt-0.5">
              Elige dos cosas y compáralas. Revisa los ejemplos con audio y practica tus oraciones.
            </p>
          </div>

          {/* Example Box from Prompt */}
          <div
            className={`p-5 rounded-2xl border ${
              isDark
                ? 'bg-slate-900 border-white/10 text-white'
                : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-sky-600 dark:text-sky-400 border border-slate-200 dark:border-white/10">
                Example: A car / a bicycle
              </span>
              <CardSpeechControl
                textToSpeak="A car is faster than a bicycle. A bicycle is cheaper than a car. A car is more comfortable than a bicycle."
                accent={accent}
                initialSpeed={speechRate}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-white/10 text-xs">
                <p className="font-bold text-sm">A car is faster than a bicycle.</p>
                <p className="text-[11px] opacity-75 mt-0.5">Un auto es más rápido que una bicicleta.</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-white/10 text-xs">
                <p className="font-bold text-sm">A bicycle is cheaper than a car.</p>
                <p className="text-[11px] opacity-75 mt-0.5">Una bicicleta es más barata que un auto.</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-white/10 text-xs">
                <p className="font-bold text-sm">A car is more comfortable than a bicycle.</p>
                <p className="text-[11px] opacity-75 mt-0.5">Un auto es más cómodo que una bicicleta.</p>
              </div>
            </div>
          </div>

          {/* Battles A, B, C */}
          <div className="flex flex-col gap-5">
            {COMPARATIVES_SUPERLATIVES_BATTLES.map((battle) => {
              const isFlipped = !!flippedEx3[battle.id];
              const userInput = battleInputs[battle.id] || '';

              return (
                <div
                  key={battle.id}
                  id={`battle-card-${battle.id}`}
                  onClick={() => toggleFlip(battle.id, setFlippedEx3)}
                  className={`p-6 rounded-3xl border transition-all cursor-pointer shadow-xs select-none ${
                    isFlipped
                      ? isDark
                        ? 'bg-slate-900 border-sky-500/60 ring-2 ring-sky-500/20 text-white'
                        : 'bg-white border-sky-500 ring-2 ring-sky-400/20 text-slate-900 shadow-md'
                      : isDark
                      ? 'bg-slate-900 border-white/10 hover:border-slate-700 text-white'
                      : 'bg-white border-slate-200 hover:border-slate-300 text-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded-xl font-bold font-mono text-sm bg-sky-600 text-white flex items-center justify-center">
                        {battle.letter}
                      </span>
                      <h4 className="text-lg font-bold">
                        {isFlipped ? battle.pairEs : battle.pairEn}
                      </h4>
                    </div>
                    <CardSpeechControl
                      textToSpeak={battle.modelSentences.map((s) => s.en).join('. ')}
                      accent={accent}
                      initialSpeed={speechRate}
                    />
                  </div>

                  <p className="text-xs opacity-80 mb-4">
                    {isFlipped ? battle.promptEs : battle.promptEn}
                  </p>

                  {/* Model sentences in clean cards with audio */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                    {battle.modelSentences.map((model, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-2xl border text-xs bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-white/10 flex items-start justify-between gap-2"
                      >
                        <div className="flex-1">
                          <p className="font-semibold text-sm">
                            {isFlipped ? model.es : model.en}
                          </p>
                          <p className="text-[11px] opacity-70 mt-1">
                            {isFlipped ? model.focusEs : model.focusEn}
                          </p>
                        </div>
                        <CardSpeechControl
                          textToSpeak={model.en}
                          accent={accent}
                          initialSpeed={speechRate}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Practice Input Box */}
                  <div className="mt-3 pt-3 border-t border-inherit/15" onClick={(e) => e.stopPropagation()}>
                    <label className="block text-xs font-semibold mb-1.5 opacity-80">
                      {isFlipped
                        ? 'Escribe tus propias comparaciones:'
                        : 'Write your own comparisons:'}
                    </label>
                    <textarea
                      rows={3}
                      value={userInput}
                      onChange={(e) => {
                        const val = e.target.value;
                        setBattleInputs((prev) => ({ ...prev, [battle.id]: val }));
                      }}
                      placeholder={
                        isFlipped
                          ? 'Ejemplo: Coffee is warmer than tea...'
                          : 'Example: Coffee is warmer than tea...'
                      }
                      className={`w-full p-3 rounded-xl text-xs border outline-hidden transition-all resize-none ${
                        isDark
                          ? 'bg-slate-800 border-white/10 text-white focus:border-sky-500'
                          : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-sky-500'
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 5: EXERCISE 4 — COMPLETE THE SENTENCES (10 Items) */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'ex4' && (
        <div className="flex flex-col gap-5">
          <div
            className={`p-4 rounded-2xl border ${
              isDark ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base">EXERCISE 4 – COMPLETE THE SENTENCES</h3>
                <p className="text-xs opacity-75 mt-0.5">
                  Completa cada oración usando la forma comparativa o superlativa adecuada.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setEx4Inputs({});
                  setEx4Checked({});
                  setEx4Revealed({});
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 border cursor-pointer ${
                  isDark ? 'bg-white/5 border-white/10' : 'bg-slate-100 border-slate-200'
                }`}
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reiniciar</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {COMPARATIVES_SUPERLATIVES_EX4_ITEMS.map((item) => {
              const isFlipped = !!flippedEx4[item.id];
              const userInput = ex4Inputs[item.id] || '';
              const isChecked = !!ex4Checked[item.id];
              const isRevealed = !!ex4Revealed[item.id];
              const isMatch =
                normalize(userInput) === normalize(item.correctAnswer) ||
                (item.acceptableAnswers &&
                  item.acceptableAnswers.some((a) => normalize(a) === normalize(userInput)));

              return (
                <div
                  key={item.id}
                  id={`ex4-card-${item.id}`}
                  onClick={() => toggleFlip(item.id, setFlippedEx4)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between select-none ${
                    isFlipped
                      ? isDark
                        ? 'bg-slate-900 border-sky-500/60 ring-2 ring-sky-500/20 text-white'
                        : 'bg-white border-sky-500 ring-2 ring-sky-400/20 text-slate-900 shadow-md'
                      : isDark
                      ? 'bg-slate-900 border-white/10 hover:border-slate-700 text-white'
                      : 'bg-white border-slate-200 hover:border-slate-300 text-slate-900'
                  }`}
                >
                  <div>
                    {/* Top Row: # and audio */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400">
                        #{item.number}
                      </span>
                      <CardSpeechControl
                        textToSpeak={item.fullSentenceEn}
                        accent={accent}
                        initialSpeed={speechRate}
                      />
                    </div>

                    {/* Sentence Prompt */}
                    <div className="mb-3">
                      <p className="text-sm font-semibold mb-1">
                        {isFlipped ? (
                          item.fullSentenceEs
                        ) : (
                          <span>
                            {item.sentenceBefore}{' '}
                            <span className="underline decoration-sky-500 font-mono font-bold px-1">
                              {userInput || '__________'}
                            </span>{' '}
                            {item.sentenceAfter}
                          </span>
                        )}
                      </p>
                      <span className="text-xs font-mono opacity-70">
                        Adjective: ({item.baseAdjective})
                      </span>
                    </div>

                    {/* Interactive Input Form */}
                    <div className="flex items-center gap-2 mb-3" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="text"
                        value={userInput}
                        placeholder={item.baseAdjective}
                        onChange={(e) => {
                          const val = e.target.value;
                          setEx4Inputs((prev) => ({ ...prev, [item.id]: val }));
                        }}
                        className={`flex-1 px-3 py-2 rounded-xl text-xs border outline-hidden transition-all ${
                          isChecked
                            ? isMatch
                              ? 'border-emerald-500 bg-emerald-500/10 text-emerald-800 dark:text-emerald-200 font-bold'
                              : 'border-rose-500 bg-rose-500/10 text-rose-800 dark:text-rose-200 font-bold'
                            : isDark
                            ? 'bg-slate-800 border-white/10 text-white focus:border-sky-500'
                            : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-sky-500'
                        }`}
                      />

                      {/* Eye button */}
                      <button
                        type="button"
                        onClick={() =>
                          setEx4Revealed((prev) => ({ ...prev, [item.id]: !prev[item.id] }))
                        }
                        title={isRevealed ? 'Ocultar respuesta' : 'Ver respuesta'}
                        className={`w-9 h-9 rounded-xl flex items-center justify-center border cursor-pointer transition-all ${
                          isRevealed
                            ? 'bg-sky-600 text-white border-sky-600'
                            : isDark
                            ? 'bg-slate-800 border-white/10 text-slate-300 hover:text-white'
                            : 'bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {isRevealed ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>

                      {/* Check button */}
                      <button
                        type="button"
                        onClick={() => {
                          setEx4Checked((prev) => ({ ...prev, [item.id]: true }));
                        }}
                        className="px-3 py-2 rounded-xl text-xs font-semibold bg-sky-600 hover:bg-sky-500 text-white cursor-pointer transition-all"
                      >
                        Verificar
                      </button>
                    </div>
                  </div>

                  {/* Feedback explanation */}
                  {(isRevealed || isChecked) && (
                    <div
                      className={`p-3 rounded-xl border text-xs ${
                        isChecked && isMatch
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-800 dark:text-emerald-200'
                          : 'bg-slate-100 dark:bg-slate-800/80 border-slate-200 dark:border-white/10'
                      }`}
                    >
                      <p className="font-bold text-sm text-emerald-600 dark:text-emerald-400 mb-0.5">
                        {item.correctAnswer}
                      </p>
                      <p className="opacity-80 text-[11px]">
                        {isFlipped ? item.explanationEs : item.explanationEn}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 6: EXERCISE 5 — SPORTS STARS & EQUALITY COMPARISONS */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'ex5' && (
        <div className="flex flex-col gap-6">
          <div
            className={`p-4 rounded-2xl border ${
              isDark ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base">EXERCISE 5 – THE SPORTS STARS BATTLE</h3>
                <p className="text-xs opacity-75 mt-0.5">
                  Practica oraciones comparativas, de igualdad y de igualdad negativa con audio y tarjetas reversibles.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            {SPORTS_STARS_COMPARISONS.map((sports) => {
              const isFlipped = !!flippedEx5[sports.id];
              const userInput = sportsInputs[sports.id] || '';

              return (
                <div
                  key={sports.id}
                  id={`sports-card-${sports.id}`}
                  onClick={() => toggleFlip(sports.id, setFlippedEx5)}
                  className={`p-6 rounded-3xl border transition-all cursor-pointer shadow-xs select-none ${
                    isFlipped
                      ? isDark
                        ? 'bg-slate-900 border-sky-500/60 ring-2 ring-sky-500/20 text-white'
                        : 'bg-white border-sky-500 ring-2 ring-sky-400/20 text-slate-900 shadow-md'
                      : isDark
                      ? 'bg-slate-900 border-white/10 hover:border-slate-700 text-white'
                      : 'bg-white border-slate-200 hover:border-slate-300 text-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                      <h4 className="text-lg font-bold">
                        {isFlipped ? sports.titleEs : sports.titleEn}
                      </h4>
                    </div>
                    <CardSpeechControl
                      textToSpeak={sports.examples.map((e) => e.en).join('. ')}
                      accent={accent}
                      initialSpeed={speechRate}
                    />
                  </div>

                  <p className="text-xs opacity-80 mb-4">
                    {isFlipped ? sports.promptEs : sports.promptEn}
                  </p>

                  {/* 3 Model Types */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                    {sports.examples.map((ex, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-2xl border text-xs bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-white/10 flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="px-2 py-0.5 rounded-md font-mono text-[10px] font-bold uppercase bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200">
                              {ex.type === 'comparative'
                                ? '• Comparative'
                                : ex.type === 'equality'
                                ? '• Equality'
                                : '• Neg. Equality'}
                            </span>
                            <CardSpeechControl
                              textToSpeak={ex.en}
                              accent={accent}
                              initialSpeed={speechRate}
                              size="sm"
                            />
                          </div>
                          <p className="font-semibold text-sm mb-1">
                            {isFlipped ? ex.es : ex.en}
                          </p>
                        </div>
                        <p className="text-[11px] opacity-70 mt-2 pt-2 border-t border-inherit/10">
                          {isFlipped ? ex.explanationEs : ex.explanationEn}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Practice writing field */}
                  <div className="mt-3 pt-3 border-t border-inherit/15" onClick={(e) => e.stopPropagation()}>
                    <label className="block text-xs font-semibold mb-1.5 opacity-80">
                      {isFlipped
                        ? 'Escribe tus 3 oraciones de comparación (comparativa, igualdad, igualdad negativa):'
                        : 'Write your 3 comparison sentences (comparative, equality, negative equality):'}
                    </label>
                    <textarea
                      rows={3}
                      value={userInput}
                      onChange={(e) => {
                        const val = e.target.value;
                        setSportsInputs((prev) => ({ ...prev, [sports.id]: val }));
                      }}
                      placeholder={
                        isFlipped
                          ? '1. Messi is faster than...\n2. Messi is as famous as...\n3. CR7 isn\'t as...'
                          : '1. Messi is faster than...\n2. Messi is as famous as...\n3. CR7 isn\'t as...'
                      }
                      className={`w-full p-3 rounded-xl text-xs border outline-hidden transition-all resize-none ${
                        isDark
                          ? 'bg-slate-800 border-white/10 text-white focus:border-sky-500'
                          : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-sky-500'
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 7: QUICK GUIDE & ANSWERS */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'answers' && (
        <div className="flex flex-col gap-6">
          <div
            className={`p-6 rounded-3xl border ${
              isDark ? 'bg-slate-900 border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold">Guía Rápida y Tabla Resumen</h3>
                <p className="text-xs opacity-75">
                  Reglas gramaticales completas y soluciones de todos los ejercicios.
                </p>
              </div>
              <CardSpeechControl
                textToSpeak="Summary guide of comparatives and superlatives. Fast, faster, the fastest. Easy, easier, the easiest. Expensive, more expensive, the most expensive. Good, better, the best. Bad, worse, the worst."
                accent={accent}
                initialSpeed={speechRate}
              />
            </div>

            {/* Rules Summary Table */}
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="border-b border-inherit/20 bg-slate-50 dark:bg-slate-800/70">
                    <th className="p-3 font-bold">Tipo de Adjetivo</th>
                    <th className="p-3 font-bold">Adjetivo Base</th>
                    <th className="p-3 font-bold">Comparativo (+ THAN)</th>
                    <th className="p-3 font-bold">Superlativo (THE + ...)</th>
                    <th className="p-3 font-bold">Ejemplo</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-inherit/10">
                  <tr>
                    <td className="p-3 font-semibold">Cortos (1 sílaba)</td>
                    <td className="p-3 font-mono">tall, fast, cheap</td>
                    <td className="p-3 font-mono text-sky-600 dark:text-sky-400">taller, faster, cheaper</td>
                    <td className="p-3 font-mono text-emerald-600 dark:text-emerald-400">the tallest, fastest, cheapest</td>
                    <td className="p-3">A car is faster than a bike.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">Terminados en -y</td>
                    <td className="p-3 font-mono">happy, easy, busy</td>
                    <td className="p-3 font-mono text-sky-600 dark:text-sky-400">happier, easier, busier</td>
                    <td className="p-3 font-mono text-emerald-600 dark:text-emerald-400">the happiest, easiest, busiest</td>
                    <td className="p-3">English is easier than Chinese.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">Largos (2+ sílabas)</td>
                    <td className="p-3 font-mono">expensive, interesting</td>
                    <td className="p-3 font-mono text-sky-600 dark:text-sky-400">more expensive, more interesting</td>
                    <td className="p-3 font-mono text-emerald-600 dark:text-emerald-400">the most expensive, the most interesting</td>
                    <td className="p-3">This is the most expensive hotel.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">Irregulares</td>
                    <td className="p-3 font-mono">good, bad, far</td>
                    <td className="p-3 font-mono text-sky-600 dark:text-sky-400">better, worse, farther/further</td>
                    <td className="p-3 font-mono text-emerald-600 dark:text-emerald-400">the best, the worst, the farthest/furthest</td>
                    <td className="p-3">Today is better than yesterday.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">Igualdad</td>
                    <td className="p-3 font-mono">as + adj + as</td>
                    <td className="p-3 font-mono text-sky-600 dark:text-sky-400">as famous as</td>
                    <td className="p-3 font-mono text-emerald-600 dark:text-emerald-400">not as successful as</td>
                    <td className="p-3">Messi is as famous as Maradona.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Answer Key Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-white/10">
                <h4 className="font-bold text-sm mb-2 text-sky-600 dark:text-sky-400">
                  Respuestas: Ejercicio 1 (Choose Answer)
                </h4>
                <ol className="list-decimal list-inside text-xs space-y-1">
                  <li>faster (b)</li>
                  <li>the most expensive (b)</li>
                  <li>taller (a)</li>
                  <li>easier (a)</li>
                  <li>the smartest (b)</li>
                  <li>faster (a)</li>
                  <li>the best (b)</li>
                  <li>more comfortable (a)</li>
                </ol>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-white/10">
                <h4 className="font-bold text-sm mb-2 text-sky-600 dark:text-sky-400">
                  Respuestas: Ejercicio 4 (Complete Sentences)
                </h4>
                <ol className="list-decimal list-inside text-xs space-y-1">
                  <li>younger</li>
                  <li>the best</li>
                  <li>faster</li>
                  <li>the most expensive</li>
                  <li>the slowest</li>
                  <li>more interesting</li>
                  <li>the highest</li>
                  <li>better</li>
                  <li>bigger</li>
                  <li>colder</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
