'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Course } from '../../types';
import CourseCard from '../../components/Courses/CourseCard';
import Header from '../../components/Layout/Header';
import { CourseService } from '../../services/courseService';

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'ALL' | Course['category']>('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      setError(null);
      const coursesData = await CourseService.getAllCourses();
      setCourses(coursesData);
    } catch (err) {
      console.error('Error loading courses:', err);
      setError('Не удалось загрузить курсы. Проверьте подключение к серверу.');
      
      // Моковые данные для демонстрации
      const mockCourses: Course[] = [
        {
          id: 1,
          title: 'Изучение React',
          description: 'Полный курс по современному React с hooks и TypeScript',
          category: 'STUDY',
          goal: 'Создать полноценное React приложение',
          currentLevel: 'BEGINNER',
          targetLevel: 'INTERMEDIATE',
          duration: 30,
          difficulty: 'MEDIUM',
          progress: 45,
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          tags: ['react', 'javascript', 'frontend'],
          estimatedHours: 50
        },
        {
          id: 2,
          title: 'Тренировка воркаут',
          description: 'Программа тренировок для развития силы и выносливости',
          category: 'FITNESS',
          goal: 'Научиться подтягиваться 15 раз',
          currentLevel: 'BEGINNER',
          targetLevel: 'ADVANCED',
          duration: 60,
          difficulty: 'HARD',
          progress: 20,
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          tags: ['workout', 'strength', 'calisthenics'],
          estimatedHours: 80
        }
      ];
      setCourses(mockCourses);
    } finally {
      setLoading(false);
    }
  };

  const filteredCourses = courses.filter(course => {
    const matchesFilter = filter === 'ALL' || course.category === filter;
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const categories: Array<{ value: 'ALL' | Course['category'], label: string }> = [
    { value: 'ALL', label: 'Все' },
    { value: 'STUDY', label: 'Учеба' },
    { value: 'FITNESS', label: 'Фитнес' },
    { value: 'CREATIVE', label: 'Творчество' },
    { value: 'PERSONAL', label: 'Личное' },
    { value: 'OTHER', label: 'Другое' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-cyber-cyan text-xl font-orbitron animate-pulse">
          LOADING COURSES...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-cyber-cyan">
      <Header player={null} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-orbitron text-cyber-cyan mb-2 text-glow">
              МОИ КУРСЫ И ТРЕНИРОВКИ
            </h1>
            <p className="text-cyan-200">Управляйте своими учебными и тренировочными программами</p>
          </div>
          
          <Link 
            href="/courses/create"
            className="bg-cyber-cyan text-cyan-300 px-6 py-3 rounded-lg font-orbitron font-bold hover:bg-cyan-300 hover:text-black transition-colors"
          >
            + СОЗДАТЬ КУРС
          </Link>
        </div>

        {/* Сообщение об ошибке */}
        {error && (
          <div className="cyber-bg cyber-border border-yellow-500 rounded-lg p-4 mb-6">
            <div className="text-yellow-400 font-orbitron">
              ⚠️ {error}
            </div>
          </div>
        )}

        {/* Фильтры и поиск */}
        <div className="cyber-bg cyber-border rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-cyan-300 mb-2 font-orbitron">Поиск</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Поиск по названию или описанию..."
                className="w-full bg-gray-800 border border-cyan-500 rounded-lg px-4 py-2 text-cyber-cyan placeholder-cyan-700 focus:outline-none focus:border-cyan-300"
              />
            </div>
            
            <div>
              <label className="block text-cyan-300 mb-2 font-orbitron">Категория</label>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as any)}
                className="w-full bg-gray-800 border border-cyan-500 rounded-lg px-4 py-2 text-cyber-cyan focus:outline-none focus:border-cyan-300"
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Список курсов */}
        {filteredCourses.length === 0 ? (
          <div className="cyber-bg cyber-border rounded-lg p-12 text-center">
            <div className="text-3xl mb-4">📚</div>
            <h3 className="text-2xl font-orbitron text-cyber-cyan mb-4">
              Курсы не найдены
            </h3>
            <p className="text-cyan-200 mb-6">
              {searchTerm || filter !== 'ALL' 
                ? 'Попробуйте изменить параметры поиска' 
                : 'Создайте свой первый курс или тренировку'
              }
            </p>
            {!searchTerm && filter === 'ALL' && (
              <Link 
                href="/courses/create"
                className="bg-cyber-cyan text-black px-6 py-3 rounded-lg font-orbitron font-bold hover:bg-cyan-300 transition-colors"
              >
                СОЗДАТЬ ПЕРВЫЙ КУРС
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map(course => (
              <CourseCard 
                key={course.id} 
                course={course}
                onUpdate={loadCourses}
              />
            ))}
          </div>
        )}

        {/* Статистика */}
        <div className="mt-8 cyber-bg cyber-border rounded-lg p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-orbitron text-cyber-cyan">{courses.length}</div>
              <div className="text-cyan-300 text-sm">Всего курсов</div>
            </div>
            <div>
              <div className="text-2xl font-orbitron text-green-400">
                {courses.filter(c => c.isActive).length}
              </div>
              <div className="text-cyan-300 text-sm">Активных</div>
            </div>
            <div>
              <div className="text-2xl font-orbitron text-yellow-400">
                {courses.length > 0 ? Math.round(courses.reduce((acc, c) => acc + c.progress, 0) / courses.length) : 0}%
              </div>
              <div className="text-cyan-300 text-sm">Средний прогресс</div>
            </div>
            <div>
              <div className="text-2xl font-orbitron text-purple-400">
                {courses.reduce((acc, c) => acc + c.estimatedHours, 0)}
              </div>
              <div className="text-cyan-300 text-sm">Часов обучения</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
