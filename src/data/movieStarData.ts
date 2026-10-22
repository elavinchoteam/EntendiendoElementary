import {
  LessonSentence,
  RadioChoiceExercise,
  SpeechResponseExercise,
  RoleplayCharacter,
} from '../types';
import movieStarImg from '../assets/images/movie_star_dialogue.jpg';

export { movieStarImg };

export interface MovieStarSentence extends LessonSentence {
  speaker: 'Mark' | 'Carol';
  speakerGender: 'male' | 'female';
  startTime: number;
  endTime: number;
}

export const MOVIE_STAR_SENTENCES: MovieStarSentence[] = [
  {
    en: "- Isn't that Robert Richman, the movie star?",
    es: '- ¿No es ese Robert Richman, la estrella de cine?',
    speaker: 'Mark',
    speakerGender: 'male',
    startTime: 0,
    endTime: 3.5,
  },
  {
    en: "- Yes, you're right. I think he's the greatest.",
    es: '- Sí, tienes razón. Creo que es el mejor.',
    speaker: 'Carol',
    speakerGender: 'female',
    startTime: 3.5,
    endTime: 7.0,
  },
  {
    en: "- The greatest? He's the worst actor I know.",
    es: '- ¿El mejor? Es el peor actor que conozco.',
    speaker: 'Mark',
    speakerGender: 'male',
    startTime: 7.0,
    endTime: 10.5,
  },
  {
    en: '- What? But he won an Oscar for best actor last year.',
    es: '- ¿Qué? Pero ganó un Oscar a mejor actor el año pasado.',
    speaker: 'Carol',
    speakerGender: 'female',
    startTime: 10.5,
    endTime: 14.0,
  },
  {
    en: "- Yeah? Well, to me he's terrible.",
    es: '- ¿Sí? Bueno, para mí es pésimo.',
    speaker: 'Mark',
    speakerGender: 'male',
    startTime: 14.0,
    endTime: 17.0,
  },
  {
    en: '- Well, I like him.',
    es: '- Bueno, a mí me gusta.',
    speaker: 'Carol',
    speakerGender: 'female',
    startTime: 17.0,
    endTime: 19.0,
  },
];

export const MOVIE_STAR_AUDIO_TEXT =
  "Isn't that Robert Richman, the movie star? Yes, you're right. I think he's the greatest. The greatest? He's the worst actor I know. What? But he won an Oscar for best actor last year. Yeah? Well, to me he's terrible. Well, I like him.";

export const MOVIE_STAR_TEXT_ES =
  '- ¿No es ese Robert Richman, la estrella de cine?\n- Sí, tienes razón. Creo que es el mejor.\n- ¿El mejor? Es el peor actor que conozco.\n- ¿Qué? Pero ganó un Oscar a mejor actor el año pasado.\n- ¿Sí? Bueno, para mí es pésimo.\n- Bueno, a mí me gusta.';

// -----------------------------------------------------------------------------
// ACTIVIDAD 2: Radio Choice - Who most likely are the speakers?
// -----------------------------------------------------------------------------
export const MOVIE_STAR_ACT2: RadioChoiceExercise = {
  id: 'ms-act2-who-speakers',
  type: 'radio-choice',
  instructions: 'Choose the correct answer.',
  instructionsEs: 'Elige la respuesta correcta.',
  question: 'Who most likely are the speakers?',
  questionEs: '¿Quiénes son más probablemente los interlocutores?',
  imageUrl: movieStarImg,
  durationSeconds: 19,
  audioPrompt: MOVIE_STAR_AUDIO_TEXT,
  sentences: MOVIE_STAR_SENTENCES,
  options: [
    {
      id: 'ms-act2-opt-1',
      text: 'Journalists',
      textEs: 'Periodistas',
      isCorrect: false,
    },
    {
      id: 'ms-act2-opt-2',
      text: 'Waiters',
      textEs: 'Camareros',
      isCorrect: false,
    },
    {
      id: 'ms-act2-opt-3',
      text: 'Movie stars',
      textEs: 'Estrellas de cine',
      isCorrect: false,
    },
    {
      id: 'ms-act2-opt-4',
      text: 'Friends',
      textEs: 'Amigos',
      isCorrect: true,
    },
  ],
  correctAnswerId: 'ms-act2-opt-4',
  explanation:
    'The speakers are casually chatting and sharing personal opinions at an event, speaking comfortably with one another like friends.',
  explanationEs:
    'Los interlocutores están conversando informalmente y compartiendo opiniones personales en un evento, hablando con confianza como amigos.',
};

