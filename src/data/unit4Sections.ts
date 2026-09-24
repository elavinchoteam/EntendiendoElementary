import { UnitSection } from '../types';
import { radioHostImg } from './sports1Data';
import { swimmingWomenImg } from './swimmingData';
import { mickStarlightCarImg } from './comparisonEqualityData';
import { samuraiSamBoxingImg } from './comparisonComparativesData';
import { madMosStoreImg } from './comparisonSuperlativesData';
import { SPORTS_2_EXERCISES, sportsFansCheeringImg } from './sports2Data';

export const UNIT_4_SECTIONS: UnitSection[] = [
  // SECTION 1: Comparatives and Superlatives
  {
    id: 'comparatives-and-superlatives',
    number: 1,
    title: 'Comparatives and Superlatives',
    titleEs: 'Comparativos y Superlativos',
    subtitle: 'Section 1 · Grammar Masterclass & Interactive Practice',
    description:
      'Aprende a dominar comparativos y superlativos con adjetivos cortos, terminados en -y, largos, formas irregulares, comparaciones de igualdad y 5 ejercicios interactivos.',
    imageUrl:
      'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80',
    flashcards: [],
    exercises: [
      {
        id: 'comparatives-superlatives-main',
        type: 'comparatives-superlatives-masterclass',
        title: 'Comparatives and Superlatives',
        instructions:
          'Learn the rules of comparatives and superlatives, explore bilingual reversible cards with audio, and complete all 5 interactive exercises.',
        instructionsEs:
          'Aprende las reglas de comparativos y superlativos, explora tarjetas reversibles bilingües con audio y completa los 5 ejercicios interactivos.',
      },
    ],
  },
  // SECTION 2: Sports
  {
    id: 'sports',
    number: 2,
    title: 'Sports',
    titleEs: 'Deportes',
    subtitle: 'Section 2 · Sports Report, 5 Activities & Test (5 Tests)',
    description:
      'Informe deportivo en la radio con Jack Hill sobre béisbol, fútbol, ciclismo (Tour de France), tenis y las Olimpiadas Infantiles en California. 5 actividades interactivas y test final de 5 preguntas.',
    imageUrl: radioHostImg,
    flashcards: [],
    exercises: [
      {
        id: 'sports-section-1-main',
        type: 'sports-activity',
        title: 'Sports',
        instructions:
          'Listen to Jack Hill\'s radio sports report and complete the 5 activities and the 5-part test.',
        instructionsEs:
          'Escucha el informe deportivo de radio de Jack Hill y completa las 5 actividades y el test de 5 preguntas.',
      },
    ],
  },
  // SECTION 3: People Are Crazy About Sports
  {
    id: 'people-are-crazy-about-sports',
    number: 3,
    title: 'People Are Crazy About Sports',
    titleEs: 'La Gente Está Loca por los Deportes',
    subtitle: 'Section 3 · Reading Story, 7 Activities & Test (5 Tests)',
    description:
      'Lectura sobre por qué a la gente le encanta ver deportes: el estudio del Profesor Len Sanders de Georgetown University, atletas profesionales y aficionados masivos. 7 actividades interactivas y test de 5 preguntas.',
    imageUrl:
      'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80',
    flashcards: [],
    exercises: [
      {
        id: 'people-crazy-sports-main',
        type: 'people-crazy-sports-activity',
        title: 'People Are Crazy About Sports',
        instructions:
          'Read "People Are Crazy About Sports" by Stan Bruer and complete the 7 activities and the 5-part test.',
        instructionsEs:
          'Lee "La gente está loca por los deportes" de Stan Bruer y completa las 7 actividades y el test de 5 preguntas.',
      },
    ],
  },
  // SECTION 4: Let's Go Swimming
  {
    id: 'lets-go-swimming',
    number: 4,
    title: "Let's Go Swimming",
    titleEs: 'Vamos a Nadar',
    subtitle: 'Section 4 · Dialogue, 6 Activities & Interaction (3 Parts)',
    description:
      'Diálogo entre dos amigas decidiendo planes para la tarde: descartan ir al centro comercial y deciden ir a nadar. 6 actividades interactivas y 1 actividad de interacción en 3 partes con tarjetas reversibles y audio.',
    imageUrl: swimmingWomenImg,
    flashcards: [],
    exercises: [
      {
        id: 'lets-go-swimming-main',
        type: 'swimming-activity',
        title: "Let's Go Swimming",
        instructions:
          'Listen to the dialogue, explore the 6 activities, and complete the 3-part interaction roleplay.',
        instructionsEs:
          'Escucha el diálogo, explora las 6 actividades y completa el juego de rol de interacción de 3 partes.',
      },
    ],
  },
  // SECTION 5: Comparison of Adjectives: Equality
  {
    id: 'comparison-adjectives-equality',
    number: 5,
    title: 'Comparison of Adjectives: Equality',
    titleEs: 'Comparación de Adjetivos: Igualdad',
    subtitle: 'Section 5 · Grammar, 11 Activities & Test (5 Tests)',
    description:
      'Aprende y practica la comparación de igualdad con la estructura "as + adjetivo + as" (tan... como). Cuenta con 11 actividades con tarjetas reversibles con audio, y un test de evaluación de 5 preguntas.',
    imageUrl: mickStarlightCarImg,
    flashcards: [],
    exercises: [
      {
        id: 'comparison-equality-main',
        type: 'comparison-equality-activity',
        title: 'Comparison of Adjectives: Equality',
        instructions:
          'Learn and practice adjective comparisons of equality with 11 activities and a 5-part test.',
        instructionsEs:
          'Aprende y practica las comparaciones de adjetivos de igualdad con 11 actividades y un test de 5 preguntas.',
      },
    ],
  },
  // SECTION 6: Comparison of Adjectives: Comparatives
  {
    id: 'comparison-adjectives-comparatives',
    number: 6,
    title: 'Comparison of Adjectives: Comparatives',
    titleEs: 'Comparación de Adjetivos: Comparativos',
    subtitle: 'Section 6 · Grammar, 11 Activities & Test (5 Tests)',
    description:
      'Aprende y practica la comparación de adjetivos en grado comparativo ("stronger than", "more popular", "less comfortable", etc.). Cuenta con 11 actividades con tarjetas reversibles con audio, y un test final de 5 preguntas.',
    imageUrl: samuraiSamBoxingImg,
    flashcards: [],
    exercises: [
      {
        id: 'comparison-comparatives-main',
        type: 'comparison-comparatives-activity',
        title: 'Comparison of Adjectives: Comparatives',
        instructions:
          'Learn and practice adjective comparisons with comparative forms through 11 activities and a 5-part test.',
        instructionsEs:
          'Aprende y practica las comparaciones de adjetivos en grado comparativo a través de 11 actividades y un test de 5 preguntas.',
      },
    ],
  },
  // SECTION 7: Comparison of Adjectives: Superlatives
  {
    id: 'comparison-adjectives-superlatives',
    number: 7,
    title: 'Comparison of Adjectives: Superlatives',
    titleEs: 'Comparación de Adjetivos: Superlativos',
    subtitle: 'Section 7 · Grammar, 11 Activities & Test (5 Tests)',
    description:
      'Aprende y practica la comparación de adjetivos en grado superlativo ("the cheapest", "the biggest", "the most terrific", "the best", etc.). Cuenta con 11 actividades con tarjetas reversibles con audio, y un test final de 5 preguntas.',
    imageUrl: madMosStoreImg,
    flashcards: [],
    exercises: [
      {
        id: 'comparison-superlatives-main',
        type: 'comparison-superlatives-activity',
        title: 'Comparison of Adjectives: Superlatives',
        instructions:
          'Learn and practice adjective comparisons with superlative forms through 11 activities and a 5-part test.',
        instructionsEs:
          'Aprende y practica las comparaciones de adjetivos en grado superlativo a través de 11 actividades y un test de 5 preguntas.',
      },
    ],
  },
  // SECTION 8: Sports 2
  {
    id: 'sports-2',
    number: 8,
    title: 'Sports 2',
    titleEs: 'Deportes 2',
    subtitle: 'Section 8 · Sports Vocabulary, 7 Activities & Test (10 Tests)',
    description:
      'Aprende vocabulario deportivo clave (athlete, basketball, bicycle, championship, exercise, game, player, race, stadium, win), completa 7 actividades interactivas en orden y realiza el test final de 10 preguntas.',
    imageUrl: sportsFansCheeringImg,
    flashcards: [],
    exercises: SPORTS_2_EXERCISES,
  },
];
