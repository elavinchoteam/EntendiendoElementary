import madMosImg from '../assets/images/mad_mos_store_1792197613831.jpg';

export { madMosImg };

export interface MadMosFlyerItem {
  titleEn: string;
  titleEs: string;
  taglineEn: string;
  taglineEs: string;
  introEn: string;
  introEs: string;
  bargains: {
    itemEn: string;
    itemEs: string;
    discountEn: string;
    discountEs: string;
  }[];
  hoursEn: string;
  hoursEs: string;
  callToActionEn: string;
  callToActionEs: string;
}

export const MAD_MOS_FLYER: MadMosFlyerItem = {
  titleEn: "Mad Mo's Department Store",
  titleEs: "Grandes Almacenes Mad Mo",
  taglineEn: "Mad Mo's Has the Cheapest Prices!",
  taglineEs: "¡Mad Mo tiene los precios más baratos!",
  introEn:
    "There are three floors of bargains. We have everything that you need. We take cash or credit. Here are just some of our bargains:",
  introEs:
    "Hay tres pisos de ofertas. Tenemos todo lo que necesitas. Aceptamos efectivo o tarjeta de crédito. Estas son solo algunas de nuestras ofertas:",
  bargains: [
    {
      itemEn: "Handbags",
      itemEs: "Bolsos de mano",
      discountEn: "1/2 price",
      discountEs: "mitad de precio (1/2 precio)",
    },
    {
      itemEn: "Bicycles for your children",
      itemEs: "Bicicletas para tus hijos",
      discountEn: "only $99",
      discountEs: "solo $99 (noventa y nueve dólares)",
    },
    {
      itemEn: "Shelves and bookcases for your home",
      itemEs: "Estanterías y libreros para tu hogar",
      discountEn: "25% off",
      discountEs: "25% de descuento",
    },
  ],
  hoursEn: "Our store opens at 9 a.m. and closes at midnight.",
  hoursEs: "Nuestra tienda abre a las 9 a.m. y cierra a la medianoche.",
  callToActionEn: "Come to Mad Mo's Department Store today!",
  callToActionEs: "¡Ven hoy a Grandes Almacenes Mad Mo!",
};

export const MAD_MOS_REFERENCE_AUDIO =
  "Mad Mo's Department Store. Mad Mo's Has the Cheapest Prices! There are three floors of bargains. We have everything that you need. We take cash or credit. Here are just some of our bargains: Handbags: half price. Bicycles for your children: only ninety-nine dollars. Shelves and bookcases for your home: twenty-five percent off. Our store opens at 9 a.m. and closes at midnight. Come to Mad Mo's Department Store today!";

export const MAD_MOS_REFERENCE_SENTENCES = [
  {
    textEn: "Mad Mo's Has the Cheapest Prices!",
    textEs: "¡Mad Mo tiene los precios más baratos!",
    highlights: ["the Cheapest Prices", "Cheapest"],
  },
  {
    textEn: "There are three floors of bargains.",
    textEs: "Hay tres pisos de ofertas.",
    highlights: ["three floors of bargains", "bargains"],
  },
  {
    textEn: "We have everything that you need. We take cash or credit.",
    textEs: "Tenemos todo lo que necesitas. Aceptamos efectivo o tarjeta de crédito.",
    highlights: ["everything that you need", "cash or credit"],
  },
  {
    textEn: "Handbags: 1/2 price",
    textEs: "Bolsos de mano: 1/2 de precio",
    highlights: ["1/2 price"],
  },
  {
    textEn: "Bicycles for your children: only $99",
    textEs: "Bicicletas para tus hijos: solo $99",
    highlights: ["only $99"],
  },
  {
    textEn: "Shelves and bookcases for your home: 25% off",
    textEs: "Estanterías y libreros para tu hogar: 25% de descuento",
    highlights: ["25% off"],
  },
  {
    textEn: "Our store opens at 9 a.m. and closes at midnight.",
    textEs: "Nuestra tienda abre a las 9 a.m. y cierra a la medianoche.",
    highlights: ["opens at 9 a.m.", "closes at midnight"],
  },
  {
    textEn: "Come to Mad Mo's Department Store today!",
    textEs: "¡Ven hoy a Grandes Almacenes Mad Mo!",
    highlights: ["Mad Mo's Department Store"],
  },
];

