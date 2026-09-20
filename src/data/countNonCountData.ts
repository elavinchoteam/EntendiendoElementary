import kitchenCakeImg from '../assets/images/kitchen_cake_susan_1789934263277.jpg';

export { kitchenCakeImg };

export interface CountNonCountDialogueLine {
  speaker: string;
  textEn: string;
  textEs: string;
  hasHighlight?: boolean;
}

export interface DragDropOption {
  id: string;
  text: string;
  textEs: string;
  isCorrect: boolean;
}

export interface CountNonCountExerciseItem {
  id: string;
  number: number;
  type: 'explore' | 'cloze' | 'test';
  title: string;
  titleEs: string;
  instructions: string;
  instructionsEs: string;
  dialogueLines: {
    speaker?: string;
    textEn: string;
    textEs: string;
    hasBlank?: boolean;
    prefix?: string;
    suffix?: string;
  }[];
  options?: DragDropOption[];
  correctAnswerId?: string;
  explanationEn?: string;
  explanationEs?: string;
}

export const COUNT_NON_COUNT_REFERENCE = {
  dialogue: [
    {
      speaker: 'Mother',
      textEn: "- We can't make the cake, Susan. There is some sugar and flour but there aren't any eggs.",
      textEs: '- No podemos hacer el pastel, Susan. Hay algo de azúcar y harina, pero no hay ningún huevo.',
    },
    {
      speaker: 'Susan',
      textEn: '- Aww...',
      textEs: '- Ohh...',
    },
  ],
  audioText: "We can't make the cake, Susan. There is some sugar and flour but there aren't any eggs. Aww...",
  highlights: ['some', 'any'],
  durationSeconds: 7,
};

