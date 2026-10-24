import { Unit } from '../types';
import { UNIT_1_SECTIONS } from './unit1Sections';
import { PHONE_SALES_LESSON_TEXT, PHONE_SALES_EXERCISES } from './phoneSalesData';
import { UNIT_2_SECTIONS } from './unit2Sections';
import { FOOD_SECTION_LESSON_TEXT, FOOD_SECTION_EXERCISES } from './foodSectionData';
import { UNIT_3_SECTIONS } from './unit3Sections';
import { UNIT_4_SECTIONS } from './unit4Sections';
import { UNIT_5_SECTIONS } from './unit5Sections';
import {
  UNIT_6_SECTIONS,
  BE_PAST_REVIEW_LESSON_TEXT,
  BE_PAST_REVIEW_EXERCISES,
} from './unit6Sections';
import { UNIT_7_SECTIONS } from './unit7Sections';

export const UNITS_DATA: Unit[] = [
  {
    id: 1,
    number: 1,
    title: 'Unit 1: Buying and Selling',
    titleEs: 'Unidad 1: Comprar y Vender',
    subtitle: '6 Secciones: Phone Sales · Wrong Color · Dress from Paris · Be-Past · Shopping 2',
    description:
      'Aprende a comprender ofertas de compras y ventas, pedidos por teléfono, historias de tiendas y estructuras de Be en pasado con 6 secciones interactivas.',
    imageUrl:
      'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&q=80',
    color: '#0284c7', // unified sky-600
    category: 'Buying & Selling',
    requiredProgressToUnlock: 0,
    sections: UNIT_1_SECTIONS,

    // Step 1: Explore main text provided by the user
    lessonText: PHONE_SALES_LESSON_TEXT,

    // Flashcards removed for Unit 1 as requested by user
    flashcards: [],

    // Exercises: Activity 2 to Activity 8
    exercises: PHONE_SALES_EXERCISES,

    // Dialogue removed for Unit 1 as requested by user
    dialogue: [],
  },
  {
    id: 2,
    number: 2,
    title: 'Unit 2: Healthy Eating',
    titleEs: 'Unidad 2: Alimentación Saludable',
    subtitle: '7 Secciones: Countable & Non-Count · Food · Dieters · Piece of Cake · Non-Count Nouns · Count Nouns · In the Kitchen',
    description: 'Aprende sustantivos contables e incontables, cuantificadores, vocabulario de alimentos, recetas y programas de cocina con 7 secciones interactivas.',
    imageUrl: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80',
    color: '#0284c7',
    category: 'Food & Health',
    requiredProgressToUnlock: 0,
    sections: UNIT_2_SECTIONS,
    lessonText: FOOD_SECTION_LESSON_TEXT,
    flashcards: [],
    exercises: FOOD_SECTION_EXERCISES,
    dialogue: [],
    grammar: { title: 'Gramática', explanation: 'Sustantivos contables e incontables y expresiones para cuantificar alimentos.', examples: [] },
  },
  {
    id: 3,
    number: 3,
    title: 'Unit 3: Getting Help',
    titleEs: 'Unidad 3: Pedir Ayuda',
    subtitle: 'Sección 1: Present Simple · Sección 2: Directions to the Museum · Sección 3: Clean-House Agency · Sección 4: Newsstand · Sección 5: Present Simple: Statements · Sección 6: Present Simple: Yes/No Questions · Sección 7: Present Simple: Wh Questions · Sección 8: Directions',
    description:
      'Aprende a pedir y dar indicaciones en la calle, comprender anuncios, interactuar en situaciones cotidianas y dominar afirmaciones, negaciones y preguntas de Sí/No y Wh- en presente simple con videos, actividades interactivas y tests.',
    imageUrl:
      'https://images.unsplash.com/photo-1518998053901-5348d3961a04?auto=format&fit=crop&w=800&q=80',
    color: '#0284c7',
    category: 'Directions & Urban Life',
    requiredProgressToUnlock: 0,
    sections: UNIT_3_SECTIONS,
    flashcards: [],
    exercises: [],
    dialogue: [],
    grammar: {
      title: 'Giving & Asking for Directions',
      explanation: 'Uso de verbos de movimiento, esquinas, referencias y preguntas de cortesía.',
      examples: [],
    },
  },
  {
    id: 4,
    number: 4,
    title: 'Unit 4: Sports',
    titleEs: 'Unidad 4: Deportes',
    subtitle: 'Sección 1: Comparatives and Superlatives · Sección 2: Sports · Sección 3: People Are Crazy About Sports · Sección 4: Let\'s Go Swimming · Sección 5: Comparison of Adjectives: Equality · Sección 6: Comparison of Adjectives: Comparatives · Sección 7: Comparison of Adjectives: Superlatives · Sección 8: Sports 2',
    description:
      'Domina las reglas de comparativos y superlativos con la Masterclass bilingüe y ejercicios interactivos, vocabulario y comprensión de deportes ("Sports", "People Are Crazy About Sports", "Let\'s Go Swimming", "Sports 2") y estructuras de adjetivos con 8 secciones interactivas.',
    imageUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80',
    color: '#0284c7',
    category: 'Leisure & Athletics',
    requiredProgressToUnlock: 0,
    sections: UNIT_4_SECTIONS,
    flashcards: [],
    exercises: [],
    dialogue: [],
    grammar: { title: 'Gramática', explanation: '8 secciones de Deportes y Comparación de Adjetivos (Comparativos y Superlativos) disponibles.', examples: [] },
  },
  {
    id: 5,
    number: 5,
    title: 'Unit 5: Enjoy your Meal!',
    titleEs: 'Unidad 5: ¡Buen Provecho!',
    subtitle: 'Sección 1: COUNTABLE AND UNCOUNTABLE NOUNS · Sección 2: In the Restaurant · Sección 3: Sale at Shopright · Sección 4: Good to See You · Sección 5: Nouns: Count and Non-Count · Sección 6: Nutrition',
    description: 'Aprende sustantivos contables e incontables con Masterclass y práctica real, a ordenar en un restaurante, ofertas de supermercado, saludos sociales, sustantivos contables e incontables con videos y actividades, y nutrición y alimentación saludable con tests de evaluación.',
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    color: '#0284c7',
    category: 'Dining & Food',
    requiredProgressToUnlock: 0,
    sections: UNIT_5_SECTIONS,
    flashcards: [],
    exercises: [],
    dialogue: [],
    grammar: { title: 'Gramática', explanation: 'Secciones 1 a 6: COUNTABLE AND UNCOUNTABLE NOUNS, In the Restaurant, Sale at Shopright, Good to See You, Nouns: Count and Non-Count y Nutrition.', examples: [] },
  },
  {
    id: 6,
    number: 6,
    title: 'Unit 6: Review 1',
    titleEs: 'Unidad 6: Repaso 1',
    subtitle: 'Review 1 · 5 Secciones: Be-Past, Adjetivos, Mad Mo\'s Store, Family & We\'re Closed',
    description:
      'Repaso integral de Review 1: Be en pasado, comparaciones y superlativos de adjetivos, lectura comercial de Mad Mo\'s Department Store, comprensión auditiva de Family y diálogo guiado de We\'re Closed con actividades interactivas.',
    imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80',
    color: '#0284c7',
    category: 'Review & Assessment',
    requiredProgressToUnlock: 5,
    sections: UNIT_6_SECTIONS,
    lessonText: BE_PAST_REVIEW_LESSON_TEXT,
    flashcards: [],
    exercises: BE_PAST_REVIEW_EXERCISES as any,
    dialogue: [],
    grammar: {
      title: 'Gramática: Be en Pasado',
      explanation:
        'Uso de was con pronombres singulares (I, he, she, it) y were con plurales (you, we, they), preguntas y respuestas cortas.',
      examples: [
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
    },
  },
  {
    id: 7,
    number: 7,
    title: 'Unit 7: Interesting People',
    titleEs: 'Unidad 7: Personas Interesantes',
    subtitle: 'Sección 1: Past Simple · Sección 2: Interview · Sección 3: Do it! · Sección 4: Movie Star · Sección 5: Regular Verbs · Sección 6: Irregular Verbs · Sección 7: Questions · Sección 8: Adjectives 2',
    description:
      'Aprende y domina el Past Simple y vocabulario en inglés: masterclass gramatical, entrevista a Larry Patel, lectura "Do it!", diálogo "Movie Star", verbos regulares e irregulares, preguntas en pasado y adjetivos 2 con actividades interactivas completas y tests de evaluación.',
    imageUrl:
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    color: '#0284c7',
    category: 'Biographies & Past Actions',
    requiredProgressToUnlock: 0,
    sections: UNIT_7_SECTIONS,
    flashcards: [],
    exercises: [],
    dialogue: [],
    grammar: {
      title: 'Gramática: Past Simple',
      explanation:
        'Uso del Past Simple para acciones terminadas, verbos regulares (-ed) e irregulares, did / didn\'t con la forma base.',
      examples: [
        { en: 'Yesterday, I missed the bus.', es: 'Ayer perdí el autobús.' },
        { en: 'Last weekend, I went to a concert.', es: 'El fin de semana pasado fui a un concierto.' },
        { en: "I didn't take my umbrella, so I got wet.", es: 'No llevé mi paraguas, así que me mojé.' },
        { en: 'Did you see that strange man?', es: '¿Viste a ese hombre extraño?' },
      ],
    },
  },
  {
    id: 8,
    number: 8,
    title: 'Family Life',
    titleEs: 'Vida Familiar',
    subtitle: 'Unidad 8 · A la espera de tu contenido',
    description: 'Espacio preparado. Se cargarán las tarjetas y ejercicios interactivos tan pronto envíes el contenido.',
    imageUrl: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=800&q=80',
    color: '#0284c7',
    category: 'Family & Relationships',
    requiredProgressToUnlock: 7,
    flashcards: [],
    exercises: [],
    dialogue: [],
    grammar: { title: 'Gramática', explanation: 'Pendiente de contenido.', examples: [] },
  },
  {
    id: 9,
    number: 9,
    title: 'A Bad Day',
    titleEs: 'Un Mal Día',
    subtitle: 'Unidad 9 · A la espera de tu contenido',
    description: 'Espacio preparado. Se cargarán las tarjetas y ejercicios interactivos tan pronto envíes el contenido.',
    imageUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
    color: '#0284c7',
    category: 'Feelings & Past Incidents',
    requiredProgressToUnlock: 8,
    flashcards: [],
    exercises: [],
    dialogue: [],
    grammar: { title: 'Gramática', explanation: 'Pendiente de contenido.', examples: [] },
  },
  {
    id: 10,
    number: 10,
    title: 'Housing',
    titleEs: 'Vivienda y Alojamiento',
    subtitle: 'Unidad 10 · A la espera de tu contenido',
    description: 'Espacio preparado. Se cargarán las tarjetas y ejercicios interactivos tan pronto envíes el contenido.',
    imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80',
    color: '#0284c7',
    category: 'Real Estate & Living',
    requiredProgressToUnlock: 9,
    flashcards: [],
    exercises: [],
    dialogue: [],
    grammar: { title: 'Gramática', explanation: 'Pendiente de contenido.', examples: [] },
  },
  {
    id: 11,
    number: 11,
    title: 'Hobbies',
    titleEs: 'Pasatiempos y Aficiones',
    subtitle: 'Unidad 11 · A la espera de tu contenido',
    description: 'Espacio preparado. Se cargarán las tarjetas y ejercicios interactivos tan pronto envíes el contenido.',
    imageUrl: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80',
    color: '#0284c7',
    category: 'Leisure & Interests',
    requiredProgressToUnlock: 10,
    flashcards: [],
    exercises: [],
    dialogue: [],
    grammar: { title: 'Gramática', explanation: 'Pendiente de contenido.', examples: [] },
  },
  {
    id: 12,
    number: 12,
    title: 'Review 2',
    titleEs: 'Repaso 2 (Unidades 7 a 11)',
    subtitle: 'Unidad 12 · A la espera de tu contenido',
    description: 'Espacio preparado. Se cargarán las tarjetas y ejercicios interactivos tan pronto envíes el contenido.',
    imageUrl: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80',
    color: '#0284c7',
    category: 'Comprehensive Review',
    requiredProgressToUnlock: 11,
    flashcards: [],
    exercises: [],
    dialogue: [],
    grammar: { title: 'Gramática', explanation: 'Pendiente de contenido.', examples: [] },
  },
];