// ---------------------------------------------------------------------------
// DIALOGUE LINE ITEM INTERFACE
// ---------------------------------------------------------------------------
export interface MadMosDialogueLine {
  speaker?: string;
  prefix?: string;
  prefixEs?: string;
  slot?: {
    id: string;
    expectedWord: string;
    dropdownOptions?: string[];
  };
  middleText?: string;
  middleTextEs?: string;
  slot2?: {
    id: string;
    expectedWord: string;
    dropdownOptions?: string[];
  };
  middleText2?: string;
  middleText2Es?: string;
  suffix?: string;
  suffixEs?: string;
  fullEn: string;
  fullEs: string;
}

export interface CheckboxOptionItem {
  id: string;
  textEn: string;
  textEs: string;
  isCorrect: boolean;
  explanationEn: string;
  explanationEs: string;
}

export interface MadMosActivityItem {
  id: string;
  number: number;
  title: string;
  type: 'cloze-dialogue' | 'checkbox-multiselect';
  instructions: string;
  instructionsEs: string;
  audioPrompt: string;
  dialogueLines?: MadMosDialogueLine[];
  optionsPool?: string[];
  checkboxOptions?: CheckboxOptionItem[];
  explanationEn: string;
  explanationEs: string;
}

export interface MadMosTestItem {
  id: string;
  number: number;
  question: string;
  questionEs: string;
  instructions: string;
  instructionsEs: string;
  audioPrompt: string;
  options: string[];
  optionsEs: string[];
  correctAnswer: string;
  explanationEn: string;
  explanationEs: string;
  quoteEn?: string;
  quoteEs?: string;
}

