export interface CanIDialogueTurn {
  id: string;
  speaker: 'Tommy' | 'Mother';
  speakerLabel: string;
  speakerLabelEs: string;
  en: string;
  es: string;
  startTime: number; // in seconds
  endTime: number;
}

export const CAN_I_DIALOGUE: CanIDialogueTurn[] = [
  {
    id: 'turn-1',
    speaker: 'Tommy',
    speakerLabel: 'Tommy',
    speakerLabelEs: 'Tommy',
    en: 'Mom, can I go to see the trains?',
    es: 'Mamá, ¿puedo ir a ver los trenes?',
    startTime: 0,
    endTime: 4,
  },
  {
    id: 'turn-2',
    speaker: 'Mother',
    speakerLabel: 'Mother',
    speakerLabelEs: 'Madre',
    en: "No, Tommy. I don't want you out there alone.",
    es: 'No, Tommy. No quiero que estés ahí afuera solo.',
    startTime: 4,
    endTime: 8,
  },
  {
    id: 'turn-3',
    speaker: 'Tommy',
    speakerLabel: 'Tommy',
    speakerLabelEs: 'Tommy',
    en: 'Then is it OK if I play with that little boy?',
    es: '¿Entonces está bien si juego con ese niño pequeño?',
    startTime: 8,
    endTime: 12,
  },
  {
    id: 'turn-4',
    speaker: 'Mother',
    speakerLabel: 'Mother',
    speakerLabelEs: 'Madre',
    en: 'Well, all right. But stay near the door where I can see you.',
    es: 'Bueno, está bien. Pero quédate cerca de la puerta donde pueda verte.',
    startTime: 12,
    endTime: 16,
  },
];

export const CAN_I_FULL_TRANSCRIPT_EN = CAN_I_DIALOGUE.map(
  (t) => `- ${t.en}`
).join('\n');

export const CAN_I_FULL_TRANSCRIPT_ES = CAN_I_DIALOGUE.map(
  (t) => `- ${t.es}`
).join('\n');

/* =========================================================================
   ACTIVIDADES 2, 3, 4, 5, 6: CHOOSE THE CORRECT ANSWER (Radio Choice)
   ========================================================================= */
export interface CanIRadioQuestion {
  id: string;
  activityNumber: number;
  instructionEn: string;
  instructionEs: string;
  questionEn: string;
  questionEs: string;
  options: {
    id: string;
    textEn: string;
    textEs: string;
  }[];
  correctOptionId: string;
}

// Actividad 2 (actividad 2.png)
export const ACTIVIDAD_2_DATA: CanIRadioQuestion = {
  id: 'can-i-act-2',
  activityNumber: 2,
  instructionEn: 'Choose the correct answer.',
  instructionEs: 'Elige la respuesta correcta.',
  questionEn: 'The speakers are...',
  questionEs: 'Los hablantes son...',
  options: [
    {
      id: 'opt-mother-son',
      textEn: 'mother and son.',
      textEs: 'madre e hijo.',
    },
    {
      id: 'opt-passenger-conductor',
      textEn: 'passenger and train conductor.',
      textEs: 'pasajero y revisor del tren.',
    },
    {
      id: 'opt-student-teacher',
      textEn: 'student and teacher.',
      textEs: 'estudiante y profesor(a).',
    },
    {
      id: 'opt-brother-sister',
      textEn: 'brother and sister.',
      textEs: 'hermano y hermana.',
    },
  ],
  correctOptionId: 'opt-mother-son',
};

// Actividad 3 (actividad 3.png)
export const ACTIVIDAD_3_DATA: CanIRadioQuestion = {
  id: 'can-i-act-3',
  activityNumber: 3,
  instructionEn: 'Choose the correct answer.',
  instructionEs: 'Elige la respuesta correcta.',
  questionEn: 'What does the boy want to do?',
  questionEs: '¿Qué quiere hacer el niño?',
  options: [
    {
      id: 'opt-watch-trains',
      textEn: 'Go and watch the trains',
      textEs: 'Ir a mirar los trenes',
    },
    {
      id: 'opt-boys-house',
      textEn: "Go play at a boy's house",
      textEs: 'Ir a jugar a la casa de un niño',
    },
    {
      id: 'opt-school-alone',
      textEn: 'Walk to school alone',
      textEs: 'Caminar a la escuela solo',
    },
    {
      id: 'opt-ride-train',
      textEn: 'Ride on a train alone',
      textEs: 'Viajar en un tren solo',
    },
  ],
  correctOptionId: 'opt-watch-trains',
};

