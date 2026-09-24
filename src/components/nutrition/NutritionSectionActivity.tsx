import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Apple } from 'lucide-react';
import {
  NUTRITION_VOCABULARY,
  NUTRITION_DICTATION_1,
  NUTRITION_DICTATION_2,
  NUTRITION_CLOZE_1,
  NUTRITION_CLOZE_2,
} from '../../data/nutritionData';
import { NutritionVocabularyExplore } from './NutritionVocabularyExplore';
import { NutritionMatchingActivity } from './NutritionMatchingActivity';
import { NutritionDictationActivity } from './NutritionDictationActivity';
import { NutritionClozeActivity } from './NutritionClozeActivity';
import { NutritionDialogueActivity } from './NutritionDialogueActivity';
import { NutritionTestActivity } from './NutritionTestActivity';
import { SpeedSelector } from './SpeedSelector';
import { useTheme } from '../../context/ThemeContext';
import { playFeedbackSound } from '../../utils/audio';

export const NutritionSectionActivity: React.FC = () => {
  const { isDark } = useTheme();

  // Activity index: 0 to 7 (Actividad 1 to Actividad 7, and Actividad 8: Test)
  const [currentActivityIndex, setCurrentActivityIndex] = useState(0);
  const [speed, setSpeed] = useState<number>(1.0);
  const [accent, setAccent] = useState<'US' | 'UK'>('US');

  const activities = [
    { id: 'act-1', label: 'Actividad 1', title: 'Vocabulario' },
    { id: 'act-2', label: 'Actividad 2', title: 'Completar Frases' },
    { id: 'act-3', label: 'Actividad 3', title: 'Dictado 1' },
    { id: 'act-4', label: 'Actividad 4', title: 'Dictado 2' },
    { id: 'act-5', label: 'Actividad 5', title: 'La Dieta de Mi Hermana' },
    { id: 'act-6', label: 'Actividad 6', title: 'Conversación' },
    { id: 'act-7', label: 'Actividad 7', title: 'Nutrición en Verano' },
    { id: 'act-8', label: 'Actividad 8: Test', title: 'Evaluación (1-10)' },
  ];

  const handleSelectActivity = (index: number) => {
    playFeedbackSound('click');
    setCurrentActivityIndex(index);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrevActivity = () => {
    if (currentActivityIndex > 0) {
      handleSelectActivity(currentActivityIndex - 1);
    }
  };

  const handleNextActivity = () => {
    if (currentActivityIndex < activities.length - 1) {
      handleSelectActivity(currentActivityIndex + 1);
    }
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto px-4 py-4 flex flex-col gap-6 select-none">
      {/* Top Header Bar: Section Branding & Controls */}
      <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-sky-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-sky-500/20 shadow-xs">
            <Apple className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Sección 5
              </span>
              <span className="text-xs text-slate-400">·</span>
              <span className="text-xs text-slate-500 font-medium">Unit 5</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white">
              Nutrition
            </h1>
          </div>
        </div>

        {/* Global Speech Speed and Accent selector */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <SpeedSelector currentSpeed={speed} onSpeedChange={setSpeed} />

          {/* Accent toggle button */}
          <button
            type="button"
            onClick={() => setAccent((prev) => (prev === 'US' ? 'UK' : 'US'))}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold border transition-all cursor-pointer ${
              isDark
                ? 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800'
                : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200 shadow-xs'
            }`}
            title="Cambiar acento (US / UK)"
          >
            {accent === 'US' ? '🇺🇸 US' : '🇬🇧 UK'}
          </button>
        </div>
      </div>

      {/* Top Activity Navigation Tabs */}
      <div className="w-full overflow-x-auto pb-1 scrollbar-none">
        <div className="flex items-center gap-2 min-w-max">
          {activities.map((act, index) => {
            const isActive = currentActivityIndex === index;
            return (
              <button
                key={act.id}
                type="button"
                onClick={() => handleSelectActivity(index)}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 select-none border ${
                  isActive
                    ? 'bg-sky-600 text-white border-sky-500 shadow-md shadow-md'
                    : isDark
                    ? 'bg-slate-900 hover:bg-slate-800 text-slate-400 border-slate-800 hover:text-slate-200'
                    : 'bg-white hover:bg-slate-50 text-slate-600 border-slate-200 hover:text-slate-900 shadow-xs'
                }`}
              >
                <span>{act.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Floating Side Navigation Arrows for Easy Progression */}
      {currentActivityIndex > 0 && (
        <button
          type="button"
          onClick={handlePrevActivity}
          aria-label="Actividad anterior"
          title="Actividad anterior"
          className={`fixed sm:absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 z-40 w-11 h-11 sm:w-13 sm:h-13 rounded-full flex items-center justify-center border shadow-2xl transition-all cursor-pointer select-none ${
            isDark
              ? 'bg-[#1E293B]/95 hover:bg-sky-600 text-white border-white/20 hover:border-sky-400 shadow-sky-950/70 hover:scale-110 active:scale-95'
              : 'bg-white/95 hover:bg-sky-600 text-slate-800 hover:text-white border-slate-300 hover:border-sky-600 shadow-slate-400/60 hover:scale-110 active:scale-95'
          }`}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {currentActivityIndex < activities.length - 1 && (
        <button
          type="button"
          onClick={handleNextActivity}
          aria-label="Siguiente actividad"
          title="Siguiente actividad"
          className={`fixed sm:absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 z-40 w-11 h-11 sm:w-13 sm:h-13 rounded-full flex items-center justify-center border shadow-2xl transition-all cursor-pointer select-none ${
            isDark
              ? 'bg-[#1E293B]/95 hover:bg-sky-600 text-white border-white/20 hover:border-sky-400 shadow-sky-950/70 hover:scale-110 active:scale-95'
              : 'bg-white/95 hover:bg-sky-600 text-slate-800 hover:text-white border-slate-300 hover:border-sky-600 shadow-slate-400/60 hover:scale-110 active:scale-95'
          }`}
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Main Activity Display based on currentActivityIndex */}
      <div className="w-full min-h-[500px]">
        {currentActivityIndex === 0 && (
          <NutritionVocabularyExplore speed={speed} accent={accent} />
        )}

        {currentActivityIndex === 1 && (
          <NutritionMatchingActivity
            speed={speed}
            accent={accent}
            onNextActivity={handleNextActivity}
          />
        )}

        {currentActivityIndex === 2 && (
          <NutritionDictationActivity
            title="Dictado 1"
            sentences={NUTRITION_DICTATION_1}
            vocabularyList={NUTRITION_VOCABULARY.slice(0, 5)}
            speed={speed}
            accent={accent}
            onNextActivity={handleNextActivity}
          />
        )}

        {currentActivityIndex === 3 && (
          <NutritionDictationActivity
            title="Dictado 2"
            sentences={NUTRITION_DICTATION_2}
            vocabularyList={NUTRITION_VOCABULARY.slice(5, 10)}
            speed={speed}
            accent={accent}
            onNextActivity={handleNextActivity}
          />
        )}

        {currentActivityIndex === 4 && (
          <NutritionClozeActivity
            titleEn={NUTRITION_CLOZE_1.titleEn}
            titleEs={NUTRITION_CLOZE_1.titleEs}
            instructionsEn={NUTRITION_CLOZE_1.instructionsEn}
            instructionsEs={NUTRITION_CLOZE_1.instructionsEs}
            templateParts={NUTRITION_CLOZE_1.templateParts}
            correctAnswers={NUTRITION_CLOZE_1.correctAnswers}
            wordBank={NUTRITION_CLOZE_1.wordBank}
            translationEs={NUTRITION_CLOZE_1.translationEs}
            vocabularyList={NUTRITION_VOCABULARY.slice(0, 5)}
            speed={speed}
            accent={accent}
            onNextActivity={handleNextActivity}
          />
        )}

        {currentActivityIndex === 5 && (
          <NutritionDialogueActivity
            vocabularyList={NUTRITION_VOCABULARY}
            speed={speed}
            accent={accent}
            onNextActivity={handleNextActivity}
          />
        )}

        {currentActivityIndex === 6 && (
          <NutritionClozeActivity
            titleEn={NUTRITION_CLOZE_2.titleEn}
            titleEs={NUTRITION_CLOZE_2.titleEs}
            instructionsEn={NUTRITION_CLOZE_2.instructionsEn}
            instructionsEs={NUTRITION_CLOZE_2.instructionsEs}
            templateParts={NUTRITION_CLOZE_2.templateParts}
            correctAnswers={NUTRITION_CLOZE_2.correctAnswers}
            wordBank={NUTRITION_CLOZE_2.wordBank}
            translationEs={NUTRITION_CLOZE_2.translationEs}
            vocabularyList={NUTRITION_VOCABULARY.slice(4, 9)}
            speed={speed}
            accent={accent}
            onNextActivity={handleNextActivity}
          />
        )}

        {currentActivityIndex === 7 && (
          <NutritionTestActivity speed={speed} accent={accent} />
        )}
      </div>

      {/* Bottom Nav Footer */}
      <div className="w-full flex items-center justify-between pt-6 border-t border-slate-200 dark:border-slate-800">
        <button
          type="button"
          onClick={handlePrevActivity}
          disabled={currentActivityIndex === 0}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold border transition-all cursor-pointer ${
            currentActivityIndex === 0
              ? 'opacity-30 cursor-not-allowed border-transparent text-slate-400'
              : isDark
              ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
              : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200 shadow-xs'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Actividad Anterior</span>
        </button>

        <span className="text-xs font-mono font-bold text-slate-400">
          {currentActivityIndex + 1} de {activities.length}
        </span>

        <button
          type="button"
          onClick={handleNextActivity}
          disabled={currentActivityIndex === activities.length - 1}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold border transition-all cursor-pointer ${
            currentActivityIndex === activities.length - 1
              ? 'opacity-30 cursor-not-allowed border-transparent text-slate-400'
              : 'bg-sky-600 hover:bg-sky-500 text-white border-emerald-600 shadow-xs'
          }`}
        >
          <span>Siguiente Actividad</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
