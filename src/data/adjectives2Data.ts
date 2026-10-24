import adjectives2ContextImg from '../assets/images/adjectives2_context.png';
import aloneImg from '../assets/images/adjectives2/alone.png';
import angryImg from '../assets/images/adjectives2/angry.png';
import bestImg from '../assets/images/adjectives2/best.png';
import easyImg from '../assets/images/adjectives2/easy.png';
import prettyImg from '../assets/images/adjectives2/pretty.png';
import quickImg from '../assets/images/adjectives2/quick.png';
import specialImg from '../assets/images/adjectives2/special.png';
import strongImg from '../assets/images/adjectives2/strong.png';
import wonderfulImg from '../assets/images/adjectives2/wonderful.png';
import worstImg from '../assets/images/adjectives2/worst.png';
import aloneLargeImg from '../assets/images/adjectives2/alone_large.png';

export {
  adjectives2ContextImg,
  aloneImg,
  angryImg,
  bestImg,
  easyImg,
  prettyImg,
  quickImg,
  specialImg,
  strongImg,
  wonderfulImg,
  worstImg,
  aloneLargeImg,
};

export interface AdjectiveWordItem {
  id: string;
  word: string;
  partOfSpeech: string;
  translation: string;
  definitionEn: string;
  definitionEs: string;
  exampleEn: string;
  exampleEs: string;
  thumbnailImg: string;
  largeImg?: string;
}

export const ADJECTIVES_VOCABULARY: AdjectiveWordItem[] = [
  {
    id: 'alone',
    word: 'alone',
    partOfSpeech: 'adjective',
    translation: 'solo / sola',
    definitionEn: 'without anyone with you',
    definitionEs: 'sin nadie contigo',
    exampleEn: 'I did it alone because nobody wanted to help me.',
    exampleEs: 'Lo hice solo porque nadie quería ayudarme.',
    thumbnailImg: aloneImg,
    largeImg: aloneLargeImg,
  },
  {
    id: 'angry',
    word: 'angry',
    partOfSpeech: 'adjective',
    translation: 'enojado / enfadado',
    definitionEn: 'having a strong feeling against someone who has behaved badly',
    definitionEs: 'tener un fuerte disgusto o enojo con alguien que se portó mal',
    exampleEn: 'Mom was angry because I came home late.',
    exampleEs: 'Mamá estaba enojada porque llegué a casa tarde.',
    thumbnailImg: angryImg,
  },
  {
    id: 'best',
    word: 'best',
    partOfSpeech: 'adjective',
    translation: 'el mejor / la mejor',
    definitionEn: 'of the highest quality; better than all others',
    definitionEs: 'de la más alta calidad; mejor que todos los demás',
    exampleEn: "The food here is very good, it's the best restaurant in town.",
    exampleEs: 'La comida aquí es muy buena, es el mejor restaurante del pueblo.',
    thumbnailImg: bestImg,
  },
  {
    id: 'easy',
    word: 'easy',
    partOfSpeech: 'adjective',
    translation: 'fácil',
    definitionEn: 'not difficult; needing little effort',
    definitionEs: 'no difícil; que requiere poco esfuerzo',
    exampleEn: 'This puzzle is easy, I did it in two minutes.',
    exampleEs: 'Este rompecabezas es fácil, lo hice en dos minutos.',
    thumbnailImg: easyImg,
  },
  {
    id: 'pretty',
    word: 'pretty',
    partOfSpeech: 'adjective',
    translation: 'bonito / linda',
    definitionEn: 'attractive in appearance, especially in a delicate way',
    definitionEs: 'atractivo en apariencia, especialmente de forma agradable',
    exampleEn: 'What a pretty dress!',
    exampleEs: '¡Qué vestido tan bonito!',
    thumbnailImg: prettyImg,
  },
  {
    id: 'quick',
    word: 'quick',
    partOfSpeech: 'adjective',
    translation: 'rápido / rápida',
    definitionEn: 'done or happening fast or in a short time',
    definitionEs: 'hecho o que sucede rápido o en poco tiempo',
    exampleEn: 'I have time for a quick cup of coffee.',
    exampleEs: 'Tengo tiempo para una rápida taza de café.',
    thumbnailImg: quickImg,
  },
  {
    id: 'special',
    word: 'special',
    partOfSpeech: 'adjective',
    translation: 'especial',
    definitionEn: 'better, greater, or otherwise different from what is usual',
    definitionEs: 'mejor, mayor o diferente de lo habitual',
    exampleEn: 'I made a special cake for your birthday.',
    exampleEs: 'Hice un pastel especial para tu cumpleaños.',
    thumbnailImg: specialImg,
  },
  {
    id: 'strong',
    word: 'strong',
    partOfSpeech: 'adjective',
    translation: 'fuerte / resistente',
    definitionEn: 'solid and not easily broken, or having great physical power',
    definitionEs: 'sólido y que no se rompe fácilmente, o con gran fuerza física',
    exampleEn: 'These plates are very strong.',
    exampleEs: 'Estos platos son muy resistentes.',
    thumbnailImg: strongImg,
  },
  {
    id: 'wonderful',
    word: 'wonderful',
    partOfSpeech: 'adjective',
    translation: 'maravilloso / maravillosa',
    definitionEn: 'extremely good; marvellous',
    definitionEs: 'extremadamente bueno; estupendo o maravilloso',
    exampleEn: 'I just went for a long walk on the beach and I feel wonderful.',
    exampleEs: 'Acabo de dar un largo paseo por la playa y me siento de maravilla.',
    thumbnailImg: wonderfulImg,
  },
  {
    id: 'worst',
    word: 'worst',
    partOfSpeech: 'adjective',
    translation: 'el peor / la peor',
    definitionEn: 'of the poorest quality or the lowest standard; most unpleasant',
    definitionEs: 'de la peor calidad o el nivel más bajo; el más desagradable',
    exampleEn: 'This is the worst day of my life!',
    exampleEs: '¡Este es el peor día de mi vida!',
    thumbnailImg: worstImg,
  },
];

