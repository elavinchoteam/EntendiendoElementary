import canImg from '../assets/images/can_of_food_1789768875954.jpg';
import vegetablesImg from '../assets/images/fresh_vegetables_1789768887604.jpg';
import steakImg from '../assets/images/grilled_steak_1789768900591.jpg';
import onionsImg from '../assets/images/fresh_onions_1789768911651.jpg';
import turkeyImg from '../assets/images/roasted_turkey_1789768923290.jpg';
import watermelonImg from '../assets/images/sliced_watermelon_1789768935110.jpg';

export { canImg, vegetablesImg, steakImg, onionsImg, turkeyImg, watermelonImg };

export interface ShoprightAdLine {
  id: string;
  en: string;
  es: string;
}

export const SHOPRIGHT_AD_TITLE = {
  en: 'Sale At Shopright',
  es: 'Venta en Shopright',
};

export const SHOPRIGHT_AD_FULL_EN = `Sale at Shopright Supermarket.
Make a fat-free dinner tonight!

3 cans of vegetables: 33 cents.

Delicious steak with onions from our chef: 1/2 price.

Try our salt-free turkey: only 99 cents a pound.
Buy a watermelon for $1.89. Eat light! Save money!`;

export const SHOPRIGHT_AD_FULL_ES = `Venta en el Supermercado Shopright.
¡Prepara una cena sin grasa esta noche!

3 latas de verduras: 33 centavos.

Delicioso filete con cebolla de nuestro chef: a mitad de precio.

Prueba nuestro pavo sin sal: solo 99 centavos la libra.
Compra una sandía por $1.89. ¡Come ligero! ¡Ahorra dinero!`;

export const SHOPRIGHT_AD_LINES: ShoprightAdLine[] = [
  {
    id: 'line-1',
    en: 'Sale at Shopright Supermarket.',
    es: 'Venta en el Supermercado Shopright.',
  },
  {
    id: 'line-2',
    en: 'Make a fat-free dinner tonight!',
    es: '¡Prepara una cena sin grasa esta noche!',
  },
  {
    id: 'line-3',
    en: '3 cans of vegetables: 33 cents.',
    es: '3 latas de verduras: 33 centavos.',
  },
  {
    id: 'line-4',
    en: 'Delicious steak with onions from our chef: 1/2 price.',
    es: 'Delicioso filete con cebolla de nuestro chef: a mitad de precio.',
  },
  {
    id: 'line-5',
    en: 'Try our salt-free turkey: only 99 cents a pound.',
    es: 'Prueba nuestro pavo sin sal: solo 99 centavos la libra.',
  },
  {
    id: 'line-6',
    en: 'Buy a watermelon for $1.89. Eat light! Save money!',
    es: 'Compra una sandía por $1.89. ¡Come ligero! ¡Ahorra dinero!',
  },
];

// Activity 2: Vocabulary Items (Images & Words)
export interface FoodVocabItem {
  id: string;
  word: string;
  wordEs: string;
  imageUrl: string;
  exampleEn: string;
  exampleEs: string;
}

export const SHOPRIGHT_VOCAB_ITEMS: FoodVocabItem[] = [
  {
    id: 'vocab-can',
    word: 'a can',
    wordEs: 'una lata',
    imageUrl: canImg,
    exampleEn: '3 cans of vegetables: 33 cents.',
    exampleEs: '3 latas de verduras: 33 centavos.',
  },
  {
    id: 'vocab-vegetables',
    word: 'vegetables',
    wordEs: 'verduras',
    imageUrl: vegetablesImg,
    exampleEn: 'Fresh vegetables are good for your health.',
    exampleEs: 'Las verduras frescas son buenas para la salud.',
  },
  {
    id: 'vocab-steak',
    word: 'steak',
    wordEs: 'filete de carne',
    imageUrl: steakImg,
    exampleEn: 'Delicious steak with onions from our chef.',
    exampleEs: 'Delicioso filete con cebolla de nuestro chef.',
  },
  {
    id: 'vocab-onions',
    word: 'onions',
    wordEs: 'cebollas',
    imageUrl: onionsImg,
    exampleEn: 'The steak is prepared with cooked onions.',
    exampleEs: 'El filete está preparado con cebollas cocinadas.',
  },
  {
    id: 'vocab-turkey',
    word: 'turkey',
    wordEs: 'pavo',
    imageUrl: turkeyImg,
    exampleEn: 'Try our salt-free turkey: only 99 cents a pound.',
    exampleEs: 'Prueba nuestro pavo sin sal: solo 99 centavos la libra.',
  },
  {
    id: 'vocab-watermelon',
    word: 'watermelon',
    wordEs: 'sandía',
    imageUrl: watermelonImg,
    exampleEn: 'Buy a sweet watermelon for $1.89.',
    exampleEs: 'Compra una dulce sandía por $1.89.',
  },
];

