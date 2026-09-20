import {
  LessonSentence,
  RadioChoiceExercise,
  SpeechResponseExercise,
  RoleplayPracticeExercise,
  RoleplayCharacter,
} from '../types';
import goodToSeeYouImg from '../assets/images/good_to_see_you_paul_pam_1789933245139.jpg';

export { goodToSeeYouImg };

export interface GoodToSeeYouSentence extends LessonSentence {
  speaker: 'Paul' | 'Pam';
  startTime: number;
  endTime: number;
}

export const GOOD_TO_SEE_YOU_SENTENCES: GoodToSeeYouSentence[] = [
  {
    en: "- Pam! It's good to see you.",
    es: '- ¡Pam! Es un gusto verte.',
    speaker: 'Paul',
    startTime: 0,
    endTime: 3,
  },
  {
    en: '- Great to see you too, Paul.',
    es: '- ¡Qué bueno verte también, Paul.',
    speaker: 'Pam',
    startTime: 3,
    endTime: 6,
  },
  {
    en: '- Look, do you have time for lunch?',
    es: '- Mira, ¿tienes tiempo para almorzar?',
    speaker: 'Paul',
    startTime: 6,
    endTime: 9,
  },
  {
    en: "- Aww... sorry. I can't. I'm in a hurry right now.",
    es: '- Aww... lo siento. No puedo. Tengo prisa ahora mismo.',
    speaker: 'Pam',
    startTime: 9,
    endTime: 12,
  },
  {
    en: '- Then how about a quick cup of coffee? Just 15 minutes, OK?',
    es: '- Entonces, ¿qué tal un café rápido? Solo 15 minutos, ¿vale?',
    speaker: 'Paul',
    startTime: 12,
    endTime: 15,
  },
  {
    en: "- 15 minutes? OK, sure. I'd love to.",
    es: '- ¿15 minutos? De acuerdo, claro. Me encantaría.',
    speaker: 'Pam',
    startTime: 15,
    endTime: 18,
  },
];

export const GOOD_TO_SEE_YOU_AUDIO_TEXT =
  "Pam! It's good to see you. Great to see you too, Paul. Look, do you have time for lunch? Aww... sorry. I can't. I'm in a hurry right now. Then how about a quick cup of coffee? Just 15 minutes, OK? 15 minutes? OK, sure. I'd love to.";

export const GOOD_TO_SEE_YOU_TEXT_ES =
  '- ¡Pam! Es un gusto verte.\n- ¡Qué bueno verte también, Paul.\n- Mira, ¿tienes tiempo para almorzar?\n- Aww... lo siento. No puedo. Tengo prisa ahora mismo.\n- Entonces, ¿qué tal un café rápido? Solo 15 minutos, ¿vale?\n- ¿15 minutos? De acuerdo, claro. Me encantaría.';

// Actividad 2: Radio Choice - What are the speakers mainly discussing?
export const GOOD_TO_SEE_YOU_ACT2: RadioChoiceExercise = {
  id: 'gtsy-act2-mainly-discussing',
  type: 'radio-choice',
  instructions: 'Choose the correct answer.',
  instructionsEs: 'Elige la respuesta correcta.',
  question: 'What are the speakers mainly discussing?',
  questionEs: '¿De qué están hablando principalmente los interlocutores?',
  imageUrl: goodToSeeYouImg,
  durationSeconds: 18,
  audioPrompt: GOOD_TO_SEE_YOU_AUDIO_TEXT,
  sentences: GOOD_TO_SEE_YOU_SENTENCES,
  options: [
    {
      id: 'gtsy-act2-opt-1',
      text: 'What to eat for lunch',
      textEs: 'Qué comer para el almuerzo',
      isCorrect: false,
    },
    {
      id: 'gtsy-act2-opt-2',
      text: 'How to make coffee',
      textEs: 'Cómo hacer café',
      isCorrect: false,
    },
    {
      id: 'gtsy-act2-opt-3',
      text: 'Where to go shopping',
      textEs: 'Dónde ir de compras',
      isCorrect: false,
    },
    {
      id: 'gtsy-act2-opt-4',
      text: 'When to meet',
      textEs: 'Cuándo reunirse',
      isCorrect: true,
    },
  ],
  correctAnswerId: 'gtsy-act2-opt-4',
  explanation:
    'The speakers run into each other and discuss coordinating their schedules—first asking about lunch, and finally agreeing on a 15-minute coffee right now.',
  explanationEs:
    'Los interlocutores se encuentran y coordinan cuándo reunirse: Paul propone almorzar, y al ver que Pam tiene prisa, acuerdan tomar un café rápido de 15 minutos.',
};

