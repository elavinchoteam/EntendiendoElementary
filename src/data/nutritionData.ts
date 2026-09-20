export interface NutritionWordItem {
  id: string;
  word: string;
  translation: string;
  partOfSpeech: string;
  partOfSpeechEs: string;
  definitionEn: string;
  definitionEs: string;
  exampleEn: string;
  exampleEs: string;
  imageUrl: string;
}

export interface MatchingPhraseItem {
  id: string;
  colA: string;
  colBTarget: string;
  phraseEn: string;
  phraseEs: string;
}

export interface DictationSentenceItem {
  id: string;
  sentenceEn: string;
  sentenceEs: string;
  speakerEn: string;
}

export interface ClozeBlankItem {
  id: string;
  correctAnswer: string;
}

export interface DialogueLineDropdown {
  speaker: string;
  textEn: string;
  textEs: string;
  blanks?: {
    id: string;
    options: string[];
    correctAnswer: string;
  }[];
}

export interface NutritionTestItem {
  id: string;
  testNumber: number;
  instructions: string;
  instructionsEs: string;
  sentenceBefore: string;
  sentenceAfter: string;
  fullSentenceEn: string;
  fullSentenceEs: string;
  options: string[];
  correctAnswer: string;
}

export const nutritionChefImg =
  'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=800&q=80';

// 10 Vocabulary Words from actividad 1.png
export const NUTRITION_VOCABULARY: NutritionWordItem[] = [
  {
    id: 'nut-w1',
    word: 'diet',
    translation: 'dieta',
    partOfSpeech: 'noun',
    partOfSpeechEs: 'sustantivo',
    definitionEn: 'the food and drink usually eaten or a special course of food to lose weight',
    definitionEs: 'la comida y bebida habitual, o un régimen especial para perder peso',
    exampleEn: "She's on a diet because she wants to lose 10 pounds.",
    exampleEs: 'Ella está a dieta porque quiere perder 10 libras.',
    imageUrl:
      'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'nut-w2',
    word: 'eat light',
    translation: 'comer ligero',
    partOfSpeech: 'phrase',
    partOfSpeechEs: 'frase verbal',
    definitionEn: 'to eat small, healthy portions that are low in calories and easy to digest',
    definitionEs: 'comer porciones pequeñas y saludables, bajas en calorías y fáciles de digerir',
    exampleEn: 'Eat light and be healthy.',
    exampleEs: 'Come ligero y mantente saludable.',
    imageUrl:
      'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'nut-w3',
    word: 'energy',
    translation: 'energía',
    partOfSpeech: 'noun',
    partOfSpeechEs: 'sustantivo',
    definitionEn: 'the physical and mental power needed to do physical or mental activity',
    definitionEs: 'la fuerza física y mental requerida para realizar actividades',
    exampleEn: 'I have a lot of energy in the morning, but I am tired in the evening.',
    exampleEs: 'Tengo mucha energía por la mañana, pero estoy cansado por la noche.',
    imageUrl:
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'nut-w4',
    word: 'fat-free',
    translation: 'sin grasa / desnatado',
    partOfSpeech: 'adjective',
    partOfSpeechEs: 'adjetivo',
    definitionEn: 'containing no fat or minimal fat',
    definitionEs: 'que no contiene grasa o tiene una cantidad mínima',
    exampleEn: 'Would you like some fat-free yogurt?',
    exampleEs: '¿Te gustaría un poco de yogur sin grasa?',
    imageUrl:
      'https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'nut-w5',
    word: 'healthy',
    translation: 'saludable / sano',
    partOfSpeech: 'adjective',
    partOfSpeechEs: 'adjetivo',
    definitionEn: 'in good health or good for your health and body',
    definitionEs: 'con buena salud o beneficioso para el cuerpo y la salud',
    exampleEn: 'Fruits and vegetables are healthy foods.',
    exampleEs: 'Las frutas y verduras son alimentos saludables.',
    imageUrl:
      'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'nut-w6',
    word: 'lose weight',
    translation: 'perder peso / adelgazar',
    partOfSpeech: 'phrase',
    partOfSpeechEs: 'frase verbal',
    definitionEn: 'to become thinner and reduce your body mass',
    definitionEs: 'volverse más delgado y reducir el peso corporal',
    exampleEn: 'She lost weight and now she looks great!',
    exampleEs: '¡Ella perdió peso y ahora se ve genial!',
    imageUrl:
      'https://images.unsplash.com/photo-1576402187878-974f70c890a5?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'nut-w7',
    word: 'low-fat',
    translation: 'bajo en grasa',
    partOfSpeech: 'adjective',
    partOfSpeechEs: 'adjetivo',
    definitionEn: 'containing only a small amount of fat',
    definitionEs: 'que contiene solo una cantidad reducida de grasa',
    exampleEn: 'This cheese is low-fat.',
    exampleEs: 'Este queso es bajo en grasa.',
    imageUrl:
      'https://images.unsplash.com/photo-1528750997573-59b89d56f4f7?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'nut-w8',
    word: 'salad',
    translation: 'ensalada',
    partOfSpeech: 'noun',
    partOfSpeechEs: 'sustantivo',
    definitionEn: 'a mixture of raw or cooked vegetables often served cold with a dressing',
    definitionEs: 'mezcla de verduras crudas o cocinadas servida fría con aderezo',
    exampleEn: 'Would you like a salad with your steak?',
    exampleEs: '¿Te gustaría una ensalada con tu filete?',
    imageUrl:
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'nut-w9',
    word: 'salt-free',
    translation: 'sin sal',
    partOfSpeech: 'adjective',
    partOfSpeechEs: 'adjetivo',
    definitionEn: 'prepared or manufactured without adding salt',
    definitionEs: 'preparado o elaborado sin añadir sal',
    exampleEn: 'This food is salt-free.',
    exampleEs: 'Esta comida es sin sal.',
    imageUrl:
      'https://images.unsplash.com/photo-1518843875459-f738682238a6?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'nut-w10',
    word: 'sweetener',
    translation: 'edulcorante',
    partOfSpeech: 'noun',
    partOfSpeechEs: 'sustantivo',
    definitionEn: 'a substance used to sweeten food or drink, especially an artificial one with few calories',
    definitionEs: 'sustancia utilizada para endulzar alimentos o bebidas, especialmente un sustituto artificial bajo en calorías',
    exampleEn: 'He takes sweetener in his coffee.',
    exampleEs: 'Él toma edulcorante en su café.',
    imageUrl:
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
  },
];

