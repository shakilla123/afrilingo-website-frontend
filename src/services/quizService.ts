
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
    const response = await httpClient.get('/quizzes');
    return response.json();
  },

  async getById(id: number): Promise<Quiz> {
    const response = await httpClient.get(`/quizzes/${id}`);
    return response.json();
  },

  async getByLessonId(lessonId: number): Promise<Quiz[]> {
    const response = await httpClient.get(`/quizzes/lesson/${lessonId}`);
    return response.json();
  },

  async create(data: CreateQuizRequest): Promise<Quiz> {
    const response = await httpClient.post('/quizzes', data);
    return response.json();
  },

  async update(id: number, data: Partial<CreateQuizRequest>): Promise<Quiz> {
    const response = await httpClient.put(`/quizzes/${id}`, data);
    return response.json();
  },

  async delete(id: number): Promise<void> {
    await httpClient.delete(`/quizzes/${id}`);
  },

  async getQuestions(id: number): Promise<any[]> {
    const response = await httpClient.get(`/quizzes/${id}/questions`);
    return response.json();
  },

  async addQuestion(id: number, questionData: any): Promise<any> {
    const response = await httpClient.post(`/quizzes/${id}/questions`, questionData);
    return response.json();
  },

  async getStatistics(id: number): Promise<QuizStatistics> {
    const response = await httpClient.get(`/quizzes/${id}/statistics`);
    return response.json();
  },
};