// Activity 3: Table items (Food -> Sale Price)
export interface PriceTableItem {
  id: string;
  foodEn: string;
  foodEs: string;
  correctPriceEn: string;
  correctPriceEs: string;
}

export const SHOPRIGHT_PRICE_TABLE: PriceTableItem[] = [
  {
    id: 'row-1',
    foodEn: '3 cans of vegetables',
    foodEs: '3 latas de verduras',
    correctPriceEn: '33 cents',
    correctPriceEs: '33 centavos',
  },
  {
    id: 'row-2',
    foodEn: 'steak with onions',
    foodEs: 'filete con cebolla',
    correctPriceEn: 'half of the regular price',
    correctPriceEs: 'mitad del precio regular',
  },
  {
    id: 'row-3',
    foodEn: 'turkey',
    foodEs: 'pavo',
    correctPriceEn: '99 cents a pound',
    correctPriceEs: '99 centavos la libra',
  },
  {
    id: 'row-4',
    foodEn: 'watermelon',
    foodEs: 'sandía',
    correctPriceEn: '$1.89',
    correctPriceEs: '$1.89',
  },
];

export const SHOPRIGHT_PRICE_OPTIONS = [
  '33 cents',
  '99 cents a pound',
  '$1.89',
  'half of the regular price',
];

export const SHOPRIGHT_PRICE_OPTIONS_ES: Record<string, string> = {
  '33 cents': '33 centavos',
  '99 cents a pound': '99 centavos la libra',
  '$1.89': '$1.89',
  'half of the regular price': 'mitad del precio regular',
};

// Activity 4: True / False / We don't know
export interface TrueFalseStatement {
  id: string;
  statementEn: string;
  statementEs: string;
  correctAnswer: 'True' | 'False' | "We don't know";
  explanationEn: string;
  explanationEs: string;
}

export const SHOPRIGHT_TRUE_FALSE_STATEMENTS: TrueFalseStatement[] = [
  {
    id: 'tf-1',
    statementEn: 'You can save money at Shopright Supermarket.',
    statementEs: 'Puedes ahorrar dinero en el Supermercado Shopright.',
    correctAnswer: 'True',
    explanationEn: 'The ad explicitly ends with the phrase: "Save money!"',
    explanationEs: 'El anuncio concluye explícitamente con la frase: "¡Ahorra dinero!"',
  },
  {
    id: 'tf-2',
    statementEn: 'The sale is for people who buy food with a lot of fat.',
    statementEs: 'La oferta es para personas que compran comida con mucha grasa.',
    correctAnswer: 'False',
    explanationEn: 'The ad invites you to "Make a fat-free dinner tonight!" and "Eat light!"',
    explanationEs: 'El anuncio te invita a "¡Prepara una cena sin grasa esta noche!" y "¡Come ligero!"',
  },
  {
    id: 'tf-3',
    statementEn: 'The steak is half-price.',
    statementEs: 'El filete está a mitad de precio.',
    correctAnswer: 'True',
    explanationEn: 'The ad states: "Delicious steak with onions from our chef: 1/2 price."',
    explanationEs: 'El anuncio afirma: "Delicioso filete con cebolla de nuestro chef: 1/2 precio."',
  },
  {
    id: 'tf-4',
    statementEn: 'The supermarket only sells fat-free food.',
    statementEs: 'El supermercado solo vende comida sin grasa.',
    correctAnswer: "We don't know",
    explanationEn: 'The ad promotes healthy sale items, but we do not know all the regular products Shopright carries.',
    explanationEs: 'El anuncio promociona artículos en oferta, pero no sabemos qué otros productos regulares vende Shopright.',
  },
  {
    id: 'tf-5',
    statementEn: 'The salt-free turkey is usually cheaper.',
    statementEs: 'El pavo sin sal generalmente es más barato.',
    correctAnswer: 'False',
    explanationEn: 'The turkey is on special sale for "only 99 cents a pound", meaning it is cheaper right now than usual.',
    explanationEs: 'El pavo está en oferta especial por "solo 99 centavos la libra", lo que significa que ahora está más barato que de costumbre.',
  },
];

