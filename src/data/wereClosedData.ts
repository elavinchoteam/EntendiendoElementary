import storeClosedImg from '../assets/images/wc_store_closed_1788648289992.jpg';

export { storeClosedImg };

export interface WereClosedLine {
  id: number;
  speaker: 'Clerk' | 'Customer';
  speakerEs: 'Dependiente' | 'Cliente';
  textEn: string;
  textEs: string;
  voiceGender: 'male' | 'female';
}

export const WERE_CLOSED_FULL_AUDIO =
  "Sorry, sir. We're closed. Closed? But it's only one o'clock. That's right. We usually close for lunch. Oh. What are your hours? Nine to one, and two-thirty to six. I see. Well, thanks.";

export const WERE_CLOSED_FULL_ES =
  "- Lo siento, señor. Estamos cerrados.\n- ¿Cerrados? Pero si es solo la una en punto.\n- Así es. Usualmente cerramos para almorzar.\n- Oh. ¿Cuál es su horario?\n- De nueve a una, y de dos y media a seis.\n- Ya veo. Bueno, gracias.";

export const WERE_CLOSED_DIALOGUE: WereClosedLine[] = [
  {
    id: 1,
    speaker: 'Clerk',
    speakerEs: 'Dependiente',
    textEn: "Sorry, sir. We're closed.",
    textEs: "Lo siento, señor. Estamos cerrados.",
    voiceGender: 'male',
  },
  {
    id: 2,
    speaker: 'Customer',
    speakerEs: 'Cliente',
    textEn: "Closed? But it's only one o'clock.",
    textEs: "¿Cerrados? Pero si es solo la una en punto.",
    voiceGender: 'male',
  },
  {
    id: 3,
    speaker: 'Clerk',
    speakerEs: 'Dependiente',
    textEn: "That's right. We usually close for lunch.",
    textEs: "Así es. Usualmente cerramos para almorzar.",
    voiceGender: 'male',
  },
  {
    id: 4,
    speaker: 'Customer',
    speakerEs: 'Cliente',
    textEn: "Oh. What are your hours?",
    textEs: "Oh. ¿Cuál es su horario?",
    voiceGender: 'male',
  },
  {
    id: 5,
    speaker: 'Clerk',
    speakerEs: 'Dependiente',
    textEn: "Nine to one, and two-thirty to six.",
    textEs: "De nueve a una, y de dos y media a seis.",
    voiceGender: 'male',
  },
  {
    id: 6,
    speaker: 'Customer',
    speakerEs: 'Cliente',
    textEn: "I see. Well, thanks.",
    textEs: "Ya veo. Bueno, gracias.",
    voiceGender: 'male',
  },
];

// ---------------------------------------------------------------------------
// 3 INTERACCIONES EN ORDEN EXACTO (interaccion 1 de 3.png a 3 de 3.png)
// ---------------------------------------------------------------------------
export interface InteractionTurn {
  speaker: 'Clerk' | 'Customer';
  speakerEs: 'Dependiente' | 'Cliente';
  role: 'clerk' | 'customer';
  textEn: string;
  textEs: string;
  audioText: string;
  expectedText: string;
  keywords: string[];
}

export interface WereClosedInteractionItem {
  id: string;
  partNumber: number; // 1, 2, 3
  title: string;
  instructions: string;
  instructionsEs: string;
  badgeNumber?: number;
  hasRedIndicator?: boolean;
  turns: InteractionTurn[];
  practicePromptEn: string;
  practicePromptEs: string;
  explanationEn: string;
  explanationEs: string;
}

