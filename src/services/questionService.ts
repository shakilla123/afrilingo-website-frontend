
import { httpClient } from '@/utils/httpClient';

export interface QuestionOption {
  id: number;
  optionText: string;
  optionMedia?: string;
  correct: boolean;
}

export interface Question {
  id: number;
  questionText: string;
  questionType: 'MULTIPLE_CHOICE' | 'TRUE_FALSE' | 'FILL_BLANK';
  mediaUrl?: string;
  points: number;
  options?: QuestionOption[];
}

export interface CreateQuestionRequest {
  questionText: string;
  questionType: 'MULTIPLE_CHOICE' | 'TRUE_FALSE' | 'FILL_BLANK';
  mediaUrl?: string;
  points: number;
  options?: Omit<QuestionOption, 'id'>[];
}

export interface CreateQuestionOptionRequest {
  optionText: string;
  optionMedia?: string;
  correct: boolean;
}

export interface PaginatedResponse<T> {
  totalPages: number;
  totalElements: number;
  first: boolean;
  last: boolean;
  size: number;
  content: T[];
  number: number;
  numberOfElements: number;
  empty: boolean;
}

export const questionService = {
  async getAll(): Promise<Question[]> {
    const response = await httpClient.get('/questions');
    return response.data;
  },

  async getById(id: number): Promise<Question> {
    const response = await httpClient.get(`/questions/${id}`);
    return response.data;
  },

  async getByQuizId(quizId: number): Promise<Question[]> {
    const response = await httpClient.get(`/questions/quiz/${quizId}`);
    return response.data;
  },

  async getByQuizIdAndType(quizId: number, questionType: string): Promise<Question[]> {
    const response = await httpClient.get(`/questions/quiz/${quizId}/type/${questionType}`);
    return response.data;
  },

  async getPaginated(page: number = 0, size: number = 20, sort?: string[]): Promise<PaginatedResponse<Question>> {
    const params = new URLSearchParams({
      'pageable.page': page.toString(),
      'pageable.size': size.toString(),
    });
    
    if (sort) {
      sort.forEach(s => params.append('pageable.sort', s));
    }
    
    const response = await httpClient.get(`/questions/paginated?${params}`);
    return response.data;
  },

  async search(keyword: string): Promise<Question[]> {
    const response = await httpClient.get(`/questions/search?keyword=${encodeURIComponent(keyword)}`);
    return response.data;
  },

  async getOptions(id: number): Promise<QuestionOption[]> {
    const response = await httpClient.get(`/questions/${id}/options`);
    return response.data;
  },

  async create(data: CreateQuestionRequest): Promise<Question> {
    const response = await httpClient.post('/questions', data);
    return response.data;
  },

  async update(id: number, data: Partial<CreateQuestionRequest>): Promise<Question> {
    const response = await httpClient.put(`/questions/${id}`, { id, ...data });
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await httpClient.delete(`/questions/${id}`);
  },

  async addOption(id: number, optionData: CreateQuestionOptionRequest): Promise<Question> {
    const response = await httpClient.post(`/questions/${id}/options`, optionData);
    return response.data;
  },

  async deleteOption(questionId: number, optionId: number): Promise<Question> {
    const response = await httpClient.delete(`/questions/${questionId}/options/${optionId}`);
    return response.data;
  },
};
