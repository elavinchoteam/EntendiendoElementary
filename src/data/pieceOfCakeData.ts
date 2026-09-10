import {
  LessonSentence,
  RadioChoiceExercise,
  SpeechResponseExercise,
  DialogueOrderingExercise,
  MatchingExercise,
  RoleplayPracticeExercise,
  InteractiveConversationExercise,
  DialogueExploreExercise,
  Exercise,
} from '../types';
import pieceOfCakeImg from '../assets/images/piece_of_cake_kitchen_1788991075933.jpg';

export { pieceOfCakeImg };

export const PIECE_OF_CAKE_SENTENCES: LessonSentence[] = [
  {
    en: '- Would you like some cake?',
    es: '- ¿Te gustaría un poco de pastel?',
    speaker: 'Man',
  },
  {
    en: '- Ah, not right now, thanks.',
    es: '- Ah, ahora mismo no, gracias.',
    speaker: 'Woman',
  },
  {
    en: "- But it's really very good. Are you sure?",
    es: '- Pero está realmente muy bueno. ¿Estás segura?',
    speaker: 'Man',
  },
  {
    en: '- Well, maybe just a small piece.',
    es: '- Bueno, tal vez sólo un trozo pequeño.',
    speaker: 'Woman',
  },
  {
    en: '- Good. Here you are.',
    es: '- Bien. Aquí tienes.',
    speaker: 'Man',
  },
  {
    en: '- Mmm. This is delicious.',
    es: '- Mmm. Esto está delicioso.',
    speaker: 'Woman',
  },
];

export const PIECE_OF_CAKE_AUDIO_TEXT =
  "Would you like some cake? Ah, not right now, thanks. But it's really very good. Are you sure? Well, maybe just a small piece. Good. Here you are. Mmm. This is delicious.";

// Actividad 1: Video / Audio Player & Dialogue Explore
export const PIECE_OF_CAKE_ACT1: DialogueExploreExercise = {
  id: 'poc-act1-explore',
  title: 'Actividad 1',
  titleEs: 'Actividad 1',
  type: 'dialogue-explore',
  instructions: 'Watch and listen to the dialogue "Would you like some cake?".',
  instructionsEs: 'Mira y escucha el diálogo "¿Te gustaría un poco de pastel?".',
  audioText: PIECE_OF_CAKE_AUDIO_TEXT,
  sentences: PIECE_OF_CAKE_SENTENCES,
  imageUrl: pieceOfCakeImg,
  durationSeconds: 18,
  speakerGender: 'male',
};

// Actividad 2: Radio Choice - What does the man want the woman to do? (formerly Actividad 4)
export const PIECE_OF_CAKE_ACT2: RadioChoiceExercise = {
  id: 'poc-act2-man-intent',
  title: 'Actividad 2',
  titleEs: 'Actividad 2',
  type: 'radio-choice',
  instructions: 'Choose the correct answer.',
  instructionsEs: 'Elige la respuesta correcta.',
  question: 'What does the man want the woman to do?',
  questionEs: '¿Qué quiere el hombre que haga la mujer?',
  imageUrl: pieceOfCakeImg,
  durationSeconds: 18,
  audioPrompt: PIECE_OF_CAKE_AUDIO_TEXT,
  sentences: PIECE_OF_CAKE_SENTENCES,
  options: [
    { id: 'poc2-opt-1', text: 'Cut a piece of cheese', textEs: 'Cortar un trozo de queso', isCorrect: false },
    { id: 'poc2-opt-2', text: 'Help him bake', textEs: 'Ayudarlo a hornear', isCorrect: false },
    { id: 'poc2-opt-3', text: 'Set the table', textEs: 'Poner la mesa', isCorrect: false },
    { id: 'poc2-opt-4', text: 'Try some cake', textEs: 'Probar un poco de pastel', isCorrect: true },
  ],
  correctAnswerId: 'poc2-opt-4',
  explanation:
    'The man insists that she try the cake: "Would you like some cake? ... But it\'s really very good. Are you sure?"',
  explanationEs:
    'El hombre insiste en que pruebe el pastel: "¿Te gustaría un poco de pastel? ... Pero está realmente muy bueno. ¿Estás segura?".',
};