// Actividad 4 (actividad 4.png)
export const ACTIVIDAD_4_DATA: CanIRadioQuestion = {
  id: 'can-i-act-4',
  activityNumber: 4,
  instructionEn: 'Choose the correct answer.',
  instructionEs: 'Elige la respuesta correcta.',
  questionEn: "Why doesn't the woman want the boy to see the trains?",
  questionEs: '¿Por qué la mujer no quiere que el niño vaya a ver los trenes?',
  options: [
    {
      id: 'opt-play-another-boy',
      textEn: 'He needs to go play with another boy.',
      textEs: 'Él necesita ir a jugar con otro niño.',
    },
    {
      id: 'opt-no-time-drive',
      textEn: "She doesn't have time to drive him there.",
      textEs: 'Ella no tiene tiempo para llevarlo en auto.',
    },
    {
      id: 'opt-trains-noisy',
      textEn: 'The trains are too noisy.',
      textEs: 'Los trenes son demasiado ruidosos.',
    },
    {
      id: 'opt-alone-there',
      textEn: "She doesn't want him to be there alone.",
      textEs: 'Ella no quiere que él esté allí solo.',
    },
  ],
  correctOptionId: 'opt-alone-there',
};

// Actividad 5 (actividad 5.png)
export const ACTIVIDAD_5_DATA: CanIRadioQuestion = {
  id: 'can-i-act-5',
  activityNumber: 5,
  instructionEn: 'Choose the correct answer.',
  instructionEs: 'Elige la respuesta correcta.',
  questionEn: 'Why does the woman want the boy to stay near the door?',
  questionEs: '¿Por qué la mujer quiere que el niño se quede cerca de la puerta?',
  options: [
    {
      id: 'opt-see-boy-playing',
      textEn: 'So he can see the little boy playing',
      textEs: 'Para que él pueda ver jugar al niño pequeño',
    },
    {
      id: 'opt-leave-train-quickly',
      textEn: 'So they can leave the train quickly',
      textEs: 'Para que puedan salir del tren rápidamente',
    },
    {
      id: 'opt-she-can-see-him',
      textEn: 'So she can see him',
      textEs: 'Para que ella pueda verlo',
    },
    {
      id: 'opt-wont-miss-train',
      textEn: "So they won't miss the train",
      textEs: 'Para que no pierdan el tren',
    },
  ],
  correctOptionId: 'opt-she-can-see-him',
};

// Actividad 6 (actividad 6.png)
export const ACTIVIDAD_6_DATA: CanIRadioQuestion = {
  id: 'can-i-act-6',
  activityNumber: 6,
  instructionEn: 'Choose the correct answer.',
  instructionEs: 'Elige la respuesta correcta.',
  questionEn: 'What will the boy probably do next?',
  questionEs: '¿Qué hará probablemente el niño a continuación?',
  options: [
    {
      id: 'opt-get-on-train',
      textEn: 'Get on the train',
      textEs: 'Subir al tren',
    },
    {
      id: 'opt-open-door',
      textEn: 'Open the door',
      textEs: 'Abrir la puerta',
    },
    {
      id: 'opt-go-see-trains',
      textEn: 'Go see the trains',
      textEs: 'Ir a ver los trenes',
    },
    {
      id: 'opt-play-little-boy',
      textEn: 'Play with a little boy',
      textEs: 'Jugar con un niño pequeño',
    },
  ],
  correctOptionId: 'opt-play-little-boy',
};

/* =========================================================================
   ACTIVIDADES 7 & 8: WHAT'S THE BEST RESPONSE TO THE QUESTION?
   ========================================================================= */
export interface CanIBestResponseActivity {
  id: string;
  activityNumber: number;
  instructionEn: string;
  instructionEs: string;
  subInstructionEn: string;
  subInstructionEs: string;
  promptQuestionEn: string;
  promptQuestionEs: string;
  options: {
    id: string;
    textEn: string;
    textEs: string;
  }[];
  correctOptionId: string;
}