// Actividad 2: Drag matching Column A to Column B (actividad 2.png)
export const NUTRITION_MATCHING_ITEMS: MatchingPhraseItem[] = [
  {
    id: 'm-1',
    colA: 'lose',
    colBTarget: 'weight',
    phraseEn: 'lose weight',
    phraseEs: 'perder peso',
  },
  {
    id: 'm-2',
    colA: 'low-fat',
    colBTarget: 'diet',
    phraseEn: 'low-fat diet',
    phraseEs: 'dieta baja en grasa',
  },
  {
    id: 'm-3',
    colA: 'eat',
    colBTarget: 'light',
    phraseEn: 'eat light',
    phraseEs: 'comer ligero',
  },
  {
    id: 'm-4',
    colA: 'have lots of',
    colBTarget: 'energy',
    phraseEn: 'have lots of energy',
    phraseEs: 'tener mucha energía',
  },
  {
    id: 'm-5',
    colA: 'vegetable',
    colBTarget: 'salad',
    phraseEn: 'vegetable salad',
    phraseEs: 'ensalada de verduras',
  },
];

export const NUTRITION_MATCHING_BANK: string[] = ['weight', 'diet', 'energy', 'salad', 'light'];

// Actividad 3: Dictation 1 (actividad 3.png)
export const NUTRITION_DICTATION_1: DictationSentenceItem[] = [
  {
    id: 'd1-1',
    sentenceEn: "She's on a diet because she wants to lose 10 pounds.",
    sentenceEs: 'Ella está a dieta porque quiere perder 10 libras.',
    speakerEn: "She's on a diet because she wants to lose 10 pounds.",
  },
  {
    id: 'd1-2',
    sentenceEn: 'Eat light and be healthy.',
    sentenceEs: 'Come ligero y mantente saludable.',
    speakerEn: 'Eat light and be healthy.',
  },
  {
    id: 'd1-3',
    sentenceEn: 'I have a lot of energy in the morning, but I am tired in the evening.',
    sentenceEs: 'Tengo mucha energía por la mañana, pero estoy cansado por la noche.',
    speakerEn: 'I have a lot of energy in the morning, but I am tired in the evening.',
  },
  {
    id: 'd1-4',
    sentenceEn: 'Would you like some fat-free yogurt?',
    sentenceEs: '¿Te gustaría un poco de yogur sin grasa?',
    speakerEn: 'Would you like some fat-free yogurt?',
  },
  {
    id: 'd1-5',
    sentenceEn: 'Fruits and vegetables are healthy foods.',
    sentenceEs: 'Las frutas y verduras son alimentos saludables.',
    speakerEn: 'Fruits and vegetables are healthy foods.',
  },
];

