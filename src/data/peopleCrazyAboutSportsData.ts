export interface SportsStoryData {
  title: string;
  titleEs: string;
  author: string;
  authorEs: string;
  paragraphsEn: string[];
  paragraphsEs: string[];
  audioText: string;
}

export const PEOPLE_CRAZY_ABOUT_SPORTS_STORY: SportsStoryData = {
  title: 'People Are Crazy About Sports',
  titleEs: 'La Gente Está Loca por los Deportes',
  author: 'by Stan Bruer',
  authorEs: 'por Stan Bruer',
  paragraphsEn: [
    'Why do people love to watch sports? Professor Len Sanders of Georgetown University asks this question in his study on, "People and Sports." "We can understand why people like to play sports. It\'s good exercise and a lot of fun," says Professor Sanders. "But why do millions of people pay so much money to watch other people play?"',
    'Sports is good business. A winning team can make millions of dollars. A good athlete or player can make a very large salary. For example, at the Wimbledon Tennis Championships, the winner can make more than $2.9 million.',
    'Derrick Rose is a basketball player for the Chicago Bulls. He makes one of the highest salaries in basketball. He earns about sixteen million dollars every year.',
    'Sports fans, the people who watch sports, often pay a lot of money for tickets to a game. The MetLife Stadium in New Jersey can hold 82,566 people.',
    'Fans get very excited when their team wins. Professor Sanders now has the answer to his question: "People love the excitement of a good game."',
  ],
  paragraphsEs: [
    '¿Por qué a la gente le encanta ver deportes? El profesor Len Sanders de la Universidad de Georgetown hace esta pregunta en su estudio sobre "La gente y los deportes". "Podemos entender por qué a la gente le gusta practicar deportes. Es un buen ejercicio y muy divertido", dice el profesor Sanders. "Pero, ¿por qué millones de personas pagan tanto dinero para ver jugar a otras personas?"',
    'El deporte es un buen negocio. Un equipo ganador puede generar millones de dólares. Un buen atleta o jugador puede ganar un salario muy alto. Por ejemplo, en el Campeonato de Tenis de Wimbledon, el ganador puede ganar más de $2.9 millones.',
    'Derrick Rose es un jugador de baloncesto de los Chicago Bulls. Tiene uno de los salarios más altos del baloncesto. Gana alrededor de dieciséis millones de dólares cada año.',
    'Los aficionados al deporte, las personas que miran deportes, a menudo pagan mucho dinero por las entradas a un partido. El estadio MetLife en Nueva Jersey puede albergar a 82,566 personas.',
    'Los fanáticos se emocionan mucho cuando su equipo gana. El profesor Sanders ya tiene la respuesta a su pregunta: "A la gente le encanta la emoción de un buen partido".',
  ],
  audioText:
    'People Are Crazy About Sports by Stan Bruer. Why do people love to watch sports? Professor Len Sanders of Georgetown University asks this question in his study on, "People and Sports." "We can understand why people like to play sports. It\'s good exercise and a lot of fun," says Professor Sanders. "But why do millions of people pay so much money to watch other people play?" Sports is good business. A winning team can make millions of dollars. A good athlete or player can make a very large salary. For example, at the Wimbledon Tennis Championships, the winner can make more than $2.9 million. Derrick Rose is a basketball player for the Chicago Bulls. He makes one of the highest salaries in basketball. He earns about sixteen million dollars every year. Sports fans, the people who watch sports, often pay a lot of money for tickets to a game. The MetLife Stadium in New Jersey can hold 82,566 people. Fans get very excited when their team wins. Professor Sanders now has the answer to his question: "People love the excitement of a good game."',
};

// =========================================================================
// ACTIVIDAD 2: Comprehension Questions 1 & 2
// =========================================================================
export interface SportsComprehensionQuestion {
  id: string;
  questionEn: string;
  questionEs: string;
  options: {
    id: string;
    textEn: string;
    textEs: string;
  }[];
  correctOptionId: string;
}

