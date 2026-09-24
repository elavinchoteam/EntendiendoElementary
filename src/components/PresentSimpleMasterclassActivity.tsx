import React, { useState, useRef, useEffect } from 'react';
import {
  BookOpen,
  CheckSquare,
  HelpCircle,
  Sparkles,
  CheckCircle2,
  RotateCcw,
  Volume2,
  VolumeX,
  Gauge,
  Check,
  ChevronLeft,
  ChevronRight,
  Lightbulb,
  AlertTriangle,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { speakText, stopSpeaking, playFeedbackSound } from '../utils/audio';
import {
  PRESENT_SIMPLE_THEORY_TOPICS,
  PRESENT_SIMPLE_QUICK_CHALLENGE,
  PRESENT_SIMPLE_FIND_SOMEONE,
  PRESENT_SIMPLE_TRUE_FALSE,
  PRESENT_SIMPLE_DO_OR_DOES_QUESTIONS,
  PRESENT_SIMPLE_SELF_QUESTIONS,
  PRESENT_SIMPLE_MINI_CONVERSATIONS,
  STRANGE_DAY_PART_A,
  STRANGE_DAY_PART_B,
  STRANGE_DAY_PART_C,
  STRANGE_DAY_PART_D,
} from '../data/presentSimpleMasterclassData';

interface PresentSimpleMasterclassActivityProps {
  accent?: 'US' | 'UK';
  speechRate?: number;
  onSuccess?: () => void;
}

type TabType =
  | 'theory'
  | 'quickChallenge'
  | 'habits'
  | 'doDoesQuestions'
  | 'miniDialogues'
  | 'strangeDay'
  | 'summary';

const SPEED_OPTIONS = [
  { value: 0.5, label: '0.50x' },
  { value: 0.65, label: '0.65x' },
  { value: 0.85, label: '0.85x' },
  { value: 1.0, label: '1x' },
  { value: 1.15, label: '1.15x' },
  { value: 1.3, label: '1.30x' },
];

export const PresentSimpleMasterclassActivity: React.FC<
  PresentSimpleMasterclassActivityProps
> = ({ accent = 'US', speechRate = 1.0, onSuccess }) => {
  const { isDark } = useTheme();

  // Active navigation tab
  const [activeTab, setActiveTab] = useState<TabType>('theory');
  const [currentRate, setCurrentRate] = useState<number>(speechRate);
  const [isRateMenuOpen, setIsRateMenuOpen] = useState<boolean>(false);
  const rateMenuRef = useRef<HTMLDivElement>(null);
  const [currentlySpeakingId, setCurrentlySpeakingId] = useState<string | null>(null);

  // Reversible Card Flip states
  const [flippedTheory, setFlippedTheory] = useState<Record<string, boolean>>({});
  const [flippedQc, setFlippedQc] = useState<Record<string, boolean>>({});
  const [flippedFsw, setFlippedFsw] = useState<Record<string, boolean>>({});
  const [flippedTf, setFlippedTf] = useState<Record<string, boolean>>({});
  const [flippedDoDoes, setFlippedDoDoes] = useState<Record<string, boolean>>({});
  const [flippedSelf, setFlippedSelf] = useState<Record<string, boolean>>({});
  const [flippedDialogues, setFlippedDialogues] = useState<Record<string, boolean>>({});
  const [flippedPartA, setFlippedPartA] = useState<Record<string, boolean>>({});
  const [flippedPartB, setFlippedPartB] = useState<Record<string, boolean>>({});
  const [flippedPartC, setFlippedPartC] = useState<Record<string, boolean>>({});
  const [flippedPartD, setFlippedPartD] = useState<Record<string, boolean>>({});

  // Interactive Answers
  const [qcAnswers, setQcAnswers] = useState<Record<string, 'Do' | 'Does'>>({});
  const [tfUserChoices, setTfUserChoices] = useState<Record<string, 'true' | 'false'>>({});
  const [doDoesAnswers, setDoDoesAnswers] = useState<Record<string, 'Do' | 'Does'>>({});
  const [selfAnswers, setSelfAnswers] = useState<Record<string, 'yes' | 'no'>>({});
  const [dialogueInputs, setDialogueInputs] = useState<Record<string, { a: string; b: string }>>({});

  // Strange Day States
  const [strangeDaySubTab, setStrangeDaySubTab] = useState<'A' | 'B' | 'C' | 'D'>('A');
  const [partAChoices, setPartAChoices] = useState<Record<string, 'a' | 'b' | 'c'>>({});
  const [partBInputs, setPartBInputs] = useState<Record<string, string>>({});
  const [partCChecks, setPartCChecks] = useState<Record<string, boolean>>({});

  // Tabs list for sequential navigation
  const tabList: { key: TabType; label: string; icon: React.FC<{ className?: string }> }[] = [
    { key: 'theory', label: '1. Explicación y Reglas', icon: BookOpen },
    { key: 'quickChallenge', label: '2. Quick Challenge (Do / Does)', icon: CheckSquare },
    { key: 'habits', label: '3. Hábitos y Rutinas', icon: Sparkles },
    { key: 'doDoesQuestions', label: '4. Preguntas Do/Does & Personales', icon: HelpCircle },
    { key: 'miniDialogues', label: '5. Mini-Conversaciones', icon: CheckSquare },
    { key: 'strangeDay', label: '6. A Strange Day (Práctica y Test)', icon: CheckCircle2 },
    { key: 'summary', label: '7. Resumen y Cuadro de Reglas', icon: Lightbulb },
  ];

  const currentTabIdx = tabList.findIndex((t) => t.key === activeTab);

  // Close speed menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (rateMenuRef.current && !rateMenuRef.current.contains(e.target as Node)) {
        setIsRateMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard navigation for Left and Right arrows
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeEl = document.activeElement;
      if (activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA')) {
        return;
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrevTab();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNextTab();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentTabIdx]);

  const handlePrevTab = () => {
    stopSpeaking();
    setCurrentlySpeakingId(null);
    if (currentTabIdx > 0) {
      playFeedbackSound('click');
      setActiveTab(tabList[currentTabIdx - 1].key);
    }
  };

  const handleNextTab = () => {
    stopSpeaking();
    setCurrentlySpeakingId(null);
    if (currentTabIdx < tabList.length - 1) {
      playFeedbackSound('click');
      setActiveTab(tabList[currentTabIdx + 1].key);
    }
  };

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

  const handleAudioPlay = (id: string, text: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (currentlySpeakingId === id) {
      stopSpeaking();
      setCurrentlySpeakingId(null);
    } else {
      stopSpeaking();
      setCurrentlySpeakingId(id);
      speakText(text, accent, currentRate, () => {
        setCurrentlySpeakingId(null);
      });
    }
  };

  // Score for Part A
  const partAScore = STRANGE_DAY_PART_A.filter((item) => {
    const selected = partAChoices[item.id];
    if (!selected) return false;
    const opt = item.options.find((o) => o.key === selected);
    return opt?.isCorrect;
  }).length;

  return (
    <div className="relative w-full flex flex-col items-center">
      {/* Floating Previous Activity Button (<) */}
      <button
        id="present-simple-floating-prev-btn"
        type="button"
        onClick={handlePrevTab}
        disabled={currentTabIdx === 0}
        className={`fixed sm:absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 z-40 w-11 h-11 sm:w-13 sm:h-13 rounded-full flex items-center justify-center border shadow-2xl transition-all cursor-pointer select-none ${
          currentTabIdx === 0
            ? 'opacity-0 pointer-events-none scale-75'
            : isDark
            ? 'bg-slate-800/95 hover:bg-sky-600 text-white border-white/20 hover:border-sky-400 shadow-sky-950/70 hover:scale-110 active:scale-95'
            : 'bg-white/95 hover:bg-sky-600 text-slate-800 hover:text-white border-slate-300 hover:border-sky-600 shadow-slate-400/60 hover:scale-110 active:scale-95'
        }`}
        title={
          currentTabIdx > 0
            ? `Actividad anterior: ${tabList[currentTabIdx - 1]?.label}`
            : 'Inicio'
        }
        aria-label="Actividad anterior"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Floating Next Activity Button (>) */}
      <button
        id="present-simple-floating-next-btn"
        type="button"
        onClick={handleNextTab}
        disabled={currentTabIdx >= tabList.length - 1}
        className={`fixed sm:absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 z-40 w-11 h-11 sm:w-13 sm:h-13 rounded-full flex items-center justify-center border shadow-2xl transition-all cursor-pointer select-none ${
          currentTabIdx >= tabList.length - 1
            ? 'opacity-0 pointer-events-none scale-75'
            : isDark
            ? 'bg-slate-800/95 hover:bg-sky-600 text-white border-white/20 hover:border-sky-400 shadow-sky-950/70 hover:scale-110 active:scale-95'
            : 'bg-white/95 hover:bg-sky-600 text-slate-800 hover:text-white border-slate-300 hover:border-sky-600 shadow-slate-400/60 hover:scale-110 active:scale-95'
        }`}
        title={
          currentTabIdx < tabList.length - 1
            ? `Siguiente actividad: ${tabList[currentTabIdx + 1]?.label}`
            : 'Fin'
        }
        aria-label="Siguiente actividad"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Inner Container */}
      <div className="w-full max-w-7xl px-3 sm:px-8 py-2 flex flex-col gap-6">
        {/* Top Header Card */}
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
                  Unit 3 · Sección 1
                </span>
                <span className="text-xs font-mono opacity-60">Grammar Masterclass</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                PRESENT SIMPLE — GRAMMAR MASTERCLASS
              </h2>
              <p className="text-sm opacity-80 mt-1">
                Guía completa del Presente Simple: rutinas, afirmaciones con -s, preguntas de Sí/No con Do y Does, respuestas cortas, "A Strange Day" y tarjetas reversibles con audio.
              </p>
            </div>

            {/* Header Controls: Audio & Speed Selector */}
            <div className="shrink-0 flex items-center gap-2 bg-slate-50 dark:bg-slate-800/80 p-2 rounded-2xl border border-inherit/20">
              {/* Audio button for unit introduction */}
              <button
                type="button"
                onClick={(e) =>
                  handleAudioPlay(
                    'header-intro',
                    'Present Simple. We use the Present Simple to talk about routines, habits, things we do regularly, facts, likes and dislikes. Remember that with I, you, we and they we use do, and with he, she and it we use does.',
                    e
                  )
                }
                className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-all cursor-pointer ${
                  currentlySpeakingId === 'header-intro'
                    ? 'bg-sky-600 text-white border-sky-600'
                    : isDark
                    ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300'
                }`}
                title="Escuchar introducción"
                aria-label="Escuchar introducción"
              >
                {currentlySpeakingId === 'header-intro' ? (
                  <VolumeX className="w-4 h-4 text-white animate-pulse" />
                ) : (
                  <Volume2 className="w-4 h-4 text-sky-500" />
                )}
              </button>

              {/* Speed Selector (0.50x, 0.65x, 0.85x, 1x, 1.15x, 1.30x) */}
              <div className="relative" ref={rateMenuRef}>
                <button
                  type="button"
                  onClick={() => setIsRateMenuOpen((prev) => !prev)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border font-mono text-xs font-bold transition-all cursor-pointer ${
                    isDark
                      ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 shadow-xs'
                  }`}
                  title="Velocidad del audio en toda la lección"
                >
                  <Gauge className="w-3.5 h-3.5 text-sky-500" />
                  <span>{currentRate}x</span>
                </button>

                {isRateMenuOpen && (
                  <div
                    className={`absolute right-0 top-full mt-2 w-32 rounded-xl border shadow-xl z-50 p-1.5 flex flex-col gap-1 ${
                      isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
                    }`}
                  >
                    {SPEED_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => {
                          setCurrentRate(opt.value);
                          setIsRateMenuOpen(false);
                          playFeedbackSound('click');
                        }}
                        className={`px-2.5 py-1.5 rounded-lg text-xs font-mono font-medium text-left flex items-center justify-between transition-colors cursor-pointer ${
                          currentRate === opt.value
                            ? 'bg-sky-600 text-white font-bold'
                            : isDark
                            ? 'hover:bg-slate-700 text-slate-300'
                            : 'hover:bg-slate-100 text-slate-700'
                        }`}
                      >
                        <span>{opt.label}</span>
                        {currentRate === opt.value && <Check className="w-3.5 h-3.5" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Horizontal Navigation Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-5 border-t border-inherit/15 mt-5">
            {tabList.map((t) => {
              const Icon = t.icon;
              const isActive = activeTab === t.key;
              return (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => {
                    stopSpeaking();
                    setCurrentlySpeakingId(null);
                    playFeedbackSound('click');
                    setActiveTab(t.key);
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 border ${
                    isActive
                      ? 'bg-sky-600 text-white border-sky-600 shadow-xs'
                      : isDark
                      ? 'bg-slate-800/70 border-white/10 text-slate-300 hover:bg-slate-800'
                      : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200/80'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{t.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* TAB 1: THEORY TOPICS IN REVERSIBLE CARDS WITH AUDIO */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'theory' && (
          <div className="flex flex-col gap-6 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {PRESENT_SIMPLE_THEORY_TOPICS.map((topic) => {
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
                      {/* Top Row: Category tag and speaker audio button */}
                      <div className="flex items-center justify-between gap-3 mb-3">
                        <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-sky-600 dark:text-sky-400 border border-slate-200 dark:border-white/10">
                          {isFlipped ? topic.categoryEs : topic.category}
                        </span>

                        <button
                          type="button"
                          onClick={(e) =>
                            handleAudioPlay(
                              `theory-${topic.id}`,
                              `${topic.titleEn}. ${topic.textEn}. ${topic.examples
                                .map((ex) => ex.en)
                                .join('. ')}. ${topic.grammarTipEn}`,
                              e
                            )
                          }
                          className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-all cursor-pointer ${
                            currentlySpeakingId === `theory-${topic.id}`
                              ? 'bg-sky-600 text-white border-sky-600'
                              : isDark
                              ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                              : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                          }`}
                          title="Escuchar audio"
                          aria-label="Escuchar audio"
                        >
                          {currentlySpeakingId === `theory-${topic.id}` ? (
                            <VolumeX className="w-3.5 h-3.5 text-white animate-pulse" />
                          ) : (
                            <Volume2 className="w-3.5 h-3.5 text-sky-500" />
                          )}
                        </button>
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
                            <button
                              type="button"
                              onClick={(e) => handleAudioPlay(`ex-${topic.id}-${idx}`, ex.en, e)}
                              className={`w-7 h-7 rounded-lg flex items-center justify-center border shrink-0 transition-all cursor-pointer ${
                                currentlySpeakingId === `ex-${topic.id}-${idx}`
                                  ? 'bg-sky-600 text-white border-sky-600'
                                  : isDark
                                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                                  : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                              }`}
                              title="Escuchar ejemplo"
                              aria-label="Escuchar ejemplo"
                            >
                              <Volume2 className="w-3 h-3 text-sky-500" />
                            </button>
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
        {/* TAB 2: EXERCISE 1 — QUICK CHALLENGE: CHOOSE DO OR DOES */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'quickChallenge' && (
          <div className="flex flex-col gap-5 animate-in fade-in duration-200">
            <div
              className={`p-4 rounded-2xl border ${
                isDark ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="font-bold text-base">Quick Challenge — Choose DO or DOES</h3>
                  <p className="text-xs opacity-75 mt-0.5">
                    Selecciona "Do" o "Does" para completar cada pregunta correctamente. Toca cualquier tarjeta para ver su traducción y regla gramatical.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setQcAnswers({});
                    playFeedbackSound('click');
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 border cursor-pointer self-start sm:self-auto ${
                    isDark ? 'bg-white/5 border-white/10 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'
                  }`}
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reiniciar</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PRESENT_SIMPLE_QUICK_CHALLENGE.map((item) => {
                const isFlipped = !!flippedQc[item.id];
                const selected = qcAnswers[item.id];
                const isCorrect = selected === item.correctAnswer;
                const hasAnswered = !!selected;

                return (
                  <div
                    key={item.id}
                    id={`qc-card-${item.id}`}
                    onClick={() => toggleFlip(item.id, setFlippedQc)}
                    className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between select-none ${
                      isFlipped
                        ? isDark
                          ? 'bg-slate-900 border-sky-500 ring-2 ring-sky-500/20'
                          : 'bg-white border-sky-500 ring-2 ring-sky-400/20'
                        : isDark
                        ? 'bg-slate-900 border-white/10'
                        : 'bg-white border-slate-200'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="px-2 py-0.5 rounded-md text-[11px] font-mono font-bold uppercase bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                          {item.number}. Sujeto: {item.subject}
                        </span>

                        <button
                          type="button"
                          onClick={(e) => handleAudioPlay(`qc-${item.id}`, item.fullSentenceEn, e)}
                          className={`w-7 h-7 rounded-lg flex items-center justify-center border shrink-0 transition-all cursor-pointer ${
                            currentlySpeakingId === `qc-${item.id}`
                              ? 'bg-sky-600 text-white border-sky-600'
                              : isDark
                              ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                              : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                          }`}
                          title="Escuchar audio"
                          aria-label="Escuchar audio"
                        >
                          <Volume2 className="w-3.5 h-3.5 text-sky-500" />
                        </button>
                      </div>

                      {/* Front: English with options */}
                      {!isFlipped ? (
                        <div>
                          <p className="text-base font-semibold mb-4">
                            <span
                              className={`inline-block px-2.5 py-0.5 rounded-lg border font-mono font-bold mr-1.5 ${
                                hasAnswered
                                  ? isCorrect
                                    ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-600 dark:text-emerald-400'
                                    : 'bg-rose-500/15 border-rose-500/40 text-rose-600 dark:text-rose-400'
                                  : 'bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-white/10'
                              }`}
                            >
                              {selected || '______'}
                            </span>
                            {item.sentenceAfter}
                          </p>

                          {/* Options buttons */}
                          <div className="flex items-center gap-2 mb-2" onClick={(e) => e.stopPropagation()}>
                            {item.options.map((opt) => {
                              const isThisSelected = selected === opt;
                              const isThisCorrect = opt === item.correctAnswer;

                              return (
                                <button
                                  key={opt}
                                  type="button"
                                  onClick={() => {
                                    setQcAnswers((prev) => ({ ...prev, [item.id]: opt }));
                                    playFeedbackSound(isThisCorrect ? 'correct' : 'wrong');
                                  }}
                                  className={`flex-1 py-2 px-3 rounded-xl border text-xs font-mono font-bold transition-all cursor-pointer ${
                                    isThisSelected
                                      ? isThisCorrect
                                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                                        : 'bg-rose-600 text-white border-rose-600 shadow-xs'
                                      : isDark
                                      ? 'bg-slate-800 border-white/10 hover:bg-slate-700 text-slate-200'
                                      : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-800'
                                  }`}
                                >
                                  {opt}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ) : (
                        /* Back: Spanish Translation & Explanation */
                        <div className="py-1">
                          <p className="text-base font-semibold mb-2 text-sky-600 dark:text-sky-400">
                            {item.fullSentenceEs}
                          </p>
                          <p className="text-xs leading-relaxed opacity-85">{item.explanationEs}</p>
                          <p className="text-[11px] font-mono mt-2 text-slate-500 dark:text-slate-400">
                            Respuesta correcta: <strong className="text-emerald-500">{item.correctAnswer}</strong>
                          </p>
                        </div>
                      )}
                    </div>

                    {hasAnswered && !isFlipped && (
                      <div className="pt-2 text-[11px] font-mono">
                        {isCorrect ? (
                          <span className="text-emerald-500 font-bold">✓ ¡Correcto!</span>
                        ) : (
                          <span className="text-rose-500 font-bold">
                            ✗ Incorrecto. La respuesta es {item.correctAnswer}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 3: EXERCISE 2 — HABITS & ROUTINES: FIND SOMEONE & T/F */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'habits' && (
          <div className="flex flex-col gap-6 animate-in fade-in duration-200">
            {/* Part 1: Find Someone Who... */}
            <div
              className={`p-5 rounded-3xl border ${
                isDark ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-200'
              }`}
            >
              <div className="mb-4">
                <span className="text-xs font-mono font-bold uppercase text-sky-500">
                  Actividad 6 del archivo PDF
                </span>
                <h3 className="text-lg font-bold tracking-tight">The Fun Part — Find Someone Who...</h3>
                <p className="text-xs opacity-75 mt-1">
                  Pregunta a tus compañeros o practica respondiendo con <em>"Do you...?"</em>. Al encontrar a alguien, formulamos la oración en tercera persona singular agregando <strong>-s</strong>.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {PRESENT_SIMPLE_FIND_SOMEONE.map((item) => {
                  const isFlipped = !!flippedFsw[item.id];

                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleFlip(item.id, setFlippedFsw)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between select-none ${
                        isFlipped
                          ? isDark
                            ? 'bg-slate-900 border-sky-500 ring-2 ring-sky-500/20'
                            : 'bg-white border-sky-500 ring-2 ring-sky-400/20'
                          : isDark
                          ? 'bg-slate-800/60 border-white/10 hover:border-slate-700'
                          : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-xs font-mono font-bold text-sky-500">
                          {item.number}. Find someone who:
                        </span>
                        <button
                          type="button"
                          onClick={(e) =>
                            handleAudioPlay(
                              `fsw-${item.id}`,
                              `${item.questionEn} ${item.affirmativeExampleEn}`,
                              e
                            )
                          }
                          className={`w-7 h-7 rounded-lg flex items-center justify-center border shrink-0 transition-all cursor-pointer ${
                            currentlySpeakingId === `fsw-${item.id}`
                              ? 'bg-sky-600 text-white border-sky-600'
                              : isDark
                              ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                              : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                          }`}
                          title="Escuchar audio"
                          aria-label="Escuchar audio"
                        >
                          <Volume2 className="w-3.5 h-3.5 text-sky-500" />
                        </button>
                      </div>

                      {!isFlipped ? (
                        <div>
                          <p className="text-base font-bold mb-1">{item.promptEn}</p>
                          <p className="text-xs font-semibold text-sky-600 dark:text-sky-400">
                            {item.questionEn}
                          </p>
                          <div className="mt-2 p-2 rounded-xl bg-white dark:bg-slate-900/80 border border-inherit/20 text-xs">
                            <p className="text-slate-700 dark:text-slate-300 font-mono">
                              ✍️ {item.affirmativeExampleEn}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <p className="text-sm font-bold text-sky-600 dark:text-sky-400 mb-1">
                            {item.promptEs}
                          </p>
                          <p className="text-xs font-medium mb-2">{item.questionEs}</p>
                          <div className="p-2 rounded-xl bg-white dark:bg-slate-900/80 border border-inherit/20 text-xs space-y-1">
                            <p className="text-slate-700 dark:text-slate-300">
                              Afirmativo: <strong>{item.affirmativeExampleEs}</strong>
                            </p>
                            <p className="text-slate-500 dark:text-slate-400">
                              Negativo: {item.negativeExampleEs}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Part 2: True or False Statements */}
            <div
              className={`p-5 rounded-3xl border ${
                isDark ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-200'
              }`}
            >
              <div className="mb-4">
                <span className="text-xs font-mono font-bold uppercase text-sky-500">
                  Actividad 7 del archivo PDF
                </span>
                <h3 className="text-lg font-bold tracking-tight">True or False?</h3>
                <p className="text-xs opacity-75 mt-1">
                  Lee cada afirmación y marca si es verdadera o falsa para ti. Luego pregúntale a un compañero utilizando <em>"Do you...?"</em>.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {PRESENT_SIMPLE_TRUE_FALSE.map((item) => {
                  const isFlipped = !!flippedTf[item.id];
                  const userChoice = tfUserChoices[item.id];

                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleFlip(item.id, setFlippedTf)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between select-none ${
                        isFlipped
                          ? isDark
                            ? 'bg-slate-900 border-sky-500 ring-2 ring-sky-500/20'
                            : 'bg-white border-sky-500 ring-2 ring-sky-400/20'
                          : isDark
                          ? 'bg-slate-800/60 border-white/10 hover:border-slate-700'
                          : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-xs font-mono font-bold text-slate-500">
                          {item.number}. Personal Habit
                        </span>
                        <button
                          type="button"
                          onClick={(e) =>
                            handleAudioPlay(
                              `tf-${item.id}`,
                              `${item.statementEn} ${item.questionEn} ${item.positiveAnswerEn}`,
                              e
                            )
                          }
                          className={`w-7 h-7 rounded-lg flex items-center justify-center border shrink-0 transition-all cursor-pointer ${
                            currentlySpeakingId === `tf-${item.id}`
                              ? 'bg-sky-600 text-white border-sky-600'
                              : isDark
                              ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                              : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                          }`}
                          title="Escuchar audio"
                          aria-label="Escuchar audio"
                        >
                          <Volume2 className="w-3.5 h-3.5 text-sky-500" />
                        </button>
                      </div>

                      {!isFlipped ? (
                        <div>
                          <p className="text-base font-bold mb-2">{item.statementEn}</p>
                          <p className="text-xs text-sky-600 dark:text-sky-400 font-medium mb-3">
                            Ask a classmate: {item.questionEn}
                          </p>

                          {/* True / False interactive toggle */}
                          <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                            <button
                              type="button"
                              onClick={() => {
                                setTfUserChoices((prev) => ({ ...prev, [item.id]: 'true' }));
                                playFeedbackSound('click');
                              }}
                              className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-mono font-bold border transition-all cursor-pointer ${
                                userChoice === 'true'
                                  ? 'bg-emerald-600 text-white border-emerald-600'
                                  : isDark
                                  ? 'bg-slate-800 border-white/10 text-slate-300 hover:bg-slate-700'
                                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                              }`}
                            >
                              True for me
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setTfUserChoices((prev) => ({ ...prev, [item.id]: 'false' }));
                                playFeedbackSound('click');
                              }}
                              className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-mono font-bold border transition-all cursor-pointer ${
                                userChoice === 'false'
                                  ? 'bg-amber-600 text-white border-amber-600'
                                  : isDark
                                  ? 'bg-slate-800 border-white/10 text-slate-300 hover:bg-slate-700'
                                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                              }`}
                            >
                              False for me
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <p className="text-base font-bold text-sky-600 dark:text-sky-400 mb-1">
                            {item.statementEs}
                          </p>
                          <p className="text-xs font-medium mb-2">Pregunta en español: {item.questionEs}</p>
                          <div className="p-2 rounded-xl bg-white dark:bg-slate-900/80 border border-inherit/20 text-xs">
                            <p>
                              Si es sí: <strong>{item.positiveAnswerEn}</strong> ({item.positiveAnswerEs})
                            </p>
                            <p className="mt-0.5">
                              Si es no: <strong>{item.negativeAnswerEn}</strong> ({item.negativeAnswerEs})
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 4: EXERCISE 3 — DO OR DOES? QUESTIONS & ANSWER ABOUT YOURSELF */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'doDoesQuestions' && (
          <div className="flex flex-col gap-6 animate-in fade-in duration-200">
            {/* Part 8: Complete with Do or Does */}
            <div
              className={`p-5 rounded-3xl border ${
                isDark ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div>
                  <span className="text-xs font-mono font-bold uppercase text-sky-500">
                    Actividad 8 del archivo PDF
                  </span>
                  <h3 className="text-lg font-bold tracking-tight">DO or DOES? Complete the Questions</h3>
                  <p className="text-xs opacity-75 mt-0.5">
                    Completa las 8 preguntas con Do o Does. Toca las tarjetas para ver la traducción al español.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setDoDoesAnswers({});
                    playFeedbackSound('click');
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 border cursor-pointer self-start sm:self-auto ${
                    isDark ? 'bg-white/5 border-white/10 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'
                  }`}
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reiniciar</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {PRESENT_SIMPLE_DO_OR_DOES_QUESTIONS.map((item) => {
                  const isFlipped = !!flippedDoDoes[item.id];
                  const selected = doDoesAnswers[item.id];
                  const isCorrect = selected === item.correctAnswer;
                  const hasAnswered = !!selected;

                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleFlip(item.id, setFlippedDoDoes)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between select-none ${
                        isFlipped
                          ? isDark
                            ? 'bg-slate-900 border-sky-500 ring-2 ring-sky-500/20'
                            : 'bg-white border-sky-500 ring-2 ring-sky-400/20'
                          : isDark
                          ? 'bg-slate-800/60 border-white/10 hover:border-slate-700'
                          : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[11px] font-mono font-bold uppercase text-slate-500">
                          {item.number}. Sujeto: {item.subject}
                        </span>
                        <button
                          type="button"
                          onClick={(e) => handleAudioPlay(`dodoes-${item.id}`, item.fullSentenceEn, e)}
                          className={`w-7 h-7 rounded-lg flex items-center justify-center border shrink-0 transition-all cursor-pointer ${
                            currentlySpeakingId === `dodoes-${item.id}`
                              ? 'bg-sky-600 text-white border-sky-600'
                              : isDark
                              ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                              : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                          }`}
                          title="Escuchar audio"
                          aria-label="Escuchar audio"
                        >
                          <Volume2 className="w-3.5 h-3.5 text-sky-500" />
                        </button>
                      </div>

                      {!isFlipped ? (
                        <div>
                          <p className="text-base font-semibold mb-3">
                            <span
                              className={`inline-block px-2.5 py-0.5 rounded-lg border font-mono font-bold mr-1.5 ${
                                hasAnswered
                                  ? isCorrect
                                    ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-600 dark:text-emerald-400'
                                    : 'bg-rose-500/15 border-rose-500/40 text-rose-600 dark:text-rose-400'
                                  : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-white/10'
                              }`}
                            >
                              {selected || '______'}
                            </span>
                            {item.sentenceAfter}
                          </p>

                          <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                            {item.options.map((opt) => {
                              const isThisSelected = selected === opt;
                              const isThisCorrect = opt === item.correctAnswer;

                              return (
                                <button
                                  key={opt}
                                  type="button"
                                  onClick={() => {
                                    setDoDoesAnswers((prev) => ({ ...prev, [item.id]: opt }));
                                    playFeedbackSound(isThisCorrect ? 'correct' : 'wrong');
                                  }}
                                  className={`flex-1 py-1.5 px-3 rounded-xl border text-xs font-mono font-bold transition-all cursor-pointer ${
                                    isThisSelected
                                      ? isThisCorrect
                                        ? 'bg-emerald-600 text-white border-emerald-600'
                                        : 'bg-rose-600 text-white border-rose-600'
                                      : isDark
                                      ? 'bg-slate-800 border-white/10 text-slate-200 hover:bg-slate-700'
                                      : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-100'
                                  }`}
                                >
                                  {opt}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ) : (
                        <div>
                          <p className="text-base font-semibold text-sky-600 dark:text-sky-400 mb-1">
                            {item.fullSentenceEs}
                          </p>
                          <p className="text-xs opacity-85">{item.explanationEs}</p>
                          <p className="text-[11px] font-mono mt-1 text-slate-500">
                            Respuesta: <strong className="text-emerald-500">{item.correctAnswer}</strong>
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Part 9: Answer the Questions (about yourself) */}
            <div
              className={`p-5 rounded-3xl border ${
                isDark ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-200'
              }`}
            >
              <div className="mb-4">
                <span className="text-xs font-mono font-bold uppercase text-sky-500">
                  Actividad 9 del archivo PDF
                </span>
                <h3 className="text-lg font-bold tracking-tight">Answer the Questions About Yourself</h3>
                <p className="text-xs opacity-75 mt-0.5">
                  Responde sobre ti mismo utilizando las respuestas cortas correctas con <em>Yes, I do / No, I don't</em> o <em>Yes, he/she does / No, he/she doesn't</em>.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {PRESENT_SIMPLE_SELF_QUESTIONS.map((item) => {
                  const isFlipped = !!flippedSelf[item.id];
                  const userAns = selfAnswers[item.id];

                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleFlip(item.id, setFlippedSelf)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between select-none ${
                        isFlipped
                          ? isDark
                            ? 'bg-slate-900 border-sky-500 ring-2 ring-sky-500/20'
                            : 'bg-white border-sky-500 ring-2 ring-sky-400/20'
                          : isDark
                          ? 'bg-slate-800/60 border-white/10 hover:border-slate-700'
                          : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-xs font-mono font-bold text-slate-500">
                          {item.number}. Personal Short Answer
                        </span>
                        <button
                          type="button"
                          onClick={(e) =>
                            handleAudioPlay(
                              `self-${item.id}`,
                              `${item.questionEn} ${item.positiveAnswerEn} ${item.negativeAnswerEn}`,
                              e
                            )
                          }
                          className={`w-7 h-7 rounded-lg flex items-center justify-center border shrink-0 transition-all cursor-pointer ${
                            currentlySpeakingId === `self-${item.id}`
                              ? 'bg-sky-600 text-white border-sky-600'
                              : isDark
                              ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                              : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                          }`}
                          title="Escuchar audio"
                          aria-label="Escuchar audio"
                        >
                          <Volume2 className="w-3.5 h-3.5 text-sky-500" />
                        </button>
                      </div>

                      {!isFlipped ? (
                        <div>
                          <p className="text-base font-bold mb-3">{item.questionEn}</p>

                          <div className="flex items-center gap-2 mb-2" onClick={(e) => e.stopPropagation()}>
                            <button
                              type="button"
                              onClick={() => {
                                setSelfAnswers((prev) => ({ ...prev, [item.id]: 'yes' }));
                                playFeedbackSound('click');
                              }}
                              className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-mono font-bold border transition-all cursor-pointer ${
                                userAns === 'yes'
                                  ? 'bg-emerald-600 text-white border-emerald-600'
                                  : isDark
                                  ? 'bg-slate-800 border-white/10 text-slate-300 hover:bg-slate-700'
                                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                              }`}
                            >
                              {item.positiveAnswerEn}
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setSelfAnswers((prev) => ({ ...prev, [item.id]: 'no' }));
                                playFeedbackSound('click');
                              }}
                              className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-mono font-bold border transition-all cursor-pointer ${
                                userAns === 'no'
                                  ? 'bg-rose-600 text-white border-rose-600'
                                  : isDark
                                  ? 'bg-slate-800 border-white/10 text-slate-300 hover:bg-slate-700'
                                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                              }`}
                            >
                              {item.negativeAnswerEn}
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <p className="text-base font-semibold text-sky-600 dark:text-sky-400 mb-1">
                            {item.questionEs}
                          </p>
                          <p className="text-xs opacity-85 mb-2">{item.explanationEs}</p>
                          <div className="p-2 rounded-xl bg-white dark:bg-slate-900/80 border border-inherit/20 text-xs">
                            <p>
                              Afirmativo: <strong>{item.positiveAnswerEs}</strong>
                            </p>
                            <p className="mt-0.5">
                              Negativo: <strong>{item.negativeAnswerEs}</strong>
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 5: EXERCISE 4 — FINAL CHALLENGE: MINI-CONVERSATIONS */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'miniDialogues' && (
          <div className="flex flex-col gap-6 animate-in fade-in duration-200">
            <div
              className={`p-5 rounded-3xl border ${
                isDark ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-200'
              }`}
            >
              <div className="mb-4">
                <span className="text-xs font-mono font-bold uppercase text-sky-500">
                  Actividad 10 del archivo PDF
                </span>
                <h3 className="text-lg font-bold tracking-tight">Final Challenge — Complete the Mini-Conversations</h3>
                <p className="text-xs opacity-75 mt-0.5">
                  Completa los mini-diálogos en parejas A y B utilizando la forma auxiliar correcta (Do / Does / don't / doesn't / do / does). Toca cada tarjeta para ver la conversación traducida y la regla aplicada.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {PRESENT_SIMPLE_MINI_CONVERSATIONS.map((diag) => {
                  const isFlipped = !!flippedDialogues[diag.id];
                  const currentInputs = dialogueInputs[diag.id] || { a: '', b: '' };

                  const isACorrect =
                    currentInputs.a.trim().toLowerCase() === diag.speakerA_BlankWord.toLowerCase();
                  const isBCorrect =
                    currentInputs.b.trim().toLowerCase() === diag.speakerB_BlankWord.toLowerCase();

                  return (
                    <div
                      key={diag.id}
                      onClick={() => toggleFlip(diag.id, setFlippedDialogues)}
                      className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between select-none ${
                        isFlipped
                          ? isDark
                            ? 'bg-slate-900 border-sky-500 ring-2 ring-sky-500/20'
                            : 'bg-white border-sky-500 ring-2 ring-sky-400/20'
                          : isDark
                          ? 'bg-slate-800/60 border-white/10 hover:border-slate-700'
                          : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className="text-xs font-mono font-bold uppercase text-sky-500">
                            {diag.dialogueGroup}
                          </span>
                          <button
                            type="button"
                            onClick={(e) =>
                              handleAudioPlay(
                                `mc-${diag.id}`,
                                `${diag.speakerA_QuestionEn.replace('___', diag.speakerA_BlankWord)} ${diag.speakerB_AnswerEn.replace('___', diag.speakerB_BlankWord)}`,
                                e
                              )
                            }
                            className={`w-7 h-7 rounded-lg flex items-center justify-center border shrink-0 transition-all cursor-pointer ${
                              currentlySpeakingId === `mc-${diag.id}`
                                ? 'bg-sky-600 text-white border-sky-600'
                                : isDark
                                ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                                : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                            }`}
                            title="Escuchar diálogo"
                            aria-label="Escuchar diálogo"
                          >
                            <Volume2 className="w-3.5 h-3.5 text-sky-500" />
                          </button>
                        </div>

                        {!isFlipped ? (
                          <div className="flex flex-col gap-3" onClick={(e) => e.stopPropagation()}>
                            {/* Speaker A */}
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-bold text-xs px-2 py-0.5 rounded bg-sky-500/10 text-sky-600 dark:text-sky-400">
                                A:
                              </span>
                              <div className="flex-1 flex items-center gap-1.5 text-sm font-semibold">
                                <input
                                  type="text"
                                  value={currentInputs.a}
                                  onChange={(e) =>
                                    setDialogueInputs((prev) => ({
                                      ...prev,
                                      [diag.id]: {
                                        ...currentInputs,
                                        a: e.target.value,
                                      },
                                    }))
                                  }
                                  placeholder="Do / Does"
                                  className={`w-20 px-2 py-1 text-xs font-mono font-bold rounded-lg border outline-none transition-all ${
                                    currentInputs.a
                                      ? isACorrect
                                        ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600'
                                        : 'border-rose-500 bg-rose-500/10 text-rose-600'
                                      : isDark
                                      ? 'bg-slate-900 border-slate-700 text-white'
                                      : 'bg-white border-slate-300 text-slate-900'
                                  }`}
                                />
                                <span>{diag.speakerA_QuestionEn.replace('___', '')}</span>
                              </div>
                            </div>

                            {/* Speaker B */}
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-bold text-xs px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400">
                                B:
                              </span>
                              <div className="flex-1 flex items-center gap-1.5 text-sm font-semibold">
                                <span>{diag.speakerB_AnswerEn.split('___')[0]}</span>
                                <input
                                  type="text"
                                  value={currentInputs.b}
                                  onChange={(e) =>
                                    setDialogueInputs((prev) => ({
                                      ...prev,
                                      [diag.id]: {
                                        ...currentInputs,
                                        b: e.target.value,
                                      },
                                    }))
                                  }
                                  placeholder="do / doesn't"
                                  className={`w-24 px-2 py-1 text-xs font-mono font-bold rounded-lg border outline-none transition-all ${
                                    currentInputs.b
                                      ? isBCorrect
                                        ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600'
                                        : 'border-rose-500 bg-rose-500/10 text-rose-600'
                                      : isDark
                                      ? 'bg-slate-900 border-slate-700 text-white'
                                      : 'bg-white border-slate-300 text-slate-900'
                                  }`}
                                />
                                <span>.</span>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <p className="text-sm font-semibold text-sky-600 dark:text-sky-400 mb-1">
                              {diag.dialogueGroupEs}
                            </p>
                            <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900/80 border border-inherit/20 text-xs space-y-1 mb-2">
                              <p>
                                <strong>A:</strong> {diag.speakerA_QuestionEs} (Respuesta:{' '}
                                <strong className="text-emerald-500">{diag.speakerA_BlankWord}</strong>)
                              </p>
                              <p>
                                <strong>B:</strong> {diag.speakerB_AnswerEs} (Respuesta:{' '}
                                <strong className="text-emerald-500">{diag.speakerB_BlankWord}</strong>)
                              </p>
                            </div>
                            <p className="text-xs opacity-80 italic">{diag.hintEs}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 6: EXERCISE 5 — PRESENT SIMPLE: A STRANGE DAY (Pages 9-11) */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'strangeDay' && (
          <div className="flex flex-col gap-6 animate-in fade-in duration-200">
            {/* Header & Sub-Tabs */}
            <div
              className={`p-5 rounded-3xl border ${
                isDark ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div>
                  <span className="text-xs font-mono font-bold uppercase text-sky-500">
                    Páginas 9 a 11 del archivo PDF
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold tracking-tight">
                    PRESENT SIMPLE — A STRANGE DAY
                  </h3>
                  <p className="text-xs opacity-75 mt-0.5">
                    Evaluación y práctica exhaustiva: Opción Múltiple (Parte A), Completar Verbos (Parte B), Encuentra y Corrige el Error (Parte C) y Desafío Creativo (Parte D).
                  </p>
                </div>

                {/* Score badge for Part A */}
                {strangeDaySubTab === 'A' && (
                  <div className="self-start sm:self-auto px-3.5 py-1.5 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-600 dark:text-sky-400 text-xs font-mono font-bold">
                    Puntuación: {partAScore} / 8
                  </div>
                )}
              </div>

              {/* Sub-tabs A, B, C, D */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-3 border-t border-inherit/15">
                <button
                  type="button"
                  onClick={() => {
                    playFeedbackSound('click');
                    setStrangeDaySubTab('A');
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold border transition-all cursor-pointer ${
                    strangeDaySubTab === 'A'
                      ? 'bg-sky-600 text-white border-sky-600'
                      : isDark
                      ? 'bg-slate-800 border-white/10 text-slate-300'
                      : 'bg-slate-100 border-slate-200 text-slate-700'
                  }`}
                >
                  Parte A · Choose the correct option (8)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    playFeedbackSound('click');
                    setStrangeDaySubTab('B');
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold border transition-all cursor-pointer ${
                    strangeDaySubTab === 'B'
                      ? 'bg-sky-600 text-white border-sky-600'
                      : isDark
                      ? 'bg-slate-800 border-white/10 text-slate-300'
                      : 'bg-slate-100 border-slate-200 text-slate-700'
                  }`}
                >
                  Parte B · Correct Verb Form (8)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    playFeedbackSound('click');
                    setStrangeDaySubTab('C');
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold border transition-all cursor-pointer ${
                    strangeDaySubTab === 'C'
                      ? 'bg-sky-600 text-white border-sky-600'
                      : isDark
                      ? 'bg-slate-800 border-white/10 text-slate-300'
                      : 'bg-slate-100 border-slate-200 text-slate-700'
                  }`}
                >
                  Parte C · Find the Mistake (6)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    playFeedbackSound('click');
                    setStrangeDaySubTab('D');
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold border transition-all cursor-pointer ${
                    strangeDaySubTab === 'D'
                      ? 'bg-sky-600 text-white border-sky-600'
                      : isDark
                      ? 'bg-slate-800 border-white/10 text-slate-300'
                      : 'bg-slate-100 border-slate-200 text-slate-700'
                  }`}
                >
                  Parte D · One Last Challenge (6)
                </button>
              </div>
            </div>

            {/* SUB-TAB A: Choose the correct option */}
            {strangeDaySubTab === 'A' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {STRANGE_DAY_PART_A.map((item) => {
                  const isFlipped = !!flippedPartA[item.id];
                  const selectedKey = partAChoices[item.id];
                  const isSelected = !!selectedKey;
                  const isCorrect = item.options.find((o) => o.key === selectedKey)?.isCorrect;

                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleFlip(item.id, setFlippedPartA)}
                      className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between select-none ${
                        isFlipped
                          ? isDark
                            ? 'bg-slate-900 border-sky-500 ring-2 ring-sky-500/20'
                            : 'bg-white border-sky-500 ring-2 ring-sky-400/20'
                          : isDark
                          ? 'bg-slate-900 border-white/10'
                          : 'bg-white border-slate-200'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className="text-xs font-mono font-bold text-slate-500">
                            Pregunta {item.number} de 8
                          </span>
                          <button
                            type="button"
                            onClick={(e) => handleAudioPlay(`sd-a-${item.id}`, item.promptEn, e)}
                            className={`w-7 h-7 rounded-lg flex items-center justify-center border shrink-0 transition-all cursor-pointer ${
                              currentlySpeakingId === `sd-a-${item.id}`
                                ? 'bg-sky-600 text-white border-sky-600'
                                : isDark
                                ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                            }`}
                            title="Escuchar audio"
                            aria-label="Escuchar audio"
                          >
                            <Volume2 className="w-3.5 h-3.5 text-sky-500" />
                          </button>
                        </div>

                        {!isFlipped ? (
                          <div>
                            <p className="text-base font-semibold mb-3">{item.promptEn}</p>

                            <div className="flex flex-col gap-2 mb-2" onClick={(e) => e.stopPropagation()}>
                              {item.options.map((opt) => {
                                const isOptSelected = selectedKey === opt.key;

                                return (
                                  <button
                                    key={opt.key}
                                    type="button"
                                    onClick={() => {
                                      setPartAChoices((prev) => ({ ...prev, [item.id]: opt.key }));
                                      playFeedbackSound(opt.isCorrect ? 'correct' : 'wrong');
                                    }}
                                    className={`w-full p-2.5 rounded-xl border text-left text-xs font-mono font-semibold transition-all cursor-pointer flex items-center justify-between ${
                                      isOptSelected
                                        ? opt.isCorrect
                                          ? 'bg-emerald-600 text-white border-emerald-600'
                                          : 'bg-rose-600 text-white border-rose-600'
                                        : isDark
                                        ? 'bg-slate-800 border-white/10 hover:bg-slate-700 text-slate-200'
                                        : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-800'
                                    }`}
                                  >
                                    <span>
                                      <strong>{opt.key})</strong> {opt.text}
                                    </span>
                                    {isOptSelected && opt.isCorrect && <Check className="w-4 h-4" />}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        ) : (
                          <div>
                            <p className="text-base font-semibold text-sky-600 dark:text-sky-400 mb-2">
                              {item.promptEs}
                            </p>
                            <p className="text-xs leading-relaxed opacity-90">{item.explanationEs}</p>
                          </div>
                        )}
                      </div>

                      {isSelected && !isFlipped && (
                        <div className="pt-2 text-xs font-mono font-bold">
                          {isCorrect ? (
                            <span className="text-emerald-500">✓ ¡Respuesta Correcta!</span>
                          ) : (
                            <span className="text-rose-500">✗ Revisa la concordancia del sujeto</span>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* SUB-TAB B: Complete with correct form */}
            {strangeDaySubTab === 'B' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {STRANGE_DAY_PART_B.map((item) => {
                  const isFlipped = !!flippedPartB[item.id];
                  const currentInput = partBInputs[item.id] || '';
                  const isAnswered = currentInput.trim().length > 0;
                  const isCorrect = item.correctAnswers.some(
                    (ans) => ans.toLowerCase() === currentInput.trim().toLowerCase()
                  );

                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleFlip(item.id, setFlippedPartB)}
                      className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between select-none ${
                        isFlipped
                          ? isDark
                            ? 'bg-slate-900 border-sky-500 ring-2 ring-sky-500/20'
                            : 'bg-white border-sky-500 ring-2 ring-sky-400/20'
                          : isDark
                          ? 'bg-slate-900 border-white/10'
                          : 'bg-white border-slate-200'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className="text-xs font-mono font-bold text-slate-500">
                            {item.number}. Verbo: ({item.verbPrompt})
                          </span>
                          <button
                            type="button"
                            onClick={(e) => handleAudioPlay(`sd-b-${item.id}`, item.fullSentenceEn, e)}
                            className={`w-7 h-7 rounded-lg flex items-center justify-center border shrink-0 transition-all cursor-pointer ${
                              currentlySpeakingId === `sd-b-${item.id}`
                                ? 'bg-sky-600 text-white border-sky-600'
                                : isDark
                                ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                            }`}
                            title="Escuchar audio"
                            aria-label="Escuchar audio"
                          >
                            <Volume2 className="w-3.5 h-3.5 text-sky-500" />
                          </button>
                        </div>

                        {!isFlipped ? (
                          <div>
                            <p className="text-sm font-semibold mb-3">
                              {item.sentenceBefore}{' '}
                              <span className="font-mono text-sky-500 underline">({item.verbPrompt})</span>{' '}
                              {item.sentenceAfter}
                            </p>

                            <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                              <input
                                type="text"
                                value={currentInput}
                                onChange={(e) =>
                                  setPartBInputs((prev) => ({ ...prev, [item.id]: e.target.value }))
                                }
                                placeholder="Escribe la forma correcta..."
                                className={`w-full px-3 py-2 text-xs font-mono font-bold rounded-xl border outline-none transition-all ${
                                  isAnswered
                                    ? isCorrect
                                      ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600'
                                      : 'border-rose-500 bg-rose-500/10 text-rose-600'
                                    : isDark
                                    ? 'bg-slate-800 border-slate-700 text-white'
                                    : 'bg-slate-50 border-slate-300 text-slate-900'
                                }`}
                              />
                            </div>
                          </div>
                        ) : (
                          <div>
                            <p className="text-base font-semibold text-sky-600 dark:text-sky-400 mb-1">
                              {item.fullSentenceEs}
                            </p>
                            <p className="text-xs opacity-85 mb-2">{item.explanationEs}</p>
                            <p className="text-xs font-mono">
                              Respuesta:{' '}
                              <strong className="text-emerald-500">{item.correctAnswers[0]}</strong>
                            </p>
                          </div>
                        )}
                      </div>

                      {isAnswered && !isFlipped && (
                        <div className="pt-2 text-xs font-mono font-bold">
                          {isCorrect ? (
                            <span className="text-emerald-500">✓ ¡Exacto!</span>
                          ) : (
                            <span className="text-rose-500">
                              ✗ Intenta de nuevo o gira la tarjeta para ver la explicación
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* SUB-TAB C: Find the mistake and correct it */}
            {strangeDaySubTab === 'C' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {STRANGE_DAY_PART_C.map((item) => {
                  const isFlipped = !!flippedPartC[item.id];
                  const isChecked = !!partCChecks[item.id];

                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleFlip(item.id, setFlippedPartC)}
                      className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between select-none ${
                        isFlipped
                          ? isDark
                            ? 'bg-slate-900 border-sky-500 ring-2 ring-sky-500/20'
                            : 'bg-white border-sky-500 ring-2 ring-sky-400/20'
                          : isDark
                          ? 'bg-slate-900 border-white/10'
                          : 'bg-white border-slate-200'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className="text-xs font-mono font-bold text-amber-500 flex items-center gap-1">
                            <AlertTriangle className="w-3.5 h-3.5" />
                            {item.number}. Error Spotting
                          </span>
                          <button
                            type="button"
                            onClick={(e) => handleAudioPlay(`sd-c-${item.id}`, item.correctSentence, e)}
                            className={`w-7 h-7 rounded-lg flex items-center justify-center border shrink-0 transition-all cursor-pointer ${
                              currentlySpeakingId === `sd-c-${item.id}`
                                ? 'bg-sky-600 text-white border-sky-600'
                                : isDark
                                ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                            }`}
                            title="Escuchar oración corregida"
                            aria-label="Escuchar oración corregida"
                          >
                            <Volume2 className="w-3.5 h-3.5 text-sky-500" />
                          </button>
                        </div>

                        {!isFlipped ? (
                          <div>
                            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 mb-3">
                              <p className="text-sm font-bold text-rose-600 dark:text-rose-400 font-mono">
                                ❌ {item.incorrectSentence}
                              </p>
                            </div>

                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setPartCChecks((prev) => ({ ...prev, [item.id]: !prev[item.id] }));
                                playFeedbackSound('click');
                              }}
                              className={`w-full py-2 px-3 rounded-xl border text-xs font-mono font-bold transition-all cursor-pointer ${
                                isChecked
                                  ? 'bg-emerald-600 text-white border-emerald-600'
                                  : isDark
                                  ? 'bg-slate-800 border-white/10 text-slate-200 hover:bg-slate-700'
                                  : 'bg-slate-100 border-slate-200 text-slate-800 hover:bg-slate-200'
                              }`}
                            >
                              {isChecked ? 'Ocultar Corrección' : 'Ver Corrección Inmediata'}
                            </button>

                            {isChecked && (
                              <div className="mt-3 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                                <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                                  ✅ {item.correctSentence}
                                </p>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div>
                            <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400 mb-1">
                              ✅ {item.correctSentence}
                            </p>
                            <p className="text-xs font-medium text-sky-600 dark:text-sky-400 mb-2">
                              {item.translationEs}
                            </p>
                            <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900/80 border border-inherit/20 text-xs space-y-1">
                              <p>
                                Error: <span className="text-rose-500 font-bold font-mono">"{item.mistakeWord}"</span>{' '}
                                ➔ Corrección:{' '}
                                <span className="text-emerald-500 font-bold font-mono">"{item.correctedWord}"</span>
                              </p>
                              <p className="opacity-80 pt-1">{item.ruleEs}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* SUB-TAB D: One last challenge (Creative Ideas) */}
            {strangeDaySubTab === 'D' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {STRANGE_DAY_PART_D.map((item) => {
                  const isFlipped = !!flippedPartD[item.id];

                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleFlip(item.id, setFlippedPartD)}
                      className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between select-none ${
                        isFlipped
                          ? isDark
                            ? 'bg-slate-900 border-sky-500 ring-2 ring-sky-500/20'
                            : 'bg-white border-sky-500 ring-2 ring-sky-400/20'
                          : isDark
                          ? 'bg-slate-900 border-white/10'
                          : 'bg-white border-slate-200'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className="text-xs font-mono font-bold text-sky-500 flex items-center gap-1">
                            <Sparkles className="w-3.5 h-3.5" />
                            {item.number}. Creative Sentence
                          </span>
                          <button
                            type="button"
                            onClick={(e) => handleAudioPlay(`sd-d-${item.id}`, item.sampleAnswerEn, e)}
                            className={`w-7 h-7 rounded-lg flex items-center justify-center border shrink-0 transition-all cursor-pointer ${
                              currentlySpeakingId === `sd-d-${item.id}`
                                ? 'bg-sky-600 text-white border-sky-600'
                                : isDark
                                ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                            }`}
                            title="Escuchar ejemplo creativo"
                            aria-label="Escuchar ejemplo creativo"
                          >
                            <Volume2 className="w-3.5 h-3.5 text-sky-500" />
                          </button>
                        </div>

                        {!isFlipped ? (
                          <div>
                            <p className="text-base font-semibold mb-2">
                              {item.promptPrefixEn}{' '}
                              <span className="text-sky-500 font-mono">__________</span>{' '}
                              {item.promptSuffixEn}
                            </p>
                            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-inherit/20 text-xs">
                              <p className="opacity-80">💡 Ejemplo sugerido:</p>
                              <p className="font-bold text-sky-600 dark:text-sky-400 mt-0.5">
                                {item.sampleAnswerEn}
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <p className="text-sm font-bold text-sky-600 dark:text-sky-400 mb-1">
                              {item.translationEs}
                            </p>
                            <p className="text-xs font-medium mb-2">Ejemplo en español: {item.sampleAnswerEs}</p>
                            <div className="p-2 rounded-xl bg-white dark:bg-slate-900/80 border border-inherit/20 text-xs">
                              <p className="opacity-85">{item.grammarTipEs}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 7: SUMMARY & CHEAT SHEET */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'summary' && (
          <div className="flex flex-col gap-6 animate-in fade-in duration-200">
            <div
              className={`p-6 rounded-3xl border ${
                isDark ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="w-5 h-5 text-amber-500" />
                <h3 className="text-xl font-bold tracking-tight">
                  Cuadro Resumen de Reglas: Present Simple
                </h3>
              </div>
              <p className="text-sm opacity-80 mb-6">
                Guarda este resumen rápido para recordar siempre la concordancia de sujetos y la regla de oro de <strong>DOES</strong>.
              </p>

              {/* Table of Structures */}
              <div className="overflow-x-auto rounded-2xl border border-inherit/20 mb-6">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-100 dark:bg-slate-800 border-b border-inherit/20 font-mono font-bold uppercase">
                      <th className="p-3">Sujetos</th>
                      <th className="p-3">Afirmativo</th>
                      <th className="p-3">Negativo</th>
                      <th className="p-3">Pregunta Sí/No</th>
                      <th className="p-3">Respuesta Corta</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-inherit/20 font-mono">
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                      <td className="p-3 font-bold text-sky-500">I / You / We / They</td>
                      <td className="p-3">work / play / like</td>
                      <td className="p-3 text-rose-500">don't work</td>
                      <td className="p-3 text-sky-500">Do you work?</td>
                      <td className="p-3 text-emerald-500">Yes, I do / No, I don't</td>
                    </tr>
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                      <td className="p-3 font-bold text-amber-500">He / She / It</td>
                      <td className="p-3">works / plays / likes (-s)</td>
                      <td className="p-3 text-rose-500">doesn't work (sin -s)</td>
                      <td className="p-3 text-amber-500">Does he work? (sin -s)</td>
                      <td className="p-3 text-emerald-500">Yes, he does / No, he doesn't</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Golden Rule Highlight Box */}
              <div className="p-5 rounded-2xl bg-sky-500/10 border border-sky-500/30 text-sm flex flex-col gap-2">
                <h4 className="font-bold text-sky-600 dark:text-sky-400 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  ¡LA REGLA MÁGICA: DOES SE LLEVA LA S!
                </h4>
                <p className="opacity-90 leading-relaxed text-xs sm:text-sm">
                  Cuando utilizas <strong>DOES</strong> o <strong>DOESN'T</strong>, el verbo principal queda en su forma base (infinitivo sin "to"):
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1 text-xs font-mono font-bold">
                  <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400">
                    ✅ Does she like pizza?
                  </div>
                  <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-rose-500/30 text-rose-600 dark:text-rose-400 line-through">
                    ❌ Does she likes pizza?
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
