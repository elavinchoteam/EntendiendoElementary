import radioHostImg from '../assets/images/radio_host_jack_1789512525649.jpg';
import baseballPlayerImg from '../assets/images/baseball_player_batting_1789512544551.jpg';
import soccerGirlsImg from '../assets/images/soccer_girls_playing_1789512558178.jpg';
import bicycleRaceImg from '../assets/images/bicycle_race_road_1789512576538.jpg';
import tennisPlayerImg from '../assets/images/tennis_player_court_1789512592474.jpg';
import swimmerWaterImg from '../assets/images/swimmer_pool_water_1789512607750.jpg';

export {
  radioHostImg,
  baseballPlayerImg,
  soccerGirlsImg,
  bicycleRaceImg,
  tennisPlayerImg,
  swimmerWaterImg,
};

export interface SportsSentence {
  id: string;
  en: string;
  es: string;
  startTime: number;
  endTime: number;
  paragraph?: number;
}

export const SPORTS_SENTENCES: SportsSentence[] = [
  {
    id: 'sp-line-1',
    en: "Good evening. This is Jack Hill, and here is today's sports!",
    es: "Buenas noches. ¡Les habla Jack Hill, y aquí están los deportes de hoy!",
    startTime: 0,
    endTime: 6,
    paragraph: 1,
  },
  {
    id: 'sp-line-2',
    en: "First, baseball. Toronto is in first place.",
    es: "Primero, béisbol. Toronto está en primer lugar.",
    startTime: 6,
    endTime: 11,
    paragraph: 2,
  },
  {
    id: 'sp-line-3',
    en: "Sam Wilson says that his team is going to win the championship this year.",
    es: "Sam Wilson dice que su equipo va a ganar el campeonato este año.",
    startTime: 11,
    endTime: 17,
    paragraph: 2,
  },
  {
    id: 'sp-line-4',
    en: "But, he says that every year.",
    es: "Pero él dice eso todos los años.",
    startTime: 17,
    endTime: 21,
    paragraph: 2,
  },
  {
    id: 'sp-line-5',
    en: "In soccer, Bill Brown had the best game of his career.",
    es: "En fútbol, Bill Brown tuvo el mejor partido de su carrera.",
    startTime: 21,
    endTime: 27,
    paragraph: 3,
  },
  {
    id: 'sp-line-6',
    en: "The Tour de France bicycle race started yesterday in Paris at 3 o'clock.",
    es: "La carrera ciclista del Tour de Francia comenzó ayer en París a las 3 en punto.",
    startTime: 27,
    endTime: 34,
    paragraph: 3,
  },
  {
    id: 'sp-line-7',
    en: "Last year, Jacques Chardin won for France.",
    es: "El año pasado, Jacques Chardin ganó para Francia.",
    startTime: 34,
    endTime: 39,
    paragraph: 3,
  },
  {
    id: 'sp-line-8',
    en: "Can he do it again? I don't know ...",
    es: "¿Podrá hacerlo de nuevo? No lo sé...",
    startTime: 39,
    endTime: 44,
    paragraph: 3,
  },
  {
    id: 'sp-line-9',
    en: "In California, the Children's Olympics started yesterday.",
    es: "En California, las Olimpiadas Infantiles comenzaron ayer.",
    startTime: 44,
    endTime: 49,
    paragraph: 4,
  },
  {
    id: 'sp-line-10',
    en: "Good luck to all the 600 boys and girls.",
    es: "Buena suerte a todos los 600 niños y niñas.",
    startTime: 49,
    endTime: 54,
    paragraph: 4,
  },
  {
    id: 'sp-line-11',
    en: "And, finally, tennis.",
    es: "Y, finalmente, tenis.",
    startTime: 54,
    endTime: 57,
    paragraph: 5,
  },
  {
    id: 'sp-line-12',
    en: "Tonight is the big tennis match between rock star Maxi and the famous actor, Peter Anson.",
    es: "Esta noche es el gran partido de tenis entre la estrella de rock Maxi y el famoso actor Peter Anson.",
    startTime: 57,
    endTime: 63,
    paragraph: 6,
  },
  {
    id: 'sp-line-13',
    en: "This is Jack Hill, and that was the sports.",
    es: "Les habló Jack Hill, y esos fueron los deportes.",
    startTime: 63,
    endTime: 67,
    paragraph: 6,
  },
];

