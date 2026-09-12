export interface CleanHouseAdSentence {
  id: string;
  en: string;
  es: string;
}

export const CLEAN_HOUSE_AD_TEXT = {
  title: 'Clean-House Agency',
  titleEs: 'Agencia Clean-House',
  phone: '555-1155',
  contactPerson: 'Mary',
  fullAudioText:
    'Clean-House Agency. Do you always have a lot of housework? Do you feel tired all the time? Call the Clean-House Agency. We go everywhere. We do everything! The Clean-House Agency can help you. Call 555-1155 and ask for Mary. Don\'t wait! Do it now!',
  sentences: [
    {
      id: 'sent-1',
      en: 'Do you always have a lot of housework?',
      es: '¿Tienes siempre muchas tareas domésticas?',
    },
    {
      id: 'sent-2',
      en: 'Do you feel tired all the time?',
      es: '¿Te sientes cansado/a todo el tiempo?',
    },
    {
      id: 'sent-3',
      en: 'Call the Clean-House Agency.',
      es: 'Llama a la Agencia Clean-House.',
    },
    {
      id: 'sent-4',
      en: 'We go everywhere.',
      es: 'Vamos a todas partes.',
    },
    {
      id: 'sent-5',
      en: 'We do everything!',
      es: '¡Hacemos de todo!',
    },
    {
      id: 'sent-6',
      en: 'The Clean-House Agency can help you.',
      es: 'La Agencia Clean-House puede ayudarte.',
    },
    {
      id: 'sent-7',
      en: 'Call 555-1155 and ask for Mary.',
      es: 'Llama al 555-1155 y pregunta por Mary.',
    },
    {
      id: 'sent-8',
      en: "Don't wait!",
      es: '¡No esperes!',
    },
    {
      id: 'sent-9',
      en: 'Do it now!',
      es: '¡Hazlo ahora!',
    },
  ],
};

// ACTIVIDAD 2 DATA: Read ad and complete sentences
export interface Activity2Sentence {
  id: string;
  prefixEn: string;
  prefixEs: string;
  blankKey: string;
  suffixEn: string;
  suffixEs: string;
  correctAnswer: string;
  correctAnswerEs: string;
}

export const ACTIVITY_2_DATA: {
  instructionsEn: string;
  instructionsEs: string;
  options: { id: string; textEn: string; textEs: string }[];
  sentences: Activity2Sentence[];
} = {
  instructionsEn: 'Read the ad for the Clean-House Agency, and then complete the sentences.',
  instructionsEs: 'Lee el anuncio de la Agencia Clean-House y luego completa las oraciones.',
  options: [
    { id: 'opt-cleans', textEn: 'cleans', textEs: 'limpia' },
    { id: 'opt-housework', textEn: 'housework', textEs: 'tareas domésticas' },
    {
      id: 'opt-nearby-far',
      textEn: 'works in places that are nearby or far away',
      textEs: 'trabaja en lugares que están cerca o lejos',
    },
  ],
  sentences: [
    {
      id: 'act2-s1',
      prefixEn: 'The Clean-House Agency',
      prefixEs: 'La Agencia Clean-House',
      blankKey: 'b1',
      suffixEn: 'houses.',
      suffixEs: 'casas.',
      correctAnswer: 'cleans',
      correctAnswerEs: 'limpia',
    },
    {
      id: 'act2-s2',
      prefixEn: 'The Agency helps people with their',
      prefixEs: 'La Agencia ayuda a las personas con sus',
      blankKey: 'b2',
      suffixEn: '.',
      suffixEs: '.',
      correctAnswer: 'housework',
      correctAnswerEs: 'tareas domésticas',
    },
    {
      id: 'act2-s3',
      prefixEn: 'The Agency',
      prefixEs: 'La Agencia',
      blankKey: 'b3',
      suffixEn: '.',
      suffixEs: '.',
      correctAnswer: 'works in places that are nearby or far away',
      correctAnswerEs: 'trabaja en lugares que están cerca o lejos',
    },
  ],
};

