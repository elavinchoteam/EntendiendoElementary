export interface CountableTheoryTopic {
  id: string;
  category: string;
  categoryEs: string;
  titleEn: string;
  titleEs: string;
  textEn: string;
  textEs: string;
  formulaEn?: string;
  formulaEs?: string;
  examples: {
    en: string;
    es: string;
    noteEn?: string;
    noteEs?: string;
  }[];
  grammarTipEn: string;
  grammarTipEs: string;
}

export interface WhatWouldYouSayItem {
  id: string;
  number: number;
  contextEn: string;
  contextEs: string;
  promptEn: string;
  promptEs: string;
  options: {
    key: 'a' | 'b' | 'c';
    text: string;
    isCorrect: boolean;
  }[];
  correctAnswer: 'a' | 'b' | 'c';
  explanationEn: string;
  explanationEs: string;
}

export interface RealLifeProblemItem {
  id: string;
  number: number;
  sentenceBefore: string;
  sentenceAfter: string;
  sentenceEs: string;
  acceptableAnswers: string[];
  primaryAnswer: string;
  explanationEn: string;
  explanationEs: string;
}

export interface SupermarketInventoryItem {
  id: string;
  number: number;
  questionEn: string;
  questionEs: string;
  expectedAnswerEn: string;
  expectedAnswerEs: string;
  acceptableVariations: string[];
  explanationEn: string;
  explanationEs: string;
}

export interface NaturalSoundItem {
  id: string;
  number: number;
  optionA: {
    text: string;
    isCorrect: boolean;
    explanationEn: string;
    explanationEs: string;
  };
  optionB: {
    text: string;
    isCorrect: boolean;
    explanationEn: string;
    explanationEs: string;
  };
  correctOption: 'a' | 'b';
}

export interface FindTheProblemItem {
  id: string;
  number: number;
  incorrectSentenceEn: string;
  incorrectSentenceEs: string;
  mistakeEn: string;
  mistakeEs: string;
  correctSentenceEn: string;
  correctSentenceEs: string;
  acceptableAnswers: string[];
  explanationEn: string;
  explanationEs: string;
}

export interface TripToLondonItem {
  id: string;
  number: number;
  sentenceAfter: string;
  sentenceEs: string;
  correctQuantifier: 'HOW MUCH' | 'HOW MANY';
  explanationEn: string;
  explanationEs: string;
}

export interface RestaurantDialogueTurn {
  speaker: 'Waiter' | 'Customer';
  speakerEs: 'Camarero' | 'Cliente';
  textBefore?: string;
  blankId?: string;
  correctBlank?: string;
  acceptableBlanks?: string[];
  textAfter?: string;
  textEs: string;
}

export interface WorkProblemItem {
  id: string;
  number: number;
  contextEn: string;
  contextEs: string;
  promptEn: string;
  promptEs: string;
  options: {
    key: 'a' | 'b' | 'c';
    text: string;
    isCorrect: boolean;
  }[];
  correctAnswer: 'a' | 'b' | 'c';
  explanationEn: string;
  explanationEs: string;
}

export interface DualNounItem {
  id: string;
  number: number;
  noun: string;
  sentenceOptions: {
    opt1: string;
    opt2: string;
  };
  contextEn: string;
  contextEs: string;
  correctChoice: string;
  fullSentenceEn: string;
  fullSentenceEs: string;
  explanationEn: string;
  explanationEs: string;
}

export interface SpeakingQuestionItem {
  id: string;
  number: number;
  questionEn: string;
  questionEs: string;
  grammarFocusEn: string;
  grammarFocusEs: string;
  sampleAnswerEn: string;
  sampleAnswerEs: string;
}

