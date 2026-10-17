import ellenImg from '../assets/images/ellen_calling_car_1792268855999.jpg';

export { ellenImg };

export interface EllenMessageItem {
  speaker: string;
  speakerEs: string;
  textEn: string;
  textEs: string;
}

export const ELLEN_MESSAGE_FULL_AUDIO =
  "Hi, Dad! It's Ellen. I called last night, but I didn't get an answer. Where were you? Aunt Minnie and Uncle Joe are taking me to the airport now. The plane leaves at 3:00 p.m. I arrive at 5:00 p.m. Please be there. They gave me lots of presents for everyone and I need help with my luggage. See you soon.";

export const ELLEN_MESSAGE_FULL_ES =
  "¡Hola, papá! Soy Ellen. Llamé anoche, pero no obtuve respuesta. ¿Dónde estabas? La tía Minnie y el tío Joe me están llevando al aeropuerto ahora. El avión sale a las 3:00 p.m. Llego a las 5:00 p.m. Por favor, está allí. Me dieron muchos regalos para todos y necesito ayuda con mi equipaje. ¡Nos vemos pronto!";

export const ELLEN_MESSAGE_SENTENCES = [
  {
    id: 1,
    textEn: "Hi, Dad! It's Ellen.",
    textEs: "¡Hola, papá! Soy Ellen.",
  },
  {
    id: 2,
    textEn: "I called last night, but I didn't get an answer. Where were you?",
    textEs: "Llamé anoche, pero no obtuve respuesta. ¿Dónde estabas?",
  },
  {
    id: 3,
    textEn: "Aunt Minnie and Uncle Joe are taking me to the airport now.",
    textEs: "La tía Minnie y el tío Joe me están llevando al aeropuerto ahora.",
  },
  {
    id: 4,
    textEn: "The plane leaves at 3:00 p.m. I arrive at 5:00 p.m. Please be there.",
    textEs: "El avión sale a las 3:00 p.m. Llego a las 5:00 p.m. Por favor, está allí.",
  },
  {
    id: 5,
    textEn: "They gave me lots of presents for everyone and I need help with my luggage. See you soon.",
    textEs: "Me dieron muchos regalos para todos y necesito ayuda con mi equipaje. ¡Nos vemos pronto!",
  },
];

// ---------------------------------------------------------------------------
// ACTIVIDAD 2: DROPDOWN COMPLETION INTERFACES & DATA
// ---------------------------------------------------------------------------
export interface DropdownSlot {
  id: string;
  options: string[];
  optionsEs: string[];
  correctAnswer: string;
}

export interface FamilyDropdownSentence {
  id: string;
  audioClipText: string;
  parts: (
    | { type: 'text'; contentEn: string; contentEs: string }
    | { type: 'dropdown'; slotId: string }
  )[];
  fullEn: string;
  fullEs: string;
}

export interface FamilyDropdownActivity {
  id: string;
  type: 'dropdown-completion';
  title: string;
  instructions: string;
  instructionsEs: string;
  slots: Record<string, DropdownSlot>;
  sentences: FamilyDropdownSentence[];
  explanationEn: string;
  explanationEs: string;
}

// ---------------------------------------------------------------------------
// ACTIVIDAD 3: MULTIPLE CHOICE QUESTIONS INTERFACES & DATA
// ---------------------------------------------------------------------------
export interface FamilyQuestionItem {
  id: string;
  audioText: string;
  questionEn: string;
  questionEs: string;
  optionsEn: string[];
  optionsEs: string[];
  correctAnswer: string;
  explanationEn: string;
  explanationEs: string;
}

export interface FamilyMultipleChoiceActivity {
  id: string;
  type: 'multiple-choice-trio';
  title: string;
  instructions: string;
  instructionsEs: string;
  questions: FamilyQuestionItem[];
}

export type FamilyActivityItem =
  | {
      id: string;
      type: 'explore';
      title: string;
      instructions: string;
      instructionsEs: string;
    }
  | FamilyDropdownActivity
  | FamilyMultipleChoiceActivity;

