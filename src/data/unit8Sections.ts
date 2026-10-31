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
  // SECTION 3: CAN I?
  {
    id: 'can-i',
    number: 3,
    title: 'Can I?',
    titleEs: '¿Puedo?',
    subtitle: 'Section 3 · Dialogue & Interactions (8 Actividades + 2 Interacciones)',
    description:
      'Diálogo en la estación de tren entre Tommy y su madre sobre pedir permiso, comprensión auditiva, respuestas recomendadas e interacciones conversacionales de roleplay con tarjetas reversibles en 3D.',
    imageUrl: '/assets/can_i_scene.png',
    flashcards: [],
    exercises: [
      {
        id: 'can-i-main',
        type: 'can-i-activity' as any,
        title: 'Can I?',
        instructions:
          'Watch the scene, complete all 8 activities and practice the 2 conversation interactions.',
        instructionsEs:
          'Mira la escena, completa las 8 actividades y practica las 2 interacciones conversacionales.',
      },
    ],
  },
  // SECTION 4: PRESENT SIMPLE: TASK QUESTIONS (TAG QUESTIONS)
  {
    id: 'tag-questions',
    number: 4,
    title: 'Present Simple: Task Questions',
    titleEs: 'Present Simple: Preguntas Coletilla (Tag Questions)',
    subtitle: 'Section 4 · Tag Questions (11 Actividades + 5 Tests)',
    description:
      'Aprende y practica las preguntas coletilla (tag questions) en Present Simple: diálogo sincronizado con video, reglas afirmativo-negativo y negativo-afirmativo, 11 actividades interactivas de arrastrar y soltar, y test de evaluación de 5 preguntas con tarjetas reversibles en 3D.',
    imageUrl: '/assets/tag_questions_scene.png',
    flashcards: [],
    exercises: [
      {
        id: 'tag-questions-main',
        type: 'tag-questions-activity' as any,
        title: 'Present Simple: Task Questions',
        instructions:
          'Watch the scene, complete all 11 activities and take the 5-question test.',
        instructionsEs:
          'Mira la escena, completa las 11 actividades y realiza el test de 5 preguntas.',
      },
    ],
  },
  // SECTION 5: MODALS: CAN
  {
    id: 'modals-can',
    number: 5,
    title: 'Modals: Can',
    titleEs: 'Verbos Modales: Can (Poder)',
    subtitle: 'Section 5 · Modals: Can (11 Actividades + 5 Tests)',
    description:
      'Aprende y domina el verbo modal "can" y "can\'t" para expresar habilidad, incapacidad, permiso y posibilidad: diálogo sincronizado, 11 actividades interactivas y test de evaluación de 5 preguntas con tarjetas reversibles en 3D.',
    imageUrl: '/assets/modals_can_scene.png',
    flashcards: [],
    exercises: [
      {
        id: 'modals-can-main',
        type: 'modals-can-activity' as any,
        title: 'Modals: Can',
        instructions:
          'Watch the scene, complete all 11 activities and take the 5-question test.',
        instructionsEs:
          'Mira la escena, completa las 11 actividades y realiza el test de 5 preguntas.',
      },
    ],
  },
  // SECTION 6: RELATIONSHIPS
  {
    id: 'relationships',
    number: 6,
    title: 'Relationships',
    titleEs: 'Relaciones Familiares',
    subtitle: 'Section 6 · Vocabulary & Reading (7 Actividades + 10 Tests)',
    description:
      'Vocabulario esencial sobre relaciones familiares y parentesco (aunt, uncle, cousin, relative, reunion, have fun, family picnic, fight, young and old, phone home): 7 actividades interactivas completas (exploración visual con modal, colocaciones A y B, 2 dictados auditivos, 2 diálogos y párrafo cloze) y test evaluativo de 10 preguntas con tarjetas reversibles en 3D.',
    imageUrl: '/assets/relationships_vocabulary.png',
    flashcards: [],
    exercises: [
      {
        id: 'relationships-main',
        type: 'relationships-activity' as any,
        title: 'Relationships',
        instructions:
          'Explore the vocabulary, complete all 7 activities and take the 10-question test.',
        instructionsEs:
          'Explora el vocabulario, completa las 7 actividades y realiza el test de 10 preguntas.',
      },
    ],
  },
];