// Actividad 3: Radio Choice - At first, the woman doesn't want any cake. (formerly Actividad 2)
export const PIECE_OF_CAKE_ACT3: RadioChoiceExercise = {
  id: 'poc-act3-true-false',
  title: 'Actividad 3',
  titleEs: 'Actividad 3',
  type: 'radio-choice',
  instructions: 'Choose the correct answer.',
  instructionsEs: 'Elige la respuesta correcta.',
  question: "At first, the woman doesn't want any cake.",
  questionEs: 'Al principio, la mujer no quiere nada de pastel.',
  imageUrl: pieceOfCakeImg,
  durationSeconds: 18,
  audioPrompt: PIECE_OF_CAKE_AUDIO_TEXT,
  sentences: PIECE_OF_CAKE_SENTENCES,
  options: [
    { id: 'poc3-opt-1', text: 'True', textEs: 'Verdadero', isCorrect: true },
    { id: 'poc3-opt-2', text: 'False', textEs: 'Falso', isCorrect: false },
    { id: 'poc3-opt-3', text: "We don't know.", textEs: 'No lo sabemos.', isCorrect: false },
  ],
  correctAnswerId: 'poc3-opt-1',
  explanation:
    'When the man offers cake, the woman first replies "Ah, not right now, thanks.", confirming that at first she didn\'t want any cake.',
  explanationEs:
    'Cuando el hombre le ofrece pastel, la mujer responde primero "Ah, not right now, thanks." (Ah, ahora no, gracias), confirmando que al principio no quería pastel.',
};

// Actividad 4: Radio Choice - What does the woman think about the cake? (formerly Actividad 3)
export const PIECE_OF_CAKE_ACT4: RadioChoiceExercise = {
  id: 'poc-act4-opinion',
  title: 'Actividad 4',
  titleEs: 'Actividad 4',
  type: 'radio-choice',
  instructions: 'Choose the correct answer.',
  instructionsEs: 'Elige la respuesta correcta.',
  question: 'What does the woman think about the cake?',
  questionEs: '¿Qué opina la mujer sobre el pastel?',
  imageUrl: pieceOfCakeImg,
  durationSeconds: 18,
  audioPrompt: PIECE_OF_CAKE_AUDIO_TEXT,
  sentences: PIECE_OF_CAKE_SENTENCES,
  options: [
    { id: 'poc4-opt-1', text: "It's too small.", textEs: 'Es demasiado pequeño.', isCorrect: false },
    { id: 'poc4-opt-2', text: "It's her favorite.", textEs: 'Es su favorito.', isCorrect: false },
    { id: 'poc4-opt-3', text: "It's delicious.", textEs: 'Está delicioso.', isCorrect: true },
    { id: 'poc4-opt-4', text: "It's very sweet.", textEs: 'Es muy dulce.', isCorrect: false },
  ],
  correctAnswerId: 'poc4-opt-3',
  explanation:
    'After tasting the cake, the woman happily states: "Mmm. This is delicious."',
  explanationEs:
    'Después de probar el pastel, la mujer dice con satisfacción: "Mmm. This is delicious." (Mmm. Esto está delicioso).',
};

// Actividad 5: Radio Choice - In this dialogue, "Mmm" means...
export const PIECE_OF_CAKE_ACT5: RadioChoiceExercise = {
  id: 'poc-act5-meaning-mmm',
  title: 'Actividad 5',
  titleEs: 'Actividad 5',
  type: 'radio-choice',
  instructions: 'Choose the correct answer.',
  instructionsEs: 'Elige la respuesta correcta.',
  question: 'In this dialogue, "Mmm" means...',
  questionEs: 'En este diálogo, "Mmm" significa...',
  imageUrl: pieceOfCakeImg,
  durationSeconds: 18,
  audioPrompt: PIECE_OF_CAKE_AUDIO_TEXT,
  sentences: PIECE_OF_CAKE_SENTENCES,
  options: [
    { id: 'poc5-opt-1', text: 'No, not now.', textEs: 'No, ahora no.', isCorrect: false },
    { id: 'poc5-opt-2', text: 'Thank you.', textEs: 'Gracias.', isCorrect: false },
    { id: 'poc5-opt-3', text: 'Here you are.', textEs: 'Aquí tienes.', isCorrect: false },
    { id: 'poc5-opt-4', text: 'It tastes good.', textEs: 'Sabe bien.', isCorrect: true },
  ],
  correctAnswerId: 'poc5-opt-4',
  explanation:
    'The expression "Mmm" is made when food tastes very good ("It tastes good"), followed by "This is delicious."',
  explanationEs:
    'La expresión "Mmm" se utiliza cuando la comida sabe muy bien ("It tastes good"), justo antes de "This is delicious".',
};