// -----------------------------------------------------------------------------
// ACTIVIDAD 3: Radio Choice - What does the man say about Robert Richman?
// -----------------------------------------------------------------------------
export const MOVIE_STAR_ACT3: RadioChoiceExercise = {
  id: 'ms-act3-what-man-says',
  type: 'radio-choice',
  instructions: 'Choose the correct answer.',
  instructionsEs: 'Elige la respuesta correcta.',
  question: 'What does the man say about Robert Richman?',
  questionEs: '¿Qué dice el hombre sobre Robert Richman?',
  imageUrl: movieStarImg,
  durationSeconds: 19,
  audioPrompt: MOVIE_STAR_AUDIO_TEXT,
  sentences: MOVIE_STAR_SENTENCES,
  options: [
    {
      id: 'ms-act3-opt-1',
      text: 'He is a good friend of his.',
      textEs: 'Es un buen amigo suyo.',
      isCorrect: false,
    },
    {
      id: 'ms-act3-opt-2',
      text: 'He was in a movie with him.',
      textEs: 'Estuvo en una película con él.',
      isCorrect: false,
    },
    {
      id: 'ms-act3-opt-3',
      text: 'He read a book about him.',
      textEs: 'Leyó un libro sobre él.',
      isCorrect: false,
    },
    {
      id: 'ms-act3-opt-4',
      text: "He thinks he's a terrible actor.",
      textEs: 'Piensa que es un actor pésimo.',
      isCorrect: true,
    },
  ],
  correctAnswerId: 'ms-act3-opt-4',
  explanation:
    'The man explicitly states: "He\'s the worst actor I know" and "Well, to me he\'s terrible."',
  explanationEs:
    'El hombre dice explícitamente: "He\'s the worst actor I know" (Es el peor actor que conozco) y "Well, to me he\'s terrible" (Bueno, para mí es pésimo).',
};

// -----------------------------------------------------------------------------
// ACTIVIDAD 4: Radio Choice - Who are the speakers discussing?
// -----------------------------------------------------------------------------
export const MOVIE_STAR_ACT4: RadioChoiceExercise = {
  id: 'ms-act4-who-discussing',
  type: 'radio-choice',
  instructions: 'Choose the correct answer.',
  instructionsEs: 'Elige la respuesta correcta.',
  question: 'Who are the speakers discussing?',
  questionEs: '¿De quién están hablando los interlocutores?',
  imageUrl: movieStarImg,
  durationSeconds: 19,
  audioPrompt: MOVIE_STAR_AUDIO_TEXT,
  sentences: MOVIE_STAR_SENTENCES,
  options: [
    {
      id: 'ms-act4-opt-1',
      text: 'An employer',
      textEs: 'Un empleador',
      isCorrect: false,
    },
    {
      id: 'ms-act4-opt-2',
      text: 'An actor',
      textEs: 'Un actor',
      isCorrect: true,
    },
    {
      id: 'ms-act4-opt-3',
      text: 'A friend',
      textEs: 'Un amigo',
      isCorrect: false,
    },
    {
      id: 'ms-act4-opt-4',
      text: 'A director',
      textEs: 'Un director',
      isCorrect: false,
    },
  ],
  correctAnswerId: 'ms-act4-opt-2',
  explanation:
    'They are discussing Robert Richman, whom they describe as a movie star who won an Oscar for best actor.',
  explanationEs:
    'Están hablando de Robert Richman, a quien describen como una estrella de cine que ganó un Oscar al mejor actor.',
};