// Activity 5: Cloze Sentences
export interface ClozeBlank {
  index: number;
  correctWord: string;
  correctWordEs: string;
}

export const SHOPRIGHT_CLOZE_DATA = {
  sentenceParts: [
    'Shopping at Shopright Supermarket ',
    ' you money. In the sale, you can buy food to make a fat-free ',
    ' . Another word for fat-free food is ',
    ' food. The salt-free ',
    ' is on sale.',
  ],
  sentencePartsEs: [
    'Comprar en el Supermercado Shopright te ',
    ' dinero. En la oferta, puedes comprar comida para hacer una ',
    ' sin grasa. Otra palabra para comida sin grasa es comida ',
    '. El ',
    ' sin sal está en oferta.',
  ],
  blanks: [
    { index: 0, correctWord: 'saves', correctWordEs: 'ahorra' },
    { index: 1, correctWord: 'dinner', correctWordEs: 'cena' },
    { index: 2, correctWord: 'light', correctWordEs: 'ligera' },
    { index: 3, correctWord: 'turkey', correctWordEs: 'pavo' },
  ],
  wordBank: ['buys', 'saves', 'light', 'turkey', 'cheaper', 'half', 'dinner'],
  wordBankEs: {
    buys: 'compra',
    saves: 'ahorra',
    light: 'ligera / light',
    turkey: 'pavo',
    cheaper: 'más barato',
    half: 'mitad',
    dinner: 'cena',
  },
};

// Activity 6: Multiple Choice Reading Questions
export interface ShoprightQuestion {
  id: string;
  questionEn: string;
  questionEs: string;
  options: {
    id: string;
    en: string;
    es: string;
  }[];
  correctAnswerId: string;
  explanationEn: string;
  explanationEs: string;
}

export const SHOPRIGHT_READING_QUESTIONS: ShoprightQuestion[] = [
  {
    id: 'q1',
    questionEn: 'What kind of store is Shopright?',
    questionEs: '¿Qué tipo de tienda es Shopright?',
    options: [
      { id: 'opt1', en: 'a butcher shop', es: 'una carnicería' },
      { id: 'opt2', en: 'a supermarket', es: 'un supermercado' },
      { id: 'opt3', en: 'a store that sells only fruits and vegetables', es: 'una tienda que solo vende frutas y verduras' },
      { id: 'opt4', en: 'a pet shop', es: 'una tienda de mascotas' },
    ],
    correctAnswerId: 'opt2',
    explanationEn: 'The ad begins with: "Sale at Shopright Supermarket."',
    explanationEs: 'El anuncio comienza diciendo: "Venta en el Supermercado Shopright."',
  },
  {
    id: 'q2',
    questionEn: 'Which of these people will probably buy food at Shopright?',
    questionEs: '¿Cuál de estas personas probablemente comprará comida en Shopright?',
    options: [
      {
        id: 'opt1',
        en: "George and Tiffany have their own garden and they don't eat meat.",
        es: 'George y Tiffany tienen su propio huerto y no comen carne.',
      },
      {
        id: 'opt2',
        en: 'Steve is a student and eats all his meals at his college.',
        es: 'Steve es estudiante y come todas sus comidas en la universidad.',
      },
      {
        id: 'opt3',
        en: 'Loretta lives alone and cooks her own food.',
        es: 'Loretta vive sola y cocina su propia comida.',
      },
      {
        id: 'opt4',
        en: 'Maria works and she usually eats out.',
        es: 'Maria trabaja y por lo general come fuera de casa.',
      },
    ],
    correctAnswerId: 'opt3',
    explanationEn: 'Loretta cooks her own food and can prepare healthy dinners with the sale ingredients.',
    explanationEs: 'Loretta cocina su propia comida y puede preparar cenas saludables aprovechando los ingredientes en oferta.',
  },
  {
    id: 'q3',
    questionEn: 'Shopright is having a big sale right now. What kind of food is on sale?',
    questionEs: 'Shopright tiene una gran oferta ahora mismo. ¿Qué tipo de comida está en oferta?',
    options: [
      { id: 'opt1', en: 'breakfast cereals', es: 'cereales para el desayuno' },
      { id: 'opt2', en: 'light, low-fat food', es: 'comida ligera, baja en grasa' },
      { id: 'opt3', en: 'hamburgers and hot dogs', es: 'hamburguesas y perros calientes' },
      { id: 'opt4', en: 'cakes and cookies', es: 'pasteles y galletas' },
    ],
    correctAnswerId: 'opt2',
    explanationEn: 'The ad advertises fat-free, salt-free, and light foods: "Make a fat-free dinner tonight!" "Eat light!"',
    explanationEs: 'El anuncio promociona alimentos sin grasa, sin sal y ligeros: "¡Prepara una cena sin grasa esta noche!" "¡Come ligero!"',
  },
];

