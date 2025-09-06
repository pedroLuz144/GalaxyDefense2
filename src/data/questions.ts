import { Question, Theme } from "@/types/game";

const questions: Question[] = [
  // Matemática
  {
    id: 1,
    theme: 'matemática',
    question: "Qual é o resultado de 15 + 23?",
    correctAnswer: "38",
    wrongAnswers: ["35", "40", "42"]
  },
  {
    id: 2,
    theme: 'matemática',
    question: "Quanto é 7 × 8?",
    correctAnswer: "56",
    wrongAnswers: ["54", "58", "48"]
  },
  {
    id: 3,
    theme: 'matemática',
    question: "Qual é a raiz quadrada de 64?",
    correctAnswer: "8",
    wrongAnswers: ["6", "10", "12"]
  },
  {
    id: 13,
    theme: 'matemática',
    question: "Qual é o valor de π (pi) aproximado a duas casas decimais?",
    correctAnswer: "3,14",
    wrongAnswers: ["3,15", "3,12", "3,10"]
  },
  {
    id: 14,
    theme: 'matemática',
    question: "Qual é a derivada de x²?",
    correctAnswer: "2x",
    wrongAnswers: ["x²", "x", "x³"]
  },
  {
    id: 15,
    theme: 'matemática',
    question: "Qual é a área de um círculo com raio 3?",
    correctAnswer: "28,27",
    wrongAnswers: ["18,85", "31,41", "36"]
  },
  {
    id: 16,
    theme: 'matemática',
    question: "Quanto é 12 ÷ 3?",
    correctAnswer: "4",
    wrongAnswers: ["3", "5", "6"]
  },
  {
    id: 17,
    theme: 'matemática',
    question: "Qual é o próximo número da sequência: 2, 4, 8, 16, ...?",
    correctAnswer: "32",
    wrongAnswers: ["24", "30", "34"]
  },
  {
    id: 18,
    theme: 'matemática',
    question: "Quanto é 9²?",
    correctAnswer: "81",
    wrongAnswers: ["72", "91", "99"]
  },
  {
    id: 19,
    theme: 'matemática',
    question: "Se João tem 3 maçãs e ganha mais 5, quantas maçãs ele terá?",
    correctAnswer: "8",
    wrongAnswers: ["7", "9", "6"]
  },
  {
    id: 20,
    theme: 'matemática',
    question: "Quanto é a raiz cúbica de 27?",
    correctAnswer: "3",
    wrongAnswers: ["2", "6", "9"]
  },
  {
    id: 21,
    theme: 'matemática',
    question: "Qual é a fração equivalente a 0,5?",
    correctAnswer: "1/2",
    wrongAnswers: ["1/3", "2/3", "3/4"]
  },
  {
    id: 22,
    theme: 'matemática',
    question: "Qual é o perímetro de um quadrado com lado 5?",
    correctAnswer: "20",
    wrongAnswers: ["25", "15", "30"]
  },

  // História
  {
    id: 4,
    theme: 'história',
    question: "Em que ano o Brasil foi descoberto?",
    correctAnswer: "1500",
    wrongAnswers: ["1498", "1502", "1505"]
  },
  {
    id: 5,
    theme: 'história',
    question: "Quem foi o primeiro presidente do Brasil?",
    correctAnswer: "Deodoro da Fonseca",
    wrongAnswers: ["Getúlio Vargas", "Prudente de Morais", "Floriano Peixoto"]
  },
  {
    id: 6,
    theme: 'história',
    question: "Em que século aconteceu a Revolução Francesa?",
    correctAnswer: "XVIII",
    wrongAnswers: ["XVII", "XIX", "XVI"]
  },
  {
    id: 23,
    theme: 'história',
    question: "Quem foi o líder da independência da Índia?",
    correctAnswer: "Mahatma Gandhi",
    wrongAnswers: ["Nelson Mandela", "Martin Luther King", "Dalai Lama"]
  },
  {
    id: 24,
    theme: 'história',
    question: "Em que ano terminou a Segunda Guerra Mundial?",
    correctAnswer: "1945",
    wrongAnswers: ["1939", "1940", "1950"]
  },
  {
    id: 25,
    theme: 'história',
    question: "Quem foi o faraó responsável pela construção da Grande Pirâmide de Gizé?",
    correctAnswer: "Quéops",
    wrongAnswers: ["Tutancâmon", "Ramsés II", "Cleópatra"]
  },
  {
    id: 26,
    theme: 'história',
    question: "Quem foi o imperador romano assassinado em 44 a.C.?",
    correctAnswer: "Júlio César",
    wrongAnswers: ["Nero", "Augusto", "Calígula"]
  },
  {
    id: 27,
    theme: 'história',
    question: "Qual civilização construiu Machu Picchu?",
    correctAnswer: "Inca",
    wrongAnswers: ["Asteca", "Maya", "Olmeca"]
  },
  {
    id: 28,
    theme: 'história',
    question: "Quem descobriu a América em 1492?",
    correctAnswer: "Cristóvão Colombo",
    wrongAnswers: ["Américo Vespúcio", "Vasco da Gama", "Pedro Álvares Cabral"]
  },
  {
    id: 29,
    theme: 'história',
    question: "Qual muro caiu em 1989, simbolizando o fim da Guerra Fria?",
    correctAnswer: "Muro de Berlim",
    wrongAnswers: ["Muro da China", "Muro de Jerusalém", "Muro de Stalingrado"]
  },
  {
    id: 30,
    theme: 'história',
    question: "Quem proclamou a independência do Brasil em 1822?",
    correctAnswer: "Dom Pedro I",
    wrongAnswers: ["Dom Pedro II", "José Bonifácio", "Tiradentes"]
  },
  {
    id: 31,
    theme: 'história',
    question: "Qual foi a primeira capital do Brasil?",
    correctAnswer: "Salvador",
    wrongAnswers: ["Rio de Janeiro", "Brasília", "Recife"]
  },
  {
    id: 32,
    theme: 'história',
    question: "Em que ano começou a Primeira Guerra Mundial?",
    correctAnswer: "1914",
    wrongAnswers: ["1910", "1918", "1920"]
  },

  // Ciência
  {
    id: 7,
    theme: 'ciência',
    question: "Qual é o símbolo químico do ouro?",
    correctAnswer: "Au",
    wrongAnswers: ["Ag", "Al", "Ar"]
  },
  {
    id: 8,
    theme: 'ciência',
    question: "Quantos planetas tem o Sistema Solar?",
    correctAnswer: "8",
    wrongAnswers: ["9", "7", "10"]
  },
  {
    id: 9,
    theme: 'ciência',
    question: "Qual é a velocidade da luz no vácuo?",
    correctAnswer: "300.000 km/s",
    wrongAnswers: ["250.000 km/s", "350.000 km/s", "200.000 km/s"]
  },
  {
    id: 33,
    theme: 'ciência',
    question: "Qual planeta é conhecido como o Planeta Vermelho?",
    correctAnswer: "Marte",
    wrongAnswers: ["Júpiter", "Vênus", "Saturno"]
  },
  {
    id: 34,
    theme: 'ciência',
    question: "Qual é o gás mais abundante na atmosfera terrestre?",
    correctAnswer: "Nitrogênio",
    wrongAnswers: ["Oxigênio", "Dióxido de carbono", "Hidrogênio"]
  },
  {
    id: 35,
    theme: 'ciência',
    question: "Qual órgão do corpo humano é responsável por bombear o sangue?",
    correctAnswer: "Coração",
    wrongAnswers: ["Pulmão", "Fígado", "Rim"]
  },
  {
    id: 36,
    theme: 'ciência',
    question: "Qual é a fórmula química da água?",
    correctAnswer: "H2O",
    wrongAnswers: ["CO2", "NaCl", "O2"]
  },
  {
    id: 37,
    theme: 'ciência',
    question: "Qual é o maior planeta do Sistema Solar?",
    correctAnswer: "Júpiter",
    wrongAnswers: ["Saturno", "Urano", "Netuno"]
  },
  {
    id: 38,
    theme: 'ciência',
    question: "Qual cientista propôs a teoria da relatividade?",
    correctAnswer: "Albert Einstein",
    wrongAnswers: ["Isaac Newton", "Galileu Galilei", "Niels Bohr"]
  },
  {
    id: 39,
    theme: 'ciência',
    question: "Qual é o processo pelo qual as plantas produzem seu alimento?",
    correctAnswer: "Fotossíntese",
    wrongAnswers: ["Respiração", "Digestão", "Fermentação"]
  },
  {
    id: 40,
    theme: 'ciência',
    question: "Qual é o satélite natural da Terra?",
    correctAnswer: "Lua",
    wrongAnswers: ["Fobos", "Titã", "Europa"]
  },
  {
    id: 41,
    theme: 'ciência',
    question: "Qual é a unidade básica da vida?",
    correctAnswer: "Célula",
    wrongAnswers: ["Átomo", "Molécula", "Tecido"]
  },
  {
    id: 42,
    theme: 'ciência',
    question: "Qual elemento químico tem o símbolo 'O'?",
    correctAnswer: "Oxigênio",
    wrongAnswers: ["Ouro", "Ozônio", "Ósmio"]
  },

  // Programação
  {
    id: 10,
    theme: 'programação',
    question: "O que significa HTML?",
    correctAnswer: "HyperText Markup Language",
    wrongAnswers: ["High Tech Modern Language", "Home Tool Markup Language", "Hyperlink and Text Markup Language"]
  },
  {
    id: 11,
    theme: 'programação',
    question: "Qual linguagem é conhecida como a 'linguagem da web'?",
    correctAnswer: "JavaScript",
    wrongAnswers: ["Python", "Java", "C++"]
  },
  {
    id: 12,
    theme: 'programação',
    question: "O que é CSS?",
    correctAnswer: "Cascading Style Sheets",
    wrongAnswers: ["Computer Style System", "Creative Style Solution", "Code Style Standard"]
  },
  {
    id: 43,
    theme: 'programação',
    question: "O que significa a sigla API?",
    correctAnswer: "Application Programming Interface",
    wrongAnswers: ["Advanced Program Integration", "Applied Programming Instructions", "Automated Process Interaction"]
  },
  {
    id: 44,
    theme: 'programação',
    question: "Qual desses NÃO é um banco de dados relacional?",
    correctAnswer: "MongoDB",
    wrongAnswers: ["MySQL", "PostgreSQL", "Oracle"]
  },
  {
    id: 45,
    theme: 'programação',
    question: "Qual linguagem é usada para estilizar páginas web?",
    correctAnswer: "CSS",
    wrongAnswers: ["JavaScript", "HTML", "SQL"]
  },
  {
    id: 46,
    theme: 'programação',
    question: "Em JavaScript, qual comando é usado para declarar uma constante?",
    correctAnswer: "const",
    wrongAnswers: ["let", "var", "static"]
  },
  {
    id: 47,
    theme: 'programação',
    question: "Qual empresa criou a linguagem Python?",
    correctAnswer: "Python Software Foundation",
    wrongAnswers: ["Google", "Microsoft", "Sun Microsystems"]
  },
  {
    id: 48,
    theme: 'programação',
    question: "Qual desses é um framework de JavaScript?",
    correctAnswer: "React",
    wrongAnswers: ["C#", "PHP", "Ruby"]
  },
  {
    id: 49,
    theme: 'programação',
    question: "O que significa SQL?",
    correctAnswer: "Structured Query Language",
    wrongAnswers: ["System Query Language", "Simple Question Language", "Standard Queue Language"]
  },
  {
    id: 50,
    theme: 'programação',
    question: "Qual desses é um sistema de controle de versão?",
    correctAnswer: "Git",
    wrongAnswers: ["Docker", "Linux", "Jenkins"]
  },
  {
    id: 51,
    theme: 'programação',
    question: "Qual tag HTML é usada para inserir imagens?",
    correctAnswer: "<img>",
    wrongAnswers: ["<image>", "<src>", "<picture>"]
  },
  {
    id: 52,
    theme: 'programação',
    question: "Qual comando é usado para instalar pacotes no Node.js?",
    correctAnswer: "npm install",
    wrongAnswers: ["node install", "install pkg", "yarn node"]
  }
];

export const getRandomQuestion = (theme: Theme): Question => {
  const themeQuestions = questions.filter(q => q.theme === theme);
  const randomIndex = Math.floor(Math.random() * themeQuestions.length);
  return themeQuestions[randomIndex];
};

export const getAllQuestionsByTheme = (theme: Theme): Question[] => {
  return questions.filter(q => q.theme === theme);
};
