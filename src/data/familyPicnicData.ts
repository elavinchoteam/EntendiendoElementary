export interface FamilyPicnicParagraph {
  id: string;
  en: string;
  es: string;
}

export const FAMILY_PICNIC_STORY_PARAGRAPHS: FamilyPicnicParagraph[] = [
  {
    id: 'p1',
    en: 'It was a Sunday morning and I was very excited. My big sister was coming home for a visit. My mother decided to have a family reunion. So she invited our relatives to a picnic in the park. I helped my father get the food ready. I even helped him make his famous potato salad.',
    es: 'Era un domingo por la mañana y yo estaba muy emocionado(a). Mi hermana mayor venía a casa de visita. Mi madre decidió hacer una reunión familiar. Así que invitó a nuestros parientes a un picnic en el parque. Ayudé a mi padre a preparar la comida. Incluso lo ayudé a hacer su famosa ensalada de papa.',
  },
  {
    id: 'p2',
    en: 'Just as my aunts, uncles, and cousins began to arrive, my sister phoned. "My car broke down," she told my mother, sadly. "I can\'t come to the picnic."',
    es: 'Justo cuando mis tías, tíos y primos comenzaron a llegar, mi hermana llamó por teléfono. "Mi auto se averió", le dijo a mi madre, tristemente. "No puedo ir al picnic".',
  },
  {
    id: 'p3',
    en: 'But then my mother had an idea. We packed up the food and got into our cars. Two hours later, we knocked on my sister\'s door.',
    es: 'Pero entonces mi madre tuvo una idea. Empacamos la comida y subimos a nuestros autos. Dos horas después, tocamos a la puerta de mi hermana.',
  },
  {
    id: 'p4',
    en: '"Surprise!" we yelled.',
    es: '¡"Sorpresa!", gritamos.',
  },
  {
    id: 'p5',
    en: '"A family reunion!" my sister shouted, hugging everyone. We found a nice place to sit outside.',
    es: '"¡Una reunión familiar!", gritó mi hermana, abrazando a todos. Encontramos un lindo lugar para sentarnos afuera.',
  },
  {
    id: 'p6',
    en: 'We talked, ate, and had lots of fun. We even went swimming in the river.',
    es: 'Charlamos, comimos y nos divertimos mucho. Incluso fuimos a nadar al río.',
  },
  {
    id: 'p7',
    en: '"Mom, do we have to go home?" I asked, as everyone said goodbye.',
    es: '"Mamá, ¿tenemos que volver a casa?", pregunté, mientras todos se despedían.',
  },
  {
    id: 'p8',
    en: '"I\'ll see you again soon," my sister told me. "Thanks for the wonderful picnic!"',
    es: '"Te veré pronto de nuevo", me dijo mi hermana. "¡Gracias por el maravilloso picnic!".',
  },
];

export const FAMILY_PICNIC_FULL_TEXT_EN = FAMILY_PICNIC_STORY_PARAGRAPHS.map((p) => p.en).join('\n\n');
export const FAMILY_PICNIC_FULL_TEXT_ES = FAMILY_PICNIC_STORY_PARAGRAPHS.map((p) => p.es).join('\n\n');

/* =========================================================================
   ACTIVIDAD 2: PUT THE SENTENCES INTO THE RIGHT ORDER (actividad 2.png)
   ========================================================================= */
export interface StoryOrderItem {
  id: string;
  textEn: string;
  textEs: string;
  correctStep: number; // 1 to 6
}

