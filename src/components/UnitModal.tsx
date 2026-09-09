import React, { useState, useEffect } from 'react';
import {
  X,
  Clock,
  ArrowLeft,
  ChevronRight,
  Layers,
  Sparkles,
  BookOpen,
  CheckCircle2,
} from 'lucide-react';
import { Unit, UnitProgress, UnitSection } from '../types';
import { LessonCarousel } from './LessonCarousel';
import { FlashcardDeck } from './FlashcardDeck';
import { useTheme } from '../context/ThemeContext';

interface UnitModalProps {
  unit: Unit;
  progress?: UnitProgress;
  onClose: () => void;
  onCompleteUnit: (unitId: number, score: number) => void;
  onToggleMasteredCard: (cardId: string) => void;
  masteredCardIds: string[];
  onSelectNextUnit?: () => void;
  onSelectPrevUnit?: () => void;
  hasNextUnit: boolean;
  hasPrevUnit: boolean;
  accent: 'US' | 'UK';
  speechRate: number;
}

export const UnitModal: React.FC<UnitModalProps> = ({
  unit,
  progress,
  onClose,
  onCompleteUnit,
  onToggleMasteredCard,
  masteredCardIds,
  onSelectNextUnit,
  onSelectPrevUnit,
  hasNextUnit,
  hasPrevUnit,
  accent,
  speechRate,
}) => {
  const { isDark } = useTheme();
  const [isTitleFlipped, setIsTitleFlipped] = useState(false);
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);

  useEffect(() => {
    setIsTitleFlipped(false);
    setSelectedSectionId(null);
  }, [unit.id]);

  const hasSections = Boolean(unit.sections && unit.sections.length > 0);
  const sections = unit.sections || [];
  const activeSection = selectedSectionId
    ? sections.find((s) => s.id === selectedSectionId) || null
    : null;

  // Build the active unit payload for LessonCarousel or FlashcardDeck
  const activeUnitContent: Unit = activeSection
    ? {
        ...unit,
        sectionId: activeSection.id,
        title: activeSection.title,
        titleEs: activeSection.titleEs,
        subtitle: activeSection.subtitle || unit.subtitle,
        description: activeSection.description || unit.description,
        imageUrl: activeSection.imageUrl || unit.imageUrl,
        lessonText: activeSection.lessonText,
        readingStory: activeSection.readingStory,
        flashcards: activeSection.flashcards || [],
        exercises: activeSection.exercises || [],
        dialogue: activeSection.dialogue || [],
        grammar: activeSection.grammar,
      }
    : unit;

  const hasContent =
    Boolean(activeUnitContent.lessonText) ||
    Boolean(activeUnitContent.readingStory) ||
    (activeUnitContent.exercises && activeUnitContent.exercises.length > 0) ||
    (activeUnitContent.flashcards && activeUnitContent.flashcards.length > 0);

  const displayTitle = activeSection ? activeSection.title : unit.title;
  const displayTitleEs = activeSection ? activeSection.titleEs : unit.titleEs;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
      <div
        className={`relative w-[92vw] sm:w-[90vw] max-w-[90vw] rounded-2xl shadow-2xl border overflow-hidden flex flex-col max-h-[94vh] transition-colors duration-200 ${
          isDark ? 'bg-[#0F172A] text-white border-white/10' : 'bg-white text-slate-900 border-slate-200'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div
          className={`px-5 py-4 flex items-center justify-between border-b transition-colors ${
            isDark ? 'bg-[#111827] text-white border-white/10' : 'bg-slate-50 text-slate-900 border-slate-200'
          }`}
        >
          <div className="flex items-center gap-3">
            {/* Back button to sections grid if inside a section */}
            {hasSections && activeSection && (
              <button
                id="back-to-sections-btn"
                onClick={() => setSelectedSectionId(null)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-xl border text-xs font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer mr-1 ${
                  isDark
                    ? 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10 hover:text-white'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900 shadow-xs'
                }`}
                title="Volver a la lista de secciones de la unidad"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Secciones</span>
              </button>
            )}

            <span className="w-9 h-9 rounded-xl bg-indigo-600 text-white font-black flex items-center justify-center text-base font-mono shadow-sm shrink-0">
              {activeSection
                ? `${unit.number}.${activeSection.number}`
                : String(unit.number).padStart(2, '0')}
            </span>

            <div className="flex items-center gap-2.5">
              {/* Reversible Title Card */}
              <div
                role="button"
                tabIndex={0}
                onClick={() => setIsTitleFlipped((prev) => !prev)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setIsTitleFlipped((prev) => !prev);
                  }
                }}
                className="perspective-1000 cursor-pointer select-none group focus:outline-none"
              >
                <div
                  className={`grid grid-cols-1 grid-rows-1 transition-transform duration-500 transform-style-3d ${
                    isTitleFlipped ? 'rotate-y-180' : ''
                  }`}
                >
                  {/* Front face: English */}
                  <div
                    className={`col-start-1 row-start-1 backface-hidden px-3.5 py-1.5 rounded-xl border flex items-center justify-center transition-all ${
                      isDark
                        ? 'bg-white/5 border-white/10 group-hover:border-white/25 group-hover:bg-white/10 text-white'
                        : 'bg-white border-slate-200 group-hover:border-indigo-300 group-hover:shadow-xs text-slate-900'
                    }`}
                  >
                    <h2 className="text-base sm:text-lg font-bold tracking-tight whitespace-nowrap">
                      {displayTitle}
                    </h2>
                  </div>

                  {/* Back face: Spanish */}
                  <div
                    className={`col-start-1 row-start-1 backface-hidden rotate-y-180 px-3.5 py-1.5 rounded-xl border flex items-center justify-center transition-all ${
                      isDark
                        ? 'bg-indigo-950/50 border-indigo-500/40 text-indigo-200'
                        : 'bg-indigo-50/90 border-indigo-200 text-indigo-900'
                    }`}
                  >
                    <span className="text-sm sm:text-base font-serif italic whitespace-nowrap">
                      {displayTitleEs}
                    </span>
                  </div>
                </div>
              </div>

              {progress?.completed && !activeSection && (
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 text-[10px] font-bold font-mono uppercase tracking-wider">
                  Completed
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className={`p-2 rounded-xl transition-colors cursor-pointer border ${
                isDark
                  ? 'text-slate-200 hover:text-white hover:bg-white/10 border-transparent hover:border-white/10'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 border-transparent'
              }`}
              title="Cerrar modal (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Section Navigation Tabs Bar (Visible when sections exist) */}
        {hasSections && (
          <div
            className={`px-4 py-2 border-b flex items-center gap-2 overflow-x-auto no-scrollbar transition-colors ${
              isDark ? 'bg-slate-900/90 border-white/10' : 'bg-slate-100/90 border-slate-200'
            }`}
          >
            <span
              className={`text-[11px] font-mono font-bold uppercase tracking-wider whitespace-nowrap px-2 ${
                isDark ? 'text-slate-300' : 'text-slate-700'
              }`}
            >
              Secciones:
            </span>

            {sections.map((sec) => {
              const isSelected = activeSection?.id === sec.id;
              return (
                <button
                  key={sec.id}
                  id={`section-tab-${sec.id}`}
                  onClick={() => {
                    setIsTitleFlipped(false);
                    setSelectedSectionId(sec.id);
                  }}
                  className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 border ${
                    isSelected
                      ? isDark
                        ? 'bg-indigo-600 text-white border-indigo-500 shadow-sm'
                        : 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                      : isDark
                      ? 'bg-white/5 text-white/70 border-white/10 hover:bg-white/10 hover:text-white'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-200/70 hover:text-slate-900'
                  }`}
                >
                  <span className="font-mono text-[10px] font-bold opacity-80">
                    {sec.number}.
                  </span>
                  <span>{sec.title}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Modal Body Content with scrolling */}
        <div
          className={`p-4 sm:p-6 overflow-y-auto flex-1 transition-colors ${
            isDark ? 'bg-[#0F172A] text-white' : 'bg-slate-50/50 text-slate-900'
          }`}
        >
          {/* Case 1: Unit has sections and no section is selected -> Show Sections Grid */}
          {hasSections && !activeSection ? (
            <div className="w-full max-w-[90vw] mx-auto py-3">
              <div className="text-center mb-8">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border border-indigo-500/30 mb-2">
                  <Layers className="w-3.5 h-3.5" />
                  {unit.title}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
                  Selecciona una Sección
                </h3>
                <p
                  className={`text-sm mt-1 max-w-lg mx-auto ${
                    isDark ? 'text-slate-200' : 'text-slate-700'
                  }`}
                >
                  Esta unidad consta de 6 partes. Elige cualquiera de las secciones para iniciar el estudio interactivo con audio y ejercicios.
                </p>
              </div>

              {/* 6 Sections Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {sections.map((section) => {
                  const hasSecContent =
                    Boolean(section.lessonText) ||
                    Boolean(section.readingStory) ||
                    Boolean(section.exercises && section.exercises.length > 0);

                  return (
                    <div
                      key={section.id}
                      id={`section-card-${section.id}`}
                      onClick={() => {
                        setIsTitleFlipped(false);
                        setSelectedSectionId(section.id);
                      }}
                      className={`group relative rounded-2xl border p-5 flex flex-col justify-between transition-all duration-200 cursor-pointer overflow-hidden ${
                        isDark
                          ? 'bg-slate-900/70 border-white/10 hover:border-indigo-500/70 hover:bg-slate-800/80 hover:shadow-[0_0_25px_rgba(99,102,241,0.15)]'
                          : 'bg-white border-slate-200 hover:border-indigo-500 hover:shadow-md'
                      }`}
                    >
                      {/* Top section identifier */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="w-7 h-7 rounded-lg bg-indigo-600 text-white font-mono font-bold text-xs flex items-center justify-center shadow-xs">
                            {String(section.number).padStart(2, '0')}
                          </span>
                          <span
                            className={`text-[11px] font-mono font-bold uppercase tracking-wider ${
                              isDark ? 'text-indigo-400' : 'text-indigo-600'
                            }`}
                          >
                            Sección {section.number}
                          </span>
                        </div>

                        {hasSecContent ? (
                          <span className="px-2 py-0.5 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-[10px] font-mono font-bold uppercase tracking-wider">
                            Lista
                          </span>
                        ) : (
                          <span
                            className={`px-2 py-0.5 rounded-md text-[10px] font-mono uppercase tracking-wider border ${
                              isDark
                                ? 'bg-white/5 border-white/10 text-slate-300'
                                : 'bg-slate-100 border-slate-200 text-slate-700'
                            }`}
                          >
                            Pendiente
                          </span>
                        )}
                      </div>

                      {/* Section Titles */}
                      <div className="mb-4">
                        <h4 className="text-lg font-bold tracking-tight group-hover:text-indigo-500 transition-colors">
                          {section.title}
                        </h4>
                        <p
                          className={`text-xs italic font-serif mt-0.5 ${
                            isDark ? 'text-slate-300' : 'text-slate-600'
                          }`}
                        >
                          {section.titleEs}
                        </p>

                        {section.subtitle && (
                          <p
                            className={`text-xs mt-2 line-clamp-2 ${
                              isDark ? 'text-slate-300' : 'text-slate-600'
                            }`}
                          >
                            {section.subtitle}
                          </p>
                        )}
                      </div>

                      {/* Card Action footer */}
                      <div
                        className={`pt-3 border-t flex items-center justify-between text-xs font-semibold ${
                          isDark ? 'border-white/10 text-indigo-400' : 'border-slate-100 text-indigo-600'
                        }`}
                      >
                        <span>Abrir sección</span>
                        <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : !hasContent ? (
            /* Case 2: Selected section or unit without content */
            <div className="py-12 px-4 flex flex-col items-center justify-center text-center max-w-md mx-auto">
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${
                  isDark
                    ? 'bg-white/5 border border-white/10 text-indigo-400'
                    : 'bg-indigo-50 border border-indigo-100 text-indigo-600'
                }`}
              >
                <Clock className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold">
                {activeSection
                  ? `Sección ${activeSection.number}: ${activeSection.title}`
                  : `Unidad ${unit.number}: ${unit.title}`}
              </h3>
              <p
                className={`text-sm mt-2 leading-relaxed ${
                  isDark ? 'text-slate-200' : 'text-slate-700'
                }`}
              >
                Esta sección está lista en la estructura de la unidad. Por favor indícame el texto y los ejercicios de esta sección y la activaremos de inmediato con audio, pronunciación y tarjetas reversibles.
              </p>
              {hasSections ? (
                <button
                  onClick={() => setSelectedSectionId(null)}
                  className="mt-6 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-mono font-bold uppercase tracking-wider cursor-pointer"
                >
                  Volver a las 6 Secciones
                </button>
              ) : (
                <button
                  onClick={onClose}
                  className="mt-6 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-mono font-bold uppercase tracking-wider cursor-pointer"
                >
                  Volver a la Lección 1
                </button>
              )}
            </div>
          ) : activeUnitContent.lessonText ||
            activeUnitContent.readingStory ||
            (activeUnitContent.exercises && activeUnitContent.exercises.length > 0) ? (
            /* Case 3: Lesson, Reading Story or Exercises -> Render LessonCarousel */
            <LessonCarousel
              unit={activeUnitContent}
              accent={accent}
              speechRate={speechRate}
              onCompleteUnit={(score) => onCompleteUnit(unit.id, score)}
              onToggleMasteredCard={onToggleMasteredCard}
              masteredCardIds={masteredCardIds}
            />
          ) : (
            /* Case 4: Flashcards */
            <FlashcardDeck
              cards={activeUnitContent.flashcards}
              unitNumber={unit.number}
              unitTitle={activeUnitContent.title}
              masteredIds={masteredCardIds}
              onToggleMastered={onToggleMasteredCard}
              accent={accent}
              speechRate={speechRate}
            />
          )}
        </div>
      </div>
    </div>
  );
};
