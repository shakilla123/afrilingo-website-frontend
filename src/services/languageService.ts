
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
    return response.json();
  },

  async getById(id: number): Promise<Language> {
    const response = await httpClient.get(`/languages/${id}`);
    return response.json();
  },

  async getByCode(code: string): Promise<Language> {
    const response = await httpClient.get(`/languages/code/${code}`);
    return response.json();
  },

  async create(data: CreateLanguageRequest): Promise<Language> {
    const response = await httpClient.post('/languages', data);
    return response.json();
  },

  async update(id: number, data: Partial<CreateLanguageRequest>): Promise<Language> {
    const response = await httpClient.put(`/languages/${id}`, data);
    return response.json();
  },

  async delete(id: number): Promise<void> {
    await httpClient.delete(`/languages/${id}`);
  },
};