// -----------------------------------------------------------------------------
// ACTIVIDAD 5: Radio Choice - What does the woman say about Robert Richman?
// -----------------------------------------------------------------------------
export const MOVIE_STAR_ACT5: RadioChoiceExercise = {
  id: 'ms-act5-what-woman-says',
  type: 'radio-choice',
  instructions: 'Choose the correct answer.',
  instructionsEs: 'Elige la respuesta correcta.',
  question: 'What does the woman say about Robert Richman?',
  questionEs: '¿Qué dice la mujer sobre Robert Richman?',
  imageUrl: movieStarImg,
  durationSeconds: 19,
  audioPrompt: MOVIE_STAR_AUDIO_TEXT,
  sentences: MOVIE_STAR_SENTENCES,
  options: [
    {
      id: 'ms-act5-opt-1',
      text: 'He wrote a screenplay.',
      textEs: 'Escribió un guion.',
      isCorrect: false,
    },
    {
      id: 'ms-act5-opt-2',
      text: 'He is very good-looking.',
      textEs: 'Es muy atractivo.',
      isCorrect: false,
    },
    {
      id: 'ms-act5-opt-3',
      text: 'He has a lot of money.',
      textEs: 'Tiene mucho dinero.',
      isCorrect: false,
    },
    {
      id: 'ms-act5-opt-4',
      text: 'He won an Oscar for best actor.',
      textEs: 'Ganó un Oscar a mejor actor.',
      isCorrect: true,
    },
  ],
  correctAnswerId: 'ms-act5-opt-4',
  explanation:
    'The woman highlights his achievement: "What? But he won an Oscar for best actor last year."',
  explanationEs:
    'La mujer destaca su logro: "¿Qué? Pero ganó un Oscar a mejor actor el año pasado".',
};

// -----------------------------------------------------------------------------
// ACTIVIDAD 6: Speech Response - What's the best response to the statement?
// -----------------------------------------------------------------------------
export const MOVIE_STAR_ACT6: SpeechResponseExercise = {
  id: 'ms-act6-best-response-statement',
  type: 'speech-response',
  instructions: "What's the best response to the statement?",
  instructionsEs: '¿Cuál es la mejor respuesta a la afirmación?',
  subtitle: "Click 'Start' to record the correct answer.",
  subtitleEs: "Haz clic en 'Start' para grabar la respuesta correcta.",
  promptStatement: '"He\'s the worst actor I know."',
  promptStatementEs: '"Es el peor actor que conozco."',
  promptIsQuestion: false,
  imageUrl: movieStarImg,
  durationSeconds: 19,
  audioPrompt: MOVIE_STAR_AUDIO_TEXT,
  sentences: MOVIE_STAR_SENTENCES,
  options: [
    {
      id: 'ms-act6-opt-1',
      text: 'The greatest?',
      textEs: '¿El mejor?',
      isCorrect: false,
    },
    {
      id: 'ms-act6-opt-2',
      text: 'But he won an Oscar last year.',
      textEs: 'Pero ganó un Oscar el año pasado.',
      isCorrect: true,
    },
    {
      id: 'ms-act6-opt-3',
      text: "Well, to me he's terrible.",
      textEs: 'Bueno, para mí es pésimo.',
      isCorrect: false,
    },
  ],
  correctAnswerId: 'ms-act6-opt-2',
  explanation:
    'In the conversation, when the man claims "He\'s the worst actor I know", the woman counters with: "What? But he won an Oscar for best actor last year."',
  explanationEs:
    'En la conversación, cuando el hombre dice "Es el peor actor que conozco", la mujer responde rebatiendo: "¿Qué? Pero ganó un Oscar el año pasado".',
};

// -----------------------------------------------------------------------------
// ACTIVIDAD 7: Speech Response - What's the best response to the question?
// -----------------------------------------------------------------------------
export const MOVIE_STAR_ACT7: SpeechResponseExercise = {
  id: 'ms-act7-best-response-question',
  type: 'speech-response',
  instructions: "What's the best response to the question?",
  instructionsEs: '¿Cuál es la mejor respuesta a la pregunta?',
  subtitle: "Click 'Start' to record the correct answer.",
  subtitleEs: "Haz clic en 'Start' para grabar la respuesta correcta.",
  promptStatement: '"Isn\'t that Robert Richman?"',
  promptStatementEs: '"¿No es ese Robert Richman?"',
  promptIsQuestion: true,
  imageUrl: movieStarImg,
  durationSeconds: 19,
  audioPrompt: MOVIE_STAR_AUDIO_TEXT,
  sentences: MOVIE_STAR_SENTENCES,
  options: [
    {
      id: 'ms-act7-opt-1',
      text: 'Well, I like him.',
      textEs: 'Bueno, a mí me gusta.',
      isCorrect: false,
    },
    {
      id: 'ms-act7-opt-2',
      text: "Yes, you're right.",
      textEs: 'Sí, tienes razón.',
      isCorrect: true,
    },
    {
      id: 'ms-act7-opt-3',
      text: 'The greatest?',
      textEs: '¿El mejor?',
      isCorrect: false,
    },
  ],
  correctAnswerId: 'ms-act7-opt-2',
  explanation:
    'When asked "Isn\'t that Robert Richman, the movie star?", the direct confirmation in the dialogue is "Yes, you\'re right."',
  explanationEs:
    'Ante la pregunta "¿No es ese Robert Richman, la estrella de cine?", la confirmación natural en el diálogo es: "Yes, you\'re right." (Sí, tienes razón).',
};

