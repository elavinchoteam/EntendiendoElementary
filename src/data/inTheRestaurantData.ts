import restaurantVideo from '../assets/video_in_the_restaurant.mp4';
import waiterImg from '../assets/images/waiter_character_1789767017662.jpg';
import saraImg from '../assets/images/sara_character_1789767028686.jpg';
import rachelImg from '../assets/images/rachel_character_1789767047222.jpg';
import restaurantSceneImg from '../assets/images/restaurant_scene_1789767059202.jpg';
import { RadioChoiceOption, UnitTestQuestion } from '../types';

export { restaurantVideo, waiterImg, saraImg, rachelImg, restaurantSceneImg };

export interface RestaurantDialogueTurn {
  id: string;
  speaker: 'Waiter' | 'Sara' | 'Rachel';
  speakerEs: 'Camarero' | 'Sara' | 'Rachel';
  en: string;
  es: string;
  highlightInActivities?: number[];
}

export const RESTAURANT_DIALOGUE_TURNS: RestaurantDialogueTurn[] = [
  {
    id: 'turn-1',
    speaker: 'Waiter',
    speakerEs: 'Camarero',
    en: "Here's your coffee.",
    es: 'Aquí tiene su café.',
    highlightInActivities: [1, 2, 4, 5],
  },
  {
    id: 'turn-2',
    speaker: 'Sara',
    speakerEs: 'Sara',
    en: 'Thank you.',
    es: 'Gracias.',
    highlightInActivities: [1, 2],
  },
  {
    id: 'turn-3',
    speaker: 'Waiter',
    speakerEs: 'Camarero',
    en: 'And your water.',
    es: 'Y su agua.',
    highlightInActivities: [1, 2, 5],
  },
  {
    id: 'turn-4',
    speaker: 'Sara',
    speakerEs: 'Sara',
    en: 'Do you have any sweetener?',
    es: '¿Tiene edulcorante?',
    highlightInActivities: [1, 4, 6],
  },
  {
    id: 'turn-5',
    speaker: 'Waiter',
    speakerEs: 'Camarero',
    en: "Sure. Here's some.",
    es: 'Seguro. Aquí tiene un poco.',
    highlightInActivities: [1, 4, 6],
  },
  {
    id: 'turn-6',
    speaker: 'Rachel',
    speakerEs: 'Rachel',
    en: "How are the hamburgers here? Oh, they're not very good? Hmm.",
    es: '¿Cómo son las hamburguesas aquí? ¿Oh, no son muy buenas? Mmm.',
    highlightInActivities: [1, 3, 4, 7],
  },
  {
    id: 'turn-7',
    speaker: 'Waiter',
    speakerEs: 'Camarero',
    en: 'Our lasagna is excellent.',
    es: 'Nuestra lasaña es excelente.',
    highlightInActivities: [1, 3, 4, 7],
  },
  {
    id: 'turn-8',
    speaker: 'Rachel',
    speakerEs: 'Rachel',
    en: "OK, I'll try that.",
    es: 'De acuerdo, probaré eso.',
    highlightInActivities: [1, 3, 4, 5],
  },
  {
    id: 'turn-9',
    speaker: 'Waiter',
    speakerEs: 'Camarero',
    en: 'Thank you.',
    es: 'Gracias.',
    highlightInActivities: [1],
  },
  {
    id: 'turn-10',
    speaker: 'Sara',
    speakerEs: 'Sara',
    en: "I'd like a salad, please.",
    es: 'Me gustaría una ensalada, por favor.',
    highlightInActivities: [1, 3],
  },
  {
    id: 'turn-11',
    speaker: 'Waiter',
    speakerEs: 'Camarero',
    en: 'OK. Which one?',
    es: 'De acuerdo. ¿Cuál?',
    highlightInActivities: [1],
  },
  {
    id: 'turn-12',
    speaker: 'Sara',
    speakerEs: 'Sara',
    en: 'Are there tomatoes in the house salad?',
    es: '¿Hay tomates en la ensalada de la casa?',
    highlightInActivities: [1, 4],
  },
  {
    id: 'turn-13',
    speaker: 'Waiter',
    speakerEs: 'Camarero',
    en: 'Yes, there are.',
    es: 'Sí, los hay.',
    highlightInActivities: [1, 4],
  },
  {
    id: 'turn-14',
    speaker: 'Sara',
    speakerEs: 'Sara',
    en: 'Let me see. No, bring me the Mexican salad.',
    es: 'Déjeme ver. No, tráigame la ensalada mexicana.',
    highlightInActivities: [1, 3, 4, 5],
  },
  {
    id: 'turn-15',
    speaker: 'Waiter',
    speakerEs: 'Camarero',
    en: 'How about some chili with that?',
    es: '¿Qué tal un poco de chile con eso?',
    highlightInActivities: [1, 4],
  },
  {
    id: 'turn-16',
    speaker: 'Sara',
    speakerEs: 'Sara',
    en: 'No, only the salad please.',
    es: 'No, solo la ensalada por favor.',
    highlightInActivities: [1, 4],
  },
  {
    id: 'turn-17',
    speaker: 'Waiter',
    speakerEs: 'Camarero',
    en: 'OK, great. One lasagna and one Mexican salad, no extra chili.',
    es: 'De acuerdo, genial. Una lasaña y una ensalada mexicana, sin chile adicional.',
    highlightInActivities: [1, 3, 5],
  },
  {
    id: 'turn-18',
    speaker: 'Sara',
    speakerEs: 'Sara',
    en: 'Thank you.',
    es: 'Gracias.',
    highlightInActivities: [1],
  },
];