// ACTIVIDAD 3 DATA: Newspaper Interview with Mary
export interface Activity3DialogueItem {
  id: string;
  speaker: 'INTERVIEWER' | 'MARY';
  speakerEs: 'ENTREVISTADOR' | 'MARY';
  parts: {
    type: 'text' | 'blank';
    textEn?: string;
    textEs?: string;
    blankId?: string;
    correctAnswer?: string;
  }[];
  fullEn: string;
  fullEs: string;
}

export const ACTIVITY_3_DATA: {
  instructionsEn: string;
  instructionsEs: string;
  bank: { id: string; textEn: string; textEs: string }[];
  dialogue: Activity3DialogueItem[];
} = {
  instructionsEn:
    'The Clean-House Agency is such a success that the newspaper wants to interview Mary. Read the interview, and fill in the missing words.',
  instructionsEs:
    'La Agencia Clean-House tiene tanto éxito que el periódico quiere entrevistar a Mary. Lee la entrevista y completa las palabras que faltan.',
  bank: [
    { id: 'w-agency', textEn: 'agency', textEs: 'agencia' },
    { id: 'w-need', textEn: 'need', textEs: 'necesitan' },
    { id: 'w-clean', textEn: 'clean', textEs: 'limpia' },
    { id: 'w-tired', textEn: 'tired', textEs: 'cansadas' },
    { id: 'w-housework', textEn: 'housework', textEs: 'tareas domésticas' },
    { id: 'w-working', textEn: 'working', textEs: 'trabajando' },
    { id: 'w-everywhere', textEn: 'everywhere', textEs: 'a todas partes' },
    { id: 'w-teach', textEn: 'teach', textEs: 'enseño' },
    { id: 'w-work', textEn: 'work', textEs: 'trabajo' },
  ],
  dialogue: [
    {
      id: 'act3-d1',
      speaker: 'INTERVIEWER',
      speakerEs: 'ENTREVISTADOR',
      parts: [
        {
          type: 'text',
          textEn: 'Hi, Mary. Congratulations on the success of your ',
          textEs: 'Hola, Mary. Felicitaciones por el éxito de tu ',
        },
        {
          type: 'blank',
          blankId: 'act3-b1',
          correctAnswer: 'agency',
        },
        {
          type: 'text',
          textEn: '. How did you think of the idea?',
          textEs: '. ¿Cómo se te ocurrió la idea?',
        },
      ],
      fullEn: 'Hi, Mary. Congratulations on the success of your agency. How did you think of the idea?',
      fullEs: 'Hola, Mary. Felicitaciones por el éxito de tu agencia. ¿Cómo se te ocurrió la idea?',
    },
    {
      id: 'act3-d2',
      speaker: 'MARY',
      speakerEs: 'MARY',
      parts: [
        {
          type: 'text',
          textEn: 'I tried to think of something people really ',
          textEs: 'Intenté pensar en algo que la gente realmente ',
        },
        {
          type: 'blank',
          blankId: 'act3-b2',
          correctAnswer: 'need',
        },
        {
          type: 'text',
          textEn: ", something that I'm good at. My friends always say how ",
          textEs: ', algo en lo que soy buena. Mis amigos siempre dicen lo ',
        },
        {
          type: 'blank',
          blankId: 'act3-b3',
          correctAnswer: 'clean',
        },
        {
          type: 'text',
          textEn: " my house is. I realized that's it! I'll start a cleaning agency. Many people are too busy or ",
          textEs: ' que está mi casa. ¡Me di cuenta de que era eso! Empezaré una agencia de limpieza. Mucha gente está demasiado ocupada o ',
        },
        {
          type: 'blank',
          blankId: 'act3-b4',
          correctAnswer: 'tired',
        },
        {
          type: 'text',
          textEn: ' to do ',
          textEs: ' para hacer las ',
        },
        {
          type: 'blank',
          blankId: 'act3-b5',
          correctAnswer: 'housework',
        },
        {
          type: 'text',
          textEn: '.',
          textEs: '.',
        },
      ],
      fullEn:
        "I tried to think of something people really need, something that I'm good at. My friends always say how clean my house is. I realized that's it! I'll start a cleaning agency. Many people are too busy or tired to do housework.",
      fullEs:
        'Intenté pensar en algo que la gente realmente necesita, algo en lo que soy buena. Mis amigos siempre dicen lo limpia que está mi casa. ¡Me di cuenta de que era eso! Empezaré una agencia de limpieza. Mucha gente está demasiado ocupada o cansada para hacer las tareas domésticas.',
    },
    {
      id: 'act3-d3',
      speaker: 'INTERVIEWER',
      speakerEs: 'ENTREVISTADOR',
      parts: [
        {
          type: 'text',
          textEn: "That's for sure! Who works for you?",
          textEs: '¡Eso es seguro! ¿Quién trabaja para ti?',
        },
      ],
      fullEn: "That's for sure! Who works for you?",
      fullEs: '¡Eso es seguro! ¿Quién trabaja para ti?',
    },
    {
      id: 'act3-d4',
      speaker: 'MARY',
      speakerEs: 'MARY',
      parts: [
        {
          type: 'text',
          textEn: 'I have about 20 people ',
          textEs: 'Tengo alrededor de 20 personas ',
        },
        {
          type: 'blank',
          blankId: 'act3-b6',
          correctAnswer: 'working',
        },
        {
          type: 'text',
          textEn: ' for me, mostly students. They clean everything and go ',
          textEs: ' para mí, en su mayoría estudiantes. Limpian todo y van ',
        },
        {
          type: 'blank',
          blankId: 'act3-b7',
          correctAnswer: 'everywhere',
        },
        {
          type: 'text',
          textEn: '. I ',
          textEs: '. Yo les ',
        },
        {
          type: 'blank',
          blankId: 'act3-b8',
          correctAnswer: 'teach',
        },
        {
          type: 'text',
          textEn: ' them, send them out to jobs, and check their ',
          textEs: ', los envío a los trabajos y reviso su ',
        },
        {
          type: 'blank',
          blankId: 'act3-b9',
          correctAnswer: 'work',
        },
        {
          type: 'text',
          textEn: '.',
          textEs: '.',
        },
      ],
      fullEn:
        'I have about 20 people working for me, mostly students. They clean everything and go everywhere. I teach them, send them out to jobs, and check their work.',
      fullEs:
        'Tengo alrededor de 20 personas trabajando para mí, en su mayoría estudiantes. Limpian todo y van a todas partes. Yo les enseño, los envío a los trabajos y reviso su trabajo.',
    },
    {
      id: 'act3-d5',
      speaker: 'INTERVIEWER',
      speakerEs: 'ENTREVISTADOR',
      parts: [
        {
          type: 'text',
          textEn: 'Well, good luck with this very helpful business.',
          textEs: 'Bueno, mucha suerte con este negocio tan servicial.',
        },
      ],
      fullEn: 'Well, good luck with this very helpful business.',
      fullEs: 'Bueno, mucha suerte con este negocio tan servicial.',
    },
  ],
};