export const SPORTS2_ACT2_QUESTIONS: SportsComprehensionQuestion[] = [
  {
    id: 'act2-q1',
    questionEn: 'People like to play sports because...',
    questionEs: 'A la gente le gusta practicar deportes porque...',
    options: [
      {
        id: 'act2-q1-opt1',
        textEn: "it's enjoyable and good exercise.",
        textEs: 'es disfrutable y un buen ejercicio.',
      },
      {
        id: 'act2-q1-opt2',
        textEn: "you don't have to pay for it.",
        textEs: 'no tienes que pagar por ello.',
      },
      {
        id: 'act2-q1-opt3',
        textEn: 'you can earn lots of money.',
        textEs: 'puedes ganar mucho dinero.',
      },
    ],
    correctOptionId: 'act2-q1-opt1',
  },
  {
    id: 'act2-q2',
    questionEn: 'What is "People and Sports"?',
    questionEs: '¿Qué es "La gente y los deportes"?',
    options: [
      {
        id: 'act2-q2-opt1',
        textEn: 'A magazine',
        textEs: 'Una revista',
      },
      {
        id: 'act2-q2-opt2',
        textEn: 'A study',
        textEs: 'Un estudio',
      },
      {
        id: 'act2-q2-opt3',
        textEn: 'A TV program',
        textEs: 'Un programa de televisión',
      },
    ],
    correctOptionId: 'act2-q2-opt2',
  },
];

// =========================================================================
// ACTIVIDAD 3: Comprehension Questions 3 & 4
// =========================================================================
export const SPORTS2_ACT3_QUESTIONS: SportsComprehensionQuestion[] = [
  {
    id: 'act3-q1',
    questionEn: 'Where does Professor Sanders work?',
    questionEs: '¿Dónde trabaja el profesor Sanders?',
    options: [
      {
        id: 'act3-q1-opt1',
        textEn: 'In Wimbledon',
        textEs: 'En Wimbledon',
      },
      {
        id: 'act3-q1-opt2',
        textEn: 'At Georgetown University',
        textEs: 'En la Universidad de Georgetown',
      },
      {
        id: 'act3-q1-opt3',
        textEn: 'In Philadelphia',
        textEs: 'En Filadelfia',
      },
      {
        id: 'act3-q1-opt4',
        textEn: 'In New Jersey',
        textEs: 'En Nueva Jersey',
      },
    ],
    correctOptionId: 'act3-q1-opt2',
  },
  {
    id: 'act3-q2',
    questionEn: '"People and Sports" is about...',
    questionEs: '"La gente y los deportes" trata sobre...',
    options: [
      {
        id: 'act3-q2-opt1',
        textEn: 'why people play sports.',
        textEs: 'por qué la gente practica deportes.',
      },
      {
        id: 'act3-q2-opt2',
        textEn: 'why playing sports is so expensive.',
        textEs: 'por qué practicar deportes es tan caro.',
      },
      {
        id: 'act3-q2-opt3',
        textEn: 'why people like to watch sports.',
        textEs: 'por qué a la gente le gusta ver deportes.',
      },
    ],
    correctOptionId: 'act3-q2-opt3',
  },
];

// =========================================================================
// ACTIVIDAD 4: Comprehension Questions 5 & 6
// =========================================================================
export const SPORTS2_ACT4_QUESTIONS: SportsComprehensionQuestion[] = [
  {
    id: 'act4-q1',
    questionEn: 'Who earns $2.9 million?',
    questionEs: '¿Quién gana $2.9 millones?',
    options: [
      {
        id: 'act4-q1-opt1',
        textEn: 'The winning team',
        textEs: 'El equipo ganador',
      },
      {
        id: 'act4-q1-opt2',
        textEn: 'Professor Sanders',
        textEs: 'El profesor Sanders',
      },
      {
        id: 'act4-q1-opt3',
        textEn: 'The Giants',
        textEs: 'Los Giants',
      },
      {
        id: 'act4-q1-opt4',
        textEn: 'The winner of the Wimbledon Championships',
        textEs: 'El ganador del Campeonato de Wimbledon',
      },
    ],
    correctOptionId: 'act4-q1-opt4',
  },
  {
    id: 'act4-q2',
    questionEn: 'Who earns $16 million?',
    questionEs: '¿Quién gana $16 millones?',
    options: [
      {
        id: 'act4-q2-opt1',
        textEn: 'Derrick Rose',
        textEs: 'Derrick Rose',
      },
      {
        id: 'act4-q2-opt2',
        textEn: 'The winner of the Wimbledon Championships',
        textEs: 'El ganador del Campeonato de Wimbledon',
      },
      {
        id: 'act4-q2-opt3',
        textEn: 'The winning team',
        textEs: 'El equipo ganador',
      },
      {
        id: 'act4-q2-opt4',
        textEn: 'Professor Sanders',
        textEs: 'El profesor Sanders',
      },
    ],
    correctOptionId: 'act4-q2-opt1',
  },
];

