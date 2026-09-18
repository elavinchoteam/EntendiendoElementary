import { Exercise } from '../types';

export interface PresentSimpleTheoryTopic {
  id: string;
  category: string;
  categoryEs: string;
  titleEn: string;
  titleEs: string;
  textEn: string;
  textEs: string;
  examples: {
    en: string;
    es: string;
    noteEn?: string;
    noteEs?: string;
  }[];
  grammarTipEn: string;
  grammarTipEs: string;
}

export interface QuickChallengeItem {
  id: string;
  number: number;
  sentenceBefore: string;
  sentenceAfter: string;
  correctAnswer: 'Do' | 'Does';
  options: ('Do' | 'Does')[];
  subject: string;
  fullSentenceEn: string;
  fullSentenceEs: string;
  explanationEn: string;
  explanationEs: string;
}

export interface FindSomeoneWhoItem {
  id: string;
  number: number;
  promptEn: string;
  promptEs: string;
  questionEn: string;
  questionEs: string;
  affirmativeExampleEn: string;
  affirmativeExampleEs: string;
  negativeExampleEn: string;
  negativeExampleEs: string;
}

export interface TrueFalseHabitItem {
  id: string;
  number: number;
  statementEn: string;
  statementEs: string;
  questionEn: string;
  questionEs: string;
  positiveAnswerEn: string;
  negativeAnswerEn: string;
  positiveAnswerEs: string;
  negativeAnswerEs: string;
}

export interface DoDoesQuestionItem {
  id: string;
  number: number;
  sentenceBefore: string;
  sentenceAfter: string;
  subject: string;
  correctAnswer: 'Do' | 'Does';
  options: ('Do' | 'Does')[];
  fullSentenceEn: string;
  fullSentenceEs: string;
  explanationEn: string;
  explanationEs: string;
}

export interface SelfQuestionItem {
  id: string;
  number: number;
  questionEn: string;
  questionEs: string;
  positiveAnswerEn: string;
  positiveAnswerEs: string;
  negativeAnswerEn: string;
  negativeAnswerEs: string;
  explanationEn: string;
  explanationEs: string;
}

export interface MiniConversationDialogue {
  id: string;
  dialogueGroup: string;
  dialogueGroupEs: string;
  speakerA_QuestionEn: string;
  speakerA_QuestionEs: string;
  speakerA_BlankWord: string;
  speakerB_AnswerEn: string;
  speakerB_AnswerEs: string;
  speakerB_BlankWord: string;
  hintEn: string;
  hintEs: string;
}

export interface StrangeDayChoiceQuestion {
  id: string;
  number: number;
  promptEn: string;
  promptEs: string;
  options: {
    key: 'a' | 'b' | 'c';
    text: string;
    isCorrect: boolean;
  }[];
  explanationEn: string;
  explanationEs: string;
}

export interface StrangeDayFillItem {
  id: string;
  number: number;
  sentenceBefore: string;
  verbPrompt: string;
  sentenceAfter: string;
  correctAnswers: string[];
  fullSentenceEn: string;
  fullSentenceEs: string;
  explanationEn: string;
  explanationEs: string;
}

export interface StrangeDayMistakeItem {
  id: string;
  number: number;
  incorrectSentence: string;
  correctSentence: string;
  translationEs: string;
  mistakeWord: string;
  correctedWord: string;
  ruleEn: string;
  ruleEs: string;
}

export interface StrangeDayCreativeItem {
  id: string;
  number: number;
  promptPrefixEn: string;
  promptSuffixEn: string;
  translationEs: string;
  sampleAnswerEn: string;
  sampleAnswerEs: string;
  grammarTipEn: string;
  grammarTipEs: string;
}

