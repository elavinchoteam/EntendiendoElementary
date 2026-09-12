import newsstandImg from '../assets/images/newsstand_dialogue_1789247895750.jpg';

export { newsstandImg };

export interface NewsstandSentence {
  id: string;
  speaker: 'Man' | 'Woman';
  speakerEs: 'Hombre' | 'Mujer';
  en: string;
  es: string;
  startTime: number;
  endTime: number;
}

export const NEWSSTAND_SENTENCES: NewsstandSentence[] = [
  {
    id: 'ns-line-1',
    speaker: 'Man',
    speakerEs: 'Hombre',
    en: "Excuse me. Isn't there a train station near here?",
    es: 'Disculpe. ¿No hay una estación de tren cerca de aquí?',
    startTime: 0,
    endTime: 4,
  },
  {
    id: 'ns-line-2',
    speaker: 'Woman',
    speakerEs: 'Mujer',
    en: "Ah, I'm not sure, sir. I'm new here.",
    es: 'Ah, no estoy segura, señor. Soy nueva aquí.',
    startTime: 4,
    endTime: 7,
  },
  {
    id: 'ns-line-3',
    speaker: 'Man',
    speakerEs: 'Hombre',
    en: 'Do you sell maps?',
    es: '¿Venden mapas?',
    startTime: 7,
    endTime: 9,
  },
  {
    id: 'ns-line-4',
    speaker: 'Woman',
    speakerEs: 'Mujer',
    en: "I don't think so.",
    es: 'Me parece que no.',
    startTime: 9,
    endTime: 11,
  },
  {
    id: 'ns-line-5',
    speaker: 'Man',
    speakerEs: 'Hombre',
    en: 'Are you sure? Please look.',
    es: '¿Está segura? Por favor fíjese.',
    startTime: 11,
    endTime: 14,
  },
  {
    id: 'ns-line-6',
    speaker: 'Woman',
    speakerEs: 'Mujer',
    en: "Well, I don't see any.",
    es: 'Bueno, no veo ninguno.',
    startTime: 14,
    endTime: 17,
  },
];

export const NEWSSTAND_AUDIO_TEXT =
  "Excuse me. Isn't there a train station near here? Ah, I'm not sure, sir. I'm new here. Do you sell maps? I don't think so. Are you sure? Please look. Well, I don't see any.";

export const NEWSSTAND_FULL_ES =
  'Disculpe. ¿No hay una estación de tren cerca de aquí? Ah, no estoy segura, señor. Soy nueva aquí. ¿Venden mapas? Me parece que no. ¿Está segura? Por favor fíjese. Bueno, no veo ninguno.';

// Common question interface
export interface NewsstandRadioQuestion {
  id: string;
  instructionsEn: string;
  instructionsEs: string;
  question: string;
  questionEs: string;
  explanation: string;
  explanationEs: string;
  correctAnswerId: string;
  options: {
    id: string;
    text: string;
    textEs: string;
    isCorrect: boolean;
  }[];
}

// Actividad 2 Data
export const ACTIVITY_2_DATA: NewsstandRadioQuestion = {
  id: 'ns-act-2',
  instructionsEn: 'Choose the correct answer.',
  instructionsEs: 'Elige la respuesta correcta.',
  question: 'Who most likely are the speakers?',
  questionEs: '¿Quiénes son más probablemente los hablantes?',
  explanation:
    'The man addresses the woman with "Excuse me" and asks for directions, while the woman calls him "sir" and explains she is new to the job. They are polite strangers.',
  explanationEs:
    'El hombre se dirige a la mujer con "Excuse me" y le pide indicaciones, mientras que la mujer lo llama "sir" y explica que es nueva en el lugar. Son desconocidos.',
  correctAnswerId: 'opt-strangers',
  options: [
    { id: 'opt-friends', text: 'Friends', textEs: 'Amigos', isCorrect: false },
    { id: 'opt-strangers', text: 'Strangers', textEs: 'Desconocidos', isCorrect: true },
    { id: 'opt-father-daughter', text: 'A father and a daughter', textEs: 'Un padre y una hija', isCorrect: false },
    { id: 'opt-husband-wife', text: 'A husband and a wife', textEs: 'Un esposo y una esposa', isCorrect: false },
  ],
};

