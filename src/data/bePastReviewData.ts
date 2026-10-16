import policeAlibiImg from '../assets/images/be_past_police_alibi_1792112323178.jpg';
import dinnerWaiterImg from '../assets/images/dinner_restaurant_waiter_1792112336152.jpg';

export { policeAlibiImg, dinnerWaiterImg };

export interface BePastReferenceItem {
  speaker: string;
  speakerEs: string;
  textEn: string;
  textEs: string;
  highlights: { word: string; color: 'yellow' | 'cyan' }[];
}

export const BE_PAST_REVIEW_REFERENCE_SENTENCES: BePastReferenceItem[] = [
  {
    speaker: '- ',
    speakerEs: '- ',
    textEn: 'Where were you last night at 9:30?',
    textEs: '¿Dónde estuviste anoche a las 9:30?',
    highlights: [{ word: 'were', color: 'yellow' }],
  },
  {
    speaker: '- ',
    speakerEs: '- ',
    textEn: 'I was at home all night.',
    textEs: 'Estuve en casa toda la noche.',
    highlights: [{ word: 'was', color: 'cyan' }],
  },
  {
    speaker: '- ',
    speakerEs: '- ',
    textEn: 'Was Big Bob with you?',
    textEs: '¿Estaba Big Bob contigo?',
    highlights: [{ word: 'Was', color: 'cyan' }],
  },
  {
    speaker: '- ',
    speakerEs: '- ',
    textEn: "No, he wasn't, I was alone.",
    textEs: 'No, no estaba, estuve solo.',
    highlights: [
      { word: "wasn't", color: 'cyan' },
      { word: 'was', color: 'cyan' },
    ],
  },
];

export const BE_PAST_REVIEW_REFERENCE_AUDIO =
  "Where were you last night at 9:30? I was at home all night. Was Big Bob with you? No, he wasn't, I was alone.";

export interface SlotItem {
  id: string;
  expectedWord: string;
  dropdownOptions?: string[]; // for dropdowns
}

export interface DialogueLineItem {
  prefix?: string;
  prefixEs?: string;
  slot?: SlotItem;
  middleText?: string;
  middleTextEs?: string;
  slot2?: SlotItem;
  middleText2?: string;
  middleText2Es?: string;
  slot3?: SlotItem;
  suffix?: string;
  suffixEs?: string;
  fullEn: string;
  fullEs: string;
}

export interface BePastActivityItem {
  id: string;
  number: number;
  title: string;
  type: 'drag-drop' | 'dropdown';
  instructions: string;
  instructionsEs: string;
  audioPrompt: string;
  dialogueLines: DialogueLineItem[];
  optionsPool: string[]; // options shown at bottom for drag-drop
  explanationEn: string;
  explanationEs: string;
  illustrationImg?: string;
}

export interface BePastTestItem {
  id: string;
  number: number;
  type: 'drag-drop' | 'dropdown';
  instructions: string;
  instructionsEs: string;
  audioPrompt: string;
  dialogueLines: DialogueLineItem[];
  optionsPool: string[];
  explanationEn: string;
  explanationEs: string;
  illustrationImg?: string;
}