/* =========================================================================
   ACTIVITY 2: MATCHING OPPOSITES
   ========================================================================= */
export interface OppositeMatchItem {
  id: string;
  wordA: string;
  wordATranslation: string;
  oppositeB: string;
  oppositeBTranslation: string;
}

export const ADJECTIVES_OPPOSITES: OppositeMatchItem[] = [
  {
    id: 'pair-1',
    wordA: 'weak',
    wordATranslation: 'débil',
    oppositeB: 'strong',
    oppositeBTranslation: 'fuerte / resistente',
  },
  {
    id: 'pair-2',
    wordA: 'ugly',
    wordATranslation: 'feo',
    oppositeB: 'pretty',
    oppositeBTranslation: 'bonito / lindo',
  },
  {
    id: 'pair-3',
    wordA: 'calm',
    wordATranslation: 'tranquilo / calmado',
    oppositeB: 'angry',
    oppositeBTranslation: 'enojado / furioso',
  },
  {
    id: 'pair-4',
    wordA: 'worst',
    wordATranslation: 'el peor',
    oppositeB: 'best',
    oppositeBTranslation: 'el mejor',
  },
  {
    id: 'pair-5',
    wordA: 'terrible',
    wordATranslation: 'terrible',
    oppositeB: 'wonderful',
    oppositeBTranslation: 'maravilloso',
  },
  {
    id: 'pair-6',
    wordA: 'slow',
    wordATranslation: 'lento',
    oppositeB: 'quick',
    oppositeBTranslation: 'rápido',
  },
  {
    id: 'pair-7',
    wordA: 'difficult',
    wordATranslation: 'difícil',
    oppositeB: 'easy',
    oppositeBTranslation: 'fácil',
  },
];

/* =========================================================================
   ACTIVITIES 3 & 4: DICTATIONS
   ========================================================================= */
export interface DictationItem {
  id: string;
  sentenceEn: string;
  sentenceEs: string;
  targetWord: string;
}

