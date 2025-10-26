import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../config'; // Corrected path

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

const fetchApi = async (url: string, options: RequestInit = {}) => {
  // Extract token from custom options, and remove it from the options passed to fetch
  const customOptions = options as any;
  const token = customOptions.token || await getAuthTokenFromStorage();
  delete customOptions.token;

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}/api/v1${url}`, {
    ...options,
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

const fetchApiRaw = async (url: string, options: RequestInit = {}) => {
  // Extract token from custom options, and remove it from the options passed to fetch
  const customOptions = options as any;
  const token = customOptions.token || await getAuthTokenFromStorage();
  delete customOptions.token;

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}/api/v1${url}`, {
    ...options,
    headers,
  });

  return handleRawResponse(response);
};

export const api = {
  get: (url: string, options?: RequestInit) => fetchApi(url, { ...options, method: 'GET' }),
  post: (url: string, body: any, options?: RequestInit) => fetchApi(url, { ...options, method: 'POST', body: JSON.stringify(body) }),
  put: (url: string, body: any, options?: RequestInit) => fetchApi(url, { ...options, method: 'PUT', body: JSON.stringify(body) }),
  delete: (url: string, options?: RequestInit) => fetchApi(url, { ...options, method: 'DELETE' }),
  getRaw: (url: string, options?: RequestInit) => fetchApiRaw(url, { ...options, method: 'GET' }),
};

