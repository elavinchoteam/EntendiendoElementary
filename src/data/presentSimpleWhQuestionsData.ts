import shoppingWomenImg from '../assets/images/shopping_women_scene_1789251613830.jpg';
import hairSalonImg from '../assets/images/hair_salon_scene_1789251629660.jpg';
import movingCouchImg from '../assets/images/moving_couch_scene_1789251640911.jpg';

export { shoppingWomenImg, hairSalonImg, movingCouchImg };

export interface PresentSimpleWhQuestionsActivityItem {
  id: number;
  actNumber: number; // 1 to 11
  instruction: string;
  instructionEs: string;
  promptLinesEn: string[];
  promptLinesEs: string[];
  blankTargetWords: string[]; // one or multiple blank target words
  options: string[];
  correctAnswer: string[]; // matching blankTargetWords
  explanationEn: string;
  explanationEs: string;
  image?: string;
  fullSentenceEn: string;
  fullSentenceEs: string;
}

export interface PresentSimpleWhQuestionsTestOption {
  id: string;
  text: string;
  textEs: string;
  isCorrect: boolean;
}

export interface PresentSimpleWhQuestionsTestItem {
  id: number;
  testNumber: number; // 1 to 5
  instruction: string;
  instructionEs: string;
  promptLinesEn: string[];
  promptLinesEs: string[];
  blankTargetWords: string[]; // one or multiple blanks
  options: string[];
  correctAnswer: string[];
  explanationEn: string;
  explanationEs: string;
  fullSentenceEn: string;
  fullSentenceEs: string;
}

// Global video reference dialogue
export const PRESENT_SIMPLE_WH_REFERENCE = {
  sentenceEn: "- Where do you buy your clothes?\n- Why do you want to know?",
  sentenceEs: "- ¿Dónde compras tu ropa?\n- ¿Por qué quieres saberlo?",
  line1En: "- Where do you buy your clothes?",
  line1Es: "- ¿Dónde compras tu ropa?",
  line2En: "- Why do you want to know?",
  line2Es: "- ¿Por qué quieres saberlo?",
  highlight1: "Where",
  highlight2: "Why",
  durationSec: 5,
};