// ---------------------------------------------------------------------------
// 6 THEORY TOPICS FOR "PRESENT SIMPLE — GRAMMAR MASTERCLASS"
// ---------------------------------------------------------------------------
export const PRESENT_SIMPLE_THEORY_TOPICS: PresentSimpleTheoryTopic[] = [
  {
    id: 'ps-theory-1',
    category: '1. Uses & Concept',
    categoryEs: '1. Usos y Concepto Principal',
    titleEn: 'When Do We Use the Present Simple?',
    titleEs: '¿Cuándo usamos el Presente Simple?',
    textEn:
      'We use the Present Simple to talk about routines, habits, things we do regularly, universal facts, and likes/dislikes.',
    textEs:
      'Utilizamos el Presente Simple para hablar de rutinas cotidianas, hábitos personales, acciones regulares, verdades o hechos universales y gustos o preferencias.',
    examples: [
      {
        en: 'I work from Monday to Friday.',
        es: 'Trabajo de lunes a viernes.',
        noteEn: 'Routine: specific recurring days of the week',
        noteEs: 'Rutina: días de la semana recurrentes',
      },
      {
        en: 'She plays tennis on Saturdays.',
        es: 'Ella juega al tenis los sábados.',
        noteEn: 'Habit: weekly activity with 3rd person singular (-s)',
        noteEs: 'Hábito: actividad semanal con 3.ª persona singular (-s)',
      },
      {
        en: 'They live in Buenos Aires.',
        es: 'Ellos viven en Buenos Aires.',
        noteEn: 'Fact / Permanent situation',
        noteEs: 'Hecho / Situación permanente',
      },
      {
        en: 'He likes pizza.',
        es: 'A él le gusta la pizza.',
        noteEn: 'Likes and dislikes with "like" + -s',
        noteEs: 'Gusto o preferencia con "like" + -s',
      },
    ],
    grammarTipEn:
      'Tip: Time expressions like "every day", "on Mondays", "always", and "usually" often signal the Present Simple.',
    grammarTipEs:
      'Consejo: Expresiones temporales como "every day", "on Mondays", "always" o "usually" suelen indicar Presente Simple.',
  },
  {
    id: 'ps-theory-2',
    category: '2. Affirmative Form',
    categoryEs: '2. Forma Afirmativa',
    titleEn: 'Affirmative: Base Verb vs. Third Person -S',
    titleEs: 'Afirmativo: Verbo base frente a 3.ª persona con -S',
    textEn:
      'With I / YOU / WE / THEY, use the verb in its normal base form. With HE / SHE / IT, we usually add -S (or -ES for verbs ending in -ch, -sh, -ss, -x, -o).',
    textEs:
      'Con I / YOU / WE / THEY, usamos el verbo en su forma base normal. Con HE / SHE / IT, por regla general agregamos -S (o -ES si el verbo termina en -ch, -sh, -ss, -x, -o).',
    examples: [
      {
        en: 'I play football. / He plays football.',
        es: 'Yo juego fútbol. / Él juega fútbol.',
        noteEn: 'Notice: play -> plays for "he"',
        noteEs: 'Observa: play -> plays para "he"',
      },
      {
        en: 'They watch TV. / She watches TV.',
        es: 'Ellos miran televisión. / Ella mira televisión.',
        noteEn: 'Ending in -ch: watch -> watches (+es)',
        noteEs: 'Terminación en -ch: watch -> watches (+es)',
      },
      {
        en: 'We like pizza. / He likes pizza.',
        es: 'Nosotros nos gusta la pizza. / A él le gusta la pizza.',
        noteEn: 'Like -> likes for "he"',
        noteEs: 'Like -> likes para "he"',
      },
      {
        en: 'I work. / She works. / It works.',
        es: 'Yo trabajo. / Ella trabaja. / Funciona (opera).',
        noteEn: '"It works" can mean a machine or idea works/functions',
        noteEs: '"It works" puede significar que un artefacto o idea funciona',
      },
    ],
    grammarTipEn:
      'Spelling rule: study -> studies (consonant + y changes to -ies), but play -> plays (vowel + y just adds -s).',
    grammarTipEs:
      'Regla ortográfica: study -> studies (consonante + y cambia a -ies), pero play -> plays (vocal + y solo suma -s).',
  },
  {
    id: 'ps-theory-3',
    category: '3. Yes / No Questions',
    categoryEs: '3. Preguntas de Sí / No',
    titleEn: 'Questions: DO vs. DOES',
    titleEs: 'Preguntas: Uso de DO frente a DOES',
    textEn:
      'For yes/no questions, place the auxiliary DO or DOES before the subject: DO + I / YOU / WE / THEY + verb? or DOES + HE / SHE / IT + verb?',
    textEs:
      'Para formular preguntas de sí o no, colocamos el auxiliar DO o DOES antes del sujeto: DO + I / YOU / WE / THEY + verbo? o DOES + HE / SHE / IT + verbo?',
    examples: [
      {
        en: 'DO you work?',
        es: '¿Trabajas tú?',
        noteEn: 'Auxiliary "Do" + subject "you" + base verb "work"',
        noteEs: 'Auxiliar "Do" + sujeto "you" + verbo base "work"',
      },
      {
        en: 'DO they live in Buenos Aires?',
        es: '¿Viven ellos en Buenos Aires?',
        noteEn: 'Auxiliary "Do" + subject "they"',
        noteEs: 'Auxiliar "Do" + sujeto "they"',
      },
      {
        en: 'DOES he work?',
        es: '¿Trabaja él?',
        noteEn: 'Auxiliary "Does" + subject "he" + base verb "work"',
        noteEs: 'Auxiliar "Does" + sujeto "he" + verbo base "work"',
      },
      {
        en: 'DOES she like pizza?',
        es: '¿A ella le gusta la pizza?',
        noteEn: 'Auxiliary "Does" + subject "she" + base verb "like"',
        noteEs: 'Auxiliar "Does" + sujeto "she" + verbo base "like"',
      },
    ],
    grammarTipEn:
      'Questions NEVER start with the main verb in English. We always need the auxiliary "Do" or "Does"!',
    grammarTipEs:
      'En inglés las preguntas NUNCA inician directamente con el verbo principal. ¡Siempre necesitamos el auxiliar "Do" o "Does"!',
  },
  {
    id: 'ps-theory-4',
    category: '4. Critical Golden Rule',
    categoryEs: '4. Regla de Oro Fundamental',
    titleEn: 'IMPORTANT: DOES Takes the S!',
    titleEs: '¡IMPORTANTE! ¡DOES se lleva la S!',
    textEn:
      'After DOES (in questions and negative doesn\'t), the main verb DOES NOT have an -S. Think: "DOES already carries the S!"',
    textEs:
      'Después de DOES (en preguntas y en la negación doesn\'t), el verbo principal NUNCA lleva la terminación -S. Recuerda: "¡DOES ya se llevó la S!"',
    examples: [
      {
        en: '❌ Does she likes pizza?  ->  ✅ Does she like pizza?',
        es: '❌ ¿Le gusta la pizza? (incorrecto) -> ✅ ¿Le gusta la pizza? (correcto)',
        noteEn: 'Do not add -s to "like" because "Does" is present',
        noteEs: 'No agregues -s a "like" porque "Does" ya está presente',
      },
      {
        en: '❌ Does he works here?  ->  ✅ Does he work here?',
        es: '❌ ¿Trabaja él aquí? (incorrecto) -> ✅ ¿Trabaja él aquí? (correcto)',
        noteEn: 'Use base verb "work", not "works"',
        noteEs: 'Usa el verbo base "work", nunca "works"',
      },
      {
        en: '❌ Does it works?  ->  ✅ Does it work?',
        es: '❌ ¿Funciona? (incorrecto) -> ✅ ¿Funciona? (correcto)',
        noteEn: 'Base verb "work" with auxiliary "Does"',
        noteEs: 'Verbo base "work" junto al auxiliar "Does"',
      },
    ],
    grammarTipEn:
      'Memory formula: DOES + subject + VERB IN INFINITIVE (without "to" and without -s).',
    grammarTipEs:
      'Fórmula nemotécnica: DOES + sujeto + VERBO BASE (sin "to" y sin -s).',
  },
  {
    id: 'ps-theory-5',
    category: '5. Short Answers & Magic Rule',
    categoryEs: '5. Respuestas Cortas y Regla Mágica',
    titleEn: 'Short Answers: Mirror the Auxiliary',
    titleEs: 'Respuestas Cortas: Refleja el Auxiliar',
    textEn:
      'THE MAGIC RULE: Look at the question\'s auxiliary. If the question starts with DO, answer with DO/DON\'T. If it starts with DOES, answer with DOES/DOESN\'T.',
    textEs:
      'LA REGLA MÁGICA: Mira el auxiliar de la pregunta. Si la pregunta comienza con DO, responde con DO/DON\'T. Si comienza con DOES, responde con DOES/DOESN\'T.',
    examples: [
      {
        en: 'Do you like pizza?  ->  Yes, I do. / No, I don\'t.',
        es: '¿Te gusta la pizza? -> Sí, me gusta. / No, no me gusta.',
        noteEn: 'DO question -> DO in the answer',
        noteEs: 'Pregunta con DO -> DO en la respuesta',
      },
      {
        en: 'Do they play football?  ->  Yes, they do. / No, they don\'t.',
        es: '¿Juegan ellos al fútbol? -> Sí. / No.',
        noteEn: 'Subject "they" + do / don\'t',
        noteEs: 'Sujeto "they" + do / don\'t',
      },
      {
        en: 'Does he like pizza?  ->  Yes, he does. / No, he doesn\'t.',
        es: '¿A él le gusta la pizza? -> Sí. / No.',
        noteEn: 'DOES question -> DOES in the answer',
        noteEs: 'Pregunta con DOES -> DOES en la respuesta',
      },
      {
        en: 'Does she work here?  ->  Yes, she does. / No, she doesn\'t.',
        es: '¿Trabaja ella aquí? -> Sí. / No.',
        noteEn: 'Subject "she" + does / doesn\'t',
        noteEs: 'Sujeto "she" + does / doesn\'t',
      },
    ],
    grammarTipEn:
      'Never answer just "Yes" or "No". In polite English, always use the short answer form: "Yes, I do" or "No, I don\'t".',
    grammarTipEs:
      'Evita responder únicamente "Yes" o "No". En inglés cortés, siempre se utiliza la respuesta corta: "Yes, I do" o "No, I don\'t".',
  },
  {
    id: 'ps-theory-6',
    category: '6. Summary & Remember Box',
    categoryEs: '6. Resumen y Cuadro de Recordatorio',
    titleEn: 'Remember Formula & Quick Synthesis',
    titleEs: 'Fórmula para Recordar y Síntesis Rápida',
    textEn:
      'I / YOU / WE / THEY -> DO. HE / SHE / IT -> DOES. In negative sentences: don\'t / doesn\'t + base verb. In questions: Do / Does + subject + base verb.',
    textEs:
      'I / YOU / WE / THEY se asocian con DO. HE / SHE / IT se asocian con DOES. En negaciones: don\'t / doesn\'t + verbo base. En preguntas: Do / Does + sujeto + verbo base.',
    examples: [
      {
        en: 'Do you like it?  ->  Yes, I do. / No, I don\'t.',
        es: '¿Te gusta? -> Sí, me gusta. / No, no me gusta.',
        noteEn: 'Do + you + base verb',
        noteEs: 'Do + you + verbo base',
      },
      {
        en: 'Does he like it?  ->  Yes, he does. / No, he doesn\'t.',
        es: '¿A él le gusta? -> Sí, le gusta. / No, no le gusta.',
        noteEn: 'Does + he + base verb',
        noteEs: 'Does + he + verbo base',
      },
      {
        en: 'She doesn\'t live in Paris.',
        es: 'Ella no vive en París.',
        noteEn: 'doesn\'t + live (without -s)',
        noteEs: 'doesn\'t + live (sin -s)',
      },
    ],
    grammarTipEn:
      'Key takeaway: ONLY affirmative sentences with he/she/it have an -s on the main verb. Questions and negatives use the auxiliary!',
    grammarTipEs:
      'Conclusión clave: SOLO las oraciones afirmativas con he/she/it llevan -s en el verbo principal. ¡Las preguntas y negaciones usan el auxiliar!',
  },
];

