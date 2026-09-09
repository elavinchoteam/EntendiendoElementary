import {
  ReadingStory,
  ReadingStoryExercise,
  ReadingComprehensionExercise,
  DragDropClozeExercise,
  ClassificationTableExercise,
  CheckboxMultiSelectExercise,
  WritingAiFeedbackExercise,
  UnitTestExercise,
  Exercise,
} from '../types';

export const DIETERS_STORY: ReadingStory = {
  title: 'Dieters Are Feeling Great!',
  titleEs: '¡Las Personas a Dieta se Sienten Genial!',
  author: 'by Virginia Vegan',
  authorEs: 'por Virginia Vegan',
  textEn:
    'Kim Fit, the famous woman basketball player, introduced her "Fit Feels Great" diet book three months ago. Thousands of people are already losing weight. "They feel wonderful! This diet is healthy and safe. You don\'t need to buy special foods. Anyone can use my diet!"\n\nDavid Meals is a 42-year-old businessman. He\'s doing the "Fit Feels Great" diet. "Before, I only ate a piece of cake for breakfast. Now I understand that breakfast is the most important meal of the day. The body needs energy after a long night without any food," he explains. Mr. Meals now eats some bread and some fat-free cottage cheese for breakfast.\n\nRock singer Maxi is doing Kim Fit\'s diet, too, and she feels terrific. Now, she never eats fried foods. She eats a lot of turkey and chicken; they have less fat than ham and steak. Maxi also doesn\'t use much salt. "I look ten years younger, don\'t I?" the superstar says.',
  textEs:
    'Kim Fit, la famosa jugadora de baloncesto, presentó su libro de dieta "Sentirse bien es genial" hace tres meses. Miles de personas ya están perdiendo peso. "¡Se sienten de maravilla! Esta dieta es saludable y segura. No necesitas comprar alimentos especiales. ¡Cualquiera puede seguir mi dieta!"\n\nDavid Meals es un hombre de negocios de 42 años. Está haciendo la dieta "Sentirse bien es genial". "Antes, solo comía un trozo de pastel en el desayuno. Ahora comprendo que el desayuno es la comida más importante del día. El cuerpo necesita energía tras una larga noche sin comida", explica. El Sr. Meals ahora come un poco de pan y un poco de queso cottage sin grasa para el desayuno.\n\nLa cantante de rock Maxi también está haciendo la dieta de Kim Fit, y se siente fenomenal. Ahora, nunca come alimentos fritos. Come mucho pavo y pollo; tienen menos grasa que el jamón y el filete de carne. Maxi además no usa mucha sal. "¿Acaso no parezco diez años más joven?", dice la superestrella.',
  paragraphsEn: [
    'Kim Fit, the famous woman basketball player, introduced her "Fit Feels Great" diet book three months ago. Thousands of people are already losing weight. "They feel wonderful! This diet is healthy and safe. You don\'t need to buy special foods. Anyone can use my diet!"',
    'David Meals is a 42-year-old businessman. He\'s doing the "Fit Feels Great" diet. "Before, I only ate a piece of cake for breakfast. Now I understand that breakfast is the most important meal of the day. The body needs energy after a long night without any food," he explains. Mr. Meals now eats some bread and some fat-free cottage cheese for breakfast.',
    'Rock singer Maxi is doing Kim Fit\'s diet, too, and she feels terrific. Now, she never eats fried foods. She eats a lot of turkey and chicken; they have less fat than ham and steak. Maxi also doesn\'t use much salt. "I look ten years younger, don\'t I?" the superstar says.',
  ],
  paragraphsEs: [
    'Kim Fit, la famosa jugadora de baloncesto, presentó su libro de dieta "Sentirse bien es genial" hace tres meses. Miles de personas ya están perdiendo peso. "¡Se sienten de maravilla! Esta dieta es saludable y segura. No necesitas comprar alimentos especiales. ¡Cualquiera puede seguir mi dieta!"',
    'David Meals es un hombre de negocios de 42 años. Está haciendo la dieta "Sentirse bien es genial". "Antes, solo comía un trozo de pastel en el desayuno. Ahora comprendo que el desayuno es la comida más importante del día. El cuerpo necesita energía tras una larga noche sin comida", explica. El Sr. Meals ahora come un poco de pan y un poco de queso cottage sin grasa para el desayuno.',
    'La cantante de rock Maxi también está haciendo la dieta de Kim Fit, y se siente fenomenal. Ahora, nunca come alimentos fritos. Come mucho pavo y pollo; tienen menos grasa que el jamón y el filete de carne. Maxi además no usa mucha sal. "¿Acaso no parezco diez años más joven?", dice la superestrella.',
  ],
  audioText:
    'Dieters Are Feeling Great! by Virginia Vegan. Kim Fit, the famous woman basketball player, introduced her "Fit Feels Great" diet book three months ago. Thousands of people are already losing weight. "They feel wonderful! This diet is healthy and safe. You don\'t need to buy special foods. Anyone can use my diet!" David Meals is a 42-year-old businessman. He\'s doing the "Fit Feels Great" diet. "Before, I only ate a piece of cake for breakfast. Now I understand that breakfast is the most important meal of the day. The body needs energy after a long night without any food," he explains. Mr. Meals now eats some bread and some fat-free cottage cheese for breakfast. Rock singer Maxi is doing Kim Fit\'s diet, too, and she feels terrific. Now, she never eats fried foods. She eats a lot of turkey and chicken; they have less fat than ham and steak. Maxi also doesn\'t use much salt. "I look ten years younger, don\'t I?" the superstar says.',
};

