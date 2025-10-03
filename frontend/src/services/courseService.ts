import { Course, CreateCourseRequest } from '../types';
import { API_ENDPOINTS, apiClient } from '../config/api';

export class CourseService {
  static async getAllCourses(): Promise<Course[]> {
    return apiClient.get(API_ENDPOINTS.courses);
  }

  static async getCourseById(id: number): Promise<Course> {
    return apiClient.get(API_ENDPOINTS.courseById(id));
  }

  static async createCourse(courseData: CreateCourseRequest): Promise<Course> {
    return apiClient.post(API_ENDPOINTS.courses, courseData);
  }

  static async updateCourse(id: number, courseData: Partial<Course>): Promise<Course> {
    return apiClient.put(API_ENDPOINTS.courseById(id), courseData);
  }

  static async deleteCourse(id: number): Promise<void> {
    return apiClient.delete(API_ENDPOINTS.courseById(id));
  }

  static async toggleCourseActive(id: number): Promise<Course> {
    return apiClient.put(API_ENDPOINTS.toggleCourse(id));
  }

  static async generateQuestsForCourse(id: number): Promise<any> {
    return apiClient.post(API_ENDPOINTS.generateQuests(id), {});
  }
}
