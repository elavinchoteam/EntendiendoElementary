import {
  VocabularyWordItem,
  UnitTestExercise,
  UnitTestQuestion,
  Exercise,
  DragWordToImageExercise,
  VocabularyDictationExercise,
  DragDropClozeExercise,
  DialogueDropdownExercise,
} from '../types';

import carDirectionsImg from '../assets/images/car_directions_1789432067226.jpg';
import roadArrowLeftImg from '../assets/images/road_arrow_left_1789432088226.jpg';
import roadArrowRightImg from '../assets/images/road_arrow_right_1789432108168.jpg';
import roadTurnLaneImg from '../assets/images/road_turn_lane_1789432128423.jpg';
import twoWomenDirectionsImg from '../assets/images/two_women_directions_1789432049443.jpg';

export { twoWomenDirectionsImg, carDirectionsImg };

const MAP_IMAGE =
  'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80';
const IN_FRONT_OF_IMAGE =
  'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=800&q=80';
const NEAR_IMAGE =
  'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80';
const NEXT_TO_IMAGE =
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80';
const OPPOSITE_IMAGE =
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80';
const STREET_IMAGE =
  'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=800&q=80';

// ========================================================
// Section 7: Directions - 10 Vocabulary Items (actividad 1.png)
// ========================================================
export const DIRECTIONS_VOCABULARY: VocabularyWordItem[] = [
  {
    id: 'd-w1',
    word: 'give directions',
    translation: 'dar indicaciones / direcciones',
    partOfSpeech: 'phrase',
    partOfSpeechEs: 'frase',
    definitionEn: 'to explain to someone how to get to a specific destination',
    definitionEs: 'explicar a alguien cómo llegar a un destino específico',
    exampleEn: 'Can you give me directions to the museum?',
    exampleEs: '¿Puedes darme indicaciones para ir al museo?',
    imageUrl: carDirectionsImg,
    audioPromptWord: 'give directions',
    audioPromptExample: 'Can you give me directions to the museum?',
  },
  {
    id: 'd-w2',
    word: 'in front of',
    translation: 'delante de / enfrente de',
    partOfSpeech: 'preposition',
    partOfSpeechEs: 'preposición',
    definitionEn: 'further forward than someone or something else; situated directly facing',
    definitionEs: 'más adelante que alguien o algo; situado directamente enfrente',
    exampleEn: 'The parking lot is in front of the office.',
    exampleEs: 'El estacionamiento está enfrente de la oficina.',
    imageUrl: IN_FRONT_OF_IMAGE,
    audioPromptWord: 'in front of',
    audioPromptExample: 'The parking lot is in front of the office.',
  },
  {
    id: 'd-w3',
    word: 'left at',
    translation: 'a la izquierda en',
    partOfSpeech: 'phrase',
    partOfSpeechEs: 'frase',
    definitionEn: 'turning towards the left side when reaching a specific place',
    definitionEs: 'girar hacia el lado izquierdo al llegar a un lugar específico',
    exampleEn: 'Turn left at the supermarket.',
    exampleEs: 'Gira a la izquierda en el supermercado.',
    imageUrl: roadArrowLeftImg,
    audioPromptWord: 'left at',
    audioPromptExample: 'Turn left at the supermarket.',
  },
  {
    id: 'd-w4',
    word: 'map',
    translation: 'mapa',
    partOfSpeech: 'noun',
    partOfSpeechEs: 'sustantivo',
    definitionEn: 'a 2D visual representation of an area showing roads, streets, and places',
    definitionEs: 'una representación visual en 2D de un área que muestra caminos, calles y lugares',
    exampleEn: "Let's look at the map to see where to go.",
    exampleEs: 'Miremos el mapa para ver adónde ir.',
    imageUrl: MAP_IMAGE,
    audioPromptWord: 'map',
    audioPromptExample: "Let's look at the map to see where to go.",
  },
  {
    id: 'd-w5',
    word: 'near',
    translation: 'cerca / cerca de',
    partOfSpeech: 'preposition',
    partOfSpeechEs: 'preposición',
    definitionEn: 'located a short distance away in space; not far',
    definitionEs: 'ubicado a poca distancia en el espacio; no lejos',
    exampleEn: "Let's walk to the school. It's near here.",
    exampleEs: 'Caminemos a la escuela. Está cerca de aquí.',
    imageUrl: NEAR_IMAGE,
    audioPromptWord: 'near',
    audioPromptExample: "Let's walk to the school. It's near here.",
  },
  {
    id: 'd-w6',
    word: 'next to',
    translation: 'al lado de / junto a',
    partOfSpeech: 'preposition',
    partOfSpeechEs: 'preposición',
    definitionEn: 'adjacent to; side by side with someone or something',
    definitionEs: 'adyacente a; lado a lado con alguien o algo',
    exampleEn: 'The restaurant is next to a department store.',
    exampleEs: 'El restaurante está al lado de una tienda departamental.',
    imageUrl: NEXT_TO_IMAGE,
    audioPromptWord: 'next to',
    audioPromptExample: 'The restaurant is next to a department store.',
  },
  {
    id: 'd-w7',
    word: 'opposite',
    translation: 'enfrente de / del otro lado',
    partOfSpeech: 'preposition',
    partOfSpeechEs: 'preposición',
    definitionEn: 'on the other side of a street, room, or space; facing',
    definitionEs: 'en el otro lado de una calle, habitación o espacio; de frente',
    exampleEn: 'The school is opposite the supermarket.',
    exampleEs: 'La escuela está enfrente del supermercado.',
    imageUrl: OPPOSITE_IMAGE,
    audioPromptWord: 'opposite',
    audioPromptExample: 'The school is opposite the supermarket.',
  },
  {
    id: 'd-w8',
    word: 'right at',
    translation: 'a la derecha en',
    partOfSpeech: 'phrase',
    partOfSpeechEs: 'frase',
    definitionEn: 'turning towards the right side when reaching a specific place',
    definitionEs: 'girar hacia el lado derecho al llegar a un lugar específico',
    exampleEn: 'Go right at Prince Street.',
    exampleEs: 'Ve a la derecha en la calle Prince.',
    imageUrl: roadArrowRightImg,
    audioPromptWord: 'right at',
    audioPromptExample: 'Go right at Prince Street.',
  },
  {
    id: 'd-w9',
    word: 'street',
    translation: 'calle',
    partOfSpeech: 'noun',
    partOfSpeechEs: 'sustantivo',
    definitionEn: 'a public road in a city or town lined with buildings',
    definitionEs: 'un camino público en una ciudad o pueblo flanqueado por edificios',
    exampleEn: 'What street do you live on?',
    exampleEs: '¿En qué calle vives?',
    imageUrl: STREET_IMAGE,
    audioPromptWord: 'street',
    audioPromptExample: 'What street do you live on?',
  },
  {
    id: 'd-w10',
    word: 'turn',
    translation: 'girar / doblar',
    partOfSpeech: 'verb',
    partOfSpeechEs: 'verbo',
    definitionEn: 'to change the direction of motion or movement to the left or right',
    definitionEs: 'cambiar la dirección de marcha o movimiento hacia la izquierda o derecha',
    exampleEn: 'I turned right at the gift shop.',
    exampleEs: 'Giré a la derecha en la tienda de regalos.',
    imageUrl: roadTurnLaneImg,
    audioPromptWord: 'turn',
    audioPromptExample: 'I turned right at the gift shop.',
  },
];