// =========================================================================
// ACTIVIDAD 5: Select True Sentences
// =========================================================================
export interface SportsTrueFalseStatement {
  id: string;
  textEn: string;
  textEs: string;
  isTrue: boolean;
}

export const SPORTS2_ACT5_STATEMENTS: SportsTrueFalseStatement[] = [
  {
    id: 'act5-s1',
    textEn: 'People pay a lot of money for tickets to games.',
    textEs: 'La gente paga mucho dinero por entradas a los partidos.',
    isTrue: true,
  },
  {
    id: 'act5-s2',
    textEn: 'Most people play sports for the money.',
    textEs: 'La mayoría de las personas practican deportes por el dinero.',
    isTrue: false,
  },
  {
    id: 'act5-s3',
    textEn: 'A well-known basketball player recently made $500,000 at Wimbledon.',
    textEs: 'Un conocido jugador de baloncesto ganó recientemente $500,000 en Wimbledon.',
    isTrue: false,
  },
  {
    id: 'act5-s4',
    textEn: 'It is easy to understand why people play sports.',
    textEs: 'Es fácil entender por qué la gente practica deportes.',
    isTrue: true,
  },
  {
    id: 'act5-s5',
    textEn: 'Professor Sanders says that people pay because of the excitement of the game.',
    textEs: 'El profesor Sanders dice que la gente paga por la emoción del juego.',
    isTrue: true,
  },
  {
    id: 'act5-s6',
    textEn: 'People pay to watch because sports is big business.',
    textEs: 'La gente paga para ver porque los deportes son un gran negocio.',
    isTrue: false,
  },
  {
    id: 'act5-s7',
    textEn: 'The professor studied why people pay money to watch other people play sports.',
    textEs: 'El profesor estudió por qué la gente paga dinero para ver a otras personas practicar deportes.',
    isTrue: true,
  },
];

// =========================================================================
// ACTIVIDAD 6: Vocabulary Matching
// =========================================================================
export interface SportsVocabularyPair {
  id: string;
  wordEn: string;
  wordEs: string;
  definitionEn: string;
  definitionEs: string;
}

export const SPORTS2_ACT6_PAIRS: SportsVocabularyPair[] = [
  {
    id: 'vocab-fans',
    wordEn: 'fans',
    wordEs: 'aficionados / fanáticos',
    definitionEn: 'the people who watch sports',
    definitionEs: 'las personas que ven deportes',
  },
  {
    id: 'vocab-athlete',
    wordEn: 'athlete',
    wordEs: 'atleta / deportista',
    definitionEn: 'a person who plays sports',
    definitionEs: 'una persona que practica deportes',
  },
  {
    id: 'vocab-salary',
    wordEn: 'salary',
    wordEs: 'salario / sueldo',
    definitionEn: 'the money a person earns',
    definitionEs: 'el dinero que gana una persona',
  },
  {
    id: 'vocab-stadium',
    wordEn: 'stadium',
    wordEs: 'estadio',
    definitionEn: 'the place where games are held',
    definitionEs: 'el lugar donde se celebran los partidos',
  },
  {
    id: 'vocab-winner',
    wordEn: 'winner',
    wordEs: 'ganador / vencedora',
    definitionEn: 'the athlete or team who makes the most points',
    definitionEs: 'el atleta o equipo que hace más puntos',
  },
];

// =========================================================================
// ACTIVIDAD 7: Cloze Fill-in-the-blanks (Drag & Drop or Click)
// =========================================================================
export interface SportsClozeBlank {
  id: string;
  prefixEn: string;
  prefixEs: string;
  suffixEn: string;
  suffixEs: string;
  correctWords: string[];
}

export interface SportsClozeData {
  instructionsEn: string;
  instructionsEs: string;
  fullParagraphEn: string;
  fullParagraphEs: string;
  blanks: SportsClozeBlank[];
  wordBank: string[];
}

