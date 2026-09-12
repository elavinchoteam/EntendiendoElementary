import { UnitSection } from '../types';

export const UNIT_3_SECTIONS: UnitSection[] = [
  // SECTION 1: Directions to the Museum
  {
    id: 'directions-to-the-museum',
    number: 1,
    title: 'Directions to the Museum',
    titleEs: 'Direcciones al Museo',
    subtitle: 'Section 1 · Video, 9 Activities & Test',
    description:
      'Aprende a pedir y comprender direcciones en la calle, ubicar tiendas y lugares de referencia con 9 actividades interactivas y un test final de 5 preguntas.',
    imageUrl:
      'https://images.unsplash.com/photo-1518998053901-5348d3961a04?auto=format&fit=crop&w=800&q=80',
    flashcards: [],
    exercises: [
      {
        id: 'museum-main-container',
        type: 'directions-explore',
        title: 'Directions to the Museum',
        instructions: 'Watch the video and complete the 9 activities and unit test.',
        instructionsEs: 'Mira el video y completa las 9 actividades y el test.',
      },
    ],
  },
  // SECTION 2: Clean-House Agency
  {
    id: 'clean-house-agency',
    number: 2,
    title: 'Clean-House Agency',
    titleEs: 'Agencia Clean-House',
    subtitle: 'Section 2 · Reading Ad, 6 Activities & Test',
    description:
      'Lectura interactiva del anuncio de la agencia de limpieza Clean-House Agency, 6 actividades secuenciales (completar oraciones, entrevista de periódico, comprensión lectora, diálogo telefónico, redacción con IA) y evaluación con 5 tests.',
    imageUrl:
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80',
    flashcards: [],
    exercises: [
      {
        id: 'clean-house-agency-main',
        type: 'clean-house-agency',
        title: 'Clean-House Agency',
        instructions: 'Read the ad and complete the 6 activities and test.',
        instructionsEs: 'Lee el anuncio y completa las 6 actividades y el test.',
      },
    ],
  },
];
