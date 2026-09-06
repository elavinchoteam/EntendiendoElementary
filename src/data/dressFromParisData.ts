import {
  LessonText,
  Exercise,
  LessonSentence,
  DialogueLine,
  RadioChoiceExercise,
  SpeechResponseExercise,
  RoleplayPracticeExercise,
} from '../types';
import dressFromParisImg from '../assets/images/dress_from_paris_1788711801436.jpg';

export { dressFromParisImg };

export const DRESS_FROM_PARIS_SENTENCES: LessonSentence[] = [
  {
    en: '- What a lovely dress.',
    es: '- ¡Qué vestido tan lindo!',
  },
  {
    en: '- Really? Do you like it?',
    es: '- ¿En serio? ¿Te gusta?',
  },
  {
    en: "- Of course. It's beautiful. Is it new?",
    es: '- Por supuesto. Es hermoso. ¿Es nuevo?',
  },
  {
    en: '- Yes. I bought it in Paris last week.',
    es: '- Sí. Lo compré en París la semana pasada.',
  },
  {
    en: "- Well, it's really nice.",
    es: '- Bueno, es muy bonito.',
  },
  {
    en: '- Thank you.',
    es: '- Gracias.',
  },
];

export const DRESS_FROM_PARIS_DIALOGUE: DialogueLine[] = [
  {
    speaker: 'Speaker 1',
    textEn: 'What a lovely dress.',
    textEs: '¡Qué vestido tan lindo!',
    avatarColor: 'bg-blue-600',
  },
  {
    speaker: 'Speaker 2',
    textEn: 'Really? Do you like it?',
    textEs: '¿En serio? ¿Te gusta?',
    avatarColor: 'bg-teal-600',
  },
  {
    speaker: 'Speaker 1',
    textEn: "Of course. It's beautiful. Is it new?",
    textEs: 'Por supuesto. Es hermoso. ¿Es nuevo?',
    avatarColor: 'bg-blue-600',
  },
  {
    speaker: 'Speaker 2',
    textEn: 'Yes. I bought it in Paris last week.',
    textEs: 'Sí. Lo compré en París la semana pasada.',
    avatarColor: 'bg-teal-600',
  },
  {
    speaker: 'Speaker 1',
    textEn: "Well, it's really nice.",
    textEs: 'Bueno, es realmente agradable.',
    avatarColor: 'bg-blue-600',
  },
  {
    speaker: 'Speaker 2',
    textEn: 'Thank you.',
    textEs: 'Gracias.',
    avatarColor: 'bg-teal-600',
  },
];

export const DRESS_FROM_PARIS_LESSON_TEXT: LessonText = {
  title: 'Lesson 3: Dress from Paris',
  stepTitle: 'Step 1: Explore',
  audioText:
    "What a lovely dress. Really? Do you like it? Of course. It's beautiful. Is it new? Yes. I bought it in Paris last week. Well, it's really nice. Thank you.",
  textEn:
    '- What a lovely dress.\n- Really? Do you like it?\n- Of course. It\'s beautiful. Is it new?\n- Yes. I bought it in Paris last week.\n- Well, it\'s really nice.\n- Thank you.',
  textEs:
    '- ¡Qué vestido tan lindo!\n- ¿En serio? ¿Te gusta?\n- Por supuesto. Es hermoso. ¿Es nuevo?\n- Sí. Lo compré en París la semana pasada.\n- Bueno, es muy bonito.\n- Gracias.',
  imageSrc: dressFromParisImg,
  durationSeconds: 19,
  speakerGender: 'female',
  sentences: DRESS_FROM_PARIS_SENTENCES,
  practiceInstructions:
    'Listen to the dialogue between the two friends, tap any line to hear individual pronunciation, and complete the tasks that follow.',
};

