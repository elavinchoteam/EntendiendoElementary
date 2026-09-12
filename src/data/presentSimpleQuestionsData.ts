import brutusDogImg from '../assets/images/brutus_dog_scene_1789250673658.jpg';
import cindyChickenImg from '../assets/images/cindy_chicken_oven_1789250691305.jpg';
import restaurantWaiterImg from '../assets/images/restaurant_waiter_1789250704326.jpg';
import doctorWaitingImg from '../assets/images/doctor_waiting_room_1789250715654.jpg';
import classroomTestImg from '../assets/images/classroom_test_scene_1789250729537.jpg';

export {
  brutusDogImg,
  cindyChickenImg,
  restaurantWaiterImg,
  doctorWaitingImg,
  classroomTestImg,
};

export interface PresentSimpleQuestionsActivityItem {
  id: number;
  actNumber: number; // 1 to 10
  instruction: string;
  instructionEs: string;
  promptLinesEn: string[];
  promptLinesEs: string[];
  blankTargetWords: string[]; // for 1 or multiple blanks
  options: string[];
  correctAnswer: string[]; // array of words in order
  explanationEn: string;
  explanationEs: string;
  image?: string;
  fullSentenceEn: string;
  fullSentenceEs: string;
}

export interface PresentSimpleQuestionsTestOption {
  id: string;
  text: string;
  textEs: string;
  isCorrect: boolean;
}

export interface PresentSimpleQuestionsTestQuestion {
  id: string;
  testNumber: number; // 1 to 5
  instructionsEn: string;
  instructionsEs: string;
  question: string;
  questionEs: string;
  options: PresentSimpleQuestionsTestOption[];
  explanation: string;
  explanationEs: string;
  audioText: string;
}

// Global reference video dialogue for Present Simple: Yes/No Questions
export const PRESENT_SIMPLE_QUESTIONS_REFERENCE = {
  dialogueLines: [
    {
      en: "- Hey, Charlie. Do you like my dog Brutus?",
      es: "- Oye, Charlie. ¿Te gusta mi perro Brutus?",
      highlightWords: ["Do", "like"],
    },
    {
      en: "- Er, yes, I do. Does he bite?",
      es: "- Eh, sí, me gusta. ¿Muerde?",
      highlightWords: ["do", "Does", "bite"],
    },
    {
      en: "- No, he doesn't... not usually.",
      es: "- No, no muerde... no habitualmente.",
      highlightWords: ["doesn't"],
    },
  ],
  durationSec: 13,
  fullTextEn: "Hey, Charlie. Do you like my dog Brutus? Er, yes, I do. Does he bite? No, he doesn't... not usually.",
  fullTextEs: "Oye, Charlie. ¿Te gusta mi perro Brutus? Eh, sí, me gusta. ¿Muerde? No, no muerde... no habitualmente.",
};