// ---------------------------------------------------------------------------
// 2 PRACTICE ACTIVITIES (Actividad 2 & Actividad 3)
// Actividad 1 is the Explore slide.
// ---------------------------------------------------------------------------
export const MAD_MOS_ACTIVITIES: MadMosActivityItem[] = [
  /* Actividad 2 (actividad 2.png) */
  {
    id: 'mad-mos-act-2',
    number: 2,
    title: 'Actividad 2',
    type: 'cloze-dialogue',
    instructions:
      'Two friends meet on the street. Complete their conversation by filling in the missing words.',
    instructionsEs:
      'Dos amigos se encuentran en la calle. Completa su conversación rellenando las palabras que faltan.',
    audioPrompt:
      "Hi there, Jan. I was just on my way to Mad Mo's department store. Would you like to come with me? What do they have there? They have everything you need! As it says in the ad, three floors of bargains. What are you going to get? I'm going to buy an answering machine for our phone. Our old one is broken. I need a new handbag. I read in the ad that handbags are on sale at half price. I don't have any cash with me, though. You can charge it. Well then, let's go!",
    dialogueLines: [
      {
        speaker: 'Liu',
        prefix: 'Liu: Hi there, Jan. I was just on my way to Mad Mo\'s ',
        prefixEs: 'Liu: Hola, Jan. Iba justo camino a los grandes almacenes Mad Mo. ',
        slot: {
          id: 'mma2-s1',
          expectedWord: 'department store',
          dropdownOptions: ['department store', 'bargains', 'handbag', 'cash'],
        },
        suffix: '.',
        suffixEs: '¿Te gustaría venir conmigo?',
        fullEn: "Liu: Hi there, Jan. I was just on my way to Mad Mo's department store. Would you like to come with me?",
        fullEs: "Liu: Hola, Jan. Iba justo camino a los grandes almacenes Mad Mo. ¿Te gustaría venir conmigo?",
      },
      {
        speaker: 'Jan',
        prefix: 'Jan: What do they have there?',
        prefixEs: 'Jan: ¿Qué tienen allí?',
        fullEn: 'Jan: What do they have there?',
        fullEs: 'Jan: ¿Qué tienen allí?',
      },
      {
        speaker: 'Liu',
        prefix: 'Liu: They have ',
        prefixEs: 'Liu: ¡Tienen ',
        slot: {
          id: 'mma2-s2',
          expectedWord: 'everything',
          dropdownOptions: ['everything', 'bargains', 'cash', 'charge'],
        },
        middleText: ' you need! As it says in the ad, "three floors of ',
        middleTextEs: ' lo que necesitas! Como dice en el anuncio, "tres pisos de ',
        slot2: {
          id: 'mma2-s3',
          expectedWord: 'bargains',
          dropdownOptions: ['bargains', 'department store', 'half price', 'handbag'],
        },
        suffix: '."',
        suffixEs: '".',
        fullEn: 'Liu: They have everything you need! As it says in the ad, "three floors of bargains."',
        fullEs: 'Liu: ¡Tienen todo lo que necesitas! Como dice en el anuncio, "tres pisos de ofertas".',
      },
      {
        speaker: 'Jan',
        prefix: 'Jan: What are you going to get?',
        prefixEs: 'Jan: ¿Qué vas a comprar?',
        fullEn: 'Jan: What are you going to get?',
        fullEs: 'Jan: ¿Qué vas a comprar?',
      },
      {
        speaker: 'Liu',
        prefix: "Liu: I'm going to buy an ",
        prefixEs: 'Liu: Voy a comprar un ',
        slot: {
          id: 'mma2-s4',
          expectedWord: 'answering machine',
          dropdownOptions: ['answering machine', 'handbag', 'department store', 'everything'],
        },
        suffix: ' for our phone. Our old one is broken.',
        suffixEs: ' para nuestro teléfono. El viejo está roto.',
        fullEn: "Liu: I'm going to buy an answering machine for our phone. Our old one is broken.",
        fullEs: "Liu: Voy a comprar un contestador automático para nuestro teléfono. El viejo está roto.",
      },
      {
        speaker: 'Jan',
        prefix: 'Jan: I need a new ',
        prefixEs: 'Jan: Necesito un nuevo ',
        slot: {
          id: 'mma2-s5',
          expectedWord: 'handbag',
          dropdownOptions: ['handbag', 'answering machine', 'bargains', 'department store'],
        },
        suffix: '.',
        suffixEs: '.',
        fullEn: 'Jan: I need a new handbag.',
        fullEs: 'Jan: Necesito un bolso nuevo.',
      },
      {
        speaker: 'Liu',
        prefix: 'Liu: I read in the ad that handbags are on sale at ',
        prefixEs: 'Liu: Leí en el anuncio que los bolsos están en oferta a ',
        slot: {
          id: 'mma2-s6',
          expectedWord: 'half price',
          dropdownOptions: ['half price', 'bargains', 'cash', 'charge'],
        },
        suffix: '.',
        suffixEs: '.',
        fullEn: 'Liu: I read in the ad that handbags are on sale at half price.',
        fullEs: 'Liu: Leí en el anuncio que los bolsos están en oferta a mitad de precio.',
      },
      {
        speaker: 'Jan',
        prefix: "Jan: I don't have any ",
        prefixEs: 'Jan: Aunque no llevo nada de ',
        slot: {
          id: 'mma2-s7',
          expectedWord: 'cash',
          dropdownOptions: ['cash', 'charge', 'bargains', 'everything'],
        },
        suffix: ' with me, though.',
        suffixEs: ' conmigo.',
        fullEn: "Jan: I don't have any cash with me, though.",
        fullEs: "Jan: Aunque no llevo nada de efectivo conmigo.",
      },
      {
        speaker: 'Liu',
        prefix: 'Liu: You can ',
        prefixEs: 'Liu: Puedes ',
        slot: {
          id: 'mma2-s8',
          expectedWord: 'charge',
          dropdownOptions: ['charge', 'cash', 'half price', 'bargains'],
        },
        suffix: ' it.',
        suffixEs: 'lo (a crédito).',
        fullEn: 'Liu: You can charge it.',
        fullEs: 'Liu: Puedes cargarlo a tu tarjeta.',
      },
      {
        speaker: 'Jan',
        prefix: "Jan: Well then, let's go!",
        prefixEs: 'Jan: ¡Bueno entonces, vamos!',
        fullEn: "Jan: Well then, let's go!",
        fullEs: "Jan: ¡Bueno entonces, vamos!",
      },
    ],
    optionsPool: [
      'bargains',
      'department store',
      'half price',
      'handbag',
      'answering machine',
      'everything',
      'charge',
      'cash',
    ],
    explanationEn:
      "Context clues from the ad: 'department store' for the place, 'everything' and 'bargains' from 'three floors of bargains', 'answering machine' for phone, 'handbag' and 'half price' from 'Handbags: 1/2 price', 'cash' and 'charge' from 'We take cash or credit'.",
    explanationEs:
      "Pistas contextuales del anuncio: 'department store' para el lugar, 'everything' y 'bargains' de 'three floors of bargains', 'answering machine' para el teléfono, 'handbag' y 'half price' de 'Handbags: 1/2 price', 'cash' y 'charge' de 'We take cash or credit'.",
  },

  /* Actividad 3 (actividad 3.png) */
  {
    id: 'mad-mos-act-3',
    number: 3,
    title: 'Actividad 3',
    type: 'checkbox-multiselect',
    instructions:
      "Read the ad for Mad Mo's. Select the sentences that explain why you should shop at Mo's.",
    instructionsEs:
      "Lee el anuncio de Mad Mo. Selecciona las oraciones que explican por qué deberías comprar en Mo's.",
    audioPrompt:
      "Read the ad for Mad Mo's. Select the sentences that explain why you should shop at Mo's: They sell many kinds of things. There are many bargains. You can do your shopping after work. You can pay with cash or a credit card.",
    checkboxOptions: [
      {
        id: 'opt-1',
        textEn: 'They sell many kinds of things.',
        textEs: 'Venden muchas clases de artículos.',
        isCorrect: true,
        explanationEn: "True: The ad says 'We have everything that you need.' and has three floors of varied goods.",
        explanationEs: "Verdadero: El anuncio afirma 'Tenemos todo lo que necesitas' y cuenta con tres pisos de productos variados.",
      },
      {
        id: 'opt-2',
        textEn: 'There are many bargains.',
        textEs: 'Hay muchas ofertas / gangas.',
        isCorrect: true,
        explanationEn: "True: The ad explicitly announces 'There are three floors of bargains.' and 'the Cheapest Prices'.",
        explanationEs: "Verdadero: El anuncio dice explícitamente 'Hay tres pisos de ofertas' y 'los precios más baratos'.",
      },
      {
        id: 'opt-3',
        textEn: 'You can do your shopping after work.',
        textEs: 'Puedes hacer tus compras después del trabajo.',
        isCorrect: true,
        explanationEn: "True: The store stays open late, closing at midnight ('closes at midnight').",
        explanationEs: "Verdadero: La tienda cierra a la medianoche ('closes at midnight'), lo que permite comprar tras el horario laboral.",
      },
      {
        id: 'opt-4',
        textEn: 'They have everything you need, but the prices are higher than in other stores.',
        textEs: 'Tienen todo lo que necesitas, pero los precios son más altos que en otras tiendas.',
        isCorrect: false,
        explanationEn: "False: Mad Mo's advertises 'the Cheapest Prices', not higher prices.",
        explanationEs: "Falso: Mad Mo anuncia 'los precios más baratos' (the Cheapest Prices), no precios más altos.",
      },
      {
        id: 'opt-5',
        textEn: 'You can pay with cash or a credit card.',
        textEs: 'Puedes pagar en efectivo o con tarjeta de crédito.',
        isCorrect: true,
        explanationEn: "True: The ad states 'We take cash or credit.'",
        explanationEs: "Verdadero: El anuncio declara 'Aceptamos efectivo o crédito' (We take cash or credit).",
      },
      {
        id: 'opt-6',
        textEn: 'Handbags are 25% off.',
        textEs: 'Los bolsos tienen un 25% de descuento.',
        isCorrect: false,
        explanationEn: "False: Handbags are at 1/2 price (50% off), whereas shelves and bookcases are 25% off.",
        explanationEs: "Falso: Los bolsos están a mitad de precio (1/2 price); son las estanterías y libreros los que tienen 25% de descuento.",
      },
    ],
    explanationEn:
      "The 4 correct reasons are: They sell many kinds of things, there are many bargains, you can shop after work (open until midnight), and you can pay with cash or credit.",
    explanationEs:
      "Las 4 razones correctas son: Venden muchas clases de artículos, hay muchas ofertas, puedes comprar tras el trabajo (abierto hasta medianoche) y puedes pagar en efectivo o con tarjeta.",
  },
];

