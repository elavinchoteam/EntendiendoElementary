import tieImg from '../assets/images/good-morning/tie.png';
import factoryImg from '../assets/images/good-morning/factory.png';
import officeImg from '../assets/images/good-morning/office.png';
import meetingImg from '../assets/images/good-morning/meeting.png';
import goodMorningVideo from '../assets/video_good_morning.mp4';

export { tieImg, factoryImg, officeImg, meetingImg, goodMorningVideo };

export interface GoodMorningSentence {
  id: string;
  speaker: 'Father' | 'Daughter';
  en: string;
  es: string;
  startSec?: number;
  endSec?: number;
}

export const GOOD_MORNING_TRANSCRIPT: GoodMorningSentence[] = [
  {
    id: 's1',
    speaker: 'Father',
    en: 'Good Morning!',
    es: '¡Buenos días!',
    startSec: 0,
    endSec: 3,
  },
  {
    id: 's2',
    speaker: 'Daughter',
    en: 'Hi, Dad.',
    es: 'Hola, papá.',
    startSec: 3,
    endSec: 6,
  },
  {
    id: 's3',
    speaker: 'Father',
    en: "How's this tie? Is it OK?",
    es: '¿Cómo está esta corbata? ¿Está bien?',
    startSec: 6,
    endSec: 10,
  },
  {
    id: 's4',
    speaker: 'Daughter',
    en: "I guess so. I don't know. You should ask Mum.",
    es: 'Supongo que sí. No lo sé. Deberías preguntarle a mamá.',
    startSec: 10,
    endSec: 15,
  },
  {
    id: 's5',
    speaker: 'Father',
    en: 'Mum just left for work.',
    es: 'Mamá acaba de salir para el trabajo.',
    startSec: 15,
    endSec: 18,
  },
  {
    id: 's6',
    speaker: 'Daughter',
    en: "Well, it's fine I guess. Dad, are you going to the office today?",
    es: 'Bueno, está bien, supongo. Papá, ¿vas a la oficina hoy?',
    startSec: 18,
    endSec: 23,
  },
  {
    id: 's7',
    speaker: 'Father',
    en: 'I usually go to the office on Tuesdays, but today I have a big meeting at the factory. Why?',
    es: 'Por lo general voy a la oficina los martes, pero hoy tengo una gran reunión en la fábrica. ¿Por qué?',
    startSec: 23,
    endSec: 31,
  },
  {
    id: 's8',
    speaker: 'Daughter',
    en: 'Oh, I just wanted a lift to school.',
    es: 'Ah, solo quería que me llevaras a la escuela.',
    startSec: 31,
    endSec: 35,
  },
  {
    id: 's9',
    speaker: 'Father',
    en: 'I can still take you to school. What time is it?',
    es: 'Aún puedo llevarte a la escuela. ¿Qué hora es?',
    startSec: 35,
    endSec: 39,
  },
  {
    id: 's10',
    speaker: 'Daughter',
    en: "I don't know. About seven, maybe.",
    es: 'No lo sé. Cerca de las siete, tal vez.',
    startSec: 39,
    endSec: 43,
  },
  {
    id: 's11',
    speaker: 'Father',
    en: "OK. Come on. We don't want to be late.",
    es: 'Bien. Vamos. No queremos llegar tarde.',
    startSec: 43,
    endSec: 46,
  },
  {
    id: 's12',
    speaker: 'Daughter',
    en: 'Thanks, Dad.',
    es: 'Gracias, papá.',
    startSec: 46,
    endSec: 49,
  },
];

export const GOOD_MORNING_FULL_AUDIO_TEXT = GOOD_MORNING_TRANSCRIPT.map(
  (s) => `${s.speaker}: ${s.en}`
).join(' ');

/* =========================================================================
   ACTIVITY 2: MATCH THE WORDS TO THE IMAGES
   ========================================================================= */