// ==========================================
// ACTIVIDAD 1: Reading Story Presentation
// ==========================================
export const DIETERS_ACT1_STORY: ReadingStoryExercise = {
  id: 'dieters-act1-story',
  title: 'Dieters Are Feeling Great!',
  titleEs: '¡Las Personas a Dieta se Sienten Genial!',
  type: 'reading-story',
  story: DIETERS_STORY,
};

// ==========================================
// ACTIVIDAD 2: Reading Comprehension True/False
// ==========================================
export const DIETERS_ACT2_COMPREHENSION: ReadingComprehensionExercise = {
  id: 'dieters-act2-comprehension',
  title: 'Actividad 2: True or False',
  titleEs: 'Actividad 2: Verdadero o Falso',
  type: 'reading-comprehension',
  instructions:
    'Read the article "Dieters Are Feeling Great!" Then decide whether each sentence is true or false according to the article.',
  instructionsEs:
    'Lee el artículo "¡Las personas a dieta se sienten genial!". Luego decide si cada oración es verdadera o falsa según el artículo.',
  story: DIETERS_STORY,
  questions: [
    {
      id: 'q1',
      question: 'The diet makes some people feel tired at night.',
      questionEs: 'La dieta hace que algunas personas se sientan cansadas por la noche.',
      options: [
        { id: 'opt-t', text: 'True', textEs: 'Verdadero', isCorrect: false },
        { id: 'opt-f', text: 'False', textEs: 'Falso', isCorrect: true },
      ],
      correctAnswerId: 'opt-f',
      explanation:
        'False. The article mentions people feel wonderful and terrific on the diet, not tired at night.',
      explanationEs:
        'Falso. El artículo menciona que la gente se siente de maravilla y fenomenal con la dieta, no cansada por la noche.',
    },
    {
      id: 'q2',
      question: "Some people like Kim's diet plan because they don't have to buy any special foods.",
      questionEs:
        'A algunas personas les gusta el plan de dieta de Kim porque no tienen que comprar alimentos especiales.',
      options: [
        { id: 'opt-t', text: 'True', textEs: 'Verdadero', isCorrect: true },
        { id: 'opt-f', text: 'False', textEs: 'Falso', isCorrect: false },
      ],
      correctAnswerId: 'opt-t',
      explanation: 'True. Kim Fit says: "You don\'t need to buy special foods. Anyone can use my diet!"',
      explanationEs:
        'Verdadero. Kim Fit afirma: "No necesitas comprar alimentos especiales. ¡Cualquiera puede seguir mi dieta!"',
    },
    {
      id: 'q3',
      question: 'David Meals now knows that breakfast is the most important meal of the day.',
      questionEs:
        'David Meals ahora sabe que el desayuno es la comida más importante del día.',
      options: [
        { id: 'opt-t', text: 'True', textEs: 'Verdadero', isCorrect: true },
        { id: 'opt-f', text: 'False', textEs: 'Falso', isCorrect: false },
      ],
      correctAnswerId: 'opt-t',
      explanation:
        'True. David Meals explains: "Now I understand that breakfast is the most important meal of the day."',
      explanationEs:
        'Verdadero. David Meals explica: "Ahora comprendo que el desayuno es la comida más importante del día."',
    },
  ],
};