// Activity 2: Radio Choice - What are the speakers discussing?
export const DRESS_PARIS_ACT2: RadioChoiceExercise = {
  id: 'dparis-act2-discussing',
  type: 'radio-choice',
  instructions: 'Choose the correct answer.',
  instructionsEs: 'Elige la respuesta correcta.',
  question: 'What are the speakers discussing?',
  questionEs: '¿De qué están hablando las hablantes?',
  imageUrl: dressFromParisImg,
  durationSeconds: 19,
  speakerGender: 'female',
  audioPrompt:
    "What a lovely dress. Really? Do you like it? Of course. It's beautiful. Is it new? Yes. I bought it in Paris last week. Well, it's really nice. Thank you.",
  sentences: DRESS_FROM_PARIS_SENTENCES,
  options: [
    { id: 'dp2-opt-1', text: 'The news', textEs: 'Las noticias', isCorrect: false },
    { id: 'dp2-opt-2', text: 'A dress', textEs: 'Un vestido', isCorrect: true },
    { id: 'dp2-opt-3', text: 'The weather', textEs: 'El clima', isCorrect: false },
    { id: 'dp2-opt-4', text: 'A trip', textEs: 'Un viaje', isCorrect: false },
  ],
  correctAnswerId: 'dp2-opt-2',
  explanation:
    'The conversation begins with "What a lovely dress." and revolves around where the dress was purchased and how nice it looks.',
  explanationEs:
    'La conversación comienza con "What a lovely dress." (¡Qué vestido tan lindo!) y gira en torno a dónde se compró y lo bonito que es.',
};

// Activity 3: Radio Choice - Why does the second speaker say, "Thank you"?
export const DRESS_PARIS_ACT3: RadioChoiceExercise = {
  id: 'dparis-act3-why-thank-you',
  type: 'radio-choice',
  instructions: 'Choose the correct answer.',
  instructionsEs: 'Elige la respuesta correcta.',
  question: 'Why does the second speaker say, "Thank you"?',
  questionEs: '¿Por qué la segunda hablante dice "Gracias"?',
  imageUrl: dressFromParisImg,
  durationSeconds: 19,
  speakerGender: 'female',
  audioPrompt:
    "What a lovely dress. Really? Do you like it? Of course. It's beautiful. Is it new? Yes. I bought it in Paris last week. Well, it's really nice. Thank you.",
  sentences: DRESS_FROM_PARIS_SENTENCES,
  options: [
    {
      id: 'dp3-opt-1',
      text: 'Her friend said something nice.',
      textEs: 'Su amiga dijo algo agradable.',
      isCorrect: true,
    },
    {
      id: 'dp3-opt-2',
      text: 'Her friend gave her a gift.',
      textEs: 'Su amiga le dio un regalo.',
      isCorrect: false,
    },
    {
      id: 'dp3-opt-3',
      text: 'Her friend took her on vacation.',
      textEs: 'Su amiga la llevó de vacaciones.',
      isCorrect: false,
    },
    {
      id: 'dp3-opt-4',
      text: 'Her friend made her a delicious dinner.',
      textEs: 'Su amiga le preparó una cena deliciosa.',
      isCorrect: false,
    },
  ],
  correctAnswerId: 'dp3-opt-1',
  explanation:
    'Her friend praised her dress saying "Well, it\'s really nice.", so the second speaker politely thanked her for the compliment.',
  explanationEs:
    'Su amiga elogió su vestido diciéndole "Well, it\'s really nice." (Bueno, es muy bonito), por lo que la segunda hablante agradeció el cumplido.',
};

// Activity 4: Radio Choice - What did the second speaker do last week?
export const DRESS_PARIS_ACT4: RadioChoiceExercise = {
  id: 'dparis-act4-last-week',
  type: 'radio-choice',
  instructions: 'Choose the correct answer.',
  instructionsEs: 'Elige la respuesta correcta.',
  question: 'What did the second speaker do last week?',
  questionEs: '¿Qué hizo la segunda hablante la semana pasada?',
  imageUrl: dressFromParisImg,
  durationSeconds: 19,
  speakerGender: 'female',
  audioPrompt:
    "What a lovely dress. Really? Do you like it? Of course. It's beautiful. Is it new? Yes. I bought it in Paris last week. Well, it's really nice. Thank you.",
  sentences: DRESS_FROM_PARIS_SENTENCES,
  options: [
    {
      id: 'dp4-opt-1',
      text: 'She made a new friend.',
      textEs: 'Hizo una nueva amiga.',
      isCorrect: false,
    },
    {
      id: 'dp4-opt-2',
      text: 'She visited Paris.',
      textEs: 'Visitó París.',
      isCorrect: true,
    },
    {
      id: 'dp4-opt-3',
      text: 'She bought a hat.',
      textEs: 'Compró un sombrero.',
      isCorrect: false,
    },
    {
      id: 'dp4-opt-4',
      text: 'She went to a party.',
      textEs: 'Fue a una fiesta.',
      isCorrect: false,
    },
  ],
  correctAnswerId: 'dp4-opt-2',
  explanation:
    'The speaker explicitly explains: "Yes. I bought it in Paris last week.", confirming she traveled to / visited Paris.',
  explanationEs:
    'La hablante explica claramente: "Yes. I bought it in Paris last week." (Sí. Lo compré en París la semana pasada), confirmando que estuvo en París.',
};

