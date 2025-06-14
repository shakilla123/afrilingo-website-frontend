
import { httpClient } from '@/utils/httpClient';
import { Course } from './courseService';

export interface LessonContent {
  id: number;
  contentType: 'TEXT' | 'AUDIO' | 'IMAGE_OBJECT';
  contentData: string;
  mediaUrl: string;
}

export interface Lesson {
  id: number;
  title: string;
  description: string;
  type: 'AUDIO' | 'READING' | 'IMAGE_OBJECT';
  orderIndex: number;
  course: Course;
  contents: LessonContent[];
  required: boolean;
}

export interface CreateLessonRequest {
  title: string;
  description: string;
  type: 'AUDIO' | 'READING' | 'IMAGE_OBJECT';
  orderIndex: number;
  course: {
    id: number;
  };
  contents: {
    contentType: 'TEXT' | 'AUDIO' | 'IMAGE_OBJECT';
    contentData: string;
    mediaUrl?: string;
  }[];
  required: boolean;
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

  async getByType(lessonType: 'AUDIO' | 'READING' | 'IMAGE_OBJECT'): Promise<Lesson[]> {
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

  async reorderLessons(courseId: number, lessonIds: number[]): Promise<Lesson[]> {
    return await httpClient.post(`/lessons/course/${courseId}/reorder`, lessonIds);
  },
};
