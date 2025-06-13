
import { httpClient } from '@/utils/httpClient';

export interface QuestionOption {
  id: number;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: number;
  text: string;
  questionType: string;
  explanation: string;
  points: number;
  options?: QuestionOption[];
}

export interface CreateQuestionRequest {
  text: string;
  questionType: string;
  explanation: string;
  points: number;
}

export interface CreateQuestionOptionRequest {
  text: string;
  isCorrect: boolean;
}

export const questionService = {
  async getAll(): Promise<Question[]> {
    return await httpClient.get('/questions');
  },

  async getById(id: number): Promise<Question> {
    return await httpClient.get(`/questions/${id}`);
  },

  async getOptions(id: number): Promise<QuestionOption[]> {
    return await httpClient.get(`/questions/${id}/options`);
  },

  async create(data: CreateQuestionRequest): Promise<Question> {
    return await httpClient.post('/questions', data);
  },

  async update(id: number, data: Partial<CreateQuestionRequest>): Promise<Question> {
    return await httpClient.put(`/questions/${id}`, data);
  },

  async delete(id: number): Promise<void> {
    await httpClient.delete(`/questions/${id}`);
  },

  async addOption(id: number, optionData: CreateQuestionOptionRequest): Promise<QuestionOption> {
    return await httpClient.post(`/questions/${id}/options`, optionData);
  },
};