// ---------------------------------------------------------------------------
// 8 THEORY TOPICS FOR COUNTABLE AND UNCOUNTABLE NOUNS
// ---------------------------------------------------------------------------
export const COUNTABLE_UNCOUNTABLE_THEORY: CountableTheoryTopic[] = [
  {
    id: 'cut-1',
    category: '1. Countable Nouns',
    categoryEs: '1. Sustantivos Contables',
    titleEn: 'Countable Nouns: Things we can count individually',
    titleEs: 'Sustantivos Contables: Cosas que podemos contar una a una',
    textEn:
      'Countable nouns have both a singular and a plural form. In singular, they take "a" or "an" (a bottle, an apple). In plural, they take "-s", "-es", or numbers (two bottles, three apples, many people).',
    textEs:
      'Los sustantivos contables tienen forma singular y plural. En singular, llevan "a" o "an" (a bottle, an apple). En plural, llevan "-s", "-es" o números (two bottles, three apples, many people).',
    formulaEn: 'Singular: a / an + noun · Plural: number / many / a few + noun-s',
    formulaEs: 'Singular: a / an + sustantivo · Plural: número / many / a few + sustantivo-s',
    examples: [
      { en: 'I bought a bottle of water and two apples.', es: 'Compré una botella de agua y dos manzanas.' },
      { en: 'There are many restaurants in this neighborhood.', es: 'Hay muchos restaurantes en este vecindario.' },
      { en: 'We need a few chairs for the meeting.', es: 'Necesitamos unas pocas sillas para la reunión.' },
    ],
    grammarTipEn: 'Always use a singular verb with singular count nouns and a plural verb with plural count nouns: "The tomato is fresh" / "The tomatoes are fresh".',
    grammarTipEs: 'Usa siempre verbo en singular con contables singulares y verbo en plural con contables plurales: "The tomato is fresh" / "The tomatoes are fresh".',
  },
  {
    id: 'cut-2',
    category: '2. Uncountable Nouns',
    categoryEs: '2. Sustantivos Incontables',
    titleEn: 'Uncountable Nouns: Substances, concepts and mass entities',
    titleEs: 'Sustantivos Incontables: Sustancias, conceptos y masas',
    textEn:
      'Uncountable nouns cannot be counted individually with numbers. They do not have a plural form and never take "a" or "an". They always take a singular verb (Water is essential, not *A water is / *Waters are).',
    textEs:
      'Los sustantivos incontables no se pueden contar individualmente con números. No tienen forma plural y nunca llevan "a" ni "an". Siempre rigen verbo en singular (Water is essential, no *A water is / *Waters are).',
    formulaEn: 'some / much / a little / any + uncountable noun (always singular verb)',
    formulaEs: 'some / much / a little / any + sustantivo incontable (verbo siempre singular)',
    examples: [
      { en: 'Can I have some water, please?', es: '¿Me puede dar algo de agua, por favor?' },
      { en: 'We don’t have much time before the train leaves.', es: 'No tenemos mucho tiempo antes de que salga el tren.' },
      { en: 'She doesn’t drink any coffee in the evening.', es: 'Ella no toma nada de café por la tarde.' },
    ],
    grammarTipEn: 'Common uncountable categories include liquids (water, milk), grains/powders (rice, flour, sugar), foods (bread, meat, cheese), and concepts (advice, information).',
    grammarTipEs: 'Las categorías típicas incluyen líquidos (agua, leche), granos/polvos (arroz, harina, azúcar), comidas (pan, carne, queso) y conceptos (consejos, información).',
  },
  {
    id: 'cut-3',
    category: '3. Tricky Uncountable Nouns',
    categoryEs: '3. Incontables Frecuentes Problemáticos',
    titleEn: 'Beware: Spanish Countable ≠ English Uncountable',
    titleEs: 'Atención: Contables en Español pero Incontables en Inglés',
    textEn:
      'Many words that are countable in Spanish are strictly UNCOUNTABLE in English. You can never say "*an information", "*an advice", "*two breads", "*many luggages", or "*a traffic".',
    textEs:
      'Muchas palabras que son contables en español son estrictamente INCONTABLES en inglés. Nunca digas "*an information", "*an advice", "*two breads", "*many luggages" ni "*a traffic".',
    formulaEn: 'Use "a piece of advice", "some information", "loaves of bread", "pieces of luggage"',
    formulaEs: 'Usa "a piece of advice", "some information", "loaves of bread", "pieces of luggage"',
    examples: [
      { en: 'She gave me some useful advice (NOT: an advice / two advices).', es: 'Me dio un consejo útil / buenos consejos.' },
      { en: 'I need some information about the museum (NOT: an information).', es: 'Necesito información sobre el museo.' },
      { en: 'We bought two loaves of bread (NOT: two breads).', es: 'Compramos dos barras de pan.' },
      { en: 'How much luggage do you have? (NOT: how many luggages).', es: '¿Cuánto equipaje tienes?' },
    ],
    grammarTipEn: 'To count these nouns, use counter words: "a piece of advice", "a loaf of bread", "an item of luggage", "a slice of cheese".',
    grammarTipEs: 'Para contarlos, utiliza cuantificadores medidores: "a piece of advice", "a loaf of bread", "an item of luggage", "a slice of cheese".',
  },
  {
    id: 'cut-4',
    category: '4. How Much vs. How Many',
    categoryEs: '4. How Much vs. How Many',
    titleEn: 'How Much (Uncountable) vs. How Many (Countable Plural)',
    titleEs: 'How Much (Incontables) vs. How Many (Contables Plurales)',
    textEn:
      'Use "How much" with uncountable nouns (How much money? How much water?). Use "How many" with countable plural nouns (How many people? How many bottles? How many tickets?).',
    textEs:
      'Usa "How much" con sustantivos incontables (How much money? How much water?). Usa "How many" con sustantivos contables en plural (How many people? How many bottles? How many tickets?).',
    formulaEn: 'HOW MUCH + Uncountable Noun · HOW MANY + Countable Plural Noun',
    formulaEs: 'HOW MUCH + Sustantivo Incontable · HOW MANY + Sustantivo Contable Plural',
    examples: [
      { en: 'How much money do you need for the trip?', es: '¿Cuánto dinero necesitas para el viaje?' },
      { en: 'How many suitcases are you checking in?', es: '¿Cuántas maletas vas a registrar?' },
      { en: 'How much traffic is there on the highway?', es: '¿Cuánto tráfico hay en la autopista?' },
      { en: 'How many eggs do we need for the recipe?', es: '¿Cuántos huevos necesitamos para la receta?' },
    ],
    grammarTipEn: '"Money" is uncountable (How much money?), but specific currencies and coins are countable: "How many dollars / euros / coins?".',
    grammarTipEs: '"Money" es incontable (How much money?), pero las monedas y billetes son contables: "How many dollars / euros / coins?".',
  },
  {
    id: 'cut-5',
    category: '5. Some vs. Any',
    categoryEs: '5. Some vs. Any',
    titleEn: 'Some (Affirmative & Polite Requests) vs. Any (Negatives & Questions)',
    titleEs: 'Some (Afirmativas y Peticiones) vs. Any (Negativas y Preguntas)',
    textEn:
      'Both "some" and "any" work with uncountable nouns and plural count nouns. Use "some" in affirmative statements and polite offers/requests ("Can I have some water?"). Use "any" in negatives ("I don’t have any cash") and general questions ("Do you have any questions?").',
    textEs:
      'Tanto "some" como "any" funcionan con incontables y contables plurales. Usa "some" en oraciones afirmativas y en ofrecimientos/peticiones amables ("Can I have some water?"). Usa "any" en negativas ("I don’t have any cash") y preguntas generales ("Do you have any questions?").',
    formulaEn: 'Affirmative / Polite requests: SOME · Negative / Open questions: ANY',
    formulaEs: 'Afirmativas / Peticiones de cortesía: SOME · Negativas / Preguntas abiertas: ANY',
    examples: [
      { en: 'We have some cheese and some tomatoes.', es: 'Tenemos algo de queso y algunos tomates.' },
      { en: 'We don’t have any bread left.', es: 'No nos queda nada de pan.' },
      { en: 'Would you like some coffee? (Offer -> some)', es: '¿Le gustaría algo de café? (Ofrecimiento amable)' },
      { en: 'Do you have any information about the hotel? (Question -> any)', es: '¿Tiene alguna información sobre el hotel?' },
    ],
    grammarTipEn: 'When offering or requesting food or drink, always use "some": "Would you like some tea?" / "Can I have some water, please?".',
    grammarTipEs: 'Al ofrecer o pedir comida o bebida por cortesía, usa siempre "some": "Would you like some tea?" / "Can I have some water, please?".',
  },
  {
    id: 'cut-6',
    category: '6. A Few vs. A Little',
    categoryEs: '6. A Few vs. A Little',
    titleEn: 'A Few (Countable Plural) vs. A Little (Uncountable)',
    titleEs: 'A Few (Contables Plurales) vs. A Little (Incontables)',
    textEn:
      '"A few" means a small quantity of countable items (a few friends, a few eggs). "A little" means a small amount of an uncountable entity (a little time, a little milk, a little cash).',
    textEs:
      '"A few" significa unos pocos / unos cuantos para contables plurales (a few friends, a few eggs). "A little" significa un poco de para incontables (a little time, a little milk, a little cash).',
    formulaEn: 'A FEW + Plural Count Noun · A LITTLE + Uncountable Noun',
    formulaEs: 'A FEW + Sustantivo Contable Plural · A LITTLE + Sustantivo Incontable',
    examples: [
      { en: 'There are only a few eggs left in the fridge.', es: 'Solo quedan unos pocos huevos en la nevera.' },
      { en: 'We have a little time before our flight departs.', es: 'Tenemos un poco de tiempo antes de que salga nuestro vuelo.' },
      { en: 'I have a few questions about the assignment.', es: 'Tengo unas cuantas preguntas sobre la tarea.' },
      { en: 'Can you put a little sugar in my tea?', es: '¿Puedes poner un poco de azúcar en mi té?' },
    ],
    grammarTipEn: '"Few" and "little" without "a" express scarcity / almost none (negative tone): "We have little time" (casi no tenemos tiempo). "A few" and "a little" mean a positive small amount: "We have a little time" (tenemos algo de tiempo).',
    grammarTipEs: '"Few" y "little" sin "a" denotan escasez / casi nada. "A few" y "a little" con "a" expresan una cantidad pequeña pero suficiente.',
  },
  {
    id: 'cut-7',
    category: '7. Containers & Counters',
    categoryEs: '7. Envases y Unidades de Medida',
    titleEn: 'Measuring Uncountable Nouns with Containers',
    titleEs: 'Midiendo Sustantivos Incontables con Envases y Envases',
    textEn:
      'To express exact quantities of uncountable nouns, we use containers or units of measurement: a bottle of water, a glass of milk, a cup of coffee, a loaf of bread, a slice of cheese, a kilo of meat, a bag of rice.',
    textEs:
      'Para expresar cantidades exactas de incontables, usamos envases o unidades de medida: a bottle of water, a glass of milk, a cup of coffee, a loaf of bread, a slice of cheese, a kilo of meat, a bag of rice.',
    formulaEn: 'Number + Container/Unit + OF + Uncountable Noun',
    formulaEs: 'Número + Envase/Unidad + OF + Sustantivo Incontable',
    examples: [
      { en: 'We need two bottles of wine and a bag of rice.', es: 'Necesitamos dos botellas de vino y una bolsa de arroz.' },
      { en: 'She ordered three cups of coffee and two slices of cake.', es: 'Ella pidió tres tazas de café y dos rebanadas de pastel.' },
      { en: 'I bought half a kilo of meat and some cheese.', es: 'Compré medio kilo de carne y algo de queso.' },
    ],
    grammarTipEn: 'The container itself is countable! So you can say "one bottle, two bottles", but "water" remains uncountable.',
    grammarTipEs: '¡El envase en sí es contable! Por eso dices "one bottle, two bottles", pero "water" permanece incontable.',
  },
  {
    id: 'cut-8',
    category: '8. Dual-Meaning Nouns',
    categoryEs: '8. Sustantivos de Doble Sentido',
    titleEn: 'Countable or Uncountable Depending on Context',
    titleEs: 'Contables o Incontables según el Significado',
    textEn:
      'Some nouns change meaning depending on whether they are used as countable or uncountable. Food as substance is uncountable ("eat some chicken"), but individual animals or servings are countable ("two chickens on the farm", "two coffees").',
    textEs:
      'Algunos sustantivos cambian de significado según se usen como contables o incontables. La comida como sustancia es incontable ("eat some chicken"), pero los animales individuales o porciones pedidas son contables ("two chickens on the farm", "two coffees").',
    formulaEn: 'Substance / Material: Uncountable · Individual Item / Portion: Countable',
    formulaEs: 'Sustancia / Materia: Incontable · Objeto individual / Porción: Contable',
    examples: [
      { en: 'I’d like some chicken (meat) vs. We saw two chickens on the farm (animals).', es: 'Quisiera pollo (comida) vs. Vimos dos gallinas en la granja.' },
      { en: 'I don’t drink much coffee (drink) vs. We’d like two coffees, please (cups).', es: 'No tomo mucho café (bebida) vs. Quisiéramos dos cafés (dos tazas).' },
      { en: 'We bought some paper (material) vs. The teacher gave us two papers (documents).', es: 'Compramos papel (material) vs. El profesor nos dio dos trabajos/documentos.' },
    ],
    grammarTipEn: 'In everyday restaurant speech, people often say "two coffees" as shorthand for "two cups of coffee", but when talking about coffee in general, it is uncountable.',
    grammarTipEs: 'En el restaurante es común abreviar "two coffees" por "two cups of coffee", pero al hablar de café en general, siempre es incontable.',
  },
];

