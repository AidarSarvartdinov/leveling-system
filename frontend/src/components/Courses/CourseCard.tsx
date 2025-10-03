import { useState } from 'react';
import Link from 'next/link';
import type { Course } from '../../types';
import { CourseService } from '../../services/courseService';

interface CourseCardProps {
  course: Course;
  onUpdate: () => void;
}

export default function CourseCard({ course, onUpdate }: CourseCardProps) {
  const [isActivating, setIsActivating] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleActivate = async () => {
    setIsActivating(true);
    try {
      await CourseService.toggleCourseActive(course.id);
      onUpdate();
    } catch (error) {
      console.error('Error toggling course:', error);
      alert('Ошибка при изменении статуса курса');
    } finally {
      setIsActivating(false);
    }
  };

  const handleGenerateQuests = async () => {
    setIsGenerating(true);
    try {
      await CourseService.generateQuestsForCourse(course.id);
      alert('Запрос на генерацию квестов отправлен! Квесты появятся в системе после обработки ИИ.');
    } catch (error) {
      console.error('Error generating quests:', error);
      alert('Ошибка при генерации квестов');
    } finally {
      setIsGenerating(false);
    }
  };

  const getCategoryIcon = (category: Course['category']) => {
    const icons = {
      STUDY: '🎓',
      FITNESS: '💪',
      CREATIVE: '🎨',
      PERSONAL: '🌟',
      OTHER: '🔧'
    };
    return icons[category];
  };

  const getDifficultyColor = (difficulty: Course['difficulty']) => {
    const colors = {
      EASY: 'text-green-400',
      MEDIUM: 'text-yellow-400',
      HARD: 'text-red-400'
    };
    return colors[difficulty];
  };

  const getProgressColor = (progress: number) => {
    if (progress < 30) return 'bg-red-500';
    if (progress < 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="cyber-bg cyber-border rounded-lg p-6 hover:shadow-lg hover:shadow-cyan-500/10 transition-all">
      {/* Заголовок и категория */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{getCategoryIcon(course.category)}</span>
          <h3 className="text-xl font-orbitron text-cyber-cyan">{course.title}</h3>
        </div>
        <span className={`text-sm font-bold ${getDifficultyColor(course.difficulty)}`}>
          {course.difficulty}
        </span>
      </div>

      {/* Описание */}
      <p className="text-cyan-200 text-sm mb-4 line-clamp-2">
        {course.description}
      </p>

      {/* Прогресс */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-cyan-300 mb-2">
          <span>Прогресс</span>
          <span>{course.progress}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className={`h-2 rounded-full ${getProgressColor(course.progress)} transition-all duration-500`}
            style={{ width: `${course.progress}%` }}
          ></div>
        </div>
      </div>

      {/* Цель и уровни */}
      <div className="text-sm text-cyan-300 mb-4 space-y-1">
        <div className="flex justify-between">
          <span>Цель:</span>
          <span className="text-cyber-cyan font-bold text-right max-w-[60%] truncate" title={course.goal}>
            {course.goal}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Уровень:</span>
          <span>{course.currentLevel} → {course.targetLevel}</span>
        </div>
        <div className="flex justify-between">
          <span>Длительность:</span>
          <span>{course.duration} дней</span>
        </div>
      </div>

      {/* Теги */}
      <div className="flex flex-wrap gap-1 mb-4">
        {course.tags.slice(0, 3).map(tag => (
          <span 
            key={tag}
            className="bg-cyan-900 text-cyber-cyan px-2 py-1 rounded text-xs"
          >
            {tag}
          </span>
        ))}
        {course.tags.length > 3 && (
          <span className="bg-cyan-800 text-cyber-cyan px-2 py-1 rounded text-xs">
            +{course.tags.length - 3}
          </span>
        )}
      </div>

      {/* Кнопки действий */}
      <div className="flex gap-2">
        <button
          onClick={handleActivate}
          disabled={isActivating}
          className={`flex-1 py-2 rounded-lg font-orbitron text-sm transition-colors ${
            course.isActive 
              ? 'bg-red-600 hover:bg-red-500 text-white' 
              : 'bg-green-600 hover:bg-green-500 text-white'
          } ${isActivating ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isActivating ? '...' : course.isActive ? 'ОСТАНОВИТЬ' : 'АКТИВИРОВАТЬ'}
        </button>

        <button
          onClick={handleGenerateQuests}
          disabled={isGenerating}
          className={`flex-1 bg-cyber-cyan text-black py-2 rounded-lg font-orbitron text-sm font-bold hover:bg-cyan-300 transition-colors ${
            isGenerating ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isGenerating ? 'ГЕНЕРАЦИЯ...' : 'КВЕСТЫ'}
        </button>

        <Link 
          href={`/courses/${course.id}`}
          className="flex-1 bg-purple-600 text-white py-2 rounded-lg font-orbitron text-sm text-center hover:bg-purple-500 transition-colors"
        >
          РЕДАКТ.
        </Link>
      </div>
    </div>
  );
}
