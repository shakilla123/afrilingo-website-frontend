
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
    return await httpClient.get('/lessons');
  },

  async getById(id: number): Promise<Lesson> {
    return await httpClient.get(`/lessons/${id}`);
  },

  async getByCourseId(courseId: number): Promise<Lesson[]> {
    return await httpClient.get(`/lessons/course/${courseId}`);
  },

  async getOrderedByCourseId(courseId: number): Promise<Lesson[]> {
    return await httpClient.get(`/lessons/course/${courseId}/ordered`);
  },

  async getByType(lessonType: string): Promise<Lesson[]> {
    return await httpClient.get(`/lessons/type/${lessonType}`);
  },

  async create(data: CreateLessonRequest): Promise<Lesson> {
    return await httpClient.post('/lessons', data);
  },

  async update(id: number, data: Partial<CreateLessonRequest>): Promise<Lesson> {
    return await httpClient.put(`/lessons/${id}`, data);
  },

  async delete(id: number): Promise<void> {
    await httpClient.delete(`/lessons/${id}`);
  },

  async reorderLessons(courseId: number, lessonIds: number[]): Promise<void> {
    await httpClient.post(`/lessons/course/${courseId}/reorder`, { lessonIds });
  },
};
