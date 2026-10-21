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
  ShoppingBag,
  Plane,
  UtensilsCrossed,
  Briefcase,
  Brain,
  MessageSquare,
  Trophy,
  Eye,
  EyeOff,
  Volume2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { CardSpeechControl } from './CardSpeechControl';
import { speakEnglish, playFeedbackSound } from '../utils/audio';
import {
  COUNTABLE_UNCOUNTABLE_THEORY,
  WHAT_WOULD_YOU_SAY_ITEMS,
  REAL_LIFE_PROBLEMS_ITEMS,
  SUPERMARKET_INVENTORY,
  SUPERMARKET_QUESTIONS,
  NATURAL_SOUND_ITEMS,
  FIND_THE_PROBLEM_ITEMS,
  TRIP_TO_LONDON_ITEMS,
  RESTAURANT_DIALOGUE_SCRIPT,
  RESTAURANT_ANALYSIS_QUESTIONS,
  WORK_PROBLEMS_ITEMS,
  DUAL_NOUN_ITEMS,
  SPEAKING_REAL_QUESTIONS,
  FINAL_CHALLENGE_ORIGINAL,
  FINAL_CHALLENGE_CORRECT,
  FINAL_CHALLENGE_ERRORS,
} from '../data/countableUncountableMasterclassData';

