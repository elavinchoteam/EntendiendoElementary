export interface DialogueLine {
  id: string;
  speaker: string;
  speakerEs: string;
  text: string;
  translation: string;
  audioText: string;
  canWords?: string[];
}

export interface ContextLine {
  speaker?: string;
  text?: string;
  hasBlank?: boolean;
  beforeBlank?: string;
  afterBlank?: string;
}

export interface ModalsCanActivityItem {
  id: string;
  number: number;
  title: string;
  instruction: string;
  instructionEs: string;
  dialogueLines?: ContextLine[];
  sentenceBefore?: string;
  sentenceAfter?: string;
  chips: string[];
  correctAnswer: string;
  fullSentence: string;
  fullTranslation: string;
  grammarNote: string;
}

export interface ModalsCanTestItem {
  id: string;
  number: number;
  instruction: string;
  instructionEs: string;
  dialogueLines?: ContextLine[];
  sentenceBefore?: string;
  sentenceAfter?: string;
  chips: string[];
  correctAnswer: string;
  fullSentence: string;
  fullTranslation: string;
  grammarNote: string;
}

export const MODALS_CAN_DIALOGUE: DialogueLine[] = [
  {
    id: 'dlg-1',
    speaker: 'Man 1',
    speakerEs: 'Hombre 1',
    text: 'Can you open it?',
    translation: '¿Puedes abrirlo?',
    audioText: 'Can you open it?',
    canWords: ['Can'],
  },
  {
    id: 'dlg-2',
    speaker: 'Man 2',
    speakerEs: 'Hombre 2',
    text: "No, I can't. I can't open it.",
    translation: 'No, no puedo. No puedo abrirlo.',
    audioText: "No, I can't. I can't open it.",
    canWords: ["can't", "can't"],
  },
  {
    id: 'dlg-3',
    speaker: 'Man 1',
    speakerEs: 'Hombre 1',
    text: "Let's ask Butch. He can do it.",
    translation: 'Preguntémosle a Butch. Él puede hacerlo.',
    audioText: "Let's ask Butch. He can do it.",
    canWords: ['can'],
  },
];