export const ACTIVIDAD_2_ORDER_ITEMS: StoryOrderItem[] = [
  {
    id: 'o-relatives-invite',
    textEn: 'My mother invited our relatives to a family reunion.',
    textEs: 'Mi madre invitó a nuestros parientes a una reunión familiar.',
    correctStep: 1,
  },
  {
    id: 'o-potato-salad',
    textEn: 'I helped my father make potato salad.',
    textEs: 'Ayudé a mi padre a preparar la ensalada de papa.',
    correctStep: 2,
  },
  {
    id: 'o-relatives-arrive',
    textEn: 'Our relatives started coming to the park.',
    textEs: 'Nuestros parientes comenzaron a llegar al parque.',
    correctStep: 3,
  },
  {
    id: 'o-car-broke',
    textEn: 'My sister called to say that her car broke down.',
    textEs: 'Mi hermana llamó para decir que su auto se averió.',
    correctStep: 4,
  },
  {
    id: 'o-pack-food',
    textEn: 'We packed up the food.',
    textEs: 'Empacamos la comida.',
    correctStep: 5,
  },
  {
    id: 'o-surprise-sister',
    textEn: 'We surprised my sister.',
    textEs: 'Le dimos una sorpresa a mi hermana.',
    correctStep: 6,
  },
];

/* =========================================================================
   ACTIVIDAD 3: TABLE CLASSIFICATION FAMILY VS OTHERS (actividad 3.png)
   ========================================================================= */
export interface FamilyClassificationItem {
  id: string;
  wordEn: string;
  wordEs: string;
  category: 'family' | 'others';
}

export const ACTIVIDAD_3_FAMILY_ITEMS: FamilyClassificationItem[] = [
  { id: 'c1', wordEn: 'cousin', wordEs: 'primo(a)', category: 'family' },
  { id: 'c2', wordEn: 'mail carrier', wordEs: 'cartero', category: 'others' },
  { id: 'c3', wordEn: 'artist', wordEs: 'artista', category: 'others' },
  { id: 'c4', wordEn: 'aunt', wordEs: 'tía', category: 'family' },
  { id: 'c5', wordEn: 'brother', wordEs: 'hermano', category: 'family' },
  { id: 'c6', wordEn: 'teacher', wordEs: 'profesor(a)', category: 'others' },
  { id: 'c7', wordEn: 'uncle', wordEs: 'tío', category: 'family' },
  { id: 'c8', wordEn: 'father', wordEs: 'padre', category: 'family' },
  { id: 'c9', wordEn: 'doctor', wordEs: 'médico(a)', category: 'others' },
  { id: 'c10', wordEn: 'musician', wordEs: 'músico', category: 'others' },
];

/* =========================================================================
   ACTIVIDAD 4: OPPOSITES OF HIGHLIGHTED WORDS (actividad 4.png)
   ========================================================================= */
export interface OppositeSubQuestion {
  id: string;
  promptEn: string;
  promptEs: string;
  highlightedWord: string;
  options: { id: string; textEn: string; textEs: string }[];
  correctOptionId: string;
}

export const ACTIVIDAD_4_OPPOSITES: OppositeSubQuestion[] = [
  {
    id: 'opp-1',
    promptEn: 'The family had so much fun that they wanted to stay.',
    promptEs: 'La familia se divirtió tanto que querían quedarse.',
    highlightedWord: 'stay',
    options: [
      { id: 'opt-help', textEn: 'help', textEs: 'ayudar' },
      { id: 'opt-go-home', textEn: 'go home', textEs: 'ir a casa' },
      { id: 'opt-come-back', textEn: 'come back', textEs: 'regresar' },
    ],
    correctOptionId: 'opt-go-home',
  },
  {
    id: 'opp-2',
    promptEn: 'Thanks for the wonderful picnic...',
    promptEs: 'Gracias por el maravilloso picnic...',
    highlightedWord: 'wonderful',
    options: [
      { id: 'opt-terrible', textEn: 'terrible', textEs: 'terrible / pésimo' },
      { id: 'opt-funny', textEn: 'funny', textEs: 'divertido / gracioso' },
      { id: 'opt-enjoyable', textEn: 'enjoyable', textEs: 'agradable' },
    ],
    correctOptionId: 'opt-terrible',
  },
  {
    id: 'opp-3',
    promptEn: '"Surprise" we yelled.',
    promptEs: '"Sorpresa", gritamos.',
    highlightedWord: 'yelled',
    options: [
      { id: 'opt-laughed', textEn: 'laughed', textEs: 'reímos' },
      { id: 'opt-whispered', textEn: 'whispered', textEs: 'susurramos' },
      { id: 'opt-shouted', textEn: 'shouted', textEs: 'gritamos' },
    ],
    correctOptionId: 'opt-whispered',
  },
];

