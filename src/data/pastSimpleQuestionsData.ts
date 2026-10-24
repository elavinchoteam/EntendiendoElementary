import pastQuestionsOfficeImg from '../assets/images/past_questions_office.png';
import pastQuestionsConcertImg from '../assets/images/past_questions_concert.png';
import pastQuestionsCarImg from '../assets/images/past_questions_car.png';

export {
  pastQuestionsOfficeImg,
  pastQuestionsConcertImg,
  pastQuestionsCarImg,
};

export interface PastSimpleQuestionsDialogueLine {
  speaker?: string;
  textEn: string;
  textEs: string;
  hasHighlight?: boolean;
}

export interface DragDropOption {
  id: string;
  text: string;
  textEs: string;
  isCorrect: boolean;
}

export interface PastSimpleQuestionsExerciseItem {
  id: string;
  number: number;
  type: 'explore' | 'cloze' | 'test';
  title: string;
  titleEs: string;
  instructions: string;
  instructionsEs: string;
  illustrationUrl?: string;
  dialogueLines: {
    speaker?: string;
    textEn: string;
    textEs: string;
    hasBlank?: boolean;
    isMultiSlot?: boolean;
    prefix?: string;
    suffix?: string;
    slotSeparators?: string[];
  }[];
  options?: DragDropOption[];
  correctAnswerId?: string;
  slotsCount?: number;
  correctSlotOptionIds?: string[];
  explanationEn?: string;
  explanationEs?: string;
}

export interface PastSimpleQuestionsTestItem {
  id: string;
  testNumber: number;
  title: string;
  titleEs: string;
  illustrationUrl?: string;
  dialogueLines: {
    speaker?: string;
    textEn: string;
    textEs: string;
    hasBlank?: boolean;
    isMultiSlot?: boolean;
    prefix?: string;
    suffix?: string;
    slotSeparators?: string[];
  }[];
  options: DragDropOption[];
  correctAnswerId?: string;
  slotsCount?: number;
  correctSlotOptionIds?: string[];
  explanationEn: string;
  explanationEs: string;
}

export const PAST_SIMPLE_QUESTIONS_REFERENCE = {
  dialogue: [
    {
      speaker: '',
      textEn: '- Did you ask the boss about money?',
      textEs: '- ¿Le preguntaste a la jefa sobre el dinero?',
      highlights: ['Did', 'ask'],
    },
    {
      speaker: '',
      textEn: '- Yes, I did.',
      textEs: '- Sí, lo hice.',
      highlights: ['did'],
    },
    {
      speaker: '',
      textEn: '- Well, what did she say?',
      textEs: '- Bueno, ¿qué dijo ella?',
      highlights: ['did', 'say'],
    },
    {
      speaker: '',
      textEn: '- She said no.',
      textEs: '- Ella dijo que no.',
      highlights: ['said'],
    },
  ],
  audioText:
    'Did you ask the boss about money? Yes, I did. Well, what did she say? She said no.',
  durationSeconds: 8,
};

