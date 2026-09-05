import { LessonText, Exercise } from '../types';

export const PHONE_SALES_LESSON_TEXT: LessonText = {
  title: 'Lesson 1: Phone Sales',
  stepTitle: 'Step 1: Explore',
  audioText:
    'Hi, there! This is Chuck Wood calling from "Working People Magazine." We have something good for you today: our biggest sale of the year! The price of our magazine was $2.50 each. Now it\'s only $10 for ten magazines. That\'s $1 each. Call now! The number is 555-9663. Don\'t forget! That number was 555-9663. Remember: "Working People Magazine" works for you!',
  textEn:
    'Hi, there! This is Chuck Wood calling from "Working People Magazine." We have something good for you today: our biggest sale of the year! The price of our magazine was $2.50 each. Now it\'s only $10 for ten magazines. That\'s $1 each. Call now! The number is 555-9663. Don\'t forget! That number was 555-9663. Remember: "Working People Magazine" works for you!',
  textEs:
    '¡Hola! Le habla Chuck Wood llamando desde la revista "Working People Magazine". Tenemos algo muy bueno para usted hoy: ¡nuestra mayor oferta del año! El precio de nuestra revista era de $2.50 cada una. Ahora cuesta solo $10 por diez revistas. Eso es $1 cada una. ¡Llame ahora! El número es 555-9663. ¡No lo olvide! Ese número era 555-9663. Recuerde: ¡"Working People Magazine" trabaja para usted!',
  caller: 'Chuck Wood',
  company: 'Working People Magazine',
  phone: '555-9663',
  sentences: [
    {
      en: 'Hi, there!',
      es: '¡Hola!',
    },
    {
      en: 'This is Chuck Wood calling from "Working People Magazine."',
      es: 'Le habla Chuck Wood llamando desde la revista "Working People Magazine".',
    },
    {
      en: 'We have something good for you today: our biggest sale of the year!',
      es: '¡Tenemos algo muy bueno para usted hoy: nuestra mayor oferta del año!',
    },
    {
      en: 'The price of our magazine was $2.50 each.',
      es: 'El precio de nuestra revista era de $2.50 cada una.',
    },
    {
      en: "Now it's only $10 for ten magazines.",
      es: 'Ahora cuesta solo $10 por diez revistas.',
    },
    {
      en: "That's $1 each.",
      es: 'Eso es $1 cada una.',
    },
    {
      en: 'Call now! The number is 555-9663.',
      es: '¡Llame ahora! El número es 555-9663.',
    },
    {
      en: "Don't forget! That number was 555-9663.",
      es: '¡No lo olvide! Ese número era 555-9663.',
    },
    {
      en: 'Remember: "Working People Magazine" works for you!',
      es: 'Recuerde: ¡"Working People Magazine" trabaja para usted!',
    },
  ],
  practiceInstructions:
    'Listen to the recording again and do the tasks that follow. If you need help, use the student tools.',
};

