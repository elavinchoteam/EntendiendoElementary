import { Exercise } from '../types';

export interface TheoryCardItem {
  id: string;
  category: string;
  categoryEs: string;
  titleEn: string;
  titleEs: string;
  textEn: string;
  textEs: string;
  examples: {
    en: string;
    es: string;
    noteEn?: string;
    noteEs?: string;
  }[];
  grammarTipEn: string;
  grammarTipEs: string;
}

export interface Exercise1Item {
  id: string;
  wordEn: string;
  wordEs: string;
  correctType: 'C' | 'NC'; // C = Countable, NC = Non-count
  explanationEn: string;
  explanationEs: string;
  exampleSentenceEn: string;
  exampleSentenceEs: string;
}

export interface Exercise2Question {
  id: string;
  number: number;
  questionEn: string;
  questionEs: string;
  options: {
    key: 'a' | 'b' | 'c';
    text: string;
    isCorrect: boolean;
  }[];
  explanationEn: string;
  explanationEs: string;
}

export interface ShoppingItem {
  id: string;
  nounEn: string;
  nounEs: string;
  acceptableQuantifiers: string[];
  recommendedQuantifier: string;
  exampleEn: string;
  exampleEs: string;
  isCountable: boolean;
}

export interface BonusMistakeItem {
  id: string;
  number: number;
  originalSentence: string;
  hasMistake: boolean;
  errorWord?: string;
  correctedSentence: string;
  correctionEn: string;
  correctionEs: string;
  explanationEn: string;
  explanationEs: string;
}

