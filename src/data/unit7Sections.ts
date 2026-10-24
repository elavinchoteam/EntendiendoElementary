import { UnitSection } from '../types';
import {
  INTERVIEW_SECTION_LESSON_TEXT,
  INTERVIEW_SECTION_EXERCISES,
  larrySandraImg,
} from './interviewSectionData';
import {
  DO_IT_SECTION_LESSON_TEXT,
  DO_IT_SECTION_EXERCISES,
  doItArticleImg,
} from './doItSectionData';
import { movieStarImg } from './movieStarData';
import { pastSimpleRegularTennisImg } from './pastSimpleRegularData';
import { pastIrregularOfficeImg } from './pastSimpleIrregularData';
import { pastQuestionsOfficeImg } from './pastSimpleQuestionsData';
import { adjectives2ContextImg } from './adjectives2Data';

export const UNIT_7_SECTIONS: UnitSection[] = [
  // SECTION 1: PAST SIMPLE
  {
    id: 'past-simple',
    number: 1,
    title: 'PAST SIMPLE',
    titleEs: 'Pasado Simple',
    subtitle: 'Section 1 · Grammar Masterclass & Real Practice (What a day! - 7 Actividades)',
    description:
      "Aprende y domina el Past Simple (pasado simple) en inglés: acciones iniciadas y terminadas en el pasado, verbos regulares (-ed) e irregulares, estructuras afirmativa, negativa (didn't) e interrogativa (did), con la historia de Tom, el misterio del actor desaparecido, errores comunes, el día de Emma y contraste con presente con 7 actividades interactivas completas con audio y autocorrección.",
    imageUrl:
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    flashcards: [],
    exercises: [
      {
        id: 'past-simple-main',
        type: 'past-simple-masterclass' as any,
        title: 'WHAT A DAY! — PAST SIMPLE',
        instructions:
          'Learn the rules of the Past Simple and complete all 7 real practice exercises.',
        instructionsEs:
          'Aprende las reglas del Pasado Simple y completa las 7 actividades de práctica real.',
      },
    ],
  },

  // SECTION 2: INTERVIEW
  {
    id: 'interview',
    number: 2,
    title: 'Interview',
    titleEs: 'Entrevista',
    subtitle: 'Lesson 2: Meet the People · Larry Patel & The Whistling Wallet',
    description:
      'Entrevista a Larry Patel sobre su invento: "the whistling wallet", vocabulario interactivo, preguntas de comprensión auditiva y test de evaluación con 8 actividades y 5 tests.',
    imageUrl: larrySandraImg,
    lessonText: INTERVIEW_SECTION_LESSON_TEXT,
    flashcards: [],
    exercises: INTERVIEW_SECTION_EXERCISES,
  },

  // SECTION 3: DO IT!
  {
    id: 'do-it',
    number: 3,
    title: 'Do it!',
    titleEs: '¡Hazlo!',
    subtitle: 'Lesson 3: Reading · The Clean-House Agency & Cookbooks (7 Actividades y 5 Tests)',
    description:
      'Lectura interactiva del artículo "Do It!" sobre la fundadora de Clean-House Agency y su nueva idea de libros de cocina, con 7 actividades paso a paso y 5 tests de evaluación con audio y traducciones completas.',
    imageUrl: doItArticleImg,
    lessonText: DO_IT_SECTION_LESSON_TEXT,
    flashcards: [],
    exercises: DO_IT_SECTION_EXERCISES,
  },

  // SECTION 4: MOVIE STAR
  {
    id: 'movie-star',
    number: 4,
    title: 'Movie Star',
    titleEs: 'Estrella de Cine',
    subtitle: 'Lesson 4: Dialogue & Comprehension · Mark & Carol (7 Actividades y 3 Interacciones)',
    description:
      'Diálogo interactivo "Movie Star" entre Mark y Carol sobre el actor Robert Richman, con 7 actividades cronológicas (video, comprensión, respuestas orales) y 3 interacciones guiadas de conversación con reconocimiento de voz, traducciones completas y control de velocidad.',
    imageUrl: movieStarImg,
    flashcards: [],
    exercises: [
      {
        id: 'movie-star-main',
        type: 'movie-star-activity',
        title: 'Movie Star',
        instructions:
          'Listen to the dialogue and complete the 7 activities and 3 conversation interactions.',
        instructionsEs:
          'Escucha el diálogo y completa las 7 actividades y las 3 interacciones de conversación.',
      },
    ],
  },

  // SECTION 5: PAST SIMPLE: REGULAR VERBS
  {
    id: 'past-simple-regular',
    number: 5,
    title: 'Past Simple: Regular Verbs',
    titleEs: 'Pasado Simple: Verbos Regulares',
    subtitle: 'Lesson 5: Grammar Practice · Past Simple: Regular Verbs (11 Actividades y 5 Tests)',
    description:
      'Aprende y practica los verbos regulares en pasado simple (-ed, -d, -ied y negaciones con didn\'t) con el diálogo interactivo de tenis, 11 actividades paso a paso con arrastre y autocorrección, y una evaluación completa de 5 tests con tarjeta de inicio, audios nativos y traducciones bilingües.',
    imageUrl: pastSimpleRegularTennisImg,
    flashcards: [],
    exercises: [
      {
        id: 'past-simple-regular-main',
        type: 'past-simple-regular-activity',
        title: 'Past Simple: Regular Verbs',
        instructions:
          'Listen to the dialogue and complete the 11 activities and 5 unit tests.',
        instructionsEs:
          'Escucha el diálogo y completa las 11 actividades y los 5 tests de la unidad.',
      },
    ],
  },

  // SECTION 6: PAST SIMPLE: IRREGULAR VERBS
  {
    id: 'past-simple-irregular',
    number: 6,
    title: 'Past Simple: Irregular Verbs',
    titleEs: 'Pasado Simple: Verbos Irregulares',
    subtitle: 'Lesson 6: Grammar Practice · Past Simple: Irregular Verbs (11 Actividades y 5 Tests)',
    description:
      "Aprende y domina los verbos irregulares en pasado simple (broke, brought, didn't catch, chose, didn't do, ate, fell, flew, had, knew) con el diálogo interactivo de la oficina, 11 actividades paso a paso con arrastre y autocorrección, y una evaluación completa de 5 tests con tarjeta de inicio, audios nativos y traducciones bilingües.",
    imageUrl: pastIrregularOfficeImg,
    flashcards: [],
    exercises: [
      {
        id: 'past-simple-irregular-main',
        type: 'past-simple-irregular-activity',
        title: 'Past Simple: Irregular Verbs',
        instructions:
          'Listen to the dialogue and complete the 11 activities and 5 unit tests.',
        instructionsEs:
          'Escucha el diálogo y completa las 11 actividades y los 5 tests de la unidad.',
      },
    ],
  },

  // SECTION 7: PAST SIMPLE: QUESTIONS
  {
    id: 'past-simple-questions',
    number: 7,
    title: 'Past Simple: Questions',
    titleEs: 'Pasado Simple: Preguntas',
    subtitle: 'Lesson 7: Grammar Practice · Past Simple: Questions (11 Actividades y 5 Tests)',
    description:
      'Aprende y domina las preguntas en pasado simple (Did you ask, Where did you buy it, Why did you give, Did you fall, Who directed it, tag questions y respuestas cortas) con 11 actividades interactivas paso a paso y 5 tests de evaluación con audio y traducciones bilingües.',
    imageUrl: pastQuestionsOfficeImg,
    flashcards: [],
    exercises: [
      {
        id: 'past-simple-questions-main',
        type: 'past-simple-questions-activity',
        title: 'Past Simple: Questions',
        instructions:
          'Listen to the dialogue and complete the 11 activities and 5 unit tests.',
        instructionsEs:
          'Escucha el diálogo y completa las 11 actividades y los 5 tests de la unidad.',
      },
    ],
  },

  // SECTION 8: ADJECTIVES 2
  {
    id: 'adjectives-2',
    number: 8,
    title: 'Adjectives 2',
    titleEs: 'Adjetivos 2',
    subtitle: 'Lesson 8: Vocabulary & Reading · Adjectives 2 (7 Actividades y 10 Tests)',
    description:
      'Aprende y practica los 10 adjetivos esenciales en inglés (alone, angry, best, easy, pretty, quick, special, strong, wonderful, worst) con tarjetas interactivas reversibles con audio y velocidad graduable, emparejamiento de opuestos, dictado auditivo, diálogos de comprensión con arrastre y selección, y evaluación completa de 10 tests con tarjeta de inicio y traducciones al español sin desbordamientos.',
    imageUrl: adjectives2ContextImg,
    flashcards: [],
    exercises: [
      {
        id: 'adjectives-2-main',
        type: 'adjectives-2-activity',
        title: 'Adjectives 2',
        instructions:
          'Complete the 7 vocabulary activities and 10 unit tests.',
        instructionsEs:
          'Completa las 7 actividades de vocabulario y los 10 tests de la unidad.',
      },
    ],
  },
];
