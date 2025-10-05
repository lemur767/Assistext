const getAuthToken = () => {
  const session = localStorage.getItem('session');
  if (session) {
    return JSON.parse(session).token;
  }
  return null;
};

const api = {
  get: async (url: string) => {
    const token = getAuthToken();
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  },
  post: async (url: string, data: any) => {
    const token = getAuthToken();
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return response;
  },
  put: async (url: string, data: any) => {
    const token = getAuthToken();
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return response;
  },
  delete: async (url: string) => {
    const token = getAuthToken();
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  },
};

export default api;
