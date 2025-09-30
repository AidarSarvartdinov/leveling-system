import { memo } from 'react';
import type { Player } from '../types';

interface PlayerStatsProps {
  player: Player;
}

function PlayerStats({ player }: PlayerStatsProps) {
  const expPercentage = (player.experience / player.experienceToNextLevel) * 100;

  return (
    <div className="cyber-bg cyber-border rounded-lg p-6 shadow-lg shadow-cyan-500/10 h-full">
      <h2 className="text-2xl font-orbitron text-cyber-cyan mb-6 text-center text-glow">
        СТАТУС ИГРОКА
      </h2>
      
      {/* Уровень и опыт */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-cyber-cyan">Уровень {player.level}</span>
          <span className="text-green-500">{player.experience}/{player.experienceToNextLevel} EXP</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-3">
          <div 
            className="bg-green-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${Math.min(expPercentage, 100)}%` }}
          ></div>
        </div>
      </div>

      {/* Характеристики */}
      <div className="space-y-4 mb-6">
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


      {/* Общая статистика */}
      <div className="pt-4 border-t border-cyan-800">
        <div className="text-center text-cyan-300">
          Выполнено квестов: <span className="text-green-400">{player.totalQuestsCompleted}</span>
        </div>
      </div>
    </div>
  );
}

export default memo(PlayerStats);