export interface ImageMatchItem {
  id: string;
  word: string;
  wordEs: string;
  imageSrc: string;
}

export const GOOD_MORNING_IMAGE_MATCH_ITEMS: ImageMatchItem[] = [
  {
    id: 'match-1',
    word: 'a tie',
    wordEs: 'una corbata',
    imageSrc: tieImg,
  },
  {
    id: 'match-2',
    word: 'a factory',
    wordEs: 'una fábrica',
    imageSrc: factoryImg,
  },
  {
    id: 'match-3',
    word: 'an office',
    wordEs: 'una oficina',
    imageSrc: officeImg,
  },
  {
    id: 'match-4',
    word: 'a meeting',
    wordEs: 'una reunión',
    imageSrc: meetingImg,
  },
];

/* =========================================================================
   ACTIVITY 3: CONVERSATION CLOZE
   ========================================================================= */
export const GOOD_MORNING_CLOZE_DATA = {
  instructions: 'Complete the conversation. Drag the correct answers into place.',
  instructionsEs: 'Completa la conversación. Arrastra las respuestas correctas a su lugar.',
  tokens: [
    'late',
    'usually',
    'time',
    'seven',
    'a lift',
    'school',
    'office',
    'factory',
    'on',
  ],
  lines: [
    {
      id: 'c-l1',
      speaker: 'Daughter',
      prefix: 'Dad, are you going to the ',
      blankId: 'b-office',
      correctAnswer: 'office',
      suffix: ' today?',
      fullEn: 'Dad, are you going to the office today?',
      fullEs: 'Papá, ¿vas a la oficina hoy?',
    },
    {
      id: 'c-l2',
      speaker: 'Father',
      prefix: 'I ',
      blankId: 'b-usually',
      correctAnswer: 'usually',
      middle: ' go to the office on Tuesdays, but today I have a big meeting at the ',
      blankId2: 'b-factory',
      correctAnswer2: 'factory',
      suffix: '. Why?',
      fullEn:
        'I usually go to the office on Tuesdays, but today I have a big meeting at the factory. Why?',
      fullEs:
        'Por lo general voy a la oficina los martes, pero hoy tengo una gran reunión en la fábrica. ¿Por qué?',
    },
    {
      id: 'c-l3',
      speaker: 'Daughter',
      prefix: 'Oh, I just wanted ',
      blankId: 'b-lift',
      correctAnswer: 'a lift',
      suffix: ' to school.',
      fullEn: 'Oh, I just wanted a lift to school.',
      fullEs: 'Ah, solo quería que me llevaras a la escuela.',
    },
    {
      id: 'c-l4',
      speaker: 'Father',
      prefix: 'I can still take you to ',
      blankId: 'b-school',
      correctAnswer: 'school',
      middle: '. What ',
      blankId2: 'b-time',
      correctAnswer2: 'time',
      suffix: ' is it?',
      fullEn: 'I can still take you to school. What time is it?',
      fullEs: 'Aún puedo llevarte a la escuela. ¿Qué hora es?',
    },
    {
      id: 'c-l5',
      speaker: 'Daughter',
      prefix: "I don't know. About ",
      blankId: 'b-seven',
      correctAnswer: 'seven',
      suffix: ', maybe.',
      fullEn: "I don't know. About seven, maybe.",
      fullEs: 'No lo sé. Cerca de las siete, tal vez.',
    },
    {
      id: 'c-l6',
      speaker: 'Father',
      prefix: 'OK. Come ',
      blankId: 'b-on',
      correctAnswer: 'on',
      middle: ". We don't want to be ",
      blankId2: 'b-late',
      correctAnswer2: 'late',
      suffix: '.',
      fullEn: "OK. Come on. We don't want to be late.",
      fullEs: 'Bien. Vamos. No queremos llegar tarde.',
    },
  ],
};

/* =========================================================================
   ACTIVITY 5: TRUE / FALSE CLASSIFICATION TABLE
   ========================================================================= */