export const PHONE_SALES_EXERCISES: Exercise[] = [
  // Activity 2: Matching table
  {
    id: 'u1-ex-matching',
    type: 'matching-table',
    question: 'Listen to the voice message, and fill the correct information.',
    explanation:
      'Chuck Wood llama de Working People Magazine. El precio normal era $2.50 por revista y el precio de oferta es $10 por 10 revistas. El teléfono es 555-9663.',
    instructions: 'Listen to the voice message, and fill the correct information.',
    audioPrompt:
      'Hi, there! This is Chuck Wood calling from "Working People Magazine." We have something good for you today: our biggest sale of the year! The price of our magazine was $2.50 each. Now it\'s only $10 for ten magazines. That\'s $1 each. Call now! The number is 555-9663. Don\'t forget! That number was 555-9663. Remember: "Working People Magazine" works for you!',
    pairs: [
      {
        id: 'pair-caller',
        field: 'Name of caller:',
        fieldEs: 'Nombre de quien llama:',
        correctValue: 'Chuck Wood',
        correctValueEs: 'Chuck Wood',
      },
      {
        id: 'pair-product',
        field: 'Name of product:',
        fieldEs: 'Nombre del producto:',
        correctValue: 'Working People Magazine',
        correctValueEs: 'Revista Working People',
      },
      {
        id: 'pair-normal-price',
        field: 'Normal price:',
        fieldEs: 'Precio normal:',
        correctValue: '$2.50 for one magazine',
        correctValueEs: '$2.50 por una revista',
      },
      {
        id: 'pair-sale-price',
        field: 'Sale price:',
        fieldEs: 'Precio de oferta:',
        correctValue: '$10 for ten magazines',
        correctValueEs: '$10 por diez revistas',
      },
      {
        id: 'pair-phone',
        field: 'Phone number:',
        fieldEs: 'Número de teléfono:',
        correctValue: '555-9663',
        correctValueEs: '555-9663',
      },
    ],
    optionsPool: [
      '$2.50 for one magazine',
      '555-9663',
      '$10 for ten magazines',
      'Chuck Wood',
      'Working People Magazine',
    ],
    optionsPoolEs: {
      '$2.50 for one magazine': '$2.50 por una revista',
      '555-9663': '555-9663',
      '$10 for ten magazines': '$10 por diez revistas',
      'Chuck Wood': 'Chuck Wood',
      'Working People Magazine': 'Revista Working People',
    },
  },

  // Activity 3: Dropdown completion
  {
    id: 'u1-ex-dropdown',
    type: 'dropdown-completion',
    question: "Listen to Chuck Wood's message, and complete the sentences.",
    instructions: "Listen to Chuck Wood's message, and complete the sentences.",
    instructionsEs: 'Escucha el mensaje de Chuck Wood y completa las oraciones.',
    explanation:
      'Chuck Wood anuncia la mayor venta del año ("sale of the year"). El precio de oferta es $10 por 10 revistas, lo que resulta en $1.00 cada una ("only $1.00"). Este precio aplica si compras diez revistas ("ten magazines").',
    audioPrompt:
      'Hi, there! This is Chuck Wood calling from "Working People Magazine." We have something good for you today: our biggest sale of the year! The price of our magazine was $2.50 each. Now it\'s only $10 for ten magazines. That\'s $1 each. Call now! The number is 555-9663. Don\'t forget! That number was 555-9663. Remember: "Working People Magazine" works for you!',
    template:
      'This is the biggest sale of the {0}. The sale price for one magazine is only {1}. This is the price if you buy {2} magazines.',
    translationEs:
      'Esta es la mayor oferta del año. El precio de oferta por una revista es de solo $1.00. Este es el precio si compras diez revistas.',
    blanks: [
      {
        id: 'blank-1',
        options: ['year', 'week', 'month'],
        correctAnswer: 'year',
      },
      {
        id: 'blank-2',
        options: ['$10.00', '$2.50', '$1.00'],
        correctAnswer: '$1.00',
      },
      {
        id: 'blank-3',
        options: ['ten', 'five', 'two'],
        correctAnswer: 'ten',
      },
    ],
  },

  // Activity 4: True/False selection
  {
    id: 'u1-ex-true-false',
    type: 'true-false-selection',
    question: 'Mark the sentences which are true.',
    instructions: 'Mark the sentences which are true.',
    instructionsEs: 'Marca las oraciones que son verdaderas.',
    explanation:
      'Es más caro comprar una sola revista ($2.50 vs $1.00 cada una al comprar diez). La revista es para trabajadores ("Working People"), no escolares. Es la mayor oferta del año, no habrá una mayor la próxima semana. Es más conveniente comprar diez revistas. Chuck Wood pide expresamente que recuerdes su número 555-9663. 10 revistas cuestan exactamente $10.',
    audioPrompt:
      'Hi, there! This is Chuck Wood calling from "Working People Magazine." We have something good for you today: our biggest sale of the year! The price of our magazine was $2.50 each. Now it\'s only $10 for ten magazines. That\'s $1 each. Call now! The number is 555-9663. Don\'t forget! That number was 555-9663. Remember: "Working People Magazine" works for you!',
    statements: [
      {
        id: 'stmt-1',
        text: "It's more expensive to buy one magazine.",
        textEs: 'Es más caro comprar una sola revista.',
        isTrue: true,
      },
      {
        id: 'stmt-2',
        text: 'The magazine is for schoolchildren.',
        textEs: 'La revista es para escolares.',
        isTrue: false,
      },
      {
        id: 'stmt-3',
        text: 'There will be a bigger sale next week.',
        textEs: 'Habrá una oferta mayor la próxima semana.',
        isTrue: false,
      },
      {
        id: 'stmt-4',
        text: "It's better to buy ten magazines.",
        textEs: 'Es mejor comprar diez revistas.',
        isTrue: true,
      },
      {
        id: 'stmt-5',
        text: 'Chuck Wood wants you to remember his number.',
        textEs: 'Chuck Wood quiere que recuerdes su número.',
        isTrue: true,
      },
      {
        id: 'stmt-6',
        text: '10 magazines will cost you $10.',
        textEs: '10 revistas te costarán $10.',
        isTrue: true,
      },
    ],
  },

  // Activity 5: Radio choice (Chuck Wood phones people to...)
  {
    id: 'u1-ex-radio-choice-1',
    type: 'radio-choice',
    question: 'Chuck Wood phones people to...',
    questionEs: 'Chuck Wood llama a las personas para...',
    instructions: 'Choose the best answers to the questions below.',
    instructionsEs: 'Elige las mejores respuestas a las siguientes preguntas.',
    explanation:
      'Chuck Wood llama para informar sobre la mayor oferta del año de su revista ("our biggest sale of the year!"). Ofrece 10 revistas por $10, lo que equivale a $1 cada una.',
    audioPrompt:
      'Hi, there! This is Chuck Wood calling from "Working People Magazine." We have something good for you today: our biggest sale of the year! The price of our magazine was $2.50 each. Now it\'s only $10 for ten magazines. That\'s $1 each. Call now! The number is 555-9663. Don\'t forget! That number was 555-9663. Remember: "Working People Magazine" works for you!',
    sentences: [
      { en: 'Hi, there! This is Chuck Wood calling from "Working People Magazine."', es: '¡Hola! Le habla Chuck Wood llamando desde la revista "Working People Magazine".' },
      { en: 'We have something good for you today: our biggest sale of the year!', es: '¡Tenemos algo muy bueno para usted hoy: nuestra mayor oferta del año!' },
      { en: 'The price of our magazine was $2.50 each.', es: 'El precio de nuestra revista era de $2.50 cada una.' },
      { en: "Now it's only $10 for ten magazines.", es: 'Ahora cuesta solo $10 por diez revistas.' },
      { en: "That's $1 each.", es: 'Eso es $1 cada una.' },
      { en: 'Call now! The number is 555-9663.', es: '¡Llame ahora! El número es 555-9663.' },
      { en: "Don't forget! That number was 555-9663.", es: '¡No lo olvide! Ese número era 555-9663.' },
      { en: 'Remember: "Working People Magazine" works for you!', es: 'Recuerde: ¡"Working People Magazine" trabaja para usted!' },
    ],
    options: [
      {
        id: 'opt-1',
        text: 'Tell them about his sale.',
        textEs: 'Contarles sobre su oferta.',
        isCorrect: true,
      },
      {
        id: 'opt-2',
        text: 'Tell them about people at work.',
        textEs: 'Contarles sobre personas en el trabajo.',
        isCorrect: false,
      },
      {
        id: 'opt-3',
        text: 'Talk to them about phone numbers.',
        textEs: 'Hablarles sobre números de teléfono.',
        isCorrect: false,
      },
      {
        id: 'opt-4',
        text: 'Talk to them about finding work.',
        textEs: 'Hablarles sobre cómo encontrar trabajo.',
        isCorrect: false,
      },
    ],
    correctAnswerId: 'opt-1',
  },

  // Activity 6: Radio choice (Chuck Wood says it is "our biggest sale of the year!" This means...)
  {
    id: 'u1-ex-radio-choice-2',
    type: 'radio-choice',
    question: 'Chuck Wood says it is "our biggest sale of the year!" This means...',
    questionEs: 'Chuck Wood dice que es "¡nuestra mayor oferta del año!" Esto significa...',
    instructions: 'Choose the best answers to the questions below.',
    instructionsEs: 'Elige las mejores respuestas a las siguientes preguntas.',
    explanation:
      'Decir "our biggest sale of the year" (nuestra mayor oferta del año) implica que hay otras ofertas durante el año, pero esta es la más grande.',
    audioPrompt:
      'Hi, there! This is Chuck Wood calling from "Working People Magazine." We have something good for you today: our biggest sale of the year! The price of our magazine was $2.50 each. Now it\'s only $10 for ten magazines. That\'s $1 each. Call now! The number is 555-9663. Don\'t forget! That number was 555-9663. Remember: "Working People Magazine" works for you!',
    sentences: [
      { en: 'Hi, there! This is Chuck Wood calling from "Working People Magazine."', es: '¡Hola! Le habla Chuck Wood llamando desde la revista "Working People Magazine".' },
      { en: 'We have something good for you today: our biggest sale of the year!', es: '¡Tenemos algo muy bueno para usted hoy: nuestra mayor oferta del año!' },
      { en: 'The price of our magazine was $2.50 each.', es: 'El precio de nuestra revista era de $2.50 cada una.' },
      { en: "Now it's only $10 for ten magazines.", es: 'Ahora cuesta solo $10 por diez revistas.' },
      { en: "That's $1 each.", es: 'Eso es $1 cada una.' },
      { en: 'Call now! The number is 555-9663.', es: '¡Llame ahora! El número es 555-9663.' },
      { en: "Don't forget! That number was 555-9663.", es: '¡No lo olvide! Ese número era 555-9663.' },
      { en: 'Remember: "Working People Magazine" works for you!', es: 'Recuerde: ¡"Working People Magazine" trabaja para usted!' },
    ],
    options: [
      {
        id: 'act6-opt-1',
        text: 'There are sales every week.',
        textEs: 'Hay ofertas todas las semanas.',
        isCorrect: false,
      },
      {
        id: 'act6-opt-2',
        text: 'There are other sales during the year.',
        textEs: 'Hay otras ofertas durante el año.',
        isCorrect: true,
      },
      {
        id: 'act6-opt-3',
        text: 'There will be other sales like this one.',
        textEs: 'Habrá otras ofertas como esta.',
        isCorrect: false,
      },
      {
        id: 'act6-opt-4',
        text: "It's the only sale this year.",
        textEs: 'Es la única oferta este año.',
        isCorrect: false,
      },
    ],
    correctAnswerId: 'act6-opt-2',
  },

  // Activity 7: Writing AI feedback
  {
    id: 'u1-ex-writing-ai',
    type: 'writing-ai-feedback',
    instructions:
      'Write your answer, review AI feedback, improve it, and mark Done if satisfied or get another AI feedback.',
    instructionsEs:
      'Escribe tu respuesta, revisa los comentarios de la IA, mejórala y marca Listo si estás satisfecho o solicita otra revisión de la IA.',
    prompt:
      'Your company sells a music magazine called "Rock City." This month there is a sale: the magazine costs less if you buy more, and it comes with a free CD. Write a telephone ad. What\'s the magazine about? How much does it usually cost? How much is it now? What is your telephone number? Write the ad and send it to your teacher.',
    promptEs:
      'Tu empresa vende una revista de música llamada "Rock City". Este mes hay una oferta: la revista cuesta menos si compras más y viene con un CD gratis. Escribe un anuncio telefónico. ¿De qué trata la revista? ¿Cuánto cuesta normalmente? ¿Cuánto cuesta ahora? ¿Cuál es tu número de teléfono? Escribe el anuncio y envíaselo a tu profesor.',
    maxAiRequests: 2,
    initialWordsTarget: 30,
  },

  // Activity 8: Unit 1 Mastery Test (6 tests)
  {
    id: 'u1-ex-unit-test',
    type: 'unit-test',
    title: 'Lesson 1: Phone Sales · Mastery Test',
    titleEs: 'Lección 1: Ventas por Teléfono · Test de Evaluación',
    subtitle: 'Test your comprehension of the phone sales call with 6 questions.',
    subtitleEs: 'Evalúa tu comprensión de la llamada de ventas con 6 preguntas.',
    description:
      'Test your listening comprehension and vocabulary from the phone sales message. Answer all 6 questions to test your mastery.',
    descriptionEs:
      'Pon a prueba tu comprensión auditiva y vocabulario del mensaje de venta telefónica. Responde las 6 preguntas para evaluar tu dominio.',
    totalQuestions: 6,
    audioPrompt:
      'Hi, there! This is Chuck Wood calling from "Working People Magazine." We have something good for you today: our biggest sale of the year! The price of our magazine was $2.50 each. Now it\'s only $10 for ten magazines. That\'s $1 each. Call now! The number is 555-9663. Don\'t forget! That number was 555-9663. Remember: "Working People Magazine" works for you!',
    questions: [
      // Test 1: Who is the caller?
      {
        id: 'test-q1',
        number: 1,
        instructions: 'Choose the correct answer.',
        instructionsEs: 'Elige la respuesta correcta.',
        question: 'Who is the caller?',
        questionEs: '¿Quién es la persona que llama?',
        durationSeconds: 41,
        audioPrompt:
          'Hi, there! This is Chuck Wood calling from "Working People Magazine." We have something good for you today: our biggest sale of the year! The price of our magazine was $2.50 each. Now it\'s only $10 for ten magazines. That\'s $1 each. Call now! The number is 555-9663. Don\'t forget! That number was 555-9663. Remember: "Working People Magazine" works for you!',
        options: [
          { id: 't1-opt-1', text: 'James Woods', textEs: 'James Woods', isCorrect: false },
          { id: 't1-opt-2', text: 'Working People', textEs: 'Working People', isCorrect: false },
          { id: 't1-opt-3', text: 'Chuck Wood', textEs: 'Chuck Wood', isCorrect: true },
          { id: 't1-opt-4', text: 'Charles Wool', textEs: 'Charles Wool', isCorrect: false },
        ],
        correctAnswerId: 't1-opt-3',
        explanation:
          'Chuck Wood se presenta al principio de la llamada: "Hi, there! This is Chuck Wood calling from Working People Magazine."',
        explanationEs:
          'Chuck Wood se presenta al principio de la llamada: "Hi, there! This is Chuck Wood calling from Working People Magazine."',
      },

      // Test 2: What does Chuck Wood say?
      {
        id: 'test-q2',
        number: 2,
        instructions: 'Choose the correct answer.',
        instructionsEs: 'Elige la respuesta correcta.',
        question: 'What does Chuck Wood say?',
        questionEs: '¿Qué dice Chuck Wood?',
        durationSeconds: 41,
        audioPrompt:
          'Hi, there! This is Chuck Wood calling from "Working People Magazine." We have something good for you today: our biggest sale of the year! The price of our magazine was $2.50 each. Now it\'s only $10 for ten magazines. That\'s $1 each. Call now! The number is 555-9663. Don\'t forget! That number was 555-9663. Remember: "Working People Magazine" works for you!',
        options: [
          {
            id: 't2-opt-1',
            text: 'The price is $2.50 for ten magazines.',
            textEs: 'El precio es de $2.50 por diez revistas.',
            isCorrect: false,
          },
          {
            id: 't2-opt-2',
            text: 'The price was $10 for each magazine.',
            textEs: 'El precio era de $10 por cada revista.',
            isCorrect: false,
          },
          {
            id: 't2-opt-3',
            text: 'The price was $2.50 for each magazine.',
            textEs: 'El precio era de $2.50 por cada revista.',
            isCorrect: true,
          },
          {
            id: 't2-opt-4',
            text: 'The price is $1 for ten magazines.',
            textEs: 'El precio es de $1 por diez revistas.',
            isCorrect: false,
          },
        ],
        correctAnswerId: 't2-opt-3',
        explanation:
          'Chuck Wood dice claramente en la grabación: "The price of our magazine was $2.50 each. Now it\'s only $10 for ten magazines. That\'s $1 each."',
        explanationEs:
          'Chuck Wood dice claramente en la grabación: "The price of our magazine was $2.50 each. Now it\'s only $10 for ten magazines. That\'s $1 each."',
      },

      // Test 3: What is the caller's phone number?
      {
        id: 'test-q3',
        number: 3,
        instructions: 'Choose the correct answer.',
        instructionsEs: 'Elige la respuesta correcta.',
        question: "What is the caller's phone number?",
        questionEs: '¿Cuál es el número de teléfono de la persona que llama?',
        durationSeconds: 41,
        audioPrompt:
          'Hi, there! This is Chuck Wood calling from "Working People Magazine." We have something good for you today: our biggest sale of the year! The price of our magazine was $2.50 each. Now it\'s only $10 for ten magazines. That\'s $1 each. Call now! The number is 555-9663. Don\'t forget! That number was 555-9663. Remember: "Working People Magazine" works for you!',
        options: [
          { id: 't3-opt-1', text: '555-9663', textEs: '555-9663', isCorrect: true },
          { id: 't3-opt-2', text: '555-9963', textEs: '555-9963', isCorrect: false },
          { id: 't3-opt-3', text: '555-9633', textEs: '555-9633', isCorrect: false },
          { id: 't3-opt-4', text: '555-6993', textEs: '555-6993', isCorrect: false },
        ],
        correctAnswerId: 't3-opt-1',
        explanation:
          'Chuck Wood repite dos veces el número de teléfono: "Call now! The number is 555-9663. Don\'t forget! That number was 555-9663."',
        explanationEs:
          'Chuck Wood repite dos veces el número de teléfono: "Call now! The number is 555-9663. Don\'t forget! That number was 555-9663."',
      },

      // Test 4: Who is the message for?
      {
        id: 'test-q4',
        number: 4,
        instructions: 'Choose the correct answer.',
        instructionsEs: 'Elige la respuesta correcta.',
        question: 'Who is the message for?',
        questionEs: '¿Para quién es el mensaje?',
        durationSeconds: 41,
        audioPrompt:
          'Hi, there! This is Chuck Wood calling from "Working People Magazine." We have something good for you today: our biggest sale of the year! The price of our magazine was $2.50 each. Now it\'s only $10 for ten magazines. That\'s $1 each. Call now! The number is 555-9663. Don\'t forget! That number was 555-9663. Remember: "Working People Magazine" works for you!',
        options: [
          {
            id: 't4-opt-1',
            text: 'The workers at "Working People Magazine"',
            textEs: 'Los trabajadores de "Working People Magazine"',
            isCorrect: false,
          },
          {
            id: 't4-opt-2',
            text: 'Chuck Wood',
            textEs: 'Chuck Wood',
            isCorrect: false,
          },
          {
            id: 't4-opt-3',
            text: 'A customer',
            textEs: 'Un cliente',
            isCorrect: true,
          },
          {
            id: 't4-opt-4',
            text: 'People who sell magazines',
            textEs: 'Personas que venden revistas',
            isCorrect: false,
          },
        ],
        correctAnswerId: 't4-opt-3',
        explanation:
          'El mensaje está dirigido a un cliente potencial ("A customer") ofreciéndole una suscripción en oferta: "We have something good for you today: our biggest sale of the year!"',
        explanationEs:
          'El mensaje está dirigido a un cliente potencial ("A customer") ofreciéndole una suscripción en oferta: "We have something good for you today: our biggest sale of the year!"',
      },

      // Test 5: Why is Chuck Wood calling?
      {
        id: 'test-q5',
        number: 5,
        type: 'radio-choice',
        instructions: 'Choose the correct answer.',
        instructionsEs: 'Elige la respuesta correcta.',
        question: 'Why is Chuck Wood calling?',
        questionEs: '¿Por qué está llamando Chuck Wood?',
        durationSeconds: 41,
        audioPrompt:
          'Hi, there! This is Chuck Wood calling from "Working People Magazine." We have something good for you today: our biggest sale of the year! The price of our magazine was $2.50 each. Now it\'s only $10 for ten magazines. That\'s $1 each. Call now! The number is 555-9663. Don\'t forget! That number was 555-9663. Remember: "Working People Magazine" works for you!',
        options: [
          {
            id: 't5-opt-1',
            text: "He's calling to sell something good.",
            textEs: 'Está llamando para vender algo bueno.',
            isCorrect: true,
          },
          {
            id: 't5-opt-2',
            text: "He's calling to sell wood on sale.",
            textEs: 'Está llamando para vender madera en oferta.',
            isCorrect: false,
          },
          {
            id: 't5-opt-3',
            text: 'He wants to buy magazines.',
            textEs: 'Él quiere comprar revistas.',
            isCorrect: false,
          },
          {
            id: 't5-opt-4',
            text: 'He wants to talk on the phone.',
            textEs: 'Él quiere hablar por teléfono.',
            isCorrect: false,
          },
        ],
        correctAnswerId: 't5-opt-1',
        explanation:
          'Chuck Wood says: "We have something good for you today: our biggest sale of the year! The price of our magazine was $2.50 each. Now it\'s only $10 for ten magazines."',
        explanationEs:
          'Chuck Wood dice: "We have something good for you today: our biggest sale of the year!" (¡Tenemos algo bueno para ti hoy: nuestra mayor venta del año!). Está llamando para vender la suscripción en oferta.',
      },

      // Test 6: Buying ten magazines is...
      {
        id: 'test-q6',
        number: 6,
        type: 'radio-choice',
        instructions: 'Choose the correct answer.',
        instructionsEs: 'Elige la respuesta correcta.',
        question: 'Buying ten magazines is...',
        questionEs: 'Comprar diez revistas es...',
        durationSeconds: 41,
        audioPrompt:
          'Hi, there! This is Chuck Wood calling from "Working People Magazine." We have something good for you today: our biggest sale of the year! The price of our magazine was $2.50 each. Now it\'s only $10 for ten magazines. That\'s $1 each. Call now! The number is 555-9663. Don\'t forget! That number was 555-9663. Remember: "Working People Magazine" works for you!',
        options: [
          {
            id: 't6-opt-1',
            text: 'more expensive.',
            textEs: 'más caro.',
            isCorrect: false,
          },
          {
            id: 't6-opt-2',
            text: 'less expensive.',
            textEs: 'menos caro / más económico.',
            isCorrect: true,
          },
        ],
        correctAnswerId: 't6-opt-2',
        explanation:
          'Chuck Wood explains: "The price of our magazine was $2.50 each. Now it\'s only $10 for ten magazines. That\'s $1 each." Since $1 is cheaper than $2.50, buying ten is less expensive.',
        explanationEs:
          'Chuck Wood explica que antes costaba $2.50 cada una, y ahora son $10 por diez revistas ($1 cada una). Por lo tanto, comprar diez revistas es menos costoso ("less expensive").',
      },
    ],
  },
];
