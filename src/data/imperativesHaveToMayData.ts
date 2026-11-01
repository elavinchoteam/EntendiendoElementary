export interface GrammarTopic {
  id: string;
  category: string;
  categoryEs: string;
  titleEn: string;
  titleEs: string;
  formulaEn?: string;
  formulaEs?: string;
  textEn: string;
  textEs: string;
  examples: { en: string; es: string }[];
  grammarTipEn: string;
  grammarTipEs: string;
}

export interface Exercise1Item {
  id: string;
  number: number;
  sentenceBefore: string;
  sentenceAfter: string;
  sentenceBeforeEs: string;
  sentenceAfterEs: string;
  acceptableAnswers: string[];
  suggestedAnswer: string;
  suggestedAnswerEs: string;
  fullSentence: string;
  translation: string;
  explanation: string;
}

export interface MultipleChoiceOption {
  key: string;
  text: string;
  textEs: string;
}

export interface MultipleChoiceItem {
  id: string;
  number: number;
  question: string;
  questionEs: string;
  options: MultipleChoiceOption[];
  correctAnswer: string;
  fullSentence: string;
  translation: string;
  explanation: string;
}

export interface HaveToItem {
  id: string;
  number: number;
  subject: string;
  subjectEs: string;
  restOfSentence: string;
  restOfSentenceEs: string;
  correctAnswer: 'have to' | 'has to';
  optionsEs: { key: 'have to' | 'has to'; text: string; textEs: string }[];
  fullSentence: string;
  translation: string;
  explanation: string;
}

/* =========================================================================
   1. TEORÍA Y REGLAS GRAMATICALES (TARJETAS REVERSIBLES 3D)
   ========================================================================= */
export const IMPERATIVES_THEORY: GrammarTopic[] = [
  {
    id: 'imperatives-core',
    category: '1. Imperatives',
    categoryEs: '1. Modo Imperativo',
    titleEn: 'Instructions and Commands',
    titleEs: 'Instrucciones y Órdenes',
    formulaEn: 'Affirmative: [Base Form] | Negative: Don’t + [Base Form]',
    formulaEs: 'Afirmativo: [Verbo Base] | Negativo: Don’t + [Verbo Base]',
    textEn:
      'We use the imperative to give instructions, direct orders, warnings, or friendly advice. Unlike normal sentences, the imperative has no written subject pronoun because "you" is understood.',
    textEs:
      'Usamos el imperativo para dar instrucciones, órdenes directas, advertencias o consejos. A diferencia de las oraciones normales, no lleva sujeto escrito porque se sobreentiende "tú / usted / ustedes".',
    examples: [
      { en: 'Open the window.', es: 'Abre la ventana.' },
      { en: 'Sit down.', es: 'Siéntate.' },
      { en: 'Be careful.', es: 'Ten cuidado.' },
      { en: 'Turn off your phone.', es: 'Apaga tu teléfono.' },
      { en: "Don't touch that!", es: '¡No toques eso!' },
      { en: "Don't run here.", es: 'No corras aquí.' },
      { en: "Don't be late.", es: 'No llegues tarde.' },
      { en: "Don't open the door.", es: 'No abras la puerta.' },
    ],
    grammarTipEn:
      'Never use "to", "-ing" or "-s" with imperatives. For negatives, always use "Don\'t", never "Not".',
    grammarTipEs:
      'Nunca uses "to", "-ing" ni "-s" en imperativos. Para negar, usa siempre "Don\'t", nunca "Not".',
  },
  {
    id: 'have-to-has-to',
    category: '2. Have to / Has to',
    categoryEs: '2. Have to / Has to',
    titleEn: 'Obligation and External Necessity',
    titleEs: 'Obligación y Necesidad Externa',
    formulaEn: 'I/You/We/They have to | He/She/It has to + [Base Form]',
    formulaEs: 'I/You/We/They have to | He/She/It has to + [Verbo Base]',
    textEn:
      'We use "have to" and "has to" to talk about obligations, rules, or things that are necessary because of an external requirement (laws, company rules, timetables).',
    textEs:
      'Usamos "have to" y "has to" para hablar sobre obligaciones, normas o cosas necesarias debido a una exigencia externa (leyes, reglas del trabajo, horarios).',
    examples: [
      { en: 'I have to work tomorrow.', es: 'Tengo que trabajar mañana.' },
      { en: 'She has to wear a uniform.', es: 'Ella tiene que usar uniforme.' },
      { en: "You don't have to come early.", es: 'No es necesario que vengas temprano.' },
      { en: "He doesn't have to work on Sundays.", es: 'Él no tiene que trabajar los domingos.' },
      { en: 'Do you have to wear a uniform?', es: '¿Tienes que usar uniforme?' },
      { en: 'Does she have to get up early?', es: '¿Tiene ella que levantarse temprano?' },
    ],
    grammarTipEn:
      'Important: "don\'t / doesn\'t have to" means it is NOT necessary (absence of obligation). After "does / doesn\'t", return to "have to", never "has to"!',
    grammarTipEs:
      'Importante: "don\'t / doesn\'t have to" significa que NO es necesario. Tras "does / doesn\'t", el verbo vuelve a "have to", nunca "has to".',
  },
  {
    id: 'may-permission-possibility',
    category: '3. May',
    categoryEs: '3. Verbo Modal May',
    titleEn: 'Permission and Possibility',
    titleEs: 'Permiso Formal y Posibilidad',
    formulaEn: 'May + [Base Form] (No "-s", no "to", no "-ing")',
    formulaEs: 'May + [Verbo Base] (Sin "-s", sin "to", sin "-ing")',
    textEn:
      'We use "may" in two common ways: A) Formal Permission (asking or giving permission polite and respectfully), and B) Possibility (something that might happen in the future or present).',
    textEs:
      'Usamos "may" de dos formas principales: A) Permiso Formal (pedir o conceder permiso educadamente), y B) Posibilidad (algo que quizás o tal vez ocurra en el presente o futuro).',
    examples: [
      { en: 'May I come in?', es: '¿Puedo pasar? (Permiso formal)' },
      { en: 'May I use your phone?', es: '¿Puedo usar tu teléfono? (Permiso)' },
      { en: 'You may leave now.', es: 'Podés retirarte ahora. (Conceder permiso)' },
      { en: 'It may rain tomorrow.', es: 'Quizás llueva mañana. (Posibilidad)' },
      { en: 'She may be at home.', es: 'Quizás esté en casa. (Posibilidad)' },
      { en: 'She may come later.', es: 'Correcto: She may come later (NO: She may comes).' },
    ],
    grammarTipEn:
      'Modal rule: "may" never adds "-s" with he/she/it and is always followed directly by the base infinitive without "to".',
    grammarTipEs:
      'Regla modal: "may" nunca añade "-s" con he/she/it y va seguido directamente del verbo base sin "to".',
  },
  {
    id: 'summary-mixed-rules',
    category: '4. Summary & Trap Guide',
    categoryEs: '4. Resumen y Trampas Frecuentes',
    titleEn: 'Imperatives vs Have to vs May',
    titleEs: 'Comparativa: Imperativos vs Have to vs May',
    formulaEn: 'Imperative = Command | Have to = Obligation | May = Permission/Possibility',
    formulaEs: 'Imperativo = Orden | Have to = Obligación | May = Permiso/Posibilidad',
    textEn:
      'Notice the differences: An imperative directly tells someone what to do ("Turn off your phone!"). "Have to" describes an obligation ("You have to turn off your phone"). "May" indicates permission or possibility ("You may turn on your phone now / It may ring").',
    textEs:
      'Observa las diferencias: El imperativo ordena directamente qué hacer ("¡Apaga tu teléfono!"). "Have to" describe la obligación ("Tienes que apagar tu teléfono"). "May" indica permiso o posibilidad ("Puedes encender tu teléfono ahora / Quizás suene").',
    examples: [
      { en: 'Wash your hands. (Imperative command)', es: 'Lávate las manos. (Orden/instrucción)' },
      { en: 'You have to wash your hands. (Requirement)', es: 'Tienes que lavarte las manos. (Requisito obligatorio)' },
      { en: 'May I wash my hands? (Polite request)', es: '¿Puedo lavarme las manos? (Petición de permiso educada)' },
      { en: 'It may snow tonight. (Chance/possibility)', es: 'Quizás nieve esta noche. (Posibilidad)' },
    ],
    grammarTipEn:
      'Check the question structure: "Do/Does + subject + have to" vs "May + subject + base verb".',
    grammarTipEs:
      'Revisa la estructura de preguntas: "Do/Does + sujeto + have to" frente a "May + sujeto + verbo base".',
  },
];

