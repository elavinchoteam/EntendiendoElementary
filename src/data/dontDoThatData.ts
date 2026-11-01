export interface DialogueTurn {
  id: string;
  speaker: 'Boss' | 'Peterson';
  speakerLabel: string;
  speakerLabelEs: string;
  textEn: string;
  textEs: string;
  startTimeSeconds?: number;
  endTimeSeconds?: number;
}

export interface RadioOption {
  id: string;
  textEn: string;
  textEs: string;
}

export interface RadioQuestionData {
  id: string;
  activityNumber: number;
  title: string;
  titleEs: string;
  instructionEn: string;
  instructionEs: string;
  questionEn: string;
  questionEs: string;
  options: RadioOption[];
  correctOptionId: string;
  explanationEn: string;
  explanationEs: string;
  highlightedLineId?: string;
}

export interface BestResponseOption {
  id: string;
  textEn: string;
  textEs: string;
}

export interface BestResponseActivityData {
  id: string;
  activityNumber: number;
  title: string;
  titleEs: string;
  instructionEn: string;
  instructionEs: string;
  subInstructionEn: string;
  subInstructionEs: string;
  promptTextEn: string;
  promptTextEs: string;
  promptSpeaker: 'Boss' | 'Peterson';
  options: BestResponseOption[];
  correctOptionId: string;
  explanationEn: string;
  explanationEs: string;
  highlightedLineId?: string;
}

export interface DontDoThatInteractionData {
  id: string;
  interactionNumber: number; // 1, 2, or 3
  title: string;
  titleEs: string;
  instructionEn: string;
  instructionEs: string;
  badgeNumber?: number; // e.g., 2 in interaction 2, 1 in interaction 3
  dialogueTurns: DialogueTurn[];
}

// -------------------------------------------------------------
// COMPLETE SCENE DIALOGUE
// -------------------------------------------------------------
export const DONT_DO_THAT_DIALOGUE: DialogueTurn[] = [
  {
    id: 'turn-1',
    speaker: 'Boss',
    speakerLabel: 'Boss',
    speakerLabelEs: 'Jefe',
    textEn: 'Peterson, what are you doing?',
    textEs: 'Peterson, ¿qué estás haciendo?',
    startTimeSeconds: 0,
    endTimeSeconds: 3.5,
  },
  {
    id: 'turn-2',
    speaker: 'Peterson',
    speakerLabel: 'Peterson',
    speakerLabelEs: 'Peterson',
    textEn: "Oh. Um. I'm writing a report.",
    textEs: 'Oh. Um. Estoy escribiendo un informe.',
    startTimeSeconds: 3.5,
    endTimeSeconds: 7.0,
  },
  {
    id: 'turn-3',
    speaker: 'Boss',
    speakerLabel: 'Boss',
    speakerLabelEs: 'Jefe',
    textEn: "Well, don't put your feet on the desk.",
    textEs: 'Bueno, no pongas tus pies sobre el escritorio.',
    startTimeSeconds: 7.0,
    endTimeSeconds: 11.0,
  },
  {
    id: 'turn-4',
    speaker: 'Peterson',
    speakerLabel: 'Peterson',
    speakerLabelEs: 'Peterson',
    textEn: 'Yes, sir. Sorry.',
    textEs: 'Sí, señor. Lo siento.',
    startTimeSeconds: 11.0,
    endTimeSeconds: 13.5,
  },
  {
    id: 'turn-5',
    speaker: 'Boss',
    speakerLabel: 'Boss',
    speakerLabelEs: 'Jefe',
    textEn: "And tomorrow don't wear jeans. Put on a suit.",
    textEs: 'Y mañana no uses jeans. Ponte un traje.',
    startTimeSeconds: 13.5,
    endTimeSeconds: 17.5,
  },
  {
    id: 'turn-6',
    speaker: 'Peterson',
    speakerLabel: 'Peterson',
    speakerLabelEs: 'Peterson',
    textEn: 'A suit. Ah...sure.',
    textEs: '¿Un traje? Ah... seguro.',
    startTimeSeconds: 17.5,
    endTimeSeconds: 20.0,
  },
];

