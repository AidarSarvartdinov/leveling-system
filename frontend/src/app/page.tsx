'use client';

import { useState, useEffect, useCallback } from 'react';
import Header from '../components/Layout/Header';
import PlayerStats from '../components/PlayerStats';
import QuestList from '../components/QuestList';
import type { Player, Quest } from '../types';

export default function HomePage() {
  const [player, setPlayer] = useState<Player | null>(null);
  const [todayQuests, setTodayQuests] = useState<Quest[]>([]);
  const [loading, setLoading] = useState(true);

  const loadInitialData = useCallback(async () => {
    try {
      const mockPlayer: Player = {
        id: 1,
        name: "Студент",
        level: 5,
        experience: 245,
        experienceToNextLevel: 500,
        intelligence: 12,
        discipline: 8,
        stamina: 10,
        availablePoints: 2,
        totalQuestsCompleted: 23
      };

      const mockQuests: Quest[] = Array.from({ length: 15 }, (_, i) => ({
        id: i + 1,
        title: `Учебный квест ${i + 1}`,
        description: `Описание учебного квеста номер ${i + 1}. Выполните задание для получения опыта.`,
        experienceReward: 20 + i * 5,
        difficulty: ["EASY", "MEDIUM", "HARD", "BOSS"][i % 4] as Quest['difficulty'],
        status: "PENDING" as const,
        assignedDate: new Date().toISOString(),
        deadline: new Date(Date.now() + 86400000 * (i + 1)).toISOString(),
        category: ["Программирование", "Математика", "Английский", "Фитнес"][i % 4]
      }));

      setPlayer(mockPlayer);
      setTodayQuests(mockQuests);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  const handleCompleteQuest = useCallback((questId: number) => {
    setTodayQuests(prevQuests => 
      prevQuests.map(quest => 
        quest.id === questId 
          ? { ...quest, status: 'COMPLETED' as const }
          : quest
      )
    );

    setPlayer(prevPlayer => {
      if (!prevPlayer) return prevPlayer;
      
      const quest = todayQuests.find(q => q.id === questId);
      if (!quest) return prevPlayer;

      const newExp = prevPlayer.experience + quest.experienceReward;
      let newPlayer = { ...prevPlayer, experience: newExp };
      
      if (newExp >= prevPlayer.experienceToNextLevel) {
        newPlayer = {
          ...newPlayer,
          level: prevPlayer.level + 1,
          experience: newExp - prevPlayer.experienceToNextLevel,
          experienceToNextLevel: Math.floor(prevPlayer.experienceToNextLevel * 1.5),
          availablePoints: prevPlayer.availablePoints + 3
        };
      }
      
      return newPlayer;
    });
  }, [todayQuests]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-cyber-cyan text-xl font-orbitron animate-pulse">
          SYSTEM INITIALIZING...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-cyber-cyan flex flex-col">
      <Header player={player} />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Левая колонка - статистика */}
          <div className="lg:col-span-1">
            {player && <PlayerStats player={player} />}
          </div>
          
          {/* Правая колонка - квесты с ФИКСИРОВАННОЙ высотой */}
          <div className="lg:col-span-2">
          <div className="cyber-bg cyber-border rounded-lg p-6 shadow-lg shadow-cyan-500/10 h-[80vh] max-h-[800px] min-h-[400px] flex flex-col">
              <h2 className="text-2xl font-orbitron text-cyber-cyan mb-6 text-center text-glow flex-shrink-0">
                ЕЖЕДНЕВНЫЕ КВЕСТЫ
              </h2>
              
              {/* Прокручиваемая область для квестов */}
              <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                <QuestList 
                  quests={todayQuests} 
                  onCompleteQuest={handleCompleteQuest}
                />
              </div>
              
              {/* Статистика внизу блока */}
              <div className="flex-shrink-0 pt-4 mt-4 border-t border-cyan-800">
                <div className="flex justify-between text-sm text-cyan-300">
                  <span>Всего квестов: {todayQuests.length}</span>
                  <span>
                    Выполнено: {todayQuests.filter(q => q.status === 'COMPLETED').length}
                  </span>
                  <span>
                    Ожидают: {todayQuests.filter(q => q.status === 'PENDING').length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