export const PAST_SIMPLE_QUESTIONS_ACTIVITIES: PastSimpleQuestionsExerciseItem[] = [
  /* Actividad 1: Video Explore & Dialogue */
  {
    id: 'activity-1',
    number: 1,
    type: 'explore',
    title: 'Actividad 1',
    titleEs: 'Actividad 1: Diálogo y Video',
    instructions: 'Listen and explore the conversation.',
    instructionsEs: 'Escucha y explora la conversación.',
    dialogueLines: [
      {
        speaker: '',
        textEn: '- Did you ask the boss about money?',
        textEs: '- ¿Le preguntaste a la jefa sobre el dinero?',
      },
      {
        speaker: '',
        textEn: '- Yes, I did.',
        textEs: '- Sí, lo hice.',
      },
      {
        speaker: '',
        textEn: '- Well, what did she say?',
        textEs: '- Bueno, ¿qué dijo ella?',
      },
      {
        speaker: '',
        textEn: '- She said no.',
        textEs: '- Ella dijo que no.',
      },
    ],
  },

  /* Actividad 2: Where did you buy it? */
  {
    id: 'activity-2',
    number: 2,
    type: 'cloze',
    title: 'Actividad 2',
    titleEs: 'Actividad 2: ¿Dónde lo compraste?',
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la respuesta correcta al espacio en blanco.',
    dialogueLines: [
      {
        speaker: '',
        textEn: '- That sweater is beautiful. Where did you buy it?',
        textEs: '- Ese suéter es hermoso. ¿Dónde lo compraste?',
        hasBlank: true,
        prefix: '- That sweater is beautiful. Where ',
        suffix: ' ?',
      },
      {
        speaker: '',
        textEn: '- I bought it at that new department store on Main Street.',
        textEs: '- Lo compré en esa nueva tienda departamental en Main Street.',
      },
    ],
    options: [
      {
        id: 'opt-you-bought-it',
        text: 'you bought it',
        textEs: 'lo compraste (sin auxiliar)',
        isCorrect: false,
      },
      {
        id: 'opt-you-buy-it',
        text: 'you buy it',
        textEs: 'lo compras',
        isCorrect: false,
      },
      {
        id: 'opt-did-you-buy-it',
        text: 'did you buy it',
        textEs: '¿lo compraste? (did + sujeto + base)',
        isCorrect: true,
      },
    ],
    correctAnswerId: 'opt-did-you-buy-it',
    slotsCount: 1,
    explanationEn: "In past simple questions, use 'did' + subject + base verb: 'Where did you buy it?'.",
    explanationEs: "En preguntas de pasado simple, se usa 'did' + sujeto + verbo base: 'Where did you buy it?'.",
  },

  /* Actividad 3: Why did you give David your new CD? */
  {
    id: 'activity-3',
    number: 3,
    type: 'cloze',
    title: 'Actividad 3',
    titleEs: 'Actividad 3: ¿Por qué le diste tu CD?',
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la respuesta correcta al espacio en blanco.',
    dialogueLines: [
      {
        speaker: '',
        textEn: '- Why did you give David your new CD?',
        textEs: '- ¿Por qué le diste a David tu nuevo CD?',
        hasBlank: true,
        prefix: '- Why ',
        suffix: ' David your new CD?',
      },
      {
        speaker: '',
        textEn: '- Because yesterday was his birthday.',
        textEs: '- Porque ayer fue su cumpleaños.',
      },
    ],
    options: [
      {
        id: 'opt-do-you-give',
        text: 'do you give',
        textEs: 'le das (presente)',
        isCorrect: false,
      },
      {
        id: 'opt-you-gave',
        text: 'you gave',
        textEs: 'le diste (afirmativo sin auxiliar)',
        isCorrect: false,
      },
      {
        id: 'opt-did-you-give',
        text: 'did you give',
        textEs: 'le diste (did + sujeto + verbo base give)',
        isCorrect: true,
      },
      {
        id: 'opt-you-are-giving',
        text: 'you are giving',
        textEs: 'le estás dando (continuo)',
        isCorrect: false,
      },
    ],
    correctAnswerId: 'opt-did-you-give',
    slotsCount: 1,
    explanationEn: "Question in past simple with why: 'Why did you give...'.",
    explanationEs: "Pregunta en pasado simple con why: 'Why did you give...'.",
  },

  /* Actividad 4: Did you fall off your bicycle? (3 slots) */
  {
    id: 'activity-4',
    number: 4,
    type: 'cloze',
    title: 'Actividad 4',
    titleEs: 'Actividad 4: ¿Te caíste de tu bicicleta?',
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra las palabras correctas a los espacios en blanco.',
    dialogueLines: [
      {
        speaker: '',
        textEn: '- Did you fall off your bicycle?',
        textEs: '- ¿Te caíste de tu bicicleta?',
        hasBlank: true,
        isMultiSlot: true,
        prefix: '- ',
        suffix: ' off your bicycle?',
      },
      {
        speaker: '',
        textEn: "- No, I didn't. I fell off my motorcycle.",
        textEs: '- No. Me caí de mi motocicleta.',
      },
    ],
    options: [
      {
        id: 'opt-you-lower',
        text: 'you',
        textEs: 'tú (sujeto en minúscula)',
        isCorrect: true,
      },
      {
        id: 'opt-you-cap',
        text: 'You',
        textEs: 'Tú (con mayúscula)',
        isCorrect: false,
      },
      {
        id: 'opt-fall',
        text: 'fall',
        textEs: 'caer / caíste (forma base)',
        isCorrect: true,
      },
      {
        id: 'opt-did-cap',
        text: 'Did',
        textEs: 'Did (auxiliar con mayúscula)',
        isCorrect: true,
      },
    ],
    slotsCount: 3,
    correctSlotOptionIds: ['opt-did-cap', 'opt-you-lower', 'opt-fall'],
    explanationEn: "Forming yes/no past question: 'Did you fall off your bicycle?'.",
    explanationEs: "Formación de pregunta sí/no en pasado: 'Did you fall off your bicycle?'.",
  },

  /* Actividad 5: Did you pay the check? */
  {
    id: 'activity-5',
    number: 5,
    type: 'cloze',
    title: 'Actividad 5',
    titleEs: 'Actividad 5: ¿Pagaste la cuenta?',
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la respuesta correcta al espacio en blanco.',
    dialogueLines: [
      {
        speaker: '',
        textEn: '- Did you pay the check?',
        textEs: '- ¿Pagaste la cuenta?',
        hasBlank: true,
        prefix: '- ',
        suffix: ' the check?',
      },
      {
        speaker: '',
        textEn: '- Yes, I did.',
        textEs: '- Sí, lo hice.',
      },
      {
        speaker: '',
        textEn: "- Let's go home.",
        textEs: '- Vamos a casa.',
      },
    ],
    options: [
      {
        id: 'opt-you-paid',
        text: 'You paid',
        textEs: 'Pagaste (afirmación)',
        isCorrect: false,
      },
      {
        id: 'opt-did-you-pay',
        text: 'Did you pay',
        textEs: '¿Pagaste? (Did + sujeto + base)',
        isCorrect: true,
      },
      {
        id: 'opt-do-you-pay',
        text: 'Do you pay',
        textEs: '¿Pagas? (presente)',
        isCorrect: false,
      },
      {
        id: 'opt-are-you-paying',
        text: 'Are you paying',
        textEs: '¿Estás pagando? (presente continuo)',
        isCorrect: false,
      },
    ],
    correctAnswerId: 'opt-did-you-pay',
    slotsCount: 1,
    explanationEn: "Past simple question starts with 'Did you pay...'.",
    explanationEs: "Pregunta en pasado simple comienza con 'Did you pay...'.",
  },

  /* Actividad 6: Did you hear the news this morning? */
  {
    id: 'activity-6',
    number: 6,
    type: 'cloze',
    title: 'Actividad 6',
    titleEs: 'Actividad 6: ¿Escuchaste las noticias?',
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la respuesta correcta al espacio en blanco.',
    dialogueLines: [
      {
        speaker: '',
        textEn: '- Did you hear the news this morning?',
        textEs: '- ¿Escuchaste las noticias esta mañana?',
        hasBlank: true,
        prefix: '- ',
        suffix: ' hear the news this morning?',
      },
      {
        speaker: '',
        textEn: "- No, I didn't. What happened?",
        textEs: '- No. ¿Qué pasó?',
      },
      {
        speaker: '',
        textEn: '- There was a fire at the school!',
        textEs: '- ¡Hubo un incendio en la escuela!',
      },
    ],
    options: [
      {
        id: 'opt-are-you',
        text: 'Are you',
        textEs: 'Estás',
        isCorrect: false,
      },
      {
        id: 'opt-were-you',
        text: 'Were you',
        textEs: 'Estabas',
        isCorrect: false,
      },
      {
        id: 'opt-did-you-act6',
        text: 'Did you',
        textEs: '¿Tú? (auxiliar de pasado simple)',
        isCorrect: true,
      },
      {
        id: 'opt-you-are',
        text: 'You are',
        textEs: 'Tú eres / estás',
        isCorrect: false,
      },
    ],
    correctAnswerId: 'opt-did-you-act6',
    slotsCount: 1,
    explanationEn: "With the main verb 'hear', use 'Did you': 'Did you hear...?'.",
    explanationEs: "Con el verbo principal 'hear', se usa el auxiliar 'Did you': 'Did you hear...?'.",
  },

  /* Actividad 7: You didn't lose it, did you? */
  {
    id: 'activity-7',
    number: 7,
    type: 'cloze',
    title: 'Actividad 7',
    titleEs: 'Actividad 7: Pregunta Coletilla (Tag Question)',
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la respuesta correcta al espacio en blanco.',
    dialogueLines: [
      {
        speaker: '',
        textEn: '- Are you going to the concert tonight?',
        textEs: '- ¿Vas a ir al concierto esta noche?',
      },
      {
        speaker: '',
        textEn: "- No. I can't find my ticket.",
        textEs: '- No. No puedo encontrar mi entrada.',
      },
      {
        speaker: '',
        textEn: "- You didn't lose it, did you?",
        textEs: '- No la perdiste, ¿verdad?',
        hasBlank: true,
        prefix: "- You didn't lose it, ",
        suffix: ' ?',
      },
      {
        speaker: '',
        textEn: '- I think I left it on the bus.',
        textEs: '- Creo que la dejé en el autobús.',
      },
    ],
    options: [
      {
        id: 'opt-you-didnt',
        text: "you didn't",
        textEs: 'no lo hiciste',
        isCorrect: false,
      },
      {
        id: 'opt-did-you-act7',
        text: 'did you',
        textEs: '¿o sí? / ¿verdad? (coletilla afirmativa)',
        isCorrect: true,
      },
      {
        id: 'opt-you-did',
        text: 'you did',
        textEs: 'lo hiciste',
        isCorrect: false,
      },
      {
        id: 'opt-didnt-you',
        text: "didn't you",
        textEs: '¿no lo hiciste? (coletilla negativa)',
        isCorrect: false,
      },
    ],
    correctAnswerId: 'opt-did-you-act7',
    slotsCount: 1,
    explanationEn: "A negative statement ('You didn't lose it') takes an affirmative tag: 'did you?'.",
    explanationEs: "Una afirmación negativa ('You didn't lose it') lleva una pregunta coletilla afirmativa: 'did you?'.",
  },

  /* Actividad 8: Who directed it? */
  {
    id: 'activity-8',
    number: 8,
    type: 'cloze',
    title: 'Actividad 8',
    titleEs: 'Actividad 8: Pregunta sobre el Sujeto con Who',
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la respuesta correcta al espacio en blanco.',
    dialogueLines: [
      {
        speaker: '',
        textEn: '- "Blue Roses" is a wonderful movie.',
        textEs: '- "Blue Roses" es una película maravillosa.',
      },
      {
        speaker: '',
        textEn: '- Who directed it?',
        textEs: '- ¿Quién la dirigió?',
        hasBlank: true,
        prefix: '- Who ',
        suffix: ' it?',
      },
      {
        speaker: '',
        textEn: '- Victoria Masterson.',
        textEs: '- Victoria Masterson.',
      },
    ],
    options: [
      {
        id: 'opt-can-direct',
        text: 'can direct',
        textEs: 'puede dirigir',
        isCorrect: false,
      },
      {
        id: 'opt-directed',
        text: 'directed',
        textEs: 'dirigió (pasado simple directo)',
        isCorrect: true,
      },
      {
        id: 'opt-did-he-direct',
        text: 'did he direct',
        textEs: 'dirigió él (sobra pronombre he)',
        isCorrect: false,
      },
      {
        id: 'opt-is-directing',
        text: 'is directing',
        textEs: 'está dirigiendo (presente)',
        isCorrect: false,
      },
    ],
    correctAnswerId: 'opt-directed',
    slotsCount: 1,
    explanationEn: "When 'Who' is the subject of the question, no auxiliary 'did' is used: 'Who directed it?'.",
    explanationEs: "Cuando 'Who' es el sujeto de la pregunta, no se utiliza el auxiliar 'did': 'Who directed it?'.",
  },

  /* Actividad 9: Did you enjoy the concert? (with concert illustration) */
  {
    id: 'activity-9',
    number: 9,
    type: 'cloze',
    title: 'Actividad 9',
    titleEs: 'Actividad 9: ¿Disfrutaron del concierto?',
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la respuesta correcta al espacio en blanco.',
    illustrationUrl: pastQuestionsConcertImg,
    dialogueLines: [
      {
        speaker: '',
        textEn: '- Did you enjoy the concert?',
        textEs: '- ¿Disfrutaron del concierto?',
        hasBlank: true,
        prefix: '- ',
        suffix: ' enjoy the concert?',
      },
      {
        speaker: '',
        textEn: '- Yes, we did. It was wonderful!',
        textEs: '- Sí. ¡Fue maravilloso!',
      },
    ],
    options: [
      {
        id: 'opt-are-you-act9',
        text: 'Are you',
        textEs: 'Están',
        isCorrect: false,
      },
      {
        id: 'opt-you-are-act9',
        text: 'You are',
        textEs: 'Ustedes están',
        isCorrect: false,
      },
      {
        id: 'opt-did-you-act9',
        text: 'Did you',
        textEs: '¿Ustedes? (auxiliar de pasado)',
        isCorrect: true,
      },
      {
        id: 'opt-you-did-act9',
        text: 'You did',
        textEs: 'Ustedes lo hicieron',
        isCorrect: false,
      },
    ],
    correctAnswerId: 'opt-did-you-act9',
    slotsCount: 1,
    explanationEn: "Past simple question: 'Did you enjoy the concert?'.",
    explanationEs: "Pregunta en pasado simple: 'Did you enjoy the concert?'.",
  },

  /* Actividad 10: Did you buy onions at the market? - Yes, I did. (3 slots) */
  {
    id: 'activity-10',
    number: 10,
    type: 'cloze',
    title: 'Actividad 10',
    titleEs: 'Actividad 10: Respuesta corta afirmativa',
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra las palabras correctas a los espacios en blanco.',
    dialogueLines: [
      {
        speaker: '',
        textEn: '- Did you buy onions at the market?',
        textEs: '- ¿Compraste cebollas en el mercado?',
      },
      {
        speaker: '',
        textEn: '- Yes, I did.',
        textEs: '- Sí, lo hice.',
        hasBlank: true,
        isMultiSlot: true,
        prefix: '- ',
        suffix: ' .',
        slotSeparators: [', ', ' '],
      },
    ],
    options: [
      {
        id: 'opt-yes-cap',
        text: 'Yes',
        textEs: 'Sí (con mayúscula)',
        isCorrect: true,
      },
      {
        id: 'opt-did-lower',
        text: 'did',
        textEs: 'hice (auxiliar pasado)',
        isCorrect: true,
      },
      {
        id: 'opt-didnt-lower',
        text: "didn't",
        textEs: 'no hice',
        isCorrect: false,
      },
      {
        id: 'opt-i-cap',
        text: 'I',
        textEs: 'yo',
        isCorrect: true,
      },
      {
        id: 'opt-do-lower',
        text: 'do',
        textEs: 'hago (presente)',
        isCorrect: false,
      },
    ],
    slotsCount: 3,
    correctSlotOptionIds: ['opt-yes-cap', 'opt-i-cap', 'opt-did-lower'],
    explanationEn: "Short answer in the past simple: 'Yes, I did.'.",
    explanationEs: "Respuesta corta afirmativa en pasado simple: 'Yes, I did.'.",
  },

  /* Actividad 11: You helped her, didn't you? */
  {
    id: 'activity-11',
    number: 11,
    type: 'cloze',
    title: 'Actividad 11',
    titleEs: 'Actividad 11: Pregunta Coletilla Negativa',
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la respuesta correcta al espacio en blanco.',
    dialogueLines: [
      {
        speaker: '',
        textEn: '- Lisa got a 90 on her English test.',
        textEs: '- Lisa sacó un 90 en su examen de inglés.',
      },
      {
        speaker: '',
        textEn: "- Hey, that's great.",
        textEs: '- ¡Oye, eso es genial!',
      },
      {
        speaker: '',
        textEn: "- You helped her, didn't you?",
        textEs: '- La ayudaste, ¿verdad?',
        hasBlank: true,
        prefix: '- You helped her, ',
        suffix: ' ?',
      },
      {
        speaker: '',
        textEn: '- Yes, I did.',
        textEs: '- Sí, lo hice.',
      },
    ],
    options: [
      {
        id: 'opt-didnt-you-act11',
        text: "didn't you",
        textEs: '¿verdad? / ¿no es así? (coletilla negativa)',
        isCorrect: true,
      },
      {
        id: 'opt-dont-you',
        text: "don't you",
        textEs: '¿no es así? (presente)',
        isCorrect: false,
      },
      {
        id: 'opt-you-didnt-act11',
        text: "you didn't",
        textEs: 'no la ayudaste',
        isCorrect: false,
      },
      {
        id: 'opt-you-did-act11',
        text: 'you did',
        textEs: 'la ayudaste',
        isCorrect: false,
      },
    ],
    correctAnswerId: 'opt-didnt-you-act11',
    slotsCount: 1,
    explanationEn: "An affirmative past sentence ('You helped her') takes a negative tag: 'didn't you?'.",
    explanationEs: "Una oración afirmativa en pasado ('You helped her') lleva una coletilla negativa: 'didn't you?'.",
  },
];