// Actividad 3: Radio Choice - Why can't the woman have lunch with the man?
export const GOOD_TO_SEE_YOU_ACT3: RadioChoiceExercise = {
  id: 'gtsy-act3-why-cant-lunch',
  type: 'radio-choice',
  instructions: 'Choose the correct answer.',
  instructionsEs: 'Elige la respuesta correcta.',
  question: "Why can't the woman have lunch with the man?",
  questionEs: '¿Por qué la mujer no puede almorzar con el hombre?',
  imageUrl: goodToSeeYouImg,
  durationSeconds: 18,
  audioPrompt: GOOD_TO_SEE_YOU_AUDIO_TEXT,
  sentences: GOOD_TO_SEE_YOU_SENTENCES,
  options: [
    {
      id: 'gtsy-act3-opt-1',
      text: "She doesn't have any money.",
      textEs: 'Ella no tiene dinero.',
      isCorrect: false,
    },
    {
      id: 'gtsy-act3-opt-2',
      text: "She isn't hungry.",
      textEs: 'Ella no tiene hambre.',
      isCorrect: false,
    },
    {
      id: 'gtsy-act3-opt-3',
      text: 'She is in a hurry.',
      textEs: 'Ella tiene prisa.',
      isCorrect: true,
    },
    {
      id: 'gtsy-act3-opt-4',
      text: "She doesn't like the man.",
      textEs: 'A ella no le agrada el hombre.',
      isCorrect: false,
    },
  ],
  correctAnswerId: 'gtsy-act3-opt-3',
  explanation:
    "Pam clearly explains her reason: 'Aww... sorry. I can't. I'm in a hurry right now.' Therefore, she is in a hurry.",
  explanationEs:
    'Pam explica claramente su motivo: "Aww... sorry. I can\'t. I\'m in a hurry right now." (Aww... lo siento. No puedo. Tengo prisa ahora mismo).',
};

// Actividad 4: Radio Choice - What do the speakers decide to do?
export const GOOD_TO_SEE_YOU_ACT4: RadioChoiceExercise = {
  id: 'gtsy-act4-what-decide',
  type: 'radio-choice',
  instructions: 'Choose the correct answer.',
  instructionsEs: 'Elige la respuesta correcta.',
  question: 'What do the speakers decide to do?',
  questionEs: '¿Qué deciden hacer los interlocutores?',
  imageUrl: goodToSeeYouImg,
  durationSeconds: 18,
  audioPrompt: GOOD_TO_SEE_YOU_AUDIO_TEXT,
  sentences: GOOD_TO_SEE_YOU_SENTENCES,
  options: [
    {
      id: 'gtsy-act4-opt-1',
      text: 'See a movie',
      textEs: 'Ver una película',
      isCorrect: false,
    },
    {
      id: 'gtsy-act4-opt-2',
      text: 'Have coffee',
      textEs: 'Tomar un café',
      isCorrect: true,
    },
    {
      id: 'gtsy-act4-opt-3',
      text: 'Go home',
      textEs: 'Ir a casa',
      isCorrect: false,
    },
    {
      id: 'gtsy-act4-opt-4',
      text: 'Meet for lunch',
      textEs: 'Reunirse para almorzar',
      isCorrect: false,
    },
  ],
  correctAnswerId: 'gtsy-act4-opt-2',
  explanation:
    "Paul asks: 'Then how about a quick cup of coffee? Just 15 minutes, OK?' and Pam responds: '15 minutes? OK, sure. I'd love to.' They decide to have coffee.",
  explanationEs:
    'Paul pregunta: "Then how about a quick cup of coffee? Just 15 minutes, OK?" y Pam responde: "15 minutes? OK, sure. I\'d love to." Por lo tanto, deciden tomar un café.',
};

// Actividad 5: Speech Response - What's the best response to the statement?
export const GOOD_TO_SEE_YOU_ACT5: SpeechResponseExercise = {
  id: 'gtsy-act5-best-response-statement',
  type: 'speech-response',
  instructions: "What's the best response to the statement?",
  instructionsEs: '¿Cuál es la mejor respuesta a la afirmación?',
  subtitle: "Click 'Start' to record the correct answer.",
  subtitleEs: "Haz clic en 'Start' para grabar la respuesta correcta.",
  promptStatement: "It's good to see you.",
  promptStatementEs: 'Es un gusto verte.',
  promptIsQuestion: false,
  imageUrl: goodToSeeYouImg,
  durationSeconds: 18,
  audioPrompt: GOOD_TO_SEE_YOU_AUDIO_TEXT,
  sentences: GOOD_TO_SEE_YOU_SENTENCES,
  options: [
    {
      id: 'gtsy-act5-opt-1',
      text: 'Great to see you, too.',
      textEs: '¡Qué bueno verte también!',
      isCorrect: true,
    },
    {
      id: 'gtsy-act5-opt-2',
      text: "Sorry. I can't.",
      textEs: 'Lo siento. No puedo.',
      isCorrect: false,
    },
    {
      id: 'gtsy-act5-opt-3',
      text: "Sure. I'd love to.",
      textEs: 'Claro. Me encantaría.',
      isCorrect: false,
    },
  ],
  correctAnswerId: 'gtsy-act5-opt-1',
  explanation:
    "When someone greets you warmly with 'It's good to see you.', the appropriate matching conversational response is 'Great to see you, too.'",
  explanationEs:
    'Cuando alguien te saluda con "It\'s good to see you." (Es un gusto verte), la respuesta recíproca y educada es "Great to see you, too." (¡Qué bueno verte también!).',
};

