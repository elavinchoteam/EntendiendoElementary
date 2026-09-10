import {
  LessonText,
  LessonSentence,
  DialogueLine,
  DragDropSentenceExercise,
  UnitTestExercise,
} from '../types';
import nounsSugarCoffeeImg from '../assets/images/nouns_sugar_coffee_1788995011818.jpg';

export { nounsSugarCoffeeImg };

export const NOUNS_SENTENCES: LessonSentence[] = [
  {
    en: '- How much sugar do you want in your coffee?',
    es: '- ¿Cuánta azúcar quieres en tu café?',
  },
  {
    en: '- Not much, just a little.',
    es: '- No mucha, solo un poco.',
  },
  {
    en: '- What about milk?',
    es: '- ¿Y qué tal de leche?',
  },
  {
    en: '- Oh, lots of milk please.',
    es: '- Oh, mucha leche por favor.',
  },
];

export const NOUNS_DIALOGUE: DialogueLine[] = [
  {
    speaker: 'Speaker 1',
    textEn: '- How much sugar do you want in your coffee?',
    textEs: '- ¿Cuánta azúcar quieres en tu café?',
    avatarColor: 'bg-emerald-600',
  },
  {
    speaker: 'Speaker 2',
    textEn: '- Not much, just a little.',
    textEs: '- No mucha, solo un poco.',
    avatarColor: 'bg-amber-600',
  },
  {
    speaker: 'Speaker 1',
    textEn: '- What about milk?',
    textEs: '- ¿Y qué tal de leche?',
    avatarColor: 'bg-emerald-600',
  },
  {
    speaker: 'Speaker 2',
    textEn: '- Oh, lots of milk please.',
    textEs: '- Oh, mucha leche por favor.',
    avatarColor: 'bg-amber-600',
  },
];

export const NOUNS_REFERENCE_SENTENCE =
  '- How much sugar do you want in your coffee? - Not much, just a little. - What about milk? - Oh, lots of milk please.';
export const NOUNS_REFERENCE_SENTENCE_ES =
  '- ¿Cuánta azúcar quieres en tu café? - No mucha, solo un poco. - ¿Y qué tal de leche? - Oh, mucha leche por favor.';
export const NOUNS_HIGHLIGHTS = ['How much', 'much', 'a little', 'lots of'];

export const NOUNS_LESSON_TEXT: LessonText = {
  title: 'Lesson 4: Nouns: Non-Count and Quantifiers',
  stepTitle: 'Step 1: Explore',
  audioText:
    '- How much sugar do you want in your coffee? - Not much, just a little. - What about milk? - Oh, lots of milk please.',
  textEn:
    '- How much sugar do you want in your coffee?\n- Not much, just a little.\n- What about milk?\n- Oh, lots of milk please.',
  textEs:
    '- ¿Cuánta azúcar quieres en tu café?\n- No mucha, solo un poco.\n- ¿Y qué tal de leche?\n- Oh, mucha leche por favor.',
  imageSrc: nounsSugarCoffeeImg,
  durationSeconds: 8,
  sentences: NOUNS_SENTENCES,
  practiceInstructions:
    'Lee y escucha la conversación sobre sustantivos no contables y cuantificadores (How much, much, a little, lots of).',
};