// ---------------------------------------------------------------------------
// EXERCISE 1: QUICK CHALLENGE — CHOOSE DO OR DOES (Pages 4-5)
// ---------------------------------------------------------------------------
export const PRESENT_SIMPLE_QUICK_CHALLENGE: QuickChallengeItem[] = [
  {
    id: 'qc-1',
    number: 1,
    sentenceBefore: '',
    sentenceAfter: 'you like pizza?',
    correctAnswer: 'Do',
    options: ['Do', 'Does'],
    subject: 'you',
    fullSentenceEn: 'Do you like pizza?',
    fullSentenceEs: '¿Te gusta la pizza?',
    explanationEn: 'With "you", we use the auxiliary "Do".',
    explanationEs: 'Con el pronombre "you", usamos el auxiliar "Do".',
  },
  {
    id: 'qc-2',
    number: 2,
    sentenceBefore: '',
    sentenceAfter: 'she work here?',
    correctAnswer: 'Does',
    options: ['Do', 'Does'],
    subject: 'she',
    fullSentenceEn: 'Does she work here?',
    fullSentenceEs: '¿Trabaja ella aquí?',
    explanationEn: 'With "she" (third person singular), we use the auxiliary "Does".',
    explanationEs: 'Con "she" (tercera persona singular), usamos el auxiliar "Does".',
  },
  {
    id: 'qc-3',
    number: 3,
    sentenceBefore: '',
    sentenceAfter: 'they play football?',
    correctAnswer: 'Do',
    options: ['Do', 'Does'],
    subject: 'they',
    fullSentenceEn: 'Do they play football?',
    fullSentenceEs: '¿Juegan ellos al fútbol?',
    explanationEn: 'With "they" (plural), we use the auxiliary "Do".',
    explanationEs: 'Con "they" (plural), usamos el auxiliar "Do".',
  },
  {
    id: 'qc-4',
    number: 4,
    sentenceBefore: '',
    sentenceAfter: 'he speak English?',
    correctAnswer: 'Does',
    options: ['Do', 'Does'],
    subject: 'he',
    fullSentenceEn: 'Does he speak English?',
    fullSentenceEs: '¿Habla él inglés?',
    explanationEn: 'With "he" (third person singular), we use the auxiliary "Does".',
    explanationEs: 'Con "he" (tercera persona singular), usamos el auxiliar "Does".',
  },
  {
    id: 'qc-5',
    number: 5,
    sentenceBefore: '',
    sentenceAfter: 'you watch Netflix?',
    correctAnswer: 'Do',
    options: ['Do', 'Does'],
    subject: 'you',
    fullSentenceEn: 'Do you watch Netflix?',
    fullSentenceEs: '¿Miras Netflix?',
    explanationEn: 'With "you", the auxiliary is "Do".',
    explanationEs: 'Con "you", el auxiliar correspondiente es "Do".',
  },
  {
    id: 'qc-6',
    number: 6,
    sentenceBefore: '',
    sentenceAfter: 'your mother cook?',
    correctAnswer: 'Does',
    options: ['Do', 'Does'],
    subject: 'your mother (she)',
    fullSentenceEn: 'Does your mother cook?',
    fullSentenceEs: '¿Cocina tu madre?',
    explanationEn: '"Your mother" is singular (she), so we must use "Does".',
    explanationEs: '"Your mother" equivale a "she" (tercera persona singular), por lo que usamos "Does".',
  },
  {
    id: 'qc-7',
    number: 7,
    sentenceBefore: '',
    sentenceAfter: 'your friends live near you?',
    correctAnswer: 'Do',
    options: ['Do', 'Does'],
    subject: 'your friends (they)',
    fullSentenceEn: 'Do your friends live near you?',
    fullSentenceEs: '¿Viven tus amigos cerca de ti?',
    explanationEn: '"Your friends" is plural (they), so the auxiliary is "Do".',
    explanationEs: '"Your friends" es plural (equivale a "they"), así que el auxiliar es "Do".',
  },
  {
    id: 'qc-8',
    number: 8,
    sentenceBefore: '',
    sentenceAfter: 'your teacher give you homework?',
    correctAnswer: 'Does',
    options: ['Do', 'Does'],
    subject: 'your teacher (he/she)',
    fullSentenceEn: 'Does your teacher give you homework?',
    fullSentenceEs: '¿Tu profesor te da deberes/tarea?',
    explanationEn: '"Your teacher" is singular (he or she), so we use "Does".',
    explanationEs: '"Your teacher" es singular (él o ella), por lo tanto usamos "Does".',
  },
];

