import mickStarlightCarImg from '../assets/images/mick_starlight_car_1789599951810.jpg';

export { mickStarlightCarImg };

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

export const COMPARISON_REFERENCE_EN = "- Wow! Mick Starlight's car is as long as that bus.";
export const COMPARISON_REFERENCE_ES = "- ¡Guau! El auto de Mick Starlight es tan largo como ese autobús.";
export const COMPARISON_HIGHLIGHTS = ['as long as'];

// Explore / Actividad 1
export const COMPARISON_ACTIVITY_1 = {
  id: 'comparison-equality-act-1',
  activityNumber: 1,
  titleEn: 'Explore',
  titleEs: 'Explorar',
  audioText: "- Wow! Mick Starlight's car is as long as that bus.",
  textEn: "- Wow! Mick Starlight's car is as long as that bus.",
  textEs: "- ¡Guau! El auto de Mick Starlight es tan largo como ese autobús.",
  highlights: ['as long as'],
  imageUrl: mickStarlightCarImg,
  durationSeconds: 5,
};

// Actividades 2 a 11
export const COMPARISON_ACTIVITIES: ComparisonActivityData[] = [
  /* Actividad 2 (actividad 2.png) */
  {
    id: 'comparison-equality-act-2',
    activityNumber: 2,
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    imageUrl: mickStarlightCarImg,
    referenceText: COMPARISON_REFERENCE_EN,
    referenceTextEs: COMPARISON_REFERENCE_ES,
    referenceHighlights: COMPARISON_HIGHLIGHTS,
    dialogueLines: [
      {
        textEn: "Is Steven Queen's new mystery book ___________ as his last one?",
        textEs: '¿El nuevo libro de misterio de Steven Queen es tan emocionante como el anterior?',
        hasBlank: true,
        prefix: "Is Steven Queen's new mystery book ",
        suffix: ' as his last one?',
      },
    ],
    options: [
      { id: 'opt-2-most-exciting', text: 'the most exciting', isCorrect: false },
      { id: 'opt-2-as-exciting', text: 'as exciting', isCorrect: true },
      { id: 'opt-2-so-exciting', text: 'so exciting', isCorrect: false },
      { id: 'opt-2-more-exciting', text: 'more exciting', isCorrect: false },
    ],
    correctAnswerId: 'opt-2-as-exciting',
    audioPrompt: "Is Steven Queen's new mystery book as exciting as his last one?",
    explanationEn: "We use 'as + adjective + as' to express equality. Since 'as' is already present after the blank, we need 'as exciting'.",
    explanationEs: "Usamos la estructura 'as + adjetivo + as' para expresar igualdad. Como la palabra 'as' ya se encuentra después del espacio en blanco, seleccionamos 'as exciting'.",
  },

  /* Actividad 3 (actividad 3.png) */
  {
    id: 'comparison-equality-act-3',
    activityNumber: 3,
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    imageUrl: mickStarlightCarImg,
    referenceText: COMPARISON_REFERENCE_EN,
    referenceTextEs: COMPARISON_REFERENCE_ES,
    referenceHighlights: COMPARISON_HIGHLIGHTS,
    dialogueLines: [
      {
        textEn: "This stereo is very nice, but it costs a lot. Do you have some that aren't ___________ ?",
        textEs: 'Este equipo de música es muy lindo, pero cuesta mucho. ¿Tiene algunos que no sean tan caros?',
        hasBlank: true,
        prefix: "This stereo is very nice, but it costs a lot. Do you have some that aren't ",
        suffix: ' ?',
      },
    ],
    options: [
      { id: 'opt-3-more-expensive', text: 'more expensive', isCorrect: false },
      { id: 'opt-3-expensive-as', text: 'expensive as', isCorrect: false },
      { id: 'opt-3-as-expensive', text: 'as expensive', isCorrect: true },
    ],
    correctAnswerId: 'opt-3-as-expensive',
    audioPrompt: "This stereo is very nice, but it costs a lot. Do you have some that aren't as expensive?",
    explanationEn: "In negative comparison of equality where the comparison target is implied, we use 'aren't as expensive' (not as expensive).",
    explanationEs: "En comparaciones de igualdad negativas donde el objeto de comparación se sobreentiende en el contexto, usamos 'as expensive' (no tan caros).",
  },

  /* Actividad 4 (actividad 4.png) */
  {
    id: 'comparison-equality-act-4',
    activityNumber: 4,
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    imageUrl: mickStarlightCarImg,
    referenceText: COMPARISON_REFERENCE_EN,
    referenceTextEs: COMPARISON_REFERENCE_ES,
    referenceHighlights: COMPARISON_HIGHLIGHTS,
    dialogueLines: [
      {
        textEn: '- How do you like your Spanish class?',
        textEs: '- ¿Qué te parece tu clase de español?',
        hasBlank: false,
      },
      {
        textEn: "- I like it. I took French last year, and Spanish isn't ___________ .",
        textEs: '- Me gusta. El año pasado cursé francés, y el español no es tan difícil.',
        hasBlank: true,
        prefix: "- I like it. I took French last year, and Spanish isn't ",
        suffix: ' .',
      },
    ],
    options: [
      { id: 'opt-4-as-diff-as', text: 'as difficult as', isCorrect: false },
      { id: 'opt-4-more-diff', text: 'more difficult', isCorrect: false },
      { id: 'opt-4-diff-as', text: 'difficult as', isCorrect: false },
      { id: 'opt-4-as-diff', text: 'as difficult', isCorrect: true },
    ],
    correctAnswerId: 'opt-4-as-diff',
    audioPrompt: "- How do you like your Spanish class? - I like it. I took French last year, and Spanish isn't as difficult.",
    explanationEn: "The second 'as' is omitted at the end of the sentence because the comparison (French) was already stated: 'Spanish isn't as difficult'.",
    explanationEs: "Se omite el segundo 'as' porque el referente de comparación (francés) ya fue mencionado previamente: 'Spanish isn't as difficult' (el español no es tan difícil).",
  },

  /* Actividad 5 (actividad 5.png) */
  {
    id: 'comparison-equality-act-5',
    activityNumber: 5,
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    imageUrl: mickStarlightCarImg,
    referenceText: COMPARISON_REFERENCE_EN,
    referenceTextEs: COMPARISON_REFERENCE_ES,
    referenceHighlights: COMPARISON_HIGHLIGHTS,
    dialogueLines: [
      {
        textEn: "- Was today's test very difficult?",
        textEs: '- ¿El examen de hoy fue muy difícil?',
        hasBlank: false,
      },
      {
        textEn: '- Yes, it was, and it was ___________ the last one we had.',
        textEs: '- Sí, lo fue, y fue tan largo como el último que tuvimos.',
        hasBlank: true,
        prefix: '- Yes, it was, and it was ',
        suffix: ' the last one we had.',
      },
    ],
    options: [
      { id: 'opt-5-as-long-as', text: 'as long as', isCorrect: true },
      { id: 'opt-5-the-longer', text: 'the longer', isCorrect: false },
      { id: 'opt-5-so-long', text: 'so long', isCorrect: false },
      { id: 'opt-5-long-as', text: 'long as', isCorrect: false },
    ],
    correctAnswerId: 'opt-5-as-long-as',
    audioPrompt: "- Was today's test very difficult? - Yes, it was, and it was as long as the last one we had.",
    explanationEn: "We require the complete equality comparative pattern 'as + adjective + as': 'as long as the last one we had'.",
    explanationEs: "Requerimos la fórmula comparativa de igualdad completa 'as + adjetivo + as': 'as long as' (tan largo como).",
  },

  /* Actividad 6 (actividad 6.png) */
  {
    id: 'comparison-equality-act-6',
    activityNumber: 6,
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    imageUrl: mickStarlightCarImg,
    referenceText: COMPARISON_REFERENCE_EN,
    referenceTextEs: COMPARISON_REFERENCE_ES,
    referenceHighlights: COMPARISON_HIGHLIGHTS,
    dialogueLines: [
      {
        textEn: '- Hi, Mary. How is your hotel room?',
        textEs: '- Hola, Mary. ¿Cómo está tu habitación de hotel?',
        hasBlank: false,
      },
      {
        textEn: "- It's very small. It's not as ___________ .",
        textEs: '- Es muy pequeña. No es tan grande como la tuya.',
        hasBlank: true,
        prefix: "- It's very small. It's not as ",
        suffix: ' .',
      },
    ],
    options: [
      { id: 'opt-6-bigger-than', text: 'bigger than yours', isCorrect: false },
      { id: 'opt-6-as-big-as-you', text: 'as big as you', isCorrect: false },
      { id: 'opt-6-big-as-yours', text: 'big as yours', isCorrect: true },
      { id: 'opt-6-yours-is-big', text: 'yours is big', isCorrect: false },
    ],
    correctAnswerId: 'opt-6-big-as-yours',
    audioPrompt: "- Hi, Mary. How is your hotel room? - It's very small. It's not as big as yours.",
    explanationEn: "Since 'not as' already appears in the sentence, we complete it with 'adjective + as + possessive pronoun' -> 'big as yours'.",
    explanationEs: "Como la frase ya incluye 'not as', se completa con 'adjetivo + as + pronombre posesivo' -> 'big as yours' (tan grande como la tuya).",
  },

  /* Actividad 7 (actividad 7.png) */
  {
    id: 'comparison-equality-act-7',
    activityNumber: 7,
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    imageUrl: mickStarlightCarImg,
    referenceText: COMPARISON_REFERENCE_EN,
    referenceTextEs: COMPARISON_REFERENCE_ES,
    referenceHighlights: COMPARISON_HIGHLIGHTS,
    dialogueLines: [
      {
        textEn: "This coffee tastes like water! It's not ___________ I like it.",
        textEs: '¡Este café sabe a agua! No es tan fuerte como a mí me gusta.',
        hasBlank: true,
        prefix: "This coffee tastes like water! It's not ",
        suffix: ' I like it.',
      },
    ],
    options: [
      { id: 'opt-7-as-strong-as', text: 'as strong as', isCorrect: true },
      { id: 'opt-7-strong-as', text: 'strong as', isCorrect: false },
      { id: 'opt-7-so-strong', text: 'so strong', isCorrect: false },
      { id: 'opt-7-stronger-than', text: 'stronger than', isCorrect: false },
    ],
    correctAnswerId: 'opt-7-as-strong-as',
    audioPrompt: "This coffee tastes like water! It's not as strong as I like it.",
    explanationEn: "We need the full 'as strong as' construction to show it is not as strong as preferred.",
    explanationEs: "Utilizamos la estructura completa 'as strong as' (tan fuerte como) para expresar que no tiene la intensidad esperada.",
  },

  /* Actividad 8 (actividad 8.png) */
  {
    id: 'comparison-equality-act-8',
    activityNumber: 8,
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    imageUrl: mickStarlightCarImg,
    referenceText: COMPARISON_REFERENCE_EN,
    referenceTextEs: COMPARISON_REFERENCE_ES,
    referenceHighlights: COMPARISON_HIGHLIGHTS,
    dialogueLines: [
      {
        textEn: "Tina, I'm sorry you're in the hospital. You look awful! I hope you don't feel ___________ as you look.",
        textEs: 'Tina, lamento que estés en el hospital. ¡Te ves fatal! Espero que no te sientas tan mal como te ves.',
        hasBlank: true,
        prefix: "Tina, I'm sorry you're in the hospital. You look awful! I hope you don't feel ",
        suffix: ' as you look.',
      },
    ],
    options: [
      { id: 'opt-8-not-bad', text: 'not bad', isCorrect: false },
      { id: 'opt-8-as-bad', text: 'as bad', isCorrect: true },
      { id: 'opt-8-the-worst', text: 'the worst', isCorrect: false },
      { id: 'opt-8-too-bad', text: 'too bad', isCorrect: false },
    ],
    correctAnswerId: 'opt-8-as-bad',
    audioPrompt: "Tina, I'm sorry you're in the hospital. You look awful! I hope you don't feel as bad as you look.",
    explanationEn: "The second 'as' is already in the sentence ('as you look'), so we supply 'as bad' to complete 'as bad as'.",
    explanationEs: "La palabra 'as' ya figura tras el espacio en blanco ('as you look'), por lo que completamos con 'as bad' para formar 'as bad as' (tan mal como).",
  },

  /* Actividad 9 (actividad 9.png) */
  {
    id: 'comparison-equality-act-9',
    activityNumber: 9,
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    imageUrl: mickStarlightCarImg,
    referenceText: COMPARISON_REFERENCE_EN,
    referenceTextEs: COMPARISON_REFERENCE_ES,
    referenceHighlights: COMPARISON_HIGHLIGHTS,
    dialogueLines: [
      {
        textEn: "The children aren't ___________ as they usually are. What are they doing?",
        textEs: 'Los niños no están tan ruidosos como de costumbre. ¿Qué estarán haciendo?',
        hasBlank: true,
        prefix: "The children aren't ",
        suffix: ' as they usually are. What are they doing?',
      },
    ],
    options: [
      { id: 'opt-9-noisy', text: 'noisy', isCorrect: false },
      { id: 'opt-9-noisier', text: 'noisier', isCorrect: false },
      { id: 'opt-9-too-noisy', text: 'too noisy', isCorrect: false },
      { id: 'opt-9-as-noisy', text: 'as noisy', isCorrect: true },
    ],
    correctAnswerId: 'opt-9-as-noisy',
    audioPrompt: "The children aren't as noisy as they usually are. What are they doing?",
    explanationEn: "'as they usually are' follows the blank, so 'as noisy' correctly forms the equality structure 'aren't as noisy as'.",
    explanationEs: "'as they usually are' sigue al espacio, de modo que 'as noisy' completa debidamente 'aren't as noisy as' (no están tan ruidosos como).",
  },

  /* Actividad 10 (actividad 10.png) */
  {
    id: 'comparison-equality-act-10',
    activityNumber: 10,
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    imageUrl: mickStarlightCarImg,
    referenceText: COMPARISON_REFERENCE_EN,
    referenceTextEs: COMPARISON_REFERENCE_ES,
    referenceHighlights: COMPARISON_HIGHLIGHTS,
    dialogueLines: [
      {
        textEn: "Let's take the train. It's not usually ___________ the bus.",
        textEs: 'Tomemos el tren. Por lo general no está tan lleno como el autobús.',
        hasBlank: true,
        prefix: "Let's take the train. It's not usually ",
        suffix: ' the bus.',
      },
    ],
    options: [
      { id: 'opt-10-more-crowded', text: 'more crowded', isCorrect: false },
      { id: 'opt-10-so-crowded', text: 'so crowded', isCorrect: false },
      { id: 'opt-10-as-crowded-as', text: 'as crowded as', isCorrect: true },
      { id: 'opt-10-too-crowded', text: 'too crowded', isCorrect: false },
    ],
    correctAnswerId: 'opt-10-as-crowded-as',
    audioPrompt: "Let's take the train. It's not usually as crowded as the bus.",
    explanationEn: "We need the complete comparison 'as crowded as' before 'the bus'.",
    explanationEs: "Necesitamos la estructura completa 'as crowded as' (tan lleno como) antes de 'the bus'.",
  },

  /* Actividad 11 (actividad 11.png) */
  {
    id: 'comparison-equality-act-11',
    activityNumber: 11,
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    imageUrl: mickStarlightCarImg,
    referenceText: COMPARISON_REFERENCE_EN,
    referenceTextEs: COMPARISON_REFERENCE_ES,
    referenceHighlights: COMPARISON_HIGHLIGHTS,
    dialogueLines: [
      {
        textEn: "- We can't play tennis again today.",
        textEs: '- No podemos jugar al tenis otra vez hoy.',
        hasBlank: false,
      },
      {
        textEn: "- I know. It's not ___________ as it was last night, but it's still too wet to play.",
        textEs: '- Lo sé. No está tan lluvioso como anoche, pero todavía está demasiado mojado para jugar.',
        hasBlank: true,
        prefix: "- I know. It's not ",
        suffix: " as it was last night, but it's still too wet to play.",
      },
    ],
    options: [
      { id: 'opt-11-rainy', text: 'rainy', isCorrect: false },
      { id: 'opt-11-rainier', text: 'rainier', isCorrect: false },
      { id: 'opt-11-too-rainy', text: 'too rainy', isCorrect: false },
      { id: 'opt-11-as-rainy', text: 'as rainy', isCorrect: true },
    ],
    correctAnswerId: 'opt-11-as-rainy',
    audioPrompt: "- We can't play tennis again today. - I know. It's not as rainy as it was last night, but it's still too wet to play.",
    explanationEn: "'as it was last night' is already present, so 'as rainy' is required to form 'as rainy as'.",
    explanationEs: "'as it was last night' ya se encuentra presente, por lo que se requiere 'as rainy' para formar 'as rainy as' (tan lluvioso como).",
  },
];

