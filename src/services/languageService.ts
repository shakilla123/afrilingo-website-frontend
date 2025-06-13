
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
    return await httpClient.get('/languages');
  },

  async getById(id: number): Promise<Language> {
    return await httpClient.get(`/languages/${id}`);
  },

  async getByCode(code: string): Promise<Language> {
    return await httpClient.get(`/languages/code/${code}`);
  },

  async create(data: CreateLanguageRequest): Promise<Language> {
    return await httpClient.post('/languages', data);
  },

  async update(id: number, data: Partial<CreateLanguageRequest>): Promise<Language> {
    return await httpClient.put(`/languages/${id}`, data);
  },

  async delete(id: number): Promise<void> {
    await httpClient.delete(`/languages/${id}`);
  },
};
