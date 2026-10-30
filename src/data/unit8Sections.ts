import { UnitSection } from '../types';

export const UNIT_8_SECTIONS: UnitSection[] = [
  // SECTION 1: GOOD MORNING!
  {
    id: 'good-morning',
    number: 1,
    title: 'Good Morning!',
    titleEs: '¡Buenos días!',
    subtitle: 'Section 1 · Video Lesson (12 Actividades + 5 Tests)',
    description:
      'Una mañana en casa entre un padre y su hija mientras se preparan para el día escolar y laboral. Incluye video, diálogo sincronizado, vocabulario con imágenes, completación y test de evaluación de 5 preguntas con tarjetas reversibles en 3D.',
    imageUrl:
      'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=800&q=80',
    flashcards: [],
    exercises: [
      {
        id: 'good-morning-main',
        type: 'good-morning-activity' as any,
        title: 'Good Morning!',
        instructions:
          'Watch the video, complete all 12 activities and take the 5-question test.',
        instructionsEs:
          'Mira el video, completa las 12 actividades y realiza el test de 5 preguntas.',
      },
    ],
  },
  // SECTION 2: THE FAMILY PICNIC
  {
    id: 'family-picnic',
    number: 2,
    title: 'The Family Picnic',
    titleEs: 'El Picnic Familiar',
    subtitle: 'Section 2 · Reading Story (7 Actividades + 5 Tests)',
    description:
      'Una historia familiar sobre la visita sorpresa de una hermana, un picnic en el parque que se transforma en aventura, vocabulario de parentesco, orden cronológico y test de evaluación con tarjetas reversibles en 3D.',
    imageUrl:
      'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80',
    flashcards: [],
    exercises: [
      {
        id: 'family-picnic-main',
        type: 'family-picnic-activity' as any,
        title: 'The Family Picnic',
        instructions:
          'Read the story, complete all 7 activities and take the 5-question test.',
        instructionsEs:
          'Lee la historia, completa las 7 actividades y realiza el test de 5 preguntas.',
      },
    ],
  },
];
