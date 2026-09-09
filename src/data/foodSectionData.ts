import {
  LessonText,
  Exercise,
  DragWordToImageExercise,
  MatchingExercise,
  DropdownCompletionExercise,
  TrueFalseSelectionExercise,
  AudioClipsDropdownExercise,
  FoodExploreExercise,
  UnitTestExercise,
} from '../types';

import sheilaKitchenImg from '../assets/images/sheila_kitchen_salad_1788913662919.jpg';
import freshLettuceImg from '../assets/images/fresh_lettuce_1788913674791.jpg';
import slicedCucumberImg from '../assets/images/sliced_cucumber_1788913686151.jpg';
import plateTableclothImg from '../assets/images/plate_tablecloth_1788913697828.jpg';
import fruitSaladCupImg from '../assets/images/fruit_salad_cup_1788913710373.jpg';
import cookedMeatSteaksImg from '../assets/images/cooked_meat_steaks_1788913722024.jpg';

export {
  sheilaKitchenImg,
  freshLettuceImg,
  slicedCucumberImg,
  plateTableclothImg,
  fruitSaladCupImg,
  cookedMeatSteaksImg,
};

export const SHEILAS_KITCHEN_FULL_TRANSCRIPT = `Announcer: Welcome to "Sheila's Kitchen." Today's program is about salads. Good morning, Sheila.
Sheila: Hello, Mike. And good morning to all our listeners. When I was young, we ate green salads - lettuce or cucumbers - with some salt and a little lemon juice. My mother served the salad with meat, chicken, and fish. But today, salads can be your meal. Salads are healthy summer foods. And for dessert, some people like a fresh fruit salad. And now, a few words about Durelle plates and dishes. You can cook in them, bake in them, and freeze food in them, too. Buy Durelle products and enjoy them in the kitchen and on your table. They are strong enough for cooking. They are pretty enough for guests. Now let's return to our salads.`;

export const SHEILAS_KITCHEN_SENTENCES = [
  {
    speaker: 'Announcer',
    en: 'Welcome to "Sheila\'s Kitchen."',
    es: 'Bienvenidos a "La Cocina de Sheila".',
  },
  {
    speaker: 'Announcer',
    en: "Today's program is about salads.",
    es: 'El programa de hoy trata sobre ensaladas.',
  },
  {
    speaker: 'Announcer',
    en: 'Good morning, Sheila.',
    es: 'Buenos días, Sheila.',
  },
  {
    speaker: 'Sheila',
    en: 'Hello, Mike. And good morning to all our listeners.',
    es: 'Hola, Mike. Y buenos días a todos nuestros oyentes.',
  },
  {
    speaker: 'Sheila',
    en: 'When I was young, we ate green salads - lettuce or cucumbers - with some salt and a little lemon juice.',
    es: 'Cuando era joven, comíamos ensaladas verdes —lechuga o pepinos— con algo de sal y un poco de jugo de limón.',
  },
  {
    speaker: 'Sheila',
    en: 'My mother served the salad with meat, chicken, and fish.',
    es: 'Mi madre servía la ensalada con carne, pollo y pescado.',
  },
  {
    speaker: 'Sheila',
    en: 'But today, salads can be your meal.',
    es: 'Pero hoy en día, las ensaladas pueden ser tu comida completa.',
  },
  {
    speaker: 'Sheila',
    en: 'Salads are healthy summer foods.',
    es: 'Las ensaladas son alimentos saludables de verano.',
  },
  {
    speaker: 'Sheila',
    en: 'And for dessert, some people like a fresh fruit salad.',
    es: 'Y de postre, a algunas personas les gusta una ensalada de frutas frescas.',
  },
  {
    speaker: 'Sheila',
    en: 'And now, a few words about Durelle plates and dishes.',
    es: 'Y ahora, unas palabras sobre los platos y vajillas Durelle.',
  },
  {
    speaker: 'Sheila',
    en: 'You can cook in them, bake in them, and freeze food in them, too.',
    es: 'Puedes cocinar en ellos, hornear en ellos y congelar comida en ellos también.',
  },
  {
    speaker: 'Sheila',
    en: 'Buy Durelle products and enjoy them in the kitchen and on your table.',
    es: 'Compra productos Durelle y disfrútalos en la cocina y en tu mesa.',
  },
  {
    speaker: 'Sheila',
    en: 'They are strong enough for cooking.',
    es: 'Son lo suficientemente resistentes para cocinar.',
  },
  {
    speaker: 'Sheila',
    en: 'They are pretty enough for guests.',
    es: 'Son lo suficientemente bonitos para los invitados.',
  },
  {
    speaker: 'Sheila',
    en: "Now let's return to our salads.",
    es: 'Ahora regresemos a nuestras ensaladas.',
  },
];