export const DICTATION_ITEMS_PART_1: DictationItem[] = [
  {
    id: 'd1-1',
    sentenceEn: 'I did it alone because nobody wanted to help me.',
    sentenceEs: 'Lo hice solo porque nadie quería ayudarme.',
    targetWord: 'alone',
  },
  {
    id: 'd1-2',
    sentenceEn: 'Mom was angry because I came home late.',
    sentenceEs: 'Mamá estaba enojada porque llegué a casa tarde.',
    targetWord: 'angry',
  },
  {
    id: 'd1-3',
    sentenceEn: "The food here is very good, it's the best restaurant in town.",
    sentenceEs: 'La comida aquí es muy buena, es el mejor restaurante del pueblo.',
    targetWord: 'best',
  },
  {
    id: 'd1-4',
    sentenceEn: 'This puzzle is easy, I did it in two minutes.',
    sentenceEs: 'Este rompecabezas es fácil, lo hice en dos minutos.',
    targetWord: 'easy',
  },
  {
    id: 'd1-5',
    sentenceEn: 'What a pretty dress!',
    sentenceEs: '¡Qué vestido tan bonito!',
    targetWord: 'pretty',
  },
];

export const DICTATION_ITEMS_PART_2: DictationItem[] = [
  {
    id: 'd2-1',
    sentenceEn: 'I have time for a quick cup of coffee.',
    sentenceEs: 'Tengo tiempo para una rápida taza de café.',
    targetWord: 'quick',
  },
  {
    id: 'd2-2',
    sentenceEn: 'I made a special cake for your birthday.',
    sentenceEs: 'Hice un pastel especial para tu cumpleaños.',
    targetWord: 'special',
  },
  {
    id: 'd2-3',
    sentenceEn: 'These plates are very strong.',
    sentenceEs: 'Estos platos son muy resistentes.',
    targetWord: 'strong',
  },
  {
    id: 'd2-4',
    sentenceEn: 'I just went for a long walk on the beach and I feel wonderful.',
    sentenceEs: 'Acabo de dar un largo paseo por la playa y me siento de maravilla.',
    targetWord: 'wonderful',
  },
  {
    id: 'd2-5',
    sentenceEn: 'This is the worst day of my life!',
    sentenceEs: '¡Este es el peor día de mi vida!',
    targetWord: 'worst',
  },
];

/* =========================================================================
   ACTIVITY 5: DIALOGUE CLOZE (MARCY & JOHN)
   ========================================================================= */
export interface DialogueClozeLine {
  id: string;
  speaker: string;
  textEnTemplate: string; // e.g. "This is the {blank1} day of my life!"
  textEs: string;
  prefix?: string;
  blankId?: string;
  correctAnswer?: string;
  suffix?: string;
}

export const ACTIVITY_5_DIALOGUE = {
  title: 'Actividad 5',
  instructions: 'Drag the correct answer/s into place.',
  instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
  tokens: ['angry', 'worst', 'alone', 'easy', 'best'],
  lines: [
    {
      id: 'a5-l1',
      speaker: 'Marcy',
      prefix: 'This is the ',
      blankId: 'blank-1',
      correctAnswer: 'worst',
      suffix: ' day of my life!',
      fullTextEn: 'This is the worst day of my life!',
      fullTextEs: '¡Este es el peor día de mi vida!',
    },
    {
      id: 'a5-l2',
      speaker: 'John',
      fullTextEn: 'Ok. So you failed an exam. You can take it again.',
      fullTextEs: 'Bueno. Así que reprobaste un examen. Puedes volver a rendirlo.',
    },
    {
      id: 'a5-l3',
      speaker: 'Marcy',
      prefix: "It's ",
      blankId: 'blank-2',
      correctAnswer: 'easy',
      middle: " for you, John. You're the ",
      blankId2: 'blank-3',
      correctAnswer2: 'best',
      suffix: ' in the class.',
      fullTextEn: "It's easy for you, John. You're the best in the class.",
      fullTextEs: 'Es fácil para ti, John. Eres el mejor de la clase.',
    },
    {
      id: 'a5-l4',
      speaker: 'John',
      prefix: "Marcy, don't be ",
      blankId: 'blank-4',
      correctAnswer: 'angry',
      suffix: ' with me. Do you want me to come over?',
      fullTextEn: "Marcy, don't be angry with me. Do you want me to come over?",
      fullTextEs: 'Marcy, no te enojes conmigo. ¿Quieres que vaya?',
    },
    {
      id: 'a5-l5',
      speaker: 'Marcy',
      prefix: "Yes, I don't want to be ",
      blankId: 'blank-5',
      correctAnswer: 'alone',
      suffix: '.',
      fullTextEn: "Yes, I don't want to be alone.",
      fullTextEs: 'Sí, no quiero estar sola.',
    },
    {
      id: 'a5-l6',
      speaker: 'John',
      fullTextEn: "I'm on my way!",
      fullTextEs: '¡Voy en camino!',
    },
  ],
};

