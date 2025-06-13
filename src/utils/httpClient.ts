
import { authService } from '@/services/authService';

class HttpClient {
  private baseURL: string;

  constructor() {
    this.baseURL = import.meta.env.PROD 
      ? 'https://api.afrilingo.com/api/v1'
      : 'http://192.168.1.72:8081/api/v1';
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const accessToken = authService.getAccessToken();

    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);

      // If token expired, try to refresh
      if (response.status === 401 && accessToken) {
        try {
          const refreshResponse = await authService.refreshToken();
          localStorage.setItem('access_token', refreshResponse.access_token);

          // Retry original request with new token
          const retryConfig: RequestInit = {
            ...config,
            headers: {
              ...config.headers,
              Authorization: `Bearer ${refreshResponse.access_token}`,
            },
          };

          const retryResponse = await fetch(url, retryConfig);
          
          if (!retryResponse.ok) {
            throw new Error(`HTTP error! status: ${retryResponse.status}`);
          }

          return retryResponse.json();
        } catch (refreshError) {
          // Refresh failed, redirect to login
          authService.logout();
          window.location.href = '/';
          throw new Error('Session expired');
        }
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      console.error('HTTP request failed:', error);
      throw error;
    }
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async patch<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

export const httpClient = new HttpClient();
