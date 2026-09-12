import museumVideo from '../assets/video_direction_to_the_museum.mp4';
import { LessonSentence, RadioChoiceOption, UnitTestQuestion } from '../types';

export { museumVideo };

export interface DialogueTurn {
  id: string;
  speaker: 'Ivan' | 'Andrew';
  speakerEs: string;
  en: string;
  es: string;
  highlightInActivities?: number[];
}

export const MUSEUM_DIALOGUE_TURNS: DialogueTurn[] = [
  {
    id: 'turn-1',
    speaker: 'Ivan',
    speakerEs: 'Iván',
    en: "Excuse me. I'm trying to get to the art museum. Can you give me directions?",
    es: 'Disculpe. Estoy intentando llegar al museo de arte. ¿Puede darme indicaciones?',
    highlightInActivities: [2, 4, 5, 6],
  },
  {
    id: 'turn-2',
    speaker: 'Andrew',
    speakerEs: 'Andrew',
    en: "Sure. This street is McKinley Street. You wanna walk up McKinley Street until you see a men's store. The men's store is on the corner of Grant Street.",
    es: 'Claro. Esta calle es la calle McKinley. Debe caminar por la calle McKinley hasta que vea una tienda para caballeros. La tienda para caballeros está en la esquina de la calle Grant.',
    highlightInActivities: [2],
  },
  {
    id: 'turn-3',
    speaker: 'Ivan',
    speakerEs: 'Iván',
    en: "And that's where the art museum is?",
    es: '¿Y ahí es donde está el museo de arte?',
    highlightInActivities: [2],
  },
  {
    id: 'turn-4',
    speaker: 'Andrew',
    speakerEs: 'Andrew',
    en: "No. Make a right on Grant, and take Grant to Jackson Street. Jackson Street is easy to find because it has this large gift store on the corner. Make a left at the gift store.",
    es: 'No. Gire a la derecha en Grant, y siga por Grant hasta la calle Jackson. La calle Jackson es fácil de encontrar porque tiene una gran tienda de regalos en la esquina. Gire a la izquierda en la tienda de regalos.',
    highlightInActivities: [7],
  },
  {
    id: 'turn-5',
    speaker: 'Ivan',
    speakerEs: 'Iván',
    en: 'Oh, OK. The art museum is next to the gift store.',
    es: 'Ah, de acuerdo. El museo de arte está al lado de la tienda de regalos.',
    highlightInActivities: [],
  },
  {
    id: 'turn-6',
    speaker: 'Andrew',
    speakerEs: 'Andrew',
    en: 'No. Make a left at the gift store, walk up Jackson Street until you see a movie theater. The art museum is opposite the movie theater.',
    es: 'No. Gire a la izquierda en la tienda de regalos, camine por la calle Jackson hasta que vea un cine. El museo de arte está enfrente del cine.',
    highlightInActivities: [],
  },
  {
    id: 'turn-7',
    speaker: 'Ivan',
    speakerEs: 'Iván',
    en: 'So...after the gift store I look for a movie theater? Wait. I need to write this down. Do you have a pen?',
    es: 'Entonces... ¿después de la tienda de regalos busco un cine? Espere. Necesito anotar esto. ¿Tiene un bolígrafo?',
    highlightInActivities: [3, 8],
  },
  {
    id: 'turn-8',
    speaker: 'Andrew',
    speakerEs: 'Andrew',
    en: "No, I'm sorry. I don't have a pen.",
    es: 'No, lo siento. No tengo un bolígrafo.',
    highlightInActivities: [3],
  },
  {
    id: 'turn-9',
    speaker: 'Ivan',
    speakerEs: 'Iván',
    en: 'Oh, then can you start from the beginning?',
    es: 'Oh, entonces, ¿puede empezar desde el principio?',
    highlightInActivities: [],
  },
  {
    id: 'turn-10',
    speaker: 'Andrew',
    speakerEs: 'Andrew',
    en: 'This street is McKinley Street.',
    es: 'Esta calle es la calle McKinley.',
    highlightInActivities: [],
  },
  {
    id: 'turn-11',
    speaker: 'Ivan',
    speakerEs: 'Iván',
    en: 'Yes.',
    es: 'Sí.',
    highlightInActivities: [],
  },
  {
    id: 'turn-12',
    speaker: 'Andrew',
    speakerEs: 'Andrew',
    en: "You wanna walk up McKinley Street until you see a men's store...",
    es: 'Debe caminar por la calle McKinley hasta que vea una tienda para caballeros...',
    highlightInActivities: [],
  },
];