// ---------------------------------------------------------------------------
// EXERCISE 2: FIND SOMEONE WHO... & TRUE/FALSE HABITS (Pages 5-6)
// ---------------------------------------------------------------------------
export const PRESENT_SIMPLE_FIND_SOMEONE: FindSomeoneWhoItem[] = [
  {
    id: 'fsw-1',
    number: 1,
    promptEn: 'plays football',
    promptEs: 'juega al fútbol',
    questionEn: 'Do you play football?',
    questionEs: '¿Juegas al fútbol?',
    affirmativeExampleEn: 'Lucas plays football.',
    affirmativeExampleEs: 'Lucas juega al fútbol.',
    negativeExampleEn: 'Lucas doesn\'t play football.',
    negativeExampleEs: 'Lucas no juega al fútbol.',
  },
  {
    id: 'fsw-2',
    number: 2,
    promptEn: 'likes pizza',
    promptEs: 'le gusta la pizza',
    questionEn: 'Do you like pizza?',
    questionEs: '¿Te gusta la pizza?',
    affirmativeExampleEn: 'Sofia likes pizza.',
    affirmativeExampleEs: 'A Sofia le gusta la pizza.',
    negativeExampleEn: 'Sofia doesn\'t like pizza.',
    negativeExampleEs: 'A Sofia no le gusta la pizza.',
  },
  {
    id: 'fsw-3',
    number: 3,
    promptEn: 'watches Netflix',
    promptEs: 'mira Netflix',
    questionEn: 'Do you watch Netflix?',
    questionEs: '¿Miras Netflix?',
    affirmativeExampleEn: 'Carlos watches Netflix every evening.',
    affirmativeExampleEs: 'Carlos mira Netflix cada noche.',
    negativeExampleEn: 'Carlos doesn\'t watch Netflix.',
    negativeExampleEs: 'Carlos no mira Netflix.',
  },
  {
    id: 'fsw-4',
    number: 4,
    promptEn: 'drinks coffee',
    promptEs: 'toma café',
    questionEn: 'Do you drink coffee?',
    questionEs: '¿Tomas café?',
    affirmativeExampleEn: 'Ana drinks coffee in the morning.',
    affirmativeExampleEs: 'Ana toma café por la mañana.',
    negativeExampleEn: 'Ana doesn\'t drink coffee.',
    negativeExampleEs: 'Ana no toma café.',
  },
  {
    id: 'fsw-5',
    number: 5,
    promptEn: 'gets up early',
    promptEs: 'se levanta temprano',
    questionEn: 'Do you get up early?',
    questionEs: '¿Te levantas temprano?',
    affirmativeExampleEn: 'David gets up early at 6 a.m.',
    affirmativeExampleEs: 'David se levanta temprano a las 6 a.m.',
    negativeExampleEn: 'David doesn\'t get up early.',
    negativeExampleEs: 'David no se levanta temprano.',
  },
  {
    id: 'fsw-6',
    number: 6,
    promptEn: 'works on Saturdays',
    promptEs: 'trabaja los sábados',
    questionEn: 'Do you work on Saturdays?',
    questionEs: '¿Trabajas los sábados?',
    affirmativeExampleEn: 'Elena works on Saturdays.',
    affirmativeExampleEs: 'Elena trabaja los sábados.',
    negativeExampleEn: 'Elena doesn\'t work on Saturdays.',
    negativeExampleEs: 'Elena no trabaja los sábados.',
  },
  {
    id: 'fsw-7',
    number: 7,
    promptEn: 'speaks another language',
    promptEs: 'habla otro idioma',
    questionEn: 'Do you speak another language?',
    questionEs: '¿Hablas otro idioma?',
    affirmativeExampleEn: 'Martin speaks French and English.',
    affirmativeExampleEs: 'Martin habla francés e inglés.',
    negativeExampleEn: 'Martin doesn\'t speak French.',
    negativeExampleEs: 'Martin no habla francés.',
  },
  {
    id: 'fsw-8',
    number: 8,
    promptEn: 'listens to music every day',
    promptEs: 'escucha música todos los días',
    questionEn: 'Do you listen to music every day?',
    questionEs: '¿Escuchas música todos los días?',
    affirmativeExampleEn: 'Laura listens to rock music every day.',
    affirmativeExampleEs: 'Laura escucha música rock todos los días.',
    negativeExampleEn: 'Laura doesn\'t listen to rock.',
    negativeExampleEs: 'Laura no escucha rock.',
  },
  {
    id: 'fsw-9',
    number: 9,
    promptEn: 'cooks at home',
    promptEs: 'cocina en casa',
    questionEn: 'Do you cook at home?',
    questionEs: '¿Cocinas en casa?',
    affirmativeExampleEn: 'Mateo cooks pasta at home.',
    affirmativeExampleEs: 'Mateo cocina pasta en casa.',
    negativeExampleEn: 'Mateo doesn\'t cook at home.',
    negativeExampleEs: 'Mateo no cocina en casa.',
  },
  {
    id: 'fsw-10',
    number: 10,
    promptEn: 'likes horror movies',
    promptEs: 'le gustan las películas de terror',
    questionEn: 'Do you like horror movies?',
    questionEs: '¿Te gustan las películas de terror?',
    affirmativeExampleEn: 'Valeria likes horror movies.',
    affirmativeExampleEs: 'A Valeria le gustan las películas de terror.',
    negativeExampleEn: 'Valeria doesn\'t like horror movies.',
    negativeExampleEs: 'A Valeria no le gustan las películas de terror.',
  },
];

export const PRESENT_SIMPLE_TRUE_FALSE: TrueFalseHabitItem[] = [
  {
    id: 'tf-1',
    number: 1,
    statementEn: 'I like pizza.',
    statementEs: 'Me gusta la pizza.',
    questionEn: 'Do you like pizza?',
    questionEs: '¿Te gusta la pizza?',
    positiveAnswerEn: 'Yes, I do.',
    negativeAnswerEn: 'No, I don\'t.',
    positiveAnswerEs: 'Sí, me gusta.',
    negativeAnswerEs: 'No, no me gusta.',
  },
  {
    id: 'tf-2',
    number: 2,
    statementEn: 'I drink coffee every day.',
    statementEs: 'Tomo café todos los días.',
    questionEn: 'Do you drink coffee every day?',
    questionEs: '¿Tomas café todos los días?',
    positiveAnswerEn: 'Yes, I do.',
    negativeAnswerEn: 'No, I don\'t.',
    positiveAnswerEs: 'Sí, tomo café.',
    negativeAnswerEs: 'No, no tomo café.',
  },
  {
    id: 'tf-3',
    number: 3,
    statementEn: 'I play football.',
    statementEs: 'Juego al fútbol.',
    questionEn: 'Do you play football?',
    questionEs: '¿Juegas al fútbol?',
    positiveAnswerEn: 'Yes, I do.',
    negativeAnswerEn: 'No, I don\'t.',
    positiveAnswerEs: 'Sí, juego.',
    negativeAnswerEs: 'No, no juego.',
  },
  {
    id: 'tf-4',
    number: 4,
    statementEn: 'I watch TV every night.',
    statementEs: 'Miro la televisión todas las noches.',
    questionEn: 'Do you watch TV every night?',
    questionEs: '¿Miras la televisión todas las noches?',
    positiveAnswerEn: 'Yes, I do.',
    negativeAnswerEn: 'No, I don\'t.',
    positiveAnswerEs: 'Sí, la miro.',
    negativeAnswerEs: 'No, no la miro.',
  },
  {
    id: 'tf-5',
    number: 5,
    statementEn: 'I work on Saturdays.',
    statementEs: 'Trabajo los sábados.',
    questionEn: 'Do you work on Saturdays?',
    questionEs: '¿Trabajas los sábados?',
    positiveAnswerEn: 'Yes, I do.',
    negativeAnswerEn: 'No, I don\'t.',
    positiveAnswerEs: 'Sí, trabajo.',
    negativeAnswerEs: 'No, descanso.',
  },
  {
    id: 'tf-6',
    number: 6,
    statementEn: 'I get up at 7 a.m.',
    statementEs: 'Me levanto a las 7 de la mañana.',
    questionEn: 'Do you get up at 7 a.m.?',
    questionEs: '¿Te levantas a las 7 a.m.?',
    positiveAnswerEn: 'Yes, I do.',
    negativeAnswerEn: 'No, I don\'t.',
    positiveAnswerEs: 'Sí, a las 7.',
    negativeAnswerEs: 'No, a otra hora.',
  },
  {
    id: 'tf-7',
    number: 7,
    statementEn: 'I cook every day.',
    statementEs: 'Cocino todos los días.',
    questionEn: 'Do you cook every day?',
    questionEs: '¿Cocinas todos los días?',
    positiveAnswerEn: 'Yes, I do.',
    negativeAnswerEn: 'No, I don\'t.',
    positiveAnswerEs: 'Sí, cocino.',
    negativeAnswerEs: 'No, no cocino.',
  },
  {
    id: 'tf-8',
    number: 8,
    statementEn: 'I listen to music in the morning.',
    statementEs: 'Escucho música por la mañana.',
    questionEn: 'Do you listen to music in the morning?',
    questionEs: '¿Escuchas música por la mañana?',
    positiveAnswerEn: 'Yes, I do.',
    negativeAnswerEn: 'No, I don\'t.',
    positiveAnswerEs: 'Sí, siempre.',
    negativeAnswerEs: 'No, prefiero silencio.',
  },
];

