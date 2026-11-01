export interface LostReportDialogueLine {
  id: string;
  speaker: 'Adam' | 'Karen';
  speakerGender: 'male' | 'female';
  textEn: string;
  textEs: string;
  startSec: number;
  endSec: number;
}

export const LOST_REPORT_DIALOGUE: LostReportDialogueLine[] = [
  {
    id: 'lr-1',
    speaker: 'Adam',
    speakerGender: 'male',
    textEn: 'Hi Karen, what are you doing?',
    textEs: 'Hola Karen, ¿qué estás haciendo?',
    startSec: 0,
    endSec: 4,
  },
  {
    id: 'lr-2',
    speaker: 'Karen',
    speakerGender: 'female',
    textEn: "I'm looking for my report. This is impossible. I need the report for my meeting. It was on my desk.",
    textEs: 'Estoy buscando mi informe. Esto es imposible. Necesito el informe para mi reunión. Estaba en mi escritorio.',
    startSec: 4,
    endSec: 15,
  },
  {
    id: 'lr-3',
    speaker: 'Adam',
    speakerGender: 'male',
    textEn: "Maybe it's in Mark's office. Do you want me to ask him? I have to go talk to him anyway.",
    textEs: 'Quizás está en la oficina de Mark. ¿Quieres que le pregunte? De todos modos tengo que ir a hablar con él.',
    startSec: 15,
    endSec: 25,
  },
  {
    id: 'lr-4',
    speaker: 'Karen',
    speakerGender: 'female',
    textEn: 'Yes. Please ask Mark. Maybe he has my report. Oh no! This is just not my day.',
    textEs: 'Sí. Por favor pregúntale a Mark. Quizás él tiene mi informe. ¡Oh no! Este día sencillamente no es mi día.',
    startSec: 25,
    endSec: 36,
  },
  {
    id: 'lr-5',
    speaker: 'Adam',
    speakerGender: 'male',
    textEn: "Let me help you. Hey what's that under your chair?",
    textEs: 'Déjame ayudarte. Oye, ¿qué es eso debajo de tu silla?',
    startSec: 36,
    endSec: 44,
  },
  {
    id: 'lr-6',
    speaker: 'Karen',
    speakerGender: 'female',
    textEn: "My report! It's all wet. I need a vacation.",
    textEs: '¡Mi informe! Está todo mojado. Necesito unas vacaciones.',
    startSec: 44,
    endSec: 55,
  },
];

export interface DropdownBlankItem {
  id: string;
  before: string;
  beforeEs: string;
  options: string[];
  optionsEs: Record<string, string>;
  correctAnswer: string;
  after: string;
  afterEs: string;
  fullSentenceEs: string;
}

export const ACTIVITY_2_DATA: DropdownBlankItem[] = [
  {
    id: 'act2-1',
    before: 'Karen is looking for her',
    beforeEs: 'Karen está buscando su',
    options: ['pen', 'report', 'water'],
    optionsEs: {
      pen: 'bolígrafo',
      report: 'informe',
      water: 'agua',
    },
    correctAnswer: 'report',
    after: '.',
    afterEs: '.',
    fullSentenceEs: 'Karen está buscando su informe.',
  },
  {
    id: 'act2-2',
    before: 'Adam tells Karen to look',
    beforeEs: 'Adam le dice a Karen que busque',
    options: ['on her desk', 'under the chair', "in Mark's office"],
    optionsEs: {
      'on her desk': 'en su escritorio',
      'under the chair': 'debajo de la silla',
      "in Mark's office": 'en la oficina de Mark',
    },
    correctAnswer: "in Mark's office",
    after: '.',
    afterEs: '.',
    fullSentenceEs: 'Adam le sugiere a Karen que busque en la oficina de Mark.',
  },
  {
    id: 'act2-3',
    before: 'In the end, Karen wants to',
    beforeEs: 'Al final, Karen quiere',
    options: ['take a vacation', 'talk to Mark', 'go to the meeting'],
    optionsEs: {
      'take a vacation': 'tomarse unas vacaciones',
      'talk to Mark': 'hablar con Mark',
      'go to the meeting': 'ir a la reunión',
    },
    correctAnswer: 'take a vacation',
    after: '.',
    afterEs: '.',
    fullSentenceEs: 'Al final, Karen quiere tomarse unas vacaciones.',
  },
];