// ---------------------------------------------------------------------------
// 5 TESTS IN EXACT ORDER (test 1.png to test 5.png)
// ---------------------------------------------------------------------------
export const MAD_MOS_TESTS: MadMosTestItem[] = [
  /* Test 1 (test 1.png) */
  {
    id: 'mad-mos-test-1',
    number: 1,
    question: 'What is another title for this ad?',
    questionEs: '¿Cuál es otro título adecuado para este anuncio?',
    instructions: 'Choose the correct answer.',
    instructionsEs: 'Elige la respuesta correcta.',
    audioPrompt: 'What is another title for this ad?',
    options: [
      '"Mad Mo\'s - Open 24 Hours a Day"',
      '"Mad Mo\'s - Expensive but Friendly"',
      '"Bicycles and Suitcases on Sale"',
      '"Great Bargains at Mad Mo\'s"',
    ],
    optionsEs: [
      '"Mad Mo\'s - Abierto las 24 horas del día"',
      '"Mad Mo\'s - Caro pero amigable"',
      '"Bicicletas y maletas en oferta"',
      '"Grandes ofertas en Mad Mo\'s"',
    ],
    correctAnswer: '"Great Bargains at Mad Mo\'s"',
    explanationEn:
      "The ad emphasizes 'three floors of bargains' and 'the Cheapest Prices'. Therefore, 'Great Bargains at Mad Mo's' is the most accurate alternative title.",
    explanationEs:
      "El anuncio enfatiza 'tres pisos de ofertas' y 'los precios más baratos'. Por lo tanto, 'Grandes ofertas en Mad Mo\'s' es el título alternativo más acertado.",
  },

  /* Test 2 (test 2.png) */
  {
    id: 'mad-mos-test-2',
    number: 2,
    question: "Mad Mo's store is full of bargains.",
    questionEs: "La tienda de Mad Mo está llena de ofertas.",
    instructions: 'Choose the correct answer.',
    instructionsEs: 'Elige la respuesta correcta.',
    audioPrompt: "Mad Mo's store is full of bargains. True or false?",
    options: ['True', 'False'],
    optionsEs: ['Verdadero', 'Falso'],
    correctAnswer: 'True',
    explanationEn:
      "True: The ad explicitly highlights 'There are three floors of bargains' and 'the Cheapest Prices'.",
    explanationEs:
      "Verdadero: El anuncio destaca explícitamente 'Hay tres pisos de ofertas' (three floors of bargains).",
  },

  /* Test 3 (test 3.png) */
  {
    id: 'mad-mos-test-3',
    number: 3,
    question: 'What does "your" mean in: "Answering machines for your home"?',
    questionEs: '¿Qué significa "your" en la frase: "Answering machines for your home"?',
    instructions: 'Choose the correct answer.',
    audioPrompt: 'What does "your" mean in: "Answering machines for your home"?',
    instructionsEs: 'Elige la respuesta correcta.',
    quoteEn: '"Answering machines for your home"',
    quoteEs: '"Contestadores automáticos para tu hogar"',
    options: ["Mad Mo's", "the store's", "children's", "the customer's"],
    optionsEs: ["De Mad Mo", "De la tienda", "De los niños", "Del cliente"],
    correctAnswer: "the customer's",
    explanationEn:
      "In commercial advertisements, the second-person possessive adjective 'your' speaks directly to the reader / consumer, meaning 'the customer's'.",
    explanationEs:
      "En anuncios comerciales, el adjetivo posesivo 'your' (tu / su) se dirige directamente al lector o comprador, es decir, 'del cliente' (the customer's).",
  },

  /* Test 4 (test 4.png) */
  {
    id: 'mad-mos-test-4',
    number: 4,
    question: 'Which item is not listed in the ad?',
    questionEs: '¿Qué artículo no aparece mencionado en el anuncio?',
    instructions: 'Choose the correct answer.',
    instructionsEs: 'Elige la respuesta correcta.',
    audioPrompt: 'Which item is not listed in the ad?',
    options: ['answering machines', 'handbags', 'bicycles', 'bookcases'],
    optionsEs: ['contestadores automáticos', 'bolsos de mano', 'bicicletas', 'libreros / estanterías'],
    correctAnswer: 'answering machines',
    explanationEn:
      "The ad flyer explicitly lists: 'Handbags', 'Bicycles for your children', and 'Shelves and bookcases'. 'Answering machines' are not listed in the ad.",
    explanationEs:
      "El volante impreso lista explícitamente: 'Handbags' (bolsos), 'Bicycles' (bicicletas) y 'Shelves and bookcases' (estanterías y libreros). Los 'answering machines' no están en el anuncio.",
  },

  /* Test 5 (test 5.png) */
  {
    id: 'mad-mos-test-5',
    number: 5,
    question: 'How much are the bicycles?',
    questionEs: '¿Cuánto cuestan las bicicletas?',
    instructions: 'Choose the correct answer.',
    instructionsEs: 'Elige la respuesta correcta.',
    audioPrompt: 'How much are the bicycles?',
    options: [
      'They are twenty-five percent off.',
      'They are ninety-nine cents.',
      'They are half price.',
      'They are ninety-nine dollars.',
    ],
    optionsEs: [
      'Tienen un veinticinco por ciento de descuento.',
      'Cuestan noventa y nueve centavos.',
      'Están a mitad de precio.',
      'Cuestan noventa y nueve dólares.',
    ],
    correctAnswer: 'They are ninety-nine dollars.',
    explanationEn:
      "The ad reads: 'Bicycles for your children: only $99'. '$99' stands for ninety-nine dollars.",
    explanationEs:
      "El anuncio dice: 'Bicycles for your children: only $99'. '$99' equivale a noventa y nueve dólares (ninety-nine dollars).",
  },
];
