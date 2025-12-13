const getAuthTokenFromStorage = () => {
  const session = localStorage.getItem('session');
  if (session) {
    return JSON.parse(session).token;
  }
  return null;
};

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || error.error || 'Something went wrong');
  }
  return response.json();
};

interface FetchOptions extends RequestInit {
  token?: string;
}

const fetchApi = async (url: string, options: FetchOptions = {}) => {
  // Extract token from custom options, and remove it from the options passed to fetch
  const { token, ...fetchOptions } = options;
  const authToken = token || getAuthTokenFromStorage();

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(authToken ? { 'Authorization': `Bearer ${authToken}` } : {}),
    ...options.headers,
  };

  const baseUrl = import.meta.env.VITE_BACKEND_URL;
  const response = await fetch(`${baseUrl}/api/v1${url}`, {
    ...fetchOptions,
    headers,
  });

  return handleResponse(response);
};

export const api = {
  get: (url: string, options?: FetchOptions) => fetchApi(url, { ...options, method: 'GET' }),
  post: (url: string, body: any, options?: FetchOptions) => fetchApi(url, { ...options, method: 'POST', body: JSON.stringify(body) }),
  put: (url: string, body: any, options?: FetchOptions) => fetchApi(url, { ...options, method: 'PUT', body: JSON.stringify(body) }),
  delete: (url: string, options?: FetchOptions) => fetchApi(url, { ...options, method: 'DELETE' }),
};
