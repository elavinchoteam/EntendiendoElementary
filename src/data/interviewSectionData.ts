import {
  LessonText,
  Exercise,
  DragWordToImageExercise,
  MatchingExercise,
  DropdownCompletionExercise,
  UnitTestExercise,
  LessonSentence,
} from '../types';

import larrySandraImg from '../assets/images/larry_sandra_interview.jpg';
import walletItemImg from '../assets/images/wallet_item.jpg';
import whistleItemImg from '../assets/images/whistle_item.jpg';
import concertItemImg from '../assets/images/concert_item.jpg';
import angryItemImg from '../assets/images/angry_item.jpg';

export {
  larrySandraImg,
  walletItemImg,
  whistleItemImg,
  concertItemImg,
  angryItemImg,
};

export const INTERVIEW_FULL_TRANSCRIPT = `Sandra: Welcome to "Meet the People." I'm Sandra Waters. My guest today is Larry Patel. Larry is an inventor. His newest invention is the "whistling wallet." Good evening, Larry.
Larry: Good evening, Sandra.
Sandra: Larry, what is a "whistling wallet"?
Larry: Well, it's a special wallet with a small battery inside. If you sing near it, the wallet whistles. People often lose their wallets in their homes. Now they can easily find them.
Sandra: Do you need to sing a special song?
Larry: No. Any song is OK.
Sandra: Oh, great! It's easier to sing than to look all over the house. Where can I buy the wallet?
Larry: Well, I still have to work on it. I gave wallets to some of my friends. Now two of them are angry at me. They went to a concert, and their wallets made noise all the time. The people around them were very angry.`;

export const INTERVIEW_FULL_TRANSCRIPT_ES = `Sandra: Bienvenidos a "Conoce a la Gente". Soy Sandra Waters. Mi invitado de hoy es Larry Patel. Larry es un inventor. Su más reciente invento es la "billetera silbadora". Buenas noches, Larry.
Larry: Buenas noches, Sandra.
Sandra: Larry, ¿qué es una "billetera silbadora"?
Larry: Bueno, es una billetera especial con una pequeña batería dentro. Si cantas cerca de ella, la billetera silba. Las personas frecuentemente pierden sus billeteras en sus casas. Ahora pueden encontrarlas fácilmente.
Sandra: ¿Necesitas cantar una canción especial?
Larry: No. Cualquier canción está bien.
Sandra: ¡Oh, genial! Es más fácil cantar que buscar por toda la casa. ¿Dónde puedo comprar la billetera?
Larry: Bueno, todavía tengo que trabajar en ella. Les di billeteras a algunos de mis amigos. Ahora dos de ellos están enojados conmigo. Fueron a un concierto y sus billeteras hicieron ruido todo el tiempo. Las personas a su alrededor estaban muy enojadas.`;

export const INTERVIEW_SENTENCES: LessonSentence[] = [
  {
    speaker: 'Sandra',
    en: 'Welcome to "Meet the People."',
    es: 'Bienvenidos a "Conoce a la Gente".',
  },
  {
    speaker: 'Sandra',
    en: "I'm Sandra Waters.",
    es: 'Soy Sandra Waters.',
  },
  {
    speaker: 'Sandra',
    en: 'My guest today is Larry Patel.',
    es: 'Mi invitado de hoy es Larry Patel.',
  },
  {
    speaker: 'Sandra',
    en: 'Larry is an inventor.',
    es: 'Larry es un inventor.',
  },
  {
    speaker: 'Sandra',
    en: 'His newest invention is the "whistling wallet."',
    es: 'Su invento más reciente es la "billetera silbadora".',
  },
  {
    speaker: 'Sandra',
    en: 'Good evening, Larry.',
    es: 'Buenas noches, Larry.',
  },
  {
    speaker: 'Larry',
    en: 'Good evening, Sandra.',
    es: 'Buenas noches, Sandra.',
  },
  {
    speaker: 'Sandra',
    en: 'Larry, what is a "whistling wallet"?',
    es: 'Larry, ¿qué es una "billetera silbadora"?',
  },
  {
    speaker: 'Larry',
    en: "Well, it's a special wallet with a small battery inside.",
    es: 'Bueno, es una billetera especial con una pequeña batería dentro.',
  },
  {
    speaker: 'Larry',
    en: 'If you sing near it, the wallet whistles.',
    es: 'Si cantas cerca de ella, la billetera silba.',
  },
  {
    speaker: 'Larry',
    en: 'People often lose their wallets in their homes.',
    es: 'La gente suele perder sus billeteras en sus casas.',
  },
  {
    speaker: 'Larry',
    en: 'Now they can easily find them.',
    es: 'Ahora pueden encontrarlas fácilmente.',
  },
  {
    speaker: 'Sandra',
    en: 'Do you need to sing a special song?',
    es: '¿Necesitas cantar una canción especial?',
  },
  {
    speaker: 'Larry',
    en: 'No. Any song is OK.',
    es: 'No. Cualquier canción está bien.',
  },
  {
    speaker: 'Sandra',
    en: "Oh, great! It's easier to sing than to look all over the house.",
    es: '¡Oh, genial! Es más fácil cantar que buscar por toda la casa.',
  },
  {
    speaker: 'Sandra',
    en: 'Where can I buy the wallet?',
    es: '¿Dónde puedo comprar la billetera?',
  },
  {
    speaker: 'Larry',
    en: 'Well, I still have to work on it.',
    es: 'Bueno, todavía tengo que trabajar en ella.',
  },
  {
    speaker: 'Larry',
    en: 'I gave wallets to some of my friends.',
    es: 'Les di billeteras a algunos de mis amigos.',
  },
  {
    speaker: 'Larry',
    en: 'Now two of them are angry at me.',
    es: 'Ahora dos de ellos están enojados conmigo.',
  },
  {
    speaker: 'Larry',
    en: 'They went to a concert, and their wallets made noise all the time.',
    es: 'Fueron a un concierto y sus billeteras hicieron ruido todo el tiempo.',
  },
  {
    speaker: 'Larry',
    en: 'The people around them were very angry.',
    es: 'La gente a su alrededor estaba muy enojada.',
  },
];

