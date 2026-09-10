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

// ========================================================
// Section 6: In the Kitchen - 10 Vocabulary Items (actividad 1.png)
// ========================================================
export const IN_THE_KITCHEN_VOCABULARY: VocabularyWordItem[] = [
  {
    id: 'k-w1',
    word: 'bake',
    translation: 'hornear',
    partOfSpeech: 'verb',
    partOfSpeechEs: 'verbo',
    definitionEn: 'to cook food such as bread, cakes, or cookies in an oven using dry heat',
    definitionEs: 'cocinar alimentos como pan, pasteles o galletas en un horno con calor seco',
    exampleEn: 'I baked a chocolate cake in my new oven.',
    exampleEs: 'Horneé un pastel de chocolate en mi horno nuevo.',
    imageUrl:
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
    audioPromptWord: 'bake',
    audioPromptExample: 'I baked a chocolate cake in my new oven.',
  },
  {
    id: 'k-w2',
    word: 'cook',
    translation: 'cocinar',
    partOfSpeech: 'verb',
    partOfSpeechEs: 'verbo',
    definitionEn: 'to prepare food to be eaten by heating it, using a stove, oven, or fire',
    definitionEs: 'preparar alimentos para comer calentándolos en una estufa, horno o fuego',
    exampleEn: 'Cook the chicken until it is brown on the outside and white inside.',
    exampleEs: 'Cocina el pollo hasta que esté dorado por fuera y blanco por dentro.',
    imageUrl:
      'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80',
    audioPromptWord: 'cook',
    audioPromptExample: 'Cook the chicken until it is brown on the outside and white inside.',
  },
  {
    id: 'k-w3',
    word: 'cookbook',
    translation: 'libro de cocina / recetario',
    partOfSpeech: 'noun',
    partOfSpeechEs: 'sustantivo',
    definitionEn: 'a book that contains recipes and instructions on how to prepare and cook food',
    definitionEs: 'un libro que contiene recetas e instrucciones sobre cómo preparar y cocinar alimentos',
    exampleEn: 'She made some great meals from her new cookbook.',
    exampleEs: 'Ella preparó excelentes comidas con su nuevo libro de cocina.',
    imageUrl:
      'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=800&q=80',
    audioPromptWord: 'cookbook',
    audioPromptExample: 'She made some great meals from her new cookbook.',
  },
  {
    id: 'k-w4',
    word: 'cup',
    translation: 'taza',
    partOfSpeech: 'noun',
    partOfSpeechEs: 'sustantivo',
    definitionEn: 'a small container with a handle, typically used for drinking hot liquids like tea or coffee',
    definitionEs: 'un recipiente pequeño con asa, comúnmente usado para beber café o té',
    exampleEn: 'Would you like a cup of coffee?',
    exampleEs: '¿Te gustaría una taza de café?',
    imageUrl:
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    audioPromptWord: 'cup',
    audioPromptExample: 'Would you like a cup of coffee?',
  },
  {
    id: 'k-w5',
    word: 'dish',
    translation: 'plato hondo / fuente / platillo',
    partOfSpeech: 'noun',
    partOfSpeechEs: 'sustantivo',
    definitionEn: 'a container such as a bowl or shallow vessel used for cooking, serving, or holding food',
    definitionEs: 'un recipiente hondo o fuente utilizado para cocinar, servir o contener alimentos',
    exampleEn: 'Please put the soup dishes on the table.',
    exampleEs: 'Por favor, pon los platos soperos en la mesa.',
    imageUrl:
      'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80',
    audioPromptWord: 'dish',
    audioPromptExample: 'Please put the soup dishes on the table.',
  },
  {
    id: 'k-w6',
    word: 'freeze',
    translation: 'congelar',
    partOfSpeech: 'verb',
    partOfSpeechEs: 'verbo',
    definitionEn: 'to preserve food at very low temperatures so it turns to ice and can be stored',
    definitionEs: 'conservar alimentos a muy baja temperatura para guardarlos y consumirlos después',
    exampleEn: 'You can freeze this food and eat it next week.',
    exampleEs: 'Puedes congelar esta comida y comerla la próxima semana.',
    imageUrl:
      'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=800&q=80',
    audioPromptWord: 'freeze',
    audioPromptExample: 'You can freeze this food and eat it next week.',
  },
  {
    id: 'k-w7',
    word: 'fresh',
    translation: 'fresco / fresca',
    partOfSpeech: 'adjective',
    partOfSpeechEs: 'adjetivo',
    definitionEn: 'recently picked, produced, or made, and not frozen, dried, or canned',
    definitionEs: 'recién cosechado, preparado o elaborado, no congelado ni enlatado',
    exampleEn: 'I have some fresh tomatoes from my garden.',
    exampleEs: 'Tengo unos tomates frescos de mi jardín.',
    imageUrl:
      'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
    audioPromptWord: 'fresh',
    audioPromptExample: 'I have some fresh tomatoes from my garden.',
  },
  {
    id: 'k-w8',
    word: 'meal',
    translation: 'comida (desayuno, almuerzo, cena)',
    partOfSpeech: 'noun',
    partOfSpeechEs: 'sustantivo',
    definitionEn: 'an occasion when food is served or eaten, such as breakfast, lunch, or dinner',
    definitionEs: 'la ocasión u horario en que se come, como el desayuno, almuerzo o cena',
    exampleEn: "I don't always eat three meals a day.",
    exampleEs: 'No siempre como tres comidas al día.',
    imageUrl:
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    audioPromptWord: 'meal',
    audioPromptExample: "I don't always eat three meals a day.",
  },
  {
    id: 'k-w9',
    word: 'plate',
    translation: 'plato (vajilla llana)',
    partOfSpeech: 'noun',
    partOfSpeechEs: 'sustantivo',
    definitionEn: 'a flat dish, typically circular, from which food is eaten or served',
    definitionEs: 'un plato plano de vajilla sobre el que se sirve o se come la comida',
    exampleEn: 'The dinner plates are on the table.',
    exampleEs: 'Los platos de la cena están en la mesa.',
    imageUrl:
      'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80',
    audioPromptWord: 'plate',
    audioPromptExample: 'The dinner plates are on the table.',
  },
  {
    id: 'k-w10',
    word: 'serve',
    translation: 'servir',
    partOfSpeech: 'verb',
    partOfSpeechEs: 'verbo',
    definitionEn: 'to provide people with food and drink at a meal or in a restaurant',
    definitionEs: 'ofrecer y poner la comida o bebida a las personas en la mesa o restaurante',
    exampleEn: 'I always serve salads with meals.',
    exampleEs: 'Siempre sirvo ensaladas con las comidas.',
    imageUrl:
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    audioPromptWord: 'serve',
    audioPromptExample: 'I always serve salads with meals.',
  },
];

