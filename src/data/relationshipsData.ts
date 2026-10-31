export interface RelationshipVocabItem {
  id: string;
  word: string;
  partOfSpeech: string;
  definition: string;
  definitionEs: string;
  exampleSentence: string;
  exampleTranslation: string;
  imageUrl: string;
}

export interface CollocationMatchItem {
  prefix: string;
  target: string;
  fullPhrase: string;
  translation: string;
}

export interface DictationItem {
  id: string;
  sentence: string;
  translation: string;
  audioKey: string;
}

export interface TestDropdownItem {
  id: string;
  number: number;
  sentenceBefore: string;
  sentenceAfter: string;
  options: string[];
  correctAnswer: string;
  fullSentence: string;
  translation: string;
  grammarNote: string;
}

export const RELATIONSHIPS_VOCABULARY: RelationshipVocabItem[] = [
  {
    id: 'aunt',
    word: 'aunt',
    partOfSpeech: 'noun',
    definition: 'sister of your mother and father or the wife of your uncle',
    definitionEs: 'hermana de tu madre o padre, o la esposa de tu tío',
    exampleSentence: 'My mother has three sisters so I have three aunts.',
    exampleTranslation: 'Mi madre tiene tres hermanas, así que tengo tres tías.',
    imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'cousin',
    word: 'cousin',
    partOfSpeech: 'noun',
    definition: 'child of your aunt and uncle',
    definitionEs: 'hijo o hija de tu tía y tío',
    exampleSentence: "My aunt's children are my cousins.",
    exampleTranslation: 'Los hijos de mi tía son mis primos.',
    imageUrl: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'family-picnic',
    word: 'family picnic',
    partOfSpeech: 'noun phrase',
    definition: 'an outdoor meal eaten with relatives in a park or countryside',
    definitionEs: 'una comida al aire libre compartida con familiares',
    exampleSentence: 'We had a family picnic in the park.',
    exampleTranslation: 'Tuvimos un picnic familiar en el parque.',
    imageUrl: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'fight',
    word: 'fight',
    partOfSpeech: 'noun / verb',
    definition: 'an angry argument or physical struggle between people',
    definitionEs: 'una discusión acalorada o pelea entre personas',
    exampleSentence: 'The children had a fight today.',
    exampleTranslation: 'Los niños tuvieron una pelea hoy.',
    imageUrl: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'have-fun',
    word: 'have fun',
    partOfSpeech: 'phrase',
    definition: 'enjoy oneself, spend time pleasantly and with joy',
    definitionEs: 'divertirse, pasarla bien',
    exampleSentence: 'The children are having fun in the park.',
    exampleTranslation: 'Los niños se están divirtiendo en el parque.',
    imageUrl: 'https://images.unsplash.com/photo-1471286174890-9c112ffca564?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'phone-home',
    word: 'phone home',
    partOfSpeech: 'phrase',
    definition: 'call your family or household by telephone',
    definitionEs: 'llamar a casa o telefonear a la familia',
    exampleSentence: 'I phone home to speak to my mom every week.',
    exampleTranslation: 'Llamo a casa para hablar con mi mamá cada semana.',
    imageUrl: 'https://images.unsplash.com/photo-1520923642038-b4259acecbd7?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'relative',
    word: 'relative',
    partOfSpeech: 'noun',
    definition: 'a member of your extended family connected by blood or marriage',
    definitionEs: 'un miembro de tu familia conectado por lazos de sangre o matrimonio (pariente)',
    exampleSentence: 'All his relatives came to the wedding.',
    exampleTranslation: 'Todos sus parientes vinieron a la boda.',
    imageUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'reunion',
    word: 'reunion',
    partOfSpeech: 'noun',
    definition: 'a gathering of people who have not seen each other for some time',
    definitionEs: 'un reencuentro o reunión de personas que han estado separadas',
    exampleSentence: 'We are having a class reunion after 10 years.',
    exampleTranslation: 'Tendremos una reunión de clase después de 10 años.',
    imageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'uncle',
    word: 'uncle',
    partOfSpeech: 'noun',
    definition: 'brother of your mother or father or husband of your aunt',
    definitionEs: 'hermano de tu madre o padre, o esposo de tu tía',
    exampleSentence: 'My uncle visits us once a month.',
    exampleTranslation: 'Mi tío nos visita una vez al mes.',
    imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'young-and-old',
    word: 'young and old',
    partOfSpeech: 'idiom',
    definition: 'people of all ages, everyone from children to grandparents',
    definitionEs: 'jóvenes y ancianos (personas de todas las edades)',
    exampleSentence: 'The whole family is here, young and old.',
    exampleTranslation: 'Toda la familia está aquí, jóvenes y ancianos.',
    imageUrl: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=400&q=80',
  },
];