export const COUNT_NON_COUNT_ACTIVITIES: CountNonCountExerciseItem[] = [
  /* Actividad 1: Video Explore & Dialogue */
  {
    id: 'activity-1',
    number: 1,
    type: 'explore',
    title: 'Actividad 1',
    titleEs: 'Actividad 1: Diálogo y Video',
    instructions: 'Listen and explore the conversation.',
    instructionsEs: 'Escucha y explora la conversación.',
    dialogueLines: [
      {
        speaker: 'Mother',
        textEn: "- We can't make the cake, Susan. There is some sugar and flour but there aren't any eggs.",
        textEs: '- No podemos hacer el pastel, Susan. Hay algo de azúcar y harina, pero no hay ningún huevo.',
      },
      {
        speaker: 'Susan',
        textEn: '- Aww...',
        textEs: '- Ohh...',
      },
    ],
  },

  /* Actividad 2 (actividad 2.png) */
  {
    id: 'activity-2',
    number: 2,
    type: 'cloze',
    title: 'Actividad 2',
    titleEs: 'Actividad 2',
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    dialogueLines: [
      {
        textEn: "- I'm very thirsty.",
        textEs: '- Tengo mucha sed.',
      },
      {
        textEn: '- What would you like?',
        textEs: '- ¿Qué te gustaría?',
      },
      {
        textEn: '- Just a glass of ________ , please.',
        textEs: '- Solo un vaso de agua, por favor.',
        hasBlank: true,
        prefix: '- Just a glass of ',
        suffix: ' , please.',
      },
    ],
    options: [
      { id: 'act2-opt-1', text: 'one water', textEs: 'un agua', isCorrect: false },
      { id: 'act2-opt-2', text: 'a water', textEs: 'un agua', isCorrect: false },
      { id: 'act2-opt-3', text: 'water', textEs: 'agua', isCorrect: true },
    ],
    correctAnswerId: 'act2-opt-3',
    explanationEn: "'Water' is an uncountable noun. We say 'a glass of water' without using 'a' or 'one' directly before 'water'.",
    explanationEs: "'Water' (agua) es un sustantivo incontable. Decimos 'a glass of water' sin usar 'a' ni 'one' directamente antes de 'water'.",
  },

  /* Actividad 3 (actividad 3.png) */
  {
    id: 'activity-3',
    number: 3,
    type: 'cloze',
    title: 'Actividad 3',
    titleEs: 'Actividad 3',
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    dialogueLines: [
      {
        textEn: '________ at the party was delicious!',
        textEs: '¡La comida en la fiesta estuvo deliciosa!',
        hasBlank: true,
        prefix: '',
        suffix: ' at the party was delicious!',
      },
    ],
    options: [
      { id: 'act3-opt-1', text: 'Food', textEs: 'Comida', isCorrect: false },
      { id: 'act3-opt-2', text: 'A food', textEs: 'Una comida', isCorrect: false },
      { id: 'act3-opt-3', text: 'The food', textEs: 'La comida', isCorrect: true },
    ],
    correctAnswerId: 'act3-opt-3',
    explanationEn: "We use 'The food' because we are referring to the specific food served at that party.",
    explanationEs: "Usamos 'The food' porque nos referimos a la comida específica que se sirvió en esa fiesta.",
  },

  /* Actividad 4 (actividad 4.png) */
  {
    id: 'activity-4',
    number: 4,
    type: 'cloze',
    title: 'Actividad 4',
    titleEs: 'Actividad 4',
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    dialogueLines: [
      {
        textEn: "We're buying ________ for our new house. All we have now is a sofa.",
        textEs: 'Estamos comprando muebles para nuestra nueva casa. Todo lo que tenemos ahora es un sofá.',
        hasBlank: true,
        prefix: "We're buying ",
        suffix: ' for our new house. All we have now is a sofa.',
      },
    ],
    options: [
      { id: 'act4-opt-1', text: 'furniture', textEs: 'muebles', isCorrect: true },
      { id: 'act4-opt-2', text: 'any furniture', textEs: 'ningún mueble', isCorrect: false },
      { id: 'act4-opt-3', text: 'a furniture', textEs: 'un mueble', isCorrect: false },
    ],
    correctAnswerId: 'act4-opt-1',
    explanationEn: "'Furniture' is an uncountable noun in English; it cannot be preceded by 'a' and is not used with 'any' in affirmative statements.",
    explanationEs: "'Furniture' es un sustantivo incontable en inglés; no se usa con 'a' ni con 'any' en oraciones afirmativas.",
  },

  /* Actividad 5 (actividad 5.png) */
  {
    id: 'activity-5',
    number: 5,
    type: 'cloze',
    title: 'Actividad 5',
    titleEs: 'Actividad 5',
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    dialogueLines: [
      {
        textEn: '- Would you like some coffee?',
        textEs: '- ¿Te gustaría un café?',
      },
      {
        textEn: '- Yes, thank you.',
        textEs: '- Sí, gracias.',
      },
      {
        textEn: '- Do you want any ________ in it?',
        textEs: '- ¿Quieres azúcar en él?',
        hasBlank: true,
        prefix: '- Do you want any ',
        suffix: ' in it?',
      },
      {
        textEn: '- No, thank you.',
        textEs: '- No, gracias.',
      },
    ],
    options: [
      { id: 'act5-opt-1', text: 'the sugar', textEs: 'el azúcar', isCorrect: false },
      { id: 'act5-opt-2', text: 'sugar', textEs: 'azúcar', isCorrect: true },
      { id: 'act5-opt-3', text: 'a sugar', textEs: 'un azúcar', isCorrect: false },
    ],
    correctAnswerId: 'act5-opt-2',
    explanationEn: "'Sugar' is an uncountable noun. Following 'any', we use the simple non-count form 'sugar'.",
    explanationEs: "'Sugar' es incontable. Después de 'any', se usa la forma simple 'sugar'.",
  },

  /* Actividad 6 (actividad 6.png) */
  {
    id: 'activity-6',
    number: 6,
    type: 'cloze',
    title: 'Actividad 6',
    titleEs: 'Actividad 6',
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    dialogueLines: [
      {
        textEn: 'I love ________ , but the music at the party was too loud.',
        textEs: 'Me encanta la música, pero la música en la fiesta estaba demasiado alta.',
        hasBlank: true,
        prefix: 'I love ',
        suffix: ' , but the music at the party was too loud.',
      },
    ],
    options: [
      { id: 'act6-opt-1', text: 'any music', textEs: 'cualquier música', isCorrect: false },
      { id: 'act6-opt-2', text: 'music', textEs: 'música', isCorrect: true },
      { id: 'act6-opt-3', text: 'a music', textEs: 'una música', isCorrect: false },
    ],
    correctAnswerId: 'act6-opt-2',
    explanationEn: "When speaking about music in general, 'music' is an uncountable noun used without articles.",
    explanationEs: "Al hablar de la música en general, 'music' es un sustantivo incontable y se usa sin artículos.",
  },

  /* Actividad 7 (actividad 7.png) */
  {
    id: 'activity-7',
    number: 7,
    type: 'cloze',
    title: 'Actividad 7',
    titleEs: 'Actividad 7',
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    dialogueLines: [
      {
        textEn: 'John lives in the country. He has ________ and grows lots of vegetables.',
        textEs: 'John vive en el campo. Tiene un jardín y cultiva muchas verduras.',
        hasBlank: true,
        prefix: 'John lives in the country. He has ',
        suffix: ' and grows lots of vegetables.',
      },
    ],
    options: [
      { id: 'act7-opt-1', text: 'garden', textEs: 'jardín', isCorrect: false },
      { id: 'act7-opt-2', text: 'some garden', textEs: 'algo de jardín', isCorrect: false },
      { id: 'act7-opt-3', text: 'a garden', textEs: 'un jardín', isCorrect: true },
    ],
    correctAnswerId: 'act7-opt-3',
    explanationEn: "'Garden' is a singular countable noun, so it requires the indefinite article 'a' ('a garden').",
    explanationEs: "'Garden' es un sustantivo contable en singular, por lo que requiere el artículo 'a' ('a garden').",
  },

  /* Actividad 8 (actividad 8.png) */
  {
    id: 'activity-8',
    number: 8,
    type: 'cloze',
    title: 'Actividad 8',
    titleEs: 'Actividad 8',
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    dialogueLines: [
      {
        textEn: "In Barbara's class there is ________ .",
        textEs: 'En la clase de Barbara hay una persona de China.',
        hasBlank: true,
        prefix: "In Barbara's class there is ",
        suffix: ' .',
      },
    ],
    options: [
      { id: 'act8-opt-1', text: 'person from China', textEs: 'persona de China', isCorrect: false },
      { id: 'act8-opt-2', text: 'one person from China', textEs: 'una persona de China', isCorrect: true },
      { id: 'act8-opt-3', text: 'the person from China', textEs: 'la persona de China', isCorrect: false },
    ],
    correctAnswerId: 'act8-opt-2',
    explanationEn: "We use 'one person from China' to specify the quantity of one individual in the class.",
    explanationEs: "Usamos 'one person from China' para especificar la cantidad de un individuo en la clase.",
  },

  /* Actividad 9 (actividad 9.png) */
  {
    id: 'activity-9',
    number: 9,
    type: 'cloze',
    title: 'Actividad 9',
    titleEs: 'Actividad 9',
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    dialogueLines: [
      {
        textEn: 'I bought ________ . Do you want to read it?',
        textEs: 'Compré un periódico. ¿Quieres leerlo?',
        hasBlank: true,
        prefix: 'I bought ',
        suffix: ' . Do you want to read it?',
      },
    ],
    options: [
      { id: 'act9-opt-1', text: 'newspapers', textEs: 'periódicos', isCorrect: false },
      { id: 'act9-opt-2', text: 'newspaper', textEs: 'periódico', isCorrect: false },
      { id: 'act9-opt-3', text: 'a newspaper', textEs: 'un periódico', isCorrect: true },
    ],
    correctAnswerId: 'act9-opt-3',
    explanationEn: "'Newspaper' is countable, and 'it' in the second sentence tells us that one single newspaper was bought.",
    explanationEs: "'Newspaper' es contable, y el pronombre 'it' indica que se compró un solo periódico ('a newspaper').",
  },

  /* Actividad 10 (actividad 10.png) */
  {
    id: 'activity-10',
    number: 10,
    type: 'cloze',
    title: 'Actividad 10',
    titleEs: 'Actividad 10',
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    dialogueLines: [
      {
        textEn: '- Why are you buying some ________ ?',
        textEs: '- ¿Por qué estás comprando manzanas?',
        hasBlank: true,
        prefix: '- Why are you buying some ',
        suffix: ' ?',
      },
      {
        textEn: '- I want to bake a pie.',
        textEs: '- Quiero hornear un pastel.',
      },
    ],
    options: [
      { id: 'act10-opt-1', text: 'an apple', textEs: 'una manzana', isCorrect: false },
      { id: 'act10-opt-2', text: 'apples', textEs: 'manzanas', isCorrect: true },
      { id: 'act10-opt-3', text: 'apple', textEs: 'manzana', isCorrect: false },
    ],
    correctAnswerId: 'act10-opt-2',
    explanationEn: "After 'some', countable nouns must be in their plural form: 'some apples'.",
    explanationEs: "Después de 'some', los sustantivos contables deben estar en forma plural: 'some apples'.",
  },

  /* Actividad 11 (actividad 11.png) */
  {
    id: 'activity-11',
    number: 11,
    type: 'cloze',
    title: 'Actividad 11',
    titleEs: 'Actividad 11',
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    dialogueLines: [
      {
        textEn: "Edith's living room is very small. It has two ________ and a table.",
        textEs: 'La sala de estar de Edith es muy pequeña. Tiene dos sillas y una mesa.',
        hasBlank: true,
        prefix: "Edith's living room is very small. It has two ",
        suffix: ' and a table.',
      },
    ],
    options: [
      { id: 'act11-opt-1', text: 'chairs', textEs: 'sillas', isCorrect: true },
      { id: 'act11-opt-2', text: 'chair', textEs: 'silla', isCorrect: false },
      { id: 'act11-opt-3', text: 'the chair', textEs: 'la silla', isCorrect: false },
    ],
    correctAnswerId: 'act11-opt-1',
    explanationEn: "After the number 'two', countable nouns take the plural form 'chairs'.",
    explanationEs: "Después del número 'two' (dos), los sustantivos contables van en plural: 'chairs'.",
  },
];

