import pastSimpleRegularTennisImg from '../assets/images/past_simple_regular_tennis.png';

export { pastSimpleRegularTennisImg };

export interface PastSimpleRegularDialogueLine {
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

export interface PastSimpleRegularExerciseItem {
  id: string;
  number: number;
  type: 'explore' | 'cloze' | 'test';
  title: string;
  titleEs: string;
  instructions: string;
  instructionsEs: string;
  dialogueLines: {
    speaker?: string;
    textEn: string;
    textEs: string;
    hasBlank?: boolean;
    prefix?: string;
    suffix?: string;
  }[];
  options?: DragDropOption[];
  correctAnswerId?: string;
  explanationEn?: string;
  explanationEs?: string;
}

export interface PastSimpleRegularTestItem {
  id: string;
  testNumber: number;
  title: string;
  titleEs: string;
  dialogueLines: {
    speaker?: string;
    textEn: string;
    textEs: string;
    hasBlank?: boolean;
    prefix?: string;
    suffix?: string;
  }[];
  options: DragDropOption[];
  correctAnswerId: string;
  explanationEn: string;
  explanationEs: string;
}

export const PAST_SIMPLE_REGULAR_REFERENCE = {
  dialogue: [
    {
      speaker: '',
      textEn: "- We didn't work yesterday. We had the day off. We played tennis all day.",
      textEs: '- No trabajamos ayer. Tuvimos el día libre. Jugamos al tenis todo el día.',
    },
  ],
  audioText: "We didn't work yesterday. We had the day off. We played tennis all day.",
  highlights: ["didn't work", 'played'],
  durationSeconds: 8,
};

export const PAST_SIMPLE_REGULAR_ACTIVITIES: PastSimpleRegularExerciseItem[] = [
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
        textEn: "- We didn't work yesterday. We had the day off. We played tennis all day.",
        textEs: '- No trabajamos ayer. Tuvimos el día libre. Jugamos al tenis todo el día.',
      },
    ],
  },

  /* Actividad 2 (actividad 2) */
  {
    id: 'activity-2',
    number: 2,
    type: 'cloze',
    title: 'Actividad 2',
    titleEs: 'Actividad 2',
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    dialogueLines: [
      {
        textEn: '- Maria moved to a new apartment.',
        textEs: '- María se mudó a un nuevo apartamento.',
      },
      {
        hasBlank: true,
        prefix: '- I know. I',
        suffix: 'her move.',
        textEn: '- I know. I helped her move.',
        textEs: '- Lo sé. La ayudé a mudarse.',
      },
    ],
    options: [
      { id: 'opt-did-help', text: 'did help', textEs: 'ayudó', isCorrect: false },
      { id: 'opt-helps', text: 'helps', textEs: 'ayuda', isCorrect: false },
      { id: 'opt-helped', text: 'helped', textEs: 'ayudé', isCorrect: true },
      { id: 'opt-didnt-help', text: "didn't help", textEs: 'no ayudé', isCorrect: false },
    ],
    correctAnswerId: 'opt-helped',
    explanationEn: "Use the past simple form 'helped' for an affirmative action completed in the past.",
    explanationEs: "Usa la forma en pasado simple 'helped' para una acción afirmativa completada en el pasado.",
  },

  /* Actividad 3 (actividad 3) */
  {
    id: 'activity-3',
    number: 3,
    type: 'cloze',
    title: 'Actividad 3',
    titleEs: 'Actividad 3',
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    dialogueLines: [
      {
        textEn: "- Why isn't Mr. Dominic here?",
        textEs: '- ¿Por qué no está el Sr. Dominic aquí?',
      },
      {
        hasBlank: true,
        prefix: '- Because I',
        suffix: 'him.',
        textEn: "- Because I didn't invite him.",
        textEs: '- Porque no lo invité.',
      },
    ],
    options: [
      { id: 'opt-wasnt-invited', text: "wasn't invited", textEs: 'no fue invitado', isCorrect: false },
      { id: 'opt-am-not-invited', text: 'am not invited', textEs: 'no estoy invitado', isCorrect: false },
      { id: 'opt-dont-invite', text: "don't invite", textEs: 'no invito', isCorrect: false },
      { id: 'opt-didnt-invite', text: "didn't invite", textEs: 'no invité', isCorrect: true },
    ],
    correctAnswerId: 'opt-didnt-invite',
    explanationEn: "Use 'didn't' + base verb 'invite' for negative past simple statements.",
    explanationEs: "Usa 'didn't' + el verbo base 'invite' para oraciones negativas en pasado simple.",
  },

  /* Actividad 4 (actividad 4) */
  {
    id: 'activity-4',
    number: 4,
    type: 'cloze',
    title: 'Actividad 4',
    titleEs: 'Actividad 4',
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    dialogueLines: [
      {
        textEn: '- Hey, Roberto! I got a credit card!',
        textEs: '- ¡Hola, Roberto! ¡Conseguí una tarjeta de crédito!',
      },
      {
        textEn: "- That's great. How did you get it?",
        textEs: '- ¡Qué bien! ¿Cómo la conseguiste?',
      },
      {
        hasBlank: true,
        prefix: '- I',
        suffix: 'a form, and they sent me one.',
        textEn: '- I filled out a form, and they sent me one.',
        textEs: '- Llené un formulario y me enviaron una.',
      },
    ],
    options: [
      { id: 'opt-fill-out', text: 'fill out', textEs: 'llenar', isCorrect: false },
      { id: 'opt-filled-out', text: 'filled out', textEs: 'llené', isCorrect: true },
      { id: 'opt-am-filling', text: 'am filling', textEs: 'estoy llenando', isCorrect: false },
      { id: 'opt-filling-out', text: 'filling out', textEs: 'llenando', isCorrect: false },
    ],
    correctAnswerId: 'opt-filled-out',
    explanationEn: "'Filled out' is the regular past simple form of 'fill out'.",
    explanationEs: "'Filled out' es la forma regular en pasado simple de 'fill out' (completar o llenar un formulario).",
  },

  /* Actividad 5 (actividad 5) */
  {
    id: 'activity-5',
    number: 5,
    type: 'cloze',
    title: 'Actividad 5',
    titleEs: 'Actividad 5',
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    dialogueLines: [
      {
        textEn: '- Gene, did you go to the post office?',
        textEs: '- Gene, ¿fuiste a la oficina de correos?',
      },
      {
        hasBlank: true,
        prefix: '- Yes. I',
        suffix: 'your letter.',
        textEn: '- Yes. I mailed your letter.',
        textEs: '- Sí. Envié por correo tu carta.',
      },
      {
        textEn: "- No, you didn't. It's still on my desk!",
        textEs: '- ¡No, no lo hiciste. Todavía está en mi escritorio!',
      },
    ],
    options: [
      { id: 'opt-mail', text: 'mail', textEs: 'enviar por correo', isCorrect: false },
      { id: 'opt-mailing', text: 'mailing', textEs: 'enviando por correo', isCorrect: false },
      { id: 'opt-mails', text: 'mails', textEs: 'envía por correo', isCorrect: false },
      { id: 'opt-mailed', text: 'mailed', textEs: 'envié por correo', isCorrect: true },
    ],
    correctAnswerId: 'opt-mailed',
    explanationEn: "'Mailed' is the regular past simple form of 'mail' (add -ed).",
    explanationEs: "'Mailed' es la forma regular en pasado simple de 'mail' (se añade -ed).",
  },

  /* Actividad 6 (actividad 6) */
  {
    id: 'activity-6',
    number: 6,
    type: 'cloze',
    title: 'Actividad 6',
    titleEs: 'Actividad 6',
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    dialogueLines: [
      {
        textEn: '- Are you from the South?',
        textEs: '- ¿Eres del Sur?',
      },
      {
        hasBlank: true,
        prefix: "- No, I'm from Philadelphia, but I",
        suffix: 'in the South many years ago.',
        textEn: "- No, I'm from Philadelphia, but I lived in the South many years ago.",
        textEs: '- No, soy de Filadelfia, pero viví en el Sur hace muchos años.',
      },
    ],
    options: [
      { id: 'opt-living', text: 'living', textEs: 'viviendo', isCorrect: false },
      { id: 'opt-lived', text: 'lived', textEs: 'viví', isCorrect: true },
      { id: 'opt-live', text: 'live', textEs: 'vivo', isCorrect: false },
      { id: 'opt-lives', text: 'lives', textEs: 'vive', isCorrect: false },
    ],
    correctAnswerId: 'opt-lived',
    explanationEn: "'Lived' is the past simple of 'live' (verbs ending in -e simply add -d).",
    explanationEs: "'Lived' es el pasado simple de 'live' (los verbos terminados en -e solo agregan -d).",
  },

  /* Actividad 7 (actividad 7) */
  {
    id: 'activity-7',
    number: 7,
    type: 'cloze',
    title: 'Actividad 7',
    titleEs: 'Actividad 7',
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    dialogueLines: [
      {
        hasBlank: true,
        prefix: "Victoria Masterson's new movie is terrific. We",
        suffix: 'every minute of it!',
        textEn: "Victoria Masterson's new movie is terrific. We enjoyed every minute of it!",
        textEs: 'La nueva película de Victoria Masterson es estupenda. ¡Disfrutamos cada minuto de ella!',
      },
    ],
    options: [
      { id: 'opt-enjoyed', text: 'enjoyed', textEs: 'disfrutamos', isCorrect: true },
      { id: 'opt-enjoys', text: 'enjoys', textEs: 'disfruta', isCorrect: false },
      { id: 'opt-enjoy', text: 'enjoy', textEs: 'disfrutar', isCorrect: false },
      { id: 'opt-enjoying', text: 'enjoying', textEs: 'disfrutando', isCorrect: false },
    ],
    correctAnswerId: 'opt-enjoyed',
    explanationEn: "Use regular past simple 'enjoyed' for actions completed in the past.",
    explanationEs: "Usa el pasado simple regular 'enjoyed' (disfrutamos) para acciones terminadas en el pasado.",
  },

  /* Actividad 8 (actividad 8) */
  {
    id: 'activity-8',
    number: 8,
    type: 'cloze',
    title: 'Actividad 8',
    titleEs: 'Actividad 8',
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    dialogueLines: [
      {
        textEn: '- Your new furniture is beautiful. How did you pay for it?',
        textEs: '- Tus muebles nuevos son hermosos. ¿Cómo los pagaste?',
      },
      {
        hasBlank: true,
        prefix: '- I',
        suffix: 'it.',
        textEn: '- I charged it.',
        textEs: '- Lo cargué a mi tarjeta.',
      },
    ],
    options: [
      { id: 'opt-charges', text: 'charges', textEs: 'carga', isCorrect: false },
      { id: 'opt-charge', text: 'charge', textEs: 'cargar', isCorrect: false },
      { id: 'opt-charging', text: 'charging', textEs: 'cargando', isCorrect: false },
      { id: 'opt-charged', text: 'charged', textEs: 'cargué', isCorrect: true },
    ],
    correctAnswerId: 'opt-charged',
    explanationEn: "'Charged' is the regular past simple form of 'charge'.",
    explanationEs: "'Charged' es la forma regular en pasado simple de 'charge' (cargar a cuenta/tarjeta).",
  },

  /* Actividad 9 (actividad 9) */
  {
    id: 'activity-9',
    number: 9,
    type: 'cloze',
    title: 'Actividad 9',
    titleEs: 'Actividad 9',
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    dialogueLines: [
      {
        hasBlank: true,
        prefix: "I'm really angry. I paid $1000, but they",
        suffix: 'car!',
        textEn: "I'm really angry. I paid $1000, but they didn't repair car!",
        textEs: 'Estoy realmente enojado. Pagué $1000, pero ¡no repararon el auto!',
      },
    ],
    options: [
      { id: 'opt-didnt-repair', text: "didn't repair", textEs: 'no repararon', isCorrect: true },
      { id: 'opt-doesnt-repair', text: "doesn't repair", textEs: 'no repara', isCorrect: false },
      { id: 'opt-dont-repair', text: "don't repair", textEs: 'no reparan', isCorrect: false },
      { id: 'opt-arent-repaired', text: "aren't repaired", textEs: 'no son reparados', isCorrect: false },
    ],
    correctAnswerId: 'opt-didnt-repair',
    explanationEn: "In the past simple negative, use 'didn't' + base verb 'repair'.",
    explanationEs: "En pasado simple negativo, se usa 'didn't' + el verbo base 'repair'.",
  },

  /* Actividad 10 (actividad 10) */
  {
    id: 'activity-10',
    number: 10,
    type: 'cloze',
    title: 'Actividad 10',
    titleEs: 'Actividad 10',
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    dialogueLines: [
      {
        textEn: '- What did you get on the English test?',
        textEs: '- ¿Qué obtuviste en el examen de inglés?',
      },
      {
        hasBlank: true,
        prefix: '- I got a 95. I',
        suffix: '"English" right!',
        textEn: '- I got a 95. I didn\'t spell "English" right!',
        textEs: '- Saqué un 95. ¡No deletreé "English" correctamente!',
      },
    ],
    options: [
      { id: 'opt-have-to-spell', text: 'have to spell', textEs: 'tengo que deletrear', isCorrect: false },
      { id: 'opt-dont-spell', text: "don't spell", textEs: 'no deletreo', isCorrect: false },
      { id: 'opt-cant-spell', text: "can't spell", textEs: 'no puedo deletrear', isCorrect: false },
      { id: 'opt-didnt-spell', text: "didn't spell", textEs: 'no deletreé', isCorrect: true },
    ],
    correctAnswerId: 'opt-didnt-spell',
    explanationEn: "Use 'didn't spell' for negative past simple (didn't + base verb).",
    explanationEs: "Usa 'didn't spell' para el pasado simple negativo (didn't + verbo base).",
  },

  /* Actividad 11 (actividad 11) */
  {
    id: 'activity-11',
    number: 11,
    type: 'cloze',
    title: 'Actividad 11',
    titleEs: 'Actividad 11',
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    dialogueLines: [
      {
        textEn: '- It took me three hours to get my luggage at the airport.',
        textEs: '- Me tomó tres horas recoger mi equipaje en el aeropuerto.',
      },
      {
        hasBlank: true,
        prefix: '- Really? I',
        suffix: 'at all.',
        textEn: "- Really? I didn't wait at all.",
        textEs: '- ¿De verdad? Yo no esperé nada.',
      },
    ],
    options: [
      { id: 'opt-dont-wait', text: "don't wait", textEs: 'no espero', isCorrect: false },
      { id: 'opt-am-not-waiting', text: 'am not waiting', textEs: 'no estoy esperando', isCorrect: false },
      { id: 'opt-didnt-wait', text: "didn't wait", textEs: 'no esperé', isCorrect: true },
      { id: 'opt-not-waited', text: 'not waited', textEs: 'no esperado', isCorrect: false },
    ],
    correctAnswerId: 'opt-didnt-wait',
    explanationEn: "'Didn't wait' is the negative past simple form of 'wait'.",
    explanationEs: "'Didn't wait' es la forma negativa en pasado simple de 'wait' (esperar).",
  },
];

