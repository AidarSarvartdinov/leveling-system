'use client';

import { useState, useEffect } from 'react';
import Header from '../components/Layout/Header';
import PlayerStats from '../components/PlayerStats';
import QuestList from '../components/QuestList';
import type { Player, Quest } from '../types';

export default function HomePage() {
  const [player, setPlayer] = useState<Player | null>(null);
  const [todayQuests, setTodayQuests] = useState<Quest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
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

    const mockQuests: Quest[] = [
      {
        id: 1,
        title: "Изучить React Hooks",
        description: "Пройди 3 урока по React Hooks и реши практические задачи",
        experienceReward: 50,
        difficulty: "MEDIUM",
        status: "PENDING",
        assignedDate: new Date().toISOString(),
        deadline: new Date(Date.now() + 86400000).toISOString(),
        category: "Программирование"
      }
    ];

    setPlayer(mockPlayer);
    setTodayQuests(mockQuests);
    setLoading(false);
  };

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
    <div className="min-h-screen bg-black text-cyber-cyan">
      <Header player={player} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            {player && <PlayerStats player={player} />}
          </div>
          
          <div className="lg:col-span-2">
            <div className="cyber-bg cyber-border rounded-lg p-6 shadow-lg shadow-cyan-500/10">
              <h2 className="text-2xl font-orbitron text-cyber-cyan mb-6 text-center text-glow">
                ЕЖЕДНЕВНЫЕ КВЕСТЫ
              </h2>
              <QuestList 
                quests={todayQuests} 
                onCompleteQuest={(id) => console.log('Complete:', id)}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