// ==========================================
// ACTIVIDAD 3: Drag & Drop Cloze
// ==========================================
export const DIETERS_ACT3_CLOZE: DragDropClozeExercise = {
  id: 'dieters-act3-cloze',
  title: 'Actividad 3: Drag the words',
  titleEs: 'Actividad 3: Arrastra las palabras',
  type: 'drag-drop-cloze',
  instructions: 'Drag the correct answers into place.',
  instructionsEs: 'Arrastra las respuestas correctas a su lugar.',
  storyTitle: 'Dieters Are Feeling Great!',
  story: DIETERS_STORY,
  template:
    "The {0} basketball player Kim Fit is changing people's lives with her new {1} book. People are losing {2} , feeling {3} , and changing what they eat and when they eat. You don't need {4} foods, but you do need to eat a good {5} , less salt, and no {6} foods.",
  translationEs:
    'La famosa jugadora de baloncesto Kim Fit está cambiando las vidas de las personas con su nuevo libro de dieta. La gente está perdiendo peso, sintiéndose maravillosa, y cambiando lo que come y cuándo come. No necesitas comidas especiales, pero sí necesitas comer un buen desayuno, menos sal y ninguna comida frita.',
  paragraphsEn: [
    "The {0} basketball player Kim Fit is changing people's lives with her new {1} book. People are losing {2} , feeling {3} , and changing what they eat and when they eat. You don't need {4} foods, but you do need to eat a good {5} , less salt, and no {6} foods.",
  ],
  blanks: [
    { id: 'b0', correctAnswer: 'famous' },
    { id: 'b1', correctAnswer: 'diet' },
    { id: 'b2', correctAnswer: 'weight' },
    { id: 'b3', correctAnswer: 'wonderful' },
    { id: 'b4', correctAnswer: 'special' },
    { id: 'b5', correctAnswer: 'breakfast' },
    { id: 'b6', correctAnswer: 'fried' },
  ],
  wordBank: ['fried', 'breakfast', 'diet', 'special', 'wonderful', 'famous', 'weight'],
};

// ==========================================
// ACTIVIDAD 4: Categorization / Two-Column Table
// ==========================================
export const DIETERS_ACT4_TABLE: ClassificationTableExercise = {
  id: 'dieters-act4-table',
  title: 'Actividad 4: Describe the people',
  titleEs: 'Actividad 4: Describe a las personas',
  type: 'classification-table',
  instructions:
    'The article "Dieters Are Feeling Great!" talks about two people who are happy with the "Fit Feels Great" diet. Describe these people by filling in the table.',
  instructionsEs:
    'El artículo "¡Las personas a dieta se sienten genial!" habla sobre dos personas que están felices con la dieta "Sentirse bien es genial". Describe a estas personas completando la tabla.',
  story: DIETERS_STORY,
  columns: [
    {
      id: 'david-meals',
      header: 'David Meals',
      headerEs: 'David Meals',
      expectedItemIds: ['d1', 'd2', 'd3', 'd4'],
    },
    {
      id: 'maxi-rock-singer',
      header: 'Maxi The Rock Singer',
      headerEs: 'Maxi La Cantante de Rock',
      expectedItemIds: ['m1', 'm2', 'm3', 'm4'],
    },
  ],
  items: [
    {
      id: 'd1',
      text: 'liked to eat cake for breakfast',
      textEs: 'le gustaba comer pastel en el desayuno',
      columnId: 'david-meals',
    },
    {
      id: 'd2',
      text: 'now likes bread and cottage cheese for breakfast',
      textEs: 'ahora le gusta el pan y el queso cottage en el desayuno',
      columnId: 'david-meals',
    },
    {
      id: 'd3',
      text: 'is 42 years old',
      textEs: 'tiene 42 años',
      columnId: 'david-meals',
    },
    {
      id: 'd4',
      text: 'is a businessman',
      textEs: 'es un hombre de negocios',
      columnId: 'david-meals',
    },
    {
      id: 'm1',
      text: 'now eats more turkey and chicken',
      textEs: 'ahora come más pavo y pollo',
      columnId: 'maxi-rock-singer',
    },
    {
      id: 'm2',
      text: 'liked to eat fried foods',
      textEs: 'le gustaba comer alimentos fritos',
      columnId: 'maxi-rock-singer',
    },
    {
      id: 'm3',
      text: 'feels terrific now',
      textEs: 'se siente fenomenal ahora',
      columnId: 'maxi-rock-singer',
    },
    {
      id: 'm4',
      text: "doesn't use much salt anymore",
      textEs: 'ya no usa mucha sal',
      columnId: 'maxi-rock-singer',
    },
  ],
};

