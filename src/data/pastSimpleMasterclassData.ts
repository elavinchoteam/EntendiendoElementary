export interface PastSimpleTheoryTopic {
  id: string;
  category: string;
  categoryEs: string;
  titleEn: string;
  titleEs: string;
  textEn: string;
  textEs: string;
  formulaEn?: string;
  formulaEs?: string;
  examples: {
    en: string;
    es: string;
    noteEn?: string;
    noteEs?: string;
  }[];
  grammarTipEn: string;
  grammarTipEs: string;
}

export const PAST_SIMPLE_THEORY: PastSimpleTheoryTopic[] = [
  {
    id: 'what-a-day-intro',
    category: 'WHAT A DAY! · INTRO',
    categoryEs: '¡QUÉ DÍA! · INTRODUCCIÓN',
    titleEn: 'What is the Past Simple?',
    titleEs: '¿Qué es el Pasado Simple?',
    textEn:
      'We use the Past Simple to talk about actions and situations that started and finished in the past. It refers to definite completed events at a specific time.',
    textEs:
      'Usamos el Pasado Simple para hablar de acciones y situaciones que comenzaron y terminaron en el pasado. Se refiere a hechos completos y definidos en un momento específico.',
    formulaEn: 'Time anchor: started & finished in the past',
    formulaEs: 'Referencia temporal: comenzó y terminó en el pasado',
    examples: [
      {
        en: 'Yesterday, I missed the bus.',
        es: 'Ayer perdí el autobús.',
        noteEn: 'Completed action yesterday',
        noteEs: 'Acción completada ayer',
      },
      {
        en: 'Last weekend, I went to a concert.',
        es: 'El fin de semana pasado fui a un concierto.',
        noteEn: 'Finished event last weekend',
        noteEs: 'Evento finalizado el fin de semana pasado',
      },
      {
        en: "I didn't take my umbrella, so I got wet.",
        es: 'No llevé mi paraguas, así que me mojé.',
        noteEn: 'Negative action and past result',
        noteEs: 'Acción negativa y resultado en pasado',
      },
      {
        en: 'Did you see that strange man?',
        es: '¿Viste a ese hombre extraño?',
        noteEn: 'Question about a past event',
        noteEs: 'Pregunta sobre un evento pasado',
      },
    ],
    grammarTipEn:
      'Common past time expressions: yesterday, last night, last week, last month, two hours ago, in 2024.',
    grammarTipEs:
      'Expresiones de tiempo pasadas comunes: yesterday (ayer), last night (anoche), last week (la semana pasada), two hours ago (hace dos horas), in 2024.',
  },
  {
    id: 'regular-verbs',
    category: 'REGULAR VERBS',
    categoryEs: 'VERBOS REGULARES',
    titleEn: 'Adding -ed to Regular Verbs',
    titleEs: 'Añadir -ed a los Verbos Regulares',
    textEn:
      'With regular verbs, we usually add -ed to the base form. Notice special spelling rules for verbs ending in -e, consonant + y, or short vowel + consonant.',
    textEs:
      'Con verbos regulares, usualmente añadimos -ed a la forma base. Presta atención a las reglas ortográficas para verbos que terminan en -e, consonante + y, o vocal corta + consonante.',
    formulaEn: 'Base Form + -ed / -d / -ied',
    formulaEs: 'Forma Base + -ed / -d / -ied',
    examples: [
      {
        en: 'work → worked',
        es: 'trabajar → trabajó',
        noteEn: 'Standard: add -ed',
        noteEs: 'Estándar: añadir -ed',
      },
      {
        en: 'play → played',
        es: 'jugar → jugó',
        noteEn: 'Vowel + y: just add -ed',
        noteEs: 'Vocal + y: solo añade -ed',
      },
      {
        en: 'study → studied',
        es: 'estudiar → estudió',
        noteEn: 'Consonant + y changes to -ied',
        noteEs: 'Consonante + y cambia a -ied',
      },
      {
        en: 'decide → decided',
        es: 'decidir → decidió',
        noteEn: 'Ends in -e: just add -d',
        noteEs: 'Termina en -e: solo añade -d',
      },
      {
        en: 'stop → stopped',
        es: 'parar / detener → paró',
        noteEn: 'CVC: double the final consonant',
        noteEs: 'Consonante-vocal-consonante: duplica la última letra',
      },
    ],
    grammarTipEn: 'Never write "studyed" or "stoped" — spelling rules are essential in writing!',
    grammarTipEs: 'Nunca escribas "studyed" ni "stoped" — ¡las reglas ortográficas son esenciales!',
  },
  {
    id: 'irregular-verbs',
    category: 'IRREGULAR VERBS',
    categoryEs: 'VERBOS IRREGULARES',
    titleEn: 'Irregular Verbs Change in Different Ways',
    titleEs: 'Los Verbos Irregulares Cambian de Diferentes Maneras',
    textEn:
      'Irregular verbs do NOT follow the -ed pattern. Each verb has its own unique past form that must be learned and practiced regularly.',
    textEs:
      'Los verbos irregulares NO siguen el patrón de -ed. Cada verbo tiene su propia forma de pasado única que debe aprenderse y practicarse regularmente.',
    formulaEn: 'Irregular forms (Unique past form)',
    formulaEs: 'Formas irregulares (Forma de pasado única)',
    examples: [
      {
        en: 'go → went',
        es: 'ir → fue / fui',
        noteEn: 'I went to a concert yesterday.',
        noteEs: 'Fui a un concierto ayer.',
      },
      {
        en: 'buy → bought',
        es: 'comprar → compró / compré',
        noteEn: 'She bought a second-hand car.',
        noteEs: 'Ella compró un auto de segunda mano.',
      },
      {
        en: 'see → saw',
        es: 'ver → vio / vi',
        noteEn: 'I saw an old friend.',
        noteEs: 'Vi a un viejo amigo.',
      },
      {
        en: 'have → had',
        es: 'tener / tomar → tuvo / tuve',
        noteEn: 'They had a party on Saturday.',
        noteEs: 'Tuvieron una fiesta el sábado.',
      },
      {
        en: 'wake up → woke up',
        es: 'despertar → se despertó',
        noteEn: 'Tom woke up late.',
        noteEs: 'Tom se despertó tarde.',
      },
      {
        en: 'run → ran | drink → drank | find → found',
        es: 'correr → corrió | beber → bebió | encontrar → encontró',
        noteEn: 'Key irregular past verbs',
        noteEs: 'Verbos irregulares clave en pasado',
      },
    ],
    grammarTipEn: 'Never say "writed" (use wrote) or "bringed" (use brought).',
    grammarTipEs: 'Nunca digas "writed" (usa wrote) ni "bringed" (usa brought).',
  },
  {
    id: 'affirmative-negative-question',
    category: 'STRUCTURES: AF / NEG / INT',
    categoryEs: 'ESTRUCTURAS: AF / NEG / INT',
    titleEn: 'Affirmative, Negative & Question Forms',
    titleEs: 'Formas Afirmativa, Negativa e Interrogativa',
    textEn:
      'In affirmative sentences, use the past verb form. In negative sentences and questions, the auxiliary did/didn\'t takes the past tense, so the main verb stays in its base form!',
    textEs:
      'En oraciones afirmativas, usa la forma pasada del verbo. En oraciones negativas y preguntas, el auxiliar did/didn\'t asume el tiempo pasado, ¡por lo que el verbo principal queda en forma base!',
    formulaEn: '[+] Past Verb | [-] didn\'t + Base | [?] Did + Subject + Base?',
    formulaEs: '[+] Verbo en Pasado | [-] didn\'t + Base | [?] Did + Sujeto + Base?',
    examples: [
      {
        en: 'Affirmative: I saw him.',
        es: 'Afirmativo: Yo lo vi.',
        noteEn: 'Subject + past form (saw)',
        noteEs: 'Sujeto + verbo en pasado (saw)',
      },
      {
        en: "Negative: I didn't see him.",
        es: 'Negativo: Yo no lo vi.',
        noteEn: "didn't + base verb (see)",
        noteEs: "didn't + verbo en forma base (see)",
      },
      {
        en: 'Question: Did you see him?',
        es: 'Pregunta: ¿Lo viste?',
        noteEn: 'Did + subject + base verb (see)',
        noteEs: 'Did + sujeto + verbo en forma base (see)',
      },
      {
        en: 'Short Answers: Yes, I did. / No, I didn\'t.',
        es: 'Respuestas cortas: Sí. / No.',
        noteEn: 'Use did / didn\'t in short answers',
        noteEs: 'Usa did / didn\'t en respuestas cortas',
      },
    ],
    grammarTipEn: 'After did / didn\'t, use the base form of the verb. Always!',
    grammarTipEs: 'Después de did / didn\'t, usa la forma base del verbo. ¡Siempre!',
  },
  {
    id: 'golden-rule-did-base',
    category: 'THE GOLDEN RULE',
    categoryEs: 'LA REGLA DE ORO',
    titleEn: 'The Golden Rule of Did & Didn\'t',
    titleEs: 'La Regla de Oro de Did y Didn\'t',
    textEn:
      'Because "did" already carries the past tense, the main verb never takes -ed or an irregular past form in questions or negative sentences.',
    textEs:
      'Debido a que "did" ya lleva la marca del pasado, el verbo principal jamás lleva -ed ni forma irregular en preguntas ni oraciones negativas.',
    formulaEn: 'Did / Didn\'t + BASE FORM (NEVER past tense)',
    formulaEs: 'Did / Didn\'t + FORMA BASE (NUNCA en pasado)',
    examples: [
      {
        en: "CORRECT: She didn't go to work. (INCORRECT: She didn't went)",
        es: 'CORRECTO: She didn\'t go to work. (INCORRECTO: She didn\'t went)',
        noteEn: 'went is redundant after didn\'t',
        noteEs: 'went es redundante tras didn\'t',
      },
      {
        en: 'CORRECT: Did you buy anything? (INCORRECT: Did you bought)',
        es: 'CORRECTO: Did you buy anything? (INCORRECTO: Did you bought)',
        noteEn: 'Use base verb buy after Did',
        noteEs: 'Usa el verbo base buy tras Did',
      },
      {
        en: "CORRECT: He didn't understand. (INCORRECT: He didn't understood)",
        es: 'CORRECTO: He didn\'t understand. (INCORRECTO: He didn\'t understood)',
        noteEn: 'Use base verb understand after didn\'t',
        noteEs: 'Usa el verbo base understand tras didn\'t',
      },
    ],
    grammarTipEn: 'Do not double the past! One past marker (did / didn\'t) is enough.',
    grammarTipEs: '¡No dupliques el pasado! Un solo marcador de pasado (did / didn\'t) es suficiente.',
  },
];

