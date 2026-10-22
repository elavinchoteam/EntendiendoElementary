import {
  LessonText,
  Exercise,
  UnitTestExercise,
  LessonSentence,
} from '../types';

import doItArticleImg from '../assets/images/do_it_article_card.jpg';

export { doItArticleImg };

export const DO_IT_FULL_TEXT = `I always remember my mother saying, "Wake up. Clean your room. Don't eat candy. Hurry up. Do your homework. Be good. Don't run. Sit down. Stand up. Do this. Do that." I always thought, "Hmm, I like that job."

Five years ago, I started the Clean-House Agency. I put an ad in the newspaper. I answered all the telephone calls and letters, and started my business. I told all the new workers, "Be quick, and be clean." I showed them how to clean homes and offices. First, we all worked together. Now, they usually work alone.

Last night, I showed my daughter how to make a cake. "First, take four eggs from the refrigerator and some sugar from the cupboard. Then, open the box ..."

Suddenly, I had a wonderful idea: cookbooks! I'm starting a new business! With my cookbooks, I can tell hundreds of people what to do!`;

export const DO_IT_FULL_TEXT_ES = `Siempre recuerdo a mi madre diciendo: "Despiértate. Limpia tu habitación. No comas dulces. Apúrate. Haz tu tarea. Pórtate bien. No corras. Siéntate. Levántate. Haz esto. Haz aquello." Siempre pensé: "Hmm, me gusta ese trabajo."

Hace cinco años, comencé la Agencia Casa Limpia (Clean-House Agency). Puse un anuncio en el periódico. Respondí todas las llamadas telefónicas y cartas, y comencé mi negocio. Les dije a todos los nuevos trabajadores: "Sean rápidos y sean limpios." Les mostré cómo limpiar casas y oficinas. Al principio, todos trabajábamos juntos. Ahora, por lo general trabajan solos.

Anoche, le mostré a mi hija cómo hacer un pastel. "Primero, saca cuatro huevos del refrigerador y algo de azúcar de la alacena. Luego, abre la caja..."

De repente, tuve una maravillosa idea: ¡libros de cocina! ¡Estoy comenzando un nuevo negocio! ¡Con mis libros de cocina, puedo decirle a cientos de personas qué hacer!`;

export const DO_IT_SENTENCES: LessonSentence[] = [
  {
    en: 'I always remember my mother saying, "Wake up. Clean your room. Don\'t eat candy. Hurry up. Do your homework. Be good. Don\'t run. Sit down. Stand up. Do this. Do that."',
    es: 'Siempre recuerdo a mi madre diciendo: "Despiértate. Limpia tu habitación. No comas dulces. Apúrate. Haz tu tarea. Pórtate bien. No corras. Siéntate. Levántate. Haz esto. Haz aquello."',
  },
  {
    en: 'I always thought, "Hmm, I like that job."',
    es: 'Siempre pensé: "Hmm, me gusta ese trabajo."',
  },
  {
    en: 'Five years ago, I started the Clean-House Agency.',
    es: 'Hace cinco años, comencé la Agencia Casa Limpia.',
  },
  {
    en: 'I put an ad in the newspaper.',
    es: 'Puse un anuncio en el periódico.',
  },
  {
    en: 'I answered all the telephone calls and letters, and started my business.',
    es: 'Respondí todas las llamadas telefónicas y cartas, y comencé mi negocio.',
  },
  {
    en: 'I told all the new workers, "Be quick, and be clean."',
    es: 'Les dije a todos los nuevos trabajadores: "Sean rápidos y sean limpios."',
  },
  {
    en: 'I showed them how to clean homes and offices.',
    es: 'Les mostré cómo limpiar casas y oficinas.',
  },
  {
    en: 'First, we all worked together.',
    es: 'Al principio, todos trabajábamos juntos.',
  },
  {
    en: 'Now, they usually work alone.',
    es: 'Ahora, por lo general trabajan solos.',
  },
  {
    en: 'Last night, I showed my daughter how to make a cake.',
    es: 'Anoche, le mostré a mi hija cómo hacer un pastel.',
  },
  {
    en: '"First, take four eggs from the refrigerator and some sugar from the cupboard.',
    es: '"Primero, saca cuatro huevos del refrigerador y algo de azúcar de la alacena.',
  },
  {
    en: 'Then, open the box ..."',
    es: 'Luego, abre la caja..."',
  },
  {
    en: 'Suddenly, I had a wonderful idea: cookbooks!',
    es: 'De repente, tuve una maravillosa idea: ¡libros de cocina!',
  },
  {
    en: "I'm starting a new business!",
    es: '¡Estoy comenzando un nuevo negocio!',
  },
  {
    en: 'With my cookbooks, I can tell hundreds of people what to do!',
    es: '¡Con mis libros de cocina, puedo decirle a cientos de personas qué hacer!',
  },
];

