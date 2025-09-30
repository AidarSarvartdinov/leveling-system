import type { Quest } from '../types';
import QuestItem from './QuestItem/QuestItem';

interface QuestListProps {
  quests: Quest[];
  onCompleteQuest: (questId: number) => void;
}

export default function QuestList({ quests, onCompleteQuest }: QuestListProps) {
  const difficultyColors = {
    EASY: 'text-green-400',
    MEDIUM: 'text-yellow-400', 
    HARD: 'text-orange-400',
    BOSS: 'text-red-400'
  };

  if (quests.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-cyber-cyan text-lg mb-2">Квестов на сегодня нет</div>
        <div className="text-gray-400">Новые квесты появятся завтра</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
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
