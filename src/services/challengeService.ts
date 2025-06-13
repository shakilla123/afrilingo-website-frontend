
import { httpClient } from '@/utils/httpClient';
import { Course } from './courseService';

export interface Challenge {
  id: number;
  title: string;
  description: string;
  difficulty: string;
  points: number;
  timeLimit: string;
  requirements: string[];
  rewards: string[];
  course: Course;
}

export interface CreateChallengeRequest {
  title: string;
  description: string;
  difficulty: string;
  points: number;
  timeLimit: string;
  requirements: string[];
  rewards: string[];
  course: {
    id: number;
  };
}

export const challengeService = {
  async getAll(): Promise<Challenge[]> {
    return await httpClient.get('/challenges');
  },

  async getById(id: number): Promise<Challenge> {
    return await httpClient.get(`/challenges/${id}`);
  },

  async getByCourseId(courseId: number): Promise<Challenge[]> {
    return await httpClient.get(`/challenges/course/${courseId}`);
  },

  async create(data: CreateChallengeRequest): Promise<Challenge> {
    return await httpClient.post('/challenges', data);
  },

  async update(id: number, data: Partial<CreateChallengeRequest>): Promise<Challenge> {
    return await httpClient.put(`/challenges/${id}`, data);
  },

  async delete(id: number): Promise<void> {
    await httpClient.delete(`/challenges/${id}`);
  },
};