export const PAST_SIMPLE_REGULAR_TESTS: PastSimpleRegularTestItem[] = [
  /* Test 1 (test 1) */
  {
    id: 'test-1',
    testNumber: 1,
    title: 'Test 1',
    titleEs: 'Evaluación 1 de 5',
    dialogueLines: [
      {
        textEn: "- Did you have fun at Sari's party?",
        textEs: '- ¿Te divertiste en la fiesta de Sari?',
      },
      {
        hasBlank: true,
        prefix: "- Yes, but I'm so tired. We",
        suffix: 'for four hours!',
        textEn: "- Yes, but I'm so tired. We danced for four hours!",
        textEs: '- Sí, pero estoy tan cansado. ¡Bailamos durante cuatro horas!',
      },
    ],
    options: [
      { id: 'test-opt-dances', text: 'dances', textEs: 'baila', isCorrect: false },
      { id: 'test-opt-dance', text: 'dance', textEs: 'bailar', isCorrect: false },
      { id: 'test-opt-danced', text: 'danced', textEs: 'bailamos', isCorrect: true },
      { id: 'test-opt-dancing', text: 'dancing', textEs: 'bailando', isCorrect: false },
    ],
    correctAnswerId: 'test-opt-danced',
    explanationEn: "'Danced' is the regular past simple form of 'dance'.",
    explanationEs: "'Danced' es el pasado simple regular de 'dance' (bailar).",
  },

  /* Test 2 (test 2) */
  {
    id: 'test-2',
    testNumber: 2,
    title: 'Test 2',
    titleEs: 'Evaluación 2 de 5',
    dialogueLines: [
      {
        textEn: '- Why are you so tired, Renee?',
        textEs: '- ¿Por qué estás tan cansada, Renee?',
      },
      {
        hasBlank: true,
        prefix: '- I',
        suffix: 'my TV to the repair shop.',
        textEn: '- I carried my TV to the repair shop.',
        textEs: '- Llevé cargando mi televisor al taller de reparación.',
      },
    ],
    options: [
      { id: 'test-opt-carried', text: 'carried', textEs: 'llevé cargando', isCorrect: true },
      { id: 'test-opt-carry', text: 'carry', textEs: 'llevar', isCorrect: false },
      { id: 'test-opt-carries', text: 'carries', textEs: 'lleva', isCorrect: false },
      { id: 'test-opt-carrying', text: 'carrying', textEs: 'llevando', isCorrect: false },
    ],
    correctAnswerId: 'test-opt-carried',
    explanationEn: "Verbs ending in consonant + y change y to i and add -ed: carry -> carried.",
    explanationEs: "Los verbos que terminan en consonante + 'y' cambian la 'y' por 'i' y añaden -ed: carry -> carried.",
  },

  /* Test 3 (test 3) */
  {
    id: 'test-3',
    testNumber: 3,
    title: 'Test 3',
    titleEs: 'Evaluación 3 de 5',
    dialogueLines: [
      {
        textEn: "- Mom, can I go to Lara's?",
        textEs: '- Mamá, ¿puedo ir a casa de Lara?',
      },
      {
        textEn: '- After you do your homework.',
        textEs: '- Después de que hagas tu tarea.',
      },
      {
        hasBlank: true,
        prefix: '- But I',
        suffix: 'my homework an hour ago.',
        textEn: '- But I finished my homework an hour ago.',
        textEs: '- Pero terminé mi tarea hace una hora.',
      },
    ],
    options: [
      { id: 'test-opt-am-finishing', text: 'am finishing', textEs: 'estoy terminando', isCorrect: false },
      { id: 'test-opt-finish', text: 'finish', textEs: 'terminar', isCorrect: false },
      { id: 'test-opt-finished', text: 'finished', textEs: 'terminé', isCorrect: true },
      { id: 'test-opt-finishes', text: 'finishes', textEs: 'termina', isCorrect: false },
    ],
    correctAnswerId: 'test-opt-finished',
    explanationEn: "'Finished' is the regular past simple form (finish + ed).",
    explanationEs: "'Finished' es el pasado simple regular de 'finish' (terminar).",
  },

  /* Test 4 (test 4) */
  {
    id: 'test-4',
    testNumber: 4,
    title: 'Test 4',
    titleEs: 'Evaluación 4 de 5',
    dialogueLines: [
      {
        hasBlank: true,
        prefix: "I don't understand the homework because I",
        suffix: 'in class.',
        textEn: "I don't understand the homework because I didn't listen in class.",
        textEs: 'No entiendo la tarea porque no escuché en clase.',
      },
    ],
    options: [
      { id: 'test-opt-didnt-listen', text: "didn't listen", textEs: 'no escuché', isCorrect: true },
      { id: 'test-opt-listened', text: 'listened', textEs: 'escuché', isCorrect: false },
      { id: 'test-opt-am-listening', text: 'am listening', textEs: 'estoy escuchando', isCorrect: false },
      { id: 'test-opt-did-listen', text: 'did listen', textEs: 'sí escuché', isCorrect: false },
    ],
    correctAnswerId: 'test-opt-didnt-listen',
    explanationEn: "Negative past simple is formed with 'didn't' + base verb 'listen'.",
    explanationEs: "El pasado simple negativo se forma con 'didn't' + verbo base 'listen'.",
  },

  /* Test 5 (test 5) */
  {
    id: 'test-5',
    testNumber: 5,
    title: 'Test 5',
    titleEs: 'Evaluación 5 de 5',
    dialogueLines: [
      {
        textEn: '- "Midnight Mystery" on TV was great last night. Did you watch it?',
        textEs: '- "Midnight Mystery" en la televisión estuvo genial anoche. ¿La viste?',
      },
      {
        hasBlank: true,
        prefix: '- No. I',
        suffix: 'TV last night.',
        textEn: '- No. I didn\'t watch TV last night.',
        textEs: '- No. No vi la televisión anoche.',
      },
    ],
    options: [
      { id: 'test-opt-didnt-watch', text: "didn't watch", textEs: 'no vi', isCorrect: true },
      { id: 'test-opt-watched', text: 'watched', textEs: 'vi', isCorrect: false },
      { id: 'test-opt-dont-watch', text: "don't watch", textEs: 'no veo', isCorrect: false },
      { id: 'test-opt-wasnt-watched', text: "wasn't watched", textEs: 'no fue visto', isCorrect: false },
    ],
    correctAnswerId: 'test-opt-didnt-watch',
    explanationEn: "Use 'didn't' + base verb 'watch' for the negative past simple.",
    explanationEs: "Usa 'didn't' + el verbo base 'watch' para el pasado simple negativo.",
  },
];