export const COLLOCATION_MATCHES: CollocationMatchItem[] = [
  { prefix: 'family', target: 'picnic', fullPhrase: 'family picnic', translation: 'picnic familiar' },
  { prefix: 'phone', target: 'home', fullPhrase: 'phone home', translation: 'llamar a casa' },
  { prefix: 'young', target: 'and old', fullPhrase: 'young and old', translation: 'jóvenes y ancianos' },
  { prefix: 'have', target: 'fun', fullPhrase: 'have fun', translation: 'divertirse' },
  { prefix: 'start', target: 'a fight', fullPhrase: 'start a fight', translation: 'empezar una pelea' },
];

export const DICTATION_PART_1: DictationItem[] = [
  {
    id: 'd1-1',
    sentence: 'My mother has three sisters so I have three aunts.',
    translation: 'Mi madre tiene tres hermanas, así que tengo tres tías.',
    audioKey: 'aunt',
  },
  {
    id: 'd1-2',
    sentence: "My aunt's children are my cousins.",
    translation: 'Los hijos de mi tía son mis primos.',
    audioKey: 'cousin',
  },
  {
    id: 'd1-3',
    sentence: 'We had a family picnic in the park.',
    translation: 'Tuvimos un picnic familiar en el parque.',
    audioKey: 'family picnic',
  },
  {
    id: 'd1-4',
    sentence: 'The children had a fight today.',
    translation: 'Los niños tuvieron una pelea hoy.',
    audioKey: 'fight',
  },
  {
    id: 'd1-5',
    sentence: 'The children are having fun in the park.',
    translation: 'Los niños se están divirtiendo en el parque.',
    audioKey: 'have fun',
  },
];

export const DICTATION_PART_2: DictationItem[] = [
  {
    id: 'd2-1',
    sentence: 'The whole family is here, young and old.',
    translation: 'Toda la familia está aquí, jóvenes y ancianos.',
    audioKey: 'young and old',
  },
  {
    id: 'd2-2',
    sentence: 'I phone home to speak to my mom every week.',
    translation: 'Llamo a casa para hablar con mi mamá cada semana.',
    audioKey: 'phone home',
  },
  {
    id: 'd2-3',
    sentence: 'All his relatives came to the wedding.',
    translation: 'Todos sus parientes vinieron a la boda.',
    audioKey: 'relative',
  },
  {
    id: 'd2-4',
    sentence: 'We are having a class reunion after 10 years.',
    translation: 'Tendremos una reunión de clase después de 10 años.',
    audioKey: 'reunion',
  },
  {
    id: 'd2-5',
    sentence: 'My uncle visits us once a month.',
    translation: 'Mi tío nos visita una vez al mes.',
    audioKey: 'uncle',
  },
];