// ACTIVIDAD 4 DATA: 3 Radio Choice Questions
export interface CleanHouseRadioQuestion {
  id: string;
  question: string;
  questionEs: string;
  explanation: string;
  explanationEs: string;
  correctAnswerId: string;
  options: {
    id: string;
    text: string;
    textEs: string;
    isCorrect: boolean;
  }[];
}

export const ACTIVITY_4_DATA: {
  instructionsEn: string;
  instructionsEs: string;
  questions: CleanHouseRadioQuestion[];
} = {
  instructionsEn: 'Choose the correct answer.',
  instructionsEs: 'Elige la respuesta correcta.',
  questions: [
    {
      id: 'act4-q1',
      question: 'Who is the ad for?',
      questionEs: '¿Para quién es el anuncio?',
      explanation:
        'The ad asks "Do you always have a lot of housework? Do you feel tired all the time?", which targets people needing someone to do their housework.',
      explanationEs:
        'El anuncio pregunta "¿Siempre tienes muchas tareas del hogar? ¿Te sientes cansado todo el tiempo?", dirigiéndose a personas que necesitan que alguien haga sus tareas domésticas.',
      correctAnswerId: 'act4-q1-opt2',
      options: [
        {
          id: 'act4-q1-opt1',
          text: 'People who want to work for the Clean-House Agency',
          textEs: 'Personas que quieren trabajar para la Agencia Clean-House',
          isCorrect: false,
        },
        {
          id: 'act4-q1-opt2',
          text: 'People who want somebody to do their housework',
          textEs: 'Personas que quieren que alguien haga sus tareas del hogar',
          isCorrect: true,
        },
        {
          id: 'act4-q1-opt3',
          text: 'People who like cleaning and housework',
          textEs: 'Personas a las que les gusta la limpieza y las tareas del hogar',
          isCorrect: false,
        },
      ],
    },
    {
      id: 'act4-q2',
      question: 'The Clean-House Agency...',
      questionEs: 'La Agencia Clean-House...',
      explanation:
        'The agency sends professional domestic cleaners to clients\' houses to do their cleaning and housework.',
      explanationEs:
        'La agencia envía a un limpiador a la casa del cliente para realizar la limpieza y los quehaceres.',
      correctAnswerId: 'act4-q2-opt2',
      options: [
        {
          id: 'act4-q2-opt1',
          text: 'comes to your house.',
          textEs: 'viene a tu casa.',
          isCorrect: false,
        },
        {
          id: 'act4-q2-opt2',
          text: 'sends a cleaner to your house.',
          textEs: 'envía a un limpiador a tu casa.',
          isCorrect: true,
        },
        {
          id: 'act4-q2-opt3',
          text: 'calls your house.',
          textEs: 'llama a tu casa.',
          isCorrect: false,
        },
      ],
    },
    {
      id: 'act4-q3',
      question: 'Who can use the Clean-House Agency?',
      questionEs: '¿Quién puede usar la Agencia Clean-House?',
      explanation:
        'The ad says "We go everywhere. We do everything! The Clean-House Agency can help you." It is open to everyone who needs help with housework.',
      explanationEs:
        'El anuncio afirma "Vamos a todas partes. ¡Hacemos de todo! La Agencia Clean-House puede ayudarte". Está abierto a todo el mundo que necesite ayuda doméstica.',
      correctAnswerId: 'act4-q3-opt2',
      options: [
        {
          id: 'act4-q3-opt1',
          text: 'Old people only',
          textEs: 'Solo personas mayores',
          isCorrect: false,
        },
        {
          id: 'act4-q3-opt2',
          text: 'Everyone',
          textEs: 'Todos',
          isCorrect: true,
        },
        {
          id: 'act4-q3-opt3',
          text: 'Young people only',
          textEs: 'Solo personas jóvenes',
          isCorrect: false,
        },
      ],
    },
  ],
};