export const MUSEUM_FULL_AUDIO_TEXT = MUSEUM_DIALOGUE_TURNS.map(
  (t) => `${t.speaker}: ${t.en}`
).join(' ');

// Full sentences for pronunciation
export const MUSEUM_LESSON_SENTENCES: LessonSentence[] = MUSEUM_DIALOGUE_TURNS.map(
  (t) => ({
    en: `${t.speaker}: ${t.en}`,
    es: `${t.speakerEs}: ${t.es}`,
  })
);

export interface MuseumActivityData {
  id: string;
  activityNumber: number; // 1 to 9
  type: 'explore' | 'radio-choice' | 'fill-blanks';
  title: string;
  titleEs: string;
  instructions: string;
  instructionsEs: string;
  question?: string;
  questionEs?: string;
  options?: RadioChoiceOption[];
  correctOptionId?: string;
  explanationEn?: string;
  explanationEs?: string;
  highlightedTurnIds?: string[];
  // For Activity 9 (Fill in the blanks)
  clozeTemplate?: string;
  clozeTemplateEs?: string;
  blanks?: {
    id: string;
    correctWord: string;
    options: string[];
    prefixText?: string;
    suffixText?: string;
  }[];
  wordBank?: string[];
}

export const MUSEUM_ACTIVITIES: MuseumActivityData[] = [
  // ACTIVIDAD 1: Video & Transcripción Completa
  {
    id: 'museum-act-1',
    activityNumber: 1,
    type: 'explore',
    title: 'Actividad 1',
    titleEs: 'Actividad 1',
    instructions: 'Directions to the Museum',
    instructionsEs: 'Direcciones al Museo',
    highlightedTurnIds: [],
  },

  // ACTIVIDAD 2: Where are the speakers?
  {
    id: 'museum-act-2',
    activityNumber: 2,
    type: 'radio-choice',
    title: 'Actividad 2',
    titleEs: 'Actividad 2',
    instructions: 'Choose the correct answer.',
    instructionsEs: 'Elige la respuesta correcta.',
    question: 'Where are the speakers?',
    questionEs: '¿Dónde se encuentran los hablantes?',
    options: [
      { id: 'act2-opt-1', text: 'In a gift store', textEs: 'En una tienda de regalos', isCorrect: false },
      { id: 'act2-opt-2', text: 'In a movie theater', textEs: 'En un cine', isCorrect: false },
      { id: 'act2-opt-3', text: 'On a street corner', textEs: 'En una esquina de la calle', isCorrect: true },
      { id: 'act2-opt-4', text: 'In an art museum', textEs: 'En un museo de arte', isCorrect: false },
    ],
    correctOptionId: 'act2-opt-3',
    explanationEn:
      'Andrew says: "This street is McKinley Street... The men\'s store is on the corner of Grant Street." The two speakers are outside on a street corner talking.',
    explanationEs:
      'Andrew indica: "This street is McKinley Street... The men\'s store is on the corner of Grant Street." Ambos están al aire libre en una esquina de la calle conversando.',
    highlightedTurnIds: ['turn-1', 'turn-2', 'turn-3'],
  },

  // ACTIVIDAD 3: What is Ivan (the man in the orange shirt) holding?
  {
    id: 'museum-act-3',
    activityNumber: 3,
    type: 'radio-choice',
    title: 'Actividad 3',
    titleEs: 'Actividad 3',
    instructions: 'Choose the correct answer.',
    instructionsEs: 'Elige la respuesta correcta.',
    question: 'What is Ivan (the man in the orange shirt) holding?',
    questionEs: '¿Qué sostiene Iván (el hombre de la camisa naranja)?',
    options: [
      { id: 'act3-opt-1', text: 'A pen', textEs: 'Un bolígrafo', isCorrect: false },
      { id: 'act3-opt-2', text: 'A map', textEs: 'Un mapa', isCorrect: true },
      { id: 'act3-opt-3', text: 'A hat', textEs: 'Un sombrero', isCorrect: false },
      { id: 'act3-opt-4', text: 'A jacket', textEs: 'Una chaqueta', isCorrect: false },
    ],
    correctOptionId: 'act3-opt-2',
    explanationEn:
      'In the video, Ivan is holding a paper street map in his hands while asking for directions. He asks Andrew: "Do you have a pen?" because he does not have a pen.',
    explanationEs:
      'En el video, Iván lleva un mapa de calles en papel en sus manos mientras pide indicaciones. Además le pregunta a Andrew: "¿Tiene un bolígrafo?" porque no tiene con qué anotar.',
    highlightedTurnIds: ['turn-7', 'turn-8'],
  },

  // ACTIVIDAD 4: Ivan is most probably...
  {
    id: 'museum-act-4',
    activityNumber: 4,
    type: 'radio-choice',
    title: 'Actividad 4',
    titleEs: 'Actividad 4',
    instructions: 'Choose the correct answer.',
    instructionsEs: 'Elige la respuesta correcta.',
    question: 'Ivan is most probably...',
    questionEs: 'Iván es muy probablemente...',
    options: [
      { id: 'act4-opt-1', text: 'a salesperson.', textEs: 'un vendedor.', isCorrect: false },
      { id: 'act4-opt-2', text: 'a tourist.', textEs: 'un turista.', isCorrect: true },
      { id: 'act4-opt-3', text: 'a waiter.', textEs: 'un mozo / camarero.', isCorrect: false },
      { id: 'act4-opt-4', text: 'a bus driver.', textEs: 'un conductor de autobús.', isCorrect: false },
    ],
    correctOptionId: 'act4-opt-2',
    explanationEn:
      'Ivan is looking for the art museum, carrying a map, and asking a local person for street directions. He is most likely a tourist.',
    explanationEs:
      'Iván está buscando el museo de arte, lleva un mapa en la mano y le pide indicaciones a un residente local. Es sumamente probable que sea un turista.',
    highlightedTurnIds: ['turn-1'],
  },

  // ACTIVIDAD 5: Why does Ivan talk to Andrew?
  {
    id: 'museum-act-5',
    activityNumber: 5,
    type: 'radio-choice',
    title: 'Actividad 5',
    titleEs: 'Actividad 5',
    instructions: 'Choose the correct answer.',
    instructionsEs: 'Elige la respuesta correcta.',
    question: 'Why does Ivan talk to Andrew?',
    questionEs: '¿Por qué habla Iván con Andrew?',
    options: [
      {
        id: 'act5-opt-1',
        text: 'He wants to know when the gift store opens.',
        textEs: 'Quiere saber cuándo abre la tienda de regalos.',
        isCorrect: false,
      },
      {
        id: 'act5-opt-2',
        text: 'He wants to borrow a pen.',
        textEs: 'Quiere pedir prestado un bolígrafo.',
        isCorrect: false,
      },
      {
        id: 'act5-opt-3',
        text: 'He wants to ask for the time.',
        textEs: 'Quiere preguntar la hora.',
        isCorrect: false,
      },
      {
        id: 'act5-opt-4',
        text: 'He wants to know how to get to the art museum.',
        textEs: 'Quiere saber cómo llegar al museo de arte.',
        isCorrect: true,
      },
    ],
    correctOptionId: 'act5-opt-4',
    explanationEn:
      'Ivan opens the dialogue with: "Excuse me. I\'m trying to get to the art museum. Can you give me directions?"',
    explanationEs:
      'Iván abre el diálogo diciendo: "Disculpe. Estoy intentando llegar al museo de arte. ¿Puede darme indicaciones?"',
    highlightedTurnIds: ['turn-1'],
  },

  // ACTIVIDAD 6: What does Ivan say to get Andrew's attention?
  {
    id: 'museum-act-6',
    activityNumber: 6,
    type: 'radio-choice',
    title: 'Actividad 6',
    titleEs: 'Actividad 6',
    instructions: 'Choose the correct answer.',
    instructionsEs: 'Elige la respuesta correcta.',
    question: "What does Ivan say to get Andrew's attention?",
    questionEs: '¿Qué dice Iván para llamar la atención de Andrew?',
    options: [
      { id: 'act6-opt-1', text: 'Excuse me.', textEs: 'Disculpe / Con permiso.', isCorrect: true },
      { id: 'act6-opt-2', text: "I'm sorry.", textEs: 'Lo siento.', isCorrect: false },
      { id: 'act6-opt-3', text: 'Sure.', textEs: 'Seguro / Claro.', isCorrect: false },
      { id: 'act6-opt-4', text: 'Oh ok.', textEs: 'Ah, de acuerdo.', isCorrect: false },
    ],
    correctOptionId: 'act6-opt-1',
    explanationEn:
      'The standard polite expression to get someone\'s attention in English is "Excuse me."',
    explanationEs:
      'La expresión educada estándar en inglés para llamar la atención de alguien es "Excuse me." (Disculpe).',
    highlightedTurnIds: ['turn-1'],
  },

  // ACTIVIDAD 7: Why is it easy to find Jackson Street?
  {
    id: 'museum-act-7',
    activityNumber: 7,
    type: 'radio-choice',
    title: 'Actividad 7',
    titleEs: 'Actividad 7',
    instructions: 'Choose the correct answer.',
    instructionsEs: 'Elige la respuesta correcta.',
    question: 'Why is it easy to find Jackson Street?',
    questionEs: '¿Por qué es fácil encontrar la calle Jackson?',
    options: [
      {
        id: 'act7-opt-1',
        text: "There's a large gift store on the corner.",
        textEs: 'Hay una gran tienda de regalos en la esquina.',
        isCorrect: true,
      },
      {
        id: 'act7-opt-2',
        text: "It's near a men's store.",
        textEs: 'Está cerca de una tienda de ropa para caballeros.',
        isCorrect: false,
      },
      {
        id: 'act7-opt-3',
        text: "There's a large sign on the street.",
        textEs: 'Hay un gran letrero en la calle.',
        isCorrect: false,
      },
      {
        id: 'act7-opt-4',
        text: "It's opposite a movie theater.",
        textEs: 'Está enfrente de un cine.',
        isCorrect: false,
      },
    ],
    correctOptionId: 'act7-opt-1',
    explanationEn:
      'Andrew explicitly states: "Jackson Street is easy to find because it has this large gift store on the corner."',
    explanationEs:
      'Andrew lo explica textualmente: "Jackson Street is easy to find because it has this large gift store on the corner." (La calle Jackson es fácil de encontrar porque tiene una gran tienda de regalos en la esquina).',
    highlightedTurnIds: ['turn-4'],
  },

  // ACTIVIDAD 8: Why does Ivan want to write down what Andrew says?
  {
    id: 'museum-act-8',
    activityNumber: 8,
    type: 'radio-choice',
    title: 'Actividad 8',
    titleEs: 'Actividad 8',
    instructions: 'Choose the correct answer.',
    instructionsEs: 'Elige la respuesta correcta.',
    question: 'Why does Ivan want to write down what Andrew says?',
    questionEs: '¿Por qué quiere Iván anotar lo que Andrew dice?',
    options: [
      {
        id: 'act8-opt-1',
        text: "So he won't forget the directions",
        textEs: 'Para no olvidar las indicaciones',
        isCorrect: true,
      },
      {
        id: 'act8-opt-2',
        text: 'To practice writing English',
        textEs: 'Para practicar la escritura en inglés',
        isCorrect: false,
      },
      {
        id: 'act8-opt-3',
        text: 'To explain it to a friend',
        textEs: 'Para explicárselo a un amigo',
        isCorrect: false,
      },
      {
        id: 'act8-opt-4',
        text: "He doesn't understand the directions.",
        textEs: 'No entiende las indicaciones.',
        isCorrect: false,
      },
    ],
    correctOptionId: 'act8-opt-1',
    explanationEn:
      'There are many steps (McKinley Street, men\'s store on Grant, turn right, Jackson Street, gift store, movie theater), so Ivan wants to write it down so he won\'t forget.',
    explanationEs:
      'Como las indicaciones tienen muchos giros y referencias, Iván dice: "Wait. I need to write this down." para no olvidarlas mientras camina.',
    highlightedTurnIds: ['turn-7'],
  },

  // ACTIVIDAD 9: Fill in the blanks with the correct answers
  {
    id: 'museum-act-9',
    activityNumber: 9,
    type: 'fill-blanks',
    title: 'Actividad 9',
    titleEs: 'Actividad 9',
    instructions: 'Fill in the blanks with the correct answers.',
    instructionsEs: 'Completa los espacios en blanco con las respuestas correctas.',
    clozeTemplate:
      'Ivan is asking for {0} . Ivan says he is trying to get to the {1} . From McKinley Street, Ivan has to {2} on Grant Street. Ivan has to walk up {3} until he sees a movie theater. The museum is {4} the movie theater.',
    clozeTemplateEs:
      'Iván está pidiendo indicaciones. Iván dice que está intentando llegar al museo de arte. Desde la calle McKinley, Iván tiene que girar a la derecha en la calle Grant. Iván tiene que caminar por Jackson hasta que vea un cine. El museo está enfrente del cine.',
    blanks: [
      {
        id: 'blank-1',
        correctWord: 'directions',
        options: ['directions', 'money', 'a pen'],
        prefixText: 'Ivan is asking for',
        suffixText: '.',
      },
      {
        id: 'blank-2',
        correctWord: 'art museum',
        options: ['art museum', 'gift store', 'movie theater'],
        prefixText: 'Ivan says he is trying to get to the',
        suffixText: '.',
      },
      {
        id: 'blank-3',
        correctWord: 'turn right',
        options: ['turn right', 'turn left', 'go straight'],
        prefixText: 'From McKinley Street, Ivan has to',
        suffixText: 'on Grant Street.',
      },
      {
        id: 'blank-4',
        correctWord: 'Jackson',
        options: ['Jackson', 'Grant', 'McKinley'],
        prefixText: 'Ivan has to walk up',
        suffixText: 'until he sees a movie theater.',
      },
      {
        id: 'blank-5',
        correctWord: 'opposite',
        options: ['opposite', 'next to', 'behind'],
        prefixText: 'The museum is',
        suffixText: 'the movie theater.',
      },
    ],
    wordBank: [
      'directions',
      'art museum',
      'turn right',
      'Jackson',
      'opposite',
      'turn left',
      'movie theater',
      'next to',
    ],
    explanationEn:
      'Ivan is asking for directions to the art museum. He needs to turn right on Grant, walk to Jackson, turn left at the gift store, and the museum is opposite the movie theater.',
    explanationEs:
      'Iván pide indicaciones (directions) para ir al museo de arte (art museum). Debe girar a la derecha (turn right) en Grant, seguir a Jackson, y el museo está enfrente (opposite) del cine.',
    highlightedTurnIds: ['turn-1', 'turn-4', 'turn-6'],
  },
];