/* =========================================================================
   ACTIVIDAD 5: VOCABULARY SENTENCE COMPLETION (actividad 5.png)
   ========================================================================= */
export interface VocabClozeItem {
  id: string;
  prefix: string;
  suffix: string;
  correctWord: string;
  fullEn: string;
  fullEs: string;
}

export const ACTIVIDAD_5_VOCAB_ITEMS: VocabClozeItem[] = [
  {
    id: 'v1',
    prefix: 'A family reunion is when the whole family ',
    suffix: ' .',
    correctWord: 'gets together',
    fullEn: 'A family reunion is when the whole family gets together.',
    fullEs: 'Una reunión familiar es cuando toda la familia se reúne.',
  },
  {
    id: 'v2',
    prefix: 'A relative is a ',
    suffix: ' .',
    correctWord: 'family member',
    fullEn: 'A relative is a family member.',
    fullEs: 'Un pariente es un miembro de la familia.',
  },
  {
    id: 'v3',
    prefix: 'To have a ',
    suffix: ' means to bring food from home to eat outside.',
    correctWord: 'picnic',
    fullEn: 'To have a picnic means to bring food from home to eat outside.',
    fullEs: 'Tener un picnic significa llevar comida de casa para comer al aire libre.',
  },
  {
    id: 'v4',
    prefix: 'If your car ',
    suffix: ' , it means it stops working.',
    correctWord: 'breaks down',
    fullEn: 'If your car breaks down, it means it stops working.',
    fullEs: 'Si tu auto se avería, significa que deja de funcionar.',
  },
  {
    id: 'v5',
    prefix: 'The brother of your mother or father is your ',
    suffix: ' .',
    correctWord: 'uncle',
    fullEn: 'The brother of your mother or father is your uncle.',
    fullEs: 'El hermano de tu madre o de tu padre es tu tío.',
  },
  {
    id: 'v6',
    prefix: 'The sister of your mother or father is your ',
    suffix: ' .',
    correctWord: 'aunt',
    fullEn: 'The sister of your mother or father is your aunt.',
    fullEs: 'La hermana de tu madre o de tu padre es tu tía.',
  },
  {
    id: 'v7',
    prefix: 'A ',
    suffix: " is when you don't expect something.",
    correctWord: 'surprise',
    fullEn: "A surprise is when you don't expect something.",
    fullEs: 'Una sorpresa es cuando no esperas algo.',
  },
];

export const ACTIVIDAD_5_VOCAB_WORDS = [
  'breaks down',
  'surprise',
  'gets together',
  'uncle',
  'aunt',
  'family member',
  'picnic',
];

/* =========================================================================
   ACTIVIDAD 6: CHOOSE THE CORRECT ANSWER (actividad 6.png)
   ========================================================================= */
export const ACTIVIDAD_6_DATA = {
  instructionEn: 'Choose the correct answer.',
  instructionEs: 'Elige la respuesta correcta.',
  subQuestions: [
    {
      id: 'act6-q1',
      questionEn: 'When people look forward to something, they are...',
      questionEs: 'Cuando la gente espera algo con ilusión, están...',
      options: [
        { id: 'opt-angry', textEn: 'angry.', textEs: 'enojados.' },
        { id: 'opt-excited', textEn: 'excited.', textEs: 'emocionados.' },
        { id: 'opt-worried', textEn: 'worried.', textEs: 'preocupados.' },
        { id: 'opt-wonderful', textEn: 'wonderful.', textEs: 'maravillosos.' },
      ],
      correctOptionId: 'opt-excited',
    },
    {
      id: 'act6-q2',
      questionEn: "The sister was sad that she wouldn't be able to go to the picnic.",
      questionEs: 'La hermana estaba triste de no poder ir al picnic.',
      options: [
        { id: 'opt-true', textEn: 'True', textEs: 'Verdadero' },
        { id: 'opt-false', textEn: 'False', textEs: 'Falso' },
        { id: 'opt-dont-know', textEn: "We don't know.", textEs: 'No lo sabemos.' },
      ],
      correctOptionId: 'opt-true',
    },
  ],
};