// -------------------------------------------------------------
// ACTIVIDAD 2: Choose the correct answer (Where does this conversation take place?)
// -------------------------------------------------------------
export const ACTIVIDAD_2_DATA: RadioQuestionData = {
  id: 'act-2',
  activityNumber: 2,
  title: 'Actividad 2: Location',
  titleEs: 'Actividad 2: Ubicación',
  instructionEn: 'Choose the correct answer.',
  instructionEs: 'Elige la respuesta correcta.',
  questionEn: 'Where does this conversation mostly likely take place?',
  questionEs: '¿Dónde es más probable que tenga lugar esta conversación?',
  options: [
    {
      id: 'opt-gym',
      textEn: 'In a gym',
      textEs: 'En un gimnasio',
    },
    {
      id: 'opt-clothing-store',
      textEn: 'In a clothing store',
      textEs: 'En una tienda de ropa',
    },
    {
      id: 'opt-furniture-store',
      textEn: 'In a furniture store',
      textEs: 'En una tienda de muebles',
    },
    {
      id: 'opt-office',
      textEn: 'In an office',
      textEs: 'En una oficina',
    },
  ],
  correctOptionId: 'opt-office',
  explanationEn:
    'Peterson mentions writing a report at a desk and being told not to put his feet on the desk, which clearly takes place in an office environment.',
  explanationEs:
    'Peterson menciona que está escribiendo un informe frente a un escritorio y su jefe le pide que no ponga los pies encima, lo cual ocurre evidentemente en una oficina.',
  highlightedLineId: 'turn-1',
};

// -------------------------------------------------------------
// ACTIVIDAD 3: Choose the correct answer (First speaker relationship)
// -------------------------------------------------------------
export const ACTIVIDAD_3_DATA: RadioQuestionData = {
  id: 'act-3',
  activityNumber: 3,
  title: 'Actividad 3: Relationship',
  titleEs: 'Actividad 3: Relación',
  instructionEn: 'Choose the correct answer.',
  instructionEs: 'Elige la respuesta correcta.',
  questionEn: "The first speaker is probably the second speaker's...",
  questionEs: 'El primer interlocutor es probablemente el... del segundo.',
  options: [
    {
      id: 'opt-father',
      textEn: 'father.',
      textEs: 'padre.',
    },
    {
      id: 'opt-employer',
      textEn: 'employer.',
      textEs: 'empleador / jefe.',
    },
    {
      id: 'opt-teacher',
      textEn: 'teacher.',
      textEs: 'maestro / profesor.',
    },
    {
      id: 'opt-friend',
      textEn: 'friend.',
      textEs: 'amigo.',
    },
  ],
  correctOptionId: 'opt-employer',
  explanationEn:
    'The first speaker calls him Peterson, gives workplace instructions about reports, feet on the desk, and dress code, and Peterson addresses him respectfully as "Yes, sir." This shows he is his employer/boss.',
  explanationEs:
    'El primer hablante le llama "Peterson", le da órdenes directas sobre su conducta y vestimenta de trabajo, y Peterson le responde con respeto "Yes, sir." Por lo tanto, es su empleador o jefe.',
  highlightedLineId: 'turn-3',
};

// -------------------------------------------------------------
// ACTIVIDAD 4: Choose the correct answer (What will he wear tomorrow?)
// -------------------------------------------------------------
export const ACTIVIDAD_4_DATA: RadioQuestionData = {
  id: 'act-4',
  activityNumber: 4,
  title: 'Actividad 4: Clothing',
  titleEs: 'Actividad 4: Vestimenta de Mañana',
  instructionEn: 'Choose the correct answer.',
  instructionEs: 'Elige la respuesta correcta.',
  questionEn: 'What will the second speaker probably wear tomorrow?',
  questionEs: '¿Qué vestirá probablemente el segundo interlocutor mañana?',
  options: [
    {
      id: 'opt-shoes',
      textEn: 'New shoes',
      textEs: 'Zapatos nuevos',
    },
    {
      id: 'opt-tshirt',
      textEn: 'A T-shirt',
      textEs: 'Una camiseta',
    },
    {
      id: 'opt-suit',
      textEn: 'A suit',
      textEs: 'Un traje',
    },
    {
      id: 'opt-jeans',
      textEn: 'Jeans',
      textEs: 'Vaqueros / Jeans',
    },
  ],
  correctOptionId: 'opt-suit',
  explanationEn:
    'The boss explicitly instructs him: "And tomorrow don\'t wear jeans. Put on a suit." Peterson agrees: "A suit. Ah...sure."',
  explanationEs:
    'El jefe le da la orden clara: "And tomorrow don\'t wear jeans. Put on a suit." Peterson acepta diciendo que llevará un traje.',
  highlightedLineId: 'turn-5',
};

