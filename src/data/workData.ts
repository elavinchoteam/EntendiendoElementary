export interface WorkVocabItem {
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

export const WORK_VOCABULARY: WorkVocabItem[] = [
  {
    id: 'break',
    word: 'break',
    partOfSpeech: 'noun',
    definition: 'a short time when you stop what you are doing and have a rest',
    definitionEs: 'un breve período en el que dejas de hacer lo que estás haciendo para descansar',
    exampleSentence: 'I worked for eight hours without a break.',
    exampleTranslation: 'Trabajé durante ocho horas sin descanso.',
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'desk',
    word: 'desk',
    partOfSpeech: 'noun',
    definition: 'a table, often with drawers, that you sit at to write or work',
    definitionEs: 'una mesa, a menudo con cajones, en la que te sientas para escribir o trabajar',
    exampleSentence: 'He sits at his desk to do his homework.',
    exampleTranslation: 'Él se sienta en su escritorio para hacer sus tareas.',
    imageUrl: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'factory',
    word: 'factory',
    partOfSpeech: 'noun',
    definition: 'a building or group of buildings where large amounts of products are made using machines',
    definitionEs: 'un edificio o conjunto de edificios donde se fabrican grandes cantidades de productos con máquinas',
    exampleSentence: 'Three hundred people work in the clothing factory.',
    exampleTranslation: 'Trescientos personas trabajan en la fábrica de ropa.',
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'high-salary',
    word: 'high salary',
    partOfSpeech: 'noun phrase',
    definition: 'a large amount of money paid regularly to someone for the work that they do',
    definitionEs: 'una gran cantidad de dinero pagada periódicamente a alguien por su trabajo',
    exampleSentence: 'He works hard but he gets a high salary.',
    exampleTranslation: 'Él trabaja duro pero recibe un salario alto.',
    imageUrl: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'meeting',
    word: 'meeting',
    partOfSpeech: 'noun',
    definition: 'an event where a group of people come together to talk about something or make decisions',
    definitionEs: 'un evento en el que un grupo de personas se reúne para hablar sobre algo o tomar decisiones',
    exampleSentence: 'I have a meeting at 10 o\'clock.',
    exampleTranslation: 'Tengo una reunión a las 10 en punto.',
    imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'office',
    word: 'office',
    partOfSpeech: 'noun',
    definition: 'a room or part of a building in which people work sitting at desks',
    definitionEs: 'una habitación o parte de un edificio en la que las personas trabajan sentadas en escritorios',
    exampleSentence: 'Four people work in this office.',
    exampleTranslation: 'Cuatro personas trabajan en esta oficina.',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'start-a-business',
    word: 'start a business',
    partOfSpeech: 'phrase',
    definition: 'to create and launch a new company or commercial organization',
    definitionEs: 'crear y poner en marcha una nueva empresa u organización comercial',
    exampleSentence: 'I started a business from home.',
    exampleTranslation: 'Comencé un negocio desde casa.',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'suit',
    word: 'suit',
    partOfSpeech: 'noun',
    definition: 'a jacket and trousers or jacket and matching skirt that are worn together',
    definitionEs: 'una chaqueta y pantalón, o chaqueta y falda a juego, que se visten juntos',
    exampleSentence: 'He wears a suit to work.',
    exampleTranslation: 'Él usa un traje para ir a trabajar.',
    imageUrl: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'summer-job',
    word: 'summer job',
    partOfSpeech: 'noun phrase',
    definition: 'temporary work taken during the summer months, usually by students',
    definitionEs: 'un trabajo temporal que se realiza durante los meses de verano, habitualmente por estudiantes',
    exampleSentence: 'She has a summer job in an ice cream store.',
    exampleTranslation: 'Ella tiene un trabajo de verano en una heladería.',
    imageUrl: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'write-a-report',
    word: 'write a report',
    partOfSpeech: 'phrase',
    definition: 'to produce a detailed document giving information or facts about a topic or event',
    definitionEs: 'redactar un documento detallado que brinda información o datos sobre un tema o evento',
    exampleSentence: 'Please write a report of our meeting today.',
    exampleTranslation: 'Por favor, escribe un informe de nuestra reunión de hoy.',
    imageUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=400&q=80',
  },
];

export const WORK_COLLOCATION_MATCHES: CollocationMatchItem[] = [
  { prefix: 'write', target: 'a report', fullPhrase: 'write a report', translation: 'escribir un informe' },
  { prefix: 'wear', target: 'a suit', fullPhrase: 'wear a suit', translation: 'vestir un traje' },
  { prefix: 'get', target: 'a high salary', fullPhrase: 'get a high salary', translation: 'ganar un salario alto' },
  { prefix: 'work in', target: 'an office', fullPhrase: 'work in an office', translation: 'trabajar en una oficina' },
  { prefix: 'start', target: 'a business', fullPhrase: 'start a business', translation: 'comenzar un negocio' },
  { prefix: 'take', target: 'a break', fullPhrase: 'take a break', translation: 'tomar un descanso' },
];

export const WORK_DICTATION_1_ITEMS: DictationItem[] = [
  {
    id: 'w-d1-1',
    sentence: 'I worked for eight hours without a break.',
    translation: 'Trabajé durante ocho horas sin descanso.',
    audioKey: 'break',
  },
  {
    id: 'w-d1-2',
    sentence: 'He sits at his desk to do his homework.',
    translation: 'Él se sienta en su escritorio para hacer sus tareas.',
    audioKey: 'desk',
  },
  {
    id: 'w-d1-3',
    sentence: 'Three hundred people work in the clothing factory.',
    translation: 'Trescientos personas trabajan en la fábrica de ropa.',
    audioKey: 'factory',
  },
  {
    id: 'w-d1-4',
    sentence: 'He works hard but he gets a high salary.',
    translation: 'Él trabaja duro pero recibe un salario alto.',
    audioKey: 'high salary',
  },
  {
    id: 'w-d1-5',
    sentence: "I have a meeting at 10 o'clock.",
    translation: 'Tengo una reunión a las 10 en punto.',
    audioKey: 'meeting',
  },
];

export const WORK_DICTATION_2_ITEMS: DictationItem[] = [
  {
    id: 'w-d2-1',
    sentence: 'Four people work in this office.',
    translation: 'Cuatro personas trabajan en esta oficina.',
    audioKey: 'office',
  },
  {
    id: 'w-d2-2',
    sentence: 'I started a business from home.',
    translation: 'Comencé un negocio desde casa.',
    audioKey: 'start a business',
  },
  {
    id: 'w-d2-3',
    sentence: 'He wears a suit to work.',
    translation: 'Él usa un traje para trabajar.',
    audioKey: 'suit',
  },
  {
    id: 'w-d2-4',
    sentence: 'She has a summer job in an ice cream store.',
    translation: 'Ella tiene un trabajo de verano en una heladería.',
    audioKey: 'summer job',
  },
  {
    id: 'w-d2-5',
    sentence: 'Please write a report of our meeting today.',
    translation: 'Por favor, escribe un informe de nuestra reunión de hoy.',
    audioKey: 'write a report',
  },
];

export const WORK_TEST_QUESTIONS: TestDropdownItem[] = [
  {
    id: 'work-test-1',
    number: 1,
    sentenceBefore: "Let's have",
    sentenceAfter: "for lunch at one o'clock.",
    options: ['a break', 'a meeting', 'a summer job'],
    correctAnswer: 'a break',
    fullSentence: "Let's have a break for lunch at one o'clock.",
    translation: 'Tomemos un descanso para almorzar a la una en punto.',
    grammarNote: "'Have a break' es una colocación fija que significa tomarse un descanso o pausa laboral.",
  },
  {
    id: 'work-test-2',
    number: 2,
    sentenceBefore: 'The computer is on the',
    sentenceAfter: '.',
    options: ['desk', 'factory', 'office'],
    correctAnswer: 'desk',
    fullSentence: 'The computer is on the desk.',
    translation: 'La computadora está sobre el escritorio.',
    grammarNote: "'Desk' es el mueble o escritorio de trabajo sobre el cual se coloca la computadora.",
  },
  {
    id: 'work-test-3',
    number: 3,
    sentenceBefore: 'The',
    sentenceAfter: 'produces low-fat foods.',
    options: ['break', 'factory', 'high salary'],
    correctAnswer: 'factory',
    fullSentence: 'The factory produces low-fat foods.',
    translation: 'La fábrica produce alimentos bajos en grasa.',
    grammarNote: "'Factory' (fábrica) es la instalación industrial donde se elaboran y procesan productos.",
  },
  {
    id: 'work-test-4',
    number: 4,
    sentenceBefore: 'I want a job with',
    sentenceAfter: '.',
    options: ['a high salary', 'a meeting', 'a suit'],
    correctAnswer: 'a high salary',
    fullSentence: 'I want a job with a high salary.',
    translation: 'Quiero un trabajo con un sueldo alto.',
    grammarNote: "'A high salary' significa una remuneración salarial elevada.",
  },
  {
    id: 'work-test-5',
    number: 5,
    sentenceBefore: 'Mr. Jones is in',
    sentenceAfter: 'at the moment. Can he call you later?',
    options: ['a break', 'a factory', 'a meeting'],
    correctAnswer: 'a meeting',
    fullSentence: 'Mr. Jones is in a meeting at the moment. Can he call you later?',
    translation: 'El Sr. Jones está en una reunión en este momento. ¿Puede llamarle más tarde?',
    grammarNote: "Estar ocupado en una reunión de trabajo se expresa con la frase 'in a meeting'.",
  },
  {
    id: 'work-test-6',
    number: 6,
    sentenceBefore: 'My',
    sentenceAfter: 'is on the 10th floor.',
    options: ['office', 'summer job', 'suit'],
    correctAnswer: 'office',
    fullSentence: 'My office is on the 10th floor.',
    translation: 'Mi oficina está en el décimo piso.',
    grammarNote: "'Office' (oficina) es el espacio laboral ubicado en una planta o piso de un edificio.",
  },
  {
    id: 'work-test-7',
    number: 7,
    sentenceBefore: 'They',
    sentenceAfter: 'selling shoes in London.',
    options: ['wrote a report', 'started a business', 'wore a suit'],
    correctAnswer: 'started a business',
    fullSentence: 'They started a business selling shoes in London.',
    translation: 'Ellos comenzaron un negocio vendiendo zapatos en Londres.',
    grammarNote: "'Started a business' (en tiempo pasado) significa crear o emprender un negocio comercial.",
  },
  {
    id: 'work-test-8',
    number: 8,
    sentenceBefore: 'In this office, everyone wears',
    sentenceAfter: '.',
    options: ['breaks', 'high salaries', 'suits'],
    correctAnswer: 'suits',
    fullSentence: 'In this office, everyone wears suits.',
    translation: 'En esta oficina, todos usan trajes.',
    grammarNote: "El verbo 'wear' (llevar puesto/vestir) concuerda gramatical y semánticamente con prendas de vestir como 'suits' (trajes).",
  },
  {
    id: 'work-test-9',
    number: 9,
    sentenceBefore: 'School students often take a',
    sentenceAfter: '.',
    options: ['desk', 'summer job', 'factory'],
    correctAnswer: 'summer job',
    fullSentence: 'School students often take a summer job.',
    translation: 'Los estudiantes escolares a menudo toman un trabajo de verano.',
    grammarNote: "'Summer job' es el empleo temporal de temporada estival realizado por estudiantes.",
  },
  {
    id: 'work-test-10',
    number: 10,
    sentenceBefore: 'He',
    sentenceAfter: 'for the sales department.',
    options: ['had a break', 'wore a suit', 'wrote a report'],
    correctAnswer: 'wrote a report',
    fullSentence: 'He wrote a report for the sales department.',
    translation: 'Él escribió un informe para el departamento de ventas.',
    grammarNote: "'Wrote a report' (pasado de write a report) significa elaborar un informe por escrito.",
  },
];