// Actividad 6: Speech Response - What's the best response to the question?
export const PIECE_OF_CAKE_ACT6: SpeechResponseExercise = {
  id: 'poc-act6-best-response-question',
  title: 'Actividad 6',
  titleEs: 'Actividad 6',
  type: 'speech-response',
  instructions: "What's the best response to the question?",
  instructionsEs: '¿Cuál es la mejor respuesta a la pregunta?',
  subtitle: "Click 'Start' to record the correct answer.",
  subtitleEs: "Haz clic en 'Start' para grabar la respuesta correcta.",
  promptStatement: 'Would you like some cake?',
  promptStatementEs: '¿Te gustaría un poco de pastel?',
  promptIsQuestion: true,
  imageUrl: pieceOfCakeImg,
  durationSeconds: 18,
  speakerGender: 'female',
  audioPrompt: PIECE_OF_CAKE_AUDIO_TEXT,
  sentences: PIECE_OF_CAKE_SENTENCES,
  options: [
    {
      id: 'poc6-opt-1',
      text: "But it's really very good.",
      textEs: 'Pero está realmente muy bueno.',
      isCorrect: false,
    },
    {
      id: 'poc6-opt-2',
      text: 'Here you are.',
      textEs: 'Aquí tienes.',
      isCorrect: false,
    },
    {
      id: 'poc6-opt-3',
      text: 'Not right now, thanks.',
      textEs: 'Ahora mismo no, gracias.',
      isCorrect: true,
    },
  ],
  correctAnswerId: 'poc6-opt-3',
  explanation:
    'When offered "Would you like some cake?", the appropriate conversational reply is "Not right now, thanks."',
  explanationEs:
    'Cuando alguien pregunta "¿Te gustaría un poco de pastel?", la respuesta apropiada del diálogo es "Not right now, thanks." (Ahora mismo no, gracias).',
};

// Actividad 7: Speech Response - What's the best response to the statement?
export const PIECE_OF_CAKE_ACT7: SpeechResponseExercise = {
  id: 'poc-act7-best-response-statement',
  title: 'Actividad 7',
  titleEs: 'Actividad 7',
  type: 'speech-response',
  instructions: "What's the best response to the statement?",
  instructionsEs: '¿Cuál es la mejor respuesta a la afirmación?',
  subtitle: "Click 'Start' to record the correct answer.",
  subtitleEs: "Haz clic en 'Start' para grabar la respuesta correcta.",
  promptStatement: 'Well, maybe just a small piece.',
  promptStatementEs: 'Bueno, tal vez sólo un trozo pequeño.',
  promptIsQuestion: false,
  imageUrl: pieceOfCakeImg,
  durationSeconds: 18,
  speakerGender: 'male',
  audioPrompt: PIECE_OF_CAKE_AUDIO_TEXT,
  sentences: PIECE_OF_CAKE_SENTENCES,
  options: [
    {
      id: 'poc7-opt-1',
      text: 'Would you like some cake?',
      textEs: '¿Te gustaría un poco de pastel?',
      isCorrect: false,
    },
    {
      id: 'poc7-opt-2',
      text: 'Good. Here you are.',
      textEs: 'Bien. Aquí tienes.',
      isCorrect: true,
    },
    {
      id: 'poc7-opt-3',
      text: "But it's really very good.",
      textEs: 'Pero está realmente muy bueno.',
      isCorrect: false,
    },
  ],
  correctAnswerId: 'poc7-opt-2',
  explanation:
    'When the guest accepts saying "Well, maybe just a small piece.", the host serves the cake saying "Good. Here you are."',
  explanationEs:
    'Cuando la invitada acepta diciendo "Bueno, tal vez sólo un trozo pequeño", el anfitrión le entrega el plato diciendo "Good. Here you are." (Bien. Aquí tienes).',
};