// -------------------------------------------------------------
// ACTIVIDAD 5: Choose the correct answer (Why does he apologize?)
// -------------------------------------------------------------
export const ACTIVIDAD_5_DATA: RadioQuestionData = {
  id: 'act-5',
  activityNumber: 5,
  title: 'Actividad 5: Apology',
  titleEs: 'Actividad 5: La Disculpa',
  instructionEn: 'Choose the correct answer.',
  instructionEs: 'Elige la respuesta correcta.',
  questionEn: 'Why does the second speaker apologize?',
  questionEs: '¿Por qué se disculpa el segundo interlocutor?',
  options: [
    {
      id: 'opt-finish-report',
      textEn: "He didn't finish his report.",
      textEs: 'No terminó su informe.',
    },
    {
      id: 'opt-good-morning',
      textEn: "He didn't say good morning.",
      textEs: 'No dijo buenos días.',
    },
    {
      id: 'opt-came-late',
      textEn: 'He came late to work.',
      textEs: 'Llegó tarde al trabajo.',
    },
    {
      id: 'opt-feet-desk',
      textEn: 'He put his feet on his desk.',
      textEs: 'Puso sus pies sobre su escritorio.',
    },
  ],
  correctOptionId: 'opt-feet-desk',
  explanationEn:
    'When the boss says "Well, don\'t put your feet on the desk", Peterson immediately replies "Yes, sir. Sorry."',
  explanationEs:
    'Cuando el jefe le llama la atención diciéndole "Well, don\'t put your feet on the desk", Peterson responde de inmediato "Yes, sir. Sorry."',
  highlightedLineId: 'turn-3',
};

// -------------------------------------------------------------
// ACTIVIDAD 6: Best response to statement ("Don't put your feet on the desk.")
// -------------------------------------------------------------
export const ACTIVIDAD_6_DATA: BestResponseActivityData = {
  id: 'act-6',
  activityNumber: 6,
  title: 'Actividad 6: Response 1',
  titleEs: 'Actividad 6: Mejor Respuesta 1',
  instructionEn: "What's the best response to the statement?",
  instructionEs: '¿Cuál es la mejor respuesta a la afirmación?',
  subInstructionEn: "Click 'Start' to record the correct answer.",
  subInstructionEs: "Haz clic en 'Start' o en una opción para registrar la respuesta correcta.",
  promptTextEn: "Don't put your feet on the desk.",
  promptTextEs: 'No pongas tus pies sobre el escritorio.',
  promptSpeaker: 'Boss',
  options: [
    {
      id: 'opt-tomorrow-ok',
      textEn: 'Tomorrow is OK.',
      textEs: 'Mañana está bien.',
    },
    {
      id: 'opt-yes-sir-sorry',
      textEn: 'Yes, sir. Sorry.',
      textEs: 'Sí, señor. Lo siento.',
    },
    {
      id: 'opt-its-on-chair',
      textEn: "It's on the chair.",
      textEs: 'Está sobre la silla.',
    },
  ],
  correctOptionId: 'opt-yes-sir-sorry',
  explanationEn:
    'When receiving an order or reprimand from a supervisor not to put feet on the desk, the appropriate polite acknowledgment and apology is "Yes, sir. Sorry."',
  explanationEs:
    'Ante una orden directa o llamado de atención del supervisor para no poner los pies sobre el escritorio, la respuesta educada y correcta es "Yes, sir. Sorry."',
  highlightedLineId: 'turn-3',
};