// ---------------------------------------------------------------------------
// EXERCISE 3: DO OR DOES? & ANSWER ABOUT YOURSELF (Pages 6-7)
// ---------------------------------------------------------------------------
export const PRESENT_SIMPLE_DO_OR_DOES_QUESTIONS: DoDoesQuestionItem[] = [
  {
    id: 'dodoes-1',
    number: 1,
    sentenceBefore: '',
    sentenceAfter: 'you like football?',
    subject: 'you',
    correctAnswer: 'Do',
    options: ['Do', 'Does'],
    fullSentenceEn: 'Do you like football?',
    fullSentenceEs: '¿Te gusta el fútbol?',
    explanationEn: 'Use "Do" with the pronoun "you".',
    explanationEs: 'Usamos "Do" con el pronombre "you".',
  },
  {
    id: 'dodoes-2',
    number: 2,
    sentenceBefore: '',
    sentenceAfter: 'your best friend like football?',
    subject: 'your best friend (he/she)',
    correctAnswer: 'Does',
    options: ['Do', 'Does'],
    fullSentenceEn: 'Does your best friend like football?',
    fullSentenceEs: '¿A tu mejor amigo/a le gusta el fútbol?',
    explanationEn: '"Your best friend" is singular (he or she), so we use "Does".',
    explanationEs: '"Your best friend" es tercera persona singular (he/she), por eso usamos "Does".',
  },
  {
    id: 'dodoes-3',
    number: 3,
    sentenceBefore: '',
    sentenceAfter: 'you watch movies?',
    subject: 'you',
    correctAnswer: 'Do',
    options: ['Do', 'Does'],
    fullSentenceEn: 'Do you watch movies?',
    fullSentenceEs: '¿Miras películas?',
    explanationEn: 'Use "Do" with "you".',
    explanationEs: 'Usamos "Do" con "you".',
  },
  {
    id: 'dodoes-4',
    number: 4,
    sentenceBefore: '',
    sentenceAfter: 'your mother work?',
    subject: 'your mother (she)',
    correctAnswer: 'Does',
    options: ['Do', 'Does'],
    fullSentenceEn: 'Does your mother work?',
    fullSentenceEs: '¿Trabaja tu madre?',
    explanationEn: '"Your mother" is singular female (she), so we use "Does".',
    explanationEs: '"Your mother" equivale a "she", por lo que usamos "Does".',
  },
  {
    id: 'dodoes-5',
    number: 5,
    sentenceBefore: '',
    sentenceAfter: 'your father cook?',
    subject: 'your father (he)',
    correctAnswer: 'Does',
    options: ['Do', 'Does'],
    fullSentenceEn: 'Does your father cook?',
    fullSentenceEs: '¿Cocina tu padre?',
    explanationEn: '"Your father" is singular male (he), so we use "Does".',
    explanationEs: '"Your father" equivale a "he", por lo que usamos "Does".',
  },
  {
    id: 'dodoes-6',
    number: 6,
    sentenceBefore: '',
    sentenceAfter: 'your friends speak English?',
    subject: 'your friends (they)',
    correctAnswer: 'Do',
    options: ['Do', 'Does'],
    fullSentenceEn: 'Do your friends speak English?',
    fullSentenceEs: '¿Hablan inglés tus amigos?',
    explanationEn: '"Your friends" is plural (they), so the auxiliary is "Do".',
    explanationEs: '"Your friends" es plural (they), así que el auxiliar es "Do".',
  },
  {
    id: 'dodoes-7',
    number: 7,
    sentenceBefore: '',
    sentenceAfter: 'your teacher drink coffee?',
    subject: 'your teacher (he/she)',
    correctAnswer: 'Does',
    options: ['Do', 'Does'],
    fullSentenceEn: 'Does your teacher drink coffee?',
    fullSentenceEs: '¿Toma café tu profesor/a?',
    explanationEn: '"Your teacher" is singular (he/she), so we use "Does".',
    explanationEs: '"Your teacher" es singular (he/she), por lo tanto usamos "Does".',
  },
  {
    id: 'dodoes-8',
    number: 8,
    sentenceBefore: '',
    sentenceAfter: 'you use Instagram?',
    subject: 'you',
    correctAnswer: 'Do',
    options: ['Do', 'Does'],
    fullSentenceEn: 'Do you use Instagram?',
    fullSentenceEs: '¿Usas Instagram?',
    explanationEn: 'Use "Do" with "you".',
    explanationEs: 'Usamos "Do" con "you".',
  },
];

export const PRESENT_SIMPLE_SELF_QUESTIONS: SelfQuestionItem[] = [
  {
    id: 'self-1',
    number: 1,
    questionEn: 'Do you like pizza?',
    questionEs: '¿Te gusta la pizza?',
    positiveAnswerEn: 'Yes, I do.',
    positiveAnswerEs: 'Sí, me gusta.',
    negativeAnswerEn: 'No, I don\'t.',
    negativeAnswerEs: 'No, no me gusta.',
    explanationEn: 'With "Do you...?", the short answers are "Yes, I do." or "No, I don\'t."',
    explanationEs: 'Para "Do you...?", las respuestas cortas correctas son "Yes, I do." o "No, I don\'t."',
  },
  {
    id: 'self-2',
    number: 2,
    questionEn: 'Do you drink coffee?',
    questionEs: '¿Tomas café?',
    positiveAnswerEn: 'Yes, I do.',
    positiveAnswerEs: 'Sí, tomo café.',
    negativeAnswerEn: 'No, I don\'t.',
    negativeAnswerEs: 'No, no tomo café.',
    explanationEn: 'Mirror the question\'s auxiliary: Do -> Yes, I do / No, I don\'t.',
    explanationEs: 'Refleja el auxiliar: Do -> Yes, I do / No, I don\'t.',
  },
  {
    id: 'self-3',
    number: 3,
    questionEn: 'Do you work on Saturdays?',
    questionEs: '¿Trabajas los sábados?',
    positiveAnswerEn: 'Yes, I do.',
    positiveAnswerEs: 'Sí, trabajo.',
    negativeAnswerEn: 'No, I don\'t.',
    negativeAnswerEs: 'No, descanso.',
    explanationEn: 'Positive: "Yes, I do." / Negative: "No, I don\'t."',
    explanationEs: 'Afirmativo: "Yes, I do." / Negativo: "No, I don\'t."',
  },
  {
    id: 'self-4',
    number: 4,
    questionEn: 'Do you watch movies?',
    questionEs: '¿Miras películas?',
    positiveAnswerEn: 'Yes, I do.',
    positiveAnswerEs: 'Sí, las miro.',
    negativeAnswerEn: 'No, I don\'t.',
    negativeAnswerEs: 'No, no las miro.',
    explanationEn: 'Short answer maintains the auxiliary: Yes, I do / No, I don\'t.',
    explanationEs: 'La respuesta corta mantiene el auxiliar: Yes, I do / No, I don\'t.',
  },
  {
    id: 'self-5',
    number: 5,
    questionEn: 'Do you play sports?',
    questionEs: '¿Practicas deportes?',
    positiveAnswerEn: 'Yes, I do.',
    positiveAnswerEs: 'Sí, practico.',
    negativeAnswerEn: 'No, I don\'t.',
    negativeAnswerEs: 'No, no practico.',
    explanationEn: 'Direct personal question with "Do": Yes, I do / No, I don\'t.',
    explanationEs: 'Pregunta personal con "Do": Yes, I do / No, I don\'t.',
  },
  {
    id: 'self-6',
    number: 6,
    questionEn: 'Does your best friend speak English?',
    questionEs: '¿Habla inglés tu mejor amigo/a?',
    positiveAnswerEn: 'Yes, he does. / Yes, she does.',
    positiveAnswerEs: 'Sí, habla inglés.',
    negativeAnswerEn: 'No, he doesn\'t. / No, she doesn\'t.',
    negativeAnswerEs: 'No, no habla inglés.',
    explanationEn: 'Question begins with "Does", so short answer uses "does" or "doesn\'t".',
    explanationEs: 'La pregunta empieza con "Does", por lo que la respuesta corta usa "does" o "doesn\'t".',
  },
];

