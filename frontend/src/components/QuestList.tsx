import { memo } from 'react';
import type { Quest } from '../types';
import QuestItem from './QuestItem/QuestItem';

interface QuestListProps {
  quests: Quest[];
  onCompleteQuest: (questId: number) => void;
}

function QuestList({ quests, onCompleteQuest }: QuestListProps) {
  const difficultyColors = {
    EASY: 'text-green-400',
    MEDIUM: 'text-yellow-400',
    HARD: 'text-orange-400',
    BOSS: 'text-red-400'
  };

  if (quests.length === 0) {
    return (
      <div className="text-center py-8 flex flex-col items-center justify-center h-32">
        <div className="text-cyber-cyan text-lg mb-2">Квестов на сегодня нет</div>
        <div className="text-gray-400">Новые квесты появятся завтра</div>
      </div>
    );
  }

  return (
    <div className="space-y-3 pb-2">
      {quests.map(quest => (
        <QuestItem 
          key={quest.id}
          quest={quest}
          onComplete={onCompleteQuest}
          difficultyColor={difficultyColors[quest.difficulty]}
        />
      ))}
    </div>
  );
}

// Используем memo для предотвращения лишних ререндеров
export default memo(QuestList);