export interface TrueFalseStatementItem {
  id: string;
  statementEn: string;
  statementEs: string;
  isTrue: boolean;
}

export const GOOD_MORNING_TRUE_FALSE_STATEMENTS: TrueFalseStatementItem[] = [
  {
    id: 'tf-1',
    statementEn: 'The father usually goes to the office on Tuesdays.',
    statementEs: 'El padre usualmente va a la oficina los martes.',
    isTrue: true,
  },
  {
    id: 'tf-2',
    statementEn: 'The father is going to meet his wife.',
    statementEs: 'El padre se va a encontrar con su esposa.',
    isTrue: false,
  },
  {
    id: 'tf-3',
    statementEn: 'The father asks his daughter about his shirt.',
    statementEs: 'El padre le pregunta a su hija sobre su camisa.',
    isTrue: false,
  },
  {
    id: 'tf-4',
    statementEn: "It's about 7:00 in the morning.",
    statementEs: 'Son cerca de las 7:00 de la mañana.',
    isTrue: true,
  },
  {
    id: 'tf-5',
    statementEn: 'The father has a big meeting.',
    statementEs: 'El padre tiene una gran reunión.',
    isTrue: true,
  },
  {
    id: 'tf-6',
    statementEn: "The daughter loves her father's tie.",
    statementEs: 'A la hija le encanta la corbata de su padre.',
    isTrue: false,
  },
];

/* =========================================================================
   RADIO CHOICE ACTIVITIES (ACTIVITIES 4, 6, 7, 8, 9, 10, 11, 12)
   ========================================================================= */
export interface RadioChoiceActivityData {
  id: string;
  activityNumber: number;
  questionEn: string;
  questionEs: string;
  options: { id: string; textEn: string; textEs: string }[];
  correctOptionId: string;
}