// ============================================================================
// 1. COMPLETE THE STORY - TOM'S DAY (16 blanks)
// ============================================================================

export interface StoryBlankItem {
  index: number;
  verbPrompt: string;
  expectedAnswer: string;
  acceptableAnswers: string[];
  explanationEn: string;
  explanationEs: string;
}

export const TOM_STORY_BLANKS: StoryBlankItem[] = [
  {
    index: 1,
    verbPrompt: 'wake up',
    expectedAnswer: 'woke up',
    acceptableAnswers: ['woke up', 'woke-up'],
    explanationEn: 'wake up is irregular: wake → woke.',
    explanationEs: 'wake up es irregular: wake → woke (se despertó).',
  },
  {
    index: 2,
    verbPrompt: 'not / ring',
    expectedAnswer: "didn't ring",
    acceptableAnswers: ["didn't ring", 'did not ring', 'didnt ring'],
    explanationEn: 'Negative past: didn\'t + base form (ring).',
    explanationEs: 'Pasado negativo: didn\'t + forma base (ring).',
  },
  {
    index: 3,
    verbPrompt: 'get',
    expectedAnswer: 'got',
    acceptableAnswers: ['got'],
    explanationEn: 'get is irregular: get → got.',
    explanationEs: 'get es irregular: get → got (se vistió = got dressed).',
  },
  {
    index: 4,
    verbPrompt: 'run',
    expectedAnswer: 'ran',
    acceptableAnswers: ['ran'],
    explanationEn: 'run is irregular: run → ran.',
    explanationEs: 'run es irregular: run → ran (corrió).',
  },
  {
    index: 5,
    verbPrompt: 'miss',
    expectedAnswer: 'missed',
    acceptableAnswers: ['missed'],
    explanationEn: 'miss is a regular verb: add -ed → missed.',
    explanationEs: 'miss es regular: añade -ed → missed (perdió el autobús).',
  },
  {
    index: 6,
    verbPrompt: 'decide',
    expectedAnswer: 'decided',
    acceptableAnswers: ['decided'],
    explanationEn: 'decide ends in -e: add -d → decided.',
    explanationEs: 'decide termina en -e: solo añade -d → decided (decidió).',
  },
  {
    index: 7,
    verbPrompt: 'leave',
    expectedAnswer: 'left',
    acceptableAnswers: ['left'],
    explanationEn: 'leave is irregular: leave → left.',
    explanationEs: 'leave es irregular: leave → left (dejó / olvidó).',
  },
  {
    index: 8,
    verbPrompt: 'arrive',
    expectedAnswer: 'arrived',
    acceptableAnswers: ['arrived'],
    explanationEn: 'arrive is regular: add -d → arrived.',
    explanationEs: 'arrive es regular: añade -d → arrived (llegó).',
  },
  {
    index: 9,
    verbPrompt: 'look',
    expectedAnswer: 'looked',
    acceptableAnswers: ['looked'],
    explanationEn: 'look is regular: add -ed → looked.',
    explanationEs: 'look es regular: añade -ed → looked (miró).',
  },
  {
    index: 10,
    verbPrompt: 'say',
    expectedAnswer: 'said',
    acceptableAnswers: ['said'],
    explanationEn: 'say is irregular: say → said.',
    explanationEs: 'say es irregular: say → said (dijo).',
  },
  {
    index: 11,
    verbPrompt: 'try',
    expectedAnswer: 'tried',
    acceptableAnswers: ['tried'],
    explanationEn: 'try ends in consonant + y: change to -ied → tried.',
    explanationEs: 'try termina en consonante + y: cambia a -ied → tried (intentó).',
  },
  {
    index: 12,
    verbPrompt: 'start',
    expectedAnswer: 'started',
    acceptableAnswers: ['started'],
    explanationEn: 'start is regular: add -ed → started.',
    explanationEs: 'start es regular: añade -ed → started (empezó).',
  },
  {
    index: 13,
    verbPrompt: 'call',
    expectedAnswer: 'called',
    acceptableAnswers: ['called'],
    explanationEn: 'call is regular: add -ed → called.',
    explanationEs: 'call es regular: añade -ed → called (llamó).',
  },
  {
    index: 14,
    verbPrompt: 'not / say',
    expectedAnswer: "didn't say",
    acceptableAnswers: ["didn't say", 'did not say', 'didnt say'],
    explanationEn: 'Negative past: didn\'t + base form (say).',
    explanationEs: 'Pasado negativo: didn\'t + forma base (say).',
  },
  {
    index: 15,
    verbPrompt: 'go',
    expectedAnswer: 'went',
    acceptableAnswers: ['went'],
    explanationEn: 'go is irregular: go → went.',
    explanationEs: 'go es irregular: go → went (fue).',
  },
  {
    index: 16,
    verbPrompt: 'sleep',
    expectedAnswer: 'slept',
    acceptableAnswers: ['slept'],
    explanationEn: 'sleep is irregular: sleep → slept.',
    explanationEs: 'sleep es irregular: sleep → slept (durmió).',
  },
];

