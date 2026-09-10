import {
  LessonText,
  LessonSentence,
  DialogueLine,
  DragDropSentenceExercise,
  UnitTestExercise,
} from '../types';
import countNounsWorkersImg from '../assets/images/count_nouns_workers_1788997354267.jpg';

export { countNounsWorkersImg };

export const COUNT_NON_COUNT_SENTENCES: LessonSentence[] = [
  {
    en: '- Are there any small nails down there, Harry?',
    es: '- ¿Hay algún clavo pequeño allí abajo, Harry?',
  },
  {
    en: "- Sorry, there aren't any, but I have some big nails. Is that OK?",
    es: '- Lo siento, no hay ninguno, pero tengo algunos clavos grandes. ¿Está bien?',
  },
];

export const COUNT_NON_COUNT_DIALOGUE: DialogueLine[] = [
  {
    speaker: 'Worker 1',
    textEn: '- Are there any small nails down there, Harry?',
    textEs: '- ¿Hay algún clavo pequeño allí abajo, Harry?',
    avatarColor: 'bg-emerald-600',
  },
  {
    speaker: 'Worker 2',
    textEn: "- Sorry, there aren't any, but I have some big nails. Is that OK?",
    textEs: '- Lo siento, no hay ninguno, pero tengo algunos clavos grandes. ¿Está bien?',
    avatarColor: 'bg-amber-600',
  },
];

export const COUNT_NON_COUNT_REFERENCE_SENTENCE =
  "- Are there any small nails down there, Harry?\n- Sorry, there aren't any, but I have some big nails. Is that OK?";
export const COUNT_NON_COUNT_REFERENCE_SENTENCE_ES =
  "- ¿Hay algún clavo pequeño allí abajo, Harry?\n- Lo siento, no hay ninguno, pero tengo algunos clavos grandes. ¿Está bien?";
export const COUNT_NON_COUNT_HIGHLIGHTS = ['Are there', 'any', "aren't", 'some'];

export const COUNT_NON_COUNT_LESSON_TEXT: LessonText = {
  title: 'Lesson 5: Count and Non-Count Nouns',
  stepTitle: 'Step 1: Explore',
  audioText:
    "Are there any small nails down there, Harry? Sorry, there aren't any, but I have some big nails. Is that OK?",
  textEn:
    "- Are there any small nails down there, Harry?\n- Sorry, there aren't any, but I have some big nails. Is that OK?",
  textEs:
    "- ¿Hay algún clavo pequeño allí abajo, Harry?\n- Lo siento, no hay ninguno, pero tengo algunos clavos grandes. ¿Está bien?",
  imageSrc: countNounsWorkersImg,
  durationSeconds: 7,
  sentences: COUNT_NON_COUNT_SENTENCES,
  practiceInstructions: 'Lee y escucha el diálogo sobre sustantivos contables e incontables.',
};