// Actividad 6: Speech Response - What's the best response to the question?
export const GOOD_TO_SEE_YOU_ACT6: SpeechResponseExercise = {
  id: 'gtsy-act6-best-response-question',
  type: 'speech-response',
  instructions: "What's the best response to the question?",
  instructionsEs: '¿Cuál es la mejor respuesta a la pregunta?',
  subtitle: "Click 'Start' to record the correct answer.",
  subtitleEs: "Haz clic en 'Start' para grabar la respuesta correcta.",
  promptStatement: 'How about a cup of coffee?',
  promptStatementEs: '¿Qué tal una taza de café?',
  promptIsQuestion: true,
  imageUrl: goodToSeeYouImg,
  durationSeconds: 18,
  audioPrompt: GOOD_TO_SEE_YOU_AUDIO_TEXT,
  sentences: GOOD_TO_SEE_YOU_SENTENCES,
  options: [
    {
      id: 'gtsy-act6-opt-1',
      text: 'Great to see you, too.',
      textEs: '¡Qué bueno verte también!',
      isCorrect: false,
    },
    {
      id: 'gtsy-act6-opt-2',
      text: "Sure. I'd love to.",
      textEs: 'Claro. Me encantaría.',
      isCorrect: true,
    },
    {
      id: 'gtsy-act6-opt-3',
      text: "I don't have time for lunch.",
      textEs: 'No tengo tiempo para el almuerzo.',
      isCorrect: false,
    },
  ],
  correctAnswerId: 'gtsy-act6-opt-2',
  explanation:
    "When asked 'How about a cup of coffee?' as an invitation, the affirmative agreement used in the conversation is 'Sure. I'd love to.'",
  explanationEs:
    'Ante la propuesta "¿Qué tal una taza de café?" ("How about a cup of coffee?"), la forma natural y cordial de aceptar es: "Sure. I\'d love to." (Claro. Me encantaría).',
};

// Actividad 7: Roleplay Interaction - 3 Parts
export const GOOD_TO_SEE_YOU_CHARACTERS: RoleplayCharacter[] = [
  {
    id: 'character-1',
    name: 'Paul',
    nameEs: 'Paul (Camiseta amarilla)',
    role: 'Friend greeting Pam',
    roleEs: 'Amigo que saluda e invita a un café',
    avatarSide: 'left',
    voicePitch: 0.95,
    voiceGender: 'male',
  },
  {
    id: 'character-2',
    name: 'Pam',
    nameEs: 'Pam (Blusa azul y bufanda celeste)',
    role: 'Friend in a hurry who accepts coffee',
    roleEs: 'Amiga que tiene prisa pero acepta el café',
    avatarSide: 'right',
    voicePitch: 1.05,
    voiceGender: 'female',
  },
];

export interface InteractionPart {
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

export const INTERACTION_PARTS: InteractionPart[] = [
  // Interacción 1 de 3
  {
    partNumber: 1,
    title: 'Interacción 1 de 3',
    titleEs: 'Interacción 1 de 3',
    instructions: 'Click on the arrow next to the character you would like to practice.',
    instructionsEs: 'Haz clic en la flecha junto al personaje que deseas practicar.',
    dialogueTurns: [
      {
        characterId: 'character-1',
        textEn: "Pam! It's good to see you.",
        textEs: '¡Pam! Es un gusto verte.',
      },
      {
        characterId: 'character-2',
        textEn: 'Great to see you too, Paul.',
        textEs: '¡Qué bueno verte también, Paul.',
      },
    ],
  },
  // Interacción 2 de 3
  {
    partNumber: 2,
    title: 'Interacción 2 de 3',
    titleEs: 'Interacción 2 de 3',
    instructions: 'Prepare to speak...',
    instructionsEs: 'Prepárate para hablar...',
    dialogueTurns: [
      {
        characterId: 'character-1',
        textEn: 'Look, do you have time for lunch?',
        textEs: 'Mira, ¿tienes tiempo para almorzar?',
      },
      {
        characterId: 'character-2',
        textEn: "Aww... sorry. I can't. I'm in a hurry right now.",
        textEs: 'Aww... lo siento. No puedo. Tengo prisa ahora mismo.',
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
        textEn: 'Then how about a quick cup of coffee? Just 15 minutes, OK?',
        textEs: 'Entonces, ¿qué tal un café rápido? Solo 15 minutos, ¿vale?',
      },
      {
        characterId: 'character-2',
        textEn: "15 minutes? OK, sure. I'd love to.",
        textEs: '¿15 minutos? De acuerdo, claro. Me encantaría.',
      },
    ],
  },
];
