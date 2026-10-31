export interface TagQuestionsTurn {
  id: string;
  speaker: string;
  speakerGender: 'female' | 'male';
  en: string;
  es: string;
  tagEn: string;
  tagEs: string;
  startTime: number;
  endTime: number;
}

export const TAG_QUESTIONS_MAIN_DIALOGUE: TagQuestionsTurn[] = [
  {
    id: 'turn-1',
    speaker: 'Speaker 1',
    speakerGender: 'female',
    en: "You cut your own hair, don't you?",
    es: '¿Te cortas tu propio cabello, verdad?',
    tagEn: "don't you?",
    tagEs: '¿verdad?',
    startTime: 0,
    endTime: 3.5,
  },
  {
    id: 'turn-2',
    speaker: 'Speaker 2',
    speakerGender: 'female',
    en: "Yes, I do. It looks nice, doesn't it?",
    es: 'Sí, lo hago. Se ve bien, ¿no es así?',
    tagEn: "doesn't it?",
    tagEs: '¿no es así?',
    startTime: 3.5,
    endTime: 7,
  },
];

export interface TagQuestionsExerciseItem {
  id: string;
  activityNumber: number;
  instructionEn: string;
  instructionEs: string;
  contextLines: {
    speaker?: string;
    textEn: string;
    textEs: string;
    hasBlank?: boolean;
    prefixEn?: string;
    suffixEn?: string;
    prefixEs?: string;
    suffixEs?: string;
  }[];
  options: {
    id: string;
    textEn: string;
    textEs: string;
  }[];
  correctOptionId: string;
  correctAnswerText: string;
  grammarNoteEn?: string;
  grammarNoteEs?: string;
}