// Actividad 7 (actividad 7.png)
export const ACTIVIDAD_7_DATA: CanIBestResponseActivity = {
  id: 'can-i-act-7',
  activityNumber: 7,
  instructionEn: "What's the best response to the question?",
  instructionEs: '¿Cuál es la mejor respuesta a la pregunta?',
  subInstructionEn: "Click 'Start' to record the correct answer.",
  subInstructionEs: "Haz clic en 'Start' para grabar la respuesta correcta (o selecciona una opción).",
  promptQuestionEn: '"Can I go to see the trains?"',
  promptQuestionEs: '"¿Puedo ir a ver los trenes?"',
  options: [
    {
      id: 'opt-train-late',
      textEn: 'The train is late.',
      textEs: 'El tren está retrasado.',
    },
    {
      id: 'opt-dont-want-alone',
      textEn: "I don't want you out there alone.",
      textEs: 'No quiero que estés ahí afuera solo.',
    },
    {
      id: 'opt-dont-lose-ticket',
      textEn: "Don't lose your ticket.",
      textEs: 'No pierdas tu boleto/billete.',
    },
  ],
  correctOptionId: 'opt-dont-want-alone',
};

// Actividad 8 (actividad 8.png)
export const ACTIVIDAD_8_DATA: CanIBestResponseActivity = {
  id: 'can-i-act-8',
  activityNumber: 8,
  instructionEn: "What's the best response to the question?",
  instructionEs: '¿Cuál es la mejor respuesta a la pregunta?',
  subInstructionEn: "Click 'Start' to record the correct answer.",
  subInstructionEs: "Haz clic en 'Start' para grabar la respuesta correcta (o selecciona una opción).",
  promptQuestionEn: '"Is it OK if I play with that little boy?"',
  promptQuestionEs: '"¿Está bien si juego con ese niño pequeño?"',
  options: [
    {
      id: 'opt-near-door',
      textEn: 'Near the door',
      textEs: 'Cerca de la puerta',
    },
    {
      id: 'opt-well-all-right',
      textEn: 'Well, all right.',
      textEs: 'Bueno, está bien.',
    },
    {
      id: 'opt-lets-play',
      textEn: "Let's play.",
      textEs: 'Juguemos.',
    },
  ],
  correctOptionId: 'opt-well-all-right',
};

/* =========================================================================
   INTERACCIONES 1 & 2: CONVERSATION PRACTICE
   ========================================================================= */
export interface CanIInteractionData {
  id: string;
  interactionNumber: number; // 1 or 2
  titleEn: string;
  titleEs: string;
  instructionEn: string;
  instructionEs: string;
  dialogueTurns: {
    speaker: 'Tommy' | 'Mother';
    speakerLabel: string;
    speakerLabelEs: string;
    textEn: string;
    textEs: string;
  }[];
}

// Interacción 1 de 2 (interaccion 1 de 2.png)
export const INTERACCION_1_DATA: CanIInteractionData = {
  id: 'can-i-interaccion-1',
  interactionNumber: 1,
  titleEn: 'Interaction 1 of 2',
  titleEs: 'Interacción 1 de 2',
  instructionEn: "Click 'Start' to begin the conversation.",
  instructionEs: "Haz clic en 'Start' para iniciar la conversación.",
  dialogueTurns: [
    {
      speaker: 'Tommy',
      speakerLabel: 'Tommy (Hijo)',
      speakerLabelEs: 'Tommy (Hijo)',
      textEn: 'Mom, can I go to see the trains?',
      textEs: 'Mamá, ¿puedo ir a ver los trenes?',
    },
    {
      speaker: 'Mother',
      speakerLabel: 'Mother (Madre)',
      speakerLabelEs: 'Madre',
      textEn: "No, Tommy. I don't want you out there alone.",
      textEs: 'No, Tommy. No quiero que estés ahí afuera solo.',
    },
  ],
};

// Interacción 2 de 2 (interaccion 2 de 2.png)
export const INTERACCION_2_DATA: CanIInteractionData = {
  id: 'can-i-interaccion-2',
  interactionNumber: 2,
  titleEn: 'Interaction 2 of 2',
  titleEs: 'Interacción 2 de 2',
  instructionEn: 'Prepare to speak...',
  instructionEs: 'Prepárate para hablar...',
  dialogueTurns: [
    {
      speaker: 'Tommy',
      speakerLabel: 'Tommy (Hijo)',
      speakerLabelEs: 'Tommy (Hijo)',
      textEn: 'Then is it OK if I play with that little boy?',
      textEs: '¿Entonces está bien si juego con ese niño pequeño?',
    },
    {
      speaker: 'Mother',
      speakerLabel: 'Mother (Madre)',
      speakerLabelEs: 'Madre',
      textEn: 'Well, all right. But stay near the door where I can see you.',
      textEs: 'Bueno, está bien. Pero quédate cerca de la puerta donde pueda verte.',
    },
  ],
};
