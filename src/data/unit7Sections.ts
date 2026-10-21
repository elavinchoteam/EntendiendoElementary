import { UnitSection } from '../types';
import {
  INTERVIEW_SECTION_LESSON_TEXT,
  INTERVIEW_SECTION_EXERCISES,
  larrySandraImg,
} from './interviewSectionData';

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
];
