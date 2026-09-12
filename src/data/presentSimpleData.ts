import peterDreamingImg from '../assets/images/peter_dreaming_pool_1789248855076.jpg';
import boringMeetingImg from '../assets/images/boring_meeting_class_1789248870399.jpg';

export { peterDreamingImg, boringMeetingImg };

export interface PresentSimpleActivityItem {
  id: number;
  actNumber: number; // 1 to 11
  instruction: string;
  instructionEs: string;
  promptLinesEn: string[];
  promptLinesEs: string[];
  blankTargetWord: string;
  options: string[];
  correctAnswer: string;
  explanationEn: string;
  explanationEs: string;
  image?: string;
  fullSentenceEn: string;
  fullSentenceEs: string;
}

export interface PresentSimpleTestOption {
  id: string;
  text: string;
  textEs: string;
  isCorrect: boolean;
}

export interface PresentSimpleTestQuestion {
  id: string;
  testNumber: number; // 1 to 5
  instructionsEn: string;
  instructionsEs: string;
  question: string;
  questionEs: string;
  options: PresentSimpleTestOption[];
  explanation: string;
  explanationEs: string;
  audioText: string;
}

export interface PresentSimpleTestItem {
  id: number;
  testNumber: number; // 1 to 5
  instruction: string;
  instructionEs: string;
  promptLinesEn: string[];
  promptLinesEs: string[];
  options: string[];
  correctAnswer: string;
  explanationEn: string;
  explanationEs: string;
  fullSentenceEn: string;
  fullSentenceEs: string;
}

// Global reference sentence for Actividades 1 to 11
export const PRESENT_SIMPLE_REFERENCE = {
  sentenceEn: "Peter swims on weekends. He doesn't swim during the week.",
  sentenceEs: "Peter nada los fines de semana. Él no nada durante la semana.",
  highlight1: "swims",
  highlight2: "doesn't swim",
  durationSec: 4,
};