// ---------------------------------------------------------------------------
// EXERCISE 4: FINAL CHALLENGE — MINI-CONVERSATIONS (Pages 7-8)
// ---------------------------------------------------------------------------
export const PRESENT_SIMPLE_MINI_CONVERSATIONS: MiniConversationDialogue[] = [
  {
    id: 'mc-a1',
    dialogueGroup: 'Conversation A · Part 1',
    dialogueGroupEs: 'Conversación A · Parte 1',
    speakerA_QuestionEn: '___ you like pizza?',
    speakerA_QuestionEs: '¿Te gusta la pizza?',
    speakerA_BlankWord: 'Do',
    speakerB_AnswerEn: 'Yes, I ___.',
    speakerB_AnswerEs: 'Sí, me gusta.',
    speakerB_BlankWord: 'do',
    hintEn: 'Question uses "Do", positive answer mirrors with "do".',
    hintEs: 'La pregunta usa "Do", la respuesta afirmativa refleja con "do".',
  },
  {
    id: 'mc-a2',
    dialogueGroup: 'Conversation A · Part 2',
    dialogueGroupEs: 'Conversación A · Parte 2',
    speakerA_QuestionEn: '___ your best friend like pizza?',
    speakerA_QuestionEs: '¿A tu mejor amigo le gusta la pizza?',
    speakerA_BlankWord: 'Does',
    speakerB_AnswerEn: 'No, he ___.',
    speakerB_AnswerEs: 'No, a él no le gusta.',
    speakerB_BlankWord: "doesn't",
    hintEn: '"your best friend" = he -> Does. Negative answer = doesn\'t.',
    hintEs: '"your best friend" = he -> Does. Respuesta negativa = doesn\'t.',
  },
  {
    id: 'mc-b1',
    dialogueGroup: 'Conversation B · Part 1',
    dialogueGroupEs: 'Conversación B · Parte 1',
    speakerA_QuestionEn: '___ you play football?',
    speakerA_QuestionEs: '¿Juegas al fútbol?',
    speakerA_BlankWord: 'Do',
    speakerB_AnswerEn: 'No, I ___.',
    speakerB_AnswerEs: 'No, no juego.',
    speakerB_BlankWord: "don't",
    hintEn: 'Question with "Do", negative answer with "don\'t".',
    hintEs: 'Pregunta con "Do", respuesta negativa con "don\'t".',
  },
  {
    id: 'mc-b2',
    dialogueGroup: 'Conversation B · Part 2',
    dialogueGroupEs: 'Conversación B · Parte 2',
    speakerA_QuestionEn: '___ you watch football?',
    speakerA_QuestionEs: '¿Miras partidos de fútbol?',
    speakerA_BlankWord: 'Do',
    speakerB_AnswerEn: 'Yes, I ___.',
    speakerB_AnswerEs: 'Sí, miro.',
    speakerB_BlankWord: 'do',
    hintEn: 'Question with "Do", affirmative answer with "do".',
    hintEs: 'Pregunta con "Do", respuesta afirmativa con "do".',
  },
  {
    id: 'mc-c1',
    dialogueGroup: 'Conversation C · Part 1',
    dialogueGroupEs: 'Conversación C · Parte 1',
    speakerA_QuestionEn: '___ she work in Buenos Aires?',
    speakerA_QuestionEs: '¿Trabaja ella en Buenos Aires?',
    speakerA_BlankWord: 'Does',
    speakerB_AnswerEn: 'Yes, she ___.',
    speakerB_AnswerEs: 'Sí, trabaja allí.',
    speakerB_BlankWord: 'does',
    hintEn: 'Subject "she" takes "Does", positive response takes "does".',
    hintEs: 'El sujeto "she" lleva "Does", la respuesta positiva lleva "does".',
  },
  {
    id: 'mc-c2',
    dialogueGroup: 'Conversation C · Part 2',
    dialogueGroupEs: 'Conversación C · Parte 2',
    speakerA_QuestionEn: '___ she like her job?',
    speakerA_QuestionEs: '¿Le gusta su trabajo?',
    speakerA_BlankWord: 'Does',
    speakerB_AnswerEn: 'Yes, she ___.',
    speakerB_AnswerEs: 'Sí, le gusta.',
    speakerB_BlankWord: 'does',
    hintEn: 'Third person "she" -> Does in question and does in answer.',
    hintEs: 'Tercera persona "she" -> Does en la pregunta y does en la respuesta.',
  },
];

// ---------------------------------------------------------------------------
// EXERCISE 5: PRESENT SIMPLE — A STRANGE DAY (Pages 9-11)
// ---------------------------------------------------------------------------

// Part A: Choose the correct option (8 Multiple Choice Items)
export const STRANGE_DAY_PART_A: StrangeDayChoiceQuestion[] = [
  {
    id: 'sd-a-1',
    number: 1,
    promptEn: 'Diego _______ coffee every morning, but he _______ tea.',
    promptEs: 'Diego _______ café cada mañana, pero no _______ té.',
    options: [
      { key: 'a', text: 'drink / don’t like', isCorrect: false },
      { key: 'b', text: 'drinks / doesn’t like', isCorrect: true },
      { key: 'c', text: 'drinks / don’t likes', isCorrect: false },
    ],
    explanationEn:
      'Correct: Diego is "he", so the affirmative verb needs -s ("drinks") and the negative uses "doesn’t" with base verb "like".',
    explanationEs:
      'Correcto: Diego equivale a "he", por lo que el afirmativo suma -s ("drinks") y la negación usa "doesn’t" con el verbo base "like".',
  },
  {
    id: 'sd-a-2',
    number: 2,
    promptEn: 'My neighbour _______ his dog for a walk at 3 a.m.',
    promptEs: 'Mi vecino _______ a su perro a pasear a las 3 de la madrugada.',
    options: [
      { key: 'a', text: 'take', isCorrect: false },
      { key: 'b', text: 'takes', isCorrect: true },
      { key: 'c', text: 'taking', isCorrect: false },
    ],
    explanationEn:
      'Correct: "My neighbour" is singular (he/she), so the verb in affirmative takes -s: "takes".',
    explanationEs:
      'Correcto: "My neighbour" es tercera persona singular (he/she), así que el verbo afirmativo agrega -s: "takes".',
  },
  {
    id: 'sd-a-3',
    number: 3,
    promptEn: '_______ your best friend _______ strange things on WhatsApp?',
    promptEs: '¿_______ tu mejor amigo cosas extrañas por WhatsApp?',
    options: [
      { key: 'a', text: 'Does / send', isCorrect: true },
      { key: 'b', text: 'Do / sends', isCorrect: false },
      { key: 'c', text: 'Does / sends', isCorrect: false },
    ],
    explanationEn:
      'Correct: "your best friend" is singular (he/she) -> auxiliary "Does", and the main verb must be base form without -s ("send").',
    explanationEs:
      'Correcto: "your best friend" es singular (he/she) -> auxiliar "Does", y el verbo principal queda en forma base sin -s ("send").',
  },
  {
    id: 'sd-a-4',
    number: 4,
    promptEn: 'My cat _______ me when I open the fridge.',
    promptEs: 'Mi gato siempre me _______ cuando abro la nevera.',
    options: [
      { key: 'a', text: 'always watches', isCorrect: true },
      { key: 'b', text: 'always watch', isCorrect: false },
      { key: 'c', text: 'is always watch', isCorrect: false },
    ],
    explanationEn:
      'Correct: "My cat" is singular (it), so "watch" ends in -ch and adds -es: "always watches".',
    explanationEs:
      'Correcto: "My cat" equivale a "it", y el verbo "watch" termina en -ch, por lo que añade -es: "always watches".',
  },
  {
    id: 'sd-a-5',
    number: 5,
    promptEn: 'We _______ pizza on Mondays because our diet _______ on Tuesdays.',
    promptEs: 'Nosotros _______ pizza los lunes porque nuestra dieta _______ los martes.',
    options: [
      { key: 'a', text: 'don’t eat / start', isCorrect: false },
      { key: 'b', text: 'doesn’t eat / starts', isCorrect: false },
      { key: 'c', text: 'don’t eat / starts', isCorrect: true },
    ],
    explanationEn:
      'Correct: "We" uses "don’t eat" (plural negative), while "our diet" is singular (it) and takes "starts".',
    explanationEs:
      'Correcto: Con "We" usamos "don’t eat" (negativo plural), mientras que "our diet" es singular (it) y lleva "starts".',
  },
  {
    id: 'sd-a-6',
    number: 6,
    promptEn: '_______ people really _______ money in their dreams?',
    promptEs: '¿La gente realmente _______ dinero en sus sueños?',
    options: [
      { key: 'a', text: 'Does / find', isCorrect: false },
      { key: 'b', text: 'Do / find', isCorrect: true },
      { key: 'c', text: 'Do / finds', isCorrect: false },
    ],
    explanationEn:
      'Correct: "People" is plural (they), so we use "Do" + base verb "find".',
    explanationEs:
      'Correcto: "People" es sustantivo plural (they), por lo que usamos "Do" + verbo base "find".',
  },
  {
    id: 'sd-a-7',
    number: 7,
    promptEn: 'My brother _______ his phone every five minutes. It’s almost a medical condition!',
    promptEs: 'Mi hermano _______ su teléfono cada cinco minutos. ¡Es casi una condición médica!',
    options: [
      { key: 'a', text: 'check', isCorrect: false },
      { key: 'b', text: 'checks', isCorrect: true },
      { key: 'c', text: 'checking', isCorrect: false },
    ],
    explanationEn:
      'Correct: "My brother" is "he", so in present simple affirmative we add -s: "checks".',
    explanationEs:
      'Correcto: "My brother" es "he", por lo que en presente simple afirmativo agregamos -s: "checks".',
  },
  {
    id: 'sd-a-8',
    number: 8,
    promptEn: 'Sarah _______ to work by bus because she _______ driving.',
    promptEs: 'Sarah _______ al trabajo en autobús porque no le _______ conducir.',
    options: [
      { key: 'a', text: 'goes / doesn’t like', isCorrect: true },
      { key: 'b', text: 'go / don’t like', isCorrect: false },
      { key: 'c', text: 'goes / don’t likes', isCorrect: false },
    ],
    explanationEn:
      'Correct: Sarah is "she", so affirmative = "goes" (go + es) and negative = "doesn’t like".',
    explanationEs:
      'Correcto: Sarah equivale a "she", por tanto afirmativo = "goes" (go + es) y negativo = "doesn’t like".',
  },
];