// Activity 7: Writing
export const SHOPRIGHT_WRITING_PROMPT = {
  promptEn:
    'You are going to Shopright Supermarket to buy the fat-free foods on sale. Make a shopping list of the foods you want to buy and send it to your teacher.',
  promptEs:
    'Vas a ir al supermercado Shopright a comprar los alimentos sin grasa que están en oferta. Haz una lista de compras de los alimentos que quieres comprar y envíasela a tu profesor.',
  placeholderEn:
    'Shopping list for Shopright Supermarket:\n1. 3 cans of vegetables...\n2. Delicious steak with onions...\n3. Salt-free turkey...\n4. Watermelon...',
  modelAnswerEn: `Shopping List for Shopright Supermarket:
1. 3 cans of vegetables (33 cents) - great for a healthy salad.
2. Delicious steak with onions (1/2 price) - for a tasty dinner tonight.
3. Salt-free turkey (99 cents a pound) - healthy and low-sodium.
4. Watermelon ($1.89) - fresh and sweet dessert.
I want to eat light and save money!`,
  modelAnswerEs: `Lista de compras para el supermercado Shopright:
1. 3 latas de verduras (33 centavos) - ideal para una ensalada saludable.
2. Delicioso filete con cebolla (1/2 precio) - para una cena sabrosa esta noche.
3. Pavo sin sal (99 centavos la libra) - saludable y bajo en sodio.
4. Sandía ($1.89) - postre fresco y dulce.
¡Quiero comer ligero y ahorrar dinero!`,
};

// Activity 8: 5 Tests in exact sequential order (Test 1, Test 2, Test 3, Test 4, Test 5)
export interface ShoprightTestQuestion {
  testNumber: number; // 1 to 5
  title: string;
  titleEs: string;
  type: 'multiple-choice' | 'drag-blank';
  questionEn: string;
  questionEs: string;
  contextEn?: string;
  contextEs?: string;
  options: {
    id: string;
    en: string;
    es: string;
  }[];
  correctAnswerId: string;
  explanationEn: string;
  explanationEs: string;
}