export const MODALS_CAN_ACTIVITIES: ModalsCanActivityItem[] = [
  // Actividad 2: see
  {
    id: 'can-act-2',
    number: 2,
    title: 'Actividad 2: see',
    instruction: 'Drag the correct answer/s into place.',
    instructionEs: 'Arrastra o selecciona la respuesta correcta en su lugar.',
    dialogueLines: [
      { text: "Let's check your eyes." },
      { hasBlank: true, beforeBlank: 'I can', afterBlank: ", Doctor, really. I don't need glasses." },
    ],
    chips: ['to see', 'do see', 'see', 'seeing'],
    correctAnswer: 'see',
    fullSentence: "- Let's check your eyes. - I can see, Doctor, really. I don't need glasses.",
    fullTranslation: '— Revisemos tus ojos.\n— Realmente puedo ver, Doctor. No necesito lentes.',
    grammarNote: 'Después del verbo modal "can", siempre se usa el verbo en su forma base infinitiva sin "to" (can see).',
  },
  // Actividad 3: buy
  {
    id: 'can-act-3',
    number: 3,
    title: 'Actividad 3: buy',
    instruction: 'Drag the correct answer/s into place.',
    instructionEs: 'Arrastra o selecciona la respuesta correcta en su lugar.',
    sentenceBefore: "Colette can't",
    sentenceAfter: 'a CD. She only has $5.',
    chips: ['to buy', 'buying', 'buys', 'buy'],
    correctAnswer: 'buy',
    fullSentence: "Colette can't buy a CD. She only has $5.",
    fullTranslation: 'Colette no puede comprar un CD. Ella solo tiene $5.',
    grammarNote: 'La forma negativa "can\'t" va seguida del verbo en forma base (can\'t buy). Nunca se añade -s, -ing ni "to".',
  },
  // Actividad 4: Can
  {
    id: 'can-act-4',
    number: 4,
    title: 'Actividad 4: Can',
    instruction: 'Drag the correct answer/s into place.',
    instructionEs: 'Arrastra o selecciona la respuesta correcta en su lugar.',
    dialogueLines: [
      { hasBlank: true, beforeBlank: '', afterBlank: 'I try this dress on?' },
      { text: 'Yes. The fitting room is right behind you.' },
    ],
    chips: ['Can', "Don't", 'Cannot', 'Does'],
    correctAnswer: 'Can',
    fullSentence: '- Can I try this dress on? - Yes. The fitting room is right behind you.',
    fullTranslation: '— ¿Puedo probarme este vestido?\n— Sí. El probador está justo detrás de ti.',
    grammarNote: '"Can" se coloca al principio de la oración para pedir permiso de manera educada y natural ("Can I try...?").',
  },
  // Actividad 5: can't
  {
    id: 'can-act-5',
    number: 5,
    title: "Actividad 5: can't",
    instruction: 'Drag the correct answer/s into place.',
    instructionEs: 'Arrastra o selecciona la respuesta correcta en su lugar.',
    dialogueLines: [
      { text: 'Is Susan home?' },
      { hasBlank: true, beforeBlank: "Yes, but she's sick. She", afterBlank: 'get out of bed.' },
      { text: "That's too bad. Tell her we said hello." },
    ],
    chips: ["can't", 'can', 'does', "doesn't"],
    correctAnswer: "can't",
    fullSentence: "- Is Susan home? - Yes, but she's sick. She can't get out of bed. - That's too bad. Tell her we said hello.",
    fullTranslation: '— ¿Está Susan en casa?\n— Sí, pero está enferma. No puede levantarse de la cama.\n— Qué lástima. Dile que le mandamos saludos.',
    grammarNote: 'Usamos "can\'t" para expresar incapacidad o imposibilidad física debido a una enfermedad.',
  },
  // Actividad 6: can
  {
    id: 'can-act-6',
    number: 6,
    title: 'Actividad 6: can',
    instruction: 'Drag the correct answer/s into place.',
    instructionEs: 'Arrastra o selecciona la respuesta correcta en su lugar.',
    sentenceBefore: 'Peter is only six, but he',
    sentenceAfter: 'swim better than his big brother.',
    chips: ['can', 'does', 'knows'],
    correctAnswer: 'can',
    fullSentence: 'Peter is only six, but he can swim better than his big brother.',
    fullTranslation: 'Peter solo tiene seis años, pero puede nadar mejor que su hermano mayor.',
    grammarNote: 'Usamos "can" para hablar de habilidades adquiridas o destrezas físicas ("he can swim").',
  },
  // Actividad 7: can
  {
    id: 'can-act-7',
    number: 7,
    title: 'Actividad 7: can',
    instruction: 'Drag the correct answer/s into place.',
    instructionEs: 'Arrastra o selecciona la respuesta correcta en su lugar.',
    dialogueLines: [
      { text: 'I need to see Dr. Wong.' },
      { hasBlank: true, beforeBlank: "She's busy now, but she", afterBlank: 'see you at 3:00 p.m.' },
    ],
    chips: ['wants', 'can', 'cannot', 'likes to'],
    correctAnswer: 'can',
    fullSentence: "- I need to see Dr. Wong. - She's busy now, but she can see you at 3:00 p.m.",
    fullTranslation: '— Necesito ver a la Dra. Wong.\n— Está ocupada ahora, pero puede atenderte a las 3:00 p.m.',
    grammarNote: '"Can" también expresa posibilidad y disponibilidad en un horario ("she can see you at 3:00 p.m.").',
  },
  // Actividad 8: can't hear
  {
    id: 'can-act-8',
    number: 8,
    title: "Actividad 8: can't hear",
    instruction: 'Drag the correct answer/s into place.',
    instructionEs: 'Arrastra o selecciona la respuesta correcta en su lugar.',
    dialogueLines: [
      { hasBlank: true, beforeBlank: 'Jerry and I', afterBlank: 'the music.' },
      { text: "Wait ... it's louder now. Is that better?" },
      { text: 'Yes. Thanks.' },
    ],
    chips: ["can't hear", "don't want to hear", 'can hear', "don't like"],
    correctAnswer: "can't hear",
    fullSentence: "- Jerry and I can't hear the music. - Wait ... it's louder now. Is that better? - Yes. Thanks.",
    fullTranslation: '— Jerry y yo no podemos escuchar la música.\n— Espera... ahora suena más fuerte. ¿Está mejor?\n— Sí. Gracias.',
    grammarNote: 'Con verbos de percepción sensorial como "hear", "see", se usa con frecuencia "can / can\'t" en lugar de tiempos continuos.',
  },
  // Actividad 9: Can David
  {
    id: 'can-act-9',
    number: 9,
    title: 'Actividad 9: Can David',
    instruction: 'Drag the correct answer/s into place.',
    instructionEs: 'Arrastra o selecciona la respuesta correcta en su lugar.',
    dialogueLines: [
      { hasBlank: true, beforeBlank: '', afterBlank: 'play the piano?' },
      { text: 'No, but he can play the guitar.' },
    ],
    chips: ['Can David', 'May David', 'Is David'],
    correctAnswer: 'Can David',
    fullSentence: '- Can David play the piano? - No, but he can play the guitar.',
    fullTranslation: '— ¿Puede David tocar el piano?\n— No, pero él puede tocar la guitarra.',
    grammarNote: 'En preguntas sobre habilidades de una tercera persona, invertimos: "Can + Sujeto + verbo en forma base" ("Can David play...?").',
  },
  // Actividad 10: can't
  {
    id: 'can-act-10',
    number: 10,
    title: "Actividad 10: can't",
    instruction: 'Drag the correct answer/s into place.',
    instructionEs: 'Arrastra o selecciona la respuesta correcta en su lugar.',
    dialogueLines: [
      { hasBlank: true, beforeBlank: 'Phyllis', afterBlank: 'be twenty-two years old!' },
      { text: "She's not. She's only twenty." },
    ],
    chips: ['can', "doesn't", "isn't", "can't"],
    correctAnswer: "can't",
    fullSentence: "- Phyllis can't be twenty-two years old! - She's not. She's only twenty.",
    fullTranslation: '— ¡Phyllis no puede tener veintidós años!\n— No los tiene. Solo tiene veinte.',
    grammarNote: '"Can\'t be" se utiliza para expresar deducción lógica negativa o incredulidad frente a una situación imposible.',
  },
  // Actividad 11: work
  {
    id: 'can-act-11',
    number: 11,
    title: 'Actividad 11: work',
    instruction: 'Drag the correct answer/s into place.',
    instructionEs: 'Arrastra o selecciona la respuesta correcta en su lugar.',
    sentenceBefore: 'The students love the new computers. They can',
    sentenceAfter: 'on them for hours.',
    chips: ['to work', 'work', 'working', 'worked'],
    correctAnswer: 'work',
    fullSentence: 'The students love the new computers. They can work on them for hours.',
    fullTranslation: 'A los estudiantes les encantan las computadoras nuevas. Pueden trabajar en ellas durante horas.',
    grammarNote: 'Después de "can", el verbo principal no lleva "to", ni -ing ni -ed. Se usa la forma base: "can work".',
  },
];

