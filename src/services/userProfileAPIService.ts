// services/userProfileAPIService.ts
import { SidebarResponse, UserProfileResponse } from '../types/sidebar';

const API_BASE_URL = 'http://localhost:8080/felicita/api/v0/user-profile';

export class UserProfileAPIService {
  private getAuthHeaders(): HeadersInit {
    const cookies = document.cookie;
    return {
      'Content-Type': 'application/json',
      'Cookie': cookies,
    };
  }

  async getSidebarData(): Promise<SidebarResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/side-bar`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching sidebar data:', error);
      throw error;
    }
  }

  async getUserProfile(): Promise<UserProfileResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/user`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  }

  async fetchContentByUrl(url: string): Promise<any> {
    if (!url) {
      return null;
    }

    try {
      const response = await fetch(`${API_BASE_URL}${url}`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Error fetching content for URL ${url}:`, error);
      throw error;
    }
  }
}