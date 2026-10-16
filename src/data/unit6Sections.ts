import { UnitSection, LessonText } from '../types';
import {
  policeAlibiImg,
  BE_PAST_REVIEW_REFERENCE_AUDIO,
  BE_PAST_REVIEW_ACTIVITIES,
  BE_PAST_REVIEW_TESTS,
  BePastActivityItem,
  BePastTestItem,
} from './bePastReviewData';

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
];