// 10 Sequential Activities
export const PRESENT_SIMPLE_QUESTIONS_ACTIVITIES: PresentSimpleQuestionsActivityItem[] = [
  // Actividad 1: Video Explore Dialogue
  {
    id: 1,
    actNumber: 1,
    instruction: "Watch the video dialogue and learn how Present Simple Yes/No Questions and short answers are formed.",
    instructionEs: "Mira el video del diálogo y aprende cómo se forman las preguntas de Sí/No y respuestas cortas en Presente Simple.",
    promptLinesEn: [
      "- Hey, Charlie. Do you like my dog Brutus?",
      "- Er, yes, I do. Does he bite?",
      "- No, he doesn't... not usually.",
    ],
    promptLinesEs: [
      "- Oye, Charlie. ¿Te gusta mi perro Brutus?",
      "- Eh, sí, me gusta. ¿Muerde?",
      "- No, no muerde... no habitualmente.",
    ],
    blankTargetWords: [],
    options: [],
    correctAnswer: [],
    explanationEn: "Present Simple Yes/No Questions: Use 'Do' with I/you/we/they ('Do you like...?') and 'Does' with he/she/it ('Does he bite?'). Short answers use 'Yes, I do / No, I don't' or 'Yes, he does / No, he doesn't'.",
    explanationEs: "Preguntas de Sí/No en Presente Simple: Usa 'Do' con I/you/we/they ('Do you like...?') y 'Does' con he/she/it ('Does he bite?'). Las respuestas cortas usan 'Yes, I do / No, I don't' o 'Yes, he does / No, he doesn't'.",
    fullSentenceEn: "Hey, Charlie. Do you like my dog Brutus? Er, yes, I do. Does he bite? No, he doesn't... not usually.",
    fullSentenceEs: "Oye, Charlie. ¿Te gusta mi perro Brutus? Eh, sí, me gusta. ¿Muerde? No, no muerde... no habitualmente.",
    image: brutusDogImg,
  },
  // Actividad 2
  {
    id: 2,
    actNumber: 2,
    instruction: "Drag the correct answer/s into place.",
    instructionEs: "Arrastra o haz clic en la respuesta correcta en el espacio.",
    promptLinesEn: [
      "- I don't have any money. My boss forgot our paychecks.",
      "- That's terrible! ________ them often?",
      "- Yes. I'm looking for a new job.",
    ],
    promptLinesEs: [
      "- No tengo nada de dinero. Mi jefe olvidó nuestros cheques de pago.",
      "- ¡Eso es terrible! ¿Él los olvida a menudo?",
      "- Sí. Estoy buscando un nuevo trabajo.",
    ],
    blankTargetWords: ["Does he forget"],
    options: ["Do they forget", "They forget", "Does he forget", "He forgets"],
    correctAnswer: ["Does he forget"],
    explanationEn: "'My boss' is singular third-person (he). For a present simple question, use the auxiliary 'Does' + subject 'he' + base verb 'forget': 'Does he forget them often?'.",
    explanationEs: "'My boss' es tercera persona singular (he). En una pregunta de presente simple, usamos el auxiliar 'Does' + sujeto 'he' + verbo base 'forget': 'Does he forget them often?'.",
    fullSentenceEn: "That's terrible! Does he forget them often? Yes. I'm looking for a new job.",
    fullSentenceEs: "¡Eso es terrible! ¿Él los olvida a menudo? Sí. Estoy buscando un nuevo trabajo.",
  },
  // Actividad 3
  {
    id: 3,
    actNumber: 3,
    instruction: "Drag the correct answer/s into place.",
    instructionEs: "Arrastra o haz clic en la respuesta correcta en el espacio.",
    promptLinesEn: [
      "Cindy, do you like chicken?",
      "Yes, I ________ .",
    ],
    promptLinesEs: [
      "Cindy, ¿te gusta el pollo?",
      "Sí, me gusta.",
    ],
    blankTargetWords: ["do"],
    options: ["does", "are", "do", "did"],
    correctAnswer: ["do"],
    explanationEn: "In response to 'Do you like chicken?', the affirmative short answer with subject 'I' is 'Yes, I do.'.",
    explanationEs: "En respuesta a 'Do you like chicken?', la respuesta corta afirmativa con el sujeto 'I' es 'Yes, I do.'.",
    fullSentenceEn: "Cindy, do you like chicken? Yes, I do.",
    fullSentenceEs: "Cindy, ¿te gusta el pollo? Sí, me gusta.",
    image: cindyChickenImg,
  },
  // Actividad 4
  {
    id: 4,
    actNumber: 4,
    instruction: "Drag the correct answer/s into place.",
    instructionEs: "Arrastra o haz clic en la respuesta correcta en el espacio.",
    promptLinesEn: [
      "- ________ serve meat here?",
      "- No, we don't. This is a vegetarian restaurant.",
    ],
    promptLinesEs: [
      "- ¿Sirven carne aquí?",
      "- No, no servimos. Este es un restaurante vegetariano.",
    ],
    blankTargetWords: ["Do you"],
    options: ["Do you", "You are", "Did you", "Are you"],
    correctAnswer: ["Do you"],
    explanationEn: "To form a question in present simple with base verb 'serve' and subject 'you', use the auxiliary 'Do': 'Do you serve meat here?'.",
    explanationEs: "Para formar una pregunta en presente simple con el verbo base 'serve' y sujeto 'you', usamos el auxiliar 'Do': 'Do you serve meat here?'.",
    fullSentenceEn: "Do you serve meat here? No, we don't. This is a vegetarian restaurant.",
    fullSentenceEs: "¿Sirven carne aquí? No, no servimos. Este es un restaurante vegetariano.",
    image: restaurantWaiterImg,
  },
  // Actividad 5
  {
    id: 5,
    actNumber: 5,
    instruction: "Drag the correct answer/s into place.",
    instructionEs: "Arrastra o haz clic en la respuesta correcta en el espacio.",
    promptLinesEn: [
      "- Does your leg hurt?",
      "- Yes, it ________ .",
    ],
    promptLinesEs: [
      "- ¿Te duele la pierna?",
      "- Sí, me duele.",
    ],
    blankTargetWords: ["does"],
    options: ["doesn't", "is", "does", "do"],
    correctAnswer: ["does"],
    explanationEn: "'Your leg' is singular (it). The affirmative short answer in present simple with 'Does it...?' is 'Yes, it does.'.",
    explanationEs: "'Your leg' es singular (it). La respuesta afirmativa corta en presente simple a 'Does it...?' es 'Yes, it does.'.",
    fullSentenceEn: "Does your leg hurt? Yes, it does.",
    fullSentenceEs: "¿Te duele la pierna? Sí, me duele.",
    image: doctorWaitingImg,
  },
  // Actividad 6 (3 blanks)
  {
    id: 6,
    actNumber: 6,
    instruction: "Drag the correct answer/s into place.",
    instructionEs: "Arrastra o haz clic en las respuestas correctas en los espacios.",
    promptLinesEn: [
      "- ________ ________ ________ question number five?",
      "- No, I don't. Sorry.",
    ],
    promptLinesEs: [
      "- ¿Entiendes la pregunta número cinco?",
      "- No, no la entiendo. Lo siento.",
    ],
    blankTargetWords: ["Do", "you", "understand"],
    options: ["Are", "understand", "Do", "you"],
    correctAnswer: ["Do", "you", "understand"],
    explanationEn: "Present simple question structure: Auxiliary 'Do' + Subject 'you' + Base Verb 'understand': 'Do you understand question number five?'.",
    explanationEs: "Estructura de pregunta en presente simple: Auxiliar 'Do' + Sujeto 'you' + Verbo base 'understand': 'Do you understand question number five?'.",
    fullSentenceEn: "Do you understand question number five? No, I don't. Sorry.",
    fullSentenceEs: "¿Entiendes la pregunta número cinco? No, no la entiendo. Lo siento.",
    image: classroomTestImg,
  },
  // Actividad 7
  {
    id: 7,
    actNumber: 7,
    instruction: "Drag the correct answer/s into place.",
    instructionEs: "Arrastra o haz clic en la respuesta correcta en el espacio.",
    promptLinesEn: [
      "- Does your boyfriend always eat a lot?",
      "- Yes, ________ .",
    ],
    promptLinesEs: [
      "- ¿Tu novio siempre come mucho?",
      "- Sí, él come mucho.",
    ],
    blankTargetWords: ["he does"],
    options: ["he does", "he did", "he is"],
    correctAnswer: ["he does"],
    explanationEn: "'Your boyfriend' corresponds to 'he'. The affirmative short answer to 'Does he...?' in the present simple is 'Yes, he does.'.",
    explanationEs: "'Your boyfriend' corresponde a 'he'. La respuesta afirmativa corta a 'Does he...?' en presente simple es 'Yes, he does.'.",
    fullSentenceEn: "Does your boyfriend always eat a lot? Yes, he does.",
    fullSentenceEs: "¿Tu novio siempre come mucho? Sí, él come mucho.",
  },
  // Actividad 8
  {
    id: 8,
    actNumber: 8,
    instruction: "Drag the correct answer/s into place.",
    instructionEs: "Arrastra o haz clic en la respuesta correcta en el espacio.",
    promptLinesEn: [
      "- Does this bus go to Main Street?",
      "- ________ .",
    ],
    promptLinesEs: [
      "- ¿Este autobús va a la Calle Principal?",
      "- Sí, va allí.",
    ],
    blankTargetWords: ["Yes, it does"],
    options: ["Yes, it does", "Yes, does it", "No, it does", "No, it isn't"],
    correctAnswer: ["Yes, it does"],
    explanationEn: "'This bus' is an inanimate singular subject (it). The affirmative short response is 'Yes, it does.'. 'No, it does' is contradictory, and 'Yes, does it' has incorrect word order.",
    explanationEs: "'This bus' es un sujeto singular inanimado (it). La respuesta afirmativa corta es 'Yes, it does.'. 'No, it does' es contradictorio, y 'Yes, does it' tiene el orden invertido.",
    fullSentenceEn: "Does this bus go to Main Street? Yes, it does.",
    fullSentenceEs: "¿Este autobús va a la Calle Principal? Sí, va allí.",
  },
  // Actividad 9
  {
    id: 9,
    actNumber: 9,
    instruction: "Drag the correct answer/s into place.",
    instructionEs: "Arrastra o haz clic en la respuesta correcta en el espacio.",
    promptLinesEn: [
      "- Mario gave me a CD.",
      "- That's nice. ________ he always give you things?",
      "- No, only sometimes.",
    ],
    promptLinesEs: [
      "- Mario me regaló un CD.",
      "- Qué agradable. ¿Él siempre te regala cosas?",
      "- No, solo a veces.",
    ],
    blankTargetWords: ["Does"],
    options: ["Is", "Did", "Do", "Does"],
    correctAnswer: ["Does"],
    explanationEn: "With subject 'he' and frequency adverb 'always' asking about regular habits in the present, use the auxiliary 'Does': 'Does he always give you things?'.",
    explanationEs: "Con el sujeto 'he' y el adverbio de frecuencia 'always' para preguntar sobre un hábito regular en presente, usamos el auxiliar 'Does': 'Does he always give you things?'.",
    fullSentenceEn: "That's nice. Does he always give you things? No, only sometimes.",
    fullSentenceEs: "Qué agradable. ¿Él siempre te regala cosas? No, solo a veces.",
  },
  // Actividad 10
  {
    id: 10,
    actNumber: 10,
    instruction: "Drag the correct answer/s into place.",
    instructionEs: "Arrastra o haz clic en la respuesta correcta en el espacio.",
    promptLinesEn: [
      "- This singer is great. ________ here often?",
      "- Yes, he does. He's here every Wednesday.",
    ],
    promptLinesEs: [
      "- Este cantante es genial. ¿Él canta aquí seguido?",
      "- Sí. Él está aquí todos los miércoles.",
    ],
    blankTargetWords: ["Does he sing"],
    options: ["Does he sing", "Is he singing", "Did he sing"],
    correctAnswer: ["Does he sing"],
    explanationEn: "To ask about a routine ('often') with answer 'Yes, he does', we use the present simple question 'Does he sing here often?'.",
    explanationEs: "Para preguntar sobre una rutina ('often') confirmada con 'Yes, he does', usamos la pregunta en presente simple: 'Does he sing here often?'.",
    fullSentenceEn: "This singer is great. Does he sing here often? Yes, he does. He's here every Wednesday.",
    fullSentenceEs: "Este cantante es genial. ¿Él canta aquí seguido? Sí. Él está aquí todos los miércoles.",
  },
];