// 11 Activities
export const PRESENT_SIMPLE_ACTIVITIES: PresentSimpleActivityItem[] = [
  // Actividad 1: Video / Grammar Explore statement
  {
    id: 1,
    actNumber: 1,
    instruction: "Watch the video statement and learn how Present Simple statements are formed.",
    instructionEs: "Mira la oración del video y aprende cómo se forman las oraciones en Presente Simple.",
    promptLinesEn: [
      "- Peter swims on weekends. He doesn't swim during the week."
    ],
    promptLinesEs: [
      "- Peter nada los fines de semana. Él no nada durante la semana."
    ],
    blankTargetWord: "",
    options: [],
    correctAnswer: "Peter swims on weekends. He doesn't swim during the week.",
    explanationEn: "Present Simple Affirmative: use verb + -s/-es for he/she/it (Peter swims). Negative: use doesn't + base verb for he/she/it (He doesn't swim).",
    explanationEs: "Presente Simple Afirmativo: agrega -s/-es al verbo con he/she/it (Peter swims). Negativo: usa doesn't + verbo base con he/she/it (He doesn't swim).",
    fullSentenceEn: "Peter swims on weekends. He doesn't swim during the week.",
    fullSentenceEs: "Peter nada los fines de semana. Él no nada durante la semana.",
  },
  // Actividad 2
  {
    id: 2,
    actNumber: 2,
    instruction: "Drag the correct answer/s into place.",
    instructionEs: "Arrastra o haz clic en la respuesta correcta en el espacio.",
    promptLinesEn: [
      "I want to be a famous actor. I ________ to make lots of films!"
    ],
    promptLinesEs: [
      "Quiero ser un actor famoso. ¡Quiero hacer muchas películas!"
    ],
    blankTargetWord: "want",
    options: ["wanted", "wanting", "want", "wants"],
    correctAnswer: "want",
    explanationEn: "With the subject 'I', we use the base form of the verb 'want' in the present simple.",
    explanationEs: "Con el pronombre 'I', usamos la forma base del verbo 'want' en presente simple.",
    fullSentenceEn: "I want to be a famous actor. I want to make lots of films!",
    fullSentenceEs: "Quiero ser un actor famoso. ¡Quiero hacer muchas películas!",
  },
  // Actividad 3
  {
    id: 3,
    actNumber: 3,
    instruction: "Drag the correct answer/s into place.",
    instructionEs: "Arrastra o haz clic en la respuesta correcta en el espacio.",
    promptLinesEn: [
      "- Hi, Peter. Do you want to go shopping after school?",
      "- I don't have any cash.",
      "- That's OK. I always ________ with a credit card. You can pay me later."
    ],
    promptLinesEs: [
      "- Hola, Peter. ¿Quieres ir de compras después de la escuela?",
      "- No tengo dinero en efectivo.",
      "- Está bien. Siempre pago con tarjeta de crédito. Puedes pagarme más tarde."
    ],
    blankTargetWord: "pay",
    options: ["paying", "pay", "paid", "pays"],
    correctAnswer: "pay",
    explanationEn: "With the subject 'I' and frequency adverb 'always', we use the base verb 'pay'.",
    explanationEs: "Con el sujeto 'I' y el adverbio de frecuencia 'always', usamos el verbo base 'pay'.",
    fullSentenceEn: "That's OK. I always pay with a credit card. You can pay me later.",
    fullSentenceEs: "Está bien. Siempre pago con tarjeta de crédito. Puedes pagarme más tarde.",
  },
  // Actividad 4
  {
    id: 4,
    actNumber: 4,
    instruction: "Drag the correct answer/s into place.",
    instructionEs: "Arrastra o haz clic en la respuesta correcta en el espacio.",
    promptLinesEn: [
      "The Toronto Blue Jays are a great baseball team. They always ________ a lot of games."
    ],
    promptLinesEs: [
      "Los Toronto Blue Jays son un gran equipo de béisbol. Siempre ganan muchos partidos."
    ],
    blankTargetWord: "win",
    options: ["win", "wins", "are winning"],
    correctAnswer: "win",
    explanationEn: "'They' (plural third person) takes the base verb form 'win' for routine actions with 'always'.",
    explanationEs: "'They' (tercera persona plural) lleva la forma base del verbo 'win' para hábitos con 'always'.",
    fullSentenceEn: "The Toronto Blue Jays are a great baseball team. They always win a lot of games.",
    fullSentenceEs: "Los Toronto Blue Jays son un gran equipo de béisbol. Siempre ganan muchos partidos.",
  },
  // Actividad 5
  {
    id: 5,
    actNumber: 5,
    instruction: "Drag the correct answer/s into place.",
    instructionEs: "Arrastra o haz clic en la respuesta correcta en el espacio.",
    promptLinesEn: [
      "- Hey! The dog is in the house.",
      "- Oh, no! Take him out. He always ________ everything!"
    ],
    promptLinesEs: [
      "- ¡Oye! El perro está en la casa.",
      "- ¡Oh, no! Sácalo. ¡Siempre rompe todo!"
    ],
    blankTargetWord: "breaks",
    options: ["breaks", "break", "is breaking", "breaking"],
    correctAnswer: "breaks",
    explanationEn: "With the third-person singular pronoun 'He', add -s to the verb in the simple present: 'breaks'.",
    explanationEs: "Con el pronombre en tercera persona singular 'He', se agrega -s al verbo en presente simple: 'breaks'.",
    fullSentenceEn: "Oh, no! Take him out. He always breaks everything!",
    fullSentenceEs: "¡Oh, no! Sácalo. ¡Siempre rompe todo!",
  },
  // Actividad 6
  {
    id: 6,
    actNumber: 6,
    instruction: "Drag the correct answer/s into place.",
    instructionEs: "Arrastra o haz clic en la respuesta correcta en el espacio.",
    promptLinesEn: [
      "- Martin always looks so smart.",
      "- Well, he ________ a different suit every day!"
    ],
    promptLinesEs: [
      "- Martin siempre luce tan elegante.",
      "- Bueno, ¡él viste un traje diferente cada día!"
    ],
    blankTargetWord: "wears",
    options: ["wears", "wear", "wore", "is wearing"],
    correctAnswer: "wears",
    explanationEn: "Third-person singular 'he' requires the verb ending in -s: 'wears'.",
    explanationEs: "La tercera persona singular 'he' requiere que el verbo termine en -s: 'wears'.",
    fullSentenceEn: "Well, he wears a different suit every day!",
    fullSentenceEs: "Bueno, ¡él viste un traje diferente cada día!",
  },
  // Actividad 7
  {
    id: 7,
    actNumber: 7,
    instruction: "Drag the correct answer/s into place.",
    instructionEs: "Arrastra o haz clic en la respuesta correcta en el espacio.",
    promptLinesEn: [
      "- Where's Chris tonight?",
      "- He's at the gym. He ________ there every Tuesday."
    ],
    promptLinesEs: [
      "- ¿Dónde está Chris esta noche?",
      "- Está en el gimnasio. Va allí todos los martes."
    ],
    blankTargetWord: "goes",
    options: ["is going", "go", "goes", "went"],
    correctAnswer: "goes",
    explanationEn: "For routine weekly habits ('every Tuesday') with 'He', use 'goes' (verb 'go' + -es).",
    explanationEs: "Para hábitos semanales ('every Tuesday') con 'He', se usa 'goes' (verbo 'go' + -es).",
    fullSentenceEn: "He's at the gym. He goes there every Tuesday.",
    fullSentenceEs: "Está en el gimnasio. Va allí todos los martes.",
  },
  // Actividad 8
  {
    id: 8,
    actNumber: 8,
    instruction: "Drag the correct answer/s into place.",
    instructionEs: "Arrastra o haz clic en la respuesta correcta en el espacio.",
    promptLinesEn: [
      "- Why isn't Louis at the party?",
      "- He ________ dance."
    ],
    promptLinesEs: [
      "- ¿Por qué Louis no está en la fiesta?",
      "- Él no baila."
    ],
    blankTargetWord: "doesn't",
    options: ["doesn't", "isn't", "didn't", "don't"],
    correctAnswer: "doesn't",
    explanationEn: "In the present simple negative with 'He', use the auxiliary 'doesn't' before the base verb 'dance'.",
    explanationEs: "En la forma negativa del presente simple con 'He', se usa el auxiliar 'doesn't' antes del verbo base 'dance'.",
    fullSentenceEn: "He doesn't dance.",
    fullSentenceEs: "Él no baila.",
  },
  // Actividad 9
  {
    id: 9,
    actNumber: 9,
    instruction: "Drag the correct answer/s into place.",
    instructionEs: "Arrastra o haz clic en la respuesta correcta en el espacio.",
    promptLinesEn: [
      "I need to diet! I eat a lot, and I ________ ."
    ],
    promptLinesEs: [
      "¡Necesito hacer dieta! Como mucho, y no hago ejercicio."
    ],
    blankTargetWord: "don't exercise",
    options: ["didn't exercise", "not exercising", "don't exercise", "doesn't exercise"],
    correctAnswer: "don't exercise",
    explanationEn: "With subject 'I', form the negative statement in simple present with 'don't' + base verb: 'don't exercise'.",
    explanationEs: "Con el sujeto 'I', se forma la negación en presente simple con 'don't' + verbo base: 'don't exercise'.",
    fullSentenceEn: "I need to diet! I eat a lot, and I don't exercise.",
    fullSentenceEs: "¡Necesito hacer dieta! Como mucho, y no hago ejercicio.",
  },
  // Actividad 10
  {
    id: 10,
    actNumber: 10,
    instruction: "Drag the correct answer/s into place.",
    instructionEs: "Arrastra o haz clic en la respuesta correcta en el espacio.",
    promptLinesEn: [
      "- This is so boring! What time is it?",
      "- It's 10:00. The meeting ________ until 12:00!"
    ],
    promptLinesEs: [
      "- ¡Esto es tan aburrido! ¿Qué hora es?",
      "- Son las 10:00. ¡La reunión no termina hasta las 12:00!"
    ],
    blankTargetWord: "doesn't finish",
    options: ["finishes", "doesn't finish", "don't finish", "not finishing"],
    correctAnswer: "doesn't finish",
    explanationEn: "'The meeting' is singular (it). With 'until 12:00', the negative 'doesn't finish' correctly indicates it continues until noon.",
    explanationEs: "'The meeting' es singular (it). Con 'until 12:00', la forma negativa 'doesn't finish' indica que la reunión no termina hasta mediodía.",
    image: boringMeetingImg,
    fullSentenceEn: "It's 10:00. The meeting doesn't finish until 12:00!",
    fullSentenceEs: "Son las 10:00. ¡La reunión no termina hasta las 12:00!",
  },
  // Actividad 11
  {
    id: 11,
    actNumber: 11,
    instruction: "Drag the correct answer/s into place.",
    instructionEs: "Arrastra o haz clic en la respuesta correcta en el espacio.",
    promptLinesEn: [
      "- How's the new secretary?",
      "- She's nice, but she ________ very well."
    ],
    promptLinesEs: [
      "- ¿Cómo es la nueva secretaria?",
      "- Es agradable, pero no escribe a máquina muy bien."
    ],
    blankTargetWord: "doesn't type",
    options: ["not type", "don't type", "doesn't type"],
    correctAnswer: "doesn't type",
    explanationEn: "Third person singular 'she' forms the negative simple present with 'doesn't type'.",
    explanationEs: "La tercera persona singular 'she' forma el negativo en presente simple con 'doesn't type'.",
    fullSentenceEn: "She's nice, but she doesn't type very well.",
    fullSentenceEs: "Es agradable, pero no escribe a máquina muy bien.",
  },
];

