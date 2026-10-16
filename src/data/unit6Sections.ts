import { UnitSection, LessonText } from '../types';
import {
  policeAlibiImg,
  BE_PAST_REVIEW_REFERENCE_AUDIO,
  BE_PAST_REVIEW_ACTIVITIES,
  BE_PAST_REVIEW_TESTS,
  BePastActivityItem,
  BePastTestItem,
} from './bePastReviewData';
import {
  mrAmericaImg,
  COMPARISON_REVIEW_REFERENCE_AUDIO,
  COMPARISON_REVIEW_ACTIVITIES,
  COMPARISON_REVIEW_TESTS,
  ComparisonActivityItem,
  ComparisonTestItem,
} from './comparisonAdjectivesReviewData';

// ---------------------------------------------------------------------------
// TYPES SECTION 1: BE-PAST: REVIEW
// ---------------------------------------------------------------------------
export interface BePastReviewExploreItem {
  id: string;
  type: 'be-past-review-explore';
  title: string;
  titleEs?: string;
}

export interface BePastReviewExerciseItem {
  id: string;
  type: 'be-past-review-exercise';
  title: string;
  titleEs?: string;
  activityData: BePastActivityItem;
}

export interface BePastReviewTestExerciseItem {
  id: string;
  type: 'be-past-review-test';
  title: string;
  titleEs?: string;
  totalQuestions: number;
  testData: BePastTestItem[];
}

export type BePastReviewSectionExercise =
  | BePastReviewExploreItem
  | BePastReviewExerciseItem
  | BePastReviewTestExerciseItem;

// ---------------------------------------------------------------------------
// TYPES SECTION 2: COMPARISON OF ADJECTIVES: REVIEW
// ---------------------------------------------------------------------------
export interface ComparisonReviewExploreItem {
  id: string;
  type: 'comparison-review-explore';
  title: string;
  titleEs?: string;
}

export interface ComparisonReviewExerciseItem {
  id: string;
  type: 'comparison-review-exercise';
  title: string;
  titleEs?: string;
  activityData: ComparisonActivityItem;
}

export interface ComparisonReviewTestExerciseItem {
  id: string;
  type: 'comparison-review-test';
  title: string;
  titleEs?: string;
  totalQuestions: number;
  testData: ComparisonTestItem[];
}

export type ComparisonReviewSectionExercise =
  | ComparisonReviewExploreItem
  | ComparisonReviewExerciseItem
  | ComparisonReviewTestExerciseItem;

// ---------------------------------------------------------------------------
// SECTION 1 DATA
// ---------------------------------------------------------------------------
export const BE_PAST_REVIEW_LESSON_TEXT: LessonText = {
  title: 'Review 1 · Section 1: Be-Past: Review',
  stepTitle: 'Step 1: Explore',
  audioText: BE_PAST_REVIEW_REFERENCE_AUDIO,
  textEn: "- Where were you last night at 9:30?\n- I was at home all night.\n- Was Big Bob with you?\n- No, he wasn't, I was alone.",
  textEs: "- ¿Dónde estuviste anoche a las 9:30?\n- Estuve en casa toda la noche.\n- ¿Estaba Big Bob contigo?\n- No, no estaba, estuve solo.",
  imageSrc: policeAlibiImg,
  durationSeconds: 10,
  sentences: [
    {
      en: 'Where were you last night at 9:30?',
      es: '¿Dónde estuviste anoche a las 9:30?',
    },
    {
      en: 'I was at home all night.',
      es: 'Estuve en casa toda la noche.',
    },
    {
      en: 'Was Big Bob with you?',
      es: '¿Estaba Big Bob contigo?',
    },
    {
      en: "No, he wasn't, I was alone.",
      es: 'No, no estaba, estuve solo.',
    },
  ],
  practiceInstructions:
    'Lee y escucha la conversación entre el detective y el sospechoso. Observa el uso de was, were y wasn\'t.',
};

export const BE_PAST_REVIEW_EXERCISES: BePastReviewSectionExercise[] = [
  // Actividad 1: Explore
  {
    id: 'bpr-act-1',
    type: 'be-past-review-explore',
    title: 'Actividad 1: Explore',
    titleEs: 'Actividad 1: Explorar',
  },
  // Actividades 2 a 20 (19 actividades prácticas)
  ...BE_PAST_REVIEW_ACTIVITIES.map((act) => ({
    id: act.id,
    type: 'be-past-review-exercise' as const,
    title: act.title,
    titleEs: act.title,
    activityData: act,
  })),
  // Test (10 preguntas)
  {
    id: 'bpr-unit-test',
    type: 'be-past-review-test' as const,
    title: 'Test',
    titleEs: 'Examen de la Sección',
    totalQuestions: BE_PAST_REVIEW_TESTS.length,
    testData: BE_PAST_REVIEW_TESTS,
  },
];

