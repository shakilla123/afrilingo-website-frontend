
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
    const response = await httpClient.get('/courses');
    return response.json();
  },

  async getById(id: number): Promise<Course> {
    const response = await httpClient.get(`/courses/${id}`);
    return response.json();
  },

  async getByLanguageId(languageId: number): Promise<Course[]> {
    const response = await httpClient.get(`/courses/language/${languageId}`);
    return response.json();
  },

  async getActiveByLanguageId(languageId: number): Promise<Course[]> {
    const response = await httpClient.get(`/courses/language/${languageId}/active`);
    return response.json();
  },

  async create(data: CreateCourseRequest): Promise<Course> {
    const response = await httpClient.post('/courses', data);
    return response.json();
  },

  async update(id: number, data: Partial<CreateCourseRequest>): Promise<Course> {
    const response = await httpClient.put(`/courses/${id}`, data);
    return response.json();
  },

  async setActivation(id: number, isActive: boolean): Promise<Course> {
    const response = await httpClient.patch(`/courses/${id}/activation`, { isActive });
    return response.json();
  },

  async delete(id: number): Promise<void> {
    await httpClient.delete(`/courses/${id}`);
  },
};