// ========================================================
// Section 7: Test Questions 1 to 10 (test 1.png - test 10.png)
// ========================================================
export const DIRECTIONS_TEST_QUESTIONS: UnitTestQuestion[] = [
  // Test 1: test 1.png
  {
    id: 'd-test-q1',
    number: 1,
    type: 'dropdown',
    instructions: 'Select the correct answer from the drop-down list.',
    instructionsEs: 'Selecciona la respuesta correcta de la lista desplegable.',
    question: 'I have a map of Paris so we can see how to get to the Eiffel Tower.',
    questionEs: 'Tengo un mapa de París para que podamos ver cómo llegar a la Torre Eiffel.',
    sentencePrefix: 'I have a',
    sentencePrefixEs: 'Tengo un',
    sentenceSuffix: 'of Paris so we can see how to get to the Eiffel Tower.',
    sentenceSuffixEs: 'de París para que podamos ver cómo llegar a la Torre Eiffel.',
    imageUrl: twoWomenDirectionsImg,
    options: [
      { id: 't1-opt1', text: 'turn', textEs: 'girar', isCorrect: false },
      { id: 't1-opt2', text: 'map', textEs: 'mapa', isCorrect: true },
      { id: 't1-opt3', text: 'street', textEs: 'calle', isCorrect: false },
    ],
    correctAnswerId: 't1-opt2',
    explanation: 'We use "map" for a visual representation showing how to get to a place: "I have a map of Paris..."',
    explanationEs: 'Usamos "map" (mapa) para una representación visual que muestra cómo llegar a un sitio: "I have a map of Paris..."',
    audioPrompt: 'I have a map of Paris so we can see how to get to the Eiffel Tower.',
    durationSeconds: 15,
  },
  // Test 2: test 2.png
  {
    id: 'd-test-q2',
    number: 2,
    type: 'dropdown',
    instructions: 'Select the correct answer from the drop-down list.',
    instructionsEs: 'Selecciona la respuesta correcta de la lista desplegable.',
    question: 'I parked my car in front of the office.',
    questionEs: 'Estacioné mi auto delante de la oficina.',
    sentencePrefix: 'I parked my car',
    sentencePrefixEs: 'Estacioné mi auto',
    sentenceSuffix: 'the office.',
    sentenceSuffixEs: 'la oficina.',
    imageUrl: twoWomenDirectionsImg,
    options: [
      { id: 't2-opt1', text: 'right at', textEs: 'a la derecha en', isCorrect: false },
      { id: 't2-opt2', text: 'left at', textEs: 'a la izquierda en', isCorrect: false },
      { id: 't2-opt3', text: 'in front of', textEs: 'delante de', isCorrect: true },
    ],
    correctAnswerId: 't2-opt3',
    explanation: '"in front of" is used to say that something is positioned facing the front of a building: "in front of the office."',
    explanationEs: '"in front of" se usa para decir que algo está situado delante de un edificio: "in front of the office."',
    audioPrompt: 'I parked my car in front of the office.',
    durationSeconds: 15,
  },
  // Test 3: test 3.png
  {
    id: 'd-test-q3',
    number: 3,
    type: 'dropdown',
    instructions: 'Select the correct answer from the drop-down list.',
    instructionsEs: 'Selecciona la respuesta correcta de la lista desplegable.',
    question: 'The child wants to sit next to the window on the bus.',
    questionEs: 'El niño quiere sentarse al lado de la ventana en el autobús.',
    sentencePrefix: 'The child wants to sit',
    sentencePrefixEs: 'El niño quiere sentarse',
    sentenceSuffix: 'the window on the bus.',
    sentenceSuffixEs: 'la ventana en el autobús.',
    imageUrl: twoWomenDirectionsImg,
    options: [
      { id: 't3-opt1', text: 'next to', textEs: 'al lado de', isCorrect: true },
      { id: 't3-opt2', text: 'right at', textEs: 'a la derecha en', isCorrect: false },
      { id: 't3-opt3', text: 'left at', textEs: 'a la izquierda en', isCorrect: false },
    ],
    correctAnswerId: 't3-opt1',
    explanation: '"next to" means beside or adjacent to: "next to the window on the bus."',
    explanationEs: '"next to" significa al lado de o junto a: "next to the window on the bus."',
    audioPrompt: 'The child wants to sit next to the window on the bus.',
    durationSeconds: 15,
  },
  // Test 4: test 4.png
  {
    id: 'd-test-q4',
    number: 4,
    type: 'dropdown',
    instructions: 'Select the correct answer from the drop-down list.',
    instructionsEs: 'Selecciona la respuesta correcta de la lista desplegable.',
    question: "Go left at the school and you'll see my house.",
    questionEs: 'Ve a la izquierda en la escuela y verás mi casa.',
    sentencePrefix: 'Go',
    sentencePrefixEs: 'Ve',
    sentenceSuffix: "the school and you'll see my house.",
    sentenceSuffixEs: 'la escuela y verás mi casa.',
    imageUrl: twoWomenDirectionsImg,
    options: [
      { id: 't4-opt1', text: 'opposite', textEs: 'enfrente de', isCorrect: false },
      { id: 't4-opt2', text: 'left at', textEs: 'a la izquierda en', isCorrect: true },
      { id: 't4-opt3', text: 'turn', textEs: 'girar', isCorrect: false },
    ],
    correctAnswerId: 't4-opt2',
    explanation: '"left at" specifies turning left at a point: "Go left at the school and you\'ll see my house."',
    explanationEs: '"left at" indica doblar a la izquierda al llegar a un lugar: "Go left at the school and you\'ll see my house."',
    audioPrompt: "Go left at the school and you'll see my house.",
    durationSeconds: 15,
  },
  // Test 5: test 5.png
  {
    id: 'd-test-q5',
    number: 5,
    type: 'dropdown',
    instructions: 'Select the correct answer from the drop-down list.',
    instructionsEs: 'Selecciona la respuesta correcta de la lista desplegable.',
    question: 'Turn right at the corner.',
    questionEs: 'Gira a la derecha en la esquina.',
    sentencePrefix: 'Turn',
    sentencePrefixEs: 'Gira',
    sentenceSuffix: 'the corner.',
    sentenceSuffixEs: 'la esquina.',
    imageUrl: twoWomenDirectionsImg,
    options: [
      { id: 't5-opt1', text: 'opposite', textEs: 'enfrente de', isCorrect: false },
      { id: 't5-opt2', text: 'near', textEs: 'cerca', isCorrect: false },
      { id: 't5-opt3', text: 'right at', textEs: 'a la derecha en', isCorrect: true },
    ],
    correctAnswerId: 't5-opt3',
    explanation: '"right at" fits the direction phrase after the verb turn: "Turn right at the corner."',
    explanationEs: '"right at" completa la frase de dirección tras el verbo: "Turn right at the corner."',
    audioPrompt: 'Turn right at the corner.',
    durationSeconds: 15,
  },
  // Test 6: test 6.png
  {
    id: 'd-test-q6',
    number: 6,
    type: 'dropdown',
    instructions: 'Select the correct answer from the drop-down list.',
    instructionsEs: 'Selecciona la respuesta correcta de la lista desplegable.',
    question: 'I live very near the supermarket.',
    questionEs: 'Vivo muy cerca del supermercado.',
    sentencePrefix: 'I live very',
    sentencePrefixEs: 'Vivo muy',
    sentenceSuffix: 'the supermarket.',
    sentenceSuffixEs: 'el supermercado.',
    imageUrl: twoWomenDirectionsImg,
    options: [
      { id: 't6-opt1', text: 'opposite', textEs: 'enfrente de', isCorrect: false },
      { id: 't6-opt2', text: 'near', textEs: 'cerca de', isCorrect: true },
      { id: 't6-opt3', text: 'next to', textEs: 'al lado de', isCorrect: false },
    ],
    correctAnswerId: 't6-opt2',
    explanation: 'We say "very near" to mean a very short distance away. "Next to" does not take "very": "I live very near the supermarket."',
    explanationEs: 'Decimos "very near" para indicar muy poca distancia. "Next to" no admite el modificador "very": "I live very near the supermarket."',
    audioPrompt: 'I live very near the supermarket.',
    durationSeconds: 15,
  },
  // Test 7: test 7.png
  {
    id: 'd-test-q7',
    number: 7,
    type: 'dropdown',
    instructions: 'Select the correct answer from the drop-down list.',
    instructionsEs: 'Selecciona la respuesta correcta de la lista desplegable.',
    question: 'Did you turn left at the bank?',
    questionEs: '¿Giraste a la izquierda en el banco?',
    sentencePrefix: 'Did you',
    sentencePrefixEs: '¿',
    sentenceSuffix: 'left at the bank?',
    sentenceSuffixEs: 'a la izquierda en el banco?',
    imageUrl: twoWomenDirectionsImg,
    options: [
      { id: 't7-opt1', text: 'turn', textEs: 'girar', isCorrect: true },
      { id: 't7-opt2', text: 'give', textEs: 'dar', isCorrect: false },
      { id: 't7-opt3', text: 'near', textEs: 'cerca', isCorrect: false },
    ],
    correctAnswerId: 't7-opt1',
    explanation: '"turn" is the verb indicating changing direction: "Did you turn left at the bank?"',
    explanationEs: '"turn" es el verbo base tras el auxiliar Did: "Did you turn left at the bank?"',
    audioPrompt: 'Did you turn left at the bank?',
    durationSeconds: 15,
  },
  // Test 8: test 8.png
  {
    id: 'd-test-q8',
    number: 8,
    type: 'dropdown',
    instructions: 'Select the correct answer from the drop-down list.',
    instructionsEs: 'Selecciona la respuesta correcta de la lista desplegable.',
    question: "I don't know this city. Let's ask the police officer to give us directions .",
    questionEs: 'No conozco esta ciudad. Pidámosle al policía que nos dé indicaciones.',
    sentencePrefix: "I don't know this city. Let's ask the police officer to",
    sentencePrefixEs: 'No conozco esta ciudad. Pidámosle al oficial de policía que',
    sentenceSuffix: '.',
    sentenceSuffixEs: 'nos dé indicaciones.',
    imageUrl: twoWomenDirectionsImg,
    options: [
      { id: 't8-opt1', text: 'give us directions', textEs: 'nos dé indicaciones', isCorrect: true },
      { id: 't8-opt2', text: 'go near', textEs: 'vaya cerca', isCorrect: false },
      { id: 't8-opt3', text: 'turn right', textEs: 'gire a la derecha', isCorrect: false },
    ],
    correctAnswerId: 't8-opt1',
    explanation: '"give us directions" means instructing us on how to get to our destination: "ask the police officer to give us directions."',
    explanationEs: '"give us directions" significa decirnos cómo llegar: "ask the police officer to give us directions."',
    audioPrompt: "I don't know this city. Let's ask the police officer to give us directions.",
    durationSeconds: 15,
  },
  // Test 9: test 9.png
  {
    id: 'd-test-q9',
    number: 9,
    type: 'dropdown',
    instructions: 'Select the correct answer from the drop-down list.',
    instructionsEs: 'Selecciona la respuesta correcta de la lista desplegable.',
    question: 'The bank is on that street over there.',
    questionEs: 'El banco está en esa calle de allá.',
    sentencePrefix: 'The bank is on that',
    sentencePrefixEs: 'El banco está en esa',
    sentenceSuffix: 'over there.',
    sentenceSuffixEs: 'de allá.',
    imageUrl: twoWomenDirectionsImg,
    options: [
      { id: 't9-opt1', text: 'directions', textEs: 'direcciones', isCorrect: false },
      { id: 't9-opt2', text: 'map', textEs: 'mapa', isCorrect: false },
      { id: 't9-opt3', text: 'street', textEs: 'calle', isCorrect: true },
    ],
    correctAnswerId: 't9-opt3',
    explanation: 'A building is located on a "street": "The bank is on that street over there."',
    explanationEs: 'Un edificio está ubicado en una calle: "The bank is on that street over there."',
    audioPrompt: 'The bank is on that street over there.',
    durationSeconds: 15,
  },
  // Test 10: test 10.png
  {
    id: 'd-test-q10',
    number: 10,
    type: 'dropdown',
    instructions: 'Select the correct answer from the drop-down list.',
    instructionsEs: 'Selecciona la respuesta correcta de la lista desplegable.',
    question: "I'm standing opposite the gift shop.",
    questionEs: 'Estoy parado enfrente de la tienda de regalos.',
    sentencePrefix: "I'm standing",
    sentencePrefixEs: 'Estoy parado',
    sentenceSuffix: 'the gift shop.',
    sentenceSuffixEs: 'la tienda de regalos.',
    imageUrl: twoWomenDirectionsImg,
    options: [
      { id: 't1-opt1', text: 'left at', textEs: 'a la izquierda en', isCorrect: false },
      { id: 't1-opt2', text: 'opposite', textEs: 'enfrente de', isCorrect: true },
      { id: 't1-opt3', text: 'right', textEs: 'derecha', isCorrect: false },
    ],
    correctAnswerId: 't1-opt2',
    explanation: '"opposite" indicates being directly across from or facing: "I\'m standing opposite the gift shop."',
    explanationEs: '"opposite" indica estar situado enfrente o al otro lado: "I\'m standing opposite the gift shop."',
    audioPrompt: "I'm standing opposite the gift shop.",
    durationSeconds: 15,
  },
];