// Actividad 11: 5 Sequential Tests (Clean-House Agency format)
export const PRESENT_SIMPLE_QUESTIONS_TESTS: PresentSimpleQuestionsTestQuestion[] = [
  // Test 1 (from test 1.png)
  {
    id: 'ps-q-test-1',
    testNumber: 1,
    instructionsEn: "Choose the correct answer to complete the dialogue.",
    instructionsEs: "Elige la respuesta correcta para completar el diálogo.",
    question: "- This is a lovely table. ________ from Japan?\n- No, it doesn't. It's from Korea.",
    questionEs: "- Esta es una mesa hermosa. ¿________ de Japón?\n- No. Es de Corea.",
    options: [
      {
        id: 't1-opt-1',
        text: 'Does it come',
        textEs: '¿Viene / Proviene? (Does + sujeto + verbo base)',
        isCorrect: true,
      },
      {
        id: 't1-opt-2',
        text: 'Does it comes',
        textEs: 'incorrecto (no se agrega -s al verbo base con Does)',
        isCorrect: false,
      },
      {
        id: 't1-opt-3',
        text: 'Is it come',
        textEs: 'incorrecto (mezcla incorrecta de verbo to be y verbo base)',
        isCorrect: false,
      },
      {
        id: 't1-opt-4',
        text: 'Does it coming',
        textEs: 'incorrecto (mezcla de Does con terminación -ing)',
        isCorrect: false,
      },
    ],
    explanation: "In a present simple question with subject 'it' (the table), use the auxiliary 'Does' + subject 'it' + base verb 'come': 'Does it come from Japan?'.",
    explanationEs: "En una pregunta en presente simple con el sujeto 'it' (la mesa), usamos el auxiliar 'Does' + sujeto 'it' + verbo base 'come': 'Does it come from Japan?'.",
    audioText: "This is a lovely table. Does it come from Japan? No, it doesn't. It's from Korea.",
  },
  // Test 2 (from test 2.png)
  {
    id: 'ps-q-test-2',
    testNumber: 2,
    instructionsEn: "Choose the correct answer to complete the dialogue.",
    instructionsEs: "Elige la respuesta correcta para completar el diálogo.",
    question: "- Do you like spicy food?\n- ________ !",
    questionEs: "- ¿Les gusta la comida picante?\n- ¡________ !",
    options: [
      {
        id: 't2-opt-1',
        text: 'Yes, we do',
        textEs: 'Sí, nos gusta (respuesta corta afirmativa plural)',
        isCorrect: true,
      },
      {
        id: 't2-opt-2',
        text: 'No, we do',
        textEs: 'incorrecto (contradicción entre No y do afirmativo)',
        isCorrect: false,
      },
      {
        id: 't2-opt-3',
        text: "Yes, we don't",
        textEs: 'incorrecto (contradicción entre Yes y don\'t negativo)',
        isCorrect: false,
      },
      {
        id: 't2-opt-4',
        text: 'Yes, you do',
        textEs: 'incorrecto (pronombre equivocado al responder en grupo)',
        isCorrect: false,
      },
    ],
    explanation: "When answering 'Do you like...?' on behalf of a group ('we'), the affirmative short answer is 'Yes, we do!'.",
    explanationEs: "Al responder a 'Do you like...?' en nombre de un grupo ('we'), la respuesta afirmativa corta correcta es 'Yes, we do!'.",
    audioText: "Do you like spicy food? Yes, we do!",
  },
  // Test 3 (from test 3.png)
  {
    id: 'ps-q-test-3',
    testNumber: 3,
    instructionsEn: "Choose the correct answer to complete the dialogue.",
    instructionsEs: "Elige la respuesta correcta para completar el diálogo.",
    question: "- ________ your friends' birthdays?\n- Yes, I do.\n- I don't. I always forget them.",
    questionEs: "- ¿________ los cumpleaños de tus amigos?\n- Sí, los recuerdo.\n- Yo no. Siempre los olvido.",
    options: [
      {
        id: 't3-opt-1',
        text: 'Do you remember',
        textEs: '¿Recuerdas? (pregunta habitual en presente simple)',
        isCorrect: true,
      },
      {
        id: 't3-opt-2',
        text: 'Did you remember',
        textEs: '¿Recordaste? (tiempo pasado)',
        isCorrect: false,
      },
      {
        id: 't3-opt-3',
        text: 'Does she remember',
        textEs: '¿Recuerda ella? (no concuerda con la respuesta "Yes, I do")',
        isCorrect: false,
      },
      {
        id: 't3-opt-4',
        text: 'Are you remember',
        textEs: 'incorrecto (no se combina el verbo be con un verbo base)',
        isCorrect: false,
      },
    ],
    explanation: "Since the respondent says 'Yes, I do', the question was addressed to 'you' in the present simple: 'Do you remember your friends' birthdays?'.",
    explanationEs: "Dado que quien responde dice 'Yes, I do', la pregunta fue dirigida a 'you' en presente simple: 'Do you remember your friends' birthdays?'.",
    audioText: "Do you remember your friends' birthdays? Yes, I do. I don't. I always forget them.",
  },
  // Test 4 (from test 4.png)
  {
    id: 'ps-q-test-4',
    testNumber: 4,
    instructionsEn: "Choose the correct answer to complete the dialogue.",
    instructionsEs: "Elige la respuesta correcta para completar el diálogo.",
    question: "- I love the Rockland Tigers.\n- ________ all their games?\n- Yes, I do.",
    questionEs: "- Me encantan los Rockland Tigers.\n- ¿________ todos sus partidos?\n- Sí, los veo.",
    options: [
      {
        id: 't4-opt-1',
        text: 'Do you watch',
        textEs: '¿Miras / Ves? (pregunta de rutina en presente simple)',
        isCorrect: true,
      },
      {
        id: 't4-opt-2',
        text: 'Did you watch',
        textEs: '¿Miraste? (tiempo pasado)',
        isCorrect: false,
      },
      {
        id: 't4-opt-3',
        text: 'Are you watching',
        textEs: '¿Estás mirando? (presente continuo en progreso)',
        isCorrect: false,
      },
      {
        id: 't4-opt-4',
        text: 'You watch',
        textEs: 'Tú miras (forma afirmativa, falta auxiliar de pregunta)',
        isCorrect: false,
      },
    ],
    explanation: "To ask about a regular habit ('all their games') with answer 'Yes, I do', use the auxiliary 'Do' + subject 'you' + base verb 'watch': 'Do you watch all their games?'.",
    explanationEs: "Para preguntar sobre un hábito regular ('all their games') con respuesta 'Yes, I do', usamos el auxiliar 'Do' + sujeto 'you' + verbo base 'watch': 'Do you watch all their games?'.",
    audioText: "I love the Rockland Tigers. Do you watch all their games? Yes, I do.",
  },
  // Test 5 (from test 5.png)
  {
    id: 'ps-q-test-5',
    testNumber: 5,
    instructionsEn: "Choose the correct answer to complete the dialogue.",
    instructionsEs: "Elige la respuesta correcta para completar el diálogo.",
    question: "- I worked until 11:00 last night.\n- Do you usually work late?\n- No, ________ , but we're very busy these days.",
    questionEs: "- Trabajé hasta las 11:00 anoche.\n- ¿Sueles trabajar hasta tarde?\n- No, ________ , pero estamos muy ocupados estos días.",
    options: [
      {
        id: 't5-opt-1',
        text: "I don't",
        textEs: "no suelo (respuesta corta negativa con I)",
        isCorrect: true,
      },
      {
        id: 't5-opt-2',
        text: 'I do',
        textEs: "sí suelo (afirmativa, contradice el 'No')",
        isCorrect: false,
      },
      {
        id: 't5-opt-3',
        text: "I'm not",
        textEs: "no soy/estoy (incorrecto en respuesta a 'Do you...?')",
        isCorrect: false,
      },
      {
        id: 't5-opt-4',
        text: "I didn't",
        textEs: "no lo hice (tiempo pasado, pero la pregunta indaga la rutina habitual)",
        isCorrect: false,
      },
    ],
    explanation: "For the question 'Do you usually work late?', a negative short answer starting with 'No' uses the subject 'I' and auxiliary 'don't': 'No, I don't'.",
    explanationEs: "Para la pregunta 'Do you usually work late?', la respuesta corta negativa que comienza con 'No' usa el sujeto 'I' y el auxiliar 'don't': 'No, I don't'.",
    audioText: "I worked until 11:00 last night. Do you usually work late? No, I don't, but we're very busy these days.",
  },
];