// Shared image for test questions 1 to 10 matching test 1.png - test 10.png
const KITCHEN_TEST_IMAGE =
  'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=800&q=80';

// ========================================================
// Section 6: Test Questions 1 to 10 (test 1.png - test 10.png)
// ========================================================
export const IN_THE_KITCHEN_TEST_QUESTIONS: UnitTestQuestion[] = [
  // Test 1: test 1.png
  {
    id: 'k-test-q1',
    number: 1,
    type: 'dropdown',
    instructions: 'Select the correct answer from the drop-down list.',
    instructionsEs: 'Selecciona la respuesta correcta de la lista desplegable.',
    question: 'Can you help me bake some bread?',
    questionEs: '¿Puedes ayudarme a hornear pan?',
    sentencePrefix: 'Can you help me',
    sentencePrefixEs: '¿Puedes ayudarme a',
    sentenceSuffix: 'some bread?',
    sentenceSuffixEs: 'pan?',
    imageUrl: KITCHEN_TEST_IMAGE,
    options: [
      { id: 't1-opt1', text: 'bake', textEs: 'hornear', isCorrect: true },
      { id: 't1-opt2', text: 'serve', textEs: 'servir', isCorrect: false },
      { id: 't1-opt3', text: 'cook', textEs: 'cocinar', isCorrect: false },
    ],
    correctAnswerId: 't1-opt1',
    explanation: 'We use "bake" for bread, cakes, and cookies made in an oven: "Can you help me bake some bread?"',
    explanationEs: 'Usamos "bake" (hornear) para pan, pasteles y galletas hechos al horno: "¿Puedes ayudarme a hornear pan?".',
    audioPrompt: 'Can you help me bake some bread?',
    durationSeconds: 15,
  },
  // Test 2: test 2.png
  {
    id: 'k-test-q2',
    number: 2,
    type: 'dropdown',
    instructions: 'Select the correct answer from the drop-down list.',
    instructionsEs: 'Selecciona la respuesta correcta de la lista desplegable.',
    question: "Let's go out to a restaurant. I don't want to cook tonight.",
    questionEs: 'Salgamos a un restaurante. No quiero cocinar esta noche.',
    sentencePrefix: "Let's go out to a restaurant. I don't want to",
    sentencePrefixEs: 'Salgamos a un restaurante. No quiero',
    sentenceSuffix: 'tonight.',
    sentenceSuffixEs: 'esta noche.',
    imageUrl: KITCHEN_TEST_IMAGE,
    options: [
      { id: 't2-opt1', text: 'cook', textEs: 'cocinar', isCorrect: true },
      { id: 't2-opt2', text: 'bake', textEs: 'hornear', isCorrect: false },
      { id: 't2-opt3', text: 'serve', textEs: 'servir', isCorrect: false },
    ],
    correctAnswerId: 't2-opt1',
    explanation: '"Cook" refers generally to preparing food: "I don\'t want to cook tonight."',
    explanationEs: '"Cook" significa cocinar los alimentos: "No quiero cocinar esta noche".',
    audioPrompt: "Let's go out to a restaurant. I don't want to cook tonight.",
    durationSeconds: 15,
  },
  // Test 3: test 3.png
  {
    id: 'k-test-q3',
    number: 3,
    type: 'dropdown',
    instructions: 'Select the correct answer from the drop-down list.',
    instructionsEs: 'Selecciona la respuesta correcta de la lista desplegable.',
    question: 'She loves cooking and she has lots of cookbooks at home.',
    questionEs: 'A ella le encanta cocinar y tiene muchos libros de cocina en casa.',
    sentencePrefix: 'She loves cooking and she has lots of',
    sentencePrefixEs: 'A ella le encanta cocinar y tiene muchos',
    sentenceSuffix: 'at home.',
    sentenceSuffixEs: 'en casa.',
    imageUrl: KITCHEN_TEST_IMAGE,
    options: [
      { id: 't3-opt1', text: 'cookbooks', textEs: 'libros de cocina', isCorrect: true },
      { id: 't3-opt2', text: 'meals', textEs: 'comidas', isCorrect: false },
      { id: 't3-opt3', text: 'cups', textEs: 'tazas', isCorrect: false },
    ],
    correctAnswerId: 't3-opt1',
    explanation: 'A "cookbook" is a book containing recipes: "she has lots of cookbooks at home."',
    explanationEs: 'Un "cookbook" es un libro de cocina o recetas: "tiene muchos libros de cocina en casa".',
    audioPrompt: 'She loves cooking and she has lots of cookbooks at home.',
    durationSeconds: 15,
  },
  // Test 4: test 4.png
  {
    id: 'k-test-q4',
    number: 4,
    type: 'dropdown',
    instructions: 'Select the correct answer from the drop-down list.',
    instructionsEs: 'Selecciona la respuesta correcta de la lista desplegable.',
    question: 'Can I make you a cup of tea?',
    questionEs: '¿Puedo prepararte una taza de té?',
    sentencePrefix: 'Can I make you a',
    sentencePrefixEs: '¿Puedo prepararte una',
    sentenceSuffix: 'of tea?',
    sentenceSuffixEs: 'de té?',
    imageUrl: KITCHEN_TEST_IMAGE,
    options: [
      { id: 't4-opt1', text: 'dish', textEs: 'plato hondo', isCorrect: false },
      { id: 't4-opt2', text: 'meal', textEs: 'comida', isCorrect: false },
      { id: 't4-opt3', text: 'cup', textEs: 'taza', isCorrect: true },
    ],
    correctAnswerId: 't4-opt3',
    explanation: 'We say a "cup of tea" or a "cup of coffee".',
    explanationEs: 'Decimos una "cup of tea" (taza de té) o "cup of coffee" (taza de café).',
    audioPrompt: 'Can I make you a cup of tea?',
    durationSeconds: 15,
  },
  // Test 5: test 5.png
  {
    id: 'k-test-q5',
    number: 5,
    type: 'dropdown',
    instructions: 'Select the correct answer from the drop-down list.',
    instructionsEs: 'Selecciona la respuesta correcta de la lista desplegable.',
    question: 'Please help me put the dishes on the table.',
    questionEs: 'Por favor, ayúdame a poner los platos en la mesa.',
    sentencePrefix: 'Please help me put the',
    sentencePrefixEs: 'Por favor, ayúdame a poner los',
    sentenceSuffix: 'on the table.',
    sentenceSuffixEs: 'en la mesa.',
    imageUrl: KITCHEN_TEST_IMAGE,
    options: [
      { id: 't5-opt1', text: 'fresh', textEs: 'fresco', isCorrect: false },
      { id: 't5-opt2', text: 'dishes', textEs: 'platos / vajilla', isCorrect: true },
      { id: 't5-opt3', text: 'meals', textEs: 'comidas', isCorrect: false },
    ],
    correctAnswerId: 't5-opt2',
    explanation: '"Dishes" refers to the tableware (bowls, serving dishes) put on the table.',
    explanationEs: '"Dishes" se refiere a la vajilla y platos que se colocan en la mesa.',
    audioPrompt: 'Please help me put the dishes on the table.',
    durationSeconds: 15,
  },
  // Test 6: test 6.png
  {
    id: 'k-test-q6',
    number: 6,
    type: 'dropdown',
    instructions: 'Select the correct answer from the drop-down list.',
    instructionsEs: 'Selecciona la respuesta correcta de la lista desplegable.',
    question: "We didn't finish all the food so I froze it to eat later.",
    questionEs: 'No terminamos toda la comida así que la congelé para comerla más tarde.',
    sentencePrefix: "We didn't finish all the food so I",
    sentencePrefixEs: 'No terminamos toda la comida así que la',
    sentenceSuffix: 'it to eat later.',
    sentenceSuffixEs: 'para comerla más tarde.',
    imageUrl: KITCHEN_TEST_IMAGE,
    options: [
      { id: 't6-opt1', text: 'baked', textEs: 'horneé', isCorrect: false },
      { id: 't6-opt2', text: 'froze', textEs: 'congelé', isCorrect: true },
      { id: 't6-opt3', text: 'served', textEs: 'serví', isCorrect: false },
    ],
    correctAnswerId: 't6-opt2',
    explanation: '"Froze" is the past tense of "freeze", meaning preserving food at freezing temperatures.',
    explanationEs: '"Froze" es el pasado simple del verbo "freeze" (congelar): "la congelé para comerla más tarde".',
    audioPrompt: "We didn't finish all the food so I froze it to eat later.",
    durationSeconds: 15,
  },
  // Test 7: test 7.png
  {
    id: 'k-test-q7',
    number: 7,
    type: 'dropdown',
    instructions: 'Select the correct answer from the drop-down list.',
    instructionsEs: 'Selecciona la respuesta correcta de la lista desplegable.',
    question: 'I just made the salad so it\'s very fresh.',
    questionEs: 'Acabo de preparar la ensalada así que está muy fresca.',
    sentencePrefix: 'I just made the salad so it\'s very',
    sentencePrefixEs: 'Acabo de preparar la ensalada así que está muy',
    sentenceSuffix: '.',
    sentenceSuffixEs: '.',
    imageUrl: KITCHEN_TEST_IMAGE,
    options: [
      { id: 't7-opt1', text: 'freeze', textEs: 'congelar', isCorrect: false },
      { id: 't7-opt2', text: 'cup', textEs: 'taza', isCorrect: false },
      { id: 't7-opt3', text: 'fresh', textEs: 'fresca', isCorrect: true },
    ],
    correctAnswerId: 't7-opt3',
    explanation: 'The adjective "fresh" describes recently made, crisp food.',
    explanationEs: 'El adjetivo "fresh" (fresca) describe comida recién hecha o cosechada.',
    audioPrompt: "I just made the salad so it's very fresh.",
    durationSeconds: 15,
  },
  // Test 8: test 8.png
  {
    id: 'k-test-q8',
    number: 8,
    type: 'dropdown',
    instructions: 'Select the correct answer from the drop-down list.',
    instructionsEs: 'Selecciona la respuesta correcta de la lista desplegable.',
    question: 'I eat my big meal at lunch time.',
    questionEs: 'Como mi comida fuerte a la hora del almuerzo.',
    sentencePrefix: 'I eat my big',
    sentencePrefixEs: 'Como mi',
    sentenceSuffix: 'at lunch time.',
    sentenceSuffixEs: 'fuerte a la hora del almuerzo.',
    imageUrl: KITCHEN_TEST_IMAGE,
    options: [
      { id: 't8-opt1', text: 'dish', textEs: 'fuente', isCorrect: false },
      { id: 't8-opt2', text: 'meal', textEs: 'comida', isCorrect: true },
      { id: 't8-opt3', text: 'plate', textEs: 'plato', isCorrect: false },
    ],
    correctAnswerId: 't8-opt2',
    explanation: 'A "meal" is an eating occasion like lunch or dinner: "my big meal at lunch time."',
    explanationEs: '"Meal" se refiere a la ocasión de la comida (desayuno, almuerzo, cena): "mi comida fuerte al mediodía".',
    audioPrompt: 'I eat my big meal at lunch time.',
    durationSeconds: 15,
  },
  // Test 9: test 9.png
  {
    id: 'k-test-q9',
    number: 9,
    type: 'dropdown',
    instructions: 'Select the correct answer from the drop-down list.',
    instructionsEs: 'Selecciona la respuesta correcta de la lista desplegable.',
    question: "Bring your plate to the kitchen and I'll give you more pancakes.",
    questionEs: 'Trae tu plato a la cocina y te serviré más panqueques.',
    sentencePrefix: 'Bring your',
    sentencePrefixEs: 'Trae tu',
    sentenceSuffix: "to the kitchen and I'll give you more pancakes.",
    sentenceSuffixEs: 'a la cocina y te serviré más panqueques.',
    imageUrl: KITCHEN_TEST_IMAGE,
    options: [
      { id: 't9-opt1', text: 'meal', textEs: 'comida', isCorrect: false },
      { id: 't9-opt2', text: 'plate', textEs: 'plato', isCorrect: true },
      { id: 't9-opt3', text: 'cup', textEs: 'taza', isCorrect: false },
    ],
    correctAnswerId: 't9-opt2',
    explanation: 'A "plate" is the dish you hold your food on: "Bring your plate to the kitchen."',
    explanationEs: '"Plate" es el plato plano sobre el que se sirve la comida.',
    audioPrompt: "Bring your plate to the kitchen and I'll give you more pancakes.",
    durationSeconds: 15,
  },
  // Test 10: test 10.png
  {
    id: 'k-test-q10',
    number: 10,
    type: 'dropdown',
    instructions: 'Select the correct answer from the drop-down list.',
    instructionsEs: 'Selecciona la respuesta correcta de la lista desplegable.',
    question: 'Does this restaurant serve fish?',
    questionEs: '¿Este restaurante sirve pescado?',
    sentencePrefix: 'Does this restaurant',
    sentencePrefixEs: '¿Este restaurante',
    sentenceSuffix: 'fish?',
    sentenceSuffixEs: 'pescado?',
    imageUrl: KITCHEN_TEST_IMAGE,
    options: [
      { id: 't10-opt1', text: 'serve', textEs: 'sirve', isCorrect: true },
      { id: 't10-opt2', text: 'freeze', textEs: 'congela', isCorrect: false },
      { id: 't10-opt3', text: 'fresh', textEs: 'fresco', isCorrect: false },
    ],
    correctAnswerId: 't10-opt1',
    explanation: 'Restaurants "serve" food and drinks to customers: "Does this restaurant serve fish?"',
    explanationEs: 'Los restaurantes "serve" (sirven) comida y bebidas a los clientes.',
    audioPrompt: 'Does this restaurant serve fish?',
    durationSeconds: 15,
  },
];