export const RESTAURANT_FULL_AUDIO_TEXT = RESTAURANT_DIALOGUE_TURNS.map(
  (t) => `${t.speaker}: ${t.en}`
).join(' ');

// Activity 4 Table classification items
export interface TrueFalseItem {
  id: string;
  text: string;
  textEs: string;
  correctCategory: 'true' | 'false';
}

export const ACTIVITY_4_ITEMS: TrueFalseItem[] = [
  {
    id: 'tf-1',
    text: 'Rachel wants to try the lasagna.',
    textEs: 'Rachel quiere probar la lasaña.',
    correctCategory: 'true',
  },
  {
    id: 'tf-2',
    text: 'Sara orders chili.',
    textEs: 'Sara pide chile.',
    correctCategory: 'false',
  },
  {
    id: 'tf-3',
    text: 'Sara likes to drink coffee with sweetener.',
    textEs: 'A Sara le gusta tomar café con edulcorante.',
    correctCategory: 'true',
  },
  {
    id: 'tf-4',
    text: 'The waiter says the hamburgers are good.',
    textEs: 'El camarero dice que las hamburguesas son buenas.',
    correctCategory: 'false',
  },
  {
    id: 'tf-5',
    text: 'Both women order coffee.',
    textEs: 'Ambas mujeres piden café.',
    correctCategory: 'false',
  },
  {
    id: 'tf-6',
    text: "Sara doesn't want tomatoes.",
    textEs: 'Sara no quiere tomates.',
    correctCategory: 'true',
  },
];

// Activity 5 Person matching items
export interface PersonOrderItem {
  id: string;
  text: string;
  textEs: string;
  correctPerson: 'rachel' | 'sara';
}

export const ACTIVITY_5_ITEMS: PersonOrderItem[] = [
  {
    id: 'order-1',
    text: 'lasagna',
    textEs: 'lasaña',
    correctPerson: 'rachel',
  },
  {
    id: 'order-2',
    text: 'Mexican salad',
    textEs: 'ensalada mexicana',
    correctPerson: 'sara',
  },
  {
    id: 'order-3',
    text: 'water',
    textEs: 'agua',
    correctPerson: 'sara',
  },
  {
    id: 'order-4',
    text: 'coffee',
    textEs: 'café',
    correctPerson: 'sara',
  },
];

// Activity 8 Character matching items
export interface CharacterMatchItem {
  id: string;
  name: string;
  nameEs: string;
  image: string;
  description: string;
  descriptionEs: string;
}

export const ACTIVITY_8_CHARACTERS: CharacterMatchItem[] = [
  {
    id: 'char-waiter',
    name: 'Waiter',
    nameEs: 'Camarero',
    image: waiterImg,
    description: 'The young man with a beard and black t-shirt working at the restaurant.',
    descriptionEs: 'El joven con barba y camiseta negra que trabaja en el restaurante.',
  },
  {
    id: 'char-sara',
    name: 'Sara',
    nameEs: 'Sara',
    image: saraImg,
    description: 'The blonde woman wearing a blue scarf and an orange top.',
    descriptionEs: 'La mujer rubia con bufanda azul y blusa naranja.',
  },
  {
    id: 'char-rachel',
    name: 'Rachel',
    nameEs: 'Rachel',
    image: rachelImg,
    description: 'The woman with curly brown hair wearing a dark jacket over a yellow shirt.',
    descriptionEs: 'La mujer con cabello castaño rizado con chaqueta oscura y blusa amarilla.',
  },
];