export const GOOD_MORNING_RADIO_ACTIVITIES: Record<number, RadioChoiceActivityData> = {
  4: {
    id: 'act-4',
    activityNumber: 4,
    questionEn: 'Why does the father say, "Come on"?',
    questionEs: '¿Por qué el padre dice: "Come on" (Vamos)?',
    options: [
      {
        id: 'opt-1',
        textEn: 'He wants to leave the house.',
        textEs: 'Quiere salir de la casa.',
      },
      {
        id: 'opt-2',
        textEn: 'He wants his daughter to look at his tie.',
        textEs: 'Quiere que su hija mire su corbata.',
      },
      {
        id: 'opt-3',
        textEn: 'He is upset with his daughter.',
        textEs: 'Está molesto con su hija.',
      },
      {
        id: 'opt-4',
        textEn: 'He is joking with his daughter.',
        textEs: 'Está bromeando con su hija.',
      },
    ],
    correctOptionId: 'opt-1',
  },
  6: {
    id: 'act-6',
    activityNumber: 6,
    questionEn: 'Another title for this video could be...',
    questionEs: 'Otro título para este video podría ser...',
    options: [
      {
        id: 'opt-1',
        textEn: 'Tuesdays at the Office.',
        textEs: 'Martes en la oficina.',
      },
      {
        id: 'opt-2',
        textEn: 'Starting the Day',
        textEs: 'Comenzando el día',
      },
      {
        id: 'opt-3',
        textEn: 'Working in a Factory.',
        textEs: 'Trabajando en una fábrica.',
      },
      {
        id: 'opt-4',
        textEn: 'Where is My Tie?',
        textEs: '¿Dónde está mi corbata?',
      },
    ],
    correctOptionId: 'opt-2',
  },
  7: {
    id: 'act-7',
    activityNumber: 7,
    questionEn: 'What is the father wearing?',
    questionEs: '¿Qué lleva puesto el padre?',
    options: [
      {
        id: 'opt-1',
        textEn: 'A sweater and a scarf',
        textEs: 'Un suéter y una bufanda',
      },
      {
        id: 'opt-2',
        textEn: 'A jacket and a tie',
        textEs: 'Una chaqueta y una corbata',
      },
      {
        id: 'opt-3',
        textEn: 'A coat and a scarf',
        textEs: 'Un abrigo y una bufanda',
      },
      {
        id: 'opt-4',
        textEn: 'A shirt and a tie',
        textEs: 'Una camisa y una corbata',
      },
    ],
    correctOptionId: 'opt-4',
  },
  8: {
    id: 'act-8',
    activityNumber: 8,
    questionEn: 'What is the girl having for breakfast?',
    questionEs: '¿Qué está desayunando la chica?',
    options: [
      {
        id: 'opt-1',
        textEn: 'Coffee and a sandwich',
        textEs: 'Café y un sándwich',
      },
      {
        id: 'opt-2',
        textEn: 'Toast and jam',
        textEs: 'Tostada y mermelada',
      },
      {
        id: 'opt-3',
        textEn: 'Cereal and juice',
        textEs: 'Cereal y jugo',
      },
    ],
    correctOptionId: 'opt-3',
  },
  9: {
    id: 'act-9',
    activityNumber: 9,
    questionEn: 'What is the father drinking?',
    questionEs: '¿Qué está bebiendo el padre?',
    options: [
      { id: 'opt-1', textEn: 'Coffee', textEs: 'Café' },
      { id: 'opt-2', textEn: 'Milk', textEs: 'Leche' },
      { id: 'opt-3', textEn: 'Water', textEs: 'Agua' },
      { id: 'opt-4', textEn: 'Orange juice', textEs: 'Jugo de naranja' },
    ],
    correctOptionId: 'opt-1',
  },
  10: {
    id: 'act-10',
    activityNumber: 10,
    questionEn: 'What is the daughter doing?',
    questionEs: '¿Qué está haciendo la hija?',
    options: [
      {
        id: 'opt-1',
        textEn: 'Writing in a notebook',
        textEs: 'Escribiendo en un cuaderno',
      },
      {
        id: 'opt-2',
        textEn: 'Pouring a cup of coffee',
        textEs: 'Sirviendo una taza de café',
      },
      {
        id: 'opt-3',
        textEn: 'Making breakfast',
        textEs: 'Preparando el desayuno',
      },
      {
        id: 'opt-4',
        textEn: 'Texting on her cell phone',
        textEs: 'Enviando mensajes en su celular',
      },
    ],
    correctOptionId: 'opt-1',
  },
  11: {
    id: 'act-11',
    activityNumber: 11,
    questionEn: "Where is the girl's mother?",
    questionEs: '¿Dónde está la madre de la chica?',
    options: [
      { id: 'opt-1', textEn: 'In the living room', textEs: 'En la sala de estar' },
      { id: 'opt-2', textEn: 'At the supermarket', textEs: 'En el supermercado' },
      { id: 'opt-3', textEn: 'On the train', textEs: 'En el tren' },
      { id: 'opt-4', textEn: 'At work', textEs: 'En el trabajo' },
    ],
    correctOptionId: 'opt-4',
  },
  12: {
    id: 'act-12',
    activityNumber: 12,
    questionEn: 'The father will drive his daughter to...',
    questionEs: 'El padre llevará en auto a su hija a...',
    options: [
      { id: 'opt-1', textEn: 'her job.', textEs: 'su trabajo.' },
      { id: 'opt-2', textEn: 'her school.', textEs: 'su escuela.' },
      { id: 'opt-3', textEn: 'the factory.', textEs: 'la fábrica.' },
      { id: 'opt-4', textEn: 'his office.', textEs: 'su oficina.' },
    ],
    correctOptionId: 'opt-2',
  },
};

/* =========================================================================
   TESTS 1..5
   ========================================================================= */
