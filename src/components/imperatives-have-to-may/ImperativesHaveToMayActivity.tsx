import React, { useState, useRef, useEffect } from 'react';
import {
  CheckCircle2,
  XCircle,
  BookOpen,
  CheckSquare,
  HelpCircle,
  Sparkles,
  Check,
  RotateCcw,
  Brain,
  Trophy,
  ChevronLeft,
  ChevronRight,
  Volume2,
  RefreshCw,
  Languages,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { CardSpeechControl } from '../CardSpeechControl';
import { speakEnglish, playFeedbackSound, stopSpeaking } from '../../utils/audio';
import {
  IMPERATIVES_THEORY,
  EXERCISE_1_ITEMS,
  EXERCISE_1_WORD_BANK,
  EXERCISE_2_ITEMS,
  EXERCISE_3_ITEMS,
  EXERCISE_4_ITEMS,
  EXERCISE_5_ITEMS,
  MIXED_REVIEW_ITEMS,
} from '../../data/imperativesHaveToMayData';

interface ImperativesHaveToMayActivityProps {
  accent?: 'US' | 'UK';
  speechRate?: number;
  onSuccess?: () => void;
}

type TabType =
  | 'theory'
  | 'ex1'
  | 'ex2'
  | 'ex3'
  | 'ex4'
  | 'ex5'
  | 'ex6'
  | 'answers';

const MASTERCLASS_TABS: { id: TabType; label: string; icon: React.ElementType }[] = [
  { id: 'theory', label: 'Reglas y Teoría', icon: BookOpen },
  { id: 'ex1', label: '1. Imperatives: Sentences', icon: CheckSquare },
  { id: 'ex2', label: '2. Imperatives: Options', icon: Sparkles },
  { id: 'ex3', label: '3. Have to / Has to', icon: Brain },
  { id: 'ex4', label: '4. Have to: Options', icon: CheckCircle2 },
  { id: 'ex5', label: '5. May: Options', icon: HelpCircle },
  { id: 'ex6', label: '6. Mixed Review (12)', icon: Trophy },
  { id: 'answers', label: 'Guía y Respuestas', icon: BookOpen },
];

export const ImperativesHaveToMayActivity: React.FC<
  ImperativesHaveToMayActivityProps
> = ({ accent = 'US', speechRate = 1.0, onSuccess }) => {
  const { isDark } = useTheme();

  // Active navigation tab
  const [activeTab, setActiveTab] = useState<TabType>('theory');
  const [speed, setSpeed] = useState<number>(speechRate);
  const tabsContainerRef = useRef<HTMLDivElement>(null);

  const currentTabIndex = MASTERCLASS_TABS.findIndex((t) => t.id === activeTab);

  const goToTab = (tabId: TabType) => {
    stopSpeaking();
    setActiveTab(tabId);
    playFeedbackSound('click');
    setTimeout(() => {
      const el = document.getElementById(`imp-tab-${tabId}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }, 40);
  };

  const handlePrevTab = () => {
    if (currentTabIndex > 0) {
      goToTab(MASTERCLASS_TABS[currentTabIndex - 1].id);
    }
  };

  const handleNextTab = () => {
    if (currentTabIndex < MASTERCLASS_TABS.length - 1) {
      goToTab(MASTERCLASS_TABS[currentTabIndex + 1].id);
    }
  };

  // Keyboard navigation (< and >)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeTag = document.activeElement?.tagName.toLowerCase();
      if (activeTag === 'input' || activeTag === 'textarea' || activeTag === 'select') return;

      if (e.key === 'ArrowLeft') {
        handlePrevTab();
      } else if (e.key === 'ArrowRight') {
        handleNextTab();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentTabIndex]);

  // Flip states for reversible cards across all tabs
  const [flippedTheory, setFlippedTheory] = useState<Record<string, boolean>>({});
  const [flippedEx1, setFlippedEx1] = useState<Record<string, boolean>>({});
  const [flippedEx2, setFlippedEx2] = useState<Record<string, boolean>>({});
  const [flippedEx3, setFlippedEx3] = useState<Record<string, boolean>>({});
  const [flippedEx4, setFlippedEx4] = useState<Record<string, boolean>>({});
  const [flippedEx5, setFlippedEx5] = useState<Record<string, boolean>>({});
  const [flippedEx6, setFlippedEx6] = useState<Record<string, boolean>>({});

  const toggleFlip = (
    id: string,
    setMap: React.Dispatch<React.SetStateAction<Record<string, boolean>>>
  ) => {
    playFeedbackSound('flip');
    setMap((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Helper normalizer
  const normalize = (str: string) =>
    str
      .trim()
      .toLowerCase()
      .replace(/[.,/#!$%^&*;:{}=\-_`~()?'"]/g, '')
      .replace(/\s+/g, ' ');

  // -------------------------------------------------------------
  // STATE: EXERCISE 1 (Complete the Sentences)
  // -------------------------------------------------------------
  const [ex1Inputs, setEx1Inputs] = useState<Record<string, string>>({});
  const [ex1Checked, setEx1Checked] = useState(false);

  const getEx1IsCorrect = (id: string, acceptable: string[]) => {
    const val = normalize(ex1Inputs[id] || '');
    if (!val) return false;
    return acceptable.some((ans) => normalize(ans) === val);
  };

  const ex1Score = EXERCISE_1_ITEMS.filter((item) =>
    getEx1IsCorrect(item.id, item.acceptableAnswers)
  ).length;

  // -------------------------------------------------------------
  // STATE: EXERCISE 2 (Imperatives: Choose Correct Option)
  // -------------------------------------------------------------
  const [ex2Answers, setEx2Answers] = useState<Record<string, string>>({});
  const [ex2Checked, setEx2Checked] = useState(false);

  const ex2Score = EXERCISE_2_ITEMS.filter(
    (item) => ex2Answers[item.id] === item.correctAnswer
  ).length;

  // -------------------------------------------------------------
  // STATE: EXERCISE 3 (Complete with Have to or Has to)
  // -------------------------------------------------------------
  const [ex3Answers, setEx3Answers] = useState<Record<string, 'have to' | 'has to'>>({});
  const [ex3Checked, setEx3Checked] = useState(false);

  const ex3Score = EXERCISE_3_ITEMS.filter(
    (item) => ex3Answers[item.id] === item.correctAnswer
  ).length;

  // -------------------------------------------------------------
  // STATE: EXERCISE 4 (Have to / Has to Options)
  // -------------------------------------------------------------
  const [ex4Answers, setEx4Answers] = useState<Record<string, string>>({});
  const [ex4Checked, setEx4Checked] = useState(false);

  const ex4Score = EXERCISE_4_ITEMS.filter(
    (item) => ex4Answers[item.id] === item.correctAnswer
  ).length;

  // -------------------------------------------------------------
  // STATE: EXERCISE 5 (May Options)
  // -------------------------------------------------------------
  const [ex5Answers, setEx5Answers] = useState<Record<string, string>>({});
  const [ex5Checked, setEx5Checked] = useState(false);

  const ex5Score = EXERCISE_5_ITEMS.filter(
    (item) => ex5Answers[item.id] === item.correctAnswer
  ).length;

  // -------------------------------------------------------------
  // STATE: EXERCISE 6 (Mixed Review 12 Questions)
  // -------------------------------------------------------------
  const [ex6Answers, setEx6Answers] = useState<Record<string, string>>({});
  const [ex6Checked, setEx6Checked] = useState(false);

  const ex6Score = MIXED_REVIEW_ITEMS.filter(
    (item) => ex6Answers[item.id] === item.correctAnswer
  ).length;

  return (
    <div className="w-full flex flex-col gap-6 select-none pb-12">
      {/* ------------------------------------------------------------- */}
      {/* TOP HEADER / UNIT TITLE */}
      {/* ------------------------------------------------------------- */}
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
                Unit 9 · Section 1
              </span>
              <span className="text-xs font-mono opacity-60">Grammar Masterclass & Real Practice</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight">
              IMPERATIVES, HAVE TO & MAY
            </h2>
            <p className="text-sm opacity-80 mt-1 max-w-3xl leading-relaxed">
              Aprende y domina el modo imperativo para órdenes e instrucciones (afirmativas y negativas), el uso de <em>have to / has to</em> para obligaciones y necesidades externas, y el verbo modal <em>may</em> para pedir permiso formal y expresar posibilidades. Todas las tarjetas son <strong>100% reversibles (🔄)</strong> incluyendo la traducción de oraciones, opciones y explicaciones.
            </p>
          </div>

          {/* Header Audio Controller */}
          <div className="shrink-0 flex items-center gap-2 bg-slate-50 dark:bg-slate-800/80 p-2 rounded-2xl border border-inherit/20">
            <CardSpeechControl
              textToSpeak="Imperatives, have to and may. Real practice. Learn how to give commands, express obligations with have to, and ask permission or state possibilities with may."
              accent={accent}
              initialSpeed={speechRate}
              onSpeedChange={(newSpeed) => setSpeed(newSpeed)}
            />
          </div>
        </div>

        {/* Section Navigation Tabs with Floating Prev (<) & Next (>) Buttons */}
        <div className="relative flex items-center gap-2 pt-5 border-t border-inherit/15 mt-5">
          {/* Floating Left Button (<) */}
          <button
            type="button"
            id="imp-tabs-prev-button"
            onClick={handlePrevTab}
            disabled={currentTabIndex <= 0}
            className={`shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center border transition-all cursor-pointer select-none shadow-xs ${
              currentTabIndex <= 0
                ? 'opacity-30 cursor-not-allowed border-inherit/20 text-slate-400'
                : isDark
                ? 'bg-slate-800 hover:bg-sky-600 text-white border-white/10 hover:border-sky-400 shadow-md hover:scale-105 active:scale-95'
                : 'bg-white hover:bg-sky-600 text-slate-700 hover:text-white border-slate-200 hover:border-sky-600 shadow-sm hover:scale-105 active:scale-95'
            }`}
            title={currentTabIndex > 0 ? `Sección anterior: ${MASTERCLASS_TABS[currentTabIndex - 1].label}` : 'Primera sección'}
            aria-label="Pestaña anterior"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Scrollable Tabs Row */}
          <div
            ref={tabsContainerRef}
            className="flex-1 flex items-center gap-1.5 overflow-x-auto no-scrollbar scroll-smooth py-1"
          >
            {MASTERCLASS_TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`imp-tab-${tab.id}`}
                  type="button"
                  onClick={() => goToTab(tab.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 border shrink-0 ${
                    isActive
                      ? 'bg-sky-600 text-white border-sky-500 shadow-xs'
                      : isDark
                      ? 'bg-slate-800/70 border-white/10 text-slate-300 hover:bg-slate-800'
                      : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200/80'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Floating Right Button (>) */}
          <button
            type="button"
            id="imp-tabs-next-button"
            onClick={handleNextTab}
            disabled={currentTabIndex >= MASTERCLASS_TABS.length - 1}
            className={`shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center border transition-all cursor-pointer select-none shadow-xs ${
              currentTabIndex >= MASTERCLASS_TABS.length - 1
                ? 'opacity-30 cursor-not-allowed border-inherit/20 text-slate-400'
                : isDark
                ? 'bg-slate-800 hover:bg-sky-600 text-white border-white/10 hover:border-sky-400 shadow-md hover:scale-105 active:scale-95'
                : 'bg-white hover:bg-sky-600 text-slate-700 hover:text-white border-slate-200 hover:border-sky-600 shadow-sm hover:scale-105 active:scale-95'
            }`}
            title={currentTabIndex < MASTERCLASS_TABS.length - 1 ? `Siguiente sección: ${MASTERCLASS_TABS[currentTabIndex + 1].label}` : 'Última sección'}
            aria-label="Siguiente pestaña"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* TAB 0: REGLAS Y TEORÍA (TARJETAS REVERSIBLES 3D) */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'theory' && (
        <div className="flex flex-col gap-6 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {IMPERATIVES_THEORY.map((topic) => {
              const isFlipped = !!flippedTheory[topic.id];

              return (
                <div
                  key={topic.id}
                  id={`theory-card-${topic.id}`}
                  className={`rounded-3xl border p-5 sm:p-6 transition-all duration-200 shadow-xs flex flex-col justify-between ${
                    isFlipped
                      ? isDark
                        ? 'bg-slate-900 border-sky-500/60 ring-2 ring-sky-500/20 text-white'
                        : 'bg-white border-sky-500 ring-2 ring-sky-400/20 text-slate-900 shadow-md'
                      : isDark
                      ? 'bg-slate-900 border-white/10 text-white'
                      : 'bg-white border-slate-200 text-slate-900'
                  }`}
                >
                  <div>
                    {/* Top Row: Category tag and controls */}
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-sky-600 dark:text-sky-400 border border-slate-200 dark:border-white/10">
                        {isFlipped ? topic.categoryEs : topic.category}
                      </span>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => toggleFlip(topic.id, setFlippedTheory)}
                          className="px-2.5 py-1 rounded-xl text-xs font-bold bg-sky-50 dark:bg-sky-950/50 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800/50 hover:bg-sky-100 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                          title="Voltear tarjeta / Ver traducción"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                          <span>{isFlipped ? 'Ver en Inglés' : 'Ver Traducción 🔄'}</span>
                        </button>
                        <CardSpeechControl
                          textToSpeak={`${topic.titleEn}. ${topic.textEn}. ${topic.examples
                            .map((ex) => ex.en)
                            .join('. ')}`}
                          accent={accent}
                          initialSpeed={speed}
                        />
                      </div>
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
                          className="p-2.5 rounded-xl border border-slate-200/80 dark:border-white/5 bg-slate-50/70 dark:bg-slate-800/40 text-xs sm:text-sm"
                        >
                          <p className="font-semibold text-sky-900 dark:text-sky-200">
                            {isFlipped ? ex.es : ex.en}
                          </p>
                          <p className="text-xs opacity-70 mt-0.5 italic">
                            {isFlipped ? ex.en : ex.es}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Footer Note / Tip */}
                  <div className="pt-3 border-t border-inherit/20 flex items-center justify-between text-xs opacity-75">
                    <span className="italic">
                      {isFlipped ? topic.grammarTipEs : topic.grammarTipEn}
                    </span>
                    <button
                      type="button"
                      onClick={() => toggleFlip(topic.id, setFlippedTheory)}
                      className="font-mono text-[11px] font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider shrink-0 ml-2 hover:underline cursor-pointer"
                    >
                      {isFlipped ? 'Inglés ↻' : 'Español ↻'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 1: EXERCISE 1 – COMPLETE THE SENTENCES (IMPERATIVES) */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'ex1' && (
        <div className="flex flex-col gap-6 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl border bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-white/10">
            <div>
              <span className="text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider">
                Exercise 1 · 8 Oraciones
              </span>
              <h3 className="text-lg font-bold mt-0.5">Complete the Sentences with the Correct Imperative Form</h3>
              <p className="text-xs sm:text-sm opacity-80 mt-0.5">
                Escribe o selecciona la forma imperativa adecuada para cada instrucción. Todas las tarjetas son reversibles (🔄).
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
                Puntaje: {ex1Score} / {EXERCISE_1_ITEMS.length}
              </span>
              <button
                type="button"
                onClick={() => {
                  setEx1Checked((prev) => !prev);
                  playFeedbackSound(ex1Checked ? 'click' : 'complete');
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-sky-600 hover:bg-sky-700 text-white shadow-xs transition-all cursor-pointer"
              >
                {ex1Checked ? 'Ocultar Corrección' : 'Comprobar'}
              </button>
            </div>
          </div>

          {/* Word Bank Chips (Bilingual: English + Spanish tooltip) */}
          <div className="p-4 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
              Banco de ayuda bilingüe (haz clic en una opción para copiarla al primer campo disponible):
            </span>
            <div className="flex flex-wrap gap-2">
              {EXERCISE_1_WORD_BANK.map((wordObj, wIdx) => (
                <button
                  key={wIdx}
                  type="button"
                  onClick={() => {
                    playFeedbackSound('click');
                    const firstEmpty = EXERCISE_1_ITEMS.find((it) => !ex1Inputs[it.id]);
                    if (firstEmpty) {
                      setEx1Inputs((prev) => ({ ...prev, [firstEmpty.id]: wordObj.en }));
                    }
                  }}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-sky-100 dark:bg-slate-800 dark:hover:bg-sky-950 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-white/10 transition-colors flex items-center gap-1.5 cursor-pointer"
                  title={`Traducción: ${wordObj.es}`}
                >
                  <span className="font-bold">{wordObj.en}</span>
                  <span className="text-[11px] opacity-60 italic">({wordObj.es})</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {EXERCISE_1_ITEMS.map((item) => {
              const isFlipped = !!flippedEx1[item.id];
              const userVal = ex1Inputs[item.id] || '';
              const isCorrect = getEx1IsCorrect(item.id, item.acceptableAnswers);

              return (
                <div
                  key={item.id}
                  className={`rounded-3xl border p-5 transition-all duration-200 shadow-xs flex flex-col justify-between ${
                    isFlipped
                      ? isDark
                        ? 'bg-slate-900 border-sky-500/60 ring-2 ring-sky-500/20 text-white'
                        : 'bg-white border-sky-500 ring-2 ring-sky-400/20 text-slate-900 shadow-md'
                      : isDark
                      ? 'bg-slate-900 border-white/10 text-white'
                      : 'bg-white border-slate-200 text-slate-900'
                  }`}
                >
                  <div>
                    {/* Header with number, audio and flip button */}
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <span className="w-7 h-7 rounded-xl bg-slate-100 dark:bg-slate-800 text-sky-600 dark:text-sky-400 font-mono font-bold text-xs flex items-center justify-center border border-slate-200 dark:border-white/10">
                        {item.number}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => toggleFlip(item.id, setFlippedEx1)}
                          className="px-2.5 py-1 rounded-xl text-xs font-bold bg-sky-50 dark:bg-sky-950/50 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800/50 hover:bg-sky-100 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                          title="Voltear tarjeta / Ver traducción"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                          <span>{isFlipped ? 'Ver en Inglés' : 'Ver Traducción 🔄'}</span>
                        </button>
                        <CardSpeechControl
                          textToSpeak={item.fullSentence}
                          accent={accent}
                          initialSpeed={speed}
                        />
                      </div>
                    </div>

                    {/* FRONT: English with input field */}
                    {!isFlipped ? (
                      <div className="space-y-3">
                        <div className="text-base font-medium flex flex-wrap items-center gap-2">
                          <span>{item.sentenceBefore}</span>
                          <input
                            type="text"
                            value={userVal}
                            placeholder="Escribe aquí..."
                            onChange={(e) =>
                              setEx1Inputs((prev) => ({ ...prev, [item.id]: e.target.value }))
                            }
                            className={`px-3 py-1.5 rounded-xl border text-sm font-semibold transition-all outline-none ${
                              ex1Checked
                                ? isCorrect
                                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-800 dark:text-emerald-300 ring-2 ring-emerald-200'
                                  : 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-800 dark:text-rose-300 ring-2 ring-rose-200'
                                : 'bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:border-sky-500 focus:ring-2 focus:ring-sky-200'
                            }`}
                          />
                          <span>{item.sentenceAfter}</span>
                        </div>

                        {ex1Checked && (
                          <div className="text-xs flex items-center gap-1.5">
                            {isCorrect ? (
                              <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                                <CheckCircle2 className="w-4 h-4" /> ¡Correcto! ({userVal})
                              </span>
                            ) : (
                              <span className="text-rose-600 dark:text-rose-400 font-bold flex items-center gap-1">
                                <XCircle className="w-4 h-4" /> Sugerencia correcta: {item.suggestedAnswer}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    ) : (
                      /* BACK: Full Spanish Translation & Grammar Explanation */
                      <div className="space-y-3 p-4 rounded-2xl bg-sky-50/80 dark:bg-sky-950/40 border border-sky-100 dark:border-sky-900/50 animate-in fade-in duration-150">
                        <div>
                          <span className="text-[11px] font-bold uppercase tracking-wider text-sky-800 dark:text-sky-300 block mb-1">
                            Oración traducida con el espacio:
                          </span>
                          <p className="text-base font-bold text-slate-900 dark:text-white leading-relaxed">
                            {item.sentenceBeforeEs} <span className="underline decoration-sky-500 font-extrabold text-sky-700 dark:text-sky-300">[{item.suggestedAnswerEs}]</span> {item.sentenceAfterEs}
                          </p>
                        </div>

                        <div className="pt-2 border-t border-sky-200/60 dark:border-sky-900/40">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-0.5">
                            Traducción completa:
                          </span>
                          <p className="text-sm font-semibold text-sky-950 dark:text-sky-200">
                            {item.translation}
                          </p>
                        </div>

                        <div className="pt-2 border-t border-sky-200/60 dark:border-sky-900/40">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-0.5">
                            Explicación gramatical:
                          </span>
                          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                            {item.explanation}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-inherit/20 flex items-center justify-between text-xs opacity-75 mt-3">
                    <span className="italic">
                      {isFlipped ? 'Tarjeta en español (Traducción activa)' : 'Haz clic en "Ver Traducción 🔄" para voltear'}
                    </span>
                    <button
                      type="button"
                      onClick={() => toggleFlip(item.id, setFlippedEx1)}
                      className="font-mono text-[11px] font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider shrink-0 ml-2 hover:underline cursor-pointer"
                    >
                      {isFlipped ? 'Inglés ↻' : 'Español ↻'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 2: EXERCISE 2 – CHOOSE THE CORRECT OPTION (IMPERATIVES) */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'ex2' && (
        <div className="flex flex-col gap-6 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl border bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-white/10">
            <div>
              <span className="text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider">
                Exercise 2 · 4 Preguntas
              </span>
              <h3 className="text-lg font-bold mt-0.5">Choose the Correct Option (Imperatives)</h3>
              <p className="text-xs sm:text-sm opacity-80 mt-0.5">
                Selecciona la opción correcta. Cada tarjeta se puede voltear (🔄) para ver la pregunta y opciones en español.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
                Puntaje: {ex2Score} / {EXERCISE_2_ITEMS.length}
              </span>
              <button
                type="button"
                onClick={() => {
                  setEx2Checked((prev) => !prev);
                  playFeedbackSound(ex2Checked ? 'click' : 'complete');
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-sky-600 hover:bg-sky-700 text-white shadow-xs transition-all cursor-pointer"
              >
                {ex2Checked ? 'Ocultar Corrección' : 'Comprobar'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {EXERCISE_2_ITEMS.map((item) => {
              const isFlipped = !!flippedEx2[item.id];
              const selectedKey = ex2Answers[item.id];
              const isCorrect = selectedKey === item.correctAnswer;

              return (
                <div
                  key={item.id}
                  className={`rounded-3xl border p-5 transition-all duration-200 shadow-xs flex flex-col justify-between ${
                    isFlipped
                      ? isDark
                        ? 'bg-slate-900 border-sky-500/60 ring-2 ring-sky-500/20 text-white'
                        : 'bg-white border-sky-500 ring-2 ring-sky-400/20 text-slate-900 shadow-md'
                      : isDark
                      ? 'bg-slate-900 border-white/10 text-white'
                      : 'bg-white border-slate-200 text-slate-900'
                  }`}
                >
                  <div>
                    {/* Top Row: number, audio and flip button */}
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <span className="w-7 h-7 rounded-xl bg-slate-100 dark:bg-slate-800 text-sky-600 dark:text-sky-400 font-mono font-bold text-xs flex items-center justify-center border border-slate-200 dark:border-white/10">
                        {item.number}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => toggleFlip(item.id, setFlippedEx2)}
                          className="px-2.5 py-1 rounded-xl text-xs font-bold bg-sky-50 dark:bg-sky-950/50 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800/50 hover:bg-sky-100 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                          title="Voltear tarjeta / Ver traducción"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                          <span>{isFlipped ? 'Ver en Inglés' : 'Ver Traducción 🔄'}</span>
                        </button>
                        <CardSpeechControl
                          textToSpeak={item.fullSentence}
                          accent={accent}
                          initialSpeed={speed}
                        />
                      </div>
                    </div>

                    {/* FRONT: English question and English options */}
                    {!isFlipped ? (
                      <div>
                        <h4 className="text-base font-semibold mb-4 leading-relaxed">
                          {item.question}
                        </h4>

                        <div className="flex flex-col gap-2 mb-3">
                          {item.options.map((opt) => {
                            const isChosen = selectedKey === opt.key;
                            const isThisCorrect = opt.key === item.correctAnswer;

                            return (
                              <button
                                key={opt.key}
                                type="button"
                                onClick={() => {
                                  playFeedbackSound('click');
                                  setEx2Answers((prev) => ({ ...prev, [item.id]: opt.key }));
                                }}
                                className={`p-3 rounded-2xl border text-sm font-semibold flex items-center justify-between transition-all cursor-pointer ${
                                  ex2Checked
                                    ? isThisCorrect
                                      ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-800 dark:text-emerald-300 ring-2 ring-emerald-200'
                                      : isChosen
                                      ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-800 dark:text-rose-300 ring-2 ring-rose-200'
                                      : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-white/5 opacity-60'
                                    : isChosen
                                    ? 'bg-sky-50 dark:bg-sky-950/40 border-sky-500 text-sky-900 dark:text-sky-200 ring-2 ring-sky-200 shadow-sm'
                                    : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-white/5 hover:border-sky-300 text-slate-800 dark:text-slate-200'
                                }`}
                              >
                                <span className="flex items-center gap-2">
                                  <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-xs">
                                    {opt.key}
                                  </span>
                                  <span>{opt.text}</span>
                                </span>
                                {ex2Checked && isThisCorrect && (
                                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ) : (
                      /* BACK: Spanish question and translated options */
                      <div className="space-y-4 p-4 rounded-2xl bg-sky-50/80 dark:bg-sky-950/40 border border-sky-100 dark:border-sky-900/50 animate-in fade-in duration-150">
                        <div>
                          <span className="text-[11px] font-bold uppercase tracking-wider text-sky-800 dark:text-sky-300 block mb-1">
                            Pregunta en Español:
                          </span>
                          <h4 className="text-base font-bold text-slate-900 dark:text-white leading-relaxed">
                            {item.questionEs}
                          </h4>
                        </div>

                        {/* Options in Spanish */}
                        <div className="space-y-2">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
                            Opciones traducidas y su explicación:
                          </span>
                          {item.options.map((opt) => {
                            const isCorrectOpt = opt.key === item.correctAnswer;
                            return (
                              <div
                                key={opt.key}
                                className={`p-2.5 rounded-xl border text-xs sm:text-sm ${
                                  isCorrectOpt
                                    ? 'bg-emerald-100/70 dark:bg-emerald-950/60 border-emerald-400 text-emerald-950 dark:text-emerald-200 font-semibold'
                                    : 'bg-white/80 dark:bg-slate-900/60 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300'
                                }`}
                              >
                                <span className="font-bold mr-2 uppercase">{opt.key})</span>
                                <strong>{opt.text}:</strong> <span>{opt.textEs}</span>
                              </div>
                            );
                          })}
                        </div>

                        {/* Grammar tip */}
                        <div className="pt-2 border-t border-sky-200/60 dark:border-sky-900/40">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-0.5">
                            Justificación:
                          </span>
                          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                            {item.explanation}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-inherit/20 flex items-center justify-between text-xs opacity-75 mt-3">
                    <span className="italic">
                      {isFlipped ? 'Tarjeta en español (Traducción activa)' : 'Haz clic en "Ver Traducción 🔄" para voltear'}
                    </span>
                    <button
                      type="button"
                      onClick={() => toggleFlip(item.id, setFlippedEx2)}
                      className="font-mono text-[11px] font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider shrink-0 ml-2 hover:underline cursor-pointer"
                    >
                      {isFlipped ? 'Inglés ↻' : 'Español ↻'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 3: EXERCISE 3 – COMPLETE WITH HAVE TO OR HAS TO */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'ex3' && (
        <div className="flex flex-col gap-6 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl border bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-white/10">
            <div>
              <span className="text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider">
                Exercise 3 · 8 Oraciones
              </span>
              <h3 className="text-lg font-bold mt-0.5">Complete with Have to or Has to</h3>
              <p className="text-xs sm:text-sm opacity-80 mt-0.5">
                Elige "have to" o "has to". Voltea la tarjeta (🔄) para ver la oración y opciones explicadas en español.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
                Puntaje: {ex3Score} / {EXERCISE_3_ITEMS.length}
              </span>
              <button
                type="button"
                onClick={() => {
                  setEx3Checked((prev) => !prev);
                  playFeedbackSound(ex3Checked ? 'click' : 'complete');
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-sky-600 hover:bg-sky-700 text-white shadow-xs transition-all cursor-pointer"
              >
                {ex3Checked ? 'Ocultar Corrección' : 'Comprobar'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {EXERCISE_3_ITEMS.map((item) => {
              const isFlipped = !!flippedEx3[item.id];
              const selected = ex3Answers[item.id];
              const isCorrect = selected === item.correctAnswer;

              return (
                <div
                  key={item.id}
                  className={`rounded-3xl border p-5 transition-all duration-200 shadow-xs flex flex-col justify-between ${
                    isFlipped
                      ? isDark
                        ? 'bg-slate-900 border-sky-500/60 ring-2 ring-sky-500/20 text-white'
                        : 'bg-white border-sky-500 ring-2 ring-sky-400/20 text-slate-900 shadow-md'
                      : isDark
                      ? 'bg-slate-900 border-white/10 text-white'
                      : 'bg-white border-slate-200 text-slate-900'
                  }`}
                >
                  <div>
                    {/* Top Row: number, audio and flip button */}
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <span className="w-7 h-7 rounded-xl bg-slate-100 dark:bg-slate-800 text-sky-600 dark:text-sky-400 font-mono font-bold text-xs flex items-center justify-center border border-slate-200 dark:border-white/10">
                        {item.number}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => toggleFlip(item.id, setFlippedEx3)}
                          className="px-2.5 py-1 rounded-xl text-xs font-bold bg-sky-50 dark:bg-sky-950/50 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800/50 hover:bg-sky-100 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                          title="Voltear tarjeta / Ver traducción"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                          <span>{isFlipped ? 'Ver en Inglés' : 'Ver Traducción 🔄'}</span>
                        </button>
                        <CardSpeechControl
                          textToSpeak={item.fullSentence}
                          accent={accent}
                          initialSpeed={speed}
                        />
                      </div>
                    </div>

                    {/* FRONT: English Sentence with Choice Buttons */}
                    {!isFlipped ? (
                      <div>
                        <div className="mb-4 text-base font-semibold leading-relaxed">
                          <span className="text-sky-800 dark:text-sky-300 font-bold">{item.subject}</span>{' '}
                          <span className="underline decoration-sky-400 decoration-2 px-1">
                            {selected || '________'}
                          </span>{' '}
                          <span>{item.restOfSentence}</span>
                        </div>

                        {/* Choice Buttons: have to vs has to */}
                        <div className="flex items-center gap-3 mb-3">
                          {(['have to', 'has to'] as const).map((opt) => {
                            const isChosen = selected === opt;
                            const isThisCorrect = opt === item.correctAnswer;

                            return (
                              <button
                                key={opt}
                                type="button"
                                onClick={() => {
                                  playFeedbackSound('click');
                                  setEx3Answers((prev) => ({ ...prev, [item.id]: opt }));
                                }}
                                className={`flex-1 py-2.5 px-3 rounded-xl border text-sm font-bold transition-all cursor-pointer ${
                                  ex3Checked
                                    ? isThisCorrect
                                      ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-800 dark:text-emerald-300 ring-2 ring-emerald-200'
                                      : isChosen
                                      ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-800 dark:text-rose-300 ring-2 ring-rose-200'
                                      : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-white/5 opacity-50'
                                    : isChosen
                                    ? 'bg-sky-600 text-white border-sky-600 shadow-md ring-2 ring-sky-300'
                                    : 'bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200'
                                }`}
                              >
                                {opt}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ) : (
                      /* BACK: Spanish sentence and translated options */
                      <div className="space-y-3 p-4 rounded-2xl bg-sky-50/80 dark:bg-sky-950/40 border border-sky-100 dark:border-sky-900/50 animate-in fade-in duration-150">
                        <div>
                          <span className="text-[11px] font-bold uppercase tracking-wider text-sky-800 dark:text-sky-300 block mb-1">
                            Oración en Español:
                          </span>
                          <p className="text-base font-bold text-slate-900 dark:text-white leading-relaxed">
                            {item.subjectEs} <span className="underline decoration-sky-500 text-sky-700 dark:text-sky-300">[{item.correctAnswer === 'have to' ? 'tengo/tenemos que' : 'tiene que'}]</span> {item.restOfSentenceEs}
                          </p>
                        </div>

                        {/* Options translated */}
                        <div className="space-y-1.5 pt-2 border-t border-sky-200/60 dark:border-sky-900/40">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
                            Opciones traducidas:
                          </span>
                          {item.optionsEs.map((opt) => (
                            <div
                              key={opt.key}
                              className={`p-2 rounded-xl border text-xs sm:text-sm ${
                                opt.key === item.correctAnswer
                                  ? 'bg-emerald-100/70 dark:bg-emerald-950/60 border-emerald-400 font-semibold text-emerald-950 dark:text-emerald-200'
                                  : 'bg-white/80 dark:bg-slate-900/60 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300'
                              }`}
                            >
                              <strong>{opt.text}:</strong> {opt.textEs}
                            </div>
                          ))}
                        </div>

                        <div className="pt-2 border-t border-sky-200/60 dark:border-sky-900/40">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-0.5">
                            Regla gramatical:
                          </span>
                          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                            {item.explanation}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-inherit/20 flex items-center justify-between text-xs opacity-75 mt-3">
                    <span className="italic">
                      {isFlipped ? 'Tarjeta en español (Traducción activa)' : 'Haz clic en "Ver Traducción 🔄" para voltear'}
                    </span>
                    <button
                      type="button"
                      onClick={() => toggleFlip(item.id, setFlippedEx3)}
                      className="font-mono text-[11px] font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider shrink-0 ml-2 hover:underline cursor-pointer"
                    >
                      {isFlipped ? 'Inglés ↻' : 'Español ↻'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 4: EXERCISE 4 – CHOOSE THE CORRECT OPTION (HAVE TO) */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'ex4' && (
        <div className="flex flex-col gap-6 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl border bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-white/10">
            <div>
              <span className="text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider">
                Exercise 4 · 6 Preguntas
              </span>
              <h3 className="text-lg font-bold mt-0.5">Choose the Correct Option (Have to / Has to)</h3>
              <p className="text-xs sm:text-sm opacity-80 mt-0.5">
                Pon a prueba el afirmativo, negativo ("don't/doesn't have to") y preguntas con "do/does". Todas las tarjetas son reversibles (🔄).
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
                Puntaje: {ex4Score} / {EXERCISE_4_ITEMS.length}
              </span>
              <button
                type="button"
                onClick={() => {
                  setEx4Checked((prev) => !prev);
                  playFeedbackSound(ex4Checked ? 'click' : 'complete');
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-sky-600 hover:bg-sky-700 text-white shadow-xs transition-all cursor-pointer"
              >
                {ex4Checked ? 'Ocultar Corrección' : 'Comprobar'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {EXERCISE_4_ITEMS.map((item) => {
              const isFlipped = !!flippedEx4[item.id];
              const selectedKey = ex4Answers[item.id];
              const isCorrect = selectedKey === item.correctAnswer;

              return (
                <div
                  key={item.id}
                  className={`rounded-3xl border p-5 transition-all duration-200 shadow-xs flex flex-col justify-between ${
                    isFlipped
                      ? isDark
                        ? 'bg-slate-900 border-sky-500/60 ring-2 ring-sky-500/20 text-white'
                        : 'bg-white border-sky-500 ring-2 ring-sky-400/20 text-slate-900 shadow-md'
                      : isDark
                      ? 'bg-slate-900 border-white/10 text-white'
                      : 'bg-white border-slate-200 text-slate-900'
                  }`}
                >
                  <div>
                    {/* Top Row: number, audio and flip button */}
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <span className="w-7 h-7 rounded-xl bg-slate-100 dark:bg-slate-800 text-sky-600 dark:text-sky-400 font-mono font-bold text-xs flex items-center justify-center border border-slate-200 dark:border-white/10">
                        {item.number}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => toggleFlip(item.id, setFlippedEx4)}
                          className="px-2.5 py-1 rounded-xl text-xs font-bold bg-sky-50 dark:bg-sky-950/50 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800/50 hover:bg-sky-100 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                          title="Voltear tarjeta / Ver traducción"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                          <span>{isFlipped ? 'Ver en Inglés' : 'Ver Traducción 🔄'}</span>
                        </button>
                        <CardSpeechControl
                          textToSpeak={item.fullSentence}
                          accent={accent}
                          initialSpeed={speed}
                        />
                      </div>
                    </div>

                    {!isFlipped ? (
                      <div>
                        <h4 className="text-base font-semibold mb-4 leading-relaxed">
                          {item.question}
                        </h4>

                        <div className="flex flex-col gap-2 mb-3">
                          {item.options.map((opt) => {
                            const isChosen = selectedKey === opt.key;
                            const isThisCorrect = opt.key === item.correctAnswer;

                            return (
                              <button
                                key={opt.key}
                                type="button"
                                onClick={() => {
                                  playFeedbackSound('click');
                                  setEx4Answers((prev) => ({ ...prev, [item.id]: opt.key }));
                                }}
                                className={`p-3 rounded-2xl border text-sm font-semibold flex items-center justify-between transition-all cursor-pointer ${
                                  ex4Checked
                                    ? isThisCorrect
                                      ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-800 dark:text-emerald-300 ring-2 ring-emerald-200'
                                      : isChosen
                                      ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-800 dark:text-rose-300 ring-2 ring-rose-200'
                                      : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-white/5 opacity-60'
                                    : isChosen
                                    ? 'bg-sky-50 dark:bg-sky-950/40 border-sky-500 text-sky-900 dark:text-sky-200 ring-2 ring-sky-200 shadow-sm'
                                    : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-white/5 hover:border-sky-300 text-slate-800 dark:text-slate-200'
                                }`}
                              >
                                <span className="flex items-center gap-2">
                                  <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-xs">
                                    {opt.key}
                                  </span>
                                  <span>{opt.text}</span>
                                </span>
                                {ex4Checked && isThisCorrect && (
                                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4 p-4 rounded-2xl bg-sky-50/80 dark:bg-sky-950/40 border border-sky-100 dark:border-sky-900/50 animate-in fade-in duration-150">
                        <div>
                          <span className="text-[11px] font-bold uppercase tracking-wider text-sky-800 dark:text-sky-300 block mb-1">
                            Pregunta en Español:
                          </span>
                          <h4 className="text-base font-bold text-slate-900 dark:text-white leading-relaxed">
                            {item.questionEs}
                          </h4>
                        </div>

                        <div className="space-y-2">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
                            Opciones traducidas y su explicación:
                          </span>
                          {item.options.map((opt) => {
                            const isCorrectOpt = opt.key === item.correctAnswer;
                            return (
                              <div
                                key={opt.key}
                                className={`p-2.5 rounded-xl border text-xs sm:text-sm ${
                                  isCorrectOpt
                                    ? 'bg-emerald-100/70 dark:bg-emerald-950/60 border-emerald-400 text-emerald-950 dark:text-emerald-200 font-semibold'
                                    : 'bg-white/80 dark:bg-slate-900/60 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300'
                                }`}
                              >
                                <span className="font-bold mr-2 uppercase">{opt.key})</span>
                                <strong>{opt.text}:</strong> <span>{opt.textEs}</span>
                              </div>
                            );
                          })}
                        </div>

                        <div className="pt-2 border-t border-sky-200/60 dark:border-sky-900/40">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-0.5">
                            Justificación:
                          </span>
                          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                            {item.explanation}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-inherit/20 flex items-center justify-between text-xs opacity-75 mt-3">
                    <span className="italic">
                      {isFlipped ? 'Tarjeta en español (Traducción activa)' : 'Haz clic en "Ver Traducción 🔄" para voltear'}
                    </span>
                    <button
                      type="button"
                      onClick={() => toggleFlip(item.id, setFlippedEx4)}
                      className="font-mono text-[11px] font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider shrink-0 ml-2 hover:underline cursor-pointer"
                    >
                      {isFlipped ? 'Inglés ↻' : 'Español ↻'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 5: EXERCISE 5 – CHOOSE THE CORRECT OPTION (MAY) */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'ex5' && (
        <div className="flex flex-col gap-6 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl border bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-white/10">
            <div>
              <span className="text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider">
                Exercise 5 · 6 Preguntas
              </span>
              <h3 className="text-lg font-bold mt-0.5">Choose the Correct Option (May: Permission & Possibility)</h3>
              <p className="text-xs sm:text-sm opacity-80 mt-0.5">
                Aprende la estructura formal con "May". Cada tarjeta se puede voltear (🔄) para ver la traducción completa.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
                Puntaje: {ex5Score} / {EXERCISE_5_ITEMS.length}
              </span>
              <button
                type="button"
                onClick={() => {
                  setEx5Checked((prev) => !prev);
                  playFeedbackSound(ex5Checked ? 'click' : 'complete');
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-sky-600 hover:bg-sky-700 text-white shadow-xs transition-all cursor-pointer"
              >
                {ex5Checked ? 'Ocultar Corrección' : 'Comprobar'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {EXERCISE_5_ITEMS.map((item) => {
              const isFlipped = !!flippedEx5[item.id];
              const selectedKey = ex5Answers[item.id];
              const isCorrect = selectedKey === item.correctAnswer;

              return (
                <div
                  key={item.id}
                  className={`rounded-3xl border p-5 transition-all duration-200 shadow-xs flex flex-col justify-between ${
                    isFlipped
                      ? isDark
                        ? 'bg-slate-900 border-sky-500/60 ring-2 ring-sky-500/20 text-white'
                        : 'bg-white border-sky-500 ring-2 ring-sky-400/20 text-slate-900 shadow-md'
                      : isDark
                      ? 'bg-slate-900 border-white/10 text-white'
                      : 'bg-white border-slate-200 text-slate-900'
                  }`}
                >
                  <div>
                    {/* Top Row: number, audio and flip button */}
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <span className="w-7 h-7 rounded-xl bg-slate-100 dark:bg-slate-800 text-sky-600 dark:text-sky-400 font-mono font-bold text-xs flex items-center justify-center border border-slate-200 dark:border-white/10">
                        {item.number}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => toggleFlip(item.id, setFlippedEx5)}
                          className="px-2.5 py-1 rounded-xl text-xs font-bold bg-sky-50 dark:bg-sky-950/50 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800/50 hover:bg-sky-100 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                          title="Voltear tarjeta / Ver traducción"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                          <span>{isFlipped ? 'Ver en Inglés' : 'Ver Traducción 🔄'}</span>
                        </button>
                        <CardSpeechControl
                          textToSpeak={item.fullSentence}
                          accent={accent}
                          initialSpeed={speed}
                        />
                      </div>
                    </div>

                    {!isFlipped ? (
                      <div>
                        <h4 className="text-base font-semibold mb-4 leading-relaxed">
                          {item.question}
                        </h4>

                        <div className="flex flex-col gap-2 mb-3">
                          {item.options.map((opt) => {
                            const isChosen = selectedKey === opt.key;
                            const isThisCorrect = opt.key === item.correctAnswer;

                            return (
                              <button
                                key={opt.key}
                                type="button"
                                onClick={() => {
                                  playFeedbackSound('click');
                                  setEx5Answers((prev) => ({ ...prev, [item.id]: opt.key }));
                                }}
                                className={`p-3 rounded-2xl border text-sm font-semibold flex items-center justify-between transition-all cursor-pointer ${
                                  ex5Checked
                                    ? isThisCorrect
                                      ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-800 dark:text-emerald-300 ring-2 ring-emerald-200'
                                      : isChosen
                                      ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-800 dark:text-rose-300 ring-2 ring-rose-200'
                                      : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-white/5 opacity-60'
                                    : isChosen
                                    ? 'bg-sky-50 dark:bg-sky-950/40 border-sky-500 text-sky-900 dark:text-sky-200 ring-2 ring-sky-200 shadow-sm'
                                    : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-white/5 hover:border-sky-300 text-slate-800 dark:text-slate-200'
                                }`}
                              >
                                <span className="flex items-center gap-2">
                                  <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-xs">
                                    {opt.key}
                                  </span>
                                  <span>{opt.text}</span>
                                </span>
                                {ex5Checked && isThisCorrect && (
                                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4 p-4 rounded-2xl bg-sky-50/80 dark:bg-sky-950/40 border border-sky-100 dark:border-sky-900/50 animate-in fade-in duration-150">
                        <div>
                          <span className="text-[11px] font-bold uppercase tracking-wider text-sky-800 dark:text-sky-300 block mb-1">
                            Pregunta en Español:
                          </span>
                          <h4 className="text-base font-bold text-slate-900 dark:text-white leading-relaxed">
                            {item.questionEs}
                          </h4>
                        </div>

                        <div className="space-y-2">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
                            Opciones traducidas y su explicación:
                          </span>
                          {item.options.map((opt) => {
                            const isCorrectOpt = opt.key === item.correctAnswer;
                            return (
                              <div
                                key={opt.key}
                                className={`p-2.5 rounded-xl border text-xs sm:text-sm ${
                                  isCorrectOpt
                                    ? 'bg-emerald-100/70 dark:bg-emerald-950/60 border-emerald-400 text-emerald-950 dark:text-emerald-200 font-semibold'
                                    : 'bg-white/80 dark:bg-slate-900/60 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300'
                                }`}
                              >
                                <span className="font-bold mr-2 uppercase">{opt.key})</span>
                                <strong>{opt.text}:</strong> <span>{opt.textEs}</span>
                              </div>
                            );
                          })}
                        </div>

                        <div className="pt-2 border-t border-sky-200/60 dark:border-sky-900/40">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-0.5">
                            Justificación:
                          </span>
                          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                            {item.explanation}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-inherit/20 flex items-center justify-between text-xs opacity-75 mt-3">
                    <span className="italic">
                      {isFlipped ? 'Tarjeta en español (Traducción activa)' : 'Haz clic en "Ver Traducción 🔄" para voltear'}
                    </span>
                    <button
                      type="button"
                      onClick={() => toggleFlip(item.id, setFlippedEx5)}
                      className="font-mono text-[11px] font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider shrink-0 ml-2 hover:underline cursor-pointer"
                    >
                      {isFlipped ? 'Inglés ↻' : 'Español ↻'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 6: EXERCISE 6 – MIXED REVIEW (12 QUESTIONS) */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'ex6' && (
        <div className="flex flex-col gap-6 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl border bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-white/10">
            <div>
              <span className="text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider">
                Exercise 6 · 12 Preguntas Evaluativas
              </span>
              <h3 className="text-lg font-bold mt-0.5">Mixed Review: Imperatives, Have to & May</h3>
              <p className="text-xs sm:text-sm opacity-80 mt-0.5">
                Evaluación integral combinada. Todas las tarjetas son reversibles (🔄) con su correspondiente traducción de pregunta y opciones.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
                Puntaje: {ex6Score} / {MIXED_REVIEW_ITEMS.length}
              </span>
              <button
                type="button"
                onClick={() => {
                  setEx6Checked((prev) => !prev);
                  if (!ex6Checked && ex6Score >= 10 && onSuccess) {
                    onSuccess();
                  }
                  playFeedbackSound(ex6Checked ? 'click' : 'complete');
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-sky-600 hover:bg-sky-700 text-white shadow-xs transition-all cursor-pointer"
              >
                {ex6Checked ? 'Ocultar Corrección' : 'Comprobar Test'}
              </button>
            </div>
          </div>

          {/* Motivational banner when checked */}
          {ex6Checked && (
            <div
              className={`p-4 rounded-2xl border flex items-center justify-between gap-4 animate-in fade-in duration-150 ${
                ex6Score >= 9
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 text-emerald-900 dark:text-emerald-200'
                  : 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 text-amber-900 dark:text-amber-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <Trophy className="w-8 h-8 shrink-0 text-amber-500" />
                <div>
                  <h4 className="font-bold text-sm">
                    {ex6Score >= 10
                      ? '¡Excelente dominio de Imperativos, Have to y May!'
                      : '¡Buen intento! Repasa las preguntas incorrectas'}
                  </h4>
                  <p className="text-xs mt-0.5 opacity-90">
                    Has acertado {ex6Score} de {MIXED_REVIEW_ITEMS.length} preguntas ({Math.round((ex6Score / MIXED_REVIEW_ITEMS.length) * 100)}%).
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {MIXED_REVIEW_ITEMS.map((item) => {
              const isFlipped = !!flippedEx6[item.id];
              const selectedKey = ex6Answers[item.id];
              const isCorrect = selectedKey === item.correctAnswer;

              return (
                <div
                  key={item.id}
                  className={`rounded-3xl border p-5 transition-all duration-200 shadow-xs flex flex-col justify-between ${
                    isFlipped
                      ? isDark
                        ? 'bg-slate-900 border-sky-500/60 ring-2 ring-sky-500/20 text-white'
                        : 'bg-white border-sky-500 ring-2 ring-sky-400/20 text-slate-900 shadow-md'
                      : isDark
                      ? 'bg-slate-900 border-white/10 text-white'
                      : 'bg-white border-slate-200 text-slate-900'
                  }`}
                >
                  <div>
                    {/* Top Row: number, audio and flip button */}
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <span className="w-7 h-7 rounded-xl bg-slate-100 dark:bg-slate-800 text-sky-600 dark:text-sky-400 font-mono font-bold text-xs flex items-center justify-center border border-slate-200 dark:border-white/10">
                        {item.number}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => toggleFlip(item.id, setFlippedEx6)}
                          className="px-2.5 py-1 rounded-xl text-xs font-bold bg-sky-50 dark:bg-sky-950/50 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800/50 hover:bg-sky-100 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                          title="Voltear tarjeta / Ver traducción"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                          <span>{isFlipped ? 'Ver en Inglés' : 'Ver Traducción 🔄'}</span>
                        </button>
                        <CardSpeechControl
                          textToSpeak={item.fullSentence}
                          accent={accent}
                          initialSpeed={speed}
                        />
                      </div>
                    </div>

                    {!isFlipped ? (
                      <div>
                        <h4 className="text-base font-semibold mb-4 leading-relaxed">
                          {item.question}
                        </h4>

                        <div className="flex flex-col gap-2 mb-3">
                          {item.options.map((opt) => {
                            const isChosen = selectedKey === opt.key;
                            const isThisCorrect = opt.key === item.correctAnswer;

                            return (
                              <button
                                key={opt.key}
                                type="button"
                                onClick={() => {
                                  playFeedbackSound('click');
                                  setEx6Answers((prev) => ({ ...prev, [item.id]: opt.key }));
                                }}
                                className={`p-3 rounded-2xl border text-sm font-semibold flex items-center justify-between transition-all cursor-pointer ${
                                  ex6Checked
                                    ? isThisCorrect
                                      ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-800 dark:text-emerald-300 ring-2 ring-emerald-200'
                                      : isChosen
                                      ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-800 dark:text-rose-300 ring-2 ring-rose-200'
                                      : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-white/5 opacity-60'
                                    : isChosen
                                    ? 'bg-sky-50 dark:bg-sky-950/40 border-sky-500 text-sky-900 dark:text-sky-200 ring-2 ring-sky-200 shadow-sm'
                                    : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-white/5 hover:border-sky-300 text-slate-800 dark:text-slate-200'
                                }`}
                              >
                                <span className="flex items-center gap-2">
                                  <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-xs">
                                    {opt.key}
                                  </span>
                                  <span>{opt.text}</span>
                                </span>
                                {ex6Checked && isThisCorrect && (
                                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4 p-4 rounded-2xl bg-sky-50/80 dark:bg-sky-950/40 border border-sky-100 dark:border-sky-900/50 animate-in fade-in duration-150">
                        <div>
                          <span className="text-[11px] font-bold uppercase tracking-wider text-sky-800 dark:text-sky-300 block mb-1">
                            Pregunta en Español:
                          </span>
                          <h4 className="text-base font-bold text-slate-900 dark:text-white leading-relaxed">
                            {item.questionEs}
                          </h4>
                        </div>

                        <div className="space-y-2">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
                            Opciones traducidas y su explicación:
                          </span>
                          {item.options.map((opt) => {
                            const isCorrectOpt = opt.key === item.correctAnswer;
                            return (
                              <div
                                key={opt.key}
                                className={`p-2.5 rounded-xl border text-xs sm:text-sm ${
                                  isCorrectOpt
                                    ? 'bg-emerald-100/70 dark:bg-emerald-950/60 border-emerald-400 text-emerald-950 dark:text-emerald-200 font-semibold'
                                    : 'bg-white/80 dark:bg-slate-900/60 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300'
                                }`}
                              >
                                <span className="font-bold mr-2 uppercase">{opt.key})</span>
                                <strong>{opt.text}:</strong> <span>{opt.textEs}</span>
                              </div>
                            );
                          })}
                        </div>

                        <div className="pt-2 border-t border-sky-200/60 dark:border-sky-900/40">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-0.5">
                            Justificación:
                          </span>
                          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                            {item.explanation}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-inherit/20 flex items-center justify-between text-xs opacity-75 mt-3">
                    <span className="italic">
                      {isFlipped ? 'Tarjeta en español (Traducción activa)' : 'Haz clic en "Ver Traducción 🔄" para voltear'}
                    </span>
                    <button
                      type="button"
                      onClick={() => toggleFlip(item.id, setFlippedEx6)}
                      className="font-mono text-[11px] font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider shrink-0 ml-2 hover:underline cursor-pointer"
                    >
                      {isFlipped ? 'Inglés ↻' : 'Español ↻'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 7: GUÍA Y RESPUESTAS (ANSWER KEY & EXPLANATIONS) */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'answers' && (
        <div className="flex flex-col gap-6 animate-in fade-in duration-200">
          <div className="p-6 rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 space-y-6">
            <div>
              <span className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider">
                Solucionario & Resumen Clave
              </span>
              <h3 className="text-xl font-bold mt-1 text-slate-900 dark:text-white">
                Guía Completa de Respuestas y Explicaciones
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                Consulta las soluciones correctas de todos los ejercicios con sus fundamentos gramaticales.
              </p>
            </div>

            {/* Section 1 Answers */}
            <div className="p-4 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-800/50 space-y-3">
              <h4 className="font-bold text-slate-800 dark:text-white text-sm">
                1. Imperatives – Complete the Sentences (Soluciones sugeridas):
              </h4>
              <ul className="text-xs sm:text-sm space-y-1.5 list-disc list-inside text-slate-700 dark:text-slate-300">
                <li><strong>1. Write</strong> your name here. (Escribe tu nombre aquí).</li>
                <li><strong>2. Don't use / Turn off</strong> your phone during the exam. (No uses / Apaga tu teléfono).</li>
                <li><strong>3. Be</strong> careful when you cross the street. (Ten cuidado al cruzar).</li>
                <li><strong>4. Don't walk</strong> on the grass. (No camines sobre el césped).</li>
                <li><strong>5. Close / Open</strong> the door, please. (Cierra / Abre la puerta).</li>
                <li><strong>6. Do</strong> your homework right now ! (¡Haz tu tarea ahora!).</li>
                <li><strong>7. Be</strong> quiet, please. (Guarden silencio, por favor).</li>
                <li><strong>8. Don't share</strong> your password with anyone. (No compartas tu clave).</li>
              </ul>
            </div>

            {/* Section 2 Answers */}
            <div className="p-4 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-800/50 space-y-3">
              <h4 className="font-bold text-slate-800 dark:text-white text-sm">
                2. Imperatives – Choose the Correct Option:
              </h4>
              <ul className="text-xs sm:text-sm space-y-1.5 list-disc list-inside text-slate-700 dark:text-slate-300">
                <li><strong>1. a) Wash</strong> your hands before eating. (Verbo base simple).</li>
                <li><strong>2. b) Don't press</strong> that button! It's dangerous. (Negativo Don't + base).</li>
                <li><strong>3. a) Don't be</strong> late for your interview. (Negativo de be).</li>
                <li><strong>4. a) Read</strong> the instructions carefully. (Forma base sin to ni -s).</li>
              </ul>
            </div>

            {/* Section 3 Answers */}
            <div className="p-4 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-800/50 space-y-3">
              <h4 className="font-bold text-slate-800 dark:text-white text-sm">
                3. Have to / Has to – Complete:
              </h4>
              <ul className="text-xs sm:text-sm space-y-1.5 list-disc list-inside text-slate-700 dark:text-slate-300">
                <li>1. I <strong>have to</strong> get up at 6 a.m.</li>
                <li>2. She <strong>has to</strong> wear a uniform at work.</li>
                <li>3. They <strong>have to</strong> pay for the tickets online.</li>
                <li>4. My brother <strong>has to</strong> study for an important exam.</li>
                <li>5. We <strong>have to</strong> take our passports to the airport.</li>
                <li>6. He <strong>has to</strong> work on Saturdays.</li>
                <li>7. You <strong>have to</strong> bring your own laptop.</li>
                <li>8. Laura <strong>has to</strong> finish the report today.</li>
              </ul>
            </div>

            {/* Section 4 Answers */}
            <div className="p-4 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-800/50 space-y-3">
              <h4 className="font-bold text-slate-800 dark:text-white text-sm">
                4. Have to / Has to – Multiple Choice:
              </h4>
              <ul className="text-xs sm:text-sm space-y-1.5 list-disc list-inside text-slate-700 dark:text-slate-300">
                <li>1. b) <strong>has to</strong> work tomorrow. (My sister = She).</li>
                <li>2. b) <strong>have to</strong> wear a uniform. (Sujeto We).</li>
                <li>3. a) <strong>doesn't have to</strong> get up early. (Negativo tercera persona).</li>
                <li>4. b) <strong>Do</strong> you have to work tonight? (Auxiliar Do con you).</li>
                <li>5. b) Does your father <strong>have to use</strong> a car? (Infinitivo base tras Does).</li>
                <li>6. a) They <strong>don't have to</strong> buy tickets. (No es necesario con They).</li>
              </ul>
            </div>

            {/* Section 5 Answers */}
            <div className="p-4 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-800/50 space-y-3">
              <h4 className="font-bold text-slate-800 dark:text-white text-sm">
                5. May – Permission & Possibility:
              </h4>
              <ul className="text-xs sm:text-sm space-y-1.5 list-disc list-inside text-slate-700 dark:text-slate-300">
                <li>1. a) <strong>May</strong> I open the window, please? (Permiso formal).</li>
                <li>2. b) It <strong>may</strong> rain this afternoon. (Sin -s, sin to).</li>
                <li>3. a) You <strong>may</strong> leave when you finish. (Conceder permiso).</li>
                <li>4. a) She <strong>may</strong> be late because of traffic. (Posibilidad de be).</li>
                <li>5. a) <strong>May</strong> I ask you a question? (Pregunta formal de permiso).</li>
                <li>6. a) They <strong>may</strong> arrive before 8 p.m. (Modal base).</li>
              </ul>
            </div>

            {/* Section 6 Mixed Review Answers */}
            <div className="p-4 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-800/50 space-y-3">
              <h4 className="font-bold text-slate-800 dark:text-white text-sm">
                6. Mixed Review (12 Respuestas Rápidas):
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                <div>1. a) <strong>Turn off</strong></div>
                <div>2. a) <strong>have to</strong></div>
                <div>3. b) <strong>Don't</strong></div>
                <div>4. b) <strong>has to</strong></div>
                <div>5. c) <strong>May</strong></div>
                <div>6. a) <strong>doesn't have to</strong></div>
                <div>7. b) <strong>may</strong></div>
                <div>8. a) <strong>Don't be</strong></div>
                <div>9. b) <strong>Do</strong></div>
                <div>10. c) <strong>Does</strong></div>
                <div>11. a) <strong>don't have to</strong></div>
                <div>12. c) <strong>call</strong></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