export const SPORTS_AUDIO_TEXT =
  "Good evening. This is Jack Hill, and here is today's sports! First, baseball. Toronto is in first place. Sam Wilson says that his team is going to win the championship this year. But, he says that every year. In soccer, Bill Brown had the best game of his career. The Tour de France bicycle race started yesterday in Paris at 3 o'clock. Last year, Jacques Chardin won for France. Can he do it again? I don't know ... In California, the Children's Olympics started yesterday. Good luck to all the 600 boys and girls. And, finally, tennis. Tonight is the big tennis match between rock star Maxi and the famous actor, Peter Anson. This is Jack Hill, and that was the sports.";

export const SPORTS_FULL_ES =
  "Buenas noches. ¡Les habla Jack Hill, y aquí están los deportes de hoy! Primero, béisbol. Toronto está en primer lugar. Sam Wilson dice que su equipo va a ganar el campeonato este año. Pero él dice eso todos los años. En fútbol, Bill Brown tuvo el mejor partido de su carrera. La carrera ciclista del Tour de Francia comenzó ayer en París a las 3 en punto. El año pasado, Jacques Chardin ganó para Francia. ¿Podrá hacerlo de nuevo? No lo sé... En California, las Olimpiadas Infantiles comenzaron ayer. Buena suerte a todos los 600 niños y niñas. Y, finalmente, tenis. Esta noche es el gran partido de tenis entre la estrella de rock Maxi y el famoso actor Peter Anson. Les habló Jack Hill, y esos fueron los deportes.";

// Actividad 2 Data: Match pictures with text
export interface SportsPictureMatchItem {
  id: string;
  text: string;
  textEs: string;
  image: string;
  alt: string;
}

export const ACTIVITY_2_PICTURES: SportsPictureMatchItem[] = [
  {
    id: 'pic-baseball',
    text: 'baseball',
    textEs: 'béisbol',
    image: baseballPlayerImg,
    alt: 'Baseball player batting on field',
  },
  {
    id: 'pic-soccer',
    text: 'soccer',
    textEs: 'fútbol',
    image: soccerGirlsImg,
    alt: 'Girls playing soccer on grass field',
  },
  {
    id: 'pic-bicycle',
    text: 'bicycle race',
    textEs: 'carrera ciclista',
    image: bicycleRaceImg,
    alt: 'Cyclists in a road bicycle race',
  },
  {
    id: 'pic-tennis',
    text: 'tennis',
    textEs: 'tenis',
    image: tennisPlayerImg,
    alt: 'Tennis player swinging racket on court',
  },
  {
    id: 'pic-swimming',
    text: 'swimming',
    textEs: 'natación',
    image: swimmerWaterImg,
    alt: 'Swimmer in blue pool water with goggles',
  },
];

export const ACTIVITY_2_OPTIONS = [
  'bicycle race',
  'baseball',
  'tennis',
  'swimming',
  'soccer',
];

// Actividad 3 Data: Match player to sport
export interface SportsPlayerMatchItem {
  id: string;
  player: string;
  playerEs: string;
  correctSport: string;
  sportEs: string;
}

export const ACTIVITY_3_PLAYERS: SportsPlayerMatchItem[] = [
  {
    id: 'pl-sam-wilson',
    player: 'Sam Wilson',
    playerEs: 'Sam Wilson',
    correctSport: 'baseball',
    sportEs: 'béisbol',
  },
  {
    id: 'pl-bill-brown',
    player: 'Bill Brown',
    playerEs: 'Bill Brown',
    correctSport: 'soccer',
    sportEs: 'fútbol',
  },
  {
    id: 'pl-jacques-chardin',
    player: 'Jacques Chardin',
    playerEs: 'Jacques Chardin',
    correctSport: 'bicycle racing',
    sportEs: 'carreras ciclistas / ciclismo',
  },
  {
    id: 'pl-maxi-peter',
    player: 'Maxi and Peter Anson',
    playerEs: 'Maxi y Peter Anson',
    correctSport: 'tennis',
    sportEs: 'tenis',
  },
];