// Main Section 1 Activities (1 to 9)
export interface RestaurantActivityData {
  id: string;
  activityNumber: number; // 1 to 9
  type:
    | 'explore'
    | 'radio-choice'
    | 'table-true-false'
    | 'table-person-order'
    | 'character-match'
    | 'ai-writing';
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
  writingPrompt?: string;
  writingPromptEs?: string;
  modelAnswer?: string;
}

export const RESTAURANT_ACTIVITIES: RestaurantActivityData[] = [
  // ACTIVIDAD 1: Video & Transcripción Completa
  {
    id: 'rest-act-1',
    activityNumber: 1,
    type: 'explore',
    title: 'Actividad 1',
    titleEs: 'Actividad 1',
    instructions: 'In the Restaurant',
    instructionsEs: 'En el Restaurante',
    highlightedTurnIds: ['turn-1'],
  },

  // ACTIVIDAD 2: Where are the speakers?
  {
    id: 'rest-act-2',
    activityNumber: 2,
    type: 'radio-choice',
    title: 'Actividad 2',
    titleEs: 'Actividad 2',
    instructions: 'Choose the correct answer.',
    instructionsEs: 'Elige la respuesta correcta.',
    question: 'Where are the speakers?',
    questionEs: '¿Dónde se encuentran los hablantes?',
    options: [
      { id: 'act2-opt-1', text: 'In a kitchen', textEs: 'En una cocina', isCorrect: false },
      { id: 'act2-opt-2', text: 'In a restaurant', textEs: 'En un restaurante', isCorrect: true },
      { id: 'act2-opt-3', text: 'At a bookstore', textEs: 'En una librería', isCorrect: false },
      { id: 'act2-opt-4', text: 'At a grocery store', textEs: 'En una tienda de comestibles', isCorrect: false },
    ],
    correctOptionId: 'act2-opt-2',
    explanationEn:
      'The women are sitting at a table with menus and speaking to a waiter serving drinks and taking their order in a restaurant.',
    explanationEs:
      'Las mujeres están sentadas a una mesa con menús conversando con un camarero que les sirve bebidas y toma su pedido en un restaurante.',
    highlightedTurnIds: ['turn-1', 'turn-2', 'turn-3'],
  },

  // ACTIVIDAD 3: What are the women doing?
  {
    id: 'rest-act-3',
    activityNumber: 3,
    type: 'radio-choice',
    title: 'Actividad 3',
    titleEs: 'Actividad 3',
    instructions: 'Choose the correct answer.',
    instructionsEs: 'Elige la respuesta correcta.',
    question: 'What are the women doing?',
    questionEs: '¿Qué están haciendo las mujeres?',
    options: [
      { id: 'act3-opt-1', text: 'Finishing dessert', textEs: 'Terminando el postre', isCorrect: false },
      { id: 'act3-opt-2', text: 'Ordering food', textEs: 'Pidiendo comida', isCorrect: true },
      { id: 'act3-opt-3', text: 'Talking to each other', textEs: 'Hablando entre sí', isCorrect: false },
      { id: 'act3-opt-4', text: 'Paying the bill', textEs: 'Pagando la cuenta', isCorrect: false },
    ],
    correctOptionId: 'act3-opt-2',
    explanationEn:
      'Rachel and Sara are ordering their meals: Rachel orders the lasagna, and Sara orders the Mexican salad.',
    explanationEs:
      'Rachel y Sara están ordenando su comida: Rachel pide la lasaña y Sara pide la ensalada mexicana.',
    highlightedTurnIds: ['turn-6', 'turn-7', 'turn-8', 'turn-10', 'turn-14'],
  },

  // ACTIVIDAD 4: True or False Table
  {
    id: 'rest-act-4',
    activityNumber: 4,
    type: 'table-true-false',
    title: 'Actividad 4',
    titleEs: 'Actividad 4',
    instructions:
      'Are these sentences about Sara (the woman with blond hair) and Rachel (the woman with brown hair) true or false? Complete the table.',
    instructionsEs:
      '¿Son estas oraciones sobre Sara (la mujer con cabello rubio) y Rachel (la mujer con cabello castaño) verdaderas o falsas? Completa la tabla.',
    explanationEn:
      'Rachel wants lasagna (True). Sara asks for no extra chili (False: she does not order chili). Sara asks for sweetener for her coffee (True). The waiter does not say the hamburgers are good (False). Only Sara receives coffee (False). Sara avoids the house salad because it has tomatoes (True).',
    explanationEs:
      'Rachel quiere probar la lasaña (Verdadero). Sara pide que no le pongan chile (Falso: no ordena chile). Sara pide edulcorante para su café (Verdadero). El camarero no dice que las hamburguesas sean buenas (Falso). Solo a Sara le traen café (Falso). Sara rechaza la ensalada de la casa porque tiene tomates (Verdadero).',
    highlightedTurnIds: ['turn-4', 'turn-6', 'turn-7', 'turn-8', 'turn-12', 'turn-14', 'turn-16'],
  },

  // ACTIVIDAD 5: What do Rachel and Sara order? Match food & drink
  {
    id: 'rest-act-5',
    activityNumber: 5,
    type: 'table-person-order',
    title: 'Actividad 5',
    titleEs: 'Actividad 5',
    instructions: 'What do Rachel and Sara order? Match the food and drink to the correct person.',
    instructionsEs: '¿Qué piden Rachel y Sara? Asocia la comida y bebida con la persona correcta.',
    explanationEn:
      'Rachel orders the lasagna. Sara receives coffee and water, and orders the Mexican salad without extra chili.',
    explanationEs:
      'Rachel pide la lasaña. Sara toma café y agua, y pide la ensalada mexicana sin chile extra.',
    highlightedTurnIds: ['turn-1', 'turn-3', 'turn-8', 'turn-14', 'turn-17'],
  },

  // ACTIVIDAD 6: Sara wants sweetener instead of...
  {
    id: 'rest-act-6',
    activityNumber: 6,
    type: 'radio-choice',
    title: 'Actividad 6',
    titleEs: 'Actividad 6',
    instructions: 'Choose the correct answer.',
    instructionsEs: 'Elige la respuesta correcta.',
    question: 'Sara wants sweetener instead of...',
    questionEs: 'Sara quiere edulcorante en lugar de...',
    options: [
      { id: 'act6-opt-1', text: 'soda.', textEs: 'refresco.', isCorrect: false },
      { id: 'act6-opt-2', text: 'salt.', textEs: 'sal.', isCorrect: false },
      { id: 'act6-opt-3', text: 'sugar.', textEs: 'azúcar.', isCorrect: true },
      { id: 'act6-opt-4', text: 'coffee.', textEs: 'café.', isCorrect: false },
    ],
    correctOptionId: 'act6-opt-3',
    explanationEn:
      'Sweetener is an artificial or natural substitute used in coffee instead of regular sugar.',
    explanationEs:
      'El edulcorante (sweetener) es un endulzante que se utiliza en el café en lugar del azúcar tradicional (sugar).',
    highlightedTurnIds: ['turn-4', 'turn-5'],
  },

  // ACTIVIDAD 7: What does the waiter say is "excellent"?
  {
    id: 'rest-act-7',
    activityNumber: 7,
    type: 'radio-choice',
    title: 'Actividad 7',
    titleEs: 'Actividad 7',
    instructions: 'Choose the correct answer.',
    instructionsEs: 'Elige la respuesta correcta.',
    question: 'What does the waiter say is "excellent"?',
    questionEs: '¿Qué dice el camarero que es "excelente"?',
    options: [
      { id: 'act7-opt-1', text: 'The chili', textEs: 'El chile', isCorrect: false },
      { id: 'act7-opt-2', text: 'The coffee', textEs: 'El café', isCorrect: false },
      { id: 'act7-opt-3', text: 'The lasagna', textEs: 'La lasaña', isCorrect: true },
      { id: 'act7-opt-4', text: 'The Mexican salad', textEs: 'La ensalada mexicana', isCorrect: false },
    ],
    correctOptionId: 'act7-opt-3',
    explanationEn:
      'When Rachel asks about the hamburgers, the waiter points out: "Our lasagna is excellent."',
    explanationEs:
      'Cuando Rachel consulta por las hamburguesas, el camarero afirma enfáticamente: "Our lasagna is excellent." (Nuestra lasaña es excelente).',
    highlightedTurnIds: ['turn-6', 'turn-7'],
  },

  // ACTIVIDAD 8: Match characters to images
  {
    id: 'rest-act-8',
    activityNumber: 8,
    type: 'character-match',
    title: 'Actividad 8',
    titleEs: 'Actividad 8',
    instructions: 'Match the characters to the images.',
    instructionsEs: 'Asocia los personajes con las imágenes.',
    explanationEn:
      'Image 1 is the Waiter (with short dark beard and black t-shirt), Image 2 is Sara (blonde hair with blue scarf), and Image 3 is Rachel (curly brown hair with dark jacket).',
    explanationEs:
      'La Imagen 1 corresponde al Camarero (con barba corta y camiseta negra), la Imagen 2 es Sara (rubia con bufanda azul) y la Imagen 3 es Rachel (cabello castaño rizado con chaqueta oscura).',
    highlightedTurnIds: ['turn-1', 'turn-6', 'turn-10'],
  },

  // ACTIVIDAD 9: Writing with AI feedback
  {
    id: 'rest-act-9',
    activityNumber: 9,
    type: 'ai-writing',
    title: 'Actividad 9',
    titleEs: 'Actividad 9',
    instructions:
      'Write your answer, review AI feedback, improve it, and mark Done if satisfied or get another AI feedback.',
    instructionsEs:
      'Escribe tu respuesta, revisa la retroalimentación de la IA, mejórala y marca Listo si estás satisfecho o solicita otra retroalimentación de la IA.',
    writingPrompt:
      'The waiter tells a friend about what Sara and Rachel ordered to eat and drink. Write what the waiter says.',
    writingPromptEs:
      'El camarero le cuenta a un amigo lo que Sara y Rachel pidieron para comer y beber. Escribe lo que dice el camarero.',
    modelAnswer:
      'Sara drank coffee with sweetener and a glass of water. For her meal, she ordered a Mexican salad without extra chili because she did not want tomatoes. Rachel wanted to order a hamburger, but after I told her about our dishes, she decided to try our excellent lasagna instead.',
    explanationEn:
      'Good responses mention the waiter bringing coffee and water, Rachel choosing lasagna over hamburgers, and Sara choosing the Mexican salad without extra chili.',
    explanationEs:
      'Las buenas respuestas mencionan al camarero trayendo café y agua, a Rachel eligiendo la lasaña en vez de hamburguesa, y a Sara eligiendo la ensalada mexicana sin chile adicional.',
    highlightedTurnIds: ['turn-1', 'turn-3', 'turn-4', 'turn-7', 'turn-8', 'turn-14', 'turn-16'],
  },
];

