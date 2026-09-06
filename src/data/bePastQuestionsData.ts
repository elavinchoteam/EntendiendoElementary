import {
  LessonText,
  LessonSentence,
  DialogueLine,
  Flashcard,
  GrammarRule,
  DragDropSentenceExercise,
  UnitTestExercise,
} from '../types';
import bePastQuestionsImg from '../assets/images/be_past_questions_1788717770290.jpg';

export { bePastQuestionsImg };

export const BE_PAST_QUESTIONS_SENTENCES: LessonSentence[] = [
  {
    en: 'Where were you and Susan last night?',
    es: '¿Dónde estuvieron Susan y tú anoche?',
  },
  {
    en: 'Oh, we were out.',
    es: 'Oh, salimos (estuvimos fuera).',
  },
  {
    en: 'Were you at the new French restaurant?',
    es: '¿Estuvieron en el nuevo restaurante francés?',
  },
  {
    en: "No, we weren't. Susan was at night school and I was at the office.",
    es: 'No, no estuvimos. Susan estuvo en la escuela nocturna y yo estuve en la oficina.',
  },
];

export const BE_PAST_QUESTIONS_DIALOGUE: DialogueLine[] = [
  {
    speaker: 'Man 1',
    textEn: 'Where were you and Susan last night?',
    textEs: '¿Dónde estuvieron Susan y tú anoche?',
    avatarColor: 'bg-amber-600',
  },
  {
    speaker: 'Man 2',
    textEn: 'Oh, we were out.',
    textEs: 'Oh, salimos (estuvimos fuera).',
    avatarColor: 'bg-blue-600',
  },
  {
    speaker: 'Man 1',
    textEn: 'Were you at the new French restaurant?',
    textEs: '¿Estuvieron en el nuevo restaurante francés?',
    avatarColor: 'bg-amber-600',
  },
  {
    speaker: 'Man 2',
    textEn: "No, we weren't. Susan was at night school and I was at the office.",
    textEs: 'No, no estuvimos. Susan estuvo en la escuela nocturna y yo estuve en la oficina.',
    avatarColor: 'bg-blue-600',
  },
];

export const BE_PAST_QUESTIONS_REFERENCE_SENTENCE =
  "- Where were you and Susan last night?\n- Oh, we were out.\n- Were you at the new French restaurant?\n- No, we weren't. Susan was at night school and I was at the office.";

export const BE_PAST_QUESTIONS_REFERENCE_SENTENCE_ES =
  "- ¿Dónde estuvieron Susan y tú anoche?\n- Oh, salimos.\n- ¿Estuvieron en el nuevo restaurante francés?\n- No, no estuvimos. Susan estuvo en la escuela nocturna y yo estuve en la oficina.";

export const BE_PAST_QUESTIONS_HIGHLIGHTS = ['Where', 'were', 'Were', "weren't", 'was'];

export const BE_PAST_QUESTIONS_LESSON_TEXT: LessonText = {
  title: 'Lesson 5: Be-Past: Questions',
  stepTitle: 'Step 1: Explore',
  audioText:
    "Where were you and Susan last night? Oh, we were out. Were you at the new French restaurant? No, we weren't. Susan was at night school and I was at the office.",
  textEn:
    "- Where were you and Susan last night?\n- Oh, we were out.\n- Were you at the new French restaurant?\n- No, we weren't. Susan was at night school and I was at the office.",
  textEs:
    "- ¿Dónde estuvieron Susan y tú anoche?\n- Oh, salimos.\n- ¿Estuvieron en el nuevo restaurante francés?\n- No, no estuvimos. Susan estuvo en la escuela nocturna y yo estuve en la oficina.",
  imageSrc: bePastQuestionsImg,
  durationSeconds: 10,
  sentences: BE_PAST_QUESTIONS_SENTENCES,
  practiceInstructions: 'Lee y escucha el diálogo sobre preguntas en pasado con Be (Was / Were).',
};