// ---------------------------------------------------------------------------
// 3 ACTIVIDADES EN ORDEN EXACTO
// ---------------------------------------------------------------------------
export const FAMILY_ACTIVITIES: FamilyActivityItem[] = [
  // Actividad 1: Explore (actividad 1.png)
  {
    id: 'fam-act-1',
    type: 'explore',
    title: 'Actividad 1: Explore',
    instructions: "Listen to Ellen's voicemail message to her father and read the transcript.",
    instructionsEs: "Escucha el mensaje del buzón de voz de Ellen a su padre y lee la transcripción.",
  },
  // Actividad 2: Dropdown completion (actividad 2.png)
  {
    id: 'fam-act-2',
    type: 'dropdown-completion',
    title: 'Actividad 2',
    instructions: 'Listen to the clips of the message, and complete the sentences.',
    instructionsEs: 'Escucha los fragmentos del mensaje y completa las oraciones.',
    slots: {
      slot1: {
        id: 'slot1',
        options: ['Ellen', 'Aunt Minnie', 'Helen', 'Uncle Joe'],
        optionsEs: ['Ellen', 'Tía Minnie', 'Helen', 'Tío Joe'],
        correctAnswer: 'Ellen',
      },
      slot2: {
        id: 'slot2',
        options: ['airport', 'bus station', 'train station'],
        optionsEs: ['aeropuerto', 'estación de autobús', 'estación de tren'],
        correctAnswer: 'airport',
      },
      slot3: {
        id: 'slot3',
        options: ['3:00', '2:00', '5:00'],
        optionsEs: ['3:00', '2:00', '5:00'],
        correctAnswer: '3:00',
      },
      slot4: {
        id: 'slot4',
        options: ['5:00', '3:00', '7:00'],
        optionsEs: ['5:00', '3:00', '7:00'],
        correctAnswer: '5:00',
      },
    },
    sentences: [
      {
        id: 's1',
        audioClipText: "Hi, Dad! It's Ellen. I called last night, but I didn't get an answer.",
        parts: [
          { type: 'dropdown', slotId: 'slot1' },
          {
            type: 'text',
            contentEn: ' is trying to reach her father on the phone.',
            contentEs: ' está intentando comunicarse con su padre por teléfono.',
          },
        ],
        fullEn: 'Ellen is trying to reach her father on the phone.',
        fullEs: 'Ellen está intentando comunicarse con su padre por teléfono.',
      },
      {
        id: 's2',
        audioClipText:
          'Aunt Minnie and Uncle Joe are taking me to the airport now. The plane leaves at 3:00 p.m. I arrive at 5:00 p.m.',
        parts: [
          {
            type: 'text',
            contentEn: 'Aunt Minnie and Uncle Joe are taking her to the ',
            contentEs: 'La tía Minnie y el tío Joe la están llevando al ',
          },
          { type: 'dropdown', slotId: 'slot2' },
          {
            type: 'text',
            contentEn: '. She has to catch a plane at ',
            contentEs: '. Tiene que tomar un avión a las ',
          },
          { type: 'dropdown', slotId: 'slot3' },
          {
            type: 'text',
            contentEn: ' p.m. She will arrive at ',
            contentEs: ' p.m. Llegará a las ',
          },
          { type: 'dropdown', slotId: 'slot4' },
          {
            type: 'text',
            contentEn: ' p.m.',
            contentEs: ' p.m.',
          },
        ],
        fullEn:
          'Aunt Minnie and Uncle Joe are taking her to the airport. She has to catch a plane at 3:00 p.m. She will arrive at 5:00 p.m.',
        fullEs:
          'La tía Minnie y el tío Joe la están llevando al aeropuerto. Tiene que tomar un avión a las 3:00 p.m. Llegará a las 5:00 p.m.',
      },
    ],
    explanationEn:
      'Sentence 1: Ellen is leaving the voicemail message for her father. Sentence 2: Her aunt and uncle are taking her to the airport; plane departs at 3:00 p.m. and arrives at 5:00 p.m.',
    explanationEs:
      'Oración 1: Ellen es quien deja el mensaje a su padre. Oración 2: Sus tíos la llevan al aeropuerto; el vuelo sale a las 3:00 p.m. y llega a las 5:00 p.m.',
  },
  // Actividad 3: Multiple choice (actividad 3.png)
  {
    id: 'fam-act-3',
    type: 'multiple-choice-trio',
    title: 'Actividad 3',
    instructions: "Listen to Ellen's message, and answer the questions.",
    instructionsEs: 'Escucha el mensaje de Ellen y responde las preguntas.',
    questions: [
      {
        id: 'fam-q1',
        audioText: 'Where does Ellen want her father to be?',
        questionEn: 'Where does Ellen want her father to be?',
        questionEs: '¿Dónde quiere Ellen que esté su padre?',
        optionsEn: [
          'at the airport, when she arrives',
          'at the airport, when she leaves',
          'at home, with lots of presents',
        ],
        optionsEs: [
          'En el aeropuerto, cuando ella llegue',
          'En el aeropuerto, cuando ella se vaya',
          'En casa, con muchos regalos',
        ],
        correctAnswer: 'at the airport, when she arrives',
        explanationEn:
          "Ellen states: 'I arrive at 5:00 p.m. Please be there.' She wants him to meet her upon arrival.",
        explanationEs:
          "Ellen dice: 'Llego a las 5:00 p.m. Por favor, está allí.' Quiere que esté en el aeropuerto cuando ella aterrice.",
      },
      {
        id: 'fam-q2',
        audioText: 'Who gave Ellen lots of presents?',
        questionEn: 'Who gave Ellen lots of presents?',
        questionEs: '¿Quién le dio muchos regalos a Ellen?',
        optionsEn: ['her aunt and uncle', 'her dad', "We don't know."],
        optionsEs: ['Su tía y su tío', 'Su papá', 'No lo sabemos.'],
        correctAnswer: 'her aunt and uncle',
        explanationEn:
          "Ellen refers to Aunt Minnie and Uncle Joe: 'They gave me lots of presents for everyone.'",
        explanationEs:
          "Ellen se refiere a la tía Minnie y al tío Joe: 'Me dieron muchos regalos para todos' (her aunt and uncle).",
      },
      {
        id: 'fam-q3',
        audioText: 'Why does Ellen need help?',
        questionEn: 'Why does Ellen need help?',
        questionEs: '¿Por qué necesita ayuda Ellen?',
        optionsEn: [
          "She can't find her luggage.",
          'She has a lot of things to carry.',
          "She doesn't know who the presents are for.",
        ],
        optionsEs: [
          'No puede encontrar su equipaje.',
          'Tiene muchas cosas que cargar.',
          'No sabe para quién son los regalos.',
        ],
        correctAnswer: 'She has a lot of things to carry.',
        explanationEn:
          "Ellen says: 'They gave me lots of presents for everyone and I need help with my luggage.' Therefore, she has many things to carry.",
        explanationEs:
          "Ellen dice: 'Me dieron muchos regalos para todos y necesito ayuda con mi equipaje.' Por lo tanto, tiene muchas cosas que llevar/cargar.",
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// 5 TESTS EN ORDEN EXACTO (test 1.png a test 5.png)
// ---------------------------------------------------------------------------
export interface FamilyTestItem {
  id: string;
  questionNumber: number;
  type: 'fill-blank-choice' | 'multiple-choice';
  instructions: string;
  instructionsEs: string;
  audioPrompt: string;
  // For fill-blank-choice
  prefix?: string;
  prefixEs?: string;
  slotPlaceholder?: string;
  suffix?: string;
  suffixEs?: string;
  // For standard question
  question?: string;
  questionEs?: string;
  options: string[];
  optionsEs: string[];
  correctAnswer: string;
  fullEn: string;
  fullEs: string;
  explanationEn: string;
  explanationEs: string;
}

export const FAMILY_TESTS: FamilyTestItem[] = [
  // Test 1 (test 1.png)
  {
    id: 'fam-test-1',
    questionNumber: 1,
    type: 'fill-blank-choice',
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra o selecciona la respuesta correcta en el espacio en blanco.',
    audioPrompt: 'Ellen visited her aunt and uncle.',
    prefix: 'Ellen visited her ',
    prefixEs: 'Ellen visitó a sus ',
    slotPlaceholder: '_________',
    suffix: ' .',
    suffixEs: ' .',
    options: [
      'mother and father',
      'grandmother and grandfather',
      'sister and brother',
      'aunt and uncle',
    ],
    optionsEs: [
      'mamá y papá',
      'abuela y abuelo',
      'hermana y hermano',
      'tía y tío',
    ],
    correctAnswer: 'aunt and uncle',
    fullEn: 'Ellen visited her aunt and uncle.',
    fullEs: 'Ellen visitó a sus tíos (aunt and uncle).',
    explanationEn:
      "Ellen states that 'Aunt Minnie and Uncle Joe are taking me to the airport now.' She was visiting her aunt and uncle.",
    explanationEs:
      "Ellen menciona a 'Aunt Minnie and Uncle Joe' (la tía Minnie y el tío Joe), por lo que visitó a sus tíos (aunt and uncle).",
  },
  // Test 2 (test 2.png)
  {
    id: 'fam-test-2',
    questionNumber: 2,
    type: 'fill-blank-choice',
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra o selecciona la respuesta correcta en el espacio en blanco.',
    audioPrompt: "Ellen's plane arrived two hours late. It arrived at 7 p.m.",
    prefix: "Ellen's plane arrived two hours late. It arrived at ",
    prefixEs: 'El avión de Ellen llegó dos horas tarde. Llegó a las ',
    slotPlaceholder: '_________',
    suffix: ' .',
    suffixEs: ' .',
    options: ['7 p.m.', '3 a.m.', '3 p.m.', '7 a.m.'],
    optionsEs: ['7 p.m.', '3 a.m.', '3 p.m.', '7 a.m.'],
    correctAnswer: '7 p.m.',
    fullEn: "Ellen's plane arrived two hours late. It arrived at 7 p.m.",
    fullEs: 'El avión de Ellen llegó dos horas tarde. Llegó a las 7 p.m.',
    explanationEn:
      'Ellen says: "I arrive at 5:00 p.m." If the plane was two hours late, it arrived at 7 p.m. (5:00 + 2 = 7:00).',
    explanationEs:
      'Ellen dice: "Llego a las 5:00 p.m." Si el avión se retrasó dos horas, llegó a las 7 p.m. (5:00 + 2 = 7:00 p.m.).',
  },
  // Test 3 (test 3.png)
  {
    id: 'fam-test-3',
    questionNumber: 3,
    type: 'fill-blank-choice',
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra o selecciona la respuesta correcta en el espacio en blanco.',
    audioPrompt: "Ellen's father needs to be at the airport by 5:00.",
    prefix: "Ellen's father needs to be at the airport by ",
    prefixEs: 'El padre de Ellen necesita estar en el aeropuerto para las ',
    slotPlaceholder: '_________',
    suffix: ' .',
    suffixEs: ' .',
    options: ['3:00', '8:00', '6:00', '5:00'],
    optionsEs: ['3:00', '8:00', '6:00', '5:00'],
    correctAnswer: '5:00',
    fullEn: "Ellen's father needs to be at the airport by 5:00.",
    fullEs: 'El padre de Ellen necesita estar en el aeropuerto para las 5:00.',
    explanationEn:
      'Ellen says: "I arrive at 5:00 p.m. Please be there." Her father needs to be at the airport by 5:00.',
    explanationEs:
      'Ellen le dice a su papá: "Llego a las 5:00 p.m. Por favor, está allí." Su padre necesita estar en el aeropuerto para las 5:00.',
  },
  // Test 4 (test 4.png)
  {
    id: 'fam-test-4',
    questionNumber: 4,
    type: 'fill-blank-choice',
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra o selecciona la respuesta correcta en el espacio en blanco.',
    audioPrompt: 'The presents are from Minnie and Joe.',
    prefix: 'The presents are from ',
    prefixEs: 'Los regalos son de ',
    slotPlaceholder: '_________',
    suffix: ' .',
    suffixEs: ' .',
    options: [
      'Mary and Jeff',
      'Molly and John',
      'Minnie and Joe',
      'Ellen and Jim',
    ],
    optionsEs: [
      'Mary y Jeff',
      'Molly y John',
      'Minnie y Joe',
      'Ellen y Jim',
    ],
    correctAnswer: 'Minnie and Joe',
    fullEn: 'The presents are from Minnie and Joe.',
    fullEs: 'Los regalos son de Minnie y Joe.',
    explanationEn:
      'In the message, Ellen notes: "Aunt Minnie and Uncle Joe... They gave me lots of presents for everyone."',
    explanationEs:
      'En el mensaje, Ellen señala: "La tía Minnie y el tío Joe... Me dieron muchos regalos para todos" (Minnie and Joe).',
  },
  // Test 5 (test 5.png)
  {
    id: 'fam-test-5',
    questionNumber: 5,
    type: 'multiple-choice',
    instructions: 'Choose the correct answer.',
    instructionsEs: 'Elige la respuesta correcta.',
    audioPrompt: 'Why did Ellen leave a message for her father?',
    question: 'Why did Ellen leave a message for her father?',
    questionEs: '¿Por qué dejó Ellen un mensaje a su padre?',
    options: [
      'She wants him to come to the airport.',
      'She wants to say hello.',
      'She wants him to visit Minnie and Joe.',
      'She wants to give him a present.',
    ],
    optionsEs: [
      'Ella quiere que él vaya al aeropuerto.',
      'Ella quiere saludar.',
      'Ella quiere que él visite a Minnie y Joe.',
      'Ella quiere darle un regalo.',
    ],
    correctAnswer: 'She wants him to come to the airport.',
    fullEn: 'Why did Ellen leave a message for her father? She wants him to come to the airport.',
    fullEs: '¿Por qué dejó Ellen un mensaje a su padre? Porque quiere que él vaya al aeropuerto.',
    explanationEn:
      'Ellen asks her father to meet her at the airport at 5:00 p.m. to help her carry the presents and luggage.',
    explanationEs:
      'Ellen le pide a su padre que la espere en el aeropuerto a las 5:00 p.m. para ayudarla con las maletas y regalos.',
  },
];
