import { GameButton } from "@/components/ui/game-button";

interface MenuScreenProps {
  onStartGame: () => void;
  onShowRanking: () => void;
}

const MenuScreen = ({ onStartGame, onShowRanking }: MenuScreenProps) => {
  return (
    <div className="min-h-screen bg-gradient-space flex flex-col items-center justify-center p-4">
      <div className="text-center space-y-8 max-w-2xl">
        <div className="space-y-4">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            GALAXY DEFENSE
          </h1>
          <p className="text-xl text-muted-foreground">
            Defenda a galáxia com seu conhecimento!
          </p>
          <p className="text-sm text-muted-foreground">
            Responda às perguntas atirando nos inimigos com as respostas corretas
          </p>
        </div>

        <div className="space-y-4">
          <GameButton 
            size="lg" 
            onClick={onStartGame}
            className="w-full max-w-xs bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            INICIAR JOGO
          </GameButton>
          
          <GameButton 
            variant="outline" 
            size="lg" 
            onClick={onShowRanking}
            className="w-full max-w-xs"
          >
            RANKING
          </GameButton>
        </div>

        <div className="mt-8 text-xs text-muted-foreground">
          <p>Use ← → para mover • Clique para atirar • ESC para pausar</p>
        </div>
      </div>
    </div>
  );
};

export default MenuScreen;