// Actividad 8: Dialogue Ordering - Put the sentences in the correct order to make a new dialogue.
export const PIECE_OF_CAKE_ACT8: DialogueOrderingExercise = {
  id: 'poc-act8-ordering',
  title: 'Actividad 8',
  titleEs: 'Actividad 8',
  type: 'dialogue-ordering',
  instructions: 'Put the sentences in the correct order to make a new dialogue.',
  instructionsEs: 'Pon las oraciones en el orden correcto para formar un nuevo diálogo.',
  imageUrl: pieceOfCakeImg,
  durationSeconds: 18,
  speakerGender: 'male',
  audioPrompt: PIECE_OF_CAKE_AUDIO_TEXT,
  sentences: PIECE_OF_CAKE_SENTENCES,
  items: [
    {
      id: 'poc8-item-1',
      order: 1,
      textEn: 'Would you like some cake?',
      textEs: '¿Te gustaría un poco de pastel?',
      speaker: 'Man',
    },
    {
      id: 'poc8-item-2',
      order: 2,
      textEn: "No, thank you. I'm on a diet.",
      textEs: 'No, gracias. Estoy a dieta.',
      speaker: 'Woman',
    },
    {
      id: 'poc8-item-3',
      order: 3,
      textEn: 'But even people on a diet have to eat.',
      textEs: 'Pero incluso las personas a dieta tienen que comer.',
      speaker: 'Man',
    },
    {
      id: 'poc8-item-4',
      order: 4,
      textEn: "No, thank you, I don't want any cake.",
      textEs: 'No, gracias, no quiero nada de pastel.',
      speaker: 'Woman',
    },
    {
      id: 'poc8-item-5',
      order: 5,
      textEn: "OK. You don't have to get angry.",
      textEs: 'De acuerdo. No tienes que enfadarte.',
      speaker: 'Man',
    },
    {
      id: 'poc8-item-6',
      order: 6,
      textEn: "I'm not angry. I'm just on a diet.",
      textEs: 'No estoy enfadada. Solo estoy a dieta.',
      speaker: 'Woman',
    },
  ],
  initialOrder: [
    "I'm not angry. I'm just on a diet.",
    "OK. You don't have to get angry.",
    "No, thank you, I don't want any cake.",
    "No, thank you. I'm on a diet.",
    "But even people on a diet have to eat.",
    "Would you like some cake?",
  ],
  explanation:
    'The conversation begins with the offer of cake ("Would you like some cake?"), followed by the mention of the diet, the gentle insistence, the firm refusal, the reaction to not get angry, and the final clarification.',
  explanationEs:
    'La conversación comienza con la invitación ("Would you like some cake?"), sigue con la mención de la dieta, la insistencia amigable, la negativa firme, la petición de no enojarse y la aclaración final.',
};

