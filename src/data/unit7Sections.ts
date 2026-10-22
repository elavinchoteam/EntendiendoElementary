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
    imageUrl: '/assets/aistudio/actividad_1_58a87956.png',
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
];
