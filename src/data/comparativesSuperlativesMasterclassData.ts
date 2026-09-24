import { Exercise } from '../types';

export interface ComparativesSuperlativesTheoryTopic {
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

export interface ComparativesSuperlativesEx1Item {
  id: string;
  number: number;
  questionEn: string;
  questionEs: string;
  options: {
    key: 'a' | 'b' | 'c';
    text: string;
    isCorrect: boolean;
  }[];
  correctAnswer: string;
  explanationEn: string;
  explanationEs: string;
}

export interface ComparativesSuperlativesEx2Item {
  id: string;
  number: number;
  incorrectSentenceEn: string;
  incorrectSentenceEs: string;
  mistakeEn: string;
  mistakeEs: string;
  correctSentenceEn: string;
  correctSentenceEs: string;
  explanationEn: string;
  explanationEs: string;
}

export interface ComparativesSuperlativesBattleItem {
  id: string;
  letter: string;
  pairEn: string;
  pairEs: string;
  promptEn: string;
  promptEs: string;
  modelSentences: {
    en: string;
    es: string;
    focusEn: string;
    focusEs: string;
  }[];
}

export interface ComparativesSuperlativesEx4Item {
  id: string;
  number: number;
  sentenceBefore: string;
  sentenceAfter: string;
  baseAdjective: string;
  fullSentenceEn: string;
  fullSentenceEs: string;
  correctAnswer: string;
  acceptableAnswers?: string[];
  explanationEn: string;
  explanationEs: string;
}

export interface SportsBattleItem {
  id: string;
  titleEn: string;
  titleEs: string;
  promptEn: string;
  promptEs: string;
  instructionsEn: string;
  instructionsEs: string;
  examples: {
    type: 'comparative' | 'equality' | 'negative-equality';
    en: string;
    es: string;
    explanationEn: string;
    explanationEs: string;
  }[];
}

// ---------------------------------------------------------------------------
// 8 THEORY TOPICS FOR "COMPARATIVES AND SUPERLATIVES"
// ---------------------------------------------------------------------------
export const COMPARATIVES_SUPERLATIVES_THEORY_TOPICS: ComparativesSuperlativesTheoryTopic[] = [
  {
    id: 'cs-theory-1',
    category: '1. Comparatives · Short Adjectives',
    categoryEs: '1. Comparativos · Adjetivos Cortos',
    titleEn: 'Short Adjectives: adjective + -ER + THAN',
    titleEs: 'Adjetivos Cortos: adjetivo + -ER + THAN',
    textEn:
      'We use comparatives to compare two people, things or places. For short adjectives (one syllable), we add "-er" to the adjective and follow it with "than". When comparing, remember that "than" introduces the second element.',
    textEs:
      'Usamos los comparativos para comparar dos personas, cosas o lugares. Para adjetivos cortos (de una sola sílaba), agregamos "-er" al adjetivo y colocamos "than" (que) a continuación. Al comparar, recuerda que "than" introduce el segundo elemento.',
    formulaEn: 'Adjective + -ER + THAN',
    formulaEs: 'Adjetivo + -ER + THAN',
    examples: [
      {
        en: 'tall → taller than (John is taller than Peter.)',
        es: 'alto → más alto que (John es más alto que Peter.)',
        noteEn: 'Short 1-syllable adjective: add -er + than.',
        noteEs: 'Adjetivo corto de 1 sílaba: se agrega -er + than.',
      },
      {
        en: 'small → smaller than (A cat is smaller than a lion.)',
        es: 'pequeño → más pequeño que (Un gato es más pequeño que un león.)',
        noteEn: 'Directly add -er to small.',
        noteEs: 'Se agrega directamente -er a small.',
      },
      {
        en: 'fast → faster than (A car is faster than a bicycle.)',
        es: 'rápido → más rápido que (Un auto es más rápido que una bicicleta.)',
        noteEn: 'Fast becomes faster than.',
        noteEs: 'Fast se transforma en faster than.',
      },
      {
        en: 'cheap → cheaper than (This phone is cheaper than that one.)',
        es: 'barato → más barato que (Este teléfono es más barato que aquel.)',
        noteEn: 'Cheap becomes cheaper than.',
        noteEs: 'Cheap se transforma en cheaper than.',
      },
    ],
    grammarTipEn:
      'Rule: Always place "than" after the comparative adjective when the object of comparison is mentioned.',
    grammarTipEs:
      'Regla: Coloca siempre "than" después del adjetivo comparativo cuando se mencione el segundo elemento.',
  },
  {
    id: 'cs-theory-2',
    category: '1. Comparatives · Ending in -Y',
    categoryEs: '1. Comparativos · Terminados en -Y',
    titleEn: 'Adjectives Ending in -Y: Change y → i + er',
    titleEs: 'Adjetivos Terminados en -Y: Cambia y → i + er',
    textEn:
      'When an adjective of one or two syllables ends in a consonant plus "-y", change the "-y" to "-i" and add "-er", then follow with "than". Be careful with the spelling: never write "easyer" or "happyer".',
    textEs:
      'Cuando un adjetivo de una o dos sílabas termina en consonante más "-y", cambiamos la "-y" por "-i" y añadimos "-er", seguido de "than". Mucho cuidado con la ortografía: nunca escribas "easyer" o "happyer".',
    formulaEn: 'Adjective ending in -y → -ier + than',
    formulaEs: 'Adjetivo terminado en -y → -ier + than',
    examples: [
      {
        en: 'happy → happier than (She is happier today than yesterday.)',
        es: 'feliz → más feliz que (Ella está más feliz hoy que ayer.)',
        noteEn: 'y changes to i + er.',
        noteEs: 'La y cambia por i + er.',
      },
      {
        en: 'easy → easier than (English is easier than Chinese.)',
        es: 'fácil → más fácil que (El inglés es más fácil que el chino.)',
        noteEn: 'Easy becomes easier than.',
        noteEs: 'Easy se transforma en easier than.',
      },
      {
        en: 'busy → busier than (The gym is busier in the evening.)',
        es: 'ocupado/concurrido → más ocupado que (El gimnasio está más concurrido por la tarde.)',
        noteEn: 'Busy becomes busier than.',
        noteEs: 'Busy se transforma en busier than.',
      },
      {
        en: 'heavy → heavier than (Iron is heavier than wood.)',
        es: 'pesado → más pesado que (El hierro es más pesado que la madera.)',
        noteEn: 'Heavy becomes heavier than.',
        noteEs: 'Heavy se transforma en heavier than.',
      },
    ],
    grammarTipEn:
      'Spelling Tip: consonant + y changes to -ier (healthy → healthier, funny → funnier).',
    grammarTipEs:
      'Consejo ortográfico: consonante + y cambia a -ier (healthy → healthier, funny → funnier).',
  },
  {
    id: 'cs-theory-3',
    category: '1. Comparatives · Long Adjectives',
    categoryEs: '1. Comparativos · Adjetivos Largos',
    titleEn: 'Long Adjectives: MORE + adjective + THAN',
    titleEs: 'Adjetivos Largos: MORE + adjetivo + THAN',
    textEn:
      'For long adjectives (usually two or more syllables that do not end in -y), do NOT add "-er". Instead, use "MORE" before the adjective and "THAN" after it. Never say "more expensive than" with an -er attached.',
    textEs:
      'Para adjetivos largos (generalmente de dos o más sílabas que no terminan en -y), NO agregamos "-er". En su lugar, usamos "MORE" antes del adjetivo y "THAN" después. Nunca añadas -er a un adjetivo largo.',
    formulaEn: 'MORE + adjective + THAN',
    formulaEs: 'MORE + adjetivo + THAN',
    examples: [
      {
        en: 'expensive → more expensive than (This car is more expensive than that one.)',
        es: 'caro → más caro que (Este auto es más caro que aquel.)',
        noteEn: 'Never say "expensiver".',
        noteEs: 'Nunca digas "expensiver".',
      },
      {
        en: 'interesting → more interesting than (History is more interesting than math.)',
        es: 'interesante → más interesante que (La historia es más interesante que las matemáticas.)',
        noteEn: 'Four syllables: use more + interesting.',
        noteEs: 'Cuatro sílabas: usa more + interesting.',
      },
      {
        en: 'comfortable → more comfortable than (A car is more comfortable than a bicycle.)',
        es: 'cómodo → más cómodo que (Un auto es más cómodo que una bicicleta.)',
        noteEn: 'Never say "comfortabler".',
        noteEs: 'Nunca digas "comfortabler".',
      },
      {
        en: 'crowded → more crowded than (New York is more crowded than Boston.)',
        es: 'concurrido/lleno → más lleno que (Nueva York está más llena de gente que Boston.)',
        noteEn: 'Two syllables ending in -ed: use more.',
        noteEs: 'Dos sílabas terminadas en -ed: usa more.',
      },
    ],
    grammarTipEn:
      'Double Comparison Warning: Never use "more" and "-er" together! "more taller" is strictly incorrect.',
    grammarTipEs:
      'Aviso de doble comparativo: ¡Nunca uses "more" y "-er" juntos! "more taller" es estrictamente incorrecto.',
  },
  {
    id: 'cs-theory-4',
    category: '2. Superlatives · Short Adjectives',
    categoryEs: '2. Superlativos · Adjetivos Cortos',
    titleEn: 'Short Adjectives: THE + adjective + -EST',
    titleEs: 'Adjetivos Cortos: THE + adjetivo + -EST',
    textEn:
      'We use superlatives to compare three or more people, things or places to indicate who or what possesses the highest or lowest degree of a quality. For short adjectives, add "THE" in front and "-est" at the end.',
    textEs:
      'Usamos los superlativos para comparar tres o más personas, cosas o lugares con el fin de indicar quién o qué tiene el grado máximo o mínimo de una cualidad. Para adjetivos cortos, anteponemos "THE" y añadimos "-est" al final.',
    formulaEn: 'THE + adjective + -EST',
    formulaEs: 'THE + adjetivo + -EST',
    examples: [
      {
        en: 'tall → the tallest (John is the tallest student in the class.)',
        es: 'alto → el más alto (John es el estudiante más alto de la clase.)',
        noteEn: 'Always use "the" before superlative.',
        noteEs: 'Usa siempre "the" antes del superlativo.',
      },
      {
        en: 'small → the smallest (The hummingbird is the smallest bird in the world.)',
        es: 'pequeño → el más pequeño (El colibrí es el pájaro más pequeño del mundo.)',
        noteEn: 'Small takes -est.',
        noteEs: 'Small lleva -est.',
      },
      {
        en: 'fast → the fastest (The cheetah is the fastest animal on land.)',
        es: 'rápido → el más rápido (El guepardo es el animal más rápido sobre la tierra.)',
        noteEn: 'Fast becomes the fastest.',
        noteEs: 'Fast se transforma en the fastest.',
      },
      {
        en: 'cheap → the cheapest (This is the cheapest restaurant in town.)',
        es: 'barato → el más barato (Este es el restaurante más barato del pueblo.)',
        noteEn: 'Cheap becomes the cheapest.',
        noteEs: 'Cheap se transforma en the cheapest.',
      },
    ],
    grammarTipEn:
      'Rule: Do not forget "THE". Writing just "John is tallest student" is grammatically incorrect in English.',
    grammarTipEs:
      'Regla: Nunca olvides "THE". Escribir solo "John is tallest student" es gramaticalmente incorrecto en inglés.',
  },
  {
    id: 'cs-theory-5',
    category: '2. Superlatives · Ending in -Y',
    categoryEs: '2. Superlativos · Terminados en -Y',
    titleEn: 'Adjectives Ending in -Y: Change y → i + est',
    titleEs: 'Adjetivos Terminados en -Y: Cambia y → i + est',
    textEn:
      'For adjectives ending in a consonant plus "-y", change the "-y" to "-i" and add "-est". Always remember to place "THE" before the adjective: "THE + adjective(-iest)".',
    textEs:
      'Para adjetivos que terminan en consonante más "-y", cambiamos la "-y" por "-i" y añadimos "-est". Recuerda siempre colocar "THE" antes del adjetivo: "THE + adjetivo(-iest)".',
    formulaEn: 'THE + adjective(-iest)',
    formulaEs: 'THE + adjetivo(-iest)',
    examples: [
      {
        en: 'happy → the happiest (She was the happiest person at the party.)',
        es: 'feliz → la más feliz (Ella fue la persona más feliz en la fiesta.)',
        noteEn: 'y becomes i + est.',
        noteEs: 'La y se transforma en i + est.',
      },
      {
        en: 'easy → the easiest (This exercise is the easiest on the test.)',
        es: 'fácil → el más fácil (Este ejercicio es el más fácil de la prueba.)',
        noteEn: 'Easy becomes the easiest.',
        noteEs: 'Easy se transforma en the easiest.',
      },
      {
        en: 'busy → the busiest (Monday is the busiest day of the week.)',
        es: 'ocupado → el más ocupado (El lunes es el día más ocupado de la semana.)',
        noteEn: 'Busy becomes the busiest.',
        noteEs: 'Busy se transforma en the busiest.',
      },
      {
        en: 'funny → the funniest (He is the funniest comedian on TV.)',
        es: 'gracioso → el más gracioso (Él es el comediante más gracioso de la televisión.)',
        noteEn: 'Funny becomes the funniest.',
        noteEs: 'Funny se transforma en the funniest.',
      },
    ],
    grammarTipEn:
      'Spelling Tip: easy → the easiest, pretty → the prettiest, heavy → the heaviest.',
    grammarTipEs:
      'Consejo ortográfico: easy → the easiest, pretty → the prettiest, heavy → the heaviest.',
  },
  {
    id: 'cs-theory-6',
    category: '2. Superlatives · Long Adjectives',
    categoryEs: '2. Superlativos · Adjetivos Largos',
    titleEn: 'Long Adjectives: THE MOST + adjective',
    titleEs: 'Adjetivos Largos: THE MOST + adjetivo',
    textEn:
      'For long adjectives (two or more syllables not ending in -y), do NOT add "-est". Instead, use "THE MOST" before the adjective. The base adjective remains unchanged.',
    textEs:
      'Para adjetivos largos (dos o más sílabas que no terminan en -y), NO agregamos "-est". En su lugar, usamos "THE MOST" antes del adjetivo. El adjetivo base permanece igual.',
    formulaEn: 'THE MOST + adjective',
    formulaEs: 'THE MOST + adjetivo',
    examples: [
      {
        en: 'expensive → the most expensive (This is the most expensive hotel in the city.)',
        es: 'caro → el más caro (Este es el hotel más caro de la ciudad.)',
        noteEn: 'Never say "the expensivest".',
        noteEs: 'Nunca digas "the expensivest".',
      },
      {
        en: 'interesting → the most interesting (She is the most interesting person here.)',
        es: 'interesante → la más interesante (Ella es la persona más interesante aquí.)',
        noteEn: 'Use the most + base form.',
        noteEs: 'Usa the most + forma base.',
      },
      {
        en: 'comfortable → the most comfortable (This is the most comfortable chair in the room.)',
        es: 'cómodo → la más cómoda (Esta es la silla más cómoda de la habitación.)',
        noteEn: 'Never say "the most comfortablest".',
        noteEs: 'Nunca digas "the most comfortablest".',
      },
      {
        en: 'popular → the most popular (Soccer is the most popular sport on the planet.)',
        es: 'popular → el más popular (El fútbol es el deporte más popular del planeta.)',
        noteEn: 'Use the most + popular.',
        noteEs: 'Usa the most + popular.',
      },
    ],
    grammarTipEn:
      'Rule: "The most" handles the superlative meaning; keep the adjective in its simple dictionary form.',
    grammarTipEs:
      'Regla: "The most" se encarga del significado superlativo; mantén el adjetivo en su forma base.',
  },
  {
    id: 'cs-theory-7',
    category: '3. Irregular Adjectives',
    categoryEs: '3. Adjetivos Irregulares',
    titleEn: 'Irregular Adjectives: Good, Bad, Far',
    titleEs: 'Adjetivos Irregulares: Good, Bad, Far',
    textEn:
      'Some very common adjectives do not follow regular rules. Their comparative and superlative forms change completely and must be memorized: good → better → the best, bad → worse → the worst, far → farther/further → the farthest/furthest.',
    textEs:
      'Algunos adjetivos muy frecuentes no siguen las reglas estándar. Sus formas comparativas y superlativas cambian por completo y deben memorizarse: good → better → the best, bad → worse → the worst, far → farther/further → the farthest/furthest.',
    formulaEn: 'Adjective → Comparative → Superlative',
    formulaEs: 'Adjetivo → Comparativo → Superlativo',
    examples: [
      {
        en: 'good → better than → the best (Today is better than yesterday. This is the best pizza in town.)',
        es: 'bueno → mejor que → el/la mejor (Hoy está mejor que ayer. Esta es la mejor pizza del pueblo.)',
        noteEn: 'Never say "more good" or "the goodest".',
        noteEs: 'Nunca digas "more good" ni "the goodest".',
      },
      {
        en: 'bad → worse than → the worst (My old phone was worse than this one. This is the worst movie.)',
        es: 'malo → peor que → el/la peor (Mi teléfono viejo era peor que este. Esta es la peor película.)',
        noteEn: 'Never say "more bad" or "the baddest".',
        noteEs: 'Nunca digas "more bad" ni "the baddest".',
      },
      {
        en: 'far → farther/further than → the farthest/furthest (Pluto is the farthest planet.)',
        es: 'lejos → más lejos que → el/la más lejano/a (Plutón es el planeta más lejano.)',
        noteEn: 'Farther/further both denote distance.',
        noteEs: 'Farther y further denotan distancia.',
      },
    ],
    grammarTipEn:
      'Crucial Mistake Avoidance: "more good" is a very common beginner mistake. Always use "better"!',
    grammarTipEs:
      'Evita este error crucial: "more good" es un error muy común en principiantes. ¡Usa siempre "better"!',
  },
  {
    id: 'cs-theory-8',
    category: '4. Comparison of Equality',
    categoryEs: '4. Comparación de Igualdad',
    titleEn: 'Equality: AS + adjective + AS / NOT AS + adjective + AS',
    titleEs: 'Igualdad: AS + adjetivo + AS / NOT AS + adjetivo + AS',
    textEn:
      'To state that two people or things have the same degree of a quality, use "as + adjective + as" (tan... como). To show that one does not have as much of a quality as the other, use "not as + adjective + as" (no tan... como). The adjective is always in base form.',
    textEs:
      'Para expresar que dos personas o cosas tienen el mismo grado de una cualidad, usamos "as + adjetivo + as" (tan... como). Para indicar que una no tiene tanto de esa cualidad como la otra, usamos "not as + adjetivo + as" (no tan... como). El adjetivo siempre va en su forma base.',
    formulaEn: 'as + adjective + as / not as + adjective + as',
    formulaEs: 'as + adjetivo + as / not as + adjetivo + as',
    examples: [
      {
        en: 'Messi is as famous as Maradona.',
        es: 'Messi es tan famoso como Maradona.',
        noteEn: 'Equality comparison: as famous as.',
        noteEs: 'Comparación de igualdad: tan famoso como.',
      },
      {
        en: "CR7 isn't as successful as Messi in World Cups.",
        es: 'CR7 no es tan exitoso como Messi en Copas del Mundo.',
        noteEn: 'Negative equality: not as successful as.',
        noteEs: 'Igualdad negativa: no tan exitoso como.',
      },
      {
        en: 'Basketball is as exciting as soccer.',
        es: 'El baloncesto es tan emocionante como el fútbol.',
        noteEn: 'Adjective stays in basic form.',
        noteEs: 'El adjetivo permanece en su forma básica.',
      },
    ],
    grammarTipEn:
      'Rule: Never add -er or more inside "as... as". Say "as tall as", never "as taller as".',
    grammarTipEs:
      'Regla: Nunca añadas -er o more dentro de "as... as". Di "as tall as", nunca "as taller as".',
  },
];

// ---------------------------------------------------------------------------
// EXERCISE 1: CHOOSE THE CORRECT ANSWER (8 Items from User Prompt)
// ---------------------------------------------------------------------------
export const COMPARATIVES_SUPERLATIVES_EX1_ITEMS: ComparativesSuperlativesEx1Item[] = [
  {
    id: 'cs-ex1-1',
    number: 1,
    questionEn: 'My car is ______ than yours.',
    questionEs: 'Mi auto es ______ que el tuyo.',
    options: [
      { key: 'a', text: 'fast', isCorrect: false },
      { key: 'b', text: 'faster', isCorrect: true },
      { key: 'c', text: 'fastest', isCorrect: false },
    ],
    correctAnswer: 'faster',
    explanationEn:
      '"Fast" is a short one-syllable adjective. To compare two items ("my car" and "yours") with "than", we add "-er": "faster than".',
    explanationEs:
      '"Fast" es un adjetivo corto de una sola sílaba. Para comparar dos elementos ("mi auto" y "el tuyo") con "than", añadimos "-er": "faster than".',
  },
  {
    id: 'cs-ex1-2',
    number: 2,
    questionEn: 'This is ______ restaurant in the city.',
    questionEs: 'Este es ______ restaurante de la ciudad.',
    options: [
      { key: 'a', text: 'more expensive', isCorrect: false },
      { key: 'b', text: 'the most expensive', isCorrect: true },
      { key: 'c', text: 'expensive', isCorrect: false },
    ],
    correctAnswer: 'the most expensive',
    explanationEn:
      'Comparing one restaurant to all others in the whole city requires a superlative form. "Expensive" is a long adjective (3 syllables), so we use "the most expensive".',
    explanationEs:
      'Comparar un restaurante con todos los demás de la ciudad requiere forma superlativa. "Expensive" es un adjetivo largo (3 sílabas), por lo que usamos "the most expensive".',
  },
  {
    id: 'cs-ex1-3',
    number: 3,
    questionEn: 'Tom is ______ than his brother.',
    questionEs: 'Tom es ______ que su hermano.',
    options: [
      { key: 'a', text: 'taller', isCorrect: true },
      { key: 'b', text: 'the tallest', isCorrect: false },
      { key: 'c', text: 'more tall', isCorrect: false },
    ],
    correctAnswer: 'taller',
    explanationEn:
      'Comparing two people (Tom and his brother) with "than" uses comparative. "Tall" is a short adjective: add "-er" ("taller"). Never say "more tall".',
    explanationEs:
      'Comparar dos personas (Tom y su hermano) con "than" utiliza comparativo. "Tall" es adjetivo corto: añadimos "-er" ("taller"). Nunca se dice "more tall".',
  },
  {
    id: 'cs-ex1-4',
    number: 4,
    questionEn: 'This exercise is ______ than the last one.',
    questionEs: 'Este ejercicio es ______ que el anterior.',
    options: [
      { key: 'a', text: 'easier', isCorrect: true },
      { key: 'b', text: 'easiest', isCorrect: false },
      { key: 'c', text: 'more easy', isCorrect: false },
    ],
    correctAnswer: 'easier',
    explanationEn:
      '"Easy" ends in consonant + "y". In the comparative form, change "y" to "i" and add "-er": "easier than".',
    explanationEs:
      '"Easy" termina en consonante + "y". En la forma comparativa, cambiamos "y" por "i" y agregamos "-er": "easier than".',
  },
  {
    id: 'cs-ex1-5',
    number: 5,
    questionEn: 'She is ______ student in the class.',
    questionEs: 'Ella es ______ estudiante de la clase.',
    options: [
      { key: 'a', text: 'smarter', isCorrect: false },
      { key: 'b', text: 'the smartest', isCorrect: true },
      { key: 'c', text: 'more smart', isCorrect: false },
    ],
    correctAnswer: 'the smartest',
    explanationEn:
      'Comparing one student to all students in the class requires the superlative form with "the": "the smartest".',
    explanationEs:
      'Comparar a una alumna con todos los estudiantes de la clase requiere la forma superlativa con "the": "the smartest".',
  },
  {
    id: 'cs-ex1-6',
    number: 6,
    questionEn: 'A Ferrari is ______ than a Fiat.',
    questionEs: 'Una Ferrari es ______ que un Fiat.',
    options: [
      { key: 'a', text: 'faster', isCorrect: true },
      { key: 'b', text: 'the fastest', isCorrect: false },
      { key: 'c', text: 'more fast', isCorrect: false },
    ],
    correctAnswer: 'faster',
    explanationEn:
      'Comparing two cars with "than" uses the comparative form of "fast" -> "faster".',
    explanationEs:
      'Comparar dos autos con "than" utiliza la forma comparativa de "fast" -> "faster".',
  },
  {
    id: 'cs-ex1-7',
    number: 7,
    questionEn: "This is ______ movie I've ever seen.",
    questionEs: 'Esta es ______ película que he visto jamás.',
    options: [
      { key: 'a', text: 'better', isCorrect: false },
      { key: 'b', text: 'the best', isCorrect: true },
      { key: 'c', text: 'the better', isCorrect: false },
    ],
    correctAnswer: 'the best',
    explanationEn:
      '"Good" is an irregular adjective. The superlative is "the best" when comparing among all movies ever seen.',
    explanationEs:
      '"Good" es un adjetivo irregular. El superlativo es "the best" al comparar entre todas las películas vistas.',
  },
  {
    id: 'cs-ex1-8',
    number: 8,
    questionEn: 'My house is ______ than yours.',
    questionEs: 'Mi casa es ______ que la tuya.',
    options: [
      { key: 'a', text: 'more comfortable', isCorrect: true },
      { key: 'b', text: 'comfortabler', isCorrect: false },
      { key: 'c', text: 'the most comfortable', isCorrect: false },
    ],
    correctAnswer: 'more comfortable',
    explanationEn:
      '"Comfortable" is a 4-syllable long adjective. For comparatives, we precede it with "more": "more comfortable than". Never say "comfortabler".',
    explanationEs:
      '"Comfortable" es un adjetivo largo de 4 sílabas. Para comparativos, lo antecedemos con "more": "more comfortable than". Nunca se dice "comfortabler".',
  },
];

// ---------------------------------------------------------------------------
// EXERCISE 2: FIND THE MISTAKE (8 Items from User Prompt)
// ---------------------------------------------------------------------------
export const COMPARATIVES_SUPERLATIVES_EX2_ITEMS: ComparativesSuperlativesEx2Item[] = [
  {
    id: 'cs-ex2-1',
    number: 1,
    incorrectSentenceEn: 'My brother is more tall than me.',
    incorrectSentenceEs: 'Mi hermano es más alto que yo (con error en inglés).',
    mistakeEn: '"more tall"',
    mistakeEs: '"more tall"',
    correctSentenceEn: 'My brother is taller than me.',
    correctSentenceEs: 'Mi hermano es más alto que yo.',
    explanationEn:
      '"Tall" is a short 1-syllable adjective. We add "-er" to form "taller", never "more tall".',
    explanationEs:
      '"Tall" es un adjetivo corto de 1 sílaba. Añadimos "-er" para formar "taller", nunca "more tall".',
  },
  {
    id: 'cs-ex2-2',
    number: 2,
    incorrectSentenceEn: 'This is the cheaper restaurant in town.',
    incorrectSentenceEs: 'Este es el restaurante más barato del pueblo (con error en inglés).',
    mistakeEn: '"the cheaper"',
    mistakeEs: '"the cheaper"',
    correctSentenceEn: 'This is the cheapest restaurant in town.',
    correctSentenceEs: 'Este es el restaurante más barato del pueblo.',
    explanationEn:
      'When identifying the extreme in a whole town, we need the superlative form with "-est": "the cheapest", not comparative "-er".',
    explanationEs:
      'Al identificar el extremo en todo un pueblo, necesitamos la forma superlativa con "-est": "the cheapest", no el comparativo "-er".',
  },
  {
    id: 'cs-ex2-3',
    number: 3,
    incorrectSentenceEn: 'English is easyer than German.',
    incorrectSentenceEs: 'El inglés es más fácil que el alemán (con error ortográfico).',
    mistakeEn: '"easyer" (spelling error)',
    mistakeEs: '"easyer" (error ortográfico)',
    correctSentenceEn: 'English is easier than German.',
    correctSentenceEs: 'El inglés es más fácil que el alemán.',
    explanationEn:
      'Spelling rule: for adjectives ending in consonant + "y", change "y" to "i" before adding "-er": "easier".',
    explanationEs:
      'Regla ortográfica: en adjetivos terminados en consonante + "y", cambiamos "y" por "i" antes de añadir "-er": "easier".',
  },
  {
    id: 'cs-ex2-4',
    number: 4,
    incorrectSentenceEn: 'She is the most young person here.',
    incorrectSentenceEs: 'Ella es la persona más joven aquí (con error en inglés).',
    mistakeEn: '"the most young"',
    mistakeEs: '"the most young"',
    correctSentenceEn: 'She is the youngest person here.',
    correctSentenceEs: 'Ella es la persona más joven aquí.',
    explanationEn:
      '"Young" is a 1-syllable short adjective. Its superlative takes "-est": "the youngest", never "the most young".',
    explanationEs:
      '"Young" es un adjetivo corto de 1 sílaba. Su superlativo lleva "-est": "the youngest", nunca "the most young".',
  },
  {
    id: 'cs-ex2-5',
    number: 5,
    incorrectSentenceEn: 'This car is expensiver than mine.',
    incorrectSentenceEs: 'Este auto es más caro que el mío (con error en inglés).',
    mistakeEn: '"expensiver"',
    mistakeEs: '"expensiver"',
    correctSentenceEn: 'This car is more expensive than mine.',
    correctSentenceEs: 'Este auto es más caro que el mío.',
    explanationEn:
      '"Expensive" is a long 3-syllable adjective. We use "more expensive", never attach "-er".',
    explanationEs:
      '"Expensive" es un adjetivo largo de 3 sílabas. Usamos "more expensive", jamás le añadimos "-er".',
  },
  {
    id: 'cs-ex2-6',
    number: 6,
    incorrectSentenceEn: 'Today is more good than yesterday.',
    incorrectSentenceEs: 'Hoy está mejor que ayer (con error en inglés).',
    mistakeEn: '"more good"',
    mistakeEs: '"more good"',
    correctSentenceEn: 'Today is better than yesterday.',
    correctSentenceEs: 'Hoy está mejor que ayer.',
    explanationEn:
      '"Good" is irregular. Its comparative form is "better", never "more good".',
    explanationEs:
      '"Good" es irregular. Su forma comparativa es "better", nunca "more good".',
  },
  {
    id: 'cs-ex2-7',
    number: 7,
    incorrectSentenceEn: 'He is the taller student in the class.',
    incorrectSentenceEs: 'Él es el estudiante más alto de la clase (con error en inglés).',
    mistakeEn: '"the taller"',
    mistakeEs: '"the taller"',
    correctSentenceEn: 'He is the tallest student in the class.',
    correctSentenceEs: 'Él es el estudiante más alto de la clase.',
    explanationEn:
      'Comparing one person to everyone in the class requires the superlative form with "-est": "the tallest".',
    explanationEs:
      'Comparar a una persona con todos en la clase requiere la forma superlativa con "-est": "the tallest".',
  },
  {
    id: 'cs-ex2-8',
    number: 8,
    incorrectSentenceEn: "This is the most bad movie I've seen.",
    incorrectSentenceEs: 'Esta es la peor película que he visto (con error en inglés).',
    mistakeEn: '"the most bad"',
    mistakeEs: '"the most bad"',
    correctSentenceEn: "This is the worst movie I've seen.",
    correctSentenceEs: 'Esta es la peor película que he visto.',
    explanationEn:
      '"Bad" is an irregular adjective. The superlative is "the worst", never "the most bad".',
    explanationEs:
      '"Bad" es un adjetivo irregular. El superlativo es "the worst", nunca "the most bad".',
  },
];

// ---------------------------------------------------------------------------
// EXERCISE 3: THE BATTLE (3 Comparisons with Model Sentences & Audio)
// ---------------------------------------------------------------------------
export const COMPARATIVES_SUPERLATIVES_BATTLES: ComparativesSuperlativesBattleItem[] = [
  {
    id: 'cs-battle-a',
    letter: 'A',
    pairEn: 'Coffee / Tea',
    pairEs: 'Café / Té',
    promptEn: 'Choose two things and compare them: Coffee vs Tea. Write 3 sentences.',
    promptEs: 'Elige dos cosas y compáralas: Café vs Té. Escribe 3 oraciones.',
    modelSentences: [
      {
        en: 'Coffee is stronger than tea.',
        es: 'El café es más fuerte que el té.',
        focusEn: 'Short adjective: strong → stronger than',
        focusEs: 'Adjetivo corto: strong → stronger than',
      },
      {
        en: 'Tea is healthier than coffee.',
        es: 'El té es más saludable que el café.',
        focusEn: 'Adjective ending in -y: healthy → healthier than',
        focusEs: 'Terminado en -y: healthy → healthier than',
      },
      {
        en: 'Coffee is more expensive than tea in many cafes.',
        es: 'El café es más caro que el té en muchas cafeterías.',
        focusEn: 'Long adjective: expensive → more expensive than',
        focusEs: 'Adjetivo largo: expensive → more expensive than',
      },
      {
        en: 'Tea is not as bitter as black coffee.',
        es: 'El té no es tan amargo como el café negro.',
        focusEn: 'Negative equality: not as bitter as',
        focusEs: 'Igualdad negativa: not as bitter as',
      },
    ],
  },
  {
    id: 'cs-battle-b',
    letter: 'B',
    pairEn: 'Summer / Winter',
    pairEs: 'Verano / Invierno',
    promptEn: 'Choose two things and compare them: Summer vs Winter. Write 3 sentences.',
    promptEs: 'Elige dos cosas y compáralas: Verano vs Invierno. Escribe 3 oraciones.',
    modelSentences: [
      {
        en: 'Summer is hotter than winter.',
        es: 'El verano es más caluroso que el invierno.',
        focusEn: 'Short adjective with consonant doubling: hot → hotter than',
        focusEs: 'Adjetivo corto duplicando consonante: hot → hotter than',
      },
      {
        en: 'Winter is colder than summer.',
        es: 'El invierno es más frío que el verano.',
        focusEn: 'Short adjective: cold → colder than',
        focusEs: 'Adjetivo corto: cold → colder than',
      },
      {
        en: 'Summer is more enjoyable for outdoor swimming than winter.',
        es: 'El verano es más agradable para nadar al aire libre que el invierno.',
        focusEn: 'Long adjective: enjoyable → more enjoyable than',
        focusEs: 'Adjetivo largo: enjoyable → more enjoyable than',
      },
      {
        en: 'Winter days are not as long as summer days.',
        es: 'Los días de invierno no son tan largos como los días de verano.',
        focusEn: 'Negative equality: not as long as',
        focusEs: 'Igualdad negativa: not as long as',
      },
    ],
  },
  {
    id: 'cs-battle-c',
    letter: 'C',
    pairEn: 'City Life / Country Life',
    pairEs: 'Vida en la Ciudad / Vida en el Campo',
    promptEn: 'Choose two things and compare them: City life vs Country life. Write 3 sentences.',
    promptEs: 'Elige dos cosas y compáralas: Vida en la ciudad vs Vida en el campo. Escribe 3 oraciones.',
    modelSentences: [
      {
        en: 'City life is busier than country life.',
        es: 'La vida en la ciudad es más ajetreada que la vida en el campo.',
        focusEn: 'Adjective ending in -y: busy → busier than',
        focusEs: 'Terminado en -y: busy → busier than',
      },
      {
        en: 'Country life is quieter and cleaner than city life.',
        es: 'La vida en el campo es más tranquila y limpia que la vida en la ciudad.',
        focusEn: 'Short adjectives: quiet → quieter, clean → cleaner than',
        focusEs: 'Adjetivos cortos: quiet → quieter, clean → cleaner than',
      },
      {
        en: 'City life is more expensive and stressful than country life.',
        es: 'La vida en la ciudad es más cara y estresante que la vida en el campo.',
        focusEn: 'Long adjectives: expensive → more expensive, stressful → more stressful',
        focusEs: 'Adjetivos largos: expensive → more expensive, stressful → more stressful',
      },
      {
        en: 'Country life is not as crowded as city life.',
        es: 'La vida en el campo no está tan congestionada como la vida en la ciudad.',
        focusEn: 'Negative equality: not as crowded as',
        focusEs: 'Igualdad negativa: not as crowded as',
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// EXERCISE 4: COMPLETE THE SENTENCES (10 Items with Comparative / Superlative)
// ---------------------------------------------------------------------------
export const COMPARATIVES_SUPERLATIVES_EX4_ITEMS: ComparativesSuperlativesEx4Item[] = [
  {
    id: 'cs-ex4-1',
    number: 1,
    sentenceBefore: 'My sister is',
    sentenceAfter: 'than me. (young)',
    baseAdjective: 'young',
    fullSentenceEn: 'My sister is younger than me.',
    fullSentenceEs: 'Mi hermana es más joven que yo.',
    correctAnswer: 'younger',
    acceptableAnswers: ['younger'],
    explanationEn: 'Comparing two people with "than" uses the comparative form of "young" -> "younger".',
    explanationEs: 'Comparar a dos personas con "than" utiliza la forma comparativa de "young" -> "younger".',
  },
  {
    id: 'cs-ex4-2',
    number: 2,
    sentenceBefore: 'This is',
    sentenceAfter: 'day of my life. (good)',
    baseAdjective: 'good',
    fullSentenceEn: 'This is the best day of my life.',
    fullSentenceEs: 'Este es el mejor día de mi vida.',
    correctAnswer: 'the best',
    acceptableAnswers: ['the best', 'best'],
    explanationEn: 'Comparing one day to all days in life requires the superlative of irregular "good" -> "the best".',
    explanationEs: 'Comparar un día con todos los días de la vida requiere el superlativo de "good" irregular -> "the best".',
  },
  {
    id: 'cs-ex4-3',
    number: 3,
    sentenceBefore: 'A plane is',
    sentenceAfter: 'than a car. (fast)',
    baseAdjective: 'fast',
    fullSentenceEn: 'A plane is faster than a car.',
    fullSentenceEs: 'Un avión es más rápido que un auto.',
    correctAnswer: 'faster',
    acceptableAnswers: ['faster'],
    explanationEn: 'Comparing two vehicles with "than" uses the comparative form of "fast" -> "faster".',
    explanationEs: 'Comparar dos vehículos con "than" utiliza la forma comparativa de "fast" -> "faster".',
  },
  {
    id: 'cs-ex4-4',
    number: 4,
    sentenceBefore: 'This is',
    sentenceAfter: 'restaurant in town. (expensive)',
    baseAdjective: 'expensive',
    fullSentenceEn: 'This is the most expensive restaurant in town.',
    fullSentenceEs: 'Este es el restaurante más caro del pueblo.',
    correctAnswer: 'the most expensive',
    acceptableAnswers: ['the most expensive', 'most expensive'],
    explanationEn: 'Comparing one restaurant to all others in town requires the superlative form of "expensive" -> "the most expensive".',
    explanationEs: 'Comparar un restaurante con todos los del pueblo requiere la forma superlativa de "expensive" -> "the most expensive".',
  },
  {
    id: 'cs-ex4-5',
    number: 5,
    sentenceBefore: 'He is',
    sentenceAfter: 'runner in the school. (slow)',
    baseAdjective: 'slow',
    fullSentenceEn: 'He is the slowest runner in the school.',
    fullSentenceEs: 'Él es el corredor más lento de la escuela.',
    correctAnswer: 'the slowest',
    acceptableAnswers: ['the slowest', 'slowest'],
    explanationEn: 'Comparing one runner against the entire school requires the superlative of "slow" -> "the slowest".',
    explanationEs: 'Comparar a un corredor con toda la escuela requiere el superlativo de "slow" -> "the slowest".',
  },
  {
    id: 'cs-ex4-6',
    number: 6,
    sentenceBefore: 'English is',
    sentenceAfter: 'than history. (interesting)',
    baseAdjective: 'interesting',
    fullSentenceEn: 'English is more interesting than history.',
    fullSentenceEs: 'El inglés es más interesante que la historia.',
    correctAnswer: 'more interesting',
    acceptableAnswers: ['more interesting'],
    explanationEn: '"Interesting" is a 4-syllable long adjective. With "than", we use "more interesting".',
    explanationEs: '"Interesting" es un adjetivo largo de 4 sílabas. Con "than", usamos "more interesting".',
  },
  {
    id: 'cs-ex4-7',
    number: 7,
    sentenceBefore: 'Mount Everest is',
    sentenceAfter: 'mountain in the world. (high)',
    baseAdjective: 'high',
    fullSentenceEn: 'Mount Everest is the highest mountain in the world.',
    fullSentenceEs: 'El Monte Everest es la montaña más alta del mundo.',
    correctAnswer: 'the highest',
    acceptableAnswers: ['the highest', 'highest'],
    explanationEn: 'Comparing to all mountains in the world requires the superlative of "high" -> "the highest".',
    explanationEs: 'Comparar con todas las montañas del mundo requiere el superlativo de "high" -> "the highest".',
  },
  {
    id: 'cs-ex4-8',
    number: 8,
    sentenceBefore: 'My new phone is',
    sentenceAfter: 'than my old one. (good)',
    baseAdjective: 'good',
    fullSentenceEn: 'My new phone is better than my old one.',
    fullSentenceEs: 'Mi nuevo teléfono es mejor que el anterior.',
    correctAnswer: 'better',
    acceptableAnswers: ['better'],
    explanationEn: '"Good" is irregular. Its comparative form when comparing two phones is "better".',
    explanationEs: '"Good" es irregular. Su forma comparativa al comparar dos teléfonos es "better".',
  },
  {
    id: 'cs-ex4-9',
    number: 9,
    sentenceBefore: 'Russia is',
    sentenceAfter: 'than Spain. (big)',
    baseAdjective: 'big',
    fullSentenceEn: 'Russia is bigger than Spain.',
    fullSentenceEs: 'Rusia es más grande que España.',
    correctAnswer: 'bigger',
    acceptableAnswers: ['bigger'],
    explanationEn: '"Big" is a short 1-syllable C-V-C adjective: double the final "g" and add "-er": "bigger than".',
    explanationEs: '"Big" es un adjetivo corto Consonante-Vocal-Consonante: duplicamos la "g" final y añadimos "-er": "bigger than".',
  },
  {
    id: 'cs-ex4-10',
    number: 10,
    sentenceBefore: 'Today is',
    sentenceAfter: 'than yesterday. (cold)',
    baseAdjective: 'cold',
    fullSentenceEn: 'Today is colder than yesterday.',
    fullSentenceEs: 'Hoy está más frío que ayer.',
    correctAnswer: 'colder',
    acceptableAnswers: ['colder'],
    explanationEn: 'Comparing two days with "than" uses the comparative form of "cold" -> "colder".',
    explanationEs: 'Comparar dos días con "than" utiliza la forma comparativa de "cold" -> "colder".',
  },
];

// ---------------------------------------------------------------------------
// EXERCISE 5: THE SPORTS STARS COMPARISON (Messi vs CR7 vs Maradona)
// ---------------------------------------------------------------------------
export const SPORTS_STARS_COMPARISONS: SportsBattleItem[] = [
  {
    id: 'cs-sports-messi-cr7',
    titleEn: 'Messi vs CR7 & Maradona: The Ultimate Football Comparison',
    titleEs: 'Messi vs CR7 y Maradona: La Comparación Definitiva del Fútbol',
    promptEn:
      'Practice writing three types of sentences: • ONE comparative sentence • ONE equality sentence • ONE negative equality sentence',
    promptEs:
      'Practica escribir tres tipos de oraciones: • UNA oración comparativa • UNA oración de igualdad • UNA oración de igualdad negativa',
    instructionsEn:
      'Review the model sentences below, listen to the pronunciation, and practice creating your own comparisons between famous athletes.',
    instructionsEs:
      'Revisa las oraciones modelo a continuación, escucha la pronunciación y practica creando tus propias comparaciones entre atletas famosos.',
    examples: [
      {
        type: 'comparative',
        en: 'Messi is faster than CR7 with the ball.',
        es: 'Messi es más rápido que CR7 con el balón.',
        explanationEn: 'Comparative with short adjective: fast + -er + than.',
        explanationEs: 'Comparativo con adjetivo corto: fast + -er + than.',
      },
      {
        type: 'equality',
        en: 'Messi is as famous as Maradona around the world.',
        es: 'Messi es tan famoso como Maradona en todo el mundo.',
        explanationEn: 'Equality with long adjective: as + famous + as.',
        explanationEs: 'Igualdad con adjetivo largo: as + famous + as.',
      },
      {
        type: 'negative-equality',
        en: "CR7 isn't as successful as Messi in World Cup championships.",
        es: 'CR7 no es tan exitoso como Messi en campeonatos de la Copa del Mundo.',
        explanationEn: 'Negative equality: isn\'t as + successful + as.',
        explanationEs: 'Igualdad negativa: isn\'t as + successful + as.',
      },
    ],
  },
  {
    id: 'cs-sports-basketball-tennis',
    titleEn: 'Basketball, Tennis & Athletics Comparisons',
    titleEs: 'Comparaciones de Baloncesto, Tenis y Atletismo',
    promptEn: 'Compare two sports or legendary athletes in speed, excitement, and history.',
    promptEs: 'Compara dos deportes o atletas legendarios en velocidad, emoción e historia.',
    instructionsEn:
      'Explore these professional sport comparisons using comparatives, equality, and negative equality.',
    instructionsEs:
      'Explora estas comparaciones deportivas profesionales usando comparativos, igualdad e igualdad negativa.',
    examples: [
      {
        type: 'comparative',
        en: 'Basketball is more fast-paced than baseball.',
        es: 'El baloncesto tiene un ritmo más rápido que el béisbol.',
        explanationEn: 'Comparative with compound adjective: more + fast-paced + than.',
        explanationEs: 'Comparativo con adjetivo compuesto: more + fast-paced + than.',
      },
      {
        type: 'equality',
        en: 'Rafael Nadal is as competitive as Roger Federer.',
        es: 'Rafael Nadal es tan competitivo como Roger Federer.',
        explanationEn: 'Equality: as + competitive + as.',
        explanationEs: 'Igualdad: as + competitive + as.',
      },
      {
        type: 'negative-equality',
        en: "Running a 100-meter race isn't as long as running a marathon.",
        es: 'Correr una carrera de 100 metros no es tan largo como correr un maratón.',
        explanationEn: 'Negative equality: isn\'t as + long + as.',
        explanationEs: 'Igualdad negativa: isn\'t as + long + as.',
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// MASTERCLASS EXERCISE DEFINITION FOR UNIT 4 - SECTION 1
// ---------------------------------------------------------------------------
export const COMPARATIVES_SUPERLATIVES_MASTERCLASS_EXERCISES: Exercise[] = [
  {
    id: 'comparatives-superlatives-masterclass-overview',
    type: 'be-past-masterclass' as any, // using matching structure
    title: 'Comparatives & Superlatives Masterclass',
    instructions:
      'Learn the rules of comparatives, superlatives, irregular adjectives, and equality with detailed explanations in English and Spanish, reversible cards, and interactive exercises.',
    instructionsEs:
      'Aprende las reglas de comparativos, superlativos, adjetivos irregulares e igualdad con explicaciones detalladas en inglés y español, tarjetas reversibles y ejercicios interactivos.',
  },
];