// Actividad 4: Dictation 2 (actividad 4.png)
export const NUTRITION_DICTATION_2: DictationSentenceItem[] = [
  {
    id: 'd2-1',
    sentenceEn: 'She lost weight and now she looks great!',
    sentenceEs: '¡Ella perdió peso y ahora se ve genial!',
    speakerEn: 'She lost weight and now she looks great!',
  },
  {
    id: 'd2-2',
    sentenceEn: 'This cheese is low-fat.',
    sentenceEs: 'Este queso es bajo en grasa.',
    speakerEn: 'This cheese is low-fat.',
  },
  {
    id: 'd2-3',
    sentenceEn: 'Would you like a salad with your steak?',
    sentenceEs: '¿Te gustaría una ensalada con tu filete?',
    speakerEn: 'Would you like a salad with your steak?',
  },
  {
    id: 'd2-4',
    sentenceEn: 'This food is salt-free.',
    sentenceEs: 'Esta comida es sin sal.',
    speakerEn: 'This food is salt-free.',
  },
  {
    id: 'd2-5',
    sentenceEn: 'He takes sweetener in his coffee.',
    sentenceEs: 'Él toma edulcorante en su café.',
    speakerEn: 'He takes sweetener in his coffee.',
  },
];

// Actividad 5: Cloze 1 - My Sister's Habits (actividad 5.png)
export const NUTRITION_CLOZE_1 = {
  id: 'cloze-1',
  titleEn: "My Sister's Diet",
  titleEs: 'La Dieta de Mi Hermana',
  instructionsEn: 'Drag the correct answer/s into place.',
  instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
  templateParts: [
    'My sister is always trying to ',
    ". She's always starting new ",
    '. In restaurants, she always orders a ',
    '. She never puts sugar in her coffee - only ',
    '. She always checks to make sure that the food she is eating is ',
    '.',
  ],
  correctAnswers: ['lose weight', 'diets', 'salad', 'sweetener', 'fat-free'],
  wordBank: ['salad', 'diets', 'sweetener', 'lose weight', 'fat-free'],
  translationEs:
    'Mi hermana siempre está tratando de perder peso. Siempre está comenzando nuevas dietas. En los restaurantes, siempre pide una ensalada. Nunca le pone azúcar a su café, solo edulcorante. Siempre se asegura de que la comida que come sea sin grasa.',
};