export interface RadioOption {
  id: string;
  text: string;
  textEs: string;
}

export interface RadioActivityQuestion {
  id: string;
  instruction: string;
  instructionEs: string;
  question: string;
  questionEs: string;
  options: RadioOption[];
  correctAnswerId: string;
  explanation: string;
  explanationEs: string;
}

// Actividad 3
export const ACTIVITY_3_DATA: RadioActivityQuestion = {
  id: 'act-3',
  instruction: 'Choose the correct answer.',
  instructionEs: 'Elige la respuesta correcta.',
  question: "Why is Adam going to Mark's office?",
  questionEs: '¿Por qué va Adam a la oficina de Mark?',
  options: [
    {
      id: 'a',
      text: 'He has to give Mark a report.',
      textEs: 'Tiene que entregarle un informe a Mark.',
    },
    {
      id: 'b',
      text: 'He has to talk to Mark.',
      textEs: 'Tiene que hablar con Mark.',
    },
    {
      id: 'c',
      text: "He wants to use Mark's computer.",
      textEs: 'Quiere usar la computadora de Mark.',
    },
  ],
  correctAnswerId: 'b',
  explanation: 'Adam says: "I have to go talk to him anyway."',
  explanationEs: 'Adam le dice a Karen: "De todos modos tengo que ir a hablar con él".',
};

// Actividad 4: True or False Table
export interface TrueFalseStatementItem {
  id: string;
  text: string;
  textEs: string;
  correctCategory: 'true' | 'false';
  explanation: string;
  explanationEs: string;
}

export const ACTIVITY_4_DATA: TrueFalseStatementItem[] = [
  {
    id: 'act4-1',
    text: "Karen's report is under her chair.",
    textEs: 'El informe de Karen está debajo de su silla.',
    correctCategory: 'true',
    explanation: 'Adam notices it: "Hey what\'s that under your chair? - My report!"',
    explanationEs: 'Adam lo encuentra: "Oye, ¿qué es eso debajo de tu silla? - ¡Mi informe!".',
  },
  {
    id: 'act4-2',
    text: 'Adam knocks over a cup.',
    textEs: 'Adam derriba una taza.',
    correctCategory: 'false',
    explanation: 'Adam does not knock over a cup in the video dialogue.',
    explanationEs: 'Adam no derriba ninguna taza en el diálogo del video.',
  },
  {
    id: 'act4-3',
    text: "Karen's report gets wet.",
    textEs: 'El informe de Karen se moja.',
    correctCategory: 'true',
    explanation: 'Karen says: "It\'s all wet."',
    explanationEs: 'Karen exclama: "Está todo mojado".',
  },
  {
    id: 'act4-4',
    text: 'Karen is helping Adam.',
    textEs: 'Karen está ayudando a Adam.',
    correctCategory: 'false',
    explanation: 'Adam offers help to Karen: "Let me help you."',
    explanationEs: 'Es Adam quien ayuda a Karen: "Déjame ayudarte".',
  },
  {
    id: 'act4-5',
    text: 'Mark has the report.',
    textEs: 'Mark tiene el informe.',
    correctCategory: 'false',
    explanation: 'Mark doesn\'t have the report; it was under Karen\'s chair the whole time.',
    explanationEs: 'Mark no tenía el informe; estuvo debajo de la silla de Karen todo el tiempo.',
  },
  {
    id: 'act4-6',
    text: 'Karen needs the report for a meeting.',
    textEs: 'Karen necesita el informe para una reunión.',
    correctCategory: 'true',
    explanation: 'Karen says: "I need the report for my meeting."',
    explanationEs: 'Karen dice claramente: "Necesito el informe para mi reunión".',
  },
];

