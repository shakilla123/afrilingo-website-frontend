
import { httpClient } from '@/utils/httpClient';
import { Course } from './courseService';

export interface Lesson {
  id: number;
  title: string;
  description: string;
  content: string;
  lessonType: string;
  orderIndex: number;
  duration: string;
  course: Course;
}

export interface CreateLessonRequest {
  title: string;
  description: string;
  content: string;
  lessonType: string;
  orderIndex: number;
  duration: string;
  course: {
    id: number;
  };
}

export const lessonService = {
  async getAll(): Promise<Lesson[]> {
    const response = await httpClient.get('/lessons');
    return response.json();
  },

  async getById(id: number): Promise<Lesson> {
    const response = await httpClient.get(`/lessons/${id}`);
    return response.json();
  },

  async getByCourseId(courseId: number): Promise<Lesson[]> {
    const response = await httpClient.get(`/lessons/course/${courseId}`);
    return response.json();
  },

  async getOrderedByCourseId(courseId: number): Promise<Lesson[]> {
    const response = await httpClient.get(`/lessons/course/${courseId}/ordered`);
    return response.json();
  },

  async getByType(lessonType: string): Promise<Lesson[]> {
    const response = await httpClient.get(`/lessons/type/${lessonType}`);
    return response.json();
  },

  async create(data: CreateLessonRequest): Promise<Lesson> {
    const response = await httpClient.post('/lessons', data);
    return response.json();
  },

  async update(id: number, data: Partial<CreateLessonRequest>): Promise<Lesson> {
    const response = await httpClient.put(`/lessons/${id}`, data);
    return response.json();
  },

  async delete(id: number): Promise<void> {
    await httpClient.delete(`/lessons/${id}`);
  },

  async reorderLessons(courseId: number, lessonIds: number[]): Promise<void> {
    await httpClient.post(`/lessons/course/${courseId}/reorder`, { lessonIds });
  },
};
