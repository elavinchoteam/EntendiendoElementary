import swimmingWomenImg from '../assets/images/swimming_dialogue_women_1789598687999.jpg';

export { swimmingWomenImg };

export interface SwimmingDialogueLine {
  id: string;
  speaker: string;
  speakerEs: string;
  speakerSide: 'left' | 'right';
  textEn: string;
  textEs: string;
}

export const SWIMMING_DIALOGUE_LINES: SwimmingDialogueLine[] = [
  {
    id: 'line-1',
    speaker: 'Speaker 1',
    speakerEs: 'Hablante 1',
    speakerSide: 'left',
    textEn: "Let's go to the mall this afternoon.",
    textEs: 'Vamos al centro comercial esta tarde.',
  },
  {
    id: 'line-2',
    speaker: 'Speaker 2',
    speakerEs: 'Hablante 2',
    speakerSide: 'right',
    textEn: "Ah... I don't think so.",
    textEs: 'Ah... No me parece buena idea.',
  },
  {
    id: 'line-3',
    speaker: 'Speaker 1',
    speakerEs: 'Hablante 1',
    speakerSide: 'left',
    textEn: 'Why not?',
    textEs: '¿Por qué no?',
  },
  {
    id: 'line-4',
    speaker: 'Speaker 2',
    speakerEs: 'Hablante 2',
    speakerSide: 'right',
    textEn: "Well, I think John's going there today and I don't want to see him.",
    textEs: 'Bueno, creo que John va a ir hoy y no quiero verlo.',
  },
  {
    id: 'line-5',
    speaker: 'Speaker 1',
    speakerEs: 'Hablante 1',
    speakerSide: 'left',
    textEn: "Oh. Then why don't we go swimming?",
    textEs: 'Oh. Entonces, ¿por qué no vamos a nadar?',
  },
  {
    id: 'line-6',
    speaker: 'Speaker 2',
    speakerEs: 'Hablante 2',
    speakerSide: 'right',
    textEn: "Oh, good idea. It's hot. Let's go.",
    textEs: 'Oh, buena idea. Hace calor. Vamos.',
  },
];

export const SWIMMING_AUDIO_FULL =
  "Let's go to the mall this afternoon. Ah... I don't think so. Why not? Well, I think John's going there today and I don't want to see him. Oh. Then why don't we go swimming? Oh, good idea. It's hot. Let's go.";

export const SWIMMING_AUDIO_FULL_ES =
  '— Vamos al centro comercial esta tarde.\n— Ah... No me parece buena idea.\n— ¿Por qué no?\n— Bueno, creo que John va a ir hoy y no quiero verlo.\n— Oh. Entonces, ¿por qué no vamos a nadar?\n— Oh, buena idea. Hace calor. Vamos.';

// Activity 2: Radio Choice
export const SWIMMING_ACT2_DATA = {
  id: 'swimming-act2-talking-about',
  question: 'What are the speakers talking about?',
  questionEs: '¿De qué están hablando las hablantes?',
  options: [
    {
      id: 'act2-opt1',
      text: 'Plans for the afternoon',
      textEs: 'Planes para la tarde',
      isCorrect: true,
    },
    {
      id: 'act2-opt2',
      text: 'The weather',
      textEs: 'El clima',
      isCorrect: false,
    },
    {
      id: 'act2-opt3',
      text: 'A new boyfriend',
      textEs: 'Un nuevo novio',
      isCorrect: false,
    },
    {
      id: 'act2-opt4',
      text: 'What time to meet',
      textEs: 'A qué hora encontrarse',
      isCorrect: false,
    },
  ],
  correctAnswerId: 'act2-opt1',
  explanation:
    'The speakers discuss where to go and what to do together this afternoon (the mall or swimming).',
  explanationEs:
    'Las hablantes están organizando qué hacer y a dónde ir juntas esta tarde (ir al centro comercial o ir a nadar).',
};