export const TOM_STORY_PARAGRAPHS = [
  {
    id: 'p1',
    textEn:
      "Yesterday, Tom woke up late because his alarm didn't ring. He got dressed in five minutes and ran to the bus stop, but he missed the bus.",
    textEs:
      'Ayer, Tom se despertó tarde porque su alarma no sonó. Se vistió en cinco minutos y corrió a la parada de autobús, pero perdió el autobús.',
  },
  {
    id: 'p2',
    textEn:
      'He decided to take a taxi, but he left his wallet at home! When he finally arrived at work, his boss looked at him and said, "You\'re two hours late!"',
    textEs:
      '¡Decidió tomar un taxi, pero se dejó la billetera en casa! Cuando finalmente llegó al trabajo, su jefe lo miró y le dijo: "¡Llegas dos horas tarde!"',
  },
  {
    id: 'p3',
    textEn:
      'Tom tried to explain, but his phone started ringing. It was his mother. She called to tell him that today was Sunday!',
    textEs:
      'Tom intentó explicar, pero su teléfono empezó a sonar. Era su madre. ¡Llamaba para avisarle que hoy era domingo!',
  },
  {
    id: 'p4',
    textEn: "Tom didn't say a word. He went home and slept for another three hours.",
    textEs: 'Tom no dijo ni una palabra. Se fue a casa y durmió durante tres horas más.',
  },
];

// ============================================================================
// 2. COMPLETE THE QUESTIONS AND ANSWERS - THE ACTOR'S DISAPPEARANCE (8 items)
// ============================================================================

export interface ActorQuestionItem {
  id: string;
  number: number;
  type: 'yes-no' | 'wh' | 'choice';
  questionPrefix: string; // e.g. "" or "What " or "Where "
  questionMid: string; // text between blank1 and blank2, e.g. " the actor "
  questionSuffix: string; // text after blank2, e.g. " at 9:30 p.m.?"
  verbPrompt: string; // e.g. "arrive"
  expectedQ1: string; // e.g. "Did" or "did"
  expectedQ2: string; // e.g. "arrive"
  answerPrefix: string; // e.g. "Yes, he "
  expectedA1: string; // e.g. "did"
  answerMid?: string; // e.g. ". He "
  expectedA2?: string; // e.g. "left"
  answerSuffix: string; // e.g. "." or " orange juice."
  fullEn: string;
  fullEs: string;
  explanationEn: string;
  explanationEs: string;
}

export const ACTOR_QUESTIONS_DATA: ActorQuestionItem[] = [
  {
    id: 'aq1',
    number: 1,
    type: 'yes-no',
    questionPrefix: '',
    questionMid: ' the actor ',
    questionSuffix: ' at 9:30 p.m.?',
    verbPrompt: 'arrive',
    expectedQ1: 'Did',
    expectedQ2: 'arrive',
    answerPrefix: 'Yes, he ',
    expectedA1: 'did',
    answerSuffix: '.',
    fullEn: 'Did the actor arrive at 9:30 p.m.? — Yes, he did.',
    fullEs: '¿Llegó el actor a las 9:30 p.m.? — Sí, llegó.',
    explanationEn: 'Question with Did + base verb (arrive). Short answer: Yes, he did.',
    explanationEs: 'Pregunta con Did + verbo base (arrive). Respuesta corta: Yes, he did.',
  },
  {
    id: 'aq2',
    number: 2,
    type: 'yes-no',
    questionPrefix: '',
    questionMid: ' he ',
    questionSuffix: ' to the host?',
    verbPrompt: 'talk',
    expectedQ1: 'Did',
    expectedQ2: 'talk',
    answerPrefix: 'Yes, he ',
    expectedA1: 'did',
    answerSuffix: '.',
    fullEn: 'Did he talk to the host? — Yes, he did.',
    fullEs: '¿Habló con el anfitrión? — Sí, habló.',
    explanationEn: 'Question with Did + base verb (talk). Short answer: Yes, he did.',
    explanationEs: 'Pregunta con Did + verbo base (talk). Respuesta corta: Yes, he did.',
  },
  {
    id: 'aq3',
    number: 3,
    type: 'wh',
    questionPrefix: 'What ',
    questionMid: ' he ',
    questionSuffix: '?',
    verbPrompt: 'drink',
    expectedQ1: 'did',
    expectedQ2: 'drink',
    answerPrefix: 'He ',
    expectedA1: 'drank',
    answerSuffix: ' orange juice.',
    fullEn: 'What did he drink? — He drank orange juice.',
    fullEs: '¿Qué bebió? — Él bebió jugo de naranja.',
    explanationEn: 'Question: What did he drink? Affirmative answer uses irregular past: drank.',
    explanationEs: 'Pregunta: What did he drink? La respuesta afirmativa usa el pasado irregular: drank.',
  },
  {
    id: 'aq4',
    number: 4,
    type: 'yes-no',
    questionPrefix: '',
    questionMid: ' he ',
    questionSuffix: ' the party alone?',
    verbPrompt: 'leave',
    expectedQ1: 'Did',
    expectedQ2: 'leave',
    answerPrefix: 'No, he ',
    expectedA1: "didn't",
    answerMid: '. He ',
    expectedA2: 'left',
    answerSuffix: ' with a woman in a red coat.',
    fullEn: "Did he leave the party alone? — No, he didn't. He left with a woman in a red coat.",
    fullEs: '¿Se fue de la fiesta solo? — No, no se fue solo. Se fue con una mujer con abrigo rojo.',
    explanationEn: 'Question with Did + leave. Negative short answer: No, he didn\'t. Past affirmative: left.',
    explanationEs: 'Pregunta con Did + leave. Respuesta corta negativa: No, he didn\'t. Pasado afirmativo: left.',
  },
  {
    id: 'aq5',
    number: 5,
    type: 'wh',
    questionPrefix: 'Where ',
    questionMid: ' the police ',
    questionSuffix: ' his phone?',
    verbPrompt: 'find',
    expectedQ1: 'did',
    expectedQ2: 'find',
    answerPrefix: 'They ',
    expectedA1: 'found',
    answerSuffix: ' it under a sofa.',
    fullEn: 'Where did the police find his phone? — They found it under a sofa.',
    fullEs: '¿Dónde encontró la policía su teléfono? — Lo encontraron debajo de un sofá.',
    explanationEn: 'Question: Where did the police find...? Affirmative answer uses irregular past: found.',
    explanationEs: 'Pregunta: Where did the police find...? La respuesta usa el pasado irregular: found.',
  },
  {
    id: 'aq6',
    number: 6,
    type: 'yes-no',
    questionPrefix: '',
    questionMid: ' anyone ',
    questionSuffix: ' him leave?',
    verbPrompt: 'see',
    expectedQ1: 'Did',
    expectedQ2: 'see',
    answerPrefix: 'Yes, the waiter ',
    expectedA1: 'did',
    answerSuffix: '.',
    fullEn: 'Did anyone see him leave? — Yes, the waiter did.',
    fullEs: '¿Alguien lo vio marcharse? — Sí, el mozo/camarero lo vio.',
    explanationEn: 'Question: Did anyone see...? Short answer: Yes, the waiter did.',
    explanationEs: 'Pregunta: Did anyone see...? Respuesta corta con did: Yes, the waiter did.',
  },
  {
    id: 'aq7',
    number: 7,
    type: 'wh',
    questionPrefix: 'What ',
    questionMid: ' the waiter ',
    questionSuffix: '?',
    verbPrompt: 'say',
    expectedQ1: 'did',
    expectedQ2: 'say',
    answerPrefix: 'He ',
    expectedA1: 'said',
    answerSuffix: ', "He looked nervous."',
    fullEn: 'What did the waiter say? — He said, "He looked nervous."',
    fullEs: '¿Qué dijo el camarero? — Dijo: "Se veía nervioso".',
    explanationEn: 'Question: What did the waiter say? Affirmative past form of say is said.',
    explanationEs: 'Pregunta: What did the waiter say? El pasado afirmativo de say es said.',
  },
  {
    id: 'aq8',
    number: 8,
    type: 'yes-no',
    questionPrefix: '',
    questionMid: ' the actor ',
    questionSuffix: ' his car?',
    verbPrompt: 'take',
    expectedQ1: 'Did',
    expectedQ2: 'take',
    answerPrefix: 'No, he ',
    expectedA1: "didn't",
    answerMid: '. He ',
    expectedA2: 'took',
    answerSuffix: ' a taxi.',
    fullEn: "Did the actor take his car? — No, he didn't. He took a taxi.",
    fullEs: '¿El actor tomó su auto? — No, no lo tomó. Tomó un taxi.',
    explanationEn: 'Question: Did the actor take...? Negative: No, he didn\'t. Affirmative past: took.',
    explanationEs: 'Pregunta: Did the actor take...? Negativo: No, he didn\'t. Pasado afirmativo: took.',
  },
];

