
import { httpClient } from '@/utils/httpClient';
import { Lesson } from './lessonService';

export interface Quiz {
  id: number;
  title: string;
  description: string;
  timeLimit: number;
  passingScore: number;
  lesson: Lesson;
}

export interface CreateQuizRequest {
  title: string;
  description: string;
  timeLimit: number;
  passingScore: number;
  lesson: {
    id: number;
  };
}

export interface QuizStatistics {
  totalAttempts: number;
  averageScore: number;
  passRate: number;
}

export const quizService = {
  async getAll(): Promise<Quiz[]> {
    return await httpClient.get('/quizzes');
  },

  async getById(id: number): Promise<Quiz> {
    return await httpClient.get(`/quizzes/${id}`);
  },

  async getByLessonId(lessonId: number): Promise<Quiz[]> {
    return await httpClient.get(`/quizzes/lesson/${lessonId}`);
  },

  async create(data: CreateQuizRequest): Promise<Quiz> {
    return await httpClient.post('/quizzes', data);
  },

  async update(id: number, data: Partial<CreateQuizRequest>): Promise<Quiz> {
    return await httpClient.put(`/quizzes/${id}`, data);
  },

  async delete(id: number): Promise<void> {
    await httpClient.delete(`/quizzes/${id}`);
  },

  async getQuestions(id: number): Promise<any[]> {
    return await httpClient.get(`/quizzes/${id}/questions`);
  },

  async addQuestion(id: number, questionData: any): Promise<any> {
    return await httpClient.post(`/quizzes/${id}/questions`, questionData);
  },

  async getStatistics(id: number): Promise<QuizStatistics> {
    return await httpClient.get(`/quizzes/${id}/statistics`);
  },
};