// Actividad 3 Data
export const ACTIVITY_3_DATA: NewsstandRadioQuestion = {
  id: 'ns-act-3',
  instructionsEn: 'Choose the correct answer.',
  instructionsEs: 'Elige la respuesta correcta.',
  question: 'What does the man want to buy?',
  questionEs: '¿Qué quiere comprar el hombre?',
  explanation: 'The man explicitly asks the newsstand clerk: "Do you sell maps?", showing he wants to buy a map.',
  explanationEs: 'El hombre le pregunta explícitamente a la dependienta: "¿Venden mapas?", demostrando que desea comprar un mapa.',
  correctAnswerId: 'opt-map',
  options: [
    { id: 'opt-ticket', text: 'A train ticket', textEs: 'Un billete de tren', isCorrect: false },
    { id: 'opt-schedule', text: 'A bus schedule', textEs: 'Un horario de autobús', isCorrect: false },
    { id: 'opt-map', text: 'A map', textEs: 'Un mapa', isCorrect: true },
    { id: 'opt-newspaper', text: 'A newspaper', textEs: 'Un periódico', isCorrect: false },
  ],
};

// Actividad 4 Data
export const ACTIVITY_4_DATA: NewsstandRadioQuestion = {
  id: 'ns-act-4',
  instructionsEn: 'Choose the correct answer.',
  instructionsEs: 'Elige la respuesta correcta.',
  question: "Why can't the woman help the man?",
  questionEs: '¿Por qué la mujer no puede ayudar al hombre?',
  explanation:
    'The woman says: "Ah, I\'m not sure, sir. I\'m new here." Because she has just started working or living in this area, she does not know where the station is.',
  explanationEs:
    'La mujer dice: "Ah, I\'m not sure, sir. I\'m new here." Como es nueva en el lugar, no conoce la ubicación de la estación ni los mapas disponibles.',
  correctAnswerId: 'opt-new-area',
  options: [
    { id: 'opt-new-area', text: 'She is new to the area.', textEs: 'Ella es nueva en la zona.', isCorrect: true },
    { id: 'opt-never-train', text: 'She never takes the train.', textEs: 'Ella nunca toma el tren.', isCorrect: false },
    { id: 'opt-not-understand', text: "She doesn't understand him.", textEs: 'Ella no lo comprende.', isCorrect: false },
    { id: 'opt-no-time', text: "She doesn't have time.", textEs: 'Ella no tiene tiempo.', isCorrect: false },
  ],
};

// Actividad 5 Data
export const ACTIVITY_5_DATA: NewsstandRadioQuestion = {
  id: 'ns-act-5',
  instructionsEn: 'Choose the correct answer.',
  instructionsEs: 'Elige la respuesta correcta.',
  question: 'Why does the man say, "Excuse me"?',
  questionEs: '¿Por qué dice el hombre, "Excuse me"?',
  explanation:
    '"Excuse me" is an essential courteous English phrase used to politely get someone\'s attention before asking a question or making a request.',
  explanationEs:
    '"Excuse me" es una frase cortés fundamental en inglés para llamar la atención de alguien de manera educada antes de hacer una pregunta.',
  correctAnswerId: 'opt-attention',
  options: [
    { id: 'opt-thank', text: 'To thank the woman for her help', textEs: 'Para agradecer a la mujer por su ayuda', isCorrect: false },
    { id: 'opt-sorry', text: "To tell the woman he's sorry", textEs: 'Para decirle a la mujer que lo lamenta', isCorrect: false },
    { id: 'opt-move', text: 'To ask the woman to move over', textEs: 'Para pedirle a la mujer que se mueva a un lado', isCorrect: false },
    { id: 'opt-attention', text: "To get the woman's attention", textEs: 'Para llamar la atención de la mujer', isCorrect: true },
  ],
};

