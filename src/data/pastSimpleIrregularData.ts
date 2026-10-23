import pastIrregularOfficeImg from '../assets/images/past_irregular_office.png';
import pastIrregularDoctorImg from '../assets/images/past_irregular_doctor.png';
import pastIrregularColleaguesImg from '../assets/images/past_irregular_colleagues.png';
import pastIrregularLookingJimImg from '../assets/images/past_irregular_looking_jim.png';

export {
  pastIrregularOfficeImg,
  pastIrregularDoctorImg,
  pastIrregularColleaguesImg,
  pastIrregularLookingJimImg,
};

export interface PastSimpleIrregularDialogueLine {
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

export interface PastSimpleIrregularExerciseItem {
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
    prefix?: string;
    suffix?: string;
  }[];
  options?: DragDropOption[];
  correctAnswerId?: string;
  explanationEn?: string;
  explanationEs?: string;
}

export interface PastSimpleIrregularTestItem {
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
    prefix?: string;
    suffix?: string;
  }[];
  options: DragDropOption[];
  correctAnswerId: string;
  explanationEn: string;
  explanationEs: string;
}

export const PAST_SIMPLE_IRREGULAR_REFERENCE = {
  dialogue: [
    {
      speaker: '',
      textEn: '- Hey, Where did David go?',
      textEs: '- Oye, ¿adónde fue David?',
      highlights: ['did', 'go'],
    },
    {
      speaker: '',
      textEn: '- Oh, he left early because he had a headache and he gave me all his work!',
      textEs: '- ¡Oh, se fue temprano porque tenía dolor de cabeza y me dio todo su trabajo!',
      highlights: ['left', 'had', 'gave'],
    },
  ],
  audioText: "Hey, Where did David go? Oh, he left early because he had a headache and he gave me all his work!",
  durationSeconds: 10,
};