// 10 Drag & Drop / Fill-in Exercises (Activities 2 to 11) from user images
export const TAG_QUESTIONS_ACTIVITIES: TagQuestionsExerciseItem[] = [
  // Actividad 2 (actividad 2.png)
  {
    id: 'tag-q-act-2',
    activityNumber: 2,
    instructionEn: 'Drag the correct answer/s into place.',
    instructionEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar (o haz clic en una opción).',
    contextLines: [
      {
        textEn: "My sister's new boyfriend is a teacher.",
        textEs: 'El nuevo novio de mi hermana es profesor.',
      },
      {
        hasBlank: true,
        prefixEn: "Teachers don't earn much money,",
        suffixEn: '?',
        prefixEs: 'Los profesores no ganan mucho dinero,',
        suffixEs: '?',
        textEn: "Teachers don't earn much money, do they?",
        textEs: 'Los profesores no ganan mucho dinero, ¿verdad?',
      },
      {
        textEn: "No, they don't, but money isn't so important.",
        textEs: 'No, no ganan mucho, pero el dinero no es tan importante.',
      },
    ],
    options: [
      { id: 'opt-dont-they', textEn: "don't they", textEs: '¿no es así?' },
      { id: 'opt-they-do', textEn: 'they do', textEs: 'ellos sí' },
      { id: 'opt-they-dont', textEn: "they don't", textEs: 'ellos no' },
      { id: 'opt-do-they', textEn: 'do they', textEs: '¿verdad? (positivo)' },
    ],
    correctOptionId: 'opt-do-they',
    correctAnswerText: 'do they',
    grammarNoteEn: "Sentence is negative ('don't earn'), so the tag question is affirmative ('do they?').",
    grammarNoteEs: "La oración es negativa ('don't earn'), por lo que la pregunta coletilla (tag question) debe ser afirmativa ('do they?').",
  },

  // Actividad 3 (actividad 3.png)
  {
    id: 'tag-q-act-3',
    activityNumber: 3,
    instructionEn: 'Drag the correct answer/s into place.',
    instructionEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar (o haz clic en una opción).',
    contextLines: [
      {
        textEn: 'We are flying with Arctic Air to London.',
        textEs: 'Volaremos con Arctic Air a Londres.',
      },
      {
        hasBlank: true,
        prefixEn: "Arctic Air? They don't lose luggage,",
        suffixEn: '?',
        prefixEs: '¿Arctic Air? Ellos no pierden equipaje,',
        suffixEs: '?',
        textEn: "Arctic Air? They don't lose luggage, do they?",
        textEs: '¿Arctic Air? Ellos no pierden equipaje, ¿verdad?',
      },
      {
        textEn: "No, they don't.",
        textEs: 'No, no lo pierden.',
      },
    ],
    options: [
      { id: 'opt-they-do', textEn: 'they do', textEs: 'ellos sí' },
      { id: 'opt-do-they', textEn: 'do they', textEs: '¿verdad? (positivo)' },
      { id: 'opt-dont-they', textEn: "don't they", textEs: '¿no es así?' },
    ],
    correctOptionId: 'opt-do-they',
    correctAnswerText: 'do they',
    grammarNoteEn: "Negative statement ('don't lose') requires affirmative tag ('do they?').",
    grammarNoteEs: "Oración negativa ('don't lose') requiere tag afirmativo ('do they?').",
  },

  // Actividad 4 (actividad 4.png)
  {
    id: 'tag-q-act-4',
    activityNumber: 4,
    instructionEn: 'Drag the correct answer/s into place.',
    instructionEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar (o haz clic en una opción).',
    contextLines: [
      {
        hasBlank: true,
        prefixEn: 'You buy a lot of clothes,',
        suffixEn: '?',
        prefixEs: 'Compras mucha ropa,',
        suffixEs: '?',
        textEn: "You buy a lot of clothes, don't you?",
        textEs: 'Compras mucha ropa, ¿no es así?',
      },
      {
        textEn: 'Yes, I do. I bought some more yesterday. I hope they fit.',
        textEs: 'Sí, así es. Compré más ropa ayer. Espero que me queden bien.',
      },
      {
        textEn: "Don't you try them on first?",
        textEs: '¿No te las pruebas primero?',
      },
      {
        textEn: 'Well ... not always.',
        textEs: 'Bueno... no siempre.',
      },
    ],
    options: [
      { id: 'opt-dont-you', textEn: "don't you", textEs: '¿no es así? / ¿verdad?' },
      { id: 'opt-do-you', textEn: 'do you', textEs: '¿lo haces?' },
      { id: 'opt-you-do', textEn: 'you do', textEs: 'tú sí' },
      { id: 'opt-you-dont', textEn: "you don't", textEs: 'tú no' },
    ],
    correctOptionId: 'opt-dont-you',
    correctAnswerText: "don't you",
    grammarNoteEn: "Affirmative statement ('You buy') requires negative tag ('don't you?').",
    grammarNoteEs: "Oración afirmativa ('You buy') requiere tag negativo ('don't you?').",
  },

  // Actividad 5 (actividad 5.png)
  {
    id: 'tag-q-act-5',
    activityNumber: 5,
    instructionEn: 'Drag the correct answer/s into place.',
    instructionEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar (o haz clic en una opción).',
    contextLines: [
      {
        textEn: 'Good morning. Are you the new secretary?',
        textEs: 'Buenos días. ¿Eres la nueva secretaria?',
      },
      {
        textEn: 'Yes, I am.',
        textEs: 'Sí, lo soy.',
      },
      {
        hasBlank: true,
        prefixEn: 'You type,',
        suffixEn: '?',
        prefixEs: 'Escribes a máquina/teclado,',
        suffixEs: '?',
        textEn: "You type, don't you?",
        textEs: 'Escribes a máquina, ¿verdad?',
      },
      {
        textEn: 'Yes, I do.',
        textEs: 'Sí, escribo.',
      },
    ],
    options: [
      { id: 'opt-do-you', textEn: 'do you', textEs: '¿lo haces?' },
      { id: 'opt-you-do', textEn: 'you do', textEs: 'tú sí' },
      { id: 'opt-you-dont', textEn: "you don't", textEs: 'tú no' },
      { id: 'opt-dont-you', textEn: "don't you", textEs: '¿verdad?' },
    ],
    correctOptionId: 'opt-dont-you',
    correctAnswerText: "don't you",
    grammarNoteEn: "Affirmative statement ('You type') requires negative tag ('don't you?').",
    grammarNoteEs: "Oración afirmativa ('You type') requiere tag negativo ('don't you?').",
  },

  // Actividad 6 (actividad 6.png)
  {
    id: 'tag-q-act-6',
    activityNumber: 6,
    instructionEn: 'Drag the correct answer/s into place.',
    instructionEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar (o haz clic en una opción).',
    contextLines: [
      {
        textEn: 'Jesse has a new apartment.',
        textEs: 'Jesse tiene un nuevo apartamento.',
      },
      {
        hasBlank: true,
        prefixEn: 'She rents it,',
        suffixEn: '?',
        prefixEs: 'Ella lo alquila,',
        suffixEs: '?',
        textEn: "She rents it, doesn't she?",
        textEs: 'Ella lo alquila, ¿no es así?',
      },
      {
        textEn: "No, she doesn't. She owns it.",
        textEs: 'No, no lo alquila. Ella es la dueña.',
      },
      {
        textEn: "That's great!",
        textEs: '¡Eso es genial!',
      },
    ],
    options: [
      { id: 'opt-isnt-she', textEn: "isn't she", textEs: '¿no es ella?' },
      { id: 'opt-she-doesnt', textEn: "she doesn't", textEs: 'ella no' },
      { id: 'opt-doesnt-she', textEn: "doesn't she", textEs: '¿no es así?' },
      { id: 'opt-she-does', textEn: 'she does', textEs: 'ella sí' },
    ],
    correctOptionId: 'opt-doesnt-she',
    correctAnswerText: "doesn't she",
    grammarNoteEn: "Affirmative 3rd person singular ('She rents') takes 'doesn't she?'.",
    grammarNoteEs: "Tercera persona afirmativa ('She rents') lleva tag negativo con does: 'doesn't she?'.",
  },

  // Actividad 7 (actividad 7.png)
  {
    id: 'tag-q-act-7',
    activityNumber: 7,
    instructionEn: 'Drag the correct answer/s into place.',
    instructionEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar (o haz clic en una opción).',
    contextLines: [
      {
        textEn: 'Look at Rodriguez!',
        textEs: '¡Mira a Rodríguez!',
      },
      {
        hasBlank: true,
        prefixEn: 'He throws the ball really fast,',
        suffixEn: '?',
        prefixEs: 'Él lanza la pelota muy rápido,',
        suffixEs: '?',
        textEn: "He throws the ball really fast, doesn't he?",
        textEs: 'Él lanza la pelota muy rápido, ¿verdad?',
      },
      {
        textEn: 'Yes, he does.',
        textEs: 'Sí, muy rápido.',
      },
    ],
    options: [
      { id: 'opt-does-he', textEn: 'does he', textEs: '¿lo hace él?' },
      { id: 'opt-doesnt-he', textEn: "doesn't he", textEs: '¿verdad? / ¿no es así?' },
      { id: 'opt-is-he', textEn: 'is he', textEs: '¿está él?' },
      { id: 'opt-he-does', textEn: 'he does', textEs: 'él sí' },
    ],
    correctOptionId: 'opt-doesnt-he',
    correctAnswerText: "doesn't he",
    grammarNoteEn: "'He throws' is affirmative Present Simple, so the tag is 'doesn't he?'.",
    grammarNoteEs: "'He throws' es afirmativo en Present Simple, por ende el tag es 'doesn't he?'.",
  },

  // Actividad 8 (actividad 8.png)
  {
    id: 'tag-q-act-8',
    activityNumber: 8,
    instructionEn: 'Drag the correct answer/s into place.',
    instructionEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar (o haz clic en una opción).',
    contextLines: [
      {
        hasBlank: true,
        prefixEn: 'You like scary movies,',
        suffixEn: '?',
        prefixEs: 'Te gustan las películas de terror,',
        suffixEs: '?',
        textEn: "You like scary movies, don't you?",
        textEs: 'Te gustan las películas de terror, ¿verdad?',
      },
      {
        textEn: 'Yes, I do. Do you?',
        textEs: 'Sí, me gustan. ¿Y a ti?',
      },
      {
        textEn: 'Uh, yes, well ... not very scary ones.',
        textEs: 'Eh, sí, bueno... no las que dan mucho miedo.',
      },
    ],
    options: [
      { id: 'opt-does-he', textEn: 'does he', textEs: '¿él?' },
      { id: 'opt-dont-you', textEn: "don't you", textEs: '¿verdad?' },
      { id: 'opt-you-dont', textEn: "you don't", textEs: 'tú no' },
      { id: 'opt-doesnt-he', textEn: "doesn't he", textEs: '¿no es él?' },
    ],
    correctOptionId: 'opt-dont-you',
    correctAnswerText: "don't you",
    grammarNoteEn: "Affirmative 'You like' requires 'don't you?'.",
    grammarNoteEs: "'You like' afirmativo requiere tag negativo 'don't you?'.",
  },

  // Actividad 9 (actividad 9.png)
  {
    id: 'tag-q-act-9',
    activityNumber: 9,
    instructionEn: 'Drag the correct answer/s into place.',
    instructionEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar (o haz clic en una opción).',
    contextLines: [
      {
        hasBlank: true,
        prefixEn: 'Here is a picture of my mother. I look like her,',
        suffixEn: '?',
        prefixEs: 'Aquí hay una foto de mi madre. Me parezco a ella,',
        suffixEs: '?',
        textEn: 'Here is a picture of my mother. I look like her, don\'t I?',
        textEs: 'Aquí hay una foto de mi madre. Me parezco a ella, ¿verdad?',
      },
      {
        textEn: 'Yes, you do. You look exactly like her!',
        textEs: '¡Sí, te pareces! ¡Te ves exactamente como ella!',
      },
    ],
    options: [
      { id: 'opt-do-i', textEn: 'do I', textEs: '¿lo hago yo?' },
      { id: 'opt-am-i', textEn: 'am I', textEs: '¿soy yo?' },
      { id: 'opt-dont-i', textEn: "don't I", textEs: '¿no es así? / ¿verdad?' },
      { id: 'opt-am-i-not', textEn: 'am I not', textEs: '¿no soy yo?' },
    ],
    correctOptionId: 'opt-dont-i',
    correctAnswerText: "don't I",
    grammarNoteEn: "The main verb is 'look' (action verb in Present Simple), so use 'don't I?'.",
    grammarNoteEs: "El verbo principal es 'look' (Present Simple), así que se usa el auxiliar 'don't I?'.",
  },

  // Actividad 10 (actividad 10.png)
  {
    id: 'tag-q-act-10',
    activityNumber: 10,
    instructionEn: 'Drag the correct answer/s into place.',
    instructionEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar (o haz clic en una opción).',
    contextLines: [
      {
        textEn: 'Do you want to try my hamburger?',
        textEs: '¿Quieres probar mi hamburguesa?',
      },
      {
        textEn: 'No, thank you.',
        textEs: 'No, gracias.',
      },
      {
        hasBlank: true,
        prefixEn: "Oh. You don't eat meat,",
        suffixEn: '?',
        prefixEs: 'Ah. No comes carne,',
        suffixEs: '?',
        textEn: "Oh. You don't eat meat, do you?",
        textEs: 'Ah. No comes carne, ¿verdad?',
      },
      {
        textEn: "No, I don't.",
        textEs: 'No, no como.',
      },
    ],
    options: [
      { id: 'opt-do-you', textEn: 'do you', textEs: '¿verdad? (positivo)' },
      { id: 'opt-dont-you', textEn: "don't you", textEs: '¿no comes?' },
      { id: 'opt-you-do', textEn: 'you do', textEs: 'tú sí' },
      { id: 'opt-you-dont', textEn: "you don't", textEs: 'tú no' },
    ],
    correctOptionId: 'opt-do-you',
    correctAnswerText: 'do you',
    grammarNoteEn: "Negative statement ('You don't eat') takes affirmative tag ('do you?').",
    grammarNoteEs: "Oración negativa ('You don't eat') toma tag afirmativo ('do you?').",
  },

  // Actividad 11 (actividad 11.png)
  {
    id: 'tag-q-act-11',
    activityNumber: 11,
    instructionEn: 'Drag the correct answer/s into place.',
    instructionEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar (o haz clic en una opción).',
    contextLines: [
      {
        hasBlank: true,
        prefixEn: 'You play basketball,',
        suffixEn: '?',
        prefixEs: 'Juegas al baloncesto,',
        suffixEs: '?',
        textEn: "You play basketball, don't you?",
        textEs: 'Juegas al baloncesto, ¿verdad?',
      },
      {
        textEn: 'Yes, I do.',
        textEs: 'Sí, juego.',
      },
      {
        textEn: 'Wow! I see you on TV all the time!',
        textEs: '¡Guau! ¡Te veo en la televisión todo el tiempo!',
      },
    ],
    options: [
      { id: 'opt-did-you', textEn: 'did you', textEs: '¿jugaste?' },
      { id: 'opt-do-you', textEn: 'do you', textEs: '¿juegas?' },
      { id: 'opt-dont-you', textEn: "don't you", textEs: '¿no es así? / ¿verdad?' },
    ],
    correctOptionId: 'opt-dont-you',
    correctAnswerText: "don't you",
    grammarNoteEn: "Affirmative 'You play' in Present Simple takes negative tag 'don't you?'.",
    grammarNoteEs: "'You play' afirmativo en Present Simple lleva tag negativo 'don't you?'.",
  },
];