export const INTERVIEW_SECTION_LESSON_TEXT: LessonText = {
  title: 'Lesson 2: Interview',
  stepTitle: 'Step 3: Explore · Meet the People',
  audioText: INTERVIEW_FULL_TRANSCRIPT,
  textEn: INTERVIEW_FULL_TRANSCRIPT,
  textEs: INTERVIEW_FULL_TRANSCRIPT_ES,
  caller: 'Sandra Waters & Larry Patel',
  company: 'Meet the People',
  durationSeconds: 70,
  imageSrc: larrySandraImg,
  speakerGender: 'female',
  sentences: INTERVIEW_SENTENCES,
  practiceInstructions:
    'Escucha con atención la entrevista "Meet the People" entre Sandra Waters y el inventor Larry Patel sobre la "whistling wallet".',
};

export const INTERVIEW_SECTION_LESSON = INTERVIEW_SECTION_LESSON_TEXT;

// ========================================================
// ACTIVIDADES 1 A 8 + TEST
// ========================================================
export const INTERVIEW_SECTION_EXERCISES: Exercise[] = [
  // --------------------------------------------------------
  // ACTIVIDAD 1: Explore / Interview & Interactive Transcript
  // --------------------------------------------------------
  {
    id: 'interview-act-1-explore',
    type: 'interview-explore',
    title: 'Actividad 1: Explore',
    instructions: 'Listen to the interview "Meet the People." Click on any card to read its translation.',
    instructionsEs: 'Escucha la entrevista "Conoce a la Gente". Haz clic en cualquier tarjeta para leer su traducción.',
    audioText: INTERVIEW_FULL_TRANSCRIPT,
    sentences: INTERVIEW_SENTENCES,
    imageSrc: larrySandraImg,
  } as any,

  // --------------------------------------------------------
  // ACTIVIDAD 2: Match words with images
  // --------------------------------------------------------
  {
    id: 'interview-act-2-match-images',
    type: 'interview-match-images',
    title: 'Actividad 2: Words & Images',
    instructions: 'Match the words with the images.',
    instructionsEs: 'Empareja las palabras con las imágenes.',
    wordBank: ['a concert', 'a whistle', 'angry', 'a wallet'],
    items: [
      {
        id: 'item-wallet',
        wordEn: 'a wallet',
        wordEs: 'una billetera',
        imageUrl: walletItemImg,
        imageAlt: 'Black leather wallet',
      },
      {
        id: 'item-whistle',
        wordEn: 'a whistle',
        wordEs: 'un silbato',
        imageUrl: whistleItemImg,
        imageAlt: 'Silver metal whistle',
      },
      {
        id: 'item-concert',
        wordEn: 'a concert',
        wordEs: 'un concierto',
        imageUrl: concertItemImg,
        imageAlt: 'Concert stage with lights and crowd',
      },
      {
        id: 'item-angry',
        wordEn: 'angry',
        wordEs: 'enojado / furioso',
        imageUrl: angryItemImg,
        imageAlt: 'Angry frustrated man with fists clenched',
      },
    ],
  } as any,

  // --------------------------------------------------------
  // ACTIVIDAD 3: Listen and answer questions (3 items)
  // --------------------------------------------------------
  {
    id: 'interview-act-3-listen-questions',
    type: 'interview-listen-questions',
    title: 'Actividad 3: Questions',
    instructions: 'Listen to each part of the interview, and answer the questions.',
    instructionsEs: 'Escucha cada parte de la entrevista y responde a las preguntas.',
    imageUrl: larrySandraImg,
    audioText: INTERVIEW_FULL_TRANSCRIPT,
    sentences: INTERVIEW_SENTENCES,
    questions: [
      {
        id: 'q1',
        number: 1,
        question: 'How does the wallet work?',
        questionEs: '¿Cómo funciona la billetera?',
        audioClip: "Well, it's a special wallet with a small battery inside. If you sing near it, the wallet whistles. People often lose their wallets in their homes. Now they can easily find them.",
        options: [
          { id: 'q1-opt-1', text: 'You whistle, and it plays a song.', textEs: 'Silbas y reproduce una canción.' },
          { id: 'q1-opt-2', text: 'It whistles when it is lost.', textEs: 'Silba cuando se pierde.' },
          { id: 'q1-opt-3', text: 'You sing near it, and it whistles.', textEs: 'Cantas cerca de ella y silba.' },
          { id: 'q1-opt-4', text: 'You put batteries inside it, and it sings.', textEs: 'Le pones pilas dentro y canta.' },
        ],
        correctAnswerId: 'q1-opt-3',
        explanation: 'Larry Patel explicitly says: "If you sing near it, the wallet whistles."',
        explanationEs: 'Larry Patel dice explícitamente: "Si cantas cerca de ella, la billetera silba".',
      },
      {
        id: 'q2',
        number: 2,
        question: 'Where can you buy the whistling wallet?',
        questionEs: '¿Dónde puedes comprar la billetera silbadora?',
        audioClip: "Sandra: Where can I buy the wallet? Larry: Well, I still have to work on it. I gave wallets to some of my friends.",
        options: [
          { id: 'q2-opt-1', text: 'Larry Patel is selling it at his store.', textEs: 'Larry Patel la está vendiendo en su tienda.' },
          { id: 'q2-opt-2', text: "It is in all the stores, and they'll show you how well it works.", textEs: 'Está en todas las tiendas y te mostrarán lo bien que funciona.' },
          { id: 'q2-opt-3', text: 'You can call the radio station to order it.', textEs: 'Puedes llamar a la estación de radio para pedirla.' },
          { id: 'q2-opt-4', text: "It still isn't for sale, because it's not working properly yet.", textEs: 'Todavía no está a la venta porque aún no funciona correctamente.' },
        ],
        correctAnswerId: 'q2-opt-4',
        explanation: 'Larry says: "Well, I still have to work on it." It is not available in stores yet.',
        explanationEs: 'Larry dice: "Bueno, todavía tengo que trabajar en ella". Aún no está disponible en tiendas.',
      },
      {
        id: 'q3',
        number: 3,
        question: "Why are Larry's friends angry at him?",
        questionEs: '¿Por qué están enojados con Larry sus amigos?',
        audioClip: "Now two of them are angry at me. They went to a concert, and their wallets made noise all the time. The people around them were very angry.",
        options: [
          { id: 'q3-opt-1', text: 'Their wallets got lost at a concert.', textEs: 'Sus billeteras se perdieron en un concierto.' },
          { id: 'q3-opt-2', text: "He won't give them wallets.", textEs: 'Él no les da billeteras.' },
          { id: 'q3-opt-3', text: "They don't want to sing to find their wallets.", textEs: 'No quieren cantar para encontrar sus billeteras.' },
          { id: 'q3-opt-4', text: 'Their wallets made noise during a concert.', textEs: 'Sus billeteras hicieron ruido durante un concierto.' },
        ],
        correctAnswerId: 'q3-opt-4',
        explanation: 'Larry explains that two friends took their wallets to a concert, and the wallets made noise all the time due to the singing/music.',
        explanationEs: 'Larry explica que dos amigos llevaron sus billeteras a un concierto e hicieron ruido todo el tiempo por la música/canto.',
      },
    ],
  } as any,

  // --------------------------------------------------------
  // ACTIVIDAD 4: Fill in the table with answer to each question
  // --------------------------------------------------------
  {
    id: 'interview-act-4-fill-table',
    type: 'interview-fill-table',
    title: 'Actividad 4: Fill the Table',
    instructions: 'Listen to the radio interview, and fill in the table with the answer to each question.',
    instructionsEs: 'Escucha la entrevista radial y completa la tabla con la respuesta a cada pregunta.',
    imageUrl: larrySandraImg,
    audioText: INTERVIEW_FULL_TRANSCRIPT,
    sentences: INTERVIEW_SENTENCES,
    optionsPool: [
      'Sandra Waters',
      'Larry Patel',
      'It can help you find your wallet easily.',
      'Meet the People',
      'It is a wallet that whistles when you sing.',
    ],
    optionsPoolEs: {
      'Sandra Waters': 'Sandra Waters',
      'Larry Patel': 'Larry Patel',
      'It can help you find your wallet easily.': 'Puede ayudarte a encontrar tu billetera fácilmente.',
      'Meet the People': 'Conoce a la Gente',
      'It is a wallet that whistles when you sing.': 'Es una billetera que silba cuando cantas.',
    },
    rows: [
      {
        id: 'row-1',
        questionEn: 'What is the name of the radio program?',
        questionEs: '¿Cuál es el nombre del programa de radio?',
        correctAnswer: 'Meet the People',
        correctAnswerEs: 'Conoce a la Gente',
      },
      {
        id: 'row-2',
        questionEn: 'Who is the guest?',
        questionEs: '¿Quién es el invitado?',
        correctAnswer: 'Larry Patel',
        correctAnswerEs: 'Larry Patel',
      },
      {
        id: 'row-3',
        questionEn: 'Who is the announcer on the program?',
        questionEs: '¿Quién es la presentadora en el programa?',
        correctAnswer: 'Sandra Waters',
        correctAnswerEs: 'Sandra Waters',
      },
      {
        id: 'row-4',
        questionEn: 'What is the invention?',
        questionEs: '¿Cuál es el invento?',
        correctAnswer: 'It is a wallet that whistles when you sing.',
        correctAnswerEs: 'Es una billetera que silba cuando cantas.',
      },
      {
        id: 'row-5',
        questionEn: 'Why is it useful?',
        questionEs: '¿Por qué es útil?',
        correctAnswer: 'It can help you find your wallet easily.',
        correctAnswerEs: 'Puede ayudarte a encontrar tu billetera fácilmente.',
      },
    ],
  } as any,

  // --------------------------------------------------------
  // ACTIVIDAD 5: Choose the best answers for sentences (Dropdown)
  // --------------------------------------------------------
  {
    id: 'interview-act-5-dropdown-sentences',
    type: 'interview-dropdown-sentences',
    title: 'Actividad 5: Best Answers',
    instructions: 'Choose the best answers for the sentences.',
    instructionsEs: 'Elige las mejores respuestas para las oraciones.',
    imageUrl: larrySandraImg,
    audioText: INTERVIEW_FULL_TRANSCRIPT,
    sentences: INTERVIEW_SENTENCES,
    items: [
      {
        id: 'd1',
        prefix: 'A wallet is something you keep',
        prefixEs: 'Una billetera es algo donde guardas',
        suffix: 'in.',
        suffixEs: '.',
        options: ['batteries', 'a bag', 'money'],
        optionsEs: ['pilas / baterías', 'una bolsa', 'dinero'],
        correctAnswer: 'money',
        translationEs: 'Una billetera es algo donde guardas dinero.',
      },
      {
        id: 'd2',
        prefix: 'The whistling wallet works with',
        prefixEs: 'La billetera silbadora funciona con',
        suffix: '.',
        suffixEs: '.',
        options: ['money', 'a photo', 'a battery'],
        optionsEs: ['dinero', 'una foto', 'una batería / pila'],
        correctAnswer: 'a battery',
        translationEs: 'La billetera silbadora funciona con una batería.',
      },
      {
        id: 'd3',
        prefix: 'If you sing, the wallet',
        prefixEs: 'Si cantas, la billetera',
        suffix: '.',
        suffixEs: '.',
        options: ['speaks', 'whistles', 'sings'],
        optionsEs: ['habla', 'silba', 'canta'],
        correctAnswer: 'whistles',
        translationEs: 'Si cantas, la billetera silba.',
      },
      {
        id: 'd4',
        prefix: 'This wallet is for people who',
        prefixEs: 'Esta billetera es para personas que',
        suffix: 'their things.',
        suffixEs: 'sus cosas.',
        options: ['make', 'buy', 'lose'],
        optionsEs: ['hacen', 'compran', 'pierden'],
        correctAnswer: 'lose',
        translationEs: 'Esta billetera es para personas que pierden sus cosas.',
      },
      {
        id: 'd5',
        prefix: '',
        prefixEs: '',
        suffix: 'can use this wallet.',
        suffixEs: 'pueden usar esta billetera.',
        options: ['Everyone', 'Only rock singers', 'Only angry people'],
        optionsEs: ['Todos', 'Solo cantantes de rock', 'Solo personas enojadas'],
        correctAnswer: 'Everyone',
        translationEs: 'Todos pueden usar esta billetera.',
      },
    ],
  } as any,

  // --------------------------------------------------------
  // ACTIVIDAD 6: Choose best answer True / False / We don't know
  // --------------------------------------------------------
  {
    id: 'interview-act-6-dropdown-true-false',
    type: 'interview-dropdown-true-false',
    title: 'Actividad 6: True / False',
    instructions: 'Choose the best answer to the questions below.',
    instructionsEs: 'Elige la mejor respuesta para las preguntas a continuación.',
    imageUrl: larrySandraImg,
    audioText: INTERVIEW_FULL_TRANSCRIPT,
    sentences: INTERVIEW_SENTENCES,
    items: [
      {
        id: 'tf-1',
        statement: 'Larry and Sandra are on a radio program.',
        statementEs: 'Larry y Sandra están en un programa de radio.',
        options: ['True', 'False', "We don't know."],
        correctAnswer: 'True',
        explanation: 'Sandra hosts "Meet the People," which is introduced as a radio program/show.',
        explanationEs: 'Sandra presenta "Conoce a la Gente", que es un programa radial.',
      },
      {
        id: 'tf-2',
        statement: "Larry is on Sandra's program every day.",
        statementEs: 'Larry está en el programa de Sandra todos los días.',
        options: ['True', 'False', "We don't know."],
        correctAnswer: 'False',
        explanation: 'Sandra introduces him saying: "My guest today is Larry Patel," meaning he is a guest today, not every day.',
        explanationEs: 'Sandra lo presenta diciendo: "Mi invitado de hoy es Larry Patel", lo que significa que es un invitado especial hoy, no todos los días.',
      },
      {
        id: 'tf-3',
        statement: 'Larry\'s invention is called the "Whistling Wallet."',
        statementEs: 'El invento de Larry se llama la "Billetera Silbadora".',
        options: ['True', 'False', "We don't know."],
        correctAnswer: 'True',
        explanation: 'Sandra introduces it: "His newest invention is the \'whistling wallet.\'"',
        explanationEs: 'Sandra lo presenta textualmente: "Su invento más reciente es la \'billetera silbadora\'".',
      },
      {
        id: 'tf-4',
        statement: 'The wallet only whistles when you sing a special song.',
        statementEs: 'La billetera solo silba cuando cantas una canción especial.',
        options: ['True', 'False', "We don't know."],
        correctAnswer: 'False',
        explanation: 'Sandra asks: "Do you need to sing a special song?" and Larry answers: "No. Any song is OK."',
        explanationEs: 'Sandra pregunta si se necesita una canción especial y Larry responde: "No. Cualquier canción está bien".',
      },
      {
        id: 'tf-5',
        statement: 'The "Whistling Wallet" is special because it whistles.',
        statementEs: 'La "Billetera Silbadora" es especial porque silba.',
        options: ['True', 'False', "We don't know."],
        correctAnswer: 'True',
        explanation: 'Larry explains that it is special because with a battery inside, if you sing near it, the wallet whistles.',
        explanationEs: 'Larry explica que es una billetera especial porque silba al cantar cerca de ella.',
      },
      {
        id: 'tf-6',
        statement: 'The "Whistling Wallet" is black.',
        statementEs: 'La "Billetera Silbadora" es negra.',
        options: ['True', 'False', 'We don\'t know.'],
        correctAnswer: 'We don\'t know.',
        explanation: 'The audio conversation never mentions the color of the wallet, so in the audio interview we don\'t know.',
        explanationEs: 'En el diálogo auditivo nunca se menciona el color de la billetera, por lo que en el texto auditivo no lo sabemos.',
      },
      {
        id: 'tf-7',
        statement: "An invention is something new that's never been made before.",
        statementEs: 'Un invento es algo nuevo que nunca se ha hecho antes.',
        options: ['True', 'False', "We don't know."],
        correctAnswer: 'True',
        explanation: 'By definition, an invention is a novel creation or device that did not exist before.',
        explanationEs: 'Por definición, un invento es una creación o artefacto novedoso que no existía anteriormente.',
      },
    ],
  } as any,

  // --------------------------------------------------------
  // ACTIVIDAD 7: Choose the correct answer (Part 1)
  // --------------------------------------------------------
  {
    id: 'interview-act-7-radio-1',
    type: 'interview-radio-choice',
    title: 'Actividad 7: Comprehension 1',
    instructions: 'Choose the correct answer.',
    instructionsEs: 'Elige la respuesta correcta.',
    imageUrl: larrySandraImg,
    audioText: INTERVIEW_FULL_TRANSCRIPT,
    sentences: INTERVIEW_SENTENCES,
    questions: [
      {
        id: 'r1',
        number: 1,
        question: 'Sandra says the wallet is Larry\'s "newest invention." What does that mean?',
        questionEs: 'Sandra dice que la billetera es el "invento más nuevo" de Larry. ¿Qué significa eso?',
        options: [
          { id: 'r1-opt-1', text: 'Larry makes things for the house.', textEs: 'Larry hace cosas para la casa.' },
          { id: 'r1-opt-2', text: 'Larry makes other things.', textEs: 'Larry hace otras cosas / otros inventos.' },
          { id: 'r1-opt-3', text: 'Larry makes only wallets.', textEs: 'Larry solo hace billeteras.' },
        ],
        correctAnswerId: 'r1-opt-2',
        explanation: '"Newest invention" implies he is an inventor who has made other inventions before.',
        explanationEs: '"El invento más nuevo" implica que Larry es un inventor que ya ha creado otras cosas antes.',
      },
      {
        id: 'r2',
        number: 2,
        question: 'The "Whistling Wallet" helps people...',
        questionEs: 'La "Billetera Silbadora" ayuda a las personas a...',
        options: [
          { id: 'r2-opt-1', text: 'find their wallets.', textEs: 'encontrar sus billeteras.' },
          { id: 'r2-opt-2', text: 'buy their wallets.', textEs: 'comprar sus billeteras.' },
          { id: 'r2-opt-3', text: 'lose their wallets.', textEs: 'perder sus billeteras.' },
          { id: 'r2-opt-4', text: 'make noise.', textEs: 'hacer ruido.' },
        ],
        correctAnswerId: 'r2-opt-1',
        explanation: 'Larry explains: "People often lose their wallets in their homes. Now they can easily find them."',
        explanationEs: 'Larry explica: "La gente suele perder sus billeteras en sus casas. Ahora pueden encontrarlas fácilmente".',
      },
    ],
  } as any,

  // --------------------------------------------------------
  // ACTIVIDAD 8: Choose the correct answer (Part 2)
  // --------------------------------------------------------
  {
    id: 'interview-act-8-radio-2',
    type: 'interview-radio-choice',
    title: 'Actividad 8: Comprehension 2',
    instructions: 'Choose the correct answer.',
    instructionsEs: 'Elige la respuesta correcta.',
    imageUrl: larrySandraImg,
    audioText: INTERVIEW_FULL_TRANSCRIPT,
    sentences: INTERVIEW_SENTENCES,
    questions: [
      {
        id: 'r3',
        number: 1,
        question: 'Where do people often lose their wallets?',
        questionEs: '¿Dónde suele la gente perder sus billeteras?',
        options: [
          { id: 'r3-opt-1', text: 'Outside', textEs: 'Afuera / en la calle' },
          { id: 'r3-opt-2', text: 'At concerts', textEs: 'En conciertos' },
          { id: 'r3-opt-3', text: 'In their homes', textEs: 'En sus casas' },
          { id: 'r3-opt-4', text: "When they're angry", textEs: 'Cuando están enojados' },
        ],
        correctAnswerId: 'r3-opt-3',
        explanation: 'Larry states: "People often lose their wallets in their homes."',
        explanationEs: 'Larry afirma textualmente: "La gente suele perder sus billeteras en sus casas".',
      },
      {
        id: 'r4',
        number: 2,
        question: 'Why is it "easier to sing than look all over the house"?',
        questionEs: '¿Por qué es "más fácil cantar que buscar por toda la casa"?',
        options: [
          { id: 'r4-opt-1', text: "If you sing, it's easier to look all over the house.", textEs: 'Si cantas, es más fácil buscar por toda la casa.' },
          { id: 'r4-opt-2', text: 'If you look all over the house, you lose your wallet.', textEs: 'Si buscas por toda la casa, pierdes tu billetera.' },
          { id: 'r4-opt-3', text: 'If you sing, you lose your wallet.', textEs: 'Si cantas, pierdes tu billetera.' },
          { id: 'r4-opt-4', text: 'If you sing, you can find the wallet quickly.', textEs: 'Si cantas, puedes encontrar la billetera rápidamente.' },
        ],
        correctAnswerId: 'r4-opt-4',
        explanation: 'Singing causes the wallet to whistle immediately, making it quick and easy to locate.',
        explanationEs: 'Cantar hace que la billetera silbe de inmediato, permitiendo localizarla rápida y fácilmente.',
      },
    ],
  } as any,

  // --------------------------------------------------------
  // TEST DE EVALUACIÓN: 5 Tests en orden exacto con tarjeta inicial
  // --------------------------------------------------------
  {
    id: 'interview-act-9-test',
    type: 'unit-test',
    title: 'Interview: Test de Evaluación',
    titleEs: 'Interview: Test de Evaluación',
    subtitle: '5 Tests: Complete & Select the Best Answers',
    subtitleEs: '5 Tests: Completa y Elige las Mejores Respuestas',
    description:
      'Demuestra tu comprensión de la entrevista radial "Meet the People" con Sandra Waters y Larry Patel sobre la "whistling wallet".',
    descriptionEs:
      'Demuestra tu comprensión de la entrevista radial "Meet the People" con Sandra Waters y Larry Patel sobre la "whistling wallet".',
    totalQuestions: 5,
    audioPrompt: INTERVIEW_FULL_TRANSCRIPT,
    speakerGender: 'female',
    imageUrl: larrySandraImg,
    referenceText: INTERVIEW_FULL_TRANSCRIPT,
    referenceTextEs: INTERVIEW_FULL_TRANSCRIPT_ES,
    questions: [
      // Test 1: Drag drop into place: "in the evening"
      {
        id: 'interview-test-1',
        number: 1,
        type: 'drag-drop',
        instructions: 'Drag the correct answer/s into place.',
        instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
        question: 'You can hear the program, "Meet The People," in the evening.',
        questionEs: 'Puedes escuchar el programa "Conoce a la Gente" por la noche / atardecer.',
        sentencePrefix: 'You can hear the program, "Meet The People,"',
        sentencePrefixEs: 'Puedes escuchar el programa "Conoce a la Gente",',
        sentenceSuffix: '.',
        sentenceSuffixEs: '.',
        audioPrompt: INTERVIEW_FULL_TRANSCRIPT,
        durationSeconds: 70,
        speakerGender: 'female',
        imageUrl: larrySandraImg,
        options: [
          { id: 't1-opt-morning', text: 'in the morning', textEs: 'por la mañana', isCorrect: false },
          { id: 't1-opt-night', text: 'at night', textEs: 'en la noche', isCorrect: false },
          { id: 't1-opt-7am', text: 'at 7 a.m.', textEs: 'a las 7 a.m.', isCorrect: false },
          { id: 't1-opt-evening', text: 'in the evening', textEs: 'por la noche / atardecer', isCorrect: true },
        ],
        correctAnswerId: 't1-opt-evening',
        explanation: 'Sandra greets Larry saying "Good evening, Larry," and Larry replies "Good evening, Sandra," which shows the show is in the evening.',
        explanationEs: 'Sandra saluda diciendo "Good evening, Larry" y Larry responde "Good evening, Sandra", demostrando que el programa se transmite por la tarde-noche.',
      },

      // Test 2: Drag drop into place: "Mr. Patel's work"
      {
        id: 'interview-test-2',
        number: 2,
        type: 'drag-drop',
        instructions: 'Drag the correct answer/s into place.',
        instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
        question: "This interview is about Mr. Patel's work.",
        questionEs: 'Esta entrevista es sobre el trabajo del Sr. Patel.',
        sentencePrefix: 'This interview is about',
        sentencePrefixEs: 'Esta entrevista es sobre',
        sentenceSuffix: '.',
        sentenceSuffixEs: '.',
        audioPrompt: INTERVIEW_FULL_TRANSCRIPT,
        durationSeconds: 70,
        speakerGender: 'female',
        imageUrl: larrySandraImg,
        options: [
          { id: 't2-opt-patel', text: "Mr. Patel's work", textEs: 'el trabajo del Sr. Patel', isCorrect: true },
          { id: 't2-opt-friends', text: 'angry friends', textEs: 'amigos enojados', isCorrect: false },
          { id: 't2-opt-concert', text: 'a concert', textEs: 'un concierto', isCorrect: false },
          { id: 't2-opt-battery', text: 'a small battery', textEs: 'una pequeña batería', isCorrect: false },
        ],
        correctAnswerId: 't2-opt-patel',
        explanation: 'Larry Patel is an inventor and the interview focuses on his work creating new inventions like the whistling wallet.',
        explanationEs: 'Larry Patel es inventor y la entrevista se centra en su labor inventando la billetera silbadora.',
      },

      // Test 3: Radio choice True / False: "You can buy the whistling wallet in any department store."
      {
        id: 'interview-test-3',
        number: 3,
        type: 'radio-choice',
        instructions: 'Choose the correct answer.',
        instructionsEs: 'Elige la respuesta correcta.',
        question: 'You can buy the whistling wallet in any department store.',
        questionEs: 'Puedes comprar la billetera silbadora en cualquier tienda departamental.',
        audioPrompt: INTERVIEW_FULL_TRANSCRIPT,
        durationSeconds: 70,
        speakerGender: 'female',
        imageUrl: larrySandraImg,
        options: [
          { id: 't3-opt-true', text: 'True', textEs: 'Verdadero', isCorrect: false },
          { id: 't3-opt-false', text: 'False', textEs: 'Falso', isCorrect: true },
        ],
        correctAnswerId: 't3-opt-false',
        explanation: 'Larry explicitly explains: "Well, I still have to work on it." The wallet is not sold in stores yet.',
        explanationEs: 'Larry responde expresamente: "Bueno, todavía tengo que trabajar en ella". Aún no se vende en tiendas.',
      },

      // Test 4: Radio choice Yes / No: Sister lost wallet
      {
        id: 'interview-test-4',
        number: 4,
        type: 'radio-choice',
        instructions: 'Choose the correct answer.',
        instructionsEs: 'Elige la respuesta correcta.',
        question:
          "My sister left her wallet in the kitchen or in her bedroom. Now she is late for work, but she can't find her wallet. Can she use Larry Patel's invention?",
        questionEs:
          'Mi hermana dejó su billetera en la cocina o en su dormitorio. Ahora llega tarde al trabajo, pero no encuentra su billetera. ¿Puede usar el invento de Larry Patel?',
        audioPrompt: INTERVIEW_FULL_TRANSCRIPT,
        durationSeconds: 70,
        speakerGender: 'female',
        imageUrl: larrySandraImg,
        options: [
          { id: 't4-opt-yes', text: 'Yes', textEs: 'Sí', isCorrect: true },
          { id: 't4-opt-no', text: 'No', textEs: 'No', isCorrect: false },
        ],
        correctAnswerId: 't4-opt-yes',
        explanation: 'Yes, because Larry said the invention is specifically made for people who lose their wallets at home so they can easily find them by singing.',
        explanationEs: 'Sí, porque Larry indicó que el invento es justamente para personas que pierden sus billeteras en casa para encontrarlas cantando.',
      },

      // Test 5: Drag drop into place: "easier"
      {
        id: 'interview-test-5',
        number: 5,
        type: 'drag-drop',
        instructions: 'Drag the correct answer/s into place.',
        instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
        question: 'Larry Patel wants to make things easier for people.',
        questionEs: 'Larry Patel quiere hacer las cosas más fáciles para la gente.',
        sentencePrefix: 'Larry Patel wants to make things',
        sentencePrefixEs: 'Larry Patel quiere hacer las cosas',
        sentenceSuffix: 'for people.',
        sentenceSuffixEs: 'para la gente.',
        audioPrompt: INTERVIEW_FULL_TRANSCRIPT,
        durationSeconds: 70,
        speakerGender: 'female',
        imageUrl: larrySandraImg,
        options: [
          { id: 't5-opt-diff', text: 'more difficult', textEs: 'más difíciles', isCorrect: false },
          { id: 't5-opt-slower', text: 'slower', textEs: 'más lentas', isCorrect: false },
          { id: 't5-opt-easier', text: 'easier', textEs: 'más fáciles', isCorrect: true },
          { id: 't5-opt-harder', text: 'harder', textEs: 'más duras / difíciles', isCorrect: false },
        ],
        correctAnswerId: 't5-opt-easier',
        explanation: 'Sandra notes: "It\'s easier to sing than to look all over the house," and Larry designed it so people can easily find lost items.',
        explanationEs: 'Sandra destaca que "es más fácil cantar que buscar por toda la casa", y el objetivo de Larry es facilitar la vida de las personas.',
      },
    ],
  } as UnitTestExercise,
];