// Actividad 9: Matching Table - Match the answers to the questions to make a new dialogue.
export const PIECE_OF_CAKE_ACT9: MatchingExercise = {
  id: 'poc-act9-matching',
  title: 'Actividad 9',
  titleEs: 'Actividad 9',
  type: 'matching-table',
  instructions:
    'Match the answers to the questions to make a new dialogue. There are more answers than you need.',
  instructionsEs:
    'Une las respuestas con las preguntas para formar un nuevo diálogo. Hay más respuestas de las que necesitas.',
  columnAHeader: 'Questions',
  columnAHeaderEs: 'Preguntas',
  columnBHeader: 'Answers',
  columnBHeaderEs: 'Respuestas',
  pairs: [
    {
      id: 'poc9-p1',
      field: 'What can you eat?',
      fieldEs: '¿Qué puedes comer?',
      correctValue: 'Only healthy foods.',
      correctValueEs: 'Solo alimentos saludables.',
    },
    {
      id: 'poc9-p2',
      field: 'Would you like another piece?',
      fieldEs: '¿Te gustaría otro trozo?',
      correctValue: "OK. I'm still a little hungry.",
      correctValueEs: 'De acuerdo. Todavía tengo un poco de hambre.',
    },
    {
      id: 'poc9-p3',
      field: 'Would you like some banana cake?',
      fieldEs: '¿Te gustaría un poco de pastel de plátano?',
      correctValue: "No, thank you. I don't like banana cake.",
      correctValueEs: 'No, gracias. No me gusta el pastel de plátano.',
    },
    {
      id: 'poc9-p4',
      field: 'Would you like to take it and eat it later?',
      fieldEs: '¿Te gustaría llevártelo y comerlo más tarde?',
      correctValue: 'Great. I can eat it tonight.',
      correctValueEs: 'Genial. Puedo comerlo esta noche.',
    },
  ],
  optionsPool: [
    "OK. I'm still a little hungry.",
    "No, thank you. I don't like banana cake.",
    'Only healthy foods.',
    "Great! I'd love some sugarless candy",
    'Great. I can eat it tonight.',
  ],
  optionsPoolEs: {
    "OK. I'm still a little hungry.": 'De acuerdo. Todavía tengo un poco de hambre.',
    "No, thank you. I don't like banana cake.": 'No, gracias. No me gusta el pastel de plátano.',
    'Only healthy foods.': 'Solo alimentos saludables.',
    "Great! I'd love some sugarless candy": '¡Genial! Me encantaría un caramelo sin azúcar',
    'Great. I can eat it tonight.': 'Genial. Puedo comerlo esta noche.',
  },
};

// Interacción 1: Roleplay Practice
export const PIECE_OF_CAKE_INTERACT1: RoleplayPracticeExercise = {
  id: 'poc-interact1-roleplay',
  title: 'Interacción 1',
  titleEs: 'Interacción 1',
  type: 'roleplay-practice',
  instructions: 'Click on the arrow next to the character you would like to practice.',
  instructionsEs: 'Haz clic en la flecha junto al personaje que deseas practicar.',
  imageUrl: pieceOfCakeImg,
  characters: [
    {
      id: 'character-1',
      name: 'Man (Host)',
      nameEs: 'Hombre (Anfitrión)',
      role: 'Offering homemade cake',
      roleEs: 'Ofrece el pastel recién preparado',
      avatarSide: 'left',
      voicePitch: 1.0,
      voiceGender: 'male',
    },
    {
      id: 'character-2',
      name: 'Woman (Guest)',
      nameEs: 'Mujer (Invitada)',
      role: 'Tasting the cake',
      roleEs: 'Prueba el delicioso pastel',
      avatarSide: 'right',
      voicePitch: 1.05,
      voiceGender: 'female',
    },
  ],
  dialogueTurns: [
    {
      characterId: 'character-1',
      textEn: 'Would you like some cake?',
      textEs: '¿Te gustaría un poco de pastel?',
    },
    {
      characterId: 'character-2',
      textEn: 'Ah, not right now, thanks.',
      textEs: 'Ah, ahora mismo no, gracias.',
    },
    {
      characterId: 'character-1',
      textEn: "But it's really very good. Are you sure?",
      textEs: 'Pero está realmente muy bueno. ¿Estás segura?',
    },
    {
      characterId: 'character-2',
      textEn: 'Well, maybe just a small piece.',
      textEs: 'Bueno, tal vez sólo un trozo pequeño.',
    },
    {
      characterId: 'character-1',
      textEn: 'Good. Here you are.',
      textEs: 'Bien. Aquí tienes.',
    },
    {
      characterId: 'character-2',
      textEn: 'Mmm. This is delicious.',
      textEs: 'Mmm. Esto está delicioso.',
    },
  ],
};