// ---------------------------------------------------------------------------
// 1. WHAT WOULD YOU SAY? (6 ITEMS)
// ---------------------------------------------------------------------------
export const WHAT_WOULD_YOU_SAY_ITEMS: WhatWouldYouSayItem[] = [
  {
    id: 'wwys-1',
    number: 1,
    contextEn: 'You are at a restaurant. You want water, but you don\'t want a whole bottle.',
    contextEs: 'Estás en un restaurante. Quieres agua, pero no quieres una botella entera.',
    promptEn: 'Can I have ______ water, please?',
    promptEs: '¿Me puede dar ______ agua, por favor?',
    options: [
      { key: 'a', text: 'a', isCorrect: false },
      { key: 'b', text: 'some', isCorrect: true },
      { key: 'c', text: 'many', isCorrect: false },
    ],
    correctAnswer: 'b',
    explanationEn: '"Water" is an uncountable noun. We cannot say "a water" (without a container) nor "many water". In polite requests, we use "some water".',
    explanationEs: '"Water" es incontable. No decimos "a water" (sin especificar envase) ni "many water". En peticiones educadas usamos "some water".',
  },
  {
    id: 'wwys-2',
    number: 2,
    contextEn: 'You are asking about the number of people at a concert.',
    contextEs: 'Preguntas sobre la cantidad de personas en un concierto.',
    promptEn: 'How ______ people are there?',
    promptEs: '¿______ personas hay allí?',
    options: [
      { key: 'a', text: 'much', isCorrect: false },
      { key: 'b', text: 'many', isCorrect: true },
      { key: 'c', text: 'a lot', isCorrect: false },
    ],
    correctAnswer: 'b',
    explanationEn: '"People" is an irregular countable plural noun (person -> people). To ask about quantity of countable plurals, we say "How many people".',
    explanationEs: '"People" es un sustantivo contable en plural (person -> people). Para preguntar por contables plurales decimos "How many people".',
  },
  {
    id: 'wwys-3',
    number: 3,
    contextEn: 'You are asking about the price of something.',
    contextEs: 'Estás preguntando por el precio o la cantidad de dinero necesaria.',
    promptEn: 'How ______ money do you need?',
    promptEs: '¿______ dinero necesitas?',
    options: [
      { key: 'a', text: 'many', isCorrect: false },
      { key: 'b', text: 'much', isCorrect: true },
      { key: 'c', text: 'few', isCorrect: false },
    ],
    correctAnswer: 'b',
    explanationEn: '"Money" is an uncountable noun in English. We always ask "How much money", never "How many money".',
    explanationEs: '"Money" es un sustantivo incontable en inglés. Siempre preguntamos "How much money", nunca "How many money".',
  },
  {
    id: 'wwys-4',
    number: 4,
    contextEn: 'You are talking about your luggage.',
    contextEs: 'Estás hablando sobre tu equipaje.',
    promptEn: 'I don\'t have ______ luggage.',
    promptEs: 'No tengo ______ equipaje.',
    options: [
      { key: 'a', text: 'many', isCorrect: false },
      { key: 'b', text: 'much', isCorrect: true },
      { key: 'c', text: 'a few', isCorrect: false },
    ],
    correctAnswer: 'b',
    explanationEn: '"Luggage" is uncountable in English. In negative sentences with uncountable nouns, we use "much": "I don\'t have much luggage".',
    explanationEs: '"Luggage" (equipaje) es incontable en inglés. En oraciones negativas con incontables usamos "much": "I don\'t have much luggage".',
  },
  {
    id: 'wwys-5',
    number: 5,
    contextEn: 'You are in a supermarket. You need three bottles of water.',
    contextEs: 'Estás en un supermercado. Necesitas tres botellas de agua.',
    promptEn: 'I need ______ bottles of water.',
    promptEs: 'Necesito ______ botellas de agua.',
    options: [
      { key: 'a', text: 'some', isCorrect: true },
      { key: 'b', text: 'much', isCorrect: false },
      { key: 'c', text: 'a little', isCorrect: false },
    ],
    correctAnswer: 'a',
    explanationEn: '"Bottles" is a countable plural noun. "Much" and "a little" only work with uncountable nouns, so "some bottles" is the only correct choice.',
    explanationEs: '"Bottles" es un sustantivo contable en plural. "Much" y "a little" solo van con incontables, por lo que "some bottles" es la opción correcta.',
  },
  {
    id: 'wwys-6',
    number: 6,
    contextEn: 'You are talking about your friends.',
    contextEs: 'Estás hablando de tus amigos.',
    promptEn: 'I have ______ friends who live abroad.',
    promptEs: 'Tengo ______ amigos que viven en el extranjero.',
    options: [
      { key: 'a', text: 'much', isCorrect: false },
      { key: 'b', text: 'a lot of', isCorrect: true },
      { key: 'c', text: 'a little', isCorrect: false },
    ],
    correctAnswer: 'b',
    explanationEn: '"Friends" is a countable plural noun. "Much" and "a little" cannot be used with plural count nouns; "a lot of" fits both countable and uncountable nouns in affirmative sentences.',
    explanationEs: '"Friends" es contable en plural. "Much" y "a little" no se pueden usar con contables plurales; "a lot of" funciona perfectamente.',
  },
];

// ---------------------------------------------------------------------------
// 2. REAL-LIFE PROBLEMS (8 ITEMS)
// ---------------------------------------------------------------------------
export const REAL_LIFE_PROBLEMS_ITEMS: RealLifeProblemItem[] = [
  {
    id: 'rlp-1',
    number: 1,
    sentenceBefore: "We can't make the cake. We don't have",
    sentenceAfter: "flour.",
    sentenceEs: "No podemos hacer el pastel. No nos queda harina.",
    acceptableAnswers: ['any', 'much'],
    primaryAnswer: 'any',
    explanationEn: '"Flour" is an uncountable powder. In a negative sentence stating you cannot bake, "any" (or "much") expresses lack of ingredient.',
    explanationEs: '"Flour" (harina) es incontable. En una oración negativa, "any" (nada de) o "much" (mucha) es la opción adecuada.',
  },
  {
    id: 'rlp-2',
    number: 2,
    sentenceBefore: "There are",
    sentenceAfter: "people waiting outside, so we may have to wait.",
    sentenceEs: "Hay mucha gente esperando afuera, así que tal vez tengamos que esperar.",
    acceptableAnswers: ['a lot of', 'many'],
    primaryAnswer: 'a lot of',
    explanationEn: '"People" is countable plural. In affirmative sentences expressing a large quantity, "a lot of" (or "many") is the natural choice.',
    explanationEs: '"People" es contable en plural. En oraciones afirmativas que indican gran cantidad, "a lot of" (o "many") es la opción natural.',
  },
  {
    id: 'rlp-3',
    number: 3,
    sentenceBefore: "I don't have",
    sentenceAfter: "cash. Can we pay by card?",
    sentenceEs: "No tengo efectivo. ¿Podemos pagar con tarjeta?",
    acceptableAnswers: ['any', 'much'],
    primaryAnswer: 'any',
    explanationEn: '"Cash" is uncountable money. In negative statements asking to pay by card, "any" (or "much") is standard.',
    explanationEs: '"Cash" (efectivo) es incontable. En oraciones negativas preguntando si se puede pagar con tarjeta, "any" o "much" es lo estándar.',
  },
  {
    id: 'rlp-4',
    number: 4,
    sentenceBefore: "I have",
    sentenceAfter: "questions about the new system.",
    sentenceEs: "Tengo unas preguntas / muchas preguntas sobre el nuevo sistema.",
    acceptableAnswers: ['a few', 'a lot of', 'many'],
    primaryAnswer: 'a few',
    explanationEn: '"Questions" is countable plural. "A few" indicates several inquiries, while "a lot of" also makes sense grammatically.',
    explanationEs: '"Questions" es contable plural. "A few" (unas cuantas) o "a lot of" (muchas) son opciones perfectamente válidas.',
  },
  {
    id: 'rlp-5',
    number: 5,
    sentenceBefore: "There are only",
    sentenceAfter: "eggs left. We need to buy more.",
    sentenceEs: "Solo quedan unos pocos huevos. Necesitamos comprar más.",
    acceptableAnswers: ['a few'],
    primaryAnswer: 'a few',
    explanationEn: 'The word "only" combined with plural count noun "eggs" and the need to buy more uniquely pairs with "a few" ("only a few eggs left").',
    explanationEs: 'La palabra "only" seguida del contable plural "eggs" requiere exclusivamente "a few" ("solo unos pocos huevos").',
  },
  {
    id: 'rlp-6',
    number: 6,
    sentenceBefore: "We have",
    sentenceAfter: "time before the train leaves. Let's hurry.",
    sentenceEs: "Tenemos poco tiempo antes de que salga el tren. Démonos prisa.",
    acceptableAnswers: ['a little', 'little'],
    primaryAnswer: 'a little',
    explanationEn: '"Time" is uncountable. To express a small amount of time, we use "a little time".',
    explanationEs: '"Time" es incontable. Para indicar una cantidad pequeña de tiempo usamos "a little time".',
  },
  {
    id: 'rlp-7',
    number: 7,
    sentenceBefore: "Do you have",
    sentenceAfter: "information about the hotel?",
    sentenceEs: "¿Tiene alguna información sobre el hotel?",
    acceptableAnswers: ['any'],
    primaryAnswer: 'any',
    explanationEn: '"Information" is uncountable. In general open questions seeking facts, "any" is the standard quantifier ("Do you have any information...?").',
    explanationEs: '"Information" es incontable. En preguntas abiertas usamos "any" ("Do you have any information...?").',
  },
  {
    id: 'rlp-8',
    number: 8,
    sentenceBefore: "She doesn't drink",
    sentenceAfter: "coffee because it makes her nervous.",
    sentenceEs: "Ella no toma mucho café / nada de café porque la pone nerviosa.",
    acceptableAnswers: ['much', 'any'],
    primaryAnswer: 'much',
    explanationEn: '"Coffee" as a liquid is uncountable. In negative sentences, "much" (or "any") expresses quantity: "She doesn\'t drink much coffee".',
    explanationEs: '"Coffee" es incontable. En oraciones negativas, "much" (mucho café) o "any" (nada de café) es la opción gramatical correcta.',
  },
];