// Actividad 6: Dialogue Dropdowns - Clara & Don (actividad 6.png)
export const NUTRITION_DIALOGUE_LINES: DialogueLineDropdown[] = [
  {
    speaker: 'Clara',
    textEn: "I'm on a new diet! It's called the ' [b1] Diet!'",
    textEs: "¡Estoy en una nueva dieta! ¡Se llama la dieta 'Come Ligero'!",
    blanks: [
      {
        id: 'b1',
        options: ['Eat Light', 'Lose Weight', 'Energy'],
        correctAnswer: 'Eat Light',
      },
    ],
  },
  {
    speaker: 'Don',
    textEn: "But you look great. You don't need to [b2].",
    textEs: 'Pero te ves genial. No necesitas perder peso.',
    blanks: [
      {
        id: 'b2',
        options: ['lose weight', 'diet', 'eat light'],
        correctAnswer: 'lose weight',
      },
    ],
  },
  {
    speaker: 'Clara',
    textEn: 'I want to be [b3] and have more [b4].',
    textEs: 'Quiero estar saludable y tener más energía.',
    blanks: [
      {
        id: 'b3',
        options: ['healthy', 'fat-free', 'salt-free'],
        correctAnswer: 'healthy',
      },
      {
        id: 'b4',
        options: ['energy', 'salad', 'diet'],
        correctAnswer: 'energy',
      },
    ],
  },
  {
    speaker: 'Don',
    textEn: "So what's so special about this [b5]?",
    textEs: '¿Y qué tiene de especial esta dieta?',
    blanks: [
      {
        id: 'b5',
        options: ['diet', 'sweetener', 'salad'],
        correctAnswer: 'diet',
      },
    ],
  },
  {
    speaker: 'Clara',
    textEn: 'You eat lots of [b6] foods like [b7] and fruit. And you do lots of exercise.',
    textEs: 'Comes muchas comidas bajas en grasa como ensaladas y frutas. Y haces mucho ejercicio.',
    blanks: [
      {
        id: 'b6',
        options: ['low-fat', 'sweetener', 'diet'],
        correctAnswer: 'low-fat',
      },
      {
        id: 'b7',
        options: ['salads', 'energy', 'salt'],
        correctAnswer: 'salads',
      },
    ],
  },
  {
    speaker: 'Don',
    textEn: 'Well, good luck!',
    textEs: '¡Bueno, buena suerte!',
  },
];

// Actividad 7: Cloze 2 - Healthy Eating in Summer (actividad 7.png)
export const NUTRITION_CLOZE_2 = {
  id: 'cloze-2',
  titleEn: 'Summer Nutrition',
  titleEs: 'Nutrición en Verano',
  instructionsEn: 'Drag the correct answer/s into place.',
  instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
  templateParts: [
    "It's very important to have a ",
    ' diet. In the summer, the weather is hot, so it\'s easy to ',
    ', especially in the evening. But make sure you have a good breakfast. After a night with no food, your body needs ',
    '. Too much fat and salt in your ',
    ' are also bad for you so you should try to eat low-fat and ',
    ' foods.',
  ],
  correctAnswers: ['healthy', 'eat light', 'energy', 'diet', 'salt-free'],
  wordBank: ['diet', 'healthy', 'salt-free', 'energy', 'eat light'],
  translationEs:
    'Es muy importante tener una dieta saludable. En el verano, el clima es caluroso, por lo que es fácil comer ligero, especialmente por la noche. Pero asegúrate de desayunar bien. Después de una noche sin comida, tu cuerpo necesita energía. Demasiada grasa y sal en tu dieta también son malas para ti, así que deberías intentar comer alimentos bajos en grasa y sin sal.',
};