/* =========================================================================
   ACTIVIDAD 7: CHOOSE THE CORRECT ANSWER (actividad 7.png)
   ========================================================================= */
export const ACTIVIDAD_7_DATA = {
  instructionEn: 'Choose the correct answer.',
  instructionEs: 'Elige la respuesta correcta.',
  subQuestions: [
    {
      id: 'act7-q1',
      questionEn: "Since the sister couldn't come to the picnic, the family...",
      questionEs: 'Ya que la hermana no pudo venir al picnic, la familia...',
      options: [
        {
          id: 'opt-picked-up',
          textEn: 'picked her up and brought her to the park.',
          textEs: 'la recogió y la llevó al parque.',
        },
        {
          id: 'opt-brought-picnic',
          textEn: 'brought the picnic to her.',
          textEs: 'le llevó el picnic a ella.',
        },
        {
          id: 'opt-without-her',
          textEn: 'had the picnic without her.',
          textEs: 'hizo el picnic sin ella.',
        },
        {
          id: 'opt-went-home',
          textEn: 'just went home.',
          textEs: 'simplemente se fue a casa.',
        },
      ],
      correctOptionId: 'opt-brought-picnic',
    },
    {
      id: 'act7-q2',
      questionEn: 'If something is sad, it makes you...',
      questionEs: 'Si algo es triste, te hace...',
      options: [
        { id: 'opt-yell', textEn: 'yell.', textEs: 'gritar.' },
        { id: 'opt-cry', textEn: 'cry.', textEs: 'llorar.' },
        { id: 'opt-laugh', textEn: 'laugh.', textEs: 'reír.' },
        { id: 'opt-smile', textEn: 'smile.', textEs: 'sonreír.' },
      ],
      correctOptionId: 'opt-cry',
    },
  ],
};

/* =========================================================================
   TESTS (5 TESTS - EXACT ORDER FROM test 1.png TO test 5.png)
   ========================================================================= */