// Actividad 12: Test (5 Tests)
export const PRESENT_SIMPLE_TESTS: PresentSimpleTestItem[] = [
  // Test 1
  {
    id: 1,
    testNumber: 1,
    instruction: "Choose the correct answer to complete the statement.",
    instructionEs: "Elige la respuesta correcta para completar la oración.",
    promptLinesEn: [
      "- What's that?",
      "- Oh, it's a letter from my grandmother. She ________ me a letter every month."
    ],
    promptLinesEs: [
      "- ¿Qué es eso?",
      "- Oh, es una carta de mi abuela. Ella me envía una carta todos los meses."
    ],
    options: ["to send", "sending", "sent", "sends"],
    correctAnswer: "sends",
    explanationEn: "With 'She' (third-person singular) and routine habit 'every month', use the present simple form 'sends'.",
    explanationEs: "Con 'She' (tercera persona singular) y un hábito regular 'every month', usamos la forma de presente simple 'sends'.",
    fullSentenceEn: "Oh, it's a letter from my grandmother. She sends me a letter every month.",
    fullSentenceEs: "Oh, es una carta de mi abuela. Ella me envía una carta todos los meses.",
  },
  // Test 2
  {
    id: 2,
    testNumber: 2,
    instruction: "Choose the correct answer to complete the statement.",
    instructionEs: "Elige la respuesta correcta para completar la oración.",
    promptLinesEn: [
      "- Where are you going?",
      "- I'm going to Cape Cod. My aunt and uncle ________ me there every summer."
    ],
    promptLinesEs: [
      "- ¿A dónde vas?",
      "- Voy a Cape Cod. Mis tíos me invitan allí todos los veranos."
    ],
    options: ["invite", "invited", "invites", "inviting"],
    correctAnswer: "invite",
    explanationEn: "'My aunt and uncle' is plural (they), so the present simple form is the base verb 'invite'.",
    explanationEs: "'My aunt and uncle' es plural (ellos), por lo que en presente simple se utiliza la forma base 'invite'.",
    fullSentenceEn: "My aunt and uncle invite me there every summer.",
    fullSentenceEs: "Mis tíos me invitan allí todos los veranos.",
  },
  // Test 3
  {
    id: 3,
    testNumber: 3,
    instruction: "Choose the correct answer to complete the statement.",
    instructionEs: "Elige la respuesta correcta para completar la oración.",
    promptLinesEn: [
      "- Number five is a great ball player. He ________ every ball!",
      "- He's my brother!"
    ],
    promptLinesEs: [
      "- El número cinco es un gran jugador. ¡Atrapa todas las pelotas!",
      "- ¡Es mi hermano!"
    ],
    options: ["did catch", "catches", "catch", "catching"],
    correctAnswer: "catches",
    explanationEn: "Verbs ending in -ch add -es with third-person singular 'He': 'catches'.",
    explanationEs: "Los verbos que terminan en -ch agregan -es con la tercera persona singular 'He': 'catches'.",
    fullSentenceEn: "Number five is a great ball player. He catches every ball!",
    fullSentenceEs: "El número cinco es un gran jugador. ¡Atrapa todas las pelotas!",
  },
  // Test 4
  {
    id: 4,
    testNumber: 4,
    instruction: "Choose the correct answer to complete the statement.",
    instructionEs: "Elige la respuesta correcta para completar la oración.",
    promptLinesEn: [
      "Richie is very smart. He ________ to the teacher in class, but he answers every question on the tests."
    ],
    promptLinesEs: [
      "Richie es muy inteligente. No escucha al maestro en clase, pero responde todas las preguntas en los exámenes."
    ],
    options: ["doesn't listen", "don't listen", "didn't listen", "isn't listening"],
    correctAnswer: "doesn't listen",
    explanationEn: "Third-person singular 'He' takes 'doesn't' + base verb 'listen' in simple present negative.",
    explanationEs: "La tercera persona singular 'He' toma 'doesn't' + verbo base 'listen' en la negación de presente simple.",
    fullSentenceEn: "Richie is very smart. He doesn't listen to the teacher in class, but he answers every question on the tests.",
    fullSentenceEs: "Richie es muy inteligente. No escucha al maestro en clase, pero responde todas las preguntas en los exámenes.",
  },
  // Test 5
  {
    id: 5,
    testNumber: 5,
    instruction: "Choose the correct answer to complete the statement.",
    instructionEs: "Elige la respuesta correcta para completar la oración.",
    promptLinesEn: [
      "- Would you like a cookie?",
      "- No, thank you. ________ ."
    ],
    promptLinesEs: [
      "- ¿Te gustaría una galleta?",
      "- No, gracias. No me gustan las galletas."
    ],
    options: [
      "I am not liking cookies.",
      "I not like cookies.",
      "I don't like cookies.",
      "I don't liking cookies."
    ],
    correctAnswer: "I don't like cookies.",
    explanationEn: "'Like' is a stative verb; in the simple present with 'I', we use 'I don't like cookies.'",
    explanationEs: "'Like' es un verbo de estado; en presente simple con 'I', decimos 'I don't like cookies.'",
    fullSentenceEn: "No, thank you. I don't like cookies.",
    fullSentenceEs: "No, gracias. No me gustan las galletas.",
  },
];