export const SPORTS2_ACT7_CLOZE: SportsClozeData = {
  instructionsEn:
    'Drag the correct answer/s into place. There are more words than you need.',
  instructionsEs:
    'Arrastra la(s) respuesta(s) correcta(s) a su lugar. Hay más palabras de las que necesitas.',
  fullParagraphEn:
    "A soccer player can win a lot of money in a championship. Sport players can earn millions if they're successful. Some of the highest salaries are paid to sports players.",
  fullParagraphEs:
    'Un jugador de fútbol puede ganar mucho dinero en un campeonato. Los deportistas pueden ganar millones si tienen éxito. Algunos de los salarios más altos se pagan a los deportistas.',
  blanks: [
    {
      id: 'blank-1',
      prefixEn: 'A soccer player can',
      prefixEs: 'Un jugador de fútbol puede',
      suffixEn: 'a lot of money in a championship. Sport',
      suffixEs: 'mucho dinero en un campeonato. Los deportistas',
      correctWords: ['win', 'make'],
    },
    {
      id: 'blank-2',
      prefixEn: 'players can earn',
      prefixEs: 'pueden ganar',
      suffixEn: "if they're successful. Some of the highest",
      suffixEs: 'si tienen éxito. Algunos de los salarios más',
      correctWords: ['millions', 'dollars'],
    },
    {
      id: 'blank-3',
      prefixEn: '',
      prefixEs: '',
      suffixEn: 'are paid to sports players.',
      suffixEs: 'altos se pagan a los deportistas.',
      correctWords: ['salaries'],
    },
  ],
  wordBank: ['millions', 'pay', 'tickets', 'dollars', 'win', 'salaries', 'make'],
};

// =========================================================================
// ACTIVIDAD 7 (Legacy): Writing with AI Feedback
// =========================================================================
export interface SportsWritingData {
  instructionsEn: string;
  instructionsEs: string;
  promptEn: string;
  promptEs: string;
  storyContext: string;
  placeholder: string;
}

export const SPORTS2_ACT7_WRITING: SportsWritingData = {
  instructionsEn:
    'Write your answer, review AI feedback, improve it, and mark Done if satisfied or get another AI feedback.',
  instructionsEs:
    'Escribe tu respuesta, revisa los comentarios de la IA, mejórala y marca Listo si estás satisfecho o solicita otra revisión de la IA.',
  promptEn:
    'Why do people love to watch sports? Why is sports a good business? What did Professor Sanders discover in his study? Write your answer and send it to your teacher.',
  promptEs:
    '¿Por qué a la gente le encanta ver deportes? ¿Por qué los deportes son un buen negocio? ¿Qué descubrió el profesor Sanders en su estudio? Escribe tu respuesta y envíasela a tu profesor.',
  storyContext:
    'In "People Are Crazy About Sports" by Stan Bruer, Professor Len Sanders of Georgetown University asks why people pay money to watch other people play sports. Sports is good business: winning teams earn millions, and players like Derrick Rose make $16 million a year while Wimbledon winners make over $2.9 million. MetLife Stadium holds over 82,000 fans. Sanders concludes that people love the excitement of a good game.',
  placeholder:
    'People love watching sports because of the excitement of a good game. Sports is a big business where winning teams and top athletes earn millions of dollars...',
};

// =========================================================================
// ACTIVIDAD 8: Test (5 Sub-tests)
// =========================================================================
export type TestType = 'drag-blank' | 'multiple-choice';

export interface SportsTestItem {
  id: string;
  testNumber: number;
  type: TestType;
  instructionEn: string;
  instructionEs: string;
  sentenceBeforeEn: string;
  sentenceBeforeEs: string;
  sentenceAfterEn?: string;
  sentenceAfterEs?: string;
  options: {
    id: string;
    textEn: string;
    textEs: string;
  }[];
  correctAnswerEn: string;
}