interface CountableUncountableMasterclassActivityProps {
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
  | 'ex7'
  | 'ex8'
  | 'ex9'
  | 'ex10'
  | 'ex11'
  | 'answers';

const COUNTABLE_TABS: { id: TabType; label: string; icon: React.ElementType }[] = [
  { id: 'theory', label: 'Reglas y Teoría', icon: BookOpen },
  { id: 'ex1', label: '1. What Would You Say?', icon: CheckSquare },
  { id: 'ex2', label: '2. Real-Life Problems', icon: Sparkles },
  { id: 'ex3', label: '3. Supermarket', icon: ShoppingBag },
  { id: 'ex4', label: '4. Sounds Natural?', icon: CheckCircle2 },
  { id: 'ex5', label: '5. Find the Problem', icon: HelpCircle },
  { id: 'ex6', label: '6. Trip to London', icon: Plane },
  { id: 'ex7', label: '7. Restaurant', icon: UtensilsCrossed },
  { id: 'ex8', label: '8. Work Problems', icon: Briefcase },
  { id: 'ex9', label: '9. Dual Nouns', icon: Brain },
  { id: 'ex10', label: '10. Speaking', icon: MessageSquare },
  { id: 'ex11', label: '11. Final Challenge', icon: Trophy },
  { id: 'answers', label: 'Guía y Respuestas', icon: HelpCircle },
];

export const CountableUncountableMasterclassActivity: React.FC<
  CountableUncountableMasterclassActivityProps
> = ({ accent = 'US', speechRate = 1.0, onSuccess }) => {
  const { isDark } = useTheme();

  // Active navigation tab
  const [activeTab, setActiveTab] = useState<TabType>('theory');
  const tabsContainerRef = React.useRef<HTMLDivElement>(null);

  const currentTabIndex = COUNTABLE_TABS.findIndex((t) => t.id === activeTab);

  const goToTab = (tabId: TabType) => {
    setActiveTab(tabId);
    playFeedbackSound('click');
    setTimeout(() => {
      const el = document.getElementById(`countable-tab-${tabId}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }, 40);
  };

  const handlePrevTab = () => {
    if (currentTabIndex > 0) {
      goToTab(COUNTABLE_TABS[currentTabIndex - 1].id);
    }
  };

  const handleNextTab = () => {
    if (currentTabIndex < COUNTABLE_TABS.length - 1) {
      goToTab(COUNTABLE_TABS[currentTabIndex + 1].id);
    }
  };

  // Flip states for reversible cards
  const [flippedTheory, setFlippedTheory] = useState<Record<string, boolean>>({});
  const [flippedEx1, setFlippedEx1] = useState<Record<string, boolean>>({});
  const [flippedEx2, setFlippedEx2] = useState<Record<string, boolean>>({});
  const [flippedEx3, setFlippedEx3] = useState<Record<string, boolean>>({});
  const [flippedEx4, setFlippedEx4] = useState<Record<string, boolean>>({});
  const [flippedEx5, setFlippedEx5] = useState<Record<string, boolean>>({});
  const [flippedEx6, setFlippedEx6] = useState<Record<string, boolean>>({});
  const [flippedEx7, setFlippedEx7] = useState<Record<string, boolean>>({});
  const [flippedEx8, setFlippedEx8] = useState<Record<string, boolean>>({});
  const [flippedEx9, setFlippedEx9] = useState<Record<string, boolean>>({});
  const [flippedEx10, setFlippedEx10] = useState<Record<string, boolean>>({});

  // 1. What would you say
  const [ex1Answers, setEx1Answers] = useState<Record<string, string>>({});
  const [ex1Checked, setEx1Checked] = useState(false);

  // 2. Real-life problems
  const [ex2Inputs, setEx2Inputs] = useState<Record<string, string>>({});
  const [ex2Checked, setEx2Checked] = useState<Record<string, boolean>>({});
  const [ex2Revealed, setEx2Revealed] = useState<Record<string, boolean>>({});

  // 3. At the supermarket
  const [ex3Inputs, setEx3Inputs] = useState<Record<string, string>>({});
  const [ex3Checked, setEx3Checked] = useState<Record<string, boolean>>({});
  const [ex3Revealed, setEx3Revealed] = useState<Record<string, boolean>>({});
  const [ex3ShoppingText, setEx3ShoppingText] = useState('');
  const [ex3ShoppingSaved, setEx3ShoppingSaved] = useState(false);

  // 4. Natural sounds
  const [ex4Answers, setEx4Answers] = useState<Record<string, 'a' | 'b'>>({});
  const [ex4Checked, setEx4Checked] = useState(false);

  // 5. Find the problem
  const [ex5Inputs, setEx5Inputs] = useState<Record<string, string>>({});
  const [ex5Checked, setEx5Checked] = useState<Record<string, boolean>>({});
  const [ex5Revealed, setEx5Revealed] = useState<Record<string, boolean>>({});

  // 6. A trip to London
  const [ex6Choices, setEx6Choices] = useState<Record<string, 'HOW MUCH' | 'HOW MANY'>>({});
  const [ex6Checked, setEx6Checked] = useState(false);
  const [ex6PersonalPlan, setEx6PersonalPlan] = useState('');
  const [ex6PersonalSaved, setEx6PersonalSaved] = useState(false);

  // 7. At a restaurant
  const [ex7Blanks, setEx7Blanks] = useState<Record<string, string>>({});
  const [ex7Checked, setEx7Checked] = useState(false);
  const [ex7Revealed, setEx7Revealed] = useState(false);

  // 8. Work problems
  const [ex8Answers, setEx8Answers] = useState<Record<string, string>>({});
  const [ex8Checked, setEx8Checked] = useState(false);

  // 9. Dual nouns
  const [ex9Answers, setEx9Answers] = useState<Record<string, string>>({});
  const [ex9Checked, setEx9Checked] = useState(false);

  // 10. Speaking notes
  const [ex10Notes, setEx10Notes] = useState<Record<string, string>>({});

  // 11. Final challenge
  const [ex11Input, setEx11Input] = useState(FINAL_CHALLENGE_ORIGINAL);
  const [ex11Checked, setEx11Checked] = useState(false);
  const [ex11Revealed, setEx11Revealed] = useState(false);

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

  const normalize = (str: string) =>
    str
      .trim()
      .toLowerCase()
      .replace(/[.,/#!$%^&*;:{}=\-_`~()?'"]/g, '')
      .replace(/\s+/g, ' ');

  // Scores
  const ex1Score = WHAT_WOULD_YOU_SAY_ITEMS.filter(
    (item) => ex1Answers[item.id] === item.correctAnswer
  ).length;

  const ex4Score = NATURAL_SOUND_ITEMS.filter(
    (item) => ex4Answers[item.id] === item.correctOption
  ).length;

  const ex6Score = TRIP_TO_LONDON_ITEMS.filter(
    (item) => ex6Choices[item.id] === item.correctQuantifier
  ).length;

  const ex8Score = WORK_PROBLEMS_ITEMS.filter(
    (item) => ex8Answers[item.id] === item.correctAnswer
  ).length;

  const ex9Score = DUAL_NOUN_ITEMS.filter(
    (item) => ex9Answers[item.id] === item.correctChoice
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
                Unit 5 · Section 1
              </span>
              <span className="text-xs font-mono opacity-60">Grammar Masterclass & Real Practice</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
              COUNTABLE AND UNCOUNTABLE NOUNS
            </h2>
            <p className="text-sm opacity-80 mt-1 max-w-3xl">
              Domina las reglas de sustantivos contables e incontables, uso de quantifiers (much, many, a lot of, a few, a little, any), envases, sustantivos de doble sentido y 11 ejercicios interactivos de práctica real.
            </p>
          </div>

          {/* Header Audio Controller */}
          <div className="shrink-0 flex items-center gap-2 bg-slate-50 dark:bg-slate-800/80 p-2 rounded-2xl border border-inherit/20">
            <CardSpeechControl
              textToSpeak="Countable and uncountable nouns. Real practice. Learn when to use how much, how many, some, any, a few and a little with complete conversational confidence."
              accent={accent}
              initialSpeed={speechRate}
            />
          </div>
        </div>

        {/* Section Navigation Tabs with Floating Prev (<) & Next (>) Buttons */}
        <div className="relative flex items-center gap-2 pt-5 border-t border-inherit/15 mt-5">
          {/* Floating Left Button (<) */}
          <button
            type="button"
            id="cu-tabs-prev-button"
            onClick={handlePrevTab}
            disabled={currentTabIndex <= 0}
            className={`shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center border transition-all cursor-pointer select-none shadow-xs ${
              currentTabIndex <= 0
                ? 'opacity-30 cursor-not-allowed border-inherit/20 text-slate-400'
                : isDark
                ? 'bg-slate-800 hover:bg-sky-600 text-white border-white/10 hover:border-sky-400 shadow-md hover:scale-105 active:scale-95'
                : 'bg-white hover:bg-sky-600 text-slate-700 hover:text-white border-slate-200 hover:border-sky-600 shadow-sm hover:scale-105 active:scale-95'
            }`}
            title={currentTabIndex > 0 ? `Sección anterior: ${COUNTABLE_TABS[currentTabIndex - 1].label}` : 'Primera sección'}
            aria-label="Pestaña anterior"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Scrollable Tabs Row */}
          <div
            ref={tabsContainerRef}
            className="flex-1 flex items-center gap-1.5 overflow-x-auto no-scrollbar scroll-smooth py-1"
          >
            {COUNTABLE_TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`countable-tab-${tab.id}`}
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
            id="cu-tabs-next-button"
            onClick={handleNextTab}
            disabled={currentTabIndex >= COUNTABLE_TABS.length - 1}
            className={`shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center border transition-all cursor-pointer select-none shadow-xs ${
              currentTabIndex >= COUNTABLE_TABS.length - 1
                ? 'opacity-30 cursor-not-allowed border-inherit/20 text-slate-400'
                : isDark
                ? 'bg-slate-800 hover:bg-sky-600 text-white border-white/10 hover:border-sky-400 shadow-md hover:scale-105 active:scale-95'
                : 'bg-white hover:bg-sky-600 text-slate-700 hover:text-white border-slate-200 hover:border-sky-600 shadow-sm hover:scale-105 active:scale-95'
            }`}
            title={currentTabIndex < COUNTABLE_TABS.length - 1 ? `Siguiente sección: ${COUNTABLE_TABS[currentTabIndex + 1].label}` : 'Última sección'}
            aria-label="Siguiente pestaña"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* TAB 0: THEORY TOPICS IN REVERSIBLE CARDS WITH AUDIO */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'theory' && (
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {COUNTABLE_UNCOUNTABLE_THEORY.map((topic) => {
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
                    <span className="font-mono text-[11px] font-bold text-sky-500 uppercase tracking-wider shrink-0 ml-2">
                      {isFlipped ? 'Inglés ↻' : 'Español ↻'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 1: WHAT WOULD YOU SAY? (6 ITEMS) */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'ex1' && (
        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl border bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-white/10">
            <div>
              <h3 className="text-lg font-bold">1. WHAT WOULD YOU SAY?</h3>
              <p className="text-sm opacity-80 mt-0.5">
                Choose the correct option according to each real-life situation.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
                Puntaje: {ex1Score} / {WHAT_WOULD_YOU_SAY_ITEMS.length}
              </span>
              <button
                type="button"
                onClick={() => setEx1Checked((prev) => !prev)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-sky-600 hover:bg-sky-700 text-white shadow-xs transition-all cursor-pointer"
              >
                {ex1Checked ? 'Ocultar Corrección' : 'Comprobar'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {WHAT_WOULD_YOU_SAY_ITEMS.map((item) => {
              const isFlipped = !!flippedEx1[item.id];
              const selectedKey = ex1Answers[item.id];
              const isAnswered = !!selectedKey;
              const isCorrect = selectedKey === item.correctAnswer;

              return (
                <div
                  key={item.id}
                  className={`rounded-3xl border p-5 sm:p-6 transition-all flex flex-col justify-between ${
                    isDark ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-200'
                  }`}
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <span className="px-2.5 py-0.5 rounded-lg text-xs font-mono font-bold uppercase bg-slate-100 dark:bg-slate-800 text-sky-600 dark:text-sky-400 border border-inherit/20">
                        Situación {item.number}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => toggleFlip(item.id, setFlippedEx1)}
                          className="text-xs font-mono font-semibold text-sky-500 hover:underline cursor-pointer"
                        >
                          {isFlipped ? 'Ver Inglés ↻' : 'Traducir ↻'}
                        </button>
                        <button
                          type="button"
                          onClick={() => speakEnglish(`${item.contextEn}. ${item.promptEn}`, speechRate, accent)}
                          className="p-1.5 rounded-lg border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                          aria-label="Audio"
                        >
                          <Volume2 className="w-3.5 h-3.5 text-sky-500" />
                        </button>
                      </div>
                    </div>

                    {/* Context Situation */}
                    <p className="text-xs sm:text-sm opacity-75 mb-2 italic">
                      {isFlipped ? item.contextEs : item.contextEn}
                    </p>

                    {/* Prompt */}
                    <h4 className="text-base sm:text-lg font-bold mb-4 text-sky-950 dark:text-sky-200">
                      {isFlipped ? item.promptEs : item.promptEn}
                    </h4>

                    {/* Options */}
                    <div className="flex flex-col gap-2 mb-4">
                      {item.options.map((opt) => {
                        const isSelected = selectedKey === opt.key;
                        let optionStyle = isDark
                          ? 'bg-slate-800/60 hover:bg-slate-800 border-white/10 text-slate-200'
                          : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800';

                        if (isSelected) {
                          optionStyle = 'bg-sky-600 text-white border-sky-500 shadow-xs';
                        }

                        if (ex1Checked && isAnswered) {
                          if (opt.key === item.correctAnswer) {
                            optionStyle = 'bg-emerald-600 text-white border-emerald-500';
                          } else if (isSelected && !opt.isCorrect) {
                            optionStyle = 'bg-rose-600 text-white border-rose-500';
                          }
                        }

                        return (
                          <button
                            key={opt.key}
                            type="button"
                            onClick={() => {
                              playFeedbackSound('click');
                              setEx1Answers((prev) => ({ ...prev, [item.id]: opt.key }));
                            }}
                            className={`p-3 rounded-2xl border text-sm font-semibold flex items-center justify-between transition-all cursor-pointer ${optionStyle}`}
                          >
                            <span className="flex items-center gap-2">
                              <span className="w-6 h-6 rounded-full border border-inherit/40 flex items-center justify-center text-xs font-mono">
                                {opt.key}
                              </span>
                              <span>{opt.text}</span>
                            </span>
                            {ex1Checked && opt.key === item.correctAnswer && (
                              <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Feedback Explanation */}
                  {ex1Checked && isAnswered && (
                    <div
                      className={`p-3 rounded-2xl border text-xs sm:text-sm animate-in fade-in duration-200 ${
                        isCorrect
                          ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500/40 text-emerald-950 dark:text-emerald-200'
                          : 'bg-rose-50 dark:bg-rose-950/40 border-rose-500/40 text-rose-950 dark:text-rose-200'
                      }`}
                    >
                      <p className="font-bold mb-0.5">
                        {isCorrect ? '¡Correcto!' : 'Respuesta Incorrecta'}
                      </p>
                      <p className="opacity-90">{item.explanationEn}</p>
                      <p className="opacity-75 italic mt-1 font-serif">{item.explanationEs}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 2: REAL-LIFE PROBLEMS (8 ITEMS WITH WORD BANK) */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'ex2' && (
        <div className="flex flex-col gap-6">
          <div className="p-5 rounded-2xl border bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-white/10">
            <h3 className="text-lg font-bold">2. REAL-LIFE PROBLEMS</h3>
            <p className="text-sm opacity-80 mt-0.5">
              Complete each sentence with the best option from the word bank:
            </p>
            {/* Word Bank Chips */}
            <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-inherit/20">
              {['much', 'many', 'a lot of', 'a few', 'a little', 'any'].map((word) => (
                <span
                  key={word}
                  className="px-3 py-1 rounded-xl text-xs font-mono font-bold bg-sky-100 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border border-sky-300 dark:border-sky-800"
                >
                  {word}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {REAL_LIFE_PROBLEMS_ITEMS.map((item) => {
              const userVal = ex2Inputs[item.id] || '';
              const isChecked = !!ex2Checked[item.id];
              const isRevealed = !!ex2Revealed[item.id];
              const isFlipped = !!flippedEx2[item.id];
              const isCorrect = item.acceptableAnswers.some(
                (ans) => normalize(ans) === normalize(userVal)
              );

              return (
                <div
                  key={item.id}
                  className={`p-5 rounded-3xl border transition-all ${
                    isDark ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-200'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                    <span className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400">
                      Problema {item.number}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => toggleFlip(item.id, setFlippedEx2)}
                        className="text-xs font-mono font-semibold text-sky-500 hover:underline cursor-pointer"
                      >
                        {isFlipped ? 'Ver Inglés ↻' : 'Traducir ↻'}
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          speakEnglish(
                            `${item.sentenceBefore} ${item.primaryAnswer} ${item.sentenceAfter}`,
                            speechRate,
                            accent
                          )
                        }
                        className="p-1 rounded-lg border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-slate-800"
                        aria-label="Audio"
                      >
                        <Volume2 className="w-3.5 h-3.5 text-sky-500" />
                      </button>
                    </div>
                  </div>

                  {/* Sentence */}
                  <div className="text-base sm:text-lg font-medium flex flex-wrap items-center gap-2 mb-3">
                    <span>{item.sentenceBefore}</span>
                    <input
                      type="text"
                      value={userVal}
                      onChange={(e) => {
                        setEx2Inputs((prev) => ({ ...prev, [item.id]: e.target.value }));
                        setEx2Checked((prev) => ({ ...prev, [item.id]: false }));
                      }}
                      placeholder="much / many / any..."
                      className={`px-3 py-1.5 rounded-xl border font-bold text-sm min-w-[130px] outline-none transition-all ${
                        isChecked
                          ? isCorrect
                            ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-900 dark:text-emerald-200'
                            : 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-900 dark:text-rose-200'
                          : isDark
                          ? 'bg-slate-800 border-white/10 text-white focus:border-sky-500'
                          : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-sky-600'
                      }`}
                    />
                    <span>{item.sentenceAfter}</span>
                  </div>

                  {isFlipped && (
                    <p className="text-xs sm:text-sm opacity-70 italic mb-3 font-serif">
                      {item.sentenceEs}
                    </p>
                  )}

                  {/* Action buttons */}
                  <div className="flex items-center gap-2 pt-2 border-t border-inherit/15">
                    <button
                      type="button"
                      onClick={() => {
                        playFeedbackSound('click');
                        setEx2Checked((prev) => ({ ...prev, [item.id]: true }));
                      }}
                      disabled={!userVal.trim()}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        userVal.trim()
                          ? 'bg-sky-600 hover:bg-sky-700 text-white cursor-pointer shadow-xs'
                          : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      Comprobar
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setEx2Revealed((prev) => ({ ...prev, [item.id]: !prev[item.id] }))
                      }
                      className="px-3.5 py-1.5 rounded-xl text-xs font-semibold border border-inherit/30 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      {isRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      <span>{isRevealed ? 'Ocultar' : 'Ver solución'}</span>
                    </button>
                  </div>

                  {/* Feedback explanation */}
                  {(isChecked || isRevealed) && (
                    <div className="mt-3 p-3 rounded-2xl border text-xs sm:text-sm bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-white/10">
                      <p className="font-bold text-sky-600 dark:text-sky-400 mb-0.5">
                        Respuesta sugerida: {item.primaryAnswer}
                      </p>
                      <p className="opacity-90">{item.explanationEn}</p>
                      <p className="opacity-75 italic mt-1 font-serif">{item.explanationEs}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 3: AT THE SUPERMARKET (INVENTORY & WRITING) */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'ex3' && (
        <div className="flex flex-col gap-6">
          {/* Inventory Showcase */}
          <div className="p-6 rounded-3xl border bg-gradient-to-br from-sky-500/10 via-slate-500/5 to-transparent border-sky-500/20">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                  Situación 3 · Cena para 6 personas
                </span>
                <h3 className="text-xl font-bold mt-0.5">AT THE SUPERMARKET</h3>
                <p className="text-sm opacity-80 mt-1">
                  You are preparing dinner for six people. You currently have:
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  speakEnglish(
                    'You are preparing dinner for six people. You have two bottles of wine, one bag of rice, three tomatoes, half a kilo of meat, six eggs, some cheese, and no bread.',
                    speechRate,
                    accent
                  )
                }
                className="px-3.5 py-2 rounded-xl text-xs font-bold border border-sky-500/30 bg-sky-500/15 text-sky-700 dark:text-sky-300 hover:bg-sky-500/25 transition-all flex items-center gap-1.5 shrink-0"
              >
                <Volume2 className="w-4 h-4" />
                <span>Escuchar Inventario</span>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
              {SUPERMARKET_INVENTORY.map((inv, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-2xl border border-sky-500/20 bg-white/80 dark:bg-slate-900/80 text-center flex flex-col justify-between shadow-2xs"
                >
                  <span className="text-xs font-bold text-sky-900 dark:text-sky-200">
                    {inv.itemEn}
                  </span>
                  <span className="text-[11px] opacity-75 italic mt-1 font-serif">
                    {inv.itemEs}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 7 Inventory Questions */}
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-base">Answer the questions based on your inventory:</h4>

            {SUPERMARKET_QUESTIONS.map((q) => {
              const userVal = ex3Inputs[q.id] || '';
              const isChecked = !!ex3Checked[q.id];
              const isRevealed = !!ex3Revealed[q.id];
              const isFlipped = !!flippedEx3[q.id];
              const isCorrect = q.acceptableVariations.some(
                (v) => normalize(v) === normalize(userVal) || normalize(userVal).includes(normalize(v))
              );

              return (
                <div
                  key={q.id}
                  className={`p-5 rounded-3xl border transition-all ${
                    isDark ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <h5 className="font-bold text-sm sm:text-base text-sky-950 dark:text-sky-200">
                      {isFlipped ? q.questionEs : q.questionEn}
                    </h5>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => toggleFlip(q.id, setFlippedEx3)}
                        className="text-xs font-mono font-semibold text-sky-500 hover:underline cursor-pointer"
                      >
                        {isFlipped ? 'Inglés ↻' : 'Traducir ↻'}
                      </button>
                      <button
                        type="button"
                        onClick={() => speakEnglish(q.questionEn, speechRate, accent)}
                        className="p-1 rounded-lg border border-inherit/20 hover:bg-slate-100 dark:hover:bg-slate-800"
                        aria-label="Audio"
                      >
                        <Volume2 className="w-3.5 h-3.5 text-sky-500" />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 my-2">
                    <span className="font-mono text-sm opacity-50 hidden sm:inline">→</span>
                    <input
                      type="text"
                      value={userVal}
                      onChange={(e) => {
                        setEx3Inputs((prev) => ({ ...prev, [q.id]: e.target.value }));
                        setEx3Checked((prev) => ({ ...prev, [q.id]: false }));
                      }}
                      placeholder="Write your answer..."
                      className="flex-1 px-4 py-2 rounded-xl border text-sm font-semibold outline-none bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-white/10 focus:border-sky-500"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        playFeedbackSound('click');
                        setEx3Checked((prev) => ({ ...prev, [q.id]: true }));
                      }}
                      disabled={!userVal.trim()}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-sky-600 hover:bg-sky-700 text-white transition-all cursor-pointer shadow-xs disabled:opacity-40"
                    >
                      Comprobar
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setEx3Revealed((prev) => ({ ...prev, [q.id]: !prev[q.id] }))
                      }
                      className="px-3.5 py-2 rounded-xl text-xs font-semibold border border-inherit/30 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer flex items-center gap-1"
                    >
                      {isRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      <span>{isRevealed ? 'Ocultar' : 'Solución'}</span>
                    </button>
                  </div>

                  {(isChecked || isRevealed) && (
                    <div className="mt-3 p-3 rounded-2xl border text-xs sm:text-sm bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-white/10">
                      <p className="font-bold text-sky-600 dark:text-sky-400">
                        Respuesta esperada: {q.expectedAnswerEn}
                      </p>
                      <p className="text-xs opacity-75 italic font-serif">{q.expectedAnswerEs}</p>
                      <p className="text-xs opacity-90 mt-1">{q.explanationEn}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Interactive Writing Task */}
          <div className="p-6 rounded-3xl border bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-white/10 flex flex-col gap-3">
            <h4 className="font-bold text-base">
              Now imagine you are going shopping. Write three things you need to buy and explain why:
            </h4>
            <p className="text-xs sm:text-sm opacity-75">
              Ejemplo: "I need to buy two loaves of bread because we don't have any bread. I also need some olive oil and three apples."
            </p>
            <textarea
              rows={3}
              value={ex3ShoppingText}
              onChange={(e) => setEx3ShoppingText(e.target.value)}
              placeholder="Write your shopping plan here..."
              className="w-full p-3 rounded-2xl border text-sm bg-white dark:bg-slate-800 border-slate-200 dark:border-white/10 outline-none focus:border-sky-500"
            />
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  playFeedbackSound('click');
                  setEx3ShoppingSaved(true);
                }}
                disabled={!ex3ShoppingText.trim()}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-sky-600 hover:bg-sky-700 text-white shadow-xs transition-all cursor-pointer disabled:opacity-40"
              >
                Guardar Respuesta
              </button>
              {ex3ShoppingText.trim() && (
                <button
                  type="button"
                  onClick={() => speakEnglish(ex3ShoppingText, speechRate, accent)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold border border-inherit/30 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1.5"
                >
                  <Volume2 className="w-3.5 h-3.5 text-sky-500" />
                  <span>Escuchar tu texto</span>
                </button>
              )}
            </div>
            {ex3ShoppingSaved && (
              <div className="p-3 rounded-2xl border bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500/40 text-emerald-900 dark:text-emerald-200 text-xs sm:text-sm">
                ¡Excelente práctica! Has aplicado la distinción entre contables e incontables a tu plan de compras.
              </div>
            )}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 4: WHICH ONE SOUNDS NATURAL? (8 PAIRS) */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'ex4' && (
        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl border bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-white/10">
            <div>
              <h3 className="text-lg font-bold">4. WHICH ONE SOUNDS NATURAL?</h3>
              <p className="text-sm opacity-80 mt-0.5">
                Choose the sentence that sounds correct in standard English.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
                Puntaje: {ex4Score} / {NATURAL_SOUND_ITEMS.length}
              </span>
              <button
                type="button"
                onClick={() => setEx4Checked((prev) => !prev)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-sky-600 hover:bg-sky-700 text-white shadow-xs transition-all cursor-pointer"
              >
                {ex4Checked ? 'Ocultar Corrección' : 'Comprobar'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {NATURAL_SOUND_ITEMS.map((item) => {
              const selected = ex4Answers[item.id];
              const isChecked = ex4Checked;
              const isASelected = selected === 'a';
              const isBSelected = selected === 'b';

              return (
                <div
                  key={item.id}
                  className={`p-5 sm:p-6 rounded-3xl border flex flex-col justify-between ${
                    isDark ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-200'
                  }`}
                >
                  <div>
                    <span className="px-2.5 py-0.5 rounded-lg text-xs font-mono font-bold uppercase bg-slate-100 dark:bg-slate-800 text-sky-600 dark:text-sky-400 mb-3 inline-block">
                      Par {item.number}
                    </span>

                    <div className="flex flex-col gap-2.5 mb-4">
                      {/* Option A */}
                      <button
                        type="button"
                        onClick={() => {
                          playFeedbackSound('click');
                          setEx4Answers((prev) => ({ ...prev, [item.id]: 'a' }));
                        }}
                        className={`p-3.5 rounded-2xl border text-sm font-semibold flex items-center justify-between transition-all cursor-pointer ${
                          isASelected
                            ? isChecked
                              ? item.optionA.isCorrect
                                ? 'bg-emerald-600 text-white border-emerald-500'
                                : 'bg-rose-600 text-white border-rose-500'
                              : 'bg-sky-600 text-white border-sky-500'
                            : isChecked && item.optionA.isCorrect
                            ? 'bg-emerald-600 text-white border-emerald-500'
                            : isDark
                            ? 'bg-slate-800/60 hover:bg-slate-800 border-white/10 text-slate-200'
                            : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800'
                        }`}
                      >
                        <span className="flex items-center gap-2 text-left">
                          <span className="w-5 h-5 rounded-full border border-inherit/40 flex items-center justify-center text-xs font-mono">
                            a
                          </span>
                          <span>{item.optionA.text}</span>
                        </span>
                        {isChecked && item.optionA.isCorrect && (
                          <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                        )}
                      </button>

                      {/* Option B */}
                      <button
                        type="button"
                        onClick={() => {
                          playFeedbackSound('click');
                          setEx4Answers((prev) => ({ ...prev, [item.id]: 'b' }));
                        }}
                        className={`p-3.5 rounded-2xl border text-sm font-semibold flex items-center justify-between transition-all cursor-pointer ${
                          isBSelected
                            ? isChecked
                              ? item.optionB.isCorrect
                                ? 'bg-emerald-600 text-white border-emerald-500'
                                : 'bg-rose-600 text-white border-rose-500'
                              : 'bg-sky-600 text-white border-sky-500'
                            : isChecked && item.optionB.isCorrect
                            ? 'bg-emerald-600 text-white border-emerald-500'
                            : isDark
                            ? 'bg-slate-800/60 hover:bg-slate-800 border-white/10 text-slate-200'
                            : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800'
                        }`}
                      >
                        <span className="flex items-center gap-2 text-left">
                          <span className="w-5 h-5 rounded-full border border-inherit/40 flex items-center justify-center text-xs font-mono">
                            b
                          </span>
                          <span>{item.optionB.text}</span>
                        </span>
                        {isChecked && item.optionB.isCorrect && (
                          <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Feedback Explanation */}
                  {isChecked && selected && (
                    <div className="p-3 rounded-2xl border text-xs sm:text-sm bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-white/10">
                      <p className="font-bold text-sky-600 dark:text-sky-400 mb-0.5">
                        {selected === item.correctOption ? '¡Correcto!' : 'Respuesta Incorrecta'}
                      </p>
                      <p className="opacity-90">
                        {item.correctOption === 'a'
                          ? item.optionA.explanationEn
                          : item.optionB.explanationEn}
                      </p>
                      <p className="opacity-75 italic mt-1 font-serif">
                        {item.correctOption === 'a'
                          ? item.optionA.explanationEs
                          : item.optionB.explanationEs}
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
      {/* TAB 5: FIND THE PROBLEM (8 ERROR CORRECTIONS) */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'ex5' && (
        <div className="flex flex-col gap-6">
          <div className="p-5 rounded-2xl border bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-white/10">
            <h3 className="text-lg font-bold">5. FIND THE PROBLEM</h3>
            <p className="text-sm opacity-80 mt-0.5">
              These sentences were written by English learners. Correct them in the input field.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {FIND_THE_PROBLEM_ITEMS.map((item) => {
              const userVal = ex5Inputs[item.id] || '';
              const isChecked = !!ex5Checked[item.id];
              const isRevealed = !!ex5Revealed[item.id];
              const isFlipped = !!flippedEx5[item.id];
              const isCorrect = item.acceptableAnswers.some(
                (ans) => normalize(ans) === normalize(userVal)
              );

              return (
                <div
                  key={item.id}
                  className={`p-5 rounded-3xl border transition-all ${
                    isDark ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-200'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                    <span className="text-xs font-mono font-bold text-rose-500 uppercase tracking-wider">
                      Frase con error #{item.number}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => toggleFlip(item.id, setFlippedEx5)}
                        className="text-xs font-mono font-semibold text-sky-500 hover:underline cursor-pointer"
                      >
                        {isFlipped ? 'Inglés ↻' : 'Traducir ↻'}
                      </button>
                      <button
                        type="button"
                        onClick={() => speakEnglish(item.correctSentenceEn, speechRate, accent)}
                        className="p-1 rounded-lg border border-inherit/20 hover:bg-slate-100 dark:hover:bg-slate-800"
                        aria-label="Audio"
                      >
                        <Volume2 className="w-3.5 h-3.5 text-sky-500" />
                      </button>
                    </div>
                  </div>

                  <p className="line-through text-rose-600 dark:text-rose-400 font-semibold text-base mb-1">
                    {isFlipped ? item.incorrectSentenceEs : item.incorrectSentenceEn}
                  </p>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 my-2">
                    <span className="font-mono text-sm opacity-50 hidden sm:inline">→</span>
                    <input
                      type="text"
                      value={userVal}
                      onChange={(e) => {
                        setEx5Inputs((prev) => ({ ...prev, [item.id]: e.target.value }));
                        setEx5Checked((prev) => ({ ...prev, [item.id]: false }));
                      }}
                      placeholder="Write corrected sentence..."
                      className={`flex-1 px-4 py-2 rounded-xl border text-sm font-semibold outline-none transition-all ${
                        isChecked
                          ? isCorrect
                            ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-900 dark:text-emerald-200'
                            : 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-900 dark:text-rose-200'
                          : isDark
                          ? 'bg-slate-800 border-white/10 text-white focus:border-sky-500'
                          : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-sky-600'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        playFeedbackSound('click');
                        setEx5Checked((prev) => ({ ...prev, [item.id]: true }));
                      }}
                      disabled={!userVal.trim()}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-sky-600 hover:bg-sky-700 text-white transition-all cursor-pointer shadow-xs disabled:opacity-40"
                    >
                      Comprobar
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setEx5Revealed((prev) => ({ ...prev, [item.id]: !prev[item.id] }))
                      }
                      className="px-3.5 py-2 rounded-xl text-xs font-semibold border border-inherit/30 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer flex items-center gap-1"
                    >
                      {isRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      <span>{isRevealed ? 'Ocultar' : 'Solución'}</span>
                    </button>
                  </div>

                  {(isChecked || isRevealed) && (
                    <div className="mt-3 p-3 rounded-2xl border text-xs sm:text-sm bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-white/10">
                      <p className="font-bold text-emerald-600 dark:text-emerald-400 mb-0.5">
                        Forma correcta: "{item.correctSentenceEn}"
                      </p>
                      <p className="opacity-75 italic font-serif">{item.correctSentenceEs}</p>
                      <p className="text-xs opacity-90 mt-1">{item.explanationEn}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 6: A TRIP TO LONDON (HOW MUCH / HOW MANY) */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'ex6' && (
        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl border bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-white/10">
            <div>
              <h3 className="text-lg font-bold">6. A TRIP TO LONDON</h3>
              <p className="text-sm opacity-80 mt-0.5">
                Complete the questions with <strong>HOW MUCH</strong> or <strong>HOW MANY</strong>.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
                Puntaje: {ex6Score} / {TRIP_TO_LONDON_ITEMS.length}
              </span>
              <button
                type="button"
                onClick={() => setEx6Checked((prev) => !prev)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-sky-600 hover:bg-sky-700 text-white shadow-xs transition-all cursor-pointer"
              >
                {ex6Checked ? 'Ocultar Corrección' : 'Comprobar'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {TRIP_TO_LONDON_ITEMS.map((item) => {
              const selected = ex6Choices[item.id];
              const isChecked = ex6Checked;
              const isFlipped = !!flippedEx6[item.id];
              const isCorrect = selected === item.correctQuantifier;

              return (
                <div
                  key={item.id}
                  className={`p-5 rounded-3xl border flex flex-col justify-between ${
                    isDark ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-200'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400">
                        Pregunta #{item.number}
                      </span>
                      <button
                        type="button"
                        onClick={() => toggleFlip(item.id, setFlippedEx6)}
                        className="text-xs font-mono font-semibold text-sky-500 hover:underline cursor-pointer"
                      >
                        {isFlipped ? 'Inglés ↻' : 'Traducir ↻'}
                      </button>
                    </div>

                    <div className="text-base font-semibold mb-3">
                      <span className="text-sky-600 dark:text-sky-400 mr-1.5">
                        {selected ? `[ ${selected} ]` : '[ _______ ]'}
                      </span>
                      <span>{item.sentenceAfter}</span>
                    </div>

                    {isFlipped && (
                      <p className="text-xs opacity-75 italic mb-3 font-serif">
                        {item.sentenceEs}
                      </p>
                    )}

                    {/* Toggle Buttons */}
                    <div className="flex items-center gap-2 mb-2">
                      {(['HOW MUCH', 'HOW MANY'] as const).map((choice) => {
                        const isChosen = selected === choice;
                        let btnStyle = isDark
                          ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-white/10'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-200';

                        if (isChosen) {
                          btnStyle = 'bg-sky-600 text-white border-sky-500';
                        }

                        if (isChecked && isChosen) {
                          btnStyle = isCorrect
                            ? 'bg-emerald-600 text-white border-emerald-500'
                            : 'bg-rose-600 text-white border-rose-500';
                        }

                        return (
                          <button
                            key={choice}
                            type="button"
                            onClick={() => {
                              playFeedbackSound('click');
                              setEx6Choices((prev) => ({ ...prev, [item.id]: choice }));
                            }}
                            className={`flex-1 py-2 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${btnStyle}`}
                          >
                            {choice}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {isChecked && (
                    <div className="mt-2 text-xs opacity-80 border-t border-inherit/15 pt-2">
                      <span className="font-bold text-sky-600 dark:text-sky-400">
                        Correcto: {item.correctQuantifier}
                      </span>
                      <p className="mt-0.5">{item.explanationEn}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Personal travel plan */}
          <div className="p-6 rounded-3xl border bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-white/10 flex flex-col gap-3">
            <h4 className="font-bold text-base">
              Now answer three questions with your own ideas:
            </h4>
            <p className="text-xs sm:text-sm opacity-75">
              Ejemplo: "1. I want to take 500 pounds. 2. I am taking one suitcase. 3. I can take 20 kilos of luggage on the plane."
            </p>
            <textarea
              rows={3}
              value={ex6PersonalPlan}
              onChange={(e) => setEx6PersonalPlan(e.target.value)}
              placeholder="Write your three answers here..."
              className="w-full p-3 rounded-2xl border text-sm bg-white dark:bg-slate-800 border-slate-200 dark:border-white/10 outline-none focus:border-sky-500"
            />
            <button
              type="button"
              onClick={() => {
                playFeedbackSound('click');
                setEx6PersonalSaved(true);
              }}
              disabled={!ex6PersonalPlan.trim()}
              className="self-start px-5 py-2 rounded-xl text-xs font-bold bg-sky-600 hover:bg-sky-700 text-white shadow-xs transition-all cursor-pointer disabled:opacity-40"
            >
              Guardar Respuestas
            </button>
            {ex6PersonalSaved && (
              <div className="p-3 rounded-2xl border bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500/40 text-emerald-900 dark:text-emerald-200 text-xs sm:text-sm">
                ¡Respuestas guardadas con éxito! Has planificado tu viaje respondiendo a preguntas cuantificadoras.
              </div>
            )}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 7: AT A RESTAURANT (CONVERSATION & ANALYSIS) */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'ex7' && (
        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl border bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-white/10">
            <div>
              <h3 className="text-lg font-bold">7. AT A RESTAURANT</h3>
              <p className="text-sm opacity-80 mt-0.5">
                Read the conversation, complete the missing words, and analyze why they are used.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setEx7Checked((prev) => !prev)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-sky-600 hover:bg-sky-700 text-white shadow-xs transition-all cursor-pointer"
              >
                {ex7Checked ? 'Ocultar Corrección' : 'Comprobar Diálogo'}
              </button>
              <button
                type="button"
                onClick={() => setEx7Revealed((prev) => !prev)}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold border border-inherit/30 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
              >
                {ex7Revealed ? 'Ocultar Solución' : 'Ver Solución'}
              </button>
            </div>
          </div>

          {/* Dialogue Script Container */}
          <div
            className={`p-6 rounded-3xl border flex flex-col gap-3.5 ${
              isDark ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-200 shadow-xs'
            }`}
          >
            {RESTAURANT_DIALOGUE_SCRIPT.map((turn, idx) => {
              const isWaiter = turn.speaker === 'Waiter';

              return (
                <div
                  key={idx}
                  className={`p-3.5 rounded-2xl border flex items-start gap-3 ${
                    isWaiter
                      ? 'bg-slate-50/80 dark:bg-slate-800/40 border-slate-200/80 dark:border-white/5'
                      : 'bg-sky-50/60 dark:bg-sky-950/30 border-sky-200/70 dark:border-sky-900/40'
                  }`}
                >
                  <span
                    className={`px-2.5 py-1 rounded-xl text-xs font-mono font-bold uppercase shrink-0 ${
                      isWaiter
                        ? 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200'
                        : 'bg-sky-600 text-white'
                    }`}
                  >
                    {turn.speaker}
                  </span>

                  <div className="flex-1 text-sm sm:text-base leading-relaxed">
                    <span>{turn.textBefore} </span>

                    {turn.blankId && (
                      <input
                        type="text"
                        value={ex7Blanks[turn.blankId] || ''}
                        onChange={(e) =>
                          setEx7Blanks((prev) => ({ ...prev, [turn.blankId!]: e.target.value }))
                        }
                        placeholder={ex7Revealed ? turn.correctBlank : '______'}
                        className={`inline-block px-3 py-1 rounded-xl border text-sm font-bold min-w-[90px] mx-1 outline-none text-center ${
                          ex7Checked
                            ? turn.acceptableBlanks?.some(
                                (b) => normalize(b) === normalize(ex7Blanks[turn.blankId!] || '')
                              )
                              ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-900 dark:text-emerald-200'
                              : 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-900 dark:text-rose-200'
                            : isDark
                            ? 'bg-slate-800 border-white/10 text-white'
                            : 'bg-white border-slate-300 text-slate-900'
                        }`}
                      />
                    )}

                    <span>{turn.textAfter}</span>
                    <p className="text-xs opacity-60 italic mt-0.5 font-serif">{turn.textEs}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 4 Analysis Questions */}
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-base">Preguntas de Análisis Conceptual:</h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {RESTAURANT_ANALYSIS_QUESTIONS.map((item) => (
                <div
                  key={item.id}
                  className={`p-5 rounded-3xl border flex flex-col justify-between ${
                    isDark ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-200'
                  }`}
                >
                  <div>
                    <h5 className="font-bold text-sm sm:text-base text-sky-950 dark:text-sky-200 mb-2">
                      {item.questionEn}
                    </h5>
                    <p className="text-xs opacity-70 italic mb-3 font-serif">{item.questionEs}</p>
                    <div className="p-3 rounded-2xl border bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-white/10 text-xs sm:text-sm">
                      <p className="font-medium text-slate-800 dark:text-slate-200">
                        {item.answerEn}
                      </p>
                      <p className="opacity-75 italic mt-1 font-serif">{item.answerEs}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 8: WORK PROBLEMS (6 ITEMS) */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'ex8' && (
        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl border bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-white/10">
            <div>
              <h3 className="text-lg font-bold">8. WORK PROBLEMS</h3>
              <p className="text-sm opacity-80 mt-0.5">
                Imagine you are at work and something has gone wrong. Choose the correct option.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
                Puntaje: {ex8Score} / {WORK_PROBLEMS_ITEMS.length}
              </span>
              <button
                type="button"
                onClick={() => setEx8Checked((prev) => !prev)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-sky-600 hover:bg-sky-700 text-white shadow-xs transition-all cursor-pointer"
              >
                {ex8Checked ? 'Ocultar Corrección' : 'Comprobar'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {WORK_PROBLEMS_ITEMS.map((item) => {
              const selectedKey = ex8Answers[item.id];
              const isAnswered = !!selectedKey;
              const isCorrect = selectedKey === item.correctAnswer;
              const isFlipped = !!flippedEx8[item.id];

              return (
                <div
                  key={item.id}
                  className={`p-5 sm:p-6 rounded-3xl border flex flex-col justify-between ${
                    isDark ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-200'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="px-2.5 py-0.5 rounded-lg text-xs font-mono font-bold uppercase bg-slate-100 dark:bg-slate-800 text-sky-600 dark:text-sky-400">
                        Problema #{item.number}
                      </span>
                      <button
                        type="button"
                        onClick={() => toggleFlip(item.id, setFlippedEx8)}
                        className="text-xs font-mono font-semibold text-sky-500 hover:underline cursor-pointer"
                      >
                        {isFlipped ? 'Inglés ↻' : 'Traducir ↻'}
                      </button>
                    </div>

                    <h4 className="text-base sm:text-lg font-bold mb-3 text-sky-950 dark:text-sky-200">
                      {isFlipped ? item.promptEs : item.promptEn}
                    </h4>

                    <div className="flex flex-col gap-2 mb-4">
                      {item.options.map((opt) => {
                        const isSelected = selectedKey === opt.key;
                        let optionStyle = isDark
                          ? 'bg-slate-800/60 hover:bg-slate-800 border-white/10 text-slate-200'
                          : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800';

                        if (isSelected) {
                          optionStyle = 'bg-sky-600 text-white border-sky-500 shadow-xs';
                        }

                        if (ex8Checked && isAnswered) {
                          if (opt.key === item.correctAnswer) {
                            optionStyle = 'bg-emerald-600 text-white border-emerald-500';
                          } else if (isSelected && !opt.isCorrect) {
                            optionStyle = 'bg-rose-600 text-white border-rose-500';
                          }
                        }

                        return (
                          <button
                            key={opt.key}
                            type="button"
                            onClick={() => {
                              playFeedbackSound('click');
                              setEx8Answers((prev) => ({ ...prev, [item.id]: opt.key }));
                            }}
                            className={`p-3 rounded-2xl border text-sm font-semibold flex items-center justify-between transition-all cursor-pointer ${optionStyle}`}
                          >
                            <span className="flex items-center gap-2">
                              <span className="w-5 h-5 rounded-full border border-inherit/40 flex items-center justify-center text-xs font-mono">
                                {opt.key}
                              </span>
                              <span>{opt.text}</span>
                            </span>
                            {ex8Checked && opt.key === item.correctAnswer && (
                              <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {ex8Checked && isAnswered && (
                    <div className="p-3 rounded-2xl border text-xs sm:text-sm bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-white/10">
                      <p className="font-bold text-sky-600 dark:text-sky-400 mb-0.5">
                        {isCorrect ? '¡Correcto!' : 'Respuesta Incorrecta'}
                      </p>
                      <p className="opacity-90">{item.explanationEn}</p>
                      <p className="opacity-75 italic mt-1 font-serif">{item.explanationEs}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 9: COUNTABLE OR UNCOUNTABLE — BUT THINK! (6 DUAL NOUNS) */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'ex9' && (
        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl border bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-white/10">
            <div>
              <h3 className="text-lg font-bold">9. COUNTABLE OR UNCOUNTABLE — BUT THINK!</h3>
              <p className="text-sm opacity-80 mt-0.5">
                Some nouns can be countable or uncountable depending on the meaning. Choose the correct option.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
                Puntaje: {ex9Score} / {DUAL_NOUN_ITEMS.length}
              </span>
              <button
                type="button"
                onClick={() => setEx9Checked((prev) => !prev)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-sky-600 hover:bg-sky-700 text-white shadow-xs transition-all cursor-pointer"
              >
                {ex9Checked ? 'Ocultar Corrección' : 'Comprobar'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {DUAL_NOUN_ITEMS.map((item) => {
              const selected = ex9Answers[item.id];
              const isChecked = ex9Checked;
              const isCorrect = selected === item.correctChoice;
              const isFlipped = !!flippedEx9[item.id];

              return (
                <div
                  key={item.id}
                  className={`p-5 sm:p-6 rounded-3xl border flex flex-col justify-between ${
                    isDark ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-200'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="px-2.5 py-0.5 rounded-lg text-xs font-mono font-bold uppercase bg-slate-100 dark:bg-slate-800 text-sky-600 dark:text-sky-400">
                        {item.noun}
                      </span>
                      <button
                        type="button"
                        onClick={() => toggleFlip(item.id, setFlippedEx9)}
                        className="text-xs font-mono font-semibold text-sky-500 hover:underline cursor-pointer"
                      >
                        {isFlipped ? 'Inglés ↻' : 'Traducir ↻'}
                      </button>
                    </div>

                    <div className="p-2.5 rounded-xl border border-sky-500/20 bg-sky-50/50 dark:bg-sky-950/30 text-xs sm:text-sm font-semibold mb-3">
                      {isFlipped ? item.contextEs : item.contextEn}
                    </div>

                    <p className="text-base font-bold text-sky-950 dark:text-sky-200 mb-3">
                      {item.sentenceOptions.opt1} / {item.sentenceOptions.opt2}
                    </p>

                    <div className="flex items-center gap-2 mb-4">
                      {[item.sentenceOptions.opt1, item.sentenceOptions.opt2].map((opt) => {
                        const isChosen = selected === opt;
                        let btnStyle = isDark
                          ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-white/10'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-200';

                        if (isChosen) {
                          btnStyle = 'bg-sky-600 text-white border-sky-500';
                        }

                        if (isChecked && isChosen) {
                          btnStyle = isCorrect
                            ? 'bg-emerald-600 text-white border-emerald-500'
                            : 'bg-rose-600 text-white border-rose-500';
                        } else if (isChecked && opt === item.correctChoice) {
                          btnStyle = 'bg-emerald-600 text-white border-emerald-500';
                        }

                        return (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => {
                              playFeedbackSound('click');
                              setEx9Answers((prev) => ({ ...prev, [item.id]: opt }));
                            }}
                            className={`flex-1 py-2.5 px-3 rounded-xl border text-xs sm:text-sm font-bold transition-all cursor-pointer ${btnStyle}`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {isChecked && (
                    <div className="p-3 rounded-2xl border text-xs sm:text-sm bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-white/10">
                      <p className="font-bold text-sky-600 dark:text-sky-400 mb-0.5">
                        Frase completa: "{item.fullSentenceEn}"
                      </p>
                      <p className="opacity-90">{item.explanationEn}</p>
                      <p className="opacity-75 italic mt-1 font-serif">{item.explanationEs}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 10: SPEAKING – REAL QUESTIONS (10 QUESTIONS) */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'ex10' && (
        <div className="flex flex-col gap-6">
          <div className="p-5 rounded-2xl border bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-white/10">
            <h3 className="text-lg font-bold">10. SPEAKING – REAL QUESTIONS</h3>
            <p className="text-sm opacity-80 mt-0.5">
              Practice answering with complete sentences out loud. Listen to the audio and inspect sample model answers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {SPEAKING_REAL_QUESTIONS.map((q) => {
              const isFlipped = !!flippedEx10[q.id];
              const note = ex10Notes[q.id] || '';

              return (
                <div
                  key={q.id}
                  className={`p-5 sm:p-6 rounded-3xl border flex flex-col justify-between ${
                    isDark ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-200'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="px-2.5 py-0.5 rounded-lg text-xs font-mono font-bold uppercase bg-slate-100 dark:bg-slate-800 text-sky-600 dark:text-sky-400">
                        Pregunta #{q.number}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => toggleFlip(q.id, setFlippedEx10)}
                          className="text-xs font-mono font-semibold text-sky-500 hover:underline cursor-pointer"
                        >
                          {isFlipped ? 'Inglés ↻' : 'Traducir ↻'}
                        </button>
                        <button
                          type="button"
                          onClick={() => speakEnglish(q.questionEn, speechRate, accent)}
                          className="p-1 rounded-lg border border-inherit/20 hover:bg-slate-100 dark:hover:bg-slate-800"
                          aria-label="Audio"
                        >
                          <Volume2 className="w-3.5 h-3.5 text-sky-500" />
                        </button>
                      </div>
                    </div>

                    <h4 className="text-base sm:text-lg font-bold mb-1 text-sky-950 dark:text-sky-200">
                      {isFlipped ? q.questionEs : q.questionEn}
                    </h4>
                    <p className="text-xs opacity-60 mb-3 italic">
                      Enfoque: {isFlipped ? q.grammarFocusEs : q.grammarFocusEn}
                    </p>

                    {/* Personal Answer Input */}
                    <input
                      type="text"
                      value={note}
                      onChange={(e) =>
                        setEx10Notes((prev) => ({ ...prev, [q.id]: e.target.value }))
                      }
                      placeholder="Write your speaking response..."
                      className="w-full px-3 py-2 rounded-xl border text-sm bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-white/10 outline-none focus:border-sky-500 mb-3"
                    />

                    {/* Sample Answer Box */}
                    <div className="p-3 rounded-2xl border bg-sky-50/50 dark:bg-sky-950/30 border-sky-200/60 dark:border-sky-900/40 text-xs sm:text-sm">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="font-bold text-sky-700 dark:text-sky-300">
                          Respuesta Modelo:
                        </span>
                        <button
                          type="button"
                          onClick={() => speakEnglish(q.sampleAnswerEn, speechRate, accent)}
                          className="text-[11px] font-mono text-sky-600 hover:underline flex items-center gap-1"
                        >
                          <Volume2 className="w-3 h-3" />
                          Escuchar
                        </button>
                      </div>
                      <p className="font-medium text-slate-800 dark:text-slate-200">
                        "{q.sampleAnswerEn}"
                      </p>
                      <p className="text-xs opacity-75 italic mt-0.5 font-serif">
                        "{q.sampleAnswerEs}"
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 11: FINAL CHALLENGE (PARAGRAPH REWRITE & CORRECTION) */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'ex11' && (
        <div className="flex flex-col gap-6">
          <div className="p-5 rounded-2xl border bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-white/10">
            <h3 className="text-lg font-bold">11. FINAL CHALLENGE</h3>
            <p className="text-sm opacity-80 mt-0.5">
              Read the paragraph below with 6 learner mistakes. Rewrite the paragraph correctly:
            </p>
          </div>

          {/* Original with errors */}
          <div className="p-6 rounded-3xl border border-rose-500/30 bg-rose-50/40 dark:bg-rose-950/20">
            <span className="px-2.5 py-0.5 rounded-lg text-xs font-mono font-bold uppercase tracking-wider bg-rose-600 text-white mb-2 inline-block">
              Párrafo Original con Errores
            </span>
            <p className="text-base sm:text-lg leading-relaxed text-rose-950 dark:text-rose-200 font-medium mt-1">
              "{FINAL_CHALLENGE_ORIGINAL}"
            </p>
          </div>

          {/* User's rewrite area */}
          <div
            className={`p-6 rounded-3xl border flex flex-col gap-3 ${
              isDark ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-200'
            }`}
          >
            <h4 className="font-bold text-base">Reescribe el párrafo correctamente:</h4>
            <textarea
              rows={4}
              value={ex11Input}
              onChange={(e) => setEx11Input(e.target.value)}
              className="w-full p-4 rounded-2xl border text-sm sm:text-base bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-white/10 outline-none focus:border-sky-500 font-mono leading-relaxed"
            />

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  playFeedbackSound('click');
                  setEx11Checked(true);
                  if (onSuccess) onSuccess();
                }}
                className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-sky-600 hover:bg-sky-700 text-white shadow-xs transition-all cursor-pointer"
              >
                Comprobar Párrafo
              </button>

              <button
                type="button"
                onClick={() => setEx11Revealed((prev) => !prev)}
                className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border border-inherit/30 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1.5 transition-all"
              >
                {ex11Revealed ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                <span>{ex11Revealed ? 'Ocultar Solución' : 'Ver Párrafo Modelo'}</span>
              </button>

              <button
                type="button"
                onClick={() => speakEnglish(FINAL_CHALLENGE_CORRECT, speechRate, accent)}
                className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border border-sky-500/30 text-sky-600 hover:bg-sky-500/10 flex items-center gap-1.5"
              >
                <Volume2 className="w-4 h-4" />
                <span>Escuchar Versión Correcta</span>
              </button>
            </div>

            {(ex11Checked || ex11Revealed) && (
              <div className="mt-4 p-5 rounded-2xl border bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500/40 text-emerald-950 dark:text-emerald-200 flex flex-col gap-2">
                <span className="font-bold text-xs uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                  Versión Correcta Modelo:
                </span>
                <p className="text-base font-semibold leading-relaxed">
                  "{FINAL_CHALLENGE_CORRECT}"
                </p>
              </div>
            )}
          </div>

          {/* Detailed Error Breakdown */}
          <div className="flex flex-col gap-3">
            <h4 className="font-bold text-base">Desglose de los 6 errores corregidos:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {FINAL_CHALLENGE_ERRORS.map((err, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border flex flex-col justify-between ${
                    isDark ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-200'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="line-through text-rose-500 font-mono font-bold text-xs">
                        ✗ {err.incorrect}
                      </span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-mono font-bold text-xs">
                        ✓ {err.correction}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm opacity-90">{err.reasonEn}</p>
                    <p className="text-xs opacity-75 italic mt-1 font-serif">{err.reasonEs}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 12: GUÍA RÁPIDA Y RESPUESTAS (SUMMARY CHEAT SHEET) */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'answers' && (
        <div className="flex flex-col gap-6">
          <div className="p-6 rounded-3xl border bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-white/10">
            <h3 className="text-xl font-bold mb-2">GUÍA RÁPIDA: COUNTABLE & UNCOUNTABLE NOUNS</h3>
            <p className="text-sm opacity-80 mb-4">
              Resumen visual de reglas y clave de respuestas para todas las 11 actividades.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="p-4 rounded-2xl border bg-white dark:bg-slate-800 border-slate-200 dark:border-white/10">
                <span className="font-bold text-sky-600 dark:text-sky-400 text-sm">
                  COUNTABLE (Contables)
                </span>
                <ul className="text-xs mt-2 space-y-1.5 opacity-80 list-disc list-inside">
                  <li>Tienen singular y plural (bottle, bottles).</li>
                  <li>Llevan "a / an" en singular (an apple).</li>
                  <li>Llevan números (two eggs, six chairs).</li>
                  <li>Preguntan con <strong>HOW MANY</strong>.</li>
                  <li>Usan <strong>many</strong> y <strong>a few</strong>.</li>
                </ul>
              </div>

              <div className="p-4 rounded-2xl border bg-white dark:bg-slate-800 border-slate-200 dark:border-white/10">
                <span className="font-bold text-sky-600 dark:text-sky-400 text-sm">
                  UNCOUNTABLE (Incontables)
                </span>
                <ul className="text-xs mt-2 space-y-1.5 opacity-80 list-disc list-inside">
                  <li>No tienen plural (*waters, *breads NO existen).</li>
                  <li>Nunca llevan "a" ni "an" directos.</li>
                  <li>Llevan verbo siempre singular.</li>
                  <li>Preguntan con <strong>HOW MUCH</strong>.</li>
                  <li>Usan <strong>much</strong> y <strong>a little</strong>.</li>
                </ul>
              </div>

              <div className="p-4 rounded-2xl border bg-white dark:bg-slate-800 border-slate-200 dark:border-white/10">
                <span className="font-bold text-sky-600 dark:text-sky-400 text-sm">
                  BOTH (Ambos / Cuantificadores)
                </span>
                <ul className="text-xs mt-2 space-y-1.5 opacity-80 list-disc list-inside">
                  <li><strong>some:</strong> afirmativas y peticiones.</li>
                  <li><strong>any:</strong> negativas y preguntas abiertas.</li>
                  <li><strong>a lot of / lots of:</strong> ambos.</li>
                  <li><strong>enough:</strong> ambos.</li>
                  <li><strong>no:</strong> ambos (no bread, no eggs).</li>
                </ul>
              </div>
            </div>

            {/* Answer Key Highlights */}
            <div className="pt-4 border-t border-inherit/15">
              <h4 className="font-bold text-sm mb-3">Claves rápidas de ejercicios:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl border bg-white dark:bg-slate-800 border-inherit/20">
                  <span className="font-bold text-sky-600">1. What Would You Say:</span>
                  <p className="mt-1">1: some, 2: many, 3: much, 4: much, 5: some, 6: a lot of.</p>
                </div>
                <div className="p-3 rounded-xl border bg-white dark:bg-slate-800 border-inherit/20">
                  <span className="font-bold text-sky-600">2. Real-Life Problems:</span>
                  <p className="mt-1">1: any, 2: a lot of, 3: any, 4: a few, 5: a few, 6: a little, 7: any, 8: much.</p>
                </div>
                <div className="p-3 rounded-xl border bg-white dark:bg-slate-800 border-inherit/20">
                  <span className="font-bold text-sky-600">4. Sounds Natural:</span>
                  <p className="mt-1">1: some advice, 2: much time, 3: a few restaurants, 4: some useful information, 5: many clothes, 6: much luggage, 7: much traffic, 8: a few chairs.</p>
                </div>
                <div className="p-3 rounded-xl border bg-white dark:bg-slate-800 border-inherit/20">
                  <span className="font-bold text-sky-600">6. Trip to London:</span>
                  <p className="mt-1">1: Much, 2: Many, 3: Much, 4: Many, 5: Many, 6: Much, 7: Many, 8: Much.</p>
                </div>
                <div className="p-3 rounded-xl border bg-white dark:bg-slate-800 border-inherit/20">
                  <span className="font-bold text-sky-600">8. Work Problems:</span>
                  <p className="mt-1">1: enough, 2: more, 3: several, 4: a lot of, 5: a few, 6: enough.</p>
                </div>
                <div className="p-3 rounded-xl border bg-white dark:bg-slate-800 border-inherit/20">
                  <span className="font-bold text-sky-600">9. Dual Nouns:</span>
                  <p className="mt-1">1: some chicken, 2: some chickens, 3: two coffees, 4: much coffee, 5: some paper, 6: two papers.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
