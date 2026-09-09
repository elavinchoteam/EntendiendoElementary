import { UnitSection } from '../types';
import {
  FOOD_SECTION_LESSON_TEXT,
  FOOD_SECTION_EXERCISES,
  sheilaKitchenImg,
} from './foodSectionData';
import {
  DIETERS_SECTION_EXERCISES,
  DIETERS_STORY,
} from './dietersSectionData';

export const UNIT_2_SECTIONS: UnitSection[] = [
  // SECTION 1: Food
  {
    id: 'food',
    number: 1,
    title: 'Food',
    titleEs: 'Comida',
    subtitle: "Lesson 1: Sheila's Kitchen · Radio Program",
    description:
      'Vocabulario de alimentos frescos, opuestos en la cocina y comprensión auditiva del programa "Sheila\'s Kitchen".',
    imageUrl: sheilaKitchenImg,
    lessonText: FOOD_SECTION_LESSON_TEXT,
    flashcards: [],
    exercises: FOOD_SECTION_EXERCISES,
  },

  // SECTION 2: Dieters Are Feeling Great!
  {
    id: 'dieters-feeling-great',
    number: 2,
    title: 'Dieters Are Feeling Great!',
    titleEs: '¡Las Personas a Dieta se Sienten Genial!',
    subtitle: 'Section 2 · Reading & Listening',
    description:
      'Lectura del artículo "Dieters Are Feeling Great!" por Virginia Vegan, actividades interactivas de comprensión, categorización y test de evaluación.',
    imageUrl:
      'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=800&q=80',
    readingStory: DIETERS_STORY,
    flashcards: [],
    exercises: DIETERS_SECTION_EXERCISES,
  },

  // SECTION 3: Piece of Cake
  {
    id: 'piece-of-cake',
    number: 3,
    title: 'Piece of Cake',
    titleEs: 'Pan Comido',
    subtitle: 'Section 3 · Idioms & Everyday English',
    description: 'Próxima sección de expresiones idiomáticas y situaciones prácticas.',
    imageUrl:
      'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80',
    flashcards: [],
    exercises: [],
  },

  // SECTION 4: Nouns: Non-Count and Quantifiers
  {
    id: 'nouns-non-count-quantifiers',
    number: 4,
    title: 'Nouns: Non-Count and Quantifiers',
    titleEs: 'Sustantivos No Contables y Cuantificadores',
    subtitle: 'Section 4 · Grammar Practice',
    description: 'Próxima sección de gramática sobre sustantivos incontables y cuantificadores.',
    imageUrl:
      'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80',
    flashcards: [],
    exercises: [],
  },

  // SECTION 5: Count and Non-Count Nouns
  {
    id: 'count-non-count-nouns',
    number: 5,
    title: 'Count and Non-Count Nouns',
    titleEs: 'Sustantivos Contables e Incontables',
    subtitle: 'Section 5 · Grammar & Usage',
    description: 'Próxima sección de gramática y práctica comunicativa.',
    imageUrl:
      'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?auto=format&fit=crop&w=800&q=80',
    flashcards: [],
    exercises: [],
  },

  // SECTION 6: In the Kitchen
  {
    id: 'in-the-kitchen',
    number: 6,
    title: 'In the Kitchen',
    titleEs: 'En la Cocina',
    subtitle: 'Section 6 · Culinary Vocabulary & Real-Life Tasks',
    description: 'Próxima sección sobre utensilios, preparación culinaria y tareas en la cocina.',
    imageUrl:
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
    flashcards: [],
    exercises: [],
  },
];
