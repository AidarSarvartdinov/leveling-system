// Конфигурация для Spring Boot бэкенда
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api';

export const API_ENDPOINTS = {
  courses: `${API_BASE_URL}/courses`,
  courseById: (id: number) => `${API_BASE_URL}/courses/${id}`,
  generateQuests: (id: number) => `${API_BASE_URL}/courses/${id}/generate-quests`,
  toggleCourse: (id: number) => `${API_BASE_URL}/courses/${id}/toggle`,
};

// Общий клиент для API запросов
export const apiClient = {
  async get(url: string) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
  },

  async post(url: string, data: any) {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
  },

  async put(url: string, data?: any) {
    const response = await fetch(url, {
      method: 'PUT',
      headers: data ? { 'Content-Type': 'application/json' } : undefined,
      body: data ? JSON.stringify(data) : undefined,
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
  },

  async delete(url: string) {
    const response = await fetch(url, { method: 'DELETE' });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
  },
};
