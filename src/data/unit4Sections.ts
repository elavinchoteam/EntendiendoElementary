import { UnitSection } from '../types';
import { radioHostImg } from './sports1Data';

export const UNIT_4_SECTIONS: UnitSection[] = [
  // SECTION 1: Sports
  {
    id: 'sports',
    number: 1,
    title: 'Sports',
    titleEs: 'Deportes',
    subtitle: 'Section 1 · Sports Report, 5 Activities & Test (5 Tests)',
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
  // SECTION 2: People Are Crazy About Sports
  {
    id: 'people-are-crazy-about-sports',
    number: 2,
    title: 'People Are Crazy About Sports',
    titleEs: 'La Gente Está Loca por los Deportes',
    subtitle: 'Section 2 · Reading Story, 7 Activities & Test (5 Tests)',
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
];