// 11 Activities
export const PRESENT_SIMPLE_WH_ACTIVITIES: PresentSimpleWhQuestionsActivityItem[] = [
  // Actividad 1: Video / Grammar Explore Wh- Questions
  {
    id: 1,
    actNumber: 1,
    instruction: "Watch the video and learn how Present Simple Wh- Questions are formed.",
    instructionEs: "Mira el video y aprende cómo se forman las preguntas con Wh- en Presente Simple.",
    promptLinesEn: [
      "- Where do you buy your clothes?",
      "- Why do you want to know?"
    ],
    promptLinesEs: [
      "- ¿Dónde compras tu ropa?",
      "- ¿Por qué quieres saberlo?"
    ],
    blankTargetWords: [],
    options: [],
    correctAnswer: ["Where do you buy your clothes?", "Why do you want to know?"],
    explanationEn: "Wh- Questions in Present Simple: Wh- word (What, Where, When, Why, Who, How) + do/does + subject + base verb.",
    explanationEs: "Preguntas Wh- en Presente Simple: Palabra Wh- (What, Where, When, Why, Who, How) + do/does + sujeto + verbo base.",
    image: shoppingWomenImg,
    fullSentenceEn: "- Where do you buy your clothes? - Why do you want to know?",
    fullSentenceEs: "- ¿Dónde compras tu ropa? - ¿Por qué quieres saberlo?",
  },
  // Actividad 2: "Where do we pay ?"
  {
    id: 2,
    actNumber: 2,
    instruction: "Drag the correct answer/s into place.",
    instructionEs: "Arrastra o haz clic en la respuesta correcta en el espacio.",
    promptLinesEn: [
      "- It's already 4:30. Let's go.",
      "- OK. _____ _____ _____ _____ ?",
      "- Over there."
    ],
    promptLinesEs: [
      "- Ya son las 4:30. Vámonos.",
      "- Está bien. ¿Dónde pagamos?",
      "- Por allí."
    ],
    blankTargetWords: ["_____", "_____", "_____", "_____"],
    options: ["Where", "pay", "do", "we"],
    correctAnswer: ["Where", "do", "we", "pay"],
    explanationEn: "Wh- question structure: Where (Wh-word) + do (auxiliary) + we (subject) + pay (base verb)?",
    explanationEs: "Estructura de preguntas Wh-: Where (palabra de pregunta) + do (auxiliar) + we (sujeto) + pay (verbo base)?",
    fullSentenceEn: "- It's already 4:30. Let's go. - OK. Where do we pay? - Over there.",
    fullSentenceEs: "- Ya son las 4:30. Vámonos. - Está bien. ¿Dónde pagamos? - Por allí.",
  },
  // Actividad 3: "What do you think of this hairstyle?"
  {
    id: 3,
    actNumber: 3,
    instruction: "Drag the correct answer/s into place.",
    instructionEs: "Arrastra o haz clic en la respuesta correcta en el espacio.",
    promptLinesEn: [
      "- What _____ think of this hairstyle?",
      "- Well, it's interesting."
    ],
    promptLinesEs: [
      "- ¿Qué piensas de este peinado?",
      "- Bueno, es interesante."
    ],
    blankTargetWords: ["_____"],
    options: ["you do", "do you", "are you"],
    correctAnswer: ["do you"],
    explanationEn: "After 'What', use auxiliary 'do' followed by subject 'you' and base verb 'think': 'What do you think...?'",
    explanationEs: "Después de 'What', usa el auxiliar 'do' seguido por el sujeto 'you' y el verbo base 'think': 'What do you think...?'",
    image: hairSalonImg,
    fullSentenceEn: "- What do you think of this hairstyle? - Well, it's interesting.",
    fullSentenceEs: "- ¿Qué piensas de este peinado? - Bueno, es interesante.",
  },
  // Actividad 4: "Who stays with Jimmy?"
  {
    id: 4,
    actNumber: 4,
    instruction: "Drag the correct answer/s into place.",
    instructionEs: "Arrastra o haz clic en la respuesta correcta en el espacio.",
    promptLinesEn: [
      "- My new job is difficult. I work late almost every night.",
      "- _____ _____ with Jimmy?",
      "- His father."
    ],
    promptLinesEs: [
      "- Mi nuevo trabajo es difícil. Trabajo hasta tarde casi todas las noches.",
      "- ¿Quién se queda con Jimmy?",
      "- Su padre."
    ],
    blankTargetWords: ["_____", "_____"],
    options: ["stays", "Who", "does", "staying"],
    correctAnswer: ["Who", "stays"],
    explanationEn: "When 'Who' is the subject of the question asking for the person performing the action, we do not use 'does'. We conjugate the verb with -s: 'Who stays with Jimmy?'.",
    explanationEs: "Cuando 'Who' es el sujeto de la pregunta (preguntando quién realiza la acción), no usamos el auxiliar 'does'. Se conjuga el verbo con -s: 'Who stays with Jimmy?'.",
    fullSentenceEn: "- My new job is difficult. I work late almost every night. - Who stays with Jimmy? - His father.",
    fullSentenceEs: "- Mi nuevo trabajo es difícil. Trabajo hasta tarde casi todas las noches. - ¿Quién se queda con Jimmy? - Su padre.",
  },
  // Actividad 5: "Where do you exercise ?"
  {
    id: 5,
    actNumber: 5,
    instruction: "Drag the correct answer/s into place.",
    instructionEs: "Arrastra o haz clic en la respuesta correcta en el espacio.",
    promptLinesEn: [
      "- Barbara, you look great. You're so fit!",
      "- Thanks, Teddy. I get a lot of exercise.",
      "- Where _____ ?",
      "- At the health club on Jackson Street."
    ],
    promptLinesEs: [
      "- Barbara, te ves genial. ¡Estás tan en forma!",
      "- Gracias, Teddy. Hago mucho ejercicio.",
      "- ¿Dónde haces ejercicio?",
      "- En el gimnasio de la calle Jackson."
    ],
    blankTargetWords: ["_____"],
    options: ["is exercise", "do you exercise", "did exercise", "you exercise"],
    correctAnswer: ["do you exercise"],
    explanationEn: "Forming the Wh- question with 'you': Where + do (auxiliary) + you (subject) + exercise (base verb)?",
    explanationEs: "Formando la pregunta Wh- con 'you': Where + do (auxiliar) + you (sujeto) + exercise (verbo base)?",
    fullSentenceEn: "- Barbara, you look great. You're so fit! - Thanks, Teddy. I get a lot of exercise. - Where do you exercise? - At the health club on Jackson Street.",
    fullSentenceEs: "- Barbara, te ves genial. ¡Estás tan en forma! - Gracias, Teddy. Hago mucho ejercicio. - ¿Dónde haces ejercicio? - En el gimnasio de la calle Jackson.",
  },
  // Actividad 6: "Where does he study?"
  {
    id: 6,
    actNumber: 6,
    instruction: "Drag the correct answer/s into place.",
    instructionEs: "Arrastra o haz clic en la respuesta correcta en el espacio.",
    promptLinesEn: [
      "- Who's your new boyfriend?",
      "- His name is Alex. He's a student.",
      "- Really? Where _____",
      "- At Eastern University."
    ],
    promptLinesEs: [
      "- ¿Quién es tu nuevo novio?",
      "- Se llama Alex. Es estudiante.",
      "- ¿En serio? ¿Dónde estudia?",
      "- En la Universidad Eastern."
    ],
    blankTargetWords: ["_____"],
    options: ["did he study?", "he studies", "can he study", "does he study?"],
    correctAnswer: ["does he study?"],
    explanationEn: "With third-person singular 'he', use auxiliary 'does' + base verb 'study': 'Where does he study?'.",
    explanationEs: "Con la tercera persona singular 'he', usa el auxiliar 'does' + verbo base 'study': 'Where does he study?'.",
    fullSentenceEn: "- Who's your new boyfriend? - His name is Alex. He's a student. - Really? Where does he study? - At Eastern University.",
    fullSentenceEs: "- ¿Quién es tu nuevo novio? - Se llama Alex. Es estudiante. - ¿En serio? ¿Dónde estudia? - En la Universidad Eastern.",
  },
  // Actividad 7: "What sport does Monica play?"
  {
    id: 7,
    actNumber: 7,
    instruction: "Drag the correct answer/s into place.",
    instructionEs: "Arrastra o haz clic en la respuesta correcta en el espacio.",
    promptLinesEn: [
      "- What sport _____ play?",
      "- She plays basketball.",
      "- Is she good?",
      "- She's the best!"
    ],
    promptLinesEs: [
      "- ¿Qué deporte juega Monica?",
      "- Ella juega al baloncesto.",
      "- ¿Es buena?",
      "- ¡Es la mejor!"
    ],
    blankTargetWords: ["_____"],
    options: ["did Monica", "is Monica", "Monica", "does Monica"],
    correctAnswer: ["does Monica"],
    explanationEn: "Wh- phrase 'What sport' is followed by auxiliary 'does' + subject 'Monica' + base verb 'play'.",
    explanationEs: "La frase Wh- 'What sport' va seguida del auxiliar 'does' + sujeto 'Monica' + verbo base 'play'.",
    fullSentenceEn: "- What sport does Monica play? - She plays basketball. - Is she good? - She's the best!",
    fullSentenceEs: "- ¿Qué deporte juega Monica? - Ella juega al baloncesto. - ¿Es buena? - ¡Es la mejor!",
  },
  // Actividad 8: "Where do you want this ?"
  {
    id: 8,
    actNumber: 8,
    instruction: "Drag the correct answer/s into place.",
    instructionEs: "Arrastra o haz clic en la respuesta correcta en el espacio.",
    promptLinesEn: [
      "- Where _____ ?",
      "- Over there, near the window, please.",
      "- Sure.",
      "- Thank you."
    ],
    promptLinesEs: [
      "- ¿Dónde quieres esto?",
      "- Por allí, cerca de la ventana, por favor.",
      "- Seguro.",
      "- Gracias."
    ],
    blankTargetWords: ["_____"],
    options: ["is this", "you wanted this", "you want this", "do you want this"],
    correctAnswer: ["do you want this"],
    explanationEn: "Present simple question with subject 'you': Where + do (auxiliary) + you (subject) + want (base verb) + this (object)?",
    explanationEs: "Pregunta en presente simple con el sujeto 'you': Where + do (auxiliar) + you (sujeto) + want (verbo base) + this (objeto)?",
    image: movingCouchImg,
    fullSentenceEn: "- Where do you want this? - Over there, near the window, please. - Sure. - Thank you.",
    fullSentenceEs: "- ¿Dónde quieres esto? - Por allí, cerca de la ventana, por favor. - Seguro. - Gracias.",
  },
  // Actividad 9: "When is the last bus ?"
  {
    id: 9,
    actNumber: 9,
    instruction: "Drag the correct answer/s into place.",
    instructionEs: "Arrastra o haz clic en la respuesta correcta en el espacio.",
    promptLinesEn: [
      "- Excuse me. When _____ ?",
      "- At 12:30 p.m.",
      "- Thank you."
    ],
    promptLinesEs: [
      "- Disculpe. ¿Cuándo es el último autobús?",
      "- A las 12:30 p.m.",
      "- Gracias."
    ],
    blankTargetWords: ["_____"],
    options: ["is the last bus", "does the last bus", "the last bus comes"],
    correctAnswer: ["is the last bus"],
    explanationEn: "With the verb 'to be' (is), we invert subject and verb directly: 'When is the last bus?'. Auxiliary 'do/does' is not used with 'be'.",
    explanationEs: "Con el verbo 'to be' (is), invertimos el sujeto y el verbo directamente: 'When is the last bus?'. No se usa 'do/does' con el verbo 'be'.",
    fullSentenceEn: "- Excuse me. When is the last bus? - At 12:30 p.m. - Thank you.",
    fullSentenceEs: "- Disculpe. ¿Cuándo es el último autobús? - A las 12:30 p.m. - Gracias.",
  },
  // Actividad 10: "How do you spell your last name?"
  {
    id: 10,
    actNumber: 10,
    instruction: "Drag the correct answer/s into place.",
    instructionEs: "Arrastra o haz clic en la respuesta correcta en el espacio.",
    promptLinesEn: [
      "- _____ _____ _____ _____ your last name?",
      "- It's Janssen. J-A-N-S-S-E-N."
    ],
    promptLinesEs: [
      "- ¿Cómo deletreas tu apellido?",
      "- Es Janssen. J-A-N-S-S-E-N."
    ],
    blankTargetWords: ["_____", "_____", "_____", "_____"],
    options: ["you", "spell", "How", "do"],
    correctAnswer: ["How", "do", "you", "spell"],
    explanationEn: "Wh- question structure: How (question word) + do (auxiliary) + you (subject) + spell (base verb)?",
    explanationEs: "Estructura de pregunta Wh-: How (palabra de pregunta) + do (auxiliar) + you (sujeto) + spell (verbo base)?",
    fullSentenceEn: "- How do you spell your last name? - It's Janssen. J-A-N-S-S-E-N.",
    fullSentenceEs: "- ¿Cómo deletreas tu apellido? - Es Janssen. J-A-N-S-S-E-N.",
  },
  // Actividad 11: "Why do you practice English every evening?"
  {
    id: 11,
    actNumber: 11,
    instruction: "Drag the correct answer/s into place.",
    instructionEs: "Arrastra o haz clic en la respuesta correcta en el espacio.",
    promptLinesEn: [
      "- Why _____ English every evening?",
      "- Because I want to work in an international company."
    ],
    promptLinesEs: [
      "- ¿Por qué practicas inglés todas las tardes?",
      "- Porque quiero trabajar en una empresa internacional."
    ],
    blankTargetWords: ["_____"],
    options: ["you practice", "do you practice", "did you practice", "are practicing"],
    correctAnswer: ["do you practice"],
    explanationEn: "Asking about regular habits with 'Why': Why + do (auxiliary) + you (subject) + practice (base verb)?",
    explanationEs: "Para preguntar por hábitos con 'Why': Why + do (auxiliar) + you (sujeto) + practice (verbo base)?",
    fullSentenceEn: "- Why do you practice English every evening? - Because I want to work in an international company.",
    fullSentenceEs: "- ¿Por qué practicas inglés todas las tardes? - Porque quiero trabajar en una empresa internacional.",
  },
];