// ---------------------------------------------------------------------------
// SECTION 2 DATA: COMPARISON OF ADJECTIVES: REVIEW
// ---------------------------------------------------------------------------
export const COMPARISON_REVIEW_LESSON_TEXT: LessonText = {
  title: 'Review 1 · Section 2: Comparison of Adjectives: Review',
  stepTitle: 'Step 1: Explore',
  audioText: COMPARISON_REVIEW_REFERENCE_AUDIO,
  textEn: "- Ahh! He's as strong as last year's Mr. America!\n- Ooh! He's even stronger!\n- Wow! He's the strongest!",
  textEs: "- ¡Ahh! ¡Él es tan fuerte como el Mr. América del año pasado!\n- ¡Ooh! ¡Él es incluso más fuerte!\n- ¡Guau! ¡Él es el más fuerte!",
  imageSrc: mrAmericaImg,
  durationSeconds: 11,
  sentences: [
    {
      en: "Ahh! He's as strong as last year's Mr. America!",
      es: '¡Ahh! ¡Él es tan fuerte como el Mr. América del año pasado!',
    },
    {
      en: "Ooh! He's even stronger!",
      es: '¡Ooh! ¡Él es incluso más fuerte!',
    },
    {
      en: "Wow! He's the strongest!",
      es: '¡Guau! ¡Él es el más fuerte!',
    },
  ],
  practiceInstructions:
    'Observa el uso de las comparaciones en inglés: igualdad (as... as), comparativo (-er / more) y superlativo (-est / most).',
};

export const COMPARISON_REVIEW_EXERCISES: ComparisonReviewSectionExercise[] = [
  // Actividad 1: Explore
  {
    id: 'car-act-1',
    type: 'comparison-review-explore',
    title: 'Actividad 1: Explore',
    titleEs: 'Actividad 1: Explorar',
  },
  // Actividades 2 a 21 (20 actividades prácticas en orden exacto)
  ...COMPARISON_REVIEW_ACTIVITIES.map((act) => ({
    id: act.id,
    type: 'comparison-review-exercise' as const,
    title: act.title,
    titleEs: act.title,
    activityData: act,
  })),
  // Test (10 preguntas en orden exacto)
  {
    id: 'car-unit-test',
    type: 'comparison-review-test' as const,
    title: 'Test',
    titleEs: 'Examen de la Sección',
    totalQuestions: COMPARISON_REVIEW_TESTS.length,
    testData: COMPARISON_REVIEW_TESTS,
  },
];

// ---------------------------------------------------------------------------
// ALL SECTIONS FOR UNIT 6: REVIEW 1
// ---------------------------------------------------------------------------
export const UNIT_6_SECTIONS: UnitSection[] = [
  {
    id: 'be-past-review',
    number: 1,
    title: 'Be-Past: Review',
    titleEs: 'Be en Pasado: Repaso',
    subtitle: 'Grammar Review · 20 Activities & 10 Tests',
    description:
      'Repaso completo de las formas afirmativas, negativas, preguntas y respuestas cortas con el verbo Be en pasado (was / were / wasn\'t / weren\'t), con 20 actividades prácticas y 10 tests evaluativos en orden exacto.',
    imageUrl: policeAlibiImg,
    lessonText: BE_PAST_REVIEW_LESSON_TEXT,
    flashcards: [],
    exercises: BE_PAST_REVIEW_EXERCISES as any,
  },
  {
    id: 'comparison-adjectives-review',
    number: 2,
    title: 'Comparison of Adjectives: Review',
    titleEs: 'Comparación de Adjetivos: Repaso',
    subtitle: 'Grammar Review · 21 Activities & 10 Tests',
    description:
      'Repaso integral de las estructuras de comparación: igualdad (as... as), comparativos (-er / more... than), superlativos (the -est / the most) y formas irregulares (better, best, worse, worst), con 21 actividades prácticas y 10 tests evaluativos en orden exacto.',
    imageUrl: mrAmericaImg,
    lessonText: COMPARISON_REVIEW_LESSON_TEXT,
    flashcards: [],
    exercises: COMPARISON_REVIEW_EXERCISES as any,
  },
];
