import { UnitSection } from '../types';
import { PRESENT_SIMPLE_MASTERCLASS_EXERCISES } from './presentSimpleMasterclassData';
import { newsstandImg } from './newsstandData';
import { peterDreamingImg } from './presentSimpleData';
import { brutusDogImg } from './presentSimpleQuestionsData';
import { shoppingWomenImg } from './presentSimpleWhQuestionsData';
import { DIRECTIONS_EXERCISES, twoWomenDirectionsImg } from './directionsData';

export const UNIT_3_SECTIONS: UnitSection[] = [
  // SECTION 1: Present Simple - Grammar Masterclass
  {
    id: 'present-simple-masterclass',
    number: 1,
    title: 'Present Simple',
    titleEs: 'Presente Simple: Gramática y Práctica Completa',
    subtitle: 'Section 1 · Masterclass, 6 Activities & "A Strange Day"',
    description:
      'Domina el Presente Simple: usos habituales y hechos, afirmaciones con terminación -s, preguntas de Sí/No con Do y Does, la regla de oro "DOES takes the S!", respuestas cortas, actividades interactivas y la práctica con test "A Strange Day".',
    imageUrl:
      'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80',
    flashcards: [],
    exercises: PRESENT_SIMPLE_MASTERCLASS_EXERCISES,
  },
  // SECTION 2: Directions to the Museum
  {
    id: 'directions-to-the-museum',
    number: 2,
    title: 'Directions to the Museum',
    titleEs: 'Direcciones al Museo',
    subtitle: 'Section 2 · Video, 9 Activities & Test',
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
  // SECTION 3: Clean-House Agency
  {
    id: 'clean-house-agency',
    number: 3,
    title: 'Clean-House Agency',
    titleEs: 'Agencia Clean-House',
    subtitle: 'Section 3 · Reading Ad, 6 Activities & Test',
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
  // SECTION 4: Newsstand
  {
    id: 'newsstand',
    number: 4,
    title: 'Newsstand',
    titleEs: 'Puesto de Periódicos',
    subtitle: 'Section 4 · Video Dialogue, 7 Activities & Interaction',
    description:
      'Diálogo interactivo en un puesto de periódicos entre un cliente y una dependienta ("Excuse me. Isn\'t there a train station near here?"). 7 actividades de comprensión y respuesta más una interacción de práctica de conversación con selección de personajes.',
    imageUrl: newsstandImg,
    flashcards: [],
    exercises: [
      {
        id: 'newsstand-main-container',
        type: 'newsstand-activity',
        title: 'Newsstand',
        instructions: 'Watch the dialogue video and complete the 7 activities and interaction.',
        instructionsEs: 'Mira el video del diálogo y completa las 7 actividades y la interacción.',
      },
    ],
  },
  // SECTION 5: Present Simple: Statements
  {
    id: 'present-simple-statements',
    number: 5,
    title: 'Present Simple: Statements',
    titleEs: 'Presente Simple: Afirmaciones y Negaciones',
    subtitle: 'Section 5 · Video Statement, 11 Activities & Test (5 Tests)',
    description:
      'Aprende a formular oraciones afirmativas y negativas en Presente Simple ("Peter swims on weekends. He doesn\'t swim during the week.") con 11 actividades secuenciales de arrastrar/seleccionar y un test final con 5 preguntas.',
    imageUrl: peterDreamingImg,
    flashcards: [],
    exercises: [
      {
        id: 'present-simple-statements-main',
        type: 'present-simple-statements',
        title: 'Present Simple: Statements',
        instructions: 'Watch the video statement and complete the 11 activities and 5 tests.',
        instructionsEs: 'Mira la oración del video y completa las 11 actividades y los 5 tests.',
      },
    ],
  },
  // SECTION 6: Present Simple: Yes/No Questions
  {
    id: 'present-simple-yes-no-questions',
    number: 6,
    title: 'Present Simple: Yes/No Questions',
    titleEs: 'Presente Simple: Preguntas de Sí/No',
    subtitle: 'Section 6 · Video Dialogue, 10 Activities & Test (5 Tests)',
    description:
      'Aprende a formular y responder preguntas de Sí/No en Presente Simple ("Do you like my dog Brutus? - Er, yes, I do. Does he bite? - No, he doesn\'t... not usually.") con 10 actividades secuenciales y un test de maestría de 5 preguntas.',
    imageUrl: brutusDogImg,
    flashcards: [],
    exercises: [
      {
        id: 'present-simple-yes-no-questions-main',
        type: 'present-simple-yes-no-questions',
        title: 'Present Simple: Yes/No Questions',
        instructions: 'Watch the video dialogue and complete the 10 actividades and los 5 tests.',
        instructionsEs: 'Mira el video del diálogo y completa las 10 actividades y los 5 tests.',
      },
    ],
  },
  // SECTION 7: Present Simple: Wh Questions
  {
    id: 'present-simple-wh-questions',
    number: 7,
    title: 'Present Simple: Wh Questions',
    titleEs: 'Presente Simple: Preguntas con Wh-',
    subtitle: 'Section 7 · Video Dialogue, 11 Activities & Test (5 Tests)',
    description:
      'Aprende a formular y responder preguntas informativas con Wh- en Presente Simple ("Where do you buy your clothes? - Why do you want to know?") con 11 actividades secuenciales y un test de maestría de 5 preguntas.',
    imageUrl: shoppingWomenImg,
    flashcards: [],
    exercises: [
      {
        id: 'present-simple-wh-questions-main',
        type: 'present-simple-wh-questions',
        title: 'Present Simple: Wh Questions',
        instructions: 'Watch the video dialogue and complete the 11 activities and 5 tests.',
        instructionsEs: 'Mira el video del diálogo y completa las 11 actividades y los 5 tests.',
      },
    ],
  },
  // SECTION 8: Directions
  {
    id: 'directions',
    number: 8,
    title: 'Directions',
    titleEs: 'Direcciones',
    subtitle: 'Section 8 · Urban Directions Vocabulary & Tasks',
    description:
      'Aprende vocabulario esencial para pedir y dar indicaciones en la calle (give directions, in front of, left at, map, near, next to, opposite, right at, street, turn), con 7 actividades interactivas y una evaluación final de 10 tests.',
    imageUrl: twoWomenDirectionsImg,
    flashcards: [],
    exercises: DIRECTIONS_EXERCISES,
  },
];

