export interface Player {
    id: number;
    name: string;
    level: number;
    experience: number;
    experienceToNextLevel: number;
    intelligence: number;
    discipline: number;
    stamina: number;
    availablePoints: number;
    totalQuestsCompleted: number;
  }
  
  export interface Quest {
    id: number;
    title: string;
    description: string;
    experienceReward: number;
    difficulty: 'EASY' | 'MEDIUM' | 'HARD' | 'BOSS';
    status: 'PENDING' | 'COMPLETED' | 'FAILED';
    assignedDate: string;
    deadline: string;
    category: string;
  }