// Actividad 12: Test (5 Tests)
export const PRESENT_SIMPLE_WH_TESTS: PresentSimpleWhQuestionsTestItem[] = [
  // Test 1: "Where does Jane buy her clothes? She always looks great!"
  {
    id: 1,
    testNumber: 1,
    instruction: "Drag the correct answer/s into place.",
    instructionEs: "Arrastra o haz clic en la respuesta correcta en el espacio.",
    promptLinesEn: [
      "_____ _____ _____ _____ her clothes? She always looks great!"
    ],
    promptLinesEs: [
      "¿Dónde compra Jane su ropa? ¡Siempre se ve genial!"
    ],
    blankTargetWords: ["_____", "_____", "_____", "_____"],
    options: ["buy", "Jane", "Where", "does"],
    correctAnswer: ["Where", "does", "Jane", "buy"],
    explanationEn: "Wh- question with singular subject 'Jane': Where + does + Jane + buy + her clothes?",
    explanationEs: "Pregunta Wh- con sujeto singular 'Jane': Where + does + Jane + buy + her clothes?",
    fullSentenceEn: "Where does Jane buy her clothes? She always looks great!",
    fullSentenceEs: "¿Dónde compra Jane su ropa? ¡Siempre se ve genial!",
  },
  // Test 2: "When do you finish work?"
  {
    id: 2,
    testNumber: 2,
    instruction: "Drag the correct answer/s into place.",
    instructionEs: "Arrastra o haz clic en la respuesta correcta en el espacio.",
    promptLinesEn: [
      "- Hi, Jill. Do you want to have dinner at Pierre's tonight?",
      "- Sure.",
      "- Great. When _____ work?"
    ],
    promptLinesEs: [
      "- Hola, Jill. ¿Quieres cenar en Pierre's esta noche?",
      "- Seguro.",
      "- Genial. ¿Cuándo terminas de trabajar?"
    ],
    blankTargetWords: ["_____"],
    options: ["did you finish", "are you finished", "do you finish", "are you finishing"],
    correctAnswer: ["do you finish"],
    explanationEn: "Present Simple question about daily routine with 'you': When + do + you + finish?",
    explanationEs: "Pregunta en Presente Simple sobre rutina diaria con 'you': When + do + you + finish?",
    fullSentenceEn: "- Hi, Jill. Do you want to have dinner at Pierre's tonight? - Sure. - Great. When do you finish work?",
    fullSentenceEs: "- Hola, Jill. ¿Quieres cenar en Pierre's esta noche? - Seguro. - Genial. ¿Cuándo terminas de trabajar?",
  },
  // Test 3: "What do you sell ?"
  {
    id: 3,
    testNumber: 3,
    instruction: "Drag the correct answer/s into place.",
    instructionEs: "Arrastra o haz clic en la respuesta correcta en el espacio.",
    promptLinesEn: [
      "- Hey, Bob, I got a new job. I'm a salesman.",
      "- That's great. What _____ ?",
      "- Cars."
    ],
    promptLinesEs: [
      "- Oye, Bob, conseguí un nuevo trabajo. Soy vendedor.",
      "- Eso es genial. ¿Qué vendes?",
      "- Autos."
    ],
    blankTargetWords: ["_____"],
    options: ["do you sell", "you sell", "sell you"],
    correctAnswer: ["do you sell"],
    explanationEn: "Present Simple Wh- question: What + do (auxiliary) + you (subject) + sell (base verb)?",
    explanationEs: "Pregunta Wh- en Presente Simple: What + do (auxiliar) + you (sujeto) + sell (verbo base)?",
    fullSentenceEn: "- Hey, Bob, I got a new job. I'm a salesman. - That's great. What do you sell? - Cars.",
    fullSentenceEs: "- Oye, Bob, conseguí un nuevo trabajo. Soy vendedor. - Eso es genial. ¿Qué vendes? - Autos.",
  },
  // Test 4: "Who lives in that house on Broadway? Many tourists take pictures of it."
  {
    id: 4,
    testNumber: 4,
    instruction: "Drag the correct answer/s into place.",
    instructionEs: "Arrastra o haz clic en la respuesta correcta en el espacio.",
    promptLinesEn: [
      "- _____ _____ in that house on Broadway? Many tourists take pictures of it.",
      "- Oh, that's Mick Starlight's house."
    ],
    promptLinesEs: [
      "- ¿Quién vive en esa casa de Broadway? Muchos turistas le toman fotos.",
      "- Ah, esa es la casa de Mick Starlight."
    ],
    blankTargetWords: ["_____", "_____"],
    options: ["does", "living", "did", "Who", "lives"],
    correctAnswer: ["Who", "lives"],
    explanationEn: "Subject question with 'Who': When 'Who' asks for the subject, do not use auxiliary 'does'. Use the 3rd person singular verb: 'Who lives...'.",
    explanationEs: "Pregunta de sujeto con 'Who': Cuando 'Who' pregunta por el sujeto, no se usa el auxiliar 'does'. Se conjuga en tercera persona singular: 'Who lives...'.",
    fullSentenceEn: "- Who lives in that house on Broadway? Many tourists take pictures of it. - Oh, that's Mick Starlight's house.",
    fullSentenceEs: "- ¿Quién vive en esa casa de Broadway? Muchos turistas le toman fotos. - Ah, esa es la casa de Mick Starlight.",
  },
  // Test 5: "Why do you weigh your food all the time?"
  {
    id: 5,
    testNumber: 5,
    instruction: "Drag the correct answer/s into place.",
    instructionEs: "Arrastra o haz clic en la respuesta correcta en el espacio.",
    promptLinesEn: [
      "- Why _____ your food all the time?",
      "- Because I'm on a diet."
    ],
    promptLinesEs: [
      "- ¿Por qué pesas tu comida todo el tiempo?",
      "- Porque estoy a dieta."
    ],
    blankTargetWords: ["_____"],
    options: ["you weigh", "is weighed", "do you weigh", "can you weigh"],
    correctAnswer: ["do you weigh"],
    explanationEn: "Wh- question with 'Why': Why + do (auxiliary) + you (subject) + weigh (base verb)?",
    explanationEs: "Pregunta Wh- con 'Why': Why + do (auxiliar) + you (sujeto) + weigh (verbo base)?",
    fullSentenceEn: "- Why do you weigh your food all the time? - Because I'm on a diet.",
    fullSentenceEs: "- ¿Por qué pesas tu comida todo el tiempo? - Porque estoy a dieta.",
  },
];
