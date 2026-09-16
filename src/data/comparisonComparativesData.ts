import samuraiSamBoxingImg from '../assets/images/samurai_sam_boxing_1789601574284.jpg';

export { samuraiSamBoxingImg };

export interface ComparisonDialogueLine {
  textEn: string;
  textEs: string;
  hasBlank?: boolean;
  prefix?: string;
  suffix?: string;
}

export interface ComparisonOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface ComparisonActivityData {
  id: string;
  activityNumber: number;
  instructions: string;
  instructionsEs: string;
  imageUrl: string;
  referenceText: string;
  referenceTextEs: string;
  referenceHighlights: string[];
  dialogueLines: ComparisonDialogueLine[];
  options: ComparisonOption[];
  correctAnswerId: string;
  audioPrompt: string;
  explanationEn: string;
  explanationEs: string;
}

export interface ComparisonTestData {
  id: string;
  testNumber: number;
  instructions: string;
  instructionsEs: string;
  imageUrl: string;
  referenceText: string;
  referenceTextEs: string;
  referenceHighlights: string[];
  dialogueLines: ComparisonDialogueLine[];
  options: ComparisonOption[];
  correctAnswerId: string;
  audioPrompt: string;
  explanationEn: string;
  explanationEs: string;
}

export const COMPARATIVES_REFERENCE_EN =
  "- Samurai Sam is winning. He's stronger than Viking Vick.\n- Yes, and he's more popular, too.";
export const COMPARATIVES_REFERENCE_ES =
  "- Samurai Sam está ganando. Es más fuerte que Viking Vick.\n- Sí, y él es más popular, también.";
export const COMPARATIVES_HIGHLIGHTS = ['stronger than', 'more popular'];

// Explore / Actividad 1
export const COMPARATIVES_ACTIVITY_1 = {
  id: 'comparison-comparatives-act-1',
  activityNumber: 1,
  titleEn: 'Explore',
  titleEs: 'Explorar',
  audioText:
    "Samurai Sam is winning. He's stronger than Viking Vick. Yes, and he's more popular, too.",
  textEn:
    "- Samurai Sam is winning. He's stronger than Viking Vick.\n- Yes, and he's more popular, too.",
  textEs:
    "- Samurai Sam está ganando. Es más fuerte que Viking Vick.\n- Sí, y él es más popular, también.",
  highlights: ['stronger than', 'more popular'],
  imageUrl: samuraiSamBoxingImg,
  durationSeconds: 6,
};