/* =========================================================================
   EXERCISE 1 – COMPLETE THE SENTENCES (IMPERATIVES)
   ========================================================================= */
export const EXERCISE_1_ITEMS: Exercise1Item[] = [
  {
    id: 'ex1-1',
    number: 1,
    sentenceBefore: '',
    sentenceAfter: 'your name here.',
    sentenceBeforeEs: '',
    sentenceAfterEs: 'tu nombre aquí.',
    acceptableAnswers: ['write', 'sign', 'put'],
    suggestedAnswer: 'Write',
    suggestedAnswerEs: 'Escribe',
    fullSentence: 'Write your name here.',
    translation: 'Escribe tu nombre aquí.',
    explanation:
      'En formularios o registros se utiliza el imperativo afirmativo en forma base: "Write your name here" (Escribe tu nombre aquí).',
  },
  {
    id: 'ex1-2',
    number: 2,
    sentenceBefore: '',
    sentenceAfter: 'your phone during the exam.',
    sentenceBeforeEs: '',
    sentenceAfterEs: 'tu teléfono durante el examen.',
    acceptableAnswers: ["don't use", 'dont use', 'turn off', "don't look at"],
    suggestedAnswer: "Don't use",
    suggestedAnswerEs: 'No uses',
    fullSentence: "Don't use your phone during the exam.",
    translation: 'No uses tu teléfono durante el examen.',
    explanation:
      'Prohibición o instrucción negativa en un examen: "Don\'t use" o "Turn off" (No uses / Apaga tu teléfono).',
  },
  {
    id: 'ex1-3',
    number: 3,
    sentenceBefore: '',
    sentenceAfter: 'careful when you cross the street.',
    sentenceBeforeEs: '',
    sentenceAfterEs: 'cuidado cuando cruces la calle.',
    acceptableAnswers: ['be'],
    suggestedAnswer: 'Be',
    suggestedAnswerEs: 'Ten',
    fullSentence: 'Be careful when you cross the street.',
    translation: 'Ten cuidado cuando cruces la calle.',
    explanation:
      'La colocación para "tener cuidado" en inglés es "Be careful" (forma base del verbo be).',
  },
  {
    id: 'ex1-4',
    number: 4,
    sentenceBefore: '',
    sentenceAfter: 'on the grass.',
    sentenceBeforeEs: '',
    sentenceAfterEs: 'sobre el césped.',
    acceptableAnswers: ["don't walk", 'dont walk', "don't step", 'dont step', "don't play"],
    suggestedAnswer: "Don't walk",
    suggestedAnswerEs: 'No camines / No pises',
    fullSentence: "Don't walk on the grass.",
    translation: 'No camines sobre el césped.',
    explanation:
      'Letrero y advertencia típica en parques y jardines: "Don\'t walk on the grass" (No pises / camines sobre el césped).',
  },
  {
    id: 'ex1-5',
    number: 5,
    sentenceBefore: '',
    sentenceAfter: 'the door, please.',
    sentenceBeforeEs: '',
    sentenceAfterEs: 'la puerta, por favor.',
    acceptableAnswers: ['close', 'open', 'shut'],
    suggestedAnswer: 'Close',
    suggestedAnswerEs: 'Cierra',
    fullSentence: 'Close the door, please.',
    translation: 'Cierra la puerta, por favor.',
    explanation:
      'Petición o instrucción educada con please: "Close the door, please" o "Open the door, please".',
  },
  {
    id: 'ex1-6',
    number: 6,
    sentenceBefore: '',
    sentenceAfter: 'your homework right now !',
    sentenceBeforeEs: '',
    sentenceAfterEs: 'tu tarea ahora mismo !',
    acceptableAnswers: ['do', 'finish', 'complete'],
    suggestedAnswer: 'Do',
    suggestedAnswerEs: 'Haz',
    fullSentence: 'Do your homework right now !',
    translation: '¡Haz tu tarea ahora mismo!',
    explanation:
      'La colocación estándar en inglés para hacer deberes es "Do your homework".',
  },
  {
    id: 'ex1-7',
    number: 7,
    sentenceBefore: '',
    sentenceAfter: 'quiet, please.',
    sentenceBeforeEs: '',
    sentenceAfterEs: 'en silencio, por favor.',
    acceptableAnswers: ['be', 'stay', 'keep'],
    suggestedAnswer: 'Be',
    suggestedAnswerEs: 'Guarda / Sé',
    fullSentence: 'Be quiet, please.',
    translation: 'Guarda silencio, por favor / Estén quietos, por favor.',
    explanation:
      'La expresión común para pedir silencio o calma es "Be quiet, please".',
  },
  {
    id: 'ex1-8',
    number: 8,
    sentenceBefore: '',
    sentenceAfter: 'your password with anyone.',
    sentenceBeforeEs: '',
    sentenceAfterEs: 'tu contraseña con nadie.',
    acceptableAnswers: ["don't share", 'dont share', 'never share', "don't give"],
    suggestedAnswer: "Don't share",
    suggestedAnswerEs: 'No compartas',
    fullSentence: "Don't share your password with anyone.",
    translation: 'No compartas tu contraseña con nadie.',
    explanation:
      'Instrucción de seguridad negativa: "Don\'t share" (No compartas tu contraseña).',
  },
];

