import mrAmericaImg from '../assets/images/mr_america_comparison_1792189272852.jpg';

export { mrAmericaImg };

export interface ComparisonDialogueSlot {
  id: string;
  expectedWord: string;
  dropdownOptions?: string[];
}

export interface ComparisonDialogueLine {
  speaker?: string;
  prefix?: string;
  prefixEs?: string;
  slot?: ComparisonDialogueSlot;
  middleText?: string;
  middleTextEs?: string;
  slot2?: ComparisonDialogueSlot;
  middleText2?: string;
  middleText2Es?: string;
  slot3?: ComparisonDialogueSlot;
  suffix?: string;
  suffixEs?: string;
  fullEn?: string;
  fullEs?: string;
}

export interface ComparisonActivityItem {
  id: string;
  number: number;
  title: string;
  type: 'dropdown' | 'drag-drop';
  instructions: string;
  instructionsEs: string;
  audioPrompt: string;
  dialogueLines: ComparisonDialogueLine[];
  optionsPool?: string[];
  explanationEn: string;
  explanationEs: string;
}

export interface ComparisonTestItem {
  id: string;
  number: number;
  type: 'dropdown' | 'drag-drop';
  instructions: string;
  instructionsEs: string;
  audioPrompt: string;
  dialogueLines: ComparisonDialogueLine[];
  optionsPool?: string[];
  explanationEn: string;
  explanationEs: string;
}

export const COMPARISON_REVIEW_REFERENCE_AUDIO =
  "- Ahh! He's as strong as last year's Mr. America! - Ooh! He's even stronger! - Wow! He's the strongest!";

export const COMPARISON_REVIEW_REFERENCE_SENTENCES = [
  {
    textEn: "- Ahh! He's as strong as last year's Mr. America!",
    textEs: '- ¡Ahh! ¡Él es tan fuerte como el Mr. América del año pasado!',
    highlights: ['as strong as'],
  },
  {
    textEn: "- Ooh! He's even stronger!",
    textEs: '- ¡Ooh! ¡Él es incluso más fuerte!',
    highlights: ['stronger'],
  },
  {
    textEn: "- Wow! He's the strongest!",
    textEs: '- ¡Guau! ¡Él es el más fuerte!',
    highlights: ['the strongest', 'strongest'],
  },
];