export const MODALS_CAN_TEST_QUESTIONS: ModalsCanTestItem[] = [
  // Test 1: one of us can't go
  {
    id: 'can-test-1',
    number: 1,
    instruction: 'Drag the correct answer/s into place.',
    instructionEs: 'Arrastra o selecciona la respuesta correcta en su lugar.',
    dialogueLines: [
      { text: 'There are five of us and we have only four tickets for the concert.' },
      { hasBlank: true, beforeBlank: 'Well,', afterBlank: '.' },
    ],
    chips: ['we can all go', "one of us can't go", 'all of us can go', 'one of us can go'],
    correctAnswer: "one of us can't go",
    fullSentence: "- There are five of us and we have only four tickets for the concert. - Well, one of us can't go.",
    fullTranslation: '— Somos cinco y solo tenemos cuatro entradas para el concierto.\n— Bueno, uno de nosotros no puede ir.',
    grammarNote: 'Al haber 5 personas y 4 boletos, lógicamente una persona no puede ir ("one of us can\'t go").',
  },
  // Test 2: can't eat
  {
    id: 'can-test-2',
    number: 2,
    instruction: 'Drag the correct answer/s into place.',
    instructionEs: 'Arrastra o selecciona la respuesta correcta en su lugar.',
    sentenceBefore: 'Bob',
    sentenceAfter: "candy because he's trying to lose weight.",
    chips: ['eats', "can't eat", 'can eat', 'likes to eat'],
    correctAnswer: "can't eat",
    fullSentence: "Bob can't eat candy because he's trying to lose weight.",
    fullTranslation: 'Bob no puede comer dulces porque está intentando bajar de peso.',
    grammarNote: '"Can\'t eat" expresa una restricción alimenticia o prohibición impuesta por una dieta.',
  },
  // Test 3: can
  {
    id: 'can-test-3',
    number: 3,
    instruction: 'Drag the correct answer/s into place.',
    instructionEs: 'Arrastra o selecciona la respuesta correcta en su lugar.',
    sentenceBefore: "It's 9:30. Let's hurry. We",
    sentenceAfter: 'still get the 10:00 train.',
    chips: ['do', 'can', 'want', "can't"],
    correctAnswer: 'can',
    fullSentence: "It's 9:30. Let's hurry. We can still get the 10:00 train.",
    fullTranslation: 'Son las 9:30. Apurémonos. Todavía podemos tomar el tren de las 10:00.',
    grammarNote: '"We can still get..." expresa la posibilidad real de alcanzar el tren si nos apresuramos.',
  },
  // Test 4: can
  {
    id: 'can-test-4',
    number: 4,
    instruction: 'Drag the correct answer/s into place.',
    instructionEs: 'Arrastra o selecciona la respuesta correcta en su lugar.',
    sentenceBefore: 'Miss Grant is a nice teacher. When you finish her tests, you',
    sentenceAfter: 'leave the classroom.',
    chips: ['are', 'do', "can't", 'can'],
    correctAnswer: 'can',
    fullSentence: 'Miss Grant is a nice teacher. When you finish her tests, you can leave the classroom.',
    fullTranslation: 'La señorita Grant es una profesora amable. Cuando terminas sus exámenes, puedes salir del salón.',
    grammarNote: 'Se usa "can" para otorgar permiso en situaciones cotidianas ("you can leave the classroom").',
  },
  // Test 5: Can
  {
    id: 'can-test-5',
    number: 5,
    instruction: 'Drag the correct answer/s into place.',
    instructionEs: 'Arrastra o selecciona la respuesta correcta en su lugar.',
    dialogueLines: [
      { text: 'Hello? Is Pedro there?' },
      { text: "Yes, but he's very busy now." },
      { hasBlank: true, beforeBlank: '', afterBlank: 'you ask him to call me back?' },
      { text: "Sure. I'll tell him." },
    ],
    chips: ['Do', 'Can', 'May', 'Are'],
    correctAnswer: 'Can',
    fullSentence: "- Hello? Is Pedro there? - Yes, but he's very busy now. - Can you ask him to call me back? - Sure. I'll tell him.",
    fullTranslation: '— ¿Hola? ¿Está Pedro?\n— Sí, pero está muy ocupado ahora.\n— ¿Puedes pedirle que me devuelva la llamada?\n— Claro. Le diré.',
    grammarNote: 'Se usa "Can you...?" para hacer una petición telefónica estándar y amable a otra persona.',
  },
];