// ---------------------------------------------------------------------------
// 3. AT THE SUPERMARKET (7 QUESTIONS + WRITING)
// ---------------------------------------------------------------------------
export const SUPERMARKET_INVENTORY = [
  { itemEn: '2 bottles of wine', itemEs: '2 botellas de vino', countType: 'countable bottles' },
  { itemEn: '1 bag of rice', itemEs: '1 bolsa de arroz', countType: 'countable bag of uncountable rice' },
  { itemEn: '3 tomatoes', itemEs: '3 tomates', countType: 'countable plural' },
  { itemEn: 'half a kilo of meat', itemEs: 'medio kilo de carne', countType: 'measured uncountable meat' },
  { itemEn: '6 eggs', itemEs: '6 huevos', countType: 'countable plural' },
  { itemEn: 'some cheese', itemEs: 'algo de queso', countType: 'uncountable' },
  { itemEn: 'no bread', itemEs: 'nada de pan', countType: 'zero uncountable' },
];

export const SUPERMARKET_QUESTIONS: SupermarketInventoryItem[] = [
  {
    id: 'sm-1',
    number: 1,
    questionEn: 'How many bottles of wine do you have?',
    questionEs: '¿Cuántas botellas de vino tienes?',
    expectedAnswerEn: 'I have two bottles of wine.',
    expectedAnswerEs: 'Tengo dos botellas de vino.',
    acceptableVariations: ['2 bottles', 'two bottles', 'i have 2 bottles of wine', 'two bottles of wine'],
    explanationEn: '"Bottles" is countable, so we answer with the exact number: "two bottles of wine".',
    explanationEs: '"Bottles" es contable, por lo que respondemos con la cantidad exacta: "two bottles of wine".',
  },
  {
    id: 'sm-2',
    number: 2,
    questionEn: 'How much rice do you have?',
    questionEs: '¿Cuánto arroz tienes?',
    expectedAnswerEn: 'I have one bag of rice.',
    expectedAnswerEs: 'Tengo una bolsa de arroz.',
    acceptableVariations: ['one bag of rice', 'a bag of rice', '1 bag of rice', 'i have a bag of rice', 'i have 1 bag of rice'],
    explanationEn: '"Rice" is uncountable, so we quantify it using the container: "one bag of rice".',
    explanationEs: '"Rice" es incontable, por lo que lo cuantificamos con su envase: "one bag of rice".',
  },
  {
    id: 'sm-3',
    number: 3,
    questionEn: 'How many tomatoes do you have?',
    questionEs: '¿Cuántos tomates tienes?',
    expectedAnswerEn: 'I have three tomatoes.',
    expectedAnswerEs: 'Tengo tres tomates.',
    acceptableVariations: ['three tomatoes', '3 tomatoes', 'i have 3 tomatoes'],
    explanationEn: '"Tomatoes" is a countable plural noun: "three tomatoes".',
    explanationEs: '"Tomatoes" es un sustantivo contable en plural: "three tomatoes".',
  },
  {
    id: 'sm-4',
    number: 4,
    questionEn: 'How much meat do you have?',
    questionEs: '¿Cuánta carne tienes?',
    expectedAnswerEn: 'I have half a kilo of meat.',
    expectedAnswerEs: 'Tengo medio kilo de carne.',
    acceptableVariations: ['half a kilo of meat', 'half a kilo', '0.5 kg of meat', 'i have half a kilo of meat'],
    explanationEn: '"Meat" is uncountable, so we specify weight: "half a kilo of meat".',
    explanationEs: '"Meat" es incontable, por lo que indicamos el peso: "half a kilo of meat".',
  },
  {
    id: 'sm-5',
    number: 5,
    questionEn: 'How many eggs do you have?',
    questionEs: '¿Cuántos huevos tienes?',
    expectedAnswerEn: 'I have six eggs.',
    expectedAnswerEs: 'Tengo seis huevos.',
    acceptableVariations: ['six eggs', '6 eggs', 'half a dozen eggs', 'i have 6 eggs'],
    explanationEn: '"Eggs" is countable plural: "six eggs".',
    explanationEs: '"Eggs" es contable plural: "six eggs".',
  },
  {
    id: 'sm-6',
    number: 6,
    questionEn: 'Do you have any bread?',
    questionEs: '¿Tienes pan?',
    expectedAnswerEn: 'No, I don\'t have any bread. (I have no bread)',
    expectedAnswerEs: 'No, no tengo nada de pan.',
    acceptableVariations: ['no, i don\'t have any bread', 'no, i have no bread', 'no', 'no bread', 'i don\'t have any bread'],
    explanationEn: '"Bread" is uncountable. The list states "no bread", so we say "No, I don\'t have any bread" or "I have no bread".',
    explanationEs: '"Bread" es incontable. La lista indica "no bread", así que decimos "No, I don\'t have any bread" o "I have no bread".',
  },
  {
    id: 'sm-7',
    number: 7,
    questionEn: 'Do you have any cheese?',
    questionEs: '¿Tienes queso?',
    expectedAnswerEn: 'Yes, I have some cheese.',
    expectedAnswerEs: 'Sí, tengo algo de queso.',
    acceptableVariations: ['yes, i have some cheese', 'yes, some cheese', 'some cheese', 'yes'],
    explanationEn: '"Cheese" is uncountable. In the affirmative, we say "Yes, I have some cheese".',
    explanationEs: '"Cheese" es incontable. En afirmativa decimos "Yes, I have some cheese".',
  },
];

// ---------------------------------------------------------------------------
// 4. WHICH ONE SOUNDS NATURAL? (8 PAIRS)
// ---------------------------------------------------------------------------
export const NATURAL_SOUND_ITEMS: NaturalSoundItem[] = [
  {
    id: 'ns-1',
    number: 1,
    optionA: {
      text: 'I need some advice.',
      isCorrect: true,
      explanationEn: 'Correct! "Advice" is uncountable in English and never takes the article "an".',
      explanationEs: '¡Correcto! "Advice" es incontable en inglés y nunca lleva "an".',
    },
    optionB: {
      text: 'I need an advice.',
      isCorrect: false,
      explanationEn: 'Incorrect. You cannot say "an advice". Say "some advice" or "a piece of advice".',
      explanationEs: 'Incorrecto. No se puede decir "an advice". Se dice "some advice" o "a piece of advice".',
    },
    correctOption: 'a',
  },
  {
    id: 'ns-2',
    number: 2,
    optionA: {
      text: "We don't have much time.",
      isCorrect: true,
      explanationEn: 'Correct! "Time" is uncountable when referring to duration or availability, so we use "much time".',
      explanationEs: '¡Correcto! "Time" es incontable, por lo que decimos "much time".',
    },
    optionB: {
      text: "We don't have many time.",
      isCorrect: false,
      explanationEn: 'Incorrect. "Many" is only used with countable plural nouns.',
      explanationEs: 'Incorrecto. "Many" solo se usa con sustantivos contables en plural.',
    },
    correctOption: 'a',
  },
  {
    id: 'ns-3',
    number: 3,
    optionA: {
      text: 'There are a few restaurants near the hotel.',
      isCorrect: true,
      explanationEn: 'Correct! "Restaurants" is a plural countable noun, so it requires "a few".',
      explanationEs: '¡Correcto! "Restaurants" es contable plural, por lo que requiere "a few".',
    },
    optionB: {
      text: 'There are a little restaurants near the hotel.',
      isCorrect: false,
      explanationEn: 'Incorrect. "A little" is only used with uncountable nouns (e.g. a little soup).',
      explanationEs: 'Incorrecto. "A little" solo se utiliza con sustantivos incontables.',
    },
    correctOption: 'a',
  },
  {
    id: 'ns-4',
    number: 4,
    optionA: {
      text: 'She gave me some useful information.',
      isCorrect: true,
      explanationEn: 'Correct! "Information" has no plural form (*informations does not exist in English).',
      explanationEs: '¡Correcto! "Information" no tiene forma plural (*informations no existe en inglés).',
    },
    optionB: {
      text: 'She gave me some useful informations.',
      isCorrect: false,
      explanationEn: 'Incorrect. Never add "-s" to "information". Say "some information" or "pieces of information".',
      explanationEs: 'Incorrecto. Nunca agregues "-s" a "information".',
    },
    correctOption: 'a',
  },
  {
    id: 'ns-5',
    number: 5,
    optionA: {
      text: "I don't have many clothes.",
      isCorrect: true,
      explanationEn: 'Correct! "Clothes" is always plural in English and takes "many" (or "a lot of"), never "much".',
      explanationEs: '¡Correcto! "Clothes" es siempre plural y lleva "many" (o "a lot of"), nunca "much".',
    },
    optionB: {
      text: "I don't have much clothes.",
      isCorrect: false,
      explanationEn: 'Incorrect. "Clothes" is a plural noun, so it cannot take "much".',
      explanationEs: 'Incorrecto. "Clothes" es un sustantivo plural, por lo que no puede llevar "much".',
    },
    correctOption: 'a',
  },
  {
    id: 'ns-6',
    number: 6,
    optionA: {
      text: 'How much luggage do you have?',
      isCorrect: true,
      explanationEn: 'Correct! "Luggage" is uncountable, so we ask "How much luggage".',
      explanationEs: '¡Correcto! "Luggage" es incontable, por lo que preguntamos "How much luggage".',
    },
    optionB: {
      text: 'How many luggage do you have?',
      isCorrect: false,
      explanationEn: 'Incorrect. To use "many", you must say "How many bags / suitcases do you have?".',
      explanationEs: 'Incorrecto. Para usar "many", debes decir "How many bags / suitcases do you have?".',
    },
    correctOption: 'a',
  },
  {
    id: 'ns-7',
    number: 7,
    optionA: {
      text: "There isn't much traffic today.",
      isCorrect: true,
      explanationEn: 'Correct! "Traffic" is uncountable singular, taking "isn\'t" and "much".',
      explanationEs: '¡Correcto! "Traffic" es incontable singular, por lo que rige "isn\'t" y "much".',
    },
    optionB: {
      text: "There aren't many traffic today.",
      isCorrect: false,
      explanationEn: 'Incorrect. "Traffic" is not plural, so it cannot take "aren\'t many".',
      explanationEs: 'Incorrecto. "Traffic" no es plural, por lo que no puede llevar "aren\'t many".',
    },
    correctOption: 'a',
  },
  {
    id: 'ns-8',
    number: 8,
    optionA: {
      text: 'We need a few chairs.',
      isCorrect: true,
      explanationEn: 'Correct! "Chairs" is a plural countable noun and pairs with "a few".',
      explanationEs: '¡Correcto! "Chairs" es un sustantivo contable en plural y se combina con "a few".',
    },
    optionB: {
      text: 'We need a little chairs.',
      isCorrect: false,
      explanationEn: 'Incorrect. "A little" cannot modify plural countable nouns.',
      explanationEs: 'Incorrecto. "A little" no puede modificar a sustantivos contables plurales.',
    },
    correctOption: 'a',
  },
];