/* =========================================================================
   ACTIVITY 6: DIALOGUE DROPDOWNS (SON & MOM)
   ========================================================================= */
export const ACTIVITY_6_DIALOGUE = {
  title: 'Actividad 6',
  instructions: 'Select the correct answer from the drop-down list.',
  instructionsEs: 'Selecciona la respuesta correcta de la lista desplegable.',
  lines: [
    {
      id: 'a6-l1',
      speaker: 'Son',
      prefix: 'Mom, are you ',
      blankId: 'a6-b1',
      options: ['strong', 'easy', 'angry'],
      correctAnswer: 'angry',
      suffix: ' with me?',
      fullTextEn: 'Mom, are you angry with me?',
      fullTextEs: 'Mamá, ¿estás enojada conmigo?',
    },
    {
      id: 'a6-l2',
      speaker: 'Mom',
      prefix: "No, I'm just tired. I had the ",
      blankId: 'a6-b2',
      options: ['worst', 'best', 'quick'],
      correctAnswer: 'worst',
      suffix: ' day at work today. Everything went wrong.',
      fullTextEn:
        "No, I'm just tired. I had the worst day at work today. Everything went wrong.",
      fullTextEs:
        'No, solo estoy cansada. Tuve el peor día en el trabajo hoy. Todo salió mal.',
    },
    {
      id: 'a6-l3',
      speaker: 'Son',
      prefix: 'Let me make you a ',
      blankId: 'a6-b3',
      options: ['angry', 'easy', 'strong'],
      correctAnswer: 'strong',
      middle: ' cup of coffee and then you can be ',
      blankId2: 'a6-b4',
      options2: ['special', 'alone', 'angry'],
      correctAnswer2: 'alone',
      suffix: ' for a while.',
      fullTextEn:
        'Let me make you a strong cup of coffee and then you can be alone for a while.',
      fullTextEs:
        'Déjame prepararte una taza de café bien cargado y luego podrás estar sola un rato.',
    },
    {
      id: 'a6-l4',
      speaker: 'Mom',
      prefix: 'Thank you. You are ',
      blankId: 'a6-b5',
      options: ['wonderful', 'pretty', 'best'],
      correctAnswer: 'wonderful',
      suffix: '!',
      fullTextEn: 'Thank you. You are wonderful!',
      fullTextEs: 'Gracias. ¡Eres maravilloso!',
    },
  ],
};

/* =========================================================================
   ACTIVITY 7: STORY CLOZE (KAREN & LISA)
   ========================================================================= */