export const DO_IT_SECTION_LESSON_TEXT: LessonText = {
  title: 'Lesson 3: Reading · Do It!',
  stepTitle: 'Step 3: Explore · Do It!',
  audioText: DO_IT_FULL_TEXT,
  textEn: DO_IT_FULL_TEXT,
  textEs: DO_IT_FULL_TEXT_ES,
  caller: 'The Entrepreneur',
  company: 'Clean-House Agency & Cookbooks',
  durationSeconds: 50,
  imageSrc: doItArticleImg,
  speakerGender: 'female',
  sentences: DO_IT_SENTENCES,
  practiceInstructions:
    'Lee con atención el artículo "Do It!" sobre cómo la autora convirtió su gusto por dar instrucciones en negocios exitosos.',
};

export const DO_IT_SECTION_LESSON = DO_IT_SECTION_LESSON_TEXT;

// ========================================================
// ACTIVIDADES 1 A 7 + TEST (EN ORDEN EXACTO)
// ========================================================
export const DO_IT_SECTION_EXERCISES: Exercise[] = [
  // --------------------------------------------------------
  // ACTIVIDAD 1: Explore / Reading article "Do It!"
  // --------------------------------------------------------
  {
    id: 'do-it-act-1-explore',
    type: 'do-it-explore',
    title: 'Actividad 1: Explore',
    instructions: 'Read the article "Do It!" Click on any sentence to listen, or flip the card to see the full Spanish translation.',
    instructionsEs: 'Lee el artículo "¡Hazlo!". Haz clic en cualquier oración para escucharla, o voltea la tarjeta para ver la traducción completa al español.',
    audioText: DO_IT_FULL_TEXT,
    sentences: DO_IT_SENTENCES,
    imageSrc: doItArticleImg,
  } as any,

  // --------------------------------------------------------
  // ACTIVIDAD 2: Multiple Choice Questions (3 preguntas de selección)
  // --------------------------------------------------------
  {
    id: 'do-it-act-2-questions',
    type: 'do-it-questions',
    title: 'Actividad 2: Questions',
    instructions: 'Read the article "Do It," and then answer the questions.',
    instructionsEs: 'Lee el artículo "¡Hazlo!", y luego responde a las preguntas.',
    imageSrc: doItArticleImg,
    audioText: DO_IT_FULL_TEXT,
    sentences: DO_IT_SENTENCES,
    questions: [
      {
        id: 'q1',
        number: 1,
        question: 'Why did the writer start her own cleaning business?',
        questionEs: '¿Por qué comenzó la escritora su propio negocio de limpieza?',
        options: [
          {
            id: 'q1-opt-1',
            text: 'She loved cleaning her room when she was a child.',
            textEs: 'Le encantaba limpiar su habitación cuando era niña.',
          },
          {
            id: 'q1-opt-2',
            text: 'She saw that she liked to tell others what to do.',
            textEs: 'Vio que le gustaba decirle a los demás qué hacer.',
          },
          {
            id: 'q1-opt-3',
            text: 'She hated cleaning and wanted others to do it for her.',
            textEs: 'Odiaba limpiar y quería que otros lo hicieran por ella.',
          },
          {
            id: 'q1-opt-4',
            text: 'She knew the best way to run a business and wanted to teach others.',
            textEs: 'Sabía la mejor manera de dirigir un negocio y quería enseñar a otros.',
          },
        ],
        correctAnswerId: 'q1-opt-2',
        explanation: 'In the text, the writer remembers her mother giving orders and thought: "Hmm, I like that job." She liked telling others what to do.',
        explanationEs: 'En el texto, la autora recuerda a su madre dando órdenes y pensó: "Hmm, me gusta ese trabajo". Le gustaba decirle a los demás qué hacer.',
      },
      {
        id: 'q2',
        number: 2,
        question: 'What did the writer do to start the Clean-House Agency?',
        questionEs: '¿Qué hizo la escritora para comenzar la Agencia Casa Limpia?',
        options: [
          {
            id: 'q2-opt-1',
            text: 'She placed an ad in the newspaper.',
            textEs: 'Puso un anuncio en el periódico.',
          },
          {
            id: 'q2-opt-2',
            text: 'She went to homes and offices.',
            textEs: 'Fue a casas y oficinas.',
          },
          {
            id: 'q2-opt-3',
            text: 'She answered phone calls and letters.',
            textEs: 'Respondió llamadas telefónicas y cartas.',
          },
          {
            id: 'q2-opt-4',
            text: 'She asked her mother for help.',
            textEs: 'Le pidió ayuda a su madre.',
          },
        ],
        correctAnswerId: 'q2-opt-1',
        explanation: 'The text states: "Five years ago, I started the Clean-House Agency. I put an ad in the newspaper."',
        explanationEs: 'El texto dice: "Hace cinco años, comencé la Agencia Casa Limpia. Puse un anuncio en el periódico".',
      },
      {
        id: 'q3',
        number: 3,
        question: "What is the writer's new idea for a business?",
        questionEs: '¿Cuál es la nueva idea de negocio de la escritora?',
        options: [
          {
            id: 'q3-opt-1',
            text: 'baking and selling cakes',
            textEs: 'hornear y vender pasteles',
          },
          {
            id: 'q3-opt-2',
            text: 'writing cookbooks',
            textEs: 'escribir libros de cocina',
          },
          {
            id: 'q3-opt-3',
            text: 'selling cake mixes',
            textEs: 'vender mezclas para pasteles',
          },
          {
            id: 'q3-opt-4',
            text: 'teaching cooking classes',
            textEs: 'dar clases de cocina',
          },
        ],
        correctAnswerId: 'q3-opt-2',
        explanation: 'The text explicitly says: "Suddenly, I had a wonderful idea: cookbooks! I\'m starting a new business! With my cookbooks, I can tell hundreds of people what to do!"',
        explanationEs: 'El texto dice expresamente: "De repente, tuve una maravillosa idea: ¡libros de cocina! ¡Estoy comenzando un nuevo negocio!".',
      },
    ],
  } as any,

  // --------------------------------------------------------
  // ACTIVIDAD 3: Ordering Events (Reporter's Notebook)
  // --------------------------------------------------------
  {
    id: 'do-it-act-3-order-events',
    type: 'do-it-order-events',
    title: 'Actividad 3: Order Events',
    instructions: "A reporter wanted to write an article about the woman who started the Clean-House Agency. Read the events in the reporter's notebook, and put them in order.",
    instructionsEs: 'Un reportero quería escribir un artículo sobre la mujer que inició la Agencia Casa Limpia. Lee los eventos en la libreta del reportero y colócalos en orden.',
    imageSrc: doItArticleImg,
    audioText: DO_IT_FULL_TEXT,
    sentences: DO_IT_SENTENCES,
    events: [
      {
        id: 'ev-1',
        orderNumber: 1,
        textEn: 'Her mother was always telling her what to do.',
        textEs: 'Su madre siempre le estaba diciendo qué hacer.',
      },
      {
        id: 'ev-2',
        orderNumber: 2,
        textEn: 'She decided that she wanted to tell others what to do.',
        textEs: 'Decidió que quería decirle a otros qué hacer.',
      },
      {
        id: 'ev-3',
        orderNumber: 3,
        textEn: 'She started the Clean-House Agency by putting an ad in a newspaper.',
        textEs: 'Comenzó la Agencia Casa Limpia poniendo un anuncio en un periódico.',
      },
      {
        id: 'ev-4',
        orderNumber: 4,
        textEn: 'She hired some workers.',
        textEs: 'Contrató algunos trabajadores.',
      },
      {
        id: 'ev-5',
        orderNumber: 5,
        textEn: 'She taught the workers how to clean.',
        textEs: 'Les enseñó a los trabajadores cómo limpiar.',
      },
      {
        id: 'ev-6',
        orderNumber: 6,
        textEn: 'She started sending the workers out to homes and offices.',
        textEs: 'Comenzó a enviar a los trabajadores a casas y oficinas.',
      },
      {
        id: 'ev-7',
        orderNumber: 7,
        textEn: 'She decided to write cookbooks as a new business.',
        textEs: 'Decidió escribir libros de cocina como nuevo negocio.',
      },
    ],
  } as any,

  // --------------------------------------------------------
  // ACTIVIDAD 4: Multi-select Checkboxes (Mark true statements)
  // --------------------------------------------------------
  {
    id: 'do-it-act-4-true-statements',
    type: 'do-it-true-statements',
    title: 'Actividad 4: True Statements',
    instructions: 'Mark the true statements.',
    instructionsEs: 'Marca las afirmaciones verdaderas.',
    imageSrc: doItArticleImg,
    audioText: DO_IT_FULL_TEXT,
    sentences: DO_IT_SENTENCES,
    statements: [
      {
        id: 'st-1',
        statementEn: 'The writer works for a newspaper.',
        statementEs: 'La escritora trabaja para un periódico.',
        isTrue: false,
        feedbackEn: 'False: She placed an ad in the newspaper to find clients/workers, but does not work for the newspaper.',
        feedbackEs: 'Falso: Ella puso un anuncio en el periódico para encontrar clientes/trabajadores, pero no trabaja para el periódico.',
      },
      {
        id: 'st-2',
        statementEn: 'The article is about cooking.',
        statementEs: 'El artículo trata sobre cocina.',
        isTrue: false,
        feedbackEn: 'False: The article is about the author starting businesses so she can tell others what to do.',
        feedbackEs: 'Falso: El artículo trata sobre la autora creando negocios para poder decirle a otros qué hacer.',
      },
      {
        id: 'st-3',
        statementEn: 'The writer likes telling people what to do.',
        statementEs: 'A la escritora le gusta decirle a la gente qué hacer.',
        isTrue: true,
        feedbackEn: 'True: She thought "Hmm, I like that job" when hearing her mother give orders, and wants to tell hundreds of people what to do.',
        feedbackEs: 'Verdadero: Pensó "Hmm, me gusta ese trabajo" al oír las órdenes de su madre, y quiere decirle a cientos de personas qué hacer.',
      },
      {
        id: 'st-4',
        statementEn: 'The writer likes cleaning houses and offices.',
        statementEs: 'A la escritora le gusta limpiar casas y oficinas.',
        isTrue: false,
        feedbackEn: 'False: She liked telling workers how to clean; now they usually work alone while she manages.',
        feedbackEs: 'Falso: A ella le gustaba enseñar y decirles qué hacer; ahora ellos suelen trabajar solos.',
      },
      {
        id: 'st-5',
        statementEn: 'The writer talks about starting a new business.',
        statementEs: 'La escritora habla sobre comenzar un nuevo negocio.',
        isTrue: true,
        feedbackEn: 'True: She says: "cookbooks! I\'m starting a new business!"',
        feedbackEs: 'Verdadero: Ella dice textualmente: "¡libros de cocina! ¡Estoy comenzando un nuevo negocio!".',
      },
      {
        id: 'st-6',
        statementEn: 'The writer wants to write cookbooks.',
        statementEs: 'La escritora quiere escribir libros de cocina.',
        isTrue: true,
        feedbackEn: 'True: "With my cookbooks, I can tell hundreds of people what to do!"',
        feedbackEs: 'Verdadero: "¡Con mis libros de cocina, puedo decirle a cientos de personas qué hacer!".',
      },
      {
        id: 'st-7',
        statementEn: "The article is not about the writer's mother.",
        statementEs: 'El artículo no trata sobre la madre de la escritora.',
        isTrue: true,
        feedbackEn: "True: Her mother is only mentioned in the first paragraph as inspiration; the article is about the writer's life and businesses.",
        feedbackEs: 'Verdadero: Su madre solo se menciona en el primer párrafo como inspiración; el artículo trata sobre la escritora y sus empresas.',
      },
    ],
  } as any,

  // --------------------------------------------------------
  // ACTIVIDAD 5: Sentences with Dropdowns (Best answers)
  // --------------------------------------------------------
  {
    id: 'do-it-act-5-dropdown-sentences',
    type: 'do-it-dropdown-sentences',
    title: 'Actividad 5: Best Answers',
    instructions: 'Choose the best answers for each sentence.',
    instructionsEs: 'Elige las mejores respuestas para cada oración.',
    imageSrc: doItArticleImg,
    audioText: DO_IT_FULL_TEXT,
    sentences: DO_IT_SENTENCES,
    items: [
      {
        id: 'drop-1',
        prefix: 'The writer started a',
        prefixEs: 'La escritora comenzó un negocio de',
        suffix: 'business. The writer talks about',
        suffixEs: '. La escritora habla sobre',
        options: ['cooking', 'cleaning', 'newspaper'],
        optionsEs: ['cocina', 'limpieza', 'periódico'],
        correctAnswer: 'cleaning',
        translationEs: 'La escritora comenzó un negocio de limpieza.',
      },
      {
        id: 'drop-2',
        prefix: '',
        prefixEs: '',
        suffix: 'with her daughter. The writer wants to write cookbooks because she likes',
        suffixEs: 'con su hija. La escritora quiere escribir libros de cocina porque le gusta',
        options: ['cleaning a house', 'making a cake', 'writing a cookbook'],
        optionsEs: ['limpiar una casa', 'hacer un pastel', 'escribir un libro de cocina'],
        correctAnswer: 'making a cake',
        translationEs: 'hacer un pastel con su hija.',
      },
      {
        id: 'drop-3',
        prefix: '',
        prefixEs: '',
        suffix: '.',
        suffixEs: '.',
        options: ['telling people what to do', 'cleaning', 'cooking'],
        optionsEs: ['decirle a la gente qué hacer', 'limpiar', 'cocinar'],
        correctAnswer: 'telling people what to do',
        translationEs: 'porque le gusta decirle a la gente qué hacer.',
      },
    ],
  } as any,

  // --------------------------------------------------------
  // ACTIVIDAD 6: Who says what? (Table with drag/click)
  // --------------------------------------------------------
  {
    id: 'do-it-act-6-who-says-what',
    type: 'do-it-who-says-what',
    title: 'Actividad 6: Who Says What?',
    instructions: 'Who says what? Fill in the table by choosing the best answers from below. There are more words than you need.',
    instructionsEs: '¿Quién dice qué? Completa la tabla eligiendo las mejores respuestas de abajo. Hay más palabras de las necesarias.',
    imageSrc: doItArticleImg,
    audioText: DO_IT_FULL_TEXT,
    sentences: DO_IT_SENTENCES,
    optionsPool: [
      'Be quick.',
      'Do the washing up.',
      'Be on time.',
      'Take four eggs from the refrigerator.',
      'Wake up.',
      'Close the box.',
    ],
    optionsPoolEs: {
      'Be quick.': 'Sean rápidos.',
      'Do the washing up.': 'Lava los platos.',
      'Be on time.': 'Llega a tiempo.',
      'Take four eggs from the refrigerator.': 'Saca cuatro huevos del refrigerador.',
      'Wake up.': 'Despiértate.',
      'Close the box.': 'Cierra la caja.',
    },
    rows: [
      {
        id: 'row-mother',
        personEn: 'Mother to the writer',
        personEs: 'Madre a la escritora',
        correctAnswer: 'Wake up.',
        correctAnswerEs: 'Despiértate.',
      },
      {
        id: 'row-workers',
        personEn: 'Writer to her workers',
        personEs: 'Escritora a sus trabajadores',
        correctAnswer: 'Be quick.',
        correctAnswerEs: 'Sean rápidos.',
      },
      {
        id: 'row-daughter',
        personEn: 'Writer to her daughter',
        personEs: 'Escritora a su hija',
        correctAnswer: 'Take four eggs from the refrigerator.',
        correctAnswerEs: 'Saca cuatro huevos del refrigerador.',
      },
    ],
  } as any,

  // --------------------------------------------------------
  // ACTIVIDAD 7: Matching table interview Q&A
  // --------------------------------------------------------
  {
    id: 'do-it-act-7-interview-qa',
    type: 'do-it-interview-qa',
    title: 'Actividad 7: Interview Q&A',
    instructions: 'The writer is being interviewed about her business. Match the answers to the questions by dragging the correct answer from below.',
    instructionsEs: 'La escritora está siendo entrevistada sobre su negocio. Empareja las respuestas con las preguntas arrastrando la respuesta correcta de abajo.',
    imageSrc: doItArticleImg,
    audioText: DO_IT_FULL_TEXT,
    sentences: DO_IT_SENTENCES,
    optionsPool: [
      'Now they usually work alone.',
      'Be quick and be clean.',
      'Yes! Cookbooks!',
      'I like telling people what to do.',
    ],
    optionsPoolEs: {
      'Now they usually work alone.': 'Ahora por lo general trabajan solos.',
      'Be quick and be clean.': 'Sean rápidos y sean limpios.',
      'Yes! Cookbooks!': '¡Sí! ¡Libros de cocina!',
      'I like telling people what to do.': 'Me gusta decirle a la gente qué hacer.',
    },
    rows: [
      {
        id: 'qa-1',
        questionEn: 'Why did you start your own cleaning business?',
        questionEs: '¿Por qué comenzaste tu propio negocio de limpieza?',
        correctAnswer: 'I like telling people what to do.',
        correctAnswerEs: 'Me gusta decirle a la gente qué hacer.',
      },
      {
        id: 'qa-2',
        questionEn: 'What did you tell your new workers?',
        questionEs: '¿Qué les dijiste a tus nuevos trabajadores?',
        correctAnswer: 'Be quick and be clean.',
        correctAnswerEs: 'Sean rápidos y sean limpios.',
      },
      {
        id: 'qa-3',
        questionEn: 'Do you still clean with your workers?',
        questionEs: '¿Todavía limpias con tus trabajadores?',
        correctAnswer: 'Now they usually work alone.',
        correctAnswerEs: 'Ahora por lo general trabajan solos.',
      },
      {
        id: 'qa-4',
        questionEn: 'Do you have any more ideas?',
        questionEs: '¿Tienes más ideas?',
        correctAnswer: 'Yes! Cookbooks!',
        correctAnswerEs: '¡Sí! ¡Libros de cocina!',
      },
    ],
  } as any,

  // --------------------------------------------------------
  // TEST DE EVALUACIÓN: 5 Tests en orden exacto con tarjeta inicial
  // --------------------------------------------------------
  {
    id: 'do-it-act-8-test',
    type: 'unit-test',
    useDoItSidebar: true,
    title: 'Do It!: Test de Evaluación',
    titleEs: 'Do It!: Test de Evaluación',
    subtitle: '5 Tests: Complete & Select the Best Answers',
    subtitleEs: '5 Tests: Completa y Elige las Mejores Respuestas',
    description:
      'Demuestra tu comprensión del artículo "Do It!" sobre la emprendedora de la Clean-House Agency y sus libros de cocina.',
    descriptionEs:
      'Demuestra tu comprensión del artículo "Do It!" sobre la emprendedora de la Clean-House Agency y sus libros de cocina.',
    totalQuestions: 5,
    audioPrompt: DO_IT_FULL_TEXT,
    speakerGender: 'female',
    imageUrl: doItArticleImg,
    referenceText: DO_IT_FULL_TEXT,
    referenceTextEs: DO_IT_FULL_TEXT_ES,
    questions: [
      // Test 1: Radio choice: Who said: "Clean your room. Don't eat candy."?
      {
        id: 'do-it-test-1',
        number: 1,
        type: 'radio-choice',
        instructions: 'Choose the correct answer.',
        instructionsEs: 'Elige la respuesta correcta.',
        question: 'Who said: "Clean your room. Don\'t eat candy."?',
        questionEs: '¿Quién dijo: "Limpia tu habitación. No comas dulces."?',
        audioPrompt: DO_IT_FULL_TEXT,
        durationSeconds: 50,
        speakerGender: 'female',
        imageUrl: doItArticleImg,
        options: [
          { id: 't1-opt-daughter', text: "the writer's daughter", textEs: 'la hija de la escritora', isCorrect: false },
          { id: 't1-opt-phone', text: 'people on the telephone', textEs: 'personas en el teléfono', isCorrect: false },
          { id: 't1-opt-mother', text: "the writer's mother", textEs: 'la madre de la escritora', isCorrect: true },
          { id: 't1-opt-workers', text: "the writer's workers", textEs: 'los trabajadores de la escritora', isCorrect: false },
        ],
        correctAnswerId: 't1-opt-mother',
        explanation: 'In the opening sentence, the author says: "I always remember my mother saying, \'Wake up. Clean your room. Don\'t eat candy...\'"',
        explanationEs: 'En la primera oración, la autora dice: "Siempre recuerdo a mi madre diciendo: \'Despiértate. Limpia tu habitación. No comas dulces...\'"',
      },

      // Test 2: Drag drop into place: "the Clean-House Agency"
      {
        id: 'do-it-test-2',
        number: 2,
        type: 'drag-drop',
        instructions: 'Drag the correct answer/s into place.',
        instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
        question: 'Five years ago the writer started the Clean-House Agency.',
        questionEs: 'Hace cinco años la escritora comenzó la Agencia Casa Limpia.',
        sentencePrefix: 'Five years ago the writer started',
        sentencePrefixEs: 'Hace cinco años la escritora comenzó',
        sentenceSuffix: '.',
        sentenceSuffixEs: '.',
        audioPrompt: DO_IT_FULL_TEXT,
        durationSeconds: 50,
        speakerGender: 'female',
        imageUrl: doItArticleImg,
        options: [
          { id: 't2-opt-newspaper', text: 'the newspaper business', textEs: 'el negocio de periódicos', isCorrect: false },
          { id: 't2-opt-agency', text: 'the Clean-House Agency', textEs: 'la Agencia Casa Limpia', isCorrect: true },
          { id: 't2-opt-cakes', text: 'baking cakes', textEs: 'hornear pasteles', isCorrect: false },
          { id: 't2-opt-cookbook', text: 'the cookbook business', textEs: 'el negocio de libros de cocina', isCorrect: false },
        ],
        correctAnswerId: 't2-opt-agency',
        explanation: 'The text states: "Five years ago, I started the Clean-House Agency."',
        explanationEs: 'El texto indica claramente: "Hace cinco años, comencé la Agencia Casa Limpia".',
      },

      // Test 3: Radio choice: Another title for this article is
      {
        id: 'do-it-test-3',
        number: 3,
        type: 'radio-choice',
        instructions: 'Choose the correct answer.',
        instructionsEs: 'Elige la respuesta correcta.',
        question: 'Another title for this article is:',
        questionEs: 'Otro título para este artículo es:',
        audioPrompt: DO_IT_FULL_TEXT,
        durationSeconds: 50,
        speakerGender: 'female',
        imageUrl: doItArticleImg,
        options: [
          { id: 't3-opt-mother-daughter', text: '"My Mother and My Daughter"', textEs: '"Mi Madre y Mi Hija"', isCorrect: false },
          { id: 't3-opt-best-way', text: '"The Best Way ... My Way"', textEs: '"La Mejor Manera... A Mi Manera"', isCorrect: true },
          { id: 't3-opt-cookbooks', text: '"Cookbooks"', textEs: '"Libros de Cocina"', isCorrect: false },
          { id: 't3-opt-cleaning', text: '"Cleaning Houses"', textEs: '"Limpiando Casas"', isCorrect: false },
        ],
        correctAnswerId: 't3-opt-best-way',
        explanation: '"The Best Way ... My Way" captures the theme of the author enjoying directing others and doing things her way.',
        explanationEs: '"La Mejor Manera... A Mi Manera" resume la esencia del texto sobre a la autora gustándole dirigir a otros y hacer las cosas a su manera.',
      },

      // Test 4: Drag drop into place: "baked a cake with her daughter"
      {
        id: 'do-it-test-4',
        number: 4,
        type: 'drag-drop',
        instructions: 'Drag the correct answer/s into place.',
        instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
        question: 'The writer decided to start a new business when she baked a cake with her daughter.',
        questionEs: 'La escritora decidió comenzar un nuevo negocio cuando horneó un pastel con su hija.',
        sentencePrefix: 'The writer decided to start a new business when she',
        sentencePrefixEs: 'La escritora decidió comenzar un nuevo negocio cuando',
        sentenceSuffix: '.',
        sentenceSuffixEs: '.',
        audioPrompt: DO_IT_FULL_TEXT,
        durationSeconds: 50,
        speakerGender: 'female',
        imageUrl: doItArticleImg,
        options: [
          { id: 't4-opt-cleaned', text: 'cleaned houses', textEs: 'limpió casas', isCorrect: false },
          { id: 't4-opt-ad', text: 'put an ad in the newspaper', textEs: 'puso un anuncio en el periódico', isCorrect: false },
          { id: 't4-opt-cake', text: 'baked a cake with her daughter', textEs: 'horneó un pastel con su hija', isCorrect: true },
          { id: 't4-opt-calls', text: 'answered telephone calls', textEs: 'respondió llamadas telefónicas', isCorrect: false },
        ],
        correctAnswerId: 't4-opt-cake',
        explanation: 'She had the idea for cookbooks right after showing her daughter how to make a cake: "Suddenly, I had a wonderful idea: cookbooks! I\'m starting a new business!"',
        explanationEs: 'Tuvo la idea de los libros de cocina justo tras mostrarle a su hija cómo hacer un pastel: "De repente, tuve una maravillosa idea: ¡libros de cocina!".',
      },

      // Test 5: Radio choice: The writer works with her workers every day.
      {
        id: 'do-it-test-5',
        number: 5,
        type: 'radio-choice',
        instructions: 'Choose the correct answer.',
        instructionsEs: 'Elige la respuesta correcta.',
        question: 'The writer works with her workers every day.',
        questionEs: 'La escritora trabaja con sus trabajadores todos los días.',
        audioPrompt: DO_IT_FULL_TEXT,
        durationSeconds: 50,
        speakerGender: 'female',
        imageUrl: doItArticleImg,
        options: [
          { id: 't5-opt-true', text: 'True', textEs: 'Verdadero', isCorrect: false },
          { id: 't5-opt-false', text: 'False', textEs: 'Falso', isCorrect: true },
        ],
        correctAnswerId: 't5-opt-false',
        explanation: 'The text specifies: "First, we all worked together. Now, they usually work alone." Therefore, she does not work with them every day.',
        explanationEs: 'El texto especifica: "Al principio, todos trabajábamos juntos. Ahora, por lo general trabajan solos". Por lo tanto, no trabaja con ellos todos los días.',
      },
    ],
  } as UnitTestExercise,
];