// Part B: Complete with the correct form of the verb (8 items)
export const STRANGE_DAY_PART_B: StrangeDayFillItem[] = [
  {
    id: 'sd-b-1',
    number: 1,
    sentenceBefore: 'My dog',
    verbPrompt: 'sleep',
    sentenceAfter: 'on my bed every night.',
    correctAnswers: ['sleeps'],
    fullSentenceEn: 'My dog sleeps on my bed every night.',
    fullSentenceEs: 'Mi perro duerme en mi cama todas las noches.',
    explanationEn: '"My dog" is singular (it/he), so the verb adds -s: "sleeps".',
    explanationEs: '"My dog" es tercera persona singular, por lo que el verbo suma -s: "sleeps".',
  },
  {
    id: 'sd-b-2',
    number: 2,
    sentenceBefore: 'I',
    verbPrompt: 'not / understand',
    sentenceAfter: 'people who put pineapple on pizza.',
    correctAnswers: ["don't understand", 'do not understand', 'dont understand'],
    fullSentenceEn: "I don't understand people who put pineapple on pizza.",
    fullSentenceEs: 'No entiendo a la gente que le pone piña a la pizza.',
    explanationEn: 'With "I", the negative in Present Simple is "don\'t understand".',
    explanationEs: 'Con "I", la negación en Presente Simple se construye con "don\'t understand".',
  },
  {
    id: 'sd-b-3',
    number: 3,
    sentenceBefore: 'My friends',
    verbPrompt: 'watch',
    sentenceAfter: 'football every weekend.',
    correctAnswers: ['watch'],
    fullSentenceEn: 'My friends watch football every weekend.',
    fullSentenceEs: 'Mis amigos miran fútbol cada fin de semana.',
    explanationEn: '"My friends" is plural (they), so the verb stays in base form: "watch".',
    explanationEs: '"My friends" es plural (they), por lo que el verbo se mantiene en su forma base: "watch".',
  },
  {
    id: 'sd-b-4',
    number: 4,
    sentenceBefore: 'My sister',
    verbPrompt: 'not / cook',
    sentenceAfter: 'very often.',
    correctAnswers: ["doesn't cook", 'does not cook', 'doesnt cook'],
    fullSentenceEn: "My sister doesn't cook very often.",
    fullSentenceEs: 'Mi hermana no cocina muy a menudo.',
    explanationEn: '"My sister" is singular (she), so negative is "doesn\'t cook".',
    explanationEs: '"My sister" es singular (she), por lo tanto la negación es "doesn\'t cook".',
  },
  {
    id: 'sd-b-5',
    number: 5,
    sentenceBefore: 'Does your mother',
    verbPrompt: 'use',
    sentenceAfter: 'Instagram?',
    correctAnswers: ['use'],
    fullSentenceEn: 'Does your mother use Instagram?',
    fullSentenceEs: '¿Tu madre usa Instagram?',
    explanationEn: 'After "Does", the main verb MUST be base form without -s: "use".',
    explanationEs: 'Después de "Does", el verbo principal DEBE ir en forma base sin -s: "use".',
  },
  {
    id: 'sd-b-6',
    number: 6,
    sentenceBefore: 'My neighbour',
    verbPrompt: 'talk',
    sentenceAfter: 'to his plants.',
    correctAnswers: ['talks'],
    fullSentenceEn: 'My neighbour talks to his plants.',
    fullSentenceEs: 'Mi vecino le habla a sus plantas.',
    explanationEn: '"My neighbour" is singular (he/she), so we add -s: "talks".',
    explanationEs: '"My neighbour" es singular (he/she), así que agregamos -s: "talks".',
  },
  {
    id: 'sd-b-7',
    number: 7,
    sentenceBefore: 'We',
    verbPrompt: 'not / believe',
    sentenceAfter: 'everything we see on the internet.',
    correctAnswers: ["don't believe", 'do not believe', 'dont believe'],
    fullSentenceEn: "We don't believe everything we see on the internet.",
    fullSentenceEs: 'No creemos todo lo que vemos en internet.',
    explanationEn: 'With "We", the negative auxiliary is "don\'t": "don\'t believe".',
    explanationEs: 'Con el pronombre "We", el auxiliar negativo es "don\'t": "don\'t believe".',
  },
  {
    id: 'sd-b-8',
    number: 8,
    sentenceBefore: 'Do you',
    verbPrompt: 'check',
    sentenceAfter: 'your phone before breakfast?',
    correctAnswers: ['check'],
    fullSentenceEn: 'Do you check your phone before breakfast?',
    fullSentenceEs: '¿Revisas tu teléfono antes del desayuno?',
    explanationEn: 'Question with "Do you" uses the base verb: "check".',
    explanationEs: 'Pregunta con "Do you" requiere el verbo en su forma base: "check".',
  },
];