export const ACTIVITY_7_STORY = {
  title: 'Actividad 7',
  instructions: 'Drag the correct answer/s into place.',
  instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
  tokens: ['special', 'pretty', 'wonderful', 'quick'],
  paragraphs: [
    {
      id: 'a7-p1',
      prefix:
        'Karen wanted to buy a new dress. "Let\'s go to the department store at lunch time," she said to Lisa, her best friend. "We only have an hour for lunch. Can we be ',
      blankId: 'a7-b1',
      correctAnswer: 'quick',
      suffix: '?" asked Lisa.',
      fullTextEn:
        'Karen wanted to buy a new dress. "Let\'s go to the department store at lunch time," she said to Lisa, her best friend. "We only have an hour for lunch. Can we be quick?" asked Lisa.',
      fullTextEs:
        'Karen quería comprar un vestido nuevo. "Vayamos a la tienda departamental a la hora del almuerzo", le dijo a Lisa, su mejor amiga. "Solo tenemos una hora para almorzar. ¿Podemos ser rápidas?", preguntó Lisa.',
    },
    {
      id: 'a7-p2',
      prefix:
        '"Sure we can," said Karen. The two girls looked at dresses. "Look, this one is very ',
      blankId: 'a7-b2',
      correctAnswer: 'pretty',
      middle: '. It\'s thirty percent off, too. That\'s a very ',
      blankId2: 'a7-b3',
      correctAnswer2: 'special',
      suffix: ' price," said Lisa.',
      fullTextEn:
        '"Sure we can," said Karen. The two girls looked at dresses. "Look, this one is very pretty. It\'s thirty percent off, too. That\'s a very special price," said Lisa.',
      fullTextEs:
        '"¡Seguro que sí!", dijo Karen. Las dos chicas miraron vestidos. "Mira, este es muy bonito. Además tiene un treinta por ciento de descuento. Es un precio muy especial", dijo Lisa.',
    },
    {
      id: 'a7-p3',
      prefix: '"Oh, ',
      blankId: 'a7-b4',
      correctAnswer: 'wonderful',
      suffix: '! I\'m going to buy it!" said Karen.',
      fullTextEn: '"Oh, wonderful! I\'m going to buy it!" said Karen.',
      fullTextEs: '¡Oh, maravilloso! ¡Lo voy a comprar!',
    },
  ],
};

/* =========================================================================
   TESTS 1..10 (10 TEST QUESTIONS)
   ========================================================================= */
export interface Adjectives2TestItem {
  id: string;
  testNumber: number;
  instructions: string;
  instructionsEs: string;
  prefix: string;
  suffix: string;
  options: string[];
  correctAnswer: string;
  fullSentenceEn: string;
  fullSentenceEs: string;
}