// ---------------------------------------------------------------------------
// 19 PRACTICAL ACTIVITIES (Activities 2 to 20)
// Activity 1 is Explore (the video & reference script presentation)
// ---------------------------------------------------------------------------
export const BE_PAST_REVIEW_ACTIVITIES: BePastActivityItem[] = [
  /* Actividad 2 (actividad 2.png, Image 19): Where were you, Bobby? / I was in the library */
  {
    id: 'bpr-act-2',
    number: 2,
    title: 'Actividad 2',
    type: 'dropdown',
    instructions: 'Select the correct answer from the drop-down list.',
    instructionsEs: 'Selecciona la respuesta correcta de la lista desplegable.',
    audioPrompt: "Where were you, Bobby? It's 10:30. I was in the library. I had a lot of homework.",
    dialogueLines: [
      {
        prefix: '- ',
        prefixEs: '- ¿',
        slot: {
          id: 'bpr-act2-s1',
          expectedWord: 'Where were',
          dropdownOptions: ['Where is', 'Where were', 'Where was'],
        },
        suffix: " you, Bobby? It's 10:30.",
        suffixEs: ' tú, Bobby? Son las 10:30.',
        fullEn: "- Where were you, Bobby? It's 10:30.",
        fullEs: '- ¿Dónde estabas tú, Bobby? Son las 10:30.',
      },
      {
        prefix: '- I ',
        prefixEs: '- Yo ',
        slot: {
          id: 'bpr-act2-s2',
          expectedWord: 'was',
          dropdownOptions: ['were', 'am', 'was'],
        },
        suffix: ' in the library. I had a lot of homework.',
        suffixEs: ' en la biblioteca. Tenía mucha tarea.',
        fullEn: '- I was in the library. I had a lot of homework.',
        fullEs: '- Estuve en la biblioteca. Tenía mucha tarea.',
      },
    ],
    optionsPool: [],
    explanationEn:
      "Use 'Where were' with 'you' in past questions: 'Where were you, Bobby?'. For first-person singular 'I', use 'was' in the past: 'I was in the library.'",
    explanationEs:
      "Usa 'Where were' con 'you' en preguntas de pasado: 'Where were you, Bobby?'. Para primera persona singular 'I', usa 'was' en pasado: 'I was in the library.'",
  },

  /* Actividad 3 (actividad 3.png, Image 18): Hi, Marsha. How was your summer vacation? */
  {
    id: 'bpr-act-3',
    number: 3,
    title: 'Actividad 3',
    type: 'dropdown',
    instructions: 'Select the correct answer from the drop-down list.',
    instructionsEs: 'Selecciona la respuesta correcta de la lista desplegable.',
    audioPrompt:
      'Hi, Marsha. How was your summer vacation? It was great! Where were you and Ron all summer? We were in Rome. It was wonderful!',
    dialogueLines: [
      {
        prefix: '- Hi, Marsha. How ',
        prefixEs: '- Hola, Marsha. ¿Cómo ',
        slot: {
          id: 'bpr-act3-s1',
          expectedWord: 'was',
          dropdownOptions: ['was', 'are', 'were'],
        },
        suffix: ' your summer vacation?',
        suffixEs: ' tus vacaciones de verano?',
        fullEn: '- Hi, Marsha. How was your summer vacation?',
        fullEs: '- Hola, Marsha. ¿Cómo estuvieron tus vacaciones de verano?',
      },
      {
        prefix: '- It ',
        prefixEs: '- ¡',
        slot: {
          id: 'bpr-act3-s2',
          expectedWord: 'was',
          dropdownOptions: ['are', 'were', 'was'],
        },
        middleText: ' great! Where ',
        middleTextEs: ' genial! ¿Dónde ',
        slot2: {
          id: 'bpr-act3-s3',
          expectedWord: 'were',
          dropdownOptions: ['is', 'were', 'was'],
        },
        suffix: ' you and Ron all summer?',
        suffixEs: ' tú y Ron todo el verano?',
        fullEn: '- It was great! Where were you and Ron all summer?',
        fullEs: '- ¡Estuvo genial! ¿Dónde estuvieron tú y Ron todo el verano?',
      },
      {
        prefix: '- We ',
        prefixEs: '- Nosotros ',
        slot: {
          id: 'bpr-act3-s4',
          expectedWord: 'were',
          dropdownOptions: ['were', 'are', 'am'],
        },
        suffix: ' in Rome. It was wonderful!',
        suffixEs: ' en Roma. ¡Fue maravilloso!',
        fullEn: '- We were in Rome. It was wonderful!',
        fullEs: '- Estuvimos en Roma. ¡Fue maravilloso!',
      },
    ],
    optionsPool: [],
    explanationEn:
      "'Your summer vacation' is singular (it), so we say 'How was your summer vacation?' and 'It was great!'. 'You and Ron' is plural, so we use 'Where were you and Ron?' and 'We were in Rome.'",
    explanationEs:
      "'Your summer vacation' es singular (it), por lo que decimos 'How was your summer vacation?' e 'It was great!'. 'You and Ron' es plural, por lo que usamos 'Where were you and Ron?' y 'We were in Rome.'",
  },

  /* Actividad 4 (actividad 4.png, Image 17): Mr. Muldoon was your teacher last year... */
  {
    id: 'bpr-act-4',
    number: 4,
    title: 'Actividad 4',
    type: 'drag-drop',
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    audioPrompt:
      "Mr. Muldoon was your teacher last year, wasn't he? Yes, he was. Who was your teacher? Ms. Lopez. What was your grade? I got an eighty-six.",
    dialogueLines: [
      {
        prefix: '- Mr. Muldoon was your teacher last year, ',
        prefixEs: '- El Sr. Muldoon fue tu profesor el año pasado, ',
        slot: {
          id: 'bpr-act4-s1',
          expectedWord: "wasn't he",
        },
        suffix: ' ?',
        suffixEs: ' ?',
        fullEn: "- Mr. Muldoon was your teacher last year, wasn't he?",
        fullEs: '- El Sr. Muldoon fue tu profesor el año pasado, ¿verdad?',
      },
      {
        prefix: '- Yes, ',
        prefixEs: '- Sí, ',
        slot: {
          id: 'bpr-act4-s2',
          expectedWord: 'he was',
        },
        middleText: ' . ',
        middleTextEs: ' . ¿',
        slot2: {
          id: 'bpr-act4-s3',
          expectedWord: 'Who was',
        },
        suffix: ' your teacher?',
        suffixEs: ' tu profesor?',
        fullEn: '- Yes, he was. Who was your teacher?',
        fullEs: '- Sí, lo fue. ¿Quién fue tu profesor?',
      },
      {
        prefix: '- Ms. Lopez. ',
        prefixEs: '- La Sra. López. ¿',
        slot: {
          id: 'bpr-act4-s4',
          expectedWord: 'What was',
        },
        suffix: ' your grade?',
        suffixEs: ' tu calificación?',
        fullEn: '- Ms. Lopez. What was your grade?',
        fullEs: '- La Sra. López. ¿Cuál fue tu calificación?',
      },
      {
        fullEn: '- I got an eighty-six.',
        fullEs: '- Me saqué un ochenta y seis.',
      },
    ],
    optionsPool: ['What was', 'Who was', "wasn't he", 'Who were', 'he was'],
    explanationEn:
      "Tag question for affirmative 'was': 'wasn't he?'. Short answer: 'Yes, he was.' Asking for a person: 'Who was your teacher?'. Asking for a score/grade: 'What was your grade?'.",
    explanationEs:
      "Pregunta coletilla para 'was' afirmativo: 'wasn't he?'. Respuesta corta: 'Yes, he was.' Preguntar por persona: 'Who was your teacher?'. Preguntar por calificación: 'What was your grade?'.",
  },

  /* Actividad 5 (actividad 5.png, Image 16): I found my wallet, Sharon / Where was it? / It was under my bed */
  {
    id: 'bpr-act-5',
    number: 5,
    title: 'Actividad 5',
    type: 'drag-drop',
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    audioPrompt: 'I found my wallet, Sharon. Great. Where was it? It was under my bed.',
    dialogueLines: [
      {
        fullEn: '- I found my wallet, Sharon.',
        fullEs: '- Encontré mi billetera, Sharon.',
      },
      {
        prefix: '- Great. ',
        prefixEs: '- Genial. ¿',
        slot: {
          id: 'bpr-act5-s1',
          expectedWord: 'Where was',
        },
        suffix: ' it?',
        suffixEs: ' estaba?',
        fullEn: '- Great. Where was it?',
        fullEs: '- Genial. ¿Dónde estaba?',
      },
      {
        prefix: '- It ',
        prefixEs: '- ',
        slot: {
          id: 'bpr-act5-s2',
          expectedWord: 'was',
        },
        suffix: ' under my bed.',
        suffixEs: ' debajo de mi cama.',
        fullEn: '- It was under my bed.',
        fullEs: '- Estaba debajo de mi cama.',
      },
    ],
    optionsPool: ['were', 'Who was', 'was', 'Where was'],
    explanationEn:
      "For a singular object ('my wallet' / 'it'), ask location with 'Where was it?' and answer 'It was under my bed.'",
    explanationEs:
      "Para un objeto singular ('my wallet' / 'it'), se pregunta la ubicación con 'Where was it?' y se responde 'It was under my bed.'",
  },

  /* Actividad 6 (actividad 6.png, Image 15): What was the movie at the old cinema last night? */
  {
    id: 'bpr-act-6',
    number: 6,
    title: 'Actividad 6',
    type: 'drag-drop',
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    audioPrompt:
      "What was the movie at the old cinema last night? It was an old Clark Kelly film. Was it good? No, it wasn't.",
    dialogueLines: [
      {
        prefix: '- What ',
        prefixEs: '- ¿Cuál ',
        slot: {
          id: 'bpr-act6-s1',
          expectedWord: 'was',
        },
        suffix: ' the movie at the old cinema last night?',
        suffixEs: ' la película en el cine antiguo anoche?',
        fullEn: '- What was the movie at the old cinema last night?',
        fullEs: '- ¿Cuál fue la película en el cine antiguo anoche?',
      },
      {
        prefix: '- ',
        prefixEs: '- ',
        slot: {
          id: 'bpr-act6-s2',
          expectedWord: 'It was',
        },
        suffix: ' an old Clark Kelly film.',
        suffixEs: ' una vieja película de Clark Kelly.',
        fullEn: '- It was an old Clark Kelly film.',
        fullEs: '- Fue una vieja película de Clark Kelly.',
      },
      {
        prefix: '- ',
        prefixEs: '- ¿',
        slot: {
          id: 'bpr-act6-s3',
          expectedWord: 'Was it',
        },
        suffix: ' good?',
        suffixEs: ' buena?',
        fullEn: '- Was it good?',
        fullEs: '- ¿Estuvo buena?',
      },
      {
        prefix: '- No, ',
        prefixEs: '- No, no ',
        slot: {
          id: 'bpr-act6-s4',
          expectedWord: "it wasn't",
        },
        suffix: ' .',
        suffixEs: ' buena.',
        fullEn: "- No, it wasn't.",
        fullEs: '- No, no estuvo buena.',
      },
    ],
    optionsPool: ["it wasn't", 'It was', 'was', 'Was it', "It wasn't"],
    explanationEn:
      "'The movie' takes singular 'was' in questions ('What was the movie...?'). Subject response: 'It was...'. Inverted question: 'Was it good?'. Negative short answer: 'No, it wasn't.'",
    explanationEs:
      "'The movie' lleva singular 'was' en preguntas ('What was the movie...?'). Respuesta: 'It was...'. Pregunta invertida: 'Was it good?'. Respuesta corta negativa: 'No, it wasn't.'",
  },

  /* Actividad 7 (actividad 7.png, Image 14): Who was that man? That was Chris Hamburger... */
  {
    id: 'bpr-act-7',
    number: 7,
    title: 'Actividad 7',
    type: 'drag-drop',
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    audioPrompt: 'Who was that man? That was Chris Hamburger. No, it wasn\'t! Yes, it was!',
    dialogueLines: [
      {
        prefix: '- ',
        prefixEs: '- ¿',
        slot: {
          id: 'bpr-act7-s1',
          expectedWord: 'Who was',
        },
        suffix: ' that man?',
        suffixEs: ' ese hombre?',
        fullEn: '- Who was that man?',
        fullEs: '- ¿Quién era ese hombre?',
      },
      {
        prefix: '- That ',
        prefixEs: '- Ese ',
        slot: {
          id: 'bpr-act7-s2',
          expectedWord: 'was',
        },
        suffix: ' Chris Hamburger.',
        suffixEs: ' Chris Hamburger.',
        fullEn: '- That was Chris Hamburger.',
        fullEs: '- Ese era Chris Hamburger.',
      },
      {
        prefix: '- No, ',
        prefixEs: '- ¡No, ',
        slot: {
          id: 'bpr-act7-s3',
          expectedWord: "it wasn't",
        },
        suffix: ' !',
        suffixEs: ' !',
        fullEn: "- No, it wasn't!",
        fullEs: '- ¡No, no era él!',
      },
      {
        prefix: '- Yes, ',
        prefixEs: '- ¡Sí, ',
        slot: {
          id: 'bpr-act7-s4',
          expectedWord: 'it was',
        },
        suffix: ' !',
        suffixEs: ' !',
        fullEn: '- Yes, it was!',
        fullEs: '- ¡Sí, era él!',
      },
    ],
    optionsPool: ['Where was', 'it was', "it wasn't", 'Who was', 'was'],
    explanationEn:
      "Ask about identity with 'Who was that man?'. Affirmative identification: 'That was Chris Hamburger.' Contradiction: 'No, it wasn't!' Affirmation: 'Yes, it was!'",
    explanationEs:
      "Para preguntar por identidad se usa 'Who was that man?'. Identificación afirmativa: 'That was Chris Hamburger.' Contradicción: 'No, it wasn't!' Afirmación: 'Yes, it was!'",
  },

  /* Actividad 8 (actividad 8.png, Image 13): How was Diane's party? It was great! ... */
  {
    id: 'bpr-act-8',
    number: 8,
    title: 'Actividad 8',
    type: 'dropdown',
    instructions: 'Select the correct answer from the drop-down list.',
    instructionsEs: 'Selecciona la respuesta correcta de la lista desplegable.',
    audioPrompt: "How was Diane's party? It was great! Who was there? Everyone was there except you!",
    dialogueLines: [
      {
        prefix: '- ',
        prefixEs: '- ¿Cómo ',
        slot: {
          id: 'bpr-act8-s1',
          expectedWord: 'How was',
          dropdownOptions: ['Where was', 'How was', 'Who was'],
        },
        suffix: " Diane's party?",
        suffixEs: ' la fiesta de Diane?',
        fullEn: "- How was Diane's party?",
        fullEs: '- ¿Cómo estuvo la fiesta de Diane?',
      },
      {
        prefix: '- ',
        prefixEs: '- ¡',
        slot: {
          id: 'bpr-act8-s2',
          expectedWord: 'It was',
          dropdownOptions: ['He was', 'It was', 'It were'],
        },
        suffix: ' great!',
        suffixEs: ' genial!',
        fullEn: '- It was great!',
        fullEs: '- ¡Estuvo genial!',
      },
      {
        prefix: '- ',
        prefixEs: '- ¿Quién ',
        slot: {
          id: 'bpr-act8-s3',
          expectedWord: 'Who was',
          dropdownOptions: ['Who was', 'Where was', 'How was'],
        },
        suffix: ' there?',
        suffixEs: ' allí?',
        fullEn: '- Who was there?',
        fullEs: '- ¿Quién estuvo allí?',
      },
      {
        prefix: '- Everyone ',
        prefixEs: '- ¡Todos ',
        slot: {
          id: 'bpr-act8-s4',
          expectedWord: 'was',
          dropdownOptions: ['was', 'were'],
        },
        suffix: ' there except you!',
        suffixEs: ' allí excepto tú!',
        fullEn: '- Everyone was there except you!',
        fullEs: '- ¡Todos estuvieron allí excepto tú!',
      },
    ],
    optionsPool: [],
    explanationEn:
      "Ask how an event went with 'How was Diane's party?'. Respond with 'It was great!'. Ask who attended: 'Who was there?'. Note: 'Everyone' grammatically takes singular 'was': 'Everyone was there except you!'.",
    explanationEs:
      "Pregunta cómo estuvo un evento con 'How was Diane's party?'. Responde con 'It was great!'. Pregunta quién asistió: 'Who was there?'. Nota: 'Everyone' gramaticalmente rige verbo singular 'was': 'Everyone was there except you!'.",
  },

  /* Actividad 9 (actividad 9.png, Image 12): Why was everyone late for work this morning? */
  {
    id: 'bpr-act-9',
    number: 9,
    title: 'Actividad 9',
    type: 'dropdown',
    instructions: 'Select the correct answer from the drop-down list.',
    instructionsEs: 'Selecciona la respuesta correcta de la lista desplegable.',
    audioPrompt:
      'Why was everyone late for work this morning? There was a fire on Park Street. The police were there. They closed the road.',
    dialogueLines: [
      {
        prefix: '- ',
        prefixEs: '- ¿Por qué ',
        slot: {
          id: 'bpr-act9-s1',
          expectedWord: 'Why was',
          dropdownOptions: ['When were', 'When was', 'Why was', 'Why were'],
        },
        suffix: ' everyone late for work this morning?',
        suffixEs: ' todos tarde al trabajo esta mañana?',
        fullEn: '- Why was everyone late for work this morning?',
        fullEs: '- ¿Por qué todos llegaron tarde al trabajo esta mañana?',
      },
      {
        prefix: '- There ',
        prefixEs: '- ',
        slot: {
          id: 'bpr-act9-s2',
          expectedWord: 'was',
          dropdownOptions: ['was', 'were', 'did', "isn't"],
        },
        middleText: ' a fire on Park Street. The police ',
        middleTextEs: ' un incendio en la calle Park. La policía ',
        slot2: {
          id: 'bpr-act9-s3',
          expectedWord: 'were',
          dropdownOptions: ['are', 'were', 'did'],
        },
        suffix: ' there.\nThey closed the road.',
        suffixEs: ' allí.\nCerraron la calle.',
        fullEn: '- There was a fire on Park Street. The police were there. They closed the road.',
        fullEs: '- Hubo un incendio en la calle Park. La policía estaba allí. Cerraron la calle.',
      },
    ],
    optionsPool: [],
    explanationEn:
      "'Everyone' takes singular 'was' ('Why was everyone late...?'). 'There was a fire' (singular noun 'a fire'). 'The police' is a collective plural noun in English, so it takes 'were' ('The police were there').",
    explanationEs:
      "'Everyone' rige singular 'was' ('Why was everyone late...?'). 'There was a fire' (sustantivo singular 'a fire'). 'The police' es un sustantivo plural en inglés, por lo que rige 'were' ('The police were there').",
  },

  /* Actividad 10 (actividad 10.png, Image 11): Where were you last night? I called you at 8:00 */
  {
    id: 'bpr-act-10',
    number: 10,
    title: 'Actividad 10',
    type: 'drag-drop',
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    audioPrompt:
      "Where were you last night? I called you at 8:00. We went to Pierre's for dinner. Was the food good? No, it wasn't.",
    dialogueLines: [
      {
        prefix: '- Where ',
        prefixEs: '- ¿Dónde ',
        slot: {
          id: 'bpr-act10-s1',
          expectedWord: 'were you',
        },
        suffix: ' last night? I called you at 8:00.',
        suffixEs: ' anoche? Te llamé a las 8:00.',
        fullEn: '- Where were you last night? I called you at 8:00.',
        fullEs: '- ¿Dónde estabas anoche? Te llamé a las 8:00.',
      },
      {
        fullEn: "- We went to Pierre's for dinner.",
        fullEs: "- Fuimos a cenar a Pierre's.",
      },
      {
        prefix: '- ',
        prefixEs: '- ¿',
        slot: {
          id: 'bpr-act10-s2',
          expectedWord: 'Was',
        },
        suffix: ' the food good?',
        suffixEs: ' buena la comida?',
        fullEn: '- Was the food good?',
        fullEs: '- ¿Estuvo buena la comida?',
      },
      {
        prefix: '- No, ',
        prefixEs: '- No, no ',
        slot: {
          id: 'bpr-act10-s3',
          expectedWord: "it wasn't",
        },
        suffix: ' .',
        suffixEs: ' estuvo.',
        fullEn: "- No, it wasn't.",
        fullEs: '- No, no estuvo buena.',
      },
    ],
    optionsPool: ["it wasn't", 'were you', 'Was', 'you were', 'Were'],
    explanationEn:
      "Question to 'you' in past: 'Where were you?'. Inverted question for singular noun 'the food': 'Was the food good?'. Negative short answer: 'No, it wasn't.'",
    explanationEs:
      "Pregunta a 'you' en pasado: 'Where were you?'. Pregunta invertida con sustantivo singular 'the food': 'Was the food good?'. Respuesta corta negativa: 'No, it wasn't.'",
  },

  /* Actividad 11 (actividad 11.png, Image 10): Hi, Robert. Were you at school yesterday? */
  {
    id: 'bpr-act-11',
    number: 11,
    title: 'Actividad 11',
    type: 'dropdown',
    instructions: 'Select the correct answer from the drop-down list.',
    instructionsEs: 'Selecciona la respuesta correcta de la lista desplegable.',
    audioPrompt:
      "Hi, Robert. Were you at school yesterday? No, I wasn't. I was at the doctor's. Were you sick? Yes, I was.",
    dialogueLines: [
      {
        prefix: '- Hi, Robert. ',
        prefixEs: '- Hola, Robert. ¿',
        slot: {
          id: 'bpr-act11-s1',
          expectedWord: 'Were you',
          dropdownOptions: ['Was you', 'Were you'],
        },
        suffix: ' at school yesterday?',
        suffixEs: ' en la escuela ayer?',
        fullEn: '- Hi, Robert. Were you at school yesterday?',
        fullEs: '- Hola, Robert. ¿Estuviste en la escuela ayer?',
      },
      {
        prefix: '- No, I ',
        prefixEs: '- No, yo no ',
        slot: {
          id: 'bpr-act11-s2',
          expectedWord: "wasn't",
          dropdownOptions: ["weren't", "wasn't"],
        },
        middleText: ' . I ',
        middleTextEs: ' . ',
        slot2: {
          id: 'bpr-act11-s3',
          expectedWord: 'was',
          dropdownOptions: ['was', 'were'],
        },
        suffix: " at the doctor's.",
        suffixEs: ' en el médico.',
        fullEn: "- No, I wasn't. I was at the doctor's.",
        fullEs: '- No, no estuve. Estuve en el médico.',
      },
      {
        prefix: '- ',
        prefixEs: '- ¿',
        slot: {
          id: 'bpr-act11-s4',
          expectedWord: 'Were',
          dropdownOptions: ['Were', 'Was'],
        },
        suffix: ' you sick?',
        suffixEs: ' tú enfermo?',
        fullEn: '- Were you sick?',
        fullEs: '- ¿Estabas enfermo?',
      },
      {
        prefix: '- Yes, I ',
        prefixEs: '- Sí, lo ',
        slot: {
          id: 'bpr-act11-s5',
          expectedWord: 'was',
          dropdownOptions: ['was', 'were'],
        },
        suffix: ' .',
        suffixEs: ' .',
        fullEn: '- Yes, I was.',
        fullEs: '- Sí, lo estaba.',
      },
    ],
    optionsPool: [],
    explanationEn:
      "Questions with 'you' use 'Were you...'. Answers with 'I' use 'was' (affirmative) or 'wasn't' (negative): 'No, I wasn't. I was at the doctor's. Yes, I was.'",
    explanationEs:
      "Las preguntas con 'you' usan 'Were you...'. Las respuestas con 'I' usan 'was' (afirmativo) o 'wasn't' (negativo): 'No, I wasn't. I was at the doctor's. Yes, I was.'",
  },

  /* Actividad 12 (actividad 12.png, Image 9): How many people were there at the game last night? */
  {
    id: 'bpr-act-12',
    number: 12,
    title: 'Actividad 12',
    type: 'drag-drop',
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    audioPrompt:
      'How many people were there at the game last night? Oh, there were a lot. There weren\'t any empty seats.',
    dialogueLines: [
      {
        prefix: '- How many people ',
        prefixEs: '- ¿Cuántas personas ',
        slot: {
          id: 'bpr-act12-s1',
          expectedWord: 'were there',
        },
        suffix: ' at the game last night?',
        suffixEs: ' en el partido anoche?',
        fullEn: '- How many people were there at the game last night?',
        fullEs: '- ¿Cuántas personas había en el partido anoche?',
      },
      {
        prefix: '- Oh, ',
        prefixEs: '- Oh, ',
        slot: {
          id: 'bpr-act12-s2',
          expectedWord: 'there were',
        },
        middleText: ' a lot. There ',
        middleTextEs: ' muchas. No ',
        slot2: {
          id: 'bpr-act12-s3',
          expectedWord: "weren't",
        },
        suffix: ' any empty seats.',
        suffixEs: ' ningún asiento vacío.',
        fullEn: "- Oh, there were a lot. There weren't any empty seats.",
        fullEs: '- Oh, había muchas. No había ningún asiento vacío.',
      },
    ],
    optionsPool: ['were there', "aren't", 'there were', 'there are', 'are there', "weren't"],
    explanationEn:
      "Question form with plural 'people': 'were there'. Affirmative response: 'there were a lot'. Negative plural condition: 'There weren't any empty seats.'",
    explanationEs:
      "Forma de pregunta con el plural 'people': 'were there'. Respuesta afirmativa: 'there were a lot'. Condición plural negativa: 'There weren't any empty seats.'",
  },

  /* Actividad 13 (actividad 13.png, Image 8): You weren't at the concert last weekend, were you? */
  {
    id: 'bpr-act-13',
    number: 13,
    title: 'Actividad 13',
    type: 'dropdown',
    instructions: 'Select the correct answer from the drop-down list.',
    instructionsEs: 'Selecciona la respuesta correcta de la lista desplegable.',
    audioPrompt:
      "You weren't at the concert last weekend, were you? You're right, I wasn't. Where were you? I was at my uncle's house in Atlanta.",
    dialogueLines: [
      {
        prefix: '- You ',
        prefixEs: '- Tú no ',
        slot: {
          id: 'bpr-act13-s1',
          expectedWord: "weren't",
          dropdownOptions: ["wasn't", "weren't"],
        },
        middleText: ' at the concert last weekend, ',
        middleTextEs: ' en el concierto el fin de semana pasado, ¿',
        slot2: {
          id: 'bpr-act13-s2',
          expectedWord: 'were',
          dropdownOptions: ['were', 'was'],
        },
        suffix: ' you?',
        suffixEs: ' verdad?',
        fullEn: "- You weren't at the concert last weekend, were you?",
        fullEs: '- No estuviste en el concierto el fin de semana pasado, ¿verdad?',
      },
      {
        prefix: "- You're right, I ",
        prefixEs: '- Tienes razón, no ',
        slot: {
          id: 'bpr-act13-s3',
          expectedWord: "wasn't",
          dropdownOptions: ["wasn't", "weren't"],
        },
        suffix: ' .',
        suffixEs: ' estuve.',
        fullEn: "- You're right, I wasn't.",
        fullEs: '- Tienes razón, no estuve.',
      },
      {
        prefix: '- Where ',
        prefixEs: '- ¿Dónde ',
        slot: {
          id: 'bpr-act13-s4',
          expectedWord: 'were',
          dropdownOptions: ['were', 'was'],
        },
        suffix: ' you?',
        suffixEs: ' estabas?',
        fullEn: '- Where were you?',
        fullEs: '- ¿Dónde estabas?',
      },
      {
        prefix: '- I ',
        prefixEs: '- ',
        slot: {
          id: 'bpr-act13-s5',
          expectedWord: 'was',
          dropdownOptions: ['were', 'was'],
        },
        suffix: " at my uncle's house in Atlanta.",
        suffixEs: " en la casa de mi tío en Atlanta.",
        fullEn: "- I was at my uncle's house in Atlanta.",
        fullEs: '- Estuve en la casa de mi tío en Atlanta.',
      },
    ],
    optionsPool: [],
    explanationEn:
      "Negative statement with 'you': 'You weren't...'. Affirmative question tag: 'were you?'. Negative response with 'I': 'I wasn't.' Question: 'Where were you?'. Response: 'I was...'.",
    explanationEs:
      "Oración negativa con 'you': 'You weren't...'. Coletilla interrogativa afirmativa: 'were you?'. Respuesta negativa con 'I': 'I wasn't.' Pregunta: 'Where were you?'. Respuesta: 'I was...'.",
  },

  /* Actividad 14 (actividad 14.png, Image 7): Do you see anything different about me? Your hair wasn't blond... */
  {
    id: 'bpr-act-14',
    number: 14,
    title: 'Actividad 14',
    type: 'drag-drop',
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    audioPrompt:
      "Do you see anything different about me? Your hair wasn't blond before, was it? Yes, it was. Do you like the new color? Ah, yes.",
    dialogueLines: [
      {
        fullEn: '- Do you see anything different about me?',
        fullEs: '- ¿Ves algo diferente en mí?',
      },
      {
        prefix: '- Your hair ',
        prefixEs: '- Tu cabello no ',
        slot: {
          id: 'bpr-act14-s1',
          expectedWord: "wasn't",
        },
        middleText: ' blond before, ',
        middleTextEs: ' rubio antes, ¿',
        slot2: {
          id: 'bpr-act14-s2',
          expectedWord: 'was',
        },
        middleText2: ' ',
        middleText2Es: ' ',
        slot3: {
          id: 'bpr-act14-s3',
          expectedWord: 'it',
        },
        suffix: ' ?',
        suffixEs: ' ?',
        fullEn: "- Your hair wasn't blond before, was it?",
        fullEs: '- Tu cabello no era rubio antes, ¿verdad?',
      },
      {
        prefix: '- Yes, ',
        prefixEs: '- Sí, ',
        slot: {
          id: 'bpr-act14-s4',
          expectedWord: 'it was',
        },
        suffix: ' . Do you like the new color?',
        suffixEs: ' lo era. ¿Te gusta el nuevo color?',
        fullEn: '- Yes, it was. Do you like the new color?',
        fullEs: '- Sí, lo era. ¿Te gusta el nuevo color?',
      },
      {
        fullEn: '- Ah, yes.',
        fullEs: '- Ah, sí.',
      },
    ],
    optionsPool: ["wasn't", 'it is', 'it was', "isn't", 'was', 'it'],
    explanationEn:
      "'Hair' is uncountable (singular 'it'): 'Your hair wasn't blond before, was it?'. Affirmative confirmation: 'Yes, it was.'",
    explanationEs:
      "'Hair' es incontable (singular 'it'): 'Your hair wasn't blond before, was it?'. Confirmación afirmativa: 'Yes, it was.'",
  },

  /* Actividad 15 (actividad 15.png, Image 6): Bob and Tina were together at the movies... */
  {
    id: 'bpr-act-15',
    number: 15,
    title: 'Actividad 15',
    type: 'dropdown',
    instructions: 'Select the correct answer from the drop-down list.',
    instructionsEs: 'Selecciona la respuesta correcta de la lista desplegable.',
    audioPrompt:
      "Guess what! Bob and Tina were together at the movies. Were they really? Of course, Bob's little brother Teddy was with them, too. Oh.",
    dialogueLines: [
      {
        prefix: '- Guess what! Bob and Tina ',
        prefixEs: '- ¡Adivina qué! Bob y Tina ',
        slot: {
          id: 'bpr-act15-s1',
          expectedWord: 'were',
          dropdownOptions: ['was', 'were', 'are'],
        },
        suffix: ' together at the movies.',
        suffixEs: ' juntos en el cine.',
        fullEn: '- Guess what! Bob and Tina were together at the movies.',
        fullEs: '- ¡Adivina qué! Bob y Tina estuvieron juntos en el cine.',
      },
      {
        prefix: '- ',
        prefixEs: '- ¿En verdad ',
        slot: {
          id: 'bpr-act15-s2',
          expectedWord: 'Were',
          dropdownOptions: ['Were', "Weren't", 'Was'],
        },
        suffix: ' they really?',
        suffixEs: ' estuvieron?',
        fullEn: '- Were they really?',
        fullEs: '- ¿En verdad estuvieron?',
      },
      {
        prefix: "- Of course, Bob's little brother Teddy ",
        prefixEs: '- Por supuesto, el hermanito de Bob, Teddy, ',
        slot: {
          id: 'bpr-act15-s3',
          expectedWord: 'was',
          dropdownOptions: ['were', 'is', 'was'],
        },
        suffix: ' with them, too.',
        suffixEs: ' con ellos también.',
        fullEn: "- Of course, Bob's little brother Teddy was with them, too.",
        fullEs: '- Por supuesto, el hermanito de Bob, Teddy, estaba con ellos también.',
      },
      {
        fullEn: '- Oh.',
        fullEs: '- Oh.',
      },
    ],
    optionsPool: [],
    explanationEn:
      "'Bob and Tina' is plural (they), requiring 'were'. Short question with 'they': 'Were they really?'. Singular subject 'Teddy' takes 'was': 'Teddy was with them, too.'",
    explanationEs:
      "'Bob and Tina' es plural (ellos), por lo que rige 'were'. Pregunta corta con 'they': 'Were they really?'. El sujeto singular 'Teddy' rige 'was': 'Teddy was with them, too.'",
  },

  /* Actividad 16 (actividad 16.png, Image 5): Was the bus crowded? No, it wasn't crowded... */
  {
    id: 'bpr-act-16',
    number: 16,
    title: 'Actividad 16',
    type: 'drag-drop',
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    audioPrompt: 'Was the bus crowded? No, it wasn\'t crowded. The seat next to me was empty.',
    dialogueLines: [
      {
        prefix: '- ',
        prefixEs: '- ¿',
        slot: {
          id: 'bpr-act16-s1',
          expectedWord: 'Was',
        },
        suffix: ' the bus crowded?',
        suffixEs: ' lleno el autobús?',
        fullEn: '- Was the bus crowded?',
        fullEs: '- ¿Estaba lleno el autobús?',
      },
      {
        prefix: '- No, it ',
        prefixEs: '- No, no ',
        slot: {
          id: 'bpr-act16-s2',
          expectedWord: "wasn't",
        },
        middleText: ' crowded. The seat next to me ',
        middleTextEs: ' lleno. El asiento junto a mí ',
        slot2: {
          id: 'bpr-act16-s3',
          expectedWord: 'was',
        },
        suffix: ' empty.',
        suffixEs: ' vacío.',
        fullEn: "- No, it wasn't crowded. The seat next to me was empty.",
        fullEs: '- No, no estaba lleno. El asiento junto a mí estaba vacío.',
      },
    ],
    optionsPool: ['is', 'Is', 'Does', 'was', "wasn't", 'Was'],
    explanationEn:
      "Singular question: 'Was the bus crowded?'. Negative response: 'No, it wasn't crowded.' Affirmative singular description: 'The seat next to me was empty.'",
    explanationEs:
      "Pregunta singular: 'Was the bus crowded?'. Respuesta negativa: 'No, it wasn't crowded.' Descripción singular afirmativa: 'The seat next to me was empty.'",
  },

  /* Actividad 17 (actividad 17.png, Image 4): Why was David late for school again? */
  {
    id: 'bpr-act-17',
    number: 17,
    title: 'Actividad 17',
    type: 'drag-drop',
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    audioPrompt:
      "Why was David late for school again? Because he wasn't ready when the bus came.",
    dialogueLines: [
      {
        prefix: '- ',
        prefixEs: '- ¿',
        slot: {
          id: 'bpr-act17-s1',
          expectedWord: 'Why',
        },
        middleText: ' ',
        middleTextEs: ' ',
        slot2: {
          id: 'bpr-act17-s2',
          expectedWord: 'was',
        },
        middleText2: ' ',
        middleText2Es: ' ',
        slot3: {
          id: 'bpr-act17-s3',
          expectedWord: 'David',
        },
        suffix: ' late for school again?',
        suffixEs: ' tarde a la escuela otra vez?',
        fullEn: '- Why was David late for school again?',
        fullEs: '- ¿Por qué David llegó tarde a la escuela otra vez?',
      },
      {
        prefix: '- Because he ',
        prefixEs: '- Porque él no ',
        slot: {
          id: 'bpr-act17-s4',
          expectedWord: "wasn't",
        },
        suffix: ' ready when the bus came.',
        suffixEs: ' listo cuando llegó el autobús.',
        fullEn: "- Because he wasn't ready when the bus came.",
        fullEs: '- Porque él no estaba listo cuando llegó el autobús.',
      },
    ],
    optionsPool: ["wasn't", 'did', 'was', 'Why', 'David'],
    explanationEn:
      "Past question structure: Wh-word ('Why') + verb ('was') + subject ('David') -> 'Why was David late...?'. Negative past condition: 'he wasn't ready'.",
    explanationEs:
      "Estructura interrogativa en pasado: Partícula interrogativa ('Why') + verbo ('was') + sujeto ('David') -> 'Why was David late...?'. Condición negativa en pasado: 'he wasn't ready'.",
  },

  /* Actividad 18 (actividad 18.png, Image 3): Were Randy and Ted at your house on Saturday? */
  {
    id: 'bpr-act-18',
    number: 18,
    title: 'Actividad 18',
    type: 'drag-drop',
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    audioPrompt:
      'Were Randy and Ted at your house on Saturday? Well, they were there in the morning, but they weren\'t there in the afternoon.',
    dialogueLines: [
      {
        prefix: '- ',
        prefixEs: '- ¿',
        slot: {
          id: 'bpr-act18-s1',
          expectedWord: 'Were',
        },
        suffix: ' Randy and Ted at your house on Saturday?',
        suffixEs: ' Randy y Ted en tu casa el sábado?',
        fullEn: '- Were Randy and Ted at your house on Saturday?',
        fullEs: '- ¿Estuvieron Randy y Ted en tu casa el sábado?',
      },
      {
        prefix: '- Well, they ',
        prefixEs: '- Bueno, ellos ',
        slot: {
          id: 'bpr-act18-s2',
          expectedWord: 'were',
        },
        middleText: ' there in the morning, but they ',
        middleTextEs: ' allí en la mañana, pero ellos no ',
        slot2: {
          id: 'bpr-act18-s3',
          expectedWord: "weren't",
        },
        suffix: ' there in the afternoon.',
        suffixEs: ' allí en la tarde.',
        fullEn: "- Well, they were there in the morning, but they weren't there in the afternoon.",
        fullEs: '- Bueno, ellos estuvieron allí en la mañana, pero no estuvieron en la tarde.',
      },
    ],
    optionsPool: ['Did', 'are', 'were', "aren't", 'Were', "weren't"],
    explanationEn:
      "Two people ('Randy and Ted') form a plural subject (they), requiring question inversion 'Were Randy and Ted...?'. Affirmative: 'they were'. Negative with contrast: 'they weren't'.",
    explanationEs:
      "Dos personas ('Randy and Ted') forman sujeto plural (ellos), requiriendo 'Were Randy and Ted...?'. Afirmativo: 'they were'. Negativo de contraste: 'they weren't'.",
  },

  /* Actividad 19 (actividad 19.png, Image 2): It was Betty's birthday last week, wasn't it? */
  {
    id: 'bpr-act-19',
    number: 19,
    title: 'Actividad 19',
    type: 'drag-drop',
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    audioPrompt:
      "It was Betty's birthday last week, wasn't it? Yes. She's eighteen now. Were you at her party? Yes. We were very happy.",
    dialogueLines: [
      {
        prefix: '- It ',
        prefixEs: '- ',
        slot: {
          id: 'bpr-act19-s1',
          expectedWord: 'was',
        },
        middleText: " Betty's birthday last week, ",
        middleTextEs: ' el cumpleaños de Betty la semana pasada, ¿',
        slot2: {
          id: 'bpr-act19-s2',
          expectedWord: "wasn't",
        },
        suffix: ' it?',
        suffixEs: ' verdad?',
        fullEn: "- It was Betty's birthday last week, wasn't it?",
        fullEs: '- Fue el cumpleaños de Betty la semana pasada, ¿verdad?',
      },
      {
        fullEn: "- Yes. She's eighteen now.",
        fullEs: '- Sí. Ahora tiene dieciocho años.',
      },
      {
        prefix: '- ',
        prefixEs: '- ¿',
        slot: {
          id: 'bpr-act19-s3',
          expectedWord: 'Were',
        },
        suffix: ' you at her party?',
        suffixEs: ' en su fiesta?',
        fullEn: '- Were you at her party?',
        fullEs: '- ¿Estuviste en su fiesta?',
      },
      {
        prefix: '- Yes. We ',
        prefixEs: '- Sí. ',
        slot: {
          id: 'bpr-act19-s4',
          expectedWord: 'were',
        },
        suffix: ' very happy.',
        suffixEs: ' muy felices.',
        fullEn: '- Yes. We were very happy.',
        fullEs: '- Sí. Estuvimos muy felices.',
      },
    ],
    optionsPool: ['Were', 'were', "wasn't", 'was', 'Are', 'Was', "isn't", 'did'],
    explanationEn:
      "Singular event: 'It was Betty's birthday..., wasn't it?'. Question to 'you': 'Were you at her party?'. Plural answer with 'We': 'We were very happy.'",
    explanationEs:
      "Evento singular: 'It was Betty's birthday..., wasn't it?'. Pregunta a 'you': 'Were you at her party?'. Respuesta plural con 'We': 'We were very happy.'",
  },

  /* Actividad 20 (actividad 20.png, Image 1): Where were you? I was at lunch. */
  {
    id: 'bpr-act-20',
    number: 20,
    title: 'Actividad 20',
    type: 'drag-drop',
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    audioPrompt: 'Where were you? I was at lunch.',
    dialogueLines: [
      {
        prefix: '- Where ',
        prefixEs: '- ¿Dónde ',
        slot: {
          id: 'bpr-act20-s1',
          expectedWord: 'were',
        },
        suffix: ' you?',
        suffixEs: ' estabas?',
        fullEn: '- Where were you?',
        fullEs: '- ¿Dónde estabas?',
      },
      {
        prefix: '- I ',
        prefixEs: '- Yo ',
        slot: {
          id: 'bpr-act20-s2',
          expectedWord: 'was',
        },
        suffix: ' at lunch.',
        suffixEs: ' almorzando.',
        fullEn: '- I was at lunch.',
        fullEs: '- Estaba almorzando.',
      },
    ],
    optionsPool: ['was', 'were', 'is', "aren't", "weren't"],
    explanationEn:
      "In questions with 'you' in past simple, use 'were' ('Where were you?'). In answers with 'I', use 'was' ('I was at lunch').",
    explanationEs:
      "En preguntas con 'you' en pasado simple, se usa 'were' ('Where were you?'). En respuestas con 'I', se usa 'was' ('I was at lunch').",
  },
];

