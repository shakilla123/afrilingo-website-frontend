
import { httpClient } from '@/utils/httpClient';
import { Language } from './languageService';

export interface Course {
  id: number;
  title: string;
  description: string;
  level: string;
  image: string;
  isActive: boolean;
  language: Language;
}

export interface CreateCourseRequest {
  title: string;
  description: string;
  level: string;
  image: string;
  isActive: boolean;
  language: {
    id: number;
  };
}

export const courseService = {
  async getAll(): Promise<Course[]> {
    return await httpClient.get('/courses');
  },

  async getById(id: number): Promise<Course> {
    return await httpClient.get(`/courses/${id}`);
  },

  async getByLanguageId(languageId: number): Promise<Course[]> {
    return await httpClient.get(`/courses/language/${languageId}`);
  },

  async getActiveByLanguageId(languageId: number): Promise<Course[]> {
    return await httpClient.get(`/courses/language/${languageId}/active`);
  },

  async create(data: CreateCourseRequest): Promise<Course> {
    return await httpClient.post('/courses', data);
  },

  async update(id: number, data: Partial<CreateCourseRequest>): Promise<Course> {
    return await httpClient.put(`/courses/${id}`, data);
  },

  async setActivation(id: number, isActive: boolean): Promise<Course> {
    return await httpClient.patch(`/courses/${id}/activation`, { isActive });
  },

  async delete(id: number): Promise<void> {
    await httpClient.delete(`/courses/${id}`);
  },
};