export const EXERCISE_1_WORD_BANK = [
  { en: 'Write', es: 'Escribe' },
  { en: "Don't use", es: 'No uses' },
  { en: 'Be', es: 'Ten / Sé' },
  { en: "Don't walk", es: 'No camines' },
  { en: 'Close', es: 'Cierra' },
  { en: 'Do', es: 'Haz' },
  { en: 'Be', es: 'Guarda (silencio)' },
  { en: "Don't share", es: 'No compartas' },
];

/* =========================================================================
   EXERCISE 2 – CHOOSE THE CORRECT OPTION (IMPERATIVES)
   ========================================================================= */
export const EXERCISE_2_ITEMS: MultipleChoiceItem[] = [
  {
    id: 'ex2-1',
    number: 1,
    question: '________ your hands before eating.',
    questionEs: '________ tus manos antes de comer.',
    options: [
      { key: 'a', text: 'Wash', textEs: 'Lávate (Imperativo afirmativo en forma base simple)' },
      { key: 'b', text: "Don't wash", textEs: 'No te laves (Sentido negativo opuesto al recomendado)' },
      { key: 'c', text: 'Washing', textEs: 'Lavándote (Gerundio con -ing, no forma imperativo)' },
    ],
    correctAnswer: 'a',
    fullSentence: 'Wash your hands before eating.',
    translation: 'Lávate las manos antes de comer.',
    explanation:
      'La instrucción positiva de higiene requiere la forma base del verbo sin -ing: "Wash" (opción a).',
  },
  {
    id: 'ex2-2',
    number: 2,
    question: "________ that button! It's dangerous.",
    questionEs: '¡________ ese botón! Es peligroso.',
    options: [
      { key: 'a', text: 'Press', textEs: 'Presiona (Peligroso, contradice la advertencia)' },
      { key: 'b', text: "Don't press", textEs: 'No presiones (Imperativo negativo correcto: Don’t + verbo base)' },
      { key: 'c', text: 'Not press', textEs: 'No presionar (Gramaticalmente incorrecto: falta el auxiliar Don’t)' },
    ],
    correctAnswer: 'b',
    fullSentence: "Don't press that button! It's dangerous.",
    translation: '¡No presiones ese botón! Es peligroso.',
    explanation:
      'Si es peligroso, la orden debe ser negativa. El imperativo negativo siempre se forma con "Don\'t" + verbo base: "Don\'t press" (opción b).',
  },
  {
    id: 'ex2-3',
    number: 3,
    question: '________ late for your interview.',
    questionEs: '________ tarde a tu entrevista.',
    options: [
      { key: 'a', text: "Don't be", textEs: 'No llegues / No estés (Imperativo negativo correcto del verbo be)' },
      { key: 'b', text: 'Not be', textEs: 'No ser/estar (Estructura incorrecta sin el auxiliar Don’t)' },
      { key: 'c', text: "Don't to be", textEs: 'No estar (Error gramatical: el imperativo nunca lleva "to")' },
    ],
    correctAnswer: 'a',
    fullSentence: "Don't be late for your interview.",
    translation: 'No llegues tarde a tu entrevista.',
    explanation:
      'Para negar el verbo be en imperativo decimos "Don\'t be". "Not be" y "Don\'t to be" son gramaticalmente incorrectos (opción a).',
  },
  {
    id: 'ex2-4',
    number: 4,
    question: '________ the instructions carefully.',
    questionEs: '________ las instrucciones con atención.',
    options: [
      { key: 'a', text: 'Read', textEs: 'Lee (Imperativo afirmativo en forma base simple)' },
      { key: 'b', text: 'To read', textEs: 'Leer (Infinitivo con "to", incorrecto para dar órdenes)' },
      { key: 'c', text: 'Reads', textEs: 'Lee en tercera persona (Terminación "-s" incorrecta en imperativo)' },
    ],
    correctAnswer: 'a',
    fullSentence: 'Read the instructions carefully.',
    translation: 'Lee las instrucciones con atención.',
    explanation:
      'El imperativo afirmativo utiliza la forma base simple del verbo sin "to" ni terminación en "s": "Read" (opción a).',
  },
];

