import { memo, useState } from 'react';
import type { Quest } from '../../types';

interface QuestItemProps {
  quest: Quest;
  onComplete: (questId: number) => void;
  difficultyColor: string;
}

function QuestItem({ quest, onComplete, difficultyColor }: QuestItemProps) {
  const [isCompleting, setIsCompleting] = useState(false);

  const handleComplete = async () => {
    if (quest.status !== 'PENDING') return;
    
    setIsCompleting(true);
    try {
      // Имитация задержки для анимации
      await new Promise(resolve => setTimeout(resolve, 600));
      onComplete(quest.id);
    } catch (error) {
      console.error('Error completing quest:', error);
    } finally {
      setIsCompleting(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit'
    });
  };

  const getDifficultyText = (difficulty: Quest['difficulty']) => {
    const difficultyMap = {
      'EASY': 'ЛЁГКИЙ',
      'MEDIUM': 'СРЕДНИЙ', 
      'HARD': 'СЛОЖНЫЙ',
      'BOSS': 'БОСС'
    };
    return difficultyMap[difficulty];
  };

  const isExpired = new Date(quest.deadline) < new Date() && quest.status === 'PENDING';

  return (
    <div className={`
      cyber-bg border-l-4 rounded-lg p-4 transition-all duration-300
      ${isCompleting ? 'animate-pulse scale-105' : ''}
      ${quest.status === 'COMPLETED' ? 'border-green-500 opacity-75' : ''}
      ${quest.status === 'FAILED' ? 'border-red-500 opacity-50' : ''}
      ${isExpired ? 'border-red-500' : ''}
      ${!isExpired && quest.status === 'PENDING' ? 'border-cyan-500' : ''}
      hover:shadow-lg hover:shadow-cyan-500/10
    `}>
      {/* Заголовок и статус */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-3">
          <h3 className={`
            font-orbitron text-lg font-bold
            ${quest.status === 'COMPLETED' ? 'text-green-400' : 'text-cyber-cyan'}
            ${isExpired ? 'text-red-400' : ''}
          `}>
            {quest.title}
          </h3>
        </div>
        
        <div className="flex items-center gap-2">
          <span className={`text-sm font-bold ${difficultyColor}`}>
            {getDifficultyText(quest.difficulty)}
          </span>
          <div className="text-green-400 font-bold text-sm bg-black/30 px-2 py-1 rounded">
            +{quest.experienceReward} EXP
          </div>
        </div>
      </div>

      {/* Описание квеста */}
      <p className="text-cyan-200 mb-4 text-sm leading-relaxed">
        {quest.description}
      </p>

      {/* Мета-информация */}
      <div className="flex justify-between items-center text-xs text-cyan-300 mb-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <span>📚</span>
            <span>{quest.category}</span>
          </div>
          <div className="flex items-center gap-1">
            <span>⏰</span>
            <span className={isExpired ? 'text-red-400' : ''}>
              {isExpired ? 'ПРОСРОЧЕН' : `до ${formatDate(quest.deadline)}`}
            </span>
          </div>
        </div>
      </div>

      {/* Кнопка выполнения */}
      {quest.status === 'PENDING' && !isExpired && (
        <div className="flex justify-end">
          <button
            onClick={handleComplete}
            disabled={isCompleting}
            className={`
              px-6 py-2 rounded-lg font-orbitron text-sm font-bold
              transition-all duration-300
              ${isCompleting 
                ? 'bg-green-500 text-black scale-105' 
                : 'bg-cyber-cyan text-cyan-300 border border-cyan-300 hover:text-black hover:bg-cyan-300 cursor-pointer'
              }
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
          >
            {isCompleting ? 'ВЫПОЛНЯЕТСЯ...' : 'ВЫПОЛНИТЬ'}
          </button>
        </div>
      )}

      {/* Сообщение о статусе */}
      {quest.status === 'COMPLETED' && (
        <div className="text-center py-2">
          <span className="text-green-400 font-bold text-sm">
            ✅ КВЕСТ ВЫПОЛНЕН
          </span>
        </div>
      )}

      {isExpired && (
        <div className="text-center py-2">
          <span className="text-red-400 font-bold text-sm">
            ⚠️ КВЕСТ ПРОСРОЧЕН
          </span>
        </div>
      )}
    </div>
  );
}

// Используем memo для предотвращения лишних ререндеров
export default memo(QuestItem);