export const ACTIVITY_3_OPTIONS = [
  'tennis',
  'soccer',
  'baseball',
  'bicycle racing',
];

// Actividad 4 Data: Listen to clips and answer
export interface SportsClipQuestion {
  id: string;
  audioClipText: string;
  question: string;
  questionEs: string;
  options: {
    id: string;
    text: string;
    textEs: string;
    isCorrect: boolean;
  }[];
  explanation: string;
  explanationEs: string;
}

export const ACTIVITY_4_QUESTIONS: SportsClipQuestion[] = [
  {
    id: 'clip-q1',
    audioClipText:
      "Sam Wilson says that his team is going to win the championship this year. But, he says that every year.",
    question: "How does Sam Wilson feel about the championship game this year?",
    questionEs: "¿Cómo se siente Sam Wilson sobre el partido de campeonato este año?",
    options: [
      {
        id: 'c1-opt-1',
        text: "He's sure his team is going to win.",
        textEs: "Está seguro de que su equipo va a ganar.",
        isCorrect: true,
      },
      {
        id: 'c1-opt-2',
        text: "He doesn't think his team will win this year.",
        textEs: "No cree que su equipo gane este año.",
        isCorrect: false,
      },
      {
        id: 'c1-opt-3',
        text: "He says that his team won last year and will win this year.",
        textEs: "Dice que su equipo ganó el año pasado y ganará este año.",
        isCorrect: false,
      },
    ],
    explanation:
      "Jack Hill states that 'Sam Wilson says that his team is going to win the championship this year', showing he is confident.",
    explanationEs:
      "Jack Hill informa que 'Sam Wilson dice que su equipo va a ganar el campeonato este año', lo que demuestra que está seguro de la victoria.",
  },
  {
    id: 'clip-q2',
    audioClipText:
      "In California, the Children's Olympics started yesterday. Good luck to all the 600 boys and girls.",
    question: "What event is taking place in California?",
    questionEs: "¿Qué evento se está llevando a cabo en California?",
    options: [
      {
        id: 'c2-opt-1',
        text: "the Children's Olympics",
        textEs: "las Olimpiadas Infantiles",
        isCorrect: true,
      },
      {
        id: 'c2-opt-2',
        text: "the Tour de France",
        textEs: "el Tour de Francia",
        isCorrect: false,
      },
      {
        id: 'c2-opt-3',
        text: "the big tennis match",
        textEs: "el gran partido de tenis",
        isCorrect: false,
      },
    ],
    explanation:
      "The report explicitly announces: 'In California, the Children's Olympics started yesterday.'",
    explanationEs:
      "El informe anuncia explícitamente: 'En California, las Olimpiadas Infantiles comenzaron ayer.'",
  },
  {
    id: 'clip-q3',
    audioClipText: "Good luck to all the 600 boys and girls.",
    question: "How many children are participating in the Children's Olympics?",
    questionEs: "¿Cuántos niños están participando en las Olimpiadas Infantiles?",
    options: [
      { id: 'c3-opt-1', text: "300", textEs: "300", isCorrect: false },
      { id: 'c3-opt-2', text: "600", textEs: "600", isCorrect: true },
      { id: 'c3-opt-3', text: "800", textEs: "800", isCorrect: false },
    ],
    explanation:
      "Jack Hill sends good luck to 'all the 600 boys and girls'.",
    explanationEs:
      "Jack Hill les desea buena suerte a 'todos los 600 niños y niñas'.",
  },
];