/* =========================================================================
   EXERCISE 3 – COMPLETE WITH HAVE TO OR HAS TO
   ========================================================================= */
export const EXERCISE_3_ITEMS: HaveToItem[] = [
  {
    id: 'ex3-1',
    number: 1,
    subject: 'I',
    subjectEs: 'Yo',
    restOfSentence: 'get up at 6 a.m. on weekdays.',
    restOfSentenceEs: 'levantarme a las 6 a.m. los días de semana.',
    correctAnswer: 'have to',
    optionsEs: [
      { key: 'have to', text: 'have to', textEs: 'tengo que (Correcto para el sujeto I)' },
      { key: 'has to', text: 'has to', textEs: 'tiene que (Solo para He/She/It)' },
    ],
    fullSentence: 'I have to get up at 6 a.m. on weekdays.',
    translation: 'Tengo que levantarme a las 6 a.m. los días de semana.',
    explanation: 'Con el sujeto de primera persona "I" corresponde "have to".',
  },
  {
    id: 'ex3-2',
    number: 2,
    subject: 'She',
    subjectEs: 'Ella',
    restOfSentence: 'wear a uniform at work.',
    restOfSentenceEs: 'usar uniforme en el trabajo.',
    correctAnswer: 'has to',
    optionsEs: [
      { key: 'have to', text: 'have to', textEs: 'tenemos/tienen que (Solo para I/You/We/They)' },
      { key: 'has to', text: 'has to', textEs: 'tiene que (Correcto para tercera persona She)' },
    ],
    fullSentence: 'She has to wear a uniform at work.',
    translation: 'Ella tiene que usar uniforme en el trabajo.',
    explanation: 'Con tercera persona singular "She" se utiliza "has to".',
  },
  {
    id: 'ex3-3',
    number: 3,
    subject: 'They',
    subjectEs: 'Ellos',
    restOfSentence: 'pay for the tickets online.',
    restOfSentenceEs: 'pagar las entradas por internet.',
    correctAnswer: 'have to',
    optionsEs: [
      { key: 'have to', text: 'have to', textEs: 'tienen que (Correcto para el plural They)' },
      { key: 'has to', text: 'has to', textEs: 'tiene que (Solo para singular He/She/It)' },
    ],
    fullSentence: 'They have to pay for the tickets online.',
    translation: 'Ellos tienen que pagar las entradas por internet.',
    explanation: 'Con el pronombre plural "They" corresponde "have to".',
  },
  {
    id: 'ex3-4',
    number: 4,
    subject: 'My brother',
    subjectEs: 'Mi hermano',
    restOfSentence: 'study for an important exam.',
    restOfSentenceEs: 'estudiar para un examen importante.',
    correctAnswer: 'has to',
    optionsEs: [
      { key: 'have to', text: 'have to', textEs: 'tengo/tenemos que' },
      { key: 'has to', text: 'has to', textEs: 'tiene que (Correcto: My brother = He)' },
    ],
    fullSentence: 'My brother has to study for an important exam.',
    translation: 'Mi hermano tiene que estudiar para un examen importante.',
    explanation: '"My brother" equivale a "He" (tercera persona singular), por lo tanto lleva "has to".',
  },
  {
    id: 'ex3-5',
    number: 5,
    subject: 'We',
    subjectEs: 'Nosotros',
    restOfSentence: 'take our passports to the airport.',
    restOfSentenceEs: 'llevar nuestros pasaportes al aeropuerto.',
    correctAnswer: 'have to',
    optionsEs: [
      { key: 'have to', text: 'have to', textEs: 'tenemos que (Correcto para el sujeto We)' },
      { key: 'has to', text: 'has to', textEs: 'tiene que (Solo para He/She/It)' },
    ],
    fullSentence: 'We have to take our passports to the airport.',
    translation: 'Tenemos que llevar nuestros pasaportes al aeropuerto.',
    explanation: 'Con el sujeto de primera persona plural "We" se usa "have to".',
  },
  {
    id: 'ex3-6',
    number: 6,
    subject: 'He',
    subjectEs: 'Él',
    restOfSentence: 'work on Saturdays.',
    restOfSentenceEs: 'trabajar los sábados.',
    correctAnswer: 'has to',
    optionsEs: [
      { key: 'have to', text: 'have to', textEs: 'tengo/tienen que' },
      { key: 'has to', text: 'has to', textEs: 'tiene que (Correcto para He)' },
    ],
    fullSentence: 'He has to work on Saturdays.',
    translation: 'Él tiene que trabajar los sábados.',
    explanation: 'Con tercera persona singular "He" corresponde "has to".',
  },
  {
    id: 'ex3-7',
    number: 7,
    subject: 'You',
    subjectEs: 'Tú / Ustedes',
    restOfSentence: 'bring your own laptop.',
    restOfSentenceEs: 'traer tu propia computadora portátil.',
    correctAnswer: 'have to',
    optionsEs: [
      { key: 'have to', text: 'have to', textEs: 'tienes/tienen que (Correcto para You)' },
      { key: 'has to', text: 'has to', textEs: 'tiene que (Solo para He/She/It)' },
    ],
    fullSentence: 'You have to bring your own laptop.',
    translation: 'Tienes que traer tu propia computadora portátil.',
    explanation: 'Con el sujeto de segunda persona "You" corresponde "have to".',
  },
  {
    id: 'ex3-8',
    number: 8,
    subject: 'Laura',
    subjectEs: 'Laura',
    restOfSentence: 'finish the report today.',
    restOfSentenceEs: 'terminar el informe hoy.',
    correctAnswer: 'has to',
    optionsEs: [
      { key: 'have to', text: 'have to', textEs: 'tengo/tenemos que' },
      { key: 'has to', text: 'has to', textEs: 'tiene que (Correcto: Laura = She)' },
    ],
    fullSentence: 'Laura has to finish the report today.',
    translation: 'Laura tiene que terminar el informe hoy.',
    explanation: '"Laura" equivale a "She" (tercera persona singular), por lo que lleva "has to".',
  },
];

