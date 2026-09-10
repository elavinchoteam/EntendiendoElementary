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
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { CardSpeechControl } from './CardSpeechControl';
import {
  BE_PAST_THEORY_TOPICS,
  BE_PAST_EXERCISE_1_ITEMS,
  BE_PAST_EXERCISE_2_ITEMS,
  BE_PAST_EXERCISE_3_ITEMS,
  BE_PAST_WH_ITEMS,
  BE_PRESENT_PAST_QUIZ,
} from '../data/bePastMasterclassData';

interface BePastMasterclassActivityProps {
  accent?: 'US' | 'UK';
  speechRate?: number;
}

type TabType = 'theory' | 'ex1' | 'ex2' | 'ex3' | 'wh' | 'quiz' | 'answers';

export const BePastMasterclassActivity: React.FC<BePastMasterclassActivityProps> = ({
  accent = 'US',
  speechRate = 1.0,
}) => {
  const { isDark } = useTheme();

  // Active navigation tab
  const [activeTab, setActiveTab] = useState<TabType>('theory');

  // Flip states for reversible cards
  const [flippedTheory, setFlippedTheory] = useState<Record<string, boolean>>({});
  const [flippedEx1, setFlippedEx1] = useState<Record<string, boolean>>({});
  const [flippedEx2, setFlippedEx2] = useState<Record<string, boolean>>({});
  const [flippedEx3, setFlippedEx3] = useState<Record<string, boolean>>({});
  const [flippedWh, setFlippedWh] = useState<Record<string, boolean>>({});
  const [flippedQuiz, setFlippedQuiz] = useState<Record<string, boolean>>({});

  // Interactive Answers
  const [ex1Answers, setEx1Answers] = useState<Record<string, string>>({});
  const [ex2Answers, setEx2Answers] = useState<Record<string, string>>({});
  const [ex3Revealed, setEx3Revealed] = useState<Record<string, boolean>>({});
  const [whAnswers, setWhAnswers] = useState<Record<string, string>>({});
  const [quizAnswers, setQuizAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D'>>({});

  const toggleFlip = (
    id: string,
    setMap: React.Dispatch<React.SetStateAction<Record<string, boolean>>>
  ) => {
    setMap((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Calculate Quiz Score
  const quizScore = BE_PRESENT_PAST_QUIZ.filter((q) => {
    const selected = quizAnswers[q.id];
    if (!selected) return false;
    const opt = q.options.find((o) => o.key === selected);
    return opt?.isCorrect;
  }).length;

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
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-indigo-500/15 border border-indigo-500/30 text-indigo-600 dark:text-indigo-400">
                Unit 1 · Actividad 1
              </span>
              <span className="text-xs font-mono opacity-60">Grammar Masterclass</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
              BE IN THE PAST — WAS / WERE
            </h2>
            <p className="text-sm opacity-80 mt-1">
              Guía completa de Was / Were, reglas de uso, preguntas, respuestas cortas y ejercicios interactivos con tarjetas reversibles y audio.
            </p>
          </div>

          {/* Header Audio Controller */}
          <div className="shrink-0 flex items-center gap-2 bg-slate-50 dark:bg-slate-800/80 p-2 rounded-2xl border border-inherit/20">
            <CardSpeechControl
              textToSpeak="Be in the past: was and were. Remember that was goes with I, he, she and it. Were goes with you, we and they."
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
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
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
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                : isDark
                ? 'bg-slate-800/70 border-white/10 text-slate-300 hover:bg-slate-800'
                : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200/80'
            }`}
          >
            <CheckSquare className="w-3.5 h-3.5" />
            <span>Ejercicio 1 (Was / Were)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('ex2')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 border ${
              activeTab === 'ex2'
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                : isDark
                ? 'bg-slate-800/70 border-white/10 text-slate-300 hover:bg-slate-800'
                : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200/80'
            }`}
          >
            <CheckSquare className="w-3.5 h-3.5" />
            <span>Ejercicio 2 (Wasn't / Weren't)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('ex3')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 border ${
              activeTab === 'ex3'
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                : isDark
                ? 'bg-slate-800/70 border-white/10 text-slate-300 hover:bg-slate-800'
                : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200/80'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ejercicio 3 (Make Questions)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('wh')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 border ${
              activeTab === 'wh'
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                : isDark
                ? 'bg-slate-800/70 border-white/10 text-slate-300 hover:bg-slate-800'
                : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200/80'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>WH- Questions</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('quiz')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 border ${
              activeTab === 'quiz'
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                : isDark
                ? 'bg-slate-800/70 border-white/10 text-slate-300 hover:bg-slate-800'
                : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200/80'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Multiple Choice (15 Pts)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('answers')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 border ${
              activeTab === 'answers'
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                : isDark
                ? 'bg-slate-800/70 border-white/10 text-slate-300 hover:bg-slate-800'
                : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200/80'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
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
            {BE_PAST_THEORY_TOPICS.map((topic) => {
              const isFlipped = !!flippedTheory[topic.id];

              return (
                <div
                  key={topic.id}
                  id={`theory-card-${topic.id}`}
                  onClick={() => toggleFlip(topic.id, setFlippedTheory)}
                  className={`rounded-3xl border p-5 sm:p-6 transition-all duration-200 cursor-pointer shadow-xs flex flex-col justify-between select-none ${
                    isFlipped
                      ? isDark
                        ? 'bg-slate-900 border-indigo-500/60 ring-2 ring-indigo-500/20 text-white'
                        : 'bg-white border-indigo-500 ring-2 ring-indigo-400/20 text-slate-900 shadow-md'
                      : isDark
                      ? 'bg-slate-900 border-white/10 hover:border-slate-700 text-white'
                      : 'bg-white border-slate-200 hover:border-slate-300 text-slate-900'
                  }`}
                >
                  <div>
                    {/* Top Row: Category tag and speech control */}
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 border border-slate-200 dark:border-white/10">
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
      {/* TAB 2: EXERCISE 1 — WAS OR WERE? (10 items) */}
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
                <h3 className="font-bold text-base">Exercise 1 — WAS or WERE?</h3>
                <p className="text-xs opacity-75 mt-0.5">
                  Selecciona la forma correcta para completar cada oración. Toca cualquier tarjeta para ver su traducción y explicación.
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
            {BE_PAST_EXERCISE_1_ITEMS.map((item) => {
              const isFlipped = !!flippedEx1[item.id];
              const selected = ex1Answers[item.id];
              const isCorrect = selected === item.correctAnswer;
              const hasAnswered = !!selected;

              return (
                <div
                  key={item.id}
                  id={`ex1-card-${item.id}`}
                  onClick={() => toggleFlip(item.id, setFlippedEx1)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between select-none ${
                    isFlipped
                      ? isDark
                        ? 'bg-slate-900 border-indigo-500 ring-2 ring-indigo-500/20'
                        : 'bg-white border-indigo-500 ring-2 ring-indigo-400/20'
                      : isDark
                      ? 'bg-slate-900 border-white/10'
                      : 'bg-white border-slate-200'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white text-xs font-mono font-bold flex items-center justify-center">
                        {item.number}
                      </span>
                      <CardSpeechControl
                        textToSpeak={item.fullSentenceEn}
                        accent={accent}
                        initialSpeed={speechRate}
                      />
                    </div>

                    <div className="text-base font-semibold mb-4 leading-relaxed">
                      {isFlipped ? (
                        <span className="italic">{item.fullSentenceEs}</span>
                      ) : (
                        <span>
                          {item.sentenceBefore}{' '}
                          <span className="inline-block px-3 py-0.5 border-b-2 border-indigo-500 font-mono text-indigo-600 dark:text-indigo-400">
                            {selected || '____'}
                          </span>{' '}
                          {item.sentenceAfter}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Options selection */}
                  <div
                    className="flex items-center gap-2 pt-3 border-t border-inherit/15"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {item.options.map((opt) => {
                      const isOptSelected = selected === opt;
                      const optIsCorrect = opt === item.correctAnswer;

                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() =>
                            setEx1Answers((prev) => ({ ...prev, [item.id]: opt }))
                          }
                          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold font-mono tracking-wider transition-all cursor-pointer border ${
                            isOptSelected
                              ? optIsCorrect
                                ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                                : 'bg-rose-600 text-white border-rose-600'
                              : isDark
                              ? 'bg-slate-800 border-white/10 hover:bg-slate-700'
                              : 'bg-slate-100 border-slate-200 hover:bg-slate-200'
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}

                    {hasAnswered && (
                      <span className="shrink-0 p-1">
                        {isCorrect ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                        ) : (
                          <XCircle className="w-5 h-5 text-rose-500" />
                        )}
                      </span>
                    )}
                  </div>

                  {/* Flip explanation */}
                  {isFlipped && (
                    <div className="mt-3 pt-2 border-t border-inherit/15 text-xs opacity-80">
                      <p>{item.explanationEs}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 3: EXERCISE 2 — WASN'T OR WEREN'T? (8 items) */}
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
                <h3 className="font-bold text-base">
                  Exercise 2 — Complete with wasn't or weren't
                </h3>
                <p className="text-xs opacity-75 mt-0.5">
                  Completa cada oración negativa. Toca la tarjeta para ver la traducción al castellano y la regla gramatical.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setEx2Answers({})}
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
            {BE_PAST_EXERCISE_2_ITEMS.map((item) => {
              const isFlipped = !!flippedEx2[item.id];
              const selected = ex2Answers[item.id];
              const isCorrect = selected === item.correctAnswer;
              const hasAnswered = !!selected;

              return (
                <div
                  key={item.id}
                  id={`ex2-card-${item.id}`}
                  onClick={() => toggleFlip(item.id, setFlippedEx2)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between select-none ${
                    isFlipped
                      ? isDark
                        ? 'bg-slate-900 border-indigo-500 ring-2 ring-indigo-500/20'
                        : 'bg-white border-indigo-500 ring-2 ring-indigo-400/20'
                      : isDark
                      ? 'bg-slate-900 border-white/10'
                      : 'bg-white border-slate-200'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white text-xs font-mono font-bold flex items-center justify-center">
                        {item.number}
                      </span>
                      <CardSpeechControl
                        textToSpeak={item.fullSentenceEn}
                        accent={accent}
                        initialSpeed={speechRate}
                      />
                    </div>

                    <div className="text-base font-semibold mb-4 leading-relaxed">
                      {isFlipped ? (
                        <span className="italic">{item.fullSentenceEs}</span>
                      ) : (
                        <span>
                          {item.sentenceBefore}{' '}
                          <span className="inline-block px-3 py-0.5 border-b-2 border-indigo-500 font-mono text-indigo-600 dark:text-indigo-400">
                            {selected || '______'}
                          </span>{' '}
                          {item.sentenceAfter}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Options selection */}
                  <div
                    className="flex items-center gap-2 pt-3 border-t border-inherit/15"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {item.options.map((opt) => {
                      const isOptSelected = selected === opt;
                      const optIsCorrect = opt === item.correctAnswer;

                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() =>
                            setEx2Answers((prev) => ({ ...prev, [item.id]: opt }))
                          }
                          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold font-mono tracking-wider transition-all cursor-pointer border ${
                            isOptSelected
                              ? optIsCorrect
                                ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                                : 'bg-rose-600 text-white border-rose-600'
                              : isDark
                              ? 'bg-slate-800 border-white/10 hover:bg-slate-700'
                              : 'bg-slate-100 border-slate-200 hover:bg-slate-200'
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}

                    {hasAnswered && (
                      <span className="shrink-0 p-1">
                        {isCorrect ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                        ) : (
                          <XCircle className="w-5 h-5 text-rose-500" />
                        )}
                      </span>
                    )}
                  </div>

                  {/* Flip explanation */}
                  {isFlipped && (
                    <div className="mt-3 pt-2 border-t border-inherit/15 text-xs opacity-80">
                      <p>{item.explanationEs}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 4: EXERCISE 3 — MAKE QUESTIONS (8 items) */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'ex3' && (
        <div className="flex flex-col gap-5">
          <div
            className={`p-4 rounded-2xl border ${
              isDark ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base">Exercise 3 — Make questions</h3>
                <p className="text-xs opacity-75 mt-0.5">
                  Transforma cada afirmación en pregunta invirtiendo Was/Were al frente. Toca la tarjeta para voltear y ver la traducción y respuestas cortas.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setEx3Revealed({})}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 border cursor-pointer ${
                  isDark ? 'bg-white/5 border-white/10' : 'bg-slate-100 border-slate-200'
                }`}
              >
                <RotateCcw className="w-3 h-3" />
                <span>Ocultar Soluciones</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {BE_PAST_EXERCISE_3_ITEMS.map((item) => {
              const isFlipped = !!flippedEx3[item.id];
              const isRevealed = !!ex3Revealed[item.id];

              return (
                <div
                  key={item.id}
                  id={`ex3-card-${item.id}`}
                  onClick={() => toggleFlip(item.id, setFlippedEx3)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between select-none ${
                    isFlipped
                      ? isDark
                        ? 'bg-slate-900 border-indigo-500 ring-2 ring-indigo-500/20'
                        : 'bg-white border-indigo-500 ring-2 ring-indigo-400/20'
                      : isDark
                      ? 'bg-slate-900 border-white/10'
                      : 'bg-white border-slate-200'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white text-xs font-mono font-bold flex items-center justify-center">
                        {item.number}
                      </span>
                      <CardSpeechControl
                        textToSpeak={`${item.statementEn}. Question: ${item.questionEn}. ${item.shortAnswerPositiveEn}. ${item.shortAnswerNegativeEn}`}
                        accent={accent}
                        initialSpeed={speechRate}
                      />
                    </div>

                    <div className="mb-3">
                      <span className="text-xs font-mono opacity-60 uppercase tracking-wider block">
                        Statement / Afirmación:
                      </span>
                      <p className="text-base font-semibold">
                        {isFlipped ? item.statementEs : item.statementEn}
                      </p>
                    </div>

                    <div className="p-3 rounded-xl border bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-white/10 mb-3">
                      <span className="text-xs font-mono text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-wider block mb-1">
                        Question / Pregunta:
                      </span>
                      {isRevealed || isFlipped ? (
                        <div>
                          <p className="text-base font-bold text-indigo-600 dark:text-indigo-300">
                            {isFlipped ? item.questionEs : item.questionEn}
                          </p>
                          <div className="mt-2 text-xs opacity-80 flex flex-col gap-1">
                            <span className="font-mono">
                              → {isFlipped ? item.shortAnswerPositiveEs : item.shortAnswerPositiveEn}
                            </span>
                            <span className="font-mono">
                              → {isFlipped ? item.shortAnswerNegativeEs : item.shortAnswerNegativeEn}
                            </span>
                          </div>
                        </div>
                      ) : (
                        <p className="text-sm italic opacity-60">
                          Was / Were + Subject + Complement?
                        </p>
                      )}
                    </div>
                  </div>

                  <div
                    className="flex items-center justify-between pt-3 border-t border-inherit/15 text-xs"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setEx3Revealed((prev) => ({ ...prev, [item.id]: !prev[item.id] }))
                      }
                      className={`px-3 py-1.5 rounded-xl font-semibold border cursor-pointer ${
                        isRevealed
                          ? 'bg-indigo-600 text-white border-indigo-600'
                          : isDark
                          ? 'bg-slate-800 border-white/10 hover:bg-slate-700'
                          : 'bg-slate-100 border-slate-200 hover:bg-slate-200'
                      }`}
                    >
                      {isRevealed ? 'Ocultar' : 'Ver Pregunta'}
                    </button>

                    <span className="opacity-70 text-[11px]">
                      {item.explanationEs}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 5: WH- QUESTIONS (10 items) */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'wh' && (
        <div className="flex flex-col gap-5">
          <div
            className={`p-4 rounded-2xl border ${
              isDark ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base">WH- QUESTIONS — Complete with was or were</h3>
                <p className="text-xs opacity-75 mt-0.5">
                  Fórmula: QUESTION WORD + WAS/WERE + PERSON. Toca cualquier tarjeta para ver su traducción y análisis.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setWhAnswers({})}
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
            {BE_PAST_WH_ITEMS.map((item) => {
              const isFlipped = !!flippedWh[item.id];
              const selected = whAnswers[item.id];
              const isCorrect = selected === item.correctAnswer;
              const hasAnswered = !!selected;

              return (
                <div
                  key={item.id}
                  id={`wh-card-${item.id}`}
                  onClick={() => toggleFlip(item.id, setFlippedWh)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between select-none ${
                    isFlipped
                      ? isDark
                        ? 'bg-slate-900 border-indigo-500 ring-2 ring-indigo-500/20'
                        : 'bg-white border-indigo-500 ring-2 ring-indigo-400/20'
                      : isDark
                      ? 'bg-slate-900 border-white/10'
                      : 'bg-white border-slate-200'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white text-xs font-mono font-bold flex items-center justify-center">
                        {item.number}
                      </span>
                      <CardSpeechControl
                        textToSpeak={item.fullSentenceEn}
                        accent={accent}
                        initialSpeed={speechRate}
                      />
                    </div>

                    <div className="text-base font-semibold mb-4 leading-relaxed">
                      {isFlipped ? (
                        <span className="italic">{item.fullSentenceEs}</span>
                      ) : (
                        <span>
                          {item.sentenceBefore}{' '}
                          <span className="inline-block px-3 py-0.5 border-b-2 border-indigo-500 font-mono text-indigo-600 dark:text-indigo-400">
                            {selected || '____'}
                          </span>{' '}
                          {item.sentenceAfter}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Options selection */}
                  <div
                    className="flex items-center gap-2 pt-3 border-t border-inherit/15"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {item.options.map((opt) => {
                      const isOptSelected = selected === opt;
                      const optIsCorrect = opt === item.correctAnswer;

                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() =>
                            setWhAnswers((prev) => ({ ...prev, [item.id]: opt }))
                          }
                          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold font-mono tracking-wider transition-all cursor-pointer border ${
                            isOptSelected
                              ? optIsCorrect
                                ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                                : 'bg-rose-600 text-white border-rose-600'
                              : isDark
                              ? 'bg-slate-800 border-white/10 hover:bg-slate-700'
                              : 'bg-slate-100 border-slate-200 hover:bg-slate-200'
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}

                    {hasAnswered && (
                      <span className="shrink-0 p-1">
                        {isCorrect ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                        ) : (
                          <XCircle className="w-5 h-5 text-rose-500" />
                        )}
                      </span>
                    )}
                  </div>

                  {/* Flip explanation */}
                  {isFlipped && (
                    <div className="mt-3 pt-2 border-t border-inherit/15 text-xs opacity-80">
                      <p>{item.explanationEs}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 6: MULTIPLE CHOICE — 15 POINTS */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'quiz' && (
        <div className="flex flex-col gap-5">
          <div
            className={`p-5 rounded-2xl border ${
              isDark ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-200'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-bold text-base sm:text-lg">
                  BE — PRESENT & PAST: Multiple Choice (15 points)
                </h3>
                <p className="text-xs opacity-75 mt-0.5">
                  Distingue entre presente (am, is, are) y pasado (was, were). Toca la tarjeta para voltear y ver la explicación completa.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-xl text-xs font-mono font-bold bg-indigo-500/15 border border-indigo-500/30 text-indigo-600 dark:text-indigo-400">
                  Puntaje: {quizScore} / {BE_PRESENT_PAST_QUIZ.length}
                </span>

                <button
                  type="button"
                  onClick={() => setQuizAnswers({})}
                  className={`px-3 py-1 rounded-xl text-xs font-semibold flex items-center gap-1.5 border cursor-pointer ${
                    isDark ? 'bg-white/5 border-white/10' : 'bg-slate-100 border-slate-200'
                  }`}
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reiniciar</span>
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {BE_PRESENT_PAST_QUIZ.map((q) => {
              const isFlipped = !!flippedQuiz[q.id];
              const selected = quizAnswers[q.id];
              const hasAnswered = !!selected;
              const correctOption = q.options.find((o) => o.isCorrect);
              const isCorrect = selected === correctOption?.key;

              return (
                <div
                  key={q.id}
                  id={`quiz-card-${q.id}`}
                  onClick={() => toggleFlip(q.id, setFlippedQuiz)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between select-none ${
                    isFlipped
                      ? isDark
                        ? 'bg-slate-900 border-indigo-500 ring-2 ring-indigo-500/20'
                        : 'bg-white border-indigo-500 ring-2 ring-indigo-400/20'
                      : isDark
                      ? 'bg-slate-900 border-white/10'
                      : 'bg-white border-slate-200'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white text-xs font-mono font-bold flex items-center justify-center">
                        {q.number}
                      </span>
                      <CardSpeechControl
                        textToSpeak={q.questionEn.replace('___', correctOption?.text || '')}
                        accent={accent}
                        initialSpeed={speechRate}
                      />
                    </div>

                    <div className="text-base font-semibold mb-4 leading-relaxed">
                      {isFlipped ? (
                        <span className="italic">{q.questionEs}</span>
                      ) : (
                        <span>{q.questionEn}</span>
                      )}
                    </div>

                    {/* 4 Options */}
                    <div
                      className="grid grid-cols-2 gap-2 mb-3"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {q.options.map((opt) => {
                        const isSelected = selected === opt.key;
                        return (
                          <button
                            key={opt.key}
                            type="button"
                            onClick={() =>
                              setQuizAnswers((prev) => ({ ...prev, [q.id]: opt.key }))
                            }
                            className={`py-2 px-3 rounded-xl text-xs font-medium flex items-center justify-between border transition-all cursor-pointer text-left ${
                              isSelected
                                ? opt.isCorrect
                                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                                  : 'bg-rose-600 text-white border-rose-600'
                                : hasAnswered && opt.isCorrect
                                ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-600 dark:text-emerald-400'
                                : isDark
                                ? 'bg-slate-800 border-white/10 hover:bg-slate-750'
                                : 'bg-slate-100 border-slate-200 hover:bg-slate-200'
                            }`}
                          >
                            <span className="font-mono font-bold mr-1.5">{opt.key})</span>
                            <span className="flex-1 font-semibold">{opt.text}</span>
                            {isSelected && (
                              <span>
                                {opt.isCorrect ? (
                                  <Check className="w-3.5 h-3.5" />
                                ) : (
                                  <XCircle className="w-3.5 h-3.5" />
                                )}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Explanation on flip or after answering */}
                  {isFlipped ? (
                    <div className="pt-2 border-t border-inherit/15 text-xs opacity-90">
                      <p>{q.explanationEs}</p>
                    </div>
                  ) : hasAnswered ? (
                    <div className="pt-2 border-t border-inherit/15 text-xs opacity-75">
                      <p>{isCorrect ? q.explanationEn : q.explanationEs}</p>
                    </div>
                  ) : null}
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
          {/* Quick Conjugation Table */}
          <div
            className={`p-6 rounded-3xl border ${
              isDark ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-200'
            }`}
          >
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-600" />
              <span>Tabla Resumen Rápida: Presente vs Pasado</span>
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="border-b border-inherit/20 text-indigo-600 dark:text-indigo-400 font-mono uppercase tracking-wider">
                    <th className="py-2.5 px-3">Pronombre</th>
                    <th className="py-2.5 px-3">Presente (Afirmativo)</th>
                    <th className="py-2.5 px-3">Pasado (Afirmativo)</th>
                    <th className="py-2.5 px-3">Pasado (Negativo)</th>
                    <th className="py-2.5 px-3">Pregunta en Pasado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-inherit/10">
                  <tr>
                    <td className="py-2.5 px-3 font-bold font-mono">I</td>
                    <td className="py-2.5 px-3 font-mono">I am (I'm)</td>
                    <td className="py-2.5 px-3 font-mono font-bold text-emerald-600">I was</td>
                    <td className="py-2.5 px-3 font-mono">I wasn't</td>
                    <td className="py-2.5 px-3 font-mono">Was I...?</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-bold font-mono">He / She / It</td>
                    <td className="py-2.5 px-3 font-mono">He/She/It is</td>
                    <td className="py-2.5 px-3 font-mono font-bold text-emerald-600">was</td>
                    <td className="py-2.5 px-3 font-mono">wasn't</td>
                    <td className="py-2.5 px-3 font-mono">Was he/she/it...?</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-bold font-mono">You</td>
                    <td className="py-2.5 px-3 font-mono">You are (You're)</td>
                    <td className="py-2.5 px-3 font-mono font-bold text-indigo-600">were</td>
                    <td className="py-2.5 px-3 font-mono">weren't</td>
                    <td className="py-2.5 px-3 font-mono">Were you...?</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-bold font-mono">We</td>
                    <td className="py-2.5 px-3 font-mono">We are (We're)</td>
                    <td className="py-2.5 px-3 font-mono font-bold text-indigo-600">were</td>
                    <td className="py-2.5 px-3 font-mono">weren't</td>
                    <td className="py-2.5 px-3 font-mono">Were we...?</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-bold font-mono">They</td>
                    <td className="py-2.5 px-3 font-mono">They are (They're)</td>
                    <td className="py-2.5 px-3 font-mono font-bold text-indigo-600">were</td>
                    <td className="py-2.5 px-3 font-mono">weren't</td>
                    <td className="py-2.5 px-3 font-mono">Were they...?</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Consolidated Answer Keys */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Exercise 1 & 2 Answers */}
            <div
              className={`p-6 rounded-3xl border ${
                isDark ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-200'
              }`}
            >
              <h4 className="font-bold text-base mb-3 text-indigo-600 dark:text-indigo-400">
                Clave de Respuestas: Ejercicio 1 y 2
              </h4>
              <div className="space-y-3 text-xs">
                <div>
                  <span className="font-bold font-mono uppercase tracking-wider block mb-1">
                    Ejercicio 1 (Was / Were):
                  </span>
                  <ol className="list-decimal list-inside space-y-0.5 opacity-90">
                    <li>I <strong>was</strong> very tired yesterday.</li>
                    <li>She <strong>was</strong> at home.</li>
                    <li>They <strong>were</strong> very happy.</li>
                    <li>We <strong>were</strong> late.</li>
                    <li>He <strong>was</strong> angry.</li>
                    <li>You <strong>were</strong> very busy.</li>
                    <li>It <strong>was</strong> very cold.</li>
                    <li>My parents <strong>were</strong> at work.</li>
                    <li>The movie <strong>was</strong> fantastic.</li>
                    <li>I <strong>was</strong> at school yesterday.</li>
                  </ol>
                </div>

                <div className="pt-3 border-t border-inherit/15">
                  <span className="font-bold font-mono uppercase tracking-wider block mb-1">
                    Ejercicio 2 (Wasn't / Weren't):
                  </span>
                  <ol className="list-decimal list-inside space-y-0.5 opacity-90">
                    <li>I <strong>wasn't</strong> at home yesterday.</li>
                    <li>She <strong>wasn't</strong> tired.</li>
                    <li>They <strong>weren't</strong> happy.</li>
                    <li>We <strong>weren't</strong> late.</li>
                    <li>He <strong>wasn't</strong> at work.</li>
                    <li>You <strong>weren't</strong> alone.</li>
                    <li>It <strong>wasn't</strong> expensive.</li>
                    <li>They <strong>weren't</strong> ready.</li>
                  </ol>
                </div>
              </div>
            </div>

            {/* Exercise 3 & WH- Answers */}
            <div
              className={`p-6 rounded-3xl border ${
                isDark ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-200'
              }`}
            >
              <h4 className="font-bold text-base mb-3 text-indigo-600 dark:text-indigo-400">
                Clave de Respuestas: Ejercicio 3, WH- & Test
              </h4>
              <div className="space-y-3 text-xs">
                <div>
                  <span className="font-bold font-mono uppercase tracking-wider block mb-1">
                    Ejercicio 3 (Questions):
                  </span>
                  <ul className="space-y-0.5 opacity-90 font-mono">
                    <li>1. Was he at home?</li>
                    <li>2. Were they happy?</li>
                    <li>3. Were you late?</li>
                    <li>4. Was she angry?</li>
                    <li>5. Were we tired?</li>
                    <li>6. Was he at work?</li>
                    <li>7. Were they hungry?</li>
                    <li>8. Were you busy?</li>
                  </ul>
                </div>

                <div className="pt-3 border-t border-inherit/15">
                  <span className="font-bold font-mono uppercase tracking-wider block mb-1">
                    WH- Questions:
                  </span>
                  <ul className="space-y-0.5 opacity-90 font-mono">
                    <li>1. were · 2. was · 3. were · 4. was · 5. was</li>
                    <li>6. was · 7. were · 8. were · 9. was · 10. was</li>
                  </ul>
                </div>

                <div className="pt-3 border-t border-inherit/15">
                  <span className="font-bold font-mono uppercase tracking-wider block mb-1">
                    Quiz (15 Pts):
                  </span>
                  <p className="font-mono opacity-90">
                    1.B (am) · 2.C (were) · 3.D (is) · 4.C (weren't) · 5.B (was) · 6.C (are) · 7.D (Were) · 8.A (Is) · 9.C (am not) · 10.B (were) · 11.C (was) · 12.C (are) · 13.B (Were) · 14.A (is/was) · 15.B (weren't/are)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
