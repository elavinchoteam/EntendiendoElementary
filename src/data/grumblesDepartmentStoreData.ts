export interface EmailHeader {
  from: string;
  fromEs: string;
  to: string;
  toEs: string;
  subject: string;
  subjectEs: string;
}

export interface EmailSentence {
  id: string;
  en: string;
  es: string;
}

export const TAMMY_EMAIL_HEADER: EmailHeader = {
  from: 'Tammy Gomez',
  fromEs: 'Tammy Gomez',
  to: 'Susan Dunmar',
  toEs: 'Susan Dunmar',
  subject: 'Summer Job',
  subjectEs: 'Trabajo de Verano',
};

export const TAMMY_EMAIL_SENTENCES: EmailSentence[] = [
  {
    id: 's1',
    en: 'Dear Susan,',
    es: 'Querida Susan,',
  },
  {
    id: 's2',
    en: 'Hi! I have a summer job at Grumble\'s Department Store.',
    es: '¡Hola! Tengo un trabajo de verano en la Tienda por Departamentos Grumble\'s.',
  },
  {
    id: 's3',
    en: 'I work on the fifth floor, in the women\'s clothing department.',
    es: 'Trabajo en el quinto piso, en el departamento de ropa femenina.',
  },
  {
    id: 's4',
    en: 'The store is always crowded with a lot of customers.',
    es: 'La tienda siempre está abarrotada con muchos clientes.',
  },
  {
    id: 's5',
    en: 'I have to smile and say: "Can I help you?"',
    es: 'Tengo que sonreír y decir: "¿Le puedo ayudar?"',
  },
  {
    id: 's6',
    en: 'I really want to say: "Go home!"',
    es: 'Realmente tengo ganas de decir: "¡Váyanse a casa!"',
  },
  {
    id: 's7',
    en: 'I usually have to stand all day, and I don\'t have any breaks.',
    es: 'Por lo general tengo que estar de pie todo el día, y no tengo ningún descanso.',
  },
  {
    id: 's8',
    en: 'I need a vacation!',
    es: '¡Necesito unas vacaciones!',
  },
  {
    id: 's9',
    en: 'Tammy',
    es: 'Tammy',
  },
];

export const TAMMY_EMAIL_FULL_EN = `Dear Susan,

Hi! I have a summer job at Grumble's Department Store. I work on the fifth floor, in the women's clothing department. The store is always crowded with a lot of customers. I have to smile and say: "Can I help you?" I really want to say: "Go home!" I usually have to stand all day, and I don't have any breaks. I need a vacation!

Tammy`;

export const TAMMY_EMAIL_FULL_ES = `Querida Susan:

¡Hola! Tengo un trabajo de verano en la Tienda por Departamentos Grumble's. Trabajo en el quinto piso, en el departamento de ropa femenina. La tienda siempre está abarrotada con muchos clientes. Tengo que sonreír y decir: "¿Le puedo ayudar?" Realmente tengo ganas de decir: "¡Váyanse a casa!" Por lo general tengo que estar de pie todo el día, y no tengo ningún descanso. ¡Necesito unas vacaciones!

Tammy`;

// ==========================================
// ACTIVIDAD 2: Multi-select Checkboxes
// ==========================================
export interface CheckboxOption {
  id: string;
  text: string;
  textEs: string;
  isCorrect: boolean;
  explanation: string;
  explanationEs: string;
}