// Clean-House Agency style Test Questions (5 Tests)
export const PRESENT_SIMPLE_TEST_QUESTIONS: PresentSimpleTestQuestion[] = [
  // Test 1
  {
    id: 'pst-1',
    testNumber: 1,
    instructionsEn: 'Choose the correct answer to complete the statement.',
    instructionsEs: 'Elige la respuesta correcta para completar la oración.',
    question: "- What's that?\n- Oh, it's a letter from my grandmother. She ________ me a letter every month.",
    questionEs: '- ¿Qué es eso?\n- Oh, es una carta de mi abuela. Ella me envía una carta todos los meses.',
    audioText: "What's that? Oh, it's a letter from my grandmother. She sends me a letter every month.",
    options: [
      { id: 'pst1-1', text: 'to send', textEs: 'enviar (infinitivo)', isCorrect: false },
      { id: 'pst1-2', text: 'sending', textEs: 'enviando (gerundio)', isCorrect: false },
      { id: 'pst1-3', text: 'sent', textEs: 'envió (pasado)', isCorrect: false },
      { id: 'pst1-4', text: 'sends', textEs: 'envía (presente simple)', isCorrect: true },
    ],
    explanation: "With third-person singular 'She' and a regular monthly habit ('every month'), the verb takes -s in the present simple: 'sends'.",
    explanationEs: "Con la tercera persona singular 'She' y un hábito regular mensual ('every month'), el verbo lleva -s en presente simple: 'sends'.",
  },
  // Test 2
  {
    id: 'pst-2',
    testNumber: 2,
    instructionsEn: 'Choose the correct answer to complete the statement.',
    instructionsEs: 'Elige la respuesta correcta para completar la oración.',
    question: "- Where are you going?\n- I'm going to Cape Cod. My aunt and uncle ________ me there every summer.",
    questionEs: '- ¿A dónde vas?\n- Voy a Cape Cod. Mis tíos me invitan allí todos los veranos.',
    audioText: "Where are you going? I'm going to Cape Cod. My aunt and uncle invite me there every summer.",
    options: [
      { id: 'pst2-1', text: 'invite', textEs: 'invitan (forma base plural)', isCorrect: true },
      { id: 'pst2-2', text: 'invited', textEs: 'invitaron (pasado)', isCorrect: false },
      { id: 'pst2-3', text: 'invites', textEs: 'invita (singular)', isCorrect: false },
      { id: 'pst2-4', text: 'inviting', textEs: 'invitando (continuo)', isCorrect: false },
    ],
    explanation: "'My aunt and uncle' is a plural third-person subject (they), so we use the base form 'invite' without -s.",
    explanationEs: "'My aunt and uncle' es un sujeto en plural (ellos), por lo que usamos la forma base 'invite' sin -s.",
  },
  // Test 3
  {
    id: 'pst-3',
    testNumber: 3,
    instructionsEn: 'Choose the correct answer to complete the statement.',
    instructionsEs: 'Elige la respuesta correcta para completar la oración.',
    question: "- Number five is a great ball player. He ________ every ball!\n- He's my brother!",
    questionEs: '- El número cinco es un gran jugador. ¡Atrapa todas las pelotas!\n- ¡Es mi hermano!',
    audioText: "Number five is a great ball player. He catches every ball! He's my brother!",
    options: [
      { id: 'pst3-1', text: 'did catch', textEs: 'atrapó (pasado enfático)', isCorrect: false },
      { id: 'pst3-2', text: 'catches', textEs: 'atrapa (presente simple, -es)', isCorrect: true },
      { id: 'pst3-3', text: 'catch', textEs: 'atrapar (forma base sin -s)', isCorrect: false },
      { id: 'pst3-4', text: 'catching', textEs: 'atrapando (gerundio)', isCorrect: false },
    ],
    explanation: "For verbs ending in -ch (catch) with third-person singular 'He', add -es: 'catches'.",
    explanationEs: "Para los verbos que terminan en -ch (catch) con tercera persona singular 'He', se agrega -es: 'catches'.",
  },
  // Test 4
  {
    id: 'pst-4',
    testNumber: 4,
    instructionsEn: 'Choose the correct answer to complete the statement.',
    instructionsEs: 'Elige la respuesta correcta para completar la oración.',
    question: 'Richie is very smart. He ________ to the teacher in class, but he answers every question on the tests.',
    questionEs: 'Richie es muy inteligente. No escucha al maestro en clase, pero responde todas las preguntas en los exámenes.',
    audioText: 'Richie is very smart. He doesn\'t listen to the teacher in class, but he answers every question on the tests.',
    options: [
      { id: 'pst4-1', text: "doesn't listen", textEs: 'no escucha (negativo presente simple)', isCorrect: true },
      { id: 'pst4-2', text: "don't listen", textEs: 'no escuchan (para I/you/we/they)', isCorrect: false },
      { id: 'pst4-3', text: "didn't listen", textEs: 'no escuchó (tiempo pasado)', isCorrect: false },
      { id: 'pst4-4', text: "isn't listening", textEs: 'no está escuchando (presente continuo)', isCorrect: false },
    ],
    explanation: "In the simple present negative with third-person singular 'He', use 'doesn't' + base verb: 'doesn't listen'.",
    explanationEs: "En el presente simple negativo con tercera persona singular 'He', se usa 'doesn't' + verbo base: 'doesn't listen'.",
  },
  // Test 5
  {
    id: 'pst-5',
    testNumber: 5,
    instructionsEn: 'Choose the correct answer to complete the statement.',
    instructionsEs: 'Elige la respuesta correcta para completar la oración.',
    question: "- Would you like a cookie?\n- No, thank you. ________ .",
    questionEs: '- ¿Te gustaría una galleta?\n- No, gracias. ________ .',
    audioText: "Would you like a cookie? No, thank you. I don't like cookies.",
    options: [
      { id: 'pst5-1', text: 'I am not liking cookies.', textEs: 'No me están gustando las galletas. (incorrecto)', isCorrect: false },
      { id: 'pst5-2', text: 'I not like cookies.', textEs: 'Yo no gustar galletas. (incorrecto)', isCorrect: false },
      { id: 'pst5-3', text: "I don't like cookies.", textEs: 'No me gustan las galletas. (correcto)', isCorrect: true },
      { id: 'pst5-4', text: "I don't liking cookies.", textEs: 'No me gustando galletas. (incorrecto)', isCorrect: false },
    ],
    explanation: "'Like' is a stative verb in the simple present; with subject 'I', we say 'I don't like cookies.'",
    explanationEs: "'Like' es un verbo de estado en presente simple; con el sujeto 'I', decimos 'I don't like cookies.'",
  },
];