export const WERE_CLOSED_INTERACTIONS: WereClosedInteractionItem[] = [
  // Interacción 1 de 3 (interaccion 1 de 3.png)
  {
    id: 'wc-interact-1',
    partNumber: 1,
    title: 'Interacción 1 de 3',
    instructions: "Click 'Start' to begin the conversation.",
    instructionsEs: "Haz clic en 'Start' para iniciar la conversación.",
    turns: [
      {
        speaker: 'Clerk',
        speakerEs: 'Dependiente',
        role: 'clerk',
        textEn: "Sorry, sir. We're closed.",
        textEs: "Lo siento, señor. Estamos cerrados.",
        audioText: "Sorry, sir. We're closed.",
        expectedText: "Sorry, sir. We're closed.",
        keywords: ['sorry', 'sir', 'closed', "we're"],
      },
      {
        speaker: 'Customer',
        speakerEs: 'Cliente',
        role: 'customer',
        textEn: "Closed? But it's only one o'clock.",
        textEs: "¿Cerrados? Pero si es solo la una en punto.",
        audioText: "Closed? But it's only one o'clock.",
        expectedText: "Closed? But it's only one o'clock.",
        keywords: ['closed', 'only', 'one', "o'clock"],
      },
    ],
    practicePromptEn: "The clerk tells you the store is closed. Express your surprise that it is only one o'clock.",
    practicePromptEs: "El dependiente te avisa que están cerrados. Expresa tu sorpresa porque apenas es la una en punto.",
    explanationEn:
      "Line 1 (Clerk): 'Sorry, sir. We're closed.' Line 2 (Customer): 'Closed? But it's only one o'clock.' Expressing surprise about the store being closed during regular midday hours.",
    explanationEs:
      "Línea 1 (Dependiente): 'Lo siento, señor. Estamos cerrados.' Línea 2 (Cliente): '¿Cerrados? Pero si es solo la una en punto.' Expresa sorpresa al encontrar el establecimiento cerrado al mediodía.",
  },
  // Interacción 2 de 3 (interaccion 2 de 3.png)
  {
    id: 'wc-interact-2',
    partNumber: 2,
    title: 'Interacción 2 de 3',
    badgeNumber: 2,
    instructions: "Click 'Start' to begin the conversation.",
    instructionsEs: "Haz clic en 'Start' para iniciar la conversación.",
    turns: [
      {
        speaker: 'Clerk',
        speakerEs: 'Dependiente',
        role: 'clerk',
        textEn: "That's right. We usually close for lunch.",
        textEs: "Así es. Usualmente cerramos para almorzar.",
        audioText: "That's right. We usually close for lunch.",
        expectedText: "That's right. We usually close for lunch.",
        keywords: ["that's", 'right', 'usually', 'close', 'lunch'],
      },
      {
        speaker: 'Customer',
        speakerEs: 'Cliente',
        role: 'customer',
        textEn: "Oh. What are your hours?",
        textEs: "Oh. ¿Cuál es su horario?",
        audioText: "Oh. What are your hours?",
        expectedText: "Oh. What are your hours?",
        keywords: ['oh', 'what', 'are', 'your', 'hours'],
      },
    ],
    practicePromptEn: "The clerk explains they close for lunch. Ask what their store hours are.",
    practicePromptEs: "El dependiente explica que cierran para el almuerzo. Pregunta cuál es su horario de atención.",
    explanationEn:
      "Line 1 (Clerk): 'That's right. We usually close for lunch.' Line 2 (Customer): 'Oh. What are your hours?' Asking about business schedule.",
    explanationEs:
      "Línea 1 (Dependiente): 'Así es. Usualmente cerramos para almorzar.' Línea 2 (Cliente): 'Oh. ¿Cuál es su horario?' Preguntando por las horas de servicio.",
  },
  // Interacción 3 de 3 (interaccion 3 de 3.png)
  {
    id: 'wc-interact-3',
    partNumber: 3,
    title: 'Interacción 3 de 3',
    hasRedIndicator: true,
    instructions: "Click 'Start' to begin the conversation.",
    instructionsEs: "Haz clic en 'Start' para iniciar la conversación.",
    turns: [
      {
        speaker: 'Clerk',
        speakerEs: 'Dependiente',
        role: 'clerk',
        textEn: "Nine to one, and two-thirty to six.",
        textEs: "De nueve a una, y de dos y media a seis.",
        audioText: "Nine to one, and two-thirty to six.",
        expectedText: "Nine to one, and two-thirty to six.",
        keywords: ['nine', 'one', 'two-thirty', 'two', 'thirty', 'six'],
      },
      {
        speaker: 'Customer',
        speakerEs: 'Cliente',
        role: 'customer',
        textEn: "I see. Well, thanks.",
        textEs: "Ya veo. Bueno, gracias.",
        audioText: "I see. Well, thanks.",
        expectedText: "I see. Well, thanks.",
        keywords: ['see', 'well', 'thanks'],
      },
    ],
    practicePromptEn: "The clerk provides the schedule: 9 to 1 and 2:30 to 6. Thank him politely.",
    practicePromptEs: "El dependiente te indica el horario: de 9 a 1 y de 2:30 a 6. Agradécele amablemente.",
    explanationEn:
      "Line 1 (Clerk): 'Nine to one, and two-thirty to six.' Line 2 (Customer): 'I see. Well, thanks.' Concluding the exchange with polite thanks.",
    explanationEs:
      "Línea 1 (Dependiente): 'De nueve a una, y de dos y media a seis.' Línea 2 (Cliente): 'Ya veo. Bueno, gracias.' Concluyendo la interacción con cortesía.",
  },
];