export const ACTIVITY_2_OPTIONS: CheckboxOption[] = [
  {
    id: 'act2-1',
    text: 'It\'s very tiring work because she does not get any breaks.',
    textEs: 'Es un trabajo muy agotador porque no tiene ningún descanso.',
    isCorrect: true,
    explanation: 'Tammy writes: "I usually have to stand all day, and I don\'t have any breaks. I need a vacation!"',
    explanationEs: 'Tammy escribe que pasa parada todo el día sin descansos y necesita vacaciones.',
  },
  {
    id: 'act2-2',
    text: 'She sits for most of the day.',
    textEs: 'Ella pasa sentada la mayor parte del día.',
    isCorrect: false,
    explanation: 'False: Tammy has to stand all day, she does not sit.',
    explanationEs: 'Falso: Tammy tiene que estar de pie todo el día, no se sienta.',
  },
  {
    id: 'act2-3',
    text: 'She wants to tell people to go home.',
    textEs: 'Ella tiene ganas de decirle a la gente que se vaya a casa.',
    isCorrect: true,
    explanation: 'Tammy says: "I really want to say: \'Go home!\'"',
    explanationEs: 'Tammy dice textualmente que en realidad le gustaría decirles que se vayan a casa.',
  },
  {
    id: 'act2-4',
    text: 'She sells women\'s clothing.',
    textEs: 'Ella vende ropa femenina.',
    isCorrect: true,
    explanation: 'Tammy works: "in the women\'s clothing department."',
    explanationEs: 'Trabaja en el departamento de ropa para mujeres.',
  },
  {
    id: 'act2-5',
    text: 'Her job is very boring because there are not many customers.',
    textEs: 'Su trabajo es muy aburrido porque no hay muchos clientes.',
    isCorrect: false,
    explanation: 'False: "The store is always crowded with a lot of customers."',
    explanationEs: 'Falso: la tienda siempre está llena de muchísimos clientes.',
  },
  {
    id: 'act2-6',
    text: 'She works in a department store.',
    textEs: 'Ella trabaja en una tienda por departamentos.',
    isCorrect: true,
    explanation: 'Tammy works "at Grumble\'s Department Store."',
    explanationEs: 'Trabaja en la tienda por departamentos Grumble\'s.',
  },
  {
    id: 'act2-7',
    text: 'She works in the store all year long.',
    textEs: 'Ella trabaja en la tienda durante todo el año.',
    isCorrect: false,
    explanation: 'False: Tammy says "I have a summer job", not a full-year job.',
    explanationEs: 'Falso: es un empleo de verano temporal, no de todo el año.',
  },
];

// ==========================================
// ACTIVIDAD 3: Vocabulary Similar in Meaning
// ==========================================
export interface VocabularyQuestionItem {
  id: string;
  sentence: string;
  sentenceEs: string;
  highlightedWord: string;
  highlightedWordEs: string;
  options: {
    id: string;
    text: string;
    textEs: string;
  }[];
  correctAnswerId: string;
  explanation: string;
  explanationEs: string;
}

export const ACTIVITY_3_QUESTIONS: VocabularyQuestionItem[] = [
  {
    id: 'act3-1',
    sentence: 'The store is always crowded.',
    sentenceEs: 'La tienda siempre está abarrotada.',
    highlightedWord: 'crowded',
    highlightedWordEs: 'abarrotada / llena de gente',
    options: [
      { id: 'a', text: 'busy', textEs: 'ocupada' },
      { id: 'b', text: 'empty', textEs: 'vacía' },
      { id: 'c', text: 'full of people', textEs: 'llena de personas' },
      { id: 'd', text: 'very noisy', textEs: 'muy ruidosa' },
    ],
    correctAnswerId: 'c',
    explanation: '"Crowded" means containing a lot of people ("full of people").',
    explanationEs: '"Crowded" significa abarrotado o lleno de personas ("full of people").',
  },
  {
    id: 'act3-2',
    sentence: 'Tammy works in the area of the store that sells women\'s clothing.',
    sentenceEs: 'Tammy trabaja en el área de la tienda que vende ropa femenina.',
    highlightedWord: 'area of the store',
    highlightedWordEs: 'área o sección de la tienda',
    options: [
      { id: 'a', text: 'basement', textEs: 'sótano' },
      { id: 'b', text: 'vacation', textEs: 'vacaciones' },
      { id: 'c', text: 'crowd', textEs: 'multitud' },
      { id: 'd', text: 'department', textEs: 'departamento / sección' },
    ],
    correctAnswerId: 'd',
    explanation: 'A specific section or area in a large store is called a "department".',
    explanationEs: 'Una sección o área especializada de una tienda se llama "department".',
  },
  {
    id: 'act3-3',
    sentence: 'After working hard all summer, Tammy needs to get away.',
    sentenceEs: 'Después de trabajar duro todo el verano, Tammy necesita desconectarse / viajar.',
    highlightedWord: 'to get away',
    highlightedWordEs: 'desconectarse / tomarse un descanso',
    options: [
      { id: 'a', text: 'to study', textEs: 'estudiar' },
      { id: 'b', text: 'to go to sleep', textEs: 'ir a dormir' },
      { id: 'c', text: 'to go on vacation', textEs: 'irse de vacaciones' },
      { id: 'd', text: 'to sell some clothes', textEs: 'vender algo de ropa' },
    ],
    correctAnswerId: 'c',
    explanation: '"To get away" means to take a break from routine and go on vacation.',
    explanationEs: '"To get away" es una expresión que significa tomarse un respiro e irse de vacaciones.',
  },
];