export const NOUNS_EXERCISES: (DragDropSentenceExercise | UnitTestExercise)[] = [
  /* Actividad 2 (actividad 2.png) */
  {
    id: 'nouns-ex-2',
    type: 'drag-drop-sentence',
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    audioPrompt: "Our Russian classes are very small. There isn't much interest in Russian this year.",
    durationSeconds: 8,
    imageUrl: nounsSugarCoffeeImg,
    referenceText: NOUNS_REFERENCE_SENTENCE,
    referenceTextEs: NOUNS_REFERENCE_SENTENCE_ES,
    referenceHighlights: NOUNS_HIGHLIGHTS,
    dialogueLines: [
      {
        textEn: "Our Russian classes are very small. There isn't ________ interest in Russian this year.",
        textEs: 'Nuestras clases de ruso son muy pequeñas. No hay mucho interés en ruso este año.',
        hasBlank: true,
        prefix: "Our Russian classes are very small. There isn't ",
        prefixEs: 'Nuestras clases de ruso son muy pequeñas. No hay ',
        suffix: ' interest in Russian this year.',
        suffixEs: ' interés en ruso este año.',
      },
    ],
    options: [
      { id: 'opt-some', text: 'some', isCorrect: false },
      { id: 'opt-a-lot', text: 'a lot', isCorrect: false },
      { id: 'opt-many', text: 'many', isCorrect: false },
      { id: 'opt-much', text: 'much', isCorrect: true },
    ],
    correctAnswerId: 'opt-much',
    explanation:
      '"Interest" is a non-count noun. In negative sentences ("isn\'t"), we use "much" ("There isn\'t much interest in Russian this year").',
    explanationEs:
      '"Interest" (interés) es un sustantivo incontable. En oraciones negativas ("isn\'t"), usamos "much" ("There isn\'t much interest in Russian this year").',
  },

  /* Actividad 3 (actividad 3.png) */
  {
    id: 'nouns-ex-3',
    type: 'drag-drop-sentence',
    isDropdown: true,
    instructions: 'Select the correct answer from the drop-down list.',
    instructionsEs: 'Selecciona la respuesta correcta de la lista desplegable.',
    audioPrompt: "- May I have some tea? - Sorry, there isn't any.",
    durationSeconds: 8,
    imageUrl: nounsSugarCoffeeImg,
    referenceText: NOUNS_REFERENCE_SENTENCE,
    referenceTextEs: NOUNS_REFERENCE_SENTENCE_ES,
    referenceHighlights: NOUNS_HIGHLIGHTS,
    dialogueLines: [
      {
        textEn: '- May I have some tea?',
        textEs: '- ¿Puedo tomar un poco de té?',
        hasBlank: false,
      },
      {
        textEn: "- Sorry, there isn't any.",
        textEs: '- Lo siento, no queda nada.',
        hasBlank: true,
        prefix: '- Sorry, ',
        prefixEs: '- Lo siento, ',
        suffix: '',
        suffixEs: '',
      },
    ],
    options: [
      { id: 'opt-arent-any', text: "there aren't any.", isCorrect: false },
      { id: 'opt-isnt-one', text: "there isn't one.", isCorrect: false },
      { id: 'opt-arent-lot', text: "there aren't a lot of them.", isCorrect: false },
      { id: 'opt-isnt-any', text: "there isn't any.", isCorrect: true },
    ],
    correctAnswerId: 'opt-isnt-any',
    explanation:
      '"Tea" is a non-count noun. We use a singular verb and "any" to state that none remains: "Sorry, there isn\'t any."',
    explanationEs:
      '"Tea" (té) es un sustantivo incontable. Usamos verbo singular y "any" para indicar que no queda nada: "Sorry, there isn\'t any."',
  },

  /* Actividad 4 (actividad 4.png) */
  {
    id: 'nouns-ex-4',
    type: 'drag-drop-sentence',
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    audioPrompt: 'Tom ate a little bread and cheese and drank a big glass of milk for lunch.',
    durationSeconds: 8,
    imageUrl: nounsSugarCoffeeImg,
    referenceText: NOUNS_REFERENCE_SENTENCE,
    referenceTextEs: NOUNS_REFERENCE_SENTENCE_ES,
    referenceHighlights: NOUNS_HIGHLIGHTS,
    dialogueLines: [
      {
        textEn: 'Tom ate ________ bread and cheese and drank a big glass of milk for lunch.',
        textEs: 'Tom comió un poco de pan y queso y bebió un vaso grande de leche para el almuerzo.',
        hasBlank: true,
        prefix: 'Tom ate ',
        prefixEs: 'Tom comió ',
        suffix: ' bread and cheese and drank a big glass of milk for lunch.',
        suffixEs: ' pan y queso y bebió un vaso grande de leche para el almuerzo.',
      },
    ],
    options: [
      { id: 'opt-a-few', text: 'a few', isCorrect: false },
      { id: 'opt-many', text: 'many', isCorrect: false },
      { id: 'opt-a-little', text: 'a little', isCorrect: true },
      { id: 'opt-a-lot', text: 'a lot', isCorrect: false },
    ],
    correctAnswerId: 'opt-a-little',
    explanation:
      '"Bread and cheese" are non-count nouns. We use "a little" to express a small amount without "of": "Tom ate a little bread and cheese...".',
    explanationEs:
      '"Bread and cheese" (pan y queso) son sustantivos incontables. Usamos "a little" para expresar una pequeña cantidad sin necesidad de "of": "Tom ate a little bread and cheese...".',
  },

  /* Actividad 5 (actividad 5.png) */
  {
    id: 'nouns-ex-5',
    type: 'drag-drop-sentence',
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    audioPrompt: "Sarah wants to buy a new coat, but she doesn't have much money to spend.",
    durationSeconds: 8,
    imageUrl: nounsSugarCoffeeImg,
    referenceText: NOUNS_REFERENCE_SENTENCE,
    referenceTextEs: NOUNS_REFERENCE_SENTENCE_ES,
    referenceHighlights: NOUNS_HIGHLIGHTS,
    dialogueLines: [
      {
        textEn: "Sarah wants to buy a new coat, but she ________ money to spend.",
        textEs: 'Sarah quiere comprar un abrigo nuevo, pero no tiene mucho dinero para gastar.',
        hasBlank: true,
        prefix: 'Sarah wants to buy a new coat, but she ',
        prefixEs: 'Sarah quiere comprar un abrigo nuevo, pero ella ',
        suffix: ' money to spend.',
        suffixEs: ' dinero para gastar.',
      },
    ],
    options: [
      { id: 'opt-doesnt-have-lot', text: "doesn't have a lot", isCorrect: false },
      { id: 'opt-only-few', text: 'only has a few', isCorrect: false },
      { id: 'opt-doesnt-have-much', text: "doesn't have much", isCorrect: true },
      { id: 'opt-doesnt-have-many', text: "doesn't have many", isCorrect: false },
    ],
    correctAnswerId: 'opt-doesnt-have-much',
    explanation:
      '"Money" is a non-count noun. In the negative with third-person singular "she", we use "doesn\'t have much money".',
    explanationEs:
      '"Money" (dinero) es incontable. En negativo para tercera persona singular "she", decimos "doesn\'t have much money".',
  },

  /* Actividad 6 (actividad 6.png) */
  {
    id: 'nouns-ex-6',
    type: 'drag-drop-sentence',
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    audioPrompt: "Bill doesn't usually get much mail, but yesterday he received three letters, four bills, and a magazine.",
    durationSeconds: 8,
    imageUrl: nounsSugarCoffeeImg,
    referenceText: NOUNS_REFERENCE_SENTENCE,
    referenceTextEs: NOUNS_REFERENCE_SENTENCE_ES,
    referenceHighlights: NOUNS_HIGHLIGHTS,
    dialogueLines: [
      {
        textEn: "Bill doesn't usually get ________ mail, but yesterday he received three letters, four bills, and a magazine.",
        textEs: 'Bill usualmente no recibe mucho correo, pero ayer recibió tres cartas, cuatro facturas y una revista.',
        hasBlank: true,
        prefix: "Bill doesn't usually get ",
        prefixEs: 'Bill usualmente no recibe ',
        suffix: ' mail, but yesterday he received three letters, four bills, and a magazine.',
        suffixEs: ' correo, pero ayer recibió tres cartas, cuatro facturas y una revista.',
      },
    ],
    options: [
      { id: 'opt-much', text: 'much', isCorrect: true },
      { id: 'opt-many', text: 'many', isCorrect: false },
      { id: 'opt-a-few', text: 'a few', isCorrect: false },
    ],
    correctAnswerId: 'opt-much',
    explanation:
      '"Mail" is a non-count noun. In negative clauses ("doesn\'t get"), we use "much mail".',
    explanationEs:
      '"Mail" (correo) es incontable. En oraciones negativas ("doesn\'t get"), usamos "much": "much mail".',
  },

  /* Actividad 7 (actividad 7.png) */
  {
    id: 'nouns-ex-7',
    type: 'drag-drop-sentence',
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    audioPrompt: '- How much sugar do you want in your tea?',
    durationSeconds: 8,
    imageUrl: nounsSugarCoffeeImg,
    referenceText: NOUNS_REFERENCE_SENTENCE,
    referenceTextEs: NOUNS_REFERENCE_SENTENCE_ES,
    referenceHighlights: NOUNS_HIGHLIGHTS,
    dialogueLines: [
      {
        textEn: '- How ________ sugar do you want in your tea?',
        textEs: '- ¿Cuánta azúcar quieres en tu té?',
        hasBlank: true,
        prefix: '- How ',
        prefixEs: '- ¿',
        suffix: ' sugar do you want in your tea?',
        suffixEs: ' azúcar quieres en tu té?',
      },
    ],
    options: [
      { id: 'opt-any', text: 'any', isCorrect: false },
      { id: 'opt-much', text: 'much', isCorrect: true },
      { id: 'opt-some', text: 'some', isCorrect: false },
      { id: 'opt-a-little', text: 'a little', isCorrect: false },
    ],
    correctAnswerId: 'opt-much',
    explanation:
      'We ask "How much" when asking for the quantity of non-count nouns such as "sugar": "How much sugar do you want in your tea?".',
    explanationEs:
      'Preguntamos "How much" cuando consultamos por la cantidad de un sustantivo incontable como "sugar" (azúcar): "- How much sugar do you want in your tea?".',
  },

  /* Actividad 8 (actividad 8.png) */
  {
    id: 'nouns-ex-8',
    type: 'drag-drop-sentence',
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    audioPrompt: "Bill has to do some homework, then he's going to a friend's house.",
    durationSeconds: 8,
    imageUrl: nounsSugarCoffeeImg,
    referenceText: NOUNS_REFERENCE_SENTENCE,
    referenceTextEs: NOUNS_REFERENCE_SENTENCE_ES,
    referenceHighlights: NOUNS_HIGHLIGHTS,
    dialogueLines: [
      {
        textEn: "Bill has to do ________ homework, then he's going to a friend's house.",
        textEs: 'Bill tiene que hacer tarea, luego irá a la casa de un amigo.',
        hasBlank: true,
        prefix: 'Bill has to do ',
        prefixEs: 'Bill tiene que hacer ',
        suffix: " homework, then he's going to a friend's house.",
        suffixEs: ' tarea, luego irá a la casa de un amigo.',
      },
    ],
    options: [
      { id: 'opt-some', text: 'some', isCorrect: true },
      { id: 'opt-any', text: 'any', isCorrect: false },
      { id: 'opt-a-few', text: 'a few', isCorrect: false },
    ],
    correctAnswerId: 'opt-some',
    explanation:
      '"Homework" is non-count. In affirmative sentences, we use "some": "Bill has to do some homework...".',
    explanationEs:
      '"Homework" (tarea) es incontable. En oraciones afirmativas usamos "some": "Bill has to do some homework...".',
  },

  /* Actividad 9 (actividad 9.png) */
  {
    id: 'nouns-ex-9',
    type: 'drag-drop-sentence',
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    audioPrompt: "I don't have any money. Can you pay for my lunch?",
    durationSeconds: 8,
    imageUrl: nounsSugarCoffeeImg,
    referenceText: NOUNS_REFERENCE_SENTENCE,
    referenceTextEs: NOUNS_REFERENCE_SENTENCE_ES,
    referenceHighlights: NOUNS_HIGHLIGHTS,
    dialogueLines: [
      {
        textEn: "I don't have ________ money. Can you pay for my lunch?",
        textEs: 'No tengo dinero. ¿Puedes pagar mi almuerzo?',
        hasBlank: true,
        prefix: "I don't have ",
        prefixEs: 'No tengo ',
        suffix: ' money. Can you pay for my lunch?',
        suffixEs: ' dinero. ¿Puedes pagar mi almuerzo?',
      },
    ],
    options: [
      { id: 'opt-a-lot', text: 'a lot', isCorrect: false },
      { id: 'opt-many', text: 'many', isCorrect: false },
      { id: 'opt-some', text: 'some', isCorrect: false },
      { id: 'opt-any', text: 'any', isCorrect: true },
    ],
    correctAnswerId: 'opt-any',
    explanation:
      'In negative statements ("don\'t have"), we use "any" with non-count nouns: "I don\'t have any money."',
    explanationEs:
      'En oraciones negativas ("don\'t have"), usamos "any" con sustantivos incontables: "I don\'t have any money."',
  },

  /* Actividad 10 (actividad 10.png) */
  {
    id: 'nouns-ex-10',
    type: 'drag-drop-sentence',
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    audioPrompt: 'I took a lot of pictures at the party last night. Now I need to buy some more film for my camera.',
    durationSeconds: 8,
    imageUrl: nounsSugarCoffeeImg,
    referenceText: NOUNS_REFERENCE_SENTENCE,
    referenceTextEs: NOUNS_REFERENCE_SENTENCE_ES,
    referenceHighlights: NOUNS_HIGHLIGHTS,
    dialogueLines: [
      {
        textEn: 'I took a lot of pictures at the party last night. Now I need to buy ________ more film for my camera.',
        textEs: 'Tomé muchas fotos en la fiesta anoche. Ahora necesito comprar más rollo para mi cámara.',
        hasBlank: true,
        prefix: 'I took a lot of pictures at the party last night. Now I need to buy ',
        prefixEs: 'Tomé muchas fotos en la fiesta anoche. Ahora necesito comprar ',
        suffix: ' more film for my camera.',
        suffixEs: ' más rollo para mi cámara.',
      },
    ],
    options: [
      { id: 'opt-many', text: 'many', isCorrect: false },
      { id: 'opt-some', text: 'some', isCorrect: true },
      { id: 'opt-any', text: 'any', isCorrect: false },
      { id: 'opt-a-few', text: 'a few', isCorrect: false },
    ],
    correctAnswerId: 'opt-some',
    explanation:
      '"Film" (camera film) is a non-count noun. In affirmative statements, we say "some more film".',
    explanationEs:
      '"Film" (rollo fotográfico) es un sustantivo incontable. En oraciones afirmativas decimos "some more film".',
  },

  /* Actividad 11 (actividad 11.png) */
  {
    id: 'nouns-ex-11',
    type: 'drag-drop-sentence',
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    audioPrompt: "There was a lot of food at the party, but there wasn't any beer.",
    durationSeconds: 8,
    imageUrl: nounsSugarCoffeeImg,
    referenceText: NOUNS_REFERENCE_SENTENCE,
    referenceTextEs: NOUNS_REFERENCE_SENTENCE_ES,
    referenceHighlights: NOUNS_HIGHLIGHTS,
    dialogueLines: [
      {
        textEn: "There was ________ food at the party, but there wasn't any beer.",
        textEs: 'Había mucha comida en la fiesta, pero no había cerveza.',
        hasBlank: true,
        prefix: 'There was ',
        prefixEs: 'Había ',
        suffix: " food at the party, but there wasn't any beer.",
        suffixEs: ' comida en la fiesta, pero no había cerveza.',
      },
    ],
    options: [
      { id: 'opt-a-few', text: 'a few', isCorrect: false },
      { id: 'opt-some-of', text: 'some of', isCorrect: false },
      { id: 'opt-any', text: 'any', isCorrect: false },
      { id: 'opt-a-lot-of', text: 'a lot of', isCorrect: true },
    ],
    correctAnswerId: 'opt-a-lot-of',
    explanation:
      '"Food" is non-count. We use "a lot of" to indicate a large amount in affirmative statements: "There was a lot of food...".',
    explanationEs:
      '"Food" (comida) es incontable. Usamos "a lot of" para indicar gran cantidad en afirmaciones: "There was a lot of food at the party...".',
  },

  /* Actividad 12: Unit Test con 5 tests (test 1 a test 5) */
  {
    id: 'nouns-unit-test',
    type: 'unit-test',
    title: 'Unit Test',
    titleEs: 'Examen de la Unidad',
    subtitle: 'Section 4: Nouns: Non-Count and Quantifiers · 5 Test Questions',
    subtitleEs: 'Sección 4: Sustantivos No Contables y Cuantificadores · 5 Preguntas de Examen',
    description: 'Listen and complete each sentence by dragging or selecting the correct non-count quantifier.',
    descriptionEs: 'Escucha y completa cada oración arrastrando o seleccionando el cuantificador correcto.',
    totalQuestions: 5,
    audioPrompt:
      '- How much sugar do you want in your coffee? - Not much, just a little. - What about milk? - Oh, lots of milk please.',
    imageUrl: nounsSugarCoffeeImg,
    referenceText: NOUNS_REFERENCE_SENTENCE,
    referenceTextEs: NOUNS_REFERENCE_SENTENCE_ES,
    referenceHighlights: NOUNS_HIGHLIGHTS,
    questions: [
      /* Test 1 (test 1.png) */
      {
        id: 'nouns-test-1',
        number: 1,
        type: 'drag-drop',
        instructions: 'Drag the correct answer/s into place.',
        instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
        question: '- How ________ housework do you have to do this weekend?\n- I just have to clean my room and the family room.',
        questionEs: '- ¿Cuánto trabajo del hogar tienes que hacer este fin de semana?\n- Solo tengo que limpiar mi habitación y la sala de estar.',
        audioPrompt: '- How much housework do you have to do this weekend? - I just have to clean my room and the family room.',
        durationSeconds: 8,
        imageUrl: nounsSugarCoffeeImg,
        referenceText: NOUNS_REFERENCE_SENTENCE,
        referenceTextEs: NOUNS_REFERENCE_SENTENCE_ES,
        referenceHighlights: NOUNS_HIGHLIGHTS,
        sentencePrefix: '- How',
        sentencePrefixEs: '- ¿Cuánto',
        sentenceSuffix: 'housework do you have to do this weekend?\n- I just have to clean my room and the family room.',
        sentenceSuffixEs: 'trabajo del hogar tienes que hacer este fin de semana?\n- Solo tengo que limpiar mi habitación y la sala de estar.',
        dialogueLines: [
          {
            textEn: '- How ________ housework do you have to do this weekend?',
            textEs: '- ¿Cuánto trabajo del hogar tienes que hacer este fin de semana?',
            hasBlank: true,
            prefix: '- How ',
            prefixEs: '- ¿',
            suffix: ' housework do you have to do this weekend?',
            suffixEs: ' trabajo del hogar tienes que hacer este fin de semana?',
          },
          {
            textEn: '- I just have to clean my room and the family room.',
            textEs: '- Solo tengo que limpiar mi habitación y la sala de estar.',
            hasBlank: false,
          },
        ],
        options: [
          { id: 'test1-opt-some', text: 'some', isCorrect: false },
          { id: 'test1-opt-few', text: 'few', isCorrect: false },
          { id: 'test1-opt-many', text: 'many', isCorrect: false },
          { id: 'test1-opt-much', text: 'much', isCorrect: true },
        ],
        correctAnswerId: 'test1-opt-much',
        explanation: '"Housework" is a non-count noun, so we ask "How much housework...".',
        explanationEs: '"Housework" (trabajos del hogar) es un sustantivo incontable, por lo que preguntamos "How much housework...".',
      },

      /* Test 2 (test 2.png) */
      {
        id: 'nouns-test-2',
        number: 2,
        type: 'drag-drop',
        instructions: 'Drag the correct answer/s into place.',
        instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
        question: "Mary drinks ________ coffee. I don't know how she sleeps at night.",
        questionEs: 'Mary bebe mucho café. No sé cómo duerme por la noche.',
        audioPrompt: "Mary drinks a lot of coffee. I don't know how she sleeps at night.",
        durationSeconds: 8,
        imageUrl: nounsSugarCoffeeImg,
        referenceText: NOUNS_REFERENCE_SENTENCE,
        referenceTextEs: NOUNS_REFERENCE_SENTENCE_ES,
        referenceHighlights: NOUNS_HIGHLIGHTS,
        sentencePrefix: 'Mary drinks',
        sentencePrefixEs: 'Mary bebe',
        sentenceSuffix: "coffee. I don't know how she sleeps at night.",
        sentenceSuffixEs: 'café. No sé cómo duerme por la noche.',
        dialogueLines: [
          {
            textEn: "Mary drinks ________ coffee. I don't know how she sleeps at night.",
            textEs: 'Mary bebe mucho café. No sé cómo duerme por la noche.',
            hasBlank: true,
            prefix: 'Mary drinks ',
            prefixEs: 'Mary bebe ',
            suffix: " coffee. I don't know how she sleeps at night.",
            suffixEs: ' café. No sé cómo duerme por la noche.',
          },
        ],
        options: [
          { id: 'test2-opt-a-few', text: 'a few', isCorrect: false },
          { id: 'test2-opt-any', text: 'any', isCorrect: false },
          { id: 'test2-opt-many', text: 'many', isCorrect: false },
          { id: 'test2-opt-a-lot-of', text: 'a lot of', isCorrect: true },
        ],
        correctAnswerId: 'test2-opt-a-lot-of',
        explanation: '"Coffee" is a non-count noun. We use "a lot of coffee" to express a large quantity.',
        explanationEs: '"Coffee" (café) es incontable. Usamos "a lot of coffee" para expresar una gran cantidad.',
      },

      /* Test 3 (test 3.png) */
      {
        id: 'nouns-test-3',
        number: 3,
        type: 'drag-drop',
        instructions: 'Drag the correct answer/s into place.',
        instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
        question: '- Why did you get here late?\n- ________ traffic.',
        questionEs: '- ¿Por qué llegaste tarde?\n- Había mucho tráfico.',
        audioPrompt: '- Why did you get here late? - There was a lot of traffic.',
        durationSeconds: 8,
        imageUrl: nounsSugarCoffeeImg,
        referenceText: NOUNS_REFERENCE_SENTENCE,
        referenceTextEs: NOUNS_REFERENCE_SENTENCE_ES,
        referenceHighlights: NOUNS_HIGHLIGHTS,
        sentencePrefix: '- Why did you get here late?\n-',
        sentencePrefixEs: '- ¿Por qué llegaste tarde?\n-',
        sentenceSuffix: 'traffic.',
        sentenceSuffixEs: 'tráfico.',
        dialogueLines: [
          {
            textEn: '- Why did you get here late?',
            textEs: '- ¿Por qué llegaste tarde?',
            hasBlank: false,
          },
          {
            textEn: '- ________ traffic.',
            textEs: '- Había mucho tráfico.',
            hasBlank: true,
            prefix: '- ',
            prefixEs: '- ',
            suffix: ' traffic.',
            suffixEs: ' tráfico.',
          },
        ],
        options: [
          { id: 'test3-opt-1', text: 'There were a lot of', isCorrect: false },
          { id: 'test3-opt-2', text: "There wasn't any", isCorrect: false },
          { id: 'test3-opt-3', text: 'There were many', isCorrect: false },
          { id: 'test3-opt-4', text: 'There was a lot of', isCorrect: true },
        ],
        correctAnswerId: 'test3-opt-4',
        explanation: '"Traffic" is a singular non-count noun. In past affirmative, we say "There was a lot of traffic."',
        explanationEs: '"Traffic" (tráfico) es un sustantivo incontable singular. En pasado afirmativo decimos "There was a lot of traffic."',
      },

      /* Test 4 (test 4.png) */
      {
        id: 'nouns-test-4',
        number: 4,
        type: 'drag-drop',
        instructions: 'Drag the correct answer/s into place.',
        instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
        question: '- Mary moved into a new apartment.\n- I know. She bought ________ new furniture last month.',
        questionEs: '- Mary se mudó a un nuevo apartamento.\n- Lo sé. Compró muchos muebles nuevos el mes pasado.',
        audioPrompt: '- Mary moved into a new apartment. - I know. She bought a lot of new furniture last month.',
        durationSeconds: 8,
        imageUrl: nounsSugarCoffeeImg,
        referenceText: NOUNS_REFERENCE_SENTENCE,
        referenceTextEs: NOUNS_REFERENCE_SENTENCE_ES,
        referenceHighlights: NOUNS_HIGHLIGHTS,
        sentencePrefix: '- Mary moved into a new apartment.\n- I know. She bought',
        sentencePrefixEs: '- Mary se mudó a un nuevo apartamento.\n- Lo sé. Ella compró',
        sentenceSuffix: 'new furniture last month.',
        sentenceSuffixEs: 'muebles nuevos el mes pasado.',
        dialogueLines: [
          {
            textEn: '- Mary moved into a new apartment.',
            textEs: '- Mary se mudó a un nuevo apartamento.',
            hasBlank: false,
          },
          {
            textEn: '- I know. She bought ________ new furniture last month.',
            textEs: '- Lo sé. Compró muchos muebles nuevos el mes pasado.',
            hasBlank: true,
            prefix: '- I know. She bought ',
            prefixEs: '- Lo sé. Ella compró ',
            suffix: ' new furniture last month.',
            suffixEs: ' muebles nuevos el mes pasado.',
          },
        ],
        options: [
          { id: 'test4-opt-a-lot-of', text: 'a lot of', isCorrect: true },
          { id: 'test4-opt-a-few', text: 'a few', isCorrect: false },
          { id: 'test4-opt-any', text: 'any', isCorrect: false },
          { id: 'test4-opt-many', text: 'many', isCorrect: false },
        ],
        correctAnswerId: 'test4-opt-a-lot-of',
        explanation: '"Furniture" is a non-count noun. We use "a lot of" for a large amount: "She bought a lot of new furniture...".',
        explanationEs: '"Furniture" (muebles) es incontable. Usamos "a lot of" para gran cantidad: "She bought a lot of new furniture...".',
      },

      /* Test 5 (test 5.png) */
      {
        id: 'nouns-test-5',
        number: 5,
        type: 'drag-drop',
        instructions: 'Drag the correct answer/s into place.',
        instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
        question: '- ________ time do we have before the train leaves?\n- We have about fifteen minutes.',
        questionEs: '- ¿Cuánto tiempo tenemos antes de que salga el tren?\n- Tenemos unos quince minutos.',
        audioPrompt: '- How much time do we have before the train leaves? - We have about fifteen minutes.',
        durationSeconds: 8,
        imageUrl: nounsSugarCoffeeImg,
        referenceText: NOUNS_REFERENCE_SENTENCE,
        referenceTextEs: NOUNS_REFERENCE_SENTENCE_ES,
        referenceHighlights: NOUNS_HIGHLIGHTS,
        sentencePrefix: '-',
        sentencePrefixEs: '- ¿',
        sentenceSuffix: 'time do we have before the train leaves?\n- We have about fifteen minutes.',
        sentenceSuffixEs: 'tiempo tenemos antes de que salga el tren?\n- Tenemos unos quince minutos.',
        dialogueLines: [
          {
            textEn: '- ________ time do we have before the train leaves?',
            textEs: '- ¿Cuánto tiempo tenemos antes de que salga el tren?',
            hasBlank: true,
            prefix: '- ',
            prefixEs: '- ¿',
            suffix: ' time do we have before the train leaves?',
            suffixEs: ' tiempo tenemos antes de que salga el tren?',
          },
          {
            textEn: '- We have about fifteen minutes.',
            textEs: '- Tenemos unos quince minutos.',
            hasBlank: false,
          },
        ],
        options: [
          { id: 'test5-opt-how-long', text: 'How long', isCorrect: false },
          { id: 'test5-opt-how-few', text: 'How few', isCorrect: false },
          { id: 'test5-opt-how-much', text: 'How much', isCorrect: true },
          { id: 'test5-opt-how-many', text: 'How many', isCorrect: false },
        ],
        correctAnswerId: 'test5-opt-how-much',
        explanation: '"Time" (amount of minutes/hours) is non-count: "How much time do we have before the train leaves?".',
        explanationEs: '"Time" (tiempo disponible) es incontable: "How much time do we have before the train leaves?".',
      },
    ],
  },
];
