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
import {
  madMosImg,
  MAD_MOS_REFERENCE_AUDIO,
  MAD_MOS_ACTIVITIES,
  MAD_MOS_TESTS,
  MadMosActivityItem,
  MadMosTestItem,
  MAD_MOS_FLYER,
} from './madMosDepartmentStoreData';

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
// TYPES SECTION 3: MAD MO'S DEPARTMENT STORE
// ---------------------------------------------------------------------------
export interface MadMosExploreItem {
  id: string;
  type: 'mad-mos-explore';
  title: string;
  titleEs?: string;
}

export interface MadMosExerciseItem {
  id: string;
  type: 'mad-mos-exercise';
  title: string;
  titleEs?: string;
  activityData: MadMosActivityItem;
}

export interface MadMosTestExerciseItem {
  id: string;
  type: 'mad-mos-test';
  title: string;
  titleEs?: string;
  totalQuestions: number;
  testData: MadMosTestItem[];
}

export type MadMosSectionExercise =
  | MadMosExploreItem
  | MadMosExerciseItem
  | MadMosTestExerciseItem;

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
// SECTION 3 DATA: MAD MO'S DEPARTMENT STORE
// ---------------------------------------------------------------------------
export const MAD_MOS_LESSON_TEXT: LessonText = {
  title: "Review 1 · Section 3: Mad Mo's Department Store",
  stepTitle: 'Step 1: Explore',
  audioText: MAD_MOS_REFERENCE_AUDIO,
  textEn: `Mad Mo's Has the Cheapest Prices! There are three floors of bargains. We have everything that you need. We take cash or credit. Here are just some of our bargains:
* Handbags: 1/2 price
* Bicycles for your children: only $99
* Shelves and bookcases for your home: 25% off

Our store opens at 9 a.m. and closes at midnight. Come to Mad Mo's Department Store today!`,
  textEs: `¡Mad Mo tiene los precios más baratos! Hay tres pisos de ofertas. Tenemos todo lo que necesitas. Aceptamos efectivo o tarjeta de crédito. Estas son solo algunas de nuestras ofertas:
* Bolsos de mano: mitad de precio (1/2 precio)
* Bicicletas para tus hijos: solo $99
* Estanterías y libreros para tu hogar: 25% de descuento

Nuestra tienda abre a las 9 a.m. y cierra a la medianoche. ¡Ven hoy a Grandes Almacenes Mad Mo!`,
  imageSrc: madMosImg,
  durationSeconds: 20,
  sentences: [
    {
      en: "Mad Mo's Has the Cheapest Prices!",
      es: '¡Mad Mo tiene los precios más baratos!',
    },
    {
      en: 'There are three floors of bargains.',
      es: 'Hay tres pisos de ofertas.',
    },
    {
      en: 'We have everything that you need. We take cash or credit.',
      es: 'Tenemos todo lo que necesitas. Aceptamos efectivo o crédito.',
    },
    {
      en: 'Handbags: 1/2 price. Bicycles for your children: only $99.',
      es: 'Bolsos de mano: a mitad de precio. Bicicletas para tus hijos: solo $99.',
    },
    {
      en: 'Shelves and bookcases for your home: 25% off.',
      es: 'Estanterías y libreros para tu hogar: 25% de descuento.',
    },
    {
      en: 'Our store opens at 9 a.m. and closes at midnight.',
      es: 'Nuestra tienda abre a las 9 a.m. y cierra a la medianoche.',
    },
    {
      en: "Come to Mad Mo's Department Store today!",
      es: '¡Ven hoy a Grandes Almacenes Mad Mo!',
    },
  ],
  practiceInstructions:
    "Lee el anuncio de Grandes Almacenes Mad Mo y presta atención a las ofertas, horarios de apertura y artículos disponibles.",
};

export const MAD_MOS_SECTION_EXERCISES: MadMosSectionExercise[] = [
  // Actividad 1: Explore (actividad 1.png)
  {
    id: 'mad-mos-act-1',
    type: 'mad-mos-explore',
    title: 'Actividad 1: Explore',
    titleEs: 'Actividad 1: Explorar',
  },
  // Actividad 2 & Actividad 3 (actividad 2.png y actividad 3.png)
  ...MAD_MOS_ACTIVITIES.map((act) => ({
    id: act.id,
    type: 'mad-mos-exercise' as const,
    title: act.title,
    titleEs: act.title,
    activityData: act,
  })),
  // Test (5 preguntas en orden exacto: test 1.png a test 5.png)
  {
    id: 'mad-mos-unit-test',
    type: 'mad-mos-test' as const,
    title: 'Test',
    titleEs: 'Examen de la Sección',
    totalQuestions: MAD_MOS_TESTS.length,
    testData: MAD_MOS_TESTS,
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
  {
    id: 'mad-mos-department-store',
    number: 3,
    title: "Mad Mo's Department Store",
    titleEs: "Grandes Almacenes Mad Mo",
    subtitle: 'Reading & Vocabulary · 3 Activities & 5 Tests',
    description:
      'Comprensión de lectura de un anuncio de grandes almacenes (Mad Mo\'s Department Store): vocabulario de compras, ofertas (bargains), descuentos y horarios, con 3 actividades prácticas y 5 tests evaluativos en orden exacto.',
    imageUrl: madMosImg,
    lessonText: MAD_MOS_LESSON_TEXT,
    flashcards: [],
    exercises: MAD_MOS_SECTION_EXERCISES as any,
  },
];