// Actividades 2 a 11
export const COMPARATIVES_ACTIVITIES: ComparisonActivityData[] = [
  /* Actividad 2 (actividad 2.png) */
  {
    id: 'comparison-comparatives-act-2',
    activityNumber: 2,
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    imageUrl: samuraiSamBoxingImg,
    referenceText: COMPARATIVES_REFERENCE_EN,
    referenceTextEs: COMPARATIVES_REFERENCE_ES,
    referenceHighlights: COMPARATIVES_HIGHLIGHTS,
    dialogueLines: [
      {
        textEn: '- Does Emanuel have a lot of money?',
        textEs: '- ¿Tiene Emanuel mucho dinero?',
      },
      {
        textEn:
          '- I think so. His car is ________ than mine and his house is much bigger than my house.',
        textEs:
          '- Creo que sí. Su auto es más costoso que el mío y su casa es mucho más grande que la mía.',
        hasBlank: true,
        prefix: '- I think so. His car is ',
        suffix: ' than mine and his house is much bigger than my house.',
      },
    ],
    options: [
      { id: 'opt-2-more-expensive', text: 'more expensive', isCorrect: true },
      { id: 'opt-2-expensive', text: 'expensive', isCorrect: false },
      { id: 'opt-2-too-expensive', text: 'too expensive', isCorrect: false },
      { id: 'opt-2-most-expensive', text: 'the most expensive', isCorrect: false },
    ],
    correctAnswerId: 'opt-2-more-expensive',
    audioPrompt:
      '- Does Emanuel have a lot of money? - I think so. His car is more expensive than mine and his house is much bigger than my house.',
    explanationEn:
      "We use 'more + long adjective + than' to compare two things. For 'expensive', the comparative form is 'more expensive'.",
    explanationEs:
      "Usamos 'more + adjetivo largo + than' para comparar dos cosas. Para 'expensive' (costoso), la forma comparativa es 'more expensive'.",
  },

  /* Actividad 3 (actividad 3.png) */
  {
    id: 'comparison-comparatives-act-3',
    activityNumber: 3,
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    imageUrl: samuraiSamBoxingImg,
    referenceText: COMPARATIVES_REFERENCE_EN,
    referenceTextEs: COMPARATIVES_REFERENCE_ES,
    referenceHighlights: COMPARATIVES_HIGHLIGHTS,
    dialogueLines: [
      {
        textEn: '- How old are your brother and sister?',
        textEs: '- ¿Cuántos años tienen tu hermano y hermana?',
      },
      {
        textEn: '- Jerry is thirteen and Sarah is four years ________ than he is.',
        textEs: '- Jerry tiene trece años y Sarah es cuatro años menor que él.',
        hasBlank: true,
        prefix: '- Jerry is thirteen and Sarah is four years ',
        suffix: ' than he is.',
      },
      {
        textEn: "- That means that she's nine years old.",
        textEs: '- Eso significa que ella tiene nueve años.',
      },
    ],
    options: [
      { id: 'opt-3-younger', text: 'younger', isCorrect: true },
      { id: 'opt-3-as-young', text: 'as young', isCorrect: false },
      { id: 'opt-3-young', text: 'young', isCorrect: false },
      { id: 'opt-3-the-younger', text: 'the younger', isCorrect: false },
    ],
    correctAnswerId: 'opt-3-younger',
    audioPrompt:
      "- How old are your brother and sister? - Jerry is thirteen and Sarah is four years younger than he is. - That means that she's nine years old.",
    explanationEn:
      "We add '-er' to short one-syllable adjectives like 'young' to form the comparative: 'younger than'.",
    explanationEs:
      "Añadimos '-er' a adjetivos cortos de una sílaba como 'young' para formar el comparativo: 'younger than' (más joven / menor que).",
  },

  /* Actividad 4 (actividad 4.png) */
  {
    id: 'comparison-comparatives-act-4',
    activityNumber: 4,
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    imageUrl: samuraiSamBoxingImg,
    referenceText: COMPARATIVES_REFERENCE_EN,
    referenceTextEs: COMPARATIVES_REFERENCE_ES,
    referenceHighlights: COMPARATIVES_HIGHLIGHTS,
    dialogueLines: [
      {
        textEn:
          "Paula doesn't watch TV often. She thinks books are ________ TV shows.",
        textEs:
          'Paula no ve la televisión a menudo. Ella piensa que los libros son más interesantes que los programas de televisión.',
        hasBlank: true,
        prefix: "Paula doesn't watch TV often. She thinks books are ",
        suffix: ' TV shows.',
      },
    ],
    options: [
      { id: 'opt-4-the-most-interesting', text: 'the most interesting', isCorrect: false },
      { id: 'opt-4-too-interesting-for', text: 'too interesting for', isCorrect: false },
      { id: 'opt-4-more-interesting-than', text: 'more interesting than', isCorrect: true },
      { id: 'opt-4-less-interesting-than', text: 'less interesting than', isCorrect: false },
    ],
    correctAnswerId: 'opt-4-more-interesting-than',
    audioPrompt:
      "Paula doesn't watch TV often. She thinks books are more interesting than TV shows.",
    explanationEn:
      "Because 'than' is not present in the original sentence, the comparative phrase 'more interesting than' completes the comparison between books and TV shows.",
    explanationEs:
      "Dado que 'than' no está en la oración original, la opción 'more interesting than' completa la comparación entre libros y programas de televisión.",
  },

  /* Actividad 5 (actividad 5.png) */
  {
    id: 'comparison-comparatives-act-5',
    activityNumber: 5,
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    imageUrl: samuraiSamBoxingImg,
    referenceText: COMPARATIVES_REFERENCE_EN,
    referenceTextEs: COMPARATIVES_REFERENCE_ES,
    referenceHighlights: COMPARATIVES_HIGHLIGHTS,
    dialogueLines: [
      {
        textEn: 'The station is ________ on the weekend than during the week.',
        textEs:
          'La estación está más concurrida los fines de semana que durante la semana.',
        hasBlank: true,
        prefix: 'The station is ',
        suffix: ' on the weekend than during the week.',
      },
    ],
    options: [
      { id: 'opt-5-more-crowded', text: 'more crowded', isCorrect: true },
      { id: 'opt-5-too-crowded', text: 'too crowded', isCorrect: false },
      { id: 'opt-5-very-crowded', text: 'very crowded', isCorrect: false },
    ],
    correctAnswerId: 'opt-5-more-crowded',
    audioPrompt:
      'The station is more crowded on the weekend than during the week.',
    explanationEn:
      "'Crowded' takes 'more' in comparative sentences: 'more crowded than'.",
    explanationEs:
      "'Crowded' (lleno/concurrido) forma el comparativo con 'more': 'more crowded than' (más concurrido que).",
  },

  /* Actividad 6 (actividad 6.png) */
  {
    id: 'comparison-comparatives-act-6',
    activityNumber: 6,
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    imageUrl: samuraiSamBoxingImg,
    referenceText: COMPARATIVES_REFERENCE_EN,
    referenceTextEs: COMPARATIVES_REFERENCE_ES,
    referenceHighlights: COMPARATIVES_HIGHLIGHTS,
    dialogueLines: [
      {
        textEn:
          'Ruth has a small car, and her parents have a big one. Her car is ________ than theirs.',
        textEs:
          'Ruth tiene un auto pequeño y sus padres tienen uno grande. Su auto es menos cómodo que el de ellos.',
        hasBlank: true,
        prefix:
          'Ruth has a small car, and her parents have a big one. Her car is ',
        suffix: ' than theirs.',
      },
    ],
    options: [
      { id: 'opt-6-not-comfortable', text: 'not comfortable', isCorrect: false },
      { id: 'opt-6-as-comfortable', text: 'as comfortable', isCorrect: false },
      { id: 'opt-6-too-comfortable', text: 'too comfortable', isCorrect: false },
      { id: 'opt-6-less-comfortable', text: 'less comfortable', isCorrect: true },
    ],
    correctAnswerId: 'opt-6-less-comfortable',
    audioPrompt:
      'Ruth has a small car, and her parents have a big one. Her car is less comfortable than theirs.',
    explanationEn:
      "When comparing two things where one has a lesser degree of quality, we use 'less + adjective + than': 'less comfortable than'.",
    explanationEs:
      "Para comparar expresando inferioridad o menor grado, usamos 'less + adjetivo + than': 'less comfortable than' (menos cómodo que).",
  },

  /* Actividad 7 (actividad 7.png) */
  {
    id: 'comparison-comparatives-act-7',
    activityNumber: 7,
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    imageUrl: samuraiSamBoxingImg,
    referenceText: COMPARATIVES_REFERENCE_EN,
    referenceTextEs: COMPARATIVES_REFERENCE_ES,
    referenceHighlights: COMPARATIVES_HIGHLIGHTS,
    dialogueLines: [
      {
        textEn: '- Sam is strong.',
        textEs: '- Sam es fuerte.',
      },
      {
        textEn:
          '- Peter is ________ than Sam. Peter is always at the health club.',
        textEs:
          '- Peter es más fuerte que Sam. Peter siempre está en el club de salud.',
        hasBlank: true,
        prefix: '- Peter is ',
        suffix: ' than Sam. Peter is always at the health club.',
      },
    ],
    options: [
      { id: 'opt-7-stronger', text: 'stronger', isCorrect: true },
      { id: 'opt-7-strongest', text: 'strongest', isCorrect: false },
      { id: 'opt-7-as-strong-as', text: 'as strong as', isCorrect: false },
    ],
    correctAnswerId: 'opt-7-stronger',
    audioPrompt:
      '- Sam is strong. - Peter is stronger than Sam. Peter is always at the health club.',
    explanationEn:
      "Short adjectives add '-er' in the comparative form: 'strong' becomes 'stronger than'.",
    explanationEs:
      "Los adjetivos cortos añaden '-er' en la forma comparativa: 'strong' se convierte en 'stronger than' (más fuerte que).",
  },

  /* Actividad 8 (actividad 8.png) */
  {
    id: 'comparison-comparatives-act-8',
    activityNumber: 8,
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    imageUrl: samuraiSamBoxingImg,
    referenceText: COMPARATIVES_REFERENCE_EN,
    referenceTextEs: COMPARATIVES_REFERENCE_ES,
    referenceHighlights: COMPARATIVES_HIGHLIGHTS,
    dialogueLines: [
      {
        textEn:
          'Mick Starlight has millions of fans. He is ________ famous than his cousin Henry Starlight.',
        textEs:
          'Mick Starlight tiene millones de fanáticos. Es más famoso que su primo Henry Starlight.',
        hasBlank: true,
        prefix: 'Mick Starlight has millions of fans. He is ',
        suffix: ' famous than his cousin Henry Starlight.',
      },
    ],
    options: [
      { id: 'opt-8-as', text: 'as', isCorrect: false },
      { id: 'opt-8-more', text: 'more', isCorrect: true },
      { id: 'opt-8-the-most', text: 'the most', isCorrect: false },
      { id: 'opt-8-better', text: 'better', isCorrect: false },
    ],
    correctAnswerId: 'opt-8-more',
    audioPrompt:
      'Mick Starlight has millions of fans. He is more famous than his cousin Henry Starlight.',
    explanationEn:
      "Before the adjective 'famous' followed by 'than', we use 'more' to form the comparative: 'more famous than'.",
    explanationEs:
      "Antes del adjetivo 'famous' seguido por 'than', usamos 'more' para formar la estructura comparativa: 'more famous than' (más famoso que).",
  },

  /* Actividad 9 (actividad 9.png) */
  {
    id: 'comparison-comparatives-act-9',
    activityNumber: 9,
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    imageUrl: samuraiSamBoxingImg,
    referenceText: COMPARATIVES_REFERENCE_EN,
    referenceTextEs: COMPARATIVES_REFERENCE_ES,
    referenceHighlights: COMPARATIVES_HIGHLIGHTS,
    dialogueLines: [
      {
        textEn:
          'Miriam and Debbie both work hard, but Miriam gets ________ grades in school.',
        textEs:
          'Miriam y Debbie trabajan duro ambas, pero Miriam obtiene mejores calificaciones en la escuela.',
        hasBlank: true,
        prefix:
          'Miriam and Debbie both work hard, but Miriam gets ',
        suffix: ' grades in school.',
      },
    ],
    options: [
      { id: 'opt-9-the-most', text: 'the most', isCorrect: false },
      { id: 'opt-9-best', text: 'best', isCorrect: false },
      { id: 'opt-9-as-good', text: 'as good', isCorrect: false },
      { id: 'opt-9-better', text: 'better', isCorrect: true },
    ],
    correctAnswerId: 'opt-9-better',
    audioPrompt:
      'Miriam and Debbie both work hard, but Miriam gets better grades in school.',
    explanationEn:
      "'Better' is the irregular comparative form of 'good'. Comparing two students, Miriam gets 'better' grades.",
    explanationEs:
      "'Better' es la forma comparativa irregular de 'good' (bueno). Al comparar a las dos, Miriam obtiene 'better grades' (mejores calificaciones).",
  },

  /* Actividad 10 (actividad 10.png) */
  {
    id: 'comparison-comparatives-act-10',
    activityNumber: 10,
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    imageUrl: samuraiSamBoxingImg,
    referenceText: COMPARATIVES_REFERENCE_EN,
    referenceTextEs: COMPARATIVES_REFERENCE_ES,
    referenceHighlights: COMPARATIVES_HIGHLIGHTS,
    dialogueLines: [
      {
        textEn: '- I went to Italy for two weeks.',
        textEs: '- Fui a Italia por dos semanas.',
      },
      {
        textEn:
          '- You did? We went to the beach for a week. Our vacation was ________ than yours.',
        textEs:
          '- ¿En serio? Fuimos a la playa por una semana. Nuestras vacaciones fueron más cortas que las tuyas.',
        hasBlank: true,
        prefix:
          '- You did? We went to the beach for a week. Our vacation was ',
        suffix: ' than yours.',
      },
    ],
    options: [
      { id: 'opt-10-the-shortest', text: 'the shortest', isCorrect: false },
      { id: 'opt-10-shorter', text: 'shorter', isCorrect: true },
      { id: 'opt-10-too-short', text: 'too short', isCorrect: false },
      { id: 'opt-10-as-short', text: 'as short', isCorrect: false },
    ],
    correctAnswerId: 'opt-10-shorter',
    audioPrompt:
      '- I went to Italy for two weeks. - You did? We went to the beach for a week. Our vacation was shorter than yours.',
    explanationEn:
      "One-syllable adjective 'short' adds '-er' to form the comparative: 'shorter than'.",
    explanationEs:
      "El adjetivo de una sílaba 'short' añade '-er' para formar el comparativo: 'shorter than' (más corto/a que).",
  },

  /* Actividad 11 (actividad 11.png) */
  {
    id: 'comparison-comparatives-act-11',
    activityNumber: 11,
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    imageUrl: samuraiSamBoxingImg,
    referenceText: COMPARATIVES_REFERENCE_EN,
    referenceTextEs: COMPARATIVES_REFERENCE_ES,
    referenceHighlights: COMPARATIVES_HIGHLIGHTS,
    dialogueLines: [
      {
        textEn:
          "Ed and four friends are going to the beach. Ed's car is very small and old, so we're taking Peter's car. His car is ________ than Ed's.",
        textEs:
          'Ed y cuatro amigos van a la playa. El auto de Ed es muy pequeño y viejo, así que iremos en el auto de Peter. Su auto es más grande que el de Ed.',
        hasBlank: true,
        prefix:
          "Ed and four friends are going to the beach. Ed's car is very small and old, so we're taking Peter's car. His car is ",
        suffix: " than Ed's.",
      },
    ],
    options: [
      { id: 'opt-11-bigger', text: 'bigger', isCorrect: true },
      { id: 'opt-11-too-big', text: 'too big', isCorrect: false },
      { id: 'opt-11-greater', text: 'greater', isCorrect: false },
    ],
    correctAnswerId: 'opt-11-bigger',
    audioPrompt:
      "Ed and four friends are going to the beach. Ed's car is very small and old, so we're taking Peter's car. His car is bigger than Ed's.",
    explanationEn:
      "The comparative of 'big' is 'bigger' (consonant-vowel-consonant doubles the last letter): 'bigger than'.",
    explanationEs:
      "El comparativo de 'big' es 'bigger' (se duplica la consonante 'g'): 'bigger than' (más grande que).",
  },
];