// ============================================================================
// 3. CHOOSE THE CORRECT OPTION (8 items)
// ============================================================================

export interface ChooseOptionItem {
  id: string;
  number: number;
  sentencePromptEn: string;
  sentencePromptEs: string;
  options: {
    key: 'a' | 'b' | 'c' | 'd';
    text: string;
  }[];
  correctOption: 'a' | 'b' | 'c' | 'd';
  fullSentenceEn: string;
  fullSentenceEs: string;
  explanationEn: string;
  explanationEs: string;
}

export const CHOOSE_OPTION_ITEMS: ChooseOptionItem[] = [
  {
    id: 'co1',
    number: 1,
    sentencePromptEn: 'A man __________ a crocodile in his swimming pool yesterday.',
    sentencePromptEs: 'Un hombre __________ un cocodrilo en su piscina ayer.',
    options: [
      { key: 'a', text: 'find' },
      { key: 'b', text: 'founded' },
      { key: 'c', text: 'found' },
      { key: 'd', text: 'did found' },
    ],
    correctOption: 'c',
    fullSentenceEn: 'A man found a crocodile in his swimming pool yesterday.',
    fullSentenceEs: 'Un hombre encontró un cocodrilo en su piscina ayer.',
    explanationEn: 'The past tense of find is the irregular verb found.',
    explanationEs: 'El pasado del verbo find es la forma irregular found (encontró).',
  },
  {
    id: 'co2',
    number: 2,
    sentencePromptEn: 'My neighbour __________ a birthday party for his cat and invited 40 people.',
    sentencePromptEs: 'Mi vecino __________ una fiesta de cumpleaños para su gato e invitó a 40 personas.',
    options: [
      { key: 'a', text: 'organised' },
      { key: 'b', text: 'organise' },
      { key: 'c', text: 'did organised' },
      { key: 'd', text: 'organising' },
    ],
    correctOption: 'a',
    fullSentenceEn: 'My neighbour organised a birthday party for his cat and invited 40 people.',
    fullSentenceEs: 'Mi vecino organizó una fiesta de cumpleaños para su gato e invitó a 40 personas.',
    explanationEn: 'Regular verb: organise + -d → organised (matching past "invited").',
    explanationEs: 'Verbo regular: organise + -d → organised (coincide con el pasado "invited").',
  },
  {
    id: 'co3',
    number: 3,
    sentencePromptEn: 'We __________ anything because the restaurant __________ our reservation.',
    sentencePromptEs: 'Nosotros __________ nada porque el restaurante __________ nuestra reservación.',
    options: [
      { key: 'a', text: "didn't eat / forgot" },
      { key: 'b', text: "didn't ate / forgot" },
      { key: 'c', text: 'not ate / forget' },
      { key: 'd', text: "didn't eat / forgetted" },
    ],
    correctOption: 'a',
    fullSentenceEn: "We didn't eat anything because the restaurant forgot our reservation.",
    fullSentenceEs: 'No comimos nada porque el restaurante olvidó nuestra reservación.',
    explanationEn: "Negative: didn't + base verb eat. Past of forget is irregular forgot.",
    explanationEs: "Negativo: didn't + verbo base eat. El pasado de forget es el irregular forgot.",
  },
  {
    id: 'co4',
    number: 4,
    sentencePromptEn: '__________ you __________ the strange noise last night?',
    sentencePromptEs: '¿__________ tú __________ el ruido extraño anoche?',
    options: [
      { key: 'a', text: 'Did / heard' },
      { key: 'b', text: 'Did / hear' },
      { key: 'c', text: 'Were / hear' },
      { key: 'd', text: 'Do / heard' },
    ],
    correctOption: 'b',
    fullSentenceEn: 'Did you hear the strange noise last night?',
    fullSentenceEs: '¿Escuchaste el ruido extraño anoche?',
    explanationEn: 'Past question: Did + subject + base verb (hear). Never "Did you heard".',
    explanationEs: 'Pregunta en pasado: Did + sujeto + verbo base (hear). Jamás "Did you heard".',
  },
  {
    id: 'co5',
    number: 5,
    sentencePromptEn: 'She __________ her passport, so she __________ her flight.',
    sentencePromptEs: 'Ella __________ su pasaporte, así que __________ su vuelo.',
    options: [
      { key: 'a', text: 'losed / missed' },
      { key: 'b', text: 'lost / missed' },
      { key: 'c', text: 'did lose / miss' },
      { key: 'd', text: 'lost / miss' },
    ],
    correctOption: 'b',
    fullSentenceEn: 'She lost her passport, so she missed her flight.',
    fullSentenceEs: 'Ella perdió su pasaporte, así que perdió su vuelo.',
    explanationEn: 'lose is irregular (lost); miss is regular (missed).',
    explanationEs: 'lose es irregular (lost); miss es regular (missed).',
  },
  {
    id: 'co6',
    number: 6,
    sentencePromptEn: 'I __________ an old friend at the supermarket and we __________ for an hour.',
    sentencePromptEs: 'Yo __________ a un viejo amigo en el supermercado y nosotros __________ durante una hora.',
    options: [
      { key: 'a', text: 'saw / talked' },
      { key: 'b', text: 'see / talked' },
      { key: 'c', text: 'saw / talk' },
      { key: 'd', text: 'did saw / talked' },
    ],
    correctOption: 'a',
    fullSentenceEn: 'I saw an old friend at the supermarket and we talked for an hour.',
    fullSentenceEs: 'Vi a un viejo amigo en el supermercado y charlamos durante una hora.',
    explanationEn: 'Past of see is saw; regular past of talk is talked.',
    explanationEs: 'El pasado de see es saw; el pasado regular de talk es talked.',
  },
  {
    id: 'co7',
    number: 7,
    sentencePromptEn: 'The waiter __________ the food to the wrong table, but nobody __________.',
    sentencePromptEs: 'El mozo __________ la comida a la mesa equivocada, pero nadie se __________.',
    options: [
      { key: 'a', text: 'bringed / noticed' },
      { key: 'b', text: 'brought / noticed' },
      { key: 'c', text: 'brought / notice' },
      { key: 'd', text: 'did bring / noticed' },
    ],
    correctOption: 'b',
    fullSentenceEn: 'The waiter brought the food to the wrong table, but nobody noticed.',
    fullSentenceEs: 'El camarero llevó la comida a la mesa equivocada, pero nadie se dio cuenta.',
    explanationEn: 'Past of bring is irregular brought; notice is regular (noticed).',
    explanationEs: 'El pasado de bring es el irregular brought; notice es regular (noticed).',
  },
  {
    id: 'co8',
    number: 8,
    sentencePromptEn: 'Why __________ you __________ my message?',
    sentencePromptEs: '¿Por qué no __________ mi mensaje?',
    options: [
      { key: 'a', text: "didn't / answered" },
      { key: 'b', text: "weren't / answer" },
      { key: 'c', text: "didn't / answer" },
      { key: 'd', text: 'not / answer' },
    ],
    correctOption: 'c',
    fullSentenceEn: "Why didn't you answer my message?",
    fullSentenceEs: '¿Por qué no respondiste mi mensaje?',
    explanationEn: "Negative question: Why didn't + subject + base verb (answer).",
    explanationEs: "Pregunta negativa: Why didn't + sujeto + verbo base (answer).",
  },
];

// ============================================================================
// 4. COMPLETE THE SENTENCES (10 items)
// ============================================================================

export interface SentenceCompletionItem {
  id: string;
  number: number;
  sentencePrompt: string; // text with blanks
  verbPrompt1: string;
  expected1: string;
  acceptable1: string[];
  verbPrompt2: string;
  expected2: string;
  acceptable2: string[];
  fullSentenceEn: string;
  fullSentenceEs: string;
  explanationEn: string;
  explanationEs: string;
}