/* =========================================================================
   EXERCISE 4 – CHOOSE THE CORRECT OPTION (HAVE TO / HAS TO)
   ========================================================================= */
export const EXERCISE_4_ITEMS: MultipleChoiceItem[] = [
  {
    id: 'ex4-1',
    number: 1,
    question: 'My sister ________ work tomorrow.',
    questionEs: 'Mi hermana ________ trabajar mañana.',
    options: [
      { key: 'a', text: 'have to', textEs: 'tengo/tenemos que (Incorrecto para 3ra persona She)' },
      { key: 'b', text: 'has to', textEs: 'tiene que (Correcto para 3ra persona singular: My sister = She)' },
      { key: 'c', text: 'have', textEs: 'tener / tiene (Incompleto: le falta la preposición "to")' },
    ],
    correctAnswer: 'b',
    fullSentence: 'My sister has to work tomorrow.',
    translation: 'Mi hermana tiene que trabajar mañana.',
    explanation: '"My sister" es tercera persona singular (She), por lo que requiere "has to" (opción b).',
  },
  {
    id: 'ex4-2',
    number: 2,
    question: 'We ________ wear a uniform at our school.',
    questionEs: 'Nosotros ________ usar uniforme en nuestra escuela.',
    options: [
      { key: 'a', text: 'has to', textEs: 'tiene que (Solo para tercera persona singular He/She/It)' },
      { key: 'b', text: 'have to', textEs: 'tenemos que (Forma correcta con el sujeto plural We)' },
      { key: 'c', text: 'have', textEs: 'tenemos (Incompleto: le falta "to")' },
    ],
    correctAnswer: 'b',
    fullSentence: 'We have to wear a uniform at our school.',
    translation: 'Nosotros tenemos que usar uniforme en nuestra escuela.',
    explanation: 'Con el sujeto "We" se utiliza la forma "have to" (opción b).',
  },
  {
    id: 'ex4-3',
    number: 3,
    question: "He ________ get up early on Sundays. It's his day off.",
    questionEs: 'Él ________ levantarse temprano los domingos. Es su día libre.',
    options: [
      { key: 'a', text: "doesn't have to", textEs: 'no tiene que (Correcto: negación en 3ra persona, no es necesario)' },
      { key: 'b', text: "don't have to", textEs: 'no tenemos/tienen que (Auxiliar don’t incorrecto para He)' },
      { key: 'c', text: "doesn't has to", textEs: 'error grave: tras doesn’t el verbo vuelve a "have", nunca "has"' },
    ],
    correctAnswer: 'a',
    fullSentence: "He doesn't have to get up early on Sundays. It's his day off.",
    translation: 'Él no tiene que levantarse temprano los domingos. Es su día libre.',
    explanation:
      'Para tercera persona en negativo usamos "doesn\'t have to". Recuerda que tras "doesn\'t", el verbo vuelve a la forma base "have", nunca "has" (opción a).',
  },
  {
    id: 'ex4-4',
    number: 4,
    question: '________ you have to work tonight?',
    questionEs: '¿________ tú que trabajar esta noche?',
    options: [
      { key: 'a', text: 'Does', textEs: 'Auxiliar de 3ra persona (Incorrecto con el pronombre you)' },
      { key: 'b', text: 'Do', textEs: '¿Tienes...? (Auxiliar de presente simple correcto para you)' },
      { key: 'c', text: 'Are', textEs: '¿Estás...? (El verbo to be no se usa como auxiliar de have to)' },
    ],
    correctAnswer: 'b',
    fullSentence: 'Do you have to work tonight?',
    translation: '¿Tienes que trabajar esta noche?',
    explanation: 'Las preguntas en presente simple con el sujeto "you" se inician con el auxiliar "Do" (opción b).',
  },
  {
    id: 'ex4-5',
    number: 5,
    question: 'Does your father ________ a car for work?',
    questionEs: '¿Tu padre ________ un auto para el trabajo?',
    options: [
      { key: 'a', text: 'has to use', textEs: 'Incorrecto: con el auxiliar Does el verbo debe ser have, no has' },
      { key: 'b', text: 'have to use', textEs: 'tiene que usar (Forma base infinitiva correcta tras el auxiliar Does)' },
      { key: 'c', text: 'have use', textEs: 'Incompleto: le falta la preposición "to"' },
    ],
    correctAnswer: 'b',
    fullSentence: 'Does your father have to use a car for work?',
    translation: '¿Tu padre tiene que usar un automóvil para el trabajo?',
    explanation:
      'Como la pregunta ya incluye el auxiliar "Does", el verbo principal debe ir en infinitivo base: "have to use" (opción b).',
  },
  {
    id: 'ex4-6',
    number: 6,
    question: 'They ________ buy tickets. The event is free.',
    questionEs: 'Ellos ________ comprar entradas. El evento es gratuito.',
    options: [
      { key: 'a', text: "don't have to", textEs: 'no tienen que (Ausencia de obligación correcta para They)' },
      { key: 'b', text: "doesn't have to", textEs: 'Incorrecto: doesn’t solo se usa con He/She/It' },
      { key: 'c', text: 'not have to', textEs: 'Incorrecto: falta el auxiliar do en la negación' },
    ],
    correctAnswer: 'a',
    fullSentence: "They don't have to buy tickets. The event is free.",
    translation: 'Ellos no tienen que comprar entradas. El evento es gratuito.',
    explanation:
      'Con el pronombre "They", la negación de obligación es "don\'t have to" (no es necesario) (opción a).',
  },
];