// ---------------------------------------------------------------------------
// 5. FIND THE PROBLEM (8 ITEMS)
// ---------------------------------------------------------------------------
export const FIND_THE_PROBLEM_ITEMS: FindTheProblemItem[] = [
  {
    id: 'ftp-1',
    number: 1,
    incorrectSentenceEn: 'I need an information about the hotel.',
    incorrectSentenceEs: 'Necesito una información sobre el hotel.',
    mistakeEn: '"an information" -> "information" is uncountable and cannot take "an".',
    mistakeEs: '"an information" -> "information" es incontable y no puede llevar "an".',
    correctSentenceEn: 'I need some information about the hotel.',
    correctSentenceEs: 'Necesito información / algo de información sobre el hotel.',
    acceptableAnswers: [
      'i need some information about the hotel',
      'i need some information about the hotel.',
      'i need information about the hotel',
      'i need information about the hotel.',
      'i need a piece of information about the hotel.',
    ],
    explanationEn: 'Use "some information" or "a piece of information". Never say "an information".',
    explanationEs: 'Usa "some information" o "a piece of information". Nunca digas "an information".',
  },
  {
    id: 'ftp-2',
    number: 2,
    incorrectSentenceEn: 'How many money do you have?',
    incorrectSentenceEs: '¿Cuánto dinero tienes?',
    mistakeEn: '"How many money" -> "money" is uncountable, so it requires "How much".',
    mistakeEs: '"How many money" -> "money" es incontable, por lo que requiere "How much".',
    correctSentenceEn: 'How much money do you have?',
    correctSentenceEs: '¿Cuánto dinero tienes?',
    acceptableAnswers: [
      'how much money do you have',
      'how much money do you have?',
    ],
    explanationEn: 'Always use "How much" with "money". Say "How many dollars" only if mentioning the currency.',
    explanationEs: 'Usa siempre "How much" con "money".',
  },
  {
    id: 'ftp-3',
    number: 3,
    incorrectSentenceEn: "There isn't many traffic today.",
    incorrectSentenceEs: 'No hay mucho tráfico hoy.',
    mistakeEn: '"many traffic" -> "traffic" is uncountable and takes "much", not "many".',
    mistakeEs: '"many traffic" -> "traffic" es incontable y lleva "much", no "many".',
    correctSentenceEn: "There isn't much traffic today.",
    correctSentenceEs: 'No hay mucho tráfico hoy.',
    acceptableAnswers: [
      "there isn't much traffic today",
      "there isn't much traffic today.",
      "there is not much traffic today",
      "there is not much traffic today.",
    ],
    explanationEn: 'Because "traffic" is uncountable, we say "There isn\'t much traffic".',
    explanationEs: 'Dado que "traffic" es incontable, decimos "There isn\'t much traffic".',
  },
  {
    id: 'ftp-4',
    number: 4,
    incorrectSentenceEn: 'She gave me two advices.',
    incorrectSentenceEs: 'Ella me dio dos consejos.',
    mistakeEn: '"two advices" -> "advice" cannot be pluralized with -s or counted with numbers.',
    mistakeEs: '"two advices" -> "advice" no lleva -s ni se cuenta con números directos.',
    correctSentenceEn: 'She gave me two pieces of advice.',
    correctSentenceEs: 'Ella me dio dos consejos.',
    acceptableAnswers: [
      'she gave me two pieces of advice',
      'she gave me two pieces of advice.',
      'she gave me some advice',
      'she gave me some advice.',
    ],
    explanationEn: 'Count advice using "pieces of advice": "two pieces of advice" or simply "some advice".',
    explanationEs: 'Cuenta los consejos diciendo "pieces of advice" o simplemente "some advice".',
  },
  {
    id: 'ftp-5',
    number: 5,
    incorrectSentenceEn: 'We bought three breads.',
    incorrectSentenceEs: 'Compramos tres panes.',
    mistakeEn: '"three breads" -> "bread" is uncountable and cannot take -s.',
    mistakeEs: '"three breads" -> "bread" es incontable y no lleva -s.',
    correctSentenceEn: 'We bought three loaves of bread.',
    correctSentenceEs: 'Compramos tres barras de pan.',
    acceptableAnswers: [
      'we bought three loaves of bread',
      'we bought three loaves of bread.',
      'we bought some bread',
      'we bought some bread.',
      'we bought three pieces of bread.',
    ],
    explanationEn: 'To count bread, use "loaves of bread" (barras de pan) or "some bread".',
    explanationEs: 'Para contar el pan usamos "loaves of bread" o "some bread".',
  },
  {
    id: 'ftp-6',
    number: 6,
    incorrectSentenceEn: "I don't have much friends.",
    incorrectSentenceEs: 'No tengo muchos amigos.',
    mistakeEn: '"much friends" -> "friends" is countable plural and takes "many", not "much".',
    mistakeEs: '"much friends" -> "friends" es contable plural y lleva "many", no "much".',
    correctSentenceEn: "I don't have many friends.",
    correctSentenceEs: 'No tengo muchos amigos.',
    acceptableAnswers: [
      "i don't have many friends",
      "i don't have many friends.",
      "i do not have many friends",
      "i do not have many friends.",
      "i don't have a lot of friends.",
    ],
    explanationEn: 'Countable plural nouns take "many": "I don\'t have many friends".',
    explanationEs: 'Los contables plurales van con "many": "I don\'t have many friends".',
  },
  {
    id: 'ftp-7',
    number: 7,
    incorrectSentenceEn: 'There are a little people at the meeting.',
    incorrectSentenceEs: 'Hay poca gente en la reunión.',
    mistakeEn: '"a little people" -> "people" is countable plural and requires "a few", not "a little".',
    mistakeEs: '"a little people" -> "people" es contable plural y requiere "a few", no "a little".',
    correctSentenceEn: 'There are a few people at the meeting.',
    correctSentenceEs: 'Hay unas pocas personas en la reunión.',
    acceptableAnswers: [
      'there are a few people at the meeting',
      'there are a few people at the meeting.',
      'there are few people at the meeting.',
    ],
    explanationEn: 'Always use "a few" with "people": "There are a few people at the meeting".',
    explanationEs: 'Usa siempre "a few" con "people": "There are a few people at the meeting".',
  },
  {
    id: 'ftp-8',
    number: 8,
    incorrectSentenceEn: 'I need a few water.',
    incorrectSentenceEs: 'Necesito un poco de agua.',
    mistakeEn: '"a few water" -> "water" is uncountable and takes "a little" or "some", not "a few".',
    mistakeEs: '"a few water" -> "water" es incontable y lleva "a little" o "some", no "a few".',
    correctSentenceEn: 'I need a little water.',
    correctSentenceEs: 'Necesito un poco de agua.',
    acceptableAnswers: [
      'i need a little water',
      'i need a little water.',
      'i need some water',
      'i need some water.',
      'i need a bottle of water.',
      'i need a glass of water.',
    ],
    explanationEn: 'Uncountable liquids take "a little" or "some": "I need a little water" / "I need some water".',
    explanationEs: 'Los líquidos incontables llevan "a little" o "some": "I need a little water" / "I need some water".',
  },
];