// -----------------------------------------------------------------------------
// INTERACCIONES: Roleplay Practice - 3 Parts
// -----------------------------------------------------------------------------
export const MOVIE_STAR_CHARACTERS: RoleplayCharacter[] = [
  {
    id: 'character-1',
    name: 'Mark',
    nameEs: 'Mark (Hombre con traje)',
    role: 'Speaker expressing critical opinion',
    roleEs: 'Interlocutor que opina críticamente del actor',
    avatarSide: 'left',
    voicePitch: 0.95,
    voiceGender: 'male',
  },
  {
    id: 'character-2',
    name: 'Carol',
    nameEs: 'Carol (Mujer con vestido dorado)',
    role: 'Speaker who admires Robert Richman',
    roleEs: 'Interlocutora que defiende y admira a Robert Richman',
    avatarSide: 'right',
    voicePitch: 1.05,
    voiceGender: 'female',
  },
];

export interface MovieStarInteractionPart {
  partNumber: number; // 1, 2, 3
  title: string;
  titleEs: string;
  instructions: string;
  instructionsEs: string;
  dialogueTurns: {
    characterId: string;
    textEn: string;
    textEs: string;
  }[];
}

export const MOVIE_STAR_INTERACTION_PARTS: MovieStarInteractionPart[] = [
  // Interacción 1 de 3
  {
    partNumber: 1,
    title: 'Interacción 1 de 3',
    titleEs: 'Interacción 1 de 3',
    instructions: "Click 'Start' to begin the conversation.",
    instructionsEs: "Haz clic en 'Start' para iniciar la conversación.",
    dialogueTurns: [
      {
        characterId: 'character-1',
        textEn: "Isn't that Robert Richman, the movie star?",
        textEs: '¿No es ese Robert Richman, la estrella de cine?',
      },
      {
        characterId: 'character-2',
        textEn: "Yes, you're right. I think he's the greatest.",
        textEs: 'Sí, tienes razón. Creo que es el mejor.',
      },
    ],
  },
  // Interacción 2 de 3
  {
    partNumber: 2,
    title: 'Interacción 2 de 3',
    titleEs: 'Interacción 2 de 3',
    instructions: 'Speak now.',
    instructionsEs: 'Habla ahora.',
    dialogueTurns: [
      {
        characterId: 'character-1',
        textEn: "The greatest? He's the worst actor I know.",
        textEs: '¿El mejor? Es el peor actor que conozco.',
      },
      {
        characterId: 'character-2',
        textEn: 'What? But he won an Oscar for best actor last year.',
        textEs: '¿Qué? Pero ganó un Oscar a mejor actor el año pasado.',
      },
    ],
  },
  // Interacción 3 de 3
  {
    partNumber: 3,
    title: 'Interacción 3 de 3',
    titleEs: 'Interacción 3 de 3',
    instructions: 'Prepare to speak...',
    instructionsEs: 'Prepárate para hablar...',
    dialogueTurns: [
      {
        characterId: 'character-1',
        textEn: "Yeah? Well, to me he's terrible.",
        textEs: '¿Sí? Bueno, para mí es pésimo.',
      },
      {
        characterId: 'character-2',
        textEn: 'Well, I like him.',
        textEs: 'Bueno, a mí me gusta.',
      },
    ],
  },
];