// 5 Test Questions (from test 1 to test 5 images)
export interface TagQuestionsTestItem {
  id: string;
  testNumber: number;
  instructionEn: string;
  instructionEs: string;
  contextLines: {
    textEn: string;
    textEs: string;
    hasBlank?: boolean;
    prefixEn?: string;
    suffixEn?: string;
  }[];
  options: {
    id: string;
    textEn: string;
    textEs: string;
  }[];
  correctOptionId: string;
  correctAnswerText: string;
  explanationEn: string;
  explanationEs: string;
}

export const TAG_QUESTIONS_TESTS: TagQuestionsTestItem[] = [
  // Test 1 (test 1.png)
  {
    id: 'tag-test-1',
    testNumber: 1,
    instructionEn: 'Drag the correct answer/s into place.',
    instructionEs: 'Arrastra la respuesta correcta al espacio en blanco.',
    contextLines: [
      {
        hasBlank: true,
        prefixEn: 'You understand this question,',
        suffixEn: '?',
        textEn: "You understand this question, don't you?",
        textEs: 'Entiendes esta pregunta, ¿verdad?',
      },
      {
        textEn: "Yes, I do, but I don't know the answer.",
        textEs: 'Sí, la entiendo, pero no sé la respuesta.',
      },
    ],
    options: [
      { id: 'opt-t1-arent-you', textEn: "aren't you", textEs: '¿no eres tú?' },
      { id: 'opt-t1-are-you', textEn: 'are you', textEs: '¿eres tú?' },
      { id: 'opt-t1-do-you', textEn: 'do you', textEs: '¿lo haces?' },
      { id: 'opt-t1-dont-you', textEn: "don't you", textEs: '¿no es así?' },
    ],
    correctOptionId: 'opt-t1-dont-you',
    correctAnswerText: "don't you",
    explanationEn: "Present Simple verb 'understand' requires 'don't you?'.",
    explanationEs: "El verbo en Present Simple 'understand' requiere 'don't you?'.",
  },

  // Test 2 (test 2.png)
  {
    id: 'tag-test-2',
    testNumber: 2,
    instructionEn: 'Drag the correct answer/s into place.',
    instructionEs: 'Arrastra la respuesta correcta al espacio en blanco.',
    contextLines: [
      {
        textEn: 'Do you want a ride to school today?',
        textEs: '¿Quieres que te lleve a la escuela hoy?',
      },
      {
        textEn: 'No, thanks. I walk to school.',
        textEs: 'No, gracias. Camino a la escuela.',
      },
      {
        hasBlank: true,
        prefixEn: "You don't walk to school every day,",
        suffixEn: '?',
        textEn: "You don't walk to school every day, do you?",
        textEs: 'No caminas a la escuela todos los días, ¿o sí?',
      },
      {
        textEn: "Yes, I do. It's great exercise.",
        textEs: 'Sí, lo hago. Es un excelente ejercicio.',
      },
    ],
    options: [
      { id: 'opt-t2-are-you', textEn: 'are you', textEs: '¿eres tú?' },
      { id: 'opt-t2-dont-you', textEn: "don't you", textEs: '¿no es así?' },
      { id: 'opt-t2-arent-you', textEn: "aren't you", textEs: '¿no estás?' },
      { id: 'opt-t2-do-you', textEn: 'do you', textEs: '¿verdad? (positivo)' },
    ],
    correctOptionId: 'opt-t2-do-you',
    correctAnswerText: 'do you',
    explanationEn: "Negative statement ('don't walk') takes positive tag ('do you?').",
    explanationEs: "Oración negativa ('don't walk') toma tag positivo ('do you?').",
  },

  // Test 3 (test 3.png)
  {
    id: 'tag-test-3',
    testNumber: 3,
    instructionEn: 'Drag the correct answer/s into place.',
    instructionEs: 'Arrastra la respuesta correcta al espacio en blanco.',
    contextLines: [
      {
        hasBlank: true,
        prefixEn: 'You live in L.A.,',
        suffixEn: '?',
        textEn: "You live in L.A., don't you?",
        textEs: 'Vives en Los Ángeles, ¿verdad?',
      },
      {
        textEn: 'No. I live in San Francisco.',
        textEs: 'No. Vivo en San Francisco.',
      },
    ],
    options: [
      { id: 'opt-t3-dont-you', textEn: "don't you", textEs: '¿verdad?' },
      { id: 'opt-t3-you-are', textEn: 'you are', textEs: 'tú eres' },
      { id: 'opt-t3-you-dont', textEn: "you don't", textEs: 'tú no' },
      { id: 'opt-t3-are-you', textEn: 'are you', textEs: '¿eres tú?' },
    ],
    correctOptionId: 'opt-t3-dont-you',
    correctAnswerText: "don't you",
    explanationEn: "Positive verb 'live' takes negative tag 'don't you?'.",
    explanationEs: "Verbo positivo 'live' toma tag negativo 'don't you?'.",
  },

  // Test 4 (test 4.png)
  {
    id: 'tag-test-4',
    testNumber: 4,
    instructionEn: 'Drag the correct answer/s into place.',
    instructionEs: 'Arrastra la respuesta correcta al espacio en blanco.',
    contextLines: [
      {
        textEn: "There's a lot of smoke in the house.",
        textEs: 'Hay mucho humo en la casa.',
      },
      {
        hasBlank: true,
        prefixEn: 'Your father smokes,',
        suffixEn: '?',
        textEn: "Your father smokes, doesn't he?",
        textEs: 'Tu padre fuma, ¿verdad?',
      },
      {
        textEn: 'Yes, he does.',
        textEs: 'Sí, fuma.',
      },
    ],
    options: [
      { id: 'opt-t4-isnt-he', textEn: "isn't he", textEs: '¿no es él?' },
      { id: 'opt-t4-doesnt-he', textEn: "doesn't he", textEs: '¿verdad?' },
      { id: 'opt-t4-does-he', textEn: 'does he', textEs: '¿lo hace él?' },
      { id: 'opt-t4-didnt-he', textEn: "didn't he", textEs: '¿no lo hizo él?' },
    ],
    correctOptionId: 'opt-t4-doesnt-he',
    correctAnswerText: "doesn't he",
    explanationEn: "3rd person singular 'smokes' takes 'doesn't he?'.",
    explanationEs: "Tercera persona singular 'smokes' toma 'doesn't he?'.",
  },

  // Test 5 (test 5.png)
  {
    id: 'tag-test-5',
    testNumber: 5,
    instructionEn: 'Drag the correct answer/s into place.',
    instructionEs: 'Arrastra la respuesta correcta al espacio en blanco.',
    contextLines: [
      {
        textEn: "Look. There's Marjorie, talking to Sally.",
        textEs: 'Mira. Ahí está Marjorie, hablando con Sally.',
      },
      {
        hasBlank: true,
        prefixEn: 'She talks a lot,',
        suffixEn: '?',
        textEn: "She talks a lot, doesn't she?",
        textEs: 'Ella habla mucho, ¿no es así?',
      },
      {
        textEn: 'Yes, she does!',
        textEs: '¡Sí, habla muchísimo!',
      },
    ],
    options: [
      { id: 'opt-t5-isnt-she', textEn: "isn't she", textEs: '¿no es ella?' },
      { id: 'opt-t5-is-she', textEn: 'is she', textEs: '¿es ella?' },
      { id: 'opt-t5-doesnt-she', textEn: "doesn't she", textEs: '¿no es así?' },
      { id: 'opt-t5-does-she', textEn: 'does she', textEs: '¿ella sí?' },
    ],
    correctOptionId: 'opt-t5-doesnt-she',
    correctAnswerText: "doesn't she",
    explanationEn: "'She talks' (affirmative Present Simple) takes 'doesn't she?'.",
    explanationEs: "'She talks' (afirmativo en Present Simple) toma 'doesn't she?'.",
  },
];