/* Actividad 12: Test con 5 preguntas (test 1 a 5) */
export interface CountNonCountTestItem {
  id: string;
  testNumber: number;
  instructions: string;
  instructionsEs: string;
  dialogueLines: {
    speaker?: string;
    textEn: string;
    textEs: string;
    hasBlank?: boolean;
    prefix?: string;
    suffix?: string;
  }[];
  options: DragDropOption[];
  correctAnswerId: string;
  explanationEn: string;
  explanationEs: string;
}

export const COUNT_NON_COUNT_TESTS: CountNonCountTestItem[] = [
  /* Test 1 (test 1.png) */
  {
    id: 'test-1',
    testNumber: 1,
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    dialogueLines: [
      {
        textEn: "Tom's team didn't win the game, but they had ________ playing.",
        textEs: 'El equipo de Tom no ganó el partido, pero se divirtieron jugando.',
        hasBlank: true,
        prefix: "Tom's team didn't win the game, but they had ",
        suffix: ' playing.',
      },
    ],
    options: [
      { id: 't1-opt-1', text: 'fun', textEs: 'diversión', isCorrect: true },
      { id: 't1-opt-2', text: 'the fun', textEs: 'la diversión', isCorrect: false },
      { id: 't1-opt-3', text: 'a fun', textEs: 'una diversión', isCorrect: false },
    ],
    correctAnswerId: 't1-opt-1',
    explanationEn: "'Fun' is an uncountable noun. The standard expression is 'have fun' without an article.",
    explanationEs: "'Fun' es un sustantivo incontable. La expresión común es 'have fun' (divertirse) sin artículo.",
  },

  /* Test 2 (test 2.png) */
  {
    id: 'test-2',
    testNumber: 2,
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    dialogueLines: [
      {
        textEn: "Sally doesn't like her office. ________ is bad, so it's always too dark.",
        textEs: 'A Sally no le gusta su oficina. La luz es mala, así que siempre está demasiado oscuro.',
        hasBlank: true,
        prefix: "Sally doesn't like her office. ",
        suffix: " is bad, so it's always too dark.",
      },
    ],
    options: [
      { id: 't2-opt-1', text: 'A light', textEs: 'Una luz', isCorrect: false },
      { id: 't2-opt-2', text: 'Some light', textEs: 'Algo de luz', isCorrect: false },
      { id: 't2-opt-3', text: 'The light', textEs: 'La luz', isCorrect: true },
    ],
    correctAnswerId: 't2-opt-3',
    explanationEn: "We say 'The light' to refer to the specific lighting in her office.",
    explanationEs: "Decimos 'The light' para referirnos a la iluminación específica de su oficina.",
  },

  /* Test 3 (test 3.png) */
  {
    id: 'test-3',
    testNumber: 3,
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    dialogueLines: [
      {
        textEn: '- Am I healthy, Doctor?',
        textEs: '- ¿Estoy sano, Doctor?',
      },
      {
        textEn: "- You have to lose weight. Get some more ________ . It's the best way.",
        textEs: '- Tiene que bajar de peso. Haga un poco más de ejercicio. Es la mejor manera.',
        hasBlank: true,
        prefix: '- You have to lose weight. Get some more ',
        suffix: " . It's the best way.",
      },
    ],
    options: [
      { id: 't3-opt-1', text: 'exercise', textEs: 'ejercicio', isCorrect: true },
      { id: 't3-opt-2', text: 'an exercise', textEs: 'un ejercicio', isCorrect: false },
      { id: 't3-opt-3', text: 'the exercise', textEs: 'el ejercicio', isCorrect: false },
    ],
    correctAnswerId: 't3-opt-1',
    explanationEn: "'Exercise' when referring to physical activity is uncountable ('some more exercise').",
    explanationEs: "'Exercise' al referirse a la actividad física es incontable ('some more exercise').",
  },

  /* Test 4 (test 4.png) */
  {
    id: 'test-4',
    testNumber: 4,
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    dialogueLines: [
      {
        textEn: '- Do you take anything in your coffee?',
        textEs: '- ¿Le pones algo a tu café?',
      },
      {
        textEn: '- ________ , please.',
        textEs: '- Algo de crema y azúcar, por favor.',
        hasBlank: true,
        prefix: '- ',
        suffix: ' , please.',
      },
    ],
    options: [
      { id: 't4-opt-1', text: 'Some cream and sugar', textEs: 'Algo de crema y azúcar', isCorrect: true },
      { id: 't4-opt-2', text: 'Any cream or sugar', textEs: 'Cualquier crema o azúcar', isCorrect: false },
      { id: 't4-opt-3', text: 'The cream and sugar', textEs: 'La crema y azúcar', isCorrect: false },
      { id: 't4-opt-4', text: 'Many cream and sugar', textEs: 'Muchas crema y azúcar', isCorrect: false },
    ],
    correctAnswerId: 't4-opt-1',
    explanationEn: "In polite affirmative requests and preferences, we use 'Some' with non-count nouns: 'Some cream and sugar'.",
    explanationEs: "En respuestas y peticiones afirmativas de cortesía, usamos 'Some' con sustantivos incontables: 'Some cream and sugar'.",
  },

  /* Test 5 (test 5.png) */
  {
    id: 'test-5',
    testNumber: 5,
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    dialogueLines: [
      {
        textEn: '- Where are you going?',
        textEs: '- ¿Adónde vas?',
      },
      {
        textEn: "- I'm going to the store. I need ________ and eggs.",
        textEs: '- Voy a la tienda. Necesito leche y huevos.',
        hasBlank: true,
        prefix: "- I'm going to the store. I need ",
        suffix: ' and eggs.',
      },
    ],
    options: [
      { id: 't5-opt-1', text: 'a milk', textEs: 'una leche', isCorrect: false },
      { id: 't5-opt-2', text: 'milk', textEs: 'leche', isCorrect: true },
      { id: 't5-opt-3', text: 'any milk', textEs: 'ninguna leche', isCorrect: false },
    ],
    correctAnswerId: 't5-opt-2',
    explanationEn: "'Milk' is an uncountable noun and does not take 'a'. In affirmative statements, we say 'I need milk'.",
    explanationEs: "'Milk' (leche) es incontable y no lleva 'a'. En oraciones afirmativas decimos 'I need milk'.",
  },
];