// ---------------------------------------------------------------------------
// 6. A TRIP TO LONDON (8 QUESTIONS + 3 PERSONAL ANSWERS)
// ---------------------------------------------------------------------------
export const TRIP_TO_LONDON_ITEMS: TripToLondonItem[] = [
  {
    id: 'ttl-1',
    number: 1,
    sentenceAfter: 'money do you want to take?',
    sentenceEs: '¿Cuánto dinero quieres llevar?',
    correctQuantifier: 'HOW MUCH',
    explanationEn: '"Money" is uncountable, so we ask "How much money".',
    explanationEs: '"Money" es incontable, por lo que preguntamos "How much money".',
  },
  {
    id: 'ttl-2',
    number: 2,
    sentenceAfter: 'suitcases are you taking?',
    sentenceEs: '¿Cuántas maletas vas a llevar?',
    correctQuantifier: 'HOW MANY',
    explanationEn: '"Suitcases" is a countable plural noun, so we ask "How many suitcases".',
    explanationEs: '"Suitcases" es contable plural, por lo que preguntamos "How many suitcases".',
  },
  {
    id: 'ttl-3',
    number: 3,
    sentenceAfter: 'luggage can you take on the plane?',
    sentenceEs: '¿Cuánto equipaje puedes llevar en el avión?',
    correctQuantifier: 'HOW MUCH',
    explanationEn: '"Luggage" is uncountable, so we ask "How much luggage".',
    explanationEs: '"Luggage" es incontable, por lo que preguntamos "How much luggage".',
  },
  {
    id: 'ttl-4',
    number: 4,
    sentenceAfter: 'clothes do you need?',
    sentenceEs: '¿Cuánta ropa necesitas?',
    correctQuantifier: 'HOW MANY',
    explanationEn: '"Clothes" is a plural noun in English, so we ask "How many clothes".',
    explanationEs: '"Clothes" es un sustantivo plural en inglés, por lo que preguntamos "How many clothes".',
  },
  {
    id: 'ttl-5',
    number: 5,
    sentenceAfter: 'tickets do you have to buy?',
    sentenceEs: '¿Cuántos billetes / entradas tienes que comprar?',
    correctQuantifier: 'HOW MANY',
    explanationEn: '"Tickets" is countable plural, so we ask "How many tickets".',
    explanationEs: '"Tickets" es contable plural, por lo que preguntamos "How many tickets".',
  },
  {
    id: 'ttl-6',
    number: 6,
    sentenceAfter: 'information do you need before the trip?',
    sentenceEs: '¿Cuánta información necesitas antes del viaje?',
    correctQuantifier: 'HOW MUCH',
    explanationEn: '"Information" is uncountable, so we ask "How much information".',
    explanationEs: '"Information" es incontable, por lo que preguntamos "How much information".',
  },
  {
    id: 'ttl-7',
    number: 7,
    sentenceAfter: 'sandwiches should we prepare?',
    sentenceEs: '¿Cuántos sándwiches deberíamos preparar?',
    correctQuantifier: 'HOW MANY',
    explanationEn: '"Sandwiches" is countable plural, so we ask "How many sandwiches".',
    explanationEs: '"Sandwiches" es contable plural, por lo que preguntamos "How many sandwiches".',
  },
  {
    id: 'ttl-8',
    number: 8,
    sentenceAfter: 'food can we take on the plane?',
    sentenceEs: '¿Cuánta comida podemos llevar en el avión?',
    correctQuantifier: 'HOW MUCH',
    explanationEn: '"Food" is uncountable when referring to sustenance in general, so we ask "How much food".',
    explanationEs: '"Food" es incontable en sentido general, por lo que preguntamos "How much food".',
  },
];

// ---------------------------------------------------------------------------
// 7. AT A RESTAURANT (CONVERSATION & 4 IN-DEPTH QUESTIONS)
// ---------------------------------------------------------------------------
export const RESTAURANT_DIALOGUE_SCRIPT: RestaurantDialogueTurn[] = [
  {
    speaker: 'Waiter',
    speakerEs: 'Camarero',
    textBefore: 'Are you ready to order?',
    textEs: '¿Están listos para ordenar?',
  },
  {
    speaker: 'Customer',
    speakerEs: 'Cliente',
    textBefore: "Yes. We'd like",
    blankId: 'res-blank-1',
    correctBlank: 'some',
    acceptableBlanks: ['some', 'a little'],
    textAfter: 'water, please.',
    textEs: "Sí. Quisiéramos algo de agua, por favor.",
  },
  {
    speaker: 'Waiter',
    speakerEs: 'Camarero',
    textBefore: 'Still or sparkling?',
    textEs: '¿Natural o con gas?',
  },
  {
    speaker: 'Customer',
    speakerEs: 'Cliente',
    textBefore: "Still. And we'd like",
    blankId: 'res-blank-2',
    correctBlank: 'two',
    acceptableBlanks: ['two', '2', 'a couple of'],
    textAfter: 'bottles.',
    textEs: 'Natural. Y quisiéramos dos botellas.',
  },
  {
    speaker: 'Waiter',
    speakerEs: 'Camarero',
    textBefore: 'Anything to eat?',
    textEs: '¿Algo para comer?',
  },
  {
    speaker: 'Customer',
    speakerEs: 'Cliente',
    textBefore: 'Yes. We need',
    blankId: 'res-blank-3',
    correctBlank: 'some',
    acceptableBlanks: ['some', 'a little'],
    textAfter: 'bread for the table.',
    textEs: 'Sí. Necesitamos algo de pan para la mesa.',
  },
  {
    speaker: 'Waiter',
    speakerEs: 'Camarero',
    textBefore: 'And what would you like for the main course?',
    textEs: '¿Y qué les gustaría de plato principal?',
  },
  {
    speaker: 'Customer',
    speakerEs: 'Cliente',
    textBefore: 'Two pizzas and',
    blankId: 'res-blank-4',
    correctBlank: 'a',
    acceptableBlanks: ['a', 'one'],
    textAfter: 'salad.',
    textEs: 'Dos pizzas y una ensalada.',
  },
  {
    speaker: 'Waiter',
    speakerEs: 'Camarero',
    textBefore: 'Anything else?',
    textEs: '¿Algo más?',
  },
  {
    speaker: 'Customer',
    speakerEs: 'Cliente',
    textBefore: "No, that's all. We don't need",
    blankId: 'res-blank-5',
    correctBlank: 'any',
    acceptableBlanks: ['any'],
    textAfter: 'dessert.',
    textEs: "No, eso es todo. No necesitamos nada de postre.",
  },
];

export const RESTAURANT_ANALYSIS_QUESTIONS = [
  {
    id: 'raq-1',
    questionEn: 'Why does the customer say "some water"?',
    questionEs: '¿Por qué el cliente dice "some water"?',
    answerEn:
      'Because "water" is an uncountable liquid and the customer is making a polite request for an unspecified quantity rather than naming an exact container initially.',
    answerEs:
      'Porque "water" es un líquido incontable y el cliente hace una petición cortés de una cantidad no especificada antes de concretar el envase.',
  },
  {
    id: 'raq-2',
    questionEn: 'Why does the customer say "two bottles"?',
    questionEs: '¿Por qué el cliente dice "two bottles"?',
    answerEn:
      'Because "bottle" is a countable noun (one bottle, two bottles). The container makes it possible to specify an exact number.',
    answerEs:
      'Porque "bottle" es un sustantivo contable (una botella, dos botellas). El envase permite especificar un número exacto.',
  },
  {
    id: 'raq-3',
    questionEn: 'Why can\'t we say "two waters" in this context?',
    questionEs: '¿Por qué no podemos decir "two waters" en este contexto?',
    answerEn:
      'In formal standard English, "water" has no plural form. Saying "two waters" is colloquial jargon; specifying the container ("two bottles of water") is grammatically precise.',
    answerEs:
      'En inglés formal estándar "water" no tiene plural. "Two waters" es jerga informal; indicar el recipiente ("two bottles of water") es lo gramaticalmente correcto.',
  },
  {
    id: 'raq-4',
    questionEn: 'Why do we say "some bread"?',
    questionEs: '¿Por qué decimos "some bread"?',
    answerEn:
      'Because "bread" is an uncountable noun in English. We never say "*a bread"; we say "some bread" or "a loaf of bread / some slices of bread".',
    answerEs:
      'Porque "bread" (pan) es incontable en inglés. Nunca decimos "*a bread"; decimos "some bread" o "a loaf / slices of bread".',
  },
];