// ---------------------------------------------------------------------------
// 20 PRACTICAL ACTIVITIES (Actividad 2 to Actividad 21)
// Actividad 1 is the Explore slide.
// ---------------------------------------------------------------------------
export const COMPARISON_REVIEW_ACTIVITIES: ComparisonActivityItem[] = [
  /* Actividad 2 (actividad 2.png, Image 30) */
  {
    id: 'car-act-2',
    number: 2,
    title: 'Actividad 2',
    type: 'dropdown',
    instructions: 'Select the correct answer from the drop-down list.',
    instructionsEs: 'Selecciona la respuesta correcta de la lista desplegable.',
    audioPrompt: "English is not as difficult to learn as Japanese, but it's harder than French.",
    dialogueLines: [
      {
        prefix: 'English is not ',
        prefixEs: 'El inglés no es ',
        slot: {
          id: 'car-act2-s1',
          expectedWord: 'as difficult',
          dropdownOptions: ['more difficult', 'as difficult', 'very difficult', 'difficult'],
        },
        middleText: " to learn as Japanese, but it's ",
        middleTextEs: ' de aprender como el japonés, pero es ',
        slot2: {
          id: 'car-act2-s2',
          expectedWord: 'harder',
          dropdownOptions: ['hardest', 'as hard', 'too hard', 'harder'],
        },
        suffix: ' than French.',
        suffixEs: ' que el francés.',
        fullEn: "English is not as difficult to learn as Japanese, but it's harder than French.",
        fullEs: 'El inglés no es tan difícil de aprender como el japonés, pero es más difícil que el francés.',
      },
    ],
    optionsPool: [],
    explanationEn:
      "Use 'as difficult... as' for equality comparison: 'not as difficult to learn as Japanese'. Use comparative '-er' with 'than': 'harder than French'.",
    explanationEs:
      "Usa 'as difficult... as' para comparación de igualdad: 'not as difficult to learn as Japanese'. Usa el comparativo '-er' con 'than': 'harder than French'.",
  },

  /* Actividad 3 (actividad 3.png, Image 29) */
  {
    id: 'car-act-3',
    number: 3,
    title: 'Actividad 3',
    type: 'dropdown',
    instructions: 'Select the correct answer from the drop-down list.',
    instructionsEs: 'Selecciona la respuesta correcta de la lista desplegable.',
    audioPrompt:
      "The Nelsons went to Madrid by train because it wasn't as expensive as flying. It was a longer trip, though.",
    dialogueLines: [
      {
        prefix: "The Nelsons went to Madrid by train because it wasn't ",
        prefixEs: 'Los Nelson fueron a Madrid en tren porque no era ',
        slot: {
          id: 'car-act3-s1',
          expectedWord: 'as expensive as',
          dropdownOptions: ['expensive than', 'too expensive', 'expensive as', 'as expensive as'],
        },
        middleText: ' flying. It was a ',
        middleTextEs: ' volar. Aunque fue un viaje ',
        slot2: {
          id: 'car-act3-s2',
          expectedWord: 'longer',
          dropdownOptions: ['the longest', 'longer', 'longer than', 'long as'],
        },
        suffix: ' trip, though.',
        suffixEs: ', sin embargo.',
        fullEn:
          "The Nelsons went to Madrid by train because it wasn't as expensive as flying. It was a longer trip, though.",
        fullEs:
          'Los Nelson fueron a Madrid en tren porque no era tan caro como volar. Aunque fue un viaje más largo.',
      },
    ],
    optionsPool: [],
    explanationEn:
      "'wasn't as expensive as flying' expresses equality comparison of expense. 'a longer trip' modifies the noun 'trip' with comparative 'longer'.",
    explanationEs:
      "'wasn't as expensive as flying' expresa comparación de igualdad de costo. 'a longer trip' modifica al sustantivo 'trip' con el comparativo 'longer'.",
  },

  /* Actividad 4 (actividad 4.png, Image 28) */
  {
    id: 'car-act-4',
    number: 4,
    title: 'Actividad 4',
    type: 'dropdown',
    instructions: 'Select the correct answer from the drop-down list.',
    instructionsEs: 'Selecciona la respuesta correcta de la lista desplegable.',
    audioPrompt: 'Today is colder than yesterday. Yes, and it\'s windier than yesterday, too.',
    dialogueLines: [
      {
        prefix: '- Today is ',
        prefixEs: '- Hoy hace ',
        slot: {
          id: 'car-act4-s1',
          expectedWord: 'colder',
          dropdownOptions: ['colder', 'as cold', 'very cold', 'coldest'],
        },
        suffix: ' than yesterday.',
        suffixEs: ' frío que ayer.',
        fullEn: '- Today is colder than yesterday.',
        fullEs: '- Hoy hace más frío que ayer.',
      },
      {
        prefix: "- Yes, and it's ",
        prefixEs: '- Sí, y también hay ',
        slot: {
          id: 'car-act4-s2',
          expectedWord: 'windier',
          dropdownOptions: ['windy', 'windier', 'windiest', 'too windy'],
        },
        suffix: ' than yesterday, too.',
        suffixEs: ' viento que ayer.',
        fullEn: "- Yes, and it's windier than yesterday, too.",
        fullEs: '- Sí, y también hay más viento que ayer.',
      },
    ],
    optionsPool: [],
    explanationEn:
      "Both sentences compare today to yesterday using 'than': 'colder than' and 'windier than' ('windy' changes 'y' to 'ier').",
    explanationEs:
      "Ambas oraciones comparan el día de hoy con ayer usando 'than': 'colder than' y 'windier than' ('windy' cambia 'y' por 'ier').",
  },

  /* Actividad 5 (actividad 5.png, Image 27) */
  {
    id: 'car-act-5',
    number: 5,
    title: 'Actividad 5',
    type: 'dropdown',
    instructions: 'Select the correct answer from the drop-down list.',
    instructionsEs: 'Selecciona la respuesta correcta de la lista desplegable.',
    audioPrompt:
      'John tried three bicycles before he bought one. The Blazer was nicer than the Track, but it was more expensive, too. The Rand was the best bike of all.',
    dialogueLines: [
      {
        prefix: 'John tried three bicycles before he bought one. The Blazer was ',
        prefixEs: 'John probó tres bicicletas antes de comprar una. La Blazer era ',
        slot: {
          id: 'car-act5-s1',
          expectedWord: 'nicer',
          dropdownOptions: ['as nice', 'nicest', 'nicer', 'too nice'],
        },
        middleText: ' than the Track, but it was ',
        middleTextEs: ' que la Track, pero era ',
        slot2: {
          id: 'car-act5-s2',
          expectedWord: 'more',
          dropdownOptions: ['most', 'the least', 'more', 'the very'],
        },
        middleText2: ' expensive, too. The Rand was the ',
        middleText2Es: ' cara, también. La Rand fue la ',
        slot3: {
          id: 'car-act5-s3',
          expectedWord: 'best',
          dropdownOptions: ['best', 'very good', 'better', 'good'],
        },
        suffix: ' bike of all.',
        suffixEs: ' bicicleta de todas.',
        fullEn:
          'John tried three bicycles before he bought one. The Blazer was nicer than the Track, but it was more expensive, too. The Rand was the best bike of all.',
        fullEs:
          'John probó tres bicicletas antes de comprar una. La Blazer era más bonita que la Track, pero también era más cara. La Rand fue la mejor bicicleta de todas.',
      },
    ],
    optionsPool: [],
    explanationEn:
      "Comparing two bikes: 'nicer than' and 'more expensive'. Comparing among all three: superlative 'the best bike of all'.",
    explanationEs:
      "Comparando dos bicicletas: 'nicer than' y 'more expensive'. Comparando entre las tres: superlativo 'the best bike of all'.",
  },

  /* Actividad 6 (actividad 6.png, Image 26) */
  {
    id: 'car-act-6',
    number: 6,
    title: 'Actividad 6',
    type: 'dropdown',
    instructions: 'Select the correct answer from the drop-down list.',
    instructionsEs: 'Selecciona la respuesta correcta de la lista desplegable.',
    audioPrompt:
      "Come to Max's Farm Market! Our fruit is fresher than supermarket fruit. Our prices are better, too.",
    dialogueLines: [
      {
        prefix: "Come to Max's Farm Market! Our fruit is ",
        prefixEs: '¡Ven al mercado de Max! Nuestra fruta es ',
        slot: {
          id: 'car-act6-s1',
          expectedWord: 'fresher',
          dropdownOptions: ['as fresh', 'fresher', 'fresh', 'too fresh'],
        },
        middleText: ' than supermarket fruit. Our prices are ',
        middleTextEs: ' que la del supermercado. Nuestros precios también son ',
        slot2: {
          id: 'car-act6-s2',
          expectedWord: 'better',
          dropdownOptions: ['good', 'as good', 'best', 'better'],
        },
        suffix: ', too.',
        suffixEs: '.',
        fullEn:
          "Come to Max's Farm Market! Our fruit is fresher than supermarket fruit. Our prices are better, too.",
        fullEs:
          '¡Ven al mercado de Max! Nuestra fruta es más fresca que la del supermercado. Nuestros precios también son mejores.',
      },
    ],
    optionsPool: [],
    explanationEn:
      "'fresher than' compares the farm fruit to supermarket fruit. 'better' is the irregular comparative form of 'good'.",
    explanationEs:
      "'fresher than' compara la fruta del mercado con la del supermercado. 'better' es la forma comparativa irregular de 'good'.",
  },

  /* Actividad 7 (actividad 7.png, Image 25) */
  {
    id: 'car-act-7',
    number: 7,
    title: 'Actividad 7',
    type: 'dropdown',
    instructions: 'Select the correct answer from the drop-down list.',
    instructionsEs: 'Selecciona la respuesta correcta de la lista desplegable.',
    audioPrompt: "My name is longer than yours, but it's easier to spell.",
    dialogueLines: [
      {
        prefix: 'My name is longer ',
        prefixEs: 'Mi nombre es más largo ',
        slot: {
          id: 'car-act7-s1',
          expectedWord: 'than',
          dropdownOptions: ['than', 'for', 'as', 'like'],
        },
        middleText: " yours, but it's ",
        middleTextEs: ' que el tuyo, pero es ',
        slot2: {
          id: 'car-act7-s2',
          expectedWord: 'easier',
          dropdownOptions: ['easier', 'easiest', 'too easy', 'as easy as'],
        },
        suffix: ' to spell.',
        suffixEs: ' de deletrear.',
        fullEn: "My name is longer than yours, but it's easier to spell.",
        fullEs: 'Mi nombre es más largo que el tuyo, pero es más fácil de deletrear.',
      },
    ],
    optionsPool: [],
    explanationEn:
      "Comparative 'longer' is followed by 'than'. 'easy' forms its comparative by changing 'y' to 'ier': 'easier to spell'.",
    explanationEs:
      "El comparativo 'longer' va seguido de 'than'. 'easy' forma su comparativo cambiando 'y' por 'ier': 'easier to spell'.",
  },

  /* Actividad 8 (actividad 8.png, Image 24) */
  {
    id: 'car-act-8',
    number: 8,
    title: 'Actividad 8',
    type: 'dropdown',
    instructions: 'Select the correct answer from the drop-down list.',
    instructionsEs: 'Selecciona la respuesta correcta de la lista desplegable.',
    audioPrompt: "Amy is taller than Gina, but she's shorter than Liz.",
    dialogueLines: [
      {
        prefix: 'Amy is ',
        prefixEs: 'Amy es ',
        slot: {
          id: 'car-act8-s1',
          expectedWord: 'taller',
          dropdownOptions: ['tall', 'taller', 'tallest', 'as tall'],
        },
        middleText: " than Gina, but she's ",
        middleTextEs: ' que Gina, pero es ',
        slot2: {
          id: 'car-act8-s2',
          expectedWord: 'shorter',
          dropdownOptions: ['shorter', 'short', 'as short', 'too short'],
        },
        suffix: ' than Liz.',
        suffixEs: ' que Liz.',
        fullEn: "Amy is taller than Gina, but she's shorter than Liz.",
        fullEs: 'Amy es más alta que Gina, pero es más baja que Liz.',
      },
    ],
    optionsPool: [],
    explanationEn:
      "Both comparisons use 'than', requiring the comparative forms: 'taller than' and 'shorter than'.",
    explanationEs:
      "Ambas comparaciones usan 'than', por lo que requieren formas comparativas: 'taller than' y 'shorter than'.",
  },

  /* Actividad 9 (actividad 9.png, Image 23) */
  {
    id: 'car-act-9',
    number: 9,
    title: 'Actividad 9',
    type: 'dropdown',
    instructions: 'Select the correct answer from the drop-down list.',
    instructionsEs: 'Selecciona la respuesta correcta de la lista desplegable.',
    audioPrompt:
      'Why do you like baseball? Well, it may be a slower game than soccer, but it can be as exciting.',
    dialogueLines: [
      {
        prefix: '- Why do you like baseball?',
        prefixEs: '- ¿Por qué te gusta el béisbol?',
        fullEn: '- Why do you like baseball?',
        fullEs: '- ¿Por qué te gusta el béisbol?',
      },
      {
        prefix: '- Well, it may be a ',
        prefixEs: '- Bueno, puede ser un juego ',
        slot: {
          id: 'car-act9-s1',
          expectedWord: 'slower',
          dropdownOptions: ['very slow', 'slowest', 'the slow', 'slower'],
        },
        middleText: ' game than soccer, but it can be ',
        middleTextEs: ' que el fútbol, pero puede ser ',
        slot2: {
          id: 'car-act9-s2',
          expectedWord: 'as',
          dropdownOptions: ['like', 'than', 'as', 'the'],
        },
        suffix: ' exciting.',
        suffixEs: ' de emocionante.',
        fullEn: '- Well, it may be a slower game than soccer, but it can be as exciting.',
        fullEs: '- Bueno, puede ser un juego más lento que el fútbol, pero puede ser igual de emocionante.',
      },
    ],
    optionsPool: [],
    explanationEn:
      "Comparing speed with 'than soccer': 'a slower game than soccer'. Comparing equality of excitement: 'as exciting' (as exciting as soccer).",
    explanationEs:
      "Comparando ritmo con 'than soccer': 'a slower game than soccer'. Igualdad de emoción: 'as exciting' (tan emocionante como el fútbol).",
  },

  /* Actividad 10 (actividad 10.png, Image 22) */
  {
    id: 'car-act-10',
    number: 10,
    title: 'Actividad 10',
    type: 'dropdown',
    instructions: 'Select the correct answer from the drop-down list.',
    instructionsEs: 'Selecciona la respuesta correcta de la lista desplegable.',
    audioPrompt:
      "Tracy is studying for her final English test. It's the most important and the most difficult test of the year.",
    dialogueLines: [
      {
        prefix: "Tracy is studying for her final English test. It's ",
        prefixEs: 'Tracy está estudiando para su examen final de inglés. Es ',
        slot: {
          id: 'car-act10-s1',
          expectedWord: 'the most important',
          dropdownOptions: [
            'more important',
            'the most important',
            'most important',
            'the more important',
          ],
        },
        middleText: ' and the ',
        middleTextEs: ' y el examen ',
        slot2: {
          id: 'car-act10-s2',
          expectedWord: 'most',
          dropdownOptions: ['too', 'very', 'most', 'more'],
        },
        suffix: ' difficult test of the year.',
        suffixEs: ' del año.',
        fullEn:
          "Tracy is studying for her final English test. It's the most important and the most difficult test of the year.",
        fullEs:
          'Tracy está estudiando para su examen final de inglés. Es el examen más importante y el más difícil del año.',
      },
    ],
    optionsPool: [],
    explanationEn:
      "Multi-syllable adjectives 'important' and 'difficult' form superlatives with 'the most': 'the most important' and 'the most difficult'.",
    explanationEs:
      "Los adjetivos polisílabos 'important' y 'difficult' forman el superlativo con 'the most': 'the most important' y 'the most difficult'.",
  },

  /* Actividad 11 (actividad 11.png, Image 21) */
  {
    id: 'car-act-11',
    number: 11,
    title: 'Actividad 11',
    type: 'dropdown',
    instructions: 'Select the correct answer from the drop-down list.',
    instructionsEs: 'Selecciona la respuesta correcta de la lista desplegable.',
    audioPrompt:
      'Mr. and Mrs. Hill have a new grandson. They think he is the cutest, the smartest, and the most wonderful baby in the world.',
    dialogueLines: [
      {
        prefix: 'Mr. and Mrs. Hill have a new grandson. They think he is the ',
        prefixEs: 'El Sr. y la Sra. Hill tienen un nuevo nieto. Creen que es el bebé ',
        slot: {
          id: 'car-act11-s1',
          expectedWord: 'cutest',
          dropdownOptions: ['cutest', 'too cute', 'cuter', 'very cute'],
        },
        middleText: ', the ',
        middleTextEs: ', el ',
        slot2: {
          id: 'car-act11-s2',
          expectedWord: 'smartest',
          dropdownOptions: ['very smart', 'smarter', 'smart', 'smartest'],
        },
        middleText2: ', and the ',
        middleText2Es: ', y el ',
        slot3: {
          id: 'car-act11-s3',
          expectedWord: 'most',
          dropdownOptions: ['too', 'most', 'more', 'very'],
        },
        suffix: ' wonderful baby in the world.',
        suffixEs: ' del mundo.',
        fullEn:
          'Mr. and Mrs. Hill have a new grandson. They think he is the cutest, the smartest, and the most wonderful baby in the world.',
        fullEs:
          'El Sr. y la Sra. Hill tienen un nuevo nieto. Creen que es el bebé más lindo, el más inteligente y el más maravilloso del mundo.',
      },
    ],
    optionsPool: [],
    explanationEn:
      "Three superlatives with 'the': 'the cutest' (-est), 'the smartest' (-est), and 'the most wonderful' (most + long adjective).",
    explanationEs:
      "Tres superlativos con 'the': 'the cutest' (-est), 'the smartest' (-est) y 'the most wonderful' (most + adjetivo largo).",
  },

  /* Actividad 12 (actividad 12.png, Image 20) */
  {
    id: 'car-act-12',
    number: 12,
    title: 'Actividad 12',
    type: 'dropdown',
    instructions: 'Select the correct answer from the drop-down list.',
    instructionsEs: 'Selecciona la respuesta correcta de la lista desplegable.',
    audioPrompt:
      "Henry Starlight is a better singer than his brother, Mick, but Henry isn't as famous as Mick is.",
    dialogueLines: [
      {
        prefix: 'Henry Starlight is a ',
        prefixEs: 'Henry Starlight es un ',
        slot: {
          id: 'car-act12-s1',
          expectedWord: 'better',
          dropdownOptions: ['good', 'best', 'as good', 'better'],
        },
        middleText: " singer than his brother, Mick, but Henry isn't as famous ",
        middleTextEs: ' cantante que su hermano Mick, pero Henry no es tan famoso ',
        slot2: {
          id: 'car-act12-s2',
          expectedWord: 'as',
          dropdownOptions: ['as', 'than', 'so', 'like'],
        },
        suffix: ' Mick is.',
        suffixEs: ' como lo es Mick.',
        fullEn:
          "Henry Starlight is a better singer than his brother, Mick, but Henry isn't as famous as Mick is.",
        fullEs:
          'Henry Starlight es mejor cantante que su hermano Mick, pero Henry no es tan famoso como lo es Mick.',
      },
    ],
    optionsPool: [],
    explanationEn:
      "Comparative of 'good' before a noun: 'a better singer than'. Equality comparison structure: 'as famous as'.",
    explanationEs:
      "Comparativo de 'good' antes de un sustantivo: 'a better singer than'. Estructura de comparación de igualdad: 'as famous as'.",
  },

  /* Actividad 13 (actividad 13.png, Image 19) */
  {
    id: 'car-act-13',
    number: 13,
    title: 'Actividad 13',
    type: 'dropdown',
    instructions: 'Select the correct answer from the drop-down list.',
    instructionsEs: 'Selecciona la respuesta correcta de la lista desplegable.',
    audioPrompt:
      'How was the concert? It was more exciting than the last one we saw! Mac Sterling is the most fantastic singer in the world!',
    dialogueLines: [
      {
        prefix: '- How was the concert?',
        prefixEs: '- ¿Cómo estuvo el concierto?',
        fullEn: '- How was the concert?',
        fullEs: '- ¿Cómo estuvo el concierto?',
      },
      {
        prefix: '- It was ',
        prefixEs: '- ¡Estuvo ',
        slot: {
          id: 'car-act13-s1',
          expectedWord: 'more exciting',
          dropdownOptions: ['exciting', 'the most exciting', 'more exciting', 'as exciting'],
        },
        middleText: ' than the last one we saw! Mac Sterling is ',
        middleTextEs: ' que el último que vimos! ¡Mac Sterling es el cantante ',
        slot2: {
          id: 'car-act13-s2',
          expectedWord: 'the most fantastic',
          dropdownOptions: [
            'as fantastic',
            'the most fantastic',
            'the fantastic',
            'more fantastic',
          ],
        },
        suffix: ' singer in the world!',
        suffixEs: ' del mundo!',
        fullEn:
          '- It was more exciting than the last one we saw! Mac Sterling is the most fantastic singer in the world!',
        fullEs:
          '- ¡Estuvo más emocionante que el último que vimos! ¡Mac Sterling es el cantante más fantástico del mundo!',
      },
    ],
    optionsPool: [],
    explanationEn:
      "Comparative: 'more exciting than'. Superlative in the world: 'the most fantastic singer in the world'.",
    explanationEs:
      "Comparativo: 'more exciting than'. Superlativo en el mundo: 'the most fantastic singer in the world'.",
  },

  /* Actividad 14 (actividad 14.png, Image 18) */
  {
    id: 'car-act-14',
    number: 14,
    title: 'Actividad 14',
    type: 'dropdown',
    instructions: 'Select the correct answer from the drop-down list.',
    instructionsEs: 'Selecciona la respuesta correcta de la lista desplegable.',
    audioPrompt:
      "Mr. Sawyer is our favorite teacher. He isn't the easiest one, he's nicer than the others. He's the best teacher in the school.",
    dialogueLines: [
      {
        prefix: "Mr. Sawyer is our favorite teacher. He isn't the ",
        prefixEs: 'El Sr. Sawyer es nuestro profesor favorito. No es el más ',
        slot: {
          id: 'car-act14-s1',
          expectedWord: 'easiest',
          dropdownOptions: ['easiest', 'easier', 'so easy', 'too easy'],
        },
        middleText: ", he's ",
        middleTextEs: ', es más ',
        slot2: {
          id: 'car-act14-s2',
          expectedWord: 'nicer',
          dropdownOptions: ['nicer', 'nice', 'as nice', 'nicest'],
        },
        middleText2: " than the others. He's the ",
        middleText2Es: ' que los demás. Es el ',
        slot3: {
          id: 'car-act14-s3',
          expectedWord: 'best',
          dropdownOptions: ['better', 'good', 'best', 'great'],
        },
        suffix: ' teacher in the school.',
        suffixEs: ' profesor de la escuela.',
        fullEn:
          "Mr. Sawyer is our favorite teacher. He isn't the easiest one, he's nicer than the others. He's the best teacher in the school.",
        fullEs:
          'El Sr. Sawyer es nuestro profesor favorito. No es el más fácil, es más simpático que los demás. Es el mejor profesor de la escuela.',
      },
    ],
    optionsPool: [],
    explanationEn:
      "Superlative: 'the easiest one'. Comparative with 'than': 'nicer than the others'. Superlative of 'good': 'the best teacher in the school'.",
    explanationEs:
      "Superlativo: 'the easiest one'. Comparativo con 'than': 'nicer than the others'. Superlativo de 'good': 'the best teacher in the school'.",
  },

  /* Actividad 15 (actividad 15.png, Image 17) */
  {
    id: 'car-act-15',
    number: 15,
    title: 'Actividad 15',
    type: 'dropdown',
    instructions: 'Select the correct answer from the drop-down list.',
    instructionsEs: 'Selecciona la respuesta correcta de la lista desplegable.',
    audioPrompt:
      "How's George doing? He's still in the hospital. The doctor says he isn't as sick as yesterday, but George says he feels worse.",
    dialogueLines: [
      {
        prefix: "- How's George doing?",
        prefixEs: '- ¿Cómo está George?',
        fullEn: "- How's George doing?",
        fullEs: '- ¿Cómo está George?',
      },
      {
        prefix: "- He's still in the hospital. The doctor says he isn't ",
        prefixEs: '- Todavía está en el hospital. El médico dice que no está ',
        slot: {
          id: 'car-act15-s1',
          expectedWord: 'as sick',
          dropdownOptions: ['sicker', 'sickest', 'as sick', 'too sick'],
        },
        middleText: ' as yesterday, but George says he feels ',
        middleTextEs: ' como ayer, pero George dice que se siente ',
        slot2: {
          id: 'car-act15-s2',
          expectedWord: 'worse',
          dropdownOptions: ['worst', 'worse', 'more', 'bad'],
        },
        suffix: '.',
        suffixEs: '.',
        fullEn:
          "- He's still in the hospital. The doctor says he isn't as sick as yesterday, but George says he feels worse.",
        fullEs:
          '- Todavía está en el hospital. El médico dice que no está tan enfermo como ayer, pero George dice que se siente peor.',
      },
    ],
    optionsPool: [],
    explanationEn:
      "Negative equality comparison: 'isn't as sick as yesterday'. Comparative of 'bad/sick': 'feels worse'.",
    explanationEs:
      "Comparación de igualdad negativa: 'isn't as sick as yesterday'. Comparativo irregular de 'bad/sick': 'feels worse'.",
  },

  /* Actividad 16 (actividad 16.png, Image 16) */
  {
    id: 'car-act-16',
    number: 16,
    title: 'Actividad 16',
    type: 'dropdown',
    instructions: 'Select the correct answer from the drop-down list.',
    instructionsEs: 'Selecciona la respuesta correcta de la lista desplegable.',
    audioPrompt:
      "How did you do on the math test, Gina? I got the best score! My friend Liz's score wasn't as good as mine.",
    dialogueLines: [
      {
        prefix: '- How did you do on the math test, Gina?',
        prefixEs: '- ¿Cómo te fue en el examen de matemáticas, Gina?',
        fullEn: '- How did you do on the math test, Gina?',
        fullEs: '- ¿Cómo te fue en el examen de matemáticas, Gina?',
      },
      {
        prefix: '- I got the ',
        prefixEs: '- ¡Obtuve la ',
        slot: {
          id: 'car-act16-s1',
          expectedWord: 'best',
          dropdownOptions: ['best', 'well', 'good', 'better'],
        },
        middleText: "! My friend Liz's score wasn't as ",
        middleTextEs: " puntuación! La puntuación de mi amiga Liz no fue tan ",
        slot2: {
          id: 'car-act16-s2',
          expectedWord: 'good as',
          dropdownOptions: ['better', 'good as', 'good', 'well as'],
        },
        suffix: ' mine.',
        suffixEs: ' la mía.',
        fullEn: "- I got the best score! My friend Liz's score wasn't as good as mine.",
        fullEs: '- ¡Obtuve la mejor puntuación! La puntuación de mi amiga Liz no fue tan buena como la mía.',
      },
    ],
    optionsPool: [],
    explanationEn:
      "Superlative with 'the': 'the best score'. Complete equality structure: 'as good as mine'.",
    explanationEs:
      "Superlativo con 'the': 'the best score'. Estructura completa de igualdad: 'as good as mine'.",
  },

  /* Actividad 17 (actividad 17.png, Image 15) */
  {
    id: 'car-act-17',
    number: 17,
    title: 'Actividad 17',
    type: 'dropdown',
    instructions: 'Select the correct answer from the drop-down list.',
    instructionsEs: 'Selecciona la respuesta correcta de la lista desplegable.',
    audioPrompt:
      'Jay Starbucks is the richest man in the city. He is also the luckiest. He won a lot of money last year.',
    dialogueLines: [
      {
        prefix: 'Jay Starbucks is ',
        prefixEs: 'Jay Starbucks es ',
        slot: {
          id: 'car-act17-s1',
          expectedWord: 'the',
          dropdownOptions: ['a', 'so', 'very', 'the'],
        },
        middleText: ' richest man in the city. He is also the ',
        middleTextEs: ' hombre más rico de la ciudad. También es el más ',
        slot2: {
          id: 'car-act17-s2',
          expectedWord: 'luckiest',
          dropdownOptions: ['too lucky', 'luckiest', 'luckier', 'lucky'],
        },
        suffix: '. He won a lot of money last year.',
        suffixEs: '. Ganó mucho dinero el año pasado.',
        fullEn:
          'Jay Starbucks is the richest man in the city. He is also the luckiest. He won a lot of money last year.',
        fullEs:
          'Jay Starbucks es el hombre más rico de la ciudad. También es el más afortunado. Ganó mucho dinero el año pasado.',
      },
    ],
    optionsPool: [],
    explanationEn:
      "Superlative takes the definite article: 'the richest man'. 'lucky' changes 'y' to 'i' in the superlative: 'the luckiest'.",
    explanationEs:
      "El superlativo requiere el artículo definido: 'the richest man'. 'lucky' cambia 'y' por 'i' en el superlativo: 'the luckiest'.",
  },

  /* Actividad 18 (actividad 18.png, Image 14) */
  {
    id: 'car-act-18',
    number: 18,
    title: 'Actividad 18',
    type: 'dropdown',
    instructions: 'Select the correct answer from the drop-down list.',
    instructionsEs: 'Selecciona la respuesta correcta de la lista desplegable.',
    audioPrompt:
      "Sean hates to clean his room. It's always dirtier than his brother Nick's. Nick is also more careful with his clothes than Sean.",
    dialogueLines: [
      {
        prefix: "Sean hates to clean his room. It's always ",
        prefixEs: 'Sean odia limpiar su habitación. Siempre está ',
        slot: {
          id: 'car-act18-s1',
          expectedWord: 'dirtier than',
          dropdownOptions: ['as dirty', 'very dirty', 'dirtier than', 'the dirtiest'],
        },
        middleText: " his brother Nick's. Nick is also ",
        middleTextEs: ' la de su hermano Nick. Nick también es ',
        slot2: {
          id: 'car-act18-s2',
          expectedWord: 'more',
          dropdownOptions: ['the most', 'so', 'more', 'very'],
        },
        suffix: ' careful with his clothes than Sean.',
        suffixEs: ' cuidadoso con su ropa que Sean.',
        fullEn:
          "Sean hates to clean his room. It's always dirtier than his brother Nick's. Nick is also more careful with his clothes than Sean.",
        fullEs:
          'Sean odia limpiar su habitación. Siempre está más sucia que la de su hermano Nick. Nick también es más cuidadoso con su ropa que Sean.',
      },
    ],
    optionsPool: [],
    explanationEn:
      "'dirtier than' compares the messiness of two rooms. 'careful' is a two-syllable adjective ending in -ful, so it takes 'more': 'more careful with his clothes than Sean'.",
    explanationEs:
      "'dirtier than' compara dos habitaciones. 'careful' es un adjetivo de dos sílabas terminado en -ful, por lo que lleva 'more': 'more careful with his clothes than Sean'.",
  },

  /* Actividad 19 (actividad 19.png, Image 13) */
  {
    id: 'car-act-19',
    number: 19,
    title: 'Actividad 19',
    type: 'drag-drop',
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    audioPrompt:
      "Why don't you drive to work? The traffic around here is terrible. The worst time is in the morning. Well, it isn't as bad in the afternoon.",
    dialogueLines: [
      {
        prefix: "- Why don't you drive to work?",
        prefixEs: '- ¿Por qué no vas en auto al trabajo?',
        fullEn: "- Why don't you drive to work?",
        fullEs: '- ¿Por qué no vas en auto al trabajo?',
      },
      {
        prefix: '- The traffic around here is terrible. The ',
        prefixEs: '- El tráfico por aquí es terrible. El ',
        slot: {
          id: 'car-act19-s1',
          expectedWord: 'worst',
        },
        suffix: ' time is in the morning.',
        suffixEs: ' momento es en la mañana.',
        fullEn: '- The traffic around here is terrible. The worst time is in the morning.',
        fullEs: '- El tráfico por aquí es terrible. El peor momento es en la mañana.',
      },
      {
        prefix: "- Well, it isn't ",
        prefixEs: '- Bueno, no es ',
        slot: {
          id: 'car-act19-s2',
          expectedWord: 'as bad',
        },
        suffix: ' in the afternoon.',
        suffixEs: ' por la tarde.',
        fullEn: "- Well, it isn't as bad in the afternoon.",
        fullEs: '- Bueno, no es tan malo por la tarde.',
      },
    ],
    optionsPool: ['as bad', 'worse', 'worst', 'much'],
    explanationEn:
      "Superlative with 'the': 'The worst time'. Equality with negative: 'it isn't as bad in the afternoon'.",
    explanationEs:
      "Superlativo con 'the': 'The worst time'. Comparación de igualdad negativa: 'it isn't as bad in the afternoon'.",
  },

  /* Actividad 20 (actividad 20.png, Image 12) */
  {
    id: 'car-act-20',
    number: 20,
    title: 'Actividad 20',
    type: 'dropdown',
    instructions: 'Select the correct answer from the drop-down list.',
    instructionsEs: 'Selecciona la respuesta correcta de la lista desplegable.',
    audioPrompt:
      'Tom is always hungrier in the evening than at lunch time. His sister is never as hungry as he is.',
    dialogueLines: [
      {
        prefix: 'Tom is always ',
        prefixEs: 'Tom siempre tiene ',
        slot: {
          id: 'car-act20-s1',
          expectedWord: 'hungrier',
          dropdownOptions: ['hungry', 'hungrier', 'the hungriest', 'very hungry'],
        },
        middleText: ' in the evening than at lunch time. His sister is never ',
        middleTextEs: ' hambre por la noche que al mediodía. Su hermana nunca tiene ',
        slot2: {
          id: 'car-act20-s2',
          expectedWord: 'as hungry',
          dropdownOptions: ['hungry', 'the hungriest', 'hungrier', 'as hungry'],
        },
        suffix: ' as he is.',
        suffixEs: ' hambre como él.',
        fullEn:
          'Tom is always hungrier in the evening than at lunch time. His sister is never as hungry as he is.',
        fullEs:
          'Tom siempre tiene más hambre por la noche que al mediodía. Su hermana nunca tiene tanta hambre como él.',
      },
    ],
    optionsPool: [],
    explanationEn:
      "Comparative with 'than': 'hungrier in the evening than...'. Equality comparison with 'as... as': 'as hungry as he is'.",
    explanationEs:
      "Comparativo con 'than': 'hungrier in the evening than...'. Comparación de igualdad con 'as... as': 'as hungry as he is'.",
  },

  /* Actividad 21 (actividad 21.png, Image 11) */
  {
    id: 'car-act-21',
    number: 21,
    title: 'Actividad 21',
    type: 'dropdown',
    instructions: 'Select the correct answer from the drop-down list.',
    instructionsEs: 'Selecciona la respuesta correcta de la lista desplegable.',
    audioPrompt:
      'Here are two pairs of shoes. Which pair do you like better? The black pair is prettier than the white pair.',
    dialogueLines: [
      {
        prefix: '- Here are two pairs of shoes. Which pair do you like ',
        prefixEs: '- Aquí hay dos pares de zapatos. ¿Cuál par te gusta ',
        slot: {
          id: 'car-act21-s1',
          expectedWord: 'better',
          dropdownOptions: ['good', 'better', 'the best', 'as well'],
        },
        suffix: '?',
        suffixEs: '?',
        fullEn: '- Here are two pairs of shoes. Which pair do you like better?',
        fullEs: '- Aquí hay dos pares de zapatos. ¿Cuál par te gusta más?',
      },
      {
        prefix: '- The black pair is ',
        prefixEs: '- El par negro es ',
        slot: {
          id: 'car-act21-s2',
          expectedWord: 'prettier',
          dropdownOptions: ['prettier', 'as pretty', 'pretty', 'the prettiest'],
        },
        suffix: ' than the white pair.',
        suffixEs: ' que el par blanco.',
        fullEn: '- The black pair is prettier than the white pair.',
        fullEs: '- El par negro es más bonito que el par blanco.',
      },
    ],
    optionsPool: [],
    explanationEn:
      "When comparing two items, use comparative 'better': 'Which pair do you like better?'. 'pretty' changes 'y' to 'ier': 'prettier than'.",
    explanationEs:
      "Al comparar dos elementos, usa el comparativo 'better': 'Which pair do you like better?'. 'pretty' cambia 'y' por 'ier': 'prettier than'.",
  },
];

