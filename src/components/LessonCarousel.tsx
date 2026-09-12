import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  BookOpen,
  CreditCard,
  CheckSquare,
  MessageSquare,
  RotateCw,
  Award,
  Layers,
  Volume2,
  Users,
  Play,
} from 'lucide-react';
import { Unit } from '../types';
import { speakEnglish, playFeedbackSound, stopSpeaking } from '../utils/audio';
import { MatchingTableExercise } from './MatchingTableExercise';
import { DropdownCompletionExercise } from './DropdownCompletionExercise';
import { TrueFalseSelectionExercise } from './TrueFalseSelectionExercise';
import { RadioChoiceExercise } from './RadioChoiceExercise';
import { WritingAiFeedbackExercise } from './WritingAiFeedbackExercise';
import { UnitTestActivity } from './UnitTestActivity';
import { AudioPlayerCard } from './AudioPlayerCard';
import { ReadingStoryCard } from './ReadingStoryCard';
import { ReadingComprehensionExercise } from './ReadingComprehensionExercise';
import { PictureOrderingExercise } from './PictureOrderingExercise';
import { SpeechResponseExercise } from './SpeechResponseExercise';
import { RoleplayPracticeExercise } from './RoleplayPracticeExercise';
import { DragDropSentenceExercise } from './DragDropSentenceExercise';
import { ExercisesView } from './ExercisesView';
import { FlashcardDeck } from './FlashcardDeck';
import { DialogueAndGrammarView } from './DialogueAndGrammarView';
import { VocabularyExploreActivity } from './VocabularyExploreActivity';
import { VocabularyDictationExercise } from './VocabularyDictationExercise';
import { DragDropClozeExercise } from './DragDropClozeExercise';
import { ClassificationTableExercise } from './ClassificationTableExercise';
import { CheckboxMultiSelectExercise } from './CheckboxMultiSelectExercise';
import { DialogueDropdownExercise } from './DialogueDropdownExercise';
import { DragWordToImageExercise } from './DragWordToImageExercise';
import { FoodExploreExercise } from './FoodExploreExercise';
import { FoodDropdownExercise } from './FoodDropdownExercise';
import { FoodTrueFalseExercise } from './FoodTrueFalseExercise';
import { FoodClipsDropdownExercise } from './FoodClipsDropdownExercise';
import { DialogueExploreExercise } from './DialogueExploreExercise';
import { DialogueOrderingExercise } from './DialogueOrderingExercise';
import { InteractiveConversationExercise } from './InteractiveConversationExercise';
import { CountableQuantifiersActivity } from './CountableQuantifiersActivity';
import { BePastMasterclassActivity } from './BePastMasterclassActivity';
import { DirectionsToMuseumActivity } from './DirectionsToMuseumActivity';
import { CleanHouseAgencyActivity } from './CleanHouseAgencyActivity';
import { NewsstandActivity } from './NewsstandActivity';
import { PresentSimpleActivity } from './PresentSimpleActivity';
import { PresentSimpleQuestionsActivity } from './PresentSimpleQuestionsActivity';
import { PresentSimpleWhQuestionsActivity } from './PresentSimpleWhQuestionsActivity';
import { FOOD_SECTION_LESSON } from '../data/foodSectionData';
import { useTheme } from '../context/ThemeContext';
import {
  DropdownCompletionExercise as DropdownCompletionExerciseType,
  TrueFalseSelectionExercise as TrueFalseSelectionExerciseType,
  RadioChoiceExercise as RadioChoiceExerciseType,
  WritingAiFeedbackExercise as WritingAiFeedbackExerciseType,
  SpeechResponseExercise as SpeechResponseExerciseType,
  RoleplayPracticeExercise as RoleplayPracticeExerciseType,
  DragDropSentenceExercise as DragDropSentenceExerciseType,
  UnitTestExercise as UnitTestExerciseType,
  ReadingStoryExercise as ReadingStoryExerciseType,
  ReadingComprehensionExercise as ReadingComprehensionExerciseType,
  MatchingExercise as MatchingExerciseType,
  PictureOrderingExercise as PictureOrderingExerciseType,
  ReadingStory,
  VocabularyExploreExercise as VocabularyExploreExerciseType,
  VocabularyDictationExercise as VocabularyDictationExerciseType,
  DragDropClozeExercise as DragDropClozeExerciseType,
  DialogueDropdownExercise as DialogueDropdownExerciseType,
  DragWordToImageExercise as DragWordToImageExerciseType,
  AudioClipsDropdownExercise as AudioClipsDropdownExerciseType,
} from '../types';

interface LessonCarouselProps {
  unit: Unit;
  accent: 'US' | 'UK';
  speechRate: number;
  onCompleteUnit: (score: number) => void;
  onToggleMasteredCard: (cardId: string) => void;
  masteredCardIds: string[];
}