// ACTIVIDAD 5 DATA: Mrs. Atkins phone conversation with Mary
export interface Activity5DialogueItem {
  id: string;
  speaker: string;
  speakerEs: string;
  parts: {
    type: 'text' | 'blank';
    textEn?: string;
    textEs?: string;
    blankId?: string;
    correctAnswer?: string;
  }[];
  fullEn: string;
  fullEs: string;
}

export const ACTIVITY_5_DATA: {
  instructionsEn: string;
  instructionsEs: string;
  bank: { id: string; textEn: string; textEs: string }[];
  dialogue: Activity5DialogueItem[];
} = {
  instructionsEn:
    'Mrs. Atkins needs a cleaner and calls Mary at the Clean-House Agency. Complete the conversation by choosing the words from the bank.',
  instructionsEs:
    'La Sra. Atkins necesita un limpiador y llama a Mary a la Agencia Clean-House. Completa la conversación eligiendo las palabras del banco.',
  bank: [
    { id: 'a5-ad', textEn: 'ad', textEs: 'anuncio' },
    { id: 'a5-housework', textEn: 'housework', textEs: 'tareas domésticas' },
    { id: 'a5-everything', textEn: 'everything', textEs: 'de todo' },
    { id: 'a5-help', textEn: 'help', textEs: 'ayudar' },
  ],
  dialogue: [
    {
      id: 'act5-d1',
      speaker: 'Mrs. Atkins',
      speakerEs: 'Sra. Atkins',
      parts: [
        {
          type: 'text',
          textEn: "Hello Mary, I'm calling about the ",
          textEs: 'Hola Mary, llamo por el ',
        },
        {
          type: 'blank',
          blankId: 'act5-b1',
          correctAnswer: 'ad',
        },
        {
          type: 'text',
          textEn: ' for the Clean-House Agency.',
          textEs: ' de la Agencia Clean-House.',
        },
      ],
      fullEn: "Hello Mary, I'm calling about the ad for the Clean-House Agency.",
      fullEs: 'Hola Mary, llamo por el anuncio de la Agencia Clean-House.',
    },
    {
      id: 'act5-d2',
      speaker: 'Mary',
      speakerEs: 'Mary',
      parts: [
        {
          type: 'text',
          textEn: 'Yes, how can I ',
          textEs: 'Sí, ¿cómo puedo ',
        },
        {
          type: 'blank',
          blankId: 'act5-b2',
          correctAnswer: 'help',
        },
        {
          type: 'text',
          textEn: ' you?',
          textEs: 'le?',
        },
      ],
      fullEn: 'Yes, how can I help you?',
      fullEs: 'Sí, ¿cómo puedo ayudarle?',
    },
    {
      id: 'act5-d3',
      speaker: 'Mrs. Atkins',
      speakerEs: 'Sra. Atkins',
      parts: [
        {
          type: 'text',
          textEn: 'I need someone to do my ',
          textEs: 'Necesito a alguien que haga mis ',
        },
        {
          type: 'blank',
          blankId: 'act5-b3',
          correctAnswer: 'housework',
        },
        {
          type: 'text',
          textEn: ' twice a week.',
          textEs: ' dos veces por semana.',
        },
      ],
      fullEn: 'I need someone to do my housework twice a week.',
      fullEs: 'Necesito a alguien que haga mis tareas domésticas dos veces por semana.',
    },
    {
      id: 'act5-d4',
      speaker: 'Mary',
      speakerEs: 'Mary',
      parts: [
        {
          type: 'text',
          textEn: 'Ok. Well, we do ',
          textEs: 'De acuerdo. Bueno, nosotros hacemos ',
        },
        {
          type: 'blank',
          blankId: 'act5-b4',
          correctAnswer: 'everything',
        },
        {
          type: 'text',
          textEn: '.',
          textEs: '.',
        },
      ],
      fullEn: 'Ok. Well, we do everything.',
      fullEs: 'De acuerdo. Bueno, nosotros hacemos de todo.',
    },
    {
      id: 'act5-d5',
      speaker: 'Mrs. Atkins',
      speakerEs: 'Sra. Atkins',
      parts: [
        {
          type: 'text',
          textEn: 'Great. My address is...',
          textEs: 'Genial. Mi dirección es...',
        },
      ],
      fullEn: 'Great. My address is...',
      fullEs: 'Genial. Mi dirección es...',
    },
  ],
};