// ---------------------------------------------------------------------------
// 8. WORK PROBLEMS (6 ITEMS)
// ---------------------------------------------------------------------------
export const WORK_PROBLEMS_ITEMS: WorkProblemItem[] = [
  {
    id: 'wp-1',
    number: 1,
    contextEn: 'Imagine you are at work and the deadline is in twenty minutes.',
    contextEs: 'Imagina que estás en el trabajo y la fecha límite es en veinte minutos.',
    promptEn: "We can't finish the report. We don't have ______ time.",
    promptEs: "No podemos terminar el informe. No tenemos ______ tiempo.",
    options: [
      { key: 'a', text: 'enough', isCorrect: true },
      { key: 'b', text: 'many', isCorrect: false },
      { key: 'c', text: 'a few', isCorrect: false },
    ],
    correctAnswer: 'a',
    explanationEn: '"Time" is uncountable. Neither "many" nor "a few" can modify an uncountable noun. "Enough" fits both countable and uncountable nouns.',
    explanationEs: '"Time" es incontable. Ni "many" ni "a few" pueden modificar a un incontable. "Enough" (suficiente) es la única opción correcta.',
  },
  {
    id: 'wp-2',
    number: 2,
    contextEn: 'The team cannot choose a strategy yet.',
    contextEs: 'El equipo no puede elegir una estrategia todavía.',
    promptEn: 'We need ______ information before making a decision.',
    promptEs: 'Necesitamos ______ información antes de tomar una decisión.',
    options: [
      { key: 'a', text: 'more', isCorrect: true },
      { key: 'b', text: 'many', isCorrect: false },
      { key: 'c', text: 'a few', isCorrect: false },
    ],
    correctAnswer: 'a',
    explanationEn: '"Information" is uncountable. "Many" and "a few" are strictly for plural count nouns. "More" works with uncountable nouns.',
    explanationEs: '"Information" es incontable. "Many" y "a few" son exclusivos de contables plurales. "More" (más) es la opción correcta.',
  },
  {
    id: 'wp-3',
    number: 3,
    contextEn: 'You are proofreading an important contract.',
    contextEs: 'Estás revisando un contrato importante.',
    promptEn: 'There are ______ mistakes in the document. We need to check it again.',
    promptEs: 'Hay ______ errores en el documento. Tenemos que revisarlo de nuevo.',
    options: [
      { key: 'a', text: 'much', isCorrect: false },
      { key: 'b', text: 'several', isCorrect: true },
      { key: 'c', text: 'a little', isCorrect: false },
    ],
    correctAnswer: 'b',
    explanationEn: '"Mistakes" is a countable plural noun. "Much" and "a little" are for uncountable nouns. "Several" correctly quantifies countable plurals.',
    explanationEs: '"Mistakes" (errores) es contable en plural. "Much" y "a little" son para incontables. "Several" (varios) es la respuesta correcta.',
  },
  {
    id: 'wp-4',
    number: 4,
    contextEn: 'Your calendar is completely full today.',
    contextEs: 'Tu agenda está completamente llena hoy.',
    promptEn: "I have ______ work to do today, so I probably won't leave early.",
    promptEs: "Tengo ______ trabajo que hacer hoy, así que probablemente no saldré temprano.",
    options: [
      { key: 'a', text: 'a lot of', isCorrect: true },
      { key: 'b', text: 'many', isCorrect: false },
      { key: 'c', text: 'a few', isCorrect: false },
    ],
    correctAnswer: 'a',
    explanationEn: '"Work" (labor, tareas) is an uncountable noun. We cannot say "many work" or "a few work". We say "a lot of work" (or "much work").',
    explanationEs: '"Work" (trabajo) es incontable. No decimos "many work" ni "a few work". Decimos "a lot of work".',
  },
  {
    id: 'wp-5',
    number: 5,
    contextEn: 'You are preparing the projector right before a client presentation.',
    contextEs: 'Estás preparando el proyector justo antes de una reunión.',
    promptEn: 'We only have ______ minutes before the meeting.',
    promptEs: 'Solo tenemos ______ minutos antes de la reunión.',
    options: [
      { key: 'a', text: 'a little', isCorrect: false },
      { key: 'b', text: 'a few', isCorrect: true },
      { key: 'c', text: 'much', isCorrect: false },
    ],
    correctAnswer: 'b',
    explanationEn: '"Minutes" is a countable plural noun. We say "a few minutes" (or "only a few minutes"), never "a little minutes".',
    explanationEs: '"Minutes" es contable plural. Decimos "a few minutes", nunca "a little minutes".',
  },
  {
    id: 'wp-6',
    number: 6,
    contextEn: 'You received a brief email without the required details.',
    contextEs: 'Recibiste un correo breve sin los detalles necesarios.',
    promptEn: "There isn't ______ information in the email.",
    promptEs: "No hay ______ información en el correo electrónico.",
    options: [
      { key: 'a', text: 'many', isCorrect: false },
      { key: 'b', text: 'enough', isCorrect: true },
      { key: 'c', text: 'a few', isCorrect: false },
    ],
    correctAnswer: 'b',
    explanationEn: '"Information" is uncountable and cannot take "many" or "a few". "Enough" (suficiente) is grammatically and semantically correct.',
    explanationEs: '"Information" es incontable y no puede llevar "many" ni "a few". "Enough" (suficiente) es la opción correcta.',
  },
];

// ---------------------------------------------------------------------------
// 9. COUNTABLE OR UNCOUNTABLE — BUT THINK! (6 DUAL NOUNS)
// ---------------------------------------------------------------------------
export const DUAL_NOUN_ITEMS: DualNounItem[] = [
  {
    id: 'dn-1',
    number: 1,
    noun: 'chicken',
    sentenceOptions: {
      opt1: 'some chicken',
      opt2: 'a chicken',
    },
    contextEn: 'Meaning: I want some food / meat to eat.',
    contextEs: 'Significado: Quiero comida / carne para comer.',
    correctChoice: 'some chicken',
    fullSentenceEn: "I'd like some chicken.",
    fullSentenceEs: 'Quisiera algo de pollo (comida).',
    explanationEn: 'When referring to the meat/food as a substance on a plate, "chicken" is uncountable: "some chicken".',
    explanationEs: 'Cuando nos referimos a la carne/alimento como sustancia, "chicken" es incontable: "some chicken".',
  },
  {
    id: 'dn-2',
    number: 2,
    noun: 'chickens',
    sentenceOptions: {
      opt1: 'some chickens',
      opt2: 'some chicken',
    },
    contextEn: 'Meaning: living animals walking around on a farm.',
    contextEs: 'Significado: animales vivos caminando en la granja.',
    correctChoice: 'some chickens',
    fullSentenceEn: 'We saw some chickens on the farm.',
    fullSentenceEs: 'Vimos unas gallinas en la granja.',
    explanationEn: 'When referring to the live animals, "chicken" is countable: "one chicken, two chickens, some chickens".',
    explanationEs: 'Al referirnos a los animales vivos, "chicken" es contable: "some chickens".',
  },
  {
    id: 'dn-3',
    number: 3,
    noun: 'coffee (cups)',
    sentenceOptions: {
      opt1: 'two coffees',
      opt2: 'some coffee',
    },
    contextEn: 'Meaning: two distinct cups of coffee ordered at a cafe.',
    contextEs: 'Significado: dos tazas específicas de café pedidas en una cafetería.',
    correctChoice: 'two coffees',
    fullSentenceEn: "I'd like two coffees, please.",
    fullSentenceEs: 'Quisiera dos cafés (dos tazas), por favor.',
    explanationEn: 'In cafe ordering shorthand, we treat cups of coffee as countable items: "two coffees" = "two cups of coffee".',
    explanationEs: 'Al ordenar en un café, se tratan las tazas como contables: "two coffees" = "dos tazas de café".',
  },
  {
    id: 'dn-4',
    number: 4,
    noun: 'coffee (drink)',
    sentenceOptions: {
      opt1: 'much coffee',
      opt2: 'many coffees',
    },
    contextEn: 'Meaning: the beverage/liquid in general.',
    contextEs: 'Significado: la bebida/líquido en general.',
    correctChoice: 'much coffee',
    fullSentenceEn: "I don't drink much coffee.",
    fullSentenceEs: 'No tomo mucho café (la bebida en general).',
    explanationEn: 'When discussing the drink in general as an ingredient or habit, "coffee" is uncountable: "much coffee".',
    explanationEs: 'Al hablar de la bebida en general como hábito, "coffee" es incontable: "much coffee".',
  },
  {
    id: 'dn-5',
    number: 5,
    noun: 'paper (material)',
    sentenceOptions: {
      opt1: 'some paper',
      opt2: 'two papers',
    },
    contextEn: 'Meaning: blank material used for writing/drawing.',
    contextEs: 'Significado: material en blanco para escribir o dibujar.',
    correctChoice: 'some paper',
    fullSentenceEn: 'We bought some paper for the printer.',
    fullSentenceEs: 'Compramos papel para la impresora.',
    explanationEn: 'As a writing material/medium, "paper" is uncountable: "some paper" or "sheets of paper".',
    explanationEs: 'Como material para escribir o imprimir, "paper" es incontable: "some paper".',
  },
  {
    id: 'dn-6',
    number: 6,
    noun: 'papers (documents)',
    sentenceOptions: {
      opt1: 'two papers',
      opt2: 'some paper',
    },
    contextEn: 'Meaning: two academic essays or official documents.',
    contextEs: 'Significado: dos documentos oficiales o exámenes/ensayos.',
    correctChoice: 'two papers',
    fullSentenceEn: 'The teacher gave us two papers to read.',
    fullSentenceEs: 'El profesor nos dio dos documentos / lecturas para leer.',
    explanationEn: '"Paper" is countable when it refers to a newspaper, a research article, or a physical document/exam: "two papers".',
    explanationEs: '"Paper" es contable cuando alude a un periódico, un artículo científico o un documento específico: "two papers".',
  },
];