// Actividad 5 Part 1 Data: True or False (4 statements)
export interface SportsTrueFalseItem {
  id: string;
  statement: string;
  statementEs: string;
  isTrue: boolean;
  explanation: string;
  explanationEs: string;
}

export const ACTIVITY_5_TRUE_FALSE: SportsTrueFalseItem[] = [
  {
    id: 'tf-1',
    statement: "Jack Hill is presenting the sports show.",
    statementEs: "Jack Hill está presentando el programa deportivo.",
    isTrue: true,
    explanation:
      "Jack Hill introduces himself: 'This is Jack Hill, and here is today's sports!'",
    explanationEs:
      "Jack Hill se presenta al inicio: 'Les habla Jack Hill, y aquí están los deportes de hoy.'",
  },
  {
    id: 'tf-2',
    statement: "Bill Brown played better in the last game.",
    statementEs: "Bill Brown jugó mejor en el partido anterior.",
    isTrue: false,
    explanation:
      "The broadcast says Bill Brown had 'the best game of his career', not that he played better previously.",
    explanationEs:
      "La transmisión indica que Bill Brown tuvo 'el mejor partido de su carrera', no que jugó mejor en el partido anterior.",
  },
  {
    id: 'tf-3',
    statement: "Jack Hill doesn't think Chardin will win the race this year.",
    statementEs: "Jack Hill no cree que Chardin gane la carrera este año.",
    isTrue: true,
    explanation:
      "Jack Hill wonders: 'Can he do it again? I don't know ...', showing doubt.",
    explanationEs:
      "Jack Hill duda diciendo: '¿Podrá hacerlo de nuevo? No lo sé...', mostrando escepticismo.",
  },
  {
    id: 'tf-4',
    statement: "Two singers are playing in the big tennis match.",
    statementEs: "Dos cantantes están jugando en el gran partido de tenis.",
    isTrue: false,
    explanation:
      "The match is between rock star Maxi (one musician) and actor Peter Anson (an actor), not two singers.",
    explanationEs:
      "El partido es entre la estrella de rock Maxi (cantante) y el actor Peter Anson (actor), no dos cantantes.",
  },
];

// Actividad 5 Part 2 Data: Choose best answers (2 questions)
export interface SportsMultipleChoiceItem {
  id: string;
  question: string;
  questionEs: string;
  options: {
    id: string;
    text: string;
    textEs: string;
    isCorrect: boolean;
  }[];
  explanation: string;
  explanationEs: string;
}

export const ACTIVITY_5_QUESTIONS: SportsMultipleChoiceItem[] = [
  {
    id: 'mc-1',
    question: "The radio program is for people who...",
    questionEs: "El programa de radio es para personas a las que...",
    options: [
      { id: 'mc1-opt-1', text: "like reading.", textEs: "les gusta leer.", isCorrect: false },
      { id: 'mc1-opt-2', text: "don't like sports.", textEs: "no les gustan los deportes.", isCorrect: false },
      { id: 'mc1-opt-3', text: "play sports.", textEs: "practican deportes.", isCorrect: false },
      { id: 'mc1-opt-4', text: "like sports.", textEs: "les gustan los deportes.", isCorrect: true },
    ],
    explanation:
      "A sports news show reporting on baseball, soccer, cycling, Olympics, and tennis is aimed at people who like sports.",
    explanationEs:
      "Un programa de noticias deportivas sobre béisbol, fútbol, ciclismo y tenis está dirigido a personas a las que les gustan los deportes.",
  },
  {
    id: 'mc-2',
    question: "The radio program talks about...",
    questionEs: "El programa de radio habla sobre...",
    options: [
      { id: 'mc2-opt-1', text: "today's sports.", textEs: "los deportes de hoy.", isCorrect: true },
      { id: 'mc2-opt-2', text: "yesterday's sports.", textEs: "los deportes de ayer.", isCorrect: false },
      { id: 'mc2-opt-3', text: "last week's sports.", textEs: "los deportes de la semana pasada.", isCorrect: false },
      { id: 'mc2-opt-4', text: "tomorrow's sports.", textEs: "los deportes de mañana.", isCorrect: false },
    ],
    explanation:
      "Jack Hill says right at the start: '...and here is today's sports!'",
    explanationEs:
      "Jack Hill dice al comienzo: '...and here is today's sports!' (¡y aquí están los deportes de hoy!).",
  },
];