// Actividad 8: 10 Tests (test 1.png to test 10.png)
export const NUTRITION_TESTS: NutritionTestItem[] = [
  {
    id: 'test-1',
    testNumber: 1,
    instructions: 'Select the correct answer from the drop-down list.',
    instructionsEs: 'Selecciona la respuesta correcta de la lista desplegable.',
    sentenceBefore: "He's on a new ",
    sentenceAfter: ' and only eating salad.',
    fullSentenceEn: "He's on a new diet and only eating salad.",
    fullSentenceEs: 'Él está en una nueva dieta y solo come ensalada.',
    options: ['diet', 'eat light', 'sweetener'],
    correctAnswer: 'diet',
  },
  {
    id: 'test-2',
    testNumber: 2,
    instructions: 'Select the correct answer from the drop-down list.',
    instructionsEs: 'Selecciona la respuesta correcta de la lista desplegable.',
    sentenceBefore: 'I ',
    sentenceAfter: ' in the evening. My main meal is at lunchtime.',
    fullSentenceEn: 'I eat light in the evening. My main meal is at lunchtime.',
    fullSentenceEs: 'Como ligero por la noche. Mi comida principal es al mediodía.',
    options: ['lose weight', 'diet', 'eat light'],
    correctAnswer: 'eat light',
  },
  {
    id: 'test-3',
    testNumber: 3,
    instructions: 'Select the correct answer from the drop-down list.',
    instructionsEs: 'Selecciona la respuesta correcta de la lista desplegable.',
    sentenceBefore: 'My brother has a lot of ',
    sentenceAfter: '. He plays sport every day.',
    fullSentenceEn: 'My brother has a lot of energy. He plays sport every day.',
    fullSentenceEs: 'Mi hermano tiene mucha energía. Hace deporte todos los días.',
    options: ['energy', 'salads', 'healthy'],
    correctAnswer: 'energy',
  },
  {
    id: 'test-4',
    testNumber: 4,
    instructions: 'Select the correct answer from the drop-down list.',
    instructionsEs: 'Selecciona la respuesta correcta de la lista desplegable.',
    sentenceBefore: 'This ',
    sentenceAfter: ' milk tastes like water!',
    fullSentenceEn: 'This fat-free milk tastes like water!',
    fullSentenceEs: '¡Esta leche desnatada / sin grasa sabe a agua!',
    options: ['fat-free', 'salad', 'healthy'],
    correctAnswer: 'fat-free',
  },
  {
    id: 'test-5',
    testNumber: 5,
    instructions: 'Select the correct answer from the drop-down list.',
    instructionsEs: 'Selecciona la respuesta correcta de la lista desplegable.',
    sentenceBefore: "It's not ",
    sentenceAfter: ' to eat a lot of salt and fat.',
    fullSentenceEn: "It's not healthy to eat a lot of salt and fat.",
    fullSentenceEs: 'No es saludable comer mucha sal y grasa.',
    options: ['healthy', 'energy', 'sweetener'],
    correctAnswer: 'healthy',
  },
  {
    id: 'test-6',
    testNumber: 6,
    instructions: 'Select the correct answer from the drop-down list.',
    instructionsEs: 'Selecciona la respuesta correcta de la lista desplegable.',
    sentenceBefore: "I'm ",
    sentenceAfter: " because I'm sick and I can't eat anything.",
    fullSentenceEn: "I'm losing weight because I'm sick and I can't eat anything.",
    fullSentenceEs: 'Estoy perdiendo peso porque estoy enfermo y no puedo comer nada.',
    options: ['losing weight', 'eating light', 'diet'],
    correctAnswer: 'losing weight',
  },
  {
    id: 'test-7',
    testNumber: 7,
    instructions: 'Select the correct answer from the drop-down list.',
    instructionsEs: 'Selecciona la respuesta correcta de la lista desplegable.',
    sentenceBefore: 'Is there any ',
    sentenceAfter: ' ice cream?',
    fullSentenceEn: 'Is there any low-fat ice cream?',
    fullSentenceEs: '¿Hay algún helado bajo en grasa?',
    options: ['low-fat', 'salt-free', 'sweetener'],
    correctAnswer: 'low-fat',
  },
  {
    id: 'test-8',
    testNumber: 8,
    instructions: 'Select the correct answer from the drop-down list.',
    instructionsEs: 'Selecciona la respuesta correcta de la lista desplegable.',
    sentenceBefore: 'I eat a lot of ',
    sentenceAfter: ' in the summer.',
    fullSentenceEn: 'I eat a lot of salads in the summer.',
    fullSentenceEs: 'Como muchas ensaladas en el verano.',
    options: ['fat-free', 'sweetener', 'salads'],
    correctAnswer: 'salads',
  },
  {
    id: 'test-9',
    testNumber: 9,
    instructions: 'Select the correct answer from the drop-down list.',
    instructionsEs: 'Selecciona la respuesta correcta de la lista desplegable.',
    sentenceBefore: 'My doctor says I must make sure my diet is ',
    sentenceAfter: '.',
    fullSentenceEn: 'My doctor says I must make sure my diet is salt-free.',
    fullSentenceEs: 'Mi médico dice que debo asegurarme de que mi dieta sea sin sal.',
    options: ['salt-free', 'eat light', 'energy'],
    correctAnswer: 'salt-free',
  },
  {
    id: 'test-10',
    testNumber: 10,
    instructions: 'Select the correct answer from the drop-down list.',
    instructionsEs: 'Selecciona la respuesta correcta de la lista desplegable.',
    sentenceBefore: 'This cake has ',
    sentenceAfter: ' in it, but no sugar.',
    fullSentenceEn: 'This cake has sweetener in it, but no sugar.',
    fullSentenceEs: 'Este pastel tiene edulcorante, pero nada de azúcar.',
    options: ['salad', 'sweetener', 'fat-free'],
    correctAnswer: 'sweetener',
  },
];