export const BE_PAST_QUESTIONS_EXERCISES: (DragDropSentenceExercise | UnitTestExercise)[] = [
  /* Actividad 2 (actividad 2.png) */
  {
    id: 'be-past-q-ex-2',
    type: 'drag-drop-sentence',
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    audioPrompt: '- Were you at the meeting this morning? - Yes, I was. - I didn\'t see you.',
    durationSeconds: 10,
    imageUrl: bePastQuestionsImg,
    referenceText: BE_PAST_QUESTIONS_REFERENCE_SENTENCE,
    referenceTextEs: BE_PAST_QUESTIONS_REFERENCE_SENTENCE_ES,
    referenceHighlights: BE_PAST_QUESTIONS_HIGHLIGHTS,
    dialogueLines: [
      {
        textEn: '- ________ at the meeting this morning?',
        textEs: '- ¿Estuviste en la reunión esta mañana?',
        hasBlank: true,
        prefix: '- ',
        prefixEs: '- ¿',
        suffix: ' at the meeting this morning?',
        suffixEs: ' en la reunión esta mañana?',
      },
      {
        textEn: '- Yes, I was.',
        textEs: '- Sí, estuve.',
        hasBlank: false,
      },
      {
        textEn: "- I didn't see you.",
        textEs: '- No te vi.',
        hasBlank: false,
      },
    ],
    options: [
      { id: 'opt-q2-youwere', text: 'You were', isCorrect: false },
      { id: 'opt-q2-was', text: 'Was', isCorrect: false },
      { id: 'opt-q2-wereyou', text: 'Were you', isCorrect: true },
      { id: 'opt-q2-you', text: 'You', isCorrect: false },
    ],
    correctAnswerId: 'opt-q2-wereyou',
    explanation: "In questions with 'you' in the past simple, invert verb and subject: 'Were you at the meeting this morning?'.",
    explanationEs: "En preguntas con 'you' en pasado simple, se invierte el orden del verbo y sujeto: 'Were you at the meeting this morning?' (¿Estuviste en la reunión esta mañana?).",
  },

  /* Actividad 3 (actividad 3.png) */
  {
    id: 'be-past-q-ex-3',
    type: 'drag-drop-sentence',
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    audioPrompt: '- I went to Alaska on a business trip last month. - Was it cold?',
    durationSeconds: 10,
    imageUrl: bePastQuestionsImg,
    referenceText: BE_PAST_QUESTIONS_REFERENCE_SENTENCE,
    referenceTextEs: BE_PAST_QUESTIONS_REFERENCE_SENTENCE_ES,
    referenceHighlights: BE_PAST_QUESTIONS_HIGHLIGHTS,
    dialogueLines: [
      {
        textEn: '- I went to Alaska on a business trip last month.',
        textEs: '- Fui a Alaska en un viaje de negocios el mes pasado.',
        hasBlank: false,
      },
      {
        textEn: '- ________',
        textEs: '- ¿Hacía frío?',
        hasBlank: true,
        prefix: '- ',
        prefixEs: '- ¿',
        suffix: '',
        suffixEs: '',
      },
    ],
    options: [
      { id: 'opt-q3-wasit', text: 'Was it cold?', isCorrect: true },
      { id: 'opt-q3-werethey', text: 'Were they cold?', isCorrect: false },
    ],
    correctAnswerId: 'opt-q3-wasit',
    explanation: "Weather and singular places/situations use the pronoun 'it', so we ask 'Was it cold?'.",
    explanationEs: "Para referirse al clima o a una situación singular impersonal se utiliza 'it', por lo que la pregunta correcta es 'Was it cold?' (¿Hacía frío?).",
  },

  /* Actividad 4 (actividad 4.png) */
  {
    id: 'be-past-q-ex-4',
    type: 'drag-drop-sentence',
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    audioPrompt: '- Was the airport crowded? - Yes, it was. There were thousands of people there.',
    durationSeconds: 10,
    imageUrl: bePastQuestionsImg,
    referenceText: BE_PAST_QUESTIONS_REFERENCE_SENTENCE,
    referenceTextEs: BE_PAST_QUESTIONS_REFERENCE_SENTENCE_ES,
    referenceHighlights: BE_PAST_QUESTIONS_HIGHLIGHTS,
    dialogueLines: [
      {
        textEn: '- ________ ?',
        textEs: '- ¿Estaba lleno el aeropuerto?',
        hasBlank: true,
        prefix: '- ',
        prefixEs: '- ¿',
        suffix: ' ?',
        suffixEs: ' ?',
      },
      {
        textEn: '- Yes, it was. There were thousands of people there.',
        textEs: '- Sí, lo estaba. Había miles de personas allí.',
        hasBlank: false,
      },
    ],
    options: [
      { id: 'opt-q4-theairport', text: 'The airport was crowded', isCorrect: false },
      { id: 'opt-q4-wasthe', text: 'Was the airport crowded', isCorrect: true },
    ],
    correctAnswerId: 'opt-q4-wasthe',
    explanation: "In English questions, the verb 'Was' comes before the singular noun phrase 'the airport': 'Was the airport crowded?'.",
    explanationEs: "En preguntas, el verbo 'Was' precede al sujeto 'the airport': 'Was the airport crowded?' (¿Estaba lleno el aeropuerto?).",
  },

  /* Actividad 5 (actividad 5.png) */
  {
    id: 'be-past-q-ex-5',
    type: 'drag-drop-sentence',
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    audioPrompt: '- When did you come home last night? - At 3:30 A.M. Were you worried about me?',
    durationSeconds: 10,
    imageUrl: bePastQuestionsImg,
    referenceText: BE_PAST_QUESTIONS_REFERENCE_SENTENCE,
    referenceTextEs: BE_PAST_QUESTIONS_REFERENCE_SENTENCE_ES,
    referenceHighlights: BE_PAST_QUESTIONS_HIGHLIGHTS,
    dialogueLines: [
      {
        textEn: '- When did you come home last night?',
        textEs: '- ¿A qué hora regresaste a casa anoche?',
        hasBlank: false,
      },
      {
        textEn: '- At 3:30 A.M. ________ worried about me?',
        textEs: '- A las 3:30 A.M. ¿Estabas preocupado por mí?',
        hasBlank: true,
        prefix: '- At 3:30 A.M. ',
        prefixEs: '- A las 3:30 A.M. ¿',
        suffix: ' worried about me?',
        suffixEs: ' preocupado por mí?',
      },
    ],
    options: [
      { id: 'opt-q5-youwere', text: 'You were', isCorrect: false },
      { id: 'opt-q5-itwas', text: 'It was', isCorrect: false },
      { id: 'opt-q5-wereyou', text: 'Were you', isCorrect: true },
    ],
    correctAnswerId: 'opt-q5-wereyou',
    explanation: "For a question addressed to 'you' in past tense: 'Were you worried about me?'.",
    explanationEs: "Para una pregunta dirigida a 'you' en tiempo pasado: 'Were you worried about me?' (¿Estabas preocupado por mí?).",
  },

  /* Actividad 6 (actividad 6.png) */
  {
    id: 'be-past-q-ex-6',
    type: 'drag-drop-sentence',
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    audioPrompt: "- My aunt is traveling around the world. - Wasn't she sick last month? - Yes, she was. But now she's fine.",
    durationSeconds: 10,
    imageUrl: bePastQuestionsImg,
    referenceText: BE_PAST_QUESTIONS_REFERENCE_SENTENCE,
    referenceTextEs: BE_PAST_QUESTIONS_REFERENCE_SENTENCE_ES,
    referenceHighlights: BE_PAST_QUESTIONS_HIGHLIGHTS,
    dialogueLines: [
      {
        textEn: '- My aunt is traveling around the world.',
        textEs: '- Mi tía está viajando por todo el mundo.',
        hasBlank: false,
      },
      {
        textEn: '- ________ last month?',
        textEs: '- ¿No estaba enferma el mes pasado?',
        hasBlank: true,
        prefix: '- ',
        prefixEs: '- ¿',
        suffix: ' last month?',
        suffixEs: ' el mes pasado?',
      },
      {
        textEn: "- Yes, she was. But now she's fine.",
        textEs: '- Sí, lo estaba. Pero ahora está bien.',
        hasBlank: false,
      },
    ],
    options: [
      { id: 'opt-q6-isnt', text: "Isn't she sick", isCorrect: false },
      { id: 'opt-q6-wasnt', text: "Wasn't she sick", isCorrect: true },
      { id: 'opt-q6-shesnot', text: "She's not sick", isCorrect: false },
      { id: 'opt-q6-shewasnt', text: "She wasn't sick", isCorrect: false },
    ],
    correctAnswerId: 'opt-q6-wasnt',
    explanation: "Negative past questions expressing surprise/confirmation start with 'Wasn't she sick' ('Wasn't she sick last month?').",
    explanationEs: "Las preguntas negativas en pasado para confirmar una sospecha o sorpresa inician con 'Wasn't she sick' (¿No estaba ella enferma el mes pasado?).",
  },

  /* Actividad 7 (actividad 7.png) */
  {
    id: 'be-past-q-ex-7',
    type: 'drag-drop-sentence',
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    audioPrompt: "- What was that noise in the street? - I don't know. Let's find out.",
    durationSeconds: 10,
    imageUrl: bePastQuestionsImg,
    referenceText: BE_PAST_QUESTIONS_REFERENCE_SENTENCE,
    referenceTextEs: BE_PAST_QUESTIONS_REFERENCE_SENTENCE_ES,
    referenceHighlights: BE_PAST_QUESTIONS_HIGHLIGHTS,
    dialogueLines: [
      {
        textEn: '- ________ that noise in the street?',
        textEs: '- ¿Qué fue ese ruido en la calle?',
        hasBlank: true,
        prefix: '- ',
        prefixEs: '- ¿',
        suffix: ' that noise in the street?',
        suffixEs: ' ese ruido en la calle?',
      },
      {
        textEn: "- I don't know. Let's find out.",
        textEs: '- No lo sé. Averigüémoslo.',
        hasBlank: false,
      },
    ],
    options: [
      { id: 'opt-q7-wasthat', text: 'Was that', isCorrect: false },
      { id: 'opt-q7-whatwas', text: 'What was', isCorrect: true },
      { id: 'opt-q7-whenwas', text: 'When was', isCorrect: false },
      { id: 'opt-q7-whywas', text: 'Why was', isCorrect: false },
    ],
    correctAnswerId: 'opt-q7-whatwas',
    explanation: "'What was' asks to identify a thing or sound ('What was that noise in the street?').",
    explanationEs: "'What was' (¿Qué fue / qué era?) indaga sobre la identidad del sonido: 'What was that noise in the street?'.",
  },

  /* Actividad 8 (actividad 8.png) */
  {
    id: 'be-past-q-ex-8',
    type: 'drag-drop-sentence',
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    audioPrompt: '- I found my notebook. - Where was it? - It was under the desk.',
    durationSeconds: 10,
    imageUrl: bePastQuestionsImg,
    referenceText: BE_PAST_QUESTIONS_REFERENCE_SENTENCE,
    referenceTextEs: BE_PAST_QUESTIONS_REFERENCE_SENTENCE_ES,
    referenceHighlights: BE_PAST_QUESTIONS_HIGHLIGHTS,
    dialogueLines: [
      {
        textEn: '- I found my notebook.',
        textEs: '- Encontré mi cuaderno.',
        hasBlank: false,
      },
      {
        textEn: '- ________',
        textEs: '- ¿Dónde estaba?',
        hasBlank: true,
        prefix: '- ',
        prefixEs: '- ¿',
        suffix: '',
        suffixEs: '',
      },
      {
        textEn: '- It was under the desk.',
        textEs: '- Estaba debajo del escritorio.',
        hasBlank: false,
      },
    ],
    options: [
      { id: 'opt-q8-whowas', text: 'Who was it?', isCorrect: false },
      { id: 'opt-q8-whenwas', text: 'When was it?', isCorrect: false },
      { id: 'opt-q8-wherewas', text: 'Where was it?', isCorrect: true },
    ],
    correctAnswerId: 'opt-q8-wherewas',
    explanation: "The response specifies a location ('under the desk'), so the question asks 'Where was it?'.",
    explanationEs: "Como la respuesta indica una ubicación ('debajo del escritorio'), la pregunta debe ser 'Where was it?' (¿Dónde estaba?).",
  },

  /* Actividad 9 (actividad 9.png) */
  {
    id: 'be-past-q-ex-9',
    type: 'drag-drop-sentence',
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    audioPrompt: '- Did you see the Sherlock Holmes movie on TV? - No, I didn\'t. When was it on? - At 10:30 last night.',
    durationSeconds: 10,
    imageUrl: bePastQuestionsImg,
    referenceText: BE_PAST_QUESTIONS_REFERENCE_SENTENCE,
    referenceTextEs: BE_PAST_QUESTIONS_REFERENCE_SENTENCE_ES,
    referenceHighlights: BE_PAST_QUESTIONS_HIGHLIGHTS,
    dialogueLines: [
      {
        textEn: '- Did you see the Sherlock Holmes movie on TV?',
        textEs: '- ¿Viste la película de Sherlock Holmes en la televisión?',
        hasBlank: false,
      },
      {
        textEn: "- No, I didn't. ________ it on?",
        textEs: '- No, no la vi. ¿Cuándo la transmitieron?',
        hasBlank: true,
        prefix: "- No, I didn't. ",
        prefixEs: '- No, no la vi. ¿',
        suffix: ' it on?',
        suffixEs: ' transmitida?',
      },
      {
        textEn: '- At 10:30 last night.',
        textEs: '- A las 10:30 anoche.',
        hasBlank: false,
      },
    ],
    options: [
      { id: 'opt-q9-wherewas', text: 'Where was', isCorrect: false },
      { id: 'opt-q9-whenwas', text: 'When was', isCorrect: true },
      { id: 'opt-q9-whatwas', text: 'What was', isCorrect: false },
      { id: 'opt-q9-wasiton', text: 'Was it on', isCorrect: false },
    ],
    correctAnswerId: 'opt-q9-whenwas',
    explanation: "The answer gives a specific time ('At 10:30 last night'), so we ask 'When was it on?'.",
    explanationEs: "La respuesta indica la hora ('A las 10:30 anoche'), de modo que la pregunta de tiempo es 'When was it on?' (¿Cuándo la pasaron?).",
  },

  /* Actividad 10 (actividad 10.png) */
  {
    id: 'be-past-q-ex-10',
    type: 'drag-drop-sentence',
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    audioPrompt: '- Did you find the children? - Yes, I did. - Where were they? - In the garage with their cousin.',
    durationSeconds: 10,
    imageUrl: bePastQuestionsImg,
    referenceText: BE_PAST_QUESTIONS_REFERENCE_SENTENCE,
    referenceTextEs: BE_PAST_QUESTIONS_REFERENCE_SENTENCE_ES,
    referenceHighlights: BE_PAST_QUESTIONS_HIGHLIGHTS,
    dialogueLines: [
      {
        textEn: '- Did you find the children?',
        textEs: '- ¿Encontraste a los niños?',
        hasBlank: false,
      },
      {
        textEn: '- Yes, I did.',
        textEs: '- Sí, los encontré.',
        hasBlank: false,
      },
      {
        textEn: '- ________ they?',
        textEs: '- ¿Dónde estaban ellos?',
        hasBlank: true,
        prefix: '- ',
        prefixEs: '- ¿',
        suffix: ' they?',
        suffixEs: ' ellos?',
      },
      {
        textEn: '- In the garage with their cousin.',
        textEs: '- En el garaje con su primo.',
        hasBlank: false,
      },
    ],
    options: [
      { id: 'opt-q10-howwere', text: 'How were', isCorrect: false },
      { id: 'opt-q10-were', text: 'Were', isCorrect: false },
      { id: 'opt-q10-wherewere', text: 'Where were', isCorrect: true },
      { id: 'opt-q10-whowere', text: 'Who were', isCorrect: false },
    ],
    correctAnswerId: 'opt-q10-wherewere',
    explanation: "The response is a location ('In the garage...'), so we ask 'Where were they?'.",
    explanationEs: "La respuesta es un lugar ('En el garaje con su primo'), por lo tanto se pregunta 'Where were they?' (¿Dónde estaban?).",
  },

  /* Actividad 11 (actividad 11.png) */
  {
    id: 'be-past-q-ex-11',
    type: 'drag-drop-sentence',
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    audioPrompt: "- Boris left his job. - What was the reason? - He didn't like his boss.",
    durationSeconds: 10,
    imageUrl: bePastQuestionsImg,
    referenceText: BE_PAST_QUESTIONS_REFERENCE_SENTENCE,
    referenceTextEs: BE_PAST_QUESTIONS_REFERENCE_SENTENCE_ES,
    referenceHighlights: BE_PAST_QUESTIONS_HIGHLIGHTS,
    dialogueLines: [
      {
        textEn: '- Boris left his job.',
        textEs: '- Boris dejó su trabajo.',
        hasBlank: false,
      },
      {
        textEn: '- ________ the reason?',
        textEs: '- ¿Cuál fue la razón?',
        hasBlank: true,
        prefix: '- ',
        prefixEs: '- ¿',
        suffix: ' the reason?',
        suffixEs: ' la razón?',
      },
      {
        textEn: "- He didn't like his boss.",
        textEs: '- No le agradaba su jefe.',
        hasBlank: false,
      },
    ],
    options: [
      { id: 'opt-q11-whenwas', text: 'When was', isCorrect: false },
      { id: 'opt-q11-whywas', text: 'Why was', isCorrect: false },
      { id: 'opt-q11-whatwas', text: 'What was', isCorrect: true },
      { id: 'opt-q11-howwas', text: 'How was', isCorrect: false },
    ],
    correctAnswerId: 'opt-q11-whatwas',
    explanation: "We ask 'What was the reason?' when asking for a noun phrase ('the reason'). Note: 'Why' is used alone ('Why did he leave?'), but with 'the reason' we say 'What was the reason?'.",
    explanationEs: "Se pregunta 'What was the reason?' (¿Cuál fue la razón?). 'Why' no se combina directamente con 'the reason' de esa manera ('What was the reason?' es la estructura correcta en inglés).",
  },

  /* Actividad 12: Unit Test (5 Tests) */
  {
    id: 'be-past-q-unit-test',
    type: 'unit-test',
    title: 'Unit 1 · Section 5 Test: Be-Past: Questions',
    titleEs: 'Unidad 1 · Test de la Sección 5: Be-Past: Questions',
    subtitle: '5 Questions · Complete Mastery Test',
    subtitleEs: '5 Preguntas · Test Completo de Evaluación',
    description: 'Demuestra tu dominio formando y reconociendo preguntas en pasado con Be (Was / Were).',
    descriptionEs: 'Demuestra tu dominio formando y reconociendo preguntas en pasado con Be (Was / Were).',
    totalQuestions: 5,
    imageUrl: bePastQuestionsImg,
    referenceText: BE_PAST_QUESTIONS_REFERENCE_SENTENCE,
    referenceTextEs: BE_PAST_QUESTIONS_REFERENCE_SENTENCE_ES,
    referenceHighlights: BE_PAST_QUESTIONS_HIGHLIGHTS,
    questions: [
      /* Test 1 (test 1.png) */
      {
        id: 'be-past-q-test-1',
        number: 1,
        type: 'drag-drop',
        instructions: 'Drag the correct answer/s into place.',
        instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
        question: '- ________ the name of that terrible movie? - I think it was "The Cow and the Artist."',
        questionEs: '- ¿Cuál era el nombre de esa terrible película? - Creo que era "La vaca y el artista".',
        audioPrompt: '- What was the name of that terrible movie? - I think it was "The Cow and the Artist."',
        durationSeconds: 10,
        imageUrl: bePastQuestionsImg,
        referenceText: BE_PAST_QUESTIONS_REFERENCE_SENTENCE,
        referenceTextEs: BE_PAST_QUESTIONS_REFERENCE_SENTENCE_ES,
        referenceHighlights: BE_PAST_QUESTIONS_HIGHLIGHTS,
        dialogueLines: [
          {
            textEn: '- ________ the name of that terrible movie?',
            textEs: '- ¿Cuál era el nombre de esa terrible película?',
            hasBlank: true,
            prefix: '- ',
            prefixEs: '- ¿',
            suffix: ' the name of that terrible movie?',
            suffixEs: ' el nombre de esa terrible película?',
          },
          {
            textEn: '- I think it was "The Cow and the Artist."',
            textEs: '- Creo que era "La vaca y el artista".',
            hasBlank: false,
          },
        ],
        options: [
          { id: 'opt-t1-whowas', text: 'Who was', isCorrect: false },
          { id: 'opt-t1-whenwas', text: 'When was', isCorrect: false },
          { id: 'opt-t1-wasthe', text: 'Was the', isCorrect: false },
          { id: 'opt-t1-whatwas', text: 'What was', isCorrect: true },
        ],
        correctAnswerId: 'opt-t1-whatwas',
        explanation: "'What was the name...?' asks for the title/name of an inanimate object (the movie).",
        explanationEs: "'What was the name...?' (¿Cuál era el nombre...?) se utiliza para indagar sobre el título o denominación de una película.",
      },

      /* Test 2 (test 2.png) */
      {
        id: 'be-past-q-test-2',
        number: 2,
        type: 'drag-drop',
        instructions: 'Drag the correct answer/s into place.',
        instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
        question: '- ________ the actor in that movie? I really liked him. - I think that was Stan Heman.',
        questionEs: '- ¿Quién era el actor en esa película? Me gustó mucho. - Creo que era Stan Heman.',
        audioPrompt: '- Who was the actor in that movie? I really liked him. - I think that was Stan Heman.',
        durationSeconds: 10,
        imageUrl: bePastQuestionsImg,
        referenceText: BE_PAST_QUESTIONS_REFERENCE_SENTENCE,
        referenceTextEs: BE_PAST_QUESTIONS_REFERENCE_SENTENCE_ES,
        referenceHighlights: BE_PAST_QUESTIONS_HIGHLIGHTS,
        dialogueLines: [
          {
            textEn: '- ________ the actor in that movie? I really liked him.',
            textEs: '- ¿Quién era el actor en esa película? Me gustó mucho.',
            hasBlank: true,
            prefix: '- ',
            prefixEs: '- ¿',
            suffix: ' the actor in that movie? I really liked him.',
            suffixEs: ' el actor en esa película? Me gustó mucho.',
          },
          {
            textEn: '- I think that was Stan Heman.',
            textEs: '- Creo que era Stan Heman.',
            hasBlank: false,
          },
        ],
        options: [
          { id: 'opt-t2-whenwas', text: 'When was', isCorrect: false },
          { id: 'opt-t2-whowas', text: 'Who was', isCorrect: true },
          { id: 'opt-t2-wherewas', text: 'Where was', isCorrect: false },
          { id: 'opt-t2-wasthe', text: 'Was the', isCorrect: false },
        ],
        correctAnswerId: 'opt-t2-whowas',
        explanation: "'Who was' asks for the identity of a person ('the actor').",
        explanationEs: "'Who was' (¿Quién era?) se usa para preguntar por una persona ('el actor').",
      },

      /* Test 3 (test 3.png) */
      {
        id: 'be-past-q-test-3',
        number: 3,
        type: 'drag-drop',
        instructions: 'Drag the correct answer/s into place.',
        instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
        question: '- Nicole got a car for her birthday. - Really? ________ her birthday? - Last Tuesday.',
        questionEs: '- Nicole recibió un auto por su cumpleaños. - ¿De verdad? ¿Cuándo fue su cumpleaños? - El martes pasado.',
        audioPrompt: '- Nicole got a car for her birthday. - Really? When was her birthday? - Last Tuesday.',
        durationSeconds: 10,
        imageUrl: bePastQuestionsImg,
        referenceText: BE_PAST_QUESTIONS_REFERENCE_SENTENCE,
        referenceTextEs: BE_PAST_QUESTIONS_REFERENCE_SENTENCE_ES,
        referenceHighlights: BE_PAST_QUESTIONS_HIGHLIGHTS,
        dialogueLines: [
          {
            textEn: '- Nicole got a car for her birthday.',
            textEs: '- Nicole recibió un auto por su cumpleaños.',
            hasBlank: false,
          },
          {
            textEn: '- Really? ________ her birthday?',
            textEs: '- ¿De verdad? ¿Cuándo fue su cumpleaños?',
            hasBlank: true,
            prefix: '- Really? ',
            prefixEs: '- ¿De verdad? ¿',
            suffix: ' her birthday?',
            suffixEs: ' su cumpleaños?',
          },
          {
            textEn: '- Last Tuesday.',
            textEs: '- El martes pasado.',
            hasBlank: false,
          },
        ],
        options: [
          { id: 'opt-t3-wherewas', text: 'Where was', isCorrect: false },
          { id: 'opt-t3-whowas', text: 'Who was', isCorrect: false },
          { id: 'opt-t3-washer', text: 'Was her', isCorrect: false },
          { id: 'opt-t3-whenwas', text: 'When was', isCorrect: true },
        ],
        correctAnswerId: 'opt-t3-whenwas',
        explanation: "'When was her birthday?' asks for the time/date answered by 'Last Tuesday'.",
        explanationEs: "'When was her birthday?' (¿Cuándo fue su cumpleaños?) indaga la fecha correspondiente a 'El martes pasado'.",
      },

      /* Test 4 (test 4.png) */
      {
        id: 'be-past-q-test-4',
        number: 4,
        type: 'drag-drop',
        instructions: 'Drag the correct answer/s into place.',
        instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
        question: "- ________ ________ ________ ________ ________ ________ ________ ?\n- Because I went to a concert with Danny.",
        questionEs: '- ¿Por qué no estuviste en casa anoche? - Porque fui a un concierto con Danny.',
        audioPrompt: "- Why weren't you at home last night? - Because I went to a concert with Danny.",
        durationSeconds: 10,
        imageUrl: bePastQuestionsImg,
        referenceText: BE_PAST_QUESTIONS_REFERENCE_SENTENCE,
        referenceTextEs: BE_PAST_QUESTIONS_REFERENCE_SENTENCE_ES,
        referenceHighlights: BE_PAST_QUESTIONS_HIGHLIGHTS,
        correctWords: ['Why', "weren't", 'you', 'at', 'home', 'last', 'night'],
        slotsCount: 7,
        dialogueLines: [
          {
            textEn: "- ________ ________ ________ ________ ________ ________ ________ ?",
            textEs: '- ¿Por qué no estuviste en casa anoche?',
            hasBlank: true,
            prefix: '- ',
            suffix: ' ?',
            prefixEs: '- ¿',
            suffixEs: ' ?',
          },
          {
            textEn: '- Because I went to a concert with Danny.',
            textEs: '- Porque fui a un concierto con Danny.',
            hasBlank: false,
          },
        ],
        options: [
          { id: 'opt-t4-Werent', text: "Weren't", isCorrect: false },
          { id: 'opt-t4-last', text: 'last', isCorrect: true },
          { id: 'opt-t4-werent', text: "weren't", isCorrect: true },
          { id: 'opt-t4-night', text: 'night', isCorrect: true },
          { id: 'opt-t4-you', text: 'you', isCorrect: true },
          { id: 'opt-t4-Why', text: 'Why', isCorrect: true },
          { id: 'opt-t4-at', text: 'at', isCorrect: true },
          { id: 'opt-t4-home', text: 'home', isCorrect: true },
        ],
        correctAnswerId: 'opt-t4-Why',
        explanation: "The complete question is: \"Why weren't you at home last night?\" answered by \"Because I went to a concert with Danny.\"",
        explanationEs: "La pregunta completa ordenada es: \"Why weren't you at home last night?\" (¿Por qué no estuviste en casa anoche?), respondida con \"Because I went to a concert with Danny.\"",
      },

      /* Test 5 (test 5.png) */
      {
        id: 'be-past-q-test-5',
        number: 5,
        type: 'drag-drop',
        instructions: 'Drag the correct answer/s into place.',
        instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
        question: '- ________ ________ ________ ________ ________ ________ last night?\n- Because you were sick, and they were worried about you.\n- Oh. Now I understand.',
        questionEs: '- ¿Por qué se portaron tan bien los chicos anoche? - Porque estabas enfermo y estaban preocupados por ti. - Oh. Ahora entiendo.',
        audioPrompt: '- Why were the boys so good last night? - Because you were sick, and they were worried about you. - Oh. Now I understand.',
        durationSeconds: 10,
        imageUrl: bePastQuestionsImg,
        referenceText: BE_PAST_QUESTIONS_REFERENCE_SENTENCE,
        referenceTextEs: BE_PAST_QUESTIONS_REFERENCE_SENTENCE_ES,
        referenceHighlights: BE_PAST_QUESTIONS_HIGHLIGHTS,
        correctWords: ['Why', 'were', 'the', 'boys', 'so', 'good'],
        slotsCount: 6,
        dialogueLines: [
          {
            textEn: '- ________ ________ ________ ________ ________ ________ last night?',
            textEs: '- ¿Por qué se portaron tan bien los chicos anoche?',
            hasBlank: true,
            prefix: '- ',
            suffix: ' last night?',
            prefixEs: '- ¿',
            suffixEs: ' anoche?',
          },
          {
            textEn: '- Because you were sick, and they were worried about you.',
            textEs: '- Porque estabas enfermo, y ellos estaban preocupados por ti.',
            hasBlank: false,
          },
          {
            textEn: '- Oh. Now I understand.',
            textEs: '- Oh. Ahora comprendo.',
            hasBlank: false,
          },
        ],
        options: [
          { id: 'opt-t5-When', text: 'When', isCorrect: false },
          { id: 'opt-t5-good', text: 'good', isCorrect: true },
          { id: 'opt-t5-Were', text: 'Were', isCorrect: false },
          { id: 'opt-t5-so', text: 'so', isCorrect: true },
          { id: 'opt-t5-boys', text: 'boys', isCorrect: true },
          { id: 'opt-t5-Why', text: 'Why', isCorrect: true },
          { id: 'opt-t5-were', text: 'were', isCorrect: true },
          { id: 'opt-t5-the', text: 'the', isCorrect: true },
        ],
        correctAnswerId: 'opt-t5-Why',
        explanation: "The complete question is: \"Why were the boys so good last night?\" answered by \"Because you were sick...\".",
        explanationEs: "La pregunta completa ordenada es: \"Why were the boys so good last night?\" (¿Por qué se portaron tan bien los chicos anoche?), respondida con \"Because you were sick...\".",
      },
    ],
  },
];