// ACTIVIDAD 10: TEST (5 tests en orden estricto)
export const RESTAURANT_UNIT_TEST_QUESTIONS: UnitTestQuestion[] = [
  // TEST 1
  {
    id: 'rest-test-q1',
    number: 1,
    instructions: 'Choose the correct answer.',
    instructionsEs: 'Elige la respuesta correcta.',
    question: 'What are the women drinking?',
    questionEs: '¿Qué están bebiendo las mujeres?',
    options: [
      { id: 't1-opt-1', text: 'Coffee and tea', textEs: 'Café y té', isCorrect: false },
      { id: 't1-opt-2', text: 'Juice and water', textEs: 'Jugo y agua', isCorrect: false },
      { id: 't1-opt-3', text: 'Soda and coffee', textEs: 'Refresco y café', isCorrect: false },
      { id: 't1-opt-4', text: 'Water and coffee', textEs: 'Agua y café', isCorrect: true },
    ],
    correctAnswerId: 't1-opt-4',
    explanation: 'The waiter brings them coffee and water: "Here\'s your coffee... And your water."',
    explanationEs:
      'El camarero les sirve café y agua diciendo: "Here\'s your coffee... And your water." (Aquí está su café... Y su agua).',
  },

  // TEST 2
  {
    id: 'rest-test-q2',
    number: 2,
    instructions: 'Choose the correct answer.',
    instructionsEs: 'Elige la respuesta correcta.',
    question: "Why doesn't Rachel order a hamburger?",
    questionEs: '¿Por qué Rachel no pide una hamburguesa?',
    options: [
      { id: 't2-opt-1', text: "They aren't very good.", textEs: 'No son muy buenas.', isCorrect: true },
      { id: 't2-opt-2', text: 'They are too expensive.', textEs: 'Son demasiado caras.', isCorrect: false },
      { id: 't2-opt-3', text: "The restaurant doesn't make them.", textEs: 'El restaurante no las prepara.', isCorrect: false },
      { id: 't2-opt-4', text: "She doesn't like hamburgers.", textEs: 'A ella no le gustan las hamburguesas.', isCorrect: false },
    ],
    correctAnswerId: 't2-opt-1',
    explanation:
      'Rachel says: "How are the hamburgers here? Oh, they\'re not very good? Hmm." then chooses the lasagna instead.',
    explanationEs:
      'Rachel pregunta: "How are the hamburgers here? Oh, they\'re not very good? Hmm." (¿Cómo son las hamburguesas aquí? ¿Oh, no son muy buenas? Mmm) y por eso no las pide.',
  },

  // TEST 3
  {
    id: 'rest-test-q3',
    number: 3,
    instructions: 'Choose the correct answer.',
    instructionsEs: 'Elige la respuesta correcta.',
    question: 'Which food does the waiter recommend?',
    questionEs: '¿Qué comida recomienda el camarero?',
    options: [
      { id: 't3-opt-1', text: 'The chili', textEs: 'El chile', isCorrect: false },
      { id: 't3-opt-2', text: 'The lasagna', textEs: 'La lasaña', isCorrect: true },
      { id: 't3-opt-3', text: 'The house salad', textEs: 'La ensalada de la casa', isCorrect: false },
      { id: 't3-opt-4', text: 'The Mexican salad', textEs: 'La ensalada mexicana', isCorrect: false },
    ],
    correctAnswerId: 't3-opt-2',
    explanation: 'The waiter specifically recommends: "Our lasagna is excellent."',
    explanationEs:
      'El camarero recomienda puntualmente: "Our lasagna is excellent." (Nuestra lasaña es excelente).',
  },

  // TEST 4
  {
    id: 'rest-test-q4',
    number: 4,
    instructions: 'Choose the correct answer.',
    instructionsEs: 'Elige la respuesta correcta.',
    question: 'What is in the house salad?',
    questionEs: '¿Qué hay en la ensalada de la casa?',
    options: [
      { id: 't4-opt-1', text: 'Sweetener', textEs: 'Edulcorante', isCorrect: false },
      { id: 't4-opt-2', text: 'Tomatoes', textEs: 'Tomates', isCorrect: true },
      { id: 't4-opt-3', text: 'Chili', textEs: 'Chile', isCorrect: false },
      { id: 't4-opt-4', text: 'Tacos', textEs: 'Tacos', isCorrect: false },
    ],
    correctAnswerId: 't4-opt-2',
    explanation:
      'Sara asks: "Are there tomatoes in the house salad?" and the waiter confirms: "Yes, there are."',
    explanationEs:
      'Sara indaga: "¿Hay tomates en la ensalada de la casa?" y el camarero confirma: "Yes, there are." (Sí, los hay).',
  },

  // TEST 5
  {
    id: 'rest-test-q5',
    number: 5,
    instructions: 'Choose the correct answer.',
    instructionsEs: 'Elige la respuesta correcta.',
    question: 'Sara would like chili with her salad.',
    questionEs: 'A Sara le gustaría chile con su ensalada.',
    options: [
      { id: 't5-opt-1', text: 'True', textEs: 'Verdadero', isCorrect: false },
      { id: 't5-opt-2', text: 'False', textEs: 'Falso', isCorrect: true },
      { id: 't5-opt-3', text: "We don't know.", textEs: 'No lo sabemos.', isCorrect: false },
    ],
    correctAnswerId: 't5-opt-2',
    explanation:
      'When the waiter asks: "How about some chili with that?", Sara declines: "No, only the salad please."',
    explanationEs:
      'Cuando el camarero le pregunta: "¿Qué tal un poco de chile con eso?", Sara responde con claridad: "No, only the salad please." (No, solo la ensalada por favor).',
  },
];