export const COMPLETE_SENTENCES_DATA: SentenceCompletionItem[] = [
  {
    id: 'cs1',
    number: 1,
    sentencePrompt:
      'My sister __________ (buy) a second-hand car last month, but she __________ (not / drive) it to work yesterday.',
    verbPrompt1: 'buy',
    expected1: 'bought',
    acceptable1: ['bought'],
    verbPrompt2: 'not / drive',
    expected2: "didn't drive",
    acceptable2: ["didn't drive", 'did not drive', 'didnt drive'],
    fullSentenceEn:
      "My sister bought a second-hand car last month, but she didn't drive it to work yesterday.",
    fullSentenceEs:
      'Mi hermana compró un auto de segunda mano el mes pasado, pero no lo condujo al trabajo ayer.',
    explanationEn: "buy is irregular (bought); negative is didn't drive.",
    explanationEs: "buy es irregular (bought); la forma negativa es didn't drive.",
  },
  {
    id: 'cs2',
    number: 2,
    sentencePrompt:
      '__________ you __________ (see) the film last night, or __________ you __________ (stay) at home?',
    verbPrompt1: 'see (interrogative)',
    expected1: 'Did / see',
    acceptable1: ['did / see', 'did/see', 'did see'],
    verbPrompt2: 'stay (interrogative)',
    expected2: 'did / stay',
    acceptable2: ['did / stay', 'did/stay', 'did stay'],
    fullSentenceEn:
      'Did you see the film last night, or did you stay at home?',
    fullSentenceEs:
      '¿Viste la película anoche, o te quedaste en casa?',
    explanationEn: 'Questions in past use Did + subject + base form (see, stay).',
    explanationEs: 'Las preguntas en pasado usan Did + sujeto + verbo en base (see, stay).',
  },
  {
    id: 'cs3',
    number: 3,
    sentencePrompt:
      'The students __________ (study) for the exam, but they __________ (not / remember) the answers.',
    verbPrompt1: 'study',
    expected1: 'studied',
    acceptable1: ['studied'],
    verbPrompt2: 'not / remember',
    expected2: "didn't remember",
    acceptable2: ["didn't remember", 'did not remember', 'didnt remember'],
    fullSentenceEn:
      "The students studied for the exam, but they didn't remember the answers.",
    fullSentenceEs:
      'Los estudiantes estudiaron para el examen, pero no recordaron las respuestas.',
    explanationEn: "study → studied (-ied); negative is didn't remember.",
    explanationEs: "study cambia a studied (-ied); la negativa es didn't remember.",
  },
  {
    id: 'cs4',
    number: 4,
    sentencePrompt:
      'I __________ (send) you three messages yesterday. Why __________ you __________ (not / reply)?',
    verbPrompt1: 'send',
    expected1: 'sent',
    acceptable1: ['sent'],
    verbPrompt2: 'not / reply',
    expected2: "didn't / reply",
    acceptable2: ["didn't / reply", "didn't reply", "did / not reply", "did not reply"],
    fullSentenceEn:
      "I sent you three messages yesterday. Why didn't you reply?",
    fullSentenceEs:
      'Te envié tres mensajes ayer. ¿Por qué no respondiste?',
    explanationEn: "send is irregular (sent); negative question: Why didn't you reply?",
    explanationEs: "send es irregular (sent); pregunta negativa: Why didn't you reply?",
  },
  {
    id: 'cs5',
    number: 5,
    sentencePrompt:
      'My neighbours __________ (have) a party on Saturday and __________ (play) music until 3 a.m.',
    verbPrompt1: 'have',
    expected1: 'had',
    acceptable1: ['had'],
    verbPrompt2: 'play',
    expected2: 'played',
    acceptable2: ['played'],
    fullSentenceEn:
      'My neighbours had a party on Saturday and played music until 3 a.m.',
    fullSentenceEs:
      'Mis vecinos tuvieron una fiesta el sábado y pusieron música hasta las 3 a.m.',
    explanationEn: 'have is irregular (had); play is regular (played).',
    explanationEs: 'have es irregular (had); play es regular (played).',
  },
  {
    id: 'cs6',
    number: 6,
    sentencePrompt:
      'What time __________ the train __________ (leave) yesterday? I __________ (not / arrive) at the station on time.',
    verbPrompt1: 'leave (interrogative)',
    expected1: 'did / leave',
    acceptable1: ['did / leave', 'did/leave', 'did leave'],
    verbPrompt2: 'not / arrive',
    expected2: "didn't arrive",
    acceptable2: ["didn't arrive", 'did not arrive', 'didnt arrive'],
    fullSentenceEn:
      "What time did the train leave yesterday? I didn't arrive at the station on time.",
    fullSentenceEs:
      '¿A qué hora salió el tren ayer? No llegué a la estación a tiempo.',
    explanationEn: "Question: What time did the train leave? Negative: didn't arrive.",
    explanationEs: "Pregunta: What time did the train leave? Negativa: didn't arrive.",
  },
  {
    id: 'cs7',
    number: 7,
    sentencePrompt:
      'He __________ (try) to open the door, but he __________ (not / have) the right key.',
    verbPrompt1: 'try',
    expected1: 'tried',
    acceptable1: ['tried'],
    verbPrompt2: 'not / have',
    expected2: "didn't have",
    acceptable2: ["didn't have", 'did not have', 'didnt have'],
    fullSentenceEn:
      "He tried to open the door, but he didn't have the right key.",
    fullSentenceEs:
      'Intentó abrir la puerta, pero no tenía la llave correcta.',
    explanationEn: "try → tried; negative is didn't have (base verb have).",
    explanationEs: "try cambia a tried; la negativa es didn't have (forma base have).",
  },
  {
    id: 'cs8',
    number: 8,
    sentencePrompt:
      '__________ your parents __________ (come) to the meeting last week? Where __________ they __________ (sit)?',
    verbPrompt1: 'come (interrogative)',
    expected1: 'Did / come',
    acceptable1: ['did / come', 'did/come', 'did come'],
    verbPrompt2: 'sit (interrogative)',
    expected2: 'did / sit',
    acceptable2: ['did / sit', 'did/sit', 'did sit'],
    fullSentenceEn:
      'Did your parents come to the meeting last week? Where did they sit?',
    fullSentenceEs:
      '¿Vinieron tus padres a la reunión la semana pasada? ¿Dónde se sentaron?',
    explanationEn: 'Did + subject + come; Where did + subject + sit.',
    explanationEs: 'Did + sujeto + come; Where did + sujeto + sit.',
  },
  {
    id: 'cs9',
    number: 9,
    sentencePrompt:
      'We __________ (not / understand) the instructions, so we __________ (ask) the teacher for help.',
    verbPrompt1: 'not / understand',
    expected1: "didn't understand",
    acceptable1: ["didn't understand", 'did not understand', 'didnt understand'],
    verbPrompt2: 'ask',
    expected2: 'asked',
    acceptable2: ['asked'],
    fullSentenceEn:
      "We didn't understand the instructions, so we asked the teacher for help.",
    fullSentenceEs:
      'No entendimos las instrucciones, así que le pedimos ayuda al profesor.',
    explanationEn: "Negative: didn't understand; regular past: asked.",
    explanationEs: "Negativa: didn't understand; pasado regular: asked.",
  },
  {
    id: 'cs10',
    number: 10,
    sentencePrompt:
      'Someone __________ (take) my umbrella by mistake, but I __________ (not / notice) until I got outside.',
    verbPrompt1: 'take',
    expected1: 'took',
    acceptable1: ['took'],
    verbPrompt2: 'not / notice',
    expected2: "didn't notice",
    acceptable2: ["didn't notice", 'did not notice', 'didnt notice'],
    fullSentenceEn:
      "Someone took my umbrella by mistake, but I didn't notice until I got outside.",
    fullSentenceEs:
      'Alguien se llevó mi paraguas por error, pero no me di cuenta hasta que salí afuera.',
    explanationEn: "take is irregular (took); negative is didn't notice.",
    explanationEs: "take es irregular (took); la negativa es didn't notice.",
  },
];

// ============================================================================
// 5. CORRECT THE MISTAKES (10 items)
// ============================================================================

export interface CorrectMistakeItem {
  id: string;
  number: number;
  incorrectSentenceEn: string;
  incorrectSentenceEs: string;
  mistakeWord: string;
  correctionWord: string;
  correctSentenceEn: string;
  acceptableAnswers: string[];
  explanationEn: string;
  explanationEs: string;
}

