import React, { useState } from 'react';
import {
  Play,
  Check,
  RotateCcw,
  Award,
  ArrowRight,
  ArrowLeft,
  Volume2,
  RefreshCw,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import {
  FAMILY_PICNIC_TESTS,
} from '../../data/familyPicnicData';
import { useTheme } from '../../context/ThemeContext';
import { playFeedbackSound, speakEnglish, stopSpeaking } from '../../utils/audio';
import { FamilyPicnicStoryCard } from './FamilyPicnicStoryCard';
import { ReversibleTextCard } from './ReversibleTextCard';

interface FamilyPicnicTestMasterProps {
  speed: number;
  accent?: 'US' | 'UK';
  onCompleteSection?: () => void;
}

export const FamilyPicnicTestMaster: React.FC<FamilyPicnicTestMasterProps> = ({
  speed,
  accent = 'US',
  onCompleteSection,
}) => {
  const { isDark } = useTheme();

  // testStep: 0 = "Iniciar Test" card; 1..5 = tests 1..5; 6 = Results card
  const [testStep, setTestStep] = useState<number>(0);

  // User answers map: { [key: string]: optionId }
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});

  // Checked tests map: { [stepNumber: number]: boolean }
  const [checkedSteps, setCheckedSteps] = useState<Record<number, boolean>>({});

  // Flipped options map: { [optionId: string]: boolean }
  const [flippedOptions, setFlippedOptions] = useState<Record<string, boolean>>({});

  const isStepChecked = Boolean(checkedSteps[testStep]);

  const handleStartTest = () => {
    playFeedbackSound('click');
    setTestStep(1);
  };

  const handleSelectOption = (key: string, optionId: string) => {
    if (isStepChecked) return;
    playFeedbackSound('click');
    setUserAnswers((prev) => ({ ...prev, [key]: optionId }));
  };

  const handleToggleOptionFlip = (optionId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    playFeedbackSound('click');
    setFlippedOptions((prev) => ({
      ...prev,
      [optionId]: !prev[optionId],
    }));
  };

  const handlePlayOptionAudio = (textEn: string, e: React.MouseEvent) => {
    e.stopPropagation();
    stopSpeaking();
    playFeedbackSound('click');
    speakEnglish(textEn, speed, accent);
  };

  const handleCheckCurrentStep = () => {
    if (isStepChecked) return;

    let isStepCorrect = false;

    if (testStep === 1) {
      isStepCorrect = userAnswers['t1'] === FAMILY_PICNIC_TESTS.test1.correctOptionId;
    } else if (testStep === 2) {
      isStepCorrect = userAnswers['t2'] === FAMILY_PICNIC_TESTS.test2.correctOptionId;
    } else if (testStep === 3) {
      isStepCorrect = userAnswers['t3'] === FAMILY_PICNIC_TESTS.test3.correctOptionId;
    } else if (testStep === 4) {
      isStepCorrect = userAnswers['t4'] === FAMILY_PICNIC_TESTS.test4.correctOptionId;
    } else if (testStep === 5) {
      isStepCorrect = userAnswers['t5'] === FAMILY_PICNIC_TESTS.test5.correctOptionId;
    }

    playFeedbackSound(isStepCorrect ? 'correct' : 'wrong');
    setCheckedSteps((prev) => ({ ...prev, [testStep]: true }));
  };

  const handleNextStep = () => {
    playFeedbackSound('click');
    if (testStep < 5) {
      setTestStep((prev) => prev + 1);
    } else {
      setTestStep(6);
      playFeedbackSound('correct');
      if (onCompleteSection) {
        onCompleteSection();
      }
    }
  };

  const handlePrevStep = () => {
    playFeedbackSound('click');
    if (testStep > 1) {
      setTestStep((prev) => prev - 1);
    }
  };

  const handleRestartTest = () => {
    playFeedbackSound('click');
    setUserAnswers({});
    setCheckedSteps({});
    setFlippedOptions({});
    setTestStep(0);
  };

  /* =========================================================================
     CASE 1: INICIAR TEST CARD (Step 0)
     ========================================================================= */
  if (testStep === 0) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-6 px-4 animate-in fade-in duration-300">
        <div
          className={`w-full max-w-2xl rounded-3xl border p-8 sm:p-10 text-center flex flex-col items-center gap-6 shadow-xl transition-all ${
            isDark
              ? 'bg-slate-900 border-slate-700 text-slate-100 shadow-slate-950/50'
              : 'bg-white border-slate-200 text-slate-900 shadow-slate-200/80'
          }`}
        >
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-600 text-white flex items-center justify-center shadow-lg shadow-amber-500/30">
            <Award className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-mono font-bold tracking-widest text-amber-500 uppercase">
              Evaluación de Sección 2
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Test: The Family Picnic
            </h2>
            <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-md mx-auto">
              Evalúa tu comprensión de la lectura &ldquo;The Family Picnic&rdquo;.
              El test consta de 5 evaluaciones exactas basadas en la historia.
            </p>
          </div>

          <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className={`p-4 rounded-xl border text-center ${
              isDark ? 'bg-slate-800/60 border-slate-700' : 'bg-slate-50 border-slate-200'
            }`}>
              <span className="block text-xl font-bold text-sky-500 font-mono">5</span>
              <span className="text-xs text-slate-500 font-medium">Tests</span>
            </div>
            <div className={`p-4 rounded-xl border text-center ${
              isDark ? 'bg-slate-800/60 border-slate-700' : 'bg-slate-50 border-slate-200'
            }`}>
              <span className="block text-xl font-bold text-emerald-500 font-mono">100%</span>
              <span className="text-xs text-slate-500 font-medium">Comprensión</span>
            </div>
            <div className={`p-4 rounded-xl border text-center ${
              isDark ? 'bg-slate-800/60 border-slate-700' : 'bg-slate-50 border-slate-200'
            }`}>
              <span className="block text-xl font-bold text-purple-500 font-mono">3D</span>
              <span className="text-xs text-slate-500 font-medium">Traducción Reversible</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleStartTest}
            className="w-full sm:w-auto min-w-[220px] px-8 py-3.5 rounded-xl font-bold text-base bg-amber-600 hover:bg-amber-500 text-white shadow-lg shadow-amber-600/30 transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Play className="w-5 h-5 fill-white" />
            <span>Iniciar Test</span>
          </button>
        </div>
      </div>
    );
  }

  /* =========================================================================
     CASE 2: TEST RESULTS / SUMMARY (Step 6)
     ========================================================================= */
  if (testStep === 6) {
    let score = 0;
    const t1Corr = userAnswers['t1'] === FAMILY_PICNIC_TESTS.test1.correctOptionId;
    if (t1Corr) score++;

    const t2Corr = userAnswers['t2'] === FAMILY_PICNIC_TESTS.test2.correctOptionId;
    if (t2Corr) score++;

    const t3Corr = userAnswers['t3'] === FAMILY_PICNIC_TESTS.test3.correctOptionId;
    if (t3Corr) score++;

    const t4Corr = userAnswers['t4'] === FAMILY_PICNIC_TESTS.test4.correctOptionId;
    if (t4Corr) score++;

    const t5Corr = userAnswers['t5'] === FAMILY_PICNIC_TESTS.test5.correctOptionId;
    if (t5Corr) score++;

    const scorePercent = Math.round((score / 5) * 100);
    const isPerfect = score === 5;

    return (
      <div className="w-full flex flex-col items-center justify-center py-6 px-4 animate-in fade-in duration-300">
        <div
          className={`w-full max-w-2xl rounded-3xl border p-8 sm:p-10 text-center flex flex-col items-center gap-6 shadow-xl ${
            isDark
              ? 'bg-slate-900 border-slate-700 text-slate-100 shadow-slate-950/50'
              : 'bg-white border-slate-200 text-slate-900 shadow-slate-200/80'
          }`}
        >
          <div
            className={`w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg ${
              isPerfect
                ? 'bg-gradient-to-tr from-amber-400 to-yellow-500 text-white shadow-amber-500/30'
                : scorePercent >= 60
                ? 'bg-gradient-to-tr from-emerald-500 to-teal-600 text-white shadow-emerald-500/30'
                : 'bg-gradient-to-tr from-rose-500 to-red-600 text-white shadow-rose-500/30'
            }`}
          >
            <Award className="w-10 h-10" />
          </div>

          <div className="space-y-1">
            <span className="text-xs font-mono font-bold tracking-widest text-sky-500 uppercase">
              Resultado Final
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {isPerfect
                ? '¡Excelente! Puntuación Perfecta'
                : scorePercent >= 60
                ? '¡Buen Trabajo!'
                : 'Sigue Practicando'}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Has completado el test de la sección &ldquo;The Family Picnic&rdquo;.
            </p>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-5xl sm:text-6xl font-black font-mono text-sky-600 dark:text-sky-400">
              {scorePercent}%
            </span>
            <span className="text-base sm:text-lg font-mono text-slate-400">
              ({score} de 5 pruebas superadas)
            </span>
          </div>

          {/* Breakdown */}
          <div className="w-full flex flex-col gap-2.5 text-left pt-2">
            {[
              { num: 1, title: 'Test 1: Otro nombre para la historia', ok: t1Corr },
              { num: 2, title: 'Test 2: ¿Por qué estaba emocionado(a)?', ok: t2Corr },
              { num: 3, title: 'Test 3: El padre era muy conocido por...', ok: t3Corr },
              { num: 4, title: 'Test 4: Personas NO mencionadas', ok: t4Corr },
              { num: 5, title: 'Test 5: El/la narrador(a) no quería ir a casa', ok: t5Corr },
            ].map((t) => (
              <div
                key={t.num}
                className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 ${
                  t.ok
                    ? 'border-emerald-300 dark:border-emerald-800 bg-emerald-50/60 dark:bg-emerald-950/20'
                    : 'border-rose-300 dark:border-rose-800 bg-rose-50/60 dark:bg-rose-950/20'
                }`}
              >
                <span className="text-xs sm:text-sm font-semibold">{t.title}</span>
                {t.ok ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                ) : (
                  <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                )}
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={handleRestartTest}
            className="px-6 py-3 rounded-xl font-bold text-sm border flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs hover:scale-105 active:scale-95 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border-slate-300 dark:border-slate-700"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reiniciar Test</span>
          </button>
        </div>
      </div>
    );
  }

  /* =========================================================================
     CASE 3: INDIVIDUAL TESTS 1..5
     ========================================================================= */
  const renderCurrentTestContent = () => {
    switch (testStep) {
      // TEST 1: Drag Cloze (Another name for the story can be...)
      case 1: {
        const t = FAMILY_PICNIC_TESTS.test1;
        const selectedId = userAnswers['t1'];
        const placedOpt = t.options.find((o) => o.id === selectedId);
        const isCorr = selectedId === t.correctOptionId;

        return (
          <div className="flex flex-col gap-5">
            {/* Sentence with blank */}
            <div
              className={`p-5 rounded-2xl border flex flex-col gap-4 shadow-sm ${
                isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex flex-wrap items-center gap-2 text-sm sm:text-base leading-relaxed">
                <span>{t.prefix}</span>

                <div
                  className={`inline-flex items-center justify-center min-w-[200px] h-10 px-3 rounded-xl border-2 border-dashed transition-all ${
                    placedOpt
                      ? isStepChecked
                        ? isCorr
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200 font-bold'
                          : 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-200 font-bold'
                        : 'border-sky-500 bg-sky-50 dark:bg-sky-950/40 text-sky-800 dark:text-sky-200 font-bold'
                      : 'border-slate-300 dark:border-slate-600 bg-slate-100/50 dark:bg-slate-800/50 text-slate-400'
                  }`}
                >
                  {placedOpt ? (
                    <span>{placedOpt.textEn}</span>
                  ) : (
                    <span className="text-xs font-mono text-slate-400 select-none">
                      [ selecciona una opción abajo ]
                    </span>
                  )}
                </div>

                <span>{t.suffix}</span>
              </div>

              <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
                <ReversibleTextCard
                  textEn={t.fullEn}
                  textEs={t.fullEs}
                  speed={speed}
                  accent={accent}
                  minHeightClass="min-h-[46px]"
                />
              </div>
            </div>

            {/* Tokens Bank */}
            <div
              className={`w-full p-4 rounded-xl border flex flex-wrap items-center justify-center gap-2.5 shadow-xs ${
                isDark ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'
              }`}
            >
              {t.options.map((opt) => {
                const isSelected = selectedId === opt.id;
                const isFlipped = Boolean(flippedOptions[opt.id]);

                return (
                  <div
                    key={opt.id}
                    onClick={() => handleSelectOption('t1', opt.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold border-2 transition-all flex items-center gap-2 cursor-pointer ${
                      isSelected
                        ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-300 shadow-md scale-105'
                        : isDark
                        ? 'bg-slate-800 border-slate-600 text-slate-200 hover:border-sky-400'
                        : 'bg-white border-slate-300 text-slate-800 hover:border-sky-400 shadow-xs'
                    }`}
                  >
                    <span>
                      {isFlipped ? (
                        <span className="italic text-emerald-700 dark:text-emerald-300">
                          {opt.textEs}
                        </span>
                      ) : (
                        opt.textEn
                      )}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => handleToggleOptionFlip(opt.id, e)}
                      className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded text-slate-400"
                      title="Voltear traducción"
                    >
                      <RefreshCw className="w-3 h-3" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => handlePlayOptionAudio(opt.textEn, e)}
                      className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded text-sky-500"
                      title="Escuchar"
                    >
                      <Volume2 className="w-3 h-3" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        );
      }

      // TEST 2: Radio (Why was the narrator excited?)
      case 2: {
        const t = FAMILY_PICNIC_TESTS.test2;
        const selectedId = userAnswers['t2'];

        return (
          <div className="flex flex-col gap-4">
            <ReversibleTextCard
              textEn={t.questionEn}
              textEs={t.questionEs}
              speed={speed}
              accent={accent}
              minHeightClass="min-h-[60px]"
            />

            <div className="flex flex-col gap-2.5">
              {t.options.map((opt) => {
                const isSelected = selectedId === opt.id;
                const isOptCorr = opt.id === t.correctOptionId;
                const isFlipped = Boolean(flippedOptions[opt.id]);

                return (
                  <div
                    key={opt.id}
                    onClick={() => handleSelectOption('t2', opt.id)}
                    className={`p-3.5 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      isStepChecked
                        ? isOptCorr
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-200'
                          : isSelected
                          ? 'border-rose-500 bg-rose-50 dark:bg-rose-950/30 text-rose-900 dark:text-rose-200'
                          : 'opacity-50 border-slate-200 dark:border-slate-700'
                        : isSelected
                        ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/40 text-sky-900 dark:text-sky-100 shadow-sm'
                        : isDark
                        ? 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-200'
                        : 'bg-white border-slate-200 hover:border-slate-300 text-slate-800 shadow-xs'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                          isSelected
                            ? isStepChecked
                              ? isOptCorr
                                ? 'border-emerald-500 bg-emerald-500'
                                : 'border-rose-500 bg-rose-500'
                              : 'border-sky-500 bg-sky-500'
                            : 'border-slate-400 bg-transparent'
                        }`}
                      >
                        {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                      <span className="text-sm font-medium leading-relaxed truncate">
                        {isFlipped ? (
                          <span className="italic text-emerald-700 dark:text-emerald-300">
                            {opt.textEs}
                          </span>
                        ) : (
                          opt.textEn
                        )}
                      </span>
                    </div>

                    <div className="shrink-0 flex items-center gap-1">
                      <button
                        type="button"
                        onClick={(e) => handleToggleOptionFlip(opt.id, e)}
                        className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
                        title="Voltear traducción"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => handlePlayOptionAudio(opt.textEn, e)}
                        className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-sky-500"
                        title="Escuchar audio"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      }

      // TEST 3: Drag Cloze (The father was well-known for...)
      case 3: {
        const t = FAMILY_PICNIC_TESTS.test3;
        const selectedId = userAnswers['t3'];
        const placedOpt = t.options.find((o) => o.id === selectedId);
        const isCorr = selectedId === t.correctOptionId;

        return (
          <div className="flex flex-col gap-5">
            {/* Sentence with blank */}
            <div
              className={`p-5 rounded-2xl border flex flex-col gap-4 shadow-sm ${
                isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex flex-wrap items-center gap-2 text-sm sm:text-base leading-relaxed">
                <span>{t.prefix}</span>

                <div
                  className={`inline-flex items-center justify-center min-w-[200px] h-10 px-3 rounded-xl border-2 border-dashed transition-all ${
                    placedOpt
                      ? isStepChecked
                        ? isCorr
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200 font-bold'
                          : 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-200 font-bold'
                        : 'border-sky-500 bg-sky-50 dark:bg-sky-950/40 text-sky-800 dark:text-sky-200 font-bold'
                      : 'border-slate-300 dark:border-slate-600 bg-slate-100/50 dark:bg-slate-800/50 text-slate-400'
                  }`}
                >
                  {placedOpt ? (
                    <span>{placedOpt.textEn}</span>
                  ) : (
                    <span className="text-xs font-mono text-slate-400 select-none">
                      [ selecciona una opción abajo ]
                    </span>
                  )}
                </div>

                <span>{t.suffix}</span>
              </div>

              <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
                <ReversibleTextCard
                  textEn={t.fullEn}
                  textEs={t.fullEs}
                  speed={speed}
                  accent={accent}
                  minHeightClass="min-h-[46px]"
                />
              </div>
            </div>

            {/* Tokens Bank */}
            <div
              className={`w-full p-4 rounded-xl border flex flex-wrap items-center justify-center gap-2.5 shadow-xs ${
                isDark ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'
              }`}
            >
              {t.options.map((opt) => {
                const isSelected = selectedId === opt.id;
                const isFlipped = Boolean(flippedOptions[opt.id]);

                return (
                  <div
                    key={opt.id}
                    onClick={() => handleSelectOption('t3', opt.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold border-2 transition-all flex items-center gap-2 cursor-pointer ${
                      isSelected
                        ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-300 shadow-md scale-105'
                        : isDark
                        ? 'bg-slate-800 border-slate-600 text-slate-200 hover:border-sky-400'
                        : 'bg-white border-slate-300 text-slate-800 hover:border-sky-400 shadow-xs'
                    }`}
                  >
                    <span>
                      {isFlipped ? (
                        <span className="italic text-emerald-700 dark:text-emerald-300">
                          {opt.textEs}
                        </span>
                      ) : (
                        opt.textEn
                      )}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => handleToggleOptionFlip(opt.id, e)}
                      className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded text-slate-400"
                      title="Voltear traducción"
                    >
                      <RefreshCw className="w-3 h-3" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => handlePlayOptionAudio(opt.textEn, e)}
                      className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded text-sky-500"
                      title="Escuchar"
                    >
                      <Volume2 className="w-3 h-3" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        );
      }

      // TEST 4: Radio (Which of these people are NOT mentioned in the story?)
      case 4: {
        const t = FAMILY_PICNIC_TESTS.test4;
        const selectedId = userAnswers['t4'];

        return (
          <div className="flex flex-col gap-4">
            <ReversibleTextCard
              textEn={t.questionEn}
              textEs={t.questionEs}
              speed={speed}
              accent={accent}
              minHeightClass="min-h-[60px]"
            />

            <div className="flex flex-col gap-2.5">
              {t.options.map((opt) => {
                const isSelected = selectedId === opt.id;
                const isOptCorr = opt.id === t.correctOptionId;
                const isFlipped = Boolean(flippedOptions[opt.id]);

                return (
                  <div
                    key={opt.id}
                    onClick={() => handleSelectOption('t4', opt.id)}
                    className={`p-3.5 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      isStepChecked
                        ? isOptCorr
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-200'
                          : isSelected
                          ? 'border-rose-500 bg-rose-50 dark:bg-rose-950/30 text-rose-900 dark:text-rose-200'
                          : 'opacity-50 border-slate-200 dark:border-slate-700'
                        : isSelected
                        ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/40 text-sky-900 dark:text-sky-100 shadow-sm'
                        : isDark
                        ? 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-200'
                        : 'bg-white border-slate-200 hover:border-slate-300 text-slate-800 shadow-xs'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                          isSelected
                            ? isStepChecked
                              ? isOptCorr
                                ? 'border-emerald-500 bg-emerald-500'
                                : 'border-rose-500 bg-rose-500'
                              : 'border-sky-500 bg-sky-500'
                            : 'border-slate-400 bg-transparent'
                        }`}
                      >
                        {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                      <span className="text-sm font-medium leading-relaxed truncate">
                        {isFlipped ? (
                          <span className="italic text-emerald-700 dark:text-emerald-300">
                            {opt.textEs}
                          </span>
                        ) : (
                          opt.textEn
                        )}
                      </span>
                    </div>

                    <div className="shrink-0 flex items-center gap-1">
                      <button
                        type="button"
                        onClick={(e) => handleToggleOptionFlip(opt.id, e)}
                        className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
                        title="Voltear traducción"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => handlePlayOptionAudio(opt.textEn, e)}
                        className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-sky-500"
                        title="Escuchar audio"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      }

      // TEST 5: Radio (The narrator did not want to go home.)
      case 5: {
        const t = FAMILY_PICNIC_TESTS.test5;
        const selectedId = userAnswers['t5'];

        return (
          <div className="flex flex-col gap-4">
            <ReversibleTextCard
              textEn={t.questionEn}
              textEs={t.questionEs}
              speed={speed}
              accent={accent}
              minHeightClass="min-h-[60px]"
            />

            <div className="flex flex-col gap-2.5">
              {t.options.map((opt) => {
                const isSelected = selectedId === opt.id;
                const isOptCorr = opt.id === t.correctOptionId;
                const isFlipped = Boolean(flippedOptions[opt.id]);

                return (
                  <div
                    key={opt.id}
                    onClick={() => handleSelectOption('t5', opt.id)}
                    className={`p-3.5 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      isStepChecked
                        ? isOptCorr
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-200'
                          : isSelected
                          ? 'border-rose-500 bg-rose-50 dark:bg-rose-950/30 text-rose-900 dark:text-rose-200'
                          : 'opacity-50 border-slate-200 dark:border-slate-700'
                        : isSelected
                        ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/40 text-sky-900 dark:text-sky-100 shadow-sm'
                        : isDark
                        ? 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-200'
                        : 'bg-white border-slate-200 hover:border-slate-300 text-slate-800 shadow-xs'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                          isSelected
                            ? isStepChecked
                              ? isOptCorr
                                ? 'border-emerald-500 bg-emerald-500'
                                : 'border-rose-500 bg-rose-500'
                              : 'border-sky-500 bg-sky-500'
                            : 'border-slate-400 bg-transparent'
                        }`}
                      >
                        {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                      <span className="text-sm font-medium leading-relaxed truncate">
                        {isFlipped ? (
                          <span className="italic text-emerald-700 dark:text-emerald-300">
                            {opt.textEs}
                          </span>
                        ) : (
                          opt.textEn
                        )}
                      </span>
                    </div>

                    <div className="shrink-0 flex items-center gap-1">
                      <button
                        type="button"
                        onClick={(e) => handleToggleOptionFlip(opt.id, e)}
                        className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
                        title="Voltear traducción"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => handlePlayOptionAudio(opt.textEn, e)}
                        className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-sky-500"
                        title="Escuchar audio"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      }

      default:
        return null;
    }
  };

  const isCurrentStepAnswered = () => {
    if (testStep === 1) return Boolean(userAnswers['t1']);
    if (testStep === 2) return Boolean(userAnswers['t2']);
    if (testStep === 3) return Boolean(userAnswers['t3']);
    if (testStep === 4) return Boolean(userAnswers['t4']);
    if (testStep === 5) return Boolean(userAnswers['t5']);
    return false;
  };

  return (
    <div className="w-full flex flex-col gap-5 animate-in fade-in duration-200">
      {/* 1. Instruction Card: Reversible */}
      <ReversibleTextCard
        textEn={
          testStep === 1 || testStep === 3
            ? 'Drag the correct answer/s into place.'
            : 'Choose the correct answer.'
        }
        textEs={
          testStep === 1 || testStep === 3
            ? 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.'
            : 'Elige la respuesta correcta.'
        }
        speed={speed}
        accent={accent}
      />

      {/* 2. Main Two-Column Layout */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Story Card */}
        <div className="lg:col-span-6">
          <FamilyPicnicStoryCard speed={speed} accent={accent} />
        </div>

        {/* Right Column: Test Question & Options */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          {/* Header indicator */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-amber-600 text-white font-mono font-bold flex items-center justify-center text-xs">
                {testStep}
              </span>
              <span className="text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Test {testStep} de 5
              </span>
            </div>

            <span className="text-xs font-mono text-slate-400">
              Evaluación {testStep}/5
            </span>
          </div>

          {/* Render Active Test */}
          {renderCurrentTestContent()}

          {/* Test Navigation & Check Buttons */}
          <div className="w-full flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={handlePrevStep}
              disabled={testStep <= 1}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold border transition-all cursor-pointer ${
                testStep <= 1
                  ? 'opacity-40 cursor-not-allowed border-transparent text-slate-400'
                  : isDark
                  ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'
                  : 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Anterior</span>
            </button>

            {!isStepChecked ? (
              <button
                type="button"
                onClick={handleCheckCurrentStep}
                disabled={!isCurrentStepAnswered()}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold shadow-md transition-all cursor-pointer ${
                  !isCurrentStepAnswered()
                    ? 'opacity-50 cursor-not-allowed bg-slate-300 dark:bg-slate-700 text-slate-500'
                    : 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-600/30 hover:scale-105 active:scale-95'
                }`}
              >
                <Check className="w-4 h-4" />
                <span>Comprobar</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNextStep}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold bg-amber-600 hover:bg-amber-500 text-white shadow-md shadow-amber-600/30 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>{testStep === 5 ? 'Ver Resultados' : 'Siguiente'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