// ---------------------------------------------------------------------------
// 10 THEORY TOPICS WITH COMPREHENSIVE BILINGUAL EXPLANATIONS
// ---------------------------------------------------------------------------
export const THEORY_TOPICS: TheoryCardItem[] = [
  {
    id: 'th-1',
    category: '1. Countable Nouns',
    categoryEs: '1. Sustantivos Contables',
    titleEn: 'Countable Nouns',
    titleEs: 'Sustantivos Contables',
    textEn:
      'Countable nouns are things we can count individually as separate units. We can use numbers directly before them (one apple, two apples, three apples). They have both a singular form and a plural form (usually ending in -s or -es). With a singular countable noun, we normally use "a / an" or "one".',
    textEs:
      'Los sustantivos contables son cosas que podemos contar individualmente como unidades separadas. Podemos usar números directamente delante de ellos (una manzana, dos manzanas, tres manzanas). Tienen forma singular y forma plural (usualmente agregando -s o -es). Con un sustantivo contable singular, normalmente usamos "a / an" o "one".',
    examples: [
      {
        en: 'one book / two books',
        es: 'un libro / dos libros',
        noteEn: 'Use "a" before consonant sounds: a book.',
        noteEs: 'Usa "a" delante de sonidos consonantes: un libro.',
      },
      {
        en: 'one chair / four chairs',
        es: 'una silla / cuatro sillas',
        noteEn: 'Clear physical objects counted one by one.',
        noteEs: 'Objetos físicos claros contados uno a uno.',
      },
      {
        en: 'one student / ten students',
        es: 'un estudiante / diez estudiantes',
        noteEn: 'People are individual countable units.',
        noteEs: 'Las personas son unidades contables individuales.',
      },
      {
        en: 'one car / three cars',
        es: 'un auto / tres autos',
        noteEn: 'Vehicles can easily be quantified by digits.',
        noteEs: 'Los vehículos se pueden cuantificar fácilmente por números.',
      },
      {
        en: 'one idea / many ideas',
        es: 'una idea / muchas ideas',
        noteEn: 'Abstract countable noun: an idea / three ideas.',
        noteEs: 'Sustantivo contable abstracto: una idea / tres ideas.',
      },
      {
        en: 'an apple / an egg',
        es: 'una manzana / un huevo',
        noteEn: 'Use "an" before vowel sounds (a, e, i, o, u).',
        noteEs: 'Usa "an" antes de sonidos vocálicos (a, e, i, o, u).',
      },
    ],
    grammarTipEn:
      'Rule: Never leave a singular countable noun alone without an article ("a / an", "the") or a determiner ("my", "this", "one"). You cannot say "I bought book", say "I bought a book".',
    grammarTipEs:
      'Regla: Nunca dejes un sustantivo contable singular solo sin artículo ("a / an", "the") o determinante ("my", "this", "one"). No puedes decir "I bought book", sino "I bought a book".',
  },
  {
    id: 'th-2',
    category: '2. Non-Count Nouns',
    categoryEs: '2. Sustantivos No Contables (Incontables)',
    titleEn: 'Non-Count Nouns',
    titleEs: 'Sustantivos No Contables',
    textEn:
      'Non-count nouns (uncountable nouns) are things that we do not normally count as individual units. They are liquids, materials, bulk substances, feelings, or abstract concepts. They usually do NOT have a plural form and cannot take "a" or "an" directly. Instead, we use quantities, units of measure, or containers.',
    textEs:
      'Los sustantivos no contables (incontables) son cosas que normalmente no contamos como unidades individuales. Son líquidos, materiales, sustancias en masa, sentimientos o conceptos abstractos. Por lo general NO tienen forma plural y no llevan "a" o "an" directamente. En su lugar, usamos cantidades, unidades de medida o recipientes.',
    examples: [
      {
        en: 'water / milk / coffee',
        es: 'agua / leche / café',
        noteEn: 'Liquids are continuous masses, not individual units.',
        noteEs: 'Los líquidos son masas continuas, no unidades individuales.',
      },
      {
        en: 'sugar / rice / bread',
        es: 'azúcar / arroz / pan',
        noteEn: 'Grains and mass foodstuffs are non-count.',
        noteEs: 'Granos y alimentos en masa son incontables.',
      },
      {
        en: 'money / information / advice',
        es: 'dinero / información / consejo',
        noteEn: 'Abstract concepts: never pluralized in English.',
        noteEs: 'Conceptos abstractos: nunca se pluralizan en inglés.',
      },
      {
        en: 'furniture / homework / traffic',
        es: 'muebles / tarea / tráfico',
        noteEn: 'Collective categories treated as singular mass.',
        noteEs: 'Categorías colectivas tratadas como masa singular.',
      },
    ],
    grammarTipEn:
      'Warning: Never say "two waters", "three informations", "many advices", or "furnitures". Instead say: "two bottles of water", "three pieces of information", "two pieces of advice", "three pieces of furniture".',
    grammarTipEs:
      'Advertencia: Nunca digas "two waters", "three informations", "many advices", o "furnitures". En su lugar di: "two bottles of water", "three pieces of information", "two pieces of advice", "three pieces of furniture".',
  },
  {
    id: 'th-3',
    category: '3. The Basic Difference',
    categoryEs: '3. La Diferencia Básica',
    titleEn: 'The Basic Difference',
    titleEs: 'La Diferencia Básica',
    textEn:
      'The core distinction lies in whether something exists as distinct, separate entities (countable) or as an indivisible continuous mass or concept (non-count). Compare: "I have three apples" vs "I have some water".',
    textEs:
      'La distinción principal radica en si algo existe como entidades separadas y distintas (contable) o como una masa o concepto continuo e indivisible (no contable). Compara: "I have three apples" frente a "I have some water".',
    examples: [
      {
        en: 'COUNTABLE: I have three apples. (1 apple, 2 apples, 3 apples)',
        es: 'CONTABLE: Tengo tres manzanas. (1 manzana, 2 manzanas, 3 manzanas)',
        noteEn: 'We can count each apple individually.',
        noteEs: 'Podemos contar cada manzana individualmente.',
      },
      {
        en: 'NON-COUNT: I have some water.',
        es: 'NO CONTABLE: Tengo un poco de agua.',
        noteEn: 'We do not count water as individual objects.',
        noteEs: 'No contamos el agua como objetos individuales.',
      },
      {
        en: 'CONTAINER: We can say: three bottles of water.',
        es: 'RECIPIENTE: Podemos decir: tres botellas de agua.',
        noteEn: 'The bottles are countable, while water remains non-count.',
        noteEs: 'Las botellas son contables, mientras que el agua sigue siendo no contable.',
      },
    ],
    grammarTipEn:
      'Quick test: Can you place a number directly in front of the noun? "Three apples" (YES = Countable). "Three waters" (NO = Non-count).',
    grammarTipEs:
      'Prueba rápida: ¿Puedes colocar un número directamente delante del sustantivo? "Three apples" (SÍ = Contable). "Three waters" (NO = No contable).',
  },
  {
    id: 'th-4',
    category: '4. Quantifiers',
    categoryEs: '4. Cuantificadores: Many, Much, A lot of',
    titleEn: 'Quantifiers: Many, Much, A lot of',
    titleEs: 'Cuantificadores: Many, Much, A lot of',
    textEn:
      'Quantifiers tell us "how much" or "how many". Use "many" with plural countable nouns. Use "much" with non-count nouns (mostly in questions and negative statements). Use "a lot of" with both countable and non-count nouns (very common in affirmative sentences).',
    textEs:
      'Los cuantificadores nos indican "cuánto" o "cuántos". Usa "many" con sustantivos contables en plural. Usa "much" con sustantivos no contables (principalmente en preguntas y oraciones negativas). Usa "a lot of" con ambos tipos de sustantivos (muy común en oraciones afirmativas).',
    examples: [
      {
        en: 'MANY: many books, many students, many cars, many people',
        es: 'MANY: muchos libros, muchos estudiantes, muchos autos, mucha gente',
        noteEn: 'Example: There are many students in the class.',
        noteEs: 'Ejemplo: Hay muchos estudiantes en la clase.',
      },
      {
        en: 'MUCH: much water, much money, much time, much information',
        es: 'MUCH: mucha agua, mucho dinero, mucho tiempo, mucha información',
        noteEn: 'Example: I don\'t have much time.',
        noteEs: 'Ejemplo: No tengo mucho tiempo.',
      },
      {
        en: 'A LOT OF (Countable): She has a lot of friends. / a lot of books',
        es: 'A LOT OF (Contable): Ella tiene muchos amigos. / muchos libros',
        noteEn: 'Followed by plural verb when noun is plural.',
        noteEs: 'Seguido de verbo plural cuando el sustantivo es plural.',
      },
      {
        en: 'A LOT OF (Non-count): She drinks a lot of coffee. / a lot of water',
        es: 'A LOT OF (No contable): Ella bebe mucho café. / mucha agua',
        noteEn: 'Followed by singular verb when noun is non-count.',
        noteEs: 'Seguido de verbo singular cuando el sustantivo es no contable.',
      },
    ],
    grammarTipEn:
      'Pro Tip: Native speakers rarely use "much" in positive affirmative statements ("I have much time" sounds unnatural); instead they say "I have a lot of time".',
    grammarTipEs:
      'Consejo profesional: Los hablantes nativos rara vez usan "much" en oraciones afirmativas ("I have much time" suena poco natural); en su lugar dicen "I have a lot of time".',
  },
  {
    id: 'th-5',
    category: '5. Some',
    categoryEs: '5. Some (Algunos / Algo de)',
    titleEn: 'Some',
    titleEs: 'Some',
    textEn:
      'We use "some" with both plural countable nouns and non-count nouns. It indicates an unspecified moderate quantity. It is typically used in positive affirmative sentences, as well as polite offers and requests.',
    textEs:
      'Usamos "some" tanto con sustantivos contables en plural como con sustantivos no contables. Indica una cantidad moderada sin especificar. Se utiliza habitualmente en oraciones afirmativas, así como en ofrecimientos y peticiones educadas.',
    examples: [
      {
        en: 'Countable plural: some apples, some books',
        es: 'Contable plural: algunas manzanas, algunos libros',
        noteEn: 'Example: I bought some apples at the market.',
        noteEs: 'Ejemplo: Compré algunas manzanas en el mercado.',
      },
      {
        en: 'Non-count: some water, some money, some milk',
        es: 'No contable: algo de agua, algo de dinero, algo de leche',
        noteEn: 'Example: I bought some milk.',
        noteEs: 'Ejemplo: Compré algo de leche.',
      },
      {
        en: 'Polite offer: Would you like some coffee?',
        es: 'Ofrecimiento cortés: ¿Te gustaría algo de café?',
        noteEn: 'We use "some" in questions when expecting a "yes" answer.',
        noteEs: 'Usamos "some" en preguntas cuando esperamos una respuesta afirmativa.',
      },
    ],
    grammarTipEn:
      'Remember: "Some" with countable nouns ALWAYS requires plural ("some apple" is incorrect, say "some apples" or "an apple").',
    grammarTipEs:
      'Recuerda: "Some" con sustantivos contables SIEMPRE requiere plural ("some apple" es incorrecto, di "some apples" o "an apple").',
  },
  {
    id: 'th-6',
    category: '6. Any',
    categoryEs: '6. Any (Algún / Ninguno / Nada de)',
    titleEn: 'Any',
    titleEs: 'Any',
    textEn:
      'We commonly use "any" in questions and negative sentences with both plural countable nouns and non-count nouns. In negatives, it means "none / not even one". In questions, it asks about existence without assuming a quantity.',
    textEs:
      'Comúnmente usamos "any" en preguntas y oraciones negativas tanto con sustantivos contables en plural como con sustantivos no contables. En oraciones negativas significa "nada de / ninguno". En preguntas averigua la existencia sin suponer una cantidad.',
    examples: [
      {
        en: 'Countable question: Are there any eggs?',
        es: 'Pregunta contable: ¿Hay huevos / algún huevo?',
        noteEn: 'Asks about the availability of eggs.',
        noteEs: 'Pregunta si hay disponibilidad de huevos.',
      },
      {
        en: 'Countable negative: There aren\'t any eggs.',
        es: 'Negativa contable: No hay ningún huevo / no hay huevos.',
        noteEn: 'Zero eggs exist.',
        noteEs: 'Existen cero huevos.',
      },
      {
        en: 'Non-count question: Is there any milk?',
        es: 'Pregunta no contable: ¿Hay leche / algo de leche?',
        noteEn: 'Uses singular verb "is" with non-count.',
        noteEs: 'Usa verbo singular "is" con sustantivo incontable.',
      },
      {
        en: 'Non-count negative: There isn\'t any milk.',
        es: 'Negativa no contable: No hay nada de leche / no hay leche.',
        noteEn: 'Uses singular contraction "isn\'t".',
        noteEs: 'Usa la contracción singular "isn\'t".',
      },
    ],
    grammarTipEn:
      'Subject-verb agreement: Countable uses "Are there any...?", while non-count uses "Is there any...?".',
    grammarTipEs:
      'Concordancia: Los contables usan "¿Are there any...?", mientras que los no contables usan "¿Is there any...?".',
  },
  {
    id: 'th-7',
    category: '7. A Few / A Little',
    categoryEs: '7. A Few / A Little (Unos pocos / Un poco de)',
    titleEn: 'A Few / A Little',
    titleEs: 'A Few / A Little',
    textEn:
      'These two quantifiers both mean a small amount, but they are NOT interchangeable. "A few" is used ONLY with plural countable nouns (a small number). "A little" is used ONLY with non-count nouns (a small volume or amount).',
    textEs:
      'Estos dos cuantificadores significan una pequeña cantidad, pero NO son intercambiables. "A few" se usa ÚNICAMENTE con sustantivos contables en plural (un número reducido). "A little" se usa ÚNICAMENTE con sustantivos no contables (un volumen o cantidad pequeña).',
    examples: [
      {
        en: 'A FEW + COUNTABLE: a few friends, a few books, a few questions',
        es: 'A FEW + CONTABLE: unos pocos amigos, unos pocos libros, unas pocas preguntas',
        noteEn: 'Meaning: a small number (3 or 4 items).',
        noteEs: 'Significado: un número pequeño (3 o 4 elementos).',
      },
      {
        en: 'Example: I have a few questions for the teacher.',
        es: 'Ejemplo: Tengo unas pocas preguntas para el profesor.',
        noteEn: 'Questions can be counted: question 1, question 2.',
        noteEs: 'Las preguntas se pueden contar: pregunta 1, pregunta 2.',
      },
      {
        en: 'A LITTLE + NON-COUNT: a little water, a little money, a little time',
        es: 'A LITTLE + NO CONTABLE: un poco de agua, un poco de dinero, un poco de tiempo',
        noteEn: 'Meaning: a small quantity or amount.',
        noteEs: 'Significado: una pequeña cantidad o porción.',
      },
      {
        en: 'Example: I have a little time before my next meeting.',
        es: 'Ejemplo: Tengo un poco de tiempo antes de mi próxima reunión.',
        noteEn: 'Time is non-count here.',
        noteEs: 'Time (tiempo) es no contable en este contexto.',
      },
    ],
    grammarTipEn:
      'Crucial distinction: Saying "a few money" or "a little books" is a serious grammar error! Always pair "a few" with plural nouns and "a little" with singular non-count nouns.',
    grammarTipEs:
      'Distinción fundamental: ¡Decir "a few money" o "a little books" es un grave error gramatical! Siempre empareja "a few" con sustantivos plurales y "a little" con sustantivos incontables en singular.',
  },
  {
    id: 'th-8',
    category: '8. How Many / How Much?',
    categoryEs: '8. How Many / How Much? (¿Cuántos? / ¿Cuánto?)',
    titleEn: 'How Many / How Much?',
    titleEs: 'How Many / How Much?',
    textEn:
      'To ask about quantities, choose the question phrase based on noun type: Use "How many" with plural countable nouns. Use "How much" with non-count nouns (and also when asking about the price of items).',
    textEs:
      'Para preguntar sobre cantidades, elige la frase interrogativa según el tipo de sustantivo: Usa "How many" con sustantivos contables en plural. Usa "How much" con sustantivos no contables (y también al preguntar por el precio de las cosas).',
    examples: [
      {
        en: 'How many books do you have?',
        es: '¿Cuántos libros tienes?',
        noteEn: 'Books = countable plural.',
        noteEs: 'Books = contable plural.',
      },
      {
        en: 'How many students are there in the class?',
        es: '¿Cuántos estudiantes hay en la clase?',
        noteEn: 'Students = countable plural.',
        noteEs: 'Students = contable plural.',
      },
      {
        en: 'How many eggs do we need for the cake?',
        es: '¿Cuántos huevos necesitamos para el pastel?',
        noteEn: 'Eggs = countable plural.',
        noteEs: 'Eggs = contable plural.',
      },
      {
        en: 'How much water do you drink every day?',
        es: '¿Cuánta agua bebes todos los días?',
        noteEn: 'Water = non-count singular.',
        noteEs: 'Water = no contable singular.',
      },
      {
        en: 'How much money do you need?',
        es: '¿Cuánto dinero necesitas?',
        noteEn: 'Money = non-count singular.',
        noteEs: 'Money = no contable singular.',
      },
      {
        en: 'How much time do we have left?',
        es: '¿Cuánto tiempo nos queda?',
        noteEn: 'Time = non-count singular.',
        noteEs: 'Time = no contable singular.',
      },
    ],
    grammarTipEn:
      'Money tip: We say "How much money...?", but we say "How many dollars / euros...?" because specific currency units are countable!',
    grammarTipEs:
      'Consejo sobre el dinero: Decimos "¿How much money...?", pero decimos "¿How many dollars / euros...?" porque las unidades de moneda específicas son contables.',
  },
  {
    id: 'th-9',
    category: '9. Quick Guide Table',
    categoryEs: '9. Tabla Guía Rápida',
    titleEn: 'Quick Guide Table',
    titleEs: 'Tabla Guía Rápida',
    textEn:
      'Master this definitive reference table comparing all major quantifiers across Countable and Non-Count nouns.',
    textEs:
      'Domina esta tabla de referencia definitiva que compara todos los cuantificadores principales con sustantivos contables e incontables.',
    examples: [
      {
        en: 'many: Countable YES | Non-count NO',
        es: 'many: Contable SÍ | No contable NO',
      },
      {
        en: 'much: Countable NO | Non-count YES',
        es: 'much: Contable NO | No contable SÍ',
      },
      {
        en: 'a lot of: Countable YES | Non-count YES',
        es: 'a lot of: Contable SÍ | No contable SÍ',
      },
      {
        en: 'some: Countable YES | Non-count YES',
        es: 'some: Contable SÍ | No contable SÍ',
      },
      {
        en: 'any: Countable YES | Non-count YES',
        es: 'any: Contable SÍ | No contable SÍ',
      },
      {
        en: 'a few: Countable YES | Non-count NO',
        es: 'a few: Contable SÍ | No contable NO',
      },
      {
        en: 'a little: Countable NO | Non-count YES',
        es: 'a little: Contable NO | No contable SÍ',
      },
      {
        en: 'how many: Countable YES | Non-count NO',
        es: 'how many: Contable SÍ | No contable NO',
      },
      {
        en: 'how much: Countable NO | Non-count YES',
        es: 'how much: Contable NO | No contable SÍ',
      },
    ],
    grammarTipEn:
      'Summary rule: "A lot of", "some", and "any" are versatile champions: they work with BOTH countable plural and non-count nouns!',
    grammarTipEs:
      'Regla de resumen: "A lot of", "some" y "any" son los campeones versátiles: ¡funcionan con AMBOS tipos de sustantivos!',
  },
  {
    id: 'th-10',
    category: '10. Special Words to Remember',
    categoryEs: '10. Palabras Especiales para Recordar',
    titleEn: 'Special Words to Remember',
    titleEs: 'Palabras Especiales para Recordar',
    textEn:
      'Some nouns are non-count in English, even though they may be countable in Spanish or other languages. Never add "-s" to these words, and never use "a / an" directly before them.',
    textEs:
      'Algunos sustantivos son no contables en inglés, a pesar de que pueden ser contables en español u otros idiomas. Nunca agregues "-s" a estas palabras y nunca uses "a / an" directamente delante de ellas.',
    examples: [
      {
        en: 'INFORMATION: Not "an information" or "informations". Correct: some information / a piece of information.',
        es: 'INFORMATION: No "an information" ni "informations". Correcto: some information / a piece of information (un dato / información).',
      },
      {
        en: 'ADVICE: Not "an advice" or "advices". Correct: some advice / a piece of advice.',
        es: 'ADVICE: No "an advice" ni "advices". Correcto: some advice / a piece of advice (un consejo).',
      },
      {
        en: 'MONEY: Not "moneys". Correct: some money / a lot of money.',
        es: 'MONEY: No "moneys". Correcto: some money / a lot of money (dinero / mucho dinero).',
      },
      {
        en: 'HOMEWORK: Not "homeworks". Correct: some homework / a lot of homework.',
        es: 'HOMEWORK: No "homeworks". Correcto: some homework / a lot of homework (deberes / mucha tarea).',
      },
      {
        en: 'FURNITURE: Not "furnitures". Correct: some furniture / three pieces of furniture.',
        es: 'FURNITURE: No "furnitures". Correcto: some furniture / three pieces of furniture (tres muebles).',
      },
    ],
    grammarTipEn:
      'Spanish speakers alert: In Spanish we say "Dame un consejo" or "Tengo muchas tareas", but in English you MUST say "Give me a piece of advice" and "I have a lot of homework".',
    grammarTipEs:
      'Alerta para hispanohablantes: En español decimos "Dame un consejo" o "Tengo muchas tareas", pero en inglés DEBES decir "Give me a piece of advice" y "I have a lot of homework".',
  },
];