export const ADJECTIVES_2_TESTS: Adjectives2TestItem[] = [
  {
    id: 'test-1',
    testNumber: 1,
    instructions: 'Select the correct answer from the drop-down list.',
    instructionsEs: 'Selecciona la respuesta correcta de la lista desplegable.',
    prefix: 'After her mother died, she was ',
    suffix: '.',
    options: ['special', 'alone', 'quick'],
    correctAnswer: 'alone',
    fullSentenceEn: 'After her mother died, she was alone.',
    fullSentenceEs: 'Después de que su madre murió, ella estaba sola.',
  },
  {
    id: 'test-2',
    testNumber: 2,
    instructions: 'Select the correct answer from the drop-down list.',
    instructionsEs: 'Selecciona la respuesta correcta de la lista desplegable.',
    prefix: 'The teacher is ',
    suffix: ' with the students because they are not doing their homework.',
    options: ['alone', 'angry', 'pretty'],
    correctAnswer: 'angry',
    fullSentenceEn:
      'The teacher is angry with the students because they are not doing their homework.',
    fullSentenceEs:
      'El profesor está enojado con los estudiantes porque no están haciendo su tarea.',
  },
  {
    id: 'test-3',
    testNumber: 3,
    instructions: 'Select the correct answer from the drop-down list.',
    instructionsEs: 'Selecciona la respuesta correcta de la lista desplegable.',
    prefix: 'These apples are the ',
    suffix: ' for cooking.',
    options: ['wonderful', 'strong', 'best'],
    correctAnswer: 'best',
    fullSentenceEn: 'These apples are the best for cooking.',
    fullSentenceEs: 'Estas manzanas son las mejores para cocinar.',
  },
  {
    id: 'test-4',
    testNumber: 4,
    instructions: 'Select the correct answer from the drop-down list.',
    instructionsEs: 'Selecciona la respuesta correcta de la lista desplegable.',
    prefix: 'The homework was really ',
    suffix: '. I finished it in ten minutes.',
    options: ['easy', 'angry', 'quick'],
    correctAnswer: 'easy',
    fullSentenceEn: 'The homework was really easy. I finished it in ten minutes.',
    fullSentenceEs: 'La tarea fue realmente fácil. La terminé en diez minutos.',
  },
  {
    id: 'test-5',
    testNumber: 5,
    instructions: 'Select the correct answer from the drop-down list.',
    instructionsEs: 'Selecciona la respuesta correcta de la lista desplegable.',
    prefix: 'The girl is very ',
    suffix: '. I can see why all the boys like her!',
    options: ['angry', 'strong', 'pretty'],
    correctAnswer: 'pretty',
    fullSentenceEn:
      'The girl is very pretty. I can see why all the boys like her!',
    fullSentenceEs:
      'La chica es muy bonita. ¡Puedo ver por qué le gusta a todos los chicos!',
  },
  {
    id: 'test-6',
    testNumber: 6,
    instructions: 'Select the correct answer from the drop-down list.',
    instructionsEs: 'Selecciona la respuesta correcta de la lista desplegable.',
    prefix: 'I made a ',
    suffix: ' phone call to my parents.',
    options: ['pretty', 'quick', 'alone'],
    correctAnswer: 'quick',
    fullSentenceEn: 'I made a quick phone call to my parents.',
    fullSentenceEs: 'Hice una llamada telefónica rápida a mis padres.',
  },
  {
    id: 'test-7',
    testNumber: 7,
    instructions: 'Select the correct answer from the drop-down list.',
    instructionsEs: 'Selecciona la respuesta correcta de la lista desplegable.',
    prefix: 'The store manager gave me a ',
    suffix: ' price for the sofa.',
    options: ['special', 'worst', 'best'],
    correctAnswer: 'special',
    fullSentenceEn: 'The store manager gave me a special price for the sofa.',
    fullSentenceEs:
      'El gerente de la tienda me dio un precio especial por el sofá.',
  },
  {
    id: 'test-8',
    testNumber: 8,
    instructions: 'Select the correct answer from the drop-down list.',
    instructionsEs: 'Selecciona la respuesta correcta de la lista desplegable.',
    prefix: 'Do you have a ',
    suffix: ' suitcase to take on vacation?',
    options: ['wonderful', 'angry', 'strong'],
    correctAnswer: 'strong',
    fullSentenceEn: 'Do you have a strong suitcase to take on vacation?',
    fullSentenceEs: '¿Tienes una maleta resistente para llevar de vacaciones?',
  },
  {
    id: 'test-9',
    testNumber: 9,
    instructions: 'Select the correct answer from the drop-down list.',
    instructionsEs: 'Selecciona la respuesta correcta de la lista desplegable.',
    prefix: 'Last night, I saw a ',
    suffix: ' movie; I would see it again!',
    // In screenshot test 9: "Last night, I saw a [dropdown] movie; I would see it again!"
    options: ['easy', 'best', 'wonderful'],
    correctAnswer: 'wonderful',
    fullSentenceEn: 'Last night, I saw a wonderful movie; I would see it again!',
    fullSentenceEs:
      'Anoche vi una película maravillosa; ¡la vería de nuevo!',
  },
  {
    id: 'test-10',
    testNumber: 10,
    instructions: 'Select the correct answer from the drop-down list.',
    instructionsEs: 'Selecciona la respuesta correcta de la lista desplegable.',
    prefix: 'He was the ',
    suffix: ' in his class at math. He failed all his tests.',
    options: ['angry', 'best', 'worst'],
    correctAnswer: 'worst',
    fullSentenceEn:
      'He was the worst in his class at math. He failed all his tests.',
    fullSentenceEs:
      'Él era el peor de su clase en matemáticas. Reprobó todos sus exámenes.',
  },
];
