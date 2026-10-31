import React, { useState } from 'react';
import {
  Award,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Volume2,
  RefreshCw,
  RotateCcw,
  Check,
  HelpCircle,
} from 'lucide-react';
import {
  RELATIONSHIPS_TEST_QUESTIONS,
  TestDropdownItem,
} from '../../data/relationshipsData';
import { speakEnglish, stopSpeaking, playFeedbackSound } from '../../utils/audio';
import { useTheme } from '../../context/ThemeContext';
import { ReversibleTextCard } from './ReversibleTextCard';

interface RelationshipsTestMasterProps {
  speed: number;
  accent?: 'US' | 'UK';
  onCompleteSection?: () => void;
}

export const RelationshipsTestMaster: React.FC<RelationshipsTestMasterProps> = ({
  speed,
  accent = 'US',
  onCompleteSection,
}) => {
  const { isDark } = useTheme();

  // testStep: 0 = "Iniciar Test" landing card, 1..10 = questions 1..10, 11 = results card
  const [testStep, setTestStep] = useState<number>(0);

  // User answers map: { [testId]: selectedOption }
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  // Checked questions map: { [testId]: boolean }
  const [checkedQuestions, setCheckedQuestions] = useState<Record<string, boolean>>({});
  // Card flip state for current question
  const [isQuestionCardFlipped, setIsQuestionCardFlipped] = useState(false);
  // Audio playing state
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const totalQuestions = RELATIONSHIPS_TEST_QUESTIONS.length; // 10 questions
  const currentTestIndex = testStep - 1;
  const currentTest: TestDropdownItem | undefined =
    testStep >= 1 && testStep <= totalQuestions
      ? RELATIONSHIPS_TEST_QUESTIONS[currentTestIndex]
      : undefined;

  const currentSelectedOption = currentTest ? userAnswers[currentTest.id] : undefined;
  const isQuestionChecked = currentTest ? Boolean(checkedQuestions[currentTest.id]) : false;
  const isCorrect = currentTest && currentSelectedOption === currentTest.correctAnswer;

  const handleStartTest = () => {
    playFeedbackSound('click');
    setTestStep(1);
    setIsQuestionCardFlipped(false);
  };

  const handleSelectOption = (testId: string, opt: string) => {
    if (checkedQuestions[testId]) return;
    playFeedbackSound('click');
    setUserAnswers((prev) => ({ ...prev, [testId]: opt }));
  };

  const handleCheckCurrent = () => {
    if (!currentTest || !currentSelectedOption || isQuestionChecked) return;
    const correct = currentSelectedOption === currentTest.correctAnswer;
    playFeedbackSound(correct ? 'correct' : 'wrong');
    setCheckedQuestions((prev) => ({ ...prev, [currentTest.id]: true }));
  };

  const handleNextTest = () => {
    playFeedbackSound('click');
    setIsQuestionCardFlipped(false);
    if (testStep < totalQuestions) {
      setTestStep((prev) => prev + 1);
    } else {
      setTestStep(totalQuestions + 1);
      playFeedbackSound('complete');
      if (onCompleteSection) {
        onCompleteSection();
      }
    }
  };

  const handlePrevTest = () => {
    playFeedbackSound('click');
    setIsQuestionCardFlipped(false);
    if (testStep > 1) {
      setTestStep((prev) => prev - 1);
    }
  };

  const handleRestartTest = () => {
    playFeedbackSound('click');
    setUserAnswers({});
    setCheckedQuestions({});
    setIsQuestionCardFlipped(false);
    setTestStep(0);
  };

  const handleSpeakQuestion = (text: string) => {
    if (isPlayingAudio) {
      stopSpeaking();
      setIsPlayingAudio(false);
      return;
    }
    playFeedbackSound('click');
    speakEnglish(
      text,
      speed,
      accent,
      () => setIsPlayingAudio(true),
      () => setIsPlayingAudio(false)
    );
  };

  // Calculate score
  const score = RELATIONSHIPS_TEST_QUESTIONS.reduce((acc, t) => {
    return userAnswers[t.id] === t.correctAnswer ? acc + 1 : acc;
  }, 0);

  /* =========================================================================
     CASE 1: LANDING CARD "INICIAR TEST"
     ========================================================================= */
  if (testStep === 0) {
    return (
      <div className="w-full flex flex-col items-center gap-6 animate-in fade-in duration-200 py-4 max-w-3xl mx-auto">
        {/* Reversible "Iniciar Test" Card */}
        <div className="w-full bg-white rounded-3xl p-8 border border-slate-200 shadow-md flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-sky-200 mb-4">
            <Award className="w-9 h-9" />
          </div>

          <span className="text-xs font-mono text-sky-600 font-bold uppercase tracking-widest px-3 py-1 bg-sky-50 rounded-full border border-sky-100 mb-2">
            Evaluación Final · Sección 6
          </span>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
            Test: Relationships
          </h2>

          <p className="text-slate-600 text-sm sm:text-base max-w-lg mt-3 leading-relaxed">
            Este test contiene <strong>10 preguntas interactivas con menús desplegables</strong> sobre relaciones familiares, parientes y expresiones de la sección.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full max-w-md my-6 text-left">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[11px] font-bold text-slate-400 block uppercase">Preguntas</span>
              <span className="text-lg font-bold text-slate-800">10 ejercicios</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[11px] font-bold text-slate-400 block uppercase">Tipo</span>
              <span className="text-lg font-bold text-slate-800">Drop-down</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 col-span-2 sm:col-span-1">
              <span className="text-[11px] font-bold text-slate-400 block uppercase">Traducción</span>
              <span className="text-lg font-bold text-sky-600">Tarjetas 3D 🔄</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleStartTest}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700 text-white font-bold text-base shadow-lg shadow-sky-200 flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <span>Iniciar Test</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* 3D Reversible Flip Card for Test Instructions */}
        <div className="w-full">
          <ReversibleTextCard
            title="Instrucciones del Test de Evaluación"
            accent={accent}
            speechRate={speed}
            englishLines={[
              { text: 'Select the correct answer from the drop-down list for each of the 10 questions.' },
              { text: 'Look at the family photo and choose the term that best completes each relationship sentence.' },
            ]}
            spanishLines={[
              { text: 'Selecciona la respuesta correcta de la lista desplegable en cada una de las 10 preguntas.' },
              { text: 'Observa la fotografía familiar y elige el término que mejor completa cada oración sobre relaciones.' },
            ]}
            grammarNote="En cada pregunta podrás voltear la tarjeta con el botón 🔄 para leer la traducción completa y la explicación gramatical sin ver la respuesta expuesta previamente."
          />
        </div>
      </div>
    );
  }

  /* =========================================================================
     CASE 2: RESULTS CARD
     ========================================================================= */
  if (testStep > totalQuestions) {
    const passed = score >= 7;

    return (
      <div className="w-full flex flex-col items-center gap-6 animate-in fade-in duration-200 py-6 max-w-2xl mx-auto">
        <div className="w-full bg-white rounded-3xl p-8 border border-slate-200 shadow-lg text-center space-y-6">
          <div
            className={`w-20 h-20 mx-auto rounded-3xl flex items-center justify-center shadow-xl ${
              passed
                ? 'bg-gradient-to-tr from-emerald-400 to-teal-500 text-white shadow-emerald-200'
                : 'bg-gradient-to-tr from-amber-400 to-orange-500 text-white shadow-amber-200'
            }`}
          >
            <Award className="w-10 h-10" />
          </div>

          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
              Resultado Final del Test
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-800 mt-1">
              {passed ? '¡Felicitaciones! Has aprobado el test' : 'Sigue practicando'}
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              {passed
                ? 'Dominas con éxito el vocabulario de relaciones familiares y colocaciones de esta unidad.'
                : 'Revisa las respuestas incorrectas y vuelve a intentarlo para afianzar tus conocimientos.'}
            </p>
          </div>

          {/* Score display */}
          <div className="inline-flex items-baseline gap-2 px-6 py-3 bg-slate-50 border border-slate-200 rounded-2xl">
            <span className="text-4xl font-black text-slate-800">{score}</span>
            <span className="text-slate-400 font-semibold text-lg">/ {totalQuestions}</span>
            <span className="ml-2 text-xs font-bold uppercase px-2.5 py-1 rounded-full bg-sky-100 text-sky-800">
              {Math.round((score / totalQuestions) * 100)}%
            </span>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={handleRestartTest}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reiniciar Test</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setTestStep(1);
                setIsQuestionCardFlipped(false);
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md shadow-sky-200"
            >
              <span>Revisar Preguntas</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* =========================================================================
     CASE 3: QUESTION STEP (1..10)
     ========================================================================= */
  if (!currentTest) return null;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Test Header */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full uppercase tracking-wider border border-indigo-100">
              Test Evaluativo · Pregunta {testStep} de {totalQuestions}
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-800 mt-2">
            Select the correct answer from the drop-down list.
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            Elige la palabra adecuada en el menú desplegable para completar la frase correctamente.
          </p>
        </div>

        {/* Question pagination stepper */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1">
          {RELATIONSHIPS_TEST_QUESTIONS.map((t, idx) => {
            const stepNum = idx + 1;
            const isAnswered = Boolean(checkedQuestions[t.id]);
            const isCorrectAnswer = userAnswers[t.id] === t.correctAnswer;
            const isCurrent = stepNum === testStep;

            return (
              <button
                key={t.id}
                onClick={() => {
                  setTestStep(stepNum);
                  setIsQuestionCardFlipped(false);
                  playFeedbackSound('click');
                }}
                className={`w-7 h-7 rounded-lg text-xs font-bold font-mono transition-all flex items-center justify-center ${
                  isCurrent
                    ? 'bg-sky-600 text-white ring-2 ring-sky-300 ring-offset-1'
                    : isAnswered
                    ? isCorrectAnswer
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-rose-100 text-rose-800 border border-rose-300'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
                title={`Pregunta ${stepNum}`}
              >
                {stepNum}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Left Photo + Right Question */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Father & Daughter Photo matching the screenshots */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col items-center">
          <div className="relative w-full max-w-sm rounded-2xl overflow-hidden shadow-md border-4 border-white bg-slate-100">
            {/* The father and daughter photo asset */}
            <img
              src="/assets/relationships_test_family.png"
              alt="Father and daughter getting ready"
              className="w-full h-auto object-cover rounded-xl"
              onError={(e) => {
                // Fallback to high quality unsplash image if local asset fails
                (e.target as HTMLImageElement).src =
                  'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80';
              }}
            />
          </div>
          <p className="text-xs font-medium text-slate-500 mt-3 text-center">
            Family moments: dad and daughter breakfast scene
          </p>
        </div>

        {/* Right Column: Dropdown Sentence Exercise */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Pregunta #{currentTest.number}
            </span>
            <button
              type="button"
              onClick={() => handleSpeakQuestion(currentTest.fullSentence)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold bg-sky-50 text-sky-700 hover:bg-sky-100 border border-sky-200 transition-colors"
              title="Escuchar oración completa"
            >
              <Volume2 className="w-4 h-4" />
              <span>Escuchar Frase</span>
            </button>
          </div>

          {/* Interactive sentence with Dropdown */}
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-150 text-lg sm:text-xl font-medium leading-relaxed text-slate-800 flex flex-wrap items-center gap-2">
            <span>{currentTest.sentenceBefore}</span>

            {/* Dropdown Select */}
            <select
              value={currentSelectedOption || ''}
              disabled={isQuestionChecked}
              onChange={(e) => handleSelectOption(currentTest.id, e.target.value)}
              className={`px-3.5 py-1.5 text-base sm:text-lg font-bold rounded-xl border-2 transition-all cursor-pointer ${
                isQuestionChecked
                  ? isCorrect
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-800 ring-2 ring-emerald-200'
                    : 'bg-rose-50 border-rose-500 text-rose-800 ring-2 ring-rose-200'
                  : 'bg-white border-sky-400 text-sky-900 shadow-sm hover:border-sky-500 focus:ring-2 focus:ring-sky-200'
              }`}
            >
              <option value="">-- select --</option>
              {currentTest.options.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>

            <span>{currentTest.sentenceAfter}</span>
          </div>

          {/* Result Feedback message */}
          {isQuestionChecked && (
            <div
              className={`p-4 rounded-2xl border flex items-center gap-3 animate-in fade-in duration-150 ${
                isCorrect
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                  : 'bg-rose-50 border-rose-200 text-rose-900'
              }`}
            >
              {isCorrect ? (
                <>
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                  <div>
                    <p className="font-bold text-sm">¡Correcto!</p>
                    <p className="text-xs text-emerald-800 mt-0.5">
                      Excelente elección: "{currentTest.correctAnswer}".
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <XCircle className="w-6 h-6 text-rose-600 shrink-0" />
                  <div>
                    <p className="font-bold text-sm">Incorrecto</p>
                    <p className="text-xs text-rose-800 mt-0.5">
                      La respuesta correcta es: <strong>{currentTest.correctAnswer}</strong>
                    </p>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Controls Bar: Check + Prev / Next */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100">
            <div className="flex items-center gap-2">
              {!isQuestionChecked ? (
                <button
                  type="button"
                  onClick={handleCheckCurrent}
                  disabled={!currentSelectedOption}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all shadow-sm ${
                    !currentSelectedOption
                      ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      : 'bg-sky-600 hover:bg-sky-700 text-white shadow-sky-200 cursor-pointer'
                  }`}
                >
                  <Check className="w-4 h-4" />
                  <span>Comprobar</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setCheckedQuestions((prev) => {
                      const updated = { ...prev };
                      delete updated[currentTest.id];
                      return updated;
                    });
                    playFeedbackSound('click');
                  }}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Intentar de nuevo</span>
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrevTest}
                disabled={testStep <= 1}
                className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                title="Pregunta anterior"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleNextTest}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md shadow-indigo-100 transition-all cursor-pointer"
              >
                <span>{testStep === totalQuestions ? 'Ver Resultados' : 'Siguiente'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3D Reversible Flip Card for Current Test Question */}
      <div className="mt-6 pt-4 border-t border-slate-200">
        <ReversibleTextCard
          title={`Traducción y Explicación · Pregunta ${currentTest.number}`}
          accent={accent}
          speechRate={speed}
          englishLines={[{ text: currentTest.fullSentence }]}
          spanishLines={[{ text: currentTest.translation }]}
          grammarNote={currentTest.grammarNote}
        />
      </div>
    </div>
  );
};
