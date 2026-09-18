import madMosStoreImg from '../assets/images/mad_mos_store_1789686033196.jpg';

export { madMosStoreImg };

export interface ComparisonDialogueLine {
  textEn: string;
  textEs: string;
  hasBlank?: boolean;
  prefix?: string;
  suffix?: string;
}

export interface ComparisonOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface ComparisonActivityData {
  id: string;
  activityNumber: number;
  instructions: string;
  instructionsEs: string;
  imageUrl: string;
  referenceText: string;
  referenceTextEs: string;
  referenceHighlights: string[];
  dialogueLines: ComparisonDialogueLine[];
  options: ComparisonOption[];
  correctAnswerId: string;
  audioPrompt: string;
  explanationEn: string;
  explanationEs: string;
}

export interface ComparisonTestData {
  id: string;
  testNumber: number;
  instructions: string;
  instructionsEs: string;
  imageUrl: string;
  referenceText: string;
  referenceTextEs: string;
  referenceHighlights: string[];
  dialogueLines: ComparisonDialogueLine[];
  options: ComparisonOption[];
  correctAnswerId: string;
  audioPrompt: string;
  explanationEn: string;
  explanationEs: string;
}

export const SUPERLATIVES_REFERENCE_EN =
  "- Come to Mad Mo's. We have the cheapest, the biggest, the most terrific store in New York! We are the best!";
export const SUPERLATIVES_REFERENCE_ES =
  "- ¡Vengan a Mad Mo's! ¡Tenemos la tienda más barata, más grande y más fantástica de Nueva York! ¡Somos los mejores!";
export const SUPERLATIVES_HIGHLIGHTS = [
  'the cheapest',
  'the biggest',
  'the most terrific',
  'the best',
];

// Explore / Actividad 1
export const SUPERLATIVES_ACTIVITY_1 = {
  id: 'comparison-superlatives-act-1',
  activityNumber: 1,
  titleEn: 'Explore',
  titleEs: 'Explorar',
  audioText:
    "Come to Mad Mo's. We have the cheapest, the biggest, the most terrific store in New York! We are the best!",
  textEn:
    "- Come to Mad Mo's. We have the cheapest, the biggest, the most terrific store in New York! We are the best!",
  textEs:
    "- ¡Vengan a Mad Mo's! ¡Tenemos la tienda más barata, más grande y más fantástica de Nueva York! ¡Somos los mejores!",
  highlights: ['the cheapest', 'the biggest', 'the most terrific', 'the best'],
  imageUrl: madMosStoreImg,
  durationSeconds: 7,
};