// Actividad 6: Test Data (5 tests)
export interface SportsTestQuestion {
  id: string;
  testNumber: number;
  type: 'radio' | 'drag-drop';
  instructionsEn: string;
  instructionsEs: string;
  question: string;
  questionEs: string;
  sentencePrefix?: string;
  sentencePrefixEs?: string;
  sentenceSuffix?: string;
  sentenceSuffixEs?: string;
  options: {
    id: string;
    text: string;
    textEs: string;
    isCorrect: boolean;
  }[];
  explanation: string;
  explanationEs: string;
}

export const SPORTS_TEST_QUESTIONS: SportsTestQuestion[] = [
  // Test 1 (test 1.png)
  {
    id: 'test-q1',
    testNumber: 1,
    type: 'radio',
    instructionsEn: 'Choose the correct answer.',
    instructionsEs: 'Elige la respuesta correcta.',
    question: 'What does Jack Hill talk about first?',
    questionEs: '¿De qué habla Jack Hill primero?',
    options: [
      {
        id: 't1-opt-1',
        text: 'He talks about racing.',
        textEs: 'Habla sobre carreras.',
        isCorrect: false,
      },
      {
        id: 't1-opt-2',
        text: 'He talks about baseball.',
        textEs: 'Habla sobre béisbol.',
        isCorrect: true,
      },
      {
        id: 't1-opt-3',
        text: 'He talks about tennis.',
        textEs: 'Habla sobre tenis.',
        isCorrect: false,
      },
      {
        id: 't1-opt-4',
        text: 'He talks about soccer.',
        textEs: 'Habla sobre fútbol.',
        isCorrect: false,
      },
    ],
    explanation:
      "Jack Hill explicitly starts his sports coverage with: 'First, baseball. Toronto is in first place.'",
    explanationEs:
      "Jack Hill comienza explícitamente su bloque deportivo diciendo: 'First, baseball. Toronto is in first place.' (Primero, béisbol).",
  },
  // Test 2 (test 2.png)
  {
    id: 'test-q2',
    testNumber: 2,
    type: 'radio',
    instructionsEn: 'Choose the correct answer.',
    instructionsEs: 'Elige la respuesta correcta.',
    question: 'What does Sam Wilson say?',
    questionEs: '¿Qué dice Sam Wilson?',
    options: [
      {
        id: 't2-opt-1',
        text: "Sam Wilson doesn't say anything.",
        textEs: 'Sam Wilson no dice nada.',
        isCorrect: false,
      },
      {
        id: 't2-opt-2',
        text: 'His team is going to win the championship next year.',
        textEs: 'Su equipo va a ganar el campeonato el próximo año.',
        isCorrect: false,
      },
      {
        id: 't2-opt-3',
        text: 'His team is going to win the championship this year.',
        textEs: 'Su equipo va a ganar el campeonato este año.',
        isCorrect: true,
      },
      {
        id: 't2-opt-4',
        text: 'His team wins every year.',
        textEs: 'Su equipo gana todos los años.',
        isCorrect: false,
      },
    ],
    explanation:
      "The broadcast reports: 'Sam Wilson says that his team is going to win the championship this year.'",
    explanationEs:
      "La transmisión informa: 'Sam Wilson says that his team is going to win the championship this year.' (dice que su equipo va a ganar el campeonato este año).",
  },
  // Test 3 (test 3.png)
  {
    id: 'test-q3',
    testNumber: 3,
    type: 'radio',
    instructionsEn: 'Choose the correct answer.',
    instructionsEs: 'Elige la respuesta correcta.',
    question: "What started yesterday at 3 o'clock?",
    questionEs: '¿Qué comenzó ayer a las 3 en punto?',
    options: [
      {
        id: 't3-opt-1',
        text: "The Children's Olympics started.",
        textEs: 'Comenzaron las Olimpiadas Infantiles.',
        isCorrect: false,
      },
      {
        id: 't3-opt-2',
        text: 'The Tour de France started.',
        textEs: 'Comenzó el Tour de Francia.',
        isCorrect: true,
      },
      {
        id: 't3-opt-3',
        text: 'The big tennis match started.',
        textEs: 'Comenzó el gran partido de tenis.',
        isCorrect: false,
      },
      {
        id: 't3-opt-4',
        text: 'The baseball game started.',
        textEs: 'Comenzó el partido de béisbol.',
        isCorrect: false,
      },
    ],
    explanation:
      "Jack Hill reports: 'The Tour de France bicycle race started yesterday in Paris at 3 o'clock.'",
    explanationEs:
      "Jack Hill anuncia: 'The Tour de France bicycle race started yesterday in Paris at 3 o'clock.' (La carrera ciclista del Tour de Francia comenzó ayer en París a las 3 en punto).",
  },
  // Test 4 (test 4.png)
  {
    id: 'test-q4',
    testNumber: 4,
    type: 'drag-drop',
    instructionsEn: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la respuesta correcta a su lugar.',
    question: "In the Children's Olympics there are 600 boys and girls.",
    questionEs: "En las Olimpiadas Infantiles hay 600 niños y niñas.",
    sentencePrefix: "In the Children's Olympics there are",
    sentencePrefixEs: "En las Olimpiadas Infantiles hay",
    sentenceSuffix: ".",
    sentenceSuffixEs: ".",
    options: [
      {
        id: 't4-opt-1',
        text: '60 boys and girls',
        textEs: '60 niños y niñas',
        isCorrect: false,
      },
      {
        id: 't4-opt-2',
        text: '600 boys and girls',
        textEs: '600 niños y niñas',
        isCorrect: true,
      },
      {
        id: 't4-opt-3',
        text: '6,000 boys and girls',
        textEs: '6.000 niños y niñas',
        isCorrect: false,
      },
      {
        id: 't4-opt-4',
        text: '600 boys and 600 girls',
        textEs: '600 niños y 600 niñas',
        isCorrect: false,
      },
    ],
    explanation:
      "The sports report states: 'Good luck to all the 600 boys and girls' participating in the Children's Olympics.",
    explanationEs:
      "El informe deportivo dice: 'Good luck to all the 600 boys and girls' (Buena suerte a todos los 600 niños y niñas) que participan en las Olimpiadas Infantiles.",
  },
  // Test 5 (test 5.png)
  {
    id: 'test-q5',
    testNumber: 5,
    type: 'radio',
    instructionsEn: 'Choose the correct answer.',
    instructionsEs: 'Elige la respuesta correcta.',
    question: 'When is the big tennis match?',
    questionEs: '¿Cuándo es el gran partido de tenis?',
    options: [
      {
        id: 't5-opt-1',
        text: "It's after the Tour de France.",
        textEs: 'Es después del Tour de Francia.',
        isCorrect: false,
      },
      {
        id: 't5-opt-2',
        text: "It's tomorrow.",
        textEs: 'Es mañana.',
        isCorrect: false,
      },
      {
        id: 't5-opt-3',
        text: "It's at 3 o'clock.",
        textEs: 'Es a las 3 en punto.',
        isCorrect: false,
      },
      {
        id: 't5-opt-4',
        text: "It's tonight.",
        textEs: 'Es esta noche.',
        isCorrect: true,
      },
    ],
    explanation:
      "Jack Hill states: 'Tonight is the big tennis match between rock star Maxi and the famous actor, Peter Anson.'",
    explanationEs:
      "Jack Hill anuncia: 'Tonight is the big tennis match...' (Esta noche es el gran partido de tenis...).",
  },
];