export const SHOPRIGHT_MASTERY_TESTS: ShoprightTestQuestion[] = [
  // Test 1
  {
    testNumber: 1,
    title: 'Test 1',
    titleEs: 'Prueba 1',
    type: 'multiple-choice',
    questionEn: 'Why did Shopright put an ad in the newspaper?',
    questionEs: '¿Por qué Shopright puso un anuncio en el periódico?',
    options: [
      { id: 't1-opt1', en: 'They are saving money.', es: 'Ellos están ahorrando dinero.' },
      { id: 't1-opt2', en: 'They want you to try their turkey.', es: 'Ellos quieren que pruebes su pavo.' },
      { id: 't1-opt3', en: "They're cooking steak with onions.", es: 'Ellos están cocinando filete con cebollas.' },
      { id: 't1-opt4', en: 'They are having a sale.', es: 'Ellos tienen una oferta / venta especial.' },
    ],
    correctAnswerId: 't1-opt4',
    explanationEn: 'The ad announces special sale discounts: "Sale at Shopright Supermarket."',
    explanationEs: 'El anuncio informa sobre promociones y descuentos: "Venta en el Supermercado Shopright."',
  },

  // Test 2
  {
    testNumber: 2,
    title: 'Test 2',
    titleEs: 'Prueba 2',
    type: 'multiple-choice',
    questionEn: 'What is another title for this ad?',
    questionEs: '¿Cuál es otro título adecuado para este anuncio?',
    options: [
      { id: 't2-opt1', en: 'Buy Your Watermelon at Shopright', es: 'Compra tu sandía en Shopright' },
      { id: 't2-opt2', en: 'Shopright Helps You Spend Money', es: 'Shopright te ayuda a gastar dinero' },
      { id: 't2-opt3', en: 'Shopright Sells Fat-Free Vegetables', es: 'Shopright vende verduras sin grasa' },
      { id: 't2-opt4', en: 'Shopright Helps You Eat Healthy', es: 'Shopright te ayuda a comer saludable' },
    ],
    correctAnswerId: 't2-opt4',
    explanationEn: 'The ad focuses on "fat-free dinner", "salt-free turkey", and "Eat light!", promoting healthy eating.',
    explanationEs: 'El anuncio se enfoca en "cena sin grasa", "pavo sin sal" y "¡Come ligero!", promoviendo la alimentación saludable.',
  },

  // Test 3
  {
    testNumber: 3,
    title: 'Test 3',
    titleEs: 'Prueba 3',
    type: 'multiple-choice',
    questionEn: 'Which sentence tells us that prices are lower at Shopright?',
    questionEs: '¿Qué oración nos indica que los precios son más bajos en Shopright?',
    options: [
      { id: 't3-opt1', en: 'Buy a watermelon.', es: 'Compra una sandía.' },
      { id: 't3-opt2', en: 'Save money.', es: 'Ahorra dinero.' },
      { id: 't3-opt3', en: 'Eat light.', es: 'Come ligero.' },
      { id: 't3-opt4', en: 'Make a fat-free dinner.', es: 'Prepara una cena sin grasa.' },
    ],
    correctAnswerId: 't3-opt2',
    explanationEn: '"Save money" explicitly means shoppers will pay lower prices.',
    explanationEs: '"Save money" (Ahorra dinero) significa explícitamente que los clientes pagarán precios más bajos.',
  },

  // Test 4
  {
    testNumber: 4,
    title: 'Test 4',
    titleEs: 'Prueba 4',
    type: 'drag-blank',
    questionEn: 'The turkey is [ _______ ] .',
    questionEs: 'El pavo es [ _______ ] .',
    contextEn: 'Choose or drag the correct word to complete the sentence.',
    contextEs: 'Elige o arrastra la palabra correcta para completar la oración.',
    options: [
      { id: 't4-opt1', en: 'fat-free', es: 'sin grasa' },
      { id: 't4-opt2', en: '1/2 price', es: 'a mitad de precio' },
      { id: 't4-opt3', en: 'salt-free', es: 'sin sal' },
      { id: 't4-opt4', en: 'free', es: 'gratis' },
    ],
    correctAnswerId: 't4-opt3',
    explanationEn: 'The ad specifies: "Try our salt-free turkey: only 99 cents a pound."',
    explanationEs: 'El anuncio especifica: "Prueba nuestro pavo sin sal (salt-free turkey): solo 99 centavos la libra."',
  },

  // Test 5
  {
    testNumber: 5,
    title: 'Test 5',
    titleEs: 'Prueba 5',
    type: 'multiple-choice',
    questionEn: 'What is "light" food?',
    questionEs: '¿Qué es comida "light" (ligera)?',
    options: [
      { id: 't5-opt1', en: 'food that is free', es: 'comida que es gratis' },
      { id: 't5-opt2', en: "food that doesn't weigh very much", es: 'comida que no pesa mucho' },
      { id: 't5-opt3', en: 'food that is fat-free or salt-free', es: 'comida que es sin grasa o sin sal' },
      { id: 't5-opt4', en: 'fruits, vegetables, and meat', es: 'frutas, verduras y carne' },
    ],
    correctAnswerId: 't5-opt3',
    explanationEn: 'In dietary and nutrition terms, "light" food refers to healthy, low-fat, or salt-free choices.',
    explanationEs: 'En términos nutricionales, comida "light" o ligera se refiere a opciones saludables, bajas en grasa o sin sal.',
  },
];