/* =========================================================================
   EXERCISE 5 – CHOOSE THE CORRECT OPTION (MAY)
   ========================================================================= */
export const EXERCISE_5_ITEMS: MultipleChoiceItem[] = [
  {
    id: 'ex5-1',
    number: 1,
    question: '________ I open the window, please?',
    questionEs: '¿________ abrir la ventana, por favor?',
    options: [
      { key: 'a', text: 'May', textEs: '¿Puedo...? (Forma formal y cortés por excelencia para pedir permiso)' },
      { key: 'b', text: 'Have', textEs: '¿Tengo...? (No se utiliza para solicitar permiso educado)' },
      { key: 'c', text: 'Do', textEs: '¿Hago...? (Auxiliar simple que no expresa petición cortés)' },
    ],
    correctAnswer: 'a',
    fullSentence: 'May I open the window, please?',
    translation: '¿Puedo abrir la ventana, por favor?',
    explanation:
      '"May I..." es la forma educada y formal por excelencia para pedir permiso (opción a).',
  },
  {
    id: 'ex5-2',
    number: 2,
    question: 'It ________ rain this afternoon.',
    questionEs: '________ llover esta tarde.',
    options: [
      { key: 'a', text: 'mays', textEs: 'Incorrecto (Los verbos modales nunca añaden "-s" con ningún sujeto)' },
      { key: 'b', text: 'may', textEs: 'Quizás / Puede que (Forma modal invariable correcta de posibilidad)' },
      { key: 'c', text: 'may to', textEs: 'Incorrecto (Los modales van directo al verbo base, nunca con "to")' },
    ],
    correctAnswer: 'b',
    fullSentence: 'It may rain this afternoon.',
    translation: 'Quizás llueva esta tarde.',
    explanation:
      'Los verbos modales nunca llevan "-s" ni van seguidos de "to". La forma correcta es "may" (opción b).',
  },
  {
    id: 'ex5-3',
    number: 3,
    question: 'You ________ leave when you finish the exam.',
    questionEs: '________ retirarte cuando termines el examen.',
    options: [
      { key: 'a', text: 'may', textEs: 'Puedes / Estás autorizado a (Concede permiso formal)' },
      { key: 'b', text: 'may to', textEs: 'Incorrecto: no debe incluir "to"' },
      { key: 'c', text: 'may leaves', textEs: 'Incorrecto: el verbo siguiente debe ser base "leave", sin "-s"' },
    ],
    correctAnswer: 'a',
    fullSentence: 'You may leave when you finish the exam.',
    translation: 'Puedes retirarte cuando termines el examen.',
    explanation:
      'Para conceder permiso usamos "may" seguido directamente del verbo base sin "to" ni "-s": "may" (opción a).',
  },
  {
    id: 'ex5-4',
    number: 4,
    question: 'She ________ be late because of the traffic.',
    questionEs: 'Ella ________ llegar tarde debido al tráfico.',
    options: [
      { key: 'a', text: 'may', textEs: 'Quizás / Puede que (Posibilidad futura seguida del infinitivo base be)' },
      { key: 'b', text: 'has may', textEs: 'Estructura inexistente e incorrecta' },
      { key: 'c', text: 'may is', textEs: 'Incorrecto: tras may debe usarse "be", nunca la forma conjugada "is"' },
    ],
    correctAnswer: 'a',
    fullSentence: 'She may be late because of the traffic.',
    translation: 'Ella quizás llegue tarde debido al tráfico.',
    explanation:
      'Expresa una posibilidad futura con el infinitivo base de be: "may be" (opción a).',
  },
  {
    id: 'ex5-5',
    number: 5,
    question: '________ I ask you a question?',
    questionEs: '¿________ hacerte una pregunta?',
    options: [
      { key: 'a', text: 'May', textEs: '¿Puedo...? (Petición formal y respetuosa de permiso)' },
      { key: 'b', text: 'Am', textEs: '¿Soy/Estoy...? (No concuerda con el verbo de acción ask)' },
      { key: 'c', text: 'Have', textEs: '¿Tengo...? (No se usa para pedir permiso antes de una pregunta)' },
    ],
    correctAnswer: 'a',
    fullSentence: 'May I ask you a question?',
    translation: '¿Puedo hacerte una pregunta?',
    explanation:
      '"May I ask..." es la fórmula formal y correcta para solicitar permiso antes de formular una pregunta (opción a).',
  },
  {
    id: 'ex5-6',
    number: 6,
    question: "They ________ arrive before 8 p.m., but I'm not sure.",
    questionEs: 'Ellos ________ llegar antes de las 8 p.m., pero no estoy seguro.',
    options: [
      { key: 'a', text: 'may', textEs: 'Quizás / Puede que (Indica posibilidad ante la incertidumbre)' },
      { key: 'b', text: 'may to', textEs: 'Incorrecto: "may" nunca lleva "to"' },
      { key: 'c', text: 'might to', textEs: 'Incorrecto: "might" tampoco se combina con "to"' },
    ],
    correctAnswer: 'a',
    fullSentence: "They may arrive before 8 p.m., but I'm not sure.",
    translation: 'Ellos quizás lleguen antes de las 8 p.m., pero no estoy seguro.',
    explanation:
      '"I\'m not sure" indica posibilidad/incertidumbre. "may" va seguido del verbo base "arrive" sin "to" (opción a).',
  },
];