// Activity 3: Radio Choice
export const SWIMMING_ACT3_DATA = {
  id: 'swimming-act3-why-not-mall',
  question: "Why doesn't the second speaker want to go to the mall?",
  questionEs: '¿Por qué la segunda hablante no quiere ir al centro comercial?',
  options: [
    {
      id: 'act3-opt1',
      text: "She's afraid she'll spend too much money.",
      textEs: 'Teme gastar demasiado dinero.',
      isCorrect: false,
    },
    {
      id: 'act3-opt2',
      text: 'She thinks it will be too hot and crowded.',
      textEs: 'Cree que hará demasiado calor y estará abarrotado.',
      isCorrect: false,
    },
    {
      id: 'act3-opt3',
      text: "She doesn't have a car, and it's too far to walk.",
      textEs: 'No tiene coche y está demasiado lejos para ir caminando.',
      isCorrect: false,
    },
    {
      id: 'act3-opt4',
      text: "Someone she doesn't want to see might be there.",
      textEs: 'Alguien a quien no quiere ver podría estar allí.',
      isCorrect: true,
    },
  ],
  correctAnswerId: 'act3-opt4',
  explanation:
    'She explicitly states: "Well, I think John\'s going there today and I don\'t want to see him."',
  explanationEs:
    'Ella afirma expresamente: "Well, I think John\'s going there today and I don\'t want to see him" (Creo que John va a ir hoy y no quiero verlo).',
};

// Activity 4: Radio Choice
export const SWIMMING_ACT4_DATA = {
  id: 'swimming-act4-decide-to-do',
  question: 'What do the women decide to do?',
  questionEs: '¿Qué deciden hacer las mujeres?',
  options: [
    {
      id: 'act4-opt1',
      text: 'Go swimming',
      textEs: 'Ir a nadar',
      isCorrect: true,
    },
    {
      id: 'act4-opt2',
      text: 'Go visit John',
      textEs: 'Ir a visitar a John',
      isCorrect: false,
    },
    {
      id: 'act4-opt3',
      text: 'Go see a play',
      textEs: 'Ir a ver una obra de teatro',
      isCorrect: false,
    },
    {
      id: 'act4-opt4',
      text: 'Go to the mall',
      textEs: 'Ir al centro comercial',
      isCorrect: false,
    },
  ],
  correctAnswerId: 'act4-opt1',
  explanation:
    'After rejecting the mall, Speaker 1 suggests: "Then why don\'t we go swimming?" and Speaker 2 enthusiastically replies: "Oh, good idea. It\'s hot. Let\'s go."',
  explanationEs:
    'Tras descartar el centro comercial, la Hablante 1 sugiere: "¿Por qué no vamos a nadar?" y la Hablante 2 responde entusiasmada: "Buena idea. Hace calor. Vamos".',
};

// Activity 5: Speech Response to Statement
export const SWIMMING_ACT5_DATA = {
  id: 'swimming-act5-best-response-statement',
  instructions: "What's the best response to the statement?",
  instructionsEs: '¿Cuál es la mejor respuesta a la afirmación?',
  subtitle: "Click 'Start' to record the correct answer.",
  subtitleEs: "Haz clic en 'Start' para grabar la respuesta correcta.",
  promptStatement: "Let's go to the mall this afternoon.",
  promptStatementEs: 'Vamos al centro comercial esta tarde.',
  targetLineIdx: 0,
  options: [
    {
      id: 'act5-opt1',
      text: "I don't think so.",
      textEs: 'No me parece buena idea.',
      isCorrect: true,
    },
    {
      id: 'act5-opt2',
      text: 'Why not?',
      textEs: '¿Por qué no?',
      isCorrect: false,
    },
    {
      id: 'act5-opt3',
      text: "Let's go!",
      textEs: '¡Vamos!',
      isCorrect: false,
    },
    {
      id: 'act5-opt4',
      text: "It's hot!",
      textEs: '¡Hace calor!',
      isCorrect: false,
    },
  ],
  correctAnswerId: 'act5-opt1',
  explanation:
    'When Speaker 1 suggests going to the mall, Speaker 2 hesitates and declines saying: "Ah... I don\'t think so."',
  explanationEs:
    'Cuando la Hablante 1 propone ir al centro comercial, la respuesta de la Hablante 2 en el diálogo es dudar y rechazarla con: "Ah... I don\'t think so."',
};