export const COUNT_NON_COUNT_EXERCISES: (DragDropSentenceExercise | UnitTestExercise)[] = [
  /* Actividad 2 (actividad 2.png) */
  {
    id: 'count-nouns-ex-2',
    type: 'drag-drop-sentence',
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    audioPrompt: "There weren't many people at the game; it was too cold.",
    durationSeconds: 7,
    imageUrl: countNounsWorkersImg,
    referenceText: COUNT_NON_COUNT_REFERENCE_SENTENCE,
    referenceTextEs: COUNT_NON_COUNT_REFERENCE_SENTENCE_ES,
    referenceHighlights: COUNT_NON_COUNT_HIGHLIGHTS,
    dialogueLines: [
      {
        textEn: 'There _________ people at the game; it was too cold.',
        textEs: 'No había mucha gente en el partido; hacía demasiado frío.',
        hasBlank: true,
        prefix: 'There ',
        prefixEs: 'No había ',
        suffix: ' people at the game; it was too cold.',
        suffixEs: ' gente en el partido; hacía demasiado frío.',
      },
    ],
    options: [
      { id: 'opt-c2-wasntmuch', text: "wasn't much", isCorrect: false },
      { id: 'opt-c2-werentmuch', text: "weren't much", isCorrect: false },
      { id: 'opt-c2-werentmany', text: "weren't many", isCorrect: true },
    ],
    correctAnswerId: 'opt-c2-werentmany',
    explanation:
      '"People" is a plural count noun, so we use the plural negative verb with "many": "weren\'t many".',
    explanationEs:
      '"People" es un sustantivo contable plural, por lo que usamos el verbo plural negativo con "many": "weren\'t many".',
  },

  /* Actividad 3 (actividad 3.png) */
  {
    id: 'count-nouns-ex-3',
    type: 'drag-drop-sentence',
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    audioPrompt: 'Nancy bought her CD player last week. She only has a few CDs.',
    durationSeconds: 7,
    imageUrl: countNounsWorkersImg,
    referenceText: COUNT_NON_COUNT_REFERENCE_SENTENCE,
    referenceTextEs: COUNT_NON_COUNT_REFERENCE_SENTENCE_ES,
    referenceHighlights: COUNT_NON_COUNT_HIGHLIGHTS,
    dialogueLines: [
      {
        textEn: 'Nancy bought her CD player last week. She only has _________ CDs.',
        textEs: 'Nancy compró su reproductor de CD la semana pasada. Solo tiene unos pocos CDs.',
        hasBlank: true,
        prefix: 'Nancy bought her CD player last week. She only has ',
        prefixEs: 'Nancy compró su reproductor de CD la semana pasada. Solo tiene ',
        suffix: ' CDs.',
        suffixEs: ' CDs.',
      },
    ],
    options: [
      { id: 'opt-c3-alittle', text: 'a little', isCorrect: false },
      { id: 'opt-c3-afew', text: 'a few', isCorrect: true },
      { id: 'opt-c3-many', text: 'many', isCorrect: false },
      { id: 'opt-c3-any', text: 'any', isCorrect: false },
    ],
    correctAnswerId: 'opt-c3-afew',
    explanation:
      'We use "a few" with plural count nouns ("CDs") to express a small number.',
    explanationEs:
      'Usamos "a few" con sustantivos contables en plural ("CDs") para expresar una pequeña cantidad.',
  },

  /* Actividad 4 (actividad 4.png) */
  {
    id: 'count-nouns-ex-4',
    type: 'drag-drop-sentence',
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    audioPrompt: 'I saw some nice sweaters at the store, but they were very expensive.',
    durationSeconds: 7,
    imageUrl: countNounsWorkersImg,
    referenceText: COUNT_NON_COUNT_REFERENCE_SENTENCE,
    referenceTextEs: COUNT_NON_COUNT_REFERENCE_SENTENCE_ES,
    referenceHighlights: COUNT_NON_COUNT_HIGHLIGHTS,
    dialogueLines: [
      {
        textEn: 'I saw _________ nice sweaters at the store, but they were very expensive.',
        textEs: 'Vi algunos suéteres bonitos en la tienda, pero eran muy caros.',
        hasBlank: true,
        prefix: 'I saw ',
        prefixEs: 'Vi ',
        suffix: ' nice sweaters at the store, but they were very expensive.',
        suffixEs: ' suéteres bonitos en la tienda, pero eran muy caros.',
      },
    ],
    options: [
      { id: 'opt-c4-any', text: 'any', isCorrect: false },
      { id: 'opt-c4-alot', text: 'a lot', isCorrect: false },
      { id: 'opt-c4-alittle', text: 'a little', isCorrect: false },
      { id: 'opt-c4-some', text: 'some', isCorrect: true },
    ],
    correctAnswerId: 'opt-c4-some',
    explanation:
      'In affirmative statements with plural count nouns ("sweaters"), we use "some".',
    explanationEs:
      'En oraciones afirmativas con sustantivos contables en plural ("sweaters"), usamos "some".',
  },

  /* Actividad 5 (actividad 5.png) */
  {
    id: 'count-nouns-ex-5',
    type: 'drag-drop-sentence',
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    audioPrompt:
      '- Can I talk to you, Mrs. Davis? I have a few questions about our history assignment. - Of course, David. What do you want to know?',
    durationSeconds: 7,
    imageUrl: countNounsWorkersImg,
    referenceText: COUNT_NON_COUNT_REFERENCE_SENTENCE,
    referenceTextEs: COUNT_NON_COUNT_REFERENCE_SENTENCE_ES,
    referenceHighlights: COUNT_NON_COUNT_HIGHLIGHTS,
    dialogueLines: [
      {
        textEn: '- Can I talk to you, Mrs. Davis? I have _________ questions about our history assignment.',
        textEs: '- ¿Puedo hablar con usted, Sra. Davis? Tengo unas pocas preguntas sobre nuestra tarea de historia.',
        hasBlank: true,
        prefix: '- Can I talk to you, Mrs. Davis? I have ',
        prefixEs: '- ¿Puedo hablar con usted, Sra. Davis? Tengo ',
        suffix: ' questions about our history assignment.',
        suffixEs: ' preguntas sobre nuestra tarea de historia.',
      },
      {
        textEn: '- Of course, David. What do you want to know?',
        textEs: '- Por supuesto, David. ¿Qué quieres saber?',
        hasBlank: false,
      },
    ],
    options: [
      { id: 'opt-c5-any', text: 'any', isCorrect: false },
      { id: 'opt-c5-alittle', text: 'a little', isCorrect: false },
      { id: 'opt-c5-much', text: 'much', isCorrect: false },
      { id: 'opt-c5-afew', text: 'a few', isCorrect: true },
    ],
    correctAnswerId: 'opt-c5-afew',
    explanation:
      '"Questions" is a plural count noun, so we use "a few" to mean a small number of questions.',
    explanationEs:
      '"Questions" es un sustantivo contable en plural, por lo que usamos "a few" para referirnos a unas pocas preguntas.',
  },

  /* Actividad 6 (actividad 6.png) */
  {
    id: 'count-nouns-ex-6',
    type: 'drag-drop-sentence',
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    audioPrompt: 'The weather is nice, so there are a lot of children in the park today.',
    durationSeconds: 7,
    imageUrl: countNounsWorkersImg,
    referenceText: COUNT_NON_COUNT_REFERENCE_SENTENCE,
    referenceTextEs: COUNT_NON_COUNT_REFERENCE_SENTENCE_ES,
    referenceHighlights: COUNT_NON_COUNT_HIGHLIGHTS,
    dialogueLines: [
      {
        textEn: 'The weather is nice, so there _________ children in the park today.',
        textEs: 'El clima es agradable, así que hay muchos niños en el parque hoy.',
        hasBlank: true,
        prefix: 'The weather is nice, so there ',
        prefixEs: 'El clima es agradable, así que ',
        suffix: ' children in the park today.',
        suffixEs: ' niños en el parque hoy.',
      },
    ],
    options: [
      { id: 'opt-c6-aremuch', text: 'are much', isCorrect: false },
      { id: 'opt-c6-isalotof', text: 'is a lot of', isCorrect: false },
      { id: 'opt-c6-ismuch', text: 'is much', isCorrect: false },
      { id: 'opt-c6-arealotof', text: 'are a lot of', isCorrect: true },
    ],
    correctAnswerId: 'opt-c6-arealotof',
    explanation:
      '"Children" is a plural count noun, so we require the plural verb "are" with "a lot of": "are a lot of".',
    explanationEs:
      '"Children" es un sustantivo contable plural, por lo que necesitamos el verbo plural "are" con "a lot of": "are a lot of".',
  },

  /* Actividad 7 (actividad 7.png) */
  {
    id: 'count-nouns-ex-7',
    type: 'drag-drop-sentence',
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    audioPrompt: 'The boss has to make some phone calls, but she can meet with you in an hour.',
    durationSeconds: 7,
    imageUrl: countNounsWorkersImg,
    referenceText: COUNT_NON_COUNT_REFERENCE_SENTENCE,
    referenceTextEs: COUNT_NON_COUNT_REFERENCE_SENTENCE_ES,
    referenceHighlights: COUNT_NON_COUNT_HIGHLIGHTS,
    dialogueLines: [
      {
        textEn: 'The boss has to make _________ phone calls, but she can meet with you in an hour.',
        textEs: 'La jefa tiene que hacer algunas llamadas telefónicas, pero puede reunirse contigo en una hora.',
        hasBlank: true,
        prefix: 'The boss has to make ',
        prefixEs: 'La jefa tiene que hacer ',
        suffix: ' phone calls, but she can meet with you in an hour.',
        suffixEs: ' llamadas telefónicas, pero puede reunirse contigo en una hora.',
      },
    ],
    options: [
      { id: 'opt-c7-some', text: 'some', isCorrect: true },
      { id: 'opt-c7-few', text: 'few', isCorrect: false },
      { id: 'opt-c7-any', text: 'any', isCorrect: false },
      { id: 'opt-c7-little', text: 'little', isCorrect: false },
    ],
    correctAnswerId: 'opt-c7-some',
    explanation:
      'We use "some" with plural count nouns in affirmative sentences: "some phone calls".',
    explanationEs:
      'Usamos "some" con sustantivos contables plurales en oraciones afirmativas: "some phone calls".',
  },

  /* Actividad 8 (actividad 8.png) */
  {
    id: 'count-nouns-ex-8',
    type: 'drag-drop-sentence',
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    audioPrompt: 'This is a busy street. There are many accidents here.',
    durationSeconds: 7,
    imageUrl: countNounsWorkersImg,
    referenceText: COUNT_NON_COUNT_REFERENCE_SENTENCE,
    referenceTextEs: COUNT_NON_COUNT_REFERENCE_SENTENCE_ES,
    referenceHighlights: COUNT_NON_COUNT_HIGHLIGHTS,
    dialogueLines: [
      {
        textEn: 'This is a busy street. There are _________ accidents here.',
        textEs: 'Esta es una calle concurrida. Hay muchos accidentes aquí.',
        hasBlank: true,
        prefix: 'This is a busy street. There are ',
        prefixEs: 'Esta es una calle concurrida. Hay ',
        suffix: ' accidents here.',
        suffixEs: ' accidentes aquí.',
      },
    ],
    options: [
      { id: 'opt-c8-much', text: 'much', isCorrect: false },
      { id: 'opt-c8-alittle', text: 'a little', isCorrect: false },
      { id: 'opt-c8-many', text: 'many', isCorrect: true },
    ],
    correctAnswerId: 'opt-c8-many',
    explanation:
      '"Accidents" is a plural count noun, so we use "many" to indicate a large number.',
    explanationEs:
      '"Accidents" es un sustantivo contable plural, por lo que usamos "many" para indicar un gran número.',
  },

  /* Actividad 9 (actividad 9.png) */
  {
    id: 'count-nouns-ex-9',
    type: 'drag-drop-sentence',
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    audioPrompt: 'My grandmother is very interesting. She tells many great stories.',
    durationSeconds: 7,
    imageUrl: countNounsWorkersImg,
    referenceText: COUNT_NON_COUNT_REFERENCE_SENTENCE,
    referenceTextEs: COUNT_NON_COUNT_REFERENCE_SENTENCE_ES,
    referenceHighlights: COUNT_NON_COUNT_HIGHLIGHTS,
    dialogueLines: [
      {
        textEn: 'My grandmother is very interesting. She tells _________ great stories.',
        textEs: 'Mi abuela es muy interesante. Ella cuenta muchas historias geniales.',
        hasBlank: true,
        prefix: 'My grandmother is very interesting. She tells ',
        prefixEs: 'Mi abuela es muy interesante. Ella cuenta ',
        suffix: ' great stories.',
        suffixEs: ' historias geniales.',
      },
    ],
    options: [
      { id: 'opt-c9-alot', text: 'a lot', isCorrect: false },
      { id: 'opt-c9-much', text: 'much', isCorrect: false },
      { id: 'opt-c9-any', text: 'any', isCorrect: false },
      { id: 'opt-c9-many', text: 'many', isCorrect: true },
    ],
    correctAnswerId: 'opt-c9-many',
    explanation:
      'Before a plural noun ("great stories"), "many" is used without "of" ("a lot" requires "of").',
    explanationEs:
      'Antes de un sustantivo plural ("great stories"), se usa "many" sin "of" ("a lot" requeriría "of").',
  },

  /* Actividad 10 (actividad 10.png) */
  {
    id: 'count-nouns-ex-10',
    type: 'drag-drop-sentence',
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    audioPrompt: "I really enjoy Shakespeare's plays. We read a few of them in school last year.",
    durationSeconds: 7,
    imageUrl: countNounsWorkersImg,
    referenceText: COUNT_NON_COUNT_REFERENCE_SENTENCE,
    referenceTextEs: COUNT_NON_COUNT_REFERENCE_SENTENCE_ES,
    referenceHighlights: COUNT_NON_COUNT_HIGHLIGHTS,
    dialogueLines: [
      {
        textEn: "I really enjoy Shakespeare's plays. We read _________ of them in school last year.",
        textEs: 'Realmente disfruto de las obras de Shakespeare. Leímos algunas de ellas en la escuela el año pasado.',
        hasBlank: true,
        prefix: "I really enjoy Shakespeare's plays. We read ",
        prefixEs: 'Realmente disfruto de las obras de Shakespeare. Leímos ',
        suffix: ' of them in school last year.',
        suffixEs: ' de ellas en la escuela el año pasado.',
      },
    ],
    options: [
      { id: 'opt-c10-much', text: 'much', isCorrect: false },
      { id: 'opt-c10-none', text: 'none', isCorrect: false },
      { id: 'opt-c10-any', text: 'any', isCorrect: false },
      { id: 'opt-c10-afew', text: 'a few', isCorrect: true },
    ],
    correctAnswerId: 'opt-c10-afew',
    explanation:
      'We use "a few of them" when referring to a small number of plural countable items (plays).',
    explanationEs:
      'Usamos "a few of them" al referirnos a un pequeño número de elementos contables en plural (obras de teatro).',
  },

  /* Actividad 11 (actividad 11.png) */
  {
    id: 'count-nouns-ex-11',
    type: 'drag-drop-sentence',
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    audioPrompt: '- How many Mick Starlight CDs do you have? - Oh, I have about five or six.',
    durationSeconds: 7,
    imageUrl: countNounsWorkersImg,
    referenceText: COUNT_NON_COUNT_REFERENCE_SENTENCE,
    referenceTextEs: COUNT_NON_COUNT_REFERENCE_SENTENCE_ES,
    referenceHighlights: COUNT_NON_COUNT_HIGHLIGHTS,
    dialogueLines: [
      {
        textEn: '- _________ Mick Starlight CDs do you have?',
        textEs: '- ¿Cuántos CDs de Mick Starlight tienes?',
        hasBlank: true,
        prefix: '- ',
        prefixEs: '- ¿',
        suffix: ' Mick Starlight CDs do you have?',
        suffixEs: ' CDs de Mick Starlight tienes?',
      },
      {
        textEn: '- Oh, I have about five or six.',
        textEs: '- Oh, tengo alrededor de cinco o seis.',
        hasBlank: false,
      },
    ],
    options: [
      { id: 'opt-c11-howmuch', text: 'How much', isCorrect: false },
      { id: 'opt-c11-howbig', text: 'How big', isCorrect: false },
      { id: 'opt-c11-howmany', text: 'How many', isCorrect: true },
    ],
    correctAnswerId: 'opt-c11-howmany',
    explanation:
      'We ask "How many" with plural count nouns like "CDs" to inquire about quantity.',
    explanationEs:
      'Preguntamos "How many" con sustantivos contables en plural como "CDs" para preguntar sobre la cantidad.',
  },

  /* Actividad 12: Test con 5 preguntas en orden (test 1 a 5) */
  {
    id: 'count-nouns-ex-12',
    type: 'unit-test',
    title: 'Unit 2 · Section 5 Test: Count and Non-Count Nouns',
    titleEs: 'Unidad 2 · Test de la Sección 5: Count and Non-Count Nouns',
    description: 'Complete all 5 test questions about Count and Non-Count Nouns.',
    descriptionEs: 'Completa las 5 preguntas del test sobre sustantivos contables e incontables.',
    totalQuestions: 5,
    referenceText: COUNT_NON_COUNT_REFERENCE_SENTENCE,
    referenceTextEs: COUNT_NON_COUNT_REFERENCE_SENTENCE_ES,
    referenceHighlights: COUNT_NON_COUNT_HIGHLIGHTS,
    imageUrl: countNounsWorkersImg,
    questions: [
      /* Test 1 (test 1.png) */
      {
        id: 'cnt-t1',
        number: 1,
        type: 'drag-drop',
        instructions: 'Drag the correct answer/s into place.',
        instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
        question:
          'There _________ tickets for the Mick Starlight concert tomorrow. I really wanted to go.',
        questionEs:
          'No había ninguna entrada para el concierto de Mick Starlight mañana. Realmente quería ir.',
        sentencePrefix: 'There ',
        sentencePrefixEs: 'No había ',
        sentenceSuffix:
          ' tickets for the Mick Starlight concert tomorrow. I really wanted to go.',
        sentenceSuffixEs:
          ' entrada para el concierto de Mick Starlight mañana. Realmente quería ir.',
        options: [
          { id: 'opt-t1-werentany', text: "weren't any", isCorrect: true },
          { id: 'opt-t1-wasntany', text: "wasn't any", isCorrect: false },
          { id: 'opt-t1-wasntmuch', text: "wasn't much", isCorrect: false },
        ],
        correctAnswerId: 'opt-t1-werentany',
        explanation:
          '"Tickets" is a plural count noun, so we use the plural negative past verb "weren\'t" with "any": "weren\'t any".',
        explanationEs:
          '"Tickets" es contable en plural, por lo que usamos el pasado negativo plural "weren\'t" con "any": "weren\'t any".',
        audioPrompt:
          "There weren't any tickets for the Mick Starlight concert tomorrow. I really wanted to go.",
        imageUrl: countNounsWorkersImg,
        referenceText: COUNT_NON_COUNT_REFERENCE_SENTENCE,
        referenceTextEs: COUNT_NON_COUNT_REFERENCE_SENTENCE_ES,
        referenceHighlights: COUNT_NON_COUNT_HIGHLIGHTS,
      },

      /* Test 2 (test 2.png) */
      {
        id: 'cnt-t2',
        number: 2,
        type: 'drag-drop',
        instructions: 'Drag the correct answer/s into place.',
        instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
        question:
          'Betty loves to play the piano. She plays _________ hours every week.',
        questionEs:
          'A Betty le encanta tocar el piano. Toca muchas horas cada semana.',
        sentencePrefix: 'Betty loves to play the piano. She plays ',
        sentencePrefixEs: 'A Betty le encanta tocar el piano. Toca ',
        sentenceSuffix: ' hours every week.',
        sentenceSuffixEs: ' horas cada semana.',
        options: [
          { id: 'opt-t2-many', text: 'many', isCorrect: true },
          { id: 'opt-t2-any', text: 'any', isCorrect: false },
          { id: 'opt-t2-much', text: 'much', isCorrect: false },
          { id: 'opt-t2-little', text: 'little', isCorrect: false },
        ],
        correctAnswerId: 'opt-t2-many',
        explanation:
          '"Hours" is a plural count noun, so we use "many" to express a large amount of hours.',
        explanationEs:
          '"Hours" es un sustantivo contable en plural, por lo que usamos "many" para expresar una gran cantidad de horas.',
        audioPrompt:
          'Betty loves to play the piano. She plays many hours every week.',
        imageUrl: countNounsWorkersImg,
        referenceText: COUNT_NON_COUNT_REFERENCE_SENTENCE,
        referenceTextEs: COUNT_NON_COUNT_REFERENCE_SENTENCE_ES,
        referenceHighlights: COUNT_NON_COUNT_HIGHLIGHTS,
      },

      /* Test 3 (test 3.png) */
      {
        id: 'cnt-t3',
        number: 3,
        type: 'dropdown',
        instructions: 'Select the correct answer from the drop-down list.',
        instructionsEs: 'Selecciona la respuesta correcta de la lista desplegable.',
        question:
          '- Do you sell apples?\n- Yes. How many do you want?',
        questionEs:
          '- ¿Venden manzanas?\n- Sí. ¿Cuántas quiere?',
        sentencePrefix: '- Do you sell apples?\n- Yes. ',
        sentencePrefixEs: '- ¿Venden manzanas?\n- Sí. ',
        sentenceSuffix: '',
        sentenceSuffixEs: '',
        dialogueLines: [
          {
            textEn: '- Do you sell apples?',
            textEs: '- ¿Venden manzanas?',
            hasBlank: false,
          },
          {
            textEn: '- Yes. _________',
            textEs: '- Sí. _________',
            hasBlank: true,
            prefix: '- Yes. ',
            prefixEs: '- Sí. ',
            suffix: '',
            suffixEs: '',
          },
        ],
        options: [
          { id: 'opt-t3-howmany', text: 'How many do you want?', isCorrect: true },
          { id: 'opt-t3-howlittle', text: 'How little do you want?', isCorrect: false },
          { id: 'opt-t3-howmuch', text: 'How much do you want?', isCorrect: false },
          { id: 'opt-t3-howdo', text: 'How do you want?', isCorrect: false },
        ],
        correctAnswerId: 'opt-t3-howmany',
        explanation:
          'Apples are plural count nouns, so the correct question is "How many do you want?".',
        explanationEs:
          'Las manzanas son sustantivos contables en plural, por lo que la pregunta correcta es "¿How many do you want?".',
        audioPrompt: '- Do you sell apples? - Yes. How many do you want?',
        imageUrl: countNounsWorkersImg,
        referenceText: COUNT_NON_COUNT_REFERENCE_SENTENCE,
        referenceTextEs: COUNT_NON_COUNT_REFERENCE_SENTENCE_ES,
        referenceHighlights: COUNT_NON_COUNT_HIGHLIGHTS,
      },

      /* Test 4 (test 4.png) */
      {
        id: 'cnt-t4',
        number: 4,
        type: 'drag-drop',
        instructions: 'Drag the correct answer/s into place.',
        instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
        question:
          "- I'm thirsty. Do you have anything cold to drink?\n- We don't have _________ cans of soda, but there are some bottles of juice.",
        questionEs:
          '- Tengo sed. ¿Tienes algo frío para beber?\n- No tenemos ninguna lata de refresco, pero hay algunas botellas de jugo.',
        sentencePrefix: "- We don't have ",
        sentencePrefixEs: '- No tenemos ',
        sentenceSuffix:
          ' cans of soda, but there are some bottles of juice.',
        sentenceSuffixEs:
          ' lata de refresco, pero hay algunas botellas de jugo.',
        dialogueLines: [
          {
            textEn: "- I'm thirsty. Do you have anything cold to drink?",
            textEs: '- Tengo sed. ¿Tienes algo frío para beber?',
            hasBlank: false,
          },
          {
            textEn:
              "- We don't have _________ cans of soda, but there are some bottles of juice.",
            textEs:
              '- No tenemos ninguna lata de refresco, pero hay algunas botellas de jugo.',
            hasBlank: true,
            prefix: "- We don't have ",
            prefixEs: '- No tenemos ',
            suffix: ' cans of soda, but there are some bottles of juice.',
            suffixEs: ' lata de refresco, pero hay algunas botellas de jugo.',
          },
        ],
        options: [
          { id: 'opt-t4-alittleof', text: 'a little of', isCorrect: false },
          { id: 'opt-t4-manyof', text: 'many of', isCorrect: false },
          { id: 'opt-t4-any', text: 'any', isCorrect: true },
          { id: 'opt-t4-some', text: 'some', isCorrect: false },
        ],
        correctAnswerId: 'opt-t4-any',
        explanation:
          'In negative sentences ("don\'t have"), we use "any" with plural count nouns: "don\'t have any cans of soda".',
        explanationEs:
          'En oraciones negativas ("don\'t have"), usamos "any" con sustantivos contables en plural: "don\'t have any cans of soda".',
        audioPrompt:
          "- I'm thirsty. Do you have anything cold to drink? - We don't have any cans of soda, but there are some bottles of juice.",
        imageUrl: countNounsWorkersImg,
        referenceText: COUNT_NON_COUNT_REFERENCE_SENTENCE,
        referenceTextEs: COUNT_NON_COUNT_REFERENCE_SENTENCE_ES,
        referenceHighlights: COUNT_NON_COUNT_HIGHLIGHTS,
      },

      /* Test 5 (test 5.png) */
      {
        id: 'cnt-t5',
        number: 5,
        type: 'drag-drop',
        instructions: 'Drag the correct answer/s into place.',
        instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
        question:
          "There aren't _________ nice shops near my house. So, to buy a nice gift, I have to go to the mall.",
        questionEs:
          'No hay tiendas bonitas cerca de mi casa. Entonces, para comprar un buen regalo, tengo que ir al centro comercial.',
        sentencePrefix: "There aren't ",
        sentencePrefixEs: 'No hay ',
        sentenceSuffix:
          ' nice shops near my house. So, to buy a nice gift, I have to go to the mall.',
        sentenceSuffixEs:
          ' tiendas bonitas cerca de mi casa. Entonces, para comprar un buen regalo, tengo que ir al centro comercial.',
        options: [
          { id: 'opt-t5-alittleof', text: 'a little of', isCorrect: false },
          { id: 'opt-t5-any', text: 'any', isCorrect: true },
          { id: 'opt-t5-much', text: 'much', isCorrect: false },
          { id: 'opt-t5-manyof', text: 'many of', isCorrect: false },
        ],
        correctAnswerId: 'opt-t5-any',
        explanation:
          'In negative statements ("aren\'t"), we use "any" before plural count nouns: "There aren\'t any nice shops".',
        explanationEs:
          'En oraciones negativas ("aren\'t"), usamos "any" antes de sustantivos contables en plural: "There aren\'t any nice shops".',
        audioPrompt:
          "There aren't any nice shops near my house. So, to buy a nice gift, I have to go to the mall.",
        imageUrl: countNounsWorkersImg,
        referenceText: COUNT_NON_COUNT_REFERENCE_SENTENCE,
        referenceTextEs: COUNT_NON_COUNT_REFERENCE_SENTENCE_ES,
        referenceHighlights: COUNT_NON_COUNT_HIGHLIGHTS,
      },
    ],
  },
];
