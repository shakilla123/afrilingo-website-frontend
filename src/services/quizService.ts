
import { httpClient } from '@/utils/httpClient';
import { Lesson } from './lessonService';

export interface QuizOption {
  id: number;
  optionText: string;
  optionMedia: string;
  correct: boolean;
}

export interface QuizQuestion {
  id: number;
  questionText: string;
  questionType: 'MULTIPLE_CHOICE' | 'TRUE_FALSE' | 'FILL_IN_BLANK';
  mediaUrl: string;
  points: number;
  options: QuizOption[];
}

export interface Quiz {
  id: number;
  title: string;
  description: string;
  minPassingScore: number;
  lesson: Lesson;
  questions: QuizQuestion[];
}

export interface CreateQuizRequest {
  title: string;
  description: string;
  minPassingScore: number;
  lesson: {
    id: number;
  };
}

export interface UpdateQuizRequest {
  id: number;
  title: string;
  description: string;
  minPassingScore: number;
  lesson: {
    id: number;
  };
}

export interface CreateQuestionRequest {
  questionText: string;
  questionType: 'MULTIPLE_CHOICE' | 'TRUE_FALSE' | 'FILL_IN_BLANK';
  mediaUrl?: string;
  points: number;
  options: Omit<QuizOption, 'id'>[];
}

export interface PaginatedQuizzesRequest {
  page: number;
  size: number;
  sort?: string[];
}

export interface PaginatedQuizzesResponse {
  totalElements: number;
  totalPages: number;
  numberOfElements: number;
  content: Quiz[];
  first: boolean;
  last: boolean;
  size: number;
  number: number;
  empty: boolean;
}

export const quizService = {
  async getAll(): Promise<Quiz[]> {
    return await httpClient.get<Quiz[]>('/quizzes');
  },

  async getById(id: number): Promise<Quiz> {
    return await httpClient.get<Quiz>(`/quizzes/${id}`);
  },

  async getByLessonId(lessonId: number): Promise<Quiz[]> {
    return await httpClient.get<Quiz[]>(`/quizzes/lesson/${lessonId}`);
  },

  async getPaginated(params: PaginatedQuizzesRequest): Promise<PaginatedQuizzesResponse> {
    const queryParams = new URLSearchParams({
      page: params.page.toString(),
      size: params.size.toString(),
    });
    
    if (params.sort) {
      params.sort.forEach(sortParam => {
        queryParams.append('sort', sortParam);
      });
    }

    return await httpClient.get<PaginatedQuizzesResponse>(`/quizzes/paginated?${queryParams}`);
  },

  async create(data: CreateQuizRequest): Promise<Quiz> {
    return await httpClient.post<Quiz>('/quizzes', data);
  },

  async update(id: number, data: UpdateQuizRequest): Promise<Quiz> {
    return await httpClient.put<Quiz>(`/quizzes/${id}`, data);
  },

  async delete(id: number): Promise<void> {
    await httpClient.delete<void>(`/quizzes/${id}`);
  },

  async getQuestions(id: number): Promise<QuizQuestion[]> {
    return await httpClient.get<QuizQuestion[]>(`/quizzes/${id}/questions`);
  },

  async addQuestion(id: number, questionData: CreateQuestionRequest): Promise<Quiz> {
    return await httpClient.post<Quiz>(`/quizzes/${id}/questions`, questionData);
  },

  async removeQuestion(quizId: number, questionId: number): Promise<Quiz> {
    return await httpClient.delete<Quiz>(`/quizzes/${quizId}/questions/${questionId}`);
  },

  async getStatistics(id: number): Promise<Record<string, any>> {
    return await httpClient.get<Record<string, any>>(`/quizzes/${id}/statistics`);
  },
};
