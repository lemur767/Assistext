import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../config'; // Corrected path

interface ApiOptions extends RequestInit {
  token?: string;
}

const getAuthTokenFromStorage = async () => {
  const session = await AsyncStorage.getItem('session');
  if (session) {
    return JSON.parse(session).token;
  }
  return null;
};

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Something went wrong');
  }
  return response.json();
};

const fetchApi = async (url: string, options: ApiOptions = {}) => {
  const { token: providedToken, ...fetchOptions } = options;
  const token = providedToken || await getAuthTokenFromStorage();

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(fetchOptions.headers as Record<string, string>),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}/api/v1${url}`, {
    ...fetchOptions,
    headers,
  });

  return handleResponse(response);
};


const handleRawResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Something went wrong');
  }
  return response.text();
};

const fetchApiRaw = async (url: string, options: ApiOptions = {}) => {
  const { token: providedToken, ...fetchOptions } = options;
  const token = providedToken || await getAuthTokenFromStorage();

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(fetchOptions.headers as Record<string, string>),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}/api/v1${url}`, {
    ...fetchOptions,
    headers,
  });

  return handleRawResponse(response);
};

export const api = {
  get: (url: string, options?: ApiOptions) => fetchApi(url, { ...options, method: 'GET' }),
  post: (url: string, body: any, options?: ApiOptions) => fetchApi(url, { ...options, method: 'POST', body: JSON.stringify(body) }),
  put: (url: string, body: any, options?: ApiOptions) => fetchApi(url, { ...options, method: 'PUT', body: JSON.stringify(body) }),
  delete: (url: string, options?: ApiOptions) => fetchApi(url, { ...options, method: 'DELETE' }),
  getRaw: (url: string, options?: ApiOptions) => fetchApiRaw(url, { ...options, method: 'GET' }),
};