// Actividad 12: Test (5 tests en orden)
export const COMPARATIVES_TESTS: ComparisonTestData[] = [
  /* Test 1 (test 1.png) */
  {
    id: 'comparison-comparatives-test-1',
    testNumber: 1,
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    imageUrl: samuraiSamBoxingImg,
    referenceText: COMPARATIVES_REFERENCE_EN,
    referenceTextEs: COMPARATIVES_REFERENCE_ES,
    referenceHighlights: COMPARATIVES_HIGHLIGHTS,
    dialogueLines: [
      {
        textEn:
          'Tom got to school at 8 A.M. and I came at 9 A.M. Tom had an ________ class than I did.',
        textEs:
          'Tom llegó a la escuela a las 8 A.M. y yo vine a las 9 A.M. Tom tuvo una clase más temprana que la mía.',
        hasBlank: true,
        prefix:
          'Tom got to school at 8 A.M. and I came at 9 A.M. Tom had an ',
        suffix: ' class than I did.',
      },
    ],
    options: [
      { id: 'test-1-opt-earlier', text: 'earlier', isCorrect: true },
      { id: 'test-1-opt-too-early', text: 'too early', isCorrect: false },
      { id: 'test-1-opt-very-early', text: 'very early', isCorrect: false },
    ],
    correctAnswerId: 'test-1-opt-earlier',
    audioPrompt:
      'Tom got to school at 8 A.M. and I came at 9 A.M. Tom had an earlier class than I did.',
    explanationEn:
      "The comparative of 'early' is 'earlier' (y changes to i + er): 'an earlier class than I did'.",
    explanationEs:
      "El comparativo de 'early' (temprano) es 'earlier' (la 'y' cambia a 'i' + 'er'): 'an earlier class than I did' (una clase más temprana que la mía).",
  },

  /* Test 2 (test 2.png) */
  {
    id: 'comparison-comparatives-test-2',
    testNumber: 2,
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    imageUrl: samuraiSamBoxingImg,
    referenceText: COMPARATIVES_REFERENCE_EN,
    referenceTextEs: COMPARATIVES_REFERENCE_ES,
    referenceHighlights: COMPARATIVES_HIGHLIGHTS,
    dialogueLines: [
      {
        textEn: '- Is there a lot of traffic in your neighborhood?',
        textEs: '- ¿Hay mucho tráfico en tu vecindario?',
      },
      {
        textEn:
          '- Yes, but it\'s ________ in the afternoon than in the morning.',
        textEs:
          '- Sí, pero es peor en la tarde que en la mañana.',
        hasBlank: true,
        prefix: '- Yes, but it\'s ',
        suffix: ' in the afternoon than in the morning.',
      },
    ],
    options: [
      { id: 'test-2-opt-as-bad-as', text: 'as bad as', isCorrect: false },
      { id: 'test-2-opt-very-bad', text: 'very bad', isCorrect: false },
      { id: 'test-2-opt-the-worst', text: 'the worst', isCorrect: false },
      { id: 'test-2-opt-worse', text: 'worse', isCorrect: true },
    ],
    correctAnswerId: 'test-2-opt-worse',
    audioPrompt:
      '- Is there a lot of traffic in your neighborhood? - Yes, but it\'s worse in the afternoon than in the morning.',
    explanationEn:
      "'Worse' is the irregular comparative form of 'bad'. With 'than', we say 'worse in the afternoon than in the morning'.",
    explanationEs:
      "'Worse' es la forma comparativa irregular de 'bad' (malo): 'worse than' (peor que).",
  },

  /* Test 3 (test 3.png) */
  {
    id: 'comparison-comparatives-test-3',
    testNumber: 3,
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    imageUrl: samuraiSamBoxingImg,
    referenceText: COMPARATIVES_REFERENCE_EN,
    referenceTextEs: COMPARATIVES_REFERENCE_ES,
    referenceHighlights: COMPARATIVES_HIGHLIGHTS,
    dialogueLines: [
      {
        textEn: '- Which movie do you want to go to?',
        textEs: '- ¿A qué película quieres ir?',
      },
      {
        textEn:
          '- The mystery movie is more exciting, but the one with Jeff Lorel is ________.',
        textEs:
          '- La película de misterio es más emocionante, pero la de Jeff Lorel es más divertida.',
        hasBlank: true,
        prefix:
          '- The mystery movie is more exciting, but the one with Jeff Lorel is ',
        suffix: '.',
      },
    ],
    options: [
      { id: 'test-3-opt-as-funny', text: 'as funny', isCorrect: false },
      { id: 'test-3-opt-funnier', text: 'funnier', isCorrect: true },
      { id: 'test-3-opt-the-most-funny', text: 'the most funny', isCorrect: false },
      { id: 'test-3-opt-funny-as', text: 'funny as', isCorrect: false },
    ],
    correctAnswerId: 'test-3-opt-funnier',
    audioPrompt:
      '- Which movie do you want to go to? - The mystery movie is more exciting, but the one with Jeff Lorel is funnier.',
    explanationEn:
      "The two-syllable adjective 'funny' ending in -y changes to -ier in the comparative form: 'funnier'.",
    explanationEs:
      "El adjetivo de dos sílabas 'funny' terminado en '-y' cambia a '-ier' en la forma comparativa: 'funnier' (más divertida).",
  },

  /* Test 4 (test 4.png) */
  {
    id: 'comparison-comparatives-test-4',
    testNumber: 4,
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    imageUrl: samuraiSamBoxingImg,
    referenceText: COMPARATIVES_REFERENCE_EN,
    referenceTextEs: COMPARATIVES_REFERENCE_ES,
    referenceHighlights: COMPARATIVES_HIGHLIGHTS,
    dialogueLines: [
      {
        textEn: '- Try the soup now. I put more salt in it.',
        textEs: '- Prueba la sopa ahora. Le puse más sal.',
      },
      {
        textEn: '- Mmm ... yes, it\'s ________ than it was.',
        textEs: '- Mmm... sí, está mejor de lo que estaba.',
        hasBlank: true,
        prefix: '- Mmm ... yes, it\'s ',
        suffix: ' than it was.',
      },
    ],
    options: [
      { id: 'test-4-opt-best', text: 'best', isCorrect: false },
      { id: 'test-4-opt-the-best', text: 'the best', isCorrect: false },
      { id: 'test-4-opt-better', text: 'better', isCorrect: true },
      { id: 'test-4-opt-as-good', text: 'as good', isCorrect: false },
    ],
    correctAnswerId: 'test-4-opt-better',
    audioPrompt:
      '- Try the soup now. I put more salt in it. - Mmm ... yes, it\'s better than it was.',
    explanationEn:
      "'Better' is the irregular comparative of 'good'. Followed by 'than it was', the correct answer is 'better'.",
    explanationEs:
      "'Better' es el comparativo irregular de 'good': 'better than it was' (mejor de lo que estaba).",
  },

  /* Test 5 (test 5.png) */
  {
    id: 'comparison-comparatives-test-5',
    testNumber: 5,
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    imageUrl: samuraiSamBoxingImg,
    referenceText: COMPARATIVES_REFERENCE_EN,
    referenceTextEs: COMPARATIVES_REFERENCE_ES,
    referenceHighlights: COMPARATIVES_HIGHLIGHTS,
    dialogueLines: [
      {
        textEn: '- Which beach do you want to go to?',
        textEs: '- ¿A qué playa quieres ir?',
      },
      {
        textEn:
          '- Let\'s go to Singing Beach. It\'s ________ the other beaches.',
        textEs:
          '- Vamos a Singing Beach. Está más cerca que las otras playas.',
        hasBlank: true,
        prefix: '- Let\'s go to Singing Beach. It\'s ',
        suffix: ' the other beaches.',
      },
    ],
    options: [
      { id: 'test-5-opt-closer-than', text: 'closer than', isCorrect: true },
      { id: 'test-5-opt-closest', text: 'closest', isCorrect: false },
      { id: 'test-5-opt-close-as', text: 'close as', isCorrect: false },
    ],
    correctAnswerId: 'test-5-opt-closer-than',
    audioPrompt:
      '- Which beach do you want to go to? - Let\'s go to Singing Beach. It\'s closer than the other beaches.',
    explanationEn:
      "Because 'than' is not in the sentence, we need 'closer than' to make the comparison with 'the other beaches'.",
    explanationEs:
      "Dado que 'than' no aparece en la oración, se requiere 'closer than' para establecer la comparación con 'the other beaches' (más cerca que las otras playas).",
  },
];
