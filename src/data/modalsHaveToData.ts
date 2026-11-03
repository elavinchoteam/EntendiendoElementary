export interface DialogueLine {
  id: string;
  speaker: string;
  speakerEs: string;
  speakerGender: 'male' | 'female';
  text: string;
  translation: string;
  audioText: string;
  highlightWords?: string[];
}

export interface ContextLine {
  speaker?: string;
  text?: string;
  hasBlank?: boolean;
  beforeBlank?: string;
  afterBlank?: string;
}

export interface ChipWithTranslation {
  en: string;
  es: string;
}

export interface ModalsHaveToActivityItem {
  id: string;
  number: number;
  title: string;
  instruction: string;
  instructionEs: string;
  dialogueLines?: ContextLine[];
  sentenceBefore?: string;
  sentenceAfter?: string;
  chips: string[];
  chipsData: ChipWithTranslation[];
  correctAnswer: string;
  fullSentence: string;
  fullTranslation: string;
  grammarNote: string;
}

export interface ModalsHaveToTestItem {
  id: string;
  number: number;
  title: string;
  instruction: string;
  instructionEs: string;
  dialogueLines?: ContextLine[];
  sentenceBefore?: string;
  sentenceAfter?: string;
  chips: string[];
  chipsData: ChipWithTranslation[];
  correctAnswer: string;
  fullSentence: string;
  fullTranslation: string;
  grammarNote: string;
}

export const MODALS_HAVE_TO_DIALOGUE: DialogueLine[] = [
  {
    id: 'dlg-1',
    speaker: 'Mom',
    speakerEs: 'Mamá',
    speakerGender: 'female',
    text: "It's time for bed, Michael.",
    translation: 'Es hora de ir a dormir, Michael.',
    audioText: "It's time for bed, Michael.",
    highlightWords: [],
  },
  {
    id: 'dlg-2',
    speaker: 'Michael',
    speakerEs: 'Michael',
    speakerGender: 'male',
    text: 'Aw, Mom. Do I have to go to bed now?',
    translation: 'Oh, mamá. ¿Tengo que ir a dormir ahora?',
    audioText: 'Aw, Mom. Do I have to go to bed now?',
    highlightWords: ['have to'],
  },
  {
    id: 'dlg-3',
    speaker: 'Mom',
    speakerEs: 'Mamá',
    speakerGender: 'female',
    text: "Yes, you do. It's late and you have to go to school tomorrow.",
    translation: 'Sí, tienes que hacerlo. Es tarde y tienes que ir a la escuela mañana.',
    audioText: "Yes, you do. It's late and you have to go to school tomorrow.",
    highlightWords: ['have to'],
  },
];

