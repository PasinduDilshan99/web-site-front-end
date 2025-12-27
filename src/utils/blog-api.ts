// utils/blog-api.ts
import { BlogReactRequest, CommentRequest, CommentReactRequest } from '@/types/blog-types';

const API_BASE_URL = 'http://localhost:8080/felicita/v0/api/blog';

// Helper function to get headers with token
const getHeaders = (): HeadersInit => {
  // In a real app, get token from auth context or localStorage
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  
  return headers;
};

// Blog reaction API
export const blogReact = async (data: BlogReactRequest): Promise<any> => {
  try {
    const response = await fetch(`${API_BASE_URL}/react`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
      credentials: 'include',
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error reacting to blog:', error);
    throw error;
  }
};

// Comment API (for both comments and replies)
export const addComment = async (data: CommentRequest): Promise<any> => {
  try {
    // If parentId is undefined, send null
    const requestData = {
      ...data,
      parentId: data.parentId === undefined ? null : data.parentId
    };

    const response = await fetch(`${API_BASE_URL}/comment`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(requestData),
      credentials: 'include',
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error adding comment:', error);
    throw error;
  }
};

// Comment reaction API
export const commentReact = async (data: CommentReactRequest): Promise<any> => {
  try {
    const response = await fetch(`${API_BASE_URL}/comment-react`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
      credentials: 'include',
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error reacting to comment:', error);
    throw error;
  }
};

// Bookmark API (existing, but adding here for completeness)
export const toggleBookmark = async (blogId: number): Promise<any> => {
  try {
    const response = await fetch(`${API_BASE_URL}/bookmark`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ blogId }),
      credentials: 'include',
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error toggling bookmark:', error);
    throw error;
  }
};