// ========================================================
// Actividad 8: Final Unit Test (test 1.png - test 10.png)
// ========================================================
export const IN_THE_KITCHEN_TEST_EXERCISE: UnitTestExercise = {
  id: 'kitchen-act8-test',
  type: 'unit-test',
  title: 'Section 6: In the Kitchen · Final Test',
  titleEs: 'Sección 6: En la Cocina · Test Final',
  subtitle: 'Mastery Test · 10 Questions',
  subtitleEs: 'Evaluación de Dominio · 10 Preguntas',
  description:
    'Select the correct answer from the drop-down list for each sentence. Answer all 10 questions to test your comprehension.',
  descriptionEs:
    'Selecciona la respuesta correcta de la lista desplegable en cada oración. Responde las 10 preguntas para evaluar tu comprensión.',
  totalQuestions: 10,
  vocabularyWords: IN_THE_KITCHEN_VOCABULARY,
  questions: IN_THE_KITCHEN_TEST_QUESTIONS,
};

// ========================================================
// 7 Sequential Activities for Section 6: In the Kitchen
// Followed by Actividad 8: Final Unit Test (10 Questions)
// ========================================================
export const IN_THE_KITCHEN_EXERCISES: Exercise[] = [
  // ----------------------------------------------------
  // Actividad 1: Vocabulary Explore (actividad 1.png)
  // ----------------------------------------------------
  {
    id: 'kitchen-act1-explore',
    type: 'vocabulary-explore',
    title: 'In the Kitchen',
    titleEs: 'En la Cocina',
    instructions:
      'Read the list of words and phrases. Read the example sentences. Listen to the recordings and practice saying the words and phrases. Mark any words you would like to review later.',
    instructionsEs:
      'Lee la lista de palabras y frases. Lee las oraciones de ejemplo. Escucha las grabaciones y practica pronunciar las palabras y frases. Marca las palabras que te gustaría repasar más tarde.',
    words: IN_THE_KITCHEN_VOCABULARY,
  },

  // ----------------------------------------------------
  // Actividad 2: Drag word to image (actividad 2.png)
  // ----------------------------------------------------
  {
    id: 'kitchen-act2-drag-image',
    type: 'drag-word-to-image',
    instructions: 'Drag the word/s to the correct image.',
    instructionsEs: 'Arrastra la(s) palabra(s) a la imagen correcta.',
    wordBank: ['serve', 'dish', 'bake', 'cup', 'cookbook', 'freeze'],
    items: [
      {
        id: 'img-cookbook',
        wordEn: 'cookbook',
        wordEs: 'libro de cocina',
        imageUrl:
          'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=600&q=80',
        imageAlt: 'Open cookbook with rolling pin and utensils',
      },
      {
        id: 'img-cup',
        wordEn: 'cup',
        wordEs: 'taza',
        imageUrl:
          'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
        imageAlt: 'Ceramic coffee cup on table',
      },
      {
        id: 'img-dish',
        wordEn: 'dish',
        wordEs: 'plato / fuente para horno',
        imageUrl:
          'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=600&q=80',
        imageAlt: 'Red ceramic baking and casserole dish',
      },
      {
        id: 'img-bake',
        wordEn: 'bake',
        wordEs: 'hornear',
        imageUrl:
          'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
        imageAlt: 'Baker taking fresh baked croissants out of oven',
      },
      {
        id: 'img-freeze',
        wordEn: 'freeze',
        wordEs: 'congelar',
        imageUrl:
          'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=600&q=80',
        imageAlt: 'Freezer compartment with frozen food in bags',
      },
      {
        id: 'img-serve',
        wordEn: 'serve',
        wordEs: 'servir',
        imageUrl:
          'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80',
        imageAlt: 'Smiling server waitress holding plates with food',
      },
    ],
  } as DragWordToImageExercise,

  // ----------------------------------------------------
  // Actividad 3: Dictation 1 (actividad 3.png)
  // ----------------------------------------------------
  {
    id: 'kitchen-act3-dictation',
    type: 'vocabulary-dictation',
    title: 'Dictado 1',
    instructions:
      'Type the sentences that you hear in the dictation. Pay attention to punctuation.',
    instructionsEs:
      'Escribe las oraciones que escuchas en el dictado. Presta atención a la puntuación.',
    vocabularyWords: IN_THE_KITCHEN_VOCABULARY.slice(0, 5),
    items: [
      {
        id: 'kd-1',
        sentenceEn: 'I baked a chocolate cake in my new oven.',
        sentenceEs: 'Horneé un pastel de chocolate en mi horno nuevo.',
        audioText: 'I baked a chocolate cake in my new oven.',
      },
      {
        id: 'kd-2',
        sentenceEn: 'Cook the chicken until it is brown on the outside and white inside.',
        sentenceEs: 'Cocina el pollo hasta que esté dorado por fuera y blanco por dentro.',
        audioText: 'Cook the chicken until it is brown on the outside and white inside.',
      },
      {
        id: 'kd-3',
        sentenceEn: 'She made some great meals from her new cookbook.',
        sentenceEs: 'Ella preparó excelentes comidas con su nuevo libro de cocina.',
        audioText: 'She made some great meals from her new cookbook.',
      },
      {
        id: 'kd-4',
        sentenceEn: 'Would you like a cup of coffee?',
        sentenceEs: '¿Te gustaría una taza de café?',
        audioText: 'Would you like a cup of coffee?',
      },
      {
        id: 'kd-5',
        sentenceEn: 'Please put the soup dishes on the table.',
        sentenceEs: 'Por favor, pon los platos soperos en la mesa.',
        audioText: 'Please put the soup dishes on the table.',
      },
    ],
  },

  // ----------------------------------------------------
  // Actividad 4: Dictation 2 (actividad 4.png)
  // ----------------------------------------------------
  {
    id: 'kitchen-act4-dictation',
    type: 'vocabulary-dictation',
    title: 'Dictado 2',
    instructions:
      'Type the sentences that you hear in the dictation. Pay attention to punctuation.',
    instructionsEs:
      'Escribe las oraciones que escuchas en el dictado. Presta atención a la puntuación.',
    vocabularyWords: IN_THE_KITCHEN_VOCABULARY.slice(5, 10),
    items: [
      {
        id: 'kd-6',
        sentenceEn: 'You can freeze this food and eat it next week.',
        sentenceEs: 'Puedes congelar esta comida y comerla la próxima semana.',
        audioText: 'You can freeze this food and eat it next week.',
      },
      {
        id: 'kd-7',
        sentenceEn: 'I have some fresh tomatoes from my garden.',
        sentenceEs: 'Tengo unos tomates frescos de mi jardín.',
        audioText: 'I have some fresh tomatoes from my garden.',
      },
      {
        id: 'kd-8',
        sentenceEn: "I don't always eat three meals a day.",
        sentenceEs: 'No siempre como tres comidas al día.',
        audioText: "I don't always eat three meals a day.",
      },
      {
        id: 'kd-9',
        sentenceEn: 'The dinner plates are on the table.',
        sentenceEs: 'Los platos de la cena están en la mesa.',
        audioText: 'The dinner plates are on the table.',
      },
      {
        id: 'kd-10',
        sentenceEn: 'I always serve salads with meals.',
        sentenceEs: 'Siempre sirvo ensaladas con las comidas.',
        audioText: 'I always serve salads with meals.',
      },
    ],
  },

  // ----------------------------------------------------
  // Actividad 5: Carl's Cooking Cloze (actividad 5.png)
  // ----------------------------------------------------
  {
    id: 'kitchen-act5-carl',
    type: 'drag-drop-cloze',
    title: "Carl's Cooking",
    titleEs: 'La Cocina de Carl',
    storyTitle: "Carl's Kitchen",
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    template:
      'My friend Carl loves to [b1]. He makes delicious [b2]. He also [b3] great cakes. I love to visit Carl. There\'s always delicious food around. I sometimes just go to his house for a [b4] of coffee and a piece of one of his great cakes. "Carl, you can write a [b5]," I say to him. "Nobody bakes like you!"',
    translationEs:
      'A mi amigo Carl le encanta cocinar. Hace comidas deliciosas. También hornea pasteles estupendos. Me encanta visitar a Carl. Siempre hay comida deliciosa a su alrededor. A veces voy a su casa por una taza de café y un trozo de uno de sus fantásticos pasteles. "Carl, puedes escribir un libro de cocina", le digo. "¡Nadie hornea como tú!"',
    blanks: [
      { id: 'b1', correctAnswer: 'cook' },
      { id: 'b2', correctAnswer: 'meals' },
      { id: 'b3', correctAnswer: 'bakes' },
      { id: 'b4', correctAnswer: 'cup' },
      { id: 'b5', correctAnswer: 'cookbook' },
    ],
    wordBank: ['meals', 'cook', 'cup', 'bakes', 'cookbook'],
    vocabularyWords: [
      IN_THE_KITCHEN_VOCABULARY[0], // bake
      IN_THE_KITCHEN_VOCABULARY[1], // cook
      IN_THE_KITCHEN_VOCABULARY[2], // cookbook
      IN_THE_KITCHEN_VOCABULARY[3], // cup
      IN_THE_KITCHEN_VOCABULARY[7], // meal
    ],
  },

  // ----------------------------------------------------
  // Actividad 6: Dialogue Completion Dropdowns (actividad 6.png)
  // ----------------------------------------------------
  {
    id: 'kitchen-act6-dialogue',
    type: 'dialogue-dropdown',
    title: "Dinner at Fred's",
    titleEs: 'Cena en Casa de Fred',
    instructions: 'Select the correct answer from the drop-down list.',
    instructionsEs: 'Selecciona la respuesta correcta de la lista desplegable.',
    lines: [
      {
        speaker: 'Fred',
        textEn: 'OK. The [b1] is ready. Please put the [b2] on the table.',
        textEs: 'Bien. La comida está lista. Por favor, pon los platos en la mesa.',
      },
      {
        speaker: 'Allen',
        textEn: 'What are you [b3]?',
        textEs: '¿Qué vas a servir?',
      },
      {
        speaker: 'Fred',
        textEn: "I've made a special chicken dish from my new [b4]. I've also [b5] some bread.",
        textEs: 'He preparado un plato especial de pollo de mi nuevo libro de cocina. También he horneado un poco de pan.',
      },
      {
        speaker: 'Allen',
        textEn: 'Sounds great!',
        textEs: '¡Suena genial!',
      },
    ],
    blanks: [
      {
        id: 'b1',
        options: ['meal', 'dish', 'cup'],
        correctAnswer: 'meal',
      },
      {
        id: 'b2',
        options: ['plates', 'cookbooks', 'meals'],
        correctAnswer: 'plates',
      },
      {
        id: 'b3',
        options: ['serving', 'baking', 'cooking'],
        correctAnswer: 'serving',
      },
      {
        id: 'b4',
        options: ['cookbook', 'plate', 'dish'],
        correctAnswer: 'cookbook',
      },
      {
        id: 'b5',
        options: ['baked', 'cooked', 'frozen'],
        correctAnswer: 'baked',
      },
    ],
    vocabularyWords: [
      IN_THE_KITCHEN_VOCABULARY[0], // bake
      IN_THE_KITCHEN_VOCABULARY[2], // cookbook
      IN_THE_KITCHEN_VOCABULARY[7], // meal
      IN_THE_KITCHEN_VOCABULARY[8], // plate
      IN_THE_KITCHEN_VOCABULARY[9], // serve
    ],
  },

  // ----------------------------------------------------
  // Actividad 7: Dinner for Guests Cloze (actividad 7.png)
  // ----------------------------------------------------
  {
    id: 'kitchen-act7-ellen',
    type: 'drag-drop-cloze',
    title: 'Dinner for Guests',
    titleEs: 'Cena para Invitados',
    storyTitle: 'Dinner for Guests',
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    template:
      'Ellen was preparing a [b1] for guests. She decided to [b2] pasta. She also made a [b3] vegetable salad and put it on the table. She was putting some nice china [b4] on the table when the telephone rang. "Oh, no!" said Ellen. "You can\'t come for dinner! Oh well, I guess I can [b5] all the food. Come next week instead!"',
    translationEs:
      'Ellen estaba preparando una comida para invitados. Decidió servir pasta. También preparó una ensalada de verduras frescas y la puso en la mesa. Estaba poniendo unos bonitos platos de porcelana en la mesa cuando sonó el teléfono. "¡Oh, no!", dijo Ellen. "¡No pueden venir a cenar! Bueno, supongo que puedo congelar toda la comida. ¡Vengan la próxima semana en su lugar!"',
    blanks: [
      { id: 'b1', correctAnswer: 'meal' },
      { id: 'b2', correctAnswer: 'serve' },
      { id: 'b3', correctAnswer: 'fresh' },
      { id: 'b4', correctAnswer: 'dishes' },
      { id: 'b5', correctAnswer: 'freeze' },
    ],
    wordBank: ['freeze', 'meal', 'fresh', 'serve', 'dishes'],
    vocabularyWords: [
      IN_THE_KITCHEN_VOCABULARY[4], // dish
      IN_THE_KITCHEN_VOCABULARY[5], // freeze
      IN_THE_KITCHEN_VOCABULARY[6], // fresh
      IN_THE_KITCHEN_VOCABULARY[7], // meal
      IN_THE_KITCHEN_VOCABULARY[9], // serve
    ],
  },

  // ----------------------------------------------------
  // Actividad 8: Final Unit Test (test 1.png - test 10.png)
  // ----------------------------------------------------
  IN_THE_KITCHEN_TEST_EXERCISE,
];