export const MODALS_HAVE_TO_ACTIVITIES: ModalsHaveToActivityItem[] = [
  // Actividad 2: have to
  {
    id: 'have-to-act-2',
    number: 2,
    title: 'Actividad 2: have to',
    instruction: 'Drag the correct answer/s into place.',
    instructionEs: 'Arrastra o selecciona la respuesta correcta en su lugar.',
    dialogueLines: [
      { text: '- Hi, Marcy. Do you want to go to a movie tonight?' },
      { hasBlank: true, beforeBlank: '- Thanks, Gary but I', afterBlank: 'study for a test.' },
    ],
    chips: ['like to', 'have', 'has to', 'have to'],
    chipsData: [
      { en: 'like to', es: 'me gustaría' },
      { en: 'have', es: 'tengo' },
      { en: 'has to', es: 'tiene que' },
      { en: 'have to', es: 'tengo que' },
    ],
    correctAnswer: 'have to',
    fullSentence: '- Hi, Marcy. Do you want to go to a movie tonight? - Thanks, Gary but I have to study for a test.',
    fullTranslation: '— Hola, Marcy. ¿Quieres ir al cine esta noche?\n— Gracias, Gary, pero tengo que estudiar para un examen.',
    grammarNote: 'Con el sujeto "I", se utiliza "have to" seguido de la forma base del verbo (study) para expresar obligación.',
  },
  // Actividad 3: has to type
  {
    id: 'have-to-act-3',
    number: 3,
    title: 'Actividad 3: has to type',
    instruction: 'Drag the correct answer/s into place.',
    instructionEs: 'Arrastra o selecciona la respuesta correcta en su lugar.',
    sentenceBefore: 'The secretary',
    sentenceAfter: 'the report before 4 P.M.',
    chips: ['has to type', 'have to type', 'typing'],
    chipsData: [
      { en: 'has to type', es: 'tiene que mecanografiar' },
      { en: 'have to type', es: 'tienen que mecanografiar' },
      { en: 'typing', es: 'mecanografiando' },
    ],
    correctAnswer: 'has to type',
    fullSentence: 'The secretary has to type the report before 4 P.M.',
    fullTranslation: 'La secretaria tiene que mecanografiar el informe antes de las 4 P.M.',
    grammarNote: 'Para la 3ª persona del singular ("The secretary" = he/she), la estructura de obligación es "has to" + infinitivo sin "to".',
  },
  // Actividad 4: doesn't have to
  {
    id: 'have-to-act-4',
    number: 4,
    title: "Actividad 4: doesn't have to",
    instruction: 'Drag the correct answer/s into place.',
    instructionEs: 'Arrastra o selecciona la respuesta correcta en su lugar.',
    sentenceBefore: 'Tom',
    sentenceAfter: "take a taxi to the station. It's close enough to walk.",
    chips: ['can', "doesn't have to", "doesn't have", "can't"],
    chipsData: [
      { en: 'can', es: 'puede' },
      { en: "doesn't have to", es: 'no tiene que (no es necesario)' },
      { en: "doesn't have", es: 'no tiene' },
      { en: "can't", es: 'no puede' },
    ],
    correctAnswer: "doesn't have to",
    fullSentence: "Tom doesn't have to take a taxi to the station. It's close enough to walk.",
    fullTranslation: 'Tom no tiene que tomar un taxi a la estación. Está lo suficientemente cerca para caminar.',
    grammarNote: '"Doesn\'t have to" expresa falta de obligación o necesidad (no hace falta que tome taxi porque puede caminar).',
  },
  // Actividad 5: have to write
  {
    id: 'have-to-act-5',
    number: 5,
    title: 'Actividad 5: have to write',
    instruction: 'Drag the correct answer/s into place.',
    instructionEs: 'Arrastra o selecciona la respuesta correcta en su lugar.',
    sentenceBefore: "Please fill out this form. We don't need a phone number, but you",
    sentenceAfter: 'your address.',
    chips: ["mustn't write", 'have to write', 'want to write'],
    chipsData: [
      { en: "mustn't write", es: 'no debes escribir' },
      { en: 'have to write', es: 'tienes que escribir' },
      { en: 'want to write', es: 'quieres escribir' },
    ],
    correctAnswer: 'have to write',
    fullSentence: "Please fill out this form. We don't need a phone number, but you have to write your address.",
    fullTranslation: 'Por favor complete este formulario. No necesitamos un número de teléfono, pero tiene que escribir su dirección.',
    grammarNote: 'Se usa "have to write" para indicar un requisito indispensable u obligación formal en un documento.',
  },
  // Actividad 6: has to
  {
    id: 'have-to-act-6',
    number: 6,
    title: 'Actividad 6: has to',
    instruction: 'Drag the correct answer/s into place.',
    instructionEs: 'Arrastra o selecciona la respuesta correcta en su lugar.',
    sentenceBefore: 'Mary is sick, so she',
    sentenceAfter: 'take medicine after every meal.',
    chips: ['has to', "doesn't have to", "hasn't", 'have to'],
    chipsData: [
      { en: 'has to', es: 'tiene que' },
      { en: "doesn't have to", es: 'no tiene que' },
      { en: "hasn't", es: 'no ha' },
      { en: 'have to', es: 'tienen que' },
    ],
    correctAnswer: 'has to',
    fullSentence: 'Mary is sick, so she has to take medicine after every meal.',
    fullTranslation: 'Mary está enferma, así que ella tiene que tomar medicamentos después de cada comida.',
    grammarNote: 'El sujeto "she" requiere "has to" para manifestar la obligación médica afirmativa.',
  },
  // Actividad 7: has to help
  {
    id: 'have-to-act-7',
    number: 7,
    title: 'Actividad 7: has to help',
    instruction: 'Drag the correct answer/s into place.',
    instructionEs: 'Arrastra o selecciona la respuesta correcta en su lugar.',
    sentenceBefore: "Marisa isn't coming to the beach with us. She",
    sentenceAfter: 'her mother.',
    chips: ['needs help', 'has to help', 'has help', 'have to help'],
    chipsData: [
      { en: 'needs help', es: 'necesita ayuda' },
      { en: 'has to help', es: 'tiene que ayudar a' },
      { en: 'has help', es: 'tiene ayuda' },
      { en: 'have to help', es: 'tienen que ayudar a' },
    ],
    correctAnswer: 'has to help',
    fullSentence: "Marisa isn't coming to the beach with us. She has to help her mother.",
    fullTranslation: 'Marisa no va a venir a la playa con nosotros. Ella tiene que ayudar a su madre.',
    grammarNote: '"She has to help" expresa la obligación familiar que le impide unirse al plan de ir a la playa.',
  },
  // Actividad 8: doesn't have to
  {
    id: 'have-to-act-8',
    number: 8,
    title: "Actividad 8: doesn't have to",
    instruction: 'Drag the correct answer/s into place.',
    instructionEs: 'Arrastra o selecciona la respuesta correcta en su lugar.',
    sentenceBefore: "I repaired Rob's bike. Now he",
    sentenceAfter: 'take it to the repair shop.',
    chips: ["doesn't have to", 'has not', "don't have to"],
    chipsData: [
      { en: "doesn't have to", es: 'no tiene que (ya no es necesario)' },
      { en: 'has not', es: 'no ha' },
      { en: "don't have to", es: 'no tienen que' },
    ],
    correctAnswer: "doesn't have to",
    fullSentence: "I repaired Rob's bike. Now he doesn't have to take it to the repair shop.",
    fullTranslation: 'Reparé la bicicleta de Rob. Ahora él no tiene que llevarla al taller de reparaciones.',
    grammarNote: 'Al estar la bicicleta reparada, se expresa la no-obligación en 3ª persona ("he") con "doesn\'t have to".',
  },
  // Actividad 9: to use
  {
    id: 'have-to-act-9',
    number: 9,
    title: 'Actividad 9: to use',
    instruction: 'Drag the correct answer/s into place.',
    instructionEs: 'Arrastra o selecciona la respuesta correcta en su lugar.',
    sentenceBefore: "You can't use a pencil on the test. You have",
    sentenceAfter: 'a pen.',
    chips: ['to use', 'used', 'use'],
    chipsData: [
      { en: 'to use', es: 'que usar' },
      { en: 'used', es: 'usó / usado' },
      { en: 'use', es: 'usar' },
    ],
    correctAnswer: 'to use',
    fullSentence: "You can't use a pencil on the test. You have to use a pen.",
    fullTranslation: 'No puedes usar un lápiz en la prueba. Tienes que usar un bolígrafo.',
    grammarNote: 'La construcción verbal completa es "have to" + verbo en forma base. Como ya está "have", falta "to use".',
  },
  // Actividad 10: to work
  {
    id: 'have-to-act-10',
    number: 10,
    title: 'Actividad 10: to work',
    instruction: 'Drag the correct answer/s into place.',
    instructionEs: 'Arrastra o selecciona la respuesta correcta en su lugar.',
    dialogueLines: [
      { text: "- Why isn't Alice going to the beach?" },
      { hasBlank: true, beforeBlank: '- Her mom has', afterBlank: ', and she has to watch her younger sisters.' },
    ],
    chips: ['worked', 'working', 'works', 'to work'],
    chipsData: [
      { en: 'worked', es: 'trabajó' },
      { en: 'working', es: 'trabajando' },
      { en: 'works', es: 'trabaja' },
      { en: 'to work', es: 'que trabajar' },
    ],
    correctAnswer: 'to work',
    fullSentence: "- Why isn't Alice going to the beach? - Her mom has to work, and she has to watch her younger sisters.",
    fullTranslation: '— ¿Por qué Alice no va a la playa?\n— Su mamá tiene que trabajar, y ella tiene que cuidar a sus hermanas menores.',
    grammarNote: 'El verbo "has" como expresión de obligación exige "to" + verbo base ("to work").',
  },
  // Actividad 11: don't have to
  {
    id: 'have-to-act-11',
    number: 11,
    title: "Actividad 11: don't have to",
    instruction: 'Drag the correct answer/s into place.',
    instructionEs: 'Arrastra o selecciona la respuesta correcta en su lugar.',
    sentenceBefore: 'You',
    sentenceAfter: 'finish the report today, do you?',
    chips: ["mustn't", "can't", "shouldn't", "don't have to"],
    chipsData: [
      { en: "mustn't", es: 'no debes' },
      { en: "can't", es: 'no puedes' },
      { en: "shouldn't", es: 'no deberías' },
      { en: "don't have to", es: 'no tienes que' },
    ],
    correctAnswer: "don't have to",
    fullSentence: 'You don\'t have to finish the report today, do you?',
    fullTranslation: 'No tienes que terminar el informe hoy, ¿verdad?',
    grammarNote: 'La coletilla interrogativa ", do you?" concuerda con el auxiliar del presente simple "don\'t have to".',
  },
];