// ACTIVIDAD 6 DATA: Writing with AI Feedback
export const ACTIVITY_6_DATA = {
  instructionsEn:
    'Write your answer, review AI feedback, improve it, and mark Done if satisfied or get another AI feedback.',
  instructionsEs:
    'Escribe tu respuesta, revisa la retroalimentación de la IA, mejórala y marca Listo si estás satisfecho o solicita otra retroalimentación.',
  promptEn:
    'Read the ad for Clean-House Agency. Write your own ad. What service do you offer? What advantages does your service give? Give contact details. Send the ad to your teacher.',
  promptEs:
    'Lee el anuncio de la Agencia Clean-House. Escribe tu propio anuncio. ¿Qué servicio ofreces? ¿Qué ventajas ofrece tu servicio? Proporciona detalles de contacto. Envía el anuncio a tu profesor.',
  sampleAnswer:
    "Sparkle Cleaning Service! Do you hate cleaning your windows and carpets? Don't worry! We clean homes and offices quickly and carefully. We have friendly workers and the best prices in town. Call 555-8899 or email us at info@sparkleclean.com. Book your first clean today!",
  sampleAnswerEs:
    '¡Servicio de Limpieza Sparkle! ¿Odias limpiar tus ventanas y alfombras? ¡No te preocupes! Limpiamos hogares y oficinas de manera rápida y cuidadosa. Tenemos trabajadores amables y los mejores precios de la ciudad. Llama al 555-8899 o escríbenos a info@sparkleclean.com. ¡Reserva tu primera limpieza hoy!',
};

