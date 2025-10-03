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
  courseId?: number;
}

export interface Course {
  id: number;
  title: string;
  description: string;
  category: 'STUDY' | 'FITNESS' | 'CREATIVE' | 'PERSONAL' | 'OTHER';
  goal: string;
  currentLevel: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT';
  targetLevel: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT';
  duration: number;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  progress: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  estimatedHours: number;
}

export interface CreateCourseRequest {
  title: string;
  description: string;
  category: Course['category'];
  goal: string;
  currentLevel: Course['currentLevel'];
  targetLevel: Course['targetLevel'];
  duration: number;
  difficulty: Course['difficulty'];
  tags: string[];
  estimatedHours: number;
}