// Actividades 2 a 11
export const SUPERLATIVES_ACTIVITIES: ComparisonActivityData[] = [
  /* Actividad 2 (actividad 2.png) */
  {
    id: 'comparison-superlatives-act-2',
    activityNumber: 2,
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    imageUrl: madMosStoreImg,
    referenceText: SUPERLATIVES_REFERENCE_EN,
    referenceTextEs: SUPERLATIVES_REFERENCE_ES,
    referenceHighlights: SUPERLATIVES_HIGHLIGHTS,
    dialogueLines: [
      {
        textEn:
          'I looked at three cars before I bought one. My favorite was ________ expensive one.',
        textEs:
          'Miré tres autos antes de comprar uno. Mi favorito fue el más costoso.',
        hasBlank: true,
        prefix:
          'I looked at three cars before I bought one. My favorite was ',
        suffix: ' expensive one.',
      },
    ],
    options: [
      { id: 'opt-2-the-more', text: 'the more', isCorrect: false },
      { id: 'opt-2-the-most', text: 'the most', isCorrect: true },
      { id: 'opt-2-more', text: 'more', isCorrect: false },
    ],
    correctAnswerId: 'opt-2-the-most',
    audioPrompt:
      'I looked at three cars before I bought one. My favorite was the most expensive one.',
    explanationEn:
      "We use 'the most' before multi-syllable adjectives like 'expensive' to form the superlative degree: 'the most expensive one'.",
    explanationEs:
      "Usamos 'the most' delante de adjetivos largos de varias sílabas como 'expensive' (costoso) para formar el superlativo: 'the most expensive one' (el más costoso).",
  },

  /* Actividad 3 (actividad 3.png) */
  {
    id: 'comparison-superlatives-act-3',
    activityNumber: 3,
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    imageUrl: madMosStoreImg,
    referenceText: SUPERLATIVES_REFERENCE_EN,
    referenceTextEs: SUPERLATIVES_REFERENCE_ES,
    referenceHighlights: SUPERLATIVES_HIGHLIGHTS,
    dialogueLines: [
      {
        textEn:
          'The Martins\' baby is six months old. They think she is the ________ baby in the world.',
        textEs:
          'El bebé de los Martin tiene seis meses. Ellos piensan que es la bebé más inteligente del mundo.',
        hasBlank: true,
        prefix:
          'The Martins\' baby is six months old. They think she is the ',
        suffix: ' baby in the world.',
      },
    ],
    options: [
      { id: 'opt-3-so-smart', text: 'so smart', isCorrect: false },
      { id: 'opt-3-smart', text: 'smart', isCorrect: false },
      { id: 'opt-3-smartest', text: 'smartest', isCorrect: true },
      { id: 'opt-3-smarter', text: 'smarter', isCorrect: false },
    ],
    correctAnswerId: 'opt-3-smartest',
    audioPrompt:
      "The Martins' baby is six months old. They think she is the smartest baby in the world.",
    explanationEn:
      "For one-syllable adjectives like 'smart', we add '-est' to form the superlative: 'the smartest'.",
    explanationEs:
      "Para adjetivos cortos de una sílaba como 'smart' (inteligente), añadimos el sufijo '-est' para formar el superlativo: 'the smartest' (la más inteligente).",
  },

  /* Actividad 4 (actividad 4.png) */
  {
    id: 'comparison-superlatives-act-4',
    activityNumber: 4,
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    imageUrl: madMosStoreImg,
    referenceText: SUPERLATIVES_REFERENCE_EN,
    referenceTextEs: SUPERLATIVES_REFERENCE_ES,
    referenceHighlights: SUPERLATIVES_HIGHLIGHTS,
    dialogueLines: [
      {
        textEn: '- Did you see a lot of movies during the summer?',
        textEs: '- ¿Viste muchas películas durante el verano?',
      },
      {
        textEn:
          '- I saw at least six. "Losing You" was my favorite. It was the sad________ movie!',
        textEs:
          '- Vi al menos seis. "Losing You" fue mi favorita. ¡Fue la película más triste!',
        hasBlank: true,
        prefix:
          '- I saw at least six. "Losing You" was my favorite. It was the sad',
        suffix: ' movie!',
      },
    ],
    options: [
      { id: 'opt-4-est', text: 'est', isCorrect: false },
      { id: 'opt-4-er', text: 'er', isCorrect: false },
      { id: 'opt-4-der', text: 'der', isCorrect: false },
      { id: 'opt-4-dest', text: 'dest', isCorrect: true },
    ],
    correctAnswerId: 'opt-4-dest',
    audioPrompt:
      '- Did you see a lot of movies during the summer? - I saw at least six. "Losing You" was my favorite. It was the saddest movie!',
    explanationEn:
      "When a single-syllable adjective ends with consonant-vowel-consonant (C-V-C), the final consonant is doubled before '-est': 'sad' becomes 'saddest'. Since 'sad' is given, we append 'dest'.",
    explanationEs:
      "Cuando un adjetivo de una sílaba termina en consonante-vocal-consonante (sad), se duplica la consonante final 'd' antes de añadir '-est': 'sad' -> 'saddest'. Como 'sad' ya está escrito, completamos con 'dest'.",
  },

  /* Actividad 5 (actividad 5.png) */
  {
    id: 'comparison-superlatives-act-5',
    activityNumber: 5,
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    imageUrl: madMosStoreImg,
    referenceText: SUPERLATIVES_REFERENCE_EN,
    referenceTextEs: SUPERLATIVES_REFERENCE_ES,
    referenceHighlights: SUPERLATIVES_HIGHLIGHTS,
    dialogueLines: [
      {
        textEn:
          'Julia studied Russian, Chinese, and Spanish in school. For her, Chinese was ________ language.',
        textEs:
          'Julia estudió ruso, chino y español en la escuela. Para ella, el chino fue el idioma más difícil.',
        hasBlank: true,
        prefix:
          'Julia studied Russian, Chinese, and Spanish in school. For her, Chinese was ',
        suffix: ' language.',
      },
    ],
    options: [
      { id: 'opt-5-the-very-hard', text: 'the very hard', isCorrect: false },
      { id: 'opt-5-the-hardest', text: 'the hardest', isCorrect: true },
      { id: 'opt-5-harder', text: 'harder', isCorrect: false },
      { id: 'opt-5-hardest', text: 'hardest', isCorrect: false },
    ],
    correctAnswerId: 'opt-5-the-hardest',
    audioPrompt:
      'Julia studied Russian, Chinese, and Spanish in school. For her, Chinese was the hardest language.',
    explanationEn:
      "Superlatives require the definite article 'the' plus the superlative adjective. For 'hard', we use 'the hardest'.",
    explanationEs:
      "Los superlativos requieren el artículo definido 'the' más la forma superlativa. Para 'hard' (difícil), la forma correcta es 'the hardest' (el más difícil).",
  },

  /* Actividad 6 (actividad 6.png) */
  {
    id: 'comparison-superlatives-act-6',
    activityNumber: 6,
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    imageUrl: madMosStoreImg,
    referenceText: SUPERLATIVES_REFERENCE_EN,
    referenceTextEs: SUPERLATIVES_REFERENCE_ES,
    referenceHighlights: SUPERLATIVES_HIGHLIGHTS,
    dialogueLines: [
      {
        textEn:
          'Terry traveled around Europe last summer. He thought France had ________ beaches.',
        textEs:
          'Terry viajó por Europa el verano pasado. Pensó que Francia tenía las playas más hermosas.',
        hasBlank: true,
        prefix:
          'Terry traveled around Europe last summer. He thought France had ',
        suffix: ' beaches.',
      },
    ],
    options: [
      { id: 'opt-6-the-beautiful', text: 'the beautiful', isCorrect: false },
      { id: 'opt-6-the-most-beautiful', text: 'the most beautiful', isCorrect: true },
      { id: 'opt-6-as-beautiful', text: 'as beautiful', isCorrect: false },
      { id: 'opt-6-more-beautiful', text: 'more beautiful', isCorrect: false },
    ],
    correctAnswerId: 'opt-6-the-most-beautiful',
    audioPrompt:
      'Terry traveled around Europe last summer. He thought France had the most beautiful beaches.',
    explanationEn:
      "For long adjectives of three or more syllables like 'beautiful', we use 'the most beautiful' to express the superlative.",
    explanationEs:
      "Para adjetivos largos de tres o más sílabas como 'beautiful' (hermoso), usamos 'the most beautiful' (las más hermosas).",
  },

  /* Actividad 7 (actividad 7.png) */
  {
    id: 'comparison-superlatives-act-7',
    activityNumber: 7,
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    imageUrl: madMosStoreImg,
    referenceText: SUPERLATIVES_REFERENCE_EN,
    referenceTextEs: SUPERLATIVES_REFERENCE_ES,
    referenceHighlights: SUPERLATIVES_HIGHLIGHTS,
    dialogueLines: [
      {
        textEn:
          "Oh, no! I got 20% on the test. That's the ________ grade in the class!",
        textEs:
          '¡Oh, no! Obtuve 20% en la prueba. ¡Esa es la peor calificación de la clase!',
        hasBlank: true,
        prefix:
          "Oh, no! I got 20% on the test. That's the ",
        suffix: ' grade in the class!',
      },
    ],
    options: [
      { id: 'opt-7-bad', text: 'bad', isCorrect: false },
      { id: 'opt-7-worse-than', text: 'worse than', isCorrect: false },
      { id: 'opt-7-worst', text: 'worst', isCorrect: true },
      { id: 'opt-7-worse', text: 'worse', isCorrect: false },
    ],
    correctAnswerId: 'opt-7-worst',
    audioPrompt:
      "Oh, no! I got 20% on the test. That's the worst grade in the class!",
    explanationEn:
      "'Bad' is an irregular adjective: bad -> worse -> worst. Since 'the' is already present, we insert 'worst'.",
    explanationEs:
      "'Bad' (malo) es un adjetivo irregular: bad -> worse -> worst. Como 'the' ya está presente en la oración, completamos con 'worst' (la peor).",
  },

  /* Actividad 8 (actividad 8.png) */
  {
    id: 'comparison-superlatives-act-8',
    activityNumber: 8,
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    imageUrl: madMosStoreImg,
    referenceText: SUPERLATIVES_REFERENCE_EN,
    referenceTextEs: SUPERLATIVES_REFERENCE_ES,
    referenceHighlights: SUPERLATIVES_HIGHLIGHTS,
    dialogueLines: [
      {
        textEn:
          "Sally likes all of her classes except history. It's the ________ one for her.",
        textEs:
          'A Sally le gustan todas sus clases excepto historia. Es la menos interesante para ella.',
        hasBlank: true,
        prefix:
          "Sally likes all of her classes except history. It's the ",
        suffix: ' one for her.',
      },
    ],
    options: [
      { id: 'opt-8-less-interesting', text: 'less interesting', isCorrect: false },
      { id: 'opt-8-least-interesting', text: 'least interesting', isCorrect: true },
      { id: 'opt-8-more-boring', text: 'more boring', isCorrect: false },
      { id: 'opt-8-not-as-interesting', text: 'not as interesting', isCorrect: false },
    ],
    correctAnswerId: 'opt-8-least-interesting',
    audioPrompt:
      "Sally likes all of her classes except history. It's the least interesting one for her.",
    explanationEn:
      "To show the lowest degree (superlative of inferiority), we use 'the least + adjective': 'the least interesting'.",
    explanationEs:
      "Para expresar el grado más bajo (superlativo de inferioridad), usamos 'the least + adjetivo': 'the least interesting' (la menos interesante).",
  },

  /* Actividad 9 (actividad 9.png) */
  {
    id: 'comparison-superlatives-act-9',
    activityNumber: 9,
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    imageUrl: madMosStoreImg,
    referenceText: SUPERLATIVES_REFERENCE_EN,
    referenceTextEs: SUPERLATIVES_REFERENCE_ES,
    referenceHighlights: SUPERLATIVES_HIGHLIGHTS,
    dialogueLines: [
      {
        textEn:
          'August is ________ hottest month of the year in New York.',
        textEs:
          'Agosto es el mes más caluroso del año en Nueva York.',
        hasBlank: true,
        prefix: 'August is ',
        suffix: ' hottest month of the year in New York.',
      },
    ],
    options: [
      { id: 'opt-9-the', text: 'the', isCorrect: true },
      { id: 'opt-9-an', text: 'an', isCorrect: false },
      { id: 'opt-9-a', text: 'a', isCorrect: false },
      { id: 'opt-9-one', text: 'one', isCorrect: false },
    ],
    correctAnswerId: 'opt-9-the',
    audioPrompt:
      'August is the hottest month of the year in New York.',
    explanationEn:
      "Superlative adjectives like 'hottest' require the definite article 'the': 'the hottest month'.",
    explanationEs:
      "Los adjetivos superlativos como 'hottest' requieren el artículo definido 'the': 'the hottest month' (el mes más caluroso).",
  },

  /* Actividad 10 (actividad 10.png) */
  {
    id: 'comparison-superlatives-act-10',
    activityNumber: 10,
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    imageUrl: madMosStoreImg,
    referenceText: SUPERLATIVES_REFERENCE_EN,
    referenceTextEs: SUPERLATIVES_REFERENCE_ES,
    referenceHighlights: SUPERLATIVES_HIGHLIGHTS,
    dialogueLines: [
      {
        textEn:
          "Mr. Carlton always stays at the Three Seasons Hotel in Montreal. It's ________ in the city.",
        textEs:
          'El Sr. Carlton siempre se hospeda en el Hotel Three Seasons en Montreal. Es el mejor hotel de la ciudad.',
        hasBlank: true,
        prefix:
          "Mr. Carlton always stays at the Three Seasons Hotel in Montreal. It's ",
        suffix: ' in the city.',
      },
    ],
    options: [
      { id: 'opt-10-best-hotel', text: 'best hotel', isCorrect: false },
      { id: 'opt-10-better-hotel', text: 'better hotel', isCorrect: false },
      { id: 'opt-10-the-best-hotel', text: 'the best hotel', isCorrect: true },
      { id: 'opt-10-good-hotel', text: 'good hotel', isCorrect: false },
    ],
    correctAnswerId: 'opt-10-the-best-hotel',
    audioPrompt:
      "Mr. Carlton always stays at the Three Seasons Hotel in Montreal. It's the best hotel in the city.",
    explanationEn:
      "'Good' has the irregular superlative form 'the best'. Together with the noun, the phrase is 'the best hotel'.",
    explanationEs:
      "'Good' (bueno) tiene la forma superlativa irregular 'the best' (el mejor). Junto con el sustantivo, la frase completa es 'the best hotel'.",
  },

  /* Actividad 11 (actividad 11.png) */
  {
    id: 'comparison-superlatives-act-11',
    activityNumber: 11,
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    imageUrl: madMosStoreImg,
    referenceText: SUPERLATIVES_REFERENCE_EN,
    referenceTextEs: SUPERLATIVES_REFERENCE_ES,
    referenceHighlights: SUPERLATIVES_HIGHLIGHTS,
    dialogueLines: [
      {
        textEn:
          'Sari is ________ shortest girl in the neighborhood.',
        textEs:
          'Sari es la chica más baja del vecindario.',
        hasBlank: true,
        prefix: 'Sari is ',
        suffix: ' shortest girl in the neighborhood.',
      },
    ],
    options: [
      { id: 'opt-11-the', text: 'the', isCorrect: true },
      { id: 'opt-11-very', text: 'very', isCorrect: false },
      { id: 'opt-11-a', text: 'a', isCorrect: false },
    ],
    correctAnswerId: 'opt-11-the',
    audioPrompt:
      'Sari is the shortest girl in the neighborhood.',
    explanationEn:
      "The superlative 'shortest' must be preceded by 'the': 'the shortest girl in the neighborhood'.",
    explanationEs:
      "El superlativo 'shortest' debe ir precedido por 'the': 'the shortest girl' (la chica más baja).",
  },
];

