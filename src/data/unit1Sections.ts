import { UnitSection } from '../types';
import { PHONE_SALES_LESSON_TEXT, PHONE_SALES_EXERCISES } from './phoneSalesData';
import { DRESS_FROM_PARIS_LESSON_TEXT, DRESS_FROM_PARIS_EXERCISES } from './dressFromParisData';
import { BE_PAST_LESSON_TEXT, BE_PAST_EXERCISES } from './bePastStatementsData';
import {
  BE_PAST_QUESTIONS_LESSON_TEXT,
  BE_PAST_QUESTIONS_EXERCISES,
  BE_PAST_QUESTIONS_FLASHCARDS,
  bePastQuestionsImg,
} from './bePastQuestionsData';
import wcScene1Img from '../assets/images/wrong_color/scene1.jpg';
import wcScene2Img from '../assets/images/wrong_color/scene2.jpg';
import wcScene3Img from '../assets/images/wrong_color/scene3.jpg';
import wcScene4Img from '../assets/images/wrong_color/scene4.jpg';
import wcScene5Img from '../assets/images/wrong_color/scene5.jpg';
import wcScene6Img from '../assets/images/wrong_color/scene6.jpg';
import dressFromParisImg from '../assets/images/dress_from_paris_1788711801436.jpg';
import rockConcertImg from '../assets/images/rock_concert_be_past_1788714966666.jpg';

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
      {
        id: 'wrong-color-reading-act2',
        type: 'reading-comprehension',
        instructions: 'Read the story "Wrong Color," and then answer the questions.',
        instructionsEs: 'Lee la historia "Color Equivocado", y luego responde las preguntas.',
        story: {
          title: 'Wrong Color',
          titleEs: 'Color Equivocado',
          audioText:
            'Today Ms. Green was very late for work. She waited for the delivery of her new chair. But the delivery man brought the wrong chair. Ms. Green called the store manager. "I ordered a brown chair," she said, "not green!" "Don\'t be angry," said the manager. "We all make mistakes, don\'t we?" "Some people make bigger mistakes than others!" Ms. Green answered. The manager found her order. "Ha," he laughed. "Another customer, Mr. Brown, ordered a green chair and got your chair instead. Isn\'t that funny?" "No, it isn\'t. I want my chair. I paid enough money for it," said Ms. Green. "Come to the store now and get a different chair," he said. But Ms. Green went to work instead. After work, she went to the store, but it was already closed. A handsome young man was also there. "I\'m late," he said. "Now I have to wait until tomorrow for my green chair." "Are you Mr. Brown?" she asked. "Yes, but ... " "I can help you with your chair," said Ms. Green. And she smiled for the first time that day.',
          textEn:
            'Today Ms. Green was very late for work. She waited for the delivery of her new chair. But the delivery man brought the wrong chair. Ms. Green called the store manager. "I ordered a brown chair," she said, "not green!" "Don\'t be angry," said the manager. "We all make mistakes, don\'t we?" "Some people make bigger mistakes than others!" Ms. Green answered. The manager found her order. "Ha," he laughed. "Another customer, Mr. Brown, ordered a green chair and got your chair instead. Isn\'t that funny?" "No, it isn\'t. I want my chair. I paid enough money for it," said Ms. Green. "Come to the store now and get a different chair," he said. But Ms. Green went to work instead. After work, she went to the store, but it was already closed. A handsome young man was also there. "I\'m late," he said. "Now I have to wait until tomorrow for my green chair." "Are you Mr. Brown?" she asked. "Yes, but ... " "I can help you with your chair," said Ms. Green. And she smiled for the first time that day.',
          textEs:
            'Hoy la Sra. Green llegó muy tarde al trabajo. Esperó la entrega de su nueva silla. Pero el repartidor trajo la silla equivocada. La Sra. Green llamó al gerente de la tienda. "¡Pedí una silla marrón", dijo ella, "no verde!" "No se enoje", dijo el gerente. "Todos cometemos errores, ¿verdad?" "¡Algunas personas cometen errores más grandes que otras!", respondió la Sra. Green. El gerente encontró su pedido. "Ja", se rio él. "Otro cliente, el Sr. Brown, pidió una silla verde y recibió su silla en su lugar. ¿No es gracioso?" "No, no lo es. Quiero mi silla. Pagué suficiente dinero por ella", dijo la Sra. Green. "Venga a la tienda ahora y llévese una silla diferente", dijo él.',
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
        questions: [
          {
            id: 'wrong-color-q1',
            question: 'Why was Ms. Green late for work?',
            questionEs: '¿Por qué la Sra. Green llegó tarde al trabajo?',
            explanation: 'She waited for the delivery of her new chair, but the delivery man brought the wrong chair.',
            explanationEs: 'Esperó la entrega de su nueva silla, pero el repartidor trajo la silla equivocada.',
            correctAnswerId: 'wc-q1-opt3',
            options: [
              {
                id: 'wc-q1-opt1',
                text: 'The manager of the store spoke to her for too long.',
                textEs: 'El gerente de la tienda habló con ella durante demasiado tiempo.',
                isCorrect: false,
              },
              {
                id: 'wc-q1-opt2',
                text: 'She had to go out and buy another chair.',
                textEs: 'Tuvo que salir y comprar otra silla.',
                isCorrect: false,
              },
              {
                id: 'wc-q1-opt3',
                text: 'The delivery man brought her the wrong chair.',
                textEs: 'El repartidor le trajo la silla equivocada.',
                isCorrect: true,
              },
            ],
          },
          {
            id: 'wrong-color-q2',
            question: "What was the delivery man's mistake?",
            questionEs: '¿Cuál fue el error del repartidor?',
            explanation: "Ms. Green ordered a brown chair, but received Mr. Brown's green chair instead.",
            explanationEs: 'La Sra. Green pidió una silla marrón, pero en su lugar recibió la silla verde del Sr. Brown.',
            correctAnswerId: 'wc-q2-opt3',
            options: [
              {
                id: 'wc-q2-opt1',
                text: 'He brought Ms. Green a brown chair.',
                textEs: 'Le trajo a la Sra. Green una silla marrón.',
                isCorrect: false,
              },
              {
                id: 'wc-q2-opt2',
                text: 'He went to the wrong house.',
                textEs: 'Fue a la casa equivocada.',
                isCorrect: false,
              },
              {
                id: 'wc-q2-opt3',
                text: 'He brought Ms. Green a green chair.',
                textEs: 'Le trajo a la Sra. Green una silla verde.',
                isCorrect: true,
              },
            ],
          },
        ],
      },
      {
        id: 'wrong-color-reading-act3',
        type: 'reading-comprehension',
        instructions: 'Read the story "Wrong Color," and then answer the questions.',
        instructionsEs: 'Lee la historia "Color Equivocado", y luego responde las preguntas.',
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
        questions: [
          {
            id: 'wrong-color-q3',
            question: "Why did the store manager laugh when he found Ms. Green's order?",
            questionEs: '¿Por qué se rió el gerente de la tienda cuando encontró el pedido de la Sra. Green?',
            explanation: "He laughed because he understood that Ms. Green and Mr. Brown had received each other's chairs.",
            explanationEs: 'Se rió porque comprendió que la Sra. Green y el Sr. Brown habían recibido las sillas cambiadas.',
            correctAnswerId: 'wc-q3-opt2',
            options: [
              {
                id: 'wc-q3-opt1',
                text: 'He thought it was funny that she was so angry.',
                textEs: 'Pensó que era gracioso que ella estuviera tan enojada.',
                isCorrect: false,
              },
              {
                id: 'wc-q3-opt2',
                text: "He understood that Ms. Green and Mr. Brown got each other's chairs.",
                textEs: 'Comprendió que la Sra. Green y el Sr. Brown recibieron las sillas cambiadas (el uno la del otro).',
                isCorrect: true,
              },
              {
                id: 'wc-q3-opt3',
                text: 'He thought it was funny that Mr. Brown still wanted a green chair.',
                textEs: 'Pensó que era gracioso que el Sr. Brown todavía quisiera una silla verde.',
                isCorrect: false,
              },
            ],
          },
          {
            id: 'wrong-color-q4',
            question: 'How did Ms. Green get her brown chair?',
            questionEs: '¿Cómo consiguió la Sra. Green su silla marrón?',
            explanation: 'She met Mr. Brown outside the closed store, and they exchanged their chairs.',
            explanationEs: 'Se encontró con el Sr. Brown fuera de la tienda cerrada y cambiaron sus sillas.',
            correctAnswerId: 'wc-q4-opt2',
            options: [
              {
                id: 'wc-q4-opt1',
                text: 'She went to the store, and the manager gave her the chair she wanted.',
                textEs: 'Fue a la tienda y el gerente le dio la silla que quería.',
                isCorrect: false,
              },
              {
                id: 'wc-q4-opt2',
                text: 'She met Mr. Brown outside the store, and then they switched chairs.',
                textEs: 'Se encontró con el Sr. Brown fuera de la tienda y luego intercambiaron las sillas.',
                isCorrect: true,
              },
              {
                id: 'wc-q4-opt3',
                text: 'She went to another store and bought a brown chair.',
                textEs: 'Fue a otra tienda y compró una silla marrón.',
                isCorrect: false,
              },
            ],
          },
        ],
      },
      {
        id: 'wrong-color-opposites-act4',
        type: 'matching-table',
        instructions: 'Read the story "Wrong Color." Then complete the table by filling in the opposites of the highlighted words in the sentences.',
        instructionsEs: 'Lee la historia "Color Equivocado". Luego completa la tabla rellenando los opuestos de las palabras resaltadas en las oraciones.',
        columnAHeader: 'Sentences',
        columnAHeaderEs: 'Oraciones',
        columnBHeader: 'Opposites',
        columnBHeaderEs: 'Opuestos',
        pairs: [
          {
            id: 'wc-opp-late',
            field: 'Ms. Green was late for work.',
            fieldEs: 'La Sra. Green llegó tarde al trabajo.',
            highlightedWord: 'late',
            highlightedWordEs: 'tarde',
            correctValue: 'early',
            correctValueEs: 'temprano',
          },
          {
            id: 'wc-opp-wrong',
            field: 'Mr. Brown received the wrong chair.',
            fieldEs: 'El Sr. Brown recibió la silla equivocada.',
            highlightedWord: 'wrong',
            highlightedWordEs: 'equivocada',
            correctValue: 'right',
            correctValueEs: 'correcta',
          },
          {
            id: 'wc-opp-closed',
            field: 'Ms. Green and Mr. Brown went to the store, but it was closed.',
            fieldEs: 'La Sra. Green y el Sr. Brown fueron a la tienda, pero estaba cerrada.',
            highlightedWord: 'closed',
            highlightedWordEs: 'cerrada',
            correctValue: 'open',
            correctValueEs: 'abierta',
          },
          {
            id: 'wc-opp-laughed',
            field: 'The store manager laughed when he found the mistake.',
            fieldEs: 'El gerente de la tienda se rio cuando encontró el error.',
            highlightedWord: 'laughed',
            highlightedWordEs: 'rio',
            correctValue: 'cried',
            correctValueEs: 'lloró',
          },
        ],
        optionsPool: ['cried', 'right', 'open', 'early'],
        optionsPoolEs: {
          cried: 'lloró',
          right: 'correcta / correcto',
          open: 'abierta / abierto',
          early: 'temprano',
        },
      },
      {
        id: 'wrong-color-pictures-order-act5',
        type: 'picture-ordering',
        instructions: 'Read the story "Wrong Color," and then put the pictures into the right order.',
        instructionsEs: 'Lee la historia "Color Equivocado", y luego coloca las imágenes en el orden correcto.',
        audioPrompt: 'Read the story "Wrong Color," and then put the pictures into the right order.',
        initialOrder: [
          'wc-scene-6',
          'wc-scene-2',
          'wc-scene-4',
          'wc-scene-1',
          'wc-scene-3',
          'wc-scene-5',
        ],
        items: [
          {
            id: 'wc-scene-1',
            correctPosition: 1,
            imageUrl: wcScene1Img,
            captionEn: 'The delivery truck came and the delivery man brought a green chair to Ms. Green.',
            captionEs: 'Llegó el camión de reparto y el repartidor le trajo una silla verde a la Sra. Green.',
          },
          {
            id: 'wc-scene-2',
            correctPosition: 2,
            imageUrl: wcScene2Img,
            captionEn: 'Ms. Green was upset and called the store manager right away about the wrong chair.',
            captionEs: 'La Sra. Green estaba disgustada y llamó de inmediato al gerente de la tienda por la silla equivocada.',
          },
          {
            id: 'wc-scene-3',
            correctPosition: 3,
            imageUrl: wcScene3Img,
            captionEn: 'The store manager found the order and laughed because Mr. Brown had received her chair.',
            captionEs: 'El gerente de la tienda encontró el pedido y se rió porque el Sr. Brown había recibido la silla de ella.',
          },
          {
            id: 'wc-scene-4',
            correctPosition: 4,
            imageUrl: wcScene4Img,
            captionEn: 'After work, Ms. Green carried the green chair to the store, but it was already closed.',
            captionEs: 'Después del trabajo, la Sra. Green llevó la silla verde a la tienda, pero ya estaba cerrada.',
          },
          {
            id: 'wc-scene-5',
            correctPosition: 5,
            imageUrl: wcScene5Img,
            captionEn: 'Outside the closed store, Ms. Green met Mr. Brown, who was carrying her brown chair.',
            captionEs: 'Frente a la tienda cerrada, la Sra. Green se encontró con el Sr. Brown, quien llevaba su silla marrón.',
          },
          {
            id: 'wc-scene-6',
            correctPosition: 6,
            imageUrl: wcScene6Img,
            captionEn: 'They exchanged chairs; Mr. Brown took his green chair and Ms. Green happily hugged her brown chair.',
            captionEs: 'Intercambiaron las sillas; el Sr. Brown se llevó su silla verde y la Sra. Green abrazó feliz su silla marrón.',
          },
        ],
      },
      // Activity 6: Writing AI feedback
      {
        id: 'wrong-color-writing-ai-act6',
        type: 'writing-ai-feedback',
        instructions:
          'Write your answer, review AI feedback, improve it, and mark Done if satisfied or get another AI feedback.',
        instructionsEs:
          'Escribe tu respuesta, revisa los comentarios de la IA, mejórala y marca Listo si estás satisfecho o solicita otra revisión de la IA.',
        prompt:
          'Why is the story called "Wrong Color"? Who ordered a green chair? Who ordered a brown chair? What happened? Write the answer and send it to your teacher.',
        promptEs:
          '¿Por qué la historia se llama "Color Equivocado"? ¿Quién pidió una silla verde? ¿Quién pidió una silla marrón? ¿Qué ocurrió? Escribe la respuesta y envíasela a tu profesor.',
        maxAiRequests: 2,
        initialWordsTarget: 25,
        placeholder:
          'Why is the story called "Wrong Color"? Who ordered a green chair? Who ordered a brown chair? What happened?...',
        storyContext:
          'Ms. Green ordered a brown chair and Mr. Brown ordered a green chair. The delivery company mixed them up and delivered a green chair to Ms. Green. She called the manager, who told her Mr. Brown got her chair. After work, she took the chair back to the store, but it was closed. Outside, she met Mr. Brown carrying her brown chair, and they happily exchanged chairs.',
      },

      // Activity 7: Mastery Test (5 tests corresponding to test1.png - test5.png)
      {
        id: 'wrong-color-unit-test-act7',
        type: 'unit-test',
        title: 'Lesson 2: Wrong Color · Mastery Test',
        titleEs: 'Lección 2: Color Equivocado · Test de Evaluación',
        subtitle: 'Wrong Color · Test de Evaluación (5 Tests)',
        subtitleEs: 'Color Equivocado · Test de Comprensión Lectora',
        description:
          'Test your reading comprehension and mastery of the story "Wrong Color". This test consists of 5 tests based on the story.',
        descriptionEs:
          'Pon a prueba tu comprensión lectora y dominio de la historia "Color Equivocado". Este test consta de 5 evaluaciones basadas en la historia.',
        totalQuestions: 5,
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
        questions: [
          // Test 1 (test1.png): Which sentence is true?
          {
            id: 'wc-test-q1',
            number: 1,
            type: 'radio-choice',
            instructions: 'Choose the correct answer.',
            instructionsEs: 'Elige la respuesta correcta.',
            question: 'Which sentence is true?',
            questionEs: '¿Qué oración es verdadera?',
            audioPrompt: 'Which sentence is true?',
            options: [
              {
                id: 'wc-t1-opt1',
                text: 'The store manager was angry when he found the order.',
                textEs: 'El gerente de la tienda estaba enojado cuando encontró el pedido.',
                isCorrect: false,
              },
              {
                id: 'wc-t1-opt2',
                text: 'The store was closed when Ms. Green got there.',
                textEs: 'La tienda estaba cerrada cuando la Sra. Green llegó allí.',
                isCorrect: true,
              },
              {
                id: 'wc-t1-opt3',
                text: 'Ms. Green went to the store before she went to work.',
                textEs: 'La Sra. Green fue a la tienda antes de ir a trabajar.',
                isCorrect: false,
              },
              {
                id: 'wc-t1-opt4',
                text: 'Ms. Green was angry when she met Mr. Brown.',
                textEs: 'La Sra. Green estaba enojada cuando conoció al Sr. Brown.',
                isCorrect: false,
              },
            ],
            correctAnswerId: 'wc-t1-opt2',
            explanation:
              'In the story: "After work, she went to the store, but it was already closed." Therefore, the store was closed when Ms. Green got there.',
            explanationEs:
              'En la historia dice: "After work, she went to the store, but it was already closed." Por lo tanto, la tienda ya estaba cerrada cuando la Sra. Green llegó allí.',
          },

          // Test 2 (test2.png): Drag the correct answer/s into place.
          {
            id: 'wc-test-q2',
            number: 2,
            type: 'drag-drop',
            instructions: 'Drag the correct answer/s into place.',
            instructionsEs: 'Arrastra la respuesta correcta a su lugar.',
            question: 'Ms. Green ordered a _____ chair.',
            questionEs: 'La Sra. Green pidió una silla _____.',
            audioPrompt: 'Ms. Green ordered a brown chair.',
            sentencePrefix: 'Ms. Green ordered a',
            sentencePrefixEs: 'La Sra. Green pidió una silla',
            sentenceSuffix: 'chair.',
            sentenceSuffixEs: '.',
            options: [
              {
                id: 'wc-t2-opt1',
                text: 'brown',
                textEs: 'marrón',
                isCorrect: true,
              },
              {
                id: 'wc-t2-opt2',
                text: 'green',
                textEs: 'verde',
                isCorrect: false,
              },
              {
                id: 'wc-t2-opt3',
                text: 'funny',
                textEs: 'graciosa',
                isCorrect: false,
              },
              {
                id: 'wc-t2-opt4',
                text: 'bigger',
                textEs: 'más grande',
                isCorrect: false,
              },
            ],
            correctAnswerId: 'wc-t2-opt1',
            explanation:
              'Ms. Green said: "I ordered a brown chair, not green!" Therefore, she ordered a brown chair.',
            explanationEs:
              'La Sra. Green dijo: "I ordered a brown chair, not green!" (¡Pedí una silla marrón, no verde!). Por lo tanto, ella ordenó una silla marrón.',
          },

          // Test 3 (test3.png): What did Ms. Green do after the delivery man brought the chair?
          {
            id: 'wc-test-q3',
            number: 3,
            type: 'radio-choice',
            instructions: 'Choose the correct answer.',
            instructionsEs: 'Elige la respuesta correcta.',
            question: 'What did Ms. Green do after the delivery man brought the chair?',
            questionEs: '¿Qué hizo la Sra. Green después de que el repartidor trajo la silla?',
            audioPrompt: 'What did Ms. Green do after the delivery man brought the chair?',
            options: [
              {
                id: 'wc-t3-opt1',
                text: 'She went to work.',
                textEs: 'Ella fue a trabajar.',
                isCorrect: false,
              },
              {
                id: 'wc-t3-opt2',
                text: 'She went to the store.',
                textEs: 'Ella fue a la tienda.',
                isCorrect: false,
              },
              {
                id: 'wc-t3-opt3',
                text: 'She called the store manager.',
                textEs: 'Ella llamó al gerente de la tienda.',
                isCorrect: true,
              },
              {
                id: 'wc-t3-opt4',
                text: 'She paid for the chair.',
                textEs: 'Ella pagó por la silla.',
                isCorrect: false,
              },
            ],
            correctAnswerId: 'wc-t3-opt3',
            explanation:
              'In the story: "But the delivery man brought the wrong chair. Ms. Green called the store manager." She only went to work after talking to the manager.',
            explanationEs:
              'En la historia: "But the delivery man brought the wrong chair. Ms. Green called the store manager." Inmediatamente después de recibir la silla equivocada, llamó al gerente.',
          },

          // Test 4 (test4.png): What is "it" in: "I paid enough money for it"?
          {
            id: 'wc-test-q4',
            number: 4,
            type: 'radio-choice',
            instructions: 'Choose the correct answer.',
            instructionsEs: 'Elige la respuesta correcta.',
            question: 'What is "it" in: "I paid enough money for it"?',
            questionEs: '¿A qué se refiere "it" en: "I paid enough money for it"?',
            audioPrompt: 'What is "it" in: "I paid enough money for it"?',
            options: [
              {
                id: 'wc-t4-opt1',
                text: 'the wrong chair',
                textEs: 'la silla equivocada',
                isCorrect: false,
              },
              {
                id: 'wc-t4-opt2',
                text: 'the green chair',
                textEs: 'la silla verde',
                isCorrect: false,
              },
              {
                id: 'wc-t4-opt3',
                text: 'the brown chair',
                textEs: 'la silla marrón',
                isCorrect: true,
              },
              {
                id: 'wc-t4-opt4',
                text: 'a bigger chair',
                textEs: 'una silla más grande',
                isCorrect: false,
              },
            ],
            correctAnswerId: 'wc-t4-opt3',
            explanation:
              'Ms. Green said: "I want my chair. I paid enough money for it." The chair she wanted and had paid for was her brown chair.',
            explanationEs:
              'La Sra. Green dijo: "I want my chair. I paid enough money for it" (Quiero mi silla. Pagué suficiente dinero por ella). "It" hace referencia a su silla marrón que ella pidió y pagó.',
          },

          // Test 5 (test5.png): What is another title for this story?
          {
            id: 'wc-test-q5',
            number: 5,
            type: 'radio-choice',
            instructions: 'Choose the correct answer.',
            instructionsEs: 'Elige la respuesta correcta.',
            question: 'What is another title for this story?',
            questionEs: '¿Cuál es otro título para esta historia?',
            audioPrompt: 'What is another title for this story?',
            options: [
              {
                id: 'wc-t5-opt1',
                text: '"Two Green Chairs"',
                textEs: '"Dos sillas verdes"',
                isCorrect: false,
              },
              {
                id: 'wc-t5-opt2',
                text: '"The Department Store"',
                textEs: '"La tienda por departamentos"',
                isCorrect: false,
              },
              {
                id: 'wc-t5-opt3',
                text: '"Three Brown Chairs"',
                textEs: '"Tres sillas marrones"',
                isCorrect: false,
              },
              {
                id: 'wc-t5-opt4',
                text: '"The Mistake"',
                textEs: '"El error"',
                isCorrect: true,
              },
            ],
            correctAnswerId: 'wc-t5-opt4',
            explanation:
              'The story revolves around the delivery mix-up and human mistakes: "We all make mistakes, don\'t we?" / "Some people make bigger mistakes than others!". Thus, "The Mistake" is an appropriate alternative title.',
            explanationEs:
              'La historia gira en torno a la confusión y a los errores: "We all make mistakes, don\'t we?" y "Some people make bigger mistakes than others!". Por lo tanto, "The Mistake" (El error) es un título alternativo muy apropiado.',
          },
        ],
      },
    ],
  },

  // SECTION 3: Dress from Paris
  {
    id: 'dress-from-paris',
    number: 3,
    title: 'Dress from Paris',
    titleEs: 'Vestido de París',
    subtitle: 'Lesson 3: Social & Shopping Dialogue · Dress Compliments',
    description:
      'Aprende a responder a cumplidos, entablar conversaciones breves en inglés, expresar opiniones sobre ropa y practicar roleplays interactivos.',
    imageUrl: dressFromParisImg,
    lessonText: DRESS_FROM_PARIS_LESSON_TEXT,
    flashcards: [],
    exercises: DRESS_FROM_PARIS_EXERCISES,
  },

  // SECTION 4: Be-Past: Statements
  {
    id: 'be-past-statements',
    number: 4,
    title: 'Be-Past: Statements',
    titleEs: 'Be en Pasado: Afirmaciones',
    subtitle: 'Grammar Focus · Was / Were Statements',
    description:
      'Aprende las reglas gramaticales y afirmaciones con el pasado del verbo Be (was / were / wasn\'t / weren\'t), practica con 10 actividades interactivas y realiza el Test de evaluación.',
    imageUrl: rockConcertImg,
    lessonText: BE_PAST_LESSON_TEXT,
    flashcards: [],
    exercises: BE_PAST_EXERCISES,
  },

  // SECTION 5: Be-Past: Questions
  {
    id: 'be-past-questions',
    number: 5,
    title: 'Be-Past: Questions',
    titleEs: 'Be en Pasado: Preguntas',
    subtitle: 'Grammar Focus · Questions with Was / Were',
    description:
      'Aprende a formular y responder preguntas en pasado con el verbo Be (Was / Were), practica con 10 actividades interactivas y completa el Test de evaluación de 5 preguntas.',
    imageUrl: bePastQuestionsImg,
    lessonText: BE_PAST_QUESTIONS_LESSON_TEXT,
    flashcards: BE_PAST_QUESTIONS_FLASHCARDS,
    exercises: BE_PAST_QUESTIONS_EXERCISES,
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