export const CORRECT_MISTAKES_DATA: CorrectMistakeItem[] = [
  {
    id: 'cm1',
    number: 1,
    incorrectSentenceEn: "She didn't went to work yesterday.",
    incorrectSentenceEs: 'Ella no fue a trabajar ayer. (con error: went en vez de go)',
    mistakeWord: 'went',
    correctionWord: 'go',
    correctSentenceEn: "She didn't go to work yesterday.",
    acceptableAnswers: [
      "she didn't go to work yesterday",
      'she did not go to work yesterday',
      'she didnt go to work yesterday',
    ],
    explanationEn: "After didn't, use the base form of the verb: go (not went).",
    explanationEs: "Después de didn't, usa el verbo en forma base: go (no went).",
  },
  {
    id: 'cm2',
    number: 2,
    incorrectSentenceEn: 'Did you bought anything at the shopping centre?',
    incorrectSentenceEs: '¿Compraste algo en el centro comercial? (con error: bought en vez de buy)',
    mistakeWord: 'bought',
    correctionWord: 'buy',
    correctSentenceEn: 'Did you buy anything at the shopping centre?',
    acceptableAnswers: [
      'did you buy anything at the shopping centre',
      'did you buy anything at the shopping center',
    ],
    explanationEn: 'After Did, use the base form: buy (not bought).',
    explanationEs: 'Después de Did en preguntas, usa la forma base: buy (no bought).',
  },
  {
    id: 'cm3',
    number: 3,
    incorrectSentenceEn: 'They studyed all night for the exam.',
    incorrectSentenceEs: 'Estudiaron toda la noche para el examen. (con error: studyed)',
    mistakeWord: 'studyed',
    correctionWord: 'studied',
    correctSentenceEn: 'They studied all night for the exam.',
    acceptableAnswers: ['they studied all night for the exam'],
    explanationEn: 'Verbs ending in consonant + y change to -ied: study → studied.',
    explanationEs: 'Los verbos que terminan en consonante + y cambian a -ied: study → studied.',
  },
  {
    id: 'cm4',
    number: 4,
    incorrectSentenceEn: "He didn't understood the question.",
    incorrectSentenceEs: 'Él no entendió la pregunta. (con error: understood en vez de understand)',
    mistakeWord: 'understood',
    correctionWord: 'understand',
    correctSentenceEn: "He didn't understand the question.",
    acceptableAnswers: [
      "he didn't understand the question",
      'he did not understand the question',
      'he didnt understand the question',
    ],
    explanationEn: "After didn't, use the base form: understand (not understood).",
    explanationEs: "Después de didn't, usa la forma base: understand (no understood).",
  },
  {
    id: 'cm5',
    number: 5,
    incorrectSentenceEn: 'We was very tired after the trip.',
    incorrectSentenceEs: 'Estábamos muy cansados después del viaje. (con error: was con we)',
    mistakeWord: 'was',
    correctionWord: 'were',
    correctSentenceEn: 'We were very tired after the trip.',
    acceptableAnswers: ['we were very tired after the trip'],
    explanationEn: 'With the pronoun "we", the past form of the verb to be is were.',
    explanationEs: 'Con el pronombre plural "we", la forma pasada del verbo to be es were.',
  },
  {
    id: 'cm6',
    number: 6,
    incorrectSentenceEn: 'My brother writed a letter and sent it to his friend.',
    incorrectSentenceEs: 'Mi hermano escribió una carta y se la envió a su amigo. (con error: writed)',
    mistakeWord: 'writed',
    correctionWord: 'wrote',
    correctSentenceEn: 'My brother wrote a letter and sent it to his friend.',
    acceptableAnswers: ['my brother wrote a letter and sent it to his friend'],
    explanationEn: 'write is an irregular verb: write → wrote (never writed).',
    explanationEs: 'write es irregular: write → wrote (nunca writed).',
  },
  {
    id: 'cm7',
    number: 7,
    incorrectSentenceEn: 'Where you went last Saturday?',
    incorrectSentenceEs: '¿Adónde fuiste el sábado pasado? (con error: falta el auxiliar did)',
    mistakeWord: 'you went',
    correctionWord: 'did you go',
    correctSentenceEn: 'Where did you go last Saturday?',
    acceptableAnswers: ['where did you go last Saturday'],
    explanationEn: 'Questions need the auxiliary: Where + did + subject + base verb (go).',
    explanationEs: 'Las preguntas requieren auxiliar: Where + did + sujeto + verbo base (go).',
  },
  {
    id: 'cm8',
    number: 8,
    incorrectSentenceEn: 'I stoped the car because the traffic light was red.',
    incorrectSentenceEs: 'Detuve el auto porque el semáforo estaba en rojo. (con error: stoped)',
    mistakeWord: 'stoped',
    correctionWord: 'stopped',
    correctSentenceEn: 'I stopped the car because the traffic light was red.',
    acceptableAnswers: ['i stopped the car because the traffic light was red'],
    explanationEn: 'Short vowel + consonant: double the final p → stopped.',
    explanationEs: 'Vocal corta + consonante: duplica la p final → stopped.',
  },
  {
    id: 'cm9',
    number: 9,
    incorrectSentenceEn: "She didn't liked the restaurant, so she left early.",
    incorrectSentenceEs: 'No le gustó el restaurante, así que se fue temprano. (con error: liked tras didn\'t)',
    mistakeWord: 'liked',
    correctionWord: 'like',
    correctSentenceEn: "She didn't like the restaurant, so she left early.",
    acceptableAnswers: [
      "she didn't like the restaurant, so she left early",
      "she didn't like the restaurant so she left early",
      'she did not like the restaurant, so she left early',
      'she did not like the restaurant so she left early',
    ],
    explanationEn: "After didn't, use the base form: like (not liked).",
    explanationEs: "Después de didn't, usa la forma base: like (no liked).",
  },
  {
    id: 'cm10',
    number: 10,
    incorrectSentenceEn: 'Did they arrived before the concert started?',
    incorrectSentenceEs: '¿Llegaron antes de que empezara el concierto? (con error: arrived tras Did)',
    mistakeWord: 'arrived',
    correctionWord: 'arrive',
    correctSentenceEn: 'Did they arrive before the concert started?',
    acceptableAnswers: ['did they arrive before the concert started'],
    explanationEn: 'After Did, use the base form: arrive (not arrived).',
    explanationEs: 'Después de Did, usa la forma base: arrive (no arrived).',
  },
];

// ============================================================================
// 6. COMPLETE THE TEXT - EMMA'S DAY (16 blanks)
// ============================================================================

export interface EmmaTextBlankItem {
  index: number;
  verbPrompt: string;
  expectedAnswer: string;
  acceptableAnswers: string[];
  explanationEn: string;
  explanationEs: string;
}