export const PAST_SIMPLE_IRREGULAR_ACTIVITIES: PastSimpleIrregularExerciseItem[] = [
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
        textEn: '- Hey, Where did David go?',
        textEs: '- Oye, ¿adónde fue David?',
      },
      {
        textEn: '- Oh, he left early because he had a headache and he gave me all his work!',
        textEs: '- ¡Oh, se fue temprano porque le dolía la cabeza y me dio todo su trabajo!',
      },
    ],
  },

  /* Actividad 2 */
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
        textEn: "- Hey, where's Harry Holmes?",
        textEs: '- Oye, ¿dónde está Harry Holmes?',
      },
      {
        hasBlank: true,
        prefix: "- He's in the hospital. He",
        suffix: 'his leg last week.',
        textEn: "- He's in the hospital. He broke his leg last week.",
        textEs: '- Está en el hospital. Se fracturó la pierna la semana pasada.',
      },
    ],
    options: [
      { id: 'opt-broken', text: 'broken', textEs: 'roto / fracturado (participio)', isCorrect: false },
      { id: 'opt-braked', text: 'braked', textEs: 'frenó (verbo brake)', isCorrect: false },
      { id: 'opt-break', text: 'break', textEs: 'romper / fracturar (presente)', isCorrect: false },
      { id: 'opt-broke', text: 'broke', textEs: 'se fracturó / rompió (pasado simple)', isCorrect: true },
    ],
    correctAnswerId: 'opt-broke',
    explanationEn: '"broke" is the irregular past tense of "break". We say "He broke his leg last week".',
    explanationEs: '"broke" es el pasado simple irregular del verbo "break" (romper/fracturar). Se usa "He broke his leg last week" para indicar una acción completada en el pasado.',
  },

  /* Actividad 3 */
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
        textEn: "- I'm hungry! What did you bring to eat?",
        textEs: '- ¡Tengo hambre! ¿Qué trajiste para comer?',
      },
      {
        hasBlank: true,
        prefix: '- I',
        suffix: 'some pizza and two cans of soda.',
        textEn: '- I brought some pizza and two cans of soda.',
        textEs: '- Traje pizza y dos latas de refresco.',
      },
    ],
    options: [
      { id: 'opt-bring', text: 'bring', textEs: 'traer (presente)', isCorrect: false },
      { id: 'opt-brought', text: 'brought', textEs: 'traje / trajo (pasado simple)', isCorrect: true },
      { id: 'opt-bringing', text: 'bringing', textEs: 'trayendo (gerundio)', isCorrect: false },
      { id: 'opt-brings', text: 'brings', textEs: 'trae (3ª persona singular)', isCorrect: false },
    ],
    correctAnswerId: 'opt-brought',
    explanationEn: '"brought" is the irregular past tense of "bring".',
    explanationEs: '"brought" es el pasado simple irregular del verbo "bring" (traer). En respuesta a "¿What did you bring...?", contestamos en pasado simple: "I brought...".',
  },

  /* Actividad 4 */
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
        hasBlank: true,
        prefix: 'Everyone was angry because I',
        suffix: 'the ball, and we lost the game.',
        textEn: "Everyone was angry because I didn't catch the ball, and we lost the game.",
        textEs: 'Todos estaban enojados porque no atrapé la pelota y perdimos el juego.',
      },
    ],
    options: [
      { id: 'opt-am-not-catching', text: 'am not catching', textEs: 'no estoy atrapando', isCorrect: false },
      { id: 'opt-didnt-catch', text: "didn't catch", textEs: 'no atrapé (pasado negativo)', isCorrect: true },
      { id: 'opt-dont-catch', text: "don't catch", textEs: 'no atrapo (presente)', isCorrect: false },
      { id: 'opt-caught', text: 'caught', textEs: 'atrapé (afirmativo)', isCorrect: false },
    ],
    correctAnswerId: 'opt-didnt-catch',
    explanationEn: 'In past simple negative statements, we use "didn\'t" + base form ("didn\'t catch"). Because the ball wasn\'t caught, the game was lost.',
    explanationEs: 'Para oraciones negativas en pasado simple se utiliza el auxiliar "didn\'t" seguido del verbo en su forma base ("didn\'t catch"). El contexto indica que por no atrapar el balón, perdieron el partido.',
  },

  /* Actividad 5 */
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
        textEn: '- Which cat did you choose?',
        textEs: '- ¿Qué gato elegiste?',
      },
      {
        hasBlank: true,
        prefix: '- I',
        suffix: 'that gray one.',
        textEn: '- I chose that gray one.',
        textEs: '- Elegí ese gris.',
      },
    ],
    options: [
      { id: 'opt-did-choose', text: 'did choose', textEs: 'sí elegí (enfático)', isCorrect: false },
      { id: 'opt-choosing', text: 'choosing', textEs: 'eligiendo', isCorrect: false },
      { id: 'opt-chose', text: 'chose', textEs: 'elegí / escogí (pasado simple)', isCorrect: true },
      { id: 'opt-choose', text: 'choose', textEs: 'elegir (presente)', isCorrect: false },
    ],
    correctAnswerId: 'opt-chose',
    explanationEn: '"chose" is the irregular past tense of "choose". In affirmative past sentences, use the irregular past form.',
    explanationEs: '"chose" es el pasado simple irregular del verbo "choose" (elegir/escoger). Para la afirmación en pasado usamos "I chose that gray one".',
  },

  /* Actividad 6 */
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
        textEn: '- What was that loud noise, Tommy?',
        textEs: '- ¿Qué fue ese ruido tan fuerte, Tommy?',
      },
      {
        hasBlank: true,
        prefix: '- I',
        suffix: 'anything, Mom!',
        textEn: "- I didn't do anything, Mom!",
        textEs: '- ¡Yo no hice nada, mamá!',
      },
    ],
    options: [
      { id: 'opt-didnt', text: "didn't", textEs: 'no (falta el verbo principal)', isCorrect: false },
      { id: 'opt-cant-do', text: "can't do", textEs: 'no puedo hacer', isCorrect: false },
      { id: 'opt-didnt-do', text: "didn't do", textEs: 'no hice (didn\'t + do)', isCorrect: true },
      { id: 'opt-not-do', text: 'not do', textEs: 'no hacer (incorrecto gramaticalmente)', isCorrect: false },
    ],
    correctAnswerId: 'opt-didnt-do',
    explanationEn: 'In past simple negative sentences, the auxiliary "didn\'t" must be accompanied by the main verb in base form: "didn\'t do".',
    explanationEs: 'En las oraciones negativas en pasado simple, el auxiliar "didn\'t" requiere el verbo principal en forma base: "didn\'t do" (no hice).',
  },

  /* Actividad 7 */
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
        textEn: "- What's wrong?",
        textEs: '- ¿Qué te pasa? / ¿Qué anda mal?',
      },
      {
        hasBlank: true,
        prefix: '- I',
        suffix: 'too much!',
        textEn: '- I ate too much!',
        textEs: '- ¡Comí demasiado!',
      },
    ],
    options: [
      { id: 'opt-eaten', text: 'eaten', textEs: 'comido (participio)', isCorrect: false },
      { id: 'opt-eats', text: 'eats', textEs: 'come (presente 3ª persona)', isCorrect: false },
      { id: 'opt-did-eat', text: 'did eat', textEs: 'sí comí (forma enfática)', isCorrect: false },
      { id: 'opt-ate', text: 'ate', textEs: 'comí (pasado simple irregular)', isCorrect: true },
    ],
    correctAnswerId: 'opt-ate',
    explanationEn: '"ate" is the irregular past tense of "eat". We say "I ate too much!".',
    explanationEs: '"ate" es el pasado simple irregular del verbo "eat" (comer). Se usa para expresar la acción concluida: "I ate too much!" (¡Comí demasiado!).',
  },

  /* Actividad 8 */
  {
    id: 'activity-8',
    number: 8,
    type: 'cloze',
    title: 'Actividad 8',
    titleEs: 'Actividad 8',
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    illustrationUrl: pastIrregularDoctorImg,
    dialogueLines: [
      {
        textEn: '- Tell me what happened.',
        textEs: '- Cuéntame qué sucedió.',
      },
      {
        hasBlank: true,
        prefix: '- I',
        suffix: 'yesterday and hurt my ankle.',
        textEn: '- I fell yesterday and hurt my ankle.',
        textEs: '- Ayer me caí y me lastimé el tobillo.',
      },
    ],
    options: [
      { id: 'opt-felt', text: 'felt', textEs: 'sentí (pasado de feel)', isCorrect: false },
      { id: 'opt-did-fall', text: 'did fall', textEs: 'sí caí (forma enfática)', isCorrect: false },
      { id: 'opt-feel', text: 'feel', textEs: 'sentir (presente)', isCorrect: false },
      { id: 'opt-fell', text: 'fell', textEs: 'me caí (pasado de fall)', isCorrect: true },
    ],
    correctAnswerId: 'opt-fell',
    explanationEn: '"fell" is the irregular past tense of "fall" (to fall down). Do not confuse it with "felt" (past of feel).',
    explanationEs: '"fell" es el pasado simple irregular del verbo "fall" (caerse). No debe confundirse con "felt" (pasado de feel, sentir).',
  },

  /* Actividad 9 */
  {
    id: 'activity-9',
    number: 9,
    type: 'cloze',
    title: 'Actividad 9',
    titleEs: 'Actividad 9',
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    illustrationUrl: pastIrregularColleaguesImg,
    dialogueLines: [
      {
        hasBlank: true,
        prefix: '- Ted, meet Bob and Janet. They',
        suffix: 'in yesterday from New York.',
        textEn: '- Ted, meet Bob and Janet. They flew in yesterday from New York.',
        textEs: '- Ted, te presento a Bob y Janet. Llegaron en avión ayer desde Nueva York.',
      },
      {
        textEn: '- Hello. Nice to meet you.',
        textEs: '- Hola. Encantado de conocerlos.',
      },
    ],
    options: [
      { id: 'opt-did-fly', text: 'did fly', textEs: 'sí volaron (enfático)', isCorrect: false },
      { id: 'opt-didnt-fly', text: "didn't fly", textEs: 'no volaron', isCorrect: false },
      { id: 'opt-was-flying', text: 'was flying', textEs: 'estaba volando (singular)', isCorrect: false },
      { id: 'opt-flew', text: 'flew', textEs: 'volaron / llegaron en avión (pasado)', isCorrect: true },
    ],
    correctAnswerId: 'opt-flew',
    explanationEn: '"flew" is the irregular past tense of "fly". "They flew in yesterday" means they arrived by plane.',
    explanationEs: '"flew" es el pasado simple irregular de "fly" (volar). La expresión "They flew in yesterday" significa que llegaron en avión ayer.',
  },

  /* Actividad 10 */
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
        textEn: "- Oh, I'm so tired!",
        textEs: '- ¡Oh, estoy tan cansado!',
      },
      {
        textEn: '- Why?',
        textEs: '- ¿Por qué?',
      },
      {
        hasBlank: true,
        prefix: '- I studied until late last night. I',
        suffix: 'a test today.',
        textEn: '- I studied until late last night. I had a test today.',
        textEs: '- Estudié hasta tarde anoche. Tuve un examen hoy.',
      },
    ],
    options: [
      { id: 'opt-had', text: 'had', textEs: 'tuve (pasado irregular de have)', isCorrect: true },
      { id: 'opt-didnt-have', text: "didn't have", textEs: 'no tuve', isCorrect: false },
      { id: 'opt-did-have', text: 'did have', textEs: 'sí tuve (enfático)', isCorrect: false },
      { id: 'opt-has', text: 'has', textEs: 'tiene (presente 3ª persona)', isCorrect: false },
    ],
    correctAnswerId: 'opt-had',
    explanationEn: '"had" is the irregular past tense of "have". The speaker says they studied late because they had an exam.',
    explanationEs: '"had" es el pasado simple irregular del verbo "have" (tener). Explica la razón del cansancio: estudió hasta tarde porque tuvo un examen.',
  },

  /* Actividad 11 */
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
        textEn: "- I'm working for Ron Perez now.",
        textEs: '- Ahora estoy trabajando para Ron Perez.',
      },
      {
        hasBlank: true,
        prefix: '- I',
        suffix: "him many years ago. He has a computer company, doesn't he?",
        textEn: "- I knew him many years ago. He has a computer company, doesn't he?",
        textEs: '- Lo conocí hace muchos años. Tiene una empresa de computación, ¿verdad?',
      },
      {
        textEn: '- Yes, he does.',
        textEs: '- Sí, así es.',
      },
    ],
    options: [
      { id: 'opt-may-know', text: 'may know', textEs: 'podría conocer (modal)', isCorrect: false },
      { id: 'opt-did-know', text: 'did know', textEs: 'sí conocía (enfático)', isCorrect: false },
      { id: 'opt-knew', text: 'knew', textEs: 'conocí / conocía (pasado simple)', isCorrect: true },
      { id: 'opt-knows', text: 'knows', textEs: 'conoce (presente)', isCorrect: false },
    ],
    correctAnswerId: 'opt-knew',
    explanationEn: '"knew" is the irregular past tense of "know". The time marker "many years ago" indicates past simple.',
    explanationEs: '"knew" es el pasado simple irregular del verbo "know" (conocer/saber). La expresión temporal "many years ago" exige el uso del pasado simple.',
  },
];

