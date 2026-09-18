import { UnitSection } from '../types';
import { restaurantSceneImg } from './inTheRestaurantData';
import { vegetablesImg } from './saleAtShoprightData';

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
];
