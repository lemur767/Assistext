const getAuthToken = () => {
  return localStorage.getItem('token');
};

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Something went wrong');
  }
  return response.json();
};

const fetchApi = async (url: string, options: RequestInit = {}) => {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`http://localhost:5000/api${url}`, {
    ...options,
    headers,
  });

  return handleResponse(response);
};

export const api = {
  get: (url: string, options?: RequestInit) => fetchApi(url, { ...options, method: 'GET' }),
  post: (url: string, body: any, options?: RequestInit) => fetchApi(url, { ...options, method: 'POST', body: JSON.stringify(body) }),
  put: (url: string, body: any, options?: RequestInit) => fetchApi(url, { ...options, method: 'PUT', body: JSON.stringify(body) }),
  delete: (url: string, options?: RequestInit) => fetchApi(url, { ...options, method: 'DELETE' }),
};