export const FAMILY_PICNIC_TESTS = {
  // TEST 1: test 1.png ("Another name for the story can be...")
  test1: {
    id: 'fp-test-1',
    testNumber: 1,
    type: 'drag-cloze' as const,
    instructionEn: 'Drag the correct answer/s into place.',
    instructionEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    prefix: 'Another name for the story can be ',
    suffix: ' .',
    options: [
      { id: 'opt-swimming', textEn: '"Swimming in the Lake"', textEs: '"Nadando en el lago"' },
      { id: 'opt-birthday', textEn: '"The Surprise Birthday Party"', textEs: '"La fiesta sorpresa de cumpleaños"' },
      { id: 'opt-reunion', textEn: '"The Best Reunion"', textEs: '"La mejor reunión"' },
      { id: 'opt-salad-name', textEn: '"Dad\'s Famous Potato Salad"', textEs: '"La famosa ensalada de papa de papá"' },
    ],
    correctOptionId: 'opt-reunion',
    fullEn: 'Another name for the story can be "The Best Reunion".',
    fullEs: 'Otro nombre para la historia puede ser "La mejor reunión".',
  },

  // TEST 2: test 2.png ("Why was the narrator excited?")
  test2: {
    id: 'fp-test-2',
    testNumber: 2,
    type: 'radio' as const,
    instructionEn: 'Choose the correct answer.',
    instructionEs: 'Elige la respuesta correcta.',
    questionEn: 'Why was the narrator excited?',
    questionEs: '¿Por qué estaba emocionado(a) el/la narrador(a)?',
    options: [
      {
        id: 'opt-sister-visit',
        textEn: 'Her sister was coming to visit.',
        textEs: 'Su hermana venía de visita.',
      },
      {
        id: 'opt-visit-cousins',
        textEn: 'She was going to visit her cousins.',
        textEs: 'Iba a visitar a sus primos.',
      },
      {
        id: 'opt-swimming-visit',
        textEn: 'She was going to go swimming.',
        textEs: 'Iba a ir a nadar.',
      },
      {
        id: 'opt-invited-picnic',
        textEn: 'She was invited to a picnic.',
        textEs: 'Fue invitado(a) a un picnic.',
      },
    ],
    correctOptionId: 'opt-sister-visit',
  },

  // TEST 3: test 3.png ("The father was well-known for...")
  test3: {
    id: 'fp-test-3',
    testNumber: 3,
    type: 'drag-cloze' as const,
    instructionEn: 'Drag the correct answer/s into place.',
    instructionEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    prefix: 'The father was well-known for ',
    suffix: ' .',
    options: [
      { id: 'opt-salad', textEn: 'making potato salad.', textEs: 'hacer ensalada de papa.' },
      { id: 'opt-cars', textEn: 'fixing cars.', textEs: 'reparar autos.' },
      { id: 'opt-ideas', textEn: 'his good ideas.', textEs: 'sus buenas ideas.' },
      { id: 'opt-picnics', textEn: 'making picnics.', textEs: 'hacer picnics.' },
    ],
    correctOptionId: 'opt-salad',
    fullEn: 'The father was well-known for making potato salad.',
    fullEs: 'El padre era muy conocido por hacer ensalada de papa.',
  },

  // TEST 4: test 4.png ("Which of these people are NOT mentioned in the story?")
  test4: {
    id: 'fp-test-4',
    testNumber: 4,
    type: 'radio' as const,
    instructionEn: 'Choose the correct answer.',
    instructionEs: 'Elige la respuesta correcta.',
    questionEn: 'Which of these people are NOT mentioned in the story?',
    questionEs: '¿Cuáles de estas personas NO se mencionan en la historia?',
    options: [
      { id: 'opt-aunts', textEn: 'aunts', textEs: 'tías' },
      { id: 'opt-grandparents', textEn: 'grandparents', textEs: 'abuelos' },
      { id: 'opt-uncles', textEn: 'uncles', textEs: 'tíos' },
      { id: 'opt-cousins', textEn: 'cousins', textEs: 'primos' },
    ],
    correctOptionId: 'opt-grandparents',
  },

  // TEST 5: test 5.png ("The narrator did not want to go home.")
  test5: {
    id: 'fp-test-5',
    testNumber: 5,
    type: 'radio' as const,
    instructionEn: 'Choose the correct answer.',
    instructionEs: 'Elige la respuesta correcta.',
    questionEn: 'The narrator did not want to go home.',
    questionEs: 'El/la narrador(a) no quería irse a casa.',
    options: [
      { id: 'opt-true', textEn: 'True', textEs: 'Verdadero' },
      { id: 'opt-false', textEn: 'False', textEs: 'Falso' },
    ],
    correctOptionId: 'opt-true',
  },
};

// Aliases for backward compatibility and clean component imports
export const FAMILY_PICNIC_ORDER_ITEMS = ACTIVIDAD_2_ORDER_ITEMS;
export const FAMILY_CLASSIFICATION_ITEMS = ACTIVIDAD_3_FAMILY_ITEMS;
export const ACTIVITY_6_OPPOSITES = ACTIVIDAD_4_OPPOSITES;
export const FAMILY_PICNIC_VOCAB_ITEMS = ACTIVIDAD_5_VOCAB_ITEMS;
export const FAMILY_PICNIC_VOCAB_WORDS = ACTIVIDAD_5_VOCAB_WORDS;