// ==========================================
// ACTIVIDAD 4: Best answers (2 Questions)
// ==========================================
export interface BestAnswerQuestion {
  id: string;
  type: 'single' | 'multi';
  question: string;
  questionEs: string;
  options: {
    id: string;
    text: string;
    textEs: string;
    isCorrect: boolean;
  }[];
  explanation: string;
  explanationEs: string;
}

export const ACTIVITY_4_QUESTIONS: BestAnswerQuestion[] = [
  {
    id: 'act4-q1',
    type: 'single',
    question: 'Tammy has a summer job. This means...',
    questionEs: 'Tammy tiene un trabajo de verano. Esto significa que...',
    options: [
      { id: 'a', text: 'she stays at home.', textEs: 'se queda en casa.', isCorrect: false },
      { id: 'b', text: 'she works all year.', textEs: 'trabaja todo el año.', isCorrect: false },
      { id: 'c', text: 'she works over the summer.', textEs: 'trabaja durante el verano.', isCorrect: true },
      { id: 'd', text: 'she works in the winter only.', textEs: 'trabaja sólo en invierno.', isCorrect: false },
    ],
    explanation: 'A "summer job" is temporary work done specifically during the summer months.',
    explanationEs: 'Un "summer job" es un empleo temporal realizado durante el período de verano.',
  },
  {
    id: 'act4-q2',
    type: 'multi',
    question: 'Which things can you buy in a department store?',
    questionEs: '¿Qué cosas puedes comprar en una tienda por departamentos?',
    options: [
      { id: 'a', text: 'Cars', textEs: 'Autos', isCorrect: false },
      { id: 'b', text: 'Shoes', textEs: 'Zapatos', isCorrect: true },
      { id: 'c', text: 'Electrical goods', textEs: 'Artículos electrodomésticos / electrónicos', isCorrect: true },
      { id: 'd', text: 'Dogs', textEs: 'Perros', isCorrect: false },
      { id: 'e', text: 'Clothes', textEs: 'Ropa', isCorrect: true },
    ],
    explanation: 'Department stores sell consumer retail goods like shoes, electronics, and clothing, but not cars or live dogs.',
    explanationEs: 'En tiendas por departamento se venden calzado, electrodomésticos y prendas de vestir, no automóviles ni animales vivos.',
  },
];

