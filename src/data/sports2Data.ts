import {
  VocabularyWordItem,
  UnitTestQuestion,
  UnitTestExercise,
  Exercise,
  MatchingExercise as MatchingTableType,
} from '../types';
import sportsFansCheeringImg from '../assets/images/sports_fans_cheering_1789687796558.jpg';

// ========================================================
// 10 Key Vocabulary Words for Unit 4 - Section 7: Sports 2
// ========================================================
export const SPORTS_2_VOCABULARY: VocabularyWordItem[] = [
  {
    id: 's2-w1',
    word: 'athlete',
    translation: 'atleta / deportista',
    partOfSpeech: 'noun',
    partOfSpeechEs: 'sustantivo',
    phonetic: '/ˈæθ.liːt/',
    exampleEn: 'He is a professional athlete who trains every morning.',
    exampleEs: 'Él es un atleta profesional que entrena cada mañana.',
    definitionEn: 'A person who is proficient in sports and other forms of physical exercise.',
    definitionEs: 'Una persona competente en deportes y otras formas de ejercicio físico.',
    imageUrl:
      'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=600&q=80',
    category: 'Deportes',
  },
  {
    id: 's2-w2',
    word: 'basketball',
    translation: 'baloncesto / básquetbol',
    partOfSpeech: 'noun',
    partOfSpeechEs: 'sustantivo',
    phonetic: '/ˈbæs.kɪt.bɔːl/',
    exampleEn: 'Basketball players are usually tall and agile.',
    exampleEs: 'Los jugadores de baloncesto suelen ser altos y ágiles.',
    definitionEn: 'A game played between two teams of five players in which goals are scored by throwing a ball through an elevated net.',
    definitionEs: 'Juego entre dos equipos de cinco jugadores donde se anotan puntos lanzando una pelota a través de una canasta elevada.',
    imageUrl:
      'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=600&q=80',
    category: 'Deportes',
  },
  {
    id: 's2-w3',
    word: 'bicycle',
    translation: 'bicicleta',
    partOfSpeech: 'noun',
    partOfSpeechEs: 'sustantivo',
    phonetic: '/ˈbaɪ.sɪ.kəl/',
    exampleEn: 'He rides his bicycle to the sports club every afternoon.',
    exampleEs: 'Él va en su bicicleta al club deportivo cada tarde.',
    definitionEn: 'A vehicle consisting of two wheels held in a frame one behind the other, propelled with pedals.',
    definitionEs: 'Vehículo de dos ruedas colocadas una detrás de otra impulsado mediante pedales.',
    imageUrl:
      'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=600&q=80',
    category: 'Deportes',
  },
  {
    id: 's2-w4',
    word: 'championship',
    translation: 'campeonato',
    partOfSpeech: 'noun',
    partOfSpeechEs: 'sustantivo',
    phonetic: '/ˈtʃæm.pi.ən.ʃɪp/',
    exampleEn: 'Our team won the championship after a great season.',
    exampleEs: 'Nuestro equipo ganó el campeonato tras una gran temporada.',
    definitionEn: 'A contest for the position of champion in a sport or game.',
    definitionEs: 'Competición para obtener el puesto de campeón en un deporte o juego.',
    imageUrl:
      'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=600&q=80',
    category: 'Deportes',
  },
  {
    id: 's2-w5',
    word: 'exercise',
    translation: 'ejercicio',
    partOfSpeech: 'noun / verb',
    partOfSpeechEs: 'sustantivo / verbo',
    phonetic: '/ˈek.sɚ.saɪz/',
    exampleEn: 'Playing sports is good exercise for maintaining health.',
    exampleEs: 'Practicar deportes es un buen ejercicio para mantener la salud.',
    definitionEn: 'Activity requiring physical effort, carried out to sustain or improve health and fitness.',
    definitionEs: 'Actividad que requiere esfuerzo físico para mantener o mejorar la salud y el estado físico.',
    imageUrl:
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80',
    category: 'Deportes',
  },
  {
    id: 's2-w6',
    word: 'game',
    translation: 'partido / juego',
    partOfSpeech: 'noun',
    partOfSpeechEs: 'sustantivo',
    phonetic: '/ɡeɪm/',
    exampleEn: 'Are you going to the soccer game at the stadium today?',
    exampleEs: '¿Vas al partido de fútbol en el estadio hoy?',
    definitionEn: 'A competitive physical or mental activity played according to rules with at least two sides.',
    definitionEs: 'Actividad competitiva sujeta a reglas entre dos o más lados.',
    imageUrl:
      'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=600&q=80',
    category: 'Deportes',
  },
  {
    id: 's2-w7',
    word: 'player',
    translation: 'jugador / jugadora',
    partOfSpeech: 'noun',
    partOfSpeechEs: 'sustantivo',
    phonetic: '/ˈpleɪ.ɚ/',
    exampleEn: 'He loves watching the professional soccer players on TV.',
    exampleEs: 'A él le encanta ver a los jugadores de fútbol profesional en la televisión.',
    definitionEn: 'A person taking part in a sport or game.',
    definitionEs: 'Persona que participa en un deporte o juego.',
    imageUrl:
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80',
    category: 'Deportes',
  },
  {
    id: 's2-w8',
    word: 'race',
    translation: 'carrera',
    partOfSpeech: 'noun',
    partOfSpeechEs: 'sustantivo',
    phonetic: '/reɪs/',
    exampleEn: 'They are all running fast in the marathon race.',
    exampleEs: 'Todos están corriendo rápido en la carrera de maratón.',
    definitionEn: 'A competition between runners, horses, vehicles, etc. to see which is the fastest in finishing a course.',
    definitionEs: 'Competición entre corredores, vehículos, etc. para ver cuál es el más rápido en completar un recorrido.',
    imageUrl:
      'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?auto=format&fit=crop&w=600&q=80',
    category: 'Deportes',
  },
  {
    id: 's2-w9',
    word: 'stadium',
    translation: 'estadio',
    partOfSpeech: 'noun',
    partOfSpeechEs: 'sustantivo',
    phonetic: '/ˈsteɪ.di.əm/',
    exampleEn: "I'm going to watch a soccer game at the city stadium.",
    exampleEs: 'Voy a ver un partido de fútbol en el estadio de la ciudad.',
    definitionEn: 'A sports arena with tiered seating for spectators surrounding a field or track.',
    definitionEs: 'Recinto deportivo con gradas escalonadas para espectadores alrededor de un campo o pista.',
    imageUrl:
      'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=600&q=80',
    category: 'Deportes',
  },
  {
    id: 's2-w10',
    word: 'win',
    translation: 'ganar',
    partOfSpeech: 'verb',
    partOfSpeechEs: 'verbo',
    phonetic: '/wɪn/',
    exampleEn: 'I hope our favorite team wins the championship game.',
    exampleEs: 'Espero que nuestro equipo favorito gane el partido del campeonato.',
    definitionEn: 'Be successful or victorious in a contest, conflict, or competition.',
    definitionEs: 'Tener éxito o salir victorioso en una competición o contienda.',
    imageUrl:
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80',
    category: 'Deportes',
  },
];