export interface GoodMorningTestQuestion {
  id: string;
  testNumber: number;
  questionEn: string;
  questionEs: string;
  options: { id: string; textEn: string; textEs: string }[];
  correctOptionId: string;
}

export const GOOD_MORNING_TESTS: GoodMorningTestQuestion[] = [
  {
    id: 't-1',
    testNumber: 1,
    questionEn: 'Where are the father and the daughter?',
    questionEs: '¿Dónde están el padre y la hija?',
    options: [
      { id: 'opt-1', textEn: 'In the car', textEs: 'En el auto' },
      { id: 'opt-2', textEn: 'At the office', textEs: 'En la oficina' },
      { id: 'opt-3', textEn: 'In the kitchen', textEs: 'En la cocina' },
      { id: 'opt-4', textEn: 'At the factory', textEs: 'En la fábrica' },
    ],
    correctOptionId: 'opt-3',
  },
  {
    id: 't-2',
    testNumber: 2,
    questionEn: 'What are the father and the daughter doing?',
    questionEs: '¿Qué están haciendo el padre y la hija?',
    options: [
      { id: 'opt-1', textEn: 'Laughing at a joke', textEs: 'Riendo de un chiste' },
      { id: 'opt-2', textEn: 'Having dinner', textEs: 'Cenando' },
      { id: 'opt-3', textEn: 'Starting their day', textEs: 'Comenzando su día' },
      { id: 'opt-4', textEn: 'Choosing ties', textEs: 'Eligiendo corbatas' },
    ],
    correctOptionId: 'opt-3',
  },
  {
    id: 't-3',
    testNumber: 3,
    questionEn: 'What does the father ask?',
    questionEs: '¿Qué pregunta el padre?',
    options: [
      {
        id: 'opt-1',
        textEn: 'Can I drive you to work?',
        textEs: '¿Puedo llevarte al trabajo?',
      },
      {
        id: 'opt-2',
        textEn: 'Do you have class on Tuesdays?',
        textEs: '¿Tienes clases los martes?',
      },
      {
        id: 'opt-3',
        textEn: "How's this tie?",
        textEs: '¿Cómo está esta corbata?',
      },
      {
        id: 'opt-4',
        textEn: 'Do you want a lift to school?',
        textEs: '¿Quieres que te lleve a la escuela?',
      },
    ],
    correctOptionId: 'opt-3',
  },
  {
    id: 't-4',
    testNumber: 4,
    questionEn: 'What does the father usually do on Tuesdays?',
    questionEs: '¿Qué hace usualmente el padre los martes?',
    options: [
      {
        id: 'opt-1',
        textEn: 'Eats breakfast with his daughter',
        textEs: 'Desayuna con su hija',
      },
      {
        id: 'opt-2',
        textEn: 'Visits the factories',
        textEs: 'Visita las fábricas',
      },
      {
        id: 'opt-3',
        textEn: 'Takes a bus to work',
        textEs: 'Toma un autobús al trabajo',
      },
      {
        id: 'opt-4',
        textEn: 'Works in the office',
        textEs: 'Trabaja en la oficina',
      },
    ],
    correctOptionId: 'opt-4',
  },
  {
    id: 't-5',
    testNumber: 5,
    questionEn: 'What will the father do next?',
    questionEs: '¿Qué hará el padre a continuación?',
    options: [
      {
        id: 'opt-1',
        textEn: 'Give his wife a ride to work',
        textEs: 'Llevar a su esposa al trabajo en auto',
      },
      {
        id: 'opt-2',
        textEn: 'Take his daughter to school',
        textEs: 'Llevar a su hija a la escuela',
      },
      {
        id: 'opt-3',
        textEn: 'Change his tie',
        textEs: 'Cambiarse la corbata',
      },
      {
        id: 'opt-4',
        textEn: 'Drive to his office',
        textEs: 'Conducir a su oficina',
      },
    ],
    correctOptionId: 'opt-2',
  },
];