// ==========================================
// ACTIVIDAD 5: True sentences about Tammy
// ==========================================
export const ACTIVITY_5_OPTIONS: CheckboxOption[] = [
  {
    id: 'act5-1',
    text: 'Tammy is telling her friend Susan about her job.',
    textEs: 'Tammy le está contando a su amiga Susan sobre su trabajo.',
    isCorrect: true,
    explanation: 'The email is addressed "Dear Susan," describing her summer job.',
    explanationEs: 'El correo electrónico empieza con "Dear Susan," y le relata su trabajo.',
  },
  {
    id: 'act5-2',
    text: 'Tammy can sit down whenever she wants.',
    textEs: 'Tammy puede sentarse cuando quiera.',
    isCorrect: false,
    explanation: 'False: "I usually have to stand all day, and I don\'t have any breaks."',
    explanationEs: 'Falso: tiene que estar parada todo el día y no tiene descansos.',
  },
  {
    id: 'act5-3',
    text: 'Tammy has to say "Can I help you?"',
    textEs: 'Tammy tiene que decir "¿Le puedo ayudar?"',
    isCorrect: true,
    explanation: 'Tammy says: "I have to smile and say: \'Can I help you?\'"',
    explanationEs: 'Tammy indica que por norma de atención al cliente tiene que sonreír y preguntar "¿Le puedo ayudar?".',
  },
  {
    id: 'act5-4',
    text: 'Tammy doesn\'t like smiling at the customers.',
    textEs: 'A Tammy no le agrada tener que sonreírles a los clientes.',
    isCorrect: true,
    explanation: 'She is exhausted and says: "I really want to say: \'Go home!\'"',
    explanationEs: 'Está agobiada y en el fondo preferiría decirles que se vayan a casa.',
  },
  {
    id: 'act5-5',
    text: 'Tammy tells them to go home.',
    textEs: 'Tammy les dice que se vayan a casa.',
    isCorrect: false,
    explanation: 'False: She only *wants* to say it, she doesn\'t actually say it to them.',
    explanationEs: 'Falso: ella sólo *tiene ganas* de decirlo en su interior, pero no se los dice en la realidad.',
  },
];

// ==========================================
// ACTIVIDAD 6: Cloze Radio Interview (7 Gaps)
// ==========================================
export interface ClozeGapItem {
  id: string;
  gapIndex: number;
  expectedWord: string;
  expectedWordEs: string;
}

export interface InterviewDialogueLine {
  id: string;
  speaker: 'Interviewer' | 'Tammy';
  speakerEs: string;
  parts: {
    text?: string;
    gapIndex?: number;
  }[];
  translationEs: string;
}

export const ACTIVITY_6_WORDS = [
  'Department Store',
  'smile',
  'clothing department',
  'vacation',
  'breaks',
  'job',
  'stand',
];

export const ACTIVITY_6_WORDS_ES: Record<string, string> = {
  'Department Store': 'Tienda por Departamentos',
  smile: 'sonreír',
  'clothing department': 'departamento de ropa',
  vacation: 'vacaciones',
  breaks: 'descansos',
  job: 'trabajo / empleo',
  stand: 'estar de pie / parada',
};

export const ACTIVITY_6_DIALOGUE: InterviewDialogueLine[] = [
  {
    id: 'd1',
    speaker: 'Interviewer',
    speakerEs: 'Entrevistador',
    parts: [
      { text: 'So, Tammy, you have a summer ' },
      { gapIndex: 0 }, // job
      { text: ' ?' },
    ],
    translationEs: 'Entonces, Tammy, ¿tienes un trabajo de verano?',
  },
  {
    id: 'd2',
    speaker: 'Tammy',
    speakerEs: 'Tammy',
    parts: [
      { text: "Yes. I work at Grumble's " },
      { gapIndex: 1 }, // Department Store
      { text: ' .' },
    ],
    translationEs: "Sí. Trabajo en la Tienda por Departamentos Grumble's.",
  },
  {
    id: 'd3',
    speaker: 'Interviewer',
    speakerEs: 'Entrevistador',
    parts: [
      { text: 'And what do you do there?' },
    ],
    translationEs: '¿Y qué haces allí?',
  },
  {
    id: 'd4',
    speaker: 'Tammy',
    speakerEs: 'Tammy',
    parts: [
      { text: "I work in the women's " },
      { gapIndex: 2 }, // clothing department
      { text: ' .' },
    ],
    translationEs: 'Trabajo en el departamento de ropa femenina.',
  },
  {
    id: 'd5',
    speaker: 'Interviewer',
    speakerEs: 'Entrevistador',
    parts: [
      { text: 'That means you have to ' },
      { gapIndex: 3 }, // stand
      { text: ' all day, right?!' },
    ],
    translationEs: '¡¿Eso significa que tienes que estar de pie todo el día, verdad?!',
  },
  {
    id: 'd6',
    speaker: 'Tammy',
    speakerEs: 'Tammy',
    parts: [
      { text: "Yes, and I don't have any " },
      { gapIndex: 4 }, // breaks
      { text: '. I just have to ' },
      { gapIndex: 5 }, // smile
      { text: ' and be nice.' },
    ],
    translationEs: 'Sí, y no tengo ningún descanso. Sólo tengo que sonreír y ser amable.',
  },
  {
    id: 'd7',
    speaker: 'Interviewer',
    speakerEs: 'Entrevistador',
    parts: [
      { text: 'You need a ' },
      { gapIndex: 6 }, // vacation
      { text: ' !' },
    ],
    translationEs: '¡Necesitas unas vacaciones!',
  },
];