export const MODALS_HAVE_TO_TESTS: ModalsHaveToTestItem[] = [
  // Test 1: has to
  {
    id: 'have-to-test-1',
    number: 1,
    title: 'Pregunta 1: has to',
    instruction: 'Drag the correct answer/s into place.',
    instructionEs: 'Arrastra o selecciona la respuesta correcta en su lugar.',
    sentenceBefore: 'You need a passport to come into the country. Everyone',
    sentenceAfter: 'have one.',
    chips: ['have to', "doesn't have to", 'has', 'has to'],
    chipsData: [
      { en: 'have to', es: 'tienen que' },
      { en: "doesn't have to", es: 'no tiene que' },
      { en: 'has', es: 'tiene' },
      { en: 'has to', es: 'tiene que' },
    ],
    correctAnswer: 'has to',
    fullSentence: 'You need a passport to come into the country. Everyone has to have one.',
    fullTranslation: 'Necesitas un pasaporte para entrar al país. Todos tienen que tener uno.',
    grammarNote: '"Everyone" se conjuga en tercera persona singular, por lo que requiere "has to". "have" aquí funciona como verbo principal.',
  },
  // Test 2: No. I have to
  {
    id: 'have-to-test-2',
    number: 2,
    title: 'Pregunta 2: No. I have to',
    instruction: 'Drag the correct answer/s into place.',
    instructionEs: 'Arrastra o selecciona la respuesta correcta en su lugar.',
    dialogueLines: [
      { text: '- Can you come to the dance tonight?' },
      { hasBlank: true, beforeBlank: '-', afterBlank: 'take care of my little sister.' },
    ],
    chips: ['No. I have to', 'No. I have', 'No. I study'],
    chipsData: [
      { en: 'No. I have to', es: 'No. Tengo que' },
      { en: 'No. I have', es: 'No. Yo tengo' },
      { en: 'No. I study', es: 'No. Yo estudio' },
    ],
    correctAnswer: 'No. I have to',
    fullSentence: '- Can you come to the dance tonight? - No. I have to take care of my little sister.',
    fullTranslation: '— ¿Puedes venir al baile esta noche?\n— No. Tengo que cuidar a mi hermana pequeña.',
    grammarNote: 'Se declina la invitación con la obligación formal "No. I have to" seguida de "take care of...".',
  },
  // Test 3: doesn't
  {
    id: 'have-to-test-3',
    number: 3,
    title: "Pregunta 3: doesn't",
    instruction: 'Drag the correct answer/s into place.',
    instructionEs: 'Arrastra o selecciona la respuesta correcta en su lugar.',
    sentenceBefore: 'Victor learns quickly. He',
    sentenceAfter: 'have to work very hard in school.',
    chips: ['never', "doesn't", "hasn't", 'no'],
    chipsData: [
      { en: 'never', es: 'nunca' },
      { en: "doesn't", es: 'no (auxiliar 3ª persona)' },
      { en: "hasn't", es: 'no ha' },
      { en: 'no', es: 'no' },
    ],
    correctAnswer: "doesn't",
    fullSentence: 'Victor learns quickly. He doesn\'t have to work very hard in school.',
    fullTranslation: 'Victor aprende rápido. Él no tiene que trabajar muy duro en la escuela.',
    grammarNote: 'Para negar "have to" con "He", se emplea el auxiliar del presente simple "doesn\'t", seguido de la forma base "have to".',
  },
  // Test 4: don't have
  {
    id: 'have-to-test-4',
    number: 4,
    title: "Pregunta 4: don't have",
    instruction: 'Drag the correct answer/s into place.',
    instructionEs: 'Arrastra o selecciona la respuesta correcta en su lugar.',
    sentenceBefore: 'Lucy and Martin',
    sentenceAfter: 'to leave now, do they?',
    chips: ["couldn't", "mustn't", "shouldn't", "don't have"],
    chipsData: [
      { en: "couldn't", es: 'no podían' },
      { en: "mustn't", es: 'no deben' },
      { en: "shouldn't", es: 'no deberían' },
      { en: "don't have", es: 'no tienen' },
    ],
    correctAnswer: "don't have",
    fullSentence: 'Lucy and Martin don\'t have to leave now, do they?',
    fullTranslation: 'Lucy y Martin no tienen que irse ahora, ¿verdad?',
    grammarNote: 'La tag question ", do they?" se corresponde con la negación en presente simple "don\'t have" (+ to leave).',
  },
  // Test 5: You don't have to
  {
    id: 'have-to-test-5',
    number: 5,
    title: "Pregunta 5: You don't have to",
    instruction: 'Drag the correct answer/s into place.',
    instructionEs: 'Arrastra o selecciona la respuesta correcta en su lugar.',
    dialogueLines: [
      { text: '- I want to invite Julie and Tim to the party.' },
      { hasBlank: true, beforeBlank: '-', afterBlank: '. I saw them yesterday and invited them.' },
    ],
    chips: ["You don't need", "You don't have to", "Don't you have to", 'You have not'],
    chipsData: [
      { en: "You don't need", es: 'No necesitas' },
      { en: "You don't have to", es: 'No tienes que hacerlo (no es necesario)' },
      { en: "Don't you have to", es: '¿No tienes que...?' },
      { en: 'You have not', es: 'Tú no has' },
    ],
    correctAnswer: "You don't have to",
    fullSentence: '- I want to invite Julie and Tim to the party. - You don\'t have to. I saw them yesterday and invited them.',
    fullTranslation: '— Quiero invitar a Julie y a Tim a la fiesta.\n— No tienes que hacerlo. Los vi ayer y los invité.',
    grammarNote: '"You don\'t have to" es la respuesta estándar y concisa para indicar que una acción propuesta ya no es necesaria.',
  },
];