// ---------------------------------------------------------------------------
// 10 TEST QUESTIONS (Test 1 to Test 10)
// Exact order requested by user: test 1 to test 10
// ---------------------------------------------------------------------------
export const COMPARISON_REVIEW_TESTS: ComparisonTestItem[] = [
  /* Test 1 (test 1.png, Image 10) */
  {
    id: 'car-test-1',
    number: 1,
    type: 'drag-drop',
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    audioPrompt: "McDougal's restaurant is cheaper than Harvey's.",
    dialogueLines: [
      {
        prefix: "McDougal's restaurant is ",
        prefixEs: "El restaurante McDougal's es ",
        slot: {
          id: 'car-t1-s1',
          expectedWord: 'cheaper than',
        },
        suffix: " Harvey's.",
        suffixEs: " que el de Harvey.",
        fullEn: "McDougal's restaurant is cheaper than Harvey's.",
        fullEs: "El restaurante McDougal's es más barato que el de Harvey.",
      },
    ],
    optionsPool: ['cheaper', 'cheap like', 'cheaper than', 'cheap as'],
    explanationEn: "Comparative of 'cheap': 'cheaper than'.",
    explanationEs: "Comparativo de 'cheap': 'cheaper than'.",
  },

  /* Test 2 (test 2.png, Image 9) */
  {
    id: 'car-test-2',
    number: 2,
    type: 'dropdown',
    instructions: 'Select the correct answer from the drop-down list.',
    instructionsEs: 'Selecciona la respuesta correcta de la lista desplegable.',
    audioPrompt: 'Eric is the smartest student in class, but Joe is a better athlete.',
    dialogueLines: [
      {
        prefix: 'Eric is the ',
        prefixEs: 'Eric es el estudiante más ',
        slot: {
          id: 'car-t2-s1',
          expectedWord: 'smartest',
          dropdownOptions: ['as smart as', 'smarter', 'smartest', 'very smart'],
        },
        middleText: ' student in class, but Joe is a ',
        middleTextEs: ' de la clase, pero Joe es un ',
        slot2: {
          id: 'car-t2-s2',
          expectedWord: 'better',
          dropdownOptions: ['better than', 'better', 'best', 'good as'],
        },
        suffix: ' athlete.',
        suffixEs: ' atleta.',
        fullEn: 'Eric is the smartest student in class, but Joe is a better athlete.',
        fullEs: 'Eric es el estudiante más inteligente de la clase, pero Joe es mejor atleta.',
      },
    ],
    optionsPool: [],
    explanationEn:
      "Superlative with 'the': 'the smartest student'. Comparative before noun comparing to Eric: 'a better athlete'.",
    explanationEs:
      "Superlativo con 'the': 'the smartest student'. Comparativo antes del sustantivo: 'a better athlete'.",
  },

  /* Test 3 (test 3.png, Image 8) */
  {
    id: 'car-test-3',
    number: 3,
    type: 'dropdown',
    instructions: 'Select the correct answer from the drop-down list.',
    instructionsEs: 'Selecciona la respuesta correcta de la lista desplegable.',
    audioPrompt:
      "The weather in November isn't as bad as in January. January is the worst month of the year.",
    dialogueLines: [
      {
        prefix: "The weather in November isn't as ",
        prefixEs: 'El clima en noviembre no es tan ',
        slot: {
          id: 'car-t3-s1',
          expectedWord: 'bad',
          dropdownOptions: ['too bad', 'worse', 'bad', 'worst'],
        },
        middleText: ' as in January. January is ',
        middleTextEs: ' como en enero. Enero es el ',
        slot2: {
          id: 'car-t3-s2',
          expectedWord: 'the worst',
          dropdownOptions: ['the worst', 'very bad', 'the worse', 'the bad'],
        },
        suffix: ' month of the year.',
        suffixEs: ' mes del año.',
        fullEn:
          "The weather in November isn't as bad as in January. January is the worst month of the year.",
        fullEs:
          'El clima en noviembre no es tan malo como en enero. Enero es el peor mes del año.',
      },
    ],
    optionsPool: [],
    explanationEn:
      "Equality comparison 'as + base adjective + as': 'as bad as'. Superlative of 'bad': 'the worst month of the year'.",
    explanationEs:
      "Comparación de igualdad 'as + adjetivo base + as': 'as bad as'. Superlativo irregular de 'bad': 'the worst month of the year'.",
  },

  /* Test 4 (test 4.png, Image 7) */
  {
    id: 'car-test-4',
    number: 4,
    type: 'dropdown',
    instructions: 'Select the correct answer from the drop-down list.',
    instructionsEs: 'Selecciona la respuesta correcta de la lista desplegable.',
    audioPrompt:
      'Is Canada larger than the U.S.? Yes. It\'s one of the biggest countries in the world.',
    dialogueLines: [
      {
        prefix: '- Is Canada ',
        prefixEs: '- ¿Es Canadá más ',
        slot: {
          id: 'car-t4-s1',
          expectedWord: 'larger',
          dropdownOptions: ['large', 'larger', 'largest', 'too large'],
        },
        suffix: ' than the U.S.?',
        suffixEs: ' que EE. UU.?',
        fullEn: '- Is Canada larger than the U.S.?',
        fullEs: '- ¿Es Canadá más grande que EE. UU.?',
      },
      {
        prefix: "- Yes. It's one of ",
        prefixEs: '- Sí. Es uno de ',
        slot: {
          id: 'car-t4-s2',
          expectedWord: 'the',
          dropdownOptions: ['a', 'very', 'the', 'too'],
        },
        suffix: ' biggest countries in the world.',
        suffixEs: ' países más grandes del mundo.',
        fullEn: "- Yes. It's one of the biggest countries in the world.",
        fullEs: '- Sí. Es uno de los países más grandes del mundo.',
      },
    ],
    optionsPool: [],
    explanationEn:
      "Comparative with 'than': 'larger than'. Superlative expression: 'one of the biggest countries in the world'.",
    explanationEs:
      "Comparativo con 'than': 'larger than'. Expresión superlativa: 'one of the biggest countries in the world'.",
  },

  /* Test 5 (test 5.png, Image 6) */
  {
    id: 'car-test-5',
    number: 5,
    type: 'dropdown',
    instructions: 'Select the correct answer from the drop-down list.',
    instructionsEs: 'Selecciona la respuesta correcta de la lista desplegable.',
    audioPrompt:
      "I live near the stadium. It is usually quieter there during the day than at night, except for Sundays. On Sunday afternoons, it's the loudest and most crowded place in town.",
    dialogueLines: [
      {
        prefix: 'I live near the stadium. It is usually ',
        prefixEs: 'Vivo cerca del estadio. Por lo general es más ',
        slot: {
          id: 'car-t5-s1',
          expectedWord: 'quieter',
          dropdownOptions: ['quietest', 'quiet', 'too quiet', 'quieter'],
        },
        middleText: " there during the day than at night, except for Sundays. On Sunday afternoons, it's ",
        middleTextEs: ' allí durante el día que por la noche, excepto los domingos. Los domingos por la tarde, es el lugar más ',
        slot2: {
          id: 'car-t5-s2',
          expectedWord: 'the loudest',
          dropdownOptions: ['the loudest', 'the louder', 'loud', 'as loud'],
        },
        middleText2: ' and ',
        middleText2Es: ' y más ',
        slot3: {
          id: 'car-t5-s3',
          expectedWord: 'most crowded',
          dropdownOptions: ['most crowded', 'more crowded', 'crowded', 'as crowded'],
        },
        suffix: ' place in town.',
        suffixEs: ' de la ciudad.',
        fullEn:
          "I live near the stadium. It is usually quieter there during the day than at night, except for Sundays. On Sunday afternoons, it's the loudest and most crowded place in town.",
        fullEs:
          'Vivo cerca del estadio. Por lo general es más tranquilo allí durante el día que por la noche, excepto los domingos. Los domingos por la tarde, es el lugar más ruidoso y más concurrido de la ciudad.',
      },
    ],
    optionsPool: [],
    explanationEn:
      "Comparative: 'quieter there... than at night'. Superlatives for the town: 'the loudest and most crowded place in town'.",
    explanationEs:
      "Comparativo: 'quieter there... than at night'. Superlativos para la ciudad: 'the loudest and most crowded place in town'.",
  },

  /* Test 6 (test 6.png, Image 5) */
  {
    id: 'car-test-6',
    number: 6,
    type: 'dropdown',
    instructions: 'Select the correct answer from the drop-down list.',
    instructionsEs: 'Selecciona la respuesta correcta de la lista desplegable.',
    audioPrompt:
      "How's Carlos doing in his new job? He's the best worker in the office. He works the longest hours and always helps out.",
    dialogueLines: [
      {
        prefix: "- How's Carlos doing in his new job?",
        prefixEs: '- ¿Cómo le va a Carlos en su nuevo trabajo?',
        fullEn: "- How's Carlos doing in his new job?",
        fullEs: '- ¿Cómo le va a Carlos en su nuevo trabajo?',
      },
      {
        prefix: "- He's ",
        prefixEs: '- Es el ',
        slot: {
          id: 'car-t6-s1',
          expectedWord: 'the best',
          dropdownOptions: ['good', 'too good', 'better', 'the best'],
        },
        middleText: ' worker in the office. He works the ',
        middleTextEs: ' trabajador de la oficina. Trabaja las horas más ',
        slot2: {
          id: 'car-t6-s2',
          expectedWord: 'longest',
          dropdownOptions: ['long as', 'very long', 'longest', 'longer'],
        },
        suffix: ' hours and always helps out.',
        suffixEs: ' y siempre ayuda.',
        fullEn:
          "- He's the best worker in the office. He works the longest hours and always helps out.",
        fullEs:
          '- Es el mejor trabajador de la oficina. Trabaja las horas más largas y siempre ayuda.',
      },
    ],
    optionsPool: [],
    explanationEn:
      "Superlative of 'good': 'the best worker'. Superlative of 'long' with 'the': 'the longest hours'.",
    explanationEs:
      "Superlativo de 'good': 'the best worker'. Superlativo de 'long' con 'the': 'the longest hours'.",
  },

  /* Test 7 (test 7.png, Image 4) */
  {
    id: 'car-test-7',
    number: 7,
    type: 'dropdown',
    instructions: 'Select the correct answer from the drop-down list.',
    instructionsEs: 'Selecciona la respuesta correcta de la lista desplegable.',
    audioPrompt:
      "The Golden Dragon has the most delicious Chinese food of any restaurant in town, but it's still not as good as my Auntie Lu's food.",
    dialogueLines: [
      {
        prefix: 'The Golden Dragon has the ',
        prefixEs: 'El Golden Dragon tiene la comida china más ',
        slot: {
          id: 'car-t7-s1',
          expectedWord: 'most',
          dropdownOptions: ['more', 'best', 'most', 'very'],
        },
        middleText: " delicious Chinese food of any restaurant in town, but it's still not ",
        middleTextEs: ' de cualquier restaurante de la ciudad, pero todavía no es tan ',
        slot2: {
          id: 'car-t7-s2',
          expectedWord: 'as good',
          dropdownOptions: ['as good', 'better', 'so good', 'the best'],
        },
        suffix: " as my Auntie Lu's food.",
        suffixEs: ' como la comida de mi tía Lu.',
        fullEn:
          "The Golden Dragon has the most delicious Chinese food of any restaurant in town, but it's still not as good as my Auntie Lu's food.",
        fullEs:
          'El Golden Dragon tiene la comida china más deliciosa de cualquier restaurante de la ciudad, pero todavía no es tan buena como la comida de mi tía Lu.',
      },
    ],
    optionsPool: [],
    explanationEn:
      "Superlative with 'delicious': 'the most delicious'. Equality comparison with negative: 'not as good as'.",
    explanationEs:
      "Superlativo con 'delicious': 'the most delicious'. Comparación de igualdad negativa: 'not as good as'.",
  },

  /* Test 8 (test 8.png, Image 3) */
  {
    id: 'car-test-8',
    number: 8,
    type: 'dropdown',
    instructions: 'Select the correct answer from the drop-down list.',
    instructionsEs: 'Selecciona la respuesta correcta de la lista desplegable.',
    audioPrompt: 'Sit here. This chair is softer and more comfortable than that one.',
    dialogueLines: [
      {
        prefix: 'Sit here. This chair is ',
        prefixEs: 'Siéntate aquí. Esta silla es más ',
        slot: {
          id: 'car-t8-s1',
          expectedWord: 'softer',
          dropdownOptions: ['too soft', 'softest', 'not soft', 'softer'],
        },
        middleText: ' and ',
        middleTextEs: ' y más ',
        slot2: {
          id: 'car-t8-s2',
          expectedWord: 'more',
          dropdownOptions: ['so', 'more', 'as', 'very'],
        },
        suffix: ' comfortable than that one.',
        suffixEs: ' que aquella.',
        fullEn: 'Sit here. This chair is softer and more comfortable than that one.',
        fullEs: 'Siéntate aquí. Esta silla es más suave y más cómoda que aquella.',
      },
    ],
    optionsPool: [],
    explanationEn:
      "Comparing two chairs: 'softer' (-er for short adjective) and 'more comfortable' (more + long adjective) with 'than'.",
    explanationEs:
      "Comparando dos sillas: 'softer' (-er para adjetivo corto) y 'more comfortable' (more + adjetivo largo) con 'than'.",
  },

  /* Test 9 (test 9.png, Image 2) */
  {
    id: 'car-test-9',
    number: 9,
    type: 'dropdown',
    instructions: 'Select the correct answer from the drop-down list.',
    instructionsEs: 'Selecciona la respuesta correcta de la lista desplegable.',
    audioPrompt:
      'Who do you think is the best French painter? No one is better than Cezanne.',
    dialogueLines: [
      {
        prefix: '- Who do you think is ',
        prefixEs: '- ¿Quién crees que es el ',
        slot: {
          id: 'car-t9-s1',
          expectedWord: 'the best',
          dropdownOptions: ['best', 'better', 'as good as', 'the best'],
        },
        suffix: ' French painter?',
        suffixEs: ' pintor francés?',
        fullEn: '- Who do you think is the best French painter?',
        fullEs: '- ¿Quién crees que es el mejor pintor francés?',
      },
      {
        prefix: '- No one is ',
        prefixEs: '- Nadie es ',
        slot: {
          id: 'car-t9-s2',
          expectedWord: 'better',
          dropdownOptions: ['the best', 'better', 'best', 'good'],
        },
        suffix: ' than Cezanne.',
        suffixEs: ' que Cézanne.',
        fullEn: '- No one is better than Cezanne.',
        fullEs: '- Nadie es mejor que Cézanne.',
      },
    ],
    optionsPool: [],
    explanationEn:
      "Superlative: 'the best French painter'. Comparative with 'than': 'better than Cezanne'.",
    explanationEs:
      "Superlativo: 'the best French painter'. Comparativo con 'than': 'better than Cezanne'.",
  },

  /* Test 10 (test 10.png, Image 1) */
  {
    id: 'car-test-10',
    number: 10,
    type: 'dropdown',
    instructions: 'Select the correct answer from the drop-down list.',
    instructionsEs: 'Selecciona la respuesta correcta de la lista desplegable.',
    audioPrompt:
      'I want to stay in Paris as long as I can. My French is getting better every day.',
    dialogueLines: [
      {
        prefix: 'I want to stay in Paris ',
        prefixEs: 'Quiero quedarme en París ',
        slot: {
          id: 'car-t10-s1',
          expectedWord: 'as long as',
          dropdownOptions: ['as long as', 'longer than', 'the longest', 'longest'],
        },
        middleText: ' I can. My French is getting ',
        middleTextEs: ' pueda. Mi francés está ',
        slot2: {
          id: 'car-t10-s2',
          expectedWord: 'better',
          dropdownOptions: ['well', 'better', 'good', 'as good as'],
        },
        suffix: ' every day.',
        suffixEs: ' cada día.',
        fullEn: 'I want to stay in Paris as long as I can. My French is getting better every day.',
        fullEs: 'Quiero quedarme en París tanto tiempo como pueda. Mi francés está mejorando cada día.',
      },
    ],
    optionsPool: [],
    explanationEn:
      "Duration idiom: 'as long as I can'. Progressive change with 'getting': 'getting better every day'.",
    explanationEs:
      "Expresión idiomática de duración: 'as long as I can'. Cambio progresivo con 'getting': 'getting better every day'.",
  },
];