// Activity 5: Radio Choice - Which of these words from the dialogue has a different meaning?
export const DRESS_PARIS_ACT5: RadioChoiceExercise = {
  id: 'dparis-act5-different-meaning',
  type: 'radio-choice',
  instructions: 'Choose the correct answer.',
  instructionsEs: 'Elige la respuesta correcta.',
  question: 'Which of these words from the dialogue has a different meaning?',
  questionEs: '¿Cuál de estas palabras del diálogo tiene un significado diferente?',
  imageUrl: dressFromParisImg,
  durationSeconds: 19,
  speakerGender: 'female',
  audioPrompt:
    "What a lovely dress. Really? Do you like it? Of course. It's beautiful. Is it new? Yes. I bought it in Paris last week. Well, it's really nice. Thank you.",
  sentences: DRESS_FROM_PARIS_SENTENCES,
  options: [
    { id: 'dp5-opt-1', text: 'New', textEs: 'Nuevo', isCorrect: true },
    { id: 'dp5-opt-2', text: 'Nice', textEs: 'Bonito / Agradable', isCorrect: false },
    { id: 'dp5-opt-3', text: 'Lovely', textEs: 'Encantador / Lindo', isCorrect: false },
    { id: 'dp5-opt-4', text: 'Beautiful', textEs: 'Hermoso', isCorrect: false },
  ],
  correctAnswerId: 'dp5-opt-1',
  explanation:
    '"Nice", "Lovely", and "Beautiful" are adjectives that praise appearance or quality. "New" refers to age or recent acquisition, having a completely different meaning.',
  explanationEs:
    '"Nice", "Lovely" y "Beautiful" son sinónimos que describen belleza o aspecto agradable. "New" (nuevo) se refiere al tiempo o antigüedad, por lo que su significado es diferente.',
};

// Activity 6: Speech Response - What's the best response to the statement?
export const DRESS_PARIS_ACT6: SpeechResponseExercise = {
  id: 'dparis-act6-best-response-statement',
  type: 'speech-response',
  instructions: "What's the best response to the statement?",
  instructionsEs: '¿Cuál es la mejor respuesta a la afirmación?',
  subtitle: "Click 'Start' to record the correct answer.",
  subtitleEs: "Haz clic en 'Start' para grabar la respuesta correcta.",
  promptStatement: 'What a lovely dress.',
  promptStatementEs: '¡Qué vestido tan lindo!',
  promptIsQuestion: false,
  imageUrl: dressFromParisImg,
  durationSeconds: 19,
  speakerGender: 'female',
  audioPrompt:
    "What a lovely dress. Really? Do you like it? Of course. It's beautiful. Is it new? Yes. I bought it in Paris last week. Well, it's really nice. Thank you.",
  sentences: DRESS_FROM_PARIS_SENTENCES,
  options: [
    {
      id: 'dp6-opt-1',
      text: "Sure I'd love to.",
      textEs: 'Claro, me encantaría.',
      isCorrect: false,
    },
    {
      id: 'dp6-opt-2',
      text: 'Do you like it?',
      textEs: '¿Te gusta?',
      isCorrect: true,
    },
    {
      id: 'dp6-opt-3',
      text: 'How about blue?',
      textEs: '¿Qué tal azul?',
      isCorrect: false,
    },
  ],
  correctAnswerId: 'dp6-opt-2',
  explanation:
    'When someone gives a compliment like "What a lovely dress.", asking "Really? Do you like it?" is the conversational match used in the dialogue.',
  explanationEs:
    'Cuando alguien hace un cumplido como "What a lovely dress.", la respuesta natural en el diálogo es: "Really? Do you like it?" (¿En serio? ¿Te gusta?).',
};