// ---------------------------------------------------------------------------
// 10 TEST QUESTIONS (Test 1 to Test 10)
// Exact order requested by user: test 1, test 2, test 3, test 4, test 5, test 6, test 7, test 8, test 9, test 10
// ---------------------------------------------------------------------------
export const BE_PAST_REVIEW_TESTS: BePastTestItem[] = [
  /* Test 1 (test 1.png, Image 29) */
  {
    id: 'bpr-test-1',
    number: 1,
    type: 'drag-drop',
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    audioPrompt:
      "Today was your first day of work, wasn't it? Yes. It was very interesting. The people were very nice. I had a great day.",
    dialogueLines: [
      {
        prefix: '- Today was your first day of work, ',
        prefixEs: '- Hoy fue tu primer día de trabajo, ¿',
        slot: {
          id: 'bpr-t1-s1',
          expectedWord: "wasn't",
        },
        suffix: ' it?',
        suffixEs: ' verdad?',
        fullEn: "- Today was your first day of work, wasn't it?",
        fullEs: '- Hoy fue tu primer día de trabajo, ¿verdad?',
      },
      {
        prefix: '- Yes. It ',
        prefixEs: '- Sí. ',
        slot: {
          id: 'bpr-t1-s2',
          expectedWord: 'was',
        },
        middleText: ' very interesting. The people ',
        middleTextEs: ' muy interesante. La gente ',
        slot2: {
          id: 'bpr-t1-s3',
          expectedWord: 'were',
        },
        suffix: ' very nice. I had a great day.',
        suffixEs: ' muy amable. Tuve un gran día.',
        fullEn: '- Yes. It was very interesting. The people were very nice. I had a great day.',
        fullEs: '- Sí. Fue muy interesante. La gente fue muy amable. Tuve un gran día.',
      },
    ],
    optionsPool: ['it is', 'were', "wasn't", 'was', "isn't", 'is', "weren't"],
    explanationEn:
      "Question tag: affirmative 'was' -> negative tag 'wasn't it?'. Description of day: 'It was very interesting'. 'People' is plural, so it requires 'were': 'The people were very nice.'",
    explanationEs:
      "Coletilla interrogativa: 'was' afirmativo -> 'wasn't it?'. Descripción singular: 'It was very interesting'. 'People' es sustantivo plural, por lo que rige 'were': 'The people were very nice.'",
  },

  /* Test 2 (test 2.png, Image 28) */
  {
    id: 'bpr-test-2',
    number: 2,
    type: 'drag-drop',
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    audioPrompt:
      "We had a great vacation. Our hotel was on the beach. Was there a swimming pool, too? Yes, and there were a lot of interesting people. There wasn't anyone from work!",
    dialogueLines: [
      {
        prefix: '- We had a great vacation. Our hotel ',
        prefixEs: '- Tuvimos unas vacaciones geniales. Nuestro hotel ',
        slot: {
          id: 'bpr-t2-s1',
          expectedWord: 'was',
        },
        suffix: ' on the beach.',
        suffixEs: ' en la playa.',
        fullEn: '- We had a great vacation. Our hotel was on the beach.',
        fullEs: '- Tuvimos unas vacaciones geniales. Nuestro hotel estaba en la playa.',
      },
      {
        prefix: '- ',
        prefixEs: '- ¿',
        slot: {
          id: 'bpr-t2-s2',
          expectedWord: 'Was there',
        },
        suffix: ' a swimming pool, too?',
        suffixEs: ' una piscina también?',
        fullEn: '- Was there a swimming pool, too?',
        fullEs: '- ¿Había una piscina también?',
      },
      {
        prefix: '- Yes, and there ',
        prefixEs: '- Sí, y ',
        slot: {
          id: 'bpr-t2-s3',
          expectedWord: 'were',
        },
        middleText: ' a lot of interesting people. There ',
        middleTextEs: ' mucha gente interesante. No ',
        slot2: {
          id: 'bpr-t2-s4',
          expectedWord: "wasn't",
        },
        suffix: ' anyone from work!',
        suffixEs: ' nadie del trabajo!',
        fullEn: "- Yes, and there were a lot of interesting people. There wasn't anyone from work!",
        fullEs: '- Sí, y había mucha gente interesante. ¡No había nadie del trabajo!',
      },
    ],
    optionsPool: ["isn't", 'There was', 'were', 'are', 'was', "wasn't", 'Was there', 'is'],
    explanationEn:
      "Singular hotel: 'hotel was'. Question for singular existence: 'Was there a swimming pool...?'. Plural 'people': 'there were a lot of interesting people'. Negative with 'anyone': 'There wasn't anyone'.",
    explanationEs:
      "Hotel singular: 'hotel was'. Pregunta de existencia singular: 'Was there a swimming pool...?'. Plural con 'people': 'there were a lot of interesting people'. Negativo con 'anyone': 'There wasn't anyone'.",
  },

  /* Test 3 (test 3.png, Image 30) */
  {
    id: 'bpr-test-3',
    number: 3,
    type: 'dropdown',
    instructions: 'Select the correct answer from the drop-down list.',
    instructionsEs: 'Selecciona la respuesta correcta de la lista desplegable.',
    audioPrompt:
      "Were you at Sally's party? Yes, I was. Cindy and Tom were there, too. Why weren't you there? I wasn't well, so I stayed in bed.",
    dialogueLines: [
      {
        prefix: '- ',
        prefixEs: '- ¿',
        slot: {
          id: 'bpr-t3-s1',
          expectedWord: 'Were',
          dropdownOptions: ['Were', 'Was'],
        },
        suffix: " you at Sally's party?",
        suffixEs: ' en la fiesta de Sally?',
        fullEn: "- Were you at Sally's party?",
        fullEs: '- ¿Estuviste en la fiesta de Sally?',
      },
      {
        prefix: '- Yes, I was. Cindy and Tom ',
        prefixEs: '- Sí, estuve. Cindy y Tom ',
        slot: {
          id: 'bpr-t3-s2',
          expectedWord: 'were',
          dropdownOptions: ['Were', 'Was'],
        },
        middleText: ' there, too. Why ',
        middleTextEs: ' allí también. ¿Por qué no ',
        slot2: {
          id: 'bpr-t3-s3',
          expectedWord: "weren't",
          dropdownOptions: ["weren't", "wasn't"],
        },
        suffix: ' you there?',
        suffixEs: ' tú allí?',
        fullEn: "- Yes, I was. Cindy and Tom were there, too. Why weren't you there?",
        fullEs: '- Sí, estuve. Cindy y Tom estuvieron allí también. ¿Por qué no estuviste tú allí?',
      },
      {
        prefix: '- I ',
        prefixEs: '- No me ',
        slot: {
          id: 'bpr-t3-s4',
          expectedWord: "wasn't",
          dropdownOptions: ["weren't", "wasn't"],
        },
        suffix: ' well, so I stayed in bed.',
        suffixEs: ' sentía bien, así que me quedé en cama.',
        fullEn: '- I wasn\'t well, so I stayed in bed.',
        fullEs: '- No me sentía bien, así que me quedé en cama.',
      },
    ],
    optionsPool: [],
    explanationEn:
      "Question to 'you': 'Were you...'. Plural 'Cindy and Tom': 'were there'. Question with 'you': 'Why weren't you there?'. Negative with 'I': 'I wasn't well'.",
    explanationEs:
      "Pregunta a 'you': 'Were you...'. Plural 'Cindy and Tom': 'were there'. Pregunta con 'you': 'Why weren't you there?'. Negativo con 'I': 'I wasn't well'.",
  },

  /* Test 4 (test 4.png, Image 27) */
  {
    id: 'bpr-test-4',
    number: 4,
    type: 'drag-drop',
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    audioPrompt: 'How was your dinner? It wasn\'t very good, the vegetables were too cold.',
    illustrationImg: dinnerWaiterImg,
    dialogueLines: [
      {
        prefix: '- How ',
        prefixEs: '- ¿Cómo ',
        slot: {
          id: 'bpr-t4-s1',
          expectedWord: 'was',
        },
        suffix: ' your dinner?',
        suffixEs: ' tu cena?',
        fullEn: '- How was your dinner?',
        fullEs: '- ¿Cómo estuvo tu cena?',
      },
      {
        prefix: '- It ',
        prefixEs: '- No ',
        slot: {
          id: 'bpr-t4-s2',
          expectedWord: "wasn't",
        },
        middleText: ' very good, the vegetables ',
        middleTextEs: ' muy buena, las verduras ',
        slot2: {
          id: 'bpr-t4-s3',
          expectedWord: 'were',
        },
        suffix: ' too cold.',
        suffixEs: ' demasiado frías.',
        fullEn: "- It wasn't very good, the vegetables were too cold.",
        fullEs: '- No estuvo muy buena, las verduras estaban demasiado frías.',
      },
    ],
    optionsPool: ["weren't", 'were', "wasn't", 'was', "aren't", 'is'],
    explanationEn:
      "Question for singular 'dinner': 'How was your dinner?'. Complaint: 'It wasn't very good'. Plural noun 'the vegetables' takes 'were': 'the vegetables were too cold'.",
    explanationEs:
      "Pregunta para 'dinner' singular: 'How was your dinner?'. Queja: 'It wasn't very good'. Sustantivo plural 'the vegetables' rige 'were': 'the vegetables were too cold'.",
  },

  /* Test 5 (test 5.png, Image 26) */
  {
    id: 'bpr-test-5',
    number: 5,
    type: 'drag-drop',
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    audioPrompt: 'What year were you born? I was born in 1979.',
    dialogueLines: [
      {
        prefix: '- ',
        prefixEs: '- ¿En ',
        slot: {
          id: 'bpr-t5-s1',
          expectedWord: 'What',
        },
        middleText: ' ',
        middleTextEs: ' qué ',
        slot2: {
          id: 'bpr-t5-s2',
          expectedWord: 'year',
        },
        middleText2: ' ',
        middleText2Es: ' ',
        slot3: {
          id: 'bpr-t5-s3',
          expectedWord: 'were',
        },
        suffix: ' you born?',
        suffixEs: ' naciste?',
        fullEn: '- What year were you born?',
        fullEs: '- ¿En qué año naciste?',
      },
      {
        prefix: '- I ',
        prefixEs: '- Yo ',
        slot: {
          id: 'bpr-t5-s4',
          expectedWord: 'was',
        },
        suffix: ' born in 1979.',
        suffixEs: ' nací en 1979.',
        fullEn: '- I was born in 1979.',
        fullEs: '- Nací en 1979.',
      },
    ],
    optionsPool: ['born', 'year', 'was', 'were', 'you', 'What'],
    explanationEn:
      "Fixed idiom for birth year: 'What year were you born?'. Answer with 'I': 'I was born in 1979.'",
    explanationEs:
      "Estructura fija para año de nacimiento: 'What year were you born?'. Respuesta con 'I': 'I was born in 1979.'",
  },

  /* Test 6 (test 6.png, Image 25) */
  {
    id: 'bpr-test-6',
    number: 6,
    type: 'drag-drop',
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    audioPrompt:
      "My books were lost, but I found them. They weren't in your room then, were they? No. They were in a cupboard in the kitchen.",
    dialogueLines: [
      {
        prefix: '- My books ',
        prefixEs: '- Mis libros ',
        slot: {
          id: 'bpr-t6-s1',
          expectedWord: 'were',
        },
        suffix: ' lost, but I found them.',
        suffixEs: ' perdidos, pero los encontré.',
        fullEn: '- My books were lost, but I found them.',
        fullEs: '- Mis libros estaban perdidos, pero los encontré.',
      },
      {
        prefix: '- ',
        prefixEs: '- ¿No ',
        slot: {
          id: 'bpr-t6-s2',
          expectedWord: "They weren't",
        },
        suffix: ' in your room then, were they?',
        suffixEs: ' en tu habitación entonces, ¿verdad?',
        fullEn: "- They weren't in your room then, were they?",
        fullEs: '- No estaban en tu habitación entonces, ¿verdad?',
      },
      {
        prefix: '- No. ',
        prefixEs: '- No. ',
        slot: {
          id: 'bpr-t6-s3',
          expectedWord: 'They were',
        },
        suffix: ' in a cupboard in the kitchen.',
        suffixEs: ' en un armario en la cocina.',
        fullEn: '- No. They were in a cupboard in the kitchen.',
        fullEs: '- No. Estaban en un armario en la cocina.',
      },
    ],
    optionsPool: ["They aren't", 'They were', 'were', "They weren't", 'are'],
    explanationEn:
      "Plural subject 'My books' takes 'were': 'My books were lost'. Negative tag statement: 'They weren't in your room then, were they?'. Affirmative location: 'They were in a cupboard in the kitchen.'",
    explanationEs:
      "Sujeto plural 'My books' rige 'were': 'My books were lost'. Oración con coletilla negativa: 'They weren't in your room then, were they?'. Ubicación afirmativa: 'They were in a cupboard in the kitchen.'",
  },

  /* Test 7 (test 7.png, Image 24) */
  {
    id: 'bpr-test-7',
    number: 7,
    type: 'dropdown',
    instructions: 'Select the correct answer from the drop-down list.',
    instructionsEs: 'Selecciona la respuesta correcta de la lista desplegable.',
    audioPrompt:
      'Why were there a lot of people on the beach yesterday? Well, there was a big race. Was it a marathon? No. It was a ten-kilometer race.',
    dialogueLines: [
      {
        prefix: '- Why ',
        prefixEs: '- ¿Por qué ',
        slot: {
          id: 'bpr-t7-s1',
          expectedWord: 'were there',
          dropdownOptions: ['there are', 'were there', 'are there', 'there were'],
        },
        suffix: ' a lot of people on the beach yesterday?',
        suffixEs: ' tanta gente en la playa ayer?',
        fullEn: '- Why were there a lot of people on the beach yesterday?',
        fullEs: '- ¿Por qué había tanta gente en la playa ayer?',
      },
      {
        prefix: '- Well, ',
        prefixEs: '- Bueno, ',
        slot: {
          id: 'bpr-t7-s2',
          expectedWord: 'there was',
          dropdownOptions: ['is there', 'there is', 'was there', 'there was'],
        },
        suffix: ' a big race.',
        suffixEs: ' una gran carrera.',
        fullEn: '- Well, there was a big race.',
        fullEs: '- Bueno, hubo una gran carrera.',
      },
      {
        prefix: '- ',
        prefixEs: '- ¿',
        slot: {
          id: 'bpr-t7-s3',
          expectedWord: 'Was it',
          dropdownOptions: ['It was', 'It is', 'Is', 'Was it'],
        },
        suffix: ' a marathon?',
        suffixEs: ' un maratón?',
        fullEn: '- Was it a marathon?',
        fullEs: '- ¿Fue un maratón?',
      },
      {
        fullEn: '- No. It was a ten - kilometer race.',
        fullEs: '- No. Fue una carrera de diez kilómetros.',
      },
    ],
    optionsPool: [],
    explanationEn:
      "Plural existence question: 'Why were there a lot of people...?'. Singular affirmative existence: 'there was a big race'. Inverted question: 'Was it a marathon?'.",
    explanationEs:
      "Pregunta de existencia plural: 'Why were there a lot of people...?'. Existencia afirmativa singular: 'there was a big race'. Pregunta invertida: 'Was it a marathon?'.",
  },

  /* Test 8 (test 8.png, Image 23) */
  {
    id: 'bpr-test-8',
    number: 8,
    type: 'drag-drop',
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    audioPrompt: 'How many students were there in your Spanish class last year? Twenty-nine.',
    dialogueLines: [
      {
        prefix: '- ',
        prefixEs: '- ¿',
        slot: {
          id: 'bpr-t8-s1',
          expectedWord: 'How many',
        },
        middleText: ' ',
        middleTextEs: ' ',
        slot2: {
          id: 'bpr-t8-s2',
          expectedWord: 'students',
        },
        middleText2: ' ',
        middleText2Es: ' ',
        slot3: {
          id: 'bpr-t8-s3',
          expectedWord: 'were',
        },
        suffix: ' there in your Spanish class last year?',
        suffixEs: ' en tu clase de español el año pasado?',
        fullEn: '- How many students were there in your Spanish class last year?',
        fullEs: '- ¿Cuántos estudiantes había en tu clase de español el año pasado?',
      },
      {
        fullEn: '- Twenty-nine.',
        fullEs: '- Veintinueve.',
      },
    ],
    optionsPool: ['there', 'were', 'students', 'How many'],
    explanationEn:
      "Plural countable quantifier question: 'How many students were there in your Spanish class last year?'.",
    explanationEs:
      "Pregunta cuantificadora contable plural: 'How many students were there in your Spanish class last year?'.",
  },

  /* Test 9 (test 9.png, Image 22) */
  {
    id: 'bpr-test-9',
    number: 9,
    type: 'drag-drop',
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    audioPrompt:
      "Did you watch the basketball game? Yes. It was terrible, wasn't it? Yes. Two of the star players were sick. Yeah. I know.",
    dialogueLines: [
      {
        fullEn: '- Did you watch the basketball game?',
        fullEs: '- ¿Viste el partido de baloncesto?',
      },
      {
        prefix: '- Yes. It ',
        prefixEs: '- Sí. ',
        slot: {
          id: 'bpr-t9-s1',
          expectedWord: 'was',
        },
        middleText: ' terrible, ',
        middleTextEs: ' terrible, ¿',
        slot2: {
          id: 'bpr-t9-s2',
          expectedWord: "wasn't",
        },
        suffix: ' it?',
        suffixEs: ' verdad?',
        fullEn: "- Yes. It was terrible, wasn't it?",
        fullEs: '- Sí. Estuvo terrible, ¿verdad?',
      },
      {
        prefix: '- Yes. Two of the star players ',
        prefixEs: '- Sí. Dos de los jugadores estrella ',
        slot: {
          id: 'bpr-t9-s3',
          expectedWord: 'were',
        },
        suffix: ' sick.',
        suffixEs: ' enfermos.',
        fullEn: '- Yes. Two of the star players were sick.',
        fullEs: '- Sí. Dos de los jugadores estrella estaban enfermos.',
      },
      {
        fullEn: '- Yeah. I know.',
        fullEs: '- Sí, lo sé.',
      },
    ],
    optionsPool: ["aren't", 'was', 'were', "weren't", "wasn't"],
    explanationEn:
      "Singular event: 'It was terrible'. Negative tag: 'wasn't it?'. Plural subject ('Two of the star players'): 'were sick'.",
    explanationEs:
      "Evento singular: 'It was terrible'. Coletilla negativa: 'wasn't it?'. Sujeto plural ('Two of the star players'): 'were sick'.",
  },

  /* Test 10 (test 10.png, Image 21) */
  {
    id: 'bpr-test-10',
    number: 10,
    type: 'dropdown',
    instructions: 'Select the correct answer from the drop-down list.',
    instructionsEs: 'Selecciona la respuesta correcta de la lista desplegable.',
    audioPrompt:
      'I saw you yesterday at the store. Who were you with? That was my cousin Janice. Does she live here? No. She was just here for the weekend.',
    dialogueLines: [
      {
        prefix: '- I saw you yesterday at the store. Who ',
        prefixEs: '- Te vi ayer en la tienda. ¿Con quién ',
        slot: {
          id: 'bpr-t10-s1',
          expectedWord: 'were',
          dropdownOptions: ['were', 'are', 'was'],
        },
        suffix: ' you with?',
        suffixEs: ' estabas?',
        fullEn: '- I saw you yesterday at the store. Who were you with?',
        fullEs: '- Te vi ayer en la tienda. ¿Con quién estabas?',
      },
      {
        prefix: '- That ',
        prefixEs: '- Esa ',
        slot: {
          id: 'bpr-t10-s2',
          expectedWord: 'was',
          dropdownOptions: ['was', 'were', 'are'],
        },
        suffix: ' my cousin Janice.',
        suffixEs: ' mi prima Janice.',
        fullEn: '- That was my cousin Janice.',
        fullEs: '- Esa era mi prima Janice.',
      },
      {
        fullEn: '- Does she live here?',
        fullEs: '- ¿Ella vive aquí?',
      },
      {
        prefix: '- No. She ',
        prefixEs: '- No. Ella ',
        slot: {
          id: 'bpr-t10-s3',
          expectedWord: 'was',
          dropdownOptions: ['are', 'were', 'was'],
        },
        suffix: ' just here for the weekend.',
        suffixEs: ' solo estuvo aquí por el fin de semana.',
        fullEn: '- No. She was just here for the weekend.',
        fullEs: '- No. Ella solo estuvo aquí por el fin de semana.',
      },
    ],
    optionsPool: [],
    explanationEn:
      "Question to 'you': 'Who were you with?'. Identification of singular person: 'That was my cousin Janice.' Third-person singular 'She': 'She was just here...'.",
    explanationEs:
      "Pregunta a 'you': 'Who were you with?'. Identificación de persona singular: 'That was my cousin Janice.' Tercera persona singular 'She': 'She was just here...'.",
  },
];
