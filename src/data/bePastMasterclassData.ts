import { Exercise } from '../types';

export interface BePastTheoryTopic {
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

export interface BePastFillItem {
  id: string;
  number: number;
  sentenceBefore: string;
  sentenceAfter: string;
  fullSentenceEn: string;
  fullSentenceEs: string;
  correctAnswer: string;
  options: string[];
  explanationEn: string;
  explanationEs: string;
}

export interface BePastQuestionItem {
  id: string;
  number: number;
  statementEn: string;
  statementEs: string;
  questionEn: string;
  questionEs: string;
  shortAnswerPositiveEn: string;
  shortAnswerNegativeEn: string;
  shortAnswerPositiveEs: string;
  shortAnswerNegativeEs: string;
  explanationEn: string;
  explanationEs: string;
}

export interface BePastMultipleChoiceQuestion {
  id: string;
  number: number;
  questionEn: string;
  questionEs: string;
  options: {
    key: 'A' | 'B' | 'C' | 'D';
    text: string;
    isCorrect: boolean;
  }[];
  explanationEn: string;
  explanationEs: string;
}

// ---------------------------------------------------------------------------
// 8 THEORY TOPICS FOR "BE IN THE PAST — WAS / WERE"
// ---------------------------------------------------------------------------
export const BE_PAST_THEORY_TOPICS: BePastTheoryTopic[] = [
  {
    id: 'bpt-1',
    category: '1. A Little Explanation',
    categoryEs: '1. Una Breve Explicación',
    titleEn: "Let's Go Back to the Past!",
    titleEs: '¡Regresemos al Pasado!',
    textEn:
      'Remember that BE is a special verb. In the present we have am, is, and are, but when we travel to the past, we only have two friends: WAS and WERE. WAS goes with I, he, she, and it. WERE goes with you, we, and they. That\'s it! Don\'t make it more complicated than it is.',
    textEs:
      '¡Recuerda que BE es un verbo especial! En presente tenemos am, is y are, pero cuando vamos al pasado solo tenemos dos amigos: WAS y WERE. WAS se usa con I, he, she e it. WERE se usa con you, we y they. ¡Eso es todo! No lo compliques más de lo que es.',
    examples: [
      {
        en: 'I was / He was / She was / It was',
        es: 'Yo era-estaba / Él era-estaba / Ella era-estaba / Eso era-estaba',
        noteEn: 'WAS is used with 1st and 3rd person singular.',
        noteEs: 'WAS se utiliza con 1ª y 3ª persona del singular.',
      },
      {
        en: 'You were / We were / They were',
        es: 'Tú eras-estabas / Nosotros éramos-estábamos / Ellos eran-estaban',
        noteEn: 'WERE is used with plural pronouns and "you" (singular & plural).',
        noteEs: 'WERE se utiliza con pronombres plurales y con "you" (tú y ustedes).',
      },
    ],
    grammarTipEn:
      'Pro Tip: "You" ALWAYS takes "were", whether referring to one person (you were late) or many people (you all were late).',
    grammarTipEs:
      'Consejo profesional: "You" SIEMPRE lleva "were", tanto si se refiere a una sola persona como a un grupo.',
  },
  {
    id: 'bpt-2',
    category: '2. When Do We Use Was / Were?',
    categoryEs: '2. ¿Cuándo Usamos Was / Were?',
    titleEn: 'Usage: Situations, Places, Feelings & Age',
    titleEs: 'Usos: Situaciones, Lugares, Emociones y Edad',
    textEn:
      'We use was and were to talk about a situation, a place, a feeling, an age, the weather, or a condition in the past.',
    textEs:
      'Usamos was y were para hablar sobre una situación, un lugar, un sentimiento, una edad, el clima o una condición en el pasado.',
    examples: [
      {
        en: 'Feeling: I was tired yesterday.',
        es: 'Sentimiento: Estaba cansado ayer.',
        noteEn: 'Describes a physical or emotional state.',
        noteEs: 'Describe un estado físico o emocional.',
      },
      {
        en: 'Place: She was at work. / We were at home.',
        es: 'Lugar: Ella estaba en el trabajo. / Estábamos en casa.',
        noteEn: 'Preposition "at" indicates location.',
        noteEs: 'La preposición "at" indica ubicación.',
      },
      {
        en: 'Age: He was 20 years old.',
        es: 'Edad: Él tenía 20 años.',
        noteEn: 'In English, age uses the verb BE, not "have".',
        noteEs: 'En inglés la edad usa el verbo BE, no "tener".',
      },
      {
        en: 'Weather: It was cold.',
        es: 'Clima: Hacía frío.',
        noteEn: 'Weather conditions use the dummy subject "It".',
        noteEs: 'Las condiciones climáticas usan el sujeto impersonal "It".',
      },
      {
        en: 'Condition: You were late. / They were very happy.',
        es: 'Condición: Llegaste tarde. / Ellos estaban muy felices.',
        noteEn: 'Past condition or timeliness.',
        noteEs: 'Condición pasada o puntualidad.',
      },
    ],
    grammarTipEn:
      'Spanish alert: In Spanish we say "Él tenía 20 años", but in English you MUST say "He was 20 years old" (never say "He had 20 years").',
    grammarTipEs:
      'Alerta para hispanohablantes: En español decimos "Él tenía 20 años", pero en inglés DEBES decir "He was 20 years old" (nunca digas "He had 20 years").',
  },
  {
    id: 'bpt-3',
    category: "3. Crucial Warning: No 'DID'",
    categoryEs: "3. Advertencia Crucial: ¡Sin 'DID'!",
    titleEn: "BE Doesn't Need DID!",
    titleEs: '¡BE No Necesita a DID!',
    textEn:
      'Notice something extremely important: we do NOT use DID with the verb BE. We don\'t say: ❌ Did you were tired? We say: ✅ Were you tired? BE doesn\'t need auxiliary DID. BE likes to do things by itself!',
    textEs:
      'Fíjate en algo sumamente importante: NO usamos el auxiliar DID con el verbo BE. No decimos: ❌ Did you were tired? Decimos: ✅ Were you tired? ¡El verbo BE no necesita a DID, a BE le gusta hacer las cosas por sí mismo!',
    examples: [
      {
        en: '❌ INCORRECT: Did you was happy? / Did you were at home?',
        es: '❌ INCORRECTO: ¿Did you was happy? / ¿Did you were at home?',
        noteEn: 'Never combine "did" with was or were.',
        noteEs: 'Nunca combines "did" con was o were.',
      },
      {
        en: '✅ CORRECT: Were you happy? / Were you at home?',
        es: '✅ CORRECTO: ¿Estabas feliz? / ¿Estabas en casa?',
        noteEn: 'Simply invert the subject and verb BE.',
        noteEs: 'Simplemente invierte el sujeto y el verbo BE.',
      },
      {
        en: '✅ NEGATIVE: She wasn\'t tired. (NOT: She didn\'t was tired)',
        es: '✅ NEGATIVA: Ella no estaba cansada. (NO: She didn\'t was tired)',
        noteEn: 'Add "not" directly to was/were.',
        noteEs: 'Añade "not" directamente a was/were.',
      },
    ],
    grammarTipEn:
      'Rule: In English past tense questions, ordinary verbs take DID (Did you work?), but BE inverts itself (Were you at work?).',
    grammarTipEs:
      'Regla: En preguntas de pasado en inglés, los verbos comunes usan DID (Did you work?), pero BE se invierte solo (Were you at work?).',
  },
  {
    id: 'bpt-4',
    category: '4. Positive Statements',
    categoryEs: '4. Oraciones Afirmativas',
    titleEn: 'WAS / WERE — Affirmative Examples',
    titleEs: 'WAS / WERE — Ejemplos Afirmativos',
    textEn:
      'In affirmative statements, place the subject first, followed immediately by was or were and the complement.',
    textEs:
      'En oraciones afirmativas, coloca primero el sujeto, seguido inmediatamente de was o were y el complemento.',
    examples: [
      {
        en: 'I was tired.',
        es: 'Yo estaba cansado/a.',
      },
      {
        en: 'She was at home.',
        es: 'Ella estaba en casa.',
      },
      {
        en: 'He was angry.',
        es: 'Él estaba enojado.',
      },
      {
        en: 'It was expensive.',
        es: 'Era caro / costoso.',
      },
      {
        en: 'You were late.',
        es: 'Llegaste tarde.',
      },
      {
        en: 'We were hungry.',
        es: 'Teníamos hambre / Estábamos hambrientos.',
      },
      {
        en: 'They were happy.',
        es: 'Ellos estaban felices / Eran felices.',
      },
    ],
    grammarTipEn:
      'Remember: "was" for singular (I, he, she, it); "were" for plural (we, they) and "you".',
    grammarTipEs:
      'Recuerda: "was" para singular (I, he, she, it); "were" para plural (we, they) y "you".',
  },
  {
    id: 'bpt-5',
    category: '5. Negative Statements',
    categoryEs: '5. Oraciones Negativas',
    titleEn: 'WAS NOT (wasn\'t) & WERE NOT (weren\'t)',
    titleEs: 'WAS NOT (wasn\'t) y WERE NOT (weren\'t)',
    textEn:
      'For the negative, we simply add NOT after was or were. Very easy: was + not → wasn\'t, were + not → weren\'t.',
    textEs:
      'Para la forma negativa, simplemente agregamos NOT después de was o were. Muy fácil: was + not → wasn\'t, were + not → weren\'t.',
    examples: [
      {
        en: "I wasn't tired.",
        es: 'Yo no estaba cansado/a.',
        noteEn: 'wasn\'t = was not',
        noteEs: 'wasn\'t = was not',
      },
      {
        en: "She wasn't at home.",
        es: 'Ella no estaba en casa.',
        noteEn: 'wasn\'t = was not',
        noteEs: 'wasn\'t = was not',
      },
      {
        en: "He wasn't angry.",
        es: 'Él no estaba enojado.',
        noteEn: 'wasn\'t = was not',
        noteEs: 'wasn\'t = was not',
      },
      {
        en: "We weren't hungry.",
        es: 'No teníamos hambre.',
        noteEn: 'weren\'t = were not',
        noteEs: 'weren\'t = were not',
      },
      {
        en: "They weren't happy.",
        es: 'Ellos no estaban felices.',
        noteEn: 'weren\'t = were not',
        noteEs: 'weren\'t = were not',
      },
    ],
    grammarTipEn:
      'Contraction tip: In spoken and casual written English, native speakers almost always use "wasn\'t" and "weren\'t".',
    grammarTipEs:
      'Consejo de contracciones: Al hablar y en escritura informal, los hablantes nativos casi siempre usan "wasn\'t" y "weren\'t".',
  },
  {
    id: 'bpt-6',
    category: '6. Yes / No Questions',
    categoryEs: '6. Preguntas de Sí / No',
    titleEn: 'Inverting Subject & Verb',
    titleEs: 'Invertir Sujeto y Verbo',
    textEn:
      'Now we change the order! The was/were moves to the very front of the sentence: "You were tired" becomes "Were you tired?".',
    textEs:
      '¡Ahora cambiamos el orden! El was/were se mueve al frente de la oración: "You were tired" se convierte en "¿Were you tired?".',
    examples: [
      {
        en: 'She was tired. → Was she tired?',
        es: 'Ella estaba cansada. → ¿Estaba ella cansada?',
      },
      {
        en: 'He was at home. → Was he at home?',
        es: 'Él estaba en casa. → ¿Estaba él en casa?',
      },
      {
        en: 'They were late. → Were they late?',
        es: 'Ellos llegaron tarde. → ¿Llegaron tarde?',
      },
      {
        en: 'You were busy. → Were you busy?',
        es: 'Estabas ocupado. → ¿Estabas ocupado?',
      },
    ],
    grammarTipEn:
      'Short answers formula: "Yes, [pronoun] was/were." or "No, [pronoun] wasn\'t/weren\'t." Never answer just "Yes" or "No" in polite English.',
    grammarTipEs:
      'Fórmula de respuestas cortas: "Yes, [pronombre] was/were." o "No, [pronombre] wasn\'t/weren\'t." Nunca respondas solo "Yes" o "No" en inglés cortés.',
  },
  {
    id: 'bpt-7',
    category: '7. Short Answers',
    categoryEs: '7. Respuestas Cortas',
    titleEn: 'Yes, she was / No, she wasn\'t',
    titleEs: 'Respuestas Cortas con Was / Were',
    textEn:
      'In short answers, repeat the verb BE in its corresponding affirmative or negative form. Do not use contractions in positive short answers (say "Yes, I was", never "Yes, I\'s").',
    textEs:
      'En respuestas cortas repetimos el verbo BE en su forma afirmativa o negativa correspondiente. No uses contracciones en respuestas cortas afirmativas (di "Yes, I was", nunca "Yes, I\'s").',
    examples: [
      {
        en: 'Was she tired? → Yes, she was. / No, she wasn\'t.',
        es: '¿Estaba ella cansada? → Sí, lo estaba. / No, no lo estaba.',
      },
      {
        en: 'Were they late? → Yes, they were. / No, they weren\'t.',
        es: '¿Llegaron ellos tarde? → Sí, lo hicieron. / No, no lo hicieron.',
      },
      {
        en: 'Were you at work? → Yes, I was. / No, I wasn\'t.',
        es: '¿Estabas en el trabajo? → Sí, estaba. / No, no estaba.',
      },
    ],
    grammarTipEn:
      'Notice pronoun shift: If someone asks "Were you...?", you respond with "I" ("Yes, I was." / "No, I wasn\'t.").',
    grammarTipEs:
      'Cambio de pronombre: Si alguien te pregunta "¿Were you...?", respondes con "I" ("Yes, I was." / "No, I wasn\'t.").',
  },
  {
    id: 'bpt-8',
    category: '8. WH- Questions',
    categoryEs: '8. Preguntas con WH-',
    titleEn: 'Asking for More Information',
    titleEs: 'Preguntar por Más Información con WH-',
    textEn:
      'We use Wh- question words (Where, Why, When, How, Who, What) to ask for specific information. The exact formula is: QUESTION WORD + WAS/WERE + PERSON (SUBJECT).',
    textEs:
      'Usamos palabras interrogativas WH- (Where, Why, When, How, Who, What) para pedir información específica. La fórmula exacta es: PALABRA INTERROGATIVA + WAS/WERE + PERSONA (SUJETO).',
    examples: [
      {
        en: 'Where were you yesterday?',
        es: '¿Dónde estuviste ayer?',
        noteEn: 'Where + were + you?',
        noteEs: 'Where + were + you?',
      },
      {
        en: 'Why was she angry?',
        es: '¿Por qué estaba ella enojada?',
        noteEn: 'Why + was + she?',
        noteEs: 'Why + was + she?',
      },
      {
        en: 'Where was he last night?',
        es: '¿Dónde estuvo él anoche?',
        noteEn: 'Where + was + he?',
        noteEs: 'Where + was + he?',
      },
      {
        en: 'When were they in London?',
        es: '¿Cuándo estuvieron ellos en Londres?',
        noteEn: 'When + were + they?',
        noteEs: 'When + were + they?',
      },
      {
        en: 'How was your weekend? / How was the movie?',
        es: '¿Cómo estuvo tu fin de semana? / ¿Cómo estuvo la película?',
        noteEn: 'How + was + the movie/weekend?',
        noteEs: 'How + was + the movie/weekend?',
      },
      {
        en: 'Who was at the party?',
        es: '¿Quién estuvo en la fiesta?',
        noteEn: 'Who acts as singular subject followed by was.',
        noteEs: 'Who actúa como sujeto singular seguido de was.',
      },
    ],
    grammarTipEn:
      'Structure checklist: Question Word (Where) + Auxiliary BE (were) + Subject (you) + Time/Place (yesterday)?',
    grammarTipEs:
      'Estructura clave: Palabra interrogativa (Where) + Verbo BE (were) + Sujeto (you) + Tiempo/Lugar (yesterday)?',
  },
];

// ---------------------------------------------------------------------------
// EXERCISE 1 — WAS or WERE? (10 items)
// ---------------------------------------------------------------------------
export const BE_PAST_EXERCISE_1_ITEMS: BePastFillItem[] = [
  {
    id: 'bp-ex1-1',
    number: 1,
    sentenceBefore: 'I',
    sentenceAfter: 'very tired yesterday.',
    fullSentenceEn: 'I was very tired yesterday.',
    fullSentenceEs: 'Yo estaba muy cansado ayer.',
    correctAnswer: 'was',
    options: ['was', 'were'],
    explanationEn: 'Use "was" with the first-person singular pronoun "I".',
    explanationEs: 'Se usa "was" con el pronombre singular de primera persona "I".',
  },
  {
    id: 'bp-ex1-2',
    number: 2,
    sentenceBefore: 'She',
    sentenceAfter: 'at home.',
    fullSentenceEn: 'She was at home.',
    fullSentenceEs: 'Ella estaba en casa.',
    correctAnswer: 'was',
    options: ['was', 'were'],
    explanationEn: 'Use "was" with the third-person singular pronoun "she".',
    explanationEs: 'Se usa "was" con el pronombre singular de tercera persona "she".',
  },
  {
    id: 'bp-ex1-3',
    number: 3,
    sentenceBefore: 'They',
    sentenceAfter: 'very happy.',
    fullSentenceEn: 'They were very happy.',
    fullSentenceEs: 'Ellos estaban muy felices.',
    correctAnswer: 'were',
    options: ['was', 'were'],
    explanationEn: 'Use "were" with the plural pronoun "they".',
    explanationEs: 'Se usa "were" con el pronombre plural "they".',
  },
  {
    id: 'bp-ex1-4',
    number: 4,
    sentenceBefore: 'We',
    sentenceAfter: 'late.',
    fullSentenceEn: 'We were late.',
    fullSentenceEs: 'Nosotros llegamos tarde.',
    correctAnswer: 'were',
    options: ['was', 'were'],
    explanationEn: 'Use "were" with the first-person plural pronoun "we".',
    explanationEs: 'Se usa "were" con el pronombre plural de primera persona "we".',
  },
  {
    id: 'bp-ex1-5',
    number: 5,
    sentenceBefore: 'He',
    sentenceAfter: 'angry.',
    fullSentenceEn: 'He was angry.',
    fullSentenceEs: 'Él estaba enojado.',
    correctAnswer: 'was',
    options: ['was', 'were'],
    explanationEn: 'Use "was" with the third-person singular pronoun "he".',
    explanationEs: 'Se usa "was" con el pronombre singular de tercera persona "he".',
  },
  {
    id: 'bp-ex1-6',
    number: 6,
    sentenceBefore: 'You',
    sentenceAfter: 'very busy.',
    fullSentenceEn: 'You were very busy.',
    fullSentenceEs: 'Tú estabas muy ocupado / Ustedes estaban muy ocupados.',
    correctAnswer: 'were',
    options: ['was', 'were'],
    explanationEn: '"You" always takes "were", whether singular or plural.',
    explanationEs: '"You" siempre toma "were", tanto en singular como en plural.',
  },
  {
    id: 'bp-ex1-7',
    number: 7,
    sentenceBefore: 'It',
    sentenceAfter: 'very cold.',
    fullSentenceEn: 'It was very cold.',
    fullSentenceEs: 'Hacía mucho frío / Estaba muy frío.',
    correctAnswer: 'was',
    options: ['was', 'were'],
    explanationEn: 'Use "was" with the third-person singular pronoun "it".',
    explanationEs: 'Se usa "was" con el pronombre singular "it".',
  },
  {
    id: 'bp-ex1-8',
    number: 8,
    sentenceBefore: 'My parents',
    sentenceAfter: 'at work.',
    fullSentenceEn: 'My parents were at work.',
    fullSentenceEs: 'Mis padres estaban en el trabajo.',
    correctAnswer: 'were',
    options: ['was', 'were'],
    explanationEn: '"My parents" is plural (equals "they"), so we use "were".',
    explanationEs: '"My parents" es un sujeto plural (equivale a "they"), por lo que usamos "were".',
  },
  {
    id: 'bp-ex1-9',
    number: 9,
    sentenceBefore: 'The movie',
    sentenceAfter: 'fantastic.',
    fullSentenceEn: 'The movie was fantastic.',
    fullSentenceEs: 'La película estuvo fantástica.',
    correctAnswer: 'was',
    options: ['was', 'were'],
    explanationEn: '"The movie" is singular (equals "it"), so we use "was".',
    explanationEs: '"The movie" es un sustantivo singular (equivale a "it"), por lo que usamos "was".',
  },
  {
    id: 'bp-ex1-10',
    number: 10,
    sentenceBefore: 'I',
    sentenceAfter: 'at school yesterday.',
    fullSentenceEn: 'I was at school yesterday.',
    fullSentenceEs: 'Yo estuve en la escuela ayer.',
    correctAnswer: 'was',
    options: ['was', 'were'],
    explanationEn: 'Use "was" with "I".',
    explanationEs: 'Se usa "was" con "I".',
  },
];

// ---------------------------------------------------------------------------
// EXERCISE 2 — COMPLETE THE SENTENCES (wasn't or weren't) (8 items)
// ---------------------------------------------------------------------------
export const BE_PAST_EXERCISE_2_ITEMS: BePastFillItem[] = [
  {
    id: 'bp-ex2-1',
    number: 1,
    sentenceBefore: 'I',
    sentenceAfter: 'at home yesterday.',
    fullSentenceEn: "I wasn't at home yesterday.",
    fullSentenceEs: 'Yo no estuve en casa ayer.',
    correctAnswer: "wasn't",
    options: ["wasn't", "weren't"],
    explanationEn: 'Negative for "I" is "was not" -> "wasn\'t".',
    explanationEs: 'La forma negativa para "I" es "was not" -> "wasn\'t".',
  },
  {
    id: 'bp-ex2-2',
    number: 2,
    sentenceBefore: 'She',
    sentenceAfter: 'tired.',
    fullSentenceEn: "She wasn't tired.",
    fullSentenceEs: 'Ella no estaba cansada.',
    correctAnswer: "wasn't",
    options: ["wasn't", "weren't"],
    explanationEn: 'Negative for "she" is "was not" -> "wasn\'t".',
    explanationEs: 'La forma negativa para "she" es "was not" -> "wasn\'t".',
  },
  {
    id: 'bp-ex2-3',
    number: 3,
    sentenceBefore: 'They',
    sentenceAfter: 'happy.',
    fullSentenceEn: "They weren't happy.",
    fullSentenceEs: 'Ellos no estaban felices.',
    correctAnswer: "weren't",
    options: ["wasn't", "weren't"],
    explanationEn: 'Negative for "they" is "were not" -> "weren\'t".',
    explanationEs: 'La forma negativa para "they" es "were not" -> "weren\'t".',
  },
  {
    id: 'bp-ex2-4',
    number: 4,
    sentenceBefore: 'We',
    sentenceAfter: 'late.',
    fullSentenceEn: "We weren't late.",
    fullSentenceEs: 'Nosotros no llegamos tarde.',
    correctAnswer: "weren't",
    options: ["wasn't", "weren't"],
    explanationEn: 'Negative for "we" is "were not" -> "weren\'t".',
    explanationEs: 'La forma negativa para "we" es "were not" -> "weren\'t".',
  },
  {
    id: 'bp-ex2-5',
    number: 5,
    sentenceBefore: 'He',
    sentenceAfter: 'at work.',
    fullSentenceEn: "He wasn't at work.",
    fullSentenceEs: 'Él no estaba en el trabajo.',
    correctAnswer: "wasn't",
    options: ["wasn't", "weren't"],
    explanationEn: 'Negative for "he" is "was not" -> "wasn\'t".',
    explanationEs: 'La forma negativa para "he" es "was not" -> "wasn\'t".',
  },
  {
    id: 'bp-ex2-6',
    number: 6,
    sentenceBefore: 'You',
    sentenceAfter: 'alone.',
    fullSentenceEn: "You weren't alone.",
    fullSentenceEs: 'Tú no estabas solo / Ustedes no estaban solos.',
    correctAnswer: "weren't",
    options: ["wasn't", "weren't"],
    explanationEn: 'Negative for "you" is "were not" -> "weren\'t".',
    explanationEs: 'La forma negativa para "you" es "were not" -> "weren\'t".',
  },
  {
    id: 'bp-ex2-7',
    number: 7,
    sentenceBefore: 'It',
    sentenceAfter: 'expensive.',
    fullSentenceEn: "It wasn't expensive.",
    fullSentenceEs: 'No era caro.',
    correctAnswer: "wasn't",
    options: ["wasn't", "weren't"],
    explanationEn: 'Negative for "it" is "was not" -> "wasn\'t".',
    explanationEs: 'La forma negativa para "it" es "was not" -> "wasn\'t".',
  },
  {
    id: 'bp-ex2-8',
    number: 8,
    sentenceBefore: 'They',
    sentenceAfter: 'ready.',
    fullSentenceEn: "They weren't ready.",
    fullSentenceEs: 'Ellos no estaban listos.',
    correctAnswer: "weren't",
    options: ["wasn't", "weren't"],
    explanationEn: 'Negative for "they" is "were not" -> "weren\'t".',
    explanationEs: 'La forma negativa para "they" es "were not" -> "weren\'t".',
  },
];

// ---------------------------------------------------------------------------
// EXERCISE 3 — MAKE QUESTIONS (8 items)
// ---------------------------------------------------------------------------
export const BE_PAST_EXERCISE_3_ITEMS: BePastQuestionItem[] = [
  {
    id: 'bp-ex3-1',
    number: 1,
    statementEn: 'He was at home.',
    statementEs: 'Él estaba en casa.',
    questionEn: 'Was he at home?',
    questionEs: '¿Estaba él en casa?',
    shortAnswerPositiveEn: 'Yes, he was.',
    shortAnswerNegativeEn: "No, he wasn't.",
    shortAnswerPositiveEs: 'Sí, lo estaba.',
    shortAnswerNegativeEs: 'No, no lo estaba.',
    explanationEn: 'Move "was" to the beginning before the subject "he".',
    explanationEs: 'Mueve "was" al inicio antes del sujeto "he".',
  },
  {
    id: 'bp-ex3-2',
    number: 2,
    statementEn: 'They were happy.',
    statementEs: 'Ellos estaban felices.',
    questionEn: 'Were they happy?',
    questionEs: '¿Estaban ellos felices?',
    shortAnswerPositiveEn: 'Yes, they were.',
    shortAnswerNegativeEn: "No, they weren't.",
    shortAnswerPositiveEs: 'Sí, lo estaban.',
    shortAnswerNegativeEs: 'No, no lo estaban.',
    explanationEn: 'Move "were" to the beginning before the subject "they".',
    explanationEs: 'Mueve "were" al inicio antes del sujeto "they".',
  },
  {
    id: 'bp-ex3-3',
    number: 3,
    statementEn: 'You were late.',
    statementEs: 'Llegaste tarde.',
    questionEn: 'Were you late?',
    questionEs: '¿Llegaste tarde?',
    shortAnswerPositiveEn: 'Yes, I was.',
    shortAnswerNegativeEn: "No, I wasn't.",
    shortAnswerPositiveEs: 'Sí, llegué tarde.',
    shortAnswerNegativeEs: 'No, no llegué tarde.',
    explanationEn: 'Move "were" to the front: "Were you late?".',
    explanationEs: 'Mueve "were" al inicio: "¿Were you late?".',
  },
  {
    id: 'bp-ex3-4',
    number: 4,
    statementEn: 'She was angry.',
    statementEs: 'Ella estaba enojada.',
    questionEn: 'Was she angry?',
    questionEs: '¿Estaba ella enojada?',
    shortAnswerPositiveEn: 'Yes, she was.',
    shortAnswerNegativeEn: "No, she wasn't.",
    shortAnswerPositiveEs: 'Sí, lo estaba.',
    shortAnswerNegativeEs: 'No, no lo estaba.',
    explanationEn: 'Move "was" before "she": "Was she angry?".',
    explanationEs: 'Coloca "was" antes de "she": "¿Was she angry?".',
  },
  {
    id: 'bp-ex3-5',
    number: 5,
    statementEn: 'We were tired.',
    statementEs: 'Estábamos cansados.',
    questionEn: 'Were we tired?',
    questionEs: '¿Estábamos cansados?',
    shortAnswerPositiveEn: 'Yes, we were.',
    shortAnswerNegativeEn: "No, we weren't.",
    shortAnswerPositiveEs: 'Sí, lo estábamos.',
    shortAnswerNegativeEs: 'No, no lo estábamos.',
    explanationEn: 'Move "were" to the front before "we": "Were we tired?".',
    explanationEs: 'Mueve "were" al inicio antes de "we": "¿Were we tired?".',
  },
  {
    id: 'bp-ex3-6',
    number: 6,
    statementEn: 'He was at work.',
    statementEs: 'Él estaba en el trabajo.',
    questionEn: 'Was he at work?',
    questionEs: '¿Estaba él en el trabajo?',
    shortAnswerPositiveEn: 'Yes, he was.',
    shortAnswerNegativeEn: "No, he wasn't.",
    shortAnswerPositiveEs: 'Sí, lo estaba.',
    shortAnswerNegativeEs: 'No, no lo estaba.',
    explanationEn: 'Invert subject and verb: "Was he at work?".',
    explanationEs: 'Invierte sujeto y verbo: "¿Was he at work?".',
  },
  {
    id: 'bp-ex3-7',
    number: 7,
    statementEn: 'They were hungry.',
    statementEs: 'Ellos tenían hambre.',
    questionEn: 'Were they hungry?',
    questionEs: '¿Tenían ellos hambre?',
    shortAnswerPositiveEn: 'Yes, they were.',
    shortAnswerNegativeEn: "No, they weren't.",
    shortAnswerPositiveEs: 'Sí, tenían hambre.',
    shortAnswerNegativeEs: 'No, no tenían hambre.',
    explanationEn: 'Invert subject and verb: "Were they hungry?".',
    explanationEs: 'Invierte sujeto y verbo: "¿Were they hungry?".',
  },
  {
    id: 'bp-ex3-8',
    number: 8,
    statementEn: 'You were busy.',
    statementEs: 'Estabas ocupado.',
    questionEn: 'Were you busy?',
    questionEs: '¿Estabas ocupado?',
    shortAnswerPositiveEn: 'Yes, I was.',
    shortAnswerNegativeEn: "No, I wasn't.",
    shortAnswerPositiveEs: 'Sí, lo estaba.',
    shortAnswerNegativeEs: 'No, no lo estaba.',
    explanationEn: 'Invert subject and verb: "Were you busy?".',
    explanationEs: 'Invierte sujeto y verbo: "¿Were you busy?".',
  },
];

// ---------------------------------------------------------------------------
// WH- QUESTIONS — COMPLETE WITH WAS OR WERE (10 items)
// ---------------------------------------------------------------------------
export const BE_PAST_WH_ITEMS: BePastFillItem[] = [
  {
    id: 'bp-wh-1',
    number: 1,
    sentenceBefore: 'Where',
    sentenceAfter: 'you yesterday?',
    fullSentenceEn: 'Where were you yesterday?',
    fullSentenceEs: '¿Dónde estuviste ayer?',
    correctAnswer: 'were',
    options: ['was', 'were'],
    explanationEn: 'The subject is "you", so use "were": "Where were you...?".',
    explanationEs: 'El sujeto es "you", por lo que usamos "were": "¿Where were you...?".',
  },
  {
    id: 'bp-wh-2',
    number: 2,
    sentenceBefore: 'Where',
    sentenceAfter: 'she last night?',
    fullSentenceEn: 'Where was she last night?',
    fullSentenceEs: '¿Dónde estuvo ella anoche?',
    correctAnswer: 'was',
    options: ['was', 'were'],
    explanationEn: 'The subject is "she", so use "was": "Where was she...?".',
    explanationEs: 'El sujeto es "she", por lo que usamos "was": "¿Where was she...?".',
  },
  {
    id: 'bp-wh-3',
    number: 3,
    sentenceBefore: 'Why',
    sentenceAfter: 'they angry?',
    fullSentenceEn: 'Why were they angry?',
    fullSentenceEs: '¿Por qué estaban ellos enojados?',
    correctAnswer: 'were',
    options: ['was', 'were'],
    explanationEn: 'The subject is "they", so use "were": "Why were they...?".',
    explanationEs: 'El sujeto es "they", por lo que usamos "were": "¿Why were they...?".',
  },
  {
    id: 'bp-wh-4',
    number: 4,
    sentenceBefore: 'How',
    sentenceAfter: 'your weekend?',
    fullSentenceEn: 'How was your weekend?',
    fullSentenceEs: '¿Cómo estuvo tu fin de semana?',
    correctAnswer: 'was',
    options: ['was', 'were'],
    explanationEn: '"Your weekend" is singular (it), so use "was": "How was your weekend?".',
    explanationEs: '"Your weekend" es un sujeto singular (it), por lo que usamos "was".',
  },
  {
    id: 'bp-wh-5',
    number: 5,
    sentenceBefore: 'Who',
    sentenceAfter: 'at the party?',
    fullSentenceEn: 'Who was at the party?',
    fullSentenceEs: '¿Quién estuvo en la fiesta?',
    correctAnswer: 'was',
    options: ['was', 'were'],
    explanationEn: '"Who" as a question subject takes the singular verb "was".',
    explanationEs: '"Who" como sujeto de pregunta toma el verbo singular "was".',
  },
  {
    id: 'bp-wh-6',
    number: 6,
    sentenceBefore: 'When',
    sentenceAfter: 'he in London?',
    fullSentenceEn: 'When was he in London?',
    fullSentenceEs: '¿Cuándo estuvo él en Londres?',
    correctAnswer: 'was',
    options: ['was', 'were'],
    explanationEn: 'The subject is "he", so use "was": "When was he in London?".',
    explanationEs: 'El sujeto es "he", por lo que usamos "was": "¿When was he in London?".',
  },
  {
    id: 'bp-wh-7',
    number: 7,
    sentenceBefore: 'Why',
    sentenceAfter: 'you late?',
    fullSentenceEn: 'Why were you late?',
    fullSentenceEs: '¿Por qué llegaste tarde?',
    correctAnswer: 'were',
    options: ['was', 'were'],
    explanationEn: 'The subject is "you", so use "were": "Why were you late?".',
    explanationEs: 'El sujeto es "you", por lo que usamos "were": "¿Why were you late?".',
  },
  {
    id: 'bp-wh-8',
    number: 8,
    sentenceBefore: 'Where',
    sentenceAfter: 'they last Saturday?',
    fullSentenceEn: 'Where were they last Saturday?',
    fullSentenceEs: '¿Dónde estuvieron ellos el sábado pasado?',
    correctAnswer: 'were',
    options: ['was', 'were'],
    explanationEn: 'The subject is "they", so use "were": "Where were they...?".',
    explanationEs: 'El sujeto es "they", por lo que usamos "were": "¿Where were they...?".',
  },
  {
    id: 'bp-wh-9',
    number: 9,
    sentenceBefore: 'How',
    sentenceAfter: 'the movie?',
    fullSentenceEn: 'How was the movie?',
    fullSentenceEs: '¿Cómo estuvo la película?',
    correctAnswer: 'was',
    options: ['was', 'were'],
    explanationEn: '"The movie" is singular (it), so use "was": "How was the movie?".',
    explanationEs: '"The movie" es un sujeto singular (it), por lo que usamos "was".',
  },
  {
    id: 'bp-wh-10',
    number: 10,
    sentenceBefore: 'Why',
    sentenceAfter: 'she tired?',
    fullSentenceEn: 'Why was she tired?',
    fullSentenceEs: '¿Por qué estaba ella cansada?',
    correctAnswer: 'was',
    options: ['was', 'were'],
    explanationEn: 'The subject is "she", so use "was": "Why was she tired?".',
    explanationEs: 'El sujeto es "she", por lo que usamos "was": "¿Why was she tired?".',
  },
];

// ---------------------------------------------------------------------------
// BE — PRESENT & PAST: MULTIPLE CHOICE — 15 POINTS (15 items)
// ---------------------------------------------------------------------------
export const BE_PRESENT_PAST_QUIZ: BePastMultipleChoiceQuestion[] = [
  {
    id: 'bp-mc-1',
    number: 1,
    questionEn: 'I ___ very tired today.',
    questionEs: 'Yo ___ muy cansado hoy.',
    options: [
      { key: 'A', text: 'is', isCorrect: false },
      { key: 'B', text: 'am', isCorrect: true },
      { key: 'C', text: 'was', isCorrect: false },
      { key: 'D', text: 'were', isCorrect: false },
    ],
    explanationEn: 'Correct: "today" indicates present tense, and "I" pairs with "am".',
    explanationEs: 'Correcto: "today" (hoy) indica tiempo presente, y con "I" se usa "am".',
  },
  {
    id: 'bp-mc-2',
    number: 2,
    questionEn: 'They ___ at school yesterday.',
    questionEs: 'Ellos ___ en la escuela ayer.',
    options: [
      { key: 'A', text: 'are', isCorrect: false },
      { key: 'B', text: 'was', isCorrect: false },
      { key: 'C', text: 'were', isCorrect: true },
      { key: 'D', text: 'is', isCorrect: false },
    ],
    explanationEn: 'Correct: "yesterday" indicates past tense, and "they" takes "were".',
    explanationEs: 'Correcto: "yesterday" (ayer) indica pasado, y con "they" se usa "were".',
  },
  {
    id: 'bp-mc-3',
    number: 3,
    questionEn: 'She ___ a teacher.',
    questionEs: 'Ella ___ profesora.',
    options: [
      { key: 'A', text: 'are', isCorrect: false },
      { key: 'B', text: 'were', isCorrect: false },
      { key: 'C', text: 'am', isCorrect: false },
      { key: 'D', text: 'is', isCorrect: true },
    ],
    explanationEn: 'Correct: A general fact/profession in the present tense with "she" takes "is".',
    explanationEs: 'Correcto: Un hecho general o profesión en presente con "she" lleva "is".',
  },
  {
    id: 'bp-mc-4',
    number: 4,
    questionEn: 'We ___ not at home last night.',
    questionEs: 'Nosotros ___ en casa anoche.',
    options: [
      { key: 'A', text: "wasn't", isCorrect: false },
      { key: 'B', text: "aren't", isCorrect: false },
      { key: 'C', text: "weren't", isCorrect: true },
      { key: 'D', text: "isn't", isCorrect: false },
    ],
    explanationEn: 'Correct: "last night" is past, and "we" takes "weren\'t". Note: since "not" is in the prompt, the intended choice is "weren\'t" (or "were not").',
    explanationEs: 'Correcto: "last night" es pasado, y con "we" se usa "weren\'t".',
  },
  {
    id: 'bp-mc-5',
    number: 5,
    questionEn: 'He ___ very happy yesterday.',
    questionEs: 'Él ___ muy feliz ayer.',
    options: [
      { key: 'A', text: 'were', isCorrect: false },
      { key: 'B', text: 'was', isCorrect: true },
      { key: 'C', text: 'is', isCorrect: false },
      { key: 'D', text: 'are', isCorrect: false },
    ],
    explanationEn: 'Correct: "yesterday" indicates past tense, and "he" takes "was".',
    explanationEs: 'Correcto: "yesterday" indica pasado, y con "he" se usa "was".',
  },
  {
    id: 'bp-mc-6',
    number: 6,
    questionEn: 'You ___ very busy today.',
    questionEs: 'Tú ___ muy ocupado hoy.',
    options: [
      { key: 'A', text: 'am', isCorrect: false },
      { key: 'B', text: 'is', isCorrect: false },
      { key: 'C', text: 'are', isCorrect: true },
      { key: 'D', text: 'was', isCorrect: false },
    ],
    explanationEn: 'Correct: "today" is present tense, and "you" takes "are".',
    explanationEs: 'Correcto: "today" es presente, y con "you" se usa "are".',
  },
  {
    id: 'bp-mc-7',
    number: 7,
    questionEn: '___ they at work yesterday?',
    questionEs: '¿___ ellos en el trabajo ayer?',
    options: [
      { key: 'A', text: 'Are', isCorrect: false },
      { key: 'B', text: 'Was', isCorrect: false },
      { key: 'C', text: 'Is', isCorrect: false },
      { key: 'D', text: 'Were', isCorrect: true },
    ],
    explanationEn: 'Correct: Past question with "they" begins with "Were".',
    explanationEs: 'Correcto: Pregunta en pasado con "they" comienza con "Were".',
  },
  {
    id: 'bp-mc-8',
    number: 8,
    questionEn: '___ she at home now?',
    questionEs: '¿___ ella en casa ahora?',
    options: [
      { key: 'A', text: 'Is', isCorrect: true },
      { key: 'B', text: 'Was', isCorrect: false },
      { key: 'C', text: 'Were', isCorrect: false },
      { key: 'D', text: 'Are', isCorrect: false },
    ],
    explanationEn: 'Correct: "now" indicates present tense, and "she" takes "Is".',
    explanationEs: 'Correcto: "now" indica tiempo presente, y con "she" se formula con "Is".',
  },
  {
    id: 'bp-mc-9',
    number: 9,
    questionEn: 'I ___ not hungry now.',
    questionEs: 'Yo ___ hambre ahora.',
    options: [
      { key: 'A', text: "wasn't", isCorrect: false },
      { key: 'B', text: "aren't", isCorrect: false },
      { key: 'C', text: 'am not', isCorrect: true },
      { key: 'D', text: "weren't", isCorrect: false },
    ],
    explanationEn: 'Correct: "now" is present tense, so we say "I am not hungry now".',
    explanationEs: 'Correcto: "now" indica presente, por lo que decimos "I am not hungry now".',
  },
  {
    id: 'bp-mc-10',
    number: 10,
    questionEn: 'My parents ___ in Buenos Aires last weekend.',
    questionEs: 'Mis padres ___ en Buenos Aires el fin de semana pasado.',
    options: [
      { key: 'A', text: 'was', isCorrect: false },
      { key: 'B', text: 'were', isCorrect: true },
      { key: 'C', text: 'are', isCorrect: false },
      { key: 'D', text: 'is', isCorrect: false },
    ],
    explanationEn: 'Correct: "My parents" is plural (they) and "last weekend" is past, so we use "were".',
    explanationEs: 'Correcto: "My parents" es plural (they) y "last weekend" es pasado, así que usamos "were".',
  },
  {
    id: 'bp-mc-11',
    number: 11,
    questionEn: 'The movie ___ fantastic last night.',
    questionEs: 'La película ___ fantástica anoche.',
    options: [
      { key: 'A', text: 'were', isCorrect: false },
      { key: 'B', text: 'are', isCorrect: false },
      { key: 'C', text: 'was', isCorrect: true },
      { key: 'D', text: 'is', isCorrect: false },
    ],
    explanationEn: 'Correct: "The movie" is singular (it) and "last night" is past, so we use "was".',
    explanationEs: 'Correcto: "The movie" es singular (it) y "last night" es pasado, por lo que usamos "was".',
  },
  {
    id: 'bp-mc-12',
    number: 12,
    questionEn: 'We ___ very happy today.',
    questionEs: 'Nosotros ___ muy felices hoy.',
    options: [
      { key: 'A', text: 'was', isCorrect: false },
      { key: 'B', text: 'is', isCorrect: false },
      { key: 'C', text: 'are', isCorrect: true },
      { key: 'D', text: 'am', isCorrect: false },
    ],
    explanationEn: 'Correct: "today" is present tense, and "we" takes "are".',
    explanationEs: 'Correcto: "today" es presente, y con "we" se usa "are".',
  },
  {
    id: 'bp-mc-13',
    number: 13,
    questionEn: '___ you tired after the trip?',
    questionEs: '¿___ cansado después del viaje?',
    options: [
      { key: 'A', text: 'Are', isCorrect: false },
      { key: 'B', text: 'Were', isCorrect: true },
      { key: 'C', text: 'Was', isCorrect: false },
      { key: 'D', text: 'Is', isCorrect: false },
    ],
    explanationEn: 'Correct: Asking about a past condition after a finished trip: "Were you tired...?".',
    explanationEs: 'Correcto: Pregunta sobre una condición pasada tras el viaje concluido: "¿Were you tired...?".',
  },
  {
    id: 'bp-mc-14',
    number: 14,
    questionEn: 'He ___ at work today, but he ___ at home yesterday.',
    questionEs: 'Él ___ en el trabajo hoy, pero ___ en casa ayer.',
    options: [
      { key: 'A', text: 'is / was', isCorrect: true },
      { key: 'B', text: 'was / is', isCorrect: false },
      { key: 'C', text: 'are / were', isCorrect: false },
      { key: 'D', text: 'is / were', isCorrect: false },
    ],
    explanationEn: 'Correct: Present ("today") = "is"; Past ("yesterday") = "was".',
    explanationEs: 'Correcto: Presente ("today") = "is"; Pasado ("yesterday") = "was".',
  },
  {
    id: 'bp-mc-15',
    number: 15,
    questionEn: 'They ___ not happy yesterday, but they ___ happy today.',
    questionEs: 'Ellos ___ felices ayer, pero ___ felices hoy.',
    options: [
      { key: 'A', text: "aren't / were", isCorrect: false },
      { key: 'B', text: "weren't / are", isCorrect: true },
      { key: 'C', text: "wasn't / is", isCorrect: false },
      { key: 'D', text: "weren't / is", isCorrect: false },
    ],
    explanationEn: 'Correct: Past negative for they = "weren\'t"; Present affirmative for they = "are".',
    explanationEs: 'Correcto: Pasado negativo para they = "weren\'t"; Presente afirmativo para they = "are".',
  },
];

// ---------------------------------------------------------------------------
// SECTION 1 EXERCISE WRAPPER
// ---------------------------------------------------------------------------
export const BE_PAST_MASTERCLASS_EXERCISES: Exercise[] = [
  {
    id: 'be-past-masterclass-overview',
    type: 'be-past-masterclass',
    title: 'BE IN THE PAST — WAS / WERE',
    titleEs: 'El Verbo Be en Pasado — Was / Were',
    instructions:
      'Master the past tense of the verb BE: theory, statements, negatives, questions, Wh- questions, and 15-point challenge with reversible cards and audio.',
    instructionsEs:
      'Domina el pasado del verbo BE: teoría, afirmaciones, negativas, preguntas, preguntas con Wh- y examen de 15 puntos con tarjetas reversibles y audio.',
  },
];
