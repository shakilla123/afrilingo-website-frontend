
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
    const response = await httpClient.get('/questions');
    return response.json();
  },

  async getById(id: number): Promise<Question> {
    const response = await httpClient.get(`/questions/${id}`);
    return response.json();
  },

  async getOptions(id: number): Promise<QuestionOption[]> {
    const response = await httpClient.get(`/questions/${id}/options`);
    return response.json();
  },

  async create(data: CreateQuestionRequest): Promise<Question> {
    const response = await httpClient.post('/questions', data);
    return response.json();
  },

  async update(id: number, data: Partial<CreateQuestionRequest>): Promise<Question> {
    const response = await httpClient.put(`/questions/${id}`, data);
    return response.json();
  },

  async delete(id: number): Promise<void> {
    await httpClient.delete(`/questions/${id}`);
  },

  async addOption(id: number, optionData: CreateQuestionOptionRequest): Promise<QuestionOption> {
    const response = await httpClient.post(`/questions/${id}/options`, optionData);
    return response.json();
  },
};
