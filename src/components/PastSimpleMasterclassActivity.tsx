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
  MessageSquare,
  Trophy,
  Volume2,
  Eye,
  EyeOff,
  UserCheck,
  Film,
  ArrowRight,
  ListFilter,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { CardSpeechControl } from './CardSpeechControl';
import { speakEnglish, playFeedbackSound } from '../utils/audio';
import {
  PAST_SIMPLE_THEORY,
  TOM_STORY_BLANKS,
  TOM_STORY_PARAGRAPHS,
  ACTOR_QUESTIONS_DATA,
  CHOOSE_OPTION_ITEMS,
  COMPLETE_SENTENCES_DATA,
  CORRECT_MISTAKES_DATA,
  EMMA_STORY_BLANKS,
  EMMA_STORY_PARAGRAPHS,
  PAST_VS_PRESENT_DATA,
} from '../data/pastSimpleMasterclassData';

interface PastSimpleMasterclassActivityProps {
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
  | 'answers';

const TABS: { id: TabType; label: string; icon: React.ElementType }[] = [
  { id: 'theory', label: 'Reglas y Teoría', icon: BookOpen },
  { id: 'ex1', label: '1. Complete the Story', icon: CheckSquare },
  { id: 'ex2', label: '2. Questions & Answers', icon: Film },
  { id: 'ex3', label: '3. Choose Option', icon: ListFilter },
  { id: 'ex4', label: '4. Complete Sentences', icon: Sparkles },
  { id: 'ex5', label: '5. Correct Mistakes', icon: AlertTriangle },
  { id: 'ex6', label: "6. Emma's Day", icon: UserCheck },
  { id: 'ex7', label: '7. Past vs Present', icon: ArrowRight },
  { id: 'answers', label: 'Guía y Respuestas', icon: HelpCircle },
];

export const PastSimpleMasterclassActivity: React.FC<PastSimpleMasterclassActivityProps> = ({
  accent = 'US',
  speechRate = 1.0,
  onSuccess,
}) => {
  const { isDark } = useTheme();

  // Active navigation tab
  const [activeTab, setActiveTab] = useState<TabType>('theory');
  const tabsContainerRef = React.useRef<HTMLDivElement>(null);

  const currentTabIndex = TABS.findIndex((t) => t.id === activeTab);

  const goToTab = (tabId: TabType) => {
    setActiveTab(tabId);
    playFeedbackSound('click');
    setTimeout(() => {
      const el = document.getElementById(`ps-tab-${tabId}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }, 40);
  };

  const handlePrevTab = () => {
    if (currentTabIndex > 0) {
      goToTab(TABS[currentTabIndex - 1].id);
    }
  };

  const handleNextTab = () => {
    if (currentTabIndex < TABS.length - 1) {
      goToTab(TABS[currentTabIndex + 1].id);
    }
  };

  // Flip states for reversible cards
  const [flippedTheory, setFlippedTheory] = useState<Record<string, boolean>>({});
  const [flippedStoryP, setFlippedStoryP] = useState<Record<string, boolean>>({});
  const [flippedActorQ, setFlippedActorQ] = useState<Record<string, boolean>>({});
  const [flippedChoose, setFlippedChoose] = useState<Record<string, boolean>>({});
  const [flippedSentences, setFlippedSentences] = useState<Record<string, boolean>>({});
  const [flippedMistakes, setFlippedMistakes] = useState<Record<string, boolean>>({});
  const [flippedEmmaP, setFlippedEmmaP] = useState<Record<string, boolean>>({});
  const [flippedPvp, setFlippedPvp] = useState<Record<string, boolean>>({});

  // 1. Complete the story (Tom)
  const [ex1Inputs, setEx1Inputs] = useState<Record<number, string>>({});
  const [ex1Checked, setEx1Checked] = useState(false);
  const [ex1Revealed, setEx1Revealed] = useState(false);

  // 2. Questions & answers (Actor)
  const [ex2Inputs, setEx2Inputs] = useState<Record<string, string>>({});
  const [ex2Checked, setEx2Checked] = useState(false);
  const [ex2Revealed, setEx2Revealed] = useState(false);

  // 3. Choose the option
  const [ex3Answers, setEx3Answers] = useState<Record<string, 'a' | 'b' | 'c' | 'd'>>({});
  const [ex3Checked, setEx3Checked] = useState(false);

  // 4. Complete sentences
  const [ex4Inputs, setEx4Inputs] = useState<Record<string, string>>({});
  const [ex4Checked, setEx4Checked] = useState(false);
  const [ex4Revealed, setEx4Revealed] = useState(false);

  // 5. Correct the mistakes
  const [ex5Inputs, setEx5Inputs] = useState<Record<string, string>>({});
  const [ex5Checked, setEx5Checked] = useState<Record<string, boolean>>({});
  const [ex5Revealed, setEx5Revealed] = useState<Record<string, boolean>>({});

  // 6. Complete the text (Emma)
  const [ex6Inputs, setEx6Inputs] = useState<Record<number, string>>({});
  const [ex6Checked, setEx6Checked] = useState(false);
  const [ex6Revealed, setEx6Revealed] = useState(false);

  // 7. Past vs Present
  const [ex7Inputs, setEx7Inputs] = useState<Record<string, string>>({});
  const [ex7Checked, setEx7Checked] = useState(false);
  const [ex7Revealed, setEx7Revealed] = useState(false);

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
    (str || '')
      .trim()
      .toLowerCase()
      .replace(/[.,/#!$%^&*;:{}=\-_`~()?'"’]/g, '')
      .replace(/\s+/g, ' ');

  // Scores
  const ex3Score = CHOOSE_OPTION_ITEMS.filter(
    (item) => ex3Answers[item.id] === item.correctOption
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
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-sky-500/15 border border-sky-500/30 text-sky-600 dark:text-sky-400">
                Unit 7 · Section 1
              </span>
              <span className="text-xs font-mono opacity-60">Grammar Masterclass & Real Practice</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
              WHAT A DAY! — PAST SIMPLE
            </h2>
            <p className="text-sm opacity-80 mt-1 max-w-3xl leading-relaxed">
              El Past Simple se utiliza para hablar de acciones y situaciones que comenzaron y terminaron en el pasado. Domina las reglas de verbos regulares (-ed) e irregulares, el uso de did / didn't con la forma base del verbo, y practica con 7 bloques completos de ejercicios interactivos con audio y autocorrección.
            </p>
          </div>

          {/* Header Audio Controller */}
          <div className="shrink-0 flex items-center gap-2 bg-slate-50 dark:bg-slate-800/80 p-2 rounded-2xl border border-inherit/20">
            <CardSpeechControl
              textToSpeak="What a day! We use the Past Simple to talk about actions and situations that started and finished in the past. Yesterday, I missed the bus. Last weekend, I went to a concert. I didn't take my umbrella, so I got wet. Did you see that strange man? After did or didn't, always use the base form of the verb."
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
            id="ps-tabs-prev-button"
            onClick={handlePrevTab}
            disabled={currentTabIndex <= 0}
            className={`shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center border transition-all cursor-pointer select-none shadow-xs ${
              currentTabIndex <= 0
                ? 'opacity-30 cursor-not-allowed border-inherit/20 text-slate-400'
                : isDark
                ? 'bg-slate-800 hover:bg-sky-600 text-white border-white/10 hover:border-sky-400 shadow-md hover:scale-105 active:scale-95'
                : 'bg-white hover:bg-sky-600 text-slate-700 hover:text-white border-slate-200 hover:border-sky-600 shadow-sm hover:scale-105 active:scale-95'
            }`}
            title={currentTabIndex > 0 ? `Sección anterior: ${TABS[currentTabIndex - 1].label}` : 'Primera sección'}
            aria-label="Pestaña anterior"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Scrollable Tabs Row */}
          <div
            ref={tabsContainerRef}
            className="flex-1 flex items-center gap-1.5 overflow-x-auto no-scrollbar scroll-smooth py-1"
          >
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`ps-tab-${tab.id}`}
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
            id="ps-tabs-next-button"
            onClick={handleNextTab}
            disabled={currentTabIndex >= TABS.length - 1}
            className={`shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center border transition-all cursor-pointer select-none shadow-xs ${
              currentTabIndex >= TABS.length - 1
                ? 'opacity-30 cursor-not-allowed border-inherit/20 text-slate-400'
                : isDark
                ? 'bg-slate-800 hover:bg-sky-600 text-white border-white/10 hover:border-sky-400 shadow-md hover:scale-105 active:scale-95'
                : 'bg-white hover:bg-sky-600 text-slate-700 hover:text-white border-slate-200 hover:border-sky-600 shadow-sm hover:scale-105 active:scale-95'
            }`}
            title={currentTabIndex < TABS.length - 1 ? `Siguiente sección: ${TABS[currentTabIndex + 1].label}` : 'Última sección'}
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
            {PAST_SIMPLE_THEORY.map((topic) => {
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
      {/* TAB 1: COMPLETE THE STORY (TOM'S DAY - 16 BLANKS) */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'ex1' && (
        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl border bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-white/10">
            <div>
              <h3 className="text-lg font-bold">1. COMPLETE THE STORY</h3>
              <p className="text-sm opacity-80 mt-0.5">
                Complete with the correct form of the verbs in brackets. Yesterday, Tom had a very strange morning...
              </p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <button
                type="button"
                onClick={() => {
                  playFeedbackSound('click');
                  setEx1Checked(true);
                  const isAllCorrect = TOM_STORY_BLANKS.every((b) =>
                    b.acceptableAnswers.some((ans) => normalize(ans) === normalize(ex1Inputs[b.index]))
                  );
                  if (isAllCorrect) {
                    playFeedbackSound('complete');
                  } else {
                    playFeedbackSound('wrong');
                  }
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-sky-600 hover:bg-sky-500 text-white transition-all cursor-pointer shadow-xs flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>Comprobar</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  playFeedbackSound('click');
                  setEx1Revealed((prev) => !prev);
                }}
                className="px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-all cursor-pointer flex items-center gap-1.5"
              >
                {ex1Revealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                <span>{ex1Revealed ? 'Ocultar' : 'Respuestas'}</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  playFeedbackSound('click');
                  setEx1Inputs({});
                  setEx1Checked(false);
                  setEx1Revealed(false);
                }}
                className="p-2 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-all cursor-pointer"
                title="Reiniciar"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Interactive Story Narrative */}
          <div
            className={`p-6 rounded-3xl border shadow-xs space-y-6 ${
              isDark ? 'bg-slate-900 border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            {/* Paragraph 1 */}
            <div className="p-5 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-slate-800/40">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-inherit/20">
                <span className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider">
                  Párrafo 1 · La Mañana de Tom
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => toggleFlip('p1', setFlippedStoryP)}
                    className="text-xs font-semibold px-2 py-1 rounded-lg bg-sky-100 dark:bg-sky-900/50 text-sky-700 dark:text-sky-300 hover:bg-sky-200 cursor-pointer"
                  >
                    {flippedStoryP['p1'] ? 'Ver Inglés' : 'Ver Traducción'}
                  </button>
                  <CardSpeechControl
                    textToSpeak="Yesterday, Tom woke up late because his alarm didn't ring. He got dressed in five minutes and ran to the bus stop, but he missed the bus."
                    accent={accent}
                    initialSpeed={speechRate}
                    size="sm"
                  />
                </div>
              </div>

              {flippedStoryP['p1'] ? (
                <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 italic">
                  {TOM_STORY_PARAGRAPHS[0].textEs}
                </p>
              ) : (
                <div className="text-sm sm:text-base leading-loose font-medium">
                  Yesterday, Tom (1){' '}
                  <input
                    type="text"
                    value={ex1Inputs[1] || ''}
                    placeholder="wake up"
                    onChange={(e) => setEx1Inputs({ ...ex1Inputs, 1: e.target.value })}
                    className={`inline-block w-28 sm:w-32 px-2.5 py-1 rounded-xl text-center font-bold text-sm border mx-1 transition-all ${
                      ex1Revealed
                        ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300'
                        : ex1Checked
                        ? TOM_STORY_BLANKS[0].acceptableAnswers.some(
                            (a) => normalize(a) === normalize(ex1Inputs[1])
                          )
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
                          : 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300'
                        : 'border-slate-300 dark:border-white/20 bg-white dark:bg-slate-900'
                    }`}
                  />
                  {ex1Revealed && (
                    <span className="text-xs text-sky-600 font-mono font-bold mr-1">
                      [woke up]
                    </span>
                  )}
                  late because his alarm (2){' '}
                  <input
                    type="text"
                    value={ex1Inputs[2] || ''}
                    placeholder="not / ring"
                    onChange={(e) => setEx1Inputs({ ...ex1Inputs, 2: e.target.value })}
                    className={`inline-block w-32 sm:w-36 px-2.5 py-1 rounded-xl text-center font-bold text-sm border mx-1 transition-all ${
                      ex1Revealed
                        ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300'
                        : ex1Checked
                        ? TOM_STORY_BLANKS[1].acceptableAnswers.some(
                            (a) => normalize(a) === normalize(ex1Inputs[2])
                          )
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
                          : 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300'
                        : 'border-slate-300 dark:border-white/20 bg-white dark:bg-slate-900'
                    }`}
                  />
                  {ex1Revealed && (
                    <span className="text-xs text-sky-600 font-mono font-bold mr-1">
                      [didn't ring]
                    </span>
                  )}
                  . He (3){' '}
                  <input
                    type="text"
                    value={ex1Inputs[3] || ''}
                    placeholder="get"
                    onChange={(e) => setEx1Inputs({ ...ex1Inputs, 3: e.target.value })}
                    className={`inline-block w-20 sm:w-24 px-2.5 py-1 rounded-xl text-center font-bold text-sm border mx-1 transition-all ${
                      ex1Revealed
                        ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300'
                        : ex1Checked
                        ? TOM_STORY_BLANKS[2].acceptableAnswers.some(
                            (a) => normalize(a) === normalize(ex1Inputs[3])
                          )
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
                          : 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300'
                        : 'border-slate-300 dark:border-white/20 bg-white dark:bg-slate-900'
                    }`}
                  />
                  {ex1Revealed && (
                    <span className="text-xs text-sky-600 font-mono font-bold mr-1">
                      [got]
                    </span>
                  )}
                  dressed in five minutes and (4){' '}
                  <input
                    type="text"
                    value={ex1Inputs[4] || ''}
                    placeholder="run"
                    onChange={(e) => setEx1Inputs({ ...ex1Inputs, 4: e.target.value })}
                    className={`inline-block w-20 sm:w-24 px-2.5 py-1 rounded-xl text-center font-bold text-sm border mx-1 transition-all ${
                      ex1Revealed
                        ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300'
                        : ex1Checked
                        ? TOM_STORY_BLANKS[3].acceptableAnswers.some(
                            (a) => normalize(a) === normalize(ex1Inputs[4])
                          )
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
                          : 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300'
                        : 'border-slate-300 dark:border-white/20 bg-white dark:bg-slate-900'
                    }`}
                  />
                  {ex1Revealed && (
                    <span className="text-xs text-sky-600 font-mono font-bold mr-1">
                      [ran]
                    </span>
                  )}
                  to the bus stop, but he (5){' '}
                  <input
                    type="text"
                    value={ex1Inputs[5] || ''}
                    placeholder="miss"
                    onChange={(e) => setEx1Inputs({ ...ex1Inputs, 5: e.target.value })}
                    className={`inline-block w-24 sm:w-28 px-2.5 py-1 rounded-xl text-center font-bold text-sm border mx-1 transition-all ${
                      ex1Revealed
                        ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300'
                        : ex1Checked
                        ? TOM_STORY_BLANKS[4].acceptableAnswers.some(
                            (a) => normalize(a) === normalize(ex1Inputs[5])
                          )
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
                          : 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300'
                        : 'border-slate-300 dark:border-white/20 bg-white dark:bg-slate-900'
                    }`}
                  />
                  {ex1Revealed && (
                    <span className="text-xs text-sky-600 font-mono font-bold mr-1">
                      [missed]
                    </span>
                  )}
                  the bus.
                </div>
              )}
            </div>

            {/* Paragraph 2 */}
            <div className="p-5 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-slate-800/40">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-inherit/20">
                <span className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider">
                  Párrafo 2 · El Taxi y la Oficina
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => toggleFlip('p2', setFlippedStoryP)}
                    className="text-xs font-semibold px-2 py-1 rounded-lg bg-sky-100 dark:bg-sky-900/50 text-sky-700 dark:text-sky-300 hover:bg-sky-200 cursor-pointer"
                  >
                    {flippedStoryP['p2'] ? 'Ver Inglés' : 'Ver Traducción'}
                  </button>
                  <CardSpeechControl
                    textToSpeak={`He decided to take a taxi, but he left his wallet at home! When he finally arrived at work, his boss looked at him and said, "You're two hours late!"`}
                    accent={accent}
                    initialSpeed={speechRate}
                    size="sm"
                  />
                </div>
              </div>

              {flippedStoryP['p2'] ? (
                <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 italic">
                  {TOM_STORY_PARAGRAPHS[1].textEs}
                </p>
              ) : (
                <div className="text-sm sm:text-base leading-loose font-medium">
                  He (6){' '}
                  <input
                    type="text"
                    value={ex1Inputs[6] || ''}
                    placeholder="decide"
                    onChange={(e) => setEx1Inputs({ ...ex1Inputs, 6: e.target.value })}
                    className={`inline-block w-24 sm:w-28 px-2.5 py-1 rounded-xl text-center font-bold text-sm border mx-1 transition-all ${
                      ex1Revealed
                        ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300'
                        : ex1Checked
                        ? TOM_STORY_BLANKS[5].acceptableAnswers.some(
                            (a) => normalize(a) === normalize(ex1Inputs[6])
                          )
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
                          : 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300'
                        : 'border-slate-300 dark:border-white/20 bg-white dark:bg-slate-900'
                    }`}
                  />
                  {ex1Revealed && (
                    <span className="text-xs text-sky-600 font-mono font-bold mr-1">
                      [decided]
                    </span>
                  )}
                  to take a taxi, but he (7){' '}
                  <input
                    type="text"
                    value={ex1Inputs[7] || ''}
                    placeholder="leave"
                    onChange={(e) => setEx1Inputs({ ...ex1Inputs, 7: e.target.value })}
                    className={`inline-block w-20 sm:w-24 px-2.5 py-1 rounded-xl text-center font-bold text-sm border mx-1 transition-all ${
                      ex1Revealed
                        ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300'
                        : ex1Checked
                        ? TOM_STORY_BLANKS[6].acceptableAnswers.some(
                            (a) => normalize(a) === normalize(ex1Inputs[7])
                          )
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
                          : 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300'
                        : 'border-slate-300 dark:border-white/20 bg-white dark:bg-slate-900'
                    }`}
                  />
                  {ex1Revealed && (
                    <span className="text-xs text-sky-600 font-mono font-bold mr-1">
                      [left]
                    </span>
                  )}
                  his wallet at home! When he finally (8){' '}
                  <input
                    type="text"
                    value={ex1Inputs[8] || ''}
                    placeholder="arrive"
                    onChange={(e) => setEx1Inputs({ ...ex1Inputs, 8: e.target.value })}
                    className={`inline-block w-24 sm:w-28 px-2.5 py-1 rounded-xl text-center font-bold text-sm border mx-1 transition-all ${
                      ex1Revealed
                        ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300'
                        : ex1Checked
                        ? TOM_STORY_BLANKS[7].acceptableAnswers.some(
                            (a) => normalize(a) === normalize(ex1Inputs[8])
                          )
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
                          : 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300'
                        : 'border-slate-300 dark:border-white/20 bg-white dark:bg-slate-900'
                    }`}
                  />
                  {ex1Revealed && (
                    <span className="text-xs text-sky-600 font-mono font-bold mr-1">
                      [arrived]
                    </span>
                  )}
                  at work, his boss (9){' '}
                  <input
                    type="text"
                    value={ex1Inputs[9] || ''}
                    placeholder="look"
                    onChange={(e) => setEx1Inputs({ ...ex1Inputs, 9: e.target.value })}
                    className={`inline-block w-24 sm:w-28 px-2.5 py-1 rounded-xl text-center font-bold text-sm border mx-1 transition-all ${
                      ex1Revealed
                        ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300'
                        : ex1Checked
                        ? TOM_STORY_BLANKS[8].acceptableAnswers.some(
                            (a) => normalize(a) === normalize(ex1Inputs[9])
                          )
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
                          : 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300'
                        : 'border-slate-300 dark:border-white/20 bg-white dark:bg-slate-900'
                    }`}
                  />
                  {ex1Revealed && (
                    <span className="text-xs text-sky-600 font-mono font-bold mr-1">
                      [looked]
                    </span>
                  )}
                  at him and (10){' '}
                  <input
                    type="text"
                    value={ex1Inputs[10] || ''}
                    placeholder="say"
                    onChange={(e) => setEx1Inputs({ ...ex1Inputs, 10: e.target.value })}
                    className={`inline-block w-20 sm:w-24 px-2.5 py-1 rounded-xl text-center font-bold text-sm border mx-1 transition-all ${
                      ex1Revealed
                        ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300'
                        : ex1Checked
                        ? TOM_STORY_BLANKS[9].acceptableAnswers.some(
                            (a) => normalize(a) === normalize(ex1Inputs[10])
                          )
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
                          : 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300'
                        : 'border-slate-300 dark:border-white/20 bg-white dark:bg-slate-900'
                    }`}
                  />
                  {ex1Revealed && (
                    <span className="text-xs text-sky-600 font-mono font-bold mr-1">
                      [said]
                    </span>
                  )}
                  , "You're two hours late!"
                </div>
              )}
            </div>

            {/* Paragraph 3 */}
            <div className="p-5 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-slate-800/40">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-inherit/20">
                <span className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider">
                  Párrafo 3 · La Llamada de Mamá
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => toggleFlip('p3', setFlippedStoryP)}
                    className="text-xs font-semibold px-2 py-1 rounded-lg bg-sky-100 dark:bg-sky-900/50 text-sky-700 dark:text-sky-300 hover:bg-sky-200 cursor-pointer"
                  >
                    {flippedStoryP['p3'] ? 'Ver Inglés' : 'Ver Traducción'}
                  </button>
                  <CardSpeechControl
                    textToSpeak="Tom tried to explain, but his phone started ringing. It was his mother. She called to tell him that today was Sunday!"
                    accent={accent}
                    initialSpeed={speechRate}
                    size="sm"
                  />
                </div>
              </div>

              {flippedStoryP['p3'] ? (
                <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 italic">
                  {TOM_STORY_PARAGRAPHS[2].textEs}
                </p>
              ) : (
                <div className="text-sm sm:text-base leading-loose font-medium">
                  Tom (11){' '}
                  <input
                    type="text"
                    value={ex1Inputs[11] || ''}
                    placeholder="try"
                    onChange={(e) => setEx1Inputs({ ...ex1Inputs, 11: e.target.value })}
                    className={`inline-block w-20 sm:w-24 px-2.5 py-1 rounded-xl text-center font-bold text-sm border mx-1 transition-all ${
                      ex1Revealed
                        ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300'
                        : ex1Checked
                        ? TOM_STORY_BLANKS[10].acceptableAnswers.some(
                            (a) => normalize(a) === normalize(ex1Inputs[11])
                          )
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
                          : 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300'
                        : 'border-slate-300 dark:border-white/20 bg-white dark:bg-slate-900'
                    }`}
                  />
                  {ex1Revealed && (
                    <span className="text-xs text-sky-600 font-mono font-bold mr-1">
                      [tried]
                    </span>
                  )}
                  to explain, but his phone (12){' '}
                  <input
                    type="text"
                    value={ex1Inputs[12] || ''}
                    placeholder="start"
                    onChange={(e) => setEx1Inputs({ ...ex1Inputs, 12: e.target.value })}
                    className={`inline-block w-24 sm:w-28 px-2.5 py-1 rounded-xl text-center font-bold text-sm border mx-1 transition-all ${
                      ex1Revealed
                        ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300'
                        : ex1Checked
                        ? TOM_STORY_BLANKS[11].acceptableAnswers.some(
                            (a) => normalize(a) === normalize(ex1Inputs[12])
                          )
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
                          : 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300'
                        : 'border-slate-300 dark:border-white/20 bg-white dark:bg-slate-900'
                    }`}
                  />
                  {ex1Revealed && (
                    <span className="text-xs text-sky-600 font-mono font-bold mr-1">
                      [started]
                    </span>
                  )}
                  ringing. It was his mother. She (13){' '}
                  <input
                    type="text"
                    value={ex1Inputs[13] || ''}
                    placeholder="call"
                    onChange={(e) => setEx1Inputs({ ...ex1Inputs, 13: e.target.value })}
                    className={`inline-block w-24 sm:w-28 px-2.5 py-1 rounded-xl text-center font-bold text-sm border mx-1 transition-all ${
                      ex1Revealed
                        ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300'
                        : ex1Checked
                        ? TOM_STORY_BLANKS[12].acceptableAnswers.some(
                            (a) => normalize(a) === normalize(ex1Inputs[13])
                          )
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
                          : 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300'
                        : 'border-slate-300 dark:border-white/20 bg-white dark:bg-slate-900'
                    }`}
                  />
                  {ex1Revealed && (
                    <span className="text-xs text-sky-600 font-mono font-bold mr-1">
                      [called]
                    </span>
                  )}
                  to tell him that today was Sunday!
                </div>
              )}
            </div>

            {/* Paragraph 4 */}
            <div className="p-5 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-slate-800/40">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-inherit/20">
                <span className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider">
                  Párrafo 4 · La Sorpresa Final
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => toggleFlip('p4', setFlippedStoryP)}
                    className="text-xs font-semibold px-2 py-1 rounded-lg bg-sky-100 dark:bg-sky-900/50 text-sky-700 dark:text-sky-300 hover:bg-sky-200 cursor-pointer"
                  >
                    {flippedStoryP['p4'] ? 'Ver Inglés' : 'Ver Traducción'}
                  </button>
                  <CardSpeechControl
                    textToSpeak="Tom didn't say a word. He went home and slept for another three hours."
                    accent={accent}
                    initialSpeed={speechRate}
                    size="sm"
                  />
                </div>
              </div>

              {flippedStoryP['p4'] ? (
                <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 italic">
                  {TOM_STORY_PARAGRAPHS[3].textEs}
                </p>
              ) : (
                <div className="text-sm sm:text-base leading-loose font-medium">
                  Tom (14){' '}
                  <input
                    type="text"
                    value={ex1Inputs[14] || ''}
                    placeholder="not / say"
                    onChange={(e) => setEx1Inputs({ ...ex1Inputs, 14: e.target.value })}
                    className={`inline-block w-32 sm:w-36 px-2.5 py-1 rounded-xl text-center font-bold text-sm border mx-1 transition-all ${
                      ex1Revealed
                        ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300'
                        : ex1Checked
                        ? TOM_STORY_BLANKS[13].acceptableAnswers.some(
                            (a) => normalize(a) === normalize(ex1Inputs[14])
                          )
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
                          : 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300'
                        : 'border-slate-300 dark:border-white/20 bg-white dark:bg-slate-900'
                    }`}
                  />
                  {ex1Revealed && (
                    <span className="text-xs text-sky-600 font-mono font-bold mr-1">
                      [didn't say]
                    </span>
                  )}
                  a word. He (15){' '}
                  <input
                    type="text"
                    value={ex1Inputs[15] || ''}
                    placeholder="go"
                    onChange={(e) => setEx1Inputs({ ...ex1Inputs, 15: e.target.value })}
                    className={`inline-block w-20 sm:w-24 px-2.5 py-1 rounded-xl text-center font-bold text-sm border mx-1 transition-all ${
                      ex1Revealed
                        ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300'
                        : ex1Checked
                        ? TOM_STORY_BLANKS[14].acceptableAnswers.some(
                            (a) => normalize(a) === normalize(ex1Inputs[15])
                          )
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
                          : 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300'
                        : 'border-slate-300 dark:border-white/20 bg-white dark:bg-slate-900'
                    }`}
                  />
                  {ex1Revealed && (
                    <span className="text-xs text-sky-600 font-mono font-bold mr-1">
                      [went]
                    </span>
                  )}
                  home and (16){' '}
                  <input
                    type="text"
                    value={ex1Inputs[16] || ''}
                    placeholder="sleep"
                    onChange={(e) => setEx1Inputs({ ...ex1Inputs, 16: e.target.value })}
                    className={`inline-block w-20 sm:w-24 px-2.5 py-1 rounded-xl text-center font-bold text-sm border mx-1 transition-all ${
                      ex1Revealed
                        ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300'
                        : ex1Checked
                        ? TOM_STORY_BLANKS[15].acceptableAnswers.some(
                            (a) => normalize(a) === normalize(ex1Inputs[16])
                          )
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
                          : 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300'
                        : 'border-slate-300 dark:border-white/20 bg-white dark:bg-slate-900'
                    }`}
                  />
                  {ex1Revealed && (
                    <span className="text-xs text-sky-600 font-mono font-bold mr-1">
                      [slept]
                    </span>
                  )}
                  for another three hours.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 2: COMPLETE THE QUESTIONS AND ANSWERS (8 ITEMS) */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'ex2' && (
        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl border bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-white/10">
            <div>
              <h3 className="text-lg font-bold">2. QUESTIONS AND ANSWERS: THE ACTOR'S DISAPPEARANCE</h3>
              <p className="text-sm opacity-80 mt-0.5">
                A famous actor disappeared during a party. Complete each question with Did and the correct form of the verb. Then complete the answer using the information in brackets.
              </p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <button
                type="button"
                onClick={() => {
                  playFeedbackSound('click');
                  setEx2Checked(true);
                  playFeedbackSound('complete');
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-sky-600 hover:bg-sky-500 text-white transition-all cursor-pointer shadow-xs flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>Comprobar</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  playFeedbackSound('click');
                  setEx2Revealed((prev) => !prev);
                }}
                className="px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-all cursor-pointer flex items-center gap-1.5"
              >
                {ex2Revealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                <span>{ex2Revealed ? 'Ocultar' : 'Respuestas'}</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  playFeedbackSound('click');
                  setEx2Inputs({});
                  setEx2Checked(false);
                  setEx2Revealed(false);
                }}
                className="p-2 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-all cursor-pointer"
                title="Reiniciar"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ACTOR_QUESTIONS_DATA.map((item) => {
              const isFlipped = !!flippedActorQ[item.id];
              const q1Val = ex2Inputs[`${item.id}_q1`] || '';
              const q2Val = ex2Inputs[`${item.id}_q2`] || '';
              const a1Val = ex2Inputs[`${item.id}_a1`] || '';
              const a2Val = ex2Inputs[`${item.id}_a2`] || '';

              const q1Ok = normalize(q1Val) === normalize(item.expectedQ1);
              const q2Ok = normalize(q2Val) === normalize(item.expectedQ2);
              const a1Ok = normalize(a1Val) === normalize(item.expectedA1);
              const a2Ok = item.expectedA2 ? normalize(a2Val) === normalize(item.expectedA2) : true;

              return (
                <div
                  key={item.id}
                  className={`p-5 rounded-3xl border shadow-xs transition-all flex flex-col justify-between ${
                    isDark ? 'bg-slate-900 border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'
                  }`}
                >
                  <div>
                    {/* Header: Number, audio and flip toggle */}
                    <div className="flex items-center justify-between gap-3 mb-3 pb-2 border-b border-inherit/20">
                      <span className="w-7 h-7 rounded-lg bg-sky-500/15 border border-sky-500/30 text-sky-600 dark:text-sky-400 font-bold text-xs flex items-center justify-center font-mono">
                        {item.number}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => toggleFlip(item.id, setFlippedActorQ)}
                          className="text-xs px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 cursor-pointer"
                        >
                          {isFlipped ? 'Inglés ↻' : 'Español ↻'}
                        </button>
                        <CardSpeechControl
                          textToSpeak={item.fullEn}
                          accent={accent}
                          initialSpeed={speechRate}
                          size="sm"
                        />
                      </div>
                    </div>

                    {isFlipped ? (
                      <div className="space-y-2 py-2">
                        <p className="text-sm font-semibold text-sky-700 dark:text-sky-300">
                          {item.fullEs}
                        </p>
                        <p className="text-xs opacity-75 italic">{item.explanationEs}</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {/* Question line with inputs */}
                        <div className="text-sm leading-relaxed">
                          <span className="font-bold text-slate-400 mr-1">Q:</span>
                          {item.questionPrefix}
                          <input
                            type="text"
                            placeholder="Did / did"
                            value={q1Val}
                            onChange={(e) =>
                              setEx2Inputs({ ...ex2Inputs, [`${item.id}_q1`]: e.target.value })
                            }
                            className={`inline-block w-20 px-2 py-1 rounded-xl text-center text-xs font-bold border mx-1 ${
                              ex2Revealed
                                ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300'
                                : ex2Checked
                                ? q1Ok
                                  ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
                                  : 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300'
                                : 'border-slate-300 dark:border-white/20 bg-slate-50 dark:bg-slate-800'
                            }`}
                          />
                          {item.questionMid}
                          <input
                            type="text"
                            placeholder={`(${item.verbPrompt})`}
                            value={q2Val}
                            onChange={(e) =>
                              setEx2Inputs({ ...ex2Inputs, [`${item.id}_q2`]: e.target.value })
                            }
                            className={`inline-block w-24 px-2 py-1 rounded-xl text-center text-xs font-bold border mx-1 ${
                              ex2Revealed
                                ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300'
                                : ex2Checked
                                ? q2Ok
                                  ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
                                  : 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300'
                                : 'border-slate-300 dark:border-white/20 bg-slate-50 dark:bg-slate-800'
                            }`}
                          />
                          {item.questionSuffix}
                        </div>

                        {/* Answer line with inputs */}
                        <div className="text-sm leading-relaxed">
                          <span className="font-bold text-slate-400 mr-1">A:</span>
                          {item.answerPrefix}
                          <input
                            type="text"
                            placeholder="respuesta"
                            value={a1Val}
                            onChange={(e) =>
                              setEx2Inputs({ ...ex2Inputs, [`${item.id}_a1`]: e.target.value })
                            }
                            className={`inline-block w-24 px-2 py-1 rounded-xl text-center text-xs font-bold border mx-1 ${
                              ex2Revealed
                                ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300'
                                : ex2Checked
                                ? a1Ok
                                  ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
                                  : 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300'
                                : 'border-slate-300 dark:border-white/20 bg-slate-50 dark:bg-slate-800'
                            }`}
                          />
                          {item.answerMid}
                          {item.expectedA2 && (
                            <input
                              type="text"
                              placeholder="verbo"
                              value={a2Val}
                              onChange={(e) =>
                                setEx2Inputs({ ...ex2Inputs, [`${item.id}_a2`]: e.target.value })
                              }
                              className={`inline-block w-20 px-2 py-1 rounded-xl text-center text-xs font-bold border mx-1 ${
                                ex2Revealed
                                  ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300'
                                  : ex2Checked
                                  ? a2Ok
                                    ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
                                    : 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300'
                                  : 'border-slate-300 dark:border-white/20 bg-slate-50 dark:bg-slate-800'
                              }`}
                            />
                          )}
                          {item.answerSuffix}
                        </div>
                      </div>
                    )}
                  </div>

                  {ex2Revealed && (
                    <div className="mt-3 pt-2 border-t border-inherit/20 text-xs font-mono text-sky-600 dark:text-sky-400">
                      💡 {item.fullEn}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 3: CHOOSE THE CORRECT OPTION (8 ITEMS) */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'ex3' && (
        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl border bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-white/10">
            <div>
              <h3 className="text-lg font-bold">3. CHOOSE THE CORRECT OPTION</h3>
              <p className="text-sm opacity-80 mt-0.5">
                Select the correct past simple option for each situation. (8 preguntas)
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1.5 rounded-xl text-xs font-mono font-bold bg-sky-500/20 text-sky-600 dark:text-sky-400 border border-sky-500/30">
                Puntaje: {ex3Score} / {CHOOSE_OPTION_ITEMS.length}
              </span>
              <button
                type="button"
                onClick={() => {
                  playFeedbackSound('click');
                  setEx3Answers({});
                  setEx3Checked(false);
                }}
                className="p-2 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-all cursor-pointer"
                title="Reiniciar"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {CHOOSE_OPTION_ITEMS.map((item) => {
              const selected = ex3Answers[item.id];
              const isFlipped = !!flippedChoose[item.id];

              return (
                <div
                  key={item.id}
                  className={`p-5 rounded-3xl border shadow-xs transition-all flex flex-col justify-between ${
                    isDark ? 'bg-slate-900 border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'
                  }`}
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between gap-3 mb-3 pb-2 border-b border-inherit/20">
                      <span className="w-7 h-7 rounded-lg bg-sky-500/15 border border-sky-500/30 text-sky-600 dark:text-sky-400 font-bold text-xs flex items-center justify-center font-mono">
                        {item.number}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => toggleFlip(item.id, setFlippedChoose)}
                          className="text-xs px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 cursor-pointer"
                        >
                          {isFlipped ? 'Inglés ↻' : 'Español ↻'}
                        </button>
                        <CardSpeechControl
                          textToSpeak={item.fullSentenceEn}
                          accent={accent}
                          initialSpeed={speechRate}
                          size="sm"
                        />
                      </div>
                    </div>

                    {/* Sentence */}
                    <p className="text-sm sm:text-base font-semibold mb-4 leading-relaxed">
                      {isFlipped ? item.sentencePromptEs : item.sentencePromptEn}
                    </p>

                    {/* Options Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {item.options.map((opt) => {
                        const isChosen = selected === opt.key;
                        const isCorrect = opt.key === item.correctOption;

                        let btnStyle = isDark
                          ? 'bg-slate-800/70 border-white/10 hover:bg-slate-800 text-slate-200'
                          : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-800';

                        if (selected) {
                          if (isCorrect) {
                            btnStyle =
                              'bg-emerald-500/20 border-emerald-500 text-emerald-700 dark:text-emerald-300 font-bold';
                          } else if (isChosen && !isCorrect) {
                            btnStyle =
                              'bg-rose-500/20 border-rose-500 text-rose-700 dark:text-rose-300 line-through';
                          }
                        }

                        return (
                          <button
                            key={opt.key}
                            type="button"
                            onClick={() => {
                              if (opt.key === item.correctOption) {
                                playFeedbackSound('correct');
                              } else {
                                playFeedbackSound('wrong');
                              }
                              setEx3Answers((prev) => ({ ...prev, [item.id]: opt.key }));
                              setEx3Checked(true);
                            }}
                            className={`p-2.5 rounded-xl border text-xs sm:text-sm text-left transition-all cursor-pointer flex items-center justify-between ${btnStyle}`}
                          >
                            <span className="font-mono mr-2 font-bold opacity-60">
                              {opt.key})
                            </span>
                            <span className="flex-1 font-medium">{opt.text}</span>
                            {selected && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />}
                            {selected && isChosen && !isCorrect && <XCircle className="w-4 h-4 text-rose-500 shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Feedback explanation */}
                  {selected && (
                    <div className="mt-4 pt-3 border-t border-inherit/20 text-xs text-sky-700 dark:text-sky-300 flex items-start gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                      <span>{isFlipped ? item.explanationEs : item.explanationEn}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 4: COMPLETE THE SENTENCES (10 ITEMS) */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'ex4' && (
        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl border bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-white/10">
            <div>
              <h3 className="text-lg font-bold">4. COMPLETE THE SENTENCES</h3>
              <p className="text-sm opacity-80 mt-0.5">
                Use the correct affirmative, negative or interrogative form of the verbs in brackets. (10 oraciones)
              </p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <button
                type="button"
                onClick={() => {
                  playFeedbackSound('click');
                  setEx4Checked(true);
                  playFeedbackSound('complete');
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-sky-600 hover:bg-sky-500 text-white transition-all cursor-pointer shadow-xs flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>Comprobar</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  playFeedbackSound('click');
                  setEx4Revealed((prev) => !prev);
                }}
                className="px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-all cursor-pointer flex items-center gap-1.5"
              >
                {ex4Revealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                <span>{ex4Revealed ? 'Ocultar' : 'Respuestas'}</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  playFeedbackSound('click');
                  setEx4Inputs({});
                  setEx4Checked(false);
                  setEx4Revealed(false);
                }}
                className="p-2 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-all cursor-pointer"
                title="Reiniciar"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {COMPLETE_SENTENCES_DATA.map((item) => {
              const isFlipped = !!flippedSentences[item.id];
              const val1 = ex4Inputs[`${item.id}_1`] || '';
              const val2 = ex4Inputs[`${item.id}_2`] || '';

              const ok1 = item.acceptable1.some((a) => normalize(a) === normalize(val1));
              const ok2 = item.acceptable2.some((a) => normalize(a) === normalize(val2));

              return (
                <div
                  key={item.id}
                  className={`p-5 rounded-3xl border shadow-xs transition-all flex flex-col justify-between ${
                    isDark ? 'bg-slate-900 border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3 pb-2 border-b border-inherit/20">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-lg bg-sky-500/15 border border-sky-500/30 text-sky-600 dark:text-sky-400 font-bold text-xs flex items-center justify-center font-mono">
                        {item.number}
                      </span>
                      <span className="text-xs font-mono opacity-70">
                        {item.verbPrompt1} · {item.verbPrompt2}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => toggleFlip(item.id, setFlippedSentences)}
                        className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 cursor-pointer"
                      >
                        {isFlipped ? 'Inglés ↻' : 'Español ↻'}
                      </button>
                      <CardSpeechControl
                        textToSpeak={item.fullSentenceEn}
                        accent={accent}
                        initialSpeed={speechRate}
                        size="sm"
                      />
                    </div>
                  </div>

                  {isFlipped ? (
                    <div className="py-2 space-y-1">
                      <p className="text-sm sm:text-base font-semibold text-sky-700 dark:text-sky-300">
                        {item.fullSentenceEs}
                      </p>
                      <p className="text-xs opacity-75 italic">{item.explanationEs}</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <p className="text-sm sm:text-base leading-loose font-medium">
                        {item.sentencePrompt}
                      </p>

                      <div className="flex flex-wrap items-center gap-3 pt-2">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-sky-600 dark:text-sky-400 font-mono">1:</span>
                          <input
                            type="text"
                            placeholder={item.verbPrompt1}
                            value={val1}
                            onChange={(e) =>
                              setEx4Inputs({ ...ex4Inputs, [`${item.id}_1`]: e.target.value })
                            }
                            className={`w-36 px-2.5 py-1.5 rounded-xl text-center text-xs font-bold border ${
                              ex4Revealed
                                ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300'
                                : ex4Checked
                                ? ok1
                                  ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
                                  : 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300'
                                : 'border-slate-300 dark:border-white/20 bg-slate-50 dark:bg-slate-800'
                            }`}
                          />
                        </div>

                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-sky-600 dark:text-sky-400 font-mono">2:</span>
                          <input
                            type="text"
                            placeholder={item.verbPrompt2}
                            value={val2}
                            onChange={(e) =>
                              setEx4Inputs({ ...ex4Inputs, [`${item.id}_2`]: e.target.value })
                            }
                            className={`w-36 px-2.5 py-1.5 rounded-xl text-center text-xs font-bold border ${
                              ex4Revealed
                                ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300'
                                : ex4Checked
                                ? ok2
                                  ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
                                  : 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300'
                                : 'border-slate-300 dark:border-white/20 bg-slate-50 dark:bg-slate-800'
                            }`}
                          />
                        </div>

                        {ex4Revealed && (
                          <span className="text-xs font-mono text-sky-600 dark:text-sky-400">
                            [{item.expected1}] / [{item.expected2}]
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 5: CORRECT THE MISTAKES (10 ITEMS) */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'ex5' && (
        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl border bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-white/10">
            <div>
              <h3 className="text-lg font-bold">5. CORRECT THE MISTAKES</h3>
              <p className="text-sm opacity-80 mt-0.5">
                Each sentence contains one mistake. Rewrite it correctly. (10 oraciones)
              </p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <button
                type="button"
                onClick={() => {
                  playFeedbackSound('click');
                  const newChecked: Record<string, boolean> = {};
                  CORRECT_MISTAKES_DATA.forEach((item) => {
                    const input = ex5Inputs[item.id] || '';
                    newChecked[item.id] = item.acceptableAnswers.some(
                      (ans) => normalize(ans) === normalize(input)
                    );
                  });
                  setEx5Checked(newChecked);
                  playFeedbackSound('complete');
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-sky-600 hover:bg-sky-500 text-white transition-all cursor-pointer shadow-xs flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>Comprobar</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  playFeedbackSound('click');
                  setEx5Inputs({});
                  setEx5Checked({});
                  setEx5Revealed({});
                }}
                className="p-2 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-all cursor-pointer"
                title="Reiniciar"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CORRECT_MISTAKES_DATA.map((item) => {
              const isFlipped = !!flippedMistakes[item.id];
              const isRevealed = !!ex5Revealed[item.id];
              const isChecked = ex5Checked[item.id] !== undefined;
              const isCorrect = !!ex5Checked[item.id];
              const currentInput = ex5Inputs[item.id] || '';

              return (
                <div
                  key={item.id}
                  className={`p-5 rounded-3xl border shadow-xs transition-all flex flex-col justify-between ${
                    isDark ? 'bg-slate-900 border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'
                  }`}
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between gap-3 mb-3 pb-2 border-b border-inherit/20">
                      <span className="w-7 h-7 rounded-lg bg-sky-500/15 border border-sky-500/30 text-sky-600 dark:text-sky-400 font-bold text-xs flex items-center justify-center font-mono">
                        {item.number}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => toggleFlip(item.id, setFlippedMistakes)}
                          className="text-xs px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 cursor-pointer"
                        >
                          {isFlipped ? 'Inglés ↻' : 'Español ↻'}
                        </button>
                        <CardSpeechControl
                          textToSpeak={item.correctSentenceEn}
                          accent={accent}
                          initialSpeed={speechRate}
                          size="sm"
                        />
                      </div>
                    </div>

                    {/* Sentence with mistake highlighted */}
                    <div className="mb-3">
                      <p className="text-xs font-mono font-bold uppercase text-rose-500 dark:text-rose-400 mb-1 flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>Oración con error:</span>
                      </p>
                      <p className="text-sm font-semibold line-through decoration-rose-500 decoration-2 opacity-90">
                        {item.incorrectSentenceEn}
                      </p>
                      {isFlipped && (
                        <p className="text-xs italic opacity-75 mt-1">{item.incorrectSentenceEs}</p>
                      )}
                    </div>

                    {/* User correction input */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-sky-600 dark:text-sky-400 block">
                        Reescribe correctamente:
                      </label>
                      <input
                        type="text"
                        value={currentInput}
                        placeholder={item.correctSentenceEn}
                        onChange={(e) =>
                          setEx5Inputs({ ...ex5Inputs, [item.id]: e.target.value })
                        }
                        className={`w-full px-3 py-2 rounded-xl text-xs sm:text-sm font-medium border transition-all ${
                          isRevealed
                            ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/60 text-sky-800 dark:text-sky-200'
                            : isChecked
                            ? isCorrect
                              ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200'
                              : 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-200'
                            : 'border-slate-300 dark:border-white/20 bg-slate-50 dark:bg-slate-800'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Actions & Feedback */}
                  <div className="mt-4 pt-3 border-t border-inherit/20 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setEx5Revealed((prev) => ({ ...prev, [item.id]: !prev[item.id] }))
                      }
                      className="text-xs text-sky-600 dark:text-sky-400 hover:underline font-mono cursor-pointer"
                    >
                      {isRevealed ? 'Ocultar solución' : 'Ver solución'}
                    </button>
                    {isRevealed && (
                      <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                        {item.correctSentenceEn}
                      </span>
                    )}
                  </div>

                  {(isRevealed || isChecked) && (
                    <div className="mt-2 text-xs opacity-75 italic text-slate-600 dark:text-slate-400">
                      💡 {isFlipped ? item.explanationEs : item.explanationEn}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 6: COMPLETE THE TEXT (EMMA'S DAY - 16 BLANKS) */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'ex6' && (
        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl border bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-white/10">
            <div>
              <h3 className="text-lg font-bold">6. COMPLETE THE TEXT: EMMA'S DAY</h3>
              <p className="text-sm opacity-80 mt-0.5">
                Use the correct form of the verbs in brackets. Pay attention to affirmative and negative sentences, questions, and regular and irregular verbs.
              </p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <button
                type="button"
                onClick={() => {
                  playFeedbackSound('click');
                  setEx6Checked(true);
                  playFeedbackSound('complete');
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-sky-600 hover:bg-sky-500 text-white transition-all cursor-pointer shadow-xs flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>Comprobar</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  playFeedbackSound('click');
                  setEx6Revealed((prev) => !prev);
                }}
                className="px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-all cursor-pointer flex items-center gap-1.5"
              >
                {ex6Revealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                <span>{ex6Revealed ? 'Ocultar' : 'Respuestas'}</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  playFeedbackSound('click');
                  setEx6Inputs({});
                  setEx6Checked(false);
                  setEx6Revealed(false);
                }}
                className="p-2 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-all cursor-pointer"
                title="Reiniciar"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div
            className={`p-6 rounded-3xl border shadow-xs space-y-6 ${
              isDark ? 'bg-slate-900 border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            {/* Paragraph 1 */}
            <div className="p-5 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-slate-800/40">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-inherit/20">
                <span className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider">
                  Parte 1 · El Autobús Equivocado
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => toggleFlip('ep1', setFlippedEmmaP)}
                    className="text-xs font-semibold px-2 py-1 rounded-lg bg-sky-100 dark:bg-sky-900/50 text-sky-700 dark:text-sky-300 hover:bg-sky-200 cursor-pointer"
                  >
                    {flippedEmmaP['ep1'] ? 'Ver Inglés' : 'Ver Traducción'}
                  </button>
                  <CardSpeechControl
                    textToSpeak="Last Friday, Emma finished work early and decided to visit a new shopping centre. She took the wrong bus and got off in a neighbourhood she didn't know."
                    accent={accent}
                    initialSpeed={speechRate}
                    size="sm"
                  />
                </div>
              </div>

              {flippedEmmaP['ep1'] ? (
                <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 italic">
                  {EMMA_STORY_PARAGRAPHS[0].textEs}
                </p>
              ) : (
                <div className="text-sm sm:text-base leading-loose font-medium">
                  Last Friday, Emma (1){' '}
                  <input
                    type="text"
                    value={ex6Inputs[1] || ''}
                    placeholder="finish"
                    onChange={(e) => setEx6Inputs({ ...ex6Inputs, 1: e.target.value })}
                    className={`inline-block w-28 sm:w-32 px-2.5 py-1 rounded-xl text-center font-bold text-sm border mx-1 transition-all ${
                      ex6Revealed
                        ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300'
                        : ex6Checked
                        ? EMMA_STORY_BLANKS[0].acceptableAnswers.some(
                            (a) => normalize(a) === normalize(ex6Inputs[1])
                          )
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
                          : 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300'
                        : 'border-slate-300 dark:border-white/20 bg-white dark:bg-slate-900'
                    }`}
                  />
                  {ex6Revealed && (
                    <span className="text-xs text-sky-600 font-mono font-bold mr-1">
                      [finished]
                    </span>
                  )}
                  work early and (2){' '}
                  <input
                    type="text"
                    value={ex6Inputs[2] || ''}
                    placeholder="decide"
                    onChange={(e) => setEx6Inputs({ ...ex6Inputs, 2: e.target.value })}
                    className={`inline-block w-28 sm:w-32 px-2.5 py-1 rounded-xl text-center font-bold text-sm border mx-1 transition-all ${
                      ex6Revealed
                        ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300'
                        : ex6Checked
                        ? EMMA_STORY_BLANKS[1].acceptableAnswers.some(
                            (a) => normalize(a) === normalize(ex6Inputs[2])
                          )
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
                          : 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300'
                        : 'border-slate-300 dark:border-white/20 bg-white dark:bg-slate-900'
                    }`}
                  />
                  {ex6Revealed && (
                    <span className="text-xs text-sky-600 font-mono font-bold mr-1">
                      [decided]
                    </span>
                  )}
                  to visit a new shopping centre. She (3){' '}
                  <input
                    type="text"
                    value={ex6Inputs[3] || ''}
                    placeholder="take"
                    onChange={(e) => setEx6Inputs({ ...ex6Inputs, 3: e.target.value })}
                    className={`inline-block w-24 sm:w-28 px-2.5 py-1 rounded-xl text-center font-bold text-sm border mx-1 transition-all ${
                      ex6Revealed
                        ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300'
                        : ex6Checked
                        ? EMMA_STORY_BLANKS[2].acceptableAnswers.some(
                            (a) => normalize(a) === normalize(ex6Inputs[3])
                          )
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
                          : 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300'
                        : 'border-slate-300 dark:border-white/20 bg-white dark:bg-slate-900'
                    }`}
                  />
                  {ex6Revealed && (
                    <span className="text-xs text-sky-600 font-mono font-bold mr-1">
                      [took]
                    </span>
                  )}
                  the wrong bus and (4){' '}
                  <input
                    type="text"
                    value={ex6Inputs[4] || ''}
                    placeholder="get"
                    onChange={(e) => setEx6Inputs({ ...ex6Inputs, 4: e.target.value })}
                    className={`inline-block w-20 sm:w-24 px-2.5 py-1 rounded-xl text-center font-bold text-sm border mx-1 transition-all ${
                      ex6Revealed
                        ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300'
                        : ex6Checked
                        ? EMMA_STORY_BLANKS[3].acceptableAnswers.some(
                            (a) => normalize(a) === normalize(ex6Inputs[4])
                          )
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
                          : 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300'
                        : 'border-slate-300 dark:border-white/20 bg-white dark:bg-slate-900'
                    }`}
                  />
                  {ex6Revealed && (
                    <span className="text-xs text-sky-600 font-mono font-bold mr-1">
                      [got]
                    </span>
                  )}
                  off in a neighbourhood she (5){' '}
                  <input
                    type="text"
                    value={ex6Inputs[5] || ''}
                    placeholder="not / know"
                    onChange={(e) => setEx6Inputs({ ...ex6Inputs, 5: e.target.value })}
                    className={`inline-block w-32 sm:w-36 px-2.5 py-1 rounded-xl text-center font-bold text-sm border mx-1 transition-all ${
                      ex6Revealed
                        ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300'
                        : ex6Checked
                        ? EMMA_STORY_BLANKS[4].acceptableAnswers.some(
                            (a) => normalize(a) === normalize(ex6Inputs[5])
                          )
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
                          : 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300'
                        : 'border-slate-300 dark:border-white/20 bg-white dark:bg-slate-900'
                    }`}
                  />
                  {ex6Revealed && (
                    <span className="text-xs text-sky-600 font-mono font-bold mr-1">
                      [didn't know]
                    </span>
                  )}
                  .
                </div>
              )}
            </div>

            {/* Paragraph 2 */}
            <div className="p-5 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-slate-800/40">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-inherit/20">
                <span className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider">
                  Parte 2 · El Café
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => toggleFlip('ep2', setFlippedEmmaP)}
                    className="text-xs font-semibold px-2 py-1 rounded-lg bg-sky-100 dark:bg-sky-900/50 text-sky-700 dark:text-sky-300 hover:bg-sky-200 cursor-pointer"
                  >
                    {flippedEmmaP['ep2'] ? 'Ver Inglés' : 'Ver Traducción'}
                  </button>
                  <CardSpeechControl
                    textToSpeak="She asked a man for directions, but he gave her the wrong information. After walking for twenty minutes, she found a small café and ordered a sandwich."
                    accent={accent}
                    initialSpeed={speechRate}
                    size="sm"
                  />
                </div>
              </div>

              {flippedEmmaP['ep2'] ? (
                <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 italic">
                  {EMMA_STORY_PARAGRAPHS[1].textEs}
                </p>
              ) : (
                <div className="text-sm sm:text-base leading-loose font-medium">
                  She (6){' '}
                  <input
                    type="text"
                    value={ex6Inputs[6] || ''}
                    placeholder="ask"
                    onChange={(e) => setEx6Inputs({ ...ex6Inputs, 6: e.target.value })}
                    className={`inline-block w-24 sm:w-28 px-2.5 py-1 rounded-xl text-center font-bold text-sm border mx-1 transition-all ${
                      ex6Revealed
                        ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300'
                        : ex6Checked
                        ? EMMA_STORY_BLANKS[5].acceptableAnswers.some(
                            (a) => normalize(a) === normalize(ex6Inputs[6])
                          )
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
                          : 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300'
                        : 'border-slate-300 dark:border-white/20 bg-white dark:bg-slate-900'
                    }`}
                  />
                  {ex6Revealed && (
                    <span className="text-xs text-sky-600 font-mono font-bold mr-1">
                      [asked]
                    </span>
                  )}
                  a man for directions, but he (7){' '}
                  <input
                    type="text"
                    value={ex6Inputs[7] || ''}
                    placeholder="give"
                    onChange={(e) => setEx6Inputs({ ...ex6Inputs, 7: e.target.value })}
                    className={`inline-block w-24 sm:w-28 px-2.5 py-1 rounded-xl text-center font-bold text-sm border mx-1 transition-all ${
                      ex6Revealed
                        ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300'
                        : ex6Checked
                        ? EMMA_STORY_BLANKS[6].acceptableAnswers.some(
                            (a) => normalize(a) === normalize(ex6Inputs[7])
                          )
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
                          : 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300'
                        : 'border-slate-300 dark:border-white/20 bg-white dark:bg-slate-900'
                    }`}
                  />
                  {ex6Revealed && (
                    <span className="text-xs text-sky-600 font-mono font-bold mr-1">
                      [gave]
                    </span>
                  )}
                  her the wrong information. After walking for twenty minutes, she (8){' '}
                  <input
                    type="text"
                    value={ex6Inputs[8] || ''}
                    placeholder="find"
                    onChange={(e) => setEx6Inputs({ ...ex6Inputs, 8: e.target.value })}
                    className={`inline-block w-24 sm:w-28 px-2.5 py-1 rounded-xl text-center font-bold text-sm border mx-1 transition-all ${
                      ex6Revealed
                        ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300'
                        : ex6Checked
                        ? EMMA_STORY_BLANKS[7].acceptableAnswers.some(
                            (a) => normalize(a) === normalize(ex6Inputs[8])
                          )
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
                          : 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300'
                        : 'border-slate-300 dark:border-white/20 bg-white dark:bg-slate-900'
                    }`}
                  />
                  {ex6Revealed && (
                    <span className="text-xs text-sky-600 font-mono font-bold mr-1">
                      [found]
                    </span>
                  )}
                  a small café and (9){' '}
                  <input
                    type="text"
                    value={ex6Inputs[9] || ''}
                    placeholder="order"
                    onChange={(e) => setEx6Inputs({ ...ex6Inputs, 9: e.target.value })}
                    className={`inline-block w-24 sm:w-28 px-2.5 py-1 rounded-xl text-center font-bold text-sm border mx-1 transition-all ${
                      ex6Revealed
                        ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300'
                        : ex6Checked
                        ? EMMA_STORY_BLANKS[8].acceptableAnswers.some(
                            (a) => normalize(a) === normalize(ex6Inputs[9])
                          )
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
                          : 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300'
                        : 'border-slate-300 dark:border-white/20 bg-white dark:bg-slate-900'
                    }`}
                  />
                  {ex6Revealed && (
                    <span className="text-xs text-sky-600 font-mono font-bold mr-1">
                      [ordered]
                    </span>
                  )}
                  a sandwich.
                </div>
              )}
            </div>

            {/* Paragraph 3 */}
            <div className="p-5 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-slate-800/40">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-inherit/20">
                <span className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider">
                  Parte 3 · El Rostro Familiar
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => toggleFlip('ep3', setFlippedEmmaP)}
                    className="text-xs font-semibold px-2 py-1 rounded-lg bg-sky-100 dark:bg-sky-900/50 text-sky-700 dark:text-sky-300 hover:bg-sky-200 cursor-pointer"
                  >
                    {flippedEmmaP['ep3'] ? 'Ver Inglés' : 'Ver Traducción'}
                  </button>
                  <CardSpeechControl
                    textToSpeak="While she was eating, she saw a familiar face. It was her old English teacher! They talked for half an hour. Emma didn't remember his surname, so she asked him."
                    accent={accent}
                    initialSpeed={speechRate}
                    size="sm"
                  />
                </div>
              </div>

              {flippedEmmaP['ep3'] ? (
                <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 italic">
                  {EMMA_STORY_PARAGRAPHS[2].textEs}
                </p>
              ) : (
                <div className="text-sm sm:text-base leading-loose font-medium">
                  While she was eating, she (10){' '}
                  <input
                    type="text"
                    value={ex6Inputs[10] || ''}
                    placeholder="see"
                    onChange={(e) => setEx6Inputs({ ...ex6Inputs, 10: e.target.value })}
                    className={`inline-block w-20 sm:w-24 px-2.5 py-1 rounded-xl text-center font-bold text-sm border mx-1 transition-all ${
                      ex6Revealed
                        ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300'
                        : ex6Checked
                        ? EMMA_STORY_BLANKS[9].acceptableAnswers.some(
                            (a) => normalize(a) === normalize(ex6Inputs[10])
                          )
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
                          : 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300'
                        : 'border-slate-300 dark:border-white/20 bg-white dark:bg-slate-900'
                    }`}
                  />
                  {ex6Revealed && (
                    <span className="text-xs text-sky-600 font-mono font-bold mr-1">
                      [saw]
                    </span>
                  )}
                  a familiar face. It was her old English teacher! They (11){' '}
                  <input
                    type="text"
                    value={ex6Inputs[11] || ''}
                    placeholder="talk"
                    onChange={(e) => setEx6Inputs({ ...ex6Inputs, 11: e.target.value })}
                    className={`inline-block w-24 sm:w-28 px-2.5 py-1 rounded-xl text-center font-bold text-sm border mx-1 transition-all ${
                      ex6Revealed
                        ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300'
                        : ex6Checked
                        ? EMMA_STORY_BLANKS[10].acceptableAnswers.some(
                            (a) => normalize(a) === normalize(ex6Inputs[11])
                          )
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
                          : 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300'
                        : 'border-slate-300 dark:border-white/20 bg-white dark:bg-slate-900'
                    }`}
                  />
                  {ex6Revealed && (
                    <span className="text-xs text-sky-600 font-mono font-bold mr-1">
                      [talked]
                    </span>
                  )}
                  for half an hour. Emma (12){' '}
                  <input
                    type="text"
                    value={ex6Inputs[12] || ''}
                    placeholder="not / remember"
                    onChange={(e) => setEx6Inputs({ ...ex6Inputs, 12: e.target.value })}
                    className={`inline-block w-36 sm:w-40 px-2.5 py-1 rounded-xl text-center font-bold text-sm border mx-1 transition-all ${
                      ex6Revealed
                        ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300'
                        : ex6Checked
                        ? EMMA_STORY_BLANKS[11].acceptableAnswers.some(
                            (a) => normalize(a) === normalize(ex6Inputs[12])
                          )
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
                          : 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300'
                        : 'border-slate-300 dark:border-white/20 bg-white dark:bg-slate-900'
                    }`}
                  />
                  {ex6Revealed && (
                    <span className="text-xs text-sky-600 font-mono font-bold mr-1">
                      [didn't remember]
                    </span>
                  )}
                  his surname, so she (13){' '}
                  <input
                    type="text"
                    value={ex6Inputs[13] || ''}
                    placeholder="ask"
                    onChange={(e) => setEx6Inputs({ ...ex6Inputs, 13: e.target.value })}
                    className={`inline-block w-24 sm:w-28 px-2.5 py-1 rounded-xl text-center font-bold text-sm border mx-1 transition-all ${
                      ex6Revealed
                        ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300'
                        : ex6Checked
                        ? EMMA_STORY_BLANKS[12].acceptableAnswers.some(
                            (a) => normalize(a) === normalize(ex6Inputs[13])
                          )
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
                          : 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300'
                        : 'border-slate-300 dark:border-white/20 bg-white dark:bg-slate-900'
                    }`}
                  />
                  {ex6Revealed && (
                    <span className="text-xs text-sky-600 font-mono font-bold mr-1">
                      [asked]
                    </span>
                  )}
                  him.
                </div>
              )}
            </div>

            {/* Paragraph 4 */}
            <div className="p-5 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-slate-800/40">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-inherit/20">
                <span className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider">
                  Parte 4 · El Reencuentro
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => toggleFlip('ep4', setFlippedEmmaP)}
                    className="text-xs font-semibold px-2 py-1 rounded-lg bg-sky-100 dark:bg-sky-900/50 text-sky-700 dark:text-sky-300 hover:bg-sky-200 cursor-pointer"
                  >
                    {flippedEmmaP['ep4'] ? 'Ver Inglés' : 'Ver Traducción'}
                  </button>
                  <CardSpeechControl
                    textToSpeak={`"Don't you remember me?" he said. "You sat in the front row in every class!" Emma laughed. She didn't expect to meet him there, but she enjoyed the unexpected reunion.`}
                    accent={accent}
                    initialSpeed={speechRate}
                    size="sm"
                  />
                </div>
              </div>

              {flippedEmmaP['ep4'] ? (
                <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 italic">
                  {EMMA_STORY_PARAGRAPHS[3].textEs}
                </p>
              ) : (
                <div className="text-sm sm:text-base leading-loose font-medium">
                  "Don't you remember me?" he said. "You (14){' '}
                  <input
                    type="text"
                    value={ex6Inputs[14] || ''}
                    placeholder="sit"
                    onChange={(e) => setEx6Inputs({ ...ex6Inputs, 14: e.target.value })}
                    className={`inline-block w-20 sm:w-24 px-2.5 py-1 rounded-xl text-center font-bold text-sm border mx-1 transition-all ${
                      ex6Revealed
                        ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300'
                        : ex6Checked
                        ? EMMA_STORY_BLANKS[13].acceptableAnswers.some(
                            (a) => normalize(a) === normalize(ex6Inputs[14])
                          )
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
                          : 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300'
                        : 'border-slate-300 dark:border-white/20 bg-white dark:bg-slate-900'
                    }`}
                  />
                  {ex6Revealed && (
                    <span className="text-xs text-sky-600 font-mono font-bold mr-1">
                      [sat]
                    </span>
                  )}
                  in the front row in every class!" Emma laughed. She (15){' '}
                  <input
                    type="text"
                    value={ex6Inputs[15] || ''}
                    placeholder="not / expect"
                    onChange={(e) => setEx6Inputs({ ...ex6Inputs, 15: e.target.value })}
                    className={`inline-block w-36 sm:w-40 px-2.5 py-1 rounded-xl text-center font-bold text-sm border mx-1 transition-all ${
                      ex6Revealed
                        ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300'
                        : ex6Checked
                        ? EMMA_STORY_BLANKS[14].acceptableAnswers.some(
                            (a) => normalize(a) === normalize(ex6Inputs[15])
                          )
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
                          : 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300'
                        : 'border-slate-300 dark:border-white/20 bg-white dark:bg-slate-900'
                    }`}
                  />
                  {ex6Revealed && (
                    <span className="text-xs text-sky-600 font-mono font-bold mr-1">
                      [didn't expect]
                    </span>
                  )}
                  to meet him there, but she (16){' '}
                  <input
                    type="text"
                    value={ex6Inputs[16] || ''}
                    placeholder="enjoy"
                    onChange={(e) => setEx6Inputs({ ...ex6Inputs, 16: e.target.value })}
                    className={`inline-block w-24 sm:w-28 px-2.5 py-1 rounded-xl text-center font-bold text-sm border mx-1 transition-all ${
                      ex6Revealed
                        ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300'
                        : ex6Checked
                        ? EMMA_STORY_BLANKS[15].acceptableAnswers.some(
                            (a) => normalize(a) === normalize(ex6Inputs[16])
                          )
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
                          : 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300'
                        : 'border-slate-300 dark:border-white/20 bg-white dark:bg-slate-900'
                    }`}
                  />
                  {ex6Revealed && (
                    <span className="text-xs text-sky-600 font-mono font-bold mr-1">
                      [enjoyed]
                    </span>
                  )}
                  the unexpected reunion.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 7: PAST SIMPLE VS PRESENT SIMPLE (12 ITEMS) */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'ex7' && (
        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl border bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-white/10">
            <div>
              <h3 className="text-lg font-bold">7. PAST SIMPLE VS PRESENT SIMPLE</h3>
              <p className="text-sm opacity-80 mt-0.5">
                Complete the sentences with the correct form of the verbs in brackets. Differentiate between regular habits (usually) and past actions (yesterday / last...). (12 oraciones)
              </p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <button
                type="button"
                onClick={() => {
                  playFeedbackSound('click');
                  setEx7Checked(true);
                  playFeedbackSound('complete');
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-sky-600 hover:bg-sky-500 text-white transition-all cursor-pointer shadow-xs flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>Comprobar</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  playFeedbackSound('click');
                  setEx7Revealed((prev) => !prev);
                }}
                className="px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-all cursor-pointer flex items-center gap-1.5"
              >
                {ex7Revealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                <span>{ex7Revealed ? 'Ocultar' : 'Respuestas'}</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  playFeedbackSound('click');
                  setEx7Inputs({});
                  setEx7Checked(false);
                  setEx7Revealed(false);
                }}
                className="p-2 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-all cursor-pointer"
                title="Reiniciar"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PAST_VS_PRESENT_DATA.map((item) => {
              const isFlipped = !!flippedPvp[item.id];
              const val1 = ex7Inputs[`${item.id}_1`] || '';
              const val2 = ex7Inputs[`${item.id}_2`] || '';

              const ok1 = item.acceptable1.some((a) => normalize(a) === normalize(val1));
              const ok2 = item.acceptable2.some((a) => normalize(a) === normalize(val2));

              return (
                <div
                  key={item.id}
                  className={`p-5 rounded-3xl border shadow-xs transition-all flex flex-col justify-between ${
                    isDark ? 'bg-slate-900 border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'
                  }`}
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between gap-3 mb-3 pb-2 border-b border-inherit/20">
                      <span className="w-7 h-7 rounded-lg bg-sky-500/15 border border-sky-500/30 text-sky-600 dark:text-sky-400 font-bold text-xs flex items-center justify-center font-mono">
                        {item.number}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => toggleFlip(item.id, setFlippedPvp)}
                          className="text-xs px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 cursor-pointer"
                        >
                          {isFlipped ? 'Inglés ↻' : 'Español ↻'}
                        </button>
                        <CardSpeechControl
                          textToSpeak={item.fullSentenceEn}
                          accent={accent}
                          initialSpeed={speechRate}
                          size="sm"
                        />
                      </div>
                    </div>

                    {isFlipped ? (
                      <div className="py-2 space-y-1">
                        <p className="text-sm font-semibold text-sky-700 dark:text-sky-300">
                          {item.fullSentenceEs}
                        </p>
                        <p className="text-xs opacity-75 italic">{item.explanationEs}</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <p className="text-xs sm:text-sm font-medium leading-relaxed">
                          {item.sentencePrompt}
                        </p>

                        <div className="flex flex-wrap items-center gap-2 pt-1">
                          <div className="flex items-center gap-1">
                            <span className="text-xs font-bold text-sky-600 dark:text-sky-400 font-mono">1:</span>
                            <input
                              type="text"
                              placeholder={item.verb1Prompt}
                              value={val1}
                              onChange={(e) =>
                                setEx7Inputs({ ...ex7Inputs, [`${item.id}_1`]: e.target.value })
                              }
                              className={`w-32 px-2 py-1 rounded-xl text-center text-xs font-bold border ${
                                ex7Revealed
                                  ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300'
                                  : ex7Checked
                                  ? ok1
                                    ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
                                    : 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300'
                                  : 'border-slate-300 dark:border-white/20 bg-slate-50 dark:bg-slate-800'
                              }`}
                            />
                          </div>

                          <div className="flex items-center gap-1">
                            <span className="text-xs font-bold text-sky-600 dark:text-sky-400 font-mono">2:</span>
                            <input
                              type="text"
                              placeholder={item.verb2Prompt}
                              value={val2}
                              onChange={(e) =>
                                setEx7Inputs({ ...ex7Inputs, [`${item.id}_2`]: e.target.value })
                              }
                              className={`w-32 px-2 py-1 rounded-xl text-center text-xs font-bold border ${
                                ex7Revealed
                                  ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300'
                                  : ex7Checked
                                  ? ok2
                                    ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
                                    : 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300'
                                  : 'border-slate-300 dark:border-white/20 bg-slate-50 dark:bg-slate-800'
                              }`}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {ex7Revealed && (
                    <div className="mt-3 pt-2 border-t border-inherit/20 text-xs font-mono text-sky-600 dark:text-sky-400">
                      💡 [{item.expected1}] / [{item.expected2}]
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 8: SOLUTIONS AND GRAMMAR GUIDE */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'answers' && (
        <div className="flex flex-col gap-6 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl border bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-white/10">
            <div>
              <h3 className="text-lg font-bold">GUÍA DE SOLUCIONES Y REGLAS</h3>
              <p className="text-sm opacity-80 mt-0.5">
                Consulta las respuestas completas y explicaciones pedagógicas de todos los ejercicios de la sección.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                playFeedbackSound('complete');
                onSuccess?.();
              }}
              className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-emerald-600 hover:bg-emerald-500 text-white transition-all cursor-pointer shadow-xs flex items-center gap-1.5"
            >
              <Trophy className="w-4 h-4" />
              <span>Marcar Sección Completada</span>
            </button>
          </div>

          {/* Section 1 Answers */}
          <div
            className={`p-6 rounded-3xl border shadow-xs space-y-4 ${
              isDark ? 'bg-slate-900 border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-inherit/20">
              <h4 className="font-bold text-base text-sky-600 dark:text-sky-400">
                1. Respuestas: Complete the Story (Tom's Day)
              </h4>
              <CardSpeechControl
                textToSpeak={TOM_STORY_PARAGRAPHS.map((p) => p.textEn).join(' ')}
                accent={accent}
                initialSpeed={speechRate}
                size="sm"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
              {TOM_STORY_BLANKS.map((b) => (
                <div
                  key={b.index}
                  className="p-3 rounded-xl border border-slate-200 dark:border-white/5 bg-slate-50/50 dark:bg-slate-800/40 text-xs"
                >
                  <p className="font-bold font-mono text-sky-600 dark:text-sky-400">
                    ({b.index}) {b.expectedAnswer}
                  </p>
                  <p className="opacity-75 mt-0.5">{b.explanationEs}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2 Answers */}
          <div
            className={`p-6 rounded-3xl border shadow-xs space-y-4 ${
              isDark ? 'bg-slate-900 border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <h4 className="font-bold text-base text-sky-600 dark:text-sky-400 pb-3 border-b border-inherit/20">
              2. Respuestas: Questions & Answers (The Actor's Disappearance)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ACTOR_QUESTIONS_DATA.map((item) => (
                <div
                  key={item.id}
                  className="p-3 rounded-xl border border-slate-200 dark:border-white/5 bg-slate-50/50 dark:bg-slate-800/40 text-xs"
                >
                  <p className="font-bold font-mono text-sky-600 dark:text-sky-400 mb-1">
                    {item.number}. {item.fullEn}
                  </p>
                  <p className="italic text-slate-600 dark:text-slate-300">{item.fullEs}</p>
                  <p className="opacity-75 mt-1">{item.explanationEs}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3 Answers */}
          <div
            className={`p-6 rounded-3xl border shadow-xs space-y-4 ${
              isDark ? 'bg-slate-900 border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <h4 className="font-bold text-base text-sky-600 dark:text-sky-400 pb-3 border-b border-inherit/20">
              3. Respuestas: Choose the Correct Option
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {CHOOSE_OPTION_ITEMS.map((item) => (
                <div
                  key={item.id}
                  className="p-3 rounded-xl border border-slate-200 dark:border-white/5 bg-slate-50/50 dark:bg-slate-800/40 text-xs"
                >
                  <p className="font-bold font-mono text-sky-600 dark:text-sky-400 mb-1">
                    {item.number}. Opción ({item.correctOption}): {item.fullSentenceEn}
                  </p>
                  <p className="italic text-slate-600 dark:text-slate-300">{item.fullSentenceEs}</p>
                  <p className="opacity-75 mt-1">{item.explanationEs}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4 Answers */}
          <div
            className={`p-6 rounded-3xl border shadow-xs space-y-4 ${
              isDark ? 'bg-slate-900 border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <h4 className="font-bold text-base text-sky-600 dark:text-sky-400 pb-3 border-b border-inherit/20">
              4. Respuestas: Complete the Sentences
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {COMPLETE_SENTENCES_DATA.map((item) => (
                <div
                  key={item.id}
                  className="p-3 rounded-xl border border-slate-200 dark:border-white/5 bg-slate-50/50 dark:bg-slate-800/40 text-xs"
                >
                  <p className="font-bold font-mono text-sky-600 dark:text-sky-400 mb-1">
                    {item.number}. {item.fullSentenceEn}
                  </p>
                  <p className="italic text-slate-600 dark:text-slate-300">{item.fullSentenceEs}</p>
                  <p className="opacity-75 mt-1">{item.explanationEs}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 5 Answers */}
          <div
            className={`p-6 rounded-3xl border shadow-xs space-y-4 ${
              isDark ? 'bg-slate-900 border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <h4 className="font-bold text-base text-sky-600 dark:text-sky-400 pb-3 border-b border-inherit/20">
              5. Respuestas: Correct the Mistakes
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {CORRECT_MISTAKES_DATA.map((item) => (
                <div
                  key={item.id}
                  className="p-3 rounded-xl border border-slate-200 dark:border-white/5 bg-slate-50/50 dark:bg-slate-800/40 text-xs"
                >
                  <p className="line-through text-rose-500 font-mono mb-0.5">
                    {item.number}. {item.incorrectSentenceEn}
                  </p>
                  <p className="font-bold font-mono text-emerald-600 dark:text-emerald-400 mb-1">
                    ✓ {item.correctSentenceEn}
                  </p>
                  <p className="opacity-75">{item.explanationEs}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 6 Answers */}
          <div
            className={`p-6 rounded-3xl border shadow-xs space-y-4 ${
              isDark ? 'bg-slate-900 border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-inherit/20">
              <h4 className="font-bold text-base text-sky-600 dark:text-sky-400">
                6. Respuestas: Complete the Text (Emma's Day)
              </h4>
              <CardSpeechControl
                textToSpeak={EMMA_STORY_PARAGRAPHS.map((p) => p.textEn).join(' ')}
                accent={accent}
                initialSpeed={speechRate}
                size="sm"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
              {EMMA_STORY_BLANKS.map((b) => (
                <div
                  key={b.index}
                  className="p-3 rounded-xl border border-slate-200 dark:border-white/5 bg-slate-50/50 dark:bg-slate-800/40 text-xs"
                >
                  <p className="font-bold font-mono text-sky-600 dark:text-sky-400">
                    ({b.index}) {b.expectedAnswer}
                  </p>
                  <p className="opacity-75 mt-0.5">{b.explanationEs}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 7 Answers */}
          <div
            className={`p-6 rounded-3xl border shadow-xs space-y-4 ${
              isDark ? 'bg-slate-900 border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <h4 className="font-bold text-base text-sky-600 dark:text-sky-400 pb-3 border-b border-inherit/20">
              7. Respuestas: Past Simple vs Present Simple
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PAST_VS_PRESENT_DATA.map((item) => (
                <div
                  key={item.id}
                  className="p-3 rounded-xl border border-slate-200 dark:border-white/5 bg-slate-50/50 dark:bg-slate-800/40 text-xs"
                >
                  <p className="font-bold font-mono text-sky-600 dark:text-sky-400 mb-1">
                    {item.number}. {item.fullSentenceEn}
                  </p>
                  <p className="italic text-slate-600 dark:text-slate-300">{item.fullSentenceEs}</p>
                  <p className="opacity-75 mt-1">{item.explanationEs}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Bottom Floating Navigation for Easy Next/Prev between Sections */}
      <div className="flex items-center justify-between gap-3 pt-4 border-t border-inherit/15">
        <button
          type="button"
          onClick={handlePrevTab}
          disabled={currentTabIndex <= 0}
          className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-bold uppercase tracking-wider border transition-all cursor-pointer ${
            currentTabIndex <= 0
              ? 'opacity-30 cursor-not-allowed border-transparent text-slate-400'
              : isDark
              ? 'bg-slate-900 border-white/10 hover:border-sky-500 text-slate-200 hover:text-white'
              : 'bg-white border-slate-200 hover:border-sky-500 text-slate-700 hover:text-sky-600 shadow-xs'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>{currentTabIndex > 0 ? TABS[currentTabIndex - 1].label : 'Inicio'}</span>
        </button>

        <span className="text-xs font-mono opacity-60">
          Pestaña {currentTabIndex + 1} de {TABS.length}
        </span>

        <button
          type="button"
          onClick={handleNextTab}
          disabled={currentTabIndex >= TABS.length - 1}
          className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-bold uppercase tracking-wider border transition-all cursor-pointer ${
            currentTabIndex >= TABS.length - 1
              ? 'opacity-30 cursor-not-allowed border-transparent text-slate-400'
              : 'bg-sky-600 hover:bg-sky-500 text-white border-sky-500 shadow-xs hover:scale-102 active:scale-98'
          }`}
        >
          <span>{currentTabIndex < TABS.length - 1 ? TABS[currentTabIndex + 1].label : 'Fin'}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
