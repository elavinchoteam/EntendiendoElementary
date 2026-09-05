export interface Flashcard {
  id: string;
  word: string;
  phonetic: string;
  translation: string;
  partOfSpeech: string;
  exampleEn: string;
  exampleEs: string;
  audioText?: string;
  tip?: string;
}

export type ExerciseType =
  | 'multiple-choice'
  | 'listen-and-choose'
  | 'fill-blank'
  | 'sentence-builder'
  | 'matching-table'
  | 'dropdown-completion'
  | 'true-false-selection'
  | 'radio-choice'
  | 'writing-ai-feedback'
  | 'reading-story'
  | 'unit-test';

export interface BaseExercise {
  id: string;
  type: ExerciseType;
  question?: string;
  explanation?: string;
  audioPrompt?: string;
}

export interface MultipleChoiceExercise extends BaseExercise {
  type: 'multiple-choice' | 'listen-and-choose';
  options: string[];
  correctAnswer: string;
}

export interface FillBlankExercise extends BaseExercise {
  type: 'fill-blank';
  sentenceWithBlank: string; // e.g. "Could you give me a _______ please?"
  options: string[];
  correctAnswer: string;
}

export interface SentenceBuilderExercise extends BaseExercise {
  type: 'sentence-builder';
  scrambledWords: string[];
  correctSentence: string;
  translation: string;
}

export interface MatchingPair {
  id: string;
  field: string; // e.g. "Name of caller:"
  fieldEs?: string; // e.g. "Nombre de quien llama:"
  correctValue: string; // e.g. "Chuck Wood"
  correctValueEs?: string;
}

export interface MatchingExercise extends BaseExercise {
  type: 'matching-table';
  instructions: string;
  pairs: MatchingPair[];
  optionsPool: string[]; // pool of draggable/clickable items
  optionsPoolEs?: Record<string, string>;
}

export interface DropdownBlank {
  id: string;
  options: string[];
  correctAnswer: string;
}

export interface DropdownCompletionExercise extends BaseExercise {
  type: 'dropdown-completion';
  instructions: string;
  instructionsEs?: string;
  imageUrl?: string;
  audioPrompt?: string;
  transcript?: string;
  sentences?: LessonSentence[];
  blanks: DropdownBlank[];
  template: string; // e.g. "This is the biggest sale of the {0}. The sale price for one magazine is only {1}. This is the price if you buy {2} magazines."
  translationEs?: string;
}

export interface TrueFalseStatement {
  id: string;
  text: string;
  textEs?: string;
  isTrue: boolean;
}

export interface TrueFalseSelectionExercise extends BaseExercise {
  type: 'true-false-selection';
  instructions: string;
  instructionsEs?: string;
  imageUrl?: string;
  audioPrompt?: string;
  transcript?: string;
  sentences?: LessonSentence[];
  statements: TrueFalseStatement[];
  translationEs?: string;
}

export interface RadioChoiceOption {
  id: string;
  text: string;
  textEs: string;
  isCorrect: boolean;
}

export interface RadioChoiceExercise extends BaseExercise {
  type: 'radio-choice';
  instructions: string;
  instructionsEs?: string;
  question: string;
  questionEs?: string;
  imageUrl?: string;
  audioPrompt?: string;
  transcript?: string;
  sentences?: LessonSentence[];
  options: RadioChoiceOption[];
  correctAnswerId: string;
}

export interface WritingAiFeedbackExercise extends BaseExercise {
  type: 'writing-ai-feedback';
  instructions: string;
  instructionsEs?: string;
  prompt: string;
  promptEs?: string;
  maxAiRequests?: number;
  initialWordsTarget?: number;
}

export interface UnitTestOption {
  id: string;
  text: string;
  textEs?: string;
  isCorrect: boolean;
}

export type UnitTestQuestionType = 'radio-choice' | 'drag-drop';

export interface UnitTestQuestion {
  id: string;
  number: number; // 1 to 6
  type?: UnitTestQuestionType;
  instructions: string; // "Choose the correct answer." or "Drag the correct answer/s into place."
  instructionsEs?: string;
  question: string;
  questionEs?: string;
  audioPrompt?: string;
  durationSeconds?: number;
  imageUrl?: string;
  options: UnitTestOption[];
  correctAnswerId: string;
  explanation: string;
  explanationEs?: string;
  sentencePrefix?: string;
  sentencePrefixEs?: string;
  sentenceSuffix?: string;
  sentenceSuffixEs?: string;
}

export interface UnitTestExercise extends BaseExercise {
  type: 'unit-test';
  title: string;
  titleEs: string;
  subtitle?: string;
  subtitleEs?: string;
  description?: string;
  descriptionEs?: string;
  totalQuestions: number; // 6
  questions: UnitTestQuestion[];
}

export interface ReadingStory {
  title: string;
  titleEs: string;
  textEn: string;
  textEs: string;
  paragraphsEn: string[];
  paragraphsEs: string[];
  audioText?: string;
}

export interface ReadingStoryExercise extends BaseExercise {
  type: 'reading-story';
  story: ReadingStory;
}

export type Exercise =
  | MultipleChoiceExercise
  | FillBlankExercise
  | SentenceBuilderExercise
  | MatchingExercise
  | DropdownCompletionExercise
  | TrueFalseSelectionExercise
  | RadioChoiceExercise
  | WritingAiFeedbackExercise
  | ReadingStoryExercise
  | UnitTestExercise;

export interface LessonSentence {
  en: string;
  es: string;
}

export interface LessonMainText {
  title: string; // "Lesson 1: Phone Sales"
  stepTitle: string; // "Step 1: Explore"
  audioText: string;
  textEn: string;
  textEs: string;
  caller: string;
  company: string;
  phone: string;
  sentences: LessonSentence[];
  practiceInstructions: string;
}

export interface DialogueLine {
  speaker: string;
  textEn: string;
  textEs: string;
  avatarColor?: string;
}

export interface GrammarTip {
  title: string;
  explanation: string;
  examples: { en: string; es: string }[];
}

export interface UnitSection {
  id: string; // e.g. 'phone-sales', 'wrong-color', 'dress-from-paris', 'be-past-statements', 'be-past-questions', 'shopping-2'
  number: number; // 1 to 6
  title: string;
  titleEs: string;
  subtitle?: string;
  description?: string;
  imageUrl?: string;
  lessonText?: LessonMainText;
  readingStory?: ReadingStory;
  flashcards?: Flashcard[];
  exercises: Exercise[];
  dialogue?: DialogueLine[];
  grammar?: GrammarTip;
}

export interface Unit {
  id: number;
  number: number;
  title: string;
  titleEs: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  color: string;
  category: string;
  requiredProgressToUnlock: number; // e.g. 0 for unit 1
  sections?: UnitSection[];
  readingStory?: ReadingStory;
  lessonText?: LessonMainText;
  flashcards: Flashcard[];
  exercises: Exercise[];
  dialogue: DialogueLine[];
  grammar?: GrammarTip;
}

export interface UnitProgress {
  unitId: number;
  completed: boolean;
  score: number; // 0-100
  exercisesFinished: number;
  totalExercises: number;
  masteredCards: string[]; // flashcard ids
  lastStudied?: string;
}

export interface UserStats {
  totalStudySeconds: number;
  activeUnitId: number;
  unlockedUnits: number[];
  progress: Record<number, UnitProgress>;
}
