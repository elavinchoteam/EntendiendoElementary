import { UnitSection } from '../types';
import { COUNTABLE_QUANTIFIERS_EXERCISES } from './countableQuantifiersData';
import {
  FOOD_SECTION_LESSON_TEXT,
  FOOD_SECTION_EXERCISES,
  sheilaKitchenImg,
} from './foodSectionData';
import {
  DIETERS_SECTION_EXERCISES,
  DIETERS_STORY,
} from './dietersSectionData';
import {
  PIECE_OF_CAKE_EXERCISES,
  pieceOfCakeImg,
} from './pieceOfCakeData';
import {
  NOUNS_LESSON_TEXT,
  NOUNS_EXERCISES,
  nounsSugarCoffeeImg,
} from './nounsNonCountQuantifiersData';
import {
  COUNT_NON_COUNT_LESSON_TEXT,
  COUNT_NON_COUNT_EXERCISES,
  countNounsWorkersImg,
} from './countAndNonCountNounsData';
import { IN_THE_KITCHEN_EXERCISES } from './inTheKitchenData';

export const UNIT_2_SECTIONS: UnitSection[] = [
  // SECTION 1: Countable & Non-Count Nouns – Quantifiers
  {
    id: 'countable-quantifiers',
    number: 1,
    title: 'Countable & Non-Count Nouns – Quantifiers',
    titleEs: 'Sustantivos Contables e Incontables – Cuantificadores',
    subtitle: 'Section 1 · Grammar Masterclass & Interactive Practice',
    description:
      'Guía integral de 10 temas teóricos, 12 ejercicios de clasificación C/NC, 10 preguntas de cuantificadores, desafío de fiesta y detección de errores.',
    imageUrl:
      'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80',
    flashcards: [],
    exercises: COUNTABLE_QUANTIFIERS_EXERCISES,
  },

  // SECTION 2: Food
  {
    id: 'food',
    number: 2,
    title: 'Food',
    titleEs: 'Comida',
    subtitle: "Lesson 2: Sheila's Kitchen · Radio Program",
    description:
      'Vocabulario de alimentos frescos, opuestos en la cocina y comprensión auditiva del programa "Sheila\'s Kitchen".',
    imageUrl: sheilaKitchenImg,
    lessonText: FOOD_SECTION_LESSON_TEXT,
    flashcards: [],
    exercises: FOOD_SECTION_EXERCISES,
  },

  // SECTION 3: Dieters Are Feeling Great!
  {
    id: 'dieters-feeling-great',
    number: 3,
    title: 'Dieters Are Feeling Great!',
    titleEs: '¡Las Personas a Dieta se Sienten Genial!',
    subtitle: 'Section 3 · Reading & Listening',
    description:
      'Lectura del artículo "Dieters Are Feeling Great!" por Virginia Vegan, actividades interactivas de comprensión, categorización y test de evaluación.',
    imageUrl:
      'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=800&q=80',
    readingStory: DIETERS_STORY,
    flashcards: [],
    exercises: DIETERS_SECTION_EXERCISES,
  },

  // SECTION 4: Piece of Cake
  {
    id: 'piece-of-cake',
    number: 4,
    title: 'Piece of Cake',
    titleEs: 'Un Trozo de Pastel',
    subtitle: 'Section 4 · Social Dialogue & Offering Food',
    description:
      'Aprende a ofrecer comida, aceptar o rechazar educadamente en inglés, practicar pronunciación y participar en interacciones comunicativas.',
    imageUrl: pieceOfCakeImg,
    flashcards: [],
    exercises: PIECE_OF_CAKE_EXERCISES,
  },

  // SECTION 5: Nouns: Non-Count and Quantifiers
  {
    id: 'nouns-non-count-quantifiers',
    number: 5,
    title: 'Nouns: Non-Count and Quantifiers',
    titleEs: 'Sustantivos No Contables y Cuantificadores',
    subtitle: 'Section 5 · Grammar Practice',
    description:
      'Aprende sobre sustantivos incontables y cuantificadores (How much, much, a little, lots of, some, any), practica con 11 actividades interactivas y realiza el examen de 5 preguntas.',
    imageUrl: nounsSugarCoffeeImg,
    lessonText: NOUNS_LESSON_TEXT,
    flashcards: [],
    exercises: NOUNS_EXERCISES,
  },

  // SECTION 6: Count and Non-Count Nouns
  {
    id: 'count-non-count-nouns',
    number: 6,
    title: 'Count and Non-Count Nouns',
    titleEs: 'Sustantivos Contables e Incontables',
    subtitle: 'Section 6 · Grammar Practice',
    description:
      'Aprende a diferenciar y usar correctamente sustantivos contables e incontables con cuantificadores como a few, many, some, any, y realiza 11 actividades interactivas y un test de 5 preguntas.',
    imageUrl: countNounsWorkersImg,
    lessonText: COUNT_NON_COUNT_LESSON_TEXT,
    flashcards: [],
    exercises: COUNT_NON_COUNT_EXERCISES,
  },

  // SECTION 7: In the Kitchen
  {
    id: 'in-the-kitchen',
    number: 7,
    title: 'In the Kitchen',
    titleEs: 'En la Cocina',
    subtitle: 'Section 7 · Culinary Vocabulary & Real-Life Tasks',
    description:
      'Aprende vocabulario culinario esencial (bake, cook, cookbook, cup, dish, freeze, fresh, meal, plate, serve), completa 7 actividades interactivas y realiza la evaluación final de 10 preguntas.',
    imageUrl:
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
    flashcards: [],
    exercises: IN_THE_KITCHEN_EXERCISES,
  },
];