export const DIRECTIONS_TEST_EXERCISE: UnitTestExercise = {
  id: 'directions-act8-test',
  type: 'unit-test',
  title: 'Actividad 8: Test',
  titleEs: 'Actividad 8: Test Final',
  subtitle: 'Test 1 al 10 · Vocabulary Dropdown Mastery',
  subtitleEs: 'Evaluación de Vocabulario: Direcciones (10 Tests)',
  description:
    'Complete the 10 dropdown questions to test your knowledge of directions vocabulary.',
  descriptionEs:
    'Selecciona la respuesta correcta de la lista desplegable en cada oración. Responde los 10 tests en orden para evaluar tu comprensión.',
  totalQuestions: 10,
  vocabularyWords: DIRECTIONS_VOCABULARY,
  questions: DIRECTIONS_TEST_QUESTIONS,
};

// ========================================================
// 7 Sequential Activities for Section 7: Directions
// Followed by Actividad 8: Final Unit Test (10 Questions)
// ========================================================
export const DIRECTIONS_EXERCISES: Exercise[] = [
  // ----------------------------------------------------
  // Actividad 1: Vocabulary Explore (actividad 1.png)
  // ----------------------------------------------------
  {
    id: 'directions-act1-explore',
    type: 'vocabulary-explore',
    title: 'Actividad 1: Directions',
    titleEs: 'Actividad 1: Direcciones',
    instructions:
      'Read the list of words and phrases. Read the example sentences. Listen to the recordings and practice saying the words and phrases. Mark any words you would like to review later.',
    instructionsEs:
      'Lee la lista de palabras y frases. Lee las oraciones de ejemplo. Escucha las grabaciones y practica pronunciar las palabras y frases. Marca las palabras que te gustaría repasar más tarde.',
    words: DIRECTIONS_VOCABULARY,
  },

  // ----------------------------------------------------
  // Actividad 2: Drag word to image (actividad 2.png)
  // ----------------------------------------------------
  {
    id: 'directions-act2-drag-image',
    type: 'drag-word-to-image',
    title: 'Actividad 2: Drag Word to Image',
    titleEs: 'Actividad 2: Arrastrar Palabra a la Imagen',
    instructions: 'Drag the word/s to the correct image.',
    instructionsEs: 'Arrastra la(s) palabra(s) a la imagen correcta.',
    wordBank: ['turn', 'give directions', 'map', 'street'],
    items: [
      {
        id: 'img-street',
        wordEn: 'street',
        wordEs: 'calle',
        imageUrl: STREET_IMAGE,
        imageAlt: 'Empty urban residential street with buildings',
      },
      {
        id: 'img-map',
        wordEn: 'map',
        wordEs: 'mapa',
        imageUrl: MAP_IMAGE,
        imageAlt: 'Detailed road street map',
      },
      {
        id: 'img-give-directions',
        wordEn: 'give directions',
        wordEs: 'dar indicaciones',
        imageUrl: carDirectionsImg,
        imageAlt: 'Person giving directions to driver in car',
      },
      {
        id: 'img-turn',
        wordEn: 'turn',
        wordEs: 'girar / doblar',
        imageUrl: roadTurnLaneImg,
        imageAlt: 'Road with painted turn arrows on asphalt',
      },
    ],
  } as DragWordToImageExercise,

  // ----------------------------------------------------
  // Actividad 3: Dictation 1 (actividad 3.png)
  // ----------------------------------------------------
  {
    id: 'directions-act3-dictation',
    type: 'vocabulary-dictation',
    title: 'Actividad 3: Dictation 1',
    titleEs: 'Actividad 3: Dictado 1',
    instructions:
      'Type the sentences that you hear in the dictation. Pay attention to punctuation.',
    instructionsEs:
      'Escribe las oraciones que escuchas en el dictado. Presta atención a la puntuación.',
    vocabularyWords: DIRECTIONS_VOCABULARY.slice(0, 5),
    items: [
      {
        id: 'dd-1',
        sentenceEn: "Let's look at the map to see where to go.",
        sentenceEs: 'Miremos el mapa para ver adónde ir.',
        audioText: "Let's look at the map to see where to go.",
      },
      {
        id: 'dd-2',
        sentenceEn: 'The parking lot is in front of the office.',
        sentenceEs: 'El estacionamiento está enfrente de la oficina.',
        audioText: 'The parking lot is in front of the office.',
      },
      {
        id: 'dd-3',
        sentenceEn: 'The restaurant is next to a department store.',
        sentenceEs: 'El restaurante está al lado de una tienda departamental.',
        audioText: 'The restaurant is next to a department store.',
      },
      {
        id: 'dd-4',
        sentenceEn: 'Turn left at the supermarket.',
        sentenceEs: 'Gira a la izquierda en el supermercado.',
        audioText: 'Turn left at the supermarket.',
      },
      {
        id: 'dd-5',
        sentenceEn: 'Go right at Prince Street.',
        sentenceEs: 'Ve a la derecha en la calle Prince.',
        audioText: 'Go right at Prince Street.',
      },
    ],
  },

  // ----------------------------------------------------
  // Actividad 4: Dictation 2 (actividad 4.png)
  // ----------------------------------------------------
  {
    id: 'directions-act4-dictation',
    type: 'vocabulary-dictation',
    title: 'Actividad 4: Dictation 2',
    titleEs: 'Actividad 4: Dictado 2',
    instructions:
      'Type the sentences that you hear in the dictation. Pay attention to punctuation.',
    instructionsEs:
      'Escribe las oraciones que escuchas en el dictado. Presta atención a la puntuación.',
    vocabularyWords: DIRECTIONS_VOCABULARY.slice(5, 10),
    items: [
      {
        id: 'dd-6',
        sentenceEn: 'I turned right at the gift shop.',
        sentenceEs: 'Giré a la derecha en la tienda de regalos.',
        audioText: 'I turned right at the gift shop.',
      },
      {
        id: 'dd-7',
        sentenceEn: "Let's walk to the school. It's near here.",
        sentenceEs: 'Caminemos a la escuela. Está cerca de aquí.',
        audioText: "Let's walk to the school. It's near here.",
      },
      {
        id: 'dd-8',
        sentenceEn: 'Can you give me directions to the hospital?',
        sentenceEs: '¿Puedes darme indicaciones para ir al hospital?',
        audioText: 'Can you give me directions to the hospital?',
      },
      {
        id: 'dd-9',
        sentenceEn: 'What street do you live on?',
        sentenceEs: '¿En qué calle vives?',
        audioText: 'What street do you live on?',
      },
      {
        id: 'dd-10',
        sentenceEn: 'The school is opposite the supermarket.',
        sentenceEs: 'La escuela está enfrente del supermercado.',
        audioText: 'The school is opposite the supermarket.',
      },
    ],
  },

  // ----------------------------------------------------
  // Actividad 5: Asking for Directions Cloze (actividad 5.png)
  // ----------------------------------------------------
  {
    id: 'directions-act5-cloze',
    type: 'drag-drop-cloze',
    title: 'Actividad 5: Asking for Directions',
    titleEs: 'Actividad 5: Pidiendo Direcciones',
    storyTitle: 'Asking for Directions',
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    template:
      "Man: Excuse me. I'm lost. Can you [b1], please?\nWoman: Yes, sure. Where do you want to go?\nMan: Browns Department Store. A man said it's [b2] the bank, but here's the bank and I can't see it.\nWoman: Browns Department Store is over there, across the [b3]. You need to turn [b4] the supermarket.\nMan: Ah! Now I understand!",
    translationEs:
      'Hombre: Disculpe. Estoy perdido. ¿Puede darme indicaciones, por favor?\nMujer: Sí, claro. ¿Adónde quiere ir?\nHombre: A la tienda por departamentos Browns. Un hombre dijo que está al lado del banco, pero aquí está el banco y no la veo.\nMujer: Browns está por allá, al otro lado de la calle. Necesita girar a la derecha en el supermercado.\nHombre: ¡Ah! ¡Ahora entiendo!',
    blanks: [
      { id: 'b1', correctAnswer: 'give me directions' },
      { id: 'b2', correctAnswer: 'next to' },
      { id: 'b3', correctAnswer: 'street' },
      { id: 'b4', correctAnswer: 'right at' },
    ],
    wordBank: ['next to', 'right at', 'street', 'give me directions'],
    vocabularyWords: [
      DIRECTIONS_VOCABULARY[0], // give directions
      DIRECTIONS_VOCABULARY[5], // next to
      DIRECTIONS_VOCABULARY[8], // street
      DIRECTIONS_VOCABULARY[7], // right at
    ],
  },

  // ----------------------------------------------------
  // Actividad 6: Park Street Dialogue Dropdowns (actividad 6.png)
  // ----------------------------------------------------
  {
    id: 'directions-act6-dialogue',
    type: 'dialogue-dropdown',
    title: 'Actividad 6: Park Street Dialogue',
    titleEs: 'Actividad 6: Diálogo en la Calle Park',
    instructions: 'Select the correct answer from the drop-down list.',
    instructionsEs: 'Selecciona la respuesta correcta de la lista desplegable.',
    lines: [
      {
        speaker: 'Woman',
        textEn: 'Please can you [b1] me directions to the supermarket?',
        textEs: 'Por favor, ¿puedes darme indicaciones para ir al supermercado?',
      },
      {
        speaker: 'Man',
        textEn: 'Yes, sure. [b2] left into Park Street.',
        textEs: 'Sí, claro. Gira a la izquierda hacia la calle Park.',
      },
      {
        speaker: 'Woman',
        textEn: 'OK.',
        textEs: 'De acuerdo.',
      },
      {
        speaker: 'Man',
        textEn: 'You get to the park and the supermarket is [b3].',
        textEs: 'Llegas al parque y el supermercado está enfrente.',
      },
      {
        speaker: 'Woman',
        textEn: 'I see. You mean across the [b4] from the park?',
        textEs: 'Ya veo. ¿Te refieres al otro lado de la calle del parque?',
      },
      {
        speaker: 'Man',
        textEn: "That's right. It's very [b5].",
        textEs: 'Así es. Está muy cerca.',
      },
    ],
    blanks: [
      {
        id: 'b1',
        options: ['give', 'make', 'turn'],
        correctAnswer: 'give',
      },
      {
        id: 'b2',
        options: ['Turn', 'Go', 'Take'],
        correctAnswer: 'Turn',
      },
      {
        id: 'b3',
        options: ['opposite', 'next to', 'near'],
        correctAnswer: 'opposite',
      },
      {
        id: 'b4',
        options: ['street', 'map', 'turn'],
        correctAnswer: 'street',
      },
      {
        id: 'b5',
        options: ['near', 'opposite', 'left'],
        correctAnswer: 'near',
      },
    ],
    vocabularyWords: [
      DIRECTIONS_VOCABULARY[0], // give directions
      DIRECTIONS_VOCABULARY[9], // turn
      DIRECTIONS_VOCABULARY[6], // opposite
      DIRECTIONS_VOCABULARY[8], // street
      DIRECTIONS_VOCABULARY[4], // near
    ],
  },

  // ----------------------------------------------------
  // Actividad 7: Lost in the City Cloze (actividad 7.png)
  // ----------------------------------------------------
  {
    id: 'directions-act7-lost',
    type: 'drag-drop-cloze',
    title: 'Actividad 7: Lost in the City',
    titleEs: 'Actividad 7: Perdido en la Ciudad',
    storyTitle: 'Lost in the City',
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    template:
      "Hello, Sandy. I'm standing [b1] the library. I'm looking at the [b2] you gave me. But I can't find the museum. I was at the library. I [b3] right on Bank Street. Then [b4] the park. Then left again. Somehow, I'm back on the same [b5] again!",
    translationEs:
      'Hola, Sandy. Estoy parado frente a la biblioteca. Estoy mirando el mapa que me diste. Pero no puedo encontrar el museo. Estaba en la biblioteca. Doblé a la derecha en la calle Bank. Luego a la izquierda en el parque. Luego a la izquierda otra vez. De algún modo, ¡estoy de vuelta en la misma calle otra vez!',
    blanks: [
      { id: 'b1', correctAnswer: 'in front of' },
      { id: 'b2', correctAnswer: 'map' },
      { id: 'b3', correctAnswer: 'turned' },
      { id: 'b4', correctAnswer: 'left at' },
      { id: 'b5', correctAnswer: 'street' },
    ],
    wordBank: ['in front of', 'street', 'turned', 'left at', 'map'],
    vocabularyWords: [
      DIRECTIONS_VOCABULARY[1], // in front of
      DIRECTIONS_VOCABULARY[3], // map
      DIRECTIONS_VOCABULARY[9], // turn
      DIRECTIONS_VOCABULARY[2], // left at
      DIRECTIONS_VOCABULARY[8], // street
    ],
  },

  // ----------------------------------------------------
  // Actividad 8: Final Unit Test (test 1.png - test 10.png)
  // ----------------------------------------------------
  DIRECTIONS_TEST_EXERCISE,
];