// Export image reference for use across components
export { sportsFansCheeringImg };

// ========================================================
// Actividad 8: Final Unit Test (10 Questions - test 1 to test 10)
// ========================================================
export const SPORTS_2_TEST_QUESTIONS: UnitTestQuestion[] = [
  // Test 1: test 1.png
  {
    id: 's2-test-q1',
    number: 1,
    type: 'dropdown',
    instructions: 'Select the correct answer from the drop-down list.',
    instructionsEs: 'Selecciona la respuesta correcta de la lista desplegable.',
    question: 'Basketball players are usually tall.',
    questionEs: 'Los jugadores de baloncesto suelen ser altos.',
    sentencePrefix: '',
    sentencePrefixEs: 'Los jugadores de',
    sentenceSuffix: 'players are usually tall.',
    sentenceSuffixEs: 'suelen ser altos.',
    imageUrl: sportsFansCheeringImg,
    options: [
      { id: 't1-opt1', text: 'Basketball', textEs: 'Baloncesto', isCorrect: true },
      { id: 't1-opt2', text: 'Bicycle', textEs: 'Bicicleta', isCorrect: false },
      { id: 't1-opt3', text: 'Game', textEs: 'Juego / Partido', isCorrect: false },
    ],
    correctAnswerId: 't1-opt1',
    explanation: '"Basketball" refers to the sport: "Basketball players are usually tall."',
    explanationEs: '"Basketball" (baloncesto) es el deporte adecuado: "Los jugadores de baloncesto suelen ser altos."',
    audioPrompt: 'Basketball players are usually tall.',
    durationSeconds: 15,
  },
  // Test 2: test 2.png
  {
    id: 's2-test-q2',
    number: 2,
    type: 'dropdown',
    instructions: 'Select the correct answer from the drop-down list.',
    instructionsEs: 'Selecciona la respuesta correcta de la lista desplegable.',
    question: 'I left my bicycle on the sidewalk and someone stole it so I had to take the bus home.',
    questionEs: 'Dejé mi bicicleta en la acera y alguien me la robó, así que tuve que tomar el autobús a casa.',
    sentencePrefix: 'I left my',
    sentencePrefixEs: 'Dejé mi',
    sentenceSuffix: 'on the sidewalk and someone stole it so I had to take the bus home.',
    sentenceSuffixEs: 'en la acera y alguien me la robó, así que tuve que tomar el autobús a casa.',
    imageUrl: sportsFansCheeringImg,
    options: [
      { id: 't2-opt1', text: 'basketball', textEs: 'baloncesto', isCorrect: false },
      { id: 't2-opt2', text: 'bicycle', textEs: 'bicicleta', isCorrect: true },
      { id: 't2-opt3', text: 'game', textEs: 'juego / partido', isCorrect: false },
    ],
    correctAnswerId: 't2-opt2',
    explanation: 'A "bicycle" is a vehicle you can leave on the sidewalk and ride home.',
    explanationEs: '"Bicycle" (bicicleta) es el vehículo que se deja en la acera y que pueden robar.',
    audioPrompt: 'I left my bicycle on the sidewalk and someone stole it so I had to take the bus home.',
    durationSeconds: 15,
  },
  // Test 3: test 3.png
  {
    id: 's2-test-q3',
    number: 3,
    type: 'dropdown',
    instructions: 'Select the correct answer from the drop-down list.',
    instructionsEs: 'Selecciona la respuesta correcta de la lista desplegable.',
    question: 'Athletes can make a lot of money playing sports.',
    questionEs: 'Los atletas pueden ganar mucho dinero practicando deportes.',
    sentencePrefix: '',
    sentencePrefixEs: 'Los',
    sentenceSuffix: 'can make a lot of money playing sports.',
    sentenceSuffixEs: 'pueden ganar mucho dinero practicando deportes.',
    imageUrl: sportsFansCheeringImg,
    options: [
      { id: 't3-opt1', text: 'Basketballs', textEs: 'Balones de baloncesto', isCorrect: false },
      { id: 't3-opt2', text: 'Championships', textEs: 'Campeonatos', isCorrect: false },
      { id: 't3-opt3', text: 'Athletes', textEs: 'Atletas', isCorrect: true },
    ],
    correctAnswerId: 't3-opt3',
    explanation: '"Athletes" are people who participate in sports professionally and make money.',
    explanationEs: '"Athletes" (atletas) son las personas que juegan deportes y pueden ganar dinero.',
    audioPrompt: 'Athletes can make a lot of money playing sports.',
    durationSeconds: 15,
  },
  // Test 4: test 4.png
  {
    id: 's2-test-q4',
    number: 4,
    type: 'dropdown',
    instructions: 'Select the correct answer from the drop-down list.',
    instructionsEs: 'Selecciona la respuesta correcta de la lista desplegable.',
    question: 'He won the tennis championship .',
    questionEs: 'Él ganó el campeonato de tenis.',
    sentencePrefix: 'He won the tennis',
    sentencePrefixEs: 'Él ganó el',
    sentenceSuffix: 'championship .',
    sentenceSuffixEs: 'de tenis.',
    imageUrl: sportsFansCheeringImg,
    options: [
      { id: 't4-opt1', text: 'championship', textEs: 'campeonato', isCorrect: true },
      { id: 't4-opt2', text: 'exercise', textEs: 'ejercicio', isCorrect: false },
      { id: 't4-opt3', text: 'race', textEs: 'carrera', isCorrect: false },
    ],
    correctAnswerId: 't4-opt1',
    explanation: 'A tennis "championship" is the tournament or title that an athlete wins.',
    explanationEs: '"Championship" (campeonato) es el título o torneo que se gana: "He won the tennis championship."',
    audioPrompt: 'He won the tennis championship.',
    durationSeconds: 15,
  },
  // Test 5: test 5.png
  {
    id: 's2-test-q5',
    number: 5,
    type: 'dropdown',
    instructions: 'Select the correct answer from the drop-down list.',
    instructionsEs: 'Selecciona la respuesta correcta de la lista desplegable.',
    question: 'Playing sports is good exercise .',
    questionEs: 'Practicar deportes es un buen ejercicio.',
    sentencePrefix: 'Playing sports is good',
    sentencePrefixEs: 'Practicar deportes es un buen',
    sentenceSuffix: '.',
    sentenceSuffixEs: '.',
    imageUrl: sportsFansCheeringImg,
    options: [
      { id: 't5-opt1', text: 'championship', textEs: 'campeonato', isCorrect: false },
      { id: 't5-opt2', text: 'athlete', textEs: 'atleta', isCorrect: false },
      { id: 't5-opt3', text: 'exercise', textEs: 'ejercicio', isCorrect: true },
    ],
    correctAnswerId: 't5-opt3',
    explanation: 'Physical activity like playing sports constitutes healthy "exercise".',
    explanationEs: '"Exercise" (ejercicio) es la actividad física beneficiosa para la salud.',
    audioPrompt: 'Playing sports is good exercise.',
    durationSeconds: 15,
  },
  // Test 6: test 6.png
  {
    id: 's2-test-q6',
    number: 6,
    type: 'dropdown',
    instructions: 'Select the correct answer from the drop-down list.',
    instructionsEs: 'Selecciona la respuesta correcta de la lista desplegable.',
    question: 'Are you going to the soccer game today?',
    questionEs: '¿Vas al partido de fútbol hoy?',
    sentencePrefix: 'Are you going to the soccer',
    sentencePrefixEs: '¿Vas al',
    sentenceSuffix: 'today?',
    sentenceSuffixEs: 'de fútbol hoy?',
    imageUrl: sportsFansCheeringImg,
    options: [
      { id: 't6-opt1', text: 'player', textEs: 'jugador', isCorrect: false },
      { id: 't6-opt2', text: 'race', textEs: 'carrera', isCorrect: false },
      { id: 't6-opt3', text: 'game', textEs: 'partido / juego', isCorrect: true },
    ],
    correctAnswerId: 't6-opt3',
    explanation: 'A soccer match between two teams is called a soccer "game".',
    explanationEs: '"Game" (partido) se utiliza para referirse al encuentro de fútbol.',
    audioPrompt: 'Are you going to the soccer game today?',
    durationSeconds: 15,
  },
  // Test 7: test 7.png
  {
    id: 's2-test-q7',
    number: 7,
    type: 'dropdown',
    instructions: 'Select the correct answer from the drop-down list.',
    instructionsEs: 'Selecciona la respuesta correcta de la lista desplegable.',
    question: 'He loves watching the professional soccer players .',
    questionEs: 'A él le encanta ver a los jugadores de fútbol profesional.',
    sentencePrefix: 'He loves watching the professional soccer',
    sentencePrefixEs: 'A él le encanta ver a los',
    sentenceSuffix: '.',
    sentenceSuffixEs: 'de fútbol profesional.',
    imageUrl: sportsFansCheeringImg,
    options: [
      { id: 't7-opt1', text: 'exercises', textEs: 'ejercicios', isCorrect: false },
      { id: 't7-opt2', text: 'players', textEs: 'jugadores', isCorrect: true },
      { id: 't7-opt3', text: 'stadiums', textEs: 'estadios', isCorrect: false },
    ],
    correctAnswerId: 't7-opt2',
    explanation: '"Players" are the athletes who compete on the pitch.',
    explanationEs: '"Players" (jugadores) son las personas que juegan en el campo.',
    audioPrompt: 'He loves watching the professional soccer players.',
    durationSeconds: 15,
  },
  // Test 8: test 8.png
  {
    id: 's2-test-q8',
    number: 8,
    type: 'dropdown',
    instructions: 'Select the correct answer from the drop-down list.',
    instructionsEs: 'Selecciona la respuesta correcta de la lista desplegable.',
    question: 'They are all running fast in the race .',
    questionEs: 'Todos están corriendo rápido en la carrera.',
    sentencePrefix: 'They are all running fast in the',
    sentencePrefixEs: 'Todos están corriendo rápido en la',
    sentenceSuffix: '.',
    sentenceSuffixEs: '.',
    imageUrl: sportsFansCheeringImg,
    options: [
      { id: 't8-opt1', text: 'race', textEs: 'carrera', isCorrect: true },
      { id: 't8-opt2', text: 'championship', textEs: 'campeonato', isCorrect: false },
      { id: 't8-opt3', text: 'bicycle', textEs: 'bicicleta', isCorrect: false },
    ],
    correctAnswerId: 't8-opt1',
    explanation: 'A running competition where athletes run fast is a "race".',
    explanationEs: '"Race" (carrera) es la competición de velocidad en la que corren los atletas.',
    audioPrompt: 'They are all running fast in the race.',
    durationSeconds: 15,
  },
  // Test 9: test 9.png
  {
    id: 's2-test-q9',
    number: 9,
    type: 'dropdown',
    instructions: 'Select the correct answer from the drop-down list.',
    instructionsEs: 'Selecciona la respuesta correcta de la lista desplegable.',
    question: "I'm going to watch a soccer game at the stadium .",
    questionEs: 'Voy a ver un partido de fútbol en el estadio.',
    sentencePrefix: "I'm going to watch a soccer game at the",
    sentencePrefixEs: 'Voy a ver un partido de fútbol en el',
    sentenceSuffix: '.',
    sentenceSuffixEs: '.',
    imageUrl: sportsFansCheeringImg,
    options: [
      { id: 't9-opt1', text: 'exercise', textEs: 'ejercicio', isCorrect: false },
      { id: 't9-opt2', text: 'race', textEs: 'carrera', isCorrect: false },
      { id: 't9-opt3', text: 'stadium', textEs: 'estadio', isCorrect: true },
    ],
    correctAnswerId: 't9-opt3',
    explanation: 'A "stadium" is the physical venue where large soccer games are held and watched.',
    explanationEs: '"Stadium" (estadio) es el recinto donde se celebran los partidos de fútbol.',
    audioPrompt: "I'm going to watch a soccer game at the stadium.",
    durationSeconds: 15,
  },
  // Test 10: test 10.png
  {
    id: 's2-test-q10',
    number: 10,
    type: 'dropdown',
    instructions: 'Select the correct answer from the drop-down list.',
    instructionsEs: 'Selecciona la respuesta correcta de la lista desplegable.',
    question: 'I hope our team wins the game.',
    questionEs: 'Espero que nuestro equipo gane el partido.',
    sentencePrefix: 'I hope our team',
    sentencePrefixEs: 'Espero que nuestro equipo',
    sentenceSuffix: 'the game.',
    sentenceSuffixEs: 'el partido.',
    imageUrl: sportsFansCheeringImg,
    options: [
      { id: 't10-opt1', text: 'wins', textEs: 'gane / triunfe', isCorrect: true },
      { id: 't10-opt2', text: 'races', textEs: 'corra', isCorrect: false },
      { id: 't10-opt3', text: 'exercises', textEs: 'se ejercite', isCorrect: false },
    ],
    correctAnswerId: 't10-opt1',
    explanation: 'To "win" a game means to defeat the opposing team and achieve victory.',
    explanationEs: '"Wins" (ganar el partido) es el verbo correcto para salir victorioso en un juego.',
    audioPrompt: 'I hope our team wins the game.',
    durationSeconds: 15,
  },
];