/* =========================================================================
   EXERCISE 6 / PART 4 – MIXED REVIEW (12 QUESTIONS)
   ========================================================================= */
export const MIXED_REVIEW_ITEMS: MultipleChoiceItem[] = [
  {
    id: 'mix-1',
    number: 1,
    question: '________ your computer before you leave the office.',
    questionEs: '________ tu computadora antes de salir de la oficina.',
    options: [
      { key: 'a', text: 'Turn off', textEs: 'Apaga (Imperativo afirmativo en forma base simple)' },
      { key: 'b', text: "Don't turn off", textEs: 'No apagues (Sentido opuesto al indicado)' },
      { key: 'c', text: 'Turns off', textEs: 'Apaga con "-s" (Incorrecto en modo imperativo)' },
    ],
    correctAnswer: 'a',
    fullSentence: 'Turn off your computer before you leave the office.',
    translation: 'Apaga tu computadora antes de salir de la oficina.',
    explanation:
      'Instrucción afirmativa en imperativo: forma base "Turn off" (opción a).',
  },
  {
    id: 'mix-2',
    number: 2,
    question: "You ________ show your ID to enter the building. It's compulsory.",
    questionEs: 'Tú ________ mostrar tu identificación para entrar al edificio. Es obligatorio.',
    options: [
      { key: 'a', text: 'have to', textEs: 'tienes que (Obligación / requisito reglamentario obligatorio)' },
      { key: 'b', text: 'may', textEs: 'puedes (Permiso opcional, no refleja la obligatoriedad)' },
      { key: 'c', text: "don't have to", textEs: 'no tienes que (Contradice que sea obligatorio entrar con ID)' },
    ],
    correctAnswer: 'a',
    fullSentence: "You have to show your ID to enter the building. It's compulsory.",
    translation: 'Tienes que mostrar tu identificación para entrar al edificio. Es obligatorio.',
    explanation:
      '"Compulsory" significa obligatorio, por lo que denota una necesidad imperativa ("have to", opción a).',
  },
  {
    id: 'mix-3',
    number: 3,
    question: '________ touch the paintings in the museum.',
    questionEs: '________ las pinturas en el museo.',
    options: [
      { key: 'a', text: 'Not', textEs: 'No (Incompleto: en imperativo se requiere el auxiliar Don’t)' },
      { key: 'b', text: "Don't", textEs: 'No toques (Imperativo negativo correcto: Don’t + verbo base)' },
      { key: 'c', text: "Doesn't", textEs: 'Auxiliar de 3ra persona (No se usa en imperativo directo)' },
    ],
    correctAnswer: 'b',
    fullSentence: "Don't touch the paintings in the museum.",
    translation: 'No toques las pinturas en el museo.',
    explanation:
      'Las órdenes o prohibiciones negativas siempre se construyen con "Don\'t" (opción b).',
  },
  {
    id: 'mix-4',
    number: 4,
    question: 'My mother ________ take this medicine every morning, according to her instructions.',
    questionEs: 'Mi madre ________ tomar este medicamento cada mañana, según las indicaciones.',
    options: [
      { key: 'a', text: 'have to', textEs: 'tengo/tenemos que (Incorrecto para 3ra persona My mother = She)' },
      { key: 'b', text: 'has to', textEs: 'tiene que (Forma correcta para 3ra persona singular)' },
      { key: 'c', text: 'may to', textEs: 'Incorrecto: may nunca se usa con "to"' },
    ],
    correctAnswer: 'b',
    fullSentence:
      'My mother has to take this medicine every morning, according to her instructions.',
    translation:
      'Mi madre tiene que tomar este medicamento cada mañana, según las instrucciones médicas.',
    explanation:
      '"My mother" es tercera persona singular (She), por lo que requiere "has to" (opción b).',
  },
  {
    id: 'mix-5',
    number: 5,
    question: '________ I borrow your pen, please?',
    questionEs: '¿________ pedir prestado tu bolígrafo, por favor?',
    options: [
      { key: 'a', text: 'Have', textEs: '¿Tengo...? (No expresa solicitud educada de permiso)' },
      { key: 'b', text: 'Do', textEs: 'Auxiliar simple (No transmite cortesía formal al pedir algo)' },
      { key: 'c', text: 'May', textEs: '¿Puedo...? (Permiso formal y respetuoso por excelencia)' },
    ],
    correctAnswer: 'c',
    fullSentence: 'May I borrow your pen, please?',
    translation: '¿Puedo pedir prestado tu bolígrafo, por favor?',
    explanation:
      'Pedir prestado algo con "please" es una petición de permiso cortés: "May I borrow...?" (opción c).',
  },
  {
    id: 'mix-6',
    number: 6,
    question: 'Peter ________ wear a suit at work. His office has no dress code.',
    questionEs: 'Peter ________ usar traje en el trabajo. Su oficina no tiene código de vestimenta.',
    options: [
      { key: 'a', text: "doesn't have to", textEs: 'no tiene que (Ausencia de obligación correcta para 3ra persona Peter)' },
      { key: 'b', text: "don't have to", textEs: 'don’t es incorrecto para tercera persona singular Peter' },
      { key: 'c', text: "doesn't has to", textEs: 'error gramatical: tras doesn’t se debe usar have, nunca has' },
    ],
    correctAnswer: 'a',
    fullSentence: "Peter doesn't have to wear a suit at work. His office has no dress code.",
    translation:
      'Peter no tiene que usar traje en el trabajo. Su oficina no tiene código de vestimenta.',
    explanation:
      'No hay código de vestimenta, por lo que no es necesario. Tercera persona negativa: "doesn\'t have to" (opción a).',
  },
  {
    id: 'mix-7',
    number: 7,
    question: "It's very cloudy. It ________ snow tonight.",
    questionEs: 'Está muy nublado. ________ nevar esta noche.',
    options: [
      { key: 'a', text: 'has to', textEs: 'tiene que (Obligación / deber, no aplica al clima)' },
      { key: 'b', text: 'may', textEs: 'Quizás / Puede que (Posibilidad meteorológica basada en indicios)' },
      { key: 'c', text: 'may to', textEs: 'Incorrecto: may no puede ir seguido de "to"' },
    ],
    correctAnswer: 'b',
    fullSentence: "It's very cloudy. It may snow tonight.",
    translation: 'Está muy nublado. Quizás nieve esta noche.',
    explanation:
      'Indica una posibilidad climatológica basada en la evidencia: "may" seguido de la forma base "snow" (opción b).',
  },
  {
    id: 'mix-8',
    number: 8,
    question: '________ noisy during the test!',
    questionEs: '¡________ ruidosos durante la prueba!',
    options: [
      { key: 'a', text: "Don't be", textEs: 'No sean / No hagan ruido (Imperativo negativo correcto de be: Don’t + be)' },
      { key: 'b', text: 'Not be', textEs: 'Incorrecto: falta el auxiliar Don’t' },
      { key: 'c', text: "Doesn't be", textEs: 'Incorrecto: el imperativo no distingue personas gramaticales con doesn’t' },
    ],
    correctAnswer: 'a',
    fullSentence: "Don't be noisy during the test!",
    translation: '¡No hagan ruido durante la prueba!',
    explanation:
      'La orden imperativa negativa para el verbo be es "Don\'t be" (opción a).',
  },
  {
    id: 'mix-9',
    number: 9,
    question: '________ your homework before watching TV.',
    questionEs: '________ tu tarea antes de mirar televisión.',
    options: [
      { key: 'a', text: 'Does', textEs: 'Hace con "-es" (Incorrecto para imperativo directo)' },
      { key: 'b', text: 'Do', textEs: 'Haz (Imperativo afirmativo en forma base simple sin cambios)' },
      { key: 'c', text: 'Doing', textEs: 'Haciendo (Gerundio con "-ing", no funciona como orden)' },
    ],
    correctAnswer: 'b',
    fullSentence: 'Do your homework before watching TV.',
    translation: 'Haz tu tarea antes de mirar televisión.',
    explanation:
      'El imperativo afirmativo lleva el verbo en forma base simple: "Do" (opción b).',
  },
  {
    id: 'mix-10',
    number: 10,
    question: '________ she have to work this weekend?',
    questionEs: '¿________ ella que trabajar este fin de semana?',
    options: [
      { key: 'a', text: 'Do', textEs: 'Auxiliar para I/You/We/They (Incorrecto con el sujeto she)' },
      { key: 'b', text: 'Is', textEs: '¿Está...? (El verbo be no auxilia a have to en presente simple)' },
      { key: 'c', text: 'Does', textEs: '¿Tiene ella...? (Auxiliar de presente simple correcto para 3ra persona)' },
    ],
    correctAnswer: 'c',
    fullSentence: 'Does she have to work this weekend?',
    translation: '¿Tiene ella que trabajar este fin de semana?',
    explanation:
      'Pregunta en presente simple con el sujeto "she": requiere el auxiliar "Does" (opción c).',
  },
  {
    id: 'mix-11',
    number: 11,
    question: 'You ________ bring food. There will be a free lunch.',
    questionEs: 'Tú ________ traer comida. Habrá almuerzo gratuito.',
    options: [
      { key: 'a', text: "don't have to", textEs: 'no tienes que (No es obligatorio / no es necesario traer comida)' },
      { key: 'b', text: "doesn't have to", textEs: 'Incorrecto: doesn’t no se utiliza con el pronombre You' },
      { key: 'c', text: 'not have to', textEs: 'Incorrecto: falta el auxiliar don’t para la negación' },
    ],
    correctAnswer: 'a',
    fullSentence: "You don't have to bring food. There will be a free lunch.",
    translation: 'No tienes que traer comida. Habrá almuerzo gratis.',
    explanation:
      'Como habrá comida gratis, no es obligatorio traer comida. Con "You" se usa "don\'t have to" (opción a).',
  },
  {
    id: 'mix-12',
    number: 12,
    question: 'He may ________ us later.',
    questionEs: 'Él quizás nos ________ más tarde.',
    options: [
      { key: 'a', text: 'calls', textEs: 'llama con "-s" (Incorrecto: tras un modal el verbo nunca lleva "-s")' },
      { key: 'b', text: 'to call', textEs: 'llamar con "to" (Incorrecto: los modales no van seguidos de "to")' },
      { key: 'c', text: 'call', textEs: 'llame / llamar (Forma base simple correcta sin "to" ni "-s")' },
    ],
    correctAnswer: 'c',
    fullSentence: 'He may call us later.',
    translation: 'Él quizás nos llame más tarde.',
    explanation:
      'Tras el verbo modal "may", el verbo siguiente siempre va en infinitivo base sin "to" ni "-s": "call" (opción c).',
  },
];
