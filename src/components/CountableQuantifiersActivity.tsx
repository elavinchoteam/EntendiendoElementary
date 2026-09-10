import React, { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  Sparkles,
  BookOpen,
  CheckSquare,
  ShoppingCart,
  AlertCircle,
  HelpCircle,
  Check,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { CardSpeechControl } from './CardSpeechControl';
import {
  THEORY_TOPICS,
  EXERCISE_1_ITEMS,
  EXERCISE_2_QUESTIONS,
  SHOPPING_LIST_ITEMS,
  BONUS_MISTAKE_ITEMS,
  TheoryCardItem,
} from '../data/countableQuantifiersData';

interface CountableQuantifiersActivityProps {
  accent?: 'US' | 'UK';
  speechRate?: number;
}

type TabType = 'theory' | 'ex1' | 'ex2' | 'ex3' | 'bonus' | 'answers';

export const CountableQuantifiersActivity: React.FC<CountableQuantifiersActivityProps> = ({
  accent = 'US',
  speechRate = 1.0,
}) => {
  const { isDark } = useTheme();

  // Active navigation tab
  const [activeTab, setActiveTab] = useState<TabType>('theory');

  // Flip state for theory cards
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  // Exercise 1 states
  const [ex1Answers, setEx1Answers] = useState<Record<string, 'C' | 'NC'>>({});
  const [flippedEx1, setFlippedEx1] = useState<Record<string, boolean>>({});

  // Exercise 2 states
  const [ex2Answers, setEx2Answers] = useState<Record<string, 'a' | 'b' | 'c'>>({});
  const [flippedEx2, setFlippedEx2] = useState<Record<string, boolean>>({});

  // Exercise 3 states
  const [shoppingAnswers, setShoppingAnswers] = useState<Record<string, string>>({});
  const [customSentences, setCustomSentences] = useState<string[]>([
    'We need a lot of water for the party.',
    'We need some bread for sandwiches.',
    'We need a few apples for dessert.',
    'We need a lot of cheese for snacks.',
    'We need a little money for last-minute items.',
  ]);
  const [flippedShop, setFlippedShop] = useState<Record<string, boolean>>({});

  // Bonus states
  const [revealedBonus, setRevealedBonus] = useState<Record<string, boolean>>({});
  const [flippedBonus, setFlippedBonus] = useState<Record<string, boolean>>({});

  const toggleFlip = (id: string, map: Record<string, boolean>, setMap: React.Dispatch<React.SetStateAction<Record<string, boolean>>>) => {
    setMap((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

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
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400">
                Unit 2 · Actividad 1
              </span>
              <span className="text-xs font-mono opacity-60">Grammar Masterclass</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
              COUNTABLE & NON-COUNT NOUNS – QUANTIFIERS
            </h2>
            <p className="text-sm opacity-80 mt-1">
              Sustantivos Contables, No Contables y Cuantificadores con explicaciones bilingües y tarjetas reversibles.
            </p>
          </div>

          {/* Quick Audio Header Controller */}
          <div className="shrink-0 flex items-center gap-2 bg-slate-50 dark:bg-slate-800/80 p-2 rounded-2xl border border-inherit/20">
            <CardSpeechControl
              textToSpeak="Countable and non-count nouns. Quantifiers: many, much, a lot of, some, any, a few, a little, how many, how much."
              accent={accent}
              initialSpeed={speechRate}
            />
          </div>
        </div>

        {/* Section Navigation Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-5 border-t border-inherit/15 mt-5">
          <button
            type="button"
            onClick={() => setActiveTab('theory')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 border ${
              activeTab === 'theory'
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                : isDark
                ? 'bg-slate-800/70 border-white/10 text-slate-300 hover:bg-slate-800'
                : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200/80'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>10 Temas Teóricos</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('ex1')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 border ${
              activeTab === 'ex1'
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                : isDark
                ? 'bg-slate-800/70 border-white/10 text-slate-300 hover:bg-slate-800'
                : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200/80'
            }`}
          >
            <CheckSquare className="w-3.5 h-3.5" />
            <span>Ejercicio 1 (C / NC)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('ex2')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 border ${
              activeTab === 'ex2'
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                : isDark
                ? 'bg-slate-800/70 border-white/10 text-slate-300 hover:bg-slate-800'
                : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200/80'
            }`}
          >
            <CheckSquare className="w-3.5 h-3.5" />
            <span>Ejercicio 2 (Cuantificadores)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('ex3')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 border ${
              activeTab === 'ex3'
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                : isDark
                ? 'bg-slate-800/70 border-white/10 text-slate-300 hover:bg-slate-800'
                : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200/80'
            }`}
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>Ejercicio 3 (Shopping List)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('bonus')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 border ${
              activeTab === 'bonus'
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                : isDark
                ? 'bg-slate-800/70 border-white/10 text-slate-300 hover:bg-slate-800'
                : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200/80'
            }`}
          >
            <AlertCircle className="w-3.5 h-3.5" />
            <span>Bonus (Find the Mistake)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('answers')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 border ${
              activeTab === 'answers'
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
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
      {/* TAB 1: 10 THEORY TOPICS IN REVERSIBLE CARDS WITH AUDIO */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'theory' && (
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {THEORY_TOPICS.map((topic) => {
              const isFlipped = !!flippedCards[topic.id];

              return (
                <div
                  key={topic.id}
                  id={`theory-card-${topic.id}`}
                  onClick={() => toggleFlip(topic.id, flippedCards, setFlippedCards)}
                  className={`rounded-3xl border p-5 sm:p-6 transition-all duration-200 cursor-pointer shadow-xs flex flex-col justify-between select-none ${
                    isFlipped
                      ? isDark
                        ? 'bg-slate-900 border-emerald-500/60 ring-2 ring-emerald-500/20 text-white'
                        : 'bg-white border-emerald-500 ring-2 ring-emerald-400/20 text-slate-900 shadow-md'
                      : isDark
                      ? 'bg-slate-900 border-white/10 hover:border-slate-700 text-white'
                      : 'bg-white border-slate-200 hover:border-slate-300 text-slate-900'
                  }`}
                >
                  <div>
                    {/* Top Row: Category tag and speech control */}
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 border border-slate-200 dark:border-white/10">
                        {isFlipped ? topic.categoryEs : topic.category}
                      </span>

                      {/* Audio Button (speaker only, stopped propagation) */}
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
                            <p className="font-semibold text-sm text-emerald-600 dark:text-emerald-400">
                              {isFlipped ? ex.es : ex.en}
                            </p>
                            {(isFlipped ? ex.noteEs : ex.noteEn) && (
                              <p className="opacity-75 mt-0.5">
                                {isFlipped ? ex.noteEs : ex.noteEn}
                              </p>
                            )}
                          </div>
                          <CardSpeechControl
                            textToSpeak={ex.en}
                            accent={accent}
                            initialSpeed={speechRate}
                            size="sm"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Grammar Tip Bottom Box */}
                  <div className="pt-3 border-t border-inherit/15 mt-2">
                    <p className="text-xs font-medium italic opacity-85 leading-snug">
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
      {/* TAB 2: EXERCISE 1 – COUNTABLE OR NON-COUNT? (12 ITEMS) */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'ex1' && (
        <div className="flex flex-col gap-5">
          <div
            className={`p-5 rounded-2xl border ${
              isDark ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-200'
            }`}
          >
            <h3 className="text-lg font-bold">
              EXERCISE 1 – COUNTABLE OR NON-COUNT?
            </h3>
            <p className="text-xs opacity-75 mt-1">
              Write or select <strong>C</strong> for countable or <strong>NC</strong> for non-count. Haz clic en cada tarjeta para ver la traducción al español y su regla explicada.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {EXERCISE_1_ITEMS.map((item) => {
              const selected = ex1Answers[item.id];
              const isCorrect = selected === item.correctType;
              const isFlipped = !!flippedEx1[item.id];

              return (
                <div
                  key={item.id}
                  id={`ex1-card-${item.id}`}
                  onClick={() => toggleFlip(item.id, flippedEx1, setFlippedEx1)}
                  className={`rounded-2xl border p-4 transition-all duration-200 cursor-pointer shadow-xs flex flex-col justify-between select-none ${
                    isFlipped
                      ? isDark
                        ? 'bg-slate-900 border-emerald-500/60 ring-2 ring-emerald-500/20 text-white'
                        : 'bg-white border-emerald-500 ring-2 ring-emerald-400/20 text-slate-900 shadow-sm'
                      : isDark
                      ? 'bg-slate-900 border-white/10 hover:border-slate-700 text-white'
                      : 'bg-white border-slate-200 hover:border-slate-300 text-slate-900'
                  }`}
                >
                  <div>
                    {/* Top row: Word and audio */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <h4 className="text-base font-bold capitalize text-emerald-600 dark:text-emerald-400">
                        {isFlipped ? item.wordEs : item.wordEn}
                      </h4>
                      <CardSpeechControl
                        textToSpeak={`${item.wordEn}. ${item.exampleSentenceEn}`}
                        accent={accent}
                        initialSpeed={speechRate}
                        size="sm"
                      />
                    </div>

                    {/* Example sentence */}
                    <p className="text-xs italic opacity-85 mb-3">
                      "{isFlipped ? item.exampleSentenceEs : item.exampleSentenceEn}"
                    </p>

                    {/* Explanation */}
                    <p className="text-xs opacity-80 mb-4 leading-relaxed">
                      {isFlipped ? item.explanationEs : item.explanationEn}
                    </p>
                  </div>

                  {/* Buttons for C / NC */}
                  <div
                    className="pt-3 border-t border-inherit/15 flex items-center justify-between gap-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span className="text-xs font-mono font-bold opacity-60">
                      Tipo:
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setEx1Answers((prev) => ({ ...prev, [item.id]: 'C' }));
                        }}
                        className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer border ${
                          selected === 'C'
                            ? item.correctType === 'C'
                              ? 'bg-emerald-600 text-white border-emerald-600'
                              : 'bg-red-600 text-white border-red-600'
                            : isDark
                            ? 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'
                            : 'bg-slate-100 text-slate-800 border-slate-300 hover:bg-slate-200'
                        }`}
                      >
                        C (Countable)
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setEx1Answers((prev) => ({ ...prev, [item.id]: 'NC' }));
                        }}
                        className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer border ${
                          selected === 'NC'
                            ? item.correctType === 'NC'
                              ? 'bg-emerald-600 text-white border-emerald-600'
                              : 'bg-red-600 text-white border-red-600'
                            : isDark
                            ? 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'
                            : 'bg-slate-100 text-slate-800 border-slate-300 hover:bg-slate-200'
                        }`}
                      >
                        NC (Non-Count)
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 3: EXERCISE 2 – CHOOSE THE CORRECT QUANTIFIER (10 ITEMS) */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'ex2' && (
        <div className="flex flex-col gap-5">
          <div
            className={`p-5 rounded-2xl border ${
              isDark ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-200'
            }`}
          >
            <h3 className="text-lg font-bold">
              EXERCISE 2 – CHOOSE THE CORRECT QUANTIFIER
            </h3>
            <p className="text-xs opacity-75 mt-1">
              Select the correct quantifier for each sentence (a, b, or c). Haz clic en la tarjeta para leer la traducción completa al español.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {EXERCISE_2_QUESTIONS.map((q) => {
              const selected = ex2Answers[q.id];
              const isFlipped = !!flippedEx2[q.id];
              const correctOption = q.options.find((o) => o.isCorrect);

              return (
                <div
                  key={q.id}
                  id={`ex2-card-${q.id}`}
                  onClick={() => toggleFlip(q.id, flippedEx2, setFlippedEx2)}
                  className={`rounded-2xl border p-4 sm:p-5 transition-all duration-200 cursor-pointer shadow-xs flex flex-col justify-between select-none ${
                    isFlipped
                      ? isDark
                        ? 'bg-slate-900 border-emerald-500/60 ring-2 ring-emerald-500/20 text-white'
                        : 'bg-white border-emerald-500 ring-2 ring-emerald-400/20 text-slate-900 shadow-sm'
                      : isDark
                      ? 'bg-slate-900 border-white/10 hover:border-slate-700 text-white'
                      : 'bg-white border-slate-200 hover:border-slate-300 text-slate-900'
                  }`}
                >
                  <div>
                    {/* Header: Number and Audio */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="px-2 py-0.5 rounded-md text-xs font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        Pregunta #{q.number}
                      </span>
                      <CardSpeechControl
                        textToSpeak={
                          correctOption
                            ? q.questionEn.replace('______', correctOption.text)
                            : q.questionEn
                        }
                        accent={accent}
                        initialSpeed={speechRate}
                        size="sm"
                      />
                    </div>

                    {/* Question text */}
                    <h4 className="text-base font-bold mb-3 text-emerald-600 dark:text-emerald-400">
                      {isFlipped ? q.questionEs : q.questionEn}
                    </h4>

                    {/* Options (stops flip propagation on click) */}
                    <div
                      className="flex flex-col gap-2 mb-3"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {q.options.map((opt) => {
                        const isChosen = selected === opt.key;
                        let btnStyle = isDark
                          ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300';

                        if (isChosen) {
                          if (opt.isCorrect) {
                            btnStyle = 'bg-emerald-600 text-white border-emerald-600 shadow-xs';
                          } else {
                            btnStyle = 'bg-red-600 text-white border-red-600 shadow-xs';
                          }
                        }

                        return (
                          <button
                            key={opt.key}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setEx2Answers((prev) => ({ ...prev, [q.id]: opt.key }));
                            }}
                            className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${btnStyle}`}
                          >
                            <div className="flex items-center gap-2">
                              <span className="w-5 h-5 rounded-full font-mono text-[11px] font-bold flex items-center justify-center bg-black/10">
                                {opt.key}
                              </span>
                              <span>{opt.text}</span>
                            </div>
                            {isChosen && opt.isCorrect && (
                              <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                            )}
                            {isChosen && !opt.isCorrect && (
                              <XCircle className="w-4 h-4 text-white shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Explanation footer */}
                  {selected && (
                    <div className="pt-2.5 border-t border-inherit/15 mt-1">
                      <p className="text-xs opacity-90 leading-relaxed">
                        {isFlipped ? q.explanationEs : q.explanationEn}
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
      {/* TAB 4: EXERCISE 3 – THE SHOPPING CHALLENGE */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'ex3' && (
        <div className="flex flex-col gap-6">
          <div
            className={`p-5 rounded-2xl border ${
              isDark ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-200'
            }`}
          >
            <h3 className="text-lg font-bold">
              EXERCISE 3 – THE SHOPPING CHALLENGE
            </h3>
            <p className="text-xs opacity-80 mt-1">
              Imagine you are preparing a party. Complete the shopping list using:
              <span className="font-semibold text-emerald-600 dark:text-emerald-400 ml-1">
                a few / a little / some / many / much / a lot of
              </span>
              . Luego revisa las 5 oraciones de ejemplo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SHOPPING_LIST_ITEMS.map((item) => {
              const selectedQuant = shoppingAnswers[item.id] || item.recommendedQuantifier;
              const isFlipped = !!flippedShop[item.id];

              return (
                <div
                  key={item.id}
                  id={`shop-card-${item.id}`}
                  onClick={() => toggleFlip(item.id, flippedShop, setFlippedShop)}
                  className={`rounded-2xl border p-4 transition-all duration-200 cursor-pointer shadow-xs flex flex-col justify-between select-none ${
                    isFlipped
                      ? isDark
                        ? 'bg-slate-900 border-emerald-500/60 ring-2 ring-emerald-500/20 text-white'
                        : 'bg-white border-emerald-500 ring-2 ring-emerald-400/20 text-slate-900 shadow-sm'
                      : isDark
                      ? 'bg-slate-900 border-white/10 hover:border-slate-700 text-white'
                      : 'bg-white border-slate-200 hover:border-slate-300 text-slate-900'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                        {item.isCountable ? 'Contable (Plural)' : 'No Contable'}
                      </span>
                      <CardSpeechControl
                        textToSpeak={item.exampleEn}
                        accent={accent}
                        initialSpeed={speechRate}
                        size="sm"
                      />
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-sm font-mono font-bold text-emerald-600 dark:text-emerald-400 underline">
                        {selectedQuant}
                      </span>
                      <span className="text-sm font-bold">
                        {isFlipped ? item.nounEs : item.nounEn}
                      </span>
                    </div>

                    <p className="text-xs italic opacity-85 mb-3">
                      "{isFlipped ? item.exampleEs : item.exampleEn}"
                    </p>
                  </div>

                  {/* Selector of quantifiers */}
                  <div
                    className="pt-2.5 border-t border-inherit/15 flex flex-wrap items-center gap-1.5"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {['a few', 'a little', 'some', 'many', 'much', 'a lot of'].map((q) => {
                      const isSelected = selectedQuant === q;
                      const isAcceptable = item.acceptableQuantifiers.includes(q);

                      return (
                        <button
                          key={q}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setShoppingAnswers((prev) => ({ ...prev, [item.id]: q }));
                          }}
                          className={`px-2 py-1 rounded-lg text-[11px] font-medium transition-all cursor-pointer border ${
                            isSelected
                              ? isAcceptable
                                ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                                : 'bg-red-600 text-white border-red-600 shadow-xs'
                              : isDark
                              ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                              : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
                          }`}
                        >
                          {q}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* 5 Sentences Builder / Writer Box */}
          <div
            className={`p-5 sm:p-6 rounded-3xl border shadow-xs ${
              isDark ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between gap-3 mb-3">
              <div>
                <h4 className="text-base font-bold">
                  What do you need for the party? (Write five sentences)
                </h4>
                <p className="text-xs opacity-75 mt-0.5">
                  Ejemplo: "We need a lot of water." Escribe o edita tus 5 oraciones y escúchalas con el botón de audio.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              {customSentences.map((sentence, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 p-2 rounded-xl border bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-white/10"
                >
                  <span className="w-6 h-6 rounded-full font-mono text-xs font-bold flex items-center justify-center bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 shrink-0">
                    {idx + 1}
                  </span>
                  <input
                    type="text"
                    value={sentence}
                    onChange={(e) => {
                      const newSentences = [...customSentences];
                      newSentences[idx] = e.target.value;
                      setCustomSentences(newSentences);
                    }}
                    className="flex-1 bg-transparent text-xs sm:text-sm font-medium focus:outline-hidden"
                  />
                  <CardSpeechControl
                    textToSpeak={sentence}
                    accent={accent}
                    initialSpeed={speechRate}
                    size="sm"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 5: BONUS – FIND THE MISTAKE (8 ITEMS) */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'bonus' && (
        <div className="flex flex-col gap-5">
          <div
            className={`p-5 rounded-2xl border ${
              isDark ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-200'
            }`}
          >
            <h3 className="text-lg font-bold">
              BONUS – FIND THE MISTAKE
            </h3>
            <p className="text-xs opacity-75 mt-1">
              Correct the sentences. Identifica el error y haz clic en la tarjeta para ver la corrección y explicación gramatical en español.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {BONUS_MISTAKE_ITEMS.map((item) => {
              const isRevealed = !!revealedBonus[item.id];
              const isFlipped = !!flippedBonus[item.id];

              return (
                <div
                  key={item.id}
                  id={`bonus-card-${item.id}`}
                  onClick={() => toggleFlip(item.id, flippedBonus, setFlippedBonus)}
                  className={`rounded-2xl border p-4 sm:p-5 transition-all duration-200 cursor-pointer shadow-xs flex flex-col justify-between select-none ${
                    isFlipped
                      ? isDark
                        ? 'bg-slate-900 border-emerald-500/60 ring-2 ring-emerald-500/20 text-white'
                        : 'bg-white border-emerald-500 ring-2 ring-emerald-400/20 text-slate-900 shadow-sm'
                      : isDark
                      ? 'bg-slate-900 border-white/10 hover:border-slate-700 text-white'
                      : 'bg-white border-slate-200 hover:border-slate-300 text-slate-900'
                  }`}
                >
                  <div>
                    {/* Header: Number, Status and Audio */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="px-2 py-0.5 rounded-md text-xs font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        Oración #{item.number}
                      </span>
                      <CardSpeechControl
                        textToSpeak={item.correctedSentence}
                        accent={accent}
                        initialSpeed={speechRate}
                        size="sm"
                      />
                    </div>

                    {/* Original sentence */}
                    <div className="mb-3">
                      <span className="text-[11px] font-mono opacity-60 uppercase tracking-wider block">
                        Original:
                      </span>
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                        "{item.originalSentence}"
                      </p>
                    </div>

                    {/* Corrected sentence box */}
                    {isRevealed && (
                      <div className="p-3 rounded-xl border bg-emerald-500/10 border-emerald-500/30 text-xs mb-3">
                        <span className="font-bold text-emerald-600 dark:text-emerald-400 block mb-1">
                          {item.hasMistake ? 'Corrección recomendada:' : '¡Oración correcta!'}
                        </span>
                        <p className="font-semibold text-sm">
                          {isFlipped ? item.correctionEs : item.correctedSentence}
                        </p>
                        <p className="opacity-80 mt-1">
                          {isFlipped ? item.explanationEs : item.explanationEn}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Action button */}
                  <div
                    className="pt-2.5 border-t border-inherit/15 flex items-center justify-between"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setRevealedBonus((prev) => ({ ...prev, [item.id]: !prev[item.id] }));
                      }}
                      className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold cursor-pointer shadow-xs transition-colors"
                    >
                      {isRevealed ? 'Ocultar respuesta' : 'Ver solución'}
                    </button>

                    <span className="text-[11px] opacity-60 font-mono">
                      {item.hasMistake ? 'Tiene error' : 'Sin error'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 6: ANSWERS & QUICK REFERENCE */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'answers' && (
        <div className="flex flex-col gap-6">
          {/* Quick Guide Table */}
          <div
            className={`p-5 sm:p-6 rounded-3xl border shadow-xs ${
              isDark ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between gap-3 mb-4">
              <div>
                <h3 className="text-lg font-bold">
                  9. QUICK GUIDE – TABLA COMPARATIVA
                </h3>
                <p className="text-xs opacity-75 mt-0.5">
                  Resumen de compatibilidad de cada cuantificador con sustantivos contables e incontables.
                </p>
              </div>
              <CardSpeechControl
                textToSpeak="Quick guide table. Many is used with countable. Much is used with non-count. A lot of is used with both. Some and any are used with both. A few is used with countable. A little is used with non-count. How many is used with countable. How much is used with non-count."
                accent={accent}
                initialSpeed={speechRate}
              />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="border-b border-inherit/20 text-emerald-600 dark:text-emerald-400 font-mono">
                    <th className="py-2.5 px-3">Quantifier</th>
                    <th className="py-2.5 px-3">Countable</th>
                    <th className="py-2.5 px-3">Non-count</th>
                    <th className="py-2.5 px-3">Ejemplo</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-inherit/10">
                  <tr>
                    <td className="py-2 px-3 font-semibold">many</td>
                    <td className="py-2 px-3 font-bold text-emerald-500">YES</td>
                    <td className="py-2 px-3 font-bold text-red-500">NO</td>
                    <td className="py-2 px-3 opacity-80">many books</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-semibold">much</td>
                    <td className="py-2 px-3 font-bold text-red-500">NO</td>
                    <td className="py-2 px-3 font-bold text-emerald-500">YES</td>
                    <td className="py-2 px-3 opacity-80">much water</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-semibold">a lot of</td>
                    <td className="py-2 px-3 font-bold text-emerald-500">YES</td>
                    <td className="py-2 px-3 font-bold text-emerald-500">YES</td>
                    <td className="py-2 px-3 opacity-80">a lot of books / water</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-semibold">some</td>
                    <td className="py-2 px-3 font-bold text-emerald-500">YES</td>
                    <td className="py-2 px-3 font-bold text-emerald-500">YES</td>
                    <td className="py-2 px-3 opacity-80">some apples / milk</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-semibold">any</td>
                    <td className="py-2 px-3 font-bold text-emerald-500">YES</td>
                    <td className="py-2 px-3 font-bold text-emerald-500">YES</td>
                    <td className="py-2 px-3 opacity-80">any eggs / milk</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-semibold">a few</td>
                    <td className="py-2 px-3 font-bold text-emerald-500">YES</td>
                    <td className="py-2 px-3 font-bold text-red-500">NO</td>
                    <td className="py-2 px-3 opacity-80">a few friends</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-semibold">a little</td>
                    <td className="py-2 px-3 font-bold text-red-500">NO</td>
                    <td className="py-2 px-3 font-bold text-emerald-500">YES</td>
                    <td className="py-2 px-3 opacity-80">a little time</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-semibold">how many</td>
                    <td className="py-2 px-3 font-bold text-emerald-500">YES</td>
                    <td className="py-2 px-3 font-bold text-red-500">NO</td>
                    <td className="py-2 px-3 opacity-80">How many books?</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-semibold">how much</td>
                    <td className="py-2 px-3 font-bold text-red-500">NO</td>
                    <td className="py-2 px-3 font-bold text-emerald-500">YES</td>
                    <td className="py-2 px-3 opacity-80">How much coffee?</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Consolidated Answer Keys */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div
              className={`p-5 rounded-3xl border shadow-xs ${
                isDark ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-200'
              }`}
            >
              <h4 className="text-base font-bold mb-3">Clave de Respuestas: Ejercicio 1</h4>
              <ul className="space-y-1 text-xs sm:text-sm font-mono opacity-90">
                <li>1. apple → <strong className="text-emerald-500">C</strong> (Countable)</li>
                <li>2. water → <strong className="text-emerald-500">NC</strong> (Non-count)</li>
                <li>3. chair → <strong className="text-emerald-500">C</strong> (Countable)</li>
                <li>4. money → <strong className="text-emerald-500">NC</strong> (Non-count)</li>
                <li>5. information → <strong className="text-emerald-500">NC</strong> (Non-count)</li>
                <li>6. book → <strong className="text-emerald-500">C</strong> (Countable)</li>
                <li>7. rice → <strong className="text-emerald-500">NC</strong> (Non-count)</li>
                <li>8. student → <strong className="text-emerald-500">C</strong> (Countable)</li>
                <li>9. advice → <strong className="text-emerald-500">NC</strong> (Non-count)</li>
                <li>10. coffee → <strong className="text-emerald-500">NC</strong> (Non-count)</li>
                <li>11. car → <strong className="text-emerald-500">C</strong> (Countable)</li>
                <li>12. furniture → <strong className="text-emerald-500">NC</strong> (Non-count)</li>
              </ul>
            </div>

            <div
              className={`p-5 rounded-3xl border shadow-xs ${
                isDark ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-200'
              }`}
            >
              <h4 className="text-base font-bold mb-3">Clave de Respuestas: Ejercicio 2</h4>
              <ul className="space-y-1 text-xs sm:text-sm font-mono opacity-90">
                <li>1. students → <strong className="text-emerald-500">b) many</strong></li>
                <li>2. money → <strong className="text-emerald-500">c) much</strong></li>
                <li>3. water → <strong className="text-emerald-500">a) some</strong></li>
                <li>4. friends → <strong className="text-emerald-500">b) a lot of</strong></li>
                <li>5. time → <strong className="text-emerald-500">a) a little</strong></li>
                <li>6. apples → <strong className="text-emerald-500">c) a few</strong></li>
                <li>7. milk → <strong className="text-emerald-500">a) any</strong></li>
                <li>8. books → <strong className="text-emerald-500">b) many</strong></li>
                <li>9. coffee → <strong className="text-emerald-500">b) much</strong></li>
                <li>10. information → <strong className="text-emerald-500">b) much</strong></li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