// ========================================================
// Actividad 8: Final Unit Test (10 Questions Object)
// ========================================================
export const SPORTS_2_TEST_EXERCISE: UnitTestExercise = {
  id: 'sports2-act8-test',
  type: 'unit-test',
  title: 'Actividad 8: Test',
  titleEs: 'Actividad 8: Test',
  subtitle: 'Mastery Test · 10 Tests',
  subtitleEs: 'Evaluación de Dominio · 10 Tests',
  description:
    'Select the correct answer from the drop-down list for each sentence. Complete all 10 tests to verify your mastery.',
  descriptionEs:
    'Selecciona la respuesta correcta de la lista desplegable para cada oración. Completa los 10 tests para verificar tu dominio.',
  totalQuestions: 10,
  vocabularyWords: SPORTS_2_VOCABULARY,
  questions: SPORTS_2_TEST_QUESTIONS,
};

// ========================================================
// 7 Sequential Activities for Section 7: Sports 2
// Followed by Actividad 8: Final Unit Test (10 Tests)
// ========================================================
export const SPORTS_2_EXERCISES: Exercise[] = [
  // ----------------------------------------------------
  // Actividad 1: Vocabulary Explore (actividad 1.png)
  // ----------------------------------------------------
  {
    id: 'sports2-act1-explore',
    type: 'vocabulary-explore',
    title: 'Actividad 1',
    titleEs: 'Actividad 1',
    instructions:
      'Read the list of words and phrases. Read the example sentences. Listen to the recordings and practice saying the words and phrases. Mark any words you would like to review later.',
    instructionsEs:
      'Lee la lista de palabras y frases. Lee las oraciones de ejemplo. Escucha las grabaciones y practica pronunciar las palabras y frases. Marca las palabras que te gustaría repasar más tarde.',
    words: SPORTS_2_VOCABULARY,
  },

  // ----------------------------------------------------
  // Actividad 2: Matching Table (actividad 2.png)
  // ----------------------------------------------------
  {
    id: 'sports2-act2-matching',
    type: 'matching-table',
    title: 'Actividad 2',
    titleEs: 'Actividad 2',
    instructions:
      'Complete the phrases by dragging the correct word from the bank to column B.',
    instructionsEs:
      'Completa las frases arrastrando la palabra correcta del banco a la columna B.',
    columnAHeader: 'A',
    columnAHeaderEs: 'A',
    columnBHeader: 'B',
    columnBHeaderEs: 'B',
    pairs: [
      {
        id: 's2-pair-1',
        field: 'win',
        fieldEs: 'ganar',
        correctValue: 'a championship',
        correctValueEs: 'un campeonato',
      },
      {
        id: 's2-pair-2',
        field: 'play',
        fieldEs: 'jugar al',
        correctValue: 'basketball',
        correctValueEs: 'baloncesto',
      },
      {
        id: 's2-pair-3',
        field: 'ride',
        fieldEs: 'montar en',
        correctValue: 'a bicycle',
        correctValueEs: 'una bicicleta',
      },
      {
        id: 's2-pair-4',
        field: 'do',
        fieldEs: 'hacer',
        correctValue: 'exercise',
        correctValueEs: 'ejercicio',
      },
      {
        id: 's2-pair-5',
        field: 'professional',
        fieldEs: 'profesional',
        correctValue: 'athlete',
        correctValueEs: 'atleta',
      },
    ],
    optionsPool: [
      'a championship',
      'basketball',
      'athlete',
      'exercise',
      'a bicycle',
    ],
    optionsPoolEs: {
      'a championship': 'un campeonato',
      'basketball': 'baloncesto',
      'athlete': 'atleta',
      'exercise': 'ejercicio',
      'a bicycle': 'una bicicleta',
    },
  } as MatchingTableType,

  // ----------------------------------------------------
  // Actividad 3: Dictation 1 (actividad 3.png)
  // ----------------------------------------------------
  {
    id: 'sports2-act3-dictation',
    type: 'vocabulary-dictation',
    title: 'Actividad 3',
    titleEs: 'Actividad 3',
    instructions:
      'Type the sentences that you hear in the dictation. Pay attention to punctuation.',
    instructionsEs:
      'Escribe las oraciones que escuchas en el dictado. Presta atención a la puntuación.',
    vocabularyWords: SPORTS_2_VOCABULARY.slice(0, 5),
    items: [
      {
        id: 's2d-1',
        sentenceEn: 'He is a professional athlete who trains every morning.',
        sentenceEs: 'Él es un atleta profesional que entrena cada mañana.',
        audioText: 'He is a professional athlete who trains every morning.',
      },
      {
        id: 's2d-2',
        sentenceEn: 'Basketball players are usually very tall and fast.',
        sentenceEs: 'Los jugadores de baloncesto suelen ser muy altos y rápidos.',
        audioText: 'Basketball players are usually very tall and fast.',
      },
      {
        id: 's2d-3',
        sentenceEn: 'She rides her bicycle to work every single day.',
        sentenceEs: 'Ella va en su bicicleta al trabajo todos los días.',
        audioText: 'She rides her bicycle to work every single day.',
      },
      {
        id: 's2d-4',
        sentenceEn: 'Our local team won the national championship this year.',
        sentenceEs: 'Nuestro equipo local ganó el campeonato nacional este año.',
        audioText: 'Our local team won the national championship this year.',
      },
      {
        id: 's2d-5',
        sentenceEn: 'Playing sports is good exercise for your heart.',
        sentenceEs: 'Practicar deportes es un buen ejercicio para tu corazón.',
        audioText: 'Playing sports is good exercise for your heart.',
      },
    ],
  },

  // ----------------------------------------------------
  // Actividad 4: Dictation 2 (actividad 4.png)
  // ----------------------------------------------------
  {
    id: 'sports2-act4-dictation',
    type: 'vocabulary-dictation',
    title: 'Actividad 4',
    titleEs: 'Actividad 4',
    instructions:
      'Type the sentences that you hear in the dictation. Pay attention to punctuation.',
    instructionsEs:
      'Escribe las oraciones que escuchas en el dictado. Presta atención a la puntuación.',
    vocabularyWords: SPORTS_2_VOCABULARY.slice(5, 10),
    items: [
      {
        id: 's2d-6',
        sentenceEn: 'Are you going to the soccer game tonight?',
        sentenceEs: '¿Vas al partido de fútbol esta noche?',
        audioText: 'Are you going to the soccer game tonight?',
      },
      {
        id: 's2d-7',
        sentenceEn: 'He is the most talented player on the court.',
        sentenceEs: 'Él es el jugador con más talento en la cancha.',
        audioText: 'He is the most talented player on the court.',
      },
      {
        id: 's2d-8',
        sentenceEn: 'They are all running fast in the long distance race.',
        sentenceEs: 'Todos están corriendo rápido en la carrera de larga distancia.',
        audioText: 'They are all running fast in the long distance race.',
      },
      {
        id: 's2d-9',
        sentenceEn: "I'm going to watch a football game at the stadium.",
        sentenceEs: 'Voy a ver un partido de fútbol en el estadio.',
        audioText: "I'm going to watch a football game at the stadium.",
      },
      {
        id: 's2d-10',
        sentenceEn: 'I hope our favorite team wins the championship game.',
        sentenceEs: 'Espero que nuestro equipo favorito gane el partido del campeonato.',
        audioText: 'I hope our favorite team wins the championship game.',
      },
    ],
  },

  // ----------------------------------------------------
  // Actividad 5: Drag & Drop Cloze 1 (actividad 5.png)
  // ----------------------------------------------------
  {
    id: 'sports2-act5-cloze-1',
    type: 'drag-drop-cloze',
    title: 'Actividad 5',
    titleEs: 'Actividad 5',
    storyTitle: 'The Big Championship Game',
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    template:
      'Carlos is a talented young [b1] who dreams of becoming a professional [b2]. Every morning, he rides his [b3] to the sports club to do rigorous [b4]. Today, his entire team has gathered on the field with one collective ambition: to [b5] the regional trophy.',
    translationEs:
      'Carlos es un joven jugador talentoso que sueña con convertirse en un atleta profesional. Cada mañana, va en su bicicleta al club deportivo para hacer un ejercicio riguroso. Hoy, todo su equipo se ha reunido en el campo con una ambición colectiva: ganar el trofeo regional.',
    blanks: [
      { id: 'b1', correctAnswer: 'player' },
      { id: 'b2', correctAnswer: 'athlete' },
      { id: 'b3', correctAnswer: 'bicycle' },
      { id: 'b4', correctAnswer: 'exercise' },
      { id: 'b5', correctAnswer: 'win' },
    ],
    wordBank: ['player', 'athlete', 'bicycle', 'exercise', 'win'],
    vocabularyWords: [
      SPORTS_2_VOCABULARY[0], // athlete
      SPORTS_2_VOCABULARY[2], // bicycle
      SPORTS_2_VOCABULARY[4], // exercise
      SPORTS_2_VOCABULARY[6], // player
      SPORTS_2_VOCABULARY[9], // win
    ],
  },

  // ----------------------------------------------------
  // Actividad 6: Dialogue Dropdown (actividad 6.png)
  // ----------------------------------------------------
  {
    id: 'sports2-act6-dialogue',
    type: 'dialogue-dropdown',
    title: 'Actividad 6',
    titleEs: 'Actividad 6',
    instructions: 'Select the correct answer from the drop-down list.',
    instructionsEs: 'Selecciona la respuesta correcta de la lista desplegable.',
    lines: [
      {
        speaker: 'Sam',
        textEn: 'Are you ready for the soccer [b1] this afternoon?',
        textEs: '¿Estás listo para el partido de fútbol esta tarde?',
      },
      {
        speaker: 'Leo',
        textEn: 'Yes! We should leave early because the [b2] will be completely full.',
        textEs: '¡Sí! Deberíamos salir temprano porque el estadio estará completamente lleno.',
      },
      {
        speaker: 'Sam',
        textEn: 'Do you think our star [b3] is recovered and ready to play today?',
        textEs: '¿Crees que nuestro jugador estrella esté recuperado y listo para jugar hoy?',
      },
      {
        speaker: 'Leo',
        textEn: 'Definitely! If he plays at his best level, we can easily [b4] the match.',
        textEs: '¡Definitivamente! Si juega a su mejor nivel, podemos ganar fácilmente el partido.',
      },
      {
        speaker: 'Sam',
        textEn: 'Awesome! That will bring us one step closer to the national [b5]!',
        textEs: '¡Genial! ¡Eso nos acercará un paso más al campeonato nacional!',
      },
    ],
    blanks: [
      {
        id: 'b1',
        options: ['game', 'bicycle', 'exercise'],
        correctAnswer: 'game',
      },
      {
        id: 'b2',
        options: ['stadium', 'race', 'player'],
        correctAnswer: 'stadium',
      },
      {
        id: 'b3',
        options: ['player', 'championship', 'bicycle'],
        correctAnswer: 'player',
      },
      {
        id: 'b4',
        options: ['win', 'race', 'exercise'],
        correctAnswer: 'win',
      },
      {
        id: 'b5',
        options: ['championship', 'athlete', 'game'],
        correctAnswer: 'championship',
      },
    ],
    vocabularyWords: [
      SPORTS_2_VOCABULARY[3], // championship
      SPORTS_2_VOCABULARY[5], // game
      SPORTS_2_VOCABULARY[6], // player
      SPORTS_2_VOCABULARY[8], // stadium
      SPORTS_2_VOCABULARY[9], // win
    ],
  },

  // ----------------------------------------------------
  // Actividad 7: Drag & Drop Cloze 2 (actividad 7.png)
  // ----------------------------------------------------
  {
    id: 'sports2-act7-cloze-2',
    type: 'drag-drop-cloze',
    title: 'Actividad 7',
    titleEs: 'Actividad 7',
    storyTitle: 'The Weekend Sports Festival',
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    template:
      'Every summer, our city organizes a huge sports festival. In the morning, thousands of runners participate in a ten-kilometer [b1] across the city. Spectators pack into the local [b2] to applaud every exhausted but determined [b3]. Families and teenagers also gather at the park to play [b4] on the outdoor courts. It is a wonderful celebration of fitness and healthy daily [b5].',
    translationEs:
      'Cada verano, nuestra ciudad organiza un gran festival deportivo. Por la mañana, miles de corredores participan en una carrera de diez kilómetros por la ciudad. Los espectadores se aglomeran en el estadio local para aplaudir a cada atleta exhausto pero decidido. Las familias y los adolescentes también se reúnen en el parque para jugar al baloncesto en las canchas al aire libre. Es una maravillosa celebración del buen estado físico y el ejercicio diario saludable.',
    blanks: [
      { id: 'b1', correctAnswer: 'race' },
      { id: 'b2', correctAnswer: 'stadium' },
      { id: 'b3', correctAnswer: 'athlete' },
      { id: 'b4', correctAnswer: 'basketball' },
      { id: 'b5', correctAnswer: 'exercise' },
    ],
    wordBank: ['race', 'stadium', 'athlete', 'basketball', 'exercise'],
    vocabularyWords: [
      SPORTS_2_VOCABULARY[0], // athlete
      SPORTS_2_VOCABULARY[1], // basketball
      SPORTS_2_VOCABULARY[4], // exercise
      SPORTS_2_VOCABULARY[7], // race
      SPORTS_2_VOCABULARY[8], // stadium
    ],
  },

  // ----------------------------------------------------
  // Actividad 8: Final Mastery Test (10 Tests: test 1 - test 10)
  // ----------------------------------------------------
  SPORTS_2_TEST_EXERCISE,
];
