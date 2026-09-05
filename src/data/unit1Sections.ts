import { UnitSection } from '../types';
import { PHONE_SALES_LESSON_TEXT, PHONE_SALES_EXERCISES } from './phoneSalesData';

export const UNIT_1_SECTIONS: UnitSection[] = [
  // SECTION 1: Phone Sales
  {
    id: 'phone-sales',
    number: 1,
    title: 'Phone Sales',
    titleEs: 'Ventas por Teléfono',
    subtitle: 'Lesson 1: Working People Magazine · Voice Mail Message',
    description:
      'Aprende a comprender ofertas telefónicas, reconocer precios normales y de oferta, números de contacto y detalles clave de ventas por teléfono.',
    imageUrl:
      'https://images.unsplash.com/photo-1534536281715-e28d76689b4d?auto=format&fit=crop&w=800&q=80',
    lessonText: PHONE_SALES_LESSON_TEXT,
    flashcards: [],
    exercises: PHONE_SALES_EXERCISES,
  },

  // SECTION 2: Wrong Color
  {
    id: 'wrong-color',
    number: 2,
    title: 'Wrong Color',
    titleEs: 'Color Equivocado',
    subtitle: 'Reading Story · Ms. Green and Mr. Brown',
    description:
      'Lectura interactiva y comprensión auditiva sobre la entrega equivocada de una silla y el encuentro casual entre clientes.',
    imageUrl:
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
    readingStory: {
      title: 'Wrong Color',
      titleEs: 'Color Equivocado',
      audioText:
        'Today Ms. Green was very late for work. She waited for the delivery of her new chair. But the delivery man brought the wrong chair. Ms. Green called the store manager. "I ordered a brown chair," she said, "not green!" "Don\'t be angry," said the manager. "We all make mistakes, don\'t we?" "Some people make bigger mistakes than others!" Ms. Green answered. The manager found her order. "Ha," he laughed. "Another customer, Mr. Brown, ordered a green chair and got your chair instead. Isn\'t that funny?" "No, it isn\'t. I want my chair. I paid enough money for it," said Ms. Green. "Come to the store now and get a different chair," he said. But Ms. Green went to work instead. After work, she went to the store, but it was already closed. A handsome young man was also there. "I\'m late," he said. "Now I have to wait until tomorrow for my green chair." "Are you Mr. Brown?" she asked. "Yes, but ... " "I can help you with your chair," said Ms. Green. And she smiled for the first time that day.',
      textEn:
        'Today Ms. Green was very late for work. She waited for the delivery of her new chair. But the delivery man brought the wrong chair. Ms. Green called the store manager. "I ordered a brown chair," she said, "not green!" "Don\'t be angry," said the manager. "We all make mistakes, don\'t we?" "Some people make bigger mistakes than others!" Ms. Green answered. The manager found her order. "Ha," he laughed. "Another customer, Mr. Brown, ordered a green chair and got your chair instead. Isn\'t that funny?" "No, it isn\'t. I want my chair. I paid enough money for it," said Ms. Green. "Come to the store now and get a different chair," he said. But Ms. Green went to work instead. After work, she went to the store, but it was already closed. A handsome young man was also there. "I\'m late," he said. "Now I have to wait until tomorrow for my green chair." "Are you Mr. Brown?" she asked. "Yes, but ... " "I can help you with your chair," said Ms. Green. And she smiled for the first time that day.',
      textEs:
        'Hoy la Sra. Green llegó muy tarde al trabajo. Esperó la entrega de su nueva silla. Pero el repartidor trajo la silla equivocada. La Sra. Green llamó al gerente de la tienda. "¡Pedí una silla marrón", dijo ella, "no verde!" "No se enoje", dijo el gerente. "Todos cometemos errores, ¿verdad?" "¡Algunas personas cometen errores más grandes que otras!", respondió la Sra. Green. El gerente encontró su pedido. "Ja", se rio él. "Otro cliente, el Sr. Brown, pidió una silla verde y recibió su silla en su lugar. ¿No es gracioso?" "No, no lo es. Quiero mi silla. Pagué suficiente dinero por ella", dijo la Sra. Green. "Venga a la tienda ahora y llévese una silla diferente", dijo él. Pero la Sra. Green fue a trabajar en su lugar. Después del trabajo, fue a la tienda, pero ya estaba cerrada. Un apuesto joven también estaba allí. "Llego tarde", dijo él. "Ahora tengo que esperar hasta mañana por mi silla verde". "¿Es usted el Sr. Brown?", preguntó ella. "Sí, pero ... " "Puedo ayudarle con su silla", dijo la Sra. Green. Y sonrió por primera vez ese día.',
      paragraphsEn: [
        'Today Ms. Green was very late for work. She waited for the delivery of her new chair. But the delivery man brought the wrong chair. Ms. Green called the store manager.',
        '"I ordered a brown chair," she said, "not green!"',
        '"Don\'t be angry," said the manager. "We all make mistakes, don\'t we?"',
        '"Some people make bigger mistakes than others!" Ms. Green answered.',
        'The manager found her order.',
        '"Ha," he laughed. "Another customer, Mr. Brown, ordered a green chair and got your chair instead. Isn\'t that funny?"',
        '"No, it isn\'t. I want my chair. I paid enough money for it," said Ms. Green. "Come to the store now and get a different chair," he said.',
        'But Ms. Green went to work instead. After work, she went to the store, but it was already closed. A handsome young man was also there.',
        '"I\'m late," he said. "Now I have to wait until tomorrow for my green chair."',
        '"Are you Mr. Brown?" she asked. "Yes, but ... "',
        '"I can help you with your chair," said Ms. Green. And she smiled for the first time that day.',
      ],
      paragraphsEs: [
        'Hoy la Sra. Green llegó muy tarde al trabajo. Esperó la entrega de su nueva silla. Pero el repartidor trajo la silla equivocada. La Sra. Green llamó al gerente de la tienda.',
        '"¡Pedí una silla marrón", dijo ella, "no verde!"',
        '"No se enoje", dijo el gerente. "Todos cometemos errores, ¿verdad?"',
        '"¡Algunas personas cometen errores más grandes que otras!", respondió la Sra. Green.',
        'El gerente encontró su pedido.',
        '"Ja", se rio él. "Otro cliente, el Sr. Brown, pidió una silla verde y recibió su silla en su lugar. ¿No es gracioso?"',
        '"No, no lo es. Quiero mi silla. Pagué suficiente dinero por ella", dijo la Sra. Green. "Venga a la tienda ahora y llévese una silla diferente", dijo él.',
        'Pero la Sra. Green fue a trabajar en su lugar. Después del trabajo, fue a la tienda, pero ya estaba cerrada. Un apuesto joven también estaba allí.',
        '"Llego tarde", dijo él. "Ahora tengo que esperar hasta mañana por mi silla verde".',
        '"¿Es usted el Sr. Brown?", preguntó ella. "Sí, pero ... "',
        '"Puedo ayudarle con su silla", dijo la Sra. Green. Y sonrió por primera vez ese día.',
      ],
    },
    exercises: [
      {
        id: 'wrong-color-reading-act1',
        type: 'reading-story',
        story: {
          title: 'Wrong Color',
          titleEs: 'Color Equivocado',
          audioText:
            'Today Ms. Green was very late for work. She waited for the delivery of her new chair. But the delivery man brought the wrong chair. Ms. Green called the store manager. "I ordered a brown chair," she said, "not green!" "Don\'t be angry," said the manager. "We all make mistakes, don\'t we?" "Some people make bigger mistakes than others!" Ms. Green answered. The manager found her order. "Ha," he laughed. "Another customer, Mr. Brown, ordered a green chair and got your chair instead. Isn\'t that funny?" "No, it isn\'t. I want my chair. I paid enough money for it," said Ms. Green. "Come to the store now and get a different chair," he said. But Ms. Green went to work instead. After work, she went to the store, but it was already closed. A handsome young man was also there. "I\'m late," he said. "Now I have to wait until tomorrow for my green chair." "Are you Mr. Brown?" she asked. "Yes, but ... " "I can help you with your chair," said Ms. Green. And she smiled for the first time that day.',
          textEn:
            'Today Ms. Green was very late for work. She waited for the delivery of her new chair. But the delivery man brought the wrong chair. Ms. Green called the store manager. "I ordered a brown chair," she said, "not green!" "Don\'t be angry," said the manager. "We all make mistakes, don\'t we?" "Some people make bigger mistakes than others!" Ms. Green answered. The manager found her order. "Ha," he laughed. "Another customer, Mr. Brown, ordered a green chair and got your chair instead. Isn\'t that funny?" "No, it isn\'t. I want my chair. I paid enough money for it," said Ms. Green. "Come to the store now and get a different chair," he said. But Ms. Green went to work instead. After work, she went to the store, but it was already closed. A handsome young man was also there. "I\'m late," he said. "Now I have to wait until tomorrow for my green chair." "Are you Mr. Brown?" she asked. "Yes, but ... " "I can help you with your chair," said Ms. Green. And she smiled for the first time that day.',
          textEs:
            'Hoy la Sra. Green llegó muy tarde al trabajo. Esperó la entrega de su nueva silla. Pero el repartidor trajo la silla equivocada. La Sra. Green llamó al gerente de la tienda. "¡Pedí una silla marrón", dijo ella, "no verde!" "No se enoje", dijo el gerente. "Todos cometemos errores, ¿verdad?" "¡Algunas personas cometen errores más grandes que otras!", respondió la Sra. Green. El gerente encontró su pedido. "Ja", se rio él. "Otro cliente, el Sr. Brown, pidió una silla verde y recibió su silla en su lugar. ¿No es gracioso?" "No, no lo es. Quiero mi silla. Pagué suficiente dinero por ella", dijo la Sra. Green. "Venga a la tienda ahora y llévese una silla diferente", dijo él. Pero la Sra. Green fue a trabajar en su lugar. Después del trabajo, fue a la tienda, pero ya estaba cerrada. Un apuesto joven también estaba allí. "Llego tarde", dijo él. "Ahora tengo que esperar hasta mañana por mi silla verde". "¿Es usted el Sr. Brown?", preguntó ella. "Sí, pero ... " "Puedo ayudarle con su silla", dijo la Sra. Green. Y sonrió por primera vez ese día.',
          paragraphsEn: [
            'Today Ms. Green was very late for work. She waited for the delivery of her new chair. But the delivery man brought the wrong chair. Ms. Green called the store manager.',
            '"I ordered a brown chair," she said, "not green!"',
            '"Don\'t be angry," said the manager. "We all make mistakes, don\'t we?"',
            '"Some people make bigger mistakes than others!" Ms. Green answered.',
            'The manager found her order.',
            '"Ha," he laughed. "Another customer, Mr. Brown, ordered a green chair and got your chair instead. Isn\'t that funny?"',
            '"No, it isn\'t. I want my chair. I paid enough money for it," said Ms. Green. "Come to the store now and get a different chair," he said.',
            'But Ms. Green went to work instead. After work, she went to the store, but it was already closed. A handsome young man was also there.',
            '"I\'m late," he said. "Now I have to wait until tomorrow for my green chair."',
            '"Are you Mr. Brown?" she asked. "Yes, but ... "',
            '"I can help you with your chair," said Ms. Green. And she smiled for the first time that day.',
          ],
          paragraphsEs: [
            'Hoy la Sra. Green llegó muy tarde al trabajo. Esperó la entrega de su nueva silla. Pero el repartidor trajo la silla equivocada. La Sra. Green llamó al gerente de la tienda.',
            '"¡Pedí una silla marrón", dijo ella, "no verde!"',
            '"No se enoje", dijo el gerente. "Todos cometemos errores, ¿verdad?"',
            '"¡Algunas personas cometen errores más grandes que otras!", respondió la Sra. Green.',
            'El gerente encontró su pedido.',
            '"Ja", se rio él. "Otro cliente, el Sr. Brown, pidió una silla verde y recibió su silla en su lugar. ¿No es gracioso?"',
            '"No, no lo es. Quiero mi silla. Pagué suficiente dinero por ella", dijo la Sra. Green. "Venga a la tienda ahora y llévese una silla diferente", dijo él.',
            'Pero la Sra. Green fue a trabajar en su lugar. Después del trabajo, fue a la tienda, pero ya estaba cerrada. Un apuesto joven también estaba allí.',
            '"Llego tarde", dijo él. "Ahora tengo que esperar hasta mañana por mi silla verde".',
            '"¿Es usted el Sr. Brown?", preguntó ella. "Sí, pero ... "',
            '"Puedo ayudarle con su silla", dijo la Sra. Green. Y sonrió por primera vez ese día.',
          ],
        },
      },
    ],
  },

  // SECTION 3: Dress from Paris
  {
    id: 'dress-from-paris',
    number: 3,
    title: 'Dress from Paris',
    titleEs: 'Vestido de París',
    subtitle: 'Shopping & Fashion',
    description: 'Sección 3: Lecturas, diálogos y actividades sobre compras de moda y vestidos importados.',
    imageUrl:
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80',
    exercises: [],
  },

  // SECTION 4: Be-Past: Statements
  {
    id: 'be-past-statements',
    number: 4,
    title: 'Be-Past: Statements',
    titleEs: 'Be en Pasado: Afirmaciones',
    subtitle: 'Grammar Focus · Was / Were Statements',
    description: 'Sección 4: Reglas, ejercicios y patrones con el verbo Be en tiempo pasado (was / were).',
    imageUrl:
      'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80',
    exercises: [],
  },

  // SECTION 5: Be-Past: Questions
  {
    id: 'be-past-questions',
    number: 5,
    title: 'Be-Past: Questions',
    titleEs: 'Be en Pasado: Preguntas',
    subtitle: 'Grammar Focus · Questions with Was / Were',
    description: 'Sección 5: Formación de preguntas con Was y Were y respuestas cortas en inglés.',
    imageUrl:
      'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80',
    exercises: [],
  },

  // SECTION 6: Shopping 2
  {
    id: 'shopping-2',
    number: 6,
    title: 'Shopping 2',
    titleEs: 'Compras 2',
    subtitle: 'Practical Situations',
    description: 'Sección 6: Diálogos prácticos en tiendas comerciales, cambios de producto y precios.',
    imageUrl:
      'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&q=80',
    exercises: [],
  },
];