// Part C: Find the mistake and correct it (6 items)
export const STRANGE_DAY_PART_C: StrangeDayMistakeItem[] = [
  {
    id: 'sd-c-1',
    number: 1,
    incorrectSentence: "My brother don't like Mondays.",
    correctSentence: "My brother doesn't like Mondays.",
    translationEs: 'A mi hermano no le gustan los lunes.',
    mistakeWord: "don't",
    correctedWord: "doesn't",
    ruleEn: '"My brother" is third person singular (he), so we must use "doesn\'t", not "don\'t".',
    ruleEs: '"My brother" es tercera persona singular (he), por lo que debemos usar "doesn\'t", no "don\'t".',
  },
  {
    id: 'sd-c-2',
    number: 2,
    incorrectSentence: 'She work in a hospital.',
    correctSentence: 'She works in a hospital.',
    translationEs: 'Ella trabaja en un hospital.',
    mistakeWord: 'work',
    correctedWord: 'works',
    ruleEn: 'Affirmative statements with "she" require adding -s to the verb: "works".',
    ruleEs: 'Las oraciones afirmativas con "she" exigen añadir -s al verbo: "works".',
  },
  {
    id: 'sd-c-3',
    number: 3,
    incorrectSentence: 'Does he likes pizza?',
    correctSentence: 'Does he like pizza?',
    translationEs: '¿A él le gusta la pizza?',
    mistakeWord: 'likes',
    correctedWord: 'like',
    ruleEn: 'DOES takes the S! The main verb must be in base form without -s: "like".',
    ruleEs: '¡DOES ya se lleva la S! El verbo principal debe quedar en forma base: "like".',
  },
  {
    id: 'sd-c-4',
    number: 4,
    incorrectSentence: "I doesn't watch TV every day.",
    correctSentence: "I don't watch TV every day.",
    translationEs: 'No miro televisión todos los días.',
    mistakeWord: "doesn't",
    correctedWord: "don't",
    ruleEn: 'With the subject pronoun "I", the negative is "don\'t", never "doesn\'t".',
    ruleEs: 'Con el sujeto "I", la negación correcta es "don\'t", jamás "doesn\'t".',
  },
  {
    id: 'sd-c-5',
    number: 5,
    incorrectSentence: 'They goes to the gym on Fridays.',
    correctSentence: 'They go to the gym on Fridays.',
    translationEs: 'Ellos van al gimnasio los viernes.',
    mistakeWord: 'goes',
    correctedWord: 'go',
    ruleEn: '"They" is plural, so the verb stays in base form "go" (do NOT add -es).',
    ruleEs: '"They" es plural, por lo que el verbo queda en forma base "go" (NO se añade -es).',
  },
  {
    id: 'sd-c-6',
    number: 6,
    incorrectSentence: 'Do your sister speak English?',
    correctSentence: 'Does your sister speak English?',
    translationEs: '¿Tu hermana habla inglés?',
    mistakeWord: 'Do',
    correctedWord: 'Does',
    ruleEn: '"Your sister" is singular (she), so the question must start with "Does".',
    ruleEs: '"Your sister" equivale a "she" (singular), por lo que la pregunta debe iniciar con "Does".',
  },
];

// Part D: One last challenge (6 creative prompts)
export const STRANGE_DAY_PART_D: StrangeDayCreativeItem[] = [
  {
    id: 'sd-d-1',
    number: 1,
    promptPrefixEn: 'I always',
    promptSuffixEn: 'when nobody is watching.',
    translationEs: 'Siempre __________ cuando nadie está mirando.',
    sampleAnswerEn: 'I always dance when nobody is watching.',
    sampleAnswerEs: 'Siempre bailo cuando nadie está mirando.',
    grammarTipEn: 'Use base verb after "I": dance, sing, eat cookies.',
    grammarTipEs: 'Usa el verbo base con "I": dance, sing, eat cookies.',
  },
  {
    id: 'sd-d-2',
    number: 2,
    promptPrefixEn: 'My best friend never',
    promptSuffixEn: '.',
    translationEs: 'Mi mejor amigo nunca __________.',
    sampleAnswerEn: 'My best friend never arrives on time.',
    sampleAnswerEs: 'Mi mejor amigo nunca llega puntual.',
    grammarTipEn: '"My best friend" = he/she -> add -s to the verb: arrives, cooks, sleeps late.',
    grammarTipEs: '"My best friend" = he/she -> agrega -s al verbo: arrives, cooks, sleeps late.',
  },
  {
    id: 'sd-d-3',
    number: 3,
    promptPrefixEn: 'My neighbour usually',
    promptSuffixEn: '.',
    translationEs: 'Mi vecino usualmente __________.',
    sampleAnswerEn: 'My neighbour usually plays guitar at midnight.',
    sampleAnswerEs: 'Mi vecino usualmente toca la guitarra a la medianoche.',
    grammarTipEn: 'Singular third person with frequency adverb: usually + verb with -s.',
    grammarTipEs: 'Tercera persona singular con adverbio de frecuencia: usually + verbo con -s.',
  },
  {
    id: 'sd-d-4',
    number: 4,
    promptPrefixEn: "I don't",
    promptSuffixEn: 'before breakfast.',
    translationEs: 'No __________ antes del desayuno.',
    sampleAnswerEn: "I don't check my emails before breakfast.",
    sampleAnswerEs: 'No reviso mis correos antes del desayuno.',
    grammarTipEn: 'Negative with "don\'t" + base verb: check, talk, run.',
    grammarTipEs: 'Negación con "don\'t" + verbo base: check, talk, run.',
  },
  {
    id: 'sd-d-5',
    number: 5,
    promptPrefixEn: "My phone doesn't",
    promptSuffixEn: '.',
    translationEs: 'Mi teléfono no __________.',
    sampleAnswerEn: "My phone doesn't ring on weekends.",
    sampleAnswerEs: 'Mi teléfono no suena los fines de semana.',
    grammarTipEn: '"My phone" = it -> doesn\'t + base verb (ring, work, vibrate).',
    grammarTipEs: '"My phone" = it -> doesn\'t + verbo base (ring, work, vibrate).',
  },
  {
    id: 'sd-d-6',
    number: 6,
    promptPrefixEn: 'Does your family',
    promptSuffixEn: '?',
    translationEs: '¿Tu familia __________?',
    sampleAnswerEn: 'Does your family travel together every summer?',
    sampleAnswerEs: '¿Viaja tu familia junta cada verano?',
    grammarTipEn: 'Does + family + base verb: travel, eat pizza, watch movies.',
    grammarTipEs: 'Does + family + verbo base: travel, eat pizza, watch movies.',
  },
];

// ---------------------------------------------------------------------------
// SECTION 1 EXERCISE WRAPPER
// ---------------------------------------------------------------------------
export const PRESENT_SIMPLE_MASTERCLASS_EXERCISES: Exercise[] = [
  {
    id: 'present-simple-masterclass-overview',
    type: 'present-simple-masterclass',
    title: 'PRESENT SIMPLE — GRAMMAR MASTERCLASS',
    titleEs: 'Presente Simple — Gramática y Práctica Completa',
    instructions:
      'Master the Present Simple: uses, affirmative rules, Yes/No questions with Do/Does, short answers, "A Strange Day" multi-part practice and error correction with reversible cards and audio.',
    instructionsEs:
      'Domina el Presente Simple: usos, reglas afirmativas, preguntas de Sí/No con Do/Does, respuestas cortas, práctica completa "A Strange Day" y corrección de errores con tarjetas reversibles y audio.',
  },
];