// ---------------------------------------------------------------------------
// 10. SPEAKING – REAL QUESTIONS (10 QUESTIONS)
// ---------------------------------------------------------------------------
export const SPEAKING_REAL_QUESTIONS: SpeakingQuestionItem[] = [
  {
    id: 'spk-1',
    number: 1,
    questionEn: 'How much money do you usually carry with you?',
    questionEs: '¿Cuánto dinero sueles llevar contigo?',
    grammarFocusEn: 'Uncountable "money" with "How much"',
    grammarFocusEs: 'Incontable "money" con "How much"',
    sampleAnswerEn: 'I usually only carry a little cash, around twenty dollars, because I pay mostly with my credit card.',
    sampleAnswerEs: 'Normalmente solo llevo un poco de efectivo, unos veinte dólares, porque pago casi todo con tarjeta de crédito.',
  },
  {
    id: 'spk-2',
    number: 2,
    questionEn: 'How many apps do you use every day?',
    questionEs: '¿Cuántas aplicaciones usas todos los días?',
    grammarFocusEn: 'Countable plural "apps" with "How many"',
    grammarFocusEs: 'Contable plural "apps" con "How many"',
    sampleAnswerEn: 'I use about six or seven apps every day, mainly messaging, banking, music, and social media.',
    sampleAnswerEs: 'Uso unas seis o siete aplicaciones al día, principalmente mensajería, banca, música y redes sociales.',
  },
  {
    id: 'spk-3',
    number: 3,
    questionEn: 'How much time do you spend on your phone?',
    questionEs: '¿Cuánto tiempo pasas en tu teléfono?',
    grammarFocusEn: 'Uncountable "time" with "How much"',
    grammarFocusEs: 'Incontable "time" con "How much"',
    sampleAnswerEn: 'I spend about three hours a day on my phone, mostly for work emails and checking news.',
    sampleAnswerEs: 'Paso unas tres horas al día en mi teléfono, sobre todo para correos del trabajo y leer noticias.',
  },
  {
    id: 'spk-4',
    number: 4,
    questionEn: 'How many people do you speak to every day?',
    questionEs: '¿Con cuántas personas hablas todos los días?',
    grammarFocusEn: 'Countable plural "people" with "How many"',
    grammarFocusEs: 'Contable plural "people" con "How many"',
    sampleAnswerEn: 'I speak to quite a lot of people at work, around ten colleagues and several clients.',
    sampleAnswerEs: 'Hablo con bastantes personas en el trabajo, unos diez compañeros y varios clientes.',
  },
  {
    id: 'spk-5',
    number: 5,
    questionEn: 'How much coffee or tea do you drink?',
    questionEs: '¿Cuánto café o té bebes?',
    grammarFocusEn: 'Uncountable liquids with "How much"',
    grammarFocusEs: 'Líquidos incontables con "How much"',
    sampleAnswerEn: 'I drink two cups of coffee in the morning and a cup of green tea in the afternoon.',
    sampleAnswerEs: 'Tomo dos tazas de café por la mañana y una taza de té verde por la tarde.',
  },
  {
    id: 'spk-6',
    number: 6,
    questionEn: 'How many clothes do you take when you travel?',
    questionEs: '¿Cuánta ropa llevas cuando viajas?',
    grammarFocusEn: 'Plural noun "clothes" with "How many"',
    grammarFocusEs: 'Sustantivo plural "clothes" con "How many"',
    sampleAnswerEn: 'I try to pack light, so I only take a few shirts, two pairs of trousers, and a jacket.',
    sampleAnswerEs: 'Intento viajar ligero, así que solo llevo unas pocas camisas, dos pantalones y una chaqueta.',
  },
  {
    id: 'spk-7',
    number: 7,
    questionEn: 'How much luggage do you usually take on holiday?',
    questionEs: '¿Cuánto equipaje sueles llevarte de vacaciones?',
    grammarFocusEn: 'Uncountable "luggage" with "How much"',
    grammarFocusEs: 'Incontable "luggage" con "How much"',
    sampleAnswerEn: 'I don’t take much luggage, just one carry-on suitcase and a small backpack.',
    sampleAnswerEs: 'No llevo mucho equipaje, solo una maleta de mano y una mochila pequeña.',
  },
  {
    id: 'spk-8',
    number: 8,
    questionEn: 'How many things do you always take when you leave home?',
    questionEs: '¿Cuántas cosas te llevas siempre al salir de casa?',
    grammarFocusEn: 'Countable plural "things" with "How many"',
    grammarFocusEs: 'Contable plural "things" con "How many"',
    sampleAnswerEn: 'I always carry three essential things: my smartphone, my keys, and my wallet.',
    sampleAnswerEs: 'Siempre llevo tres cosas esenciales: mi teléfono, mis llaves y mi cartera.',
  },
  {
    id: 'spk-9',
    number: 9,
    questionEn: 'Do you usually have much free time?',
    questionEs: '¿Sueles tener mucho tiempo libre?',
    grammarFocusEn: 'Uncountable "free time" with "much"',
    grammarFocusEs: 'Incontable "free time" con "much"',
    sampleAnswerEn: 'During the week I don’t have much free time, but at weekends I have a lot of time for sports and hobbies.',
    sampleAnswerEs: 'Entre semana no tengo mucho tiempo libre, pero los fines de semana tengo bastante tiempo para pasatiempos.',
  },
  {
    id: 'spk-10',
    number: 10,
    questionEn: 'Do you have many books at home?',
    questionEs: '¿Tienes muchos libros en casa?',
    grammarFocusEn: 'Countable plural "books" with "many"',
    grammarFocusEs: 'Contable plural "books" con "many"',
    sampleAnswerEn: 'Yes, I have a lot of books in my living room, probably more than fifty novels and reference books.',
    sampleAnswerEs: 'Sí, tengo muchos libros en mi sala, probablemente más de cincuenta novelas y libros de consulta.',
  },
];

// ---------------------------------------------------------------------------
// 11. FINAL CHALLENGE (PARAGRAPH CORRECTION)
// ---------------------------------------------------------------------------
export const FINAL_CHALLENGE_ORIGINAL =
  'Last weekend I went shopping. I bought many bread, two cheese, a bottle of water, three tomatoes and an information about a new restaurant. I didn\'t have many money, so I couldn\'t buy much things. There was also many traffic, so I arrived home very late.';

export const FINAL_CHALLENGE_CORRECT =
  'Last weekend I went shopping. I bought some bread, some cheese, a bottle of water, three tomatoes and some information about a new restaurant. I didn\'t have much money, so I couldn\'t buy many things. There was also a lot of traffic, so I arrived home very late.';

export const FINAL_CHALLENGE_ERRORS = [
  {
    incorrect: 'many bread',
    correction: 'some bread / a loaf of bread',
    reasonEn: '"Bread" is uncountable, so you cannot say "many bread". Use "some bread" or "a loaf of bread".',
    reasonEs: '"Bread" es incontable, no se dice "many bread". Usa "some bread" o "a loaf of bread".',
  },
  {
    incorrect: 'two cheese',
    correction: 'some cheese / two pieces of cheese',
    reasonEn: '"Cheese" is uncountable. Say "some cheese" or "two pieces/blocks of cheese".',
    reasonEs: '"Cheese" es incontable. Di "some cheese" o "two pieces/blocks of cheese".',
  },
  {
    incorrect: 'an information',
    correction: 'some information / information',
    reasonEn: '"Information" is uncountable and never takes "an". Say "some information" or "a brochure".',
    reasonEs: '"Information" es incontable y nunca lleva "an". Di "some information" o "a brochure".',
  },
  {
    incorrect: 'many money',
    correction: 'much money',
    reasonEn: '"Money" is uncountable. Negative sentences take "much money", not "many money".',
    reasonEs: '"Money" es incontable. En oraciones negativas se usa "much money", nunca "many money".',
  },
  {
    incorrect: 'much things',
    correction: 'many things',
    reasonEn: '"Things" is a countable plural noun and requires "many things", not "much".',
    reasonEs: '"Things" es contable plural y requiere "many things", no "much".',
  },
  {
    incorrect: 'many traffic',
    correction: 'a lot of traffic / much traffic',
    reasonEn: '"Traffic" is uncountable. In affirmative clauses use "a lot of traffic" (or "much traffic").',
    reasonEs: '"Traffic" es incontable. En oraciones afirmativas se dice "a lot of traffic".',
  },
];
