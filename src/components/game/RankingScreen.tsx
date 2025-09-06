import { useState, useEffect } from "react";
import { GameButton } from "@/components/ui/game-button";
import { RankingEntry, Theme } from "@/types/game";

interface RankingScreenProps {
  onBackToMenu: () => void;
}

const RankingScreen = ({ onBackToMenu }: RankingScreenProps) => {
  const [rankings, setRankings] = useState<RankingEntry[]>([]);
  const [selectedTheme, setSelectedTheme] = useState<Theme | 'all'>('all');

  const themes: (Theme | 'all')[] = ['all', 'matemática', 'história', 'ciência', 'programação'];

  useEffect(() => {
    // Load rankings from localStorage
    const savedRankings = localStorage.getItem('galaxy-defense-rankings');
    if (savedRankings) {
      setRankings(JSON.parse(savedRankings));
    }
  }, []);

  const filteredRankings = rankings
    .filter(entry => selectedTheme === 'all' || entry.theme === selectedTheme)
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);

  const getThemeColor = (theme: Theme) => {
    switch (theme) {
      case 'matemática': return 'text-blue-400';
      case 'história': return 'text-orange-400';
      case 'ciência': return 'text-green-400';
      case 'programação': return 'text-purple-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-space flex flex-col items-center justify-center p-4">
      <div className="text-center space-y-8 max-w-4xl w-full">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            🏆 RANKING GALÁCTICO
          </h1>
          <p className="text-lg text-muted-foreground">
            Os melhores defensores da galáxia
          </p>
        </div>

        {/* Theme Filter */}
        <div className="flex flex-wrap gap-2 justify-center">
          {themes.map((theme) => (
            <GameButton
              key={theme}
              variant={selectedTheme === theme ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedTheme(theme)}
              className="capitalize"
            >
              {theme === 'all' ? 'Todos' : theme}
            </GameButton>
          ))}
        </div>

        {/* Rankings Table */}
        <div className="bg-card/80 backdrop-blur-sm rounded-lg border border-border overflow-hidden">
          {filteredRankings.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold">#</th>
                    <th className="px-4 py-3 text-left font-semibold">Jogador</th>
                    <th className="px-4 py-3 text-left font-semibold">Pontuação</th>
                    <th className="px-4 py-3 text-left font-semibold">Tema</th>
                    <th className="px-4 py-3 text-left font-semibold">Data</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRankings.map((entry, index) => (
                    <tr
                      key={entry.id}
                      className={`border-b border-border/50 ${
                        index < 3 ? 'bg-gradient-to-r from-yellow-500/10 to-orange-500/10' : ''
                      }`}
                    >
                      <td className="px-4 py-3 font-bold">
                        {index + 1}
                        {index === 0 && ' 🥇'}
                        {index === 1 && ' 🥈'}
                        {index === 2 && ' 🥉'}
                      </td>
                      <td className="px-4 py-3 font-semibold">{entry.playerName}</td>
                      <td className="px-4 py-3 font-bold text-yellow-400">{entry.score}</td>
                      <td className={`px-4 py-3 capitalize font-medium ${getThemeColor(entry.theme)}`}>
                        {entry.theme}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground text-sm">
                        {new Date(entry.date).toLocaleDateString('pt-BR')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-8 text-center">
              <p className="text-muted-foreground">
                Nenhuma pontuação registrada ainda.
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Seja o primeiro a defender a galáxia!
              </p>
            </div>
          )}
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

export default RankingScreen;