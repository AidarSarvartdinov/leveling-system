'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import CourseForm from '../../../components/Courses/CourseForm';
import Header from '../../../components/Layout/Header';
import { CourseService } from '../../../services/courseService';
import type { CreateCourseRequest } from '../../../types';

export default function CreateCoursePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (courseData: CreateCourseRequest) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Отправка данных на Spring Boot сервер
      await CourseService.createCourse(courseData);
      
      // После успешного создания перенаправляем на страницу курсов
      router.push('/courses');
      router.refresh();
    } catch (err) {
      console.error('Error creating course:', err);
      setError('Ошибка при создании курса. Проверьте подключение к серверу.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-black text-cyber-cyan">
      <Header player={null} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-8">
            <button 
              onClick={handleCancel}
              className="mr-4 text-cyber-cyan hover:text-cyan-300 transition-colors"
            >
              ← Назад
            </button>
            <h1 className="text-4xl font-orbitron text-cyber-cyan text-glow">
              СОЗДАНИЕ НОВОГО КУРСА
            </h1>
          </div>

          {/* Сообщение об ошибке */}
          {error && (
            <div className="cyber-bg cyber-border border-red-500 rounded-lg p-4 mb-6">
              <div className="text-red-400 font-orbitron">
                ⚠️ {error}
              </div>
            </div>
          )}

          <div className="cyber-bg cyber-border rounded-lg p-6">
            <CourseForm 
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              onCancel={handleCancel}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