// Actividad 5
export const ACTIVITY_5_DATA: RadioActivityQuestion = {
  id: 'act-5',
  instruction: 'Choose the correct answer.',
  instructionEs: 'Elige la respuesta correcta.',
  question: 'When Karen says, "This is impossible," what does she mean?',
  questionEs: 'Cuando Karen dice: "Esto es imposible", ¿qué quiere decir?',
  options: [
    {
      id: 'a',
      text: 'The report is hard to understand.',
      textEs: 'El informe es difícil de entender.',
    },
    {
      id: 'b',
      text: "It's hard to get in touch with Mark.",
      textEs: 'Es difícil ponerse en contacto con Mark.',
    },
    {
      id: 'c',
      text: 'She is very frustrated that she has lost her report.',
      textEs: 'Está muy frustrada por haber perdido su informe.',
    },
    {
      id: 'd',
      text: "She can't believe someone took her report.",
      textEs: 'No puede creer que alguien se haya llevado su informe.',
    },
  ],
  correctAnswerId: 'c',
  explanation: 'Karen is expressing deep frustration because she cannot find her critical report right before her meeting.',
  explanationEs: 'Karen expresa su frustración porque no logra encontrar su informe antes de la reunión.',
};

// Actividad 6
export const ACTIVITY_6_DATA: RadioActivityQuestion = {
  id: 'act-6',
  instruction: 'Choose the correct answer.',
  instructionEs: 'Elige la respuesta correcta.',
  question: 'Why does Karen want a vacation?',
  questionEs: '¿Por qué quiere Karen unas vacaciones?',
  options: [
    {
      id: 'a',
      text: 'She wants to rest up before her meeting.',
      textEs: 'Quiere descansar antes de su reunión.',
    },
    {
      id: 'b',
      text: "She's tired of looking for the report.",
      textEs: 'Está cansada de buscar el informe.',
    },
    {
      id: 'c',
      text: 'Nothing has been going right for her.',
      textEs: 'Nada le ha estado saliendo bien.',
    },
    {
      id: 'd',
      text: "She's been working long hours.",
      textEs: 'Ha estado trabajando muchas horas.',
    },
  ],
  correctAnswerId: 'c',
  explanation: 'She says: "This is just not my day... My report! It\'s all wet. I need a vacation."',
  explanationEs: 'Ella dice que este día no es el suyo y, al ver el informe mojado, siente que nada le sale bien.',
};

// Actividad 7: Match words to images
export interface MatchWordImageItem {
  id: string;
  word: string;
  wordEs: string;
  imageUrl: string;
  imageAlt: string;
}

export const ACTIVITY_7_DATA: MatchWordImageItem[] = [
  {
    id: 'm1',
    word: 'an office',
    wordEs: 'una oficina',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80',
    imageAlt: 'Open plan office with desks and computers',
  },
  {
    id: 'm2',
    word: 'a report',
    wordEs: 'un informe',
    imageUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&q=80',
    imageAlt: 'Clipboard with business charts and report document',
  },
  {
    id: 'm3',
    word: 'a desk',
    wordEs: 'un escritorio',
    imageUrl: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=600&q=80',
    imageAlt: 'Wooden office workstation desk',
  },
  {
    id: 'm4',
    word: 'a chair',
    wordEs: 'una silla',
    imageUrl: 'https://images.unsplash.com/photo-1580481077195-c328a37db71a?auto=format&fit=crop&w=600&q=80',
    imageAlt: 'Black ergonomic swivel office chair',
  },
];