export const SPORTS2_TESTS: SportsTestItem[] = [
  // Test 1: Image test 1.png
  {
    id: 'test-1',
    testNumber: 1,
    type: 'drag-blank',
    instructionEn: 'Drag the correct answer/s into place.',
    instructionEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    sentenceBeforeEn: 'Another name for this story is: ',
    sentenceBeforeEs: 'Otro nombre para esta historia es: ',
    sentenceAfterEn: ' .',
    sentenceAfterEs: ' .',
    options: [
      {
        id: 't1-opt1',
        textEn: 'The Highest Paid Basketball Player',
        textEs: 'El jugador de baloncesto mejor pagado',
      },
      {
        id: 't1-opt2',
        textEn: 'Watch Sports and Make Money',
        textEs: 'Mira deportes y gana dinero',
      },
      {
        id: 't1-opt3',
        textEn: 'A Million-Dollar Business',
        textEs: 'Un negocio millonario',
      },
      {
        id: 't1-opt4',
        textEn: 'Fans Get Excited and Win',
        textEs: 'Los fanáticos se emocionan y ganan',
      },
    ],
    correctAnswerEn: 'A Million-Dollar Business',
  },
  // Test 2: Image test 2.png
  {
    id: 'test-2',
    testNumber: 2,
    type: 'multiple-choice',
    instructionEn: 'Choose the correct answer.',
    instructionEs: 'Elige la respuesta correcta.',
    sentenceBeforeEn: 'In sports, athletes spend money and fans make money.',
    sentenceBeforeEs: 'En los deportes, los atletas gastan dinero y los aficionados ganan dinero.',
    options: [
      {
        id: 't2-true',
        textEn: 'True',
        textEs: 'Verdadero',
      },
      {
        id: 't2-false',
        textEn: 'False',
        textEs: 'Falso',
      },
    ],
    correctAnswerEn: 'False',
  },
  // Test 3: Image test 3.png
  {
    id: 'test-3',
    testNumber: 3,
    type: 'drag-blank',
    instructionEn: 'Drag the correct answer/s into place.',
    instructionEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    sentenceBeforeEn:
      'Professor Sanders thinks that people love to watch sports because they love the excitement of ',
    sentenceBeforeEs:
      'El profesor Sanders piensa que a la gente le encanta ver deportes porque les fascina la emoción de ',
    sentenceAfterEn: ' .',
    sentenceAfterEs: ' .',
    options: [
      {
        id: 't3-opt1',
        textEn: 'a good game',
        textEs: 'un buen partido',
      },
      {
        id: 't3-opt2',
        textEn: 'spending money',
        textEs: 'gastar dinero',
      },
      {
        id: 't3-opt3',
        textEn: 'earning money',
        textEs: 'ganar dinero',
      },
      {
        id: 't3-opt4',
        textEn: 'a winning team',
        textEs: 'un equipo ganador',
      },
    ],
    correctAnswerEn: 'a good game',
  },
  // Test 4: Image test 4.png
  {
    id: 'test-4',
    testNumber: 4,
    type: 'multiple-choice',
    instructionEn: 'Choose the correct answer.',
    instructionEs: 'Elige la respuesta correcta.',
    sentenceBeforeEn: 'Why is sports a good business?',
    sentenceBeforeEs: '¿Por qué los deportes son un buen negocio?',
    options: [
      {
        id: 't4-opt1',
        textEn: "You can be part of Sanders' study.",
        textEs: 'Puedes ser parte del estudio de Sanders.',
      },
      {
        id: 't4-opt2',
        textEn: 'You can be a winner.',
        textEs: 'Puedes ser un ganador.',
      },
      {
        id: 't4-opt3',
        textEn: 'You can make a lot of money.',
        textEs: 'Puedes ganar mucho dinero.',
      },
      {
        id: 't4-opt4',
        textEn: 'You can be a good athlete or player.',
        textEs: 'Puedes ser un buen atleta o jugador.',
      },
    ],
    correctAnswerEn: 'You can make a lot of money.',
  },
  // Test 5: Image test 5.png
  {
    id: 'test-5',
    testNumber: 5,
    type: 'drag-blank',
    instructionEn: 'Drag the correct answer/s into place.',
    instructionEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    sentenceBeforeEn: 'A fan is a person who ',
    sentenceBeforeEs: 'Un aficionado es una persona que ',
    sentenceAfterEn: ' .',
    sentenceAfterEs: ' .',
    options: [
      {
        id: 't5-opt1',
        textEn: 'watches sports',
        textEs: 've deportes',
      },
      {
        id: 't5-opt2',
        textEn: 'plays sports',
        textEs: 'practica deportes',
      },
      {
        id: 't5-opt3',
        textEn: 'earns millions',
        textEs: 'gana millones',
      },
      {
        id: 't5-opt4',
        textEn: 'keeps you cool',
        textEs: 'te mantiene fresco (abanico)',
      },
    ],
    correctAnswerEn: 'watches sports',
  },
];