// ---------------------------------------------------------------------------
// EXERCISE 1 – COUNTABLE OR NON-COUNT? (12 items)
// ---------------------------------------------------------------------------
export const EXERCISE_1_ITEMS: Exercise1Item[] = [
  {
    id: 'ex1-1',
    wordEn: 'apple',
    wordEs: 'manzana',
    correctType: 'C',
    explanationEn: 'Countable: You can count individual apples (one apple, two apples).',
    explanationEs: 'Contable: Puedes contar manzanas individuales (una manzana, dos manzanas).',
    exampleSentenceEn: 'I eat an apple every morning.',
    exampleSentenceEs: 'Como una manzana cada mañana.',
  },
  {
    id: 'ex1-2',
    wordEn: 'water',
    wordEs: 'agua',
    correctType: 'NC',
    explanationEn: 'Non-count: Water is a liquid and cannot be counted individually without a container.',
    explanationEs: 'No contable: El agua es un líquido y no se cuenta individualmente sin un recipiente.',
    exampleSentenceEn: 'Please drink some water.',
    exampleSentenceEs: 'Por favor bebe algo de agua.',
  },
  {
    id: 'ex1-3',
    wordEn: 'chair',
    wordEs: 'silla',
    correctType: 'C',
    explanationEn: 'Countable: A chair is a separate physical object (one chair, four chairs).',
    explanationEs: 'Contable: Una silla es un objeto físico individual (una silla, cuatro sillas).',
    exampleSentenceEn: 'There are four chairs around the dining table.',
    exampleSentenceEs: 'Hay cuatro sillas alrededor de la mesa del comedor.',
  },
  {
    id: 'ex1-4',
    wordEn: 'money',
    wordEs: 'dinero',
    correctType: 'NC',
    explanationEn: 'Non-count: Money is an abstract general category. Specific currencies (dollars, coins) are countable, but "money" itself is non-count.',
    explanationEs: 'No contable: El dinero es una categoría abstracta general. Las monedas específicas (dólares, euros) son contables, pero la palabra "money" es no contable.',
    exampleSentenceEn: 'He needs some money to buy groceries.',
    exampleSentenceEs: 'Él necesita algo de dinero para comprar víveres.',
  },
  {
    id: 'ex1-5',
    wordEn: 'information',
    wordEs: 'información',
    correctType: 'NC',
    explanationEn: 'Non-count: Information is always non-count in English. Say "a piece of information".',
    explanationEs: 'No contable: Information es siempre no contable en inglés. Se dice "a piece of information".',
    exampleSentenceEn: 'Can you give me some information about the course?',
    exampleSentenceEs: '¿Puedes darme algo de información sobre el curso?',
  },
  {
    id: 'ex1-6',
    wordEn: 'book',
    wordEs: 'libro',
    correctType: 'C',
    explanationEn: 'Countable: You can count books individually (one book, two books, many books).',
    explanationEs: 'Contable: Puedes contar libros individualmente (un libro, dos libros, muchos libros).',
    exampleSentenceEn: 'She is reading an interesting book.',
    exampleSentenceEs: 'Ella está leyendo un libro interesante.',
  },
  {
    id: 'ex1-7',
    wordEn: 'rice',
    wordEs: 'arroz',
    correctType: 'NC',
    explanationEn: 'Non-count: Grains are too small and numerous to count individually. Say "a bowl of rice".',
    explanationEs: 'No contable: Los granos son demasiado pequeños y numerosos para contarse uno a uno. Se dice "un tazón de arroz".',
    exampleSentenceEn: 'We ate rice with chicken for dinner.',
    exampleSentenceEs: 'Cenamos arroz con pollo.',
  },
  {
    id: 'ex1-8',
    wordEn: 'student',
    wordEs: 'estudiante / alumno',
    correctType: 'C',
    explanationEn: 'Countable: People are counted as individuals (one student, ten students).',
    explanationEs: 'Contable: Las personas se cuentan como individuos (un estudiante, diez estudiantes).',
    exampleSentenceEn: 'There are twenty students in my English class.',
    exampleSentenceEs: 'Hay veinte estudiantes en mi clase de inglés.',
  },
  {
    id: 'ex1-9',
    wordEn: 'advice',
    wordEs: 'consejo',
    correctType: 'NC',
    explanationEn: 'Non-count: Advice is always non-count in English. Never say "an advice"; say "some advice" or "a piece of advice".',
    explanationEs: 'No contable: Advice es siempre incontable en inglés. Nunca digas "an advice"; di "some advice" o "a piece of advice".',
    exampleSentenceEn: 'My grandmother gave me some good advice.',
    exampleSentenceEs: 'Mi abuela me dio un buen consejo.',
  },
  {
    id: 'ex1-10',
    wordEn: 'coffee',
    wordEs: 'café',
    correctType: 'NC',
    explanationEn: 'Non-count: Coffee is a beverage/liquid substance. To count it, say "a cup of coffee".',
    explanationEs: 'No contable: El café es una sustancia líquida/bebida. Para contarlo, di "a cup of coffee".',
    exampleSentenceEn: 'She drinks black coffee without sugar.',
    exampleSentenceEs: 'Ella bebe café negro sin azúcar.',
  },
  {
    id: 'ex1-11',
    wordEn: 'car',
    wordEs: 'auto / coche',
    correctType: 'C',
    explanationEn: 'Countable: Cars are distinct countable items (one car, three cars).',
    explanationEs: 'Contable: Los autos son elementos contables individuales (un auto, tres autos).',
    exampleSentenceEn: 'My brother owns two cars.',
    exampleSentenceEs: 'Mi hermano es dueño de dos autos.',
  },
  {
    id: 'ex1-12',
    wordEn: 'furniture',
    wordEs: 'muebles / mobiliario',
    correctType: 'NC',
    explanationEn: 'Non-count: Furniture is a collective mass noun in English. Say "three pieces of furniture", never "furnitures".',
    explanationEs: 'No contable: Furniture es un sustantivo colectivo incontable en inglés. Se dice "three pieces of furniture", nunca "furnitures".',
    exampleSentenceEn: 'They bought some modern furniture for the living room.',
    exampleSentenceEs: 'Compraron unos muebles modernos para la sala de estar.',
  },
];