// ==========================================
// ACTIVIDAD 5: Multi-Select Checkboxes
// ==========================================
export const DIETERS_ACT5_CHECKBOXES: CheckboxMultiSelectExercise = {
  id: 'dieters-act5-checkboxes',
  title: 'Actividad 5: Mark what dieters did',
  titleEs: 'Actividad 5: Marca lo que hicieron los que hacen dieta',
  type: 'checkbox-multiselect',
  instructions:
    'Read "Dieters are Feeling Great!" Mark what the dieters did after starting the diet.',
  instructionsEs:
    'Lee "¡Las personas a dieta se sienten genial!". Marca lo que hicieron las personas que hacen dieta después de comenzar la dieta.',
  story: DIETERS_STORY,
  options: [
    {
      id: 'opt1',
      text: 'eat a piece of cake for breakfast',
      textEs: 'comer un trozo de pastel en el desayuno',
      isCorrect: false, // David only did this before the diet
    },
    {
      id: 'opt2',
      text: "don't use much salt",
      textEs: 'no usar mucha sal',
      isCorrect: true, // Maxi doesn't use much salt
    },
    {
      id: 'opt3',
      text: 'eat breakfast',
      textEs: 'desayunar',
      isCorrect: true, // David now understands breakfast is important and eats it
    },
    {
      id: 'opt4',
      text: 'eat ham and steak',
      textEs: 'comer jamón y filete de carne',
      isCorrect: false, // Maxi eats turkey/chicken because they have less fat than ham and steak
    },
    {
      id: 'opt5',
      text: 'feel terrific',
      textEs: 'sentirse fenomenal',
      isCorrect: true, // Maxi feels terrific and dieters feel wonderful
    },
    {
      id: 'opt6',
      text: 'eat fried food',
      textEs: 'comer comida frita',
      isCorrect: false, // Maxi never eats fried foods now
    },
  ],
  explanation:
    'After starting the diet, dieters don\'t use much salt, eat breakfast, and feel terrific. They do not eat cake for breakfast, ham/steak, or fried foods.',
  explanationEs:
    'Después de comenzar la dieta, los que hacen dieta no usan mucha sal, desayunan y se sienten fenomenal. No comen pastel en el desayuno, jamón/bistec ni alimentos fritos.',
};

// ==========================================
// ACTIVIDAD 6: Writing with AI Feedback
// ==========================================
export const DIETERS_ACT6_WRITING: WritingAiFeedbackExercise = {
  id: 'dieters-act6-writing',
  title: 'Actividad 6: Write a letter',
  titleEs: 'Actividad 6: Escribe una carta',
  type: 'writing-ai-feedback',
  instructions:
    'Write your answer, review AI feedback, improve it, and mark Done if satisfied or get another AI feedback.',
  instructionsEs:
    'Escribe tu respuesta, revisa los comentarios de la IA, mejórala y marca Listo si estás satisfecho o solicita otra revisión de la IA.',
  prompt:
    'You are doing the Kim Fit diet and are losing lots of weight. Write a letter to a friend telling him / her how it has made you feel, what you ate before the diet, and what you eat now. Send it to your teacher.',
  promptEs:
    'Estás haciendo la dieta de Kim Fit y estás perdiendo mucho peso. Escribe una carta a un amigo contándole cómo te ha hecho sentir, qué comías antes de la dieta y qué comes ahora. Envíala a tu profesor.',
  maxAiRequests: 2,
  initialWordsTarget: 25,
  placeholder:
    'Dear [Friend\'s Name],\n\nI am writing to tell you about the Kim Fit diet. I feel wonderful and have lots of energy! Before the diet, I ate...\n\nNow, I eat...\n\nBest regards,\n[Your Name]',
  storyContext: DIETERS_STORY.textEn,
  story: DIETERS_STORY,
};

