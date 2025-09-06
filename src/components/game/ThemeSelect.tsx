import { Theme } from "@/types/game";
import { GameButton } from "@/components/ui/game-button";

interface ThemeSelectProps {
  onThemeSelect: (theme: Theme) => void;
  onBackToMenu: () => void;
}

const ThemeSelect = ({ onThemeSelect, onBackToMenu }: ThemeSelectProps) => {
  const themes: { name: Theme; description: string; color: string }[] = [
    {
      name: 'matemática',
      description: 'Teste seus conhecimentos em cálculos e números',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      name: 'história',
      description: 'Explore eventos e personalidades do passado',
      color: 'from-amber-500 to-orange-500'
    },
    {
      name: 'ciência',
      description: 'Descubra os mistérios do universo',
      color: 'from-green-500 to-emerald-500'
    },
    {
      name: 'programação',
      description: 'Domine a arte da programação',
      color: 'from-purple-500 to-pink-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-space flex flex-col items-center justify-center p-4">
      <div className="text-center space-y-8 max-w-4xl">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-foreground">
            ESCOLHA SEU TEMA
          </h1>
          <p className="text-lg text-muted-foreground">
            Selecione a categoria de perguntas para defender a galáxia
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {themes.map((theme) => (
            <div
              key={theme.name}
              className="bg-card/80 backdrop-blur-sm p-6 rounded-lg border border-border hover:bg-card/90 transition-all cursor-pointer group"
              onClick={() => onThemeSelect(theme.name)}
            >
              <div className={`text-3xl font-bold bg-gradient-to-r ${theme.color} bg-clip-text text-transparent mb-3 capitalize`}>
                {theme.name}
              </div>
              <p className="text-muted-foreground text-sm mb-4">
                {theme.description}
              </p>
              <GameButton
                variant="outline"
                className="w-full group-hover:bg-primary group-hover:text-primary-foreground"
              >
                SELECIONAR
              </GameButton>
            </div>
          ))}
        </div>

        <GameButton
          variant="ghost"
          onClick={onBackToMenu}
          className="mt-8"
        >
          ← VOLTAR AO MENU
        </GameButton>
      </div>
    </div>
  );
};

export default ThemeSelect;