// Actividad 6 Data: Best response to "Isn't there a train station near here?"
export interface NewsstandResponseQuestion {
  id: string;
  instructionsEn: string;
  instructionsEs: string;
  promptQuestionEn: string;
  promptQuestionEs: string;
  explanation: string;
  explanationEs: string;
  correctAnswerId: string;
  options: {
    id: string;
    text: string;
    textEs: string;
    isCorrect: boolean;
  }[];
}

export const ACTIVITY_6_DATA: NewsstandResponseQuestion = {
  id: 'ns-act-6',
  instructionsEn: "What's the best response to the question?",
  instructionsEs: '¿Cuál es la mejor respuesta a la pregunta?',
  promptQuestionEn: "Isn't there a train station near here?",
  promptQuestionEs: '¿No hay una estación de tren cerca de aquí?',
  explanation:
    'In the dialogue, when asked "Isn\'t there a train station near here?", the woman politely replies "Ah, I\'m not sure, sir." (or "I\'m not sure, sir.").',
  explanationEs:
    'En el diálogo, cuando le preguntan "¿No hay una estación de tren cerca de aquí?", la mujer responde con cortesía: "I\'m not sure, sir."',
  correctAnswerId: 'opt-6-sure',
  options: [
    { id: 'opt-6-look', text: 'Please look.', textEs: 'Por favor fíjese.', isCorrect: false },
    { id: 'opt-6-sure', text: "I'm not sure, sir.", textEs: 'No estoy segura, señor.', isCorrect: true },
    { id: 'opt-6-none', text: "I don't see any.", textEs: 'No veo ninguno.', isCorrect: false },
  ],
};

// Actividad 7 Data: Best response to "Do you sell maps?" with Speech / Listening
export const ACTIVITY_7_DATA: NewsstandResponseQuestion = {
  id: 'ns-act-7',
  instructionsEn: "What's the best response to the question?",
  instructionsEs: '¿Cuál es la mejor respuesta a la pregunta?',
  promptQuestionEn: 'Do you sell maps?',
  promptQuestionEs: '¿Venden mapas?',
  explanation:
    'When the customer asks "Do you sell maps?", the clerk responds "I don\'t think so." because she does not believe they carry maps at the newsstand.',
  explanationEs:
    'Cuando el cliente pregunta "¿Venden mapas?", la empleada responde "I don\'t think so." (Me parece que no / No creo).',
  correctAnswerId: 'opt-7-think',
  options: [
    { id: 'opt-7-think', text: "I don't think so.", textEs: 'Me parece que no.', isCorrect: true },
    { id: 'opt-7-excuse', text: 'Excuse me.', textEs: 'Disculpe.', isCorrect: false },
    { id: 'opt-7-new', text: "I'm new here.", textEs: 'Soy nueva aquí.', isCorrect: false },
  ],
};

// Actividad 8: Interacción (Interactive Character Roleplay)
export interface NewsstandRoleplayCharacter {
  id: 'man' | 'woman';
  name: string;
  nameEs: string;
  role: string;
  roleEs: string;
  voiceGender: 'male' | 'female';
}

export const NEWSSTAND_CHARACTERS: NewsstandRoleplayCharacter[] = [
  {
    id: 'man',
    name: 'Customer (Man)',
    nameEs: 'Cliente (Hombre)',
    role: 'Asking for directions & maps',
    roleEs: 'Pide indicaciones y mapas',
    voiceGender: 'male',
  },
  {
    id: 'woman',
    name: 'Clerk (Woman)',
    nameEs: 'Vendedora (Mujer)',
    role: 'Newsstand employee new to the job',
    roleEs: 'Empleada del quiosco nueva en el puesto',
    voiceGender: 'female',
  },
];