// Interacción 2: Interactive Conversation
export const PIECE_OF_CAKE_INTERACT2: InteractiveConversationExercise = {
  id: 'poc-interact2-conversation',
  title: 'Interacción 2',
  titleEs: 'Interacción 2',
  type: 'interactive-conversation',
  instructions: "Click 'Start' to begin the conversation.",
  instructionsEs: "Haz clic en 'Start' para comenzar la conversación.",
  imageUrl: pieceOfCakeImg,
  initialPromptEn: 'Would you like some cake?',
  initialPromptEs: '¿Te gustaría un poco de pastel?',
  options: [
    {
      id: 'conv-opt-1',
      textEn: '-Ah, not right now, thanks.',
      textEs: '-Ah, ahora mismo no, gracias.',
      partnerResponseEn: "But it's really very good. Are you sure?",
      partnerResponseEs: 'Pero está realmente muy bueno. ¿Estás segura?',
      partnerAudioText: "But it's really very good. Are you sure?",
      nextOptions: [
        {
          id: 'conv-sub-1a',
          textEn: '-Well, maybe just a small piece.',
          textEs: '-Bueno, tal vez sólo un trozo pequeño.',
          partnerResponseEn: 'Good. Here you are. Mmm, enjoy it!',
          partnerResponseEs: 'Bien. Aquí tienes. ¡Que lo disfrutes!',
        },
        {
          id: 'conv-sub-1b',
          textEn: "-No, really, thank you. I'm full.",
          textEs: '-No, de verdad, gracias. Estoy llena.',
          partnerResponseEn: 'No problem at all! Maybe next time.',
          partnerResponseEs: '¡Sin problema! Tal vez en otra ocasión.',
        },
      ],
    },
    {
      id: 'conv-opt-2',
      textEn: "-No, thank you. I'm on a diet.",
      textEs: '-No, gracias. Estoy a dieta.',
      partnerResponseEn: 'Are you sure? It is homemade and very light!',
      partnerResponseEs: '¿Estás segura? ¡Es casero y muy ligero!',
      partnerAudioText: 'Are you sure? It is homemade and very light!',
      nextOptions: [
        {
          id: 'conv-sub-2a',
          textEn: '-Well, maybe just a tiny bite then.',
          textEs: '-Bueno, tal vez un pedacito muy pequeño entonces.',
          partnerResponseEn: 'Great! Here is a tiny slice for you.',
          partnerResponseEs: '¡Genial! Aquí tienes un trocito pequeño para ti.',
        },
        {
          id: 'conv-sub-2b',
          textEn: "-No, thank you, I don't want any cake.",
          textEs: '-No, gracias, no quiero nada de pastel.',
          partnerResponseEn: 'OK, I understand. Keep up the good diet!',
          partnerResponseEs: 'De acuerdo, lo entiendo. ¡Sigue con la buena dieta!',
        },
      ],
    },
    {
      id: 'conv-opt-3',
      textEn: "-I'm not hungry now, but thanks anyway.",
      textEs: '-No tengo hambre ahora, pero gracias de todos modos.',
      partnerResponseEn: 'Would you like to take it and eat it later?',
      partnerResponseEs: '¿Te gustaría llevártelo y comerlo más tarde?',
      partnerAudioText: 'Would you like to take it and eat it later?',
      nextOptions: [
        {
          id: 'conv-sub-3a',
          textEn: '-Great. I can eat it tonight.',
          textEs: '-Genial. Puedo comerlo esta noche.',
          partnerResponseEn: "Perfect! I'll put it in a box for you.",
          partnerResponseEs: '¡Perfecto! Te lo pondré en una caja.',
        },
        {
          id: 'conv-sub-3b',
          textEn: '-No, thanks, you can share it with others.',
          textEs: '-No, gracias, puedes compartirlo con los demás.',
          partnerResponseEn: 'All right! Thanks for dropping by.',
          partnerResponseEs: '¡De acuerdo! Gracias por venir.',
        },
      ],
    },
  ],
};

// All 9 activities + 2 interactions in strict sequential order
export const PIECE_OF_CAKE_EXERCISES: Exercise[] = [
  PIECE_OF_CAKE_ACT1,
  PIECE_OF_CAKE_ACT2,
  PIECE_OF_CAKE_ACT3,
  PIECE_OF_CAKE_ACT4,
  PIECE_OF_CAKE_ACT5,
  PIECE_OF_CAKE_ACT6,
  PIECE_OF_CAKE_ACT7,
  PIECE_OF_CAKE_ACT8,
  PIECE_OF_CAKE_ACT9,
  PIECE_OF_CAKE_INTERACT1,
  PIECE_OF_CAKE_INTERACT2,
];
