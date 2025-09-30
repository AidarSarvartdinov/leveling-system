import type { Player } from '../types';

interface PlayerStatsProps {
  player: Player;
}

export default function PlayerStats({ player }: PlayerStatsProps) {
  const expPercentage = (player.experience / player.experienceToNextLevel) * 100;

  return (
    <div className="cyber-bg cyber-border rounded-lg p-6 shadow-lg shadow-cyan-500/10">
      <h2 className="text-2xl font-orbitron text-cyber-cyan mb-6 text-center text-glow">
        СТАТУС ИГРОКА
      </h2>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-cyber-cyan">Уровень {player.level}</span>
          <span className="text-cyber-green">{player.experience}/{player.experienceToNextLevel} EXP</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-3">
          <div 
            className="bg-cyber-green h-3 rounded-full transition-all duration-500"
            style={{ width: `${expPercentage}%` }}
          ></div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-blue-400">Интеллект</span>
          <span className="text-cyber-cyan font-bold">{player.intelligence}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-yellow-400">Дисциплина</span>
          <span className="text-cyber-cyan font-bold">{player.discipline}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-red-400">Выносливость</span>
          <span className="text-cyber-cyan font-bold">{player.stamina}</span>
        </div>
      </div>

      {player.availablePoints > 0 && (
        <div className="mt-6 p-3 bg-purple-900 border border-purple-500 rounded text-center">
          <div className="text-purple-300 font-orbitron">
            Доступно очков: <span className="text-yellow-400">{player.availablePoints}</span>
          </div>
          <button className="mt-2 px-4 py-1 bg-purple-600 hover:bg-purple-500 text-white rounded transition-colors">
            Прокачать
          </button>
        </div>
      )}

      <div className="mt-6 pt-4 border-t border-cyan-800">
        <div className="text-center text-cyan-300">
          Выполнено квестов: <span className="text-cyber-green">{player.totalQuestsCompleted}</span>
        </div>
      </div>
    </div>
  );
}
