import { useState } from 'react';
import type { CreateCourseRequest, Course } from '../../types';

interface CourseFormProps {
  onSubmit: (data: CreateCourseRequest) => void;
  isSubmitting: boolean;
  onCancel: () => void;
  initialData?: Partial<Course>;
}

export default function CourseForm({ onSubmit, isSubmitting, onCancel, initialData }: CourseFormProps) {
  const [formData, setFormData] = useState<CreateCourseRequest>({
    title: initialData?.title || '',
    description: initialData?.description || '',
    category: initialData?.category || 'STUDY',
    goal: initialData?.goal || '',
    currentLevel: initialData?.currentLevel || 'BEGINNER',
    targetLevel: initialData?.targetLevel || 'INTERMEDIATE',
    duration: initialData?.duration || 30,
    difficulty: initialData?.difficulty || 'MEDIUM',
    tags: initialData?.tags || [],
    estimatedHours: initialData?.estimatedHours || 10
  });

  const [tagInput, setTagInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleTagInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const categories: Array<{ value: Course['category'], label: string }> = [
    { value: 'STUDY', label: '🎓 Учеба' },
    { value: 'FITNESS', label: '💪 Фитнес' },
    { value: 'CREATIVE', label: '🎨 Творчество' },
    { value: 'PERSONAL', label: '🌟 Личное развитие' },
    { value: 'OTHER', label: '🔧 Другое' }
  ];

  const levels: Array<{ value: Course['currentLevel'], label: string }> = [
    { value: 'BEGINNER', label: '👶 Начинающий' },
    { value: 'INTERMEDIATE', label: '🚶 Средний' },
    { value: 'ADVANCED', label: '🏃 Продвинутый' },
    { value: 'EXPERT', label: '🏆 Эксперт' }
  ];

  const difficulties: Array<{ value: Course['difficulty'], label: string }> = [
    { value: 'EASY', label: '🟢 Легкий' },
    { value: 'MEDIUM', label: '🟡 Средний' },
    { value: 'HARD', label: '🔴 Сложный' }
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Основная информация */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-cyan-300 mb-2 font-orbitron">Название курса *</label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            placeholder="Например: Изучение React или Тренировка воркаут"
            className="w-full bg-gray-800 border border-cyan-500 rounded-lg px-4 py-3 text-cyber-cyan placeholder-cyan-700 focus:outline-none focus:border-cyan-300"
          />
        </div>

        <div>
          <label className="block text-cyan-300 mb-2 font-orbitron">Категория *</label>
          <select
            required
            value={formData.category}
            onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as Course['category'] }))}
            className="w-full bg-gray-800 border border-cyan-500 rounded-lg px-4 py-3 text-cyber-cyan focus:outline-none focus:border-cyan-300"
          >
            {categories.map(category => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Описание */}
      <div>
        <label className="block text-cyan-300 mb-2 font-orbitron">Описание *</label>
        <textarea
          required
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          placeholder="Опишите что вы будете изучать или тренировать..."
          rows={4}
          className="w-full bg-gray-800 border border-cyan-500 rounded-lg px-4 py-3 text-cyber-cyan placeholder-cyan-700 focus:outline-none focus:border-cyan-300 resize-vertical"
        />
      </div>

      {/* Цель */}
      <div>
        <label className="block text-cyan-300 mb-2 font-orbitron">Конечная цель *</label>
        <input
          type="text"
          required
          value={formData.goal}
          onChange={(e) => setFormData(prev => ({ ...prev, goal: e.target.value }))}
          placeholder="Например: Создать приложение или Подтягиваться 15 раз"
          className="w-full bg-gray-800 border border-cyan-500 rounded-lg px-4 py-3 text-cyber-cyan placeholder-cyan-700 focus:outline-none focus:border-cyan-300"
        />
      </div>

      {/* Уровни */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-cyan-300 mb-2 font-orbitron">Текущий уровень *</label>
          <select
            required
            value={formData.currentLevel}
            onChange={(e) => setFormData(prev => ({ ...prev, currentLevel: e.target.value as Course['currentLevel'] }))}
            className="w-full bg-gray-800 border border-cyan-500 rounded-lg px-4 py-3 text-cyber-cyan focus:outline-none focus:border-cyan-300"
          >
            {levels.map(level => (
              <option key={level.value} value={level.value}>
                {level.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-cyan-300 mb-2 font-orbitron">Целевой уровень *</label>
          <select
            required
            value={formData.targetLevel}
            onChange={(e) => setFormData(prev => ({ ...prev, targetLevel: e.target.value as Course['targetLevel'] }))}
            className="w-full bg-gray-800 border border-cyan-500 rounded-lg px-4 py-3 text-cyber-cyan focus:outline-none focus:border-cyan-300"
          >
            {levels.map(level => (
              <option key={level.value} value={level.value}>
                {level.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Параметры */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-cyan-300 mb-2 font-orbitron">Длительность (дней) *</label>
          <input
            type="number"
            required
            min="1"
            max="365"
            value={formData.duration}
            onChange={(e) => setFormData(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
            className="w-full bg-gray-800 border border-cyan-500 rounded-lg px-4 py-3 text-cyber-cyan focus:outline-none focus:border-cyan-300"
          />
        </div>

        <div>
          <label className="block text-cyan-300 mb-2 font-orbitron">Сложность *</label>
          <select
            required
            value={formData.difficulty}
            onChange={(e) => setFormData(prev => ({ ...prev, difficulty: e.target.value as Course['difficulty'] }))}
            className="w-full bg-gray-800 border border-cyan-500 rounded-lg px-4 py-3 text-cyber-cyan focus:outline-none focus:border-cyan-300"
          >
            {difficulties.map(diff => (
              <option key={diff.value} value={diff.value}>
                {diff.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-cyan-300 mb-2 font-orbitron">Часов обучения *</label>
          <input
            type="number"
            required
            min="1"
            max="1000"
            value={formData.estimatedHours}
            onChange={(e) => setFormData(prev => ({ ...prev, estimatedHours: parseInt(e.target.value) }))}
            className="w-full bg-gray-800 border border-cyan-500 rounded-lg px-4 py-3 text-cyber-cyan focus:outline-none focus:border-cyan-300"
          />
        </div>
      </div>

      {/* Теги */}
      <div>
        <label className="block text-cyan-300 mb-2 font-orbitron">Теги</label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleTagInputKeyDown}
            placeholder="Добавьте тег и нажмите Enter"
            className="flex-1 bg-gray-800 border border-cyan-500 rounded-lg px-4 py-2 text-cyber-cyan placeholder-cyan-700 focus:outline-none focus:border-cyan-300"
          />
          <button
            type="button"
            onClick={handleAddTag}
            className="bg-cyan-700 text-cyber-cyan px-4 py-2 rounded-lg hover:bg-cyan-600 transition-colors"
          >
            Добавить
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.tags.map(tag => (
            <span
              key={tag}
              className="bg-cyan-900 text-cyber-cyan px-3 py-1 rounded-full text-sm flex items-center gap-1"
            >
              {tag}
              <button
                type="button"
                onClick={() => handleRemoveTag(tag)}
                className="hover:text-red-400"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Кнопки */}
      <div className="flex gap-4 pt-6 border-t border-cyan-800">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-gray-700 text-cyber-cyan py-3 rounded-lg font-orbitron hover:bg-gray-600 transition-colors"
        >
          ОТМЕНА
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 bg-cyber-cyan text-black py-3 rounded-lg font-orbitron font-bold hover:bg-cyan-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? 'СОЗДАНИЕ...' : 'СОЗДАТЬ КУРС'}
        </button>
      </div>
    </form>
  );
}
