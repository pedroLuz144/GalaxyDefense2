import { useState } from "react";
import { GameState, Theme, RankingEntry } from "@/types/game";
import MenuScreen from "@/components/game/MenuScreen";
import ThemeSelect from "@/components/game/ThemeSelect";
import GameScreen from "@/components/game/GameScreen";
import GameOverScreen from "@/components/game/GameOverScreen";
import RankingScreen from "@/components/game/RankingScreen";

const Index = () => {
  const [gameState, setGameState] = useState<GameState>({
    score: 0,
    lives: 3,
    level: 1,
    currentQuestion: null,
    gameStatus: 'menu',
    selectedTheme: null
  });

  const [finalScore, setFinalScore] = useState(0);

  const handleGameStateChange = (newState: Partial<GameState>) => {
    setGameState(prev => ({ ...prev, ...newState }));
  };

  const handleStartGame = () => {
    setGameState(prev => ({ ...prev, gameStatus: 'theme-select' }));
  };

  const handleThemeSelect = (theme: Theme) => {
    setGameState(prev => ({
      ...prev,
      selectedTheme: theme,
      gameStatus: 'playing',
      score: 0,
      lives: 3,
      level: 1,
      currentQuestion: null
    }));
  };

  const handleGameOver = (score: number) => {
    setFinalScore(score);
    setGameState(prev => ({ ...prev, gameStatus: 'game-over' }));
  };

  const handleRestart = () => {
    setGameState(prev => ({
      ...prev,
      score: 0,
      lives: 3,
      level: 1,
      currentQuestion: null,
      gameStatus: 'playing'
    }));
  };

  const handleMainMenu = () => {
    setGameState(prev => ({
      ...prev,
      gameStatus: 'menu',
      selectedTheme: null,
      currentQuestion: null,
      score: 0,
      lives: 3,
      level: 1
    }));
  };

  const handleShowRanking = () => {
    setGameState(prev => ({ ...prev, gameStatus: 'ranking' }));
  };

  const handlePause = () => {
    setGameState(prev => ({ ...prev, gameStatus: 'paused' }));
  };

  const handleResume = () => {
    setGameState(prev => ({ ...prev, gameStatus: 'playing' }));
  };

  const handleSaveScore = (playerName: string) => {
    const newEntry: RankingEntry = {
      id: Date.now(),
      playerName,
      score: finalScore,
      theme: gameState.selectedTheme!,
      date: new Date().toISOString()
    };

    // Load existing rankings
    const existingRankings = localStorage.getItem('galaxy-defense-rankings');
    const rankings: RankingEntry[] = existingRankings ? JSON.parse(existingRankings) : [];
    
    // Add new entry and save
    rankings.push(newEntry);
    localStorage.setItem('galaxy-defense-rankings', JSON.stringify(rankings));
  };

  const handleBackToMenu = () => {
    setGameState(prev => ({ ...prev, gameStatus: 'menu' }));
  };

  switch (gameState.gameStatus) {
    case 'menu':
      return (
        <MenuScreen
          onStartGame={handleStartGame}
          onShowRanking={handleShowRanking}
        />
      );

    case 'theme-select':
      return (
        <ThemeSelect
          onThemeSelect={handleThemeSelect}
          onBackToMenu={handleBackToMenu}
        />
      );

    case 'playing':
      return (
        <GameScreen
          gameState={gameState}
          onGameStateChange={handleGameStateChange}
          onGameOver={handleGameOver}
          onPause={handlePause}
        />
      );

    case 'paused':
      return (
        <div className="min-h-screen bg-gradient-space flex flex-col items-center justify-center p-4">
          <div className="text-center space-y-6">
            <h1 className="text-4xl font-bold text-foreground">JOGO PAUSADO</h1>
            <div className="space-y-4">
              <button
                onClick={handleResume}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg text-lg font-semibold"
              >
                CONTINUAR
              </button>
              <br />
              <button
                onClick={handleMainMenu}
                className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-lg text-lg font-semibold"
              >
                MENU PRINCIPAL
              </button>
            </div>
          </div>
        </div>
      );

    case 'game-over':
      return (
        <GameOverScreen
          finalScore={finalScore}
          selectedTheme={gameState.selectedTheme!}
          onRestart={handleRestart}
          onMainMenu={handleMainMenu}
          onSaveScore={handleSaveScore}
        />
      );

    case 'ranking':
      return (
        <RankingScreen
          onBackToMenu={handleBackToMenu}
        />
      );

    default:
      return null;
  }
};

export default Index;