// ---------------------------------------------------------------------------
// EXERCISE 2 – CHOOSE THE CORRECT QUANTIFIER (10 questions)
// ---------------------------------------------------------------------------
export const EXERCISE_2_QUESTIONS: Exercise2Question[] = [
  {
    id: 'ex2-1',
    number: 1,
    questionEn: 'There are ______ students in my class.',
    questionEs: 'Hay ______ estudiantes en mi clase.',
    options: [
      { key: 'a', text: 'much', isCorrect: false },
      { key: 'b', text: 'many', isCorrect: true },
      { key: 'c', text: 'a little', isCorrect: false },
    ],
    explanationEn: 'Correct: "students" is a plural countable noun, so we use "many". ("much" and "a little" are only for non-count nouns).',
    explanationEs: 'Correcto: "students" es un sustantivo contable plural, por lo que usamos "many". ("much" y "a little" son solo para no contables).',
  },
  {
    id: 'ex2-2',
    number: 2,
    questionEn: "I don't have ______ money.",
    questionEs: 'No tengo ______ dinero.',
    options: [
      { key: 'a', text: 'many', isCorrect: false },
      { key: 'b', text: 'a few', isCorrect: false },
      { key: 'c', text: 'much', isCorrect: true },
    ],
    explanationEn: 'Correct: "money" is non-count and the sentence is negative, so we use "much". ("many" and "a few" are for countable nouns).',
    explanationEs: 'Correcto: "money" es incontable y la oración es negativa, así que usamos "much". ("many" y "a few" son para contables).',
  },
  {
    id: 'ex2-3',
    number: 3,
    questionEn: 'We need ______ water.',
    questionEs: 'Necesitamos ______ agua.',
    options: [
      { key: 'a', text: 'some', isCorrect: true },
      { key: 'b', text: 'many', isCorrect: false },
      { key: 'c', text: 'a few', isCorrect: false },
    ],
    explanationEn: 'Correct: "water" is a non-count noun. We use "some" in affirmative statements. ("many" and "a few" require plural countable nouns).',
    explanationEs: 'Correcto: "water" es no contable. Usamos "some" en oraciones afirmativas. ("many" y "a few" requieren contables plurales).',
  },
  {
    id: 'ex2-4',
    number: 4,
    questionEn: 'She has ______ friends.',
    questionEs: 'Ella tiene ______ amigos.',
    options: [
      { key: 'a', text: 'much', isCorrect: false },
      { key: 'b', text: 'a lot of', isCorrect: true },
      { key: 'c', text: 'a little', isCorrect: false },
    ],
    explanationEn: 'Correct: "friends" is plural countable. "A lot of" fits perfectly in affirmative statements. ("much" and "a little" are for non-count).',
    explanationEs: 'Correcto: "friends" es contable plural. "A lot of" encaja perfectamente en afirmativo. ("much" y "a little" son para incontables).',
  },
  {
    id: 'ex2-5',
    number: 5,
    questionEn: 'I have ______ time before work.',
    questionEs: 'Tengo ______ tiempo antes del trabajo.',
    options: [
      { key: 'a', text: 'a little', isCorrect: true },
      { key: 'b', text: 'a few', isCorrect: false },
      { key: 'c', text: 'many', isCorrect: false },
    ],
    explanationEn: 'Correct: "time" is non-count here, so "a little" is the correct quantifier for a small amount. ("a few" and "many" are for countables).',
    explanationEs: 'Correcto: "time" es incontable aquí, por lo que "a little" es el cuantificador correcto para una pequeña cantidad.',
  },
  {
    id: 'ex2-6',
    number: 6,
    questionEn: 'There are ______ apples in the kitchen.',
    questionEs: 'Hay ______ manzanas en la cocina.',
    options: [
      { key: 'a', text: 'a little', isCorrect: false },
      { key: 'b', text: 'much', isCorrect: false },
      { key: 'c', text: 'a few', isCorrect: true },
    ],
    explanationEn: 'Correct: "apples" is plural countable, so we use "a few" to mean a small number.',
    explanationEs: 'Correcto: "apples" es contable plural, por lo que usamos "a few" para indicar un número pequeño.',
  },
  {
    id: 'ex2-7',
    number: 7,
    questionEn: 'Is there ______ milk in the fridge?',
    questionEs: '¿Hay ______ leche en el refrigerador?',
    options: [
      { key: 'a', text: 'any', isCorrect: true },
      { key: 'b', text: 'many', isCorrect: false },
      { key: 'c', text: 'a few', isCorrect: false },
    ],
    explanationEn: 'Correct: In questions with non-count nouns, we use "any".',
    explanationEs: 'Correcto: En preguntas con sustantivos no contables, usamos "any".',
  },
  {
    id: 'ex2-8',
    number: 8,
    questionEn: 'How ______ books do you have?',
    questionEs: '¿Cuántos libros tienes?',
    options: [
      { key: 'a', text: 'much', isCorrect: false },
      { key: 'b', text: 'many', isCorrect: true },
      { key: 'c', text: 'a little', isCorrect: false },
    ],
    explanationEn: 'Correct: "books" is plural countable, so the question phrase is "How many".',
    explanationEs: 'Correcto: "books" es contable plural, por lo que la pregunta se formula con "How many".',
  },
  {
    id: 'ex2-9',
    number: 9,
    questionEn: 'How ______ coffee do you drink?',
    questionEs: '¿Cuánto café bebes?',
    options: [
      { key: 'a', text: 'many', isCorrect: false },
      { key: 'b', text: 'much', isCorrect: true },
      { key: 'c', text: 'a few', isCorrect: false },
    ],
    explanationEn: 'Correct: "coffee" is a non-count noun, so we ask "How much".',
    explanationEs: 'Correcto: "coffee" es no contable, por lo que preguntamos con "How much".',
  },
  {
    id: 'ex2-10',
    number: 10,
    questionEn: "There isn't ______ information on the website.",
    questionEs: 'No hay ______ información en el sitio web.',
    options: [
      { key: 'a', text: 'many', isCorrect: false },
      { key: 'b', text: 'much', isCorrect: true },
      { key: 'c', text: 'a few', isCorrect: false },
    ],
    explanationEn: 'Correct: "information" is non-count and the sentence is negative ("isn\'t"), so we use "much".',
    explanationEs: 'Correcto: "information" es incontable y la oración es negativa ("isn\'t"), por lo que usamos "much".',
  },
];