export const FOOD_SECTION_LESSON_TEXT: LessonText = {
  title: 'Lesson 1: Food',
  stepTitle: "Step 3: Explore · Sheila's Kitchen",
  audioText: SHEILAS_KITCHEN_FULL_TRANSCRIPT,
  textEn: SHEILAS_KITCHEN_FULL_TRANSCRIPT,
  textEs:
    'Presentador: Bienvenidos a "La Cocina de Sheila". El programa de hoy trata sobre ensaladas. Buenos días, Sheila.\nSheila: Hola, Mike. Y buenos días a todos nuestros oyentes. Cuando era joven, comíamos ensaladas verdes —lechuga o pepinos— con algo de sal y un poco de jugo de limón. Mi madre servía la ensalada con carne, pollo y pescado. Pero hoy en día, las ensaladas pueden ser tu comida completa. Las ensaladas son alimentos saludables de verano. Y de postre, a algunas personas les gusta una ensalada de frutas frescas. Y ahora, unas palabras sobre los platos y vajillas Durelle. Puedes cocinar en ellos, hornear en ellos y congelar comida en ellos también. Compra productos Durelle y disfrútalos en la cocina y en tu mesa. Son lo suficientemente resistentes para cocinar. Son lo suficientemente bonitos para los invitados. Ahora regresemos a nuestras ensaladas.',
  caller: 'Sheila & Mike',
  company: "Sheila's Kitchen",
  durationSeconds: 65,
  imageSrc: sheilaKitchenImg,
  speakerGender: 'female',
  sentences: SHEILAS_KITCHEN_SENTENCES,
  practiceInstructions:
    'Escucha con atención el programa de radio "Sheila\'s Kitchen" sobre ensaladas y vajillas Durelle.',
};

export const FOOD_SECTION_LESSON = FOOD_SECTION_LESSON_TEXT;