export const PAST_SIMPLE_QUESTIONS_TESTS: PastSimpleQuestionsTestItem[] = [
  /* Test 1 */
  {
    id: 'test-1',
    testNumber: 1,
    title: 'Test 1',
    titleEs: 'Test 1: ¿A quién viste?',
    dialogueLines: [
      {
        speaker: '',
        textEn: "- I saw a famous singer last night at Pierre's Restaurant.",
        textEs: "- Vi a un cantante famoso anoche en el Restaurante de Pierre.",
      },
      {
        speaker: '',
        textEn: '- Who did you see ?',
        textEs: '- ¿A quién viste?',
        hasBlank: true,
        prefix: '- Who did you ',
        suffix: ' ?',
      },
      {
        speaker: '',
        textEn: '- Mick Starlight.',
        textEs: '- Mick Starlight.',
      },
    ],
    options: [
      { id: 't1-seen', text: 'seen', textEs: 'visto (participio)', isCorrect: false },
      { id: 't1-see', text: 'see', textEs: 'ver / viste (forma base)', isCorrect: true },
      { id: 't1-saw', text: 'saw', textEs: 'vi (pasado directo)', isCorrect: false },
    ],
    correctAnswerId: 't1-see',
    slotsCount: 1,
    explanationEn: "After 'did', always use the base form of the verb: 'Who did you see?'.",
    explanationEs: "Después del auxiliar 'did', siempre se usa la forma base del verbo: 'Who did you see?'.",
  },

  /* Test 2 (3 slots) */
  {
    id: 'test-2',
    testNumber: 2,
    title: 'Test 2',
    titleEs: 'Test 2: Sí, lo hice',
    dialogueLines: [
      {
        speaker: '',
        textEn: '- Did you paint your room again?',
        textEs: '- ¿Pintaste tu habitación otra vez?',
      },
      {
        speaker: '',
        textEn: '- Yes, I did.',
        textEs: '- Sí, lo hice.',
        hasBlank: true,
        isMultiSlot: true,
        prefix: '- ',
        suffix: ' .',
        slotSeparators: [', ', ' '],
      },
      {
        speaker: '',
        textEn: '- It looks great.',
        textEs: '- Se ve genial.',
      },
    ],
    options: [
      { id: 't2-i', text: 'I', textEs: 'yo', isCorrect: true },
      { id: 't2-yes', text: 'Yes', textEs: 'Sí (con mayúscula)', isCorrect: true },
      { id: 't2-did', text: 'did', textEs: 'hice', isCorrect: true },
      { id: 't2-didnt', text: "didn't", textEs: 'no hice', isCorrect: false },
    ],
    slotsCount: 3,
    correctSlotOptionIds: ['t2-yes', 't2-i', 't2-did'],
    explanationEn: "Short affirmative past response: 'Yes, I did.'.",
    explanationEs: "Respuesta corta afirmativa en pasado: 'Yes, I did.'.",
  },

  /* Test 3 */
  {
    id: 'test-3',
    testNumber: 3,
    title: 'Test 3',
    titleEs: 'Test 3: No encontraste tu billetera, ¿verdad?',
    dialogueLines: [
      {
        speaker: '',
        textEn: "- You didn't find your wallet, did you?",
        textEs: '- No encontraste tu billetera, ¿verdad?',
        hasBlank: true,
        prefix: '- ',
        suffix: ' , did you?',
      },
      {
        speaker: '',
        textEn: "- No, I didn't.",
        textEs: '- No.',
      },
      {
        speaker: '',
        textEn: '- Maybe someone took it.',
        textEs: '- Tal vez alguien se la llevó.',
      },
    ],
    options: [
      {
        id: 't3-opt1',
        text: "You didn't find your wallet",
        textEs: 'No encontraste tu billetera',
        isCorrect: true,
      },
      {
        id: 't3-opt2',
        text: 'You are looking for your wallet',
        textEs: 'Estás buscando tu billetera',
        isCorrect: false,
      },
      {
        id: 't3-opt3',
        text: "You aren't looking for your wallet",
        textEs: 'No estás buscando tu billetera',
        isCorrect: false,
      },
      {
        id: 't3-opt4',
        text: 'You found your wallet',
        textEs: 'Encontraste tu billetera',
        isCorrect: false,
      },
    ],
    correctAnswerId: 't3-opt1',
    slotsCount: 1,
    explanationEn: "A positive tag question ', did you?' pairs with a negative statement: 'You didn't find your wallet'.",
    explanationEs: "Una coletilla positiva ', did you?' acompaña a una oración negativa: 'You didn't find your wallet'.",
  },

  /* Test 4 (with car illustration & 3 slots) */
  {
    id: 'test-4',
    testNumber: 4,
    title: 'Test 4',
    titleEs: 'Test 4: ¿Arreglaste el auto?',
    illustrationUrl: pastQuestionsCarImg,
    dialogueLines: [
      {
        speaker: '',
        textEn: '- Did you fix the car?',
        textEs: '- ¿Arreglaste el auto?',
        hasBlank: true,
        isMultiSlot: true,
        prefix: '- ',
        suffix: ' the car?',
      },
      {
        speaker: '',
        textEn: '- Yes, I did.',
        textEs: '- Sí, lo hice.',
      },
      {
        speaker: '',
        textEn: '- Thank you.',
        textEs: '- Gracias.',
      },
      {
        speaker: '',
        textEn: "- You're welcome.",
        textEs: '- De nada.',
      },
    ],
    options: [
      { id: 't4-fix', text: 'fix', textEs: 'arreglar (verbo base)', isCorrect: true },
      { id: 't4-fixed', text: 'fixed', textEs: 'arreglado (pasado con ed)', isCorrect: false },
      { id: 't4-you-cap', text: 'You', textEs: 'Tú (con mayúscula)', isCorrect: false },
      { id: 't4-did-cap', text: 'Did', textEs: 'Did (auxiliar con mayúscula)', isCorrect: true },
      { id: 't4-you-lower', text: 'you', textEs: 'tú (sujeto en minúscula)', isCorrect: true },
    ],
    slotsCount: 3,
    correctSlotOptionIds: ['t4-did-cap', 't4-you-lower', 't4-fix'],
    explanationEn: "Question structure: Did + subject + base verb: 'Did you fix the car?'.",
    explanationEs: "Estructura interrogativa: Did + sujeto + verbo base: 'Did you fix the car?'.",
  },

  /* Test 5 */
  {
    id: 'test-5',
    testNumber: 5,
    title: 'Test 5',
    titleEs: 'Test 5: Coletilla en Pasado',
    dialogueLines: [
      {
        speaker: '',
        textEn: "- You didn't mail the package that was on my desk, did you?",
        textEs: '- No enviaste el paquete que estaba en mi escritorio, ¿verdad?',
        hasBlank: true,
        prefix: "- You didn't mail the package that was on my desk, ",
        suffix: ' ?',
      },
      {
        speaker: '',
        textEn: '- Yes, I did.',
        textEs: '- Sí, lo hice.',
      },
      {
        speaker: '',
        textEn: "- Oh, no. That was Mr. Green's package!",
        textEs: '- ¡Oh, no! ¡Ese era el paquete del Sr. Green!',
      },
    ],
    options: [
      { id: 't5-didnt-you', text: "didn't you", textEs: "¿no lo hiciste? (negativa)", isCorrect: false },
      { id: 't5-you-didnt', text: "you didn't", textEs: 'no lo hiciste', isCorrect: false },
      { id: 't5-did-you', text: 'did you', textEs: '¿o sí? / ¿verdad? (afirmativa)', isCorrect: true },
      { id: 't5-you-did', text: 'you did', textEs: 'lo hiciste', isCorrect: false },
    ],
    correctAnswerId: 't5-did-you',
    slotsCount: 1,
    explanationEn: "Negative clause ('You didn't mail...') takes an affirmative question tag: 'did you?'.",
    explanationEs: "Una cláusula negativa ('You didn't mail...') lleva una coletilla interrogativa afirmativa: 'did you?'.",
  },
];
