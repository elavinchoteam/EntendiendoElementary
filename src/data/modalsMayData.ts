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

export interface ModalsMayActivityItem {
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

export interface ModalsMayTestItem {
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

export const MODALS_MAY_DIALOGUE: DialogueLine[] = [
  {
    id: 'dlg-1',
    speaker: 'Daughter',
    speakerEs: 'Hija',
    speakerGender: 'female',
    text: 'Mom, may I have a cookie?',
    translation: 'Mamá, ¿puedo tomar una galleta?',
    audioText: 'Mom, may I have a cookie?',
    highlightWords: ['may'],
  },
  {
    id: 'dlg-2',
    speaker: 'Mom',
    speakerEs: 'Mamá',
    speakerGender: 'female',
    text: 'OK, but only one. Your brother may want one, too.',
    translation: 'Está bien, pero solo una. Puede que tu hermano también quiera una.',
    audioText: 'OK, but only one. Your brother may want one, too.',
    highlightWords: ['may'],
  },
];

export const MODALS_MAY_ACTIVITIES: ModalsMayActivityItem[] = [
  // Actividad 2: may rain
  {
    id: 'may-act-2',
    number: 2,
    title: 'Actividad 2: may rain',
    instruction: 'Drag the correct answer/s into place.',
    instructionEs: 'Arrastra o selecciona la respuesta correcta en su lugar.',
    sentenceBefore: 'Take your umbrella. It',
    sentenceAfter: 'today.',
    chips: ['rained', 'rains', 'raining', 'may rain'],
    chipsData: [
      { en: 'rained', es: 'llovió (pasado)' },
      { en: 'rains', es: 'llueve (presente simple)' },
      { en: 'raining', es: 'lloviendo (gerundio)' },
      { en: 'may rain', es: 'puede que llueva (posibilidad)' },
    ],
    correctAnswer: 'may rain',
    fullSentence: 'Take your umbrella. It may rain today.',
    fullTranslation: 'Lleva tu paraguas. Puede que llueva hoy.',
    grammarNote: 'Se usa el modal "may" + verbo base ("rain") para expresar una posibilidad real en el presente o futuro.',
  },
  // Actividad 3: may arrive
  {
    id: 'may-act-3',
    number: 3,
    title: 'Actividad 3: may arrive',
    instruction: 'Drag the correct answer/s into place.',
    instructionEs: 'Arrastra o selecciona la respuesta correcta en su lugar.',
    sentenceBefore: "The weather is bad. Mary's plane",
    sentenceAfter: 'late.',
    chips: ['never arrives', 'does arrive', 'may arrive', 'arrives'],
    chipsData: [
      { en: 'never arrives', es: 'nunca llega' },
      { en: 'does arrive', es: 'sí llega (énfasis)' },
      { en: 'may arrive', es: 'puede llegar (posibilidad)' },
      { en: 'arrives', es: 'llega (rutina)' },
    ],
    correctAnswer: 'may arrive',
    fullSentence: "The weather is bad. Mary's plane may arrive late.",
    fullTranslation: 'El clima está malo. El avión de Mary puede llegar tarde.',
    grammarNote: '"may arrive" denota posibilidad/probabilidad debida a una circunstancia ("The weather is bad").',
  },
  // Actividad 4: may
  {
    id: 'may-act-4',
    number: 4,
    title: 'Actividad 4: may',
    instruction: 'Drag the correct answer/s into place.',
    instructionEs: 'Arrastra o selecciona la respuesta correcta en su lugar.',
    sentenceBefore: 'The doctor is ready. You',
    sentenceAfter: 'come in now.',
    chips: ['have', 'may', 'do', 'are'],
    chipsData: [
      { en: 'have', es: 'tienes' },
      { en: 'may', es: 'puedes (permiso formal)' },
      { en: 'do', es: 'haces' },
      { en: 'are', es: 'estás / eres' },
    ],
    correctAnswer: 'may',
    fullSentence: 'The doctor is ready. You may come in now.',
    fullTranslation: 'El médico está listo. Puede usted pasar ahora.',
    grammarNote: '"You may come in" otorga permiso formal de manera educada para realizar una acción.',
  },
  // Actividad 5: May
  {
    id: 'may-act-5',
    number: 5,
    title: 'Actividad 5: May',
    instruction: 'Drag the correct answer/s into place.',
    instructionEs: 'Arrastra o selecciona la respuesta correcta en su lugar.',
    dialogueLines: [
      { hasBlank: true, beforeBlank: '- ', afterBlank: " I see your ticket, please?" },
      { text: "- Here. I'm going to Boston." },
    ],
    chips: ['Do', 'Am', 'Have', 'May'],
    chipsData: [
      { en: 'Do', es: 'Hago (auxiliar)' },
      { en: 'Am', es: 'Soy / Estoy' },
      { en: 'Have', es: 'Tengo' },
      { en: 'May', es: '¿Puedo...? (permiso cortés)' },
    ],
    correctAnswer: 'May',
    fullSentence: "- May I see your ticket, please? - Here. I'm going to Boston.",
    fullTranslation: '— ¿Puedo ver su boleto, por favor?\n— Aquí tiene. Voy a Boston.',
    grammarNote: '"May I see...?" es la expresión formal por excelencia para pedir permiso o solicitar ver algo cortésmente.',
  },
  // Actividad 6: May I sit here
  {
    id: 'may-act-6',
    number: 6,
    title: 'Actividad 6: May I sit here',
    instruction: 'Drag the correct answer/s into place.',
    instructionEs: 'Arrastra o selecciona la respuesta correcta en su lugar.',
    dialogueLines: [
      { hasBlank: true, beforeBlank: '- ', afterBlank: '?' },
      { text: '- Sure. Go ahead.' },
    ],
    chips: ['Am I sitting here', 'I may sit here', 'Do I sit here', 'May I sit here'],
    chipsData: [
      { en: 'Am I sitting here', es: '¿Estoy sentado aquí?' },
      { en: 'I may sit here', es: 'Puedo sentarme aquí (afirmación)' },
      { en: 'Do I sit here', es: '¿Me siento aquí?' },
      { en: 'May I sit here', es: '¿Puedo sentarme aquí? (pregunta de permiso)' },
    ],
    correctAnswer: 'May I sit here',
    fullSentence: '- May I sit here? - Sure. Go ahead.',
    fullTranslation: '— ¿Puedo sentarme aquí?\n— Seguro. Adelante.',
    grammarNote: 'Para solicitar permiso educadamente, se invierte el orden a forma interrogativa: "May I + verbo base...?".',
  },
  // Actividad 7: may
  {
    id: 'may-act-7',
    number: 7,
    title: 'Actividad 7: may',
    instruction: 'Drag the correct answer/s into place.',
    instructionEs: 'Arrastra o selecciona la respuesta correcta en su lugar.',
    sentenceBefore: 'Our flight takes six hours. You',
    sentenceAfter: 'want to bring a book.',
    chips: ['do', "aren't", 'may', 'may not'],
    chipsData: [
      { en: 'do', es: 'sí / haces' },
      { en: "aren't", es: 'no eres / estás' },
      { en: 'may', es: 'quizás / puedes (sugerencia/posibilidad)' },
      { en: 'may not', es: 'quizás no' },
    ],
    correctAnswer: 'may',
    fullSentence: 'Our flight takes six hours. You may want to bring a book.',
    fullTranslation: 'Nuestro vuelo dura seis horas. Quizá quieras traer un libro.',
    grammarNote: '"You may want to..." es una forma cortés y suave de sugerir algo útil basado en una situación.',
  },
  // Actividad 8: may
  {
    id: 'may-act-8',
    number: 8,
    title: 'Actividad 8: may',
    instruction: 'Drag the correct answer/s into place.',
    instructionEs: 'Arrastra o selecciona la respuesta correcta en su lugar.',
    dialogueLines: [
      { text: '- Can I use the car, Mom?' },
      { hasBlank: true, beforeBlank: '- You', afterBlank: 'use it, but be home by 10:00 p.m.' },
    ],
    chips: ['do', 'may not', 'may', "can't"],
    chipsData: [
      { en: 'do', es: 'haces' },
      { en: 'may not', es: 'no puedes (prohibición)' },
      { en: 'may', es: 'puedes (permiso condicionado)' },
      { en: "can't", es: 'no puedes' },
    ],
    correctAnswer: 'may',
    fullSentence: '- Can I use the car, Mom? - You may use it, but be home by 10:00 p.m.',
    fullTranslation: '— ¿Puedo usar el auto, mamá?\n— Puedes usarlo, pero regresa a casa antes de las 10:00 p.m.',
    grammarNote: '"You may use it..." concede permiso, en este caso con una condición ("pero regresa antes de las 10:00 p.m.").',
  },
  // Actividad 9: may not take
  {
    id: 'may-act-9',
    number: 9,
    title: 'Actividad 9: may not take',
    instruction: 'Drag the correct answer/s into place.',
    instructionEs: 'Arrastra o selecciona la respuesta correcta en su lugar.',
    dialogueLines: [
      { hasBlank: true, beforeBlank: '- Do you have money? The restaurant', afterBlank: 'credit cards.' },
      { text: '- Yes. I went to the bank today.' },
    ],
    chips: ['may take', 'may not take', 'can take', 'does take'],
    chipsData: [
      { en: 'may take', es: 'quizá acepte' },
      { en: 'may not take', es: 'puede que no acepte (posibilidad negativa)' },
      { en: 'can take', es: 'puede aceptar' },
      { en: 'does take', es: 'sí acepta' },
    ],
    correctAnswer: 'may not take',
    fullSentence: '- Do you have money? The restaurant may not take credit cards. - Yes. I went to the bank today.',
    fullTranslation: '— ¿Tienes dinero? Puede que el restaurante no acepte tarjetas de crédito.\n— Sí. Fui al banco hoy.',
    grammarNote: '"may not + verbo base" indica posibilidad negativa: existe la probabilidad de que no acepten tarjetas.',
  },
  // Actividad 10: need
  {
    id: 'may-act-10',
    number: 10,
    title: 'Actividad 10: need',
    instruction: 'Drag the correct answer/s into place.',
    instructionEs: 'Arrastra o selecciona la respuesta correcta en su lugar.',
    sentenceBefore: 'Take your jacket. You may not',
    sentenceAfter: 'it, but you never know.',
    chips: ['needing', 'needs', 'need', 'to need'],
    chipsData: [
      { en: 'needing', es: 'necesitando (gerundio)' },
      { en: 'needs', es: 'necesita (3ra persona)' },
      { en: 'need', es: 'necesitar (verbo en forma base)' },
      { en: 'to need', es: 'a necesitar (infinitivo con to)' },
    ],
    correctAnswer: 'need',
    fullSentence: 'Take your jacket. You may not need it, but you never know.',
    fullTranslation: 'Lleva tu chaqueta. Quizá no la necesites, pero nunca se sabe.',
    grammarNote: 'Después del modal "may" o "may not", el verbo principal SIEMPRE va en su forma base sin "to": "need".',
  },
  // Actividad 11: go
  {
    id: 'may-act-11',
    number: 11,
    title: 'Actividad 11: go',
    instruction: 'Drag the correct answer/s into place.',
    instructionEs: 'Arrastra o selecciona la respuesta correcta en su lugar.',
    sentenceBefore: 'Charlie is very busy at work this summer. He may not',
    sentenceAfter: 'on vacation at all.',
    chips: ['go', 'can go', 'going', 'to go'],
    chipsData: [
      { en: 'go', es: 'ir (verbo en forma base)' },
      { en: 'can go', es: 'puede ir (doble modal)' },
      { en: 'going', es: 'yendo (gerundio)' },
      { en: 'to go', es: 'ir (con to)' },
    ],
    correctAnswer: 'go',
    fullSentence: 'Charlie is very busy at work this summer. He may not go on vacation at all.',
    fullTranslation: 'Charlie está muy ocupado en el trabajo este verano. Puede que no vaya de vacaciones para nada.',
    grammarNote: 'Los verbos modales nunca se combinan entre sí y siempre van seguidos de la forma base del verbo: "go".',
  },
];

export const MODALS_MAY_TESTS: ModalsMayTestItem[] = [
  // Test 1: No, you may not
  {
    id: 'may-test-1',
    number: 1,
    title: 'Pregunta 1 de 5: No, you may not',
    instruction: 'Drag the correct answer/s into place.',
    instructionEs: 'Arrastra o selecciona la respuesta correcta en su lugar.',
    dialogueLines: [
      { text: "- It's snowing! Can we go outside?" },
      { hasBlank: true, beforeBlank: '- ', afterBlank: ". It's too cold." },
    ],
    chips: ['No, you may not', "No, it's not", 'No, you may', 'No, you do not'],
    chipsData: [
      { en: 'No, you may not', es: 'No, no pueden (denegación de permiso)' },
      { en: "No, it's not", es: 'No, no lo es' },
      { en: 'No, you may', es: 'No, ustedes pueden (contradictorio)' },
      { en: 'No, you do not', es: 'No, ustedes no lo hacen' },
    ],
    correctAnswer: 'No, you may not',
    fullSentence: "- It's snowing! Can we go outside? - No, you may not. It's too cold.",
    fullTranslation: '— ¡Está nevando! ¿Podemos salir afuera?\n— No, no pueden. Hace demasiado frío.',
    grammarNote: '"No, you may not" es la respuesta breve y formal para denegar un permiso.',
  },
  // Test 2: may not have
  {
    id: 'may-test-2',
    number: 2,
    title: 'Pregunta 2 de 5: may not have',
    instruction: 'Drag the correct answer/s into place.',
    instructionEs: 'Arrastra o selecciona la respuesta correcta en su lugar.',
    sentenceBefore: 'Jim is going to the store now. He',
    sentenceAfter: 'time later.',
    chips: ['has not', 'may not have', 'may have not', 'does have'],
    chipsData: [
      { en: 'has not', es: 'no tiene (incorrecto en presente simple inglés)' },
      { en: 'may not have', es: 'puede que no tenga (orden correcto modal + not + base)' },
      { en: 'may have not', es: 'orden incorrecto' },
      { en: 'does have', es: 'sí tiene (afirmativo enfático)' },
    ],
    correctAnswer: 'may not have',
    fullSentence: 'Jim is going to the store now. He may not have time later.',
    fullTranslation: 'Jim va a la tienda ahora. Puede que no tenga tiempo más tarde.',
    grammarNote: 'La negación del modal se forma colocando "not" inmediatamente después del modal: "may not have".',
  },
  // Test 3: May I
  {
    id: 'may-test-3',
    number: 3,
    title: 'Pregunta 3 de 5: May I',
    instruction: 'Drag the correct answer/s into place.',
    instructionEs: 'Arrastra o selecciona la respuesta correcta en su lugar.',
    sentenceBefore: "It's a little hot in here.",
    sentenceAfter: 'open the window?',
    chips: ['Will I', "Don't I", 'May I', 'Do I'],
    chipsData: [
      { en: 'Will I', es: '¿Voy a...?' },
      { en: "Don't I", es: '¿Acaso yo no...?' },
      { en: 'May I', es: '¿Puedo...? (solicitud educada de permiso)' },
      { en: 'Do I', es: '¿Acaso...?' },
    ],
    correctAnswer: 'May I',
    fullSentence: "It's a little hot in here. May I open the window?",
    fullTranslation: 'Hace un poco de calor aquí dentro. ¿Puedo abrir la ventana?',
    grammarNote: '"May I open...?" es la manera formal y cortés de pedir permiso para abrir la ventana.',
  },
  // Test 4: may
  {
    id: 'may-test-4',
    number: 4,
    title: 'Pregunta 4 de 5: may',
    instruction: 'Drag the correct answer/s into place.',
    instructionEs: 'Arrastra o selecciona la respuesta correcta en su lugar.',
    dialogueLines: [
      { text: "- I don't know where Lily is." },
      { hasBlank: true, beforeBlank: '- She', afterBlank: 'be at her office.' },
    ],
    chips: ['not', 'does', 'is', 'may'],
    chipsData: [
      { en: 'not', es: 'no' },
      { en: 'does', es: 'hace' },
      { en: 'is', es: 'está (seguido de be es redundante)' },
      { en: 'may', es: 'puede (posibilidad: may be = puede que esté)' },
    ],
    correctAnswer: 'may',
    fullSentence: "- I don't know where Lily is. - She may be at her office.",
    fullTranslation: '— No sé dónde está Lily.\n— Puede que esté en su oficina.',
    grammarNote: '"She may be..." expresa una hipótesis o posibilidad sobre el paradero de Lily ante el desconocimiento.',
  },
  // Test 5: may
  {
    id: 'may-test-5',
    number: 5,
    title: 'Pregunta 5 de 5: may',
    instruction: 'Drag the correct answer/s into place.',
    instructionEs: 'Arrastra o selecciona la respuesta correcta en su lugar.',
    sentenceBefore: 'My boss',
    sentenceAfter: "ask me to work this Sunday, but I don't know if I can.",
    chips: ['likes', 'may', 'does', 'has'],
    chipsData: [
      { en: 'likes', es: 'le gusta (requeriría to ask)' },
      { en: 'may', es: 'puede que (posibilidad + verbo base ask)' },
      { en: 'does', es: 'hace' },
      { en: 'has', es: 'tiene (requeriría has to ask)' },
    ],
    correctAnswer: 'may',
    fullSentence: "My boss may ask me to work this Sunday, but I don't know if I can.",
    fullTranslation: 'Puede que mi jefe me pida trabajar este domingo, pero no sé si pueda.',
    grammarNote: '"My boss may ask..." denota la posibilidad futura de que ocurra esa petición.',
  },
];