export const FOOD_SECTION_EXERCISES: Exercise[] = [
  // ========================================================
  // ACTIVIDAD 1: Explore / Radio Program & Interactive Transcript
  // ========================================================
  {
    id: 'food-act-1-explore',
    type: 'food-explore',
    instructions: 'Listen to the radio program "Sheila\'s Kitchen." Click on any card to read its translation.',
    instructionsEs: 'Escucha el programa de radio "La Cocina de Sheila". Haz clic en cualquier tarjeta para leer su traducción.',
    audioText: SHEILAS_KITCHEN_FULL_TRANSCRIPT,
    sentences: SHEILAS_KITCHEN_SENTENCES,
    imageSrc: sheilaKitchenImg,
  } as FoodExploreExercise,

  // ========================================================
  // ACTIVIDAD 2 (antes Act 1): Drag word/s to correct image
  // ========================================================
  {
    id: 'food-act-2-drag-image',
    type: 'drag-word-to-image',
    instructions: 'Drag the word/s to the correct image.',
    instructionsEs: 'Arrastra la(s) palabra(s) a la imagen correcta.',
    wordBank: ['a cucumber', 'meat', 'dessert', 'a plate', 'lettuce'],
    items: [
      {
        id: 'item-lettuce',
        wordEn: 'lettuce',
        wordEs: 'lechuga',
        imageUrl: freshLettuceImg,
        imageAlt: 'Fresh green head of lettuce',
      },
      {
        id: 'item-cucumber',
        wordEn: 'a cucumber',
        wordEs: 'un pepino',
        imageUrl: slicedCucumberImg,
        imageAlt: 'Crisp green cucumber and slices',
      },
      {
        id: 'item-plate',
        wordEn: 'a plate',
        wordEs: 'un plato',
        imageUrl: plateTableclothImg,
        imageAlt: 'White round plate on gingham tablecloth',
      },
      {
        id: 'item-dessert',
        wordEn: 'dessert',
        wordEs: 'postre',
        imageUrl: fruitSaladCupImg,
        imageAlt: 'Fresh fruit salad dessert cup',
      },
      {
        id: 'item-meat',
        wordEn: 'meat',
        wordEs: 'carne',
        imageUrl: cookedMeatSteaksImg,
        imageAlt: 'Juicy cooked grilled meat steaks',
      },
    ],
  } as DragWordToImageExercise,

  // ========================================================
  // ACTIVIDAD 3 (antes Act 6): Audio Clips Dropdown Completion
  // ========================================================
  {
    id: 'food-act-3-clips',
    type: 'audio-clips-dropdown',
    instructions: "Listen to these clips from \"Sheila's Kitchen,\" and complete the sentences.",
    instructionsEs: 'Escucha estos fragmentos de "La Cocina de Sheila" y completa las oraciones.',
    imageUrl: sheilaKitchenImg,
    transcript: SHEILAS_KITCHEN_FULL_TRANSCRIPT,
    sentences: SHEILAS_KITCHEN_SENTENCES,
    clips: [
      {
        id: 'clip-1',
        audioPrompt:
          'And now, a few words about Durelle plates and dishes. You can cook in them, bake in them, and freeze food in them, too.',
        fullSentenceEn:
          'And now, a few words about Durelle plates and dishes. You can cook in them, bake in them, and freeze food in them, too.',
        fullSentenceEs:
          'Y ahora, unas palabras sobre los platos y vajillas Durelle. Puedes cocinar en ellos, hornear en ellos y congelar comida en ellos también.',
        template:
          'And now, a few words about Durelle plates and {0} .\nYou can cook in them, {1} in them, and freeze {2} in them, too.',
        blanks: [
          {
            id: 'c1-blank-1',
            options: ['dishes', 'glasses', 'cups'],
            correctAnswer: 'dishes',
          },
          {
            id: 'c1-blank-2',
            options: ['bake', 'eat', 'fry'],
            correctAnswer: 'bake',
          },
          {
            id: 'c1-blank-3',
            options: ['food', 'water', 'meat'],
            correctAnswer: 'food',
          },
        ],
      },
      {
        id: 'clip-2',
        audioPrompt:
          'Buy Durelle products and enjoy them in the kitchen and on your table. They are strong enough for cooking. They are pretty enough for guests.',
        fullSentenceEn:
          'Buy Durelle products and enjoy them in the kitchen and on your table. They are strong enough for cooking. They are pretty enough for guests.',
        fullSentenceEs:
          'Compra productos Durelle y disfrútalos en la cocina y en tu mesa. Son lo suficientemente resistentes para cocinar. Son lo suficientemente bonitos para los invitados.',
        template:
          'Buy Durelle products and enjoy them in the {0} and on your table.\nThey are strong enough for {1} .\nThey are pretty enough for {2} .',
        blanks: [
          {
            id: 'c2-blank-1',
            options: ['kitchen', 'store', 'restaurant'],
            correctAnswer: 'kitchen',
          },
          {
            id: 'c2-blank-2',
            options: ['cooking', 'eating', 'baking'],
            correctAnswer: 'cooking',
          },
          {
            id: 'c2-blank-3',
            options: ['guests', 'children', 'cooks'],
            correctAnswer: 'guests',
          },
        ],
      },
    ],
  } as AudioClipsDropdownExercise,

  // ========================================================
  // ACTIVIDAD 4 (antes Act 5): True / False Statements on Salads
  // ========================================================
  {
    id: 'food-act-4-true-false',
    type: 'true-false-selection',
    instructions: 'What does Sheila say about salads? Mark the true answers.',
    instructionsEs: '¿Qué dice Sheila sobre las ensaladas? Marca las respuestas verdaderas.',
    imageUrl: sheilaKitchenImg,
    audioPrompt: SHEILAS_KITCHEN_FULL_TRANSCRIPT,
    transcript: SHEILAS_KITCHEN_FULL_TRANSCRIPT,
    sentences: SHEILAS_KITCHEN_SENTENCES,
    statements: [
      {
        id: 'tf-1',
        text: 'Salads are cheap.',
        textEs: 'Las ensaladas son baratas.',
        isTrue: false,
      },
      {
        id: 'tf-2',
        text: 'Salads are only eaten in the summer.',
        textEs: 'Las ensaladas solo se comen en verano.',
        isTrue: false,
      },
      {
        id: 'tf-3',
        text: 'Salads today are different from how they were in the past.',
        textEs: 'Las ensaladas de hoy son diferentes de cómo eran en el pasado.',
        isTrue: true,
      },
      {
        id: 'tf-4',
        text: 'Salads are healthy.',
        textEs: 'Las ensaladas son saludables.',
        isTrue: true,
      },
      {
        id: 'tf-5',
        text: 'Salads are for young people.',
        textEs: 'Las ensaladas son para gente joven.',
        isTrue: false,
      },
      {
        id: 'tf-6',
        text: 'Salads used to be eaten with other foods.',
        textEs: 'Las ensaladas solían comerse con otros alimentos.',
        isTrue: true,
      },
    ],
  } as TrueFalseSelectionExercise,

  // ========================================================
  // ACTIVIDAD 5 (antes Act 4): Dropdown Sentence Completion
  // ========================================================
  {
    id: 'food-act-5-dropdown',
    type: 'dropdown-completion',
    instructions: 'Select the correct answer from the drop-down list.',
    instructionsEs: 'Selecciona la respuesta correcta de la lista desplegable.',
    imageUrl: sheilaKitchenImg,
    audioPrompt: SHEILAS_KITCHEN_FULL_TRANSCRIPT,
    transcript: SHEILAS_KITCHEN_FULL_TRANSCRIPT,
    sentences: SHEILAS_KITCHEN_SENTENCES,
    template:
      '"Sheila\'s Kitchen" is a {0} .\nA dessert is something you eat {1} .\nListeners {2} the program.\nPeople who come to your house for lunch or dinner are called {3} .\nDurelle plates and dishes can be used in {4} ways.',
    blanks: [
      {
        id: 'blank-1',
        options: ['radio program', 'television program', 'restaurant', 'store'],
        correctAnswer: 'radio program',
      },
      {
        id: 'blank-2',
        options: ['at the end of a meal', 'at the beginning of a meal', 'for breakfast'],
        correctAnswer: 'at the end of a meal',
      },
      {
        id: 'blank-3',
        options: ['hear', 'watch', 'cook', 'read'],
        correctAnswer: 'hear',
      },
      {
        id: 'blank-4',
        options: ['guests', 'cooks', 'listeners', 'sellers'],
        correctAnswer: 'guests',
      },
      {
        id: 'blank-5',
        options: ['many', 'two', 'one', 'no'],
        correctAnswer: 'many',
      },
    ],
  } as DropdownCompletionExercise,

  // ========================================================
  // ACTIVIDAD 6 (antes Act 2): Opposites matching table
  // ========================================================
  {
    id: 'food-act-6-opposites',
    type: 'matching-table',
    instructions: 'Listen to the program "Food." Write the opposites for the words from the program.',
    instructionsEs: 'Escucha el programa "Comida". Escribe los opuestos de las palabras del programa.',
    audioPrompt: SHEILAS_KITCHEN_FULL_TRANSCRIPT,
    columnAHeader: 'Words',
    columnAHeaderEs: 'Palabras',
    columnBHeader: 'Opposites',
    columnBHeaderEs: 'Opuestos',
    optionsPool: ['sell', 'a lot', 'old', 'winter', 'ugly', 'weak'],
    optionsPoolEs: {
      sell: 'vender',
      'a lot': 'mucho',
      old: 'viejo',
      winter: 'invierno',
      ugly: 'feo',
      weak: 'débil',
    },
    pairs: [
      {
        id: 'pair-young',
        field: 'young',
        fieldEs: 'joven',
        correctValue: 'old',
        correctValueEs: 'viejo / anciano',
      },
      {
        id: 'pair-a-little',
        field: 'a little',
        fieldEs: 'un poco',
        correctValue: 'a lot',
        correctValueEs: 'mucho',
      },
      {
        id: 'pair-summer',
        field: 'summer',
        fieldEs: 'verano',
        correctValue: 'winter',
        correctValueEs: 'invierno',
      },
      {
        id: 'pair-buy',
        field: 'buy',
        fieldEs: 'comprar',
        correctValue: 'sell',
        correctValueEs: 'vender',
      },
      {
        id: 'pair-strong',
        field: 'strong',
        fieldEs: 'fuerte / resistente',
        correctValue: 'weak',
        correctValueEs: 'débil',
      },
      {
        id: 'pair-pretty',
        field: 'pretty',
        fieldEs: 'bonito',
        correctValue: 'ugly',
        correctValueEs: 'feo',
      },
    ],
  } as MatchingExercise,

  // ========================================================
  // ACTIVIDAD 7: Mastery Test (5 tests en orden exacto solicitado)
  // ========================================================
  {
    id: 'food-act-7-test',
    type: 'unit-test',
    title: 'Food: Test de Evaluación',
    titleEs: 'Food: Test de Evaluación',
    subtitle: '5 Tests: Complete & Select the Best Answers',
    subtitleEs: '5 Tests: Completa y Elige las Mejores Respuestas',
    description: 'Demuestra tu dominio sobre el programa de radio "Sheila\'s Kitchen" y los productos Durelle.',
    descriptionEs: 'Demuestra tu dominio sobre el programa de radio "Sheila\'s Kitchen" y los productos Durelle.',
    totalQuestions: 5,
    audioPrompt: SHEILAS_KITCHEN_FULL_TRANSCRIPT,
    speakerGender: 'female',
    imageUrl: sheilaKitchenImg,
    referenceText: SHEILAS_KITCHEN_FULL_TRANSCRIPT,
    referenceTextEs:
      'Presentador: Bienvenidos a "La Cocina de Sheila". El programa de hoy trata sobre ensaladas. Buenos días, Sheila.\nSheila: Hola, Mike. Y buenos días a todos nuestros oyentes. Cuando era joven, comíamos ensaladas verdes —lechuga o pepinos— con algo de sal y un poco de jugo de limón. Mi madre servía la ensalada con carne, pollo y pescado. Pero hoy en día, las ensaladas pueden ser tu comida completa. Las ensaladas son alimentos saludables de verano. Y de postre, a algunas personas les gusta una ensalada de frutas frescas. Y ahora, unas palabras sobre los platos y vajillas Durelle. Puedes cocinar en ellos, hornear en ellos y congelar comida en ellos también. Compra productos Durelle y disfrútalos en la cocina y en tu mesa. Son lo suficientemente resistentes para cocinar. Son lo suficientemente bonitos para los invitados. Ahora regresemos a nuestras ensaladas.',
    questions: [
      // Test 1: Mantiene orden (arrastrar "in the morning")
      {
        id: 'food-test-1',
        number: 1,
        type: 'drag-drop',
        instructions: 'Drag the correct answer/s into place.',
        instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
        question: 'You can hear the program "Sheila\'s Kitchen," in the morning.',
        questionEs: 'Puedes escuchar el programa "La Cocina de Sheila" por la mañana.',
        sentencePrefix: 'You can hear the program "Sheila\'s Kitchen,"',
        sentencePrefixEs: 'Puedes escuchar el programa "La Cocina de Sheila",',
        sentenceSuffix: '.',
        sentenceSuffixEs: '.',
        audioPrompt: SHEILAS_KITCHEN_FULL_TRANSCRIPT,
        durationSeconds: 65,
        speakerGender: 'female',
        imageUrl: sheilaKitchenImg,
        options: [
          { id: 'opt-afternoon', text: 'in the afternoon', textEs: 'por la tarde', isCorrect: false },
          { id: 'opt-morning', text: 'in the morning', textEs: 'por la mañana', isCorrect: true },
          { id: 'opt-night', text: 'at night', textEs: 'por la noche', isCorrect: false },
          { id: 'opt-evening', text: 'in the evening', textEs: 'al atardecer', isCorrect: false },
        ],
        correctAnswerId: 'opt-morning',
        explanation: 'Mike and Sheila greet with "Good morning, Sheila" and "good morning to all our listeners," which confirms the show airs in the morning.',
        explanationEs: 'Mike y Sheila se saludan diciendo "Good morning, Sheila" y "good morning to all our listeners", lo que confirma que el programa se transmite por la mañana.',
      },

      // Test 2 (antes Test 5): Radio choice (Sheila talks about making cakes. False)
      {
        id: 'food-test-2',
        number: 2,
        type: 'radio-choice',
        instructions: 'Choose the correct answer.',
        instructionsEs: 'Elige la respuesta correcta.',
        question: 'Sheila talks about making cakes.',
        questionEs: 'Sheila habla sobre hacer pasteles.',
        audioPrompt: SHEILAS_KITCHEN_FULL_TRANSCRIPT,
        durationSeconds: 65,
        speakerGender: 'female',
        imageUrl: sheilaKitchenImg,
        options: [
          { id: 'opt-true', text: 'True', textEs: 'Verdadero', isCorrect: false },
          { id: 'opt-false', text: 'False', textEs: 'Falso', isCorrect: true },
        ],
        correctAnswerId: 'opt-false',
        explanation: 'Sheila talks about green salads, meat, chicken, fish, and fresh fruit salad, but does not talk about making cakes.',
        explanationEs: 'Sheila habla de ensaladas verdes, carne, pollo, pescado y ensalada de frutas frescas, pero nunca habla sobre hacer pasteles.',
      },

      // Test 3 (antes Test 4): Radio choice (You can freeze food in them)
      {
        id: 'food-test-3',
        number: 3,
        type: 'radio-choice',
        instructions: 'Choose the correct answer.',
        instructionsEs: 'Elige la respuesta correcta.',
        question: 'What is true about Durelle plates and dishes?',
        questionEs: '¿Qué es verdad sobre los platos y vajillas Durelle?',
        audioPrompt: SHEILAS_KITCHEN_FULL_TRANSCRIPT,
        durationSeconds: 65,
        speakerGender: 'female',
        imageUrl: sheilaKitchenImg,
        options: [
          { id: 'opt-cant-bake', text: "You can't bake in them.", textEs: 'No puedes hornear en ellos.', isCorrect: false },
          { id: 'opt-cant-cook', text: "You can't cook food in them.", textEs: 'No puedes cocinar comida en ellos.', isCorrect: false },
          { id: 'opt-freeze', text: 'You can freeze food in them.', textEs: 'Puedes congelar comida en ellos.', isCorrect: true },
          { id: 'opt-not-healthy', text: "It's not healthy to cook in them.", textEs: 'No es saludable cocinar en ellos.', isCorrect: false },
        ],
        correctAnswerId: 'opt-freeze',
        explanation: 'Sheila states: "You can cook in them, bake in them, and freeze food in them, too."',
        explanationEs: 'Sheila afirma: "Puedes cocinar en ellos, hornear en ellos y congelar comida en ellos también".',
      },

      // Test 4 (antes Test 3): Drag into place ("healthy" salads)
      {
        id: 'food-test-4',
        number: 4,
        type: 'drag-drop',
        instructions: 'Drag the correct answer/s into place.',
        instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
        question: "Today's program is about healthy salads.",
        questionEs: 'El programa de hoy es sobre ensaladas saludables.',
        sentencePrefix: "Today's program is about",
        sentencePrefixEs: 'El programa de hoy es sobre',
        sentenceSuffix: 'salads.',
        sentenceSuffixEs: 'ensaladas.',
        audioPrompt: SHEILAS_KITCHEN_FULL_TRANSCRIPT,
        durationSeconds: 65,
        speakerGender: 'female',
        imageUrl: sheilaKitchenImg,
        options: [
          { id: 'opt-terrible', text: 'terrible', textEs: 'terribles', isCorrect: false },
          { id: 'opt-cooking', text: 'cooking', textEs: 'de cocinar', isCorrect: false },
          { id: 'opt-chicken', text: 'chicken', textEs: 'de pollo', isCorrect: false },
          { id: 'opt-healthy', text: 'healthy', textEs: 'saludables', isCorrect: true },
        ],
        correctAnswerId: 'opt-healthy',
        explanation: 'Sheila highlights that salads are "healthy summer foods," emphasizing their nutritional value.',
        explanationEs: 'Sheila destaca que las ensaladas son "alimentos saludables de verano", enfatizando su valor nutritivo.',
      },

      // Test 5 (antes Test 2): Drag into place ("an ad for")
      {
        id: 'food-test-5',
        number: 5,
        type: 'drag-drop',
        instructions: 'Drag the correct answer/s into place.',
        instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
        question: 'There is an ad for Durelle plates and dishes during "Sheila\'s Kitchen."',
        questionEs: 'Hay un anuncio de platos y vajillas Durelle durante "La Cocina de Sheila".',
        sentencePrefix: 'There is',
        sentencePrefixEs: 'Hay',
        sentenceSuffix: 'Durelle plates and dishes during "Sheila\'s Kitchen."',
        sentenceSuffixEs: 'platos y vajillas Durelle durante "La Cocina de Sheila".',
        audioPrompt: SHEILAS_KITCHEN_FULL_TRANSCRIPT,
        durationSeconds: 65,
        speakerGender: 'female',
        imageUrl: sheilaKitchenImg,
        options: [
          { id: 'opt-song', text: 'a song about', textEs: 'una canción sobre', isCorrect: false },
          { id: 'opt-ad', text: 'an ad for', textEs: 'un anuncio de', isCorrect: true },
          { id: 'opt-salad-in', text: 'a salad in', textEs: 'una ensalada en', isCorrect: false },
          { id: 'opt-meal-with', text: 'a meal with', textEs: 'una comida con', isCorrect: false },
        ],
        correctAnswerId: 'opt-ad',
        explanation: 'Sheila promotes Durelle: "And now, a few words about Durelle plates and dishes... Buy Durelle products and enjoy them...", which is a commercial advertisement.',
        explanationEs: 'Sheila promociona Durelle: "Y ahora, unas palabras sobre los platos y vajillas Durelle... Compra productos Durelle y disfrútalos...", lo cual es un anuncio publicitario.',
      },
    ],
  } as UnitTestExercise,
];