// Actividad 8
export const ACTIVITY_8_DATA: RadioActivityQuestion = {
  id: 'act-8',
  instruction: 'Choose the correct answer.',
  instructionEs: 'Elige la respuesta correcta.',
  question: 'Where are Adam and Karen?',
  questionEs: '¿Dónde están Adam y Karen?',
  options: [
    {
      id: 'a',
      text: "In Karen's office",
      textEs: 'En la oficina de Karen',
    },
    {
      id: 'b',
      text: "In Mark's office",
      textEs: 'En la oficina de Mark',
    },
    {
      id: 'c',
      text: "In Adam's office",
      textEs: 'En la oficina de Adam',
    },
  ],
  correctAnswerId: 'a',
  explanation: 'They are in Karen\'s office; Adam walks in asking what she is doing by her desk and chair.',
  explanationEs: 'Están en la oficina de Karen; Adam entra y ve a Karen buscando en su escritorio y silla.',
};

// Actividad 9
export const ACTIVITY_9_DATA: RadioActivityQuestion = {
  id: 'act-9',
  instruction: 'Choose the correct answer.',
  instructionEs: 'Elige la respuesta correcta.',
  question: 'In the video, we see that Adam is...',
  questionEs: 'En el video, vemos que Adam es...',
  options: [
    {
      id: 'a',
      text: 'messy.',
      textEs: 'desordenado.',
    },
    {
      id: 'b',
      text: 'in a rush.',
      textEs: 'apurado.',
    },
    {
      id: 'c',
      text: 'making jokes.',
      textEs: 'haciendo bromas.',
    },
    {
      id: 'd',
      text: 'helpful.',
      textEs: 'servicial y atento.',
    },
  ],
  correctAnswerId: 'd',
  explanation: 'Adam is helpful: he offers to ask Mark and actively spots the report under the chair to help Karen.',
  explanationEs: 'Adam es muy servicial: se ofrece a preguntarle a Mark y encuentra el informe debajo de la silla.',
};

// Actividad 10
export const ACTIVITY_10_DATA: RadioActivityQuestion = {
  id: 'act-10',
  instruction: 'Choose the correct answer.',
  instructionEs: 'Elige la respuesta correcta.',
  question: 'At the end of the video, Karen...',
  questionEs: 'Al final del video, Karen...',
  options: [
    {
      id: 'a',
      text: 'writes a new report.',
      textEs: 'escribe un informe nuevo.',
    },
    {
      id: 'b',
      text: 'goes to her meeting.',
      textEs: 'va a su reunión.',
    },
    {
      id: 'c',
      text: 'drinks a cup of water.',
      textEs: 'bebe una taza de agua.',
    },
    {
      id: 'd',
      text: 'sits down in a chair.',
      textEs: 'se sienta en una silla.',
    },
  ],
  correctAnswerId: 'd',
  explanation: 'At the end, Karen sits down exhausted in her chair saying "I need a vacation."',
  explanationEs: 'Al final del video, Karen se sienta desanimada en la silla diciendo "Necesito unas vacaciones".',
};

// ==========================================
// 5 TESTS
// ==========================================
export interface LostReportTestQuestion {
  id: string;
  number: number;
  question: string;
  questionEs: string;
  options: RadioOption[];
  correctAnswerId: string;
  explanation: string;
  explanationEs: string;
}