// Actividad 12: Test (con 5 tests: test 1, test 2, test 3, test 4, test 5)
export const SUPERLATIVES_TESTS: ComparisonTestData[] = [
  /* Test 1 (test 1.png) */
  {
    id: 'comparison-superlatives-test-1',
    testNumber: 1,
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    imageUrl: madMosStoreImg,
    referenceText: SUPERLATIVES_REFERENCE_EN,
    referenceTextEs: SUPERLATIVES_REFERENCE_ES,
    referenceHighlights: SUPERLATIVES_HIGHLIGHTS,
    dialogueLines: [
      {
        textEn:
          '- Who do you think is ________ handsome actor in Hollywood?',
        textEs:
          '- ¿Quién crees que es el actor más atractivo de Hollywood?',
        hasBlank: true,
        prefix: '- Who do you think is ',
        suffix: ' handsome actor in Hollywood?',
      },
      {
        textEn: "- I think it's Robby MacIntyre.",
        textEs: '- Creo que es Robby MacIntyre.',
      },
      {
        textEn: '- Really?',
        textEs: '- ¿De verdad?',
      },
    ],
    options: [
      { id: 'test-1-the-best', text: 'the best', isCorrect: false },
      { id: 'test-1-the-most', text: 'the most', isCorrect: true },
      { id: 'test-1-the-very', text: 'the very', isCorrect: false },
      { id: 'test-1-more', text: 'more', isCorrect: false },
    ],
    correctAnswerId: 'test-1-the-most',
    audioPrompt:
      "- Who do you think is the most handsome actor in Hollywood? - I think it's Robby MacIntyre. - Really?",
    explanationEn:
      "For adjectives with multiple syllables like 'handsome', we use 'the most' before the adjective: 'the most handsome actor'.",
    explanationEs:
      "Para adjetivos de dos o más sílabas como 'handsome' (atractivo), usamos 'the most' delante del adjetivo: 'the most handsome actor' (el actor más atractivo).",
  },

  /* Test 2 (test 2.png) */
  {
    id: 'comparison-superlatives-test-2',
    testNumber: 2,
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    imageUrl: madMosStoreImg,
    referenceText: SUPERLATIVES_REFERENCE_EN,
    referenceTextEs: SUPERLATIVES_REFERENCE_ES,
    referenceHighlights: SUPERLATIVES_HIGHLIGHTS,
    dialogueLines: [
      {
        textEn: '- What kind of car did Jim buy?',
        textEs: '- ¿Qué tipo de auto compró Jim?',
      },
      {
        textEn: "- A Flash. It's ________ car in the world.",
        textEs: '- Un Flash. Es el auto más rápido del mundo.',
        hasBlank: true,
        prefix: "- A Flash. It's ",
        suffix: ' car in the world.',
      },
      {
        textEn: "- No, it isn't.",
        textEs: '- No, no lo es.',
      },
      {
        textEn: '- Yes, it is.',
        textEs: '- Sí, sí lo es.',
      },
    ],
    options: [
      { id: 'test-2-the-fastest', text: 'the fastest', isCorrect: true },
      { id: 'test-2-the-very-fast', text: 'the very fast', isCorrect: false },
      { id: 'test-2-a-faster', text: 'a faster', isCorrect: false },
    ],
    correctAnswerId: 'test-2-the-fastest',
    audioPrompt:
      "- What kind of car did Jim buy? - A Flash. It's the fastest car in the world. - No, it isn't. - Yes, it is.",
    explanationEn:
      "'Fast' is a one-syllable adjective. The superlative is formed with 'the' + '-est': 'the fastest car'.",
    explanationEs:
      "'Fast' (rápido) es un adjetivo de una sílaba. El superlativo se construye con 'the' + '-est': 'the fastest car' (el auto más rápido).",
  },

  /* Test 3 (test 3.png) */
  {
    id: 'comparison-superlatives-test-3',
    testNumber: 3,
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    imageUrl: madMosStoreImg,
    referenceText: SUPERLATIVES_REFERENCE_EN,
    referenceTextEs: SUPERLATIVES_REFERENCE_ES,
    referenceHighlights: SUPERLATIVES_HIGHLIGHTS,
    dialogueLines: [
      {
        textEn:
          'It rained every day of my vacation. It was the ________ weather!',
        textEs:
          'Llovió todos los días de mis vacaciones. ¡Fue el peor clima!',
        hasBlank: true,
        prefix: 'It rained every day of my vacation. It was the ',
        suffix: ' weather!',
      },
    ],
    options: [
      { id: 'test-3-terrible', text: 'terrible', isCorrect: false },
      { id: 'test-3-very-bad', text: 'very bad', isCorrect: false },
      { id: 'test-3-worse', text: 'worse', isCorrect: false },
      { id: 'test-3-worst', text: 'worst', isCorrect: true },
    ],
    correctAnswerId: 'test-3-worst',
    audioPrompt:
      'It rained every day of my vacation. It was the worst weather!',
    explanationEn:
      "'Bad' has the irregular superlative form 'worst'. Following 'the', we place 'worst': 'the worst weather'.",
    explanationEs:
      "'Bad' tiene la forma superlativa irregular 'worst'. Precedido por 'the', colocamos 'worst': 'the worst weather' (el peor clima).",
  },

  /* Test 4 (test 4.png) */
  {
    id: 'comparison-superlatives-test-4',
    testNumber: 4,
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    imageUrl: madMosStoreImg,
    referenceText: SUPERLATIVES_REFERENCE_EN,
    referenceTextEs: SUPERLATIVES_REFERENCE_ES,
    referenceHighlights: SUPERLATIVES_HIGHLIGHTS,
    dialogueLines: [
      {
        textEn:
          "Maria and Jerry are studying for a test. It's ________ test of the year.",
        textEs:
          'Maria y Jerry están estudiando para un examen. Es el examen más importante del año.',
        hasBlank: true,
        prefix:
          "Maria and Jerry are studying for a test. It's ",
        suffix: ' test of the year.',
      },
    ],
    options: [
      { id: 'test-4-a-more-important', text: 'a more important', isCorrect: false },
      { id: 'test-4-as-important-as', text: 'as important as', isCorrect: false },
      { id: 'test-4-the-most-important', text: 'the most important', isCorrect: true },
      { id: 'test-4-more-important', text: 'more important', isCorrect: false },
    ],
    correctAnswerId: 'test-4-the-most-important',
    audioPrompt:
      "Maria and Jerry are studying for a test. It's the most important test of the year.",
    explanationEn:
      "For multi-syllable adjectives like 'important', we use 'the most' to form the superlative: 'the most important test'.",
    explanationEs:
      "Para adjetivos largos como 'important', usamos 'the most' para formar el superlativo: 'the most important test' (el examen más importante).",
  },

  /* Test 5 (test 5.png) */
  {
    id: 'comparison-superlatives-test-5',
    testNumber: 5,
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    imageUrl: madMosStoreImg,
    referenceText: SUPERLATIVES_REFERENCE_EN,
    referenceTextEs: SUPERLATIVES_REFERENCE_ES,
    referenceHighlights: SUPERLATIVES_HIGHLIGHTS,
    dialogueLines: [
      {
        textEn: '- Did you hear the ________ news?',
        textEs: '- ¿Escuchaste las últimas noticias?',
        hasBlank: true,
        prefix: '- Did you hear the ',
        suffix: ' news?',
      },
      {
        textEn: '- No. What happened?',
        textEs: '- No. ¿Qué pasó?',
      },
      {
        textEn: '- The princess had a baby boy.',
        textEs: '- La princesa tuvo un varoncito.',
      },
      {
        textEn: '- Oh, wow!',
        textEs: '- ¡Oh, vaya!',
      },
    ],
    options: [
      { id: 'test-5-latest', text: 'latest', isCorrect: true },
      { id: 'test-5-very-late', text: 'very late', isCorrect: false },
      { id: 'test-5-as-late-as', text: 'as late as', isCorrect: false },
      { id: 'test-5-later', text: 'later', isCorrect: false },
    ],
    correctAnswerId: 'test-5-latest',
    audioPrompt:
      '- Did you hear the latest news? - No. What happened? - The princess had a baby boy. - Oh, wow!',
    explanationEn:
      "'Latest' is the superlative of 'late' meaning 'most recent': 'the latest news'.",
    explanationEs:
      "'Latest' es el superlativo de 'late' con el sentido de 'lo más reciente': 'the latest news' (las últimas / más recientes noticias).",
  },
];