// ACTIVIDAD 10: TEST (5 tests en orden estricto)
export const MUSEUM_UNIT_TEST_QUESTIONS: UnitTestQuestion[] = [
  // TEST 1
  {
    id: 'museum-test-q1',
    number: 1,
    instructions: 'Choose the correct answer.',
    instructionsEs: 'Elige la respuesta correcta.',
    question: 'What does Ivan want to do?',
    questionEs: '¿Qué quiere hacer Iván?',
    options: [
      { id: 't1-opt-1', text: 'Buy a present', textEs: 'Comprar un regalo', isCorrect: false },
      { id: 't1-opt-2', text: 'Find some new shirts', textEs: 'Buscar camisas nuevas', isCorrect: false },
      { id: 't1-opt-3', text: 'See a movie', textEs: 'Ver una película', isCorrect: false },
      { id: 't1-opt-4', text: 'Visit an art museum', textEs: 'Visitar un museo de arte', isCorrect: true },
    ],
    correctAnswerId: 't1-opt-4',
    explanation: 'Ivan says: "I\'m trying to get to the art museum."',
    explanationEs: 'Iván afirma: "I\'m trying to get to the art museum." (Estoy intentando llegar al museo de arte).',
  },

  // TEST 2
  {
    id: 'museum-test-q2',
    number: 2,
    instructions: 'Choose the correct answer.',
    instructionsEs: 'Elige la respuesta correcta.',
    question: 'On what street are the speakers standing?',
    questionEs: '¿En qué calle están parados los hablantes?',
    options: [
      { id: 't2-opt-1', text: 'Grant Street', textEs: 'Calle Grant', isCorrect: false },
      { id: 't2-opt-2', text: 'Jackson Street', textEs: 'Calle Jackson', isCorrect: false },
      { id: 't2-opt-3', text: 'McKinley Street', textEs: 'Calle McKinley', isCorrect: true },
      { id: 't2-opt-4', text: "We don't know.", textEs: 'No lo sabemos.', isCorrect: false },
    ],
    correctAnswerId: 't2-opt-3',
    explanation: 'Andrew begins giving directions by saying: "This street is McKinley Street."',
    explanationEs: 'Andrew comienza diciendo: "This street is McKinley Street." (Esta calle es la calle McKinley).',
  },

  // TEST 3
  {
    id: 'museum-test-q3',
    number: 3,
    instructions: 'Choose the correct answer.',
    instructionsEs: 'Elige la respuesta correcta.',
    question: 'The art museum is opposite which building?',
    questionEs: '¿Frente a qué edificio está el museo de arte?',
    options: [
      { id: 't3-opt-1', text: 'A movie theater', textEs: 'Un cine', isCorrect: true },
      { id: 't3-opt-2', text: "A men's store", textEs: 'Una tienda de ropa masculina', isCorrect: false },
      { id: 't3-opt-3', text: 'A gift store', textEs: 'Una tienda de regalos', isCorrect: false },
      { id: 't3-opt-4', text: "We don't know.", textEs: 'No lo sabemos.', isCorrect: false },
    ],
    correctAnswerId: 't3-opt-1',
    explanation: 'Andrew says: "The art museum is opposite the movie theater."',
    explanationEs: 'Andrew aclara: "The art museum is opposite the movie theater." (El museo de arte está enfrente del cine).',
  },

  // TEST 4
  {
    id: 'museum-test-q4',
    number: 4,
    instructions: 'Choose the correct answer.',
    instructionsEs: 'Elige la respuesta correcta.',
    question: 'How does Ivan feel at the end of the conversation?',
    questionEs: '¿Cómo se siente Iván al final de la conversación?',
    options: [
      { id: 't4-opt-1', text: 'Angry', textEs: 'Enojado', isCorrect: false },
      { id: 't4-opt-2', text: 'Happy', textEs: 'Feliz', isCorrect: false },
      { id: 't4-opt-3', text: 'Excited', textEs: 'Entusiasmado', isCorrect: false },
      { id: 't4-opt-4', text: 'Confused', textEs: 'Confundido', isCorrect: true },
    ],
    correctAnswerId: 't4-opt-4',
    explanation:
      'Ivan is confused by all the directions and asks: "Wait. I need to write this down... Oh, then can you start from the beginning?"',
    explanationEs:
      'Iván está confundido por tantas indicaciones y pide: "¿Puede empezar desde el principio?" demostrando confusión.',
  },

  // TEST 5
  {
    id: 'museum-test-q5',
    number: 5,
    instructions: 'Choose the correct answer.',
    instructionsEs: 'Elige la respuesta correcta.',
    question: 'What happens in the end?',
    questionEs: '¿Qué sucede al final?',
    options: [
      {
        id: 't5-opt-1',
        text: 'Ivan asks someone else for directions.',
        textEs: 'Iván le pide indicaciones a otra persona.',
        isCorrect: false,
      },
      {
        id: 't5-opt-2',
        text: 'Andrew calls for a taxi.',
        textEs: 'Andrew llama a un taxi.',
        isCorrect: false,
      },
      {
        id: 't5-opt-3',
        text: 'Ivan asks Andrew to start over.',
        textEs: 'Iván le pide a Andrew que empiece de nuevo.',
        isCorrect: true,
      },
      {
        id: 't5-opt-4',
        text: 'Andrew takes Ivan where he needs to go.',
        textEs: 'Andrew lleva a Iván a donde necesita ir.',
        isCorrect: false,
      },
    ],
    correctAnswerId: 't5-opt-3',
    explanation:
      'Ivan says: "Oh, then can you start from the beginning?", asking Andrew to repeat everything from the start.',
    explanationEs:
      'Iván dice: "Oh, then can you start from the beginning?", pidiéndole a Andrew que comience de nuevo desde el principio.',
  },
];