export const RELATIONSHIPS_TEST_QUESTIONS: TestDropdownItem[] = [
  // Test 1: aunts
  {
    id: 'rel-test-1',
    number: 1,
    sentenceBefore: 'I love my',
    sentenceAfter: ", especially my uncle's wife.",
    options: ['aunts', 'uncles', 'cousins'],
    correctAnswer: 'aunts',
    fullSentence: "I love my aunts, especially my uncle's wife.",
    translation: "Amo a mis tías, especialmente a la esposa de mi tío.",
    grammarNote: "La esposa de un tío es una tía ('aunt'). En plural femenino se dice 'aunts'.",
  },
  // Test 2: cousin
  {
    id: 'rel-test-2',
    number: 2,
    sentenceBefore: 'My',
    sentenceAfter: 'is also a great friend to me.',
    options: ['reunion', 'young and old', 'cousin'],
    correctAnswer: 'cousin',
    fullSentence: 'My cousin is also a great friend to me.',
    translation: 'Mi primo(a) es también un gran amigo(a) para mí.',
    grammarNote: "'Cousin' es una persona (primo/prima) y concuerda con el verbo singular 'is'.",
  },
  // Test 3: family picnic
  {
    id: 'rel-test-3',
    number: 3,
    sentenceBefore: "It's my birthday and we are having a",
    sentenceAfter: '.',
    options: ['family picnic', 'have fun', 'phone home'],
    correctAnswer: 'family picnic',
    fullSentence: "It's my birthday and we are having a family picnic.",
    translation: 'Es mi cumpleaños y vamos a tener un picnic familiar.',
    grammarNote: "El artículo indefinido 'a' requiere un sustantivo singular: 'a family picnic'.",
  },
  // Test 4: fight
  {
    id: 'rel-test-4',
    number: 4,
    sentenceBefore: 'There was a',
    sentenceAfter: 'at school and Ben hit Tommy in the nose.',
    options: ['picnic', 'reunion', 'fight'],
    correctAnswer: 'fight',
    fullSentence: 'There was a fight at school and Ben hit Tommy in the nose.',
    translation: 'Hubo una pelea en la escuela y Ben golpeó a Tommy en la nariz.',
    grammarNote: "Golpear a alguien en la nariz describe una pelea ('fight').",
  },
  // Test 5: had fun
  {
    id: 'rel-test-5',
    number: 5,
    sentenceBefore: 'We',
    sentenceAfter: 'tonight at the party.',
    options: ['had fun', 'fight', 'phoned home'],
    correctAnswer: 'had fun',
    fullSentence: 'We had fun tonight at the party.',
    translation: 'Nos divertimos esta noche en la fiesta.',
    grammarNote: "'Had fun' expresa que disfrutaron agradablemente en la fiesta en tiempo pasado.",
  },
  // Test 6: young and old
  {
    id: 'rel-test-6',
    number: 6,
    sentenceBefore: 'The movie is for everyone,',
    sentenceAfter: '.',
    options: ['uncles and aunts', 'cousins', 'young and old'],
    correctAnswer: 'young and old',
    fullSentence: 'The movie is for everyone, young and old.',
    translation: 'La película es para todos, jóvenes y ancianos.',
    grammarNote: "'Young and old' es una locución fija en inglés que significa personas de todas las edades.",
  },
  // Test 7: phone home
  {
    id: 'rel-test-7',
    number: 7,
    sentenceBefore: 'Remember to',
    sentenceAfter: 'when you get to the hotel.',
    options: ['phone home', 'have fun', 'family reunion'],
    correctAnswer: 'phone home',
    fullSentence: 'Remember to phone home when you get to the hotel.',
    translation: 'Recuerda llamar a casa cuando llegues al hotel.',
    grammarNote: "'Remember to' va seguido de un verbo en infinitivo ('phone home' = telefonear a casa).",
  },
  // Test 8: relatives
  {
    id: 'rel-test-8',
    number: 8,
    sentenceBefore: 'She has two brothers and a sister in London so she has lots of',
    sentenceAfter: 'there.',
    options: ['uncles', 'relatives', 'reunion'],
    correctAnswer: 'relatives',
    fullSentence: 'She has two brothers and a sister in London so she has lots of relatives there.',
    translation: 'Ella tiene dos hermanos y una hermana en Londres, así que tiene muchos parientes allí.',
    grammarNote: "Los hermanos y hermanas forman parte del grupo general de parientes ('relatives').",
  },
  // Test 9: reunion
  {
    id: 'rel-test-9',
    number: 9,
    sentenceBefore: 'Our family has a',
    sentenceAfter: "every Christmas in my mother's house.",
    options: ['reunion', 'family picnic', 'have fun'],
    correctAnswer: 'reunion',
    fullSentence: "Our family has a reunion every Christmas in my mother's house.",
    translation: 'Nuestra familia tiene una reunión cada Navidad en la casa de mi madre.',
    grammarNote: "'A reunion' describe el reencuentro de familiares que viven en diferentes lugares.",
  },
  // Test 10: uncle
  {
    id: 'rel-test-10',
    number: 10,
    sentenceBefore: "My aunt's husband is my favorite",
    sentenceAfter: '.',
    options: ['cousin', 'uncle', 'aunt'],
    correctAnswer: 'uncle',
    fullSentence: "My aunt's husband is my favorite uncle.",
    translation: 'El esposo de mi tía es mi tío favorito.',
    grammarNote: "El esposo de una tía es un tío ('uncle').",
  },
];