// ACTIVIDAD 7 DATA: 5 Tests (Test 1, Test 2, Test 3, Test 4, Test 5)
export interface CleanHouseTestQuestion {
  id: string;
  testNumber: number;
  type: 'radio' | 'drag-drop-cloze';
  instructionsEn: string;
  instructionsEs: string;
  question: string;
  questionEs: string;
  correctAnswerId: string;
  explanation: string;
  explanationEs: string;
  options: {
    id: string;
    text: string;
    textEs: string;
    isCorrect: boolean;
  }[];
}

export const CLEAN_HOUSE_UNIT_TEST_QUESTIONS: CleanHouseTestQuestion[] = [
  // Test 1: True/False
  {
    id: 'ch-test-1',
    testNumber: 1,
    type: 'radio',
    instructionsEn: 'Choose the correct answer.',
    instructionsEs: 'Elige la respuesta correcta.',
    question: 'The Clean-House Agency sends teachers to work in schools.',
    questionEs: 'La Agencia Clean-House envía maestros a trabajar en escuelas.',
    correctAnswerId: 'ch-t1-false',
    explanation:
      'False. The Clean-House Agency provides domestic cleaning services for houses and housework, not teachers for schools.',
    explanationEs:
      'Falso. La Agencia Clean-House ofrece servicios de limpieza doméstica para casas y quehaceres del hogar, no maestros para escuelas.',
    options: [
      { id: 'ch-t1-true', text: 'True', textEs: 'Verdadero', isCorrect: false },
      { id: 'ch-t1-false', text: 'False', textEs: 'Falso', isCorrect: true },
    ],
  },
  // Test 2: True/False
  {
    id: 'ch-test-2',
    testNumber: 2,
    type: 'radio',
    instructionsEn: 'Choose the correct answer.',
    instructionsEs: 'Elige la respuesta correcta.',
    question: "A worker from the Clean-House Agency does work in people's homes.",
    questionEs: 'Un trabajador de la Agencia Clean-House trabaja en los hogares de las personas.',
    correctAnswerId: 'ch-t2-true',
    explanation:
      "True. Cleaners from the Clean-House Agency go to clients' homes to do housework.",
    explanationEs:
      'Verdadero. Los trabajadores de la Agencia Clean-House van a los hogares de los clientes a hacer tareas domésticas.',
    options: [
      { id: 'ch-t2-true', text: 'True', textEs: 'Verdadero', isCorrect: true },
      { id: 'ch-t2-false', text: 'False', textEs: 'Falso', isCorrect: false },
    ],
  },
  // Test 3: Drag the correct answer into place
  {
    id: 'ch-test-3',
    testNumber: 3,
    type: 'drag-drop-cloze',
    instructionsEn: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra o selecciona la respuesta correcta en el espacio en blanco.',
    question: 'You can call the Clean-House Agency to get someone to ________________.',
    questionEs: 'Puedes llamar a la Agencia Clean-House para conseguir a alguien que ________________.',
    correctAnswerId: 'ch-t3-opt2',
    explanation:
      'The Clean-House Agency does housework like washing floors and cleaning homes. It does not repair cars, teach English, or sew clothes.',
    explanationEs:
      'La Agencia Clean-House hace tareas del hogar como lavar pisos y limpiar casas. No repara autos, no enseña inglés ni cose ropa.',
    options: [
      {
        id: 'ch-t3-opt1',
        text: 'repair your car',
        textEs: 'repare tu auto',
        isCorrect: false,
      },
      {
        id: 'ch-t3-opt2',
        text: 'wash the floors in your home',
        textEs: 'lave los pisos de tu casa',
        isCorrect: true,
      },
      {
        id: 'ch-t3-opt3',
        text: 'teach you English',
        textEs: 'te enseñe inglés',
        isCorrect: false,
      },
      {
        id: 'ch-t3-opt4',
        text: 'sew clothes for you',
        textEs: 'te cosa ropa',
        isCorrect: false,
      },
    ],
  },
  // Test 4: Multiple Choice ("we")
  {
    id: 'ch-test-4',
    testNumber: 4,
    type: 'radio',
    instructionsEn: 'Choose the correct answer.',
    instructionsEs: 'Elige la respuesta correcta.',
    question: 'Who is "we" in: "We do everything"?',
    questionEs: '¿Quién es "nosotros" ("we") en: "We do everything"?',
    correctAnswerId: 'ch-t4-opt4',
    explanation:
      'In the advertisement, "we" refers to the business itself: the Clean-House Agency and its staff.',
    explanationEs:
      'En el anuncio, "nosotros" ("we") se refiere a la propia empresa: la Agencia Clean-House y su personal.',
    options: [
      { id: 'ch-t4-opt1', text: 'customers', textEs: 'clientes', isCorrect: false },
      { id: 'ch-t4-opt2', text: 'readers', textEs: 'lectores', isCorrect: false },
      { id: 'ch-t4-opt3', text: 'teachers', textEs: 'maestros', isCorrect: false },
      {
        id: 'ch-t4-opt4',
        text: 'the Clean-House Agency',
        textEs: 'la Agencia Clean-House',
        isCorrect: true,
      },
    ],
  },
  // Test 5: Multiple Choice (Alternative name)
  {
    id: 'ch-test-5',
    testNumber: 5,
    type: 'radio',
    instructionsEn: 'Choose the correct answer.',
    instructionsEs: 'Elige la respuesta correcta.',
    question: 'Another name for the Clean-House Agency could be:',
    questionEs: 'Otro nombre para la Agencia Clean-House podría ser:',
    correctAnswerId: 'ch-t5-opt4',
    explanation:
      '"Call-a-Cleaner" summarizes the agency\'s core service: customers call 555-1155 to get someone to clean their house.',
    explanationEs:
      '"Call-a-Cleaner" (Llama a un Limpiador) resume con exactitud el servicio principal: los clientes llaman al 555-1155 para que alguien limpie su casa.',
    options: [
      {
        id: 'ch-t5-opt1',
        text: 'Go Everywhere Travel Service',
        textEs: 'Servicio de Viajes Vamos a Todas Partes',
        isCorrect: false,
      },
      {
        id: 'ch-t5-opt2',
        text: "Mary's Answering Service",
        textEs: 'Servicio de Contestador de Mary',
        isCorrect: false,
      },
      {
        id: 'ch-t5-opt3',
        text: 'Surprise Service',
        textEs: 'Servicio Sorpresa',
        isCorrect: false,
      },
      {
        id: 'ch-t5-opt4',
        text: 'Call-a-Cleaner',
        textEs: 'Llama a un Limpiador',
        isCorrect: true,
      },
    ],
  },
];
