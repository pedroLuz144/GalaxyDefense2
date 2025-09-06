import { useState } from "react";
import { GameButton } from "@/components/ui/game-button";
import { Input } from "@/components/ui/input";
import { Theme } from "@/types/game";

interface GameOverScreenProps {
  finalScore: number;
  selectedTheme: Theme;
  onRestart: () => void;
  onMainMenu: () => void;
  onSaveScore: (playerName: string) => void;
}

const GameOverScreen = ({ 
  finalScore, 
  selectedTheme, 
  onRestart, 
  onMainMenu, 
  onSaveScore 
}: GameOverScreenProps) => {
  const [playerName, setPlayerName] = useState("");
  const [scoreSaved, setScoreSaved] = useState(false);

  const handleSaveScore = () => {
    if (playerName.trim()) {
      onSaveScore(playerName.trim());
      setScoreSaved(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-space flex flex-col items-center justify-center p-4">
      <div className="text-center space-y-8 max-w-2xl">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold text-destructive">
            GAME OVER
          </h1>
          <div className="bg-card/80 backdrop-blur-sm p-6 rounded-lg border border-border">
            <p className="text-2xl font-bold text-foreground mb-2">
              PONTUAÇÃO FINAL
            </p>
            <p className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              {finalScore}
            </p>
            <p className="text-sm text-muted-foreground mt-2 capitalize">
              Tema: {selectedTheme}
            </p>
          </div>
        </div>

        {!scoreSaved && (
          <div className="bg-card/80 backdrop-blur-sm p-6 rounded-lg border border-border">
            <p className="text-lg font-semibold mb-4">
              Salvar sua pontuação no ranking
            </p>
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Digite seu nome"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                maxLength={20}
                className="flex-1"
              />
              <GameButton
                onClick={handleSaveScore}
                disabled={!playerName.trim()}
              >
                SALVAR
              </GameButton>
            </div>
          </div>
        )}

        {scoreSaved && (
          <div className="bg-green-500/20 backdrop-blur-sm p-4 rounded-lg border border-green-500/50">
            <p className="text-green-400">✅ Pontuação salva com sucesso!</p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <GameButton
            size="lg"
            onClick={onRestart}
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
          >
            JOGAR NOVAMENTE
          </GameButton>
          
          <GameButton
            variant="outline"
            size="lg"
            onClick={onMainMenu}
          >
            MENU PRINCIPAL
          </GameButton>
        </div>
      </div>
    </div>
  );
};

export default GameOverScreen;