export const BE_PAST_QUESTIONS_FLASHCARDS: Flashcard[] = [
  {
    id: 'fc-q-were-you',
    word: 'Were you...?',
    phonetic: '/wɜːr juː/',
    translation: '¿Estuviste tú...? / ¿Estuvieron ustedes...?',
    partOfSpeech: 'phrase',
    audioText: 'Were you at the meeting this morning?',
    exampleEn: 'Were you at the meeting this morning? - Yes, I was.',
    exampleEs: '¿Estuviste en la reunión esta mañana? - Sí, estuve.',
  },
  {
    id: 'fc-q-was-it',
    word: 'Was it...?',
    phonetic: '/wɒz ɪt/',
    translation: '¿Estuvo...? / ¿Hacía...?',
    partOfSpeech: 'phrase',
    audioText: 'Was it cold in Alaska? - Yes, it was.',
    exampleEn: 'Was it cold in Alaska? - Yes, it was.',
    exampleEs: '¿Hacía frío en Alaska? - Sí, hacía frío.',
  },
  {
    id: 'fc-q-where-were',
    word: 'Where were...?',
    phonetic: '/weər wɜːr/',
    translation: '¿Dónde estaban / estuvieron...?',
    partOfSpeech: 'phrase',
    audioText: 'Where were you and Susan last night?',
    exampleEn: 'Where were you and Susan last night? - We were out.',
    exampleEs: '¿Dónde estuvieron Susan y tú anoche? - Salimos.',
  },
  {
    id: 'fc-q-what-was',
    word: 'What was...?',
    phonetic: '/wɒt wɒz/',
    translation: '¿Qué fue...? / ¿Cuál era...?',
    partOfSpeech: 'phrase',
    audioText: 'What was the reason? - He did not like his boss.',
    exampleEn: 'What was the reason? - He didn\'t like his boss.',
    exampleEs: '¿Cuál fue la razón? - No le agradaba su jefe.',
  },
  {
    id: 'fc-q-when-was',
    word: 'When was...?',
    phonetic: '/wen wɒz/',
    translation: '¿Cuándo fue...?',
    partOfSpeech: 'phrase',
    audioText: 'When was the movie on TV? - At 10:30 last night.',
    exampleEn: 'When was the movie on? - At 10:30 last night.',
    exampleEs: '¿Cuándo transmitieron la película? - A las 10:30 anoche.',
  },
  {
    id: 'fc-q-wasnt-she',
    word: "Wasn't she...?",
    phonetic: '/ˈwɒznt ʃiː/',
    translation: '¿No estaba ella...?',
    partOfSpeech: 'phrase',
    audioText: "Wasn't she sick last month? - Yes, she was.",
    exampleEn: "Wasn't she sick last month? - Yes, she was.",
    exampleEs: '¿No estaba ella enferma el mes pasado? - Sí, lo estaba.',
  },
];