// -------------------------------------------------------------
// ACTIVIDAD 7: Best response to question ("What are you doing?")
// -------------------------------------------------------------
export const ACTIVIDAD_7_DATA: BestResponseActivityData = {
  id: 'act-7',
  activityNumber: 7,
  title: 'Actividad 7: Response 2',
  titleEs: 'Actividad 7: Mejor Respuesta 2',
  instructionEn: "What's the best response to the question?",
  instructionEs: '¿Cuál es la mejor respuesta a la pregunta?',
  subInstructionEn: "Click 'Start' to record the correct answer.",
  subInstructionEs: "Haz clic en 'Start' o en una opción para registrar la respuesta correcta.",
  promptTextEn: 'What are you doing?',
  promptTextEs: '¿Qué estás haciendo?',
  promptSpeaker: 'Boss',
  options: [
    {
      id: 'opt-okay-i-wont',
      textEn: "Okay, I won't.",
      textEs: 'De acuerdo, no lo haré.',
    },
    {
      id: 'opt-writing-report',
      textEn: "I'm writing a report.",
      textEs: 'Estoy escribiendo un informe.',
    },
    {
      id: 'opt-new-suit',
      textEn: "It's a new suit.",
      textEs: 'Es un traje nuevo.',
    },
  ],
  correctOptionId: 'opt-writing-report',
  explanationEn:
    'The question asks about current activity ("What are you doing?"), so the direct, grammatically correct answer in Present Continuous is "I\'m writing a report."',
  explanationEs:
    'La pregunta indaga sobre la actividad en curso ("What are you doing?"), por lo que la respuesta coherente en presente continuo es "I\'m writing a report."',
  highlightedLineId: 'turn-1',
};

// -------------------------------------------------------------
// 3 INTERACTIONS (Guaranteed order and content)
// -------------------------------------------------------------
export const INTERACCION_1_DATA: DontDoThatInteractionData = {
  id: 'interaccion-1',
  interactionNumber: 1,
  title: 'Interacción 1 de 3',
  titleEs: 'Interacción 1 de 3',
  instructionEn: "Click 'Start' to begin the conversation.",
  instructionEs: "Haz clic en 'Start' para comenzar la conversación.",
  dialogueTurns: [
    {
      id: 'i1-t1',
      speaker: 'Boss',
      speakerLabel: 'Boss',
      speakerLabelEs: 'Jefe',
      textEn: 'Peterson, what are you doing?',
      textEs: 'Peterson, ¿qué estás haciendo?',
    },
    {
      id: 'i1-t2',
      speaker: 'Peterson',
      speakerLabel: 'Peterson',
      speakerLabelEs: 'Peterson',
      textEn: "Oh. Um. I'm writing a report.",
      textEs: 'Oh. Um. Estoy escribiendo un informe.',
    },
  ],
};

export const INTERACCION_2_DATA: DontDoThatInteractionData = {
  id: 'interaccion-2',
  interactionNumber: 2,
  title: 'Interacción 2 de 3',
  titleEs: 'Interacción 2 de 3',
  instructionEn: 'Prepare to speak...',
  instructionEs: 'Prepárate para hablar...',
  badgeNumber: 2,
  dialogueTurns: [
    {
      id: 'i2-t1',
      speaker: 'Boss',
      speakerLabel: 'Boss',
      speakerLabelEs: 'Jefe',
      textEn: "Well, don't put your feet on the desk.",
      textEs: 'Bueno, no pongas tus pies sobre el escritorio.',
    },
    {
      id: 'i2-t2',
      speaker: 'Peterson',
      speakerLabel: 'Peterson',
      speakerLabelEs: 'Peterson',
      textEn: 'Yes, sir. Sorry.',
      textEs: 'Sí, señor. Lo siento.',
    },
  ],
};

export const INTERACCION_3_DATA: DontDoThatInteractionData = {
  id: 'interaccion-3',
  interactionNumber: 3,
  title: 'Interacción 3 de 3',
  titleEs: 'Interacción 3 de 3',
  instructionEn: 'Prepare to speak...',
  instructionEs: 'Prepárate para hablar...',
  badgeNumber: 1,
  dialogueTurns: [
    {
      id: 'i3-t1',
      speaker: 'Boss',
      speakerLabel: 'Boss',
      speakerLabelEs: 'Jefe',
      textEn: "And tomorrow don't wear jeans. Put on a suit.",
      textEs: 'Y mañana no uses jeans. Ponte un traje.',
    },
    {
      id: 'i3-t2',
      speaker: 'Peterson',
      speakerLabel: 'Peterson',
      speakerLabelEs: 'Peterson',
      textEn: 'A suit. Ah...sure.',
      textEs: '¿Un traje? Ah... seguro.',
    },
  ],
};