// ---------------------------------------------------------------------------
// EXERCISE 3 – THE SHOPPING CHALLENGE
// ---------------------------------------------------------------------------
export const SHOPPING_LIST_ITEMS: ShoppingItem[] = [
  {
    id: 'shop-1',
    nounEn: 'bottles of water',
    nounEs: 'botellas de agua',
    acceptableQuantifiers: ['a few', 'some', 'many', 'a lot of'],
    recommendedQuantifier: 'a lot of',
    exampleEn: 'We need a lot of bottles of water for the party.',
    exampleEs: 'Necesitamos muchas botellas de agua para la fiesta.',
    isCountable: true,
  },
  {
    id: 'shop-2',
    nounEn: 'bread',
    nounEs: 'pan',
    acceptableQuantifiers: ['some', 'a little', 'a lot of', 'much'],
    recommendedQuantifier: 'some',
    exampleEn: 'We need some bread for sandwiches.',
    exampleEs: 'Necesitamos algo de pan para los sándwiches.',
    isCountable: false,
  },
  {
    id: 'shop-3',
    nounEn: 'apples',
    nounEs: 'manzanas',
    acceptableQuantifiers: ['a few', 'some', 'many', 'a lot of'],
    recommendedQuantifier: 'many',
    exampleEn: 'We need many apples for the fruit salad.',
    exampleEs: 'Necesitamos muchas manzanas para la ensalada de frutas.',
    isCountable: true,
  },
  {
    id: 'shop-4',
    nounEn: 'cheese',
    nounEs: 'queso',
    acceptableQuantifiers: ['some', 'a little', 'a lot of', 'much'],
    recommendedQuantifier: 'a lot of',
    exampleEn: 'We need a lot of cheese for the snacks.',
    exampleEs: 'Necesitamos mucho queso para los aperitivos.',
    isCountable: false,
  },
  {
    id: 'shop-5',
    nounEn: 'eggs',
    nounEs: 'huevos',
    acceptableQuantifiers: ['a few', 'some', 'many', 'a lot of'],
    recommendedQuantifier: 'a few',
    exampleEn: 'We only need a few eggs for the cake.',
    exampleEs: 'Solo necesitamos unos pocos huevos para el pastel.',
    isCountable: true,
  },
  {
    id: 'shop-6',
    nounEn: 'money',
    nounEs: 'dinero',
    acceptableQuantifiers: ['some', 'a little', 'a lot of', 'much'],
    recommendedQuantifier: 'some',
    exampleEn: 'We need some money to buy decorations.',
    exampleEs: 'Necesitamos algo de dinero para comprar decoraciones.',
    isCountable: false,
  },
  {
    id: 'shop-7',
    nounEn: 'bottles of juice',
    nounEs: 'botellas de jugo',
    acceptableQuantifiers: ['a few', 'some', 'many', 'a lot of'],
    recommendedQuantifier: 'many',
    exampleEn: 'We should buy many bottles of juice.',
    exampleEs: 'Deberíamos comprar muchas botellas de jugo.',
    isCountable: true,
  },
  {
    id: 'shop-8',
    nounEn: 'rice',
    nounEs: 'arroz',
    acceptableQuantifiers: ['some', 'a little', 'a lot of', 'much'],
    recommendedQuantifier: 'a little',
    exampleEn: 'We only need a little rice for the side dish.',
    exampleEs: 'Solo necesitamos un poco de arroz para la guarnición.',
    isCountable: false,
  },
];