// ==========================================
// ACTIVIDAD 7: Mastery Test (5 tests in order)
// ==========================================
export const DIETERS_ACT7_TEST: UnitTestExercise = {
  id: 'dieters-act7-test',
  title: 'Test: Dieters Are Feeling Great!',
  titleEs: 'Test: ¡Las Personas a Dieta se Sienten Genial!',
  subtitle: 'Mastery Test: 5 Questions',
  subtitleEs: 'Test de Maestría: 5 Preguntas',
  description:
    'Evaluation test based on the article "Dieters Are Feeling Great!" by Virginia Vegan.',
  descriptionEs:
    'Test de evaluación basado en el artículo "Dieters Are Feeling Great!" de Virginia Vegan.',
  type: 'unit-test',
  totalQuestions: 5,
  readingStory: DIETERS_STORY,
  questions: [
    // TEST 1
    {
      id: 'test-q1',
      number: 1,
      type: 'radio-choice',
      instructions: 'Choose the correct answer.',
      instructionsEs: 'Elige la respuesta correcta.',
      question: 'Who wrote the book "Fit Feels Great"?',
      questionEs: '¿Quién escribió el libro "Fit Feels Great"?',
      readingStory: DIETERS_STORY,
      options: [
        { id: 't1-opt1', text: 'Kim Fit', textEs: 'Kim Fit', isCorrect: true },
        { id: 't1-opt2', text: 'Virginia Vegan', textEs: 'Virginia Vegan', isCorrect: false },
        { id: 't1-opt3', text: 'Maxi Star', textEs: 'Maxi Star', isCorrect: false },
        { id: 't1-opt4', text: 'David Meals', textEs: 'David Meals', isCorrect: false },
      ],
      correctAnswerId: 't1-opt1',
      explanation:
        'Kim Fit, the famous woman basketball player, introduced her "Fit Feels Great" diet book. Virginia Vegan is the author of the article.',
      explanationEs:
        'Kim Fit, la famosa jugadora de baloncesto, presentó su libro de dieta "Fit Feels Great". Virginia Vegan es la autora del artículo.',
    },
    // TEST 2
    {
      id: 'test-q2',
      number: 2,
      type: 'radio-choice',
      instructions: 'Choose the correct answer.',
      instructionsEs: 'Elige la respuesta correcta.',
      question: 'Which sentence is true?',
      questionEs: '¿Qué oración es verdadera?',
      readingStory: DIETERS_STORY,
      options: [
        {
          id: 't2-opt1',
          text: "Anyone can use Kim's diet.",
          textEs: 'Cualquiera puede usar la dieta de Kim.',
          isCorrect: true,
        },
        {
          id: 't2-opt2',
          text: 'Breakfast is not important.',
          textEs: 'El desayuno no es importante.',
          isCorrect: false,
        },
        {
          id: 't2-opt3',
          text: 'Maxi eats a lot of steak.',
          textEs: 'Maxi come mucho filete de carne.',
          isCorrect: false,
        },
        {
          id: 't2-opt4',
          text: 'Kim Fit is a businesswoman.',
          textEs: 'Kim Fit es una mujer de negocios.',
          isCorrect: false,
        },
      ],
      correctAnswerId: 't2-opt1',
      explanation:
        'Kim Fit says: "Anyone can use my diet!" Breakfast is the most important meal, Maxi eats turkey/chicken instead of steak, and David Meals is the businessman.',
      explanationEs:
        'Kim Fit afirma: "¡Cualquiera puede seguir mi dieta!". El desayuno es la comida más importante, Maxi come pavo/pollo en vez de bistec, y David Meals es el hombre de negocios.',
    },
    // TEST 3
    {
      id: 'test-q3',
      number: 3,
      type: 'radio-choice',
      instructions: 'Choose the correct answer.',
      instructionsEs: 'Elige la respuesta correcta.',
      question: "What is another title for Kim Fit's diet book?",
      questionEs: '¿Cuál es otro título para el libro de dieta de Kim Fit?',
      readingStory: DIETERS_STORY,
      options: [
        {
          id: 't3-opt1',
          text: '"The Healthier Way to Eat"',
          textEs: '"La forma más saludable de comer"',
          isCorrect: true,
        },
        {
          id: 't3-opt2',
          text: '"The Life of Kim Fit"',
          textEs: '"La vida de Kim Fit"',
          isCorrect: false,
        },
        {
          id: 't3-opt3',
          text: '"The Most Important Meal"',
          textEs: '"La comida más importante"',
          isCorrect: false,
        },
        {
          id: 't3-opt4',
          text: '"Less Fat and Less Salt"',
          textEs: '"Menos grasa y menos sal"',
          isCorrect: false,
        },
      ],
      correctAnswerId: 't3-opt1',
      explanation:
        '"The Healthier Way to Eat" best captures the purpose of Kim Fit\'s diet book, which promotes healthy, safe eating without special foods.',
      explanationEs:
        '"La forma más saludable de comer" resume mejor el propósito del libro de dieta de Kim Fit, que promueve una alimentación sana y segura sin alimentos especiales.',
    },
    // TEST 4
    {
      id: 'test-q4',
      number: 4,
      type: 'radio-choice',
      instructions: 'Choose the correct answer.',
      instructionsEs: 'Elige la respuesta correcta.',
      question: 'Who is "I" in: "I look ten years younger ... "?',
      questionEs: '¿Quién es "yo" en: "Parezco diez años más joven..."?',
      readingStory: DIETERS_STORY,
      options: [
        { id: 't4-opt1', text: 'Kim Fit', textEs: 'Kim Fit', isCorrect: false },
        { id: 't4-opt2', text: 'David Meals', textEs: 'David Meals', isCorrect: false },
        { id: 't4-opt3', text: 'Maxi', textEs: 'Maxi', isCorrect: true },
        {
          id: 't4-opt4',
          text: 'a basketball player',
          textEs: 'una jugadora de baloncesto',
          isCorrect: false,
        },
      ],
      correctAnswerId: 't4-opt3',
      explanation:
        'Rock singer Maxi says: "I look ten years younger, don\'t I?" the superstar says.',
      explanationEs:
        'La cantante de rock Maxi dice: "¿Acaso no parezco diez años más joven?", dice la superestrella.',
    },
    // TEST 5
    {
      id: 'test-q5',
      number: 5,
      type: 'radio-choice',
      instructions: 'Choose the correct answer.',
      instructionsEs: 'Elige la respuesta correcta.',
      question: 'How do many people feel after they use the diet?',
      questionEs: '¿Cómo se sienten muchas personas después de hacer la dieta?',
      readingStory: DIETERS_STORY,
      options: [
        { id: 't5-opt1', text: 'They feel fat.', textEs: 'Se sienten gordos.', isCorrect: false },
        {
          id: 't5-opt2',
          text: 'They feel wonderful.',
          textEs: 'Se sienten de maravilla.',
          isCorrect: true,
        },
        { id: 't5-opt3', text: 'They feel terrible.', textEs: 'Se sienten terrible.', isCorrect: false },
        {
          id: 't5-opt4',
          text: 'They feel important.',
          textEs: 'Se sienten importantes.',
          isCorrect: false,
        },
      ],
      correctAnswerId: 't5-opt2',
      explanation:
        'The article states: Thousands of people are already losing weight. "They feel wonderful!"',
      explanationEs:
        'El artículo dice: Miles de personas ya están perdiendo peso. "¡Se sienten de maravilla!"',
    },
  ],
};

// All 6 Activities + Activity 7 (Test) in strict sequential order
export const DIETERS_SECTION_EXERCISES: Exercise[] = [
  DIETERS_ACT1_STORY,
  DIETERS_ACT2_COMPREHENSION,
  DIETERS_ACT3_CLOZE,
  DIETERS_ACT4_TABLE,
  DIETERS_ACT5_CHECKBOXES,
  DIETERS_ACT6_WRITING,
  DIETERS_ACT7_TEST,
];