export const ACTIVITY_6_CORRECT_ANSWERS = [
  'job',
  'Department Store',
  'clothing department',
  'stand',
  'breaks',
  'smile',
  'vacation',
];

// ==========================================
// ACTIVIDAD 7: Writing AI Prompt
// ==========================================
export const ACTIVITY_7_PROMPT = {
  instructionEn:
    'Write your answer, review AI feedback, improve it, and mark Done if satisfied or get another AI feedback.',
  instructionEs:
    'Escribe tu respuesta, revisa la retroalimentación de la IA, mejórala y márcala como completada o solicita otra revisión.',
  taskEn:
    "You have a summer job working in a shoe store. Write an e-mail to your friend. What do you like about your job? What don't you like about it? Is the store crowded? Do you get many breaks? Send the e-mail to your teacher.",
  taskEs:
    'Tienes un trabajo de verano en una zapatería. Escríbele un correo electrónico a tu amigo/a. ¿Qué te gusta de tu trabajo? ¿Qué no te gusta? ¿La tienda está abarrotada? ¿Tienes muchos descansos? Envía el correo electrónico a tu profesor/a.',
  sampleEmailEn: `Dear Alex,

Hi! I have a summer job at City Shoes on Main Street. I work in the sports sneakers section. The store is usually very crowded on weekends.

I like helping people find cool shoes, and the discount on sneakers is great! However, I don't like having to stand all afternoon. My feet really hurt, and I only get one fifteen-minute break.

How is your summer going? Let's meet up this Sunday!

Best,
Chris`,
  sampleEmailEs: `Querido Alex:

¡Hola! Tengo un empleo de verano en City Shoes en Main Street. Trabajo en la sección de zapatillas deportivas. La tienda suele estar muy llena los fines de semana.

Me gusta ayudar a la gente a encontrar calzado genial, ¡y el descuento en zapatillas es fantástico! Sin embargo, no me gusta tener que estar de pie toda la tarde. Me duelen mucho los pies y sólo tengo un descanso de quince minutos.

¿Cómo va tu verano? ¡Juntémonos este domingo!

Saludos,
Chris`,
};

// ==========================================
// 5 TESTS: Grumble's Department Store
// ==========================================
export interface GrumblesTestQuestion {
  id: string;
  number: number;
  question: string;
  questionEs: string;
  options: {
    id: string;
    text: string;
    textEs: string;
  }[];
  correctAnswerId: string;
  explanation: string;
  explanationEs: string;
}