export const EMMA_STORY_BLANKS: EmmaTextBlankItem[] = [
  {
    index: 1,
    verbPrompt: 'finish',
    expectedAnswer: 'finished',
    acceptableAnswers: ['finished'],
    explanationEn: 'Regular verb: finish + -ed → finished.',
    explanationEs: 'Verbo regular: finish + -ed → finished (terminó).',
  },
  {
    index: 2,
    verbPrompt: 'decide',
    expectedAnswer: 'decided',
    acceptableAnswers: ['decided'],
    explanationEn: 'Regular verb ending in -e: add -d → decided.',
    explanationEs: 'Verbo regular terminado en -e: añade -d → decided (decidió).',
  },
  {
    index: 3,
    verbPrompt: 'take',
    expectedAnswer: 'took',
    acceptableAnswers: ['took'],
    explanationEn: 'Irregular verb: take → took.',
    explanationEs: 'Verbo irregular: take → took (tomó).',
  },
  {
    index: 4,
    verbPrompt: 'get',
    expectedAnswer: 'got',
    acceptableAnswers: ['got'],
    explanationEn: 'Irregular verb: get off → got off.',
    explanationEs: 'Verbo irregular: get off → got off (se bajó).',
  },
  {
    index: 5,
    verbPrompt: 'not / know',
    expectedAnswer: "didn't know",
    acceptableAnswers: ["didn't know", 'did not know', 'didnt know'],
    explanationEn: "Negative past: didn't + base verb know.",
    explanationEs: "Pasado negativo: didn't + verbo base know (no conocía).",
  },
  {
    index: 6,
    verbPrompt: 'ask',
    expectedAnswer: 'asked',
    acceptableAnswers: ['asked'],
    explanationEn: 'Regular verb: ask + -ed → asked.',
    explanationEs: 'Verbo regular: ask + -ed → asked (preguntó / pidió).',
  },
  {
    index: 7,
    verbPrompt: 'give',
    expectedAnswer: 'gave',
    acceptableAnswers: ['gave'],
    explanationEn: 'Irregular verb: give → gave.',
    explanationEs: 'Verbo irregular: give → gave (le dio).',
  },
  {
    index: 8,
    verbPrompt: 'find',
    expectedAnswer: 'found',
    acceptableAnswers: ['found'],
    explanationEn: 'Irregular verb: find → found.',
    explanationEs: 'Verbo irregular: find → found (encontró).',
  },
  {
    index: 9,
    verbPrompt: 'order',
    expectedAnswer: 'ordered',
    acceptableAnswers: ['ordered'],
    explanationEn: 'Regular verb: order + -ed → ordered.',
    explanationEs: 'Verbo regular: order + -ed → ordered (pidió / ordenó).',
  },
  {
    index: 10,
    verbPrompt: 'see',
    expectedAnswer: 'saw',
    acceptableAnswers: ['saw'],
    explanationEn: 'Irregular verb: see → saw.',
    explanationEs: 'Verbo irregular: see → saw (vio).',
  },
  {
    index: 11,
    verbPrompt: 'talk',
    expectedAnswer: 'talked',
    acceptableAnswers: ['talked'],
    explanationEn: 'Regular verb: talk + -ed → talked.',
    explanationEs: 'Verbo regular: talk + -ed → talked (conversaron).',
  },
  {
    index: 12,
    verbPrompt: 'not / remember',
    expectedAnswer: "didn't remember",
    acceptableAnswers: ["didn't remember", 'did not remember', 'didnt remember'],
    explanationEn: "Negative past: didn't + base verb remember.",
    explanationEs: "Pasado negativo: didn't + verbo base remember (no recordaba).",
  },
  {
    index: 13,
    verbPrompt: 'ask',
    expectedAnswer: 'asked',
    acceptableAnswers: ['asked'],
    explanationEn: 'Regular verb: ask + -ed → asked.',
    explanationEs: 'Verbo regular: ask + -ed → asked (le preguntó).',
  },
  {
    index: 14,
    verbPrompt: 'sit',
    expectedAnswer: 'sat',
    acceptableAnswers: ['sat'],
    explanationEn: 'Irregular verb: sit → sat.',
    explanationEs: 'Verbo irregular: sit → sat (te sentabas / te sentaste).',
  },
  {
    index: 15,
    verbPrompt: 'not / expect',
    expectedAnswer: "didn't expect",
    acceptableAnswers: ["didn't expect", 'did not expect', 'didnt expect'],
    explanationEn: "Negative past: didn't + base verb expect.",
    explanationEs: "Pasado negativo: didn't + verbo base expect (no esperaba).",
  },
  {
    index: 16,
    verbPrompt: 'enjoy',
    expectedAnswer: 'enjoyed',
    acceptableAnswers: ['enjoyed'],
    explanationEn: 'Regular verb ending in vowel + y: add -ed → enjoyed.',
    explanationEs: 'Verbo regular terminado en vocal + y: añade -ed → enjoyed (disfrutó).',
  },
];

export const EMMA_STORY_PARAGRAPHS = [
  {
    id: 'ep1',
    textEn:
      'Last Friday, Emma finished work early and decided to visit a new shopping centre. She took the wrong bus and got off in a neighbourhood she didn\'t know.',
    textEs:
      'El viernes pasado, Emma terminó el trabajo temprano y decidió visitar un nuevo centro comercial. Tomó el autobús equivocado y se bajó en un barrio que no conocía.',
  },
  {
    id: 'ep2',
    textEn:
      'She asked a man for directions, but he gave her the wrong information. After walking for twenty minutes, she found a small café and ordered a sandwich.',
    textEs:
      'Le preguntó a un hombre por indicaciones, pero él le dio la información equivocada. Después de caminar durante veinte minutos, encontró un pequeño café y pidió un sándwich.',
  },
  {
    id: 'ep3',
    textEn:
      'While she was eating, she saw a familiar face. It was her old English teacher! They talked for half an hour. Emma didn\'t remember his surname, so she asked him.',
    textEs:
      'Mientras comía, vio un rostro familiar. ¡Era su antiguo profesor de inglés! Conversaron durante media hora. Emma no recordaba su apellido, así que se lo preguntó.',
  },
  {
    id: 'ep4',
    textEn:
      '"Don\'t you remember me?" he said. "You sat in the front row in every class!" Emma laughed. She didn\'t expect to meet him there, but she enjoyed the unexpected reunion.',
    textEs:
      '"¿No te acuerdas de mí?", dijo él. "¡Te sentabas en primera fila en todas las clases!" Emma se rió. No esperaba encontrárselo allí, pero disfrutó del inesperado reencuentro.',
  },
];

// ============================================================================
// 7. PAST SIMPLE VS PRESENT SIMPLE (12 items)
// ============================================================================

export interface PastVsPresentItem {
  id: string;
  number: number;
  sentencePrompt: string;
  verb1Prompt: string;
  expected1: string;
  acceptable1: string[];
  verb2Prompt: string;
  expected2: string;
  acceptable2: string[];
  fullSentenceEn: string;
  fullSentenceEs: string;
  explanationEn: string;
  explanationEs: string;
}