export const BE_PAST_QUESTIONS_GRAMMAR_RULES: GrammarRule[] = [
  {
    id: 'rule-past-yes-no',
    titleEn: 'Yes / No Questions with Be (Past)',
    titleEs: 'Preguntas de Sí / No con Be en Pasado',
    ruleExplanationEn: 'Invert the verb and subject: Was I / he / she / it...? Were you / we / they...?',
    ruleExplanationEs: 'Invierte el orden del verbo y sujeto: Was + I / he / she / it...? Were + you / we / they...?',
    examples: [
      { en: 'Were you at the meeting this morning? - Yes, I was.', es: '¿Estuviste en la reunión esta mañana? - Sí, estuve.' },
      { en: 'Was the airport crowded? - Yes, it was.', es: '¿Estaba lleno el aeropuerto? - Sí, lo estaba.' },
      { en: "Wasn't she sick last month? - Yes, she was.", es: '¿No estaba enferma el mes pasado? - Sí, lo estaba.' },
    ],
  },
  {
    id: 'rule-past-wh-questions',
    titleEn: 'Wh- Questions with Be (Past)',
    titleEs: 'Preguntas Informativas (Wh-) con Be en Pasado',
    ruleExplanationEn: 'Question word (Where, What, When, Who, Why) + Was / Were + Subject...?',
    ruleExplanationEs: 'Palabra interrogativa (Where, What, When, Who, Why) + Was / Were + Sujeto...?',
    examples: [
      { en: 'Where were you and Susan last night? - We were out.', es: '¿Dónde estuvieron Susan y tú anoche? - Salimos.' },
      { en: 'What was that noise in the street? - I don\'t know.', es: '¿Qué fue ese ruido en la calle? - No lo sé.' },
      { en: 'When was her birthday? - Last Tuesday.', es: '¿Cuándo fue su cumpleaños? - El martes pasado.' },
      { en: "Why weren't you at home last night? - Because I went to a concert.", es: '¿Por qué no estuviste en casa anoche? - Porque fui a un concierto.' },
    ],
  },
];