export const GRUMBLES_TESTS: GrumblesTestQuestion[] = [
  // Test 1 (test_1_ad841aab.png)
  {
    id: 'test-1',
    number: 1,
    question: 'Tammy is enjoying her summer job.',
    questionEs: 'Tammy está disfrutando de su trabajo de verano.',
    options: [
      { id: 'true', text: 'True', textEs: 'Verdadero' },
      { id: 'false', text: 'False', textEs: 'Falso' },
    ],
    correctAnswerId: 'false',
    explanation: 'False: Tammy has to stand all day, gets no breaks, wants to tell people to go home, and urgently needs a vacation.',
    explanationEs: 'Falso: Tammy tiene que estar de pie todo el día sin descansos, desearía que los clientes se fueran a casa y necesita vacaciones.',
  },
  // Test 2 (test_2_9d500720.png)
  {
    id: 'test-2',
    number: 2,
    question: 'Susan told another friend that:',
    questionEs: 'Susan le contó a otra amiga que:',
    options: [
      {
        id: 'a',
        text: 'Tammy is bored, but thinks the job is good.',
        textEs: 'Tammy está aburrida, pero piensa que el trabajo es bueno.',
      },
      {
        id: 'b',
        text: "Tammy is working, but she doesn't like the job.",
        textEs: 'Tammy está trabajando, pero no le gusta el trabajo.',
      },
      {
        id: 'c',
        text: "Tammy is on vacation at Grumble's Department Store.",
        textEs: "Tammy está de vacaciones en Grumble's Department Store.",
      },
      {
        id: 'd',
        text: 'Tammy has a great summer job that she likes.',
        textEs: 'Tammy tiene un excelente trabajo de verano que le agrada.',
      },
    ],
    correctAnswerId: 'b',
    explanation: 'Tammy is working hard for the summer, but her email makes it clear that she is unhappy with the conditions.',
    explanationEs: 'Tammy está trabajando en el verano, pero en su correo deja muy en claro que no le gusta el trabajo por lo agotador que es.',
  },
  // Test 3 (test_3_1fe636ac.png)
  {
    id: 'test-3',
    number: 3,
    question: 'Why does Tammy need a vacation?',
    questionEs: '¿Por qué necesita Tammy unas vacaciones?',
    options: [
      {
        id: 'a',
        text: 'She stands all day on a broken leg.',
        textEs: 'Está parada todo el día con una pierna fracturada.',
      },
      {
        id: 'b',
        text: "She doesn't help any smiling customers.",
        textEs: 'No ayuda a ningún cliente sonriente.',
      },
      {
        id: 'c',
        text: 'She works on the fifth floor.',
        textEs: 'Trabaja en el quinto piso.',
      },
      {
        id: 'd',
        text: 'She stands all day without taking a break.',
        textEs: 'Pasa de pie todo el día sin tomar ningún descanso.',
      },
    ],
    correctAnswerId: 'd',
    explanation: 'She writes: "I usually have to stand all day, and I don\'t have any breaks. I need a vacation!"',
    explanationEs: 'Escribe textualmente: "Por lo general tengo que estar de pie todo el día, y no tengo ningún descanso. ¡Necesito unas vacaciones!".',
  },
  // Test 4 (test_4_b2a2027a.png)
  {
    id: 'test-4',
    number: 4,
    question: "What is the main idea in Tammy's e-mail?",
    questionEs: '¿Cuál es la idea principal en el correo de Tammy?',
    options: [
      {
        id: 'a',
        text: "Grumble's Department Store",
        textEs: 'La Tienda por Departamentos Grumble\'s',
      },
      {
        id: 'b',
        text: 'the women in the department',
        textEs: 'las mujeres del departamento',
      },
      {
        id: 'c',
        text: 'the fifth floor',
        textEs: 'el quinto piso',
      },
      {
        id: 'd',
        text: "Tammy's job",
        textEs: 'El trabajo de Tammy',
      },
    ],
    correctAnswerId: 'd',
    explanation: 'The entire email describes Tammy\'s summer job, what she does, and her feelings about it.',
    explanationEs: 'El tema central y la idea principal del correo es relatar cómo es el trabajo de Tammy.',
  },
  // Test 5 (test_5_6470aa9f.png)
  {
    id: 'test-5',
    number: 5,
    question: 'The store always has many people in it.',
    questionEs: 'La tienda siempre tiene muchas personas dentro.',
    options: [
      { id: 'true', text: 'True', textEs: 'Verdadero' },
      { id: 'false', text: 'False', textEs: 'Falso' },
    ],
    correctAnswerId: 'true',
    explanation: 'Tammy states: "The store is always crowded with a lot of customers."',
    explanationEs: 'Verdadero: Tammy afirma: "La tienda siempre está abarrotada con un montón de clientes".',
  },
];