// Activity 7: Speech Response - What's the best response to the question?
export const DRESS_PARIS_ACT7: SpeechResponseExercise = {
  id: 'dparis-act7-best-response-question',
  type: 'speech-response',
  instructions: "What's the best response to the question?",
  instructionsEs: '¿Cuál es la mejor respuesta a la pregunta?',
  subtitle: "Click 'Start' to record the correct answer.",
  subtitleEs: "Haz clic en 'Start' para grabar la respuesta correcta.",
  promptStatement: 'Do you like it?',
  promptStatementEs: '¿Te gusta?',
  promptIsQuestion: true,
  imageUrl: dressFromParisImg,
  durationSeconds: 19,
  speakerGender: 'female',
  audioPrompt:
    "What a lovely dress. Really? Do you like it? Of course. It's beautiful. Is it new? Yes. I bought it in Paris last week. Well, it's really nice. Thank you.",
  sentences: DRESS_FROM_PARIS_SENTENCES,
  options: [
    {
      id: 'dp7-opt-1',
      text: "It's beautiful.",
      textEs: 'Es hermoso.',
      isCorrect: true,
    },
    {
      id: 'dp7-opt-2',
      text: 'Last week.',
      textEs: 'La semana pasada.',
      isCorrect: false,
    },
    {
      id: 'dp7-opt-3',
      text: 'Thank you.',
      textEs: 'Gracias.',
      isCorrect: false,
    },
  ],
  correctAnswerId: 'dp7-opt-1',
  explanation:
    'When asked "Do you like it?", the appropriate answer expressing appreciation is "Of course. It\'s beautiful."',
  explanationEs:
    'Ante la pregunta "¿Te gusta?" ("Do you like it?"), la respuesta directa y congruente en el diálogo es: "Of course. It\'s beautiful." (Por supuesto. Es hermoso).',
};

// Activity 8: Roleplay Practice - Practice conversation characters
export const DRESS_PARIS_ACT8: RoleplayPracticeExercise = {
  id: 'dparis-act8-roleplay-practice',
  type: 'roleplay-practice',
  instructions: 'Click on the arrow next to the character you would like to practice.',
  instructionsEs: 'Haz clic en la flecha junto al personaje que deseas practicar.',
  imageUrl: dressFromParisImg,
  characters: [
    {
      id: 'character-1',
      name: 'Speaker 1',
      nameEs: 'Hablante 1 (Vestido azul)',
      role: 'Complimenting friend',
      roleEs: 'Amiga que elogia el vestido',
      avatarSide: 'left',
      voicePitch: 1.05,
      voiceGender: 'female',
    },
    {
      id: 'character-2',
      name: 'Speaker 2',
      nameEs: 'Hablante 2 (Vestido de París)',
      role: 'Owner of the dress',
      roleEs: 'Dueña del vestido de París',
      avatarSide: 'right',
      voicePitch: 0.95,
      voiceGender: 'female',
    },
  ],
  dialogueTurns: [
    {
      characterId: 'character-1',
      textEn: 'What a lovely dress.',
      textEs: '¡Qué vestido tan lindo!',
    },
    {
      characterId: 'character-2',
      textEn: 'Really? Do you like it?',
      textEs: '¿En serio? ¿Te gusta?',
    },
    {
      characterId: 'character-1',
      textEn: "Of course. It's beautiful. Is it new?",
      textEs: 'Por supuesto. Es hermoso. ¿Es nuevo?',
    },
    {
      characterId: 'character-2',
      textEn: 'Yes. I bought it in Paris last week.',
      textEs: 'Sí. Lo compré en París la semana pasada.',
    },
    {
      characterId: 'character-1',
      textEn: "Well, it's really nice.",
      textEs: 'Bueno, es realmente bonito.',
    },
    {
      characterId: 'character-2',
      textEn: 'Thank you.',
      textEs: 'Gracias.',
    },
  ],
};

export const DRESS_FROM_PARIS_EXERCISES: Exercise[] = [
  DRESS_PARIS_ACT2,
  DRESS_PARIS_ACT3,
  DRESS_PARIS_ACT4,
  DRESS_PARIS_ACT5,
  DRESS_PARIS_ACT6,
  DRESS_PARIS_ACT7,
  DRESS_PARIS_ACT8,
];