// Activity 6: Speech Response to Question
export const SWIMMING_ACT6_DATA = {
  id: 'swimming-act6-best-response-question',
  instructions: "What's the best response to the question?",
  instructionsEs: '¿Cuál es la mejor respuesta a la pregunta?',
  subtitle: "Click 'Start' to record the correct answer.",
  subtitleEs: "Haz clic en 'Start' para grabar la respuesta correcta.",
  promptStatement: "Oh. Then why don't we go swimming?",
  promptStatementEs: 'Oh. Entonces, ¿por qué no vamos a nadar?',
  targetLineIdx: 4,
  options: [
    {
      id: 'act6-opt1',
      text: "Why don't we go swimming?",
      textEs: '¿Por qué no vamos a nadar?',
      isCorrect: false,
    },
    {
      id: 'act6-opt2',
      text: 'Oh, good idea.',
      textEs: 'Oh, buena idea.',
      isCorrect: true,
    },
    {
      id: 'act6-opt3',
      text: "Let's talk.",
      textEs: 'Hablemos.',
      isCorrect: false,
    },
    {
      id: 'act6-opt4',
      text: "I don't want to see him.",
      textEs: 'No quiero verlo.',
      isCorrect: false,
    },
  ],
  correctAnswerId: 'act6-opt2',
  explanation:
    'When Speaker 1 asks "Then why don\'t we go swimming?", the conversational reply in the dialogue is: "Oh, good idea. It\'s hot. Let\'s go."',
  explanationEs:
    'Ante la propuesta y pregunta de ir a nadar, la respuesta que continúa el diálogo es: "Oh, good idea." (Buena idea).',
};

// Activity 7: 3-Part Interaction Data
export interface SwimmingInteractionPart {
  partNumber: number; // 1, 2, 3
  instruction: string;
  instructionEs: string;
  turnSpeaker1: {
    speaker: string;
    speakerEs: string;
    textEn: string;
    textEs: string;
  };
  turnSpeaker2: {
    speaker: string;
    speakerEs: string;
    textEn: string;
    textEs: string;
  };
}

export const SWIMMING_INTERACTIONS: SwimmingInteractionPart[] = [
  {
    partNumber: 1,
    instruction: "Click 'Start' to begin the conversation.",
    instructionEs: "Haz clic en 'Start' para comenzar la conversación.",
    turnSpeaker1: {
      speaker: 'Speaker 1',
      speakerEs: 'Hablante 1',
      textEn: "Let's go to the mall this afternoon.",
      textEs: 'Vamos al centro comercial esta tarde.',
    },
    turnSpeaker2: {
      speaker: 'Speaker 2',
      speakerEs: 'Hablante 2',
      textEn: "Ah... I don't think so.",
      textEs: 'Ah... No me parece buena idea.',
    },
  },
  {
    partNumber: 2,
    instruction: 'Speak now.',
    instructionEs: 'Habla ahora.',
    turnSpeaker1: {
      speaker: 'Speaker 1',
      speakerEs: 'Hablante 1',
      textEn: 'Why not?',
      textEs: '¿Por qué no?',
    },
    turnSpeaker2: {
      speaker: 'Speaker 2',
      speakerEs: 'Hablante 2',
      textEn:
        "Well, I think John's going there today and I don't want to see him.",
      textEs: 'Bueno, creo que John va a ir hoy y no quiero verlo.',
    },
  },
  {
    partNumber: 3,
    instruction: 'Speak now.',
    instructionEs: 'Habla ahora.',
    turnSpeaker1: {
      speaker: 'Speaker 1',
      speakerEs: 'Hablante 1',
      textEn: "Oh. Then why don't we go swimming?",
      textEs: 'Oh. Entonces, ¿por qué no vamos a nadar?',
    },
    turnSpeaker2: {
      speaker: 'Speaker 2',
      speakerEs: 'Hablante 2',
      textEn: "Oh, good idea. It's hot. Let's go.",
      textEs: 'Oh, buena idea. Hace calor. Vamos.',
    },
  },
];
