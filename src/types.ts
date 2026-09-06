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
  | 'reading-comprehension'
  | 'picture-ordering'
  | 'speech-response'
  | 'roleplay-practice'
  | 'drag-drop-sentence'
  | 'unit-test';

export interface GrammarRule {
  id: string;
  titleEn: string;
  titleEs: string;
  ruleExplanationEn: string;
  ruleExplanationEs: string;
  examples: {
    en: string;
    es: string;
  }[];
}

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
  field: string; // e.g. "Name of caller:" or "Ms. Green was late for work."
  fieldEs?: string; // e.g. "Nombre de quien llama:" or "La Sra. Green llegó tarde al trabajo."
  correctValue: string; // e.g. "Chuck Wood" or "early"
  correctValueEs?: string;
  highlightedWord?: string; // e.g. "late"
  highlightedWordEs?: string; // e.g. "tarde"
}

export interface MatchingExercise extends BaseExercise {
  type: 'matching-table';
  instructions: string;
  instructionsEs?: string;
  audioPrompt?: string;
  columnAHeader?: string;
  columnAHeaderEs?: string;
  columnBHeader?: string;
  columnBHeaderEs?: string;
  pairs: MatchingPair[];
  optionsPool: string[]; // pool of draggable/clickable items
  optionsPoolEs?: Record<string, string>;
  story?: ReadingStory;
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
  explanation?: string;
  explanationEs?: string;
  durationSeconds?: number;
  speakerGender?: 'male' | 'female';
}

export interface WritingAiFeedbackExercise extends BaseExercise {
  type: 'writing-ai-feedback';
  instructions: string;
  instructionsEs?: string;
  prompt: string;
  promptEs?: string;
  maxAiRequests?: number;
  initialWordsTarget?: number;
  placeholder?: string;
  storyContext?: string;
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
  readingStory?: ReadingStory;
  options: UnitTestOption[];
  correctAnswerId: string;
  correctWords?: string[];
  slotsCount?: number;
  explanation: string;
  explanationEs?: string;
  sentencePrefix?: string;
  sentencePrefixEs?: string;
  sentenceSuffix?: string;
  sentenceSuffixEs?: string;
  dialogueLines?: DragDropDialogueLine[];
  referenceText?: string;
  referenceTextEs?: string;
  referenceHighlights?: string[];
}

export interface UnitTestExercise extends BaseExercise {
  type: 'unit-test';
  title: string;
  titleEs: string;
  subtitle?: string;
  subtitleEs?: string;
  description?: string;
  descriptionEs?: string;
  totalQuestions: number; // 5 or 6
  audioPrompt?: string;
  readingStory?: ReadingStory;
  questions: UnitTestQuestion[];
  referenceText?: string;
  referenceTextEs?: string;
  referenceHighlights?: string[];
  imageUrl?: string;
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

export interface ReadingComprehensionQuestion {
  id: string;
  question: string;
  questionEs?: string;
  options: RadioChoiceOption[];
  correctAnswerId: string;
  explanation?: string;
  explanationEs?: string;
}

export interface ReadingComprehensionExercise extends BaseExercise {
  type: 'reading-comprehension';
  instructions: string;
  instructionsEs?: string;
  story: ReadingStory;
  questions: ReadingComprehensionQuestion[];
}

export interface PictureOrderItem {
  id: string;
  correctPosition: number; // 1 to 6 (1-indexed chronological position)
  imageUrl: string;
  captionEn: string;
  captionEs: string;
}

export interface PictureOrderingExercise extends BaseExercise {
  type: 'picture-ordering';
  instructions: string;
  instructionsEs?: string;
  audioPrompt?: string;
  story?: ReadingStory;
  items: PictureOrderItem[];
  initialOrder?: string[];
}

export interface SpeechResponseOption {
  id: string;
  text: string;
  textEs?: string;
  isCorrect: boolean;
}

export interface SpeechResponseExercise extends BaseExercise {
  type: 'speech-response';
  instructions: string;
  instructionsEs?: string;
  subtitle?: string;
  subtitleEs?: string;
  promptStatement: string;
  promptStatementEs?: string;
  promptIsQuestion?: boolean;
  audioPrompt?: string;
  imageUrl?: string;
  sentences?: LessonSentence[];
  options: SpeechResponseOption[];
  correctAnswerId: string;
  explanation: string;
  explanationEs?: string;
  durationSeconds?: number;
  speakerGender?: 'male' | 'female';
}

export interface RoleplayCharacter {
  id: string; // 'character-1' | 'character-2'
  name: string;
  nameEs: string;
  role: string;
  roleEs: string;
  avatarSide: 'left' | 'right';
  voicePitch?: number;
  voiceGender?: 'female' | 'male';
}

export interface RoleplayDialogueTurn {
  characterId: string;
  textEn: string;
  textEs: string;
}

export interface RoleplayPracticeExercise extends BaseExercise {
  type: 'roleplay-practice';
  instructions: string;
  instructionsEs?: string;
  imageUrl: string;
  characters: [RoleplayCharacter, RoleplayCharacter];
  dialogueTurns: RoleplayDialogueTurn[];
}

export interface DragDropDialogueLine {
  speaker?: string;
  textEn: string;
  textEs?: string;
  hasBlank?: boolean;
  prefix?: string;
  prefixEs?: string;
  suffix?: string;
  suffixEs?: string;
}

export interface DragDropSentenceOption {
  id: string;
  text: string;
  textEs?: string;
  isCorrect: boolean;
}

export interface DragDropSentenceExercise extends BaseExercise {
  type: 'drag-drop-sentence';
  instructions: string;
  instructionsEs?: string;
  audioPrompt?: string;
  durationSeconds?: number;
  imageUrl?: string;
  referenceText?: string;
  referenceTextEs?: string;
  referenceHighlights?: string[];
  dialogueLines: DragDropDialogueLine[];
  options: DragDropSentenceOption[];
  correctAnswerId: string;
  explanation: string;
  explanationEs?: string;
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
  | ReadingComprehensionExercise
  | PictureOrderingExercise
  | SpeechResponseExercise
  | RoleplayPracticeExercise
  | DragDropSentenceExercise
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
  caller?: string;
  company?: string;
  phone?: string;
  imageSrc?: string;
  durationSeconds?: number;
  speakerGender?: 'male' | 'female';
  sentences?: LessonSentence[];
  practiceInstructions?: string;
}

export type LessonText = LessonMainText;

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