// ---------------------------------------------------------------------------
// BONUS – FIND THE MISTAKE (8 items)
// ---------------------------------------------------------------------------
export const BONUS_MISTAKE_ITEMS: BonusMistakeItem[] = [
  {
    id: 'bm-1',
    number: 1,
    originalSentence: 'I need many water.',
    hasMistake: true,
    errorWord: 'many',
    correctedSentence: 'I need a lot of water. (or: I need some water.)',
    correctionEn: 'Replace "many" with "a lot of" or "some".',
    correctionEs: 'Reemplaza "many" por "a lot of" o "some".',
    explanationEn: '"Water" is a non-count noun. "Many" can only be used with plural countable nouns.',
    explanationEs: '"Water" es un sustantivo no contable. "Many" solo se usa con sustantivos contables en plural.',
  },
  {
    id: 'bm-2',
    number: 2,
    originalSentence: 'She gave me an advice.',
    hasMistake: true,
    errorWord: 'an advice',
    correctedSentence: 'She gave me some advice. (or: a piece of advice.)',
    correctionEn: 'Replace "an advice" with "some advice" or "a piece of advice".',
    correctionEs: 'Reemplaza "an advice" por "some advice" o "a piece of advice".',
    explanationEn: '"Advice" is non-count in English and can never take the indefinite article "an" directly.',
    explanationEs: '"Advice" es no contable en inglés y nunca lleva el artículo indefinido "an" directamente.',
  },
  {
    id: 'bm-3',
    number: 3,
    originalSentence: 'There are much people here.',
    hasMistake: true,
    errorWord: 'much',
    correctedSentence: 'There are many people here. (or: a lot of people.)',
    correctionEn: 'Replace "much" with "many" or "a lot of".',
    correctionEs: 'Reemplaza "much" por "many" o "a lot of".',
    explanationEn: '"People" is an irregular plural countable noun (person -> people), so we must use "many", not "much".',
    explanationEs: '"People" es un sustantivo contable plural irregular (person -> people), por lo que debemos usar "many", no "much".',
  },
  {
    id: 'bm-4',
    number: 4,
    originalSentence: 'I have a few money.',
    hasMistake: true,
    errorWord: 'a few',
    correctedSentence: 'I have a little money. (or: some money.)',
    correctionEn: 'Replace "a few" with "a little" or "some".',
    correctionEs: 'Reemplaza "a few" por "a little" o "some".',
    explanationEn: '"Money" is non-count. "A few" is reserved strictly for countable nouns. For non-count nouns, use "a little".',
    explanationEs: '"Money" es no contable. "A few" está reservado para contables. Para sustantivos no contables se usa "a little".',
  },
  {
    id: 'bm-5',
    number: 5,
    originalSentence: 'We need some informations.',
    hasMistake: true,
    errorWord: 'informations',
    correctedSentence: 'We need some information.',
    correctionEn: 'Remove the "-s" from "informations" -> "information".',
    correctionEs: 'Quita la "-s" de "informations" -> "information".',
    explanationEn: '"Information" is non-count and has no plural form in English.',
    explanationEs: '"Information" es no contable y no tiene forma plural en inglés.',
  },
  {
    id: 'bm-6',
    number: 6,
    originalSentence: 'How many coffee do you drink?',
    hasMistake: true,
    errorWord: 'How many',
    correctedSentence: 'How much coffee do you drink?',
    correctionEn: 'Replace "How many" with "How much".',
    correctionEs: 'Reemplaza "How many" por "How much".',
    explanationEn: '"Coffee" is a liquid non-count noun. We ask "How much" for non-count nouns.',
    explanationEs: '"Coffee" es un sustantivo líquido no contable. Preguntamos "How much" para sustantivos no contables.',
  },
  {
    id: 'bm-7',
    number: 7,
    originalSentence: 'I bought a lot of apples.',
    hasMistake: false,
    correctedSentence: 'I bought a lot of apples. (This sentence is already correct!)',
    correctionEn: 'Correct! No error.',
    correctionEs: '¡Correcto! No contiene ningún error.',
    explanationEn: '"A lot of" works perfectly with plural countable nouns ("apples").',
    explanationEs: '"A lot of" funciona perfectamente con sustantivos contables en plural ("apples").',
  },
  {
    id: 'bm-8',
    number: 8,
    originalSentence: "We don't have much time.",
    hasMistake: false,
    correctedSentence: "We don't have much time. (This sentence is already correct!)",
    correctionEn: 'Correct! No error.',
    correctionEs: '¡Correcto! No contiene ningún error.',
    explanationEn: '"Time" is non-count and "much" is standard in negative sentences ("don\'t have much time").',
    explanationEs: '"Time" es no contable y "much" es el estándar en oraciones negativas ("don\'t have much time").',
  },
];

// ---------------------------------------------------------------------------
// SECTION 1 EXERCISE WRAPPER
// ---------------------------------------------------------------------------
export const COUNTABLE_QUANTIFIERS_EXERCISES: Exercise[] = [
  {
    id: 'cq-act-1-overview',
    type: 'countable-quantifiers',
    title: 'Countable & Non-Count Nouns – Quantifiers',
    titleEs: 'Sustantivos Contables e Incontables – Cuantificadores',
    instructions:
      'Explore the 10 grammar topics and complete the interactive practice exercises with audio and reversible cards.',
    instructionsEs:
      'Explora los 10 temas de gramática y completa los ejercicios interactivos con audio y tarjetas reversibles.',
  },
];
