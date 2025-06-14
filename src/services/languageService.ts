
import { httpClient } from '@/utils/httpClient';

export interface Language {
  id: number;
  name: string;
  code: string;
  description: string;
  flagImage: string;
}

export interface CreateLanguageRequest {
  name: string;
  code: string;
  description: string;
  flagImage: string;
}

export const languageService = {
  async getAll(): Promise<Language[]> {
    const response = await httpClient.get('/languages');
    return response.data || response; // Extract data property or fallback to response if it's already an array
  },

  async getById(id: number): Promise<Language> {
    const response = await httpClient.get(`/languages/${id}`);
    return response.data || response;
  },

  async getByCode(code: string): Promise<Language> {
    const response = await httpClient.get(`/languages/code/${code}`);
    return response.data || response;
  },

  async create(data: CreateLanguageRequest): Promise<Language> {
    const response = await httpClient.post('/languages', data);
    return response.data || response;
  },

  async update(id: number, data: Partial<CreateLanguageRequest>): Promise<Language> {
    const response = await httpClient.put(`/languages/${id}`, data);
    return response.data || response;
  },

  async delete(id: number): Promise<void> {
    await httpClient.delete(`/languages/${id}`);
  },
};