export const LessonCarousel: React.FC<LessonCarouselProps> = ({
  unit,
  accent,
  speechRate,
  onCompleteUnit,
  onToggleMasteredCard,
  masteredCardIds,
}) => {
  const { isDark } = useTheme();

  // Activity slides
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [playingSentenceIdx, setPlayingSentenceIdx] = useState<number | null>(null);

  // Speed control state
  const [currentRate, setCurrentRate] = useState<number>(speechRate);
  const [showTranscriptInExplore, setShowTranscriptInExplore] = useState<boolean>(true);

  useEffect(() => {
    setCurrentRate(speechRate);
  }, [speechRate]);

  useEffect(() => {
    setCurrentSlide(0);
    setIsFlipped(false);
    setIsPlayingAudio(false);
    setPlayingSentenceIdx(null);
    stopSpeaking();
  }, [unit.id, unit.title]);

  const lesson = unit.lessonText;

  // Build slides array dynamically based on available content in the unit
  const readingStoryExercise = unit.exercises.find((ex) => ex.type === 'reading-story') as
    | ReadingStoryExerciseType
    | undefined;
  const readingStory = unit.readingStory || readingStoryExercise?.story;

  const readingComprehensionExercises = unit.exercises.filter(
    (ex) => ex.type === 'reading-comprehension'
  ) as ReadingComprehensionExerciseType[];
  const matchingExercises = unit.exercises.filter(
    (ex) => ex.type === 'matching-table'
  ) as MatchingExerciseType[];
  const pictureOrderingExercises = unit.exercises.filter(
    (ex) => ex.type === 'picture-ordering'
  ) as PictureOrderingExerciseType[];
  const dropdownExercise = unit.exercises.find(
    (ex) => ex.type === 'dropdown-completion'
  ) as DropdownCompletionExerciseType | undefined;
  const trueFalseExercise = unit.exercises.find(
    (ex) => ex.type === 'true-false-selection'
  ) as TrueFalseSelectionExerciseType | undefined;
  const radioChoiceExercises = unit.exercises.filter(
    (ex) => ex.type === 'radio-choice'
  ) as RadioChoiceExerciseType[];
  const writingExercises = unit.exercises.filter(
    (ex) => ex.type === 'writing-ai-feedback'
  ) as WritingAiFeedbackExerciseType[];
  const speechResponseExercises = unit.exercises.filter(
    (ex) => ex.type === 'speech-response'
  ) as SpeechResponseExerciseType[];
  const roleplayExercises = unit.exercises.filter(
    (ex) => ex.type === 'roleplay-practice'
  ) as RoleplayPracticeExerciseType[];
  const dragDropSentenceExercises = unit.exercises.filter(
    (ex) => ex.type === 'drag-drop-sentence'
  ) as DragDropSentenceExerciseType[];
  const unitTestExercise = unit.exercises.find(
    (ex) => ex.type === 'unit-test'
  ) as UnitTestExerciseType | undefined;
  const otherExercises = unit.exercises.filter(
    (ex) =>
      ex.type !== 'matching-table' &&
      ex.type !== 'picture-ordering' &&
      ex.type !== 'dropdown-completion' &&
      ex.type !== 'true-false-selection' &&
      ex.type !== 'radio-choice' &&
      ex.type !== 'writing-ai-feedback' &&
      ex.type !== 'speech-response' &&
      ex.type !== 'roleplay-practice' &&
      ex.type !== 'drag-drop-sentence' &&
      ex.type !== 'reading-story' &&
      ex.type !== 'reading-comprehension' &&
      ex.type !== 'classification-table' &&
      ex.type !== 'checkbox-multiselect' &&
      ex.type !== 'unit-test'
  );

  const isCustomSequentialUnit =
    unit.sectionId === 'shopping-2' ||
    (unit.id as any) === 'shopping-2' ||
    unit.sectionId === 'food' ||
    (unit.id as any) === 'food' ||
    unit.sectionId === 'dieters-feeling-great' ||
    (unit.id as any) === 'dieters-feeling-great' ||
    unit.sectionId === 'piece-of-cake' ||
    (unit.id as any) === 'piece-of-cake' ||
    unit.sectionId === 'countable-quantifiers' ||
    (unit.id as any) === 'countable-quantifiers' ||
    unit.sectionId === 'be-past-masterclass' ||
    (unit.id as any) === 'be-past-masterclass' ||
    unit.sectionId === 'directions-to-the-museum' ||
    (unit.id as any) === 'directions-to-the-museum' ||
    unit.sectionId === 'clean-house-agency' ||
    (unit.id as any) === 'clean-house-agency' ||
    unit.sectionId === 'newsstand' ||
    (unit.id as any) === 'newsstand' ||
    unit.sectionId === 'present-simple-statements' ||
    (unit.id as any) === 'present-simple-statements' ||
    unit.sectionId === 'present-simple-yes-no-questions' ||
    (unit.id as any) === 'present-simple-yes-no-questions' ||
    unit.sectionId === 'present-simple-wh-questions' ||
    (unit.id as any) === 'present-simple-wh-questions' ||
    Boolean(
      unit.exercises &&
        unit.exercises.some(
          (ex) =>
            ex.type === 'vocabulary-explore' ||
            ex.type === 'vocabulary-dictation' ||
            ex.type === 'drag-drop-cloze' ||
            ex.type === 'dialogue-dropdown' ||
            ex.type === 'drag-word-to-image' ||
            ex.type === 'audio-clips-dropdown' ||
            ex.type === 'classification-table' ||
            ex.type === 'checkbox-multiselect' ||
            (ex.type as string) === 'checkbox-multi-select' ||
            ex.type === 'dialogue-explore' ||
            ex.type === 'dialogue-ordering' ||
            ex.type === 'interactive-conversation' ||
            ex.type === 'countable-quantifiers' ||
            ex.type === 'be-past-masterclass' ||
            (ex.type as string) === 'directions-explore' ||
            (ex.type as string) === 'clean-house-agency' ||
            (ex.type as string) === 'newsstand-activity' ||
            (ex.type as string) === 'present-simple-statements' ||
            (ex.type as string) === 'present-simple-yes-no-questions' ||
            (ex.type as string) === 'present-simple-wh-questions'
        )
    );

  const slides = isCustomSequentialUnit
    ? unit.exercises.map((ex, idx) => {
        let icon = CheckSquare;
        let title = (ex as any).title || `Actividad ${idx + 1}`;
        if (ex.type === 'dialogue-explore') {
          icon = Play;
        } else if (ex.type === 'food-explore' || ex.id?.includes('explore')) {
          icon = BookOpen;
          if (!(ex as any).title) title = `Actividad ${idx + 1}`;
        } else if (ex.type === 'reading-story') {
          icon = BookOpen;
        } else if (ex.type === 'reading-comprehension') {
          icon = CheckSquare;
        } else if (ex.type === 'classification-table') {
          icon = Layers;
        } else if (ex.type === 'checkbox-multiselect' || (ex.type as string) === 'checkbox-multi-select') {
          icon = CheckSquare;
        } else if (ex.type === 'writing-ai-feedback') {
          icon = BookOpen;
        } else if (ex.type === 'drag-word-to-image') {
          icon = Layers;
        } else if (ex.type === 'matching-table') {
          icon = Layers;
        } else if (ex.type === 'radio-choice') {
          icon = CheckSquare;
        } else if (ex.type === 'speech-response') {
          icon = Volume2;
        } else if (ex.type === 'dialogue-ordering') {
          icon = Layers;
        } else if (ex.type === 'roleplay-practice') {
          icon = Users;
        } else if (ex.type === 'interactive-conversation') {
          icon = MessageSquare;
        } else if (ex.type === 'vocabulary-explore') {
          icon = BookOpen;
          if (!(ex as any).title) title = 'Vocabulario';
        } else if (ex.type === 'vocabulary-dictation') {
          icon = Volume2;
          if (!(ex as any).title) title = (ex as any).title || 'Dictado';
        } else if (ex.type === 'drag-drop-cloze') {
          icon = CheckSquare;
        } else if (ex.type === 'dialogue-dropdown') {
          icon = MessageSquare;
          if (!(ex as any).title) title = 'Diálogo';
        } else if (ex.type === 'dropdown-completion') {
          icon = CheckSquare;
        } else if (ex.type === 'true-false-selection') {
          icon = CheckSquare;
        } else if (ex.type === 'audio-clips-dropdown') {
          icon = Volume2;
        } else if (ex.type === 'unit-test') {
          icon = Award;
          if (!(ex as any).title) title = `Actividad ${idx + 1}: Test`;
        } else if (ex.type === 'countable-quantifiers') {
          icon = BookOpen;
          if (!(ex as any).title) title = (ex as any).title || 'Quantifiers Masterclass';
        } else if (ex.type === 'be-past-masterclass') {
          icon = BookOpen;
          if (!(ex as any).title) title = (ex as any).title || 'BE in the Past Masterclass';
        }
        return {
          id: `seq-ex-${ex.id}`,
          exercise: ex,
          title,
          icon,
        };
      })
    : [
    ...(lesson ? [{ id: 'explore', title: '', icon: BookOpen }] : []),
    ...(readingStory ? [{ id: 'reading-story', title: '', icon: BookOpen }] : []),
    ...readingComprehensionExercises.map((ex) => ({
      id: `reading-comprehension-${ex.id}`,
      exercise: ex,
      title: '',
      icon: CheckSquare,
    })),
    ...matchingExercises.map((ex) => ({
      id: `matching-${ex.id}`,
      exercise: ex,
      title: '',
      icon: CheckSquare,
    })),
    ...pictureOrderingExercises.map((ex) => ({
      id: `picture-ordering-${ex.id}`,
      exercise: ex,
      title: '',
      icon: CheckSquare,
    })),
    ...(dropdownExercise ? [{ id: 'dropdown-completion', title: '', icon: CheckSquare }] : []),
    ...(trueFalseExercise ? [{ id: 'true-false', title: '', icon: CheckSquare }] : []),
    ...radioChoiceExercises.map((ex) => ({
      id: `radio-choice-${ex.id}`,
      exercise: ex,
      title: '',
      icon: CheckSquare,
    })),
    ...writingExercises.map((ex) => ({
      id: `writing-ai-${ex.id}`,
      exercise: ex,
      title: '',
      icon: CheckSquare,
    })),
    ...speechResponseExercises.map((ex) => ({
      id: `speech-response-${ex.id}`,
      exercise: ex,
      title: '',
      icon: CheckSquare,
    })),
    ...roleplayExercises.map((ex) => ({
      id: `roleplay-practice-${ex.id}`,
      exercise: ex,
      title: '',
      icon: MessageSquare,
    })),
    ...dragDropSentenceExercises.map((ex) => ({
      id: `drag-drop-sentence-${ex.id}`,
      exercise: ex,
      title: '',
      icon: CheckSquare,
    })),
    ...(unitTestExercise ? [{ id: 'unit-test', title: 'Test', icon: Award }] : []),
    ...(otherExercises.length > 0 ? [{ id: 'exercises', title: 'Ejercicios de Comprensión', icon: CheckSquare }] : []),
    ...(unit.flashcards.length > 0 ? [{ id: 'flashcards', title: 'Tarjetas de Vocabulario', icon: CreditCard }] : []),
    ...(unit.dialogue.length > 0 || unit.grammar ? [{ id: 'dialogue', title: 'Diálogo & Gramática', icon: MessageSquare }] : []),
  ];

  const handlePlaySentence = (sentenceEn: string, idx: number, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (playingSentenceIdx === idx && (window.speechSynthesis?.speaking)) {
      stopSpeaking();
      setPlayingSentenceIdx(null);
      return;
    }
    stopSpeaking();
    setPlayingSentenceIdx(idx);
    setIsPlayingAudio(false);
    speakEnglish(
      sentenceEn,
      currentRate,
      accent,
      () => setPlayingSentenceIdx(idx),
      () => setPlayingSentenceIdx(null)
    );
  };

  const handleFlipCard = () => {
    playFeedbackSound('flip');
    setIsFlipped(!isFlipped);
  };

  const goToSlide = (idx: number) => {
    playFeedbackSound('click');
    stopSpeaking();
    setIsPlayingAudio(false);
    setPlayingSentenceIdx(null);
    setCurrentSlide(idx);
  };

  const safeCurrentSlide = slides.length > 0 ? Math.min(Math.max(0, currentSlide), slides.length - 1) : 0;

  const nextSlide = () => {
    if (safeCurrentSlide < slides.length - 1) {
      goToSlide(safeCurrentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (safeCurrentSlide > 0) {
      goToSlide(safeCurrentSlide - 1);
    }
  };

  // Keyboard navigation (< and >)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeTag = document.activeElement?.tagName.toLowerCase();
      if (activeTag === 'input' || activeTag === 'textarea') return;

      if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [safeCurrentSlide, slides.length]);

  return (
    <div className="relative w-full flex flex-col items-center">
      
      {/* Floating Previous Activity Button (<) */}
      {slides.length > 1 && (
        <button
          id="floating-prev-activity-btn"
          onClick={prevSlide}
          disabled={safeCurrentSlide === 0}
          className={`fixed sm:absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 z-40 w-11 h-11 sm:w-13 sm:h-13 rounded-full flex items-center justify-center border shadow-2xl transition-all cursor-pointer select-none ${
            safeCurrentSlide === 0
              ? 'opacity-0 pointer-events-none scale-75'
              : isDark
              ? 'bg-[#1E293B]/95 hover:bg-indigo-600 text-white border-white/20 hover:border-indigo-400 shadow-indigo-950/70 hover:scale-110 active:scale-95'
              : 'bg-white/95 hover:bg-indigo-600 text-slate-800 hover:text-white border-slate-300 hover:border-indigo-600 shadow-slate-400/60 hover:scale-110 active:scale-95'
          }`}
          title={
            safeCurrentSlide > 0 && slides[safeCurrentSlide - 1]
              ? slides[safeCurrentSlide - 1]?.title
                ? `Actividad anterior: ${slides[safeCurrentSlide - 1]?.title}`
                : 'Actividad anterior'
              : 'Inicio'
          }
          aria-label="Actividad anterior"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {/* Floating Next Activity Button (>) */}
      {slides.length > 1 && (
        <button
          id="floating-next-activity-btn"
          onClick={nextSlide}
          disabled={safeCurrentSlide >= slides.length - 1}
          className={`fixed sm:absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 z-40 w-11 h-11 sm:w-13 sm:h-13 rounded-full flex items-center justify-center border shadow-2xl transition-all cursor-pointer select-none ${
            safeCurrentSlide >= slides.length - 1
              ? 'opacity-0 pointer-events-none scale-75'
              : isDark
              ? 'bg-[#1E293B]/95 hover:bg-indigo-600 text-white border-white/20 hover:border-indigo-400 shadow-indigo-950/70 hover:scale-110 active:scale-95'
              : 'bg-white/95 hover:bg-indigo-600 text-slate-800 hover:text-white border-slate-300 hover:border-indigo-600 shadow-slate-400/60 hover:scale-110 active:scale-95'
          }`}
          title={
            safeCurrentSlide < slides.length - 1 && slides[safeCurrentSlide + 1]
              ? slides[safeCurrentSlide + 1]?.title
                ? `Siguiente actividad: ${slides[safeCurrentSlide + 1]?.title}`
                : 'Siguiente actividad'
              : 'Fin'
          }
          aria-label="Siguiente actividad"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Main Content Area framed with padding so floating buttons don't overlap */}
      <div className="w-full px-2 sm:px-6 md:px-8 flex flex-col">
        
        {/* Minimalist Top Activity Status Indicator & Dots */}
        {slides.length > 1 && (
          <div className="w-full flex items-center justify-between gap-3 mb-6 pb-2 border-b border-inherit">
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider ${
                isDark
                  ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                  : 'bg-indigo-100 text-indigo-700 border border-indigo-200'
              }`}>
                Actividad {slides.length > 0 ? safeCurrentSlide + 1 : 0} de {slides.length}
              </span>
              {slides[safeCurrentSlide]?.title ? (
                <span className={`text-xs sm:text-sm font-medium ${isDark ? 'text-white/70' : 'text-slate-700'}`}>
                  {slides[safeCurrentSlide]?.title}
                </span>
              ) : null}
            </div>

            {/* Quick Dots Navigator */}
            <div className="flex items-center gap-1.5 shrink-0">
              {slides.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => goToSlide(idx)}
                  className={`h-2.5 rounded-full transition-all cursor-pointer ${
                    safeCurrentSlide === idx
                      ? 'w-7 bg-indigo-600 shadow-xs'
                      : isDark
                      ? 'w-2.5 bg-white/20 hover:bg-white/40'
                      : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                  }`}
                  title={s?.title ? `Ir a Actividad ${idx + 1}: ${s?.title}` : `Ir a Actividad ${idx + 1}`}
                  aria-label={`Actividad ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Activity 0: Audio Media Player & Texto Principal como Tarjeta Reversible */}
        {slides[safeCurrentSlide]?.id === 'explore' && lesson && (
          <div className="w-full flex flex-col items-center gap-6 animate-in fade-in duration-200 py-2">
            <div className="w-full flex flex-col lg:flex-row gap-6 items-stretch justify-center">
              {/* Audio Player Card (diseño optimizado y balanceado) */}
              <div className="w-full max-w-[310px] sm:max-w-[330px] mx-auto lg:mx-0 shrink-0 flex flex-col">
                <AudioPlayerCard
                  audioText={lesson.audioText}
                  sentences={lesson.sentences}
                  accent={accent}
                  initialPlaybackRate={currentRate}
                  currentSentenceIdx={playingSentenceIdx}
                  onSentenceChange={(idx) => setPlayingSentenceIdx(idx)}
                  onToggleTranscript={() => setShowTranscriptInExplore((prev) => !prev)}
                  isTranscriptVisible={showTranscriptInExplore}
                  imageSrc={lesson.imageSrc}
                  totalDurationSeconds={lesson.durationSeconds}
                  speakerGender={lesson.speakerGender}
                />
              </div>

              {/* 3D Reversible Flip Card - Ampliada para contener todo el texto con comodidad */}
              {showTranscriptInExplore && (
                <div className="w-full flex-1 perspective-1000 min-h-[500px] sm:min-h-[530px] flex flex-col">
                  <div
                    id="lesson-flip-card"
                    onClick={handleFlipCard}
                    className={`relative w-full h-full min-h-[500px] sm:min-h-[530px] rounded-3xl cursor-pointer shadow-xl transition-transform duration-500 transform-style-3d select-none ${
                      isFlipped ? 'rotate-y-180' : ''
                    }`}
                  >
                
                {/* ANVERSO / FRONT: Texto en Inglés */}
                <div
                  className={`absolute inset-0 w-full h-full rounded-3xl p-6 sm:p-8 flex flex-col justify-between border backface-hidden shadow-xl transition-colors duration-200 overflow-hidden ${
                    isDark
                      ? 'bg-slate-900 border-white/10 text-white'
                      : 'bg-white border-slate-200 text-slate-900 shadow-md'
                  }`}
                >
                  {/* Card Top Header: Lesson Badge + Speaker button (only icon) */}
                  <div className="flex items-center justify-between gap-3 pb-3 border-b border-inherit/40 shrink-0">
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider ${
                        isDark ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' : 'bg-indigo-100 text-indigo-700 border border-indigo-200'
                      }`}>
                        Inglés
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePlaySentence(lesson.audioText, -1, e);
                        }}
                        className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                          isDark
                            ? 'bg-slate-800 hover:bg-slate-700 text-indigo-300 border-white/10'
                            : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border-indigo-200'
                        }`}
                        aria-label="Audio"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Card Center: Main English Text (Clickable sentences for individual pronunciation) */}
                  <div className="flex-1 my-2 py-2 overflow-y-auto flex items-center pr-1">
                    <p className="text-base sm:text-lg md:text-[18px] leading-relaxed sm:leading-loose font-sans font-medium tracking-tight">
                      {(lesson.sentences || []).map((sent, idx) => {
                        const isCurrent = playingSentenceIdx === idx;
                        return (
                          <span
                            key={idx}
                            onClick={(e) => handlePlaySentence(sent.en, idx, e)}
                            className={`inline cursor-pointer rounded-lg px-1.5 py-0.5 transition-all duration-150 mx-0.5 ${
                              isCurrent
                                ? isDark
                                ? 'bg-indigo-500 text-white font-bold ring-2 ring-indigo-400'
                                : 'bg-indigo-600 text-white font-bold ring-2 ring-indigo-300'
                                : isDark
                                ? 'hover:bg-indigo-500/20 text-slate-100 hover:text-white'
                                : 'hover:bg-indigo-100 text-slate-800 hover:text-indigo-950'
                            }`}
                          >
                            {sent.en}{' '}
                          </span>
                        );
                      })}
                    </p>
                  </div>

                  {/* Card Footer */}
                  <div className="pt-3 border-t border-inherit/30 flex items-center justify-end text-xs text-slate-600 dark:text-slate-300 shrink-0">
                    <span className="font-mono text-[11px] sm:text-xs text-slate-600 dark:text-slate-400">{(lesson.sentences || []).length} oraciones</span>
                  </div>

                </div>

                {/* REVERSO / BACK: Traducción al Español */}
                <div
                  className={`absolute inset-0 w-full h-full rounded-3xl p-6 sm:p-8 flex flex-col justify-between border backface-hidden rotate-y-180 shadow-xl transition-colors duration-200 overflow-hidden ${
                    isDark
                      ? 'bg-slate-900 border-emerald-500/40 text-white'
                      : 'bg-white border-emerald-300 text-slate-900 shadow-md'
                  }`}
                >
                  {/* Card Back Header: Speaker button (only icon) */}
                  <div className="flex items-center justify-between gap-3 pb-3 border-b border-inherit/40 shrink-0">
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider ${
                        isDark ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                      }`}>
                        Español
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePlaySentence(lesson.audioText, -1, e);
                        }}
                        className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                          isDark
                            ? 'bg-slate-800 hover:bg-slate-700 text-emerald-300 border-white/10'
                            : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-emerald-200'
                        }`}
                        aria-label="Audio"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Card Back Center: Spanish Translation */}
                  <div className="flex-1 my-2 py-2 overflow-y-auto flex items-center pr-1">
                    <p className="text-base sm:text-lg md:text-[18px] leading-relaxed sm:leading-loose font-serif italic text-slate-900 dark:text-emerald-100 whitespace-pre-line">
                      {lesson.textEs}
                    </p>
                  </div>

                  {/* Card Back Footer */}
                  <div className="pt-3 border-t border-inherit/30 flex items-center justify-end text-xs text-slate-600 dark:text-slate-400 shrink-0">
                    <span className="font-mono text-[11px] sm:text-xs text-slate-600 dark:text-slate-400">{(lesson.sentences || []).length} oraciones</span>
                  </div>

                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    )}

        {/* Activity: Reading Story (e.g. Wrong Color) */}
        {slides[safeCurrentSlide]?.id === 'reading-story' && readingStory && (
          <div className="w-full flex flex-col items-center gap-6 animate-in fade-in duration-200 py-2">
            <ReadingStoryCard
              story={readingStory}
              accent={accent}
              speechRate={currentRate}
            />
          </div>
        )}

        {/* Activity: Reading Comprehension with Story & Questions (e.g. Wrong Color Activity 2) */}
        {slides[safeCurrentSlide]?.id?.startsWith('reading-comprehension-') && (
          <div className="flex flex-col gap-6 animate-in fade-in duration-200">
            {(() => {
              const currentSlideObj = slides[safeCurrentSlide] as {
                id: string;
                exercise?: ReadingComprehensionExerciseType;
              };
              const ex = currentSlideObj?.exercise;
              if (!ex) return null;
              return (
                <ReadingComprehensionExercise
                  key={ex.id}
                  exercise={ex}
                  accent={accent}
                  speechRate={currentRate}
                  onSuccess={() => {
                    onCompleteUnit(100);
                  }}
                />
              );
            })()}
          </div>
        )}

        {/* Activity: Matching Table / Drag & Drop */}
        {(slides[safeCurrentSlide]?.id === 'matching' || slides[safeCurrentSlide]?.id?.startsWith('matching-')) && (
          <div className="flex flex-col gap-6 animate-in fade-in duration-200">
            {(() => {
              const currentSlideObj = slides[safeCurrentSlide] as {
                id: string;
                exercise?: MatchingExerciseType;
              };
              const ex = currentSlideObj?.exercise || matchingExercises[0];
              if (!ex) return null;
              return (
                <MatchingTableExercise
                  key={ex.id}
                  instructionText={ex.instructions || 'Listen to the voice mail message, and fill in the correct information.'}
                  instructionTextEs={ex.instructionsEs}
                  audioPrompt={ex.audioPrompt || lesson?.audioText}
                  lessonText={lesson}
                  story={ex.story || readingStory}
                  columnAHeader={ex.columnAHeader}
                  columnAHeaderEs={ex.columnAHeaderEs}
                  columnBHeader={ex.columnBHeader}
                  columnBHeaderEs={ex.columnBHeaderEs}
                  pairs={ex.pairs}
                  optionsPool={ex.optionsPool}
                  optionsPoolEs={ex.optionsPoolEs}
                  accent={accent}
                  speechRate={currentRate}
                  onSuccess={() => {
                    onCompleteUnit(100);
                  }}
                />
              );
            })()}
          </div>
        )}

        {/* Activity: Picture Ordering (Chronological order from images) */}
        {(slides[safeCurrentSlide]?.id === 'picture-ordering' || slides[safeCurrentSlide]?.id?.startsWith('picture-ordering-')) && (
          <div className="flex flex-col gap-6 animate-in fade-in duration-200">
            {(() => {
              const currentSlideObj = slides[safeCurrentSlide] as {
                id: string;
                exercise?: PictureOrderingExerciseType;
              };
              const ex = currentSlideObj?.exercise || pictureOrderingExercises[0];
              if (!ex) return null;
              return (
                <PictureOrderingExercise
                  key={ex.id}
                  instructionText={ex.instructions}
                  instructionTextEs={ex.instructionsEs}
                  audioPrompt={ex.audioPrompt || lesson?.audioText}
                  story={ex.story || readingStory}
                  items={ex.items}
                  initialOrder={ex.initialOrder}
                  accent={accent}
                  speechRate={currentRate}
                  onSuccess={() => {
                    onCompleteUnit(100);
                  }}
                />
              );
            })()}
          </div>
        )}

        {/* Activity 3: Dropdown Sentence Completion from User Image */}
        {slides[safeCurrentSlide]?.id === 'dropdown-completion' && dropdownExercise && (
          <div className="flex flex-col gap-6 animate-in fade-in duration-200">
            <DropdownCompletionExercise
              exercise={dropdownExercise}
              accent={accent}
              speechRate={currentRate}
              onSuccess={() => {
                onCompleteUnit(100);
              }}
            />
          </div>
        )}

        {/* Activity 4: True/False Sentence Selection from User Image */}
        {slides[safeCurrentSlide]?.id === 'true-false' && trueFalseExercise && (
          <div className="flex flex-col gap-6 animate-in fade-in duration-200">
            <TrueFalseSelectionExercise
              exercise={trueFalseExercise}
              accent={accent}
              speechRate={currentRate}
              onSuccess={() => {
                onCompleteUnit(100);
              }}
            />
          </div>
        )}

        {/* Activity 5 & 6: Choose the best answers to the questions below from User Images */}
        {slides[safeCurrentSlide]?.id?.startsWith('radio-choice-') && (
          <div className="flex flex-col gap-6 animate-in fade-in duration-200">
            {(() => {
              const currentSlideObj = slides[safeCurrentSlide] as { id: string; exercise?: RadioChoiceExerciseType };
              const ex = currentSlideObj?.exercise;
              if (!ex) return null;
              return (
                <RadioChoiceExercise
                  key={ex.id}
                  exercise={ex}
                  accent={accent}
                  speechRate={currentRate}
                  onSuccess={() => {
                    onCompleteUnit(100);
                  }}
                />
              );
            })()}
          </div>
        )}

        {/* Activity: Writing Exercise with AI Feedback and Reversible Cards */}
        {(slides[safeCurrentSlide]?.id === 'writing-ai' || slides[safeCurrentSlide]?.id?.startsWith('writing-ai-')) && (
          <div className="flex flex-col gap-6 animate-in fade-in duration-200">
            {(() => {
              const currentSlideObj = slides[safeCurrentSlide] as { id: string; exercise?: WritingAiFeedbackExerciseType };
              const ex = currentSlideObj?.exercise || writingExercises[0];
              if (!ex) return null;
              return (
                <WritingAiFeedbackExercise
                  key={ex.id}
                  exercise={ex}
                  accent={accent}
                  speechRate={currentRate}
                  onSuccess={() => {
                    onCompleteUnit(100);
                  }}
                />
              );
            })()}
          </div>
        )}

        {/* Activity: Speech Response (What's the best response to the statement/question?) */}
        {slides[safeCurrentSlide]?.id?.startsWith('speech-response-') && (
          <div className="flex flex-col gap-6 animate-in fade-in duration-200">
            {(() => {
              const currentSlideObj = slides[safeCurrentSlide] as { id: string; exercise?: SpeechResponseExerciseType };
              const ex = currentSlideObj?.exercise;
              if (!ex) return null;
              return (
                <SpeechResponseExercise
                  key={ex.id}
                  exercise={ex}
                  accent={accent}
                  speechRate={currentRate}
                  onSuccess={() => {
                    onCompleteUnit(100);
                  }}
                />
              );
            })()}
          </div>
        )}

        {/* Activity: Roleplay Practice (Practice dialogue characters) */}
        {slides[safeCurrentSlide]?.id?.startsWith('roleplay-practice-') && (
          <div className="flex flex-col gap-6 animate-in fade-in duration-200">
            {(() => {
              const currentSlideObj = slides[safeCurrentSlide] as { id: string; exercise?: RoleplayPracticeExerciseType };
              const ex = currentSlideObj?.exercise;
              if (!ex) return null;
              return (
                <RoleplayPracticeExercise
                  key={ex.id}
                  exercise={ex}
                  accent={accent}
                  speechRate={currentRate}
                  onSuccess={() => {
                    onCompleteUnit(100);
                  }}
                />
              );
            })()}
          </div>
        )}

        {/* Activity: Drag Drop Sentence Exercise (Be-Past Statements Act 2 - 11) */}
        {slides[safeCurrentSlide]?.id?.startsWith('drag-drop-sentence-') && (
          <div className="flex flex-col gap-6 animate-in fade-in duration-200">
            {(() => {
              const currentSlideObj = slides[safeCurrentSlide] as { id: string; exercise?: DragDropSentenceExerciseType };
              const ex = currentSlideObj?.exercise;
              if (!ex) return null;
              return (
                <DragDropSentenceExercise
                  key={ex.id}
                  exercise={ex}
                  accent={accent}
                  speechRate={currentRate}
                  onSuccess={() => {
                    onCompleteUnit(100);
                  }}
                />
              );
            })()}
          </div>
        )}

        {/* Activity: Unit Mastery Test (Start Test card and individual tests) */}
        {slides[safeCurrentSlide]?.id === 'unit-test' && unitTestExercise && (
          <div className="flex flex-col gap-6 animate-in fade-in duration-200">
            <UnitTestActivity
              exercise={unitTestExercise}
              accent={accent}
              speechRate={currentRate}
              onSuccess={() => {
                onCompleteUnit(100);
              }}
            />
          </div>
        )}

        {/* Sequential Exercises for Custom Units (Shopping 2 and others) */}
        {slides[safeCurrentSlide]?.id?.startsWith('seq-ex-') && (() => {
          const currentSlideObj = slides[safeCurrentSlide] as { id: string; exercise?: any };
          const ex = currentSlideObj?.exercise;
          if (!ex) return null;

          if (ex.type === 'drag-word-to-image') {
            return (
              <div className="flex flex-col gap-6 animate-in fade-in duration-200">
                <DragWordToImageExercise
                  exercise={ex}
                  accent={accent}
                  speechRate={currentRate}
                  onSuccess={() => onCompleteUnit(100)}
                />
              </div>
            );
          }

          if (ex.type === 'food-explore') {
            return (
              <div className="flex flex-col gap-6 animate-in fade-in duration-200">
                <FoodExploreExercise
                  audioText={FOOD_SECTION_LESSON.audioText || ''}
                  sentences={FOOD_SECTION_LESSON.sentences}
                  accent={accent}
                  speechRate={currentRate}
                  onSuccess={() => onCompleteUnit(100)}
                />
              </div>
            );
          }

          if (ex.type === 'dialogue-explore') {
            return (
              <div className="flex flex-col gap-6 animate-in fade-in duration-200">
                <DialogueExploreExercise
                  exercise={ex}
                  accent={accent}
                  speechRate={currentRate}
                  onSuccess={() => onCompleteUnit(100)}
                />
              </div>
            );
          }

          if (ex.type === 'dropdown-completion') {
            return (
              <div className="flex flex-col gap-6 animate-in fade-in duration-200">
                <FoodDropdownExercise
                  exercise={ex}
                  accent={accent}
                  speechRate={currentRate}
                  onSuccess={() => onCompleteUnit(100)}
                />
              </div>
            );
          }

          if (ex.type === 'true-false-selection') {
            return (
              <div className="flex flex-col gap-6 animate-in fade-in duration-200">
                <FoodTrueFalseExercise
                  exercise={ex}
                  accent={accent}
                  speechRate={currentRate}
                  onSuccess={() => onCompleteUnit(100)}
                />
              </div>
            );
          }

          if (ex.type === 'audio-clips-dropdown') {
            return (
              <div className="flex flex-col gap-6 animate-in fade-in duration-200">
                <FoodClipsDropdownExercise
                  exercise={ex}
                  accent={accent}
                  speechRate={currentRate}
                  onSuccess={() => onCompleteUnit(100)}
                />
              </div>
            );
          }

          if (ex.type === 'vocabulary-explore') {
            return (
              <div className="flex flex-col gap-6 animate-in fade-in duration-200">
                <VocabularyExploreActivity
                  exercise={ex}
                  accent={accent}
                  speechRate={currentRate}
                  onSuccess={() => onCompleteUnit(100)}
                />
              </div>
            );
          }

          if (ex.type === 'matching-table') {
            return (
              <div className="flex flex-col gap-6 animate-in fade-in duration-200">
                <MatchingTableExercise
                  exercise={ex}
                  instructionText={ex.instructions}
                  instructionTextEs={ex.instructionsEs}
                  audioPrompt={ex.audioPrompt}
                  story={ex.story}
                  columnAHeader={ex.columnAHeader}
                  columnAHeaderEs={ex.columnAHeaderEs}
                  columnBHeader={ex.columnBHeader}
                  columnBHeaderEs={ex.columnBHeaderEs}
                  pairs={ex.pairs || []}
                  optionsPool={ex.optionsPool || []}
                  optionsPoolEs={ex.optionsPoolEs}
                  accent={accent}
                  speechRate={currentRate}
                  onSuccess={() => onCompleteUnit(100)}
                />
              </div>
            );
          }

          if (ex.type === 'vocabulary-dictation') {
            return (
              <div className="flex flex-col gap-6 animate-in fade-in duration-200">
                <VocabularyDictationExercise
                  exercise={ex}
                  accent={accent}
                  speechRate={currentRate}
                  onSuccess={() => onCompleteUnit(100)}
                />
              </div>
            );
          }

          if (ex.type === 'drag-drop-cloze') {
            return (
              <div className="flex flex-col gap-6 animate-in fade-in duration-200">
                <DragDropClozeExercise
                  exercise={ex}
                  accent={accent}
                  speechRate={currentRate}
                  onSuccess={() => onCompleteUnit(100)}
                />
              </div>
            );
          }

          if (ex.type === 'reading-story') {
            return (
              <div className="flex flex-col gap-6 animate-in fade-in duration-200">
                <ReadingStoryCard
                  story={ex.story}
                  accent={accent}
                  speechRate={currentRate}
                />
              </div>
            );
          }

          if (ex.type === 'reading-comprehension') {
            return (
              <div className="flex flex-col gap-6 animate-in fade-in duration-200">
                <ReadingComprehensionExercise
                  exercise={ex}
                  accent={accent}
                  speechRate={currentRate}
                  onSuccess={() => onCompleteUnit(100)}
                />
              </div>
            );
          }

          if (ex.type === 'classification-table') {
            return (
              <div className="flex flex-col gap-6 animate-in fade-in duration-200">
                <ClassificationTableExercise
                  exercise={ex}
                  accent={accent}
                  speechRate={currentRate}
                  onSuccess={() => onCompleteUnit(100)}
                />
              </div>
            );
          }

          if (ex.type === 'checkbox-multiselect' || (ex.type as string) === 'checkbox-multi-select') {
            return (
              <div className="flex flex-col gap-6 animate-in fade-in duration-200">
                <CheckboxMultiSelectExercise
                  exercise={ex}
                  accent={accent}
                  speechRate={currentRate}
                  onSuccess={() => onCompleteUnit(100)}
                />
              </div>
            );
          }

          if (ex.type === 'writing-ai-feedback') {
            return (
              <div className="flex flex-col gap-6 animate-in fade-in duration-200">
                <WritingAiFeedbackExercise
                  exercise={ex}
                  accent={accent}
                  speechRate={currentRate}
                  onSuccess={() => onCompleteUnit(100)}
                />
              </div>
            );
          }

          if (ex.type === 'dialogue-dropdown') {
            return (
              <div className="flex flex-col gap-6 animate-in fade-in duration-200">
                <DialogueDropdownExercise
                  exercise={ex}
                  accent={accent}
                  speechRate={currentRate}
                  onSuccess={() => onCompleteUnit(100)}
                />
              </div>
            );
          }

          if (ex.type === 'unit-test') {
            return (
              <div className="flex flex-col gap-6 animate-in fade-in duration-200">
                <UnitTestActivity
                  exercise={ex}
                  accent={accent}
                  speechRate={currentRate}
                  onSuccess={() => onCompleteUnit(100)}
                />
              </div>
            );
          }

          if (ex.type === 'radio-choice') {
            return (
              <div className="flex flex-col gap-6 animate-in fade-in duration-200">
                <RadioChoiceExercise
                  exercise={ex}
                  accent={accent}
                  speechRate={currentRate}
                  onSuccess={() => onCompleteUnit(100)}
                />
              </div>
            );
          }

          if (ex.type === 'speech-response') {
            return (
              <div className="flex flex-col gap-6 animate-in fade-in duration-200">
                <SpeechResponseExercise
                  exercise={ex}
                  accent={accent}
                  speechRate={currentRate}
                  onSuccess={() => onCompleteUnit(100)}
                />
              </div>
            );
          }

          if (ex.type === 'dialogue-ordering') {
            return (
              <div className="flex flex-col gap-6 animate-in fade-in duration-200">
                <DialogueOrderingExercise
                  exercise={ex}
                  accent={accent}
                  speechRate={currentRate}
                  onSuccess={() => onCompleteUnit(100)}
                />
              </div>
            );
          }

          if (ex.type === 'roleplay-practice') {
            return (
              <div className="flex flex-col gap-6 animate-in fade-in duration-200">
                <RoleplayPracticeExercise
                  exercise={ex}
                  accent={accent}
                  speechRate={currentRate}
                  onSuccess={() => onCompleteUnit(100)}
                />
              </div>
            );
          }

          if (ex.type === 'interactive-conversation') {
            return (
              <div className="flex flex-col gap-6 animate-in fade-in duration-200">
                <InteractiveConversationExercise
                  exercise={ex}
                  accent={accent}
                  speechRate={currentRate}
                  onSuccess={() => onCompleteUnit(100)}
                />
              </div>
            );
          }

          if (ex.type === 'countable-quantifiers') {
            return (
              <div className="flex flex-col gap-6 animate-in fade-in duration-200">
                <CountableQuantifiersActivity
                  accent={accent}
                  speechRate={currentRate}
                />
              </div>
            );
          }

          if (ex.type === 'be-past-masterclass') {
            return (
              <div className="flex flex-col gap-6 animate-in fade-in duration-200">
                <BePastMasterclassActivity
                  accent={accent}
                  speechRate={currentRate}
                />
              </div>
            );
          }

          if ((ex.type as string) === 'directions-explore' || unit.sectionId === 'directions-to-the-museum') {
            return (
              <div className="flex flex-col gap-6 animate-in fade-in duration-200">
                <DirectionsToMuseumActivity
                  accent={accent}
                  speechRate={currentRate}
                  onSuccess={() => onCompleteUnit(100)}
                />
              </div>
            );
          }

          if (
            (ex.type as string) === 'clean-house-agency' ||
            unit.sectionId === 'clean-house-agency' ||
            (unit.id as any) === 'clean-house-agency'
          ) {
            return (
              <div className="flex flex-col gap-6 animate-in fade-in duration-200">
                <CleanHouseAgencyActivity
                  accent={accent}
                  speechRate={currentRate}
                  onSuccess={() => onCompleteUnit(100)}
                />
              </div>
            );
          }

          if (
            (ex.type as string) === 'newsstand-activity' ||
            unit.sectionId === 'newsstand' ||
            (unit.id as any) === 'newsstand'
          ) {
            return (
              <div className="flex flex-col gap-6 animate-in fade-in duration-200">
                <NewsstandActivity
                  accent={accent}
                  speechRate={currentRate}
                  onSuccess={() => onCompleteUnit(100)}
                />
              </div>
            );
          }

          if (
            (ex.type as string) === 'present-simple-statements' ||
            unit.sectionId === 'present-simple-statements' ||
            (unit.id as any) === 'present-simple-statements'
          ) {
            return (
              <div className="flex flex-col gap-6 animate-in fade-in duration-200">
                <PresentSimpleActivity
                  accent={accent}
                  speechRate={currentRate}
                  onSuccess={() => onCompleteUnit(100)}
                />
              </div>
            );
          }

          if (
            (ex.type as string) === 'present-simple-yes-no-questions' ||
            unit.sectionId === 'present-simple-yes-no-questions' ||
            (unit.id as any) === 'present-simple-yes-no-questions'
          ) {
            return (
              <div className="flex flex-col gap-6 animate-in fade-in duration-200">
                <PresentSimpleQuestionsActivity
                  accent={accent}
                  speechRate={currentRate}
                  onSuccess={() => onCompleteUnit(100)}
                />
              </div>
            );
          }

          if (
            (ex.type as string) === 'present-simple-wh-questions' ||
            unit.sectionId === 'present-simple-wh-questions' ||
            (unit.id as any) === 'present-simple-wh-questions'
          ) {
            return (
              <div className="flex flex-col gap-6 animate-in fade-in duration-200">
                <PresentSimpleWhQuestionsActivity
                  accent={accent}
                  speechRate={currentRate}
                  onSuccess={() => onCompleteUnit(100)}
                />
              </div>
            );
          }

          return null;
        })()}

        {/* Activity: Ejercicios de Comprensión (Fill Blank, etc.) */}
        {slides[safeCurrentSlide]?.id === 'exercises' && (
          <div className="flex flex-col gap-6 animate-in fade-in duration-200">
            <ExercisesView
              exercises={otherExercises}
              unitNumber={unit.number}
              unitTitle={unit.title}
              onCompleteUnit={onCompleteUnit}
              accent={accent}
            />
          </div>
        )}

        {/* Activity 3: Tarjetas de Vocabulario (Flashcards) */}
        {slides[safeCurrentSlide]?.id === 'flashcards' && (
          <div className="flex flex-col gap-6 animate-in fade-in duration-200">
            <FlashcardDeck
              cards={unit.flashcards}
              unitNumber={unit.number}
              unitTitle={unit.title}
              masteredIds={masteredCardIds}
              onToggleMastered={onToggleMasteredCard}
              accent={accent}
              speechRate={currentRate}
            />
          </div>
        )}

        {/* Activity 4: Diálogo & Gramática */}
        {slides[safeCurrentSlide]?.id === 'dialogue' && (
          <div className="flex flex-col gap-6 animate-in fade-in duration-200">
            <DialogueAndGrammarView
              dialogue={unit.dialogue}
              grammar={unit.grammar}
              unitTitle={unit.title}
              accent={accent}
              speechRate={currentRate}
            />
          </div>
        )}

      </div>
    </div>
  );
};