export const PAST_SIMPLE_IRREGULAR_TESTS: PastSimpleIrregularTestItem[] = [
  /* Test 1 */
  {
    id: 'test-1',
    testNumber: 1,
    title: 'Test 1',
    titleEs: 'Evaluación 1 de 5',
    dialogueLines: [
      {
        hasBlank: true,
        prefix: '- Hi, Sue. I went shopping today. I',
        suffix: 'some beautiful clothes!',
        textEn: '- Hi, Sue. I went shopping today. I bought some beautiful clothes!',
        textEs: '- Hola, Sue. Fui de compras hoy. ¡Compré ropa hermosa!',
      },
      {
        textEn: '- Can I see them?',
        textEs: '- ¿Puedo verla?',
      },
    ],
    options: [
      { id: 't1-didnt-buy', text: "didn't buy", textEs: 'no compré', isCorrect: false },
      { id: 't1-buying', text: 'buying', textEs: 'comprando (gerundio)', isCorrect: false },
      { id: 't1-buys', text: 'buys', textEs: 'compra (presente)', isCorrect: false },
      { id: 't1-bought', text: 'bought', textEs: 'compré (pasado irregular de buy)', isCorrect: true },
    ],
    correctAnswerId: 't1-bought',
    explanationEn: '"bought" is the irregular past tense of "buy". ("I went shopping... I bought some beautiful clothes!").',
    explanationEs: '"bought" es el pasado simple irregular de "buy" (comprar). La oración indica: "Fui de compras hoy. ¡Compré ropa hermosa!".',
  },

  /* Test 2 */
  {
    id: 'test-2',
    testNumber: 2,
    title: 'Test 2',
    titleEs: 'Evaluación 2 de 5',
    illustrationUrl: pastIrregularLookingJimImg,
    dialogueLines: [
      {
        textEn: "- Where's Jim?",
        textEs: '- ¿Dónde está Jim?',
      },
      {
        hasBlank: true,
        prefix: "- I don't know. I looked for him, but I",
        suffix: 'him.',
        textEn: "- I don't know. I looked for him, but I didn't find him.",
        textEs: '- No lo sé. Lo busqué, pero no lo encontré.',
      },
    ],
    options: [
      { id: 't2-not-find', text: 'not find', textEs: 'no encontrar (gramática incorrecta)', isCorrect: false },
      { id: 't2-not-found', text: 'not found', textEs: 'no encontrado', isCorrect: false },
      { id: 't2-wasnt-found', text: "wasn't found", textEs: 'no fue encontrado (voz pasiva)', isCorrect: false },
      { id: 't2-didnt-find', text: "didn't find", textEs: 'no encontré (didn\'t + find)', isCorrect: true },
    ],
    correctAnswerId: 't2-didnt-find',
    explanationEn: 'In past simple negative sentences, we use "didn\'t" + base form of the verb ("didn\'t find").',
    explanationEs: 'Para negar en pasado simple se usa la estructura "didn\'t" + verbo en infinitivo/forma base ("didn\'t find": no encontré).',
  },

  /* Test 3 */
  {
    id: 'test-3',
    testNumber: 3,
    title: 'Test 3',
    titleEs: 'Evaluación 3 de 5',
    dialogueLines: [
      {
        textEn: "- Hi. I'm back from the store.",
        textEs: '- Hola. Ya regresé de la tienda.',
      },
      {
        textEn: '- Did you buy ketchup?',
        textEs: '- ¿Compraste salsa de tomate?',
      },
      {
        hasBlank: true,
        prefix: '- Oh, no! I',
        suffix: '!',
        textEn: '- Oh, no! I forgot !',
        textEs: '- ¡Oh, no! ¡Lo olvidé!',
      },
    ],
    options: [
      { id: 't3-forgets', text: 'forgets', textEs: 'olvida (presente 3ª persona)', isCorrect: false },
      { id: 't3-forgetting', text: 'forgetting', textEs: 'olvidando (gerundio)', isCorrect: false },
      { id: 't3-forgot', text: 'forgot', textEs: 'olvidé (pasado irregular de forget)', isCorrect: true },
      { id: 't3-forget', text: 'forget', textEs: 'olvidar (forma base)', isCorrect: false },
    ],
    correctAnswerId: 't3-forgot',
    explanationEn: '"forgot" is the irregular past tense of "forget". The speaker forgot to purchase the ketchup while at the store.',
    explanationEs: '"forgot" es el pasado simple irregular del verbo "forget" (olvidar). El hablante lamenta haberlo olvidado: "Oh, no! I forgot!".',
  },

  /* Test 4 */
  {
    id: 'test-4',
    testNumber: 4,
    title: 'Test 4',
    titleEs: 'Evaluación 4 de 5',
    dialogueLines: [
      {
        textEn: '- I was late for work today. I woke up at 11:00 A.M.!',
        textEs: '- Llegué tarde al trabajo hoy. ¡Me desperté a las 11:00 de la mañana!',
      },
      {
        textEn: "- Don't you have an alarm clock?",
        textEs: '- ¿No tienes un despertador?',
      },
      {
        hasBlank: true,
        prefix: '- Yes, I do, but I',
        suffix: 'it.',
        textEn: "- Yes, I do, but I didn't hear it.",
        textEs: '- Sí tengo, pero no lo escuché.',
      },
    ],
    options: [
      { id: 't4-didnt-hear', text: "didn't hear", textEs: 'no escuché (didn\'t + hear)', isCorrect: true },
      { id: 't4-not-heard', text: 'not heard', textEs: 'no oído', isCorrect: false },
      { id: 't4-wasnt-heard', text: "wasn't heard", textEs: 'no fue oído', isCorrect: false },
      { id: 't4-not-hear', text: 'not hear', textEs: 'no escuchar', isCorrect: false },
    ],
    correctAnswerId: 't4-didnt-hear',
    explanationEn: 'The past simple negative uses "didn\'t" + base form: "didn\'t hear it".',
    explanationEs: 'La negación en pasado simple requiere "didn\'t" + verbo en forma base: "didn\'t hear it" (no lo escuché).',
  },

  /* Test 5 */
  {
    id: 'test-5',
    testNumber: 5,
    title: 'Test 5',
    titleEs: 'Evaluación 5 de 5',
    dialogueLines: [
      {
        textEn: "- Where's Mr. Meron?",
        textEs: '- ¿Dónde está el Sr. Meron?',
      },
      {
        textEn: '- He went home.',
        textEs: '- Se fue a casa.',
      },
      {
        hasBlank: true,
        prefix: "- No, he didn't. He",
        suffix: ". He's still here.",
        textEn: "- No, he didn't. He didn't leave . He's still here.",
        textEs: '- No, no se fue. No se marchó. Todavía está aquí.',
      },
    ],
    options: [
      { id: 't5-doesnt-leave', text: "doesn't leave", textEs: 'no se va (presente)', isCorrect: false },
      { id: 't5-wasnt-left', text: "wasn't left", textEs: 'no fue dejado (pasiva)', isCorrect: false },
      { id: 't5-didnt-lift', text: "didn't lift", textEs: 'no levantó (verbo lift)', isCorrect: false },
      { id: 't5-didnt-leave', text: "didn't leave", textEs: 'no se fue (didn\'t + leave)', isCorrect: true },
    ],
    correctAnswerId: 't5-didnt-leave',
    explanationEn: 'Past simple negative: "didn\'t leave" (didn\'t + base form "leave"). The other speaker corrects that Mr. Meron is still in the building.',
    explanationEs: 'Pasado simple negativo: "didn\'t leave" (didn\'t + forma base "leave"). El hablante corrige aclarando que no se marchó porque aún está aquí.',
  },
];