// Actividad 12: Test (5 Tests)
export const COMPARISON_TESTS: ComparisonTestData[] = [
  /* Test 1 (test 1.png) */
  {
    id: 'comparison-equality-test-1',
    testNumber: 1,
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    imageUrl: mickStarlightCarImg,
    referenceText: COMPARISON_REFERENCE_EN,
    referenceTextEs: COMPARISON_REFERENCE_ES,
    referenceHighlights: COMPARISON_HIGHLIGHTS,
    dialogueLines: [
      {
        textEn: '- Was the math test ___________ the last test?',
        textEs: '- ¿El examen de matemáticas fue tan difícil como el examen anterior?',
        hasBlank: true,
        prefix: '- Was the math test ',
        suffix: ' the last test?',
      },
      {
        textEn: '- No. It was harder!',
        textEs: '- No. ¡Fue más difícil!',
        hasBlank: false,
      },
    ],
    options: [
      { id: 'opt-t1-the-hardest', text: 'the hardest', isCorrect: false },
      { id: 'opt-t1-as-hard-as', text: 'as hard as', isCorrect: true },
      { id: 'opt-t1-as-harder-than', text: 'as harder than', isCorrect: false },
    ],
    correctAnswerId: 'opt-t1-as-hard-as',
    audioPrompt: '- Was the math test as hard as the last test? - No. It was harder!',
    explanationEn: "We compare the difficulty of the two tests with 'as hard as': 'Was the math test as hard as the last test?'.",
    explanationEs: "Comparamos la dificultad de ambos exámenes con 'as hard as': 'Was the math test as hard as the last test?' (¿fue tan difícil como?).",
  },

  /* Test 2 (test 2.png) */
  {
    id: 'comparison-equality-test-2',
    testNumber: 2,
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    imageUrl: mickStarlightCarImg,
    referenceText: COMPARISON_REFERENCE_EN,
    referenceTextEs: COMPARISON_REFERENCE_ES,
    referenceHighlights: COMPARISON_HIGHLIGHTS,
    dialogueLines: [
      {
        textEn: "- Hey, Janet, did you hear the news? Tony is Anita's new boyfriend!",
        textEs: "- ¡Oye, Janet! ¿Escuchaste las novedades? ¡Tony es el nuevo novio de Anita!",
        hasBlank: false,
      },
      {
        textEn: "- Really? I don't like Tony. He isn't ___________ Marcos.",
        textEs: '- ¿En serio? No me cae bien Tony. No es tan simpático como Marcos.',
        hasBlank: true,
        prefix: "- Really? I don't like Tony. He isn't ",
        suffix: ' Marcos.',
      },
    ],
    options: [
      { id: 'opt-t2-the-nicest', text: 'the nicest', isCorrect: false },
      { id: 'opt-t2-as-nice-as', text: 'as nice as', isCorrect: true },
      { id: 'opt-t2-nicer', text: 'nicer', isCorrect: false },
    ],
    correctAnswerId: 'opt-t2-as-nice-as',
    audioPrompt: "- Hey, Janet, did you hear the news? Tony is Anita's new boyfriend! - Really? I don't like Tony. He isn't as nice as Marcos.",
    explanationEn: "We use 'as nice as' to say he doesn't compare equally to Marcos in pleasantness: 'He isn't as nice as Marcos'.",
    explanationEs: "Usamos 'as nice as' para expresar que no es tan agradable como Marcos: 'He isn't as nice as Marcos' (no es tan simpático como).",
  },

  /* Test 3 (test 3.png) */
  {
    id: 'comparison-equality-test-3',
    testNumber: 3,
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    imageUrl: mickStarlightCarImg,
    referenceText: COMPARISON_REFERENCE_EN,
    referenceTextEs: COMPARISON_REFERENCE_ES,
    referenceHighlights: COMPARISON_HIGHLIGHTS,
    dialogueLines: [
      {
        textEn: "Are you Lev's son? You're ___________ he is.",
        textEs: '¿Eres el hijo de Lev? Eres tan alto como él.',
        hasBlank: true,
        prefix: "Are you Lev's son? You're ",
        suffix: ' he is.',
      },
    ],
    options: [
      { id: 'opt-t3-the-tallest', text: 'the tallest', isCorrect: false },
      { id: 'opt-t3-taller', text: 'taller', isCorrect: false },
      { id: 'opt-t3-as-tall-as', text: 'as tall as', isCorrect: true },
      { id: 'opt-t3-tall-as', text: 'tall as', isCorrect: false },
    ],
    correctAnswerId: 'opt-t3-as-tall-as',
    audioPrompt: "Are you Lev's son? You're as tall as he is.",
    explanationEn: "To compare height in equal terms, we use 'as tall as': 'You're as tall as he is'.",
    explanationEs: "Para comparar estatura en términos de igualdad usamos la estructura completa 'as tall as': 'You're as tall as he is' (tan alto como).",
  },

  /* Test 4 (test 4.png) */
  {
    id: 'comparison-equality-test-4',
    testNumber: 4,
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    imageUrl: mickStarlightCarImg,
    referenceText: COMPARISON_REFERENCE_EN,
    referenceTextEs: COMPARISON_REFERENCE_ES,
    referenceHighlights: COMPARISON_HIGHLIGHTS,
    dialogueLines: [
      {
        textEn: '- Where are you going for vacation?',
        textEs: '- ¿A dónde vas de vacaciones?',
        hasBlank: false,
      },
      {
        textEn: "- I don't know ... somewhere warm. Maybe Florida.",
        textEs: '- No lo sé... a algún lugar cálido. Quizás a Florida.',
        hasBlank: false,
      },
      {
        textEn: "- You can go to Louisiana. It's ___________ Florida.",
        textEs: '- Puedes ir a Luisiana. Es tan cálida como Florida.',
        hasBlank: true,
        prefix: "- You can go to Louisiana. It's ",
        suffix: ' Florida.',
      },
    ],
    options: [
      { id: 'opt-t4-as-warm-as', text: 'as warm as', isCorrect: true },
      { id: 'opt-t4-as-warmer-as', text: 'as warmer as', isCorrect: false },
      { id: 'opt-t4-warmest', text: 'warmest', isCorrect: false },
    ],
    correctAnswerId: 'opt-t4-as-warm-as',
    audioPrompt: "- Where are you going for vacation? - I don't know ... somewhere warm. Maybe Florida. - You can go to Louisiana. It's as warm as Florida.",
    explanationEn: "We use 'as + base adjective + as' to compare warmth equally: 'as warm as Florida'.",
    explanationEs: "Usamos la fórmula 'as + adjetivo base + as' para comparar el clima en igualdad: 'as warm as Florida' (tan cálido como Florida).",
  },

  /* Test 5 (test 5.png) */
  {
    id: 'comparison-equality-test-5',
    testNumber: 5,
    instructions: 'Drag the correct answer/s into place.',
    instructionsEs: 'Arrastra la(s) respuesta(s) correcta(s) a su lugar.',
    imageUrl: mickStarlightCarImg,
    referenceText: COMPARISON_REFERENCE_EN,
    referenceTextEs: COMPARISON_REFERENCE_ES,
    referenceHighlights: COMPARISON_HIGHLIGHTS,
    dialogueLines: [
      {
        textEn: "Today the store isn't ___________ it was before the holiday.",
        textEs: 'Hoy la tienda no está tan concurrida como estaba antes de las fiestas.',
        hasBlank: true,
        prefix: "Today the store isn't ",
        suffix: ' it was before the holiday.',
      },
    ],
    options: [
      { id: 'opt-t5-too-busy', text: 'too busy', isCorrect: false },
      { id: 'opt-t5-very-busy', text: 'very busy', isCorrect: false },
      { id: 'opt-t5-as-busy-as', text: 'as busy as', isCorrect: true },
      { id: 'opt-t5-so-busy', text: 'so busy', isCorrect: false },
    ],
    correctAnswerId: 'opt-t5-as-busy-as',
    audioPrompt: "Today the store isn't as busy as it was before the holiday.",
    explanationEn: "We state that the store is not equally busy compared to before the holiday with 'as busy as': 'isn't as busy as it was'.",
    explanationEs: "Expresamos que la tienda no está tan concurrida respecto a antes de las fiestas con 'as busy as': 'isn't as busy as it was' (no está tan concurrida como).",
  },
];
