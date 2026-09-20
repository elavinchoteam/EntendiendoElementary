import { UnitSection } from '../types';
import { restaurantSceneImg } from './inTheRestaurantData';
import { vegetablesImg } from './saleAtShoprightData';
import { goodToSeeYouImg } from './goodToSeeYouData';
import { kitchenCakeImg } from './countNonCountData';

export const UNIT_5_SECTIONS: UnitSection[] = [
  // SECTION 1: In the Restaurant
  {
    id: 'in-the-restaurant',
    number: 1,
    title: 'In the Restaurant',
    titleEs: 'En el Restaurante',
    subtitle: 'Section 1 · Video, 9 Activities & Test (5 Tests)',
    description:
      'Aprende a ordenar comida y bebida en un restaurante, interactuar con el camarero y solicitar cambios en los platillos mediante 9 actividades interactivas y un test final de 5 preguntas.',
    imageUrl: restaurantSceneImg,
    flashcards: [],
    exercises: [
      {
        id: 'restaurant-main-container',
        type: 'in-the-restaurant-activity',
        title: 'In the Restaurant',
        instructions: 'Watch the video and complete the 9 activities and unit test.',
        instructionsEs: 'Mira el video y completa las 9 actividades y el test.',
      },
    ],
  },
  // SECTION 2: Sale at Shopright
  {
    id: 'sale-at-shopright',
    number: 2,
    title: 'Sale at Shopright',
    titleEs: 'Ofertas en Shopright',
    subtitle: 'Section 2 · 7 Activities & Test (5 Tests)',
    description:
      'Aprende vocabulario de alimentos, precios de oferta y comida saludable con 7 actividades interactivas y un test de dominio de 5 pruebas.',
    imageUrl: vegetablesImg,
    flashcards: [],
    exercises: [
      {
        id: 'sale-at-shopright-main',
        type: 'sale-at-shopright-activity',
        title: 'Sale at Shopright',
        instructions:
          'Read the supermarket ad, complete the 7 activities, and take the 5-test assessment.',
        instructionsEs:
          'Lee el anuncio del supermercado, completa las 7 actividades y realiza el test de 5 pruebas.',
      },
    ],
  },
  // SECTION 3: Good to See You
  {
    id: 'good-to-see-you',
    number: 3,
    title: 'Good to See You',
    titleEs: 'Qué bueno verte',
    subtitle: 'Section 3 · 6 Activities & Interaction (3 Parts)',
    description:
      'Practica expresiones sociales en un encuentro casual, respuestas a saludos e invitaciones y completa la interacción guiada en 3 partes.',
    imageUrl: goodToSeeYouImg,
    flashcards: [],
    exercises: [
      {
        id: 'good-to-see-you-main',
        type: 'good-to-see-you-activity',
        title: 'Good to See You',
        instructions: 'Complete the 6 activities and the 3-part conversation interaction.',
        instructionsEs: 'Completa las 6 actividades y la interacción conversacional en 3 partes.',
      },
    ],
  },
  // SECTION 4: Nouns: Count and Non-Count
  {
    id: 'nouns-count-and-non-count',
    number: 4,
    title: 'Nouns: Count and Non-Count',
    titleEs: 'Sustantivos: Contables e Incontables',
    subtitle: 'Section 4 · 11 Activities & Test (5 Tests)',
    description:
      'Aprende las reglas de sustantivos contables e incontables, uso de some, any, a, and cuantificadores con 11 actividades interactivas y un test final de 5 pruebas.',
    imageUrl: kitchenCakeImg,
    flashcards: [],
    exercises: [
      {
        id: 'nouns-count-and-non-count-main',
        type: 'count-non-count-activity' as any,
        title: 'Nouns: Count and Non-Count',
        instructions: 'Complete the 11 activities and the unit test with 5 questions.',
        instructionsEs: 'Completa las 11 actividades y el test con 5 preguntas.',
      },
    ],
  },
  // SECTION 5: Nutrition
  {
    id: 'nutrition',
    number: 5,
    title: 'Nutrition',
    titleEs: 'Nutrición',
    subtitle: 'Section 5 · 7 Activities & Test (10 Tests)',
    description:
      'Aprende vocabulario esencial de nutrición y alimentación saludable, completa las 7 actividades interactivas y realiza la evaluación final de 10 pruebas.',
    imageUrl:
      'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=800&q=80',
    flashcards: [],
    exercises: [
      {
        id: 'nutrition-main',
        type: 'nutrition-activity' as any,
        title: 'Nutrition',
        instructions: 'Complete the 7 activities and the final test with 10 questions.',
        instructionsEs: 'Completa las 7 actividades y el test final con 10 preguntas.',
      },
    ],
  },
];