export const LOST_REPORT_TESTS: LostReportTestQuestion[] = [
  // Test 1 (test_1_6d432b79.png)
  {
    id: 'test-1',
    number: 1,
    question: 'Why does Karen need the report?',
    questionEs: '¿Por qué necesita Karen el informe?',
    options: [
      {
        id: 'a',
        text: 'She needs it for her meeting.',
        textEs: 'Lo necesita para su reunión.',
      },
      {
        id: 'b',
        text: 'She has to give it to Mark.',
        textEs: 'Tiene que entregárselo a Mark.',
      },
      {
        id: 'c',
        text: 'She has to finish reading it.',
        textEs: 'Tiene que terminar de leerlo.',
      },
      {
        id: 'd',
        text: 'She needs Adam to read it.',
        textEs: 'Necesita que Adam lo lea.',
      },
    ],
    correctAnswerId: 'a',
    explanation: 'Karen states: "I need the report for my meeting."',
    explanationEs: 'Karen dice expresamente: "Necesito el informe para mi reunión".',
  },
  // Test 2 (test_2_dbdf2468.png)
  {
    id: 'test-2',
    number: 2,
    question: 'Where does Karen think she put the report?',
    questionEs: '¿Dónde cree Karen que puso el informe?',
    options: [
      {
        id: 'a',
        text: 'Under the chair',
        textEs: 'Debajo de la silla',
      },
      {
        id: 'b',
        text: "In Adam's office",
        textEs: 'En la oficina de Adam',
      },
      {
        id: 'c',
        text: 'On the desk',
        textEs: 'Sobre el escritorio',
      },
      {
        id: 'd',
        text: 'On the chair',
        textEs: 'Sobre la silla',
      },
    ],
    correctAnswerId: 'c',
    explanation: 'Karen says: "It was on my desk."',
    explanationEs: 'Karen afirma: "Estaba en mi escritorio".',
  },
  // Test 3 (test_3_12c4cf53.png)
  {
    id: 'test-3',
    number: 3,
    question: 'How does Adam help Karen?',
    questionEs: '¿Cómo ayuda Adam a Karen?',
    options: [
      {
        id: 'a',
        text: "He cleans up Karen's desk.",
        textEs: 'Limpia el escritorio de Karen.',
      },
      {
        id: 'b',
        text: 'He helps Karen write a new report.',
        textEs: 'Ayuda a Karen a escribir un nuevo informe.',
      },
      {
        id: 'c',
        text: "He moves Karen's meeting to another day.",
        textEs: 'Pospone la reunión de Karen para otro día.',
      },
      {
        id: 'd',
        text: 'He finds her report.',
        textEs: 'Encuentra su informe.',
      },
    ],
    correctAnswerId: 'd',
    explanation: 'Adam spots it under the chair: "Hey what\'s that under your chair? - My report!"',
    explanationEs: 'Adam localiza el informe: "Oye, ¿qué es eso debajo de tu silla? - ¡Mi informe!".',
  },
  // Test 4 (test_4_4ce24dfc.png)
  {
    id: 'test-4',
    number: 4,
    question: "Where was Karen's report?",
    questionEs: '¿Dónde estaba el informe de Karen?',
    options: [
      {
        id: 'a',
        text: 'Under a water bottle',
        textEs: 'Debajo de una botella de agua',
      },
      {
        id: 'b',
        text: 'Next to the desk',
        textEs: 'Al lado del escritorio',
      },
      {
        id: 'c',
        text: 'Under the chair',
        textEs: 'Debajo de la silla',
      },
      {
        id: 'd',
        text: "In Mark's office",
        textEs: 'En la oficina de Mark',
      },
    ],
    correctAnswerId: 'c',
    explanation: 'It was under Karen\'s chair.',
    explanationEs: 'El informe estaba en el suelo, justo debajo de la silla de Karen.',
  },
  // Test 5 (test_5_c96351e6.png)
  {
    id: 'test-5',
    number: 5,
    question: 'What happens to the report?',
    questionEs: '¿Qué le pasa al informe?',
    options: [
      {
        id: 'a',
        text: 'It tears.',
        textEs: 'Se rasga / rompe.',
      },
      {
        id: 'b',
        text: 'Karen loses it again.',
        textEs: 'Karen lo pierde de nuevo.',
      },
      {
        id: 'c',
        text: 'It gets wet.',
        textEs: 'Se moja.',
      },
      {
        id: 'd',
        text: 'Mark takes it.',
        textEs: 'Mark se lo lleva.',
      },
    ],
    correctAnswerId: 'c',
    explanation: 'Karen picks it up and says: "It\'s all wet."',
    explanationEs: 'Karen lo levanta y exclama: "Está todo mojado".',
  },
];