export const PAST_VS_PRESENT_DATA: PastVsPresentItem[] = [
  {
    id: 'pvp1',
    number: 1,
    sentencePrompt:
      'My brother usually __________ (drive) to work, but yesterday he __________ (take) the bus because his car broke down.',
    verb1Prompt: 'drive (habitual)',
    expected1: 'drives',
    acceptable1: ['drives'],
    verb2Prompt: 'take (yesterday)',
    expected2: 'took',
    acceptable2: ['took'],
    fullSentenceEn:
      'My brother usually drives to work, but yesterday he took the bus because his car broke down.',
    fullSentenceEs:
      'Mi hermano usualmente conduce al trabajo, pero ayer tomó el autobús porque su auto se averió.',
    explanationEn: 'Habitual action (usually): drives (Present Simple 3rd person). Past event (yesterday): took.',
    explanationEs: 'Hábito (usually): drives (Presente Simple 3ª persona). Hecho pasado (yesterday): took.',
  },
  {
    id: 'pvp2',
    number: 2,
    sentencePrompt:
      'I __________ (not / understand) the instructions yesterday, but I usually __________ (understand) this kind of exercise.',
    verb1Prompt: 'not / understand (yesterday)',
    expected1: "didn't understand",
    acceptable1: ["didn't understand", 'did not understand', 'didnt understand'],
    verb2Prompt: 'understand (usually)',
    expected2: 'understand',
    acceptable2: ['understand'],
    fullSentenceEn:
      "I didn't understand the instructions yesterday, but I usually understand this kind of exercise.",
    fullSentenceEs:
      'No entendí las instrucciones ayer, pero usualmente entiendo este tipo de ejercicio.',
    explanationEn: "Past negative: didn't understand. Habitual: understand (Present Simple with I).",
    explanationEs: "Negación en pasado: didn't understand. Hábito: understand (Presente Simple con I).",
  },
  {
    id: 'pvp3',
    number: 3,
    sentencePrompt:
      '__________ you __________ (see) that new film last weekend, or __________ you usually __________ (prefer) watching films at home?',
    verb1Prompt: 'see (last weekend)',
    expected1: 'Did / see',
    acceptable1: ['did / see', 'did/see', 'did see'],
    verb2Prompt: 'prefer (usually)',
    expected2: 'do / prefer',
    acceptable2: ['do / prefer', 'do/prefer', 'do prefer'],
    fullSentenceEn:
      'Did you see that new film last weekend, or do you usually prefer watching films at home?',
    fullSentenceEs:
      '¿Viste esa nueva película el fin de semana pasado, o usualmente prefieres ver películas en casa?',
    explanationEn: 'Past question (last weekend): Did you see. Present question (usually): do you prefer.',
    explanationEs: 'Pregunta en pasado (last weekend): Did you see. Pregunta en presente (usually): do you prefer.',
  },
  {
    id: 'pvp4',
    number: 4,
    sentencePrompt:
      'Sarah __________ (work) in a bank now, but last year she __________ (work) in a restaurant.',
    verb1Prompt: 'work (now)',
    expected1: 'works',
    acceptable1: ['works'],
    verb2Prompt: 'work (last year)',
    expected2: 'worked',
    acceptable2: ['worked'],
    fullSentenceEn:
      'Sarah works in a bank now, but last year she worked in a restaurant.',
    fullSentenceEs:
      'Sarah trabaja en un banco ahora, pero el año pasado trabajó en un restaurante.',
    explanationEn: 'Present state (now): works. Past state (last year): worked.',
    explanationEs: 'Estado presente (now): works. Estado pasado (last year): worked.',
  },
  {
    id: 'pvp5',
    number: 5,
    sentencePrompt:
      'My parents __________ (not / buy) food online. Last night, however, they __________ (order) a pizza through an app.',
    verb1Prompt: 'not / buy (general rule)',
    expected1: "don't buy",
    acceptable1: ["don't buy", 'do not buy', 'dont buy'],
    verb2Prompt: 'order (last night)',
    expected2: 'ordered',
    acceptable2: ['ordered'],
    fullSentenceEn:
      "My parents don't buy food online. Last night, however, they ordered a pizza through an app.",
    fullSentenceEs:
      'Mis padres no compran comida por internet. Anoche, sin embargo, pidieron una pizza mediante una aplicación.',
    explanationEn: "Present general truth: don't buy. Specific past action (last night): ordered.",
    explanationEs: "Verdad general presente: don't buy. Acción puntual pasada (last night): ordered.",
  },
  {
    id: 'pvp6',
    number: 6,
    sentencePrompt:
      'What time __________ the train usually __________ (leave)? And what time __________ it __________ (leave) yesterday?',
    verb1Prompt: 'leave (usually)',
    expected1: 'does / leave',
    acceptable1: ['does / leave', 'does/leave', 'does leave'],
    verb2Prompt: 'leave (yesterday)',
    expected2: 'did / leave',
    acceptable2: ['did / leave', 'did/leave', 'did leave'],
    fullSentenceEn:
      'What time does the train usually leave? And what time did it leave yesterday?',
    fullSentenceEs:
      '¿A qué hora sale el tren usualmente? ¿Y a qué hora salió ayer?',
    explanationEn: 'Routine schedule: does the train leave. Specific past event: did it leave.',
    explanationEs: 'Horario habitual: does the train leave. Hecho pasado específico: did it leave.',
  },
  {
    id: 'pvp7',
    number: 7,
    sentencePrompt:
      'Tom __________ (not / go) to the gym yesterday because he was tired. He usually __________ (go) three times a week.',
    verb1Prompt: 'not / go (yesterday)',
    expected1: "didn't go",
    acceptable1: ["didn't go", 'did not go', 'didnt go'],
    verb2Prompt: 'go (usually)',
    expected2: 'goes',
    acceptable2: ['goes'],
    fullSentenceEn:
      "Tom didn't go to the gym yesterday because he was tired. He usually goes three times a week.",
    fullSentenceEs:
      'Tom no fue al gimnasio ayer porque estaba cansado. Usualmente va tres veces a la semana.',
    explanationEn: "Past negative: didn't go. Habitual frequency: goes (Present Simple 3rd person).",
    explanationEs: "Negación pasada: didn't go. Hábito y frecuencia: goes (Presente Simple 3ª persona).",
  },
  {
    id: 'pvp8',
    number: 8,
    sentencePrompt:
      'I __________ (meet) my best friend every Friday, but last Friday we __________ (not / meet) because she was ill.',
    verb1Prompt: 'meet (every Friday)',
    expected1: 'meet',
    acceptable1: ['meet'],
    verb2Prompt: 'not / meet (last Friday)',
    expected2: "didn't meet",
    acceptable2: ["didn't meet", 'did not meet', 'didnt meet'],
    fullSentenceEn:
      "I meet my best friend every Friday, but last Friday we didn't meet because she was ill.",
    fullSentenceEs:
      'Me encuentro con mi mejor amiga todos los viernes, pero el viernes pasado no nos encontramos porque ella estaba enferma.',
    explanationEn: "Routine: meet (every Friday). Specific past exception: didn't meet.",
    explanationEs: "Rutina: meet (cada viernes). Excepción específica en el pasado: didn't meet.",
  },
  {
    id: 'pvp9',
    number: 9,
    sentencePrompt:
      '__________ your teacher usually __________ (give) you homework? __________ he __________ (give) you any homework last Friday?',
    verb1Prompt: 'give (usually)',
    expected1: 'Does / give',
    acceptable1: ['does / give', 'does/give', 'does give'],
    verb2Prompt: 'give (last Friday)',
    expected2: 'Did / give',
    acceptable2: ['did / give', 'did/give', 'did give'],
    fullSentenceEn:
      'Does your teacher usually give you homework? Did he give you any homework last Friday?',
    fullSentenceEs:
      '¿Tu profesor usualmente les da tarea? ¿Les dio tarea el viernes pasado?',
    explanationEn: 'Present habit question: Does your teacher give. Past question: Did he give.',
    explanationEs: 'Pregunta de hábito presente: Does your teacher give. Pregunta de hecho pasado: Did he give.',
  },
  {
    id: 'pvp10',
    number: 10,
    sentencePrompt:
      'Emma __________ (live) in Buenos Aires now, but she __________ (live) in Córdoba when she was a child.',
    verb1Prompt: 'live (now)',
    expected1: 'lives',
    acceptable1: ['lives'],
    verb2Prompt: 'live (childhood past)',
    expected2: 'lived',
    acceptable2: ['lived'],
    fullSentenceEn:
      'Emma lives in Buenos Aires now, but she lived in Córdoba when she was a child.',
    fullSentenceEs:
      'Emma vive en Buenos Aires ahora, pero vivió en Córdoba cuando era niña.',
    explanationEn: 'Present fact: lives (with Emma). Past completed state: lived.',
    explanationEs: 'Hecho presente: lives (con Emma). Estado pasado completado: lived.',
  },
  {
    id: 'pvp11',
    number: 11,
    sentencePrompt:
      'We usually __________ (have) dinner at 9 p.m., but last night we __________ (have) dinner much later.',
    verb1Prompt: 'have (usually)',
    expected1: 'have',
    acceptable1: ['have'],
    verb2Prompt: 'have (last night)',
    expected2: 'had',
    acceptable2: ['had'],
    fullSentenceEn:
      'We usually have dinner at 9 p.m., but last night we had dinner much later.',
    fullSentenceEs:
      'Usualmente cenamos a las 9 p.m., pero anoche cenamos mucho más tarde.',
    explanationEn: 'Present habit: have dinner. Specific past event (last night): had dinner.',
    explanationEs: 'Hábito presente: have dinner. Evento pasado puntual (last night): had dinner.',
  },
  {
    id: 'pvp12',
    number: 12,
    sentencePrompt:
      'Why __________ you __________ (not / answer) my message yesterday? You usually __________ (reply) immediately.',
    verb1Prompt: 'not / answer (yesterday)',
    expected1: "didn't / answer",
    acceptable1: ["didn't / answer", "didn't answer", "did / not answer", "did not answer"],
    verb2Prompt: 'reply (usually)',
    expected2: 'reply',
    acceptable2: ['reply'],
    fullSentenceEn:
      "Why didn't you answer my message yesterday? You usually reply immediately.",
    fullSentenceEs:
      '¿Por qué no respondiste mi mensaje ayer? Usualmente respondes de inmediato.',
    explanationEn: "Past negative question: Why didn't you answer? Present routine: you reply.",
    explanationEs: "Pregunta negativa en pasado: Why didn't you answer? Rutina presente: you reply.",
  },
];
