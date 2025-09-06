export interface Question {
  id: number;
  question: string;
  correctAnswer: string;
  wrongAnswers: string[];
  theme: Theme;
}

export interface GameState {
  score: number;
  lives: number;
  level: number;
  currentQuestion: Question | null;
  gameStatus: 'menu' | 'theme-select' | 'playing' | 'paused' | 'game-over' | 'ranking';
  selectedTheme: Theme | null;
}

export interface Player {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Enemy {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  answer: string;
  isCorrect: boolean;
  speed: number;
}

export interface Projectile {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
}

export type Theme = 'matemática' | 'história' | 'ciência' | 'programação';

export interface RankingEntry {
  id: number;
  playerName: string;
  score: number;
  theme: Theme;
  date: string;
}