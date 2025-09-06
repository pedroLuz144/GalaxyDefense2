import { useEffect, useRef, useState, useCallback } from "react";
import { GameState, Player, Enemy, Projectile } from "@/types/game";
import { getRandomQuestion } from "@/data/questions";
import { GameButton } from "@/components/ui/game-button";
import playerShipImg from "@/assets/player-ship.png";
import enemyShipImg from "@/assets/enemy-ship.png";
import laserProjectileImg from "@/assets/laser-projectile.png";
import spaceBackgroundImg from "@/assets/space-background.png";

interface GameScreenProps {
  gameState: GameState;
  onGameStateChange: (newState: Partial<GameState>) => void;
  onGameOver: (finalScore: number) => void;
  onPause: () => void;
}

const GameScreen = ({ gameState, onGameStateChange, onGameOver, onPause }: GameScreenProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const keysRef = useRef<{ [key: string]: boolean }>({});
  
  // Sprite loading refs
  const playerImgRef = useRef<HTMLImageElement>();
  const enemyImgRef = useRef<HTMLImageElement>();
  const laserImgRef = useRef<HTMLImageElement>();
  const backgroundImgRef = useRef<HTMLImageElement>();

  const [player, setPlayer] = useState<Player>({
    x: 400,
    y: 500,
    width: 60,
    height: 60
  });

  const [enemies, setEnemies] = useState<Enemy[]>([]);
  const [projectiles, setProjectiles] = useState<Projectile[]>([]);
  const [lastQuestionTime, setLastQuestionTime] = useState(0);
  const [questionAnswered, setQuestionAnswered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const CANVAS_WIDTH = 800;
  const CANVAS_HEIGHT = 600;
  const PLAYER_SPEED = 5;
  const PROJECTILE_SPEED = 8;
  const ENEMY_SPEED = 1 + (gameState.level * 0.2);
  const QUESTION_INTERVAL = 10000; // 10 seconds

  // Load sprite images
  useEffect(() => {
    const playerImg = new Image();
    playerImg.src = playerShipImg;
    playerImgRef.current = playerImg;

    const enemyImg = new Image();
    enemyImg.src = enemyShipImg;
    enemyImgRef.current = enemyImg;

    const laserImg = new Image();
    laserImg.src = laserProjectileImg;
    laserImgRef.current = laserImg;

    const backgroundImg = new Image();
    backgroundImg.src = spaceBackgroundImg;
    backgroundImgRef.current = backgroundImg;
  }, []);

  // Generate new question with enemies
  const generateQuestion = useCallback(() => {
    if (!gameState.selectedTheme) return;

    const question = getRandomQuestion(gameState.selectedTheme);
    const allAnswers = [question.correctAnswer, ...question.wrongAnswers];
    const shuffledAnswers = allAnswers.sort(() => Math.random() - 0.5);

    const newEnemies: Enemy[] = shuffledAnswers.map((answer, index) => ({
      id: `enemy-${Date.now()}-${index}`,
      x: 100 + index * 150,
      y: -100,
      width: 80,
      height: 60,
      answer,
      isCorrect: answer === question.correctAnswer,
      speed: ENEMY_SPEED
    }));

    setEnemies(newEnemies);
    onGameStateChange({ currentQuestion: question });
    setQuestionAnswered(false);
    setLastQuestionTime(Date.now());
  }, [gameState.selectedTheme, gameState.level, onGameStateChange]);

  // Initialize first question
  useEffect(() => {
    if (gameState.gameStatus === 'playing' && !gameState.currentQuestion) {
      generateQuestion();
    }
  }, [gameState.gameStatus, gameState.currentQuestion, generateQuestion]);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysRef.current[e.key] = true;

      if (e.key === 'Escape') {
        onPause();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysRef.current[e.key] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [onPause]);

  // Handle mouse input for shooting
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const canvas = canvasRef.current;
      if (canvas) {
        const rect = canvas.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };

    const handleMouseClick = (e: MouseEvent) => {
      const canvas = canvasRef.current;
      if (canvas) {
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // Create a new projectile
        const newProjectile: Projectile = {
          id: `projectile-${Date.now()}`,
          x: player.x + player.width / 2 - 2,
          y: player.y,
          width: 4,
          height: 10,
          speed: PROJECTILE_SPEED
        };

        setProjectiles(prev => [...prev, newProjectile]);
      }
    };

    const canvas = canvasRef.current;
    if (canvas) {
      canvas.addEventListener('mousemove', handleMouseMove);
      canvas.addEventListener('click', handleMouseClick);

      return () => {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('click', handleMouseClick);
      };
    }
  }, [player.x, player.y]);

  // Game loop
  useEffect(() => {
    if (gameState.gameStatus !== 'playing') return;

    const gameLoop = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Draw background
      if (backgroundImgRef.current && backgroundImgRef.current.complete) {
        ctx.drawImage(backgroundImgRef.current, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      } else {
        // Fallback background
        ctx.fillStyle = '#0f0f23';
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      }

      // Update player position
      setPlayer(prev => {
        let newX = prev.x;
        if (keysRef.current['ArrowLeft'] && newX > 0) {
          newX -= PLAYER_SPEED;
        }
        if (keysRef.current['ArrowRight'] && newX < CANVAS_WIDTH - prev.width) {
          newX += PLAYER_SPEED;
        }
        return { ...prev, x: newX };
      });

      // Update projectiles
      setProjectiles(prev =>
        prev
          .map(p => ({ ...p, y: p.y - p.speed }))
          .filter(p => p.y > -p.height)
      );

      // Update enemies
      setEnemies(prev =>
        prev.map(enemy => ({
          ...enemy,
          y: enemy.y + enemy.speed
        }))
      );

      // Check collision between projectiles and enemies
      setProjectiles(prevProjectiles => {
        let newProjectiles = [...prevProjectiles];
        setEnemies(prevEnemies => {
          let newEnemies = [...prevEnemies];

          for (let i = newProjectiles.length - 1; i >= 0; i--) {
            const projectile = newProjectiles[i];

            for (let j = newEnemies.length - 1; j >= 0; j--) {
              const enemy = newEnemies[j];

              // Check collision using fixed hitboxes
              if (
                projectile.x < enemy.x + enemy.width &&
                projectile.x + projectile.width > enemy.x &&
                projectile.y < enemy.y + enemy.height &&
                projectile.y + projectile.height > enemy.y
              ) {
                // Collision detected
                if (!questionAnswered) {
                  const scoreChange = enemy.isCorrect ? 10 : -5;
                  onGameStateChange({
                    score: gameState.score + scoreChange
                  });

                  if (!enemy.isCorrect) {
                    onGameStateChange({
                      lives: gameState.lives - 1
                    });
                  }

                  setQuestionAnswered(true);

                  // Check game over
                  if (gameState.lives - 1 <= 0) {
                    onGameOver(gameState.score + scoreChange);
                    return newEnemies;
                  }
                }

                // Remove projectile and enemy
                newProjectiles.splice(i, 1);
                newEnemies.splice(j, 1);
                break;
              }
            }
          }

          return newEnemies;
        });

        return newProjectiles;
      });

      // Check if enemies reached bottom
      setEnemies(prev => {
        const enemiesAtBottom = prev.filter(enemy => enemy.y > CANVAS_HEIGHT);
        if (enemiesAtBottom.length > 0 && !questionAnswered) {
          onGameStateChange({ lives: gameState.lives - 1 });
          if (gameState.lives - 1 <= 0) {
            onGameOver(gameState.score);
          }
        }
        return prev.filter(enemy => enemy.y <= CANVAS_HEIGHT);
      });

      // Generate new question if needed
      if (
        Date.now() - lastQuestionTime > QUESTION_INTERVAL ||
        (enemies.length === 0 && questionAnswered)
      ) {
        generateQuestion();
      }

      // Draw player sprite
      if (playerImgRef.current && playerImgRef.current.complete) {
        ctx.drawImage(playerImgRef.current, player.x, player.y, player.width, player.height);
      } else {
        // Fallback rectangle
        ctx.fillStyle = '#00aaff';
        ctx.fillRect(player.x, player.y, player.width, player.height);
        ctx.strokeStyle = '#00ffff';
        ctx.lineWidth = 2;
        ctx.strokeRect(player.x, player.y, player.width, player.height);
      }

      // Draw enemies
      enemies.forEach(enemy => {
        // Draw enemy sprite
        if (enemyImgRef.current && enemyImgRef.current.complete) {
          ctx.drawImage(enemyImgRef.current, enemy.x, enemy.y, enemy.width, enemy.height);
        } else {
          // Fallback rectangle
          ctx.fillStyle = enemy.isCorrect ? '#00ff88' : '#ff4444';
          ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
          ctx.strokeStyle = enemy.isCorrect ? '#88ffaa' : '#ffaaaa';
          ctx.lineWidth = 2;
          ctx.strokeRect(enemy.x, enemy.y, enemy.width, enemy.height);
        }

        // Add color overlay for correct/incorrect answers
        if (enemy.isCorrect) {
          ctx.fillStyle = 'rgba(0, 255, 136, 0.3)';
        } else {
          ctx.fillStyle = 'rgba(255, 68, 68, 0.3)';
        }
        ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);

        // Draw answer text
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 12px Arial';
        ctx.textAlign = 'center';
        ctx.shadowColor = '#000000';
        ctx.shadowOffsetX = 1;
        ctx.shadowOffsetY = 1;
        ctx.shadowBlur = 2;
        ctx.fillText(enemy.answer, enemy.x + enemy.width / 2, enemy.y + enemy.height + 20);
        ctx.shadowColor = 'transparent';
      });

      // Draw projectiles
      projectiles.forEach(projectile => {
        if (laserImgRef.current && laserImgRef.current.complete) {
          ctx.drawImage(laserImgRef.current, projectile.x, projectile.y, projectile.width, projectile.height);
        } else {
          // Fallback rectangle
          ctx.fillStyle = '#00ffff';
          ctx.fillRect(projectile.x, projectile.y, projectile.width, projectile.height);
        }
      });

      animationRef.current = requestAnimationFrame(gameLoop);
    };

    animationRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [
    gameState,
    player,
    enemies,
    projectiles,
    lastQuestionTime,
    questionAnswered,
    generateQuestion,
    onGameStateChange,
    onGameOver
  ]);

  return (
    <div className="min-h-screen bg-gradient-space flex flex-col items-center justify-center p-4">
      {/* HUD */}
      <div className="flex justify-between items-center w-full max-w-4xl mb-4 text-foreground">
        <div className="flex space-x-6">
          <div className="bg-card/50 backdrop-blur-sm px-4 py-2 rounded-lg border border-border">
            <span className="text-sm text-muted-foreground">Score: </span>
            <span className="text-lg font-bold text-neon-cyan">{gameState.score}</span>
          </div>
          <div className="bg-card/50 backdrop-blur-sm px-4 py-2 rounded-lg border border-border">
            <span className="text-sm text-muted-foreground">Lives: </span>
            <span className="text-lg font-bold text-destructive">
              {'❤️'.repeat(gameState.lives)}
            </span>
          </div>
          <div className="bg-card/50 backdrop-blur-sm px-4 py-2 rounded-lg border border-border">
            <span className="text-sm text-muted-foreground">Level: </span>
            <span className="text-lg font-bold text-neon-purple">{gameState.level}</span>
          </div>
        </div>

        <GameButton variant="ghost" size="sm" onClick={onPause}>
          PAUSAR
        </GameButton>
      </div>

      {/* Question Display */}
      {gameState.currentQuestion && (
        <div className="bg-card/80 backdrop-blur-sm p-4 rounded-lg border border-border mb-4 max-w-2xl text-center animate-slide-down">
          <h3 className="text-lg font-bold text-neon-blue mb-2">
            {gameState.currentQuestion.question}
          </h3>
          <p className="text-sm text-muted-foreground">
            Alinhe sua nave com a resposta correta!
          </p>
        </div>
      )}

      {/* Game Canvas */}
      <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        className="border border-border rounded-lg bg-game-bg shadow-neon"
      />

      {/* Controls */}
      <div className="mt-4 text-center text-sm text-muted-foreground">
        <p>Use ← → para mover • Clique para atirar • ESC para pausar</p>
      </div>
    </div>
  );
};

export default GameScreen;